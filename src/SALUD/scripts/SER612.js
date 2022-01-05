// 24-05-2020- DIANA E: CREADO
var SER612 = [];
var $_FECHAACTUAL = moment().format('YYYYMMDD');

$(document).ready(function () {
    nombreOpcion('9,7,6,9 - Reliquida comprobante de prestacion de servicios');
    _inputControl('reset');
    _inputControl('disabled');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    if ($_USUA_GLOBAL[0].NIT == '0800156469') {
        SER612.SERVICIOS = [
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
        SER612.SERVICIOS = [
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

        { input: 'numero', app: '612', funct: _ventanaFacturacion_ser612 },
        { input: 'comprobante', app: '612', funct: _ventanaclaseservicio_SER612 }

    ]);
    _aceptaprefijoorginal_SER612();
});

/////////INICIA OPCION  //////////////////////////////////

function _aceptaprefijoorginal_SER612() {
    validarInputs(
        {
            form: "#PREFIJO_SER612",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER612.PREFIJOORI = $('#prefijo_612').val();

            if ((SER612.PREFIJOORI == "A") || (SER612.PREFIJOORI == "P") || (SER612.PREFIJOORI == "T") || (SER612.PREFIJOORI == "B") || (SER612.PREFIJOORI == "D") || (SER612.PREFIJOORI == "F") ||
                (SER612.PREFIJOORI == "G") || (SER612.PREFIJOORI == "H") || (SER612.PREFIJOORI == "I") || (SER612.PREFIJOORI == "J") || (SER612.PREFIJOORI == "K") || (SER612.PREFIJOORI == "L") ||
                (SER612.PREFIJOORI == "M") || (SER612.PREFIJOORI == "N") || (SER612.PREFIJOORI == "O") || (SER612.PREFIJOORI == "Q") || (SER612.PREFIJOORI == "R") || (SER612.PREFIJOORI == "S") ||
                (SER612.PREFIJOORI == "V") || (SER612.PREFIJOORI == "W") || (SER612.PREFIJOORI == "X") || (SER612.PREFIJOORI == "Y") || (SER612.PREFIJOORI == "Z")) {
                _aceptarnumero_SER612();
            } else {
                _aceptaprefijoorginal_SER612();
            }
        }
    )
}


function _aceptarnumero_SER612() {
    validarInputs(
        {
            form: "#NUMERO_SER612",
            orden: '1'
        },
        () => { _aceptaprefijoorginal_SER612(); },
        () => {
            SER612.NUMEROORI = $('#numero_612').val();
            SER612.NUMEROORI = SER612.NUMEROORI.padStart(6, "0");
            $('#numero_612').val(SER612.NUMEROORI);
            if ((SER612.NUMEROORI == '000000') || (SER612.NUMEROORI.trim() == '')) {
                _aceptaprefijoorginal_SER612();
            } else {
                SER612.LLAVEORIG = SER612.PREFIJOORI + SER612.NUMEROORI;
                let datos_envio = datosEnvio() + SER612.LLAVEORIG + '|';
                SolicitarDll({ datosh: datos_envio }, dato => {
                    var date = dato.split("|");
                    var SWINVALID = date[0];
                    SER612.NITNUM = date[2].trim();
                    SER612.DESCRIPNUM = date[3].trim();
                    SER612.CONVENIONUM = date[4].trim();
                    SER612.DESCRIPTAR = date[5].trim();
                    SER612.ESTADONUM = date[6].trim();
                    if (SWINVALID == '00') {
                        SER612.CLFACT = '';
                        $('#tercero_612').val(SER612.DESCRIPNUM);
                        $('#tarifa_612').val(SER612.CONVENIONUM + '-' + SER612.DESCRIPTAR);
                        if (SER612.ESTADONUM == '1') {
                            CON851('13', 'FACTURA CERRADA !', null, 'error', 'error');
                            if ($_ADMINW == 'GEBC') {
                                _datotipo_SER612();
                            } else {
                                _aceptaprefijoorginal_SER612();
                            }
                        } else {
                            _datotipo_SER612();
                        }
                    } else if (SWINVALID == '01') {
                        CON851('01', '01', null, 'error', 'error');
                        _aceptaprefijoorginal_SER612();
                    }
                }, get_url('APP/SALUD/SER108-01.DLL'));
            }
        }
    )
}


function _datotipo_SER612() {
    if (SER612.CLFACT.trim() == '') {
        $('#comprobante_612').val('*');
    }
    validarInputs(
        {
            form: "#COMPROBANTE_SER612",
            orden: '1'
        },
        () => { _aceptarnumero_SER612(); },
        () => {
            SER612.CLFACT = $('#comprobante_612').val()
            if (SER612.CLFACT == '*') {
                $('#descripcomprobante_612').val('TODOS LOS TIPOS');
                setTimeout(_datoarchivo_SER612, 300);
            } else if ((SER612.CLFACT > 0) && (SER612.CLFACT < 8)) {
                SER612.SERVICIOS.forEach(data => {
                    if (SER612.CLFACT == data.COD) {
                        $('#comprobante_612').val(data.COD);
                        $('#descripcomprobante_612').val(data.DESCRIPCION);
                        setTimeout(_datoarchivo_SER612, 300);
                    }
                });
            } else {
                CON851('03', '03', null, 'error', 'error');
                _datotipo_SER612();
            }
        }
    )
}

function _datoarchivo_SER612() {
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
        callback_f: _datotipo_SER612,
        // teclaAlterna: true
    },
        _procesararchivo_SER612);
}

