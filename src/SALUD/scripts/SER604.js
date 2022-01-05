var SER604 = new Object;

$(document).ready(function () {
    nombreOpcion('9,7,4,4 - Resumen de facturacion por tipo');
    _inputControl('reset');
    _inputControl('disabled');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    SER604.CTAW = ''
    SER604.FACTURA = '';
    SER604.SEPARARW = '';
    SER604.CEROW = '';
    SER604.UNIDADW = '';
    SER604.ALMACENW = '';
    SER604.CLW = '';
    SER604.ESTANW = '';
    SER604.CEROW = '';
    _toggleF8([
        { input: 'procesar', app: '604', funct: _ventanaprocesar_604 }
    ]);
    if ($_USUA_GLOBAL[0].NIT == '0800156469') {
        SER604.SERVICIOS = [
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
        SER604.SERVICIOS = [
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
    _aceptarprefijo_SER604();
});
///////////////////VENTANAS F8///////////////////////
function _ventanaprocesar_604(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE SERVICIO",
            columnas: ["COD", "DESCRIPCION"],
            data: SER604.SERVICIOS,
            callback_esc: function () {
                $("#procesar_604").focus();
            },
            callback: function (data) {
                SER604.CLW = data.COD
                SER604.CLW = $('#procesar_604').val(SER604.CLW);
                _enterInput('#procesar_604');
            }
        });
    }
}

/////////////////////////EMPEZOOPCION//////////////////////


function _aceptarprefijo_SER604() {
    validarInputs(
        {
            form: "#PREFIJO_SER604",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER604.PREFIJO = $('#prefijo_604').val();
            if (SER604.PREFIJO.trim() == '') {
                _aceptarprefijo_SER604();
            } else if ((SER604.PREFIJO == "A") || (SER604.PREFIJO == "P") || (SER604.PREFIJO == "T") || (SER604.PREFIJO == "B") || (SER604.PREFIJO == "D") || (SER604.PREFIJO == "F") ||
                (SER604.PREFIJO == "G") || (SER604.PREFIJO == "H") || (SER604.PREFIJO == "I") || (SER604.PREFIJO == "J") || (SER604.PREFIJO == "K") || (SER604.PREFIJO == "L") || (SER604.PREFIJO == "M") || (SER604.PREFIJO == "N") ||
                (SER604.PREFIJO == "O") || (SER604.PREFIJO == "Q") || (SER604.PREFIJO == "R") || (SER604.PREFIJO == "S") || (SER604.PREFIJO == "V") || (SER604.PREFIJO == "W") || (SER604.PREFIJO == "X") || (SER604.PREFIJO == "Y") ||
                (SER604.PREFIJO == "Z")) {
                _buscarnumero_SER604();
            } else {
                _aceptarprefijo_SER604();
            }
        }
    )
}

function _buscarnumero_SER604() {
    $_SECU1NUM = '9';
    $_SECU2NUM = SER604.PREFIJO;
    $_SECUNUM = $_SECU1NUM + $_SECU2NUM;
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + $_SECUNUM }, URL)
        .then(data => {
            var data = data.split("|");
            $_ULTFECHA = data[2].trim();
            $_NUMEROCTL = data[1].substring(3, 9);
            $_LOTE = data[0].trim();
            SER604.FACTURA = parseInt($_NUMEROCTL) - 1;
            $('#factura_604').val(SER604.FACTURA);
            _aceptarfactura_SER604()
        })
        .catch(err => {
            console.debug(err);
            _aceptarprefijo_SER604()
        })
}

function _aceptarfactura_SER604() {
    validarInputs(
        {
            form: "#FACTURA_SER604",
            orden: '1'
        },
        () => { _aceptarprefijo_SER604(); },
        () => {
            SER604.FACTURA = $('#factura_604').val();
            SER604.FACTURA = SER604.FACTURA.padStart(6, "0");
            $('#factura_604').val(SER604.FACTURA);
            SER604.LLAVEFACTW = SER604.PREFIJO + SER604.FACTURA;

            let datos_envio = datosEnvio()
            datos_envio += SER604.LLAVEFACTW + '|';
            SolicitarDll({ datosh: datos_envio }, data => {
                console.debug(data, "RESP");
                var data = data.split("|");
                var swinvalid = data[0].trim();
                SER604.DESCRIPNUM = data[1].trim();
                SER604.NOMBREPACNUM = data[2].trim();
                SER604.FECHAFARMANUM = data[3].trim();
                SER604.HORAFARMANUM = data[4].trim();
                SER604.OPERFARMANUM = data[5].trim();
                SER604.MESFARMANUM = SER604.FECHAFARMANUM.substring(5, 7);
                if (swinvalid == "00") {
                    $('#tercero_604').val(SER604.DESCRIPNUM);
                    $('#paciente_604').val(SER604.NOMBREPACNUM);
                    _aceptartipoprocesar_SER604();
                } else if (swinvalid == "01") {
                    CON851('01', '01', null, 'error', 'error');
                    _aceptarfactura_SER604();
                } else if (swinvalid == "08") {
                    CON851('08', '08', null, 'error', 'error');
                    _aceptarfactura_SER604();
                } else {
                    CON852(data[0], data[1], data[2], _toggleNav)
                }
            }, get_url('APP/SALUD/SER604.DLL'));

        }
    )
}

