from typing import Any
from django.db import models
from abc import ABC, abstractmethod

class Product(models.Model):
    name = models.CharField(max_length=100)
    capacity = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='products_img/', null=True, blank=True)

    def __str__(self):
        return self.name + ' ' + self.capacity.__str__() + ' ml ' + self.price.__str__() + ' zł'

class Order(models.Model):

    class Status(models.TextChoices):
        NEW = 'NEW', 'New'
        IN_PROGRESS = 'INP', 'In progress'
        DONE = 'DON', 'Done'

    status = models.CharField(
        max_length=3,
        choices=Status.choices,
        default=Status.NEW
    )

    task = models.ForeignKey('Delivery', on_delete=models.CASCADE, null=True, blank=True)
    client = models.ForeignKey('users.Client', on_delete=models.CASCADE, null=True, blank=True)

    def get_items(self):
        return OrderItem.objects.filter(order=self)

    def __str__(self):
        return 'Order ' + self.pk.__str__()

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)
    isDone = models.BooleanField(default=False)

    def __str__(self):
        return self.product.name + ' ' + self.quantity.__str__()
    
class Task(models.Model):

    class Type(models.TextChoices):
        DELIVERY = 'DEL', 'Delivery'
        WAREHOUSE = 'WRH', 'Warehouse'
        CUSTOM = 'CUS', 'Custom'

    class Status(models.TextChoices):
        NEW = 'NEW', 'New'
        IN_PROGRESS = 'INP', 'In progress'
        DONE = 'DON', 'Done'

    status = models.CharField(
        max_length=3,
        choices=Status.choices,
        default=Status.NEW
    )

    executingEmployee = models.ForeignKey('users.WarehouseEmployee', on_delete=models.CASCADE)
    title = models.CharField(max_length=100, null=True, blank=True)
    date = models.DateField(auto_now_add=True)
    type = models.CharField(
        max_length=3,
        choices=Type.choices,
        default=Type.DELIVERY,
        null=True,
        blank=True
    )

    class Meta: 
        abstract = True

    @abstractmethod
    def start(self):
        self.status = Task.Status.IN_PROGRESS
        self.save()

    @abstractmethod
    def finish(self):
        self.status = Task.Status.DONE
        self.save()

    @abstractmethod
    def setUpTask(self, **kwargs):
        pass

class Delivery(Task):

    def __init__(self, *args: Any, **kwargs: Any):
        self.orders = kwargs.pop('orders', []) 
        super().__init__(*args, **kwargs)
         
    def get_orders(self):
        return Order.objects.filter(task=self)

    def start(self):
        orders = self.get_orders()
        for order in orders:
            order.status = Order.Status.IN_PROGRESS
            order.save()
        super().start()

    def finish(self):
        orders = self.get_orders()
        for order in orders:
            order.status = Order.Status.DONE
            order.save()
        super().finish()

    def setUpTask(self, **kwargs):
        self.title = self.__str__()
        self.type = Task.Type.DELIVERY
        self.save()
        for order in self.orders:
            order.status = Order.Status.IN_PROGRESS
            order.task = self
            order.save()

    def __str__(self):
        return 'Delivery ' + self.pk.__str__()
    
class WarehouseTask(Task):

    task_item = models.ForeignKey('WarehouseTaskItem', on_delete=models.PROTECT)

    def __init__(self, *args: Any, **kwargs: Any):
        super().__init__(*args, **kwargs)

    def setUpTask(self, **kwargs):
        self.title = self.__str__()
        self.type = Task.Type.WAREHOUSE
        self.task_item = kwargs['task_item']
        self.save()

    def start(self):    
        super().start()

    def finish(self):
        super().finish()

    def __str__(self):
        return 'Warehouse task ' + self.pk.__str__()
    
class WarehouseTaskItem(models.Model):
    description = models.CharField(max_length=100)
    def __str__(self):
        return self.description

class CustomTask(Task):

    description = models.TextField()

    def __init__(self, *args: Any, **kwargs: Any):
        super().__init__(*args, **kwargs)

    def setUpTask(self, **kwargs):
        self.type = Task.Type.CUSTOM
        self.description = kwargs['description']
        self.save()

    def start(self):
        return super().start()
    
    def finish(self):
        return super().finish()

    def __str__(self):
        return 'Custom task ' + self.pk.__str__()


class TaskCreator(ABC):

    class Meta: 
        abstract = True
    
    def create(self, **kwargs):
        task = self.createNewTask(**kwargs)
        task.setUpTask(**kwargs)

    @abstractmethod
    def createNewTask(self, **kwargs):
        pass

class DeliveryCreator(TaskCreator):
    def createNewTask(self, **kwargs):
        return Delivery(**kwargs)
        
class WarehouseCreator(TaskCreator):
    def createNewTask(self, **kwargs):
        return WarehouseTask(**kwargs)
    
class CustomCreator(TaskCreator):
    def createNewTask(self, **kwargs):
        return CustomTask(**kwargs)