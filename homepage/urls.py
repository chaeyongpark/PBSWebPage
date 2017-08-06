from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^home', views.home, name='home'),
    url(r'^info/$', views.info, name='info'),
    url(r'^contact/$', views.contact, name='contact'),
    url(r'^pbs_plus/$', views.pbs_plus, name='pbs_plus'),
    url(r'^notice/$', views.notice, name='notice'),
    url(r'^$', views.home, name='home'),
]
