from rest_framework import serializers
from .models import List, Item


class ItemSerializer(serializers.ModelSerializer):
    list = serializers.PrimaryKeyRelatedField(queryset = List.objects.all(), many = False)
    created = serializers.DateTimeField(format = "%b %d %Y, %I:%M %p", read_only = True)

    class Meta:
        model = Item
        fields = ["id", "title", "list", "created"]


class ItemDetailSerializer(serializers.HyperlinkedModelSerializer):
    list = serializers.PrimaryKeyRelatedField(queryset = List.objects.all(), many = False)
    created = serializers.DateTimeField(format = "%b %d %Y, %I:%M %p", read_only = True)

    class Meta:
        model = Item
        fields = ["url", "id", "title", "qty", "price", "list", "created"]

        
class ListSerializer(serializers.HyperlinkedModelSerializer):
    created = serializers.DateTimeField(format = "%b %d, %Y", read_only = True)

    class Meta:
        model = List
        fields = ["url", "id", "title", "created"]


class ListDetailSerializer(serializers.HyperlinkedModelSerializer):
    items = ItemDetailSerializer(many = True, read_only = True)
    created = serializers.DateTimeField(format = "%b %d, %Y", read_only = True)

    class Meta:
        model = List
        fields = ["url", "id", "title", "created", "items"]