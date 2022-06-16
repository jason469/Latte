from rest_framework import serializers
from .models import Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

    def create(self, validated_data):
        image = Image.objects.create(
            name=validated_data['name'],
            description=validated_data['description'],
            image=validated_data['image'],
        )
        image.save()
        return image