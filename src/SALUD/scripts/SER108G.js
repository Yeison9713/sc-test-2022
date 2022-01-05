var SER108G = new Object;
$(document).ready(() => {
    nombreOpcion('9,7,4,1,2,4 - Dispersion de facturas capital salud');
    _inputControl('reset');
    _inputControl('disabled');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    SER108G.ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_DIALNK = $_FECHA_LNK.substring(4, 6);
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_ANOLNK = parseInt($_ANOLNK) + 2000;
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    SER108G.FECHAACTUAL = moment().format('YYYYMMDD');
    SER108G.HORASISTEMA = moment().format('HHmmss');
    SER108G.PREFW = '';
    _toggleF8([
        { input: "paciente", app: "108G", funct: _ventanaPacientes_SER108G },
    ]);
    _dato1_SER108G();
})

function _ventanaPacientes_SER108G(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'PACIENTES',
            valoresselect: ['Nombre del paciente'],
            f8data: 'PACIENTES',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }],
            callback: (data) => {
                document.querySelector("#paciente_108G").value = data.COD;
                _enterInput('#paciente_108G');
            },
            cancel: () => {
                _enterInput('#paciente_108G');
            }
        };
        F8LITE(parametros);
    }
}

function _dato1_SER108G() {
    if (SER108G.PREFW.trim() == '') {
        SER108G.PREFW = 'A';
        $('#prefijo_SER108G').val(SER108G.PREFW)
    }
    validarInputs({
        form: '#PREFIJO_SER108G',
        orden: '1'
    },
        _toggleNav,
        () => {
            SER108G.PREFW = $('#prefijo_SER108G').val()
            if ((SER108G.PREFW == 'A') || (SER108G.PREFW == 'T')) {
                _aceptarnumero_SER108G();
            } else {
                CON851('03', '03', null, 'error', 'Error');
                _dato1_SER108G();
            }
        }
    )
}

function _aceptarnumero_SER108G() {
    validarInputs({
        form: '#NUMERO_SER108G',
        orden: '1'
    },
        _dato1_SER108G,
        () => {
            SER108G.NROFACTW = $('#numero_SER108G').val();
            SER108G.NROFACTW = cerosIzq(SER108G.NROFACTW, 6);
            $('#numero_SER108G').val(SER108G.NROFACTW);
            if (parseInt(SER108G.NROFACTW) == 0) {
                CON851('02', '02', null, 'error', 'Error');
                _aceptarnumero_SER108G();
            } else {
                SER108G.LLAVENUM = SER108G.PREFW + SER108G.NROFACTW;
                let datos_envio = datosEnvio() + SER108G.LLAVENUM + '|';
                SolicitarDll({ datosh: datos_envio }, dato => {
                    var date = dato.split("|");
                    var SWINVALID = date[0];
                    SER108G.NITNUM = date[2].trim();
                    SER108G.DESCRIPNUM = date[3].trim();
                    SER108G.CONVENIONUM = date[4].trim();
                    SER108G.DESCRIPTAR = date[5].trim();
                    SER108G.ESTADONUM = date[6].trim();
                    SER108G.IDPACNUM = date[10].trim();
                    SER108G.DESCRIPPACINUM = date[11].trim();
                    SER108G.FECHAINGNUM = date[15].trim();
                    SER108G.ANOINGNUM = SER108G.FECHAINGNUM.substring(0, 4);
                    SER108G.MESINGNUM = SER108G.FECHAINGNUM.substring(4, 6);
                    SER108G.FECHASALNUM = date[16].trim();

                    if (SWINVALID == '00') {
                        $('#nitclienteo_SER108G').val(SER108G.NITNUM);
                        $('#descripciono_SER108G').val(SER108G.DESCRIPNUM);
                        $('#convenioo_SER108G').val(SER108G.CONVENIONUM + '-' + SER108G.DESCRIPTAR);
                        $('#fechaingresoo_SER108G').val(SER108G.FECHAINGNUM);
                        $('#fecharetiroo_SER108G').val(SER108G.FECHASALNUM);
                        if (SER108G.ESTADONUM == '0') {
                            $('#estadoo_SER108G').val('ACTIVA');
                        } else if (SER108G.ESTADONUM == '1') {
                            $('#estadoo_SER108G').val('INACTIVA');
                        } else if (SER108G.ESTADONUM == '2') {
                            $('#estadoo_SER108G').val('BLOQUEADA');
                        }
                        _validarfactura_SER108G();
                    } else if (SWINVALID == '01') {
                        CON851('01', '01', null, 'error', 'error');
                        _aceptarnumero_SER108G();
                    }
                }, get_url('APP/SALUD/SER108-01.DLL'));
            }
        })
}

