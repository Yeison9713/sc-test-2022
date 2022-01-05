//07-07-2020 DIANA E. CREADO

var SAL450R = [];
SAL450R.TIPO1COMP = "1"; 

$(document).ready(function () {
    nombreOpcion('9,7,6,8,2 - Desmarca comprobante');
    _inputControl('reset');
    _inputControl('disabled');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_ANOLNK = parseInt($_ANOLNK) + 2000;
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    $_PREFIJOUSU = $_USUA_GLOBAL[0].PREFIJ;
    $_CODCIUUSU = $_USUA_GLOBAL[0].CONTROL_USU
    $_DPTCIUUSU = $_CODCIUUSU.substring(0, 1);
    $_CIUCIUUSU = $_CODCIUUSU.substring(1, 5);

    _toggleF8([
        { input: 'claseservicio', app: 'SAL450R', funct: _ventanaclaseservicio_SAL450R },
        { input: 'compr', app: 'SAL450R', funct: _ventanapacientecomp_491 }
    ]);

    if ($_USUA_GLOBAL[0].NIT == '0800156469') {
        SAL450R.SERVICIOS = [
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
        SAL450R.SERVICIOS = [
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
    _Revisardato_SAL450R();

});
/////////////////////MASCARAS///////////////////////////
var claseservMask = IMask($('#claseservicio_SAL450R')[0], { mask: Number, min: 0, max: 7 });

/////////////////////////F8/////////////////////////////

function _ventanaclaseservicio_SAL450R(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE SERVICIO",
            columnas: ["COD", "DESCRIPCION"],
            data: SAL450R.SERVICIOS,
            callback_esc: function () {
                $("#claseservicio_SAL450R").focus();
            },
            callback: function (data) {
                claseservMask.typedValue = data.COD;
                _enterInput('#claseservicio_SAL450R');
            }
        });
    }
}
function _ventanapacientecomp_491(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        set_Event_validar('#COMPR_SAL450R', 'off')
        SER825(_evaluarcomprobante_SAL450R, mostrarDatosCompletos_SAL450R, '1')
    }
}
////////////////////RELIQUIDACION DE COMPROBANTE///////////////

function _evaluarsuc_SAL450R() {
    validarInputs(
        {
            form: "#SUC_SAL450R",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            _Revisardato_SAL450R();
        })
}

function _Revisardato_SAL450R() {

    if ($_PREFIJOUSU.trim() == '') {
        $_PREFIJOUSU = '0';
        $('#unidades_SAL450R').val($_PREFIJOUSU);
        _evaluartiposervicio_SAL450R();
    } else {
        SAL450R.SUCFACT = $_PREFIJOUSU;
        if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719')) {
            SAL450R.POSICIONW = '3';
            // CALL "RX822"
            switch (SAL450R.DATOVENW) {
                case '1':
                    SAL450R.SUCFACT = '01';
                    break;
                case '2':
                    SAL450R.SUCFACT = 'TB';
                    break;
                case '3':
                    SAL450R.SUCFACT = 'KN';
                    break;
                case '4':
                    SAL450R.SUCFACT = 'ZP';
                    break;
                case '5':
                    SAL450R.SUCFACT = '80';
                    break;
                case '6':
                    SAL450R.SUCFACT = 'IB';
                    break;
                case '7':
                    SAL450R.SUCFACT = 'SO';
                    break;
                case '8':
                    SAL450R.SUCFACT = 'SC';
                    break;
                case '9':
                    SAL450R.SUCFACT = 'SC';
                    break;
                case 'A':
                    SAL450R.SUCFACT = 'CS';
                    break;
                default:
                    _toggleNav();
                    break;
            }
        } else {
            $('#unidades_SAL450R').val(SAL450R.SUCFACT);
            _evaluartiposervicio_SAL450R();
        }
    }
}

function _evaluartiposervicio_SAL450R() {
    SAL450R.NROW = '';
    validarInputs(
        {
            form: "#CLASE_SAL450R",
            orden: '1'
        }, function () { _evaluarsuc_SAL450R(); },
        () => {
            SAL450R.CLFACT = claseservMask.value;
            if (SAL450R.CLFACT) {
                SAL450R.SERVICIOS.forEach(data => {
                    if (SAL450R.CLFACT == data.COD) {
                        $('#claseservicio_SAL450R').val(data.COD + " - " + data.DESCRIPCION);
                        if ($_NITUSU == '0800162035') {
                            _buscarnumero_SAL450R();
                        } else {
                            if (((SAL450R.TIPO1COMP == '2') || (SAL450R.TIPO1COMP == '3')) && ((SAL450R.CLFACT == '0') || (SAL450R.CLFACT == '1') || (SAL450R.CLFACT == '5'))) {
                                CON851('14', '14', null, 'error', 'error');
                                _evaluartiposervicio_SAL450R();
                            } else {
                                _buscarnumero_SAL450R();
                            }
                        }
                    }
                });
            } else {
                CON851('03', '03', null, 'error', 'error');
                _evaluartiposervicio_SAL450R();
            }
        })
}

