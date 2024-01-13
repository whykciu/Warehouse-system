from django.db import models

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


