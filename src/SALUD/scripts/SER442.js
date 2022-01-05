var SER442 = [];

var $_FECHAACTUAL = moment().format('YYYYMMDD HHmm');
$_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
$_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
$_DIAACTUAL = $_FECHAACTUAL.substring(6, 8);
$_HORAACTUAL = $_FECHAACTUAL.substring(9, 14);


$(document).ready(function () {
    $('.page-content-fixed-header').append('<ul class="page-breadcrumb">' +
        '<li>' +
        '<a href="#" id="nombreOpcion">9,7,7,4,2,1 - Genera archivos de Rips </a>' +
        '</li>' +
        '</ul>')
    _inputControl('reset');
    _inputControl('disabled');
    loader("show");
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    SER442.TABLARIPS = [];
    SER442.SOAT = '';
    SER442.MINI = '';
    SER442.PYP = '';
    SER442.AUTORFACT = '';
    SER442.SWCAPI = '';
    SER442.SWDIAG = '';
    SER442.SWCONCEN = '';
    SER442.SWCOPA = '';
    SER442.SW6408 = '';
    SER442.SUCW = '';
    SER442.SWFECHASER = '';
    SER442.SWQX = '';
    SER442.SWLOTE = '';
    SER442.SWPTMV = '';
    SER442.SWMSI = '';
    SER442.SWDECI = "";
    SER442.SWSEPARAR = "";
    SER442.PREFIJO = '';
    SER442.CODCOSTO = '';
    SER442.ACU51 = '';
    SER442.SWVLRDROG = '';
    SER442.SWABONO = '';
    SER442.CODPRESTNI = '';
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_DIALNK = $_FECHA_LNK.substring(4, 6);
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    $_NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
    $_PREFIJOUSU = $_USUA_GLOBAL[0].PREFIJ;
    $_CONTADOUSU = $_USUA_GLOBAL[0].CONTADO;
    $_PUCUSU = $_USUA_GLOBAL[0].PUC;
    $_CONTROLFORMUUSU = $_USUA_GLOBAL[0].CTRL_FORMU;
    $_NUIRUSU = $_USUA_GLOBAL[0].NUIR;
    $_CODCIUUSU = $_USUA_GLOBAL[0].COD_CIUD;
    $_ACTLTFARMAUSU = $_USUA_GLOBAL[0].LOTE_FARM;
    _toggleF8([
        { input: 'numero', app: 'SER442', funct: _ventananumeroenvios_SER442 },
        { input: 'entidad', app: 'SER442', funct: _ventanaterceros_SER442 },
        { input: 'factura', app: 'SER442', funct: _ventanaFacturacion_SER442 },
        { input: 'costo', app: 'SER442', funct: _ventanacosto_SER442 }
    ]);

    // obtenerDatosCompletos(
    //     {
    //         nombreFd: "ENVIOS",
    //     },
    //     function (data) {
    //         console.log(data, 'RIPS')
    //         $_ENVIOS_442 = data.ENVIOS;
    //         $_ENVIOS_442.pop();
    //         SER442.ENVIO1 = $_ENVIOS_442.filter(e => e.PER.trim() == 20 + $_ANOLNK + $_MESLNK);

    obtenerDatosCompletos({
        nombreFd: 'SUCURSALES'
    }, function (data) {
        $_SUCURSAL_442 = data.SUCURSAL;
        $_SUCURSAL_442.pop()
        loader("hide");
        _fechaempezar_SER442();
        obtenerDatosCompletos({
            nombreFd: 'COSTOS'
        }, function (data) {
            $_COSTO_442 = data.COSTO;
            $_COSTO_442.pop();
            obtenerDatosCompletos({
                nombreFd: 'SERV_HOSP'
            }, function (data) {
                $_SERVICIO_442 = data.SERVICIO;
                $_SERVICIO_442.pop();
                obtenerDatosCompletos({
                    nombreFd: 'SUCURSALES'
                }, function (data) {
                    $_SUCURSALES_442 = data.SUCURSAL;
                    $_SUCURSALES_442.pop();
                }
                )
            })
        })

    })
    // })
});



function _ventananumeroenvios_SER442(e) {
    let URL = get_url("APP/SALUD/SER846.DLL");
    postData({
        datosh: datosEnvio() + 20 + $_ANOLNK + $_MESLNK
    }, URL)
        .then((data) => {
            loader("hide");
            SER442.ENVIO1 = data.ENVIOS;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: 'VENTANA DE ENVIOS' + $_MESLNK + '/' + $_ANOLNK,
                    columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", "FECHA", "OBSERVACION"],
                    data: SER442.ENVIO1,
                    callback_esc: function () {
                        $("#numero_SER442").focus();
                    },
                    callback: function (data) {
                        SER442.NROW = data.NRO.trim();
                        $('#numero_SER442').val(SER442.NROW);
                        _enterInput('#numero_SER442');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
            $("#numero_SER442").focus();
            // _datonumero_SER442()
        });
}


function _ventanaterceros_SER442(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'TERCEROS',
            valoresselect: ['Buscar por nombre tercero'],
            f8data: 'TERCEROS',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
            callback: (data) => {
                $('#entidad_SER442').val(data.COD.trim());
                _enterInput('#entidad_SER442');
            },
            cancel: () => {
                _enterInput('#entidad_SER442');
            }
        };
        F8LITE(parametros);
    }
}

function _ventanaFacturacion_SER442(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'NUMERACION',
            valoresselect: ['Buscar por tercero', 'buscar por paciente'],
            f8data: 'NUMERACION',
            columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
            callback: (data) => {
                $_NROW = data.COD;
                $_NROW = $_NROW.substring(1, 7)
                $('#factura_SER442').val($_NROW);
                _enterInput('#factura_SER442');
            },
            cancel: () => {
                _enterInput('#factura_SER442');
            }
        };
        F8LITE(parametros);
    }
}

function _ventanacosto_SER442(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
            columnas: ["COD", "NOMBRE"],
            data: $_COSTO_442,
            callback_esc: function () {
                $("#costo_SER442").focus();
            },
            callback: function (data) {
                document.getElementById('costo_SER442').value = data.COD.trim()
                _enterInput('#costo_SER442');
            }
        });
    }
}

function _ventanasucursal_SER442(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE SUCURSALES",
            columnas: ["CODIGO", "DESCRIPCION", "ALMACEN"],
            data: $_SUCURSALES_442,
            callback_esc: function () {
                $("#sucursal_SER442").focus();
            },
            callback: function (data) {
                document.getElementById('sucursal_SER442').value = data.CODIGO.trim()
                _enterInput('#sucursal_SER442');
            }
        });
    }
}

// PROGRAMA DE CREACION DE ARCHIVOS PLANOS DE RIPS //
function _fechaempezar_SER442() {
    SER442.ANONUM = $_ANOLNK;
    // SER442.ANONUM = 20;
    if (parseInt(SER442.ANONUM) > 90) {
        SER442.ANOINIW = parseInt(SER442.ANONUM) + 1900;
    } else {
        SER442.ANOINIW = parseInt(SER442.ANONUM) + 2000;
    }
    SER442.MESNUM = $_MESLNK;
    SER442.MESINIW = SER442.MESNUM;
    SER442.DIAINIW = '01';
    SER442.FECHAINIW = SER442.ANOINIW + SER442.MESINIW + SER442.DIAINIW
    SER442.PERINIW = SER442.ANOINIW + SER442.MESINIW;
    switch (parseInt(SER442.MESINIW)) {
        case 01:
            $('#Envios_SER442').val('ENERO' + '/' + SER442.ANOINIW);
            _fechaactual_SER442();
            break;
        case 02:
            $('#Envios_SER442').val('FEBRERO' + '/' + SER442.ANOINIW);
            _fechaactual_SER442();
            break;
        case 03:
            $('#Envios_SER442').val('MARZO' + '/' + SER442.ANOINIW);
            _fechaactual_SER442();
            break;
        case 04:
            $('#Envios_SER442').val('ABRIL' + '/' + SER442.ANOINIW);
            _fechaactual_SER442();
            break;
        case 05:
            $('#Envios_SER442').val('MAYO' + '/' + SER442.ANOINIW);
            _fechaactual_SER442();
            break;
        case 06:
            $('#Envios_SER442').val('JUNIO' + '/' + SER442.ANOINIW);
            _fechaactual_SER442();
            break;
        case 07:
            $('#Envios_SER442').val('JULIO' + '/' + SER442.ANOINIW);
            _fechaactual_SER442();
            break;
        case 08:
            $('#Envios_SER442').val('AGOSTO' + '/' + SER442.ANOINIW);
            _fechaactual_SER442();
            break;
        case 09:
            $('#Envios_SER442').val('SEPTIEMBRE' + '/' + SER442.ANOINIW);
            _fechaactual_SER442();
            break;
        case 10:
            $('#Envios_SER442').val('OCTUBRE' + '/' + SER442.ANOINIW);
            _fechaactual_SER442();
            break;
        case 11:
            $('#Envios_SER442').val('NOVIEMBRE' + '/' + SER442.ANOINIW);
            _fechaactual_SER442();
            break;
        case 12:
            $('#Envios_SER442').val('DICIEMBE' + '/' + SER442.ANOINIW);
            _fechaactual_SER442();
            break;
        default:
            break;
    }
}

function _fechaactual_SER442() {
    SER442.ANOCTL = $_ANOACTUALW;
    if (parseInt($_DIAACTUAL >= 20)) {
        if (parseInt($_MESACTUALW) == 12) {
            SER442.ANOCTL = parseInt(SER442.ANOCTL) + 1;
            SER442.MESCTL = '01';
        } else {
            SER442.MESCTL = parseInt(SER442.MESCTL) + 1;
        }
        SER442.DIACTL = 10;
        _validacionabrirarch_SER442()
    } else {
        SER442.MESCTL = $_MESACTUALW;
        SER442.DIACTL = $_DIAACTUAL;
        _validacionabrirarch_SER442()
    }
}

