from django.urls import path
from .views import FavoriteList, FavoriteCreate

urlpatterns = [
    path('', FavoriteList.as_view(), name='favorites_list'),
    path('create/', FavoriteCreate.as_view(), name='favorites_create'),
    path('get/', FavoriteList.as_view(), name='favorites_get'),
]
