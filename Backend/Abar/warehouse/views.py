import json
from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpRequest
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import *
from users.models import *
from django.http import JsonResponse
from django.core import serializers
from .forms import ProductForm

@csrf_exempt
def get_products(request):
    if request.method == "GET":
        products = Product.objects.all()
        serialized_data = []

        for product in products:
            form = ProductForm(instance=product)
            serialized_data.append({'pk': product.pk, 'isSelected': False, **{field: form[field].value() for field in form.fields}})
        
        return JsonResponse(serialized_data, safe=False)

    else:
        return JsonResponse({'error': 'Not a GET method'})
    
@csrf_exempt
def get_orders(request):
    if request.method == "GET":
        orders = Order.objects.filter(status=Order.Status.NEW)
        serialized_data = []

        for order in orders:
            orderItems = OrderItem.objects.filter(order=order)
            client = order.client
            email = client.user.email
            address = client.user.address
            serialized_data.append({'pk': order.pk, 'status': order.status, 'clientEmail': email , 'clientAddress': address, 'orderItems': [{'pk_item': item.pk, 'product_str': item.product.__str__(), 'quantity': item.quantity, 'isDone': item.isDone} for item in orderItems]})
    
        return JsonResponse(serialized_data, safe=False)
    else:
        return JsonResponse({'error': 'Not a GET method'})
    
@csrf_exempt
def get_warehouse_tasks(request):
    if request.method == "GET":
        tasks = WarehouseTaskItem.objects.all()
        serialized_data = []

        for task in tasks:
            serialized_data.append({'pk': task.pk, 'description': task.description})
        
        return JsonResponse(serialized_data, safe=False)
    else:
        return JsonResponse({'error': 'Not a GET method'})

@csrf_exempt
@require_POST
def post_order(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            if data != None: 
                order = Order.objects.create(client=Client.objects.get(pk=data['pkClient']))
                for item in data['products']:
                    try:
                        print("item:", item)
                        product_instance = Product.objects.get(pk=item["pk"])
                        OrderItem.objects.create(order=order, product=product_instance, quantity=item["quantity"])
                    except Product.DoesNotExist:
                        return JsonResponse({'error': f'Product with ID {item['pk']} not found'}, status=400)
                order.save()
                response_data = {'message': 'Order received successfully', 'order_id': order.id}
                return JsonResponse(response_data)
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
@require_POST
def post_task_delivery(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            if data != None: 
                order_objects = []
                for item in data['orderIds']:
                    try:
                        order_instance = Order.objects.get(pk=item)
                        order_instance.status = Order.Status.IN_PROGRESS
                        order_objects.append(order_instance)
                    except Order.DoesNotExist:
                        return JsonResponse({'error': f'Order with ID {item} not found'}, status=400)
                employee = WarehouseEmployee.objects.get(pk=data['pkEmployee'])
                delivery = DeliveryCreator()
                delivery.create(executingEmployee=employee, orders=order_objects)
                response_data = {'message': 'Delivery created successfully'}
                return JsonResponse(response_data)
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
@csrf_exempt
@require_POST
def post_task_warehouse(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            if data != None:                
                employee = WarehouseEmployee.objects.get(pk=data['pkEmployee'])
                item = WarehouseTaskItem.objects.get(pk=data['taskId'])
                task = WarehouseCreator()
                task.create(executingEmployee=employee, task_item=item)
                response_data = {'message': 'Warehouse task created successfully'}
                return JsonResponse(response_data)
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
@csrf_exempt
@require_POST
def post_task_custom(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            if data != None:                
                employee = WarehouseEmployee.objects.get(pk=data['pkEmployee'])
                task_title = data['title']
                task_desc = data['description']
                task = CustomCreator()
                task.create(executingEmployee=employee, title=task_title, description=task_desc)
                response_data = {'message': 'Custom task created successfully'}
                return JsonResponse(response_data)
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    

@csrf_exempt
@require_POST
def post_start_task(request, id=-1):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            if data != None:
                type = data['type']
                if type == 'DEL':
                    task = Delivery.objects.get(pk=id)
                elif type == 'WRH':
                    task = WarehouseTask.objects.get(pk=id)
                else:
                    task = CustomTask.objects.get(pk=id)
                task.start()
                return JsonResponse({'message': 'Task finished successfully'})
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
@csrf_exempt
@require_POST
def post_end_task(request, id=-1):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            if data != None:
                type = data['type']
                if type == 'DEL':
                    task = Delivery.objects.get(pk=id)
                elif type == 'WRH':
                    task = WarehouseTask.objects.get(pk=id)
                else:
                    task = CustomTask.objects.get(pk=id)
                task.finish()
                return JsonResponse({'message': 'Task finished successfully'})
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
# @csrf_exempt
# def get_delivery(request, id=-1):
#     if request.method == "GET":
#         response = Delivery.objects.filter(pk=id).exists()
#         return HttpResponse(response)
#     else:
#         return JsonResponse({'error': 'Not a GET method'})
    
    
@csrf_exempt
def get_delivery_details(request, id=-1):
    if request.method == "GET":
        orders = Delivery.objects.get(pk=id).get_orders()
        serialized_data = []

        for order in orders:
            orderItems = OrderItem.objects.filter(order=order)
            client = order.client
            email = client.user.email
            address = client.user.address
            serialized_data.append({'pk': order.pk, 'status': order.status, 'clientEmail': email, 'clientAddress': address, 'orderItems': [{'pk_item': item.pk, 'product_str': item.product.__str__(), 'quantity': item.quantity, 'isDone': item.isDone} for item in orderItems]})
    
        return JsonResponse(serialized_data, safe=False)
    else:
        return JsonResponse({'error': 'Not a GET method'})
    
@csrf_exempt
def get_orders_client(request, id=-1):
    if request.method == "GET":
        orders = Client.objects.get(pk=id).get_orders()
        serialized_data = []

        for order in orders:
            orderItems = OrderItem.objects.filter(order=order)
            client = order.client
            email = client.user.email
            address = client.user.address
            serialized_data.append({'pk': order.pk, 'status': order.status, 'orderItems': [{'pk_item': item.pk, 'product_str': item.product.__str__(), 'quantity': item.quantity, 'isDone': item.isDone} for item in orderItems]})
    
        return JsonResponse(serialized_data, safe=False)
    else:
        return JsonResponse({'error': 'Not a GET method'})