// IMPRESION MASIVA DE ESTUDIOS DE IMAGENOLOGIA POR ENTIDAD //

var RX425 = [];

//////////////////////////// MASCARAS
let FECHA = parseInt('20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2));
var momentFormat_RX425 = 'YYYY/MM/DD';
var momentMask_RX425 = IMask($('#fechadesde_rx425')[0], {
    mask: Date,
    pattern: momentFormat_RX425,
    lazy: true,

    format: function (date) {
        return moment(date).format(momentFormat_RX425);
    },
    parse: function (str) {
        return moment(str, momentFormat_RX425);
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
var momentMask2_RX425 = IMask($('#fechahasta_rx425')[0], {
    mask: Date,
    pattern: momentFormat_RX425,
    lazy: true,

    format: function (date) {
        return moment(date).format(momentFormat_RX425);
    },
    parse: function (str) {
        return moment(str, momentFormat_RX425);
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

var clientMask_RX425 = new IMask($('#cliente_rx425')[0], { mask: Number, thousandsSeparator: ',' });
/////////////////////////////////////////////////////////

$(document).ready(function () {
    nombreOpcion('3,2 - Impresion masiva estudios de imagenologia')
    _inputControl("reset");
    _inputControl("disabled");
    loader('show');
    RX425['PREFIJOUSU'] = $_USUA_GLOBAL[0].PREFIJ;
    RX425['NOMBREUSU'] = $_USUA_GLOBAL[0].NOMBRE;
    RX425['ADMINW'] = localStorage.getItem('Usuario').trim();
    _toggleF8([
        { input: 'cliente', app: 'rx425', funct: _ventanaCliente_rx425 },
        { input: 'cups1', app: 'rx425', funct: _ventanaCups1_rx425 },
        { input: 'cups2', app: 'rx425', funct: _ventanaCups2_rx425 },
    ]);
    let URL = get_url("APP/CONTAB/CON802.DLL");
    postData({
        datosh: datosEnvio()
    }, URL)
        .then((data) => {
            RX425.TERCEROS = data.TERCEROS;
            RX425.TERCEROS.pop();
            let URL = get_url("APP/SALUD/SER802C.DLL");
            postData({
                datosh: datosEnvio()
            }, URL)
                .then((data) => {
                    loader("hide");
                    _evaluarfechadesde_RX425();
                    RX425.ARTICULOS = data.CODIGOS;
                    RX425.ARTICULOS.pop();
                    let URL = get_url("APP/CONTAB/CON823.DLL");
                    postData({
                        datosh: datosEnvio()
                    }, URL)
                        .then((data) => {
                            RX425.SUCURSALES = data.SUCURSAL;
                            RX425.SUCURSALES.pop();
                        })
                        .catch((err) => {
                            console.error(error)
                            CON851('', err, null, 'error', 'Error');
                            _toggleNav();
                        });
                })
                .catch((err) => {
                    console.error(err)
                    CON851('', error, null, 'error', 'Error');
                    _toggleNav();
                });
        })
        .catch((err) => {
            console.error(err)
            CON851('', err, null, 'error', 'Error');
            _toggleNav();
        });
});

function _ventanaCliente_rx425(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA TERCEROS',
            columnas: ['COD', 'NOMBRE', "DIRREC", "TELEF", "CIUDAD", "FACTOR"],
            mascara: ['NOMBRE'],
            data: RX425.TERCEROS,
            callback_esc: function () {
                $('#cliente_rx425').focus();
            },
            callback: function (data) {
                $('#cliente_rx425').val(data.COD); $('#cliented_rx425').val(data.DESCRIP);
                _enterInput('#cliente_rx425');
            }
        });
    }
}

function _ventanaCups1_rx425(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA CUPS',
            columnas: ['LLAVE', 'DESCRIP'],
            mascara: ['NOMBRE'],
            data: RX425.ARTICULOS,
            callback_esc: function () {
                $('#cups1_rx425').focus();
            },
            callback: function (data) {
                $('#cups1_rx425').val(data.LLAVE); $('#cups1d_rx425').val(data.DESCRIP);
                _enterInput('#cups1_rx425');
            }
        });
    }
}

function _ventanaCups2_rx425(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA CUPS',
            columnas: ['LLAVE', 'DESCRIP'],
            mascara: ['CODIGO', 'NOMBRE'],
            data: RX425.ARTICULOS,
            callback_esc: function () {
                $('#cups2_rx425').focus();
            },
            callback: function (data) {
                $('#cups2_rx425').val(data.LLAVE); $('#cups2d_rx425').val(data.DESCRIP);
                _enterInput('#cups2_rx425');
            }
        });
    }
}


