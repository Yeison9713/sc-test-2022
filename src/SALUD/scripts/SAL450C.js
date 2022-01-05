var global_SAL450C = []
var llave_SAL450C = {}
var numeracion_SAL450C = []
var claseServicio_SAL450C = []
var prefijos_fact_SAL450C = []
var terceros_SAL450C = []
var $FECHA_FACT_SAL450C
var unidServ_SAL450C = []

var clienteMask = IMask($('#cliente_SAL450C')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });
var idpacienteMask = IMask($('#paciente_SAL450C')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });
var momentFormat = 'YYYY/MM/DD'
var momentMaskFechaFact = new IMask($("#fecha_SAL450C")[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(2009, 0, 1, 0, 0),
    max: new Date(2080, 0, 1, 0, 0),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY/MM/DD');
        console.log(fecha)
        if (fecha == "Invalid date") {
            CON851('01', '01', null, 'error', 'error');
        }
        else {
            $FECHA_FACT_SAL450C = str;
            return moment(str, momentFormat);
        }
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 2009,
            to: 2080
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
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }

})

$(document).ready(function () {
    nombreOpcion('9,4,9,3 -Correccion comprob. prest. servicios')
    _inputControl("reset");
    _inputControl("disabled");
    _toggleF8([
        { input: 'claseservicio', app: 'SAL450C', funct: _ventanaClases_SAL450C },
        { input: 'comprob', app: 'SAL450C', funct: _ventanaIdHistoria_SAL450C },
        { input: 'factura', app: 'SAL450C', funct: _ventanaFormapago_SAL450C },
        { input: 'facturad', app: 'SAL450C', funct: _ventanaFacturas_SAL450C },
        { input: 'cliente', app: 'SAL450C', funct: _ventanaTerceros_SAL450C },
        { input: 'paciente', app: 'SAL450C', funct: _ventanaPacientes_SAL450C }
    ]);
    global_SAL450C['PREFIJOUSU'] = $_USUA_GLOBAL[0].PREFIJ;
    global_SAL450C['ADMIN_W'] = localStorage.getItem('Usuario').trim() ? localStorage.getItem('Usuario').trim() : false;
    global_SAL450C['NITUSU'] = $_USUA_GLOBAL[0].NIT.toString().padStart(10, '0');
    _claveOtrosProcesos('Correccion comprob. prest. servicios', inicio_SAL450C, _toggleNav)
})

function _ventanaPacientes_SAL450C(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'PACIENTES',
            valoresselect: ['Nombre'],
            f8data: 'PACIENTES',
            columnas: [{
                title: 'COD'
            }, {
                title: 'NOMBRE'
            }, {
                title: 'EPS'
            }, {
                title: 'EDAD'
            }],
            callback: data => {
                console.debug(data);
                $('#paciente_SAL450C').val(data.COD)
                _enterInput('#paciente_SAL450C')
            },
            cancel: () => {
                $('#paciente_SAL450C').focus()
            }
        };
        F8LITE(parametros);
    }
}

function _ventanaFacturas_SAL450C(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'NUMERACION',
            valoresselect: ['Nombre del tercero', 'buscar paciente'],
            f8data: 'NUMERACION',
            columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
            ancho: '50%',
            filtro: global_SAL450C.PREFIJO,
            callback: (data) => {
                console.log(data)
                $('#facturad_SAL450C').val(data.COD.slice(1))
                _enterInput('#facturad_SAL450C')
            },
            cancel: () => {
                $('#facturad_SAL450C').focus()
            }
        };
        F8LITE(parametros);
    }
}

function _ventanaFormapago_SAL450C(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE PAGO",
            columnas: ["CODIGO", "DESCRIPCION"],
            data: [
                { 'CODIGO': 'E', 'DESCRIPCION': 'EFECTIVO' },
                { 'CODIGO': 'C', 'DESCRIPCION': 'CREDITO' },
                { 'CODIGO': 'P', 'DESCRIPCION': 'PENSIONADO' },
                { 'CODIGO': 'A', 'DESCRIPCION': 'AMBULATORIO' },
                { 'CODIGO': 'T', 'DESCRIPCION': 'ACC.TRANS.' }
            ],
            callback_esc: function () {
                $("#factura_SAL450C").focus();
            },
            callback: function (data) {
                $('#factura_SAL450C').val(data.CODIGO.trim());
                _enterInput('#factura_SAL450C');
            }
        });
    }
}

function _ventanaClases_SAL450C(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'TIPO DE SERVICIO',
            columnas: ["codigo", "descripcion"],
            data: claseServicio_SAL450C,
            callback_esc: function () {
                $('#claseservicio_SAL450C').focus()
            },
            callback: function (data) {
                $('#claseservicio_SAL450C').val(data.codigo)
                _enterInput('#claseservicio_SAL450C');
            }
        });
    }
}

function _ventanaIdHistoria_SAL450C(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        set_Event_validar('#COMPR_SAL450C', 'off')
        $('#comprob_SAL450C').attr('disabled', 'true')
        SER825(nroComprob_SAL450C, (data) => {
            llegadaDatos_SAL450C(data)
        }, '1')
    }
}

