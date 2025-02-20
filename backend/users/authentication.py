from django.conf import settings
from rest_framework.request import Request
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import Token
from .models import User
from drf_spectacular.extensions import OpenApiAuthenticationExtension
from drf_spectacular.plumbing import build_bearer_security_scheme_object


class TokenAuthentication(JWTAuthentication):
    """
    Custom authentication scheme.

    This class subclasses JWTAuthentication to custom authentication using
    JWT tokens.
    """

    def authenticate(self, request):
        token = request.COOKIES.get(settings.AUTH_COOKIE)
        if not token:
            return None
        try:
            validated_token = self.get_validated_token(token)
        except AuthenticationFailed as e:
            raise AuthenticationFailed("Invalid token")
        try:
            user = self.get_user(validated_token)
            return user, validated_token
        except User.DoesNotExist:
            raise AuthenticationFailed("No user found")


class TokenAuthenticationScheme(OpenApiAuthenticationExtension):
    target_class = TokenAuthentication
    name = ["JWT Access Token", "JWT Refresh Token"]

    def get_security_definition(self, auto_schema):
        return [
            {"type": "apiKey", "in": "Cookie", "name": settings.AUTH_COOKIE},
            {"type": "apiKey", "in": "cookie", "name": settings.REFRESH_AUTH_COOKIE},
        ]
