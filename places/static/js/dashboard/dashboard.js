//Toast    
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    target: '.container',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
        container: 'position-absolute'
    },
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});     

var contadorSolicitudesPropietario;
var contadorSolicitudesLugar;
var contadorInvitacion;
var contadorReportes;
var contadorCategorias;

$(document).ready(function () {
    
    if (sessionStorage.getItem('tipoUsuario') == 'administrador') {
        
        obtenerSolicitudesPropietario();
        obtenerSolicitudesLugar();
        obtenerReportes();
        obtenerCategorias();
        
    }
    
    if (sessionStorage.getItem('tipoUsuario') == 'propietario') {
        
        obtenerReportes();
        
    }
    
    obtenerInvitaciones();
    
    
});

function obtenerSolicitudesPropietario(){
    
    $.ajax({
        type: "GET",
        url: "/solicitudes?tipo=propietario",
        success: function (response) {
            
            if(response.solicitudes.length == 0){
                
                $('<p class="card-text">No tienes ninguna solicitud de propietario en este momento</p>').appendTo("#solicitudPropietario");
                
            } else {
                
                let contenedor = '<div style="display: flex; width: 250px; align-items: center; justify-content: space-between; flex-direction: column;" id="contenedorSolicitudPropietario"></div>';
                $(contenedor).appendTo("#solicitudPropietario");
                response.solicitudes.forEach(element => {
                    
                    contadorSolicitudesPropietario++;
                    
                    let solicitud = '<div style="display: flex; width: 100%; justify-content: space-between; margin-bottom: 5px;" id="'+element+'"><span style="display: flex;">'+element+'</span><div style="display: flex; width: 100px; justify-content: flex-end;"><button class="btn btn-success aceptarSolicitudPropBoton" type="button" id="'+element+'Aceptar"><i class="fas fa-check"></i></button><button class="btn btn-danger rechazarSolicitudPropBoton" type="button" id="'+element+'Rechazar"><i class="fas fa-times"></i></button></div></div>'
                    
                    $(solicitud).appendTo("#contenedorSolicitudPropietario");
                    
                    $("#"+element+"Aceptar").click(function (e) { 
                        
                        aceptarPropietario(element);
                        
                    });
                    
                    $("#"+element+"Rechazar").click(function (e) { 
                        
                        rechazarPropietario(element);
                        
                    });
                    
                });
                
                
                
            }
            
            
        }
    });
    
}

function obtenerSolicitudesLugar(){
    
    $.ajax({
        type: "GET",
        url: "/solicitudes?tipo=lugar",
        success: function (response) {
            
            if(response.solicitudes.length == 0){
                
                $('<p class="card-text">No tienes ninguna solicitud de lugar en este momento</p>').appendTo("#solicitudLugar");
                
            } else {
                
                let contenedor = '<div style="display: flex; width: 250px; align-items: center; justify-content: space-between; flex-direction: column;" id="contenedorSolicitudLugar"></div>';
                $(contenedor).appendTo("#solicitudLugar");
                response.solicitudes.forEach(element => {
                    
                    let sinEspacios = element.replace(/\s/g, '')
                    
                    contadorSolicitudesPropietario++;
                    
                    let solicitud = '<div style="display: flex; width: 100%; justify-content: space-between; margin-bottom: 5px;" id="'+sinEspacios+'"><span style="display: flex;">'+element+'</span><div style="display: flex; width: 100px; justify-content: flex-end;"><button class="btn btn-success aceptarSolicitudPropBoton" type="button" id="'+sinEspacios+'Aceptar"><i class="fas fa-check"></i></button><button class="btn btn-danger rechazarSolicitudPropBoton" type="button" id="'+sinEspacios+'Rechazar"><i class="fas fa-times"></i></button></div></div>'
                    
                    $(solicitud).appendTo("#contenedorSolicitudLugar");
                    
                    $("#"+sinEspacios+"Aceptar").click(function (e) { 
                        aceptarLugar(element);
                        
                    });
                    
                    $("#"+sinEspacios+"Rechazar").click(function (e) { 
                        
                        rechazarLugar(element);
                        
                    });
                    
                });
                
                
                
            }
            
            
        }
    });
    
}

