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
    url(r'^radio/$', ShowVideos.as_view(npk = 5, cpk = 7), name='radio'),
    url(r'^fest_posking/$', ShowVideosMoreCategory.as_view(npk = 6, cpk = 22), name='posking'),
    url(r'^fest_show/$', ShowVideosMoreCategory.as_view(npk = 6, cpk = 23), name='fest_show'),
    url(r'^poka_live/$', ShowVideosMoreCategory.as_view(npk = 6, cpk = 24), name='poka_live'),
    url(r'^poka_highlight/$', ShowVideosMoreCategory.as_view(npk = 6, cpk = 25), name='poka_highlight'),
    url(r'^orientation/$', ShowVideos.as_view(npk = 6, cpk = 10), name='orientation'),
    url(r'^meeting/$', ShowVideos.as_view(npk = 6, cpk = 11), name='meeting'),
    url(r'^notice/$', Notices.as_view(npk = 7, cpk = 12), name='notice'),
    url(r'^notice/write$', login_required(WriteNote.as_view(npk = 7, cpk = 12)), name='notice_write'),
    url(r'^survey/$', Surveys.as_view(npk = 7, cpk = 13), name='survey'),
    url(r'^survey/write$', login_required(WriteSurvey.as_view(npk = 7, cpk = 13)), name='survey_write'),
    url(r'^board/$', CommingSoon.as_view(npk = 7, cpk = 14), name='comming'),
    url(r'^story/$', CommingSoon.as_view(npk = 7, cpk = 15), name='comming'),
    url(r'^search/$', Search.as_view(), name='search'),
]
