from .models import User
from rest_framework import serializers
from django.contrib.auth import authenticate
from .github import Github
import requests
from django.core.files import File
from tempfile import NamedTemporaryFile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "avatar")


# to register you need to provide username, password and password2
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        if User.objects.filter(username=attrs["username"]).exists():
            raise serializers.ValidationError({"error": "Username is already taken"})
        if attrs["password"] != self.initial_data["password2"]:
            raise serializers.ValidationError({"error": "Passwords do not match"})
        if len(attrs["password"]) < 8:
            raise serializers.ValidationError(
                {"error": "Password must be at least 8 characters"}
            )
        return attrs

    def create(self, validated_data):
        user = User(username=validated_data["username"])
        user.set_password(validated_data["password"])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        user = authenticate(**attrs)
        if user:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class GithubLoginSerializer(serializers.Serializer):
    code = serializers.CharField(required=True)

    def validate(self, data):
        code = data.get("code")
        access_token = Github.exchange_code_for_token(code)
        if access_token:
            user_data = Github.get_github_user(access_token)
            username = user_data.get("login")
            avatar_url = user_data.get("avatar_url")
            if username is None or avatar_url is None:
                raise serializers.ValidationError("Invalid data from Github API")
            data["username"] = username
            data["avatar_url"] = avatar_url
        return data

    def create(self, validated_data):
        user, created = User.objects.get_or_create(username=validated_data["username"])
        if created:
            avatar_url = validated_data["avatar_url"]
            avatar_tmp = NamedTemporaryFile(delete=True)
            avatar_tmp.write(requests.get(avatar_url).content)
            avatar_tmp.flush()
            user.avatar.save(f"{user.username}_avatar.jpg", File(avatar_tmp))
        return user
