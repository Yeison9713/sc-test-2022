// 22/05/2020 DIANA E: CREADO 
var SER611 = [];

$(document).ready(function () {
    nombreOpcion('9,7,6,8-1 - Refacturando los comprobantes de prestación de servicios');
    _inputControl('reset');
    _inputControl('disabled');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_DIALNK = $_FECHA_LNK.substring(4, 6);
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_ANOLNK = parseInt($_ANOLNK) + 2000;
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    $_DIRECTORIOUSU = $_USUA_GLOBAL[0].DIRECC_USU.trim();

    SER611.NOMORIG = '';
    _toggleF8([
        { input: 'numeroorig', app: '611', funct: _ventanaFacturacion_ser611 },
        { input: 'costo', app: '611', funct: _ventanaCostos_ser611 },
        { input: 'pacienteorig', app: '611', funct: _ventanaPacientes_ser611 },
        { input: 'tipocompr', app: '611', funct: _ventanaclaseservicio_ser611 },
        { input: 'epsdest', app: '611', funct: _ventanaeps_ser611 },
    ]);
    if ($_USUA_GLOBAL[0].NIT == '0800156469') {
        SER611.SERVICIOS = [
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
        SER611.SERVICIOS = [
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
        nombreFd: 'COSTOS'
    }, function (data) {
        console.log(data, 'COSTO')
        $_COSTOS_611 = data.COSTO;
        $_COSTOS_611.pop();
        obtenerDatosCompletos({
            nombreFd: 'ENTIDADES'
        }, function (data) {
            console.log(data, 'ENTIDADES')
            $_ENTIDADES_611 = data.ENTIDADES;
            $_ENTIDADES_611.pop();
            _evaluararchivoorig_SER611();
        })
    })
})

//////////////////////////INICIAOPCION//////////////////////////////
function _evaluararchivoorig_SER611() {
    if (SER611.NOMORIG.trim() == '') {
        SER611.NOMORIG = '\\' + $_DIRECTORIOUSU + '\\control\\SC-FACSA.DAT';
        $('#archivoorig_611').val(SER611.NOMORIG);
    }
    validarInputs(
        {
            form: "#ARCHIVOORIG_SER611",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER611.NOMORIG = $('#archivoorig_611').val();
            _validarOrigen()
        }
    )
}

function _validarOrigen() {
    let datos = {
        datosh: datosEnvio(),
        paso: "1",
        origen: SER611.NOMORIG
    }

    postData(datos, get_url("app/SALUD/SER611.DLL"))
        .then((data) => {
            _evaluarprefijo_SER611();
        }).catch(error => {
            _evaluararchivoorig_SER611();
        });


}

function _evaluarprefijo_SER611() {
    validarInputs(
        {
            form: "#PREFIJOORIG_SER611",
            orden: '1'
        },
        () => { _evaluararchivoorig_SER611(); },
        () => {
            SER611.PREFIJOORI = $('#prefijoorig_611').val();

            if (SER611.PREFIJOORI != 'C' && SER611.PREFIJOORI != 'E' && SER611.PREFIJOORI != 'Ñ' && SER611.PREFIJOORI != 'U') {
                _evaluarnumeroori_SER611();
            } else {
                _aceptarprefijo_SER611()
            }
        }
    )
}

function _evaluarnumeroori_SER611() {
    validarInputs(
        {
            form: "#NUMEROORIG_SER611",
            orden: '1'
        },
        () => { _evaluarprefijo_SER611(); },
        () => {
            SER611.NUMEROORI = $('#numeroorig_611').val();
            SER611.NUMEROORI = SER611.NUMEROORI.padStart(6, "0");
            $('#numeroorig_611').val(SER611.NUMEROORI);
            if ((SER611.NUMEROORI == '000000') || (SER611.NUMEROORI.trim() == '')) {
                _evaluarnumeroori_SER611();
            } else {
                SER611.LLAVEORIG = SER611.PREFIJOORI + SER611.NUMEROORI;
                let URL = get_url("app/SALUD/SER835N1.DLL");
                postData({
                    datosh: datosEnvio() + SER611.LLAVEORIG + '|'
                }, URL)
                    .then((data) => {
                        data = data.split('|');
                        SER611.LLAVEFINAL = data[0].trim();
                        SER611.NUMEROFINAL = SER611.LLAVEFINAL.substring(1, 6)
                        if (SER611.LLAVEFINAL > 0) {
                            SER611.LLAVEORIG = MSER611.LLAVEFINAL;
                        }
                        _consultanumer_SER611();
                    }).catch(error => {
                        console.error(error)
                        _evaluarnumeroori_SER611();
                    });
            }
        }
    )
}
function _consultanumer_SER611() {
    let datos_envio = datosEnvio() + SER611.LLAVEORIG + '|';
    SolicitarDll({ datosh: datos_envio }, dato => {
        var date = dato.split("|");
        var SWINVALID = date[0];
        SER611.NITNUM = date[2].trim();
        SER611.DESCRIPNUM = date[3].trim();
        SER611.CONVENIONUM = date[4].trim();
        SER611.DESCRIPTAR = date[5].trim();
        SER611.IDPACNUM = date[10].trim();
        SER611.DESCRIPPACINUM = date[11].trim();

        if (SWINVALID == '00') {
            $('#descriporig_611').val(SER611.DESCRIPNUM);
            _validarNota()
        } else if (SWINVALID == '01') {
            CON851('01', '01', null, 'error', 'error');
            _evaluarnumeroori_SER611();
        }
    }, get_url('APP/SALUD/SER108-01.DLL'));
}

function _validarNota() {
    let datos = {
        datosh: datosEnvio(),
        paso: "2",
        origen: SER611.NOMORIG,
        numeracion: SER611.LLAVEORIG
    }

    postData(datos, get_url("app/SALUD/SER611.DLL"))
        .then((data) => {
            SER611.SWNOTA = data
            SER611.COSTOW = '';
            if (($_NITUSU == 900418443) || ($_NITUSU == 892000401)) {
                _evaluarcosto_SER611();
            } else {
                if (SER611.SWNOTA == 0) {
                    CON851('96', '96', null, 'error', 'error');
                    _evaluarnumeroori_SER611();
                } else {
                    _evaluarcosto_SER611();
                }
            }
        }).catch(error => {
            console.error(error)
            _evaluarnumeroori_SER611();
        });
}


function _evaluarcosto_SER611() {
    if (SER611.COSTOW.trim() == '') {
        SER611.COSTOW = '****'
        $('#costo_611').val(SER611.COSTOW);
    }
    validarInputs(
        {
            form: "#COSTO_SER611",
            orden: '1'
        },
        () => { _aceptarnumeroori_SER611(); },
        () => {
            SER611.COSTOW = $('#costo_611').val();
            SER611.PACIW = '';
            if (SER611.COSTOW == '****') {
                SER611.DESCRIPCOSTO = 'TODOS LOS C.COSTO';
                $('#descripcosto_611').val(SER611.DESCRIPCOSTO);
                _evaluarpaciente_SER611();
            } else {
                buscaquedacosto = buscarDescripcosto(SER611.COSTOW);
                switch (buscaquedacosto) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _evaluarcosto_SER611();
                        break;
                    default:
                        SER611.DESCRIPCOSTO = buscaquedacosto.NOMBRE.trim()
                        $('#descripcosto_611').val(SER611.DESCRIPCOSTO);
                        _evaluarpaciente_SER611();
                        break;
                }
            }
        }
    )
}

