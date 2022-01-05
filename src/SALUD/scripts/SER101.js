/* NOMBRE RM --> SER101 // NOMBRE ELECTR --> SAL711 */

var $_NovedSer711, arraygrpser, arraycontab;

var ingrterc711_Mask = new IMask(document.getElementById('ingr_terc711'),
    { mask: Number, min: 0, max: 99, scale: 1, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);

$(document).ready(function () {
    nombreOpcion('9,7,1,1 - Actualizacion de grupos de servicios ');
    _inputControl('reset');
    _inputControl('disabled');
    _toggleF8([
        { input: 'codigo', app: '711', funct: _ventanaGrupo },
        { input: 'contab', app: '711', funct: _ventanaContab }

    ]);
    obtenerDatosCompletos({
        nombreFd: 'GRUPO-SER'
    }, function (data) {
        arraygrpser = data.CODIGOS;
        arraygrpser.pop()
        CON850(_evaluarCON850);
        obtenerDatosCompletos({
            nombreFd: 'CTA-MAYOR'
        }, function (data) {
            arraycontab = data.MAESTROS;
            arraycontab.pop()
        }, 'OFF')
    }, 'ON')
});

// NOVEDAD //
function _evaluarCON850(novedad) {
    _inputControl('reset');
    $_NovedSer711 = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarConsulta711();
            break;
        default:
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
            break;
    }
    $('#novSer711').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarConsulta711() {
    validarInputs({
        form: "#consulta",
        orden: '1'
    },
        ()=> {CON850(_evaluarCON850);},
        ()=> {
            codigo_711 = $('#codigo_711').val(); 
            if(codigo_711.trim() == '') {CON851('02', '02', null, 'error', 'error');
            _validarConsulta711()
            }else{
                busquedaArray = buscarDescrip_711(codigo_711)
                $CODG711 = codigo_711
                switch (codigo_711) {
                    case codigo_711.trim().length == 0:
                    case "PO":
                    case "NP":
                    case "MQ":
                        CON851('14', '14', null, 'error', 'error');
                        _validarConsulta711()
                        break;
                    default:
                        switch (parseInt($_NovedSer711)) {
                            case 7:
                                if (!busquedaArray) {
                                    detalle711()
                                } else {
                                    CON851('00', '00', null, 'error', 'error');
                                    _validarConsulta711()
                                }
                                break;
                            case 8:
                            case 9:
                                if (!busquedaArray) {
                                    CON851('01', '01', null, 'error', 'error');
                                    _validarConsulta711()
                                } else {
                                    _llenarDatSer711(busquedaArray)
                                }
                                break;
                        }
                        break;
                }
            }
            
        }
    )
}

/// NOVEDAD 7 ////
function detalle711() {
    console.log('detalle')
    validarInputs({
        form: '#detalle',
        orden: '1'
    },
        _validarConsulta711,
        ()=> {
            descp711 = espaciosDer($('#descrip711').val(), 25);
            if(descp711.trim() == ''){
                CON851('02', '02', null, 'error', 'error');
                detalle711()
            }else{
                validarPorcen_711('1')
            }
        }
    )
}

function validarPorcen_711(orden) {
    console.log('validar porcent', orden)
    validarInputs({
        form: '#porcentajes',
        orden: orden
    },
        detalle711,
        ()=> {
            otro = $('#ingre_clin711').val()
            tercero = ingrterc711_Mask.unmaskedValue;
            // if (parseFloat(tercero).length > 0) {
            //     if (tercero + otro < 100) {
            //         if ($('#contab_711').val().trim().length == 0) {
            //             $('#contab_711').val('2815')
            //         }
            //     }
            //     conContab_711()
            // } else if (parseFloat(tercero) == '') {
            //     conContab_711()
            // } else {
                conContab_711()
            // }
        }
    )
}

function conContab_711() {
    console.log('contab')
    validarInputs({
        form: '#contables',
        orden: '1'
    },
        ()=> {
            validarPorcen_711('2');
        },
        ()=> {
            valor = $('#contab_711').val()
            busqueda = buscarCodContb(valor)
            switch (busqueda) {
                case false:
                    CON851('01', '01', null, 'error', 'error');
                    conContab_711()
                    break;
                default:
                    envioDat711()
                    break;
            }
        }
    )
}


function envioDat711() {
    ingre711 = cerosIzq($('#ingre_clin711').val(), 3);
    contab_711 = cerosIzq($('#contab_711').val(), 11);
    var URL = get_url("APP/SALUD/SER101-01.DLL");
    var data = $_NovedSer711 + "|" + $CODG711 + "|" + descp711 + "|" + ingre711 + "|" + tercero + "|" + contab_711;
    postData({
        datosh: datosEnvio() + data
    }, URL)
        .then(() => {
            //TOAST CORRECTO
            var msj
            switch ($_NovedSer711) {
                case '7':
                    msj = 'Creado correctamente'
                    break;
                case '8':
                    msj = 'Modificado correctamente'
                    break;
            }
            jAlert({
                titulo: 'Notificacion',
                mensaje: msj
            },
                function () {
                    _inputControl('reset');
                    let Window = BrowserWindow.getAllWindows();
                    if (Window.length > 1) {
                        _cerrarSegundaVentana();
                    } else {
                        _toggleNav()
                    };
                });
        })
        .catch((error) => {
            console.log(error)
        });
}

function _llenarDatSer711(data) {
    $('#codigo_711').val(data.COD.trim());
    $('#descrip711').val(data.DESCRIP.trim());
    $('#ingre_clin711').val(data.INGR_CLIN.trim());

    tercero = data.INGR_TERC.trim();
    ingrterc711_Mask.typedValue = tercero;

    codigoCont = data.COD_CONTAB.trim()
    if (codigoCont.length > 0) {
        $('#contab_711').val(codigoCont);
        var descripCont = buscarCodContb(codigoCont)
        $('#descripContab_711').val(descripCont.NOMBRE_MAE)
    }
    switch (parseInt($_NovedSer711)) {
        case 8:
            detalle711()
            break;
        case 9:
            CON851P('54', _validarConsulta711, eliminar711)
            break;
    }
}

function eliminar711() {
    var URL = get_url("APP/SALUD/SER101-01.DLL");
    var data = $_NovedSer711 + "|" + $CODG711;
    postData({
        datosh: datosEnvio() + data
    }, URL)
        .then(() => {
            //TOAST CORRECTO
            var msj
            switch ($_NovedSer711) {
                case '9':
                    msj = 'Eliminado correctamente'
                    break;
            }
            jAlert({
                titulo: 'Notificacion',
                mensaje: msj
            },
                function () {
                    let Window = BrowserWindow.getAllWindows();
                    if (Window.length > 1) {
                        _cerrarSegundaVentana();
                    } else {
                        _toggleNav()
                    };
                    console.log('fin del programa')
                });
        })
        .catch((error) => {
            console.log(error)
        });
}


// FUNCIONES PARA DATOS NUEVOS
function buscarDescrip_711(data) {
    var retornar = false;
    for (var i in arraygrpser) {
        if (arraygrpser[i].COD.trim() == data) {
            retornar = arraygrpser[i];
            break;
        }
    }
    return retornar;
}

function buscarCodContb(data) {
    var retornar = false;
    for (var i in arraycontab) {
        var $CUENTA = arraycontab[i].CTA_MAY
        $CUENTA += arraycontab[i].SUB_CTA
        $CUENTA += arraycontab[i].AUX_MAE
        if ($CUENTA == data) {
            retornar = arraycontab[i];
            break;
        } else {
            // conContab_711(); 
        }
    }
    return retornar;
}


// F8 GRUPO-SERVICIO //
function _ventanaGrupo(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "GRUPOS DE SERVICIO",
            columnas: ["COD", "DESCRIP"],
            data: arraygrpser,
            callback_esc: function () {
                $("#codigo_711").focus();
            },
            callback: function (data) {
                $('#codigo_711').val(data.COD.trim())
                $('#descrip711').val(data.DESCRIP.trim())
                _enterInput('#codigo_711');
            }
        });
    }
}

// // F8 CUENTA-MAYOR //
function _ventanaContab(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA PLAN DE CUENTAS",
            columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "NOMBRE_MAE", "TIPO_MAE"],
            data: arraycontab,
            callback_esc: function () {
                $("#contab_711").focus();
            },
            callback: function (data) {
                $('#contab_711').val(data.CTA_MAY.trim() + data.SUB_CTA.trim() + data.AUX_MAE.trim())
                $('#descripContab_711').val(data.NOMBRE_MAE.trim())
                _enterInput('#contab_711');
            }
        });
    }
}