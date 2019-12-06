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
    path('solicitarPropietario', views.solicitarPropietario, name="solicitarPropietario"),
    path('cancelarPropietario', views.cancelarPropietario, name="cancelarPropietario"),
    path('aceptarPropietario', views.aceptarPropietario, name="aceptarPropietario"),
    path('cancelarLugar', views.cancelarLugar, name="cancelarLugar"),
    path('aceptarInvitacion', views.aceptarInvitacion, name="aceptarInvitacion"),
    path('cancelarInvitacion', views.cancelarInvitacion, name="cancelarInvitacion"),
    path('aceptarLugar', views.aceptarLugar, name="aceptarLugar"),
    path('aceptarReporte', views.aceptarReporte, name="aceptarReporte"),
    path('cancelarReporte', views.cancelarReporte, name="cancelarReporte"),
    path('contestarReporte', views.contestarReporte, name="contestarReporte"),
    path('solicitudes', views.solicitudes, name="solicitudes"),
    path('amigos', views.getAmigos, name="getAmigos"),
    path('invitacion', views.invitacion, name="invitacion"),
    path('reportes', views.reportes, name="reportes"),
    path('busqueda', views.busqueda, name="busqueda"),

]