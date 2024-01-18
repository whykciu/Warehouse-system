from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

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
    
@csrf_exempt
def get_warehouse_employee(request, id=-1):
    if request.method == "GET":
        response = WarehouseEmployee.objects.filter(pk=id).exists()
        return HttpResponse(response)
    else:
        return JsonResponse({'error': 'Not a GET method'})
    
@csrf_exempt
def get_tasks(request, id=-1):
    if request.method == "GET":
        employee = WarehouseEmployee.objects.get(pk=id)
        tasks = employee.get_tasks()
        serialized_data = []

        for task in tasks:
            serialized_data.append({'pk': task.pk, 'title': task.title, 'date': task.date, 'type': task.type})
        return JsonResponse(serialized_data, safe=False)
    else:
        return JsonResponse({'error': 'Not a GET method'})