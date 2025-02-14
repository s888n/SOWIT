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
        fields = ('id', 'username', 'avatar')



# to register you need to provide username, password and password2
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }
    

    def validate(self, attrs):
        if User.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({'error': 'Username is already taken'})
        if attrs['password'] != self.initial_data['password2']:
            raise serializers.ValidationError({'error': 'Passwords do not match'})
        if len(attrs['password']) < 8:
            raise serializers.ValidationError({'error': 'Password must be at least 8 characters'})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['password'])
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        user = authenticate(**attrs)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect Credentials')


class GithubLoginSerializer(serializers.Serializer):
    code = serializers.CharField()

    def validate_code(self, code):
        access_token = Github.exchange_code_for_token(code)

        if access_token:
            user_data = Github.get_github_user(access_token)
            username = user_data['login']
            avatar_url = user_data['avatar_url']
            user = User.objects.filter(username=username).first()
            if user:
                return {'user': user}
            else:
                return {'username': username, 'avatar_url': avatar_url}
        else:
            raise serializers.ValidationError('Invalid code')

    def create(self, validated_data):
        if 'user' in validated_data:
            return validated_data['user']
        
        user, created = User.objects.get_or_create(username=validated_data['username'])
        if created:
            avatar_url = validated_data['avatar_url']
            avatar_temp = NamedTemporaryFile(delete=True)
            avatar_temp.write(requests.get(avatar_url).content)
            avatar_temp.flush()
            user.avatar.save(f"{user.username}_avatar.jpg", File(avatar_temp))
            user.save()
        return user
