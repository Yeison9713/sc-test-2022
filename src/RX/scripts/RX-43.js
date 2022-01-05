var array_rx43 = [];

var profesionales_rx43 = []

var Maskpeso_rx43 = IMask.createMask({ mask: Number, radix: '.', padFractionalZeros: true, signed: false, scale: 1, min: 000, max: 999.9 });
var Maskbmd_rx43 = IMask.createMask({ mask: Number, radix: '.', padFractionalZeros: true, signed: false, scale: 3, min: 0.000, max: 9.999 });
var MaskScore_rx43 = IMask.createMask({ mask: Number, radix: '.', signed: true, padFractionalZeros: true, scale: 1, min: -9.9, max: 9.9 });

function _ventanaRadiologo_rx43(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana profesionales activos',
            columnas: ["IDENTIFICACION", "NOMBRE", "DESCRIPCION", "REG_MEDICO"],
            data: profesionales_rx43,
            ancho: '70%',
            callback_esc: function () {
                $('#radiologo_rx43').focus()
            },
            callback: function (data) {
                $('#radiologo_rx43').val(data.IDENTIFICACION.trim());
                _enterInput('#radiologo_rx43');
            }
        });
    }
}

function _ventanaTecnologo_rx43(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana profesionales activos',
            columnas: ["IDENTIFICACION", "NOMBRE", "DESCRIPCION", "REG_MEDICO"],
            data: profesionales_rx43,
            ancho: '70%',
            callback_esc: function () {
                $('#tecnologo_rx43').focus()
            },
            callback: function (data) {
                $('#tecnologo_rx43').val(data.IDENTIFICACION.trim());
                _enterInput('#tecnologo_rx43');
            }
        });
    }
}

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');

    nombreOpcion('1,2 - Osteodensitometria')

    _toggleF8([
        { input: 'radiologo', app: 'rx43', funct: _ventanaRadiologo_rx43 },
        { input: 'tecnologo', app: 'rx43', funct: _ventanaTecnologo_rx43 }
    ]);

    $('#Boton_email_rx43').hide()
    $('#imprimir_rx43').hide()
    console.log('entra')
    traerProfesionales_rx43()
});

function traerProfesionales_rx43() {
    loader('show')
    let URL = get_url("APP/SALUD/SER819.DLL");
    postData({ datosh: datosEnvio() }, URL)
        .then(function (data) {
            profesionales_rx43 = data.ARCHPROF
            profesionales_rx43.pop()
            for (var i in profesionales_rx43) {
                profesionales_rx43[i].NOMBRE = profesionales_rx43[i].NOMBRE.replace(/\�/g, "Ñ").trim()
            }
            loader("hide")
            traerRxCompleto_rx43()
        })
        .catch(err => {
            console.error(err)
            loader("hide")
            _toggleNav()
        })
}

function traerRxCompleto_rx43() {
    var datos_envio = datosEnvio() + LLAVE_RXLAB_GLOBAL.NIT + '|' + LLAVE_RXLAB_GLOBAL.COMPROBANTE + '|' + LLAVE_RXLAB_GLOBAL.CUP + '|' + LLAVE_RXLAB_GLOBAL.ITEM + '|'
    let URL = get_url("APP/RX/RX-421W.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(function (data) {
            array_rx43 = data.RESULTADOS_RX[0]

            array_rx43['SUC'] = LLAVE_RXLAB_GLOBAL.SUC
            array_rx43['CL'] = LLAVE_RXLAB_GLOBAL.CL
            array_rx43['COMPROB'] = LLAVE_RXLAB_GLOBAL.COMPROB
            array_rx43['CUP'] = LLAVE_RXLAB_GLOBAL.CUP

            array_rx43.ANTECEDENTES = array_rx43.ANTECEDENTES.replace(/\&/g, "\n").trim()
            array_rx43.TRATAMIENTO = array_rx43.TRATAMIENTO.replace(/\&/g, "\n").trim()
            array_rx43.HALLAZGOS = array_rx43.HALLAZGOS.replace(/\&/g, "\n").trim()
            array_rx43.CONCLUSIONES = array_rx43.CONCLUSIONES.replace(/\&/g, "\n").trim()

            array_rx43.DESCRIP_PACI = array_rx43.DESCRIP_PACI.replace(/\�/g, "Ñ").trim()
            array_rx43.DESCRIP_CUP = array_rx43.DESCRIP_CUP.replace(/\�/g, "Ñ").trim()

            $('#suc_rx43').val(array_rx43.SUC)
            $('#tipoComprob_rx43').val(array_rx43.CL)
            $('#Comprob_rx43').val(array_rx43.COMPROB)
            $('#cup_rx43').val(array_rx43.CUP)
            $('#fecha_rx43').val(array_rx43.FECHA)
            mostrarDatos_rx43()
        })
        .catch(err => {
            console.log(err)
            loader("hide")
            _toggleNav()
        })
}