function buscarDescripcosto(data) {
    var retornar = false;
    for (var i in $_COSTOS_611) {
        if ($_COSTOS_611[i].COD.trim() == data) {
            retornar = $_COSTOS_611[i];
            break;
        }
    }
    return retornar;
}

function _evaluarpaciente_SER611() {
    if (SER611.PACIW.trim() == '') {
        SER611.PACIW = '000000000000099'
        $('#pacienteorig_611').val(SER611.PACIW);
    }
    validarInputs(
        {
            form: "#PACIORIG_SER611",
            orden: '1'
        },
        () => { _aceptarnumeroori_SER611(); },
        () => {
            SER611.PACIW = $('#pacienteorig_611').val();
            SER611.PACIW = SER611.PACIW.padStart(15, '0')
            $('#pacienteorig_611').val(SER611.PACIW);
            SER611.NOMDEST = '';
            if (SER611.PACIW == '000000000000099') {
                $('#descrippaci_611').val('TODOS LOS PACIENTES');
                _evaluarnombredestino_SER611();
            } else {
                let URL = get_url("app/SALUD/SER810-1.DLL");
                postData({
                    datosh: datosEnvio() + SER611.PACIW + '|'
                }, URL)
                    .then((data) => {
                        SER611.REGISTROPACI = data['REG-PACI'][0]
                        SER611.DESCRIPPACI = SER611.REGISTROPACI.DESCRIP
                        $('#descrippaci_611').val(SER611.DESCRIPPACI);
                        _evaluarnombredestino_SER611()
                    }).catch(error => {
                        console.error(error)
                        _evaluarpaciente_SER611();
                    });
            }
        }
    )
}