function _validacionabrirarch_SER442() {
    SER442.FECHACTL = SER442.ANOCTL + SER442.MESCTL + SER442.DIACTL;
    SER442.NUIRW = $_NUIRUSU;
    if (isNaN(SER442.NUIRW)) {
        jAlert({ titulo: 'Error ', mensaje: 'Falta asignar el codigo del prestador actualice el campo de NUIR en datos del usuario opcion 1-3 menu de contabilidad' }, _toggleNav);
    } else {
        CON850(_evaluarCON850_SER442)
    }
}

function _evaluarCON850_SER442(novedad) {
    $('#TABLARIPS_SER442 tbody tr').remove();
    $('#numero_SER442').val('');
    $('#entidad_SER442').val('');
    $('#descripentid_SER442').val('');
    $('#ano_SER442').val('');
    $('#mes_SER442').val('');
    $('#dia_SER442').val('');
    $('#perido_SER442').val('');
    $('#oper_SER442').val('');
    $('#md_SER442').val('');
    $('#eps_SER442').val('');
    $('#descripeps_SER442').val('');
    SER442.NOVEDAD = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
            _asignarnumero_SER442();
            break;
        case 9:
            CON851('49', '49', null, 'error', 'error');
            setTimeout(function () { CON850(_evaluarCON850_SER442); }, 300)
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novedad_SER442').val(novedad.id + ' - ' + novedad.descripcion)
}

function _asignarnumero_SER442() {
    SER442.SECUNUM = "EN"
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + SER442.SECUNUM }, URL)
        .then(data => {
            var data = data.split("|");
            SER442.ULTFECHANUM = data[2].trim();
            SER442.NUMEROCTL = data[1].substring(3, 9);
            SER442.SWSTOP = '0';
            if (parseInt(SER442.NOVEDAD) == 7) {
                console.log('novedad 7')
                SER442.NROW = SER442.NUMEROCTL;
                $('#numero_SER442').val(SER442.NROW);
                _leernumero_SER442();
                // _datonumero_SER442();
            } else {
                SER442.NROW = parseInt(SER442.NUMEROCTL) - 1;
                $('#numero_SER442').val(SER442.NROW);
                _datonumero_SER442();
            }
        })
        .catch(err => {
            console.debug(err);
        })

}

function _datonumero_SER442() {
    validarInputs(
        {
            form: "#NUMERO_SER442",
            orden: '1'
        },
        function () { CON850(_evaluarCON850_SER442) },
        () => {
            SER442.NROW = $('#numero_SER442').val();
            _leernumero_SER442();
        }

    )
}

function _leernumero_SER442() {
    if (parseInt(SER442.NROW) == 0) {
        _datonumero_SER442();
    } else {
        SER442.NROW = cerosIzq(SER442.NROW, 6);
        console.log(SER442.NROW, 'NUMERO')
        // $('#numero_SER442').val(SER442.NROW);
        postData({
            datosh: datosEnvio() + SER442.NROW + '|' + parseInt(SER442.NOVEDAD) + '|' + '1|' + '|'
        }, get_url("APP/SALUD/SER442-01.DLL"))
            .then((data) => {
                console.log(data, 'ENVIOS')
                $_LLENARENVIOS = data['ENVIOS'];
                swinvalid = $_LLENARENVIOS[0].ESTADO;
                SER442.NITW = $_LLENARENVIOS[0].NIT;
                SER442.DESCRIPENTIDAD = $_LLENARENVIOS[0].DESCRIPTER;
                SER442.ENTIDADTERCERO = $_LLENARENVIOS[0].ENTIDAD;
                SER442.NOMBREENTIDAD = $_LLENARENVIOS[0].DESCRIPENT;
                SER442.PERW = $_LLENARENVIOS[0].PER_ENV;
                SER442.ANOPERW = SER442.PERW.substring(0, 4);
                SER442.MESPERW = SER442.PERW.substring(4, 6);
                SER442.FECHAENVW = $_LLENARENVIOS[0].FECHA_ENV;
                SER442.ANOENVW = SER442.FECHAENVW.substring(0, 4);
                SER442.MESENVW = SER442.FECHAENVW.substring(4, 6);
                SER442.DIAENVW = SER442.FECHAENVW.substring(6, 8);
                SER442.OBSERV = $_LLENARENVIOS[0].OBSERV;
                SER442.OPER = $_LLENARENVIOS[0].OPER;
                SER442.FECHACRE = $_LLENARENVIOS[0].FECHA_CRE;
                SER442.OPERMOD = $_LLENARENVIOS[0].OPER_MOD;
                SER442.FECHAMOD = $_LLENARENVIOS[0].FECHA_MOD;
                SER442.CANTCARP = $_LLENARENVIOS[0].CANT_CARP;
                SER442.CANTFOLIO = $_LLENARENVIOS[0].CANT_FOLIO;
                SER442.MINI = $_LLENARENVIOS[0].MINI;
                SER442.SOAT = $_LLENARENVIOS[0].SOAT;
                SER442.SEGRIPSNUM = $_LLENARENVIOS[0].SEG;
                SER442.TAB_FACT = $_LLENARENVIOS[0].TAB_REG_ENV;

                if ((parseInt(SER442.NOVEDAD) == 7) && (swinvalid == "01")) {
                    _registronuevo_SER442();

                } else if ((parseInt(SER442.NOVEDAD) == 7) && (swinvalid == "00")) {
                    CON851('00', '00', null, 'error', 'error');
                    setTimeout(function () { CON850(_evaluarCON850_SER442); }, 300)

                } else if ((parseInt(SER442.NOVEDAD) == 8) && (swinvalid == "00")) {
                    _llenardatos_SER442();

                } else if ((parseInt(SER442.NOVEDAD) == 8) && (swinvalid == "01")) {
                    CON851('01', '01', null, 'error', 'error');
                    setTimeout(function () { CON850(_evaluarCON850_SER442); }, 300)
                }
            })
            .catch((error) => {
                console.log(error);
                _datonumero_SER442();
            });
    }
}

function _registronuevo_SER442() {
    if (parseInt(SER442.NOVEDAD) == 7) {
        SER442.ANOENVW = SER442.ANOINIW;
        SER442.ANOPERW = SER442.ANOINIW;
        SER442.MESPERW = SER442.MESINIW;
        SER442.MESENVW = SER442.MESINIW;
        SER442.PERW = SER442.ANOPERW + SER442.MESPERW;
        $('#perido_SER442').val(SER442.PERW);
        _datonit_SER442();
    } else {
        _datonit_SER442();
    }

}

function _datonit_SER442() {
    validarInputs(
        {
            form: "#ENTIDADES_SER442",
            orden: '1'
        },
        () => { CON850(_evaluarCON850_SER442) },
        () => {
            SER442.NITW = $('#entidad_SER442').val();
            if (SER442.NITW.trim() == '' || SER442.NITW == 0) {
                _datonit_SER442()
            } else {
                let URL = get_url("APP/CONTAB/CON802_01.DLL");
                postData({
                    datosh: datosEnvio() + SER442.NITW.toString().padStart(10, "0") + "|",
                }, URL)
                    .then(data => {
                        SER442.TERCEROS = data.TERCER[0];
                        SER442.DESCRIPENTIDAD = SER442.TERCEROS.DESCRIP_TER.trim()
                        SER442.ACTTERCERO = SER442.TERCEROS.ACT_TER.trim()
                        SER442.ENTIDADTERCERO = SER442.TERCEROS.ENTIDAD.trim()
                        _asignarparticular_SER442();
                    }).catch(error => {
                        console.error(error)
                        _registronuevo_SER442();
                    });
            }
        }
    )

}

function buscarDescrip_entidadSER442(data) {
    var retornar = false;
    for (var i in $_TERCEROS_442) {
        if ($_TERCEROS_442[i].COD.trim() == data) {
            retornar = $_TERCEROS_442[i];
            break;
        }
    }
    return retornar;
}

function _asignarparticular_SER442() {
    if (($_NITUSU == '0800162035') && ((SER442.NITW == '9998') || (SER442.NITW == '9999'))) {
        SER442.SWPARTIC = '0';
    } else {
        if ((SER442.ACTTERCERO == '25') || (SER442.ACTTERCERO == '30') || (SER442.ACTTERCERO == '27')) {
            SER442.SWPARTIC = '1';
        } else {
            SER442.SWPARTIC = '0';
        }
    }
    _leerentidad_SER442();
}
function _leerentidad_SER442() {
    $('#eps_SER442').val(SER442.ENTIDADTERCERO);
    $('#descripentid_SER442').val(SER442.DESCRIPENTIDAD);
    if (SER442.ENTIDADTERCERO.trim() == '') {
        _datoanofecha_SER442();
    } else {
        LLAMADO_DLL({
            dato: [SER442.ENTIDADTERCERO],
            callback: _dataentidaddes_SER442,
            nombredll: 'SER110C_08',
            carpeta: 'SALUD'
        });
    }
}

function _dataentidaddes_SER442(data) {
    var date = data.split("|");
    var swinvalid = date[0].trim();
    SER442.NOMBREENTIDAD = date[1].trim();
    if (swinvalid == '00') {
        $('#descripeps_SER442').val(SER442.NOMBREENTIDAD);
        _datoanofecha_SER442();
    } else {
        jAlert({ titulo: 'Error ', mensaje: 'No existe el codigo de la entidad debe actualizar el campo de la entidad en el tercero del cliente opcion 1-3-1' }, _datonit_SER442);
    }
}

function _datoanofecha_SER442() {
    $('#ano_SER442').val(SER442.ANOENVW);
    validarInputs(
        {
            form: "#ANOFECHA_SER442",
            orden: '1'
        },
        function () { _datonit_SER442(); },
        () => {
            SER442.ANOENVW = $('#ano_SER442').val();
            if ((parseInt(SER442.ANOENVW)) < (parseInt(SER442.ANOINIW))) {
                CON851('37', '37', null, 'error', 'error');
                if ((($_ADMINW == 'GEBC') || ($_ADMINW == '0101')) && (parseInt(SER442.NOVEDAD) == 8)) {
                    _datomesfecha_SER442();
                } else {
                    _datoanofecha_SER442();
                }
            } else {
                _datomesfecha_SER442();
            }
        }
    )
}

