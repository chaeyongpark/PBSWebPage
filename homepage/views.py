from django.views.generic import View
from django.views.generic import TemplateView
from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from homepage.models import *
import json

class BasicView(TemplateView):
    npk = None;
    cpk = None;

    def get(self, request):
        menu_list = NavbarMenu.objects.get(pk=self.npk).category.all()
        c = menu_list.get(pk=self.cpk)

        return render(request, self.template_name, {'menu': menu_list, 'current': c});

def home(request):
    recent_video = Video.objects.last()

    return render(request, 'homepage/home.html', {'recent_video': recent_video})

def info(request):
    menu_list = NavbarMenu.objects.get(pk=2).category.all()
    c = menu_list.get(pk=16);
    return render(request, 'homepage/info.html', {'menu': menu_list, 'current': c});

class Info(BasicView):
    template_name = "homepage/info.html"

def history(request):
    menu_list = NavbarMenu.objects.get(pk=2).category.all()
    c = menu_list.get(pk=17);
    return render(request, 'homepage/history.html', {'menu': menu_list, 'current': c});

def ci(request):
    menu_list = NavbarMenu.objects.get(pk=2).category.all()
    c = menu_list.get(pk=18);
    return render(request, 'homepage/ci.html', {'menu': menu_list, 'current': c});

def contact(request):
    menu_list = NavbarMenu.objects.get(pk=2).category.all()
    c = menu_list.get(pk=21);
    return render(request, 'homepage/contact.html', {'menu': menu_list, 'current': c});

def page_movement(now_str, videos, num_of_video):
    now = int(now_str);
    start_point = (now - 1) * num_of_video;
    video = videos[start_point: start_point + num_of_video];
         
    qs = serializers.serialize('json', video);
    data = json.loads(qs, encoding='utf-8');
  
    return { 'video': data, 'now': now};

def pbs_plus(request):
    menu_list = NavbarMenu.objects.get(pk=3).category.all()
    c = menu_list.get(pk=2);
    NUM_OF_VIDEO = 6;
    videos = sorted(Video.objects.filter(category__id = c.id), key=lambda v: v.date, reverse=True);
    page = range(1, len(videos)//NUM_OF_VIDEO + 2);

    # Page movement
    if request.POST.get('next_page') is not None:
    	ret = page_movement(request.POST.get('next_page'), videos, NUM_OF_VIDEO);

	now = int(request.POST.get('next_page'));
        start_point = (now - 1) * NUM_OF_VIDEO;
        video = videos[start_point: start_point + NUM_OF_VIDEO];
         
        qs = serializers.serialize('json', video);
        data = json.loads(qs, encoding='utf-8');

	return JsonResponse({ 'video': data, 'page': page, 'now': now });

    if request.GET.get('v') is None:
        # First loading
        if request.GET.get('p') is None:
            m_video = videos[0];
            video = videos[0:NUM_OF_VIDEO];
            now = 1;
        
    # Video change
    else:
        m_video = Video.objects.filter(pk = request.GET.get('v'))[0];
        now = int(request.GET.get('p'));
        start_point = (now - 1) * NUM_OF_VIDEO;
        video = videos[start_point: start_point + NUM_OF_VIDEO];

    return render(request, 'homepage/video.html', { 'menu': menu_list, 'current': c, 'video': video, 'main_video': m_video, 'page': page, 'now': now });

def notice(request):
    menu_list = NavbarMenu.objects.get(pk=7).category.all()
    c = menu_list.get(pk=12);
    NUM_OF_NOTE = 8;
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

def survey(request):
    menu_list = NavbarMenu.objects.get(pk=7).category.all()
    c = menu_list.get(pk=13);
    return render(request, 'homepage/view_survey.html', {'menu': menu_list, 'current': c});

def card_news(request):
    menu_list = NavbarMenu.objects.get(pk=3).category.all()
    c = menu_list.get(pk=4);
    NUM_OF_NOTE = 6;
    cards = CardNews.objects.all().order_by('-id');
    page = range(1, len(cards)//NUM_OF_NOTE + 2);

    # Page movement
    if request.POST.get('next_page') is not None: 
    	now = int(request.POST.get('next_page'));
	start_point = (now - 1) * NUM_OF_NOTE;
	card = cards[start_point: start_point + NUM_OF_NOTE];
	
	qs = serializers.serialize('json', card);
        data = json.loads(qs, encoding='utf-8');
	
	return JsonResponse({ 'card': data, 'page': page, 'now': now});
	
    # First loading
    if request.GET.get('c') is None:
        card = cards[0: NUM_OF_NOTE];
        now = 1;
        print (card[0].images.all()[0]);	
	return render(request, 'homepage/cardnews.html', { 'menu': menu_list, 'current': c, 'page': page, 'now': now, 'card': card});

    # Cardnews loading
    else:
        card = CardNews.objects.get(pk = request.GET.get('c'));

	return render(request, 'homepage/view_cardnews.html', { 'menu': menu_list, 'current': c, 'card': card });
