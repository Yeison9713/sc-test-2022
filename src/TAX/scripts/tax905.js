var TAX905 = new Object;

var cedulasMask_TAX905 = IMask($('#cedulas_TAX905')[0], {
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

function _ventanaModalidades_TAX905(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        TAX905.MODALIDAD.pop();
        _ventanaDatos({
            titulo: 'VENTANA DE MODALIDADES',
            columnas: ["CODIGO", "DESCRIP"],
            data: TAX905.MODALIDAD,
            callback_esc: function () {
                $('#modalidad_TAX905').focus();
            },
            callback: function (data) {
                $('#modalidad_TAX905').val(data.CODIGO)
                // modalidadMask_TAX905.typedValue = data.CODIGO;
                _enterInput('#modalidad_TAX905');
            }
        });
    }
}

$(document).ready(() => {
    _inputControl("reset");
    _inputControl("disabled");
    _toggleF8([
        { input: 'modalidad', app: 'TAX905', funct: _ventanaModalidades_TAX905 }
    ]);

    $('#formatoimpresion_TAX905').select2().on('select2:close', validarFormato_905);

    loader('show')
    let URL = get_url("APP/TAX/TAX815.DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader('hide')
            console.debug(data);
            TAX905.MODALIDAD = data.Modalidad;
            setTimeout(() => {
                $('#formatoimpresion_TAX905').select2('open')
            }, 500)
        })
        .catch((error) => {
            loader('hide')
            console.log(error);
        });
})

function validarFormato_905() {
    var seleccionado = $(this).val();
    if (seleccionado != "3") {
        if (seleccionado == "1") TAX905.FORMATO = 'pdf';
        else if (seleccionado == "2") TAX905.FORMATO = 'csv';
        _validarmovilidad_TAX905()
    } else {
        $(this).attr('disabled', 'true');
        _toggleNav();
    }
}

function _validarmovilidad_TAX905() {
    validarInputs({
        form: '#VALIDAR1_TAX905',
        orden: "1"
    },
        () => {
            $('#formatoimpresion_TAX905').on('focus').select2('open').on('select2:select', (e) => {
                console.debug(e);
                TAX905.FORMATO = e.params.data.id;
                $('#formatoimpresion_TAX905').off('select2:select');
                $('#formatoimpresion_TAX905').off('focus');
                if (TAX905.FORMATO == '3') { _toggleNav() } else { _validarmovilidad_TAX905() };
            });
        },
        () => {
            var modalidad = TAX905.MODALIDAD;
            $('#modalidad_TAX905').val($('#modalidad_TAX905').val().toUpperCase())
            TAX905.MODW = $('#modalidad_TAX905').val()
            if (TAX905.MODW.indexOf('*') == 0) {
                $('#modalidadd_TAX905').val('PROCESO TOTAL');
                _validarcedula();
            } else {
                var modalidad = modalidad.filter(x => x.CODIGO == TAX905.MODW);
                if (modalidad.length > 0) {
                    $('#modalidadd_TAX905').val(modalidad[0].DESCRIP);
                    _validarcedula();
                } else {
                    CON851('01', '01', null, 'error', 'Error');
                    _validarmovilidad_TAX905();
                }
            }
        }
    )
}

function _validarcedula() {
    validarInputs({
        form: '#VALIDAR2_TAX905',
        orden: '1'
    },
        () => { _validarmovilidad_TAX905('1') },
        () => {
            let URL = get_url("APP/TAX/TAX903.DLL");
            loader('show')
            postData({
                datosh: datosEnvio() + '3|' + $('#modalidad_TAX905').val() + "|" + cedulasMask_TAX905.value + '|'
            }, URL)
                .then((data) => {
                    console.debug(data);
                    data.TOTALES = [];

                    let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
                    let nit = $_USUA_GLOBAL[0].NIT.toString();
                    let fecha = moment().format('MMM DD/YY');

                    data.TOTALES.push(nombreEmpresa);
                    data.TOTALES.push(nit);
                    data.TOTALES.push(fecha);

                    var impresion = {
                        datos: data,
                        tipo: TAX905.FORMATO,
                        formato: 'tax/tax903.formato.html',
                        nombre: 'LISTADO-AUTOMOTOR-PLACA-' + localStorage.Sesion
                    }
                    imprimir(impresion, () => {
                        loader('hide')
                        _inputControl('reset');
                        $('#formatoimpresion_TAX905').val(null).removeAttr('disabled').trigger('change');
                        $('#formatoimpresion_TAX905').select2('open')
                    });
                })
                .catch((error) => {
                    loader('hide')
                    console.log(error);
                });
        }
    )
}