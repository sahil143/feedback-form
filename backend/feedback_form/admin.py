from .models import FeedbackForm
from django.contrib import admin

class FeedbackFormAdmin(admin.ModelAdmin):
  list_display = ('name', 'email', 'phone_number', 'password')

admin.site.register(FeedbackForm, FeedbackFormAdmin)
