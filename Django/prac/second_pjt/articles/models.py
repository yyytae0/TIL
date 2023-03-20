from django.db import models

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=30)
    content = models.TextField()
    
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    new=models.TextField(default='None')
    dummy=models.TextField()
    
    def __str__(self):
        return f'{self.id}번째 글 - {self.title}'