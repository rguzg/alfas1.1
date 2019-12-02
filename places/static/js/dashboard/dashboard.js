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

$(document).ready(function () {
    
    if (sessionStorage.getItem('tipoUsuario') == 'administrador') {
        
        obtenerSolicitudesPropietario();

    }

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

function aceptarPropietario(nombreUsuario){

    $.ajax({
        type: "POST",
        url: "/aceptarPropietario",
        data: {
            
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
            usuario: nombreUsuario,

        },
        success: function (response) {
            
            $("#"+nombreUsuario).addClass(invisible);
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
            
            $("#"+nombreUsuario).addClass(invisible);
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