function _datomesfecha_SER442() {
    console.log('fecha mes')
    $('#mes_SER442').val(SER442.MESENVW);
    validarInputs(
        {
            form: "#MESFECHA_SER442",
            orden: '1'
        },
        function () { _datoanofecha_SER442(); },
        () => {
            SER442.MESENVW = $('#mes_SER442').val();
            if (SER442.MESENVW.trim() == '') {
                _datomesfecha_SER442();
            } else {
                if (SER442.NOVEDAD == '7') {
                    switch (parseInt(SER442.MESENVW)) {
                        case 01:
                            SER442.DIAMAX = 31;
                            $('#dia_SER442').val(SER442.DIAMAX);
                            _datodiafecha_SER442();
                            break;
                        case 02:
                            if ((parseInt(SER442.ANOENVW) == 2012) || (parseInt(SER442.ANOENVW) == 2016) || (parseInt(SER442.ANOENVW) == 2020) || (parseInt(SER442.ANOENVW) == 2024) || (parseInt(SER442.ANOENVW) == 2028)) {
                                SER442.DIAMAX = 29;
                                $('#dia_SER442').val(SER442.DIAMAX);
                                _datodiafecha_SER442();
                            } else {
                                SER442.DIAMAX = 28;
                                $('#dia_SER442').val(SER442.DIAMAX);
                                _datodiafecha_SER442();
                            }
                            break;
                        case 03:
                            SER442.DIAMAX = 31;
                            $('#dia_SER442').val(SER442.DIAMAX);
                            _datodiafecha_SER442();
                            break;
                        case 04:
                            SER442.DIAMAX = 30;
                            $('#dia_SER442').val(SER442.DIAMAX);
                            _datodiafecha_SER442();
                            break;
                        case 05:
                            SER442.DIAMAX = 31;
                            $('#dia_SER442').val(SER442.DIAMAX);
                            _datodiafecha_SER442();
                            break;
                        case 06:
                            SER442.DIAMAX = 30;
                            $('#dia_SER442').val(SER442.DIAMAX);
                            _datodiafecha_SER442();
                            break;
                        case 07:
                            SER442.DIAMAX = 31;
                            $('#dia_SER442').val(SER442.DIAMAX);
                            _datodiafecha_SER442();
                            break;
                        case 08:
                            SER442.DIAMAX = 31;
                            $('#dia_SER442').val(SER442.DIAMAX);
                            _datodiafecha_SER442();
                            break;
                        case 09:
                            SER442.DIAMAX = 30;
                            $('#dia_SER442').val(SER442.DIAMAX);
                            _datodiafecha_SER442();
                            break;
                        case 10:
                            SER442.DIAMAX = 31;
                            $('#dia_SER442').val(SER442.DIAMAX);
                            _datodiafecha_SER442();
                            break;
                        case 11:
                            SER442.DIAMAX = 30;
                            $('#dia_SER442').val(SER442.DIAMAX);
                            _datodiafecha_SER442();
                            break;
                        case 12:
                            SER442.DIAMAX = 31;
                            $('#dia_SER442').val(SER442.DIAMAX);
                            _datodiafecha_SER442();
                            break;
                        default:
                            _datomesfecha_SER442();
                            $('#dia_SER442').val(SER442.DIAMAX);
                            break;
                    }
                } else {
                    _datodiafecha_SER442();
                }
            }
        }
    )
}

function _datodiafecha_SER442() {
    validarInputs(
        {
            form: "#DIAFECHA_SER442",
            orden: '1'
        },
        function () { _datomesfecha_SER442(); },
        () => {
            SER442.DIAENVW = $('#dia_SER442').val();
            SER442.FECHAENVW = SER442.ANOENVW + SER442.MESENVW + SER442.DIAENVW;
            if (parseInt(SER442.DIAENVW) == 0) {
                SER442.DIAENVW = SER442.DIAMAX;
                $('#dia_SER442').val(SER442.DIAENVW);
                _datocosto_SER442();
            } else if ((parseInt(SER442.DIAENVW) < 1) || (parseInt(SER442.DIAENVW) > parseInt(SER442.DIAMAX))) {
                _datodiafecha_SER442();
                // cambiar el menor por un mayor parseInt(SER442.FECHAENVW) > parseInt(SER442.FECHACTL)
            } else if ((parseInt(SER442.FECHAENVW) < parseInt(SER442.FECHAINIW)) || (parseInt(SER442.FECHAENVW) > parseInt(SER442.FECHACTL))) {
                CON851('37', '37', null, 'error', 'error');
                _datodiafecha_SER442()
            } else {
                _datocosto_SER442();
            }
        }
    )
}
function _datocosto_SER442() {
    console.log('dato costo')
    if (SER442.CODCOSTO.trim() == '') {
        SER442.CODCOSTO = '****';
        $('#costo_SER442').val(SER442.CODCOSTO);
    }
    validarInputs(
        {
            form: "#CCOSTO_SER442",
            orden: '1'
        },
        function () { _datodiafecha_SER442(); },
        () => {
            SER442.CODCOSTO = $('#costo_SER442').val();
            if (SER442.CODCOSTO == '****') {
                SER442.NOMBRECOSTO = 'TODOS';
                $('#descripcosto_SER442').val(SER442.NOMBRECOSTO);
                _validacionprefijo_SER442();
            } else if (SER442.CODCOSTO.trim() == '') {
                _datocosto_SER442();
            } else {
                busquedacosto = buscarNombre_costoSER442(SER442.CODCOSTO);
                switch (busquedacosto) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _datocosto_SER442();
                    default:
                        SER442.NOMBRECOSTO = busquedacosto.NOMBRE.trim()
                        $('#descripcosto_SER442').val(SER442.NOMBRECOSTO);
                        _validacionprefijo_SER442();
                        break;
                }
            }

        })
}
function buscarNombre_costoSER442(data) {
    var retornar = false;
    for (var i in $_COSTO_442) {
        if ($_COSTO_442[i].COD.trim() == data) {
            retornar = $_COSTO_442[i];
            break;
        }
    }
    return retornar;
}

function _validacionprefijo_SER442() {
    console.log('validacion prefijo', SER442.PREFIJO, SER442.SWSTOP)
    if (SER442.PREFIJO == '*' || SER442.PREFIJO.trim() == '') SER442.PREFIJO = "A";
    $('#prefijo_SER442').val(SER442.PREFIJO);
    if (SER442.SWSTOP == '1') {
        console.log('stop 1')
        CON851('7T', '7T', null, 'error', 'error');
        $_OPSEGU = 'IS74D';
        let datos_envio = datosEnvio()
        datos_envio += $_ADMINW + '|' + $_OPSEGU
        let URL = get_url("APP/CONTAB/CON904.DLL");
        postData({ datosh: datos_envio }, URL)
            .then(function (data) {
                _aceptarprefijo_SER442();
            })
            .catch(err => {
                console.debug(err);
                _ventanasoat_SER442();
            })
    } else {
        _aceptarprefijo_SER442();
    }
}

function _aceptarprefijo_SER442() {
    console.log('aceptar prefijo')
    let parametros = {
        estado: 'on',
        msg: [{
            mensaje: 'Oprima F3 para grabar envio'
        }, {
            mensaje: '<*> Para proceso total '
        }
        ]
    }
    _FloatText(parametros);
    validarInputs(
        {
            form: "#PREF_SER442",
            orden: '1',
            event_f3: _ventanasoat_SER442
        },
        function () { _datocosto_SER442(); },
        () => {
            SER442.PREFIJO = $('#prefijo_SER442').val();
            if ((SER442.PREFIJO == "A") || (SER442.PREFIJO == "B") || (SER442.PREFIJO == "D") || (SER442.PREFIJO == "F")
                || (SER442.PREFIJO == "G") || (SER442.PREFIJO == "H") || (SER442.PREFIJO == "I") || (SER442.PREFIJO == "J")
                || (SER442.PREFIJO == "K") || (SER442.PREFIJO == "L") || (SER442.PREFIJO == "M") || (SER442.PREFIJO == "N")
                || (SER442.PREFIJO == "O") || (SER442.PREFIJO == "P") || (SER442.PREFIJO == "Q") || (SER442.PREFIJO == "R")
                || (SER442.PREFIJO == "S") || (SER442.PREFIJO == "T") || (SER442.PREFIJO == "V") || (SER442.PREFIJO == "W")
                || (SER442.PREFIJO == "X") || (SER442.PREFIJO == "Y") || (SER442.PREFIJO == "Z") || (SER442.PREFIJO == "*")) {
                if ((SER442.PREFIJO == "*") && (SER442.SWPARTIC == '0')) {
                    _buscartodas_SER442();
                } else {
                    _aceptarnumero_SER442();
                }
            } else {
                _aceptarprefijo_SER442();
            }
        }
    )
}

function _aceptarnumero_SER442() {
    console.log('aceptar numeroo')
    _FloatText({ estado: 'off' })
    validarInputs(
        {
            form: "#FACTURAS_SER442",
            orden: '1'
        },
        () => { _aceptarprefijo_SER442(); },
        () => {
            SER442.NOFACTURA = $('#factura_SER442').val();
            if (SER442.PREFIJO == "*") {
                _buscartodas_SER442();
            } else {
                if (SER442.NOFACTURA.trim() == '') {
                    CON851('01', '01', null, 'error', 'error');
                    _aceptarnumero_SER442();
                } else {
                    SER442.NOFACTURA = SER442.NOFACTURA.padStart(6, "0");
                    $('#factura_SER442').val(SER442.NOFACTURA);
                    SER442.LLAVENUM = SER442.PREFIJO + SER442.NOFACTURA;
                    LLAMADO_DLL({
                        dato: [SER442.LLAVENUM],
                        callback: _dataconsultafactura_SER442,
                        nombredll: 'SER108-01',
                        carpeta: 'SALUD'
                    });
                }
            }
        })
}