function _aceptartipoprocesar_SER604() {
    if (SER604.CLW.trim() == '') {
        $('#procesar_604').val('*')
    }
    validarInputs(
        {
            form: "#PROCESAR_SER604",
            orden: '1'
        },
        () => { _aceptarprefijo_SER604(); },
        () => {

            SER604.CLW = $('#procesar_604').val();
            if (SER604.CLW == '*') {
                $('#procesar_604').val(SER604.CLW + " - TODOS LOS TIPOS");
                if (SER604.CLW == '0' && SER604.MESFARMANUM > 0) {
                    _prefactura_SER604();
                }else{
                    _validacionesservicio_SER604()
                }
            } else {
                const res = SER604.SERVICIOS.find(e => e.COD == SER604.CLW);
                if (res == undefined) {
                    CON851('03', '03', null, 'error', 'error');
                    _aceptartipoprocesar_SER604();
                } else {
                    $('#procesar_604').val(res.COD + " - " + res.DESCRIPCION);
                    if (SER604.CLW == '0' && SER604.MESFARMANUM > 0) {
                        _prefactura_SER604();
                    }else{
                        _validacionesservicio_SER604()
                    }
                }
            }
        }
    )
}

function _validacionesservicio_SER604() {
    if (SER604.CLW == '4') {
        _aceptarestancias_SER604();
    } else {
        SER604.ESTANW = 'N';
        $('#estancia_604').val(SER604.ESTAN);
        _aceptarvalorescero_SER604();
    }
}

function _aceptarestancias_SER604() {
    if (SER604.ESTANW.trim() == '') {
        SER604.ESTANW = 'S';
        $('#estancia_604').val(SER604.ESTANW);
    }
    validarInputs(
        {
            form: "#ESTANCIAS_SER604",
            orden: '1'
        },
        () => { _aceptartipoprocesar_SER604(); },
        () => {
            SER604.ESTANW = $('#estancia_604').val();
            if (SER604.ESTANW == 'S' || SER604.ESTANW == 'N') {
                _aceptarvalorescero_SER604();
            } else {
                _aceptarestancias_SER604();
            }
        }
    )
}

function _aceptarvalorescero_SER604() {
    if (SER604.CEROW.trim() == '') {
        SER604.CEROW = 'N';
        $('#valorescero_604').val(SER604.CEROW);
    }
    validarInputs(
        {
            form: "#VALORESCERO_SER604",
            orden: '1'
        },
        () => { _aceptartipoprocesar_SER604(); },
        () => {
            SER604.CEROW = $('#valorescero_604').val();
            if (SER604.CEROW == 'S' || SER604.CEROW == 'N') {
                _aceptarunidad_SER604();
            } else {
                _aceptarvalorescero_SER604();
            }
        }
    )
}

function _aceptarunidad_SER604() {
    if (SER604.UNIDADW.trim() == '') {
        SER604.UNIDADW = 'S';
        $('#unidadserv_604').val(SER604.UNIDADW);
    }
    validarInputs(
        {
            form: "#UNIDADSERV_SER604",
            orden: '1'
        },
        () => { _aceptartipoprocesar_SER604(); },
        () => {
            SER604.UNIDADW = $('#unidadserv_604').val();
            if (SER604.UNIDADW == 'S' || SER604.UNIDADW == 'N') {
                if (SER604.UNIDADW == 'N') {
                    SER604.SEPARARW = 'N';
                    $('#unidadfecha_604').val(SER604.SEPARARW);
                    _aceptaralmacen_SER604();
                } else {
                    _aceptarseparar_SER604();
                }
            } else {
                _aceptarunidad_SER604();
            }
        }
    )
}

