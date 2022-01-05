var global_lab105 = [];

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');

    if (localStorage.Modulo == 'HIC') {
        nombreOpcion('7,3 - Consultar resultados lab')
    } else {
        nombreOpcion('5,1 - Consultar resultados examen')
    }

    $('#imprimir_lab105').hide()
    $('#salir_lab105').hide()
    traerResulCompleto_lab105()
});

function traerResulCompleto_lab105() {
    var datos_envio = datosEnvio() + LLAVE_RXLAB_GLOBAL.COMPROBANTE + '|' + LLAVE_RXLAB_GLOBAL.CUP + '|' + LLAVE_RXLAB_GLOBAL.ITEM + '|'
    let URL = get_url("APP/LAB/LAB102.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(function (data) {
            global_lab105 = data.RESULTADOS_LAB[0]
            global_lab105['SUC'] = LLAVE_RXLAB_GLOBAL.SUC
            global_lab105['CL'] = LLAVE_RXLAB_GLOBAL.CL
            global_lab105['COMPROB'] = LLAVE_RXLAB_GLOBAL.COMPROB
            global_lab105['CUP'] = LLAVE_RXLAB_GLOBAL.CUP
            global_lab105['ID_PACI'] = LLAVE_RXLAB_GLOBAL.ID_PACIENTE

            global_lab105.CONCLUSIONES = global_lab105.CONCLUSIONES.replace(/\&/g, "\n").trim()
            global_lab105.HALLAZGOS = global_lab105.HALLAZGOS.replace(/\&/g, "\n").trim()

            global_lab105.CONCLUSIONES = global_lab105.CONCLUSIONES.replace(/\�/g, "ñ").trim()
            global_lab105.HALLAZGOS = global_lab105.HALLAZGOS.replace(/\�/g, "ñ").trim()

            global_lab105.DESCRIP_PACI = global_lab105.DESCRIP_PACI.replace(/\�/g, "Ñ").trim()

            $('#suc_lab105').val(global_lab105.SUC)
            $('#tipoComprob_lab105').val(global_lab105.CL)
            $('#Comprob_lab105').val(global_lab105.COMPROB)
            $('#cup_lab105').val(global_lab105.CUP)
            $('#fecha_lab105').val(global_lab105.FECHA)
            mostrarDatos_lab105()
        })
        .catch(err => {
            console.error(err)
            loader("hide")
            salir_lab105()
        })
}

function mostrarDatos_lab105() {
    if (global_lab105.REGISTRO_ESCRITO == ' ') {
        if (localStorage.Modulo == 'HIC') {
            jAlert(
                { titulo: 'ADVERTENCIA!', mensaje: 'Registro no se ha llenado!, Ingrese por modulo laboratorios opcion 2' },
                salir_lab105
            )
        } else {
            jAlert(
                { titulo: 'ADVERTENCIA!', mensaje: 'Registro no se ha llenado!, Ingrese por la opcion 2' },
                salir_lab105
            )
        }
    } else {
        $('#descripCup_lab105').val(global_lab105.DESCRIP_CUP.trim())

        $('#paciente_lab105').val(global_lab105.ID_HISTORIA.trim())
        $('#descripPaciente_lab105').val(global_lab105.DESCRIP_PACI.trim())

        $('#bacteriologo_lab105').val(global_lab105.ID_MEDICO.trim())

        $('#descrip1Bacteriologo_lab105').val(global_lab105.REG_MEDICO)
        $('#descrip2Bacteriologo_lab105').val(global_lab105.NOMBRE_MEDICO)


        $('#factura_lab105').val(global_lab105.CTA.trim())
        $('#entidad_lab105').val(global_lab105.ID_ENTIDAD)
        $('#descripEntidad_lab105').val(global_lab105.NOM_ENTIDAD.trim())

        $('#creacion_lab105').val(global_lab105.ADMI_CREA)
        $('#fecha_creacion_lab105').val(global_lab105.FECHA_CREA + ' - ' + global_lab105.HORA_CREA)

        $('#modifico_lab105').val(global_lab105.ADMI_MODIF)
        $('#fecha_modif_lab105').val(global_lab105.FECHA_MODIF + ' ' + global_lab105.HORA_MODIF)

        var grupo = global_lab105.CUP.slice(0, 2)
        if (grupo == '90' || grupo == '91') {
            $('#box_hallazConclu_lab105').hide()
        } else {
            $('#hallazgos_lab105').val(global_lab105.HALLAZGOS)
            $('#conclusiones_lab105').val(global_lab105.CONCLUSIONES)
        }

        for (var i in global_lab105.ADJUNTOS) {
            if (global_lab105.ADJUNTOS[i].trim() != '') {
                $('#adjuntar_lab105').append(''
                    + `<a onclick="aperturaAdjunto_lab105('${global_lab105.ADJUNTOS[i].trim()}')"> ${global_lab105.ADJUNTOS[i].trim()}</a><br>`
                )
            }
        }

        montarTabla_lab105()
    }
}

function aperturaAdjunto_lab105(nombre) {
    var ruta = "D:\\WEB\\ADJUNTOS\\"

    child('start ' + ruta + nombre, (error, data) => {
        console.log(error, data)
    })

}

function montarTabla_lab105() {
    $("#tabla_lab105 tbody").empty()
    for (var i in global_lab105.TABLA) {
        var item = Number(i) + 1
        $('#tabla_lab105 tbody').append(''
            + '<tr>'
            + '   <td class="col-md-1" style="text-align:center">' + item + '</td>'
            + '   <td class="col-md-3">' + global_lab105.TABLA[i].TITULO.trim() + '</td>'
            + '   <td class="col-md-6">' + global_lab105.TABLA[i].RESULTADO.trim() + '</td>'
            + '   <td class="col-md-1" style="text-align:center">' + global_lab105.TABLA[i].MEDIDA.trim() + '</td>'
            + '   <td class="col-md-1" style="text-align:center">' + global_lab105.TABLA[i].PLANTILLA.trim() + '</td>'
            + '</tr>'
        )
    }
    loader('hide')

    $('#imprimir_lab105').show()
    $('#salir_lab105').show()

}

function salir_lab105() {
    $('#imprimir_lab105').hide()
    $('#salir_lab105').hide()
    _inputControl('reset');
    _inputControl('disabled');
    global_lab105 = []
    profesionales_lab105 = []
    let Window = BrowserWindow.getAllWindows();
    if (Window.length == 1) {
        $('.page-breadcrumb')[1].remove()
    }
    ventanaEstudios_RXLAB()
}

$("#imprimir_lab105").click(function () {
    Impresion_lab105()
});

$("#salir_lab105").click(function () {
    salir_lab105()
});

async function Impresion_lab105() {
    loader('show');

    if (parseInt(LLAVE_RXLAB_GLOBAL.ITEM) > 1) {
        var item = cerosIzq(LLAVE_RXLAB_GLOBAL.ITEM, 2);
        global_lab105.NOMBREPDF = 'LAB-' + global_lab105.LLAVE.substring(0, 9) + "-" + item;
    } else {
        global_lab105.NOMBREPDF = 'LAB-' + global_lab105.LLAVE.substring(0, 9);
    }

    await _impresion2({
        tipo: 'pdf',
        archivo: global_lab105.NOMBREPDF + '.pdf',
        content: await _imprimirLab102(global_lab105),
    }).then((data) => {
        loader('hide');
    }).catch(err => {
        console.error(err);
        loader('hide');
    })
}

function terminar_lab105() {
    _inputControl('reset');
    _inputControl('disabled');
    global_lab105 = []
    traerResulCompleto_lab105()
}