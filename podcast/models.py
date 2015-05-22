from django.db import models
from django.conf import settings
import os

RAW_AUDIO = os.path.join('audio', 'raw')
FINAL_AUDIO = os.path.join('audio', 'final')

def build_filename(path, suffix=None):
    def wrapper(instance, filename):
        ext = filename.split('.')[-1]
        f = ''
        if suffix:
            f = '-' + suffix
        f = format(instance.episode_number, '02') + '-' + instance.slug + f
        filename = '{}.{}'.format(f, ext)
        return os.path.join(path, filename)
    return wrapper


class Podcast(models.Model):
    episode_number = models.PositiveSmallIntegerField()
    title = models.CharField(max_length=64)
    raw_audio = models.FileField(upload_to=build_filename(
        os.path.join(settings.MEDIA_ROOT, RAW_AUDIO), suffix='raw'
    ))
    final_audio = models.FileField(upload_to=build_filename(
        os.path.join(settings.MEDIA_ROOT, FINAL_AUDIO)
    ))
    description = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    blurb = models.TextField(max_length=64)
    slug = models.SlugField(max_length=64, blank=True)

    def audio_urls(self):
        return {
            'final': '/media/audio/final/{}-{}.mp3'.format(
                format(self.episode_number, '02'),
                self.slug),
            'raw': '/media/audio/raw/{}-{}-raw.mp3'.format(
                format(self.episode_number, '02'),
                self.slug)
        }

    def save(self, *args, **kwargs):
        super(Podcast, self).save(*args, **kwargs)

    def __str__(self):
        return 'Episode #{0}: {1}'.format(self.episode_number, self.title)
