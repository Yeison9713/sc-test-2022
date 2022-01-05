var $_Noved_CER101

var global_CER101 = []
// var terceros_CER101 = []
var carros_CER101 = []

var conductorMask = IMask($('#conductor_CER101')[0], { mask: Number, padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });
var propietarioMask = IMask($('#propietario_CER101')[0], { mask: Number, padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });

var momentFormat = 'YYYY/MM/DD'
var momentMaskFechaCrea = new IMask($("#fechaCrea_CER101")[0], {
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

var momentMaskFechaModif = new IMask($("#fechaModif_CER101")[0], {
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

function _ventanaPlacas_CER101(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'CONSULTA DE CARROS POR PLACA',
            columnas: ["PLACA", "PROPIETARIO", "MARCA"],
            data: carros_CER101,
            ancho: '60%',
            callback_esc: function () {
                $('#placa_CER101').focus()
            },
            callback: function (data) {
                $('#placa_CER101').val(data.PLACA.trim())
                _enterInput('#placa_CER101');
            }
        });
    }
}

function _tercerosConduc_CER101(e) {
    console.log(e.which)
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'TERCEROS',
            valoresselect: ['Buscar por nombre tercero'],
            f8data: 'TERCEROS',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
            callback: (data) => {
                conductorMask.typedValue = data.COD
                console.log(conductorMask.unmaskedValue)
                _enterInput('#conductor_CER101');
            },
            cancel: () => {
                $('#conductor_CER101').focus()
                // _enterInput('#conductor_CER101');
            }
        };
        F8LITE(parametros);
    }
}

function _tercerosPropie_CER101(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'TERCEROS',
            valoresselect: ['Buscar por nombre tercero'],
            f8data: 'TERCEROS',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
            callback: (data) => {
                propietarioMask.typedValue = data.COD
                console.log(propietarioMask.unmaskedValue)
                _enterInput('#propietario_CER101');
            },
            cancel: () => {
                $('#propietario_CER101').focus()
            }
        };
        F8LITE(parametros);
    }
}

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    loader('show');
    _toggleF8([
        { input: 'conductor', app: 'CER101', funct: _tercerosConduc_CER101 },
        { input: 'propietario', app: 'CER101', funct: _tercerosPropie_CER101 },
        { input: 'placa', app: 'CER101', funct: _ventanaPlacas_CER101 }
    ]);
    obtenerDatosCompletos({ nombreFd: 'CARROS' }, data => {
        carros_CER101 = data.CARROS
        carros_CER101.pop()
        loader('hide');
        CON850(_NovedadCER101)
    })
});

function recibirCarros_CER101(data) {
    carros_CER101 = data.CARROS
    carros_CER101.pop()
    console.log(carros_CER101)
    obtenerDatosCompletos({ nombreFd: 'TERCEROS' }, data => {
        terceros_CER101 = data.TERCEROS;
        terceros_CER101.pop();
        console.log(terceros_CER101)
        CON850(_NovedadCER101)
    }, "OFF")
}

function _NovedadCER101(novedad) {
    let Window = BrowserWindow.getAllWindows();
    if (Window.length > 1) {
        $('#placa_CER101').val($_MESSAGE[2].placa)
    }
    $_Noved_CER101 = novedad.id;
    switch ($_Noved_CER101) {
        case '7':
        case '8':
        case '9':
            validarPlaca_CER101()
            break;
        case 'F':
            limpiarCamposCER101();
            break;
    }
    $('#novSerCER101').val(novedad.id + ' - ' + novedad.descripcion)
}

function validarPlaca_CER101() {
    validarInputs(
        {
            form: '#validarPlaca_CER101',
            orden: '1'
        },
        function () {
            CON850(_NovedadCER101)
        },
        function () {
            var placaDig = espaciosDer($('#placa_CER101').val(), 6)
            if (placaDig.length < 5) {
                CON851('01', 'MINIMO CINCO CARACTERES', null, 'error', 'error')
                validarPlaca_CER101()
            } else {
                var busqueda = carros_CER101.find(placa => placa.PLACA == placaDig)
                if (!busqueda) {
                    switch ($_Noved_CER101) {
                        case '7':
                            global_CER101['PLACA'] = placaDig
                            global_CER101['MARCA'] = ''
                            global_CER101['SERV'] = ''
                            global_CER101['CONDUCTOR'] = ''
                            global_CER101['NOMBRE_CONDUCTOR'] = ''
                            global_CER101['PROPIETARIO'] = ''
                            global_CER101['NOMBRE_PROPIETARIO'] = ''
                            global_CER101['TELEFONO'] = ''
                            validarMarca_CER101()
                            break;
                        case '8':
                        case '9':
                            CON851('01', '01', null, 'error', 'error')
                            validarPlaca_CER101()
                            break;
                    }
                } else {
                    switch ($_Noved_CER101) {
                        case '7':
                            CON851('00', '00', null, 'error', 'error')
                            validarPlaca_CER101()
                            break;
                        case '8':
                            global_CER101 = busqueda
                            mostrarDatos_CER101()
                            validarMarca_CER101()
                            break;
                        case '9':
                            global_CER101 = busqueda
                            mostrarDatos_CER101()
                            CON851P('54', validarPlaca_CER101, grabarRegistro_CER101)
                            break;
                    }
                }
            }
        }
    )
}