function _procesararchivo_SER612(procesar) {
    SER612.SWARCH = procesar.COD;
    switch (procesar.COD) {
        case '1':
        case '2':
            SER612.ANTEW = '';
            _opcionfecha_SER612();
            break;
        default:
            _aceptarnumero_SER612();
            break;
    }
    $("#opcion_612").val(procesar.COD + " - " + procesar.DESCRIP);
}

function _opcionfecha_SER612() {
    if (SER612.ANTEW.trim() == '') {
        SER612.ANTEW = 'N';
        $('#incluir_612').val(SER612.ANTEW);
    }
    validarInputs(
        {
            form: "#INCLUFECHAS_SER612",
            orden: '1'
        },
        () => { setTimeout(_datoarchivo_SER612, 300); },
        () => {
            SER612.ANTEW = $('#incluir_612').val();
            SER612.SWAPRVR = '';
            if (SER612.ANTEW.trim() == '') {
                _opcionfecha_SER612();
            } else if ((SER612.ANTEW == 'S') || (SER612.ANTEW == 'N')) {
                _datoaproxima_SER612();
            } else {
                _opcionfecha_SER612();
            }
        }
    )
}
function _datoaproxima_SER612() {
    if (SER612.SWAPRVR.trim() == '') {
        SER612.SWAPRVR = 'N';
        $('#valor_612').val(SER612.SWAPRVR);
    }
    validarInputs(
        {
            form: "#APROXIMAR_SER612",
            orden: '1'
        },
        () => { _opcionfecha_SER612(); },
        () => {
            SER612.SWAPRVR = $('#valor_612').val();
            SER612.SWCEROW = '';
            if (SER612.SWAPRVR.trim() == '') {
                _datoaproxima_SER612();
            } else if ((SER612.SWAPRVR == 'S') || (SER612.SWAPRVR == 'N')) {
                _datovalorcero_SER612();
            } else {
                _datoaproxima_SER612();
            }
        }
    )
}

function _datovalorcero_SER612() {
    if (SER612.SWCEROW.trim() == '') {
        SER612.SWCEROW = 'N';
        $('#reliquida_612').val(SER612.SWCEROW);
    }
    validarInputs(
        {
            form: "#RELIQUIDA_SER612",
            orden: '1'
        },
        () => { _datoaproxima_SER612(); },
        () => {
            SER612.SWCEROW = $('#reliquida_612').val();
            if (SER612.SWCEROW.trim() == '') {
                _datovalorcero_SER612();
            } else if ((SER612.SWCEROW == 'S') || (SER612.SWCEROW == 'N')) {
                CON851P('04', _aceptarnumero_SER612, _grabaropcion_SER612)
            } else {
                _datovalorcero_SER612();
            }
        }
    )
}

function _grabaropcion_SER612() {
    console.log('GRABAR OPCION SER612')
    let URL = get_url("app/SALUD/SER612A.DLL");
    postData({
        datosh: datosEnvio() + SER612.LLAVEORIG + '|' + SER612.CLFACT + '|' + SER612.SWARCH + '|' + SER612.ANTEW + '|' + SER612.SWAPRVR + '|' + SER612.SWCEROW + '|' + $_ADMINW + '|' + $_FECHA_LNK + '|'
    }, URL)
        .then((data) => {
            console.log(data, 'SER612A')
            postData({
                datosh: `${datosEnvio()}${SER612.LLAVEORIG}|${$_USUA_GLOBAL[0].FECHALNK}|`
            }, get_url("APP/SALUD/SAL020GA.DLL"))
            .then((data) => {
                _toggleNav();
                CON851('', 'Proceso Terminado!', null, 'success', 'EXITO');
            })
            .catch((error) => {
                console.error(error);
                _aceptarnumero_SER612();
            });
        }).catch(error => {
            console.error(error)
            _aceptarnumero_SER612();
        });
}
///////////VENTANA F8///////////////////////

function _ventanaFacturacion_ser612(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'NUMERACION',
            valoresselect: ['Nombre del tercero', 'buscar paciente'],
            f8data: 'NUMERACION',
            columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
            callback: (data) => {
                $_NROW = data.COD;
                $_NROW = $_NROW.substring(1, 7)
                $('#numero_612').val($_NROW);
                _enterInput('#numero_612');
            },
            cancel: () => {
                _enterInput('#numero_612');
            }
        };
        F8LITE(parametros);
    }
}
function _ventanaclaseservicio_SER612(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE SERVICIO",
            columnas: ["COD", "DESCRIPCION"],
            data: SER612.SERVICIOS,
            callback_esc: function () {
                $("#comprobante_612").focus();
            },
            callback: function (data) {
                SER612.CLFACT = data.COD;
                $("#comprobante_612").val(SER612.CLFACT);
                _enterInput('#comprobante_612');
            }
        });
    }
}