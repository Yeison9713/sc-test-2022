// 10-06-2020 CAMILO FRANCO: creacion

const { isNumeric } = require('jquery');

var SER109 = new Object();
// import moment from "moment"
// import 'moment/src/locale/es'
moment.locale('es');

$(document).ready(() => {
    nombreOpcion('9,7,4,3,1 Imprimir fact. orden paciente');
    SER109.PREFIJOW = 'A';
    SER109.FECHALNK = '20' + $_USUA_GLOBAL[0].FECHALNK;
    SER109.PUCUSU = $_USUA_GLOBAL[0].PUC;
    SER109.NITUSU = $_USUA_GLOBAL[0].NIT;
    SER109.FACTURAS = [];
    SER109.TOTCOPAGOFAME = 0;
    SER109.TOTCTAMODFAME = 0;
    SER109.PEDIDOUSU = $_USUA_GLOBAL[0].PEDIDO;
    _inputControl('disabled');
    _inputControl('reset');
    obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, (data) => {
        data = data.PREFIJOS;
        SER109.PREFIJOS = data;
        obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, (data) => {
            data = data.FIRMAS;
            SER109.FIRMAS = data;
        });
    });
    _evaluarprefijo_SER109();
});

function _evaluarprefijo_SER109() {
    $('#prefijo_SER109').val(SER109.PREFIJOW);
    validarInputs(
        {
            form: '#VALIDAR1_SER109',
            orden: '1'
        },
        _toggleNav,
        () => {
            SER109.PREFIJOW = prefijoMask_SER109.value;
            let URL = get_url('APP/CONTAB/CON007.DLL');
            postData(
                {
                    datosh: datosEnvio() + '9' + SER109.PREFIJOW + '|'
                },
                URL
            )
                .then((data) => {
                    console.debug(data);
                    data = data.split('|');
                    $('#numeroprefijo_SER109').val(parseInt(data[1].substring(3, 9)) - 1);
                    _evaluarnumeroprefijo_SER109();
                })
                .catch((error) => {
                    console.log(error);
                    _toggleNav();
                });
        }
    );
}

function _evaluarnumeroprefijo_SER109() {
    validarInputs(
        {
            form: '#VALIDAR2_SER109',
            orden: '1'
        },
        _evaluarprefijo_SER109,
        () => {
            SER109.NUMEROW = $('#numeroprefijo_SER109').val();
            SER109.LLAVEW = SER109.PREFIJOW + SER109.NUMEROW.padStart(6, '0');
            _ImpresionesActualizarCopagos(
                { LLAVENUM: SER109.LLAVEW },
                _validarfactura_SER109,
                _evaluarnumeroprefijo_SER109
            );
        }
    );
}