function mostrarDatos_CER101() {
    $('#marca_CER101').val(global_CER101.MARCA.trim())
    var descrip
    switch (global_CER101.SERV) {
        case '1': descrip = 'PARTICULAR'
            break;
        case '2': descrip = 'PUBLICO'
            break;
        case '3': descrip = 'OFICIAL'
            break;
        case '4': descrip = 'DE EMERGENCIA'
            break;
        case '5': descrip = 'DIPLOMATICO'
            break;
        case '6': descrip = 'TRANSP. MASIVO'
            break;
        case '7': descrip = 'ESCOLAR'
            break;
    }
    $('#servicio_CER101').val(global_CER101.SERV + '. ' + descrip)
    conductorMask.typedValue = global_CER101.CONDUCTOR.trim()
    $('#nombreConduc_CER101').val(global_CER101.NOMBRE_CONDUCTOR.trim())
    propietarioMask.typedValue = global_CER101.PROPIETARIO.trim()
    $('#nombrePropi_CER101').val(global_CER101.NOMBRE_PROPIETARIO.trim())
    switch (global_CER101.AMBUL) {
        case '1':
            $('#ambulancia_CER101').val(global_CER101.AMBUL + '. BASICA')
            break;
        case '2':
            $('#ambulancia_CER101').val(global_CER101.AMBUL + '. MEDICADA')
            break;
        case '3':
            $('#ambulancia_CER101').val(global_CER101.AMBUL + '. NO APLICA')
            break;
    }
    $('#telefono_CER101').val(global_CER101.TELEFONO.trim())
    $('#operCrea_CER101').val(global_CER101.OPER_CREA.trim())
    momentMaskFechaCrea.typedValue = global_CER101.FECHA_CREA
    $('#operModif_CER101').val(global_CER101.OPER_MODIF.trim())
    momentMaskFechaModif.typedValue = global_CER101.FECHA_MODIF
}

function validarMarca_CER101() {
    validarInputs(
        {
            form: '#validarMarca_CER101',
            orden: '1'
        },
        validarPlaca_CER101,
        function () {
            global_CER101.MARCA = espaciosDer($('#marca_CER101').val(), 15)
            tipoServicio_CER101()
        }
    )
}

function tipoServicio_CER101() {
    SER866C(validarMarca_CER101, validarTipo_CER101, global_CER101.SERV)
}

function validarTipo_CER101(data) {
    global_CER101.SERV = data.COD
    $('#servicio_CER101').val(global_CER101.SERV + '. ' + data.DESCRIP)
    if (global_CER101.SERV == '4') {
        validarAmbul_CER101()
    } else {
        global_CER101.AMBUL = '3'
        $('#ambulancia_CER101').val(global_CER101.AMBUL + '. NO APLICA')
        validarConductor_CER101()
    }
}

function validarAmbul_CER101() {
    var ambulancia = [
        { 'COD': '1', 'DESCRIP': 'BASICA' },
        { 'COD': '2', 'DESCRIP': 'MEDICADA' },
        { 'COD': '3', 'DESCRIP': 'NO APLICA' }
    ]
    setTimeout(() => {
        POPUP({
            array: ambulancia,
            titulo: "AMBULANCIA",
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            seleccion: global_CER101.AMBUL,
            callback_f: () => { setTimeout(tipoServicio_CER101, 300) }
        },
            data => {
                global_CER101.AMBUL = data.COD
                validarConductor_CER101()
            });
    }, 300)
}

