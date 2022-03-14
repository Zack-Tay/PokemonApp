from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Pokemon(models.Model):
    userRefId = models.IntegerField(default='-1')
    name = models.CharField(max_length=50, default='', blank=True)
    hp = models.IntegerField(default='0')
    attack = models.IntegerField(default='0')
    defense = models.IntegerField(default='0')
    type = models.CharField(max_length=50, default='', blank=True)