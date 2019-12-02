from django.urls import path
from apps.usuario import views

urlpatterns = [
    
    path('', views.paginaPrincipal, name="paginaPrincipal"),
    path('registro', views.registro, name="registro"),
    path('login', views.inicioSesion, name="login"),
    path('logout', views.cerrarSesion, name="logout"),
    path('dashboard', views.dashboard, name="dashboard"),
    path('perfil', views.perfil, name="perfil"),
    path('modificarPerfil', views.modificarPerfil, name="modificarPerfil"),
    path('anadirAmigo', views.anadirAmigo, name="anadirAmigo"),
    path('eliminarAmigo', views.eliminarAmigo, name="eliminarAmigo"),
    path('confirmarAmigo', views.confirmarAmigo, name="confirmarAmigo"),

]