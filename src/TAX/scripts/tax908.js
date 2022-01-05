var $_TAX908 = [], $_FORMATO_908 = '';
var totalesMask_tax908 = IMask($('#totales_908')[0], {
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

var totalesdiaMask_tax908 = IMask($('#totalesdia_908')[0], {
    mask: 'a',
    definitions: {
        'a': /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false
        } else {
            return str.toUpperCase()
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});

var numerolibroMask_tax908 = IMask($('#numerolibro_908')[0], {
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
    loader('show')
    _consultarAgencias_908();
    _toggleF8([
        { input: 'agencia', app: 'tax908', funct: _ventanaAgencia_908 },
        { input: 'operador', app: 'tax908', funct: _ventanaOperadores_908 }
    ]);

    $('#formatoimpresion_908').select2().on('select2:select', validarFormato_908);
})

function habilitarFormato_908() {
    _inputControl('reset');
    $('#formatoimpresion_908').val(null).removeAttr('disabled').trigger('change');
    $('#formatoimpresion_908').select2('open')
}

function _consultarAgencias_908() {
    postData({ datosh: datosEnvio() }, get_url("APP/TAX/TAX801.DLL"))
        .then((data) => {
            $_TAX908.AGENCIAS = data.Agencias;
            _consultarOperadores();
        })
        .catch((error) => {
            _toggleNav();
            loader('hide');
        });
}

function _consultarOperadores() {
    postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON982.DLL"))
        .then((data) => {
            $_TAX908.OPERADORES = data.ARCHREST;
            loader('hide')
            setTimeout(function () { $('#formatoimpresion_908').select2('open') }, 500)
        })
        .catch((error) => {
            _toggleNav();
            loader('hide');
        });
}

function validarFormato_908() {
    var seleccionado = $(this).val();
    if (seleccionado != "3") {
        if (seleccionado == "1") $_FORMATO_908 = 'PDF';
        else if (seleccionado == "2") $_FORMATO_908 = 'CSV';

        $(this).attr('disabled', 'true');
        var fecha_num = $_USUA_GLOBAL[0].FECHALNK;
        var yyyy = 2000 + parseFloat(fecha_num.substr(0, 2))
        $('#añoInicial_908').val(yyyy)
        _validarFechaIncial('1')
    } else {
        $(this).attr('disabled', 'true');
        _toggleNav();
    }
}

function _validarFechaIncial(orden) {
    setTimeout(function () {
        validarInputs(
            {
                form: '#fechaInicial_908',
                orden: orden
            },
            habilitarFormato_908,
            _validarFecha_envio
        );
    }, 100);
}

function _validarFecha_envio() {
    var fecha_num = $_USUA_GLOBAL[0].FECHALNK;
    var yyyy = 2000 + parseFloat(fecha_num.substr(0, 2))
    var añoInicial = cerosIzq($('#añoInicial_908').val(), 4);

    if (añoInicial > yyyy || añoInicial < yyyy) {
        plantillaError("Error", "Fecha fuera de rango", "TAX908", () => {
            _validarFechaIncial('3');
        });
    } else {
        var mesInicial = cerosIzq($('#mesInicial_908').val(), 2);
        var diaInicial = cerosIzq($('#diaInicial_908').val(), 2);
        var fechaEnvio = añoInicial + mesInicial + diaInicial;

        var datos_envio = datosEnvio() + '1|' + fechaEnvio + '|';
        postData({ datosh: datos_envio }, get_url("app/tax/TAX908-1.DLL"))
            .then(data => {
                $('#añoFinal_908').val(añoInicial);
                // $('#mesFinal_908').val(mesInicial);
                _validarFechaFinal('1');
            })
            .catch(err => {
                _validarFechaIncial('1');
            })
    }
}

function _validarFechaFinal(orden) {
    validarInputs(
        {
            form: '#fechaFinal_908',
            orden: orden
        },
        () => {
            _validarFechaIncial('3');
        },
        () => {
            var fecha_num = $_USUA_GLOBAL[0].FECHALNK;
            var yyyy = 2000 + parseFloat(fecha_num.substr(0, 2))
            var añoFinal = cerosIzq($('#añoInicial_908').val(), 4);
            var mesfinal = cerosIzq($('#mesInicial_908').val(), 2);
            var diaFinal = cerosIzq($('#diaInicial_908').val(), 2);
            if ((añoFinal > yyyy || añoFinal < yyyy) || (mesfinal < 0 || mesfinal > 12) || (diaFinal < 0 || diaFinal > 31)) {
                plantillaError("Error", "Fecha fuera de rango", "TAX908", () => {
                    _validarFechaFinal('3')
                });
            } else {
                _validarTotales()
            }
        }
    );
}

function _validarTotales(orden) {
    validarInputs(
        {
            form: "#fase2",
            orden: orden
        },
        () => {
            _validarFechaFinal('1')
        },
        _validarAgencia
    )
}

function _validarAgencia() {
    validarInputs(
        {
            form: "#validarAgencia_908",
            orden: "1"
        },
        () => {
            _validarTotales('3');
        },
        () => {
            var agencia = document.getElementById('agencia_tax908').value;
            var consulta = $_TAX908.AGENCIAS.find(e => {
                if (agencia == e.CODIGO) return e;
            })
            if (agencia != 99) {
                if (consulta) {
                    document.getElementById('descripAgenc_tax908').value = consulta.DESCRIP;
                    _validarOperador();
                } else {
                    console.log('agencia')
                    plantillaError('01', '01', 'TAX908', _validarAgencia);
                }
            } else {
                document.getElementById('descripAgenc_tax908').value = 'Proceso completo';
                _validarOperador();
            }
        }
    )
}

function _validarOperador() {
    setTimeout(() => {
        validarInputs(
            {
                form: "#validarOperador_tax908",
                orden: "1"
            },
            _validarAgencia,
            () => {
                var operador = document.getElementById('operador_tax908').value;
                var consulta = $_TAX908.OPERADORES.find(e => {
                    if (operador == e.CODIGO) return e;
                })
                if (operador != '****') {
                    if (consulta) {
                        document.getElementById('descripOper_tax908').value = consulta.DESCRIPCION;
                        _envioImpresion()
                    } else {
                        console.log('operador')
                        plantillaError('01', '01', 'TAX908', _validarOperador);
                    }
                } else {
                    document.getElementById('descripOper_tax908').value = 'Todos los operadores';
                    _envioImpresion()
                }
            }
        )
    }, 250);
}

function _envioImpresion() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            var añoInicial = cerosIzq($('#añoInicial_908').val(), 4);
            var mesInicial = cerosIzq($('#mesInicial_908').val(), 2);
            var diaInicial = cerosIzq($('#diaInicial_908').val(), 2);
            var fechaInicial = añoInicial + mesInicial + diaInicial;

            var añoFinal = cerosIzq($('#añoFinal_908').val(), 4);
            var mesFinal = cerosIzq($('#mesFinal_908').val(), 2);
            var diaFinal = cerosIzq($('#diaFinal_908').val(), 2);
            var fechafinal = añoFinal + mesFinal + diaFinal;

            var swtot = totalesMask_tax908.unmaskedValue;
            var swdia = totalesdiaMask_tax908.unmaskedValue;

            var agencia = document.getElementById('agencia_tax908').value;
            var operador = document.getElementById('operador_tax908').value;

            loader('show')
            var datos_envio = datosEnvio() + fechaInicial + "|" + fechafinal + "|" + swtot + "|" + swdia + "|" + agencia + "|" + operador + "|";
            postData({ datosh: datos_envio }, get_url('app/tax/tax908.dll'))
                .then(_montarImpresion_tax908)
                .catch(err => {
                    console.log(err)
                    _validarOperador();
                })

        } else {
            _validarOperador();
        }
    }, {
        msj: '00',
        overlay_show: true
    })
}

