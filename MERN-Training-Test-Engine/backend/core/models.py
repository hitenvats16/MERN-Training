from django.db import models


class Question(models.Model):
    questionID = models.IntegerField(primary_key=True, unique=True)
    question = models.TextField()
    option1 = models.CharField(default="", max_length=50)
    option2 = models.CharField(default="", max_length=50)
    option3 = models.CharField(default="", max_length=50)
    option4 = models.CharField(default="", max_length=50)
    correctOption = models.CharField(default="", max_length=50)
    delete = models.BooleanField(default=False)
    scoreSlider = models.IntegerField(default=0)

    def __str__(self):
        return self.question
