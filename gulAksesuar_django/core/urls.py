from django.urls import path
from .views import *

urlpatterns = [
    # path("snippets/", SnippetsView.as_view(), name="snippets_api"),
    path("product/", ProductsView.as_view(), name="products_api"),
    path("products/<int:product_id>/", ProductDetailView.as_view(), name="product_detail_api"),
    # path("category/", CategoryView.as_view(), name="category_api"),
    # path("categories/<slug:category_slug>/", CategoryDetailView.as_view(), name="category_detail_api"),
    


    # path("categories/<slug:category_slug>/", CategoryDetailView.as_view(), name="category_detail_api"),
    # path("products/<int:product_id>/", ProductDetailView.as_view(), name="product_detail_api"),
    # path("sliders/", SlidersView.as_view(), name="sliders_api"),
    # path("orders/", OrdersView.as_view(), name="orders_api"),
    # path("orders/<int:order_id>/", OrderDetailView.as_view(), name="order_detail_api"),
    # path("order-details/", OrderDetailsView.as_view(), name="order_details_api"),
    # path("order-details/<int:order_detail_id>/", OrderDetailItemView.as_view(), name="order_detail_item_api"),
   
]
