var $_DATOS_101, $_NOVEDAD, $_ARTICULOS, $_ALMACENES, $_COSTOS, $numeracion;

var descuentoMask = new IMask(
    document.getElementById('descuento_101'),
    { mask: Number, min: 0, max: 99999, scale: 3, thousandsSeparator: ',', radix: '.' }
);

var pesosMask = new IMask(
    document.getElementById('pesos_101'),
    { mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var galonajeMask = new IMask(
    document.getElementById('galonaje_101'),
    { mask: Number, min: 0, max: 9999999999, scale: 3, thousandsSeparator: ',', radix: '.' }
);

$(document).ready(function () {
    loader('show');
    _inputControl('reset');
    _inputControl('disabled');
    _crearJsonArticulos_101()
    _toggleF8([
        { input: 'producto', app: '101', funct: _ventanaProductos },
        { input: 'almacen', app: '101', funct: _vantanaAlmacenes },
        { input: 'centrocostos', app: '101', funct: _ventanaCentroCostos }
    ]);
});

function _ventanaProductos(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda articulos',
            columnas: ["GRP", "NUMERO", "DESCRIP", "UNID", "VALOR", "REFER"],
            data: $_ARTICULOS,
            callback_esc: function () {
                $('#producto_101').focus();
            },
            callback: function (data) {
                let grp = data.GRP.trim()
                $('#producto_101').val(grp + data.NUMERO.trim());
                _enterInput('#producto_101');
            }
        });
    }
}

function _vantanaAlmacenes(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda almacén',
            columnas: ["COD", "DESCRIP"],
            data: $_ALMACENES,
            callback_esc: function () {
                $('#almacen_101').focus();
            },
            callback: function (data) {
                $('#almacen_101').val(data.COD.trim())
                _enterInput('#almacen_101');
            }
        });
    }
}

function _ventanaCentroCostos(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda centro de costos',
            columnas: ["COD", "DESCRIP", "NOMBRE"],
            data: $_COSTOS,
            callback_esc: function () {
                $('#centrocostos_101').focus();
            },
            callback: function (data) {
                $('#centrocostos_101').val(data.COD.trim())
                _enterInput('#centrocostos_101');
            }
        });
    }
}

function _crearJsonArticulos_101() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/INV803.DLL"))
        .then(data => {
            $_ARTICULOS = data.Articulos
            _crearJsonAlmacenes_101();
        }).catch(err => {
            loader('hide')
            _toggleNav();
        });
}

function _crearJsonAlmacenes_101() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/INV801.DLL"))
        .then(data => {
            $_ALMACENES = data.LOCAL
            console.log($_ALMACENES)
            _crearJsonCentroCostos_101();
        }).catch(err => {
            loader('hide')
            _toggleNav();
        });
}

function _crearJsonCentroCostos_101() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/CON803.DLL"))
        .then(data => {
            loader('hide')
            $_COSTOS = data.COSTO
            _solicitarAcceso();
        }).catch(err => {
            loader('hide')
            _toggleNav();
        });
}

function _solicitarAcceso() {
    loader('hide');
    var psw = $_USUA_GLOBAL[0].CLAVE_2.trim();
    var fuente = ''
        + '<div style="width: 100%; height: 100%;text-align: center;">'
        + ' <input id="pwdAcceso" type="password" style="outline: none;padding: 5px 12px;box-sizing: border-box;" autofocus/>'
        + '</div>';

    jAlert({
        titulo: 'Clave de bloqueo',
        mensaje: fuente,
        autoclose: false,
        btnCancel: true
    }, function () {
        // Evento aceptar
        let pwdIn = $('#pwdAcceso').val().trim();
        if (pwdIn == psw) {
            jAlert_close();
            $('#claveAcceso_101').val(psw);
            CON850(_evaluarNovedad_101, { opcion9: false });
        } else {
            $('#pwdAcceso').val('').focus();
            plantillaToast("02", "02", "", "warning", "");
        }
    }, function () {
        jAlert_close();
        _toggleNav();
    });
}

function _evaluarNovedad_101(novedad) {
    _inputControl('reset');
    _inputControl('disabled');

    $_NOVEDAD = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            modificar_101('1');
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novedad_101').val(novedad.id + ' - ' + novedad.descripcion)
}

function modificar_101(orden) {
    validarInputs(
        {
            form: '#consulta',
            orden: orden
        },
        function () { CON850(_evaluarNovedad_101); },
        _infoSurtidores_101
    )
}

