// 22/05/2020 DIANA E: CREADO 
var SER169 = new Object;

$(document).ready(function () {
    nombreOpcion('9,7,6,6 - Traslada los comprobantes de prestacion de servicios de una fact a otra');
    _inputControl('reset');
    _inputControl('disabled');
    SER169.ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    SER169.FECHALNK = $_USUA_GLOBAL[0].FECHALNK;
    SER169.MESLNK = SER169.FECHALNK.substring(2, 4);
    SER169.DIALNK = SER169.FECHALNK.substring(4, 6);
    SER169.ANOLNK = 20 + SER169.FECHALNK.substring(0, 2);
    SER169.NITUSU = $_USUA_GLOBAL[0].NIT;
    SER169.COSTOW = '';
    _toggleF8([
        { input: 'numeroorig', app: '169', funct: _ventanaFacturacion_ser169 },
        { input: 'costo', app: '169', funct: _ventanaCostos_ser169 },
        { input: 'tipocomp', app: '169', funct: _ventanaclaseservicio_ser169 },
        { input: 'gruposerv', app: '169', funct: _ventanagruposer_ser169 },
        { input: 'cups', app: '169', funct: _ventanacups_ser169 },
        { input: 'paciente', app: '169', funct: _ventanaPacientes_ser169 },
        { input: 'eps', app: '169', funct: _ventanaeps_ser169 },
        { input: 'unidadserv', app: '169', funct: _ventanaunidadserv_ser169 },
        { input: 'ciudadpac', app: '169', funct: _ventanaciudad_ser169 },
        { input: 'personal', app: '169', funct: _ventanaprofesionales_ser169 },
        { input: 'especialidad', app: '169', funct: _ventanaespecialidad_ser169 }
    ]);
    if ($_USUA_GLOBAL[0].NIT == '0800156469') {
        SER169.SERVICIOS = [
            { COD: '0', DESCRIPCION: 'DROGUERIA' },
            { COD: '1', DESCRIPCION: 'CIRUGIAS' },
            { COD: '2', DESCRIPCION: 'ECOGRAFIAS' },
            { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
            { COD: '4', DESCRIPCION: 'DOPPLER' },
            { COD: '5', DESCRIPCION: 'T.A.C.' },
            { COD: '6', DESCRIPCION: 'RESONANCIA NUCLEAR' },
            { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
        ]
    } else {
        SER169.SERVICIOS = [
            { COD: '0', DESCRIPCION: 'DROGUERIA' },
            { COD: '1', DESCRIPCION: 'CIRUGIAS' },
            { COD: '2', DESCRIPCION: 'LAB. Y OTROS DIAG.' },
            { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
            { COD: '4', DESCRIPCION: 'OTROS SERVICIOS' },
            { COD: '5', DESCRIPCION: 'CONSULTAS Y TERAPIAS' },
            { COD: '6', DESCRIPCION: 'PATOLOGIA' },
            { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
        ]
    }

    obtenerDatosCompletos({
        nombreFd: 'COSTOS'
    }, function (data) {
        $_COSTOS_169 = data.COSTO;
        $_COSTOS_169.pop();
        _aceptarprefijo_SER169();
        obtenerDatosCompletos({
            nombreFd: 'ENTIDADES'
        }, function (data) {
            $_ENTIDADES_169 = data.ENTIDADES;
            $_ENTIDADES_169.pop();
            obtenerDatosCompletos({
                nombreFd: 'UNSERV'
            }, function (data) {
                $_UNSERV_169 = data.UNSERV;
                $_UNSERV_169.pop();
                obtenerDatosCompletos({
                    nombreFd: 'GRUPO-SER'
                }, function (data) {
                    $_GRUPO_169 = data.CODIGOS;
                    $_GRUPO_169.pop();
                    obtenerDatosCompletos({
                        nombreFd: 'CUPS'
                    }, function (data) {
                        $_CUPS_169 = data.CODIGOS;
                        $_CUPS_169.pop();
                        obtenerDatosCompletos({
                            nombreFd: 'CIUDADES'
                        }, function (data) {
                            $_CIUDAD_169 = data.CIUDAD;
                            $_CIUDAD_169.pop();
                            obtenerDatosCompletos({
                                nombreFd: 'ESPECIALIDAD'
                            }, function (data) {
                                $_ESPECIALIDAD_169 = data.ESPECIALIDADES;
                                $_ESPECIALIDAD_169.pop();
                                obtenerDatosCompletos({
                                    nombreFd: 'PROFESIONALES'
                                }, function (data) {
                                    $_PROFESIONAL_169 = data.ARCHPROF;
                                    $_PROFESIONAL_169.pop()
                                    obtenerDatosCompletos({
                                        nombreFd: 'SUCURSALES'
                                    }, function (data) {
                                        $_SUCUR_169 = data.SUCURSAL;
                                        // $_SUCUR_169.pop();

                                    }
                                        // , 'OFF'
                                    )
                                })
                            })
                        })
                    })
                })
            })
        })
    }
        // , 'ON'
    )
})

//////////////////////////INICIAOPCION//////////////////////////////

function _aceptarprefijo_SER169() {
    validarInputs(
        {
            form: "#ORIGEN_SER169",
            orden: '1'
        },
        _toggleNav,
        () => {
            SER169.PREFIJOORI = $('#origen_169').val().toUpperCase();
            if (SER169.PREFIJOORI != 'C' && SER169.PREFIJOORI != 'E' && SER169.PREFIJOORI != 'Ñ' && SER169.PREFIJOORI != 'U') {
                _aceptarnumeroori_SER169()
            } else {
                CON851('', 'Revise el prefijo digitado', null, 'error', 'Error')
                _aceptarprefijo_SER169()
            }
        }
    )
}

function _aceptarnumeroori_SER169() {
    validarInputs(
        {
            form: "#NUMEROORIG_SER169",
            orden: '1'
        },
        _aceptarprefijo_SER169,
        () => {
            SER169.NUMEROORI = $('#numeroorig_169').val();
            SER169.NUMEROORI = SER169.NUMEROORI.padStart(6, "0");
            $('#numeroorig_169').val(SER169.NUMEROORI);
            if ((SER169.NUMEROORI == '000000') || (SER169.NUMEROORI.trim() == '')) {
                _aceptarnumeroori_SER169();
            } else {
                SER169.LLAVEORIG = SER169.PREFIJOORI + SER169.NUMEROORI;
                let URL = get_url("APP/SALUD/SER808-01.DLL");
                postData({
                    datosh: `${datosEnvio()}${SER169.LLAVEORIG}|8|`,
                }, URL)
                .then(data => {
                    SER169.NITNUMORI = data.NUMER19[0].NIT_NUM;
                    SER169.DESCRIPNUM = data.NUMER19[0].DESCRIP_NUM;
                    SER169.CONVENIONUM = data.NUMER19[0].CONVENIO_NUM;
                    SER169.CONVENIOANT = data.NUMER19[0].CONVENIO_NUM;
                    SER169.DESCRIPTAR = data.NUMER19[0].DESCRIP_TAR;
                    SER169.ESTADONUM = data.NUMER19[0].ESTADO_NUM;
                    SER169.IDPACNUM = data.NUMER19[0].IDPAC_NUM;
                    SER169.DESCRIPPACINUM = data.NUMER19[0].PACIENTE_NUM;
                    SER169.FECHAINGNUM = data.NUMER19[0].FECHA_ING;
                    SER169.ANOINGNUM = SER169.FECHAINGNUM.substring(0, 4);
                    SER169.MESINGNUM = SER169.FECHAINGNUM.substring(4, 6);
                    SER169.DIAINGNUM = SER169.FECHAINGNUM.substring(6, 8);
                    SER169.FECHASALNUM = data.NUMER19[0].FECHA_RET;
                    SER169.HORAINGNUMW = data.NUMER19[0].HORAING_NUM;
                    SER169.HORARETNUMW = data.NUMER19[0].HORARET_NUM;
                    $('#descriporig_169').val(SER169.DESCRIPNUM);
                    $('#tarifaorig_169').val(SER169.CONVENIONUM + SER169.DESCRIPTAR);
                    if (data.NUMER19[0].CUFEELEC_NUM.trim() != '')  {
                        CON851('R9', 'R9', null, 'error', 'error');
                        return _aceptarnumeroori_SER169();
                    }
                    _validacionesorigen_SER169();
                })
                .catch(error => {
                    console.error(error);
                    if (error.MENSAJE == '01' && localStorage.Usuario == 'GEBC')    {
                        return _validacionesorigen_SER169()
                    }
                    _aceptarnumeroori_SER169();
                })
            }
        }
    )
}

function _validacionesorigen_SER169() {
    if (localStorage.Usuario == 'GEBC') {
        SER169.ANOINI = SER169.ANOINGNUM;
        SER169.MESINI = SER169.MESINGNUM;
        SER169.DIAINI = SER169.DIAINGNUM;
        SER169.ANOFIN = SER169.ANOLNK;
        SER169.MESFIN = SER169.MESLNK;
        SER169.DIAFIN = SER169.DIALNK;
        _aceptarcosto_SER169();
    } else {
        if ((SER169.ESTADONUM == '0') || (SER169.ESTADONUM == '3')) {
            SER169.ANOINI = SER169.ANOINGNUM;
            SER169.MESINI = SER169.MESINGNUM;
            SER169.DIAINI = SER169.DIAINGNUM;
            SER169.ANOFIN = SER169.ANOLNK;
            SER169.MESFIN = SER169.MESLNK;
            SER169.DIAFIN = SER169.DIALNK;
            _aceptarcosto_SER169();
        } else {
            CON851('70', '70', null, 'error', 'error');
            _aceptarnumeroori_SER169();
        }
    }
}

function _aceptarcosto_SER169() {
    if (SER169.COSTOW.trim() == '') {
        $('#costo_169').val('****');
    }
    validarInputs(
        {
            form: "#COSTO_SER169",
            orden: '1'
        },
        _aceptarnumeroori_SER169,
        () => {
            SER169.COSTOW = $('#costo_169').val();
            if (SER169.COSTOW == '****') {
                $('#descripcosto_169').val('TODOS LOS C.COSTO');
                _prefijodestino_SER169();
            } else {
                SolicitarDll({ datosh: datosEnvio() + SER169.COSTOW + '|' }, dato => {
                    dato = dato.split("|");
                    $_DESCRIPCOSTOS = dato[1].trim();
                    if (dato[0].trim() == '00') {
                        $('#descripcosto_169').val($_DESCRIPCOSTOS);
                        _prefijodestino_SER169();
                    } else if (dato[0].trim() == '01') {
                        CON851('08', '08', null, 'error', 'error');
                        _aceptarcosto_SER169();
                    } else {
                        CON852(dato[0], dato[1], dato[2], _aceptarcosto_SER169)
                    }
                }, get_url('APP/SALUD/SER108-10.DLL'));
            }
        }
    )
}

function _prefijodestino_SER169() {
    validarInputs(
        {
            form: "#DESTINO_SER169",
            orden: '1'
        },
        _aceptarcosto_SER169,
        () => {
            SER169.PREFIJODES = $('#destino_169').val();
            if (SER169.PREFIJODES != 'C' && SER169.PREFIJODES != 'E' && SER169.PREFIJODES != 'Ñ' && SER169.PREFIJODES != 'U') {
                _aceptarnumerodest_SER169()
            } else {
                _prefijodestino_SER169();
            }
        }
    )
}

function _aceptarnumerodest_SER169() {
    validarInputs(
        {
            form: "#NUMERODEST_SER169",
            orden: '1'
        },
        _prefijodestino_SER169,
        () => {
            SER169.NUMERODES = $('#numerodest_169').val();
            SER169.NUMERODES = SER169.NUMERODES.padStart(6, "0");
            $('#numerodest_169').val(SER169.NUMERODES);
            if ((SER169.NUMERODES == '000000') || (SER169.NUMERODES.trim() == '')) {
                _aceptarnumerodest_SER169();
            } else {
                SER169.LLAVEDES = SER169.PREFIJODES + SER169.NUMERODES;
                let URL = get_url("APP/SALUD/SER808-01.DLL");
                postData({
                    datosh: `${datosEnvio()}${SER169.LLAVEDES}|8|`,
                }, URL)
                .then(data => {
                    SER169.NITNUMDES = data.NUMER19[0].NIT_NUM;
                    SER169.DESCRIPNUM2 = data.NUMER19[0].DESCRIP_NUM;
                    SER169.CONVENIONUM2 = data.NUMER19[0].CONVENIO_NUM;
                    SER169.DESCRIPTAR2 = data.NUMER19[0].DESCRIP_TAR;
                    SER169.ESTADONUM2 = data.NUMER19[0].ESTADO_NUM;
                    SER169.FECHAINGNUM2 = data.NUMER19[0].FECHA_ING;
                    SER169.ANOINGNUM2 = SER169.FECHAINGNUM2.substring(0, 4);
                    SER169.MESINGNUM2 = SER169.FECHAINGNUM2.substring(4, 6);
                    SER169.DIAINGNUM2 = SER169.FECHAINGNUM2.substring(6, 8);
                    SER169.FECHASALNUM2 = data.NUMER19[0].FECHA_RET;
                    if (data.NUMER19[0].CUFEELEC_NUM.trim() != '')  {
                        CON851('R9', 'R9', null, 'error', 'error');
                        return _aceptarnumeroori_SER169();
                    }
                    $('#descripdest_169').val(SER169.DESCRIPNUM2);
                    $('#tarifadest_169').val(SER169.CONVENIONUM2 + '-' + SER169.DESCRIPTAR2);
                    if ((SER169.ESTADONUM2 == '0') || (SER169.ESTADONUM2 == '3')) {
                        if (SER169.CONVENIONUM2 != SER169.CONVENIOANT) {
                            CON851('5S', '5S', null, 'error', 'error');
                        }
                        _datoanoini_SER169();
                    } else {
                        CON851('70', '70', null, 'error', 'error');
                        _aceptarnumerodest_SER169();
                    }
                })
                .catch(error => {
                    console.error(error);
                    _aceptarnumerodest_SER169();
                })
            }
        }
    )
}

function _datoanoini_SER169() {
    $('#anodes_169').val(SER169.ANOINI);
    validarInputs(
        {
            form: "#ANODES_SER169",
            orden: '1'
        },
        _aceptarnumerodest_SER169,
        () => {
            SER169.ANOINI = $('#anodes_169').val().padStart(4, '0');
            if (SER169.ANOINI.trim() == '0000') {
                _datoanoini_SER169();
            } else {
                _datomesini_SER169();
            }
        }
    )
}

function _datomesini_SER169() {
    $('#mesdes_169').val(SER169.MESINI);
    validarInputs(
        {
            form: "#MESDES_SER169",
            orden: '1'
        },
        _datoanoini_SER169,
        () => {
            SER169.MESINI = $('#mesdes_169').val().padStart(2, '0');
            if (SER169.MESINI.trim() == '00') {
                _datomesini_SER169();
            } else if ((SER169.MESINI < 01) || (SER169.MESINI > 12)) {
                _datomesini_SER169();
            } else {
                _datodiaini_SER169();
            }
        }
    )
}

function _datodiaini_SER169() {
    $('#diades_169').val(SER169.DIAINI);
    validarInputs(
        {
            form: "#DIADES_SER169",
            orden: '1'
        },
        _datomesini_SER169,
        () => {
            SER169.DIAINI = $('#diades_169').val().padStart(2, '0');
            if (SER169.DIAINI.trim() == '00') {
                _datodiaini_SER169();
            } else if ((SER169.DIAINI < 01) || (SER169.DIAINI > 31)) {
                _datodiaini_SER169();
            } else {
                SER169.FECHAINIW = SER169.ANOINI + SER169.MESINI + SER169.DIAINI
                _datoanofin_SER169();
            }
        }
    )
}

function _datoanofin_SER169() {
    $('#anohasta_169').val(SER169.ANOFIN);
    validarInputs(
        {
            form: "#ANOHASTA_SER169",
            orden: '1'
        },
        _datodiaini_SER169,
        () => {
            SER169.ANOFIN = $('#anohasta_169').val().padStart(4, '0');
            if (SER169.ANOFIN.trim() == '0000') {
                _datoanofin_SER169();
            } else {
                _datomesfin_SER169();
            }
        }
    )
}

function _datomesfin_SER169() {
    $('#meshasta_169').val(SER169.MESFIN);
    validarInputs(
        {
            form: "#MESHASTA_SER169",
            orden: '1'
        },
        _datoanofin_SER169,
        () => {
            SER169.MESFIN = $('#meshasta_169').val().padStart(2, '0');
            if (SER169.MESFIN.trim() == '00') {
                _datomesfin_SER169();
            } else if ((SER169.MESFIN < 01) || (SER169.MESFIN > 12)) {
                _datomesfin_SER169();
            } else {
                _datodiafin_SER169();
            }
        }
    )
}
function _datodiafin_SER169() {
    $('#diahasta_169').val(SER169.DIAFIN);
    validarInputs(
        {
            form: "#DIAHASTA_SER169",
            orden: '1'
        },
        () => { _datomesfin_SER169(); },
        () => {
            SER169.DIAFIN = $('#diahasta_169').val().padStart(2, '0');
            if (SER169.DIAFIN.trim() == '00') {
                _datodiafin_SER169();
            } else if ((SER169.DIAFIN < 01) || (SER169.DIAFIN > 31)) {
                _datodiafin_SER169();
            } else {
                SER169.FECHAFINW = SER169.ANOFIN + SER169.MESFIN + SER169.DIAFIN
                SER169.SUCURSALW = '';
                SER169.PACIW = '';
                _datosucursal_SER169();
            }
        }
    )
}

function _datosucursal_SER169() {
    if (SER169.SUCURSALW.trim() == '') {
        $('#sucursal_169').val('**');
    }
    validarInputs(
        {
            form: "#SUCURSAL_SER169",
            orden: '1'
        },
        _datomesfin_SER169,
        () => {
            SER169.SUCURSALW = $('#sucursal_169').val();
            if (SER169.SUCURSALW == '**') {
                $('#sucursal_169').val(SER169.SUCURSALW + ' - ' + 'TODAS LAS SUCURSALES');
                _datopaciente_SER169();
            } else {
                busquedasucursal169 = buscarDescrip_sucur169(SER169.SUCURSALW)
                switch (busquedasucursal169) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _datosucursal_SER169();
                        break;
                    default:
                        SER169.DESCRIPSUCUR = busquedasucursal169.DESCRIPCION.trim();
                        $('#sucursal_169').val(SER169.SUCURSALW + ' - ' + SER169.DESCRIPSUCUR);
                        _datopaciente_SER169();
                        break;
                }
            }
        }
    )
}

function buscarDescrip_sucur169(data) {
    var retornar = false;
    for (var i in $_SUCUR_169) {
        if ($_SUCUR_169[i].CODIGO.trim() == data) {
            retornar = $_SUCUR_169[i];
            break;
        }
    }
    return retornar;
}

function _datopaciente_SER169() {
    if (SER169.PACIW.trim() == '') {
        $('#paciente_169').val('99');
    }
    validarInputs(
        {
            form: "#PACIENTE_SER169",
            orden: '1'
        },
        _datodiafin_SER169,
        () => {
            SER169.PACIW = $('#paciente_169').val();
            SER169.PACIW = SER169.PACIW.padStart(15, "0");
            SER169.CLFACT = '';
            if (SER169.PACIW == '000000000000099') {
                $('#descrippaci_169').val('TODOS LOS PACIENTES');
                _datotipo_SER169();
            } else {
                SolicitarDll({ datosh: datosEnvio() + SER169.PACIW + '|' }, dato => {
                    dato = dato.split("|");
                    $_DESCRIPPACIW = dato[4].trim();
                    if (dato[0].trim() == '00') {
                        $('#descrippaci_169').val($_DESCRIPPACIW);
                        _datotipo_SER169();
                    } else if (dato[0].trim() == '01') {
                        CON851('01', '01', null, 'error', 'error');
                        _datopaciente_SER169();
                    } else {
                        CON852(dato[0], dato[1], dato[2], _datopaciente_SER169)
                    }
                }, get_url('APP/SALUD/SER108-07.DLL'));
            }
        }
    )
}

function _datotipo_SER169() {
    if (SER169.CLFACT.trim() == '') {
        $("#tipocomp_169").val('*');
    }
    validarInputs(
        {
            form: "#TIPOCOMP_SER169",
            orden: '1'
        },
        _datopaciente_SER169,
        () => {
            SER169.CLFACT = $("#tipocomp_169").val();
            if (SER169.CLFACT == '*') {
                $('#tipocomp_169').val(SER169.CLFACT);
                $('#descriptipocomp_169').val('TODOS LOS TIPOS');
                _contratopaci_SER169();
            } else if ((SER169.CLFACT > 0) && (SER169.CLFACT < 8)) {
                for (var i in SER169.SERVICIOS) {
                    if (SER169.CLFACT == SER169.SERVICIOS[i].COD) {
                        $('#tipocomp_169').val(SER169.SERVICIOS[i].COD);
                        $('#descriptipocomp_169').val(SER169.SERVICIOS[i].DESCRIPCION);
                        _contratopaci_SER169();
                    }
                }
            } else {
                CON851('03', '03', null, 'error', 'error');
                _datotipo_SER169();
            }
        }
    )
}

function _contratopaci_SER169() {
    validarInputs(
        {
            form: "#CONTRATO_SER169",
            orden: '1'
        },
        _datotipo_SER169,
        () => {
            SER169.CONTRATOW = $('#contrato_169').val();
            SER169.EPSW = '';
            _datoentidad_SER169();
        }
    )
}
function _datoentidad_SER169() {
    if (SER169.EPSW.trim() == '') {
        SER169.EPSW = '******';
        $('#eps_169').val(SER169.EPSW);
    }
    validarInputs(
        {
            form: "#EPS_SER169",
            orden: '1'
        },
        () => { _contratopaci_SER169(); },
        () => {
            SER169.EPSW = $('#eps_169').val();
            SER169.UNSERVW = '';
            if (SER169.EPSW == '******') {
                $('#descripeps_169').val('TODAS LAS ENTIDADES');
                _datounidad_SER169();
            } else if (SER169.EPSW.trim() == '') {
                $('#descripeps_169').val(' ');
                _datounidad_SER169();
            } else {
                let datos_envio = datosEnvio() + SER169.EPSW + '|';
                SolicitarDll({ datosh: datos_envio }, dato => {
                    var date = dato.split("|");
                    var SWINVALID = date[0];
                    SER169.DESCRIPEPS = date[1].trim();
                    if (SWINVALID == '00') {
                        $('#descripeps_169').val(SER169.DESCRIPEPS);
                        _datounidad_SER169();
                    } else if (SWINVALID == '01') {
                        CON851('01', '01', null, 'error', 'error');
                        _datoentidad_SER169();
                    }
                }, get_url('APP/SALUD/SER110C_08.DLL'));
            }
        }
    )
}

function _datounidad_SER169() {
    if (SER169.UNSERVW.trim() == '') {
        SER169.UNSERVW = '**';
        $('#unidadserv_169').val(SER169.UNSERVW);
    }
    validarInputs(
        {
            form: "#UNIDADSERV_SER169",
            orden: '1'
        },
        () => { _datoentidad_SER169(); },
        () => {
            SER169.UNSERVW = $('#unidadserv_169').val();
            SER169.OPERADOR = '';
            if (SER169.UNSERVW == '**') {
                $('#descunidadserv_169').val('TODAS LAS UNIDADES');
                _aceptaroperador_SER169();
            } else {
                busquedaunidadser = buscarDescrip_undserv(SER169.UNSERVW);
                switch (busquedaunidadser) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _datounidad_SER169()
                    default:
                        SER169.DESCRIPUNSERVW = busquedaunidadser.DESCRIP.trim();
                        $('#descunidadserv_169').val(SER169.DESCRIPUNSERVW);
                        _aceptaroperador_SER169();
                        break;
                }
            }
        }
    )
}

function buscarDescrip_undserv(data) {
    var retornar = false;
    for (var i in $_UNSERV_169) {
        if ($_UNSERV_169[i].COD.trim() == data) {
            retornar = $_UNSERV_169[i];
            break;
        }
    }
    return retornar;
}

function _aceptaroperador_SER169() {
    if (SER169.OPERADOR.trim() == '') {
        SER169.OPERADOR = '****';
        $('#operador_169').val(SER169.OPERADOR);
    }
    validarInputs(
        {
            form: "#OPERADOR_SER169",
            orden: '1'
        },
        () => { _datounidad_SER169(); },
        () => {
            SER169.OPERADOR = $('#operador_169').val();
            SER169.CONTAW = 0;
            if (SER169.OPERADOR.trim() == '') {
                CON851('01', '01', null, 'error', 'error');
                _aceptaroperador_SER169()
            } else if (SER169.OPERADOR == "****") {
                $('#descripoperador_169').val('TODOS LOS OPERADORES');
                _cantidadcomp_SER169();
            } else {
                let URL = get_url("app/CONTAB/CON003.DLL");
                postData({
                    datosh: datosEnvio() + SER169.OPERADOR + '|'
                }, URL)
                    .then((data) => {
                        data = data.split('|');
                        SER169.NOMBREOPER = data[0].trim();
                        if (SER169.NOMBREOPER.trim() == '') {
                            CON851('01', '01', null, 'error', 'error');
                            _aceptaroperador_SER169()
                        } else {
                            $('#descripoperador_169').val(SER169.NOMBREOPER);
                            _cantidadcomp_SER169();
                        }
                    }).catch(error => {
                        console.error(error)
                        _toggleNav()
                    });
            }
        }
    )
}

function _cantidadcomp_SER169() {
    if ((SER169.CONTAW == 0) || (SER169.CONTAW > 5000)) {
        SER169.CONTAW = '9999';
        $('#cantcomp_169').val(SER169.CONTAW);
    }
    validarInputs(
        {
            form: "#CANTCOMP_SER169",
            orden: '1'
        },
        () => { _aceptaroperador_SER169(); },
        () => {
            SER169.CONTAW = $('#cantcomp_169').val();
            SER169.GRUPOW = '';
            if (SER169.CONTAW.trim() == '') {
                CON851('02', '02', null, 'error', 'error');
                _cantidadcomp_SER169();
            } else if (SER169.CONTAW > 5000 && SER169.CONTAW < 9999) {
                CON851('03', '03', null, 'error', 'error');
                _datoentidad_SER169();
            } else {
                _datagrupo_SER169();
            }
        }
    )
}

function _datagrupo_SER169() {
    if (SER169.GRUPOW.trim() == '') {
        SER169.GRUPOW = '**';
        $('#gruposerv_169').val(SER169.GRUPOW)
    }
    validarInputs(
        {
            form: "#GRUPOSERV_SER169",
            orden: '1'
        },
        () => { _cantidadcomp_SER169(); },
        () => {
            SER169.GRUPOW = $('#gruposerv_169').val();
            SER169.CODCUPSW = '';
            SER169.CIUDADW = '';
            if (SER169.GRUPOW == '**') {
                $('#descripcups_169').val('TODOS LOS GRUPOS');
                _datociudad_SER169();
            } else {
                if (SER169.UNSERVW == '0') {
                    switch (SER169.GRUPOW) {
                        case 'PO':
                            $('#descripcups_71G').val("MEDICAMENTOS POS");
                            _datocups_SER169()
                            break;
                        case 'NP':
                            $('#descripcups_71G').val("MEDICAMENTOS NOPOS");
                            _datocups_SER169()
                            break;
                        case 'MQ':
                            $('#descripcups_71G').val("MEDICOQUIRURGICOS ");
                            _datocups_SER169()
                            break;
                        case 'MO':
                            $('#descripcups_71G').val("MATERIAL DE OSTEOS");
                            _datocups_SER169()
                            break;
                        default:
                            CON851('03', '03', null, 'error', 'error');
                            _datocups_SER169();
                            break;
                    }
                } else {
                    if (SER169.GRUPOW.trim() == '') {
                        CON851('01', '01', null, 'error', 'error');
                        _datagrupo_SER169();
                    } else {
                        busquedagrupos169 = buscarDescrip_grupos169(SER169.GRUPOW)
                        switch (busquedagrupos169) {
                            case false:
                                CON851('01', '01', null, 'error', 'error');
                                _datagrupo_SER169();
                                break;
                            default:
                                SER169.DESCRIPGRUPO = busquedagrupos169.DESCRIP.trim();
                                $('#descripcups_169').val(SER169.DESCRIPGRUPO);
                                filtrocups = $_CUPS_169.filter(clase => (clase.GRUPO == SER169.GRUPOW))
                                _datocups_SER169();
                                break;
                        }

                    }
                }
            }
        }
    )
}

function buscarDescrip_grupos169(data) {
    var retornar = false;
    for (var i in $_GRUPO_169) {
        if ($_GRUPO_169[i].COD.trim() == data) {
            retornar = $_GRUPO_169[i];
            break;
        }
    }
    return retornar;
}

function _datocups_SER169() {

    if (SER169.CODCUPSW.trim() == '') {
        SER169.CODCUPSW = '*';
        $('#cups_169').val(SER169.CODCUPSW);
    }
    validarInputs(
        {
            form: "#CUPS_SER169",
            orden: '1'
        },
        () => { _datagrupo_SER169(); },
        () => {
            SER169.CODCUPSW = $('#cups_169').val();

            if (SER169.CODCUPSW.trim() == '') {
                _datociudad_SER169();
            } else {
                SER169.LLAVECUP = SER169.GRUPOW + SER169.CODCUPSW;
                buscaquedacups = buscarDescrip_cups169(SER169.LLAVECUP);
                switch (buscaquedacups) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _datocups_SER169();
                        break;
                    default:
                        SER169.DESCRIPCUP = buscaquedacups.DESCRIP.trim()
                        $('#descripcups_71G').val(SER169.DESCRIPCUP);
                        _datociudad_SER169();
                        break;
                }
            }
        }
    )
}

function buscarDescrip_cups169(data) {
    var retornar = false;
    for (var i in filtrocups) {
        if (filtrocups[i].LLAVE.trim() == data) {
            retornar = filtrocups[i];
            break;
        }
    }
    return retornar;
}

function _datociudad_SER169() {
    if (SER169.CIUDADW.trim() == '') {
        SER169.CIUDADW = '99999';
        $('#ciudadpac_169').val(SER169.CIUDADW);
    }
    validarInputs(
        {
            form: "#CIUDADPAC_SER169",
            orden: '1'
        },
        () => { _datagrupo_SER169(); },
        () => {
            SER169.CIUDADW = $('#ciudadpac_169').val();
            SER169.MEDW = '';
            if (SER169.CIUDADW == '99999') {
                SER169.NOMBRECIU = 'TODOS LAS CIUDADES';
                $('#descripciudadpac_169').val(SER169.NOMBRECIU);
                _datomedico_SER169();
            } else if (SER169.CIUDADW.trim() == '') {
                SER169.NOMBRECIU = ' ';
                $('#descripciudadpac_169').val(SER169.NOMBRECIU);
                _datomedico_SER169();
            } else {
                buscaquedaciudad169 = buscarDescrip_ciudad169(SER169.CIUDADW);
                switch (buscaquedaciudad169) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _datocups_SER169();
                        break;
                    default:
                        SER169.NOMBRECIU = buscaquedaciudad169.NOMBRE.trim()
                        $('#descripciudadpac_169').val(SER169.NOMBRECIU);
                        _datomedico_SER169();
                        break;
                }
            }
        }
    )
}

