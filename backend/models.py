from django.db import models

# Create your models here.
class Image(models.Model):
    image_id = models.PositiveBigIntegerField(blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='post_images', blank=True, null=True)

    def save(self, *args, **kwargs):
        self.priority_id = self.id
        return super().save(*args, **kwargs)