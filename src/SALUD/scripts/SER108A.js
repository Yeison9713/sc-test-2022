/* NOMBRE RM --> SER601 // 15-02-2020- DESARROLLADO: DIANA ESCOBAR */
var SER108A = [];
var $_FECHAACTUAL = moment().format('YYYYMMDD');

$(document).ready(function () {
    nombreOpcion('9,7,4,1,2,1 - Dispersion por combrobante');
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
    SER108A.HORASISTEMA = moment().format('HHmmss');
    _leerusuario_SER108A();
});


function _leerusuario_SER108A() {
    SER108A.SWINVALID = '49';
    switch ($_NITUSU) {
        case 800162035:
            if (($_ADMINW == 'GEBC') || ($_ADMINW == 'ROJ2') ||
                ($_ADMINW == '0101') || ($_ADMINW == 'ADMI')) {
                console.log('empresa prueba')
                SER108A.SWINVALID = '00';
                _validacionusuario_SER108A();
            } else {
                _validacionusuario_SER108A();
            }
            break;
        // CARDIOLOGICA COLOMBIA
        case 900161116:
            console.log('CARDIALOIA')
            SER108A.SWINVALID = '00';
            _validacionusuario_SER108A()
            break;
        // MULTISALUD
        case 830511298:
            console.log('MULTISALUD')
            SER108A.SWINVALID = '00';
            _validacionusuario_SER108A()
            break;
        // ENLACE
        case 900541158:
            console.log('ENLACE')
            SER108A.SWINVALID = '00';
            _validacionusuario_SER108A()
            break;
        // MAVESALUD
        case 900566047:
            console.log('MAVESALUD')
            SER108A.SWINVALID = '00';
            _validacionusuario_SER108A()
            break;
        // MAVHEFARMA    
        case 900658867:
            console.log('MAVHEFARMA')
            SER108A.SWINVALID = '00';
            _validacionusuario_SER108A()
            break;
        case 900019291:
            console.log('OTROS')
            if (($_ADMINW == 'GEBC') || ($_ADMINW == 'NELS') || ($_ADMINW == '0101') ||
                ($_ADMINW == 'ADMI') || ($_ADMINW == 'OCHH') || ($_ADMINW == 'CAVO') ||
                ($_ADMINW == 'YANR') || ($_ADMINW == 'JARG') || ($_ADMINW == 'CADG') ||
                ($_ADMINW == 'NEVR')) {
                SER108A.SWINVALID = '00';
                _validacionusuario_SER108A()
            } else {
                _validacionusuario_SER108A()
            }
            break;
        // SUKURAME
        case 900565371:
            console.log('SUKURAME')
            SER108A.SWINVALID = '00';
            _validacionusuario_SER108A()
            break;
        // ITZAYANA
        case 901120152:
            console.log('ITZAYANA')
            SER108A.SWINVALID = '00';
            _validacionusuario_SER108A()
            break;
        // hospital de cajica
        case 832002436:
            console.log('CAJICA')
            if (($_ADMINW == 'GEBC') || ($_ADMINW == 'RCCAY') || ($_ADMINW == 'ADMI')) {
                SER108A.SWINVALID = '00';
                _validacionusuario_SER108A()
            } else {
                _validacionusuario_SER108A()
            }
            break;
        // DEI
        default:
            console.log('DEFAUL')
            if (($_NITUSU == "0830092718") || ($_NITUSU == "0830092719") || ($_NITUSU == "0900193162")) {
                $_OPSEGU = "IS41";
                let datos_envio = datosEnvio()
                datos_envio += $_ADMINW + '|' + $_OPSEGU
                let URL = get_url("APP/CONTAB/CON904.DLL");
                postData({ datosh: datos_envio }, URL)
                    .then(function (data) {
                        console.debug(data);
                        _validacionusuario_SER108A();
                    })
                    .catch(err => {
                        console.debug(err, 'CON904');
                        _toggleNav();
                    })
            } else {
                _validacionusuario_SER108A();
            }
            break;
    }
}

function _validacionusuario_SER108A() {
    if (SER108A.SWINVALID == '49') {
        CON851('49', '49', null, 'error', 'error');
        setTimeout(_toggleNav, 500);
    } else {
        if ($_ANOLNK > 90) {
            SER108A.ANOALFA = $_ANOLNK + 1900;
        } else {
            SER108A.ANOALFA = $_ANOLNK + 2000;
        }
        _dato1_SER108A();
    }
}

function _dato1_SER108A() {
    SER108A.PREFW = 'A';
    $('#prefijo_108A').val(SER108A.PREFW);
    _aceptarnumero_SER108A();
}

function _aceptarprefijo_SER108A() {
    validarInputs(
        {
            form: "#PREFIJO_SER108A",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER108A.PREFW = $('#prefijo_108A').val();
            if ((SER108A.PREFW == 'A') || (SER108A.PREFW == 'P') || (SER108A.PREFW == 'T')) {
                _aceptarnumero_SER108A();
            } else {
                _aceptarprefijo_SER108A();
            }
        }
    )
}

