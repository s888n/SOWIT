# Generated by Django 5.1.6 on 2025-02-16 13:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polygons', '0003_polygon_region'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='polygon',
            name='color',
        ),
        migrations.AddField(
            model_name='polygon',
            name='description',
            field=models.TextField(blank=True, max_length=50),
        ),
    ]
