from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    capacity = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.name

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

    def __str__(self):
        return 'Order ' + self.pk.__str__()

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.PROTECT)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=0)
    isDone = models.BooleanField(default=False)

    def __str__(self):
        return self.product.name + ' ' + self.quantity.__str__()