function mostrarDatos_rx43() {
    $('#descripCup_rx43').val(array_rx43.DESCRIP_CUP.trim())

    $('#paciente_rx43').val(array_rx43.ID_HISTORIA.trim())
    $('#descripPaciente_rx43').val(array_rx43.DESCRIP_PACI.trim())

    $('#radiologo_rx43').val(array_rx43.ID_RADIOLOGO.trim())

    var busquedaRad = profesionales_rx43.find(profesional => profesional.IDENTIFICACION == array_rx43.ID_RADIOLOGO.trim())
    if (busquedaRad) {
        $('#descrip1Radiologo_rx43').val(busquedaRad.REG_MEDICO)
        $('#descrip2Radiologo_rx43').val(busquedaRad.NOMBRE)
        array_rx43.NOM_RADIOLOGO = busquedaRad.NOMBRE.trim()
        array_rx43.REG_RADIOLOGO = busquedaRad.REG_MEDICO
    } else {
        array_rx43.NOM_RADIOLOGO = ''
        array_rx43.REG_RADIOLOGO = ''
        $('#descrip2Radiologo_rx43').val('Profesional no existe o está inactivo')
    }

    $('#tecnologo_rx43').val(array_rx43.ID_TECNOLOGO.trim())
    var busquedaTec = profesionales_rx43.find(profesional => profesional.IDENTIFICACION == array_rx43.ID_TECNOLOGO.trim())

    if (busquedaTec) {
        array_rx43.NOM_TECNOLOGO = busquedaTec.NOMBRE.trim()
        $('#descripTecnologo_rx43').val(busquedaTec.NOMBRE)
    }

    $('#sala_rx43').val(array_rx43.SALA.trim())
    $('#cuenta_rx43').val(array_rx43.CTA_NUM)
    $('#nit_rx43').val(array_rx43.ID_ENTIDAD)

    if (array_rx43.ESTATURA_USUAL != '  0') $('#estatUsu_rx43').val(array_rx43.ESTATURA_USUAL + ' CM')

    if (array_rx43.ESTATURA_ACTUAL != '  0') $('#estatAct_rx43').val(array_rx43.ESTATURA_ACTUAL + ' CM')

    if (array_rx43.PESO != '   .0') $('#peso_rx43').val(array_rx43.PESO + ' KG')

    $('#textoBmd_rx43').val(array_rx43.TEXTO_BMD.trim())

    for (var i in array_rx43.TABLA_MEDICION) {
        var numero = parseInt(i) + 1
        $('#textoColumna' + numero + '_rx43').val(array_rx43.TABLA_MEDICION[i].COLUMNA.trim())

        array_rx43.TABLA_MEDICION[i].BMD = Maskbmd_rx43.resolve(array_rx43.TABLA_MEDICION[i].BMD)
        array_rx43.TABLA_MEDICION[i].T_SCORE = MaskScore_rx43.resolve(array_rx43.TABLA_MEDICION[i].T_SCORE)
        array_rx43.TABLA_MEDICION[i].Z_SCORE = MaskScore_rx43.resolve(array_rx43.TABLA_MEDICION[i].Z_SCORE)

        $('#bmd' + numero + '_rx43').val(array_rx43.TABLA_MEDICION[i].BMD)
        $('#tscore' + numero + '_rx43').val(array_rx43.TABLA_MEDICION[i].T_SCORE)
        $('#zscore' + numero + '_rx43').val(array_rx43.TABLA_MEDICION[i].Z_SCORE)
    }

    $('#antecedentes_rx43').val(array_rx43.ANTECEDENTES)
    $('#tratamientos_rx43').val(array_rx43.TRATAMIENTO)
    $('#hallazgos_rx43').val(array_rx43.HALLAZGOS)
    $('#conclusiones_rx43').val(array_rx43.CONCLUSIONES)

    $('#actualizo_rx43').val(array_rx43.ADMI_MODIF)
    $('#fecha_modif_rx43').val(array_rx43.FECHA_MODIF + ' ' + array_rx43.HORA_MODIF)

    $('#transcribio_rx43').val(array_rx43.ADMI_TRANS)
    $('#fecha_transc_rx43').val(array_rx43.FECHA_TRANS + ' - ' + array_rx43.HORA_TRANSC)
    $('#email_rx43').val(array_rx43.EMAIL.trim() + '  - ' + array_rx43.FECHA_EMAIL + ' - ' + array_rx43.HORA_EMAIL)

    $('#imprimir_rx43').show()
    $('#Boton_email_rx43').show()

    loader('hide')
    validarRadiologo_rx43()
}

