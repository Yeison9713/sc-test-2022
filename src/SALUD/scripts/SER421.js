/* NOMBRE RM --> INV404 // NOMBRE ELECTR --> SAL44 */

const { INFO } = require("clarinet");

var SER421 = [];
SER421.TIPO1COMP = "1";


$(document).ready(function () {
    nombreOpcion('9-7-7-2 - Actualizar Rips');
    _inputControl('reset');
    _inputControl('disabled');
    loader('show')
    SER421.NROW = '';
    SER421.HEMOGW = '0';
    SER421.CREATIW = ' ';
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_ANOLNK = parseInt($_ANOLNK) + 2000;
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    $_PREFIJOUSU = $_USUA_GLOBAL[0].PREFIJ;
    _toggleF8([
        { input: 'claseservicio', app: 'SER421', funct: _ventanaclaseservicio_SER421 },
        { input: 'comprobante', app: 'SER421', funct: _ventanapacientecomp_SER421 },
        { input: 'diagprinc', app: 'SER421', funct: _ventanadiagprincipal_SER421 },
        { input: 'diagrel1', app: 'SER421', funct: _ventanadiagrel1_SER421 },
        { input: 'diagrel2', app: 'SER421', funct: _ventanadiagrel2_SER421 },
        { input: 'causamuer', app: 'SER421', funct: _ventanadiagmuerte_SER421 },
        { input: 'especremite', app: 'SER421', funct: _ventanaespecialidad_SER421 }

    ]);

    if ($_USUA_GLOBAL[0].NIT == '0800156469') {
        SER421.SERVICIOS = [
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
        SER421.SERVICIOS = [
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
        nombreFd: 'ENFERMEDADES'
    }, function (data) {
        SER421.ENFERMEDADES = data.ENFERMEDADES;
        SER421.ENFERMEDADES.pop();
        _datosuc1_SER421();
        obtenerDatosCompletos({
            nombreFd: 'ESPECIALIDAD'
        }, function (data) {
            SER421.ESPECIALIDADES = data.ESPECIALIDADES;
            SER421.ESPECIALIDADES.pop();
            obtenerDatosCompletos({
                nombreFd: 'ESPCUPS'
            }, function (data) {
                SER421.ESPECCUP = data['DATOS_SER11A-C']
                SER421.ESPECCUP.pop()
                obtenerDatosCompletos({
                    nombreFd: 'CUPS'
                }, function (data) {
                    SER421.CUPS = data.CODIGOS;
                    SER421.CUPS.pop();
                }
                    // , 'OFF'
                )
            })
        })

    }
        // , 'ON'
    )
});

////////////////////RELIQUIDACION DE COMPROBANTE///////////////
function _datosuc1_SER421() {
    loader('hide')
    SER421.SUCFACT = $_PREFIJOUSU;
    let URL = get_url("app/CONTAB/CON003.DLL");
    postData({
        datosh: datosEnvio() + $_NITUSU + '|'
    }, URL)
        .then((data) => {
            data = data.split('|');
            SER421.NOMBREOPERW = data[0].trim();
            SER421.IDENTOPERW = data[1].trim();
            SER421.SUCOPERW = data[2].trim();
            let OBJECT = {
                '0844003225': ['JL', 'CA', 'CS', 'PV', 'BC', 'LC', 'CV', 'HT', 'EM', 'HY', 'TL', 'MR'],
                '0800162035': ['01', '03', '05', '06', '07', '08', '10', '11', '12', '14', '15'],
                '0900405505': ['01', '02', '03', '04', '05', '06'],
            }
            if ($_PREFIJOUSU.trim() == '') $_PREFIJOUSU == '00';
            if ($_ADMINW == 'GEBC' || $_ADMINW == 'ADMI') {
                _evaluarsuc_SER421();
            } else {
                let array = OBJECT[$_NITUSU];
                if (array == undefined) _evaluarsuc_SER421();
                for (var i in array) {
                    if (SER421.SUCOPERW == array[i]) {
                        $_PREFIJOUSU = SER421.SUCOPERW
                        SER421.SUCFACT = $_PREFIJOUSU;
                        _evaluarsuc_SER421();
                        break;
                    } else if (i == array.length - 1) {
                        CON851('48', '48', null, 'error', 'Error');
                        setTimeout(() => {
                            let Window = BrowserWindow.getAllWindows();
                            if (Window.length > 1) {
                                _cerrarSegundaVentana();
                            } else {
                                _toggleNav()
                            };
                        }, 500);
                    }
                }
            }
        })
        .catch(error => {
            console.error(error)
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
}

function _evaluarsuc_SER421() {
    $('#unidades_SER421').val(SER421.SUCFACT);
    validarInputs(
        {
            form: "#SUC_SER421",
            orden: '1'
        },
        () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        },
        () => {
            SER421.SUCFACT = $('#unidades_SER421').val();
            _evaluartiposervicio_SER421();
        })
}
function _evaluartiposervicio_SER421() {
    validarInputs(
        {
            form: "#TIPOSERVICIO_SER421",
            orden: '1'
        }, function () { _evaluarsuc_SER421(); },
        () => {
            SER421.CLFACT = claseservMask.value;
            if (SER421.CLFACT) {
                SER421.SERVICIOS.forEach(data => {
                    if (SER421.CLFACT == data.COD) {
                        $('#claseservicio_SER421').val(data.COD + " - " + data.DESCRIPCION);
                        _buscarnumero_SER421();
                    }
                });
            } else {
                CON851('03', '03', null, 'error', 'error');
                _evaluartiposervicio_SER421();
            }
        })
}

function _buscarnumero_SER421() {
    if ((SER421.NROW == '') || (SER421.NROW == '0')) {
        SER421.SECU1NUM = '8';
        SER421.SECU2NUM = SER421.CLFACT;
        _consultaCON007_SER421();
    } else {
        SER421.SECU1NUM = '8';
        SER421.SECU2NUM = SER421.CLFACT;
        _consultaCON007_SER421();
    }
}

function _consultaCON007_SER421() {
    SER421.SECUNUM = SER421.SECU1NUM + SER421.SECU2NUM;
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + SER421.SECUNUM }, URL)
        .then(data => {
            var data = data.split("|");
            SER421['ULTFECHANUM'] = data[2].trim();
            SER421['NUMEROCTL'] = data[1].substring(3, 9);
            SER421.NROW = parseInt(SER421.NUMEROCTL) - 1;
            $('#comprobante_SER421').val(SER421.NROW);
            _evaluarcomprobante_SER421();
        })
        .catch(err => {
            console.debug(err);
            _evaluarcomprobante_SER421();
        })
}

function _evaluarcomprobante_SER421() {
    validarInputs({
        form: "#COMPR_SER421",
        orden: '1'
    },
        () => { _evaluartiposervicio_SER421(); },
        () => {
            SER421.NROW = cerosIzq($('#comprobante_SER421').val(), 6)
            $('#comprobante_SER421').val(SER421.NROW)
            SER421.LLAVEFACT = SER421.SUCFACT + SER421.CLFACT + SER421.NROW;
            var llave_envio = SER421.SUCFACT
            llave_envio += SER421.CLFACT
            llave_envio += SER421.NROW

            var datos_envio = datosEnvio()
            datos_envio += llave_envio
            datos_envio += '|'

            let URL = get_url("APP/SALUD/SAL450A.DLL");
            postData({
                datosh: datos_envio
            }, URL)
                .then((data) => {
                    $("#TABLA_421 tbody").empty();
                    mostrarDatosCompletos_SER421(data)
                })
                .catch(error => {
                    console.error(error)
                    _evaluarcomprobante_SER421()
                });
        })
}



