// basado en proceso de leer-anterior y re_liquidacion del inv450A, SALUD
var $_CONTEORELIQUIDACION = 0;
function leer_cuenta_SALUD(data, callbackerror, callbacksucces) {
    loader("show")
    var dato = data
    var cta = dato.PREFIJO + dato.NRO_CTA
    console.log(cta)

    var datos_envio_SALUD = datosEnvio()
    datos_envio_SALUD += cta
    datos_envio_SALUD += '|'
    datos_envio_SALUD += "A"
    datos_envio_SALUD += '|'

    let URL = get_url("APP/SALUD/SAL450A-02.DLL");

    postData({
        datosh: datos_envio_SALUD
    }, URL)
        .then((data) => {
            var numeracion = data.NUMERACION[0]

            console.log(numeracion)
            var ano_sig_fact = moment(dato.FECHA).format("YYYY")
            var mes_sig_Fact = moment(dato.FECHA).format("MM")

            if (dato.PREFIJO == "A" || dato.PREFIJO == "P" || dato.PREFIJO == "T" || dato.PREFIJO == "B" || dato.PREFIJO == "D" || dato.PREFIJO == "F" ||
                dato.PREFIJO == "G" || dato.PREFIJO == "H" || dato.PREFIJO == "I" || dato.PREFIJO == "J" || dato.PREFIJO == "K" || dato.PREFIJO == "L" ||
                dato.PREFIJO == "M" || dato.PREFIJO == "N" || dato.PREFIJO == "O" || dato.PREFIJO == "Q" || dato.PREFIJO == "R" || dato.PREFIJO == "R" ||
                dato.PREFIJO == "S" || dato.PREFIJO == "V" || dato.PREFIJO == "W" || dato.PREFIJO == "X" || dato.PREFIJO == "Y" || dato.PREFIJO == "Z") {

                var ano_sis = moment().format('YYYY')
                var mes_sis = moment().format('MM')
                var dia_sis = moment().format('DD')

                if (parseInt(dia_sis) >= 20) {
                    mes_sis = parseInt(mes_sis) + 1
                    dia_sis = '01'
                    if (mes_sis > 12) {
                        ano_sis = parseInt(ano_sis) + 1
                        mes_sis = 1
                    }
                    mes_sis.toString()
                }

                if ((ano_sig_fact != numeracion.ANO_ING && mes_sig_Fact != numeracion.MES_ING) || (numeracion.ANO_ING != ano_sis && numeracion.MES_ING != mes_sis)) {
                    CON851('91', 'FACTURA DE OTRO MES!', null, 'error', 'error')
                    callbackerror()
                } else {
                    leer_anterior_SALUD(dato, numeracion, callbackerror, callbacksucces)
                }

            } else {

                if (dato.FECHA < numeracion.FECHA_ING) {
                    console.log('año siguiente no coincide con fecha ingreso numeracion')
                    CON851('91', 'ERROR EN FECHA ING!', null, 'error', 'error')
                    callbackerror()
                } else {
                    leer_anterior_SALUD(dato, numeracion, callbackerror, callbacksucces)
                }
            }
        })
        .catch(error => {
            console.error(error)
            loader("hide")
            callbackerror()
        });
}

function leer_anterior_SALUD(dato, numeracion, callbackerror, callbacksucces) {
    if (numeracion.ESTADO == '1') {
        CON851('13', 'PACIENTE RETIRADO', null, 'error', 'error')
        callbackerror()

    } else if (numeracion.ESTADO == '2') {
        CON851('13', 'FACTURA ANULADA', null, 'error', 'error')
        callbackerror()

    } else if ((numeracion.ESTADO == '3') && (global_SAL491.ADMIN_W != numeracion.OPER_BLOQUEO)) {
        CON851('13', 'FACTURA BLOQUEADA', null, 'error', 'error')
        callbackerror()
    } else {
        if (dato.PREFIJO == 'P' || dato.PREFIJO == 'T') {

            var switch_mes = [
                { 'MES': '01', 'NRO' : 0},
                { 'MES': '02', 'NRO' : 31},
                { 'MES': '03', 'NRO' : 59},
                { 'MES': '04', 'NRO' : 90},
                { 'MES': '05', 'NRO' : 120},
                { 'MES': '06', 'NRO' : 151},
                { 'MES': '07', 'NRO' : 181},
                { 'MES': '08', 'NRO' : 212},
                { 'MES': '09', 'NRO' : 243},
                { 'MES': '10', 'NRO' : 273},
                { 'MES': '11', 'NRO' : 304},
                { 'MES': '12', 'NRO' : 334}
            ]
            console.log(switch_mes)
            dato.ID_PACIENTE = numeracion.ID_PAC

            var nro_mes_w = ''
            nro_mes_w = switch_mes.find(mes => mes.MES == numeracion.MES_ING)

            nro_mes_w = nro_mes_w.NRO

            if ((parseInt(numeracion.MES_ING) > 02) && (numeracion.ANO_ING == '1996' || numeracion.ANO_ING == '2000' || numeracion.ANO_ING == '2004' || numeracion.ANO_ING == '2008') || numeracion.ANO_ING == '2012' || numeracion.ANO_ING == '2016') {
                nro_mes_w = nro_mes_w + 1
            }

            var horas_ing_w = Math.round((parseInt(numeracion.ANO_ING) * 365.25 * 24) + (nro_mes_w * 24) + (parseInt(numeracion.DIA_ING) * 24) + parseInt(numeracion.HR_ING) + (parseInt(numeracion.MN_ING) / 60))

            nro_mes_w = ''
            var ano_sig_fact = moment(dato.FECHA).format("YYYY")
            var mes_sig_Fact = moment(dato.FECHA).format("MM")
            var dia_sig_Fact = moment(dato.FECHA).format("DD")

            var nro_mes_w = switch_mes.find(mes => mes.MES == mes_sig_Fact)

            nro_mes_w = nro_mes_w.NRO

            if ((parseInt(mes_sig_Fact) > 02) && (ano_sig_fact == '1996' || ano_sig_fact == '2000' || ano_sig_fact == '2004' || ano_sig_fact == '2008') || ano_sig_fact == '2012' || ano_sig_fact == '2016') {
                nro_mes_w = nro_mes_w + 1
            }

            var horas_act_w = Math.round((parseInt(ano_sig_fact) * 365.25 * 24) + (nro_mes_w * 24) + (parseInt(dia_sig_Fact) * 24) + parseInt(dato.HR_ATEN) + (parseInt(dato.MN_ATEN) / 60))

            dato['DIAS_ESTANC']
            if (horas_ing_w > horas_act_w) {
                dato.DIAS_ESTANC = ''
            } else {
                dato.DIAS_ESTANC = Math.round((horas_act_w - horas_ing_w) / 24)
            }

        }
        busqueda_Tarifa_SALUD(dato, numeracion, callbackerror, callbacksucces)
    }
}

