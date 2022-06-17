from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False, default='')
    description = models.TextField(max_length=255, blank=True, null=True)
    in_use = models.BooleanField(default=True)

    def __str__(self):
        return f'Tag - {self.name}'

    class Meta:
        ordering = ['name']
        unique_together = ['name']


class Album(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False, default='')
    description = models.TextField(max_length=255, blank=True, null=True)
    in_use = models.BooleanField(default=True)
    cover_image = models.ImageField(upload_to='post_images', blank=True, null=True)

    def __str__(self):
        return f'Album - {self.name}'

    class Meta:
        ordering = ['name']
        unique_together = ['name']


class Image(models.Model):
    image_id = models.PositiveBigIntegerField(blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='post_images', blank=True, null=True)
    tag = models.ManyToManyField(Tag, blank=True, null=True)
    album = models.ManyToManyField(Album, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.image_id = self.id
        return super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.id} - {self.name}'
