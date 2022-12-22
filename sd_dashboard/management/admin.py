from django.contrib import admin

# Register your models here.
from .models import Restaurant, Customer, Driver, Meal, Order, OrderDetails, User


admin.site.register(User)

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'phone', 'address')
    list_filter = ('name', 'address')
    search_fields = ('user', 'name')


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'address')
    list_filter = ('user', 'address')
   # search_fields = ('user', 'name')

@admin.register(Driver)
class DriverAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'address')
    list_filter = ('user', 'address')


@admin.register(Meal)
class MealAdmin(admin.ModelAdmin):
    list_display = ('restaurant', 'name', 'price')
    list_filter = ('restaurant', 'name')
#    search_fields = ('restaurant', 'name')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('customer', 'restaurant', 'driver', 'address', 'total', 'status','created_at', 'picked_at')
    list_filter = ('customer', 'restaurant', 'driver', 'address', 'total', 'status', 'created_at', 'picked_at')

@admin.register(OrderDetails)
class OrderDetailsAdmin(admin.ModelAdmin):
    list_display = ('order', 'meal', 'quantity', 'sub_total')
    list_filter = ('order', 'meal', 'quantity', 'sub_total')
