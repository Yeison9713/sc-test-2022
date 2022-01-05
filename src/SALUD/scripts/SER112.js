/* NOMBRE RM --> SER112 // NOMBRE ELECTR --> SAL717 */

var $_NovedSer717, arrayservhsp, $_descripcod_717;

$(document).ready(function () {
    nombreOpcion('9,7,1,7 -Actualizacion de Servicios Hospitalarios'); 
    _inputControl('reset');
    _inputControl('disabled');
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    _toggleF8([
        { input: 'codigo', app: '717', funct: _ventanaSerHosp }
    ]);
    obtenerDatosCompletos({
        nombreFd: 'SERV_HOSP'
    }, function (data) {
        $_SERVICIO_717 = data.SERVICIO;
        $_SERVICIO_717.pop()
        CON850(_evaluarCON850_SER112);
    })
});



// --> F8 SERVICIO-HOSPT //
function _ventanaSerHosp(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE SERVICIOS HOSPITALARIOS",
            columnas: ["ID", "DESCRIPCION"],
            data: $_SERVICIO_717,
            callback_esc: function () {
                $("#codigo_717").focus();
            },
            callback: function (data) {
                document.getElementById('codigo_717').value = data.ID;
                document.getElementById('descripServh717').value = data.DESCRIPCION.trim();
                _enterInput('#codigo_717');
            }
        });
    }
}

function _evaluarCON850_SER112(novedad) {
    $_NovedSer717 = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _evaluarDato();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novSer717').val(novedad.id + ' - ' + novedad.descripcion)
}

function _evaluarDato() {
    validarInputs(
        {
            form: "#dato",
            orden: '1'
        },
        function () { CON850(_evaluarCON850_SER112); },
        _validacionesdato_717
    )
}

function _validacionesdato_717() {
    $codigo717 = $('#codigo_717').val();

    if($codigo717.trim()== ''){
        CON851('00', '00', null, 'error', 'error');
        _evaluarDato();
    }else{
        LLAMADO_DLL({
            dato: [$codigo717],
            callback: _dataconsultacodigo_717,
            nombredll: 'SER112-01',
            carpeta: 'SALUD'
        });
    }
}

function _dataconsultacodigo_717(data){
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_descripcod_717 = date[1].trim();

    if (($_NovedSer717 == '7') && (swinvalid == '01')) {
        _evaluardescripcodigo_717(); 
    }
    else if (($_NovedSer717 == '7') && (swinvalid == '00')) {
        CON851('00', '00', null, 'error', 'Error');
        CON850(_evaluarCON850_SER112);
    }
    else if (($_NovedSer717 == '8') && (swinvalid == '00')) {
        _llenarDatSer717(); 
    }
    else if (($_NovedSer717 == '8') && (swinvalid == '01')) {
        CON851('01', '01', null, 'error', 'Error');
        CON850(_evaluarCON850_SER112);
    }
    else if (($_NovedSer717 == '9') && (swinvalid == '00')) {
        _llenarDatSer717(); 
    }
    else if (($_NovedSer717 == '9') && (swinvalid == '01')) {
        CON851('01', '01', null, 'error', 'Error');
        CON850(_evaluarCON850_SER112);
    }
}

function _evaluardescripcodigo_717(){
    validarInputs(
        {
            form: "#detalle",
            orden: '1'
        },
        function () { _evaluarDato()},
        _envioDatSer717
    )
}

function _envioDatSer717() {
    $_descripcod_717 = $('#descripServh717').val();
    LLAMADO_DLL({
        dato: [$_NovedSer717, $codigo717, $_descripcod_717],
        callback: dataSAL717,
        nombredll: 'SER112-02',
        carpeta: 'SALUD'
    })
}

/////// NOVEDAD 8 Y 9 ////////////////////
function _llenarDatSer717(data) {

    $('#descripServh717').val($_descripcod_717);
    switch (parseInt($_NovedSer717)) {
        case 8:
            _evaluardescripcodigo_717(); 
            break;
        case 9:
            CON851P('54', _evaluarDato, _eliminaDatos717)
            break;
    }
}


// ELIMINAR REGISTRO
function _eliminaDatos717() {
    LLAMADO_DLL({
        dato: [$_NovedSer717, $codigo717, $_descripcod_717],
        callback: dataSAL717,
        nombredll: 'SER112-02',
        carpeta: 'SALUD'
    })
}

function dataSAL717(data) {
    _inputControl('reset');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if ($_NovedSer717 == '9') {
            toastr.success('Se ha retirado', 'MAESTRO SERVICIO HOSP');
            _inputControl('reset');
            _inputControl('disabled')
            // CON850(_evaluarCON850_SER112);
            _toggleNav();
        } else {
            toastr.success('Se ha guardado', 'MAESTRO SERVICIO HOSP');
            _inputControl('reset');
            _inputControl('disabled');
            // CON850(_evaluarCON850_SER112);
            _toggleNav();
        }
    } else if (swinvalid == "01") {
        CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'error');

    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}