function obtenerInvitaciones(){
    
    $.ajax({
        type: "GET",
        url: "/solicitudes?tipo=invitacion",
        success: function (response) {
            
            if(response.solicitudes.length == 0){
                
                $('<p class="card-text">No tienes ninguna invitación en este momento</p>').appendTo("#solicitudInvitacion");
                
            } else {
                
                let contenedor = '<div style="display: flex; width: 250px; align-items: center; justify-content: space-between; flex-direction: column;" id="contenedorSolicitudInvitacion"></div>';
                $(contenedor).appendTo("#solicitudInvitacion");
                response.solicitudes.forEach(element => {
                    
                    let sinEspacios = element.nombre.replace(/\s/g, '')
                    
                    contadorInvitacion++;
                    
                    let solicitud = '<div style="display: flex; width: 100%; justify-content: space-between; margin-bottom: 5px;" id="'+sinEspacios+'"><span style="display: flex;">'+element.nombre+'</span><div style="display: flex; width: 100px; justify-content: flex-end;"><button class="btn btn-success aceptarSolicitudPropBoton" type="button" id="'+sinEspacios+'Aceptar"><i class="fas fa-check"></i></button><button class="btn btn-danger rechazarSolicitudPropBoton" type="button" id="'+sinEspacios+'Rechazar"><i class="fas fa-times"></i></button></div></div>'
                    
                    $(solicitud).appendTo("#contenedorSolicitudInvitacion");
                    
                    $("#"+sinEspacios+"Aceptar").click(function (e) { 
                        aceptarInvitacion(element.id, sinEspacios);
                        
                    });
                    
                    $("#"+sinEspacios+"Rechazar").click(function (e) { 
                        
                        rechazarInvitacion(element.id, sinEspacios);
                        
                    });
                    
                });
                
                
                
            }
            
            
        }
    });
    
}

function obtenerReportes(){
    
    $.ajax({
        type: "GET",
        url: "/solicitudes?tipo=reportes",
        success: function (response) {
            
            if(response.solicitudes.length == 0){
                
                $('<p class="card-text">No tienes ningún reporte en este momento</p>').appendTo("#solicitudReportes");
                
            } else {
                
                let contenedor = '<div style="display: flex; width: 250px; align-items: center; justify-content: space-between; flex-direction: column;" id="contenedorReportes"></div>';
                $(contenedor).appendTo("#solicitudReportes");
                response.solicitudes.forEach(element => {
                    
                    let sinEspacios = element.lugar.replace(/\s/g, '')
                    
                    contadorReportes++;
                    
                    let solicitud = '<div style="display: flex; width: 100%; justify-content: space-between; margin-bottom: 5px;" id="'+sinEspacios+'"><span style="display: flex;">'+element.lugar+'</span><div style="display: flex; width: 100px; justify-content: flex-end;"><button class="btn btn-info aceptarSolicitudPropBoton" type="button" id="'+sinEspacios+'Ver"><i class="far fa-eye"></i></button>'
                    
                    $(solicitud).appendTo("#contenedorReportes");
                    
                    $("#"+sinEspacios+"Ver").click(function (e) { 
                        verReporte(element.id);
                        
                    });
                    
                    
                });
                
                
                
            }
            
            
        }
    });
    
}

function obtenerCategorias(){
    
    $.ajax({
        type: "GET",
        url: "/solicitudes?tipo=categorias",
        success: function (response) {
            
            if(response.solicitudes.length == 0){
                
                $('<p class="card-text">No hay ninguna categoria registrada</p>').appendTo("#solicitudCategoria");
                
            } else {
                
                let contenedor = '<div style="display: flex; width: 250px; align-items: center; justify-content: space-between; flex-direction: column;" id="contenedorSolicitudCategoria"></div>';
                $(contenedor).prependTo("#solicitudCategoria");
                response.solicitudes.forEach(element => {
                    
                    let sinEspacios = element.nombre.replace(/\s/g, '')
                    
                    contadorInvitacion++;
                    
                    let solicitud = '<div style="display: flex; width: 100%; justify-content: space-between; margin-bottom: 5px;" id="'+sinEspacios+'"><span style="display: flex;" id='+element.id+'>'+element.nombre+'</span><div style="display: flex; width: 100px; justify-content: flex-end;"><button class="btn btn-info aceptarSolicitudPropBoton" type="button" id="'+sinEspacios+'Ver"><i class="far fa-eye"></i></button><button class="btn btn-secondary rechazarSolicitudPropBoton" type="button" id="'+sinEspacios+'Actualizar"><i class="fas fa-pencil-alt"></i></button><button class="btn btn-danger rechazarSolicitudPropBoton" type="button" id="'+sinEspacios+'Borrar"><i class="fas fa-trash-alt"></i></button></div></div>'
                    
                    $(solicitud).appendTo("#contenedorSolicitudCategoria");
                    
                    $("#"+sinEspacios+"Ver").click(function (e) { 
                        verCategoria(element.id);
                        
                    });
                    
                    $("#"+sinEspacios+"Actualizar").click(function (e) { 
                        
                        actualizarCategoria(element.id);
                        
                    });
                    
                    $("#"+sinEspacios+"Borrar").click(function (e) { 
                        
                        borrarCategoria(element.id, sinEspacios);
                        
                    });
                    
                });
                
                
                
            }
            
            
        }
    });
    
}