function busqueda_Tarifa_SALUD(dato, numeracion, callbackerror, callbacksucces) {
    dato['NIT_NUM'] = numeracion.NIT
    dato['CONVENIO_NUM'] = numeracion.CONVENIO

    obtenerDatosCompletos({ nombreFd: 'TARIFAS' }, function (data) {
        var tarifas = data.TARIFAS;
        tarifas.pop()

        var busquedaTarifa

        if (dato.PREFIJO == 'E' || dato.PREFIJO == 'C') dato.CONVENIO_NUM = "CL"

        busquedaTarifa = tarifas.find(tarifa => tarifa.COD == dato.CONVENIO_NUM)

        if (!busquedaTarifa) {
            CON851('01', 'ERROR NO EXISTE CONVENIO', null, 'error', 'error')
            callbackerror()
        } else {
            leer_convenio_SALUD(dato, busquedaTarifa, callbacksucces)
        }
    }, 'ONLY');
}


function leer_convenio_SALUD(dato, busquedaTarifa, callbacksucces) {
    CON851(busquedaTarifa.COD, busquedaTarifa.DESCRIP, null, 'success', 'Convenio:')

    var cod_tab_w

    if (dato.CLASE == '0') {
        cod_tab_w = dato.CONVENIO
        if (busquedaTarifa.PORC_PO.trim() == '') busquedaTarifa.PORC_PO = "100.00"
        if (busquedaTarifa.PORC_NP.trim() == '') busquedaTarifa.PORC_NP = busquedaTarifa.PORC_PO
        if (busquedaTarifa.PORC_MO.trim() == '') busquedaTarifa.PORC_MO = busquedaTarifa.PORC_PO
        if (busquedaTarifa.PORC_MQ.trim() == '') busquedaTarifa.PORC_MQ = busquedaTarifa.PORC_PO
    } else {
        var sw_cl
        sw_cl = dato.CLASE.split('')[0]
        if (dato.CLASE == '7') sw_cl = '5'

        var numerico = $.isNumeric(busquedaTarifa.SAL_MIN)
        if (busquedaTarifa.SAL_MIN == '000000000' || busquedaTarifa.SAL_MIN.trim() == '' || numerico == false) busquedaTarifa.SAL_MIN = $_USUA_GLOBAL[0].SAL_MIN / 30
        // console.log(sw_cl)
        // console.log(busquedaTarifa.TABLA)
        cod_tab_w = busquedaTarifa.TABLA[sw_cl].COD_TABLA

        dato.FACTOR_W = Math.round(parseFloat(busquedaTarifa.TABLA[sw_cl].PORC_TABLA) / 100)
    }

    if (dato.TARIF != cod_tab_w) {
        jAlert({ titulo: 'ATENCION! SE CAMBIO LA TARIFA', mensaje: 'Tarifa anterior: ' + dato.TARIF + '   Tarifa actual: ' + cod_tab_w }, () => re_liquidar_SALUD(dato, busquedaTarifa, callbacksucces));
    } else {
        re_liquidar_SALUD(dato, busquedaTarifa, callbacksucces)
    }
}