function _validarfactura_SER108G() {
    if (SER108G.ESTADONUM == '0') {
        if ((SER108G.ANOINGNUM == $_ANOLNK) && (SER108G.MESINGNUM == $_MESLNK)) {
            CON851P('39', _prefijodest_SER108G, _datoclasif_SER108G)
        } else {
            CON851('91', '91', null, 'error', 'error');
            _aceptarnumero_SER108G();
        }
    } else {
        CON851('70', '70', null, 'error', 'error');
        _aceptarnumero_SER108G();
    }
}

function _prefijodest_SER108G() {
    SER108G.PREFDESW = '';
    if (SER108G.PREFDESW.trim() == '') {
        SER108G.PREFDESW = SER108G.PREFW;
        $('#prefijodest_108G').val(SER108G.PREFDESW)
    }
    validarInputs({
        form: '#PREFIJODEST_SER108G',
        orden: '1'
    },
        _aceptarnumero_SER108G,
        () => {
            SER108G.PREFDESW = $('#prefijo_SER108G').val()
            if ((SER108G.PREFDESW == 'A') || (SER108G.PREFDESW == 'T')) {
                let datos_envio = datosEnvio() + SER108G.PREFDESW + '|';
                SolicitarDll({ datosh: datos_envio }, dato => {
                    console.log(dato, 'SER108G.LLAVENUMDEST')
                    var date = dato.split("|");
                    var SWINVALID = date[0];
                    if (SWINVALID == '00') {
                        _aceptarnumerodest_SER108G();
                    } else if (SWINVALID == '03') {
                        CON851('03', '03', null, 'error', 'Error');
                        _prefijodest_SER108G();
                    }
                }, get_url('APP/SALUD/SER108G_01.DLL'));

            } else {
                CON851('03', '03', null, 'error', 'Error');
                _prefijodest_SER108G();
            }
        }
    )
}

function _aceptarnumerodest_SER108G() {
    validarInputs({
        form: '#NUMERODEST_SER108G',
        orden: '1'
    },
        _prefijodest_SER108G,
        () => {
            SER108G.NUMERODESW = $('#numerodest_108G').val();
            SER108G.NUMERODESW = cerosIzq(SER108G.NUMERODESW, 6);
            $('#numerodest_108G').val(SER108G.NUMERODESW);
            _leerfacnumero_SER108G();
        }
    )
}

function _leerfacnumero_SER108G() {
    if (parseInt(SER108G.NUMERODESW) == 0) {
        CON851('02', '02', null, 'error', 'Error');
        _aceptarnumero_SER108G();
    } else {
        console.log(SER108G.NUMERODESW, 'SER108G.NROFACTW')
        SER108G.LLAVENUMDEST = SER108G.PREFDESW + SER108G.NUMERODESW;
        let datos_envio = datosEnvio() + SER108G.LLAVENUMDEST + '|';
        SolicitarDll({ datosh: datos_envio }, dato => {
            console.log(dato, 'SER108G.LLAVENUMDEST')
            var date = dato.split("|");
            var SWINVALID = date[0];
            SER108G.NITNUMD = date[2].trim();
            SER108G.DESCRIPNUMD = date[3].trim();
            SER108G.CONVENIONUMD = date[4].trim();
            SER108G.DESCRIPTARD = date[5].trim();
            SER108G.ESTADONUMD = date[6].trim();
            SER108G.IDPACNUMD = date[10].trim();
            SER108G.DESCRIPPACINUMD = date[11].trim();
            SER108G.FECHAINGNUMD = date[15].trim();
            SER108G.ANOINGNUMD = SER108G.FECHAINGNUMD.substring(0, 4);
            SER108G.MESINGNUMD = SER108G.FECHAINGNUMD.substring(4, 6);
            SER108G.FECHASALNUMD = date[16].trim();
            SER108G.CLASIFNUM = date[48].trim();
            console.log('SER108G.CLASIFNUM', SER108G.CLASIFNUM)
            if (SWINVALID == '00') {
                $('#nitcliented_SER108G').val(SER108G.NITNUMD);
                $('#descripciond_SER108G').val(SER108G.DESCRIPNUMD);
                $('#conveniod_108G').val(SER108G.CONVENIONUMD + '-' + SER108G.DESCRIPTARD);
                $('#fechaingresod_108G').val(SER108G.FECHAINGNUMD);
                $('#fecharetirod_108G').val(SER108G.FECHASALNUMD);
                switch (SER108G.CLASIFNUM) {
                    case '1':
                        $('#clasif_SER108G').val('POS');
                        _validacionesfactura2_SER108G();
                        break;
                    case '2':
                        $('#clasif_SER108G').val('NoPOS');
                        _validacionesfactura2_SER108G();
                        break;
                    case '3':
                        $('#clasif_SER108G').val('Todos');
                        _validacionesfactura2_SER108G();
                        break;
                    default:
                        SER108G.CLASIFNUM = '3';
                        $('#clasif_SER108G').val('Todos');
                        _validacionesfactura2_SER108G();
                        break;
                }
            } else if (SWINVALID == '01') {
                CON851('01', '01', null, 'error', 'error');
                _aceptarnumerodest_SER108G();
            }
        }, get_url('APP/SALUD/SER108-01.DLL'));
    }
}