function buscarDescrip_ciudad169(data) {
    var retornar = false;
    for (var i in $_CIUDAD_169) {
        if ($_CIUDAD_169[i].COD.trim() == data) {
            retornar = $_CIUDAD_169[i];
            break;
        }
    }
    return retornar;
}

function _datomedico_SER169() {
    if (SER169.MEDW.trim() == '') {
        SER169.MEDW = '99';
        $('#personal_169').val(SER169.MEDW);
    }
    validarInputs(
        {
            form: "#PERSONAL_SER169",
            orden: '1'
        },
        () => { _datociudad_SER169(); },
        () => {
            SER169.MEDW = $('#personal_169').val();
            SER169.SWPERMI = '';
            if (SER169.MEDW == '0') {
                CON851('02', '02', null, 'error', 'error');
                _datomedico_SER169();
            } else if (SER169.MEDW == '99') {
                SER169.DESCRIPMEDW = 'TODOS LAS PERSONAS QUE ATIENDEN';
                $('#descrippersonal_169').val(SER169.DESCRIPMEDW);
                _datotraslados_SER169();
            } else {
                SER169.MEDW = SER169.MEDW.padStart(10, '0');
                $("#personal_169").val(SER169.MEDW);
                let datos_envio = datosEnvio() + SER169.MEDW + '|';
                SolicitarDll({ datosh: datos_envio }, dato => {
                    var date = dato.split("|");
                    var swinvalid = date[0].trim();
                    SER169.DESCRIPMEDW = date[1].trim();
                    $('#descrippersonal_169').val(SER169.DESCRIPMEDW);
                    if (swinvalid == '00') {
                        _datotraslados_SER169();
                    } else if (swinvalid == '01') {
                        CON851('01', '01', null, 'error', 'error');
                        _datomedico_SER169();
                    }
                }, get_url('APP/SALUD/SER110C_12.DLL'));
            }
        }
    )
}

