var SER108D = [];
var $_FECHAACTUAL = moment().format('YYYYMMDD');

$(document).ready(function () {
    nombreOpcion('9,7,4,1,2,3 - Clonación de Factura');
    _inputControl('reset');
    _inputControl('disabled');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_DIALNK = $_FECHA_LNK.substring(4, 6);
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    $_NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
    $_PREFIJOUSU = $_USUA_GLOBAL[0].PREFIJ;
    $_CONTADOUSU = $_USUA_GLOBAL[0].CONTADO;
    $_PUCUSU = $_USUA_GLOBAL[0].PUC;
    $_LOTEFARMUSU = $_USUA_GLOBAL[0].LOTE_FAMR;
    $_SALMINUSU = $_USUA_GLOBAL[0].SAL_MIN;
    $_BARRAS_USU = $_USUA_GLOBAL[0].BARRAS;
    $_IVA_USU = $_USUA_GLOBAL[0].IVA1;
    $_IVA_2_USU = $_USUA_GLOBAL[0].IVA2;
    $_IVA_3_USU = $_USUA_GLOBAL[0].IVA3;
    $_CLAVEINVUSU = $_USUA_GLOBAL[0].CLAVE_INV;
    SER108D.HORASISTEMA = moment().format('HHmmss');
    _leerusuario_SER108D();
});


function _leerusuario_SER108D() {
    SER108D.SWINVALID = '49';
    if ($_NITUSU == 800162035) {
        if (($_ADMINW == 'GEBC') || ($_ADMINW == 'ROJ2') || ($_ADMINW == '0101') || ($_ADMINW == 'ADMI')) {
            SER108D.SWINVALID = '00';
            _validacionusuario_SER108D();
        } else {
            _validacionusuario_SER108D();
        }
    } else if (($_NITUSU == 830092718) || ($_NITUSU == 830092719) || ($_NITUSU == 900193162)) {
        $_OPSEGU = 'IS41';
        let datos_envio = datosEnvio()
        datos_envio += $_ADMINW + '|' + $_OPSEGU
        let URL = get_url("APP/CONTAB/CON904.DLL");
        postData({ datosh: datos_envio }, URL)
            .then(function (data) {
                SER108D.SWINVALID = '00';
                _validacionusuario_SER108D();
            })
            .catch(err => {
                console.debug(err);
                SER108D.SWINVALID = '49';
                _validacionusuario_SER108D();
            })
    }else{
        _validacionusuario_SER108D();
    }

}

function _validacionusuario_SER108D() {
    console.log(SER108D.SWINVALID, 'SER108D.SWINVALID');
    if (SER108D.SWINVALID == '49') {
        CON851('49', '49', null, 'error', 'error');
        setTimeout(_toggleNav, 500);
    } else {
        if ($_ANOLNK > 90) {
            SER108D.ANOALFA = $_ANOLNK + 1900;
        } else {
            SER108D.ANOALFA = $_ANOLNK + 2000;
        }
        _dato1_SER108D();
    }
}

function _dato1_SER108D() {
    SER108D.PREFW = 'A';
    $('#prefijo_108D').val(SER108D.PREFW);
    _aceptarnumero_SER108D();
}

function _aceptarprefijo_SER108D() {
    validarInputs(
        {
            form: "#PREFIJO_SER108D",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER108D.PREFW = $('#prefijo_108D').val();
            if ((SER108D.PREFW == 'A') || (SER108D.PREFW == 'P') || (SER108D.PREFW == 'T')) {
                _aceptarnumero_SER108D();
            } else {
                _aceptarprefijo_SER108D();
            }
        }
    )
}

