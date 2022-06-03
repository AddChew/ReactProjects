from django.test import TestCase
from django.utils import timezone
from shoppinglist.models import Item, List


class ItemTestCase(TestCase):

    def setUp(self):
        # Set datetime
        self.datetime = timezone.now()

        # Create list
        list1 = List.objects.create(title = "list1", created = self.datetime)

        # Create item
        item1 = Item.objects.create(title = "item1", qty = 1, price = 1, created = self.datetime, list = list1)

    def test_title(self):
        item = Item.objects.get(id = 1)
        self.assertEqual(item.title, "item1")

    def test_qty(self):
        item = Item.objects.get(id = 1)
        self.assertEqual(item.qty, 1)

    def test_price(self):
        item = Item.objects.get(id = 1)
        self.assertEqual(item.price, 1)

    def test_created(self):
        item = Item.objects.get(id = 1)
        self.assertEqual(item.created, self.datetime)

    def test_list(self):
        item = Item.objects.get(id = 1)
        list1 = List.objects.get(id = 1)
        self.assertEqual(item.list, list1)