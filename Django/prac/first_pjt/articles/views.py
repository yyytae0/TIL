from django.shortcuts import render

# Create your views here.
def index(request, a):
    context = {
        'name': a
    }
    return render(request, 'articles/index.html')