function _evaluarnombredestino_SER611() {
    if (SER611.NOMDEST.trim() == '') {
        SER611.NOMDEST = '\\' + $_DIRECTORIOUSU + '\\control\\SC-FACSA.DAT';
        $('#archivodest_611').val(SER611.NOMORIG);
    }
    validarInputs(
        {
            form: "#ARCHIVODEST_SER611",
            orden: '1'
        },
        () => { _evaluarpaciente_SER611() },
        () => {
            SER611.NOMDEST = $('#archivodest_611').val();
            SER611.PASOW = '1';
            _validarDestino();
        }
    )
}

function _validarDestino() {
    let datos = {
        datosh: datosEnvio(),
        paso: "1",
        origen: SER611.NOMDEST
    }

    postData(datos, get_url("app/SALUD/SER611.DLL"))
        .then((data) => {
            _evaluarprefijodest_SER611();
        }).catch(error => {
            console.error(error)
            _evaluararchivoorig_SER611();
        });
}

function _evaluarprefijodest_SER611() {
    validarInputs(
        {
            form: "#PREFIJODEST_SER611",
            orden: '1'
        },
        () => { _evaluararchivoorig_SER611(); },
        () => {
            SER611.PREFIJODEST = $('#prefijodest_611').val();
            if (SER611.PREFIJODEST != 'C' && SER611.PREFIJODEST != 'E' && SER611.PREFIJODEST != 'Ñ' && SER611.PREFIJODEST != 'U') {
                _evaluarnumerodest_SER611();
            } else {
                _evaluarprefijodest_SER611();
            }
        }
    )
}

function _evaluarnumerodest_SER611() {
    validarInputs(
        {
            form: "#NUMERODEST_SER611",
            orden: '1'
        },
        () => { _evaluararchivoorig_SER611(); },
        () => {
            SER611.NUMERODEST = $('#numerodest_611').val();
            SER611.NUMERODEST = SER611.NUMERODEST.padStart(6, "0");
            SER611.CLFACT = '';
            if ((SER611.NUMERODEST == '000000') || (SER611.NUMERODEST.trim() == '')) {
                CON851('', 'Dato invalido!', null, 'error', 'error');
                _evaluarnumerodest_SER611();
            } else {
                SER611.LLAVEDES = SER611.PREFIJODEST + SER611.NUMERODEST;
                let datos_envio = datosEnvio() + SER611.LLAVEDES + '|';
                SolicitarDll({ datosh: datos_envio }, dato => {
                    var date = dato.split("|");
                    var SWINVALID = date[0];
                    SER611.DESCRIPNUM2 = date[3].trim();
                    SER611.ESTADONUM2 = date[6].trim();
                    SER611.FECHAINGNUM2 = date[15].trim();
                    SER611.MESINGNUM2 = SER611.FECHAINGNUM2.substring(4, 6);
                    if (SWINVALID == '00') {
                        $('#descripdest_611').val(SER611.DESCRIPNUM2);
                        if (SER611.ESTADONUM2 != '0') {
                            CON851('70', '70', null, 'error', 'error');
                            _evaluarnumerodest_SER611()
                        } else if (SER611.MESINGNUM2 != $_MESLNK) {
                            CON851('37', '37', null, 'error', 'error');
                            _evaluarnumerodest_SER611()
                        } else {
                            _evaluartiposerv_SER611();
                        }
                    } else if (SWINVALID == '01') {
                        CON851('01', '01', null, 'error', 'error');
                        _evaluarnumerodest_SER611()
                    }
                }, get_url('APP/SALUD/SER108-01.DLL'));
            }
        }
    )
}

