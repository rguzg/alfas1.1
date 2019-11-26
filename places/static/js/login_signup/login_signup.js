//Variables que nos dicen si los datos ingresados por el usuario son validos:
var nombreValido;
var apellidosValido;
var usuarioValido;
var correoValido;
var passwordValido;
var passwordVerifyValido;

var usuarioLoginValido;
var passwordlLoginValido;

//Toast    
const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    target: '.derecho',
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

const ToastLogin = Swal.mixin({
    toast: true,
    position: 'bottom',
    target: "div.login div[class='derecho']",
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

//Verificar que los campos esten llenos
$("#nombre").on("focusout", function() { 
    
    let nombre = $("#nombre");
    let mensaje = $("#errorNombre");
    
    if(nombre.val() == "" || validateEspacios(nombre.val()) == true){
        
        nombre.addClass("error");
        mensaje.removeClass("invisible");
        
        nombreValido = false;
        
    } else {
        
        nombre.removeClass("error");
        mensaje.addClass("invisible");
        
        nombreValido = true;
        
    }
    
});

$("#apellidos").on("focusout", function() { 
    
    let apellidos = $("#apellidos");
    let mensaje = $("#errorApellidos");
    
    if(apellidos.val() == "" || validateEspacios(apellidos.val()) == true){
        
        apellidos.addClass("error");
        mensaje.removeClass("invisible");
        
        apellidosValido = false;
        
    } else {
        
        apellidos.removeClass("error");
        mensaje.addClass("invisible");
        
        apellidosValido = true;
        
    }
    
});

$("#usuario").on("focusout", function() { 
    
    let usuario = $("#usuario");
    let mensaje = $("#errorUsuario");
    
    if(usuario.val() == "" || validateEspacios(usuario.val()) == true){
        
        usuario.addClass("error");
        mensaje.removeClass("invisible");
        
        usuarioValido = false;
        
    } else {
        
        usuario.removeClass("error");
        mensaje.addClass("invisible");
        
        usuarioValido = true;
        
    }
    
});

$("#correo").on("focusout", function() { 
    
    let correo = $("#correo");
    let mensaje = $("#errorCorreo");
    
    if(correo.val() == "" || validateEspacios(correo.val()) == true){
        
        correo.addClass("error");
        mensaje.removeClass("invisible");
        
        correoValido = false;
        
    } else {
        
        correo.removeClass("error");
        mensaje.addClass("invisible");
        
        correoValido = true;
        
    }
    
    if (!(validateEmail(correo.val()))) {
        
        correo.addClass("error");
        mensaje.removeClass("invisible");
        
        correoValido = false;
        
    } else {
        
        correo.removeClass("error");
        mensaje.addClass("invisible");
        
        correoValido = true;
        
    }
    
});

$("#password").on("focusout", function() { 
    
    let password = $("#password");
    let mensaje = $("#errorPassword");
    
    if(password.val() == "" || validateEspacios(password.val()) == true){
        
        password.addClass("error");
        mensaje.removeClass("invisible");
        
        passwordValido = false;
        
    } else {
        
        password.removeClass("error");
        mensaje.addClass("invisible");
        
        passwordValido = true;
        
    }
    
});

$("#passwordLogin").on("focusout", function() { 
    
    let password = $("#passwordLogin");
    
    if(password.val() == "" || validateEspacios(password.val()) == true){
                
        passwordlLoginValido = false;
        
    } else {
                
        passwordlLoginValido = true;
        
    }
    
});

$("#usuarioLogin").on("focusout", function() { 
    
    let usuario = $("#usuarioLogin");
    
    if(usuario.val() == "" || validateEspacios(usuario.val()) == true){
                
        usuarioLoginValido = false;
        
    } else {
                
        usuarioLoginValido = true;
        
    }
    
});

//Verificar que la contraseña y la verificacion de contraseña sean iguales
$("#passwordVerify").on("focusout", function() { 
    
    let password = $("#password");
    let passwordVerify = $("#passwordVerify");
    let mensaje = $("#errorContraseñaIgual");
    
    if(password.val() != passwordVerify.val()){
        
        passwordVerify.addClass("error");
        mensaje.removeClass("invisible");
        
        passwordVerifyValido = false;
        
    } else {
        
        passwordVerify.removeClass("error");
        mensaje.addClass("invisible");
        
        passwordVerifyValido = true;
        
    }
    
});

//Cambiar de la pantalla de registro a inicio de sesión
$("#botonIrLogin").on("click", function() {
    
    $("#signup").addClass("invisible");
    $("#login").removeClass("invisible");
    
});
//Cambiar de la pantalla de inicio de sesión a registro
$("#botonIrSignup").on("click", function() {
    
    $("#login").addClass("invisible");
    $("#signup").removeClass("invisible");
    
});

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateEspacios(input){

    var re = /[\n# $&:\n\t]/;
    return re.test(input);

}

//Verificación de que todos los datos esten correctos
function validarDatosRegistro(){
    
    if (nombreValido && apellidosValido && usuarioValido && correoValido && passwordValido && passwordVerifyValido){
        
        return true;
        
    } else {
        
        return false;
        
    }
    
}

function validarDatosLogin(){
    
    if (usuarioLoginValido && passwordlLoginValido){
        
        return true;
        
    } else {
        
        return false;
        
    }
    
}

//Realizar registro
$("#botonRegistro").on("click", function () {
    
    if (validarDatosRegistro()) {
        
        $.ajax({
            type: "POST",
            url: "/registro",
            data: {
                
                csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
                nombre: $("#nombre").val(),
                apellidos: $("#apellidos").val(),
                usuario: $("#usuario").val(),
                correo: $("#correo").val(),
                password: $("#password").val(),
                
            },
            success: function (response) {
                if(response.status == 500){

                    Toast.fire({
                        icon: 'error',
                        title: 'El usuario que elegiste ya esta ocupado. Intenta con otro nombre de usuario'
                    });

                }

                if(response.status == 200){

                    Toast.fire({
                        icon: 'success',
                        title: 'Usuario registrado correctamente. Redirigiendo a inicio de sesión'
                    });
                    
                    setTimeout(function(){

                        $("#signup").addClass("invisible");
                        $("#login").removeClass("invisible");
                        
                    }, 3000);

                }
            }
        });
        
    } else {
        
        Toast.fire({
            icon: 'error',
            title: 'Completa todos los campos antes de continuar'
        });
        
    }
    
    
});

//Realizar login
$("#botonLogin").on("click", function () {
    
    if (validarDatosLogin()) {
        
        $.ajax({
            type: "POST",
            url: "/login",
            data: {
                
                csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
                usuario: $("#usuarioLogin").val(),
                password: $("#passwordLogin").val(),
                
            },
            success: function (response) {
                if(response.status == 500){

                    ToastLogin.fire({
                        icon: 'error',
                        title: 'Tu usuario o contraseña es incorrecto. Intentalo de nuevo'
                    });

                }

                if(response.status == 200){

                    ToastLogin.fire({
                        icon: 'success',
                        title: 'Holi Crayoli Iniciaste Seionoli. Esto no lo deberia de ver nadieoli'
                    });

                }
            }
        });
        
    } else {
        
        ToastLogin.fire({
            icon: 'error',
            title: 'Completa todos los campos antes de continuar'
        });
        
    }
    
    
});