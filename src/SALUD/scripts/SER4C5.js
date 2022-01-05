var SER4C5 = new Object;

$(document).ready(() => {
    _inputControl('reset');
    _inputControl('disabled');
    $('#prefijo_SER4C5').val('T');
    SER4C5.PREFIJOW = 'T';
    obtenerDatosCompletos({ nombreFd: 'PACIENTES', filtro: '||' }, data => {
        data = data.PACIENTES;
        data.pop();
        SER4C5.PACIENTES = data;
        let URL = get_url("APP/CONTAB/CON007.DLL");
        postData({ datosh: datosEnvio() + '9' + SER4C5.PREFIJOW + '|' }, URL)
            .then(data => {
                console.debug(data);
                var data = data.split("|");
                SER4C5.NROW = data[1].substring(3, 9);
                SER4C5.NROW = parseInt(SER4C5.NROW) - 1;
                $('#numero_SER4C5').val(SER4C5.NROW);
                _evaluarnro_SER4C5();
            })
            .catch(err => {
                console.debug(err);
            })
        obtenerDatosCompletos({ nombreFd: 'NUMERACION', filtro: '0||||' }, data => {
            data = data.NUMERACION;
            data.pop();
            SER4C5.NUMERACION = data;
            obtenerDatosCompletos({ nombreFd: 'CIUDADES' }, data => {
                data = data.CIUDAD;
                data.pop();
                SER4C5.CIUDADES = data;
                obtenerDatosCompletos({ nombreFd: 'CARROS' }, data => {
                    data = data.CARROS;
                    data.pop();
                    SER4C5.CARROS = data;
                    obtenerDatosCompletos({ nombreFd: 'TERCEROS' }, data => {
                        data = data.TERCEROS;
                        data.pop();
                        SER4C5.TERCEROS = data;
                        obtenerDatosCompletos({ nombreFd: 'IPS' }, data => {
                            data = data.IPS;
                            data.pop();
                            SER4C5.IPS = data;
                        })
                    })
                })
            })
        }, 'OFF');
    }, 'ON');
})

