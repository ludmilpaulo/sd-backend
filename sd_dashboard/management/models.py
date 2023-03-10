from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

from django.db.models.signals import post_save
from django.conf import settings
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser
from rest_framework.authtoken.models import Token



####################################################################################

class User(AbstractUser):
    is_customer=models.BooleanField(default=False)
    is_driver=models.BooleanField(default=False)

    def __str__(self) :
        return self.username
        
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

####################################################################################

class ImageField(models.ImageField):
    def value_to_string(self, obj): # obj is Model instance, in this case, obj is 'Class'
        return obj.avatar.url # not return self.url


#######################################################################################

class Category(models.Model):
       name = models.CharField(max_length=200,
                               db_index=True)
       slug = models.SlugField(max_length=200,
                               unique=True)
       class Meta:
           ordering = ('name',)
           verbose_name = 'category'
           verbose_name_plural = 'categories'
       def __str__(self):
           return self.name



class Restaurant(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name='usuário')
	name = models.CharField(max_length=500, verbose_name='Nome do restaurante')
	phone = models.CharField(max_length=500, verbose_name='Telefone do restaurante')
	address = models.CharField(max_length=500, verbose_name='Endereço do restaurante')
	logo = models.ImageField(upload_to='restaurant_logo/', blank=False, verbose_name='Logotipo do restaurante')


	def __str__(self):
		return self.name




class Customer(models.Model):
    user = models.OneToOneField(User,
                                on_delete=models.CASCADE,
                                related_name='customer', verbose_name='usuário')
    avatar = models.ImageField(upload_to='customer/', blank=True)
    phone = models.CharField(max_length=500, blank=True, verbose_name='telefone')
    address = models.CharField(max_length=500, blank=True, verbose_name='Endereço')

    class Meta:
        verbose_name ='Cliente'
        verbose_name_plural ='Clientes'

    def __str__(self):
        return self.user.get_username()



     


class Driver(models.Model):
    user = models.OneToOneField(User,
                                on_delete=models.CASCADE,
                                related_name='driver', verbose_name='Utilizador')
    avatar = models.ImageField(upload_to='driver/', blank=True)
    phone = models.CharField(max_length=500, blank=True, verbose_name='telefone')
    address = models.CharField(max_length=500, blank=True, verbose_name='Endereço')
    location = models.CharField(max_length=500, blank=True, verbose_name='localização')

    class Meta:
        verbose_name ='Motorista'
        verbose_name_plural ='Motoristas'


    def __str__(self):
        return self.user.get_username()



	

class Meal(models.Model):
    category = models.ForeignKey(Category,
                                    related_name='meal',
                                    on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, verbose_name='restaurante')
    name = models.CharField(max_length=500, verbose_name='Nome')
    short_description = models.CharField(max_length=500, verbose_name='Pequena descrição')
    image = models.ImageField(upload_to='meal_images/', blank=False)
    price = models.IntegerField(default=0, verbose_name='preço')
    available = models.BooleanField(default=True)
    quantity = models.IntegerField(default=1, blank=True)

    class Meta:
        verbose_name ='Refeição'
        verbose_name_plural ='Refeições'

    def __str__(self):
        return self.name


class Order(models.Model):
    COOKING = 1
    READY = 2
    ONTHEWAY = 3
    DELIVERED = 4

    STATUS_CHOICES = (
        (COOKING, "Cozinhando"),
        (READY, "Pedido Pronto"),
        (ONTHEWAY, "A caminho"),
        (DELIVERED, "Entregue"),
    )

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, verbose_name='cliente')
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, verbose_name='restaurante')
    driver = models.ForeignKey(Driver, blank=True, null=True, on_delete=models.CASCADE, verbose_name='motorista')  # can be blank
    address = models.CharField(max_length=500, verbose_name='Endereco')
    total = models.IntegerField()
    status = models.IntegerField(choices=STATUS_CHOICES, verbose_name='stado')
    created_at = models.DateTimeField(default=timezone.now, verbose_name='criado em')
    picked_at = models.DateTimeField(blank=True, null=True, verbose_name='pegar em')


    class Meta:
        verbose_name ='Pedido'
        verbose_name_plural ='Pedidos'

    def __str__(self):
        return str(self.id)



class OrderDetails(models.Model):
    order = models.ForeignKey(Order, related_name='order_details', on_delete=models.CASCADE, verbose_name='Pedido')
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE, verbose_name='Refeição')
    quantity = models.IntegerField(verbose_name='Quantidade')
    sub_total = models.IntegerField()

    class Meta:
        verbose_name ='Detalhe do pedido'
        verbose_name_plural ='Detalhes dos pedidos'



    def __str__(self):
        return str(self.id)


