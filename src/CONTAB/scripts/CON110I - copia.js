var arrayLote_110I = [];
var arrayPref_110I = [];
var $NOVEDAD_110I, $consecutivo_110I

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    $("#guardarCon110I").hide()


    _toggleF8([
        { input: 'lote', app: '110I', funct: _ventanaLote },
        { input: 'pref', app: '110I', funct: _ventanaPrefijo },
    ]);
    loader('hide');
    CON850(_evaluarNovedad);
});

function _ventanaLote(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana Lotes',
            tipo: 'mysql',
            tablaSql: 'sc_archlote',
            callback_esc: function () {
                recibirLote_110I();
            },
            callback: function (data) {
                console.log(data)
                $('#lote_110I').val(data.codigo.trim());
                _enterInput('#lote_110I');
            }
        });
    }
}

function _ventanaPrefijo(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana Prefijos',
            tipo: 'mysql',
            tablaSql: 'sc_archpref',
            callback_esc: function () {
                recibirPref_110I();
            },
            callback: function (data) {
                console.log(data)
                var consecutivo = data.id.toString().trim()
                $('#pref_110I').val(consecutivo);
                _enterInput('#pref_110I');
            }
        });
    }
}



function _evaluarNovedad(novedad) {
    $('#novCon110i').val(novedad.id + ' - ' + novedad.descripcion)
    $NOVEDAD_110I = parseInt(novedad.id)
    switch ($NOVEDAD_110I) {
        case 7:
        case 8:
        case 9:
            recibirLote_110I()
            break;
        default:
            _toggleNav();
            break;
    }
}

function recibirLote_110I() {
    validarInputs(
        {
            form: "#lote",
            orden: '1'
        },
        function () { CON850(_evaluarNovedad); },
        function () {
            var loteDigitado = $('#lote_110I').val();
            if (loteDigitado.length == 0) {
                CON851('02', '02', null, 'error', 'error');
                recibirLote_110I()
            } else {
                LLAMADO_DLL({
                    dato: [$NOVEDAD_110I, loteDigitado],
                    callback: validarLote_110I,
                    nombredll: 'CON110I-01',
                    carpeta: 'CONTAB'
                })
                // _consultaSql({
                //     sql: `SELECT * FROM sc_archlote WHERE codigo = '${loteDigitado}'`,
                //     callback: function (error, results, fields) {
                //         if (error) throw error;
                //         else {

                //     }
                // }
                // })
                // }

            }
        }
    )
}

function validarLote_110I(data) {
    var rdll = data.split('|')
    console.log(rdll)
    if (rdll[0] == "00") {
        if (rdll[1] == "00") {
            switch ($NOVEDAD_110I) {
                case 7:
                    nombreLote_110I()
                    break;
                case 8:
                    mostrarDatos_110I(rdll)
                    nombreLote_110I()
                    break;
                case 9:
                    mostrarDatos_110I(rdll)
                    CON851P('54', recibirLote_110I, eliminarRegistro_110I)
                    break;
            }
        } else if (rdll[1] == ('99')) {
            switch ($NOVEDAD_110I) {
                case 7:
                    CON851('00', '00', null, 'error', 'error');
                    recibirLote_110I()

                    break;
                case 8:
                case 9:
                    CON851('01', '01', null, 'error', 'error');
                    recibirLote_110I()
                    break;
            }

        }
    } else {
        CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
    }
}

function mostrarDatos_110I(datos) {
    var lote = $('#lote_110I').val()
    var loteDigitado = lote.split('');

    var codLote1 = loteDigitado[0]
    var codLote2 = loteDigitado[1]

    if ((codLote1 > "2" || codLote1 == "E") && (codLote2 == "G" || codLote2 == "A" || codLote2 == "S" || codLote2 == "0" || codLote2 == "T")) {

        if (datos[8].trim().length == 0) {

            if (datos.codigo.trim() == "4G") {
                validarChecked('#IMPR_110I', "S")
            } else {
                validarChecked('#IMPR_110I', "N")
            }

        } else {
            validarChecked('#IMPR_110I', datos[8].trim())
        }

    } else {
        validarChecked('#IMPR_110I', "N")
    }

    $('#nombre110I').val(datos[2].trim())
    if (datos[3].trim() == "0") {
        switch (lote) {
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
        switch (datos[3].trim()) {
            case '1':
                $('#consec_110I').val(datos[3].trim() + '. Anual')
                break;
            case '2':
                $('#consec_110I').val(datos[3].trim() + '. Mensual')
                break;
        }
    }


    $('#pref_110I').val(datos[4].trim())
    validarChecked('#PRESU_110I', datos[5].trim())
    validarChecked('#INGRE_110I', datos[6].trim())
    validarChecked('#CONTR_110I', datos[7].trim())


    console.log('termino de mostrar datos')
}




function nombreLote_110I() {
    validarInputs(
        {
            form: "#nombre",
            orden: '1'
        },
        function () { recibirLote_110I(); },
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
    // var codTipoConsecutivo = '[{"COD": "1","DESCRIP": "Anual"},{"COD": "2","DESCRIP": "Mensual"}]'
    // var arrayConsecutivo_110I = JSON.parse(codTipoConsecutivo)
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
                recibirPref_110I()
                break;
            case '2':
                $('#consec_110I').val(data.COD.trim() + '. ' + data.DESCRIP.trim())
                $consecutivo_110I = data.COD.trim()
                recibirPref_110I()
                break;
        }

    })

}

