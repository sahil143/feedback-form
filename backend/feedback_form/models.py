import uuid
from django.db import models

class FeedbackForm(models.Model):
  # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  name = models.CharField(max_length=50)
  email = models.EmailField()
  phone_number = models.BigIntegerField()
  password = models.CharField(max_length=16)
  video = models.BinaryField()
