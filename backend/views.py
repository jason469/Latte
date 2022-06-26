import json

from django.http import Http404

from .serializers import *
from .models import *

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.mixins import RetrieveModelMixin

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
        try:
            image, created = Image.objects.get_or_create(
                name=request.data.get('name'),
                description=request.data.get('description'),
                image=request.data.get('image')
            )
            if created is True:
                tags = json.loads(request.data.get("tags"))
                albums = json.loads(request.data.get("albums"))
                for tag in tags:
                    image.tag.add(Tag.objects.get(name=tag))
                for album in albums:
                    image.album.add(Album.objects.get(name=album))
                return HttpResponse(status=201)
            else:
                return HttpResponse(status=406)
        except Exception as exc:
            print(exc)
            return HttpResponse(500)


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



class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        try:
            instance, created = Album.objects.get_or_create(
                name=request.data.get('name'),
                description=request.data.get('description'),
                cover_image=request.data.get('cover_image')
            )
            if created is True:
                return HttpResponse(status=201)
            else:
                return HttpResponse(status=406)
        except Exception as exc:
            print(exc)
            return HttpResponse(500)
