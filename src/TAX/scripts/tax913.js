var $_TAX913 = [], $_FORMATO_913 = '';
$(document).ready(() => {
    _inputControl("reset");
    _inputControl("disabled");
    _consultarAgencias_913();
    _toggleF8([{ input: 'agencia', app: 'tax913', funct: _ventanaAgencia_913 }]);

    $('#formatoimpresion_913').select2().on('select2:select', validarFormato_913);
})

function habilitarFormato_913() {
    _inputControl('reset');
    $('#formatoimpresion_913').val(null).removeAttr('disabled').trigger('change');
    $('#formatoimpresion_913').select2('open')
}

function _consultarAgencias_913() {
    postData({ datosh: datosEnvio() }, get_url("APP/TAX/TAX801.DLL"))
        .then((data) => {
            $_TAX913.AGENCIAS = data.Agencias;
            setTimeout(function () { $('#formatoimpresion_913').select2('open') }, 500)
        })
        .catch((error) => {
            _toggleNav();
            loader('hide');
        });
}

function validarFormato_913() {
    var seleccionado = $(this).val();
    if (seleccionado != "3") {
        if (seleccionado == "1") $_FORMATO_913 = 'PDF';
        else if (seleccionado == "2") $_FORMATO_913 = 'CSV';

        $(this).attr('disabled', 'true');
        var fecha_num = $_USUA_GLOBAL[0].FECHALNK;
        var yyyy = 2000 + parseFloat(fecha_num.substr(0, 2))
        $('#añoInicial_913').val(yyyy)
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
                form: '#fechaInicial_913',
                orden: orden
            },
            habilitarFormato_913,
            _validarFecha_envio
        );
    }, 100);
}

function _validarFecha_envio() {
    var fecha_num = $_USUA_GLOBAL[0].FECHALNK;
    var yyyy = 2000 + parseFloat(fecha_num.substr(0, 2))
    var añoInicial = cerosIzq($('#añoInicial_913').val(), 4);

    if (añoInicial > yyyy || añoInicial < yyyy) {
        plantillaError("Error", "Fecha fuera de rango", "TAX913", () => {
            _validarFechaIncial('3');
        });
    } else {
        var mesInicial = cerosIzq($('#mesInicial_913').val(), 2);
        var diaInicial = cerosIzq($('#diaInicial_913').val(), 2);
        var fechaEnvio = añoInicial + mesInicial + diaInicial;

        var datos_envio = datosEnvio() + '1|' + fechaEnvio + '|';
        postData({ datosh: datos_envio }, get_url("app/tax/TAX908-1.DLL"))
            .then(data => {
                $('#añoFinal_913').val(añoInicial);
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
            form: '#fechaFinal_913',
            orden: orden
        },
        () => {
            _validarFechaIncial('3');
        },
        () => {
            var fecha_num = $_USUA_GLOBAL[0].FECHALNK;
            var yyyy = 2000 + parseFloat(fecha_num.substr(0, 2))
            var añoFinal = cerosIzq($('#añoInicial_913').val(), 4);
            var mesfinal = cerosIzq($('#mesInicial_913').val(), 2);
            var diaFinal = cerosIzq($('#diaInicial_913').val(), 2);
            if ((añoFinal > yyyy || añoFinal < yyyy) || (mesfinal < 0 || mesfinal > 12) || (diaFinal < 0 || diaFinal > 31)) {
                plantillaError("Error", "Fecha fuera de rango", "TAX913", () => {
                    _validarFechaFinal('3')
                });
            } else {
                _validarAgencia()
            }
        }
    );
}

function _validarAgencia() {
    validarInputs(
        {
            form: "#validarAgencia_913",
            orden: "1"
        },
        () => {
            _validarFechaFinal('3');
        },
        () => {
            var agencia = document.getElementById('agencia_tax913').value;
            var consulta = $_TAX913.AGENCIAS.find(e => {
                if (agencia == e.CODIGO) return e;
            })
            if (agencia != 99) {
                if (consulta) {
                    document.getElementById('descripAgenc_tax913').value = consulta.DESCRIP;
                    _envioImpresion();
                } else {
                    console.log('agencia')
                    plantillaError('01', '01', 'TAX913', _validarAgencia);
                }
            } else {
                document.getElementById('descripAgenc_tax913').value = 'Proceso completo';
                _envioImpresion();
            }
        }
    )
}

function _envioImpresion() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            var añoInicial = cerosIzq($('#añoInicial_913').val(), 4);
            var mesInicial = cerosIzq($('#mesInicial_913').val(), 2);
            var diaInicial = cerosIzq($('#diaInicial_913').val(), 2);
            var fechaInicial = añoInicial + mesInicial + diaInicial;

            var añoFinal = cerosIzq($('#añoFinal_913').val(), 4);
            var mesFinal = cerosIzq($('#mesFinal_913').val(), 2);
            var diaFinal = cerosIzq($('#diaFinal_913').val(), 2);
            var fechafinal = añoFinal + mesFinal + diaFinal;

            var agencia = document.getElementById('agencia_tax913').value;

            var datos_envio = datosEnvio() + fechaInicial + "|" + fechafinal + "|" + agencia + "|";
            postData({ datosh: datos_envio }, get_url('app/tax/tax913.dll'))
                .then(_montarImpresion_tax913)
                .catch(err => {
                    console.log(err)
                    _validarAgencia();
                })

        } else {
            _validarAgencia();
        }
    }, {
        msj: '00',
        overlay_show: true
    })
}

function _montarImpresion_tax913(data) {
    data.TOTALES = [];

    let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
    let nit = $_USUA_GLOBAL[0].NIT.toString();
    let fecha = moment().format('MMM DD/YY');

    data.TOTALES.push(nombreEmpresa);
    data.TOTALES.push(nit);
    data.TOTALES.push(fecha);

    var total = 0
    data.CORRECIONES.pop()
    data.CORRECIONES.forEach(item => {
        let valor = parseFloat(item.TOTAL.replace(/\,/g, '')) || 0
        total += valor
    });

    var masked = IMask.createMask({ mask: Number, min: -9999999999, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' });
    masked.resolve(total.toString())
    data.TOTALES.push(masked.value)

    var impresion = {
        datos: data,
        tipo: $_FORMATO_913.toLowerCase(),
        formato: 'tax/tax913.formato.html',
        nombre: 'LISTADO-AUDITORIA-CORREP-' + localStorage.Sesion
    }

    console.log('Impresion', impresion)
    imprimir(impresion, () => { _toggleNav() });
}

function _ventanaAgencia_913(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE AGENCIAS',
            columnas: ["CODIGO", "DESCRIP"],
            data: $_TAX913.AGENCIAS,
            callback_esc: function () {
                $('#agencia_TAX913').focus();
            },
            callback: function (data) {
                $('#agencia_913').val(data.CODIGO);
                _enterInput('#agencia_913');
            }
        });
    }
}