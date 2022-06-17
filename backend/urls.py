from django.urls import path, include
from rest_framework.authtoken import views as rf_views
from rest_framework import routers

from . import views

router = routers.SimpleRouter()
router.register(r'tags', views.TagViewSet)
router.register(r'albums', views.AlbumViewSet)
router.register(r'images', views.ImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-token-auth/', rf_views.obtain_auth_token)
]
