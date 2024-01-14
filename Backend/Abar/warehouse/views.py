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
            serialized_data.append({'pk': order.pk, 'status': order.status})
        
        return JsonResponse(serialized_data, safe=False)
    else:
        return JsonResponse({'error': 'Not a GET method'})

@csrf_exempt
@require_POST
def post_order(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            order = Order.objects.create()

            for item in data:
                try:
                    product_instance = Product.objects.get(pk=item['pk'])
                    OrderItem.objects.create(order=order, product=product_instance, quantity=item['quantity'])
                except Product.DoesNotExist:
                    return JsonResponse({'error': f'Product with ID {item['pk']} not found'}, status=400)

            order.save()
            response_data = {'message': 'Order received successfully', 'order_id': order.id}
            return JsonResponse(response_data)
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
