from rest_framework import serializers
from .models import *


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

    def run_validation(self, data):
        tag = Tag.objects.filter(name=data['tag'])
        album = Tag.objects.filter(name=data['album'])
        if not tag:
            data['tag'] = None
        else:
            data['tag'] = Tag.objects.get(name=data['tag'])

        if not album:
            data['album'] = None
        else:
            data['album'] = Tag.objects.get(name=data['album'])
        return data

    def create(self, validated_data):
        image = Image.objects.create(
            name=validated_data['name'][0],
            description=validated_data['description'][0],
            image=validated_data['image'][0],
        )
        image.save()
        image.tag.add(validated_data['tag'][0])
        image.album.add(validated_data['album'][0])
        image.save()
        return image