function aceptarLugar(nombreLugar){
    
    $.ajax({
        type: "POST",
        url: "/aceptarLugar",
        data: {
            
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
            lugar: nombreLugar,
            
        },
        success: function (response) {
            
            $("#"+nombreLugar.replace(/\s/g, '')).addClass("invisible");
            contadorSolicitudesLugar--;
            
            if(contadorSolicitudesLugar == 0){
                
                $('<p class="card-text">No tienes ninguna solicitud de propietario en este momento</p>').appendTo("#solicitudLugar");
                
            }
            
            Toast.fire({
                icon: 'success',
                title: 'El lugar fue aceptado'
            });
            
        }
    });
    
}

function rechazarLugar(nombreLugar){
    
    $.ajax({
        type: "POST",
        url: "/cancelarLugar",
        data: {
            
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
            lugar: nombreLugar,
            
        },
        success: function (response) {
            
            $("#"+nombreLugar.replace(/\s/g, '')).addClass("invisible");
            contadorSolicitudesLugar--;
            
            if(contadorSolicitudesPropietario == 0){
                
                $('<p class="card-text">No tienes ninguna solicitud de propietario en este momento</p>').appendTo("#solicitudLugar");
                
            }
            
            Toast.fire({
                icon: 'success',
                title: 'El lugar fue eliminado'
            });
            
        }
    });
    
}

function aceptarPropietario(nombreUsuario){
    
    $.ajax({
        type: "POST",
        url: "/aceptarPropietario",
        data: {
            
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
            usuario: nombreUsuario,
            
        },
        success: function (response) {
            
            $("#"+nombreUsuario).addClass("invisible");
            contadorSolicitudesPropietario--;
            
            if(contadorSolicitudesPropietario == 0){
                
                $('<p class="card-text">No tienes ninguna solicitud de propietario en este momento</p>').appendTo("#solicitudPropietario");
                
            }
            
            Toast.fire({
                icon: 'success',
                title: 'La solicitud fue aceptada'
            });
            
        }
    });
    
}

function rechazarPropietario(nombreUsuario){
    
    $.ajax({
        type: "POST",
        url: "/cancelarPropietario?metodo=administrador",
        data: {
            
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
            usuario: nombreUsuario,
            
        },
        success: function (response) {
            
            $("#"+nombreUsuario).addClass("invisible");
            contadorSolicitudesPropietario--;
            
            if(contadorSolicitudesPropietario == 0){
                
                $('<p class="card-text">No tienes ninguna solicitud de propietario en este momento</p>').appendTo("#solicitudPropietario");
                
            }
            
            Toast.fire({
                icon: 'success',
                title: 'La solicitud fue rechazada'
            });
            
        }
    });
    
}

function aceptarInvitacion(idInvitacion, nombreLugar){
    
    $.ajax({
        type: "POST",
        url: "/aceptarInvitacion",
        data: {
            
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
            id: idInvitacion,
            
        },
        success: function (response) {
            
            $("#"+nombreLugar).addClass("invisible");
            contadorInvitacion--;
            
            if(contadorInvitacion == 0){
                
                $('<p class="card-text">No tienes ninguna solicitud de propietario en este momento</p>').appendTo("#solicitudInvitacion");
                
            }
            
            Toast.fire({
                icon: 'success',
                title: 'La invitación fue aceptada'
            });
            
        }
    });
    
}

function rechazarInvitacion(idInvitacion, nombreLugar){
    
    $.ajax({
        type: "POST",
        url: "/cancelarInvitacion",
        data: {
            
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
            id: idInvitacion,
            
        },
        success: function (response) {
            
            $("#"+nombreLugar).addClass("invisible");
            contadorInvitacion--;
            
            if(contadorInvitacion == 0){
                
                $('<p class="card-text">No tienes ninguna solicitud de propietario en este momento</p>').appendTo("#solicitudInvitacion");
                
            }
            
            Toast.fire({
                icon: 'success',
                title: 'La invitación fue rechazada'
            });
            
        }
    });
    
}

