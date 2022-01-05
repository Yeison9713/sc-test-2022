$(document).ready(function () {
    console.log('entro a teclas')
    loader('hide')
    validar_teclas()
})

$('input').on('keypress', function (event) {
    var regex = new RegExp("^[a-zA-Z0-9 ñ Ñ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
});

function validar_teclas() {

    validarInputs(
        {
            form: "#teclas",
            orden: '1'
        },
        function () { validar_teclas() },
        function () {
            var tecla = $('#caja_teclas').val()

            LLAMADO_DLL({
                dato: [tecla],
                callback: _on_llamarTeclas_mig,
                nombredll: 'TECLAS',
                carpeta: 'MIGRA'
            });
        }
    )
}

function _on_llamarTeclas_mig(data) {
    var rdll = data.split('|');
    console.log(rdll)
    if (rdll[0].trim() == '00') {
        $('#dll_teclas').val(rdll)
        validar_teclas()
    } else {
        CON852(rdll[0], rdll[1], rdll[2], validar_teclas);
    }
}

// function urlDll(nomDll, modulo) {
//     return 'http://' + '192.168.0.100' + '/MAIN-ELECT/' + 'app/' + modulo + '/' + nomDll + '.dll';
// }

// function LLAMADO_DLLMIGRA(params) {
// 	 console.log(params.dato[0])
// 	$.ajax({
// 		url: urlDll(params.nombredll, params.carpeta),
// 		type: 'POST',
// 		data: { datosh: params.dato[0] },
// 		contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",		
// 		beforeSend: function(request) {
// 			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=ISO-8859-15");
// 			request.setRequestHeader("test", "test1");
// 		  },
// 	})
	
// 	// console.log(utf8_encode(params.dato[0]))

//     // var data = new FormData();
//     // data.append("datosh", params.dato[0]);
    
//     // var xhr = new XMLHttpRequest();
//     // xhr.open("POST", urlDll(params.nombredll, params.carpeta), false)
//     // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=ISO-8859-15");
//     // xhr.send(data);
//     // if (xhr.status == 200) {
//     // console.log(xhr.response);
//     // } else {
//     // console.log('Error: ' + xhr);		
//     // }
	
//     SolicitarDll({ datosh: params.dato[0] }, params.callback, urlDll(params.nombredll, params.carpeta));
// }
