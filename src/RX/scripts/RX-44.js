var cups_rx44 = []
var consenCups_rx44 = []
var global_rx44 = []

var $_novedad_rx44

function ventanaCups_rx44(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {

        switch ($_novedad_rx44) {
            case '7':
                _ventanaDatos({
                    titulo: 'Ventana cups',
                    columnas: ["LLAVE", "DESCRIP"],
                    label: ["Codigo", "Descripcion"],
                    data: cups_rx44,
                    callback_esc: function () {
                        $('#cup_rx44').focus()
                    },
                    callback: function (data) {
                        $('#cup_rx44').val(data.LLAVE.trim());
                        _enterInput('#cup_rx44');
                    }
                });
                break;
            case '8':
            case '9':
                _ventanaDatos({
                    titulo: 'Ventana cups con consentimiento',
                    columnas: ["CODIGO", "DESCRIP"],
                    label: ["Codigo", "Descripcion"],
                    data: consenCups_rx44,
                    callback_esc: function () {
                        $('#cup_rx44').focus()
                    },
                    callback: function (data) {
                        $('#cup_rx44').val(data.CODIGO.trim());
                        _enterInput('#cup_rx44');
                    }
                });
                break;
        }

    }
}

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    loader('show')
    nombreOpcion('4,1 - Maestro consentimientos por cup')
    _toggleF8([
        { input: 'cup', app: 'rx44', funct: ventanaCups_rx44 }
    ]);

    traerArchivos_rx44()
});

function traerArchivos_rx44() {
    var datos_Envio_cups = datosEnvio()

    postData({
        datosh: datos_Envio_cups
    }, get_url("APP/SALUD/SER802C.DLL"))
        .then((data) => {
            cups_rx44 = data.CODIGOS
            cups_rx44.pop()

            for (var i in cups_rx44) {
                cups_rx44[i].DESCRIP = cups_rx44[i].DESCRIP.replace(/\�/g, "Ñ").trim()
            }

            var datos_Envio_consen = datosEnvio()

            postData({
                datosh: datos_Envio_consen
            }, get_url("APP/RX/RX-44.DLL"))
                .then((data) => {
                    consenCups_rx44 = data.CONSENCUPS
                    consenCups_rx44.pop()
                    crearArray_rx44()
                })
                .catch(error => {
                    loader('hide')
                    CON851('', error, null, 'error', 'Error');
                    _toggleNav()
                });

        })
        .catch(error => {
            loader('hide')
            CON851('', error, null, 'error', 'Error');
            _toggleNav()
        });
}
function crearArray_rx44() {
    global_rx44['LLAVE'] = ''
    global_rx44['DESCRIP_CUP'] = ''
    global_rx44['TITULO'] = ''
    global_rx44['OPER_CREA'] = ''
    global_rx44['FECHA_CREA'] = ''
    global_rx44['OPER_MODIF'] = ''
    global_rx44['FECHA_MODIF'] = ''
    global_rx44['ENCABEZADO'] = ''
    global_rx44['DESCRIPCION'] = ''
    global_rx44['RIESGOS'] = ''
    global_rx44['BENEFICIOS'] = ''

    loader('hide')
    CON850(_Novedad_rx44)
}

function _Novedad_rx44(novedad) {
    $_novedad_rx44 = novedad.id;
    switch ($_novedad_rx44) {
        case '7':
        case '8':
        case '9':
            validarCup_rx44()
            break;
        case 'F':
            limpiarCampos_rx44();
            break;
    }
    $('#Novedad_rx44').val(novedad.id + ' - ' + novedad.descripcion)
}

function limpiarCampos_rx44() {
    cups_rx44 = []
    consenCups_rx44 = []
    tablasConsen_Rx44 = []
    $_novedad_rx44 = ''
    _inputControl('reset');
    _inputControl('disabled');
    _toggleNav();
}

