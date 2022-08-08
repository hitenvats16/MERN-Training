from django.urls import path
from testEngine import views

app_name = 'testengine'

urlpatterns = [
    path('save/',views.SaveData.as_view(),name='save'),
    path('load/',views.LoadData.as_view(),name='load'),
]