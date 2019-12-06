import os
from django.contrib.auth import update_session_auth_hash
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db.models import Q 
import shutil
import random

# Importación de Modelos
from apps.usuario.models import usuarios as model_usuario
from apps.usuario.models import tipoUsuario as model_tipoUsuario
from apps.usuario.models import status as model_status
from apps.usuario.models import listaAmigos as model_listaAmigos
from apps.usuario.models import invitacion as model_invitacion
from apps.lugar.models import lugar as model_lugar
from apps.lugar.models import reporte as model_reporte
from apps.lugar.models import categoria as model_categoria

# Create your views here.
def placeholderProfilePicture(filename):
    shutil.copy('static/img/placeholder.png',
                'static/img/profilepictures/' + filename + '.png')

def handle_uploaded_file(file, filename):
    with open('static/img/profilepictures/' + filename + '.png', 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)

def generarNombreFotoPerfil(usuario):
    return usuario+str(random.randint(0,1000))

def deleteProfilePicture(filename):
    os.remove(filename)

def paginaPrincipal(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect('/dashboard')
    else:
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
                descripcion = "Haz click en el botón para modificar tu descripción", 
                urlFotoPerfil = 'static/img/profilepictures/'+generarNombreFotoPerfil()+'.png', 
                tipoUsuario = model_tipoUsuario.objects.get(nombre='normal'),
                status = model_status.objects.get(nombre='ninguno'))
            return JsonResponse({'status': 200})
        if verificacionUsuario is not None:
            return JsonResponse({'status': 500})
    if request.method == 'GET':
        return HttpResponseRedirect('/')

def inicioSesion(request):
    if request.method == 'POST':
        usuario = authenticate(request, username=request.POST['usuario'], password=request.POST['password'])

        if usuario is not None:
            request.session['pk'] = usuario.pk
            request.session['usuario'] = usuario.username
            request.session['nombreUsuario'] = usuario.first_name
            request.session['apellidosUsuario'] = usuario.last_name
            request.session['email'] = usuario.email
            request.session['tipo'] = usuario.tipoUsuario.nombre
            request.session['status'] = usuario.status.nombre
            request.session['descripcion'] = usuario.descripcion
            request.session['profilepicture'] = usuario.urlFotoPerfil
            login(request, usuario)

            return JsonResponse({'status': 200, 'usuario': usuario.username, 'tipoUsuario': usuario.tipoUsuario.nombre})
        else:

            return JsonResponse({'status': 500})
    if request.method == 'GET':
        return HttpResponseRedirect('/')

@login_required(login_url='/')
def dashboard(request):
    return render(request, "dashboard/dashboard.html",{'tipoUsuario': request.session['tipo'], 'status': request.session['status'],})

def cerrarSesion(request):
    if request.method == 'POST':
        logout(request)
    if request.method == 'GET':
        return HttpResponseRedirect('/')
    return JsonResponse({'status': 200})

@login_required(login_url='/')
def perfil(request):
    if request.GET['usuario'] ==  request.session['usuario']:
        return render(request, "miPerfil/miPerfil.html",{'tipoUsuario': request.session['tipo'], 'status': request.session['status'],})
    else:
        usuario = model_usuario.objects.get(username=request.GET['usuario'])
        amistad = model_listaAmigos.objects.filter(usuario=request.session['pk']).filter(amigo=usuario).first()

        if amistad is None:
            estadoAmistad = 'ninguno'
        else:
            estadoAmistad = amistad.status.nombre

        datosUsuario =  {
            'usuario': usuario.username,
            'nombre': usuario.first_name,
            'apellidos': usuario.last_name,
            'tipo': usuario.tipoUsuario.nombre,
            'descripcion': usuario.descripcion,
            'fotoPerfil': usuario.urlFotoPerfil,
            'estadoAmistad': estadoAmistad
        }
        return render(request, "perfil/perfil.html", datosUsuario)

