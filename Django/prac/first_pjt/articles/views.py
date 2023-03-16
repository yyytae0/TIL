from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'articles/index.html')

def throw(request):
    return render(request, 'articles/throw.html')

def catch(request):
    print(request.GET.get('nickname'))
    return render(request, 'articles/catch.html')