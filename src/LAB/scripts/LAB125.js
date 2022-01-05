var LAB125 = new Object;

////////////////////////////////////// MASCARAS /////////////////////////////////////////
var fechafactMask_LAB125 = IMask($('#fecha_LAB125')[0], {
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

var claseservicioMask_LAB125 = IMask($('#claseservicio_LAB125')[0], {
    mask: '0',
    definitions: {
        '0': /[267]/
    },
    prepare: function(str) {
        if (str.trim() == '') {
            return false
        } else {
            return str.toUpperCase()
        }
    },
    commit: function(value, masked) {
        masked._value = value.toLowerCase()
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(() => {
    _inputControl('disabled');
    _inputControl('reset');
    LAB125.SUCW = $_USUA_GLOBAL[0].PREFIJ;
    _evaluarclaseservicio_LAB125();
})

function _evaluarclaseservicio_LAB125() {
    claseservicioMask_LAB125.typedValue = '';
    validarInputs({
        form: "#VALIDAR1_LAB125",
        orden: '1'
    },
        _toggleNav,
        () => {
            LAB125.CLW = claseservicioMask_LAB125.value;
            if (LAB125.CLW.trim() == ''){
                CON851('','Por favor digite la clase de servicio',null,'error','Error');
                _evaluarclaseservicio_LAB125();
            } else {
                let clase = {
                    '2': 'LABORATORIO',
                    '6': 'PATOLOGIA-CITOL',
                    '7': 'PROMOC. Y PREVE.',
                }
                $('#claseservicio_LAB125').val(LAB125.CLW + ' - ' + clase[LAB125.CLW]);
                _evaluarnumero_LAB125();
            }
        }
    )
}

function _evaluarnumero_LAB125() {
    validarInputs({
        form: "#VALIDAR2_LAB125",
        orden: '1'
    },
        _evaluarclaseservicio_LAB125,
        () => {
            LAB125.NROFACTW = $('#comprobante_LAB125').val().padStart('0',6);
            $('#comprobante_LAB125').val(LAB125.NROFACTW);
            if ($.isNumeric(LAB125.NROFACTW)){
                if (parseInt(LAB125.NROFACTW) == 0){
                    _evaluarnumero_LAB125();
                }
                let URL = get_url("APP/LAB/LAB125.DLL");
                postData({
                        datosh: datosEnvio() + '2|' + LAB125.SUCW + LAB125.CLW + LAB125.NROFACTW + '|'
                    }, URL)
                    .then((data) => {
                        LAB125.FACTURA = data.FACTURA[0];
                        let prefijo = {
                            'E':'CONTADO',
                            'C':'CREDITO',
                            'P':'PENSIONADO',
                            'A':'AMBULATORIO',
                            'T':'ACC.TRANSIT'
                        }
                        let sexo = {
                            'M':'Masc',
                            'F':'Fem.',
                            '':'Err.'
                        }
                        fechafactMask_LAB125.typedValue = LAB125.FACTURA.FECHA_FACT;
                        $('#pago_LAB125').val(LAB125.FACTURA.PREFIJO_FACT);
                        $('#pagod_LAB125').val(prefijo[LAB125.FACTURA.PREFIJO_FACT]);
                        $('#paciente_LAB125').val(LAB125.FACTURA.IDHISTORIA_FACT);
                        $('#paciented_LAB125').val(LAB125.FACTURA.NOMBRE_PACI);
                        $('#edad_LAB125').val(LAB125.FACTURA.EDAD);
                        $('#sexo_LAB125').val(sexo[LAB125.FACTURA.SEXO_PACI]);
                        $('#entidad_LAB125').val(LAB125.FACTURA.NIT_FACT);
                        $('#entidadd_LAB125').val(LAB125.FACTURA.DESCRIPNIT_FACT);
                        $('#profesional_LAB125').val(LAB125.FACTURA.MEDOTR_FACT);
                        $('#profesionald_LAB125').val(LAB125.FACTURA.DESCRIPMED_FACT);
                        $('#cups_LAB125').val(LAB125.FACTURA.CUP);
                        $('#descripcups_LAB125').val(LAB125.FACTURA.DESCRIP_CUP);
                    })
                    .catch((error) => {
                        CON851('', error, null, 'error', 'Error');
                        $('#comprobante_LAB125').val('');
                        _evaluarnumero_LAB125();
                    });
            } else {
                $('#comprobante_LAB125').val('');
                _evaluarnumero_LAB125();
            }
        }
    )
}