function _datotraslados_SER169() {
    if (SER169.SWPERMI.trim() == '') {
        SER169.SWPERMI = 'N';
        $('#trasladohoy_169').val(SER169.SWPERMI);
    }
    validarInputs(
        {
            form: "#TRASLADOHOY_SER169",
            orden: '1'
        },
        () => { _datomedico_SER169(); },
        () => {
            SER169.SWPERMI = $('#trasladohoy_169').val();
            SER169.SWCIS = '';
            SER169.ESPECIW = '';
            if (SER169.SWPERMI.trim() == '') {
                _datotraslados_SER169()
            } else if ((SER169.SWPERMI == 'S') || (SER169.SWPERMI == 'N')) {
                if (SER169.NITUSU == 900405505) {
                    _datocis_SER169();
                } else {
                    _aceptarespecialidad_SER169();
                }
            } else {
                _datotraslados_SER169();
            }
        }
    )
}

function _datocis_SER169() {
    if (SER169.SWCIS.trim() == '') {
        SER169.SWCIS = 'N';
        $('#cis_169').val(SER169.SWCIS);
    }
    validarInputs(
        {
            form: "#CIS_SER169",
            orden: '1'
        },
        () => { _datotraslados_SER169(); },
        () => {
            SER169.SWCIS = $('#cis_169').val();

            if (SER169.SWCIS.trim() == '') {
                _datocis_SER169();
            } else if ((SER169.SWCIS == 'S') || (SER169.SWCIS == 'N')) {
                _aceptarespecialidad_SER169();
            } else {
                _datocis_SER169();
            }
        }
    )
}

