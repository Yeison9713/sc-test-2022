var global_SAL450B = []
var llave_SAL450B = {}
var numeracion_SAL450B = []
var claseServicio_SAL450B = []
var clienteMask = IMask($('#cliente_SAL450B')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });

$(document).ready(function () {
    nombreOpcion('9,4,9,2 - Cambio tipo a un comprob')
    _inputControl("reset");
    _inputControl("disabled");
    _toggleF8([
        { input: 'claseservicio', app: 'SAL450B', funct: _ventanaClases_SAL450B },
        { input: 'comprob', app: 'SAL450B', funct: _ventanaIdHistoria_SAL450B },
    ]);
    global_SAL450B['PREFIJOUSU'] = $_USUA_GLOBAL[0].PREFIJ;
    global_SAL450B['ADMIN_W'] = localStorage.getItem('Usuario').trim() ? localStorage.getItem('Usuario').trim() : false;
    global_SAL450B['NITUSU'] = $_USUA_GLOBAL[0].NIT.toString().padStart(10, '0');

    inicio_SAL450B()
})

function _ventanaClases_SAL450B(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'TIPO DE SERVICIO',
            columnas: ["codigo", "descripcion"],
            data: claseServicio_SAL450B,
            callback_esc: function () {
                $('#claseservicio_SAL450B').focus()
            },
            callback: function (data) {
                $('#claseservicio_SAL450B').val(data.codigo)
                _enterInput('#claseservicio_SAL450B');
            }
        });
    }
}

function _ventanaIdHistoria_SAL450B(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        set_Event_validar('#COMPR_SAL450B', 'off')
        $('#comprob_SAL450B').attr('disabled', 'true')
        SER825(nroComprob_SAL450B, (data) => {
            llegadaDatos_SAL450B(data)
        }, '1')
    }
}

function cerrarArchivos_SAL450B() {
    _inputControl("reset");
    _inputControl("disabled");
    $("#TABLA_SAL450B tbody").empty();
    claseServicio_SAL450B = []
    llave_SAL450B = []
    global_SAL450B = []
    numeracion_SAL450B = []
    _toggleNav()
}

function inicio_SAL450B() {
    claseServicio_SAL450B = [
        { "codigo": "1", "descripcion": "CIRUGIAS" },
        { "codigo": "2", "descripcion": "LAB. Y OTROS DIAG." },
        { "codigo": "3", "descripcion": "RX - IMAGENOLOGIA" },
        { "codigo": "4", "descripcion": "OTROS SERVICIOS" },
        { "codigo": "5", "descripcion": "CONSULTAS Y TERAPIAS" },
        { "codigo": "6", "descripcion": "PATOLOGIA" },
        { "codigo": "7", "descripcion": "PROMOCION Y PREVENCION" }
    ]

    llave_SAL450B = {
        'SUC_W': '',
        'CL': '',
        'NRO': '',
    }

    if (global_SAL450B.PREFIJOUSU == "  ") {
        global_SAL450B.PREFIJOUSU = "00";
    }

    var datos_envio_SAL450B = datosEnvio()
    datos_envio_SAL450B += global_SAL450B.ADMIN_W
    datos_envio_SAL450B += '|'

    let URL = get_url("app/CONTAB/CON003.DLL");

    postData({
        datosh: datos_envio_SAL450B
    }, URL)
        .then((data) => {
            loader("hide")
            var date = data.split('|');
            global_SAL450B['NOMBRE_OPER'] = date[0].trim();
            global_SAL450B['IDENT_OPER'] = date[1].trim();
            global_SAL450B['SUC_OPER'] = date[2].trim();
            datoSucursal_SAL450B()
        })
        .catch(error => {
            console.error(error)
            _toggleNav()
        });
}