function re_liquidar_SALUD(dato, tarifas, callbacksucces) {
    var sw_Cl
    var tarifas_liq = tarifas
    var tablas_liq = []
    var maest_Artic = []
    var medicamentos = []

    // console.log(dato)

    dato.VALOR_IVA = ''

    if (dato.CLASE == '0') {
        obtenerDatosCompletos({ nombreFd: 'ARTICULOS' }, function (articulos) {
            maest_Artic = articulos.ARTICULOS;
            maest_Artic.pop()
            console.log(maest_Artic)
            obtenerDatosCompletos({ nombreFd: 'MEDICAMENTOS' }, function (data) {
                medicamentos = data.MEDICAMENTOS;
                medicamentos.pop()
                console.log(medicamentos)

                dato.TARIF = '  '

                for (var i in dato.TABLA) {
                    if (dato.TABLA[i].GRUPO.trim() != '') {
                        var articulo_busqueda = '0' + dato.TABLA[i].ARTICULO.trim()
                        var busquedaArtic = maest_Artic.find(artic => artic.LLAVE_ART.trim() == articulo_busqueda)

                        if (!busquedaArtic) {
                            busquedaArtic = [{ 'VR_VENTA_1': '', 'VR_ULT_COMPRA': '', 'IVA': '', 'VLR_LISTA_COMP': '', 'VLR_REF': '' }]
                            busquedaArtic.VR_VENTA_1 = dato.TABLA[i].VALOR_FACT / dato.TABLA[i].CANTIDAD
                            busquedaArtic.VR_ULT_COMPRA = busquedaArtic.VR_VENTA_1
                        }

                        dato['VALOR_BASE1_IVA'] = ''
                        dato['VALOR_BASE2_IVA'] = ''
                        dato['VALOR_BASE3_IVA'] = ''
                        dato['FACTOR_INCREM'] = ''


                        switch (tarifas_liq.BASE_MED) {
                            case '1':
                                leer_promedio_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos, '1')
                                break;
                            case '2':
                                if (busquedaArtic.VR_ULT_COMPRA.trim() == '' || busquedaArtic.VR_ULT_COMPRA == '0') {

                                    if (busquedaArtic.VLR_LISTA_COMP > '0') {
                                        busquedaArtic.VR_ULT_COMPRA = busquedaArtic.VLR_LISTA_COMP
                                        busquedaArtic.VR_VENTA_1 = busquedaArtic.VR_ULT_COMPRA
                                        leer_convenio_MED_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos)
                                    } else {
                                        leer_promedio_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos, '2')
                                    }
                                }
                                break;
                            case '4':
                                if (busquedaArtic.VLR_REF > '0') {
                                    busquedaArtic.VR_VENTA_1 = busquedaArtic.VLR_REF
                                }
                                leer_convenio_MED_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos)
                                break;
                            default:
                                leer_convenio_MED_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos)
                                break;
                        }
                    }
                }
                loader("hide")
                callbacksucces(dato)
            }, 'OFF')
        }, 'ON')

    } else {
        sw_Cl = dato.CLASE.split('')[0]
        if (dato.CLASE == '7') sw_Cl = '5'
        console.log(tarifas_liq.TABLA[sw_Cl].COD_TABLA)
        console.log(dato.CLASE)
        dato.TARIF = tarifas_liq.TABLA[sw_Cl].COD_TABLA
        $_CONTEORELIQUIDACION = 0;
        var tablas_liq = [];
        obtenerDatosCompletos({ nombreFd: 'TABLAS', filtro: `${tarifas_liq.TABLA[sw_Cl].COD_TABLA}${dato.CLASE}`}, function (data) {
            tablas_liq = data.TABLA;
            tablas_liq.pop()
            console.log(data, dato);
            reliquidar_Articulos(dato, tarifas, tablas_liq, callbacksucces);
        })
    }
}

function reliquidar_Articulos(dato, tarifas, tablas_liq, callbacksucces){
    if (dato.TABLA[$_CONTEORELIQUIDACION].GRUPO.trim() != '') {
        var busquedaTabla_Articulo = tablas_liq.find(tab => tab.COD_SER.trim() == dato.TABLA[$_CONTEORELIQUIDACION].ARTICULO.trim());
        console.log(busquedaTabla_Articulo);
        if (busquedaTabla_Articulo) {
            if (busquedaTabla_Articulo.INCREM != '0') busquedaTabla_Articulo.INCREM = parseInt(busquedaTabla_Articulo.INCREM) - 1
            if (busquedaTabla_Articulo) {
                leerMonto_SALUD(dato, $_CONTEORELIQUIDACION, tarifas, busquedaTabla_Articulo)
                $_CONTEORELIQUIDACION++
                reliquidar_Articulos(dato, tarifas, tablas_liq, callbacksucces);
            }
        } else {
            $_CONTEORELIQUIDACION++
            reliquidar_Articulos(dato, tarifas, tablas_liq, callbacksucces);
        }
    } else {
        callbacksucces(dato);
    }
}

function leer_promedio_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos, orden) {
    var almacen
    var articulo = busquedaArtic.ALMACEN.split('')
    articulo = articulo[1]

    if (articulo != '9') {
        obtenerDatosCompletos({ nombreFd: 'SALDOS' }, function (data) {
            var arraySaldos = data.SALDOS
            arraySaldos.pop()
            almacen = 'ALM01'
            if ($_USUA_GLOBAL[0].PUC_USU == '4' || $_USUA_GLOBAL[0].PUC_USU == '6') almacen = 'DR001'

            var busquedaSaldos = arraySaldos.find(saldo => saldo.COD_ALMAC == almacen && saldo.COD_ARTIC.trim() == busquedaArtic.ALMACEN.trim())

            if (busquedaSaldos) busquedaArtic.VR_VENTA_1 = busquedaSaldos.SALDO_ACT_CANT / SALDO_ACT_VLR
            if (orden == '2') busquedaArtic.VR_ULT_COMPRA = busquedaArtic.VR_VENTA_1

            leer_convenio_MED_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos)
        })
    } else {
        leer_convenio_MED_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos)
    }
}

