from django.contrib import admin
from rest_framework.authtoken.models import Token
from . import models


admin.site.register(models.User)
admin.site.register(models.Product)
admin.site.register(models.Package)
admin.site.register(models.Order)
admin.site.register(models.OrderProduct)