@login_required(login_url='/')
def modificarPerfil(request):
    #Usuario a modificar:
    usuarioModificar = model_usuario.objects.get(pk=request.session['pk'])

    if request.POST['atributo'] == 'usuario':
        #Verificación de que no exista un usuario con el mismo nombre de usuario
        verificacionUsuario = model_usuario.objects.filter(username=request.POST['contenido']).first()

        if verificacionUsuario is None:
            usuarioModificar.username = request.POST['contenido']
            usuarioModificar.urlFotoPerfil = 'static/img/profilepictures/'+request.POST['contenido']+'.png'
            request.session['usuario'] = usuarioModificar.username
            request.session['profilepicture'] = usuarioModificar.urlFotoPerfil
            usuarioModificar.save()
        else:
            return JsonResponse({'status': 500,})

    if request.POST['atributo'] == 'nombre':
        usuarioModificar.first_name = request.POST['contenido']
        request.session['nombreUsuario'] = usuarioModificar.first_name
        usuarioModificar.save()

    if request.POST['atributo'] == 'apellidos':
        usuarioModificar.last_name = request.POST['contenido']
        request.session['apellidosUsuario'] = usuarioModificar.last_name
        usuarioModificar.save()

    if request.POST['atributo'] == 'correo':
        usuarioModificar.email = request.POST['contenido']
        request.session['email'] = usuarioModificar.email
        usuarioModificar.save()

    if request.POST['atributo'] == 'descripcion':
        usuarioModificar.descripcion = request.POST['contenido']
        request.session['descripcion'] = usuarioModificar.descripcion
        usuarioModificar.save()
        
    if request.POST['atributo'] == 'fotoPerfil':
        nombreArchivo = generarNombreFotoPerfil(usuarioModificar.username)

        handle_uploaded_file(request.FILES['contenido'], nombreArchivo)
        deleteProfilePicture(usuarioModificar.urlFotoPerfil)

        usuarioModificar.urlFotoPerfil = 'static/img/profilepictures/'+nombreArchivo+'.png'
        usuarioModificar.save()

        request.session['profilepicture'] = usuarioModificar.urlFotoPerfil
        return  JsonResponse({'status': 200, 'atributo':  request.POST['atributo'], 'nombreArchivo': nombreArchivo})

    if request.POST['atributo'] == 'password':
        usuarioModificar.set_password(request.POST['contenido'])
        update_session_auth_hash(request, usuarioModificar)
        usuarioModificar.save()


    return  JsonResponse({'status': 200, 'atributo':  request.POST['atributo'], 'contenido': request.POST['contenido']})

@login_required(login_url='/')
def anadirAmigo(request):
    usuario = model_usuario.objects.get(pk=request.session['pk'])
    nuevoAmigo = model_usuario.objects.get(username=request.POST['amigo'])
    amistadSolicitada = model_status.objects.get(nombre='amistadSolicitada')
    amistadPendiente = model_status.objects.get(nombre='amistadPendiente')

    if nuevoAmigo is None:
        return JsonResponse({"status": 500})
    else:
        #Entrada en la lista de amigos de quien envió la solicitud
        nuevoListaAmigosEnvia = model_listaAmigos(usuario=usuario, amigo=nuevoAmigo, status=amistadSolicitada)
        nuevoListaAmigosEnvia.save()

        #Entrada en la lista de amigos de quien recibe la solicitud
        nuevoListaAmigosRecibe = model_listaAmigos(usuario=nuevoAmigo, amigo=usuario, status=amistadPendiente)
        nuevoListaAmigosRecibe.save()
        return  JsonResponse({'status': 200})

@login_required(login_url='/')
def eliminarAmigo(request):
    amigoEliminar = model_usuario.objects.get(username=request.POST['amigo'])
    usuario = model_usuario.objects.get(pk=request.session['pk'])

    #Entrada en la lista de amigos de quien envió la solicitud
    amistadEnvia = model_listaAmigos.objects.filter(usuario=usuario).filter(amigo=amigoEliminar).first()
    
    #Entrada en la lista de amigos de quien recibe la solicitud
    amistadRecibe = model_listaAmigos.objects.filter(usuario=amigoEliminar).filter(amigo=usuario).first()
    
    if (amistadEnvia is None):
        return JsonResponse({'status': 500})
    if ((amistadEnvia.status.nombre == 'amistadSolicitada') or (amistadEnvia.status.nombre == 'amistadPendiente') or (amistadEnvia.status.nombre == 'amistadActiva')):
        amistadEnvia.delete()
        amistadRecibe.delete()
        return JsonResponse({'status': 200})
    else:
        return JsonResponse({'status': 500})

@login_required(login_url='/')
def confirmarAmigo(request):
    amigoAñadir = model_usuario.objects.get(username=request.POST['amigo'])
    usuario = model_usuario.objects.get(pk=request.session['pk'])
    amistadActiva = model_status.objects.get(nombre='amistadActiva')

    #Entrada en la lista de amigos de quien envió la solicitud
    amistadEnvia = model_listaAmigos.objects.filter(usuario=usuario).filter(amigo=amigoAñadir).first()
    
    #Entrada en la lista de amigos de quien recibe la solicitud
    amistadRecibe = model_listaAmigos.objects.filter(usuario=amigoAñadir).filter(amigo=usuario).first()

    if (amistadEnvia is None):
        return JsonResponse({'status': 500})
    if (amistadEnvia.status.nombre == 'amistadPendiente'):
        amistadEnvia.status = amistadActiva
        amistadEnvia.save()

        amistadRecibe.status = amistadActiva
        amistadRecibe.save()
        return JsonResponse({'status': 200})
    else:
        return JsonResponse({'status': 500})

