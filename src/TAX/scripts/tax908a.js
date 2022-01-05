var $_TAX908A = [], $_FORMATO_908A = '';

$(document).ready(() => {
    loader('show');
    _inputControl("reset");
    _inputControl("disabled");
    _consultarCarros();

    _toggleF8([{ input: 'placa', app: 'tax908a', funct: _ventanaCarros_908a }]);
    $('#formatoimpresion_908a').select2().on('select2:select', validarFormato_908a);
})

function _consultarCarros() {
    postData({ datosh: datosEnvio() }, get_url("APP/TAX/TAX802.DLL"))
        .then((data) => {
            $_TAX908A.CARROS = data.Carros;
            loader('hide');
            setTimeout(function () { $('#formatoimpresion_908a').select2('open') }, 500)
        })
        .catch((error) => {
            _toggleNav();
        });
}

function habilitarFormato_908a() {
    _inputControl('reset');
    $('#formatoimpresion_908a').val(null).removeAttr('disabled').trigger('change');
    $('#formatoimpresion_908a').select2('open');
}

function validarFormato_908a() {
    var seleccionado = $(this).val();
    console.log(seleccionado)
    if (seleccionado != "3") {
        if (seleccionado == "1") $_FORMATO_908A = 'PDF';
        else if (seleccionado == "2") $_FORMATO_908A = 'CSV';

        $(this).attr('disabled', 'true');
        _validarCarro();
    } else {
        $(this).attr('disabled', 'true');
        _toggleNav();
    }
}

function _validarCarro() {
    setTimeout(() => {
        validarInputs(
            {
                form: "#validarPlaca_tax908a",
                orden: "1"
            },
            habilitarFormato_908a,
            () => {
                var placa = document.getElementById('placa_tax908a').value;
                var consulta = $_TAX908A.CARROS.find(e => {
                    if (placa.toUpperCase() == e.PLACA) return e;
                })

                if (consulta) {
                    document.getElementById('descripPlaca_tax908a').value = consulta.DESCRIP;
                    var datos_envio = datosEnvio() + '2||' + placa.toUpperCase() + '|';
                    postData({ datosh: datos_envio }, get_url("app/tax/TAX908-1.DLL"))
                        .then(data => {
                            var fecha_num = $_USUA_GLOBAL[0].FECHALNK;
                            var yyyy = 2000 + parseFloat(fecha_num.substr(0, 2))
                            $('#añoInicial_908a').val(yyyy)
                            _validarFechaIncial('1');
                        })
                        .catch(err => {
                            _validarCarro('1');
                        })
                } else {
                    plantillaError('01', '01', 'TAX908A', _validarCarro);
                }
            }
        )
    }, 100);
}

function _validarFechaIncial(orden) {
    validarInputs(
        {
            form: '#fechaInicial_908a',
            orden: orden
        },
        _validarCarro,
        () => {
            var fecha_num = $_USUA_GLOBAL[0].FECHALNK;
            var yyyy = 2000 + parseFloat(fecha_num.substr(0, 2))

            var añoInicial = cerosIzq($('#añoInicial_908a').val(), 4);
            var mesInicial = cerosIzq($('#mesInicial_908a').val(), 2);
            var diaInicial = cerosIzq($('#diaInicial_908a').val(), 2);
            if ((añoInicial > yyyy || añoInicial < yyyy) || (mesInicial < 0 || mesInicial > 12) || (diaInicial < 0 || diaInicial > 31)) {
                _validarFechaIncial('3');
            } else {
                $('#añoFinal_908a').val(añoInicial);
                _validarFechaFinal('1')
            }
        }
    );
}

function _validarFechaFinal(orden) {
    validarInputs(
        {
            form: '#fechaFinal_908a',
            orden: orden
        },
        () => {
            _validarFechaIncial('3');
        },
        () => {
            var fecha_num = $_USUA_GLOBAL[0].FECHALNK;
            var yyyy = 2000 + parseFloat(fecha_num.substr(0, 2))

            var añoFinal = cerosIzq($('#añoFinal_908a').val(), 4);
            var mesfinal = cerosIzq($('#mesFinal_908a').val(), 2);
            var diaFinal = cerosIzq($('#diaFinal_908a').val(), 2);
            if ((añoFinal > yyyy || añoFinal < yyyy) || (mesfinal < 0 || mesfinal > 12) || (diaFinal < 0 || diaFinal > 31)) {
                plantillaError("Error", "Fecha fuera de rango", "TAX908A", () => {
                    _validarFechaFinal('3')
                });
            } else {
                _envioImpresion_908a();
            }
        }
    );
}

function _envioImpresion_908a() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            loader('show');
            var añoInicial = cerosIzq($('#añoInicial_908a').val(), 4);
            var mesInicial = cerosIzq($('#mesInicial_908a').val(), 2);
            var diaInicial = cerosIzq($('#diaInicial_908a').val(), 2);
            var fechaInicial = añoInicial + mesInicial + diaInicial;

            var añoFinal = cerosIzq($('#añoFinal_908a').val(), 4);
            var mesFinal = cerosIzq($('#mesFinal_908a').val(), 2);
            var diaFinal = cerosIzq($('#diaFinal_908a').val(), 2);
            var fechafinal = añoFinal + mesFinal + diaFinal;

            var placa = document.getElementById('placa_tax908a').value;
            var datos_envio = datosEnvio() + localStorage.Usuario + "|" + placa.toUpperCase() + "|" + fechaInicial + "|" + fechafinal + "|";
            postData({ datosh: datos_envio }, get_url('app/tax/tax908a.dll'))
                .then(_montarImpresion_tax908a)
                .catch(err => {
                    loader('hide');
                    _validarFechaFinal('3');
                })

        } else {
            _validarFechaFinal('3');
        }
    }, {
        msj: '00',
        overlay_show: true
    })
}

function _montarImpresion_tax908a(data) {
    data.TOTALES = [];

    let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
    let nit = $_USUA_GLOBAL[0].NIT.toString();
    let fecha = moment().format('MMM DD/YY');

    var placa = document.getElementById('placa_tax908a').value

    data.TOTALES.push(nombreEmpresa);
    data.TOTALES.push(nit);
    data.TOTALES.push(fecha);
    data.TOTALES.push(placa);

    var impresion = {
        datos: data,
        tipo: $_FORMATO_908A.toLowerCase(),
        formato: 'tax/tax908a.formato.html',
        nombre: 'LISTADO-ACUMULADO-VEHICULO-' + localStorage.Sesion
    }

    console.log('Datos', impresion)
    loader('hide');
    imprimir(impresion, () => {
        _inputControl('reset');
        $('#formatoimpresion_908a').val(null).removeAttr('disabled').trigger('change');
        $('#formatoimpresion_908a').select2('open')
        // _toggleNav()
    });
}

function _ventanaCarros_908a(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE PARQUE AUTOMOTOR',
            columnas: ["PLACA", "DESCRIP", "DESCRIP-MOD"],
            data: $_TAX908A.CARROS,
            callback_esc: function () {
                $('#placa_tax908a').focus();
            },
            callback: function (data) {
                $('#placa_tax908a').val(data.PLACA);
                _enterInput('#placa_tax908a');
            }
        });
    }
}