function validarConductor_CER101() {
    validarInputs(
        {
            form: '#validarConduc_CER101',
            orden: '1'
        }, function () {
            if (global_CER101.SERV == '4') {
                validarAmbul_CER101()
            } else {
                tipoServicio_CER101()
            }
        },
        function () {
            global_CER101.CONDUCTOR = espaciosIzq(conductorMask.unmaskedValue, 10)
            let URL = get_url("APP/CONTAB/CON802_01.DLL");
            postData({
                datosh: datosEnvio() + conductorMask.unmaskedValue.padStart(10,'0') + "|8|",
            }, URL)
            .then(data => {
                $('#nombreConduc_CER101').val(data.TERCER[0].DESCRIP_TER)
                if (data.TERCER[0].DIRREC.trim().length < 1 && global_CER101.AMBUL == '3') {
                    CON851('84','84',null,'error','Error');
                    let { ipcRenderer } = require("electron");
                    ipcRenderer.send('another', datos = { directorio: 'CONTAB/paginas/CON110C.html', cliente: global_CER101.CONDUCTOR, furip: true});
                    let vector = ['on', 'Actualizando maestro de terceros...']
                    _EventocrearSegventana(vector, validarConductor_CER101);    
                } else {
                    if (global_CER101.AMBUL == '1' || global_CER101.AMBUL == '2') {
                        confirmar_CER101();
                    } else {
                        validarPropietario_CER101();
                    }
                }
            }).catch(error => {
                console.error(error);
                let { ipcRenderer } = require("electron");
                ipcRenderer.send('another', datos = { directorio: 'CONTAB/paginas/CON110C.html', cliente: global_CER101.CONDUCTOR, furip: true});
                let vector = ['on', 'Actualizando maestro de terceros...']
                _EventocrearSegventana(vector, validarConductor_CER101);
            });
        }
    )
}

function validarPropietario_CER101() {
    validarInputs(
        {
            form: '#validarPropiet_CER101',
            orden: '1'
        },
        validarConductor_CER101,
        function () {
            let URL = get_url("APP/CONTAB/CON802_01.DLL");
            postData({
                datosh: datosEnvio() + propietarioMask.unmaskedValue.padStart(10,'0') + "|8|",
            }, URL)
            .then(data => {
                console.log(data);
                if (data.TERCER[0].DIRREC.trim().length < 1 && global_CER101.AMBUL == '3'){
                    CON851('84','84',null,'error','Error');
                    let { ipcRenderer } = require("electron");
                    ipcRenderer.send('another', datos = { directorio: 'CONTAB/paginas/CON110C.html', cliente: conductorMask.unmaskedValue, furip: true});
                    let vector = ['on', 'Actualizando maestro de terceros...']
                    _EventocrearSegventana(vector, validarPropietario_CER101);    
                } else {
                    $('#nombrePropi_CER101').val(data.TERCER[0].DESCRIP_TER);
                    $('#telefono_CER101').val(data.TERCER[0].TELEFONO);
                    confirmar_CER101()
                }
            }).catch(error => {
                console.error(error);
                let { ipcRenderer } = require("electron");
                ipcRenderer.send('another', datos = { directorio: 'CONTAB/paginas/CON110C.html', cliente: propietarioMask.unmaskedValue, furip: true});
                let vector = ['on', 'Actualizando maestro de terceros...']
                _EventocrearSegventana(vector, validarPropietario_CER101);
            });
        }
    )
}

function confirmar_CER101() {
    CON851P('01', validarConductor_CER101, grabarRegistro_CER101)
}

function grabarRegistro_CER101() {
    var datos_Envio_101 = datosEnvio()

    datos_Envio_101 += $_Noved_CER101
    datos_Envio_101 += '|'
    datos_Envio_101 += espaciosDer(global_CER101.PLACA, 6)
    datos_Envio_101 += '|'
    datos_Envio_101 += global_CER101.MARCA
    datos_Envio_101 += '|'
    datos_Envio_101 += global_CER101.SERV
    datos_Envio_101 += '|'
    datos_Envio_101 += global_CER101.AMBUL
    datos_Envio_101 += '|'
    datos_Envio_101 += cerosIzq(conductorMask.unmaskedValue, 10)
    datos_Envio_101 += '|'
    datos_Envio_101 += cerosIzq(propietarioMask.unmaskedValue, 10)
    datos_Envio_101 += '|'
    datos_Envio_101 += localStorage.Usuario
    datos_Envio_101 += '|'
    datos_Envio_101 += moment().format('YYYYMMDD')
    datos_Envio_101 += '|'

    console.log(datos_Envio_101)
    let URL = get_url("APP/SALUD/CER101-02.DLL");

    postData({
        datosh: datos_Envio_101
    }, URL)
        .then((data) => {
            loader('hide')
            jAlert(
                { titulo: 'CER101', mensaje: data }, limpiarCamposCER101
            );
        })
        .catch(error => {
            loader('hide')
            console.error(error)
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav();
            }
        });
}


function limpiarCamposCER101() {
    global_CER101 = []
    // terceros_CER101 = []
    carros_CER101 = []
    $_Noved_CER101 = ''
    _inputControl('reset');
    _inputControl('disabled');
    let Window = BrowserWindow.getAllWindows();
    if (Window.length > 1) {
        _cerrarSegundaVentana();
    } else {
        _toggleNav();
    }
}