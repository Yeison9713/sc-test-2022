var SER4C2 = new Object;

/////// MASCARAS
var valorfacturado_SER4C2 = IMask($('#quirurVlrFact_SER4C2')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 });
var valorreclamado_SER4C2 = IMask($('#quirurVlrRecl_SER4C2')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 });
var valorfacturado2_SER4C2 = IMask($('#transVlrFact_SER4C2')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 });
var valorreclamado2_SER4C2 = IMask($('#transVlrRecl_SER4C2')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 });
var prefijoMask_SER4C2 = IMask($('#prefijo_SER4C2')[0], {
    mask: 'a',
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

var autoridadMask_SER4C2 = IMask($('#autorid_SER4C2')[0], {
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

var cobroMask_SER4C2 = IMask($('#cobro_SER4C2')[0], {
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

var zonaambMask_SER4C2 = IMask($('#Envios_SER4C2')[0], {
    mask: 'a',
    definitions: {
        'a': /[UR]/
    },
    prepare: function (str) {
        return str.toUpperCase()
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});

var momentFormat = 'YYYY/MM/DD HH:mm';
var momentFormat2 = 'YYYY/MM/DD';
var fechaocurrMask = IMask($('#fecha_SER4C2')[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(1999, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1970,
            to: 2030
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
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }
});

var fecharadMask_SER4C2 = IMask($('#fechaRadic_SER4C2')[0], {
    mask: Date,
    pattern: momentFormat2,
    lazy: true,
    min: new Date(1999, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1970,
            to: 2030
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

var fechainipolMask = IMask($('#vigenDesde_SER4C2')[0], {
    mask: Date,
    pattern: momentFormat2,
    lazy: true,
    min: new Date(1999, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1970,
            to: 2030
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
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }
});

var fechafinpolMask = IMask($('#vigenHasta_SER4C2')[0], {
    mask: Date,
    pattern: momentFormat2,
    lazy: true,
    min: new Date(1999, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1970,
            to: 2030
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
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }
});

var fecharemiMask = IMask($('#fechaRemision_SER4C2')[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(0000, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 2030
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
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }
});

var fechaacepMask = IMask($('#fechaAceptacion_SER4C2')[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(0000, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 2030
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
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }
});

var fechaingMask_SER4C2 = IMask($('#fechaIngVic_SER4C2')[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(1999, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1970,
            to: 2030
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
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }
});

var fechaegrMask_SER4C2 = IMask($('#fechaEgrVic_SER4C2')[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(1999, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1970,
            to: 2030
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
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }
});
///////


$(document).ready(() => {
    _inputControl('reset');
    _inputControl('disabled');
    SER4C2.VALIDAIMPW = ''
    let active = $('#navegacion').find('li.opcion-menu.active');
    SER4C2.OPCIONACTIVA = active[0].attributes[2].nodeValue;
    let Nombreopcion = {
        '0974372': '9,7,4,3,7,2 - Diligenciar formato FURIPS',
        '0974373': '9,7,4,3,7,3 - Reimprimir formato FURIPS',
    }
    nombreOpcion(Nombreopcion[SER4C2.OPCIONACTIVA]);
    if ($_USUA_GLOBAL[0].NIT == 800162035) {
        prefijoMask_SER4C2.typedValue = 'V';
    } else {
        prefijoMask_SER4C2.typedValue = 'T';
    }
    _toggleF8([
        { input: 'factura', app: 'SER4C2', funct: _ventanaFactura_SER4C2 },
        { input: 'ciudad', app: 'SER4C2', funct: _ventanaCiudad_SER4C2 },
        { input: 'DiagPrinIng', app: 'SER4C2', funct: _ventanaEnfermedades1_SER4C2 },
        { input: 'otrDiagIng1', app: 'SER4C2', funct: _ventanaEnfermedades2_SER4C2 },
        { input: 'otrDiagIng2', app: 'SER4C2', funct: _ventanaEnfermedades3_SER4C2 },
        { input: 'DiagPrinEgr', app: 'SER4C2', funct: _ventanaEnfermedades4_SER4C2 },
        { input: 'otrDiagEgr1', app: 'SER4C2', funct: _ventanaEnfermedades5_SER4C2 },
        { input: 'otrDiagEgr2', app: 'SER4C2', funct: _ventanaEnfermedades6_SER4C2 },
        { input: 'ipsOrg', app: 'SER4C2', funct: _ventanaIPS1_SER4C2 },
        { input: 'ipsDest', app: 'SER4C2', funct: _ventanaIPS2_SER4C2 },
        { input: 'medicoTratante', app: 'SER4C2', funct: _ventanaProfesional_SER4C2 },
        { input: 'placaAmb', app: 'SER4C2', funct: _ventanaPlacas_SER4C2 },
        { input: 'codConductorAmb', app: 'SER4C2', funct: _ventanaTerceros_SER4C2 },
        { input: 'placa1', app: 'SER4C2', funct: _ventanaPlacas2_SER4C2 },
        { input: 'placa2', app: 'SER4C2', funct: _ventanaPlacas3_SER4C2 },
        { input: 'codProp1', app: 'SER4C2', funct: _ventanaTerceros2_SER4C2 },
        { input: 'codProp2', app: 'SER4C2', funct: _ventanaTerceros3_SER4C2 },
        { input: 'propietario', app: 'SER4C2', funct: _ventanaTerceros4_SER4C2 },
        { input: 'conductor', app: 'SER4C2', funct: _ventanaTerceros5_SER4C2 },
    ]);
    loader('show')
    obtenerDatosCompletos({ nombreFd: 'CIUDADES' }, data => {
        data = data.CIUDAD;
        data.pop();
        SER4C2.CIUDADES = data;
        loader('hide');
        _evaluarprefijo_SER4C2();
        obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
            data = data.FIRMAS[0];
            SER4C2.FIRMAS = data;
            obtenerDatosCompletos({ nombreFd: 'IPS' }, data => {
                data = data.IPS;
                data.pop();
                SER4C2.IPS = data;
                obtenerDatosCompletos({ nombreFd: 'PROFESIONALES' }, data => {
                    data = data.ARCHPROF;
                    data.pop();
                    SER4C2.PROFESIONALES = data;
                    obtenerDatosCompletos({ nombreFd: 'ENFERMEDADES' }, data => {
                        data = data.ENFERMEDADES;
                        data.pop();
                        SER4C2.ENFERMEDADES = data;
                    })
                })
            })
        })
    })
})

function _evaluarprefijo_SER4C2() {
    SER4C2.CODIPSREMIW = '';
    SER4C2.CODIPSACEPW = '';
    validarInputs({
        form: '#VALIDAR1_SER4C2',
        orden: '1'
    },
        _toggleNav,
        () => {
            SER4C2.PREFIJOW = prefijoMask_SER4C2.value.trim();
            if ($_USUA_GLOBAL[0].NIT == 892000401 && parseInt($_USUA_GLOBAL[0].FECHALNK.substring(0, 2)) > 16) {
                if (SER4C2.PREFIJOW == 'T' || SER4C2.PREFIJOW == 'P' || SER4C2.PREFIJOW == 'O' || SER4C2.PREFIJOW == 'Q' || SER4C2.PREFIJOW == 'R' || SER4C2.PREFIJOW == 'R' || SER4C2.PREFIJOW == 'S' || SER4C2.PREFIJOW == 'U' || SER4C2.PREFIJOW == 'V' || SER4C2.PREFIJOW == 'W' || SER4C2.PREFIJOW == 'X' || SER4C2.PREFIJOW == 'Y' || SER4C2.PREFIJOW == 'Z') {
                    _infoCON007_SER4C2P()
                } else {
                    CON851('03', '03', null, 'error', 'Error');
                    _evaluarprefijo_SER4C2();
                }
            } else {
                _infoCON007_SER4C2P();
            }
        }
    )
}

function _infoCON007_SER4C2P() {
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + '9' + prefijoMask_SER4C2.value + '|' }, URL)
        .then(data => {
            console.debug(data);
            var data = data.split("|");
            SER4C2.NROW = data[1].substring(3, 9);
            SER4C2.NROW = parseInt(SER4C2.NROW) - 1;
            $('#factura_SER4C2').val(SER4C2.NROW);
            _evaluarnro_SER4C2();
        })
        .catch(err => {
            console.debug(err);
        })
}

function _evaluarnro_SER4C2() {
    validarInputs({
        form: '#VALIDAR2_SER4C2',
        orden: '1'
    },
        _evaluarprefijo_SER4C2,
        () => {
            SER4C2.NROW = $('#factura_SER4C2').val(); SER4C2.LLAVEW = prefijoMask_SER4C2.value + SER4C2.NROW.padStart(6, '0');
            _inputControl('reset');
            $('#factura_SER4C2').val(SER4C2.NROW);
            $('#prefijo_SER4C2').val(SER4C2.PREFIJOW);
            SER4C2.ARRAYEVENTO = {
                '01': 'ACCIDENTE DE TRANSITO',
                '02': 'SISMO',
                '03': 'MAREMOTO',
                '04': 'ERUPCIONES VOLCANICAS',
                '05': 'DESLIZAMIENTO TIERRA',
                '06': 'INUNDACIONES',
                '07': 'AVALANCHA',
                '08': 'INCENDIO NATURAL',
                '09': 'EXPLOSION TERRORISTA',
                '10': 'INCENDIO TERRORISTA',
                '11': 'COMBATE',
                '12': 'ATAQUE A MUNICIPIOS',
                '13': 'MASACRE',
                '14': 'DESPLAZADOS',
                '15': 'OTRO',
                '16': 'HURACAN',
                '18': 'MINA ANTIPERSONAL'
            }
            SER4C2.ARRAYOTREVENTO = {
                '1': 'CONDUCTOR',
                '2': 'PEATON',
                '3': 'OCUPANTE',
                '4': 'CICLISTA'
            }
            SER4C2.ARRAYASEGURADO = {
                '1': 'ASEGURADO',
                '2': 'NO ASEGURADO',
                '3': 'VEHICULO FANTASMA',
                '4': 'POLIZA FALSA',
                '5': 'VEHICULO EN FUGA'
            }
            postData({ datosh: datosEnvio() + '1|' + SER4C2.LLAVEW + '|' }, get_url("APP/SALUD/SER4C2P.DLL"))
                .then(data => {
                    console.debug(data);
                    _llenardatos_SER4C2(data);
                    // if (SER4C2.OPCIONACTIVA == '0974373') _impresion_SER4C2();
                    if (SER4C2.OPCIONACTIVA == '0974373') {
                        $('#IMPRESION_SER4C2').removeClass('hidden');
                        _evaluarrecalculovalor_SER4C2();
                    }
                    else validarpaciente_SER4C2();
                })
                .catch(err => {
                    console.error(err);
                    if (err.MENSAJE == "01") {
                        postData({ datosh: datosEnvio() + SER4C2.LLAVEW + '|' }, get_url("APP/SALUD/SER808-01.DLL"))
                            .then(data => {
                                console.debug(data);
                                SER4C2.NOVEDADW = '7';
                                SER4C2.NUMERACION = data.NUMER19[0];
                                SER4C2.TIPOEVENTW = data.NUMER19[0].TIPOEVENT_NUM
                                if (!$.isNumeric(data.NUMER19[0].TIPOEVENT_NUM)) SER4C2.TIPOEVENTW = '01';
                                SER4C2.IDPACW = data.NUMER19[0].IDPAC_NUM; SER4C2.DESCRIPPACI = data.NUMER19[0].PACIENTE_NUM;
                                SER4C2.FECHAINGW = data.NUMER19[0].FECHA_ING + ' ' + data.NUMER19[0].HORAING_NUM; SER4C2.FECHAEGRW = data.NUMER19[0].FECHA_RET + ' ' + data.NUMER19[0].HORARET_NUM;
                                fechaingMask_SER4C2.typedValue = SER4C2.FECHAINGW; fechaegrMask_SER4C2.typedValue = SER4C2.FECHAEGRW;
                                SER4C2.ZONAOCURW = ''; SER4C2.CIUDADOCURW = ''; SER4C2.CIAASEGVEHW = data.NUMER19[0].DESCRIP_NUM;
                                SER4C2.OTREVENW = ''; SER4C2.DIROCURW = ''; SER4C2.ZONAOCURW = ''; SER4C2.FECHAOCURW = '';
                                SER4C2.ASEGVEHW = ''; SER4C2.PLACAVEHW = ''; SER4C2.POLIZAVEHW = '';
                                SER4C2.INTERVAUTW = ''; SER4C2.COBEXCEDW = ''; SER4C2.IDPROPVEHW = '';
                                SER4C2.IDCONDVEHW = ''; SER4C2.PLACAVEH2W = ''; SER4C2.PLACAVEH3W = '';
                                SER4C2.CODIPSACEPW = ''; SER4C2.NOMBREIPSREMIW = ''; SER4C2.PERSREMIW = '';
                                SER4C2.CARGOREMIW = ''; SER4C2.FECHAREMIW = ''; SER4C2.FECHAACEPW = '';
                                SER4C2.CODIPSACEPW = ''; SER4C2.PERSACEPW = ''; SER4C2.CARGOACEPW = '';
                                SER4C2.PLACAAMBW = ''; SER4C2.CONDAMBW = ''; SER4C2.ZONAAMBW = ''; SER4C2.DESDEAMBW = '';
                                SER4C2.HASTAAMBW = ''; SER4C2.DIAG1INGW = ''; SER4C2.DIAG2INGW = ''; SER4C2.DIAG3INGW = '';
                                SER4C2.FECHAEGRW = ''; SER4C2.DIAGN1EGRW = ''; SER4C2.DIAGN2EGRW = ''; SER4C2.DIAGN3EGRW = '';
                                SER4C2.MEDATIW = ''; SER4C2.PERSREMIW = ''; SER4C2.PERSACEPW = ''; SER4C2.NRORADANTW = '';
                                $('#entidad_SER4C2').val(SER4C2.CIAASEGVEHW);
                                if (SER4C2.OPCIONACTIVA == '0974373') {
                                    _evaluarnro_SER4C2();
                                } else {
                                    CON851P('Desea copiar otro FURIPS?', validarpaciente_SER4C2, _evaluardocumentootroFURIP_SERC42)
                                }
                            })
                            .catch(err => {
                                console.error(err);
                                _evaluarnro_SER4C2();
                            });
                    } else {
                        _evaluarnro_SER4C2();
                    }
                })
        }
    )
}

function _evaluardocumentootroFURIP_SERC42() {
    SER4C2.VENTANA1ID = 'VENTANANRODOCUMENTO_SER4C2';
    _ventanaalterna_SALUD(data = {
        ID: SER4C2.VENTANA1ID,
        callback: _evaluarnrodocumento_SER4C2,
        titulo: 'VENTANA DE BUSQUEDA FURIP',
        html: ` 
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
            <label class=""col-md-12 col-sm-12 col-xs-12">Digite el Nro de cédula</label>
            <div class="col-md-12 col-sm-12 col-xs-12" id="VALIDAR1VENTANA_SER4C2">
                <div class="inline-inputs">
                    <label class="col-md-5 col-sm-5 col-xs-12">NRO DOCUMENTO:</label>
                    <div class="input-group col-md-7 col-sm-7 col-xs-12">
                        <input id="nrodocumentopaciente_SER4C2" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1">
                    </div>
                </div>
            </div>
        </div>
        `
    })
    _evaluarnrodocumento_SER4C2();
}

function _evaluarnrodocumento_SER4C2() {
    validarInputs({
        form: '#VALIDAR1VENTANA_SER4C2',
        orden: '1'
    },
        () => {
            $(`#${SER4C2.VENTANA1ID}`).remove();
            _evaluarnro_SER4C2();
        },
        () => {
            SER4C2.NRODOCUMENTO = $('#nrodocumentopaciente_SER4C2').val();
            postData({ datosh: datosEnvio() + SER4C2.NRODOCUMENTO.padStart(15, '0') + '|' },
                get_url("APP/SALUD/SER4C2P-01.DLL"))
                .then(data => {
                    console.log(data)
                    data.FACTURAS.pop();
                    data.FACTURAS.sort(function (a, b) {
                        if (a.LLAVE > b.LLAVE) {
                            return 1;
                        }
                        if (a.LLAVE < b.LLAVE) {
                            return -1;
                        }
                    });
                    _ventanaDatos({
                        titulo: "ANTECEDENTES DE FURIPS",
                        columnas: ["LLAVE", "FECHA", "NOMBRE_PACIENTE", "DESCRIPCION"],
                        data: data.FACTURAS,
                        callback_esc: function () {
                            _evaluarnrodocumento_SER4C2();
                        },
                        callback: function (data) {
                            postData({ datosh: datosEnvio() + '1|' + data.LLAVE + '|' }, get_url("APP/SALUD/SER4C2P.DLL"))
                                .then(data => {
                                    console.debug(data);
                                    $(`#${SER4C2.VENTANA1ID}`).remove()
                                    _llenardatos_SER4C2(data);
                                    valorfacturado_SER4C2.typedValue = '';
                                    valorreclamado_SER4C2.typedValue = '';
                                    valorfacturado2_SER4C2.typedValue = '';
                                    valorreclamado2_SER4C2.typedValue = '';
                                    $('#medicoTratante_SER4C2').val('');
                                    validarpaciente_SER4C2();
                                })
                                .catch(err => {
                                    console.error(err);
                                    _evaluarnrodocumento_SER4C2();
                                })
                        }
                    });
                })
                .catch(error => {
                    console.error(error);
                    _evaluarnrodocumento_SER4C2();
                });
        }
    )
}

function _llenardatos_SER4C2(data) {
    console.log(data.FACTURA[0], 'FURIPS')
    SER4C2.FURIP = data.FACTURA[0];
    SER4C2.NOVEDADW = '8';
    SER4C2.IDPACW = data.FACTURA[0].ID_PACI;
    SER4C2.DESCRIPPACI = data.FACTURA[0]['1ER_NOM_PACI'] + ' ' + data.FACTURA[0]['2DO_NOM_PACI'] + ' ' + data.FACTURA[0]['1ER_APEL_PACI'] + ' ' + data.FACTURA[0]['2DO_APEL_PACI'];
    SER4C2.TIPOEVENTW = data.FACTURA[0].TIPO_EVEN_FUR;
    $('#naturaleza_SER4C2').val(data.FACTURA[0].TIPO_EVEN_FUR + ' ' + SER4C2.ARRAYEVENTO[data.FACTURA[0].TIPO_EVEN_FUR]);
    SER4C2.OTREVENW = data.FACTURA[0].OTR_EVEN_FUR;
    $('#condicion_SER4C2').val(data.FACTURA[0].CONDIC_FUR + ' ' + SER4C2.ARRAYOTREVENTO[data.FACTURA[0].CONDIC_FUR]);
    SER4C2.DIROCURW = data.FACTURA[0].DIR_OCUR_FUR;
    $('#direcc_SER4C2').val(SER4C2.DIROCURW);
    SER4C2.CIUDADOCURW = `${data.FACTURA[0].COD_CIUD2_OCUR_FUR}${data.FACTURA[0].CIUD_OCUR_FUR}`;
    $('#ciudad_SER4C2').val(SER4C2.CIUDADOCURW);
    SER4C2.ZONAOCURW = data.FACTURA[0].ZONA_OCUR_FUR;
    $('#zona_SER4C2').val(SER4C2.ZONAOCURW);
    SER4C2.FECHAOCURW = data.FACTURA[0].FECHA_OCUR_FUR;
    fechaocurrMask.typedValue = data.FACTURA[0].FECHA_OCUR_FUR + ' ' + data.FACTURA[0].HORA_OCUR_FUR
    $('#descripcionevento_SER4C2').val(data.FACTURA[0].DESCRIP1_FUR.replace(/&/g, '\n') + data.FACTURA[0].DESCRIP2_FUR.replace(/&/g, '\n') + data.FACTURA[0].DESCRIP3_FUR.replace(/&/g, '\n') + data.FACTURA[0].DESCRIP4_FUR.replace(/&/g, '\n') + data.FACTURA[0].DESCRIP5_FUR.replace(/&/g, '\n') + data.FACTURA[0].DESCRIP6_FUR.replace(/&/g, '\n'));
    SER4C2.DESCRIPW = $('#descripcionevento_SER4C2').val();
    SER4C2.ASEGVEHW = data.FACTURA[0].ASEG_VEH_FUR;
    $('#estadoAseg_SER4C2').val(SER4C2.ASEGVEHW + ' ' + SER4C2.ARRAYASEGURADO[SER4C2.ASEGVEHW]);
    SER4C2.PLACAVEHW = data.FACTURA[0].PLACA_CAR;
    $('#placa_SER4C2').val(SER4C2.PLACAVEHW.trim());
    SER4C2.MARCACAR = data.FACTURA[0].MARCA_CAR;
    $('#marca_SER4C2').val(SER4C2.MARCACAR);
    SER4C2.TIPO2CAR = data.FACTURA[0].TIPO2_CAR;
    $('#tipoServ_SER4C2').val(SER4C2.TIPO2CAR);
    SER4C2.POLIZAVEHW = data.FACTURA[0].COD_POL + data.FACTURA[0].NUM_POL;
    $('#poliza_SER4C2').val(SER4C2.POLIZAVEHW);
    SER4C2.CIAASEGVEHW = data.FACTURA[0].CIAG_ASEG_VEH;
    $('#entidad_SER4C2').val(SER4C2.CIAASEGVEHW);
    SER4C2.FECHAINIPOLW = data.FACTURA[0].FECHA_INI_POL;
    SER4C2.FECHAFINPOLW = data.FACTURA[0].FECHA_FIN_POL;
    fechainipolMask.typedValue = SER4C2.FECHAINIPOLW;
    fechafinpolMask.typedValue = SER4C2.FECHAFINPOLW;
    SER4C2.INTERVAUTW = data.FACTURA[0].INTERV_AUT;
    $('#autorid_SER4C2').val(SER4C2.INTERVAUTW);
    SER4C2.COBEXCEDW = data.FACTURA[0].COB_EXCED;
    $('#cobro_SER4C2').val(SER4C2.COBEXCEDW);
    SER4C2.IDPROPVEHW = data.FACTURA[0].PROPIETARIO.ID_PROP_VEH;
    $('#propietario_SER4C2').val(parseInt(SER4C2.IDPROPVEHW).toString());
    $('#propietariod_SER4C2').val(data.FACTURA[0].PROPIETARIO.NOMB_1 + ' ' + data.FACTURA[0].PROPIETARIO.NOMB_2 + ' ' + data.FACTURA[0].PROPIETARIO.APEL1_TER2 + ' ' + data.FACTURA[0].PROPIETARIO.APEL2_TER2);
    SER4C2.IDCONDVEHW = data.FACTURA[0].CONDUCTOR.ID_PROP_VEH;
    $('#conductor_SER4C2').val(parseInt(SER4C2.IDCONDVEHW).toString());
    $('#conductord_SER4C2').val(data.FACTURA[0].CONDUCTOR.NOMB_1 + ' ' + data.FACTURA[0].CONDUCTOR.NOMB_2 + ' ' + data.FACTURA[0].CONDUCTOR.APEL1_TER2 + ' ' + data.FACTURA[0].CONDUCTOR.APEL2_TER2);
    SER4C2.PLACAVEH2W = data.FACTURA[0].PLACA_VEH2;
    $('#placa1_SER4C2').val(SER4C2.PLACAVEH2W);
    $('#codProp1_SER4C2').val(data.FACTURA[0].ID_PROP_VEH2);
    $('#descripProp1_SER4C2').val(data.FACTURA[0].DESCRIP_VEH2);
    SER4C2.PLACAVEH3W = data.FACTURA[0].PLACA_VEH3;
    $('#placa2_SER4C2').val(SER4C2.PLACAVEH3W);
    $('#codProp2_SER4C2').val(data.FACTURA[0].ID_PROP_VEH3);
    $('#descripProp2_SER4C2').val(data.FACTURA[0].DESCRIP_VEH3);
    SER4C2.FECHAREMIW = data.FACTURA[0].FECHA_REMI_FUR.substring(0, 4) + '/' + data.FACTURA[0].FECHA_REMI_FUR.substring(4, 6) + '/' + data.FACTURA[0].FECHA_REMI_FUR.substring(6, 8) + ' ' + data.FACTURA[0].HORA_REMI_FUR.substring(0, 2) + ':' + data.FACTURA[0].HORA_REMI_FUR.substring(2, 4);
    fecharemiMask.typedValue = data.FACTURA[0].FECHA_REMI_FUR;
    SER4C2.CODIPSREMIW = data.FACTURA[0].COD_IPS_REMI;
    SER4C2.NOMBREIPSREMIW = data.FACTURA[0].NOMBRE_IPS_REMI;
    $('#ipsOrg_SER4C2').val(SER4C2.CODIPSREMIW + ' ' + SER4C2.NOMBREIPSREMIW);
    SER4C2.PERSREMIW = data.FACTURA[0].PERS_REMI;
    $('#Remite_SER4C2').val(SER4C2.PERSREMIW);
    SER4C2.CARGOREMIW = data.FACTURA[0].CARGO_REMI;
    $('#cargo1_SER4C2').val(SER4C2.CARGOREMIW);
    SER4C2.FECHAACEPW = data.FACTURA[0].FECHA_ACEP_FUR; SER4C2.HORAACEPW = data.FACTURA[0].HORA_ACEP_FUR;
    $('#fechaAceptacion_SER4C2').val(SER4C2.FECHAACEPW.substring(0, 4) + '/' + SER4C2.FECHAACEPW.substring(4, 6) + '/' + SER4C2.FECHAACEPW.substring(6, 8) + ' ' + SER4C2.HORAACEPW.substring(0, 2) + ':' + SER4C2.HORAACEPW.substring(2, 4));
    SER4C2.CODIPSACEPW = data.FACTURA[0].COD_IPS_ACEP;
    $('#ipsDest_SER4C2').val(SER4C2.CODIPSACEPW + ' ' + data.FACTURA[0].NOMBRE_IPS_ACEP);
    SER4C2.PERSACEPW = data.FACTURA[0].PERS_ACEP;
    $('#persRecibe_SER4C2').val(SER4C2.PERSACEPW);
    SER4C2.CARGOACEPW = data.FACTURA[0].CARGO_ACEP;
    $('#cargo2_SER4C2').val(SER4C2.CARGOACEPW);
    SER4C2.PLACAAMBW = data.FACTURA[0].PLACA_AMB;
    $('#placaAmb_SER4C2').val(SER4C2.PLACAAMBW);
    if (SER4C2.PLACAAMBW.trim() == '') {
        SER4C2.AMBULCAR = '';
    } else {
        postData({
            datosh: datosEnvio(), llave: SER4C2.PLACAAMBW
        }, get_url("APP/SALUD/CER101.DLL"))
            .then(data => {
                console.log(data);
                SER4C2.AMBULCAR = data.AMBUL; SER4C2.MARCACAR = data.MARCA;
                let ambul = {
                    '1': 'BASICA',
                    '2': 'MEDICADA',
                    '3': 'NO APLICA',
                    '': ''
                };
                $('#tipoTransp_SER4C2').val(SER4C2.AMBULCAR + ' ' + ambul[SER4C2.AMBULCAR]);
            }).catch(error => {
                console.error(error);
                SER4C2.AMBULCAR = '';
                SER4C2.MARCACAR = '';
                $('#tipoTransp_SER4C2').val('');
            });
    }
    SER4C2.CONDAMBW = data.FACTURA[0].COND_AMB_FUR;
    $('#codConductorAmb_SER4C2').val(SER4C2.CONDAMBW);
    if (parseInt(SER4C2.CONDAMBW) == 0 || SER4C2.CONDAMBW.trim() == '') {
        $('#codConductorAmb_SER4C2').val('');
        $('#descripConducAmb_SER4C2').val('');
    } else {
        let URL = get_url("APP/CONTAB/CON802_01.DLL");
        postData({
            datosh: datosEnvio() + SER4C2.CONDAMBW.padStart(10, '0') + "|8|",
        }, URL)
            .then(data => {
                $('#descripConducAmb_SER4C2').val(data.TERCER[0].DESCRIP_TER);
            }).catch(error => {
                $('#descripConducAmb_SER4C2').val('');
                console.error(error);
            });
    };
    SER4C2.ZONAAMBW = data.FACTURA[0].ZONA_AMB
    if (SER4C2.ZONAAMBW.trim() == '') zonaambMask_SER4C2.typedValue = 'U';
    else zonaambMask_SER4C2.typedValue = SER4C2.ZONAAMBW;
    SER4C2.DESDEAMBW = data.FACTURA[0].DESDE_AMB;
    $('#transpDesde_SER4C2').val(SER4C2.DESDEAMBW);
    SER4C2.HASTAAMBW = data.FACTURA[0].HASTA_AMB;
    $('#transpHasta_SER4C2').val(SER4C2.HASTAAMBW);
    SER4C2.FECHAINGW = data.FACTURA[0].FECHA_ING_FUR;
    fechaingMask_SER4C2.typedValue = SER4C2.FECHAINGW + ' ' + data.FACTURA[0].HORA_ING_FUR;
    // $('#fechaIngVic_SER4C2').val(SER4C2.FECHAINGW);
    SER4C2.DIAG1INGW = data.FACTURA[0].DIAG1ING_FUR;
    postData({ datosh: `${datosEnvio()}|`, codigo: SER4C2.DIAG1INGW, paso: '1' },
        get_url("APP/SALUD/SER851.DLL"))
        .then(data => {
            console.log(data);
            $('#DiagPrinIng_SER4C2').val(data.COD_ENF);
            $('#descriPrinDiagIng_SER4C2').val(data.NOMBRE_ENF);
        }).catch(error => {
            console.error(error);
        });
    SER4C2.DIAG2INGW = data.FACTURA[0].DIAG2ING_FUR;
    postData({ datosh: `${datosEnvio()}|`, codigo: SER4C2.DIAG2INGW, paso: '1' },
        get_url("APP/SALUD/SER851.DLL"))
        .then(data => {
            console.log(data);
            $('#otrDiagIng1_SER4C2').val(data.COD_ENF);
            $('#descripotrDiagIng1_SER4C2').val(data.NOMBRE_ENF);
        }).catch(error => {
            console.error(error);
        });
    SER4C2.DIAG3INGW = data.FACTURA[0].DIAG3ING_FUR;
    postData({ datosh: `${datosEnvio()}|`, codigo: SER4C2.DIAG3INGW, paso: '1' },
        get_url("APP/SALUD/SER851.DLL"))
        .then(data => {
            console.log(data);
            $('#otrDiagIng2_SER4C2').val(data.COD_ENF);
            $('#descripotrDiagIng2S_SER4C2').val(data.NOMBRE_ENF);
        }).catch(error => {
            console.error(error);
        });
    SER4C2.FECHAEGRW = data.FACTURA[0].FECHA_EGR_FUR + ' ' + data.FACTURA[0].HORA_EGR_FUR;
    fechaegrMask_SER4C2.typedValue = SER4C2.FECHAEGRW;
    SER4C2.DIAGN1EGRW = data.FACTURA[0].DIAG1EGR_FUR;
    postData({ datosh: `${datosEnvio()}|`, codigo: SER4C2.DIAGN1EGRW, paso: '1' },
        get_url("APP/SALUD/SER851.DLL"))
        .then(data => {
            console.log(data);
            $('#DiagPrinEgr_SER4C2').val(data.COD_ENF);
            $('#descriPrinDiagEgr_SER4C2').val(data.NOMBRE_ENF);
        }).catch(error => {
            console.error(error);
        });
    SER4C2.DIAGN2EGRW = data.FACTURA[0].DIAG2EGR_FUR;
    postData({ datosh: `${datosEnvio()}|`, codigo: SER4C2.DIAGN2EGRW, paso: '1' },
        get_url("APP/SALUD/SER851.DLL"))
        .then(data => {
            console.log(data);
            $('#otrDiagEgr1_SER4C2').val(data.COD_ENF);
            $('#descripotrDiagEgr1_SER4C2').val(data.NOMBRE_ENF);
        }).catch(error => {
            console.error(error);
        });
    SER4C2.DIAGN3EGRW = data.FACTURA[0].DIAG3EGR_FUR;
    postData({ datosh: `${datosEnvio()}|`, codigo: SER4C2.DIAGN3EGRW, paso: '1' },
        get_url("APP/SALUD/SER851.DLL"))
        .then(data => {
            console.log(data);
            $('#otrDiagEgr2_SER4C2').val(data.COD_ENF);
            $('#descripotrDiagEgr2S_SER4C2').val(data.NOMBRE_ENF);
        }).catch(error => {
            console.error(error);
        });
    SER4C2.MEDATIW = data.FACTURA[0].MEDICO.MED_ATI_FUR;
    SER4C2.REGMED = data.FACTURA[0].MEDICO.REG_MED;

    $('#medicoTratante_SER4C2').val(SER4C2.MEDATIW.trim());
    let URL = get_url("APP/CONTAB/CON802_01.DLL");
    postData({
        datosh: datosEnvio() + SER4C2.MEDATIW.padStart(10, '0') + "|8|",
    }, URL)
        .then(data => {
            $('#descripMedicoTratante_SER4C2').val(data.TERCER[0].DESCRIP_TER);
        }).catch(error => {
            console.error(error);
            $('#descripMedicoTratante_SER4C2').val('');
        });
    SER4C2.VLRMQFACTW = data.FACTURA[0].VLR_MQ_FACT;
    valorfacturado_SER4C2.typedValue = SER4C2.VLRMQFACTW;
    SER4C2.VLRMQRECLW = data.FACTURA[0].VLR_MQ_RECL;
    valorreclamado_SER4C2.typedValue = SER4C2.VLRMQRECLW;
    SER4C2.VLRTRFACTW = data.FACTURA[0].VLR_TR_FACT;
    valorfacturado2_SER4C2.typedValue = SER4C2.VLRTRFACTW;
    SER4C2.VLRTRRECLW = data.FACTURA[0].VLR_TR_RECL;
    valorreclamado2_SER4C2.typedValue = SER4C2.VLRTRRECLW;
    SER4C2.NRORADW = data.FACTURA[0].NRO_RAD;
    $('#nroRadic_SER4C2').val(SER4C2.NRORADW);
    SER4C2.FECHARADW = data.FACTURA[0].FECHA_RAD;
    $('#fechaRadic_SER4C2').val(SER4C2.FECHARADW);
    SER4C2.NRORADANTW = data.FACTURA[0].NRO_RAD_ANT;
    $('#radicAnt_SER4C2').val(SER4C2.NRORADANTW);
    SER4C2.FOLIOSW = data.FACTURA[0].PROPIETARIO.FOLIOS_FUR;
    $('#folios_SER4C2').val(SER4C2.FOLIOSW);
    SER4C2.IDPROPVEH2W = data.FACTURA[0].ID_PROP_VEH2;
    SER4C2.IDPROPVEH3W = data.FACTURA[0].ID_PROP_VEH3;
    postData({ datosh: datosEnvio() + SER4C2.LLAVEW + '|' }, get_url("APP/SALUD/SER808-01.DLL"))
    .then(data => {
        SER4C2.NUMERACION = data.NUMER19[0];
    })
    .catch(err => {
        console.error(err);
    });
    postData(
        { datosh: datosEnvio() + SER4C2.LLAVEW + '|' },
        get_url("APP/SALUD/SER4C2.DLL")
    )
    .then(data => {
        console.debug(data);
        SER4C2.FACTURAS = data.FACTURA;
        SER4C2.VALORMQ = 0;
        SER4C2.VALORTRAS = 0;
        for (var i in SER4C2.FACTURAS) {
            if (SER4C2.FACTURAS[i].CUPS.substring(0, 2) == 'S3') {
                let valor = parseFloat(SER4C2.FACTURAS[i].VALOR)
                if (isNaN(valor)) valor = 0;
                SER4C2.VALORTRAS = SER4C2.VALORTRAS + valor;
            } else {
                let negativo = SER4C2.FACTURAS[i].CANT.indexOf('-')
                let valor = parseInt(SER4C2.FACTURAS[i].VALOR.replace(/-/g,''))
                if (negativo >= 0) valor = valor * -1
                if (isNaN(valor)) valor = 0;
                console.log(valor)
                SER4C2.VALORMQ = SER4C2.VALORMQ + valor
            }
            valorfacturado_SER4C2.typedValue = SER4C2.VALORMQ.toString();
            valorfacturado2_SER4C2.typedValue = SER4C2.VALORTRAS.toString();
        }
    })
    .catch(err => {
        console.error(err);
    });
}

function validarpaciente_SER4C2() {
    $('#victima_SER4C2').val(SER4C2.IDPACW); $('#descripVictima_SER4C2').val(SER4C2.DESCRIPPACI);
    if (localStorage.getItem('Usuario') == 'ADMI' || localStorage.getItem('Usuario') == 'MONI') {
        setTimeout(() => {
            SER866(_evaluarnro_SER4C2, _validartipoevento_SER4C2, SER4C2.TIPOEVENTW)
        }, 300);
    } else {
        let siniestros = [
            { 'COD': '01', 'DESCRIP': 'ACCIDENTE DE TRANSITO' },
            { 'COD': '02', 'DESCRIP': 'SISMO' },
            { 'COD': '03', 'DESCRIP': 'MAREMOTO' },
            { 'COD': '04', 'DESCRIP': 'ERUPCIONES VOLCANICAS' },
            { 'COD': '05', 'DESCRIP': 'DESLIZAMIENTO TIERRA' },
            { 'COD': '06', 'DESCRIP': 'INUNDACIONES' },
            { 'COD': '07', 'DESCRIP': 'AVALANCHA' },
            { 'COD': '08', 'DESCRIP': 'INCENDIO NATURAL' },
            { 'COD': '09', 'DESCRIP': 'EXPLOSION TERRORISTA' },
            { 'COD': '10', 'DESCRIP': 'INCENDIO TERRORISTA' },
            { 'COD': '11', 'DESCRIP': 'COMBATE' },
            { 'COD': '12', 'DESCRIP': 'ATAQUE A MUNICIPIOS' },
            { 'COD': '13', 'DESCRIP': 'MASACRE' },
            { 'COD': '14', 'DESCRIP': 'DESPLAZADOS' },
            { 'COD': '15', 'DESCRIP': 'OTRO' },
            { 'COD': '16', 'DESCRIP': 'HURACAN' },
            { 'COD': '18', 'DESCRIP': 'MINA ANTIPERSONAL' }
        ]
        let seleccion = siniestros.filter(x => x.COD == SER4C2.TIPOEVENTW);
        console.log(seleccion);
        if (seleccion.length > 0) {
            _validartipoevento_SER4C2(seleccion[0]);
        } else {
            _validartipoevento_SER4C2({ COD: '01', DESCRIP: 'ACCIDENTE DE TRANSITO' });
        }
    }
}

function _validartipoevento_SER4C2(seleccion) {
    $('#naturaleza_SER4C2').val(`${seleccion.COD} ${seleccion.DESCRIP}`);
    SER4C2.TIPOEVENTW = seleccion.COD;
    if (SER4C2.TIPOEVENTW == '15') {
        _evaluarotroevento_SER4C2();
    } else {
        $('#OTROEVENTO_SER4C2').addClass('hidden');
        SER4C2.OTREVENW = '';
        seleccion = '1';
        if (SER4C2.FURIP) seleccion = SER4C2.FURIP.CONDIC_FUR;
        setTimeout(() => { SER866A(_evaluarnro_SER4C2, validarcondicion_SER4C2, seleccion) }, 300);
    }
}

function _evaluarotroevento_SER4C2() {
    $('#OTROEVENTO_SER4C2').removeClass('hidden');
    validarInputs({
        form: '#OTRO_SER4C2',
        orden: '1'
    },
        () => {
            $('#OTROEVENTO_SER4C2').addClass('hidden');
            setTimeout(() => { SER866(_evaluarnro_SER4C2, _validartipoevento_SER4C2) }, 300);
        },
        () => {
            SER4C2.OTREVENW = $('#otroevent_SER4C2').val();
            seleccion = '1';
            if (SER4C2.FURIP) seleccion = SER4C2.FURIP.CONDIC_FUR;
            setTimeout(() => { SER866A(_evaluarnro_SER4C2, validarcondicion_SER4C2) }, 300);
        }
    )
}

function validarcondicion_SER4C2(data) {
    if (data.COD == '0' && SER4C2.TIPOEVENTW == '01') {
        CON851('02', '02', null, 'error', 'Error');
        setTimeout(() => { SER866A(_evaluarnro_SER4C2, validarcondicion_SER4C2) }, 300);
    } else {
        SER4C2.CONDICW = data.COD;
        $('#condicion_SER4C2').val(data.COD + ' ' + data.DESCRIP);
        _evaluardireccionocurrencia_SER4C2();
    }
}

function _evaluardireccionocurrencia_SER4C2() {
    validarInputs({
        form: '#VALIDAR3_SER4C2',
        orden: '1'
    },
        () => { setTimeout(() => { SER866A(_evaluarnro_SER4C2, validarcondicion_SER4C2) }, 300) },
        () => {
            SER4C2.DIROCURW = $('#direcc_SER4C2').val().toUpperCase()
            $('#direcc_SER4C2').val(SER4C2.DIROCURW)
            if (SER4C2.DIROCURW.trim() == '') {
                CON851('03', '03', null, 'error', 'Error');
                _evaluardireccionocurrencia_SER4C2();
            } else {
                _evaluarzonarural_SER4C2();
            }
        }
    )
}

function _evaluarzonarural_SER4C2() {
    if (SER4C2.ZONAOCURW.trim() == '') $('#zona_SER4C2').val('U')
    validarInputs({
        form: '#VALIDAR4_SER4C2',
        orden: '1'
    },
        () => { setTimeout(() => { SER866A(_evaluarnro_SER4C2, validarcondicion_SER4C2) }, 300) },
        () => {
            SER4C2.ZONAOCURW = $('#zona_SER4C2').val();
            _evaluarciudadocurrencia_SER4C2();
        }
    )
}

function _evaluarciudadocurrencia_SER4C2() {
    if (SER4C2.CIUDADOCURW.trim() == '') $('#ciudad_SER4C2').val($_USUA_GLOBAL[0].COD_CIUD);
    else $('#ciudad_SER4C2').val(SER4C2.CIUDADOCURW.substring(0, 5))
    validarInputs({
        form: '#VALIDAR5_SER4C2',
        orden: '1'
    },
        () => { setTimeout(() => { SER866A(_evaluarnro_SER4C2, validarcondicion_SER4C2) }, 300) },
        () => {
            SER4C2.CIUDADOCURW = $('#ciudad_SER4C2').val().padStart(5, '0');
            var ciudades = SER4C2.CIUDADES;
            var ciudad = ciudades.filter(x => x.COD == SER4C2.CIUDADOCURW);
            console.log(ciudad);
            if (ciudad.length > 0) {
                $('#ciudad_SER4C2').val(ciudad[0].COD + ' ' + ciudad[0].NOMBRE);
                _evaluarfechaocurrido_SER4C2();
            } else {
                CON851('03', '03', null, 'error', 'Error');
                _evaluarciudadocurrencia_SER4C2();
            }
        }
    )
}

function _evaluarfechaocurrido_SER4C2() {
    if (fechaocurrMask.value.trim() == '') {
        fechaocurrMask.typedValue = moment().format('YYYYMMDD HHmm');
    }
    validarInputs({
        form: '#VALIDAR6_SER4C2',
        orden: '1'
    },
        () => { setTimeout(() => { SER866A(_evaluarnro_SER4C2, validarcondicion_SER4C2) }, 300) },
        () => {
            SER4C2.FECHAOCURW = fechaocurrMask.value;
            if (SER4C2.FECHAOCURW.length > 15) {
                _evaluardescripcion_SER4C2('1');
            } else {
                CON851('03', '03', null, 'error', 'Error');
                _evaluarfechaocurrido_SER4C2();
            }
        }
    )
}

function _evaluardescripcion_SER4C2(orden) {
    validarInputs({
        form: '#VALIDAR7_SER4C2',
        orden: orden
    },
        () => { setTimeout(() => { SER866A(_evaluarnro_SER4C2, validarcondicion_SER4C2) }, 300) },
        () => {
            SER4C2.DESCRIPW = $('#descripcionevento_SER4C2').val().toUpperCase()
            $('#descripcionevento_SER4C2').val(SER4C2.DESCRIPW)
            if (SER4C2.TIPOEVENTW != '01') {
                $('#estadoAseg_SER4C2').val('');
                $('#placa_SER4C2').val('');
                $('#marca_SER4C2').val('');
                $('#tipoServ_SER4C2').val('');
                $('#poliza_SER4C2').val('');
                $('#entidad_SER4C2').val('');
                SER4C2.ASEGVEHW = '';
                SER4C2.CIAASEGVEHW = '';
                $('#vigenDesde_SER4C2').val('');
                $('#autorid_SER4C2').val('');
                $('#cobro_SER4C2').val('');
                $('#vigenHasta_SER4C2').val('');
                $('#propietario_SER4C2').val('');
                $('#conductor_SER4C2').val('');
                // FALTA INICIALIZAR LAS VARIABLE PARA NO TENER INCONVENIENTES AL MOMENTO DE GUARDAR
                _evaluardatoremision_SER4C2();
            } else {
                let seleccion = '1'
                if (SER4C2.FURIP) seleccion = SER4C2.FURIP.ASEG_VEH_FUR;
                SER866B(() => { _evaluardescripcion_SER4C2('1') }, _validarSER866B, seleccion);
            }
        }
    )
}

function _validarSER866B(seleccion) {
    console.debug(seleccion);
    SER4C2.ASEGVEHW = seleccion.COD;
    $('#estadoAseg_SER4C2').val(seleccion.COD + ' ' + SER4C2.ARRAYASEGURADO[seleccion.COD]);
    if (seleccion.COD == '3') {
        $('#placa_SER4C2').val('');
        $('#marca_SER4C2').val('');
        $('#tipoServ_SER4C2').val('');
        $('#poliza_SER4C2').val('');
        $('#entidad_SER4C2').val('');
        $('#vigenDesde_SER4C2').val('');
        $('#autorid_SER4C2').val('');
        $('#cobro_SER4C2').val('');
        $('#vigenHasta_SER4C2').val('');
        $('#propietario_SER4C2').val('');
        $('#conductor_SER4C2').val('');
        SER4C2.PLACAVEHW = '';
        SER4C2.POLIZAVEHW = '';
        SER4C2.CIAASEGVEHW = '';
        SER4C2.FECHAINIPOLW = '';
        SER4C2.INTERVAUTW = '';
        SER4C2.COBEXCEDW = '';
        SER4C2.FECHAFINPOLW = '';
        _evaluarplacaaccidente_SER4C2();
    } else {
        _evaluarplacaaccidente_SER4C2();
    }
}

function _evaluarplacaaccidente_SER4C2() {
    validarInputs({
        form: '#VALIDAR8_SER4C2',
        orden: '1'
    },
        () => {
            setTimeout(() => {
                let seleccion = '1'
                if (SER4C2.FURIP) seleccion = SER4C2.FURIP.ASEG_VEH_FUR;
                SER866B(() => { _evaluardescripcion_SER4C2('1') }, _validarSER866B, seleccion)
            }, 300)
        },
        () => {
            var placas = SER4C2.CARROS;
            SER4C2.PLACAVEHW = $('#placa_SER4C2').val().toUpperCase();
            $('#placa_SER4C2').val(SER4C2.PLACAVEHW);
            if (SER4C2.ASEGVEHW.trim() == '3') {
                _evaluardatoremision_SER4C2()
            } else {
                if (SER4C2.PLACAVEHW.trim() == '') {
                    CON851('01', '01', null, 'error', 'Error');
                    _evaluarplacaaccidente_SER4C2();
                } else {
                    postData({
                        datosh: datosEnvio(), llave: SER4C2.PLACAVEHW
                    }, get_url("APP/SALUD/CER101.DLL"))
                        .then(data => {
                            console.log(data);
                            if ((data.SERV == '1' || data.SERV == '2' || data.SERV == '3' || data.SERV == '4' || data.SERV == '5' || data.SERV == '6' || data.SERV == '7') || (SER4C2.ASEGVEHW == '5')) {
                                $('#marca_SER4C2').val(data.MARCA);
                                $('#tipoServ_SER4C2').val(data.TIPO2);
                                SER4C2.NTIPROPCAR = data.PROPIETARIO; SER4C2.CONDCAR = data.CONDUCTOR;
                                _evaluarpolizaveh_SER4C2('1');
                            } else {
                                let { ipcRenderer } = require("electron");
                                ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/CER101.html', placa: SER4C2.PLACAVEHW });
                                let vector = ['on', 'Actualizando maestro de carros...']
                                _EventocrearSegventana(vector, _evaluarplacaaccidente_SER4C2);
                            }
                        }).catch(error => {
                            console.error(error);
                            let { ipcRenderer } = require("electron");
                            ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/CER101.html', placa: SER4C2.PLACAVEHW });
                            let vector = ['on', 'Actualizando maestro de carros...']
                            _EventocrearSegventana(vector, _evaluarplacaaccidente_SER4C2);
                        });
                }
            }
        }
    )
}

function _evaluarpolizaveh_SER4C2(orden) {
    if (SER4C2.ASEGVEHW == '2') {
        $('#').val();
    }
    validarInputs({
        form: '#VALIDAR9_SER4C2',
        orden: orden
    },
        _evaluarplacaaccidente_SER4C2,
        () => {
            SER4C2.POLIZAVEHW = $('#poliza_SER4C2').val(); SER4C2.POLIZA2VEHW = $('#poliza2_SER4C2').val();
            _evaluarentidad_SER4C2();
        }
    )
}

function _evaluarentidad_SER4C2() {
    if (SER4C2.CIAASEGVEHW.trim() == '') $('#entidad_SER4C2').val(SER4C2.NUMERACION.DESCRIP_NUM);
    validarInputs({
        form: '#VALIDAR10_SER4C2',
        orden: '1'
    },
        _evaluarplacaaccidente_SER4C2,
        () => {
            SER4C2.CIAASEGVEHW = $('#entidad_SER4C2').val();
            if (SER4C2.NOVEDADW == '7') {
                if (SER4C2.POLIZAVEHW.trim() == '') {
                    fechainipolMask.typedValue = '';
                }
            }
            _evaluarfechainipol_SER4C2();
        }
    )
}

function _evaluarfechainipol_SER4C2() {
    validarInputs({
        form: '#VALIDAR11_SER4C2',
        orden: '1'
    },
        _evaluarentidad_SER4C2,
        () => {
            SER4C2.FECHAINIPOLW = fechainipolMask.value;
            if (SER4C2.FECHAINIPOLW.length >= 10) {
                _evaluarintervinoautoridad_SER4C2();
            } else {
                CON851('03', '03', null, 'error', 'Error');
                _evaluarfechainipol_SER4C2();
            }
        }
    )
}

function _evaluarintervinoautoridad_SER4C2() {
    validarInputs({
        form: '#VALIDAR12_SER4C2',
        orden: '1'
    },
        _evaluarentidad_SER4C2,
        () => {
            SER4C2.INTERVAUTW = autoridadMask_SER4C2.value;
            if (SER4C2.INTERVAUTW.trim() == '') {
                CON851('', 'Digite S o N', _evaluarintervinoautoridad_SER4C2(), 'error', 'Error');
            } else {
                _evaluarcobroexcedente_SER4C2();
            }
        }
    )
}

function _evaluarcobroexcedente_SER4C2() {
    validarInputs({
        form: '#VALIDAR13_SER4C2',
        orden: '1'
    },
        _evaluarintervinoautoridad_SER4C2,
        () => {
            SER4C2.COBEXCEDW = cobroMask_SER4C2.value;
            if (SER4C2.COBEXCEDW.trim() == '') {
                CON851('', 'Digite S o N', _evaluarcobroexcedente_SER4C2(), 'error', 'Error');
            } else {
                _evaluarfechafinpol_SER4C2();
            }
        }
    )
}

function _evaluarfechafinpol_SER4C2() {
    validarInputs({
        form: '#VALIDAR14_SER4C2',
        orden: '1'
    },
        _evaluarentidad_SER4C2,
        () => {
            SER4C2.FECHAFINPOLW = fechafinpolMask.value;
            if (SER4C2.FECHAFINPOLW.length >= 10) {
                _evaluaridpropietarioveh_SER4C2();
            } else {
                CON851('03', '03', null, 'error', 'Error');
                _evaluarfechafinpol_SER4C2();
            }
        }
    )
}

function _evaluaridpropietarioveh_SER4C2() {
    if (parseInt(SER4C2.IDPROPVEHW) == 0) {
        $('#propietario_SER4C2').val(SER4C2.NTIPROPCAR);
    }
    validarInputs({
        form: '#VALIDAR15_SER4C2',
        orden: '1'
    },
        () => {
            if (SER4C2.POLIZAVEHW.trim() == '') {
                _evaluarintervinoautoridad_SER4C2();
            } else {
                _evaluarfechafinpol_SER4C2();
            }
        },
        () => {
            SER4C2.IDPROPVEHW = $('#propietario_SER4C2').val();
            let URL = get_url("APP/CONTAB/CON802_01.DLL");
            postData({
                datosh: datosEnvio() + SER4C2.IDPROPVEHW.padStart(10, '0') + "|8|",
            }, URL)
                .then(data => {
                    SER4C2.IDPROPVEHW = SER4C2.IDPROPVEHW.padStart(10, '0');
                    $('#propietario_SER4C2').val(SER4C2.IDPROPVEHW.padStart(10, '0'));
                    $('#propietariod_SER4C2').val(data.TERCER[0].DESCRIP_TER);
                    _evaluaridconductorveh_SER4C2();
                }).catch(error => {
                    console.error(error);
                    $('#descripMedicoTratante_SER4C2').val('');
                    let { ipcRenderer } = require("electron");
                    ipcRenderer.send('another', datos = { directorio: 'CONTAB/paginas/CON110C.html', cliente: SER4C2.IDPROPVEHW, furip: true });
                    let vector = ['on', 'Actualizando maestro de terceros...']
                    _EventocrearSegventana(vector, _evaluaridpropietarioveh_SER4C2);
                });
        }
    )
}

function _evaluaridconductorveh_SER4C2() {
    if (parseInt(SER4C2.IDCONDVEHW) == 0) {
        $('#conductor_SER4C2').val(SER4C2.CONDCAR);
    }
    validarInputs({
        form: '#VALIDAR16_SER4C2',
        orden: '1'
    },
        _evaluaridpropietarioveh_SER4C2,
        () => {
            SER4C2.IDCONDVEHW = $('#conductor_SER4C2').val();
            let URL = get_url("APP/CONTAB/CON802_01.DLL");
            postData({
                datosh: datosEnvio() + SER4C2.IDCONDVEHW.padStart(10, '0') + "|8|",
            }, URL)
                .then(data => {
                    SER4C2.IDCONDVEHW = SER4C2.IDCONDVEHW.padStart(10, '0');
                    $('#conductor_SER4C2').val(SER4C2.IDCONDVEHW.padStart(10, '0'));
                    $('#conductord_SER4C2').val(data.TERCER[0].DESCRIP_TER);
                    _evaluarplacaveh2_SER4C2();
                }).catch(error => {
                    console.error(error);
                    $('#conductord_SER4C2').val('');
                    let { ipcRenderer } = require("electron");
                    ipcRenderer.send('another', datos = { directorio: 'CONTAB/paginas/CON110C.html', cliente: SER4C2.IDCONDVEHW, furip: true });
                    let vector = ['on', 'Actualizando maestro de terceros...']
                    _EventocrearSegventana(vector, _evaluaridconductorveh_SER4C2);
                });
        }
    )
}


function _evaluarplacaveh2_SER4C2() {
    validarInputs({
        form: '#VALIDAR17_SER4C2',
        orden: '1'
    },
        _evaluaridconductorveh_SER4C2,
        () => {
            SER4C2.PLACAVEH2W = $('#placa1_SER4C2').val();
            if (SER4C2.PLACAVEH2W.trim() == '') {
                // VACIAR VARIABLES E IMPRIMIRLAS EN LA PANTALLA
                SER4C2.IDPROPVEH2W = ""
                SER4C2.IDPROPVEH3W = ""
                _evaluardatoremision_SER4C2();
            } else {
                _evaluaridpropietarioveh2_SER4C2();
            }
        }
    )
}

function _evaluaridpropietarioveh2_SER4C2() {
    validarInputs({
        form: '#VALIDAR18_SER4C2',
        orden: '1'
    },
        _evaluarplacaveh2_SER4C2,
        () => {
            SER4C2.IDPROPVEH2W = $('#codProp1_SER4C2').val();
            if (SER4C2.PLACAVEH2W.trim() == '' || parseInt(SER4C2.PLACAVEH2W) == 0) {
                CON851('02', '02', null, 'error', 'Error');
                _evaluaridpropietarioveh2_SER4C2();
            } else {
                if (SER4C2.IDPROPVEH2W.trim() == '') {
                    CON851('', 'Dato Invalido!', null, 'error', 'Error');
                    _evaluaridpropietarioveh2_SER4C2()
                } else {
                    let URL = get_url("APP/CONTAB/CON802_01.DLL");
                    postData({
                        datosh: datosEnvio() + SER4C2.IDPROPVEH2W.padStart(10, '0') + "|8|",
                    }, URL)
                        .then(data => {
                            SER4C2.IDPROPVEH2W = SER4C2.IDPROPVEH2W.padStart(10, '0');
                            $('#codProp1_SER4C2').val(SER4C2.IDPROPVEH2W.padStart(10, '0'));
                            $('#descripProp1_SER4C2').val(data.TERCER[0].DESCRIP_TER);
                            _evaluarplacaveh3_SER4C2();
                        }).catch(error => {
                            console.error(error);
                            $('#descripProp1_SER4C2').val('');
                            let { ipcRenderer } = require("electron");
                            ipcRenderer.send('another', datos = { directorio: 'CONTAB/paginas/CON110C.html', cliente: SER4C2.IDPROPVEH2W, furip: true });
                            let vector = ['on', 'Actualizando maestro de terceros...']
                            _EventocrearSegventana(vector, _evaluaridpropietarioveh2_SER4C2);
                        });
                }
            }
        }
    )
}

function _evaluarplacaveh3_SER4C2() {
    validarInputs({
        form: '#VALIDAR19_SER4C2',
        orden: '1'
    },
        _evaluaridpropietarioveh2_SER4C2,
        () => {
            SER4C2.PLACAVEH3W = $('#placa2_SER4C2').val();
            if (SER4C2.PLACAVEH3W.trim() == '') {
                // VACIAR VARIABLES E IMPRIMIRLAS EN LA PANTALLA
                SER4C2.IDPROPVEH3W = ""
                _evaluardatoremision_SER4C2();
            } else {
                _evaluaridpropietarioveh3_SER4C2();
            }
        }
    )
}

function _evaluaridpropietarioveh3_SER4C2() {
    validarInputs({
        form: '#VALIDAR20_SER4C2',
        orden: '1'
    },
        _evaluarplacaveh3_SER4C2,
        () => {
            SER4C2.IDPROPVEH3W = $('#codProp2_SER4C2').val();
            if (SER4C2.PLACAVEH3W.trim() == '' || parseInt(SER4C2.PLACAVEH3W) == 0) {
                CON851('02', '02', null, 'error', 'Error');
                _evaluaridpropietarioveh3_SER4C2();
            } else {
                if (SER4C2.IDPROPVEH3W.trim() == '') {
                    CON851('', 'Dato Invalido!', null, 'error', 'Error');
                    _evaluaridpropietarioveh3_SER4C2()
                } else {
                    let URL = get_url("APP/CONTAB/CON802_01.DLL");
                    postData({
                        datosh: datosEnvio() + SER4C2.IDPROPVEH3W.padStart(10, '0') + "|8|",
                    }, URL)
                        .then(data => {
                            SER4C2.IDPROPVEH3W = SER4C2.IDPROPVEH3W.padStart(10, '0');
                            $('#codProp2_SER4C2').val(SER4C2.IDPROPVEH3W.padStart(10, '0'));
                            $('#descripProp2_SER4C2').val(data.TERCER[0].DESCRIP_TER);
                            _evaluardatoremision_SER4C2();
                        }).catch(error => {
                            console.error(error);
                            $('#descripProp2_SER4C2').val('');
                            let { ipcRenderer } = require("electron");
                            ipcRenderer.send('another', datos = { directorio: 'CONTAB/paginas/CON110C.html', cliente: SER4C2.IDPROPVEH3W, furip: true });
                            let vector = ['on', 'Actualizando maestro de terceros...']
                            _EventocrearSegventana(vector, _evaluaridpropietarioveh3_SER4C2);
                        });
                }
            }
        }
    )
}

function _evaluardatoremision_SER4C2() {
    validarInputs({
        form: '#VALIDAR21_SER4C2',
        orden: '1'
    },
        _evaluarplacaveh3_SER4C2,
        () => {
            SER4C2.FECHAREMIW = fecharemiMask.value;
            if (SER4C2.FECHAREMIW == '0' || SER4C2.FECHAREMIW.trim() == '') {
                // IMPRIMIR VARIABLES EN ESPACIOS
                $('#fechaRemision_SER4C2').val('0');
                _evaluardatoaceptacion_SER4C2();
            } else {
                _evaluarcodipsremi_SER4C2();
            }
        }
    )
}

function _evaluarcodipsremi_SER4C2() {
    if (SER4C2.CODIPSREMIW.trim() != '') $('#ipsOrg_SER4C2').val(SER4C2.CODIPSREMIW);
    validarInputs({
        form: '#VALIDAR22_SER4C2',
        orden: '1'
    },
        _evaluardatoremision_SER4C2,
        () => {
            SER4C2.CODIPSREMIW = $('#ipsOrg_SER4C2').val();
            var ipss = SER4C2.IPS;
            var ips = ipss.filter(x => x.COD == SER4C2.CODIPSREMIW.trim());
            if (ips.length > 0) {
                $('#ciudadRemi_SER4C2').val(ips[0].CODCIUDAD + ' - ' + ips[0].CIUDAD);
                SER4C2.FUNCIONARIOIPS = ips[0].FUNCIONARIO;
                _evaluarpersremi_SER4C2();
            } else {
                _evaluarcodipsremi_SER4C2();
            }
        }
    )
}

function _evaluarpersremi_SER4C2() {
    if (SER4C2.PERSREMIW.trim() == '') {
        $('#Remite_SER4C2').val(SER4C2.FUNCIONARIOIPS)
    }
    validarInputs({
        form: '#VALIDAR23_SER4C2',
        orden: '1'
    },
        _evaluarcodipsremi_SER4C2,
        () => {
            SER4C2.PERSREMIW = $('#Remite_SER4C2').val();
            _evaluarcargoremiw_SER4C2();
        }
    )
}

function _evaluarcargoremiw_SER4C2() {
    if (SER4C2.CARGOREMIW.trim() == '') {
        $('#cargo1_SER4C2').val(SER4C2.CARGOIPS);
    }
    validarInputs({
        form: '#VALIDAR24_SER4C2',
        orden: '1'
    },
        _evaluarpersremi_SER4C2,
        () => {
            SER4C2.CARGOREMIW = $('#cargo1_SER4C2').val();
            _evaluardatoaceptacion_SER4C2();
        }
    )
}

function _evaluardatoaceptacion_SER4C2() {
    validarInputs({
        form: '#VALIDAR25_SER4C2',
        orden: '1'
    },
        _evaluarcargoremiw_SER4C2,
        () => {
            SER4C2.FECHAACEPW = fechaacepMask.value;
            if (SER4C2.FECHAACEPW.replace(/\//g, '') == 0 || SER4C2.FECHAACEPW.trim() == '') {
                // IMPRIMIR VARIABLES EN ESPACIOS
                $('#fechaAceptacion_SER4C2').val('0');
                // fechaacepMask.typedValue = '0';
                _evaluarplacaamb_SER4C2();
            } else {
                _evaluarcodipsacep_SER4C2();
            }
        }
    )
}

function _evaluarcodipsacep_SER4C2() {
    if (SER4C2.CODIPSACEPW.trim() != '') $('#ipsDest_SER4C2').val(SER4C2.CODIPSACEPW);
    validarInputs({
        form: '#VALIDAR26_SER4C2',
        orden: '1'
    },
        _evaluardatoaceptacion_SER4C2,
        () => {
            SER4C2.CODIPSACEPW = $('#ipsDest_SER4C2').val();
            var ipss = SER4C2.IPS;
            var ips = ipss.filter(x => x.COD == SER4C2.CODIPSACEPW.trim());
            if (ips.length > 0) {
                $('#ipsDest_SER4C2').val(SER4C2.CODIPSACEPW + ' ' + ips[0].DESCRIP);
                $('#ciudadRemi2_SER4C2').val(ips[0].CODCIUDAD + ' - ' + ips[0].CIUDAD);
                $('#direccDestino_SER4C2').val(ips[0].DIRECCION);
                $('#telefono_SER4C2').val(ips[0].TEL);
                SER4C2.FUNCIONARIOIPS2 = ips[0].FUNCIONARIO;
                SER4C2.CARGOIPS2 = ips[0].CARGO;
                _evaluarpersacep_SER4C2();
            } else {
                _evaluarcodipsacep_SER4C2();
                // LLAMAR SEGUNDA VENTANA PARA CREAR IPS
            }
        }
    )
}

function _evaluarpersacep_SER4C2() {
    if (SER4C2.PERSACEPW.trim() == '') {
        $('#persRecibe_SER4C2').val(SER4C2.FUNCIONARIOIPS2)
    }
    validarInputs({
        form: '#VALIDAR27_SER4C2',
        orden: '1'
    },
        _evaluarcodipsacep_SER4C2,
        () => {
            SER4C2.PERSACEPW = $('#persRecibe_SER4C2').val();
            _evaluarcargoacep_SER4C2();
        }
    )
}

function _evaluarcargoacep_SER4C2() {
    if (SER4C2.CARGOACEPW.trim() == '') {
        $('#cargo2_SER4C2').val(SER4C2.CARGOIPS);
    }
    validarInputs({
        form: '#VALIDAR28_SER4C2',
        orden: '1'
    },
        _evaluarpersremi_SER4C2,
        () => {
            SER4C2.CARGOACEPW = $('#cargo2_SER4C2').val();
            _evaluarplacaamb_SER4C2();
        }
    )
}

function _evaluarplacaamb_SER4C2() {
    validarInputs({
        form: '#VALIDAR29_SER4C2',
        orden: '1'
    },
        _evaluarpersremi_SER4C2,
        () => {
            SER4C2.PLACAAMBW = $('#placaAmb_SER4C2').val();
            if (SER4C2.PLACAAMBW.trim() == '') {
                SER4C2.CONDAMBW = ''; SER4C2.AMBULCAR = ''; SER4C2.ZONAAMBW = '';
                SER4C2.DESDEAMBW = ''; SER4C2.HASTAAMBW = '';
                _evaluarfechaing_SER4C2();
            } else {
                postData({
                    datosh: datosEnvio(), llave: SER4C2.PLACAAMBW
                }, get_url("APP/SALUD/CER101.DLL"))
                    .then(data => {
                        console.log(data);
                        if (data.AMBUL == '1' || data.AMBUL == '2') {
                            SER4C2.AMBULCAR = data.AMBUL;
                            let ambul = {
                                '1': 'BASICA',
                                '2': 'MEDICADA',
                                '3': 'NO APLICA',
                                '': ''
                            };
                            $('#tipoTransp_SER4C2').val(SER4C2.AMBULCAR + ' ' + ambul[SER4C2.AMBULCAR]);
                            _evaluardatozonaamb_SER4C2();
                        } else {
                            CON851('2F', '2F', null, 'warning', 'Advertencia');
                            let { ipcRenderer } = require("electron");
                            ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/CER101.html', placa: SER4C2.PLACAAMBW });
                            let vector = ['on', 'Actualizando maestro de carros...']
                            _EventocrearSegventana(vector, _evaluarplacaamb_SER4C2);
                        }
                    }).catch(error => {
                        console.error(error);
                        let { ipcRenderer } = require("electron");
                        ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/CER101.html', placa: SER4C2.PLACAAMBW });
                        let vector = ['on', 'Actualizando maestro de carros...']
                        _EventocrearSegventana(vector, _evaluarplacaamb_SER4C2);
                    });
            }
        }
    )
}

// function _evaluardatocondambul_SER4C2() {
//     validarInputs({
//         form: '#VALIDAR30_SER4C2',
//         orden: '1'
//     },
//         _evaluarplacaamb_SER4C2,
//         () => {
//             SER4C2.CONDAMBW = $('#codConductorAmb_SER4C2').val();
//             let URL = get_url("APP/CONTAB/CON802_01.DLL");
//             postData({
//                 datosh: datosEnvio() + SER4C2.CONDAMBW.padStart(10, '0') + "|8|",
//             }, URL)
//                 .then(data => {
//                     $('#codConductorAmb_SER4C2').val(SER4C2.CONDAMBW.padStart(10, '0'));
//                     $('#descripConducAmb_SER4C2').val(data.TERCER[0].DESCRIP_TER);
//                     _evaluardatozonaamb_SER4C2();
//                 }).catch(error => {
//                     console.error(error);
//                     $('#descripConducAmb_SER4C2').val('');
//                     let { ipcRenderer } = require("electron");
//                     ipcRenderer.send('another', datos = { directorio: 'CONTAB/paginas/CON110C.html', cliente: SER4C2.CONDAMBW, furip: true });
//                     let vector = ['on', 'Actualizando maestro de terceros...']
//                     _EventocrearSegventana(vector, _evaluardatocondambul_SER4C2);
//                 });
//         }
//     )
// }

function _evaluardatozonaamb_SER4C2() {
    validarInputs({
        form: '#VALIDAR31_SER4C2',
        orden: '1'
    },
        _evaluarplacaamb_SER4C2,
        () => {
            SER4C2.ZONAAMBW = zonaambMask_SER4C2.value;
            let zona = {
                'U': 'URB.',
                'R': 'RURAL'
            };
            $('#Envios_SER4C2').val(SER4C2.ZONAAMBW + ' ' + zona[SER4C2.ZONAAMBW]);
            _evaluardesdeamb_SER4C2();
        }
    )
}

function _evaluardesdeamb_SER4C2() {
    validarInputs({
        form: '#VALIDAR32_SER4C2',
        orden: '1'
    },
        _evaluardatozonaamb_SER4C2,
        () => {
            SER4C2.DESDEAMBW = $('#transpDesde_SER4C2').val();
            if (SER4C2.DESDEAMBW.trim() == '') {
                CON851('02', '02', null, 'error', 'Error');
                _evaluardesdeamb_SER4C2();
            } else {
                _evaluarhastaamb_SER4C2();
            }
        }
    )
}

function _evaluarhastaamb_SER4C2() {
    validarInputs({
        form: '#VALIDAR33_SER4C2',
        orden: '1'
    },
        _evaluardesdeamb_SER4C2,
        () => {
            SER4C2.HASTAAMBW = $('#transpHasta_SER4C2').val();
            if (SER4C2.HASTAAMBW.trim() == '') {
                CON851('02', '02', null, 'error', 'Error');
                _evaluarhastaamb_SER4C2();
            } else {
                _evaluarfechaing_SER4C2();
            }
        }
    )
}

function _evaluarfechaing_SER4C2() {
    validarInputs({
        form: '#VALIDAR34_SER4C2',
        orden: '1'
    },
        _evaluarhastaamb_SER4C2,
        () => {
            SER4C2.FECHAINGW = fechaingMask_SER4C2.value;
            if (SER4C2.FECHAINGW.length > 15) {
                _evaluardatodiag1ing_SER4C2();
            } else {
                CON851('', 'El formato de la fecha no esta completo recuerde que debe ser AÑO/MES/DIA HORA/MINUTO', null, 'error', 'Error');
                _evaluarfechaing_SER4C2();
            }
        }
    )
}

function _evaluardatodiag1ing_SER4C2() {
    validarInputs({
        form: '#VALIDAR35_SER4C2',
        orden: '1'
    },
        _evaluarfechaing_SER4C2,
        () => {
            SER4C2.DIAG1INGW = $('#DiagPrinIng_SER4C2').val();
            postData({ datosh: `${datosEnvio()}|`, codigo: SER4C2.DIAG1INGW, paso: '1' },
                get_url("APP/SALUD/SER851.DLL"))
                .then(data => {
                    console.log(data);
                    if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                        CON851('02', '02', null, 'error', 'Error');
                        $('#otrDiagIng1_SER4C2').val('');
                        _evaluardatodiag1ing_SER4C2();
                    } else {
                        $('#DiagPrinIng_SER4C2').val(data.COD_ENF);
                        $('#descriPrinDiagIng_SER4C2').val(data.NOMBRE_ENF);
                        _evaluardatodiag2ing_SER4C2();
                    }
                }).catch(error => {
                    console.error(error);
                    _evaluardatodiag1ing_SER4C2();
                });
        }
    )
}

function _evaluardatodiag2ing_SER4C2() {
    validarInputs({
        form: '#VALIDAR36_SER4C2',
        orden: '1'
    },
        _evaluardatodiag1ing_SER4C2,
        () => {
            SER4C2.DIAG2INGW = $('#otrDiagIng1_SER4C2').val();
            postData({ datosh: `${datosEnvio()}|`, codigo: SER4C2.DIAG2INGW, paso: '1' },
                get_url("APP/SALUD/SER851.DLL"))
                .then(data => {
                    console.log(data);
                    if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                        console.log('SE DEVUELVE')
                        if (data.COD_ENF.trim() == '') {
                            SER4C2.DIAG3INGW = '    '
                            SER4C2.DIAG2INGW = '    '
                            _evaluardatodiag3ing_SER4C2();
                        } else {
                            CON851('03', '03', null, 'error', 'Error');
                            $('#otrDiagIng1_SER4C2').val('');
                            _evaluardatodiag2ing_SER4C2();
                        }
                    } else {
                        console.log('SIGUE BIEN')
                        $('#otrDiagIng1_SER4C2').val(data.COD_ENF);
                        $('#descripotrDiagIng1_SER4C2').val(data.NOMBRE_ENF);
                        _evaluardatodiag3ing_SER4C2();
                    }
                }).catch(error => {
                    console.error(error, 'ERROR');
                    SER4C2.DIAG3INGW = '    ';
                    if (SER4C2.DIAG2INGW.trim() != '') {
                        CON851('03', '03', null, 'error', 'Error');
                        _evaluardatodiag2ing_SER4C2();
                    } else {
                        _evaluardatodiag3ing_SER4C2();
                    }
                });
        }
    )
}

function _evaluardatodiag3ing_SER4C2() {
    validarInputs({
        form: '#VALIDAR37_SER4C2',
        orden: '1'
    },
        _evaluardatodiag2ing_SER4C2,
        () => {
            SER4C2.DIAG3INGW = $('#otrDiagIng2_SER4C2').val();
            postData({ datosh: `${datosEnvio()}|`, codigo: SER4C2.DIAG3INGW, paso: '1' },
                get_url("APP/SALUD/SER851.DLL"))
                .then(data => {
                    console.log(data);
                    if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                        if (data.COD_ENF.trim() == '') {
                            _evaluarfechaegr_SER4C2();
                        } else {
                            $('#otrDiagIng2_SER4C2').val('');
                            CON851('03', '03', null, 'error', 'Error');
                            _evaluardatodiag3ing_SER4C2();
                        }
                    } else {
                        $('#otrDiagIng2_SER4C2').val(data.COD_ENF);
                        $('#descripotrDiagIng2S_SER4C2').val(data.NOMBRE_ENF);
                        _evaluarfechaegr_SER4C2();
                    }
                }).catch(error => {
                    console.error(error)
                    if (SER4C2.DIAG3INGW.trim() != '') {
                        CON851('03', '03', null, 'error', 'Error');
                        _evaluardatodiag3ing_SER4C2();
                    } else {
                        _evaluarfechaegr_SER4C2();
                    }
                });
        }
    )
}

function _evaluarfechaegr_SER4C2() {
    validarInputs({
        form: '#VALIDAR38_SER4C2',
        orden: '1'
    },
        _evaluardatodiag3ing_SER4C2,
        () => {
            SER4C2.FECHAEGRW = fechaegrMask_SER4C2.value;
            if (SER4C2.FECHAEGRW.trim() == '') {
                _evaluardatodiag1egr_SER4C2();
            } else {
                if (SER4C2.FECHAOCURW.length > 15) {
                    if (fechaingMask_SER4C2.value.replace(/\//g, '') > fechaegrMask_SER4C2.value.replace(/\//g, '')) {
                        _evaluarfechaegr_SER4C2();
                    } else {
                        _evaluardatodiag1egr_SER4C2();
                    }
                } else {
                    CON851('', 'El formato de la fecha no esta completo recuerde que debe ser AÑO/MES/DIA HORA/MINUTO', null, 'error', 'Error');
                    _evaluarfechaegr_SER4C2();
                }
            }
        }
    )
}

function _evaluardatodiag1egr_SER4C2() {
    validarInputs({
        form: '#VALIDAR39_SER4C2',
        orden: '1'
    },
        _evaluarfechaegr_SER4C2,
        () => {
            SER4C2.DIAGN1EGRW = $('#DiagPrinEgr_SER4C2').val();
            postData({ datosh: `${datosEnvio()}|`, codigo: SER4C2.DIAGN1EGRW, paso: '1' },
                get_url("APP/SALUD/SER851.DLL"))
                .then(data => {
                    console.log(data);
                    if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                        if (data.COD_ENF.trim() == '') {
                            SER4C2.DIAGN2EGRW = '    ';
                            SER4C2.DIAGN3EGRW = '    ';
                            _evaluardatomedico_SER4C2();
                        } else {
                            $('#DiagPrinEgr_SER4C2').val('');
                            CON851('03', '03', null, 'error', 'Error');
                            _evaluardatodiag1egr_SER4C2();
                        }
                    } else {
                        $('#DiagPrinEgr_SER4C2').val(data.COD_ENF);
                        $('#descriPrinDiagEgr_SER4C2').val(data.NOMBRE_ENF);
                        _evaluardatodiag2egr_SER4C2();
                    }
                }).catch(error => {
                    console.error(error);
                    SER4C2.DIAGN2EGRW = '    ';
                    SER4C2.DIAGN3EGRW = '    ';
                    if (SER4C2.DIAGN1EGRW.trim() != '') {
                        CON851('03', '03', null, 'error', 'Error');
                        _evaluardatodiag1egr_SER4C2();
                    } else {
                        _evaluardatomedico_SER4C2();
                    }
                });
        }
    )
}

function _evaluardatodiag2egr_SER4C2() {
    validarInputs({
        form: '#VALIDAR40_SER4C2',
        orden: '1'
    },
        _evaluardatodiag1egr_SER4C2,
        () => {
            SER4C2.DIAGN2EGRW = $('#otrDiagEgr1_SER4C2').val();
            postData({ datosh: `${datosEnvio()}|`, codigo: SER4C2.DIAGN2EGRW, paso: '1' },
                get_url("APP/SALUD/SER851.DLL"))
                .then(data => {
                    console.log(data);
                    if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                        if (data.COD_ENF.trim() == '') {
                            SER4C2.DIAGN3EGRW = '    ';
                            _evaluardatodiag3egr_SER4C2();
                        } else {
                            $('#otrDiagEgr1_SER4C2').val('');
                            CON851('03', '03', null, 'error', 'Error');
                            _evaluardatodiag2egr_SER4C2();
                        }
                    } else {
                        $('#otrDiagEgr1_SER4C2').val(data.COD_ENF);
                        $('#descripotrDiagEgr1_SER4C2').val(data.NOMBRE_ENF);
                        _evaluardatodiag3egr_SER4C2();
                    }
                }).catch(error => {
                    console.error(error);
                    SER4C2.DIAGN3EGRW = '    ';
                    if (SER4C2.DIAGN2EGRW.trim() != '') {
                        CON851('03', '03', null, 'error', 'Error');
                        _evaluardatodiag2egr_SER4C2();
                    } else {
                        $('#descripotrDiagEgr1_SER4C2').val('');
                        _evaluardatodiag3egr_SER4C2();
                    }
                });
        }
    )
}

function _evaluardatodiag3egr_SER4C2() {
    validarInputs({
        form: '#VALIDAR41_SER4C2',
        orden: '1'
    },
        _evaluardatodiag2egr_SER4C2,
        () => {
            SER4C2.DIAGN3EGRW = $('#otrDiagEgr2_SER4C2').val();
            postData({ datosh: `${datosEnvio()}|`, codigo: SER4C2.DIAGN3EGRW, paso: '1' },
                get_url("APP/SALUD/SER851.DLL"))
                .then(data => {
                    console.log(data);
                    if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                        if (data.COD_ENF.trim() == '') {
                            _evaluardatomedico_SER4C2();
                        } else {
                            $('#otrDiagEgr2_SER4C2').val('');
                            CON851('03', '03', null, 'error', 'Error');
                            _evaluardatodiag3egr_SER4C2();
                        }
                    }else{
                        $('#otrDiagEgr2_SER4C2').val(data.COD_ENF);
                        $('#descripotrDiagEgr2S_SER4C2').val(data.NOMBRE_ENF);
                        _evaluardatomedico_SER4C2();
                    }
                }).catch(error => {
                    console.error(error);
                    if (SER4C2.DIAGN3EGRW.trim() != '') {
                        CON851('03', '03', null, 'error', 'Error');
                        _evaluardatodiag3egr_SER4C2();
                    } else {
                        $('#descripotrDiagEgr2S_SER4C2').val('');
                        _evaluardatomedico_SER4C2();
                    }
                });
        }
    )
}

function _evaluardatomedico_SER4C2() {
    validarInputs({
        form: '#VALIDAR42_SER4C2',
        orden: '1'
    },
        _evaluardatodiag1egr_SER4C2,
        () => {
            SER4C2.MEDATIW = $('#medicoTratante_SER4C2').val();
            if (parseInt(SER4C2.MEDATIW) == 0) {
                CON851('02', '02', null, 'error', 'Error');
                _evaluardatomedico_SER4C2();
            } else {
                postData({ datosh: `${datosEnvio()}5||||${SER4C2.MEDATIW.padStart(10, '0')}|||||||||||` },
                    get_url("APP/SALUD/SAL401.DLL"))
                    .then((data) => {
                        console.log(data);
                        $('#descripMedicoTratante_SER4C2').val(data.DESCRIPCION);
                        let URL = get_url("APP/SALUD/SER4C2.DLL");
                        postData({ datosh: datosEnvio() + SER4C2.LLAVEW + '|' }, URL)
                            .then(data => {
                                console.debug(data);
                                SER4C2.FACTURAS = data.FACTURA;
                                SER4C2.VALORMQ = 0;
                                SER4C2.VALORTRAS = 0;
                                for (var i in SER4C2.FACTURAS) {
                                    if (SER4C2.FACTURAS[i].CUPS.substring(0, 2) == 'S3') {
                                        let valor = parseInt(SER4C2.FACTURAS[i].VALOR)
                                        if (isNaN(valor)) valor = 0;
                                        SER4C2.VALORTRAS = SER4C2.VALORTRAS + valor;
                                    } else {
                                        let negativo = SER4C2.FACTURAS[i].CANT.indexOf('-')
                                        let valor = parseInt(SER4C2.FACTURAS[i].VALOR.replace(/-/g,''))
                                        if (negativo >= 0) valor = valor * -1
                                        if (isNaN(valor)) valor = 0;
                                        console.log(valor)
                                        SER4C2.VALORMQ = SER4C2.VALORMQ + valor
                                    }
                                }
                                _evaluardatomqfact_SER4C2();
                            })
                            .catch(err => {
                                console.error(err);
                                _evaluardatomedico_SER4C2();
                            });
                    })
                    .catch(error => {
                        console.error(error);
                        _evaluardatomedico_SER4C2();
                    });
            }
        }
    )
}

function _evaluardatomqfact_SER4C2() {
    valorfacturado_SER4C2.typedValue = SER4C2.VALORMQ.toString();
    validarInputs({
        form: '#VALIDAR43_SER4C2',
        orden: '1'
    },
        _evaluardatomedico_SER4C2,
        () => {
            _evaluarmqrecla_SER4C2();
        }
    )
}

function _evaluarmqrecla_SER4C2() {
    valorreclamado_SER4C2.typedValue = '0';
    validarInputs({
        form: '#VALIDAR44_SER4C2',
        orden: '1'
    },
        _evaluardatomqfact_SER4C2,
        () => {
            _evaluartrfact_SER4C2();
        }
    )
}

function _evaluartrfact_SER4C2() {
    valorfacturado2_SER4C2.typedValue = SER4C2.VALORTRAS.toString();
    validarInputs({
        form: '#VALIDAR45_SER4C2',
        orden: '1'
    },
        _evaluarmqrecla_SER4C2,
        () => {
            _evaluartrrecla_SER4C2();
        }
    )
}

function _evaluartrrecla_SER4C2() {
    valorreclamado2_SER4C2.typedValue = '0';
    validarInputs({
        form: '#VALIDAR46_SER4C2',
        orden: '1'
    },
        _evaluartrfact_SER4C2,
        () => {
            _evaluarnrorad_SER4C2();
        }
    )
}

function _evaluarnrorad_SER4C2() {
    validarInputs({
        form: '#VALIDAR47_SER4C2',
        orden: '1'
    },
        _evaluartrfact_SER4C2,
        () => {
            SER4C2.NRORADW = $('#nroRadic_SER4C2').val();
            if (localStorage.getItem('Usuario') == 'ADMI' || localStorage.getItem('Usuario') == 'MONI') {
                SER4C2.FECHARADW = '00000000';
                fecharadMask_SER4C2.typedValue = '00000000';
                _evaluardatoradant_SER4C2();
            } else {
                _evaluarfecharad_SER4C2();
            }
        }
    )
}

function _evaluarfecharad_SER4C2() {
    if (localStorage.Usuario == 'ADMI' || localStorage.Usuario == 'MONI') {
        fecharadMask_SER4C2.typedValue = '00000000';
    }
    validarInputs({
        form: '#VALIDAR48_SER4C2',
        orden: '1'
    },
        _evaluarnrorad_SER4C2,
        () => {
            SER4C2.FECHARADW = fecharadMask_SER4C2.value;
            if (SER4C2.FECHARADW.trim() == '' || SER4C2.FECHARADW == '0') {
                fecharadMask_SER4C2.typedValue = '00000000';
                SER4C2.FECHARADW = '00000000';
                _evaluardatoradant_SER4C2();
            } else {
                if (SER4C2.FECHARADW.length > 9) {
                    _evaluardatoradant_SER4C2('1');
                } else {
                    CON851('03', '03', null, 'error', 'Error');
                    _evaluarfecharad_SER4C2();
                }
            }
        }
    )
}

function _evaluardatoradant_SER4C2(orden) {
    validarInputs({
        form: '#VALIDAR49_SER4C2',
        orden: orden
    },
        _evaluarnrorad_SER4C2,
        () => {
            SER4C2.NRORADANTW = $('#radicAnt_SER4C2').val();
            SER4C2.FOLIOSW = $('#folios_SER4C2').val();
            CON851P('01', _evaluardatomqfact_SER4C2, _validarguardar_SER4C2);
        }
    )
}

function _validarguardar_SER4C2() {
    let URL = get_url("APP/SALUD/SER4C2-01.DLL");
    let datosenvio = `${SER4C2.LLAVEW}|${SER4C2.IDPACW.trim().padStart(15, '0')}|${SER4C2.CONDICW}|${SER4C2.TIPOEVENTW}|`
    datosenvio += `${SER4C2.OTREVENW}|${SER4C2.DIROCURW}|${SER4C2.FECHAOCURW.replace(/\//g, '').substring(0, 8)}|${SER4C2.FECHAOCURW.replace(/:/g, '').substring(11, 15)}|${SER4C2.CIUDADOCURW}|${SER4C2.ZONAOCURW}|${SER4C2.DESCRIPW.replace(/\n/g, '&').padEnd(270, ' ')}|`
    datosenvio += `${SER4C2.FECHAREMIW.replace(/\//g, '').substring(0, 8).padEnd(8, '0')}|${SER4C2.CODIPSREMIW}|${SER4C2.PERSREMIW}|${SER4C2.CARGOREMIW}|${SER4C2.FECHAACEPW.replace(/\//g, '').substring(0, 8).padEnd(8, '0')}|${SER4C2.CODIPSACEPW}|${SER4C2.PERSACEPW}|`
    datosenvio += `${SER4C2.CARGOACEPW}|${SER4C2.FECHAACEPW.replace(/:/g, '').substring(11, 15).padEnd(4, '0')}|${SER4C2.FECHAREMIW.replace(/:/g, '').substring(11, 15).padEnd(4, '0')}|${SER4C2.PLACAAMBW}|${SER4C2.CONDAMBW}|${SER4C2.DESDEAMBW}|${SER4C2.HASTAAMBW}|`
    datosenvio += ` |${SER4C2.ZONAAMBW}|${SER4C2.FECHAINGW.replace(/\//g, '').substring(0, 8).padEnd(8, '0')}|${SER4C2.FECHAINGW.replace(/:/g, '').substring(11, 15).padEnd(4, '0')}|${SER4C2.FECHAEGRW.replace(/\//g, '').substring(0, 8).padEnd(8, '0')}|${SER4C2.FECHAEGRW.replace(/:/g, '').substring(11, 15).padEnd(4, '0')}|${SER4C2.DIAG1INGW}|`
    datosenvio += `${SER4C2.DIAG2INGW}|${SER4C2.DIAG3INGW}|${SER4C2.DIAGN1EGRW}|${SER4C2.DIAGN2EGRW}|${SER4C2.DIAGN3EGRW}|${SER4C2.MEDATIW.trim().padStart(10, '0')}|${SER4C2.FOLIOSW}|`
    datosenvio += `${SER4C2.ASEGVEHW}|${SER4C2.PLACAVEHW}|${SER4C2.CIAASEGVEHW}|${SER4C2.POLIZAVEHW}|${SER4C2.FECHAINIPOLW.replace(/\//g, '').substring(0, 8).padEnd(8, '0')}|${SER4C2.FECHAFINPOLW.replace(/\//g, '').substring(0, 8).padEnd(8, '0')}|`
    datosenvio += `${SER4C2.INTERVAUTW}|${SER4C2.COBEXCEDW}|${SER4C2.IDPROPVEHW}|${SER4C2.IDCONDVEHW}|${SER4C2.PLACAVEH2W}|${SER4C2.IDPROPVEH2W}|`
    datosenvio += `${SER4C2.PLACAVEH3W}|${SER4C2.IDPROPVEH3W}|${valorfacturado_SER4C2.value.replace(/,/g, '').padStart(15, '0')}|${valorreclamado_SER4C2.value.replace(/,/g, '').padStart(15, '0')}|${valorfacturado2_SER4C2.value.replace(/,/g, '').padStart(15, '0')}|${valorreclamado2_SER4C2.value.replace(/,/g, '').padStart(15, '0')}|`
    datosenvio += `${SER4C2.POLIZA2VEHW}|${SER4C2.NRORADW}|${SER4C2.FECHARADW.replace(/\//g, '').substring(0, 8)}|${SER4C2.NRORADANTW}|${localStorage.Usuario}|`
    console.log(datosenvio);
    postData({ datosh: datosEnvio() + datosenvio }, URL)
        .then(data => {
            console.debug(data);
            $('#IMPRESION_SER4C2').removeClass('hidden');
            _evaluarimpresion_SER4C2();
        })
        .catch(err => {
            console.error(err);
            _evaluardatoradant_SER4C2('2');
        });
}

function _evaluarrecalculovalor_SER4C2(){
    setTimeout(() => CON851P('Desea recalcular valor facturado', _evaluarimpresion_SER4C2, _validarfacturaarecalcular_SERC42));
}

function _validarfacturaarecalcular_SERC42(){
    postData(
        { datosh: `${datosEnvio()}${prefijoMask_SER4C2.value}${$('#factura_SER4C2').val().padStart(6,'0')}|` }, 
        get_url("APP/SALUD/SER4C2.DLL")
    )
    .then(data => {
        console.debug(data);
        SER4C2.FACTURAS = data.FACTURA;
        SER4C2.VALORMQ = 0;
        SER4C2.VALORTRAS = 0;
        for (var i in SER4C2.FACTURAS) {
            if (SER4C2.FACTURAS[i].CUPS.substring(0, 2) == 'S3') {
                let valor = parseFloat(SER4C2.FACTURAS[i].VALOR)
                if (isNaN(valor)) valor = 0;
                SER4C2.VALORTRAS = SER4C2.VALORTRAS + valor;
            } else {
                let negativo = SER4C2.FACTURAS[i].CANT.indexOf('-')
                let valor = parseInt(SER4C2.FACTURAS[i].VALOR.replace(/-/g,''))
                if (negativo >= 0) valor = valor * -1
                if (isNaN(valor)) valor = 0;
                console.log(valor)
                SER4C2.VALORMQ = SER4C2.VALORMQ + valor
            }
        }
        _evaluardatomqfact_SER4C2();
    })
    .catch(err => {
        console.error(err);
        _evaluarnro_SER4C2();
    });
}

function _evaluarimpresion_SER4C2() {
    console.log('FINALIZAR')
    if (SER4C2.VALIDAIMPW.trim() == '') {
        SER4C2.VALIDAIMPW = "S"
    }
    $('#impresion_SER4C2').val(SER4C2.VALIDAIMPW)
    validarInputs({
        form: '#VALIDAR50_SER4C2',
        orden: '1'
    },
        () => {
            $('#IMPRESION_SER4C2').addClass('hidden');
            _evaluarnro_SER4C2()
        },
        () => {
            SER4C2.VALIDAIMPW = $('#impresion_SER4C2').val().toUpperCase()
            if (SER4C2.VALIDAIMPW == 'S') {
                _impresion_SER4C2();
            } else {
                CON851('03', '03', _evaluarnro_SER4C2(), 'error', 'Error');

            }
        }
    )
}

function _impresion_SER4C2() {
    let URL = get_url("APP/SALUD/SER4C2P.DLL");
    postData({ datosh: datosEnvio() + '1|' + SER4C2.LLAVEW + '|' }, URL)
        .then(data => {
            console.debug(data);
            SER4C2.FURIP = data.FACTURA[0];
            SER4C2.impresion = new Object;
            SER4C2.impresion.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
            SER4C2.impresion.NIT = $_USUA_GLOBAL[0].NIT.toString().padStart(10, '0');
            SER4C2.impresion.FECHA = moment().format('MMM DD/YY');
            SER4C2.impresion.FECHAACTW = SER4C2.FECHAOCURW.split('')
            SER4C2.impresion.FECHAACTWWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4];
            SER4C2.impresion.NRORADFUR = SER4C2.NRORADW;
            SER4C2.impresion.NRORADANTFUR = SER4C2.NRORADANTW;
            SER4C2.impresion.PREFIJOFUR = SER4C2.PREFIJOW;
            SER4C2.impresion.NROFUR = SER4C2.NROW.padStart(6, '0');
            SER4C2.impresion.OPERBLOQNUM = SER4C2.FURIP.OPER_BLOQ_NUM;
            SER4C2.impresion.OPERNUM = SER4C2.FURIP.OPER_NUM;
            SER4C2.impresion.ADMINW = localStorage.getItem('Usuario').trim();
            SER4C2.impresion.SUCW = $_USUA_GLOBAL[0].PREFIJ;
            SER4C2.impresion.CODIGOHABILITACION = `${$_USUA_GLOBAL[0].COD_CIUD}${$_USUA_GLOBAL[0].NUIR}${SER4C2.impresion.SUCW}`.split('');
            SER4C2.impresion.CODIGOHABILITACIONWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
            if (!$.isNumeric($_USUA_GLOBAL[0].PREFIJ)) impresion.SUCW = '01';
            // SER4C2.impresion.NITUSU = $_USUA_GLOBAL[0].NIT.toString().padStart(10, '0').split('');
            SER4C2.impresion.NITUSU = $_USUA_GLOBAL[0].NIT.toString().padStart(10, ' ').split('');
            SER4C2.impresion.NITUSUWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
            SER4C2.impresion.PRIMERAPELLIDO = SER4C2.FURIP['1ER_APEL_PACI'];
            SER4C2.impresion.SEGUNDOAPELLIDO = SER4C2.FURIP['2DO_APEL_PACI'];
            SER4C2.impresion.PRIMERNOMBRE = SER4C2.FURIP['1ER_NOM_PACI'];
            SER4C2.impresion.SEGUNDONOMBRE = SER4C2.FURIP['2DO_NOM_PACI'];
            SER4C2.impresion.CC = SER4C2.impresion.CE = SER4C2.impresion.PA = SER4C2.impresion.TI = SER4C2.impresion.RC = SER4C2.impresion.AS = SER4C2.impresion.MS = ' ';
            SER4C2.impresion.TIPOIDPACI = SER4C2.FURIP.TIPO_ID_PACI;
            if (SER4C2.FURIP.TIPO_ID_PACI.trim() == 'CC') SER4C2.impresion.CC = 'X'
            if (SER4C2.FURIP.TIPO_ID_PACI.trim() == 'CE') SER4C2.impresion.CE = 'X'
            if (SER4C2.FURIP.TIPO_ID_PACI.trim() == 'PA') SER4C2.impresion.PA = 'X'
            if (SER4C2.FURIP.TIPO_ID_PACI.trim() == 'TI') SER4C2.impresion.TI = 'X'
            if (SER4C2.FURIP.TIPO_ID_PACI.trim() == 'RC') SER4C2.impresion.RC = 'X'
            if (SER4C2.FURIP.TIPO_ID_PACI.trim() == 'AS') SER4C2.impresion.AS = 'X'
            if (SER4C2.FURIP.TIPO_ID_PACI.trim() == 'MS') SER4C2.impresion.MS = 'X'
            // SER4C2.impresion.CODPACI = SER4C2.FURIP.ID_PACI.trim().padStart(15, '0').split('');
            SER4C2.impresion.CODPACI = SER4C2.FURIP.ID_PACI.trim().padStart(15, ' ').split('');
            SER4C2.impresion.CODPACIWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
            SER4C2.impresion.FECHAPACI = SER4C2.FURIP.NACIM_PACI.trim().split('');
            SER4C2.impresion.FECHAPACIWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4];
            if (SER4C2.FURIP.SEXO_PACI == 'F') SER4C2.impresion.SEXOPACI1 = 'X', SER4C2.impresion.SEXOPACI2 = ' '
            else SER4C2.impresion.SEXOPACI1 = ' ', SER4C2.impresion.SEXOPACI2 = 'X';
            SER4C2.impresion.DIRECPACI = SER4C2.FURIP.DIRECC_PACI.trim().padEnd(30, ' ').split('');
            SER4C2.impresion.DIRECPACIWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
            SER4C2.impresion.DVUSU = $_USUA_GLOBAL[0].DV;
            SER4C2.impresion.NOMBREDEPARTAMENTO = SER4C2.FURIP.NOMBRE_CIU_PACI.trim().padEnd(20, ' ').split('');
            SER4C2.impresion.NOMBREDEPARTAMENTOWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
            SER4C2.impresion.CODDPTO = SER4C2.FURIP.DPTO_PACI.trim().padEnd(2, ' ').split('');
            SER4C2.impresion.TELEFONOPACI = SER4C2.FURIP.TELEF_PACI.trim().padEnd(12, ' ').split('');
            SER4C2.impresion.TELEFONOPACIWIDTH = ['7.6%', '7.6%', '7.6%', '7.6%', '7.6%', '7.6%', '7.6%', '7.6%', '7.6%', '7.6%', '7.6%', '7.6%', '7.6%'];
            SER4C2.impresion.NOMBREMUNICIPIO = SER4C2.FURIP.NOMBRE_CIU2_PACI.trim().padEnd(20, ' ').split('');
            SER4C2.impresion.NOMBREMUNICIPIOWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
            SER4C2.impresion.CIUDPACI = SER4C2.FURIP.CIUD_PACI.trim().padEnd(3, ' ').split('');
            SER4C2.impresion.CONDUCTOR = SER4C2.impresion.PEATON = SER4C2.impresion.OCUPANTE = SER4C2.impresion.CICLISTA = ' ';
            if (SER4C2.FURIP.CONDIC_FUR.trim() == '1') SER4C2.impresion.CONDUCTOR = 'X'
            if (SER4C2.FURIP.CONDIC_FUR.trim() == '2') SER4C2.impresion.PEATON = 'X'
            if (SER4C2.FURIP.CONDIC_FUR.trim() == '3') SER4C2.impresion.OCUPANTE = 'X'
            if (SER4C2.FURIP.CONDIC_FUR.trim() == '4') SER4C2.impresion.CICLISTA = 'X'
            SER4C2.impresion.ACCIDENTETRANSITO = SER4C2.impresion.SISMO = SER4C2.impresion.MAREMOTO = SER4C2.impresion.ERUPCIONESVOLCANICAS = SER4C2.impresion.HURACAN = SER4C2.impresion.EXPLOSION = SER4C2.impresion.MASACRE = SER4C2.impresion.MINAANTIPERSONAL = SER4C2.impresion.COMBATE = SER4C2.impresion.INCENDIO = SER4C2.impresion.ATAQUESMUNICIPOS = SER4C2.impresion.OTROS = SER4C2.impresion.INUNDACIONES = SER4C2.impresion.AVALANCHA = SER4C2.impresion.DESLIZAMIENTOSDETIERRA = SER4C2.impresion.INCENDIONATURAL = ' ';
            if (SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '01') SER4C2.impresion.ACCIDENTETRANSITO = 'X';
            if (SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '02') SER4C2.impresion.SISMO = 'X';
            if (SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '03') SER4C2.impresion.MAREMOTO = 'X';
            if (SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '04') SER4C2.impresion.ERUPCIONESVOLCANICAS = 'X';
            if (SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '05') SER4C2.impresion.DESLIZAMIENTOSDETIERRA = 'X';
            if (SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '06') SER4C2.impresion.INUNDACIONES = 'X';
            if (SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '07') SER4C2.impresion.AVALANCHA = 'X';
            if (SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '08') SER4C2.impresion.INCENDIONATURAL = 'X';
            if (SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '09') SER4C2.impresion.EXPLOSION = 'X';
            if (SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '10') SER4C2.impresion.INCENDIO = 'X';
            if (SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '11') SER4C2.impresion.COMBATE = 'X';
            if (SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '12') SER4C2.impresion.ATAQUESMUNICIPOS = 'X';
            if (SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '13') SER4C2.impresion.MASACRE = 'X';
            if (SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '15') SER4C2.impresion.OTROS = 'X';
            if (SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '16') SER4C2.impresion.HURACAN = 'X';
            if (SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '18') SER4C2.impresion.MINAANTIPERSONAL = 'X';
            SER4C2.impresion.OTREVENTFUR = SER4C2.FURIP.OTR_EVEN_FUR.trim().padEnd(25, ' ').split('');
            SER4C2.impresion.OTREVENTFURWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
            SER4C2.impresion.DIROCURFUR = SER4C2.FURIP.DIR_OCUR_FUR.substring(0, 30).trim().padEnd(30, ' ').split('');
            SER4C2.impresion.DIROCURFURWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
            SER4C2.impresion.FECHAOCURFUR = SER4C2.FURIP.FECHA_OCUR_FUR.trim().split('');
            SER4C2.impresion.FECHAWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4];
            SER4C2.impresion.HORAOCURFUR = SER4C2.FURIP.HORA_OCUR_FUR.split('');
            SER4C2.impresion.HORAWIDTH = [4, 4, 4, 4, 4];
            SER4C2.impresion.DEPARTAMENTOOCURFUR = SER4C2.FURIP.NOM_CIUD2_OCUR_FUR.trim().padEnd(20, ' ').split('');
            SER4C2.impresion.CODDPTOOCURFUR = SER4C2.FURIP.COD_CIUD2_OCUR_FUR.trim().padEnd(2, ' ').split('');
            SER4C2.impresion.MUNICIPIOOCURFUR = SER4C2.FURIP.NOM_CIUD_OCUR_FUR.trim().padEnd(20, ' ').split('');
            SER4C2.impresion.CODDCIUOCURFUR = SER4C2.FURIP.CIUD_OCUR_FUR.trim().padEnd(3, ' ').split('');
            SER4C2.impresion.ZONAOCUR1 = SER4C2.impresion.ZONAOCUR2 = ' ';
            if (SER4C2.FURIP.ZONA_OCUR_FUR == 'U') SER4C2.impresion.ZONAOCUR1 = 'X'
            if (SER4C2.FURIP.ZONA_OCUR_FUR == 'R') SER4C2.impresion.ZONAOCUR2 = 'X'
            SER4C2.impresion.DESCRIPOCURFUR = SER4C2.DESCRIPW.replace(/&/g, /\n/);
            SER4C2.impresion.ASEGURADO = SER4C2.impresion.NOASEGURADO = SER4C2.impresion.VEHICULOFANTASMA = SER4C2.impresion.POLIZAFALSA = SER4C2.impresion.VEHICULOENFUGA = ' ';
            if (SER4C2.FURIP.ASEG_VEH_FUR == '1') SER4C2.impresion.ASEGURADO = 'X'
            if (SER4C2.FURIP.ASEG_VEH_FUR == '2') SER4C2.impresion.NOASEGURADO = 'X'
            if (SER4C2.FURIP.ASEG_VEH_FUR == '3') SER4C2.impresion.VEHICULOFANTASMA = 'X'
            if (SER4C2.FURIP.ASEG_VEH_FUR == '4') SER4C2.impresion.POLIZAFALSA = 'X'
            if (SER4C2.FURIP.ASEG_VEH_FUR == '5') SER4C2.impresion.VEHICULOENFUGA = 'X'
            SER4C2.impresion.PLACACAR = SER4C2.FURIP.PLACA_CAR.trim().padEnd(6, ' ').split('');
            SER4C2.impresion.PLACAWIDTH = [4, 4, 4, 4, 4, 4];
            SER4C2.impresion.MARCACAR = SER4C2.FURIP.MARCA_CAR.trim().padEnd(15, ' ');
            SER4C2.impresion.PARTICULAR = SER4C2.impresion.PUBLICO = SER4C2.impresion.OFICIAL = SER4C2.impresion.VEHICULOEMERGENCIA = SER4C2.impresion.VEHICULOSERVICIO = SER4C2.impresion.VEHICULOTRANSPORTEMASIVO = SER4C2.impresion.VEHICULOESCOLAR = ' ';
            if (SER4C2.FURIP.SERV_CAR == '1') SER4C2.impresion.PARTICULAR = 'X'
            if (SER4C2.FURIP.SERV_CAR == '2') SER4C2.impresion.PUBLICO = 'X'
            if (SER4C2.FURIP.SERV_CAR == '3') SER4C2.impresion.OFICIAL = 'X'
            if (SER4C2.FURIP.SERV_CAR == '4') SER4C2.impresion.VEHICULOEMERGENCIA = 'X'
            if (SER4C2.FURIP.SERV_CAR == '5') SER4C2.impresion.VEHICULOSERVICIO = 'X'
            if (SER4C2.FURIP.SERV_CAR == '6') SER4C2.impresion.VEHICULOTRANSPORTEMASIVO = 'X'
            if (SER4C2.FURIP.SERV_CAR == '7') SER4C2.impresion.VEHICULOESCOLAR = 'X'
            SER4C2.impresion.CODPOL = SER4C2.FURIP.COD_POL.padEnd(6, ' ').split('');
            SER4C2.impresion.NUMPOL = `${SER4C2.FURIP.NUM_POL}${SER4C2.FURIP.POLIZA2_VEH}`;
            SER4C2.impresion.NUMPOL = SER4C2.impresion.NUMPOL.padEnd(20, ' ')
            // SER4C2.impresion.POLIZA2VEHW = SER4C2.FURIP.POLIZA2_VEH;
            SER4C2.impresion.CODIGOHABILITACIONVEHICULO = `${SER4C2.impresion.NUMPOL}`.split('');
            SER4C2.impresion.INTERVAUTFUR1 = SER4C2.impresion.INTERVAUTFUR2 = ' '
            if (SER4C2.FURIP.INTERV_AUT.trim() == 'S') SER4C2.impresion.INTERVAUTFUR1 = 'X'
            if (SER4C2.FURIP.INTERV_AUT.trim() == 'N') SER4C2.impresion.INTERVAUTFUR2 = 'X'
            SER4C2.impresion.COBEXCEDFUR1 = SER4C2.impresion.COBEXCEDFUR2 = ' '
            if (SER4C2.FURIP.COB_EXCED.trim() == 'S') SER4C2.impresion.COBEXCEDFUR1 = 'X'
            if (SER4C2.FURIP.COB_EXCED.trim() == 'N') SER4C2.impresion.COBEXCEDFUR2 = 'X'
            SER4C2.impresion.FECHAINIPOL = SER4C2.FURIP.FECHA_INI_POL.padEnd(8, ' ').split('');
            SER4C2.impresion.FECHAFINPOL = SER4C2.FURIP.FECHA_FIN_POL.padEnd(8, ' ').split('');
            SER4C2.impresion.PROPIETARIOPRIMERAPELLIDO = SER4C2.FURIP.PROPIETARIO.APEL1_TER2.split('');
            SER4C2.impresion.PROPIETARIOSEGUNDOAPELLIDO = SER4C2.FURIP.PROPIETARIO.APEL2_TER2.split('');
            SER4C2.impresion.PROPIETARIOPRIMERNOMBRE = SER4C2.FURIP.PROPIETARIO.NOMB_1.split('');
            SER4C2.impresion.PROPIETARIOSEGUNDONOMBRE = SER4C2.FURIP.PROPIETARIO.NOMB_2.split('');
            // SER4C2.impresion.PROPIETARIONRODOCUMENTO = SER4C2.FURIP.PROPIETARIO.ID_PROP_VEH.padStart(15, '0').split('');
            SER4C2.impresion.PROPIETARIONRODOCUMENTO = SER4C2.FURIP.PROPIETARIO.ID_PROP_VEH.padStart(15, ' ').split('');
            SER4C2.impresion.PROPIETARIOTIPOID = SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.split('');
            SER4C2.impresion.PROPIETARIOCC = SER4C2.impresion.PROPIETARIOCE = SER4C2.impresion.PROPIETARIOPA = SER4C2.impresion.PROPIETARIOTI = SER4C2.impresion.PROPIETARIORC = SER4C2.impresion.PROPIETARIOAS = SER4C2.impresion.PROPIETARIOMS = SER4C2.impresion.PROPIETARIONIT = ' ';
            console.log(SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER)
            if (SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'CC') SER4C2.impresion.PROPIETARIOCC = 'X'
            if (SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'CE') SER4C2.impresion.PROPIETARIOCE = 'X'
            if (SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'PA') SER4C2.impresion.PROPIETARIOPA = 'X'
            if (SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'TI') SER4C2.impresion.PROPIETARIOTI = 'X'
            if (SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'RC') SER4C2.impresion.PROPIETARIORC = 'X'
            if (SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'AS') SER4C2.impresion.PROPIETARIOAS = 'X'
            if (SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'MS') SER4C2.impresion.PROPIETARIOMS = 'X'
            if (SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'NI') SER4C2.impresion.PROPIETARIONIT = 'X'
            SER4C2.impresion.PROPIETARIODIRECC = SER4C2.FURIP.PROPIETARIO.DIRECC_TER.substring(0, 30).trim().padEnd(30, ' ').split('');
            SER4C2.impresion.PROPIETARIODEPARTAMENTO = SER4C2.FURIP.PROPIETARIO.NOM_CIU1_TER.trim().padEnd(20, ' ').split('');
            SER4C2.impresion.PROPIETARIOCODDPTO = SER4C2.FURIP.PROPIETARIO.DPTO_CIU_TER.padEnd(2, ' ').split('');
            SER4C2.impresion.PROPIETARIOMUNICIPIO = SER4C2.FURIP.PROPIETARIO.NOM_CIU2_TER.trim().padEnd(20, ' ').split('');
            SER4C2.impresion.PROPIETARIOCODMUNICIPIO = SER4C2.FURIP.PROPIETARIO.CIUD_CIU_TER.trim().padEnd(3, ' ').split('');
            let telefonoprop = parseInt(SER4C2.FURIP.PROPIETARIO.TEL_TER);
            if (telefonoprop == 0) telefonoprop = ''
            SER4C2.impresion.PROPIETARIOTELEFONO = telefonoprop.toString().trim().padStart(12, ' ').split('');

            SER4C2.impresion.CONDUCTORPRIMERNOMBRE = SER4C2.FURIP.CONDUCTOR.NOMB_1.split('');
            SER4C2.impresion.CONDUCTORSEGUNDONOMBRE = SER4C2.FURIP.CONDUCTOR.NOMB_2.split('');
            SER4C2.impresion.CONDUCTORPRIMERAPELLIDO = SER4C2.FURIP.CONDUCTOR.APEL1_TER2.split('');
            SER4C2.impresion.CONDUCTORSEGUNDOAPELLIDO = SER4C2.FURIP.CONDUCTOR.APEL2_TER2.split('');
            SER4C2.impresion.CONDUCTORCC = SER4C2.impresion.CONDUCTORCE = SER4C2.impresion.CONDUCTORPA = SER4C2.impresion.CONDUCTORTI = SER4C2.impresion.CONDUCTORRC = SER4C2.impresion.CONDUCTORAS = SER4C2.impresion.CONDUCTORMS = ' ';
            if (SER4C2.FURIP.CONDUCTOR.TIPO_ID_TER.trim() == 'CC') SER4C2.impresion.CONDUCTORCC = 'X'
            if (SER4C2.FURIP.CONDUCTOR.TIPO_ID_TER.trim() == 'CE') SER4C2.impresion.CONDUCTORCE = 'X'
            if (SER4C2.FURIP.CONDUCTOR.TIPO_ID_TER.trim() == 'PA') SER4C2.impresion.CONDUCTORPA = 'X'
            if (SER4C2.FURIP.CONDUCTOR.TIPO_ID_TER.trim() == 'TI') SER4C2.impresion.CONDUCTORTI = 'X'
            if (SER4C2.FURIP.CONDUCTOR.TIPO_ID_TER.trim() == 'RC') SER4C2.impresion.CONDUCTORRC = 'X'
            if (SER4C2.FURIP.CONDUCTOR.TIPO_ID_TER.trim() == 'AS') SER4C2.impresion.CONDUCTORAS = 'X'
            if (SER4C2.FURIP.CONDUCTOR.TIPO_ID_TER.trim() == 'MS') SER4C2.impresion.CONDUCTORMS = 'X'
            // SER4C2.impresion.CONDUCTORNRODOCUMENTO = SER4C2.FURIP.CONDUCTOR.ID_PROP_VEH.padStart(15, '0').split('');
            SER4C2.impresion.CONDUCTORNRODOCUMENTO = SER4C2.FURIP.CONDUCTOR.ID_PROP_VEH.padStart(15, ' ').split('');
            SER4C2.impresion.CONDUCTORDIRECCION = SER4C2.FURIP.CONDUCTOR.DIRECC_TER.substring(0, 30).trim().padEnd(30, ' ').split('');
            SER4C2.impresion.CONDUCTORDEPARTAMENTO = SER4C2.FURIP.CONDUCTOR.NOM_CIU1_TER.trim().padEnd(20, ' ').split('');
            SER4C2.impresion.CONDUCTORCODDPTO = SER4C2.FURIP.CONDUCTOR.DPTO_CIU_TER.trim().padEnd(2, ' ').split('');
            let telefonoconduc = parseInt(SER4C2.FURIP.CONDUCTOR.TEL_TER);
            if (telefonoconduc == 0) telefonoconduc = ''
            SER4C2.impresion.CONDUCTORTELEFONO = telefonoconduc.toString().trim().padStart(12, ' ').split('');
            SER4C2.impresion.CONDUCTORMUNICIPIO = SER4C2.FURIP.CONDUCTOR.NOM_CIU2_TER.trim().padEnd(20, ' ').split('');
            SER4C2.impresion.CONDUCTORCODMUNICIPIO = SER4C2.FURIP.CONDUCTOR.CIUD_CIU_TER.trim().padEnd(3, ' ').split('');
            SER4C2.impresion.REMI = SER4C2.impresion.ORDEN = ' ';
            if (SER4C2.FURIP.FECHA_REMI_FUR.substring(4, 6) > 0) {
                SER4C2.impresion.REMI = 'X'
            }
            let fecharemi = SER4C2.FURIP.FECHA_REMI_FUR
            if (parseInt(fecharemi) == 0) fecharemi = '';
            SER4C2.impresion.FECHAREMISION = fecharemi.toString().trim().padStart(8, ' ').split('');
            let horaremi = SER4C2.FURIP.HORA_REMI_FUR;
            if (parseInt(horaremi) == 0) horaremi = '';
            SER4C2.impresion.HORAREMISION = horaremi.toString().trim().padStart(4, ' ').split('');
            SER4C2.impresion.NOMBREIPSREMI = SER4C2.FURIP.NOMBRE_IPS_REMI;
            SER4C2.impresion.CODIPSREMI = SER4C2.FURIP.COD_IPS_REMI.trim().padEnd(12, ' ').split('');
            SER4C2.impresion.CODIPSWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
            SER4C2.impresion.PERSONAREMI = SER4C2.FURIP.PERS_REMI;
            SER4C2.impresion.CARGOREMI = SER4C2.FURIP.CARGO_REMI;
            fecharemi = SER4C2.FURIP.FECHA_ACEP_FUR
            if (parseInt(fecharemi) == 0) fecharemi = '';
            SER4C2.impresion.FECHAACEPFUR = fecharemi.toString().trim().padStart(8, ' ').split('');
            horaremi = SER4C2.FURIP.HORA_ACEP_FUR;
            if (parseInt(horaremi) == 0) horaremi = '';
            SER4C2.impresion.HORAACEPFUR = horaremi.toString().trim().padStart(4, ' ').split('');
            SER4C2.impresion.CODIPSACEPFUR = SER4C2.FURIP.COD_IPS_ACEP.trim().padEnd(12, ' ').split('');
            SER4C2.impresion.NOMBREIPSACEPFUR = SER4C2.FURIP.NOMBRE_IPS_ACEP;
            SER4C2.impresion.PERSONAACEPFUR = SER4C2.FURIP.PERS_ACEP;
            SER4C2.impresion.CARGOACEPFUR = SER4C2.FURIP.CARGO_ACEP;

            SER4C2.impresion.PLACAAMB = SER4C2.FURIP.PLACA_AMB.trim().padEnd(6, ' ').split('');
            SER4C2.impresion.DESDEAMB = SER4C2.FURIP.DESDE_AMB;
            SER4C2.impresion.HASTAAMB = SER4C2.FURIP.HASTA_AMB;
            SER4C2.impresion.AMBULANCIABASICA = SER4C2.impresion.AMBULANCIAMEDICADA = ' ';
            if (SER4C2.FURIP.AMBUL_CAR == '1') SER4C2.impresion.AMBULANCIABASICA
            if (SER4C2.FURIP.AMBUL_CAR == '2') SER4C2.impresion.AMBULANCIAMEDICADA
            SER4C2.impresion.AMBULCAR = SER4C2.FURIP.AMBUL_CAR;
            SER4C2.impresion.ZONAAMB = SER4C2.FURIP.ZONA_AMB;
            SER4C2.ZONAAMB1 = SER4C2.ZONAAMB2 = ' ';
            if (SER4C2.impresion.ZONAAMB == 'U') SER4C2.ZONAAMB1 = 'X'
            if (SER4C2.impresion.ZONAAMB == 'R') SER4C2.ZONAAMB2 = 'X'
            let fecha = SER4C2.FURIP.FECHA_ING_FUR
            if (parseInt(fecha) == 0) fecha = '';
            SER4C2.impresion.FECHAING = fecha.toString().trim().padStart(8, ' ').split('');
            let hora = SER4C2.FURIP.HORA_ING_FUR;
            if (parseInt(hora) == 0) hora = '';
            SER4C2.impresion.HORAING = hora.toString().trim().padStart(4, ' ').split('');
            fecha = SER4C2.FURIP.FECHA_EGR_FUR
            if (parseInt(fecha) == 0) fecha = '';
            SER4C2.impresion.FECHAEGR = fecha.toString().trim().padStart(8, ' ').split('');
            hora = SER4C2.FURIP.HORA_EGR_FUR;
            if (parseInt(hora) == 0) hora = '';
            SER4C2.impresion.HORAEGR = hora.toString().trim().padStart(4, ' ').split('');

            SER4C2.impresion.DIAGNWIDTH = [4, 4, 4, 4];
            SER4C2.impresion.DIAG1ING = SER4C2.FURIP.DIAG1ING_FUR.trim().padEnd(4, ' ').split('');
            SER4C2.impresion.DIAG1EGR = SER4C2.FURIP.DIAG1EGR_FUR.trim().padEnd(4, ' ').split('');
            SER4C2.impresion.DIAG2ING = SER4C2.FURIP.DIAG2ING_FUR.trim().padEnd(4, ' ').split('');
            SER4C2.impresion.DIAG2EGR = SER4C2.FURIP.DIAG2EGR_FUR.trim().padEnd(4, ' ').split('');
            SER4C2.impresion.DIAG3ING = SER4C2.FURIP.DIAG3ING_FUR.trim().padEnd(4, ' ').split('');
            SER4C2.impresion.DIAG3EGR = SER4C2.FURIP.DIAG3EGR_FUR.trim().padEnd(4, ' ').split('');
            SER4C2.impresion.MEDICOPRIMERAPELLIDO = SER4C2.FURIP.MEDICO.APEL1_TER2;
            SER4C2.impresion.MEDICOSEGUNDOAPELLIDO = SER4C2.FURIP.MEDICO.APEL2_TER2;
            SER4C2.impresion.MEDICOPRIMERNOMBRE = SER4C2.FURIP.MEDICO.NOMB_1;
            SER4C2.impresion.MEDICOSEGUNDONOMBRE = SER4C2.FURIP.MEDICO.NOMB_2;
            SER4C2.impresion.MEDICOTIPOID = SER4C2.FURIP.MEDICO.TIPO_ID_TER;
            // SER4C2.impresion.MEDICOATI = SER4C2.FURIP.MEDICO.MED_ATI_FUR.trim().padStart(10, '0').split('');
            SER4C2.impresion.MEDICOATI = SER4C2.FURIP.MEDICO.MED_ATI_FUR.trim().padStart(10, ' ').split('');
            SER4C2.impresion.MEDICOCC = SER4C2.impresion.MEDICOCE = SER4C2.impresion.MEDICOPA = SER4C2.impresion.MEDICOTI = SER4C2.impresion.MEDICORC = SER4C2.impresion.MEDICOAS = SER4C2.impresion.MEDICOMS = ' ';
            if (SER4C2.FURIP.MEDICO.TIPO_ID_TER.trim() == 'CC') SER4C2.impresion.MEDICOCC = 'X'
            if (SER4C2.FURIP.MEDICO.TIPO_ID_TER.trim() == 'CE') SER4C2.impresion.MEDICOCE = 'X'
            if (SER4C2.FURIP.MEDICO.TIPO_ID_TER.trim() == 'PA') SER4C2.impresion.MEDICOPA = 'X'
            if (SER4C2.FURIP.MEDICO.TIPO_ID_TER.trim() == 'TI') SER4C2.impresion.MEDICOTI = 'X'
            if (SER4C2.FURIP.MEDICO.TIPO_ID_TER.trim() == 'RC') SER4C2.impresion.MEDICORC = 'X'
            if (SER4C2.FURIP.MEDICO.TIPO_ID_TER.trim() == 'AS') SER4C2.impresion.MEDICOAS = 'X'
            if (SER4C2.FURIP.MEDICO.TIPO_ID_TER.trim() == 'MS') SER4C2.impresion.MEDICOMS = 'X'
            SER4C2.impresion.VLRMQFACT = SER4C2.FURIP.VLR_MQ_FACT;
            SER4C2.impresion.VLRMQRECL = SER4C2.FURIP.VLR_MQ_RECL;
            SER4C2.impresion.VLRTRFACT = SER4C2.FURIP.VLR_TR_FACT;
            SER4C2.impresion.VLRTRRECL = SER4C2.FURIP.VLR_TR_RECL;
            SER4C2.impresion.CIUDADOCUR = SER4C2.FURIP.CIUD_OCUR_FUR;

            SER4C2.impresion.IDPROPVEH2 = SER4C2.FURIP.ID_PROP_VEH2;
            SER4C2.impresion.IDPROPVEH3 = SER4C2.FURIP.ID_PROP_VEH3;
            SER4C2.impresion.FECHAACTW = '';
            SER4C2.impresion.FECHAACTW = SER4C2.impresion.FECHAACTW.padStart(8, ' ').split('');

            if (isNaN(parseInt(SER4C2.FOLIOSW))) SER4C2.FOLIOSW = '000'
            SER4C2.impresion.FOLIOS = parseInt(SER4C2.FOLIOSW).toString().padStart(3, '0').split('');

            SER4C2.impresion.NOMBREPDF = localStorage.getItem('Usuario').trim() + moment().format('YYMMDDHHss');
            console.debug(SER4C2.impresion);
            _impresionFURIPS();
        })
        .catch(err => {
            console.error(err);
            _evaluardatoradant_SER4C2('2');
        })
}

