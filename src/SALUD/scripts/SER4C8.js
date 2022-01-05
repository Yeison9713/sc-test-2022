var SER4C8 = new Object;

$(document).ready(() => {
    _inputControl('reset');
    _inputControl('disabled');
    $('#prefijo_SER4C8').val('T');
    SER4C8.PREFIJOW = 'T';
    _evaluarfactura_SER4C8('1');
})

function _evaluarfactura_SER4C8(orden) {
    validarInputs({
        form: '#VALIDAR1_SER4C8',
        orden: orden
    },
        _toggleNav,
        () => {
            SER4C8.PREFORIW = prefijoorigenMask_SER4C8.value; SER4C8.NROFACORIW = $('#numeroorigen_SER4C8').val().padStart(6,'0');
            SER4C8.LLAVEPREFORIW = SER4C8.PREFORIW + SER4C8.NROFACORIW;
            if (SER4C8.NROFACORIW == '' || parseInt(SER4C8.NROFACORIW) == 0) {
                _evaluarfactura_SER4C8('2');
            } else {
                let URL = get_url("APP/SALUD/SER4C8.DLL");
                postData({ datosh: datosEnvio() + '1|' + SER4C8.LLAVEPREFORIW + '|' }, URL)
                    .then(data => {
                        console.debug(data);
                        $('#idorigen_SER4C8').val(data.CONSULTA[0].IDPACFUR);
                        SER4C8.IDPACFUR = data.CONSULTA[0].IDPACFUR;
                        $('#nombreorigen_SER4C8').val(data.CONSULTA[0].DESCRIPPACI);
                        let fecha = data.CONSULTA[0].FECHAOCURFUR + data.CONSULTA[0].HORAOCURFUR;
                        fechaorigenMask.typedValue = fecha;
                        _evaluarfacturadestino_SER4C8('1');
                    })
                    .catch(err => {
                        console.debug(err);
                        if (err.MENSAJE == '01'){
                            $('#numeroorigen_SER4C8').val('');
                            _evaluarfactura_SER4C8();
                        }
                    })
            }
        }
    )
}

function _evaluarfacturadestino_SER4C8(orden){
    validarInputs({
        form: '#VALIDAR2_SER4C8',
        orden: orden
    },
        () => {_evaluarfactura_SER4C8('2')},
        () => {
            SER4C8.PREFDESW = prefijodestinoMask_SER4C8.value; SER4C8.NROFACDESW = $('#numerodestino_SER4C8').val().padStart(6,'0');
            SER4C8.LLAVEFACTDESW = SER4C8.PREFDESW + SER4C8.NROFACDESW;
            if (SER4C8.NROFACDESW == '' || parseInt(SER4C8.NROFACDESW) == 0) {
                _evaluarfacturadestino_SER4C8('2');
            } else {
                let URL = get_url("APP/SALUD/SER4C8.DLL");
                postData({ datosh: datosEnvio() + '2|' + SER4C8.LLAVEFACTDESW + '|' }, URL)
                    .then(data => {
                        console.debug(data);
                        $('#iddestino_SER4C8').val(data.CONSULTA[0].IDPACFUR);
                        $('#nombredestino_SER4C8').val(data.CONSULTA[0].DESCRIPPACI);
                        if (data.CONSULTA[0].IDPACFUR == SER4C8.IDPACFUR){
                            CON851P('04', _toggleNav, _guardar_SER4C8);
                        } else {
                            CON851('03','03',null,'error','Error');
                            _evaluarfacturadestino_SER4C8('1');
                        }
                    })
                    .catch(err => {
                        console.debug(err);
                        if (err.MENSAJE == '01'){
                            $('#numerodestino_SER4C8').val('');
                            _evaluarfacturadestino_SER4C8('2');
                        }
                    })
            }
        }
    )
}

function _guardar_SER4C8(){
    let URL = get_url("APP/SALUD/SER4C8.DLL");
    postData({ datosh: datosEnvio() + '1|' + SER4C8.LLAVEPREFORIW + '|' + SER4C8.LLAVEFACTDESW + '|' + localStorage.getItem('Usuario') + '|' }, URL)
        .then(data => {
            console.debug(data);
            CON851('39','39',null,'succes','Exitoso');
            _toggleNav();
        })
        .catch(err => {
            console.error(err);
            CON851('01','01',null,'error','Error');
            _toggleNav();
        })
}

// MASCARAS

var prefijoorigenMask_SER4C8 = IMask($('#prefijoorigen_SER4C8')[0], {
    mask: 'a',
    definitions: {
        'a': /[TVWXYZ]/
    },
    prepare: function (str) {
        return str.toUpperCase()
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});

var prefijodestinoMask_SER4C8 = IMask($('#prefijodestino_SER4C5')[0], {
    mask: 'a',
    definitions: {
        'a': /[TVWXYZ]/
    },
    prepare: function (str) {
        return str.toUpperCase()
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});

var momentFormat = 'YYYY/MM/DD HH:mm';
var fechaorigenMask = IMask($('#fechaorigen_SER4C8')[0], {
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