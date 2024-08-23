from django.db import models

class Counter(models.Model):
    name = models.CharField(max_length=100)
    count = models.IntegerField(default=0)
