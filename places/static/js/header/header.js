$("#logout").on('click', function () {
    
    $.ajax({
        type: "POST",
        data: {

            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,

        },
        url: "/logout",
        success: function (response){
            
            if(response.status == 200){

                window.location.href = '/';

            }

        }
    });

});

$("#places").on('click', function () {
    
    window.location.href = "/dashboard"; 

});

$("#profilePicture").on('click', function () {
    
    window.location.href = "/perfil?usuario="+sessionStorage.getItem('usuario'); 

});

$("#nuevoLugar").on('click', function () {
    
    window.location.href = "/lugar/nuevo"; 

});

$("#busqueda").on('input', function () {
    
    if(!validateEspacios($("#busqueda").val()) && ($("#busqueda").val() != "")){

        $.ajax({
            method: 'GET',
            url: "/busqueda?query="+$("#busqueda").val(),
            success: function (response) {
                
                if(response.lugar.length != 0 || response.usuario.length != 0){
    
                    $("#resultadosBusqueda").removeClass("invisible");
                    $("#resultadosBusqueda").html("");

                    response.lugar.forEach(element => {
                        
                        let link = '<div style="margin-left: 15px;"><a style="    color: black !important;" href="/lugar?nombre='+element[0]+'">'+element[0]+'</a></div>'
                        $("#resultadosBusqueda").append(link);

                    });
                    
                    response.usuario.forEach(element => {
                        
                        let link = '<div style="margin-left: 15px;"><a style="    text-decoration: none;" href="/perfil?usuario='+element[1]+'">'+element[0]+'</a></div>'
                        $("#resultadosBusqueda").append(link);

                    });

    
                } else {
    
                    $("#resultadosBusqueda").addClass("invisible");
    
                }
    
            }
        });

    } else {
    
        $("#resultadosBusqueda").addClass("invisible");

    }

    
});

function validateEspacios(input){
    
    var re = /^\s+$/;
    return re.test(input);
    
}