function _buscarnumero_SAL450R() {
    SAL450R.SECU1NUM = '8';
    SAL450R.SECU2NUM = SAL450R.CLFACT;
    if ((SAL450R.NROW == '') || (SAL450R.NROW == '0')) {
        _consultaCON007_SAL450R();
    }else{
        _consultaCON007_SAL450R();
    }
}

function _consultaCON007_SAL450R() {
    SAL450R.SECUNUM = SAL450R.SECU1NUM + SAL450R.SECU2NUM;
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + SAL450R.SECUNUM }, URL)
        .then(data => {
            var data = data.split("|");
            SAL450R['ULTFECHANUM'] = data[2].trim();
            SAL450R['NUMEROCTL'] = data[1].substring(3, 9);
            // SAL450R['NROFACT'] = SAL450R.NUMEROCTL;
            SAL450R.NROW = parseInt(SAL450R.NUMEROCTL) - 1;
            $('#compr_SAL450R').val(SAL450R.NROW);
            _evaluarcomprobante_SAL450R();
        })
        .catch(err => {
            console.debug(err);
        })
}

function _evaluarcomprobante_SAL450R() {
    validarInputs(
        {
            form: "#COMPR_SAL450R",
            orden: '1'
        },
        () => { _evaluartiposervicio_SAL450R(); },
        () => {
            SAL450R.NROW = cerosIzq($('#compr_SAL450R').val(), 6)
            $('#compr_SAL450R').val(SAL450R.NROW)

            var llave_envio = SAL450R.SUCFACT
            llave_envio += SAL450R.CLFACT
            llave_envio += SAL450R.NROW

            var datos_envio = datosEnvio()
            datos_envio += llave_envio
            datos_envio += '|'

            let URL = get_url("APP/SALUD/SAL450A.DLL");
            postData({
                datosh: datos_envio
            }, URL)
                .then((data) => {
                    $("#TABLA_44A tbody").empty();
                    mostrarDatosCompletos_SAL450R(data)
                })
                .catch(error => {
                    console.error(error)
                    _evaluarcomprobante_SAL450R()
                });


        })
}