function _aceptarnumero_SER108D() {
    validarInputs(
        {
            form: "#NUMERO_SER108D",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER108D.NROFACT = $('#numero_108D').val();
            SER108D.NROFACT = cerosIzq(SER108D.NROFACT, 6);
            $('#numero_108D').val(SER108D.NROFACT);
            if ((SER108D.NROFACT == 0) || (SER108D.NROFACT.trim() == '')) {
                _aceptarnumero_SER108D();
            } else {
                SER108D.LLAVENUM = SER108D.PREFW + SER108D.NROFACT;
                let datos_envio = datosEnvio() + SER108D.LLAVENUM + '|';
                SolicitarDll({ datosh: datos_envio }, dato => {
                    console.log(dato, 'ARRANCARFACT')
                    var date = dato.split("|");
                    var SWINVALID = date[0];
                    SER108D.NITNUM = date[2].trim();
                    SER108D.DESCRIPNUM = date[3].trim();
                    SER108D.CONVENIONUM = date[4].trim();
                    SER108D.DESCRIPTAR = date[5].trim();
                    SER108D.ESTADONUM = date[6].trim();
                    SER108D.IDPACNUM = date[10].trim();
                    SER108D.DESCRIPPACINUM = date[11].trim();
                    SER108D.FECHAINGNUM = date[15].trim();
                    SER108D.FECHASALNUM = date[16].trim();
                    SER108D.HORAINGNUMW = date[17].trim();
                    SER108D.HORARETNUMW = date[18].trim();
                    if (SWINVALID == '00') {
                        $('#nit_108D').val(SER108D.NITNUM);
                        $('#descripnit_108D').val(SER108D.DESCRIPNUM);
                        $('#convenio_108D').val(SER108D.CONVENIONUM);
                        $('#descripconvenio_108D').val(SER108D.DESCRIPTAR);
                        if (SER108D.ESTADONUM == '0') {
                            $('#estado_108D').val('0 - ACTIVA');
                        } else if (SER108D.ESTADONUM == '1') {
                            $('#estado_108D').val('1 - INACTIVA');
                        } else if (SER108D.ESTADONUM == '2') {
                            $('#estado_108D').val('2 - BLOQUEADA');
                        }
                        $('#idpaci_108D').val(SER108D.IDPACNUM);
                        $('#descrippaci_108D').val(SER108D.DESCRIPPACINUM);
                        $('#fechaing_108D').val(SER108D.FECHAINGNUM);
                        $('#horaing_108D').val(SER108D.HORAINGNUMW);
                        $('#fecharet_108D').val(SER108D.FECHASALNUM);
                        $('#horaret_108D').val(SER108D.HORARETNUMW);
                        _datocantidad_SER108D();


                    } else if (SWINVALID == '01') {
                        CON851('01', '01', null, 'error', 'error');
                        _aceptarnumero_SER108D();
                    }
                }, get_url('APP/SALUD/SER108-01.DLL'));
            }
        }
    )
}

function _datocantidad_SER108D() {
    if (SER108D.ESTADONUM != '0') {
        CON851('13', '13', null, 'error', 'error');
        _aceptarprefijo_SER108D();
    } else {
        validarInputs(
            {
                form: "#CANTIDAD_SER108D",
                orden: '1'
            },
            () => { _aceptarprefijo_SER108D(); },
            () => {
                SER108D.CANTW = $('#cantidad_108D').val();
                if (SER108D.CANTW > 0) {
                    CON851P('04', _toggleNav, _consultadllgrabar_ser108D)
                } else {
                    _datocantidad_SER108D();
                }
            }
        )
    }
}

function _consultadllgrabar_ser108D() {
    
    $_FECHACREAW = moment().format('YYYYMMDD');
    console.log('_consultadllgrabar_ser108D', SER108D.LLAVENUM + '|' + SER108D.CANTW + '|' + $_ADMINW + '|' + $_FECHACREAW)
    let datos_envio = datosEnvio() + SER108D.LLAVENUM + '|' + SER108D.CANTW + '|' + $_ADMINW + '|' + $_FECHACREAW;
    SolicitarDll({ datosh: datos_envio }, dato => {
        console.log(dato, 'GRABAR REGISTRO')
        toastr.success('Se ha guardado', 'EXITO');
        _inputControl('reset');
        _toggleNav();
    }, get_url('APP/SALUD/SER108D.DLL'));

}










