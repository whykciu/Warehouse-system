# Generated by Django 5.0.1 on 2024-01-21 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('warehouse', '0010_customtask_status_delivery_status_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='products_img/'),
        ),
    ]
