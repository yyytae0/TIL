# Generated by Django 3.2.18 on 2023-03-20 05:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0002_article_new'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='dummy',
            field=models.TextField(default='dummy'),
            preserve_default=False,
        ),
    ]