function _aceptarespecialidad_SER169() {
    if (SER169.ESPECIW.trim() == '') {
        SER169.ESPECIW = '***';
        $('#especialidad_169').val(SER169.ESPECIW);

    }
    validarInputs(
        {
            form: "#ESPECIALIDAD_SER169",
            orden: '1'
        },
        () => {
            if (SER169.NITUSU == 900405505) {
                _datocis_SER169();
            } else {
                _datotraslados_SER169();
            }
        },
        () => {
            SER169.ESPECIW = $('#especialidad_169').val();

            if (SER169.ESPECIW == '***') {
                SER169.NOMBESPEC = 'TODAS LAS ESPECIALIDADES';
                $('#descripespecialidad_169').val(SER169.NOMBESPEC);
                setTimeout(_tipopaciente_SER169, 300);
            } else {
                buscaquedaespec169 = buscarDescrip_espec169(SER169.ESPECIW);
                switch (buscaquedaespec169) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _aceptarespecialidad_SER169();
                        break;
                    default:
                        SER169.NOMBESPEC = buscaquedaespec169.NOMBRE.trim()
                        $('#descripespecialidad_169').val(SER169.NOMBESPEC);
                        setTimeout(_tipopaciente_SER169, 300);
                        break;
                }
            }
        }
    )
}

