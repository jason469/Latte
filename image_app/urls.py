from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve

from image_app import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('backend.urls')),
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT, })
]
