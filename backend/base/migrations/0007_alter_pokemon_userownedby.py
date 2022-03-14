# Generated by Django 4.0.1 on 2022-03-10 12:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0006_alter_pokemon_userownedby'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pokemon',
            name='userOwnedBy',
            field=models.OneToOneField(default='-1', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