function leer_convenio_MED_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos) {
    var busqMedicamentos = medicamentos.find(med => med.TARIF == dato.CONVENIO_NUM && med.ARTICULO.trim() == dato.TABLA[i].ARTICULO.trim())

    if (busqMedicamentos) {
        busquedaArtic.VR_VENTA_1 = busqMedicamentos.MONTO
    } else {
        busqMedicamentos = [{ 'REGUL': ' ', 'MONTO': '0' }]
    }

    //AHORA SIGUE PROCESO DATO-DROGAS
    if (tarifas_liq.BASE_MED == '1' || tarifas_liq.BASE_MED == '2' || tarifas_liq.BASE_MED == '3' || tarifas_liq.BASE_MED == '4') {
        switch (dato.TABLA[i].GRUPO) {
            case 'PO': dato.FACTOR_INCREM = parseFloat(tarifas_liq.PORC_PO) / 100
                break;
            case 'NP': dato.FACTOR_INCREM = parseFloat(tarifas_liq.PORC_NP) / 100
                break;
            case 'MO': dato.FACTOR_INCREM = parseFloat(tarifas_liq.PORC_MO) / 100
                break;
            default: dato.FACTOR_INCREM = parseFloat(tarifas_liq.PORC_MQ) / 100
                break;
        }
    } else {
        dato.FACTOR_INCREM = 1
    }

    if (busquedaArtic.IVA.trim() != '') {
        switch (busquedaArtic.IVA) {
            case '1': dato.VALOR_BASE1_IVA = parseFloat(dato.VALOR_BASE1_IVA) + parseFloat(busquedaArtic.VR_VENTA_1)
                break;
            case '2': dato.VALOR_BASE2_IVA = parseFloat(dato.VALOR_BASE2_IVA) + parseFloat(busquedaArtic.VR_VENTA_1)
                break;
            case '3': dato.VALOR_BASE3_IVA = parseFloat(dato.VALOR_BASE3_IVA) + parseFloat(busquedaArtic.VR_VENTA_1)
                break;
        }
    }
    var valor_Fact_W = (dato.VALOR_BASE1_IVA * parseInt($_USUA_GLOBAL[0].IVA1)) + (dato.VALOR_BASE2_IVA * parseInt($_USUA_GLOBAL[0].IVA2)) + (dato.VALOR_BASE3_IVA * parseInt($_USUA_GLOBAL[0].IVA3))

    dato.VALOR_IVA = dato.VALOR_IVA + (parseFloat(valor_Fact_W) * parseFloat(dato.TABLA[i].CANTIDAD))

    dato.TABLA[i].VALOR_FACT = Math.round((parseFloat(busquedaArtic.VR_VENTA_1) * dato.FACTOR_INCREM) * parseFloat(dato.TABLA[i].CANTIDAD))

    if (($_USUA_GLOBAL[0].NIT == 830512772) && (busqMedicamentos.REGUL == 'S')) {
        var vlr_Regulado_w

        if (dato.TABLA[i].VALOR_FACT > busqMedicamentos.VLR_LIMITE) {
            vlr_Regulado_w = dato.TABLA[i].VALOR_FACT * parseFloat(busqMedicamentos.PORCE_MIN) / 100
        } else {
            vlr_Regulado_w = dato.TABLA[i].VALOR_FACT * parseFloat(busqMedicamentos.PORCE_MAX) / 100
        }
        dato.TABLA[i].VALOR_FACT = dato.TABLA[i].VALOR_FACT + vlr_Regulado_w
    }
}

