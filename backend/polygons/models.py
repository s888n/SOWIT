from django.db import models
from django.conf import settings

class Polygon(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, unique=True)
    color = models.CharField(max_length=7, default="#87CEFA")
    area = models.FloatField(default=0)
    geometry = models.JSONField()
    image = models.ImageField(upload_to='polygons/', default='polygons/default.png')
    region = models.CharField(max_length=100, default="unknown")
    def __str__(self):
        return self.name

