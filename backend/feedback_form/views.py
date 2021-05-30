from rest_framework import viewsets
from .serializers import FeedbackFormSerializer
from .models import FeedbackForm

class FeedbackFormViews(viewsets.ModelViewSet):
    serializer_class = FeedbackFormSerializer
    queryset = FeedbackForm.objects.all()
