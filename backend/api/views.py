import json
import random
# import PIL

# from PIL import Image as PIL_Image
import os
import glob

from django.http import QueryDict, HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *
from .models import *

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser

from django.core import serializers


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class HomepageViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    parser_classes = (MultiPartParser, FormParser)

    def list(self, request, *args, **kwargs):
        return HttpResponse(serializers.serialize('json', Image.objects.all(), use_natural_foreign_keys=True))

    def retrieve(self, request, *args, **kwargs):
        image_id = self.get_object().id
        return HttpResponse(
            serializers.serialize('json', Image.objects.filter(id=image_id), use_natural_foreign_keys=True)
        )

    def create(self, request, *args, **kwargs):
        for item in request.data.dict():
            if item.startswith('images__'):
                try:
                    new_image, created = Image.objects.get_or_create(
                        name=request.data.get("name"),
                        description=request.data.get("description"),
                        image=request.data.get(item),
                        uploaded_by=request.user
                    )

                    if created is True:
                        tags = json.loads(request.data.get("tags"))
                        albums = json.loads(request.data.get("albums"))
                        for tag in tags:
                            new_image.tag.add(Tag.objects.get(name=tag))
                        for album in albums:
                            new_image.album.add(Album.objects.get(name=album))
                    else:
                        return HttpResponse(status=406)
                except Exception as exc:
                    print(exc)
                    return HttpResponse(500)
        return HttpResponse(status=201)

    def partial_update(self, request, *args, **kwargs):
        try:
            if next(iter(QueryDict(request.body))).find("action") != -1:
                request_body = json.loads(request.body)
                image_id = request_body["image_id"]
                if request_body["action"] == "Remove tag":
                    tag = Tag.objects.get(id=request_body["tag_id"])
                    Image.objects.get(id=image_id).tag.remove(tag)
                    return HttpResponse(status=200)
                elif request_body["action"] == "Remove album":
                    album = Album.objects.get(id=request_body["album_id"])
                    Image.objects.get(id=image_id).album.remove(album)
                    return HttpResponse(status=200)
                elif request_body["action"] == "Add Item to Image":
                    if request_body["item_name"] == "tags":
                        tag = Tag.objects.get(id=request_body["id"])
                        Image.objects.get(id=image_id).tag.add(tag)
                    elif request_body["item_name"] == "albums":
                        album = Album.objects.get(id=request_body["id"])
                        Image.objects.get(id=image_id).album.add(album)
                    return HttpResponse(status=200)
            else:
                currentImage = self.get_object()
                currentImage.name = request.data.get('name')
                currentImage.description = request.data.get('description')
                if request.data.get('image'):
                    os.remove(currentImage.image.path)
                    currentImage.image = request.data.get('image')
                currentImage.save()
                return HttpResponse(status=200)

        except Exception as exc:
            print(exc)
            return HttpResponse(500)

    def destroy(self, request, *args, **kwargs):
        image = self.get_object()
        os.remove(image.image.path)
        image.delete()


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def create(self, request, *args, **kwargs):
        try:
            instance, created = Tag.objects.get_or_create(
                name=request.data.get('name'),
                description=request.data.get('description')
            )
            if created is True:
                return HttpResponse(status=201)
            else:
                return HttpResponse(status=406)
        except Exception as exc:
            print(exc)
            return HttpResponse(500)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        tag = Tag.objects.get(id=instance.id)
        images = tag.image_set.all().values()
        tag_data = self.get_serializer(instance).data
        return Response({"images": images,
                         "tag_data": tag_data},
                        status=status.HTTP_200_OK)


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        try:
            album = Album.objects.filter(
                name=request.data.get('name'),
                description=request.data.get('description'),
            )
            if album:
                return HttpResponse(status=406)
            else:
                Album.objects.create(
                    name=request.data.get('name'),
                    description=request.data.get('description'),
                    cover_image=request.data.get('cover_image')
                )
                return HttpResponse(status=201)
        except Exception as exc:
            print(exc)
            return HttpResponse(500)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        album = Album.objects.get(id=instance.id)
        images = album.image_set.all().values()
        tag_data = self.get_serializer(instance).data
        return Response({"images": images,
                         "album_data": tag_data},
                        status=status.HTTP_200_OK)


class GetRandomImages(APIView):
    def get(self, request):
        randomImages = []
        allImages = Image.objects.all()
        number_of_images = len(allImages)
        randomIndexes = random.sample(range(1, number_of_images), 5)
        for randomIndex in randomIndexes:
            randomImages.append(allImages[randomIndex])
        return HttpResponse(serializers.serialize('json', randomImages, use_natural_foreign_keys=True))
