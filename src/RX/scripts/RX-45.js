var global_rx45 = []
var info_consen_rx45 = []
var paciente_rx45 = []

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');

    if (localStorage.Modulo == 'RX') nombreOpcion('4,2 - Aprobar consentimientos por comprobante')
    else nombreOpcion('3,2 - Aprobar consentimientos por comprobante')

    traerDatosConsen_paciente_rx45()
});

function traerDatosConsen_paciente_rx45() {
    postData({ datosh: datosEnvio() + LLAVE_RXLAB_GLOBAL.CUP + '|' }, get_url("APP/RX/RX-44-02.DLL"))
        .then((info) => {
            info_consen_rx45 = info.CONSENCUPS_2[0]

            postData({ datosh: datosEnvio() + LLAVE_RXLAB_GLOBAL.COMPROBANTE + LLAVE_RXLAB_GLOBAL.CUP + '|' }, get_url("APP/RX/RX-45-02.DLL"))
                .then((data) => {
                    global_rx45 = data.CONSENCOMP[0]

                    global_rx45['APROBO_ORIGINAL'] = global_rx45.APROBO
                    $('#suc_rx45').val(LLAVE_RXLAB_GLOBAL.SUC)
                    $('#tipoComprob_rx45').val(LLAVE_RXLAB_GLOBAL.CL)
                    $('#Comprob_rx45').val(LLAVE_RXLAB_GLOBAL.COMPROB)
                    global_rx45['CUP'] = LLAVE_RXLAB_GLOBAL.CUP;
                    $('#cup_rx45').val(global_rx45.CUP)
                    $('#fecha_rx45').val(LLAVE_RXLAB_GLOBAL.FECHA)

                    $('#titulo_rx45').val(info_consen_rx45.TITULO.trim())
                    global_rx45['ENCABEZADO'] = info_consen_rx45.ENCABEZADO.replace(/\&/g, "\n").trim()
                    global_rx45['DESCRIPCION'] = info_consen_rx45.DESCRIPCION.replace(/\&/g, "\n").trim()
                    global_rx45['RIESGOS'] = info_consen_rx45.RIESGOS.replace(/\&/g, "\n").trim()
                    global_rx45['BENEFICIOS'] = info_consen_rx45.BENEFICIOS.replace(/\&/g, "\n").trim()
                    global_rx45['CUP'] = LLAVE_RXLAB_GLOBAL.CUP;
                    global_rx45['ESTUDIO'] = LLAVE_RXLAB_GLOBAL.ESTUDIO;

                    $('#encabConsen_rx45').val(global_rx45.ENCABEZADO.trim())
                    $('#descripEstudio_rx45').val(global_rx45.ESTUDIO.trim())
                    $('#descripConsen_rx45').val(global_rx45.DESCRIPCION.trim())
                    $('#riesgosConsen_rx45').val(global_rx45.RIESGOS.trim())
                    $('#benefConsen_rx45').val(global_rx45.BENEFICIOS.trim())

                    traerDatosPaciente_rx45()
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

function traerDatosPaciente_rx45() {
    postData({ datosh: datosEnvio() + LLAVE_RXLAB_GLOBAL.ID_PACIENTE + '|' }, get_url("APP/RX/RX-PACIENTE.DLL"))
        .then((data) => {
            paciente_rx45 = data.PACIENTE[0]
            global_rx45.TIPO_ID_PACI = paciente_rx45.TIPO_ID_PACI.trim()
            global_rx45.ID_PACI = paciente_rx45.ID_PACI.trim()
            global_rx45.NOMBRE_PACI = paciente_rx45.NOMBRE_PACI.replace(/\�/g, "Ñ").trim()

            global_rx45.TIPO_ID_ACOM = paciente_rx45.TIPO_ID_ACOM.trim()
            global_rx45.ID_ACOM = paciente_rx45.ID_ACOM.trim()
            global_rx45.NOMBRE_ACOM = paciente_rx45.NOMBRE_ACOM.replace(/\�/g, "Ñ").trim()

            $('#nombrePaci_rx45').val(global_rx45.NOMBRE_PACI)
            $('#idPaci_rx45').val(global_rx45.TIPO_ID_PACI + ' ' + global_rx45.ID_PACI.trim())
            $('#nombreAcom_rx45').val(global_rx45.NOMBRE_ACOM)
            $('#idAcom_rx45').val(global_rx45.TIPO_ID_ACOM + ' ' + global_rx45.ID_ACOM.trim())

            if (global_rx45.EXISTE == 'SI') {
                mostrarDatos_rx45()
            } else {
                $('#datos_creacion_rx45').hide()
                $('#datos_modif_rx45').hide()
                loader('hide')
            }
        })
        .catch(error => {
            loader('hide')
            CON851('', error, null, 'error', 'Error');
            _toggleNav()
        });
}

function mostrarDatos_rx45() {
    if (global_rx45.AUTORIZA == 'P') {
        validarChecked('#autorPaci_rx45', "S")
    } else if (global_rx45.AUTORIZA == 'A') {
        validarChecked('#autorAcom_rx45', "S")
    }

    if (global_rx45.APROBO == 'S') {
        validarChecked('#SIaprueba_rx45', "S")
    } else if (global_rx45.APROBO == 'N') {
        validarChecked('#NOaprueba_rx45', "S")
    }

    $('#creacion_rx45').val(global_rx45.OPER_CREA.trim())
    $('#fecha_creacion_rx45').val(global_rx45.FECHA_CREA.trim())
    $('#modifico_rx45').val(global_rx45.OPER_MODIF.trim())
    $('#fecha_modif_rx45').val(global_rx45.FECHA_MODIF.trim())

    loader('hide')
}

$("#abandonar_rx45").click(function () {
    limpiarCampos_rx45()
});

function limpiarCampos_rx45() {
    global_rx45 = []
    info_consen_rx45 = []
    paciente_rx45 = []
    _inputControl('reset');
    _inputControl('disabled');
    $('.page-breadcrumb')[1].remove()
    global_rx45 = []
    info_consen_rx45 = []
    ventanaEstudios_RXLAB()
}


$("#continuar_rx45").click(function () {
    evaluarRevoco_rx45()
});

$("#autorPaci_rx45").click(function () {
    switch (paciente_rx45.TIPO_ID_PACI.trim()) {
        case 'RC':
        case 'TI':
        case 'MSI':
            // REGISTRO CIVIL, TARJETA IDENTIDAD, MENOR SIN IDENTIFICAR
            CON851('', 'Paciente menor de edad!', null, 'error', 'error')
            validarChecked('#autorPaci_rx45', "N")
            break;
        default:
            if ($("#autorAcom_rx45").prop('checked')) validarChecked('#autorAcom_rx45', "N")
            global_rx45.AUTORIZA = 'P'
            break;
    }
})

$("#autorAcom_rx45").click(function () {
    if (paciente_rx45.ID_ACOM.trim() == '') {
        CON851('', 'Acompañante no especificado', null, 'error', 'error')
        validarChecked('#autorAcom_rx45', "N")
    } else {
        switch (paciente_rx45.TIPO_ID_ACOM.trim()) {
            case 'RC':
            case 'TI':
            case 'MSI':
                // REGISTRO CIVIL, TARJETA IDENTIDAD, MENOR SIN IDENTIFICAR
                CON851('', 'Acompañante menor de edad!', null, 'error', 'error')
                validarChecked('#autorAcom_rx45', "N")
                break;
            default:
                if ($("#autorPaci_rx45").prop('checked')) validarChecked('#autorPaci_rx45', "N")
                global_rx45.AUTORIZA = 'A'
                break;
        }
    }
})

$("#SIaprueba_rx45").click(function () {
    if ($("#NOaprueba_rx45").prop('checked')) validarChecked('#NOaprueba_rx45', "N")
    global_rx45.APROBO = 'S'
})

$("#NOaprueba_rx45").click(function () {
    if ($("#SIaprueba_rx45").prop('checked')) validarChecked('#SIaprueba_rx45', "N")
    global_rx45.APROBO = 'N'
})

function evaluarRevoco_rx45() {
    if (global_rx45.APROBO_ORIGINAL == 'S' && global_rx45.APROBO == 'N') {

        CON851P('consen', console.log('atras'), () => {
            global_rx45.REVOCO = 'S'
            capturarFirma_rx45()
        })
    } else {
        capturarFirma_rx45()
    }
}

function capturarFirma_rx45() {

    if ($("#autorPaci_rx45").prop('checked') == false && $("#autorAcom_rx45").prop('checked') == false) {
        CON851('', 'Persona que autoriza sin seleccionar', null, 'error', 'error')

    } else if ($("#SIaprueba_rx45").prop('checked') == false && $("#NOaprueba_rx45").prop('checked') == false) {
        CON851('', 'Autorizacion sin seleccionar', null, 'error', 'error')

    } else if (global_rx45.EXISTE == 'NO') {
        jAlert(
            { titulo: 'Espera..', mensaje: 'Prosiga a firmar persona que autoriza' },
            guardarDatos_rx45
        );
    } else {
        guardarDatos_rx45()
    }
}

function guardarDatos_rx45() {
    loader('show')
    if (global_rx45.EXISTE == 'NO') global_rx45.FECHA_CREA = moment().format('YYYYMMDD')
    if (global_rx45.REVOCO == 'S' && global_rx45.APROBO == 'S') global_rx45.REVOCO = 'N'

    var datos_Envio = datosEnvio()
    datos_Envio += global_rx45.LLAVE.trim()
    datos_Envio += '|'
    datos_Envio += global_rx45.TIPO_ID_PACI.trim()
    datos_Envio += '|'
    datos_Envio += cerosIzq(global_rx45.ID_PACI.trim(), 15)
    datos_Envio += '|'
    datos_Envio += global_rx45.NOMBRE_PACI.trim()
    datos_Envio += '|'
    datos_Envio += global_rx45.AUTORIZA.trim()
    datos_Envio += '|'
    datos_Envio += global_rx45.TIPO_ID_ACOM.trim()
    datos_Envio += '|'
    datos_Envio += cerosIzq(global_rx45.ID_ACOM.trim(), 15)
    datos_Envio += '|'
    datos_Envio += global_rx45.NOMBRE_ACOM
    datos_Envio += '|'
    datos_Envio += global_rx45.APROBO.trim()
    datos_Envio += '|'
    datos_Envio += moment().format('YYYYMMDD')
    datos_Envio += '|'
    datos_Envio += localStorage.Usuario
    datos_Envio += '|'
    datos_Envio += global_rx45.REVOCO
    datos_Envio += '|'

    postData({
        datosh: datos_Envio
    }, get_url("APP/RX/RX-45-03.DLL"))
        .then((data) => {
            loader('hide')
            jAlert(
                { titulo: 'CORRECTO', mensaje: data },
                () => {
                    global_rx45['TITULO'] = info_consen_rx45.TITULO.trim()
                    global_rx45['ENCABEZADO'] = info_consen_rx45.ENCABEZADO.replace(/\&/g, "<br>").trim()
                    global_rx45['DESCRIPCION'] = info_consen_rx45.DESCRIPCION.replace(/\&/g, "<br>").trim()
                    global_rx45['RIESGOS'] = info_consen_rx45.RIESGOS.replace(/\&/g, "<br>").trim()
                    global_rx45['BENEFICIOS'] = info_consen_rx45.BENEFICIOS.replace(/\&/g, "<br>").trim()
                    // limpiarCampos_rx45();
                    global_rx45.NIT = $_USUA_GLOBAL[0].NIT;
                    let datos_envio = {
                        ...global_rx45
                    };
                    let nombrepdf = localStorage.getItem('Usuario') + '-' + moment().format('YYMMDDHHmmss') + '.pdf';
                    imprimir({ datos: datos_envio, tipo: 'pdf', formato: 'rx/RX-CONSEN.html', nombre: nombrepdf, modulo: 'RX' }, ()=>{
                        global_rx45 = []
                        info_consen_rx45 = []
                        ventanaEstudios_RXLAB()
                        $('.page-breadcrumb')[1].remove()
                    });
                }
            );
        })
        .catch(error => {
            loader('hide')
            CON851('', error, null, 'error', 'Error');
            $('.page-breadcrumb')[1].remove()
            global_rx45 = []
            info_consen_rx45 = []
            ventanaEstudios_RXLAB()
        });
}