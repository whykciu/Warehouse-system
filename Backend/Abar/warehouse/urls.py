from django.urls import path
from . import views

urlpatterns = [
    path("products/", views.get_products),
    path("order/send/", views.post_order),
    path("orders/", views.get_orders),
    path("task/delivery/send/", views.post_task_delivery),
    path("task/warehouse-task/", views.get_warehouse_tasks),
    path("task/warehouse-task/send/", views.post_task_warehouse),
    path("task/custom-task/send/", views.post_task_custom),
    # path("delivery/<int:id>/", views.get_delivery),
    path("delivery/<int:id>/details/", views.get_delivery_details),
]