function mostrarDatosCompletos_SER421(data) {
    SER421.FACTURA = data.FACTURA[0];
    SER421.LLAVEFACT = SER421.FACTURA.SUC + SER421.FACTURA.CLASE.substring(0, 1) + SER421.FACTURA.NRO;
    $('#claseservicio_SER421').val(SER421.FACTURA.CLASE);
    $('#comprobante_SER421').val(SER421.FACTURA.NRO)
    $('#fecha_SER421').val(SER421.FACTURA.FECHA)
    $('#factura_SER421').val(SER421.FACTURA.PREFIJO + SER421.FACTURA.NRO_CTA)
    $('#cliente_SER421').val(SER421.FACTURA.NIT + ' - ' + SER421.FACTURA.DESCRIP_TER)
    $('#paciente_SER421').val(SER421.FACTURA.ID_PACIENTE + ' - ' + SER421.FACTURA.DESCRIP_PACI)
    $('#sexo_SER421').val(SER421.FACTURA.SEXO)
    $('#edad_SER421').val(SER421.FACTURA.EDAD)
    $('#pingreso_SER421').val(SER421.FACTURA.PUERTA_ESTAD + ' - ' + SER421.FACTURA.DESCRIP_PUERTA)
    $('#atend_SER421').val(SER421.FACTURA.MED_OTR_FACT + ' - ' + SER421.FACTURA.DESCRIP_MED1);
    // $('#facturad_SER421').val()
    // $('#cliented_SER421').val()
    // $('#paciented_SER421').val()
    // $('#convenio_SER421').val(SER421.FACTURA.COD_TAR + '-' + SER421.FACTURA.DESCRIP_TAR)
    // $('#datend_SER421').val();
    if (SER421.FACTURA.CLASE == '1') {
        var prof = ['CIRUJANO', 'AYUDANTIA', 'ANESTESIOA', 'MAT.QUIRG', 'DERECH.SALA'];
        for (var i in prof) {
            $('#TABLA_421 tbody').append(
                '<tr>' +
                '<td>' + ' ' + '</td>' +
                '<td>' + ' ' + '</td>' +
                '<td>' + ' ' + '</td>' +
                '<td>' + ' ' + '</td>' +
                '<td>' + prof[i] + '</td>' +
                '<td>' + ' ' + '</td>' +
                '<td>' + ' ' + '</td>' +
                '<td>' + ' ' + '</td>' +
                '</tr>'
            )
        }
    } else {
        var CONT = 0;
        for (var i in SER421.FACTURA.TABLA) {
            if (SER421.FACTURA.TABLA[i].ARTICULO.trim().length > 0) {
                $('#TABLA_421 tbody').append(''
                    + '<tr>'
                    + '   <td>' + SER421.FACTURA.TABLA[i].POSICION + '</td>'
                    + '   <td>' + SER421.FACTURA.TABLA[i].ARTICULO + '</td>'
                    + '   <td>' + SER421.FACTURA.TABLA[i].DESCRIP_ART + '</td>'
                    + '   <td>' + SER421.FACTURA.TABLA[i].ALMACEN + '</td>'
                    + '   <td>' + SER421.FACTURA.TABLA[i].CANTIDAD + '</td>'
                    + '   <td>' + SER421.FACTURA.TABLA[i].UNIDAD + '</td>'
                    + '   <td>' + SER421.FACTURA.TABLA[i].VALOR_UNIT + '</td>'
                    + '   <td>' + SER421.FACTURA.TABLA[i].VALOR_FACT + '</td>'
                    + '</tr>'
                )

                if ((SER421.FACTURA.TABLA[i].ARTICULO == '902213') || (SER421.FACTURA.TABLA[i].ARTICULO == '902211') || (SER421.FACTURA.TABLA[i].ARTICULO == '902207') ||
                    (SER421.FACTURA.TABLA[i].ARTICULO == '902208') || (SER421.FACTURA.TABLA[i].ARTICULO == '902209')) {
                    CONT = i++;
                    SER421.HEMOGW = CONT;
                } else if ((SER421.FACTURA.TABLA[i].ARTICULO == '903825') || (SER421.FACTURA.TABLA[i].ARTICULO == '903895')) {
                    CONT = i++;
                    SER421.CREATIW = CONT;
                }
            }
        }
    }
    $('#vlrtot_SER421').val(SER421.FACTURA.VALOR_BRUTO)
    $('#valoriva_SER421').val(SER421.FACTURA.VALOR_IVA)
    $('#copagoestimfact_SER421').val(SER421.FACTURA.COPAGO_ESTIM_PAGO)
    $('#netofact_SER421').val(SER421.FACTURA.VALOR_TOTAL)
    $('#espec_SER421').val(SER421.FACTURA.ESPEC)
    $('#despec_SER421').val(SER421.FACTURA.DESCRIP_ESPEC)
    $('#condicion_SER421').val(SER421.FACTURA.EMBAR.trim())
    $('#triage_SER421').val(SER421.FACTURA.TRIAGE)
    $('#tipodiag_SER421').val(SER421.FACTURA.TIP_DIAG)
    $('#diagprinc_SER421').val(SER421.FACTURA.TABLA_DIAG[0].COD_DIAG.trim())
    $('#descripdiagprinc_SER421').val(SER421.FACTURA.NOMBRE_ENF1.trim());
    $('#diagrel1_SER421').val(SER421.FACTURA.TABLA_DIAG[1].COD_DIAG.trim())
    $('#descripdiagrel1_SER421').val(SER421.FACTURA.NOMBRE_ENF2.trim());
    $('#diagrel2_SER421').val(SER421.FACTURA.TABLA_DIAG[2].COD_DIAG.trim())
    $('#descripdiagrel2_SER421').val(SER421.FACTURA.NOMBRE_ENF3.trim());
    if ((SER421.CLFACT == '7') && ($_NITUSU == 845000038) && (SER421.FACTURA.CAUSA_ESTAD == '13')) {
        SER421.FACTURA.CAUSA_ESTAD = '15';
        $('#causaext_SER421').val(SER421.FACTURA.CAUSA_ESTAD)
    } else if (($_NITUSU == 845000038) && (SER421.FACTURA.CAUSA_ESTAD == '15')) {
        SER421.FACTURA.CAUSA_ESTAD = '13';
        $('#causaext_SER421').val(SER421.FACTURA.CAUSA_ESTAD)
    } else if (SER421.FACTURA.PERSONAL_ELAB == '6') {
        SER421.FACTURA.CAUSA_ESTAD = '15';
        $('#causaext_SER421').val(SER421.FACTURA.CAUSA_ESTAD)
    } else {
        $('#causaext_SER421').val(SER421.FACTURA.CAUSA_ESTAD)
    }
    switch (SER421.FACTURA.CAUSA_ESTAD.substring(0, 2)) {
        case "A ":
            SER421.CAUSAESTAD = '10'
            break;
        case "B ":
            SER421.CAUSAESTAD = '11'
            break;
        case "C ":
            SER421.CAUSAESTAD = '12'
            break;
        case "D ":
            SER421.CAUSAESTAD = '13'
            break;
        case "E ":
            SER421.CAUSAESTAD = '14'
            break;
        case "G ":
            SER421.CAUSAESTAD = '15'
            break;
        default:
            SER421.CAUSAESTAD = SER421.FACTURA.CAUSA_ESTAD
            break;
    }
    $('#personalat_SER421').val(SER421.FACTURA.PERSONAL_ELAB)
    $('#tipoproced_SER421').val(SER421.FACTURA.TIPO_PROC)
    $('#claseproced_SER421').val(SER421.FACTURA.CLASE_PROC)
    $('#estadosal_SER421').val(SER421.FACTURA.ESTAD_SAL.trim())
    $('#especremite_SER421').val(SER421.FACTURA.ESPEC_REMITE.trim())
    $('#consrepet_SER421').val(SER421.FACTURA.REPETID)
    $('#diasincap_SER421').val(SER421.FACTURA.DIAS_INC)
    $('#tipodisc_SER421').val(SER421.FACTURA.TIPO_DISCAP)
    $('#causamuer_SER421').val(SER421.FACTURA.DIAG_MUER);
    $('#finalidad_SER421').val(SER421.FACTURA.FINALID);
    $('#anoingreso_SER421').val(SER421.FACTURA.FECHA_ING.substring(0, 4));
    $('#mesingreso_SER421').val(SER421.FACTURA.FECHA_ING.substring(5, 7));
    $('#diaingreso_SER421').val(SER421.FACTURA.FECHA_ING.substring(8, 10));
    $('#hringreso_SER421').val(SER421.FACTURA.HORA_ESTAD.substring(0, 2));
    $('#mningreso_SER421').val(SER421.FACTURA.HORA_ESTAD.substring(2, 4));
    $('#anosalida_SER421').val(SER421.FACTURA.FECHA_SAL_ESTAD.substring(0, 4));
    $('#messalida_SER421').val(SER421.FACTURA.FECHA_SAL_ESTAD.substring(4, 6));
    $('#diasalida_SER421').val(SER421.FACTURA.FECHA_SAL_ESTAD.substring(6, 8));
    $('#hrsalida_SER421').val(SER421.FACTURA.HORA_SALID.substring(0, 2));
    $('#mnsalida_SER421').val(SER421.FACTURA.HORA_SALID.substring(2, 4));
    $('#solic_SER421').val(SER421.FACTURA.REMITE_FACT);
    $('#dsolic_SER421').val(SER421.FACTURA.DESCRIP_MED2);
    // $('#elab_SER421').val(SER421.FACTURA.OPER_ELAB + '' + SER421.FACTURA.FECHA_ELAB);
    $('#correccion_SER421').val(SER421.FACTURA.OPER_CORR_RIPS + SER421.FACTURA.FECHA_CORR_RIPS);
    $('#origen_SER421').val(SER421.FACTURA.ORIG_RIPS);
    $('#fpp_SER421').val(SER421.FACTURA.FECHA_PARTO_FUR);

    SER421.ESPECIALIDAD = SER421.FACTURA.ESPEC;
    SER421.EMBARESTADO = SER421.FACTURA.EMBAR.substring(0, 1).trim();
    SER421.TRIAGE = SER421.FACTURA.TRIAGE;
    SER421.DIAGNOSTICO = SER421.FACTURA.TIP_DIAG.substring(0, 1);
    SER421.CODDIAGESTADO = SER421.FACTURA.TABLA_DIAG[0].COD_DIAG.trim();
    SER421.CODDIAGESTADO2 = SER421.FACTURA.TABLA_DIAG[1].COD_DIAG.trim();
    SER421.CODDIAGESTADO3 = SER421.FACTURA.TABLA_DIAG[2].COD_DIAG.trim();
    SER421.PERSONALELAB = SER421.FACTURA.PERSONAL_ELAB.substring(0, 1);
    SER421.TIPOPROCED = SER421.FACTURA.TIPO_PROC.substring(0, 1).trim();
    SER421.PLANIFIC = SER421.FACTURA.PLANIFIC;
    SER421.ORIGRIPS = SER421.FACTURA.ORIG_RIPS;
    SER421.FECHAPARTO = SER421.FACTURA.FECHA_PARTO_FUR;
    SER421.DETALLEFACT = SER421.FACTURA.DETALLE_FACT.trim();
    SER421.NROAUTORINUM = SER421.FACTURA.NRO_AUTOR_ELAB.trim();
    SER421.CTAFACT = SER421.FACTURA.PREFIJO + SER421.FACTURA.NRO_CTA;
    SER421.FECHAFACT = SER421.FACTURA.FECHA;
    SER421.ANOFACT = SER421.FACTURA.FECHA.substring(0, 4);
    SER421.MESFACT = SER421.FACTURA.FECHA.substring(4, 6);
    SER421.DIAFACT = SER421.FACTURA.FECHA.substring(6, 8);
    SER421.FECHAINGESTAD = SER421.FACTURA.FECHA_ING;
    SER421.FECHASALESTAD = SER421.FACTURA.FECHA_SAL_ESTAD;
    SER421.HORASALESTAD = SER421.FACTURA.HORA_SALID;
    SER421.HRSALIDESTADO = SER421.HORASALESTAD.substring(0, 2);
    SER421.MNSALIDESTADO = SER421.HORASALESTAD.substring(2, 4);
    SER421.HORAATENESTAD = SER421.FACTURA.HORA_ESTAD;
    SER421.ESTADONUM = SER421.FACTURA.ESTADO_NUM;
    SER421.UNIDEDADELAB = SER421.FACTURA.EDAD_ELAB.substring(0, 1);
    SER421.VLREDADELAB = SER421.FACTURA.EDAD_ELAB.substring(1, 4);
    SER421.SEXO = SER421.FACTURA.SEXO.trim();
    SER421.REPETIDESTAD = SER421.FACTURA.REPETID.substring(0, 1).trim();
    SER421.ESTADOSALESTAD = SER421.FACTURA.ESTAD_SAL.substring(0, 1);
    SER421.DIAGMUERTEESTAD = SER421.FACTURA.DIAG_MUER.trim();
    SER421.CODDIAGMUERT1ESTADO = SER421.DIAGMUERTEESTAD.substring(0, 3)
    SER421.CODDIAGMUERT2ESTADO = SER421.DIAGMUERTEESTAD.substring(3, 4)
    SER421.FINALID = SER421.FACTURA.FINALID.substring(0, 1).trim();
    SER421.PRIMERAVEZ = SER421.FACTURA.PRIMERAVEZ.trim();
    SER421.MEDOTRFACT = SER421.FACTURA.MED_OTR_FACT.trim();
    SER421.ESPECREMI = SER421.FACTURA.ESPEC_REMITE;
    SER421.PESOFACT = SER421.FACTURA.PESO.trim();
    SER421.TALLAFACT = SER421.FACTURA.TALLA.trim();
    SER421.FLUOROSISFACT = SER421.FACTURA.FLUOROSIS.trim();
    SER421.EDADGESTFACT = SER421.FACTURA.EDAD_GEST.trim();
    SER421.SINTOMRESPFACT = SER421.FACTURA.SINTOM_RESPI.trim();
    SER421.SINTOMPIELFACT = SER421.FACTURA.SINTOM_PIEL.trim();
    SER421.VICTIMALTRATFACT = SER421.FACTURA.VICT_MALTRATO.trim();
    SER421.VICTVIOLENCIAFACT = SER421.FACTURA.VICT_MALTRATO.trim();
    SER421.ENFERMETALFACT = SER421.FACTURA.ENFER_METAL.trim();
    SER421.SEGRIPS_NUM = SER421.FACTURA.SEGRIPS_NUM.trim()
    // SER421.HEMOGW
    // SER421.CREATIW 
    SER421.ARTFACT = SER421.FACTURA.TABLA[0].ARTICULO.trim();
    if (SER421.MEDOTRFACT == 0) {
        SER421.ATIENDEW = '0';
    } else {
        SER421.ATIENDEW = SER421.FACTURA.PERSONAL_ELAB.substring(0, 1);
    }

    if (SER421.SEGRIPS_NUM == 'S') {
        CON851('72', '72', null, 'error', 'error');
        if (localStorage.Usuario != "GEBC") {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        } else {
            _consultacups_SER421();
        }

    } else {
        if (SER421.CLFACT == '0') {
            if ($_NITUSU == 822005339) {
                _consultacups_SER421();
            } else {
                if ($_NITUSU == 900264583) {
                    _consultacups_SER421();
                } else {
                    CON851('78', '78', null, 'error', 'error');
                    let Window = BrowserWindow.getAllWindows();
                    if (Window.length > 1) {
                        _cerrarSegundaVentana();
                    } else {
                        _toggleNav()
                    };
                }
            }
        } else {
            _consultacups_SER421();
        }
    }
}

