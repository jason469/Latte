from django.db import models
from django.contrib.auth.models import User


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
