from django.test import TestCase
from django.utils import timezone
from shoppinglist.models import List, Item


class ListTestCase(TestCase):

    def setUp(self):
        # Set datetime
        self.datetime = timezone.now()

        # Create list
        list1 = List.objects.create(title = "list1", created = self.datetime)

        # Create items
        item1 = Item.objects.create(title = "item1", qty = 1, price = 1, created = self.datetime, list = list1)
        item2 = Item.objects.create(title = "item2", qty = 2, price = 2, created = self.datetime, list = list1)

    def test_title(self):
        list = List.objects.get(id = 1)
        self.assertEqual(list.title, "list1")

    def test_created(self):
        list = List.objects.get(id = 1)
        self.assertEqual(list.created, self.datetime)

    def test_items(self):
        list = List.objects.get(id = 1)
        item1 = Item.objects.get(id = 1)
        item2 = Item.objects.get(id = 2)

        self.assertEqual(list.items.count(), 2)
        self.assertIn(item1, list.items.all())
        self.assertIn(item2, list.items.all())