function datoSucursal_SAL450B() {
    if ((global_SAL450B.ADMIN_W == "GEBC") || (global_SAL450B.ADMIN_W == "ADMI")) {
        llave_SAL450B.SUC_W = global_SAL450B.PREFIJOUSU
        $('#unidades_SAL450B').val(global_SAL450B.PREFIJOUSU)
        claseServ_SAL450B()
    }
    else {
        switch (global_SAL450B.NITUSU) {
            // ESE SALUD YOPAL
            case "0844003225":
                if ((global_SAL450B.SUC_OPER == "JL") || (global_SAL450B.SUC_OPER == "CA") || (global_SAL450B.SUC_OPER == "CS") || (global_SAL450B.SUC_OPER == "PV") || (global_SAL450B.SUC_OPER == "BC") || (global_SAL450B.SUC_OPER == "LC") || (global_SAL450B.SUC_OPER == "CV") || (global_SAL450B.SUC_OPER == "HT") || (global_SAL450B.SUC_OPER == "EM") || (global_SAL450B.SUC_OPER == "HY") || (global_SAL450B.SUC_OPER == "TL") || (global_SAL450B.SUC_OPER == "MR")) {
                    global_SAL450B.PREFIJOUSU = global_SAL450B.SUC_OPER
                }
                else {
                    CON851('48', '48', null, 'error', 'error');
                    cerrarArchivos_SAL450B()
                }
                break;
            // SERVIMEDICOS
            case "0800162035":
                if ((global_SAL450B.SUC_OPER == "01") || (global_SAL450B.SUC_OPER == "03") || (global_SAL450B.SUC_OPER == "05") || (global_SAL450B.SUC_OPER == "06") || (global_SAL450B.SUC_OPER == "07") || (global_SAL450B.SUC_OPER == "08") || (global_SAL450B.SUC_OPER == "10") || (global_SAL450B.SUC_OPER == "11") || (global_SAL450B.SUC_OPER == "12") || (global_SAL450B.SUC_OPER == "14") || (global_SAL450B.SUC_OPER == "15")) {
                    global_SAL450B.PREFIJOUSU = global_SAL450B.SUC_OPER
                }
                else {
                    CON851('48', '48', null, 'error', 'error');
                    cerrarArchivos_SAL450B()
                }
                break;
            // FAMEDIC
            case "0900405505":
                if ((global_SAL450B.SUC_OPER == "01") || (global_SAL450B.SUC_OPER == "02") || (global_SAL450B.SUC_OPER == "03") || (global_SAL450B.SUC_OPER == "04") || (global_SAL450B.SUC_OPER == "05") || (global_SAL450B.SUC_OPER == "06")) {
                    global_SAL450B.PREFIJOUSU = global_SAL450B.SUC_OPER
                }
                else {
                    CON851('48', '48', null, 'error', 'error');
                    cerrarArchivos_SAL450B()
                }
                break;
        }
        $('#unidades_SAL450B').val(global_SAL450B.PREFIJOUSU)
        llave_SAL450B.SUC_W = global_SAL450B.PREFIJOUSU
        claseServ_SAL450B();
    }
    
}

function sucursal_SAL450B() {
    validarInputs(
        {
            form: '#SU_SAL450B',
            orden: '1'
        },
        function () {
            cerrarArchivos_SAL450B();
        },
        function () {
            llave_SAL450B.SUC_W = $('#unidades_SAL450B').val()
            claseServ_SAL450B()
        }
    )
}

function claseServ_SAL450B() {
    validarInputs(
        {
            form: '#SERVICE_SAL450B',
            orden: '1',
            event_f5: sucursal_SAL450B
        },
        function () {
            cerrarArchivos_SAL450B();
        },
        function () {
            llave_SAL450B.CL = $('#claseservicio_SAL450B').val()
            llave_SAL450B.CL = llave_SAL450B.CL.split('')
            llave_SAL450B.CL = llave_SAL450B.CL[0]

            if ((llave_SAL450B.CL == 0) && ($_USUA_GLOBAL[0]['SEG-MOV'] == "3")) {
                CON851B($_USUA_GLOBAL[0]['SEG-MOV'])
                sucursal_SAL450B()
            } else {
                var Servicio = claseServicio_SAL450B.find(servicio => servicio.codigo == llave_SAL450B.CL)

                if (Servicio) {
                    $('#claseservicio_SAL450B').val(Servicio.codigo + ' - ' + Servicio.descripcion)
                    nroComprob_SAL450B()
                } else {
                    CON851('01', '01', null, 'error', 'error');
                    claseServ_SAL450B()
                }
            }
        }
    )
}

function nroComprob_SAL450B() {
    validarInputs(
        {
            form: '#COMPR_SAL450B',
            orden: '1'
        }, function () {
            claseServ_SAL450B()
        },
        function () {
            loader('show')
            llave_SAL450B.NRO = cerosIzq($('#comprob_SAL450B').val(), 6)
            $('#comprob_SAL450B').val(llave_SAL450B.NRO)

            var llave_envio = llave_SAL450B.SUC_W
            llave_envio += llave_SAL450B.CL
            llave_envio += llave_SAL450B.NRO
            console.log(llave_envio)
            var datos_envio = datosEnvio()
            datos_envio += llave_envio
            datos_envio += '|'

            let URL = get_url("APP/SALUD/SAL450A.DLL");

            postData({
                datosh: datos_envio
            }, URL)
                .then((data) => {
                    llegadaDatos_SAL450B(data)
                })
                .catch(error => {
                    console.error(error)
                    loader('hide')
                    nroComprob_SAL450B()
                });
        }
    )
}

