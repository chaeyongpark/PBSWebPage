from django.shortcuts import render
from django.http import HttpResponse
from homepage.models import Video

def index(request):
	return render(request, 'homepage/index.html')

def home(request):
	recent_video = Video.objects.last()
	return render(request, 'homepage/home.html', {'recent_video': recent_video})
