from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'tags', views.TagViewSet)
router.register(r'images', views.ImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
