from django.db import models
from django.conf import settings
import os

RAW_AUDIO = os.path.join('audio', 'raw')
FINAL_AUDIO = os.path.join('audio', 'final')

def build_filename(path):
    def wrapper(instance, filename):
        ext = filename.split('.')[-1]
        filename = '{}.{}'.format(instance.slug, ext)
        return os.path.join(path, filename)
    return wrapper


class Podcast(models.Model):
    title = models.CharField(max_length=64)
    raw_audio = models.FileField(upload_to=build_filename(
        os.path.join(settings.MEDIA_ROOT, RAW_AUDIO)
    ))
    final_audio = models.FileField(upload_to=build_filename(
        os.path.join(settings.MEDIA_ROOT, FINAL_AUDIO)
    ))
    description = models.TextField()
    blurb = models.TextField(max_length=64)
    slug = models.SlugField(max_length=64, blank=True)

    def save(self, *args, **kwargs):
        super(Podcast, self).save(*args, **kwargs)

    def __str__(self):
        return 'Episode #{0}: {1}'.format(self.pk, self.title)
