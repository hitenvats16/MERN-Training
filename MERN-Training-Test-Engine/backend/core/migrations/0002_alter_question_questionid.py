# Generated by Django 4.1 on 2022-08-06 08:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='questionID',
            field=models.IntegerField(editable=False, primary_key=True, serialize=False, unique=True),
        ),
    ]