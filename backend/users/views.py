from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.conf import settings

# # Create your views here.
# class GoogleLinkView(APIView):
#     """
#         get google link
#     """
#     permission_classes = [AllowAny]
#     authentication_classes = []
#     def get(self, request):
#         url =  get_url(request, settings.GOOGLE_REDIRECT_URI)
#         data = f'https://accounts.google.com/o/oauth2/v2/auth?client_id={settings.GOOGLE_ID}&scope=openid profile email&response_type=code&display=popup&redirect_uri={url}'
#         return Response(data, status=status.HTTP_200_OK)