function llegadaDatos_SAL450B(data) {
    global_SAL450B = []
    $("#TABLA_SAL450B tbody").empty();
    global_SAL450B = data.FACTURA[0]
    global_SAL450B.TABLA.pop()

    llave_SAL450B.SUC_W = global_SAL450B.SUC
    llave_SAL450B.CL = global_SAL450B.CLASE.split('')[0]
    llave_SAL450B.NRO = global_SAL450B.NRO
    global_SAL450B['ADMIN_W'] = localStorage.getItem('Usuario').trim()
    global_SAL450B['FACTOR_W'] = ''
    loader('hide')
    mostrarDatosCompletos_SAL450B()
}

function mostrarDatosCompletos_SAL450B() {
    if (((global_SAL450B.PREFIJO == 'P') || (global_SAL450B.PREFIJO == 'T')) && (global_SAL450B.CLASE == "1")) {
        CON851('78', '78', null, 'error', 'error');
        claseServicio_SAL450B()
    } else {
        global_SAL450B["CUENTA_W"] = global_SAL450B.PREFIJO + global_SAL450B.NRO_CTA
        global_SAL450B["EMBAR_W"] = global_SAL450B.EMBAR
        console.log(global_SAL450B)

        $('#comprob_SAL450B').val(global_SAL450B.NRO)
        $('#claseservicio_SAL450B').val(global_SAL450B.CLASE)
        var clase = global_SAL450B.CLASE.split('')
        global_SAL450B.CLASE = clase[0]
        $('#comprob_SAL450B').val(global_SAL450B.NRO)
        var masked = IMask.createMask({ mask: Date, pattern: 'Y/`m/`dd' });
        $('#fecha_SAL450B').val(masked.resolve(global_SAL450B.FECHA.toString()))
        $('#factura_SAL450B').val(global_SAL450B.PREFIJO)
        $('#facturad_SAL450B').val(global_SAL450B.NRO_CTA)
        $('#pingreso_SAL450B').val(global_SAL450B.PUERTA_ESTAD + '.- ' + global_SAL450B.DESCRIP_PUERTA)
        clienteMask.typedValue = global_SAL450B.NIT
        $('#cliented_SAL450B').val(global_SAL450B.DESCRIP_TER)
        $('#paciente_SAL450B').val(global_SAL450B.ID_PACIENTE)
        $('#paciented_SAL450B').val(global_SAL450B.DESCRIP_PACI)
        $('#sexo_SAL450B').val(global_SAL450B.SEXO)
        $('#edad_SAL450B').val(global_SAL450B.EDAD)
        $('#estrato_SAL450B').val(global_SAL450B.ESTRATO)
        $('#espec_SAL450B').val(global_SAL450B.ESPEC)
        $('#despec_SAL450B').val(global_SAL450B.DESCRIP_ESPEC)
        $('#operElab_SAL450B').val(global_SAL450B.OPER_ELAB)
        if (global_SAL450B.OPER_CORREC.trim().length > 0) {
            $('#operCorrec_SAL450B').val(global_SAL450B.OPER_CORREC + '-' + global_SAL450B.FECHA_CORREC)
        }
        $('#secuCopago_SAL450B').val(global_SAL450B.SECU_ABON)

        if (global_SAL450B.CLASE == '1') {
            var prof = ['CIRUJANO', 'AYUDANTIA', 'ANESTESIOA', 'MAT.QUIRG', 'DERECH.SALA'];
            for (var i in prof) {
                $('#TABLA_SAL450B tbody').append(
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
            for (var i in global_SAL450B.TABLA) {
                if (global_SAL450B.TABLA[i].ARTICULO.trim().length > 0) {
                    $('#TABLA_SAL450B tbody').append(''
                        + '<tr>'
                        + '   <td>' + global_SAL450B.TABLA[i].POSICION + '</td>'
                        + '   <td>' + global_SAL450B.TABLA[i].ARTICULO + '</td>'
                        + '   <td>' + global_SAL450B.TABLA[i].DESCRIP_ART + '</td>'
                        + '   <td>' + global_SAL450B.TABLA[i].ALMACEN + '</td>'
                        + '   <td>' + global_SAL450B.TABLA[i].CANTIDAD + '</td>'
                        + '   <td>' + global_SAL450B.TABLA[i].UNIDAD + '</td>'
                        + '   <td>' + global_SAL450B.TABLA[i].VALOR_UNIT + '</td>'
                        + '   <td>' + global_SAL450B.TABLA[i].VALOR_FACT + '</td>'
                        + '</tr>'
                    )
                }
            }
        }
       
        $('#vlrtot_SAL450B').val(global_SAL450B.VALOR_BRUTO)
        $('#valoriva_SAL450B').val(global_SAL450B.VALOR_IVA)
        $('#copagoestimfact_SAL450B').val(global_SAL450B.COPAGO_ESTIM_PAGO)
        $('#netofact_SAL450B').val(global_SAL450B.VALOR_TOTAL)

        var fecha_num = $_USUA_GLOBAL[0].FECHALNK
        fecha_num = fecha_num.split('')
        var ano_num = fecha_num[0] + fecha_num[1]
        var mes_num = fecha_num[2] + fecha_num[3]

        var fecha_fact = global_SAL450B.FECHA
        fecha_fact = fecha_fact.split('')
        var ano_fact = fecha_fact[2] + fecha_fact[3]
        var mes_fact = fecha_fact[4] + fecha_fact[5]

        if ((ano_num != ano_fact) || (mes_num != mes_fact)) {
            CON851('91', '91', null, 'error', 'error');
            nroComprob_SAL450B()
        } else {
            leer_anterior_SAL450B()
        }
    }
}

function leer_anterior_SAL450B() {
    var cta = global_SAL450B.PREFIJO + global_SAL450B.NRO_CTA

    var datos_envio_SAL450B = datosEnvio()
    datos_envio_SAL450B += cta
    datos_envio_SAL450B += '|'
    datos_envio_SAL450B += "B"
    datos_envio_SAL450B += '|'

    let URL = get_url("APP/SALUD/SAL450A-02.DLL");

    postData({
        datosh: datos_envio_SAL450B
    }, URL)
        .then((data) => {
            loader("hide")
            numeracion_SAL450B = data.NUMERACION[0]

            console.log(numeracion_SAL450B)
            leer_anterior_2_SAL450B()
        })
        .catch(error => {
            console.error(error)
            nroComprob_SAL450B()
        });
}


function leer_anterior_2_SAL450B() {
    if (numeracion_SAL450B.ESTADO == '1') {
        CON851('13', 'PACIENTE RETIRADO', null, 'error', 'error')
        nroComprob_SAL450B()
    } else if (numeracion_SAL450B.ESTADO == '2') {
        CON851('13', 'FACTURA ANULADA', null, 'error', 'error')
        nroComprob_SAL450B()
    } else if ((numeracion_SAL450B.ESTADO == '3') && (global_SAL450B.ADMIN_W != numeracion_SAL450B.OPER_BLOQUEO)) {
        CON851('13', 'FACTURA BLOQUEADA', null, 'error', 'error')
        nroComprob_SAL450B()
    } else {
        popUpcambioClase_SAL450B()
    }
}

function popUpcambioClase_SAL450B() {
    // set_Event_validar('#COMPR_SAL450B', 'off')
    // $('#comprob_SAL450B').attr('disabled', 'true')
    var fuente = '<div id="cambioClase_SAL450B">' +
        '<div class="col-md-12">' +
        '<div class="portlet light no-padding">' +
        '<div class="portlet-body no-padding">' +
        '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +
        '<div class="col-md-12 col-sm-12 col-xs-12" id="cambioClase_SAL450B" style="display: flex;justify-content: center">' +
        '<div class="col-md-8">' +
        '<div class="input-group col-md-12 col-sm-12 col-xs-12">' +
        '<label">Nueva clase:</label>' +
        '<input type="text" id="inputClase_SAL450B" class="form-control col-md-6 col-sm-6 col-xs-6" maxlength="1" data-orden="1" required="true" disabled="disabled">' +
        '</div>' +
        '<div class="input-group col-md-12 col-sm-12 col-xs-12">' +
        '<label">Embarazo:</label>' +
        '<input type="text" id="inputEmbarazo_SAL450B" class="form-control col-md-6 col-sm-6 col-xs-6" maxlength="1" disabled="disabled">' +
        '</div>' +
        '<div class="input-group col-md-12 col-sm-12 col-xs-12">' +
        '<label">Finalidad:</label>' +
        '<input type="text" id="inputFinalidad_SAL450B" class="form-control col-md-6 col-sm-6 col-xs-6" maxlength="1" disabled="disabled">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div style="clear:both;"></div>' +
        '</div>'
    var dialogo = bootbox.dialog({
        title: "Cambiar la clase de comprobante:",
        message: fuente,
        closeButton: false,
        buttons: {
            main: {
                label: "Aceptar",
                className: "blue hidden",
                callback: function () {

                }
            }
        },
    });
    dialogo.on('shown.bs.modal', function (e) {
        $('.modal-content').css({ 'width': '600px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })
        cambioClase_SAL450B()
    });
}

function _ventanaClasesPopUp_SAL450B(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'TIPO DE SERVICIO',
            columnas: ["codigo", "descripcion"],
            data: claseServicio_SAL450B,
            callback_esc: function () {
                $('#inputClase_SAL450B').focus()
            },
            callback: function (data) {
                $('#inputClase_SAL450B').val(data.codigo)
                _enterInput('#inputClase_SAL450B');
            }
        });
    }
}

function cambioClase_SAL450B() {
    _toggleF8([{ input: 'inputClase', app: 'SAL450B', _ventanaClasesPopUp_SAL450B },])

    validarInputs(
        {
            form: "#cambioClase_SAL450B",
            orden: '1'
        },
        function () {
            $('#inputClase_SAL450B').val('')
            $('[data-bb-handler="main"]').click();
            nroComprob_SAL450B()
        },
        function () {
            global_SAL450B.CLASE = $('#inputClase_SAL450B').val().split('')[0]

            var Servicio = claseServicio_SAL450B.find(servicio => servicio.codigo == global_SAL450B.CLASE)

            if (Servicio) {
                $('#inputClase_SAL450B').val(Servicio.codigo + ' - ' + Servicio.descripcion)

                if (global_SAL450B.CLASE == llave_SAL450B.CL) {
                    finalizarSAL450B()
                } else {

                    if (llave_SAL450B.CL != '7' && global_SAL450B.CLASE != '7' && global_SAL450B.NITUSU != '0800162035') {
                        CON851('14', '14', null, 'error', 'error');
                        cambioClase_SAL450B()

                    } else {
                        if (global_SAL450B.CLASE != '7') {
                            global_SAL450B.FINALID = '10'
                            grabarCambio_SAL450B()
                        } else {
                            dato_condicion_SAL450B()
                        }

                    }
                }
            } else {
                CON851('01', '01', null, 'error', 'error');
                cambioClase_SAL450B()
            }
        }

    )
}

function dato_condicion_SAL450B() {
    var unidad = global_SAL450B.EDAD.split('')[0]
    var edad = global_SAL450B.EDAD.slice(1)

    if (global_SAL450B.SEXO == 'M' || global_SAL450B.CLASE == '0') {
        global_SAL450B.EMBAR = '0'
        $('#inputEmbarazo_SAL450B').val('No aplica')
        llamarSer834A_SAL450B()
    } else {
        
        if ((unidad == 'D' || unidad == 'M') || (unidad == 'A' && parseInt(edad) < 12)) {
            global_SAL450B.EMBAR = '4'
            $('#inputClase_SAL450B').val('No esta embarazada')
            llamarSer834A_SAL450B()
        } else {
            var estados = [
                { 'codigo': '1', 'descripcion': 'Embarazo primer trimestre' },
                { 'codigo': '2', 'descripcion': 'Embarazo segundo trimestre' },
                { 'codigo': '3', 'descripcion': 'Embarazo tercer trimestre' },
                { 'codigo': '4', 'descripcion': 'No esta embarazada' },
            ]
            POPUP({
                titulo: "Estado de embarazo",
                indices: [
                    { id: 'codigo', label: 'descripcion' }
                ],
                array: estados,
                callback_f: cambioClase_SAL450B,
                seleccion: global_SAL450B.EMBAR
            }, function (data) {
                global_SAL450B.EMBAR = data.codigo
                $('#inputEmbarazo_SAL450B').val(data.descripcion)
                setTimeout(() => llamarSer834A_SAL450B(),500)
                // SER834A({ 'EDAD': global_SAL450B.EDAD, 'SEXOPACI': global_SAL450B.SEXO, 'seleccion': global_SAL450B.FINALID }, cambioClase_SAL450B, validarPopup_SAL450B)
            })
        }
    }
}

function llamarSer834A_SAL450B(){
    console.log('llego a llamar')
    SER834A({ 'EDAD': global_SAL450B.EDAD, 'SEXOPACI': global_SAL450B.SEXO, 'seleccion': global_SAL450B.FINALID }, cambioClase_SAL450B, validarPopup_SAL450B)
}

function validarPopup_SAL450B(data) {
    global_SAL450B.FINALID = data.COD

    if (global_SAL450B.FINALID == '10' && llave_SAL450B.CL == "7") {

        CON851('03', '03', null, 'error', 'error');
        cambioClase_SAL450B()

    } else {
        $('#inputFinalidad_SAL450B').val(data.DESCRIP)

        if (global_SAL450B.FINALID == '10') {
            if (global_SAL450B.NITUSU == '0845000038' || global_SAL450B.NITUSU == '900405505') CON851('4K', '4K', null, 'error', 'error');
        }

        if (global_SAL450B.FINALID == '06') {
            if (global_SAL450B.EMBAR_W == '0' || global_SAL450B.EMBAR_W == '4') {
                CON851('83', '83', null, 'error', 'error');
                cambioClase_SAL450B()
            } else {
                grabarCambio_SAL450B()
            }
        } else {
            grabarCambio_SAL450B()
        }
    }
}

function grabarCambio_SAL450B() {
    loader("show")
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + '8' + global_SAL450B.CLASE + '|' }, URL)
        .then(data => {
            var datos = data.split('|')
            console.log(datos)
            console.debug(datos[1]);
            console.debug(datos[1].slice(3));
            global_SAL450B.NRO = cerosIzq(datos[1].slice(3), 6)
            grabarCambio_SAL450B_2()
        })
        .catch(err => {
            console.debug(err);
        })
}
function grabarCambio_SAL450B_2() {
    let llave_anterior = llave_SAL450B.SUC_W + llave_SAL450B.CL + llave_SAL450B.NRO
    let llave_nueva = global_SAL450B.SUC + global_SAL450B.CLASE + global_SAL450B.NRO

    var datos_envio = datosEnvio()
    datos_envio += llave_anterior
    datos_envio += '|'
    datos_envio += llave_nueva
    datos_envio += '|'
    datos_envio += global_SAL450B.ADMIN_W
    datos_envio += '|'
    datos_envio += moment().format("YYYYMMDD")
    datos_envio += '|'
    datos_envio += global_SAL450B.FINALID
    datos_envio += '|'
    datos_envio += global_SAL450B.EMBAR
    datos_envio += '|'

    console.log(datos_envio)
    let URL = get_url("app/SALUD/SAL450B.DLL");

    // console.log(data)
    postData({
        datosh: datos_envio
    }, URL)
        .then((data) => {
            console.log(data)
            llamadoCON007X_SAL450B()
        })
        .catch(error => {
            console.error(error)
            loader("hide")
            _toggleNav()
        });
}

