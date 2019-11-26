from django.db import models
from apps.usuario import models as models_usuario

# Create your models here.
class categoria(models.Model):
    nombre = models.CharField(max_length=30)
    descripcion = models.CharField(max_length=300)
    urlMenu = models.URLField(max_length=100)

class lugar(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=300)
    direccion = models.CharField(max_length=300)
    placeid = models.CharField(max_length=100)
    horarioAbrir = models.TimeField(default='08:00:00')
    horarioCerrar = models.TimeField(default='08:00:00')
    abiertoLunes = models.BooleanField(null=True)
    abiertoMartes = models.BooleanField(null=True)
    abiertoMiercoles = models.BooleanField(null=True)
    abiertoJueves = models.BooleanField(null=True)
    abiertoViernes = models.BooleanField(null=True)
    abiertoSabado = models.BooleanField(null=True)
    abiertoDomingo = models.BooleanField(null=True)
    telefono = models.CharField(max_length=10)
    sitioweb = models.URLField(max_length=100)
    urlFotos = models.URLField(max_length=100)
    contadorFotos = models.IntegerField()
    urlMenu = models.URLField(max_length=100)
    eliminado = models.BooleanField(default=False)
    status = models.ForeignKey('usuario.status',on_delete=models.CASCADE)
    propietario = models.ForeignKey('usuario.usuarios',on_delete=models.CASCADE)
    categoria = models.ForeignKey(categoria,on_delete=models.CASCADE)

class reporte(models.Model):
    titulo = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=300)
    lugar = models.ForeignKey(lugar, on_delete=models.CASCADE)
    usuario = models.ForeignKey('usuario.usuarios', on_delete=models.CASCADE)
    status = models.ForeignKey('usuario.status',on_delete=models.CASCADE)
    eliminado = models.BooleanField(default=False)

class reporte_lugar(models.Model):
    reporte = models.ForeignKey(reporte, on_delete=models.CASCADE)
    lugar = models.ForeignKey(lugar, on_delete=models.CASCADE)
    
    
    