from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from core.models import Question

SAVE_URL = reverse('testengine:save')
LOAD_URL = reverse('testengine:load')

class modelTest(APITestCase):
    """Test for creating and retrieving data"""
    def test_for_saving_data_to_the_server(self):
        payload = {
            'questionID':12,
            'question':'question123',
            'option1':'abc',
            'option2':'def',
            'option3':'ghi',
            'option4':'jkl',
            'correctOption': 'option1',
            'delete': False,
            'scoreSlider': 2,
        }

        res = self.client.post(SAVE_URL,payload,format='json')
        self.assertEqual(res.status_code,status.HTTP_201_CREATED)
        questionExists = Question.objects.filter(questionID=payload['questionID']).exists()
        self.assertTrue(questionExists)

    def test_retrieving_data(self):

        params = {
            'questionID':111,
            'question':'question',
            'option1':'a',
            'option2':'d',
            'option3':'g',
            'option4':'j',
            'correctOption': 'option3',
            'delete': True,
            'scoreSlider': 1,
        }

        obj = Question(
            questionID=111,
            question='question',
            option1='a',
            option2='d',
            option3='g',
            option4='j',
            correctOption= 'option3',
            delete= True,
            scoreSlider= 1,
        )

        obj.save()

        res = self.client.get(LOAD_URL)

        self.assertEqual(res.status_code,status.HTTP_200_OK)

        for key, value in params.items():
            self.assertEqual(value,res.data[0][key])