function salir_rx43() {
    $('#Boton_email_rx43').hide()
    $('#imprimir_rx43').hide()
    _inputControl('reset');
    _inputControl('disabled');
    array_rx43 = []
    profesionales_rx43 = []
    enfermedades_rx43 = []
    macroEvoluciones_rx43 = []
    $('.page-breadcrumb')[1].remove()
    ventanaEstudios_RXLAB()
}

$('#Boton_email_rx43').click(function () {
    set_Event_validar('#validarRadiologo_rx43', 'off')
    $('#radiologo_rx43').attr('disabled', 'true')
    Impresion_RX_43('SI')
})

function envio_email_rx43() {
    if (array_rx43.EMAIL.trim().length == 0) {
        jAlert(
            { titulo: 'Error', mensaje: 'Paciente no tiene email especificado' },
            $('#validarRadiologo_rx43').focus()
        );
    } else {
        let datos_envio = {
            correo_destinatario: array_rx43.EMAIL.trim(),
            sucursal: array_rx43.SUC,
            url_pdf: 'C:\\PROSOFT\\TEMP\\' + array_rx43.NOMBREPDF + '.pdf',
            nombre_paci: array_rx43.DESCRIP_PACI.trim()
        };

        postData(datos_envio, get_url('app/Inc/envio_email_rx.php'))
            .then(data => {
                let URL = get_url("APP/RX/EMAIL.DLL");
                array_rx43.FECHA_EMAIL = moment().format('YYYY/MM/DD')
                array_rx43.HORA_EMAIL = moment().format('HH:mm')
                var fecha_envio = moment(array_rx43.FECHA_EMAIL).format('YYYYMMDD')
                postData({ datosh: datosEnvio() + array_rx43.LLAVE + '|' + fecha_envio + '|' + moment().format('HHmmss') + '|' }, URL)
                    .then(function (data) {
                        console.log(data);
                        loader('hide');
                        $('#email_rx43').val(array_rx43.EMAIL.trim() + '  - ' + array_rx43.FECHA_EMAIL + ' - ' + array_rx43.HORA_EMAIL)
                        CON851('', 'Correo enviado', null, 'success', 'Exitoso');
                        validarRadiologo_rx43()
                    })
                    .catch(err => {
                        console.log(err);
                        CON851('', 'Hora de correo no pudo ser guardada', null, 'error', 'Error');
                        loader("hide")
                        validarRadiologo_rx43()
                    })
            })
            .catch(err => {
                console.log(err)
                CON851('', err, null, 'error', 'Error');
                loader("hide")
                validarRadiologo_rx43()
            });
    }
}

$("#imprimir_rx43").click(function () {
    set_Event_validar('#validarRadiologo_rx43', 'off')
    $('#radiologo_rx43').attr('disabled', 'true')
    Impresion_RX_43('NO')
});

