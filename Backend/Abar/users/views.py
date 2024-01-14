from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
def get_warehouse_employees(request):
    if request.method == "GET":
        employees = WarehouseEmployee.objects.all()
        serialized_data = []

        for employee in employees:
            serialized_data.append({'pk': employee.pk, 'name': employee.name, 'surname': employee.surname})
    
        return JsonResponse(serialized_data, safe=False)
    else:
        return JsonResponse({'error': 'Not a GET method'})