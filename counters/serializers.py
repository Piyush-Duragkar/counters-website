from rest_framework import serializers
from .models import Counter

class CounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Counter
        fields = ['id', 'name','count']
        read_only_fields = ['name']