function _dataconsultafactura_SER442(data) {
    var date = data.split("|");
    var swinvalid = date[0].trim();
    SER442.NITNUM = date[2].trim();
    SER442.NITNUM = SER442.NITNUM.replace(/^0+/, '');
    SER442.DESCRIPNUM = date[3].trim();
    SER442.FECHARETNUM = date[16].trim();
    SER442.ANORETNUM = SER442.FECHARETNUM.substring(0, 4),
        SER442.MESRETNUM = SER442.FECHARETNUM.substring(4, 6);
    SER442.DIARETNUM = SER442.FECHARETNUM.substring(6, 8);
    SER442.FACTCAPITNUM = date[24].trim();
    SER442.CCOSTONUM = date[26].trim();
    SER442.ENVIONUM = date[27].trim();
    if (swinvalid == '00') {
        if (SER442.CODCOSTO == '****') {
            // continue
            _novedadtabla_SER442();
        } else {
            if (SER442.CODCOSTO == SER442.CCOSTONUM) {
                // continue
                _novedadtabla_SER442();
            } else {
                CON851('61', '61', null, 'error', 'error');
                _aceptarnumero_SER442();
            }
        }
    } else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _aceptarnumero_SER442();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _novedadtabla_SER442() {
    validarInputs(
        {
            form: "#OK_SER442",
            orden: '1'
        },
        () => { _aceptarnumero_SER442(); },
        () => {
            SER442.NOVTAB = $('#ingreseok_SER442').val();
            if (SER442.NOVTAB == 'R') {
                $_OPSEGU = 'IS74D';
                let datos_envio = datosEnvio()
                datos_envio += $_ADMINW + '|' + $_OPSEGU
                let URL = get_url("APP/CONTAB/CON904.DLL");
                postData({ datosh: datos_envio }, URL)
                    .then(function (data) {
                        _otrasvalidaciones();
                    })
                    .catch(err => {
                        console.debug(err);
                        _novedadtabla_SER442();
                    })
            } else {
                _otrasvalidaciones();
            }
        })
}

function _otrasvalidaciones() {
    if (SER442.NOVTAB == 'R') {
        _borrartabla_SER442();
    } else if (SER442.NOVTAB.trim() == '') {
        if (SER442.NITNUM != SER442.NITW) {
            CON851('06', '06', null, 'error', 'error');
            if (SER442.NOVTAB != 'R') {
                _aceptarnumero_SER442();
            } else {
                _borrartabla_SER442();
            }
        } else if (SER442.FACTCAPITNUM == SER442.LLAVENUM) {
            if (SER442.NOVTAB == 'R') {
                _cuartavalidacion_SER442();
            } else {
                if ($_NITUSU == '0800162035') {
                    _cuartavalidacion_SER442();
                } else {
                    CON851('1W', '1W', null, 'error', 'error');
                    _aceptarnumero_SER442();
                }
            }
        } else {
            _cuartavalidacion_SER442();
        }
    } else {
        _novedadtabla_SER442();
    }
}

function _cuartavalidacion_SER442() {
    if ((SER442.ANORETNUM == SER442.ANOINIW) && (SER442.MESRETNUM == SER442.MESINIW)) {
        _quintavalidacion_SER442();
    } else {
        if (($_NITUSU == '0800162035') || ($_NITUSU == '0845000038')) {
            swinvalid = 0;
            _quintavalidacion_SER442();
        } else {
            CON851('37', '37', null, 'error', 'error');
            if (SER442.NOVTAB != 'R') {
                _aceptarnumero_SER442();
            }
        }
    }
}

function _quintavalidacion_SER442() {
    if ((parseInt(SER442.ENVIONUM) > 0) && (parseInt(SER442.ENVIONUM) != parseInt(SER442.NROW))) {
        CON851('9J', '9J', null, 'error', 'error');
        if ((SER442.NOVTAB == 'R') || ($_NITUSU == '0900047282')) {
            _adicionatabla_SER442();

        } else {
            _aceptarnumero_SER442();
        }
    } else {
        _adicionatabla_SER442();
        // _aceptarprefijo_SER442();
    }
}
////////////////TABLA-AGREGAR-QUITAR/////////////////////////
function _borrartabla_SER442() {
    SWITEM = '0';
    // SER442.LLAVENUM = SER442.PREFIJO + SER442.NOFACTURA; 
    let existeregistro_SER442 = validarexistenciafactura_SER442();
    if (!existeregistro_SER442) {
        CON851('08', '08', null, 'error', 'Error');
        _aceptarprefijo_SER442();
    } else {
        if ((parseInt(SER442.NOVEDAD) == 8) || (SER442.NOVTAB == 'R')) {
            $('#TABLARIPS_SER442 tbody tr').each((index, element) => {
                if (SER442.LLAVENUM.trim() == $(element).text().trim()) {
                    $(element).remove();
                }
            })
            _consultarborrartabla_SER442()
            _aceptarprefijo_SER442();
        }
    }
}

function _consultarborrartabla_SER442() {
    let URL = get_url("APP/SALUD/SER442-01.DLL");
    postData({
        datosh: datosEnvio() + SER442.NROW + '|' + parseInt(SER442.NOVEDAD) + '|' + '2|' + SER442.LLAVENUM + '|',
    }, URL)
        .then(data => {
           
        }).catch(error => {
            console.error(error)
        });
}


function _adicionatabla_SER442() {
    let existeregistro_SER442 = validarexistenciafactura_SER442();
    if (!existeregistro_SER442) {
        $('#TABLARIPS_SER442 tbody').append(
            '<tr>' +
            '<td>' + $('#prefijo_SER442').val() + '</td>' +
            '<td>' + $('#factura_SER442').val() + '</td>' +
            '</tr>'
        );
        _validaciontabla_ripsSER442();
    } else {
        var cambiar = $('#factura_SER442').val();
        cambiar = parseInt(cambiar) - 1;
        let fila = $('#TABLARIPS_SER442 tbody tr:eq(' + cambiar + ')');
        let html = '<td>' + $('#prefijo_SER442').val() +
            '</td><td>' + $('#factura_SER442').val() +
            '</td>';
        fila.html(html);
        _validaciontabla_ripsSER442();
    }
}

function _validaciontabla_ripsSER442(orden) {
    validarTabla(
        {
            tabla: '#TABLARIPS_SER442',
            orden: orden,
        },
        _rips,
        function () {
            _aceptarprefijo_SER442()
        },
        () => {
            _ventanasoat_SER442();
        }
    );
}
function _rips(datos) {
    $('#prefijo_SER442').val(datos.cells[0].textContent);
    $('#factura_SER442').val(datos.cells[1].textContent);

    if (parseInt(SER442.NOVEDAD) == 7) {
        $('#prefijo_SER442').val('');
        $('#factura_SER442').val('');
        _aceptarprefijo_SER442();
    } else {
        _aceptarprefijo_SER442();
    }
}

function validarexistenciafactura_SER442() {
    //Recorre las filas existentes de la tabla
    var found = false;
    $('#TABLARIPS_SER442 tbody tr').each((index, element) => {
        if (SER442.LLAVENUM.trim() == $(element).text().trim()) {
            found = true;
        }
    })
    return found;
}


/////////////NOVEDAD 8 Y 9/////////////////

function _llenardatos_SER442() {
    SER442.NITW = SER442.NITW.replace(/^0+/, '');
    $('#entidad_SER442').val(SER442.NITW);
    $('#descripentid_SER442').val(SER442.DESCRIPENTIDAD);
    $('#ano_SER442').val(SER442.ANOENVW);
    $('#mes_SER442').val(SER442.MESENVW);
    $('#dia_SER442').val(SER442.DIAENVW);
    $('#perido_SER442').val(SER442.PERW);
    $('#oper_SER442').val(SER442.OPER + SER442.FECHACRE);
    $('#md_SER442').val(SER442.OPERMOD + SER442.FECHAMOD);
    $('#eps_SER442').val(SER442.ENTIDADTERCERO);
    $('#descripeps_SER442').val(SER442.NOMBREENTIDAD);
    for (var i in SER442.TAB_FACT) {
        if (SER442.TAB_FACT[i].PREFIJO.trim().length > 0) {
            $('#TABLARIPS_SER442 tbody').append(
                '<tr>'
                + '<td>' + SER442.TAB_FACT[i].PREFIJO.trim() + '</td>'
                + '<td>' + SER442.TAB_FACT[i].NUMERO.trim() + '</td>'
                + "</tr>"
            )
        }
    }

    if (SER442.SEGRIPSNUM == 'S') SER442.SWSTOP = '1'
    if ((parseInt(SER442.MESPERW) == 0) || (parseInt(SER442.ANOPERW) == 2000)) {
        SER442.PERW = SER442.PERINIW;
        _datonumero_SER442();
    } else if (SER442.PERW != SER442.PERINIW) {
        CON851('37', '37', null, 'error', 'error');
        if ((($_ADMINW == 'GEBC') || ($_ADMINW == '0101')) && parseInt(SER442.NOVEDAD) == 8) {
            _datoanofecha_SER442();
        } else {
            _datonumero_SER442();
        }
    } else {
        _registronuevo_SER442();
    }
}

//////////VENTANA DE SOAT///////////
function _ventanasoat_SER442() {
    _FloatText({ estado: 'off' })
    var ventanasoat = bootbox.dialog({
        size: 'large',
        title: 'OPCION CODIGOS SOAT',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Desea reemplazar CUPS por SOAT?:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id="SOAT_SER442"> ' +
            '<input id="soat_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-5 col-sm-6 col-xs-6 control-label" for="name">' + "Usa nuir 10 digitos?:" + '</label> ' +
            '<div class="col-md-3 col-sm-6 col-xs-6" id="NUIR_SER442"> ' +
            '<input id="nuir_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id="CODNUIR_SER442"> ' +
            '<input id="codnuir_SER442" class="form-control input-md" data-orden="1" maxlength="1"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="salto-linea"></div>' +

            '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-3 col-sm-6 col-xs-6 control-label" for="name">' + "Observaciones:" + '</label> ' +
            '<div class="col-md-9 col-sm-6 col-xs-6" id="OBSERVACION_SER442"> ' +
            '<input id="observacion_SER442" class="form-control input-md" data-orden="1" maxlength="20"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="salto-linea"></div>' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Opcion PYP: 1.Solo PyP, 2.Exepto Pyp, 3.Todo" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id="PYP_SER442"> ' +
            '<input id="pyp_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="1,2,3"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Generar Droga codigo: 1.229, 2.ATC, 3.CUM" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id="DROGA_SER442"> ' +
            '<input id="droga_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="1,2,3"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Marcar todo Nro Autorizacion de factura?:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id="AUTORIZ_SER442"> ' +
            '<input id="autoriz_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Proximar el vlr droga:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id="VLRDRO_SER442"> ' +
            '<input id="vlrdroga_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="salto-linea"></div>' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "En la capita usar solo Nro maestra?:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id="MAESTRA_SER442"> ' +
            '<input id="maestra_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Incluir diagnosticos archivo AP?:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id="AP_SER442"> ' +
            '<input id="ap_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="salto-linea"></div>' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Incluir concentracion en todo archivo AM?:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id="AM_SER442"> ' +
            '<input id="am_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Incluir archivo PU copagos?:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id="PU_SER442"> ' +
            '<input id="pu_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="salto-linea"></div>' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Resol. 6408-2016 ATC 7 dig?:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id="RESOL_SER442"> ' +
            '<input id="resol_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<div class="inline-inputs">' +
            '<label class="col-md-2 col-sm-6 col-xs-6 control-label" for="name">' + "Sucursal:" + '</label> ' +
            '<div class="col-md-3 col-sm-6 col-xs-6" id="SUCURSAL_SER442"> ' +
            '<input id="sucursal_SER442" class="form-control input-md" data-orden="1" maxlength="2" > ' +
            '</div> ' +
            '<button type="button" id="sucursalBtn_SER442" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
            '<i class="icon-magnifier"></i>' +
            '</button>' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="descripsuc_SER442" class="form-control input-md"> ' +
            '</div> ' +
            '</div>' +
            '</div> ' +

            '<div class="salto-linea"></div>' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Cambiar X fecha de servicio:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id="SERVICIO_SER442"> ' +
            '<input id="servicio_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Discriminar Cirugias?:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id="CIRUGIA_SER442"> ' +
            '<input id="cirugia_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="salto-linea"></div>' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Unificar Lote farmaceutico:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id="LOTE_SER442"> ' +
            '<input id="lote_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Discriminar AP AT AM AC:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id= "PTMV_SER442"> ' +
            '<input id="ptmv_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="salto-linea"></div>' +


            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Unificar MSI:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id= "MSI_SER442"> ' +
            '<input id="msi_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Mostrar decimal:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id= "DECIMAL_SER442"> ' +
            '<input id="decimal_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="salto-linea"></div>' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Separar prefijo - Ejem P_100001:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id= "SEPARAR_SER442"> ' +
            '<input id="separar_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Incluir Abonos de Factura:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id="ABOFACT_SER442"> ' +
            '<input id="abofact_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +

            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanasoat.off('show.bs.modal');
                    _tablagrabar_SER442()
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanasoat.off('show.bs.modal');
                    _aceptarprefijo_SER442();
                }
            }
        }
    });
    ventanasoat.init($('.modal-footer').hide());
    ventanasoat.init(_Evaluarsoat_SER442());
    ventanasoat.on('shown.bs.modal', function () {
        $("#soat_SER442").focus();
    });
    ventanasoat.init(_toggleF8([{
        input: 'sucursal',
        app: 'SER442',
        funct: _ventanasucursal_SER442
    },]));
}

