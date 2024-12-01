from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Favorite
from .serializers import FavoriteSerializer
from django.shortcuts import get_object_or_404

class FavoriteList(APIView):
    def get(self, request):
        favorites = Favorite.objects.all()
        serializer = FavoriteSerializer(favorites, many=True)
        return Response(serializer.data)

class FavoriteCreate(APIView):
    def post(self, request):
        serializer = FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FavoriteDelete(APIView):
    def delete(self, request, name):
        favorite = get_object_or_404(Favorite, name=name)
        favorite.delete()
        return Response({"message": "Favorite deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
