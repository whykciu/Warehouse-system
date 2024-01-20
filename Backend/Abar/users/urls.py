from django.urls import path
from . import views

urlpatterns = [
    path("employees/warehouse/", views.get_warehouse_employees),
    path("employees/warehouse/<int:id>/tasks/", views.get_tasks),
    path("employees/warehouse/<int:id>/", views.get_warehouse_employee),
    path("login/", views.post_login),
    path("register/", views.post_register),
]