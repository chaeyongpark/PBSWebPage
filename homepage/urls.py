from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^home', views.home, name='home'),
    url(r'^info/$', views.info, name='info'),
    url(r'^history/$', views.history, name='history'),
    url(r'^ci/$', views.ci, name='ci'),
    url(r'^contact/$', views.contact, name='contact'),
    url(r'^pbs_plus/$', views.pbs_plus, name='pbs_plus'),
    url(r'^card_news/$', views.card_news, name='card_news'),
    url(r'^notice/$', views.notice, name='notice'),
    url(r'^survey/$', views.survey, name='survey'),
    url(r'^$', views.home, name='home'),
]
