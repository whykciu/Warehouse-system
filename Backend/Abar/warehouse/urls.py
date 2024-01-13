from django.urls import path
from . import views

urlpatterns = [
    path("order/", views.get_products),
    path("order/send/", views.post_order),
    path("orders/", views.get_orders),
]