function _Evaluarsoat_SER442() {
    _inputControl("disabled");
    $('#soat_SER442').val(SER442.SOAT);
    $('#nuir_SER442').val(SER442.MINI);
    $('#observacion_SER442').val(SER442.OBSERV);
    $('#pyp_SER442').val(SER442.PYP);
    $('#droga_SER442').val(SER442.ACU51);
    $('#autoriz_SER442').val(SER442.AUTORFACT);
    $('#vlrdroga_SER442').val(SER442.SWVLRDROG);
    $('#maestra_SER442').val(SER442.SWCAPI);
    $('#ap_SER442').val(SER442.SWDIAG);
    $('#am_SER442').val(SER442.SWCONCEN);
    $('#pu_SER442').val(SER442.SWCOPA);
    $('#resol_SER442').val(SER442.SW6408);
    $('#sucursal_SER442').val(SER442.SUCW);
    $('#servicio_SER442').val(SER442.SWFECHASER);
    $('#cirugia_SER442').val(SER442.SWQX);
    $('#lote_SER442').val(SER442.SWLOTE);
    $('#ptmv_SER442').val(SER442.SWPTMV);
    $('#msi_SER442').val(SER442.SWMSI);
    $('#decimal_SER442').val(SER442.SWDECI);
    $('#separar_SER442').val(SER442.SWSEPARAR);
    $('#abofact_SER442').val(SER442.SWABONO);

    if (SER442.SOAT.trim() == '') {
        SER442.SOAT = 'N';
        $('#soat_SER442').val(SER442.SOAT);
    }
    validarInputs({
        form: '#SOAT_SER442',
        orden: "1"
    },
        () => { $('.btn-danger').click() },
        () => {
            SER442.SOAT = $('#soat_SER442').val().toUpperCase(); $('#soat_SER442').val(SER442.SOAT);
            if ((SER442.SOAT == 'S') || (SER442.SOAT == 'N')) {

                _evaluarministerio_SER442();
            } else {
                _Evaluarsoat_SER442()
            }
        }
    )
}

function _evaluarministerio_SER442() {
    if (SER442.MINI.trim() == '') {
        SER442.MINI = 'N';
        $('#nuir_SER442').val(SER442.MINI);
    }
    validarInputs({
        form: '#NUIR_SER442',
        orden: "1"
    },
        _Evaluarsoat_SER442,
        () => {
            SER442.MINI = $('#nuir_SER442').val().toUpperCase(); $('#nuir_SER442').val(SER442.MINI);
            if ((SER442.MINI == 'S') || (SER442.MINI == 'N')) {
                _evaluarnuir_SER442();
            } else {
                _evaluarministerio_SER442();
            }

        }
    )
}

function _evaluarnuir_SER442() {
    if ((($_NITUSU == '0800162035') || ($_NITUSU == '0900641654') || ($_NITUSU == '0900193162') ||
        ($_NITUSU == '0830511298')) && (($_PREFIJOUSU == '08') || ($_PREFIJOUSU == '01') ||
            ($_PREFIJOUSU == '02'))) {
        SER442.CIUDADNI = $_CODCIUUSU;
        SER442.NUIRNI = $_NUIRUSU;
        SER442.PREFIJOINI = $_PREFIJOUSU;
        SER442.CODPRESTNI = SER442.CIUDADNI + SER442.NUIRNI + SER442.PREFIJOINI;
        $('#codnuir_SER442').val(SER442.CODPRESTNI);

        validarInputs({
            form: '#CODNUIR_SER442',
            orden: "1"
        },
            _evaluarministerio_SER442,
            () => {
                SER442.CODPRESTNI = $('#codnuir_SER442').val();
                if (SER442.CODPRESTNI.trim() == '') {
                    _evaluarministerio_SER442();
                } else {
                    _evaluarobservacion_SER442();
                }

            }
        )
    } else {
        _evaluarobservacion_SER442();
    }
}

function _evaluarobservacion_SER442() {
    validarInputs({
        form: '#OBSERVACION_SER442',
        orden: "1"
    },
        _Evaluarsoat_SER442,
        () => {
            SER442.OBSERV = $('#observacion_SER442').val().toUpperCase(); $('#observacion_SER442').val(SER442.OBSERV);
            _evaluarpyp_SER442();
        }
    )
}
function _evaluarpyp_SER442() {
    if (SER442.PYP.trim() == '') {
        SER442.PYP = '3';
        $('#pyp_SER442').val(SER442.PYP);
    }
    validarInputs({
        form: '#PYP_SER442',
        orden: "1"
    },
        _Evaluarsoat_SER442,
        () => {
            SER442.PYP = $('#pyp_SER442').val();
            if ((SER442.PYP == '1') || (SER442.PYP == '2') || (SER442.PYP == '3')) {
                _evaluaracuerdo5121_SER442();
            } else {
                _evaluarpyp_SER442();
            }
        }
    )
}
function _evaluaracuerdo5121_SER442() {
    if ((SER442.ACU51.trim() == '') && ($_NITUSU == '0845000038')) {
        SER442.ACU51 = '3';
        $('#droga_SER442').val(SER442.ACU51);
    } else if (SER442.ACU51.trim() == '') {
        SER442.ACU51 = '2';
        $('#droga_SER442').val(SER442.ACU51);
    }
    validarInputs({
        form: '#DROGA_SER442',
        orden: "1"
    },
        _evaluarpyp_SER442,
        () => {
            SER442.ACU51 = $('#droga_SER442').val();

            if ((SER442.ACU51 == '1') || (SER442.ACU51 == '2') || (SER442.ACU51 == '3')) {
                _evaluarnroautorizacion_SER442();
            } else {
                _evaluaracuerdo5121_SER442()
            }
        })
}
function _evaluarnroautorizacion_SER442() {

    if (SER442.AUTORFACT.trim() == '') {
        SER442.AUTORFACT = 'N';
        $('#autoriz_SER442').val(SER442.AUTORFACT);
    }
    validarInputs({
        form: '#AUTORIZ_SER442',
        orden: "1"
    },
        _evaluaracuerdo5121_SER442,
        () => {
            SER442.AUTORFACT = $('#autoriz_SER442').val().toUpperCase(); $('#autoriz_SER442').val(SER442.AUTORFACT);

            if ((SER442.AUTORFACT == 'S') || (SER442.AUTORFACT == 'N')) {
                _evaluaraproximar_SER442();
            } else {
                _evaluarnroautorizacion_SER442();
            }
        })
}

function _evaluaraproximar_SER442() {
    if ((SER442.NITENV == '0892000148') || (SER442.NITENV == '0890102044')) {
        SER442.SWVLRDROG = 'S';
    } else {
        if ((SER442.SWVLRDROG.trim() == '') && ($_NITUSU == '0845000038')) {
            SER442.SWVLRDROG = 'S';
        } else {
            SER442.SWVLRDROG = 'N';
            $('#vlrdroga_SER442').val(SER442.SWVLRDROG);
        }
    }
    validarInputs({
        form: '#VLRDRO_SER442',
        orden: "1"
    },
        _evaluaracuerdo5121_SER442,
        () => {
            SER442.SWVLRDROG = $('#vlrdroga_SER442').val().toUpperCase(); $('#vlrdroga_SER442').val(SER442.SWVLRDROG);

            if ((SER442.SWVLRDROG == 'S') || (SER442.SWVLRDROG == 'N')) {
                _evaluarcapita_SER442();
            } else {
                _evaluaraproximar_SER442();
            }
        })
}