function _consultacups_SER421() {
    consultacups = buscarcupsSER421(SER421.ARTFACT)
    switch (consultacups) {
        case false:
            SER421.DIAGCUP = 'N';
            _validadcups_SER421();
            break;
        default:
            SER421.GRUPOCUP = consultacups.GRUPO.trim();
            if (SER421.GRUPOCUP < 87) {
                SER421.DIAGCUP = 'S';
                _validadcups_SER421();
            } else if ((SER421.GRUPOCUP == 'FS') || (SER421.GRUPOCUP == 'F8')) {
                SER421.DIAGCUP = 'S';
                _validadcups_SER421();
            } else {
                SER421.DIAGCUP = consultacups.DIAG.trim();
                _validadcups_SER421();
            }
            break;
    }
}

function buscarcupsSER421(data) {
    var retornar = false;
    for (var i in SER421.CUPS) {
        if (SER421.CUPS[i].LLAVE.trim() == data) {
            retornar = SER421.CUPS[i];
            break;
        }
    }
    return retornar;
}

function _validadcups_SER421() {
    console.log(SER421.DIAGCUP, 'DIAG CUPS')
    if (SER421.DIAGCUP == 'N') {
        if ((SER421.CLFACT == '0') || ($_NITUSU == 900264583)) {
            _aceptarestado_SER421()
        } else {
            CON851('78', '78', null, 'error', 'error');
            _evaluaranoingreso_SER421();
        }
    } else {
        _aceptarestado_SER421()
    }
}

function _aceptarestado_SER421() {
    if (SER421.SEXO == 'M') {
        SER421.EMBARESTADO = '';
        $("#condicion_SER421").val(SER421.EMBARESTADO);
        _evaluartriage_SER421();
    } else {

        if (((SER421.UNIDEDADELAB == 'D') || (SER421.UNIDEDADELAB == 'M')) || (((SER421.UNIDEDADELAB == 'A') && (SER421.VLREDADELAB < 10)) ||
            ((SER421.UNIDEDADELAB == 'A') && (SER421.VLREDADELAB > 50)))) {
            SER421.EMBARESTADO = '4';
            $("#condicion_SER421").val('4 - NO ESTA EMBARAZADA');
            _evaluartriage_SER421();
        } else {
            var embarazo = [
                { 'COD': '1', 'DESCRIP': '1ER TRIM. EMBARAZO' },
                { 'COD': '2', 'DESCRIP': '2DO TRIM. EMBARAZO' },
                { 'COD': '3', 'DESCRIP': '3ER TRIM. EMBARAZO' },
                { 'COD': '4', 'DESCRIP': 'NO ESTA EMBARAZADA' },
            ]
            POPUP({
                array: embarazo,
                titulo: 'CONDICION USUARIA',
                indices: [
                    { id: 'COD', label: 'DESCRIP' }
                ],
                seleccion: SER421.EMBARESTADO,
                callback_f: _evaluartriage_SER421,
            },
                _evaluarembarazo_SER421);
        }

    }
}

function _evaluarembarazo_SER421(data) {
    SER421.EMBARESTADO = data.COD;
    switch (data.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
            _evaluartriage_SER421();
            break;
    }
    $("#condicion_SER421").val(data.COD + " - " + data.DESCRIP);
}

function _evaluartriage_SER421() {
    validarInputs({
        form: "#TRIAGE_421",
        orden: "1"
    },
        () => { _evaluarsuc_SER421(); },
        () => {
            SER421.TRIAGE = $("#triage_SER421").val();
            if ((SER421.TRIAGE == '0') || (SER421.TRIAGE == '1') || (SER421.TRIAGE == '2') || (SER421.TRIAGE == '3') || (SER421.TRIAGE == '4')) {
                if ((($_NITUSU == 892000401) || ($_NITUSU == 900648993) || ($_NITUSU == 900755133) ||
                    ($_NITUSU == 900804411) || ($_NITUSU == 900870633)) && (SER421.ESPECIALIDAD == '382') && (SER421.TRIAGE == '0')) {
                    _evaluartriage_SER421();
                } else {
                    _evaluardetalle_SER421();
                }
            } else {
                CON851('02', '02', null, 'error', 'error');
                _evaluartriage_SER421();
            }
        }
    )
}

function _evaluardetalle_SER421() {
    var fuente = '<div class="col-md-12" id="DETALLE_421"> ' +
        '<input id="detallefactura_SER421" class="form-control input-md" data-orden="1" maxlength="40"> ' +
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
                    setTimeout(_evaluardiagnosticotipo_SER421, 300)
                },
                className: 'btn-primary'
            },
            cancelar: {
                label: 'Cancelar',
                callback: function () {
                    ventanadetallefactura.off('shown.bs.modal');
                    _evaluartriage_SER421();
                },
                className: 'btn-danger'
            }
        },

    });
    ventanadetallefactura.init($('.modal-footer').hide());
    // ventanadetallefactura.init(_datotipo_SER421());
    ventanadetallefactura.on('shown.bs.modal', function () {
        $('#detallefactura_SER421').focus();
    });
    _Evaluardetalle_SER421();
}

function _Evaluardetalle_SER421() {
    SER421.DETALLEFACT.length > 1 ? $('#detallefactura_SER421').val(SER421.DETALLEFACT) : $('#detallefactura_SER421').val('');
    validarInputs({
        form: '#DETALLE_421',
        orden: '1',
    },
        function () { $('.btn-danger').click() },
        () => {
            SER421.DETALLEFACT = $('#detallefactura_SER421').val();
            _Aceptarautorizacion_SER421()
        }
    );
}

