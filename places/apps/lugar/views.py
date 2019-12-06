import os
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
import shutil
import random

# Importación de Modelos
from apps.lugar.models import lugar as model_lugar
from apps.lugar.models import categoria as model_categoria
from apps.lugar.models import reporte as model_reporte
from apps.usuario.models import usuarios as model_usuario
from apps.usuario.models import status as model_status

# Create your views here.
def handle_foto(file, filename):
    with open('static/img/lugar/' + filename + '.png', 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)

def handle_pdf(file, filename):
    with open('static/pdf/lugar/' + filename + '.pdf', 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)

def generarNombre(nombre):
    return nombre+str(random.randint(0,1000))


@login_required(login_url='/')
def nuevoLugar(request):
    usuarioActual = model_usuario.objects.get(pk=request.session['pk'])

    if request.method == 'GET':
        if (usuarioActual.tipoUsuario.nombre == 'propietario') or (usuarioActual.tipoUsuario.nombre == 'administrador'):

            queryCategorias = model_categoria.objects.all()
            listaCategorias = []

            for categoria in queryCategorias:
                diccionarioAtributos = {

                    'nombre': categoria.nombre,

                }

                listaCategorias.append(diccionarioAtributos)

            return render(request, "nuevoLugar/nuevoLugar.html", {'tipoUsuario': request.session['tipo'], 'status': request.session['status'], 'categorias': listaCategorias,})
        else:
            return JsonResponse({'status': 403})

@login_required(login_url='/')
def registro(request):
    usuarioActual = model_usuario.objects.get(pk=request.session['pk'])

    if (usuarioActual.tipoUsuario.nombre == 'propietario') or (usuarioActual.tipoUsuario.nombre == 'administrador'):
        
        verificarNombre = model_lugar.objects.filter(nombre=request.POST['nombre']).first()

        if verificarNombre is None:
            status = model_status.objects.get(nombre='lugarSolicitado')
            nombreFoto = generarNombre(request.POST['nombre'])
            nombrePDF = generarNombre(request.POST['nombre'])

            nuevoLugar = model_lugar(

                nombre = request.POST['nombre'],
                descripcion = request.POST['descripcion'],
                sitioweb = request.POST['sitioWeb'],
                horarioAbrir = request.POST['horaAbre'],
                horarioCerrar = request.POST['horaCierra'],
                direccion = request.POST['direccion'],
                telefono = request.POST['numero'],
                categoria = model_categoria.objects.get(nombre= request.POST['categoria']),
                abiertoLunes = True if request.POST['lunes'] == 'on' else False,
                abiertoMartes = True if request.POST['martes'] == 'on' else False,
                abiertoMiercoles = True if request.POST['miercoles'] == 'on' else False,
                abiertoJueves = True if request.POST['jueves'] == 'on' else False,
                abiertoViernes = True if request.POST['viernes'] == 'on' else False,
                abiertoSabado = True if request.POST['sabado'] == 'on' else False,
                abiertoDomingo = True if request.POST['domingo'] == 'on' else False,
                status = status,
                propietario = usuarioActual,
                urlFotos = 'static/img/lugar/' + nombreFoto + '.png' if 'foto' in request.FILES else '',
                urlMenu = 'static/pdf/lugar/' + nombrePDF + '.pdf' if 'menu' in request.FILES else '',

            )
            
            if 'foto' in request.FILES:
                    handle_foto(request.FILES['foto'], nombreFoto)
            if 'menu' in request.FILES:
                    handle_pdf(request.FILES['menu'], nombrePDF)

            nuevoLugar.save()

            return JsonResponse({'status': 200})
        else:
            return JsonResponse({'status': 500})
    else:
        return JsonResponse({'status': 403})

