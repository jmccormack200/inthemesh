from django.shortcuts import render
from podcast.models import Podcast

def index(request, page=0):
    try:
        page = int(page)
    except:
        page = 0
    podcasts = Podcast.objects.all()[page:page+10]
    return render(request, 'index.htm', {'podcasts':podcasts})