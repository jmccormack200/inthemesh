from django.db import models


class Podcast(models.Model):
    title = models.CharField(max_length=64)
    audio = models.FileField()
    description = models.TextField()
    blurb = models.TextField(max_length=64)
    slug = models.SlugField(max_length=64, blank=True)

    def __unicode__(self):
        return self.title

    def __repr__(self):
        return self