function _evaluartiposerv_SER611() {
    if (SER611.CLFACT.trim() == '') {
        $("#tipocompr_611").val('*');
    }
    validarInputs(
        {
            form: "#TIPOCOMP_SER611",
            orden: '1'
        },
        () => { _evaluarnumerodest_SER611(); },
        () => {
            SER611.CLFACT = $("#tipocompr_611").val();
            SER611.EPSW = '';
            if (SER611.CLFACT == '*') {
                $('#tipocompr_611').val(SER611.CLFACT + ' - ' + ' TODOS LOS TIPOS');
                // $('#descriptipocomp_169').val('TODOS LOS TIPOS');
                _evaluarentidad_SER611();
            } else if ((SER611.CLFACT > 0) && (SER611.CLFACT < 8)) {
                for (var i in SER611.SERVICIOS) {
                    if (SER611.CLFACT == SER611.SERVICIOS[i].COD) {
                        $('#tipocompr_611').val(SER611.SERVICIOS[i].COD + ' - ' + SER611.SERVICIOS[i].DESCRIPCION);
                        _evaluarentidad_SER611();
                    }
                    // else if (i == SER611.SERVICIOS.length - 1) {
                    //     if (SER611.CLFACT != SER611.SERVICIOS[i].COD) {
                    //         _evaluartiposerv_SER611()
                    //     }
                    // }
                }
            } else {
                CON851('03', '03', null, 'error', 'error');
                _evaluartiposerv_SER611();
            }
        }
    )
}

function _evaluarentidad_SER611() {
    if (SER611.EPSW.trim() == '') {
        SER611.EPSW = '******';
        $("#epsdest_611").val(SER611.EPSW);
    }
    validarInputs(
        {
            form: "#EPSDEST_SER611",
            orden: '1'
        },
        () => { _evaluartiposerv_SER611(); },
        () => {
            SER611.EPSDEST = $('#epsdest_611').val().padStart(6, ' ');
            SER611.APRVR = '';
            if (SER611.EPSDEST.trim() == '') {
                $('#descripepsdest_611').val('');
                _evaluarvlraprox_SER611();
            } else if (SER611.EPSDEST == '******') {
                $('#descripepsdest_611').val('TODAS LAS ENTIDADES');
                _evaluarvlraprox_SER611();
            } else {
                buscaquedaeps = buscarDescripeps(SER611.EPSDEST);
                switch (buscaquedaeps) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _evaluarentidad_SER611();
                        break;
                    default:
                        SER611.DESCRIPEPS = buscaquedaeps['NOMBRE-ENT'].trim()
                        $('#descripepsdest_611').val(SER611.DESCRIPEPS);
                        _evaluarvlraprox_SER611();
                        break;
                }
            }
        }
    )
}

function buscarDescripeps(data) {
    var retornar = false;
    for (var i in $_ENTIDADES_611) {
        if ($_ENTIDADES_611[i]['COD-ENT'].trim() == data) {
            retornar = $_ENTIDADES_611[i];
            break;
        }
    }
    return retornar;
}

function _evaluarvlraprox_SER611() {
    if (SER611.APRVR.trim() == '') {
        $('#vlrdest_611').val('N');
    }
    validarInputs(
        {
            form: "#APROVRDEST_SER611",
            orden: '1'
        },
        () => { _evaluarentidad_SER611(); },
        () => {
            SER611.APRVR = $('#vlrdest_611').val();
            if ((SER611.APRVR == 'S') || (SER611.APRVR == 'N')) {
                _evaluarrefacturando_SER611();
            } else {
                CON851('', 'Dato incorrecto!', null, 'error', 'error');
                _evaluarvlraprox_SER611()
            }
        }
    )
}

