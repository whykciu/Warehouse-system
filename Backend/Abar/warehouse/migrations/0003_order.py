# Generated by Django 5.0.1 on 2024-01-12 00:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('warehouse', '0002_product_capacity'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('products_quantity_map', models.JSONField()),
            ],
        ),
    ]
