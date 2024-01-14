from django.contrib import admin
from .models import *

admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Delivery)
admin.site.register(WarehouseTask)
admin.site.register(WarehouseTaskItem)
admin.site.register(CustomTask)