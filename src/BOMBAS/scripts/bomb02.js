var $_ARTICULOS, $_NOVEDAD, $_DATOS_02;
$(document).ready(function () {
    _crearJsonArticulos_02();
});

$(document).on('click', '#productoBtn_02', _ventanaProdunctos);
$(document).on('keydown', '#producto_02', _ventanaProdunctos);


function _ventanaProdunctos(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda ARTICULOS',
            columnas: ["GRP", "NUMERO", "DESCRIP", "UNID", "VALOR", "REFER"],
            data: $_ARTICULOS,
            callback: function (data) {
                let grp = data.GRP.trim();
                $('#producto_02').val(grp + data.NUMERO.trim());
                _enterInput('#producto_02');
            }
        });
    }
}

function _crearJsonArticulos_02() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/INV803.DLL"))
        .then(data => {
            $_ARTICULOS = data.Articulos
            _solicitarAcceso();
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
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
        let pwdIn = $('#pwdAcceso').val();
        if (pwdIn == psw) {
            jAlert_close();
            $('#claveAcceso_02').val(psw);
            CON850(_evaluarNovedad_02, { opcion9: false });
        } else {
            $('#pwdAcceso').val('').focus();
            plantillaToast("99", "Clave de acceso inválida", null, 'error');
        }
    }, function () {
        jAlert_close();
        _toggleNav();
    });
}

function _evaluarNovedad_02(novedad) {
    _inputControl('reset');
    _inputControl('disabled');

    $_NOVEDAD = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            modificar_02('1');
            break;
        default:
            _solicitarAcceso();
            break;
    }
    $('#novedad_02').val(novedad.id + ' - ' + novedad.descripcion);
}

function modificar_02() {
    validarInputs(
        {
            form: '#consulta',
            orden: "1"
        },
        function () { CON850(_evaluarNovedad_02); },
        _infoTanque
    )
}

function _infoTanque() {
    let tanque = $('#nroTanque_02').val();

    var datos_envio = datosEnvio() + $_NOVEDAD + "|" + cerosIzq(tanque, 2) + "|";
    postData({ datosh: datos_envio }, get_url("app/bombas/BOMB02.DLL"))
        .then(data => {
            $_DATOS_02 = data.split("|");
            _llenarDatos_02();
            switch ($_NOVEDAD) {
                case '7': validarPrimeraFase('1'); break;
                case '8': validarPrimeraFase('1'); break;
                case '9': _eliminar(); break;
                default: console.log('novedad no definida'); break;
            }
        }).catch(err => {
            modificar_02('1');
        })
}

function validarPrimeraFase(orden) {
    validarInputs(
        {
            form: '#fase1',
            orden: orden
        },
        function () {
            modificar_02('1');
        },
        _validarProducto
    )
}

function _validarProducto() {
    var nuevoCodigo = $('#producto_02').val().trim();
    var validacion = buscarProducto(nuevoCodigo);
    if (validacion != false) {
        $('#descrip_produc_02').val(validacion.DESCRIP)
        $('#producto_02').val(validacion.GRP.trim() + validacion.NUMERO.trim())
        validarSegundaFase();
    } else {
        plantillaError('Mensaje', 'No existe código digitado', '', function () { validarPrimeraFase('2'); });
    }
}

function validarSegundaFase(orden) {
    validarInputs(
        {
            form: '#fase2',
            orden: '1'
        },
        function () { validarPrimeraFase('2'); },
        validarClTanq
    )
}

function validarClTanq() {
    let clTanque = $('#clase_02').val();

    var datos_envio = datosEnvio() + "8|" + cerosIzq(clTanque, 2) + "|";
    postData({ datosh: datos_envio }, get_url("app/bombas/BOMB01.DLL"))
        .then(data => {
            $('#descrip_clase_02').val(data.DESCRIP[0]);
            _dllBomb02_1();
        })
}

function _dllBomb02_1() {
    var data = bajarDatos_02();
    console.log(data)
    postData({ datosh: data }, get_url("app/bombas/BOMB02_1.DLL"))
        .then(data => {
            jAlert({ titulo: 'Notificacion', mensaje: "Modificado correctamente" }, function () {
                _inputControl('reset');
                _inputControl('disabled');
                CON850(_evaluarNovedad_02)
            });

        }).catch({ validarSegundaFase })
}

function _eliminar() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            _dllBomb02_1();
        } else {
            modificar_02('1');
        }
    }, {
        msj: '02'
    })
}

function _llenarDatos_02() {
    var producto = buscarProducto($_DATOS_02[3].trim());
    $('#detalle_02').val($_DATOS_02[1]);
    $('#clase_02').val($_DATOS_02[2]);
    $('#medicion_02').val($_DATOS_02[4]);
    $('#galon_02').val($_DATOS_02[5]);
    $('#fecha_02').val($_DATOS_02[6]);
    $('#producto_02').val($_DATOS_02[3]);
    if (producto != false)
        $('#descrip_produc_02').val(producto.DESCRIP);
    else
        $('#descrip_produc_02').val('');
}

function bajarDatos_02() {
    var datos_envio = datosEnvio();
    datos_envio += $_NOVEDAD;
    datos_envio += "|";
    datos_envio += $('#nroTanque_02').val();
    datos_envio += "|";
    datos_envio += $('#detalle_02').val();
    datos_envio += "|";
    datos_envio += $('#clase_02').val();
    datos_envio += "|";
    datos_envio += cerosIzq($('#producto_02').val(), $('#producto_02').val().length + 1);
    datos_envio += "|";
    datos_envio += $('#medicion_02').val();
    datos_envio += "|";
    datos_envio += $('#galon_02').val();
    datos_envio += "|";
    datos_envio += $('#fecha_02').val();
    datos_envio += "|";
    datos_envio += $_DATOS_02[7];
    datos_envio += "|";
    datos_envio += $_DATOS_02[8].trim();
    return datos_envio;
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