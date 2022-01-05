var plantillas_lab104 = []
var global_lab104 = []

var $_novedad_lab104

function ventanaPlantillas_lab104(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana cups',
            columnas: ["COD", "DESCRIP"],
            label: ["Codigo", "Descripcion"],
            data: plantillas_lab104,
            callback_esc: function () {
                $('#cod_lab104').focus()
            },
            callback: function (data) {
                $('#cod_lab104').val(data.COD.trim());
                _enterInput('#cod_lab104');
            }
        });

    }
}

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    loader('show')
    nombreOpcion('3 - Plantillas para resultado de laboratorio')
    _toggleF8([
        { input: 'cod', app: 'lab104', funct: ventanaPlantillas_lab104 }
    ]);

    traerArchivos_lab104()
});

function traerArchivos_lab104() {
    var datos_Envio = datosEnvio()

    let URL = get_url("APP/LAB/LAB104.DLL");

    postData({ datosh: datos_Envio }, URL)
        .then((data) => {
            plantillas_lab104 = data.PLANTILLAS
            plantillas_lab104.pop()
            crearArray_lab104()
        })
        .catch(error => {
            console.log(error)
            loader('hide')
            _toggleNav()
        });
}
function crearArray_lab104() {
    global_lab104['COD'] = ''
    global_lab104['DESCRIP'] = ''
    global_lab104['NRO_OPC'] = ''
    global_lab104['ITEM1'] = ''
    global_lab104['ITEM2'] = ''
    global_lab104['ITEM3'] = ''
    global_lab104['ITEM4'] = ''
    global_lab104['ITEM5'] = ''
    global_lab104['ITEM6'] = ''
    global_lab104['ITEM7'] = ''
    global_lab104['ITEM8'] = ''
    global_lab104['ITEM9'] = ''

    loader('hide')
    CON850(_Novedad_lab104)
}

function _Novedad_lab104(novedad) {
    $_novedad_lab104 = novedad.id;
    switch ($_novedad_lab104) {
        case '7':
        case '8':
        case '9':
            validarCodigo_lab104()
            break;
        case 'F':
            limpiarCampos_lab104();
            break;
    }
    $('#Novedad_lab104').val(novedad.id + ' - ' + novedad.descripcion)
}

function limpiarCampos_lab104() {
    global_lab104 = []
    plantillas_lab104 = []
    $_novedad_lab104 = ''
    _inputControl('reset');
    _inputControl('disabled');
    _toggleNav();
}

function validarCodigo_lab104() {
    validarInputs(
        {
            form: '#ValidarPlantilla_lab104',
            orden: '1'
        },
        () => CON850(_Novedad_lab104),
        function () {
            global_lab104.COD = cerosIzq($('#cod_lab104').val(), 2)
            $('#cod_lab104').val(global_lab104.COD)

            var busqueda = plantillas_lab104.find(plant => plant.COD == global_lab104.COD)

            switch ($_novedad_lab104) {
                case '7':
                    if (!busqueda) {
                        global_lab104.NRO_OPC = parseInt(plantillas_lab104.length) + 1
                        $('#nroOpc_lab104').val(global_lab104.NRO_OPC)
                        validarDescrip_lab104()
                    } else {
                        CON851('00', 'Plantilla ya existe', null, 'error', 'error')
                        validarCodigo_lab104()
                    }
                    break;
                case '8':
                case '9':

                    if (!busqueda) {
                        CON851('01', 'Plantilla no existe', null, 'error', 'error')
                        validarCodigo_lab104()
                    } else {
                        mostrarDatos_lab104(busqueda)
                    }
                    break;
            }

        }
    )
}