function buscarDescrip_espec169(data) {
    var retornar = false;
    for (var i in $_ESPECIALIDAD_169) {
        if ($_ESPECIALIDAD_169[i].CODIGO.trim() == data) {
            retornar = $_ESPECIALIDAD_169[i];
            break;
        }
    }
    return retornar;
}

function _tipopaciente_SER169() {

    var regimen169 = [
        { "COD": "C", "DESCRIP": "CONTRIBUTIVO" },
        { "COD": "S", "DESCRIP": "SUBSIDIADO" },
        { "COD": "V", "DESCRIP": "VINCULADO" },
        { "COD": "P", "DESCRIP": "PARTICULAR" },
        { "COD": "O", "DESCRIP": "OTRO TIPO" },
        { "COD": "D", "DESCRIP": "DESPLAZ CONT" },
        { "COD": "E", "DESCRIP": "DESPLAZ SUBS" },
        { "COD": "G", "DESCRIP": "DESPLAZ VINC" },
        { "COD": "*", "DESCRIP": "TODOS       " }
    ]
    POPUP(
        {
            array: regimen169,
            titulo: 'TIPO USUARIO',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            callback_f: _aceptarespecialidad_SER169,
            teclaAlterna: true
        },
        regimen169 => {
            SER169.ANTEW = '';
            SER169.REGIMENW = regimen169.COD
            $("#regimen_169").val(regimen169.COD + " - " + regimen169.DESCRIP);
            setTimeout(_opcionfecha_SER169, 300);
        },
    );
}

