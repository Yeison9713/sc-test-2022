var TAX903 = new Object;

var cedulasMask_TAX903 = IMask($('#cedulas_TAX903')[0], {
    mask: 'a',
    definitions: {
        'a': /[SN]/
    },
    prepare: function (str) {
        return str.toUpperCase()
    },
    commit: function (value, masked) {
        masked._value = value ? value.toLowerCase() : ""
    }
});

var modalidadMask_TAX903 = IMask($('#modalidad_TAX903')[0], {
    mask: 'a',
    prepare: function (str) {
        return str.toUpperCase()
    },
    commit: function (value, masked) {
        masked._value = value ? value.toLowerCase() : ""
    }
});

function _ventanaModalidades_TAX903(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        TAX903.MODALIDAD.pop();
        _ventanaDatos({
            titulo: 'VENTANA DE MODALIDADES',
            columnas: ["CODIGO", "DESCRIP"],
            data: TAX903.MODALIDAD,
            callback_esc: function () {
                $('#modalidad_TAX903').focus();
            },
            callback: function (data) {
                modalidadMask_TAX903.typedValue = data.CODIGO.trim();
                _enterInput('#modalidad_TAX903');
            }
        });
    }
}

$(document).ready(() => {
    _inputControl("reset");
    _inputControl("disabled");
    _toggleF8([
        { input: 'modalidad', app: 'TAX903', funct: _ventanaModalidades_TAX903 }
    ]);

    $('#formatoimpresion_TAX903').select2().on('select2:close', validarFormato_903);

    let URL = get_url("APP/TAX/TAX815.DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            TAX903.MODALIDAD = data.Modalidad;
            setTimeout(function () { $('#formatoimpresion_TAX903').select2('open') }, 500)
        })
        .catch((error) => {
            console.log(error);
        });
})

function validarFormato_903(e) {
    var seleccionado = $('#formatoimpresion_TAX903').val();
    if (seleccionado != "3") {
        if (seleccionado == "1") TAX903.FORMATO = 'pdf';
        else if (seleccionado == "2") TAX903.FORMATO = 'csv';
        _validarmovilidad_TAX903()
    } else {
        $(this).attr('disabled', 'true');
        _toggleNav();
    }
}

function _validarmovilidad_TAX903() {
    validarInputs({
        form: '#VALIDAR1_TAX903',
        orden: "1"
    },
        () => {
            $('#formatoimpresion_TAX903').val(null).removeAttr('disabled').trigger('change');
            $('#formatoimpresion_TAX903').select2('open')
            validarFormato_903()
            // $('#formatoimpresion_TAX903').on('focus').select2('open').on('select2:select', (e) => {
            //     TAX903.FORMATO = e.params.data.id;
            //     $('#formatoimpresion_TAX903').off('select2:select');
            //     $('#formatoimpresion_TAX903').off('focus');
            //     if (TAX903.FORMATO == '3') { _toggleNav() } else { _validarmovilidad_TAX903() };
            // });
        },
        () => {
            var modalidad = TAX903.MODALIDAD;
            TAX903.MODW = $('#modalidad_TAX903').val();
            var modalidad = modalidad.filter(x => x.CODIGO == TAX903.MODW);
            if (modalidad.length > 0) {
                $('#modalidadd_TAX903').val(modalidad[0].DESCRIP);
                _validarcedula();
            } else {
                CON851('01', '01', null, 'error', 'Error');
                _validarmovilidad_TAX903();
            }
        }
    )
}

function _validarcedula() {
    validarInputs({
        form: '#VALIDAR2_TAX903',
        orden: '1'
    },
        () => { _validarmovilidad_TAX903('1') },
        () => {
            let URL = get_url("APP/TAX/TAX903.DLL");

            loader('show')
            postData({
                datosh: datosEnvio() + '1|' + modalidadMask_TAX903.value + "|" + cedulasMask_TAX903.value + '|'
            }, URL)
                .then((data) => {
                    data.TOTALES = [];

                    let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
                    let nit = $_USUA_GLOBAL[0].NIT.toString();
                    let fecha = moment().format('MMM DD/YY');

                    data.TOTALES.push(nombreEmpresa);
                    data.TOTALES.push(nit);
                    data.TOTALES.push(fecha);

                    var impresion = {
                        datos: data,
                        tipo: TAX903.FORMATO,
                        formato: 'tax/tax903.formato.html',
                        nombre: 'LISTADO-AUTOMOTOR-MODALIDA-' + localStorage.Sesion
                    }

                    imprimir(impresion, () => {
                        loader('hide')
                        _inputControl('reset');
                        $('#formatoimpresion_TAX903').val(null).removeAttr('disabled').trigger('change');
                        $('#formatoimpresion_TAX903').select2('open')
                    });
                })
                .catch((error) => {
                    loader('hide')
                    console.log(error);
                });
        }
    )
}