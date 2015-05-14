# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Podcast',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
                ('title', models.CharField(max_length=64)),
                ('audio', models.FileField(upload_to='')),
                ('description', models.TextField()),
                ('blurb', models.TextField(max_length=64)),
                ('slug', models.SlugField(blank=True, max_length=64)),
            ],
        ),
    ]
