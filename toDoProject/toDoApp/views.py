from django.shortcuts import render
from toDoApp.models import ToDo
from toDoApp.serializers import ToDoSerializer
from rest_framework import viewsets


# Create your views here.

class ToDoViewSet(viewsets.ModelViewSet):
   queryset = ToDo.objects.all()   
   serializer_class = ToDoSerializer