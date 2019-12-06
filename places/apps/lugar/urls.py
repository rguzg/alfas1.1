from django.urls import path
from apps.lugar import views

urlpatterns = [
    
    path('nuevo', views.nuevoLugar, name="nuevo"),
    path('registro', views.registro, name="registro"),
    path('', views.lugar, name="lugar"),
    path('reportar', views.reportar, name="reportar"),
    path('editar', views.editarLugar, name="editarLugar"),
    path('categoria', views.verCategoria, name="categoria"),
    path('categoria/actualizar', views.actualizarCategoria, name="actualizarCategoria"),
    path('categoria/nuevo', views.nuevaCategoria, name="nuevaCategoria"),
    path('categoria/eliminar', views.eliminarCategoria, name="eliminarCategoria"),

]