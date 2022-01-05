var RX424 = []; var IMPRESION = [];

/////////////////////////////// MASCARAS /////////////////////////////////////
let FECHA = parseInt('20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2));
var momentFormat_RX424 = 'YYYY/MM/DD';
var momentMask_RX424 = IMask($('#fechadesde_rx424')[0], {
    mask: Date,
    pattern: momentFormat_RX424,
    lazy: true,

    format: function (date) {
        return moment(date).format(momentFormat_RX424);
    },
    parse: function (str) {
        return moment(str, 'YYYY/MM/DD');
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: FECHA,
            to: FECHA
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        }
    }
});
var momentMask2_RX424 = IMask($('#fechahasta_rx424')[0], {
    mask: Date,
    pattern: momentFormat_RX424,
    lazy: true,

    format: function (date) {
        return moment(date).format(momentFormat_RX424);
    },
    parse: function (str) {
        return moment(str, momentFormat_RX424);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: FECHA,
            to: FECHA
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        }
    }
});
var desdeMask_RX424 = new IMask($('#desdenro_rx424')[0], { mask: Number, thousandsSeparator: ',' });
var hastaMask_RX424 = new IMask($('#hastanro_rx424')[0], { mask: Number, thousandsSeparator: ',' });
var clientMask_RX424 = new IMask($('#cliente_rx424')[0], { mask: Number, thousandsSeparator: ',' });
var medicMask_RX424 = new IMask($('#medico_rx424')[0], { mask: Number, thousandsSeparator: ',' });
var prefijoMask = IMask($('#factura_rx424')[0], {
    mask: '*',
    prepare: function (str) {
        if (str == '*') {
            return str
        } else {
            str = str.toUpperCase();
            if ((str == 'P') || (str == 'T') || (str == 'A')) {
                return str
            }
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var pdfMask = IMask($('#pdf_rx424')[0], {
    mask: 'a',
    prepare: function (str) {
        str = str.toUpperCase();
        if ((str == 'S') || (str == 'N')) {
            return str
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
//////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    nombreOpcion('3,1 - Impresion masiva de estudios')
    _inputControl("reset")
    _inputControl("disabled")
    RX424['PREFIJOUSU'] = $_USUA_GLOBAL[0].PREFIJ;
    RX424['NOMBREUSU'] = $_USUA_GLOBAL[0].NOMBRE;
    RX424['ADMINW'] = localStorage.getItem('Usuario').trim();
    $('#nombreusu_rx424').text(RX424.NOMBREUSU);
    RX424['SUCW'] = RX424.PREFIJOUSU;
    RX424['CODTER'] = '';
    RX424['CODPROF'] = '';
    momentMask_RX424.updateValue();
    desdeMask_RX424.typedValue = '1';
    hastaMask_RX424.typedValue = '999999';
    _toggleF8([
        { input: 'cliente', app: 'rx424', funct: _ventanaCliente_rx424 },
        { input: 'medico', app: 'rx424', funct: _ventanaProfesionales_rx424 },
    ]);
    loader('show');
    let URL = get_url("APP/CONTAB/CON802.DLL");
    postData({
        datosh: datosEnvio()
    }, URL)
        .then((data) => {
            RX424.TERCEROS = data.TERCEROS;
            RX424.TERCEROS.pop();
            let URL = get_url("APP/CONTAB/CON823.DLL");
            postData({
                datosh: datosEnvio()
            }, URL)
                .then((data) => {
                    loader("hide");
                    RX424.SUCURSALES = data.SUCURSAL;
                    RX424.SUCURSALES.pop();
                    _evaluarprefijo_RX424('1');
                })
                .catch((err) => {
                    console.error(err)
                    CON851('', err, null, 'error', 'Error')
                });
        })
        .catch((err) => {
            console.error(err)
            CON851('', err, null, 'error', 'Error')
        });
});

function _ventanaCliente_rx424(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA TERCEROS',
            columnas: ['COD', 'NOMBRE', "DIRREC", "TELEF", "CIUDAD", "FACTOR"],
            mascara: ['NOMBRE'],
            data: RX424.TERCEROS,
            callback_esc: function () {
                $('#cliente_rx424').focus();
            },
            callback: function (data) {
                $('#cliente_rx424').val(data.COD); $('#cliented_rx424').val(data.DESCRIP);
                _enterInput('#cliente_rx424');
            }
        });
    }
}

function _ventanaProfesionales_rx424(e) {
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
                        $('#medico_rx424').focus();
                    },
                    callback: function (data) {
                        $('#medico_rx424').val(data.IDENTIFICACION.trim()); $('#medicod_rx424').val(data.NOMBRE);
                        _enterInput('#medico_rx424');
                    }
                });
            })
            .catch((error) => {
                CON851('', error, null, 'error', 'Error')
            });
    }
}

