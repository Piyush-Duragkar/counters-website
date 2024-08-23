from rest_framework import viewsets
from .models import Counter
from .serializers import CounterSerializer

class CounterViewSet(viewsets.ModelViewSet):
    queryset = Counter.objects.all()
    serializer_class = CounterSerializer


def create(self, request, *args, **kwargs):
    serial_number = Counter.objects.count() + 1
    name = f"counter {serial_number}"
    request.data['name']=name
    return super().create(request, *args, **kwargs)