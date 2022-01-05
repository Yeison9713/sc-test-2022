var SER613 = [];
SER613.TIPO1COMP = "1";

$(document).ready(function () {
    nombreOpcion('9-6-7-A - Trasl. lectura a otro comprobante');
    _inputControl('reset');
    _inputControl('disabled');
    SER613.NROW = '';
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_ANOLNK = parseInt($_ANOLNK) + 2000;
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    $_PREFIJOUSU = $_USUA_GLOBAL[0].PREFIJ;
    _toggleF8([
        { input: 'claseservicio', app: 'SER613', funct: _ventanaclaseservicio_ser613 },
        { input: 'comprobante', app: 'SER613', funct: _ventanapacientecomp_ser613 }
    ]);

    if ($_USUA_GLOBAL[0].NIT == '0800156469') {
        SER613.SERVICIOS = [
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
        SER613.SERVICIOS = [
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
    _datosuc1_SER613();

});

////////////////////RELIQUIDACION DE COMPROBANTE///////////////
function _datosuc1_SER613() {
    if ($_PREFIJOUSU.trim() == '') {
        $('#unidades_SER613').val(SER613.SUCFACT);
        _evaluartiposervicio_SER613();
    } else {
        SER613.SUCFACT = $_PREFIJOUSU;
        $('#unidades_SER613').val(SER613.SUCFACT);
        _evaluartiposervicio_SER613();
    }
}

function _evaluarsuc_SER613() {
    validarInputs(
        {
            form: "#VALIDAR1_SER613",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER613.SUCFACT = $('#unidades_SER613').val(SER613.SUCFACT);
            _evaluartiposervicio_SER613();
        })
}



function _evaluartiposervicio_SER613() {
    validarInputs(
        {
            form: "#VALIDAR2_SER613",
            orden: '1'
        }, function () { _evaluarsuc_SER613(); },
        () => {
            SER613.CLFACT = claseservMask.value;
            if (SER613.CLFACT) {
                SER613.SERVICIOS.forEach(data => {
                    if (SER613.CLFACT == data.COD) {
                        $('#claseservicio_SER613').val(data.COD + " - " + data.DESCRIPCION);
                        _buscarnumero_SER613();
                    }
                });
            } else {
                CON851('03', '03', null, 'error', 'error');
                _evaluartiposervicio_SER613();
            }
        })
}

function _buscarnumero_SER613() {
    if ((SER613.NROW == '') || (SER613.NROW == '0')) {
        SER613.SECU1NUM = '8';
        SER613.SECU2NUM = SER613.CLFACT;
        _consultaCON007_SER613();
    }
}

function _consultaCON007_SER613() {
    SER613.SECUNUM = SER613.SECU1NUM + SER613.SECU2NUM;
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + SER613.SECUNUM }, URL)
        .then(data => {
            var data = data.split("|");
            SER613['ULTFECHANUM'] = data[2].trim();
            SER613['NUMEROCTL'] = data[1].substring(3, 9);
            SER613.NROW = parseInt(SER613.NUMEROCTL) - 1;
            console.log(SER613.NROW, 'comprobante')
            $('#comprobante_SER613').val(SER613.NROW);
            _evaluarcomprobante_SER613();
        })
        .catch(err => {
            console.debug(err);
        })
}

function _evaluarcomprobante_SER613() {
    console.log('_evaluarcomprobante_SER613')
    validarInputs({
        form: "#COMPR_613",
        orden: '1'
    },
        () => { _evaluartiposervicio_SER613(); },
        () => {
            SER613.NROW = cerosIzq($('#comprobante_SER613').val(), 6)
            $('#comprobante_SER613').val(SER613.NROW)
            console.log(SER613.NROW, 'SER613.NROW')
            // if (SER613.NROW.trim() == '') {
            //     CON851('01', '01', null, 'error', 'error');
            //     _evaluarcomprobante_SER613()
            // } else {
            var llave_envio = SER613.SUCFACT
            llave_envio += SER613.CLFACT
            llave_envio += SER613.NROW

            var datos_envio = datosEnvio()
            datos_envio += llave_envio
            datos_envio += '|'

            let URL = get_url("APP/SALUD/SAL44A.DLL");
            postData({
                datosh: datos_envio
            }, URL)
                .then((data) => {
                    console.log(data)
                    $("#TABLA_613 tbody").empty();
                    mostrarDatosCompletos_SER613(data)
                })
                .catch(error => {
                    console.error(error)
                    _evaluarcomprobante_SER613()
                });
            // }
        })
}



function mostrarDatosCompletos_SER613(data) {
    SER613.FACTURA = data.FACTURA[0];
    console.log(SER613.FACTURA, 'SER613.FACTURA')
    // SER613 = datos
    // $('#comprobante_SER613').val(SER613.NRO)
    // $('#claseservicio_SER613').val(SER613.CLASE)
    // var clase = SER613.CLASE.split('')
    // SER613.CLASE = clase[0]
    // $('#comprobante_SER613').val(SER613.NRO)
    $('#fecha_SER613').val(SER613.FACTURA.FECHA)
    $('#factura_SER613').val(SER613.FACTURA.PREFIJO)
    $('#facturad_SER613').val(SER613.FACTURA.NRO_CTA)
    $('#pingreso_SER613').val(SER613.FACTURA.PUERTA_ESTAD + '- ' + SER613.FACTURA.DESCRIP_PUERTA)
    $('#cliente_SER613').val(SER613.FACTURA.NIT_TER)
    $('#cliented_SER613').val(SER613.FACTURA.DESCRIP_TER)
    $('#paciente_SER613').val(SER613.FACTURA.ID_PACIENTE)
    $('#paciented_SER613').val(SER613.FACTURA.DESCRIP_PACI)
    $('#sexo_SER613').val(SER613.FACTURA.SEXO)
    $('#edad_SER613').val(SER613.FACTURA.EDAD)
    $('#espec_SER613').val(SER613.FACTURA.ESPEC)
    $('#despec_SER613').val(SER613.FACTURA.DESCRIP_ESPEC)
    $('#operElab_SER613').val(SER613.FACTURA.OPER_ELAB)
    $('#fechaElab_SER613').val(SER613.FACTURA.FECHA_ELAB)
    if (SER613.FACTURA.OPER_CORREC.trim().length > 0) {
        $('#operCorrec_SER613').val(SER613.FACTURA.OPER_CORREC)
        $('#fechaCorrec_SER613').val(SER613.FACTURA.FECHA_CORREC)
    }
    $('#secuCopago_SER613').val(SER613.FACTURA.SECU_ABON)
    if (SER613.FACTURA.CLASE == '1') {
        var prof = ['CIRUJANO', 'AYUDANTIA', 'ANESTESIOA', 'MAT.QUIRG', 'DERECH.SALA'];
        for (var i in prof) {
            $('#TABLA_613 tbody').append(
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
        for (var i in SER613.FACTURA.TABLA) {
            if (SER613.FACTURA.TABLA[i].ARTICULO.trim().length > 0) {
                $('#TABLA_613 tbody').append(''
                    + '<tr>'
                    + '   <td>' + SER613.FACTURA.TABLA[i].POSICION + '</td>'
                    + '   <td>' + SER613.FACTURA.TABLA[i].ARTICULO + '</td>'
                    + '   <td>' + SER613.FACTURA.TABLA[i].DESCRIP_ART + '</td>'
                    + '   <td>' + SER613.FACTURA.TABLA[i].ALMACEN + '</td>'
                    + '   <td>' + SER613.FACTURA.TABLA[i].CANTIDAD + '</td>'
                    + '   <td>' + SER613.FACTURA.TABLA[i].UNIDAD + '</td>'
                    + '   <td>' + SER613.FACTURA.TABLA[i].VALOR_UNIT + '</td>'
                    + '   <td>' + SER613.FACTURA.TABLA[i].VALOR_FACT + '</td>'
                    + '</tr>'
                )
            }
        }
    }

    $('#refactura_SER613').val(SER613.FACTURA.REFACTURA)
    $('#destino_SER613').val(SER613.FACTURA.DESTINO)
    $('#fechaAten_SER613').val(SER613.FACTURA.FECHA_ING)
    $('#vlrtot_SER613').val(SER613.FACTURA.VALOR_BRUTO)
    $('#valoriva_SER613').val(SER613.FACTURA.VALOR_IVA)
    $('#copagoestimfact_SER613').val(SER613.FACTURA.COPAGO_ESTIM_PAGO)
    $('#netofact_SER613').val(SER613.FACTURA.VALOR_TOTAL)
    $('#atend_SER613').val(SER613.FACTURA.MED_OTR_FACT);
    $('#datend_SER613').val(SER613.FACTURA.DESCRIP_MED1);
    $('#espec_SER613').val(SER613.FACTURA.ESPEC);
    $('#despec_SER613').val(SER613.FACTURA.DESCRIP_ESPEC);
    $('#ccostos_SER613').val(SER613.FACTURA.COSTO_FACT)
    $('#dccostos_SER613').val(SER613.FACTURA.NOMBRE_COSTO)
    $('#convenio_SER613').val(SER613.FACTURA.COD_TAR)
    $('#estrato_SER613').val(SER613.FACTURA.ESTRATO)
    $('#solic_SER613').val(SER613.FACTURA.REMITE_FACT);
    $('#dsolic_SER613').val(SER613.FACTURA.DESCRIP_MED2);
    $('#ciudad_SER613').val(SER613.FACTURA.CIUDAD_PACI)
    $('#detalle_SER613').val(SER613.FACTURA.DETALLE_FACT)
    $('#finalidad_SER613').val(SER613.FACTURA.FINALIDAD)
    $('#unidserv_SER613').val(SER613.FACTURA.UNIDAD_SERVICIO)
    $('#descripunidserv_SER613').val(SER613.FACTURA.DESCRIP_UNISERV)
    SER613.CTAFACT = SER613.FACTURA.PREFIJO + SER613.FACTURA.NRO_CTA;
    SER613.ANOFACT = SER613.FACTURA.FECHA.substring(0, 4);
    SER613.MESFACT = SER613.FACTURA.FECHA.substring(4, 6);
    SER613.DIAFACT = SER613.FACTURA.FECHA.substring(6, 8);
    SER613.ESTADONUM = SER613.FACTURA.ESTADO_NUM;
    if ((SER613.ANOFACT != $_ANOLNK) || (SER613.MESFACT != $_MESLNK)) {
        CON851('91', '91', null, 'error', 'error');
        _evaluarcomprobante_SER613();
    } else {
        if (SER613.ESTADONUM == '1') {
            CON851('', 'PACIENTE RETIRADO!', null, 'error', 'error');
            _evaluarcomprobante_SER613();
        } else if (SER613.ESTADONUM == '2') {
            CON851('', 'FACTURA ANULADA!', null, 'error', 'error');
            _evaluarcomprobante_SER613();

        } else if (SER613.ESTADONUM == '3') {
            CON851('', 'FACTURA BLOQUEADA!', null, 'error', 'error');
            _evaluarcomprobante_SER613();
        } else {
            setTimeout(_ventanatrasladolectura_SER613, 300)
        }
    }
}

function _ventanatrasladolectura_SER613() {
    var ventanacambio = bootbox.dialog({
        size: 'small',
        title: 'TRASLADAR LECTURA A OTRO COMPROBANTE',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +

            '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-5 col-sm-6 col-xs-6 control-label" for="name">' + "Comprobante Destino:" + '</label> ' +
            '<div class="col-md-7 col-sm-6 col-xs-6" id="COMPROB_SER613"> ' +
            '<input id="comprobante_613" class="form-control input-md" data-orden="1" maxlength="6"> ' +
            '</div> ' +
            '</div> ' +

            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanacambio.off('show.bs.modal');
                    _buscardestino_SER613(); 
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanacambio.off('show.bs.modal');
                    _evaluarcomprobante_SER613();
                }
            }
        }
    });
    ventanacambio.init($('.modal-footer').hide());
    ventanacambio.init(_datotipo_ser613());
    ventanacambio.on('shown.bs.modal', function () {
        $("#comprobante_613").focus();
    });
}

