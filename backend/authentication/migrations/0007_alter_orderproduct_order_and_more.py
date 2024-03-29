# Generated by Django 4.2.11 on 2024-03-20 21:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0006_packageorder_bill'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderproduct',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_products', to='authentication.order'),
        ),
        migrations.AlterField(
            model_name='packageorderproduct',
            name='package_order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='package_order_products', to='authentication.packageorder'),
        ),
    ]
