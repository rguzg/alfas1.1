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

//Cambiar el boton para confirmar edición
$("#usuarioBoton").click(function (e) { 
    
    $("#usuario").removeAttr("disabled");
    $("#usuarioBoton").addClass("invisible"); 
    $("#usuarioBotonChange").removeClass("invisible"); 
    
});

$("#nombreBoton").click(function (e) { 
    
    $("#nombre").removeAttr("disabled");
    $("#nombreBoton").addClass("invisible"); 
    $("#nombreBotonChange").removeClass("invisible"); 
    
});

$("#apellidosBoton").click(function (e) { 
    
    $("#apellidos").removeAttr("disabled");
    $("#apellidosBoton").addClass("invisible"); 
    $("#apellidosBotonChange").removeClass("invisible"); 
    
});

$("#correoBoton").click(function (e) { 
    
    $("#correo").removeAttr("disabled");
    $("#correoBoton").addClass("invisible"); 
    $("#correoBotonChange").removeClass("invisible"); 
    
});

$("#descripcionBoton").click(function (e) { 
    
    $("#descripcion").removeAttr("disabled");
    $("#descripcionBoton").addClass("invisible"); 
    $("#descripcionBotonChange").removeClass("invisible"); 
    
});

//Confirmar cambio
$("#usuarioBotonChange").click(function (e) { 
    
    actualizarDato("usuario");
    
});

$("#nombreBotonChange").click(function (e) { 
    
    actualizarDato("nombre");
    
});

$("#apellidosBotonChange").click(function (e) { 
    
    actualizarDato("apellidos");
    
});

$("#correoBotonChange").click(function (e) { 
    
    actualizarDato("correo");
    
});

$("#descripcionBotonChange").click(function (e) { 
    
    actualizarDato("descripcion");
    
});

//Actualizar foto de perfil
$("#fotoPerfil").on("input" ,function (e) {
    
    $("#fotoPerfilBoton").removeClass("invisible"); 
    $("#fotoPerfilCancelar").removeClass("invisible"); 
    $("#fotoPerfil").addClass("invisible"); 
    
});

$("#fotoPerfilBoton").click(function (e) { 
    
    let formdata = new FormData();
    formdata.append("csrfmiddlewaretoken", document.getElementsByName('csrfmiddlewaretoken')[0].value);
    formdata.append("atributo", "fotoPerfil");
    formdata.append("contenido", $("#fotoPerfil").prop('files')[0]);
    
    $.ajax({
        type: "POST",
        url: "/modificarPerfil",
        data: formdata,
        processData: false,
        contentType: false,
        success: function (response) {
            
            Toast.fire({
                icon: 'success',
                title: 'Tu foto de perfil se cambió correctamente'
            });

            $("#profilePicture").css("background-image", 'url(static/img/profilepictures/'+response.nombreArchivo+'.png)');
            $("#datosPicture").css("background-image", 'url(static/img/profilepictures/'+response.nombreArchivo+'.png)');
            $("#fotoPerfilBoton").addClass("invisible"); 
            $("#fotoPerfilCancelar").addClass("invisible"); 

        }
    });
    
});

$("#fotoPerfilCancelar").click(function (e) { 
    
    $("#fotoPerfil").val("");
    $("#fotoPerfilBoton").addClass("invisible"); 
    $("#fotoPerfilCancelar").addClass("invisible"); 
    $("#fotoPerfil").removeClass("invisible"); 

    
});

$("#fotoPerfil").hover(function () {
        
        $("#cambiarFoto").removeClass("invisible");
        
    }, function () {

        $("#cambiarFoto").addClass("invisible");
    }
);