function recibirPref_110I() {
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
                _consultaSql({
                    sql: `SELECT * FROM sc_archpref WHERE id = '${prefDigitado}'`,
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            var datos = results[0]
                            console.log(datos)
                            if (results.length > 0) {
                                var consecutivo = cerosIzq(datos.id.toString().trim(), 2)
                                $('#pref_110I').val(consecutivo);
                                validarPref_110I()
                            } else {
                                CON851('01', '01', null, 'error', 'error');
                                recibirPref_110I()

                            }
                        }
                    }
                })
            }


        }
    )
}


function validarPref_110I() {
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
    var novedad = $NOVEDAD_110I
    var loteEnvio = espaciosDer($('#lote_110I').val().trim(), 2)

    LLAMADO_DLL({
        dato: [novedad, loteEnvio],
        callback: function (data) { validarRespuesta_110I(data, loteEnvio) },
        nombredll: 'CON110I-02',
        carpeta: 'CONTAB'
    })
}

function guardarDatos_110I() {
    console.log('entro a grabar datos')

    var novedadEnvio = $NOVEDAD_110I
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


    LLAMADO_DLL({
        dato: [novedadEnvio, loteEnvio, nombreEnvio, consecEnvio, prefijoEnvio, presupEnvio, sinSitFondoEnvio, contratoEnvio, simplifEnvio],
        callback: function (data) {
            validarRespuesta_110I(data, loteEnvio, nombreEnvio, consecEnvio, prefijoEnvio, presupEnvio, sinSitFondoEnvio, contratoEnvio, simplifEnvio)
        },
        nombredll: 'CON110I-02',
        carpeta: 'CONTAB'
    })
}

function validarRespuesta_110I(data, loteEnvio, nombreEnvio, consecEnvio, prefijoEnvio, presupEnvio, sinSitFondoEnvio, contratoEnvio, simplifEnvio) {
    loader('hide');
    var rdll = data.split('|');
    console.log(rdll)
    if (rdll[0].trim() == '00') {
        switch ($NOVEDAD_110I) {
            case 7:
                _consultaSql({
                    sql: `INSERT INTO sc_archlote VALUES ('${loteEnvio}', '${nombreEnvio}');`,
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            console.log(results)
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO CREADO CORRECTAMENTE' },
                                    function () {
                                        inicio_110I();
                                        console.log('fin del programa')
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR CREANDO EL DATO' },
                                    function () {
                                        inicio_110I();
                                        console.log('fin del programa')
                                    });

                            }
                        }
                    }
                })
                break;
            case 8:
                _consultaSql({
                    sql: `
                    UPDATE sc_archlote 
                    SET descripcion='${nombreEnvio}'
                    WHERE codigo = '${loteEnvio}' `,
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            console.log(results)
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO MODIFICADO CORRECTAMENTE' },
                                    function () {
                                        inicio_110I();
                                        console.log('fin del programa')
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR MODIFICANDO EL DATO' },
                                    function () {
                                        inicio_110I();
                                        console.log('fin del programa')
                                    });

                            }
                        }
                    }
                })
                break;
            case 9:
                console.log(`DELETE FROM sc_archlote WHERE codigo = '${loteEnvio}'`)
                _consultaSql({
                    sql: `DELETE FROM sc_archlote WHERE codigo = '${loteEnvio}'`,
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            console.log(results)
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO ELIMINADO CORRECTAMENTE' },
                                    function () {
                                        inicio_110I()
                                        console.log('fin del programa')
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR ELIMINANDO EL DATO' },
                                    function () {
                                        inicio_110I()
                                        console.log('fin del programa')
                                    });

                            }
                        }
                    }
                })
                break;
        }

    } else {
        CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
    }
}

function inicio_110I(){
    _inputControl('reset');
    _inputControl('disabled');
    $("#guardarCon110I").hide()
    validarChecked('#PRESU_110I', "N")
    validarChecked('#INGRE_110I', "N")
    validarChecked('#CONTR_110I', "N")
    validarChecked('#IMPR_110I', "N")
    
    CON850(_evaluarNovedad);
}