function _validacionesfactura2_SER108G() {
    NITW = NITW ? NITW : false;
    let datos_envio = datosEnvio() + SER108G.LLAVENUM + '|' + SER108G.ADMINW + '|' + SER108G.HORASISTEMA;
    SolicitarDll({ datosh: datos_envio }, dato => {
        console.log(dato, 'SER835FA')
        var date = dato.split("|");
        SER108G.NROPACIW = date[0].trim();
        FACT = date[1].trim();
        $('#estadod_108G').val('ACTIVA');
        if (SER108G.ESTADONUMD == '0') {
            $('#estadod_108G').val('ACTIVA');
        } else if (SER108G.ESTADONUMD == '1') {
            $('#estadod_108G').val('INACTIVA');
        } else if (SER108G.ESTADONUMD == '2') {
            $('#estadod_108G').val('BLOQUEADA');
        }
        if (SER108G.NITNUMD != NITW) {
            CON851('91', '91', null, 'error', 'error');
            _aceptarnumerodest_SER108G();
        } else if (SER108G.ESTADONUMD == '0') {
            if ((SER108G.ANOINGNUMD == $_ANOLNK) && (SER108G.MESINGNUMD == $_MESLNK)) {
                if (SER108G.CONVENIONUMD != CONVENIOW) {
                    CON851('03', 'ERROR EN CONVENIO!', null, 'error', 'error');
                    _aceptarnumerodest_SER108G();
                } else if (SER108G.NROPACIW > 49) {
                    CON851('90', '90', null, 'error', 'error');
                    _aceptarnumerodest_SER108G();
                }
                else {
                    $('#cantidad_108G').val(SER108G.NROPACIW);
                    _aceptarpacientes_SER108G();
                }
            } else {
                CON851('91', '91', null, 'error', 'error');
                _aceptarnumerodest_SER108G();
            }
        } else {
            CON851('70', '70', null, 'error', 'error');
            _aceptarnumerodest_SER108G();;
        }

    }, get_url('APP/SALUD/SER835FA.DLL'));
}

function _aceptarpacientes_SER108G() {
    SER108G.PACIENTEW = '';
    validarInputs({
        form: '#PACIENTE_SER108G',
        orden: '1'
    },
        () => { _validarfactura_SER108G('2') },
        () => {
            SER108G.PACIENTEW = $('#paciente_108G').val();
            SER108G.PACIENTEW = SER108G.PACIENTEW.padStart(15, '0')
            $('#paciente_108G').val(SER108G.PACIENTEW);
            if (SER108G.PACIENTEW == "000000000000000") {
                CON851('01', '01', null, 'error', 'error');
                _aceptarpacientes_SER108G();
            } else {
                let datos_envio = datosEnvio() + SER108G.PACIENTEW + '|';
                SolicitarDll({ datosh: datos_envio }, dato => {
                    var date = dato.split("|");
                    var SWINVALID = date[0];
                    SER108G.DECRIPPACIW = date[4].trim();
                    if (SWINVALID == '00') {
                        $('#nombrepaciente_108G').val(SER108G.DECRIPPACIW);
                        _buscarfacturado_SER108G();

                    } else if (SWINVALID == '01') {
                        CON851('01', '01', null, 'error', 'error');
                        _aceptarnumerodest_SER108G();
                    }
                }, get_url('APP/SALUD/SER110C_03.DLL'));
            }
        })
}

