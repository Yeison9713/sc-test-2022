/* NOMBRE RM --> SER103D // NOMBRE ELECTR --> SAL716 */
var $_CODTAB716, $_DESCRIPDESTINO_716, $_DESCRIPNOMTAR_716;

$(document).ready(function () {
    nombreOpcion('9,7,1,6 - Duplica una tarifa de servicios');
    _inputControl("reset");
    _inputControl('disabled');
    _toggleF8([
        { input: 'codgOrig', app: '716', funct: _ventanaConvenios716 },
        { input: 'codgDest', app: '716', funct: _ventanaConveniodesti716 }
    ]);
    obtenerDatosCompletos({
        nombreFd: 'GRUPOTAR'
    }, function (data) {
        console.log(data, 'TARIFAS')
        $_TARIFA_SER103D = data.NOMTAR;
        $_TARIFA_SER103D.pop();
        _validarOrigen716();
    })
});


function _ventanaConvenios716(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONVENIOS",
            columnas: ["COD", "DESCRIP"],
            data: $_TARIFA_SER103D,
            callback_esc: function () {
                $("#codgOrig_716").focus();
            },
            callback: function (data) {
                $('#codgOrig_716').val(data.COD);
                $('#decripOrg716').val(data.DESCRIP.trim());
                _enterInput('#codgOrig_716');
            }
        });
    }
}

function _ventanaConveniodesti716(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONVENIOS",
            columnas: ["COD", "DESCRIP"],
            data: $_TARIFA_SER103D,
            callback_esc: function () {
                $("#codgDest_716").focus();
            },
            callback: function (data) {
                $('#codgDest_716').val(data.COD);
                $('#decripDest716').val(data.DESCRIP.trim());
                _enterInput('#codgDest_716');
            }
        });
    }
}

function _validarOrigen716() {
    validarInputs(
        {
            form: "#origen716",
            orden: '1'
        },
        function () { _toggleNav() },
        _validacionesorigen_716
    )
}

function _validacionesorigen_716() {
    $codigo716 = $('#codgOrig_716').val();
    if ($codigo716.trim() == '') {
        CON851('01', '01', null, 'error', 'error');
        _validarOrigen716();
    } else {
        busquedatarifa1 = buscarDescrip_tarifa1($codigo716);
        switch (busquedatarifa1) {
            case false:
                CON851('01', '01', null, 'error', 'error');
                _validacionesorigen_716();
            default:
                $_DESCRIPTARI1 = busquedatarifa1.DESCRIP.trim();
                $('#decripOrg716').val($_DESCRIPTARI1);
                _consultamovimientotarif();
                break;
        }
    }
}

function buscarDescrip_tarifa1(data) {
    var retornar = false;
    for (var i in $_TARIFA_SER103D) {
        if ($_TARIFA_SER103D[i].COD.trim() == data) {
            retornar = $_TARIFA_SER103D[i];
            break;
        }
    }
    return retornar;
}

function _consultamovimientotarif() {
    let datos_envio = datosEnvio()
    datos_envio += $codigo716 + '|'
    SolicitarDll({ datosh: datos_envio }, data => {
        console.debug(data, "$codigo716");
        var data = data.split("|");
        var swinvalid = data[0].trim();
        if (swinvalid == "00") {
            datoDesti716()
        } else if (swinvalid == "08") {
            CON851('08', '08', null, 'error', 'error');
            _validarOrigen716()
        } else {
            CON852(data[0], data[1], data[2], _toggleNav)
        }
    }, get_url('APP/SALUD/SER103D-02.DLL'));
}

function datoDesti716() {
    validarInputs(
        {
            form: '#destino716',
            orden: '1'
        },
        function () { _validarOrigen716(); },
        _validaciondestino_716
    )
}

function _validaciondestino_716() {
    $codigoDst716 = $('#codgDest_716').val();
    if ($codigoDst716.trim() == '') {
        CON851('02', '02', null, 'error', 'error');
        datoDesti716();
    } else {
        busquedatarifa2 = buscarDescrip_tarifa2($codigoDst716);
        switch (busquedatarifa2) {
            case false:
                CON851('01', '01', null, 'error', 'error');
                datoDesti716();
            default:
                $_DESCRIPTARI2 = busquedatarifa2.DESCRIP.trim();
                if ($codigo716 == $codigoDst716) {
                    CON851('05', '05', null, 'error', 'error');
                    datoDesti716();
                } else {
                    $('#decripDest716').val($_DESCRIPTARI2);
                    validacionCodigos716();
                }
                break;
        }
    }
}

function buscarDescrip_tarifa2(data) {
    var retornar = false;
    for (var i in $_TARIFA_SER103D) {
        if ($_TARIFA_SER103D[i].COD.trim() == data) {
            retornar = $_TARIFA_SER103D[i];
            break;
        }
    }
    return retornar;
}


function validacionCodigos716() {
    let datos_envio = datosEnvio()
    datos_envio += $codigoDst716 + '|'
    SolicitarDll({ datosh: datos_envio }, data => {
        var data = data.split("|");
        var swinvalid = data[0].trim();
        if (swinvalid == "00") {
            CON851('5F', '5F', null, 'error', 'error');
            CON851P('07', datoDesti716, envioDatos716)
        } else if (swinvalid == "08") {
            envioDatos716();
        } else {
            CON852(data[0], data[1], data[2], _toggleNav)
        }
    }, get_url('APP/SALUD/SER103D-02.DLL'));

}



function envioDatos716() {
    loader("show");

    postData({ datosh: datosEnvio() + $codigo716 + '|' + $codigoDst716 + '|' + localStorage.Usuario + '|' }, get_url("APP/SALUD/SER103D-01.DLL"))
        .then((llegada) => {
            loader('hide')
            CON851('', 'El proceso termino satisfactoriamente!', null, 'success', 'Exitoso');
            $codigo716 = ''
            $codigoDst716 = ''
            _toggleNav()
        })
        .catch(err => {
            console.error(err)
            loader('hide')
            datoDesti716()
        });
}