function _Aceptarautorizacion_SER421() {
    $('.modal-body .row').append('<div class="salto-linea"></div>' +
        '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">AUTORIZACION EPS</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="AUTORIZACION_SER421">' +
        '<input id="autorizacion_SER421" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="1">' +
        '</div>' +
        '</div>' +
        '</div>');
    _Evaluarautorizacion_SER421();
}
function _Evaluarautorizacion_SER421() {
    $('#autorizacion_SER421').val(SER421.NROAUTORINUM);
    SER421.NROAUTORINUM.length > 1 ? $('#autorizacion_SER421').val(SER421.NROAUTORINUM) : $('#autorizacion_SER421').val('');
    validarInputs({
        form: '#AUTORIZACION_SER421',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        () => {
            SER421.NROAUTORINUM = $('#autorizacion_SER421').val();
            $('.btn-primary').click();
        }
    )
}

function _evaluardiagnosticotipo_SER421() {
    var diagnostico = [
        { 'COD': '1', 'DESCRIP': 'IMPRESION DIAGNOSTICA' },
        { 'COD': '2', 'DESCRIP': 'CONFIRMADO NUEVO' },
        { 'COD': '3', 'DESCRIP': 'CONFIRMADO REPETIDO' },
        { 'COD': '9', 'DESCRIP': 'NO APLICA' },
    ]
    POPUP({
        array: diagnostico,
        titulo: 'TIPO DE DIAGNOSTICO',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: SER421.DIAGNOSTICO,
        callback_f: _evaluartriage_SER421,
        teclaAlterna: true
    },
        _evaluartipopdiag_SER421);
}

function _evaluartipopdiag_SER421(data) {
    SER421.DIAGNOSTICO = data.COD;
    switch (data.COD) {
        case '1':
        case '2':
        case '3':
        case '9':
            _evaluardiagprincipal_SER421();
            break;
    }
    $("#tipodiag_SER421").val(data.COD + " - " + data.DESCRIP);
}

function _evaluardiagprincipal_SER421() {
    validarInputs(
        {
            form: "#DIAGPRICIPAL_421",
            orden: '1'
        },
        () => { setTimeout(_evaluardiagnosticotipo_SER421, 300); },
        () => {
            SER421.CODDIAGESTADO = $('#diagprinc_SER421').val();
            SER421.COD1DIAG1ESTADO = SER421.CODDIAGESTADO.substring(0, 1);
            SER421.COD2DIAG2ESTADO = SER421.CODDIAGESTADO.substring(1, 2);
            SER421.RESTODIAGESTADO = SER421.CODDIAGESTADO.substring(2, 3);
            SER421.CODDIAG2ESTADO = SER421.CODDIAGESTADO.substring(3, 4);
            if (SER421.CODDIAGESTADO.trim() == '') {
                $('#diagprinc_SER421').val('');
                $('#descripdiagprinc_SER421').val();
                _evaluardiagsalida_SER421();
            } else {
                buscaquedaenferm = buscarDescrip_enferm421(SER421.CODDIAGESTADO);
                switch (buscaquedaenferm) {
                    case false:
                        console.log('false')
                        CON851('01', '01', null, 'error', 'error');
                        _evaluardiagprincipal_SER421();
                        break;
                    default:
                        SER421.DESCRIPENFER = buscaquedaenferm.NOMBRE_ENF.trim();
                        SER421.SEXOENFER = buscaquedaenferm.SEXO_ENF.trim();
                        SER421.EDADMINENF = buscaquedaenferm.EDAD_MIN_ENF.trim();
                        SER421.EDADMAXENF = buscaquedaenferm.EDAD_MAX_ENF.trim();
                        SER421.TIPOENF = buscaquedaenferm.TIPO_ENF.trim();
                        $('#descripdiagprinc_SER421').val(SER421.DESCRIPENFER);
                        _validacionesdiagprinc_SER421();
                        break;
                }
            }
        })
}

function buscarDescrip_enferm421(data) {
    var retornar = false;
    for (var i in SER421.ENFERMEDADES) {
        if (SER421.ENFERMEDADES[i].COD_ENF.trim() == data) {
            retornar = SER421.ENFERMEDADES[i];
            break;
        }
    }
    return retornar;
}

function _validacionesdiagprinc_SER421() {

    if ($_NITUSU == 800162035) {
        _evaluardiagsalida_SER421();
    } else if (SER421.CLFACT == '7') {
        if ((SER421.COD1DIAG1ESTADO == 'Z') || (SER421.COD1DIAG1ESTADO == 'K') || (SER421.INIDIAGESTAD == 'E1') || (SER421.CODDIAGESTADO == 'I10X') || (SER421.CODDIAGESTADO == 'I151') || (SER421.CODDIAGESTADO == 'I158') ||
            (SER421.CODDIAGESTADO == 'I159') || (SER421.CODDIAGESTADO == 'O16X') || (SER421.CODDIAGESTADO == 'E782') || (SER421.CODDIAGESTADO == 'E784') || (SER421.CODDIAGESTADO == 'E785')) {
            _evaluardiagsalida_SER421()
        } else {
            CON851('G0', 'G0', null, 'error', 'error');
            SER421.CODDIAGESTADO = '';
            if ($_ADMINW == 'GEBC') {
                _evaluardiagsalida_SER421();
            } else {
                _evaluardiagprincipal_SER421();
            }
        }

    } else if ((SER421.CODDIAGESTADO.trim() != '') && (SER421.TIPODIAGESTADO == '0')) {
        CON851('02', '02', null, 'error', 'error');
        _evaluardiagnosticotipo_SER421();
    } else if (($_NITUSU == 830511298) && (SER421.CODDIAGESTADO == 'A09X')) {
        _evaluardiagsalida_SER421();;
    } else if (SER421.CODDIAG2ESTADO == 'X') {
        SER421.LLAVEENF = SER421.TIPOENF + SER421.CODDIAGESTADO;
        let datos_envio = datosEnvio() + SER421.LLAVEENF + '|';
        SolicitarDll({ datosh: datos_envio }, dato => {
            var date = dato.split("|");
            var swinvalid = date[0];
            if (swinvalid == '00') {
                _evaluardiagsalida_SER421();
            } else if (swinvalid == '93') {
                _evaluardiagprincipal_SER421();
            }
        }, get_url('APP/SALUD/SER851A.DLL'));
    } else if ((SER421.SEXOENFER.trim() != '') && (SER421.SEXOENFER != SER421.SEXO)) {
        CON851('73', '73', null, 'error', 'error');
        _evaluardiagprincipal_SER421();
    } else if ((SER421.EDADMINENF > 0) && (SER421.EDAD < SER421.EDADMINENF)) {
        CON851('74', '74', null, 'error', 'error');
        _evaluardiagprincipal_SER421();
    } else if ((SER421.EDADMAXENF > 0) && (SER421.EDAD > SER421.EDADMAXENF)) {
        CON851('74', '74', null, 'error', 'error');
        _evaluardiagprincipal_SER421();
    } else {
        _evaluardiagsalida_SER421();
    }
}

function _evaluardiagsalida_SER421() {
    validarInputs(
        {
            form: "#DIAGREL1_421",
            orden: '1'
        },
        () => { _evaluardiagprincipal_SER421() },
        () => {
            SER421.CODDIAGESTADO2 = $('#diagrel1_SER421').val();
            SER421.COD1DIAG1ESTADO2 = SER421.CODDIAGESTADO2.substring(0, 1);
            SER421.COD2DIAG2ESTADO2 = SER421.CODDIAGESTADO2.substring(1, 2);
            SER421.RESTODIAGESTADO2 = SER421.CODDIAGESTADO2.substring(2, 3);
            SER421.CODDIAG2ESTADO2 = SER421.CODDIAGESTADO2.substring(3, 4);
            if (SER421.CODDIAGESTADO2.trim() == '') {

                $('#diagrel1_SER421').val('');
                $('#descripdiagrel1_SER421').val();
                _evaluardiagconf_SER421();
            } else {
                if (SER421.CODDIAGESTADO.trim() == '') {
                    CON851('03', '03', null, 'error', 'error');
                    _evaluardiagsalida_SER421();
                } else {
                    buscaquedaenferm2 = buscarDescrip2_enferm421(SER421.CODDIAGESTADO2);
                    switch (buscaquedaenferm2) {
                        case false:
                            CON851('01', '01', null, 'error', 'error');
                            _evaluardiagsalida_SER421();
                            break;
                        default:
                            SER421.DESCRIPENFER2 = buscaquedaenferm2.NOMBRE_ENF.trim();
                            SER421.SEXOENFER2 = buscaquedaenferm2.SEXO_ENF.trim();
                            SER421.EDADMINENF2 = buscaquedaenferm2.EDAD_MIN_ENF.trim();
                            SER421.EDADMAXENF2 = buscaquedaenferm2.EDAD_MAX_ENF.trim();
                            $('#descripdiagrel1_SER421').val(SER421.DESCRIPENFER2);
                            _validacionesdiagsalida_SER421();
                            break;
                    }
                }
            }
        })
}

function buscarDescrip2_enferm421(data) {
    var retornar = false;
    for (var i in SER421.ENFERMEDADES) {
        if (SER421.ENFERMEDADES[i].COD_ENF.trim() == data) {
            retornar = SER421.ENFERMEDADES[i];
            break;
        }
    }
    return retornar;
}

function _validacionesdiagsalida_SER421() {
    if ((SER421.SEXOENFER2.trim() != '') && (SER421.SEXOENFER2 != SER421.SEXO)) {
        CON851('73', '73', null, 'error', 'error');
        _evaluardiagsalida_SER421();
    } else if ((SER421.EDADMINENF2 > 0) && (SER421.EDAD < SER421.EDADMINENF2)) {
        CON851('74', '74', null, 'error', 'error');
        _evaluardiagsalida_SER421();
    } else if ((SER421.EDADMAXENF2 > 0) || (SER421.EDAD > SER421.EDADMAXENF2)) {
        CON851('74', '74', null, 'error', 'error');
        _evaluardiagsalida_SER421();
    } else {
        _evaluardiagconf_SER421();
    }
}

function _evaluardiagconf_SER421() {
    validarInputs(
        {
            form: "#DIAGREL2_421",
            orden: '1'
        },
        () => { _evaluardiagsalida_SER421(); },
        () => {
            SER421.CODDIAGESTADO3 = $('#diagrel2_SER421').val();
            SER421.COD1DIAG1ESTADO3 = SER421.CODDIAGESTADO3.substring(0, 1);
            SER421.COD2DIAG2ESTADO3 = SER421.CODDIAGESTADO3.substring(1, 2);
            SER421.RESTODIAGESTADO3 = SER421.CODDIAGESTADO3.substring(2, 3);
            SER421.CODDIAG2ESTADO3 = SER421.CODDIAGESTADO3.substring(3, 4);
            if (SER421.CODDIAGESTADO3.trim() == '') {
                _evaluarcausaext_SER421();
            } else {
                buscaquedaenferm3 = buscarDescrip3_enferm421(SER421.CODDIAGESTADO3);
                switch (buscaquedaenferm3) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _evaluardiagconf_SER421();
                        break;
                    default:
                        SER421.DESCRIPENFER3 = buscaquedaenferm3.NOMBRE_ENF.trim();
                        SER421.SEXOENFER3 = buscaquedaenferm3.SEXO_ENF.trim();
                        SER421.EDADMINENF3 = buscaquedaenferm3.EDAD_MIN_ENF.trim();
                        SER421.EDADMAXENF3 = buscaquedaenferm3.EDAD_MAX_ENF.trim();
                        $('#descripdiagrel2_SER421').val(SER421.DESCRIPENFER3);
                        _validacionesdiagconf_SER421();
                        break;
                }
            }
        }
    )
}

function buscarDescrip3_enferm421(data) {
    var retornar = false;
    for (var i in SER421.ENFERMEDADES) {
        if (SER421.ENFERMEDADES[i].COD_ENF.trim() == data) {
            retornar = SER421.ENFERMEDADES[i];
            break;
        }
    }
    return retornar;
}
function _validacionesdiagconf_SER421() {
    if ((SER421.SEXOENFER3.trim() != 0) && (SER421.SEXOENFER3 != SER421.SEXO)) {
        CON851('73', '73', null, 'error', 'error');
        _evaluardiagconf_SER421();
    } else if ((SER421.EDADMINENF3 > 0) && (SER421.EDAD < SER421.EDADMINENF3)) {
        CON851('74', '74', null, 'error', 'error');
        _evaluardiagconf_SER421();
    } else if ((SER421.EDADMINENF3 > 0) && (SER421.EDAD > SER421.EDADMINENF3)) {
        CON851('74', '74', null, 'error', 'error');
        _evaluardiagconf_SER421();
    } else {
        _evaluarcausaext_SER421();
    }
}

function _evaluarcausaext_SER421() {
    var causaext = [
        { 'COD': '01', 'DESCRIP': 'ACCIDENTE TRABAJO' },
        { 'COD': '02', 'DESCRIP': 'ACCIDENTE TRANSITO' },
        { 'COD': '03', 'DESCRIP': 'ACCIDENTE RABICO' },
        { 'COD': '04', 'DESCRIP': 'ACCIDENTE OFIDICO' },
        { 'COD': '05', 'DESCRIP': 'OTRO TIPO DE ACCIDENTE' },
        { 'COD': '06', 'DESCRIP': 'EVENTO CATASTROFIC' },
        { 'COD': '07', 'DESCRIP': 'LESION POR AGRESION' },
        { 'COD': '08', 'DESCRIP': 'LESION AUTOINFLIGIDA' },
        { 'COD': '09', 'DESCRIP': 'SOSP. MALTRATO FISICO' },
        { 'COD': '10', 'DESCRIP': 'SOSP. ABUSO SEXUAL' },
        { 'COD': '11', 'DESCRIP': 'SOSP. VIOLENC. SEXUAL' },
        { 'COD': '12', 'DESCRIP': 'SOSP. MALTRATO EMOCIONAL' },
        { 'COD': '13', 'DESCRIP': 'ENFERMEDAD GENERAL' },
        { 'COD': '14', 'DESCRIP': 'ENFERMEDAD PROFESIONAL' },
        { 'COD': '15', 'DESCRIP': 'OTRA CAUSA' },
    ]
    POPUP({
        array: causaext,
        titulo: 'CAUSA EXTERNA',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: SER421.CAUSAESTAD,
        callback_f: _evaluardiagconf_SER421,
        teclaAlterna: true
    },
        causaext => {
            SER421.CAUSAESTAD = causaext.COD
            $("#causaext_SER421").val(causaext.COD + ' - ' + causaext.DESCRIP);
            setTimeout(_evaluarpersonal_SER421, 300)
        },
    );
}


