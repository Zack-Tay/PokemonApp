from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('', views.getRoutes),
    path('unownedpokemon/', views.unownedpokemon),
    path('mypokemon/', views.mypokemon),
    path('allpokemon/', views.allpokemon),
    path('addpokemon/', views.addpokemon),
    path('releasepokemon/', views.releasepokemon),
    
    
    
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
