from django.contrib import admin
from .models import Item, List


@admin.register(List)
class ListAdmin(admin.ModelAdmin):
    list_display = ("title", "num_items", "created")
    search_fields = ("title__icontains",)

    def num_items(self, obj):
        return obj.items.count()


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ("title", "qty", "price", "list", "created")
    search_fields = ("title__icontains",)