/* NOMBRE RM --> SER11D // NOMBRE ELECTR --> SAL71D */

var $_NovedSer71D

var arrayColegio_71d = []
var arrayCiudades_71d = []
var arrayDatosCompletos71D = []

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');

    nombreOpcion('9,7,1,D - Actualizacion Instituciones Educativas ')

    _toggleF8([
        { input: 'tipo', app: '71D', funct: _ventanTipo_71d },
        { input: 'ciudad', app: '71D', funct: _ventanCiudad_71d },
        { input: 'codigo', app: '71D', funct: _ventanCod_71d }
        // { input: 'codciud', app: '71D', funct: _ventanCiudad }
    ]);
    loader('hide');
    obtenerDatosCompletos({ nombreFd: 'COLEGIOS' }, recibirColegios_71d)
});

function recibirColegios_71d(data) {
    arrayColegio_71d = data.COLEGIOS
    arrayColegio_71d.pop()
    obtenerDatosCompletos({ nombreFd: 'CIUDADES' }, recibirCiudades_71d)
}

function recibirCiudades_71d(data) {
    arrayCiudades_71d = data.CIUDAD
    arrayCiudades_71d.pop()
    CON850(_evaluarCON850)
}

// --> F8 COLEGIOS //
function _ventanTipo_71d(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "Ventana De Colegios",
            columnas: ["TIPO", "CIUDAD", "SECU", "DESCRIP"],
            data: arrayColegio_71d,
            callback_esc: function () {
                $("#tipo_71D").focus()
            },
            callback: function (data) {
                $("#tipo_71D").val(data.TIPO)
                $("#ciudad_71D").val(data.CIUDAD);
                $("#codigo_71D").val(data.SECU);
                _enterInput('#tipo_71D');
            }
        });

    }
}

function _ventanCiudad_71d(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {

        _ventanaDatos({
            titulo: "Ventana De ciudades",
            columnas: ["COD", "DEPART", "NOMBRE"],
            data: arrayCiudades_71d,
            callback_esc: function () {
                $("#ciudad_71D").focus()
            },
            callback: function (data) {
                console.log(data)
                $('#ciudad_71D').val(data.COD);
                $('#ciudColeg_71D').val(data.NOMBRE)
                _enterInput('#ciudad_71D');
            }
        });
    }
}

