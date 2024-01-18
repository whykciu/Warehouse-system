from django.db import models
from warehouse.models import Task, Delivery, WarehouseTask, CustomTask

class User(models.Model):

    class Role(models.TextChoices):
        CLIENT = 'CLI', 'Client'
        OFFICE = 'OFF', 'Office employee'
        WAREHOUSE = 'WAR', 'Warehouse employee'

    email = models.EmailField(default="")
    password = models.CharField(max_length=100)
    name = models.CharField(max_length=100) 
    surname = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    role = models.CharField(
        max_length=3,
        choices=Role.choices,
        default=Role.CLIENT
    )

    def __str__(self):
        return self.name + ' ' + self.surname

    class Meta:
        abstract = True

class WarehouseEmployee(User):

    def get_tasks(self):
        tasks: [] = []
        tasks.extend(self.get_deliveries())
        tasks.extend(self.get_warehouse_tasks())
        tasks.extend(self.get_custom_tasks())
        return tasks

    def get_deliveries(self):
        return Delivery.objects.filter(executingEmployee=self)
    
    def get_warehouse_tasks(self):
        return WarehouseTask.objects.filter(executingEmployee=self)

    def get_custom_tasks(self):
        return CustomTask.objects.filter(executingEmployee=self)
