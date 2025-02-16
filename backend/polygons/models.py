from django.db import models
from django.conf import settings

class Polygon(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True,max_length=50)
    coordinates = models.JSONField(encoder=None, decoder=None, default=list)
    thumbnail = models.URLField(blank=True,max_length=1024)
    area = models.FloatField(default=0)
    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.area = round(self.area / 1_000_000, 2)
        super().save(*args, **kwargs)