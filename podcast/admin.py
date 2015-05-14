from django.contrib import admin
from podcast.models import Podcast


class PodcastAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}


admin.site.register(Podcast, PodcastAdmin)