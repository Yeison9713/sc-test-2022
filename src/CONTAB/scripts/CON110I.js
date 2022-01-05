var arrayLote_110I = [];
var arrayPref_110I = [];
var $NOVEDAD_110I, $consecutivo_110I

$(document).ready(function () {
    nombreOpcion('1,2,4 - Actualizacion Lotes De Movimiento')
    _inputControl('reset');
    _inputControl('disabled');
    $("#guardarCon110I").hide()


    _toggleF8([
        { input: 'lote', app: '110I', funct: _ventanaLote },
        { input: 'pref', app: '110I', funct: _ventanaPrefijo },
    ]);
    loader('hide');
    inicio_110I()
});
function inicio_110I(){
    obtenerDatosCompletos({ nombreFd: 'LOTES' }, recibirLotes_CON110I, 'ON')
}

function recibirLotes_CON110I(data) {
    arrayLote_110I = data.LOTES
    arrayLote_110I.pop()
    obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, recibirPrefijos_110I, 'OFF')
}



function recibirPrefijos_110I(data) {
    arrayPref_110I = data.PREFIJOS[0].TABLA
    arrayPref_110I.pop()
    for (var i in arrayPref_110I) {
        var posicion = arrayPref_110I[i].NRO
        posicion = posicion.slice(4,6);
        arrayPref_110I[i].NRO = posicion
    }
    CON850(_evaluarNovedad);
}

function _ventanaLote(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana lotes',
            columnas: ["LOTE", "NOMBRE"],
            data: arrayLote_110I,
            callback_esc: function () {
                $('#lote_110I').focus()
            },
            callback: function (data) {
                console.log(data)
                $('#lote_110I').val(data.LOTE.trim());
                _enterInput('#lote_110I');
            }
        });
    }
}

function _ventanaPrefijo(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana prefijos',
            columnas: ["NRO", "PREFIJO", "DESC_PREF"],
            data: arrayPref_110I,
            callback_esc: function () {
                $('#pref_110I').focus()
            },
            callback: function (data) {
                console.log(data)
                $('#pref_110I').val(data.NRO);
                _enterInput('#pref_110I');
            }
        });
    }
}

function _evaluarNovedad(novedad) {
    $('#novCon110i').val(novedad.id + ' - ' + novedad.descripcion)
    $NOVEDAD_110I = novedad.id;
    switch ($NOVEDAD_110I) {
        case '7':
        case '8':
        case '9':
            validarLote_110I()
            break;
        case 'F':
            salir_con110i()
            break;
    }
}

function salir_con110i() {
    _inputControl('reset');
    _inputControl('disabled');
    arrayLote_110I = []
    arrayPref_110I = []
    $NOVEDAD_110I = ''
    $('#lote_110I').val('');
    $('#nombre110I').val('');
    $('#consec_110I').val('');
    $('#pref_110I').val('');
    $('#lote_110I').val('');
    $('#lote_110I').val('');
    validarChecked('#PRESU_110I', "N")
    validarChecked('#INGRE_110I', "N")
    validarChecked('#CONTR_110I', "N")
    validarChecked('#IMPR_110I', "N")
    _toggleNav()
}

function validarLote_110I() {
    validarInputs(
        {
            form: "#validarLote_110i",
            orden: '1'
        },
        function () { CON850(_evaluarNovedad); },
        function () {
            var loteDigitado = $('#lote_110I').val();

            if (loteDigitado.length == 0) {
                CON851('02', '02', null, 'error', 'error');
                validarLote_110I()

            } else {
                var busqueda = arrayLote_110I.find(lote => lote.LOTE == loteDigitado)
                console.log(busqueda)

                if (busqueda) {

                    switch ($NOVEDAD_110I) {
                        case '7':
                            CON851('00', '00', null, 'error', 'error');
                            validarLote_110I()
                            break;
                        case '8':
                            mostrarDatos_110I(busqueda)
                            nombreLote_110I()
                            break;
                        case '9':
                            mostrarDatos_110I(busqueda)
                            CON851P('54', validarLote_110I, eliminarRegistro_110I)
                            break;
                    }

                } else {
                    switch ($NOVEDAD_110I) {
                        case '7':
                            nombreLote_110I()
                            break;
                        case '8':
                        case '9':
                            CON851('01', '01', null, 'error', 'error');
                            validarLote_110I()
                            break;
                    }
                }
            }
        }
    )
}