function _opcionfecha_SER169() {
    if (SER169.ANTEW.trim() == '') {
        SER169.ANTEW = 'N';
        $('#incluirfech_169').val(SER169.ANTEW);
    }
    validarInputs(
        {
            form: "#INCLUIRFECH_SER169",
            orden: '1'
        },
        () => { _tipopaciente_SER169(); },
        () => {
            SER169.ANTEW = $('#incluirfech_169').val();
            if (SER169.ANTEW.trim() == '') {
                _opcionfecha_SER169();
            } else if ((SER169.ANTEW == 'S') || (SER169.ANTEW == 'N')) {
                if (SER169.ANTEW == 'S') {
                    SER169.SWCEROW = '';
                    $('#RELIQUIDA_SER169').removeClass('hidden');
                    _comprobantesfecha_SER169();
                } else {
                    CON851P('04', _datoentidad_SER169, _grabaropcion_SER169)
                }

            } else {
                _opcionfecha_SER169();
            }
        }
    )
}

function _comprobantesfecha_SER169() {
    if (SER169.SWCEROW) {
        $('#reliquida_169').val('N');
    }
    validarInputs(
        {
            form: "#RELIQUIDA_SER169",
            orden: '1'
        },
        () => { _opcionfecha_SER169(); },
        () => {
            SER169.SWCEROW = $('#reliquida_169').val();
            if (SER169.SWCEROW.trim() == '') {
                _comprobantesfecha_SER169();
            } else if ((SER169.SWCEROW == 'S') || (SER169.SWCEROW == 'N')) {
                CON851P('04', _datoentidad_SER169, _grabaropcion_SER169)
            } else {
                _comprobantesfecha_SER169();
            }
        }
    )
}