async function Impresion_RX_43(email) {
    loader('show');
    array_rx43.NOMBREPDF = 'RX-' + array_rx43.LLAVE.substring(10, 19) + moment().format('HHmmss') + '.pdf';
    array_rx43.USU = $_USUA_GLOBAL[0].NOMBRE.replace(/\s+/g, ' ');
    array_rx43.NIT = $_USUA_GLOBAL[0].NIT;

    await _impresion2({
        tipo: 'pdf',
        archivo: array_rx43.NOMBREPDF,
        content: _imprimir_RXI03A(array_rx43)
    })
        .then(data => {
            if (email == 'SI') {
                envio_email_rx43()
            } else {
                loader('hide')
                validarRadiologo_rx43()
            }

        })
        .catch(err => {
            console.log(err, 'error')
        })
}

function validarRadiologo_rx43() {
    validarInputs(
        {
            form: "#validarRadiologo_rx43",
            orden: '1',
            event_f3: () => {
                set_Event_validar('#validarRadiologo_rx43', 'off')
                $('#radiologo_rx43').attr('disabled', 'true')
                Impresion_RX_43('NO')
            },
            event_f5: () => {
                set_Event_validar('#validarRadiologo_rx43', 'off')
                $('#radiologo_rx43').attr('disabled', 'true')
                Impresion_RX_43('SI')
            }
        }, () => CON851P('03', validarRadiologo_rx43, salir_rx43),
        function () {
            array_rx43.ID_RADIOLOGO = $('#radiologo_rx43').val().trim()

            var busquedaRad = profesionales_rx43.find(profesional => profesional.IDENTIFICACION == array_rx43.ID_RADIOLOGO)

            if (busquedaRad) {
                $('#descrip1Radiologo_rx43').val(busquedaRad.REG_MEDICO)
                $('#descrip2Radiologo_rx43').val(busquedaRad.NOMBRE)
                array_rx43.REG_RADIOLOGO = busquedaRad.REG_MEDICO
                array_rx43.NOM_RADIOLOGO = busquedaRad.NOMBRE
                $('#Boton_email_rx43').hide()
                $('#imprimir_rx43').hide()
                validarTecnologo_rx43()
            } else {
                $('#descrip1Radiologo_rx43').val('')
                $('#descrip2Radiologo_rx43').val('Profesional no existe o está inactivo')
                CON851('01', '01', null, 'error', 'error');
                validarRadiologo_rx43()
            }

        }
    )
}


function validarTecnologo_rx43() {
    validarInputs(
        {
            form: "#validarTecnologo_rx43",
            orden: '1'
        },
        function () {
            $('#imprimir_rx43').show()
            $('#Boton_email_rx43').show()
            validarRadiologo_rx43()
        },
        function () {
            array_rx43.ID_TECNOLOGO = $('#tecnologo_rx43').val().trim()

            if (array_rx43.ID_TECNOLOGO.trim().length != '') {

                var busquedaTec = profesionales_rx43.find(profesional => profesional.IDENTIFICACION == array_rx43.ID_TECNOLOGO)

                if (busquedaTec) {
                    $('#descripTecnologo_rx43').val(busquedaTec.NOMBRE)
                    array_rx43.NOM_TECNOLOGO = busquedaTec.NOMBRE
                    $('#estatUsu_rx43').val(array_rx43.ESTATURA_USUAL)
                    validarEstatUsu_rx43()
                } else {
                    CON851('01', '01', null, 'error', 'error');
                    $('#descripTecnologo_rx43').val('Profesional no existe o está inactivo')
                    validarTecnologo_rx43()
                }
            } else {
                $('#estatUsu_rx43').val(array_rx43.ESTATURA_USUAL)
                validarEstatUsu_rx43()
            }

        }
    )
}

function validarEstatUsu_rx43() {
    validarInputs(
        {
            form: "#validarEstatUsu_rx43",
            orden: '1'
        }, () => {
            $('#estatUsu_rx43').val(array_rx43.ESTATURA_USUAL + ' CM')
            validarTecnologo_rx43()
        },
        function () {
            array_rx43.ESTATURA_USUAL = cerosIzq($('#estatUsu_rx43').val(), 3)

            $('#estatUsu_rx43').val(array_rx43.ESTATURA_USUAL + ' CM')
            $('#estatAct_rx43').val(array_rx43.ESTATURA_ACTUAL)
            validarEstatAct_rx43()
        }
    )
}

