var $_TAX908B = [], $_FORMATO_908B = '';

var netoProduc_tax908b = IMask($('#produc_tax908b')[0], {
    mask: 'a',
    definitions: {
        'a': /[SN]/
    },
    prepare: function (str) {
        return str.toUpperCase()
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});

$(document).ready(() => {
    _inputControl("reset");
    _inputControl("disabled");

    $('#formatoimpresion_908b').select2().on('select2:select', _validarFormato_908b);
    setTimeout(function () { $('#formatoimpresion_908b').select2('open') }, 500)
})

function habilitarFormato_908b() {
    _inputControl('reset');
    $('#formatoimpresion_908b').val(null).removeAttr('disabled').trigger('change');
    $('#formatoimpresion_908b').select2('open')
}

function _validarFormato_908b() {
    var seleccionado = $(this).val();
    if (seleccionado != "3") {
        if (seleccionado == "1") $_FORMATO_908B = 'PDF';
        else if (seleccionado == "2") $_FORMATO_908B = 'CSV';

        $(this).attr('disabled', 'true');

        var fecha_num = $_USUA_GLOBAL[0].FECHALNK;
        var yyyy = 2000 + parseFloat(fecha_num.substr(0, 2))
        $('#añoInicial_908b').val(yyyy)

        _validarFechaIncial_908b('1')
    } else {
        $(this).attr('disabled', 'true');
        _toggleNav();
    }
}

function _validarFechaIncial_908b(orden) {
    setTimeout(function () {
        validarInputs(
            {
                form: '#fechaInicial_908b',
                orden: orden
            },
            habilitarFormato_908b,
            _validarFecha_envio_908b
        );
    }, 100);
}

function _validarFecha_envio_908b() {
    var fecha_num = $_USUA_GLOBAL[0].FECHALNK;
    var yyyy = 2000 + parseFloat(fecha_num.substr(0, 2))
    var añoInicial = cerosIzq($('#añoInicial_908b').val(), 4);

    if (añoInicial > yyyy || añoInicial < yyyy) {
        plantillaError("Error", "Fecha fuera de rango", "TAX908B", () => {
            _validarFechaIncial_908b('3');
        });
    } else {
        var mesInicial = cerosIzq($('#mesInicial_908b').val(), 2);
        var diaInicial = cerosIzq($('#diaInicial_908b').val(), 2);
        var fechaEnvio = añoInicial + mesInicial + diaInicial;

        var datos_envio = datosEnvio() + '1|' + fechaEnvio + '|';
        postData({ datosh: datos_envio }, get_url("app/tax/TAX908-1.DLL"))
            .then(data => {
                $('#añoFinal_908b').val(añoInicial);
                _validarFechaFinal_908b('1');
            })
            .catch(err => {
                _validarFechaIncial_908b('1');
            })
    }
}

function _validarFechaFinal_908b(orden) {
    validarInputs(
        {
            form: '#fechaFinal_908b',
            orden: orden
        },
        () => {
            _validarFechaIncial_908b('3');
        },
        () => {
            var fecha_num = $_USUA_GLOBAL[0].FECHALNK;
            var yyyy = 2000 + parseFloat(fecha_num.substr(0, 2))

            var añoFinal = cerosIzq($('#añoInicial_908b').val(), 4);
            var mesfinal = cerosIzq($('#mesInicial_908b').val(), 2);
            var diaFinal = cerosIzq($('#diaInicial_908b').val(), 2);

            if ((añoFinal > yyyy || añoFinal < yyyy) || (mesfinal < 0 || mesfinal > 12) || (diaFinal < 0 || diaFinal > 31)) {
                plantillaError("Error", "Fecha fuera de rango", "TAX908B", () => {
                    _validarFechaFinal_908b('3')
                });
            } else {
                _validarProducido();
            }
        }
    );
}

function _validarProducido() {
    validarInputs(
        {
            form: "#validarProduc_tax908b",
            orden: "1"
        },
        () => {
            _validarFechaFinal_908b('3')
        },
        () => {
            CON850_P(function (e) {
                if (e.id == 'S') {
                    loader('show')
                    var añoInicial = cerosIzq($('#añoInicial_908b').val(), 4);
                    var mesInicial = cerosIzq($('#mesInicial_908b').val(), 2);
                    var diaInicial = cerosIzq($('#diaInicial_908b').val(), 2);
                    var fechaInicial = añoInicial + mesInicial + diaInicial;

                    var añoFinal = cerosIzq($('#añoFinal_908b').val(), 4);
                    var mesfinal = cerosIzq($('#mesFinal_908b').val(), 2);
                    var diaFinal = cerosIzq($('#diaFinal_908b').val(), 2);
                    var fechaFinal = añoFinal + mesfinal + diaFinal;

                    var producido = netoProduc_tax908b.unmaskedValue || "N";
                    var datosh = datosEnvio() + fechaInicial + '|' + fechaFinal + '|' + producido + "|";

                    postData({ datosh }, get_url("APP/TAX/TAX908B.DLL"))
                        .then(_montarImpresion_t908b)
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    _validarProducido();
                }
            }, {
                msj: '00',
                overlay_show: true
            })
        }
    )
}

function _montarImpresion_t908b(data) {
    data.TOTALES = [];

    let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
    let nit = $_USUA_GLOBAL[0].NIT.toString();
    let fecha = moment().format('MMM DD/YY');

    data.TOTALES.push(nombreEmpresa);
    data.TOTALES.push(nit);
    data.TOTALES.push(fecha);

    loader('hide')
    var impresion = {
        datos: data,
        tipo: $_FORMATO_908B.toLowerCase(),
        formato: 'tax/tax908b.formato.html',
        nombre: 'LISTADO-PRODUCIDO-VEHICULO-' + localStorage.Sesion
    }

    imprimir(impresion, () => {
        _inputControl('reset');
        $('#formatoimpresion_908b').val(null).removeAttr('disabled').trigger('change');
        $('#formatoimpresion_908b').select2('open')
        // _toggleNav() 
    });
}