@login_required(login_url='/')
def solicitarPropietario(request):
    usuario = model_usuario.objects.get(pk=request.session['pk'])
    status = model_status.objects.get(nombre='propietarioSolicitado')

    if usuario.tipoUsuario.nombre == 'normal':
        usuario.status = status
        usuario.save()

        return JsonResponse({'status': 200})
    else:
        return JsonResponse({'status': 500})

@login_required(login_url='/')
def cancelarPropietario(request):
    if request.GET['metodo'] == 'administrador':
        usuario = model_usuario.objects.get(username=request.POST['usuario'])
    if request.GET['metodo'] == 'usuario':
        usuario = model_usuario.objects.get(pk=request.session['pk'])
        
    status = model_status.objects.get(nombre='ninguno')

    if usuario.tipoUsuario.nombre == 'normal':
        usuario.status = status
        usuario.save()

        return JsonResponse({'status': 200})
    else:
        return JsonResponse({'status': 500})

@login_required(login_url='/')
def cancelarLugar(request):
    lugar = model_lugar.objects.get(nombre=request.POST['lugar'])
        
    status = model_status.objects.get(nombre='ninguno')

    lugar.status = status
    lugar.eliminado = True
    lugar.save()

    return JsonResponse({'status': 200})

@login_required(login_url='/')
def aceptarPropietario(request):
    usuario = model_usuario.objects.get(username=request.POST['usuario'])
    status = model_status.objects.get(nombre='propietarioGarantizado')
    tipo = model_tipoUsuario.objects.get(nombre='propietario')

    if usuario.tipoUsuario.nombre == 'normal':
        usuario.status = status
        usuario.tipoUsuario = tipo
        usuario.save()

        return JsonResponse({'status': 200})
    else:
        return JsonResponse({'status': 500})

@login_required(login_url='/')
def aceptarLugar(request):
    lugar = model_lugar.objects.get(nombre=request.POST['lugar'])
    status = model_status.objects.get(nombre='lugarAprobado')

    lugar.status = status
    lugar.save()

    return JsonResponse({'status': 200})

@login_required(login_url='/')  
def solicitudes(request):
    if request.GET['tipo'] == 'propietario':
        if request.session['tipo'] == 'administrador':
            status = model_status.objects.get(nombre='propietarioSolicitado')

            usuariosConSolicitud = model_usuario.objects.filter(status=status).all()
            arregloSolicitudes = []

            for solicitud in usuariosConSolicitud:
                arregloSolicitudes.append(solicitud.username)
            
            return JsonResponse({'status': 200, 'solicitudes': arregloSolicitudes})
        else:
            return JsonResponse({'status': 403})
    if request.GET['tipo'] == 'lugar':
        if request.session['tipo'] == 'administrador':
            status = model_status.objects.get(nombre='lugarSolicitado')

            lugarConSolicitud = model_lugar.objects.filter(status=status).all()
            arregloSolicitudes = []

            for solicitud in lugarConSolicitud:
                arregloSolicitudes.append(solicitud.nombre)
            
            return JsonResponse({'status': 200, 'solicitudes': arregloSolicitudes})
        else:
            return JsonResponse({'status': 403})
    if request.GET['tipo'] == 'invitacion':
        status = model_status.objects.get(nombre='invitacionSolicitada')

        invitaciones = model_invitacion.objects.filter(status=status).filter(invitado=request.session['pk']).all()
        arregloInvitaciones = []

        for invitacion in invitaciones:
            arregloInvitaciones.append({
                
                'nombre': invitacion.lugar.nombre,
                'id': invitacion.pk,

            })
            
        return JsonResponse({'status': 200, 'solicitudes': arregloInvitaciones})
    if request.GET['tipo'] == 'reportes':
        if request.session['tipo'] == 'administrador':
            status = model_status.objects.get(nombre='reporteEnviado')
            reportes = model_reporte.objects.filter(status=status).all()


        if request.session['tipo'] == 'propietario':
            status = model_status.objects.get(nombre='reporteConfirmado')
            reportes = model_reporte.objects.filter(status=status).all()

        
        arregloReportes = []

        for reporte in reportes:
            arregloReportes.append({
                    
                'lugar': reporte.lugar.nombre,
                'id': reporte.pk,

            })
                
        return JsonResponse({'status': 200, 'solicitudes': arregloReportes})
    if request.GET['tipo'] == 'categorias':

        categorias = model_categoria.objects.all()
        arregloCategorias = []

        for categoria in categorias:
            arregloCategorias.append({
                
                'id': categoria.pk,
                'nombre': categoria.nombre,

            })
            
        return JsonResponse({'status': 200, 'solicitudes': arregloCategorias})

