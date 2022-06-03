from django.urls import include, path
from rest_framework import routers
from .import views

router = routers.DefaultRouter()
router.register(r'lists', views.ListViewSet)
router.register(r'items', views.ItemViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]