# Generated by Django 5.1.7 on 2025-07-16 11:10

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_category_tag_snippet_comment_delete_seller'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Slider',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slider_title', models.CharField(max_length=200)),
                ('index', models.IntegerField()),
                ('slider_image', models.ImageField(upload_to='sliders/')),
                ('is_active_slider', models.BooleanField(default=True)),
                ('slider_start_date', models.DateField()),
                ('slider_end_date', models.DateField()),
            ],
        ),
        migrations.RemoveField(
            model_name='snippet',
            name='author',
        ),
        migrations.RemoveField(
            model_name='snippet',
            name='category',
        ),
        migrations.RemoveField(
            model_name='snippet',
            name='tags',
        ),
        migrations.RemoveField(
            model_name='category',
            name='description',
        ),
        migrations.RemoveField(
            model_name='category',
            name='name',
        ),
        migrations.AddField(
            model_name='category',
            name='category_name',
            field=models.CharField(default='Peynir', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='category',
            name='category_slug',
            field=models.SlugField(default='Peynir', unique=True),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total', models.BigIntegerField()),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('state', models.CharField(max_length=50)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=200)),
                ('product_description', models.TextField()),
                ('product_price', models.BigIntegerField()),
                ('is_active_product', models.BooleanField(default=True)),
                ('show_home_page', models.BooleanField(default=False)),
                ('product_image', models.ImageField(upload_to='products/')),
                ('stock_quantity', models.BigIntegerField()),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.category')),
            ],
        ),
        migrations.CreateModel(
            name='OrderDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.BigIntegerField()),
                ('unit_price', models.BigIntegerField()),
                ('line_total', models.BigIntegerField()),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.product')),
            ],
        ),
        migrations.DeleteModel(
            name='Comment',
        ),
        migrations.DeleteModel(
            name='Snippet',
        ),
        migrations.DeleteModel(
            name='Tag',
        ),
    ]