function _evaluarpersonal_SER421() {
    if (SER421.ATIENDEW == '0') {
        var personal = [
            { 'COD': '1', 'DESCRIP': 'MEDICO ESPECIALIST' },
            { 'COD': '2', 'DESCRIP': 'MEDICO GENERAL' },
            { 'COD': '3', 'DESCRIP': 'ENFERMERA' },
            { 'COD': '4', 'DESCRIP': 'AUXILIAR ENFERMER.' },
            { 'COD': '5', 'DESCRIP': 'TERAPEUTAS Y OTROS' },
            { 'COD': '6', 'DESCRIP': 'ENFERMERA JEFE PYP' },
            { 'COD': '7', 'DESCRIP': 'PSICOLOGIA' },
            { 'COD': '8', 'DESCRIP': 'NUTRICIONISTA' },
            { 'COD': '9', 'DESCRIP': 'NO APLICA' },
            { 'COD': 'A', 'DESCRIP': 'ODONTOLOGO' },
            { 'COD': 'H', 'DESCRIP': 'HIGIENE ORAL' },
            { 'COD': 'I', 'DESCRIP': 'INSTRUMENTADOR QX' },
            { 'COD': 'O', 'DESCRIP': 'OPTOMETRA' },
        ]
        POPUP({
            array: personal,
            titulo: 'PERSONAL ATIENDE',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            callback_f: () => { setTimeout(function () { _evaluarcausaext_SER421(); }, 300) },
            teclaAlterna: true
        },
            _validarpersonal_SER421);
    } else {
        SER421.PERSONALELAB = SER421.ATIENDEW;
        // $("#personalat_SER421").val(SER421.PERSONALELAB);
        _evaluartipoproced_SER421();
    }
}
function _validarpersonal_SER421() {
    SER421.PERSONALELAB = data.COD;
    switch (data.COD) {
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
        case 'H':
        case 'I':
        case 'O':
            if (SER421.CLFACT > '0') {
                busquedadespcups = buscar_especcupsSER102C(SER421.ARTFACT)
                switch (busquedadespcups) {
                    case false:
                        _evaluartipoproced_SER421();
                        break;
                    default:
                        SER421.ATIENDEESPCUP = busquedadespcups.ATIENDE.trim();
                        if ((SER421.ATIENDEESPCUP.trim() == '') || (SER421.ATIENDEESPCUP == '9')) {
                            _evaluartipoproced_SER421();
                        } else {
                            if (SER421.PERSONALELAB != SER421.ATIENDEESPCUP) {
                                CON851('3E', '3E', null, 'error', 'error');
                                setTimeout(_evaluarpersonal_SER421, 300)
                            } else {
                                _evaluartipoproced_SER421();
                            }
                        }
                        break;
                }


            } else {
                _evaluartipoproced_SER421();
            }
            break;
    }
    $("#personalat_SER421").val(data.COD + " - " + data.DESCRIP);
}

function buscar_especcupsSER102C(data) {
    var retornar = false;
    for (var i in SER421.ESPECCUP) {
        if (SER421.ESPECCUP[i].CODIGO.trim() == data) {
            retornar = SER421.ESPECCUP[i];
            break;
        }
    }
    return retornar;
}

function _evaluartipoproced_SER421() {
    var tipoproced = [
        { 'COD': '1', 'DESCRIP': 'DIAGNOSTICO' },
        { 'COD': '2', 'DESCRIP': 'TERAPEUTICO' },
        { 'COD': '3', 'DESCRIP': 'ENFERMERA' },
        { 'COD': '4', 'DESCRIP': 'PROTEC. ESPECIFICA' },
        { 'COD': '5', 'DESCRIP': 'DET.TEMPRANA ENF.G' },
        { 'COD': '9', 'DESCRIP': 'DET.TEMPRANA ENF.P' },

    ]
    POPUP({
        array: tipoproced,
        titulo: 'TIPO PROCEDIMIENTO',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: SER421.TIPOPROCED,
        callback_f: () => { setTimeout(function () { _evaluarcausaext_SER421(); }, 300) },
        teclaAlterna: true
    },
        _validartipoproced_SER421);
}

function _validartipoproced_SER421(data) {
    SER421.TIPOPROCED = data.COD;
    switch (data.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '9':
            setTimeout(_evaluarestadosal_SER421, 300)
            break;
        default:
            setTimeout(_evaluarcausaext_SER421, 300)
            break;
    }
    $("#tipoproced_SER421").val(data.COD + " - " + data.DESCRIP);
}
function _evaluarestadosal_SER421() {
    var estadosal = [
        { 'COD': '1', 'DESCRIP': 'VIVO   (a)' },
        { 'COD': '2', 'DESCRIP': 'MUERTO (a)' },
        { 'COD': '3', 'DESCRIP': 'REMITIDO' },
        { 'COD': '4', 'DESCRIP': 'HOSPITALIZAD' },
        { 'COD': '5', 'DESCRIP': 'OBSERVACION' },
        { 'COD': '6', 'DESCRIP': 'NO APLICA' },
    ]
    POPUP({
        array: estadosal,
        titulo: 'ESTADO SALIDA',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: SER421.ESTADOSALESTAD,
        callback_f: () => { setTimeout(function () { _evaluartipoproced_SER421(); }, 300) },
        teclaAlterna: true
    },
        _validarestadosal_SER421);
}

function _validarestadosal_SER421(data) {
    SER421.ESTADOSALESTAD = data.COD;
    switch (data.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '9':
            if (SER421.ESTADOSALESTAD != '3') {
                SER421.ESPECREMI = '';
                $("#especremite_SER421").val('');
                setTimeout(_evaluarrepetido_SER421, 300)
            } else {
                _evaluarespecremite_SER421();
            }
            break;
    }
    $("#estadosal_SER421").val(data.COD + " - " + data.DESCRIP);
}

function _evaluarespecremite_SER421() {
    validarInputs(
        {
            form: "#ESPREMITE_421",
            orden: '1'
        },
        () => { _evaluarestadosal_SER421(); },
        () => {
            SER421.ESPECREMI = $('#especremite_SER421').val();
            if (SER421.ESPECREMI.trim() == '') {
                CON851('01', '01', null, 'error', 'error');
                _evaluarespecremite_SER421();
            } else {
                buscaquedaespecremite = buscarDesc_especremite421(SER421.ESPECREMI);
                switch (buscaquedaespecremite) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _evaluarespecremite_SER421();
                        break;
                    default:
                        SER421.DESCRIPESPREMITE = buscaquedaespecremite.NOMBRE.trim();
                        $('#descripespecremite_SER421').val(SER421.DESCRIPESPREMITE);
                        _evaluarrepetido_SER421();
                        break;
                }
            }
        })
}

function buscarDesc_especremite421(data) {
    var retornar = false;
    for (var i in SER421.ESPECIALIDADES) {
        if (SER421.ESPECIALIDADES[i].CODIGO.trim() == data) {
            retornar = SER421.ESPECIALIDADES[i];
            break;
        }
    }
    return retornar;
}

function _evaluarrepetido_SER421() {
    var estadosal = [
        { 'COD': '1', 'DESCRIP': 'PRIM. VEZ' },
        { 'COD': '2', 'DESCRIP': 'REPETIDO' },
        { 'COD': '9', 'DESCRIP': 'NO APLICA' }

    ]
    POPUP({
        array: estadosal,
        titulo: 'ESTADO SALIDA',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: SER421.REPETIDESTAD,
        callback_f: () => { setTimeout(function () { _evaluarestadosal_SER421(); }, 300) },
        teclaAlterna: true
    },
        _validarrepetido_SER421);
}

function _validarrepetido_SER421(estadosal) {
    SER421.REPETIDESTAD = estadosal.COD;
    switch (estadosal.COD) {
        case '1':
        case '2':
        case '9':
            _evaluardiasincap_SER421();
            break;
        default:
            _evaluarestadosal_SER421();
            break;
    }
    $("#consrepet_SER421").val(estadosal.COD + " - " + estadosal.DESCRIP);
}

function _evaluardiasincap_SER421() {
    validarInputs(
        {
            form: "#DIASINCAPACI_421",
            orden: '1'
        },
        () => { _evaluarestadosal_SER421(); },
        () => {
            SER421.DIASINCAP = $('#diasincap_SER421').val().padStart(3, '0');;
            if (SER421.ESTADOSALESTAD == '2') {
                SER421.TIPODISC = '0';
                $('#tipodisc_SER421').val('0');
                _evaluardiagmuerte_SER421();
            } else {
                SER421.TIPODISC = '';
                SER421.DIAGMUERTEESTAD = '';
                $('#causamuer_SER421').val('');
                _validacionesdiagmuerte_SER421();
            }
        })
}
function _evaluardiagmuerte_SER421() {
    validarInputs(
        {
            form: "#CAUSAMUERTE_421",
            orden: '1'
        },
        () => { _evaluarestadosal_SER421(); },
        () => {
            SER421.DIAGMUERTEESTAD = $('#causamuer_SER421').val();
            _validacionesdiagmuerte_SER421();
        })
}

function _validacionesdiagmuerte_SER421() {
    if ((SER421.ESTADOSALESTAD == '2') && (SER421.DIAGMUERTEESTAD.trim() == '')) {
        CON851('02', '02', null, 'error', 'error');
        _evaluardiagmuerte_SER421();
    } else {
        if (SER421.DIAGMUERTEESTAD.trim() == '') {
            $('#descripcausamuer_SER421').val('');
            _datofinalidadconsult_SER421();
        } else {
            buscaquedadiagmuerte = buscarDescripmuerte_421(SER421.DIAGMUERTEESTAD);
            switch (buscaquedadiagmuerte) {
                case false:
                    CON851('01', '01', null, 'error', 'error');
                    _evaluardiagmuerte_SER421();
                    break;
                default:
                    SER421.DESCRIPMUERTE = buscaquedadiagmuerte.NOMBRE_ENF.trim();
                    SER421.SEXOMUERTE = buscaquedadiagmuerte.SEXO_ENF.trim();
                    SER421.EDADMINMUERTE = buscaquedadiagmuerte.EDAD_MIN_ENF.trim();
                    SER421.EDADMAXMUERTE = buscaquedadiagmuerte.EDAD_MAX_ENF.trim();
                    SER421.TIPOMUERTE = buscaquedadiagmuerte.TIPO_ENF.trim();
                    $('#descripcausamuer_SER421').val(SER421.DESCRIPMUERTE);
                    if ((SER421.SEXOMUERTE != '') && (SER421.SEXOMUERTE != SER421.SEXO)) {
                        CON851('73', '73', null, 'error', 'error');
                        _evaluardiagmuerte_SER421();
                    } else if ((SER421.EDADMINMUERTE > 0) && (SER421.EDAD < SER421.EDADMINMUERTE)) {
                        CON851('74', '74', null, 'error', 'error');
                        _evaluardiagmuerte_SER421();
                    } else if ((SER421.EDADMINMUERTE > 0) && (SER421.EDAD > SER421.EDADMAXMUERTE)) {
                        CON851('74', '74', null, 'error', 'error');
                        _evaluardiagmuerte_SER421();
                    } else if (SER421.CODDIAGMUERT2ESTADO = 'X') {
                        SER421.LLAVEMUERTE = SER421.TIPOMUERTE + SER421.DIAGMUERTEESTAD;
                        let datos_envio = datosEnvio() + SER421.LLAVEENF + '|';
                        SolicitarDll({ datosh: datos_envio }, dato => {
                            var date = dato.split("|");
                            var swinvalid = date[0];
                            if (swinvalid == '00') {
                                _datofinalidadconsult_SER421();
                            } else if (swinvalid == '93') {
                                _evaluardiagmuerte_SER421();
                            }
                        }, get_url('APP/SALUD/SER851A.DLL'));
                    } else {
                        _datofinalidadconsult_SER421();
                    }
                    break;
            }
        }
    }
}