function mostrarDatosCompletos_SAL450R(data) {
    SAL450R.FACTURA = data.FACTURA[0];
    SAL450R.FACTURA.LLAVEFACT = SAL450R.FACTURA.SUC + SAL450R.FACTURA.CLASE.substring(0,1) + SAL450R.FACTURA.NRO; 
    $('#compr_SAL450R').val(SAL450R.FACTURA.NRO)
    $('#claseservicio_SAL450R').val(SAL450R.FACTURA.CLASE)
    var clase = SAL450R.FACTURA.CLASE.split('')
    SAL450R.FACTURA.CLASE = clase[0]
    $('#compr_SAL450R').val(SAL450R.FACTURA.NRO)
    $('#fecha_SAL450R').val(SAL450R.FACTURA.FECHA)
    $('#factura_SAL450R').val(SAL450R.FACTURA.PREFIJO)
    $('#facturad_SAL450R').val(SAL450R.FACTURA.NRO_CTA)
    $('#pingreso_SAL450R').val(SAL450R.FACTURA.PUERTA_ESTAD + '- ' + SAL450R.FACTURA.DESCRIP_PUERTA)
    $('#cliente_SAL450R').val(SAL450R.FACTURA.NIT_TER)
    $('#cliented_SAL450R').val(SAL450R.FACTURA.DESCRIP_TER)
    $('#paciente_SAL450R').val(SAL450R.FACTURA.ID_PACIENTE)
    $('#paciented_SAL450R').val(SAL450R.FACTURA.DESCRIP_PACI)
    $('#sexo_SAL450R').val(SAL450R.FACTURA.SEXO)
    $('#edad_SAL450R').val(SAL450R.FACTURA.EDAD)
    $('#espec_SAL450R').val(SAL450R.FACTURA.ESPEC)
    $('#despec_SAL450R').val(SAL450R.FACTURA.DESCRIP_ESPEC)
    $('#operElab_SAL450R').val(SAL450R.FACTURA.OPER_ELAB)
    $('#fechaElab_SAL450R').val(SAL450R.FACTURA.FECHA_ELAB)
    if (SAL450R.FACTURA.OPER_CORREC.trim().length > 0) {
        $('#operCorrec_SAL450R').val(SAL450R.FACTURA.OPER_CORREC)
        $('#fechaCorrec_SAL450R').val(SAL450R.FACTURA.FECHA_CORREC)
    }
    $('#secuCopago_SAL450R').val(SAL450R.FACTURA.SECU_ABON)
    if (SAL450R.FACTURA.CLASE == '1') {
        var prof = ['CIRUJANO', 'AYUDANTIA', 'ANESTESIOA', 'MAT.QUIRG', 'DERECH.SALA'];
        for (var i in prof) {
            $('#TABLA_SAL450R tbody').append(
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
        for (var i in SAL450R.FACTURA.TABLA) {
            if (SAL450R.FACTURA.TABLA[i].ARTICULO.trim().length > 0) {
                $('#TABLA_SAL450R tbody').append(''
                    + '<tr>'
                    + '   <td>' + SAL450R.FACTURA.TABLA[i].POSICION + '</td>'
                    + '   <td>' + SAL450R.FACTURA.TABLA[i].ARTICULO + '</td>'
                    + '   <td>' + SAL450R.FACTURA.TABLA[i].DESCRIP_ART + '</td>'
                    + '   <td>' + SAL450R.FACTURA.TABLA[i].ALMACEN + '</td>'
                    + '   <td>' + SAL450R.FACTURA.TABLA[i].CANTIDAD + '</td>'
                    + '   <td>' + SAL450R.FACTURA.TABLA[i].UNIDAD + '</td>'
                    + '   <td>' + SAL450R.FACTURA.TABLA[i].VALOR_UNIT + '</td>'
                    + '   <td>' + SAL450R.FACTURA.TABLA[i].VALOR_FACT + '</td>'
                    + '</tr>'
                )
            }
        }
    }

    $('#refactura_SAL450R').val(SAL450R.FACTURA.REFACTURA)
    $('#destino_SAL450R').val(SAL450R.FACTURA.DESTINO)
    $('#fechaAten_SAL450R').val(SAL450R.FACTURA.FECHA_ING)
    $('#vlrtot_SAL450R').val(SAL450R.FACTURA.VALOR_BRUTO)
    $('#valoriva_SAL450R').val(SAL450R.FACTURA.VALOR_IVA)
    $('#copagoestimfact_SAL450R').val(SAL450R.FACTURA.COPAGO_ESTIM_PAGO)
    $('#netofact_SAL450R').val(SAL450R.FACTURA.VALOR_TOTAL)
    $('#atend_SAL450R').val(SAL450R.FACTURA.MED_OTR_FACT);
    $('#datend_SAL450R').val(SAL450R.FACTURA.DESCRIP_MED1);
    $('#espec_SAL450R').val(SAL450R.FACTURA.ESPEC);
    $('#despec_SAL450R').val(SAL450R.FACTURA.DESCRIP_ESPEC);
    $('#ccostos_SAL450R').val(SAL450R.FACTURA.COSTO_FACT)
    $('#dccostos_SAL450R').val(SAL450R.FACTURA.NOMBRE_COSTO)
    $('#convenio_SAL450R').val(SAL450R.FACTURA.COD_TAR)
    $('#estrato_SAL450R').val(SAL450R.FACTURA.ESTRATO)
    $('#solic_SAL450R').val(SAL450R.FACTURA.REMITE_FACT);
    $('#dsolic_SAL450R').val(SAL450R.FACTURA.DESCRIP_MED2);
    $('#ciudad_SAL450R').val(SAL450R.FACTURA.CIUDAD_PACI)
    $('#detalle_SAL450R').val(SAL450R.FACTURA.DETALLE_FACT)
    $('#finalidad_SAL450R').val(SAL450R.FACTURA.FINALIDAD)
    $('#unidserv_SAL450R').val(SAL450R.FACTURA.UNIDAD_SERVICIO)
    $('#descripunidserv_SAL450R').val(SAL450R.FACTURA.DESCRIP_UNISERV)
    SAL450R.CTAFACT = SAL450R.FACTURA.PREFIJO + SAL450R.FACTURA.NRO_CTA;
    SAL450R.ANOFACT = SAL450R.FACTURA.FECHA.substring(0, 4);
    SAL450R.MESFACT = SAL450R.FACTURA.FECHA.substring(4, 6);
    SAL450R.DIAFACT = SAL450R.FACTURA.FECHA.substring(6, 8);
    SAL450R.DESTINOFACT = SAL450R.FACTURA.DESTINO.trim(); 
    _validargrabado_SAL450R();
}

function _validargrabado_SAL450R() {
    if(parseInt(SAL450R.DESTINOFACT) != 0){
        CON851('2V', '2V', null, 'error', 'error');
        _buscarnumero_SAL450R(); 
    }else{
        if((SAL450R.ANOFACT != $_ANOLNK) || (SAL450R.MESFACT != $_MESLNK)){
            CON851('32', '32', null, 'error', 'error');
            _buscarnumero_SAL450R(); 
        }else{
            CON851P('10', _evaluartiposervicio_SAL450R, _grabar_SAL450R)
        }
    }
    
}
function _grabar_SAL450R() {
    console.log('FALTA DLL DE GRABADO')    
    let URL = get_url("app/SALUD/SAL450R.DLL");
    postData({
        datosh: datosEnvio() + SAL450R.FACTURA.LLAVEFACT + '|' 
    }, URL)
        .then((data) => {
            console.log(data, 'SAL450R')
            _toggleNav();
            CON851('', 'Proceso Terminado!', null, 'success', 'EXITO');
        }).catch(error => {
            console.error(error)
            _buscarnumero_SAL450R();
        });
}
