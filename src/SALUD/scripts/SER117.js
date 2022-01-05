/* NOMBRE RM --> SER116 // NOMBRE ELECTR --> SAL71I */

var $_NovedSer71I, $arraygrpresgu, $_CODRESGU, $_NOMRESGU, $codigo_71I, descpr71I;

$(document).ready(function () {
    nombreOpcion('9,7,1,I -Actualizacion de Nombres Resguardos');
    _inputControl('reset');
    _inputControl('disabled');
    _toggleF8([
        { input: 'codigo', app: '71I', funct: _ventanaResgard }
    ]);
    obtenerDatosCompletos({
        nombreFd: 'RESGUARDOS'
    }, function (data) {
        $_RESGUARDOS_71I = data.RESGUARDOS;
        $_RESGUARDOS_71I.pop(); 
        CON850(_evaluarCON850);
    })
});


// --> F8 NOMBRE-RESG //
function _ventanaResgard(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE RESGUARDOS',
            columnas: ["COD", "DESCRIP"],
            data: $_RESGUARDOS_71I,
            callback_esc: function () {
                $("#codigo_71I").focus();
            },
            callback: function (data) {

                document.getElementById('codigo_71I').value = data.COD;
                document.getElementById('descripSer71I').value = data.DESCRIP;
                _enterInput('#codigo_71I');

            }
        });
    }
}


// NOVEDAD //
function _evaluarCON850(novedad) {

    $_NovedSer71I = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            if ($_NovedSer71I == '7') {
                _calcularconsecutivo_71I();
            } else {
                _validarDato71I();
            }
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novSer71I').val(novedad.id + ' - ' + novedad.descripcion)
}
function _calcularconsecutivo_71I() {
    LLAMADO_DLL({
        dato: [],
        callback: _dataSAL71I_consecutivo,
        nombredll: 'SER117-03',
        carpeta: 'SALUD'
    });
}

function _dataSAL71I_consecutivo(data) {
    console.log('data', data)
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $codigo_71I = date[1].trim();
    console.log($codigo_71I, '$codigo_71I')
    if (swinvalid == "00") {
        $('#codigo_71I').val($codigo_71I);
        _validarcodigores_71I();
    } else if (swinvalid == "01") {
        CON851('ERROR', 'ERROR CONSECUTIVO', null, 'error', 'error');
        _validarDato71H();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }

}

function _validarDato71I() {
    validarInputs(
        {
            form: "#dato",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        _validarcodigores_71I
    )
}
function _validarcodigores_71I() {
    $codigo_71I = $('#codigo_71I').val();
    LLAMADO_DLL({
        dato: [$codigo_71I],
        callback: _dataSAL71I_res,
        nombredll: 'SER117-01',
        carpeta: 'SALUD'
    });
}

function _dataSAL71I_res(data) {
    console.log(data, 'consulta')
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_NOMRESGU = date[1].trim();
    if (($_NovedSer71I == '7') && (swinvalid == '01')) {
        detalle71I()
    }
    else if (($_NovedSer71I == '7') && (swinvalid == '00')) {

        CON851('00', '00', null, 'error', 'Error');
        CON850(_evaluarCON850);
    }
    else if (($_NovedSer71I == '8') && (swinvalid == '00')) {

        _llenarCampos71I();

    }
    else if (($_NovedSer71I == '8') && (swinvalid == '01')) {

        CON851('01', '01', null, 'error', 'Error');
        CON850(_evaluarCON850);

    }
    else if (($_NovedSer71I == '9') && (swinvalid == '00')) {

        _llenarCampos71I();

    }
    else if (($_NovedSer71I == '9') && (swinvalid == '01')) {

        CON851('01', '01', null, 'error', 'Error');
        CON850(_evaluarCON850);

    }

}
/// NOVEDAD 7 ////

function detalle71I() {
    validarInputs(
        {
            form: '#detalle',
            orden: '1'
        },
        function () { _validarDato71I(); },
        function () { envioDatSer71I() }
    )
}

////////////////// 8 y  9 /////////////////
function _llenarCampos71I() {
    // $('#codigo_71I').val($_CODRESGU);
    $('#descripSer71I').val($_NOMRESGU);

    switch (parseInt($_NovedSer71I)) {
        case 8:
            detalle71I()
            break;
        case 9:
            CON851P('54', _validarDato71I, _eliminaDatos71I)
            break;
    }
}
//////////// ELIMINAR REGISTRO////////
function _eliminaDatos71I() {

    LLAMADO_DLL({
        dato: [$_NovedSer71I, $codigo_71I],
        callback: _data71I_02,
        nombredll: 'SER117-02',
        carpeta: 'SALUD'
    })
}


////// GRABAR DATOS //////////////////

function envioDatSer71I() {

    descpr71I = $('#descripSer71I').val();

    LLAMADO_DLL({
        dato: [$_NovedSer71I, $codigo_71I, descpr71I],
        callback: _data71I_02,
        nombredll: 'SER117-02',
        carpeta: 'SALUD'
    })
}

function _data71I_02(data) {
    console.log(data, 'grabar')
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if ($_NovedSer71I == '9') {
            toastr.success('Se ha retirado', 'MAESTRO RESGUARDO');
            _inputControl('reset');
            _inputControl('disabled');
            _toggleNav();
            // CON850(_evaluarCON850);
        } else {
            toastr.success('Se ha guardado', 'MAESTRO RESGUARDO');
            _inputControl('reset');
            _inputControl('disabled');
            _toggleNav();
            // CON850(_evaluarCON850);
        }
    } else if (swinvalid == "01") {
        CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'error');

    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