function verReporte(idReporte){
    
    var reporte;
    
    if(sessionStorage.getItem('tipoUsuario') == 'propietario'){
        
        $.ajax({
            type: "GET",
            url: "/reportes?id="+idReporte,
            success: function (response) {
                
                reporte = response.reporte
                
                swal.fire({
                    title: reporte.titulo,
                    html: "<p>Descripción del reporte: "+reporte.descripcion,
                    showCancelButton: true,
                    showCloseButton: true,
                    confirmButtonText: 'Responder',
                    cancelButtonText: 'Cancelar',
                }).then((result) => {
                    if (result.value) {
                        
                        Swal.fire({
                            title: 'Ingresa la respuesta al reporte',
                            input: 'text',
                            showCancelButton: true,
                            cancelButtonText: 'Cancelar',
                            inputValidator: (value) => {
                                if (!value) {
                                    return '¡La respuesta no puede estar vacia!'
                                }
                            }
                        }) .then((result) => {
                            if (result.value) {
                                
                                $.ajax({
                                    type: "POST",
                                    url: "/contestarReporte",
                                    data: {
                                        
                                        csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
                                        id: reporte.id,
                                        respuesta: result.value,
                                        
                                    },
                                    success: function (response) {
                                        
                                        Swal.fire(
                                            'La respuesta se envio correctamente',
                                            '',
                                            'success'
                                            )
                                            
                                            let sinEspacios = reporte.lugar.replace(/\s/g, '')
                                            
                                            $("#"+sinEspacios).addClass("invisible");
                                            contadorReportes--;
                                            
                                            if(contadorReportes == 0){
                                                
                                                $('<p class="card-text">No tienes ningún reporte en este momento</p>').appendTo("#solicitudLugar");
                                                
                                            }
                                        }
                                    });
                                    
                                }
                            })
                        } 
                    })
                    
                }
            });
            
        }
        
        if(sessionStorage.getItem('tipoUsuario') == 'administrador'){
            
            $.ajax({
                type: "GET",
                url: "/reportes?id="+idReporte,
                success: function (response) {
                    
                    reporte = response.reporte
                    
                    swal.fire({
                        title: reporte.titulo,
                        html: "<p>Descripción del reporte: "+reporte.descripcion+ "</p><p>Reporte hecho por: "+reporte.usuario+"</p>",
                        showCancelButton: true,
                        showCloseButton: true,
                        confirmButtonText: 'Confirmar',
                        cancelButtonText: 'Cancelar',
                    }).then((result) => {
                        if (result.value) {
                            $.ajax({
                                type: "POST",
                                url: "/aceptarReporte",
                                data: {
                                    
                                    csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
                                    id: reporte.id,                
                                    
                                },
                                success: function (response) {
                                    swal.fire(
                                        'Reporte confirmado',
                                        'El reporte fue enviado al propietario',
                                        'success'
                                        )
                                        
                                        let sinEspacios = reporte.lugar.replace(/\s/g, '')
                                        
                                        $("#"+sinEspacios).addClass("invisible");
                                        contadorReportes--;
                                        
                                        if(contadorReportes == 0){
                                            
                                            $('<p class="card-text">No tienes ningún reporte en este momento</p>').appendTo("#solicitudLugar");
                                            
                                        }
                                    }
                                });
                            } else if (
                                result.dismiss === Swal.DismissReason.cancel
                                ) {
                                    $.ajax({
                                        type: "POST",
                                        url: "/cancelarReporte",
                                        data: {
                                            
                                            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
                                            id: reporte.id,                
                                            
                                        },
                                        success: function (response) {
                                            swal.fire(
                                                'Reporte eliminado',
                                                '',
                                                'success'
                                                )
                                                
                                                let sinEspacios = reporte.lugar.replace(/\s/g, '')
                                                
                                                $("#"+sinEspacios).addClass("invisible");
                                                contadorReportes--;
                                                
                                                if(contadorReportes == 0){
                                                    
                                                    $('<p class="card-text">No tienes ningún reporte en este momento</p>').appendTo("#solicitudLugar");
                                                    
                                                }
                                            }
                                        });
                                    }
                                })
                                
                            }
                        });
                        
                    }
                    
                }
                
                
                
function verCategoria(idCategoria){
                    
                    $.ajax({
                        type: "GET",
                        url: "/lugar/categoria?id="+idCategoria,
                        success: function (response) {
                            
                            Swal.fire({
                                title: response.categoria.nombre,
                                text: response.categoria.descripcion,
                                showCloseButton: false,
                            })
                            
                        }
                    });
                    
                }
                
