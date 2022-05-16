from django.utils import timezone
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.exceptions import ErrorDetail
from rest_framework.test import APIRequestFactory, APITestCase, APIClient
from collections import OrderedDict
from shoppinglist.models import List


class ListsTestCase(APITestCase):
    
    def setUp(self):
        # Set datetime
        self.datetime = timezone.now()

        # Create lists
        for i in range(3):
            List.objects.create(title = f"list{i + 1}", created = self.datetime)

        # Set url
        self.request = APIRequestFactory().get(reverse("list-list"))
        self.list_url = reverse("list-list", request = self.request)

        # Set client
        self.client = APIClient()

    def test_get_list_request(self):
        # Send get request to api/lists
        response = self.client.get(self.list_url)

        # Ensure that status code is 200
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that there are 3 lists
        response_data = response.data
        self.assertEqual(response_data["count"], 3)

        # Check lists results
        expected_results = [
            OrderedDict({
                "url": reverse("list-detail", args = [i + 1], request = self.request), 
                "id": i + 1, 
                "title": f"list{i + 1}", 
                "created": self.datetime.strftime("%b %d, %Y")
                }) for i in range(3)
        ]
        self.assertEqual(response_data["results"], expected_results)

    def test_get_detail_request(self):
        url = reverse("list-detail", args = [1], request = self.request)
        expected_response_data = {
            "url": url,
            "id": 1,
            "title": "list1",
            "created": self.datetime.strftime("%b %d, %Y"),
            "items": []
        }

        # Check get response data
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_response_data)

    def test_post_request(self):
        url = reverse("list-detail", args = [4], request = self.request)
        expected_response_data = {
            "url": url,
            "id": 4,
            "title": "list4",
            "created": self.datetime.strftime("%b %d, %Y"),
            "items": []
        }

        # Check post response data
        response = self.client.post(self.list_url, {"title": "list4", "created": self.datetime}, format = "json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, expected_response_data)

        # Check get response data
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_response_data)

        # Check database
        lists = List.objects.all()
        self.assertEqual(lists.count(), 4)
        self.assertIn(List.objects.get(title = "list4"), lists)

    def test_put_request(self):
        url = reverse("list-detail", args = [1], request = self.request)
        expected_response_data = {
            "url": url,
            "id": 1,
            "title": "list1 - put",
            "created": self.datetime.strftime("%b %d, %Y"),
            "items": []
        }

        # Check put response data
        response = self.client.put(url, {"title": "list1 - put"}, format = "json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_response_data)

        # Check get response data
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_response_data)

        # Check database
        self.assertIn(List.objects.get(title = "list1 - put"), List.objects.all())

    def test_delete_request(self):
        url = reverse("list-detail", args = [1], request = self.request)
        list1 = List.objects.get(id = 1)

        # Check delete response data
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, None)

        # Check get response data
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, {"detail": ErrorDetail(string="Not found.", code="not_found")})

        # Check database
        lists = List.objects.all()
        self.assertEqual(lists.count(), 2)
        self.assertNotIn(list1, lists)