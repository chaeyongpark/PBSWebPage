from django.views.generic import View
from django.views.generic import TemplateView
from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from homepage.models import *
from datetime import datetime
import json

class BasicView(TemplateView):
    npk = None
    cpk = None

    def get(self, request):
        menu_list = NavbarMenu.objects.get(pk=self.npk).category.all()
        c = menu_list.get(pk=self.cpk)

        return render(request, self.template_name, {'menu': menu_list, 'current': c})

def add_delta(ob):
    for n in ob:
        if (datetime.now().date() - n.date).days < 7:
            n.delta = True
        else:
            n.delta = False

def page_movement(now_str, data_types, num):
    now = int(now_str)
    start_point = (now - 1) * num
    data_type = data_types[start_point: start_point + num]
    add_delta(data_type)

    qs = serializers.serialize('json', data_type)
    data = json.loads(qs, encoding='utf-8')
    
    return { 'data': data, 'now': now, 'new': [ n.delta for n in data_type] }

class Home(View):
    vobject = Video
    nobject = Notice

    def get(self, request):
        rvideo = self.vobject.objects.last()
        ivideo = self.vobject.objects.all()[1]
        rnote = self.nobject.objects.last()
        rsurvey = self.nobject.objects.last()
        return render(request, 'homepage/home.html', { 'rvideo': rvideo, 'ivideo': ivideo, 'rnote': rnote, 'rsurvey': rsurvey })

class Info(BasicView):
    template_name = 'homepage/info.html'

class History(BasicView):
    template_name = 'homepage/history.html'

class Ci(BasicView):
    template_name = 'homepage/ci.html'

class Chart(BasicView):
    template_name = 'homepage/chart.html'

class Contact(BasicView):
    template_name = 'homepage/contact.html'

class CommingSoon(BasicView):
    template_name = 'homepage/comming_soon.html'

class ShowVideos(View):
    npk = None
    cpk = None
    tname = 'homepage/video.html'

    def get_videos(self):
        menu_list = NavbarMenu.objects.get(pk=self.npk).category.all()
        c = menu_list.get(pk=self.cpk)
        videos = sorted(Video.objects.filter(category__id = c.id), key=lambda v: v.date, reverse=True)
        page = range(1, len(videos)//6 + 2)

        return {'menu_list': menu_list, 'c': c, 'videos': videos, 'page': page}

    def get(self, request):
        val = self.get_videos()
        if request.GET.get('v') is None:
            if len(val['videos']) is 0:
                return render(request, self.tname, { 'menu': val['menu_list'], 'current': val['c'], 'video': [] })

            m_video = val['videos'][0]
            video = val['videos'][0:6]
            now = 1;

        else: 
            m_video = Video.objects.filter(pk = request.GET.get('v'))[0]
            now = int(request.GET.get('p'))
            start_point = (now - 1) * 6
            video = val['videos'][start_point: start_point + 6]

        return render(request, self.tname, { 'menu': val['menu_list'], 'current': val['c'], 'video': video, 'main_video': m_video, 'page': val['page'], 'now': now })

    def post(self, request):
        val = self.get_videos()
        ret = page_movement(request.POST.get('next_page'), val['videos'], 6)
        curl = c.url
        return JsonResponse({ 'video': ret['data'], 'page': val['page'], 'now': ret['now'] })

class ShowVideosFb(ShowVideos):
    tname = 'homepage/videofb.html'

class Notice(View):
    menu_list = NavbarMenu.objects.get(pk=7).category.all()
    c = menu_list.get(pk=12)
    NUM_OF_NOTE = 3
    nobject = Notice

    def get(self, request):
        notes = self.nobject.objects.all().order_by('-id')
        page = range(1, (len(notes)-1)//self.NUM_OF_NOTE + 2)

        if request.GET.get('n') is None:
            note = notes[0: self.NUM_OF_NOTE]
            add_delta(note)
            return render(request, 'homepage/notice.html', { 'menu': self.menu_list, 'current': self.c, 'page': page, 'now': 1, 'note': note})

        else:
            note = notes.get(pk = request.GET.get('n'))
            return render(request, 'homepage/view_note.html', { 'menu': self.menu_list, 'current': self.c, 'note': note })

    def post(self, request):
        notes = self.nobject.objects.all().order_by('-id')
        page = range(1, (len(notes)-1)//self.NUM_OF_NOTE + 2)

        ret = page_movement(request.POST.get('next_page'), notes, self.NUM_OF_NOTE)
        return JsonResponse({ 'note': ret['data'], 'page': page, 'now': ret['now'], 'new': ret['new']})
    
def survey(request):
    menu_list = NavbarMenu.objects.get(pk=7).category.all()
    c = menu_list.get(pk=13)
    return render(request, 'homepage/view_survey.html', {'menu': menu_list, 'current': c})

class CardNews(View):
    menu_list = NavbarMenu.objects.get(pk=3).category.all()
    c = menu_list.get(pk=4)
    NUM_OF_CARDNEWS = 6
    cobject = CardNews
    
    def post(self, request):
        cards = self.cobject.objects.all().order_by('-id')
        page = range(1, (len(cards)-1)//self.NUM_OF_CARDNEWS + 2)

        ret = page_movement(request.POST.get('next_page'), cards, self.NUM_OF_CARDNEWS)
	return JsonResponse({ 'card': data, 'page': page, 'now': now})

    def get(self, request):
        cards = self.cobject.objects.all().order_by('-id')
        page = range(1, (len(cards)-1)//self.NUM_OF_CARDNEWS + 2)

        if request.GET.get('c') is None:
            card = cards[0: self.NUM_OF_CARDNEWS];
            return render(request, 'homepage/cardnews.html', { 'menu': self.menu_list, 'current': self.c, 'page': page, 'now': 1, 'card': card})

        else:
            card = cards.get(pk = request.GET.get('c'));
	    return render(request, 'homepage/view_cardnews.html', { 'menu': self.menu_list, 'current': self.c, 'card': card })
