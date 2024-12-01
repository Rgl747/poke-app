from django.urls import path
from .views import FavoriteList, FavoriteCreate, FavoriteDelete

urlpatterns = [
    path('', FavoriteList.as_view(), name='favorites_list'),
    path('create/', FavoriteCreate.as_view(), name='favorites_create'),
    path('get/', FavoriteList.as_view(), name='favorites_get'),
    path('delete/<str:name>/', FavoriteDelete.as_view(), name='favorites_delete'),
]