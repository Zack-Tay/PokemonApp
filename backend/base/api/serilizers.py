from rest_framework.serializers import ModelSerializer
from base.models import Pokemon
from django.contrib.auth.models import User

class PokemonSerilizer(ModelSerializer):
    class Meta:
        model = Pokemon
        fields = '__all__'
        