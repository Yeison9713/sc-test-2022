var $operadordat_71E, $operadorprosf_71E, $idoperador_71E, $nombreoper_71E, $_Novedad_71E;

$(document).ready(function () {
    nombreOpcion('9,7,1,E -Actualiza equivalencias de codigo de operador con DATALAB');
    _inputControl('reset');
    _inputControl('disabled');

    _toggleF8([
        { input: 'operadorda', app: '71E', funct: _ventanadatalab_71E },
        { input: 'operadorpros', app: '71E', funct: _ventanaoperador_71E },

    ]);

    CON850(_evaluarCON850_71E);

});

function _ventanadatalab_71E(e) {
    var $_DATALAB71E = [];
    let URL = get_url("APP/" + "SALUD/SER11V" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_DATALAB71E = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA EQUIVALENCIAS OPERADORES",
                    columnas: ["DATALAB", "OPERADOR"],
                    data: $_DATALAB71E.EQUIOPERADOR,
                    callback_esc: function () {
                        $("#operadorda_71E").focus();
                    },
                    callback: function (data) {
                        document.getElementById('operadorda_71E').value = data.DATALAB.trim();

                        _enterInput('#operadorda_71E');
                    }
                });
            }
        })
        .catch((error) => {
            console.log('error', error)
        });
}




function _ventanaoperador_71E(e) {
    var $_OPERADOR71E = [];
    let URL = get_url("APP/" + "CONTAB/CON982" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_OPERADOR71E = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "GRUPOS DE OPERADORES",
                    columnas: ["CODIGO", "DESCRIPCION", "ID"],
                    data: $_OPERADOR71E.ARCHREST,
                    callback_esc: function () {
                        $("#operadorpros_71E").focus();
                    },
                    callback: function (data) {
                        document.getElementById('operadorpros_71E').value = data.CODIGO.trim();

                        _enterInput('#operadorpros_71E');
                    }
                });
            }
        })
        .catch((error) => {
            console.log('error', error)
        });
}


// NOVEDAD //
function _evaluarCON850_71E(novedad) {
    $_Novedad_71E = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _evaluarleercodigo_71E();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novedad_71E').val(novedad.id + ' - ' + novedad.descripcion)
}

function _evaluarleercodigo_71E() {
    validarInputs({
        form: '#OPERADORDAT_71E',
        orden: '1'
    },
        function () {
            CON850(_evaluarCON850_71E);
        },
        _validarleercodigo_71E
    )
}

function _validarleercodigo_71E() {
    $operadordat_71E = $('#operadorda_71E').val();
    if ($operadordat_71E.trim() == '') {
        _evaluarleercodigo_71E();
    } else {
        LLAMADO_DLL({
            dato: [$operadordat_71E],
            callback: _datacodigo_SAL71E,
            nombredll: 'SER11E-02',
            carpeta: 'SALUD'
        });
    }

}
function _datacodigo_SAL71E(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $operadorprosf_71E = date[1];
    $idoperador_71E = date[2];
    $nombreoper_71E = date[3];

    if (($_Novedad_71E == '7') && (swinvalid == '01')) {
        datooperador_713();

    } else if (($_Novedad_71E == '7') && (swinvalid == '00')) {

        CON851('00', '00', null, 'error', 'Error');
        _evaluarleercodigo_71E();
    } else if (($_Novedad_71E == '8') && (swinvalid == '00')) {

        _llenardatosDATALAB_71E();
    } else if (($_Novedad_71E == '8') && (swinvalid == '01')) {

        CON851('01', '01', null, 'error', 'Error');
        _evaluarleercodigo_71E();
    } else if (($_Novedad_71E == '9') && (swinvalid == '00')) {

        _llenardatosDATALAB_71E();
    } else if (($_Novedad_71E == '9') && (swinvalid == '01')) {

        CON851('01', '01', null, 'error', 'Error');
        _evaluarleercodigo_71E();
    }
}
function datooperador_713() {
    validarInputs({
        form: '#OPERADORPROS_71E',
        orden: '1'
    },
        function () {
            _evaluarleercodigo_71E();
        },
        _validaroperador_71E
    )
}

