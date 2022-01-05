var LAB124 = new Object;

$(document).ready(() => {
    _inputControl("reset");
    _inputControl("disabled");
    nombreOpcion('7,6 Informe resultados examenes');
    _evaluartipofact_LAB124();
})

function _evaluartipofact_LAB124() {
    validarInputs({
            form: "#VALIDAR1_LAB124",
            orden: '1'
        },
        _toggleNav,
        () => {
            LAB124.TIPOW = tipofactMask_LAB124.value;
            let tipo = {
                '2':'LAB. Y OTROS DIAGN',
                '3':'PYP. Y OTROS DIAGN'
            }
            $('#tipofacturad_LAB124').val(tipo[LAB124.TIPOW]);
            _evaluarformadepago_LAB124();
        }
    )
}

function _evaluarformadepago_LAB124() {
    validarInputs({
            form: "#VALIDAR2_LAB124",
            orden: '1'
        },
        _evaluartipofact_LAB124,
        () => {
            LAB124.PAGOW = formapagoMask_LAB124.value;
            _evaluarpuertaingreso_LAB124();
        }
    )
}

function _evaluarpuertaingreso_LAB124() {
    validarInputs({
            form: "#VALIDAR3_LAB124",
            orden: '1'
        },
        _evaluarformadepago_LAB124,
        () => {
            LAB124.PUERTAW = puertaingresoMask_LAB124.value;
            let ingreso = {
                '1': 'URGENCIAS',
                '2': 'C.EXTERNA',
                '3': 'TODAS'
            }
            $('#puertaingresod_LAB124').val(ingreso[LAB124.PUERTAW]);
            _evaluarbacteriologo_LAB124();
        }
    )
}

function _evaluarbacteriologo_LAB124() {
    validarInputs({
            form: "#VALIDAR4_LAB124",
            orden: '1'
        },
        _evaluarpuertaingreso_LAB124,
        () => {
            LAB124.MEDW = profesionalMask_LAB124.unmaskedValue;
            if (LAB124.MEDW.trim() == '99') {
                $('#bacteriologod_LAB124').val('TODOS LOS MEDICOS');
                _evaluarpaciente_LAB124();
            } else {
                var terceros = LAB124.TERCEROS
                var tercero = terceros.filter(x => x.CODIGO == LAB124.MEDW);
                if (tercero.length > 0) {
                    $('#bacteriologod_LAB124').val(tercero[0].DESCRIP);
                    _evaluarpaciente_LAB124();
                } else {
                    CON851('01', '01', null, 'error', 'Error');
                    profesionalMask_LAB124.typedValue = '';
                    _evaluarbacteriologo_LAB124();
                }
            }
        }
    )
}

function _evaluarpaciente_LAB124() {
    validarInputs({
            form: "#VALIDAR5_LAB124",
            orden: '1'
        },
        _evaluarbacteriologo_LAB124,
        () => {
            LAB124.PACIENTEW = $('#paciente_LAB124').val();
            if (LAB124.PACIENTEW.trim() == '*') {
                $('#paciented_LAB124').val('TODOS LOS PACIENTES');
                _evaluarentidad_LAB124();
            } else {
                var pacientes = LAB124.PACIENTES
                var paciente = pacientes.filter(x => x.CODIGO == LAB124.PACIENTEW);
                if (paciente.length > 0) {
                    $('#paciented_LAB124').val(paciente[0].DESCRIP);
                    _evaluarentidad_LAB124();
                } else {
                    CON851('01', '01', null, 'error', 'Error');
                    $('#paciente_LAB124').val('');
                    _evaluarpaciente_LAB124();
                }
            }
        }
    )
}

function _evaluarentidad_LAB124() {
    validarInputs({
            form: "#VALIDAR6_LAB124",
            orden: '1'
        },
        _evaluarpaciente_LAB124,
        () => {
            LAB124.NITW = entidadMask_LAB124.unmaskedValue;
            if (LAB124.NITW.trim() == '99') {
                $('#entidadd_LAB124').val('TODOS LOS ENTIDADES');
                _evaluarentidad_LAB124();
            } else {
                var terceros = LAB124.TERCEROS
                var tercero = terceros.filter(x => x.CODIGO == LAB124.NITW);
                if (tercero.length > 0) {
                    $('#entidadd_LAB124').val(tercero[0].DESCRIP);
                    _evaluarfechainicial_LAB124();
                } else {
                    CON851('01', '01', null, 'error', 'Error');
                    entidadMask_LAB124.typedValue = '';
                    _evaluarentidad_LAB124();
                }
            }
        }
    )
}