function _montarImpresion_tax908(data) {
    data.TOTALES = [];
    
    let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
    let nit = $_USUA_GLOBAL[0].NIT.toString();
    let fecha = moment().format('MMM DD/YY');
    let operador = document.getElementById('descripOper_tax908').value

    data.TOTALES.push(nombreEmpresa);
    data.TOTALES.push(nit);
    data.TOTALES.push(fecha);
    data.TOTALES.push(operador)

    var impresion = {
        datos: data,
        tipo: $_FORMATO_908.toLowerCase(),
        formato: 'tax/tax908.formato.html',
        nombre: 'LISTADO-ACUMULADO-AGENCIA-' + localStorage.Sesion
    }
    loader('hide')

    imprimir(impresion, () => {
        _inputControl('reset');
        $('#formatoimpresion_908').val(null).removeAttr('disabled').trigger('change');
        $('#formatoimpresion_908').select2('open')
        // _toggleNav() 
    });
}

function _ventanaAgencia_908(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE AGENCIAS',
            columnas: ["CODIGO", "DESCRIP"],
            data: $_TAX908.AGENCIAS,
            callback_esc: function () {
                $('#agencia_tax908').focus();
            },
            callback: function (data) {
                $('#agencia_tax908').val(data.CODIGO);
                _enterInput('#agencia_tax908');
            }
        });
    }
}

function _ventanaOperadores_908(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE OPERADORES',
            columnas: ["CODIGO", "DESCRIPCION"],
            data: $_TAX908.OPERADORES,
            callback_esc: function () {
                $('#operador_tax908').focus();
            },
            callback: function (data) {
                $('#operador_tax908').val(data.CODIGO);
                _enterInput('#operador_tax908');
            }
        });
    }
}