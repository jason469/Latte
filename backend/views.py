import json

from .serializers import *
from .models import *
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class HomepageViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    parser_classes = (MultiPartParser, FormParser)

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