function _aceptarnumero_SER108A() {
    validarInputs(
        {
            form: "#NUMERO_SER108A",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER108A.NROFACT = $('#numero_108A').val();
            SER108A.NROFACT = cerosIzq(SER108A.NROFACT, 6);
            $('#numero_108A').val(SER108A.NROFACT);
            if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719')) {
                _aceptarprefijo_SER108A();
            } else {
                _prefijodestino_SER108A();
            }

        }
    )
}

function _prefijodestino_SER108A() {
    validarInputs(
        {
            form: "#PREFIJODEST_SER108A",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER108A.PREFIJODEST = $('#prefijodest_108A').val();
            if ((SER108A.PREFIJODEST == 'A') || (SER108A.PREFIJODEST == 'P') || (SER108A.PREFIJODEST == 'T')) {
                switch (SER108A.PREFIJODEST) {
                    case 'A':
                        $('#descripdest_108A').val('Ambulatorio');
                        _consultadllprefijos_SER108A();
                        break;
                    case 'P':
                        $('#descripdest_108A').val('Hospitalizado');
                        _consultadllprefijos_SER108A();
                        break;
                    case 'T':
                        $('#descripdest_108A').val('Acc. Transito');
                        _consultadllprefijos_SER108A();
                        break;
                    default:
                        break;
                }
            } else {
                _prefijodestino_SER108A();
            }
        }
    )
}

function _consultadllprefijos_SER108A() {
    SER108A.LLAVENUM = SER108A.PREFW + SER108A.NROFACT;
    let datos_envio = datosEnvio() + SER108A.LLAVENUM + '|';
    SolicitarDll({ datosh: datos_envio }, dato => {
        console.log(dato, 'ARRANCARFACT')
        var date = dato.split("|");
        var SWINVALID = date[0];
        SER108A.NITNUM = date[2].trim();
        SER108A.DESCRIPNUM = date[3].trim();
        SER108A.CONVENIONUM = date[4].trim();
        SER108A.DESCRIPTAR = date[5].trim();
        SER108A.ESTADONUM = date[6].trim();
        SER108A.IDPACNUM = date[10].trim();
        SER108A.DESCRIPPACINUM = date[11].trim();
        SER108A.FECHAINGNUM = date[15].trim();
        SER108A.FECHASALNUM = date[16].trim();
        SER108A.HORAINGNUMW = date[17].trim();
        SER108A.HORARETNUMW = date[18].trim();
        if (SWINVALID == '00') {
            $('#nit_108A').val(SER108A.NITNUM);
            $('#descripnit_108A').val(SER108A.DESCRIPNUM);
            $('#convenio_108A').val(SER108A.CONVENIONUM);
            $('#descripconvenio_108A').val(SER108A.DESCRIPTAR);
            if (SER108A.ESTADONUM == '0') {
                $('#estado_108A').val('0 - ACTIVA');
            } else if (SER108A.ESTADONUM == '1') {
                $('#estado_108A').val('1 - INACTIVA');
            } else if (SER108A.ESTADONUM == '2') {
                $('#estado_108A').val('2 - BLOQUEADA');
            }
            $('#idpaci_108A').val(SER108A.IDPACNUM);
            $('#descrippaci_108A').val(SER108A.DESCRIPPACINUM);
            $('#fechaing_108A').val(SER108A.FECHAINGNUM);
            $('#horaing_108A').val(SER108A.HORAINGNUMW);
            $('#fecharet_108A').val(SER108A.FECHASALNUM);
            $('#horaret_108A').val(SER108A.HORARETNUMW);

            CON851P('04', _aceptarnumero_SER108A, _consultadllgrabar_ser108A)

        } else if (SWINVALID == '01') {
            CON851('01', '01', null, 'error', 'error');
            _aceptarnumero_SER108A();
        }
    }, get_url('APP/SALUD/SER108-01.DLL'));
}

function _consultadllgrabar_ser108A() {
    console.log('_consultadllgrabar_ser108A')
    $_FECHACREAW = moment().format('YYYYMMDD');
    console.log($_FECHACREAW, '$_FECHACREAW')
    let datos_envio = datosEnvio() + SER108A.LLAVENUM + '|' + SER108A.PREFIJODEST + '|' + $_ADMINW + '|' + $_FECHACREAW;
    SolicitarDll({ datosh: datos_envio }, dato => {
        console.log(dato, 'GRABAR REGISTRO')
        var date = dato.split("|");
        let datos_envio = datosEnvio() + SER108A.LLAVENUM + '|' + $_FECHA_LNK;
        SolicitarDll({ datosh: datos_envio }, dato => {
            console.log(dato, 'SAL020CERRAR-ARCHIVOSGA')
            var date = dato.split("|");
            toastr.success('Se ha guardado', 'EXITO');
            _inputControl('reset');
            _toggleNav();

        }, get_url('APP/SALUD/SAL020GA.DLL'));
    }, get_url('APP/SALUD/SER108A.DLL'));

}










