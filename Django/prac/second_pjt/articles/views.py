from django.shortcuts import render, redirect
from .models import Article
from .forms import ArticleForm


# Create your views here.
def index(request):
    articles = Article.objects.all()
    context = {
        'articles': articles
    }
    return render(request, 'articles/index.html', context)


def detail(request, id):
    article = Article.objects.get(id=id)
    context = {
        'article': article
    }
    return render(request, 'articles/detail.html', context)


# def new(request):
#     return render(request, 'articles/new.html')


def create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = form.save()
            return redirect('articles:detail', article.pk)
        return redirect('articles:index')
    else:
        form = ArticleForm()
        context = {'form': form}
        return render(request, 'articles/new.html', context)


def update(request, pk):
    article = Article.objects.get(pk=pk)
    if request.method == 'POST':
        form = ArticleForm(request.POST, instance=article)
        if form.is_valid():
            form.save()
            return redirect('articles:detail', article.pk)
    else:
        form = ArticleForm(instance=article)
    
    context = {'form': form, 'article': article}
    return render(request, 'articles/update.html', context)