function _evaluarrefacturando_SER611() {
    validarInputs(
        {
            form: "#REFACT_SER611",
            orden: '1'
        },
        () => { _evaluarvlraprox_SER611(); },
        () => {
            SER611.CONFW = $('#refact_611').val();
            if ((SER611.CONFW == 'S') || (SER611.CONFW == 'N')) {
                CON851P('04', _evaluarrefacturando_SER611, _evaluarconfimar_SER611)
            } else {
                CON851('', 'Dato incorrecto!', null, 'error', 'error');
                _evaluarrefacturando_SER611()
            }
        }
    )
}

function _evaluarconfimar_SER611() {
    let datos = {
        datosh: datosEnvio(),
        paso: "3",
        oper: localStorage.Usuario,
        aproximar: SER611.APRVR,
        fecha: moment().format('YYYYMMDD'),

        origen: SER611.NOMDEST,
        llave_ori: SER611.LLAVEORIG,

        destino: SER611.NOMDEST,
        llave_des: SER611.LLAVEDES,

        tipo: SER611.CLFACT,
        costo: SER611.COSTOW,
        paciente: SER611.PACIW,
        eps: SER611.EPSDEST,

    }

    postData(datos, get_url("app/SALUD/SER611.DLL"))
        .then((data) => {
            _toggleNav();
            CON851('', 'Proceso Terminado!', null, 'success', 'EXITO');
        }).catch(error => {
            console.error(error)
            _evaluarrefacturando_SER611()
        });
}

//////////////VENTANAS DE F8//////////////////////

function _ventanaFacturacion_ser611(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'NUMERACION',
            valoresselect: ['Nombre del tercero', 'buscar paciente'],
            f8data: 'NUMERACION',
            columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
            callback: (data) => {
                $_NROW = data.COD;
                $_NROW = $_NROW.substring(1, 7)
                $('#numeroorig_611').val($_NROW);
                _enterInput('#numeroorig_611');
            },
            cancel: () => {
                _enterInput('#numeroorig_611');
            }
        };
        F8LITE(parametros);
    }
}

function _ventanaCostos_ser611(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
            columnas: ["COD", "NOMBRE"],
            data: $_COSTOS_611,
            callback_esc: function () {
                $("#costo_611").focus();
            },
            callback: function (data) {
                $('#costo_611').val(data.COD.trim())
                _enterInput('#costo_611');
            }
        });
    }
}

function _ventanaclaseservicio_ser611(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE SERVICIO",
            columnas: ["COD", "DESCRIPCION"],
            data: SER611.SERVICIOS,
            callback_esc: function () {
                $("#tipocompr_611").focus();
            },
            callback: function (data) {
                $("#tipocompr_611").val(data.COD);
                _enterInput('#tipocompr_611');
            }
        });
    }
}

function _ventanaeps_ser611(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE ENTIDADES',
            columnas: ["COD-ENT", "NOMBRE-ENT", "NIT-ENT"],
            // label: ["codigo", "nombre"],
            data: $_ENTIDADES_611,
            callback_esc: function () {
                $("#epsdest_611").focus();
            },
            callback: function (data) {
                document.getElementById('epsdest_611').value = data["COD-ENT"];
                _enterInput('#epsdest_611');
            }
        });
    }
}

// function _ventanaunidadserv_ser611(e) {
//     if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
//         _ventanaDatos({
//             titulo: "VENTANA DE UNIDADES DE SERVICIO",
//             columnas: ["COD", "DESCRIP"],
//             data: $_UNSERV_611,
//             callback_esc: function () {
//                 $("#unidadserv_611").focus();
//             },
//             callback: function (data) {
//                 $('#unidadserv_611').val(data.COD.trim())
//                 // $('#descrgrp_103').val(data.DESCRIP.trim())
//                 _enterInput('#unidadserv_611');
//             }
//         });
//     }
// }

function _ventanaPacientes_ser611(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {

        parametros = {
            dll: 'PACIENTES',
            valoresselect: ['Nombre del paciente'],
            f8data: 'PACIENTES',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }],
            callback: (data) => {
                document.querySelector("#pacienteorig_611").value = data.COD;
                // document.querySelector("#idpaciente_108").focus();
                _enterInput('#pacienteorig_611');
            },
            cancel: () => {
                _enterInput('#pacienteorig_611');
                // document.querySelector("#idpaciente_108").focus() 
            }
        };
        F8LITE(parametros);
    }
}

