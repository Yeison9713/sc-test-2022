var SER110CCR = [];

$(document).ready(function () {
    SER110CCR.NOVEDAD = '';
    SER110CCR.OPERCORRE = '';
    SER110CCR.HORACORRE = '';
    SER110CCR.OBSERVACIONES = '';
    nombreOpcion('- CORRESPONSALIA PACIENTES');
    _inputControl('reset');
    _inputControl('disabled');
    SER110CCR.IDLNK = '';
    SER110CCR.FECHASIG = moment().format('YYYYMMDD');
    SER110CCR.ANOSIG = SER110CCR.FECHASIG.substring(0, 4);
    SER110CCR.MESSIG = SER110CCR.FECHASIG.substring(4, 6);
    SER110CCR.DIASIG = SER110CCR.FECHASIG.substring(6, 8);
    SER110CCR.HORAACTUAL = moment().format('HHmm');
    SER110CCR.HRACTUAL = SER110CCR.HORAACTUAL.substring(0, 2);
    SER110CCR.MNACTUAL = SER110CCR.HORAACTUAL.substring(2, 4);

    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    _toggleF8([
        { input: 'cliente', app: '110CCR', funct: _ventanaPacientes_SER110CCR },

    ]);
    _validacionesinicio_SER110CCR();
});

function _ventanaPacientes_SER110CCR(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'PACIENTES',
            valoresselect: ['Nombre del paciente'],
            f8data: 'PACIENTES',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }],
            callback: (data) => {
                document.querySelector("#cliente_110CCR").value = data.COD;
                _enterInput('#cliente_110CCR');
            },
            cancel: () => {
                _enterInput('#cliente_110CCR')
            }
        };
        F8LITE(parametros);
    }
}

function _validacionesinicio_SER110CCR() {
    let Window = BrowserWindow.getAllWindows();
    if (Window.length > 1) {
        $('#cliente_110CCR').val($_MESSAGE[2].cedula);
        _datocliente_SER110CCR();
    } else {
        _datocliente_SER110CCR();
    }
}

function _datocliente_SER110CCR() {
    $('#ano_110CCR').val(SER110CCR.ANOSIG);
    $('#mes_110CCR').val(SER110CCR.MESSIG);
    $('#dia_110CCR').val(SER110CCR.DIASIG);
    $('#hora_110CCR').val(SER110CCR.HRACTUAL);
    $('#minuto_110CCR').val(SER110CCR.MNACTUAL);
    SER110CCR.FECHACORRE = SER110CCR.FECHASIG;
    SER110CCR.HORACORRE = SER110CCR.HORAACTUAL;
    SER110CCR.SECCORRE = SER110CCR.HRACTUAL;
    validarInputs(
        {
            form: "#CLIENTE_SER110CCR",
            orden: '1'
        },
        () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        },
        () => {
            SER110CCR.CODPACIW = $('#cliente_110CCR').val();
            SER110CCR.CODPACIW = SER110CCR.CODPACIW.padStart(15, '0')
            $('#cliente_110CCR').val(SER110CCR.CODPACIW);
            if ((SER110CCR.CODPACIW.trim() == '') || (SER110CCR.CODPACIW == '000000000000000')) {
                CON851('02', '02', null, 'error', 'Error');
                _datocliente_SER110CCR();
            } else {
                let datos_envio = datosEnvio() + SER110CCR.CODPACIW + '|';
                SolicitarDll({ datosh: datos_envio }, dato => {
                    var date = dato.split("|");
                    var SWINVALID = date[0];
                    SER110CCR.DECRIPPACIW = date[4].trim();
                    SER110CCR.TELPACIW = date[14].trim();
                    SER110CCR.DIRPACIW = date[13].trim();
                    SER110CCR.NOMCIUPACIW = date[17].trim();
                    if (SWINVALID == '00') {
                        $('#descripclient_110CCR').val(SER110CCR.DECRIPPACIW);
                        $('#telefono_110CCR').val(SER110CCR.TELPACIW);
                        $('#direccion_110CCR').val(SER110CCR.DIRPACIW);
                        $('#ciudad_110CCR').val(SER110CCR.NOMCIUPACIW);
                        if (($_ADMINW == 'ADMI') || ($_ADMINW == 'GEBC') || ($_ADMINW == '0101')) {
                            _aceptarmes_SER110CCR();
                        } else {
                            _buscarcorresponsalia_SER110CCR();
                        }

                    } else if (SWINVALID == '01') {
                        CON851('01', '01', null, 'error', 'error');
                        _datocliente_SER110CCR()
                    } else {
                        let Window = BrowserWindow.getAllWindows();
                        if (Window.length > 1) {
                            _cerrarSegundaVentana();
                        } else {
                            _toggleNav()
                        };
                    }
                }, get_url('APP/SALUD/SER110C_03.DLL'));
            }
        }
    )
}

