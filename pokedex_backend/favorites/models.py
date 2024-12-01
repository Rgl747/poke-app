from django.db import models

class Favorite(models.Model):
    name = models.CharField(max_length=100, unique=True)
    sprite = models.URLField(null=True, blank=True)  # Permite valores nulos

    def __str__(self):
        return self.name