function _grabaropcion_SER169() {
    let URL = get_url("app/SALUD/SER169.DLL");
    postData({
        datosh: datosEnvio() + SER169.LLAVEORIG + '|' + SER169.LLAVEDES + '|' + SER169.CLFACT + '|' +
            SER169.EPSW + '|' + SER169.PACIW + '|' + SER169.COSTOW + '|' + SER169.UNSERVW + '|' +
            SER169.OPERADOR + '|' + SER169.CONTAW + '|' + SER169.SWPERMI + '|' + SER169.MEDW + '|' +
            SER169.NITNUMDES + '|' + SER169.SWCIS + '|' + SER169.REGIMENW + '|' + SER169.CONTRATOW + '|' +
            SER169.ESPECIW + '|' + SER169.GRUPOW + '|' + SER169.CIUDADW + '|' + SER169.SUCURSALW + '|' + 
            SER169.FECHAINIW + '|' + SER169.FECHAFINW + '|'
    }, URL)
        .then((data) => {
            console.log(data, 'SER169')
            SER169.SWARCH = '1';
            SER169.SWAPRVR = '';
            if ((SER169.CONVENIONUM2 != SER169.CONVENIOANT) && (SER169.CONVENIOANT.trim() != '')) {
                let URL = get_url("app/SALUD/SER612A.DLL");
                postData({
                    datosh: datosEnvio() + SER169.LLAVEDES + '|' + '*' + '|' + SER169.SWARCH + '|' + SER169.ANTEW + '|' + SER169.SWAPRVR + '|' + SER169.SWCEROW + '|'
                }, URL)
                    .then((data) => {
                        console.log(data, 'SER612A')
                        _toggleNav();
                        CON851('', 'Proceso Terminado!', null, 'success', 'EXITO');
                    }).catch(error => {
                        console.error(error)
                        _opcionfecha_SER169()
                    });
            } else {
                CON851('', 'Proceso Terminado!', null, 'success', 'EXITO');
                _toggleNav();
            }

        }).catch(error => {
            console.error(error)
            _opcionfecha_SER169()
        });
}

