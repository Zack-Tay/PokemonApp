# Generated by Django 4.0.1 on 2022-03-10 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0023_remove_pokemon_userownedby_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='pokemon',
            name='userRefId',
            field=models.IntegerField(default='-1'),
        ),
    ]
