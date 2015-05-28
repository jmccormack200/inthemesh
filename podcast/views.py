from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage
from podcast.models import Podcast

def index(request):
    podcasts = Podcast.objects.all().order_by('-episode_number')
    return render(request, 'index.htm', {'podcasts': podcasts})