function _evaluarcapita_SER442() {
    if (SER442.SWCAPI.trim() == '') {
        SER442.SWCAPI = 'S';
        $('#maestra_SER442').val(SER442.SWCAPI);
    }
    validarInputs({
        form: '#MAESTRA_SER442',
        orden: "1"
    },
        _evaluaraproximar_SER442,
        () => {
            SER442.SWCAPI = $('#maestra_SER442').val().toUpperCase(); $('#maestra_SER442').val(SER442.SWCAPI);

            if ((SER442.SWCAPI == 'S') || (SER442.SWCAPI == 'N')) {
                _evaluardiag_SER442();
            } else {
                _evaluarcapita_SER442();
            }
        })
}
function _evaluardiag_SER442() {
    if ((SER442.SWDIAG.trim() == '') && ($_NITUSU == '0845000038')) {
        SER442.SWDIAG = 'S';
        $('#ap_SER442').val(SER442.SWDIAG);
    } else if (SER442.SWDIAG.trim() == '') {
        SER442.SWDIAG = 'N';
        $('#ap_SER442').val(SER442.SWDIAG);
    }
    validarInputs({
        form: '#AP_SER442',
        orden: "1"
    },
        _evaluarcapita_SER442,
        () => {
            SER442.SWDIAG = $('#ap_SER442').val().toUpperCase(); $('#ap_SER442').val(SER442.SWDIAG);

            if ((SER442.SWDIAG == 'S') || (SER442.SWDIAG == 'N')) {
                _evaluarmedconce_SER442();
            } else {
                _evaluardiag_SER442();
            }
        })
}
function _evaluarmedconce_SER442() {
    if ((SER442.SWCONCEN.trim() == '') && ($_NITUSU == '0845000038')) {
        SER442.SWDIAG = 'S';
        $('#am_SER442').val(SER442.SWCONCEN);
    } else if (SER442.SWCONCEN.trim() == '') {
        SER442.SWCONCEN = 'N';
        $('#am_SER442').val(SER442.SWCONCEN);
    }
    validarInputs({
        form: '#AM_SER442',
        orden: "1"
    },
        _evaluarcapita_SER442,
        () => {
            SER442.SWCONCEN = $('#am_SER442').val().toUpperCase(); $('#am_SER442').val(SER442.SWCONCEN);

            if ((SER442.SWCONCEN == 'S') || (SER442.SWCONCEN == 'N')) {
                _evaluarcopagos_SER442();
            } else {
                _evaluardiag_SER442();
            }
        })
}

function _evaluarcopagos_SER442() {

    if (SER442.SWCOPA.trim() == '') {
        SER442.SWCOPA = 'N';
        $('#pu_SER442').val(SER442.SWCOPA);
    }
    validarInputs({
        form: '#PU_SER442',
        orden: "1"
    },
        _evaluarcapita_SER442,
        () => {
            SER442.SWCOPA = $('#pu_SER442').val().toUpperCase(); $('#pu_SER442').val(SER442.SWCOPA);

            if ((SER442.SWCOPA == 'S') || (SER442.SWCOPA == 'N')) {
                if (SER442.ACU51 == '2') {
                    if (SER442.SW6408.trim() == '') {
                        SER442.SW6408 = 'N';
                        $('#resol_SER442').val(SER442.SW6408);
                        _evaluar6408_SER442();
                    } else {
                        _evaluar6408_SER442();
                    }
                } else {
                    _evaluarsucursal_SER442();
                }

            } else {
                _evaluarcopagos_SER442();
            }
        })
}
function _evaluar6408_SER442() {
    console.log('RESOLUCION')
    if (SER442.SW6408.trim() == '') {
        $('#resol_SER442').val('N')
    }
    validarInputs({
        form: '#RESOL_SER442',
        orden: "1"
    },
        _evaluarcopagos_SER442,
        () => {
            SER442.SW6408 = $('#resol_SER442').val().toUpperCase(); $('#resol_SER442').val(SER442.SW6408);

            if ((SER442.SW6408 == 'S') || (SER442.SW6408 == 'N')) {
                _evaluarsucursal_SER442();
            } else {
                _evaluar6408_SER442();
            }
        })
}
function _evaluarsucursal_SER442() {
    console.log('SUCURSAL')
    if (SER442.SUCW.trim() == '') {
        SER442.SUCW = '**';
        $('#sucursal_SER442').val(SER442.SUCW);
    }
    validarInputs({
        form: '#SUCURSAL_SER442',
        orden: "1"
    },
        _evaluarcopagos_SER442,
        () => {
            SER442.SUCW = $('#sucursal_SER442').val();

            if (SER442.SUCW == '**') {
                $('#descripsuc_SER442').val('TODAS LAS SUCURSALES');
                _evaluarfechaser_SER442()
            } else {
                if (SER442.SUCW == '01') {
                    $('#descripsuc_SER442').val('PRINCIPAL');
                    _evaluarfechaser_SER442()
                } else {
                    $('#descripsuc_SER442').val('SECUNDARIA');
                    _evaluarfechaser_SER442()
                }
            }
        })
}
function _evaluarfechaser_SER442() {
    if (SER442.SWFECHASER.trim() == '') {
        if ($_NITUSU == '0830511298') {
            SER442.SWFECHASER = 'S';
            $('#servicio_SER442').val(SER442.SWFECHASER);
        } else {
            SER442.SWFECHASER = 'N';
            $('#servicio_SER442').val(SER442.SWFECHASER);
        }
    }
    validarInputs({
        form: '#SERVICIO_SER442',
        orden: "1"
    },
        _evaluarsucursal_SER442,
        () => {
            SER442.SWFECHASER = $('#servicio_SER442').val().toUpperCase(); $('#servicio_SER442').val(SER442.SWFECHASER);

            if ((SER442.SWFECHASER == 'S') || (SER442.SWFECHASER == 'N')) {
                if (SER442.SWFECHASER == 'S') {
                    // _FloatText({ estado: 'on', msg: [{ mensaje: 'ARCHIVO AF FECHA NO IGUAL A FECHA ATENCION' }] })
                    _evaluarQX_SER442();
                } else {
                    _evaluarQX_SER442();
                }
            } else {
                _evaluarfechaser_SER442();
            }
        })
}
function _evaluarQX_SER442() {
    // _FloatText({ estado: 'off' })
    if (SER442.SWQX.trim() == '') {
        SER442.SWQX = 'N';
        $('#cirugia_SER442').val(SER442.SWQX);
    }
    validarInputs({
        form: '#CIRUGIA_SER442',
        orden: "1"
    },
        _evaluarfechaser_SER442,
        () => {
            SER442.SWQX = $('#cirugia_SER442').val().toUpperCase(); $('#cirugia_SER442').val(SER442.SWQX);
            if ((SER442.SWQX == 'S') || (SER442.SWQX == 'N')) {
                if ($_ACTLTFARMAUSU != 'S') {
                    _evaluarapat_SER442();
                } else {
                    if (SER442.SWLOTE.trim() == '') {
                        if ($_NITUSU == '0845000038') {
                            SER442.SWLOTE = 'S';
                            $('#lote_SER442').val(SER442.SWLOTE);
                            _evaluarlote_SER442();
                        } else {
                            SER442.SWLOTE = 'N';
                            $('#lote_SER442').val(SER442.SWLOTE);
                            _evaluarlote_SER442();
                        }
                    } else {
                        _evaluarlote_SER442();
                    }
                }
            } else {
                _evaluarQX_SER442();
            }
        })
}

function _evaluarlote_SER442() {


    validarInputs({
        form: '#LOTE_SER442',
        orden: "1"
    },
        _evaluarQX_SER442,
        () => {
            SER442.SWLOTE = $('#lote_SER442').val().toUpperCase(); $('#lote_SER442').val(SER442.SWLOTE);

            if ((SER442.SWLOTE == 'S') || (SER442.SWLOTE == 'N')) {
                _evaluarapat_SER442();
            } else {
                _evaluarlote_SER442();
            }
        })
}
function _evaluarapat_SER442() {
    if (SER442.SWPTMV.trim() == '') {
        SER442.SWPTMV = 'N';
        $('#ptmv_SER442').val(SER442.SWPTMV);
    }
    validarInputs({
        form: '#PTMV_SER442',
        orden: "1"
    },
        _evaluarlote_SER442,
        () => {
            SER442.SWPTMV = $('#ptmv_SER442').val().toUpperCase(); $('#ptmv_SER442').val(SER442.SWPTMV);

            if ((SER442.SWPTMV == 'S') || (SER442.SWPTMV == 'N')) {
                _evaluarmsi_ser442();
            } else {
                _evaluarapat_SER442();
            }
        })
}

function _evaluarmsi_ser442() {
    if (SER442.SWMSI.trim() == '') {
        SER442.SWMSI = 'N';
        $('#msi_SER442').val(SER442.SWMSI);
    }
    validarInputs({
        form: '#MSI_SER442',
        orden: "1"
    },
        _evaluarapat_SER442,
        () => {
            SER442.SWMSI = $('#msi_SER442').val().toUpperCase(); $('#msi_SER442').val(SER442.SWMSI);

            if ((SER442.SWMSI == 'S') || (SER442.SWMSI == 'N')) {
                _evaluardecimal_SER442();
            } else {
                _evaluarapat_SER442();
            }
        })
}

function _evaluardecimal_SER442() {
    if (SER442.SWDECI.trim() == '') {
        SER442.SWDECI = 'N';
        $('#decimal_SER442').val(SER442.SWDECI);
    }
    validarInputs({
        form: '#DECIMAL_SER442',
        orden: "1"
    },
        _evaluarmsi_ser442,
        () => {
            SER442.SWDECI = $('#decimal_SER442').val().toUpperCase(); $('#decimal_SER442').val(SER442.SWDECI);

            if ((SER442.SWDECI == 'S') || (SER442.SWDECI == 'N')) {
                _evaluarseparar_SER442();
            } else {
                _evaluardecimal_SER442();
            }
        })
}