function _evaluarfechainicial_LAB124() {
    validarInputs({
            form: "#VALIDAR7_LAB124",
            orden: '1'
        },
        _evaluarentidad_LAB124,
        () => {
            LAB124.FECHAW = fechainicialMask_LAB124.value.replace(/\//g, '');
            if (LAB124.FECHAW.length < 10) {
                CON851('37', '37', null, 'error', 'Error');
                _evaluarfechainicial_LAB124();
            } else if (LAB124.FECHAW.trim() == '') {
                CON851('03', '03', null, 'error', 'Error');
                _evaluarfechainicial_LAB124();
            } else {
                let URL = get_url("APP/LAB/LAB124.DLL");
                postData({
                        datosh: datosEnvio() + '1|' + LAB124.FECHAW + '|'
                    }, URL)
                    .then((data) => {
                        _evaluarfechafin_LAB124();
                    })
                    .catch((error) => {
                        CON851('', error, null, 'error', 'Error');
                        _evaluarfechainicial_LAB124();
                    });
            }
        }
    )
}

function _evaluarfechafin_LAB124() {
    validarInputs({
            form: "#VALIDAR8_LAB124",
            orden: '1'
        },
        _evaluarfechainicial_LAB124,
        () => {
            LAB124.FECHAFINW = fechafinMask_LAB124.value.replace(/\//g, '');
            if (LAB124.FECHAFINW.length < 10) {
                CON851('37', '37', null, 'error', 'Error');
                _evaluarfechafin_LAB124();
            } else if (LAB124.FECHAFINW.trim() == '') {
                CON851('03', '03', null, 'error', 'Error');
                _evaluarfechafin_LAB124();
            } else {
                if (LAB124.FECHAW < FECHAFINW) {
                    _evaluargrupo_LAB124();
                } else {
                    _evaluarfechafin_LAB124();
                }
            }
        }
    )
}

function _evaluargrupo_LAB124() {
    validarInputs({
            form: "#VALIDAR9_LAB124",
            orden: '1'
        },
        _evaluarfechafin_LAB124,
        () => {
            LAB124.GRUPOW = $('#grupo_LAB124').val();
            if (LAB124.GRUPOW.trim() == '**') {
                $('#grupod_LAB124').val('TODOS LOS GRUPOS');
                _evaluarcodigo_LAB124();
            } else {
                var grupos = LAB124.GRUPOS
                var grupo = grupos.filter(x => x.CODIGO == LAB124.GRUPOW);
                if (grupo.length > 0) {
                    $('#paciented_LAB124').val(grupo[0].DESCRIP);
                    _evaluarcodigo_LAB124('1');
                } else {
                    CON851('01', '01', null, 'error', 'Error');
                    $('#grupo_LAB124').val('');
                    codigoMask_LAB124.typedValue = 'N';
                    vlrcerosMask_LAB124.typedValue = 'N';
                    _evaluargrupo_LAB124();
                }
            }
        }
    )
}

function _evaluarcodigo_LAB124(orden) {
    validarInputs({
            form: "#VALIDAR9_LAB124",
            orden: orden
        },
        _evaluargrupo_LAB124,
        () => {
            LAB124.CODIW = codigoMask_LAB124.value;
            LAB124.SWCERO = vlrcerosMask_LAB124.value;
            if (LAB124.CODIW.length == 0) {
                _evaluarcodigo_LAB124('1');
            } else if (LAB124.SWCERO.length == 0) {
                _evaluarcodigo_LAB124('2');
            } else {
                _evaluarsucursal_LAB124();
            }
        }
    )
}

function _evaluarsucursal_LAB124() {
    validarInputs({
            form: "#VALIDAR10_LAB124",
            orden: '1'
        },
        () => { _evaluarcodigo_LAB124('2') },
        () => {
            LAB124.SUCW = $('#sucursal_LAB124').val();
            let URL = get_url("APP/LAB/LAB124.DLL");
            postData({
                    datosh: datosEnvio() + '2|' + LAB124.FECHAW + '|' + LAB124.SUCW + '|' + LAB124.PACIENTEW + '|' + LAB124.FECHAFINW + '|' + LAB124.PUERTAW + '|' + LAB124.TIPOW + '|' + LAB124.PAGOW + '|' + LAB124.MEDW + '|' + LAB124.NITW + '|'
                }, URL)
                .then((data) => {
                    console.debug(data);
                })
                .catch((error) => {
                    CON851('', error, null, 'error', 'Error');
                    _evaluarsucursal_LAB124();
                });
        }
    )
}



//////////////////////////////////// MASCARAS ////////////////////////////////////////////

var tipofactMask_LAB124 = IMask($('#tipofactura_LAB124')[0], {
    mask: '0',
    definitions: {
        '0': /[27]/
    }
});

var formapagoMask_LAB124 = IMask($('#formadepago_LAB124')[0], {
    mask: '*',
    definitions: {
        '*': /[ECAPT*]/
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

var puertaingresoMask_LAB124 = IMask($('#puertaingreso_LAB124')[0], {
    mask: '0',
    definitions: {
        '0': /[123]/
    }
});

var profesionalMask_LAB124 = new IMask($('#bacteriologo_LAB124')[0], { mask: Number, thousandsSeparator: ',' });
var entidadMask_LAB124 = new IMask($('#entidad_LAB124')[0], { mask: Number, thousandsSeparator: ',' });

var codigoMask_LAB124 = IMask($('#discriminarcodigo_LAB124')[0], {
    mask: 'a',
    definitions: {
        'a': /[SN]/
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

var vlrcerosMask_LAB124 = IMask($('#solovlr_LAB124')[0], {
    mask: 'a',
    definitions: {
        'a': /[SN]/
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