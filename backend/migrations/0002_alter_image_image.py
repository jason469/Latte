# Generated by Django 4.0.5 on 2022-07-11 02:10

from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image',
            field=imagekit.models.fields.ProcessedImageField(upload_to='post_images'),
        ),
    ]