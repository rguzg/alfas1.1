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

function botonAnadir(){

    $("#btn-anadir").hover(function () {

        $("#btn-anadir").css("background-color", "#2c3e50");
        
    }, function () {
    
        $("#btn-anadir").css("background-color", "#000000");
            
        }
    );

    $("#btn-anadir").click(function (e) { 
    
        $.ajax({
            type: "POST",
            url: "/anadirAmigo",
            data: {
    
                "csrfmiddlewaretoken": document.getElementsByName('csrfmiddlewaretoken')[0].value,
                "amigo": $("#usuario").html(),
    
            },
            success: function (response) {
                
                if (response.status == 200) {
    
                    Toast.fire({
                        icon: 'success',
                        title: 'La solicitud fue enviada'
                    });
                    
                    let cancelar = '<button class="btn btn-danger" id="btn-cancelar"><i class="fas fa-user-times"></i></button>';
    
                    $("#btn-anadir").addClass("invisible");
                    $(cancelar).prependTo("#contenedorAmistad");
    
                    $("#estadoAmistad").html('Solicitud Enviada');
                    botonCancelar();
    
                } else {
    
                    Toast.fire({
                        icon: 'error',
                        title: 'Ocurrió un error. Intentalo más tarde'
                    });
    
                }
    
            }
        });
        
    });

}

function botonCancelar(){

    $("#btn-cancelar").click(function (e) { 
   
        $.ajax({
            type: "POST",
            url: "/eliminarAmigo",
            data: {
    
                "csrfmiddlewaretoken": document.getElementsByName('csrfmiddlewaretoken')[0].value,
                "amigo": $("#usuario").html(),
    
            },
            success: function (response) {
                
                if (response.status == 200) {
    
                    Toast.fire({
                        icon: 'success',
                        title: 'Cancelaste la solicitud de amistad'
                    });
    
                    let añadir = '<button class="btn" id="btn-anadir"><i class="fas fa-user-friends"></i></button>';
    
                    $("#btn-cancelar").addClass("invisible");
                    $("#btn-confirmar").addClass("invisible");
                    $(añadir).prependTo("#contenedorAmistad");
    
                    $("#estadoAmistad").html('Añadir Amigo');
                    botonAnadir();
                    
                } else {
    
                    Toast.fire({
                        icon: 'error',
                        title: 'Ocurrió un error. Intentalo más tarde'
                    });
    
                }
    
            }
        });
        
    });

}

function botonConfirmar(){

    $("#btn-confirmar").click(function (e) { 
   
        $.ajax({
            type: "POST",
            url: "/confirmarAmigo",
            data: {
    
                "csrfmiddlewaretoken": document.getElementsByName('csrfmiddlewaretoken')[0].value,
                "amigo": $("#usuario").html(),
    
            },
            success: function (response) {
                
                if (response.status == 200) {
    
                    Toast.fire({
                        icon: 'success',
                        title: 'Aceptaste la solicitud de amistad'
                    });
    
                    let eliminar = '<button class="btn btn-danger" id="btn-eliminar"><i class="fas fa-user-times"></i></button>';
    
                    $("#btn-cancelar").addClass("invisible");
                    $("#btn-confirmar").addClass("invisible");
                    $(eliminar).prependTo("#contenedorAmistad");
    
                    $("#estadoAmistad").html('Amigos');
                    botonEliminar();
                    
                } else {
    
                    Toast.fire({
                        icon: 'error',
                        title: 'Ocurrió un error. Intentalo más tarde'
                    });
    
                }
    
            }
        });
        
    });

}

function botonEliminar(){

    $("#btn-eliminar").click(function (e) { 
   
        $.ajax({
            type: "POST",
            url: "/eliminarAmigo",
            data: {
    
                "csrfmiddlewaretoken": document.getElementsByName('csrfmiddlewaretoken')[0].value,
                "amigo": $("#usuario").html(),
    
            },
            success: function (response) {
                
                if (response.status == 200) {
    
                    Toast.fire({
                        icon: 'success',
                        title: $("#usuario").html() + ' y tu ya no son amigos'
                    });
    
                    let añadir = '<button class="btn" id="btn-anadir"><i class="fas fa-user-friends"></i></button>';
    
                    $("#btn-eliminar").addClass("invisible");
                    $(añadir).prependTo("#contenedorAmistad");
    
                    $("#estadoAmistad").html('Añadir Amigo');
                    botonAnadir();
                    
                } else {
    
                    Toast.fire({
                        icon: 'error',
                        title: 'Ocurrió un error. Intentalo más tarde'
                    });
    
                }
    
            }
        });
        
    });

}

botonAnadir();
botonCancelar();
botonConfirmar();
botonEliminar();