function _evaluarseparar_SER442() {
    if (SER442.SWSEPARAR.trim() == '') {
        SER442.SWSEPARAR = 'N';
        $('#separar_SER442').val(SER442.SWSEPARAR);
    }
    validarInputs({
        form: '#SEPARAR_SER442',
        orden: "1"
    },
        _evaluardecimal_SER442,
        () => {
            SER442.SWSEPARAR = $('#separar_SER442').val().toUpperCase(); $('#separar_SER442').val(SER442.SWSEPARAR);

            if ((SER442.SWSEPARAR == 'S') || (SER442.SWSEPARAR == 'N')) {
                if (($_NITUSU == '0892000401') || ($_NITUSU == '845000038')) {
                    _evaluarabonos_SER442();
                } else {
                    SER442.SWABONO = 'N';
                    $('.btn-primary').click();
                }
            } else {
                _evaluarseparar_SER442();
            }
        })
}

function _evaluarabonos_SER442() {

    if (SER442.SWABONO.trim() == '') {
        SER442.SWABONO = 'N';
        $('#abofact_SER442').val(SER442.SWABONO);
    }
    validarInputs({
        form: '#ABOFACT_SER442',
        orden: "1"
    },
        _evaluarseparar_SER442,
        () => {
            SER442.SWABONO = $('#abofact_SER442').val();
            if ((SER442.SWABONO == 'S') || (SER442.SWABONO == 'N')) {
                $('.btn-primary').click();
            } else {
                _evaluarabonos_SER442();
            }
        })
}

function _tablagrabar_SER442() {
    CON851P('01', _aceptarprefijo_SER442, _grabaropcion_SER442)
}

function _grabaropcion_SER442() {
    $('#TABLARIPS_SER442 tbody tr').each((index, element) => {
        var llave = $(element).text();
        var a = {
            'prefijo': llave.substring(0, 1),
            'factura': llave.substring(1, 7)
        };
        SER442.TABLARIPS.push(a);
    });
    let fecha = moment().format('YY/MM/DD HH:mm:ss:ms');
    let nombretxt = $_ADMINW + '_' + fecha.substring(0, 2) + fecha.substring(3, 5) + fecha.substring(6, 8) + fecha.substring(9, 11) + fecha.substring(12, 14) + fecha.substring(15, 17) + fecha.substring(18, 20);
    SER442['NOMBRETABLA'] = nombretxt;
    let datosEnvio = {
        nombre_archrips: SER442.NOMBRETABLA,
        datos_fact: SER442.TABLARIPS,
    };
    $.ajax({
        data: datosEnvio,
        type: 'POST',
        async: false,
        url: get_url('app/Inc/_datostablas_SER442.php')
    }).done(function (data) {
        if (data == '00') {
            _grabarnuevo_SER442();
        } else {
            _aceptarprefijo_SER442();
            console.debug('problemas para crear el txt');
        }
    });
}

///////////////////GRABAROPCION//////////////////////

function _grabarnuevo_SER442() {
    console.log('grabar')
    console.log(SER442.NOVEDAD, SER442.NROW, SER442.NITW, SER442.PERW, SER442.FECHAENVW, SER442.OBSERV, SER442.OPER, SER442.FECHACRE, SER442.OPERMOD, SER442.FECHAMOD, SER442.CANTCARP, SER442.CANTFOLIO, SER442.MINI, SER442.SOAT, SER442.NOMBRETABLA, 'GRABAR')
    loader("show");
    if (parseInt(SER442.NOVEDAD) == 8) {
        SER442.FECHAMOD = moment().format('YYMMDD');
        SER442.OPERMOD = $_ADMINW;
    } else {
        SER442.FECHACRE = moment().format('YYMMDD');
        SER442.OPER = $_ADMINW;
        SER442.FECHAMOD = ' ';
        SER442.OPERMOD = ' ';
    }
    postData({
        datosh: `${datosEnvio()}${SER442.NOVEDAD}|${SER442.NROW}|${SER442.NITW}|${SER442.PERW}|${SER442.FECHAENVW}|${SER442.OBSERV}|${SER442.OPER}|${SER442.FECHACRE}|${SER442.OPERMOD}|${SER442.FECHAMOD}|${SER442.CANTCARP}|${SER442.CANTFOLIO}|${SER442.MINI}|${SER442.SOAT}|${SER442.NOMBRETABLA}|`
    }, get_url("APP/SALUD/SER442-02.DLL"))
        .then((data) => {
            console.log(data, 'GRABADO')
            if (SER442.NOVEDAD == '7') {
                SER442.ULTANONUM = SER442.ANOENVW.substring(2, 4);
                SER442.ULTMESNUM = SER442.MESENVW;
                SER442.ULTDIANUM = SER442.DIAENVW;
                SER442.ULTFECHANUM = SER442.ULTANONUM + SER442.ULTMESNUM + SER442.ULTDIANUM;
                SER442.SECUNUM = "EN"
                let URL = get_url("APP/CONTAB/CON007X.DLL");
                postData({ datosh: datosEnvio() + SER442.SECUNUM + '|' + SER442.ULTFECHANUM + '|' + SER442.NROW + '|' }, URL)
                    .then(data => {
                        _generararchivotransacc_SER442();
                    })
                    .catch(err => {
                        console.debug(err);
                        loader("hide");
                        _aceptarprefijo_SER442();
                    })
            } else {
                _generararchivotransacc_SER442();
            }

        })
        .catch((err) => {
            console.error(err);
            loader("hide");
            _aceptarprefijo_SER442();
        });
}

// function _respuestagrabar_SER442(data) {
//     var date = data.split('|');
//     var swinvalid = date[0].trim();
//     if (swinvalid == "00") {
//         SER442.ULTANONUM = SER442.ANOENVW.substring(2, 4);
//         SER442.ULTMESNUM = SER442.MESENVW;
//         SER442.ULTDIANUM = SER442.DIAENVW;
//         SER442.ULTFECHANUM = SER442.ULTANONUM + SER442.ULTMESNUM + SER442.ULTDIANUM;
//         SER442.SECUNUM = "EN"
//         let URL = get_url("APP/CONTAB/CON007X.DLL");
//         postData({ datosh: datosEnvio() + SER442.SECUNUM + '|' + SER442.ULTFECHANUM + '|' + SER442.NROW + '|' }, URL)
//             .then(data => {
//                 _generararchivotransacc_SER442();

//             })
//             .catch(err => {
//                 console.debug(err);
//             })
//     }
//     else if (swinvalid == "01") {
//         CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'error');
//         _toggleNav();
//     }
//     else {
//         CON852(date[0], date[1], date[2], _toggleNav);
//     }
// }

///////////////////GRABARCAMBIO//////////////////////

// function _grabarcambio_SER442() {
//     console.log(SER442.NOVEDAD, SER442.NROW, SER442.NITW, SER442.PERW, SER442.FECHAENVW, SER442.OBSERV, SER442.OPER, SER442.FECHACRE, SER442.OPERMOD, SER442.FECHAMOD, SER442.CANTCARP, SER442.CANTFOLIO, SER442.MINI, SER442.SOAT, SER442.NOMBRETABLA, 'GRABAR cambios')
//     loader("show");
//     if (parseInt(SER442.NOVEDAD) == '8') {
//         SER442.FECHAMOD = moment().format('YYMMDD');
//         SER442.OPERMOD = $_ADMINW;
//     } else {
//         SER442.FECHACRE = moment().format('YYMMDD');
//         SER442.OPER = $_ADMINW;
//         SER442.FECHAMOD = ' ';
//         SER442.OPERMOD = ' ';
//     }
//     LLAMADO_DLL({
//         dato: [SER442.NOVEDAD, SER442.NROW, SER442.NITW, SER442.PERW, SER442.FECHAENVW, SER442.OBSERV, SER442.OPER, SER442.FECHACRE, SER442.OPERMOD, SER442.FECHAMOD, SER442.CANTCARP, SER442.CANTFOLIO, SER442.MINI, SER442.SOAT, SER442.NOMBRETABLA],
//         callback: _respuestagrabarcambio_SER442,
//         nombredll: 'SER442-02',
//         carpeta: 'SALUD'
//     });

// }
// function _respuestagrabarcambio_SER442(data) {
//     var date = data.split('|');
//     var swinvalid = date[0].trim();
//     if (swinvalid == "00") {
//         _generararchivotransacc_SER442();
//     }
//     else if (swinvalid == "01") {
//         CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'error');
//         _toggleNav();
//     }
//     else {
//         CON852(date[0], date[1], date[2], _toggleNav);
//     }
// }

////////////////////ACTUALIZARNUMERACION//////////////


