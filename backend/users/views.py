from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.conf import settings
from django.contrib.auth import (
    authenticate,
    login,
    logout,
)
from .serializers import (
    RegisterSerializer,
    UserSerializer,
    LoginSerializer,
    GithubLoginSerializer,
)
from rest_framework_simplejwt.tokens import RefreshToken
import requests
from django.core.files import File
from tempfile import NamedTemporaryFile
from .models import User
from drf_spectacular.utils import extend_schema


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return (str(refresh), str(refresh.access_token))


def store_tokens_in_cookie(response, access_token, refresh_token):
    response.set_cookie(
        key=settings.AUTH_COOKIE,
        value=access_token,
        expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
        httponly=True,
        samesite="None",
        secure=True,
    )
    response.set_cookie(
        key=settings.REFRESH_AUTH_COOKIE,
        value=refresh_token,
        expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
        httponly=True,
        samesite="None",
        secure=True,
    )


class GithubLoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    serializer_class = GithubLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            refresh_token, access_token = get_tokens_for_user(user)
            response = Response(status=status.HTTP_200_OK)
            store_tokens_in_cookie(response, access_token, refresh_token)
            user = UserSerializer(user)
            response.data = user.data
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    @extend_schema(request=LoginSerializer, responses=None)
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh_token, access_token = get_tokens_for_user(user)
            response = Response(status=status.HTTP_200_OK)
            store_tokens_in_cookie(response, access_token, refresh_token)
            user = UserSerializer(user)
            response.data = user.data
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(request=None, responses=None)
    def post(self, request):
        refresh_token = request.COOKIES.get(settings.REFRESH_AUTH_COOKIE)
        response = Response(
            status=status.HTTP_200_OK, data={"detail": "Successfully logged out"}
        )
        response.delete_cookie(settings.AUTH_COOKIE)
        response.delete_cookie(settings.REFRESH_AUTH_COOKIE)
        return response


class RegisterView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    @extend_schema(request=RegisterSerializer, responses=None)
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            response = Response(status=status.HTTP_201_CREATED)
            refresh_token, access_token = get_tokens_for_user(user)
            store_tokens_in_cookie(response, access_token, refresh_token)
            user = UserSerializer(user)
            response.data = user.data
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(request=UserSerializer, responses=None)
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CookiesRefreshView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(request=None, responses=None)
    def post(self, request):
        refresh_token = request.COOKIES.get(settings.REFRESH_AUTH_COOKIE)
        if not refresh_token:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            token = RefreshToken(refresh_token)
            access_token = str(token.access_token)
            response = Response(status=status.HTTP_200_OK)
            store_tokens_in_cookie(response, access_token, refresh_token)
            return response
        except Exception as e:
            return Response(
                {"error": "Invalid refresh token", "detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )
