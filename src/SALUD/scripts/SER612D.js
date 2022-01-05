// 24-05-2020- DIANA E: CREADO
var SER612D = [];


$(document).ready(function () {
    nombreOpcion('9,7,6,C - Reliquida comprobante x nit fecha');
    _inputControl('reset');
    _inputControl('disabled');
    loader("show");
    $_FECHAACTUAL = moment().format('YYYYMMDD');
    SER612D.ANOW = $_FECHAACTUAL.substring(0, 4);
    SER612D.MESW = $_FECHAACTUAL.substring(4, 6);
    SER612D.DIAW = $_FECHAACTUAL.substring(6, 8);
    SER612D.NITW = '';
    SER612D.CLFACT = '';
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    if ($_USUA_GLOBAL[0].NIT == '0800156469') {
        SER612D.SERVICIOS = [
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
        SER612D.SERVICIOS = [
            { COD: '0', DESCRIPCION: 'DROGUERIA' },
            { COD: '1', DESCRIPCION: 'CIRUGIAS' },
            { COD: '2', DESCRIPCION: 'LAB. Y OTROS DIAG.' },
            { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
            { COD: '4', DESCRIPCION: 'OTROS SERVICIOS' },
            { COD: '5', DESCRIPCION: 'CONSULTAS Y TERAPIAS' },
            { COD: '6', DESCRIPCION: 'PATOLOGIA' },
            { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' }
            // { COD: '*', DESCRIPCION: 'TODOS LOS TIPOS' }
        ]
    }

    _toggleF8([

        { input: 'entidad', app: '612D', funct: _ventanaterceros_SER612D },
        { input: 'comprobante', app: '612D', funct: _ventanaclaseservicio_SER612D }

    ]);
    obtenerDatosCompletos({
        nombreFd: 'TERCEROS'
    }, function (data) {
        console.log(data)
        $_TERCEROS_612D = data.TERCEROS;
        $_TERCEROS_612D.pop();
        loader("hide");
        _aceptaentidad_SER612D();
    })
});

/////////INICIA OPCION  //////////////////////////////////

function _aceptaentidad_SER612D() {
    if (SER612D.NITW.trim() == '') {
        $('#entidad_612D').val('99');
    }
    validarInputs(
        {
            form: "#ENTIDAD_SER612D",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER612D.NITW = $('#entidad_612D').val();
            if (SER612D.NITW == '99') {
                $('#descripentidad_612D').val('TODAS LAS ENTIDADES');
                _evaluaranoini_SER162D();
            } else {
                busquedaentidad612D = buscarDescrip_entidadser612(SER612D.NITW)
                switch (busquedaentidad612D) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _aceptaentidad_SER612D();
                        break;
                    default:
                        SER612D.DESCRIPENTIDAD = busquedaentidad612D.NOMBRE.trim();
                        $('#descripentidad_612D').val(SER612D.DESCRIPENTIDAD);
                        _evaluaranoini_SER162D();
                        break;
                }

            }
        }
    )
}


function buscarDescrip_entidadser612(data) {
    var retornar = false;
    for (var i in $_TERCEROS_612D) {
        if ($_TERCEROS_612D[i].COD.trim() == data) {
            retornar = $_TERCEROS_612D[i];
            break;
        }
    }
    return retornar;
}

function _evaluaranoini_SER162D() {
    $('#anoini_612D').val(SER612D.ANOW)
    validarInputs(
        {
            form: "#ANOINI_SER612D",
            orden: '1'
        },
        () => { _aceptaentidad_SER612D() },
        () => {
            SER612D.ANOINIW = $('#anoini_612D').val();
            _evaluarmesini_SER162D();
        }
    )
}

function _evaluarmesini_SER162D() {
    $('#mesini_612D').val(SER612D.MESW)
    validarInputs(
        {
            form: "#MESINI_SER612D",
            orden: '1'
        },
        () => { _evaluaranoini_SER162D(); },
        () => {
            SER612D.MESINIW = $('#mesini_612D').val()
            if ((SER612D.MESINIW < 1) || (SER612D.MESINIW > 12)) {
                _evaluarmesini_SER162D();
            } else {
                _evaluardiaini_SER162D();
            }
        }
    )
}

function _evaluardiaini_SER162D() {
    $('#diaini_612D').val(SER612D.DIAW)
    validarInputs(
        {
            form: "#DIAINI_SER612D",
            orden: '1'
        },
        () => { _evaluarmesini_SER162D(); },
        () => {
            SER612D.DIAINIW = $('#diaini_612D').val()
            SER612D.FECHAINIW = SER612D.ANOINIW + SER612D.MESINIW + SER612D.DIAINIW; 
            if ((SER612D.DIAINIW < 1) || (SER612D.DIAINIW > 31)) {
                _evaluardiaini_SER162D();
            } else {
                _evaluaranofin_SER162D();
            }
        }
    )
}

function _evaluaranofin_SER162D() {
    $('#anofin_612D').val(SER612D.ANOINIW);
    validarInputs(
        {
            form: "#ANOFIN_SER612D",
            orden: '1'
        },
        () => { _evaluardiaini_SER162D(); },
        () => {
            SER612D.ANOFINW = $('#anofin_612D').val()
            _evaluarmesfin_SER162D();
        }
    )
}

function _evaluarmesfin_SER162D() {
    $('#mesfin_612D').val(SER612D.MESINIW);
    validarInputs(
        {
            form: "#MESFIN_SER612D",
            orden: '1'
        },
        () => { _evaluaranofin_SER162D(); },
        () => {
            SER612D.MESFINW = $('#mesfin_612D').val()
            if ((SER612D.MESFINW < 1) || (SER612D.MESFINW > 12)) {
                _evaluarmesfin_SER162D();
            } else {
                _evaluardiafin_SER162D();
            }
        }
    )
}
function _evaluardiafin_SER162D() {
    $('#diafin_612D').val('31')
    validarInputs(
        {
            form: "#DIAFIN_SER612D",
            orden: '1'
        },
        () => { _evaluarmesfin_SER162D(); },
        () => {
            SER612D.DIAFINW = $('#diafin_612D').val()
            SER612D.FECHAFINW = SER612D.ANOFINW + SER612D.MESFINW + SER612D.DIAFINW; 
            if ((SER612D.DIAFINW < 1) || (SER612D.DIAFINW > 31)) {
                _evaluardiafin_SER162D();
            } else {
                if(SER612D.FECHAINIW > SER612D.FECHAFINW){
                    _evaluardiafin_SER162D(); 
                }else{
                    let datos_envio = datosEnvio()
                    datos_envio += SER612D.FECHAINIW + '|' 
                    let URL = get_url("APP/SALUD/SER612D.DLL");
                    postData({ datosh: datos_envio }, URL)
                        .then(function (data) {
                            _evaluardatotipo_SER612D();
                        })
                        .catch(err => {
                            console.debug(err);
                            _evaluaranoini_SER162D(); 
                        })
                }
            }
        }
    )
}

function _evaluardatotipo_SER612D() {
    if (SER612D.CLFACT.trim() == '') {
        $('#comprobante_612D').val('*');
    }
    validarInputs(
        {
            form: "#COMPROBANTE_SER612D",
            orden: '1'
        },
        () => { _evaluardiafin_SER162D(); },
        () => {
            SER612D.CLFACT = $('#comprobante_612D').val()
            if (SER612D.CLFACT == '*') {
                $('#descripcomprobante_612D').val('TODOS LOS TIPOS');
                setTimeout(_datoarchivo_SER612D, 300);
            } else if ((SER612D.CLFACT > 0) && (SER612D.CLFACT < 8)) {
                SER612D.SERVICIOS.forEach(data => {
                    if (SER612D.CLFACT == data.COD) {
                        $('#comprobante_612D').val(data.COD);
                        $('#descripcomprobante_612D').val(data.DESCRIPCION);
                        setTimeout(_datoarchivo_SER612D, 300);
                    }
                });
            } else {
                CON851('03', '03', null, 'error', 'error');
                _evaluardatotipo_SER612D();
            }
        }
    )
}

function _datoarchivo_SER612D() {
    var procesar = [
        { "COD": "1", "DESCRIP": "Comprob. prest. servicios" },
        { "COD": "2", "DESCRIP": "Comprob. autorización" }
    ]
    POPUP({
        array: procesar,
        titulo: 'ARCHIVO A PROCESAR',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluardatotipo_SER612D,
    },
        _procesararchivo_SER612D);
}

function _procesararchivo_SER612D(procesar) {
    SER612D.SWARCH = procesar.COD;
    switch (procesar.COD) {
        case '1':
        case '2':
            SER612D.ANTEW = '';
            _opcionfecha_SER612D();
            break;
        default:
            _evaluardatotipo_SER612D();
            break;
    }
    $("#opcion_612D").val(procesar.COD + " - " + procesar.DESCRIP);
}

function _opcionfecha_SER612D() {
    if (SER612D.ANTEW.trim() == '') {
        SER612D.ANTEW = 'N';
        $('#incluirfech_612D').val(SER612D.ANTEW);
    }
    validarInputs(
        {
            form: "#INCLUIRFECH_SER612D",
            orden: '1'
        },
        () => { setTimeout(_datoarchivo_SER612D, 300); },
        () => {
            SER612D.ANTEW = $('#incluirfech_612D').val();
            SER612D.CERRAW = '';
            if (SER612D.ANTEW.trim() == '') {
                _opcionfecha_SER612D();
            } else if ((SER612D.ANTEW == 'S') || (SER612D.ANTEW == 'N')) {
                _opcioncerrada_SER612D();
            } else {
                _opcionfecha_SER612D();
            }
        }
    )
}

function _opcioncerrada_SER612D() {
    if (SER612D.CERRAW.trim() == '') {
        $('#incluirfact_612D').val('N');
    }
    validarInputs(
        {
            form: "#INCLUIRFACT_SER612D",
            orden: '1'
        },
        () => { _opcionfecha_SER612D(); },
        () => {
            SER612D.CERRAW = $('#incluirfact_612D').val();
            if (SER612D.CERRAW.trim() == '') {
                _opcioncerrada_SER612D();
            } else if ((SER612D.CERRAW == 'S') || (SER612D.CERRAW == 'N')) {
                CON851P('04', _aceptaentidad_SER612D, _grabaropcion_SER612D)
            } else {
                _opcioncerrada_SER612D();
            }
        }
    )
}

function _grabaropcion_SER612D() {
    console.log('GRABAR OPCION SER612D')
}
///////////VENTANA F8///////////////////////

function _ventanaterceros_SER612D(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite_v2({
            titulo: 'VENTANA DE TERCEROS',
            data: $_TERCEROS_612D,
            indice: ["COD", "NOMBRE", "CIUDAD", "ACT"],
            mascara: [{
                "COD": 'Identificacion',
                "NOMBRE": 'Nombre',
                "DIRREC": "direccion",
                "TELEF": "telefono"
            }],
            minLength: 3,
            callback_esc: function () {
                $("#entidad_612D").focus();
            },
            callback: function (data) {
                $_ENTIFACTPACIW = data.COD.trim();
                $("#entidad_612D").val($_ENTIFACTPACIW);

                _enterInput('#entidad_612D');
            }
        });
    }
}
function _ventanaclaseservicio_SER612D(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE SERVICIO",
            columnas: ["COD", "DESCRIPCION"],
            data: SER612D.SERVICIOS,
            callback_esc: function () {
                $("#comprobante_612D").focus();
            },
            callback: function (data) {
                SER612D.CLFACT = data.COD;
                $("#comprobante_612D").val(SER612D.CLFACT);
                _enterInput('#comprobante_612D');
            }
        });
    }
}