@login_required(login_url='/')
def lugar(request):
    lugar = model_lugar.objects.filter(nombre=request.GET['nombre']).first()

    if lugar is None or lugar.eliminado == True:
        return JsonResponse({'status': 404})
    
    if lugar.status.nombre == "lugarSolicitado" and lugar.propietario.username == request.session['usuario']:
        datosLugar =  {
                'nombre': lugar.nombre,
                'descripcion': lugar.descripcion,
                'direccion': lugar.direccion,
                'horarioAbrir': lugar.horarioAbrir,
                'horarioCerrar': lugar.horarioCerrar,
                'categoria': lugar.categoria.nombre,
                'propietario': lugar.propietario.username,
                'abiertoLunes': "checked" if lugar.abiertoLunes == True else 0,
                'abiertoMartes': "checked" if lugar.abiertoMartes == True else 0,
                'abiertoMiercoles': "checked" if lugar.abiertoMiercoles == True else 0,
                'abiertoJueves': "checked" if lugar.abiertoJueves == True else 0,
                'abiertoViernes': "checked" if lugar.abiertoViernes == True else 0,
                'abiertoSabado': "checked" if lugar.abiertoSabado == True else 0,
                'abiertoDomingo': "checked" if lugar.abiertoDomingo == True else 0,
                'telefono': lugar.telefono,
                'sitioweb': lugar.sitioweb,
                'urlFotos': lugar.urlFotos,
                'urlMenu': lugar.urlMenu,
                'status': lugar.status.nombre,
            }
        print(lugar.urlFotos)

        return render(request, "lugar/lugar.html", datosLugar)
    elif lugar.status.nombre != "lugarSolicitado":
        datosLugar =  {
                'nombre': lugar.nombre,
                'descripcion': lugar.descripcion,
                'direccion': lugar.direccion,
                'horarioAbrir': lugar.horarioAbrir,
                'horarioCerrar': lugar.horarioCerrar,
                'categoria': lugar.categoria.nombre,
                'propietario': lugar.propietario.username,
                'abiertoLunes': "checked" if lugar.abiertoLunes == True else 0,
                'abiertoMartes': "checked" if lugar.abiertoMartes == True else 0,
                'abiertoMiercoles': "checked" if lugar.abiertoMiercoles == True else 0,
                'abiertoJueves': "checked" if lugar.abiertoJueves == True else 0,
                'abiertoViernes': "checked" if lugar.abiertoViernes == True else 0,
                'abiertoSabado': "checked" if lugar.abiertoSabado == True else 0,
                'abiertoDomingo': "checked" if lugar.abiertoDomingo == True else 0,
                'telefono': lugar.telefono,
                'sitioweb': lugar.sitioweb,
                'urlFotos': lugar.urlFotos,
                'urlMenu': lugar.urlMenu,
                'status': lugar.status.nombre,
            }
        print(lugar.urlFotos)
        return render(request, "lugar/lugar.html", datosLugar)
    else:
        return JsonResponse({'status': 404})

@login_required(login_url='/')
def reportar(request):

    usuarioActual = model_usuario.objects.get(pk=request.session['pk'])
    status = model_status.objects.get(nombre='reporteEnviado')
    lugar = model_lugar.objects.get(nombre=request.POST['lugar'])

    nuevoReporte = model_reporte(

        titulo = request.POST['titulo'],
        descripcion = request.POST['descripcion'],
        lugar = lugar,
        usuario = usuarioActual,
        status = status,
        eliminado = False,

    )

    nuevoReporte.save()
    return JsonResponse({'status': 200})

@login_required(login_url='/')
def verCategoria(request):

    categoriaQuery = model_categoria.objects.get(pk=request.GET['id'])

    categoria = {

        'nombre': categoriaQuery.nombre,
        'descripcion': categoriaQuery.descripcion,

    }

    return JsonResponse({'status': 200, 'categoria': categoria})

@login_required(login_url='/')
def actualizarCategoria(request):

    categoria = model_categoria.objects.get(pk=request.POST['id'])

    categoria.nombre = request.POST['nombre']
    categoria.descripcion = request.POST['descripcion']

    categoria.save()

    return JsonResponse({'status': 200})

@login_required(login_url='/')
def nuevaCategoria(request):

    categoria = model_categoria(
        
        nombre = request.POST['nombre'],
        descripcion = request.POST['descripcion']
        
    )

    categoria.save()

    categoriaNueva = {

        'id': categoria.pk,
        'nombre': categoria.nombre,
        'descripcion': categoria.descripcion,

    }

    return JsonResponse({'status': 200, 'categoria': categoriaNueva})