function _ventanaTerceros_SAL450C(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE TERCEROS',
            columnas: ["COD", "NOMBRE", "TELEF", "CIUDAD", "ACT"],
            data: terceros_SAL450C,
            ancho: '90%',
            callback_esc: function () {
                $('#cliente_SAL450C').focus()
            },
            callback: function (data) {
                console.log(data)
                clienteMask.typedValue = data.COD
                console.log(clienteMask.unmaskedValue)
                _enterInput('#cliente_SAL450C');
            }
        });
    }
}

function cerrarArchivos_SAL450C() {
    _inputControl("reset");
    _inputControl("disabled");
    $("#TABLA_SAL450C tbody").empty();
    claseServicio_SAL450C = []
    llave_SAL450C = []
    global_SAL450C = []
    numeracion_SAL450C = []
    prefijos_fact_SAL450C = []
    terceros_SAL450C = []
    unidServ_SAL450C = []
    _toggleNav()
}

function inicio_SAL450C() {
    obtenerDatosCompletos({ nombreFd: 'TERCEROS' }, data => {
        terceros_SAL450C = data.TERCEROS;
        terceros_SAL450C.pop();
        console.log(terceros_SAL450C)
        inicio_SAL450C_2()
    }, 'ONLY')
}

function inicio_SAL450C_2() {
    $('#viaDeAcceso_SAL450C').hide()
    claseServicio_SAL450C = [
        { "codigo": "1", "descripcion": "CIRUGIAS" },
        { "codigo": "2", "descripcion": "LAB. Y OTROS DIAG." },
        { "codigo": "3", "descripcion": "RX - IMAGENOLOGIA" },
        { "codigo": "4", "descripcion": "OTROS SERVICIOS" },
        { "codigo": "5", "descripcion": "CONSULTAS Y TERAPIAS" },
        { "codigo": "6", "descripcion": "PATOLOGIA" },
        { "codigo": "7", "descripcion": "PROMOCION Y PREVENCION" }
    ]

    prefijos_fact_SAL450C = ['A', 'P', 'T', 'B', "D", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "Q", "R", "S", "V", "W", "X", "Y", "Z"]

    llave_SAL450C = {
        'SUC_W': '',
        'CL': '',
        'NRO': '',
    }

    if (global_SAL450C.PREFIJOUSU == "  ") {
        global_SAL450C.PREFIJOUSU = "00";
    }

    if (($_USUA_GLOBAL[0].PUC_USU == '4' || $_USUA_GLOBAL[0].PUC_USU == '6') && ($_USUA_GLOBAL[0].CONTADO == 'S')) $_USUA_GLOBAL[0].CONTADO = 'N'


    if ($_USUA_GLOBAL[0]['SEG-MOV'] == '0' || $_USUA_GLOBAL[0]['SEG-MOV'] == '5') {
        var datos_envio_SAL450C = datosEnvio()
        datos_envio_SAL450C += global_SAL450C.ADMIN_W
        datos_envio_SAL450C += '|'

        let URL = get_url("app/CONTAB/CON003.DLL");

        postData({
            datosh: datos_envio_SAL450C
        }, URL)
            .then((data) => {
                loader("hide")
                var date = data.split('|');
                global_SAL450C['NOMBRE_OPER'] = date[0].trim();
                global_SAL450C['IDENT_OPER'] = date[1].trim();
                global_SAL450C['SUC_OPER'] = date[2].trim();
                datoSucursal_SAL450C()
            })
            .catch(error => {
                console.error(error)
                _toggleNav()
            });
    } else {
        console.log('se cerro por ser el SEG-MOV diferente a 0 o 5')
        cerrarArchivos_SAL450C()
    }
}

