from django.conf.urls import url
from . import views
from homepage.views import *

urlpatterns = [
    url(r'^$', Home.as_view(), name='home'),
    url(r'^info/$', Info.as_view(npk = 2, cpk = 16), name='info'),
    url(r'^history/$', History.as_view(npk = 2, cpk = 17), name='history'),
    url(r'^ci/$', Ci.as_view(npk = 2, cpk = 18), name='ci'),
    url(r'^chart/$', Chart.as_view(npk = 2, cpk = 19), name='ci'),
    url(r'^contact/$', Contact.as_view(npk = 2, cpk = 21), name='contact'),
    url(r'^news/$', ShowVideos.as_view(npk = 3, cpk = 1), name='news'),
    url(r'^pbs_plus/$', ShowVideos.as_view(npk = 3, cpk = 2), name='pbs_plus'),
    url(r'^poq/$', ShowVideos.as_view(npk = 3, cpk = 3), name='poq'),
    url(r'^card_news/$', CardNews.as_view(), name='card_news'),
    url(r'^surplus_media/$', ShowVideos.as_view(npk = 4, cpk = 5), name='surplus_media'),
    url(r'^entertainment/$', ShowVideos.as_view(npk = 4, cpk = 6), name='entertainment'),
    url(r'^radio/$', ShowVideosFb.as_view(npk = 5, cpk = 7), name='radio'),
    url(r'^festival/$', ShowVideos.as_view(npk = 6, cpk = 8), name='festival'),
    url(r'^sciencewar/$', ShowVideos.as_view(npk = 6, cpk = 9), name='sciencewar'),
    url(r'^orientation/$', ShowVideos.as_view(npk = 6, cpk = 10), name='orientation'),
    url(r'^meeting/$', ShowVideos.as_view(npk = 6, cpk = 11), name='meeting'),
    url(r'^notice/$', Notice.as_view(), name='notice'),
    url(r'^survey/$', views.survey, name='survey'),
    url(r'^board/$', CommingSoon.as_view(npk = 7, cpk = 14), name='comming'),
    url(r'^story/$', CommingSoon.as_view(npk = 7, cpk = 15), name='comming'),
]
