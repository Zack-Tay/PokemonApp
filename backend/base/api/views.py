from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .serilizers import PokemonSerilizer
from base.models import Pokemon
import json

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/pokemon/mypokemon',
        '/pokemon/unownedpokemon',
        '/pokemon/addpokemon',
        '/pokemon/releasepokemon',
        '/pokemon/allpokemon'
        ]
    
    return Response(routes)


#   Get Your Captured Pokemon
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mypokemon(request):
    json_request = json.loads(request.body)
    user_id = json_request['user']
    
    pokemon = Pokemon.objects.filter(userRefId=user_id)
    print(pokemon)
    serlial = PokemonSerilizer(pokemon, many=True)
    return Response(serlial.data)

@api_view(['GET'])
def unownedpokemon(request):
    pokemon = Pokemon.objects.filter(userRefId=-1)
    serlial = PokemonSerilizer(pokemon , many=True)
    return Response(serlial.data)
    

#   Add Pokemon
@api_view(['POST'])
def addpokemon(request):
    json_request = json.loads(request.body)
    print(json_request)
    user_id = json_request['user']
    pokemon_id = json_request['pokemon']
    pokemon = Pokemon.objects.get( id=pokemon_id)
    
    if(pokemon.userRefId != -1):
        return Response(200)
    
    pokemon.userRefId = user_id
    pokemon.save()
    return Response(200)
    

#   Remove Pokemon
@api_view(['POST'])
def releasepokemon(request):
    json_request = json.loads(request.body)
    user_id = json_request['user']
    pokemon_id = json_request['pokemon']
    pokemon = Pokemon.objects.get(userRefId=user_id, id=pokemon_id)
    
    if(pokemon):
        pokemon.userRefId = -1
        pokemon.save()
    
    return Response(200);

#   Get All Names
@api_view(['GET'])
def allpokemon(request):
    pkm = Pokemon.objects.all()
    serlial = PokemonSerilizer(pkm , many=True)
    return Response(serlial.data)