function validarEstatAct_rx43() {
    validarInputs(
        {
            form: "#validarEstatAct_rx43",
            orden: '1'
        }, () => {
            $('#estatUsu_rx43').val(array_rx43.ESTATURA_USUAL)
            $('#estatAct_rx43').val(array_rx43.ESTATURA_ACTUAL + ' CM')
            validarEstatUsu_rx43()
        },
        function () {
            array_rx43.ESTATURA_ACTUAL = cerosIzq($('#estatAct_rx43').val(), 3)

            $('#estatAct_rx43').val(array_rx43.ESTATURA_ACTUAL + ' CM')
            $('#peso_rx43').val(array_rx43.PESO)
            validarPeso_rx43()
        }
    )
}

function validarPeso_rx43() {
    validarInputs(
        {
            form: "#validarPeso_rx43",
            orden: '1'
        }, () => {
            $('#estatAct_rx43').val(array_rx43.ESTATURA_USUAL)
            $('#peso_rx43').val(array_rx43.PESO + ' KG')
            validarEstatAct_rx43()
        },
        function () {
            array_rx43.PESO = Maskpeso_rx43.resolve($('#peso_rx43').val())

            $('#peso_rx43').val(array_rx43.PESO + ' KG')

            if (array_rx43.TEXTO_BMD.trim() == '') $('#textoBmd_rx43').val('BMD (Grs x Cm2)')
            validarTextoBmd_rx43()
        }
    )
}

function validarTextoBmd_rx43() {
    validarInputs(
        {
            form: "#validarTextoBmd_rx43",
            orden: '1',
            event_flecha_abajo: () => validarBmd_rx43(1)
        }, () => {
            $('#peso_rx43').val(array_rx43.PESO)
            validarPeso_rx43()
        },
        function () {
            array_rx43.TEXTO_BMD = espaciosDer($('#textoBmd_rx43').val(), 15)

            validarMedicion_rx43(1)
        }
    )
}

function validarMedicion_rx43(a) {
    validarInputs(
        {
            form: "#columna" + a + "_rx43",
            orden: '1',
            event_flecha_arriba: () => {
                if (a != 1) {
                    validarMedicion_rx43(a - 1)
                } else {
                    validarMedicion_rx43(a)
                }
            },
            event_flecha_abajo: () => {
                if (a != 5) {
                    validarMedicion_rx43(a + 1)
                } else {
                    validarMedicion_rx43(a)
                }
            }
        },
        () => {
            if (a == 1) {
                $('#peso_rx43').val(array_rx43.PESO)
                validarPeso_rx43()
            } else {
                validarMedicion_rx43(a - 1)
            }
        },
        () => {
            array_rx43.TABLA_MEDICION[a - 1].COLUMNA = espaciosDer($('#textoColumna' + a + '_rx43').val(), 30)

            if (array_rx43.TABLA_MEDICION[a - 1].COLUMNA.trim() == '') {
                validarAntecedente_rx43()
            } else {
                validarBmd_rx43(a)
            }
        }
    )
}

function validarBmd_rx43(a) {
    validarInputs(
        {
            form: "#validarBmd" + a + "_rx43",
            orden: '1',
            event_flecha_arriba: () => {
                if (a == 1) {
                    validarTextoBmd_rx43(a - 1)
                } else {
                    validarBmd_rx43(a - 1)
                }
            },
            event_flecha_abajo: () => {
                if (a != 5) {
                    validarBmd_rx43(a + 1)
                } else {
                    validarBmd_rx43(a)
                }
            }
        },
        () => validarMedicion_rx43(a),
        () => {
            array_rx43.TABLA_MEDICION[a - 1].BMD = Maskbmd_rx43.resolve($('#bmd' + a + '_rx43').val())

            $('#bmd' + a + '_rx43').val(array_rx43.TABLA_MEDICION[a - 1].BMD)

            validarTscore_rx43(a)
        }
    )
}

function validarTscore_rx43(a) {
    validarInputs(
        {
            form: "#validarTscore" + a + "_rx43",
            orden: '1',
            event_flecha_arriba: () => {
                if (a != 1) {
                    validarTscore_rx43(a - 1)
                } else {
                    validarTscore_rx43(a)
                }
            },
            event_flecha_abajo: () => {
                if (a != 5) {
                    validarTscore_rx43(a + 1)
                } else {
                    validarTscore_rx43(a)
                }
            }
        },
        () => validarBmd_rx43(a),
        function () {
            array_rx43.TABLA_MEDICION[a - 1].T_SCORE = MaskScore_rx43.resolve($('#tscore' + a + '_rx43').val())

            $('#tscore' + a + '_rx43').val(array_rx43.TABLA_MEDICION[a - 1].T_SCORE)

            validarZscore_rx43(a)
        }
    )
}