function leerMonto_SALUD(dato, i, tarifas_liq, tabla) {
    var SW_APR

    if ((tabla.COD == 'I4' || tabla.COD == 'I4') && (dato.PREFIJO == 'P') && (tabla.GR_SER == '93')) {
        if ((tabla.CD_SER == '1000') || (tabla.CD_SER == '9400') || (tabla.CD_SER == '8300') || (tabla.CD_SER == '7000')) {
            tabla.MONTO = parseFloat(tabla.MONTO) * 1.1
        }
    }
    console.log(tarifas_liq)
    var numerico = $.isNumeric(tarifas_liq.SAL_MIN)
    if (tarifas_liq.SAL_MIN == '000000000' || tarifas_liq.SAL_MIN.toString().trim() == '' || numerico == false) {
        tarifas_liq.SAL_MIN = $_USUA_GLOBAL[0].SAL_MIN / 30
    }

    switch (tabla.FORMA_LIQ) {
        case '1':
            SW_APR = 1
            dato.TABLA[i].VALOR_UNIT = Math.round(parseFloat(tabla.MONTO) * parseFloat(tarifas_liq.HN_QUIR))
            break;
        case '2':
            SW_APR = 100
            dato.TABLA[i].VALOR_UNIT = parseFloat(tabla.MONTO)
            break;
        case '4':
            SW_APR = 100
            // console.log(parseFloat(tabla.MONTO) + '   ' + parseFloat(tarifas_liq.SAL_MIN))
            dato.TABLA[i].VALOR_UNIT = Math.round(parseFloat(tabla.MONTO) * parseFloat(tarifas_liq.SAL_MIN))
            break;
        default:
            SW_APR = 10
            dato.TABLA[i].VALOR_UNIT = parseFloat(tabla.MONTO)
            break;
    }
    // console.log(dato.TABLA[i].VALOR_UNIT + '  valor unit')

    //buscar-incremento ******** se resta uno a increm, por posiciones en la tabla de ARCHIVO TABLAS
    // console.log(tabla.INCREM + 'increm')
    if (tabla.INCREM == 0) {
        if (dato.CLASE == '7') {
            switch (dato.TABLA[i].GRUPO) {
                case '90':
                    tabla.INCREM = 1
                    break;
                case '87':
                    tabla.INCREM = 2
                    break;
                case '88':
                    tabla.INCREM = 2
                    break;
                case '89':
                    tabla.INCREM = 4
                    break;
                default:
                    if (dato.TABLA[i].GRUPO < '87') {
                        tabla.INCREM = 0
                    } else {
                        tabla.INCREM = 3
                    }
                    break;
            }

        } else {
            tabla.INCREM = parseInt(dato.CLASE)
        }
    }

    // console.log(tarifas_liq.COD)
    if (tabla.INCREM == 9) {
        dato.FACTOR_W = 1
    } else {
        dato.FACTOR_W = parseFloat(tarifas_liq.TABLA[tabla.INCREM].PORC_TABLA) / 100
        // console.log(dato.FACTOR_W + '  factor_W')
    }
    //

    var VALOR_APROX = ''

    dato.NIT.replace(/,/g, '')
    if ((tarifas_liq.COD == 'H4') || (dato.NIT == '830092718')) {
        VALOR_APROX = Math.round(dato.TABLA[i].VALOR_UNIT / SW_APR)
        dato.TABLA[i].VALOR_UNIT = Math.round(VALOR_APROX * SW_APR)
    }

    dato.TABLA[i].VALOR_UNIT = Math.round(dato.TABLA[i].VALOR_UNIT * dato.FACTOR_W)
    // console.log(dato.TABLA[i].VALOR_UNIT + ' valor unit calc')

    if (tarifas_liq.COD == 'H4') {
        VALOR_APROX = Math.round(dato.TABLA[i].VALOR_UNIT * 1)
        dato.TABLA[i].VALOR_UNIT = VALOR_APROX
        // console.log(VALOR_APROX + ' valor aprox')

    } else if (tabla.INCREM != 9) {
        VALOR_APROX = Math.round(dato.TABLA[i].VALOR_UNIT / SW_APR)
        // console.log(VALOR_APROX + ' valor aprox')
        dato.TABLA[i].VALOR_UNIT = Math.round(VALOR_APROX * SW_APR)
        // console.log(dato.TABLA[i].VALOR_UNIT + ' valor unit calc 2')
    }
    if (tarifas_liq.COD == 'PP') {
        dato.TABLA[i].VALOR_FACT = Math(dato.TABLA[i].VALOR_UNIT * parseFloat(dato.TABLA[i].CANTIDAD))
    } else {
        dato.TABLA[i].VALOR_FACT = Math.round(dato.TABLA[i].VALOR_UNIT * parseFloat(dato.TABLA[i].CANTIDAD))
        // console.log(dato.TABLA[i].VALOR_FACT + ' valor factura')
        dato.TABLA[i].VALOR_FACT.toString()
    }
}

function grabar_auditoria_SALUD(datos, callbacksucces) {
    // ES NECESARIO ENVIAR LA SUCURSAL AL PRINCIPIO SOLO SI LA SUCURSAL NO HACE PARTE DE LA LLAVE, SINO ENVIAR LA LLAVE COMPLETA 
    loader("show")

    var fecha_lnk = $_USUA_GLOBAL[0].FECHALNK.split('')
    var nit = datos.NIT ? datos.NIT : $_USUA_GLOBAL[0].NIT.toString().padStart(10, '0');
    var ano = datos.ANO ? datos.ANO : fecha_lnk[0] + fecha_lnk[1]
    var mes = datos.MES ? datos.MES : fecha_lnk[2] + fecha_lnk[3]
    var admin = datos.ADMIN ? datos.ADMIN : localStorage.getItem('Usuario').trim()

    var datos_envio_CON090 = datosEnvio()
    datos_envio_CON090 += datos.TIPO
    datos_envio_CON090 += '|'
    datos_envio_CON090 += datos.LLAVE
    datos_envio_CON090 += '|'
    datos_envio_CON090 += admin
    datos_envio_CON090 += '|'
    datos_envio_CON090 += nit
    datos_envio_CON090 += '|'
    datos_envio_CON090 += ano
    datos_envio_CON090 += '|'
    datos_envio_CON090 += mes
    datos_envio_CON090 += '|'
    datos_envio_CON090 += datos.NOVED
    datos_envio_CON090 += '|'
    datos_envio_CON090 += datos.ARCH
    datos_envio_CON090 += '|'
    datos_envio_CON090 += datos.EXTRAS
    datos_envio_CON090 += '|'
    
    console.log(datos_envio_CON090, 'CON090')

    let URL = get_url("app/CONTAB/CON090.DLL");

    postData({
        datosh: datos_envio_CON090
    }, URL)
        .then((data) => {
            console.log(data, 'termino de grabar auditoria')
            callbacksucces()
        })
        .catch(error => {
            // console.error(error)
            loader("hide")
            // jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR CREANDO AUDITORIA' }, _toggleNav());
        });

}


