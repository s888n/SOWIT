from django.urls import include, path
from .views import PolygonViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'polygons', PolygonViewSet)
# GET /polygons/: List all polygons.
# POST /polygons/: Create a new polygon.
# GET /polygons/{id}/: Retrieve a single polygon by ID.
# PUT /polygons/{id}/: Update an existing polygon.
# DELETE /polygons/{id}/: Delete a polygon.


urlpatterns = [
    path('', include(router.urls)),
]
