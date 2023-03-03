from django.contrib import admin
from backend.api import models


@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Tag)
class TagAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Album)
class AlbumAdmin(admin.ModelAdmin):
    pass