function mostrarDatos_110I(data) {
    var loteDigitado = data.LOTE.split('');

    var codLote1 = loteDigitado[0]
    var codLote2 = loteDigitado[1]

    if ((codLote1 > "2" || codLote1 == "E") && (codLote2 == "G" || codLote2 == "A" || codLote2 == "S" || codLote2 == "0" || codLote2 == "T")) {

        if (data.SIMPLIF.length == 0) {

            if (data.LOTE == "4G") {
                validarChecked('#IMPR_110I', "S")
            } else {
                validarChecked('#IMPR_110I', "N")
            }

        } else {
            validarChecked('#IMPR_110I', data.SIMPLIF)
        }

    } else {
        validarChecked('#IMPR_110I', "N")
    }

    $('#nombre110I').val(data.NOMBRE.trim())

    if (data.CONSECUTIVO.trim() == "0" || data.CONSECUTIVO.trim().length == '0') {
        switch (data.LOTE) {
            case '1G':
            case '2G':
            case '1Z':
            case '2Z':
                $('#consec_110I').val('2. Mensual')
                break;
            default:
                $('#consec_110I').val('1. Anual')
                break;
        }

    } else {
        switch (data.CONSECUTIVO) {
            case '1':
                $('#consec_110I').val(data.CONSECUTIVO + '. Anual')
                break;
            case '2':
                $('#consec_110I').val(data.CONSECUTIVO + '. Mensual')
                break;
        }
    }


    $('#pref_110I').val(data.PREFIJO.trim())
    validarChecked('#PRESU_110I', data.PRESUP.trim())
    validarChecked('#INGRE_110I', data.SIN_SIT_FOND.trim())
    validarChecked('#CONTR_110I', data.CONTRATO.trim())
}

function nombreLote_110I() {
    validarInputs(
        {
            form: "#nombreLote_110i",
            orden: '1'
        },
        function () { validarLote_110I(); },
        function () {
            var nombreLote = $('#nombre110I').val()

            if (nombreLote.length == 0) {
                CON851('02', '02', null, 'error', 'error');
                nombreLote_110I()
            } else {
                tipoConsecutivo_110I()
            }

        }
    )
}

function tipoConsecutivo_110I() {
    var arrayConsecutivo_110I = [
        { "COD": "1", "DESCRIP": "Anual" },
        { "COD": "2", "DESCRIP": "Mensual" }
    ]

    POPUP({
        array: arrayConsecutivo_110I,
        titulo: 'Tipo De Consecutivo',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: nombreLote_110I
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
                $('#consec_110I').val(data.COD.trim() + '. ' + data.DESCRIP.trim())
                $consecutivo_110I = data.COD.trim()
                break;
            case '2':
                $('#consec_110I').val(data.COD.trim() + '. ' + data.DESCRIP.trim())
                $consecutivo_110I = data.COD.trim()
                break;
        }
        validarPref_110I()
    })

}


function validarPref_110I() {
    validarInputs(
        {
            form: "#prefijo",
            orden: '1'
        },
        function () { tipoConsecutivo_110I(); },
        function () {
            var prefDigitado = $('#pref_110I').val();

            if (prefDigitado.length == 0) {
                mostrarBotonGuardar_110I()
            } else {
                var busqueda = arrayPref_110I.find(prefijo => prefijo.NRO == prefDigitado)
                console.log(busqueda)

                if (busqueda){
                    $('#pref_110I').val(busqueda.NRO)
                    validar_MOSTRAR_110I()
                } else {
                    CON851('01', '01', null, 'error', 'error');
                    validarPref_110I()
                }
            }

        }
    )
}


function validar_MOSTRAR_110I() {
    var lote = $('#lote_110I').val();

    var codLote1 = lote[0]
    var codLote2 = lote[1]

    if ((codLote1 > "2" || codLote1 == "E") && (codLote2 == "G" || codLote2 == "A")) {
        mostrarBotonGuardar_110I()
    } else {
        validarChecked('#IMPR_110I', "N")
        $('#IMPR_110I').prop("disabled", true);
        mostrarBotonGuardar_110I()
    }
}

function mostrarBotonGuardar_110I() {
    $("#guardarCon110I").show()
}

$("#guardarCon110I").click(function () {
    loader('show')
    guardarDatos_110I()
});