function _aceptarmes_SER110CCR() {
    validarInputs(
        {
            form: "#MES_SER110CCR",
            orden: '1'
        },
        () => { _datocliente_SER110CCR(); },
        () => {
            SER110CCR.MESACT = $('#mes_110CCR').val();
            if (SER110CCR.MESACT.trim() == '') {
                _aceptarmes_SER110CCR();
            } else if ((SER110CCR.MESACT < 01) || (SER110CCR.MESACT > 12)) {
                _aceptarmes_SER110CCR();
            } else {
                _aceptardia_SER110CCRT();
            }
        }
    )
}


function _aceptardia_SER110CCRT() {
    validarInputs(
        {
            form: "#DIA_SER110CCR",
            orden: '1'
        },
        () => { _aceptarmes_SER110CCR(); },
        () => {
            SER110CCR.DIAACT = $('#dia_110CCR').val();
            if (SER110CCR.DIAACT.trim() == '') {
                _aceptardia_SER110CCRT();
            } else if ((SER110CCR.DIAACT < 01) || (SER110CCR.DIAACT > 31)) {
                _aceptardia_SER110CCRT();
            } else {
                _aceptarhora_SER110CCRT();
            }
        }
    )
}

function _aceptarhora_SER110CCRT() {
    validarInputs(
        {
            form: "#HORA_SER110CCR",
            orden: '1'
        },
        () => { _aceptardia_SER110CCRT(); },
        () => {
            SER110CCR.HRACT = $('#hora_110CCR').val();
            if ((SER110CCR.HRACT.trim() == '') || (SER110CCR.HRACT > 23)) {
                _aceptarhora_SER110CCRT();
            } else {
                _aceptarminutos_SER110CCRT();
            }
        }
    )
}
function _aceptarminutos_SER110CCRT() {
    validarInputs(
        {
            form: "#MINUT_SER110CCR",
            orden: '1'
        },
        () => { _aceptarhora_SER110CCRT(); },
        () => {
            SER110CCR.MNACT = $('#minuto_110CCR').val();
            if ((SER110CCR.MNACT.trim() == '') || (SER110CCR.MNACT > 59)) {
                _aceptarminutos_SER110CCRT();
            } else {
                _buscarcorresponsalia_SER110CCR();
            }
        }
    )
}

function _buscarcorresponsalia_SER110CCR() {

    let URL = get_url("APP/SALUD/SER110CCR.DLL");
    postData({ datosh: datosEnvio() + '1|' + SER110CCR.NOVEDAD + '|' + SER110CCR.CODPACIW + '|' + SER110CCR.FECHACORRE + '|' + SER110CCR.SECCORRE + '|' + SER110CCR.OPERCORRE + '|' + SER110CCR.HORACORRE + '|' + SER110CCR.OBSERVACIONES + '|' }, URL)
        .then(data => {
            var data = data.split("|");
            SWINVALID = data[0].trim();
            SER110CCR.FECHACORREGRABADA = data[1];
            if (SWINVALID == '00') {
                SER110CCR.NOVEDAD = '8';
                CON851('', 'ACTUALIZANDO', null, 'warning', 'Advertencia');
                jAlert({ titulo: 'Atencion! ', mensaje: 'Ese cliente ya tiene corresponsalia abierta, con fecha ' + SER110CCR.FECHACORREGRABADA }, _consultadecorresponsalida_SER110CCR);

            } else if (SWINVALID == '08') {
                SER110CCR.NOVEDAD = '7';
                CON851('', 'CREANDO', null, 'warning', 'Advertencia');
                _consultadecorresponsalida_SER110CCR();
            }

        })
        .catch(err => {
            console.debug(err, 'error q visualiza');
            _consultadecorresponsalida_SER110CCR()
        })
}

