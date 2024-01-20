from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import *

@receiver(post_save, sender=User)
def create_warehouse_employee(sender, instance, created, **kwargs):
    if created and instance.role == 'WAR':
        print(instance.name + ' ' + instance.surname + ' is a warehouse employee')
        WarehouseEmployee.objects.create(user=instance).save()
    elif created and instance.role == 'CLI':
        print(instance.name + ' ' + instance.surname + ' is a warehouse employee')
        Client.objects.create(user=instance).save()
    elif created and instance.role == 'OFF':
        print(instance.name + ' ' + instance.surname + ' is a warehouse employee')
        OfficeEmployee.objects.create(user=instance).save()