function _ventanCod_71d(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var tipo = $('#tipo_71D').val().trim()
        var ciudad = $("#ciudad_71D").val().trim()

        var filtroColegios
        filtroColegios = arrayColegio_71d.filter(colegio => colegio.CIUDAD == ciudad)
        if (tipo.length > 0) {
            filtroColegios = filtroColegios.filter(colegio => colegio.TIPO == tipo)
        }

        _ventanaDatos({
            titulo: "Ventana De Colegios",
            columnas: ["TIPO", "CIUDAD", "SECU", "DESCRIP"],
            data: filtroColegios,
            callback_esc: function () {
                $("#codigo_71D").focus()
            },
            callback: function (data) {
                $("#tipo_71D").val(data.TIPO)
                $("#ciudad_71D").val(data.CIUDAD);
                $("#codigo_71D").val(data.SECU);
                _enterInput('#codigo_71D');
            }
        });
    }
}
// NOVEDAD //
function _evaluarCON850(novedad) {
    $_NovedSer71D = novedad.id;
    switch ($_NovedSer71D) {
        case '7':
        case '8':
        case '9':
            _validarTipo_71D();
            break;
        case 'F':
            limpiarCampos71D();
            break;
    }
    $('#novSer71D').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarTipo_71D() {
    validarInputs(
        {
            form: "#validarTipo_71D",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        function () {
            validarCiudad_71d()
        }
    )
}

function validarCiudad_71d() {
    validarInputs(
        {
            form: "#validarCiudad_71D",
            orden: '1'
        },
        function () { _validarTipo_71D() },
        function () {
            var ciudadDigitada = cerosIzq($('#ciudad_71D').val(), 5)
            $('#ciudad_71D').val(ciudadDigitada)

            var busqueda = arrayCiudades_71d.find(ciudad => ciudad.COD == ciudadDigitada)

            if (busqueda) {
                $('#ciudad_71D').val(busqueda.COD)
                $('#ciudColeg_71D').val(busqueda.NOMBRE)
                validarCodigo_71d()
            } else {
                CON851('01', '01', null, 'error', 'error');
                validarCiudad_71d()
            }

        }
    )
}

function validarCodigo_71d() {
    validarInputs(
        {
            form: "#validarCodigo_71D",
            orden: '1'
        },
        function () { validarCiudad_71d(); },
        function () {
            var tipo = $('#tipo_71D').val().trim()
            var ciudad = $('#ciudad_71D').val().trim()
            var codigo = cerosIzq($('#codigo_71D').val().trim(), 6)
            $('#codigo_71D').val(codigo)
            var llave = tipo + ciudad + codigo

            var busqueda = arrayColegio_71d.find(colegio => (colegio.TIPO + colegio.CIUDAD + colegio.SECU) == llave)
            if (busqueda) {
                switch ($_NovedSer71D) {
                    case '7':
                        CON851('00', '00', null, 'error', 'error');
                        validarCodigo_71d()
                        break;
                    case '8':
                        arrayDatosCompletos71D = busqueda
                        console.log(arrayDatosCompletos71D)
                        mostrarDatos_71d()
                        descripColeg_71d()
                        break;
                    case '9':
                        arrayDatosCompletos71D = busqueda
                        mostrarDatos_71d()
                        CON851P('54', validarCodigo_71d, eliminarRegistro_71d)
                        break;
                }

            } else {
                switch ($_NovedSer71D) {
                    case '7':
                        nuevo_71d(tipo, ciudad, codigo)
                        break;
                    case '8':
                    case '9':
                        CON851('01', '01', null, 'error', 'error');
                        validarCodigo_71d()
                        break;
                }
            }

        }
    )
}

function nuevo_71d(tipo, ciudad, codigo){
    arrayDatosCompletos71D = {
        'TIPO': tipo,
        'CIUDAD': ciudad,
        'SECU': codigo,
        'DESCRIP': '',
        'DIRECCION': '',
        'NUCLEO': '',
        'TELEFONO': '',
        'ZONA': ''
    }
    descripColeg_71d()
}

function mostrarDatos_71d() {
    $('#descrip71D').val(arrayDatosCompletos71D.DESCRIP.trim())
    switch (arrayDatosCompletos71D.ZONA) {
        case '1':
                $('#zona71D').val(arrayDatosCompletos71D.ZONA + '. Urbana')
            break;
        case '2':
                $('#zona71D').val(arrayDatosCompletos71D.ZONA + '. Rural')
            break;
    }
    $('#nucleo71D').val(arrayDatosCompletos71D.NUCLEO.trim());
    $('#direcc71D').val(arrayDatosCompletos71D.DIRECCION.trim());
    $('#telefono71D').val(arrayDatosCompletos71D.TELEFONO.trim());
}

// ELIMINAR REGISTRO
function eliminarRegistro_71d() {
    var tipo = arrayDatosCompletos71D.TIPO
    var ciudad = arrayDatosCompletos71D.CIUDAD
    var codigo = cerosIzq(arrayDatosCompletos71D.SECU, 6)
    var llave = tipo + ciudad + codigo

    var datos_Envio_71d = datosEnvio()
    datos_Envio_71d += $_NovedSer71D
    datos_Envio_71d += '|'
    datos_Envio_71d += llave
    datos_Envio_71d += '|'
    console.log(datos_Envio_71d)
    let URL = get_url("APP/SALUD/SAL71D.DLL");

    postData({
        datosh: datos_Envio_71d
    }, URL)
        .then((data) => {
            loader('hide')
            jAlert(
                { titulo: 'SAL71D', mensaje: data },
                limpiarCampos71D
            );
        })
        .catch(error => {
            loader('hide')
            console.error(error)
            _toggleNav()
        });
}

function descripColeg_71d() {
    validarInputs(
        {
            form: '#descrip_71d',
            orden: '1'
        },
        function () { validarCodigo_71d(); },
        function () {
            var descrip = espaciosDer($('#descrip71D').val().trim(),50)
            arrayDatosCompletos71D.DESCRIP = descrip
            validarNucleo71D()
        }
    )
}

function validarNucleo71D() {
    validarInputs(
        {
            form: '#nucleo_71d',
            orden: '1'
        },
        function () { descripColeg_71d(); },
        function () {
            var nucleo = espaciosDer($('#nucleo71D').val().trim(),10)
            arrayDatosCompletos71D.NUCLEO = nucleo
            validarZonad71D()
        }
    )
}

function validarZonad71D() {

    var datoZona = [
        { "COD": "1", "DESCRIP": "Urbana" },
        { "COD": "2", "DESCRIP": "Rural" }
    ]

    POPUP({
        array: datoZona,
        titulo: 'Zona',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: validarNucleo71D,
        seleccion: arrayDatosCompletos71D.ZONA
    }, function (data) {
        arrayDatosCompletos71D.ZONA = data.COD
        switch (data.COD.trim()) {
            case '1':
            case '2':
                $('#zona71D').val(data.COD.trim() + '. ' + data.DESCRIP.trim())
                validarDirecc71D();
                break;
        }
    })
}

function validarDirecc71D() {
    validarInputs(
        {
            form: '#direccion',
            orden: '1'
        },
        function () { validarZonad71D(); },
        function () {
            var direccion = $('#direcc71D').val().trim()
            arrayDatosCompletos71D.DIRECCION = espaciosDer(direccion,30)

            if (direccion.length < 1) {
                CON851('84', '84', null, 'error', 'error');
                validarDirecc71D()
            } else {
                validarTelf71D();
            }
        }
    )
}

function validarTelf71D() {
    validarInputs(
        {
            form: '#telfon',
            orden: '1'
        },
        function () { validarDirecc71D(); },
        function () {
            arrayDatosCompletos71D.TELEFONO = cerosIzq($('#telefono71D').val(),10)
            envioDatos71D()
        }
    )
}


function envioDatos71D() {
    var tipo = espaciosIzq(arrayDatosCompletos71D.TIPO,1)
    var ciudad = arrayDatosCompletos71D.CIUDAD
    var secu = arrayDatosCompletos71D.SECU
    var llave = tipo + ciudad + secu
    var decrpcolg = arrayDatosCompletos71D.DESCRIP
    var nucleoclg = arrayDatosCompletos71D.NUCLEO
    var zona = arrayDatosCompletos71D.ZONA
    var direcclg = arrayDatosCompletos71D.DIRECCION
    var telfclg = arrayDatosCompletos71D.TELEFONO 


    var datos_Envio_71d = datosEnvio()
    datos_Envio_71d += $_NovedSer71D
    datos_Envio_71d += '|'
    datos_Envio_71d += llave
    datos_Envio_71d += '|'
    datos_Envio_71d += decrpcolg
    datos_Envio_71d += '|'
    datos_Envio_71d += nucleoclg
    datos_Envio_71d += '|'
    datos_Envio_71d += zona
    datos_Envio_71d += '|'
    datos_Envio_71d += direcclg
    datos_Envio_71d += '|'
    datos_Envio_71d += telfclg
    datos_Envio_71d += '|'

    console.log(datos_Envio_71d)
    let URL = get_url("APP/SALUD/SAL71D.DLL");

    postData({
        datosh: datos_Envio_71d
    }, URL)
        .then((data) => {
            loader('hide')
            jAlert(
                { titulo: 'SAL71D', mensaje: data },
                limpiarCampos71D
            );
        })
        .catch(error => {
            loader('hide')
            console.error(error)
            _toggleNav()
        });
}

function limpiarCampos71D() {
    arrayCiudades_71d = []
    arrayColegio_71d = []
    arrayDatosCompletos71D = []
    $_NovedSer71D = ''
    _inputControl('reset');
    _inputControl('disabled');
    _toggleNav();

}