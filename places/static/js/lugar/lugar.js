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


$("#eliminarBoton").click(function (e) { 

    Swal.fire({
        title: '¿Deseas eliminar este lugar?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {

            $.ajax({
                type: "POST",
                url: "/cancelarLugar",
                data: {
                    
                    csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
                    lugar: $("#titulo").val(),
        
                },
                success: function (response) {
                    
                    Swal.fire(
                        '¡Eliminado!',
                        'El lugar fue eliminado',
                        'success'
                    ) 

                    window.location.href = '/dashboard'
        
                }
            });

        }
      })

});

var listaAmigos;             
function getAmigos(){
    $.ajax({
        type: "GET",
        url: "/amigos",
        success: function (response) {

            listaAmigos = response;

        }
    });

}

$("#solicitudBoton").click(function (e) { 
    

    Swal.fire({
        title: 'Enviar invitación',
        text: "Selecciona a quién le quieres enviar la invitación",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        input: 'select',
        inputOptions: listaAmigos,
      }).then((result) => {
            $.ajax({
                type: "POST",
                url: "/invitacion",
                data: {
                    
                    csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
                    lugar: $("#titulo").html().trim(),
                    invitado: result.value,

                },
                success: function (response) {
                    Swal.fire(
                        '¡Invitación enviada!',
                        'Puedes ver tus invitaciones en tu dashboard',
                        'success'
                      )
                }
            });

      })
    
});

$("#reportarBoton").click(function (e) { 
    
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
          title: 'Ingresa un titulo para tu reporte',
        },
        {
          title: 'Ingresa una breve descripción',
        },
      ]).then((result) => {
        if (result.value) {
            const answers = result.value

            if((answers[0] != "") && (answers[1] != "")){

                $.ajax({
                    type: "POST",
                    url: "/lugar/reportar",
                    data: {

                        csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
                        titulo: answers[0],
                        descripcion: answers[1],
                        lugar: $("#titulo").html().trim(),

                    },
                    success: function (response) {
                        
                        Swal.fire({
                            title: 'Tu reporte se envió correctamente y está en espera a que lo apruebe un administrador.',
                            confirmButtonText: 'OK',
                            icon: 'success',
                          })

                    }
                });

            } else {

                Swal.fire({
                    title: 'Ocurrio un error al agendar tu reporte. Intentalo de nuevo.',
                    confirmButtonText: 'OK',
                    icon: 'error',
                  })

            }

        }
      })

});

$(document).ready(function () {
    
    getAmigos();

});

$("#editarBoton").click(function (e) { 
    
    window.location.href = '/lugar/editar?nombre='+$("#titulo").html().trim();
    
});
