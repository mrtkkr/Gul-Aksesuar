from django.contrib import admin
from .models import *


# Register your models here.

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Slider)
admin.site.register(Order)
admin.site.register(OrderDetail)