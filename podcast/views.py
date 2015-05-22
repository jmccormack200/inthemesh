from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage
from podcast.models import Podcast

def index(request, page=0):
    try:
        page = int(page)
    except:
        page = 0

    podcast_list = Podcast.objects.all()
    paginator = Paginator(podcast_list, 10)

    try:
        podcasts = paginator.page(page)
    except EmptyPage:
        podcasts = paginator.page(paginator.num_pages)

    return render(request, 'index.htm', {'podcasts': podcasts})

def p(request, pk, slug=None):
    podcast = Podcast.objects.get(id=pk)
    urls = podcast.audio_urls()
    return render(request, 'p.htm',
        {'podcast': podcast, 'final': urls['final'], 'raw': urls['raw']}
    )