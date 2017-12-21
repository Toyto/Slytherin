from django.conf.urls import include, url
from django.contrib import admin
from core import views

urlpatterns = [
    # Examples:
    # url(r'^$', 'chamberofs.views.home', name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^create_new_user/$', views.create_new_user, name='create_new_user'),
]
