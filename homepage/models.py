from __future__ import unicode_literals
from django.utils.encoding import python_2_unicode_compatible
from django.db import models

@python_2_unicode_compatible
class Category(models.Model):
    name = models.CharField(max_length=40)
    explain = models.CharField(max_length=100, null = True, default = 'this is body', blank = True)
    link = models.CharField(max_length=20, default='/')

    def __str__(self):
        return self.name

@python_2_unicode_compatible
class NavbarMenu(models.Model):
    name = models.CharField(max_length=40)
    category = models.ManyToManyField(Category, blank = True)
    banner = models.CharField(max_length=20, blank = True)

    def __str__(self):
        return self.name

@python_2_unicode_compatible
class Video(models.Model):
    title = models.CharField(max_length=100)
    category = models.ForeignKey(Category)
    url = models.CharField(max_length=100)
    explain = models.CharField(max_length=100, null = True, default="This is test comment of video. you should fill this place")
    date = models.DateField(blank = True, null = True)

    def __str__(self):
        return self.title

@python_2_unicode_compatible
class Notice(models.Model):
    title = models.CharField(max_length=60)
    date = models.DateField(blank = True, null = True)
    content = models.CharField(max_length=400)

    def __str__(self):
        return self.title