//////////////VENTANAS DE F8//////////////////////

function _ventanaFacturacion_ser169(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'NUMERACION',
            valoresselect: ['Nombre del tercero', 'buscar paciente'],
            f8data: 'NUMERACION',
            columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
            callback: (data) => {
                $_NROW = data.COD;
                $_NROW = $_NROW.substring(1, 7)
                $('#numeroorig_169').val($_NROW);
                _enterInput('#numeroorig_169');
            },
            cancel: () => {
                _enterInput('#numeroorig_169');
            }
        };
        F8LITE(parametros);
    }
}

function _ventanaCostos_ser169(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
            columnas: ["COD", "NOMBRE"],
            data: $_COSTOS_169,
            callback_esc: function () {
                $("#costo_169").focus();
            },
            callback: function (data) {
                $('#costo_169').val(data.COD.trim())
                _enterInput('#costo_169');
            }
        });
    }
}

function _ventanaclaseservicio_ser169(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE SERVICIO",
            columnas: ["COD", "DESCRIPCION"],
            data: SER169.SERVICIOS,
            callback_esc: function () {
                $("#tipocomp_169").focus();
            },
            callback: function (data) {
                $("#tipocomp_169").val(data.COD);
                // claseservMask169.typedValue = data.COD;
                _enterInput('#tipocomp_169');
            }
        });
    }
}

function _ventanaeps_ser169(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE ENTIDADES',
            columnas: ["COD-ENT", "NOMBRE-ENT", "NIT-ENT"],
            // label: ["codigo", "nombre"],
            data: $_ENTIDADES_169,
            callback_esc: function () {
                $("#eps_169").focus();
            },
            callback: function (data) {
                document.getElementById('eps_169').value = data["COD-ENT"];
                // document.getElementById('epsd_110c').value = data['NOMBRE-ENT'];
                _enterInput('#eps_169');
            }
        });
    }
}

function _ventanaunidadserv_ser169(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE UNIDADES DE SERVICIO",
            columnas: ["COD", "DESCRIP"],
            data: $_UNSERV_169,
            callback_esc: function () {
                $("#unidadserv_169").focus();
            },
            callback: function (data) {
                $('#unidadserv_169').val(data.COD.trim())
                // $('#descrgrp_103').val(data.DESCRIP.trim())
                _enterInput('#unidadserv_169');
            }
        });
    }
}


function _ventanagruposer_ser169(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE GRUPOS DE SERVICIOS",
            columnas: ["COD", "DESCRIP"],
            data: $_GRUPO_169,
            callback_esc: function () {
                $("#gruposerv_169").focus();
            },
            callback: function (data) {
                $('#gruposerv_169').val(data.COD.trim())
                _enterInput('#gruposerv_169');
            }
        });
    }
}

function _ventanacups_ser169(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CODIGOS CUPS",
            columnas: ["LLAVE", "DESCRIP"],
            data: filtrocups,
            callback_esc: function () {
                $("#cups_169").focus();
            },
            callback: function (data) {
                $_LLAVECUPS = data.LLAVE.trim()
                SER169.GRUPO = $_LLAVECUPS.substring(0, 2);
                SER169.CUPS = $_LLAVECUPS.substring(2, 12);
                $('#cups_169').val(SER169.CUPS)
                _enterInput('#cups_169');
            }
        });
    }
}
function _ventanaciudad_ser169(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONSULTA DE CIUDADES",
            columnas: ["COD", "NOMBRE", "NOM_PAIS", "DEPART"],
            data: $_CIUDAD_169,
            callback_esc: function () {
                $("#ciudadpac_169").focus();
            },
            callback: function (data) {
                $('#ciudadpac_169').val(data.COD.trim())
                _enterInput('#ciudadpac_169');
            }
        });
    }
}

function _ventanaPacientes_ser169(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {

        parametros = {
            dll: 'PACIENTES',
            valoresselect: ['Nombre del paciente'],
            f8data: 'PACIENTES',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }],
            callback: (data) => {
                document.querySelector("#paciente_169").value = data.COD;
                // document.querySelector("#idpaciente_108").focus();
                _enterInput('#paciente_169');
            },
            cancel: () => {
                _enterInput('#paciente_169');
                // document.querySelector("#idpaciente_108").focus() 
            }
        };
        F8LITE(parametros);
    }
}

function _ventanaprofesionales_ser169(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE PROFESIONALES',
            data: $_PROFESIONAL_169,
            columnas: ["NOMBRE", "IDENTIFICACION", "ATIENDE_PROF", "LU", "MA", "MI", "JU", "VI", "SA"],
            callback_esc: function () {
                $("#personal_169").focus();
            },
            callback: function (data) {
                $_MEDFAMIPACIW = data.IDENTIFICACION.trim();
                $_MEDFAMIPACIW = $_MEDFAMIPACIW.padStart(10, '0');
                $("#personal_169").val($_MEDFAMIPACIW);
                // $('#descrippersonal_169').val(data.NOMBRE.trim());
                _enterInput('#personal_169');
            }
        });
    }
}
function _ventanaespecialidad_ser169(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE ESPECIALIDADES',
            columnas: ["CODIGO", "NOMBRE"],
            data: $_ESPECIALIDAD_169,
            callback_esc: function () {
                $('#especialidad_169').focus()
            },
            callback: function (data) {
                $('#especialidad_169').val(data.CODIGO)
                // $(idDescp71A).val(data.NOMBRE)
                _enterInput('#especialidad_169')
            }
        });
    }
}