function _aceptarseparar_SER604() {
    if (SER604.SEPARARW.trim() == '') {
        SER604.SEPARARW = 'N';
        $('#unidadfecha_604').val(SER604.SEPARARW);
    }
    validarInputs(
        {
            form: "#UNIDADFECHA_SER604",
            orden: '1'
        },
        () => { _aceptarunidad_SER604(); },
        () => {
            SER604.SEPARARW = $('#unidadfecha_604').val();

            if ((SER604.SEPARARW == 'S') || (SER604.SEPARARW == 'N')) {
                _aceptaralmacen_SER604();
            } else {
                _aceptarseparar_SER604();
            }
        }
    )
}

function _aceptaralmacen_SER604() {
    if (SER604.ALMACENW.trim() == '') {
        SER604.ALMACENW = 'N';
        $('#separaralmac_604').val(SER604.ALMACENW);
    }
    validarInputs(
        {
            form: "#SEPARARALM_SER604",
            orden: '1'
        },
        () => { _aceptarunidad_SER604(); },
        () => {
            SER604.ALMACENW = $('#separaralmac_604').val();
            if (SER604.ALMACENW == 'S' || SER604.ALMACENW == 'N') {
                _evaluarcta_SER604()
            } else {
                _aceptaralmacen_SER604();
            }
        }
    )
}

function _evaluarcta_SER604() {
    if (SER604.CTAW.trim() == '') {
        SER604.CTAW = 'N';
        $('#codigocontab_604').val(SER604.CTAW);
    }
    validarInputs(
        {
            form: "#CODIGOCONTAB_SER604",
            orden: '1'
        },
        () => { _aceptarunidad_SER604(); },
        () => {
            SER604.CTAW = $('#codigocontab_604').val();
            if (SER604.CTAW == 'S' || SER604.CTAW == 'N') {
                _grabaropcion_SER604()
            } else {
                _evaluarcta_SER604()
            }
        }
    )
}

function _grabaropcion_SER604() {
    let URL = get_url("APP/SALUD/SER604-01.DLL");
    postData({ datosh: `${datosEnvio()}${SER604.LLAVEFACTW}|${SER604.CLW}|${SER604.ESTANW}|${SER604.CEROW}|${SER604.UNIDADW}|${SER604.SEPARARW}|${SER604.ALMACENW}|${$_ADMINW}|${SER604.CTAW}` }, URL)
        .then(data => {
            data = data.RESPUESTA
            columnas = [
                {
                    title: "UNID",
                    value: 'UNIDAD',
                    format: 'string'
                },
                {
                    title: "CODIGO",
                    value: 'COD',
                    format: 'string'
                },
                {
                    title: "DESCRIP",
                    value: 'DESCRIP',
                    format: 'string'
                },
                {
                    title: "VRL UNITARIO",
                    value: 'UNIVLR',
                    format: 'money',
                },
                {
                    title: "CANTIDAD",
                    value: 'CANT',
                    totalsRowFunction: 'sum'
                },
                {
                    title: "VLR TOTAL",
                    value: 'VLR',
                    format: 'money',
                    totalsRowFunction: 'sum'
                },
                {
                    title: "COD CTA",
                    value: 'CTA',
                },
                {
                    title: "ALMACEN",
                    value: 'ALM',
                },
                {
                    title: "FECHA",
                    value: 'FECHA',
                }

            ]
            _impresion2({
                tipo: 'excel',
                header: [
                    { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 14 },
                    `IDENTIFICACION: ${SER604.DESCRIPNUM}, FACTURA NRO: ${SER604.LLAVEFACTW}`,
                    `PACIENTE: ${SER604.NOMBREPACNUM}, FECHA: Imp: ${moment().format('YYYYMMDD HH:mm')}`,
                    ``,
                ],
                logo: `${$_USUA_GLOBAL[0].NIT}.png`,
                ruta_logo: 'P:\\PROG\\LOGOS\\',
                tabla: {
                    columnas,
                    data: data,
                    totalsRow: true
                },
                archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
                scale: 65,
                orientation: 'landscape'
            })
                .then(() => {
                    CON851('', 'Impreso Correctamente', null, 'success', 'Exito')
                    _toggleNav();
                })
                .catch(() => {
                    CON851('', 'Hubo un error en la impresión', null, 'error', 'Error')
                    _evaluarcta_SER604()
                })

        })
        .catch(err => {
            console.debug(err);
            _evaluarcta_SER604()
        })
}


function _prefactura_SER604() {
    setTimeout(() => {
        _ventanaprefactura_SALUD(_validacionesservicio_SER604, _aceptartipoprocesar_SER604, params = { FECHAFARMA: SER604.FECHAFARMANUM, HORAFARMA: SER604.HORAFARMANUM, OPERFARMA: SER604.OPERFARMANUM })
      }, 300);
}

