from rest_framework.serializers import ModelSerializer
from core.models import Question

class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = [
            'questionID',
            'question',
            'option1',
            'option2',
            'option3',
            'option4',
            'correctOption',
            'delete',
            'scoreSlider'
            ]

    