function _infoSurtidores_101() {
    let isla = $('#nroIsla_101').val();
    let registradora = $('#nroRegistradora_101').val();

    var datos_envio = datosEnvio()
        + $_NOVEDAD + "|"
        + isla + '|'
        + registradora + '|';

    postData({ datosh: datos_envio }, get_url("app/bombas/BOM101.DLL"))
        .then(data => {
            $_DATOS_101 = data.split("|");
            switch ($_NOVEDAD) {
                case '7': validarPrimeraFase('1'); break;
                case '8': _llenarDatos_101(); break;
                case '9': _eliminar(); break;
                default: console.log('novedad no definida'); break;
            }
        }).catch(err => {
            modificar_101('2')
        })
}

function _eliminar() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            var datos_envio = datosEnvio();
            datos_envio += $_NOVEDAD;
            datos_envio += "|";
            datos_envio += $('#nroIsla_101').val();
            datos_envio += "|";
            datos_envio += $('#nroRegistradora_101').val();
            datos_envio += "|";

            postData({ datosh: datos_envio }, get_url("app/bombas/BOM101_R.DLL"))
                .then(data => {
                    console.log(data)
                    jAlert({ titulo: 'Notificacion', mensaje: "Eliminado correctamente" }, function () { CON850(_evaluarNovedad_101) });
                })
                .catch(err => {
                    modificar_101('1')
                })
        } else {
            modificar_101('1');
        }
    }, {
        msj: '02'
    })
}

function _llenarDatos_101() {
    var producto = buscarProducto($_DATOS_101[1].trim());
    if (producto != false) {
        var almacen = buscarAlmacen($_DATOS_101[5].trim())
        if (almacen != false) {
            var costo = buscarCostos($_DATOS_101[6].trim())
            if (costo != false) {
                $('#detalle_101').val($_DATOS_101[0].trim())
                $('#producto_101').val($_DATOS_101[1].trim())
                $('#productoDescrip_101').val(producto.DESCRIP)
                descuentoMask.unmaskedValue = $_DATOS_101[2].trim()
                galonajeMask.unmaskedValue = $_DATOS_101[3].trim()
                pesosMask.unmaskedValue = $_DATOS_101[4].trim()
                $('#almacen_101').val($_DATOS_101[5].trim())
                $('#almacenDescrip_101').val(almacen.DESCRIP)
                $('#centrocostos_101').val($_DATOS_101[6].trim())
                $('#centrocostosDescrip_101').val(costo.NOMBRE)
                validarPrimeraFase('1');
            } else {
                jAlert({ titulo: 'Error', mensaje: 'Centro de costo no encontrado' }, function () { modificar_101('2'); });
            }
        } else {
            jAlert({ titulo: 'Error', mensaje: 'Almacen no encontrado' }, function () { modificar_101('2'); });
        }
    } else {
        jAlert({ titulo: 'Error', mensaje: 'Producto no encontrado' }, function () { modificar_101('2'); });
    }
}

function validarPrimeraFase(orden) {
    validarInputs(
        {
            form: '#fase1',
            orden: orden
        },
        function () { modificar_101('2'); },
        _validarProducto
    )
}

function _validarProducto() {
    var nuevoCodigo = $('#producto_101').val();
    var validacion = buscarProducto(nuevoCodigo);
    if (validacion != false) {
        $('#productoDescrip_101').val(validacion.DESCRIP)
        $('#producto_101').val(validacion.GRP.trim() + validacion.NUMERO.trim())
        validarSegundaFase('1');
    } else {
        jAlert({
            titulo: 'Mensaje ',
            mensaje: 'No existe código digitado',
        }, function () {
            validarPrimeraFase('2');
        });
    }
}

function validarSegundaFase(orden) {
    validarInputs(
        {
            form: '#fase2',
            orden: orden
        },
        function () { validarPrimeraFase('2'); },
        validarTerceraFase
    )
}

function validarTerceraFase() {
    validarInputs(
        {
            form: '#fase3',
            orden: '1'
        },
        function () { validarSegundaFase('3'); },
        _validarAlmacen
    )
}

function _validarAlmacen() {
    var nuevoAlmacen = $('#almacen_101').val();
    var validacion = buscarAlmacen(nuevoAlmacen);
    if (validacion != false) {
        $('#almacen_101').val(validacion.COD);
        $('#almacenDescrip_101').val(validacion.DESCRIP);
        validarCuartaFase();
    } else {
        jAlert({
            titulo: 'Mensaje ',
            mensaje: 'No existe código digitado',
        }, function () {
            validarTerceraFase()
        });
    }

}

