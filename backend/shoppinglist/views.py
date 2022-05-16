from rest_framework import viewsets
from .models import List, Item
from .mixins import GetSerializerClassMixin
from .serializers import ListSerializer, ListDetailSerializer, ItemSerializer, ItemDetailSerializer


class ListViewSet(GetSerializerClassMixin, viewsets.ModelViewSet):
    """
    API endpoint that allows lists to be viewed or edited
    """
    serializer_class = ListDetailSerializer
    serializer_action_classes = {
        "list": ListSerializer
    }
    queryset = List.objects.all().order_by("-created")


class ItemViewSet(GetSerializerClassMixin, viewsets.ModelViewSet):
    """
    API endpoint that allows items to be viewed or edited
    """
    serializer_class = ItemDetailSerializer
    serializer_action_classes = {
        "list": ItemSerializer
    }
    queryset = Item.objects.all().order_by("-created")