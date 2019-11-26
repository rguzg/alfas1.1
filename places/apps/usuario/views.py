import os
from django.contrib.auth import update_session_auth_hash
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import shutil

# Importación de Modelos
from apps.usuario.models import usuarios as model_usuario
from apps.usuario.models import tipoUsuario as model_tipoUsuario
from apps.usuario.models import status as model_status

# Create your views here.
def placeholderProfilePicture(filename):
    shutil.copy('static/img/placeholder.png',
                'static/img/profilepictures/' + filename + '.png')


def paginaPrincipal(request):
    return render(request, "login_signup/login_signup.html",)
    
def registro(request):
    if request.method == 'POST':
        
        #Verificación de que no exista un usuario con el mismo nombre de usuario
        verificacionUsuario = model_usuario.objects.filter(username=request.POST['usuario']).first()

        if verificacionUsuario is None:
            placeholderProfilePicture(request.POST['usuario'])
            nuevoUsuario = model_usuario.objects.create_user(
                username = request.POST['usuario'], 
                password = request.POST['password'],
                first_name = request.POST['nombre'], 
                last_name = request.POST['apellidos'], 
                email = request.POST['correo'], 
                descripcion = "Añade una descripción", 
                urlFotoPerfil = 'static/img/profilepictures/'+request.POST['usuario']+'.png', 
                tipoUsuario = model_tipoUsuario.objects.get(nombre='normal'),
                status = model_status.objects.get(nombre='ninguno'))
            return JsonResponse({'status': 200})
        if verificacionUsuario is not None:
            return JsonResponse({'status': 500})

def inicioSesion(request):
    if request.method == 'POST':
        usuario = authenticate(request, username=request.POST['usuario'], password=request.POST['password'])

        if usuario is not None:
            request.session['pk'] = usuario.pk
            request.session['usuario'] = usuario.username
            request.session['nombreUsuario'] = usuario.first_name
            request.session['apellidosUsuario'] = usuario.last_name
            request.session['profilepicture'] = usuario.urlFotoPerfil
            login(request, usuario)

            return JsonResponse({'status': 200})
        else:
            
            return JsonResponse({'status': 500})


    