function validarZscore_rx43(a) {
    validarInputs(
        {
            form: "#validarZscore" + a + "_rx43",
            orden: '1',
            event_flecha_arriba: () => {
                if (a != 1) {
                    validarZscore_rx43(a - 1)
                } else {
                    validarZscore_rx43(a)
                }
            },
            event_flecha_abajo: () => {
                if (a != 5) {
                    validarZscore_rx43(a + 1)
                } else {
                    validarZscore_rx43(a)
                }
            }
        },
        () => validarTscore_rx43(a),
        () => {
            array_rx43.TABLA_MEDICION[a - 1].Z_SCORE = MaskScore_rx43.resolve($('#zscore' + a + '_rx43').val())

            $('#zscore' + a + '_rx43').val(array_rx43.TABLA_MEDICION[a - 1].Z_SCORE)

            if (a == 5) {
                validarAntecedente_rx43()
            } else {
                validarMedicion_rx43(a + 1)
            }
        }
    )
}

function validarAntecedente_rx43() {
    validarInputs(
        {
            form: "#validarAntecedente_rx43",
            orden: '1'
        },
        function () {
            $('#validarAntecedente_rx43').removeClass('active-text-area')
            validarTecnologo_rx43()
        },
        function () {
            array_rx43.ANTECEDENTES = $('#antecedentes_rx43').val().trim()

            array_rx43.ANTECEDENTES = array_rx43.ANTECEDENTES.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ');

            array_rx43.ANTECEDENTES = array_rx43.ANTECEDENTES.replace(/(\r\n|\n|\r)/gm, "&");

            $('#validarAntecedente_rx43').removeClass('active-text-area')
            validarTratamiento_rx43()
        }
    )
}

function validarTratamiento_rx43() {
    validarInputs(
        {
            form: "#validarTratamiento_rx43",
            orden: '1'
        },
        function () {
            $('#validarTratamiento_rx43').removeClass('active-text-area')
            $('#validarAntecedente_rx43').addClass('active-text-area')
            $(".active-text-area").get(0).scrollIntoView(true);
            validarAntecedente_rx43()
        },
        function () {
            array_rx43.TRATAMIENTO = $('#tratamientos_rx43').val().trim()

            array_rx43.TRATAMIENTO = array_rx43.TRATAMIENTO.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ');

            array_rx43.TRATAMIENTO = array_rx43.TRATAMIENTO.replace(/(\r\n|\n|\r)/gm, "&");

            if (localStorage.Usuario == 'OSTE') {
                $('#validarAntecedente_rx43').removeClass('active-text-area')
                $('#validarTratamiento_rx43').removeClass('active-text-area')
                $('#validarTratamiento_rx43').addClass('active-text-area')
                $(".active-text-area").get(0).scrollIntoView(true);

                validarHallazgo_rx43()
            } else {
                CON851P('01', validarTratamiento_rx43, _grabardatos_rx43);
            }

        }
    )
}

function validarHallazgo_rx43() {
    validarInputs(
        {
            form: "#validarHallazgo_rx43",
            orden: '1'
        },
        function () {
            $('#validarHallazgo_rx43').removeClass('active-text-area')
            $('#validarAntecedente_rx43').addClass('active-text-area')
            $(".active-text-area").get(0).scrollIntoView(true);
            validarTratamiento_rx43()
        },
        function () {
            array_rx43.HALLAZGOS = $('#hallazgos_rx43').val().trim()

            array_rx43.HALLAZGOS = array_rx43.HALLAZGOS.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ');

            array_rx43.HALLAZGOS = array_rx43.HALLAZGOS.replace(/(\r\n|\n|\r)/gm, "&");

            $('#validarTratamiento_rx43').removeClass('active-text-area')
            $('#validarHallazgo_rx43').removeClass('active-text-area')
            $('#validarConclusion_rx43').addClass('active-text-area')
            $(".active-text-area").get(0).scrollIntoView(true);

            validarConclusion_rx43()
        }
    )
}

