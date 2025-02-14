from django.db import models

# # Create your models here.
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.jpg')