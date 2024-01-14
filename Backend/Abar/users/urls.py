from django.urls import path
from . import views

urlpatterns = [
    path("employees/warehouse/", views.get_warehouse_employees),
]