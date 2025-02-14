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
from .serializers import RegisterSerializer, UserSerializer , LoginSerializer , GithubLoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
import requests



def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return (str(refresh), str(refresh.access_token))

    
def store_tokens_in_cookie(response, access_token, refresh_token):
    response.set_cookie(
        key=settings.AUTH_COOKIE,
        value=access_token,
        expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
        httponly=True,
        samesite='None',
        secure=True
    )
    response.set_cookie(
        key=settings.REFRESH_AUTH_COOKIE,
        value=refresh_token,
        expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
        httponly=True,
        samesite='None',
        secure=True
    )


# # # Create your views here.
# # class GoogleLinkView(APIView):
# #     """
# #         get google link
# #     """
# #     permission_classes = [AllowAny]
# #     authentication_classes = []
# #     def get(self, request):
# #         url =  get_url(request, settings.GOOGLE_REDIRECT_URI)
# #         data = f'https://accounts.google.com/o/oauth2/v2/auth?client_id={settings.GOOGLE_ID}&scope=openid profile email&response_type=code&display=popup&redirect_uri={url}'
# #         return Response(data, status=status.HTTP_200_OK)
# def get_access_token_from_api(token_endpoint, payload):
#     response = requests.post(token_endpoint, params=payload)
#     return response.json().get('access_token')
# def get_access_token_google(redirect_url: str, authorization_code: str) -> str:
#     token_endpoint = 'https://oauth2.googleapis.com/token'
#     payload = {
#         'code': authorization_code,
#         'client_id': settings.GOOGLE_ID,
#         'client_secret': settings.GOOGLE_SECRET,
#         'redirect_uri': redirect_url,
#         'grant_type': 'authorization_code'
#     }
#     return get_access_token_from_api(token_endpoint, payload)

# def get_url(request, path="/") -> str:
#     return request.build_absolute_uri(path).replace("http://", "https://")

# class GoogleLoginView(APIView):
#     permission_classes = [AllowAny]
#     authentication_classes = []

#     def get(self, request):
#         code = request.query_params.get('code')
#         if not code:
#             return Response(status=status.HTTP_400_BAD_REQUEST)
#         url = get_url(request, "/callBack/google")



class GithubLoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    serializer_class=GithubLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            validated_data = serializer.validated_data
            if 'user' in validated_data:
                user = validated_data['user']
            else:
                user = serializer.save()
            refresh_token, access_token = get_tokens_for_user(user)
            response = Response(status=status.HTTP_200_OK)
            store_tokens_in_cookie(response, access_token, refresh_token)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh_token, access_token = get_tokens_for_user(user)
            response = Response(status=status.HTTP_200_OK)
            store_tokens_in_cookie(response, access_token, refresh_token)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get(settings.REFRESH_AUTH_COOKIE)
        response = Response(status=status.HTTP_200_OK, data={'detail': 'Successfully logged out'})
        response.delete_cookie(settings.AUTH_COOKIE)
        response.delete_cookie(settings.REFRESH_AUTH_COOKIE)
        return response

class RegisterView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            response = Response(status=status.HTTP_201_CREATED)
            refresh_token, access_token = get_tokens_for_user(user)
            store_tokens_in_cookie(response, access_token, refresh_token)
            return response
        return Response(
                serializer.errors
            , status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CookiesRefreshView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        refresh_token = request.COOKIES.get(settings.REFRESH_AUTH_COOKIE)
        if not refresh_token:
            print('no refresh token')
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            token = RefreshToken(refresh_token)
            access_token = str(token.access_token)
            response = Response(status=status.HTTP_200_OK)
            store_tokens_in_cookie(response, access_token, refresh_token)
            return response
        except Exception as e:
            return Response({
                'error': 'Invalid refresh token',
                'detail': str(e)},status=status.HTTP_400_BAD_REQUEST)