function _validaroperador_71E() {
    $operadorprosf_71E = $('#operadorpros_71E').val();
    if ($operadorprosf_71E.trim() == '') {
        CON851('02', '02', null, 'error', 'Error');
        datooperador_713()
    } else {
        let datos_envio = datosEnvio()
        datos_envio += $operadorprosf_71E
        let URL = get_url("app/CONTAB/CON003.DLL");

        postData({
            datosh: datos_envio
        }, URL)
            .then((data) => {
                // loader("hide")
                _dataCON003_SAL71E(data); 
            })
            .catch(error => {
                console.error(error)
                _toggleNav()
            });
    }
}
function _dataCON003_SAL71E(data) {
    var date = data.split("|");
    $nombreoper_71E = date[0].substr(0, 29);
    $idoperador_71E = date[1].trim();
    if ($idoperador_71E == 0) {
        $("#falta_71E").val('OPERADOR SIN ID.');
        datooperador_713();
    } else {
        LLAMADO_DLL({
            dato: [$operadordat_71E, $idoperador_71E],
            callback: _dataconsulta3_sal71E,
            nombredll: 'SER11E-03',
            carpeta: 'SALUD'
        })

    }
}
function _dataconsulta3_sal71E(data) {
    var date = data.split("|");
    var swinvalid = date[0].trim()
    if (swinvalid == '00') {
        $('#nomoper_71E').val($nombreoper_71E);
        $('#id_71E').val($idoperador_71E);
        _grabardatos_SAL71E();
    } else if (swinvalid == '05') {
        CON851('05', '05', null, 'error', 'Error');
        datooperador_713();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _grabardatos_SAL71E() {
    LLAMADO_DLL({
        dato: [$_Novedad_71E, $operadordat_71E, $operadorprosf_71E, $idoperador_71E],
        callback: _datograbar_71E,
        nombredll: 'SER11E-01',
        carpeta: 'SALUD'
    })

}

///////////////////// MOSTRAR 8 Y 9 //////////////////////
function _llenardatosDATALAB_71E() {
    $('#operadorpros_71E').val($operadorprosf_71E);

    let datos_envio = datosEnvio()
    datos_envio += $operadorprosf_71E
    let URL = get_url("app/CONTAB/CON003.DLL");

    postData({
        datosh: datos_envio
    }, URL)
        .then((data) => {
            // loader("hide")
            _dataCON003_SAL71E2(data);
        })
        .catch(error => {
            console.error(error)
            _toggleNav()
        });

}
function _dataCON003_SAL71E2(data) {
    var date = data.split("|");
    $nombreoper_71E = date[0].substr(0, 29);
    $idoperador_71E = date[1].trim();
    $('#id_71E').val($idoperador_71E);
    $('#nomoper_71E').val($nombreoper_71E);
    switch (parseInt($_Novedad_71E)) {
        case 8:
            datooperador_713();
            break;
        case 9:
            CON851P('54', _evaluarleercodigo_71E, _envDatos_71E)
            break;
    }
}

function _envDatos_71E() {
    LLAMADO_DLL({
        dato: [$_Novedad_71E, $operadordat_71E, $operadorprosf_71E, $idoperador_71E],
        callback: _datograbar_71E,
        nombredll: 'SER11E-01',
        carpeta: 'SALUD'
    })
}
////// GRABAR OPCION///////////////////////
function _datograbar_71E(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if ($_Novedad_71E == '9') {
            toastr.success('Se ha retirado', 'OPERADOR DATALAB');
            _inputControl('reset');
            _inputControl('disabled');
            CON850(_evaluarCON850_71E);

        } else {
            toastr.success('Se ha guardado', 'OPERADOR DATALAB');
            _inputControl('reset');
            _inputControl('disabled');
            CON850(_evaluarCON850_71E);
        }
    } else if (swinvalid == "01") {
        CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'error');

    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }

}