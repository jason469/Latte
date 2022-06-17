from django.urls import path, include
from rest_framework import routers
from knox import views as knox_views

from . import views

router = routers.SimpleRouter()
router.register(r'tags', views.TagViewSet)
router.register(r'albums', views.AlbumViewSet)
router.register(r'images', views.ImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path(r'auth/login/', views.LoginView.as_view(), name='knox_login'),
    path(r'auth/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path(r'auth/logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
]
