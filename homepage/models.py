from __future__ import unicode_literals
from django.utils.encoding import python_2_unicode_compatible
from django.db import models

@python_2_unicode_compatible
class Category(models.Model):
    name = models.CharField(max_length = 32)
    explain = models.CharField(max_length = 64, null = True, default = 'this is body', blank = True)
    link = models.CharField(max_length = 16, default='/')
    order = models.IntegerField(default = 0)

    def __str__(self):
        return self.name

@python_2_unicode_compatible
class NavbarMenu(models.Model):
    name = models.CharField(max_length = 32)
    category = models.ManyToManyField(Category, blank = True)
    banner = models.CharField(max_length=32, blank = True)

    def __str__(self):
        return self.name

@python_2_unicode_compatible
class Video(models.Model):
    title = models.CharField(max_length = 64)
    category = models.ForeignKey(Category)
    url = models.CharField(max_length = 64)
    explain = models.CharField(max_length = 64, null = True, default="This is test comment of video. you should fill this place")
    date = models.DateField(blank = True, null = True)
    is_youtube = models.BooleanField(default = True)

    def __str__(self):
        return self.title

@python_2_unicode_compatible
class Notice(models.Model):
    title = models.CharField(max_length = 64)
    date = models.DateField(blank = True, null = True)
    content = models.TextField(null = True)

    def __str__(self):
        return self.title

@python_2_unicode_compatible
class CardImage(models.Model):
    title = models.CharField(max_length = 16)
    image = models.ImageField(upload_to = 'img/cardnews/', default = 'static/img/cardnews/default.png')

    def __str__(self):
        return self.title

@python_2_unicode_compatible
class CardNews(models.Model):
    title = models.CharField(max_length = 64)
    date = models.DateField(blank = True, null = True)
    images = models.ManyToManyField(CardImage, blank = True)

    def __str__(self):
        return self.title


@python_2_unicode_compatible
class Survey(models.Model):
    title = models.CharField(max_length = 64)
    date = models.DateField(blank = True, null = True)
    content = models.CharField(max_length = 64)

    def __str__(self):
        return self.title

@python_2_unicode_compatible
class Board(models.Model):
    title = models.CharField(max_length = 64)
    date = models.DateField(blank = True, null = True)
    content = models.TextField(default='no')

    def __str__(self):
        return self.title

