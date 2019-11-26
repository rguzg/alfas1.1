from django.urls import path
from apps.usuario import views

urlpatterns = [
    
    path('', views.paginaPrincipal, name="paginaPrincipal"),
    path('registro', views.registro, name="registro"),
    path('login', views.inicioSesion, name="login"),

]
