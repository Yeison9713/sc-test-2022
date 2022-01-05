var SAL41 = new Object;
var $_LOEFARM, $_UNDSERVICIO, $_SERVICIO, $_FECHA_LNK, $_ARCHTER;
var $_BARRASUSU, $_SUC868, $_SUCFACT, $_SUCPRN, $_FECHAINGESTADO, $_FACTURAS, $_F8LITE, $_PREFIJOFACT, $_PREFIJONUM;
var $_DESCRIPTER = new Array();
var $_NOM_PAC = new Array();
var $_SECUNUM, $_SECUNUM1, $_SECUNUM2, $_TIPO_COMP = "1  ",
    $_OPSEGU, $_NRONUM, $_SWINVALID, $_SECUOTROS, $_NROOTROS, $_NROCTAFACT, $_LLAVESALIDANUM;
var $_FECHARETNUM, $_FECHASIGFACT, $_FECHAFACT, $_SWORDSERV, $_ARTFACT;
var $_DIASTRATAFACT = $_CODLOTEFACT = $_HORACITFACT = $_DATOSETCUP = $_ALMFACT = $_RESTRICLOCAL = $_LLAVEBARRASW = $_DESCRIPCUP = $_CODSERTAB = $_TIPOPACI = '';
var $_facturas_A = [],
    $_facturas_P = [],
    $_facturas_T = [],
    $TABLAFACT = [];
var $_CAMARXFACT = '    ';
var $_CAUSAESTAD = '00';
var $_HORASALIDESTAD = '0000';
$_TIPODRFACT = '0';
var $_TIPOCOPAGOFACT = ' ';
$_COPAGOESTIMFACT = 0;
$_MEDCIRFACT = '0';
$_MEDAYUFACT = '0';
$_MEDANEFACT = '0';
$_MEDINSFACT = '0';
$_DETALLEFACT = '';
$_NROAUTORELAB = '';
$_NITFACT = $_IDPACNUM = $_MYTNUM = '';
$_VLRPROMEDW = 0;
var $_CANTMAX, $_VALORBRUTO, $_VALORBASE1IVA, $_VALORBASE2IVA, $_VALORBASE3IVA, $_TIPO1COMP = 0;
////// CANTMAX MIRAR LINEA 1929

$(document).ready(function () {
    _inputControl("reset");
    _inputControl("disabled");
    SAL41['ADMINW'] = localStorage.getItem('Usuario').trim() ? localStorage.getItem('Usuario').trim() : false;
    SAL41['FECHALNK'] = $_USUA_GLOBAL[0].FECHALNK;
    SAL41['DIALNK'] = SAL41.FECHALNK.substring(0, 2);
    SAL41['MESLNK'] = SAL41.FECHALNK.substring(2, 4);
    SAL41['ANOLNK'] = '20' + SAL41.FECHALNK.substring(0, 2);
    // SAL41.ANOLNK = '2020'; // CUANDO SE CAMBIE DOR2019 POR 2020 DESCOMENTAR LA LINEA DE ARRIBA
    SAL41['NITUSU'] = '0800162035';
    SAL41.NITUSU = $_USUA_GLOBAL[0].NIT.toString().padStart(10, '0');
    SAL41['PREFIJOUSU'] = $_USUA_GLOBAL[0].PREFIJ;
    // SAL41['PREFIJOUSU'] = '10';
    SAL41['PREFIJOUSU'] = '01';
    SAL41['CODCIUUSU'] = $_USUA_GLOBAL[0].COD_CIUD;
    SAL41['NUIRUSU'] = $_USUA_GLOBAL[0].NUIR;
    SAL41['CONTADOUSU'] = $_USUA_GLOBAL[0].CONTADO;
    SAL41['PUCUSU'] = $_USUA_GLOBAL[0].PUC;
    SAL41['LOTEFARMUSU'] = $_USUA_GLOBAL[0].LOTE_FARM;
    SAL41['SALMINUSU'] = $_USUA_GLOBAL[0].SAL_MIN;
    SAL41['SALMINUSU'] = parseInt(SAL41.SALMINUSU);
    SAL41['REPETIDOUSU'] = $_USUA_GLOBAL[0].REPETIDO;
    SAL41['ASUMEIVAUSU'] = $_USUA_GLOBAL[0].ASUME_IVA;
    SAL41['IVAUSU'] = $_USUA_GLOBAL[0].IVA1;
    SAL41['IVAUSU2'] = $_USUA_GLOBAL[0].IVA2;
    SAL41['IVAUSU3'] = $_USUA_GLOBAL[0].IVA3;
    SAL41['ALMPREF'] = 'ALM01';
    SAL41['INVENTUSU'] = $_USUA_GLOBAL[0].INVENT;
    SAL41['TIPOCAJAUSU'] = $_USUA_GLOBAL[0].TIP_CAJ;
    //INICIALIZAR VARIABLES QUE SE UTILIZAN DEPENDIENDO LA CLASE DE SERVICIOS
    SAL41['MULTFACT'] = '00';
    SAL41['NROCIRFACT'] = '00';
    SAL41['FPAGOFACT'] = '00';
    SAL41['NROFORMFACT'] = '0000000000000000';
    SAL41['HORAATENESTAD'] = '0000';
    SAL41['CLASEPROCESTADO'] = '0';
    SAL41['TIPOPROCESTAD'] = '0';
    SAL41['ESPECREMIFACT'] = '   ';
    SAL41['CUPPAQINTFACT'] = '        ';
    SAL41['ORDSERVFACT'] = ' ';
    SAL41['RECIBIDORX'] = ' ';
    SAL41['CRONICOFACT'] = '   ';
    SAL41['PENDIENTEW'] = ' ';
    SAL41['NROPENDIW'] = '  0000000';
    SAL41['FECHAPENDIW'] = '00000000';
    SAL41['HORAPENDIW'] = '0000';
    SAL41['CANTPENDIW'] = '000';
    SAL41['TIPOPENDIW'] = '0';
    SAL41['FACTAUTOFACT'] = '0';
    SAL41['EMPRESAPACIRIPS'] = '                                                  ';
    SAL41['VLRLATERFACT'] = ' ';
    SAL41['BIRADSFACT'] = ' ';
    SAL41['BLOQUEOIMPFACT'] = '0';
    SAL41['RESTIC_EXUSU'] = $_USUA_GLOBAL[0].RESTRIC_EX;
    SAL41['FINALIDESTAD'] = '00';
    SAL41['CLAVEOTRUSU'] = $_USUA_GLOBAL[0].CLAVE_OTR;
    SAL41['datos_envio'] = datosEnvio();
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    SAL41.MODULO = localStorage.Modulo;
    if (SAL41.MODULO == 'RX') {
        SAL41.NITUSU = '0830092718';
        SAL41.NITUSU = '0830092718';
        $_PREFIJOUSU = '80';
    }
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    parametros = [];
    _toggleF8([
        { input: 'claseservicio', app: 'SAL41', funct: _ventanaClases_41 },
        { input: 'factura', app: 'SAL41', funct: _ventanaFormapago_41 },
        { input: 'facturad', app: 'SAL41', funct: _ventanaNumeroFactura_41 },
        { input: 'cliente', app: 'SAL41', funct: _ventanaCliente_41 },
        { input: 'paciente', app: 'SAL41', funct: _ventanaPacientes_41 },
        { input: 'codservicio2', app: 'SAL41', funct: _ventanaTablatarifas_41 },
        { input: 'almac', app: 'SAL41', funct: _ventanaAlmacenes_41 },
        { input: 'espec', app: 'SAL41', funct: _ventanaEspecialidades_41 },
        { input: 'ccostos', app: 'SAL41', funct: _ventanaCostos_41 },
        { input: 'atend', app: 'SAL41', funct: _ventanaProfesionales_41 },
        { input: 'solic', app: 'SAL41', funct: _ventanaProfesionales2_41 },
        { input: 'nitmedico', app: 'SAL41', funct: _ventanaProfesionales3_41 },
        { input: 'compr', app: 'SAL41', funct: _ventanapacientecomp_41 }
    ]);
    if ($_USUA_GLOBAL[0].NIT == '0800156469') {
        SAL41.SERVICIOS = [
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
        SAL41.SERVICIOS = [
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
    obtenerDatosCompletos({ nombreFd: 'TERCEROS' }, data => {
        data = data.TERCEROS;
        data.pop();
        SAL41.TERCEROS = data;
        obtenerDatosCompletos({ nombreFd: 'ARTICULOS' }, data => {
            data = data.ARTICULOS;
            data.pop();
            SAL41.ARTICULOS = data;
            obtenerDatosCompletos({ nombreFd: 'TABLAS' }, data => {
                data = data.TABLA;
                data.pop();
                SAL41.TABLAS = data;
                obtenerDatosCompletos({ nombreFd: 'LOCALIZACION' }, data => {
                    data = data.LOCALIZACION;
                    data.pop();
                    SAL41.LOCALIZACION = data;
                    obtenerDatosCompletos({ nombreFd: 'ESPECIALIDAD' }, data => {
                        data = data.ESPECIALIDADES;
                        data.pop();
                        SAL41.ESPECIALIDADES = data;
                        obtenerDatosCompletos({ nombreFd: 'COSTOS' }, data => {
                            data = data.COSTO;
                            data.pop();
                            SAL41.COSTO = data;
                            obtenerDatosCompletos({ nombreFd: 'UNSERV' }, data => {
                                data = data.UNSERV;
                                data.pop();
                                SAL41.UNSERV = data;
                                SAL41.UNIDSERVICIO = [];
                                for (var i in SAL41.UNSERV) {
                                    if (SAL41.UNSERV[i].ESTADO.trim() == 'S') {
                                        if (SAL41.UNSERV[i].COD.trim() != '') {
                                            SAL41.UNIDSERVICIO.push(SAL41.UNSERV[i]);
                                        }
                                    }
                                }
                                _validarOpcion_SAL41();
                                obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
                                    data = data.PREFIJOS;
                                    SAL41.PREFIJOS = data;
                                    obtenerDatosCompletos({ nombreFd: 'CIUDADES' }, data => {
                                        data = data.CIUDAD;
                                        SAL41.CIUDADES = data;
                                    })
                                })
                            }, 'OFF');
                        });
                    });
                });
            });
        });
    }, 'ON');
});

///////////////////////////////// F8 /////////////////////////////////////////////////
function _ventanapacientecomp_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        set_Event_validar('#COMPR_41', 'off');
        $('#compr_SAL41').attr('disabled', 'true');
        SER825(_Evaluarnumeroctl_41, _mostrardatoscompletos_SAL41, '1');
    }
}

function _ventanaClases_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE SERVICIO",
            columnas: ["COD", "DESCRIPCION"],
            data: SAL41.SERVICIOS,
            callback_esc: function () {
                $("#claseservicio_SAL41").focus();
            },
            callback: function (data) {
                clfactMask.typedValue = data.COD;
                _enterInput('#claseservicio_SAL41');
            }
        });
    }
}

function _ventanaNumeroFactura_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'NUMERACION',
            valoresselect: ['Nombre del tercero', 'buscar paciente'],
            f8data: 'NUMERACION',
            columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
            filtro: $_PREFIJOFACT.toUpperCase().trim(),
            fecha: '20' + $_ANOLNK + $_MESLNK + '00',
            prefijo: $_PREFIJOFACT,
            callback: (data) => {
                $_NROW = data.COD;
                $_NROW = $_NROW.substring(1, 7)
                $('#facturad_SAL41').val($_NROW);
                _enterInput('#facturad_SAL41');
            },
            cancel: () => {
                _enterInput('#facturad_SAL41');
            }
        };
        F8LITE(parametros);
    }
}

function _ventanaCliente_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA TERCEROS',
            columnas: ['COD', 'NOMBRE', "DIRREC", "TELEF", "CIUDAD", "FACTOR"],
            mascara: ['NOMBRE'],
            data: SAL41.TERCEROS,
            callback_esc: function () {
                $('#cliente_SAL41').focus();
            },
            callback: function (data) {
                clienteMask.typedValue = data.COD;
                _enterInput('#cliente_SAL41');
            }
        });
    }
}

function _ventanaFormapago_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE PAGO",
            columnas: ["CODIGO", "DESCRIPCION"],
            data: [
                { CODIGO: 'E', DESCRIPCION: 'EFECTIVO' },
                { CODIGO: 'C', DESCRIPCION: 'CREDITO' },
                { CODIGO: 'P', DESCRIPCION: 'PENSIONADO' },
                { CODIGO: 'A', DESCRIPCION: 'AMBULATORIO' },
                { CODGIO: 'T', DESCRIPCION: 'ACC.TRANS.' }
            ],
            callback_esc: function () {
                $("#factura_SAL41").focus();
            },
            callback: function (data) {
                $('#factura_SAL41').val(data.CODIGO.trim());
                _enterInput('#factura_SAL41');
            }
        });
    }
}

function _ventanaPacientes_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'PACIENTES',
            valoresselect: ['Nombre del paciente'],
            f8data: 'PACIENTES',
            ancho: '95%',
            columnas: [{
                title: 'COD'
            }, {
                title: 'NOMBRE'
            }, {
                title: 'EPS'
            }, {
                title: 'EDAD'
            }],
            callback: data => {
                idhistoriafactMask.typedValue = data.COD;
                $('#paciented_SAL41').val(data.NOMBRE);
                _enterInput('#paciente_SAL41');
            },
            cancel: () => {
                $('#paciente_SAL41').focus();
            }
        };
        F8LITE(parametros);
    }
}

function _ventanaTablatarifas_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        if ($_CLFACT == '0') {
            var ARTICULOS_SAL41 = [];
            let URL = get_url("APP/INVENT/INV803.DLL");
            postData({
                datosh: datosEnvio() + clfactMask.value + '|'
            }, URL)
                .then((data) => {
                    loader("hide");
                    ARTICULOS_SAL41 = data.ARTICULOS;
                    ARTICULOS_SAL41.pop();
                    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                        _ventanaDatos({
                            titulo: 'VENTANA TABLA DE TARIFAS',
                            columnas: ["LLAVE_ART", "DESCRIP_ART"],
                            data: ARTICULOS_SAL41,
                            callback_esc: function () {
                                // $("#").focus();
                                $('#codservicio2_SAL41').focus();
                            },
                            callback: function (data) {
                                $('#codservicio2_SAL41').val(data.LLAVE_ART.substring(1, 15));
                                $('#claseart_SAL41').val(data.LLAVE_ART.substring(15, 17));
                                _enterInput('#codservicio2_SAL41');
                            }
                        });
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {
            var ARTICULOS_SAL41 = [];
            let URL = get_url("APP/SALUD/SER802.DLL");
            postData({
                datosh: datosEnvio() + $_CODTABW + $_TIPOTABW
            }, URL)
                .then((data) => {
                    loader("hide");
                    ARTICULOS_SAL41 = data.TABLA;
                    ARTICULOS_SAL41.pop();
                    _ventanaDatos({
                        titulo: 'VENTANA TABLA DE TARIFAS',
                        columnas: ["COD", "TIPO", "COD_SER", "DESCRIP"],
                        data: ARTICULOS_SAL41,
                        callback_esc: function () {
                            $("#codservicio2_SAL41").focus();
                        },
                        callback: function (data) {

                            $_GRUPOFACT = data.COD_SER.substring(0, 2);
                            $('#codservicio2_SAL41').val(data.COD_SER);
                            _enterInput('#codservicio2_SAL41');
                        }
                    });

                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }
}

function _ventanaAlmacenes_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE ALMACENES',
            columnas: ["CODIGO", "DESCRIPCION", "COSTO"],
            data: SAL41.LOCALIZACION,
            callback_esc: function () {
                $("#almac_SAL41").focus();
            },
            callback: function (data) {
                $('#almac_SAL41').val(data.CODIGO);
                _enterInput('#almac_SAL41');
            }
        });
    }
}

function _ventanaEspecialidades_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE ESPECIALIDADES',
            columnas: ["CODIGO", "NOMBRE"],
            data: SAL41.ESPECIALIDADES,
            callback_esc: function () {
                $('#espec_SAL41').focus();
            },
            callback: function (data) {
                $('#espec_SAL41').val(data.CODIGO);
                _enterInput('#espec_SAL41');
            }
        });
    }
}

function _ventanaCostos_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE CONSULTA CENTRO DE COSTOS',
            columnas: ["COD", "NOMBRE", "DESCRIP"],
            data: SAL41.COSTO,
            callback_esc: function () {
                $('#ccostos_SAL41').focus();
            },
            callback: function (data) {
                $('#ccostos_SAL41').val(data.COD);
                $_COSTOFACT = data.COD;
                _enterInput('#ccostos_SAL41');
            }
        });
    }
}

function _ventanaProfesionales_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var PROFESIONALES_SAL41 = [];
        let URL = get_url("APP/SALUD/SER819.DLL");
        postData({
            datosh: datosEnvio()
        }, URL)
            .then((data) => {
                loader("hide");
                data.ARCHPROF.pop();
                PROFESIONALES_SAL41 = data.ARCHPROF;
                SAL41.ESPECFILTER = PROFESIONALES_SAL41.filter(x => {
                    for (var i in x.TAB_ESPEC) {
                        if (x.TAB_ESPEC[i].COD == SAL41.ESPECLAB) return x
                    }
                })
                if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                    _ventanaDatos({
                        titulo: 'VENTANA DE PROFESIONALES',
                        columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION"],
                        data: SAL41.ESPECFILTER,
                        callback_esc: function () {
                            $('#atend_SAL41').focus();
                        },
                        callback: function (data) {
                            $('#atend_SAL41').val(data.IDENTIFICACION.trim());
                            _enterInput('#atend_SAL41');
                        }
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

function _ventanaProfesionales2_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var PROFESIONALES_SAL41 = [];
        let URL = get_url("APP/SALUD/SER819.DLL");
        postData({
            datosh: datosEnvio()
        }, URL)
            .then((data) => {
                loader("hide");
                PROFESIONALES_SAL41 = data.ARCHPROF;
                PROFESIONALES_SAL41.pop();
                if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                    _ventanaDatos({
                        titulo: 'VENTANA DE PROFESIONALES',
                        columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION"],
                        data: PROFESIONALES_SAL41,
                        callback_esc: function () {
                            $('#solic_SAL41').focus();
                        },
                        callback: function (data) {
                            $('#solic_SAL41').val(data.IDENTIFICACION.trim());
                            _enterInput('#solic_SAL41');
                        }
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

function _ventanaProfesionales3_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var PROFESIONALES_SAL41 = [];
        let URL = get_url("APP/SALUD/SER819.DLL");
        postData({
            datosh: datosEnvio()
        }, URL)
            .then((data) => {
                loader("hide");
                PROFESIONALES_SAL41 = data.ARCHPROF;
                PROFESIONALES_SAL41.pop();
                _ventanaDatos({
                    titulo: 'VENTANA DE PROFESIONALES',
                    columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION"],
                    data: PROFESIONALES_SAL41,
                    callback_esc: function () {
                        $('#nitmedico_SAL41').focus();
                    },
                    callback: function (data) {
                        $('#nitmedico_SAL41').val(data.IDENTIFICACION.trim());
                        _enterInput('#nitmedico_SAL41');
                    }
                });
            })
            .catch((error) => {
                console.log(error)
            });
    }
}
////////////////////////////////// INICIO DEL CODIGO //////////////////////////////////////////////////

function _validarOpcion_SAL41() {
    OPCIONES = new Object;
    OPCIONES = {
        '09421': _Revisardato_41,
        '09422': _Datosucursal_41,
        '09423': _Clavedeacceso_41,
        '09426': _Clavedeacceso_41,
    }
    let active = $('#navegacion').find('li.opcion-menu.active');
    SAL41.OPCIONACTIVA = active[0].attributes[2].nodeValue;
    let Nombreopcion = {
        '09421': '9,4,1 - Elaboración de Facturas',
        '09422': '9,4,2 - Reimprimir de Facturas',
        '09423': '9,4,3 - Anular de Facturas',
        '09426': '9,4,6 - Corrección de Facturas',
    }
    nombreOpcion(Nombreopcion[SAL41.OPCIONACTIVA]);
    let opcion = new Function();
    opcion = OPCIONES[active[0].attributes[2].nodeValue];
    opcion();
}

function _Clavedeacceso_41() {
    var ventanaclaveacceso = bootbox.dialog({
        size: 'small',
        onEscape: false,
        title: 'CLAVE DE ACCESO',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="form-group"> ' +
            '<div class="col-md-12" id="VALIDAR1_VENTANA_SAL41"> ' +
            '<input id="claveacceso_SAL41" type="text" class="form-control input-md" data-orden="1" maxlength="6"> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanaclaveacceso.off('show.bs.modal');
                    if (SAL41.OPCIONACTIVA == '09426') {
                        // $_SUCFACT = $_SUCW = SAL41.PREFIJOUSU;
                        _leerimpresora450_SAL41();
                    } else {
                        _Datosucursal_41();
                    }
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanaclaveacceso.off('show.bs.modal');
                    _toggleNav();
                }
            }
        }
    });
    ventanaclaveacceso.init($('.modal-footer').hide(), _Evaluarventanaacceso_SAL41());
    ventanaclaveacceso.on('shown.bs.modal', function () {
        $("#claveacceso_SAL41").focus();
    });
}

function _Evaluarventanaacceso_SAL41() {
    validarInputs({
        form: "#VALIDAR1_VENTANA_SAL41",
        orden: '1'
    },
        () => { $('.btn-danger').click() },
        () => {
            SAL41.CLAVEACCESO = $('#claveacceso_SAL41').val();
            if (SAL41.CLAVEACCESO.trim() == $_USUA_GLOBAL[0].CLAVE.trim()) {
                $('.btn-primary').click();
            } else {
                CON851('03', '03', null, 'error', 'error');
                _Evaluarventanaacceso_SAL41();
            }
        }
    )
}

function _Revisardato_41() {
    if (parseInt(SAL41.MESLNK) > 12) {
        CON851('91', '91', null, 'error', 'error');
        _toggleNav();
    } else if ((SAL41.NITUSU == "0844003225") || (SAL41.MESLNK == "0845000038")) {
        $_BARRASUSU = "N";
    } else if (SAL41.LOTEFARMUSU != "S" || "N") {
        if ((SAL41.PUCUSU == "4") || (SAL41.PUCUSU == "6")) {
            $_LOTEFARM = "S";
            SAL41['LOTEFARM'] = 'S';
        } else {
            $_LOTEFARM = "N";
            SAL41['LOTEFARM'] = 'N';
        }
    } else if ((SAL41.PUCUSU == "4") || (SAL41.PUCUSU == "6")) {
        if (SAL41.CONTADOUSU == "S") {
            SAL41['CONTADOUSU'] = "N";
        }
    } else if (((SAL41.PUCUSU == "4") || (SAL41.PUCUSU == "6")) && (SAL41.CONTADOUSU == "S")) {
        SAL41['CONTADOUSU'] = "N";
    }

    // $_SALMINW = Math.round(SAL41.SALMINUSU / 30);
    $_SALMINW = SAL41.SALMINUSU / 30;
    SAL41['SALMINW'] = SAL41.SALMINUSU / 30;

    // $_VALORAPROX = Math.round($_SALMINW * 0.00117);
    $_VALORAPROX = $_SALMINW * 0.00117;
    var valormodw1 = $_VALORAPROX * 100;

    // $_VALORAPROX = Math.round($_SALMINW * 0.004610);
    $_VALORAPROX = $_SALMINW * 0.004610;
    var valormodw2 = $_VALORAPROX * 100;

    // $_VALORAPROX = Math.round($_SALMINW * 0.01215);
    $_VALORAPROX = $_SALMINW * 0.01215;
    var valormodw3 = $_VALORAPROX * 100;

    $_VLRMODW = [valormodw1, valormodw2, valormodw3];
    SAL41['VLRMODW'] = [valormodw1, valormodw2, valormodw3];
    _UndServicio_41();
}

function _UndServicio_41() {
    POPUP({
        array: SAL41.UNIDSERVICIO,
        titulo: "UNIDADES DE SERVICIO",
        indices: [
            { label: 'DESCRIP' }
        ],
        callback_f: _toggleNav
    },
        data => {
            if (SAL41.OPCIONACTIVA != '09426')
                _inputControl('reset');
            _inputControl('disabled');
            $_UNIDADES = data.COD;
            if ((SAL41.NITUSU == "0800037021") && (SAL41.ADMINW == "JASP") && (parseInt(data.COD) < 11)) {
                CON851('03', '03', null, 'error', 'Error');
                setTimeout(() => { _UndServicio_41() }, 300);
            } else {
                if (SAL41.OPCIONACTIVA == '09426') {
                    if (SAL41.NITUSU == '0845000038') {
                        if ($_CLFACT == '7') {
                            if (($_UNIDADSERV == '02') || ($_UNIDADSERV == '08') || ($_UNIDADSERV == '06')) {
                                _pago_41();
                            } else {
                                CON851('03', '03', null, 'error', 'Error');
                                setTimeout(() => { _UndServicio_41() }, 300);
                            }
                        } else {
                            _pago_41();
                        }
                    } else {
                        if ($_CLFACT == '7') {
                            if (($_UNIDADSERV == '02') || ($_UNIDADSERV == '08')) {
                                _pago_41();
                            } else {
                                CON851('03', '03', null, 'error', 'Error');
                                setTimeout(() => { _UndServicio_41() }, 300);
                            }
                        } else {
                            _pago_41();
                        }
                    }
                } else {
                    _Datosucursal_41();
                }
            }
            $_UNSER = data.COD + " " + data.DESCRIP;
            $_UNSERW = data.COD;
            SAL41['UNSERW'] = data.COD;
            SAL41['UNSER'] = data.COD + " " + data.DESCRIP;
            $_EDADMAXSERV = data.EDADMAX;
            $_UNDEDADMAXSERV = $_EDADMAXSERV.substring(0, 1);
            $_VLREDADMAXSERV = $_EDADMAXSERV.substring(1, 4);
            $_EDADMINSERV = data.EDADMIN;
            $_UNDEDADMINSERV = $_EDADMINSERV.substring(0, 1);
            $_VLREDADMINSERV = $_EDADMAXSERV.substring(1, 4);
            $_CCOSTOSERV = data.CENCOS;
            SAL41['EDADMAXSERV'] = data.EDADMAX;
            SAL41['UNDEDADMAXSERV'] = $_EDADMAXSERV.substring(0, 1);
            SAL41['VLREDADMAXSERV'] = $_EDADMAXSERV.substring(1, 4);
            SAL41['EDADMINSERV'] = data.EDADMIN;
            SAL41['UNDEDADMINSERV'] = $_EDADMINSERV.substring(0, 1);
            SAL41['VLREDADMINSERV'] = $_EDADMAXSERV.substring(1, 4);
            SAL41['CCOSTOSERV'] = data.CENCOS;
        });
}

function _leerimpresora450_SAL41() {
    let URL = get_url("APP/CONTAB/CON003A.DLL");
    postData({ datosh: datosEnvio() + SAL41.ADMINW + '|' }, URL)
        .then(data => {
            SAL41.ANOSIGLNK = SAL41.ANOLNK;
            SAL41.MESSIGLNK = SAL41.MESLNK;
            SAL41.DIASIGLNK = SAL41.DIALNK;
            SAL41.LLAVEMESLNK = SAL41.ANOSIGLNK = SAL41.ANOLNK + SAL41.MESSIGLNK;

            postData({
                datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`
            }, get_url("APP/CONTAB/CON007B.DLL"))
            .then(data => {
                console.debug(data);
                var date = data.split("|");
                SAL41.SEGW = date[1].substring(0, 1);
                if (SAL41.SEGW == "0" || SAL41.SEGW == "3" || SAL41.SEGW == "5") {
                    if (SAL41.PREFIJOUSU.trim() == '') {
                        SAL41.PREFIJOUSU = '00';
                        _Datosucursal_41();
                    } else {
                        _Datosucursal_41();
                    }
                }
            })
            .catch(error => {
                console.error(error);
                CON851('','Ocurrio un error con el usuario',null,'error','Error');
                _toggleNav();
            });
        })
        .catch(err => {
            console.debug(err);
            CON852(date[0], date[1], date[2], _toggleNav);
        })
}

function _Datosucursal_41() {
    let URL = get_url("app/CONTAB/CON003.DLL");
    postData({
        datosh: datosEnvio() + SAL41.ADMINW + '|'
    }, URL)
        .then((data) => {
            data = data.split('|');
            SAL41.NOMBREOPERW = data[0].trim();
            SAL41.IDENTOPERW = data[1].trim();
            SAL41.SUCOPERW = data[2].trim();
            let OBJECT = {
                '0844003225': ['JL', 'CA', 'CS', 'PV', 'BC', 'LC', 'CV', 'HT', 'EM', 'HY', 'TL', 'MR', '01'],
                '0800162035': ['01', '03', '05', '06', '07', '08', '10', '11', '12', '14', '15', '17'],
                '0830511298': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
                '0900405505': ['01', '02', '03', '04', '05', '06', '07', '08', '09'],
                '0900161116': ['01', '02', '03', '04'],
                '0900658867': ['01', '02', '03', '04', '05', '06', '07', '10'],
                '0900541158': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'],
                '0900566047': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                '0900565371': ['01', '02', '03', '04', '05', '06', '07', '10'],
                '0901120152': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
                '0800156469': ['00', '01', '02', '03'],
                '0900641654': ['00', '01', '02', '03', '04'],
                '0800037979': ['00', '01', '02', '03', '04'],
                '0830512772': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50'],
            }
            if (SAL41.PREFIJOUSU.trim() == '') SAL41.PREFIJOUSU == '00';
            if (SAL41.ADMINW == 'GEBC' || SAL41.ADMINW == 'ADMI') {
                _Datosucursal2_41();
            } else {
                let array = OBJECT[SAL41.NITUSU];
                if (array == undefined) _Datosucursal2_41();
                for (var i in array) {
                    if (SAL41.SUCOPERW == array[i]) {
                        SAL41.PREFIJOUSU = SAL41.SUCOPERW;
                        _Datosucursal2_41();
                        break;
                    } else if (i == array.length - 1) {
                        CON851('48', '48', null, 'error', 'Error');
                        _toggleNav();
                    }
                }
            }
        })
        .catch(error => {
            console.error(error)
            _toggleNav()
        });
}

function _Datosucursal2_41() {
    console.log('SAL41.PREFIJOUSU', SAL41.PREFIJOUSU)
    if (SAL41.OPCIONACTIVA == '09426') {
        $_SUCFACT = SAL41.PREFIJOUSU;
        $("#unidades_SAL41").val($_SUCFACT);
        if ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719')) {
            switch (SAL41.SUCOPERW) {
                case '01':
                    $_SUCFACT = '01';
                    $("#unidades_SAL41").val($_SUCFACT);
                    break;
                case '02':
                    $_SUCFACT = 'TB';
                    $("#unidades_SAL41").val($_SUCFACT);
                    break;
                case '03':
                    $_SUCFACT = 'KN';
                    $("#unidades_SAL41").val($_SUCFACT);
                    break;
                case '04':
                    $_SUCFACT = 'ZP';
                    $("#unidades_SAL41").val($_SUCFACT);
                    break;
                case '05':
                    $_SUCFACT = '80';
                    $("#unidades_SAL41").val($_SUCFACT);
                    break;
                case '06':
                    $_SUCFACT = 'IB';
                    $("#unidades_SAL41").val($_SUCFACT);
                    break;
                case '07':
                    $_SUCFACT = 'SO';
                    $("#unidades_SAL41").val($_SUCFACT);
                    break;
                case '08':
                    $_SUCFACT = 'SC';
                    $("#unidades_SAL41").val($_SUCFACT);
                    break;
                case '09':
                    $_SUCFACT = 'SC';
                    $("#unidades_SAL41").val($_SUCFACT);
                    break;
                case 'A':
                    $_SUCFACT = 'CS';
                    $("#unidades_SAL41").val($_SUCFACT);
                    break;
                case 'B':
                    $_SUCFACT = 'GT';
                    $("#unidades_SAL41").val($_SUCFACT);
                    break;
                case 'C':
                    $_SUCFACT = 'MS';
                    $("#unidades_SAL41").val($_SUCFACT);
                    break;
                case 'D':
                    $_SUCFACT = 'UN';
                    $("#unidades_SAL41").val($_SUCFACT);
                    break;
                case 'E':
                    $_SUCFACT = 'MA';
                    $("#unidades_SAL41").val($_SUCFACT);
                    break;
                case 'F':
                    $_SUCFACT = 'CZ';
                    $("#unidades_SAL41").val($_SUCFACT);
                    break;
                case 'G':
                    $_SUCFACT = 'CE';
                    $("#unidades_SAL41").val($_SUCFACT);
                    break;
                case 'H':
                    $_SUCFACT = 'CH';
                    $("#unidades_SAL41").val($_SUCFACT);
                    break;
                default:
                    break;
            }
            _Evaluarservicio_41();
        } else {
            _Evaluarservicio_41()
        }
    } else {
        $_SUCFACT = $_SUCW = SAL41.PREFIJOUSU;
        $("#unidades_SAL41").val($_SUCFACT);
        if ((SAL41.NITUSU == "0800162035") && (SAL41.PREFIJOUSU == "08")) SAL41.ALMPREF = "SIN99";
        if (SAL41.NITUSU == '0900658867' && $_SUCFACT == '10') $_BARRASUSU = 'S';
        if ((SAL41.NITUSU == "0844003225") && (SAL41.SUCOPERW.trim() == '')) {
            _Evaluarsuc_41();
        } else {
            _Evaluarservicio_41();
        }
    }

}

function _Evaluarsuc_41() {
    validarInputs({
        form: "#VALIDAR1_SAL41",
        orden: '1'
    },
        _toggleNav,
        () => {
            SAL41.SUCOPERW = $('#unidades_SAL41').val();
            if (SAL41.OPCIONACTIVA == '09426') {
                let OBJECT = {
                    '0830512772': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39']
                }
                var validacion = OBJECT['0830512772'][$_SUCFACT];
                if (array == undefined) _Evaluarservicio_41();
                if (validacion.length > 0) {
                    let URL = get_url("APP/SALUD/SAL450-01.DLL");
                    postData({ datosh: datosEnvio() + $_SUCFACT + '|' }, URL)
                        .then(data => {
                            _Evaluarservicio_41();
                        })
                        .catch(err => {
                            _Evaluarsuc_41();
                        })
                } else {
                    CON851('48', '48', null, 'error', 'Error');
                    _Evaluarsuc_41();
                }

            } else {
                if ((SAL41.SUCOPERW == "JL") || (SAL41.SUCOPERW == "CA") || (SAL41.SUCOPERW == "CS") || (SAL41.SUCOPERW == "PV") || (SAL41.SUCOPERW == "BC") || (SAL41.SUCOPERW == "LC") || (SAL41.SUCOPERW == "CV") || (SAL41.SUCOPERW == "HT") || (SAL41.SUCOPERW == "EM") || (SAL41.SUCOPERW == "HY") || (SAL41.SUCOPERW == "TL") || (SAL41.SUCOPERW == "MR") || (SAL41.SUCOPERW == "01")) {
                    _Evaluarservicio_41();
                } else {
                    CON851('48', '48', null, 'error', 'Error');
                    _toggleNav();
                }
            }
        }
    )
}

function _Agendaciondecitas_SAL41() {
    let { ipcRenderer } = require("electron");
    ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SAL7C11.html' });
    vector = ['on', 'Agendando una cita...']
    _EventocrearSegventana(vector, _Evaluarservicio_41);
}

function _Aperturafacturas_SAL41() {
    let { ipcRenderer } = require("electron");
    ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER108.html' });
    vector = ['on', 'Creando o modificando una factura...']
    _EventocrearSegventana(vector, _Evaluarservicio_41);
}

function _Triage_SA41(){
    let { ipcRenderer } = require("electron");
    ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER880.html' });
    vector = ['on', 'Triage...']
    _EventocrearSegventana(vector, _Evaluarservicio_41);
}

function _Evaluarservicio_41() {
    clfactMask.updateValue();
    if (SAL41.UNSERW == '08') clfactMask.typedValue = '7';
    let parametros = {
        estado: 'on',
        msg: [{
            mensaje: 'Oprima F1 para agendar una cita'
        }, {
            mensaje: 'Oprimar F7 para crear una factura'
        }
        ]
    }
    _FloatText(parametros);
    validarInputs({
        form: "#VALIDAR2_SAL41",
        orden: "1",
        event_f1: _Agendaciondecitas_SAL41,
        event_f2: _Triage_SA41,
        event_f7: _Aperturafacturas_SAL41
    },
        () => {
            var FUNCION = new Function();
            let OPCIONES = new Object;
            OPCIONES = {
                '09421': _Revisardato_41,
                '09422': _Evaluarsuc_41,
                '09423': _Evaluarsuc_41,
                '09426': _Evaluarsuc_41,
            }
            FUNCION = OPCIONES[SAL41.OPCIONACTIVA];
            FUNCION();
        },
        () => {
            _FloatText({ estado: 'off' });
            $_CLFACT = clfactMask.value;
            if (SAL41.OPCIONACTIVA == '09426') {
                let URL = get_url("APP/CONTAB/CON904S.DLL");
                postData({
                    datosh: datosEnvio() + SAL41.ADMINW + '|I41O|'
                }, URL)
                    .then((data) => {
                        loader("hide")
                        if (data.trim() == "00") {
                            if (($_CLFACT == '0') && (SAL41.SEGW == '3')) {
                                CON851B(SAL41.SEGW, _Evaluarsuc_41);
                            } else {
                                postData({ datosh: datosEnvio() + '8' + $_CLFACT.trim() + '|' }, get_url("APP/CONTAB/CON007.DLL"))
                                    .then(data => {
                                        var data = data.split("|");
                                        let ultimo = parseInt(data[1].substring(3, 9)) - 1
                                        $('#compr_SAL41').val(ultimo);
                                    })
                                    .catch(err => {
                                        console.debug(err);
                                    });
                                _vertipo_41();
                            }
                        } else {
                            SWOCULTAR = data[0].trim();
                            SWINVALID = 00;
                            $_OPSEGU = '';
                            postData({ datosh: datosEnvio() + '8' + $_CLFACT.trim() + '|' }, get_url("APP/CONTAB/CON007.DLL"))
                                .then(data => {
                                    var data = data.split("|");
                                    let ultimo = parseInt(data[1].substring(3, 9)) - 1
                                    $('#compr_SAL41').val(ultimo);
                                })
                                .catch(err => {
                                    console.debug(err);
                                });
                            _vertipo_41();
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        _Evaluaridhistoriafact_41();
                    });
            } else {
                if ($_CLFACT) {
                    SAL41.SERVICIOS.forEach(data => {
                        if ($_CLFACT == data.COD) {
                            $("#claseservicio_SAL41").val(data.COD + " - " + data.DESCRIPCION);
                            if (SAL41.OPCIONACTIVA == '09421') {
                                _Mostrartipo_41();
                            } else {
                                postData({ datosh: datosEnvio() + '8' + $_CLFACT.trim() + '|' }, get_url("APP/CONTAB/CON007.DLL"))
                                    .then(data => {
                                        var data = data.split("|");
                                        let ultimo = parseInt(data[1].substring(3, 9)) - 1
                                        $('#compr_SAL41').val(ultimo);
                                    })
                                    .catch(err => {
                                        console.debug(err);
                                    });
                                _Evaluarnumeroctl_41();
                            }
                        }
                    });
                } else {
                    CON851('03', '03', null, 'error', 'error');
                    _Evaluarservicio_41();
                }
            }
        }
    )
}

function _vertipo_41() {
    if ($_CLFACT) {
        SAL41.SERVICIOS.forEach(data => {
            if ($_CLFACT == data.COD) {
                $('#claseservicio_SAL41').val(data.COD + " - " + data.DESCRIPCION);
                let URL = get_url("APP/CONTAB/CON904.DLL");
                postData({ datosh: datosEnvio() + SAL41.ADMINW + '|I46X|' }, URL)
                    .then(data => {
                        _Evaluarnumeroctl_41()
                    })
                    .catch(err => {
                        _Evaluarservicio_41();
                    })
            }
        });
    } else {
        _Evaluarservicio_41();
    }
}

function _Mostrartipo_41() {
    if ($_UNSERW == "08") {
        if (($_CLFACT == "0") || ($_CLFACT == "7")) {
            _Revisarpermisos_41();
        } else {
            CON851('B1', 'B1', null, 'error', 'error');
            _Evaluarservicio_41();
        }
    } else {
        _Revisarpermisos_41();
    }
}

function _Revisarpermisos_41() {
    $_SWBLOQFECHA = "N";
    if ($_CLFACT == "0" && ((SAL41.NITUSU == "0892000401") || (SAL41.NITUSU == "0900648993") || (SAL41.NITUSU == "0800162035") || (SAL41.NITUSU == "0900755133") || (SAL41.NITUSU == "0900804411") || (SAL41.NITUSU == "0900870633")) && parseInt($_SUCFACT) < 2) $_SWBLOQFECHA = "S";
    if ((SAL41.NITUSU == '0891855847') || (SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) $_CANTMAX = "99";
    let URL = get_url("APP/CONTAB/CON904.DLL");
    postData({ datosh: datosEnvio() + localStorage.getItem('Usuario').trim() + '|' + "I41" + $_CLFACT + '|' }, URL)
        .then(data => {
            _Buscarnumero_41();
        })
        .catch(err => {
            console.error(err);
            _UndServicio_41();
        });
}

function _Buscarnumero_41() {
    if ((SAL41.NITUSU == "0830092718") || (SAL41.NITUSU == "0830092719") || (SAL41.NITUSU == "0900193162")) {
        $_SECUNUM2 = $_CLFACT;
        var contenido = ["KN", "TB", "ZP", "IN", "SO", "SC", "GT", "MS", "UN", "80", "MA", "CZ", "CE", "CH", "MD", "PT"];
        var secunum = ["K", "t", "z", "x", "s", "c", "g", "m", "u", "0", "m", "k", "l", "h", "d", "P"];
        for (i = 0; i < contenido.length; i++) {
            if ($_SUCFACT == contenido[i]) {
                $_SECUNUM1 = secunum[i];
                _infoCON007_01_41();
            }
            if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                $_SECUNUM1 = "8";
                _infoCON007_01_41();
            }
        }
    } else {
        $_SECUNUM2 = $_CLFACT;
        if ($_TIPO_COMP == "3  ") {
            $_SECUNUM1 = "6";
            _Evaluarnit_41();
        } else {
            $_SECUNUM1 = "8";
            _Evaluarnit_41();
        }
    }
}

function _Evaluarnit_41() {
    switch (SAL41.NITUSU) {
        case "0844003225":
            var contenido = ["01", "JL", "CA", "BC", "CV", "PV", "CS", "HY", "TL", "MR"];
            var secunum = ["8", "a", "c", "b", "v", "p", "s", "h", "i", "j"];
            for (i = 0; i < contenido.length; i++) {
                if ($_SUCFACT == contenido[i]) {
                    $_SECUNUM1 = secunum[i];
                } else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                }
            }
            _infoCON007_01_41();
            break;
        case "0800162035":
            var contenido = ["02", "03", "05", "06", "07", "08", "10", "11", "12", "14", "15", "17"];
            var secunum = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "con", "o", "p", "q", "r", "s"];
            for (i = 0; i < contenido.length; i++) {
                if ($_SUCFACT == contenido[i]) {
                    $_SECUNUM1 = secunum[i];
                } else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                }
            }
            _infoCON007_01_41();
            break;
        case "0900566047":
            var contenido = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
            var secunum = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s"];
            for (i = 0; i < contenido.length; i++) {
                if ($_SUCFACT == contenido[i]) {
                    $_SECUNUM1 = secunum[i];
                } else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                }
            }
            _infoCON007_01_41();
            break;
        case "0900658867":
            var contenido = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
            var secunum = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s"];
            for (i = 0; i < contenido.length; i++) {
                if ($_SUCFACT == contenido[i]) {
                    $_SECUNUM1 = secunum[i];
                } else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                }
            }
            _infoCON007_01_41();
            break;
        case "0900541148":
            var contenido = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
            var secunum = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s"];
            for (i = 0; i < contenido.length; i++) {
                if ($_SUCFACT == contenido[i]) {
                    $_SECUNUM1 = secunum[i];
                } else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                }
            }
            _infoCON007_01_41();
            break;
        case "0830512772":
            var contenido = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"];
            var secunum = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "W", "V", "X", "Y"];
            for (i = 0; i < contenido.length; i++) {
                if ($_SUCFACT == contenido[i]) {
                    $_SECUNUM1 = secunum[i];
                } else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                }
            }
            _infoCON007_01_41();
            break;
        default:
            _infoCON007_01_41();
            break;
    }
}

function _infoCON007_01_41() {
    $_SECUNUM = $_SECUNUM1 + $_SECUNUM2;
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + $_SECUNUM }, URL)
        .then(data => {
            var data = data.split("|");
            SAL41['ULTFECHANUM'] = data[2].trim();
            SAL41['NUMEROCTL'] = data[1].substring(3, 9);
            SAL41['NROFACT'] = SAL41.NUMEROCTL;
            if ((SAL41.NITUSU == "0900193162") || (SAL41.NITUSU == "0830512772")) {
                _Leernumero_41();
            } else {
                if (parseInt(SAL41.NUMEROCTL) < 1000) {
                    let URL = get_url("APP/SALUD/SAL401C.DLL");
                    postData({ datosh: datosEnvio() + SAL41.SUCOPERW + $_CLFACT + SAL41.NROFACT }, URL)
                        .then(data => {
                            data = data.CONSULTA
                            data.pop();
                            SAL41.NUMEROFACTLNK = data.LLAVE;
                            SAL41.FECHAANT = SAL41.ULTFECHANUM;
                            _Leernumero_41()
                        })
                        .catch(err => {
                            console.debug(err);
                        })
                } else {
                    SAL41.FECHAANT = SAL41.ULTFECHANUM
                    $("#compr_SAL41").val(SAL41.NUMEROCTL);
                    _Leernumero_41();
                }
            }
        })
        .catch(err => {
            console.debug(err);
        })
}

function _Leernumero_41() {
    if ((SAL41.NITUSU == "0891855847") && ($_ANOLNK == "10")) {
        _Evaluarnumeroctl_41();
    } else {
        $("#compr_SAL41").val(SAL41.NROFACT);
        _validarnumeroctl_SAL41();
    }
}

function _Evaluarnumeroctl_41() {
    validarInputs({
        form: "#COMPR_41",
        orden: "1"
    },
        _Evaluarservicio_41,
        _validarnumeroctl_SAL41
    )
}

function _validarnumeroctl_SAL41() {
    SAL41.NROFACT = $('#compr_SAL41').val().padStart(6, '0');
    SAL41.LLAVEFACT = $_SUCFACT + $_CLFACT + SAL41.NROFACT;
    _Releerrips_41();
    SAL41.BLOQUEADAW = '';
    if (SAL41.OPCIONACTIVA == '09421') {
        let datos_envio = datosEnvio()
        datos_envio += SAL41.ADMINW + "|" + $_SUCFACT + $_CLFACT + SAL41.NROFACT.padStart(6, '0');
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_01, get_url('APP/SALUD/SAL41-01.DLL'));
    } else {
        let URL = get_url("APP/SALUD/SAL450A.DLL");
        postData({ datosh: datosEnvio() + $_SUCFACT + $_CLFACT + SAL41.NROFACT.padStart(6, '0') + '|' }, URL)
            .then(data => {
                $('#TABLA_401 tbody').remove();
                $('#TABLA_401').append('<tbody></tbody>');
                _mostrardatoscompletos_SAL41(data);
            })
            .catch(err => {
                console.debug(err);
                _Evaluarnumeroctl_41();
            })
    }
}

function _mostrardatoscompletos_SAL41(data) {
    SAL41.FACTURA = data.FACTURA[0];
    $('#compr_SAL41').val(SAL41.FACTURA.NRO);
    $('#factura_SAL41').val(SAL41.FACTURA.PREFIJO);
    $('#facturad_SAL41').val(SAL41.FACTURA.NRO_CTA);
    $('#pingreso_SAL41').val(SAL41.FACTURA.PUERTA_ESTAD + ' - ' + SAL41.FACTURA.DESCRIP_PUERTA);
    $('#cliente_SAL41').val(SAL41.FACTURA.NIT);
    $('#cliented_SAL41').val(SAL41.FACTURA.DESCRIP_TER);
    idhistoriafactMask.typedValue = SAL41.FACTURA.ID_PACIENTE;
    // $('#paciente_SAL41').val(SAL41.FACTURA.ID_PACIENTE);
    $('#paciented_SAL41').val(SAL41.FACTURA.DESCRIP_PACI);
    $('#sexo_SAL41').val(SAL41.FACTURA.SEXO);
    $('#edad_SAL41').val(SAL41.FACTURA.EDAD);
    PriceContMask_41.typedValue = SAL41.FACTURA.VALOR_BRUTO;
    CopagoMask2.typedValue = SAL41.FACTURA.COPAGO_ESTIM_PAGO;
    NetoFactMask_41.typedValue = SAL41.FACTURA.VALOR_TOTAL;
    $('#espec_SAL41').val(SAL41.FACTURA.ESPEC);
    $('#despec_SAL41').val(SAL41.FACTURA.DESCRIP_ESPEC);
    $('#ccostos_SAL41').val(SAL41.FACTURA.COSTO_FACT);
    $('#dcostos_SAL41').val(SAL41.FACTURA.DESCRIP_TAR);
    $('#atend_SAL41').val(SAL41.FACTURA.MED_OTR_FACT);
    $('#datend_SAL41').val(SAL41.FACTURA.DESCRIP_MED1);
    $('#solic_SAL41').val(SAL41.FACTURA.REMITE_FACT);
    $('#dsolic_SAL41').val(SAL41.FACTURA.DESCRIP_MED2);
    $('#estrato_SAL41').val(SAL41.FACTURA.ESTRATO);
    $('#ciudad_SAL41').val(SAL41.FACTURA.CIUDAD_PACI);
    $('#fecha_SAL41').val(SAL41.FACTURA.FECHA)
    $_FECHAFACT = SAL41.FACTURA.FECHA;
    $_ANOFACT = $_FECHAFACT.substring(2, 4);
    $_MESFACT = $_FECHAFACT.substring(4, 6);
    $_MESW = $_MESFACT;
    $_DIAFACT = $_FECHAFACT.substring(6, 8);
    $_FECHAFACT = moment($_FECHAFACT).format("YYYY-MM-DD");
    SAL41.ANOFACT = SAL41.FACTURA.FECHA.substring(0, 4)
    SAL41.MESFACT = SAL41.FACTURA.FECHA.substring(4, 6)
    SAL41.DIAFACT = SAL41.FACTURA.FECHA.substring(6, 8)
    $_UNIDADSERV = SAL41.FACTURA.UNIDAD_SERVICIO;
    $_PUERTAINGW = SAL41.FACTURA.PUERTA_ESTAD;
    $_PREFIJOFACT = SAL41.FACTURA.PREFIJO;
    $_NITTER = SAL41.FACTURA.NIT.trim();
    // $_FECHAFACT = fechaMask.value;
    $_FECHASIGFACT = moment($_FECHAFACT).format("YYYYMMDD");
    $_NROCTAFACT = SAL41.FACTURA.NRO_CTA;
    SAL41.LLAVEFACT = $('#unidades_SAL41').val() + $('#claseservicio_SAL41').val().substring(0, 1) + $('#compr_SAL41').val();
    $_DESCRIPPROF = SAL41.FACTURA.DESCRIP_MED1;
    $_DESCRIPPROF2 = SAL41.FACTURA.DESCRIP_MED2;
    SAL41.ESPECLAB = SAL41.FACTURA.ESPEC;
    $_NOMBREESP = SAL41.FACTURA.DESCRIP_ESPEC
    $_COSTOFACT = SAL41.FACTURA.CCOSTO
    $_NOMBRECOSTO = SAL41.FACTURA.NOMBRE_COSTO;
    SAL41.IDHISTORIAFACT = SAL41.FACTURA.ID_PACIENTE;
    $_DESCRIPPACI = SAL41.FACTURA.DESCRIP_PACI;
    $_EDAD = SAL41.FACTURA.EDAD;
    $_SEXOPACI = SAL41.FACTURA.SEXO;
    $_EPSPACI = SAL41.FACTURA.EPS_PACI;
    $_DETALLEFACT = SAL41.FACTURA.DETALLE_FACT;
    $_NROAUTORELAB = SAL41.FACTURA.NRO_AUTOR_ELAB;
    $_CIUDADPACI = SAL41.FACTURA.CIUDAD_PACI;
    SAL41.OCUPACION = SAL41.FACTURA.OCUP_PACI;
    SAL41.ZONAPACI = SAL41.FACTURA.ZONA_PACI;
    $_COSTOFACT = SAL41.FACTURA.COSTO_FACT;
    $_VALORTOTAL = SAL41.FACTURA.VALOR_TOTAL.replace(/,/g, '');
    // for (var i in SAL41.FACTURA.TABLA) {
    //     console.log(SAL41.FACTURA.TABLA[i].CANTIDAD)
    //     SAL41.FACTURA.TABLA[i].CANTIDAD = SAL41.FACTURA.TABLA[i].CANTIDAD.trim().replace(/./g, '')
    //     SAL41.FACTURA.TABLA[i].VALOR_FACT = SAL41.FACTURA.TABLA[i].VALOR_FACT.trim().replace(/,/g, '')
    // }
    $TABLAFACT = SAL41.FACTURA.TABLA;
    $_PUERTAESTAD = SAL41.FACTURA.PUERTA_ESTAD;
    $_FECHASALESTAD = SAL41.FACTURA.FECHA_SAL_ESTAD;
    $_HRELABFACT = SAL41.FACTURA.HORA_ELAB.substring(0, 2);
    $_MNELABFACT = SAL41.FACTURA.HORA_ELAB.substring(2, 4);
    $_HORAFACT = SAL41.FACTURA.HORA_ELAB;
    $_HORAFACT = moment($_HORAFACT).format('HH:mm');
    $_VLRIVAFACT = SAL41.FACTURA.VALOR_IVA;
    $_COPAGOESTIMFACT = parseInt(SAL41.FACTURA.COPAGO_ESTIM_PAGO.replace(/,/g, ''));
    $_SALDO = SAL41.FACTURA.VALOR_BRUTO.replace(/,/g, '');
    $_OPERELABFACT = SAL41.FACTURA.OPER_ELAB;
    $_PERSONALELAB = SAL41.FACTURA.PERSONAL_ELAB;
    $_CELPACI = SAL41.FACTURA.CEL_PACI;
    $_DIRECCPACI = SAL41.FACTURA.DIRECC_PACI;
    $_CTRLMESFACT = SAL41.FACTURA.CTRLFACT;
    SAL41.CODCIUTER = SAL41.FACTURA.CODCIUTER;
    SAL41.ACOMPAPACI = SAL41.FACTURA.ACOMPA_PACI;
    SAL41.NOMBREENF1 = SAL41.FACTURA.NOMBRE_ENF1;
    SAL41.NOMBREENF2 = SAL41.FACTURA.NOMBRE_ENF2;
    $_VLRTOTEDIT = SAL41.FACTURA.VALOR_TOTAL.replace(/,/g, '');
    SAL41.ESTADONUM = SAL41.FACTURA.ESTADO_NUM;
    SAL41.OPERBLOQNUM = SAL41.FACTURA.OPER_BLOQ_NUM;
    $_MACROFACT = SAL41.FACTURA.MACRO_FACT;
    $_TARIFFACT = SAL41.FACTURA.TARIF;
    $_TARIFFACTW = $_TARIFFACT;
    $_PREFIJOW = $_PREFIJOFACT;
    $_EDADELAB = SAL41.FACTURA.EDAD_ELAB;
    SAL41.EDAD = new Object;
    SAL41.EDAD.unid_edad = $_EDADELAB.substring(0, 1);
    SAL41.EDAD.vlr_edad = $_EDADELAB.substring(1, 4)

    if (SAL41.FACTURA.CLASE == '1') {
        var prof = ['CIRUJANO', 'AYUDANTIA', 'ANESTESIOA', 'MAT.QUIRG', 'DERECH.SALA'];
        for (var i in prof) {
            $('#TABLA_401 tbody').append(
                '<tr>' +
                '<td style="width: 5%;">' + ' ' + '</td>' +
                '<td style="width: 10%;">' + ' ' + '</td>' +
                '<td style="width: 30%;">' + ' ' + '</td>' +
                '<td style="width: 10%;">' + ' ' + '</td>' +
                '<td style="width: 10%;">' + prof[i] + '</td>' +
                '<td style="width: 10%;">' + ' ' + '</td>' +
                '<td style="width: 10%;">' + ' ' + '</td>' +
                '<td style="width: 15%;">' + ' ' + '</td>' +
                '</tr>'
            )
        }
    } else {
        for (var i in SAL41.FACTURA.TABLA) {
            console.log(SAL41.FACTURA.TABLA[i].CANTIDAD);
            if (SAL41.FACTURA.TABLA[i].ARTICULO.trim().length > 0) {
                $('#TABLA_401 tbody').append('' +
                    '<tr>' +
                    '   <td style="width: 5%;">' + SAL41.FACTURA.TABLA[i].POSICION + '</td>' +
                    '   <td style="width: 10%;">' + SAL41.FACTURA.TABLA[i].ARTICULO + '</td>' +
                    '   <td style="width: 30%;">' + SAL41.FACTURA.TABLA[i].DESCRIP_ART + '</td>' +
                    '   <td style="width: 10%;">' + SAL41.FACTURA.TABLA[i].ALMACEN + '</td>' +
                    '   <td style="width: 10%;">' + SAL41.FACTURA.TABLA[i].CANTIDAD + '</td>' +
                    '   <td style="width: 10%;">' + SAL41.FACTURA.TABLA[i].UNIDAD + '</td>' +
                    '   <td style="width: 10%;">' + SAL41.FACTURA.TABLA[i].VALOR_UNIT + '</td>' +
                    '   <td style="width: 15%;">' + SAL41.FACTURA.TABLA[i].VALOR_FACT + '</td>' +
                    '</tr>'
                )
            }
        }
    }
    SAL41.UNIDSERVICIO.forEach(item => {
        if (item.COD == SAL41.FACTURA.UNIDAD_SERVICIO) $_UNSER = item.COD + ' ' + item.DESCRIP;
    });
    let opcion2 = new Function();
    let OPCIONES2 = {
        '09422': _Imprimir9_41,
        '09423': _Confirmarborrar_SAL41,
        '09426': _validaciones450_SAL41
    };
    opcion2 = OPCIONES2[SAL41.OPCIONACTIVA];
    opcion2();
}

////////////////////CORRECCION DE FACTURA///////////////////////////////
function _validaciones450_SAL41() {
    console.log('validaciones SAL450 buscar-numero')
    $_UNSERW = $_SUCFACT;
    $_UNSERVFACT = $_UNSERW;
    SAL41.LLAVEFACT = $_SUCFACT + $_CLFACT + SAL41.NROFACT.padStart(6, '0');
    SAL41.DATOAUDW = SAL41.LLAVEFACT;
    SAL41.SWSTEP = '1';
    SAL41.REGANT = SAL41.LLAVEFACT;
    $_ANOSIGFACT = SAL41.ANOFACT;
    $_MESSIGFACT = SAL41.MESFACT;
    $_DIASIGFACT = SAL41.DIAFACT;

    $_FECHAACT = moment().format('YYMMDD');
    $_ANOACT = $_FECHAACT.substring(0, 2);
    $_MESACT = $_FECHAACT.substring(2, 4);
    $_DIAACT = $_FECHAACT.substring(4, 6);

    SAL41.LLAVEMESFACT = SAL41.ANOFACT + SAL41.MESFACT;
    $_CONVENIONUM = '';

    if ($_PREFIJOFACT == 'R') {
        let datos_envio = datosEnvio() + $_NITFACT + '|';
        SolicitarDll({ datosh: datos_envio }, data => {
            console.debug(data, 'TERCEROS');
            var date = data.split("|");
            var swinvalid = date[0];
            $_DESCRIPTER = date[2];
            $_ACTTER = date[3];
            $_DESCRIPTER2 = date[4];
            $_CONVENIOTER = date[5];
            if (SWINVALID == "00") {
                $_CONVENIONUM = $_CONVENIOTER;
                $_CODTAR = $_CONVENIOTER;
                _Revisarpermisos2_41();
            } else if (SWINVALID == "01") {
                $_CONVENIOTER = "SO";
                _Revisarpermisos2_41();
            }
        }, get_url('APP/SALUD/SER108-05.DLL'))

    } else {
        if (($_PREFIJOFACT == 'E') || ($_PREFIJOFACT == 'C')) {
            $_FECHAINGNUM = '';
            $_ESTADONUM = 0;
            $_CODTAR = "CL";
            $_CONVENIONUM = "CL";
            let datos_envio = datosEnvio() + $_CODTAR + '|';
            SolicitarDll({ datosh: datos_envio }, data => {
                console.debug(data, 'TARIFAS');
                var date = data.split("|");
                var SWINVALID = date[0].trim();
                if (SWINVALID == "01") {
                    $_CODTAR = "SO";
                    // } if ((($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "P") || ($_PREFIJOFACT == "T") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") ||
                    //     ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") ||
                    //     ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) || ($_NROCTAFACT == 0)) {
                    //     _buscarnrocontado_41();
                    //     $_DESCRIPNUM = '';
                }
                console.log('REVISARPERMISOS')
                _Revisarpermisos2_41();
            }, get_url('APP/SALUD/SER108-06.DLL'))
        } else {
            _Revisarpermisos2_41();
            console.log('LEER CUENTA')
            // _Leercuenta_450();
        }
    }
    // console.log('PERFORM LEER-CONVENIO')
    // setTimeout(_Leerconvenio_41, 300);
}

function _Revisarpermisos2_41() {
    console.log('_Revisarpermisos2_41 SAL450')
    // _llenarpantalla();
    // _Total_41();
    // _Editarabono_41();

    SAL41.SWSTEP = '2';
    if ($_CLFACT == '0') {
        $_OPSEGU = "I460" + $_PREFIJOFACT;
        let datos_envio = datosEnvio()
        datos_envio += SAL41.ADMINW + '|' + $_OPSEGU
        let URL = get_url("APP/CONTAB/CON904.DLL");
        postData({ datosh: datos_envio }, URL)
            .then(function (data) {
                if (($_CLFACT == 0) && ((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0800162035') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) && ($_SUCFACT < 02)) {
                    $_SWBLOQFECHA = "S";
                    _mostrarpaciente_SAL41();
                } else {
                    $_SWBLOQFECHA = "N";
                    _mostrarpaciente_SAL41();
                }
            })
            .catch(err => {
                console.debug(err);
                _Evaluarservicio_41();;
            })


    } else if ((SAL41.NITUSU == "0891855847") && (parseInt(SAL41.NROORDENFAT) > 0)) {
        CON851('6N', '6N', null, 'error', 'error');
        $_OPSEGU = "IS4A19";
        let URL = get_url("APP/CONTAB/CON904.DLL");
        postData({ datosh: datos_envio }, URL)
            .then(function (data) {
                _mostrarpaciente_SAL41();
            })
            .catch(err => {
                console.debug(err);
                _Evaluarservicio_41();;
            })
    } else {
        console.log('mostrarpaciente')
        _mostrarpaciente_SAL41()
    }
}

function _mostrarpaciente_SAL41() {
    console.log('mostrar paciente  sal450')
    if ((SAL41.ANOFACT != SAL41.ANOLNK) && ($_MESACT == 01)) {
        _Validarfechaopago_41();
    } else if ($_TIPO1COMP == '3') {
        $_ESTADONUM = '0';
        _mostrarpaciente2_SAL41();
    } else {
        if (($_PREFIJOFACT == 'E') || ($_PREFIJOFACT == 'C')) {
            $_ESTADONUM = '0';
            _mostrarpaciente2_SAL41();
        } else {
            $_PREFIJONUM = $_PREFIJOFACT;
            $_NRONUM = $_NROCTAFACT;
            let datos_envio = datosEnvio() + '|' + $_PREFIJONUM + '|' + $_NRONUM;
            console.log(datos_envio, 'datos_envio')
            SolicitarDll({ datosh: datos_envio }, data => {
                console.debug(data, 'NUMERACION');
                var date = data.split("|");
                var SWINVALID = date[0].trim();
                $_FECHAINGNUM = date[11].trim();
                $_ANOINGNUM = $_FECHAINGNUM.substring(0, 4);
                $_MESINGNUM = $_FECHAINGNUM.substring(4, 6);
                $_LLAVEMESINGNUM = $_ANOINGNUM + $_MESINGNUM;
                $_ESTADONUM = date[12].trim();
                if (SWINVALID == "00") {
                    _mostrarpaciente2_SAL41();
                } else if (SWINVALID == "01") {
                    CON851('01', '01', null, 'error', 'error');
                    $_ESTADONUM = '1';
                    if ($_ESTADONUM == '1') {
                        CON851('30', 'PACIENTE RETIRADO', null, 'error', 'error');
                        if (SAL41.ADMINW == "ADMI" || SAL41.ADMINW == "GEBC") {
                            _mostrarpaciente2_SAL41();
                        } else {
                            _Evaluarnumeroctl_41();
                        }
                    }
                }
            }, get_url('APP/SALUD/SAL41-02.DLL'));
        }
    }
}

function _mostrarpaciente2_SAL41() {
    console.log('_mostrarpaciente2_SAL41');
    if ((SAL41.ANOFACT == SAL41.ANOLNK) && (SAL41.MESFACT == SAL41.MESLNK)) {
        console.log('validaciones de anofact y anolnk')
        _mostrarpaciente3_SAL41();
    } else {
        if (SAL41.SWSTEP == '2') {
            CON851('91', '91', null, 'error', 'error');
            if ($_CLFACT == '0') {
                let URL = get_url("APP/CONTAB/CON904S.DLL");
                postData({
                    datosh: datosEnvio() + SAL41.ADMINW + '|I46FE|'
                }, URL)
                    .then((data) => {
                        loader("hide")
                        if (data.trim() == '00') {
                            _mostrarpaciente3_SAL41()
                        } else {
                            _Evaluarnumeroctl_41()
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        _Evaluarnumeroctl_41();
                    });
            } else if ($_CLFACT > 0) {
                console.log('CLFACT MAYOR')
                if ((SAL41.NITUSU == '0900566047') || (SAL41.NITUSU == '0900541158') ||
                    (SAL41.NITUSU == '0900565371') || (SAL41.NITUSU == '0900566047')) {
                    let URL = get_url("APP/CONTAB/CON904S.DLL");
                    postData({
                        datosh: datosEnvio() + SAL41.ADMINW + '|I46FE|'
                    }, URL)
                        .then((data) => {
                            loader("hide")
                            if (data.trim() == '00') {
                                _mostrarpaciente3_SAL41()
                            } else {
                                _Evaluarnumeroctl_41()
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            _Evaluarnumeroctl_41();
                        });
                } else {
                    console.log('validaciones mes mal')
                    if ((SAL41.ADMINW == 'GEBC' || SAL41.ADMINW == 'ADMI') || ($_PREFIJOFACT == 'A' || $_PREFIJOFACT == 'B' || $_PREFIJOFACT == 'D' ||
                        $_PREFIJOFACT == 'F' || $_PREFIJOFACT == 'G' || $_PREFIJOFACT == 'H' || $_PREFIJOFACT == 'I' || $_PREFIJOFACT == 'J' || $_PREFIJOFACT == 'K' ||
                        $_PREFIJOFACT == 'L' || $_PREFIJOFACT == 'M' || $_PREFIJOFACT == 'N' || $_PREFIJOFACT == 'O' || $_PREFIJOFACT == 'Q' || $_PREFIJOFACT == 'R' ||
                        $_PREFIJOFACT == 'S' || $_PREFIJOFACT == 'W' || $_PREFIJOFACT == 'X' || $_PREFIJOFACT == 'Y' || $_PREFIJOFACT == 'Z' || $_PREFIJOFACT == 'V' ||
                        $_PREFIJOFACT == 'U') && ((SAL41.LLAVEMESLNK == $_LLAVEMESINGNUM) || (SAL41.LLAVEMESLNK == SAL41.LLAVEMESFACT))) {
                        // continue
                        _mostrarpaciente3_SAL41();
                    } else {
                        _Evaluarnumeroctl_41()
                    }
                }
            }
        } else {
            _mostrarpaciente3_SAL41();
        }
    }
}

function _mostrarpaciente3_SAL41() {
    console.log('_mostrarpaciente3_SAL4');
    if ((SAL41.NITUSU == '0800037021') && (SAL41.ADMINW == 'JASP') && ($_OPERELABFACT != SAL41.ADMINW)) {
        CON851('15', '15', null, 'error', 'Error');
        _Evaluarnumeroctl_41();
    } else if ((SAL41.NITUSU == '0800037021') && (SAL41.ADMINW == 'JASP') && ($_UNIDADSERV == '11')) {
        CON851('03', '03', null, 'error', 'Error');
        // GO TO DATO-UNIDAD.
        _UndServicio_41();
    } else {
        console.log('mostrar fecha')
        _Validarfechaopago_41();
    }
}

////////VA A MOSTRAR FECHA/////////////

////////UNIDADDESERVICIO//////////////

function _pago_41() {
    $_FECHASIGATEN = $_FECHAINGESTAD.substring(0, 4) + $_FECHAINGESTAD.substring(5, 7) + $_FECHAINGESTAD.substring(8, 10);
    console.log('PAGO-llegade unidad de servicios');
    if ($_PREFIJOFACT == 'E') {
        $_PREFIJOFACT = 'E';
        _mostrarpago_450()
    } else {
        if ($_TIPO1COMP == '3') {
            $_PREFIJOFACT = 'R';
            _mostrarpago_450()
        } else {
            console.log('va ir prefijo factura 450')
            validarInputs({
                form: "#FACTURA_41",
                orden: '1'
            },
                () => { _toggleNav(); },
                () => {
                    $_PREFIJOFACT = $("#factura_SAL41").val();
                    $_PREFIJOFACT = $_PREFIJOFACT.substring(0, 1);
                    _mostrarpago_450();
                })
        }
    }
}

function _mostrarpago_450() {
    console.log('MOSTRAR PAGO 450')
    if ($_TIPO1COMP == '3') {
        _Ubicarcuenta_41();
    } else {
        if ($_PREFIJOFACT == "E" || $_PREFIJOFACT == "C" || $_PREFIJOFACT == "A" || $_PREFIJOFACT == "P" || $_PREFIJOFACT == "T" ||
            $_PREFIJOFACT == "B" || $_PREFIJOFACT == "D" || $_PREFIJOFACT == "F" || $_PREFIJOFACT == "G" || $_PREFIJOFACT == "H" || $_PREFIJOFACT == "I" || $_PREFIJOFACT == "J" ||
            $_PREFIJOFACT == "K" || $_PREFIJOFACT == "L" || $_PREFIJOFACT == "M" || $_PREFIJOFACT == "N" || $_PREFIJOFACT == "O" || $_PREFIJOFACT == "Q" || $_PREFIJOFACT == "R" ||
            $_PREFIJOFACT == "S" || $_PREFIJOFACT == "W" || $_PREFIJOFACT == "X" || $_PREFIJOFACT == "Y" || $_PREFIJOFACT == "Z" || $_PREFIJOFACT == "V") {
            $_FECHAFACT.replace(/-/g, '');
            if (($_PREFIJOFACT == "E") && (SAL41.CONTADOUSU == "N") && (parseInt($_FECHAFACT) < 20060601)) {
                $_PREFIJOFACT = "C";
                console.log('va ir ubicar cuenta')
                _Ubicarcuenta_41();
            } else {
                console.log('va ir ubicar cuenta')
                _Ubicarcuenta_41();
            }
        } else {
            if (SAL41.SWSTEP == '2') {
                CON851('03', '03', null, 'error', 'Error');
                if ($_PREFIJOW == "E") {
                    _Evaluarfecha_41()
                    console.log('va ir fecha')
                } else {
                    console.log('se devuelve a pago')
                    _pago_41();
                }
            } else {
                console.log('va ir ubicar cuenta')
                _Ubicarcuenta_41();
            }
        }
    }
}

////UBICAR CUENTA SE REUTILIZA CODIGO 401////// 

function _aceptarcuenta_450() {
    console.log('ACEPTAR-CUENTA SAL450');
    if ((SAL41.NITUSU == '0830092718' || SAL41.NITUSU == '0830092719') && ($_COPAGOESTIMFACT > 0)) {
        _Leerconvenio_41();
    } else {
        console.log('voy a evaluar nro factura')
        _Evaluarnrofact_41()
    }
}

function _Leercuenta_450() {
    console.log('LEER CUENTA 450', $_PREFIJOFACT)
    // $('#factura_SAL41').val($_PREFIJOFACT);
    if ((SAL41.BLOQUEADAW == '1') && (SAL41.ADMIN != SAL41.OPERBLOQNUM)) {
        _Evaluarnumeroctl_41()
    } else if ($_NROCTAFACT == 0) {
        console.log('vacio NROCTAFACT va ir PAGO450')
        _pago_41();
    }

    if ($_PREFIJOFACT == 'R') {
        let datos_envio = datosEnvio() + SAL41.ADMINW + '|' + $_NITFACT + '|';
        SolicitarDll({ datosh: datos_envio }, data => {
            console.debug(data, 'TERCEROS');
            var date = data.split("|");
            var SWINVALID = date[0].trim();
            $_CONVENIOTER = date[5].trin();
            SAL41.CODCIUTER = data[7].trim();
            if (SWINVALID == "00") {
                $_CONVENIOTER = $_TARIFFACT;
                _Leerconvenio_41();
            } else if (SWINVALID == "01") {
                $_CONVENIOTER = $_TARIFFACT;
                _validacionnumeracion_SAL41()
            } else {
                CON852(date[0], date[1], date[2], _toggleNav)
            }
        }, get_url('APP/SALUD/SAL41-04.DLL'));

    } else {
        if (($_PREFIJOFACT == 'E') || ($_PREFIJOFACT == 'C')) {
            $_ESTADONUM = '0';
            $_CONVENIONUM = 'CL';
            _validacionnumeracion_SAL41()
        } else {
            console.log('CONSULTA PREFIJO NUM')
            $_PREFIJONUM = $_PREFIJOFACT;
            $_NRONUM = $_NROCTAFACT;
            let datos_envio = datosEnvio() + '|' + $_PREFIJONUM + '|' + $_NRONUM + '|';
            SolicitarDll({ datosh: datos_envio }, data => {
                console.debug(data, 'NUMERACION');
                var date = data.split("|");
                var SWINVALID = date[0].trim();
                $_FECHAINGNUM = date[11].trim();
                $_ANOINGNUM = $_FECHAINGNUM.substring(0, 4);
                $_MESINGNUM = $_FECHAINGNUM.substring(4, 6);
                $_LLAVEMESINGNUM = $_ANOINGNUM + $_MESINGNUM;
                $_ESTADONUM = date[12].trim();
                $_IDPACNUM = date[14].trim();
                $_CONVENIONUM = date[18].trim();
                if (SWINVALID == "00") {
                    _validacionnumeracion_SAL41();
                } else if (SWINVALID == "01") {
                    CON851('01', '01', null, 'error', 'error');
                    if ((SAL41.ADMINW == 'ADMI') || (SAL41.ADMINW == 'GEBC')) {
                        _validacionnumeracion_SAL41();
                    } else {
                        if (SAL41.SWSTEP == '1') {
                            _Evaluarnumeroctl_41();
                        } else {
                            _pago_41();
                        }
                    }
                }
            }, get_url('APP/SALUD/SAL41-02.DLL'));
        }
    }
}

function _validacionnumeracion_SAL41() {
    if (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') ||
        ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) {
        if ((SAL41.LLAVEMESLNK == $_LLAVEMESINGNUM) || (SAL41.LLAVEMESLNK == SAL41.LLAVEMESFACT)) {
            _validacionnumeracion2_SAL41();
        } else {
            CON851('91', 'FACTURA DE OTRO MES !', null, 'error', 'Error');
            if ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0845000038')) {
                if (SAL41.ADMINW == "ADMI" || SAL41.ADMINW == "GEBC") {
                    swinvalid = 0;
                    _validacionnumeracion2_SAL41();
                } else {
                    _aceptarcuenta_450();
                }
            } else {
                if (SAL41.SWSTEP == '2') {
                    _aceptarcuenta_450();
                } else {
                    _validacionnumeracion2_SAL41();
                }
            }
        }
    } else {
        if (SAL41.LLAVEMESFACT < $_LLAVEMESINGNUM) {
            CON851('91', 'ERROR EN FECHA ING! ', null, 'error', 'Error');
            if (SAL41.SWSTEP == '2') {
                if (SAL41.ADMINW == "GEBC") {
                    _validacionnumeracion2_SAL41();
                } else {
                    _aceptarcuenta_450();
                }
            }
        } else {
            _validacionnumeracion2_SAL41();
        }
    }
}

function _validacionnumeracion2_SAL41() {
    if ($_ESTADONUM == '1') {
        CON851('13', 'PACIENTE RETIRADO', null, 'error', 'Error');
        if (SAL41.ADMINW == "ADMI" || SAL41.ADMINW == "GEBC") {
            $_NITFACT = $_NITNUM;
            if (($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'T') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'U') ||
                ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) {
                if ((SAL41.NITUSU != '0830092718') || (SAL41.NITUSU != '0830092719') || (SAL41.NITUSU != '0900193162')) {
                    SAL41.IDHISTORIAFACT = $_IDPACNUM;
                    _Calcularhoras_41()
                }
            }
            $_CODTAR = $_CONVENIONUM;
        } else {
            _Evaluarservicio_41();
        }
    } else if ($_ESTADONUM == '2') {
        CON851('13', 'FACTURA ANULADA!', null, 'error', 'Error');
        if (SAL41.SWSTEP == '2') {
            _aceptarcuenta_450();
        }
    } else if (($_ESTADONUM == '3') && (SAL41.ADMINW != SAL41.OPERBLOQNUM)) {
        CON851('13', 'FACTURA BLOQUEADA!', null, 'error', 'Error');
        SAL41.BLOQUEADAW = '1';
        if (SAL41.SWSTEP == '2') {
            _aceptarcuenta_450();
        }
    } else {
        $_NITFACT = $_NITTER;
        $_NITNUM = $_NITFACT;
        if ($_PREFIJOFACT == "P" || $_PREFIJOFACT == "T" || $_PREFIJOFACT == "O" || $_PREFIJOFACT == "Q" || $_PREFIJOFACT == "R" || $_PREFIJOFACT == "S" ||
            $_PREFIJOFACT == "U" || $_PREFIJOFACT == "V" || $_PREFIJOFACT == "W" || $_PREFIJOFACT == "X" || $_PREFIJOFACT == "Y" || $_PREFIJOFACT == "Z") {
            if ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162')) {
                _Leerconvenio_41();
            } else {
                console.log('va ir a calcularedad', SAL41.IDHISTORIAFACT)
                SAL41.IDHISTORIAFACT = $_IDPACNUM;
                let datos_envio = datosEnvio();
                datos_envio += SAL41.IDHISTORIAFACT.padStart(15, '0');
                datos_envio += '|'
                let URL = get_url("APP/SALUD/SAL41-05.DLL");
                postData({
                    datosh: datos_envio
                }, URL)
                    .then((data) => {
                        console.log(data, 'respuesta paciente');
                        $_NACIMPACI = data[2].trim();
                        SAL41.EDAD = calcular_edad(moment(fechanacim).format('YYYY-MM-DD'));
                        if ($.isNaN(SAL41.EDAD.vlr_edad)) SAL41.EDAD.vlr_edad = '00'
                        setTimeout(_Leerconvenio_41, 300);
                    })
                    .catch(error => {
                        console.error(error);
                        $_NACIMPACI = '00000000';
                        $_FECHAINGESTADO = '00000000';
                        SAL41.EDAD = calcular_edad(moment(fechanacim).format('YYYY-MM-DD'));
                        if ($.isNaN(SAL41.EDAD.vlr_edad)) SAL41.EDAD.vlr_edad = '00'
                        setTimeout(_Leerconvenio_41, 300);
                    });
            }
        } else {
            console.log('Va ir leerconvenio')
            $_CODTAR = $_CONVENIONUM;
            _Leerconvenio_41();
        }
    }
}

/////////////////OTRAS VALIDACIONES DE CORRECCION DE FACTURAS///////////
function _buscarnrocontado_41() {
    console.log('PERFORM BUSCAR-NRO-CONTADO')
    $_SECUNUM = 96;
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + $_SECUNUM }, URL)
        .then(data => {
            console.debug(data);
            var data = data.split("|");
            SAL41.NUMEROCTL4 = data[1].substring(3, 9);
            SAL41.ULTFECHANUM4 = data[2].trim();
            $("#facturad_SAL41").val(SAL41.NUMEROCTL4);
        })
        .catch(err => {
            console.debug(err);
            CON852(data[0], data[1], data[2], _toggleNav);
        })
}


////////////////////////////ANULACION FACTURA////////////////////////////////////////////
function _Confirmarborrar_SAL41() {
    if (SAL41.ESTADONUM == '1' && $_PREFIJOFACT != 'C' && $_PREFIJOFACT != 'E' && $_PREFIJOFACT != 'Ñ' && $_PREFIJOFACT != 'U') {
        CON851('70', '70', null, 'error', 'Error');
        if (SAL41.ADMINW == 'GEBC') {
            _Confirmarborrar2_SAL41();
        } else {
            _toggleNav();
        }
    } else {
        _Confirmarborrar2_SAL41();
    }
}

function _Confirmarborrar2_SAL41() {
    if (SAL41.ESTADONUM == '2') {
        CON851('13', '13', null, 'error', 'Error');
        _toggleNav();
    } else if (SAL41.ESTADONUM == '3' && SAL41.ADMINW != SAL41.OPERBLOQNUM) {
        CON851('13', '13', null, 'error', 'Error');
        if (SAL41.ADMINW == 'GEBC') {
            CON851P('02', () => { setTimeout(() => { $('.page-breadcrumb')[1].remove(), _validarOpcion_SAL41() }, 300) }, _AceptarAnular_SAL41);
        } else {
            _toggleNav();
        }
    } else {
        CON851P('02', () => { setTimeout(() => { $('.page-breadcrumb')[1].remove(), _validarOpcion_SAL41() }, 300) }, _AceptarAnular_SAL41);
    }
}

function _AceptarAnular_SAL41() {
    SAL41.FECHAANUL = moment().format('YYMMDD');
    let fechafact = moment($_FECHAFACT, 'YYYY-MM-DD').format('YYMMDD');
    if ($_PREFIJOFACT == 'P' || $_PREFIJOFACT == 'T') {
        // borrar cartera falta
        let URL = get_url("APP/CONTAB/SAL41.DLL");
        postData({ datosh: datosEnvio() + '1|' + $_PREFIJOFACT + $_NROCTAFACT + '|' + $_ANOFACT + '|' + $_MESFACT + '|' + $_VALORTOTAL + '|' }, URL)
            .then(data => {
                console.debug(data);
            })
            .catch(err => {
                console.debug(err);
                CON852(date[0], date[1], date[2], _toggleNav);
            })
    }
    $_ACTCITW = 'S';
    let URL = get_url("APP/SALUD/SER891.DLL");
    postData({ datosh: datosEnvio() + SAL41.LLAVEFACT + '|' + SAL41.FINALIDESTAD + '|' + $_ACTCITW + '|' + SAL41.FECHALNK.substring(0, 2) + '|' }, URL)
        .then(data => {
            console.debug(data);
        })
        .catch(err => {
            console.error(err);
        });
    if ((SAL41.NITUSU == '0830092718' || SAL41.NITUSU == '0830092719' || SAL41.NITUSU == '0900193162') && (SAL41.FECHAANUL == fechafact)) {
        _Montarhl7_41(_Anularfactura_SAL41);
    } else {
        _Anularfactura_SAL41();
    }
}

function _Anularfactura_SAL41() {
    var ventanamotivoanulacion = bootbox.dialog({
        size: 'small',
        onEscape: false,
        title: 'MOTIVO DE ANULACION:',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="form-group"> ' +
            '<div class="col-md-12" id="VALIDAR1_VENTANA_SAL41"> ' +
            '<input id="detallefact_SAL41" type="text" class="form-control input-md" data-orden="1" maxlength="300"> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanamotivoanulacion.off('show.bs.modal');
                    grabar_auditoria_SALUD({
                        'TIPO': 'I43',
                        'NOVED': '9',
                        'LLAVE': SAL41.LLAVEFACT
                    },
                        () => {
                            let fecha = $_FECHAFACT.split('-');
                            let URL = get_url("APP/SALUD/SAL41.DLL");
                            postData({ datosh: datosEnvio() + '2|' + $_PREFIJOFACT + $_NROCTAFACT + '|' + fecha[0] + '|' + fecha[1] + '|' + $_VALORTOTAL + '|' + SAL41.ADMINW + '|' + $('#detallefact_SAL41').val() + '|' + SAL41.LLAVEFACT + '|' }, URL)
                                .then(data => {
                                    console.debug(data);
                                    if ($_PREFIJOFACT == 'P' || $_PREFIJOFACT == 'T') {
                                        let URL = get_url("APP/SALUD/SAL030A.DLL");
                                        postData({ datosh: datosEnvio() + SAL41.LLAVEFACT + '|' }, URL)
                                            .then(data => {
                                                console.debug(data);
                                                _infoSAL021();
                                            })
                                            .catch(err => {
                                                console.error(err);
                                            });
                                    } else {
                                        let URL = get_url("APP/SALUD/SAL021.DLL");
                                        postData({ datosh: datosEnvio() + SAL41.LLAVEFACT + '|' + $_PREFIJOFACT + '|' + fecha[0].substring(2, 4) + fecha[1] + fecha[2] + '|' }, URL)
                                            .then(data => {
                                                console.debug(data);
                                                loader('hide');
                                                _toggleNav();
                                            })
                                            .catch(err => {
                                                console.error(err);
                                            });
                                    }
                                    if ($_CLFACT == '0' || $_MACROFACT == '1') {
                                        let URL = get_url("APP/SALUD/SAL031.DLL");
                                        postData({ datosh: datosEnvio() + SAL41.LLAVEFACT + '|' }, URL)
                                            .then(data => {
                                                console.debug(data);
                                                for (var i in SAL41.FACTURA.TABLA) {
                                                    if (SAL41.FACTURA.TABLA[i].ARTICULO.trim() != '') {
                                                        let URL = get_url("APP/SALUD/SAL010.DLL");
                                                        postData({ datosh: datosEnvio() + SAL41.FACTURA.TABLA[i].ALMACEN + '0' + SAL41.FACTURA.TABLA[i].ARTICULO + SAL41.FACTURA.TABLA[i].COD_LOTE + '|' }, URL)
                                                            .then(data => {
                                                                console.debug(data);
                                                                _toggleNav();
                                                            })
                                                            .catch(err => {
                                                                console.error(err);
                                                            });
                                                    }
                                                }
                                            })
                                            .catch(err => {
                                                console.error(err);
                                            });
                                    }
                                })
                                .catch(err => {
                                    console.error(err);
                                });
                        }
                    )
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanamotivoanulacion.off('show.bs.modal');
                    _toggleNav();
                }
            }
        }
    });
    ventanamotivoanulacion.init($('.modal-footer').hide(), _Evaluarventanamotivo_SAL41());
    ventanamotivoanulacion.on('shown.bs.modal', function () {
        $("#detallefact_SAL41").focus();
    });
}


function _infoSAL021() {
    let fecha = $_FECHAFACT.split('|');
    let URL = get_url("APP/SALUD/SAL021.DLL");
    postData({ datosh: datosEnvio() + SAL41.LLAVEFACT + '|' + $_PREFIJOFACT + '|' + fecha[0].substring(2, 4) + fecha[1] + fecha[2] + '|' }, URL)
        .then(data => {
            console.debug(data);
            if ($_CLFACT == '0') {
                let URL = get_url("APP/SALUD/SAL031.DLL");
                postData({ datosh: datosEnvio() + SAL41.LLAVEFACT + '|' }, URL)
                    .then(data => {
                        console.debug(data);
                        _Actualizarsaldo_SAL41();
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        })
        .catch(err => {
            console.error(err);
        });
}

function _Actualizarsaldo_SAL41() {
    for (var i in $TABLAFACT) {
        if ($TABLAFACT[i].GRUPO.trim() != '') {
            let URL = get_url("APP/SALUD/SAL010.DLL");
            postData({ datosh: datosEnvio() + $TABLAFACT[i].ALMACEN + '0' + $TABLAFACT[i].GRUPO + $TABLAFACT[i].ARTICULO + $TABLAFACT[i].COD_LOTE + '|' }, URL)
                .then(data => {
                    console.debug(data);
                    if (i == $TABLAFACT.length - 1) loader('hide');
                })
                .catch(err => {
                    console.error(err);
                });
        }
        if ($TABLAFACT.length - 1 == i) {
            _toggleNav();
        }
    }
}

function _Evaluarventanamotivo_SAL41() {
    validarInputs({
        form: "#VALIDAR1_VENTANA_SAL41",
        orden: '1'
    },
        () => { $('.btn-danger').click() },
        () => {
            SAL41.DETALLEFACT = $('#claveacceso_SAL41').val();
            $('.btn-primary').click();
        }
    )
}

function _dataSAL41_01(data) {
    console.debug(data, "SAL41-01");
    var data = data.split("|");
    if (data[0].trim() == "00") {
        SAL41.NUMEROCTL = parseInt(SAL41.NUMEROCTL) + 1;
        SAL41.NUMEROCTL = SAL41.NUMEROCTL.toString().padStart(6, '0');
        SAL41.NROFACT = SAL41.NUMEROCTL;
        _Leernumero_41();
    } else if (data[0].trim() == "01") {
        _Encabezar_41()
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _Encabezar_41() {
    postData({
        datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`
    }, get_url("APP/CONTAB/CON007B.DLL"))
    .then(data => {
        console.debug(data);
        data = data.split("|");
        if ((data[1].trim() == "0") || (data[1].trim() == "5") || data[1].trim() == '3') {
            $_FECHAACT = moment().format('YYMMDD');
            $_FECHASIST = '20' + $_FECHA_LNK;
            $_FECHAFACT = $_FECHA_LNK;
            $_ANOSIST = $_FECHASIST.substring(0, 4);
            $_MESSIST = $_FECHASIST.substring(4, 6);
            $_DIASIST = $_FECHASIST.substring(6, 8);
            $_ANOACT = $_FECHAACT.substring(0, 2);
            $_MESACT = $_FECHAACT.substring(2, 4);
            $_DIAACT = $_FECHAACT.substring(4, 6);
            $_DIAANT = SAL41.FECHAANT.substring(4, 6);
            $_ANOFACT = $_FECHAFACT.substring(0, 2);
            $_MESFACT = $_FECHAFACT.substring(2, 4);
            $_DIAFACT = $_FECHAFACT.substring(4, 6);
            $_DIAFACT = $_DIAANT;
            if ($_ANOACT == $_ANOFACT) $_DIFACT = $_DIAACT;
            $_SWBONO = '0';
            $_UNSERVFACT = $_UNSERW;
            if ((SAL41.NITUSU == "0900541158") || (SAL41.NITUSU == "0900566047") || (SAL41.NITUSU == "0900565371") || (SAL41.NITUSU == "0901120152") || (SAL41.NITUSU == '0900658867')) {
                _infoSER865A_41();
            } else {
                _Validarclfact_41();
            }
        } else {
            CON851('','Mes bloqueado',null,'error','Error');
            _toggleNav();
        }
    })
    .catch(error => {
        console.error(error);
        CON851('','Ocurrio un error con el usuario',null,'error','Error');
        _toggleNav();
    });
}

function _infoSER865A_41() {
    var dispensaciones = [
        { CODIGO: '1', DESCRIPCION: 'NORMAL' },
        { CODIGO: '2', DESCRIPCION: 'AUTOMATICA' }
    ];
    var titulo = 'Facturacion';
    POPUP({
        array: dispensaciones,
        titulo: titulo,
        indices: [
            { label: 'DESCRIPCION' }
        ],
        callback_f: _Evaluarservicio_41
    },
        data => {
            console.log(data);
            SAL41.FACTAUTOFACT = data.CODIGO;
            switch (data.CODIGO) {
                case '1':
                case '2':
                    _Validarclfact_41();
                    break;
                default:
                    _toggleNav();
                    break;
            }
        });
}

function _Validarclfact_41() {
    $_PACIDISPE = '';
    if ($_CLFACT == "0") {
        _infoSER865_41();
    } else {
        _Evaluarfecha_41();
    }
}

function _infoSER865_41() {
    var medicamentos = [
        { CODIGO: '1', DESCRIPCION: 'VENTA DROGA' },
        { CODIGO: '2', DESCRIPCION: 'DEVOLUCION DROGA' },
        { CODIGO: '3', DESCRIPCION: 'PENDIENTE DROGA' },
    ]
    POPUP({
        array: medicamentos,
        titulo: 'Facturacion',
        callback_f: _Evaluarservicio_41,
        indices: [
            { id: 'CODIGO', label: 'DESCRIPCION' }
        ]
    },
        data => {
            console.debug(data);
            $_TIPODRFACT = data.CODIGO;
            switch (data.CODIGO) {
                case '1':
                case '2':
                case '3':
                    let URL = get_url("APP/CONTAB/CON904.DLL");
                    postData({ datosh: datosEnvio() + localStorage.getItem('Usuario').trim() + '|' + "I410" + $_TIPODRFACT + '|' }, URL)
                        .then(data => {
                            console.debug(data);
                            if (($_CLFACT == "0") && ($_TIPODRFACT == "3")) {
                                SolicitarDll({ datosh: datos_envio }, data => {
                                    console.debug(data, 'INV409S')
                                    _toggleNav();
                                }, get_url('APP/SALUD/INV409S.DLL'));
                            } else {
                                _Controldispensacion_41();
                            }
                        })
                        .catch(err => {
                            console.error(err);
                            _Encabezar_41();
                        });
                    break;
            };
        })
}

function _Controldispensacion_41() {
    if (parseInt($_CLFACT) > 0) {
        _Evaluarfecha_41();
    } else {
        if ((($_UNSERW == "02") || ($_UNSERW == "08")) && (SAL41.NITUSU != "0892000458")) {
            _Evaluarfecha_41();
        } else {
            console.debug('control dispensacion SER815')
            _Evaluarfecha_41();
        }
    }
}

function _Evaluarfecha_41() {
    if (SAL41.OPCIONACTIVA == '09426') {
        // fechaMask.typedValue = SAL41.FACTURA.FECHA;
        // console.log(fechaMask, 'fechaMask.')
    } else {
        let dia = moment().format('DD');
        console.log(dia);
        fechaMask.typedValue = '20' + $_FECHA_LNK.substring(0, 2) + $_FECHA_LNK.substring(2, 4) + dia;
    }
    validarInputs({
        form: "#VALIDAR4_SAL41",
        orden: "1"
    },
        _Revisardato_41,
        () => {
            $_FECHAFACT = fechaMask.value;
            console.log($_FECHAFACT, '$_FECHAFACT$_FECHAFACT')
            $_ANOFAC = $_FECHAFACT.substring(2, 4);
            $_MESFACT = $_FECHAFACT.substring(5, 7);
            $_DIAFACT = $_FECHAFACT.substring(8, 10);
            $_FECHASIGFACT = moment($_FECHAFACT).format("YYYYMMDD");
            $_ANOSIGFACT = $_FECHASIGFACT.substring(0, 4);
            $_MESSIGFACT = $_FECHASIGFACT.substring(4, 6);
            $_DIASIGFACT = $_FECHASIGFACT.substring(6, 8);
            var after = moment($_FECHAFACT).isAfter($_FECHAACT);
            if ($_FECHAFACT.length < 10) {
                _Evaluarfecha_41();
            } else if (($_CLFACT == "4") || ($_CLFACT == "5")) {
                _Validarfechaopago_41();
            } else {
                if (after == true) {
                    CON851('37', '37', null, 'error', 'error');
                    if ($_SWBLOQFECHA == "S") {
                        _Revisardato_41();
                    } else {
                        _Evaluarfecha_41();
                    }
                } else {
                    if (((SAL41.NITUSU == "0830092718") || (SAL41.NITUSU == "0830092719") || (SAL41.NITUSU == "0892000401") || (SAL41.NITUSU == "0900648993") || (SAL41.NITUSU == "0900193162") || (SAL41.NITUSU == "0900755133") || (SAL41.NITUSU == "0900804411") || (SAL41.NITUSU == "0900870633") || (SAL41.NITUSU == "0900658867")) && (after == true)) {
                        let URL = get_url("APP/CONTAB/CON904.DLL");
                        postData({ datosh: datosEnvio() + localStorage.getItem('Usuario').trim() + '|' + "I4SF" + '|' }, URL)
                            .then(data => {
                                console.debug(data);
                                if ($_SUCFACT == "SC") {
                                    _Evaluarfecha_41();
                                } else {
                                    _Validarfechaopago_41();
                                }
                            })
                            .catch(err => {
                                console.error(err);
                                _Evaluarfecha_41();
                            });
                    } else {
                        _Validarfechaopago_41();
                    }
                }
            }
        }
    )
}

function _Validarfechaopago_41() {
    if ((SAL41.NITUSU == "0800162035") || (SAL41.NITUSU == "0845000038") || (SAL41.NITUSU == "0892000401") || (SAL41.NITUSU == "0900870633")) {
        _Evaluarfechaatencion_41();
    } else {
        if ($_UNSERW == "01") {
            $_FECHAINGESTAD = $_FECHAFACT;
            SAL41.HORAATENESTAD = moment().format('LT');
            if (SAL41.OPCIONACTIVA == '09426') {
                console.log('ventana salta dato unidad')
                _UndServicio_41();
            } else {
                _Evaluarprefijofact_41();
            }
        } else {
            _Evaluarfechaatencion_41();
        }
    }
}

function _Evaluarfechaatencion_41() {
    console.log('Evaluarfechaatencion');
    if (SAL41.OPCIONACTIVA != '09426') {
        console.log($_FECHAFACT);
        $('#fechaatencion_SAL41').val($_FECHAFACT + moment().format('HH:mm'));
    }
    console.log('$_FECHAFACT', $_FECHAFACT)
    $_FECHAINGESTAD = $_FECHAFACT;
    var preanofact = parseInt($_FECHAINGESTAD);
    var minanofact = preanofact - 1;
    var maxanofact = preanofact + 1;
    var ventanafechaatencion = bootbox.dialog({
        size: 'large',
        onEscape: true,
        title: 'FECHA DE ATENCION',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="form-group"> ' +
            '<label class="col-md-4 control-label">' + 'FECHA DE ATENCION' + '</label> ' +
            '<div class="col-md-6" id="FECHAATENCION_41"> ' +
            '<input id="fechaatencion_SAL41" type="text" class="form-control input-md" data-orden="1" maxlength="16"> ' +
            '<span class="help-block">' + 'YYYY-MM-DD HH:mm' + '</span> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanafechaatencion.off('show.bs.modal');
                    if (SAL41.OPCIONACTIVA == '09426') {
                        _UndServicio_41();
                    } else {
                        _Evaluarprefijofact_41();
                    }
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanafechaatencion.off('show.bs.modal');
                    _Evaluarfecha_41();
                }
            }
        }
    });
    ventanafechaatencion.init($('.modal-footer').hide());
    ventanafechaatencion.on('shown.bs.modal', function () {
        $("#fechaatencion_SAL41").focus();
    });
    ventanafechaatencion.init(_Evaluarventanaatencion_41());
    // var DateAttentionMask = IMask($("#fechaatencion_SAL41")[0], {
    //     mask: Date,
    //     pattern: 'Y-M-d h:m',
    //     lazy: true,
    //     overwrite: true,
    //     autofix: true,
    //     blocks: {
    //         Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: minanofact, to: maxanofact, maxLength: 4 },
    //         M: { mask: IMask.MaskedRange, placeholderChar: 'M', from: 01, to: 12, maxLength: 2 },
    //         d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: 1, to: 31, maxLength: 2 },
    //         h: { mask: IMask.MaskedRange, placeholderChar: 'h', from: 00, to: 23, maxLength: 2 },
    //         m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: 00, to: 59, maxLength: 2 },
    //     },
    //     format: function (date) {
    //         return moment(date).format("YYYY-MM-DD HH:mm");
    //     },
    //     parse: function (str) {
    //         var fecha = moment(str).format('YYYY-MM-DD HH:mm');
    //         if (fecha == "Invalid date") {
    //             CON851('01', '01', null, 'error', 'error');
    //         }
    //         else {
    //             ventanafechaatencion.off('show.bs.modal');
    //             return str;
    //         }
    //     }
    // });
}

function _Evaluarventanaatencion_41() {
    _inputControl("disabled");
    if (SAL41.OPCIONACTIVA != '09426') {
        $('#fechaatencion_SAL41').val($_FECHAFACT + ' ' + moment().format('HH:mm'));
    } else {
        $('#fechaatencion_SAL41').val($_FECHAFACT + ' ' + $_HORAFACT)
    }
    validarInputs({
        form: '#FECHAATENCION_41',
        orden: "1"
    },
        () => { $('.btn-danger').click() },
        () => {
            $_FECHAINGESTAD = $('#fechaatencion_SAL41').val();
            SAL41.HORAATENESTAD = $_FECHAINGESTAD.substring(11, 16).replace(/:/g, '');
            console.debug($_FECHAINGESTAD, 'caja')
            if ($_FECHAINGESTAD.length > 15) {
                $_FECHAINGW = $_FECHAINGESTAD;
                $('.btn-primary').click();
            } else {
                CON851('37', '37', null, 'error', 'Error');
                _Evaluarventanaatencion_41();
            }
        }
    )
}

function _Evaluarprefijofact_41() {
    $_FECHASIGATEN = $_FECHAINGESTAD;
    $_FECHASIGATEN = moment($_FECHASIGATEN).format("YYYYMMDD");
    console.log('evalua del prefijo 41')
    validarInputs({
        form: '#FACTURA_41',
        orden: "1"
    },
        function () { _Evaluarfecha_41() },
        _Validarprefijofact_41
    )
}

function _Validarprefijofact_41() {
    console.log('validarpref 450')
    $_PREFIJOFACT = $("#factura_SAL41").val();
    $_PREFIJOFACT = $_PREFIJOFACT.substring(0, 1);
    if (((SAL41.NITUSU == "0830092718") || (SAL41.NITUSU == "0830092719") || (SAL41.NITUSU == "0900193162") || (SAL41.NITUSU == "0892000401") || (SAL41.NITUSU == "0900648993") || (SAL41.NITUSU == "0900755133") || (SAL41.NITUSU == "0900870633") || (SAL41.NITUSU == "0900804411")) && (($_PREFIJOFACT == "C") || ($_PREFIJOFACT == "E"))) {
        CON851('49', '49', null, 'error', 'error');
        $('#factura_SAL41').val('');
        _Evaluarprefijofact_41();
    } else if (($_PREFIJOFACT.trim() == "") || (parseInt($_PREFIJOFACT) == 0)) {
        $("#factura_SAL41").val('');
        _Evaluarprefijofact_41();
    } else {
        _Ubicarcuenta_41();
    }
}

function _Ubicarcuenta_41() {
    console.log('UBUCAR CUENTA')
    if (SAL41.OPCIONACTIVA == '09426') {
        if ($_PREFIJOFACT == "R") {
            _Leerconvenio_41();
        } else if (($_PREFIJOFACT == "E") || ($_PREFIJOFACT == "C")) {
            $_ESTADONUM = "0";
            $_CONVENIONUM = $_CODTAR = "CL";
            // if (($_PREFIJOW == "A" || $_PREFIJOW == "P" || $_PREFIJOW == "T" || $_PREFIJOW == "B" || $_PREFIJOW == "D" || $_PREFIJOW == "F" ||
            //     $_PREFIJOW == "G" || $_PREFIJOW == "H" || $_PREFIJOW == "I" || $_PREFIJOW == "J" || $_PREFIJOW == "K" || $_PREFIJOW == "L" || $_PREFIJOW == "M" || $_PREFIJOW == "N" ||
            //     $_PREFIJOW == "O" || $_PREFIJOW == "Q" || $_PREFIJOW == "R" || $_PREFIJOW == "S" || $_PREFIJOW == "V" || $_PREFIJOW == "W" || $_PREFIJOW == "X" || $_PREFIJOW == "Y" || $_PREFIJOW == "Z") || ($_NROCTAFACT == 0)) {
            //     _buscarnrocontado_41();
            // }
            $_DESCRIPNUM = " ";
            console.log('LEER CONVENIO 450')
            _Leerconvenio_41();
        } else {
            console.log('ACEPTAR CUENTA 450')
            _aceptarcuenta_450();
        }
    } else {
        if (($_PREFIJOFACT == "E") || ($_PREFIJOFACT == "C")) {
            $_ESTADONUM = "0";
            $_CONVENIONUM = $_CODTAR = "CL";
            // $_NITCTAW = $_NITNUM;
            $_DESCRIPNUM = " ";
            $_TIPOPACINUM = "*";
            $_FORMACOPAGNUM = "1";
            $_FACTCAPITNUM = ' ';
            $_PRECAPITNUM = ' ';
            $_NROCAPITNUM = ' ';
            $_NITNUM = $_NITCTAW = ' ';
            $_FECHAINGNUM = ' ';
            $_REDEXTERNUM = ' ';
            console.debug($_CONVENIONUM, $_ESTADONUM);
            if ($_PREFIJOFACT == "E") {
                $_OPSEGU = "89";
                _EvaluarCON0072_SAL41();
            } else if ($_PREFIJOFACT == "C") {
                $_OPSEGU = "96";
                _EvaluarCON0072_SAL41();
            }
        } else {
            let URL = get_url("APP/CONTAB/CON007.DLL");
            postData({ datosh: datosEnvio() + '9' + $_PREFIJOFACT + '|' }, URL)
                .then(data => {
                    console.debug(data);
                    data = data.split("|");
                    SAL41.NUMEROCTL2 = data[1].substring(3, 9);
                    SAL41.ULTFECHANUM2 = data[2].trim();
                    $("#facturad_SAL41").val(parseInt(SAL41.NUMEROCTL2) - 1);
                    _Evaluarnrofact_41();
                })
                .catch(err => {
                    console.debug(err);
                    CON852(data[0], data[1], data[2], _toggleNav);
                })
        }
    }
}

function _EvaluarCON0072_SAL41() {
    console.log('CON007 SAL 450')
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + $_OPSEGU + '|' }, URL)
        .then(data => {
            console.debug(data);
            var data = data.split("|");
            SAL41.NUMEROCTL2 = data[1].substring(3, 9);
            SAL41.ULTFECHANUM2 = data[2].trim();
            if ((SAL41.NITUSU == "0891855847") && ($_ANOLNK == "10")) {
                _Evaluarnrofact_41();
            } else {
                $("#facturad_SAL41").val(SAL41.NUMEROCTL2);
                _Leerconvenio_41();
            }
        })
        .catch(err => {
            console.debug(err);
            CON852(date[0], date[1], date[2], _toggleNav);
        })
}

function _Evaluarnrofact_41() {
    validarInputs({
        form: '#FACTURAD_41',
        orden: "1"
    },
        _Evaluarfecha_41,
        _Validarnrofact_41
    )
}

function _Validarnrofact_41() {
    $_NROCTAFACT = $('#facturad_SAL41').val();
    if (parseInt($_NROCTAFACT) == 0) {
        CON851('', 'Digite un numero de factura', null, 'error', 'Error');
        $('#facturad_SAL41').val('');
        _Evaluarnrofact_41();
    } else {
        SolicitarDll({ datosh: datosEnvio() + '|' + $_PREFIJOFACT + '|' + $_NROCTAFACT.padStart(6, '0') + '|' }, _dataSAL41_02, get_url('APP/SALUD/SAL41-02.DLL'));
    }
}

function _dataSAL41_02(data) {
    console.debug(data, "SAL41-02");
    data = data.split("|");
    $_LLAVESALIDNUM = data[1].trim();
    SAL41.CONTROLXSERVNUM = data[2].trim();
    SAL41.CONTROLCLNUM = { '0': data[3].trim(), '1': data[4].trim(), '2': data[5].trim(), '3': data[6].trim(), '4': data[7].trim(), '5': data[8].trim(), '6': data[9].trim(), '7': data[10].trim() }
    $_FECHAINGNUM = data[11].trim();
    $_ANOINGNUM = $_FECHAINGNUM.substring(2, 4);
    $_MESINGNUM = $_FECHAINGNUM.substring(4, 6);
    $_DIAINGNUM = $_FECHAINGNUM.substring(6, 8);
    $_ESTADONUM = data[12].trim();
    $_NITNUM = data[13];
    $_NITCTAW = $_NITNUM;
    $_IDPACNUM = data[14].trim();
    $_CONTROLCAPNUM = data[15].trim();
    $_CTLNROPACINUM = data[16].trim();
    $_FECHAFARMANUM = data[17].trim();
    $_MESFARMANUM = $_FECHAFARMANUM.substring(4, 6);
    $_CONVENIONUM = data[18].trim();
    $_LLAVENUM = data[19].trim();
    $_FECHARETNUM = data[20].trim();
    $_FECHARETNUM = moment($_FECHARETNUM).format("YYYYMMDD");
    $_ANORETNUM = $_FECHARETNUM.substring(0, 4);
    $_MESRETNUM = $_FECHARETNUM.substring(4, 6);
    $_DIARETNUM = $_FECHARETNUM.substring(6, 8);
    $_DESCRIPNUM = data[21].trim();
    $_HORAINGNUM = data[22].trim();
    $_HRINGNUM = $_HORAINGNUM.substring(0, 2);
    $_MNINGNUM = $_HORAINGNUM.substring(2, 4);
    $_FACTCAPITNUM = data[23].trim();
    $_PRECAPITNUM = $_FACTCAPITNUM.substring(0, 1);
    $_NROCAPITNUM = $_FACTCAPITNUM.substring(1, 7);
    $_MYTNUM = data[24].trim();
    $_FECHASALID = data[25].trim();
    $_MONTOCONTW = data[26].trim();
    $_SALDOCONTW = data[27].trim();
    $_PORCENTCONTW = data[28].trim();
    $_PORCAVISOCNCAP = data[29].trim();
    $_SWINVALIDCONT = data[30].trim();
    $_SWINVALIDSALID = data[31].trim();
    $_TIPOPACINUM = data[32].trim();
    $_CONTRATONUM = data[33].trim();
    $_REDEXTERNUM = data[34].trim();
    $_FORMACOPAGNUM = data[35].trim();
    $_NROAUTORINUM = data[36].trim();
    // $_PORCAVISOCNCAP = data[30].trim();
    if (data[0].trim() == "00") {
        if (SAL41.OPCIONACTIVA == '09426') {
            console.log('va ir LEER CUENTA 450')
            _Leercuenta_450();
        } else {
            _Leercuenta_41();
        }
    } else if (data[0].trim() == "01") {
        CON851('01', '01', null, 'error', 'error');
        $('#facturad_SAL41').val('');
        _Evaluarnrofact_41();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _Leercuenta_41() {
    if (SAL41.NITUSU != '0844003225') {
        if ($_PREFIJOFACT != 'P' && $_PREFIJOFACT != 'T' && $_PREFIJOFACT == 'C' && $_PREFIJOFACT == 'E') {
            if (($_DIASIST >= 20) && (($_ANOACT == $_ANOLNK) && ($_MESACT == $_MESLNK))) {
                $_MESSIST = parseInt($_MESSIST) + 1;
                $_DIASIST = "01";
                if ($_MESSIST > 12) {
                    $_ANOSIST = parseInt($_ANOSIST) + 1;
                    $_ANOSIST = $_ANOSIST.toString();
                    $_MESSIST = "01";
                }
            }
        }
    }
    if ((SAL41.NITUSU == "0800037021" || SAL41.NITUSU == "0800162035") && ($_PREFIJOFACT == "P" || $_PREFIJOFACT == "T")) {
        if (parseInt($_LLAVESALIDANUM) > 0) {
            $_FECHASALIDBOLW = $_FECHASALID;
            $_ANOACSALIDBOLW = $_FECHASALIDBOLW.substring(0, 4);
            $_MESSALIDBOLW = $_FECHASALIDBOLW.substring(4, 6);
            $_DIASALIDBOLW = $_FECHASALIDBOLW.substring(6, 8);
            if ($_FECHASALID.trim() == '') {
                _Leercuenta3_41();
            } else if ($_FECHAFACT > $_FECHASALIDBOLW) {
                CON851('8D', '8D', null, 'error', 'error');
                $('#facturad_SAL41').val('');
                _Evaluarnrofact_41();
            } else {
                _Leercuenta3_41();
            }
        } else {
            _Leercuenta3_41();
        }
    } else {
        _Leercuenta3_41();
    }
}

function _Leercuenta3_41() {
    console.debug('leercuenta3');
    if (SAL41.CONTROLXSERVNUM == 'S') {
        switch ($_CLFACT) {
            case '0':
                if (SAL41.CONTROLCLNUM[$_CLFACT] == 'N') CON851('7U', '7U', null, 'error', 'Error'), $('#facturad_SAL41').val(''), _Evaluarnrofact_41()
                else _Leercuenta4_41()
                break;
            case '1':
                if (SAL41.CONTROLCLNUM[$_CLFACT] == 'N') CON851('7U', '7U', null, 'error', 'Error'), $('#facturad_SAL41').val(''), _Evaluarnrofact_41()
                else _Leercuenta4_41()
                break;
            case '2':
                if (SAL41.CONTROLCLNUM[$_CLFACT] == 'N') CON851('7U', '7U', null, 'error', 'Error'), $('#facturad_SAL41').val(''), _Evaluarnrofact_41()
                else _Leercuenta4_41()
                break;
            case '3':
                if (SAL41.CONTROLCLNUM[$_CLFACT] == 'N') CON851('7U', '7U', null, 'error', 'Error'), $('#facturad_SAL41').val(''), _Evaluarnrofact_41()
                else _Leercuenta4_41()
                break;
            case '4':
                if (SAL41.CONTROLCLNUM[$_CLFACT] == 'N') CON851('7U', '7U', null, 'error', 'Error'), $('#facturad_SAL41').val(''), _Evaluarnrofact_41()
                else _Leercuenta4_41()
                break;
            case '5':
                if (SAL41.CONTROLCLNUM[$_CLFACT] == 'N') CON851('7U', '7U', null, 'error', 'Error'), $('#facturad_SAL41').val(''), _Evaluarnrofact_41()
                else _Leercuenta4_41()
                break;
            case '6':
                if (SAL41.CONTROLCLNUM[$_CLFACT] == 'N') CON851('7U', '7U', null, 'error', 'Error'), $('#facturad_SAL41').val(''), _Evaluarnrofact_41()
                else _Leercuenta4_41()
                break;
            case '7':
                if (SAL41.CONTROLCLNUM[$_CLFACT] == 'N') CON851('7U', '7U', null, 'error', 'Error'), $('#facturad_SAL41').val(''), _Evaluarnrofact_41()
                else _Leercuenta4_41()
                break;
        }
    } else {
        _Leercuenta4_41();
    }
}

function _Leercuenta4_41() {
    console.debug("leer cuenta 4")
    if ($_PREFIJOFACT == "A" || $_PREFIJOFACT == "B" || $_PREFIJOFACT == "D" || $_PREFIJOFACT == "F" || $_PREFIJOFACT == "G" || $_PREFIJOFACT == "H" || $_PREFIJOFACT == "I" || $_PREFIJOFACT == "J" || $_PREFIJOFACT == "K" || $_PREFIJOFACT == "L" || $_PREFIJOFACT == "M" || $_PREFIJOFACT == "N" || $_PREFIJOFACT == "O" || $_PREFIJOFACT == "Q" || $_PREFIJOFACT == "R" || $_PREFIJOFACT == "S" || $_PREFIJOFACT == "V" || $_PREFIJOFACT == "W" || $_PREFIJOFACT == "X" || $_PREFIJOFACT == "Y" || $_PREFIJOFACT == "Z") {
        if (($_ANOINGNUM == $_ANOSIGFACT.substring(2, 4)) && ($_MESINGNUM == $_MESSIGFACT)) {
            _Leercuenta5_41()
        } else if (($_ANOINGNUM == $_ANOSIST.substring(2, 4)) && ($_MESINGNUM == $_MESSIST) && ($_ANOLNK == $_ANOACT) && ($_MESLNK == $_MESACT)){
            _Leercuenta5_41()
        } else {
            CON851('91', '91', _Evaluarnrofact_41(), 'error', 'error');
        }
    } else {
        console.debug($_PREFIJOFACT)
        if (parseInt($_FECHASIGFACT) < parseInt($_FECHAINGNUM)) {
            CON851('91', '91', null, 'error', 'error');
            $("#facturad_SAL41").val("");
            _Evaluarnrofact_41();
        } else {
            _Leercuenta5_41();
        }
    }
}

function _Leercuenta5_41() {
    $_NITFACT = $_NITNUM.trim();
    $_NITCTAW = $_NITNUM;
    if (parseInt($_MESRETNUM) > 0 && parseInt($_FECHASIGATEN) > parseInt($_FECHARETNUM)) {
        CON851('91', '91', null, 'error', 'error'); $('#facturad_SAL41').val(''); _Evaluarnrofact_41();
    } else if ($_ESTADONUM == "1") {
        CON851('13', 'PACIENTE RETIRADO !', null, 'error', 'error'); $('#facturad_SAL41').val(''); _Evaluarnrofact_41();
    } else if ($_ESTADONUM == "2") {
        CON851('13', 'FACTURA ANULADA !', null, 'error', 'error'); $('#facturad_SAL41').val(''); _Evaluarnrofact_41();
    } else if ($_ESTADONUM == "3") {
        CON851('13', 'FACTURA BLOQUEADA !', null, 'error', 'error'); $('#facturad_SAL41').val(''); _Evaluarnrofact_41();
    } else if (($_PREFIJOFACT == "P") || ($_PREFIJOFACT == "T")) {
        if ((SAL41.NITUSU == "0830092718") || (SAL41.NITUSU == "0830092719") || (SAL41.NITUSU == "0900193162")) {
            SAL41.IDHISTORIAFACT = $_IDPACNUM;
            console.debug('quitar condicion funciona solo pára pruebas');
            _Leercuenta6_41();
        } else {
            SAL41.IDHISTORIAFACT = $_IDPACNUM;
            _Leercuenta6_41();
        }
    } else {
        if (SAL41.NITUSU == "0800251482") {
            SAL41.IDHISTORIAFACT = $_IDPACNUM;
            _Leercuenta6_41();
        } else {
            _Leercuenta6_41();
        }
    }
}

function _Leercuenta6_41() {
    if ((parseInt($_CONTROLCAPNUM) == 0) || ($_CONTROLCAPNUM == "9999") || ($_CONTROLCAPNUM.trim() != "")) {
        _Leercuenta7_41();
    } else {
        if (parseFloat($_PORCENTCONTW) >= 100) {
            CON851('9D', '9D', null, 'error', 'error');
            $("#facturad_SAL41").val("");
            _Evaluarnrofact_41();
        } else {
            if (parseFloat($_PORCENTCONTW) >= 90) {
                CON851('9C', '9C', null, 'error', 'error');
                $("#facturad_SAL41").val("");
                _Evaluarnrofact_41();
            } else {
                if (parseFloat($_PORCENTCONTW) >= 90) {
                    CON851('9B', '9B', null, 'error', 'error');
                    $("#facturad_SAL41").val("");
                    _Evaluarnrofact_41();
                } else {
                    _Leercuenta7_41();
                }
            }
        }
    }
}

function _Leercuenta7_41() {
    // if ((($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) && ($_CTLNROPACINUM == "S")) {
    //     console.debug("SER835F SC SALUD PROBLEMA");
    // }
    if (($_CLFACT == "0") && (parseInt($_MESFARMANUM) > 0)) {
        console.debug('revisar');
        var mostrarfechafarm = moment($_FECHAFARMANUM).format("dddd YYYY MM DD");
        var ventanafechafarm = bootbox.dialog({
            message: mostrarfechafarm,
            size: 'small',
            buttons: {
                Aceptar: {
                    label: 'Aceptar',
                    className: 'btn-submit',
                    callback: function () {
                        _Leerconvenio_41();
                        $("#myModal").off("keydown");
                    }
                }
            }
        });
        $("#myModal").on("keydown", function (e) {
            if (e.wich == 13) {
                $(".btn-submit").click();
            }
        });
    } else {
        _Leerconvenio_41();
    }
}

function _Leerconvenio_41() {
    console.log('UNION LEER CONVENIO 450')
    // $_PREFIJOFACT = $('#factura_SAL41').val();
    // $_NROCTAFAC = $('#facturad_SAL41').val();
    if (($_PREFIJOFACT == "E") && (SAL41.OPCIONACTIVA != '09426')) {
        if ($_MESFACT == $_MESACT) {
            let datos_envio = datosEnvio()
            datos_envio += SAL41.ADMINW +
                '|' + $_CONVENIONUM +
                '|' + $_PREFIJOFACT +
                '|' + SAL41.NROFACT;
            postData({ datosh: datos_envio }, get_url("APP/SALUD/SAL41-03.DLL"))
                .then(function (data) {
                    console.log(data)
                    var date = data.CONSULTA[0].DATOS
                    $_TABLATAR = data.CONSULTA[0].TABLA_TAR
                    _dataSAL41_03(date)
                })
                .catch(err => {
                    console.error(err);
                })
        } else {
            CON851('91', '91', null, 'error', 'error');
            $("#facturad_SAL41").val("");
            _Evaluarnrofact_41();
        }
    } else {
        console.log('CONSULTA FD-CONVENIO')
        let datos_envio = datosEnvio()
        datos_envio += SAL41.ADMINW +
            '|' + $_CONVENIONUM +
            '|' + $_PREFIJOFACT +
            '|' + SAL41.NROFACT;
        console.log(datos_envio)
        // SolicitarDll({ datosh: datos_envio }, _dataSAL41_03, get_url('APP/SALUD/SAL41-03.DLL'));
        postData({ datosh: datos_envio }, get_url("APP/SALUD/SAL41-03.DLL"))
            .then(function (data) {
                var date = data.CONSULTA[0].DATOS
                $_TABLATAR = data.CONSULTA[0].TABLA_TAR
                _dataSAL41_03(date)
            })
            .catch(err => {
                console.error(err)
            })
    }
}

function _dataSAL41_03(data) {
    console.log(data, "SAL41-03");
    var date = data.split("|");
    $_CODTAR = date[1].trim();
    $_DESCRIPTAR = date[2].trim();
    $("#convenio_SAL41").val($_CODTAR + " - " + $_DESCRIPTAR);
    $_PORCPOTAR = date[3].trim();
    $_PORCPOTAR = parseFloat($_PORCPOTAR);
    $_PORCNPTAR = date[4].trim();
    $_PORCNPTAR = parseFloat($_PORCNPTAR);
    $_PORCMOTAR = date[5].trim();
    $_PORCMOTAR = parseFloat($_PORCMOTAR);
    $_PORCMQTAR = date[6].trim();
    $_PORCMQTAR = parseFloat($_PORCMQTAR);
    let salminusu = $_USUA_GLOBAL[0].SAL_MIN;
    if (parseInt(salminusu) != 0) $_SALMINTAR = salminusu / 30
    else $_SALMINTAR = 0;
    $_SALMINTAR = parseFloat($_SALMINTAR);
    $_CODTABTAR = [date[8], date[9], date[10], date[11], date[12], date[13]];
    // $_FACTCAPITNUM = date[14].trim();
    // $_PRECAPITNUM = $_FACTCAPITNUM.substring(0, 1);
    // $_NROCAPITNUM = $_FACTCAPITNUM.substring(1, 6);
    // $_NITNUM = date[15].trim();
    // $_NITCTAW = $_NITNUM;
    // $_FECHAINGNUM = date[16].trim();
    // $_REDEXTERNUM = date[17].trim();
    $_HNQUIRTAR = date[18].trim();
    if ($_HNQUIRTAR.trim() == '') {
        $_HNQUIRTAR = '000000.00';
    }
    $_HNQUIRTAR = parseFloat($_HNQUIRTAR);
    // $_CISNUM = date[19].trim();
    $_PORCTABTAR = [date[20].trim(), date[21].trim(), date[22].trim(), date[23].trim(), date[24].trim(), date[25].trim()];
    $_LLAVENUM = date[26].trim();
    $_HNAYUDTAR = date[27].trim();
    $_HNANESTAR = date[28].trim();
    let json = date[29].trim();
    $_BASEMEDTAR = date[30].trim();
    // $_ARTIVANUM = date[31].trim();
    // $_CLASIFNUM = date[32].trim();
    if (date[0].trim() == '00'){
        if ($_CLFACT == '0') {
            $_CODTABW = $_CONVENIONUM;
            if ($_PORCPOTAR == 0) {
                $_PORCPOTAR = 100;
                $_BASEMEDTAR = 3;
                if (SAL41.OPCIONACTIVA == '09426') {
                    _Premacrodocumento_41();
                } else {
                    _Macrodocumentos_41();
                }
            } else if ($_PORCNPTAR == 0) {
                $_PORCNPTAR = $_PORCPOTAR;
                if (SAL41.OPCIONACTIVA == '09426') {
                    _Premacrodocumento_41();
                } else {
                    _Macrodocumentos_41();
                }
            } else if ($_PORCMOTAR == 0) {
                $_PORCMOTAR = $_PORCPOTAR;
                if (SAL41.OPCIONACTIVA == '09426') {
                    _Premacrodocumento_41();
                } else {
                    _Macrodocumentos_41();
                }
            } else if ($_PORCMQTAR == 0) {
                $_PORCMQTAR = $_PORCPOTAR;
                if (SAL41.OPCIONACTIVA == '09426') {
                    _Premacrodocumento_41();
                } else {
                    _Macrodocumentos_41();
                }
            } else {
                if (SAL41.OPCIONACTIVA == '09426') {
                    _Premacrodocumento_41();
                } else {
                    _Macrodocumentos_41();
                }
            }
        } else {
            console.log('CLFACT > 0 450')
            salminnumero = $.isNumeric($_SALMINTAR);
            if ($_CLFACT == "7") {
                $_SWCL = "5";
                _Premacrodocumento_41();
            } else {
                $_SWCL = $_CLFACT;
                _Premacrodocumento_41();
            }
        }
    } else {
        CON851('', 'Error no existe convenio', null, 'error', 'Error');
        $("#convenio_SAL41").val('');
        if (SAL41.OPCIONACTIVA == '09426') {
            _aceptarcuenta_450();
        } else {
            _Evaluarnrofact_41();
        }
    }
}

function _Premacrodocumento_41() {
    console.log('_Premacrodocumento_41');
    $_TIPOTABW = $_CLFACT;
    $_CODTABW = $_CODTABTAR[$_SWCL];
    if (($_SALMINTAR == 0) || (salminnumero == true)) {
        $_SALMINW = $_SALMINTAR;
        if (SAL41.OPCIONACTIVA == '09426') {
            _validartarifa_450();

        } else {
            _Macrodocumentos_41();
        }
    } else {
        // COMPUTE FACTOR-W ROUNDED = PORC-TAB-TAR (SW-CL) / 100
        if (SAL41.OPCIONACTIVA == '09426') {
            _validartarifa_450();
        } else {
            _Macrodocumentos_41();
        }
    }
}

function _validartarifa_450() {
    console.log('$_CODTABW', $_CODTABW)
    $_TARIFFACT = $_CODTABW;
    if ($_TARIFFACT != $_TARIFFACTW) {
        _cambiotarifa_450();
    } else {
        SER822(_Evaluarfecha_41, _evaluarSER822_41);
    }
}

function _cambiotarifa_450() {
    var ventanatarifa = bootbox.dialog({
        title: 'ATENCION! SE CAMBIO LA TARIFA',
        message: '<style type="text/css">' + '.modal-footer {' +
            +'padding: 10px;' +
            'text-align: right;' +
            'margin-top:38px;' +
            'border-top: 1px solid #e5e5e5;}' +
            '</style>' +
            '<div class="table-scrollable">' +
            '<table class="table table-striped table-hover">' +
            '<thead><tr>' +
            '<th>Tarifa Anterior</th>' +
            '<th>Tarifa Actual</th>' +
            '</tr></thead>' +
            '<tbody>' +
            //registro existente
            '<tr class="encontrado">' +
            `<td>${$_TARIFFACTW}</td>` +
            `<td>${$_TARIFFACT}</td>` +
            '</tbody>' +
            '</table>' +
            '</div>' //cierrra portlety
        ,
        buttons: {
            Aceptar: {
                span: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanatarifa.off('show.bs.modal');
                    // _Revisarpermisos2_41();
                }
            }
        }
    })
}

function _Macrodocumentos_41() {
    console.log('_Macrodocumentos_41');
    $_NITCTAW2 = $_NITCTAW.substring(4, 10);
    let datos_envio = datosEnvio()
    datos_envio += $_NITCTAW2 + '|' + $_DESCRIPNUM + '|' + 'DOCUMENTOS EXIGIDOS POR LA ENTIDAD' + '|' + 'F'
    console.debug(datos_envio);
    let URL = get_url("APP/SALUD/SER210A.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(function (data) {
            console.debug(data, "SER210A_01", 'revisar');
            console.log('VENTANA DE CONSULTA DE PUERTA DE INGRESO');
            if (SAL41.UNSERW == '08') {
                _evaluarSER822_41({ COD: '2', DESCRIP: 'C.EXTERNA' });
            } else {
                SER822(_Evaluarfecha_41, _evaluarSER822_41, '2');
            }
        })
        .catch(err => {
            console.debug(err);
        })
}

function _evaluarSER822_41(data) {
    $_PUERTAINGW = data.COD;
    switch (data.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
            _Validarpuertaingreso_41();
            break;
    }
    $("#pingreso_SAL41").val(data.COD + " - " + data.DESCRIP);
}

function _Validarpuertaingreso_41() {
    $_SWBONO = "0";
    if ($_PUERTAINGW == 2) {
        if (($_UNSERW != '02') || ($_UNSERW != '08')) {
            _Ubicarcliente_41();
        } else {
            CON851('03', '03', null, 'error', 'error');
            SER822(_Evaluarfecha_41, _evaluarSER822_41);
        }
    } else if (($_UNSERW == "01") && ($_PUERTAINGW == 2)) {
        CON851('03', '03', null, 'error', 'error');
        SER822(_Evaluarfecha_41, _evaluarSER822_41);
    } else if (((SAL41.NITUSU == "0830092718") || (SAL41.NITUSU == "0830092719") || (SAL41.NITUSU == "0900193162")) && (($_NITNUM == "0830092718") || ($_NITNUM == "0830092719") || ($_NITNUM == "0900193162")) && (SAL41.OPCIONACTIVA != '09426')) {
        // GO TO DATO-BARRAS-PROMO
        console.debug('dato barras promo');
    } else {
        _Ubicarcliente_41();

    }
}

function _Ubicarcliente_41() {
    console.log('ubicarcliente')
    if (($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) {
        console.log('va ir mostrar cliente')
        _Mostrarcliente_41();
    } else if ($_PREFIJOFACT == "E" && (SAL41.OPCIONACTIVA != '09426')) {
        if (SAL41.NITUSU == "0800162035") {
            $_NITFACT = "222222222";
            _Evaluarcliente_41();
        } else {
            $_NITFACT = "9999";
            _Evaluarcliente_41();
        }
    } else {
        _Evaluarcliente_41();
    }
}

function _Evaluarcliente_41() {
    console.log('CLIENTE')
    $_NITFACT = '' ? clienteMask.typedValue = '' : clienteMask.typedValue = $_NITFACT;
    validarInputs({
        form: '#CLIENTE_41',
        orden: '1'
    },
        function () { _Evaluarfecha_41() },
        _Cliente_41
    )
}

function _Cliente_41() {
    console.log('ingresa cliente')
    $_NITFACT = clienteMask.unmaskedValue;
    var espacios = $_NITFACT.trim();
    var nitfact = espacios.padStart(10, '0');
    $_NITFACT = nitfact;
    if (($_NITFACT.trim() == "") || (parseInt($_NITFACT) == 0)) {
        CON851('01', '01', null, 'error', 'Error');
        $('#cliente_SAL41').val('');
        _Evaluarcliente_41();
    } else {
        SolicitarDll({ datosh: datosEnvio() + SAL41.ADMINW + '|' + $_NITFACT + '|' }, _dataSAL41_04, get_url('APP/SALUD/SAL41-04.DLL'));
    }
}

function _dataSAL41_04(data) {
    console.debug(data, "SAL41-04");
    data = data.split("|");
    $_DESCRIPTER = data[1].trim();
    $_ACTTER = data[2].trim();
    $_ENTIDADTER = data[3].trim();
    $_DESCRIPTER2 = data[4].trim();
    $_CONVENIOTER = data[5].trim();
    $_VENDEDORTER = data[6].trim();
    SAL41.CODCIUTER = data[7].trim();
    if (data[0].trim() == "00") {
        if ($_PREFIJOFACT == "E") {
            switch (SAL41.PUCUSU) {
                case "4":
                    if ($_ACTTER == "27" || $_ACTTER == "25") {
                        _Mostrarcliente_41();
                    } else {
                        CON851('14', '14', null, 'error', 'Error');
                        $("#cliente_SAL41").val("");
                        _Evaluarcliente_41();
                    }
                    break;
                case "6":
                    if ($_ACTTER == "27" || $_ACTTER == "25") {
                        _Mostrarcliente_41();
                    } else {
                        CON851('14', '14', null, 'error', 'Error');
                        $("#cliente_SAL41").val("");
                        _Evaluarcliente_41();
                    }
                    break;
                default:
                    if (($_ACTTER == "25") || ($_ACTTER == "30")) {
                        _Mostrarcliente_41();
                    } else {
                        CON851('14', '14', null, 'error', 'Error');
                        $("#cliente_SAL41").val("");
                        _Evaluarcliente_41();
                    }
                    break;
            }
        } else {
            _Mostrarcliente_41();
        }
    } else if (data[0].trim() == '01') {
        _Crearcliente_41();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _Crearcliente_41() {
    let { ipcRenderer } = require("electron");
    ipcRenderer.send('another', datos = { directorio: 'CONTAB/paginas/CON110C.html', cliente: clienteMask.unmaskedValue });
    vector = ['on', 'Actualizando maestro de terceros...']
    _EventocrearSegventana(vector, _Evaluarcliente_41);
}

function _Mostrarcliente_41() {
    console.log('MOSTRAR CLIENTE')
    if (parseInt($_NITFACT) == 0) {
        $('#cliented_401').val('');
        _Evaluarcliente_41();
    } else {
        clienteMask.typedValue = $_NITFACT;
        console.log('$_NITFACT', $_NITFACT, clienteMask.typedValue);
        $_NITFACT = $_NITFACT.padStart(10, '0');
        let datos_envio = datosEnvio()
        datos_envio += SAL41.ADMINW + '|' + $_NITFACT;
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_042, get_url('APP/SALUD/SAL41-04.DLL'));
    }
}

function _dataSAL41_042(data) {
    console.debug(data, "SAL41-04");
    var date = data.split("|");
    $_DESCRIPTER = date[1].trim();
    $_ACTTER = date[2].trim();
    $_ENTIDADTER = date[3].trim();
    $_DESCRIPTER2 = date[4].trim();
    $_CONVENIOTER = data[5].trim();
    $_VENDEDORTER = date[6].trim();
    SAL41.CODCIUTER = data[7].trim();
    if (date[0].trim() == '00') {
        _calcularmes_SAL41();
    } else if (date[0].trim() == "01") {
        if (SAL41.OPCIONACTIVA == '09426') {
            if (SAL41.SWSTEP == '2') {
                CON851('01', '01', null, 'error', 'Error');
                _Evaluarcliente_41()
            } else {
                $_DESCRIPTER = '*';
                _calcularmes_SAL41();
            }
        } else {
            _Crearcliente_41();
        }
    } else {
        CON852(date[0], date[1], date[2], _toggleNav)
    }
}

function _calcularmes_SAL41() {
    $('#cliented_SAL41').val($_DESCRIPTER);
    if ($_DESCRIPNUM.trim() != '') $('#cliented_SAL41').val($_DESCRIPNUM);
    var a = moment([$_FECHAINGNUM.substring(0, 4), $_FECHAINGNUM.substring(4, 6), $_FECHAINGNUM.substring(6, 8)]);
    var b = moment([$_FECHASIGFACT.substring(0, 4), $_FECHASIGFACT.substring(4, 6), $_FECHASIGFACT.substring(6, 8)]);
    $_ENTESTANCEDIT = a.diff(b, 'days')
    if ((SAL41.OPCIONACTIVA == '09421') || (SAL41.OPCIONACTIVA == '09426')) {
        _Validandocliente_41();
    }
}

function _Validandocliente_41() {
    console.log('HACE CONDICIONES DE MOSTRAR CLIENTE AUN')
    $_NOMBRECTA = $_DESCRIPTER;
    if (($_PREFIJOFACT == "C") && ((SAL41.NITUSU == "0892000401") || (SAL41.NITUSU == "0900648993") || (SAL41.NITUSU == "0900755133") || (SAL41.NITUSU == "0900804411") || (SAL41.NITUSU == "0900870633")) && ($_NITFACT != "9999")) {
        if (($_ACTTER == "01") || ($_ACTTER == "03") || ($_ACTTER == "04") || ($_ACTTER == "05")) {
            if (SAL41.OPCIONACTIVA == '09426') {
                _datopaciente_450();
            } else {
                _Validandocliente2_41();
            }
        } else {
            toastr.info("ERROR ACTIVIDAD DE TERCERO");
            _Evaluarcliente_41();
        }
    } else {
        if (SAL41.OPCIONACTIVA == '09426') {
            _datopaciente_450();
        } else {
            _Validandocliente2_41();
        }
    }
}

function _datopaciente_450() {
    console.log('DATO PACIENTE 450', SAL41.IDHISTORIAFACT);
    $_OPSEGU = "I46P";
    let datos_envio = datosEnvio() + SAL41.ADMINW + '|' + $_OPSEGU;
    let URL = get_url("APP/CONTAB/CON904S.DLL");
    postData({
        datosh: datos_envio
    }, URL)
        .then((data) => {
            loader("hide")
            if (data.trim() == '00') {
                _Evaluaridhistoriafact_41()
            } else {
                _Buscarconsultas_41();
            }
        })
        .catch(error => {
            console.error(error)
        });
}



function _Validandocliente2_41() {
    $_TIPOPACI.length > 0 ? $_TIPOPACI = $_TIPOPACI : $_TIPOPACI = ' ';
    if (($_ACTTER == "23") && ($_ENTESTANCEDIT > 0) && ($_TIPOPACI == "S") && ($_PREFIJOFACT == "P")) {
        // _avisarpos();
        // toastr.info("Recuerde que el ¨POS solo cubre 24 HORAS en observación");
        CON851('', 'Recuerde que el POS solo cubre 24 HORAS en observación', null, 'warning', 'Advertencia!');
    }
    if ($_PREFIJOFACT == "P") {
        if ((($_CLFACT == "0") || ($_CLFACT == "1") || ($_CLFACT == "3") || ($_CLFACT == "4"))) {
            _Datopaciente_41();
        } else {
            _Datoordserv_41();
        }
    } else {
        _Datoordserv_41();
    }
}

function _Datoordserv_41() {
    if (SAL41.NITUSU == "0800162035") {
        if ((($_UNSERW == "01") || ($_UNSERW == "09")) && ($_REDEXTERNUM != "S")) {
            $_SWORDSERV = "N";
            SAL41.ORDSERVFACT = "";
            _Datopaciente_41();
        } else {
            _Ventanaordserv_41();
        }
    } else {
        if (SAL41.NITUSU == "0900434629") {
            $_SWORDSERV = "S";
            _Ventanaordserv_41();
        } else {
            if ((($_UNSERW == "01") || ($_UNSERW == "08") || ($_UNSERW == "09")) || ($_FECHAACT == $_FECHAFACT)) {
                $_SWORDSERV == "N";
                SAL41.ORDSERVFACT = "";
                _Datopaciente_41();
            } else {
                _Ventanaordserv_41();
            }
        }
    }
}

function _Ventanaordserv_41() {
    console.debug('ventanaordserv');
    var ventanaOrdserv = bootbox.dialog({
        size: 'small',
        title: 'SERVICIOS PRESTADO RED EXTERNA',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="form-group"> ' +
            '<label class="col-md-6 control-label" for="name">' + "Es un servicion autorizado x red externa?" + '</label> ' +
            '<div class="col-md-6" id="REDEXT_401"> ' +
            '<input id="redext_SAL41" class="form-control input-md" data-orden="1" maxlength="1"> ' +
            '<span class="help-block">' + "S/N" + '</span> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanaOrdserv.off('show.bs.modal');
                    console.debug($_SWORDSERV, $_SWORDSERV.length);
                    if ($_SWORDSERV == 'N') {
                        setTimeout(_Datopaciente_41, 200);
                    } else {
                        _Leerpaciente_41();
                    }
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanaOrdserv.off('show.bs.modal');
                    _Evaluarcliente_41();
                }
            }
        }
    });
    ventanaOrdserv.init($('.modal-footer').hide());
    ventanaOrdserv.init(_EvaluarRedext_41());
    ventanaOrdserv.init(Maskventanaordserv_41());
    ventanaOrdserv.on('shown.bs.modal', function () {
        $("#redext_SAL41").focus();
    });
}

function _EvaluarRedext_41() {
    _inputControl("disabled");
    validarInputs({
        form: '#REDEXT_401',
        orden: "1"
    },
        () => { $('.btn-danger').click() },
        () => {
            $_SWORDSERV = $('#redext_SAL41').val();
            if ($_SWORDSERV.trim() != '') {
                if ($_SWORDSERV == 'N') {
                    SAL41.ORDSERVFACT = '';
                    $('.btn-primary').click();
                } else {
                    $_PREFORDSERVFACT = SAL41.PREFIJOUSU;
                    $_CLORDSERVFACT = $_CLFACT;
                    _Ventanaordserv2_41();
                }
            } else {
                _EvaluarRedext_41();
            }
        }
    )
}

function Maskventanaordserv_41() {
    var prefijoMask = IMask($("#redext_SAL41")[0], {
        mask: 'a',
        definitions: {
            'a': /[N-S]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
}

function _Ventanaordserv2_41() {
    $('.bootbox-body').html(
        '<div class="row"> ' +
        '<div class="col-md-12"> ' +
        '<div class="col-md-12" id="PREFORDSERV_41"> ' +
        '<label class="col-md-6 control-label" for="name">' + "PREFIJO" + '</label> ' +
        '<div class="col-md-6"> ' +
        '<input id="prefordserv_SAL41" class="form-control input-md" data-orden="1" maxlength="2"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="col-md-12" id="CLORDSERV_41"> ' +
        '<label class="col-md-6 control-label" for="name">' + "CLASE" + '</label> ' +
        '<div class="col-md-6"> ' +
        '<input id="clordserv_SAL41" class="form-control input-md" data-orden="1" maxlength="1"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="col-md-12" id="NROORDSERV_41"> ' +
        '<label class="col-md-6 control-label" for="name">' + "NRO.ORDEN" + '</label> ' +
        '<div class="col-md-6"> ' +
        '<input id="nroordserv_SAL41" class="form-control input-md" data-orden="1" maxlength="6"> ' +
        '</div> ' +
        '</div> ' +
        '</div>'
    );
    $("#prefordserv_401").val(SAL41.PREFIJOUSU), $("#clordserv_401").val($_CLFACT);
    _Evaluarprefordserv_41();
}

function _Evaluarprefordserv_41() {
    _inputControl("disabled");
    $('#prefordserv_SAL41').val($_SUCFACT);
    $('#clordserv_SAL41').val($_CLFACT);
    validarInputs({
        form: '#PREFORDSERV_41',
        orden: "1"
    },
        () => {
            $('.bootbox-body').html(
                '<div class="row"> ' +
                '<div class="col-md-12"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-6 control-label" for="name">' + "Es un servicion autorizado x red externa?" + '</label> ' +
                '<div class="col-md-6" id="REDEXT_401"> ' +
                '<input id="redext_SAL41" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                '<span class="help-block">' + "S/N" + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +
                '</div>'
            )
            _EvaluarRedext_41();
        },
        () => {
            SAL41.PREFORDSERVFACT = $('#prefordserv_SAL41').val();
            if (SAL41.PREFORDSERVFACT.trim() == '') {
                CON851('02', '02', null, 'error', 'Error');
                _Evaluarprefordserv_41();
            } else {
                _Evaluarclordserv_41();
            }
        }
    )
}

function _Evaluarclordserv_41() {
    console.log('evaluar clor')
    validarInputs({
        form: '#CLORDSERV_41',
        orden: "1"
    },
        _Evaluarprefordserv_41,
        () => {
            SAL41.CLORDSERVFACT = $('#clordserv_SAL41').val();
            let CL = { '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '7': '7' }
            var contenido = CL[SAL41.CLORDSERVFACT];
            if (contenido) {
                _Evaluarnroordserv_41();
            } else {
                CON851('03', '03', null, 'error', 'Error');
                _Evaluarclordserv_41();
            }
        }
    )
}

function _Evaluarnroordserv_41() {
    console.log('evaluar nro')
    validarInputs({
        form: '#NROORDSERV_41',
        orden: "1"
    },
        _Evaluarclordserv_41,
        () => {
            SAL41.ORDSERVFACT = SAL41.PREFORDSERVFACT + SAL41.CLORDSERVFACT + $("#nroordserv_SAL41").val().padStart(6, '0');
            SolicitarDll({ datosh: datosEnvio() + SAL41.ORDSERVFACT }, data => {
                data = data.split('|');
                if (data[0].trim() == '00') {
                    $('.btn-primary').click();
                    SAL41.IDHISTORIAFACT = data[4].trim();
                    SAL41.ESPECLAB = data[11].trim();
                } else if (data[0].trim() == '01') {
                    CON851('01', '01', null, 'error', 'error');
                    _Evaluarnroordserv_41();
                } else {
                    CON852(data[0], data[1], data[2], _toggleNav);
                }
            }, get_url("APP/SALUD/SAL41-19.DLL"));
        }
    )
}

function _Datopaciente_41() {
    console.debug("estoy en dato paciente", SAL41.NITUSU, $_UNSERW);
    $_SWCREAR = '0';
    // CLINICA META Y SERVIMEDICOS TIENEN PISTOLA CEDULA ADMISIONES URGENCIAS
    if (((SAL41.NITUSU == "0892000401") || (SAL41.NITUSU == "0800162035")) && (($_UNSERW == "01") || ($_UNSERW == "02"))) {
        setTimeout(() => { SER848(data => { idhistoriafactMask.typedValue = data; _Leerpaciente_41() }, _Datopaciente2_41) }, 50);
    } // LA MALOKA
    else if (SAL41.NITUSU == "0800251482") {
        _Leerpaciente_41();
    } else if (SAL41.NITUSU == "0830512772") {
        _Evaluaridhistoriafact_41();
    } else {
        _Datopaciente2_41();
    }
}

function _Datopaciente2_41() {
    if ((($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) && ($_IDPACNUM != "000000000000001")) {
        console.debug("diferente a e y p y diferente a 000000000000001 el id del paciente");
        SAL41.IDHISTORIAFACT = $_IDPACNUM;
        console.debug(SAL41.IDHISTORIAFACT);
        SAL41.IDHISTORIAFACT = parseInt(SAL41.IDHISTORIAFACT);
        if ($_PREFIJOFACT == 'A' || $_PREFIJOFACT == 'P' || $_PREFIJOFACT == 'T') {
            idhistoriafactMask.typedValue = SAL41.IDHISTORIAFACT;
        }
        _Evaluaridhistoriafact_41();
    } else {
        _Evaluaridhistoriafact_41();
    }
}

function _Evaluaridhistoriafact_41() {
    if (($_PREFIJOFACT != 'A') && (SAL41.OPCIONACTIVA != '09426')) {
        idhistoriafactMask.typedValue = SAL41.IDHISTORIAFACT;
    } else {
        $_SWCREAR = '0';
    }
    validarInputs({
        form: '#PACIENTE_41',
        orden: "1"
    },
        _Evaluarfecha_41,
        () => {
            if (SAL41.OPCIONACTIVA == '09426') {
                SAL41.IDHISTORIAFACT == $('#paciente_SAL41').val();
                if ((SAL41.IDHISTORIAFACT == "000000000000000") || (SAL41.IDHISTORIAFACT.trim() == "")) {
                    _Evaluaridhistoriafact_41();
                } else {
                    _leerpaciente_450();
                }
            } else {
                _Validaridhistoriafact_41();
            }
        })
}

function _Validaridhistoriafact_41() {
    SAL41.IDHISTORIAFACT = idhistoriafactMask.unmaskedValue;
    SAL41.IDHISTORIAFACT = SAL41.IDHISTORIAFACT.padStart(15, "0");
    if ((SAL41.IDHISTORIAFACT == "000000000000000") || (SAL41.IDHISTORIAFACT.trim() == "")) {
        $('#paciente_SAL41').val('');
        _Datopaciente_41();
    } else if (($_PREFIJOFACT == "P") && (SAL41.IDHISTORIAFACT != $_IDPACNUM)) {
        CON851('7O', '7O', null, 'error', 'Error');
        _Evaluaridhistoriafact_41();
    } else if ((($_CLFACT == "1") || ($_CLFACT == "2") || ($_CLFACT == "3") || ($_CLFACT == "5") || ($_CLFACT == "5")) && (parseInt(SAL41.IDHISTORIAFACT) < 000000000000010)) {
        CON851('03', '03', null, 'error', 'Error');
        _Datopaciente_41();
    } else if ((SAL41.NITUSU == "0800162035")) {
        if (((SAL41.PREFIJOUSU == "05") || (SAL41.PREFIJOUSU == "06") || (SAL41.PREFIJOUSU == "08") || (SAL41.PREFIJOUSU == "10") || (SAL41.PREFIJOUSU == "11") || (SAL41.PREFIJOUSU == "12") || (SAL41.PREFIJOUSU == "14") || (SAL41.PREFIJOUSU == "15") || (SAL41.PREFIJOUSU == "17")) && (parseInt($_NROCAPITNUM) > 0) && ($_FACTCAPITNUM == $_LLAVENUM) && (SAL41.IDHISTORIAFACT != "000000000000001")) {
            CON851('1W', '1W', null, 'error', 'Error');
        } else {
            if ((parseInt($_NROCAPITNUM) > 0) && ($_FACTCAPITNUM == $_LLAVENUM) && (SAL41.IDHISTORIAFACT != "000000000000001")) {
                CON851('1W', '1W', null, 'error', 'Error');
                _Datopaciente_41();
            } else {
                _Leerpaciente_41();
            }
        }
    } else {
        if ((parseInt($_NROCAPITNUM) > 0) && ($_FACTCAPITNUM == $_LLAVENUM) && (SAL41.IDHISTORIAFACT != "000000000000001")) {
            CON851('1W', '1W', null, 'error', 'Error');
            _Datopaciente_41();
        } else {
            _Leerpaciente_41();
        }
    }
}

function _Leerpaciente_41() {
    loader("show");
    SAL41.IDHISTORIAFACT = idhistoriafactMask.unmaskedValue;
    console.log(SAL41.IDHISTORIAFACT, 'SAL41.IDHISTORIAFACT')
    let datos_envio = datosEnvio();
    datos_envio += SAL41.IDHISTORIAFACT.padStart(15, '0');
    datos_envio += '|'
    let URL = get_url("APP/SALUD/SAL41-05.DLL");
    postData({
        datosh: datos_envio
    }, URL)
        .then((data) => {
            loader("hide")
            console.log(data, 'respuesta paciente')
            _dataSAL41_05(data)
        })
        .catch(error => {
            console.error(error)
            loader("hide")
            CON851('01', 'NO EXISTE PACIENTE', null, 'error', 'Error')
            let URL = get_url("APP/CONTAB/CON904S.DLL");
            postData({
                datosh: datosEnvio() + SAL41.ADMINW + '|IS767|'
            }, URL)
                .then((data) => {
                    loader("hide")
                    if (data.trim() == '00' && $_SWCREAR == '0') {
                        $_SWCREAR = '1';
                        let { ipcRenderer } = require("electron");
                        ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110C.html', cedula: idhistoriafactMask.unmaskedValue.padStart(15, '0') });
                        vector = ['on', 'Actualizando maestro de pacientes...']
                        _EventocrearSegventana(vector, _Evaluaridhistoriafact_41);
                    } else {
                        CON851('01', '01', null, 'error', 'Error');
                        _Datopaciente_41();
                    }
                })
                .catch(error => {
                    console.error(error)
                });
        });
}

function _leerpaciente_450() {
    SAL41.IDHISTORIAFACT = SAL41.IDHISTORIAFACT.padStart(15, '0');
    let URL = get_url("APP/SALUD/SAL41-05.DLL");
    postData({
        datosh: datosEnvio() + SAL41.IDHISTORIAFACT + '|'
    }, URL)
        .then((data) => {
            console.log('data', data)
            var date = data.split('|');
            $_EPSPACI = date[0].trim();
            $_DESCRIPPACI = date[1].trim();
            $_NACIMPACI = date[2].trim();
            $_TIPOPACI = date[3].trim();
            $_CONTRATOPACI = date[4].trim();
            $_TUTELAPACI = date[5].trim();
            $_ALTCOSPACI = date[6].trim();
            $_PROGESPPACI = date[7].trim();
            $_CRONICOPACI = date[8].trim();
            $_MULTICONSULPACI = date[9].trim();
            $_SEXOPACI = date[10].trim();
            $_CLASIFPACI = date[11].trim();
            $_CIUDADPACI = date[12].trim();
            $_TIPOAFILPACI = date[13].trim();
            $_DERECHOPACI = date[14].trim();
            $_FECHAVENCEPACI = date[15].trim();
            $_RESTAPLIPACI = date[16].trim();
            $_RESTDROGPACI = date[17].trim();
            $_RESTCIRUPACI = date[18].trim();
            $_RESTLABOPACI = date[19].trim();
            $_RESTIMAGPACI = date[20].trim();
            $_RESTESTAPACI = date[21].trim();
            $_RESTCONSPACI = date[22].trim();
            $_RESTTERFPACI = date[23].trim();
            $_RESTTEROPACI = date[24].trim();
            $_RESTODONPACI = date[25].trim();
            $_RESTPYPPACI = date[26].trim();
            $_NITFACTPACI = date[27].trim();
            $_TIPOPACIDPACI = date[28].trim();
            $_ESTRATOPACI = date[29].trim();
            $_FECHANOTAPAC2 = date[30].trim();
            $_OBSERV1ANOTAPAC2 = date[31].trim();
            $_OBSERV1BNOTAPAC2 = date[32].trim();
            $_OBSERV1CNOTAPAC2 = date[33].trim();
            $_OBSERV2NOTAPAC2 = date[34].trim();
            $_OBSERV3NOTAPAC2 = date[35].trim();
            $_OBSERV4NOTAPAC2 = date[36].trim();
            $_OBSERV5NOTAPAC2 = date[37].trim();
            $_OPEROBSENOTAPAC2 = date[38].trim();
            $_FACTNOTAPAC2 = date[39].trim();
            $_DIRECCPACI = date[40].trim();
            $_TELEFONOPACI = date[41].trim();
            $_ESTCIVPACI = date[42].trim();
            $_CELPACI = date[43].trim();
            $_EMAILPACI = data[44].trim();
            SAL41.OCUPACION = data[45].trim();
            SAL41.ZONAPACI = data[46].trim();
            SAL41.ACOMPAPACI = date[47].trim();
            SAL41.NOMBREOCU = date[48].trim();
            $('#paciented_SAL41').val($_DESCRIPPACI);
            if (($_SWCREAR == '0') && (($_CLFACT == '3') || ($_CLFACT == '4') || ($_CLFACT == '5') || ($_CLFACT == '7'))) {
                let URL = get_url("APP/CONTAB/CON904S.DLL");
                postData({
                    datosh: datosEnvio() + SAL41.ADMINW + '|IS767|'
                }, URL)
                    .then((data) => {
                        loader("hide")
                        if (data.trim() == "00") {
                            $_SWCREAR = '1';
                            console.log(idhistoriafactMask.unmaskedValue);
                            let { ipcRenderer } = require("electron");
                            ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110C.html', cedula: idhistoriafactMask.unmaskedValue.padStart(15, '0') });
                            vector = ['on', 'Actualizando maestro de pacientes...']
                            _EventocrearSegventana(vector, _Idhistoriafact_450);
                        } else {
                            CON851('01', '01', null, 'error', 'Error');
                            _datopaciente_450();
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        _Evaluaridhistoriafact_41();
                    });
            } else {
                _Validandocliente3_41();
            }
        })
        .catch(error => {
            console.error(error)
            if ($_SWCREAR == '0') {
                $_SWCREAR = '1';
                console.log(idhistoriafactMask.unmaskedValue);
                let { ipcRenderer } = require("electron");
                ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110C.html', cedula: idhistoriafactMask.unmaskedValue.padStart(15, '0') });
                vector = ['on', 'Actualizando maestro de pacientes...']
                _EventocrearSegventana(vector, _Validandocliente3_41);
            } else {
                CON851('01', '01', null, 'error', 'Error')
                _datopaciente_450();
            }
        });
}

function _Idhistoriafact_450() {
    console.log('Idhistoriafact_450', SAL41.IDHISTORIAFACT)
    $('#paciente_SAL41').val(SAL41.IDHISTORIAFACT);
    // $('#paciented_SAL41').val($_DESCRIPPACI);
    // _Validarpaciente_41();
    _Validandocliente3_41();
}

function _dataSAL41_05(data) {
    console.debug(data, "SAL41-05");
    var date = data.split('|');
    $_EPSPACI = date[0].trim();
    $_DESCRIPPACI = date[1].trim();
    $_NACIMPACI = date[2].trim();
    $_TIPOPACI = date[3].trim();
    $_CONTRATOPACI = date[4].trim();
    $_TUTELAPACI = date[5].trim();
    $_ALTCOSPACI = date[6].trim();
    $_PROGESPPACI = date[7].trim();
    $_CRONICOPACI = date[8].trim();
    $_MULTICONSULPACI = date[9].trim();
    $_SEXOPACI = date[10].trim();
    $_CLASIFPACI = date[11].trim();
    $_CIUDADPACI = date[12].trim();
    $_TIPOAFILPACI = date[13].trim();
    $_DERECHOPACI = date[14].trim();
    $_FECHAVENCEPACI = date[15].trim();
    $_RESTAPLIPACI = date[16].trim();
    $_RESTDROGPACI = date[17].trim();
    $_RESTCIRUPACI = date[18].trim();
    $_RESTLABOPACI = date[19].trim();
    $_RESTIMAGPACI = date[20].trim();
    $_RESTESTAPACI = date[21].trim();
    $_RESTCONSPACI = date[22].trim();
    $_RESTTERFPACI = date[23].trim();
    $_RESTTEROPACI = date[24].trim();
    $_RESTODONPACI = date[25].trim();
    $_RESTPYPPACI = date[26].trim();
    $_NITFACTPACI = date[27].trim();
    $_TIPOPACIDPACI = date[28].trim();
    $_ESTRATOPACI = date[29].trim();
    $_FECHANOTAPAC2 = date[30].trim();
    $_OBSERV1ANOTAPAC2 = date[31].trim();
    $_OBSERV1BNOTAPAC2 = date[32].trim();
    $_OBSERV1CNOTAPAC2 = date[33].trim();
    $_OBSERV2NOTAPAC2 = date[34].trim();
    $_OBSERV3NOTAPAC2 = date[35].trim();
    $_OBSERV4NOTAPAC2 = date[36].trim();
    $_OBSERV5NOTAPAC2 = date[37].trim();
    $_OPEROBSENOTAPAC2 = date[38].trim();
    $_FACTNOTAPAC2 = date[39].trim();
    $_DIRECCPACI = date[40].trim();
    $_TELEFONOPACI = date[41].trim();
    $_ESTCIVPACI = date[42].trim();
    $_CELPACI = date[43].trim();
    $_EMAILPACI = data[44].trim();
    SAL41.OCUPACION = data[45].trim();
    SAL41.ZONAPACI = data[46].trim();
    SAL41.ACOMPAPACI = date[47].trim();
    SAL41.NOMBREOCU = date[48].trim();
    $('#paciented_SAL41').val($_DESCRIPPACI);
    // if (date[0].trim() == "00") {
    _Validarpaciente_41();
    // } else if (date[0].trim() == '01') {
    //     let datos_envio = datosEnvio();
    //     datos_envio += '|'
    //     datos_envio += $_OPSEGU;
    //     SolicitarDll({ datosh: datos_envio }, _dataCON904S_01_41, get_url("APP/CONTAB/CON904S.DLL"));
    // }
    // else {
    //     CON852(date[0], date[1], date[2], _toggleNav)
    // }
}

// function _Actualizacionmaestrosu_41() {
//     ipcRenderer.send('another', { html:'SALUD/PAGINAS/SER110C.html'});
// }
function _Validarpaciente_41() {
    if (SAL41.NITUSU == "0900019291") {
        if ((SAL41.NITUSU == '0800162035') && ($_SWINVALID == '2B')) {
            // PREFORM GRABAR-CAMBIO-DOCUMENTO
        } else {
            _Validandocliente3_41();
        }
    } else {
        if ($_SWCREAR == '0') {
            if ((($_CLFACT == "3") || ($_CLFACT == "5") || ($_CLFACT == "7")) || ((SAL41.NITUSU == "0891855847") || (SAL41.NITUSU == "0900565371"))) {
                let URL = get_url("APP/CONTAB/CON904.DLL");
                postData({ datosh: datosEnvio() + localStorage.getItem('Usuario').trim() + '|' + "IS767" + '|' }, URL)
                    .then(data => {
                        console.debug(data);
                        let URL = get_url("APP/CONTAB/CON904.DLL");
                        postData({ datosh: datosEnvio() + localStorage.getItem('Usuario').trim() + '|' + "IS1G" + '|' }, URL)
                            .then(data => {
                                console.debug(data);
                                if (SAL41.NITUSU == "0800162035") {
                                    if (($_EPSPACI == "RES004") && (swinvalid1 == "00")) {
                                        console.debug('segunda ventana de actualizar paciente SER11G')
                                        let { ipcRenderer } = require("electron");
                                        ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110C.html', cedula: idhistoriafactMask.unmaskedValue.padStart(15, '0') });
                                        vector = ['on', 'Actualizando maestro de pacientes...']
                                        _EventocrearSegventana(vector, _Validandocliente3_41);
                                    } else {
                                        console.debug('segunda ventana de actualizar paciente SER11I')
                                        let { ipcRenderer } = require("electron");
                                        ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110C.html', cedula: idhistoriafactMask.unmaskedValue.padStart(15, '0') });
                                        vector = ['on', 'Actualizando maestro de pacientes...']
                                        _EventocrearSegventana(vector, _Validandocliente3_41);
                                    }
                                } else {
                                    $_SWCREAR = '1'
                                    console.debug('segunda ventana de actualizar paciente SER11G')
                                    let { ipcRenderer } = require("electron");
                                    ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110C.html', cedula: idhistoriafactMask.unmaskedValue.padStart(15, '0') });
                                    vector = ['on', 'Actualizando maestro de pacientes...']
                                    _EventocrearSegventana(vector, _Validandocliente3_41);
                                }
                            })
                            .catch(err => {
                                console.error(err);
                                _toggleNav()
                            });
                    })
                    .catch(err => {
                        console.error(err);
                        _toggleNav()
                    });
            } else {
                console.debug('validar cliente 3');
                /// SER 810H
                _Validandocliente3_41();
            }
        } else {
            _Validandocliente3_41();
        }
    }
}

function _Validandocliente3_41() {
    if (SAL41.OPCIONACTIVA == '09426') {
        if (($_PREFIJOFACT == 'A' || $_PREFIJOFACT == "P" || $_PREFIJOFACT == "B" ||
            $_PREFIJOFACT == "D" || $_PREFIJOFACT == "F" || $_PREFIJOFACT == "G" || $_PREFIJOFACT == "H" || $_PREFIJOFACT == "I" || $_PREFIJOFACT == "J" || $_PREFIJOFACT == "K" || $_PREFIJOFACT == "L" ||
            $_PREFIJOFACT == "M" || $_PREFIJOFACT == "N" || $_PREFIJOFACT == "O" || $_PREFIJOFACT == "Q" || $_PREFIJOFACT == "R" || $_PREFIJOFACT == "S" || $_PREFIJOFACT == "W" || $_PREFIJOFACT == "X" ||
            $_PREFIJOFACT == "Y" || $_PREFIJOFACT == "Z" || $_PREFIJOFACT == "V") && ($_ENTIDADTER != $_EPSPACI)) {
            CON851('9S', '9S', null, 'error', 'Error');
        }
        if (((SAL41.UNDEDADMAXSERV == 'D') && (SAL41.EDAD.unid_edad == 'D')) || ((SAL41.UNDEDADMINSERV == 'M') && (SAL41.EDAD.unid_edad == 'D')) || ((SAL41.UNDEDADMAXSERV == 'M') && (SAL41.EDAD.unid_edad == 'A')) || ((SAL41.UNDEDADMINSERV == 'A') && (SAL41.EDAD.unid_edad == 'A')) ||
            ((SAL41.UNDEDADMAXSERV == 'A') && (SAL41.EDAD.unid_edad == 'A') && (SAL41.EDAD.vlr_edad > SAL41.VLREDADMAXSERV)) || ((SAL41.UNDEDADMINSERV == 'A') && (SAL41.EDAD.unid_edad == 'A') && (SAL41.EDAD.vlr_edad < SAL41.VLREDADMINSERV))) {
            CON851('74', '74', null, 'error', 'Error');
            _datopaciente_450();
        } else if ((SAL41.NITUSU == '0830511298') && ($_SUCFACT == "05" || $_SUCFACT == "06" || $_SUCFACT == "18" || $_SUCFACT == "19" || $_SUCFACT == "14" || $_SUCFACT == "02") && ($_EPSPACI == 'CCF055')) {
            console.log('abre ventana de PACIENTE GESTION DE RIESGO')
            var ventanagestriesgo = bootbox.dialog({
                size: 'small',
                title: 'GESTION DEL RIESGO',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-6 control-label" for="name">' + "Paciente gestion del riesgo" + '</label> ' +
                    '<div class="col-md-6" id="RIESGO_401"> ' +
                    '<input id="gestriesgo_SAL41" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                    '<span class="help-block">' + "S/N" + '</span> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="form-group"> ' +
                    '<label class="col-md-6 control-label" for="name">' + "Gestante?: " + '</label> ' +
                    '<div class="col-md-6" id="GESTANTE_401"> ' +
                    '<input id="gestante_SAL41" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                    '<span class="help-block">' + "S/N" + '</span> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="form-group"> ' +
                    '<label class="col-md-6 control-label" for="name">' + "Cronico?: " + '</label> ' +
                    '<div class="col-md-6" id="CRONICO1_401"> ' +
                    '<input id="cronico1_SAL41" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                    '<span class="help-block">' + "S/N" + '</span> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanagestriesgo.off('show.bs.modal');
                            setTimeout(_Buscarconsultas_41, 500)
                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanagestriesgo.off('show.bs.modal');
                            _Evaluaridhistoriafact_41();
                        }
                    }
                }
            });
            ventanagestriesgo.init($('.modal-footer').hide());
            ventanagestriesgo.init(_Evaluargestionriesgo_450());
            ventanagestriesgo.init(Maskventanariesgo_450());
            ventanagestriesgo.on('shown.bs.modal', function () {
                $("#gestriesgo_SAL41").focus();
            });
        } else {
            _Buscarconsultas_41();
        }
    } else {
        if ($_TIPOPACINUM == '*') {
            _Validandocliente4_41();
        } else {
            if ($_TIPOPACINUM == $_TIPOPACI) {
                _Validandocliente4_41();
            } else {
                if (SAL41.NITUSU == '0845000038') {
                    if ((($_TIPOPACINUM == 'D') || ($_TIPOPACINUM == 'E') || ($_TIPOPACINUM == 'F')) || (($_TIPOPACINUM == 'D') || ($_TIPOPACINUM == 'E') || ($_TIPOPACINUM == 'F'))) {
                        _Validandocliente4_41();
                    }
                } else {
                    CON851('3F', '3F', null, 'error', 'Error');
                    _Datopaciente_41();
                }
            }
        }
    }
}

function _Evaluargestionriesgo_450() {
    _inputControl("disabled");
    validarInputs({
        form: '#RIESGO_401',
        orden: "1"
    },
        () => { $('.btn-danger').click() },
        () => {
            $_GESTRIESGOFACT = $('#gestriesgo_SAL41').val();
            if ($_GESTRIESGOFACT == 'S' || $_GESTRIESGOFACT == 'N') {
                if (($_GESTRIESGOFACT == 'S') && ($_SEXOPACI == 'F')) {
                    _Evaluargestgestafact_450();
                } else if ($_GESTRIESGOFACT == 'S') {
                    _Evaluargestcronifact_450();
                }
            } else {
                _Evaluargestionriesgo_450();
            }

        }
    )
}

function Maskventanariesgo_450() {
    var prefijoMask = IMask($("#gestriesgo_SAL41")[0], {
        mask: 'a',
        definitions: {
            'a': /[N-S]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
}

function _Evaluargestgestafact_450() {
    validarInputs({
        form: '#GESTANTE_401',
        orden: "1"
    },
        () => { _Evaluargestionriesgo_450() },
        () => {
            $_GESTGESTAFACT = $('#gestante_SAL41').val();
            if ($_GESTGESTAFACT == 'S' || $_GESTGESTAFACT == 'N') {
                $('.btn-primary').click();
            } else {
                _Evaluargestgestafact_450();
            }

        }
    )
}

function _Evaluargestcronifact_450() {
    validarInputs({
        form: '#CRONICO1_401',
        orden: "1"
    },
        () => { _Evaluargestgestafact_450() },
        () => {
            $_GESTCRONIFACT = $('#cronico_SAL41').val();
            if ($_GESTCRONIFACT == 'S' || $_GESTCRONIFACT == 'N') {
                $('.btn-primary').click();
            } else {
                _Evaluargestionriesgo_450();
            }

        }
    )
}

function _Validandocliente4_41() {
    if ((SAL41.NITUSU == '0844003225') || (SAL41.NITUSU == '0800251482') || (SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0900193162')) {
        _Validandocliente5_41();
    } else {
        if ((($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) && ($_CONTRATONUM.trim() != '') && ($_CONTRATOPACI.trim() != '') && ($_CONTRATONUM != $_CONTRATOPACI)) {
            CON851('2M', '2M', null, 'error', 'Error');
            _Datopaciente_41();
        } else {
            _Validandocliente5_41();
        }
    }
}

function _Validandocliente5_41() {
    console.debug('validandocliente 5');
    if ((SAL41.IDHISTORIAFACT == '000000086059367') && (SAL41.NITUSU == '0900405505')) {
        $_CONTRATOPACIW = $_CONTRATONUM;
        if ($_CONTRATONUM == $_CONTRATOPACI) {
            _Validandocliente6_41();
        } else {
            CON851('2M', '2M', null, 'error', 'Error');
            _Datopaciente_41();
        }
    } else if (($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'T')) {
        if (SAL41.NITUSU == '0800037021') {
            if (($_TIPOPACIDPACI == 'RC') || ($_TIPOPACIDPACI == 'MSI')) {
                _Validandocliente6_41();
            } else {
                if (SAL41.IDHISTORIAFACT != $_IDPACNUM) {
                    CON851('7O', '7O', null, 'error', 'Error');
                    _Datopaciente_41();
                }
            }
        } else {
            _Validandocliente6_41();
        }
    } else {
        _Validandocliente6_41();
    }
}

function _Validandocliente6_41() {
    if ($_TUTELAPACI == 'S') {
        CON851('5B', '5B', null, 'error', 'Error');
    } if ($_ALTCOSPACI == 'S') {
        CON851('5J', '5J', null, 'error', 'Error');
    } if ($_PROGESPPACI == 'S') {
        CON851('5Q', '5Q', null, 'error', 'Error');
    } if ($_CRONICOPACI == 'S') {
        CON851('7A', '7A', null, 'error', 'Error');
    } if ($_MULTICONSULPACI == 'S') {
        CON851('5V', '5V', null, 'error', 'Error');
    }
    $('#sexo_SAL41').val($_SEXOPACI);
    $('#estrato_SAL41').val($_ESTRATOPACI);
    $('#ciudad_SAL41').val($_CIUDADPACI);
    $_CIUDADFACT = $_CIUDADPACI;
    switch ($_TIPOAFILPACI.trim()) {
        case '1':
            $('#tipoafiliacion_SAL41').val('COTIZANTE');
            break;
        case '2':
            $('#tipoafiliacion_SAL41').val('BENEFICIARIO');
            break;
        case '3':
            $('#tipoafiliacion_SAL41').val('COT. PENSIONADO');
            break;
        case '4':
            $('#tipoafiliacion_SAL41').val('UPC ADICIONAL');
            break;
        default:
            $('#tipoafiliacion_SAL41').val('SIN DETERMINAR');
            break;
    }
    // _Calcularedad_41();
    SAL41.EDAD = calcular_edad(moment($_NACIMPACI).format('YYYY-MM-DD'));
    $('#edad_SAL41').val(SAL41.EDAD.vlr_edad);
    if (($_PACIDISPE.trim() != '') && (SAL41.IDHISTORIAFACT != $_PACIDISPE)) {
        CON851('06', '06', null, 'error', 'Error');
        _Datopaciente_41();
    }
    if ($_PREFIJOFACT == 'P') {
        $('#INGRESO_SAL41').removeClass('hidden');
        $('#ingreso_sal41').text('INGRESO: ' + $_FECHAINGNUM + ' - ' + $_ENTESTANCEDIT);
        _Validandocliente7_41();
    } else if ((SAL41.NITUSU == '0845000038') || (SAL41.NITUSU == '0800251482')) {
        _Validandocliente7_41();
    } else {
        if ((($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) && (parseInt(SAL41.IDHISTORIAFACT) > 000000000001)) {
            // SER 836C LINEA 3737
            let fecha = $_FECHAFACT.split('-');
            let datos_envio = datosEnvio() + SAL41.IDHISTORIAFACT + '|' + fecha[0].substring(2, 4) + fecha[1] + fecha[2] + '|' + $_LLAVENUM + '|' + SAL41.ADMINW;
            console.debug(datos_envio);
            SolicitarDll({ datosh: datos_envio }, data => {
                console.debug(data);
                data = data.split('|');
                if (data[1].trim() != '') { CON851('1K', '1K', null, 'warning', 'Advertencia!') }
            }, get_url("APP/SALUD/SER836C.DLL"));
            _Validandocliente7_41();
        } else {
            _Validandocliente7_41();
        }
    }
}

function _Validandocliente7_41() {
    console.debug('validandocliente 7')
    if ((SAL41.NITUSU == '0844003225') && $_CIUDADPACI != '85001') {
        $_DERECHOPACI = '2';
    }
    if (((SAL41.NITUSU == '0900229438') || (SAL41.NITUSU == '0800162035')) && ($_FECHAVENCEPACI > 0) && ($_FECHAINGESTAD > $_FECHAVENCEPACI)) {
        $_DERECHOPACI = '2';
    }
    if ((($_DERECHOPACI == '2') || ($_DERECHOPACI == '4') || ($_DERECHOPACI == '7') || ($_DERECHOPACI == '8') || ($_DERECHOPACI == 'A')) && (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'T') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z'))) {
        CON851('80', '80', null, 'error', 'Error');
        if (($_PUERTAINGW == '2') && (SAL41.NITUSU == '0800037979')) {
            _Datopaciente_41();
        } else if ((SAL41.NITUSU == '0800162035') || (SAL41.NITUSU == '0900405505')) {
            _Datopaciente_41()
        } else {
            _Validandocliente8_41();
        }
    } else {
        _Validandocliente8_41();
    }
}

function _Validandocliente8_41() {
    console.debug('validandocliente 8');
    if (($_DERECHOPACI == '5') && (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'T') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z'))) {
        CON851('2N', '2N', null, 'error', 'Error');
        if ($_PUERTAINGW == '2') {
            _Datopaciente_41();
        } else {
            _Validandocliente82_41();
        }
    }
    if (($_DERECHOPACI == '6') && (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'T') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z'))) {
        CON851('2T', '2T', null, 'warning', 'Advertencia!');
        _Validandocliente82_41();
    } else {
        _Validandocliente82_41();
    }
}

function _Validandocliente82_41() {
    console.debug('validandocliente 82');
    if (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'T') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) {
        switch ($_CLFACT) {
            case '0':
                if (($_RESTDROGPACI == 'N') && (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z'))) {
                    CON851('80', '80', null, 'error', 'Error');
                    _Datopaciente_41();
                } else {
                    _Validandocliente83_41();
                }
                break;
            case '1':
                if ($_RESTCIRUPACI == 'N') {
                    CON851('80', '80', null, 'error', 'Error');
                    _Datopaciente_41();
                } else {
                    _Validandocliente83_41();
                }
                break;
            case '2':
                if ($_RESTLABOPACI == 'N') {
                    CON851('80', '80', null, 'error', 'Error');
                    _Datopaciente_41();
                } else {
                    _Validandocliente83_41();
                }
                break;
            case '3':
                if ($_RESTIMAGPACI == 'N') {
                    CON851('80', '80', null, 'error', 'Error');
                    _Datopaciente_41();
                } else {
                    _Validandocliente83_41();
                }
                break;
            case '7':
                if ($_RESTPYPPACI == 'N') {
                    CON851('80', '80', null, 'error', 'Error');
                    _Datopaciente_41();
                } else {
                    _Validandocliente83_41();
                }
                break;
            default:
                _Validandocliente83_41();
                break;
        }
    } else {
        _Validandocliente83_41();
    }
}

function _Validandocliente83_41() {
    if (($_UNDEDADMAXSERV == 'D') && (SAL41.EDAD.unid_edad != 'D')) {
        CON851('74', '74', null, 'error', 'Error');
        _Datopaciente_41();
    } else if (($_UNDEDADMINSERV == 'M') && (SAL41.EDAD.unid_edad == 'D')) {
        CON851('74', '74', null, 'error', 'Error');
        _Datopaciente_41();
    } else if (($_UNDEDADMAXSERV == 'M') && (SAL41.EDAD.unid_edad == 'A')) {
        CON851('74', '74', null, 'error', 'Error');
        _Datopaciente_41();
    } else if (($_UNDEDADMINSERV == 'A') && (SAL41.EDAD.unid_edad != 'A')) {
        CON851('74', '74', null, 'error', 'Error');
        _Datopaciente_41();
    } else if (($_UNDEDADMAXSERV == 'A') && (SAL41.EDAD.unid_edad == 'A') && (SAL41.EDAD.vlr_edad > parseInt($_VLREDADMINSERV))) {
        CON851('74', '74', null, 'error', 'Error');
        _Datopaciente_41();
    } else if (($_UNDEDADMINSERV == 'A') && (SAL41.EDAD.unid_edad == 'A') && (SAL41.EDAD.vlr_edad < parseInt($_VLREDADMINSERV))) {
        CON851('74', '74', null, 'error', 'Error');
        _Datopaciente_41();
    } else {
        _Validandocliente84_41();
    }
}

function _Validandocliente84_41() {
    if ($_ENTIDADTER == 'SIN001') {
        _Validandopaciente9_41();
    } else {
        if (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) {
            if (($_ENTIDADTER == 'EAR001') && (($_EPSPACI == 'EAR001') || ($_EPSPACI == 'EAR002') || ($_EPSPACI == 'EAR003') || ($_EPSPACI == 'EAR004') || ($_EPSPACI == 'EAR005'))) {
                _Validandopaciente9_41();
            } else {
                if ((($_ENTIDADTER == 'EAR000') || ($_ENTIDADTER == 'PEC004') || ($_ENTIDADTER == 'EAS027')) && (($_EPSPACI == 'EAR000') || ($_EPSPACI == 'PEC004') || ($_EPSPACI == 'PEC004'))) {
                    _Validandopaciente9_41();
                } else {
                    if ($_ENTIDADTER != $_EPSPACI) {
                        CON851('9S', '9S', null, 'warning', 'Advertencia!');
                        if ($_CLFACT == '7' && !$.isNumeric($_VENDEDORTER)) {
                            _Datopaciente_41();
                        } else if ((SAL41.NITUSU == '0900229438') && ($_ENTIDADTER == 'SIN438')) {
                            _Datopaciente_41();
                        } else if (((SAL41.NITUSU == '0800162035') || (SAL41.NITUSU == '0900405505') || (SAL41.NITUSU == '0900005594') || (SAL41.NITUSU == '0830512772') || (SAL41.NITUSU == '0830511298') || (SAL41.NITUSU == '0822001570') || (SAL41.NITUSU == '0844003225')) && (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) && ($_NITNUM != '0000009999') && (SAL41.ADMINW != 'GEBC')) {
                            _Datopaciente_41();
                        } else {
                            _Validandopaciente10_41();
                        }
                    } else {
                        _Validandopaciente10_41();
                    }
                }
            }
        } else {
            _Validandopaciente9_41();
        }
    }
}

function _Validandopaciente9_41() {
    if (SAL41.NITUSU == '0844003225' || SAL41.NITUSU == '0800251482') {
        _Validandopaciente10_41();
    } else {
        if ((($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) && ($_CONTRATONUM.trim() != '') && ($_CONTRATOPACI.trim() != '') && ($_CONTRATONUM != $_CONTRATOPACI)) {
            CON851('2M', '2M', null, 'error', 'Error');
            _Datopaciente_41();
        } else {
            _Validandopaciente10_41();
        }
    }
}

function _Validandopaciente10_41() {
    if ((SAL41.NITUSU == '0900229438') && ($_EPSPACI == 'SIN438') && ($_FECHAVENCEPACI < $_FECHAINGESTAD)) {
        CON851('9S', '9S', null, 'error', 'Error');
        _Datopaciente_41();
    } else if (((SAL41.NITUSU == '0900004059') || (SAL41.NITUSU == '0891855847')) && ($_NITFACTPACI != $_NITFACT) && ($_NITFACT != '9999')) {
        CON851('9S', '9S', null, 'error', 'Error');
        _Datopaciente_41();
    } else {
        _Buscarconsultas_41();
    }
}

function _Buscarconsultas_41() {
    SER835({ PACIENTE: SAL41.IDHISTORIAFACT.padStart(15, '0'), CLFACT: $_CLFACT, NITUSU: SAL41.NITUSU, DESCRIPPACI: $_DESCRIPPACI }, _Evaluaridhistoriafact_41, _Buscarconsultas2_41);
}

function _Buscarconsultas2_41() {
    if (SAL41.OPCIONACTIVA == '09426') {
        $_SWOCULTAR = '01';
        _Viaacceso_41();
    } else {
        if ((SAL41.NITUSU == '0800162035') && (($_NITFACT == '0860525150') || ($_NITFACT == '0860525149') || ($_NITFACT == '0900255098') || ($_NITFACT == '0860525148') || ($_NITFACT == '0900255099') || ($_NITFACT == '0900520316') || ($_NITFACT == '0900520317') || ($_NITFACT == '0900520318'))) {
            // SER 835E
        } else if (($_CLFACT == '0') && ((($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z'))) && (SAL41.NITUSU != '0830512772')) {
            // CALL 836A LINEA 3988
        } else if ((SAL41.NITUSU == '0800162035') && ($_UNSERW == '01') && ($_CLFACT != '5') && (SAL41.PREFIJOUSU == '01') && ($_REDEXTERNUM == '01')) {
            // CALL SER 836U LINEA 4018
        } else if ((SAL41.NITUSU == '0891855847') && ($_UNSERW == '01') && ($_CLFACT != '5') && (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z'))) {
            // CALL SER 836U LINEA 4041
        }
        $_SWOCULTAR = '00'
        let URL = get_url("APP/CONTAB/CON904S.DLL");
        postData({
            datosh: datosEnvio() + SAL41.ADMINW + '|I41O|'
        }, URL)
            .then((data) => {
                loader("hide")
                if (data.trim() == '00') {
                    _buscarconsultas3_41();
                } else {
                    $_SWOCULTAR = '01';
                    _buscarconsultas3_41();
                }
            })
            .catch(error => {
                console.error(error);
                _Evaluaridhistoriafact_41();
            });
    }
}

function _buscarconsultas3_41() {
    if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
        INV401D();
    } else {
        _Viaacceso_41();
    }
}

function _Viaacceso_41() {
    if ($_CLFACT == '1') {
        let viasacceso = [
            { codigo: '1', descripcion: 'ABDOMINAL' },
            { codigo: '2', descripcion: 'CUELLO' },
            { codigo: '3', descripcion: 'TORAXICA' },
            { codigo: '4', descripcion: 'CRANEAL' },
            { codigo: '5', descripcion: 'MIEMB.SUP.IZQ' },
            { codigo: '6', descripcion: 'MIEMB.SUP.DER' },
            { codigo: '7', descripcion: 'MIEMB.INF.IZQ' },
            { codigo: '8', descripcion: 'MIEMB.INF.DER' },
            { codigo: '9', descripcion: 'RECTAL' },
            { codigo: 'A', descripcion: 'VAGINAL' },
            { codigo: 'B', descripcion: 'OIDO' },
            { codigo: 'C', descripcion: 'NARIZ' },
            { codigo: 'D', descripcion: 'BOCA' },
            { codigo: 'E', descripcion: 'OCULAR' },
            { codigo: 'G', descripcion: 'OTRO' },
        ]
        POPUP({
            array: viasacceso,
            titulo: "VIA DE ACCESO",
            indices: [
                { id: 'codigo', label: 'descripcion' }
            ],
            callback_f: _Evaluaridhistoriafact_41
        },
            _evaluarviaacceso_41);
    } else {
        $_VIAW = '00';
        $_CRUENTAW = '00';
        if (SAL41.OPCIONACTIVA == '09426') {
            _Dato1_41();
        } else {
            _Dato1_41();
        }
    }
}

function _evaluarviaacceso_41(data) {
    switch (data.codigo) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case 'A':
        case 'B':
        case 'C':
        case 'D':
        case 'E':
        case 'G':
            setTimeout(_Datocruenta_41, 300);
            break;
        default:
            _Datopaciente_41();
            // $_VIAW = $_VIAFACT; CONDICION CUANDO AFCTURA DE SERVICIOS ESTE DISPONIBLE
            break;
    }
    $_VIAW = data.codigo;
    if ($.isNumeric(data.codigo)) {
        $_VIAW = '0' + $_VIAW;
    } else {
        var numeros = [10, 11, 12, 13, 14, 15];
        var letras = ['A', 'B', 'C', 'D', 'E', 'G'];
        for (var i in letras) {
            if (numeros[i] == letras[i]) {
                $_VIAW = numeros[i];
                break;
            }
        }
    }
}

function _Datocruenta_41() {
    let intervenciones = [
        { CODIGO: '1', DESCRIPCION: 'CRUENTA' },
        { CODIGO: '2', DESCRIPCION: 'INCRUENTA' }
    ];
    POPUP({
        array: intervenciones,
        titulo: "TIPO DE INTERVENCION",
        indices: [
            { id: 'CODIGO', label: 'DESCRIPCION' }
        ],
        callback_f: _Evaluaridhistoriafact_41
    },
        _Evaluarintervencion_41);
}

function _Evaluarintervencion_41(data) {
    switch (data.CODIGO) {
        case '1':
        case '2':
            $_CRUENTAW = data.CODIGO;
            if (SAL41.OPCIONACTIVA == '09426') {
                console.log('va ir Evaluar codigo de servicio')
                _Evaluarcodservicio2_41();
            } else {
                _Dato1_41();
            }
            break;
        default:
            setTimeout(() => {
                _Viaacceso_41()
            }, 300);
            break;
    }
}

function _Dato1_41() {
    $_VIAFACT = $_VIAW;
    $_CRUENTAFACT = $_CRUENTAW;
    $_TARIFFACT = $_CODTABW;
    $_PUERTAESTAD = $_PUERTAINGW;
    $_MACROFACT = 0;
    $_I = 1;
    $_K = 1;
    SAL41.ESPECLAB = '';
    if ($_CLFACT == '3' || $_CLFACT == '4' || $_CLFACT == '5' || $_CLFACT == '7') {
        SER836({ PACIENTE: SAL41.IDHISTORIAFACT.padStart(15, '0'), FECHA: $_FECHASIGATEN, ANO: $_ANOACT }, () => {
            _Dato1_2_41();
            SAL41.FINALIDESTAD = ' '
        }, data => {
            console.debug(data);
            SAL41.CITAS = data;
            SAL41.FINALIDESTAD = SAL41.CITAS.FINALID_CIT;
            $('#codservicio2_SAL41').val(SAL41.CITAS.LLAVE_CIT.substring(34, 46));
            SolicitarDll({ datosh: datosEnvio() + SAL41.ADMINW + '|' + SAL41.CITAS.MED_CIT.padStart(10, '0') + '|' }, data => {
                console.debug(data);
                data = data.split('|');
                $('#espec_SAL41').val(data[10].trim());
                $('#atend_SAL41').val(SAL41.CITAS.MED_CIT);
                _Dato1_2_41();
            }, get_url('APP/SALUD/SAL41-11.DLL'))
        });
    } else if ((SAL41.NITUSU == '0900405505') && ($_FECHACIT != $_FECHAACT) && (SAL41.IDHISTORIAFACT != 000000000000001)) {
        CON851('9F', '9F', null, 'error', 'Error');
        if (($_CLFACT == '2') || ($_CLFACT == '3') || ($_CLFACT == '7')) {
            _Dato1_2_41();
        } else {
            let URL = get_url("APP/CONTAB/CON904S.DLL");
            postData({
                datosh: datosEnvio() + SAL41.ADMINW + '|' + $_OPSEGU + '|'
            }, URL)
                .then((data) => {
                    loader("hide")
                    if (data.trim() == '01') {
                        _Datopaciente_41();
                    } else {
                        _Dato1_2_41();
                    }
                })
                .catch(error => {
                    console.error(error);
                    _Evaluaridhistoriafact_41();
                });
        }
    } else {
        _Dato1_2_41();
    }
}


function _Dato1_2_41() {
    $_BUSCTLFOR = '0';
    SAL41.CONTEO = 0;
    _Aceptarcodigo_41();
}

function _Aceptarcodigo_41() {
    if (SAL41.CONTEO == 30) {
        console.debug(SAL41.CONTEO);
        _Datodescto_41();
    } else if (SAL41.CONTEO == 1) {
        if ($_CLFACT == '0') {
            _Datobarras_41();
        } else {
            $_DIVISIONCUP1 = $_DIVISIONCUP;
            $_DIV2CUP1 = $_DIV2CUP;
            $_DIAGNCUP1 = $_DIAGNCUP;
            $_ATIENDEESPCUP1 = $_ATIENDEESPCUP;
            _Datobarras_41();
        }
    } else if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
        // SER807 REALIZAR PRUEBAS EN RM PARA VER LA VENTANA
    } else {
        _Datobarras_41();
    }
}

function _Datobarras_41() {
    if (($_CLFACT == '0') && ($_BARRASUSU == 'S') && ($_TIPODRFACT == '1')) {
        _Ventanabarras_41();
    } else {
        _Dato2_41();
    }
}

function _Ventanabarras_41() {
    fuente = '<div class="col-md-12" id="ACEPTARBARRAS_41"> ' +
        '<input id="aceptarbarras_SAL41" type="text" class="form-control input-md" data-orden="1" maxlength="15"> ' +
        '</div>';
    _ventana({
        source: fuente,
        title: 'CODIGO DE BARRAS',
        size: 'small',
        espace: false,
        focus: '#aceptarbarras_SAL41',
        form: '#ACEPTARBARRAS_41',
        order: '1',
        global1: '$_LLAVEBARRASW',
        inputglobal1: '#aceptarbarras_SAL41',
    }, _Leerventanabarras_41, _Leerarticulo_41);
}

function _Leerventanabarras_41() {
    if (($_LLAVEBARRASW == '') || (parseInt($_LLAVEBARRASW) == 0)) {
        _Dato2_41();
    } else {
        console.debug($_LLAVEBARW)
        LLAMADO_DLL({
            dato: [$_LLAVEBARW],
            callback: _dataINV401_10_41,
            nombredll: 'IN401-10',
            carpeta: 'SALUD'
        });
    }
}

function _dataINV401_10_41(data) {
    console.debug(data, 'INV401_10');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_GRUPOART = date[1].trim();
    $_NUMEROART = date[2].trim();
    $_CLASEART = date[3].trim();
    if (swinvalid == '00') {
        $_GRUPOFACT = $_GRUPOART;
        $_CODARTFACT = $_NUMEROART;
        $_CLASEARTFACT = $_CLASEART;
        _Leerarticulo_41();
    } else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'Error');
        _Datobarras_41();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Dato2_41() {
    $_SWPASO = 0;
    if ((SAL41.NITUSU == '0844003225') && ($_SWPASO == '0')) {
        if ($_CLFACT == '7') {
            $_TIPOMACROW = '2';
            console.log('revisar bien el dll para que no tenga errores');
            _Evaluarmacro_41();
        } else {
            _Evaluarcodservicio2_41();
        }
    } else {
        if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) _Aceptarcodigo_41()
        else _Evaluarcodservicio2_41()
    }
}

function _Evaluarmacro_41() {
    $('#CODMACRO_SAL41').removeClass('hidden');
    validarInputs({
        form: '#MACRO_41',
        orden: '1'
    },
        _Dato2_41,
        () => {
            $_CODMACROW = $('#macro_SAL41').val();
            SolicitarDll({ datosh: datosEnvio() + SAL41.ADMINW + '|' + $_CODMACROW + '|' }, data => {
                data = data.split('|');
            }, get_url("APP/SALUD/SAL41-18.DLL"));
        }
    )
}

function _dataINV401_11_41(data) {
    console.debug(data, 'INV401_11');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_NOMBREMACRO = date[1].trim();
    var json = date[2].trim();
    var url = "http://" + $_IP_DATOS + "/progdatos/json/" + json + ".json";
    SolicitarDatos(
        null,
        function (data) {
            $_ARTMACROH = data.MACRO;
            for (var i in $_ARTMACROH) {
                $('#TABLA_401').append(
                    '<td></td>' +
                    '<td>' + $_ARTMACROH[i].ART_MACROH + '</td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td></td>'
                );
            }
            if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
                _Aceptarcodigo_41();
            } else if ($_CONTROLFORMUUSU == 'S') {
                // MIRAR BIEN 4362
                console.debug('SW-MARCAFORM');
            } else {
                _Evaluarcodservicio2_41();
            }
        },
        url
    );
}

function _mostrardatos450_SAL41() {
    SAL41.CONTEO = $('#TABLA_401 tbody tr').length + 1;
    if (SAL41.FACTURA.TABLA[SAL41.CONTEO]) {
        $('#codservicio2_SAL41').val(SAL41.FACTURA.TABLA[SAL41.CONTEO].ARTICULO);
    }
    for (var i in SAL41.FACTURA.TABLA) {
        SAL41.PRIMERARTICULO450 = SAL41.FACTURA.TABLA[0].ARTICULO.trim();
        SolicitarDll({ datosh: datosEnvio() + SAL41.ADMINW + '|' + $_CODTABW + $_TIPOTABW + SAL41.FACTURA.TABLA[i].ARTICULO + '|' + SAL41.NITUSU + '|' + $_CONVENIONUM + '|' + SAL41.FACTURA.TABLA[i].ARTICULO + '|' }, data => {
            data = data.split('|');
            $_NIVELCUP = data[6].trim();
            $_CISCUP = data[7].trim();
            $_OCULTARCUP = data[8].trim();
            $_SEXOCUP = data[9].trim();
            $_UNIDEDADCUP = data[10].trim();
            $_EDADMINCUP = data[11].trim();
            $_EDADMAXCUP = data[12].trim();
            $_CODTAB = data[13].trim();
            $_CDSERTAB = data[14].trim();
            $_LLAVETIPOTAB = data[15].trim();
            $_CODPAQINTTAB = data[16].trim();
            $_DATOSSEPCUP = data[17].trim();
            $_MONTOTABME = data[18].trim();
            $_INCREMTAB = data[19].trim();
            $_INCREMTAB = parseInt($_INCREMTAB);
            $_DIV2CUP = data[20].trim();
            $_DIVISIONCUP = data[21].trim();
            $_DIAGNCUP = data[22].trim();
            $_ATIENDEESPCUP = data[23].trim();
            $_DESCRIPCUP = data[25].trim();
            if (SAL41.CONTEOITEMS == 0) {
                $_DIAGNCUP1 = $_DIAGNCUP;
                $_ATIENDEESPCUP1 = $_ATIENDEESPCUP;
                $_DIV2CUP1 = $_DIV2CUP;
                $_DIVISIONCUP1 = $_DIVISIONCUP;
            }
            $_CODSERTAB = data[26].trim();
            SAL41.TIPOPROCCUP = data[27].trim();
            SAL41.FINALIDADCUP = data[28].trim();
            let letras = {
                'A': '10',
                'B': '11',
                'C': '12',
                'D': '13',
                'E': '14',
                'G': '15',
                'H': '16',
                'I': '17',
                'J': '18'
            }
            SAL41.FINALIDADCUP = letras[SAL41.FINALIDADCUP];
            SAL41.FACTURA.TABLA[SAL41.CONTEOITEMS]['DIASTRATAFACT'] = '000';
            SAL41.FACTURA.TABLA[SAL41.CONTEOITEMS]['VLRLATERFACT'] = '0';
            SAL41.FACTURA.TABLA[SAL41.CONTEOITEMS]['DATOSETCUP'] = $_DATOSETCUP;
            SAL41.FACTURA.TABLA[SAL41.CONTEOITEMS]['CISCUP'] = $_CISCUP;
            SAL41.FACTURA.TABLA[SAL41.CONTEOITEMS]['CODCUP'] = '0';
            SAL41.CONTEOITEMS++;
        }, get_url("APP/SALUD/SAL41-07.DLL"));
    }
}

function _mostrareninputs_SAL41(data) {
    SAL41.CAMBIO = 1;
    SAL41.CONTEO = parseInt(data.cells[0].textContent);
    $('#codservicio2_SAL41').val(data.cells[1].textContent);
    $('#detalle_SAL41').val(data.cells[2].textContent);
    $('#almac_SAL41').val(data.cells[3].textContent);
    $('#cant_SAL41').val(data.cells[4].textContent);
    $('#vlrunit_SAL41').val(data.cells[5].textContent);
    $('#vlrtotal_SAL41').val(data.cells[6].textContent);
}

function _Evaluarcodservicio2_41(data) {
    if (SAL41.OPCIONACTIVA == '09426') SAL41.CONTEOITEMS = 0, _mostrardatos450_SAL41()
    if (data) _mostrareninputs_SAL41(data)
    else SAL41.CONTEO = $('#TABLA_401 tbody tr').length, SAL41.CAMBIO = 0;
    $_ARTFACT == undefined ? $_ARTFACT = '                  ' : $_ARTFACT = $_ARTFACT;
    $_ARTCTL = $_ARTFACT;
    let parametros = { estado: 'on', msg: [{ mensaje: 'Oprima F3 para continuar' }, { mensaje: 'Oprima F5 para salir' }] };
    _FloatText(parametros);
    if ($_CLFACT == '0') {
        $('#CLASEARTICULO_SAL41').removeClass('hidden');
    }
    validarInputs({
        form: '#CODSERVICIO2_41',
        orden: '1',
        event_f3: () => {
            _FloatText({ estado: 'off' });
            if ($('#TABLA_401 tbody tr').length == 0){
            CON851('','No tiene nada para facturar',_Evaluarcodservicio2_41(),'error','Error')    ;
            } else {
                if (SAL41.OPCIONACTIVA == '09426') {
                    _Datodescto_41();
                } else {
                    _Datoabono_41();
                }
            }
        },
        event_f5: () => {
            _FloatText({ estado: 'off' });
            $('#TABLA_401 tbody').html('');
            _inputControl('reset');
            $('#NITMEDICO_41').addClass('hidden')
            $('#CLASEARTICULO_SAL41').addClass('hidden')
            $('#CODMACRO_SAL41').addClass('hidden')
            $('#CRONICO_SAL41').addClass('hidden')
            $('#FORMACOPAGO_SAL41').addClass('hidden')
            $('#TIPOCOPAGO_SAL41').addClass('hidden')
            $('#CLASSERV_450').addClass('hidden')
            $('#CODIGODIAG_SAL41').addClass('hidden')
            $('#ESPECIALIDADREMITE_SAL41').addClass('hidden')
            $('#INGRESO_SAL41').addClass('hidden')
            $('#CLASEPROCE_SAL41').addClass('hidden')
            $('#EMBARAZO_SAL41').addClass('hidden')
            $('#TIPOPROCEDIMIENTO_SAL41').addClass('hidden')
            $('.page-breadcrumb')[1].remove()
            _validarOpcion_SAL41();
        },
        event_f7: () => {
            _FloatText({ estado: 'off' });
            if ($('#TABLA_401 tbody tr').length == 0) { _Evaluarcodservicio2_41() }
            else {
                validarTabla(
                    {
                        tabla: '#TABLA_401',
                        orden: '0',
                        event_f3: () => {
                            if (SAL41.OPCIONACTIVA == '09426') {
                                _Datodescto_41();
                            } else {
                                _Datoabono_41();
                            }
                        }
                    },
                    _Evaluarcodservicio2_41,
                    _Evaluarcodservicio2_41,
                    () => {
                        if (SAL41.OPCIONACTIVA == '09426') {
                            _Datodescto_41();
                        } else {
                            _Datoabono_41();
                        }
                    })
            }
        }
    },
        function () {
            _FloatText({ estado: 'off' });
            if ($('#TABLA_401 tbody tr').length > 0) {
                SAL41.CONTEO = $('#TABLA_401 tbody tr').length - 1;
                if (SAL41.CONTEO < 0) SAL41.CONTEO = 0;
                $('#TABLA_401 tbody tr').eq(SAL41.CONTEO).remove()
                $TABLAFACT.splice(SAL41.CONTEO);
                _Evaluarcodservicio2_41();
            } else {
                _Evaluarcodservicio2_41();
            }
        },
        _Validarcodservicio2_41
    )
}

function _Validarcodservicio2_41() {
    _FloatText({ estado: 'off' });
    SAL41.LLAVECUP = $('#codservicio2_SAL41').val();
    if ($('#TABLA_401 tbody tr').length == 0) {
        _Validarcodservicio3_41();
    } else {
        if (SAL41.CAMBIO == 1) { _Validarcodservicio3_41() }
        else {
            for (i = 0; i < $('#TABLA_401 tbody tr').length; i++) {
                console.log(i);
                let fila = i + 1;
                var cup = $('#TABLA_401 tbody tr:nth-child(' + fila + ') td:nth-child(2)').text();
                if (SAL41.LLAVECUP.trim() == cup.trim()) {
                    CON851('', 'Cup repetido', null, 'error', 'Error');
                    _Evaluarcodservicio2_41();
                    break;
                } else if ($('#TABLA_401 tbody tr').length - 1 == i) {
                    _Validarcodservicio3_41();
                }
            }
        }
    }
}

function _Validarcodservicio3_41() {
    $_GRUPOFACT = SAL41.LLAVECUP.substring(0, 2);
    $_CODARTFACT = SAL41.LLAVECUP.substring(2, 15);
    $_CODARTCTL = $_CODARTFACT;
    if (parseInt($_CLFACT) > 0) {
        $_CLASEARTFACT = '  ';
        _Leerarticulo_41();
    } else {
        _Evaluarclaseart_41();
    }
}

function _Evaluarclaseart_41() {
    validarInputs({
        form: '#CLASEART_SAL41',
        orden: '1',
        event_f5: _toggleNav
    },
        _Evaluarcodservicio2_41,
        _Validarclaseart_41
    )
}

function _Validarclaseart_41() {
    $_CLASEARTFACT = $('#claseart_SAL41').val();
    $_CLASEARTFACT = $_CLASEARTFACT.padEnd(2, ' ');
    _Leerarticulo_41();
}

function _Leerarticulo_41() {
    $_ARTFACT = $_GRUPOFACT + $_CODARTFACT + $_CLASEARTFACT;
    if (($_GRUPOFACT.trim() == '') || (parseInt($_GRUPOFACT) == 0)) {
        _Aceptarcodigo_41();
    } else if ($_CLFACT == '3') {
        let URL = get_url("APP/CONTAB/CON904.DLL");
        postData({ datosh: datosEnvio() + localStorage.getItem('Usuario').trim() + '|' + 'I413' + $_GRUPOFACT.trim() + '|' }, URL)
            .then(data => {
                console.debug(data);
                _Leerarticulo2_41();
            })
            .catch(err => {
                console.error(err);
                _Dato2_41();
            });
    } else {
        _Leerarticulo2_41();
    }
}

function _Leerarticulo2_41() {
    if (($_RESTAPLIPACI == 'S') && (($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) && ($_CLFACT == '5')) {
        if (($_GRUPOFACT == '89') && ($_RESTCONSPACI == 'N') && ($_ARTFACT != '890103') && ($_ARTFACT != '890203') && ($_ARTFACT != '890303') && ($_ARTFACT != '890403')) {
            CON851('80', '80', null, 'error', 'Error');
            _Dato2_41();
        } else if (($_GRUPOFACT == '93') && ($_COD1ARTFACT == '1') && ($_RESTTERFPACI == 'N')) {
            CON851('80', '80', null, 'error', 'Error');
            _Dato2_41();
        } else if (($_GRUPOFACT == '93') && ($_COD1ARTFACT != '1') && ($_RESTTEROPACI == 'N')) {
            CON851('80', '80', null, 'error', 'Error');
            _Dato2_41();
        } else if (($_RESTODONPACI == 'N') && (($_GRUPOFACT == '24') || ($_ARTFACT == '890103') || ($_ARTFACT == '890203') || ($_ARTFACT == '890303') || ($_ARTFACT == '890403'))) {
            CON851('80', '80', null, 'error', 'Error');
            _Dato2_41();
        }
    } else if ((($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) && ($_CLFACT == '4') && ($_RESTESTAPACI == 'N') && ($.isNumeric($_GRUPOFACT))) {
        CON851('80', '80', null, 'error', 'Error');
        _Datopaciente_41();
    } else if ($_CLFACT == '0') {
        $_TIPOART = '0';
        $_GRUPOART = $_GRUPOFACT;
        $_NUMEROART = $_CODARTCTL;
        $_CLASEART = $_CLASEARTFACT;
        $_GRP1SAL = $_GRUPOFACT.substring(0, 1);
        $_CODART = $_TIPOART + $_GRUPOART + $_NUMEROART.padEnd(13, ' ') + $_CLASEART;
        _Leerpromedio_41();
        let datos_envio = datosEnvio();
        datos_envio += $_CODART;
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_06, get_url("APP/SALUD/SAL41-06.DLL"));
    } else {
        if (($_GRUPOFACT == 'XM') || ($_GRUPOFACT == 'XP') || ($_GRUPOFACT == 'XN')) {
            $_LLAVETAB = $_CODTABW + $_TIPOTABW + $_GRUPOFACT + $_CODARTFACT.padEnd(10, ' ');
            $_LLAVECUP = $_GRUPOFACT + $_CODARTFACT.padEnd(10, ' ');
            let datos_envio = datosEnvio();
            datos_envio += SAL41.ADMINW + '|' + $_LLAVETAB + '|' + SAL41.NITUSU + '|' + $_CONVENIONUM + '|' + $_LLAVECUP;
            console.debug(datos_envio)
            SolicitarDll({ datosh: datos_envio }, _dataSAL41_07, get_url("APP/SALUD/SAL41-07.DLL"));
        } else {
            $_ALMFACT = '     ';
            $_LLAVETAB = $_CODTABW + $_TIPOTABW + $_GRUPOFACT + $_CODARTFACT.padEnd(8, ' ');
            $_LLAVECUP = $_GRUPOFACT + $_CODARTFACT.padEnd(10, ' ');
            let datos_envio = datosEnvio();
            datos_envio += SAL41.ADMINW + '|' + $_LLAVETAB + '|' + SAL41.NITUSU + '|' + $_CONVENIONUM + '|' + $_LLAVECUP;
            console.debug(datos_envio)
            SolicitarDll({ datosh: datos_envio }, _dataSAL41_07, get_url("APP/SALUD/SAL41-07.DLL"));
        }
    }
}

function _dataSAL41_06(data) {
    console.debug(data, 'SAL41-06');
    var date = data.split('|');
    $_DESCRIPART = date[1].trim();
    $_UNIDADART = date[2].trim();
    $_VLRULTCOMPRA = date[3].trim();
    $_VLRULTCOMPRA = parseFloat($_VLRULTCOMPRA);
    $_VLRREFART = date[4].trim();
    $_VLRREFART = parseFloat($_VLRREFART);
    $_OTROS1ART = date[5].trim();
    $_OTROS2ART = date[6].trim();
    $_OTROS3ART = date[7].trim();
    $_OTROS4ART = date[8].trim();
    $_IVAART = date[9].trim();
    $_VRVENTA1ART = date[10].trim(); // TABLA
    $_VRVENTA1ART = parseFloat($_VRVENTA1ART); // TABLA
    $_REFART = date[11].trim();
    $_OTROS4BART = $_OTROS4ART.substring(12, 26);
    $_HOMOLOGOART = date[12].trim();
    $_RENG1ART = date[13].trim(); // TABLA
    $_REGG1BART2 = $_RENG1ART.substring(29, 30); // TABLA
    $_PRECIOCOMPART = data[14].trim(); // VLR LISTA COMP ART
    $_AUTORETART = data[15].trim();
    // INICIALIZANDO VARIABLES PARA EL LEER ARTICULO 5
    $_CODPAQINTTAB = $_CISCUP = $_LLAVETIPOTAB = $_DATOSSEPCUP = '';
    $_IVAARTW = $_IVAART;
    $_ARTIVANUM = ' ';
    $_CLASIFNUM = ' ';
    if (date[0].trim() == '00') {
        $('#detalle_SAL41').val($_DESCRIPART);
        $('#und_SAL41').val($_UNIDADART);
        switch ($_IVAART) {
            case '0':
                $_TARIVAW = '0';
                break;
            case '1':
                $_TARIVAW = SAL41.IVAUSU;
                break;
            case '2':
                $_TARIVAW = $_IVA2USU;
                break;
            case '3':
                $_TARIVAW = $_IVA3USU;
                break;
        }
        switch ($_BASEMEDTAR) {
            case '1':
                // _Leerpromedio_41();
                $_VRVENTA1ART = $_VLRPROMEDW;
                break;
            case '2':
                $_VRVENTA1ART = $_VLRULTCOMPRA;
                break;
            case '4':
                if ($_VLRREFART > 0) {
                    $_VRVENTA1ART = $_VLRREFART;
                }
                break;
        }
        if ((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) {
            $('form').append(
                '<div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">' +
                '<div class="col-md-5 col-sm-4 col-xs-4">' +
                '<label>Ciudad</label>' +
                '<div class="input-group col-md-12 col-sm-12 col-xs-12">' +
                '<input id="otros_SAL41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="5" data-orden="1">' +
                '</div>' +
                '</div>' +
                '</div>'
            )
            $('#otros_SAL41').val($_OTROSART);
        }
        if ($_VLRULTCOMPRA == 0) {
            if (parseInt($_PRECIOCOMPART) > 0) {
                $_VLRULTCOMPRA = $_PRECIOCOMPART;
            } else {
                _Leerpromedio_41(_Leerarticulo3_41);
                $_VLRULTCOMPRA = $_VLRPROMEDW;
            }
        }
        if ((($_DESCRIPART.substring(0, 1) == '*') && ($_TIPODRFACT == '1')) && ($_GRUPOART.substring(0, 1) == '') && ($_GRUPO2ART.trim() == '')) {
            $('#detalle_SAL41').val('CODIGO CON * DESCTI');
            CON851('13', '13', null, 'error', 'Error');
            _Dato2_41();
        } else if ($_ARTIVANUM == 'N') {
            if ($_IVAART == '0') {
                _Leerarticulo3_41();
            } else {
                CON851('72', '72', null, 'error', 'Error');
                _Dato2_41();
            }
        } else if ((($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "P") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "T") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z"))) {
            switch ($_CLASIFNUM) {
                case '1':
                    if (($_GRUPOFACT == 'PO') || ($_GRUPOFACT == 'MQ')) {
                        _Leerarticulo3_41();
                    } else {
                        CON851('7H', '7H', null, 'error', 'Error');
                        _Dato2_41();
                    }
                    break;
                case '2':
                    if (($_GRUPOFACT == 'PO') || ($_GRUPOFACT == 'MQ') || ($_GRUPOFACT == 'CO')) {
                        _Leerarticulo3_41();
                    } else {
                        CON851('7H', '7H', null, 'error', 'Error');
                        _Dato2_41();
                    }
                    break;
                default:
                    _Leerarticulo3_41();
                    break;
            }
        } else {
            _Leerarticulo3_41();
        }
    } else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#codservicio2_SAL41').val('');
        _Evaluarcodservicio2_41();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Leerarticulo3_41() {
    if ($_MYTNUM == 'S') {
        if ($_HOMOLOGOART == 'S') {
            $_CUMHOMOLOGOW = $_OTROS4BART;
            $_DETALLEHOMOLOW = $_DESCRIPART;
            $_VLRMYTEDIT = $_VRVENTA1ART;
            $_ATCHOMOLOGOW = $_REFART;
        }
        if ($_REGG1BART2 == '0') {
            $_VLRMYTEDIT = parseInt($_VLRMYTEDIT) * 1;
        } else {
            $_VLRMYTEDIT = parseInt($_VLRMYTEDIT) * parseInt($_REGG1BART2);
        }
        $_VRVENTA1ART = parseInt($_VRVENTA1ART) - parseInt($_VLRMYTEDIT);
        /// TERMINA EN 4836
    }
    if (SAL41.ASUMEIVAUSU == 'S') {
        isNaN($_VRVENTA1ART) ? $_VRVENTA1ART = 0 : $_VRVENTA1ART = $_VRVENTA1ART;
        $_VLRUNITW = (parseInt($_VRVENTA1ART) * (100 + parseInt($_TARIVAW))) / 100;
    }
    if (SAL41.ASUMEIVAUSU != 'S') {
        isNaN($_VRVENTA1ART) ? $_VRVENTA1ART = 0 : $_VRVENTA1ART = $_VRVENTA1ART;
        $_VLRUNITW = $_VRVENTA1ART;
    }
    $_SWAPR = '1';
    $_VALORAPROX = parseInt($_VLRUNITW) * 1;
    console.debug($_VALORAPROX);
    $_VLRUNITW = $_VALORAPROX;
    if (SAL41.NITUSU == '0900004059') {
        $_SWAPR = '100';
        $_VLRUNITW = parseInt($_VLRUNITW) + 50;
        $_VALORAPROX = parseInt($_VLRUNITW) / $_SWAPR;
        $_VLRUNITW = $_VALORAPROX * $_SWAPR;
        $_SWAPR = '1';
    }
    _Leerarticulo5_41();
}

function _dataSAL41_07(data) {
    data = data.split('|');
    SAL41.DESCRIPTAB = data[2].trim();
    SAL41.DESCRIP1TAB = SAL41.DESCRIPTAB.substring(0, 1);
    SAL41.GRSERTAB = data[3].trim();
    SAL41.MONTOTAB = data[4];
    let montotab1 = SAL41.MONTOTAB.substring(0, 11);
    montotab1 = montotab1.replace('.', '');
    montotab1 = parseInt(montotab1);
    isNaN(montotab1) ? montotab1 = 0 : montotab1 = montotab1;
    console.debug(montotab1);
    let montotab2 = SAL41.MONTOTAB.substring(11, 14);
    montotab2 = parseFloat(montotab2);
    console.debug(montotab2);
    SAL41.MONTOTAB = montotab1 + montotab2;
    console.debug(SAL41.MONTOTAB)
    SAL41.FORMALIQTAB = data[5].trim();
    $_NIVELCUP = data[6].trim();
    $_CISCUP = data[7].trim();
    $_OCULTARCUP = data[8].trim();
    $_SEXOCUP = data[9].trim();
    $_UNIDEDADCUP = data[10].trim();
    $_EDADMINCUP = data[11].trim();
    $_EDADMAXCUP = data[12].trim();
    $_CODTAB = data[13].trim();
    $_CDSERTAB = data[14].trim();
    $_LLAVETIPOTAB = data[15].trim();
    $_CODPAQINTTAB = data[16].trim();
    $_DATOSSEPCUP = data[17].trim();
    $_MONTOTABME = data[18].trim();
    $_INCREMTAB = data[19].trim();
    $_INCREMTAB = parseInt($_INCREMTAB);
    $_DIV2CUP = data[20].trim();
    $_DIVISIONCUP = data[21].trim();
    $_DIAGNCUP = data[22].trim();
    $_ATIENDEESPCUP = data[23].trim();
    $_DESCRIPCUP = data[25].trim();
    $_CODSERTAB = data[26].trim();
    SAL41['TIPOPROCCUP'] = data[27].trim();
    SAL41.FINALIDADCUP = data[28].trim();
    // let letras = {
    //     'A': '10',
    //     'B': '11',
    //     'C': '12',
    //     'D': '13',
    //     'E': '14',
    //     'G': '15',
    //     'H': '16',
    //     'I': '17',
    //     'J': '18'
    // }
    // SAL41.FINALIDADCUP = letras[SAL41.FINALIDADCUP];
    if (data[0].trim() == '00') {
        $('#detalle_SAL41').val(SAL41.DESCRIPTAB);
        if (SAL41.DESCRIP1TAB == '*') {
            $('#detalle_SAL41').val('CODIGO NO EXISTE - REPITA');
            CON851('7R', '7R', null, 'error', 'Error');
            _Dato2_41();
        } else {
            SER102RC_41(data[1].trim());
        }
    } else if (data[0].trim() == '01') {
        $('#detalle_SAL41').val('CODIGO NO EXISTE - REPITA');
        _Dato2_41();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function SER102RC_41(swinvalid1) {
    console.debug(swinvalid1, 'SER102RC');
    if (swinvalid1 == '9R') {
        CON851('9R', '9R', null, 'error', 'Error');
        _Dato2_41();
    } else {
        if (($_SEXOCUP != '') && ($_SEXOCUP != $_SEXOPACI)) {
            CON851('73', '73', null, 'error', 'Error');
            _Dato2_41();
        } else if (parseInt($_EDADMINCUP) > 0) {
            if (($_UNIDEDADCUP == SAL41.EDAD.unid_edad) && (parseInt($_EDADMINCUP) > parseInt(SAL41.EDAD.vlr_edad))) {
                CON851('74', '74', null, 'error', 'Error');
                _Dato2_41();
            } else if (($_UNIDEDADCUP = !SAL41.EDAD.unid_edad) && ($_UNIDEDADCUP == 'A')) {
                CON851('74', '74', null, 'error', 'Error');
                _Dato2_41();
            } else if (($_UNIDEDADCUP = !SAL41.EDAD.unid_edad) && ($_UNIDEDADCUP == 'M') && (SAL41.EDAD.unid_edad == 'D')) {
                CON851('74', '74', null, 'error', 'Error');
                _Dato2_41();
            } else {
                _Leerarticulo4_41();
            }
        } else if (parseInt($_EDADMAXCUP) > 0) {
            if (($_UNIDEDADCUP == SAL41.EDAD.unid_edad) && (parseInt($_EDADMAXCUP) < parseInt(SAL41.EDAD.vlr_edad))) {
                CON851('74', '74', null, 'error', 'Error');
                _Dato2_41();
            } else if (($_UNIDEDADCUP = !SAL41.EDAD.unid_edad) && ($_UNIDEDADCUP == 'D')) {
                CON851('74', '74', null, 'error', 'Error');
                _Dato2_41();
            } else if (($_UNIDEDADCUP = !SAL41.EDAD.unid_edad) && ($_UNIDEDADCUP == 'M') && (SAL41.EDAD.unid_edad == 'A')) {
                CON851('74', '74', null, 'error', 'Error');
                _Dato2_41();
            } else {
                _Leerarticulo4_41();
            }
        } else {
            _Leerarticulo4_41();
        }
    }
}

function _Leerarticulo4_41() {
    if ($_CODTAB == 'I4' || $_CODTAB == 'IS' && $_PREFIJOFACT == 'P' && SAL41.GRSERTAB == '93') {
        if (($_CDSERTAB.trim() == '1000') || ($_CDSERTAB == '9400') || ($_CDSERTAB == '8300') || ($_CDSERTAB == '7000')) {
            SAL41.MONTOTAB = SAL41.MONTOTAB * 1.1;
        }
    }
    $_IVAARTW = '0';
    switch (SAL41.FORMALIQTAB) {
        case '1':
            // $_VLRUNITW = Math.round(SAL41.MONTOTAB * $_HNQUIRTAR);
            $_VLRUNITW = SAL41.MONTOTAB * $_HNQUIRTAR;
            break;
        case '2':
            $_VLRUNITW = SAL41.MONTOTAB;
            break;
        case '3':
            $_VLRUNITW = SAL41.MONTOTAB;
            break;
        case '4':
            if (SAL41.NITUSU == '0892000401') {
                $_FACTORW = 1;
                $_SWAPR = 100;
                // $_VLRUNITW = Math.round(SAL41.MONTOTAB * $_SALMINTAR);
                // $_VALORAPROX = Math.round(($_VLRUNITW * $_FACTORW) / $_SWAPR);
                $_VLRUNITW = SAL41.MONTOTAB * $_SALMINTAR;
                $_VALORAPROX = ($_VLRUNITW * $_FACTORW) / $_SWAPR;
                $_VLRUNITW = $_VALORAPROX * $_SWAPR;
            } else {
                // $_VLRUNITW = Math.round(SAL41.MONTOTAB * $_SALMINTAR);
                $_VLRUNITW = SAL41.MONTOTAB * $_SALMINTAR;
                console.debug($_VLRUNITW, SAL41.MONTOTAB, $_SALMINTAR);
            }
            break;
        case '5':
            var table = $('#TABLA_401 tbody tr').eq(0).length;
            if (table == 0) {
                $_VLRARTW1 = 0;
            } else {
                var table1 = $('#TABLA_401 tbody tr').eq(0).children();
                $_VLRARTW1 = table1[0].textContent;
                $_VLRARTW1 = parseFloat($_VLRARTW1);
            }
            // $_VLRUNITW = Math.round(SAL41.MONTOTAB * $_VLRARTW1 / 100);
            $_VLRUNITW = SAL41.MONTOTAB * $_VLRARTW1 / 100;
            break;
        default:
            $_VLRUNITW = SAL41.MONTOTAB;
            break;
    }
    _Leerarticulo5_41();
}

function _Leerarticulo5_41() {
    console.debug('leerarticulo5');
    $_CODPAQINTTAB = $_CODPAQINTTAB.trim();
    if (($_CISCUP.trim() == '') || (parseInt($_CISCUP) == 0)) {
        $_CISCUP = 'N';
    }
    if (($_LLAVETIPOTAB == 'SO1') && ($_CODPAQINTTAB != '')) {
        CON851('', 'Atencion !, este procedimiento esta clasificado como posible paquete integral', null, 'warning', 'Advertencia!');
    }
    if ((SAL41.NITUSU == '0800037021') && ($_NITFACT == '0830079672')) {
        $_SWAPR = '1';
    }
    if (($_CODTAR == 'H4') && (parseInt($_CLFACT) > 1)) {
        $_SWAPR = '1';
    }
    if ((SAL41.NITUSU == '0800037021') && ($_OCULTARCUP == '*')) {
        CON851('7R', '7R', null, 'error', 'Error');
        _Dato2_41();
    } else if (((SAL41.NITUSU == '0900405505') || (SAL41.NITUSU == '0822002688')) && ($_CISNUM == 'S') && ($_CISCUP == 'N')) {
        CON851('5L', '5L', null, 'error', 'Error');
        _Buscarcodigo_41();
    } else if (($_ARTFACT == '39134  ') && (SAL41.EDAD.unid_edad == 'A') && (parseInt(SAL41.EDAD.vlr_edad) > 13)) {
        CON851('76', '76', null, 'error', 'Error');
        _Buscarcodigo_41();
    } else if (($_FACTCAPITNUM == $_LLAVENUM) && ($_CLFACT == '4') && ($_I < 9)) {
        $_VALCAPITAW = $_ARTFACT;
        if (($_VALCAPITAW == 'XXCAP') || ($_VALCAPITAW == 'XXPGP')) {
            if (SAL41.NITUSU == '0900019291') {
                _Leerarticulo6_41();
            } else {
                _Ventanacapacitacion_41();
            }
        } else {
            if (SAL41.NITUSU == '0900405505') {
                if ($_VALCAPITAW == 'XX19') {
                    _Ventanacapacitacion_41();
                }
            }
        }
    } else {
        $_VALCAPITAW = ' ';
        _Leerarticulo6_41();
    }
}

function _Leerarticulo6_41() {
    console.debug('leerarticulo6');
    if (($_CLFACT == '0') && (SAL41.LOTEFARMUSU == 'N') && (SAL41.REPETIDOUSU == 'N')) {
        $_SWBUSCAR = '0';
        // BUSCAR REPETIDO EN LA TABLA
        if ($_SWBUSCAR == 1) {
            CON851('05', '05', null, 'error', 'Error');
            _Dato2_41();
        } else {
            _Datolateralidad_41();
        }
    } else if (($_CLFACT == '2') || ($_CLFACT == '3') || ($_CLFACT == '4') || ($_CLFACT == '5') || ($_CLFACT == '7')) {
        // BUSCAR REPETIDO EN LA TABLA
    }
    $_SWBUSCAR = '0'
    if ((SAL41.NITUSU == '0800037021') && ($_CLFACT == '2')) {
        //BUSCAR REPETIDO 
        if ($_SWBUSCAR == 1) {
            CON851('05', '05', null, 'error', 'Error');
            _Dato2_41();
        }
    } else {
        _Datolateralidad_41();
    }
}

function _Datolateralidad_41() {
    console.debug($_VLRUNITW);
    console.debug('datolateralidad');
    $_PRINCIPALANTEW = $_DATOSSEPCUP;
    if ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162')) {
        var lateralidades = '[{"codigo": "1","descripcion": "Derecho"},{"codigo": "2", "descripcion": "Izquierdo"},{"codigo": "3","descripcion": "Bilateral"},{"codigo": "4","descripcion": "No aplica"}]'
        var lateralidad = JSON.parse(lateralidades);
        POPUP({
            array: lateralidad,
            titulo: 'Lateralidades',
            indices: [
                { id: 'codigo', label: 'descripcion' }
            ],
            callback_f: _Evaluarcodservicio2_41
        },
            _EvaluarRX822A_41);
    } else {
        SAL41.VLRLATERFACT = '0';
        _Datoalmacen_41();
    }
}

function _EvaluarRX822A_41(data) {
    switch (data.codigo) {
        case '1':
        case '2':
        case '3':
        case '4':
            SAL41.VLRLATERFACT = data.codigo;
            _Datoalmacen_41();
            break;
    }
}

function _Datoalmacen_41() {
    console.debug('dato almacen')
    if (parseInt($_CLFACT) > 0) {
        _Calcularmonto_41();
    } else {
        _Evaluandoalmacen_41();
    }
}

function _Evaluandoalmacen_41() {
    if ((SAL41.NITUSU == '0800037021') && (SAL41.ADMINW == 'UCI')) {
        $_ALMFACT = 'SIN97';
    }
    if ((SAL41.NITUSU == '0900658867') && (SAL41.PREFIJOUSU == '10')) {
        $_ALMFACT = 'ALM10';
    }
    if ($_ALMFACT.trim() == '') {
        if ((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) {
            if (($_UNSERVFACT == '04') || ($_UNSERVFACT == '54')) {
                $_ALMFACT == 'CR001';
            } else if (($_GRUPOFACT == 'PO') || ($_GRUPOFACT == 'NP') || ($_GRUPOFACT == 'MQ')) {
                $_CODARTTEMP = $_CODARTFACT;
                if ((parseInt($_CODARTTEMP) >= 9000100000000) && (parseInt($_CODARTTEMP) <= 9000100000000)) {
                    $_ALMFACT = 'UNI01';
                    $_CODARTTEMP = ' ';
                }
            } else {
                $_ALMFACT == 'DR099';
            }
        }
    }
    _Evaluaralmacen_41();
}

function _Evaluaralmacen_41() {
    validarInputs({
        form: '#ALMACEN_41',
        orden: '1'
    },
        _Dato2_41,
        _Validaralmacen_41
    )
}

function _Validaralmacen_41() {
    $_ALMFACT = $('#almac_SAL41').val();
    if (SAL41.NITUSU == '0830512772') {
        if ((SAL41.UNIDSERVICIO.substring(0, 2) == '01') || ($_ALMFACT == 'SIN99') || ((SAL41.ADMINW == 'INVI') || (SAL41.ADMINW == 'VENT')) && ($_ALMFACT == 'SIN98')) {
            _Datoalmacen2_41();
        } else {
            if ($_ALMFACT == SAL41.ALMPREF) {
                _Datoalmacen2_41();
            } else {
                CON851('13', '13', null, 'error', 'Error');
                $('#almac_401').val('');
                _Datoalmacen2_41();
            }
        }
    } else {
        _Datoalmacen2_41();
    }
}

function _Datoalmacen2_41() {
    if ((parseInt($_VLRPROMEDW) == 0) && (parseInt($_BASEMEDTAR) == 1)) {
        SAL41.ALMPREF = $_ALMFACT;
        _Leerpromedio_41();
        $_VRVENTA1ART = $_VLRPROMEDW
        if (SAL41.ASUMEIVAUSU == 'S') {
            $_VLRUNITW = Math.round(parseFloat($_VRVENTA1ART) * (100 + parseFloat($_TARIVAW)) / 100)
        } else {
            $_VLRUNITW = $_VRVENTA1ART;
        }
        $_VALORAPROX = Math.round($_VLRUNITW * 1);
        $_VLRUNITW = $_VALORAPROX;
    }
    $('#almac_SAL41').val($_ALMFACT);
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_ALMFACT;
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_16_41, get_url("APP/SALUD/SAL41-16.DLL"));
}

function _dataSAL41_16_41(data) {
    console.debug(data, 'SAL41-16');
    data = data.split('|');
    $_NOMBRELOCAL = data[1].trim();
    $_RESTRICLOCAL = data[2].trim();
    if (data[0].trim() == '00') {
        let URL = get_url("APP/CONTAB/CON904.DLL");
        postData({ datosh: datosEnvio() + localStorage.getItem('Usuario').trim() + '|' + 'I410' + $_ALMFACT.substring(0, 1) + $_ALMFACT.substr(4, 5) + '|' }, URL)
            .then(data => {
                console.debug(data);
                if ((SAL41.NITUSU == '0892001990') && ($_CODLOCAL == 'DR02') && (SAL41.ADMINW == 'MEOM')) $_RESTRICLOCAL == 'N';
                if (($_CLFACT == '0') && ($_ALMFACT.substring(0, 3) != "SIN") && (($_GRUPOFACT == 'PO') && ($_GRUPOFACT == 'NP'))) {
                    _dataCON904_07_41();
                } else {
                    _Permisosalmacen_41();
                }
            })
            .catch(err => {
                console.error(err);
                if (err.MENSAJE == '01' && $_CLFACT == '0') $_RESTRICLOCAL = 'N';
            });
    } else if (data[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#almac_SAL41').val('');
        _Datoalmacen_41();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _dataCON904_07_41(data) {
    let URL = get_url("APP/CONTAB/CON904.DLL");
    postData({ datosh: datosEnvio() + localStorage.getItem('Usuario').trim() + '|' + 'I410M' + '|' }, URL)
        .then(data => {
            console.debug(data);
            _Permisosalmacen_41();
        })
        .catch(err => {
            console.error(err);
            _Datoalmacen_41();
        });
}

function _Permisosalmacen_41() {
    if ($_RESTRICLOCAL == 'N') {
        CON851('13', '13', null, 'error', 'Error');
        _Datoalmacen_41();
    } else if (((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) && ($_ALMFACT == 'DR099') && (($_UNSERVFACT == '04') || ($_UNSERVFACT == '54'))) {
        CON851('B1', 'B1', null, 'error', 'Error');
        _Datoalmacen_41();
    } else if (((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133')) || ($_ALMFACT == 'CR001')) {
        if (($_UNSERVFACT == '04') || ($_UNSERVFACT == '54')) {
            _Permisosalmacen2_41();
        } else {
            CON851('B1', 'B1', null, 'error', 'Error');
            _Datoalmacen_41();
        }
    } else {
        _Permisosalmacen2_41();
    }
}

function _Permisosalmacen2_41() {
    if ($_ALMFACT.substring(0, 3) == 'SIN') {
        _Ventanalote_41()
    } else {
        if ((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) {
            _Ventanalote_41()
        }
        if ((($_GRUPOFACT == 'MQ') && ($_TIPODRFACT == '1') && ((parseInt($_LLAVEBARRASW) == 0)) || ($_LLAVEBARRASW.trim() == '')) && (SAL41.NITUSU == '0891855847')) {
            CON851('1P', '1P', null, 'error', 'Error');
            _Ventanabarras_41();
        } else {
            if ((($_GRUPOFACT == 'PO') || ($_GRUPOFACT == 'NP')) && ($_TIPODRFACT == '1') && (parseInt($_LLAVEBARRASW) == 0)) {
                CON851('1P', '1P', null, 'error', 'Error');
                _Ventanabarras_41();
            }
            if ((($_GRUPOFACT == 'PO') || (SAL41.NITUSU == 'NP')) && ($_LLAVEBARRASW = !$_CODBARRASART)) {
                CON851('1P', '1P', null, 'error', 'Error');
                _Ventanabarras_41();
            } else {
                _Ventanalote_41();
            }
        }
    }
}

function _Ventanalote_41() {
    let datos_envio = datosEnvio();
    datos_envio += SAL41.ADMINW + '|' + $_TIPOART + $_GRUPOFACT + '|'
    SolicitarDll({ datosh: datos_envio }, data => {
        data = data.split('|');
        if (data[0].trim() == '00' || data[0].trim() == '01') {
            SAL41.DESCRIPGRUPO = data[1].trim();
            SAL41.OPCLOTEGR = data[2].trim();
            SAL41.INICIOLOTEGR = data[3].trim();
            if (SAL41.LOTEFARMUSU == 'N') {
                SAL41.OPCLOTEGR = 'N'
            }
            if ((SAL41.OPCLOTEGR == 'S') && (SAL41.FECHALNK >= SAL41.INICIOLOTEGR)) {
                _Aceptarlote_SAL41(); // Ventana
            } else {
                _Buscarsaldo_41();
            }
        } else {
            CON852(data[0], data[1], data[2], _toggleNav);
        }
    }, get_url('APP/SALUD/SAL41-17.DLL'));
}

function _Aceptarlote_SAL41() {
    if ($('#faarmaceutico_SAL41').length < 1) {
        $('#elementos-tabla').append(
            '<div class="col-md-4 col-sm-4 col-xs-4" id="FARMACEUTICO_SAL41">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-6 col-sm-8 col-xs-12">Lote farmaceutico:</label>' +
            '<div class="input-group col-md-6 col-sm-4 col-xs-12" id="MACRO_41">' +
            '<input id="farmaceutico_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden"1">' +
            '</div>' +
            '</div>' +
            '</div>');
        _evaluarlotefarmaceutico_SAL41();
    } else {
        _evaluarlotefarmaceutico_SAL41();
    }
}

function _evaluarlotefarmaceutico_SAL41() {
    validarInputs({
        form: '#FARMACEUTICO_SAL41',
        orden: '1'
    },
        () => { _Evaluaralmacen_41() },
        () => {
            SAL41.CODLOTEFACT = $('#farmaceutico_SAL41').val();
            if (SAL41.CODLOTEFACT.trim() == '') {
                CON851('', '02', null, 'error', 'Error');
                _evaluarlotefarmaceutico_SAL41();
            } else {
                datos_envio = datosEnvio() + SAL41.CODLOTEFACT + '|';
                SolicitarDll({ datosh: datos_envio }, data => {
                    console.debug(data);
                    data = data.split('|');
                    if (data[0].trim() == '00') {
                        SAL41.DESCRIPLTF = data[1].trim();
                        SAL41.LABLTF = data[2].trim();
                        SAL41.LOTELTF = data[3].trim();
                        _Buscarsaldo_41();
                    } else if (data[0].trim() == '08') {
                        CON851('', '08', null, 'error', 'Error');
                        _Evaluaralmacen_41();
                    }
                }, get_url("APP/SALUD/SAL41-18.DLL"));
            }
        }
    )
}

// function _dataSAL41_17(data) {
//     console.debug(data, 'SAL41-17');
//     data = data.split('|');
//     if (data[0].trim() == '00' || data[0].trim() == '99') {
//         if (data[0].trim() == '00') {
//             SAL41['DESCRIPGRUPO'] = data[1].trim();
//             SAL41['OPCLOTEGR'] = data[2].trim();
//         }
//         else {
//             SAL41['DESCRIPGRUPO'] = 'GRUPO NO EXISTE!';
//             SAL41['OPCLOTEGR'] = 'N';
//         }
//         _Validacionesventanalote_41();
//     }
//     else {
//         CON852(data[0], data[1], data[2], _toggleNav);
//     }
//     /// NO ME MUESTRA RM LA VENTANA
// }

function _Buscarsaldo_41() {
    $_CODALMSAL = $_ALMFACT;
    $_CODARTSAL = $_CODART;
    $_GRP1SAL = $_GRUPOFACT.substring(0, 1);
    $_CODLOTESAL = $_CODLOTEFACT;
    if ($_GRP1SAL != '9') {
        let URL = get_url("APP/INVENT/INV808.DLL");
        postData({ datosh: datosEnvio() + $_ALMFACT + $_CODART + $_CODLOTEFACT + '|' }, URL)
            .then(data => {
                console.debug(data);
                var fuente = '';
                for (var i in data) {
                    fuente += '<div class="col-md-12 col-sm-12 col-xs-12">' +
                        '<div class="col-md-3"> ' +
                        '<input id="sdoantcant' + i + '_SAL41" class="form-control input-md"> ' +
                        '</div>' +
                        '<div class="col-md-3"> ' +
                        '<input id="acumentcant' + i + '_SAL41" class="form-control input-md"> ' +
                        '</div>' +
                        '<div class="col-md-3"> ' +
                        '<input id="acumsalcant' + i + '_SAL41" class="form-control input-md"> ' +
                        '</div>' +
                        '<div class="col-md-3"> ' +
                        '<input id="sdoactcant' + i + '_SAL41" class="form-control input-md"> ' +
                        '</div>' +
                        '</div>';
                }
                var ventanaconsultasaldo = bootbox.dialog({
                    size: 'large',
                    title: 'CONSULTA SALDO ACTUAL ' + `${$_CODART}` + ' ALM: ' + `${$_ALMFACT}`,
                    closeButton: false,
                    message: '<div class="row" style="display:float!important">' +
                        '<div class="col-md-12 col-sm-12 col-xs-12">' +
                        fuente +
                        '<div class="col-md-12 col-sm-12 col-xs-12">' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-6 col-sm-6 col-xs-12">TOTAL ACUMULADO:</label>' +
                        '<div class="input-group col-md-6 col-sm-6 col-xs-12" id="SU_41">' +
                        '<input id="saldototal_SAL41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="2">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>',
                    buttons: {
                        aceptar: {
                            label: 'Aceptar',
                            callback: function () {
                                ventanaconsultasaldo.off('shown.bs.modal');
                                if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
                                    $_VLRUNITW = parseFloat($_VLRDEVOL / $_CANTDEVOL)
                                    $_VLRLIMIW = $_VLRUNIT * 3
                                    _Dato3_41();
                                } else {
                                    _Calcularmonto_41();
                                }
                            },
                            className: 'btn-primary'
                        },
                    },
                });
                ventanaconsultasaldo.init($('.modal-footer').hide());
                ventanaconsultasaldo.on('keydown', e => {
                    $('.btn-primary').click();
                });
                ventanaconsultasaldo.init(() => {
                    _inputControl('disabled');
                    var SALDOTOTAL = 0;
                    for (var i in data) {
                        $('#sdoantcant' + i + '_SAL41').val(data.SDO_ANT);
                        $('#acumentcant' + i + '_SAL41').val(data.ACUM_ENT);
                        $('#acumsalcant' + i + '_SAL41').val(data.ACUM_SAL);
                        $('#sdoactcant' + i + '_SAL41').val(data.SDO_ACT);
                        SALDOTOTAL = SALDOTOTAL + parseFloat(data.SDO_ACT);
                    }
                    $('#saldototal_SAL41').val(SALDOTOTAL);
                    $_SDOACTCANT = SALDOTOTAL;
                });

            })
            .catch(err => {
                console.debug(err);
            })
    }
}

function _Calcularmonto_41() {
    if ($_CLFACT == '0') {
        if (($_BASEMEDTAR == '1') || ($_BASEMEDTAR == '2') || ($_BASEMEDTAR == '3') || ($_BASEMEDTAR == '4')) {
            switch ($_GRUPOFACT) {
                case 'PO':
                    $_FACTORW = $_PORCPOTAR / 100;
                    break;
                case 'NP':
                    $_FACTORW = $_PORCNPTAR / 100;
                    break;
                case 'MO':
                    $_FACTORW = $_PORCMOTAR / 100;
                    break;
                default:
                    $_FACTORW = $_PORCMQTAR / 100;
                    break;
            }
        } else {
            $_FACTORW = 1;
            $_BASEMEDTAR = '3';
        }
        $_VLRUNITW = parseFloat($_VLRUNITW) * $_FACTORW;
        $_VALORAPROX = parseFloat($_VLRUNITW) * 1;
        $_VLRUNITW = $_VALORAPROX;
        // LEER TABMEDICAMENTO
        console.debug('archivo-medicamento');
        _Calcularmonto2_41();
    } else {
        if (($_CLFACT == '4') && (($_ARTFACT == 'XXCAPITA') || ($_ARTFACT == 'XXUTI'))) {
            $_SWAPR = '1';
        } else {
            _Buscarincremento_41();
            switch (SAL41.FORMALIQTAB) {
                case '1':
                    $_SWAPR = 1;
                    break;
                case '2':
                    $_SWAPR = 100;
                    break;
                case '3':
                    $_SWAPR = 1;
                    break;
                case '4':
                    $_SWAPR = 100;
                    break;
                case '5':
                    $_SWAPR = 1;
                    break;
                default:
                    $_SWAPR = 1;
                    break;
            }
            if (SAL41.NITUSU == '0892000401') {
                $_VLRUNITW = Math.round(($_VLRUNITW * $_FACTORW) / $_SWAPR);
                $_VLRUNITW = Math.round($_VLRUNITW * $_SWAPR);
            } else {
                $_VALORAPROX = Math.round(($_VLRUNITW * $_FACTORW) / $_SWAPR);
                console.debug($_VALORAPROX);
                $_VLRUNITW = Math.round($_VALORAPROX * $_SWAPR);
                console.debug($_VLRUNITW);
            }
        }
        _Calcularmonto2_41();
    }
}

function _Calcularmonto2_41() {
    if (($_CLFACT == '1') && ((SAL41.FORMALIQTAB == '2') || (SAL41.FORMALIQTAB == '4'))) {
        $_VALOREDIT = SAL41.MONTOTAB;
    } else {
        $_VALOREDIT = $_VLRUNITW;
    }
    _Calcularmonto3_41();
}

function _Calcularmonto3_41() {
    $_CANTFACT = 0;
    if (parseInt($_CANTFACT) > 0) {
        // $_VLRARTW = Math.round($_VLRUNITW * $_CANTFACT);
        $_VLRARTW = $_VLRUNITW * $_CANTFACT;
    }
    if ((SAL41.NITUSU == '0845000038') && ($_CLFACT == '0')) {
        $_VLRARTCOMPW = $_VLRUNITW * $_CANTFACT;
        if ($_VLRARTCOMPW == $_VLRARTW) {
            _Calcularmonto4_41();
        } else {
            $_VLRARTW = $_VLRARTCOMPW;
        }
    } else {
        _Calcularmonto4_41();
    }
}

function _Calcularmonto4_41() {
    if ($_SWOCULTAR == '01') {
        PriceUnitMask_41.typedValue = $_VALOREDIT;
    } else {
        PriceUnitMask_41.typedValue = $_VALOREDIT;
    }
    $_VLRLIMIW = $_VLRUNITW * 3;
    _Calcularmonto5_41();
}

function _Calcularmonto5_41() {
    if ($_CLFACT == '1') {
        if ($_CODTABW == 'I4') {
            $_VLRUNITW = SAL41.MONTOTAB * $_HNQUIRTAR * $_FACTORW;
            $_CANTFACT = 1;
            MountMask_41.typedValue = $_CANTFACT;
            _Validarcant_41();
        } else {
            $_DIAGNCUP1 = $_DIAGNCUP;
            $_ATIENDEESPCUP1 = $_ATIENDEESPCUP;
            $_DIV2CUP1 = $_DIV2CUP;
            $_DIVISIONCUP1 = $_DIVISIONCUP;
            _Datohonorarios_41();
        }
    } else {
        _Dato3_41();
    }
}

function _Dato3_41() {
    // if ($_CLFACT == '0') {
    //     // AGREGAR A LA TABLA MOSTRAR "F4 EN CANTIDAD, RECALCULA SALDO ARTICULO"
    // }
    if (parseFloat($_CANTFACT) == 0) {
        if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
            $_CANTFACT = $_CANTDEVOL * (-1);
        } else {
            $_CANTFACT = 1;
        }
        $_CANTFACTEDIT = $_CANTFACT;
        console.debug($_CANTFACTEDIT);
        MountMask_41.typedValue = $_CANTFACTEDIT;
    }
    console.debug('dato3');
    _Evaluarcant_41();
}

function _Evaluarcant_41() {
    validarInputs({
        form: '#CANT_41',
        orden: '1'
    },
        () => { _Dato2_41() },
        () => {
            $_CANTFACT = MountMask_41.value;
            console.debug($_CANTFACT);
            if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
                _Validarcant_41();
            } else {
                if ($_CANTFACT == '0.00') {
                    _Dato3_41();
                } else {
                    _Validarcant_41();
                }
            }
        }
    )
}

function _Validarcant_41() {
    if ($_CLFACT == '0') {
        if ($_TIPODRFACT == '2') {
            if (parseFloat($_CANTFACT) == 0) {
                _Aceptarcodigo_41();
            } else {
                if ((parseFloat($_CANTFACT) > 0) || (parseFloat($_CANTFACT) + parseFloat($_CANTDEVOL) < 0)) {
                    $_SWERROR = '1'
                    CON851('07', '07', null, 'error', 'Error');
                    _Dato3_41();
                } else {
                    $_SWERROR = '0';
                    _Dato5_41();
                }
            }
        } else {
            if ((parseFloat($_CANTFACT < 0)) && ($_ALMFACT != 'S')) {
                CON851('46', '46', null, 'error', 'Error');
                _Dato3_41();
            } else if ((SAL41.NITUSU == '0892000458') && (($_ALMFACT == 'DR002') || ($_ALMFACT == 'DR003') || ($_ALMFACT == 'URG01'))) {
                _Validarcant2_41()
            } else {
                if (($_ALMFACT.substring(0, 3) != 'SIN') && (parseFloat($_CANTFACT) > 0) && (parseFloat($_CANTFACT) > parseFloat($_SDOACTCANT))) {
                    CON851('07', '07', null, 'error', 'Error');
                    if (SAL41.RESTIC_EXUSU == 'N') {
                        _Dato3_41();
                    } else {
                        _Validarcant2_41();
                    }
                } else {
                    _Validarcant2_41();
                }
            }
        }
    } else {
        _Validarcant2_41();
    }
}

function _Validarcant2_41() {
    if ($_CLFACT == '0') {
        if ($_SDOACTCANT < $_AUTORETART) {
            CON851('5K', '5K', null, 'warning', 'Advertencia!');
        } else {
            if ($_CANTFACT > $_CANTMAX) {
                $_SWERROR = '1';
                CON851('07', '07', null, 'error', 'Error');
                _Dato3_41();
            } else {
                _Validarcant3_41()
            }
        }
    } else {
        $_COD1ARTFACT = $_CODARTFACT.substring(0, 1);
        if (($_GRUPOFACT == '93') || ($_GRUPOFACT == 'XX') || (($_GRUPOFACT == '89') && ($_COD1ARTFACT == '3'))) {
            _Validarcant3_41()
        } else {
            if ($_CANTFACT > $_CANTMAX) {
                $_SWERROR = '1';
                CON851('07', '07', null, 'error', 'Error');
                _Dato3_41();
            } else {
                _Validarcant3_41()
            }
        }
    }
}

function _Validarcant3_41() {
    if (((SAL41.NITUSU == '0900658867') || (SAL41.NITUSU == '0900541158') || (SAL41.NITUSU == '0900566047') || (SAL41.NITUSU == '0800037979')) && (($_GRUPOFACT == 'PO') || ($_GRUPOFACT == 'NP'))) {
        fuente = '<div class="col-md-12" id="DIASTRATAFACT_41"> ' +
            '<input id="diatratafact_SAL41" type="text" class="form-control input-md" data-orden="1" maxlength="3"> ' +
            '</div>';
        _ventana({
            source: fuente,
            title: 'DIAS TRATAMIENTO',
            size: small,
            espace: true,
            focus: '#diatratafact_SAL41',
            form: '#DIASTRATAFACT_41',
            order: '1',
            global1: '$_DIASTRATAFACT',
            inputglobal1: '#diatratafact_SAL41',
        }, _Validarcant4_41, _Detalle_41)
    } else {
        _Validarcant4_41();
    }
}

function _Validarcant4_41() {
    if (($_VLRUNITW == '0') || (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'T') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z'))) {
        $_DESCTOW = '0';
        _Calcularprecio_41();
    } else {
        _Datodestart_41();
    }
}

function _Datodestart_41() {
    $_DESCTOUSU = $_USUA_GLOBAL[0].DESCTO;
    if (($_DESCTOUSU == 'N') || (($_CLFACT == '0') && ($_TIPODRFACT == '2'))) {
        $_DESCTOW = '0'
        _Calcularprecio_41();
    } else {
        // evaluar desctow 5592
    }
}

function _Calcularprecio_41() {
    // $_FACTORDESW = Math.round((100 - $_DESCTOW) / 100)
    $_FACTORDESW = (100 - $_DESCTOW) / 100;
    if (SAL41.NITUSU == '0845000038') {
        if ($_CLFACT == '0') {
            $_VLRUNIT2W = Math.round(parseFloat($_VLRUNITW) * parseFloat($_FACTORDESW));
            $_VLRUNITW = $_VLRUNIT2W;
        } else {
            $_VLRUNITW = Math.round(parseFloat($_VLRUNITW) * parseFloat($_FACTORDESW));
        }
    } else {
        $_VLRUNITW = Math.round(parseFloat($_VLRUNITW) * parseFloat($_FACTORDESW));
    }
    _Calcularprecio2_41();
}

function _Calcularprecio2_41() {
    if ((SAL41.ASUMEIVAUSU == 'S') && ($_CLFACT = !'1') && ($_GRUPOFACT = !'S1') && ($_GRUPOFACT = !'XX') && (parseFloat($_VLRUNITW > 0))) {
        _Dato5_41();
    } else {
        _Dato4_41();
    }
}

function _Dato4_41() {
    if ((SAL41.NITUSU == '0822001570') && ($_CLFACT == '0')) {
        // CONTINUE
    } else {
        if ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162') || (SAL41.NITUSU == '0900658867') || (SAL41.NITUSU == '0830511298') || (SAL41.NITUSU == '0822001570')) {
            if ((SAL41.ADMINW == 'LUZA') || (SAL41.ADMINW == 'MOR6') || (SAL41.ADMINW == 'ADMI') || (SAL41.ADMINW == 'BLA1')) {
                $_SWINVALID = '0';
                _Dato42_41();
            } else {
                _Validartlimite_41();
            }
        } else {
            _Dato42_41();
        }
    }
}

function _Dato42_41() {
    if ($_SWOCULTAR == '01') {
        _Validartlimite_41();
    } else {
        _Evaluarvlrunitw_41();
    }
}

function _Evaluarvlrunitw_41() {
    console.debug('pendiente f8 linea 5656');
    validarInputs({
        form: '#VLRUNIT_41',
        orden: '1'
    },
        function () { _Dato2_41() },
        _Validartlimite_41
    )
}

function _Validartlimite_41() {
    $_VLRUNITW = PriceUnitMask_41.value;
    console.debug($_VLRUNITW);
    if (($_VLRLIMIW > 0) && ($_VLRUNITW > $_VLRLIMIW)) {
        CON851('9E', '9E', null, 'warning', 'Advertencia!');
        _Dato4_41();
    } else {
        if ($_SWBONO == '1') {
            $_VRDCTOW = $_VLRUNITW * 0.2;
            $_VLRUNITW = $_VLRUNITW * 0.8;
        }
        $_VALOREDIT = $_VLRUNITW;
        console.debug($_VALOREDIT);
        PriceUnitMask_41.typedValue = $_VALOREDIT;
        _Dato5_41();
    }
    // if ($_SWOCULTAR == '01') {
    // } else {
    //     _Dato5_41();
    // }
}

function _Dato5_41() {
    if (SAL41.NITUSU == '0892000401') {
        let vlrunit = $_VLRUNITW.replace(/,/g, '');
        let cantfact = $_CANTFACT.replace(/,/g, '')
        $_VLRARTW = parseFloat(vlrunit) * parseFloat(cantfact);
    } else {
        let vlrunit = $_VLRUNITW.replace(/,/g, '');
        let cantfact = $_CANTFACT.replace(/,/g, '');
        $_VLRARTW = parseFloat(vlrunit) * parseFloat(cantfact);
    }
    if ((SAL41.NITUSU == '0830512772') && ($_REGULADOSTABME == 'S')) {
        if ($_VLRARTW > $_VLRLIMITETABME) {
            $_VLRREGULADOW = ($_VLRARTW * $_PORCEMINTABME) / 100;
        } else {
            if ($_VLRARTW > 0) {
                $_VLRREGULADOW = ($_VLRARTW * $_PORCEMAXTABME) / 100;
            }
        }
        $_VLRARTW = $_VLRARTW + $_VLRREGULADOW;
    }
    if (SAL41.NITUSU == '0892000401') {
        $_VALOREDIT = $_VLRARTW;
        PriceTotalMask_41.typedValue = $_VALOREDIT;
    } else {
        $_VALORAPROX = $_VLRARTW / $_SWAPR;
        $_VLRARTW = $_VALORAPROX * $_SWAPR;
    }
    $_VALOREDIT = $_VLRARTW;
    PriceTotalMask_41.typedValue = $_VALOREDIT;
    if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
        if (($_VLRARTW > 0) || (($_VLRARTW + $_VLRDEVOL) < 0)) {
            CON851('07', '07', null, 'error', 'Error');
            _Dato4_41();
        }
    } else if (($_CLFACT == '1') && ($_CODTAB == 'I4')) {
        _Ventanacirugia_41();
    } else {
        _Total_41();
    }
}

function _Total_41() {
    if (SAL41.CAMBIO == 0) SAL41.CONTEO = $('#TABLA_401 tbody tr').length + 1;
    var consulta = SAL41.CONTEO - 1;
    if (consulta < 0) consulta = 0;
    if ($_CLFACT == '0') {
        if ($('#TABLA_401 tbody tr:eq(' + consulta + ')').length > 0) {
            $('#TABLA_401 tbody tr:eq(' + consulta + ')').html(
                '<td style="width: 5%">' + SAL41.CONTEO + '</td>' +
                '<td style="width: 10%">' + $('#codservicio2_SAL41').val() + '</td>' +
                '<td style="width: 30%">' + $('#detalle_SAL41').val() + '</td>' +
                '<td style="width: 10%">' + $('#almac_SAL41').val() + '</td>' +
                '<td style="width: 10%">' + MountMask_41.value + '</td>' +
                '<td style="width: 10%">' + $('#und_SAL41').val() + '</td>' +
                '<td style="width: 10%">' + PriceUnitMask_41.value + '</td>' +
                '<td style="width: 15%">' + PriceTotalMask_41.value + '</td>'
            )
        } else {
            $('#TABLA_401 tbody').append(
                '<tr>' +
                '<td style="width: 5%">' + SAL41.CONTEO + '</td>' +
                '<td style="width: 10%">' + $('#codservicio2_SAL41').val() + '</td>' +
                '<td style="width: 30%">' + $('#detalle_SAL41').val() + '</td>' +
                '<td style="width: 10%">' + $('#almac_SAL41').val() + '</td>' +
                '<td style="width: 10%">' + MountMask_41.value + '</td>' +
                '<td style="width: 10%">' + $('#und_SAL41').val() + '</td>' +
                '<td style="width: 10%">' + PriceUnitMask_41.value + '</td>' +
                '<td style="width: 15%">' + PriceTotalMask_41.value + '</td>' +
                '</tr>'
            )
        }
    } else {
        if ($('#TABLA_401 tbody tr:eq(' + consulta + ')').length > 0) {
            $('#TABLA_401 tbody tr:eq(' + consulta + ')').html(
                '<td style="width: 5%">' + SAL41.CONTEO + '</td>' +
                '<td style="width: 10%">' + $('#codservicio2_SAL41').val() + '</td>' +
                '<td style="width: 30%">' + $('#detalle_SAL41').val() + '</td>' +
                '<td style="width: 10%">' + $('#almac_SAL41').val() + '</td>' +
                '<td style="width: 10%">' + MountMask_41.value + '</td>' +
                '<td style="width: 10%">' + $('#und_SAL41').val() + '</td>' +
                '<td style="width: 10%">' + PriceUnitMask_41.value + '</td>' +
                '<td style="width: 15%">' + PriceTotalMask_41.value + '</td>'
            )
        } else {
            $('#TABLA_401 tbody').append(
                '<tr>' +
                '<td style="width: 5%">' + SAL41.CONTEO + '</td>' +
                '<td style="width: 10%">' + $('#codservicio2_SAL41').val() + '</td>' +
                '<td style="width: 30%">' + $('#detalle_SAL41').val() + '</td>' +
                '<td style="width: 10%">' + $('#almac_SAL41').val() + '</td>' +
                '<td style="width: 10%">' + MountMask_41.value + '</td>' +
                '<td style="width: 10%">' + $('#und_SAL41').val() + '</td>' +
                '<td style="width: 10%">' + PriceUnitMask_41.value + '</td>' +
                '<td style="width: 15%">' + PriceTotalMask_41.value + '</td>' +
                '</tr>'
            )
        }
    }
    _Sumarvalores_41();
    _Almacenartabla();
    $_VALORBASE1IVA = $_VALORBASE2IVA = $_VALORBASE3IVA = 0;
    $_VLRTOTEDIT = $_VALORBRUTO;
    console.debug($_SWOCULTAR);
    $_VLRIVAFACT = ($_VALORBASE1IVA * SAL41.IVAUSU / 100) + ($_VALORBASE2IVA * SAL41.IVAUSU2 / 100) + ($_VALORBASE3IVA * SAL41.IVAUSU3 / 100);
    SAL41['VLRIVA1FACT'] = ($_VALORBASE1IVA * SAL41.IVAUSU / 100);
    SAL41['VLRIVA2FACT'] = ($_VALORBASE2IVA * SAL41.IVAUSU / 100);
    SAL41['VLRIVA3FACT'] = ($_VALORBASE3IVA * SAL41.IVAUSU / 100);
    $_VALORDESFACT = 0;
    $_VALORTOTAL = $_VALORBRUTO + $_VLRIVAFACT - $_VALORDESFACT;
    if ($_SWOCULTAR == '01') {
        // PriceTotalMask_41.typedValue = '';
        // PriceivaMask_41.typedValue = '';
        // NetoFactMask_41.typedValue = '';
        PriceContMask_41.typedValue = $_VLRTOTEDIT;
        PriceivaMask_41.typedValue = $_VLRIVAFACT;
        NetoFactMask_41.typedValue = $_VLRIVAFACT;
    } else {
        PriceContMask_41.typedValue = $_VLRTOTEDIT;
        PriceivaMask_41.typedValue = $_VLRIVAFACT;
        NetoFactMask_41.typedValue = $_VLRIVAFACT;
        console.debug($_VLRIVAFACT, $_VLRTOTEDIT);
    }
    _Limpiarcampos_41();
    _Aceptarcodigo_41();
}

function _Almacenartabla() {
    if (SAL41.OPCIONACTIVA == '09426') SAL41.CONTEO = SAL41.CONTEO - 1
    if (SAL41.CONTEO < 2) {
        if ($TABLAFACT[SAL41.CONTEO]) { 
            $TABLAFACT[SAL41.CONTEO] = { ALMACEN: $_ALMFACT, ARTICULO: $_ARTFACT, COD_LOTE: $_CODLOTEFACT, CANTIDAD: parseFloat(MountMask_41.value), VALOR_UNIT: PriceUnitMask_41.value.replace(/,/gi, ''), DIASTRATAFACT: $_DIASTRATAFACT, VLRLATERFACT: SAL41.VLRLATERFACT, DATOSETCUP: $_DATOSETCUP, CISCUP: $_CISCUP, DESCRIP_ART: $_DESCRIPCUP, CODCUP: $_CODSERTAB, VALOR_FACT: PriceTotalMask_41.value.replace(/,/gi, '') } 
        }
        else {
            $_CODSERTAB.length > 0 ? $_CODSERTAB = $_CODSERTAB : $_CODSERTAB = '';
            $_DIASTRATAFACT = '' ? $_DIASTRATAFACT = 0 : $_DIASTRATAFACT = $_DIASTRATAFACT;
            $_CODLOTEFACT = '' ? $_CODLOTEFACT = '    ' : $_CODLOTEFACT = $_CODLOTEFACT;
            $TABLAFACT = [
                { ALMACEN: $_ALMFACT, ARTICULO: $_ARTFACT, COD_LOTE: $_CODLOTEFACT, CANTIDAD: parseFloat(MountMask_41.value), VALOR_UNIT: PriceUnitMask_41.value.replace(/,/gi, ''), DIASTRATAFACT: $_DIASTRATAFACT, VLRLATERFACT: SAL41.VLRLATERFACT, DATOSETCUP: $_DATOSETCUP, CISCUP: $_CISCUP, DESCRIP_ART: $_DESCRIPCUP, CODCUP: $_CODSERTAB, VALOR_FACT: PriceTotalMask_41.value.replace(/,/gi, '') }
            ]
        }
    } else {
        if ($TABLAFACT[SAL41.CONTEO]) { 
            $TABLAFACT[SAL41.CONTEO] = $TABLAFACT2 = { ALMACEN: $_ALMFACT, ARTICULO: $_ARTFACT, COD_LOTE: $_CODLOTEFACT, CANTIDAD: parseFloat(MountMask_41.value), VALOR_UNIT: PriceUnitMask_41.value.replace(/,/gi, ''), DIASTRATAFACT: $_DIASTRATAFACT, VLRLATERFACT: SAL41.VLRLATERFACT, DATOSETCUP: $_DATOSETCUP, CISCUP: $_CISCUP, DESCRIP_ART: $_DESCRIPCUP, CODCUP: $_CODSERTAB, VALOR_FACT: PriceTotalMask_41.value.replace(/,/gi, '') } 
        }
        else {
            $TABLAFACT2 = { ALMACEN: $_ALMFACT, ARTICULO: $_ARTFACT, COD_LOTE: $_CODLOTEFACT, CANTIDAD: parseFloat(MountMask_41.value), VALOR_UNIT: PriceUnitMask_41.value.replace(/,/gi, ''), DIASTRATAFACT: $_DIASTRATAFACT, VLRLATERFACT: SAL41.VLRLATERFACT, DATOSETCUP: $_DATOSETCUP, CISCUP: $_CISCUP, DESCRIP_ART: $_DESCRIPCUP, CODCUP: $_CODSERTAB, VALOR_FACT: PriceTotalMask_41.value.replace(/,/gi, '') }
            $TABLAFACT.push($TABLAFACT2);
        }
    }
}


function _Limpiarcampos_41() {
    $('#codservicio2_SAL41').val('');
    $('#almac_SAL41').val('');
    $('#detalle_SAL41').val('');
    $('#cant_SAL41').val('');
    $('#und_SAL41').val('');
    $('#vlrunit_SAL41').val('');
    $('#vlrtotal_SAL41').val('');
}

function _Datodescto_41() {
    if ($_SWBONO == '0') {
        $_VALORDESFACT = 0;
    }
    _Datoabono_41();
}

function _Datoabono_41() {
    console.log('DATO ABONO')
    if (($_PREFIJOFACT == 'C' || $_PREFIJOFACT == 'P' || $_PREFIJOFACT == 'T') || ($_FORMACOPAGNUM == '2')) {
        $_COPAGOESTIMFACT = 0;
        _Editarabono_41();
    } else if (($_FORMACOPAGNUM == '4') && ($_LLAVENUM == $_FACTCAPITNUM)) {
        _Datocopago_41();
    } else if ($_PREFIJOFACT == 'E') {
        $_PORCENTCOPAGO = 9;
        $_COPAGOESTIMFACT = $_VALORTOTAL;
        if (SAL41.NITUSU == '0892000401') {
            _Datocopago_41();
        } else {
            _Editarabono_41();
        }
    } else if (((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162')) && ($_PORCENTCOPAGONUM == '99')) {
        $_COPAGOESTIMFACT = $_VALORBRUTO;
        _Editarabono_41();
    } else if (((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719')) && ($_COPAGOPACI == 'N')) {
        $_COPAGOESTIMFACT = 0;
        _Editarabono_41();
    } else if (SAL41.NITUSU == '0800156469') {
        _Datoabono2_41();
    } else {
        if ($_CLFACT == '7') {
            $_COPAGOESTIMFACT = 0;
            _Editarabono_41();
        } else {
            _Datoabono2_41();
        }
    }
}

function _Datoabono2_41() {
    if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
        $_COPAGOESTIMFACT == 0;
        _Editarabono_41();
    } else if ((($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) && ($_NITFACT == '9999') && (($_ACTTER == '15') || ($_ACTTER == '25'))) {
        $_PORCENTCOPAGO = 9;
        $_COPAGOESTIMFACT = $_VALORTOTAL;
        if (SAL41.NITUSU == '0892000401') {
            _Datocopago_41();
        } else {
            _Editarabono_41();
        }
    } else if ((SAL41.NITUSU == $_NITFACT) && (($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z"))) {
        $_COPAGOESTIMFACT = 0;
        _Datocopago_41();
    } else if ((SAL41.NITUSU == '0900685768') && (($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z"))) {
        $_PORCENTCOPAGO = 9;
        $_COPAGOESTIMFACT = $_VALORTOTAL;
        _Editarabono_41();
    } else if ((SAL41.NITUSU == '0900405505') || (SAL41.NITUSU == '0830511298')) {
        _Datoabono3_41();
    } else {
        if (($_ACTTER == '15') || ($_ACTTER == '25') || ($_ACTTER == '30') || ($_ACTTER == '22') || ($_ACTTER == '27')) {
            _Datocopago_41();
        } else {
            _Datoabono3_41();
        }
    }
}

function _Datoabono3_41() {
    if ((($_UNSERVFACT == '01') || ($_UNSERVFACT == '08')) || ($_PUERTAESTAD == '1') || (($_EPSPACI == 'RES') || ($_EPSPACI == 'EAR'))) {
        $_COPAGOESTIMFACT = 0;
        _Editarabono_41();
    } else if (SAL41.NITUSU == '0800175901') {
        $_PORCENTCOPAGO = 0;
    } else {
        if ($_PORCENTCOPAGO = 0) {
            if (($_COPAGMODCUP == '1') && (($_TIPOAFILPACI == '0') || ($_TIPOAFILPACI == '2'))) {
                switch ($_ESTRATOPACI) {
                    case '1':
                        $_PORCENTCOPAGO = 11.5;
                        break;
                    case '2':
                        $_PORCENTCOPAGO = 17.3;
                        break;
                    case '3':
                        $_PORCENTCOPAGO = 23;
                        break;
                    default:
                        $_PORCENTCOPAGO = 11.5;
                        break;
                }
                _Validarfechaopago_41();
            } else if ((SAL41.NITUSU == '0900405505') && ($_CLFACT == '4') && (($_TIPOAFILPACI == '0') || ($_TIPOAFILPACI == '2'))) {
                if (($_SWORDSERV == 'S') && ($_COPAGOESTIMFACT > 0)) {
                    _Datocopago_41();
                } else {
                    _Datoabono4_41();
                }
            } else {
                switch ($_ESTRATOPACI) {
                    case '0':
                        $_PORCENTCOPAGO = 0;
                        if (($_SWORDSERV == 'S') && ($_COPAGOESTIMFACT > 0)) {
                            _Datocopago_41();
                        } else {
                            _Datoabono4_41();
                        }
                        break;
                    case '1':
                        if ($_TIPOPACI == 'S') {
                            $_PORCENTCOPAGO = 0;
                            if (($_SWORDSERV == 'S') && ($_COPAGOESTIMFACT > 0)) {
                                _Datocopago_41();
                            } else {
                                _Datoabono4_41();
                            }
                        } else {
                            $_PORCENTCOPAGO = 9;
                            $_COPAGOESTIMFACT = $_VLRMODW[1];
                            _Datocopago_41();
                        }
                        break;
                    case '2':
                        if ($_TIPOPACI == 'S') {
                            $_PORCENTCOPAGO = 10;
                            if (($_SWORDSERV == 'S') && ($_COPAGOESTIMFACT > 0)) {
                                _Datocopago_41();
                            } else {
                                _Datoabono4_41();
                            }
                        } else {
                            $_PORCENTCOPAGO = 9;
                            $_COPAGOESTIMFACT = $_VLRMODW[2];
                            _Datocopago_41();
                        }
                        break;
                    case '3':
                        if ($_TIPOPACI == 'S') {
                            $_PORCENTCOPAGO = 15;
                            if (($_SWORDSERV == 'S') && ($_COPAGOESTIMFACT > 0)) {
                                _Datocopago_41();
                            } else {
                                _Datoabono4_41();
                            }
                        } else {
                            $_PORCENTCOPAGO = 9;
                            $_COPAGOESTIMFACT = $_VLRMODW[3];
                            _Datocopago_41();
                        }
                        break;
                    default:
                        if ($_TIPOPACI == 'S') {
                            $_PORCENTCOPAGO = 15;
                            if (($_SWORDSERV == 'S') && ($_COPAGOESTIMFACT > 0)) {
                                _Datocopago_41();
                            } else {
                                _Datoabono4_41();
                            }
                        } else {
                            $_PORCENTCOPAGO = 9;
                            $_COPAGOESTIMFACT = $_VLRMODW[3];
                            _Datocopago_41();
                        }
                        break;
                }
            }
        } else {
            $_OPSEGU = 'I41C';
            let datos_envio = datosEnvio();
            datos_envio += '|'
            datos_envio += $_OPSEGU;
            // SolicitarDll({ datosh: datos_envio }, _dataCON904S_06_41, get_url("APP/CONTAB/CON904S.DLL"));
            let URL = get_url("APP/CONTAB/CON904S.DLL");
            postData({
                datosh: datosEnvio() + SAL41.ADMINW + '|I41C|'
            }, URL)
                .then((data) => {
                    loader("hide")
                    if (data.trim() == '01') {
                        if ((SAL41.NITUSU == '0900405505') && ($_GRUPOFACT == '93')) {
                            if (($_SWORDSERV == 'S') && ($_COPAGOESTIMFACT > 0)) {
                                _Datocopago_41();
                            } else {
                                _Datoabono4_41();
                            }
                        } else {
                            _Editarabono_41();
                        }
                    } else {
                        if (($_SWORDSERV == 'S') && ($_COPAGOESTIMFACT > 0)) {
                            _Datocopago_41();
                        } else {
                            _Datoabono4_41();
                        }
                    }
                })
                .catch(error => {
                    console.error(error);
                    _Evaluaridhistoriafact_41();
                });
        }
    }
}

function _Datoabono4_41() {
    if ((SAL41.NITUSU == '0800162035') && ($_NITFACT == '9999') && ($_CLFACT == '0')) {
        $_PORCENTCOPAGO = 9;
    }
    if (SAL41.NITUSU == '0822002688') {
        _Validarcopago_41();
    } else {
        if ($_FORMACOPAGNUM == '1' || $_FORMACOPAGNUM == '4') {
            _Evaluarcopago_41();
        } else {
            $_COPAGOESTIMFACT = '0';
            $_PORCENTCOPAGO = '0';
            _Aceptarespec_41();
        }
    }
}

function _Evaluarcopago_41() {
    console.log('pcopago')
    validarInputs({
        form: '#PCOPAGO_41',
        orden: '1'
    },
        () => { _Evaluarcodservicio2_41() },
        () => {
            $_PORCENTCOPAGO = CopagoMask.value;
            if (($_PORCENTCOPAGO == 0) || ($_PORCENTCOPAGO == 5) || ($_PORCENTCOPAGO == 10) || ($_PORCENTCOPAGO == 15) || ($_PORCENTCOPAGO == 20) || ($_PORCENTCOPAGO == 30) || ($_PORCENTCOPAGO == 11.5) || ($_PORCENTCOPAGO == 17.3) || ($_PORCENTCOPAGO == 23) || ($_PORCENTCOPAGO == 9)) {
                _Validarcopago2_41();
            } else {
                _Datoabono_41();
            }
        }
    )
}

function _Validarcopago2_41() {
    if ($_PORCENTCOPAGO == 9) {
        CopagoMask.typedValue = ' ';
    } else {
        $_COPAGOESTIMFACT = Math.round((($_VALORBRUTO + $_VLRIVAFACT - $_VALORDESFACT) * $_PORCENTCOPAGO) / 100);
    }
    _Datocopago_41();
}

function _Datocopago_41() {
    console.debug('dato copago 41');
    if ((SAL41.NITUSU == '0800162035') && ($_NITFACT == '9999') && ($_CLFACT == '0')) {
        $_COPAGOESTIMFACT = $_VALORTOTAL;
    }
    $_OPSEGU = 'I41C';
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_OPSEGU;
    // SolicitarDll({ datosh: datos_envio }, _dataCON904S_07_41, get_url("APP/CONTAB/CON904S.DLL"));
    let URL = get_url("APP/CONTAB/CON904S.DLL");
    postData({
        datosh: datosEnvio() + SAL41.ADMINW + '|I41C|'
    }, URL)
        .then((data) => {
            loader("hide")
            if (data.trim() == '01') {
                if (((SAL41.NITUSU == '0900405505') || (SAL41.NITUSU == '0830511298')) && ($_GRUPOFACT == '93')) {
                    _Evaluarcopagoestimfact();
                } else {
                    _Editarabono_41();
                }
            } else {
                _Evaluarcopagoestimfact_41();
            }
        })
        .catch(error => {
            console.error(error);
            _Evaluaridhistoriafact_41();
        });
}

function _Evaluarcopagoestimfact_41() {
    CopagoMask2.typedValue = $_COPAGOESTIMFACT;
    validarInputs({
        form: '#COPAGO_41',
        orden: '1'
    },
        _Evaluarcopago_41,
        _Editarabono_41
    )
}

function _Editarabono_41() {
    $_COPAGOESTIMFACT = CopagoMask2.value.replace(/,/g, '');
    console.debug($_COPAGOESTIMFACT);
    $_COPAGOESTIMFACT = parseFloat($_COPAGOESTIMFACT);
    if (isNaN($_COPAGOESTIMFACT)) $_COPAGOESTIMFACT = 0;
    console.debug($_COPAGOESTIMFACT);
    $_VALOTOTAL = $_VALORBRUTO + $_VLRIVAFACT - $_VALORDESFACT;
    console.debug($_VALORTOTAL);
    $_VALORTOTAL = $_VALORTOTAL - $_COPAGOESTIMFACT;
    console.debug($_VALORTOTAL);
    NetoFactMask_41.typedValue = ' ';
    // if ($_SWOCULTAR != '01') NetoFactMask_41.typedValue = $_VALORTOTAL;
    NetoFactMask_41.typedValue = $_VALORTOTAL;
    _Aceptartipocopago_41();
}

function _Aceptartipocopago_41() {
    console.log('aceptartipocopago')
    if (($_VALORTOTAL < 0) && (($_CLFACT == '1') || ($_CLFACT == '2') || ($_CLFACT == '3'))) {
        CON851('07', '07', null, 'warning', 'Warning');
    }
    if ($_COPAGOESTIMFACT == 0) {
        $_TIPOCOPAGOFACT = ' ';
        _Aceptarespec_41();
    } else {
        if ($_VALOTOTAL = 0) {
            $_TIPOCOPAGOFACT = 3;
            _Aceptarespec_41();
        } else {
            if ($_CLFACT == '5') {
                $_TIPOCOPAGOFACT = 2;
                _Aceptarespec_41();
            } else {
                if ((SAL41.NITUSU == '0845000038') && (($_CLFACT == '0') || ($_CLFACT == '2') || ($_CLFACT == '3') || ($_CLFACT == '4'))) {
                    $_TIPOCOPAGOFACT = '2';
                    _Aceptarespec_41();
                } else {
                    var copago = [
                        { codigo: '1', descripcion: 'CO-PAGO' },
                        { codigo: '2', descripcion: 'CUOTA MODERAD' },
                        { codigo: '3', descripcion: 'PAGO CONTADO' }
                    ];
                    POPUP({
                        array: copago,
                        titulo: 'TIPO DE PAGO',
                        indices: [
                            { id: 'codigo', label: 'descripcion' }
                        ],
                        callback_f: _Evaluarcopagoestimfact_41
                    },
                        _EvaluarSER822A_41);
                }
            }
        }
    }
}

function _EvaluarSER822A_41(data) {
    switch (data.codigo) {
        case '1':
        case '2':
        case '3':
            if (SAL41.NITUSU == '0800074996') {
                var tipodepago = [
                    { codigo: '1', descripcion: 'EFECTIVO' },
                    { codigo: '2', descripcion: 'TARJ.CRED' },
                    { codigo: '3', descripcion: 'TARJ.DEBIT' }
                ];
                setTimeout(() => {
                    POPUP({
                        array: tipodepago,
                        titulo: 'FORMA DE PAGO',
                        indices: [
                            { id: 'codigo', label: 'descripcion' }
                        ],
                        callback_f: _Aceptartipocopago_41
                    },
                        _EvaluarCON820_41)
                }, 300);
            } else {
                _Aceptarespec_41();
            }
            break;
        default:
            _Datocopago_41();
            break;
    }
    $('#FORMACOPAGO_SAL41').removeClass('hidden');
    $('#fcopago_SAL41').val(data.codigo + ' - ' + data.descripcion);
}

function _EvaluarCON820_41(data) {
    switch (data.codigo) {
        case '1':
        case '2':
        case '3':
            _Aceptarespec_41();
            break;
        default:
            _Aceptartipocopago_41();
            break;
    }
    $('#TIPOCOPAGO_SAL41').removeClass('hidden')
    data.codigo = '1' ? SAL41.FPAGOFACT = '1' : SAL41.FPAGOFACT = SAL41.FPAGOFACT;
    data.codigo = '2' ? SAL41.FPAGOFACT = '95' : SAL41.FPAGOFACT = SAL41.FPAGOFACT;
    data.codigo = '3' ? SAL41.FPAGOFACT = '96' : SAL41.FPAGOFACT = SAL41.FPAGOFACT;
    $('#tcopago_SAL41').val(SAL41.FPAGOFACT + ' - ' + data.descripcion);
}

function _Aceptarespec_41() {
    if ((($_PREFIJOFACT == 'C') || ($_PREFIJOFACT == 'E')) && (SAL41.ESPECLAB.trim() == '')) {
        SAL41.ESPECLAB = '385';
    }
    // AGREGAR QUE SEA EL PRIMER ARTFACT
    if ((SAL41.NITUSU == '0800162035') && ($_CLFACT == '7') && ($_CODTAR == 'PE') && (($_ARTFACT == '903841') || ($_ARTFACT == '903815') || ($_ARTFACT == '903816') || ($_ARTFACT == '903818'))) {
        CON851('3S', '3S', null, 'warning', 'Advertencia!');
    }
    if ((SAL41.NITUSU == '0800162035') && ($_CLFACT == '7') && ($_CODTAR == 'PE') && ($_ARTFACT == '903841')) {
        CON851('3S', '3S', null, 'warning', 'Advertencia!');
    }
    if ((SAL41.ESPECLAB.trim() == '') && ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0900019291') || (SAL41.NITUSU == '0900193162'))) {
        SAL41.ESPECLAB = '602';
    }
    if ((SAL41.NITUSU == '0845000038') && ($_TIPODRFACT == '1') && ($_COPAGOESTIMFACT > $_VALORBRUTO)) {
        CON851('11', '11', null, 'error', 'Error');
        _Aceptarcodigo_41();
    } else {
        _Evaluarespeclab_41();
    }
}

function _Evaluarespeclab_41() {
    validarInputs({
        form: '#ESPEC_41',
        orden: '1',
        event_f5: _toggleNav
    },
        function () {
            if ($('#TABLA_401 tbody tr').length > 0) {
                SAL41.CONTEO = SAL41.CONTEO - 1;
                $('#TABLA_401 tbody tr').eq($('#TABLA_401 tbody tr').length - 1).remove()
                _Evaluarcodservicio2_41();
            } else {
                _Evaluarcodservicio2_41();
            }
        },
        _Leerespec_41
    )
}

function _Leerespec_41() {
    SAL41.ESPECLAB = $('#espec_SAL41').val();
    SolicitarDll({ datosh: datosEnvio() + '|' + SAL41.ESPECLAB.padStart(3, '0') + '|' + $('#TABLA_401 tbody tr:eq(0)')[0].cells[1].textContent + '|' }, _dataSAL41_08, get_url('APP/SALUD/SAL41-08.DLL'));
}

function _dataSAL41_08(data) {
    console.debug(data, 'SAL41-08');
    data = data.split('|');
    $_NOMBREESP = data[1].trim();
    $_INICESP = $_NOMBREESP.substring(0, 1);
    $_COSTOESP = data[2].trim();
    $('#despec_SAL41').val($_NOMBREESP);
    if (data[0].trim() == '00') {
        if ($_INICESP == '*') {
            $('#despec_SAL41').val('ESPECIALIDAD DESCTIVADA');
            CON851('13', '13', null, 'error', 'Error');
            _Evaluarespeclab_41();
        } else {
            if ($_COSTOESP.trim() == '') {
                $('#ccostos_SAL41').val('0000');
                _Evaluarcostofact_41();
            } else {
                $('#ccostos_SAL41').val($_COSTOESP.padStart(4, '0'));
                _Evaluarcostofact_41();
            }
        }
    } else if (data[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#espec_SAL41').val('');
        _Evaluarespeclab_41();
    } else if (data[0].trim() == '3D') {
        CON851('3D', '3D', null, 'error', 'Error');
        $('#espec_SAL41').val('');
        _Evaluarespeclab_41();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _Evaluarcostofact_41() {
    validarInputs({
        form: '#CCOSTOS_41',
        orden: '1',
        event_f5: _toggleNav
    },
        _Evaluarespeclab_41,
        _Leercosto_41
    )
}

function _Leercosto_41() {
    $_COSTOFACT = $('#ccostos_SAL41').val();
    if ($_COSTOFACT.trim() == '') {
        $_COSTOFACT = '0000';
        $('#ccostos_SAL41').val($_COSTOFACT);
    }
    SolicitarDll({ datosh: datosEnvio() + '|' + $_COSTOFACT.padStart(4, '0') + '|' }, _dataSAL41_09, get_url('APP/SALUD/SAL41-09.DLL'));

}

function _dataSAL41_09(data) {
    console.debug(data, 'SAL41-09');
    data = data.split('|');
    $_NOMBRECOSTO = data[1].trim();
    if (data[0].trim() == '00') {
        $('#dccostos_SAL41').val($_NOMBRECOSTO);
        if ((SAL41.NITUSU == '0844003225') && ($_COSTOFACT == '0000')) {
            CON851('03', '03', null, 'error', 'Error');
            $('#ccostos_41').val('');
            _Evaluarcostofact_41();
        } else if (((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162')) && ($_COSTOFACT == 'HX')) {
            _Ventanacama_41();
        } else {
            _Detalle_41();
        }
    } else if (data[0].trim() == '01') {
        CON851('02', '02', null, 'error', 'Error');
        $('#ccostos_SAL41').val('');
        _Datocccosto_41();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _Ventanacama_41() {
    fuente = '<div class="col-md-12" id="CAMARXFACT_41"> ' +
        '<input id="camarxfact_SAL41" class="form-control input-md" data-orden="1" maxlength="15"> ' +
        '</div>';
    _ventana({
        source: fuente,
        title: 'CAMA DEL PACIENTE',
        size: 'small',
        espace: false,
        focus: '#camarxfact_SAL41',
        form: '#CAMARXFACT_41',
        order: '1',
        global1: '$_CAMARXFACT',
        inputglobal1: '#camarxfact_SAL41',
    }, _Datocama_41, _Datocccosto_41);
}

function _Datocama_41() {
    setTimeout(_Detalle_41, 300);
}

function _Detalle_41() {
    var fuente = '<div class="col-md-12" id="DETALLE_41"> ' +
        '<input id="detallefactura_SAL41" class="form-control input-md" data-orden="1" maxlength="40"> ' +
        '</div>';
    var ventanadetallefactura = bootbox.dialog({
        size: 'medium',
        title: 'DETALLE FACTURA',
        closeButton: false,
        message: '<div class="row" style="display:float!important">' +
            '<div class="col-md-12 col-sm-12 col-xs-12">' +
            fuente +
            '</div>' +
            '</div>',
        buttons: {
            aceptar: {
                label: 'Aceptar',
                callback: function () {
                    ventanadetallefactura.off('shown.bs.modal');
                    _Datodiagnosticos_41();
                },
                className: 'btn-primary'
            },
            cancelar: {
                label: 'Cancelar',
                callback: function () {
                    ventanadetallefactura.off('shown.bs.modal');
                    _Aceptarespec_41();
                },
                className: 'btn-danger'
            }
        },

    });
    ventanadetallefactura.init($('.modal-footer').hide());
    ventanadetallefactura.on('shown.bs.modal', function () {
        $('#detallefactura_SAL41').focus();
    });
    _Evaluardetalle_41();
}

function _Evaluardetalle_41() {
    console.log('detalle de factura')
    $_DETALLEFACT.length > 1 ? $('#detallefactura_SAL41').val($_DETALLEFACT) : $('#detallefactura_SAL41').val('');
    validarInputs({
        form: '#DETALLE_41',
        orden: '1',
        event_f5: _toggleNav
    },
        function () { $('.btn-danger').click() },
        _Validardetalle_41
    );
}

function _Validardetalle_41() {
    console.log('validar detalle de factura');
    $_DETALLEFACT = $('#detallefactura_SAL41').val();
    if (SAL41.NITUSU == '0800251482') {
        $('.modal-body .row').append('<div class="salto-linea"></div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12"' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-4">Detalle</label>' +
            '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="DETALLE2_41">' +
            '<input id="detalle2_SAL41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="5" data-orden="1">' +
            '</div>' +
            '</div>' +
            '</div>');
        _Evaluardetalle2_41();
    } else {
        _Aceptarautorizacion_41();
    }
}

function _Evaluardetalle2_41() {
    console.log('evaluardetalle2')
    validarInputs({
        form: 'DETALLE_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        () => {
            $_DETALLE2W = $('#detalle2_SAL41').val();
            SAL41.RECIBIDORX = $_DETALLE2W;
            if (SAL41.NITUSU == '0800162035') {
                _Aceptarautorizacion_41();
            } else {
                if (parseInt($_NROCAPITNUM) > 0) {
                    $_NROAUTORELAB = '  ';
                    if ((SAL41.NITUSU == '0830512772') || (SAL41.NITUSU == '0844002258') || (SAL41.NITUSU == '0900565371') || (SAL41.NITUSU == '0900471031') || (SAL41.NITUSU == '0901120152')) {
                        _Aceptarautorizacion_41();
                    } else {
                        _Datopaqintegral_41();
                    }
                } else {
                    _Aceptarautorizacion_41();
                }
            }
        }
    );
}

function _Aceptarautorizacion_41() {
    console.log('aceptar autorizacion')
    $('.modal-body .row').append('<div class="salto-linea"></div>' +
        '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">AUTORIZACION EPS</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="AUTORIZACION_41">' +
        '<input id="autorizacion_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="1">' +
        '</div>' +
        '</div>' +
        '</div>');
    _Evaluarautorizacion_41();
}

function _Evaluarautorizacion_41() {
    if ($_PREFIJOFACT == 'C' || $_PREFIJOFACT == 'E') $_NROAUTORINUM = ''
    $('#autorizacion_SAL41').val($_NROAUTORINUM);
    $_NROAUTORELAB.length > 1 ? $('#autorizacion_SAL41').val($_NROAUTORELAB) : $('#autorizacion_SAL41').val('');
    validarInputs({
        form: '#AUTORIZACION_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        _Aceptarautorizacion2_41
    );
}

function _Aceptarautorizacion2_41() {
    console.debug('aceptarautorizacion 2');
    $_NROAUTORELAB = $('#autorizacion_SAL41').val();
    if ((SAL41.NITUSU == '0900405505') || (SAL41.NITUSU == '0900005594') || (SAL41.NITUSU == '019233740')) {
        _Aceptarautorizacion3_41();
    } else {
        if (($_NROAUTORELAB.trim() == '') && (parseInt($_NITFACT) > 9999) && ($_UNSERW == '02')) {
            CON851('02', '02', null, 'error', 'Error');
            if (($_CLFACT == '5') && (($_ACTTER == '55') || ($_ACTTER == '21') || ($_ACTTER == '22') || ($_ACTTER == '23'))) {
                _Evaluarautorizacion_41();
            } else {
                _Aceptarautorizacion3_41();
            }
        } else {
            _Aceptarautorizacion3_41();
        }
    }
}

function _Aceptarautorizacion3_41() {
    console.debug('aceptarautorizacion3')
    if (($_NROAUTORELAB.trim() == '') && ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0900193162'))) {
        CON851('02', '02', null, 'error', 'Error');
        _Evaluarautorizacion_41();
    } else if (SAL41.NITUSU == '0900405505') {
        $_NROAUTOREDIT = $_NROAUTORINUM
        if ($_NROAUTOREDIT.trim() == '') {
            $('.btn-primary').click();
            // _Datodiagnosticos_41();
        } else {
            if (($_PREFAUTORELAB == '.') || ($_PREFAUTORELAB == '*') || ($_PREFAUTORELAB == '!') || ($_PREFAUTORELAB == ' ') || ($_PREFAUTORELAB == '$') || ($_PREFAUTORELAB == '%') || ($_PREFAUTORELAB == '&') || ($_PREFAUTORELAB == '/') || ($_PREFAUTORELAB == '(') || ($_PREFAUTORELAB == ')') || ($_PREFAUTORELAB == '=') || ($_PREFAUTORELAB == 'A') || ($_PREFAUTORELAB == 'B') || ($_PREFAUTORELAB == 'C') || ($_PREFAUTORELAB == 'D') || ($_PREFAUTORELAB == 'E') || ($_PREFAUTORELAB == 'F') || ($_PREFAUTORELAB == 'G') || ($_PREFAUTORELAB == 'H') || ($_PREFAUTORELAB == 'I') || ($_PREFAUTORELAB == 'J') || ($_PREFAUTORELAB == 'K') || ($_PREFAUTORELAB == 'L') || ($_PREFAUTORELAB == 'M') || ($_PREFAUTORELAB == 'N') || ($_PREFAUTORELAB == 'O') || ($_PREFAUTORELAB == 'P') || ($_PREFAUTORELAB == 'Q') || ($_PREFAUTORELAB == 'R') || ($_PREFAUTORELAB == 'S') || ($_PREFAUTORELAB == 'T') || ($_PREFAUTORELAB == 'W') || ($_PREFAUTORELAB == 'X') || ($_PREFAUTORELAB == 'Y') || ($_PREFAUTORELAB == 'Z') || ($_PREFAUTORELAB == 'a') || ($_PREFAUTORELAB == 'b') || ($_PREFAUTORELAB == 'c') || ($_PREFAUTORELAB == 'd') || ($_PREFAUTORELAB == 'e') || ($_PREFAUTORELAB == 'f') || ($_PREFAUTORELAB == 'g') || ($_PREFAUTORELAB == 'h') || ($_PREFAUTORELAB == 'i') || ($_PREFAUTORELAB == 'j') || ($_PREFAUTORELAB == 'k') || ($_PREFAUTORELAB == 'l') || ($_PREFAUTORELAB == 'm') || ($_PREFAUTORELAB == 'n') || ($_PREFAUTORELAB == 'o') || ($_PREFAUTORELAB == 'p') || ($_PREFAUTORELAB == 'q') || ($_PREFAUTORELAB == 'r') || ($_PREFAUTORELAB == 's') || ($_PREFAUTORELAB == 't') || ($_PREFAUTORELAB == 'w') || ($_PREFAUTORELAB == 'x') || ($_PREFAUTORELAB == 'y') || ($_PREFAUTORELAB == 'z')) {
                CON851('02', '02', null, 'error', 'Error');
                _Detalle_41();
            } else {
                if ($_EPSPACI == 'EPS037') {
                    $_NROAUTOREDIT3 = $_NROAUTORELAB;
                    // HACER CON MAS TIEMPO EVALUAR-AUTORIZACION
                    if ($_SWCAMPERR > 0) {
                        CON851('02', '02', null, 'error', 'Error');
                        _Detalle_41();
                    } else {
                        $('.btn-primary').click();
                        // _Datodiagnosticos_41();
                    }
                }
                $_NROAUTOREDIT2 = $_NROAUTORELAB;
                if ($_NROAUTOREDIT2 < $_NROAUTOREDIT) {
                    CON851('02', '02', null, 'error', 'Error');
                    _Detalle_41();
                } else {
                    $('.btn-primary').click();
                    // _Datodiagnosticos_41();
                }
            }
        }

    } else {
        $('.btn-primary').click();
        // _Datodiagnosticos_41();
    }
}

function _Datodiagnosticos_41() {
    console.debug('datodiagnostico');
    if ((SAL41.NITUSU == '0830512772' || SAL41.NITUSU == '0900264583' || SAL41.NITUSU == '0800037021') && (SAL41.UNSERW == '02' || SAL41.UNSERW == '08')) {
        setTimeout(_Ventanadiagnostico_41, 200);
    } else {
        _Datopaqintegral_41();
    }
}

function _Ventanadiagnostico_41() {
    if ((SAL41.NITUSU == '0830512772') || (SAL41.NITUSU == '0900264583')) {
        var fuente = '<div class="col-md-12 col-sm-12 col-xs-12"' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-4">DIAG 1:</label>' +
            '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="DIAG1_41">' +
            '<input id="diag1_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="3" data-orden="1">' +
            '</div>' +
            '</div>' +
            '<div class="salto-linea"></div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12"' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-4">DIAG 2:</label>' +
            '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="DIAG2_41">' +
            '<input id="diag2_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="3" data-orden="1">' +
            '</div>' +
            '</div>' +
            '<div class="salto-linea"></div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12"' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-4">DIAG 3:</label>' +
            '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="DIAG3_41">' +
            '<input id="diag3_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="3" data-orden="1">' +
            '</div>' +
            '</div>';
        var ventanadetalle = bootbox.dialog({
            size: 'medium',
            title: 'DIAGNOSTICOS',
            closeButton: false,
            message: '<div class="row" style="display:float!important">' +
                fuente +
                '</div>',
            buttons: {
                aceptar: {
                    label: 'Aceptar',
                    callback: function () {
                        ventanadetalle.off('shown.bs.modal');
                        _Datodiagnosticos_41()
                    },
                    className: 'btn-primary'
                },
                cancelar: {
                    label: 'Cancelar',
                    callback: function () {
                        ventanadetalle.off('shown.bs.modal');
                        _Aceptarespec_41();
                    },
                    className: 'btn-danger'
                }
            },

        });
        ventanadetalle.init($('.modal-footer').hide());
        ventanadetalle.init(_inputControl('disabled'));
        ventanadetalle.on('shown.bs.modal', function () {
            $('#diag1_SAL41').focus();
        });
        _Evaluardiag1_41();
    } else {
        _Datopaqintegral_41();
    }
}

function _Evaluardiag1_41() {
    validarInputs({
        form: '#DIAG1_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        _Validardiag1_41
    );
}

function _Validardiag1_41() {
    $_DIAG1 = $('#diag1_SAL41').val();
    $_DIAG1 = $_DIAG1.padStart(3, '0');
    $_DIAG1 = '2' + $_DIAG1;
    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_DIAG1
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_101, get_url('APP/SALUD/SAL41-10.DLL'));
}

function _dataSAL41_101(data) {
    console.debug(data);
    var date = data.split('|');
    $_NOMBREDIAG1 = date[1].trim();
    if (date[0].trim() == '00') {
        _Evaluardiag2_41();
    } else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#diag1_SAL41').val('');
        _Evaluardiag1_41();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Evaluardiag2_41() {
    validarInputs({
        form: '#DIAG2_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        _Validardiag2_41
    );
}

function _Validardiag2_41() {
    $_DIAG2 = $('#diag2_SAL41').val();
    $_DIAG2 = $_DIAG2.padStart(3, '0');
    $_DIAG2 = '2' + $_DIAG2;
    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_DIAG2
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_102, get_url('APP/SALUD/SAL41-10.DLL'));
}

function _dataSAL41_102(data) {
    console.debug(data);
    $_NOMBREDIAG2 = date[1].trim();
    var date = data.split('|');
    if (date[0].trim() == '00') {
        _Evaluardiag3_41();
    } else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#diag2_SAL41').val('');
        _Evaluardiag2_41();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Evaluardiag3_41() {
    validarInputs({
        form: '#DIAG3_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        _Validardiag3_41
    );
}

function _Validardiag3_41() {
    $_DIAG3 = $('#diag3_SAL41').val();
    $_DIAG3 = $_DIAG3.padStart(3, '0');
    $_DIAG3 = '2' + $_DIAG3;
    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_DIAG3
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_103, get_url('APP/SALUD/SAL41-10.DLL'));
}

function _dataSAL41_103(data) {
    console.debug(data);
    $_NOMBREDIAG3 = date[1].trim();
    var date = data.split('|');
    if (date[0].trim() == '00') {
        _Datopaqintegral_41();
    } else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#diag2_SAL41').val('');
        _Evaluardiag3_41();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Datopaqintegral_41() {
    $_PRIMERARTFACT = $('#TABLA_401 tbody tr')[0].textContent;
    $_PRIMERARTFACT = $_PRIMERARTFACT.substring(0, 6);
    // $_LLAVETAB1 = $_CODTABW + $_TIPOTABW + $_PRIMERARTFACT.padEnd(10, ' ');
    if (($_CLFACT == '4') && (($_PRIMERARTFACT == 'XXDIFT') || ($_PRIMERARTFACT == 'XXDTOPA'))) {
        $('.modal-body .row').append('<div class="salto-linea"></div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12"' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-4">CUP CIRUGIA PAQ.</label>' +
            '<div class="input-group col-md-2 col-sm-3 col-xs-3" id="CUPCIRUGIA_41">' +
            '<input id="cupcirugia_SAL41" clasSs="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1">' +
            '</div>' +
            '<button type="button" id="cupcirugiaBtn_41" class="btn btn-default col-md-1 col-sm-1 col-xs-1"> <i class="icon-magnifier"></i></button>' +
            '<div class="input-group col-md-5 col-sm-4 col-xs-4">' +
            '<input id="dcupcirugia_SAL41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12">' +
            '</div>' +
            '</div>' +
            '</div>');
        _Evaluarcupcirugia_41();
    } else {
        _Cerrarventanadetalle_41();
    }
}

function _Evaluarcupcirugia_41() {
    validarInputs({
        form: '#CUPCIRUGIA_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        _Validarcupcirugia
    );
}

function _Validarcupcirugia() {
    SAL41.CUPPAQINTFACT = $('#cupcirugia_SAL41').val();
    if (SAL41.CUPPAQINTFACT.trim() == '') {
        // CONTINUE
    } else {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += SAL41.CUPPAQINTFACT.padEnd(13, ' ');
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_072, get_url("APP/SALUD/SAL41-07.DLL"));
    }
}

function _dataSAL41_072(data) {
    console.debug(data);
    var date = data.split('|');
    if (date[0].trim() == '00') {
        $('#dcupcirugia_SAL41').val(date[2].trim());
        _Cerrarventanadetalle_41();
    } else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#cupcirugia_SAL41').val('');
        _Evaluarcupcirugia_41();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav)
    }
}

function _Cerrarventanadetalle_41() {
    if ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162')) {
        $_PASOW = '0'
        if ($_NITFACT == '0860011153') {
            var causasestado = '[{"codigo": "1","descripcion": "ACCIDENTE DE TRABAJO"},{"codigo": "2", "descripcion": "ACCIDENTE DE TRANSITO"},{"codigo": "3", "descripcion": "ACCIDENTE RABICO"},{"codigo": "4", "descripcion": "ACCIDENTE OFIDICO"},{"codigo": "5", "descripcion": "OTRO TIPO DE ACCIDENTE"},{"codigo": "6", "descripcion": "EVENTO CATASTROFICO"},{"codigo": "7", "descripcion": "LESION POR AGRESION"},{"codigo": "8", "descripcion": "LESION AUTOINFLINGIDA"},{"codigo": "9", "descripcion": "SOSP.MALTRATO FISICO"},{"codigo": "A", "descripcion": "SOSP.ABUSO SEXUAL"},{"codigo": "B", "descripcion": "SOSP.MALTRATO EMOCIONAL"},{"codigo": "C", "descripcion": "ENFERMEDAD GENERAL"},{"codigo": "D", "descripcion": "ENFERMEDAD PROFESIONAL"},{"codigo": "E", "descripcion": "NO APLICA"}]';
            var causaestado = JSON.parse(causasestado);
            POPUP({
                array: causaestado,
                titulo: "Causa del Evento",
                indices: [
                    { id: 'codigo', label: 'descripcion' }
                ],
                callback_f: _Cerrarventanadetalle_41
            },
                _evaluarSER828_41);
        } else {
            _Datodiagntipo_41();
        }
    } else {
        _Fechaestancia_41();
    }
}

function _Datodiagntipo_41() {
    $('#CODIGODIAG_SAL41').removeClass('hidden');
    _inputControl('disabled');
    validarInputs({
        form: '#DIAGTIPO_41',
        orden: '1'
    },
        _Evaluarcodservicio2_41,
        _Validartipodiagntipo_SAL41
    );
}

function _Validartipodiagntipo_SAL41() {
    $_DIAG = $('#diagtipo_SAL41').val();
    $_DIAG = $_DIAG.padStart(4, '0');
    SolicitarDll({ datosh: datosEnvio() + SAL41.ADMINW + '|' + '2' + $_DIAG }, _dataSAL41_104, get_url('APP/SALUD/SAL41-10.DLL'));
}

function _dataSAL41_104(data) {
    console.debug(data, 'SAL41-10');
    data = data.split('|');
    if (data[0].trim() == '00') {
        $('#diagtipod_SAL41').val(data[1].trim());
        _Evaluarmedotrfact_41();
    } else if (data[0].trim() == '01') {
        CON851(data[0], data[0], null, 'error', 'Error');
        _Datodiagntipo_41();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}


function _evaluarSER828_41(data) {
    $_CAUSAESTAD = data.id;
    switch (data.id) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 'A':
        case 'B':
        case 'C':
        case 'D':
        case 'E':
        case 'G':
            _Datoacctransito_41();
            break;
    }
}

function _Datoacctransito_41() {
    var fuente = '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">Fecha del evento</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="FECHAE_41">' +
        '<input id="fechaevento_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="1">' +
        '</div>' +
        '</div>' +
        '<div class="salto-linea"></div>' +
        '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">Diagnostico</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="FECHAE_41">' +
        '<input id="diagnostico_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="2">' +
        '</div>' +
        '</div>' +
        '<div class="salto-linea"></div>' +
        '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">Nit empresa</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="NITE_41">' +
        '<input id="fechaegreso_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="1">' +
        '</div>' +
        '</div>' +
        '<div class="salto-linea"></div>' +
        '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">Nit empresa</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="NITE_41">' +
        '<input id="fechaegreso_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="2">' +
        '</div>' +
        '</div>';

    var ventanaevento = bootbox.dialog({
        size: 'medium',
        title: 'DATOS ACCIDENTE DE TRANSITO',
        closeButton: false,
        message: '<div class="row" style="display:float!important">' +
            fuente +
            '</div>',
        buttons: {
            aceptar: {
                label: 'Aceptar',
                callback: _Datommedico_41,
                className: 'btn-primary'
            },
            cancelar: {
                label: 'Cancelar',
                callback: _Detalle_41,
                className: 'btn-danger'
            }
        },

    });
    ventanaevento.init($('.modal-footer').hide());
    ventanaevento.init(_inputControl('disabled'));
    ventanaevento.on('shown.bs.modal', function () {
        $('#fechaingreso_SAL41').focus();
    });
    _EvaluarDatoacctransito_41();
}

function _EvaluarDatoacctransito_41() {
    validarInputs({
        form: '#FECHAE_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        _Validardatoacctransito_41
    );
}

function _Validardatoacctransito_41() {
    $_FECHAACCIDRIPS = $('#fechaevento_SAL41').val();
    $_CODDIAGESTAD = $('#diagnostico_SAL41').val();
}



function _Fechaestancia_41() {
    $_GRUPOFACT1 = $('#TABLA_401 tbody tr')[0].textContent;
    $_GRUPOFACT1 = $_PRIMERARTFACT.substring(1, 3);
    if ((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900541158') || (SAL41.NITUSU == '0900566047') || (SAL41.NITUSU == '0900658867') || (SAL41.NITUSU == '0900565371') || (SAL41.NITUSU == '0901120152')) {
        _Datommedico_41();
    } else if (($_GRUPOFACT1 == 'S1') || ($_GRUPOFACT1 == 'F5') || ($_GRUPOFACT1 == 'F8')) {
        _Fechaestancia2_41();
    } else {
        _Datommedico_41();
    }
}

function _Fechaestancia2_41() {
    var fuente = '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">FECHA DE INGRESO</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="FECHA_41">' +
        '<input id="fechaingreso_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="1">' +
        '</div>' +
        '</div>' +
        '<div class="salto-linea"></div>' +
        '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">FECHA DE EGRESO</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="FECHA_41">' +
        '<input id="fechaegreso_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="2">' +
        '</div>' +
        '</div>';
    var ventanafechaingreso = bootbox.dialog({
        size: 'medium',
        title: 'FECHA DE ESTANCIA',
        closeButton: false,
        message: '<div class="row" style="display:float!important">' +
            fuente +
            '</div>',
        buttons: {
            aceptar: {
                label: 'Aceptar',
                callback: function () {
                    ventanafechaingreso.off('shown.bs.modal');
                    _Datommedico_41();
                },
                className: 'btn-primary'
            },
            cancelar: {
                label: 'Cancelar',
                callback: function () {
                    ventanafechaingreso.off('shown.bs.modal');
                    setTimeout(_Detalle_41, 300);
                },
                className: 'btn-danger'
            }
        },

    });
    ventanafechaingreso.init($('.modal-footer').hide());
    ventanafechaingreso.init(_inputControl('disabled'));
    ventanafechaingreso.on('shown.bs.modal', function () {
        $('#fechaingreso_SAL41').focus();
    });
    _Evaluarfecha2_41();
}

function _Evaluarfecha2_41() {
    validarInputs({
        form: '#FECHA_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        _Validarfecha_41
    );
}

function _Validarfecha_41() {
    $_FECHAINGESTAD = $('#fechaingreso_SAL41').val();
    $_FECHASALESTAD = $('#fechaegreso_SAL41').val();
    $_FECHAINGESTAD = moment($_FECHAINGESTAD).format('YYYYMMDD');
    $_FECHASALESTAD = moment($_FECHASALESTAD).format('YYYYMMDD');
    if (($_FECHASALESTAD = $_FECHAINGESTADO) && (SAL41.HORAATENESTAD > $_HORASALIDESTAD)) {
        CON851('37', '37', null, 'error', 'Error');
        _Evaluarfecha2_41();
    } else {
        _Datommedico_41();
    }
}

function _Datommedico_41() {
    console.log('dato medico')
    if (($_CLFACT == '0') || ($_CLFACT == '1')) {
        SAL41.MEDOTRFACT = ' ';
        $('#atend_SAL41').val(SAL41.MEDOTRFACT);
        _Validarmedotrfact_41();
    } else {
        $_MEDCIRFACT = ' ';
        $_MEDAYUFACT = ' ';
        $_MEDANEFACT = ' ';
        $_MEDINSFACT = ' ';
        _Datommedico2_41();
    }
    $_TERCTL = '2';
}

function _Datommedico2_41() {
    console.log('dato medico 2');
    // if (($_UNSERVW == '01') && ($_CLFACT == '5') && ($_IDTRIA.trim() =! '') && ($_FOLIONROCONSULTRIA > 0)){

    // }
    _Evaluarmedotrfact_41();
}

function _Evaluarmedotrfact_41() {
    validarInputs({
        form: '#ATEND_41',
        orden: '1',
        event_f5: _toggleNav
    },
        function () {
            if ($('.btn-danger').length > 0) {
                $('.btn-danger').click();
            } else {
                setTimeout(_Detalle_41, 300);
            }
        },
        _Validarmedotrfact_41
    );
}

function _Validarmedotrfact_41() {
    console.log('validar medotrfact');
    SAL41.MEDOTRFACT = $('#atend_SAL41').val();
    if ((parseInt(SAL41.MEDOTRFACT) == 0) && (parseInt($_CLFACT) > 1)) {
        CON851('02', '02', null, 'error', 'Error');
        $('#atend_SAL41').val('')
        _Evaluarmedotrfact_41();
    } else if (parseInt(SAL41.MEDOTRFACT) == 0) {
        $_DESCRIPPROF = '  ';
        $_CLPROF1 = $_CLPROF2 = 'S';
        $_ESPPROF01 = ' ';
        $_ESTADOPROF = '1';
        $_ATIENDEW = '0';
    } else {
        let datos_envio = datosEnvio()
        datos_envio += SAL41.ADMINW + '|' + SAL41.MEDOTRFACT.padStart(10, '0');
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_11, get_url('APP/SALUD/SAL41-11.DLL'))
    }
}

function _dataSAL41_11(data) {
    console.debug(data);
    var date = data.split('|');
    $_DESCRIPPROF = date[1].trim();
    $_ESTADOPROF = date[2].trim();
    $_CLPROF = [date[3].trim(), date[4].trim(), date[5].trim(), date[6].trim(), date[7].trim(), date[8].trim(), date[9].trim()];
    $_ESPPROF = [date[10].trim(), date[11].trim(), date[12].trim(), date[13].trim(), date[14].trim(), date[15].trim(), date[16].trim(), date[17].trim(), date[18].trim(), date[19].trim()]
    $_DIVPROF = date[20].trim();
    $_ATIENDEPROF = date[21].trim();
    $_ATIENDEW = $_PERSONALELAB = $_ATIENDEPROF;
    $_REGMEDPROF = date[22].trim();
    if (date[0].trim() == '00') {
        _Validarmedotrfact2_41();
    } else if (date[0].trim() == '01') {
        $_CLPROF = $_TABLACLPROF = 'N';
        $_ESTADOPROF = '2';
        _Validarmedotrfact2_41();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Validarmedotrfact2_41() {
    $('#datend_SAL41').val($_DESCRIPPROF);
    if ($_ESTADOPROF == '2') {
        CON851('13', '13', null, 'error', 'Error');
        $('#datend_SAL41').val('PROFESIONAL DESACTIVADO');
        $('atend_SAL41').val('')
        _Evaluarmedotrfact_41();
    } else {
        _Validarmedotrfact3_41();
    }
}

function _Validarmedotrfact3_41() {
    $_GRUPOFACT1 = $('#TABLA_401 tbody tr')[0].textContent;
    $_GRUPOFACT1 = $_PRIMERARTFACT.substring(1, 3);
    switch ($_CLFACT) {
        case '0':
            $_J = 0
            break;
        case '1':
            $_J = 1
            break;
        case '2':
            $_J = 2
            break;
        case '3':
            $_J = 3
            break;
        case '4':
            $_J = 4
            break;
        case '5':
            $_J = 5
            break;
        case '6':
            $_J = 1
            break;
        case '7':
            $_J = 6
            break;
    }
    console.debug($_J, $_CLPROF[$_J], $_CLPROF);
    if ($_CLPROF[parseInt($_J)] == 'N') {
        CON851('82', '82', null, 'error', 'Error');
        $('atend_SAL41').val('')
        _Evaluarmedotrfact_41();
    } else if (($_ESPPROF[1].trim() == '') || ($_GRUPOFACT1 == '87') || ($_GRUPOFACT1 == '88') || ($_GRUPOFACT1 == '90') || ($_GRUPOFACT1 == '95')) {
        _Validarmedotrfact4_41();
    } else {
        if ((SAL41.ESPECLAB == $_ESPPROF[0]) || (SAL41.ESPECLAB == $_ESPPROF[1]) || (SAL41.ESPECLAB == $_ESPPROF[2]) || (SAL41.ESPECLAB == $_ESPPROF[3]) || (SAL41.ESPECLAB == $_ESPPROF[4])) {
            _Validarmedotrfact4_41();
        } else {
            console.debug('sino de evaluar med otr');
            if ((SAL41.NITUSU == '0830092718') && ($_SUCW == 'SC')) {
                $_SWINVALID = '0';
                _Validarmedotrfact4_41();
            } else {
                CON851('82', '82', null, 'error', 'Error');
                if ((SAL41.NITUSU == '0892000401') && ($_ESPPROF[1] == '999')) {
                    _Validarmedotrfact4_41();
                } else {
                    $('atend_SAL41').val('')
                    _Evaluarmedotrfact_41();
                }
            }
        }
    }
}

function _Validarmedotrfact4_41() {
    if ($_DIVPROF == '') {
        _Validarmedotrfact5_41();
    } else {
        _Validarmedotrfact5_41();
        // FUNCIONALIDAD PENDIENTE
    }
}

function _Validarmedotrfact5_41() {
    $_HORACITFACT.length > 1 ? $_HORACITFACT = $_HORACITFACT : $_HORACITFACT = '0000';
    if (($_CLFACT == '1') || ($_CLFACT == '4') || ($_CLFACT == '5') || ($_CLFACT == '7')) {
        if ($_CLFACT == '1') {
            $_MEDCITW = $_MEDCIRFACT;
        } else {
            $_MEDCITW = SAL41.MEDOTRFACT;
        }
        $_EVALUACIONCITW = 0;
        // SER891A_41();
    }
    if (($_CLFACT == '3') || ($_CLFACT == '5') || ($_CLFACT == '7')) {
        // console.debug('HABLAR CON DIANA PARA VER COPMO SE LEEN LOS ARCHIVOS DE LAS CITAS');
        // SER891AD_41();
    }
    if (($_HORACITFACT > 0) && (($_PREFIJOFACT = !'E') && ($_PREFIJOFACT = !'C'))) {
        if ((($_CLFACT == '1') || ($_CLFACT == '4') || ($_CLFACT == '5') || ($_CLFACT == '7')) && ($_EVALUACIONCITW == '1')) {
            if ($_LLAVENUM == $_FACTCAPITNUM) {
                _Evaluarremite_41();
            } else {
                if ((SAL41.NITUSU == '0900565371') || (SAL41.NITUSU == '0900081643') || (SAL41.NITUSU == '0901120152')) {
                    _Evaluarremite_41();
                } else {
                    CON851('7S', '7S', null, 'error', 'Error');
                    $('atend_SAL41').val('')
                    _Evaluarmedotrfact_41();
                }
            }
        }
    } else {
        if ((($_CLFACT == '1') || ($_CLFACT == '4') || ($_CLFACT == '5') || ($_CLFACT == '7')) && ($_EVALUACIONCITW == '1')) {
            // CON851P
            console.debug('CON851P');
        } else {
            _Evaluarremite_41();
        }
    }
}

function _Evaluarremite_41() {
    validarInputs({
        form: '#SOLIC_41',
        orden: '1'
    },
        _Evaluarmedotrfact_41,
        _Validarremite_41
    )
}

function _Validarremite_41() {
    $_REMITEFACT = $('#solic_SAL41').val();
    if (parseInt($_REMITEFACT) == 0 || $_REMITEFACT.trim() == '') {
        if (((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0900193162')) && (SAL41.PREFIJOUSU = !'SB')) {
            $_DESCRIPTER = '  ';
            _Claseproced_41();
        } else {
            if (($_CLFACT == '0') || ($_CLFACT == '2') || ($_CLFACT == '3')) {
                CON851('02', '02', null, 'error', 'Error');
                $('#solic_SAL41').val('');
                _Evaluarremite_41();
            } else {
                $_DESCRIPPROF2 = '  ';
                _Claseproced_41();
            }
        }
    } else {
        console.log('consulta dll');
        let datos_envio = datosEnvio();
        datos_envio += SAL41.ADMINW + '|' + $_REMITEFACT.padStart(10, '0');
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_043, get_url('APP/SALUD/SAL41-04.DLL'));
    }
}

function _dataSAL41_043(data) {
    console.debug(data);
    var date = data.split('|');
    $_DESCRIPTER = date[1].trim();
    $_ACTTER = date[2].trim();
    $_ENTIDADTER = date[3].trim();
    SAL41.CODCIUTER = data[7].trim();
    if (date[0].trim() == '00') {
        $('#dsolic_SAL41').val($_DESCRIPTER);
        if ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162')) {
            _Claseproced_41();
        } else {
            let datos_envio = datosEnvio();
            datos_envio += SAL41.ADMINW + '|' + $_REMITEFACT.padStart(10, '0');
            SolicitarDll({ datosh: datos_envio }, _dataSAL41_112, get_url('APP/SALUD/SAL41-11.DLL'));
        }
    } else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#solic_SAL41').val('');
        _Evaluarremite_41();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _dataSAL41_112(data) {
    console.debug(data);
    var date = data.split('|');
    $_DESCRIPPROF2 = date[1].trim();
    $_REGMEDPROF = date[22].trim();
    if (date[0].trim() == '00') {
        _Claseproced_41();
    } else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#solic_SAL41').val('');
        _Evaluarremite_41();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Claseproced_41() {
    if (($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'T')) {
        SAL41.CLASEPROCESTADO = '2';
    } else {
        if ($_PUERTAESTAD == '1') {
            SAL41.CLASEPROCESTADO = '3';
        } else {
            SAL41.CLASEPROCESTADO = '1';
        }
    }
    _Mostrarproced_41();
}

function _Mostrarproced_41() {
    let CLASEPROCESO = {
        '0': '       ',
        '1': 'ATENCION AMBULATOR',
        '2': 'ATENCION HOSPITAL',
        '3': 'EN URGENCIA'
    }
    CLASEPROCESO = CLASEPROCESO[SAL41.CLASEPROCESTADO];
    if (CLASEPROCESO) {
        $('#CLASEPROCE_SAL41').removeClass('hidden');
        $('#claseproce_SAL41').text(CLASEPROCESO);
    }
    if ($_CLFACT == '0') {
        $_DIAGNCUP1 = 'N';
        SAL41.TIPOPROCESTAD = '0';
        _Controlcapitacion_41();
    } else if (((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0900193162')) && (SAL41.PREFIJOUSU == 'SB')) {
        _Datoespecremite_41();
    } else {
        _Datocondicion_41();
    }
}

function _Datoespecremite_41() {
    $('#ESPECIALIDADREMITE_SAL41').removeClass('hidden');
    _inputControl('disabled');
    validarInputs({
        form: '#ESPECREMITE_41',
        orden: '1'
    },
        _Tipoproced_41,
        _Validarespecremite_SAL41
    )
}

function _Validarespecremite_SAL41() {
    $_ESPECREMIFACT = $('#especremite_SAL41').val();
    if ($_ESPECREMIFACT.trim() == '') {
        _Tipoproced_41();
    } else {
        SolicitarDll({ datosh: datosEnvio() + SAL41.ADMINW + '|' + $_ESPECREMIFACT.padStart(3, '0') + '|' }, _dataSAL41_081, get_url('APP/SALUD/SAL41-08.DLL'));
    }
}

function _dataSAL41_081(data) {
    console.debug(data, 'SAL41-08 2');
    data = data.split('|');
    if (data[0].trim() == '00') {
        $('#especremited_SAL41').val(data[1]);
        _Aceptarpersonal_41();
    } else if (data[0].trim() == '01') {
        $('#especremited_SAL41').val('');
        CON851(data[0], data[0], null, 'error', 'Error');
        _Datoespecremite_41();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _Datocondicion_41() {
    if (($_SEXOPACI == 'M') || ($_CLFACT == '0')) {
        $_EMBARESTAD = '0';
        _Leercondic_41();
    } else {
        if (((SAL41.EDAD.unid_edad == 'D') || (SAL41.EDAD.unid_edad == 'M')) || ((SAL41.EDAD.unid_edad == 'A') && (parseInt(SAL41.EDAD.vlr_edad) < 10))) {
            $_EMBARESTAD = '4'
            _Leercondic_41();
        } else {
            var estadousuaria = [
                { codigo: '1', descripcion: 'EMABARAZO PRIMER TRIMESTRE' },
                { codigo: '2', descripcion: 'EMABARAZO SEGUNDO TRIMESTRE' },
                { codigo: '3', descripcion: 'EMABARAZO TERCER TRIMESTRE' },
                { codigo: '4', descripcion: 'NO ESTA EMBARAZADA' },
                { codigo: '8', descripcion: 'NO APLICA' },
            ]
            POPUP({
                array: estadousuaria,
                titulo: 'Condicion usuaria',
                indices: [
                    { id: 'codigo', label: 'descripcion' }
                ],
                callback_f: _Datocondicion_41
            },
                _evaluarSER826_41);
        }
    }
}

function _evaluarSER826_41(data) {
    $_EMBARESTAD = data.codigo;
    _Leercondic_41();
}

function _Leercondic_41() {
    let EMBARAZO = {
        '0': 'NO APLICA',
        '1': '1ER TRIM. EMBARAZO',
        '2': '2DO TRIM. EMBARAZO',
        '3': '3ER TRIM. EMBARAZO',
        '4': 'NO ESTA EMBARAZADA',
        '8': 'NO APLICA',
    }
    EMBARAZO = EMBARAZO[$_EMBARESTAD];
    if (EMBARAZO) {
        $('#EMBARAZO_SAL41').removeClass('hidden');
        $('#embarestado_SAL41').text(EMBARAZO);
        _Leercondic2_41()
    } else {
        _Detalle_41();
    }
}

function _Leercondic2_41() {
    if ($_CLFACT == '7') {
        setTimeout(_Tipoproced_41, 300);
    } else {
        if ($_DIAGNCUP1 == 'S') {
            SAL41.TIPOPROCESTAD = '0';
            _Controlcapitacion_41();
        } else {
            setTimeout(_Tipoproced_41, 300);
        }
    }
}

function _Tipoproced_41() {
    var tipoprocedimiento = [
        { codigo: '1', descripcion: 'DIAGNOSTICO' },
        { codigo: '2', descripcion: 'TERAPEUTICO' },
        { codigo: '3', descripcion: 'PROTEC.ESPEXIFICA' },
        { codigo: '4', descripcion: 'DETECCION TEMPRANA ENF.GENER' },
        { codigo: '9', descripcion: 'NO APLICA' }
    ]
    POPUP({
        array: tipoprocedimiento,
        titulo: 'Tipo procedimiento',
        indices: [
            { label: 'descripcion' }
        ],
        callback_f: _Evaluarremite_41
    },
        _evaluarSER829_41);
}

function _evaluarSER829_41(data) {
    SAL41.TIPOPROCESTAD = data.codigo;
    console.debug(data.codigo, data)
    console.debug(SAL41.TIPOPROCCUP.length, SAL41.TIPOPROCCUP.trim());
    if ((SAL41.TIPOPROCCUP.trim() == '') || (SAL41.TIPOPROCCUP == '0') || (SAL41.TIPOPROCCUP == ' ')) {
        _Tipoproced2_41();
    } else {
        if (SAL41.TIPOPROCCUP != SAL41.TIPOPROCESTAD) {
            CON851('3D', '3D', null, 'error', 'Error');
            setTimeout(_Tipoproced_41, 200);
        } else {
            _Tipoproced2_41();
        }
    }
}

function _Tipoproced2_41() {
    let TIPOPROCESTAD = {
        '1': 'DIAGNOSTICO',
        '2': 'TERAPEUTICO',
        '3': 'PROTEC. ESPECIFICA',
        '4': 'DETECCION TEMPRANA',
        '9': 'NO APLICA'
    };
    if (TIPOPROCESTAD) {
        $('#TIPOPROCEDIMIENTO_SAL41').removeClass('hidden');
        $('#tipoprocedimiento_SAL41').text(TIPOPROCESTAD[SAL41.TIPOPROCESTAD]);
        _Aceptarpersonal_41();
    } else {
        _Detalle_41();
    }
}

function _Aceptarpersonal_41() {
    if (($_CLFACT == '2') || ($_CLFACT == '3')) {
        $_PERSONALELAB = '9';
        _Leerpersonal_41();
    } else {
        _Datofinalidconsulta_41()
    }
}

function _Leerpersonal_41() {
    if (($_ATIENDEESPCUP1.trim() == '') || ($_ATIENDEESPCUP1 == '9')) {
        _Datofinalidconsulta_41();
    } else {
        if ($_PERSONALELAB != $_ATIENDEESPCUP1) {
            CON851('3E', '3E', null, 'error', 'Error');
            setTimeout(_Detalle_41, 200);
        } else {
            _Datofinalidconsulta_41();
        }
    }
}

function _Datofinalidconsulta_41() {
    console.debug('datofonalidadconsulta')
    if ($_CLFACT == '7') {
        _Datofinalidconsulta2_41();
    } else {
        SAL41.FINALIDESTAD = '10';
        _Controlcapitacion_41();
    }
}

function _Datofinalidconsulta2_41() {
    if ((SAL41.NITUSU == '0800162035') && ($_FINALANTW.trim() = !'')) {
        SAL41.FINALIDESTAD = $_FINALANTW;
    }
    // setTimeout(_SER834A, 300);
    setTimeout(() => { SAL41.DATOSFINALIDAD = datos_finalidad(SAL41.NITUSU, $_SEXOPACI, SAL41.EDAD); _datosfinalidad_SAL41() }, 300);
}

function _datosfinalidad_SAL41() {
    POPUP({
        array: SAL41.DATOSFINALIDAD,
        titulo: "Dato Finalidad:",
        indices: [
            { label: 'descripcion' }
        ],
        callback_f: _Evaluarremite_41
    },
        data => {
            console.log(data);
            // SAL97C11.FINALIDADW = data.codigo;
            // $('#finalidad_97C11').val(data.codigo + ' - ' + data.descripcion);
            SAL41.FINALIDESTAD = data.codigo;
            switch (data.codigo) {
                case '01':
                    $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                        '</div>' +
                        '</div>');
                    _Datofinalidconsulta3_41();
                    break;
                case '02':
                    $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                        '</div>' +
                        '</div>');
                    _Datofinalidconsulta3_41();
                    break;
                case '03':
                    $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                        '</div>' +
                        '</div>');
                    _Datofinalidconsulta3_41();
                    break;
                case '04':
                    $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                        '</div>' +
                        '</div>');
                    _Datofinalidconsulta3_41();
                    break;
                case '05':
                    $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                        '</div>' +
                        '</div>');
                    _Datofinalidconsulta3_41();
                    break;
                case '06':
                    $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                        '</div>' +
                        '</div>');
                    break;
                case '07':
                    $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                        '</div>' +
                        '</div>');
                    _Datofinalidconsulta3_41();
                    break;
                case '08':
                    $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                        '</div>' +
                        '</div>');
                    _Datofinalidconsulta3_41();
                    break;
                case '09':
                    $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                        '</div>' +
                        '</div>');
                    _Datofinalidconsulta3_41();
                    break;
                case '10':
                    $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                        '</div>' +
                        '</div>');
                    _Datofinalidconsulta3_41();
                    break;
                case '11':
                    $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                        '</div>' +
                        '</div>');
                    _Datofinalidconsulta3_41();
                    break;
                default:
                    setTimeout(_Datofinalidconsulta_41, 200);
                    break;
            }
        });
}

function _Datofinalidconsulta3_41() {
    if ((SAL41.NITUSU == '0900306771') && ($_GRUPOFACT1 == '89')) {
        if ($_FINALIDCIT != SAL41.FINALIDESTAD) {
            CON851('4K', '4K', null, 'warning', 'Advertencia!');
            _Datofinalidadconsulta4_41();
        }
    }
    if (SAL41.FINALIDESTAD == '10') {
        if ((SAL41.NITUSU == '0845000038') && (SAL41.NITUSU == '0900405505')) {
            CON851('4K', '4K', null, 'warning', 'Advertencia!');
        }
    }
    if ((SAL41.FINALIDADCUP.trim() == '') || (SAL41.FINALIDADCUP == '0') || (SAL41.FINALIDADCUP == '10')) {
        _Datocronico_41();
    } else {
        if (SAL41.FINALIDADCUP != SAL41.FINALIDESTAD) {
            CON851('3D', '3D', null, 'error', 'Error');
            setTimeout(_Datofinalidconsulta_41, 200);
        } else {
            _Datocronico_41();
        }
    }
}

function _Datocronico_41() {
    $('#CRONICO_SAL41').removeClass('hidden')
    if (SAL41.FINALIDESTAD == '11') {
        validarInputs({
            form: '#CRONICO_41',
            orden: '1'
        },
            _Datofinalidconsulta_41,
            _Datocronico2_41
        )
    } else {
        SAL41.CRONICOFACT = ' '
        $('#cronico_SAL41').val(SAL41.CRONICOFACT);
        _Datocronico2_41();
    }
}

function _Datocronico2_41() {
    SAL41.CRONICOFACT = $('#cronico_SAL41').val();
    if (SAL41.CRONICOFACT.trim() == '') {
        $_DESCRIPCRONIC = ' ';
        _Controlcapitacion_41();
    } else {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += SAL41.CRONICOFACT.padStart(3, '0');
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_12, get_url('APP/SALUD/SAL41-12.DLL'));
    }
}

function _dataSAL41_12(data) {
    console.debug(data);
    var date = data.split('|');
    $_DESCRIPCRONIC = date[1].trim();
    if (date[0].trim() == '00') {
        $('#dcronico_SAL41').val($_DESCRIPCRONIC);
        _Controlcapitacion_41();
    } else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#cronico_SAL41').val('');
        validarInputs({
            form: '#CRONICO_41',
            orden: '1'
        },
            function () { _Datofinalidconsulta_41() },
            _Datocronico2_41
        );
    } else {
        CON852(date[0], date[1], date[2], _toggleNav)
    }

}

function _Controlcapitacion_41() {
    if ((SAL41.NITUSU == '0891855847') && ($_CLFACT == '0')) {
        _Controlcapitacion2_41();
    } else {
        $_CONTROLCAPESTAD = ' ';
        _Confirmargrabar_41();
    }
}

function _Controlcapitacion2_41() {
    validarInputs({
        form: '#CAP_41',
        orden: '1'
    },
        function () { _Datofinalidconsulta_41() },
        _Validarcapitacion_41
    )
}

function _Validarcapitacion_41() {
    $_CONTROLCAPESTAD = $('#cap_SAL41').val();
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_CONTROLCAPESTAD.padStart(2, '0');
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_13, get_url('APP/SALUD/SAL41-13'));
}

function _dataSAL41_13(data) {
    console.debug(data);
    var date = data.split('|');
    $_DESCRIPGRCAP = date[1].trim();
    $_CLASEGRCAP = [date[2].trim(), date[3].trim(), date[4].trim(), date[5].trim(), date[6].trim(), date[7].trim(), date[8].trim(), date[9].trim(), date[10].trim()]
    if (date[0].trim() == '00') {
        $('#dcap_SAL41').val($_DESCRIPGRCAP);
        if ($_CLFACT == '0') {
            $_J = 8;
        } else {
            $_J = parseInt($_CLFACT);
        }
        _Controlcapitacion3_41();
    } else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#cap_SAL41').val('');
        _Controlcapitacion2_41();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav)
    }
}

function _Controlcapitacion3_41() {
    if ($_CLASEGRCAP[$_J] == 'N') {
        CON851('03', '04', null, 'error', 'Error');
        $('#cap_SAL41').val('');
        _Controlcapitacion2_41();
    } else {
        _Confirmargrabar_41();
    }
}

function _Confirmargrabar_41() {
    let fecha = moment().format('YY/MM/DD HH:mm:ss:ms');
    let nombretxt = SAL41.ADMINW + '_' + fecha.substring(0, 2) + fecha.substring(3, 5) + fecha.substring(6, 8) + fecha.substring(9, 11) + fecha.substring(12, 14) + fecha.substring(15, 17) + fecha.substring(18, 20);
    if (SAL41.OPCIONACTIVA == '09426'){
        for (var i in $TABLAFACT){
            $TABLAFACT[i].VALOR_FACT = $TABLAFACT[i].VALOR_FACT.replace(/,/g,'');
            $TABLAFACT[i].VALOR_UNIT = $TABLAFACT[i].VALOR_UNIT.replace(/,/g,'');
            $TABLAFACT[i].CANTIDAD = parseFloat($TABLAFACT[i].CANTIDAD).toString();
        }
    }
    SAL41['NOMBRETXT'] = nombretxt;
    let datosEnvio = {
        nombre_archivo: nombretxt,
        tabla: $TABLAFACT,
    };
    $.ajax({
        data: datosEnvio,
        type: 'POST',
        async: false,
        url: get_url('app/Inc/_datostabla_SAL41.php')
    }).done(function (data) {
        console.debug(data);
        if (data == '00') {
            if (SAL41.OPCIONACTIVA == '09426') {
                CON851P('01', _Cancelar_41, _Confirmargrabar_450);
            } else {
                CON851P('01', _Cancelar_41, _Confirmargrabar2_41);
            }
        } else {
            console.debug('problemas para crear el txt');
        }
    });
}
//////////////////////GRABAR INV450/////////////////////////////
function _Confirmargrabar_450() {
    if (($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'T') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'U') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) {
        let URL = get_url("APP/SALUD/SAL030A.DLL");
        postData({ datosh: datosEnvio() + SAL41.LLAVEFACT + '|' }, URL)
            .then(data => {
                console.debug(data);
                if ($_MESFACT == $_MESW) {
                    _validacionesgrabar_450();
                } else {
                    $_CTRLMESFACT = '1';
                    _validacionesgrabar_450();
                }

            })
            .catch(err => {
                console.error(err);
            });

    } else if ((($_PREFIJOFACT == 'E') || ($_PREFIJOFACT == 'C')) && ($_PREFIJOFACT != $_PREFIJOW)) {
        $_SECUNUM = 96;
        $_NROOTRW = ULTNRONUM;
        let fecha = $_FECHAFACT.split('-');
        let URL = get_url("APP/CONTAB/CON007.DLL");
        postData({ datosh: datosEnvio() + $_SECUNUM + '|' + fecha[0].substring(2, 4) + fecha[1] + fecha[2] + '|' + ULTNRONUM }, URL)
            .then(data => {
                console.debug(data);
                var data = data.split("|");
                SAL41.NUMEROCTL4 = data[1].substring(3, 9);
                SAL41.ULTFECHANUM4 = data[2].trim();
                $_NROCTAFACT = SAL41.NUMEROCTL4;
                if ($_MESFACT == $_MESW) {
                    _validacionesgrabar_450();
                } else {
                    $_CTRLMESFACT = '1';
                    _validacionesgrabar_450();
                }
            })
            .catch(err => {
                console.debug(err);
                CON852(data[0], data[1], data[2], _toggleNav);
            })
    } else {
        if ($_MESFACT == $_MESW) {
            _validacionesgrabar_450();
        } else {
            $_CTRLMESFACT = '1';
            _validacionesgrabar_450();
        }
    }
}

function _validacionesgrabar_450() {
    $_FECHACORRECFACT = moment().format('YYYYMMDD');
    $_HORAELABFACT = SAL41.FACTURA.HORA_ELAB;
    $_FECHAELABFACT = SAL41.FACTURA.FECHA;
    $_OPERELABFACT = SAL41.ADMINW;
    SAL41.LLAVEFACT = $_SUCFACT + $_CLFACT + SAL41.NROFACT;
    $_FECHAINGESTAD = $_FECHAINGESTAD.substring(0, 4) + $_FECHAINGESTAD.substring(5, 7) + $_FECHAINGESTAD.substring(8, 10);
    $_CTAFACT = $_PREFIJOFACT + SAL41.NROFACT.padStart(6, '0');

    let datos_envio = datosEnvio();
    datos_envio += SAL41.ADMINW;
    datos_envio += '|' + SAL41.LLAVEFACT
    datos_envio += '|' + $_FECHACORRECFACT;
    datos_envio += '|' + $_PREFIJOFACT + $_NROCTAFACT.padStart(6, '0')
    datos_envio += '|' + $_NITFACT
    datos_envio += '|' + SAL41.IDHISTORIAFACT.padStart(15, '0');
    datos_envio += '|' + $_FECHAINGESTAD
    // TABLA FACT
    datos_envio += '|' + $_VALORDESFACT
    datos_envio += '|' + $_TIPOCOPAGOFACT
    datos_envio += '|' + $_COPAGOESTIMFACT
    datos_envio += '|' + $_VLRIVAFACT
    datos_envio += '|' + $_MEDCIRFACT.padStart(10, '0')
    datos_envio += '|' + $_MEDAYUFACT.padStart(10, '0')
    datos_envio += '|' + $_MEDANEFACT.padStart(10, '0')
    datos_envio += '|' + $_MEDINSFACT.padStart(10, '0')
    datos_envio += '|' + SAL41.MEDOTRFACT.padStart(10, '0')
    datos_envio += '|' + $_VIAFACT
    datos_envio += '|' + SAL41.MULTFACT // NIT MEDICO
    datos_envio += '|' + SAL41.NROCIRFACT // NIT MEDICO
    datos_envio += '|' + $_CRUENTAFACT
    datos_envio += '|' + $_PUERTAESTAD
    datos_envio += '|' + $_TARIFFACT
    datos_envio += '|' + $_COSTOFACT.padStart(4, '0');
    datos_envio += '|' + SAL41.ESPECLAB
    datos_envio += '|' + $_DETALLEFACT
    datos_envio += '|' + $_CONTROLCAPESTAD
    datos_envio += '|' + $_NROAUTORELAB
    datos_envio += '|' + SAL41.FPAGOFACT
    datos_envio += '|' + SAL41.NROFORMFACT // SER815
    datos_envio += '|' + $_CAMARXFACT
    datos_envio += '|' + $_OPERELABFACT
    datos_envio += '|' + $_FECHAELABFACT
    datos_envio += '|' + $_HORAELABFACT
    datos_envio += '|' + SAL41.HORAATENESTAD
    datos_envio += '|' + SAL41.EDAD.unid_edad
    datos_envio += '|' + SAL41.EDAD.vlr_edad
    datos_envio += '|' + $_CAUSAESTAD
    datos_envio += '|' + $_EMBARESTAD
    datos_envio += '|' + $_PERSONALELAB
    datos_envio += '|' + SAL41.CLASEPROCESTADO
    datos_envio += '|' + SAL41.TIPOPROCESTAD
    datos_envio += '|' + SAL41.FINALIDESTAD
    datos_envio += '|' + $_FECHASALESTAD
    datos_envio += '|' + $_HORASALIDESTAD
    datos_envio += '|' + $_REMITEFACT.padStart(10, '0')
    datos_envio += '|' + SAL41.ESPECREMIFACT
    datos_envio += '|' + $_UNSERVFACT
    datos_envio += '|' + $_TIPODRFACT
    datos_envio += '|' + $_MACROFACT
    datos_envio += '|' + SAL41.CUPPAQINTFACT
    datos_envio += '|' + SAL41.ORDSERVFACT
    datos_envio += '|' + SAL41.RECIBIDORX
    datos_envio += '|' + SAL41.CRONICOFACT
    datos_envio += '|' + SAL41.PENDIENTEW
    datos_envio += '|' + SAL41.NROPENDIW
    datos_envio += '|' + SAL41.FECHAPENDIW
    datos_envio += '|' + SAL41.HORAPENDIW
    datos_envio += '|' + SAL41.CANTPENDIW
    datos_envio += '|' + SAL41.TIPOPENDIW
    datos_envio += '|' + SAL41.FACTAUTOFACT
    datos_envio += '|' + SAL41.VLRIVA1FACT
    datos_envio += '|' + SAL41.VLRIVA2FACT
    datos_envio += '|' + SAL41.VLRIVA3FACT
    datos_envio += '|' + SAL41.EMPRESAPACIRIPS + '|' + SAL41.NOMBRETXT + '|'
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _respuestagrabar_450, get_url('APP/SALUD/SAL450-03.DLL'));
}

function _respuestagrabar_450(data) {
    data = data.split('|');
    if (data[0].trim() == '00') {
        grabar_auditoria_SALUD({
            'TIPO': 'I46',
            'NOVED': 8,
            'LLAVE': SAL41.LLAVEFACT,
            'ARCH': "SALUD          "
        },
            () => {
                loader("hide");
                _Contabiliarcomp_41();
            }
        )
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}


//////////////////////GRABAR INV401/////////////////////////////
function _Cancelar_41() {
    setTimeout(_Detalle_41, 300);
}

function _Confirmargrabar2_41() {
    if (($_GRUPOFACT1.trim() == '') || (parseInt($_GRUPOFACT1) == 0)) {
        _Evaluarcodservicio2_41();
    }
    $_HORAELABFACT = moment().format('HH:mm');
    $_HRELABFACT = $_HORAELABFACT.substring(0, 2);
    $_MNELABFACT = $_HORAELABFACT.substring(3, 5);
    $_FECHASALESTAD = moment().format('YYYYMMDD');
    $_ANOSALESTAD = $_FECHASALESTAD.substring(0, 4);
    $_MESSALESTAD = $_FECHASALESTAD.substring(4, 6);
    $_DIASALESTAD = $_FECHASALESTAD.substring(6, 8);
    $_OPERELABFACT = SAL41.ADMINW;
    $_FECHAELABFACT = moment().format('YYYYMMDD');
    switch ($_PREFIJOFACT) {
        case 'C':
            SAL41.SECUOTROS = '96';
            // SolicitarDll({ datosh: datos_envio }, _dataCON007_03_41, get_url('/CONTAB/APP/CON007.DLL'))
            _infoCON007_03_SAL41();
            break;
        case 'E':
            SAL41.SECUOTROS = '89';
            // SolicitarDll({ datosh: datos_envio }, _dataCON007_03_41, get_url('/CONTAB/APP/CON007.DLL'))
            _infoCON007_03_SAL41();
            break;
        default:
            _Leerfactura_41();
            break;
    }
}

function _infoCON007_03_SAL41() {
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + SAL41.SECUOTROS + '|' }, URL)
        .then(data => {
            console.debug(data);
            var data = data.split("|");
            SAL41['ULTFECHANUM3'] = data[2].trim();
            SAL41['NUMEROCTL3'] = data[1].substring(3, 9);
            // SAL41['NROFACT3'] = SAL41.NUMEROCTL;
            let fecha = $_FECHAFACT.split('-');
            datos_envio = datosEnvio() + SAL41.SECUOTROS + '|' + fecha[0].substring(2, 4) + fecha[1] + fecha[2] + '|' + SAL41.NUMEROCTL3 + '|'
            console.debug(datos_envio);
            SolicitarDll({ datosh: datos_envio }, data => {
                console.debug(data);
                data = data.split('|');
                $_NROOTROS = data[1].substring(3, 9);
                $_NROCTAFACT = $_NROOTROS;
                _Leerfactura_41();
            }, get_url('APP/CONTAB/CON007X.DLL'));
        })
        .catch(err => {
            console.debug(err);
        })
}

function _Leerfactura_41() {
    if ((SAL41.NITUSU == '0830512772') && ($_CLFACT)) {
        $_SWBUSCAR3 = 0;
        _Buscarpendiente_41();
        if ($_SWBUSCAR3 > 0) {
            SAL41.NROPENDIW = SAL41.LLAVEFACT;
            // $_FECHAFACT = $_FECHAFACT.replace('-', '')
            let fecha = $_FECHAFACT.replace('-', '');
            SAL41.FECHAPENDIW = fecha;
            SAL41.HORAPENDIW = moment().format('LT');
            SAL41.HORAPENDIW = SAL41.HORAPENDIW.replace(':', '');
            SAL41.CANTPENDIW = $_SWBUSCAR3;
            SAL41.PENDIENTEW = 'S';
            SAL41.TIPOPENDIW = 1;
        } else {
            SAL41.PENDIENTEW = 'N';
        }
    }
    if (((SAL41.NITUSU == '0900541158') || (SAL41.NITUSU == '0900566047') || (SAL41.NITUSU == '0900565371') || (SAL41.NITUSU == '0901120152')) && (SAL41.FACTAUTOFACT == 2) && ($_SWAUTOPASO == 0)) {
        $_SECUNUM = '9' + $_PREFIJONUM;
        let datos_envio = datosEnvio();
        datos_envio += '|' + $_SECUNUM;
        SolicitarDll({ datosh: datos_envio }, _dataCON007_04_41, get_url('/CONTAB/APP/CON007.DLL'))
    } else {
        _Leerfactura2_41();
    }
}

function _dataCON007_04_41(data) {
    data = data.split('|');
    $_NROOTROS = data[3].trim();
    if (date[0].trim() == '00' || date[0].trim() == '01') {
        let fecha = $_FECHAFACT.replace('-', '');
        // $_FECHAFACT = $_FECHAFACT.replace('-', '')
        let datos_envio = datosEnvio();
        datos_envio += '|';
        datos_envio += $_CTAFACT;
        datos_envio += '|';
        datos_envio += SAL41.IDHISTORIAFACT;
        datos_envio += '|';
        datos_envio += fecha;
        datos_envio += '|';
        datos_envio += $_DETALLEFACT;
        datos_envio += '|';
        datos_envio += $_NROAUTORELAB;
        datos_envio += '|';
        datos_envio += $_NROOTROS;
        SolicitarDll({ datosh: datos_envio }, _dataSER108DA_41, get_url('/SALUD/APP/SER108DA.DLL'))
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _dataSER108DA_41(data) {
    data = data.split('|');
    $_LLAVEREGREW = data[1].trim();
    $_FECHACREW = data[2].trim();
    $_NROW = data[3].trim();
    let datos_envio = datosEnvio();
    datos_envio += '|' + $_SECUNUM
    datos_envio += '|' + $_NROW
    datos_envio += '|' + $_FECHACREW
    SolicitarDll({ datosh: datos_envio }, _dataCON007X_02_41, get_url('/CONTAB/APP/CON007X.DLL'));
    _Leerfactura2_41();
    // DESCARGA CONTROL-FORMULACION R4
}

function _Leerfactura2_41() {
    // INITIALIZE
    $_HORAELABFACT = $_HORAELABFACT.substring(0, 2) + $_HORAELABFACT.substring(3, 5);
    let fechaguardado = $_FECHAFACT.split('-');
    console.debug(fechaguardado);
    SAL41.LLAVEFACT = $_SUCFACT + $_CLFACT + SAL41.NROFACT;
    SAL41.HORAINGESTAD = $_FECHAINGESTAD.substring(11, 13) + $_FECHAINGESTAD.substring(14, 16);
    $_FECHAINGESTAD = $_FECHAINGESTAD.substring(0, 4) + $_FECHAINGESTAD.substring(5, 7) + $_FECHAINGESTAD.substring(8, 10);
    $_CTAFACT = $_PREFIJOFACT + SAL41.NROFACT.padStart(6, '0');
    let datos_envio = datosEnvio();
    datos_envio += SAL41.ADMINW;
    datos_envio += '|' + SAL41.LLAVEFACT
    datos_envio += '|' + fechaguardado[0].trim() + fechaguardado[1].trim() + fechaguardado[2].trim();
    datos_envio += '|' + $_PREFIJOFACT + $_NROCTAFACT.padStart(6, '0')
    datos_envio += '|' + $_NITFACT
    datos_envio += '|' + SAL41.IDHISTORIAFACT.padStart(15, '0');
    datos_envio += '|' + $_FECHAINGESTAD
    // TABLA FACT
    datos_envio += '|' + $_VALORDESFACT
    datos_envio += '|' + $_TIPOCOPAGOFACT
    datos_envio += '|' + $_COPAGOESTIMFACT
    datos_envio += '|' + $_VLRIVAFACT
    datos_envio += '|' + $_MEDCIRFACT.padStart(10, '0')
    datos_envio += '|' + $_MEDAYUFACT.padStart(10, '0')
    datos_envio += '|' + $_MEDANEFACT.padStart(10, '0')
    datos_envio += '|' + $_MEDINSFACT.padStart(10, '0')
    datos_envio += '|' + SAL41.MEDOTRFACT.padStart(10, '0')
    datos_envio += '|' + $_VIAFACT
    datos_envio += '|' + SAL41.MULTFACT // NIT MEDICO
    datos_envio += '|' + SAL41.NROCIRFACT // NIT MEDICO
    datos_envio += '|' + $_CRUENTAFACT
    datos_envio += '|' + $_PUERTAESTAD
    datos_envio += '|' + $_TARIFFACT
    datos_envio += '|' + $_COSTOFACT.padStart(4, '0');
    datos_envio += '|' + SAL41.ESPECLAB
    datos_envio += '|' + $_DETALLEFACT
    datos_envio += '|' + $_CONTROLCAPESTAD
    datos_envio += '|' + $_NROAUTORELAB
    datos_envio += '|' + SAL41.FPAGOFACT
    datos_envio += '|' + SAL41.NROFORMFACT // SER815
    datos_envio += '|' + $_CAMARXFACT
    datos_envio += '|' + $_OPERELABFACT
    datos_envio += '|' + $_FECHAELABFACT
    datos_envio += '|' + $_HORAELABFACT
    datos_envio += '|' + SAL41.HORAATENESTAD.replace(':', '')
    datos_envio += '|' + SAL41.EDAD.unid_edad
    datos_envio += '|' + SAL41.EDAD.vlr_edad
    datos_envio += '|' + $_CAUSAESTAD
    datos_envio += '|' + $_EMBARESTAD
    datos_envio += '|' + $_PERSONALELAB
    datos_envio += '|' + SAL41.CLASEPROCESTADO
    datos_envio += '|' + SAL41.TIPOPROCESTAD
    datos_envio += '|' + SAL41.FINALIDESTAD
    datos_envio += '|' + $_FECHASALESTAD
    datos_envio += '|' + $_HORASALIDESTAD
    datos_envio += '|' + $_REMITEFACT.padStart(10, '0')
    datos_envio += '|' + SAL41.ESPECREMIFACT
    datos_envio += '|' + $_UNSERVFACT
    datos_envio += '|' + $_TIPODRFACT
    datos_envio += '|' + $_MACROFACT
    datos_envio += '|' + SAL41.CUPPAQINTFACT
    datos_envio += '|' + SAL41.ORDSERVFACT
    datos_envio += '|' + SAL41.RECIBIDORX
    datos_envio += '|' + SAL41.CRONICOFACT
    datos_envio += '|' + SAL41.PENDIENTEW
    datos_envio += '|' + SAL41.NROPENDIW
    datos_envio += '|' + SAL41.FECHAPENDIW
    datos_envio += '|' + SAL41.HORAPENDIW
    datos_envio += '|' + SAL41.CANTPENDIW
    datos_envio += '|' + SAL41.TIPOPENDIW
    datos_envio += '|' + SAL41.FACTAUTOFACT
    datos_envio += '|' + SAL41.VLRIVA1FACT
    datos_envio += '|' + SAL41.VLRIVA2FACT
    datos_envio += '|' + SAL41.VLRIVA3FACT
    datos_envio += '|' + SAL41.EMPRESAPACIRIPS + '|' + SAL41.NOMBRETXT + '|'
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_15, get_url('APP/SALUD/SAL41-15.DLL'));
}

function _dataSAL41_15(data) {
    console.debug(data);
    data = data.split('|');
    SAL41.NROFACT = data[1].trim();
    $_NROW = data[2].trim();
    let fecha = $_FECHAFACT.split('-');
    if (data[0].trim() == '00' || data[0].trim() == '01') {
        let datos_envio = datosEnvio();
        datos_envio += $_SECUNUM + '|' + fecha[0].substring(2, 4) + fecha[1] + fecha[2] + '|' + SAL41.NROFACT + '|'
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataCON007X_02_41, get_url('APP/CONTAB/CON007X.DLL'));
    } else {
        CON852(data[0], data[1], data[2], _toggleNav)
    }
}

function _dataCON007X_02_41(data) {
    console.debug(data);
    data = data.split('|');
    $_NROW = data[1].trim();
    $_DETALLEMOV = data[2].trim();
    _Contabiliarcomp_41();
}

function _Contabiliarcomp_41() {
    if (($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "P") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "T") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) {
        SolicitarDll({ datosh: datosEnvio() + $_LLAVENUM + $_NROCTAFACT.padStart(6, '0') + '|' + $_FECHA_LNK + '|' + SAL41.NITUSU + '|' + SAL41.SALMINUSU + '|' }, _dataINV020GA_41, get_url('APP/SALUD/SAL020GA.DLL'));
    } else if (($_PREFIJOFACT == 'E') || ($_PREFIJOFACT == 'C')) {
        SolicitarDll({ datosh: datosEnvio() + SAL41.LLAVEFACT + '|' }, _dataINV020_41, get_url('APP/SALUD/SAL020.DLL'));
    } else {
        _Contabiliarcomp2_41();
    }
}

function _dataINV020GA_41(data) {
    console.debug(data);
    _Contabiliarcomp2_41();
}

function _dataINV020_41(data) {
    data = data.split('|');
    _Contabiliarcomp2_41();
}

function _Contabiliarcomp2_41() {
    // if ((SAL41.FINALIDESTAD == '11') && ($_CRONICOPACI != 'S')) {
    //     // OPEN I-O EN ARCHIVO PACIENTES 7848
    // }
    // else {
    _Generarhl7_41();
    // }
}

function _Generarhl7_41() {
    let fecha = $_FECHAFACT.split('-');
    if ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162')) {
        if ($_FECHAACT == fecha[0].substring(2, 4) + fecha[1] + fecha[2]) {
            _Montarhl7_41(_Descargarinvent_41);
        } else {
            _Descargarinvent_41();
        }
    } else {
        _Descargarinvent_41();
    }
}

function _Descargarinvent_41() {
    if (SAL41.NITUSU == '0844002258' || SAL41.NITUSU == '0822006883') {
        var grupofact = () => {
            var lab = false;
            for (var i in $TABLAFACT) {
                if ($TABLAFACT[i].ARTICULO.substring(0, 2) == '87' || $TABLAFACT[i].ARTICULO.substring(0, 2) == '88' || $TABLAFACT[i].ARTICULO.substring(0, 2) == '89' || $TABLAFACT[i].ARTICULO.substring(0, 2) == '90' || $TABLAFACT[i].ARTICULO.substring(0, 2) == '91') {
                    lab = true
                }
            }
            return lab
        }
        if (grupofact()) {
            let URL = get_url("APP/SALUD/CREA-RESU20.DLL");
            postData({ datosh: datosEnvio() + $_SUCFACT + $_CLFACT + SAL41.NROFACT + '|' }, URL)
                .then(data => {
                    console.debug(data);
                })
                .catch(err => {
                    console.debug(err);
                    CON851('', 'Hubo un problema guardando en resultados de laboratorio', null, 'error', 'Error');
                })
        }
    }
    if ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162')) {
        _Descargarinvent2_41();
    } else {
        if ((SAL41.INVENTUSU == 'S') && (($_CLFACT == '0') || ($_MACROFACT == '1'))) {
            $_SWRECAL = 0;
            let datos_envio = datosEnvio()
            datos_envio += '|' + SAL41.LLAVEFACT
            datos_envio += '|' + $_SWRECAL
            SolicitarDll({ datosh: datos_envio }, _dataINV030_41, get_url('APP/SALUD/SAL030.DLL'));
        } else {
            _Descargarinvent2_41();
        }
    }
}

function _dataINV030_41(data) {
    data = data.split('|');
    if (data.trim() == '00') {
        let datos_envio = datosEnvio()
        datos_envio += '|' + SAL41.LLAVEFACT
        datos_envio += '|' + $_SWRECAL
        SolicitarDll({ datosh: datos_envio }, _dataINV030V_41, get_url('APP/SALUD/INV030V.DLL'));
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _dataINV030V_41(data) {
    data = data.split('|');
    if ((data[0].trim() == '00') && ($_CLFACT == '0') && ($TABLAFACT[0].ALMACEN != "SIN")) {
        CON851('3M', '3M', null, 'warning', 'Advertencia!');
        if ((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) {
            _Descargarinvent2_41();
        } else {
            console.debug('me devuelvo a descargar invent');
            _Descargarinvent_41();
        }
    } else if (data[0].trim() == '01') {
        _Descargarinvent2_41();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _Descargarinvent2_41() {
    if (($_SWBONO == '1') && ($_TIPO_COMP == '1')) {
        // ESCRIBIR ARCHIVO PROMOCION 7893
    } else {
        _Imprimir_41();
    }
}

function _Imprimir_41() {
    if (($_REDEXTERNUM == 'S') || ($_FECHAFACT < $_FECHAACT)) {
        _Imprimir2_41();
    } else {
        if ($_PUERTAESTAD == '2') {
            let artfact = $TABLAFACT[0].ARTICULO;
            if ((($_CLFACT == '1') || ($_CLFACT == '5')) || (artfact.substring(0, 2) == '99') || (artfact.substring(0, 2) == '23') || (artfact.substring(0, 2) == 'F8') || (artfact.substring(0, 2) == '13') || (artfact.substring(0, 2) == '12') || (($_CLFACT == '7') && (artfact.substring(0, 2) != '90')) || ((SAL41.NITUSU == '0830092718') && ($_CLFACT == '3')) || ((SAL41.NITUSU == '0900193162') && ($_CLFACT == '3')) || ((SAL41.NITUSU == '0830092719') && ($_CLFACT == '3')) || ((SAL41.NITUSU == '0800037979') && ($_CLFACT == '3')) || ((SAL41.NITUSU == '0800037979') && ($_CLFACT == '4')) || ((SAL41.NITUSU == '0900405505') && ($_CLFACT == '3')) || ((SAL41.NITUSU == '0900073674') && ($_CLFACT == '3')) || ((SAL41.NITUSU == '0800175901') && ($_CLFACT == '4')) || ((SAL41.NITUSU == '0830511298') && ($_CLFACT == '4')) || ((SAL41.NITUSU == '0900004059') && (parseInt($_CLFACT) > 0)) || ((SAL41.NITUSU == '0900005594') && (parseInt($_CLFACT) > 0)) || ((SAL41.NITUSU == '0900405505') && ($_CLFACT == '3'))) {
                $_ACTCITW = 'F';
                let datos_envio = datosEnvio() + SAL41.LLAVEFACT + '|' + SAL41.FINALIDESTAD + '|' + $_ACTCITW + '|' + $_ANOACT + '|' + SAL41.NITUSU + '|'
                console.debug(datos_envio);
                let URL = get_url("APP/SALUD/SER891.DLL");
                postData({ datosh: datos_envio }, URL)
                    .then(data => {
                        console.debug(data);
                        _Imprimir2_41();
                    })
                    .catch(err => {
                        console.debug(err);
                        console.debug('error en la actualizacion de citas');
                        _Imprimir2_41();
                    })
            } else {
                console.log('SER891 no de impresion')
                _Imprimir2_41();
            }
        } else {
            if (((SAL41.NITUSU == '0900004059') || (SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0900193162') || (SAL41.NITUSU == '0900405505') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900405505') || (SAL41.NITUSU == '0900005594')) && (parseInt($_CLFACT) > 0)) {
                $_ACTCITW = 'F';
                let datos_envio = datosEnvio() + SAL41.LLAVEFACT + '|' + SAL41.FINALIDESTAD + '|' + $_ACTCITW + '|' + $_ANOACT + '|' + SAL41.NITUSU + '|'
                console.debug(datos_envio);
                // SolicitarDll({ datosh: datos_envio }, _dataSER891_41, get_url("APP/SALUD/SER891.DLL"));
                let URL = get_url("APP/SALUD/SER891.DLL");
                postData({ datosh: datos_envio }, URL)
                    .then(data => {
                        console.debug(data);
                        _Imprimir2_41();
                    })
                    .catch(err => {
                        console.debug(err);
                    })
            } else {
                _Imprimir2_41();
            }
        }
    }
}

function _Imprimir2_41() {
    if ((SAL41.NITUSU == '0845000038') && ($_PUERTAESTAD == '8') && (parseInt($_CLFACT) > 0)) {
        $_ACTCITW = 'F';
        let datos_envio = datosEnvio() + SAL41.LLAVEFACT + '|' + SAL41.FINALIDESTAD + '|' + $_ACTCITW + '|' + $_ANOACT + '|' + SAL41.NITUSU + '|'
        let URL = get_url("APP/SALUD/SER891.DLL");
        postData({ datosh: datos_envio }, URL)
            .then(data => {
                console.debug(data);
                _Imprimir3_41();
            })
            .catch(err => {
                console.debug(err);
            })
    } else {
        _Imprimir3_41();
    }
}

function _Imprimir3_41() {
    let artfact = $TABLAFACT[0].ARTICULO;
    if ((($_CLFACT == '1') || ($_CLFACT == '4') || ($_CLFACT == '5') || ($_CLFACT == '7')) || (($_CLFACT == '0') && (artfact.substring(0, 2) == 'MO'))) {
        // if (((SAL41.ESPECLAB == '250') || (SAL41.ESPECLAB == '460') || (SAL41.ESPECLAB == '461') || (SAL41.ESPECLAB == '462') || (SAL41.ESPECLAB == '463') || (SAL41.ESPECLAB == '464') || (SAL41.ESPECLAB == '510') || (SAL41.ESPECLAB == '220')) || ((parseInt(artfact) == 890203) || (parseInt(artfact) == 890303) || (parseInt(artfact) == 890304) || (parseInt(artfact) == 890403) || (parseInt(artfact) == 890404) || (parseInt(artfact) == 890703) || (parseInt(artfact) == 890704))) {
        //     let datos_envio = datosEnvio()
        //     datos_envio += SAL41.LLAVEFACT
        //     SolicitarDll({ datosh: datos_envio }, data => { console.debug(data) }, get_url("APP/SALUD/SER448O.DLL")); // FALTA FD-HISOD17 FD-ODEVO17
        // }
        // else {
        // if ((SAL41.NITUSU == '0800162035') && ((parseInt(artfact) == 990113) || (artfact == 'A10502'))) {
        //     _Imprimir4_41();
        // }
        // else {
        //     let datos_envio = datosEnvio()
        //     datos_envio += SAL41.LLAVEFACT
        //     SolicitarDll({ datosh: datos_envio }, data => { console.debug(data) }, get_url("APP/SALUD/SER448C.DLL")); // FALTA
        // }
        // }
        // _Releerrips_41();
        _Imprimir4_41();
    } else {
        _Imprimir4_41();
    }
}

function _Releerrips_41() {
    SolicitarDll({ datosh: datosEnvio() + SAL41.LLAVEFACT + '|' }, data => {
        console.debug(data);
        data = data.split('|');
        if (data[0].trim() == '00') {
            SAL41.TRIAGEESTAD = data[4].trim();
            SAL41.HORAATENESTAD = data[5].trim();
            SAL41.MINHORAESTAD = data[6].trim();
            SAL41.ESTADSALESTAD = data[7].trim();
            SAL41.FINALIDESTAD = data[8].trim();
            SAL41.CAUSAESTAD = data[9].trim();
            SAL41.CODDIAGESTAD = data[10].trim();
            SAL41.TIPDIAGESTAD = data[11].trim();
            SAL41.REPETIDESTAD = data[12].trim();
            SAL41.NOMBREENF1 = data[13].trim();
            SAL41.NOMBREENF2 = data[14].trim();
            SAL41.MOTIVOCONSULTA = data[15].trim();
        } else {
            console.debug('No existe la factura');
        }
    }, get_url("APP/SALUD/SAL41-01.DLL"));
}

function _Imprimir4_41() {
    // if (((SAL41.NITUSU == '0900264583') || (SAL41.NITUSU == '0900030814')) && ($_CODDIAGESTAD[1].trim() == '')) {
    //     //SER421 OTRA OPCION _dataSER421_41
    // } 
    if ($_PREFIJOFACT == 'C' || $_PREFIJOFACT == 'E') {
        $_CONTROLCAPNUM = '0';
        _Imprimir6_41();
    } else {
        let artfact = $TABLAFACT[0].ARTICULO
        if ((artfact == 890701) || (artfact == 890702) || (artfact == 890703) || (artfact == 890704)) {
            // if ($_CODDIAGESTAD[0].trim() == '') {
            //SER421 OTRA OPCION _dataSER421_41
            // }
            if (SAL41.NITUSU == '0800162035') {
                _Imprimir6_41();
            } else {
                let datos_envio = datosEnvio()
                datos_envio += '|' + SAL41.LLAVEFACT
                SolicitarDll({ datosh: datos_envio }, _dataSER411U_41, get_url("APP/SALUD/INV411U.DLL")); // FALTA
            }
        } else {
            _Imprimir6_41();
        }
    }
}

function _dataSER411U_41(data) {
    data = data.split('|');
    _Imprimir6_41();
}

function _Imprimir6_41() {
    if (SAL41.NITUSU == '0822007038') {
        _Imprimir7_41();
    } else {
        if (($_UNSERVFACT == '01') && ($_CLFACT == '5')) {
            let fecha = $_FECHAFACT.split('-');
            let URL = get_url("APP/SALUD/SER880TG.DLL");
            postData({ datosh: datosEnvio() + SAL41.LLAVEFACT + '|' + fecha[0].substring(2, 4) + fecha[1] + fecha[2] + '|' + SAL41.IDHISTORIAFACT + '|' }, URL)
                .then(data => {
                    console.debug(data);
                    console.debug('con090');
                    _Imprimir7_41();
                })
                .catch(err => {
                    console.debug(err);
                    _Imprimir7_41();
                })
        } else {
            _Imprimir7_41();
        }
    }
}

function _Imprimir7_41() {
    console.debug('imprimir 7');
    if (($.isNumeric($_CONTROLCAPNUM)) || (parseInt($_CONTROLCAPNUM) = 0) || ($_CONTROLCAPNUM == '9999')) {
        _Imprimir8_41();
    } else {
        let datos_envio = datosEnvio()
        datos_envio += '|' + $_CONTROLCAPNUM
        datos_envio += '|' + $_FECHAFACT
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_16, get_url("APP/SALUD/SAL41-16.DLL")); //FALTA
    }
}

function _dataSAL41_16(data) {
    console.debug(data);
    data = data.split('|');
    _Imprimir8_41();
}

function _Imprimir8_41() {
    console.debug('imprimir 8');
    // if ((($_CLFACT == '0') && (SAL41.NITUSU == '0822005339')) || (($_REDEXTERNUM == 'S') && ($_DIAGNCUP = ! 'N'))) {
    //     //SER421 OTRA OPCION _dataSER4213_41
    // } if ((SAL41.NITUSU == '0900264583') && ($_DIAGNCUP = ! 'N') && ($_CODDIAGESTAD[0].trim() == '')) {
    //     //SER421 OTRA OPCION _dataSER4214_41
    // } else {
    //     let grupofact = $TABLAFACT[0].ARTFACT.substring(0, 2);
    //     let grupofact2 = $TABLAFACT[0].ARTFACT.substring(0, 2);
    //     if ((grupofact = '73' || grupofact == '74' || grupofact2 == '73' || grupofact2 == '74' || grupofact == 'F8' || grupofact == 'FS' || grupofact2 == 'F8' || grupofact2 == 'FS') && ($_DIAGNCUP = ! 'N')) {
    //         //SER421 OTRA OPCION _dataSER4214_41
    //     } else {
    //         if (($_CLFACT == '1') && ($_CODDIAGESTAD[0].trim() == '') && ($_DIAGNCUP = ! 'N')) {
    //             //SER421 OTRA OPCION _dataSER4214_41
    //         } else {
    //             if (((parseInt($_CLFACT) > 2) || ((SAL41.NITUSU == '0891855847') && ($_CLFACT == '1'))) && (($_FECHAINGESTAD < $_FECHAACT) || (($_PUERTAESTAD != '1') && ($_HORAELABFACT > 1915))) && ($_DIAGNCUP = ! 'N') && ($_CODDIAGESTAD[0].trim() == '')) {
    //                 //SER421 OTRA OPCION _dataSER4213_41
    //             } else {
    //                 _Imprimir9_41();
    //             }
    //         }
    //     }
    // }
    if (SAL41.OPCIONACTIVA == '09421') {
        if ($_COPAGOESTIMFACT > 0 || $_PREFIJOFACT == 'E') {
            let { ipcRenderer } = require("electron");
            ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/FAC135C.html', comprobante: SAL41.NROFACT, tipofact: SAL41.LLAVEFACT.substring(2, 3) });
            vector = ['on', 'Ventana de Copagos']
            _EventocrearSegventana(vector, _Imprimir9_41);
        } else {
            _Imprimir9_41();
        }
    } else {
        _Imprimir9_41();
    }
}

// function _dataSER4213_41(data) {
//     data = data.split('|');
//     _Releerrips_41(); // FALTA
//     _Recibopago_41();
// }

// function _dataSER4214_41(data) {
//     data = data.split('|');
//     _Releerrips_41();
//     _Imprimir9_41();
// }

function _Imprimir9_41() {
    if ((SAL41.NITUSU == '0830092718') && (SAL41.PREFIJOUSU == 'TU')) {
        // REGRESAR
    } else {
        if (((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) && ($_CLFACT == '5')) {
            $_FORMATOW = 0
            _Imprimir10_41();
        } else {
            SAL41.FORMATO = [
                { COD: '1', DESCRIP: 'FORMATO NORMAL ORIGINAL' },
                { COD: '2', DESCRIP: 'FORMATO NORMAL CON COPIA' },
                { COD: '3', DESCRIP: 'FORMATO R.I.P.S ORIGINAL' },
                { COD: '4', DESCRIP: 'FORMATO POS' },
                { COD: '5', DESCRIP: 'PENDIENTE MEDICAMENTOS' },
                { COD: '6', DESCRIP: 'NO IMPRIMIR' },
            ];
            POPUP({
                array: SAL41.FORMATO,
                titulo: 'IMPRESION DE FORMATOS',
                indices: [
                    { label: 'DESCRIP' }
                ],
                // callback_f: () => {
                //     var FUNCION = new Function();
                //     let OPCIONES = new Object;
                //     OPCIONES = {
                //         '09421': _Evaluarremite_41,
                //         '09422': _Evaluarnumeroctl_41,
                //         '09426': _Evaluarremite_41
                //     }
                //     FUNCION = OPCIONES[SAL41.OPCIONACTIVA];
                //     setTimeout(FUNCION, 300);
                // }
                callback_f: () => {
                    _toggleNav();
                }
            },
                _evaluarSER811_SAL41);

        }
    }
}

function _evaluarSER811_SAL41(data) {
    SAL41.IMPRESION = new Object;
    _Releerrips_41();
    switch (data.COD) {
        case '1':
            SAL41.ORIGINAL = 'S';
            _imprimirINV411_SAL97C11();
            break;
        case '2':
            SAL41.ORIGINAL = 'N';
            if ($_USUA_GLOBAL[0].POS == 'S') {
                _imprimirINV412_SAL97C11();
            } else {
                _imprimirINV411_SAL97C11();
            }
            break;
        case '3':
            SAL41.ORIGINAL = 'S';
            _imprimirINV414_SAL97C11();
            break;
        case '4':
            SAL41.ORIGINAL = 'S';
            _imprimirINV412_SAL97C11();
            break;
        case '5':
            SAL41.ORIGINAL = 'S';
            if ($_CLFACT == '0') {
                if (SAL41.NITUSU == '0800162035') {
                    _imprimirINV411_SAL97C11();
                } else {
                    _imprimirINV412_SAL97C11();
                }
            } else {
                CON851('', 'La clase de servicio no corresponde a la impresión solicitada', null, 'error', 'Error');
                setTimeout(_Imprimir9_41, 300);
            }
            // no dejar imprimir si no es medicamentos
            break;
        case '6':
            _inputControl('reset');
            $('#TABLA_401 tbody').html('');
            if (SAL41.OPCIONACTIVA != '09421') {
                $('.page-breadcrumb')[1].remove()
                _validarOpcion_SAL41();
            } else {
                setTimeout(_UndServicio_41, 300);
            }
            break;
        default:
            _toggleNav();
            break;
    }
}


function _imprimirINV411_SAL97C11() {
    SAL41.IMPRESION.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
    SAL41.IMPRESION.NIT = $_USUA_GLOBAL[0].NIT;
    SAL41.IMPRESION.NITUSU = 'NIT' + $_USUA_GLOBAL[0].NIT.toString();
    switch ($_USUA_GLOBAL[0].IVA_S) {
        case 'C':
            SAL41.IMPRESION.IVAUSU = 'IVA REG. COMUN-RETENEDOR'
            break;
        case 'S':
            SAL41.IMPRESION.IVAUSU = 'IVA REGIMEN SIMPLIFICADO'
            break;
        case 'N':
            SAL41.IMPRESION.IVAUSU = 'NO RESPONSABLES DE IVA'
            break;
        default:
            SAL41.IMPRESION.IVAUSU = '';
            break;
    }
    switch ($_PUERTAINGW) {
        case '1':
            SAL41.IMPRESION.PUERTAW = 'A1';
            break;
        case '2':
            SAL41.IMPRESION.PUERTAW = 'CE';
            break;
        case '3':
            SAL41.IMPRESION.PUERTAW = 'RE';
            break;
        case '4':
            SAL41.IMPRESION.PUERTAW = 'NA';
            break;
    }
    switch ($_PREFIJOFACT) {
        case 'E':
            SAL41.IMPRESION.FPAGO = 'CONTADO'
            break;
        case 'C':
            SAL41.IMPRESION.FPAGO = 'CREDITO'
            break;
        case 'P':
            SAL41.IMPRESION.FPAGO = 'Hospit.'
            break;
        case 'T':
            SAL41.IMPRESION.FPAGO = 'A. Trans'
            break;
        default:
            SAL41.IMPRESION.FPAGO = 'Ambulat.'
            break;
    }
    switch ($_TIPOPACI) {
        case 'C':
            SAL41.IMPRESION.TIPOUSUW = 'CONTR.'
            break;
        case 'S':
            SAL41.IMPRESION.TIPOUSUW = 'SUBSID'
            break;
        case 'V':
            SAL41.IMPRESION.TIPOUSUW = 'VINCUL'
            break;
        case 'P':
            SAL41.IMPRESION.TIPOUSUW = 'PARTIC'
            break;
        case '0':
            SAL41.IMPRESION.TIPOUSUW = 'OTRO'
            break;
        default:
            SAL41.IMPRESION.TIPOUSUW = $_TIPOPACI
            break;
    }
    if ($_USUA_GLOBAL[0].BARRAS == 'N') {
        SAL41.IMPRESION.CODIGOBARRAS = '';
    }
    if ($_USUA_GLOBAL[0].BARRAS != 'N') {
        SAL41.IMPRESION.CODIGOBARRAS = $_SUCFACT + $_CLFACT + $_NROCTAFACT;
    }
    SAL41.IMPRESION.DIRECCIONUSU = $_USUA_GLOBAL[0].DIRECC;
    SAL41.IMPRESION.TELEFONOUSU = $_USUA_GLOBAL[0].TEL.trim();
    SAL41.IMPRESION.NOMBRECIUUSU = $_USUA_GLOBAL[0].NOMBRE_CIU;
    SAL41.IMPRESION.CLASESERVICIO = $('#claseservicio_SAL41').val();
    SAL41.IMPRESION.FECHAFACT = moment($_FECHAFACT).format('MMMM DD/YY').toUpperCase();
    SAL41.IMPRESION.FECHAACT = moment().format('YYYYMMDD HH:mm');
    SAL41.IMPRESION.FACTURA = $_PREFIJOFACT + $_NROCTAFACT.padStart(6, '0');
    SAL41.IMPRESION.COMPROBANTE = SAL41.NROFACT;
    SAL41.IMPRESION.DESCRIPTER = $('#cliented_SAL41').val();
    SAL41.IMPRESION.CODIGOEPS = $_EPSPACI;
    SAL41.IMPRESION.ATIENDE = $_DESCRIPPROF;
    SAL41.IMPRESION.ESPECIALIDAD = SAL41.ESPECLAB + ' ' + $_NOMBREESP.substring(0, 24);
    SAL41.IMPRESION.COSTO = $_COSTOFACT + ' ' + $_NOMBRECOSTO;
    SAL41.IMPRESION.PACIENTE = SAL41.IDHISTORIAFACT + ' CC ' + $_DESCRIPPACI;
    SAL41.IMPRESION.UNSERVFACT = $_UNSER.substring(3, 35);
    SAL41.IMPRESION.OCUPACION = SAL41.OCUPACION;
    SAL41.IMPRESION.EDAD = SAL41.EDAD.unid_edad + SAL41.EDAD.vlr_edad;
    SAL41.IMPRESION.SEXO = $_SEXOPACI;
    SAL41.IMPRESION.CIUDAD = $_CIUDADPACI;
    SAL41.IMPRESION.ZONA = SAL41.ZONAPACI;
    SAL41.IMPRESION.DETALLE = $_DETALLEFACT;
    SAL41.IMPRESION.NROAUTOR = $_NROAUTORELAB;
    SAL41.IMPRESION.SOLICITA = $_DESCRIPPROF2;
    let valorenletra = FAC146($_VALORTOTAL);
    SAL41.IMPRESION.SON = 'SON : ' + valorenletra;
    SAL41.ORIGINAL == 'S' ? SAL41.IMPRESION.ORIGINAL = '*** ORIGINAL ***' : SAL41.IMPRESION.ORIGINAL = '*** COPIA ****';

    SAL41.IMPRESION.TABLA = $TABLAFACT;
    SAL41.IMPRESION.ACCESO = $_PUERTAESTAD;
    SAL41.IMPRESION.BARRASFACT = $_USUA_GLOBAL[0].BARRAS;
    // SAL41.IMPRESION.NUMEROBARRAFACT = $_SUCFACT + $_CLFACT + $_NROCTAFACT;
    SAL41.IMPRESION.FECHAELABORADO = $_FECHASALESTAD + ' ' + $_HRELABFACT + ':' + $_MNELABFACT;
    // SAL41.IMPRESION.RESOLDIAN = $_USUA_GLOBAL[0].RESOL_DIAN;
    for (var i in SAL41.PREFIJOS.TABLA) {
        if (SAL41.PREFIJOS.TABLA[i].PREFIJO.trim() == $_PREFIJOFACT.trim()) {
            SAL41.IMPRESION.RESOLDIAN = SAL41.PREFIJOS.TABLA[i].AUT_DIAN;
        }
    }
    SAL41.IMPRESION.VLRIVAFACT = $_VLRIVAFACT;
    SAL41.IMPRESION.VLRTOTAL = $_VALORTOTAL + $_COPAGOESTIMFACT;
    // if ($_COPAGOESTIMFACT.trim() == '') $_COPAGOESTIMFACT = '0';
    SAL41.IMPRESION.COPAGO = $_COPAGOESTIMFACT.toString();
    console.log(SAL41.IMPRESION.COPAGO);
    // let saldo = parseInt($_VALORTOTAL) - $_COPAGOESTIMFACT;
    SAL41.IMPRESION.SALDO = $_VALORTOTAL;
    SAL41.IMPRESION.OPERELABFACT = $_OPERELABFACT;
    SAL41.IMPRESION.OPERCORRECFACT = $_OPERELABFACT;
    SAL41.IMPRESION.ADMINW = SAL41.ADMINW;
    let prefijo = SAL41.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == $_PREFIJOFACT.trim())
    console.log(prefijo);
    if(prefijo.length == 0) {
        prefijo[0] = new Object;
        prefijo[0].AUT_DIAN = '';
        prefijo[0].PREFIJO = $_PREFIJOFACT;
        prefijo[0].DESDE_NRO = '';
        prefijo[0].HASTA_NRO = '';
    }
    SAL41.IMPRESION.PREFIJO = prefijo;
    SAL41.IMPRESION.COLUMNAS = ['ARTICULO','DESCRIP_ART','CANTIDAD','VALOR_UNIT','VALOR_FACT'];
    _INV411(SAL41.IMPRESION, () => { 
        CON851('','Se ha impreso el comprobante',null,'success','Exito');
        finImpresion_INV411();
    })
}

function _imprimirINV412_SAL97C11() {
    SAL41.IMPRESION.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
    SAL41.IMPRESION.NIT = $_USUA_GLOBAL[0].NIT;
    SAL41.IMPRESION.NITUSU = $_USUA_GLOBAL[0].NIT.toString();
    switch ($_USUA_GLOBAL[0].IVA_S) {
        case 'C':
            SAL41.IMPRESION.IVAUSU = 'IVA REG. COMUN-RETENEDOR'
            break;
        case 'S':
            SAL41.IMPRESION.IVAUSU = 'IVA REGIMEN SIMPLIFICADO'
            break;
        case 'N':
            SAL41.IMPRESION.IVAUSU = 'NO RESPONSABLES DE IVA'
            break;
        default:
            SAL41.IMPRESION.IVAUSU = '';
            break;
    }
    switch ($_PREFIJOFACT) {
        case 'E':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: CONTADO'
            break;
        case 'C':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: CREDITO'
            break;
        case 'P':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: Hospit.'
            break;
        case 'T':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: A. Trans'
            break;
        default:
            SAL41.IMPRESION.FPAGO = 'F.PAGO: Ambulat.'
            break;
    }
    SAL41.IMPRESION.DIRECCIONUSU = $_USUA_GLOBAL[0].DIRECC;
    SAL41.IMPRESION.TELEFONOUSU = $_USUA_GLOBAL[0].TEL.trim();
    SAL41.IMPRESION.NOMBRECIUUSU = $_USUA_GLOBAL[0].NOMBRE_CIU;
    let departamento = $_USUA_GLOBAL[0].COD_CIUD.substring(0,2).padEnd(5,'0');
    let depart = SAL41.CIUDADES.filter(x => x.COD == departamento);
    if (depart.length > 0) SAL41.IMPRESION.DEPARTAMENTOUSU = depart[0].NOMBRE
    else SAL41.IMPRESION.DEPARTAMENTOUSU = ''
    SAL41.IMPRESION.FECHAFACT = 'FECHA: ' + moment($_FECHAFACT).format('MMMM DD/YY').toUpperCase();
    SAL41.IMPRESION.FACTURA = $_PREFIJOFACT + $_NROCTAFACT.padStart(6, '0');
    SAL41.IMPRESION.DESCRIPTER = 'CLIENTE: ' + $('#cliented_SAL41').val();
    SAL41.IMPRESION.NITTER = $_NITFACT;
    departamento = SAL41.CODCIUTER.substring(0,2).padEnd(5,'0');
    depart = SAL41.CIUDADES.filter(x => x.COD == departamento);
    if (depart.length > 0) SAL41.IMPRESION.DEPARTAMENTOTER = depart[0].NOMBRE
    else SAL41.IMPRESION.DEPARTAMENTOTER = SAL41.IMPRESION.DEPARTAMENTOUSU
    SAL41.IMPRESION.TABLA = $TABLAFACT;
    SAL41.IMPRESION.ACCESO = $_PUERTAESTAD;
    SAL41.IMPRESION.BARRASFACT = $_USUA_GLOBAL[0].BARRAS;
    SAL41.IMPRESION.FECHAELABORADO = $_FECHASALESTAD + ' ' + $_HRELABFACT + ':' + $_MNELABFACT;
    for (var i in SAL41.PREFIJOS.TABLA) {
        if (SAL41.PREFIJOS.TABLA[i].PREFIJO.trim() == $_PREFIJOFACT.trim()) {
            SAL41.IMPRESION.RESOLDIAN = SAL41.PREFIJOS.TABLA[i].AUT_DIAN;
        }
    }
    let cantidadtotal = 0;
    for (var i in SAL41.IMPRESION.TABLA){
        if (SAL41.IMPRESION.TABLA[i].CANTIDAD.trim() != ''){
            cantidadtotal = parseInt(SAL41.IMPRESION.TABLA[i].CANTIDAD) + cantidadtotal;
         }
    }
    SAL41.IMPRESION.CANTIDADTOTAL = cantidadtotal;
    SAL41.IMPRESION.VLRIVAFACT = $_VLRIVAFACT;
    SAL41.IMPRESION.VLRTOTAL = PriceContMask_41.value;
    // if ($_COPAGOESTIMFACT.trim() == '') $_COPAGOESTIMFACT = '0';
    SAL41.IMPRESION.COPAGO = $_COPAGOESTIMFACT.toString();
    let saldo = parseInt(PriceContMask_41.value.replace(/,/g,'')) - parseInt($_COPAGOESTIMFACT);
    SAL41.IMPRESION.SALDO = saldo.toString();
    _INV412(SAL41.IMPRESION, () => { 
        CON851('','Se ha impreso el comprobante',null,'success','Exito');
        finImpresion_INV411();
    })
}

function _imprimirINV414_SAL97C11() {
    SAL41.IMPRESION.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
    SAL41.IMPRESION.NIT = $_USUA_GLOBAL[0].NIT;
    SAL41.IMPRESION.NITUSU = 'NIT' + $_USUA_GLOBAL[0].NIT.toString();
    switch ($_USUA_GLOBAL[0].IVA_S) {
        case 'C':
            SAL41.IMPRESION.IVAUSU = 'IVA REG. COMUN-RETENEDOR'
            break;
        case 'S':
            SAL41.IMPRESION.IVAUSU = 'IVA REGIMEN SIMPLIFICADO'
            break;
        case 'N':
            SAL41.IMPRESION.IVAUSU = 'NO RESPONSABLES DE IVA'
            break;
        default:
            SAL41.IMPRESION.IVAUSU = '';
            break;
    }
    switch ($_PUERTAINGW) {
        case '1':
            SAL41.IMPRESION.PUERTAW = 'ACCESO: A1';
            break;
        case '2':
            SAL41.IMPRESION.PUERTAW = 'ACCESO: CE';
            break;
        case '3':
            SAL41.IMPRESION.PUERTAW = 'ACCESO: RE';
            break;
        case '4':
            SAL41.IMPRESION.PUERTAW = 'ACCESO: NA';
            break;
    }
    switch ($_PREFIJOFACT) {
        case 'E':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: CONTADO'
            break;
        case 'C':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: CREDITO'
            break;
        case 'P':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: Hospit.'
            break;
        case 'T':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: A. Trans'
            break;
        default:
            SAL41.IMPRESION.FPAGO = 'F.PAGO: Ambulat.'
            break;
    }
    switch ($_TIPOPACI) {
        case 'C':
            SAL41.IMPRESION.TIPOUSUW = 'CONTR.'
            break;
        case 'S':
            SAL41.IMPRESION.TIPOUSUW = 'SUBSID'
            break;
        case 'V':
            SAL41.IMPRESION.TIPOUSUW = 'VINCUL'
            break;
        case 'P':
            SAL41.IMPRESION.TIPOUSUW = 'PARTIC'
            break;
        case '0':
            SAL41.IMPRESION.TIPOUSUW = 'OTRO'
            break;
        default:
            SAL41.IMPRESION.TIPOUSUW = $_TIPOPACI
            break;
    }
    switch ($_PERSONALELAB) {
        case '1':
            SAL41.PERSONALEDIT = 'MD.ESP'
            break;
        case '2':
            SAL41.PERSONALEDIT = 'MD.GEN'
            break;
        case '3':
            SAL41.PERSONALEDIT = 'ENFERM'
            break;
        case '4':
            SAL41.PERSONALEDIT = 'AUXIL.'
            break;
        case '5':
            SAL41.PERSONALEDIT = '      '
            break;
    }
    if ($_USUA_GLOBAL[0].BARRAS == 'N') {
        SAL41.IMPRESION.CODIGOBARRAS = '';
    }
    if ($_USUA_GLOBAL[0].BARRAS != 'N') {
        SAL41.IMPRESION.CODIGOBARRAS = $_SUCFACT + $_CLFACT + $_NROCTAFACT;
    }
    SAL41.IMPRESION.DIRECCIONUSU = $_USUA_GLOBAL[0].DIRECC.trim();
    SAL41.IMPRESION.TELEFONOUSU = $_USUA_GLOBAL[0].TEL.trim();
    SAL41.IMPRESION.CLASESERVICIO = 'COMPROB. ' + $('#claseservicio_SAL41').val();
    SAL41.IMPRESION.FECHAFACT = 'FECHA: ' + moment($_FECHAFACT).format('MMMM DD/YY');
    SAL41.IMPRESION.FACTURA = 'FACTURA NR: ' + $_PREFIJOFACT + $_NROCTAFACT.padStart(6, '0');
    SAL41.IMPRESION.COMPROBANTE = 'NRO: ' + SAL41.NROFACT;
    SAL41.IMPRESION.DESCRIPTER = 'ENTIDAD: ' + $('#cliented_SAL41').val();
    SAL41.IMPRESION.CODIGOEPS = 'CODIGO: ' + $_EPSPACI;
    SAL41.IMPRESION.ATIENDE = 'ATIENDE: ' + $_DESCRIPPROF.trim();
    SAL41.IMPRESION.ESPECIALIDAD = 'Espec:' + SAL41.ESPECLAB + ' ' + $_NOMBREESP.trim();
    SAL41.IMPRESION.COSTO = 'COS: ' + $_COSTOFACT + ' ' + $_NOMBRECOSTO.trim();
    SAL41.IMPRESION.PACIENTE = SAL41.IDHISTORIAFACT + ' CC ';
    SAL41.IMPRESION.UNSERVFACT = 'US: ' + $_UNSER.substring(3, 35);
    SAL41.IMPRESION.OCUPACION = SAL41.OCUPACION.trim();
    SAL41.IMPRESION.EDAD = SAL41.EDAD.unid_edad + SAL41.EDAD.vlr_edad;
    SAL41.IMPRESION.SEXO = $_SEXOPACI;
    SAL41.IMPRESION.CIUDADUSU = 'CIUDAD: ' + $_USUA_GLOBAL[0].COD_CIUD;
    SAL41.IMPRESION.ZONA = SAL41.ZONAPACI.trim();
    SAL41.IMPRESION.DETALLE = 'DETALLE: ' + $_DETALLEFACT.trim();
    SAL41.IMPRESION.NROAURO = 'Autor: ' + $_NROAUTORELAB;
    SAL41.IMPRESION.SOLICITA = 'SOLICITA: ' + $_DESCRIPPROF2.trim();
    let valorenletra = FAC146($_VALORTOTAL);
    SAL41.IMPRESION.SON = 'SON ' + valorenletra;
    SAL41.IMPRESION.PERSONALEDIT = SAL41.PERSONALEDIT;
    SAL41.IMPRESION.NOMBREPACIENTE = $('#paciented_SAL41').val();
    SAL41.IMPRESION.CIUDADPACI = $_CIUDADPACI;
    SAL41.IMPRESION.CELLPACI = $_CELPACI;
    SAL41.IMPRESION.DIRECCPACI = 'DIRECCION: ' + $_DIRECCPACI.trim();
    SAL41.IMPRESION.NOMBREOCU = 'OCUPACION: ' + SAL41.NOMBREOCU;
    SAL41.IMPRESION.ACOMPAPACI = 'ACOMPAÑANTE: ' + SAL41.ACOMPAPACI;
    switch (parseInt(SAL41.FINALIDESTAD)) {
        case 0:
            SAL41.IMPRESION.FINALIDESTAD = '__'
            break;
        default:
            SAL41.IMPRESION.FINALIDESTAD = SAL41.FINALIDESTAD;
            break;
    }
    switch (SAL41.TRIAGEESTAD) {
        case '1':
            SAL41.IMPRESION.TRIAGEESTAD12 = 'X ';
            SAL41.IMPRESION.TRIAGEESTAD34 = '  ';
            break;
        case '2':
            SAL41.IMPRESION.TRIAGEESTAD12 = 'X ';
            SAL41.IMPRESION.TRIAGEESTAD34 = '  ';
            break;
        case '3':
            SAL41.IMPRESION.TRIAGEESTAD12 = 'X ';
            SAL41.IMPRESION.TRIAGEESTAD34 = '  ';
            break;
        case '4':
            SAL41.IMPRESION.TRIAGEESTAD12 = 'X ';
            SAL41.IMPRESION.TRIAGEESTAD34 = '  ';
            break;
        default:
            SAL41.IMPRESION.TRIAGEESTAD12 = ' ';
            SAL41.IMPRESION.TRIAGEESTAD34 = '  ';
            break;
    }
    switch (parseInt(SAL41.CAUSAESTAD)) {
        case 0:
            SAL41.IMPRESION.CAUSAESTAD = '__'
            break;
        default:
            SAL41.IMPRESION.CAUSAESTAD = SAL41.CAUSAESTAD;
            break;
    }
    switch (parseInt(SAL41.CODDIAGESTAD)) {
        case 0:
            SAL41.IMPRESION.CODDIAGESTAD = '__'
            break;
        default:
            SAL41.IMPRESION.CODDIAGESTAD = SAL41.CODDIAGESTAD;
            break;
    }
    switch (parseInt(SAL41.TIPDIAGESTAD)) {
        case 0:
            SAL41.IMPRESION.TIPDIAGESTAD = '__'
            break;
        default:
            SAL41.IMPRESION.TIPDIAGESTAD = SAL41.TIPDIAGESTAD;
            break;
    }
    switch (parseInt(SAL41.REPETIDESTAD)) {
        case 0:
            SAL41.IMPRESION.REPETIDESTAD = '__'
            break;
        default:
            SAL41.IMPRESION.REPETIDESTAD = SAL41.REPETIDESTAD;
            break;
    }
    switch (SAL41.ESTADSALESTAD) {
        case '1':
            SAL41.IMPRESION.VIVO = 'XX';
            SAL41.IMPRESION.MUERTO = '  ';
            SAL41.IMPRESION.REMITD = '  ';
            break;
        case '2':
            SAL41.IMPRESION.VIVO = '  ';
            SAL41.IMPRESION.MUERTO = 'XX';
            SAL41.IMPRESION.REMITD = '  ';
            break;
        case '3':
            SAL41.IMPRESION.VIVO = '  ';
            SAL41.IMPRESION.MUERTO = '  ';
            SAL41.IMPRESION.REMITD = '  ';
            break;
        default:
            SAL41.IMPRESION.VIVO = '__';
            SAL41.IMPRESION.MUERTO = '__';
            SAL41.IMPRESION.REMITD = '__';
            break;
    }
    console.debug(SAL41.NOMBREENF1, SAL41.NOMBREENF2);
    SAL41.IMPRESION.NOMBREENF1 = SAL41.NOMBREENF1.trim();
    SAL41.IMPRESION.NOMBREENF2 = SAL41.NOMBREENF2.trim();
    SAL41.IMPRESION.TABLA = $TABLAFACT;
    SAL41.IMPRESION.ACCESO = $_PUERTAESTAD.trim();
    SAL41.IMPRESION.BARRASFACT = $_USUA_GLOBAL[0].BARRAS.trim();
    // SAL41.IMPRESION.NUMEROBARRAFACT = $_SUCFACT + $_CLFACT + $_NROCTAFACT;
    SAL41.IMPRESION.FECHAELABORADO = $_FECHASALESTAD + ' ' + $_HRELABFACT + ':' + $_MNELABFACT;
    // SAL41.IMPRESION.RESOLDIAN = $_USUA_GLOBAL[0].RESOL_DIAN.trim();
    for (var i in SAL41.PREFIJOS.TABLA) {
        if (SAL41.PREFIJOS.TABLA[i].PREFIJO.trim() == $_PREFIJOFACT.trim()) {
            SAL41.IMPRESION.RESOLDIAN = SAL41.PREFIJOS.TABLA[i].AUT_DIAN;
        }
    }
    SAL41.IMPRESION.VLRIVAFACT = $_VLRIVAFACT;
    SAL41.IMPRESION.VLRTOTAL = 'TOTAL FACTURA: ' + PriceContMask_41.value;
    SAL41.IMPRESION.VLRCOPAGO = $_COPAGOESTIMFACT.toString();
    SAL41.IMPRESION.COPAGO = $_TIPOCOPAGOFACT;
    let saldo = parseInt(PriceContMask_41.value) - parseInt($_COPAGOESTIMFACT);
    SAL41.IMPRESION.SALDO = 'SALDO: ' + saldo.toString();
    SAL41.IMPRESION.OPERELABFACT = ' Elaboró: ' + $_OPERELABFACT;
    SAL41.IMPRESION.OPERCORRECFACT = 'Mod: ' + $_OPERELABFACT;
    SAL41.IMPRESION.ADMINW = 'Imprime: ' + SAL41.ADMINW;
    SAL41.IMPRESION.HORAESTAD = SAL41.HORAATENESTAD + ':' + SAL41.MINHORAESTAD;
    SAL41.IMPRESION.MOTIVOCONSULTA = 'Causa basica que origina la atención : ' + SAL41.MOTIVOCONSULTA;
    SAL41.ORIGINAL == 'S' ? SAL41.IMPRESION.ORIGINAL = '*** ORIGINAL ***' : SAL41.IMPRESION.ORIGINAL = '*** COPIA ****';

    // SAL41.IMPRESION.FECHASALESTAD = moment($_FECHASALESTAD).format('MMMM DD/YY');

    opcinesImpresion_INV414 = {
        datos: SAL41.IMPRESION,
        tipo: 'pdf',
        formato: 'salud/INV414.html',
        nombre: SAL41.NOMBREPDF
    }
    // _toggleNav();

    imprimir(opcinesImpresion_INV414, finImpresion_INV411)
}

function finImpresion_INV411() {
    _inputControl('reset');
    $('#NITMEDICO_41').addClass('hidden')
    $('#CLASEARTICULO_SAL41').addClass('hidden')
    $('#CODMACRO_SAL41').addClass('hidden')
    $('#CRONICO_SAL41').addClass('hidden')
    $('#FORMACOPAGO_SAL41').addClass('hidden')
    $('#TIPOCOPAGO_SAL41').addClass('hidden')
    $('#CLASSERV_450').addClass('hidden')
    $('#CODIGODIAG_SAL41').addClass('hidden')
    $('#ESPECIALIDADREMITE_SAL41').addClass('hidden')
    $('#INGRESO_SAL41').addClass('hidden')
    $('#CLASEPROCE_SAL41').addClass('hidden')
    $('#EMBARAZO_SAL41').addClass('hidden')
    $('#TIPOPROCEDIMIENTO_SAL41').addClass('hidden')
    $('.page-breadcrumb')[1].remove()
    _validarOpcion_SAL41();
    $('#TABLA_401 tbody').html('');
}

function _Imprimir10_41() {
    $_SWMOSTRAR = 2;
    $_REIMPW = '0';
    if (($_UNSERVFACT == '02') || ($_UNSERVFACT == '06')) {
        //
    } else {
        if ((SAL41.NITUSU == '0800162035') && ($_FORMATOW > 0) && ($_CLFACT == '0')) {
            $_FORMATOW = 5
        }
    }
    if ((SAL41.NITUSU == '0900565731') && ($_SWOCULTAR == '01')) {
        $_FORMATOW = 1
    }
    _Imprimir11_41();
}

function _Imprimir11_41() {
    switch ($_FORMATOW) {
        case 1:
            // INV411
            break;
        case 2:
            if ($_POSUSU == 'S') {
                // INV412
            } else {
                // INV411
            }
            break;
        case 3:
            // INV414
            break;
        case 4:
            // INV412
            break;
        case 5:
            if (SAL41.NITUSU == '0800162035') {
                // INV411
            } else {
                // INV412P
            }
            break;
    }
}


function _Montarhl7_41(callback) {
    for (var i in $TABLAFACT) {
        $I = i;
        $_ARTFACTI = $TABLAFACT[i].ARTICULO;
        $LLAVECUPI = $TABLAFACT[i].CODCUP;
        $DESCRIPCUPI = $TABLAFACT[i].DESCRIP_ART;
        if ($TABLAFACT[i + 1] == undefined) {
            var artfactm1 = '                 ';
        } else {
            var artfactm1 = $TABLAFACT[i + 1].ARTICULO;
        }
        if ($TABLAFACT[i + 2] == undefined) {
            var artfactm2 = '                 ';
        } else {
            var artfactm2 = $TABLAFACT[i + 2].ARTICULO;
        }
        var grupofact = $_ARTFACTI.substring(0, 2);
        $_DATOSETCUPK = $TABLAFACT[i].DATOSETCUP;
        if (grupofact.trim() == '' || grupofact == 'XX' || grupofact == 'MX' || grupofact == 'MQ') {
            $_SWINVALID = 0;
        } else {
            // if (datosetcup.trim() = ! '') {
            //     $_SWBUSCAR2 = 0;
            //     _Buscarcupsppal_41();
            //     if ($_SWBUSCAR2 = 1) {
            //         if ($TABLAFACT[i + 1].$_ARTFACTI == datosetcup) {
            //             $TABLAFACT[i].CISCUP == 'N';
            //         }
            //         else {
            //             $TABLAFACT[i].CISCUP == 'S';
            //         }
            //     }
            // }
            $_SWBUSCAR = 0;
            $_SWBUSCAR2 = 0; // COMPRUEBA DE QUE NO HALLA REPETIDOS
            _Buscarcupsrep_41();
            if ((i == 1) && (artfactm1.trim() == '') && (artfactm2.trim() == '')) {
                $TABLAFACT[i].CISCUP == 'N';
            }
            if ($_SWBUSCAR2 == 0) {
                if (grupofact == '88') {
                    $TABLAFACT[i].CISCUP == 'N';
                    $_SWPACI = 0;
                }
            }
            $_ARTLNK = $_ARTFACTI;
            if ($_CISCUP == 'S') {
                if ($_SWPACI == 0) {
                    $_SWPACI = 1;
                    switch (SAL41.NITUSU) {
                        case '0830092718':
                            $EMPRMSGL1 = 1;
                            break;
                        case '0830092719':
                            $EMPRMSGL1 = 2;
                            break;
                        case '0900193162':
                            $EMPRMSGL1 = 3;
                            break;
                        default:
                            $EMPRMSGL1 = 1;
                            break;
                    }
                    if (SAL41.MEDOTRFACT == '3319') {
                        $_SUCFACT = 'T6';
                    }
                    $SUCMSGL1 = $_SUCFACT;
                    $CLMSGL1 = $_CLFACT;
                    $NROMSGL1 = SAL41.NROFACT;
                    $ITEMMSGL1 = $I;
                    let datos_envio = datosEnvio();
                    datos_envio += '|' + $EMPRMSGL1
                    datos_envio += '|' + $SUCMSGL1
                    datos_envio += '|' + $CLMSGL1
                    datos_envio += '|' + $NROMSGL1
                    datos_envio += '|' + $ITEMMSGL1
                    datos_envio += '|' + $_IDPACNUM
                    datos_envio += '|' + $_DESCRIPPACI.substring(0, 15);
                    datos_envio += '|' + $_DESCRIPPACI.substring(15, 30);
                    datos_envio += '|' + $_DESCRIPPACI.substring(30, 42);
                    datos_envio += '|' + $_DESCRIPPACI.substring(42, 54);
                    datos_envio += '|' + $_NACIMPACI;
                    datos_envio += '|' + $_SEXOPACI;
                    datos_envio += '|' + $_DIRECCPACI;
                    console.debug(datos_envio);
                    SolicitarDll({ datosh: datos_envio }, _dataHL7001_41, get_url("APP/SALUD/HL7001.DLL"));
                }
                _HL70002_41();
            }
            let datos_envio = datosEnvio()
            // datos_envio += '|' + SAL41.LLAVEFACT
            // datos_envio += '|' + $_SWRECAL
            // datos_envio += '|' + SAL41.PUCUSU
            // datos_envio += '|' + SAL41.PREFIJOUSU
            // datos_envio += '|' + SAL41.NITUSU.padStart(10, '0');
            // datos_envio += '|' + SAL41.LOTEFARMUSU
            datos_envio += $_FECHAFACT + '|' + SAL41.NITUSU + SAL41.LLAVEFACT + '|' + $_PREFIJOFACT + $_NROCTAFACT + '|' + SAL41.IDHISTORIAFACT + '|' + $_DESCRIPPACI + '|' + $_GRUPOFACT + '|' + $_CODARTFACT.padEnd(13, ' ') + '|' + $_DESCRIPCUP + '|' + $_MEDAYUFACT + '|' + $_DESCRIPPROF + '|' + $_REGMEDPROF + '|' + SAL41.BIRADSFACT + '|' + SAL41.EDAD.vlr_edad + SAL41.EDAD.unid_edad.padStart(3, '0') + '|' + $_SEXOPACI + '|' + SAL41.BLOQUEOIMPFACT + '|' + $_EMAILPACI
            console.debug(datos_envio);
            SolicitarDll({ datosh: datos_envio }, _dataRXWEB01, get_url("APP/SALUD/RX-WEB01.DLL"));
        }
    }
    // _Descargarinvent_41();
    callback();
}

function _dataRXWEB01(data) {
    console.debug(data);
    data = data.split('|');
    $_CODLOTEFACT = '****';

}

function _dataHL7001_41(data) {
    data = data.split('|');
    $NOMSALIDA = data[0].trim();
    $_TIPOMSGW = 'ADT-';
    $_ESTADOW = 0;
    let datos_envio = datosEnvio()
    datos_envio += '|' + SAL41.LLAVEFACT
    datos_envio += '|' + $I
    datos_envio += '|' + $_ESTADOW
    datos_envio += '|' + $_FECHAFACT
    datos_envio += '|' + $NOMSALIDA
    datos_envio += '|' + $_TIPOMSGW
    SolicitarDll({ datosh: datos_envio }, _dataHL7000_41, get_url("APP/SALUD/HL7000.DLL"));
}

function _dataHL7000_41(data) {
    data = data.split('|');
    if (data[0].trim() == '00') {
        console.debug('00')
    } else if (data[0].trim() == '01') {

    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _HL70002_41() {
    $DESCRIPCUPI.trim() == '' ? $DESCRIPCUPI = $LLAVECUPI : $DESCRIPCUPI = $DESCRIPCUPI;
    switch (SAL41.NITUSU) {
        case '0830092718':
            $EMPRMSGL1 = 1;
            break;
        case '0830092719':
            $EMPRMSGL1 = 2;
            break;
        case '0900193162':
            $EMPRMSGL1 = 3;
            break;
        default:
            $EMPRMSGL1 = 1;
            break;
    }
    if (SAL41.MEDOTRFACT == '3319') {
        $_SUCFACT = 'T6';
    }
    $SUCMSGL1 = $_SUCFACT;
    $CLMSGL1 = $_CLFACT;
    $NROMSGL1 = SAL41.NROFACT;
    $ITEMMSGL1 = $I;
    $
    let datos_envio = datosEnvio
    datos_envio += '|' + $_CODCIUUSU
    datos_envio += '|' + SAL41.NUIRUSU
    datos_envio += '|' + SAL41.LLAVEFACT
    datos_envio += '|' + SAL41.LLAVEFACT
    datos_envio += '|' + $EMPRMSGL1
    datos_envio += '|' + $SUCMSGL1
    datos_envio += '|' + $CLMSGL1
    datos_envio += '|' + $NROMSGL1
    datos_envio += '|' + $ITEMMSGL1
    datos_envio += '|' + SAL41.LLAVEFACT
    datos_envio += '|' + $_IDPACNUM
    datos_envio += '|' + $_DESCRIPPACI.substring(0, 15);
    datos_envio += '|' + $_DESCRIPPACI.substring(15, 30);
    datos_envio += '|' + $_DESCRIPPACI.substring(30, 42);
    datos_envio += '|' + $_DESCRIPPACI.substring(42, 54);
    datos_envio += '|' + $_NACIMPACI;
    datos_envio += '|' + $_SEXOPACI;
    datos_envio += '|' + $_DIRECCPACI;
    datos_envio += '|' + $_CIUDADPACI;
    datos_envio += '|' + $_DIRECCPACI;
    datos_envio += '|' + $_TELEFONOPACI;
    datos_envio += '|' + $_CELPACI;
    datos_envio += '|' + $_ESTCIVPACI;
    datos_envio += '|' + $_HORACITFACT;
    datos_envio += '|' + $_REMITEFACT;
    datos_envio += '|' + $_CLFACT;
    datos_envio += '|' + $_ARTLNK;
    datos_envio += '|' + SAL41.VLRLATERFACT;
    datos_envio += '|' + $_CAUSAESTAD;
    datos_envio += '|' + $_DESCRIPTER2;
    datos_envio += '|' + $_PUERTAESTAD;
    datos_envio += '|' + $_DESCRIPPROF2;
    datos_envio += '|' + $_REGMEDPROF;
    datos_envio += '|' + $_DESCRIPCUPI;
    SolicitarDll({ datosh: datos_envio }, _dataHL7002_41, get_url("APP/SALUD/HL7002.DLL"));
}

function _dataHL7002_41(data) {
    data = data.split('|');
    if (data[0].trim() == '00') {
        $_TIPOMSGW = 'ORM-';
        $_ESTADOW = 0;
        let datos_envio = datosEnvio()
        datos_envio += '|' + SAL41.LLAVEFACT
        datos_envio += '|' + $I
        datos_envio += '|' + $_ESTADOW
        datos_envio += '|' + $_FECHAFACT
        datos_envio += '|' + $NOMSALIDA
        datos_envio += '|' + $_TIPOMSGW
        SolicitarDll({ datosh: datos_envio }, _dataHL70002_41, get_url("APP/SALUD/HL7000.DLL"));
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _dataHL70002_41(data) {
    data = data.split('|');
    console.debug(data[1]);
    if (data[0].trim() == '00') {
        console.debug('00');
    } else if (data[0].trim() == '01') {
        console.debug('01');
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _Buscarcupsppal_41() {
    for (var k in $TABLAFACT) {
        if ($TABLAFACT[k].ARTICULO == $_DATOSETCUPK) {
            $_SWBUSCAR2 = 1;
        }
        if ($TABLAFACT[k].ARTICULO == $_ARTFACTI) {
            $_SWBUSCAR3++;
        }
    }
}

function _Buscarcupsrep_41() {
    for (var k in $TABLAFACT) {
        var codlote = $TABLAFACT[k].COD_LOTE;
        if (codlote == '****') {
            $_SWBUSCAR2 = 1;
        }
    }
}

function _Buscarpendiente_41() {
    for (var i = 0; i < $('#TABLA_401 tbody').length; i++) {
        let cant_fact = $('#TABLA_401 tbody tr')[i].getElementsByTagName("td")[3];
        let alm_fact = $('#TABLA_401 tbody tr')[i].getElementsByTagName("td")[2];
        if ((parseFloat(cant_fact) = !0) && (alm_fact == 'SIN99')) {
            $_SWBUSCAR3++;
        }
    }
}

function _Datohonorarios_41() {
    $_VLRARTW = '0';
    let containerfecha = $_FECHAFACT.split('-');
    $_ANOFACT = containerfecha[0];
    if ((parseInt($_ANOFACT) > 01) && (SAL41.FORMALIQTAB == '2')) {
        if (($_CLFACT == '1') || ($_CODTAB == 'SO')) {
            SAL41.FORMALIQTAB = '4';
        }
    }
    switch (SAL41.FORMALIQTAB) {
        case '1':
            $_VLRCIRUW = Math.round(SAL41.MONTOTAB * parseFloat($_HNQUIRTAR));
            $_VLRAYUDW = Math.round(SAL41.MONTOTAB * parseFloat($_HNAYUDTAR));
            $_VLRANESW = Math.round(SAL41.MONTOTAB * parseFloat($_HNANESTAR));
            parseInt(SAL41.MONTOTAB) < 21 ? $_J = "01" : parseInt(SAL41.MONTOTAB) < 31 ? $_J = "02" : parseInt(SAL41.MONTOTAB) < 41 ? $_J = "03" : parseInt(SAL41.MONTOTAB) < 51 ? $_J = "04" : parseInt(SAL41.MONTOTAB) < 61 ? $_J = "05" : parseInt(SAL41.MONTOTAB) < 71 ? $_J = "06" : parseInt(SAL41.MONTOTAB) < 81 ? $_J = "07" : parseInt(SAL41.MONTOTAB) < 91 ? $_J = "08" : parseInt(SAL41.MONTOTAB) < 101 ? $_J = "09" : parseInt(SAL41.MONTOTAB) < 111 ? $_J = "10" : parseInt(SAL41.MONTOTAB) < 131 ? $_J = "11" : parseInt(SAL41.MONTOTAB) < 151 ? $_J = "12" : parseInt(SAL41.MONTOTAB) < 171 ? $_J = "13" : parseInt(SAL41.MONTOTAB) < 201 ? $_J = "14" : parseInt(SAL41.MONTOTAB) < 231 ? $_J = "15" : parseInt(SAL41.MONTOTAB) < 261 ? $_J = "16" : parseInt(SAL41.MONTOTAB) < 291 ? $_J = "17" : parseInt(SAL41.MONTOTAB) < 321 ? $_J = "18" : parseInt(SAL41.MONTOTAB) < 351 ? $_J = "19" : parseInt(SAL41.MONTOTAB) < 381 ? $_J = "20" : parseInt(SAL41.MONTOTAB) < 411 ? $_J = "21" : $_J = "22";
            $_VLRSALAW = $_DRSALATAR[$_J];
            $_VLRMATW = $_MATQUITAR[$_J];
            break;
        case '2':
            $_J = SAL41.MONTOTAB;
            if ($_J > 29 || $_J < 1) {
                $_J = 1;
            }
            $_VLRCIRUW = $_TABLATAR[$_J].HNQUIRTAR;
            $_VLRAYUDW = $_TABLATAR[$_J].HNAYUDTAR;
            $_VLRANESW = $_TABLATAR[$_J].HNANESTAR;
            if (SAL41.GRSERTAB == '72' || SAL41.GRSERTAB == '73') {
                $_VLRMATW = 0;
            } else {
                if ($_CRUENTAFACT == '2') {
                    // INV401BC
                    // LINEA 8440
                } else {
                    $_VLRMATW = $_TABLATAR[$_J].MATQUITAR;
                }
            }
            break;
        case '4':
            $_J = Math.round(SAL41.MONTOTAB);
            if ($_J > 29 || $_J < 1) {
                $_J = 1;
            }
            $_VLRCIRUW = Math.round(parseFloat($_SALMINTAR) * parseFloat($_TABLATAR[$_J].HNQUIRTAR));
            $_VLRAYUDW = Math.round(parseFloat($_SALMINTAR) * parseFloat($_TABLATAR[$_J].HNAYUDTAR));
            $_VLRANESW = Math.round(parseFloat($_SALMINTAR) * parseFloat($_TABLATAR[$_J].HNANESTAR));
            if (SAL41.GRSERTAB == '72' || SAL41.GRSERTAB == '73') {
                $_VLRMATW = 0;
            } else {
                if ($_CRUENTAFACT == '2') {
                    let URL = get_url("APP/SALUD/SAL401BC.DLL");
                    postData({ datosh: datosEnvio() + $_PREFIJOFACT + $_NROCTAFACT + '|' + 4 + '|' + 'XX39305' }, URL)
                        .then(data => {
                            console.debug(data);
                            $_VLRMATW = data.VLR_MAT;
                        })
                        .catch(err => {
                            console.debug(err);
                        })
                } else {
                    $_VLRMATW = 0;
                    $_VLRMATW = $_TABLATAR[$_J].MATQUITAR;
                }
            }
            break;
        default:
            $_VLRCIRUW = 0;
            $_VLRAYUDW = 0;
            $_VLRANESW = 0;
            $_VLRMATW = 0;
            $_VLRSALAW = 0;
            break;
    }
    if ($_CODTAR == 'H4') {
        $_VALORAPROX = Math.round(parseFloat($_VLRCIRUW) / $_SWAPR);
        $_VLRCIRUW = Math.round($_VALORAPROX * $_SWAPR);
        $_VALORAPROX = Math.round(parseFloat($_VLRAYUDW) / $_SWAPR);
        $_VLRAYUDW = Math.round($_VALORAPROX * $_SWAPR);
        $_VALORAPROX = Math.round(parseFloat($_VLRANESW) / $_SWAPR);
        $_VLRANESW = Math.round($_VALORAPROX * $_SWAPR);
        $_VALORAPROX = Math.round(parseFloat($_VLRMATW) / $_SWAPR);
        $_VLRMATW = Math.round($_VALORAPROX * $_SWAPR);
        $_VALORAPROX = Math.round(parseFloat($_VLRSALAW) / $_SWAPR);
        $_VLRSALAW = Math.round($_VALORAPROX * $_SWAPR);

        $_VLRCIRUW = Math.round($_VLRCIRUW * $_FACTORW);
        $_VLRAYUDW = Math.round($_VLRAYUDW * $_FACTORW);
        $_VLRANESW = Math.round($_VLRANESW * $_FACTORW);
        if ($_FACTORW < 1) {
            $_VLRMATW = Math.round($_VLRMATW * $_FACTORW);
            $_VLRSALAW = Math.round($_VLRSALAW * $_FACTORW);
        } else {
            $_VLRMATW = Math.round($_VLRMATW * 1);
            $_VLRSALAW = Math.round($_VLRSALAW * 1);
        }
    } else {
        if (SAL41.NITUSU == '0892000401') {
            $_VALORAPROX = Math.round(parseFloat($_VLRCIRUW) / $_SWAPR);
            $_VLRCIRUW = Math.round($_VALORAPROX * $_SWAPR);
            $_VALORAPROX = Math.round(parseFloat($_VLRAYUDW) / $_SWAPR);
            $_VLRAYUDW = Math.round($_VALORAPROX * $_SWAPR);
            $_VALORAPROX = Math.round(parseFloat($_VLRANESW) / $_SWAPR);
            $_VLRANESW = Math.round($_VALORAPROX * $_SWAPR);
            $_VALORAPROX = Math.round(parseFloat($_VLRMATW) / $_SWAPR);
            $_VLRMATW = Math.round($_VALORAPROX * $_SWAPR);
            $_VALORAPROX = Math.round(parseFloat($_VLRSALAW) / $_SWAPR);
            $_VLRSALAW = Math.round($_VALORAPROX * $_SWAPR);
            if ($_FACTORW < 1) {
                if ($_CUPW == 'XX39305') {
                    $_VLRMATW = Math.round($_VLRMATW * 1);
                } else {
                    $_VLRMATW = Math.round($_VLRMATW * $_FACTORW);
                }
            }
        } else {
            $_VLRMATW = Math.round($_VLRMATW * 1);
        }
    }
    _Ventanacirugia_41();
}

function _Ventanacirugia_41() {
    SAL41.CONTEOMEDCIR = 0;
    $('#NITMEDICO_41').removeClass('hidden');
    $('#TABLA_401 tbody').append(
        '<tr>' +
        '<td style="width: 5%">' + SAL41.CONTEO + '</td>' +
        '<td style="width: 10%">' + $('#codservicio2_SAL41').val() + '</td>' +
        '<td style="width: 30%">' + $('#detalle_SAL41').val() + '</td>' +
        '<td style="width: 10%">' + ' ' + '</td>' +
        '<td style="width: 10%">' + ' ' + '</td>' +
        '<td style="width: 10%">' + ' ' + '</td>' +
        '<td style="width: 10%">' + PriceUnitMask_41.value + '</td>' +
        '<td style="width: 15%">' + ' ' + '</td>' +
        '</tr>'
    );
    var prof = ['CIRUJANO', 'AYUDANTIA', 'ANESTESIOA', 'MAT.QUIRG', 'DERECH.SALA'];
    for (var i in prof) {
        $('#TABLA_401 tbody').append(
            '<tr>' +
            '<td style="width: 5%">' + ' ' + '</td>' +
            '<td style="width: 10%">' + ' ' + '</td>' +
            '<td style="width: 30%">' + ' ' + '</td>' +
            '<td style="width: 10%">' + ' ' + '</td>' +
            '<td style="width: 10%">' + ' ' + '</td>' +
            '<td style="width: 10%">' + prof[i] + '</td>' +
            '<td style="width: 10%">' + ' ' + '</td>' +
            '<td style="width: 10%">' + ' ' + '</td>' +
            '<td style="width: 15%">' + ' ' + '</td>' +
            '</tr>'
        )
    }
    // let nitmedico = $('#elementos-tabla #nitmedico_SAL41').length
    // if (nitmedico > 0) {
    //     _Evaluarnitmedico_41();
    // } else {
    //     $('#elementos-tabla').append(
    //         '<div class="col-md-4 col-sm-4 col-xs-12">' +
    //         '<div class="inline-inputs">' +
    //         '<label class="col-md-4 col-sm-4 col-xs-12">Nit Medico:</label>' +
    //         '<div class="input-group col-md-4 col-sm-4 col-xs-12" id="NITMEDICO_41">' +
    //         '<input id="nitmedico_SAL41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1">' +
    //         '</div>' +
    //         '<div class="input-group col-md-4 col-sm-4 col-xs-12">' +
    //         '<input id="nitmedicod_SAL41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12">' +
    //         '</div>' +
    //         '</div>' +
    //         '</div>'
    //     );
    //     _inputControl('disabled');
    // }
    _Limpiarcampos_41();
    _Evaluarnitmedico_41();
    $_CODSERTAB.length > 0 ? $_CODSERTAB = $_CODSERTAB : $_CODSERTAB = '';
    $_DIASTRATAFACT = '' ? $_DIASTRATAFACT = 0 : $_DIASTRATAFACT = $_DIASTRATAFACT;
    $_CODLOTEFACT = '' ? $_CODLOTEFACT = '    ' : $_CODLOTEFACT = $_CODLOTEFACT;
    $TABLAFACT = [
        { ALMACEN: ' ', ARTICULO: $_ARTFACT, COD_LOTE: $_CODLOTEFACT, CANTIDAD: ' ', VALOR_UNIT: PriceUnitMask_41.value, DIASTRATAFACT: $_DIASTRATAFACT, VLRLATERFACT: SAL41.VLRLATERFACT, DATOSETCUP: $_DATOSETCUP, CISCUP: $_CISCUP, DESCRIP_ART: $_DESCRIPCUP, CODCUP: $_CODSERTAB, VALOR_FACT: PriceTotalMask_41.value }
    ]
    console.debug($TABLAFACT);
}

function _Evaluarnitmedico_41() {
    _Nitmedico_41();
    SAL41.CONTEOMEDCIR = SAL41.CONTEOMEDCIR + 1;
    _toggleF8([
        { input: 'nitmedico', app: 'SAL41', funct: _ventanaProfesionales3_41 }
    ]);
    switch (SAL41.CONTEOMEDCIR) {
        case 1:
            _FloatText({ estado: 'on', msg: [{ mensaje: 'CIRUJANO' }] });
            break;
        case 2:
            _FloatText({ estado: 'on', msg: [{ mensaje: 'AYUDANTIA' }] });
            break;
        case 3:
            _FloatText({ estado: 'on', msg: [{ mensaje: 'ANESTESIA' }] });
            break;
        case 4:
            _FloatText({ estado: 'on', msg: [{ mensaje: 'MAT.QUIRURG' }] });
            break;
        case 5:
            _FloatText({ estado: 'on', msg: [{ mensaje: 'DERECH.SALA' }] });
            break;
    }
    console.debug(SAL41.CONTEOMEDCIR);
    if (SAL41.CONTEOMEDCIR < 4) {
        console.debug('NIT MEDICO')
        validarInputs({
            form: '#NITMEDICO_41',
            orden: '1'
        },
            () => { _Evaluarfecha2_41() },
            _validarnitmedico
        )
    } else {
        console.debug('NO NIT DEL MEDICO');
        _Aceptarhonorarioscir_SAL41();
    }
}

function _validarnitmedico() {
    _FloatText({ estado: 'off' });
    SAL41['NITMEDW'] = $('#nitmedico_SAL41').val();
    SAL41.NITMEDW = SAL41.NITMEDW.padStart(10, '0');
    switch (SAL41.CONTEOMEDCIR) {
        case 1:
            $_MEDCIRFACT = SAL41.NITMEDW.padStart(10, '0')
            break;
        case 2:
            $_MEDAYUFACT = SAL41.NITMEDW.padStart(10, '0')
            break;
        case 3:
            $_MEDANEFACT = SAL41.NITMEDW.padStart(10, '0')
            break;
    }
    if (parseInt(SAL41.NITMEDW) == 0) {
        CON851('01', '01', null, 'error', 'Error');
        _Evaluarnitmedico_41();
    } else if (SAL41.CONTEOMEDCIR == 1) {
        SAL41['NROCIRFACT'] = 0;
        SAL41['MULTFACT'] = 1;
        SAL41['SWBILAT'] = 'N';
        SAL41['GRUPOCIRW'] = '';
        let URL = get_url("APP/SALUD/INV401M.DLL");
        postData({ datosh: datosEnvio() + $_PREFIJOFACT + $_NROCTAFACT + '|' + SAL41.LLAVEFACT + '|' + SAL41.IDHISTORIAFACT.padStart(15, '0') + '|' + $_FECHAFACT.replace(/-/gi, '') + '|' }, URL)
            .then(data => {
                console.debug(data);
                SAL41.INV401M = data.CIRUGIAS;
                if (SAL41.INV401M[0].MULT.trim() != '') {
                    console.debug('tiene algo');
                    SAL41.MULTFACT = SAL41.INV401M[0].MULT;
                }
                if (SAL41.INV401M[0].GRUPO.trim() != '') {
                    console.debug('tiene algo');
                    SAL41.NROCIRFACT = SAL41.INV401M[0].GRUPO;
                }
                switch (SAL41.MULTFACT.toString()) {
                    case '1':
                        SAL41.DESCRIPMULT = 'UNILATERAL';
                        break;
                    case '2':
                        SAL41.DESCRIPMULT = 'MISMA VIA DIF. MEDICO';
                        break;
                    case '3':
                        SAL41.DESCRIPMULT = 'MISMA VIA IGUAL MEDICO';
                        break;
                    case '4':
                        SAL41.DESCRIPMULT = 'DIF. VIA DIF. MEDICO';
                        break;
                    case '5':
                        SAL41.DESCRIPMULT = 'DIF. VIA MISMO MEDICO';
                        break;
                }
                console.debug(SAL41.DESCRIPMULT);
                var ventanahonorarios_SAL41 = bootbox.dialog({
                    message: '<div class="col-12 text-center">' + SAL41.MULTFACT + ' ' + SAL41.DESCRIPMULT + '</div>',
                    closeButton: false,
                    buttons: {
                        aceptar: {
                            label: 'Aceptar',
                            className: 'btn-primary',
                            callback: function () {
                                setTimeout(_SAL41_113, 30);
                                ventanahonorarios_SAL41.on('off');
                            }
                        }
                    }
                });
                ventanahonorarios_SAL41.init($('.modal-footer').hide());
                ventanahonorarios_SAL41.on('keyup', function (e) {
                    $(".btn-primary").click();
                });
            })
            .catch(err => {
                console.debug(err);
            })
    } else {
        _SAL41_113();
    }
}

function _SAL41_113() {
    let datos_envio = datosEnvio()
    datos_envio += SAL41.ADMINW + '|' + SAL41.NITMEDW + '|';
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_113, get_url('APP/SALUD/SAL41-11.DLL'))
}

function _dataSAL41_113(data) {
    console.debug(data, 'SAL41 11_3');
    data = data.split('|');
    $_DESCRIPPROF3 = data[1].trim();
    $_ESTADOPROF3 = data[2].trim();
    $_CLPROF3 = [data[3].trim(), data[4].trim(), data[5].trim(), data[6].trim(), data[7].trim(), data[8].trim(), data[9].trim()];
    $_ESPPROF3 = [data[10].trim(), data[11].trim(), data[12].trim(), data[13].trim(), data[14].trim(), data[15].trim(), data[16].trim(), data[17].trim(), data[18].trim(), data[19].trim()]
    $_DIVPROF3 = data[20].trim();
    $_ATIENDEPROF3 = data[21].trim();
    $_ATIENDEW3 = $_PERSONALELAB3 = $_ATIENDEPROF3;
    // _validarnitmedico2();
    switch ($_CLFACT) {
        case '0':
            var k = '1';
            break;
        case '1':
            var k = '2';
            break;
        case '2':
            var k = '3';
            break;
        case '3':
            var k = '4';
            break;
        case '4':
            var k = '5';
            break;
        case '5':
            var k = '6';
            break;
        case '6':
            var k = '2';
            break;
        case '7':
            var k = '7';
            break;
    }
    if ($_CLPROF3[k] == 'N') {
        CON851('82', '82', null, 'error', 'Error');
        $('#nitmedico_SAL41').val('');
        _Evaluarnitmedico_41();
    } else {
        SAL41.ESPECLAB = $_ESPPROF3[1]
        _Aceptarhonorarioscir_SAL41();
    }
}

function _Aceptarhonorarioscir_SAL41() {
    switch (SAL41.CONTEOMEDCIR) {
        case 1:
            if (SAL41.MULTFACT == 6) {
                $_VLRCIRUW = $_VLRCIRUW * 1.75
                console.debug($_VLRCIRUW);
            } else {
                switch (SAL41.NROCIRFACT) {
                    case '0':
                        SAL41.NROCIRFACT = 1;
                        break;
                    case '1':
                        SAL41.NROCIRFACT = 1;
                        break;
                    case '2':
                        if (SAL41.GRUPOCIRW < SAL41.GRUPOCIRFACT) {
                            CON851('01', '01', null, 'warning', 'Advertencia!');
                        }
                        switch (SAL41.MULTFACT) {
                            case 2:
                                if ($_CODTAB == 'I4') {
                                    $_VLRCIRUW = $_VLRCIRUW * 0.40;
                                    console.debug($_VLRCIRUW);
                                } else {
                                    $_VLRCIRUW = $_VLRCIRUW * 0.50;
                                    console.debug($_VLRCIRUW);
                                }
                                break;
                            case 3:
                                if ($_CODTAB == 'I4') {
                                    $_VLRCIRUW = $_VLRCIRUW * 0.55;
                                    console.debug($_VLRCIRUW);
                                } else {
                                    $_VLRCIRUW = $_VLRCIRUW * 0.50;
                                    console.debug($_VLRCIRUW);
                                }
                            case 4:
                                $_VLRCIRUW = $_VLRCIRUW * 0.50;
                                console.debug($_VLRCIRUW);
                            case 5:
                                if ($_CODTAB == 'I4') {
                                    $_VLRCIRUW = $_VLRCIRUW * 0.65;
                                    console.debug($_VLRCIRUW);
                                } else {
                                    $_VLRCIRUW = $_VLRCIRUW * 0.75;
                                    console.debug($_VLRCIRUW);
                                }
                            default:
                                $_VLRCIRUW = $_VLRCIRUW * 0.50;
                                console.debug($_VLRCIRUW);
                                break;
                        }
                }
            }
            if ($_CODTAR != 'H4') {
                if (SAL41.PUCUSU != '3') {
                    $_VALORAPROX = $_VLRCIRUW / $_SWAPR;
                    $_VLRCIRUW = $_VALORAPROX * $_SWAPR
                }
            }
            $_VLRARTW = $_VLRCIRUW;
            console.debug($_VLRARTW);
            break;
        // MOVER A LA VARIABLE QUE VA A GRABAR TABLA
        case 2:
            if (SAL41.MULTFACT == 6) {
                $_VLRAYUDW = $_VLRAYUDW * 1.75
                console.debug($_VLRAYUDW);
            } else {
                switch (SAL41.NROCIRFACT) {
                    case '0':
                        SAL41.NROCIRFACT = 1;
                        break;
                    case '1':
                        SAL41.NROCIRFACT = 1;
                        break;
                    case '2':
                        switch (SAL41.MULTFACT) {
                            case 2:
                                if ($_CODTAB == 'I4') {
                                    $_VLRAYUDW = $_VLRAYUDW * 0.40;
                                    console.debug($_VLRAYUDW);
                                } else {
                                    $_VLRAYUDW = $_VLRCIRUW * 0.50;
                                    console.debug($_VLRAYUDW);
                                }
                                break;
                            case 3:
                                if ($_CODTAB == 'I4') {
                                    $_VLRAYUDW = $_VLRAYUDW * 0.55;
                                    console.debug($_VLRAYUDW);
                                } else {
                                    $_VLRAYUDW = $_VLRAYUDW * 0.50;
                                    console.debug($_VLRAYUDW);
                                }
                            case 4:
                                $_VLRAYUDW = $_VLRAYUDW * 0.50;
                                console.debug($_VLRAYUDW);
                            case 5:
                                if ($_CODTAB == 'I4') {
                                    $_VLRAYUDW = $_VLRAYUDW * 0.65;
                                    console.debug($_VLRAYUDW);
                                } else {
                                    $_VLRAYUDW = $_VLRAYUDW * 0.75;
                                    console.debug($_VLRAYUDW);
                                }
                            default:
                                $_VLRAYUDW = $_VLRAYUDW * 0.50;
                                console.debug($_VLRAYUDW);
                                break;
                        }
                }
            }
            if ($_CODTAR != 'H4') {
                if (SAL41.PUCUSU != '3') {
                    $_VALORAPROX = $_VLRAYUDW / $_SWAPR;
                    $_VLRAYUDW = $_VALORAPROX * $_SWAPR
                }
            }
            $_VLRARTW = $_VLRAYUDW;
            console.debug($_VLRARTW);
            break;
        case 3:
            if (SAL41.MULTFACT == 6) {
                $_VLRANESW = $_VLRANESW * 1.75
                console.debug($_VLRANESW);
            } else {
                switch (SAL41.NROCIRFACT) {
                    case '0':
                        SAL41.NROCIRFACT = 1;
                        break;
                    case '1':
                        SAL41.NROCIRFACT = 1;
                        break;
                    case '2':
                        switch (SAL41.MULTFACT) {
                            case 2:
                                if ($_CODTAB == 'I4') {
                                    $_VLRANESW = $_VLRANESW * 0.40;
                                    console.debug($_VLRANESW);
                                } else {
                                    $_VLRANESW = $_VLRANESW * 0.50;
                                    console.debug($_VLRANESW);
                                }
                                break;
                            case 3:
                                if ($_CODTAB == 'I4') {
                                    $_VLRANESW = $_VLRANESW * 0.55;
                                    console.debug($_VLRANESW);
                                } else {
                                    $_VLRANESW = $_VLRANESW * 0.50;
                                    console.debug($_VLRANESW);
                                }
                            case 4:
                                $_VLRANESW = $_VLRANESW * 0.50;
                                console.debug($_VLRANESW);
                            case 5:
                                if ($_CODTAB == 'I4') {
                                    $_VLRANESW = $_VLRANESW * 0.65;
                                    console.debug($_VLRANESW);
                                } else {
                                    $_VLRANESW = $_VLRANESW * 0.75;
                                    console.debug($_VLRANESW);
                                }
                            default:
                                $_VLRANESW = $_VLRANESW * 0.50;
                                console.debug($_VLRANESW);
                                break;
                        }
                }
            }
            if ($_CODTAR != 'H4') {
                if (SAL41.PUCUSU != '3') {
                    $_VALORAPROX = $_VLRANESW / $_SWAPR;
                    $_VLRANESW = $_VLRANESW * $_SWAPR
                }
            }
            $_VLRARTW = $_VLRANESW;
            console.debug($_VLRARTW);
            break;
        case 4:
            if (SAL41.MULTFACT == 6) {
                $_VLRMATW = $_VLRMATW = $_VLRANESW * 1.75;
                console.debug($_VLRMATW);
            } else {
                if (SAL41.NROCIRFACT > 1) {
                    switch (SAL41.MULTFACT) {
                        case 2:
                            $_VLRMATW = 0;
                            break;
                        case 3:
                            $_VLRMATW = 0;
                            break;
                        case 4:
                            $_VLRMATW = $_VLRMATW * 0.75;
                            console.debug($_VLRMATW);
                        case 5:
                            $_VLRMATW = $_VLRMATW * 0.75;
                    }
                }
            }
            if ($_CODTAR != 'H4') {
                if (SAL41.PUCUSU != 3) {
                    $_VALORAPROX = $_VLRMATW / $_SWAPR
                    $_VLRMATW = $_VALORAPROX * $_SWAPR
                }
            }
            $_VLRARTW = $_VLRMATW;
            break;
        case 5:
            $_VLRSALAW = 0;
            if (SAL41.MULTFACT == 6) {
                if ($_CODTAB == 'IS') {
                    $_VLRSALAW = $_VLRSALAW = $_VLRANESW * 1.75;
                    console.debug($_VLRSALAW);
                } else {
                    $_VLRSALAW = $_VLRSALAW = $_VLRANESW * 1.50;
                    console.debug($_VLRSALAW);
                }
            } else {
                if (SAL41.NROCIRFACT > 1) {
                    switch (SAL41.MULTFACT) {
                        case 2:
                            $_VLRSALAW = $_VLRSALAW * 0.50;
                            console.debug($_VLRSALAW);
                            break;
                        case 3:
                            $_VLRMATW = 0;
                            break;
                        case 4:
                            $_VLRSALAW = $_VLRSALAW * 0.50;
                            console.debug($_VLRSALAW);
                        case 5:
                            $_VLRSALAW = $_VLRSALAW * 0.50;
                            console.debug($_VLRSALAW);
                    }
                }
            }
            if ($_CODTAR != 'H4') {
                if (SAL41.PUCUSU != 3) {
                    $_VALORAPROX = $_VLRSALAW / $_SWAPR
                    $_VLRSALAW = $_VALORAPROX * $_SWAPR
                }
            }
            $_VLRARTW = $_VLRSALAW;
            break;
    }
    _evaluarvlrartw_SAL41();
}

function _evaluarvlrartw_SAL41() {
    PriceTotalMask_41.typedValue = $_VLRARTW;
    validarInputs({
        form: '#VLRTOTAL_41',
        orden: '1'
    },
        function () { _Evaluarnitmedico_41() },
        () => {
            let fila = SAL41.CONTEOMEDCIR + 1;
            switch (fila) {
                case 2:
                    $('#TABLA_401 tbody tr:nth-child(' + fila + ')').html(
                        '<td style="width: 5%">' + ' ' + '</td>' +
                        '<td style="width: 10%">' + SAL41.NITMEDW + '</td>' +
                        '<td style="width: 30%">' + $_DESCRIPPROF3 + '</td>' +
                        '<td style="width: 10%">' + ' ' + '</td>' +
                        '<td style="width: 10%">' + 'CIRUJANO' + '</td>' +
                        '<td style="width: 10%">' + ' ' + '</td>' +
                        '<td style="width: 10%">' + ' ' + '</td>' +
                        '<td style="width: 15%">' + PriceTotalMask_41.value + '</td>'
                    )
                    break;
                case 3:
                    $('#TABLA_401 tbody tr:nth-child(' + fila + ')').html(
                        '<td style="width: 5%">' + ' ' + '</td>' +
                        '<td style="width: 10%">' + SAL41.NITMEDW + '</td>' +
                        '<td style="width: 30%">' + $_DESCRIPPROF3 + '</td>' +
                        '<td style="width: 10%">' + ' ' + '</td>' +
                        '<td style="width: 10%">' + 'AYUDANTIA' + '</td>' +
                        '<td style="width: 10%">' + ' ' + '</td>' +
                        '<td style="width: 10%">' + ' ' + '</td>' +
                        '<td style="width: 15%">' + PriceTotalMask_41.value + '</td>'
                    )
                    break;
                case 4:
                    $('#TABLA_401 tbody tr:nth-child(' + fila + ')').html(
                        '<td style="width: 5%">' + ' ' + '</td>' +
                        '<td style="width: 10%">' + SAL41.NITMEDW + '</td>' +
                        '<td style="width: 30%">' + $_DESCRIPPROF3 + '</td>' +
                        '<td style="width: 10%">' + ' ' + '</td>' +
                        '<td style="width: 10%">' + 'ANESTESIO' + '</td>' +
                        '<td style="width: 10%">' + ' ' + '</td>' +
                        '<td style="width: 10%">' + ' ' + '</td>' +
                        '<td style="width: 15%">' + PriceTotalMask_41.value + '</td>'
                    )
                    break;
                case 5:
                    $('#TABLA_401 tbody tr:nth-child(' + fila + ')').html(
                        '<td style="width: 5%">' + ' ' + '</td>' +
                        '<td style="width: 10%">' + ' ' + '</td>' +
                        '<td style="width: 30%">' + ' ' + '</td>' +
                        '<td style="width: 10%">' + ' ' + '</td>' +
                        '<td style="width: 10%">' + 'MAT.QUIRG.' + '</td>' +
                        '<td style="width: 10%">' + ' ' + '</td>' +
                        '<td style="width: 10%">' + ' ' + '</td>' +
                        '<td style="width: 15%">' + PriceTotalMask_41.value + '</td>'
                    )
                    break;
                case 6:
                    $('#TABLA_401 tbody tr:nth-child(' + fila + ')').html(
                        '<td style="width: 5%">' + ' ' + '</td>' +
                        '<td style="width: 10%">' + ' ' + '</td>' +
                        '<td style="width: 30%">' + ' ' + '</td>' +
                        '<td style="width: 10%">' + ' ' + '</td>' +
                        '<td style="width: 10%">' + 'DERECH.SALA' + '</td>' +
                        '<td style="width: 10%">' + ' ' + '</td>' +
                        '<td style="width: 10%">' + ' ' + '</td>' +
                        '<td style="width: 15%">' + PriceTotalMask_41.value + '</td>'
                    )
                    break;
            }

            _Almacenartablacirugia_SAL97C11();
            $('#vlrtotal_SAL41').val('');
            $('#nitmedico_SAL41').val('');
            if (SAL41.CONTEOMEDCIR == 5) {
                _Sumarvaloresciru_41();
            } else {
                _Evaluarnitmedico_41();
            }
        }
    )
}

function _Sumarvaloresciru_41() {
    let tabla = $('#TABLA_401 tbody tr');
    $_VALORBRUTO = 0;
    for (var i = 0; i < tabla.length; i++) {
        let cantidad = tabla[i].cells[7].textContent;
        cantidad = cantidad.replace(',', '');
        cantidad = parseFloat(cantidad);
        console.debug(cantidad);
        isNaN(cantidad) ? cantidad = 0 : cantidad = cantidad;
        $_VALORBRUTO = $_VALORBRUTO + cantidad;
        console.debug($_VALORBRUTO)
    }
    console.debug($_VALORBRUTO);
    switch ($_IVAARTW) {
        case '0':
            $_TARIVAW = '0';
            break;
        case '1':
            $_TARIVAW = SAL41.IVAUSU;
            break;
        case '2':
            $_TARIVAW = $_IVA2USU;
            break;
        case '3':
            $_TARIVAW = $_IVA3USU;
            break;
    }
    if (SAL41.ASUMEIVAUSU == 'S') {
        $_VALORBRUTO = Math.round($_VALORBRUTO / ((100 + $_TARIVAW) * 100));
    }
    switch ($_IVAARTW) {
        case '1':
            $_VALORBASE1IVA += $_VALORBRUTO;
            break;
        case '2':
            $_VALORBASE2IVA += $_VALORBRUTO;
            break;
        case '3':
            $_VALORBASE3IVA += $_VALORBRUTO;
            break;
    }
    if (((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) && ($_CLFACT == '2') && ($_GRUPOFACT == '98')) {
        SAL41.MEDOTRFACT = SAL41.NITUSU;
    }
    if ($_CLFACT == '5') {
        if (($_ARTFACT == '39145') || ($_ARTFACT == '35604')) {
            $_SWURG = '1';
        }
    }
    $_VALORBASE1IVA = $_VALORBASE2IVA = $_VALORBASE3IVA = 0;
    $_VLRTOTEDIT = $_VALORBRUTO;
    console.debug($_SWOCULTAR);
    $_VLRIVAFACT = ($_VALORBASE1IVA * SAL41.IVAUSU / 100) + ($_VALORBASE2IVA * SAL41.IVAUSU2 / 100) + ($_VALORBASE3IVA * SAL41.IVAUSU3 / 100);
    SAL41['VLRIVA1FACT'] = ($_VALORBASE1IVA * SAL41.IVAUSU / 100);
    SAL41['VLRIVA2FACT'] = ($_VALORBASE2IVA * SAL41.IVAUSU / 100);
    SAL41['VLRIVA3FACT'] = ($_VALORBASE3IVA * SAL41.IVAUSU / 100);
    $_VALORDESFACT = 0;
    $_VALORTOTAL = $_VALORBRUTO + $_VLRIVAFACT - $_VALORDESFACT;
    if ($_SWOCULTAR == '01') {
        PriceTotalMask_41.typedValue = '';
        PriceivaMask_41.typedValue = '';
        NetoFactMask_41.typedValue = '';
    } else {
        PriceContMask_41.typedValue = $_VLRTOTEDIT;
        PriceivaMask_41.typedValue = $_VLRIVAFACT;
        NetoFactMask_41.typedValue = $_VLRIVAFACT;
        console.debug($_VLRIVAFACT, $_VLRTOTEDIT);
    }
    _Datodescto_41();
}

function _Almacenartablacirugia_SAL97C11() {
    if ($('#TABLA_401 tbody tr').length < 2) {
        $_CODSERTAB.length > 0 ? $_CODSERTAB = $_CODSERTAB : $_CODSERTAB = '';
        $_DIASTRATAFACT = '' ? $_DIASTRATAFACT = 0 : $_DIASTRATAFACT = $_DIASTRATAFACT;
        $_CODLOTEFACT = '' ? $_CODLOTEFACT = '    ' : $_CODLOTEFACT = $_CODLOTEFACT;
        $TABLAFACT = [
            { ALMACEN: ' ', ARTICULO: SAL41.NITMEDW, COD_LOTE: $_CODLOTEFACT, CANTIDAD: ' ', VALOR_UNIT: ' ', DIASTRATAFACT: $_DIASTRATAFACT, VLRLATERFACT: SAL41.VLRLATERFACT, DATOSETCUP: ' ', CISCUP: ' ', DESCRIP_ART: $_DESCRIPPROF3, CODCUP: ' ', VALOR_FACT: PriceTotalMask_41.value }
        ]
        console.debug($TABLAFACT);
    } else {
        $TABLAFACT2 = { ALMACEN: ' ', ARTICULO: SAL41.NITMEDW, COD_LOTE: $_CODLOTEFACT, CANTIDAD: ' ', VALOR_UNIT: ' ', DIASTRATAFACT: $_DIASTRATAFACT, VLRLATERFACT: SAL41.VLRLATERFACT, DATOSETCUP: ' ', CISCUP: ' ', DESCRIP_ART: $_DESCRIPPROF3, CODCUP: ' ', VALOR_FACT: PriceTotalMask_41.value }
        $TABLAFACT.push($TABLAFACT2);
        console.debug($TABLAFACT)
    }
}

//////////////////////////////////////// LEER  PROMEDIO /////////////////////////////
function _Leerpromedio_41() {
    if ($_GRP1SAL != '9') {
        let datos_envio = datosEnvio()
        datos_envio += SAL41.ALMPREF + '|' + $_CODART + '|' + $_DIAFACT + '|' + SAL41.PUCUSU + '|'
        SolicitarDll({ datosh: datos_envio }, data => {
            console.debug(data, 'INV808S');
            data = data.split('|');
            $_SDOACTCANT = data[1].trim();
            $_SDOACTCANT = parseFloat($_SDOACTCANT);
            $_SDOACTVLR = data[2].trim();
            $_SDOACTVLR = parseFloat($_SDOACTVLR);
            isNaN($_SDOACTCANT) ? $_SDOACTCANT = 0 : $_SDOACTCANT = $_SDOACTCANT;
            isNaN($_SDOACTVLR) ? $_SDOACTVLR = 0 : $_SDOACTVLR = $_SDOACTVLR;
            if ((data[0].trim() == '00') || (data[0].trim() == '01')) {
                if ((parseFloat($_SDOACTCANT) == 0) || (parseFloat($_SDOACTVLR) == 0)) {
                    $_VLRPROMEDW = 0;
                } else {
                    $_VLRPROMEDW = $_SDOACTVLR / $_SDOACTCANT;
                }
            } else {
                CON852(data[0], data[1], data[2], _toggleNav);
            }
        }, get_url('APP/INVENT/INV808S.DLL'))
    }
}

//////////////////////////////////////// SUMAR VALORES /////////////////////////////
function _Sumarvalores_41() {
    let tabla = $('#TABLA_401 tbody tr');
    $_VALORBRUTO = 0;
    for (var i = 0; i < tabla.length; i++) {
        let cantidad = tabla[i].cells[7].textContent;
        cantidad = cantidad.replace(/,/g, '');
        cantidad = parseFloat(cantidad);
        $_VALORBRUTO = $_VALORBRUTO + cantidad;
    }
    console.debug($_VALORBRUTO);
    switch ($_IVAARTW) {
        case '0':
            $_TARIVAW = '0';
            break;
        case '1':
            $_TARIVAW = SAL41.IVAUSU;
            break;
        case '2':
            $_TARIVAW = $_IVA2USU;
            break;
        case '3':
            $_TARIVAW = $_IVA3USU;
            break;
    }
    if (SAL41.ASUMEIVAUSU == 'S') {
        $_VALORBRUTO = Math.round($_VALORBRUTO / ((100 + $_TARIVAW) * 100));
    }
    switch ($_IVAARTW) {
        case '1':
            $_VALORBASE1IVA += $_VALORBRUTO;
            break;
        case '2':
            $_VALORBASE2IVA += $_VALORBRUTO;
            break;
        case '3':
            $_VALORBASE3IVA += $_VALORBRUTO;
            break;
    }
    if (((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) && ($_CLFACT == '2') && ($_GRUPOFACT == '98')) {
        SAL41.MEDOTRFACT = SAL41.NITUSU;
    }
    if ($_CLFACT == '5') {
        if (($_ARTFACT == '39145') || ($_ARTFACT == '35604')) {
            $_SWURG = '1';
        }
    }
}

///////////////////////////////////////// BUSCAR INCREMENTO ////////////////////////
function _Buscarincremento_41() {
    if ($_INCREMTAB == 0) {
        if ($_CLFACT == '7') {
            switch ($_INCREMTAB) {
                case '90':
                    $_INCREMTAB = 2;
                    break;
                case '87':
                    $_INCREMTAB = 3;
                    break;
                case '88':
                    $_INCREMTAB = 3;
                    break;
                case '89':
                    $_INCREMTAB = 5;
                    break;
                default:
                    if (parseInt($_GRUPOFACT) < 87) {
                        $_INCREMTAB = 1;
                    } else {
                        $_INCREMTAB = 4;
                    }
                    break;
            }
        } else {
            $_INCREMTAB = parseInt($_CLFACT);
        }
    }
    if (($_SALMINTAR == 0) || ($.isNumeric($_SALMINTAR))) {
        $_SALMINTAR = $_SALMINW;
    }
    if ((SAL41.FORMALIQTAB == '5') || (parseInt(SAL41.FORMALIQTAB) == 0)) {
        $_FACTORW = 1;
    }
    if ($_INCREMTAB == '9') {
        $_FACTORW = 1;
    } else {
        if (SAL41.NITUSU == '0892000401') {
            let posicion = $_INCREMTAB - 1;
            // $_FACTORW = Math.round(parseFloat($_PORCTABTAR[posicion]) / 100);
            if (($_PORCTABTAR[posicion] == '') || (parseFloat($_PORCTABTAR[posicion]) == 0)) {
                $_FACTORW = 0;
                $_VALOREDIT = $_FACTORW;
            } else {
                $_FACTORW = parseFloat($_PORCTABTAR[posicion]) / 100;
                $_VALOREDIT = $_FACTORW;
            }
        } else {
            let posicion = parseInt($_INCREMTAB) - 1;
            if (($_PORCTABTAR[posicion] == '') || (parseFloat($_PORCTABTAR[posicion]) == 0)) {
                $_FACTORW = 0;
                console.debug($_FACTORW);
            } else {
                $_FACTORW = parseFloat($_PORCTABTAR[posicion]) / 100;
                // $_FACTORW = Math.round(parseFloat($_PORCTABTAR[posicion]) / 100);
                console.debug($_FACTORW);
            }
        }
    }
}

////////////////////////////////////////////////////// SER891A ////////////////////////////////////////////////////////////////////////////
// function SER891A_41() {
//     if ((SAL41.IDHISTORIAFACT == $_MEDCITW) || ($_PUERTAESTAD == '1')) {
//         console.debug('no tiene citas');
//     }
//     else {
//         let datos_envio = datosEnvio();
//         datos_envio += '|' + SAL41.IDHISTORIAFACT;
//         SolicitarDll({ datosh: datos_envio }, _dataSER891A_41, get_url('/SALUD/APP/SER891A.DLL'));
//     }
// }

// function _dataSER891A_41(data) {
//     data = data.split('|');
//     if (data[0].trim() == '00') {
//         console.debug(data[0].trim());
//     } else if (data[0].trim() == '9F') {
//         CON851('9F', '9F', null, 'warning', 'Advertencia!');
//     } else {
//         CON852(data[0], data[1], data[2], _toggleNav);
//     }
// }


/////////////////////////////////////////////////////// SER891AD /////////////////////////////////////////////////////////////////////////
function SER891AD_41() {
    $_HORACITFACT = ' ';
    let datos_envio = datosEnvio();
    datos_envio += SAL41.ADMINW + '|' + SAL41.IDHISTORIAFACT;
    SolicitarDll({ datosh: datos_envio }, _dataSER891AD_41, get_url('APP/SALUD/SER891AD.DLL'));
}

function _dataSER891AD_41(data) {
    console.debug(data);
    data = data.split('|');
    let json = data[1].trim();
    // let rutaJson = get_url(json + '.JSON');
    let rutaJson = json + '.JSON';
    SolicitarDatos(
        null,
        function (data) {
            $_CITAW = data.CITAS;
            $_HORACITFACT = $_CITAW[0].HORACIT;
            let arrayEliminar = [];
            arrayEliminar.push(json);
            _eliminarJson(arrayEliminar, on_eliminarJsonCitas_41);
        },
        rutaJson
    );
}

function on_eliminarJsonCitas_41() {
    var date = data.split('|');
    if (date[0].trim() == '00') {
        for (var i in $_CITAW) {
            if ($_CITAW[i].PAC_CIT == SAL41.IDHISTORIAFACT) {
                if ($_CITAW[i].FECHA_CIT == $_FECHAFACT) {
                    $_HORACITFACT = $_CITAW[i].HORA_CIT;
                    if (($_HORACITFACT.trim() == '') || (parseInt($_HORACITFACT) == 0)) {
                        $_HORACITFACT = moment().format('LT');
                    }
                }
            } else {
                if (($_HORACITFACT.trim() == '') || (parseInt($_HORACITFACT) == 0)) {
                    $_HORACITFACT = moment().format('LT');
                }
            }
        }
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

/////////////////////////////////////////////////// INV401D ////////////////////////////////////

function INV401D() {
    console('INV401D');
}

/////////////////////////////////////////////////// HL7001 ///////////////////////////////////////////////

function _HL7001() {
    switch (SAL41.NITUSU) {
        case '0830092718':
            $EMPRMSGL1 = 1;
            break;
        case '0830092719':
            $EMPRMSGL1 = 2;
            break;
        case '0900193162':
            $EMPRMSGL1 = 3;
            break;
        default:
            $EMPRMSGL1 = 1;
            break;
    }
    if (SAL41.MEDOTRFACT == '3319') {
        $_SUCFACT = 'T6';
    }
    $SUCMSGL1 = $_SUCFACT;
    $CLMSGL1 = $_CLFACT;
    $NROMSGL1 = SAL41.NROFACT;
    $ITEMMSGL1 = $I;
    $PROCCL1 = '|P|';
    $VERSIONL1 = '2.6';
    $SEPL1 = '|||||';
    $PAISL1 = 'CO|';
    $ISOL1 = '8859/1';
    $FINL1 = '*';
    $NOMBRETXT = $SUCMSGL1 + $CLMSGL1 + $NROMSGL1 + $ITEMMSGL1 + $PROCCL1 + $VERSIONL1 + $SEPL1 + $PAISL1 + $ISOL1 + $FINL1;
    $NOMSALIDA = 'S:\EXPORTAR\HL7\ADT-' + $NOMBRETXT + '.HL7'
    let hora = moment().format('LTS');
    hora = hora.split(':');
    $HORAL1 = hora[0] + hora[1] + hora[2];
    let fecha = moment().format('L');
    fecha = fecha.split('/');
    $FECHAL1 = fecha[2] + fecha[1] + fecha[0];

}

///////////////////////////////// MASCARAS ///////////////////////////////////
var MountMask_41 = IMask($('#cant_SAL41')[0], { mask: Number, radix: '.', scale: 2, padFractionalZeros: true });
var PriceUnitMask_41 = IMask($('#vlrunit_SAL41')[0], { mask: Number, thousandsSeparator: ',' });
var PriceTotalMask_41 = IMask($('#vlrtotal_SAL41')[0], { mask: Number, thousandsSeparator: ',' });
var NetoFactMask_41 = IMask($('#netofact_SAL41')[0], { mask: Number, thousandsSeparator: ',' });
var PriceivaMask_41 = IMask($('#valoriva_SAL41')[0], { mask: Number, thousandsSeparator: ',' });
var PriceContMask_41 = IMask($('#vlrtot_SAL41')[0], { mask: Number, thousandsSeparator: ',' });
var clfactMask = IMask($('#claseservicio_SAL41')[0], { mask: Number, min: 0, max: 7 });
var idhistoriafactMask = IMask($('#paciente_SAL41')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });
var prefijoMask = IMask($('#factura_SAL41')[0], {
    mask: 'a',
    prepare: function (str) {
        // console.debug(str);
        // if ((str == 'U') || (str == 'u')) {
        //     CON851('01', '01', null, 'error', 'error');
        // }
        // else {
        return str.toUpperCase()
        // }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var clienteMask = IMask($('#cliente_SAL41')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });
var CopagoMask = new IMask($('#porcentcopago_SAL41')[0], { mask: Number, radix: '.', scale: 2, padFractionalZeros: false });
var CopagoMask2 = new IMask($('#copagoestimfact_SAL41')[0], { mask: Number, thousandsSeparator: ',' });
var preanofact = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
var premesfact = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
var anofact = parseInt(preanofact);
var mesfact = parseInt(premesfact);

var fechaMask = IMask($("#fecha_SAL41")[0], {
    mask: Date,
    pattern: 'Y-m-d',
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: anofact, to: anofact, maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: mesfact, to: mesfact, maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: '01', to: '31', maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        return str;
    }
});

function _Nitmedico_41() {
    var nitmedicoMask = IMask($('#nitmedico_SAL41')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });
    nitmedicoMask.updateValue();
}