function validarCuartaFase() {
    validarInputs(
        {
            form: '#fase4',
            orden: '1'
        },
        validarTerceraFase,
        _validarCentroCostos
    )
}


function _validarCentroCostos() {
    var nuevoCosto = $('#centrocostos_101').val();
    var validacion = buscarCostos(nuevoCosto);
    if (validacion != false) {
        // let cod = validacion.COD.trim().slice(2, 4);
        let cod = validacion.COD.trim();
        $('#centrocostos_101').val(cod);
        $('#centrocostosDescrip_101').val(validacion.NOMBRE.trim());
        validacionFinal_101();
    } else {
        jAlert({
            titulo: 'Mensaje ',
            mensaje: 'No existe código digitado',
        }, function () {
            validarCuartaFase()
        });
    }
}

function validacionFinal_101() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            guardarModificar();
        } else {
            setTimeout(validarCuartaFase, 500)
        }
    }, {})
}

function guardarModificar() {
    var novedad = $_NOVEDAD;
    var datosForm = bajarDatos();
    var operador = localStorage.Usuario;
    var fecRest = '      ';

    var datos_envio = datosEnvio();
    datos_envio += novedad;
    datos_envio += '|';
    datos_envio += datosForm;
    datos_envio += '|';
    datos_envio += operador;
    datos_envio += '|';
    datos_envio += fecRest;
    datos_envio += '|';

    postData({ datosh: datos_envio }, get_url("app/bombas/BOM101_R.DLL"))
        .then(data => {
            let mensaje = $_NOVEDAD == '7' ? 'Creado correctamente' : 'Modificado correctamente';
            jAlert({ titulo: 'Notificacion', mensaje: mensaje }, function () { CON850(_evaluarNovedad_101); });
        })
        .catch(err => {
            validarCuartaFase();
        })
}

function bajarDatos() {
    var isla = $('#nroIsla_101').val();
    var registradora = $('#nroRegistradora_101').val();
    var detalleProducto = $('#detalle_101').val().trim();
    var codProducto = $('#producto_101').val().substring(2, $('#producto_101').val().length);
    var grpProducto = $('#producto_101').val().substring(0, 2);
    var galonaje = galonajeMask.unmaskedValue ? galonajeMask.unmaskedValue : 0;
    galonaje = parseFloat(galonaje).toFixed(3).replace(/\./g, '');

    var pesos = pesosMask.unmaskedValue;

    var descuento = descuentoMask.unmaskedValue ? descuentoMask.unmaskedValue : 0;
    descuento = parseFloat(descuento).toFixed(0).replace(/\./g, '');

    var centroCostos = $('#centrocostos_101').val();
    var almacen = $('#almacen_101').val();

    var datos = ''
    datos += isla
    datos += '|'
    datos += registradora
    datos += '|'
    datos += espaciosIzq(detalleProducto, 20);
    datos += '|'
    datos += cerosIzq(grpProducto, 2);
    datos += '|'
    datos += espaciosDer(codProducto, 13);
    datos += '|'
    datos += '  '
    datos += '|'
    datos += cerosIzq(galonaje, 13);
    datos += '|'
    datos += cerosIzq(pesos, 12);
    datos += '|'
    datos += cerosIzq(descuento, 15);
    datos += '|'
    datos += centroCostos
    datos += '|'
    datos += almacen;

    return datos;
}

function buscarProducto(codigo) {
    var retornar = false;
    for (var i in $_ARTICULOS) {
        let code = $_ARTICULOS[i].GRP.trim().toLowerCase() + $_ARTICULOS[i].NUMERO.trim().toLowerCase();
        if (code.trim() == codigo.toLowerCase()) {
            retornar = $_ARTICULOS[i];
            break;
        }
    }

    return retornar;
}

function buscarCostos(codigo) {
    var retornar = false;
    // codigo = cerosIzq(codigo, 4);
    for (var i in $_COSTOS) {
        var costo = $_COSTOS[i].COD.trim().toLowerCase()
        if (costo == codigo.toLowerCase()) {
            retornar = $_COSTOS[i];
            break;
        }
    }

    return retornar;
}

function buscarAlmacen(codigo) {
    var retornar = false;
    for (var i in $_ALMACENES) {
        if ($_ALMACENES[i].COD.trim().toLowerCase() == codigo.toLowerCase()) {
            retornar = $_ALMACENES[i];
            break;
        }
    }

    return retornar;
}

