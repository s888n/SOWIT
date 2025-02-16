from django.conf import settings
from rest_framework import serializers
from .models import Polygon

class PolygonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Polygon
        read_only_fields = ("user",)
        fields = "__all__"

    def create(self, validated_data):
        request = self.context.get("request", None)
        if request and hasattr(request, "user"):
            validated_data["user"] = request.user
        name = validated_data.get("name", None)
        if not name:
            validated_data["name"] = f"Polygon {Polygon.objects.count() + 1}"
        return super().create(validated_data)