function validarConclusion_rx43() {
    validarInputs(
        {
            form: "#validarConclusion_rx43",
            orden: '1'
        },
        function () {
            $('#validarConclusion_rx43').removeClass('active-text-area')
            $('#validarTratamiento_rx43').addClass('active-text-area')
            $(".active-text-area").get(0).scrollIntoView(true);

            validarHallazgo_rx43()
        },
        function () {
            array_rx43.CONCLUSIONES = $('#conclusiones_rx43').val().trim()

            array_rx43.CONCLUSIONES = array_rx43.CONCLUSIONES.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ');

            array_rx43.CONCLUSIONES = array_rx43.CONCLUSIONES.replace(/(\r\n|\n|\r)/gm, "&");

            $('#validarConclusion_rx43').removeClass('active-text-area')
            CON851P('01', validarConclusion_rx43, _grabardatos_rx43);
        }
    )
}



function _grabardatos_rx43() {
    loader('show')

    var datos_envio_rx43 = datosEnvio();
    datos_envio_rx43 += array_rx43.LLAVE
    datos_envio_rx43 += '|'
    datos_envio_rx43 += cerosIzq(array_rx43.ID_RADIOLOGO, 10)
    datos_envio_rx43 += '|'
    datos_envio_rx43 += array_rx43.REG_RADIOLOGO
    datos_envio_rx43 += '|'
    datos_envio_rx43 += array_rx43.NOM_RADIOLOGO
    datos_envio_rx43 += '|'
    datos_envio_rx43 += cerosIzq(array_rx43.ID_TECNOLOGO, 10)
    datos_envio_rx43 += '|'
    datos_envio_rx43 += array_rx43.NOM_TECNOLOGO
    datos_envio_rx43 += '|'
    datos_envio_rx43 += array_rx43.ESTATURA_USUAL
    datos_envio_rx43 += '|'
    datos_envio_rx43 += array_rx43.ESTATURA_ACTUAL
    datos_envio_rx43 += '|'
    datos_envio_rx43 += array_rx43.PESO
    datos_envio_rx43 += '|'
    datos_envio_rx43 += array_rx43.TEXTO_BMD
    datos_envio_rx43 += '|'
    datos_envio_rx43 += moment().format("YYYYMMDD")
    datos_envio_rx43 += '|'
    datos_envio_rx43 += moment().format("HHmmss")
    datos_envio_rx43 += '|'
    datos_envio_rx43 += localStorage.Usuario
    datos_envio_rx43 += '|'

    var datos_envio_mediciones = ''
    for (var i in array_rx43.TABLA_MEDICION) {
        datos_envio_mediciones += array_rx43.TABLA_MEDICION[i].COLUMNA
        datos_envio_mediciones += '|'
        datos_envio_mediciones += array_rx43.TABLA_MEDICION[i].BMD
        datos_envio_mediciones += '|'
        datos_envio_mediciones += array_rx43.TABLA_MEDICION[i].T_SCORE
        datos_envio_mediciones += '|'
        datos_envio_mediciones += array_rx43.TABLA_MEDICION[i].Z_SCORE
        datos_envio_mediciones += '|'
    }

    var data = {};
    data['datosh'] = datos_envio_rx43
    data['mediciones'] = datos_envio_mediciones
    data['antecedentes'] = array_rx43.ANTECEDENTES
    data['tratamientos'] = array_rx43.TRATAMIENTO
    data['hallazgos'] = array_rx43.HALLAZGOS
    data['conclusiones'] = array_rx43.CONCLUSIONES

    let URL = get_url("APP/RX/RX-421W-03.DLL");

    postData(data, URL)
        .then((llegada) => {
            loader('hide')
            jAlert(
                { titulo: 'CORRECTO', mensaje: llegada },
                terminar_rx43
            );
        })
        .catch(error => {
            loader('hide')
            CON851('', error, null, 'error', 'Error');
            _toggleNav()
        });
}

function terminar_rx43() {
    _inputControl('reset');
    _inputControl('disabled');
    array_rx43 = []
    traerRxCompleto_rx43()
}