from django.shortcuts import render
from django.http import HttpResponse
from homepage.models import Video, NavbarMenu

def home(request):
    recent_video = Video.objects.last()

    return render(request, 'homepage/home.html', {'recent_video': recent_video})

def info(request):
    menu_list = NavbarMenu.objects.get(pk=2).category.all()
    c = menu_list[0];
    return render(request, 'homepage/info.html', {'menu': menu_list, 'current': c});

def contact(request):
    menu_list = NavbarMenu.objects.get(pk=2).category.all()
    c = menu_list[5];
    return render(request, 'homepage/contact.html', {'menu': menu_list, 'current': c});

def pbs_plus(request):
    menu_list = NavbarMenu.objects.get(pk=3).category.all()
    c = menu_list[1];

    video = Video.objects.last()
    return render(request, 'homepage/pbs_plus.html', {'menu': menu_list, 'current': c, 'video': video});