function mostrarDatos_lab104(data) {
    global_lab104.DESCRIP = data.DESCRIP
    global_lab104.NRO_OPC = plantillas_lab104.findIndex(plant => plant.COD == global_lab104.COD)
    global_lab104.NRO_OPC = parseInt(global_lab104.NRO_OPC) + 1
    global_lab104.ITEM1 = data.ITEM1
    global_lab104.ITEM2 = data.ITEM2
    global_lab104.ITEM3 = data.ITEM3
    global_lab104.ITEM4 = data.ITEM4
    global_lab104.ITEM5 = data.ITEM5
    global_lab104.ITEM6 = data.ITEM6
    global_lab104.ITEM7 = data.ITEM7
    global_lab104.ITEM8 = data.ITEM8
    global_lab104.ITEM9 = data.ITEM9

    $('#descrip_lab104').val(global_lab104.DESCRIP.trim())
    $('#item1_lab104').val(global_lab104.ITEM1.trim())
    $('#item2_lab104').val(global_lab104.ITEM2.trim())
    $('#item3_lab104').val(global_lab104.ITEM3.trim())
    $('#item4_lab104').val(global_lab104.ITEM4.trim())
    $('#item5_lab104').val(global_lab104.ITEM5.trim())
    $('#item6_lab104').val(global_lab104.ITEM6.trim())
    $('#item7_lab104').val(global_lab104.ITEM7.trim())
    $('#item8_lab104').val(global_lab104.ITEM8.trim())
    $('#item9_lab104').val(global_lab104.ITEM9.trim())

    $('#nroOpc_lab104').val(global_lab104.NRO_OPC)

    $('#oper_lab104').val(data.OPER)
    $('#fecha_lab104').val(data.FECHA)

    if ($_novedad_lab104 == '8') {
        validarDescrip_lab104()
    } else {
        CON851P('54', validarCodigo_lab104, grabarRegistro_lab104)
    }
}

function validarDescrip_lab104() {
    validarInputs(
        {
            form: "#validarDescrip_lab104",
            orden: '1'
        },
        validarCodigo_lab104,
        function () {
            global_lab104.DESCRIP = $('#descrip_lab104').val().trim()

            validarOpcion1_lab104()
        }
    )
}

function validarOpcion1_lab104() {
    validarInputs(
        {
            form: "#validarItem1_lab104",
            orden: '1',
            event_f3: () => {
                set_Event_validar('#validarItem1_lab104', 'off')
                $('#item1_lab104').attr('disabled', 'true')
                CON851P(' 01', validarOpcion1_lab104, grabarRegistro_lab104)
            }
        },
        validarDescrip_lab104,
        function () {
            global_lab104.ITEM1 = $('#item1_lab104').val().trim()

            validarOpcion2_lab104()
        }
    )
}

function validarOpcion2_lab104() {
    validarInputs(
        {
            form: "#validarItem2_lab104",
            orden: '1',
            event_f3: () => {
                set_Event_validar('#validarItem2_lab104', 'off')
                $('#item2_lab104').attr('disabled', 'true')
                CON851P(' 01', validarOpcion2_lab104, grabarRegistro_lab104)
            }
        },
        validarOpcion1_lab104,
        function () {
            global_lab104.ITEM2 = $('#item2_lab104').val().trim()

            validarOpcion3_lab104()
        }
    )
}

function validarOpcion3_lab104() {
    validarInputs(
        {
            form: "#validarItem3_lab104",
            orden: '1',
            event_f3: () => {
                set_Event_validar('#validarItem3_lab104', 'off')
                $('#item3_lab104').attr('disabled', 'true')
                CON851P(' 01', validarOpcion3_lab104, grabarRegistro_lab104)
            }
        },
        validarOpcion2_lab104,
        function () {
            global_lab104.ITEM3 = $('#item3_lab104').val().trim()

            validarOpcion4_lab104()
        }
    )
}

function validarOpcion4_lab104() {
    validarInputs(
        {
            form: "#validarItem4_lab104",
            orden: '1',
            event_f3: () => {
                set_Event_validar('#validarItem4_lab104', 'off')
                $('#item4_lab104').attr('disabled', 'true')
                CON851P(' 01', validarOpcion4_lab104, grabarRegistro_lab104)
            }
        },
        validarOpcion3_lab104,
        function () {
            global_lab104.ITEM4 = $('#item4_lab104').val().trim()

            validarOpcion5_lab104()
        }
    )
}

function validarOpcion5_lab104() {
    validarInputs(
        {
            form: "#validarItem5_lab104",
            orden: '1',
            event_f3: () => {
                set_Event_validar('#validarItem5_lab104', 'off')
                $('#item5_lab104').attr('disabled', 'true')
                CON851P(' 01', validarOpcion5_lab104, grabarRegistro_lab104)
            }
        },
        validarOpcion4_lab104,
        function () {
            global_lab104.ITEM5 = $('#item5_lab104').val().trim()

            validarOpcion6_lab104()
        }
    )
}