//Verificación de que el dato sea correcto
function verificarDato(contenido, atributo){
    
    if(atributo == "usuario"){
        
        if(validateEspacios(contenido) == true){
            
            Toast.fire({
                icon: 'error',
                title: 'El usuario no puede esta vacio'
            });
            
            return false;
            
        } if(contenido == ""){
            
            $("#usuario").attr("disabled","");
            $("#usuarioBoton").removeClass("invisible"); 
            $("#usuarioBotonChange").addClass("invisible");
            
        } else {
            
            return true;
            
        }
        
    }
    
    if(atributo == "nombre"){
        
        if(validateEspacios(contenido) == true){
            
            Toast.fire({
                icon: 'error',
                title: 'El nombre no puede esta vacio'
            });
            
            return false;
            
        } if(contenido == ""){
            
            $("#nombre").attr("disabled","");
            $("#nombreBoton").removeClass("invisible"); 
            $("#nombreBotonChange").addClass("invisible");
            
        } else {
            
            return true;
            
        }
        
    }
    
    if(atributo == "apellidos"){
        
        if(validateEspacios(contenido) == true){
            
            Toast.fire({
                icon: 'error',
                title: 'Los apellidos no pueden estar vacios'
            });
            
            return false;
            
        } if(contenido == ""){
            
            $("#apellidos").attr("disabled","");
            $("#apellidosBoton").removeClass("invisible"); 
            $("#apellidosBotonChange").addClass("invisible");
            
        } else {
            
            return true;
            
        }
        
    }
    
    if(atributo =="correo"){
        
        if(validateEspacios(contenido) == true){
            if (validateEmail(contenido) == false) {
                
                Toast.fire({
                    icon: 'error',
                    title: 'El formato del correo es incorrecto'
                });
                
                return false;
                
            } else {
                
                return true;
                
            } 
            
        } if(validateEspacios(contenido) == false){
            if (validateEmail(contenido) == false) {
                
                Toast.fire({
                    icon: 'error',
                    title: 'El formato del correo es incorrecto'
                });
                
                return false;
                
            } else {
                
                return true;
                
            }
        } if(contenido == ""){
            
            $("#correo").attr("disabled","");
            $("#correoBoton").removeClass("invisible"); 
            $("#correoBotonChange").addClass("invisible");
            
        }
        
    }
    
    if(atributo == "descripcion"){
        
        if(validateEspacios(contenido) == true){
            
            Toast.fire({
                icon: 'error',
                title: 'La descripción no puede estar vacia'
            });
            
            return false;
            
        } if(contenido == ""){
            
            $("#descripcion").attr("disabled","");
            $("#descripcionBoton").removeClass("invisible"); 
            $("#descripcionBotonChange").addClass("invisible");
            
        } else {
            
            return true;
            
        }
        
    }
    
}

function actualizarDato(dato){
    
    let contenidoInsertado = $("#"+dato).val();
    
    if (verificarDato(contenidoInsertado, dato)) {
        
        $.ajax({
            type: "POST",
            url: "/modificarPerfil",
            data: {
                
                csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
                atributo: dato,
                contenido: contenidoInsertado,
                
            },
            success: function (response) {
                
                if(response.status == 500){
                    
                    Toast.fire({
                        icon: 'error',
                        title: 'El usuario que ingresaste ya está ocupado. Intentalo nuevamente'
                    });
                    
                } else {
                    
                    if (response.atributo == 'usuario') {
                        
                        sessionStorage.setItem('usuario', response.contenido);
                        
                        $("#profilePicture").click(function (e) { 
                            
                            window.location.href = "/perfil?usuario="+sessionStorage.getItem('usuario');
                            
                        });
                        
                        window.history.replaceState("object or string","Dashboard - Mi Perfil","/perfil?usuario="+sessionStorage.getItem('usuario'));
                        
                    }
                    
                    desactivarInput(response.contenido, response.atributo);
                    
                    Toast.fire({
                        icon: 'success',
                        title: 'Tu ' +response.atributo+ ' se modificó correctamente'
                    });
                    
                }
                
            }
        });
        
    }
    
}

function desactivarInput(contenido, atributo){
    
    $("#"+atributo).attr("disabled","");
    $("#"+atributo).val(contenido);
    $("#"+atributo+"Boton").removeClass("invisible"); 
    $("#"+atributo+"BotonChange").addClass("invisible"); 
    
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateEspacios(input){
    
    var re = /^\s+$/;
    return re.test(input);
    
}