function buscarDescripmuerte_421(data) {
    var retornar = false;
    for (var i in SER421.ENFERMEDADES) {
        if (SER421.ENFERMEDADES[i].COD_ENF.trim() == data) {
            retornar = SER421.ENFERMEDADES[i];
            break;
        }
    }
    return retornar;
}

function _datofinalidadconsult_SER421() {
    if (SER421.CLFACT == '7') {
        var finalidadest = [
            { 'COD': '1', 'DESCRIP': 'ATENCION PARTO ' },
            { 'COD': '2', 'DESCRIP': 'ATENCION REC.NACID' },
            { 'COD': '3', 'DESCRIP': 'ATENC.PLANIF.FAMIL' },
            { 'COD': '4', 'DESCRIP': 'PRIMERA INFANCIA' },
            { 'COD': '5', 'DESCRIP': 'ADOLESCENCIA' },
            { 'COD': '6', 'DESCRIP': 'DET.ALT.EMBARAZO' },
            { 'COD': '7', 'DESCRIP': 'ADULTEZ' },
            { 'COD': '8', 'DESCRIP': 'DET.ALT.AGUD.VISUA' },
            { 'COD': 'A', 'DESCRIP': 'DET.ENFERM.PROFES' },
            { 'COD': 'B', 'DESCRIP': 'NO APLICA' },
            { 'COD': 'C', 'DESCRIP': 'PATOLOGIA CRONICA' }
        ]
        POPUP({
            array: finalidadest,
            titulo: 'FINALIDAD ESTADO',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            seleccion: SER421.FINALID,
            callback_f: _evaluardiagmuerte_SER421,
            teclaAlterna: true
        },
            _validarfinalidad_SER421);
    } else {
        SER421.FINALID = '10';
        $('#finalidad_SER421').val('10 - NO APLICA');
        _validarprimeravez_SER421();
    }
}

function _validarfinalidad_SER421(data) {
    SER421.FINALID = data.COD;
    switch (data.COD) {
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
            _validarprimeravez_SER421();
            break;
    }
    $("#finalidad_SER421").val(data.COD + " - " + data.DESCRIP);
}

function _validarprimeravez_SER421() {
    if (SER421.CLFACT == '7') {
        validarInputs(
            {
                form: "#PRIMERAVEZ_421",
                orden: '1'
            },
            () => { _datofinalidadconsult_SER421(); },
            () => {
                SER421.PRIMERAVEZ = $('#primervez_SER421').val();
                if ((SER421.PRIMERAVEZ == 'S') || (SER421.PRIMERAVEZ == 'N')) {
                    _evaluaranoingreso_SER421();
                } else {
                    CON851('03', '03', null, 'error', 'error');
                    _validarprimeravez_SER421();
                }
            })
    } else {
        SER421.PRIMERAVEZ = '';
        $('#primervez_SER421').val('');
        _evaluaranoingreso_SER421();
    }
}

function _evaluaranoingreso_SER421() {
    validarInputs(
        {
            form: "#ANOING_421",
            orden: '1'
        },
        () => { setTimeout(_evaluarestadosal_SER421, 300); },
        () => {
            SER421.ANOINGESTADO = $('#anoingreso_SER421').val();
            if (SER421.ANOINGESTADO > 2090) {
                _evaluaranoingreso_SER421();
            } else {
                _evaluarmesingreso_SER421();
            }
        })
}

function _evaluarmesingreso_SER421() {
    validarInputs(
        {
            form: "#MESING_421",
            orden: '1'
        },
        () => { _evaluaranoingreso_SER421(); },
        () => {
            SER421.MESINGESTADO = $('#mesingreso_SER421').val();
            if ((SER421.MESINGESTADO < 1) || (SER421.MESINGESTADO > 12)) {
                CON851('37', '37', null, 'error', 'error');
                _evaluarmesingreso_SER421();
            } else {
                switch (SER421.MESINGESTADO) {
                    case 01:
                        SER421.DIALIMIW = '31'
                        break;
                    case 02:
                        SER421.DIALIMIW = '29'
                        break;
                    case 03:
                        SER421.DIALIMIW = '31'
                        break;
                    case 04:
                        SER421.DIALIMIW = '30'
                        break;
                    case 05:
                        SER421.DIALIMIW = '31'
                        break;
                    case 06:
                        SER421.DIALIMIW = '30'
                        break;
                    case 07:
                        SER421.DIALIMIW = '31'
                        break;
                    case 08:
                        SER421.DIALIMIW = '31'
                        break;
                    case 09:
                        SER421.DIALIMIW = '30'
                        break;
                    case 10:
                        SER421.DIALIMIW = '31'
                        break;
                    case 11:
                        SER421.DIALIMIW = '30'
                        break;
                    case 12:
                        SER421.DIALIMIW = '31'
                        break;
                    default:
                        SER421.DIALIMIW = '31'
                        break;
                }
                _evaluardiaingreso_SER421();
            }
        })
}

function _evaluardiaingreso_SER421() {
    validarInputs(
        {
            form: "#DIAING_421",
            orden: '1'
        },
        () => { _datofinalidadconsult_SER421(); },
        () => {
            SER421.DIAINGESTADO = $('#diaingreso_SER421').val();
            if ((SER421.MESINGESTADO.trim() != '') && (SER421.DIAINGESTADO.trim() == '')) {
                CON851('37', '37', null, 'error', 'error');
                _evaluardiaingreso_SER421();
            } else if ((SER421.DIAINGESTADO < 1) || (SER421.DIAINGESTADO > SER421.DIALIMIW)) {
                CON851('37', '37', null, 'error', 'error');
                _evaluardiaingreso_SER421();
            } else {
                SER421.FECHAINGESTAD = SER421.ANOINGESTADO + SER421.MESINGESTADO + SER421.DIAINGESTADO;
                _evaluarhoraingreso_SER421();
            }
        })
}
function _evaluarhoraingreso_SER421() {
    validarInputs(
        {
            form: "#HRING_421",
            orden: '1'
        },
        () => { _datofinalidadconsult_SER421(); },
        () => {
            SER421.HORAINGESTADO = $('#hringreso_SER421').val();
            if (SER421.HORAINGESTADO > 23) {
                CON851('', 'Hora fuera del rango', null, 'error', 'error');
                _evaluarhoraingreso_SER421()
            } else {
                _evaluarminingreso_SER421();
            }
        })
}
function _evaluarminingreso_SER421() {
    validarInputs(
        {
            form: "#MNING_421",
            orden: '1'
        },
        () => { _datofinalidadconsult_SER421(); },
        () => {
            SER421.MININGESTADO = $('#mningreso_SER421').val();
            if (SER421.MININGESTADO > 59) {
                CON851('', 'Minuto fuera del rango', null, 'error', 'error');
                _evaluarminingreso_SER421();
            } else {
                SER421.HORAATENESTAD = SER421.HORAINGESTADO + SER421.MININGESTADO;
                if (((SER421.FECHASALESTAD < SER421.FECHAINGESTAD) || (SER421.FECHAINGESTAD < SER421.FECHAFACT))) {
                    SER421.FECHASALESTAD = SER421.FECHAINGESTAD;
                    $('#anosalida_SER421').val(SER421.ANOINGESTADO);
                    $('#messalida_SER421').val(SER421.MESINGESTADO);
                    $('#diasalida_SER421').val(SER421.DIAINGESTADO);
                    _evaluaranosalid_SER421();
                } else {
                    _evaluaranosalid_SER421();
                }
            }
        })
}

function _evaluaranosalid_SER421() {
    validarInputs(
        {
            form: "#ANOSAL_421",
            orden: '1'
        },
        () => { _datofinalidadconsult_SER421(); },
        () => {
            SER421.ANOSALESTADO = $('#anosalida_SER421').val();
            _evaluarmessalid_SER421();
        })
}
function _evaluarmessalid_SER421() {
    validarInputs(
        {
            form: "#MESSAL_421",
            orden: '1'
        },
        () => { _datofinalidadconsult_SER421(); },
        () => {
            SER421.MESSALESTADO = $('#messalida_SER421').val();
            if ((SER421.MESSALESTADO < 1) || (SER421.MESSALESTADO > 12)) {
                CON851('37', '37', null, 'error', 'error');
                _evaluarmessalid_SER421();
            } else {
                _evaluardiasalid_SER421();
            }
        })
}
function _evaluardiasalid_SER421() {
    validarInputs(
        {
            form: "#DIASAL_421",
            orden: '1'
        },
        () => { _datofinalidadconsult_SER421(); },
        () => {
            SER421.DIASALESTADO = $('#diasalida_SER421').val();
            if ((SER421.DIASALESTADO < 1) || (SER421.DIASALESTADO > 31)) {
                CON851('37', '37', null, 'error', 'error');
                _evaluardiasalid_SER421()
            } else {
                SER421.FECHASALESTAD = SER421.ANOSALESTADO + SER421.MESSALESTADO + SER421.DIASALESTADO;
                if (SER421.FECHASALESTAD < SER421.FECHAINGESTAD) {
                    CON851('03', '03', null, 'error', 'error');
                    _evaluardiasalid_SER421();
                } else {
                    if ((SER421.HRSALIDESTADO == '00') && (SER421.MNSALIDESTADO == '00')) {
                        SER421.HORASALESTAD = SER421.HORAATENESTAD;
                        $('#hrsalida_SER421').val(SER421.HORAINGESTADO);
                        $('#mnsalida_SER421').val(SER421.MININGESTADO);
                        _evaluarhorasalid_SER421();
                    } else {
                        _evaluarhorasalid_SER421();
                    }
                }
            }
        })
}
function _evaluarhorasalid_SER421() {
    validarInputs(
        {
            form: "#HRSAL_421",
            orden: '1'
        },
        () => { _datofinalidadconsult_SER421(); },
        () => {
            SER421.HRSALESTADO = $('#hrsalida_SER421').val();
            if (SER421.HRSALESTADO > 23) {
                CON851('', 'Hora fuera del rango', null, 'error', 'error');
                _evaluarhorasalid_SER421()
            } else {
                _evaluarminsalid_SER421()
            }
        })
}
function _evaluarminsalid_SER421() {
    validarInputs(
        {
            form: "#MNSAL_421",
            orden: '1'
        },
        () => { _datofinalidadconsult_SER421(); },
        () => {

            SER421.MNSALESTADO = $('#mnsalida_SER421').val();
            if (SER421.MNSALESTADO > 59) {
                CON851('', 'Minuto fuera del rango', null, 'error', 'error');
                _evaluarminsalid_SER421()
            } else {
                SER421.HORASALESTAD = SER421.HRSALESTADO + SER421.MNSALESTADO;
                _ventanainfadicional_SER421();
            }
        })
}