function _evaluarnro_SER4C5() {
    validarInputs({
        form: '#VALIDAR1_SER4C5',
        orden: "1"
    },
        _toggleNav,
        () => {
            SER4C5.NROW = $('#numero_SER4C5').val().padStart(6,'0');
            SER4C5.LLAVEW = SER4C5.PREFIJOW + SER4C5.NROW;
            let URL = get_url("APP/SALUD/SER4C5.DLL");
            postData({ datosh: datosEnvio() + '1|' + SER4C5.LLAVEW + '|' }, URL)
                .then(data => {
                    console.debug(data);
                    SER4C5.IDPACNUM = data.CONSULTA[0].IDPACNUM;
                    SER4C5.FECHAINGNUM = data.CONSULTA[0].FECHAINGNUM;
                    SER4C5.FECHARETNUM = data.CONSULTA[0].FECHARETNUM;
                    SER4C5.TIPOEVENTONUM = data.CONSULTA[0].TIPOEVENTONUM;
                    let URL = get_url("APP/SALUD/SER4C2P.DLL");
                    postData({ datosh: datosEnvio() + '1|' + SER4C5.LLAVEW + '|' }, URL)
                        .then(data => {
                            console.debug(data);
                            SER4C2.IDPACW = data.FACTURA[0].ID_PACI;
                            $('#victima_SER4C5').val(SER4C5.IDPACW);
                            SER4C2.DESCRIPPACI = data.FACTURA[0]['1ER_NOM_PACI'] + data.FACTURA[0]['2DO_NOM_PACI'] + data.FACTURA[0]['1ER_APEL_PACI'] + data.FACTURA[0]['2DO_APEL_PACI'];
                            $('#victimad_SER4C5').val(SER4C5.DESCRIPPACI);
                            SER4C2.TIPOEVENTW = data.FACTURA[0].TIPO_EVEN_FUR;
                            SER4C2.DIROCURW = data.FACTURA[0].DIR_OCUR_FUR;
                            SER4C2.ZONAOCURW = data.FACTURA[0].ZONA_OCUR_FUR;
                            SER4C2.CIUDADOCURW = data.FACTURA[0].CIUD_PACI;
                            SER4C2.FECHAREMIW = data.FACTURA[0].FECHA_REMI_FUR.substring(0, 4) + '/' + data.FACTURA[0].FECHA_REMI_FUR.substring(4, 6) + '/' + data.FACTURA[0].FECHA_REMI_FUR.substring(6, 8) + ' ' + data.FACTURA[0].HORA_REMI_FUR.substring(0, 2) + ':' + data.FACTURA[0].HORA_REMI_FUR.substring(2, 4);
                            SER4C2.CODIPSREMIW = data.FACTURA[0].NOMBRE_IPS_REMI;
                            SER4C2.NOMBREIPSREMIW = data.FACTURA[0].NOMBRE_IPS_REMI;
                            SER4C2.PLACAAMBW = data.FACTURA[0].PLACA_AMB;
                            $('#placa_SER4C5').val(SER4C5.PLACAAMBW);
                            if (SER4C5.PLACAAMBW.trim() == '') {
                                SER4C5.AMBULCAR = '';
                            } else {
                                var carros = SER4C2.CARROS;
                                var carro = carros.filter(x => x.PLACA == SER4C5.PLACAAMBW.trim());
                                if (carro.length > 0) {
                                    SER4C5.AMBULCAR = carro[0].AMBUL; SER4C5.MARCACAR = carro[0].MARCA;
                                } else {
                                    SER4C5.AMBULCAR = '';
                                    SER4C5.MARCACAR = '';
                                }
                            }
                            let ambul = {
                                '1': 'BASICA',
                                '2': 'MEDICADA',
                                '3': 'NO APLICA',
                                '': ''
                            };
                            $('#tiposervicio_SER4C5').val(SER4C5.AMBULCAR + ' ' + ambul[SER4C5.AMBULCAR]);
                            _evaluarplacaamb_SER4C5();
                        })
                        .catch(err => {
                            console.debug(err);
                            if (err.MENSAJE == '01') {
                                SER4C5.NOVEDADW = '7';
                                SER4C5.IDPACW = SER4C5.IDPACNUM;
                                SER4C5.FECHAINGW = SER4C5.FECHAINGNUM;
                                SER4C5.FECHAEGRW = SER4C5.FECHARETNUM;
                                SER4C5.TIPOEVENW = SER4C5.TIPOEVENTONUM;
                                if (!$.isNumeric(SER4C5.TIPOEVENTONUM)) SER4C5.TIPOEVENW = '01';
                                _evaluarplacaamb_SER4C5();
                            }
                        })
                })
                .catch(err => {
                    console.debug(err);
                    if (err.MENSAJE == '1Y') {
                        _evaluarnro_SER4C5();
                    }
                })
        }
    )
}

function _evaluarplacaamb_SER4C5() {
    validarInputs({
        form: '#VALIDAR2_SER4C5',
        orden: '1'
    },
        _evaluarnro_SER4C5,
        () => {
            var placas = SER4C2.CARROS;
            SER4C5.PLACAAMBW = $('#placa_SER4C5').val();
            if (SER4C2.PLACAVEHW.trim() == '') {
                CON851('03', '03', null, 'error', 'Error');
                _evaluarplacaamb_SER4C5();
            } else {
                var placa = placas.filter(x => x.PLACA == SER4C5.PLACAAMBW.trim());
                console.debug(placa);
                if (placa.length > 0) {
                    if ((placa[0].SERV == '1' || placa[0].SERV == '2' || placa[0].SERV == '3' || placa[0].SERV == '4' || placa[0].SERV == '5' || placa[0].SERV == '6' || placa[0].SERV == '7')) {
                        let ambul = {
                            '1': 'BASICA',
                            '2': 'MEDICADA',
                            '3': 'NO APLICA',
                            '': ''
                        };
                        $('#tiposervicio_SER4C5').val(placa[0].AMBUL + ' ' + ambul[placa[0].AMBUL]);
                        _evaluardirzonaocur_SER4C5('1');
                    } else {
                        let { ipcRenderer } = require("electron");
                        ipcRenderer.send('another', 'SALUD/paginas/CER101.html');
                        let vector = ['on', 'Actualizando maestro de carros...']
                        _EventocrearSegventana(vector, _evaluarplacaamb_SER4C5);
                    }
                } else {
                    if (SER4C2.ASEGVEHW == '5') {
                        _crearfuga_SER4C2();
                    } else {
                        let { ipcRenderer } = require("electron");
                        ipcRenderer.send('another', 'SALUD/paginas/CER101.html');
                        let vector = ['on', 'Actualizando maestro de carros...']
                        _EventocrearSegventana(vector, _evaluarplacaamb_SER4C5);
                    }
                }
            }
        }
    )
}