// IMPRESION FURIPS

function _impresionFURIPS() {
    let datosimpresion = {
        pageSize: "LETTER",
        pageMargins: [10, 50, 10, 10],
        header: function (currentPage, pageCount, pageSize) {
            return [
                {
                    image: "logo",
                    fit: [30, 60],
                    absolutePosition: { x: 10, y: 10 },
                },
                { text: " " },
                { text: "REPUBLICA DE COLOMBIA", style: "headerimpresion" },
                { text: "MINISTERO DE LA PROTECCION SOCIAL", style: "headerimpresion" },
                { text: "FORMULARIO ÚNICO DE RECLAMACION DE LAS INSTITUCIONES PRESTADORAS DE SERVICIOS DE SALUD POR SERVICIOS PRESTADOS A VICTIMAS DE EVENTOS CATASTROFICOS Y ACCIDENTES DE TRANSITO", style: "headerimpresion", margin: [40, 0] },
                { text: "PERSONAS JURIDICAS - FURIPS", style: "headerimpresion" },
            ]
        },
        content: [
            {
                table: {
                    widths: ['*'],
                    heights: 8,
                    body: [
                        [
                            {
                                columns: [
                                    { text: "Fecha Radicacion", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.FECHAACTW, SER4C2.impresion.FECHAACTWWIDTH, 1, '50%'),
                                    { text: "No. Radicado", style: 'titulostexto', width: '11%' },
                                    {
                                        table: {
                                            widths: ['60%'],
                                            heights: 1,
                                            body: [
                                                [{ text: SER4C2.impresion.NRORADFUR, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '20%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "No. Radicado Anterior (Respuesta a glosa, Marcar en RG)", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: ['80%'],
                                            heights: 20,
                                            body: [
                                                [{ text: SER4C2.impresion.NRORADANTFUR, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '30%',
                                    },
                                    { text: "RG", style: 'titulostexto', width: '2%' },
                                    {
                                        table: {
                                            widths: [10],
                                            heights: 1,
                                            body: [
                                                [{ text: ' ', style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "No. Factura/Cuenta de Cobro", style: 'titulostexto', width: '18%' },
                                    {
                                        table: {
                                            widths: ['95%'],
                                            heights: 1,
                                            body: [
                                                [{ text: `${SER4C2.impresion.PREFIJOFUR} ${SER4C2.impresion.NROFUR}`, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '20%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ["*"],
                                            heights: 8,
                                            body: [
                                                [{ text: 'I. DATOS DE LA INSTITUCION PRESTADORA DE SERVICIO DE SALUD', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                            ]
                                        },
                                        width: '100%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Razon Social", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 8,
                                            body: [
                                                [{ text: $_USUA_GLOBAL[0].NOMBRE.trim(), style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '30%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Codigo Habilitación", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.CODIGOHABILITACION, SER4C2.impresion.CODIGOHABILITACIONWIDTH, 5, '35%'),
                                    { text: "Nit", style: 'titulostexto', width: '5%' },
                                    tablasFURIPS(SER4C2.impresion.NITUSU, SER4C2.impresion.NITUSUWIDTH, 5, '50%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ["*"],
                                            heights: 8,
                                            body: [
                                                [{ text: 'II. DATOS DE LA VICTIMA DEL EVENTO CATASTROFICO O ACCIDENTE DE TRANSITO', style: 'letraencajas', fillColor: '#808080', color: 'white', fillColor: '#476fad' }],
                                            ]
                                        },
                                        width: '100%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 8,
                                            body: [
                                                [{ text: SER4C2.impresion.PRIMERAPELLIDO, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '50%',
                                        margin: [10, 0]
                                    },
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 8,
                                            body: [
                                                [{ text: SER4C2.impresion.SEGUNDOAPELLIDO, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '50%',
                                        margin: [10, 0]
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        text: '1ER APELLIDO',
                                        width: '50%',
                                        margin: [10, 0],
                                        style: 'tituloscentrados'
                                    },
                                    {
                                        text: '2DO APELLIDO',
                                        width: '50%',
                                        margin: [10, 0],
                                        style: 'tituloscentrados'
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 8,
                                            body: [
                                                [{ text: SER4C2.impresion.PRIMERNOMBRE, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '50%',
                                        margin: [10, 0]
                                    },
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 8,
                                            body: [
                                                [{ text: SER4C2.impresion.SEGUNDONOMBRE, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '50%',
                                        margin: [10, 0]
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        text: '1ER NOMBRE',
                                        width: '50%',
                                        margin: [10, 0],
                                        style: 'tituloscentrados'
                                    },
                                    {
                                        text: '2DO NOMBRE',
                                        width: '50%',
                                        margin: [10, 0],
                                        style: 'tituloscentrados'
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Tipo de Documento", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                                            heights: 1,
                                            body: [
                                                [{ text: 'CC', style: 'letraencajas' }, { text: 'CE', style: 'letraencajas' }, { text: 'PA', style: 'letraencajas' }, { text: 'TI', style: 'letraencajas' }, { text: 'RC', style: 'letraencajas' }, { text: 'AS', style: 'letraencajas' }, { text: 'MS', style: 'letraencajas' }, { text: SER4C2.impresion.CC, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.CE, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.PA, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.TI, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.RC, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.AS, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.MS, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }],
                                            ]
                                        },
                                        width: '35%',
                                    },
                                    { text: "No. Documento", style: 'titulostexto', width: '10%' },
                                    tablasFURIPS(SER4C2.impresion.CODPACI, SER4C2.impresion.CODPACIWIDTH, 1, '35%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Fecha de Nacimiento", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.FECHAPACI, SER4C2.impresion.FECHAPACIWIDTH, 1, '25%'),
                                    { text: "Sexo", style: 'titulostexto', width: '10%' },
                                    {
                                        table: {
                                            widths: [9, 9, 9, 9],
                                            heights: 1,
                                            body: [
                                                [{ text: 'F', style: 'letraencajas' }, { text: SER4C2.impresion.SEXOPACI1, relativePosition: { x: -20, y: -3 }, border: [false, false, false, false] }, { text: 'M', style: 'letraencajas' }, { text: SER4C2.impresion.SEXOPACI2, relativePosition: { x: -20, y: -3 }, border: [false, false, false, false] }],
                                            ]
                                        },
                                        width: '35%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Direccion Residencia", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.DIRECPACI, SER4C2.impresion.DIRECPACIWIDTH, 1, '75%')
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Departamento", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.NOMBREDEPARTAMENTO, SER4C2.impresion.NOMBREDEPARTAMENTOWIDTH, 1, '46%'),
                                    { text: "Cod", style: 'titulostexto', width: '3%' },
                                    tablasFURIPS(SER4C2.impresion.CODDPTO, [4, 4], 1, '6%'),
                                    { text: "Telefono", style: 'titulostexto', width: '5%' },
                                    tablasFURIPS(SER4C2.impresion.TELEFONOPACI, SER4C2.impresion.TELEFONOPACIWIDTH, 1, '25%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Municipio", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.NOMBREMUNICIPIO, SER4C2.impresion.NOMBREMUNICIPIOWIDTH, 1, '46%'),
                                    { text: "Cod", style: 'titulostexto', width: '3%' },
                                    tablasFURIPS(SER4C2.impresion.CIUDPACI, [4, 4, 4], 1, '6%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Condicion del Accidentado", style: 'titulostexto', width: '25%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.CONDUCTOR, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '3%',
                                    },
                                    { text: "Conductor", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.PEATON, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '3%',
                                    },
                                    { text: "Peaton", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.OCUPANTE, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '3%',
                                    },
                                    { text: "Ocupante", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.CICLISTA, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '3%',
                                    },
                                    { text: "Ciclista", style: 'titulostexto', width: '15%' },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ["*"],
                                            heights: 8,
                                            body: [
                                                [{ text: 'III. DATOS DEL SITIO DONDE OCURRIO EL EVENTO CATASTROFICO O EL ACCIDENTE TRANSITO', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                            ]
                                        },
                                        width: '100%',
                                    },
                                ],
                            },
                        ],
                        [
                            { text: 'Naturaleza del Evento:', style: 'titulostexto', margin: [5, 0] }
                        ],
                        [
                            {
                                columns: [
                                    { text: "Accidente de transito", style: 'titulostexto', width: '19%', margin: [20, 0] },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.ACCIDENTETRANSITO, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '3%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Naturales:", style: 'titulostexto', width: '10%', margin: [5, 0] },
                                    { text: "Sismo", style: 'titulostexto', width: '9%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.SISMO, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Maremoto", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.MAREMOTO, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Erupciones Volcanicas", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.ERUPCIONESVOLCANICAS, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Huracan", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.HURACAN, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: " ", style: 'titulostexto', width: '10%', margin: [5, 0] },
                                    { text: "Inundaciones", style: 'titulostexto', width: '9%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.INUNDACIONES, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Avalancha", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.AVALANCHA, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Deslizamiento de Tierra", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.DESLIZAMIENTOSDETIERRA, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Incendio Natural", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.INCENDIONATURAL, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Terroristas:", style: 'titulostexto', width: '10%', margin: [5, 0] },
                                    { text: "Explosion", style: 'titulostexto', width: '9%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.EXPLOSION, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Masacre", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.MASACRE, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Mina Antipersonal", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.MINAANTIPERSONAL, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Combate", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.COMBATE, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: " ", style: 'titulostexto', width: '10%', margin: [5, 0] },
                                    { text: "Incendio", style: 'titulostexto', width: '9%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.INCENDIO, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Ataques a Municipios", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.ATAQUESMUNICIPOS, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Otros", style: 'titulostexto', width: '5%', margin: [5, 0] },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.OTROS, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Cual?", style: 'titulostexto', width: '5%' },
                                    tablasFURIPS(SER4C2.impresion.OTREVENTFUR, SER4C2.impresion.OTREVENTFURWIDTH, 1, '46%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Direccion de la ocurrencia", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.DIROCURFUR, SER4C2.impresion.DIROCURFURWIDTH, 1, '75%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Fecha Evento/Accidente", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.FECHAOCURFUR, SER4C2.impresion.FECHAWIDTH, 1, '25%'),
                                    { text: "Hora", style: 'titulostexto', width: '10%' },
                                    tablasFURIPS(SER4C2.impresion.HORAOCURFUR, SER4C2.impresion.HORAWIDTH, 1, '35%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Departamento", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.DEPARTAMENTOOCURFUR, SER4C2.impresion.NOMBREDEPARTAMENTOWIDTH, 1, '46%'),
                                    { text: "Cod", style: 'titulostexto', width: '3%' },
                                    tablasFURIPS(SER4C2.impresion.CODDPTOOCURFUR, [4, 4], 1, '6%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Municipio", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.MUNICIPIOOCURFUR, SER4C2.impresion.NOMBREMUNICIPIOWIDTH, 1, '46%'),
                                    { text: "Cod", style: 'titulostexto', width: '3%' },
                                    tablasFURIPS(SER4C2.impresion.CODDCIUOCURFUR, [4, 4, 4], 1, '8%'),
                                    { text: "ZONA", style: 'titulostexto', width: '5%' },
                                    {
                                        table: {
                                            widths: [5],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: 'U', style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: SER4C2.impresion.ZONAOCUR1, relativePosition: { x: -29, y: -4 }, border: [false, false, false, false], fontSize: '20', width: '5%' },
                                    {
                                        table: {
                                            widths: [5],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: 'R', style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: SER4C2.impresion.ZONAOCUR2, relativePosition: { x: -29, y: -4 }, border: [false, false, false, false], fontSize: '20', width: '5%' },
                                ],
                            },
                        ],
                        [
                            { text: 'Descripcion Breve del Evento Catastrófico o Accidente de Transito', style: 'titulostexto', margin: [5, 0] }
                        ],
                        [
                            { text: 'Enuncie las principales caracteristicas del evento/accidente:', style: 'titulostexto', margin: [5, 0] }
                        ],
                        [
                            { text: `${SER4C2.impresion.DESCRIPOCURFUR}`, style: 'titulostexto', margin: [5, 0] }
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ["*"],
                                            heights: 1,
                                            body: [
                                                [{ text: 'IV. DATOS DEL VEHICULO DEL ACCIDENTE DE TRANSITO', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                            ]
                                        },
                                        width: '100%',
                                    },
                                ],
                            },
                        ],
                        [
                            { text: 'Estado de Aseguramiento:', style: 'titulostexto', margin: [5, 0] }
                        ],
                        [
                            {
                                columns: [
                                    { text: "Asegurado", style: 'titulostexto', width: '21%', margin: [40, 0] },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.ASEGURADO, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "No Asegurado", style: 'titulostexto', width: '12%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.NOASEGURADO, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Vehiculo fantasma", style: 'titulostexto', width: '12%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.VEHICULOFANTASMA, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Poliza Falsa", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.POLIZAFALSA, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Vehiculo en fuga", style: 'titulostexto', width: '12%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.VEHICULOENFUGA, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Marca", style: 'titulostexto', width: '15%', margin: [5, 0] },
                                    {
                                        table: {
                                            widths: ['71%'],
                                            heights: 1,
                                            body: [
                                                [{ text: SER4C2.impresion.MARCACAR, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '35%',
                                    },
                                    { text: "Placa", style: 'titulostexto', width: '10%' },
                                    tablasFURIPS(SER4C2.impresion.PLACACAR, SER4C2.impresion.PLACAWIDTH, 1, '35%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Tipo de Servicio:", style: 'titulostexto', width: '12%', margin: [5, 0] },
                                    { text: "Particular", style: 'titulostexto', width: '9%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.PARTICULAR, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Publico", style: 'titulostexto', width: '12%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.PUBLICO, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Oficial", style: 'titulostexto', width: '12%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.OFICIAL, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Vehiculo de emergencia", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.VEHICULOEMERGENCIA, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Vehiculo de servicio", style: 'titulostexto', width: '12%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.VEHICULOSERVICIO, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Vehiculo de transporte masivo", style: 'titulostexto', width: '21%', margin: [10, 0] },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.VEHICULOTRANSPORTEMASIVO, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Vehiculo Escolar", style: 'titulostexto', width: '12%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.VEHICULOESCOLAR, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Codigo de la Aseguradora", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.CODPOL, SER4C2.impresion.PLACAWIDTH, 1, '35%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Nro de poliza", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.CODIGOHABILITACIONVEHICULO, SER4C2.impresion.NOMBREMUNICIPIOWIDTH, 1, '50%'),
                                    { text: "Intervención de autoridad", style: 'titulostexto', width: '15%' },
                                    { text: "SI", style: 'titulostexto', width: '3%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.INTERVAUTFUR1, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "NO", style: 'titulostexto', width: '3%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.INTERVAUTFUR2, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Vigencia Desde", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.FECHAINIPOL, SER4C2.impresion.FECHAWIDTH, 1, '22%'),
                                    { text: "Hasta", style: 'titulostexto', width: '5%' },
                                    tablasFURIPS(SER4C2.impresion.FECHAFINPOL, SER4C2.impresion.FECHAWIDTH, 1, '23%'),
                                    { text: "Cobro Excedente Póliza", style: 'titulostexto', width: '15%' },
                                    { text: "SI", style: 'titulostexto', width: '3%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.COBEXCEDFUR1, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "NO", style: 'titulostexto', width: '3%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.COBEXCEDFUR2, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ["*"],
                                            heights: 8,
                                            body: [
                                                [{ text: 'V. DATOS DEL PROPIETARIO DEL VEHICULO', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                            ]
                                        },
                                        width: '100%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 8,
                                            body: [
                                                [{ text: SER4C2.impresion.PROPIETARIOPRIMERAPELLIDO, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '50%',
                                        margin: [10, 0]
                                    },
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 8,
                                            body: [
                                                [{ text: SER4C2.impresion.PROPIETARIOSEGUNDOAPELLIDO, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '50%',
                                        margin: [10, 0]
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        text: '1er Apellido o Razon Social',
                                        width: '50%',
                                        margin: [10, 0],
                                        style: 'tituloscentrados'
                                    },
                                    {
                                        text: '2do Apellido',
                                        width: '50%',
                                        margin: [10, 0],
                                        style: 'tituloscentrados'
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 8,
                                            body: [
                                                [{ text: SER4C2.impresion.PROPIETARIOPRIMERNOMBRE, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '50%',
                                        margin: [10, 0]
                                    },
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 8,
                                            body: [
                                                [{ text: SER4C2.impresion.PROPIETARIOSEGUNDONOMBRE, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '50%',
                                        margin: [10, 0]
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        text: '1er Nombre',
                                        width: '50%',
                                        margin: [10, 0],
                                        style: 'tituloscentrados'
                                    },
                                    {
                                        text: '2do Nombre',
                                        width: '50%',
                                        margin: [10, 0],
                                        style: 'tituloscentrados'
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Tipo de Documento", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                                            heights: 1,
                                            body: [
                                                [{ text: 'CC', style: 'letraencajas' }, { text: 'CE', style: 'letraencajas' }, { text: 'PA', style: 'letraencajas' }, { text: 'TI', style: 'letraencajas' }, { text: 'RC', style: 'letraencajas' }, { text: 'AS', style: 'letraencajas' }, { text: 'MS', style: 'letraencajas' }, { text: 'NI', style: 'letraencajas' }, { text: SER4C2.impresion.PROPIETARIOCC, relativePosition: { x: -145, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.PROPIETARIOCE, relativePosition: { x: -145, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.PROPIETARIOPA, relativePosition: { x: -145, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.PROPIETARIOTI, relativePosition: { x: -145, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.PROPIETARIORC, relativePosition: { x: -145, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.PROPIETARIOAS, relativePosition: { x: -145, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.PROPIETARIOMS, relativePosition: { x: -145, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.PROPIETARIONIT, relativePosition: { x: -145, y: -3 }, border: [false, false, false, false] }],
                                            ]
                                        },
                                        width: '35%',
                                    },
                                    { text: "No. Documento", style: 'titulostexto', width: '10%' },
                                    tablasFURIPS(SER4C2.impresion.PROPIETARIONRODOCUMENTO, SER4C2.impresion.CODPACIWIDTH, 1, '50%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Direccion Residencia", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.PROPIETARIODIRECC, SER4C2.impresion.DIROCURFURWIDTH, 1, '75%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Departamento", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.PROPIETARIODEPARTAMENTO, SER4C2.impresion.NOMBREDEPARTAMENTOWIDTH, 1, '46%'),
                                    { text: "Cod", style: 'titulostexto', width: '3%' },
                                    tablasFURIPS(SER4C2.impresion.PROPIETARIOCODDPTO, [4, 4], 1, '6%'),
                                    { text: "Telefono", style: 'titulostexto', width: '5%' },
                                    tablasFURIPS(SER4C2.impresion.PROPIETARIOTELEFONO, SER4C2.impresion.TELEFONOPACIWIDTH, 1, '25%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Municipio", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.PROPIETARIOMUNICIPIO, SER4C2.impresion.NOMBREMUNICIPIOWIDTH, 1, '46%'),
                                    { text: "Cod", style: 'titulostexto', width: '3%' },
                                    tablasFURIPS(SER4C2.impresion.PROPIETARIOCODMUNICIPIO, [4, 4, 4], 1, '6%'),
                                ],
                            },
                        ],
                    ]
                },
                layout: {
                    hLineColor: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                    },
                    vLineColor: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                    },
                    paddingLeft: function (i, node) { return 0; },
                    paddingRight: function (i, node) { return 0; },
                    paddingTop: function (i, node) { return 0; },
                    paddingBottom: function (i, node) { return 0; }
                },
                width: '100%',
            },
            {
                columns: [
                    { text: 'TOTAL FOLIO', style: "letraencajas", width: '89%', alignment: "right" },
                    {
                        table: {
                            widths: [5, 5, 5],
                            heights: 1,
                            body: [
                                [
                                    { text: SER4C2.impresion.FOLIOS[0], style: 'letraencajas' }, { text: SER4C2.impresion.FOLIOS[1], style: 'letraencajas' }, { text: SER4C2.impresion.FOLIOS[2], style: 'letraencajas' }
                                ],
                            ]
                        },
                        width: '10%',
                        margin: [5, 0]
                    },
                ]
            },
            { text: " " },
            {
                table: {
                    widths: [574],
                    heights: 8,
                    body: [
                        [
                            { text: ' ', style: 'titulostexto' }
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ["*"],
                                            heights: 8,
                                            body: [
                                                [{ text: 'VI. DATOS DEL CONDUCTOR DEL VEHICULO INVOLUCRADO EN EL ACCIDENTE DE TRANSITO', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                            ]
                                        },
                                        width: '100%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 8,
                                            body: [
                                                [{ text: SER4C2.impresion.CONDUCTORPRIMERAPELLIDO, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '50%',
                                        margin: [10, 0]
                                    },
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 8,
                                            body: [
                                                [{ text: SER4C2.impresion.CONDUCTORSEGUNDOAPELLIDO, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '50%',
                                        margin: [10, 0]
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        text: '1er Apellido o Razon Social',
                                        width: '50%',
                                        margin: [10, 0],
                                        style: 'tituloscentrados'
                                    },
                                    {
                                        text: '2do Apellido',
                                        width: '50%',
                                        margin: [10, 0],
                                        style: 'tituloscentrados'
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 8,
                                            body: [
                                                [{ text: SER4C2.impresion.CONDUCTORPRIMERNOMBRE, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '50%',
                                        margin: [10, 0]
                                    },
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 8,
                                            body: [
                                                [{ text: SER4C2.impresion.CONDUCTORSEGUNDONOMBRE, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '50%',
                                        margin: [10, 0]
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        text: '1er Nombre',
                                        width: '50%',
                                        margin: [10, 0],
                                        style: 'tituloscentrados'
                                    },
                                    {
                                        text: '2do Nombre',
                                        width: '50%',
                                        margin: [10, 0],
                                        style: 'tituloscentrados'
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Tipo de Documento", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                                            heights: 1,
                                            body: [
                                                [{ text: 'CC', style: 'letraencajas' }, { text: 'CE', style: 'letraencajas' }, { text: 'PA', style: 'letraencajas' }, { text: 'TI', style: 'letraencajas' }, { text: 'RC', style: 'letraencajas' }, { text: 'AS', style: 'letraencajas' }, { text: 'MS', style: 'letraencajas' }, { text: SER4C2.impresion.CONDUCTORCC, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.CONDUCTORCE, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.CONDUCTORPA, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.CONDUCTORTI, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.CONDUCTORRC, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.CONDUCTORAS, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.CONDUCTORMS, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }],
                                            ]
                                        },
                                        width: '35%',
                                    },
                                    { text: "No. Documento", style: 'titulostexto', width: '10%' },
                                    tablasFURIPS(SER4C2.impresion.CONDUCTORNRODOCUMENTO, SER4C2.impresion.CODPACIWIDTH, 1, '50%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Direccion Residencia", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.CONDUCTORDIRECCION, SER4C2.impresion.DIROCURFURWIDTH, 1, '75%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Departamento", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.CONDUCTORDEPARTAMENTO, SER4C2.impresion.NOMBREDEPARTAMENTOWIDTH, 1, '46%'),
                                    { text: "Cod", style: 'titulostexto', width: '3%' },
                                    tablasFURIPS(SER4C2.impresion.CONDUCTORCODDPTO, [4, 4], 1, '6%'),
                                    { text: "Telefono", style: 'titulostexto', width: '5%' },
                                    tablasFURIPS(SER4C2.impresion.CONDUCTORTELEFONO, SER4C2.impresion.TELEFONOPACIWIDTH, 1, '25%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Municipio", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.CONDUCTORMUNICIPIO, SER4C2.impresion.NOMBREMUNICIPIOWIDTH, 1, '46%'),
                                    { text: "Cod", style: 'titulostexto', width: '3%' },
                                    tablasFURIPS(SER4C2.impresion.CONDUCTORCODMUNICIPIO, [4, 4, 4], 1, '6%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ["*"],
                                            heights: 8,
                                            body: [
                                                [{ text: 'VII. DATOS DE REMISION', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                            ]
                                        },
                                        width: '100%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Tipo de Referencia:", style: 'titulostexto', width: '19%', margin: [5, 0] },
                                    { text: "Remision", style: 'titulostexto', width: '9%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.REMI, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Orden de Servicio", style: 'titulostexto', width: '12%' },
                                    {
                                        table: {
                                            widths: [4],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.ORDEN, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Fecha de Remision", style: 'titulostexto', width: '19%' },
                                    tablasFURIPS(SER4C2.impresion.FECHAREMISION, SER4C2.impresion.FECHAWIDTH, 1, '22%'),
                                    { text: "a las", style: 'titulostexto', width: '5%' },
                                    tablasFURIPS(SER4C2.impresion.HORAREMISION, SER4C2.impresion.HORAWIDTH, 1, '23%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Prestador que remite", style: 'titulostexto', width: '19%' },
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 1,
                                            body: [
                                                [{ text: SER4C2.impresion.NOMBREIPSREMI, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '22%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Codigo de inscripcion", style: 'titulostexto', width: '19%' },
                                    tablasFURIPS(SER4C2.impresion.CODIPSREMI, SER4C2.impresion.CODIPSWIDTH, 1, '46%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Profesional que remite", style: 'titulostexto', width: '19%' },
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 1,
                                            body: [
                                                [{ text: SER4C2.impresion.PERSONAREMI, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '45%',
                                    },
                                    { text: "Cargo", style: 'titulostexto', width: '5%' },
                                    {
                                        table: {
                                            widths: [160],
                                            heights: 1,
                                            body: [
                                                [{ text: SER4C2.impresion.CARGOREMI, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '22%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Fecha de Aceptacion", style: 'titulostexto', width: '19%' },
                                    tablasFURIPS(SER4C2.impresion.FECHAACEPFUR, SER4C2.impresion.FECHAWIDTH, 1, '22%'),
                                    { text: "a las", style: 'titulostexto', width: '5%' },
                                    tablasFURIPS(SER4C2.impresion.HORAACEPFUR, SER4C2.impresion.HORAWIDTH, 1, '23%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Prestador que Recibe", style: 'titulostexto', width: '19%' },
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 1,
                                            body: [
                                                [{ text: SER4C2.impresion.NOMBREIPSACEPFUR, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '22%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Codigo de inscripcion", style: 'titulostexto', width: '19%' },
                                    tablasFURIPS(SER4C2.impresion.CODIPSACEPFUR, SER4C2.impresion.CODIPSWIDTH, 1, '46%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Profesional que Recibe", style: 'titulostexto', width: '19%' },
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 1,
                                            body: [
                                                [{ text: SER4C2.impresion.PERSONAACEPFUR, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '45%',
                                    },
                                    { text: "Cargo", style: 'titulostexto', width: '5%' },
                                    {
                                        table: {
                                            widths: [160],
                                            heights: 1,
                                            body: [
                                                [{ text: SER4C2.impresion.CARGOACEPFUR, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '22%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ["*"],
                                            heights: 8,
                                            body: [
                                                [{ text: 'VIII. AMPARO DE TRANSPORTE Y MOVILIZACION DE LA VICTIMA', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                            ]
                                        },
                                        width: '100%',
                                    },
                                ],
                            },
                        ],
                        [
                            { text: 'Diligenciar únicamente para el transporte desde el sitio del evento hasta la primera IPS (Trasnporte primario) y cuando ser realiza en ambulancias de la misma IPS', style: 'titulostexto', margin: [5, 0] }
                        ],
                        [
                            {
                                columns: [
                                    { text: "Datos de vehiculo", style: 'titulostexto', width: '19%', margin: [5, 0] },
                                    { text: "Placa No", style: 'titulostexto', width: '9%' },
                                    tablasFURIPS(SER4C2.impresion.PLACAAMB, SER4C2.impresion.PLACAWIDTH, 1, '35%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Transporto la Victima desde", style: 'titulostexto', width: '19%' },
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 1,
                                            body: [
                                                [{ text: SER4C2.impresion.DESDEAMB, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '45%',
                                    },
                                    { text: "Hasta", style: 'titulostexto', width: '5%' },
                                    {
                                        table: {
                                            widths: [160],
                                            heights: 1,
                                            body: [
                                                [{ text: SER4C2.impresion.HASTAAMB, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '22%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Tipo de Transporte:", style: 'titulostexto', width: '19%', margin: [5, 0] },
                                    { text: "Ambulancia Basica", style: 'titulostexto', width: '12%' },
                                    {
                                        table: {
                                            widths: [5],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.AMBULANCIABASICA, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Ambulancia Medicada", style: 'titulostexto', width: '12%' },
                                    {
                                        table: {
                                            widths: [5],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: SER4C2.impresion.AMBULANCIAMEDICADA, style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: "Lugar donde recoge la Victima", style: 'titulostexto', width: '20%' },
                                    { text: "ZONA", style: 'titulostexto', width: '5%' },
                                    {
                                        table: {
                                            widths: [5],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: 'U', style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: SER4C2.ZONAAMB1, relativePosition: { x: -29, y: -4 }, border: [false, false, false, false], fontSize: '20', width: '5%' },
                                    {
                                        table: {
                                            widths: [5],
                                            heights: 1,
                                            body: [
                                                [
                                                    { text: 'R', style: 'letraencajas' }
                                                ],
                                            ]
                                        },
                                        width: '5%',
                                    },
                                    { text: SER4C2.ZONAAMB2, relativePosition: { x: -29, y: -4 }, border: [false, false, false, false], fontSize: '20', width: '5%' },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ["*"],
                                            heights: 8,
                                            body: [
                                                [{ text: 'IX. CERTIFICAION DE LA ATENCION MEDICA DE LA VICTIMA COMO PRUEBA DEL ACCIDENTE O EVENTO', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                            ]
                                        },
                                        width: '100%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Fecha de Ingreso", style: 'titulostexto', width: '15%' },
                                    tablasFURIPS(SER4C2.impresion.FECHAING, SER4C2.impresion.FECHAWIDTH, 1, '20%'),
                                    { text: "a las", style: 'titulostexto', width: '3%' },
                                    tablasFURIPS(SER4C2.impresion.HORAING, SER4C2.impresion.HORAWIDTH, 1, '10%'),
                                    { text: "Fecha de Egreso", style: 'titulostexto', width: '10%' },
                                    tablasFURIPS(SER4C2.impresion.FECHAEGR, SER4C2.impresion.FECHAWIDTH, 1, '20%'),
                                    { text: "a las", style: 'titulostexto', width: '3%' },
                                    tablasFURIPS(SER4C2.impresion.HORAEGR, SER4C2.impresion.HORAWIDTH, 1, '10%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Codigo Diagnóstico principal de Ingreso", style: 'titulostexto', width: '38%', margin: [5, 0] },
                                    tablasFURIPS(SER4C2.impresion.DIAG1ING, SER4C2.impresion.DIAGNWIDTH, 1, '12%'),
                                    { text: "Codigo Diagnóstico principal de Egreso", style: 'titulostexto', width: '33%' },
                                    tablasFURIPS(SER4C2.impresion.DIAG1EGR, SER4C2.impresion.DIAGNWIDTH, 1, '12%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Otro Codigo Diagnóstico de Ingreso", style: 'titulostexto', width: '38%', margin: [5, 0] },
                                    tablasFURIPS(SER4C2.impresion.DIAG2ING, SER4C2.impresion.DIAGNWIDTH, 1, '12%'),
                                    { text: "Otro Codigo Diagnóstico principal de Egreso", style: 'titulostexto', width: '33%' },
                                    tablasFURIPS(SER4C2.impresion.DIAG2EGR, SER4C2.impresion.DIAGNWIDTH, 1, '12%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Otro Codigo Diagnóstico de Ingreso", style: 'titulostexto', width: '38%', margin: [5, 0] },
                                    tablasFURIPS(SER4C2.impresion.DIAG3ING, SER4C2.impresion.DIAGNWIDTH, 1, '12%'),
                                    { text: "Otro Codigo Diagnóstico principal de Egreso", style: 'titulostexto', width: '33%' },
                                    tablasFURIPS(SER4C2.impresion.DIAG3EGR, SER4C2.impresion.DIAGNWIDTH, 1, '12%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 8,
                                            body: [
                                                [{ text: SER4C2.impresion.MEDICOPRIMERAPELLIDO, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '50%',
                                        margin: [10, 0]
                                    },
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 8,
                                            body: [
                                                [{ text: SER4C2.impresion.MEDICOSEGUNDOAPELLIDO, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '50%',
                                        margin: [10, 0]
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        text: '1er Apellido del Medico o Profesional Tratante',
                                        width: '50%',
                                        margin: [10, 0],
                                        style: 'tituloscentrados'
                                    },
                                    {
                                        text: '2do Apellido del Medico o Profesional Tratante',
                                        width: '50%',
                                        margin: [10, 0],
                                        style: 'tituloscentrados'
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 8,
                                            body: [
                                                [{ text: SER4C2.impresion.MEDICOPRIMERNOMBRE, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '50%',
                                        margin: [10, 0]
                                    },
                                    {
                                        table: {
                                            widths: [240],
                                            heights: 8,
                                            body: [
                                                [{ text: SER4C2.impresion.MEDICOSEGUNDONOMBRE, style: 'letraencajas' }],
                                            ]
                                        },
                                        width: '50%',
                                        margin: [10, 0]
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        text: '1er Nombre del Medico o Profesional Tratante',
                                        width: '50%',
                                        margin: [10, 0],
                                        style: 'tituloscentrados'
                                    },
                                    {
                                        text: '2do Nombre del Medico o Profesional Tratante',
                                        width: '50%',
                                        margin: [10, 0],
                                        style: 'tituloscentrados'
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Tipo de Documento", style: 'titulostexto', width: '15%' },
                                    {
                                        table: {
                                            widths: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                                            heights: 1,
                                            body: [
                                                [{ text: 'CC', style: 'letraencajas' }, { text: 'CE', style: 'letraencajas' }, { text: 'PA', style: 'letraencajas' }, { text: 'TI', style: 'letraencajas' }, { text: 'RC', style: 'letraencajas' }, { text: 'AS', style: 'letraencajas' }, { text: 'MS', style: 'letraencajas' }, { text: SER4C2.impresion.MEDICOCC, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.MEDICOCE, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.MEDICOPA, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.MEDICOTI, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.MEDICORC, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.MEDICOAS, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: SER4C2.impresion.MEDICOMS, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }],
                                            ]
                                        },
                                        width: '35%',
                                    },
                                    { text: "No. Documento", style: 'titulostexto', width: '10%' },
                                    tablasFURIPS(SER4C2.impresion.MEDICOATI, SER4C2.impresion.CODPACIWIDTH, 1, '50%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "Numero de Registro Medico", style: 'titulostexto', width: '59%', alignment: "right" },
                                    tablasFURIPS(SER4C2.REGMED.padEnd(15, ' ').split(''), [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], 1, '50%'),
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ["*"],
                                            heights: 8,
                                            body: [
                                                [{ text: 'X. AMPAROS QUE RECLAMA', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                            ]
                                        },
                                        width: '100%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "VALOR TOTAL FACTURADO", style: 'titulostexto', width: '62%', alignment: "right" },
                                    { text: "VALOR RECLAMADO AL FOSYGA", style: 'titulostexto', width: '43%', alignment: "center" },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['40%', '30%', '30%'],
                                            heights: 1,
                                            body: [
                                                [{ text: 'GASTOS MEDICO QUIRURGICOS', style: 'letraencajas' }, { text: SER4C2.impresion.VLRMQFACT, style: 'letraencajas', alignment: 'center' }, { text: SER4C2.impresion.VLRMQRECL, style: 'letraencajas', alignment: 'center' }],
                                            ]
                                        },
                                        width: '100%',
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['40%', '30%', '30%'],
                                            heights: 1,
                                            body: [
                                                [{ text: 'GASTOS DE TRANSPORTE Y MOVILIZACION DE LA VICTIMA', style: 'letraencajas' }, { text: SER4C2.impresion.VLRTRFACT, style: 'letraencajas', alignment: 'center' }, { text: SER4C2.impresion.VLRTRRECL, style: 'letraencajas', alignment: 'center' }],
                                            ]
                                        },
                                        width: '100%',
                                    },
                                ],
                            },
                        ],
                        [
                            { text: "El total facturado y reclamado descrito en este numeral se debe detallar y hacer descripcion de las actividades, procedimientos, medicmanetos, insumos", style: 'titulostexto', margin: [5, 0] },
                        ],
                        [
                            { text: "suministros y materiales, dentro del anexo técnico numero 2.", style: 'titulostexto', margin: [5, 0] },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ["*"],
                                            heights: 8,
                                            body: [
                                                [{ text: 'XI. DECLARACIONES DE LA INSTITUCION PRESTADORA DE SERVICIOS DE SALUD', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                            ]
                                        },
                                        width: '100%',
                                    },
                                ],
                            },
                        ],
                        [
                            { text: "Como representante legal o Gerente de la Institución Prestadora de Srvicios de Salud, declaró bajo la gravedad de juramento que toda información contenida", style: 'titulostexto', margin: [5, 0] },
                        ],
                        [
                            { text: "en este formulario es cierta y podra ser verificada por la Dirección General de Financimiento del Ministerio Protección Social, por el Administrador Fiduciario", style: 'titulostexto', margin: [5, 0] },
                        ],
                        [
                            { text: "del Fondo de Solidaridad y Garantia Fosyga, por la Superintendencia Nacional de la Salud o la Contraloria General de la Republica con la IPS y las aseguradoras", style: 'titulostexto', margin: [5, 0] },
                        ],
                        [
                            { text: "de no ser asi, acepto todas las consecuencias legales que produzca esta situación.", style: 'titulostexto', margin: [5, 0] },
                        ],
                        [
                            { text: " ", style: 'titulostexto', margin: [5, 0] },
                        ],
                        [
                            {
                                columns: [
                                    { text: " ", width: "50%" },
                                    {
                                        image: "firma",
                                        fit: [100, 40],
                                        width: "50%"
                                    }
                                ]
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: "                                       ", style: 'titulostexto', margin: [5, 0], width: '50%' },
                                    { text: "_______________________________________", style: 'titulostexto', width: '50%' },
                                ],
                            }
                        ],
                        [
                            { text: "JAIME MORENO ROJAS", style: 'titulostexto', margin: [5, 0] },

                        ],
                        [
                            {
                                columns: [
                                    { text: "", style: 'titulostexto', margin: [5, 0], width: '50%' },
                                    { text: "FIRMA DEL REPRESENTANTE LEGAL, GERENTE O SU DELEGADO", style: 'titulostexto', width: '50%' },
                                ],
                            }
                        ],
                    ]
                },
                layout: {
                    hLineColor: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                    },
                    vLineColor: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                    },
                    paddingLeft: function (i, node) { return 0; },
                    paddingRight: function (i, node) { return 0; },
                    paddingTop: function (i, node) { return 0; },
                    paddingBottom: function (i, node) { return 0; }
                },
            },
            {
                columns: [
                    { text: `${SER4C2.impresion.PREFIJOFUR}${SER4C2.impresion.NROFUR}`, style: "letraencajas", width: '70%' },
                    { text: "CERRO:", style: "letraencajas", width: '6%' },
                    { text: SER4C2.FURIP.OPER_BLOQ_NUM, style: "letraencajas", width: '5%' },
                    { text: "ABRE:", style: "letraencajas", width: '5%' },
                    { text: SER4C2.FURIP.OPERNUM, style: "letraencajas", width: '5%' },
                    { text: "IMP:", style: "letraencajas", width: '4%' },
                    { text: localStorage.Usuario, style: "letraencajas", width: '5%' },
                ]
            }
        ],
        styles: {
            headerimpresion: {
                alignment: "center",
                fontSize: 7,
                bold: true,
            },
            headerimpresion2: {
                alignment: "center",
                fontSize: 7,
                bold: true,
            },
            titulosseparadores: {
                fontSize: 9,
            },
            titulostexto: {
                fontSize: 7,
                bold: true,
            },
            letraencajas: {
                fontSize: 6,
            },
            tituloscentrados: {
                fontSize: 8,
                alignment: 'center'
            },
        },
    };
    datosimpresion.images = {
        logo: "P:\\PROG\\LOGOS\\" + $_USUA_GLOBAL[0].NIT.toString() + ".png",
        firma: "P:\\PROG\\FIRMAS\\" + parseInt(SER4C2.FIRMAS.DATOS_GER).toString() + ".png",
    };
    _impresion2({
        tipo: 'pdf',
        content: datosimpresion,
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}.pdf`,
    })
        .then(() => {
            _toggleNav();
        })
        .catch((err) => {
            console.error(err);
            _toggleNav();
        });
}

function construircuerpotabla(data) {
    console.log(data);
    var body = [];
    data.forEach(function (array) {
        body.push({ text: array, style: 'titulostexto' })
    })
    return body;
}

function tablasFURIPS(data, width, height, widthcolumna) {
    return {
        table: {
            widths: width,
            heights: height,
            body: [construircuerpotabla(data)],
        },
        width: widthcolumna,
    }
}

function _ventanaFactura_SER4C2(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA FACTURAS',
            columnas: [],
            mascara: ['NOMBRE'],
            data: SER4C2.FACTURARIPS,
            callback_esc: function () {
                $('#factura_SER4C2').focus();
            },
            callback: function (data) {
                $('#factura_SER4C2').val(data.COD);
                _enterInput('#factura_SER4C2');
            }
        });
    }
}

function _ventanaCiudad_SER4C2(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA CIUDADES',
            columnas: ['COD', 'NOMBRE'],
            mascara: ['CODIGO', 'NOMBRE'],
            data: SER4C2.CIUDADES,
            callback_esc: function () {
                $('#ciudad_SER4C2').focus();
            },
            callback: function (data) {
                $('#ciudad_SER4C2').val(data.COD);
                _enterInput('#ciudad_SER4C2');
            }
        });
    }
}

function _ventanaEnfermedades1_SER4C2(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA ENFERMEDADES',
            columnas: ['COD_ENF', 'NOMBRE_ENF'],
            mascara: ['CODIGO', 'NOMBRE'],
            data: SER4C2.ENFERMEDADES,
            callback_esc: function () {
                $('#DiagPrinIng_SER4C2').focus();
            },
            callback: function (data) {
                console.log(data);
                $('#DiagPrinIng_SER4C2').val(data.COD_ENF);
                _enterInput('#DiagPrinIng_SER4C2');
            }
        });
    }
}

function _ventanaEnfermedades2_SER4C2(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA ENFERMEDADES',
            columnas: ['COD_ENF', 'NOMBRE_ENF'],
            mascara: ['CODIGO', 'NOMBRE'],
            data: SER4C2.ENFERMEDADES,
            callback_esc: function () {
                $('#otrDiagIng1_SER4C2').focus();
            },
            callback: function (data) {
                console.log(data);
                $('#otrDiagIng1_SER4C2').val(data.COD_ENF);
                _enterInput('#otrDiagIng1_SER4C2');
            }
        });
    }
}

function _ventanaEnfermedades3_SER4C2(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA ENFERMEDADES',
            columnas: ['COD_ENF', 'NOMBRE_ENF'],
            mascara: ['CODIGO', 'NOMBRE'],
            data: SER4C2.ENFERMEDADES,
            callback_esc: function () {
                $('#otrDiagIng2_SER4C2').focus();
            },
            callback: function (data) {
                console.log(data);
                $('#otrDiagIng2_SER4C2').val(data.COD_ENF);
                _enterInput('#otrDiagIng2_SER4C2');
            }
        });
    }
}

function _ventanaEnfermedades4_SER4C2(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA ENFERMEDADES',
            columnas: ['COD_ENF', 'NOMBRE_ENF'],
            mascara: ['CODIGO', 'NOMBRE'],
            data: SER4C2.ENFERMEDADES,
            callback_esc: function () {
                $('#DiagPrinEgr_SER4C2').focus();
            },
            callback: function (data) {
                console.log(data);
                $('#DiagPrinEgr_SER4C2').val(data.COD_ENF);
                _enterInput('#DiagPrinEgr_SER4C2');
            }
        });
    }
}

function _ventanaEnfermedades5_SER4C2(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA ENFERMEDADES',
            columnas: ['COD_ENF', 'NOMBRE_ENF'],
            mascara: ['CODIGO', 'NOMBRE'],
            data: SER4C2.ENFERMEDADES,
            callback_esc: function () {
                $('#otrDiagEgr1_SER4C2').focus();
            },
            callback: function (data) {
                console.log(data);
                $('#otrDiagEgr1_SER4C2').val(data.COD_ENF);
                _enterInput('#otrDiagEgr1_SER4C2');
            }
        });
    }
}

function _ventanaEnfermedades6_SER4C2(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA ENFERMEDADES',
            columnas: ['COD_ENF', 'NOMBRE_ENF'],
            mascara: ['CODIGO', 'NOMBRE'],
            data: SER4C2.ENFERMEDADES,
            callback_esc: function () {
                $('#otrDiagEgr2_SER4C2').focus();
            },
            callback: function (data) {
                console.log(data);
                $('#otrDiagEgr2_SER4C2').val(data.COD_ENF);
                _enterInput('#otrDiagEgr2_SER4C2');
            }
        });
    }
}

function _ventanaIPS1_SER4C2(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA IPS',
            columnas: ['COD', 'DESCRIP'],
            mascara: ['CODIGO', 'NOMBRE'],
            data: SER4C2.IPS,
            callback_esc: function () {
                $('#ipsOrg_SER4C2').focus();
            },
            callback: function (data) {
                $('#ipsOrg_SER4C2').val(data.COD);
                _enterInput('#ipsOrg_SER4C2');
            }
        });
    }
}

function _ventanaIPS2_SER4C2(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA IPS',
            columnas: ['COD', 'DESCRIP'],
            mascara: ['CODIGO', 'NOMBRE'],
            data: SER4C2.IPS,
            callback_esc: function () {
                $('#ipsDest_SER4C2').focus();
            },
            callback: function (data) {
                $('#ipsDest_SER4C2').val(data.COD);
                _enterInput('#ipsDest_SER4C2');
            }
        });
    }
}

function _ventanaCiudad_SER4C2(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA CIUDADES',
            columnas: ['COD', 'NOMBRE'],
            mascara: ['CODIGO', 'NOMBRE'],
            data: SER4C2.CIUDADES,
            callback_esc: function () {
                $('#ciudad_SER4C2').focus();
            },
            callback: function (data) {
                $('#ciudad_SER4C2').val(data.COD);
                _enterInput('#ciudad_SER4C2');
            }
        });
    }
}

function _ventanaProfesional_SER4C2(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA PROFESIONALES',
            columnas: ['IDENTIFICACION', 'NOMBRE'],
            mascara: ['ID', 'NOMBRE'],
            data: SER4C2.PROFESIONALES,
            callback_esc: function () {
                $('#medicoTratante_SER4C2').focus();
            },
            callback: function (data) {
                $('#medicoTratante_SER4C2').val(data.IDENTIFICACION);
                _enterInput('#medicoTratante_SER4C2');
            }
        });
    }
}

function _ventanaPlacas_SER4C2(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        loader('show');
        postData({ datosh: datosEnvio() }, get_url("APP/SALUD/CER101.DLL"))
            .then(data => {
                loader('hide');
                console.log(data);
                data = data.CARROS;
                data.pop();
                _ventanaDatos({
                    titulo: 'CONSULTA DE CARROS POR PLACA',
                    columnas: ["PLACA", "PROPIETARIO", "MARCA"],
                    data: data,
                    ancho: '60%',
                    callback_esc: function () {
                        $('#placaAmb_SER4C2').focus()
                    },
                    callback: function (data) {
                        $('#placaAmb_SER4C2').val(data.PLACA.trim())
                        _enterInput('#placaAmb_SER4C2');
                    }
                });
            }).catch(error => {
                console.error(error);
                $('#placaAmb_SER4C2').focus();
            });
    }
}

function _ventanaPlacas2_SER4C2(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        loader('show');
        postData({ datosh: datosEnvio() }, get_url("APP/SALUD/CER101.DLL"))
            .then(data => {
                loader('hide');
                console.log(data);
                data = data.CARROS;
                data.pop();
                _ventanaDatos({
                    titulo: 'CONSULTA DE CARROS POR PLACA',
                    columnas: ["PLACA", "PROPIETARIO", "MARCA"],
                    data: data,
                    ancho: '60%',
                    callback_esc: function () {
                        $('#placa1_SER4C2').focus()
                    },
                    callback: function (data) {
                        $('#placa1_SER4C2').val(data.PLACA.trim())
                        _enterInput('#placa1_SER4C2');
                    }
                });
            }).catch(error => {
                console.error(error);
                $('#placa1_SER4C2').focus()
            });
    }
}

function _ventanaPlacas3_SER4C2(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        loader('show');
        postData({ datosh: datosEnvio() }, get_url("APP/SALUD/CER101.DLL"))
            .then(data => {
                loader('hide');
                console.log(data);
                data = data.CARROS;
                data.pop();
                _ventanaDatos({
                    titulo: 'CONSULTA DE CARROS POR PLACA',
                    columnas: ["PLACA", "PROPIETARIO", "MARCA"],
                    data: data,
                    ancho: '60%',
                    callback_esc: function () {
                        $('#placa2_SER4C2').focus()
                    },
                    callback: function (data) {
                        $('#placa2_SER4C2').val(data.PLACA.trim())
                        _enterInput('#placa2_SER4C2');
                    }
                });
            }).catch(error => {
                console.error(error);
                $('#placa2_SER4C2').focus()
            });
    }
}

function _ventanaTerceros_SER4C2(e) {
    console.log(e.which)
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'TERCEROS',
            valoresselect: ['Buscar por nombre tercero'],
            f8data: 'TERCEROS',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
            callback: (data) => {
                $('#codConductorAmb_SER4C2').val(data.COD);
                _enterInput('#codConductorAmb_SER4C2');
            },
            cancel: () => {
                $('#codConductorAmb_SER4C2').focus()
                // _enterInput('#conductor_CER101');
            }
        };
        F8LITE(parametros);
    }
}

function _ventanaTerceros2_SER4C2(e) {
    console.log(e.which)
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'TERCEROS',
            valoresselect: ['Buscar por nombre tercero'],
            f8data: 'TERCEROS',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
            callback: (data) => {
                $('#codProp1_SER4C2').val(data.COD);
                _enterInput('#codProp1_SER4C2');
            },
            cancel: () => {
                $('#codProp1_SER4C2').focus()
                // _enterInput('#conductor_CER101');
            }
        };
        F8LITE(parametros);
    }
}

function _ventanaTerceros3_SER4C2(e) {
    console.log(e.which)
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'TERCEROS',
            valoresselect: ['Buscar por nombre tercero'],
            f8data: 'TERCEROS',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
            callback: (data) => {
                $('#codProp2_SER4C2').val(data.COD);
                _enterInput('#codProp2_SER4C2');
            },
            cancel: () => {
                $('#codProp2_SER4C2').focus()
                // _enterInput('#conductor_CER101');
            }
        };
        F8LITE(parametros);
    }
}

function _ventanaTerceros4_SER4C2(e) {
    console.log(e.which)
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'TERCEROS',
            valoresselect: ['Buscar por nombre tercero'],
            f8data: 'TERCEROS',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
            callback: (data) => {
                $('#propietario_SER4C2').val(data.COD);
                _enterInput('#propietario_SER4C2');
            },
            cancel: () => {
                $('#propietario_SER4C2').focus()
                // _enterInput('#conductor_CER101');
            }
        };
        F8LITE(parametros);
    }
}

function _ventanaTerceros5_SER4C2(e) {
    console.log(e.which)
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'TERCEROS',
            valoresselect: ['Buscar por nombre tercero'],
            f8data: 'TERCEROS',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
            callback: (data) => {
                $('#conductor_SER4C2').val(data.COD);
                _enterInput('#conductor_SER4C2');
            },
            cancel: () => {
                $('#conductor_SER4C2').focus()
                // _enterInput('#conductor_CER101');
            }
        };
        F8LITE(parametros);
    }
}
