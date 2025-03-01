from django.db import models

class TestResult(models.Model):
    user_id = models.CharField(max_length=255)  # Firebase user ID
    pregnancies = models.FloatField()
    glucose = models.FloatField()
    blood_pressure = models.FloatField()
    skin_thickness = models.FloatField()
    insulin = models.FloatField()
    bmi = models.FloatField()
    diabetes_pedigree = models.FloatField()
    age = models.FloatField()
    result = models.CharField(max_length=50)  # "Normal" or "High Risk"
    timestamp = models.DateTimeField(auto_now_add=True)  # Auto add time

    def __str__(self):
        return f"Test for {self.user_id} - {self.result}"
