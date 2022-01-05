// 23/05/2020 DIANA E: CREADO

var SER610 = [];


$(document).ready(function () {
    nombreOpcion('9,7,6,7 - Trasl. mov. de un cup a otro');
    _inputControl('reset');
    _inputControl('disabled');
    loader("show");
    $_FECHAACTUAL = moment().format('YYYYMMDD');
    SER610.ANOACTUAL = $_FECHAACTUAL.substring(0, 4)
    SER610.MESACTUAL = $_FECHAACTUAL.substring(4, 6)
    SER610.DIAACTUAL = $_FECHAACTUAL.substring(6, 8)
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_DIALNK = $_FECHA_LNK.substring(4, 6);
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    // $_ANOLNK = parseInt($_ANOLNK) + 2000; 
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    _toggleF8([
        { input: 'tipofact', app: '610', funct: _ventanaclaseservicio_SER610 },
        { input: 'origen', app: '610', funct: _ventanacupsorigen_SER610 },
        { input: 'destino', app: '610', funct: _ventanacupsdestino_SER610 }

    ]);
    if ($_USUA_GLOBAL[0].NIT == '0800156469') {
        SER610.SERVICIOS = [
            { COD: '0', DESCRIPCION: 'DROGUERIA' },
            { COD: '1', DESCRIPCION: 'CIRUGIAS' },
            { COD: '2', DESCRIPCION: 'ECOGRAFIAS' },
            { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
            { COD: '4', DESCRIPCION: 'DOPPLER' },
            { COD: '5', DESCRIPCION: 'T.A.C.' },
            { COD: '6', DESCRIPCION: 'RESONANCIA NUCLEAR' },
            { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
        ]
    } else {
        SER610.SERVICIOS = [
            { COD: '0', DESCRIPCION: 'DROGUERIA' },
            { COD: '1', DESCRIPCION: 'CIRUGIAS' },
            { COD: '2', DESCRIPCION: 'LAB. Y OTROS DIAG.' },
            { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
            { COD: '4', DESCRIPCION: 'OTROS SERVICIOS' },
            { COD: '5', DESCRIPCION: 'CONSULTAS Y TERAPIAS' },
            { COD: '6', DESCRIPCION: 'PATOLOGIA' },
            { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
        ]
    }
    obtenerDatosCompletos({
        nombreFd: 'CUPS'
    }, function (data) {
        $_CUPS_160 = data.CODIGOS;
        $_CUPS_160.pop();
        loader("hide");
        _aceptartipofact_SER610();
    })
});


////////////////INICIA OPCION////////////////////7
function _aceptartipofact_SER610() {
    // if (SER610.CLFACT.trim() == '') {
    //     $("#tipofact_610").val('*');
    // }
    validarInputs(
        {
            form: "#TIPOFACT_SER610",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER610.CLFACT = $("#tipofact_610").val();
            // if (SER610.CLFACT == '*') {
            //     $('#tipofact_610').val(SER610.CLFACT);
            //     $('#descriptipofact_610').val('TODOS LOS TIPOS');
            //     _datoanoini_SER610(); 
            // } else
            if ((SER610.CLFACT > 0) && (SER610.CLFACT < 8)) {
                SER610.SERVICIOS.forEach(data => {
                    if (SER610.CLFACT == data.COD) {
                        $('#tipofact_610').val(data.COD);
                        $('#descriptipofact_610').val(data.DESCRIPCION);
                        _datoanoini_SER610();
                    }
                });
            } else {
                CON851('14', '14', null, 'error', 'error');
                setTimeout(_aceptartipofact_SER610, 500)
                
            }
        }
    )
}

function _datoanoini_SER610() {
    $('#anoini_610').val(SER610.ANOACTUAL);

    validarInputs(
        {
            form: "#ANOINI_SER610",
            orden: '1'
        },
        () => { _aceptartipofact_SER610(); },
        () => {
            SER610.ANOINI = $('#anoini_610').val();
            if (SER610.ANOINI.trim() == '') {
                _datoanoini_SER610();
            } else {
                _datomesini_SER610();
            }
        }
    )
}

function _datomesini_SER610() {

    $('#mesini_610').val(SER610.MESACTUAL);
    validarInputs(
        {
            form: "#MESINI_SER610",
            orden: '1'
        },
        () => { _datoanoini_SER610(); },
        () => {
            SER610.MESINI = $('#mesini_610').val();
            if (SER610.MESINI.trim() == '') {
                _datomesini_SER610();
            } else if ((SER610.MESINI < 01) || (SER610.MESINI > 12)) {
                _datomesini_SER610();
            } else {
                _datodiaini_SER610();
            }
        }
    )
}

function _datodiaini_SER610() {
    $('#diaini_610').val(SER610.DIAACTUAL);
    validarInputs(
        {
            form: "#DIAINI_SER610",
            orden: '1'
        },
        () => { _datomesini_SER610(); },
        () => {
            SER610.DIAINI = $('#diaini_610').val();
            if (SER610.DIAINI.trim() == '') {
                _datodiaini_SER610();
            } else if ((SER610.DIAINI < 01) || (SER610.DIAINI > 31)) {
                _datodiaini_SER610();
            } else {
                SER610.FECHARINIW = SER610.ANOINI + SER610.MESINI + SER610.DIAINI;
                let URL = get_url("app/SALUD/SER610.DLL");
                postData({
                    datosh: datosEnvio() + SER610.FECHARINIW + '|'
                }, URL)
                    .then((data) => {
                        console.log(data, 'SER612A')
                        _datoanofin_SER610(); 
                    }).catch(error => {
                        console.error(error)
                        _datoanoini_SER610();
                    });
            }
        }
    )
}

function _datoanofin_SER610() {
    $('#anofin_610').val(SER610.ANOINI);
    validarInputs(
        {
            form: "#ANOFIN_SER610",
            orden: '1'
        },
        () => { _datodiaini_SER610(); },
        () => {
            SER610.ANOFIN = $('#anofin_610').val();
            if (SER610.ANOFIN.trim() == '') {
                _datoanofin_SER610();
            } else {
                _datomesfin_SER610();
            }
        }
    )
}

function _datomesfin_SER610() {
    $('#mesfin_610').val(SER610.MESINI);
    validarInputs(
        {
            form: "#MESFIN_SER610",
            orden: '1'
        },
        () => { _datoanofin_SER610(); },
        () => {
            SER610.MESFIN = $('#mesfin_610').val();
            if (SER610.MESFIN.trim() == '') {
                _datomesfin_SER610();
            } else if ((SER610.MESFIN < 01) || (SER610.MESFIN > 12)) {
                _datomesfin_SER610();
            } else {
                _datodiafin_SER610();
            }
        }
    )
}

function _datodiafin_SER610() {
    $('#diafin_610').val(SER610.DIAINI);
    validarInputs(
        {
            form: "#DIAFIN_SER610",
            orden: '1'
        },
        () => { _datomesfin_SER610(); },
        () => {
            SER610.DIAFIN = $('#diafin_610').val();
            SER610.FECHAFINW = SER610.ANOFIN + SER610.MESFIN + SER610.DIAFIN
            if (SER610.DIAFIN.trim() == '') {
                _datodiafin_SER610();
            } else if ((SER610.DIAFIN < 01) || (SER610.DIAFIN > 31)) {
                _datodiafin_SER610();
            } else {
                if (SER610.FECHARINIW > SER610.FECHAFINW) {
                    _datoanofin_SER610();
                } else {
                    _datoorigencup_SER610();
                }
            }
        }
    )
}

function _datoorigencup_SER610() {
    validarInputs(
        {
            form: "#ORIGEN_SER610",
            orden: '1'
        },
        () => { _datodiafin_SER610(); },
        () => {
            SER610.CUPSORIGEN = $('#origen_610').val();
            if (SER610.CUPSORIGEN.trim() == '') {
                CON851('02', '02', null, 'error', 'error');
                _datoorigencup_SER610();
            } else {
                buscaquedacups610 = buscarDescrip_cups160(SER610.CUPSORIGEN);
                switch (buscaquedacups610) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _datoorigencup_SER610();
                        break;
                    default:
                        SER610.DESCRIPCUP = buscaquedacups610.DESCRIP.trim()
                        $('#descripcupso_610').val(SER610.DESCRIPCUP);
                        _datodestinocup_SER610();
                        break;
                }
            }
        }
    )
}

function buscarDescrip_cups160(data) {
    var retornar = false;
    for (var i in $_CUPS_160) {
        if ($_CUPS_160[i].LLAVE.trim() == data) {
            retornar = $_CUPS_160[i];
            break;
        }
    }
    return retornar;
}

function _datodestinocup_SER610() {
    validarInputs(
        {
            form: "#DESTINO_SER610",
            orden: '1'
        },
        () => { _datodiafin_SER610(); },
        () => {
            SER610.CUPSDESTINO = $('#destino_610').val();
            if (SER610.CUPSDESTINO.trim() == '') {
                CON851('02', '02', null, 'error', 'error');
                _datoorigencup_SER610();
            } else if (SER610.CUPSDESTINO == SER610.CUPSORIGEN) {
                CON851('05', '05', null, 'error', 'error');
                _datoorigencup_SER610();
            } else {
                busquedacupsdest610 = buscarDescrip2_cups160(SER610.CUPSDESTINO);
                switch (busquedacupsdest610) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _datodestinocup_SER610();
                        break;
                    default:
                        SER610.DESCRIPCUP = busquedacupsdest610.DESCRIP.trim()
                        $('#descripcupss_610').val(SER610.DESCRIPCUP);
                        _grabaropcion_SER610();
                        break;
                }
            }
        }
    )
}
function buscarDescrip2_cups160(data) {
    var retornar = false;
    for (var i in $_CUPS_160) {
        if ($_CUPS_160[i].LLAVE.trim() == data) {
            retornar = $_CUPS_160[i];
            break;
        }
    }
    return retornar;
}

function _grabaropcion_SER610() {
    let URL = get_url("app/SALUD/SER610.DLL");
    postData({
        datosh: datosEnvio() + SER610.FECHARINIW + '|' + SER610.FECHAFINW + '|' + SER610.CLFACT + '|' + SER610.CUPSORIGEN + '|' + SER610.CUPSDESTINO + '|'
    }, URL)
        .then((data) => {
            _toggleNav();
            CON851('', 'Proceso Terminado!', null, 'success', 'EXITO');
        }).catch(error => {
            console.error(error)
            _datodestinocup_SER610();
        });
}

////////////////VENTANA DE F8////////////
function _ventanaclaseservicio_SER610(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE SERVICIO",
            columnas: ["COD", "DESCRIPCION"],
            data: SER610.SERVICIOS,
            callback_esc: function () {
                $("#tipofact_610").focus();
            },
            callback: function (data) {
                $("#tipofact_610").val(data.COD);
                _enterInput('#tipofact_610');
            }
        });
    }
}

function _ventanacupsorigen_SER610(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CODIGOS CUPS",
            columnas: ["LLAVE", "DESCRIP"],
            data: $_CUPS_160,
            callback_esc: function () {
                $("#origen_610").focus();
            },
            callback: function (data) {
                $_LLAVECUPS = data.LLAVE.trim()
                $('#origen_610').val($_LLAVECUPS)
                _enterInput('#origen_610');
            }
        });
    }
}

function _ventanacupsdestino_SER610(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CODIGOS CUPS",
            columnas: ["LLAVE", "DESCRIP"],
            data: $_CUPS_160,
            callback_esc: function () {
                $("#destino_610").focus();
            },
            callback: function (data) {
                $_LLAVECUPS = data.LLAVE.trim()
                $('#destino_610').val($_LLAVECUPS)
                _enterInput('#destino_610');
            }
        });
    }
}