from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from homepage.models import *
import json

def home(request):
    recent_video = Video.objects.last()

    return render(request, 'homepage/home.html', {'recent_video': recent_video})

def info(request):
    menu_list = NavbarMenu.objects.get(pk=2).category.all()
    c = menu_list.get(pk=16);
    return render(request, 'homepage/info.html', {'menu': menu_list, 'current': c});

def contact(request):
    menu_list = NavbarMenu.objects.get(pk=2).category.all()
    c = menu_list.get(pk=21);
    return render(request, 'homepage/contact.html', {'menu': menu_list, 'current': c});

def pbs_plus(request):
    menu_list = NavbarMenu.objects.get(pk=3).category.all()
    c = menu_list.get(pk=2);
    videos = sorted(Video.objects.filter(category__id = c.id), key=lambda v: v.date, reverse=True);
    page = range(1, len(videos)//6 + 2);

    if request.POST.get('next_page') is not None:
	print ("JIO");

    if request.GET.get('v') is None:
        # First loading
        if request.GET.get('p') is None:
            m_video = videos[0];
            video = videos[0:6];
            now = 1;

        # Page movement
        else:
            m_video = videos[0];
            now = int(request.GET.get('p'));
            start_point = (now - 1) * 6;
            video = videos[start_point: start_point + 6];
         
            qs = serializers.serialize('json', video);
            data = json.loads(qs, encoding='utf-8');

            return JsonResponse({ 'video': data, 'page': page, 'now': now });

    # Video change
    else:
        m_video = Video.objects.filter(pk = request.GET.get('v'))[0];
        now = int(request.GET.get('p'));
        start_point = (now - 1) * 6;
        video = videos[start_point: start_point + 6];

    return render(request, 'homepage/pbs_plus.html', { 'menu': menu_list, 'current': c, 'video': video, 'main_video': m_video, 'page': page, 'now': now });

def notice(request):
    menu_list = NavbarMenu.objects.get(pk=7).category.all()
    c = menu_list.get(pk=12);
    NUM_OF_NOTE = 2;
    notes = Notice.objects.all().order_by('-id');
    page = range(1, len(notes)//NUM_OF_NOTE + 2);

    # Page movement
    if request.POST.get('next_page') is not None: 
    	now = int(request.POST.get('next_page'));
	start_point = (now - 1) * NUM_OF_NOTE;
	note = notes[start_point: start_point + NUM_OF_NOTE];
	
	qs = serializers.serialize('json', note);
        data = json.loads(qs, encoding='utf-8');
	
	return JsonResponse({ 'note': data, 'page': page, 'now': now});
	
    # First loading
    if request.GET.get('n') is None:
        note = notes[0: NUM_OF_NOTE];
        now = 1;
	
	return render(request, 'homepage/notice.html', { 'menu': menu_list, 'current': c, 'page': page, 'now': now, 'note': note});

    # Notice loading
    else:
        note = Notice.objects.get(pk = request.GET.get('n'));

	return render(request, 'homepage/view_note.html', { 'menu': menu_list, 'current': c, 'note': note });
