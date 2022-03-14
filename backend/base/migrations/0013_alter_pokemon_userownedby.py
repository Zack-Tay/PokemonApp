# Generated by Django 4.0.1 on 2022-03-10 12:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0012_alter_pokemon_userownedby'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pokemon',
            name='userOwnedBy',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]