function llamadoCON007X_SAL450B() {
    var URL = get_url("app/CONTAB/CON007X.DLL");

    var datos_envio_007X = datosEnvio()
    datos_envio_007X += '8' + global_SAL450B.CLASE
    datos_envio_007X += '|'
    datos_envio_007X += global_SAL450B.NRO
    datos_envio_007X += '|'
    datos_envio_007X += global_SAL450B.FECHA
    datos_envio_007X += '|'

    console.log(datos_envio_007X)
    postData({
        datosh: datos_envio_007X
    }, URL)
        .then((data) => {
            console.log(data)
            $('[data-bb-handler="main"]').click();
            CON851('', 'Proceso Terminado!', null, 'success', '');
            finalizarSAL450B()
        })
        .catch(error => {
            console.error(error)
            loader("hide")
        });
}

function finalizarSAL450B() {
    console.log('va a reiniciar')
    _inputControl("reset");
    _inputControl("disabled");
    $("#TABLA_SAL450B tbody").empty();
    claseServicio_SAL450B = []
    global_SAL450B = []
    numeracion_SAL450B = []
    global_SAL450B['PREFIJOUSU'] = $_USUA_GLOBAL[0].PREFIJ;
    global_SAL450B['ADMIN_W'] = localStorage.getItem('Usuario').trim() ? localStorage.getItem('Usuario').trim() : false;
    global_SAL450B['NITUSU'] = $_USUA_GLOBAL[0].NIT.toString().padStart(10, '0');
    inicio_SAL450B()
}