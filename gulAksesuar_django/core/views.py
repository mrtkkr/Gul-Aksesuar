from django.shortcuts import render
from accounts.models import User
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from urllib.parse import urlencode, parse_qs


# Create your views here.


class Pagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'pageSize'

    def get_paginated_response(self, data):
        request = self.request

        # Orijinal query string'ten parametreleri al
        query_dict = dict(parse_qs(request.META.get('QUERY_STRING', '')))
        query_dict.pop(self.page_query_param, None)  # önceki page parametresini çıkar

        def build_url(page_number):
            query_dict[self.page_query_param] = [str(page_number)]
            new_query = urlencode(query_dict, doseq=True)
            return f"{request.build_absolute_uri(request.path)}?{new_query}"

        return Response({
            'count': self.page.paginator.count,
            'next': build_url(self.page.next_page_number()) if self.page.has_next() else None,
            'previous': build_url(self.page.previous_page_number()) if self.page.has_previous() else None,
            'results': data
        })   


class ProductPagination(PageNumberPagination):
    page_size = 10

class ProductsView(APIView):
    def get(self, request):
        # Parametreleri al
        order_by = request.query_params.get('order_by', 'date')
        order = request.query_params.get('order', 'asc')
        productName = request.query_params.get('productName', '')
        productPrice = request.query_params.get('productPrice', '')
        productCategory = request.query_params.get('productCategory', '')

        # Filtreleme
        filters = Q()
        if productName:
            filters &= Q(product_name__icontains=productName)
        if productPrice:
            filters &= Q(product_price=productPrice)
        if productCategory:
            filters &= Q(category__category_name__icontains=productCategory)

        # Filtreleri uygula
        products = Product.objects.filter(filters)

        # Sıralama uygula
        if order == 'asc':
            products = products.order_by(order_by)
        else:
            products = products.order_by(f'-{order_by}')

        # Sayfalama
        paginator = ProductPagination()
        result_page = paginator.paginate_queryset(products, request)
        serializer = ProductReadSerializer(result_page, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetailView(APIView):
    def get(self, request, pk):
        invoice = get_object_or_404(Product, pk=pk)
        serializer = ProductReadSerializer(invoice)
        return Response(serializer.data)

    def put(self, request, pk):
        invoice = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(invoice, data=request.data)
        if serializer.is_valid():
            serializer.save()
            read_serializer = ProductReadSerializer(invoice)
            return Response(read_serializer.data)
        return Response(read_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        invoice = get_object_or_404(Product, pk=pk)
        invoice.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

