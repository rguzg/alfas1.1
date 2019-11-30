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