# Generated by Django 5.1.3 on 2024-12-01 01:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('favorites', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='favorite',
            name='sprite',
            field=models.URLField(blank=True, null=True),
        ),
    ]