@login_required(login_url='/')
def eliminarCategoria(request):

    categoria = model_categoria.objects.get(pk=request.POST['id'])

    categoria.delete()

    return JsonResponse({'status': 200,})

@login_required(login_url='/')
def editarLugar(request):
    if request.method == 'GET':
        queryCategorias = model_categoria.objects.all()
        listaCategorias = []

        for categoria in queryCategorias:
            diccionarioAtributos = {

                'nombre': categoria.nombre,

            }

            listaCategorias.append(diccionarioAtributos)

        lugar = model_lugar.objects.get(nombre=request.GET['nombre'])

        datosLugar = {

                'nombre': lugar.nombre,
                'descripcion': lugar.descripcion,
                'direccion': lugar.direccion,
                'horarioAbrir': lugar.horarioAbrir,
                'horarioCerrar': lugar.horarioCerrar,
                'categoria': lugar.categoria.nombre,
                'propietario': lugar.propietario.username,
                'abiertoLunes': "checked" if lugar.abiertoLunes == True else 0,
                'abiertoMartes': "checked" if lugar.abiertoMartes == True else 0,
                'abiertoMiercoles': "checked" if lugar.abiertoMiercoles == True else 0,
                'abiertoJueves': "checked" if lugar.abiertoJueves == True else 0,
                'abiertoViernes': "checked" if lugar.abiertoViernes == True else 0,
                'abiertoSabado': "checked" if lugar.abiertoSabado == True else 0,
                'abiertoDomingo': "checked" if lugar.abiertoDomingo == True else 0,
                'telefono': lugar.telefono,
                'sitioweb': lugar.sitioweb,

        }

        return render(request, 'editarLugar/editarLugar.html', {'categorias': listaCategorias, 'datos': datosLugar}) 

    else:
        usuarioActual = model_usuario.objects.get(pk=request.session['pk'])

        if (usuarioActual.tipoUsuario.nombre == 'propietario') or (usuarioActual.tipoUsuario.nombre == 'administrador'):
              
            lugar = model_lugar.objects.get(nombre=request.POST['pepsecret'])
            verificarNombre = model_lugar.objects.get(nombre=request.POST['nombre'])

            if verificarNombre is None or verificarNombre.nombre == lugar.nombre:
                nombreFoto = generarNombre(request.POST['nombre'])
                nombrePDF = generarNombre(request.POST['nombre'])

                lugar.nombre = request.POST['nombre']
                lugar.descripcion = request.POST['descripcion']
                lugar.sitioweb = request.POST['sitioWeb']
                lugar.horarioAbrir = request.POST['horaAbre']
                lugar.horarioCerrar = request.POST['horaCierra']
                lugar.direccion = request.POST['direccion']
                lugar.telefono = request.POST['numero']
                lugar.categoria = model_categoria.objects.get(nombre= request.POST['categoria'])
                lugar.abiertoLunes = True if request.POST['lunes'] == 'on' else False
                lugar.abiertoMartes = True if request.POST['martes'] == 'on' else False
                lugar.abiertoMiercoles = True if request.POST['miercoles'] == 'on' else False
                lugar.abiertoJueves = True if request.POST['jueves'] == 'on' else False
                lugar.abiertoViernes = True if request.POST['viernes'] == 'on' else False
                lugar.abiertoSabado = True if request.POST['sabado'] == 'on' else False
                lugar.abiertoDomingo = True if request.POST['domingo'] == 'on' else False

                lugar.save()
                
                if 'foto' in request.FILES:
                    lugar.urlFotos = 'static/img/lugar/' + nombreFoto + '.png'
                    handle_foto(request.FILES['foto'], nombreFoto)
                if 'menu' in request.FILES:
                    lugar.urlMenu = 'static/pdf/lugar/' + nombrePDF + '.pdf'
                    handle_pdf(request.FILES['menu'], nombrePDF)


                return JsonResponse({'status': 200})
            else:
                return JsonResponse({'status': 500})
        else:
            return JsonResponse({'status': 403})
        