function datoSucursal_SAL450C() {
    switch (global_SAL450C.NITUSU) {
        // ESE SALUD YOPAL
        case "0844003225":
            if ((global_SAL450C.SUC_OPER == "JL") || (global_SAL450C.SUC_OPER == "CA") || (global_SAL450C.SUC_OPER == "CS") || (global_SAL450C.SUC_OPER == "PV") || (global_SAL450C.SUC_OPER == "BC") || (global_SAL450C.SUC_OPER == "LC") || (global_SAL450C.SUC_OPER == "CV") || (global_SAL450C.SUC_OPER == "HT") || (global_SAL450C.SUC_OPER == "EM") || (global_SAL450C.SUC_OPER == "HY") || (global_SAL450C.SUC_OPER == "TL") || (global_SAL450C.SUC_OPER == "MR")) {
                global_SAL450C.PREFIJOUSU = global_SAL450C.SUC_OPER
            }
            break;
        // SERVIMEDICOS
        case "0800162035":
            if ((global_SAL450C.SUC_OPER == "01") || (global_SAL450C.SUC_OPER == "03") || (global_SAL450C.SUC_OPER == "05") || (global_SAL450C.SUC_OPER == "06") || (global_SAL450C.SUC_OPER == "07") || (global_SAL450C.SUC_OPER == "08") || (global_SAL450C.SUC_OPER == "10") || (global_SAL450C.SUC_OPER == "11") || (global_SAL450C.SUC_OPER == "12") || (global_SAL450C.SUC_OPER == "14") || (global_SAL450C.SUC_OPER == "15")) {
                global_SAL450C.PREFIJOUSU = global_SAL450C.SUC_OPER
            }
            break;
        // FAMEDIC
        case "0900405505":
            if ((global_SAL450C.SUC_OPER == "01") || (global_SAL450C.SUC_OPER == "02") || (global_SAL450C.SUC_OPER == "03") || (global_SAL450C.SUC_OPER == "04") || (global_SAL450C.SUC_OPER == "05") || (global_SAL450C.SUC_OPER == "06")) {
                global_SAL450C.PREFIJOUSU = global_SAL450C.SUC_OPER
            }
            break;
        // IMAGENES DIAGNOSTICAS VCIO
        case "0800156469":
            if ((global_SAL450C.SUC_OPER == "00") || (global_SAL450C.SUC_OPER == "01") || (global_SAL450C.SUC_OPER == "02") || (global_SAL450C.SUC_OPER == "03")) {
                global_SAL450C.PREFIJOUSU = global_SAL450C.SUC_OPER
            }
            break;
    }

    $('#unidades_SAL450C').val(global_SAL450C.PREFIJOUSU)
    llave_SAL450C.SUC_W = global_SAL450C.PREFIJOUSU
    claseServ_SAL450C();
}

function sucursal_SAL450C() {
    validarInputs(
        {
            form: '#SU_SAL450C',
            orden: '1'
        },
        function () {
            cerrarArchivos_SAL450C();
        },
        function () {
            llave_SAL450C.SUC_W = $('#unidades_SAL450C').val()
            claseServ_SAL450C()
        }
    )
}

function claseServ_SAL450C() {
    validarInputs(
        {
            form: '#SERVICE_SAL450C',
            orden: '1',
            event_f5: sucursal_SAL450C
        },
        function () {
            cerrarArchivos_SAL450C();
        },
        function () {
            llave_SAL450C.CL = $('#claseservicio_SAL450C').val()
            llave_SAL450C.CL = llave_SAL450C.CL.split('')
            llave_SAL450C.CL = llave_SAL450C.CL[0]

            if ((llave_SAL450C.CL == 0) && ($_USUA_GLOBAL[0]['SEG-MOV'] == "3")) {
                CON851B($_USUA_GLOBAL[0]['SEG-MOV'])
                sucursal_SAL450C()
            } else {
                var Servicio = claseServicio_SAL450C.find(servicio => servicio.codigo == llave_SAL450C.CL)
                if (Servicio) {
                    $('#claseservicio_SAL450C').val(Servicio.codigo + ' - ' + Servicio.descripcion)
                    revisar_permiso_SAL450C()
                } else {
                    CON851('01', '01', null, 'error', 'error');
                    claseServ_SAL450C()
                }
            }
        }
    )
}

