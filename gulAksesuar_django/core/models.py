from django.db import models
from accounts.models import User

# Create your models here.
# class Category(models.Model):
#     name = models.CharField(max_length=100)
#     description = models.TextField(blank=True)

#     def __str__(self):
#         return self.name

# class Tag(models.Model):
#     name = models.CharField(max_length=50)

#     def __str__(self):
#         return self.name

# class Snippet(models.Model):
#     title = models.CharField(max_length=200)
#     content = models.TextField()
#     language = models.CharField(max_length=50)  # örn. "Python", "JavaScript"
#     framework = models.CharField(max_length=50, blank=True)  # örn. "React", "Django"
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#     category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
#     tags = models.ManyToManyField(Tag, blank=True)
#     is_public = models.BooleanField(default=True)  # belki bazı snippet'ler sadece belirli gruplara özel olur

#     def __str__(self):
#         return self.title

# class Comment(models.Model):
#     snippet = models.ForeignKey(Snippet, on_delete=models.CASCADE)
#     author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#     content = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)


# Category
class Category(models.Model):
    category_name = models.CharField(max_length=100)
    category_slug = models.SlugField(unique=True)

    def __str__(self):
        return self.category_name
    

# Product
class Product(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    product_name = models.CharField(max_length=200)
    product_description = models.TextField()
    product_price = models.BigIntegerField()
    is_active_product = models.BooleanField(default=True)
    show_home_page = models.BooleanField(default=False)
    product_image = models.ImageField(upload_to='products/')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    stock_quantity = models.BigIntegerField()

    def __str__(self):
        return self.product_name
    

# Slider
class Slider(models.Model):
    slider_title = models.CharField(max_length=200)
    index = models.IntegerField()
    slider_image = models.ImageField(upload_to='sliders/')
    is_active_slider = models.BooleanField(default=True)
    slider_start_date = models.DateField()
    slider_end_date = models.DateField()

    def __str__(self):
        return self.slider_title
    

# Order
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.BigIntegerField()
    date = models.DateTimeField(auto_now_add=True)
    state = models.CharField(max_length=50)

    def __str__(self):
        return f"Order #{self.id} - {self.user.username}"
    


# OrderDetail
class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.BigIntegerField()
    unit_price = models.BigIntegerField()
    line_total = models.BigIntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.product.product_name}"
    