function _evaluardirzonaocur_SER4C5(orden){
    validarInputs({
        form: '#VALIDAR3_SER4C5',
        orden: orden
    },
        _evaluarplacaamb_SER4C5,
        () => {
            SER4C5.DIROCURW = $('#dirocur_SER4C5').val(); SER4C2.ZONAOCURW = zonaMask_SER4C5.value;
            _evaluarciudad_SER4C5();
        }
    )
}

function _evaluarciudad_SER4C5(){
    validarInputs({
        form: '#VALIDAR4_SER4C5',
        orden: '1'
    },
        () => {_evaluardirzonaocur_SER4C5('2')},
        () => {
            SER4C5.CIUDADOCURW = $('#ciudad_SER4C5').val();
            var ciudades = SER4C5.CIUDADES;
            var ciudad = ciudades.filter(x => x.COD == SER4C5.CIUDADOCURW);
            console.log(ciudad);
            if (ciudad.length > 0) {
                $('#ciudad_SER4C5').val(ciudad[0].COD + ' ' + ciudad[0].NOMBRE);
                _evaluarfecharemi_SER4C5();
            } else {
                CON851('03', '03', null, 'error', 'Error');
                _evaluarciudad_SER4C5();
            }
        }
    )
}

function _evaluarfecharemi_SER4C5(){
    validarInputs({
        form: '#VALIDAR5_SER4C5',
        orden: '1'
    },
        _evaluarciudad_SER4C5,
        () => {
            SER4C5.FECHAREMIW = fecharemiMask_SER4C5.value;
            _evaluarips_SER4C5();
        }
    )
}

function _evaluarips_SER4C5(){
    validarInputs({
        form: '#VALIDAR6_SER4C5',
        orden: '1'
    },
        _evaluarfecharemi_SER4C5,
        () => {
            SER4C5.CODIPSREMIW = $('#ips_SER4C5').val();
            var ipss = SER4C5.IPS;
            var ips = ipss.filter(x => x.COD == SER4C5.CODIPSREMIW.trim());
            if (ips.length > 0) {
                $('#ciudadips_SER4C5').val(ips[0].CODCIUDAD + ' - ' + ips[0].CIUDAD);
                $('#nombreips_SER4C5').val(ips[0].DESCRIP);
                $('#nitips_SER4C5').val();
                CON851P('01', _cancelarguardar_SER4C5, _guardar_SER4C5);
            } else {
                // LLAMAR SEGUNDA VENTANA PARA CREAR IPS
            }
        }
    )
}

function _guardar_SER4C5(){
    let paso = {
        '7':'2',
        '8':'3'
    };
    let fecha = SER4C5.FECHAREMIW.substring(0,4) + SER4C5.FECHAREMIW.substring(5,7) + SER4C5.FECHAREMIW.substring(8,10);
    let hora = SER4C5.FECHAREMIW.substring(11,13) + SER4C5.FECHAREMIW.substring(14,16);
    let URL = get_url("APP/SALUD/SER4C5.DLL");
    postData({ datosh: datosEnvio() + paso[SER4C5.NOVEDADW] + '|' + SER4C5.LLAVEW + '|' + localStorage.getItem('Usuario') + '|' + SER4C5.IDPACW + '|' + SER4C5.FECHAINGW + '|' + SER4C5.FECHAEGRW + '|' + SER4C5.TIPOEVENTW + '|' + SER4C5.PLACAAMBW + '|' + SER4C5.DIROCURW + '|' + SER4C5.ZONAOCURW + '|' + SER4C5.CIUDADOCURW + '|' + fecha + '|' + hora + '|' + SER4C5.CODIPSREMIW + '|' }, URL)
        .then(data => {
            console.debug(data);
            // impresion
        })
        .catch(err => {
            console.error(err);
        })
}

// MASCARAS

var zonaMask_SER4C5 = IMask($('#zona_SER4C5')[0], {
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
var fecharemiMask_SER4C5 = IMask($('#fecharemi_SER4C5')[0], {
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