function _generararchivotransacc_SER442() {

    SER442.CIUDADW = '';
    SER442.ACU29W = '';
    SER442.SWAPRVR = 'N';

    let URL = get_url("APP/SALUD/SER442A.DLL");
    postData({ datosh: datosEnvio() + SER442.NROW + '|' + SER442.SWPARTIC + '|' + SER442.SWCAPI + '|' + $_ADMINW + '|' + SER442.CIUDADW + '|' + SER442.SWABONO + '|' }, URL)
        .then(data => {
            $_ESTADODLL = data.DATOSENV[0];
            if ($_ESTADODLL.ESTADO == '07') {
                CON851('07', '07', null, 'error', 'error');
            }
            ////////////////////SER442B////////////////////////
            let URL = get_url("APP/SALUD/SER442B.DLL");
            postData({
                datosh: datosEnvio() + SER442.NROW + '|' + SER442.SOAT + '|' + SER442.PYP + '|' + SER442.MINI + '|' + SER442.SWVLRDROG + '|' + SER442.ACU29W
                    + '|' + SER442.ACU51 + '|' + SER442.AUTORFACT + '|' + SER442.SWCAPI + '|' + $_ADMINW + '|' + SER442.CIUDADW + '|' + SER442.SWDIAG + '|' + SER442.SWCONCEN
                    + '|' + SER442.SW6408 + '|' + SER442.SUCW + '|' + SER442.CODPRESTNI + '|' + SER442.SWFECHASER + '|' + SER442.SWQX + '|' + SER442.SWPTMV
                    + '|' + SER442.SWAPRVR + '|' + SER442.SWLOTE + '|' + SER442.SWMSI + '|' + SER442.SWDECI + '|' + SER442.SWSEPARAR + '|'
            }, URL)
                .then(data => {
                    for (var i in data.RUTAS) {
                        var nombretxt = data.RUTAS[i].replace('.TXT', '');
                        let datosEnvio = {
                            nombre_txt: nombretxt,
                        };
                        $.ajax({
                            data: datosEnvio,
                            type: 'POST',
                            async: false,
                            url: get_url('app/Inc/_crearRIPS.php')
                        }).done(function (data) {
                            // console.log(data);
                            if (data.substring(0, 2) == '99' || data.trim() == 'No se pudo abrir el archivo!') {
                                console.error('problemas para crear el txt');
                            } else {
                                let texto = data.split(/\r\n/);
                                let datos = '';
                                for (var i in texto){
                                    if (i == 0) {
                                        datos = `${texto[i].trim()}`;
                                    } else {
                                        if (texto[i].trim() != ''){
                                            datos = `${datos}\r\n${texto[i].trim()}`;
                                            // let siguiente = parseInt(i) + 1;
                                            // if (!texto[siguiente]) { 
                                            //     console.log('aca');
                                            //     datos = `${datos}\r\n`;
                                            // }
                                        }
                                        // else {
                                        //     datos = `${datos}\r\n`;
                                        // }
                                    }
                                }
                                const buffer = Buffer.from(datos, 'latin1');
                                // let buffer = datos.toString(16);
                                fs.writeFile(`C:\\PROSOFT\\EXPORTAR\\${nombretxt}.txt`, buffer, {encoding: 'binary'}, function (err) {
                                    if (err) return console.error(err);
                                });
                            }
                        });
                    }
                    //////////////////////SER442D////////////
                    let URL = get_url("APP/SALUD/SER442D.DLL");
                    postData({
                        datosh: datosEnvio() + SER442.NROW + '|' + SER442.ENTIDADTERCERO + '|' + SER442.ACTTERCERO + '|' + SER442.MINI + '|' + $_ADMINW +
                            '|' + SER442.CIUDADW + '|' + SER442.CODPRESTNI + '|' + SER442.SWMSI + '|' + SER442.SWSEPARAR + '|'
                    }, URL)
                        .then(data => {
                            for (var i in data.RUTAS2) {
                                var nombretxt = data.RUTAS2[i].replace('.TXT', '');
                                let datosEnvio = {
                                    nombre_txt: nombretxt,
                                };
                                $.ajax({
                                    data: datosEnvio,
                                    type: 'POST',
                                    async: false,
                                    url: get_url('app/Inc/_crearRIPS.php')
                                }).done(function (data) {
                                    console.log(data);
                                    if (data.substring(0, 2) == '99' || data.trim() == 'No se pudo abrir el archivo!') {
                                        console.error('problemas para crear el txt');
                                    } else {
                                        let texto = data.split(/\r\n/);
                                        let datos = '';
                                        for (var i in texto){
                                            if (i == 0) {
                                                datos = `${texto[i].trim()}`;
                                            } else {
                                                if (texto[i].trim() != ''){
                                                    datos = `${datos}\r\n${texto[i].trim()}`;
                                                    // let siguiente = parseInt(i) + 1;
                                                    // if (!texto[siguiente]) { 
                                                    //     console.log('aca');
                                                    //     datos = `${datos}\r\n`;
                                                    // }
                                                } 
                                                // else {
                                                //     datos = `${datos}\r\n`;
                                                // }
                                            }
                                        }
                                        const buffer = Buffer.from(datos, 'latin1');
                                        // let buffer = datos.toString(16);
                                        fs.writeFile(`C:\\PROSOFT\\EXPORTAR\\${nombretxt}.txt`, buffer, {encoding: 'binary'}, function (err) {
                                            if (err) return console.error(err);
                                        });
                                    }
                                });
                            }
                            ////////////////////////SER442E////////////
                            let URL = get_url("APP/SALUD/SER442E.DLL");
                            postData({
                                datosh: datosEnvio() + SER442.NROW + '|' + SER442.MINI + '|' + $_ADMINW + '|' + SER442.CIUDADW + '|' + SER442.SWCOPA + '|' + SER442.CODPRESTNI +
                                    '|' + SER442.SWABONO + '|' + SER442.SWSEPARAR + '|'
                            }, URL)
                                .then(data => {
                                    for (var i in data.RUTAS3) {
                                        var nombretxt = data.RUTAS3[i].replace('.TXT', '');
                                        let datosEnvio = {
                                            nombre_txt: nombretxt,
                                        };
                                        $.ajax({
                                            data: datosEnvio,
                                            type: 'POST',
                                            async: false,
                                            url: get_url('app/Inc/_crearRIPS.php')
                                        }).done(function (data) {
                                            console.log(data);
                                            if (data.substring(0, 2) == '99' || data.trim() == 'No se pudo abrir el archivo!') {
                                                console.error('problemas para crear el txt');
                                            } else {
                                                let texto = data.split(/\r\n/);
                                                let datos = '';
                                                for (var i in texto){
                                                    if (i == 0) {
                                                        datos = `${texto[i].trim()}`;
                                                    } else {
                                                        if (texto[i].trim() != ''){
                                                            datos = `${datos}\r\n${texto[i].trim()}`;
                                                            // let siguiente = parseInt(i) + 1;
                                                            // if (!texto[siguiente]) { 
                                                            //     console.log('aca');
                                                            //     datos = `${datos}\r\n`;
                                                            // }
                                                        } 
                                                        // else {
                                                        //     datos = `${datos}\r\n`;
                                                        // }
                                                    }
                                                }
                                                const buffer = Buffer.from(datos, 'latin1');
                                                // let buffer = datos.toString(16);
                                                fs.writeFile(`C:\\PROSOFT\\EXPORTAR\\${nombretxt}.txt`, buffer, {encoding: 'binary'}, function (err) {
                                                    if (err) return console.error(err);
                                                });
                                            }
                                        });
                                    }
                                    SER442.SER442EULT = data;
                                    if (SER442.SER442EULT.ESTADO == '08') { CON851('08', 'No existe movimiento en transacciones AF!', null, 'error', 'error'); }
                                    else if (SER442.SER442EULT.ESTADO == '07') { CON851('08', 'No existe movimiento en Copagos PU!', null, 'error', 'error'); }
                                    SER442.IMPRESIONCSV = [];
                                    SER442.IMPRESIONCSV.push('Listado de inconsistencias del envio ' + SER442.NROW + ' periodo ' + $_MESACTUALW + '/' + $_ANOACTUALW);
                                    var line = SER442.SER442EULT.LLAVE_FACT2 + ',' + SER442.SER442EULT.CTA2 + ',' + SER442.SER442EULT.DESCRIP2 + ',' + SER442.SER442EULT.CUP2 + ',' + SER442.SER442EULT.ITEM2;
                                    if (SER442.SER442EULT.LLAVE_FACT2.trim() != '') {
                                        SER442.IMPRESIONCSV.push(line);
                                    }
                                    loader("hide");
                                    generararchivocsv_SER442();
                                })
                                .catch(err => {
                                    loader("hide");
                                    _aceptarprefijo_SER442();
                                    console.debug(err);
                                })
                        })
                        .catch(err => {
                            loader("hide");
                            _aceptarprefijo_SER442();
                            console.debug(err);
                        })
                })
                .catch(err => {
                    loader("hide");
                    _aceptarprefijo_SER442();
                    console.debug(err);
                })
        })
        .catch(err => {
            loader("hide");
            _aceptarprefijo_SER442();
            console.debug(err);
        })
}

function generararchivocsv_SER442() {
    SER442.NOMBRECSV = $_ADMINW + SER442.NROW + $_HORAACTUAL;
    opcinesImpresion_SER442 = {
        datos: SER442.IMPRESIONCSV,
        tipo: 'csv',
        formato: 'salud/SER4422.html',
        nombre: SER442.NOMBRECSV
    }
    imprimir(opcinesImpresion_SER442, _toggleNav);
}

////////////////////OTRASVALIDACIONES//////////////////
function _buscartodas_SER442() {
    SER442.PREFIJO = "A";
    $('#prefijo_SER442').val(SER442.PREFIJO);
    SER442.SERVICIOW = '**';
    SER442.CIUDADW = '*****';
    SER442.SEBUSCAR = '00';
    SER442.ANORETNUM = SER442.ANOINIW;
    SER442.MESRETNUM = SER442.MESINIW;
    SER442.DIARETNUM = '01';
    SER442.FECHARETNUM = SER442.ANORETNUM + SER442.MESRETNUM + SER442.DIARETNUM;
    console.log(SER442.FECHARETNUM, 'FECHA DE RETIRO')
    let URL = get_url("APP/SALUD/SER442-03.DLL");
    postData({ datosh: datosEnvio() + SER442.FECHARETNUM + '|' + SER442.ANOINIW + '|' + SER442.MESINIW + '|' + SER442.CODCOSTO + '|' + SER442.NITW + '|' + SER442.SERVICIOW + '|' + SER442.NROW }, URL)
        .then(data => {
            $_TODASFACT = data['FACT'];
            $_TODASFACT.pop()
            if ($_NITUSU == '0800251482') {
                _ventanaservicios_SER442();
            } else {
                for (var i in $_TODASFACT) {
                    if ($_TODASFACT[i].NUMERO.trim().length > 0) {
                        $('#TABLARIPS_SER442 tbody').append(
                            '<tr>'
                            + '<td>' + $_TODASFACT[i].PREFIJO.trim() + '</td>'
                            + '<td>' + $_TODASFACT[i].NUMERO.trim() + '</td>'
                            + "</tr>"
                        )
                    }
                }
                _aceptarprefijo_SER442()
            }

        })
        .catch(err => {
            console.debug(err);
            if ($_NITUSU == '0800251482') {
                _ventanaservicios_SER442();
            } else {
                _aceptarprefijo_SER442();
            }
        })
}

function _ventanaservicios_SER442() {
    /////PENDIENTE POR REALIZAR VALIDACION POR NIT PARA EMPRESA 0800251482
}