function actualizarCategoria(idCategoria){
                    
                    Swal.mixin({
                        input: 'text',
                        confirmButtonText: 'Siguiente',
                        cancelButtonText: 'Cancelar',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        progressSteps: ['1', '2']
                    }).queue([
                        {
                            title: 'Ingresa un nuevo nombre para la categoria',
                        },
                        {
                            title: 'Ingresa la nueva descripción',
                        },
                    ]).then((result) => {
                        if (result.value) {
                            const answers = result.value
                            
                            if((answers[0] != "") && (answers[1] != "")){
                                
                                $.ajax({
                                    type: "POST",
                                    url: "/lugar/categoria/actualizar",
                                    data: {
                                        
                                        csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
                                        nombre: answers[0],
                                        descripcion: answers[1],
                                        id: idCategoria,
                                        
                                    },
                                    success: function (response) {
                                        
                                        Swal.fire({
                                            title: 'La categoria se actualizó correctamente',
                                            confirmButtonText: 'OK',
                                            icon: 'success',
                                        })
                                        
                                        $("#"+idCategoria).html(answers[0]);
                                        
                                    }
                                });
                                
                            } else {
                                
                                Swal.fire({
                                    title: 'Los campos deben estar llenos. Intentalo de nuevo',
                                    confirmButtonText: 'OK',
                                    icon: 'error',
                                })
                                
                            }
                            
                        }
                    })
                    
                }
                
$("#nuevoCategoria").click(function (e) { 
                    
                    Swal.mixin({
                        input: 'text',
                        confirmButtonText: 'Siguiente',
                        cancelButtonText: 'Cancelar',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        progressSteps: ['1', '2']
                    }).queue([
                        {
                            title: 'Ingresa un nombre para la categoria',
                        },
                        {
                            title: 'Ingresa la descripción',
                        },
                    ]).then((result) => {
                        if (result.value) {
                            const answers = result.value
                            
                            if((answers[0] != "") && (answers[1] != "")){
                                
                                $.ajax({
                                    type: "POST",
                                    url: "/lugar/categoria/nuevo",
                                    data: {
                                        
                                        csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
                                        nombre: answers[0],
                                        descripcion: answers[1],
                                        
                                    },
                                    success: function (response) {
                                        
                                        Swal.fire({
                                            title: 'La categoria se añadió correctamente',
                                            confirmButtonText: 'OK',
                                            icon: 'success',
                                        })
                                        
                                        let sinEspacios = response.categoria.nombre.replace(/\s/g, '')
                                        
                                        contadorInvitacion++;
                                        
                                        let solicitud = '<div style="display: flex; width: 100%; justify-content: space-between; margin-bottom: 5px;" id="'+sinEspacios+'"><span style="display: flex;" id='+response.categoria.id+'>'+response.categoria.nombre+'</span><div style="display: flex; width: 100px; justify-content: flex-end;"><button class="btn btn-info aceptarSolicitudPropBoton" type="button" id="'+sinEspacios+'Ver"><i class="far fa-eye"></i></button><button class="btn btn-secondary rechazarSolicitudPropBoton" type="button" id="'+sinEspacios+'Actualizar"><i class="fas fa-pencil-alt"></i></button><button class="btn btn-danger rechazarSolicitudPropBoton" type="button" id="'+sinEspacios+'Borrar"><i class="fas fa-trash-alt"></i></button></div></div>'
                                        
                                        $(solicitud).appendTo("#contenedorSolicitudCategoria");
                                        
                                        $("#"+sinEspacios+"Ver").click(function (e) { 
                                            verCategoria(response.categoria.id);
                                            
                                        });
                                        
                                        $("#"+sinEspacios+"Actualizar").click(function (e) { 
                                            
                                            actualizarCategoria(response.categoria.id);
                                            
                                        });
                                        
                                        $("#"+sinEspacios+"Borrar").click(function (e) { 
                                            
                                            rechazarInvitacion(response.categoria.id);
                                            
                                        });                          
                                    }
                                });
                                
                            } else {
                                
                                Swal.fire({
                                    title: 'Los campos deben estar llenos. Intentalo de nuevo',
                                    confirmButtonText: 'OK',
                                    icon: 'error',
                                })
                                
                            }
                            
                        }
                    })
                    
                });

function borrarCategoria(idCategoria, nombre){

      Swal.fire({
        title: 'Eliminar categoria',
        text: "¿Seguro que deseas eliminar esta categoría? Esta acción no se puede deshacer y eliminara a todos los lugares relacionados a esta categoría.",
        showCancelButton: true,
        confirmButtonColor: '##dd3333',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {

            $.ajax({
                type: "POST",
                url: "/lugar/categoria/eliminar",
                data: {
                    
                    csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
                    id: idCategoria,
        
                },
                success: function (response) {
                    
                    Swal.fire(
                        '¡Eliminado!',
                        'La categoría fue eliminada',
                        'success'
                    ) 

                    $("#"+nombre).addClass('invisible');
        
                }
            });

        }
      })

}