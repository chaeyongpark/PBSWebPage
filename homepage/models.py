from __future__ import unicode_literals
from django.utils.encoding import python_2_unicode_compatible
from django.db import models

@python_2_unicode_compatible
class Category(models.Model):
	name = models.CharField(max_length=40)
	
	def __str__(self):
		return self.name

@python_2_unicode_compatible
class Video(models.Model):
	title = models.CharField(max_length=100)
	category = models.ForeignKey(Category)
	url = models.CharField(max_length=100)
	
	def __str__(self):
		return self.title