function _evaluarprefijo_RX424(orden) {
    // $('#prefijo_rx424').val(RX424.PREFIJOUSU);
    validarInputs(
        {
            form: "#VALIDAR1_RX424",
            orden: orden
        },
        _toggleNav,
        _validarfecha_RX424
    )
}

function _validarfecha_RX424() {
    RX424.SUCW = $('#prefijo_rx424').val();
    RX424['NROINIW'] = desdeMask_RX424.unmaskedValue.padStart(6, '0');
    RX424['NROFINW'] = hastaMask_RX424.unmaskedValue.padStart(6, '0');
    RX424['FECHAINI'] = momentMask_RX424.value.replace(/\//g, '');
    if (RX424.NROINIW.trim() == '' || RX424.NROFINW.trim() == '') {
        CON851('01', '01', null, 'error', 'Error');
        _evaluarprefijo_RX424('2');
    } else if (RX424.FECHAINI.trim() == '') {
        CON851('37', '37', null, 'error', 'Error');
        _evaluarprefijo_RX424('4');
    } else {
        let URL = get_url("APP/RX/RX424.DLL");
        postData({ datosh: datosEnvio() + RX424.ADMINW + '|' + '1' + '|' + RX424.FECHAINI + '|' + RX424.CODTER + '|' + RX424.CODPROF + '|' }, URL)
            .then(function (data) {
                if (data.CONSULTA[0].DESCRIP.trim() == '00') {
                    _evaluarfechahasta_RX424();
                }
            })
            .catch(err => {
                if (err.MENSAJE == '08') {
                    _evaluarprefijo_RX424('4');
                }
            })
    }
}

function _evaluarfechahasta_RX424() {
    momentMask2_RX424.updateValue();
    validarInputs(
        {
            form: "#VALIDAR2_RX424",
            orden: '1'
        },
        function () { _evaluarprefijo_RX424('4') },
        _validarfechahasta_RX424
    )
}

function _validarfechahasta_RX424() {
    RX424['FECHAFIN'] = momentMask2_RX424.value.replace(/\//g, '');
    if (RX424.FECHAFIN < RX424.FECHAINI) {
        CON851('37', '37', null, 'error', 'Error');
        _evaluarfechahasta_RX424();
    } else if (RX424.FECHAFIN.trim() == '' || RX424.FECHAINI.trim() == '') {
        CON851('03', '03', null, 'error', 'Error');
        _evaluarfechahasta_RX424();
    } else {
        _evaluarcliente_RX424();
    }
}

function _evaluarcliente_RX424() {
    clientMask_RX424.updateValue();
    validarInputs(
        {
            form: "#VALIDAR3_RX424",
            orden: '1'
        },
        _evaluarfechahasta_RX424,
        _validarcliente_RX424
    )
}

function _validarcliente_RX424() {
    RX424['SWNIT'] = clientMask_RX424.unmaskedValue;
    RX424.SWNIT = RX424.SWNIT.padStart(10, '0');
    if (RX424.SWNIT == '0000000099') {
        $('#cliented_rx424').val('TODOS LOS CLIENTES');
        _evaluarmedico_RX424();
    }
    else {
        let URL = get_url("APP/RX/RX424.DLL");
        postData({ datosh: datosEnvio() + RX424.ADMINW + '|' + '2' + '|' + RX424.FECHAINI + '|' + RX424.SWNIT + '|' + RX424.CODPROF + '|' }, URL)
            .then(function (data) {
                $('#cliented_rx424').val(data.CONSULTA[0].DESCRIP);
                _evaluarmedico_RX424();
            })
            .catch(err => {
                _evaluarcliente_RX424();
            })
    }
}

function _evaluarmedico_RX424() {
    medicMask_RX424.updateValue();
    validarInputs(
        {
            form: "#VALIDAR4_RX424",
            orden: '1'
        },
        _evaluarcliente_RX424,
        _validarmedico_RX424
    )
}

function _validarmedico_RX424() {
    RX424['SWMED'] = medicMask_RX424.unmaskedValue;
    RX424.SWMED = RX424.SWMED.padStart(10, '0');
    if (RX424.SWMED == '0000000099') {
        $('#medicod_rx424').val('TODOS LOS MEDICOS');
        _evaluarfactura_RX424();
    }
    else {
        let URL = get_url("APP/RX/RX424.DLL");
        postData({ datosh: datosEnvio() + RX424.ADMINW + '|' + '3' + '|' + RX424.FECHAINI + '|' + RX424.SWNIT + '|' + RX424.SWMED + '|' }, URL)
            .then(function (data) {
                $('#medicod_rx424').val(data.CONSULTA[0].DESCRIP);
                _evaluarfactura_RX424();
            })
            .catch(err => {
                _evaluarmedico_RX424();
            })
    }
}

function _evaluarfactura_RX424() {
    validarInputs(
        {
            form: "#VALIDAR5_RX424",
            orden: '1'
        },
        _evaluarmedico_RX424,
        _validarfactura_RX424
    )
}

function _validarfactura_RX424() {
    RX424['PREFFACTW'] = prefijoMask.unmaskedValue;
    if (RX424.PREFFACTW == '*') {
        $('#facturanro_rx424').val('TODAS LAS FACTURAS');
        RX424['CTAFACTW'] = ''
        _datopdf_RX424();
    } else if (RX424.PREFFACTW.trim() == 'P' || RX424.PREFFACTW.trim() == 'A' || RX424.PREFFACTW.trim() == 'T') {
        _evaluarctafact_RX424();
    } else {
        CON851('03', '03', null, 'error', 'Error');
        _evaluarfactura_RX424();
    }
}

function _evaluarctafact_RX424() {
    validarInputs(
        {
            form: "#VALIDAR6_RX424",
            orden: '1'
        },
        _evaluarfactura_RX424,
        () => {
            RX424['CTAFACTW'] = $('#facturanro_rx424').val().padStart(6, '0');
            $('#facturanro_rx424').val(RX424.CTAFACTW);
            _datopdf_RX424()
        }
    )
}

function _datopdf_RX424() {
    validarInputs(
        {
            form: "#VALIDAR7_RX424",
            orden: '1'
        },
        _evaluarfactura_RX424,
        () => {
            RX424['SWPDF'] = pdfMask.unmaskedValue;
            if (RX424.SWPDF == 'S') {
                CON851P('04', _datopdf_RX424, _confirmarpdf_RX424);
            } else {
                _datopdf_RX424();
            }
        }
    )
}

function _confirmarpdf_RX424() {
    loader('show');
    RX424.CONTADOR = 0;
    let URL = get_url("APP/RX/RX424.DLL");
    postData({ datosh: datosEnvio() + RX424.ADMINW + '|' + '4' + '|' + RX424.FECHAINI + '|' + RX424.SWNIT + '|' + RX424.SWMED + '|' + RX424.SUCW + '|' + RX424.PREFFACTW + '|' + RX424.CTAFACTW + '|' + RX424.FECHAFIN + '|' + RX424.NROINIW + '|' + RX424.NROFINW + '|' }, URL)
        .then(function (data) {
            RX424.FACTURAS = data.FACTURA;
            if (RX424.FACTURAS.length > 1) {
                _imprimir_RX424();
            } else {
                loader('hide');
                CON851('', 'No hay facturas por Imprimir', null, 'warning', 'Advertencia');
                _evaluarprefijo_RX424('1');
            }
        })
        .catch(err => {
        })
}

function _imprimir_RX424() {
    if (RX424.CONTADOR == RX424.FACTURAS.length - 1 || RX424.CONTADOR > RX424.FACTURAS.length) {
        if (RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.trim() != '') {
            let URL = get_url("APP/RX/RX-421W.DLL");
            postData({ datosh: datosEnvio() + RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(0, 10) + '|' + RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(10, 19) + '|' + RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(19, 36) + '|' + RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(36, 38) + '|' }, URL)
                .then(function (data) {
                    RX424.FACTURAIMPRESION = data.RESULTADOS_RX[0];

                    RX424.FACTURAIMPRESION['SUC'] = RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(10, 12)
                    RX424.FACTURAIMPRESION['CL'] = RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(12, 13)
                    RX424.FACTURAIMPRESION['COMPROB'] = RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(13, 19)
                    RX424.FACTURAIMPRESION['CUP'] = RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(19, 36)

                    RX424.FACTURAIMPRESION.RESULTADO_PPAL = RX424.FACTURAIMPRESION.RESULTADO_PPAL.replace(/\&/g, "\n").trim()
                    RX424.FACTURAIMPRESION.RESULTADO_PPAL = RX424.FACTURAIMPRESION.RESULTADO_PPAL.replace(/\�/g, "ñ").trim()

                    RX424.FACTURAIMPRESION.DESCRIP_PACI = RX424.FACTURAIMPRESION.DESCRIP_PACI.replace(/\�/g, "Ñ").trim()
                    _impresion_RX424()
                })
                .catch(err => {
                    console.log(err)
                    CON851('', 'Ha ocurrido un error en consulta', null, 'error', 'Error');
                    loader("hide")
                    _toggleNav()
                })
        } else {
            loader('hide');
            CON851('', 'Se ha impreso correctamente', null, 'success', 'Proceso terminado');
            RX424.CONTADOR = 0;
            _toggleNav();
        }
    } else {
        let URL = get_url("APP/RX/RX-421W.DLL");
        postData({ datosh: datosEnvio() + RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(0, 10) + '|' + RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(10, 19) + '|' + RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(19, 36) + '|' + RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(36, 38) + '|' }, URL)
            .then(function (data) {
                RX424.FACTURAIMPRESION = data.RESULTADOS_RX[0];

                RX424.FACTURAIMPRESION['SUC'] = RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(10, 12)
                RX424.FACTURAIMPRESION['CL'] = RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(12, 13)
                RX424.FACTURAIMPRESION['COMPROB'] = RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(13, 19)
                RX424.FACTURAIMPRESION['CUP'] = RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(19, 36)

                RX424.FACTURAIMPRESION.RESULTADO_PPAL = RX424.FACTURAIMPRESION.RESULTADO_PPAL.replace(/\&/g, "\n").trim()
                RX424.FACTURAIMPRESION.RESULTADO_PPAL = RX424.FACTURAIMPRESION.RESULTADO_PPAL.replace(/\�/g, "ñ").trim()

                RX424.FACTURAIMPRESION.DESCRIP_PACI = RX424.FACTURAIMPRESION.DESCRIP_PACI.replace(/\�/g, "Ñ").trim()
                RX424.FACTURAIMPRESION.DESCRIP_CUP = RX424.FACTURAIMPRESION.DESCRIP_CUP.replace(/\�/g, "Ñ").trim()

                _impresion_RX424()
            })
            .catch(err => {
                console.log(err)
                CON851('', 'Ha ocurrido un error en consulta', null, 'error', 'Error');
                RX424.CONTADOR = RX424.CONTADOR + 1;
                _imprimir_RX424()
            })
    }
}

function _impresion_RX424() {
    CON851('', RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(10, 19), null, 'success', 'Imprimiendo')

    let sucursal = RX424.SUCURSALES.filter(x => x.CODIGO == RX424.FACTURAIMPRESION.SUC);

    if (sucursal.length > 0) {
        if (RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(36, 38) == '01') {
            RX424.NOMBREPDF = sucursal[0].DESCRIPCION.substring(0, 4) + RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(13, 19);
        } else {
            RX424.NOMBREPDF = sucursal[0].DESCRIPCION.substring(0, 4) + RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(13, 19) + '-' + RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(36, 38);
        }
        if (RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT.substring(19, 28).trim() == '886012') {

            var Maskbmd_rx424 = IMask.createMask({ mask: Number, radix: '.', padFractionalZeros: true, signed: false, scale: 3, min: 0.000, max: 9.999 });
            var MaskScore_rx424 = IMask.createMask({ mask: Number, radix: '.', signed: true, padFractionalZeros: true, scale: 1, min: -9.9, max: 9.9 });

            RX424.FACTURAIMPRESION.ANTECEDENTES = RX424.FACTURAIMPRESION.ANTECEDENTES.replace(/\&/g, "\n").trim()
            RX424.FACTURAIMPRESION.ANTECEDENTES = RX424.FACTURAIMPRESION.ANTECEDENTES.replace(/\�/g, "ñ").trim()

            RX424.FACTURAIMPRESION.TRATAMIENTO = RX424.FACTURAIMPRESION.TRATAMIENTO.replace(/\&/g, "\n").trim()
            RX424.FACTURAIMPRESION.TRATAMIENTO = RX424.FACTURAIMPRESION.TRATAMIENTO.replace(/\�/g, "ñ").trim()

            RX424.FACTURAIMPRESION.HALLAZGOS = RX424.FACTURAIMPRESION.HALLAZGOS.replace(/\&/g, "\n").trim()
            RX424.FACTURAIMPRESION.HALLAZGOS = RX424.FACTURAIMPRESION.HALLAZGOS.replace(/\�/g, "ñ").trim()

            RX424.FACTURAIMPRESION.CONCLUSIONES = RX424.FACTURAIMPRESION.CONCLUSIONES.replace(/\&/g, "\n").trim()
            RX424.FACTURAIMPRESION.CONCLUSIONES = RX424.FACTURAIMPRESION.CONCLUSIONES.replace(/\�/g, "ñ").trim()

            RX424.FACTURAIMPRESION.USU = $_USUA_GLOBAL[0].NOMBRE.replace(/\s+/g, ' ');
            RX424.FACTURAIMPRESION.NIT = $_USUA_GLOBAL[0].NIT;

            for (var i in RX424.FACTURAIMPRESION.TABLA_MEDICION) {
                RX424.FACTURAIMPRESION.TABLA_MEDICION[i].BMD = Maskbmd_rx424.resolve(RX424.FACTURAIMPRESION.TABLA_MEDICION[i].BMD)
                RX424.FACTURAIMPRESION.TABLA_MEDICION[i].T_SCORE = MaskScore_rx424.resolve(RX424.FACTURAIMPRESION.TABLA_MEDICION[i].T_SCORE)
                RX424.FACTURAIMPRESION.TABLA_MEDICION[i].Z_SCORE = MaskScore_rx424.resolve(RX424.FACTURAIMPRESION.TABLA_MEDICION[i].Z_SCORE)
            }

            _impresion2({
                tipo: 'pdf',
                archivo: RX424.NOMBREPDF + '.pdf',
                content: _imprimir_RXI03A(RX424.FACTURAIMPRESION),
                ruta_guardado: 'C:\\PROSOFT\\MASIVO\\',
                abrir_archivo: false
            })
                .then(data => {
                    RX424.CONTADOR = RX424.CONTADOR + 1;
                    _imprimir_RX424()
                })
                .catch(err => {
                    console.log(err, 'error')
                    CON851('', 'Ha ocurrido un error imprimiendo', null, 'error', 'Error');
                    RX424.CONTADOR = RX424.CONTADOR + 1;
                    _imprimir_RX424()
                })

        } else {
            _impresion2({
                tipo: 'pdf',
                archivo: RX424.NOMBREPDF + '.pdf',
                content: imprimirEstandar_RX(RX424.FACTURAIMPRESION),
                ruta_guardado: 'C:\\PROSOFT\\MASIVO\\',
                abrir_archivo: false
            })
                .then(data => {
                    RX424.CONTADOR = RX424.CONTADOR + 1;
                    _imprimir_RX424()
                })
                .catch(err => {
                    console.log(err, 'error')
                    CON851('', 'Ha ocurrido un error imprimiendo', null, 'error', 'Error');
                    RX424.CONTADOR = RX424.CONTADOR + 1;
                    _imprimir_RX424()
                })

        }
    } else {
        loader('hide')
        CON851('', 'SUCURSAL NO EXISTE', null, 'error', 'Error');
        _evaluarprefijo_RX424('1');
    }
}
