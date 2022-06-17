from .serializers import *
from .models import *
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authentication import BasicAuthentication

from knox.views import LoginView as KnoxLoginView


class LoginView(KnoxLoginView):
    authentication_classes = [BasicAuthentication]


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    parser_classes = (MultiPartParser, FormParser)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    parser_classes = (MultiPartParser, FormParser)
