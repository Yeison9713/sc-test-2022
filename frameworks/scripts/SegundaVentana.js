var { ipcRenderer } = require("electron");
var remote = require("electron").remote;

// window.$ = window.jQuery = require('jquery');
var $_MESSAGE = []; var $_PARENT;

ipcRenderer.on('finish', (event, message) => {
    $_MESSAGE = message;
    console.log(message);
    // _Cargarhtml();
    _cargarScriptsSegundaV();
});

ipcRenderer.on("cerrar", (event, message) => {
    remote.getCurrentWindow().close();
 });

ipcRenderer.on("ejecutar", (event, message) => {
   _EventocrearSegventana(['off']);
});


function _cargarScriptsSegundaV() {
    let modulo = localStorage.Modulo.trim();
    var $_SCRIPTS;
    console.log($_USUA_GLOBAL[0])
    $.ajax({
        url: "../scripts/scripts.json",
        type: "GET",
        dataType: 'json'
    }).done(function (data) {
        $_SCRIPTS = data.Scripts;
        $_SCRIPTS[0].Scripts.forEach(item => {
            var element = document.createElement("script");
            element.type = "text/javascript";
            element.src = item;
            $("head").append(element);
        })
        if (modulo == 'SAL' || modulo == 'RX' || modulo == 'LAB' || modulo == 'HIC') {
            $_SCRIPTS[1].Scripts.forEach(item => {
                var element = document.createElement("script");
                element.type = "text/javascript";
                element.src = item;
                $("head").append(element);
            })
        }
        _getDataSegundaV();
    });
}

function _getDataSegundaV() {
    var url
    if (localStorage.Modulo.trim() == "RX" || localStorage.Modulo.trim() == "LAB") {
        url = get_url("APP/RX/CONUSUA-RM.dll");
    } else {
        url = get_url("APP/CONTAB/CONUSUA.dll");
    }

    postData({ datosh: datosEnvio() }, url)
        .then(data => {
            $_USUA_GLOBAL = data.DATOSUSUA;
            $_USUA_GLOBAL[0].NIT = parseInt($_USUA_GLOBAL[0].NIT);
            $_USUA_GLOBAL[0].RUTA_LOGO = path.join('file://', __dirname, '../imagenes/logo/' + $_USUA_GLOBAL[0].NIT + '.BMP');
            let mes = evaluarMes_min(localStorage.Mes);
            $('title').html(`
                \\${localStorage.Contab}\\${mes}
                &nbsp&nbsp&nbsp&nbsp&nbsp
                ${localStorage.Usuario} 
                ${localStorage.Nombre} 
                `);
            $('#user_menu_user').html(localStorage.Usuario + " - " + localStorage.Nombre);
            $('#lblEmpresa').html($_USUA_GLOBAL[0].NOMBRE);
            $CONTROL = localStorage.Contab + "_13";

            if ($_USUA_GLOBAL[0].TIPO_EMPRE == 'H' || localStorage.Modulo.trim() == "RX" || localStorage.Modulo.trim() == "LAB" || localStorage.Modulo.trim() == "HIC") {
                $('.loader').html(
                    '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-466.4 259.6 280.2 47.3" enable-background="new -466.4 259.6 280.2 47.3" xml:space="preserve" style="width: 50%; display: block; margin: 0 auto;">' +
                    '<polyline fill="none" stroke="#476fAD" class="ekg" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10" points="-465.4,281 -436,281 -435.3,280.6 -431.5,275.2 -426.9,281 -418.9,281 -423.9,281 -363.2,281 -355.2,269 -345.2,303 -335.2,263 -325.2,291 -319.2,281 -187.2,281 "/>' +
                    '</svg>'
                )
                $('.loader').css('align-items', 'center');
                $('.wrapper').css('display', 'contents', 'height', '');
            }
            console.log($_MESSAGE)
            if (localStorage.Modulo.trim() == "HIC") {
                $_REG_HC = $_MESSAGE[2].REG_HC
                $_REG_PROF = $_MESSAGE[2].REG_PROF
            }
            $('#body_main').load($_MESSAGE[0]);
            setTimeout(() => { _cargarEventos('off') }, 1000);
        })
        .catch(err => {

        })
}