SER548 = [];
$(document).ready(() => {
    _inputControl('disabled');
    _evaluarFechainicial_SER548();
})

function _evaluarFechainicial_SER548() {
    validarInputs({
        form: '#VALIDAR1_SER548',
        orden: '1'
    },
        () => { _toggleNav() },
        () => {
            SER548.FECHAINICIAL = fechainicialMask.value.replace(/-/g,'');
            let URL = get_url("APP/SALUD/SER548.DLL");
            postData({
                datosh: datosEnvio() + '1|' + SER548.FECHAINICIAL + '|'
            }, URL)
                .then((data) => {
                    console.debug(data);
                    _evaluarCliente_SER548('1');
                })
                .catch((error) => {
                    console.log(error);
                    fechainicialMask.typedValue = '';
                    _evaluarFechainicial_SER548();
                });
        }
    )
}

function _evaluarCliente_SER548(orden) {
    validarInputs({
        form: '#VALIDAR2_SER548',
        orden: orden
    },
        () => { _evaluarFechainicial_SER548() },
        () => {
            SER548.FECHAFINAL = fechafinalMask.value.replace(/-/g,'');
            SER548.CLIENTE = clienteMask._unmaskedValue;
            if (SER548.CLIENTE == '99') {
                $('#cliented_SER548').val('PROCESA TODOS LOS CLIENTES');
                _evaluarMedico_SER548();
            } else {
                let URL = get_url("APP/SALUD/SER548.DLL");
                postData({
                    datosh: datosEnvio() + '2|' + SER548.FECHAINICIAL + '|' + SER548.FECHAFINAL + '|' + SER548.CLIENTE.padStart(10,'0') + '|'
                }, URL)
                    .then((data) => {
                        console.debug(data);
                        $('#cliented_SER548').val(data.CONSULTA[0].DESCRIP);
                        _evaluarMedico_SER548();
                    })
                    .catch((error) => {
                        console.log(error);
                        clienteMask.typedValue = '';
                        _evaluarCliente_SER548('2');
                    });
            }
        }
    )
}

function _evaluarMedico_SER548() {
    validarInputs({
        form: '#VALIDAR3_SER548',
        orden: '1'
    },
        () => { _evaluarCliente_SER548('2') },
        () => {
            SER548.MEDICO = medicoMask._unmaskedValue;
            if (SER548.MEDICO == '99') {
                $('#medicod_SER548').val('PROCESA TODOS LOS MEDICOS');
                _evaluarDivision_SER548();
            } else {
                let URL = get_url("APP/SALUD/SER548.DLL");
                postData({
                    datosh: datosEnvio() + '2|' + SER548.FECHAINICIAL + '|' + SER548.FECHAFINAL + '|' + SER548.MEDICO.padStart(10,'0') + '|' + SER548.MEDICO.padStart(10, '0') + '|'
                }, URL)
                    .then((data) => {
                        console.debug(data);
                        $('#medicod_SER548').val(data.CONSULTA[0].DESCRIP);
                        _evaluarDivision_SER548();
                    })
                    .catch((error) => {
                        console.log(error);
                        clienteMask.typedValue = '';
                        _evaluarCliente_SER548('2');
                    });
            }
        }
    )
}

function _evaluarDivision_SER548() {
    validarInputs({
        form: '#VALIDAR4_SER548',
        orden: '1'
    },
        () => { _evaluarMedico_SER548() },
        () => {
            SER548.DIVISION = $('#division_SER548').val();
            if (SER548.DIVISION == '**') {
                $('#divisiond_SER548').val('TODAS LAS DIVISIONES');
                _evaluarSucursal_SER548();
            } else {
                let URL = get_url("APP/SALUD/SER548.DLL");
                postData({
                    datosh: datosEnvio() + '3|' + SER548.FECHAINICIAL + '|' + SER548.FECHAFINAL + '|' + SER548.CLIENTE.padStart(10,'0') + '|' + SER548.MEDICO.padStart(10, '0') + '|' + SER548.DIVISION + '|'
                }, URL)
                    .then((data) => {
                        console.debug(data);
                        $('#divisiond_SER548').val(data.CONSULTA[0].DESCRIP);
                        _evaluarSucursal_SER548();
                    })
                    .catch((error) => {
                        console.log(error);
                        clienteMask.typedValue = '';
                        _evaluarCliente_SER548('2');
                    });
            }
        }
    )
}

function _evaluarSucursal_SER548() {
    validarInputs({
        form: '#VALIDAR5_SER548',
        orden: '1'
    },
        () => { _evaluarDivision_SER548() },
        () => {
            SER548.SUCURSAL = $('#sucursal_SER548').val();
            let datos_envio = datosEnvio() + '4|' + SER548.FECHAINICIAL + '|' + SER548.FECHAFINAL + '|' + SER548.CLIENTE.padStart(10,'0') + '|' + SER548.MEDICO.padStart(10, '0') + '|' + SER548.DIVISION + '|' + SER548.SUCURSAL + '|';
            console.debug(datos_envio);
            CON851P('04', _evaluarSucursal_SER548, () => {
                let URL = get_url("APP/SALUD/SER548.DLL");
                postData({
                    datosh: datosEnvio() + '4|' + SER548.FECHAINICIAL + '|' + SER548.FECHAFINAL + '|' + SER548.CLIENTE.padStart(10,'0') + '|' + SER548.MEDICO.padStart(10, '0') + '|' + SER548.DIVISION + '|' + SER548.SUCURSAL + '|'
                }, URL)
                    .then((data) => {
                        console.debug(data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        }
    )
}


///////////////////////////////// fin ////////////////////////////////////////////
////////////////////////////// MASCARAS /////////////////////////////////////////

var fechainicialMask = IMask($("#fechadesde_SER548")[0], {
    mask: Date,
    pattern: 'Y-M-d',
    lazy: true,
    overwrite: true,
    autofix: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: 2000, to: 2030, maxLength: 4 },
        M: { mask: IMask.MaskedRange, placeholderChar: 'M', from: 01, to: 12, maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: 1, to: 31, maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        if (fecha == "Invalid date") {
            CON851('01', '01', null, 'error', 'error');
        }
        else {
            return str;
        }
    }
});

var fechafinalMask = IMask($("#fechahasta_SER548")[0], {
    mask: Date,
    pattern: 'Y-M-d',
    lazy: true,
    overwrite: true,
    autofix: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: 2000, to: 2030, maxLength: 4 },
        M: { mask: IMask.MaskedRange, placeholderChar: 'M', from: 01, to: 12, maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: 1, to: 31, maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        if (fecha == "Invalid date") {
            CON851('01', '01', null, 'error', 'error');
        }
        else {
            return str;
        }
    }
});

var clienteMask = IMask($('#cliente_SER548')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });
var medicoMask = IMask($('#medico_SER548')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });