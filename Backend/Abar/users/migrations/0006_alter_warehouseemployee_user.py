# Generated by Django 5.0.1 on 2024-01-19 10:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_warehouseemployee_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='warehouseemployee',
            name='user',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.user'),
        ),
    ]