function revisar_permiso_SAL450C() {
    loader('show')
    postData({ datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|${'I4F' + llave_SAL450C.CL.toString()}|` },
        get_url("APP/CONTAB/CON904.DLL"))
        .then(data => {
            nroComprob_SAL450C()
        })
        .catch(err => {
            console.error(err);
            claseServ_SAL450C
        });
}

function nroComprob_SAL450C() {
    loader('hide')
    global_SAL450C['BLOQUEADA_W'] = ''
    validarInputs(
        {
            form: '#COMPR_SAL450C',
            orden: '1'
        }, function () {
            claseServ_SAL450C()
        },
        function () {
            loader('show')
            llave_SAL450C.NRO = cerosIzq($('#comprob_SAL450C').val(), 6)
            $('#comprob_SAL450C').val(llave_SAL450C.NRO)

            var llave_envio = llave_SAL450C.SUC_W
            llave_envio += llave_SAL450C.CL
            llave_envio += llave_SAL450C.NRO
            console.log(llave_envio)
            var datos_envio = datosEnvio()
            datos_envio += llave_envio
            datos_envio += '|'

            let URL = get_url("APP/SALUD/SAL450A.DLL");

            postData({
                datosh: datos_envio
            }, URL)
                .then((data) => {
                    llegadaDatos_SAL450C(data)
                })
                .catch(error => {
                    console.error(error)
                    loader('hide')
                    nroComprob_SAL450C()
                });
        }
    )
}

function llegadaDatos_SAL450C(data) {
    global_SAL450C = []
    $("#TABLA_SAL450C tbody").empty();
    global_SAL450C = data.FACTURA[0]
    global_SAL450C.TABLA.pop()

    llave_SAL450C.SUC_W = global_SAL450C.SUC
    llave_SAL450C.CL = global_SAL450C.CLASE.split('')[0]
    llave_SAL450C.NRO = global_SAL450C.NRO
    global_SAL450C['ADMIN_W'] = localStorage.getItem('Usuario').trim()
    global_SAL450C['FACTOR_W'] = ''
    loader('hide')

    $('#claseservicio_SAL450C').val(global_SAL450C.CLASE)
    global_SAL450C.CLASE = global_SAL450C.CLASE.split('')[0]

    if (global_SAL450C.NRO_CTA.trim() == '') {
        prefijo_SAL450C()
    } else {
        if (global_SAL450C.PREFIJO == 'E' || global_SAL450C.PREFIJO == 'C') {
            busqueda_Tarifa_SALUD(global_SAL450C, { 'CONVENIO': 'CL' }, nroComprob_SAL450C, mostrarDatosCompletos_SAL450C)
        } else {
            leer_cuenta_SALUD(global_SAL450C, nroComprob_SAL450C, mostrarDatosCompletos_SAL450C)
        }
    }
}

function mostrarDatosCompletos_SAL450C(data) {
    global_SAL450C = data
    console.log(global_SAL450C)
    global_SAL450C['PREFIJO_W'] = global_SAL450C.PREFIJO
    $('#comprob_SAL450C').val(global_SAL450C.NRO)
    global_SAL450C.CLASE = global_SAL450C.CLASE.split('')[0]
    $('#comprob_SAL450C').val(global_SAL450C.NRO)
    momentMaskFechaFact.typedValue = global_SAL450C.FECHA
    // $('#fecha_SAL450C').val(global_SAL450C.FECHA)
    $('#factura_SAL450C').val(global_SAL450C.PREFIJO)
    $('#facturad_SAL450C').val(global_SAL450C.NRO_CTA)
    $('#pingreso_SAL450C').val(global_SAL450C.PUERTA_ESTAD + '.- ' + global_SAL450C.DESCRIP_PUERTA)
    global_SAL450C.NIT = global_SAL450C.NIT.trim()
    clienteMask.typedValue = global_SAL450C.NIT
    $('#cliented_SAL450C').val(global_SAL450C.DESCRIP_TER)
    idpacienteMask.typedValue = global_SAL450C.ID_PACIENTE
    // $('#paciente_SAL450C').val(global_SAL450C.ID_PACIENTE)
    $('#paciented_SAL450C').val(global_SAL450C.DESCRIP_PACI)
    $('#sexo_SAL450C').val(global_SAL450C.SEXO)
    $('#edad_SAL450C').val(global_SAL450C.EDAD)
    $('#estrato_SAL450C').val(global_SAL450C.ESTRATO)
    $('#espec_SAL450C').val(global_SAL450C.ESPEC)
    $('#despec_SAL450C').val(global_SAL450C.DESCRIP_ESPEC)
    $('#operElab_SAL450C').val(global_SAL450C.OPER_ELAB)
    if (global_SAL450C.OPER_CORREC.trim().length > 0) {
        $('#operCorrec_SAL450C').val(global_SAL450C.OPER_CORREC + '-' + global_SAL450C.FECHA_CORREC)
    }
    $('#secuCopago_SAL450C').val(global_SAL450C.SECU_ABON)

    if (global_SAL450C.CLASE == '1') {
        var prof = ['CIRUJANO', 'AYUDANTIA', 'ANESTESIOA', 'MAT.QUIRG', 'DERECH.SALA'];
        for (var i in prof) {
            $('#TABLA_SAL450C tbody').append(
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
        for (var i in global_SAL450C.TABLA) {
            if (global_SAL450C.TABLA[i].ARTICULO.trim().length > 0) {
                $('#TABLA_SAL450C tbody').append(''
                    + '<tr>'
                    + '   <td>' + global_SAL450C.TABLA[i].POSICION + '</td>'
                    + '   <td>' + global_SAL450C.TABLA[i].ARTICULO + '</td>'
                    + '   <td>' + global_SAL450C.TABLA[i].DESCRIP_ART + '</td>'
                    + '   <td>' + global_SAL450C.TABLA[i].ALMACEN + '</td>'
                    + '   <td>' + global_SAL450C.TABLA[i].CANTIDAD + '</td>'
                    + '   <td>' + global_SAL450C.TABLA[i].UNIDAD + '</td>'
                    + '   <td>' + global_SAL450C.TABLA[i].VALOR_UNIT + '</td>'
                    + '   <td>' + global_SAL450C.TABLA[i].VALOR_FACT + '</td>'
                    + '</tr>'
                )
            }
        }
    }
    $('#refactura_SAL450C').val(global_SAL450C.REFACTURA)
    $('#destino_SAL450C').val(global_SAL450C.DESTINO)
    $('#fechaAten_SAL450C').val(global_SAL450C.FECHA_ING)
    $('#vlrtot_SAL450C').val(global_SAL450C.VALOR_BRUTO)
    $('#valoriva_SAL450C').val(global_SAL450C.VALOR_IVA)
    $('#copagoestimfact_SAL450C').val(global_SAL450C.COPAGO_ESTIM_PAGO)
    $('#netofact_SAL450C').val(global_SAL450C.VALOR_TOTAL)

    if (global_SAL450C.VALOR_TOTAL.trim() == '' && (global_SAL450C.CLASE == '1' || global_SAL450C.CLASE == '2' || global_SAL450C.CLASE == '3')) CON851('07', '07', null, 'error', 'Error');

    var fecha_fact = global_SAL450C.FECHA.split('')
    var ano_fact = fecha_fact[2] + fecha_fact[3]
    var mes_fact = fecha_fact[4] + fecha_fact[5]


    var fecha_num = $_USUA_GLOBAL[0].FECHALNK.split('')
    var ano_num = fecha_num[0] + fecha_num[1]
    var mes_num = fecha_num[2] + fecha_num[3]

    var mes_act = moment().format('MM')

    if ((ano_fact != ano_num) && (mes_act == '01')) {
        mostrarFecha_SAL450C()
    } else {
        if ((ano_num != ano_fact) || (mes_num != mes_fact)) {
            CON851('91', '91', null, 'error', 'error');
            nroComprob_SAL450C()
        } else {
            leer_anterior_SAL450C()
        }
    }

}

function leer_anterior_SAL450C() {
    if (global_SAL450C.PREFIJO == "E" || global_SAL450C.PREFIJO == "C") {
        mostrarFecha_SAL450C()
    } else {
        var cta = global_SAL450C.PREFIJO + global_SAL450C.NRO_CTA

        var datos_envio_SAL450C = datosEnvio()
        datos_envio_SAL450C += cta
        datos_envio_SAL450C += '|'
        datos_envio_SAL450C += "A"
        datos_envio_SAL450C += '|'

        let URL = get_url("APP/SALUD/SAL450A-02.DLL");

        postData({
            datosh: datos_envio_SAL450C
        }, URL)
            .then((data) => {
                loader("hide")
                numeracion_SAL450C = data.NUMERACION[0]

                console.log(numeracion_SAL450C)
                leer_anterior_2_SAL450C()
            })
            .catch(error => {
                console.error(error)
                numeracion_SAL450C['ESTADO'] = '1'
                leer_anterior_2_SAL450C()
            });
    }
}


function leer_anterior_2_SAL450C() {
    if (numeracion_SAL450C.ESTADO == '1') {
        CON851('13', 'PACIENTE RETIRADO', null, 'error', 'error')
        if (global_SAL450C.ADMIN_W == 'ADMI' || global_SAL450C.ADMIN_W == 'GEBC' || global_SAL450C.ADMIN_W == 'JCAC') {
            mostrarFecha_SAL450C()
        } else {
            nroComprob_SAL450C()
        }
    } else {
        mostrarFecha_SAL450C()
    }
}

function aceptarFecha_SAL450C() {
    validarInputs(
        {
            form: '#valFecha_SAL450C',
            orden: "1"
        },
        function () { nroComprob_SAL450C(); },
        function () {
            var fechaDigitada = $('#fecha_SAL450C').val()
            var fecha_num = $_USUA_GLOBAL[0].FECHALNK.split('')
            var mes_num = fecha_num[2] + fecha_num[3]
            var mes_fact = moment($FECHA_FACT_SAL450C).format('MM')

            if (fechaDigitada.trim() != '') {
                if (fechaDigitada.length < 10) {
                    aceptarFecha_SAL450C()
                } else {
                    if (parseInt(mes_num) < parseInt(mes_fact)) {
                        CON851('91', '91', null, 'error', 'Error');

                        if ((global_SAL450C.ADMIN_W == 'ADMI' || global_SAL450C.ADMIN_W == 'GEBC') && (global_SAL450C.CLASE != '0')) {

                            global_SAL450C.FECHA = moment($FECHA_FACT_SAL450C).format('YYYYMMDD')
                            mostrarFecha_SAL450C()
                        } else {
                            aceptarFecha_SAL450C()
                        }
                    } else {
                        global_SAL450C.FECHA = moment($FECHA_FACT_SAL450C).format('YYYYMMDD')
                        console.log(global_SAL450C.FECHA)
                        mostrarFecha_SAL450C();
                    }
                }
            } else {
                aceptarFecha_SAL450C()
            }
        }
    )
}



function mostrarFecha_SAL450C() {
    if (global_SAL450C.ADMIN_W == 'JCAC') {
        aceptarCosto_SAL450C()
    } else {
        SER873(aceptarFecha_SAL450C, (data) => {
            console.log(data)
            unidServ_SAL450C = data
            global_SAL450C.UNIDAD_SERVICIO = data.COD

            if (global_SAL450C.UNIDAD_SERVICIO == '00' || global_SAL450C.UNIDAD_SERVICIO == '88') {
                aceptarFecha_SAL450C()
            } else {
                $('#info_SAL450C').val(data.DESCRIP.trim())
                prefijo_SAL450C()
            }
        }, global_SAL450C.UNIDAD_SERVICIO)
    }
}

function prefijo_SAL450C() {
    validarInputs(
        {
            form: '#validarFecha_SAL450C',
            orden: '1'
        },
        nroComprob_SAL450C,
        function () {
            global_SAL450C.PREFIJO = $('#factura_SAL450C').val()

            if (($_USUA_GLOBAL[0].PUC_USU == '4' || $_USUA_GLOBAL[0].PUC_USU == '6') && (global_SAL450C.PREFIJO == "E")) {
                global_SAL450C.PREFIJO = 'C'
                $('#factura_SAL450C').val(global_SAL450C.PREFIJO)
            }

            switch (global_SAL450C.PREFIJO) {
                case "E":
                case "C":
                case "A":
                case "P":
                case "T":
                    if (global_SAL450C.PREFIJO == 'E' || $_USUA_GLOBAL[0].CONTADO == 'N') global_SAL450C.PREFIJO == 'C'
                    $('#factura_SAL450C').val(global_SAL450C.PREFIJO)
                    ubicar_cuenta_SAL450C()
                    break;
                default:
                    CON851('03', '03', null, 'error', 'error')
                    prefijo_SAL450C()
                    break;
            }
        }
    )
}

function ubicar_cuenta_SAL450C() {
    if (global_SAL450C.PREFIJO == 'E' || global_SAL450C.PREFIJO == 'C') {

        var busqueda = prefijos_fact_SAL450C.find(prefijo => prefijo == global_SAL450C.PREFIJO_W)

        if (busqueda || global_SAL450C.NRO_CTA.trim() == '') {

            let URL = get_url("APP/CONTAB/CON007.DLL")
            postData({ datosh: datosEnvio() + '96' + '|' }, URL)
                .then(data => {
                    var datos = data.split('|')
                    console.log(datos)
                    global_SAL450C.NRO_CTA = cerosIzq(datos[1].slice(3), 6)
                    $('#facturad_SAL450C').val(global_SAL450C.NRO_CTA)
                    busqueda_Tarifa_SALUD(global_SAL450C, { 'CONVENIO': 'CL' }, prefijo_SAL450C, (data) => {
                        global_SAL450C = data
                        puertaIngreso_SAL450C()
                    })
                })
                .catch(err => {
                    console.log(err)
                    _toggleNav()
                })

        } else {
            busqueda_Tarifa_SALUD(global_SAL450C, { 'CONVENIO': 'CL' }, prefijo_SAL450C, (data) => {
                global_SAL450C = data
                puertaIngreso_SAL450C()
            })
        }

    } else {
        leer_cuenta_SALUD(global_SAL450C, prefijo_SAL450C, (data) => {
            global_SAL450C = data
            puertaIngreso_SAL450C()
        })
    }
}

function puertaIngreso_SAL450C() {
    SER822(prefijo_SAL450C, (data) => {
        global_SAL450C.PUERTA_ESTAD = data.COD
        global_SAL450C.DESCRIP_PUERTA = data.DESCRIP
        $('#pingreso_SAL450C').val(global_SAL450C.PUERTA_ESTAD + '.- ' + global_SAL450C.DESCRIP_PUERTA)

        if (global_SAL450C.PUERTA_ESTAD == '2' && global_SAL450C.UNIDAD_SERVICIO != '02') {
            CON851('03', '03', null, 'error', 'Error')
            puertaIngreso_SAL450C()
        } else {
            ubicar_cliente_SAL450C()
        }

    }, global_SAL450C.PUERTA_ESTAD)
}

function ubicar_cliente_SAL450C() {
    var busqueda = prefijos_fact_SAL450C.find(prefijo => prefijo == global_SAL450C.PREFIJO)

    if (busqueda) {
        mostrarCliente_SAL450C('1')
    } else {
        Cliente_SAL450C()
    }
}

function Cliente_SAL450C() {
    validarInputs(
        {
            form: '#validar_cliente_SAL450C',
            orden: '1',
            event_f1: llamadoCrearCitas_SAL450C
        },
        aceptarFecha_SAL450C,
        function () {
            console.log(clienteMask.unmaskedValue)
            global_SAL450C.NIT = espaciosIzq(clienteMask.unmaskedValue, 10)
            mostrarCliente_SAL450C('2')
        }
    )
}

function mostrarCliente_SAL450C(orden) {
    console.log(espaciosIzq(global_SAL450C.NIT, 10))
    var busquedaTercero = terceros_SAL450C.find(tercero => tercero.COD == espaciosIzq(global_SAL450C.NIT, 10))
    console.log(busquedaTercero)

    if (busquedaTercero) {
        $('#cliented_SAL450C').val(busquedaTercero.NOMBRE)
        global_SAL450C['ENTIDAD_TER'] = busquedaTercero.ENTIDAD.trim()

        if (global_SAL450C.PREFIJO == 'C' && global_SAL450C.NITUSU == '892000401' && global_SAL450C.NIT != '9999') {
            if (busquedaTercero.ACT == '03' || busquedaTercero.ACT == '04' || busquedaTercero.ACT == '05') {
                dato_paciente_SAL450C()
            } else {
                CON851('01', 'ERROR ACTIVIDAD TERCERO', null, 'error', 'Error')
                Cliente_SAL450C()
            }

        } else {
            dato_paciente_SAL450C()
        }
    } else {
        CON851('01', 'NO EXISTE TERCERO', null, 'error', 'Error')
        switch (orden) {
            case '1':
                Cliente_SAL450C()
                break;
            case '2':
                llamadoCreacionTercero_SAL450C()
                break;
        }
    }
}

function llamadoCrearCitas_SAL450C() {
    let { ipcRenderer } = require("electron");
    ipcRenderer.send('another', 'SALUD/paginas/SAL7C11.html');
    vector = ['on', 'Actualizando citas...']
    _EventocrearSegventana(vector, Cliente_SAL450C);
}

function llamadoCreacionTercero_SAL450C() {
    let { ipcRenderer } = require("electron");
    ipcRenderer.send('another', 'CONTAB/paginas/CON110C.html');
    vector = ['on', 'Creando tercero...']
    _EventocrearSegventana(vector, recargarTerceros_SAL450C);
}

function recargarTerceros_SAL450C() {
    terceros_SAL450C = []
    obtenerDatosCompletos({ nombreFd: 'TERCEROS' }, data => {
        terceros_SAL450C = data.TERCEROS;
        terceros_SAL450C.pop();
        console.log(terceros_SAL450C)
        Cliente_SAL450C()
    })
}

function dato_paciente_SAL450C() {
    validarInputs(
        {
            form: '#validar_paciente_SAL450C',
            orden: '1',
            event_f1: llamadoCrearCitas_SAL450C
        },
        Cliente_SAL450C,
        function () {
            global_SAL450C.ID_PACIENTE = cerosIzq(idpacienteMask.unmaskedValue, 15)

            if (global_SAL450C.ID_PACIENTE.trim() == '' || global_SAL450C.ID_PACIENTE == '000000000000000') {
                dato_paciente_SAL450C()
            } else {
                loader("show")

                let URL = get_url("APP/SALUD/SAL41-05.DLL");
                postData({
                    datosh: datosEnvio() + global_SAL450C.ID_PACIENTE + '|'
                }, URL)
                    .then((data) => {
                        loader("hide")
                        console.log(data)
                        var datos = data.split('|')
                        global_SAL450C.EPS_PACI = datos[0].trim()
                        global_SAL450C.DESCRIP_PACI = datos[1].trim()
                        global_SAL450C.SEXO = datos[10].trim()
                        global_SAL450C.ESTRATO = datos[29].trim()

                        $('#paciented_SAL450C').val(global_SAL450C.DESCRIP_PACI)
                        $('#sexo_SAL450C').val(global_SAL450C.SEXO)
                        $('#estrato_SAL450C').val(global_SAL450C.ESTRATO)
                        leer_paciente_SAL450C()
                    })
                    .catch(error => {
                        console.error(error)
                        loader("hide")
                        CON851('01', 'NO EXISTE PACIENTE', null, 'error', 'Error')
                        llamadoCreacionPaciente_SAL450C()
                    });
            }
        }
    )
}

function llamadoCreacionPaciente_SAL450C() {
    let { ipcRenderer } = require("electron");
    ipcRenderer.send('another', 'SALUD/paginas/SER110C.html');
    vector = ['on', 'Creando paciente...']
    _EventocrearSegventana(vector, dato_paciente_SAL450C);
}

function leer_paciente_SAL450C() {
    var unid_edad_max = unidServ_SAL450C.EDADMAX.split('')[0]
    var vlr_edad_max = unidServ_SAL450C.EDADMAX.slice(1)
    var unid_edad_min = unidServ_SAL450C.EDADMIN.split('')[0]
    var vlr_edad_min = unidServ_SAL450C.EDADMIN.slice(1)

    var unid_edad = global_SAL450C.EDAD.split('')[0]
    var vlr_edad = global_SAL450C.EDAD.slice(1)

    if ((unid_edad_max == 'D' && unid_edad != 'D') || (unid_edad_min == 'M' && unid_edad == 'D') || (unid_edad_min == 'A' && unid_edad != 'A') || (unid_edad_max == 'A' && unid_edad == 'A' && (vlr_edad > vlr_edad_max || vlr_edad < vlr_edad_min))) {
        CON851('74', '74', null, 'error', 'Error')
        dato_paciente_SAL450C()
    } else {
        var busqueda = prefijos_fact_SAL450C.find(prefijo => prefijo == global_SAL450C.PREFIJO)

        if (busqueda && (global_SAL450C.ENTIDAD_TER != global_SAL450C.EPS_PACI)) {
            CON851('9S', '9S', null, 'error', 'Error')
            dato_paciente_SAL450C()
        } else {
            if (global_SAL450C.PREFIJO == 'P') $('#info_SAL450C').val('INGRESO: ' + moment(numeracion_SAL450C.FECHA_ING).format('YYYY/MM/DD'))
            viaAcceso_SAL450C()
        }
    }
}

function viaAcceso_SAL450C() {
    $('#viaDeAcceso_SAL450C').show()

    if (global_SAL450C.CLASE == 1) {
        validarInputs(
            {
                form: '#validarViaAcceso_SAL450C',
                orden: '1'
            },
            dato_paciente_SAL450C,
            function () {
                global_SAL450C.VIA_FACT = cerosIzq($('#viaAcceso_SAL450C').val(), 2)
                $('#viaAcceso_SAL450C').val(global_SAL450C.VIA_FACT)
                mostrarViaAcceso_SAL450C()
            }
        )
    } else {
        mostrarViaAcceso_SAL450C()
    }
}

function mostrarViaAcceso_SAL450C() {
    var descrip_via
    switch (cerosIzq(global_SAL450C.VIA_FACT), 2) {
        case '01': descrip_via = 'ABDOMINAL'
            break;
        case '02': descrip_via = 'CUELLO'
            break;
        case '03': descrip_via = 'TORAXICA'
            break;
        case '04': descrip_via = 'CRANEAL'
            break;
        case '05': descrip_via = 'MIEMB.SUP.IZQ'
            break;
        case '06': descrip_via = 'MIEMB.SUP.DER'
            break;
        case '07': descrip_via = 'MIEMB.INF.IZQ'
            break;
        case '08': descrip_via = 'MIEMB.INF.DER'
            break;
        case '09': descrip_via = 'RECTAL'
            break;
        case '10': descrip_via = 'VAGINAL'
            break;
        case '11': descrip_via = 'OIDO'
            break;
        case '12': descrip_via = 'NARIZ'
            break;
        case '13': descrip_via = 'BOCA'
            break;
        case '14': descrip_via = 'OCULAR'
            break;
        case '15': descrip_via = 'OTRO'
            break;
        default: descrip_via = ''
            break;
    }

    if (descrip_via == '') {
        console.log('NO ENCONTRO VIA DE ACCESO')
        dato_paciente_SAL450C()
    } else {
        $('#viaAcceso_SAL450C').val(global_SAL450C.VIA_FACT + ' - ' + descrip_via)

        if (global_SAL450C.NITUSU == '0891855847' && global_SAL450C.ADMIN_W == 'JCAC') {
            aceptarCosto_SAL450C()
        } else {
            aceptarCodigo_SAL450C()
        }
    }
}

function aceptarCodigo_SAL450C() {

}


function aceptarCosto_SAL450C() {

}

function grabarCambio_SAL450C() {
    loader("show")
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + '8' + global_SAL450C.CLASE + '|' }, URL)
        .then(data => {
            var datos = data.split('|')
            console.log(datos)
            console.debug(datos[1]);
            console.debug(datos[1].slice(3));
            global_SAL450C.NRO = cerosIzq(datos[1].slice(3), 6)
            grabarCambio_SAL450C_2()
        })
        .catch(err => {
            console.debug(err);
        })
}
function grabarCambio_SAL450C_2() {
    let llave_anterior = llave_SAL450C.SUC_W + llave_SAL450C.CL + llave_SAL450C.NRO
    let llave_nueva = global_SAL450C.SUC + global_SAL450C.CLASE + global_SAL450C.NRO

    var datos_envio = datosEnvio()
    datos_envio += llave_anterior
    datos_envio += '|'
    datos_envio += llave_nueva
    datos_envio += '|'
    datos_envio += global_SAL450C.ADMIN_W
    datos_envio += '|'
    datos_envio += moment().format("YYYYMMDD")
    datos_envio += '|'
    console.log(datos_envio)
    let URL = get_url("app/SALUD/SAL450C.DLL");

    var data = {};
    data.datosh = datos_envio;

    console.log(data)
    postData({
        datosh: datos_envio
    }, URL)
        .then((data) => {
            console.log('acabo')
            llamadoCON007X_SAL450C()
        })
        .catch(error => {
            console.error(error)
            loader("hide")
            _toggleNav()
        });
}

function llamadoCON007X_SAL450C() {
    var URL = get_url("app/CONTAB/CON007X.DLL");

    var datos_envio_007X = datosEnvio()
    datos_envio_007X += '8' + global_SAL450C.CLASE
    datos_envio_007X += '|'
    datos_envio_007X += global_SAL450C.NRO
    datos_envio_007X += '|'
    datos_envio_007X += global_SAL450C.FECHA
    datos_envio_007X += '|'

    console.log(datos_envio_007X)
    postData({
        datosh: datos_envio_007X
    }, URL)
        .then((data) => {
            console.log(data)
            $('[data-bb-handler="main"]').click();
            CON851('', 'Proceso Terminado!', null, 'success', '');
            finalizarSAL450C()
        })
        .catch(error => {
            console.error(error)
            loader("hide")
        });
}

function finalizarSAL450C() {
    console.log('va a reiniciar')
    _inputControl("reset");
    _inputControl("disabled");
    $("#TABLA_SAL450C tbody").empty();
    claseServicio_SAL450C = []
    global_SAL450C = []
    numeracion_SAL450C = []
    prefijos_fact_SAL450C = []
    terceros_SAL450C = []
    unidServ_SAL450C = []
    global_SAL450C['PREFIJOUSU'] = $_USUA_GLOBAL[0].PREFIJ;
    global_SAL450C['ADMIN_W'] = localStorage.getItem('Usuario').trim() ? localStorage.getItem('Usuario').trim() : false;
    global_SAL450C['NITUSU'] = $_USUA_GLOBAL[0].NIT.toString().padStart(10, '0');
    inicio_SAL450C()
}