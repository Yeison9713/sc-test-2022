var LAB123 = new Object;

$(document).ready(() => {
    _inputControl('disabled');
    _inputControl('reset');
    LAB123.SUCW = $_USUA_GLOBAL[0].PREFIJ;
    _evaluarclaseservicio_LAB123();
})

function _evaluarclaseservicio_LAB123() {
    validarInputs({
        form: "#VALIDAR1_LAB123",
        orden: '1'
    },
        _toggleNav,
        () => {
            LAB123.CLW = claseservicioMask_LAB123.value;
            if (LAB123.CLW.trim() == '') {
                CON851('', 'Por favor digite la clase de servicio', null, 'error', 'Error');
                _evaluarclaseservicio_LAB123();
            } else {
                let clase = {
                    '2': 'LABORATORIO',
                    '6': 'PATOLOGIA-CITOL',
                    '7': 'PROMOC. Y PREVE.',
                }
                $('#').val(LAB123.CLW + ' - ' + clase[LAB123.CLW]);
                _evaluarnumero_LAB123();
            }
        }
    )
}

function _evaluarnumero_LAB123() {
    validarInputs({
        form: "#VALIDAR2_LAB123",
        orden: '1'
    },
        _evaluarclaseservicio_LAB123,
        () => {
            LAB123.NROFACTW = $('#comprobante_LAB123').val().padStart('0', 6);
            if ($.isNumeric(LAB123.NROFACTW)) {
                if (parseInt(LAB123.NROFACTW) == 0) {
                    _evaluarnumero_LAB123();
                } else {
                    let URL = get_url("APP/LAB/LAB123.DLL");
                    postData({
                        datosh: datosEnvio() + '1|' + LAB123.SUCW + LAB123.CLW + LAB123.NROFACTW + '|'
                    }, URL)
                        .then((data) => {
                            LAB123.FACTURA = data.FACTURA[0];
                            let prefijo = {
                                'E': 'CONTADO',
                                'C': 'CREDITO',
                                'P': 'PENSIONADO',
                                'A': 'AMBULATORIO',
                                'T': 'ACC.TRANSIT'
                            }
                            let sexo = {
                                'M': 'Masc',
                                'F': 'Fem.',
                                '': 'Err.'
                            }
                            fechafactMask_LAB123.typedValue = LAB123.FACTURA.FECHA_FACT;
                            $('#pago_LAB123').val(LAB123.FACTURA.PREFIJO_FACT);
                            $('#pagod_LAB123').val(prefijo[LAB123.FACTURA.PREFIJO_FACT]);
                            $('#paciente_LAB123').val(LAB123.FACTURA.IDHISTORIA_FACT);
                            $('#paciented_LAB123').val(LAB123.FACTURA.NOMBRE_PACI);
                            $('#edad_LAB123').val(LAB123.FACTURA.EDAD);
                            $('#sexo_LAB123').val(sexo[LAB123.FACTURA.SEXO_PACI]);
                            $('#entidad_LAB123').val(LAB123.FACTURA.NIT_FACT);
                            $('#entidadd_LAB123').val(LAB123.FACTURA.DESCRIPNIT_FACT);
                            $('#profesional_LAB123').val(LAB123.FACTURA.MEDOTR_FACT);
                            $('#profesionald_LAB123').val(LAB123.FACTURA.DESCRIPMED_FACT);
                            $('#cups_LAB123').val(LAB123.FACTURA.CUP);
                            $('#descripcups_LAB123').val(LAB123.FACTURA.DESCRIP_CUP);
                        })
                        .catch((error) => {
                            CON851('', error, null, 'error', 'Error');
                            _evaluarnumero_LAB123();
                        });
                }
            } else {
                _evaluarnumero_LAB123();
            }
        }
    )
}

////////////////////////////////////// MASCARAS /////////////////////////////////////////
var fechafactMask_LAB123 = IMask($('#fecha_LAB123')[0], {
    mask: Date,
    pattern: 'YYYY/MM/DD',
    lazy: true,

    format: function (date) {
        return moment(date).format('YYYY/MM/DD');
    },
    parse: function (str) {
        return moment(str, 'YYYY/MM/DD');
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: '2050',
            to: '2000'
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        }
    }
});

var claseservicioMask_LAB123 = IMask($('#claseservicio_LAB123')[0], {
    mask: '0',
    definitions: {
        '0': /[267]/
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