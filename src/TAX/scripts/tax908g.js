var $_TAX908G = [], $_FORMATO_908G = '';

$(document).ready(() => {
    _inputControl("reset");
    _inputControl("disabled");
    _consultarCarros();

    _toggleF8([{ input: 'placa', app: 'tax908g', funct: _ventanaCarros_908g }]);
    $('#formatoimpresion_908g').select2().on('select2:select', validarFormato_908g);
})

function _consultarCarros() {
    postData({ datosh: datosEnvio() }, get_url("APP/TAX/TAX802.DLL"))
        .then((data) => {
            $_TAX908G.CARROS = data.Carros;
            setTimeout(function () { $('#formatoimpresion_908g').select2('open') }, 500)
        })
        .catch((error) => {
            _toggleNav();
        });
}

function habilitarFormato_908g() {
    _inputControl('reset');
    $('#formatoimpresion_908g').val(null).removeAttr('disabled').trigger('change');
    $('#formatoimpresion_908g').select2('open');
}

function validarFormato_908g() {
    var seleccionado = $(this).val();
    if (seleccionado != "3") {
        if (seleccionado == "1") $_FORMATO_908g = 'PDF';
        else if (seleccionado == "2") $_FORMATO_908g = 'CSV';

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
                form: "#validarPlaca_tax908g",
                orden: "1"
            },
            habilitarFormato_908g,
            () => {
                var placa = document.getElementById('placa_tax908g').value;
                var consulta = $_TAX908G.CARROS.find(e => {
                    if (placa.toUpperCase() == e.PLACA) return e;
                })

                if (consulta) {
                    document.getElementById('descripPlaca_tax908g').value = consulta.DESCRIP;
                    var datos_envio = datosEnvio() + '2||' + placa.toUpperCase() + '|';
                    postData({ datosh: datos_envio }, get_url("app/tax/TAX908-1.DLL"))
                        .then(data => {
                            var fecha_num = $_USUA_GLOBAL[0].FECHALNK;
                            var yyyy = 2000 + parseFloat(fecha_num.substr(0, 2))
                            $('#añoInicial_908g').val(yyyy)
                            _validarFechaIncial('1');
                        })
                        .catch(err => {
                            _validarCarro('1');
                        })
                } else {
                    plantillaError('01', '01', 'TAX908g', _validarCarro);
                }
            }
        )
    }, 100);
}

function _validarFechaIncial(orden) {
    validarInputs(
        {
            form: '#fechaInicial_908g',
            orden: orden
        },
        _validarCarro,
        () => {
            var fecha_num = $_USUA_GLOBAL[0].FECHALNK;
            var yyyy = 2000 + parseFloat(fecha_num.substr(0, 2))

            var añoInicial = cerosIzq($('#añoInicial_908g').val(), 4);
            var mesInicial = cerosIzq($('#mesInicial_908g').val(), 2);
            var diaInicial = cerosIzq($('#diaInicial_908g').val(), 2);
            if ((añoInicial > yyyy || añoInicial < yyyy) || (mesInicial < 0 || mesInicial > 12) || (diaInicial < 0 || diaInicial > 31)) {
                _validarFechaIniial('3');
            } else {
                $('#añoFinal_908g').val(añoInicial);
                _validarFechaFinal('1')
            }
        }
    );
}

function _validarFechaFinal(orden) {
    validarInputs(
        {
            form: '#fechaFinal_908g',
            orden: orden
        },
        () => {
            _validarFechaIncial('3');
        },
        () => {
            var fecha_num = $_USUA_GLOBAL[0].FECHALNK;
            var yyyy = 2000 + parseFloat(fecha_num.substr(0, 2))

            var añoFinal = cerosIzq($('#añoFinal_908g').val(), 4);
            var mesfinal = cerosIzq($('#mesFinal_908g').val(), 2);
            var diaFinal = cerosIzq($('#diaFinal_908g').val(), 2);
            if ((añoFinal > yyyy || añoFinal < yyyy) || (mesfinal < 0 || mesfinal > 12) || (diaFinal < 0 || diaFinal > 31)) {
                plantillaError("Error", "Fecha fuera de rango", "TAX908g", () => {
                    _validarFechaFinal('3')
                });
            } else {
                _envioImpresion_908g();
            }
        }
    );
}

function _envioImpresion_908g() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            var añoInicial = cerosIzq($('#añoInicial_908g').val(), 4);
            var mesInicial = cerosIzq($('#mesInicial_908g').val(), 2);
            var diaInicial = cerosIzq($('#diaInicial_908g').val(), 2);
            var fechaInicial = añoInicial + mesInicial + diaInicial;

            var añoFinal = cerosIzq($('#añoFinal_908g').val(), 4);
            var mesFinal = cerosIzq($('#mesFinal_908g').val(), 2);
            var diaFinal = cerosIzq($('#diaFinal_908g').val(), 2);
            var fechafinal = añoFinal + mesFinal + diaFinal;

            var placa = document.getElementById('placa_tax908g').value;
            var datos_envio = datosEnvio() + localStorage.Usuario + "|" + placa.toUpperCase() + "|" + fechaInicial + "|" + fechafinal + "|";
            loader('show')
            postData({ datosh: datos_envio }, get_url('app/tax/tax908g.dll'))
                .then(_montarImpresion_tax908g)
                .catch(err => {
                    loader('hide')
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

function _montarImpresion_tax908g(data) {
    data.TOTALES = [];

    let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
    let nit = $_USUA_GLOBAL[0].NIT.toString();
    let fecha = moment().format('MMM DD/YY');

    data.TOTALES.push(nombreEmpresa);
    data.TOTALES.push(nit);
    data.TOTALES.push(fecha);

    var impresion = {
        datos: data,
        tipo: $_FORMATO_908g.toLowerCase(),
        formato: 'tax/tax908g.formato.html',
        nombre: 'LISTADO-ACUMULADO-CARRO-' + localStorage.Sesion
    }

    imprimir(impresion, () => {
        loader('hide');
        _toggleNav()
    });
}

function _ventanaCarros_908g(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE PARQUE AUTOMOTOR',
            columnas: ["PLACA", "DESCRIP", "DESCRIP-MOD"],
            data: $_TAX908G.CARROS,
            callback_esc: function () {
                $('#placa_tax908g').focus();
            },
            callback: function (data) {
                $('#placa_tax908g').val(data.PLACA);
                _enterInput('#placa_tax908g');
            }
        });
    }
}