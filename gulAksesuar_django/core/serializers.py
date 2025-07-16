from rest_framework import serializers
from .models import *

# class SnippetSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Snippet
#         fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    product_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_product_image(self, obj):
        request = self.context.get('request')
        if obj.product_image and hasattr(obj.product_image, 'url'):
            return request.build_absolute_uri(obj.product_image.url)
        return None


class ProductReadSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    created_by = UserSerializer(read_only=True)
    product_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_product_image(self, obj):
        request = self.context.get('request')
        if obj.product_image and hasattr(obj.product_image, 'url'):
            return request.build_absolute_uri(obj.product_image.url)
        return None