function _buscarfacturado_SER108G() {
    console.log('buscar factura')
    SER108G.CLW = '9';
    var SER835G = [];
    let URL = get_url("APP/SALUD/SER835G.DLL");
    postData({
        datosh: datosEnvio() + SER108G.PACIENTEW + '|' + SER108G.CLW + '|' + SER108G.ADMINW + '|' + SER108G.CLASIFNUM + '|' + SER108G.LLAVENUMDEST
    }, URL)
        .then(data => {
            SER835G = data.FACT;
            SER835G.pop();
            _ventanaDatos({
                titulo: SER108G.PACIENTEW + ' ' + SER108G.DECRIPPACIW + ' ' + SER108G.LLAVENUMDEST + ' ' + SER108G.CLASIFNUM,
                columnas: ["FECHA", "CTA", "CL", "ART", "AUTOR", "MEDIC"],
                data: SER835G,
                pluss: true,
                callback_esc: () => { _aceptarpacientes_SER108G(); },
                callback: data => {
                   console.debug(data,'datos seleccion')
                     }
            });
        })
        // .catch(error => {
        //     console.log(error);
        //     callback();
        // });
}

function _dllgrabaropcion_SER108G() {
    console.log('grabacion de la opcion')
    let datos_envio = datosEnvio() + SER108G.PACIENTEW + '|' + SER108G.CLW + '|' + SER108G.ADMINW + '|' + SER108G.CLASIFNUM + '|' + SER108G.LLAVENUMDEST;
    SolicitarDll({ datosh: datos_envio }, dato => {
        console.log(dato, 'respuesta final')
        var date = dato.split("|");
        console.log(date,'datos');

    }, get_url('APP/SALUD/SER108G_02.DLL'));
}


////////////VALIDACIONES DE CLASIF Y DUPLICAR FACTURA ///////////

function _validaciondllpaciente_SER108G(data) {
    CON851P('04', _prefijodest_SER108G, _datoclasif_SER108G)
    if (data != void 0) _dllgrabaropcion_SER108G();
}
function _datoclasif_SER108G() {
    validarInputs({
        form: '#CLASIFIC_SER108G',
        orden: '1'
    },
        () => { _aceptarnumero_SER108G() },
        () => {
            SER108G.CLASIFNUM = $('#clasif_SER108G').val();
            console.log('SER108G.CLASIFNUM', SER108G.CLASIFNUM)
            switch (SER108G.CLASIFNUM) {
                case '1':
                    $('#clasif_SER108G').val("POS");
                    _crearnumeracion_SER108G();
                    break;
                case '2':
                    $('#clasif_SER108G').val("NoPOS");
                    _crearnumeracion_SER108G();
                    break;
                case '3':
                    $('#clasif_SER108G').val("Todos");
                    _crearnumeracion_SER108G();
                    break;
                default:
                    CON851('03', '03', null, 'error', 'error');
                    _datoclasif_SER108G();
                    break;
            }
        }
    )
}

function _crearnumeracion_SER108G() {
    console.log('enviar', SER108G.CLASIFNUM)
    $_FECHACREAW = moment().format('YYYYMMDD');
    let datos_envio = datosEnvio() + SER108G.LLAVENUM + '|' + SER108G.ADMINW + '|' + $_FECHACREAW + '|' + SER108G.CLASIFNUM;
    SolicitarDll({ datosh: datos_envio }, dato => {
        console.log(dato, 'crear numeracion')
        var date = dato.split("|");
        SER108G.PREFDESW = date[1];
        SER108G.NUMERODESW = date[2];
        CONVENIOW = date[4];
        NITW = date[5];
        console.log('NITW', NITW)
        $('#prefijodest_108G').val(SER108G.PREFDESW);
        $('#numerodest_108G').val(SER108G.NUMERODESW);
        _leerfacnumero_SER108G()
    }, get_url('APP/SALUD/SER108G.DLL'));
}


