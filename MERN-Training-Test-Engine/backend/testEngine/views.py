from rest_framework.generics import CreateAPIView, ListAPIView
from testEngine.serializers import QuestionSerializer
from core.models import Question

class SaveData(CreateAPIView):
    serializer_class = QuestionSerializer

class LoadData(ListAPIView):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()