function validarCup_rx44() {
    validarInputs(
        {
            form: '#ValidarCup_rx44',
            orden: '1'
        },
        () => CON850(_Novedad_rx44),
        function () {
            global_rx44.LLAVE = $('#cup_rx44').val().trim()
            $('#cup_rx44').val(global_rx44.LLAVE)

            var busquedaCup = cups_rx44.find(datos => datos.LLAVE.trim() == global_rx44.LLAVE)
            var busquedaConsen = consenCups_rx44.find(datos => datos.CODIGO.trim() == global_rx44.LLAVE)

            if (!busquedaCup) {
                CON851('01', 'Cup no existe', null, 'error', 'error')
                validarCup_rx44()
            } else {
                switch ($_novedad_rx44) {
                    case '7':

                        if (!busquedaConsen) {
                            $('#descripCup_rx44').val(busquedaCup.DESCRIP)
                            global_rx44.DESCRIP_CUP = busquedaCup.DESCRIP
                            validarTitulo_rx44()
                        } else {
                            CON851('00', 'Consentimiento ya existe', null, 'error', 'error')
                            validarCup_rx44()
                        }
                        break;
                    case '8':
                    case '9':

                        if (!busquedaConsen) {
                            CON851('01', 'Consentimiento no existe', null, 'error', 'error')
                            validarCup_rx44()
                        } else {
                            $('#descripCup_rx44').val(busquedaCup.DESCRIP)
                            global_rx44.DESCRIP_CUP = busquedaCup.DESCRIP
                            consultaDatos_rx44()
                        }
                        break;
                }
            }
        }
    )
}


function consultaDatos_rx44() {
    postData({ datosh: datosEnvio() + global_rx44.LLAVE + '|' }, get_url("APP/RX/RX-44-02.DLL"))
        .then(function (data) {
            var datos = data.CONSENCUPS_2[0]
            global_rx44.TITULO = datos.TITULO.trim()
            global_rx44.OPER_CREA = datos.OPER_CREA
            global_rx44.FECHA_CREA = datos.FECHA_CREA
            global_rx44.OPER_MODIF = datos.OPER_MODIF
            global_rx44.FECHA_MODIF = datos.FECHA_MODIF
            global_rx44.ENCABEZADO = datos.ENCABEZADO.replace(/\&/g, "\n").trim()
            global_rx44.DESCRIPCION = datos.DESCRIPCION.replace(/\&/g, "\n").trim()
            global_rx44.RIESGOS = datos.RIESGOS.replace(/\&/g, "\n").trim()
            global_rx44.BENEFICIOS = datos.BENEFICIOS.replace(/\&/g, "\n").trim()
            mostrarDatos_rx44()
        })
        .catch(err => {
            CON851('', err, null, 'error', 'Error');
            loader("hide")
            validarCup_rx44()
        })
}

function mostrarDatos_rx44() {
    $('#titulo_rx44').val(global_rx44.TITULO)
    $('#encabConsen_rx44').val(global_rx44.ENCABEZADO)
    $('#descripConsen_rx44').val(global_rx44.DESCRIPCION)
    $('#riesgosConsen_rx44').val(global_rx44.RIESGOS)
    $('#benefConsen_rx44').val(global_rx44.BENEFICIOS)
    $('#creacion_rx44').val(global_rx44.OPER_CREA)
    $('#fecha_creacion_rx44').val(global_rx44.FECHA_CREA)
    $('#modifico_rx44').val(global_rx44.OPER_MODIF)
    $('#fecha_modif_rx44').val(global_rx44.FECHA_MODIF)

    if ($_novedad_rx44 == '8') {
        validarTitulo_rx44()
    } else {
        CON851P('54', validarCup_rx44, grabarRegistro_rx44)
    }
}

function validarTitulo_rx44() {
    validarInputs(
        {
            form: "#validarTitulo_rx44",
            orden: '1'
        },
        validarCup_rx44,
        function () {
            global_rx44.TITULO = $('#titulo_rx44').val().trim()

            global_rx44.TITULO = global_rx44.TITULO.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ')
            validarEncabezado_rx44()
        }
    )
}

