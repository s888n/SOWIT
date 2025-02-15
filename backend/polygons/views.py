from rest_framework import viewsets
from .models import Polygon
from .serializers import PolygonSerializer
from rest_framework import permissions

class PolygonViewSet(viewsets.ModelViewSet):
    queryset = Polygon.objects.all()
    serializer_class = PolygonSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Polygon.objects.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