function _ImpresionesActualizarCopagos(params, callback, callbackerr) {
    var DATOS = new Object;
    let URL = get_url("APP/SALUD/SER109D.DLL");
    postData({
        datosh: datosEnvio() + '1|' + $_USUA_GLOBAL[0].COD_CIUD + '|' + params.LLAVENUM + ' |'
    }, URL)
        .then(data => {
            var datos2 = '';
            console.debug(data);
            DATOS.NUMERACION = data.NUMERACION[0];
            if (parseInt(DATOS.NUMERACION.FECHARET_NUM.substring(2,4)) > 0 && (DATOS.NUMERACION.FECHARET_NUM.substring(2,4) != $_USUA_GLOBAL[0].FECHALNK.substring(0,2))){
                CON851('2R','2R',null,'error','Error');
                callbackerr();
            } else {
                if (DATOS.NUMERACION.FACTCAPITNUM == params.LLAVENUM) {
                    let URL = get_url("APP/SALUD/SAL020H.DLL");
                    postData({
                        datosh: datosEnvio() + params.LLAVENUM + '|' + DATOS.NUMERACION.NIT_NUM + '|'
                    }, URL)
                        .then((data) => {
                            console.debug(data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                } else {
                    if (params.LLAVENUM.substring(0, 1) == 'A' || params.LLAVENUM.substring(0, 1) == 'B' || params.LLAVENUM.substring(0, 1) == 'D' || params.LLAVENUM.substring(0, 1) == 'F' || params.LLAVENUM.substring(0, 1) == 'G' || params.LLAVENUM.substring(0, 1) == 'H' || params.LLAVENUM.substring(0, 1) == 'I' || params.LLAVENUM.substring(0, 1) == 'J' || params.LLAVENUM.substring(0, 1) == 'K' || params.LLAVENUM.substring(0, 1) == 'L' || params.LLAVENUM.substring(0, 1) == 'M' || params.LLAVENUM.substring(0, 1) == 'N') {
                        let URL = get_url("APP/SALUD/SAL020F.DLL");
                        postData({
                            datosh: datosEnvio() + params.LLAVENUM + '|' + DATOS.NUMERACION.NIT_NUM + '|'
                        }, URL)
                            .then((data) => {
                                console.debug(data);
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }
                } 
                if (DATOS.NUMERACION.ESTADO_NUM != '1') {
                    let URL = get_url("APP/SALUD/SAL020GA.DLL");
                    postData({
                        datosh: datosEnvio() + params.LLAVENUM + '|' + $_USUA_GLOBAL[0].FECHALNK + '|'
                    }, URL)
                        .then((data) => {
                            console.debug(data);
                            if(params.LLAVENUM.substring(0, 1) == 'T'){
                                datos2 = data.VALORES[0];
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
                let URL = get_url("APP/SALUD/SER109D.DLL");
                    postData({
                        datosh: datosEnvio() + '1|' + $_USUA_GLOBAL.COD_CIUD + '|' + params.LLAVENUM + ' |'
                    }, URL)
                        .then((data) => {
                            console.debug(data);
                            callback(data.NUMERACION[0], datos2);
                        })
                        .catch((error) => {
                            console.error(error);
                            callbackerr();
                        });
            }
        })
        .catch(error => {
            console.error(error);
            callbackerr();
        });
    }
/////////////////////// validaciones del INV826A.COB ///////////////////////////////////
function _INV826A(nit, obj_Inv826){
    nit=='undefined'?nit='':nit=nit;
    obj_Inv826=='undefined'?obj_Inv826=[]:obj_Inv826=obj_Inv826;
    if (nit == "" || nit == "0") {
        const result = obj_Inv826.find(element => element.LLAVE_ORD_S == "00000000");
        if (result == undefined) {
            CON851('1T', '1T', false, 'error', 'error');
        }
    } else {
        const result = obj_Inv826.find(element => element.NIT_ORD_S.trim() == nit);
        if (result == undefined) {
            _ventanaTiposSAL201();
        } 
    }
}


//////////////////////////////// AVISOS FLOTANTES ///////////////////////////////////////////////////////////////
function _FloatText(parametros) {
    if (parametros.msg){
        if (parametros.msg.length < 5) {
            if (parametros.estado == 'on') {
                var tam = {
                    0:'0',
                    1:'21',
                    2:'43',
                    3:'65'
                }
                for (var i in parametros.msg) {
                    $('#body_main').append(
                        '<div class="floattxt" style="position: absolute; top:0%; left: ' + tam[i] + '%; transform: translate:(-1%,90%); z-index: 999; width: 20%; height: 4%; display: flex; justify-content: center; align-items: center">' +
                        '<kbd style="color:#333; background-color: #F4D03F; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; opacity:0.7">' + parametros.msg[i].mensaje + '</kbd>' +
                        '</div>'
                    )
                }
            }
        } else {
            CON851('_Floattext', 'Se acepta un maximo de 4 banner', null, 'error', 'Error');
            _toggleNav()
        }
    } else {
        if (parametros.estado == 'off'){
            var tam = $('.floattxt').length - 1;
            for (var i in $('.floattxt')){
                if ($.isNumeric(i)){
                    console.log(i);
                    $('.floattxt').remove();
                }
            }
        }
    }
}
//////////////////////////////  DATOS FINALIDAD ////////////////////////////////////////////////////////////
function get_finalidadConsulta(codigo) {
    var msj = "";
    switch (codigo) {
        case '0': msj = ""; break;
        case '1': msj = "ATENCION PARTO PUERPERIO"; break;
        case '2': msj = "ATENCION REC.NACIDO"; break;
        case '3': msj = "ATENC. PLANIF.FAMILIAR"; break;
        case '4': msj = "DET.ALT.CRECIM <10"; break;
        case '5': msj = "DET.ALT.DESA.JOVEN"; break;
        case '6': msj = "DET.ALT.EMBARAZO"; break;
        case '7': msj = "DET.ALT.ADULTO"; break;
        case '8': msj = "DET.ALT.AGUD.VISUAL"; break;
        case '9': msj = "DET.ENFERM.PROFES."; break;
        case '10': msj = "NO APLICA"; break;
        case '11': msj = "PATOLOGIA CRONICA"; break;
    }
    return msj;
}

function datos_finalidad(nit, sexo, edad) {
    // SER834A
    var datos_finalidad = [];
    if (nit == 844003225) {

        if (sexo == 'F' && edad.unid_edad == 'A' && (edad.vlr_edad > 9 && edad.unid_edad < 51)) {
            datos_finalidad.push({
                codigo: '01',
                descripcion: get_finalidadConsulta('1')
            });
        }

        if (edad.unid_edad == 'D') {
            datos_finalidad.push({
                codigo: '02',
                descripcion: get_finalidadConsulta('2')
            });
        }

        if (edad.unid_edad == 'A' && (edad.vlr_edad > 9 && edad.vlr_edad < 61)) {
            datos_finalidad.push({
                codigo: '03',
                descripcion: get_finalidadConsulta('3')
            });
        }

        if ((edad.unid_edad == 'D' || edad.unid_edad == 'M') || (edad.unid_edad == 'A' && edad.vlr_edad < 10)) {
            datos_finalidad.push({
                codigo: '04',
                descripcion: get_finalidadConsulta('4')
            });
        }

        if ((edad.unid_edad == 'A') && (edad.vlr_edad > 9 && edad.vlr_edad < 30)) {
            datos_finalidad.push({
                codigo: '05',
                descripcion: get_finalidadConsulta('5')
            });
        }

        if (sexo == 'F' && edad.unid_edad == 'A' && (edad.vlr_edad > 9 && edad.vlr_edad < 51)) {
            datos_finalidad.push({
                codigo: '06',
                descripcion: get_finalidadConsulta('6')
            });
        }

        if (edad.unid_edad == 'A' && edad.vlr_edad > 29) {
            datos_finalidad.push({
                codigo: '07',
                descripcion: get_finalidadConsulta('7')
            });
        }

        datos_finalidad.push({
            codigo: '08',
            descripcion: get_finalidadConsulta('8')
        });

        if (edad.unid_edad == 'A' && edad.vlr_edad > 17) {
            datos_finalidad.push({
                codigo: '09',
                descripcion: get_finalidadConsulta('9')
            });
        }

        datos_finalidad.push({
            codigo: '10',
            descripcion: get_finalidadConsulta('10')
        });

        datos_finalidad.push({
            codigo: '11',
            descripcion: get_finalidadConsulta('11')
        });
    } else {

        if (sexo == 'F' && edad.unid_edad == 'A' && (edad.vlr_edad > 9 && edad.vlr_edad < 51)) {
            datos_finalidad.push({
                codigo: '01',
                descripcion: get_finalidadConsulta('1')
            });
        }

        if (edad.unid_edad == 'D') {
            datos_finalidad.push({
                codigo: '02',
                descripcion: get_finalidadConsulta('2')
            });
        }

        if (edad.unid_edad == 'A' && (edad.vlr_edad > 9 && edad.vlr_edad < 61)) {
            datos_finalidad.push({
                codigo: '03',
                descripcion: get_finalidadConsulta('3')
            });
        }

        if (edad.unid_edad == 'D' || edad.unid_edad == 'M' || (edad.unid_edad == 'A' && edad.vlr_edad < 12)) {
            if (edad.unid_edad == 'D' || edad.unid_edad == 'M' || (edad.unid_edad == 'A' && edad.vlr_edad < 6)) {
                datos_finalidad.push({
                    codigo: '04',
                    descripcion: "PRIMERA INFANCIA"
                });
            } else {
                datos_finalidad.push({
                    codigo: '04',
                    descripcion: "INFANCIA"
                });
            }
        }

        if (edad.unid_edad == 'A' && (edad.vlr_edad > 11 && edad.vlr_edad < 29)) {
            if (edad.vlr_edad > 11 && edad.vlr_edad < 18) {
                datos_finalidad.push({
                    codigo: '05',
                    descripcion: "ADOLECENCIA"
                });
            } else {
                datos_finalidad.push({
                    codigo: '05',
                    descripcion: "JUVENTUD"
                });
            }
        }

        if (sexo == 'F' && edad.unid_edad == 'A' && (edad.vlr_edad > 9 && edad.vlr_edad < 51)) {
            datos_finalidad.push({
                codigo: '06',
                descripcion: get_finalidadConsulta('6')
            });
        }

        if (edad.unid_edad == 'A') {
            if (edad.vlr_edad > 28 && edad.vlr_edad < 60) {
                datos_finalidad.push({
                    codigo: '07',
                    descripcion: "ADULTEZ"
                });
            } else if (edad.vlr_edad > 59) {
                datos_finalidad.push({
                    codigo: '07',
                    descripcion: "VEJEZ"
                });
            }
        }

        datos_finalidad.push({
            codigo: '08',
            descripcion: get_finalidadConsulta('8')
        });

        if (edad.unid_edad == 'A' && edad.vlr_edad > 17) {
            datos_finalidad.push({
                codigo: '09',
                descripcion: get_finalidadConsulta('9')
            });
        }

        datos_finalidad.push({
            codigo: '10',
            descripcion: get_finalidadConsulta('10')
        });

        datos_finalidad.push({
            codigo: '11',
            descripcion: get_finalidadConsulta('11')
        });
    }
    return datos_finalidad;
}
///////// ACTUALIZACION DE IMPRESIONES COPAGO

function _ImpresionesActualizarCopagosV2(params, callback, callbackerr) {
    postData(
        { datosh: `${datosEnvio()}${params.LLAVENUM}|` }, 
        get_url('APP/SALUD/SER808-01.DLL')
    )
    .then((data) => {
        params.NUMERACION = data.NUMER19[0];
        if (parseInt(data.NUMER19[0].FECHA_RET.substring(2,4)) > 0 && data.NUMER19[0].FECHA_RET.substring(2,4) != $_USUA_GLOBAL[0].FECHALNK.substring(0,2)){
            CON851('2R','2R',null,'error','Error');
            return callbackerr();
        }

        if (data.NUMER19[0].FACTCAPITNUM == params.LLAVENUM) {
            postData(
                { datosh: `${datosEnvio()}${params.LLAVENUM}|${data.NUMER19[0].NIT_NUM}|` }, 
                get_url("APP/SALUD/SAL020H.DLL")
            )
            .then((data) => {
                _ImpresionesActualizarCopagos2V2(params, callback, callbackerr)
            })
            .catch((error) => {
                console.error(error);
                callbackerr();
            });
        } else {
            if (params.LLAVENUM.substring(0, 1) == 'A' || params.LLAVENUM.substring(0, 1) == 'B' || params.LLAVENUM.substring(0, 1) == 'D' || params.LLAVENUM.substring(0, 1) == 'F' || params.LLAVENUM.substring(0, 1) == 'G' || params.LLAVENUM.substring(0, 1) == 'H' || params.LLAVENUM.substring(0, 1) == 'I' || params.LLAVENUM.substring(0, 1) == 'J' || params.LLAVENUM.substring(0, 1) == 'K' || params.LLAVENUM.substring(0, 1) == 'L' || params.LLAVENUM.substring(0, 1) == 'M' || params.LLAVENUM.substring(0, 1) == 'N') {
                postData(
                    { datosh: `${datosEnvio()}${params.LLAVENUM}|${data.NUMER19[0].NIT_NUM}|` }, 
                    get_url("APP/SALUD/SAL020F.DLL")
                )
                .then((data) => {
                    _ImpresionesActualizarCopagos2V2(params, callback, callbackerr)
                })
                .catch((error) => {
                    console.error(error);
                    callbackerr();
                });
            } else {
                _ImpresionesActualizarCopagos2V2(params, callback, callbackerr)
            }
        } 
    })
    .catch((error) => {
        console.error(error);
        callbackerr();
    });
}

function _ImpresionesActualizarCopagos2V2(params, callback, callbackerr){
    let datos2 = { SALMIN: '', TOPE: '', TOTAL: ''}
    if (params.NUMERACION.ESTADO_NUM != '1') {
        postData(
            { datosh: `${datosEnvio()}${params.LLAVENUM}|${$_USUA_GLOBAL[0].FECHALNK}|` },
            get_url("APP/SALUD/SAL020GA.DLL")
        )
        .then((data) => {
            if(params.LLAVENUM.substring(0, 1) == 'T'){
                datos2 = data.VALORES[0];
                return callback(params.NUMERACION, datos2);
            }
            callback(params.NUMERACION, datos2);
        })
        .catch((error) => {
            console.error(error);
            callbackerr();
        });
    } else {
        callback(params.NUMERACION, datos2);
    }
}