function eliminarRegistro_110I() {
    console.log('entro a eliminar datos')
    var loteEnvio = espaciosDer($('#lote_110I').val().trim(), 2)

    // LLAMADO_DLL({
    //     dato: [novedad, loteEnvio],
    //     callback: function (data) { validarRespuesta_110I(data, loteEnvio) },
    //     nombredll: 'CON110I-02',
    //     carpeta: 'CONTAB'
    // })

    var datos_envio_con110i = datosEnvio()
    datos_envio_con110i += $NOVEDAD_110I
    datos_envio_con110i += '|'
    datos_envio_con110i += loteEnvio
    datos_envio_con110i += '|'

    let URL = get_url("APP/CONTAB/CON110I-02.DLL");

    postData({
        datosh: datos_envio_con110i
    }, URL)
        .then((data) => {
            console.log(data)
            jAlert(
                { titulo: 'CON110I-02', mensaje: data },
                volverInicio_110I
            );
        })
        .catch(error => {
            console.error(error)
            _toggleNav()
        });
}

function guardarDatos_110I() {
    console.log('entro a grabar datos')

    var loteEnvio = espaciosDer($('#lote_110I').val().trim(), 2)
    var nombreEnvio = espaciosDer($('#nombre110I').val().trim().toUpperCase(), 30)
    var consecEnvio = cerosIzq($consecutivo_110I, 1)
    var prefijoEnvio = cerosIzq($('#pref_110I').val().trim(), 2)

    var presupEnvio
    if ($("#PRESU_110I").prop('checked')) { presupEnvio = 'S' } else { presupEnvio = 'N' }

    var sinSitFondoEnvio
    if ($("#INGRE_110I").prop('checked')) { sinSitFondoEnvio = 'S' } else { sinSitFondoEnvio = 'N' }

    var contratoEnvio
    if ($("#CONTR_110I").prop('checked')) { contratoEnvio = 'S' } else { contratoEnvio = 'N' }

    var simplifEnvio
    if ($("#IMPR_110I").prop('checked')) { simplifEnvio = 'S' } else { simplifEnvio = 'N' }


    // LLAMADO_DLL({
    //     dato: [novedadEnvio, loteEnvio, nombreEnvio, consecEnvio, prefijoEnvio, presupEnvio, sinSitFondoEnvio, contratoEnvio, simplifEnvio],
    //     callback: function (data) {
    //         validarRespuesta_110I(data, loteEnvio, nombreEnvio, consecEnvio, prefijoEnvio, presupEnvio, sinSitFondoEnvio, contratoEnvio, simplifEnvio)
    //     },
    //     nombredll: 'CON110I-02',
    //     carpeta: 'CONTAB'
    // })
    var datos_envio_con110i = datosEnvio()
    datos_envio_con110i += $NOVEDAD_110I
    datos_envio_con110i += '|'
    datos_envio_con110i += loteEnvio
    datos_envio_con110i += '|'
    datos_envio_con110i += nombreEnvio
    datos_envio_con110i += '|'
    datos_envio_con110i += consecEnvio
    datos_envio_con110i += '|'
    datos_envio_con110i += prefijoEnvio
    datos_envio_con110i += '|'
    datos_envio_con110i += presupEnvio
    datos_envio_con110i += '|'
    datos_envio_con110i += sinSitFondoEnvio
    datos_envio_con110i += '|'
    datos_envio_con110i += contratoEnvio
    datos_envio_con110i += '|'
    datos_envio_con110i += simplifEnvio
    datos_envio_con110i += '|'

    let URL = get_url("APP/CONTAB/CON110I-02.DLL");

    postData({
        datosh: datos_envio_con110i
    }, URL)
        .then((data) => {
            console.log(data)
            jAlert(
                { titulo: 'CON110I-02', mensaje: data },
                volverInicio_110I
            );
        })
        .catch(error => {
            console.error(error)
            _toggleNav()
        });
}

function volverInicio_110I() {
    _inputControl('reset');
    _inputControl('disabled');
    $("#guardarCon110I").hide()
    arrayLote_110I = []
    arrayPref_110I = []
    $NOVEDAD_110I = ''
    $('#lote_110I').val('');
    $('#nombre110I').val('');
    $('#consec_110I').val('');
    $('#pref_110I').val('');
    $('#lote_110I').val('');
    $('#lote_110I').val('');
    validarChecked('#PRESU_110I', "N")
    validarChecked('#INGRE_110I', "N")
    validarChecked('#CONTR_110I', "N")
    validarChecked('#IMPR_110I', "N")
    loader('hide')
    inicio_110I()
}