function validarOpcion6_lab104() {
    validarInputs(
        {
            form: "#validarItem6_lab104",
            orden: '1',
            event_f3: () => {
                set_Event_validar('#validarItem6_lab104', 'off')
                $('#item6_lab104').attr('disabled', 'true')
                CON851P(' 01', validarOpcion6_lab104, grabarRegistro_lab104)
            }
        },
        validarOpcion5_lab104,
        function () {
            global_lab104.ITEM6 = $('#item6_lab104').val().trim()

            validarOpcion7_lab104()
        }
    )
}

function validarOpcion7_lab104() {
    validarInputs(
        {
            form: "#validarItem7_lab104",
            orden: '1',
            event_f3: () => {
                set_Event_validar('#validarItem7_lab104', 'off')
                $('#item7_lab104').attr('disabled', 'true')
                CON851P(' 01', validarOpcion7_lab104, grabarRegistro_lab104)
            }
        },
        validarOpcion6_lab104,
        function () {
            global_lab104.ITEM7 = $('#item7_lab104').val().trim()

            validarOpcion8_lab104()
        }
    )
}

function validarOpcion8_lab104() {
    validarInputs(
        {
            form: "#validarItem8_lab104",
            orden: '1',
            event_f3: () => {
                set_Event_validar('#validarItem8_lab104', 'off')
                $('#item8_lab104').attr('disabled', 'true')
                CON851P(' 01', validarOpcion8_lab104, grabarRegistro_lab104)
            }
        },
        validarOpcion7_lab104,
        function () {
            global_lab104.ITEM8 = $('#item8_lab104').val().trim()

            validarOpcion9_lab104()
        }
    )
}

function validarOpcion9_lab104() {
    validarInputs(
        {
            form: "#validarItem9_lab104",
            orden: '1',
            event_f3: () => {
                set_Event_validar('#validarItem9_lab104', 'off')
                $('#item9_lab104').attr('disabled', 'true')
                CON851P(' 01', validarOpcion9_lab104, grabarRegistro_lab104)
            }
        },
        validarOpcion8_lab104,
        function () {
            global_lab104.ITEM9 = $('#item9_lab104').val().trim()

            CON851P(' 01', validarOpcion9_lab104, grabarRegistro_lab104)
        }
    )
}

function grabarRegistro_lab104() {
    var datos_envio_lab104 = datosEnvio();
    datos_envio_lab104 += $_novedad_lab104
    datos_envio_lab104 += '|'
    datos_envio_lab104 += global_lab104.COD
    datos_envio_lab104 += '|'
    datos_envio_lab104 += global_lab104.DESCRIP
    datos_envio_lab104 += '|'
    datos_envio_lab104 += global_lab104.ITEM1
    datos_envio_lab104 += '|'
    datos_envio_lab104 += global_lab104.ITEM2
    datos_envio_lab104 += '|'
    datos_envio_lab104 += global_lab104.ITEM3
    datos_envio_lab104 += '|'
    datos_envio_lab104 += global_lab104.ITEM4
    datos_envio_lab104 += '|'
    datos_envio_lab104 += global_lab104.ITEM5
    datos_envio_lab104 += '|'
    datos_envio_lab104 += global_lab104.ITEM6
    datos_envio_lab104 += '|'
    datos_envio_lab104 += global_lab104.ITEM7
    datos_envio_lab104 += '|'
    datos_envio_lab104 += global_lab104.ITEM8
    datos_envio_lab104 += '|'
    datos_envio_lab104 += global_lab104.ITEM9
    datos_envio_lab104 += '|'
    datos_envio_lab104 += localStorage.Usuario
    datos_envio_lab104 += '|'
    datos_envio_lab104 += moment().format('YYYYMMDD')
    datos_envio_lab104 += '|'

    let URL = get_url("APP/LAB/LAB104-02.DLL");

    postData({ datosh: datos_envio_lab104 }, URL)
        .then((data) => {
            loader('hide')

            var mensaje
            switch ($_novedad_lab104) {
                case '7': mensaje = 'Creado correctamente'
                    break;
                case '8': mensaje = 'Modificado correctamente'
                    break;
                case '9': mensaje = 'Eliminado correctamente'
                    break;
            }
            
            CON851('', mensaje, null, 'success', 'Exitoso');
            limpiarCampos_lab104()
        })
        .catch(error => {
            console.log(error)
            loader('hide')
            _toggleNav()
        });
}