function validarEncabezado_rx44() {
    validarInputs(
        {
            form: "#validarEncabezado_rx44",
            orden: '1',
        },
        validarTitulo_rx44,
        function () {
            global_rx44.ENCABEZADO = $('#encabConsen_rx44').val().trim()

            global_rx44.ENCABEZADO = global_rx44.ENCABEZADO.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ')
            global_rx44.ENCABEZADO = global_rx44.ENCABEZADO.replace(/(\r\n|\n|\r)/gm, "&");

            validarDescripcion_rx44()
        }
    )
}

function validarDescripcion_rx44() {
    validarInputs(
        {
            form: "#validarDescripConsen_rx44",
            orden: '1',
        },
        validarEncabezado_rx44,
        function () {
            global_rx44.DESCRIPCION = $('#descripConsen_rx44').val().trim()

            global_rx44.DESCRIPCION = global_rx44.DESCRIPCION.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ')
            global_rx44.DESCRIPCION = global_rx44.DESCRIPCION.replace(/(\r\n|\n|\r)/gm, "&");

            validarRiesgos_rx44()
        }
    )
}

function validarRiesgos_rx44() {
    validarInputs(
        {
            form: "#validarRiesgosConsen_rx44",
            orden: '1',
        },
        validarDescripcion_rx44,
        function () {
            global_rx44.RIESGOS = $('#riesgosConsen_rx44').val().trim()

            global_rx44.RIESGOS = global_rx44.RIESGOS.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ')
            global_rx44.RIESGOS = global_rx44.RIESGOS.replace(/(\r\n|\n|\r)/gm, "&");

            validarBeneficios_rx44()
        }
    )
}

function validarBeneficios_rx44() {
    validarInputs(
        {
            form: "#validarBenefConsen_rx44",
            orden: '1',
        },
        validarDescripcion_rx44,
        function () {
            global_rx44.BENEFICIOS = $('#benefConsen_rx44').val().trim()

            global_rx44.BENEFICIOS = global_rx44.BENEFICIOS.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ')
            global_rx44.BENEFICIOS = global_rx44.BENEFICIOS.replace(/(\r\n|\n|\r)/gm, "&");

            CON851P('01', validarBeneficios_rx44, grabarRegistro_rx44)
        }
    )
}

function grabarRegistro_rx44() {
    var datos_envio_rx44 = datosEnvio();
    datos_envio_rx44 += $_novedad_rx44
    datos_envio_rx44 += '|'
    datos_envio_rx44 += global_rx44.LLAVE
    datos_envio_rx44 += '|'
    datos_envio_rx44 += global_rx44.DESCRIP_CUP
    datos_envio_rx44 += '|'
    datos_envio_rx44 += global_rx44.TITULO
    datos_envio_rx44 += '|'
    datos_envio_rx44 += localStorage.Usuario
    datos_envio_rx44 += '|'
    datos_envio_rx44 += moment().format('YYYYMMDD')
    datos_envio_rx44 += '|'

    var data = {};
    data['datosh'] = datos_envio_rx44
    data['encabezado'] = global_rx44.ENCABEZADO
    data['descripcion'] = global_rx44.DESCRIPCION
    data['riesgos'] = global_rx44.RIESGOS
    data['beneficios'] = global_rx44.BENEFICIOS

    let URL = get_url("APP/RX/RX-44-03.DLL");

    postData(data, URL)
        .then((data) => {
            loader('hide')
            var mensaje
            switch ($_novedad_rx44) {
                case '7': mensaje = 'Creado correctamente'
                    break;
                case '8': mensaje = 'Modificado correctamente'
                    break;
                case '9': mensaje = 'Eliminado correctamente'
                    break;
            }
            CON851('', mensaje, null, 'success', 'Exitoso');
            limpiarCampos_rx44()
        })
        .catch(error => {
            loader('hide')
            CON851('', error, null, 'error', 'Error');
            _toggleNav()
        });
}