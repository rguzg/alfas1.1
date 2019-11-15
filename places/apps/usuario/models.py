from django.db import models
from apps.lugar import models as models_lugar
from django.contrib.auth.models import AbstractUser

# Create your models here.
class tipoUsuario(models.Model):
    nombre = models.CharField(max_length=20)
    descripcion = models.CharField(max_length=300)

class invitacion(models.Model):
    fechahora = models.DateTimeField(auto_now_add=True)
    anfitrion = models.ForeignKey(usuarios, on_delete=models.CASCADE)
    invitado = models.ForeignKey(usuarios, on_delete=models.CASCADE)
    status = models.ForeignKey(status, on_delete=models.CASCADE)

class listaAmigos(models.Model):
    usuario = models.ForeignKey(usuarios, on_delete=models.CASCADE)
    amigo = models.ForeignKey(usuarios, on_delete=models.CASCADE)
    status = models.ForeignKey(status, on_delete=models.CASCADE)

class usuarios(AbstractUser):
    descripcion = models.CharField(max_length=300)
    urlFotoPerfil = models.URLField(max_length=100)
    tipoUsuario = models.ForeignKey(tipoUsuario, on_delete=models.CASCADE)
    status = models.ForeignKey(status, on_delete=models.CASCADE)

class notificacion(models.Model):

    invitacion = 'inv'
    reporte = 'rep'
    solicitudAmistad = 'ami'
    peticion = 'pet'
    otro = 'otr'

    NOTIFICACION_CHOICES = [

        (invitacion, 'Invitacion'),
        (reporte, 'Reporte'),
        (solicitudAmistad, 'Solicitud de Amistad'),
        (peticion, 'Peticion'),
        (otro, 'Otro'),

    ]

    fechahora = models.DateTimeField(auto_now_add=True)
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=300)
    status = models.ForeignKey(status, on_delete=models.CASCADE)
    tipoNotificacion = models.CharField(max_length=3, choices=NOTIFICACION_CHOICES, default= invitacion)

class status(models.Model):
    nombre = models.CharField(max_length=20)
    descripcion = models.CharField(max_length=300)

class usuario_notificacion(models.Model):
    usuario = models.ForeignKey(usuarios, on_delete=models.CASCADE)
    notificacion = models.ForeignKey(notificacion, on_delete=models.CASCADE)

class usuario_invitacion(models.Model):
    usuario = models.ForeignKey(usuarios, on_delete=models.CASCADE)
    invitacion = models.ForeignKey(invitacion, on_delete=models.CASCADE)

class usuario_lugar(models.Model):
    usuario = models.ForeignKey(usuarios, on_delete=models.CASCADE)
    lugar = models.ForeignKey(lugar, on_delete=models.CASCADE)

 