function _evaluarfechadesde_RX425() {
    validarInputs(
        {
            form: "#VALIDAR1_RX425",
            orden: '1'
        },
        _toggleNav,
        () => {
            RX425.FECHAINI = momentMask_RX425.value.replace(/\//g, '');
            let URL = get_url("APP/RX/RX425.DLL");
            postData({ datosh: datosEnvio() + RX425.ADMINW + '|' + '1' + '|' + RX425.FECHAINI + '|' }, URL)
                .then(function (data) {
                    if (data.CONSULTA[0].DESCRIP.trim() == '00') {
                        _evaluarfechahasta_RX425();
                    }
                })
                .catch(err => {
                    if (err.MENSAJE == '08') {
                        _evaluarfechadesde_RX425();
                    } else {
                        _toggleNav();
                    }
                })
        }
    )
}

function _evaluarfechahasta_RX425(orden) {
    clientMask_RX425.typedValue = '99';
    validarInputs(
        {
            form: "#VALIDAR2_RX425",
            orden: orden
        },
        _evaluarfechadesde_RX425,
        () => {
            RX425.FECHAFIN = momentMask2_RX425.value.replace(/\//g, '');
            RX425.SWNIT = clientMask_RX425.unmaskedValue;
            RX425.SWNIT = RX425.SWNIT.padStart(10, '0');
            if (RX425.SWNIT == '0000000099') {
                $('#cliented_rx425').val('TODOS LOS CLIENTES');
                _evaluarcups1_RX425();
            } else {
                let URL = get_url("APP/RX/RX425.DLL");
                postData({ datosh: datosEnvio() + RX425.ADMINW + '|' + '2' + '|' + RX425.FECHAINI + '|' + RX425.FECHAFIN + '|' + RX425.SWNIT + '|' }, URL)
                    .then(function (data) {
                        if (data.CONSULTA[0].DESCRIP.trim() == '00') {
                            clientMask_RX425.typedValue = data.CONSULTA[0].DESCRIP;
                            _evaluarcups1_RX425();
                        }
                    })
                    .catch(err => {
                        _evaluarfechahasta_RX425('2');
                    })
            }
        }
    )
}

function _evaluarcups1_RX425() {
    validarInputs(
        {
            form: "#VALIDAR3_RX425",
            orden: '1'
        },
        () => { _evaluarfechahasta_RX425('2') },
        () => {
            RX425.CUPS1 = $('#cups1_rx425').val();
            let URL = get_url("APP/RX/RX425.DLL");
            postData({ datosh: datosEnvio() + RX425.ADMINW + '|' + '3' + '|' + RX425.FECHAINI + '|' + RX425.FECHAFIN + '|' + RX425.SWNIT + '|' + RX425.CUPS1 + '|' }, URL)
                .then(function (data) {
                    $('#cups1d_rx425').val(data.CONSULTA[0].DESCRIP);
                    _evaluarcups2_RX425();
                })
                .catch(err => {
                    console.log(err)
                    $('#cups1_rx425').val('');
                    _evaluarcups1_RX425();
                })
        }
    )
}

function _evaluarcups2_RX425() {
    validarInputs(
        {
            form: "#VALIDAR4_RX425",
            orden: '1'
        },
        _evaluarcups1_RX425,
        () => {
            RX425.CUPS2 = $('#cups2_rx425').val();
            let URL = get_url("APP/RX/RX425.DLL");
            postData({ datosh: datosEnvio() + RX425.ADMINW + '|' + '3' + '|' + RX425.FECHAINI + '|' + RX425.FECHAFIN + '|' + RX425.SWNIT + '|' + RX425.CUPS2 + '|' }, URL)
                .then(function (data) {
                    $('#cups2d_rx425').val(data.CONSULTA[0].DESCRIP);
                    CON851P('04', _evaluarcups2_RX425, _confirmarimpresion_RX425);
                })
                .catch(err => {
                    console.log(err)
                    $('#cups2_rx425').val('');
                    _evaluarcups2_RX425();
                })
        }
    )
}

function _confirmarimpresion_RX425() {
    loader('show');
    let URL = get_url("APP/RX/RX425.DLL");
    postData({ datosh: datosEnvio() + RX425.ADMINW + '|' + '4' + '|' + RX425.FECHAINI + '|' + RX425.FECHAFIN + '|' + RX425.SWNIT + '|' + RX425.CUPS1 + '|' + RX425.CUPS2 + '|' }, URL)
        .then(function (data) {
            RX425.FACTURAS = data.FACTURA;
            RX425.CONTADOR = 0;
            if (RX425.FACTURAS.length > 1) {
                _imprimir_RX425();
            } else {
                loader('hide');
                CON851('', 'No hay facturas por Imprimir', null, 'warning', 'Advertencia');
                _evaluarfechadesde_RX425();
            }
        })
        .catch(err => {
            console.error(err)
            _toggleNav();
        })
}

function _imprimir_RX425() {
    if (RX425.CONTADOR == RX425.FACTURAS.length - 1 || RX425.CONTADOR > RX425.FACTURAS.length) {
        if (RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.trim() != '') {
            let URL = get_url("APP/RX/RX-421W.DLL");
            postData({ datosh: datosEnvio() + RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(0, 10) + '|' + RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(10, 19) + '|' + RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(19, 36) + '|' + RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(36, 38) + '|' }, URL)
                .then(function (data) {
                    console.log(data)
                    RX425.FACTURAIMPRESION = data.RESULTADOS_RX[0];

                    RX425.FACTURAIMPRESION['SUC'] = RX425.FACTURAS[0].LLAVE_FACT.substring(10, 12)
                    RX425.FACTURAIMPRESION['CL'] = RX425.FACTURAS[0].LLAVE_FACT.substring(12, 13)
                    RX425.FACTURAIMPRESION['COMPROB'] = RX425.FACTURAS[0].LLAVE_FACT.substring(13, 19)
                    RX425.FACTURAIMPRESION['CUP'] = RX425.FACTURAS[0].LLAVE_FACT.substring(19, 36)

                    RX425.FACTURAIMPRESION.RESULTADO_PPAL = RX425.FACTURAIMPRESION.RESULTADO_PPAL.replace(/\&/g, "\n").trim()
                    RX425.FACTURAIMPRESION.RESULTADO_PPAL = RX425.FACTURAIMPRESION.RESULTADO_PPAL.replace(/\�/g, "ñ").trim()

                    RX425.FACTURAIMPRESION.DESCRIP_PACI = RX425.FACTURAIMPRESION.DESCRIP_PACI.replace(/\�/g, "Ñ").trim()
                    _impresion_RX425()
                })
                .catch(err => {
                    console.log('1')
                    console.error(err)
                    loader("hide")
                    _toggleNav()
                })
        } else {
            loader('hide');
            CON851('', 'Se ha impreso correctamente', null, 'success', 'Proceso terminado');
            RX425.CONTADOR = 0;
            _toggleNav();
        }
    } else {
        if (RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.trim() != '') {
            let URL = get_url("APP/RX/RX-421W.DLL");
            postData({ datosh: datosEnvio() + RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(0, 10) + '|' + RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(10, 19) + '|' + RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(19, 36) + '|' + RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(36, 38) + '|' }, URL)
                .then(function (data) {
                    RX425.FACTURAIMPRESION = data.RESULTADOS_RX[0];

                    RX425.FACTURAIMPRESION['SUC'] = RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(10, 12)
                    RX425.FACTURAIMPRESION['CL'] = RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(12, 13)
                    RX425.FACTURAIMPRESION['COMPROB'] = RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(13, 19)
                    RX425.FACTURAIMPRESION['CUP'] = RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(19, 36)

                    RX425.FACTURAIMPRESION.RESULTADO_PPAL = RX425.FACTURAIMPRESION.RESULTADO_PPAL.replace(/\&/g, "\n").trim()
                    RX425.FACTURAIMPRESION.RESULTADO_PPAL = RX425.FACTURAIMPRESION.RESULTADO_PPAL.replace(/\�/g, "ñ").trim()

                    RX425.FACTURAIMPRESION.DESCRIP_PACI = RX425.FACTURAIMPRESION.DESCRIP_PACI.replace(/\�/g, "Ñ").trim()
                    RX425.FACTURAIMPRESION.DESCRIP_CUP = RX425.FACTURAIMPRESION.DESCRIP_CUP.replace(/\�/g, "Ñ").trim()
                    _impresion_RX425()
                })
                .catch(err => {
                    console.log('2')
                    console.error(err)
                    loader("hide")
                    _toggleNav()
                })
        } else {
            _toggleNav();
        }
    }
}

function _impresion_RX425() {
    loader('show');
    CON851('', RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(10, 19), null, 'success', 'Imprimiendo')

    let sucursales = RX425.SUCURSALES
    let sucursal = sucursales.filter(x => x.CODIGO == RX425.FACTURAIMPRESION.SUC);
    
    if (sucursal.length > 0) {
        if (RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(36, 38) == '01') {
            RX425.NOMBREPDF = sucursal[0].DESCRIPCION.substring(0, 4) + RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(13, 19);
        } else {
            RX425.NOMBREPDF = sucursal[0].DESCRIPCION.substring(0, 4) + RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(13, 19) + '-' + RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(36, 38);
        }
        if (RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.substring(19, 36).trim() == '886012') {
            
            var Maskbmd_RX425 = IMask.createMask({ mask: Number, radix: '.', padFractionalZeros: true, signed: false, scale: 3, min: 0.000, max: 9.999 });
            var MaskScore_RX425 = IMask.createMask({ mask: Number, radix: '.', signed: true, padFractionalZeros: true, scale: 1, min: -9.9, max: 9.9 });

            RX425.FACTURAIMPRESION.ANTECEDENTES = RX425.FACTURAIMPRESION.ANTECEDENTES.replace(/\&/g, "\n").trim()
            RX425.FACTURAIMPRESION.ANTECEDENTES = RX425.FACTURAIMPRESION.ANTECEDENTES.replace(/\�/g, "ñ").trim()

            RX425.FACTURAIMPRESION.TRATAMIENTO = RX425.FACTURAIMPRESION.TRATAMIENTO.replace(/\&/g, "\n").trim()
            RX425.FACTURAIMPRESION.TRATAMIENTO = RX425.FACTURAIMPRESION.TRATAMIENTO.replace(/\�/g, "ñ").trim()

            RX425.FACTURAIMPRESION.HALLAZGOS = RX425.FACTURAIMPRESION.HALLAZGOS.replace(/\&/g, "\n").trim()
            RX425.FACTURAIMPRESION.HALLAZGOS = RX425.FACTURAIMPRESION.HALLAZGOS.replace(/\�/g, "ñ").trim()

            RX425.FACTURAIMPRESION.CONCLUSIONES = RX425.FACTURAIMPRESION.CONCLUSIONES.replace(/\&/g, "\n").trim()
            RX425.FACTURAIMPRESION.CONCLUSIONES = RX425.FACTURAIMPRESION.CONCLUSIONES.replace(/\�/g, "ñ").trim()

            RX425.FACTURAIMPRESION.USU = $_USUA_GLOBAL[0].NOMBRE.replace(/\s+/g, ' ');
            RX425.FACTURAIMPRESION.NIT = $_USUA_GLOBAL[0].NIT;

            for (var i in RX425.FACTURAIMPRESION.TABLA_MEDICION) {
                RX425.FACTURAIMPRESION.TABLA_MEDICION[i].BMD = Maskbmd_RX425.resolve(RX425.FACTURAIMPRESION.TABLA_MEDICION[i].BMD)
                RX425.FACTURAIMPRESION.TABLA_MEDICION[i].T_SCORE = MaskScore_RX425.resolve(RX425.FACTURAIMPRESION.TABLA_MEDICION[i].T_SCORE)
                RX425.FACTURAIMPRESION.TABLA_MEDICION[i].Z_SCORE = MaskScore_RX425.resolve(RX425.FACTURAIMPRESION.TABLA_MEDICION[i].Z_SCORE)
            }

            _impresion2({
                tipo: 'pdf',
                archivo: RX425.NOMBREPDF + '.pdf',
                content: _imprimir_RXI03A(RX425.FACTURAIMPRESION),
                ruta_guardado: 'C:\\PROSOFT\\MASIVO\\',
                abrir_archivo: false
            })
                .then(data => {
                    RX425.CONTADOR = RX425.CONTADOR + 1;
                    _imprimir_RX425()
                })
                .catch(err => {
                    console.log(err, 'error')
                    CON851('', 'Ha ocurrido un error imprimiendo', null, 'error', 'Error');
                    RX425.CONTADOR = RX425.CONTADOR + 1;
                    _imprimir_RX425()
                })
        } else {
            _impresion2({
                tipo: 'pdf',
                archivo: RX425.NOMBREPDF + '.pdf',
                content: imprimirEstandar_RX(RX425.FACTURAIMPRESION),
                ruta_guardado: 'C:\\PROSOFT\\MASIVO\\',
                abrir_archivo: false
            })
                .then(data => {
                    RX425.CONTADOR = RX425.CONTADOR + 1;
                    _imprimir_RX425()
                })
                .catch(err => {
                    console.log(err, 'error')
                })       
        }

    } else {
        loader('hide');
        CON851('', 'SUCURSAL NO EXISTE', null, 'error', 'Error');
        _evaluarfechadesde_RX425();
    }
}