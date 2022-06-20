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
            instance, created = Image.objects.get_or_create(name=request.data.get('name'),
                                                            tag__name=request.data.get('tag'),
                                                            album__name=request.data.get('album'))
            print(created)
            if created is True:
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
            instance, created = Tag.objects.get_or_create(name=request.data.get('name'))
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
            instance, created = Album.objects.get_or_create(name=request.data.get('name'))
            if created is True:
                return HttpResponse(status=201)
            else:
                return HttpResponse(status=406)
        except Exception as exc:
            print(exc)
            return HttpResponse(500)
