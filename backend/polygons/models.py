from django.contrib.gis.db import models

class Polygon(models.Model):
    color = models.CharField(max_length=7, default="#007bff")
    name = models.CharField(max_length=100)
    geom = models.PolygonField()
    area = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.area = self.calculate_area()
        self.perimeter = self.calculate_perimeter()
        super().save(*args, **kwargs)

    def calculate_area(self):
        # Calculate area of polygon
        return 0

    def calculate_perimeter(self):
        # Calculate perimeter of polygon
        return 0

    def __str__(self):
        return self.name

