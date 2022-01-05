var global_rx46 = []
var info_consen_rx46 = []

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');

    traerDatosConsen_paciente_rx46()
});

function traerDatosConsen_paciente_rx46() {
    postData({ datosh: datosEnvio() + LLAVE_RXLAB_GLOBAL.CUP + '|' }, get_url("APP/RX/RX-44-02.DLL"))
        .then((info) => {
            info_consen_rx46 = info.CONSENCUPS_2[0]

            postData({ datosh: datosEnvio() + LLAVE_RXLAB_GLOBAL.COMPROBANTE + LLAVE_RXLAB_GLOBAL.CUP + '|' }, get_url("APP/RX/RX-45-02.DLL"))
                .then((data) => {
                    global_rx46 = data.CONSENCOMP[0]

                    $('#suc_rx46').val(LLAVE_RXLAB_GLOBAL.SUC)
                    $('#tipoComprob_rx46').val(LLAVE_RXLAB_GLOBAL.CL)
                    $('#Comprob_rx46').val(LLAVE_RXLAB_GLOBAL.COMPROB)
                    global_rx46['CUP'] = LLAVE_RXLAB_GLOBAL.CUP;
                    $('#cup_rx46').val(global_rx46.CUP)
                    $('#fecha_rx46').val(LLAVE_RXLAB_GLOBAL.FECHA)

                    global_rx46['ESTUDIO'] = LLAVE_RXLAB_GLOBAL.ESTUDIO;
                    global_rx46['TITULO'] = info_consen_rx46.TITULO.trim()
                    global_rx46['ENCABEZADO'] = info_consen_rx46.ENCABEZADO.replace(/\&/g, "<br>").trim()
                    global_rx46['DESCRIPCION'] = info_consen_rx46.DESCRIPCION.replace(/\&/g, "<br>").trim()
                    global_rx46['RIESGOS'] = info_consen_rx46.RIESGOS.replace(/\&/g, "<br>").trim()
                    global_rx46['BENEFICIOS'] = info_consen_rx46.BENEFICIOS.replace(/\&/g, "<br>").trim()
                    global_rx46.NIT = $_USUA_GLOBAL[0].NIT;
                    let nombrepdf = localStorage.getItem('Usuario') + '-' + moment().format('YYMMDDHHmmss') + '.pdf';
                    loader('hide')
                    imprimir({ datos: global_rx46, tipo: 'pdf', formato: 'rx/RX-CONSEN.html', nombre: nombrepdf, modulo: 'RX' }, () => {
                        global_rx46 = []
                        info_consen_rx46 = []
                        ventanaEstudios_RXLAB()
                    });
                })
                .catch(error => {
                    loader('hide')
                    CON851('', error, null, 'error', 'Error');
                    global_rx46 = []
                    info_consen_rx46 = []
                    ventanaEstudios_RXLAB()
                });
        })
        .catch(error => {
            loader('hide')
            CON851('', error, null, 'error', 'Error');
            global_rx46 = []
            info_consen_rx46 = []
            ventanaEstudios_RXLAB()
        });
}


