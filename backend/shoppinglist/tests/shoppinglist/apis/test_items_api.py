from django.utils import timezone
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.exceptions import ErrorDetail
from rest_framework.test import APIRequestFactory, APITestCase, APIClient
from collections import OrderedDict
from shoppinglist.models import List, Item


class ItemsTestCase(APITestCase):
    
    def setUp(self):
        # Set datetime
        self.datetime = timezone.now()

        # Create lists and items
        for i in range(3):
            list = List.objects.create(title = f"list{i + 1}", created = self.datetime)
            Item.objects.create(title = f"item{i + 1}", qty = i + 1, price = i + 1, created = self.datetime, list = list)

        # Set url
        self.request = APIRequestFactory().get(reverse("item-list"))
        self.list_url = reverse("item-list", request = self.request)

        # Set client
        self.client = APIClient()

    def test_get_list_request(self):
        # Send get request to api/items
        response = self.client.get(self.list_url)

        # Ensure that status code is 200
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that there are 3 items
        response_data = response.data
        self.assertEqual(response_data["count"], 3)

        # Check items results
        expected_results = [
            OrderedDict({
                "id": i + 1,
                "title": f"item{i + 1}",
                "list": i + 1,
                "created": self.datetime.strftime("%b %d %Y, %I:%M %p")
            }) for i in range(3)
        ]
        self.assertEqual(response_data["results"], expected_results)

    def test_get_detail_request(self):
        url = reverse("item-detail", args = [1], request = self.request)
        expected_response_data = {
            "url": url,
            "id": 1,
            "title": "item1",
            "qty": 1,
            "price": 1,
            "list": 1,
            "created": self.datetime.strftime("%b %d %Y, %I:%M %p"),
        }

        # Check get response data
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_response_data)

    def test_post_request(self):
        url = reverse("item-detail", args = [4], request = self.request)
        expected_response_data = {
            "url": url,
            "id": 4,
            "title": "item4",
            "qty": 4,
            "price": 4,
            "list": 1,
            "created": self.datetime.strftime("%b %d %Y, %I:%M %p"),
        }

        # Check post response data
        response = self.client.post(self.list_url, {
            "title": "item4", 
            "qty": 4, 
            "price": 4, 
            "list": 1, 
            "created": self.datetime.strftime("%b %d %Y, %I:%M %p")
            },
            format = "json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, expected_response_data)

        # Check get response data
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_response_data)

        list1_url = reverse("list-detail", args = [1], request = self.request)
        expected_response_data = {
            "url": list1_url,
            "id": 1,
            "title": "list1",
            "created": self.datetime.strftime("%b %d, %Y"),
            "items": [
                OrderedDict({
                    "url": reverse("item-detail", args = [4], request = self.request),
                    "id": 4,
                    "title": "item4",
                    "qty": 4,
                    "price": 4,
                    "list": 1,
                    "created": self.datetime.strftime("%b %d %Y, %I:%M %p")
                }),
                OrderedDict({   
                    "url": reverse("item-detail", args = [1], request = self.request),
                    "id": 1,
                    "title": "item1",
                    "qty": 1,
                    "price": 1,
                    "list": 1,
                    "created": self.datetime.strftime("%b %d %Y, %I:%M %p")
                })
            ]
        }

        response = self.client.get(list1_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_response_data)

        # Check database
        items = Item.objects.all()
        self.assertEqual(items.count(), 4)
        self.assertIn(Item.objects.get(title = "item4"), items)

    def test_put_request(self):
        url = reverse("item-detail", args = [2], request = self.request)
        expected_response_data = {
            "url": url,
            "id": 2,
            "title": "item2 - put",
            "qty": 10,
            "price": 10,
            "list": 3,
            "created": self.datetime.strftime("%b %d %Y, %I:%M %p")
        }

        # Check put response data
        response = self.client.put(url, {"title": "item2 - put", "qty": 10, "price": 10, "list": 3}, format = "json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_response_data)

        # Check get response data
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_response_data)

        list2_url = reverse("list-detail", args = [2], request = self.request)
        expected_response_data = {
            "url": list2_url,
            "id": 2,
            "title": "list2",
            "created": self.datetime.strftime("%b %d, %Y"),
            "items": []
        }
        response = self.client.get(list2_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_response_data)

        list3_url = reverse("list-detail", args = [3], request = self.request)
        expected_response_data = {
            "url": list3_url,
            "id": 3,
            "title": "list3",
            "created": self.datetime.strftime("%b %d, %Y"),
            "items": [
                OrderedDict({
                    "url": reverse("item-detail", args = [3], request = self.request),
                    "id": 3,
                    "title": "item3",
                    "qty": 3,
                    "price": 3,
                    "list": 3,
                    "created": self.datetime.strftime("%b %d %Y, %I:%M %p")
                }),
                OrderedDict({   
                    "url": reverse("item-detail", args = [2], request = self.request),
                    "id": 2,
                    "title": "item2 - put",
                    "qty": 10,
                    "price": 10,
                    "list": 3,
                    "created": self.datetime.strftime("%b %d %Y, %I:%M %p")
                })                
            ]
        }
        response = self.client.get(list3_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_response_data)

        # Check database
        item2 = Item.objects.get(title = "item2 - put")
        self.assertIn(item2, Item.objects.all())

        list2 = List.objects.get(title = "list2")
        self.assertEqual(list2.items.count(), 0)
        self.assertNotIn(item2, list2.items.all())

        list3 = List.objects.get(title = "list3")
        self.assertEqual(list3.items.count(), 2)
        self.assertIn(item2, list3.items.all())

    def test_delete_request(self):
        url = reverse("item-detail", args = [1], request = self.request)
        item1 = Item.objects.get(title = "item1")

        # Check delete response data
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, None)

        # Check get response data
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, {"detail": ErrorDetail(string="Not found.", code="not_found")})

        list1_url = reverse("list-detail", args = [1], request = self.request)
        expected_response_data = {
            "url": list1_url,
            "id": 1,
            "title": "list1",
            "created": self.datetime.strftime("%b %d, %Y"),
            "items": []
        }
        response = self.client.get(list1_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)     
        self.assertEqual(response.data, expected_response_data)

        # Check database
        items = Item.objects.all()
        self.assertEqual(items.count(), 2)
        self.assertNotIn(item1, items)

        list1 = List.objects.get(title = "list1")
        self.assertEqual(list1.items.count(), 0)
        self.assertNotIn(item1, list1.items.all())