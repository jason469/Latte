from django.contrib import admin
from backend import models


@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Tag)
class TagAdmin(admin.ModelAdmin):
    pass
