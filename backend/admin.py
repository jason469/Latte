from django.contrib import admin
from backend import models

# Register your models here.

@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):
    pass
