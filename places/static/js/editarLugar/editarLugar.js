//Variables que nos dicen si los datos ingresados por el usuario son validos:
var nombreValido = true;
var descripcionValido = true;
var numeroValido = true;
var sitioValido = true;
var horaValido = true;
var direccionValido = true;

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

$("#descripcion").on("focusout", function() { 
    
    let descripcion = $("#descripcion");
    let mensaje = $("#errorDescripcion");
    
    if(descripcion.val() == "" || validateEspacios(descripcion.val()) == true){
        
        descripcion.addClass("error");
        mensaje.removeClass("invisible");
        
        descripcionValido = false;
        
    } else {
        
        descripcion.removeClass("error");
        mensaje.addClass("invisible");
        
        descripcionValido = true;
        
    }
    
});

$("#numero").on("focusout", function() { 
    
    let numero = $("#numero");
    let mensaje = $("#errorNumero");
    
    if(numero.val() == "" || validateEspacios(numero.val()) == true || !(validateNumero(numero.val()))){
        
        numero.addClass("error");
        mensaje.removeClass("invisible");
        
        numeroValido = false;
        
    } else {
        
        numero.removeClass("error");
        mensaje.addClass("invisible");
        
        numeroValido = true;
        
    }
    
});

$("#sitioWeb").on("focusout", function() { 
    
    let sitioWeb = $("#sitioWeb");
    let mensaje = $("#errorSitio");
    
    if(sitioWeb.val() == "" || validateEspacios(sitioWeb.val()) == true || !(validateURL(sitioWeb.val()))){
        
        sitioWeb.addClass("error");
        mensaje.removeClass("invisible");
        
        sitioValido = false;
        
    } else {
        
        sitioWeb.removeClass("error");
        mensaje.addClass("invisible");
        
        sitioValido = true;
        
    }
    
});

$("#horaAbre").on("focusout", function() { 
    
    let horaAbre = $("#horaAbre");
    let horaCierra = $("#horaCierra");
    let mensaje = $("#errorHoras");
    
    if(horaAbre.val() == "" || validateEspacios(horaAbre.val()) == true || horaCierra.val() == "" || validateEspacios(horaCierra.val()) == true || !(validateHoras(horaAbre.val())) || !(validateHoras(horaCierra.val()))){
        
        horaAbre.addClass("error");
        horaCierra.addClass("error");
        mensaje.removeClass("invisible");
        
        horaValido = false;
        
    } else {
        
        horaAbre.removeClass("error");
        horaCierra.removeClass("error");
        mensaje.addClass("invisible");
        
        horaValido = true;
        
    }
    
});

$("#direccion").on("focusout", function() { 
    
    let direccion = $("#direccion");
    let mensaje = $("#errorDireccion");
    
    if(direccion.val() == "" || validateEspacios(direccion.val()) == true ){
        
        direccion.addClass("error");
        mensaje.removeClass("invisible");
        
        direccionValido = false;
        
    } else {
        
        direccion.removeClass("error");
        mensaje.addClass("invisible");
        
        direccionValido = true;
        
    }
    
});

$("#foto").on("input" ,function (e) {
    
    $("#cancelarFoto").removeClass("invisible"); 
    
});

$("#menu").on("input" ,function (e) {
    
    $("#cancelarMenu").removeClass("invisible"); 
    
});


$("#cancelarFoto").on("click" ,function (e) {
    
    $("#cancelarFoto").addClass("invisible"); 
    $("#foto").val("");
    
});

$("#cancelarMenu").on("click" ,function (e) {
    
    $("#cancelarMenu").addClass("invisible"); 
    $("#menu").val("");
    
});



function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateEspacios(input){
    
    var re = /^\s+$/;
    return re.test(input);
    
}

function validateNumero(input){
    
    var re = /^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/;
    return re.test(input);
    
}

function validateURL(input){
    
    var re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(input);
    
}

function validateHoras(input){
    
    var re = /([0-9]{2}:[0-9]{2})/;
    return re.test(input);
    
}

//Verificación de que todos los datos esten correctos
function validarDatos(){
    
    if (nombreValido && descripcionValido && numeroValido && sitioValido && horaValido){
        
        return true;
        
    } else {
        
        return false;
        
    }
    
}

//Realizar registro
$("#registroBoton").on("click", function () {
    
    if (validarDatos()) {
        
        let formdata = new FormData();
        formdata.append("csrfmiddlewaretoken", document.getElementsByName('csrfmiddlewaretoken')[0].value);
        formdata.append("foto", $("#foto").prop('files')[0]);
        formdata.append("menu", $("#menu").prop('files')[0]);
        formdata.append("nombre", $("#nombre").val());
        formdata.append("descripcion", $("#descripcion").val());
        formdata.append("numero", $("#numero").val());
        formdata.append("sitioWeb", $("#sitioWeb").val());
        formdata.append("horaAbre", $("#horaAbre").val());
        formdata.append("horaCierra", $("#horaCierra").val());
        formdata.append("direccion", $("#direccion").val());
        formdata.append("categoria", $("#categoria").val());
        formdata.append("lunes", $("#lunes").val());
        formdata.append("martes", $("#martes").val());
        formdata.append("miercoles", $("#miercoles").val());
        formdata.append("jueves", $("#jueves").val());
        formdata.append("viernes", $("#viernes").val());
        formdata.append("sabado", $("#sabado").val());
        formdata.append("domingo", $("#domingo").val());
        formdata.append("pepsecret", $("#pepsecret").val());
        
        $.ajax({
            type: "POST",
            url: "/lugar/editar",
            data: formdata,
            processData: false,
            contentType: false,
            success: function (response) {
                
                if(response.status == 200){
                    
                    Toast.fire({
                        icon: 'success',
                        title: 'Lugar editado correctamente redirigiendo a los datos del lugar'
                    });
                    
                }

                if(response.status == 500){
                    
                    Toast.fire({
                        icon: 'error',
                        title: 'Ya existe un lugar con ese nombre. Intentalo de nuevo'
                    });
                    
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