function _ventanainfadicional_SER421() {

    var ventanaadicional = bootbox.dialog({
        size: 'large',
        title: 'DATOS 4505',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +

            '<div class="col-md-4 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-5 col-sm-6 col-xs-6 control-label" for="name">' + "Peso:" + '</label> ' +
            '<div class="col-md-7 col-sm-6 col-xs-6" id="PESO_SER421"> ' +
            '<input id="peso_421" class="form-control input-md" data-orden="1" maxlength="5"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-5 col-sm-6 col-xs-6 control-label" for="name">' + "Talla:" + '</label> ' +
            '<div class="col-md-7 col-sm-6 col-xs-6" id="TALLA_SER421"> ' +
            '<input id="talla_421" class="form-control input-md" data-orden="1" maxlength="6"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-5 col-sm-6 col-xs-6 control-label" for="name">' + "Fluorosis:" + '</label> ' +
            '<div class="col-md-7 col-sm-6 col-xs-6" id="FLUOROSIS_SER421"> ' +
            '<input id="fluorosis_421" class="form-control input-md" data-orden="1" maxlength="6"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="salto-linea"></div>' +
            '<div class="col-md-4 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-5 col-sm-6 col-xs-6 control-label" for="name">' + "Edad gestacional:" + '</label> ' +
            '<div class="col-md-7 col-sm-6 col-xs-6" id="EDADGEST_SER421"> ' +
            '<input id="edadgest_421" class="form-control input-md" data-orden="1" maxlength="3"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-5 col-sm-6 col-xs-6 control-label" for="name">' + "Sintomatico resp:" + '</label> ' +
            '<div class="col-md-7 col-sm-6 col-xs-6" id="SINTORESP_SER421"> ' +
            '<input id="sintoresp_421" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-5 col-sm-6 col-xs-6 control-label" for="name">' + "Sintomatico Piel:" + '</label> ' +
            '<div class="col-md-7 col-sm-6 col-xs-6" id="SINTOPIEL_SER421"> ' +
            '<input id="sintopiel_421" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="salto-linea"></div>' +
            '<div class="col-md-4 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-5 col-sm-6 col-xs-6 control-label" for="name">' + "Victima maltrato:" + '</label> ' +
            '<div class="col-md-7 col-sm-6 col-xs-6" id="VICTMALTR_SER421"> ' +
            '<input id="victmalt_421" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-5 col-sm-6 col-xs-6 control-label" for="name">' + "Victima violencia:" + '</label> ' +
            '<div class="col-md-7 col-sm-6 col-xs-6" id="VICTVIOLEN_SER421"> ' +
            '<input id="victviolen_421" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-5 col-sm-6 col-xs-6 control-label" for="name">' + "Enfermedad mental:" + '</label> ' +
            '<div class="col-md-7 col-sm-6 col-xs-6" id="ENFERMENTAL_SER421"> ' +
            '<input id="enfermetal_421" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="salto-linea"></div>' +
            '<div class="col-md-4 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-5 col-sm-6 col-xs-6 control-label" for="name">' + "Vlr Res.Hemoglobina:" + '</label> ' +
            '<div class="col-md-7 col-sm-6 col-xs-6" id="VLRRESHEMOG_SER421"> ' +
            '<input id="vlrreshemog_421" class="form-control input-md" data-orden="1" maxlength="2"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-5 col-sm-6 col-xs-6 control-label" for="name">' + "Vlr Res.Creatinina:" + '</label> ' +
            '<div class="col-md-7 col-sm-6 col-xs-6" id="VLRRESCREAT_SER421"> ' +
            '<input id="vlrrescreat_421" class="form-control input-md" data-orden="1" maxlength="6"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-5 col-sm-6 col-xs-6 control-label" for="name">' + "Vlr Hc.Creatinina:" + '</label> ' +
            '<div class="col-md-7 col-sm-6 col-xs-6" id="VLRHEMOGLOGINA_SER421"> ' +
            '<input id="vlrhemoglobina_421" class="form-control input-md" data-orden="1" maxlength="2"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="salto-linea"></div>' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<div class="inline-inputs">' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Fecha Hemoglobina:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id="ANOHEMOGLOB_SER421"> ' +
            '<input id="anohemoglob_421" class="form-control input-md" data-orden="1" maxlength="4" placeholder="AAAA"> ' +
            '</div> ' +
            '<div class="col-md-3 col-sm-6 col-xs-6" id="MESHEMOGLOB_SER421"> ' +
            '<input id="meshemoglob_421" class="form-control input-md" data-orden="1" maxlength="2" placeholder="MM"> ' +
            '</div> ' +
            '<div class="col-md-3 col-sm-6 col-xs-6" id="DIAHEMOGLOB_SER421"> ' +
            '<input id="diahemoglob_421" class="form-control input-md" data-orden="1" maxlength="2" placeholder="DD"> ' +
            '</div> ' +
            '</div> ' +
            '</div> ' +
            // '<div class="salto-linea"></div>' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<div class="inline-inputs">' +
            '<label class="col-md-5 col-sm-6 col-xs-6 control-label" for="name">' + "Fecha Creatinina:" + '</label> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6" id="ANOCREATI_SER421"> ' +
            '<input id="anocreati_421" class="form-control input-md" data-orden="1" maxlength="4" placeholder="AAAA"> ' +
            '</div> ' +
            '<div class="col-md-3 col-sm-6 col-xs-6" id="MESCREATI_SER421"> ' +
            '<input id="mescreati_421" class="form-control input-md" data-orden="1" maxlength="2" placeholder="MM"> ' +
            '</div> ' +
            '<div class="col-md-3 col-sm-6 col-xs-6" id="DIACREATI_SER421"> ' +
            '<input id="diacreati_421" class="form-control input-md" data-orden="1" maxlength="2" placeholder="DD"> ' +
            '</div> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanaadicional.off('show.bs.modal');
                    _opciongrabar_SER421();
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanaadicional.off('show.bs.modal');
                    _evaluardiasincap_SER421();
                }
            }
        }
    });
    ventanaadicional.init($('.modal-footer').hide());
    ventanaadicional.init(_datopeso_SER421());
    ventanaadicional.on('shown.bs.modal', function () {
        $("#peso_421").focus();
    });
}