@login_required(login_url='/')  
def getAmigos(request):

    listaAmigos = model_listaAmigos.objects.filter(usuario=request.session['pk']).all()

    amigos = {}

    for amigo in listaAmigos:
        amigos[amigo.amigo.pk] = amigo.amigo.username

    return JsonResponse(amigos)

@login_required(login_url='/')  
def reportes(request):
    
    reporteQuery = model_reporte.objects.get(pk=request.GET['id'])            

    if request.session['tipo'] == 'administrador':

        
        reporte = {
                    
            'id': reporteQuery.id,
            'titulo': reporteQuery.titulo,
            'descripcion': reporteQuery.descripcion,
            'lugar': reporteQuery.lugar.nombre,
            'usuario': reporteQuery.usuario.username,

        }

        return JsonResponse({'status': 200, 'reporte': reporte})

    if request.session['tipo'] == 'propietario':

        
        reporte = {
                    
            'id': reporteQuery.id,
            'titulo': reporteQuery.titulo,
            'descripcion': reporteQuery.descripcion,
            'lugar': reporteQuery.lugar.nombre,


        }

        return JsonResponse({'status': 200, 'reporte': reporte})

@login_required(login_url='/')  
def invitacion(request):

    anfitrion = model_usuario.objects.get(pk = request.session['pk'])
    invitado = model_usuario.objects.get(pk = request.POST['invitado'])
    status = model_status.objects.get(nombre = "invitacionSolicitada")
    lugar = model_lugar.objects.get(nombre = request.POST['lugar'])
    nuevaInvitacion = model_invitacion(

        anfitrion = anfitrion,
        invitado = invitado,
        lugar = lugar,
        status = status

    )

    nuevaInvitacion.save()

    return JsonResponse({'status': 200})

@login_required(login_url='/')
def cancelarInvitacion(request):
    invitacion = model_invitacion.objects.get(pk=request.POST['id'])

    invitacion.delete()

    return JsonResponse({'status': 200})

@login_required(login_url='/')
def aceptarInvitacion(request):
    invitacion = model_invitacion.objects.get(pk=request.POST['id'])
    status = model_status.objects.get(nombre='invitacionAceptada')

    invitacion.status = status
    invitacion.save()

    return JsonResponse({'status': 200})

@login_required(login_url='/')
def aceptarReporte(request):
    reporte = model_reporte.objects.get(pk=request.POST['id'])
    status = model_status.objects.get(nombre='reporteConfirmado')

    reporte.status = status
    reporte.save()

    return JsonResponse({'status': 200})

@login_required(login_url='/')
def cancelarReporte(request):
    reporte = model_reporte.objects.get(pk=request.POST['id'])
    status = model_status.objects.get(nombre='reporteEliminado')

    reporte.status = status
    reporte.eliminado = True
    reporte.save()

    return JsonResponse({'status': 200})

@login_required(login_url='/')
def contestarReporte(request):
    reporte = model_reporte.objects.get(pk=request.POST['id'])
    status = model_status.objects.get(nombre='reporteRespondido')
    respuesta = request.POST['respuesta']

    reporte.status = status
    reporte.respuesta = respuesta   
    reporte.save()

    return JsonResponse({'status': 200})


@login_required(login_url='/')
def busqueda(request):

    resultados = {

        'lugar':[],
        'usuario':[],

    }

    query = request.GET['query']

    usuariosQuery = model_usuario.objects.filter(Q(username__icontains = query) | Q(first_name__icontains = query))
    lugarQuery = model_lugar.objects.filter((Q(nombre__icontains = query) | Q(categoria__nombre__icontains = query)) & Q(status__nombre = "lugarAprobado"))

    if usuariosQuery is not None:
        for usuario in usuariosQuery:
            diccionarioResultados = []

            diccionarioResultados.append(usuario.first_name)
            diccionarioResultados.append(usuario.username)

            resultados['usuario'].append(diccionarioResultados)
    if lugarQuery is not None:
        for lugar in lugarQuery:
            diccionarioResultados = []

            diccionarioResultados.append(lugar.nombre)

            resultados['lugar'].append(diccionarioResultados)

    return JsonResponse(resultados)
