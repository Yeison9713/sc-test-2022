var $_NovedSer71C, $desc71C, $procedm71C, $laborat71C, $imagen71C, $servicios71C, $consulta71C, $patologia71C, $pyp71C,
    $medicamn71C;

$(document).ready(function () {
    nombreOpcion('9,7,1,C -Actualizacion Divisiones Facturacion');
    _inputControl('reset');
    _inputControl('disabled');

    _toggleF8([
        { input: 'codigo', app: '71C', funct: _ventanaGrupcap }
    ]);
    CON850(_evaluarCON850)

});

// --> F8 DIVISIONES //
function _ventanaGrupcap(e) {
    
    let URL = get_url("APP/" + "SALUD/SER871" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_GRCAPITA_71C = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA UNIDADES DE SERVICIO",
                    columnas: ["CODIGO", "DESCRIP"],
                    data: $_GRCAPITA_71C.GRCAPITA,
                    callback_esc: function () {
                        $("#codigo_71C").focus();
                    },
                    callback: function (data) {
                        document.getElementById('codigo_71C').value = data.CODIGO.trim();
                        document.getElementById('descripGrcp71C').value = data.DESCRIPCION;
                        _enterInput('#codigo_71C');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

// NOVEDAD //
function _evaluarCON850(novedad) {
    $_NovedSer71C = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarDato71C();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novSer71C').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarDato71C() {
    validarInputs(
        {
            form: "#dato",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        validacionescoddivision_71C
    )
}

function validacionescoddivision_71C() {
    $codigo71C = $('#codigo_71C').val();
    if ($codigo71C.trim() == '') {

        CON851('00', '00', null, 'error', 'error');
        _validarDato71C();
    } else {
        LLAMADO_DLL({
            dato: [$codigo71C],
            callback: _dataconsultacoddiv_71C,
            nombredll: 'SER11C-01',
            carpeta: 'SALUD'
        });
    }
}

function _dataconsultacoddiv_71C(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $desc71C = date[1].trim();
    $procedm71C = date[2].trim();
    $laborat71C = date[3].trim();
    $imagen71C = date[4].trim();
    $servicios71C = date[5].trim();
    $consulta71C = date[6].trim();
    $patologia71C = date[7].trim();
    $pyp71C = date[8].trim();
    $medicamn71C = date[9].trim();

    if (($_NovedSer71C == '7') && (swinvalid == '01')) {
        _descripciondivision_71C()
    }
    else if (($_NovedSer71C == '7') && (swinvalid == '00')) {
        CON851('00', '00', null, 'error', 'Error');
        CON850(_evaluarCON850);
    }
    else if (($_NovedSer71C == '8') && (swinvalid == '00')) {
        _llenarCampos71C();
    }
    else if (($_NovedSer71C == '8') && (swinvalid == '01')) {
        CON851('01', '01', null, 'error', 'Error');
        CON850(_evaluarCON850);
    }
    else if (($_NovedSer71C == '9') && (swinvalid == '00')) {
        _llenarCampos71C();
    }
    else if (($_NovedSer71C == '9') && (swinvalid == '01')) {
        CON851('01', '01', null, 'error', 'Error');
        CON850(_evaluarCON850);
    }
}

function _descripciondivision_71C() {
    validarInputs(
        {
            form: '#detalle',
            orden: '1'
        },
        function () { _validarDato71C(); },
        _validardescrip_71C
    )
}

function _validardescrip_71C() {
    $desc71C = $('#descripGrcp71C').val()
    if ($desc71C.trim() == '') {
        _descripciondivision_71C();
    } else {
        _proced71c();
    }
}

function _proced71c() {
    validarInputs(
        {
            form: '#procedm',
            orden: '1'
        },
        function () { _descripciondivision_71C(); },
        _evaluarprocedimiento_71C
    )
}

function _evaluarprocedimiento_71C() {
    $procedm71C = $('#proced71C').val()
    if ($procedm71C.trim() == '') {
        $procedm71C = 'N';
        $("#proced71C").val($procedm71C);
        _laborat71c();
    } else if (($procedm71C == 'S') || ($procedm71C == 'N')) {
        _laborat71c();
    } else {
        _proced71c();
    }
}
function _laborat71c() {
    validarInputs(
        {
            form: '#laborat',
            orden: '1'
        },
        function () { _proced71c(); },
        _evaluarlaboratorio_71C
    )
}

function _evaluarlaboratorio_71C() {
    $laborat71C = $('#laborat71C').val()
    if ($laborat71C.trim() == '') {
        $laborat71C = 'N';
        $("#laborat71C").val($laborat71C);
        _imagen71c();
    } else if (($laborat71C == 'S') || ($laborat71C == 'N')) {
        _imagen71c();
    } else {
        _laborat71c();
    }
}
function _imagen71c() {
    validarInputs(
        {
            form: '#imagenol',
            orden: '1'
        },
        function () { _laborat71c(); },
        _evaluarimagen_71C
    )
}

function _evaluarimagen_71C() {
    $imagen71C = $('#imagen71C').val()

    if ($imagen71C.trim() == '') {
        $imagen71C = 'N';
        $("#imagen71C").val($imagen71C);
        _servicio71c();
    } else if (($imagen71C == 'S') || ($imagen71C == 'N')) {
        _servicio71c();
    } else {
        _imagen71c();
    }
}

function _servicio71c() {
    validarInputs(
        {
            form: '#servic',
            orden: '1'
        },
        function () { _imagen71c(); },
        _evaluarservicio_71C
    )
}
function _evaluarservicio_71C() {
    $servicios71C = $('#otroServ71C').val()
    if ($servicios71C.trim() == '') {
        $servicios71C = 'N';
        $("#otroServ71C").val($servicios71C);
        _consulta71c();
    } else if (($servicios71C == 'S') || ($servicios71C == 'N')) {
        _consulta71c();
    } else {
        _servicio71c();
    }
}

function _consulta71c() {
    validarInputs(
        {
            form: '#consulta',
            orden: '1'
        },
        function () { _servicio71c(); },
        _evaluarconsulta_71C
    )
}

function _evaluarconsulta_71C() {
    $consulta71C = $('#consulta71C').val()

    if ($consulta71C.trim() == '') {
        $consulta71C = 'N';
        $("#consulta71C").val($consulta71C);
        _patologia71c();
    } else if (($consulta71C == 'S') || ($consulta71C == 'N')) {
        _patologia71c();
    } else {
        _consulta71c();
    }
}

function _patologia71c() {
    validarInputs(
        {
            form: '#patologia',
            orden: '1'
        },
        function () { _consulta71c(); },
        _evaluarpatologia_71C
    )
}
function _evaluarpatologia_71C() {
    $patologia71C = $('#patolog71C').val()

    if ($patologia71C.trim() == '') {
        $patologia71C = 'N';
        $("#patolog71C").val($patologia71C);
        _promyprev71c();
    } else if (($patologia71C == 'S') || ($patologia71C == 'N')) {
        _promyprev71c();
    } else {
        _patologia71c();
    }
}

function _promyprev71c() {
    validarInputs(
        {
            form: '#promyprev',
            orden: '1'
        },
        function () { _patologia71c(); },
        _evaluarpromy_71C
    )
}
function _evaluarpromy_71C() {
    $pyp71C = $('#promyprev71C').val()
    if ($pyp71C.trim() == '') {
        $pyp71C = 'N';
        $("#promyprev71C").val($pyp71C);
        _medicament71c();
    } else if (($pyp71C == 'S') || ($pyp71C == 'N')) {
        _medicament71c();
    } else {
        _promyprev71c();
    }
}

function _medicament71c() {
    validarInputs(
        {
            form: '#medicamn',
            orden: '1'
        },
        function () { _promyprev71c(); },
        _evaluarmedic_71C
    )
}
function _evaluarmedic_71C() {
    $medicamn71C = $('#medicam71C').val()
    if ($medicamn71C.trim() == '') {
        $medicamn71C = 'N';
        $("#medicam71C").val($medicamn71C);
        _envioDatSer71C();
    } else if (($medicamn71C == 'S') || ($medicamn71C == 'N')) {
        _envioDatSer71C();
    } else {
        _medicament71c();
    }
}

function _envioDatSer71C() {

    LLAMADO_DLL({
        dato: [$_NovedSer71C, $codigo71C, $desc71C, $procedm71C, $laborat71C, $imagen71C, $servicios71C, $consulta71C, $patologia71C, $pyp71C, $medicamn71C],
        callback: _validargrabaropcion,
        nombredll: 'SER11C-02',
        carpeta: 'SALUD'
    })
}

function _validargrabaropcion(data) {
    console.log(data, 'resultado')
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if ($_NovedSer71C == '9') {
            toastr.success('Se ha retirado', 'MAESTRO DIVISION FACT');
            _inputControl('reset');
            _inputControl('disabled');
            CON850(_evaluarCON850);
        } else {
            toastr.success('Se ha guardado', 'MAESTRO DIVISION FACT');
            _inputControl('reset');
            _inputControl('disabled');
            CON850(_evaluarCON850);
        }
    } else if (swinvalid == "01") {
        CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'error');

    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

//////// NOVEDAD 8 Y 9 ////////////////////////
function _llenarCampos71C() {
    // $('#codigo_71C').val(CODIGO);
    $('#descripGrcp71C').val($desc71C);
    $('#proced71C').val($procedm71C);
    $('#laborat71C').val($laborat71C);
    $('#imagen71C').val($imagen71C);
    $('#otroServ71C').val($servicios71C);
    $('#consulta71C').val($consulta71C);
    $('#patolog71C').val($patologia71C);
    $('#promyprev71C').val($pyp71C);
    $('#medicam71C').val($medicamn71C);

    switch (parseInt($_NovedSer71C)) {
        case 8:
            _descripciondivision_71C();
            break;
        case 9:
            CON851P('54', _validarDato71C, _eliminaDatos71C)
            break;
    }
}

function _eliminaDatos71C() {
    LLAMADO_DLL({
        dato: [$_NovedSer71C, $codigo71C, $desc71C, $procedm71C, $laborat71C, $imagen71C, $servicios71C, $consulta71C, $patologia71C, $pyp71C, $medicamn71C],
        callback: _validargrabaropcion,
        nombredll: 'SER11C-02',
        carpeta: 'SALUD'
    })
}







// ELIMINAR REGISTRO