function _datopeso_SER421() {
    _inputControl("disabled");
    var vlrpeso_421Mask = new IMask(document.getElementById('peso_421'),
        { mask: Number, min: 0, max: 999, scale: 1, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
    );
    // $("#peso_421").val(SER421.PESOFACT);
    vlrpeso_421Mask.typedValue = SER421.PESOFACT;
    $("#talla_421").val(SER421.TALLAFACT);
    $("#fluorosis_421").val(SER421.FLUOROSISFACT);
    $("#edadgest_421").val(SER421.EDADGESTFACT);
    $("#sintoresp_421").val(SER421.SINTOMRESPFACT);
    $("#sintopiel_421").val(SER421.SINTOMPIELFACT);
    $("#victmalt_421").val(SER421.VICTIMALTRATFACT);
    $("#victviolen_421").val(SER421.VICTVIOLENCIAFACT);
    $("#enfermetal_421").val(SER421.ENFERMETALFACT);
    // $("#vlrreshemog_421").val('4 - NO ESTA EMBARAZADA');
    // $("#vlrrescreat_421").val('4 - NO ESTA EMBARAZADA');
    validarInputs({
        form: '#PESO_SER421',
        orden: "1"
    },
        () => { $('.btn-danger').click() },
        () => {
            SER421.PESOFACT = vlrpeso_421Mask.value.replace(',', '');
            if ($_NITUSU == 845000038) {
                if (SER421.PESOFACT > 0) {
                    _datotalla_SER421();
                } else {
                    CON851('02', '02', null, 'error', 'error');
                    _datopeso_SER421();
                }
            } else if (SER421.PESOFACT > 500) {
                CON851('03', '03', null, 'error', 'error');
                _datopeso_SER421();
            } else {
                _datotalla_SER421();
            }
        }
    )
}

function _datotalla_SER421() {
    validarInputs({
        form: '#TALLA_SER421',
        orden: "1"
    },
        () => { _datopeso_SER421(); },
        () => {
            SER421.TALLAFACT = $('#talla_421').val();
            if ($_NITUSU == 845000038) {
                if (SER421.TALLAFACT > 0) {
                    _datotalla_SER421();
                } else {
                    CON851('02', '02', null, 'error', 'error');
                    _datotalla_SER421();
                }
            } else if ((SER421.TALLAFACT > 0) && (SER421.TALLAFACT < 10) || (SER421.TALLAFACT > 220)) {
                CON851('03', '03', null, 'error', 'error');
                _datotalla_SER421();
            } else {
                _datofluorosis_SER421();
            }
        }
    )
}

function _datofluorosis_SER421() {
    if ((SER421.CLFACT == '7') && ((SER421.ARTFACT == '890203') || (SER421.ARTFACT == '890303'))) {
        validarInputs({
            form: '#FLUOROSIS_SER421',
            orden: "1"
        },
            () => { _datotalla_SER421(); },
            () => {
                SER421.FLUOROSISFACT = $('#fluorosis_421').val();
                if ((SER421.FLUOROSISFACT == '0') || (SER421.FLUOROSISFACT == '1') || (SER421.FLUOROSISFACT == '2') || (SER421.FLUOROSISFACT == '3')) {
                    _datoedadgesti_SER421();
                } else {
                    CON851('03', '03', null, 'error', 'error');
                    _datofluorosis_SER421()
                }
            }
        )
    } else {
        _datoedadgesti_SER421();
    }
}
function _datoedadgesti_SER421() {
    if ((SER421.EMBARESTADO.trim() == '') || (SER421.EMBARESTADO == '4')) {
        SER421.EDADGESTFACT == '00';
        $('#edadgest_421').val('0');
        _datosintomrespi_SER421();
    } else {
        validarInputs({
            form: '#EDADGEST_SER421',
            orden: "1"
        },
            () => { _datotalla_SER421(); },
            () => {
                SER421.EDADGESTFACT = $('#edadgest_421').val();
                _datosintomrespi_SER421();
            }
        )
    }
}

function _datosintomrespi_SER421() {
    validarInputs({
        form: '#SINTORESP_SER421',
        orden: "1"
    },
        () => { _datotalla_SER421(); },
        () => {
            SER421.SINTOMRESPFACT = $('#sintoresp_421').val().toUpperCase(); $('#sintoresp_421').val(SER421.SINTOMRESPFACT);
            if ((SER421.SINTOMRESPFACT == 'S') || (SER421.SINTOMRESPFACT == 'N')) {
                _datosintompiel_SER421();
            } else {

                CON851('03', '03', null, 'error', 'error');
                _datosintomrespi_SER421();
            }
        }
    )
}

function _datosintompiel_SER421() {
    validarInputs({
        form: '#SINTOPIEL_SER421',
        orden: "1"
    },
        () => { _datosintomrespi_SER421(); },
        () => {
            SER421.SINTOMPIELFACT = $('#sintopiel_421').val().toUpperCase(); $('#sintopiel_421').val(SER421.SINTOMPIELFACT);
            if ((SER421.SINTOMPIELFACT == 'S') || (SER421.SINTOMPIELFACT == 'N')) {
                _datovicimaltrato_SER421();
            } else {
                CON851('03', '03', null, 'error', 'error');
                _datosintompiel_SER421();
            }
        }
    )
}

function _datovicimaltrato_SER421() {
    validarInputs({
        form: '#VICTMALTR_SER421',
        orden: "1"
    },
        () => { _datosintompiel_SER421(); },
        () => {
            SER421.VICTIMALTRATFACT = $('#victmalt_421').val().toUpperCase(); $('#victmalt_421').val(SER421.VICTIMALTRATFACT);
            if ((SER421.VICTIMALTRATFACT == 'S') || (SER421.VICTIMALTRATFACT == 'N')) {
                _datovicviolencia_SER421();
            } else {
                CON851('03', '03', null, 'error', 'error');
                _datovicimaltrato_SER421();
            }
        }
    )
}
function _datovicviolencia_SER421() {
    validarInputs({
        form: '#VICTVIOLEN_SER421',
        orden: "1"
    },
        () => { _datovicimaltrato_SER421(); },
        () => {
            SER421.VICTVIOLENCIAFACT = $('#victviolen_421').val().toUpperCase(); $('#victviolen_421').val(SER421.VICTVIOLENCIAFACT);
            if ((SER421.VICTVIOLENCIAFACT == 'S') || (SER421.VICTVIOLENCIAFACT == 'N')) {
                _datoenfermedadmental_SER421();
            } else {
                CON851('03', '03', null, 'error', 'error');
                _datovicviolencia_SER421();
            }
        }
    )
}
function _datoenfermedadmental_SER421() {
    validarInputs({
        form: '#ENFERMENTAL_SER421',
        orden: "1"
    },
        () => { _datovicviolencia_SER421(); },
        () => {
            SER421.ENFERMETALFACT = $('#enfermetal_421').val().toUpperCase(); $('#enfermetal_421').val(SER421.ENFERMETALFACT);
            if ((SER421.ENFERMETALFACT == 'S') || (SER421.ENFERMETALFACT == 'N')) {
                if ((SER421.HEMOGW == 0) || (SER421.HEMOGW.trim == '')) {
                    _datocreatinina_SER421();
                } else {
                    _datohemoglobina_SER421();
                }
            } else {
                CON851('03', '03', null, 'error', 'error');
                _datoenfermedadmental_SER421();
            }
        }
    )
}

function _datohemoglobina_SER421() {
    // SER421.VLRRESULT1FACT
    validarInputs({
        form: '#VLRRESHEMOG_SER421',
        orden: "1"
    },
        () => { _datohemoglobina_SER421(); },
        () => {
            SER421.HEMOGW = $('#vlrreshemog_421').val()
            _datocreatinina_SER421();
        }
    )
}
function _datocreatinina_SER421() {
    // SER421.VLRRESULT2FACT
    validarInputs({
        form: '#VLRRESCREAT_SER421',
        orden: "1"
    },
        () => { _datoenfermedadmental_SER421(); },
        () => {
            SER421.CREATIW = $('#vlrrescreat_421').val()
            $('.btn-primary').click();
        }
    )

}

function _opciongrabar_SER421() {
    CON851P('01', _evaluardiasincap_SER421, _confirmarrips_SER421)
}

function _confirmarrips_SER421() {
    SER421.FECHACORRERIPS = moment().format('YYYYMMDD');
    SER421.OPERCORRRIPS = $_ADMINW;
    SER421.PESOFACT = SER421.PESOFACT.replace('.', '').padStart(5, '0');
    let URL = get_url("APP/SALUD/SER421.DLL");
    postData({
        datosh: datosEnvio() + '1|' + SER421.LLAVEFACT + '|' + SER421.EMBARESTADO + '|' + SER421.TRIAGE + '|' + SER421.DETALLEFACT + '|' + SER421.NROAUTORINUM + '|' + SER421.DIAGNOSTICO + '|' + SER421.CODDIAGESTADO + '|' + SER421.CODDIAGESTADO2 + '|' + SER421.CODDIAGESTADO3 + '|' + SER421.CAUSAESTAD + '|' +
            SER421.PERSONALELAB + '|' + SER421.TIPOPROCED + '|' + SER421.ESTADOSALESTAD + '|' + SER421.ESPECREMI + '|' + SER421.REPETIDESTAD + '|' + SER421.DIASINCAP + '|' + SER421.DIAGMUERTEESTAD + '|' + SER421.FINALID + '|' + SER421.PRIMERAVEZ + '|' + SER421.FECHAINGESTAD + '|' +
            SER421.HORAATENESTAD + '|' + SER421.FECHASALESTAD + '|' + SER421.HORASALESTAD + '|' + SER421.PESOFACT + '|' + SER421.TALLAFACT + '|' + SER421.FLUOROSISFACT + '|' + SER421.EDADGESTFACT + '|' + SER421.SINTOMRESPFACT + '|' + SER421.SINTOMPIELFACT + '|' +
            SER421.VICTIMALTRATFACT + '|' + SER421.VICTVIOLENCIAFACT + '|' + SER421.ENFERMETALFACT + '|' + SER421.HEMOGW + '|' + SER421.CREATIW + '|' + SER421.OPERCORRRIPS + '|' + SER421.FECHACORRERIPS
    }, URL)
        .then(data => {
            var data = data.split("|");
            toastr.success('Se ha guardado', 'ACTUALIZAR RIPS');
            loader("hide")
            if ((SER421.FACTURA.FECHA.substring(2, 4) > 01) && (SER421.FACTURA.TABLA[0].ARTICULO.substring(0, 2) == 72 || SER421.FACTURA.TABLA[0].ARTICULO.substring(0, 2) == 73 || SER421.FACTURA.TABLA[0].ARTICULO.substring(0, 2) == 74)) {
                _ventanaripsdenacimientos_SER421()
            } else {
                if (SER421.FACTURA.FECHA.substring(2, 4) <= 01) {
                    if ((SER421.FACTURA.TABLA[0].ARTICULO.substring(0, 2) == 12) || (SER421.FACTURA.TARIF == 'EC' && SER421.FACTURA.TABLA[0].ARTICULO.substring(0, 2) == 11)) {
                        _ventanaripsdenacimientos_SER421()
                    } else {
                        _validacionfinalcitas_SER421()
                    }
                } else {
                    _validacionfinalcitas_SER421()
                }
            }
        })
        .catch(err => {
            console.debug(err);
            _evaluardiasincap_SER421();
        })

}

function _ventanaripsdenacimientos_SER421() {
    let { ipcRenderer } = require("electron");
    ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER421N.html', comprobante: SER421.LLAVEFACT });
    vector = ['on', 'Actualizando nacimiento...']
    _EventocrearSegventana(vector, _validacionfinalcitas_SER421);
}

function _validacionfinalcitas_SER421() {
    if (SER421.FACTURA.CLASE == 1 || SER421.FACTURA.CLASE == 4 || SER421.FACTURA.CLASE == 5) {
        let URL = get_url("APP/SALUD/SER421.DLL");
        postData({
            datosh: datosEnvio() + '2|' + SER421.LLAVEFACT + '||||||||||||||||||||||||||||||||||||' + $_FECHA_LNK.substring(0, 2) + '|'
        }, URL)
            .then(data => {
                console.log(data, 'CITAS')
                _inputControl("reset");
                _inputControl("disabled");
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    _cerrarSegundaVentana();
                } else {
                    _toggleNav()
                };
            })
            .catch(error => {
                console.error(error);
                _inputControl("reset");
                _inputControl("disabled");
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    _cerrarSegundaVentana();
                } else {
                    _toggleNav()
                };

            });
    } else {
        _inputControl("reset");
        _inputControl("disabled");
        let Window = BrowserWindow.getAllWindows();
        if (Window.length > 1) {
            _cerrarSegundaVentana();
        } else {
            _toggleNav()
        };
    }
}



/////////////////////MASCARAS///////////////////////////
var claseservMask = IMask($('#claseservicio_SER421')[0], { mask: Number, min: 0, max: 7 });

/////////////////////////F8/////////////////////////////

function _ventanaclaseservicio_SER421(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE SERVICIO",
            columnas: ["COD", "DESCRIPCION"],
            data: SER421.SERVICIOS,
            callback_esc: function () {
                $("#claseservicio_SER421").focus();
            },
            callback: function (data) {
                claseservMask.typedValue = data.COD;
                _enterInput('#claseservicio_SER421');
            }
        });
    }
}

function _ventanapacientecomp_SER421(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        set_Event_validar('#COMPR_SER421', 'off')
        $('#comprobante_SER421').attr('disabled', 'true');
        SER825(_evaluarcomprobante_SER421, mostrarDatosCompletos_SER421, '1')
    }
}

function _ventanadiagprincipal_SER421(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE ENFERMEDADES",
            columnas: ["COD_ENF", "NOMBRE_ENF"],
            data: SER421.ENFERMEDADES,
            callback_esc: function () {
                $("#diagprinc_SER421").focus();
            },
            callback: function (data) {
                $("#diagprinc_SER421").val(data.COD_ENF);
                _enterInput('#diagprinc_SER421');
            }
        });
    }
}

function _ventanadiagrel1_SER421(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE ENFERMEDADES",
            columnas: ["COD_ENF", "NOMBRE_ENF"],
            data: SER421.ENFERMEDADES,
            callback_esc: function () {
                $("#diagrel1_SER421").focus();
            },
            callback: function (data) {
                $("#diagrel1_SER421").val(data.COD_ENF);
                _enterInput('#diagrel1_SER421');
            }
        });
    }
}
function _ventanadiagrel2_SER421(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE ENFERMEDADES",
            columnas: ["COD_ENF", "NOMBRE_ENF"],
            data: SER421.ENFERMEDADES,
            callback_esc: function () {
                $("#diagrel2_SER421").focus();
            },
            callback: function (data) {
                $("#diagrel2_SER421").val(data.COD_ENF);
                _enterInput('#diagrel2_SER421');
            }
        });
    }
}

function _ventanadiagmuerte_SER421(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE ENFERMEDADES",
            columnas: ["COD_ENF", "NOMBRE_ENF"],
            data: SER421.ENFERMEDADES,
            callback_esc: function () {
                $("#causamuer_SER421").focus();
            },
            callback: function (data) {
                $("#causamuer_SER421").val(data.COD_ENF);
                _enterInput('#causamuer_SER421');
            }
        });
    }
}

function _ventanaespecialidad_SER421(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE ESPECIALIDADES",
            columnas: ["CODIGO", "NOMBRE"],
            data: SER421.ESPECIALIDADES,
            callback_esc: function () {
                $("#especremite_SER421").focus();
            },
            callback: function (data) {
                $("#especremite_SER421").val(data.CODIGO);
                _enterInput('#especremite_SER421');
            }
        });
    }
}