function _datotipo_ser613() {
    _inputControl("disabled");
    validarInputs({
        form: '#COMPROB_SER613',
        orden: "1"
    },
        () => { $('.btn-danger').click() },
        () => {
            SER613.CAMBIO = $('#comprobante_613').val();
            if (SER613.CAMBIO.trim() == '') {
                CON851('01', '01', null, 'error', 'error');
                _datotipo_ser613();
            } else {
                $('.btn-primary').click();
            }
        }
    )
}

function _buscardestino_SER613(){
    console.log('dll de graabar')
}

/////////////////////MASCARAS///////////////////////////
var claseservMask = IMask($('#claseservicio_SER613')[0], { mask: Number, min: 0, max: 7 });

/////////////////////////F8/////////////////////////////

function _ventanaclaseservicio_ser613(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE SERVICIO",
            columnas: ["COD", "DESCRIPCION"],
            data: SER613.SERVICIOS,
            callback_esc: function () {
                $("#claseservicio_SER613").focus();
            },
            callback: function (data) {
                claseservMask.typedValue = data.COD;
                _enterInput('#claseservicio_SER613');
            }
        });
    }
}

function _ventanapacientecomp_ser613(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        set_Event_validar('#COMPR_613', 'off')
        SER825(_evaluarcomprobante_SER613, mostrarDatosCompletos_SER613, '1')
    }
}