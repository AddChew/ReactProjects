from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator


class List(models.Model):
    title = models.CharField(max_length = 100)
    created = models.DateTimeField(default = timezone.now)

    class Meta:
        ordering = ("-created", "-id")

    def __str__(self):
        return self.title


class Item(models.Model):
    title = models.CharField(max_length = 100)
    qty = models.IntegerField(default = 1, validators=[MinValueValidator(1, "Quantity must be greater than or equal to 1.")])
    price = models.FloatField(default = 0, validators=[MinValueValidator(0, "Price must be greater than or equal to 0.")])
    created = models.DateTimeField(default = timezone.now)
    list = models.ForeignKey(List, related_name = "items", on_delete = models.CASCADE)

    class Meta:
        ordering = ("-created", "-id")

    def __str__(self):
        return self.title