function _consultadecorresponsalida_SER110CCR() {
    console.log('START DE CORRESPONSALIA', SER110CCR.FECHACORRE)
    let URL = get_url("APP/SALUD/SER110CCR_01.DLL");
    postData({ datosh: datosEnvio() + SER110CCR.FECHACORRE + '|' }, URL)
        .then(data => {
            console.log(data, 'se encuentra corresponsalia')
            SER110CCR.CORRESPONSALIA = data['CORRESPOND'];

            SER110CCR.IDCORRECW = SER110CCR.CORRESPONSALIA[0].ID_CORREC;
            SER110CCR.FECHACORRE = SER110CCR.CORRESPONSALIA[0].FECHA_CORREC;
            SER110CCR.HORACORRE = SER110CCR.CORRESPONSALIA[0].HORA_CORREC;
            SER110CCR.OPERCORRE = SER110CCR.CORRESPONSALIA[0].OPER_CORREC;
            if (SER110CCR.IDCORRECW == SER110CCR.CODPACIW) {
                console.log('igual la cedula')
                _mostrarcorresponsalia_SER110CCR();
            } else {
                _datoobservacion_SER110CCR();
            }
        })
        .catch(err => {
            console.log('No se encontraron notas de corresponsalia')
            _datoobservacion_SER110CCR();
        });
}
function _mostrarcorresponsalia_SER110CCR() {
    console.log('montar la corresponsalia');

}


function _datoobservacion_SER110CCR() {
    
    validarInputs({
        form: '#OBSERVACIONES_SER110CCR',
        orden: '1'
    },
        () => { _datocliente_SER110CCR() },
        () => {
            SER110CCR.OBSERVACIONES = $('#observaciones_110CCR').val().padEnd(5700, ' ');

            // console.log(SER110CCR.LINEAS.LIN001, 'LINEA DE OBSERVACION', SER110CCR.LINEAS)
            SER110CCR.OPERCORRE = $_ADMINW;
            var datos_envio_SER110CCR = datosEnvio();
            datos_envio_SER110CCR += '2|'
            datos_envio_SER110CCR += SER110CCR.NOVEDAD
            datos_envio_SER110CCR += '|'
            datos_envio_SER110CCR += SER110CCR.CODPACIW
            datos_envio_SER110CCR += '|'
            datos_envio_SER110CCR += SER110CCR.FECHACORRE
            datos_envio_SER110CCR += '|'
            datos_envio_SER110CCR += SER110CCR.SECCORRE
            datos_envio_SER110CCR += '|'
            datos_envio_SER110CCR += SER110CCR.OPERCORRE
            datos_envio_SER110CCR += '|'
            datos_envio_SER110CCR += SER110CCR.HORACORRE
            datos_envio_SER110CCR += '|';

            var data = {};
            data['datosh'] = datos_envio_SER110CCR

            var posicion = 0
            var contadorLin = 0
            var contadorTotal = 0
            var linea = ''
            var maximo = 90

            SER110CCR.OBSERVACIONES.split('').forEach(function (item, i) {
                contadorTotal = i + 1
                contadorLin = contadorLin + 1

                switch (item) {
                    case 'á':
                    case 'é':
                    case 'í':
                    case 'ó':
                    case 'ú':
                    case 'Á':
                    case 'É':
                    case 'Í':
                    case 'Ó':
                    case 'Ú':
                    case 'ñ':
                    case 'Ñ':
                    case '!':
                    case '"':
                    case '#':
                    case '$':
                    case '%':
                    case '/':
                    case '(':
                    case ')':
                    case '=':
                    case '?':
                    case '*':
                    case '+':
                    case '-':
                    case '@':
                    case '>':
                    case '<':
                        maximo = maximo + 1
                        break;
                }
                linea += item

                if (contadorLin == maximo || SER110CCR.OBSERVACIONES.length == contadorTotal) {
                    posicion = posicion + 1

                    data["LIN-" + posicion.toString().padStart(3, "0")] = linea
                    contadorLin = 0
                    linea = ''
                    maximo = 90
                }
            })
            loader('show')
            console.log(data, 'enviar datos')
            let URL = get_url("APP/SALUD/SER110CCR.DLL");

            postData(data, URL)
                .then((llegada) => {
                    console.log(llegada, 'respuesta final')
                    loader('hide')
                    let Window = BrowserWindow.getAllWindows();
                    if (Window.length > 1) {
                        _cerrarSegundaVentana();
                    } else {
                        _toggleNav()
                    };
                })
                .catch(error => {
                    loader('hide')
                    let Window = BrowserWindow.getAllWindows();
                    if (Window.length > 1) {
                        _cerrarSegundaVentana();
                    } else {
                        _toggleNav()
                    };
                });
        }
    )
}

