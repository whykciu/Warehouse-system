from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json

@csrf_exempt
def get_warehouse_employees(request):
    if request.method == "GET":
        employees = WarehouseEmployee.objects.all()
        serialized_data = []

        for employee in employees:
            serialized_data.append({'pk': employee.pk, 'name': employee.user.name, 'surname': employee.user.surname})
    
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
            serialized_data.append({'pk': task.pk, 'title': task.title, 'date': task.date, 'type': task.type, 'status': task.status})
        return JsonResponse(serialized_data, safe=False)
    else:
        return JsonResponse({'error': 'Not a GET method'})

def user_exists(username):
    return User.objects.filter(email=username).exists()

def authenticate_user(email, password):
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return None 

    if user.password == password:
        return user  
    else:
        return None  
    
def get_user_by_role(user):
    if user.role == User.Role.CLIENT:
        return Client.objects.get(user=user)
    elif user.role == User.Role.OFFICE:
        return OfficeEmployee.objects.get(user=user)
    elif user.role == User.Role.WAREHOUSE:
        return WarehouseEmployee.objects.get(user=user)
    else:
        return None

@csrf_exempt
@require_POST
def post_register(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            if data != None:                
                username = data['username']
                if not user_exists(username):
                    password = data['password']
                    name = data['name']
                    surname = data['surname']
                    address = data['address']
                    phone_number = data['phoneNumber']
                    try:
                        User.objects.create(email=username, password=password, name=name, surname=surname, address=address, phone_number=phone_number, role=User.Role.CLIENT).save()
                        response_data = {'result': 'true', 'message': 'Client user created successfully'}
                    except:
                        response_data = {'result': 'false', 'message': 'Uknown error occured, try again'}
                        return JsonResponse(response_data)
                else:
                    response_data = {'result': 'false', 'message': 'User with given email already exists'}

                print(response_data)
                return JsonResponse(response_data)
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    

@csrf_exempt
@require_POST
def post_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            if data != None:                
                username = data['username']
                password = data['password']
                user = authenticate_user(username, password)
                if user != None:
                    user_by_role = get_user_by_role(user)
                    response_data = {'result': 'true', 'username': user.email, 'role': user.role, 'id': user.pk, 'pk': user_by_role.pk}
                else:
                    response_data = {'result': 'false'}
                return JsonResponse(response_data)
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)