from django.db import models
from django.contrib.auth.models import User
from PIL import Image as PIL_Image
from pathlib import Path
import os
from django.core.files.base import ContentFile
import base64
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver


class Tag(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False, default='')
    description = models.TextField(max_length=255, blank=True, null=True)
    in_use = models.BooleanField(default=True)

    def __str__(self):
        return f'Tag - {self.name}'

    class Meta:
        ordering = ['name']
        unique_together = ['name', 'description']

    def natural_key(self):
        return {
            "id": self.id,
            "name": self.name
        }

    def return_images(self):
        return self.image_set.all()


class Album(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False, default='')
    description = models.TextField(max_length=255, blank=True, null=True)
    in_use = models.BooleanField(default=True)
    cover_image = models.ImageField(upload_to='post_images', blank=True, null=True)

    def __str__(self):
        return f'Album - {self.name}'

    class Meta:
        ordering = ['name']
        unique_together = ['name', 'description', 'cover_image']

    def natural_key(self):
        return {
            "id": self.id,
            "name": self.name
        }


@receiver(post_save, sender=Album)
def covert_webp(sender, instance, created, **kwargs):
    if created:
        initial_path = instance.cover_image.path
        initial_name, initial_ext = os.path.splitext(initial_path)
        image_path = Path(initial_path)
        destination = image_path.with_suffix('.webp')
        image = PIL_Image.open(image_path)
        image.save(destination, format='webp')
        new_name = initial_name.split('/')[-1] + '.webp'

        with open(initial_name + '.webp', 'rb') as f:
            encoded = base64.b64encode(f.read())
            data = ContentFile(base64.b64decode(encoded))

        try:
            os.remove(initial_path)
            instance.cover_image.save(os.path.basename(new_name), data)
        except Exception as exc:
            print(exc)


class Image(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='post_images', blank=True, null=True)
    tag = models.ManyToManyField(Tag, blank=True)
    album = models.ManyToManyField(Album, blank=True)
    date_uploaded = models.DateTimeField(auto_now=True, blank=True, null=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.DO_NOTHING)

    def __str__(self):
        return f'{self.id} - {self.name}'


@receiver(post_save, sender=Image)
def covert_webp(sender, instance, created, **kwargs):
    if created:
        initial_path = instance.image.path
        initial_name, initial_ext = os.path.splitext(initial_path)
        image_path = Path(initial_path)
        destination = image_path.with_suffix('.webp')
        image = PIL_Image.open(image_path)
        image.save(destination, format='webp')
        new_name = initial_name.split('/')[-1] + '.webp'

        with open(initial_name + '.webp', 'rb') as f:
            encoded = base64.b64encode(f.read())
            data = ContentFile(base64.b64decode(encoded))

        try:
            os.remove(initial_path)
            instance.image.save(os.path.basename(new_name), data)
        except Exception as exc:
            print(exc)
