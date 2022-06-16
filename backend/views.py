from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework import generics, mixins, viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status


# Create your views here.

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    parser_classes = (MultiPartParser, FormParser)

    # def get(self, request, *args, **kwargs):
    #     images = Image.objects.all()
    #     serializer = ImageSerializer(images, many=True)
    #     return Response(serializer.data)
    #
    # def post(self, request, *args, **kwargs):
    #     image_serializer = ImageSerializer(data=request.data)
    #     if image_serializer.is_valid():
    #         image_serializer.save()
    #         return Response(image_serializer.data, status=status.HTTP_201_CREATED)
    #     else:
    #         print('error', image_serializer.errors)
    #         return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