function _validarfactura_SER109(data1, data2) {
    SER109.NUMERACION = data1;
    SER109.VALORES = data2;
    if (SER109.NUMERACION.TIPOPACI_NUM == 'X') SER109.NUMERACION.TIPOPACI_NUM == '*';
    SER109.FECHAPRENUM = SER109.NUMERACION.FECHAPRE_NUM;
    $('#entidad_SER109').val(SER109.NUMERACION.DESCRIP_NUM.trim());
    $('#nombrepaciente_SER109').val(SER109.NUMERACION.NOMBREPAC_NUM.trim());
    let estado = { 0: 'ACTIVO', 1: 'CERRADA', 2: 'ANULADA', 3: 'BLOQUEADA' };
    $('#estadofactura_SER109').val(
        SER109.NUMERACION.ESTADO_NUM + ' - ' + estado[SER109.NUMERACION.ESTADO_NUM]
    );
    $('#observacion_SER109').val(SER109.NUMERACION.OBSERV_NUM.trim());
    $('#anexos_SER109').val(SER109.NUMERACION.ANEXOS_NUM.trim());
    SER109.NUMERACION.FECHAPRE_NUM = SER109.NUMERACION.FECHAPRE_NUM.padStart(8, '0');

    postData({ datosh: datosEnvio() + SER109.LLAVEW + '|' }, get_url('APP/SALUD/SER808-01.DLL'))
        .then((data) => {
            console.log(data)
            SER109.FACTURACION = data.NUMER19[0];
            SER109.LISTARIPS = SER109.FACTURACION.LISTARIPS
            let fact = SER109.FACTURACION.TABLA_FACT.filter(x => parseInt(x.VLR_FACT) > 0);
            SER109.TABLAFACT = fact;
            console.log(SER109.TABLAFACT)
            let totalfact = 0;
            for (var i in SER109.TABLAFACT) {
                if (parseInt(SER109.TABLAFACT[i].VLR_FACT) > 0) {
                    totalfact = totalfact + parseInt(SER109.TABLAFACT[i].VLR_FACT);
                }
            }
            console.log(totalfact);
            SER109.VLRABONO = SER109.FACTURACION.VLRTOTALABON.padStart(16, '0')
            let abono = SER109.VLRABONO.indexOf('-');
            if (abono >= 0) SER109.VLRABONO = parseInt(SER109.VLRABONO) * -1
            SER109.SALDONETOFACT = totalfact + parseInt(SER109.VLRABONO) - parseInt(SER109.FACTURACION.COPAGOS_NUM) - parseFloat(SER109.FACTURACION.COPAGOEST_NUM);
            $('#saldoneto_SER109').val(cantidadesMask_SER109(SER109.SALDONETOFACT.toString()))
            if (parseInt(SER109.NUMERACION.FECHAPRE_NUM.substring(4, 6)) == 0) {
                if (parseInt(SER109.NUMERACION.FECHARET_NUM.substring(4, 6)) > 0) {
                    $('#fechafacturaano_SER109').val(SER109.NUMERACION.FECHARET_NUM.substring(0, 4));
                    $('#fechafacturames_SER109').val(SER109.NUMERACION.FECHARET_NUM.substring(4, 6));
                    $('#fechafacturadia_SER109').val(SER109.NUMERACION.FECHARET_NUM.substring(6, 8));
                } else {
                    let fechaactual = moment().format('YYYYMMDD');
                    $('#fechafacturaano_SER109').val(fechaactual.substring(0, 4));
                    $('#fechafacturames_SER109').val(fechaactual.substring(4, 6));
                    $('#fechafacturadia_SER109').val(fechaactual.substring(6, 8));
                }
            } else {
                $('#fechafacturaano_SER109').val(SER109.NUMERACION.FECHAPRE_NUM.substring(0, 4));
                $('#fechafacturames_SER109').val(SER109.NUMERACION.FECHAPRE_NUM.substring(4, 6));
                $('#fechafacturadia_SER109').val(SER109.NUMERACION.FECHAPRE_NUM.substring(6, 8));
            }
            if (SER109.PREFIJOW == 'T') {
                if (SER109.NUMERACION.NROPOL_NUM.trim() == '')
                    CON851('', 'Falta diligenciar numero de poliza', null, 'error', 'Error');
                $('#VALORESCARTERA_109').removeClass('hidden');
                $('#valorsalmin_SER109').val(SER109.VALORES.SALMIN);
                $('#topepoliza_SER109').val(SER109.VALORES.TOPE);
                $('#totalfact_SER109').val(SER109.VALORES.TOTAL);
            }
            if (SER109.NUMERACION.ESTADO_NUM == '0' || SER109.NUMERACION.ESTADO_NUM == '3') {
                _evaluarobservaciones_SER109('1');
            } else {
                console.log('CERRADO', SER109.LISTARIPS)
                vlrcerosMask_SER109.typedValue = 'N';
                ordenarservicio_SER109.typedValue = 'N';
                vlrunitarioMask_SER109.typedValue = 'S';
                if (SER109.LISTARIPS == 'S') {
                    console.log('ENTRO')
                    jAlert({ titulo: 'Notificacion', mensaje: `Factura: ${SER109.LLAVEW} Se encuenta lista para rips!` }, ()=>{_evaluaraceptarceros_SER109()});
                } else {
                    console.log('SALIO')
                    _evaluaraceptarceros_SER109();
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function _evaluarobservaciones_SER109(orden) {
    _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F3 para continuar' }] });
    validarInputs(
        {
            form: '#VALIDAR3_SER109',
            orden: orden
        },
        () => {
            _evaluarnumeroprefijo_SER109('2');
        },
        () => {
            _FloatText({ estado: 'off' });
            SER109.OBSERVW = $('#observacion_SER109').val();
            SER109.ANEXOSW = $('#anexos_SER109').val();
            SER109.ESTADOW = $('#estadofactura_SER109').val().substring(0, 1);
            if (SER109.NUMERACION.ESTADO_NUM == '3') {
                _grabarnumeracion_SER109();
            } else {
                bloqueoMask_SER109.typedValue = 'N';
                _evaluarbloqueofactura_SER109();
            }
        }
    );
}

function _evaluarbloqueofactura_SER109() {
    _FloatText({ estado: 'off' });
    validarInputs(
        {
            form: '#VALIDAR4_SER109',
            orden: '1'
        },
        () => {
            _evaluarobservaciones_SER109('2');
        },
        () => {
            if (bloqueoMask_SER109.value.trim() == '') bloqueoMask_SER109.typedValue = 'N';
            if (bloqueoMask_SER109.value == 'S')
                (SER109.ESTADOW = '3'),
                    (SER109.OPERBLOQNUM = localStorage.getItem('Usuario').trim());
            _grabarnumeracion_SER109();
        }
    );
}

function _grabarnumeracion_SER109() {
    if (
        SER109.OBSERVW.trim() != SER109.NUMERACION.OBSERV_NUM.trim() ||
        SER109.ANEXOSW.trim() != SER109.NUMERACION.ANEXOS_NUM.trim() ||
        SER109.ESTADOW != SER109.NUMERACION.ESTADO_NUM
    ) {
        let URL = get_url('APP/SALUD/SER109D.DLL');
        postData(
            {
                datosh:
                    datosEnvio() +
                    '2|' +
                    $_USUA_GLOBAL[0].COD_CIUD +
                    '|' +
                    SER109.LLAVEW +
                    '|' +
                    SER109.OBSERVW +
                    '|' +
                    SER109.ANEXOSW +
                    '|' +
                    SER109.ESTADOW +
                    '|' +
                    '|' +
                    '|' +
                    '|' +
                    '|' +
                    '|' +
                    localStorage.getItem('Usuario').trim() +
                    '|'
            },
            URL
        )
            .then((data) => {
                _evaluaraceptarceros_SER109();
                console.debug(data);
            })
            .catch((error) => {
                console.log(error);
                if (error.MENSAJE == '01') {
                    _evaluarbloqueofactura_SER109();
                }
            });
    } else {
        _evaluaraceptarceros_SER109();
        vlrcerosMask_SER109.typedValue = 'N';
        vlrunitarioMask_SER109.typedValue = 'S';
        ordenarservicio_SER109.typedValue = 'N';
    }
}

function _evaluaraceptarceros_SER109(orden) {
    validarInputs(
        {
            form: '#VALIDAR5_SER109',
            orden: orden
        },
        () => {
            if (SER109.NUMERACION.ESTADO_NUM == '1') _evaluarnumeroprefijo_SER109();
            else _evaluarbloqueofactura_SER109();
        },
        () => {
            if (vlrcerosMask_SER109.value.trim() == '') vlrcerosMask_SER109.typedValue = 'N';
            if (ordenarservicio_SER109.value.trim() == '') ordenarservicio_SER109.typedValue = 'N';
            if (vlrunitarioMask_SER109.value.trim() == '') vlrunitarioMask_SER109.typedValue = 'S';
            SER109.SWVLRCERO = vlrcerosMask_SER109.value;
            SER109.SWSERVI = ordenarservicio_SER109.value;
            SER109.SWVLRUNITARIO = vlrunitarioMask_SER109.value;
            _evaluarfechaimpresion_SER109('1');
        }
    );
}

function _evaluarfechaimpresion_SER109(orden) {
    validarInputs(
        {
            form: '#VALIDAR6_SER109',
            orden: orden
        },
        _evaluarbloqueofactura_SER109,
        () => {
            SER109.FECHA =
                $('#fechafacturaano_SER109').val() +
                $('#fechafacturames_SER109').val() +
                $('#fechafacturadia_SER109').val();
            SER109.ANONUM = SER109.FECHA.substring(4, 6);
            drogueriaMask_SER109.typedValue = 'S';
            mostrarcomprobanteMask_SER109.typedValue = 'S';
            mostrarfechaMask_SER109.typedValue = 'S';
            cambiarfechaMask_SER109.typedValue = 'S';
            cambiarfechaatencionMask_SER109.typedValue = 'N';
            autorizacionMask_SER109.typedValue = 'S';
            codigodrogaMask_SER109.typedValue = '2';
            nombremedicoMask_SER109.typedValue = 'N';
            _evaluarfiltrosimpresion_SER109('1');
        }
    );
}

function _evaluarfiltrosimpresion_SER109(orden) {
    validarInputs(
        {
            form: '#VALIDAR7_SER109',
            orden: orden
        },
        () => {
            _evaluarfechaimpresion_SER109('3');
        },
        () => {
            if (drogueriaMask_SER109.value.trim() == '') drogueriaMask_SER109.typedValue = 'S';
            if (mostrarcomprobanteMask_SER109.value.trim() == '')
                mostrarcomprobanteMask_SER109.typedValue = 'N';
            if (mostrarfechaMask_SER109.value.trim() == '')
                mostrarfechaMask_SER109.typedValue = 'N';
            if (cambiarfechaMask_SER109.value.trim() == '')
                cambiarfechaMask_SER109.typedValue = 'N';
            if (cambiarfechaatencionMask_SER109.value.trim() == '')
                cambiarfechaatencionMask_SER109.typedValue = 'N';
            if (autorizacionMask_SER109.value.trim() == '')
                autorizacionMask_SER109.typedValue = 'S';
            if (codigodrogaMask_SER109.value.trim() == '') codigodrogaMask_SER109.typedValue = '1';
            loader('show');
            let URL = get_url('APP/SALUD/SER109.DLL');
            postData(
                {
                    datosh:
                        datosEnvio() +
                        SER109.LLAVEW +
                        '|' +
                        mostrarfechaMask_SER109.value +
                        '|' +
                        drogueriaMask_SER109.value +
                        '|' +
                        cambiarfechaMask_SER109.value +
                        '|' +
                        cambiarfechaatencionMask_SER109.value +
                        '|' +
                        mostrarcomprobanteMask_SER109.value +
                        '|' +
                        ordenarservicio_SER109.value +
                        '|' +
                        autorizacionMask_SER109.value +
                        '|' +
                        vlrcerosMask_SER109.value +
                        '|' +
                        codigodrogaMask_SER109.value +
                        '|'
                },
                URL
            )
                .then((data) => {
                    loader('hide');
                    SER109.FACTURAS = data.FACTURA;
                    SER109.FACTURASSINDEVOLCIONES = [];
                    SER109.DEVOLUCIONES = [];
                
                    if (
                        mostrarcomprobanteMask_SER109.value == 'S' &&
                        cambiarfechaatencionMask_SER109.value == 'S'
                    ) {
                        for (let datos of SER109.FACTURAS) {
                            if (datos.VALOR.indexOf('-') < 0) {
                                SER109.FACTURASSINDEVOLCIONES.push(datos);
                            } else {
                                SER109.DEVOLUCIONES.push(datos);
                            }
                        }
                        var negativo = SER109.DEVOLUCIONES.length;
                        var conteo = 0;
                        while(negativo > 0) {
                            negativo = SER109.DEVOLUCIONES.length;
                            if (conteo == 100){
                                CON851('','La factura tiene valores negativos',null,'error', 'Error');
                                return _evaluarfiltrosimpresion_SER109('5');
                            }
                            for (let datos of SER109.FACTURASSINDEVOLCIONES) {
                                for (let [index, restar] of SER109.DEVOLUCIONES.entries()) {
                                    if (datos.CUPS == restar.CUPS) {
                                        datos.VALOR = parseInt(datos.VALOR.replace(/,/g, '')) - parseInt(restar.VALOR.replace(/,/g, '').replace(/-/g, ''));
                                        if (datos.VALOR < 0) {
                                            restar.VALOR = cantidadesMask_SER109(datos.VALOR.toString());
                                            datos.VALOR = 0
                                        }
                                        datos.VALOR = cantidadesMask_SER109(datos.VALOR.toString());
                                        datos.CANTIDAD = parseInt(datos.CANTIDAD.replace(/,/g, '')) - parseInt(restar.CANTIDAD.replace(/,/g, '').replace(/-/g, ''));
                                        if(datos.CANTIDAD == 0) {
                                            restar.CANTIDAD = 0;
                                        }
                                        if (datos.CANTIDAD < 0) {
                                            restar.CANTIDAD = cantidadesMask_SER109(datos.CANTIDAD.toString());
                                            datos.CANTIDAD = 0
                                        }
                                        datos.CANTIDAD = cantidadesMask_SER109(datos.CANTIDAD.toString());
                                        if (restar.CANTIDAD == 0 || datos.CANTIDAD > 0) {
                                            SER109.DEVOLUCIONES.splice(index, 1)
                                        }
                                    }
                                }
                            }
                            conteo++;
                        }
                        var result = SER109.FACTURASSINDEVOLCIONES.filter(datos => datos.CANTIDAD.trim() == '0.00');
                        result = result.length;
                        while(result > 0) {
                            console.log(result);
                            for (let [index, datos] of SER109.FACTURASSINDEVOLCIONES.entries()) {
                                if (datos.CANTIDAD.trim() == '0.00') {
                                    SER109.FACTURASSINDEVOLCIONES.splice(index, 1);
                                    result--;
                                }
                            }
                        }
                        SER109.FACTURAS = SER109.FACTURASSINDEVOLCIONES;

                    }
                    _evaluarlistarmedico_SER109();
                })
                .catch((error) => {
                    loader('hide');
                    if (error.MENSAJE == '08') {
                        $('#VACIA_SER109').removeClass('hidden');
                        facturavaciaMask_SER109.typedValue = 'N';
                        _evaluarimprimirvacia_SER109();
                    } else {
                        console.error(error);
                    }
                });
        }
    );
}

function _evaluarlistarmedico_SER109() {
    validarInputs(
        {
            form: '#VALIDAR8_SER109',
            orden: '1'
        },
        () => {
            _evaluarfiltrosimpresion_SER109('7');
        },
        () => {
            if (nombremedicoMask_SER109.value.trim() == '')
                nombremedicoMask_SER109.typedValue = 'N';
            SER109.SWVALIDA = nombremedicoMask_SER109.value;
            if ($_USUA_GLOBAL[0].NIT == 845000038) {
                $('#OCULTAR1_SER109').removeClass('hidden');
                _evaluarcupsporsoat_SER109();
            } else {
                facturaoriginalMask_SER109.typedValue = 'S';
                _validarcambiarfechaservi_SER109();
            }
        }
    );
}

function _evaluarcupsporsoat_SER109() {
    validarInputs(
        {
            form: '#VALIDAR9_SER109',
            orden: '1'
        },
        _evaluarlistarmedico_SER109,
        () => {
            SER109.SWSOAT = cupsporsoatMask_SER109.value;
            _validarcambiarfechaservi_SER109();
        }
    );
}

function _validarcambiarfechaservi_SER109() {
    if (
        $_USUA_GLOBAL[0].NIT == 800162035 ||
        $_USUA_GLOBAL[0].NIT == 900405505 ||
        $_USUA_GLOBAL[0].NIT == 830511298
    ) {
        $('#OCULTAR2_SER109').removeClass('hidden');
        validarInputs(
            {
                form: '#VALIDAR10_SER109',
                orden: '1'
            },
            () => {
                _evaluarfiltrosimpresion_SER109('7');
            },
            () => {
                SER109.FECHASERW = fechaxserviMask_SER109.value;
                facturaoriginalMask_SER109.typedValue = 'S';
                _evaluarfacturaoriginal_SER109();
            }
        );
    } else {
        _evaluarfacturaoriginal_SER109();
    }
}

function _evaluarfacturaoriginal_SER109() {
    SER109.TOTBASECOPAGO = SER109.TOTCOPAGOFAME = SER109.TOTCTAMODFAME = 0;
    for (var i in SER109.FACTURAS) {
        let valor = parseInt(SER109.FACTURAS[i].VALOR.trim().replace(/,/g, '').replace(/ /g, ''));
        let copago = parseInt(SER109.FACTURAS[i].COPAGO.replace(/,/g, ''));
        if (isNaN(valor)) valor = 0;
        if (isNaN(copago)) copago = 0;
        if (SER109.NUMERACION.ACUERDO260.trim() == 'S') {
            SER109.TOTBASECOPAGO = SER109.TOTBASECOPAGO + valor;
        } else {
            if (SER109.FACTURAS[i].CUPS.trim() != '890701') {
                SER109.TOTBASECOPAGO = SER109.TOTBASECOPAGO + valor;
            }
        }
        if (
            SER109.PREFIJOW != 'C' &&
            SER109.PREFIJOW != 'E' &&
            SER109.PREFIJOW != 'Ñ' &&
            SER109.PREFIJOW != 'O' &&
            SER109.PREFIJOW != 'T' &&
            SER109.PREFIJOW != 'V' &&
            SER109.PREFIJOW != 'X' &&
            SER109.PREFIJOW != 'Y' &&
            SER109.PREFIJOW != 'Z' &&
            SER109.PREFIJOW != 'W'
        ) {
            console.log(SER109.FACTURAS[i].TIPO_COPAGO);
            console.log(copago);
            if (SER109.FACTURAS[i].TIPO_COPAGO == '1') {
                if (SER109.FACTURAS[i].COPAGO.trim() != '' && copago != 0) {
                    console.log(copago);
                    SER109.TOTCOPAGOFAME = SER109.TOTCOPAGOFAME + copago;
                }
            } else if (SER109.FACTURAS[i].TIPO_COPAGO == '2') {
                if (SER109.FACTURAS[i].COPAGO.trim() != '') {
                    console.log(copago);
                    SER109.TOTCTAMODFAME = SER109.TOTCTAMODFAME + copago;
                }
            } else {
                if (SER109.FACTURAS[i].COPAGO.trim() != '') {
                    console.log(copago);
                    SER109.TOTCTAMODFAME = SER109.TOTCTAMODFAME + copago;
                }
            }
        }
        let nombrepac1, nombrepac2, apellido1pac, apellido2pac, idpaci
        let completo 
        if(SER109.PREFIJOW == 'A'){
            apellido1pac = SER109.FACTURAS[i].DETALLE.substring(0,14)
            apellido2pac = SER109.FACTURAS[i].DETALLE.substring(14,29)
            nombrepac1 = SER109.FACTURAS[i].DETALLE.substring(29,41)
            nombrepac2 = SER109.FACTURAS[i].DETALLE.substring(41,53)
            idpaci = SER109.FACTURAS[i].DETALLE.substring(53, 74)
            completo = apellido1pac.trim() + ' ' + apellido2pac.trim() + ' ' + nombrepac1.trim() + ' ' + nombrepac2.trim()
            SER109.FACTURAS[i].DETALLE =  completo.padEnd(40, ' ') + ' ' + idpaci.trim()
        }
    }
    console.log(SER109.TOTBASECOPAGO);
    validarInputs(
        {
            form: '#VALIDAR11_SER109',
            orden: '1'
        },
        () => {
            _evaluarfiltrosimpresion_SER109('7');
        },
        () => {
            if (facturaoriginalMask_SER109.value.trim() == '')
                facturaoriginalMask_SER109.typedValue = 'S';
            SER109.SWORIGINAL = facturaoriginalMask_SER109.value;
            if (SER109.PREFIJOW == 'P') {
                if (SER109.NUMERACION.ESTADO_NUM == '0' || SER109.NUMERACION.ESTADO_NUM == '3') {
                    postData(
                        {
                            datosh:
                                datosEnvio() +
                                SER109.LLAVEW +
                                '|' +
                                SER109.NUMERACION.IDPAC_NUM +
                                '|' +
                                SER109.NUMERACION.DESCRIP_PACI.substring(0, 5) +
                                '|' +
                                '20' +
                                $_USUA_GLOBAL[0].FECHALNK.substring(0, 2) +
                                '|'
                        },
                        get_url('APP/SALUD/SER836E.DLL')
                    )
                        .then((data) => {
                            console.debug(data);
                            SER109.COPAGOSACUMW = data.CONSULTA[0].COPAGO;
                            if (parseFloat(SER109.NUMERACION.PORCECOPAGO_NUM) > 0) {
                                setTimeout(() => {
                                    _liquidacioncopagos_SALUD(
                                        _datosimpresion_SER109,
                                        _evaluarfacturaoriginal_SER109,
                                        (params = {
                                            NUMERACION: SER109.NUMERACION,
                                            LLAVE_NUM: SER109.LLAVEW,
                                            TOTBASECOPAGO: SER109.TOTBASECOPAGO
                                        })
                                    );
                                }, 300);
                            } else {
                                _datosimpresion_SER109();
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            _evaluarfacturaoriginal_SER109();
                        });
                } else {
                    _datosimpresion_SER109();
                }
            } else {
                _datosimpresion_SER109();
            }
        }
    );
}

function _evaluarimprimirvacia_SER109() {
    validarInputs(
        {
            form: '#VALIDAR12_SER109',
            orden: '1'
        },
        () => {
            _evaluarfiltrosimpresion_SER109('7');
        },
        () => {
            SER109.VACIAW = facturavaciaMask_SER109.value;
            if (SER109.VACIAW == 'S') {
                // SER109.FACTURAS = '';
                // _ventanacierrefact_SER109();
                SER109.SWORIGINAL = 'N';
                _datosimpresion_SER109();
            } else {
                _toggleNav();
            }
        }
    );
}

function _datosimpresion_SER109(data) {
    if (data) {
        console.log(data);
        if (data.COPAGO.trim() == '') data.COPAGO = '0';
        if (prefijoMask_SER109.value == 'P') SER109.NUMERACION.COPAGO_NUM = data.COPAGO;
        else SER109.NUMERACION.CO_PAGO_NUM = data.COPAGO;
        SER109.NUMERACION.PORCECOPAGO_NUM = data.PORCENTAJE;
    }
    SER109.IMPRESION = new Object();
    if ($_USUA_GLOBAL[0].IVA_S == 'C') {
        if ($_USUA_GLOBAL[0].RETEIVA == 'S') {
            SER109.IMPRESION.IVA = 'IVA Regimen Comun - Retenedor Iva';
        } else {
            SER109.IMPRESION.IVA = 'IVA Regimen Comun';
        }
    } else if ($_USUA_GLOBAL[0].IVA_S == 'C') {
        if ($_USUA_GLOBAL[0].NIT == 900565371 || $_USUA_GLOBAL[0].NIT == 901120152) {
            SER109.IMPRESION.IVA = 'Somos Responsables de IVA - Actividad Excluida de IVA';
        } else {
            SER109.IMPRESION.IVA = 'IVA Regimen Simplificado';
        }
    } else if ($_USUA_GLOBAL[0].IVA_S == 'N') {
        SER109.IMPRESION.IVA = 'No somos responsables de IVA';
    } else {
        SER109.IMPRESION.IVA = '';
    }
    SER109.IMPRESION.MARCAAGUA = '';
    if (SER109.NUMERACION.ESTADO_NUM == '0') SER109.IMPRESION.MARCAAGUA = 'ACTIVO';
    if (SER109.NUMERACION.ESTADO_NUM == '2') SER109.IMPRESION.MARCAAGUA = 'ANULADO';
    SER109.IMPRESION.TOTALIVA = 0;
    SER109.IMPRESION.TOTALCOPAGO = 0;
    if (SER109.FACTURAS.length > 0) {
        for (var i in SER109.FACTURAS) {
            if ($_USUA_GLOBAL[0].NIT == 900264583 && SER109.FACTURAS[i].FECHA_ING != '000000') {
                SER109.FACTURAS[i].FECHA = SER109.FACTURAS[i].FECHA_ING;
            } else if (
                $_USUA_GLOBAL[0].NIT == 800162035 &&
                SER109.FACTURAS[i].NIT == '0830006404'
            ) {
                SER109.FACTURAS[i].FECHA = SER109.FACTURAS[i].FECHA_ING;
            } else if (
                ($_USUA_GLOBAL[0].NIT == 800162035 || $_USUA_GLOBAL[0].NIT == 900405505) &&
                SER109.FECHASERW == 'S'
            ) {
                if (SER109.FACTURAS[i].FECHA_ING != '000000') {
                    SER109.FACTURAS[i].FECHA = SER109.FACTURAS[i].FECHA_ING;
                }
            }

            if (!isNaN(parseInt(SER109.FACTURAS[i].IVA_ART.replace(/,/g, '')))) {
                SER109.TOTALIVA =
                    SER109.TOTALIVA + parseInt(SER109.FACTURAS[i].IVA_ART.replace(/,/g, ''));
            }
            if (!isNaN(parseInt(SER109.FACTURAS[i].COPAGO))) {
                console.log(SER109.FACTURAS[i].COPAGO);
                SER109.IMPRESION.TOTALCOPAGO =
                    SER109.IMPRESION.TOTALCOPAGO + parseInt(SER109.FACTURAS[i].COPAGO);
            }
        }
    }
    SER109.IMPRESION.NIT = $_USUA_GLOBAL[0].NIT;
    SER109.IMPRESION.LLAVE = SER109.LLAVEW;
    SER109.IMPRESION.FECHA = momentes(SER109.FECHA, 'YYYYMMDD', 'MMMM DD YYYY').toUpperCase();
    console.debug(SER109.IMPRESION.FECHA);
    SER109.IMPRESION.NOMTER = SER109.NUMERACION.DESCRIP_TER.replace(/\�/g, 'Ñ');
    SER109.IMPRESION.DIRECCTER = SER109.NUMERACION.DIRECC_TER;
    SER109.IMPRESION.TELTER = parseInt(SER109.NUMERACION.TEL_TER).toString();
    SER109.IMPRESION.NITTER = parseInt(SER109.FACTURAS[0].NIT).toString();
    SER109.IMPRESION.DVTER = SER109.FACTURAS[0].DV;
    SER109.IMPRESION.CIUDADTER = SER109.NUMERACION.CIUDAD_TER;
    let tipopac = {
        C: 'CONTRIBUTIVO',
        S: 'SUBSIDIADO',
        V: 'VINCULADO',
        P: 'PARTICULAR',
        O: 'OTRO TIPO',
        D: 'DESPLAZADO CONTRIBUTIV',
        E: 'DESPLAZADO SUBSIDIADO',
        F: 'DESPLAZADO VINCULADO',
        '*': 'TODOS'
    };
    SER109.IMPRESION.REGIMEN = 'EVENTO';
    SER109.IMPRESION.ZONA = SER109.NUMERACION.DESCRIP_ZONA;
    if (prefijoMask_SER109.value == 'T' || prefijoMask_SER109.value == 'P')
        SER109.IMPRESION.CLASEFACTURA = 'T';
    if (SER109.NUMERACION.FACTCAPIT_NUM == SER109.LLAVEW) SER109.IMPRESION.REGIMEN = 'CAPITA';
    SER109.IMPRESION.TIPOPACI = tipopac[SER109.NUMERACION.TIPOPACI_NUM];
    SER109.IMPRESION.AUTORIZA = SER109.NUMERACION.AUTORI_NUM;
    SER109.IMPRESION.NOMBREPACNUM = SER109.NUMERACION.NOMBREPAC_NUM;
    SER109.IMPRESION.IDPACNUM = SER109.NUMERACION.IDPAC_NUM;
    let edad = calcular_edad(SER109.NUMERACION.NACIPACI_NUM);
    SER109.IMPRESION.EDAD = `${edad.unid_edad}${edad.vlr_edad.toString().padStart(3, '0')}`;
    SER109.IMPRESION.DESCRIPTAR = SER109.NUMERACION.CONVENIO_NUM;
    SER109.IMPRESION.NROAFILPACI = SER109.NUMERACION.NROAFIL_PACI;
    SER109.IMPRESION.TIPOIDPACI = SER109.NUMERACION.TIPOID_PACI;
    SER109.IMPRESION.DIRECCPACI = SER109.NUMERACION.DIRECC_PACI;
    SER109.IMPRESION.CIUDADPACI = SER109.NUMERACION.CIUDAD_PACI;
    SER109.IMPRESION.EPSPACI = SER109.NUMERACION.EPS_PACI;
    SER109.IMPRESION.NOMBREENT = SER109.NUMERACION.NOMBRE_ENT;
    let original = {
        S: '*** ORIGINAL ***',
        N: '*** COPIA ***'
    };
    SER109.IMPRESION.ORIGINAL = original[SER109.SWORIGINAL];
    let sexo = { F: 'Femenino', M: 'Masculino' };
    SER109.IMPRESION.SEXO = sexo[SER109.NUMERACION.SEXO_PACI.toUpperCase()];
    if (SER109.FACTURAS.length > 0) SER109.FACTURAS.pop();
    SER109.IMPRESION.FACTURAS = SER109.FACTURAS;
    SER109.IMPRESION.ANEXOSNUM = $('#anexos_SER109').val().trim();
    SER109.IMPRESION.OBSERVNUM = $('#observacion_SER109').val().trim();
    SER109.IMPRESION.OBSERVACION = '2';
    SER109.IMPRESION.NOMBREPDF =
        localStorage.getItem('Usuario').trim() + moment().format('YYMMDDHHss');

    SER109.IMPRESION.TOTAL = 0;
    if (SER109.FACTURAS.length > 0) {
        for (var i in SER109.FACTURAS) {
            let articulo = parseInt(
                SER109.FACTURAS[i].VALOR.trim().replace(/,/g, '').replace(/ /g, '0')
            );
            console.log(
                articulo,
                SER109.FACTURAS[i].VALOR.trim().replace(/,/g, '').replace(/ /g, '0')
            );
            if (!isNaN(articulo)) {
                SER109.IMPRESION.TOTAL = SER109.IMPRESION.TOTAL + articulo;
            }
        }
        for (var i in SER109.FACTURAS) {
            if (SER109.FACTURAS[i].ARTICULO.trim() == 'XXCAPI') {
                SER109.FACTURAS[i].DETALLE = '';
                SER109.FACTURAS[i].COPAGO = '';
                SER109.FACTURAS[i].SEXO = '';
                SER109.FACTURAS[i].EDAD = '';
            }
        }
    } else {
        SER109.FACTURAS.push({
            FECHA: '        ',
            FECHA_ING: '        ',
            ORDEN_SUC: '  ',
            ORDEN: ' ',
            SUC: '  ',
            CL: ' ',
            NRO_COMP: '      ',
            EDAD: '    ',
            SEXO: ' ',
            NIT: '          ',
            DETALLE: '                                           ',
            COD_PACI: '               ',
            NOMBRE: '                         ',
            ESPEC: '   ',
            UNID_SERV: '  ',
            COD: '    ',
            NRO_AUTOR: '                           ',
            NRO_AUTOR2: '                           ',
            COSTO: '    ',
            TIPO_COPAGO: ' ',
            COPAGO: '          ',
            CONCEPTO: '                                               ',
            CUPS: '                 ',
            MEDICO: '          ',
            VALOR: '                   ',
            VALOR_UNIT: '                   ',
            IVA_ART: '          ',
            CANTIDAD: '                   ',
            CUM: '               ',
            ARTICULO: '                 ',
            REFER: '               ',
            DV: ' ',
            NOM_MEDICO: '                                                  ',
            NOM_ESPEC: '                                                  ',
            TIPO_DR: ' '
        });
    }
    console.log(SER109.IMPRESION.TOTAL);
    SER109.ABONOSW = 0;
    for (var i in SER109.NUMERACION.TABLARBOS_NUM) {
        let abono = 0;
        let negativo = SER109.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM.indexOf('-');
        abono = parseInt(
            SER109.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM.replace(/,/g, '').replace(/-/g, '')
        );
        if (isNaN(abono)) abono = 0;
        if (SER109.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM.trim() != '') {
            if (negativo >= 0) abono = abono * -1;
            SER109.ABONOSW = SER109.ABONOSW + abono;
        }
    }
    SER109.IMPRESION.PREFIJOW = SER109.PREFIJOW;
    SER109.IMPRESION.COPAGONUM = SER109.NUMERACION.FORMACOPAGO_NUM;
    SER109.IMPRESION.OPERNUM = SER109.NUMERACION.OPER_NUM;
    SER109.IMPRESION.OPERMODNUM = SER109.NUMERACION.OPERMOD_NUM;
    SER109.IMPRESION.OPERBLOQNUM = SER109.NUMERACION.OPERBLOQ_NUM;
    SER109.IMPRESION.ADMINW = localStorage.getItem('Usuario').trim();
    SER109.IMPRESION.FECHAIMPRESION = moment().format('YYMMDD');
    SER109.IMPRESION.FECHAOPER = moment(SER109.NUMERACION.FECHAING_NUM, 'YYYYMMDD').format(
        'YYMMDD'
    );
    if (SER109.IMPRESION.FECHAOPER == 'Invalid date') SER109.IMPRESION.FECHAOPER = '000000';
    SER109.IMPRESION.FECHAMODOPER = moment(SER109.NUMERACION.FECHAMOD_NUM, 'YYYYMMDD').format(
        'YYMMDD'
    );
    if (SER109.IMPRESION.FECHAMODOPER == 'Invalid date') SER109.IMPRESION.FECHAMODOPER = '000000';
    SER109.IMPRESION.FECHARETOPER = moment(SER109.NUMERACION.FECHARET_NUM, 'YYYYMMDD').format(
        'YYMMDD'
    );
    if (SER109.IMPRESION.FECHARETOPER == 'Invalid date') SER109.IMPRESION.FECHARETOPER = '000000';
    SER109.IMPRESION.TABLARBOS_NUM = SER109.NUMERACION.TABLARBOS_NUM;
    if (prefijoMask_SER109.value == 'P')
        SER109.IMPRESION.SALDOCOPAGO = parseInt(SER109.NUMERACION.COPAGO_NUM.padStart(9, '0'));
    else SER109.IMPRESION.SALDOCOPAGO = parseInt(SER109.NUMERACION.COPAGO_NUM.padStart(9, '0'));
    SER109.IMPRESION.NITNUM = SER109.NUMERACION.NIT_NUM;
    SER109.IMPRESION.FORMACOPAGONUM = SER109.NUMERACION.FORMACOPAGO_NUM;
    SER109.IMPRESION.TOTCTAMODFAME = SER109.TOTCTAMODFAME;
    SER109.IMPRESION.TOTCOPAGOFAME = SER109.TOTCOPAGOFAME;
    SER109.IMPRESION.ABONOSW = SER109.ABONOSW;
    SER109.IMPRESION.VLRTOTAL = SER109.IMPRESION.TOTAL;
    // SER109.IMPRESION.SALDO = SER109.IMPRESION.TOTAL + SER109.IMPRESION.ABONOSW - SER109.NUMERACION.CO_PAGO_NUM - SER109.TOTCOPAGOFAME - SER109.TOTCTAMODFAME;
    SER109.IMPRESION.SALDO =
        SER109.IMPRESION.TOTAL -
        SER109.IMPRESION.SALDOCOPAGO -
        SER109.TOTCOPAGOFAME -
        SER109.TOTCTAMODFAME +
        SER109.ABONOSW;
    let valorenletras = FAC146(SER109.IMPRESION.SALDO);
    SER109.IMPRESION.NUMEROENLETRAS = 'SON: ' + valorenletras;
    let prefijo = SER109.PREFIJOS[0].TABLA.filter(
        (x) => x.PREFIJO.trim() == SER109.PREFIJOW.trim()
    );
    console.log(prefijo);
    if (prefijo.length == 0) {
        prefijo[0] = new Object();
        prefijo[0].AUT_DIAN = '';
        prefijo[0].PREFIJO = prefijoMask_SER109.value;
        prefijo[0].DESDE_NRO = '';
        prefijo[0].HASTA_NRO = '';
        prefijo[0].FECHA_INI = '';
        prefijo[0].FECHA_FIN = '';
    }
    SER109.IMPRESION.PREFIJO = prefijo;
    SER109.IMPRESION.FORMATOTABLA = 1; // HABILITA ESTE FORMATO EN LA IMPRESION VER FUNCION _impresionformatoSER109 EN _impresionesSALUD.js
    SER109.IMPRESION.ANEXO = 2;
    SER109.IMPRESION.OBSERVACION = 2;

    SER109.IMPRESION.WIDTH = [
        '5%',
        '8%',
        '19%',
        '5%',
        '4%',
        '25%',
        '3%',
        '8%',
        '8%',
        '4%',
        '8%',
        '3%'
    ];
    SER109.IMPRESION.COLUMNAS = [
        'NRO_COMP',
        'FECHA',
        'DETALLE',
        'EDAD',
        'SEXO',
        'CONCEPTO',
        'CANTIDAD',
        'VALOR',
        'COPAGO',
        'NRO_AUTOR',
        'ARTICULO',
        'UNID_SERV'
    ];
    if (prefijoMask_SER109.value == 'T' || prefijoMask_SER109.value == 'P') {
        SER109.IMPRESION.FORMATOTABLA = 9;
        SER109.IMPRESION.WIDTH = ['5%', '8%', '30%', '7%', '10%', '10%', '8%', '7%', '15%'];
        SER109.IMPRESION.COLUMNAS = [
            'NRO_COMP',
            'FECHA',
            'CONCEPTO',
            'CANTIDAD',
            'VALOR_UNIT',
            'VALOR',
            'ARTICULO',
            'NRO_AUTOR',
            'UNID_SERV'
        ];
    }
    if (SER109.IMPRESION.length > 2) SER109.IMPRESION.MARGIN = [10, 155, 10, 20];
    else SER109.IMPRESION.MARGIN = [10, 145, 10, 20];

    if (
        SER109.PREFIJOW == 'A' ||
        SER109.PREFIJOW == 'B' ||
        SER109.PREFIJOW == 'D' ||
        SER109.PREFIJOW == 'F' ||
        SER109.PREFIJOW == 'G' ||
        SER109.PREFIJOW == 'H' ||
        SER109.PREFIJOW == 'I' ||
        SER109.PREFIJOW == 'J' ||
        SER109.PREFIJOW == 'K' ||
        SER109.PREFIJOW == 'L' ||
        SER109.PREFIJOW == 'M' ||
        SER109.PREFIJOW == 'N'
    ) {
        if (nombremedicoMask_SER109.value == 'S') {
            SER109.IMPRESION.estilohoja = 2;
            SER109.IMPRESION.FORMATOTABLA = 5;
            SER109.IMPRESION.WIDTH = [
                '5%',
                '6%',
                '17%',
                '4%',
                '4%',
                '20%',
                '4%',
                '7%',
                '7%',
                '5%',
                '5%',
                '6%',
                '11%'
            ];
            SER109.IMPRESION.COLUMNAS = [
                'NRO_COMP',
                'FECHA',
                'DETALLE',
                'EDAD',
                'SEXO',
                'CONCEPTO',
                'CANTIDAD',
                'VALOR',
                'ARTICULO',
                'CUM',
                'NRO_AUTOR',
                'COPAGO',
                'NOM_MEDICO'
            ];
        }
    } else {
        if (nombremedicoMask_SER109.value == 'S') {
            SER109.IMPRESION.estilohoja = 2;
            SER109.IMPRESION.FORMATOTABLA = 8;
            SER109.IMPRESION.WIDTH = ['8%', '5%', '22%', '5%', '8%', '8%', '5%', '15%', '15%'];
            SER109.IMPRESION.COLUMNAS = [
                'NRO_COMP',
                'FECHA',
                'CONCEPTO',
                'CANTIDAD',
                'VALOR',
                'ARTICULO',
                'UNID_SERV',
                'NOM_ESPEC',
                'NOM_MEDICO'
            ];
        }
    }

    SER109.IMPRESION.IMPRESION = 'SER109';
    if (
        $_USUA_GLOBAL[0].NIT == 892000401 ||
        $_USUA_GLOBAL[0].NIT == 900648993 ||
        $_USUA_GLOBAL[0].NIT == 900755133 ||
        $_USUA_GLOBAL[0].NIT == 900804411 ||
        $_USUA_GLOBAL[0].NIT == 900161116 ||
        $_USUA_GLOBAL[0].NIT == 900424844 ||
        $_USUA_GLOBAL[0].NIT == 900870633
    ) {
        SER109.IMPRESION.FIRMA1 = localStorage.getItem('IDUSU');
    } else {
        SER109.IMPRESION.FIRMA1 = parseInt(SER109.FIRMAS[0].DATOS_GER.substring(0, 10)).toString();
    }
    if (SER109.FACTURAS.length > 0) {
        for (var i in SER109.FACTURAS) {
            if (SER109.FACTURAS[i].ARTICULO.trim() == 'XXCAPI') {
                SER109.IMPRESION.FIRMA1 = '';
            }
        }
    }
    console.log(SER109.IMPRESION);
    if (prefijoMask_SER109.value == 'P' || prefijoMask_SER109.value == 'T') {
        postData(
            { datosh: `${datosEnvio()}${SER109.NUMERACION.IDPAC_NUM}|` },
            get_url('APP/SALUD/SER810-1.DLL')
        )
            .then((data) => {
                console.debug(data);
                let nombredelpaciente = `${data['REG-PACI'][0]['APELL-PACI1'].trim()} ${data[
                    'REG-PACI'
                ][0]['APELL-PACI2'].trim()} ${data['REG-PACI'][0]['NOM-PACI1'].trim()} ${data[
                    'REG-PACI'
                ][0]['NOM-PACI2'].trim()}`;
                SER109.IMPRESION.NOMBREPACNUM = nombredelpaciente;
                _impresionformatoSER109(
                    SER109.IMPRESION,
                    _cerrarnumeracion_SER109,
                    _evaluarfacturaoriginal_SER109
                );
            })
            .catch((error) => {
                console.error(error);
                CON851('', 'Revisar paciente', null, 'error', 'Error');
                _evaluarfiltrosimpresion_SER109('3');
            });
    } else {
        _impresionformatoSER109(
            SER109.IMPRESION,
            _cerrarnumeracion_SER109,
            _evaluarfacturaoriginal_SER109
        );
    }
}

function _cerrarnumeracion_SER109() {
    if (SER109.NUMERACION.ESTADO_NUM == '0' || SER109.NUMERACION.ESTADO_NUM == '3') {
        if (
            SER109.PREFIJOW == 'A' ||
            SER109.PREFIJOW == 'B' ||
            SER109.PREFIJOW == 'D' ||
            SER109.PREFIJOW == 'F' ||
            SER109.PREFIJOW == 'G' ||
            SER109.PREFIJOW == 'H' ||
            SER109.PREFIJOW == 'I' ||
            SER109.PREFIJOW == 'J' ||
            SER109.PREFIJOW == 'K'
        ) {
            if (
                SER109.FECHALNK.substring(0, 4) == SER109.NUMERACION.FECHAING_NUM.substring(0, 4) &&
                SER109.FECHALNK.substring(4, 6) == SER109.NUMERACION.FECHAING_NUM.substring(4, 6)
            ) {
                _cerrarnumeracion_VENTANA(
                    _toggleNav,
                    _evaluarprefijo_SER109,
                    (params = {
                        LLAVE_NUM: SER109.LLAVEW,
                        PREFIJOW: SER109.PREFIJOW,
                        FECHAING_NUM: SER109.NUMERACION.FECHAING_NUM,
                        ESTADOW: SER109.ESTADOW,
                        FECHALNK: SER109.FECHALNK
                    })
                );
            } else {
                CON851('3G', '3G', null, 'error', 'Error');
                _toggleNav();
            }
        } else {
            _cerrarnumeracion_VENTANA(
                _toggleNav,
                _evaluarprefijo_SER109,
                (params = {
                    LLAVE_NUM: SER109.LLAVEW,
                    PREFIJOW: SER109.PREFIJOW,
                    FECHAING_NUM: SER109.NUMERACION.FECHAING_NUM,
                    ESTADOW: SER109.ESTADOW,
                    FECHALNK: SER109.FECHALNK
                })
            );
        }
    } else {
        _toggleNav();
    }
}

///////////////MASCARAS//////////////////////////////////
var prefijoMask_SER109 = IMask($('#prefijo_SER109')[0], {
    mask: 'a',
    definitions: {
        a: /[APTBDEFGHIJKLMNQRSVWXYZ]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false;
        } else {
            return str.toUpperCase();
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase();
    }
});

var bloqueoMask_SER109 = IMask($('#bloquearfactura_SER109')[0], {
    mask: 'a',
    definitions: {
        a: /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false;
        } else {
            return str.toUpperCase();
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase();
    }
});

var vlrcerosMask_SER109 = IMask($('#vlrceros_SER109')[0], {
    mask: 'a',
    definitions: {
        a: /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false;
        } else {
            return str.toUpperCase();
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase();
    }
});

var vlrunitarioMask_SER109 = IMask($('#vlrunitario_SER109')[0], {
    mask: 'a',
    definitions: {
        a: /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false;
        } else {
            return str.toUpperCase();
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase();
    }
});

var ordenarservicio_SER109 = IMask($('#ordenarservicio_SER109')[0], {
    mask: 'a',
    definitions: {
        a: /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false;
        } else {
            return str.toUpperCase();
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase();
    }
});

var drogueriaMask_SER109 = IMask($('#drogueria_SER109')[0], {
    mask: 'a',
    definitions: {
        a: /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false;
        } else {
            return str.toUpperCase();
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase();
    }
});

var mostrarcomprobanteMask_SER109 = IMask($('#mostrarcomprob_SER109')[0], {
    mask: 'a',
    definitions: {
        a: /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false;
        } else {
            return str.toUpperCase();
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase();
    }
});

var mostrarfechaMask_SER109 = IMask($('#mostrarfecha_SER109')[0], {
    mask: 'a',
    definitions: {
        a: /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false;
        } else {
            return str.toUpperCase();
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase();
    }
});

var cambiarfechaMask_SER109 = IMask($('#cambiarfecha_SER109')[0], {
    mask: 'a',
    definitions: {
        a: /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false;
        } else {
            return str.toUpperCase();
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase();
    }
});

var cambiarfechaatencionMask_SER109 = IMask($('#cambiarfechaatencion_SER109')[0], {
    mask: 'a',
    definitions: {
        a: /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false;
        } else {
            return str.toUpperCase();
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase();
    }
});

var autorizacionMask_SER109 = IMask($('#autorizacion_SER109')[0], {
    mask: 'a',
    definitions: {
        a: /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false;
        } else {
            return str.toUpperCase();
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase();
    }
});

var codigodrogaMask_SER109 = IMask($('#codigodroga_SER109')[0], {
    mask: 'a',
    definitions: {
        a: /[123]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false;
        } else {
            return str.toUpperCase();
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase();
    }
});

var cupsporsoatMask_SER109 = IMask($('#cupsporsoat_SER109')[0], {
    mask: 'a',
    definitions: {
        a: /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false;
        } else {
            return str.toUpperCase();
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase();
    }
});

var nombremedicoMask_SER109 = IMask($('#nombremedico_SER109')[0], {
    mask: 'a',
    definitions: {
        a: /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false;
        } else {
            return str.toUpperCase();
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase();
    }
});

var fechaxserviMask_SER109 = IMask($('#fechaxservi_SER109')[0], {
    mask: 'a',
    definitions: {
        a: /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false;
        } else {
            return str.toUpperCase();
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase();
    }
});

var facturaoriginalMask_SER109 = IMask($('#facturaoriginal_SER109')[0], {
    mask: 'a',
    definitions: {
        a: /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false;
        } else {
            return str.toUpperCase();
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase();
    }
});

var facturavaciaMask_SER109 = IMask($('#facturavacia_SER109')[0], {
    mask: 'a',
    definitions: {
        a: /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false;
        } else {
            return str.toUpperCase();
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase();
    }
});

var cantidadesMask_SER109 = IMask.createPipe({
    mask: Number,
    scale: 2,
    radix: '.',
    normalizeZeros: true,
    padFractionalZeros: true
});
