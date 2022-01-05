// 05-06-2020 -- Diana Escobar: Creacion

var $_SECU1NUM, $_SECU2NUM, $_REDEXTER, $_FECHA_ING_W, $_NITNUM, $_ESTADONUM, $_CONVENIOTER, $_FACTURANUMW, $_PACI2W, $_PRECAPITW = ' ', $_NROCAPITW = ' ', $_DESCRIPCIUDADW, $_ENTIDADTER = ' ', $_FORMACOPAGNUM = '', $_ENVIONUM = '', $_TIPOFACTNUM = '', $_CLASIFNUM = '3', $_TIPOEVENTONUM = '', $_TIPOPACINUM, $_NITCONTW = '', $_ACTTER = '', $_NITACTUAL = '', $_PACILNK, $_FACTURATRIAW = '000000', $_FACTP = '', $_NROW = 0;
var $_HISTORIA = false;
var $_TRIAGE = false;
var SER108F = new Object;
var SER108 = new Object;
var $_FECHABUSQENV = '00000000';

////////////////////////////////////  APERTURA DE FACTURACION  ///////////////////////////////////////////
/////////////////////////////////// CORRECCION DE CORRECCION DE AUTORIZACION ////////////////////////////
$(document).ready(function () {
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    SER108.TIPOEVENTOW = '00';
    SER108.DESCRIPPACINUM = ' ';
    SER108.CCOSTOW = '';
    SER108.OPERBLOQNUM = '';
    SER108.SEGRIPSW = '';
    SER108.TIPOFACTW = '';
    SER108.ANOINGNUM = '';
    SER108.CTRLXDIAG = '';
    SER108.CTLNROPACIW = '';
    SER108.NIVELCUPSW = '';
    SER108.OBSERVW = '';
    SER108.SUCURSALW = '';
    SER108.COVID19W = ''
    SER108.NPBSW = ''
    SER108.MYTW = ''
    SER108.IDPACIENTEGLOBAL = ''
    SER108.ENVIOW = '000000';
    $_FECHABUSQ = moment().format('YYYYMMDD');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    $_NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
    $_PREFIJOUSU = $_USUA_GLOBAL[0].PREFIJ;
    $_CONTADOUSU = $_USUA_GLOBAL[0].CONTADO;
    $_PUCUSU = $_USUA_GLOBAL[0].PUC;
    $_CONTROLFORMUUSU = $_USUA_GLOBAL[0].CTRL_FORMU;
    $_CODCIUUSU = $_USUA_GLOBAL[0].COD_CIUD;
    _toggleF8([
        { input: 'factura', app: '108', funct: _ventanaFacturacion },
        { input: 'sucur', app: '108', funct: _ventanassucursales },
        { input: 'nit', app: '108', funct: _ventanaTerceros },
        { input: 'convenio', app: '108', funct: _ventanaConvenios },
        { input: "idpaciente", app: "108", funct: _ventanaPacientes },
        { input: 'servicio', app: '108', funct: _ventanaServicio },
        { input: 'ctrlcont', app: '108', funct: _ventanacontratos },
        { input: 'costos', app: '108', funct: _ventanaCostos },
        { input: 'division', app: '108', funct: _ventanaDivision },
        { input: 'ciudad', app: '108', funct: _ventanaCiudad },
        { input: 'origen', app: '108', funct: _ventanaOrigen },
        { input: 'funauto', app: '108', funct: _ventanaTercerosautoriza }

    ]);
    obtenerDatosCompletos({
        nombreFd: 'UNSERV'
    }, function (data) {
        console.log(data, 'UNIDAD')
        SER108.UNISERVICIO = data.UNSERV;
        SER108.UNIDADSERVICIO = [];
        for (var i in SER108.UNISERVICIO) {
            console.log(i);
            if (SER108.UNISERVICIO[i].ESTADO.trim() == 'S') {
                SER108.UNIDADSERVICIO.push(SER108.UNISERVICIO[i]);
            }
        }
        for (var i in SER108.UNIDADSERVICIO) {
            SER108.UNIDADSERVICIO[i].DESCRIP = `${SER108.UNIDADSERVICIO[i].COD} - ${SER108.UNIDADSERVICIO[i].DESCRIP}`;
            SER108.UNIDADSERVICIO[i].COD = i;
        }
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
            data = data.PREFIJOS;
            SER108.PREFIJOS = data;
            obtenerDatosCompletos({
                nombreFd: 'SUCURSALES'
            }, function (data) {
                loader("hide");
                _leerusuario();
                SER108.SUCURSAL = data.SUCURSAL
                // SER108.SUCURSAL.pop()
            })
        })
    })
});


function _leerusuario() {
    let OPCIONES = new Object;
    OPCIONES = {
        '097411': _usuarios_SAL7411,
        '097415': _dato0_SER108F,
    }
    let active = $('#navegacion').find('li.opcion-menu.active');
    if (active.length == 0) {
        if ($_MESSAGE[2].historia) $_HISTORIA = true;
        if ($_MESSAGE[2].triage) $_TRIAGE = true;
        SER108.IDPACIENTEGLOBAL = $_MESSAGE[2].cliente
        SER108.LLAVEHISTORIA = $_MESSAGE[2].cliente + $_MESSAGE[2].folio
        SER108.LLAVETRIAGE = $_MESSAGE[2].llavetriage
        _usuarios_SAL7411();
    } else {
        SER108F.OPCIONACTIVA = active[0].attributes[2].nodeValue;
        let opcion = new Function();
        opcion = OPCIONES[active[0].attributes[2].nodeValue];
        opcion();
        let Nombreopcion = {
            '097411': '9,7,4,1,1 - Aperturas de Facturas',
            '097415': '9,7,4,1,5 - Corrección de facturas autorizacion',
        }
        nombreOpcion(Nombreopcion[SER108F.OPCIONACTIVA]);
    }
}

function _dato0_SER108F() {
    SER108.NOVEDAD = '8';
    _infoCON007B_01();
}

function _usuarios_SAL7411() {
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    if (parseInt($_ANOLNK) > 90) {
        $_ANOALFA = parseInt($_ANOLNK) + 1900;
        CON850(_dato_novedad_SAL7411);
    } else {
        $_ANOALFA = parseInt($_ANOLNK) + 2000;
        CON850(_dato_novedad_SAL7411);
    }
}

function _dato_novedad_SAL7411(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    $("#idpaciente_108").val(SER108.IDPACIENTEGLOBAL);
    SER108.NOVEDAD = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            if (SER108.NOVEDAD == 9) {
                if (($_ADMINW == "ADMI") || ($_ADMINW == "GEBC")) {
                    _infoCON007B_01();
                }
                else {
                    CON851('14', '14', null, 'error', 'error');
                    setTimeout(function () { CON850(_dato_novedad_SAL7411); }, 500)
                }
            }
            else {
                _infoCON007B_01();
            }
            break;

        default:
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
            break;
    }
    $('#novedad_108').val(novedad.id + ' - ' + novedad.descripcion)
}


function _infoCON007B_01() {
    postData({
        datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`
    }, get_url("APP/CONTAB/CON007B.DLL"))
        .then(data => {
            console.debug(data);
            data = data.split("|");
            if (data[1].substring(0, 1) == "0" || data[1].substring(0, 1) == "3" || data[1].substring(0, 1) == "5") {
                if (SER108.NOVEDAD == "7") {
                    let URL = get_url("APP/CONTAB/CON904.DLL");
                    postData({ datosh: datosEnvio() + $_ADMINW + '|XXXXX|' }, URL)
                        .then(data => {
                            _prefijo_ser108()
                        })
                        .catch(err => {
                            let Window = BrowserWindow.getAllWindows();
                            if (Window.length > 1) {
                                _cerrarSegundaVentana();
                            } else {
                                _toggleNav()
                            };
                        })
                } else {
                    _prefijo_ser108();
                }
            } else {
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    _cerrarSegundaVentana();
                } else {
                    _toggleNav()
                };
            }
        })
        .catch(error => {
            console.error(error);
            CON851('', 'Ocurrio un error con el usuario', null, 'error', 'Error');
            _toggleNav();
        });
}

function _prefijo_ser108() {
    validarInputs(
        {
            form: "#PREFIJOS_108",
            orden: '1'
        },
        () => { CON850(_dato_novedad_SAL7411); },
        () => {
            $_PREFIJOW = $('#prefijo_108').val();
            if (($_NITUSU == '0800162035') && (SER108.NOVEDAD == "7")) {
                if (($_PREFIJOW == 'P') || ($_PREFIJOW == 'T') || ($_PREFIJOW == 'A')) {
                    CON851('03', '03', null, 'error', 'error');
                    _prefijo_ser108();
                } else {
                    _infoSER108_03();
                }
            } else {
                _infoSER108_03();
            }
        }
    )
}

function _infoSER108_03() {

    LLAMADO_DLL({
        dato: [$_PREFIJOW],
        callback: _dataSER108_03,
        nombredll: 'SER108-03',
        carpeta: 'SALUD'
    })
}

function _dataSER108_03(data) {
    var date = data.split("|");
    $_SWPARE = date[0];
    $_CLAVEMENINV = date[1];
    $_CLAVEMENUSU = date[2];
    swinvalid = date[3];
    if (swinvalid == '00') {
        switch ($_PREFIJOW) {
            case "P":
                $_SWCLAVE = $_CLAVEMENINV
                _infoCON904_02();
                break;
            case "T":
                $_SWCLAVE = $_CLAVEMENINV
                _infoCON904_02();
                break;
            case "O":
                $_SWCLAVE = $_CLAVEMENINV
                _infoCON904_02();
                break;
            case "Q":
                $_SWCLAVE = $_CLAVEMENINV
                _infoCON904_02();
                break;
            case "R":
                $_SWCLAVE = $_CLAVEMENINV
                _infoCON904_02();
                break;
            case "S":
                $_SWCLAVE = $_CLAVEMENINV
                _infoCON904_02();
                break;
            case "U":
                $_SWCLAVE = $_CLAVEMENINV
                _infoCON904_02();
                break;
            case "V":
                $_SWCLAVE = $_CLAVEMENINV
                _infoCON904_02();
                break;
            case "W":
                $_SWCLAVE = $_CLAVEMENINV
                _infoCON904_02();
                break;
            case "X":
                $_SWCLAVE = $_CLAVEMENINV
                _infoCON904_02();
                break;
            case "Y":
                $_SWCLAVE = $_CLAVEMENINV
                _infoCON904_02();
                break;
            case "Z":
                $_SWCLAVE = $_CLAVEMENINV
                _infoCON904_02();
                break;

            default:
                $_SWCLAVE = $_CLAVEMENUSU;
                _infoCON904_02();
                break;
        }
    } else if (swinvalid == '03') {
        CON851('03', '03', null, 'error', 'error');
        _prefijo_ser108();
    } else {
        CON852(date[0], date[1], date[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}


function _infoCON904_02() {
    $_OPSEGU = "IS41" + $_PREFIJOW;
    let datos_envio = datosEnvio()
    datos_envio += $_ADMINW + '|' + $_OPSEGU
    let URL = get_url("APP/CONTAB/CON904.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(function (data) {
            $_OPSEGU = "IS41" + $_PREFIJOW + $_PREFIJOW;
            let datos_envio = datosEnvio()
            datos_envio += $_ADMINW + '|' + $_OPSEGU
            let URL = get_url("APP/CONTAB/CON904.DLL");
            postData({ datosh: datos_envio }, URL)
                .then(function (data) {
                    _infoCON003_01()
                })
                .catch(err => {
                    console.debug(err);
                    _prefijo_ser108();
                })
        })
        .catch(err => {
            console.debug(err);
            _prefijo_ser108();
        })

}

function _infoCON003_01() {
    if (SER108.NOVEDAD == "7") {
        if ($_USUA_GLOBAL[0].NIT == 830511298) {
            $_SUCOPERW = $_USUA_GLOBAL[0].PREFIJ
            BUSCARNUMERO(_infoCOON007_01);
        } else {
            let URL = get_url("APP/CONTAB/CON003.DLL");
            postData({ datosh: datosEnvio() + $_ADMINW }, URL)
                .then(data => {
                    data = data.split('|');
                    $_SUCOPERW = data[2].trim();
                    if ($_SUCOPERW == '01' || $_SUCOPERW == '02' || $_SUCOPERW == '03' || $_SUCOPERW == '04' || $_SUCOPERW == '05' || $_SUCOPERW == '06'
                        || $_SUCOPERW == '07' || $_SUCOPERW == '08' || $_SUCOPERW == '09' || $_SUCOPERW == '10' || $_SUCOPERW == '11' || $_SUCOPERW == '12' || $_SUCOPERW == '13' || $_SUCOPERW == '14' || $_SUCOPERW == '15'
                        || $_SUCOPERW == '16' || $_SUCOPERW == '17' || $_SUCOPERW == '18' || $_SUCOPERW == '19' || $_SUCOPERW == '20' || $_SUCOPERW == '21' || $_SUCOPERW == '22' || $_SUCOPERW == '23' || $_SUCOPERW == '24'
                        || $_SUCOPERW == '25' || $_SUCOPERW == '26' || $_SUCOPERW == '27' || $_SUCOPERW == '28' || $_SUCOPERW == '29' || $_SUCOPERW == '30' || $_SUCOPERW == '31' || $_SUCOPERW == '32' || $_SUCOPERW == '33'
                        || $_SUCOPERW == '34' || $_SUCOPERW == '35' || $_SUCOPERW == '36' || $_SUCOPERW == '37' || $_SUCOPERW == '38' || $_SUCOPERW == '39' || $_SUCOPERW == '40' || $_SUCOPERW == '41' || $_SUCOPERW == '42'
                        || $_SUCOPERW == '43' || $_SUCOPERW == '44' || $_SUCOPERW == '45' || $_SUCOPERW == '46' || $_SUCOPERW == '47' || $_SUCOPERW == '48' || $_SUCOPERW == '49' || $_SUCOPERW == '50') {
                        SER108.SUCUREDIT = $_SUCOPERW
                    } else {
                        SER108.SUCUREDIT = $_USUA_GLOBAL[0].PREFIJ
                    }
                    BUSCARNUMERO(_infoCOON007_01);
                })
                .catch(err => {
                    console.debug(err);
                    _prefijo_ser108()
                })
        }
    } else {
        BUSCARNUMERO(_infoCOON007_01);
    }
}

function _infoCOON007_01() {
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + $_SECUNUM }, URL)
        .then(data => {
            var data = data.split("|");
            $_ULTFECHA = data[2].trim();
            $_NUMEROCTL = data[1].substring(3, 9);
            $_LOTE = data[0].trim();
            if (SER108.NOVEDAD == "7") {
                $_NROW = $_NUMEROCTL;
                $("#factura_108").val($_NROW);
                _validarresolucion_ser108();
            }
            else {
                $_NROW = parseInt($_NUMEROCTL) - 1;
                $("#factura_108").val($_NROW);
                _validarresolucion_ser108();
            }
        })
        .catch(err => {
            console.debug(err);
            _prefijo_ser108()
        })
}
function _validarresolucion_ser108() {
    let prefijo = SER108.PREFIJOS[0].TABLA.filter(x => x.PREFIJO == $_PREFIJOW);
    console.log(prefijo)
    if (prefijo.length > 0) {
        SER108.FECHAFINPREFIJO = `${prefijo[0].ANO_FIN}${prefijo[0].MES_FIN}${prefijo[0].DIA_FIN}`
        SER108.NROMAXIMO = prefijo[0].HASTA_NRO
        SER108.FECHAMAXIMA = moment(SER108.FECHAFINPREFIJO).subtract(5, "days").format("YYYYMMDD")
        SER108.CONSECUTIVOLOCAL = $_NROW.toString().padStart(10, '0')
        if (SER108.CONSECUTIVOLOCAL > SER108.NROMAXIMO) {
            CON851('', 'Supero numero maximo segun resolucion', null, 'error', 'error');
            _prefijo_ser108()
        } else {
            if (SER108.FECHAMAXIMA == moment().format('YYYYMMDD')) {
                CON851('', 'Faltan 5 dias para el vencimiento de la resolucion por prefijo ', null, 'error', 'error');
                _validarCON007_01()
            } else {
                if (SER108.FECHAFINPREFIJO == moment().format('YYYYMMDD')) {
                    CON851('', 'Resolucion de facturacion esta vencida', null, 'error', 'error');
                    _prefijo_ser108()
                } else {
                    _validarCON007_01()
                }
            }
        }
    } else {
        CON851('03', '03', null, 'error', 'error');
    }
}
function _validarCON007_01() {
    if (SER108.NOVEDAD == "7") {
        $_ANOLNK = $_FECHA_LNK.substring(0, 2);
        $_AÑOPACI_ING7411 = $_FECHA_ING_W;
        SER108.HORASALW = '0000';
        if (parseInt($_AÑOPACI_ING7411) > parseInt($_ANOLNK)) {
            CON851('37', '37', null, 'error', 'error');
            CON850(_dato_novedad_SAL7411);
        }
        else {
            SER108.LLAVEW = $_PREFIJOW + $_NROW;
            _consultanumeracion();
        }
    } else {
        _evaluarfactura();
    }
}


function _evaluarfactura() {
    validarInputs({
        form: '#FACTURASER_108',
        orden: "1"
    },
        function () { _prefijo_ser108() },
        _validarfactura
    )
}


function _validarfactura() {
    $_NROW = $("#factura_108").val();
    $_NROW = $_NROW.padStart(6, "0");
    SER108.LLAVEW = $_PREFIJOW + $_NROW;
    $("#factura_108").val($_NROW);
    if (($_NROW == " ") || (parseInt($_NROW) == 0)) {
        CON851('13', '13', null, 'error', 'error')
        _evaluarfactura();
    }
    else {
        _consultanumeracion()
    }
}

// function guardadoboton_SER108(){
//     _fin_validar_form();
//     _crearbotones({ activar:false, idbutton: 'guardadoButton_SER108' })
//     setTimeout( () => _validarinformacion(), 300);
// }

function _consultanumeracion() {
    let URL = get_url("APP/SALUD/SER808-01.DLL");
    postData({
        datosh: datosEnvio() + SER108.LLAVEW + "|" + SER108.NOVEDAD + "|",
    }, URL)
        .then(data => {
            // _crearbotones({ id:'SER108', boton: '"glyphicon glyphicon-floppy-disk"', funcion: "guardadoboton_SER108", activar:true, idbutton: 'guardadoButton_SER108'})
            SER108.FACTURACION = data.NUMER19[0];
            $_LLAVENUM = SER108.FACTURACION.LLAVE_NUM.trim()
            $_PREFIJONUM = $_LLAVENUM.substring(0, 1)
            $_NUMERONUM = $_LLAVENUM.substring(1, 7)
            SER108.UNSERV = SER108.FACTURACION.UNSERV.trim()
            $_NITNUM = SER108.FACTURACION.NIT_NUM.trim()
            $_DESCRIPNUM = SER108.FACTURACION.DESCRIP_NUM.trim()
            $_CONVENIONUM = SER108.FACTURACION.CONVENIO_NUM.trim()
            $_DESCRIPTAR = SER108.FACTURACION.DESCRIP_TAR.trim()
            $_ESTADONUM = SER108.FACTURACION.ESTADO_NUM.trim()
            SER108.SUCURSALW = SER108.FACTURACION.SUCUR_NUM.trim()
            SER108.DESCRIPSUCW = SER108.FACTURACION.DESCRIP_SUC.trim()
            $_PORCRETENCNUM = SER108.FACTURACION.PORCRETENC_NUM.trim()
            $_SEGRIPSNUMW = SER108.FACTURACION.SEGRIPS_NUM.trim()
            $_CTAPICNUM = SER108.FACTURACION.CTAPIC_NUM.trim()
            $_IDPACNUM = SER108.FACTURACION.IDPAC_NUM.trim()
            $_DESCRIPPACINUM = SER108.FACTURACION.PACIENTE_NUM.trim()
            $_TIPOFACTNUM = SER108.FACTURACION.TIPOFAC_NUM.trim()
            $_HABNUM = SER108.FACTURACION.HAB_NUM.trim()
            $_PORCENCOPAGONUM = SER108.FACTURACION.PORCENTCOP_NUM.trim()
            SER108.PORCENCOPAGOW = $_PORCENCOPAGONUM
            SER108.FECHAINGNUM = SER108.FACTURACION.FECHA_ING.trim()
            SER108.FECHASALNUM = SER108.FACTURACION.FECHA_RET.trim()
            SER108.HORAINGNUMW = SER108.FACTURACION.HORAING_NUM.trim()
            SER108.HORASALW = SER108.FACTURACION.HORARET_NUM.trim()
            $_SERVICIONUM = SER108.FACTURACION.SERVIC_NUM.trim()
            $_FACTURATRIAW = SER108.FACTURACION.FACT_TRIA.trim()
            $_DESCRIPSERHO = SER108.FACTURACION.DESCRIP_HOSP.trim()
            $_REDEXTERNUM = SER108.FACTURACION.REDEXTER_NUM.trim()
            $_CONTRATONUM = SER108.FACTURACION.CONTRATO_NUM.trim()
            $_DIVISIONNUM = SER108.FACTURACION.DIVISION_NUM.trim()
            $_DESCRIPDIV = SER108.FACTURACION.DESCRIP_DIV.trim()
            $_FACTCAPITNUMW = SER108.FACTURACION.FACTCAPIT_NUM.trim()
            $_PRECAPITNUM = $_FACTCAPITNUMW.substring(0, 1);
            $_NROCAPITNUM = $_FACTCAPITNUMW.substring(1, 7);
            $_FORMACOPAGNUM = SER108.FACTURACION.FORMACOPAG_NUM.trim()
            $_CCOSTONUM = SER108.FACTURACION.COSTO_NUM.trim()
            $_NOMBRECOSTO = SER108.FACTURACION.DESCRIP_COST.trim()
            $_ENVIONUM = SER108.FACTURACION.ENVIO_NUM.trim()
            $_CONTROLCAPNUM = SER108.FACTURACION.CONTROLCAP_NUM.trim()
            $_OBSERVNUM = SER108.FACTURACION.OBSERV_NUM.trim()
            $_TIPOPACINUM = SER108.FACTURACION.TIPOPACI_NUM.trim()
            $_DETALLENUM = SER108.FACTURACION.DETALLE_NUM.trim()
            $_CTLNROPACINUM = SER108.FACTURACION.CTLNROPACI_NUM.trim()
            $_CISNUM = SER108.FACTURACION.CIS_NUM.trim()
            $_MYTNUM = SER108.FACTURACION.MYT_NUM.trim()
            $_CONTROLXSERVNUM = SER108.FACTURACION.CTRLSERV_NUM.trim()
            SER108.CONTROLCL0 = SER108.FACTURACION.CTRLCLO_NUM.trim()
            SER108.CONTROLCL1 = SER108.FACTURACION.CTRLCL1_NUM.trim()
            SER108.CONTROLCL2 = SER108.FACTURACION.CTRLCL2_NUM.trim()
            SER108.CONTROLCL3 = SER108.FACTURACION.CTRLCL3_NUM.trim()
            SER108.CONTROLCL4 = SER108.FACTURACION.CTRLCL4_NUM.trim()
            SER108.CONTROLCL5 = SER108.FACTURACION.CTRLCL5_NUM.trim()
            SER108.CONTROLCL6 = SER108.FACTURACION.CTRLCL6_NUM.trim()
            SER108.CONTROLCL7 = SER108.FACTURACION.CTRLCL7_NUM.trim()
            $_ARTIVANUM = SER108.FACTURACION.ARTIVA_NUM.trim()
            $_NROPOLNUM = SER108.FACTURACION.NROPOL_NUM.trim()
            $_RUTANUM = SER108.FACTURACION.DIVNUM_NUM.trim()
            $_ESTNUM = SER108.FACTURACION.DIASEST_NUM.trim()
            $_CLASIFNUM = SER108.FACTURACION.CLASIF_NUM.trim()
            $_ENTRAREMITNUM = SER108.FACTURACION.ENTRAREMIT_NUM.trim()
            SER108.ORIGREMIT = SER108.FACTURACION.ORIGREMIT_NUM.trim()
            $_NOMBREIPS = SER108.FACTURACION.NOMBRE_IPS.trim()
            $_TIPOEVENTONUM = SER108.FACTURACION.TIPOEVENT_NUM.trim()
            $_CIUDADNUM = SER108.FACTURACION.CIUDAD_NUM.trim()
            $_NOMBRECIUD = SER108.FACTURACION.DESCRIP_CIUD.trim()
            $_FUNCAUTORINGNUM = SER108.FACTURACION.FUNCAUTO_NUM.trim()
            $_DESCRIPFUNCAUTO = SER108.FACTURACION.DESCRIP_AUT.trim()
            SER108.NROAUTORIZACIONW = SER108.FACTURACION.NROAUTORI_NUM.trim()
            SER108.OBSERAPERW = SER108.FACTURACION.OBSERVCRE_NUM.trim()
            $_DATOOPERNUM = SER108.FACTURACION.OPER_NUM.trim()
            SER108.OPERNUM = SER108.FACTURACION.OPER_NUM.trim()
            SER108.FECHACRENUM = SER108.FACTURACION.FECHACRE_NUM.trim()
            SER108.FECHAMODNUM = SER108.FACTURACION.FECHAMOD_NUM.trim()
            $_ANOCRENUM = SER108.FECHACRENUM.substring(0, 4);
            $_MESCRENUM = SER108.FECHACRENUM.substring(4, 6);
            $_DIACRENUM = SER108.FECHACRENUM.substring(6, 8);
            $_ANOMODNUM = SER108.FECHAMODNUM.substring(0, 4);
            $_MESMODNUM = SER108.FECHAMODNUM.substring(4, 6);
            $_DIAMODNUM = SER108.FECHAMODNUM.substring(6, 8);
            SER108.OPERBLOQNUM = SER108.FACTURACION.OPERBLOQ_NUM.trim()
            $_ZONATER = SER108.FACTURACION.ZONA_TER.trim()
            SER108.OPERMODNUM = SER108.FACTURACION.OPERMOD_NUM.trim()
            $_FECHANACPAC = SER108.FACTURACION.NAC_PACI.trim()
            $_ANONACPAC7411 = $_FECHANACPAC.substring(0, 4);
            $_MESNACPAC7411 = $_FECHANACPAC.substring(4, 6);
            $_DIANACPAC7411 = $_FECHANACPAC.substring(6, 8);
            $_TOTALFACT = SER108.FACTURACION.TOTAL_NUM.trim()
            SER108.FECHAINGAUT = SER108.FACTURACION.FECHAINGAUT_NUM.trim()
            SER108.HORAINGAUT = SER108.FACTURACION.HORAAINGAUT_NUM.trim()
            SER108.FECHAFINAUT = SER108.FACTURACION.FECHARETAUT_NUM.trim()
            SER108.HORAFINAUT = SER108.FACTURACION.HORARETAUT_NUM.trim()
            SER108.LLAVESALID = SER108.FACTURACION.LLAVESALID_NUM.trim()
            SER108.NIVELCUPSW = SER108.FACTURACION.NIVELCUPS_NUM.trim()
            SER108.CTRLXDIAG = SER108.FACTURACION.CTRLXDIAG_NUM.trim()
            SER108.CUFEELECNUM = SER108.FACTURACION.CUFEELEC_NUM.trim()
            SER108.COVID19W = SER108.FACTURACION.CONVID19.trim()
            SER108.NPBSW = SER108.FACTURACION.NOPBS.trim()
            if (SER108.NOVEDAD == '7') {
                $("#factura_108").val("");
                CON851('00', '00', null, 'error', 'error');
                _evaluarfactura();
            } else if (SER108.NOVEDAD == '8') {
                setTimeout(consultamostrardatos_SAL7411, 100);
            } else if (SER108.NOVEDAD == '9') {
                setTimeout(consultamostrardatos_SAL7411, 100);
            }
        })
        .catch(error => {
            if (SER108.NOVEDAD == '7') {
                SER108.ESTADOW = "0"
                _nuevoregistro();
            } else if (error.MENSAJE == "01" && SER108.NOVEDAD == '8') {
                $("#factura_108").val("");
                _evaluarfactura();
            } else if (error.MENSAJE == "01" && SER108.NOVEDAD == '9') {
                $("#factura_108").val("");
                _evaluarfactura();
            } else {
                _evaluarfactura()
            }
        });
}

function _nuevoregistro() {
    $("#estado_108").val('0 - ACTIVO');
    $_NROW = $("#factura_108").val();
    $_SWCREAR = "1";
    $_FECHASIST = moment().format('L');
    $_FECHA_ACT = moment().format('YYYYMMDD');
    $_ANOACT = $_FECHA_ACT.substring(0, 4);
    $_MESLNK = $_FECHA_LNK.substring(4, 6)
    SER108.SUCURSALW = SER108.SUCUREDIT
    if ((parseInt($_ANOALFA) < parseInt($_ANOACT)) && (parseInt($_MESLNK) == 12)) {
        SER108.ANOLNK = 2000 + $_ANOLNK
        let URL = get_url("APP/SALUD/SER108F.DLL");
        postData({
            datosh: `${datosEnvio()}${SER108.ANOLNK}|${SER108.LLAVEW}|`
        }, URL)
            .then(data => {
                if (data > '00') {
                    CON851('2R', '2R', null, 'error', 'error');
                    _evaluarfactura()
                } else {
                    _evaluardatounidad_SER108()
                }
            }).catch(error => {
                console.error(error)
                _evaluarfactura()
            });
    }
    else {
        _evaluardatounidad_SER108()
    }
}

function _evaluardatounidad_SER108() {
    if (SER108.UNSERV == '00' || SER108.UNSERV == '88') {
        _infoCON007B_01()
    } else {
        POPUP({
            array: SER108.UNIDADSERVICIO,
            titulo: "UNIDADES DE SERVICIO",
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            seleccion: SER108.UNSERV,
            callback_f: _prefijo_ser108
        },
            data => {
                console.log(data, 'NNN')
                SER108.UNSERV = data.DESCRIP.substring(0, 2)
                $("#undservicio_108").val(data.DESCRIP);
                if (($_USUA_GLOBAL[0].CTRL_FORMU == 'S') && ($_PREFIJOW == 'P' || $_PREFIJOW == 'T' || $_PREFIJOW == 'O' || $_PREFIJOW == 'Q' || $_PREFIJOW == 'R' || $_PREFIJOW == 'S' || $_PREFIJOW == 'U' || $_PREFIJOW == 'V' || $_PREFIJOW == 'W' || $_PREFIJOW == 'X' || $_PREFIJOW == 'Y' || $_PREFIJOW == 'Z') &&
                    (SER108.NOVEDAD == '7') && SER108.UNSERV == '01') {
                    var ventanaconsultaurg_ser108 = bootbox.dialog({
                        size: "medium",
                        title: "PACIENTES PARA CONSULTA DE URGENCIAS",
                        message:
                            '<div class="row"> ' +
                            '<div class="col-md-12 col-sm-12 col-xs-12"> ' +
                            '<div class="inline-inputs">' +
                            '<label class="col-md-5 col-sm-10 col-xs-12 control-label" for="name">' +
                            "Desea ver los que ya tienen factura?:" +
                            '</label> ' +
                            '<div class="input-group col-md-7 col-sm-2 col-xs-12" id="TIENEFACT_SER108"> ' +
                            '<input id="deseafact_SER108" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                            "</div> " +
                            "</div>" +
                            "</div> " +
                            "</div>",
                        buttons: {
                            confirm: {
                                label: "Aceptar",
                                className: "btn-primary",
                                callback: function () {
                                    ventanaconsultaurg_ser108.off("show.bs.modal");
                                    setTimeout(_ventanatriage_SER108, 500);
                                },
                            },
                            cancelar: {
                                label: "Cancelar",
                                className: "btn-danger",
                                callback: function () {
                                    ventanaconsultaurg_ser108.off("show.bs.modal");
                                    setTimeout(_datonit_ser108, 500);
                                },
                            },
                        },
                    });
                    ventanaconsultaurg_ser108.init($(".modal-footer").hide());
                    ventanaconsultaurg_ser108.init(_evaluardeseafact_SER108());
                    ventanaconsultaurg_ser108.on("shown.bs.modal", function () {
                        $("#deseafact_SER108").focus();
                    });
                } else {
                    _datonit_ser108()
                }
            }
        );
    }
}
function _evaluardeseafact_SER108() {
    _inputControl("disabled");
    validarInputs({
        form: "#TIENEFACT_SER108",
        orden: "1"
    }, () => { $('.btn-danger').click() },
        () => {
            SER108.SWATEN = $("#deseafact_SER108").val().toUpperCase(); $("#deseafact_SER108").val(SER108.SWATEN)
            if (SER108.SWATEN == 'S' || SER108.SWATEN == 'N') {
                let URL = get_url("APP/SALUD/HC812AU.DLL");
                postData({
                    datosh: datosEnvio() + SER108.SWATEN + '|'
                }, URL)
                    .then(data => {
                        SER108.TRIAGE = data.TRIAGE
                        SER108.TRIAGE.pop()
                        $('.btn-primary').click();
                    })
                    .catch(error => {
                        console.log(error);
                        _evaluardeseafact_SER108()
                    });
            } else {
                _evaluardeseafact_SER108()
            }
        }
    )
}

function _ventanatriage_SER108() {
    _ventanaDatos({
        titulo: 'PACIENTES PARA CONSULTA' + ' ' + moment().format("YYYYMMDD") + ' ' + moment().format('HH:mm'),
        columnas: ["PRIORIDAD", "FECHA_ATEN", "HORA_ATEN", "PACIENTE", "EDAD", "NOMB_EPS", "FACT", "CAUSA", "ESPERA", "OPER"],
        data: SER108.TRIAGE,
        ancho: "95%",
        callback_esc: () => {
            $('#DATOSTRIAGE_108').addClass('hidden')
            _datonit_ser108()
        },
        callback: data => {
            $('#DATOSTRIAGE_108').removeClass('hidden');
            $('#tipodoctriage_108').val(data.TIPO_PACI);
            $('#pacientetriage_108').val(data.PACIENTE);
            $('#epstriage_108').val(data.EPS_PACI);
            $('#nomepstriage_108').val(data.NOMEPS_PACI);
            SER108.LLAVETRIAGEW = data.FACT
            _datonit_ser108()

        }
    });
}
function _datonit_ser108() {
    if (SER108.NOVEDAD == '7' && SER108.LLAVETRIAGEW > 0) {
        CON851('1Y', '1Y', null, 'error', 'error')
        setTimeout(_evaluardatounidad_SER108, 300)
    } else {
        if (($_ADMINW == "GEBC") || ($_ADMINW == "ADMI") || ($_ADMINW == "VSC1") || ($_ADMINW == "CCAY") || ($_ADMINW == "AMBA")) {
            _evaluarnit_SAL7411();
        }
        else {
            if (($_NITUSU == "0830092718") || ($_NITUSU == "0900193162")) {
                _evaluarnit_SAL7411();
            } else {
                if (SER108.ESTADOW == "1") {
                    _evaluarhabitacion_SAL7411();
                } else {
                    _evaluarnit_SAL7411();
                }
            }
        }
    }
}

function _evaluarnit_SAL7411() {
    validarInputs({
        form: "#NIT_108",
        orden: "1"
    }, function () { setTimeout(_evaluardatounidad_SER108(), 300); },
        () => {
            $_SWTER = '0';
            SER108.NITW = $("#nit_108").val();
            SER108.NITW = SER108.NITW.padStart(10, "0");
            $("#nit_108").val(SER108.NITW);
            $_NITACTUAL = SER108.NITW;
            if ((SER108.NITW == '0000000000') || (SER108.NITW.trim() == '')) {
                _evaluarnit_SAL7411();
            } else {
                LLAMADO_DLL({
                    dato: [SER108.NITW],
                    callback: _dataSER108_05,
                    nombredll: 'SER108-05',
                    carpeta: 'SALUD'
                })
            }
        }
    )
}

function _dataSER108_05(data) {
    var date = data.split("|");
    var swinvalid = date[0];
    $_DESCRIPTER = date[2];
    $_ACTTER = date[3];
    $_DESCRIPTER2 = date[4];
    $_CONVENIOTER = date[5];
    $_ZONATER = date[6];
    $_NITTER = date[7];
    $_ENTIDADTER = date[8];
    $_NITCONTW = $_NITTER;
    if (swinvalid == "00") {
        $("#nitd_108").val($_DESCRIPTER);
        SER108.DESCRIPW = $_DESCRIPTER;
        if ((SER108.DESCRIPW == '') || (SER108.NITW != $_NITNUM) || (SER108.NOVEDAD == "7")) {
            SER108.DESCRIPW = $_DESCRIPTER;
            if ($_CONVENIOTER.trim() != '') {
                SER108.CONVENIOW = $_CONVENIOTER;
                $("#convenio_108").val(SER108.CONVENIOW);
                _validarfacturaparticular();
            } else if (($_ACTTER == "01") || ($_ACTTER == "25") || ($_ACTTER == "27") || ($_ACTTER == "30")) {
                $_DESCRIPTER2 = $_DESCRIPTER;
                $("#nitd_108").val($_DESCRIPTER2);
                _validarfacturaparticular();
            } else {
                SER108.DESCRIPW = $_DESCRIPTER2;
                $_NOMBUSCARW = $_DESCRIPTER2;
                _validarfacturaparticular();
            }
        } else {
            _evaluarconvenio_SAL7411()

        }
    } else if (swinvalid == "01") {
        if ($_SWTER == '0') {
            _creartercero_7411();
        } else {
            $("#nitd_108").val('NO EXISTE TERCERO');
            _evaluarnit_SAL7411();
        }
    }
    else {
        CON852(date[0], date[1], date[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _creartercero_7411() {

    let { ipcRenderer } = require("electron");
    ipcRenderer.send('another', datos = { directorio: 'CONTAB/paginas/CON110C.html', cliente: SER108.NITW.padStart(10, "0") });
    vector = ['on', 'Actualizando maestro de terceros...']
    _EventocrearSegventana(vector, _evaluarnit_SAL7411);
}


function _validarfacturaparticular() {
    if ((($_PUCUSU == "4") || ($_PUCUSU == "6")) && (SER108.NITW == "9999")) {
        $_OPSEGU = "IS41PA";
        let datos_envio = datosEnvio()
        datos_envio += $_ADMINW + '|' + $_OPSEGU
        let URL = get_url("APP/CONTAB/CON904.DLL");
        postData({ datosh: datos_envio }, URL)
            .then(function (data) {
                _evaluarconvenio_SAL7411();
            })
            .catch(err => {
                console.debug(err);
                _evaluarnit_SAL7411();
            })
    }
    else {
        _evaluarconvenio_SAL7411();
    }
}


function _evaluarconvenio_SAL7411() {
    validarInputs({
        form: "#CONVENIO_108",
        orden: "1"
    },
        function () { _evaluarnit_SAL7411(); },
        () => {
            SER108.CONVENIOW = $("#convenio_108").val();
            if ($_CONVENIOTER != SER108.CONVENIOW) {
                $_OPSEGU = "IS41F"
                let datos_envio = datosEnvio()
                datos_envio += $_ADMINW + '|' + $_OPSEGU
                let URL = get_url("APP/CONTAB/CON904.DLL");
                postData({ datosh: datos_envio }, URL)
                    .then(function (data) {
                        consultaconvenio_SAL7411();
                    })
                    .catch(err => {
                        console.debug(err);
                        _evaluarconvenio_SAL7411();
                    })
            } else {
                consultaconvenio_SAL7411();
            }
        }
    )
}

function consultaconvenio_SAL7411() {
    LLAMADO_DLL({
        dato: [SER108.CONVENIOW],
        callback: _dataSER108_06,
        nombredll: 'SER108-06',
        carpeta: 'SALUD'
    });
}

function _dataSER108_06(data) {
    var date = data.split("|");
    var swinvalid = date[0].trim();
    $_DESCRIPTAR = date[1].trim();
    if (swinvalid == "00") {
        $("#conveniod_108").val($_DESCRIPTAR);
        _datoestado();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarconvenio_SAL7411();
    } else {
        CON852(date[0], date[1], date[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}


function _datoestado() {
    if (SER108.NOVEDAD == "7") {
        SER108.ESTADOW = "0";
        $("#estado_108").val("0 - ACTIVO");
        _evaluarestado6_SAL7411();
    } else {
        if ($_ADMINW == "GEBC") {
            _cambiarestado_SAL7411();
        }
        else {
            if (parseInt($_AÑOPACI_ING7411) > 1999) {
                setTimeout(ventanaclave, 300)
            }
        }
    }

}

function _cambiarestado_SAL7411() {
    var estado = '[{"COD": "0","DESCRIP": "ACTIVO"},{"COD": "1", "DESCRIP": "INACTIVO"},{"COD": "2","DESCRIP": "ANULADO"},{"COD": "3","DESCRIP": "BLOQUEO"}]'
    var estados = JSON.parse(estado);
    POPUP({
        array: estados,
        titulo: 'ESTADO',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_ESTADONUM,
        callback_f: _evaluarconvenio_SAL7411,
        teclaAlterna: true
    },
        _evaluarcambiarestado_SAL7411
    )
}

function _evaluarcambiarestado_SAL7411(estados) {
    SER108.ESTADOW = estados.COD;
    switch (estados.COD) {
        case '0':
        case '1':
        case '2':
        case '3':
            _evaluarestado_SAL7411()
            break;
        default:
            _evaluarconvenio_SAL7411();
            break;
    }
    $("#estado_108").val(estados.COD + " - " + estados.DESCRIP);
}

function _evaluarestado_SAL7411() {
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    if (($_NITUSU == "0900147959") && (SER108.NOVEDAD == "8") && ($_ESTADONUM == "0") && (SER108.ESTADOW == "1")) {
        $_FACTURANUMW = $_LLAVENUM;
        $("#factura_108").val($_FACTURANUMW);
        if ($_NRO1NUMW == "9") {
            _evaluarestado2_SAL7411();
        } else {
            CON851('14', '14', null, 'error', 'error');
            SER108.ESTADOW = $_ESTADONUM;
            $("#estado_108").val(SER108.ESTADOW);
            setTimeout(_cambiarestado_SAL7411, 300)
        }

    } else if ((SER108.ESTADOW == '1') && ($_ESTADONUM != '1')) {
        if (($_ADMINW == 'GEBC') || ($_ADMINW == 'JAPV')) {
            _evaluarestado2_SAL7411();
        } else {
            CON851('14', '14', null, 'error', 'error');
            SER108.ESTADOW = $_ESTADONUM;
            $("#estado_108").val(SER108.ESTADOW);
            setTimeout(_cambiarestado_SAL7411, 300)
        }
    } else {
        _evaluarestado2_SAL7411();
    }
}

function _evaluarestado2_SAL7411() {
    if (($_NITUSU == "0844001287") && (SER108.NOVEDAD == "8")) {
        SER108.OPERBLOQNUM = "GEBC";
        $("#bloqueo_108").val(SER108.OPERBLOQNUM);
        _evaluarestado3_SAL7411();
    } else if ($_NITUSU == '0845000038') {
        if ($_ESTADONUM == "1") {
            if ($_ESTADOW == '0') {
                $_OPSEGU = "IS41D";
                let datos_envio = datosEnvio()
                datos_envio += $_ADMINW + '|' + $_OPSEGU
                let URL = get_url("APP/CONTAB/CON904.DLL");
                postData({ datosh: datos_envio }, URL)
                    .then(function (data) {
                        _evaluarestado3_SAL7411();
                    })
                    .catch(err => {
                        console.debug(err);
                        setTimeout(_cambiarestado_SAL7411, 300)
                    })
            } else {
                _evaluarestado3_SAL7411();
            }
        } else {
            _evaluarestado3_SAL7411();
        }
    } else {
        _evaluarestado3_SAL7411();
    }
}

function _evaluarestado3_SAL7411() {
    if (SER108.NOVEDAD == "8" && $_ESTADONUM == "1" && SER108.OPERBLOQNUM != $_ADMINW) {
        $_OPSEGU = "IS41B";
        let datos_envio = datosEnvio()
        datos_envio += $_ADMINW + '|' + $_OPSEGU
        let URL = get_url("APP/CONTAB/CON904.DLL");
        postData({ datosh: datos_envio }, URL)
            .then(function (data) {
                console.log(data, 'CON904')
                _evaluarestado4_SAL7411();
                // if (SER108.NOVEDAD == "8" && SER108.ESTADOW != $_ESTADONUM && $_AÑOPACI_RET7411 > 0) {
                //     console.log('NOVEDAD 8')
                //     if ($_ANOALFA != parseInt($_AÑOPACI_RET7411) || $_MESLNK != parseInt($_MESPACI_RET7411)) {
                //         console.log('FECHA ALFA')
                //         CON851('91', '91', null, 'error', 'error');
                //         if ($_MESLNK == "01" || $_ADMINW == "GEBC" || $_ADMINW == "ADMI" || $_ADMINW == "JAPV") {
                //             _evaluarestado4_SAL7411();
                //         }else {
                //             SER108.ESTADOW = $_ESTADONUM;
                //             $("#estado_108").val(SER108.ESTADOW);
                //             setTimeout(_cambiarestado_SAL7411, 300)
                //         }
                //     }else{
                //         evaluarestado4_SAL7411();
                //     }
                // } else {
                //     _evaluarestado4_SAL7411();
                // }
            })
            .catch(err => {
                console.debug(err);
                _evaluarfactura();
            })
    } else {
        _evaluarestado4_SAL7411();
    }
}

function _evaluarestado4_SAL7411() {
    if ((SER108.NOVEDAD == '8') && (SER108.ESTADOW == '1') && (($_ESTADONUM == '0') || ($_ESTADONUM == '2'))) {
        if (($_ADMINW == 'GEBC') || ($_ADMINW == 'ADMI') || ($_ADMINW == 'JAPV')) {
            _evaluarestado5_SAL7411();
        } else {
            CON851('14', '14', null, 'error', 'error');
            SER108.ESTADOW = $_ESTADONUM;
            $("#estado_108").val(SER108.ESTADOW);
            setTimeout(_cambiarestado_SAL7411, 300)
        }
    } else if (($_NITUSU == "0832002436") && (SER108.NOVEDAD == "8") && (($_ESTADONUM == "1") || ($_ESTADONUM == "0")) && (SER108.ESTADOW == "2")) {
        CON851('14', '14', null, 'error', 'error');
        if (($_ADMINW == "GEBC") || ($_ADMINW == "ADMI")) {
            _evaluarestado5_SAL7411();
        }
        else {
            setTimeout(_cambiarestado_SAL7411, 300)
        }
    } else {
        _evaluarestado5_SAL7411();
    }
}

function _evaluarestado5_SAL7411() {
    if ((SER108.NOVEDAD == "8") && (SER108.ESTADOW != $_ESTADONUM) && ($_AÑOPACI_RET7411 > 0)) {
        if ($_ANOALFA != parseInt($_AÑOPACI_RET7411) || $_MESLNK != parseInt($_MESPACI_RET7411)) {
            CON851('91', '91', null, 'error', 'error');
            if (($_MESLNK == "01") || ($_ADMINW == "GEBC") || ($_ADMINW == "ADMI") || (($_ADMINW == "JAPV"))) {
                _evaluarestado6_SAL7411();;
            } else {
                SER108.ESTADOW = $_ESTADONUM;
                $("#estado_108").val(SER108.ESTADOW);
                setTimeout(_cambiarestado_SAL7411, 300)
            }
        } else {
            _evaluarestado6_SAL7411();;
        }
    } else if (($_ESTADONUM != "1") && (SER108.ESTADOW == "1")) {
        CON851('1B', '1B', null, 'error', 'error');
        if (($_ADMINW == "GEBC") || ($_ADMINW == "ADMI") || ($_ADMINW == "JAPV")) {
            _evaluarestado6_SAL7411();;
        }
        else {
            SER108.ESTADOW = $_ESTADONUM;
            $("#estado_108").val(SER108.ESTADOW);
            _evaluarfactura();
        }
    } else if (($_ESTADONUM == "1") && (SER108.ESTADOW != "1")) {
        $_OPSEGU = "IS410";
        let datos_envio = datosEnvio()
        datos_envio += $_ADMINW + '|' + $_OPSEGU
        let URL = get_url("APP/CONTAB/CON904.DLL");
        postData({ datosh: datos_envio }, URL)
            .then(function (data) {
                _evaluarestado6_SAL7411();;
            })
            .catch(err => {
                console.debug(err);
                _evaluarfactura();
            })
    } else {
        _evaluarestado6_SAL7411();
    }
}

function _evaluarestado6_SAL7411() {
    // if (SER108.ESTADOW == '2' && SER108.NOVEDAD == "8" && $_USUA_GLOBAL[0].NIT == 892000264) {
    //     _evaluarobservacion_SAL7411()
    // } else {
        if ((SER108.NOVEDAD == "8" || SER108.NOVEDAD == "7") && (SER108.ESTADOW == "0") && (($_PREFIJOW == "P") || ($_PREFIJOW == "T") || ($_PREFIJOW == "O") || ($_PREFIJOW == "Q") || ($_PREFIJOW == "R") || ($_PREFIJOW == "S") ||
            ($_PREFIJOW == "U") || ($_PREFIJOW == "V") || ($_PREFIJOW == "W") || ($_PREFIJOW == "X") || ($_PREFIJOW == "Y") || ($_PREFIJOW == "Z"))) {
            _ventanaipsante();
        } else {
            _evaluarretencion();
        }
    // }
}

function _evaluarretencion() {
    if ($_NITUSU == "0844002258") {
        validarInputs({
            form: "#RETENCION_108",
            orden: "1"
        }, function () { _evaluarconvenio_SAL7411(); },
            () => {
                SER108.PORCRETENCW = $("#retencion_108").val();
                _evaluardatosucur_SER108()
            }
        )
    }
    else {
        SER108.PORCRETENCW = "00";
        $("#retencion_108").val(SER108.PORCRETENCW);
        _evaluardatosucur_SER108()
    }
}

function _evaluardatosucur_SER108() {
    if (SER108.SUCURSALW.trim() == '') SER108.SUCURSALW = $_USUA_GLOBAL[0].PREFIJ; $("#sucur_108").val($_USUA_GLOBAL[0].PREFIJ);

    if ($_NITUSU == 800037021 && SER108.SUCURSALW == 'GR') SER108.SUCURSALW = '01'
    validarInputs({
        form: "#SUCARSAL_108",
        orden: "1"
    }, function () { _evaluarconvenio_SAL7411(); },
        () => {
            SER108.SUCURSALW = $("#sucur_108").val();
            const res = SER108.SUCURSAL.find(e => e.CODIGO == SER108.SUCURSALW);
            if (res == undefined) {
                CON851("01", "01", _evaluardatosucur_SER108(), "error", "error");
            } else {
                $("#descripsucur_108").val(res.DESCRIPCION);
                _datopic_SAL7411()
            }
        }
    )

}

function _datopic_SAL7411() {
    if (($_NITUSU == "0844001287") && ($_ACTTER == "31")) {
        validarInputs({
            form: "#PIC_108",
            orden: "1"
        }, () => { _evaluarconvenio_SAL7411() },
            () => {
                SER108.CTAPICW = $("#pic_108").val();
                var numero = parseInt(SER108.CTAPICW);
                if (numero == 0) {
                    CON851('02', '02', null, 'error', 'error');
                    _datopic_SAL7411();
                }
                else {
                    _dato1p_SAL7411();
                }
            }
        )
    } else {
        SER108.CTAPICW = " ";
        _dato1p_SAL7411();
    }
}

function _dato1p_SAL7411() {
    $_SWPAC = '0';
    if (SER108.NOVEDAD == '7') {
        if ((($_PREFIJOW == "P") || ($_PREFIJOW == "T") || ($_PREFIJOW == "O") || ($_PREFIJOW == "Q") || ($_PREFIJOW == "R") || ($_PREFIJOW == "S") ||
            ($_PREFIJOW == "U") || ($_PREFIJOW == "V") || ($_PREFIJOW == "W") || ($_PREFIJOW == "X") || ($_PREFIJOW == "Y") || ($_PREFIJOW == "Z")) || ($_NITUSU == '0800251482')) {
            _evaluarpaciente_SAL7411();
        } else {
            SER108.IDPACW = '1';
            $('#idpaciente_108').val(SER108.IDPACW)
            _evaluarpaciente_SAL7411();
        }
    } else if ((SER108.NOVEDAD == '7') && (SER108.IDPACW.trim() == ' ') && ($_PACILNK != ' ')) {
        SER108.IDPACW = $_PACILNK;
        _evaluarpaciente_SAL7411();
    } else if ((SER108.NOVEDAD == '8') && (($_PREFIJOW == "P") || ($_PREFIJOW == "T") || ($_PREFIJOW == "O") || ($_PREFIJOW == "Q") || ($_PREFIJOW == "R") || ($_PREFIJOW == "S") ||
        ($_PREFIJOW == "U") || ($_PREFIJOW == "V") || ($_PREFIJOW == "W") || ($_PREFIJOW == "X") || ($_PREFIJOW == "Y") || ($_PREFIJOW == "Z"))) {
        SER108.IDPACW2 = SER108.IDPACW;
        _evaluarpaciente_SAL7411();
    } else if (($_NITUSU == '0844003225') || ($_NITUSU == '0800037021') && (($_PREFIJOW == "P") || ($_PREFIJOW == "T") || ($_PREFIJOW == "O") || ($_PREFIJOW == "Q") || ($_PREFIJOW == "R") || ($_PREFIJOW == "S") ||
        ($_PREFIJOW == "U") || ($_PREFIJOW == "V") || ($_PREFIJOW == "W") || ($_PREFIJOW == "X") || ($_PREFIJOW == "Y") || ($_PREFIJOW == "Z")) && (SER108.NOVEDAD == '7') && ($_PACI2W != ' ')) {
        SER108.IDPACW = $_PACI2W;
        _evaluarpaciente_SAL7411();
    } else {
        _evaluarpaciente_SAL7411();
    }
}

function _evaluarpaciente_SAL7411() {

    validarInputs({
        form: "#PACIENTE_108",
        orden: "1"
    }, function () { _evaluarconvenio_SAL7411(); },
        () => {
            $_NROCOMP = ' ';
            SER108.IDPACW = $("#idpaciente_108").val();
            SER108.IDPACW = SER108.IDPACW.padStart(15, "0");
            $("#idpaciente_108").val(SER108.IDPACW);
            if (($_PREFIJOW == 'P') || ($_PREFIJOW == 'T') || ($_PREFIJOW == 'O') || ($_PREFIJOW == 'Q') || ($_PREFIJOW == 'R') || ($_PREFIJOW == 'S') || ($_PREFIJOW == 'U') || ($_PREFIJOW == 'V') ||
                ($_PREFIJOW == 'W') || ($_PREFIJOW == 'X') || ($_PREFIJOW == 'Y') || ($_PREFIJOW == 'Z')) {

                if (SER108.IDPACW == SER108.IDPACW2) {
                    _leerpaciente_SAL7411();
                } else {
                    // _leerpaciente_SAL7411();
                    postData({ datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|${SER108.LLAVEW}|${$_NROCOMP}|` },
                        get_url("APP/SALUD/SER835MO.DLL"))
                        .then(data => {
                            _dataSER835MO_01(data);
                        })
                        .catch(err => {
                            console.error(err);
                            _evaluarpaciente_SAL7411();
                        });
                }
            } else {
                _leerpaciente_SAL7411();
            }
        }
    )
}


function _dataSER835MO_01(data) {
    $_NROCOMPW = data;
    if ($_NROCOMPW > '0000') {
        CON851('7P', '7P', null, 'error', 'error');
        return _leerpaciente_SAL7411();
    }
    if ($_NROCOMPW < '0000') {
        return _leerpaciente_SAL7411();
    }

    _leerpaciente_SAL7411();
}

function _leerpaciente_SAL7411() {

    if ((($_PREFIJOW == 'T') || ($_PREFIJOW == 'V') || ($_PREFIJOW == 'W') || ($_PREFIJOW == 'Y') || ($_PREFIJOW == 'Z')) && (SER108.IDPACW == "000000000000001")) {
        if ($_NITUSU == "0830092719") {
            LLAMADO_DLL({
                dato: [SER108.IDPACW],
                callback: _dataSER108_07,
                nombredll: 'SER108-07',
                carpeta: 'SALUD'
            })
        }
        else {
            CON851('03', '03', null, 'error', 'error');
            _datopic_SAL7411();
        }
    } else if (SER108.IDPACW == '000000000000001') {
        $("#edad_108").val('');
        _buscarfacturarepetida();

    } else if ((SER108.IDPACW == '000000000000000') || (SER108.IDPACW.trim() == '')) {
        CON851('', 'Por favor escriba la identificacion de paciente', null, 'error', 'error');
        _dato1p_SAL7411();
    } else {
        LLAMADO_DLL({
            dato: [SER108.IDPACW],
            callback: _dataSER108_07,
            nombredll: 'SER108-07',
            carpeta: 'SALUD'
        })
    }
}

function _dataSER108_07(data) {
    var date = data.split("|");
    var swinvalid = date[0];
    $_DERECHOPACI = date[1];
    $_NACIMPACI = date[2];
    $_EPSPACI = date[3];
    SER108.DESCRIPPACINUM = date[4].trim();
    if (swinvalid == "00") {
        if (($_NITUSU == '0800037021') && ($_PREFIJOW == 'A') || ($_PREFIJOW == 'B') || ($_PREFIJOW == 'D') || ($_PREFIJOW == 'F') || ($_PREFIJOW == 'G') || ($_PREFIJOW == 'H') || ($_PREFIJOW == 'I') || ($_PREFIJOW == 'J') || ($_PREFIJOW == 'K') || ($_PREFIJOW == 'L') || ($_PREFIJOW == 'M') || ($_PREFIJOW == 'N')) {
            _revisarbloqueos_SER108(_validandoleerpaciente, _evaluarpaciente_SAL7411, params = { CODIGO: 'IS767' });
        } else {
            _validandoleerpaciente();
        }
    } else if (swinvalid == "01") {
        if ($_SWPAC = '0') {
            $_SWPAC = '1';
            let { ipcRenderer } = require("electron");
            ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110C.html', cedula: SER108.IDPACW.padStart(15, '0') });
            vector = ['on', 'Actualizando maestro de pacientes...']
            _EventocrearSegventana(vector, _evaluarpaciente_SAL7411);
        } else {
            CON851('01', '01', null, 'error', 'error');
            _dato1p_SAL7411();
        }
    } else {
        CON852(date[0], date[1], date[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _validandoleerpaciente() {
    $("#idpaciented_108").val(SER108.DESCRIPPACINUM);
    var edad = calcular_edad($_NACIMPACI);
    $("#edad_108").val(edad.unid_edad + edad.vlr_edad.toString().padStart('0'));
    $_UNIDEDADW = edad.unid_edad;
    $_VLREDADW = edad.vlr_edad.toString().padStart('0');
    if (($_NITUSU == "0800162035") && ($_DERECHOPACI == "2")) {
        CON851('80', '80', null, 'error', 'error');
        _buscarfacturarepetida();
    } else if (($_NITUSU == "0800162035") && ($_USUA_GLOBAL[0].PREFIJ == "01") && (($_PREFIJOW == 'P') || ($_PREFIJOW == 'O') || ($_PREFIJOW == 'Q') || ($_PREFIJOW == 'R') || ($_PREFIJOW == 'S') || ($_PREFIJOW == 'U')) && ((SER108.NITW != "0222222222") || (SER108.NITW != "9999"))) {
        if ($_ENTIDADTER.trim() != $_EPSPACI.trim()) {
            if ($_ENTIDADTER == '9999') {
                _buscarfacturarepetida();
            } else {
                // CON851('9S', '9S', null, 'error', 'error');
                if (($_ADMINW == "YPCL") || ($_ADMINW == "ADMI") || ($_ADMINW == "GEBC")) {
                    _buscarfacturarepetida();
                } else {
                    // _dato1p_SAL7411();
                    _buscarfacturarepetida();
                }
            }
        } else {
            _buscarfacturarepetida();
        }
    } else {
        _buscarfacturarepetida();
    }
}

function _buscarfacturarepetida() {
    if (($_NITUSU == "0845000038") || ($_NITUSU == "0900541158")) {
        _datotipof();
    } else {
        $_FECHABUSQORIGINAL = moment().format('YYYYMMDD');
        $_ANOBUSQORI = $_FECHABUSQORIGINAL.substring(0, 4);
        $_MESBUSQORI = $_FECHABUSQORIGINAL.substring(4, 6);

        if ((($_NITUSU == "0900471031") || ($_NITUSU == "0900004059")) && (SER108.NOVEDAD == "7") && (($_PREFIJOW == "A") || ($_PREFIJOW == "B") || ($_PREFIJOW == "D") || ($_PREFIJOW == "F") || ($_PREFIJOW == "G") || ($_PREFIJOW == "H") ||
            ($_PREFIJOW == "I") || ($_PREFIJOW == "J") || ($_PREFIJOW == "K") || ($_PREFIJOW == "L") || ($_PREFIJOW == "M") || ($_PREFIJOW == "N"))) {
            $_MESBUSQ = $_FECHABUSQ.substring(4, 6);
            $_ANOBUSQ = $_FECHABUSQ.substring(0, 4);
            if ($_MESBUSQORI > 1) {
                $_MESBUSQw = $_MESBUSQORI - 1;
                $_DIABUSQ = $_FECHABUSQ.substring(8, 6);
                $_MESBUSQ = $_FECHABUSQ.substring(4, 6);
                $_ANOBUSQ = $_FECHABUSQ.substring(0, 4);
                $_FECHABUSQENV = $_ANOBUSQ + $_MESBUSQW + $_DIABUSQ;
                _evaluarcondipac1_SER108()
            } else {
                if ($_MESBUSQORI == 01) {
                    $_FECHABUSQENV = $_FECHABUSQORIGINAL
                    _evaluarcondipac1_SER108()
                } else {
                    $_MESBUSQW = 12;
                    $_ANOBUSQW = $_ANOBUSQORI - 1;
                    $_DIABUSQ = $_FECHABUSQ.substring(6, 8);
                    $_MESBUSQ = $_FECHABUSQ.substring(4, 6);
                    $_ANOBUSQ = $_FECHABUSQ.substring(0, 4);
                    $_FECHABUSQENV = $_ANOBUSQW + $_MESBUSQW + $_DIABUSQ;
                    _evaluarcondipac1_SER108()
                }
            }
        } else if ((SER108.NOVEDAD == "7") && (($_PREFIJOW == "P") || ($_PREFIJOW == "T") || ($_PREFIJOW == "O") || ($_PREFIJOW == "Q") || ($_PREFIJOW == "R") || ($_PREFIJOW == "S") ||
            ($_PREFIJOW == "U") || ($_PREFIJOW == "V") || ($_PREFIJOW == "W") || ($_PREFIJOW == "X") || ($_PREFIJOW == "Y") || ($_PREFIJOW == "Z"))) {
            if ($_MESBUSQORI > 1) {
                $_MESBUSQW = $_MESBUSQORI - 1;
                $_MESBUSQW = cerosIzq($_MESBUSQW, 2)
                $_DIABUSQ = $_FECHABUSQ.substring(6, 8);
                $_MESBUSQ = $_FECHABUSQ.substring(4, 6);
                $_ANOBUSQ = $_FECHABUSQ.substring(0, 4);
                $_FECHABUSQENV = $_ANOBUSQ + $_MESBUSQW + $_DIABUSQ;
                _evaluarcondipac2_SER108()
            } else {
                if ($_MESBUSQORI == 01) {
                    $_FECHABUSQENV = $_FECHABUSQORIGINAL
                    _evaluarcondipac2_SER108()
                } else {
                    $_MESBUSQW = 12;
                    $_ANOBUSQW = $_ANOBUSQORI - 1;
                    $_DIABUSQ = $_FECHABUSQ.substring(6, 8);
                    $_MESBUSQ = $_FECHABUSQ.substring(4, 6);
                    $_ANOBUSQ = $_FECHABUSQ.substring(0, 4);
                    $_FECHABUSQENV = $_DIABUSQ + $_MESBUSQW + $_ANOBUSQW;
                    _evaluarcondipac2_SER108()
                }
            }
        } else if (($_NITUSU == "0800251482") && (SER108.NOVEDAD == "7") && (($_PREFIJOW == "A") || ($_PREFIJOW == "P") || ($_PREFIJOW == "B") || ($_PREFIJOW == "D") || ($_PREFIJOW == "F") ||
            ($_PREFIJOW == "G") || ($_PREFIJOW == "H") || ($_PREFIJOW == "I") || ($_PREFIJOW == "J") || ($_PREFIJOW == "K") || ($_PREFIJOW == "L") || ($_PREFIJOW == "M") || ($_PREFIJOW == "N") ||
            ($_PREFIJOW == "O") || ($_PREFIJOW == "Q") || ($_PREFIJOW == "R") || ($_PREFIJOW == "S") || ($_PREFIJOW == "U"))) {
            $_MESBUSQ = $_FECHABUSQ.substring(4, 6);
            $_ANOBUSQ = $_FECHABUSQ.substring(0, 4);
            $_DIABUSQ = 05;
            $_FECHABUSQENV = $_DIABUSQ + $_MESBUSQ + $_ANOBUSQ;
            terceroconsultaSER836C_SER108()
        } else {
            _datotipof();
        }

    }
}
function _evaluarcondipac1_SER108() {
    if (SER108.IDPACW != "000000000000001") {
        primerconsultaSER836C_SER108()
    } else {
        _datotipof();
    }
}

function _evaluarcondipac2_SER108() {
    if (SER108.IDPACW != "000000000000001") {
        segundoconsultaSER836C_SER108()
    } else {
        _datotipof();
    }
}

function primerconsultaSER836C_SER108() {
    postData({ datosh: datosEnvio() + SER108.IDPACW + '|' + $_FECHABUSQENV + '|' + SER108.LLAVEW + '|' }, get_url("APP/SALUD/SER836C.DLL"))
        .then(data => {
            SER108.FACTDUPLICADA = data.REPETIDO
            $_FACTP = SER108.FACTDUPLICADA[0].FACTURA
            if ($_FACTP.trim() == '') {
                $('#factrepetida_108').val(' ')
                _datotipof();
            }
            else {
                $('#factrepetida_108').val($_FACTP)
                CON851('1K', '1K', null, 'error', 'error');
                _evaluarpaciente_SAL7411()
                // _datotipof();

            }
        })
        .catch(err => {
            _datotipof();
        });
}

function segundoconsultaSER836C_SER108() {
    postData({ datosh: datosEnvio() + SER108.IDPACW + '|' + $_FECHABUSQENV + '|' + SER108.LLAVEW + '|' }, get_url("APP/SALUD/SER836C.DLL"))
        .then(data => {
            SER108.FACTDUPLICADA = data.REPETIDO
            $_FACTP = SER108.FACTDUPLICADA[0].FACTURA
            if ($_FACTP.trim() == '') {
                $_FACTP = ''
                $('#factrepetida_108').val($_FACTP)
                _datotipof();
            }
            else {
                $('#factrepetida_108').val($_FACTP)
                CON851('Factura: ' + $_FACTP, '1K', null, 'error', 'error');
                $_OPSEGU = "IS41Q";
                let datos_envio = datosEnvio()
                datos_envio += $_ADMINW + '|' + $_OPSEGU
                let URL = get_url("APP/CONTAB/CON904.DLL");
                postData({ datosh: datos_envio }, URL)
                    .then(function (data) {
                        // _datotipof();
                        _evaluarpaciente_SAL7411()
                    })
                    .catch(err => {
                        console.debug(err);
                        if ((($_NITUSU == '0800162035') && ($_USUA_GLOBAL[0].PREFIJ == '08')) || ($_NITUSU == '0892000401')) {
                            _datotipof();
                        } else {
                            // _dato1p_SAL7411
                            _evaluarpaciente_SAL7411();
                        }
                    })
            }
        })
        .catch(err => {
            console.error(err)
            _datotipof();
        });
}

function terceroconsultaSER836C_SER108() {
    postData({ datosh: datosEnvio() + SER108.IDPACW + '|' + $_FECHABUSQENV + '|' + SER108.LLAVEW + '|' }, get_url("APP/SALUD/SER836C.DLL"))
        .then(data => {
            SER108.FACTDUPLICADA = data.REPETIDO
            $_FACTP = SER108.FACTDUPLICADA[0].FACTURA
            if ($_FACTP.trim() == "") {
                $('#factrepetida_108').val(' ')
                _datotipof();
            }
            else {
                $('#factrepetida_108').val($_FACTP)
                CON851('1K', '1K', null, '', 'error');
                // _datotipof();
                _evaluarpaciente_SAL7411()
            }
        })
        .catch(err => {
            _datotipof();
        });
}


function _datotipof() {
    if ($_NITUSU != "0900004059") {
        _dato2p();
    }
    else {
        var tipofacw = [
            { "COD": "1", "DESCRIP": "EVENTO" },
            { "COD": "2", "DESCRIP": "CAPITA" }
        ]
        POPUP({
            array: tipofacw,
            titulo: 'CONSULTA TIPOS DE FACTURA',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            seleccion: $_TIPOFACTNUM,
            callback_f: _evaluarpaciente_SAL7411
        },
            _evaluartipofacs);
    }
}

function _evaluartipofacs(tipofacw) {
    SER108.TIPOFACTW = tipofacw.COD;
    switch (tipofacw.COD) {
        case '1':
        case '2':
            _dato2p();
            break;
        default:
            $("#idpaciente_108").val("");
            $("#idpaciented_108").val("");
            _evaluarpaciente_SAL7411();
            break;
    }
}

function _dato2p() {
    if (SER108.IDPACW == "000000000000001") {
        validarInputs({
            form: "#DESCRIPPACI_108",
            orden: "1"
        },
            function () { _evaluarpaciente_SAL7411(); },
            () => {
                SER108.DESCRIPPACINUM = $("#idpaciented_108").val();
                _evaluarhabitacion_SAL7411();
            }
        )
    } else {
        _evaluarhabitacion_SAL7411();
    }
}

function _evaluarhabitacion_SAL7411() {
    validarInputs({
        form: "#HABIT_108",
        orden: "1"
    },
        function () { _evaluarpaciente_SAL7411(); },
        () => {
            SER108.HABW = $("#habit_108").val();
            var habw = SER108.HABW.trim().toUpperCase();

            if ((habw.trim() == '') && ($_PREFIJOW == 'P') || ($_PREFIJOW == 'O') || ($_PREFIJOW == 'Q') || ($_PREFIJOW == 'R') || ($_PREFIJOW == 'S') || ($_PREFIJOW == 'U')) {
                CON851('02', '02', null, 'error', 'error');
                _evaluarhabitacion_SAL7411();
            } else if (habw.trim() == '') {
                SER108.HABW = '';
                $_DESCRIPCAM = '';
                _evaluarporcent_SAL7411()
            } else if (habw.length > 000) {
                if (habw == 'SIN') {
                    SER108.HABW = 'SIN';
                    $_DESCRIPCAM = '';
                    _evaluarporcent_SAL7411()
                }
                else {
                    LLAMADO_DLL({
                        dato: [SER108.HABW],
                        callback: _dataSER108_08,
                        nombredll: 'SER108-08',
                        carpeta: 'SALUD'
                    });
                }
            }
        }
    )
}

function _dataSER108_08(data) {
    var date = data.split("|");
    var swinvalid = date[0].trim();
    $_ESTADOCAM = date[1];
    if (swinvalid == "00") {
        if ((SER108.NOVEDAD == '7') && ($_ESTADOCAM > '0')) {
            CON851('1F', '1F', null, 'error', 'error');
            _evaluarhabitacion_SAL7411();
        } else {
            _evaluarporcent_SAL7411();
        }
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarhabitacion_SAL7411();
    }
    else {
        CON852(date[0], date[1], date[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _evaluarporcent_SAL7411() {
    validarInputs({
        form: "#PORCENT_108",
        orden: "1"
    },
        function () { _evaluarhabitacion_SAL7411(); },
        () => {
            SER108.PORCENCOPAGOW = vlrcopago_7411Mask.value.replace(',', '');
            if (SER108.PORCENCOPAGOW == '') {
                vlrcopago_7411Mask.value = '000';
                _validacionesfecha_SAL7411();
            } else {
                _validacionesfecha_SAL7411();
            }
        }

    )
}

function _validacionesfecha_SAL7411() {
    if ((SER108.NOVEDAD == '7') && (SER108.ANOINGNUM.trim() == '' || SER108.AN0INGNUM == '0000')) {
        SER108.FECHAINGNUMW = moment().format("YYYYMMDD");
        SER108.ANOINGNUM = SER108.FECHAINGNUMW.substring(0, 4);
        SER108.MESINGNUM = SER108.FECHAINGNUMW.substring(4, 6);
        SER108.DIAINGNUM = SER108.FECHAINGNUMW.substring(6, 8);
        SER108.HORAINGNUMW = moment().format('HH:mm');
        $("#anoing_108").val(SER108.ANOINGNUM);
        $("#mesing_108").val(SER108.MESINGNUM);
        $("#diaing_108").val(SER108.DIAINGNUM);
        $("#horaing_108").val(SER108.HORAINGNUMW);
    }
    if ($_ESTADONUM == '1') {
        SER108.ANOINGNUM = $_AÑOPACI_ING7411;
        SER108.MESINGNUM = $_MESPACI_ING7411;
        SER108.DIAINGNUM = $_DIAPACI_ING7411;
        if ($_ADMINW == "GEBC" || $_ADMINW == "ADMI") {
            _evaluaranoingw_SAL7411();
        } else {
            _evaluarservicio_SAL7411();
        }
    } else {
        _evaluardiaingw_SAL7411();
    }

}

function _evaluaranoingw_SAL7411() {
    validarInputs({
        form: "#ANOING_108",
        orden: "1"
    },
        function () { _evaluarporcent_SAL7411(); },
        () => {
            SER108.ANOINGNUM = $("#anoing_108").val();
            if ($.isNumeric(SER108.ANOINGNUM)) {
                _evaluarmesingw_SAL7411();
            } else {
                CON851("57", "57", null, "error", "error");
                _evaluaranoingw_SAL7411();
            }
        }
    )
}

function _evaluarmesingw_SAL7411() {
    validarInputs({
        form: "#MESING_108",
        orden: "1",
        event_f5: _evaluaranoingw_SAL7411
    },
        function () { _evaluarporcent_SAL7411(); },
        () => {
            SER108.MESINGNUM = $("#mesing_108").val().padStart(2, "0");
            $("#mesing_108").val(SER108.MESINGNUM)
            if ($.isNumeric(SER108.MESINGNUM)) {
                _validardiaantesing_SAL7411();
            } else if (SER108.MESINGNUM < 1 || SER108.MESINGNUM > 12) {
                evaluarmesingw_SAL7411();
            } else {
                CON851("57", "57", null, "error", "error");
                _evaluarmesingw_SAL7411();
            }
        }
    )
}

function _validardiaantesing_SAL7411() {
    switch (parseInt(SER108.MESINGNUM)) {
        case 01:
            SER108.DIAMAX = 31;
            _evaluardiaingw_SAL7411();
            break;
        case 02:
            SER108.DIAMAX = 29;
            _evaluardiaingw_SAL7411();
            break;
        case 03:
            SER108.DIAMAX = 31;
            _evaluardiaingw_SAL7411();
            break;
        case 04:
            SER108.DIAMAX = 30;
            _evaluardiaingw_SAL7411();
            break;
        case 05:
            SER108.DIAMAX = 31;
            _evaluardiaingw_SAL7411();
            break;
        case 06:
            SER108.DIAMAX = 30;
            _evaluardiaingw_SAL7411();
            break;
        case 07:
            SER108.DIAMAX = 31;
            _evaluardiaingw_SAL7411();
            break;
        case 08:
            SER108.DIAMAX = 31;
            _evaluardiaingw_SAL7411();
            break;
        case 09:
            SER108.DIAMAX = 30;
            _evaluardiaingw_SAL7411();
            break;
        case 10:
            SER108.DIAMAX = 31;
            _evaluardiaingw_SAL7411();
            break;
        case 11:
            SER108.DIAMAX = 30;
            _evaluardiaingw_SAL7411();
            break;
        case 12:
            SER108.DIAMAX = 31;
            _evaluardiaingw_SAL7411();
            break;
        default:
            SER108.DIAMAX = 31;
            _evaluardiaingw_SAL7411();
            break;
    }
}

function _evaluardiaingw_SAL7411() {
    validarInputs({
        form: "#DIAING_108",
        orden: "1",
        event_f5: _evaluarmesingw_SAL7411
    },
        function () { _evaluarporcent_SAL7411(); },
        () => {
            SER108.DIAINGNUM = $("#diaing_108").val().padStart(2, "0");
            $("#diaing_108").val(SER108.DIAINGNUM)
            if ($.isNumeric(SER108.DIAINGNUM)) {
                _evaluaranosalw_SAL7411();
            } else {
                if (SER108.DIAINGNUM < 1 || SER108.DIAINGNUM > SER108.DIAMAX) {
                    _evaluardiaingw_SAL7411();
                } else {
                    CON851("57", "57", null, "error", "error");
                    _evaluardiaingw_SAL7411();
                }
            }
        }
    )
}


function _evaluaranosalw_SAL7411() {
    validarInputs({
        form: "#ANOSAL_108",
        orden: "1"
    },
        function () { _evaluardiaingw_SAL7411(); },
        () => {
            SER108.ANORETNUM = $("#anosal_108").val();
            if (SER108.ANORETNUM > 0 && SER108.ANORETNUM < SER108.ANOINGNUM) {
                CON851("37", "37", null, "error", "error");
                _evaluaranosalw_SAL7411();
            } else {
                if (SER108.ANORETNUM.trim() == '' || SER108.ANORETNUM == 0) {
                    SER108.ANORETNUM = '0000';
                    SER108.DIASALNUM = '00'
                    SER108.MESSALNUM = '00'
                    $("#anosal_108").val(SER108.ANORETNUM)
                    $("#messal_108").val(SER108.MESSALNUM)
                    $("#diasal_108").val(SER108.DIASALNUM)
                    _evaluarmessalw_SAL7411();
                } else {
                    if ($.isNumeric(SER108.ANORETNUM)) {
                        _evaluarmessalw_SAL7411();
                    } else {
                        CON851("57", "57", null, "error", "error");
                        _evaluaranosalw_SAL7411();
                    }
                }
            }
        }
    )
}

function _evaluarmessalw_SAL7411() {
    validarInputs({
        form: "#MESSAL_108",
        orden: "1"
    },
        function () { _evaluaranosalw_SAL7411(); },
        () => {
            SER108.MESSALNUM = $("#messal_108").val().padStart(2, '0');
            $("#messal_108").val(SER108.MESSALNUM)
            if (SER108.ANORETNUM > 0 && SER108.MESSALNUM == 0) {
                CON851("37", "37", null, "error", "error");
                return _evaluarmessalw_SAL7411()
            }
            if (SER108.ESTADOW == "1" && SER108.MESSALNUM == '00') {
                CON851("37", "37", null, "error", "error");
                return _evaluarmessalw_SAL7411();
            } else {
                if ($.isNumeric(SER108.MESSALNUM) && (SER108.MESSALNUM <= 12 || SER108.MESSALNUM >= 01)) {
                    _validardiaantessal_SAL7411();
                } else {
                    CON851("57", "57", null, "error", "error");
                    return _evaluarmessalw_SAL7411()
                }
            }
        }
    )
}

function _validardiaantessal_SAL7411() {
    switch (parseInt(SER108.MESSALNUM)) {
        case 01:
            SER108.DIAMAX2 = 31;
            _evaluardiasalw_SAL7411();
            break;
        case 02:
            SER108.DIAMAX2 = 29;
            _evaluardiasalw_SAL7411();
            break;
        case 03:
            SER108.DIAMAX2 = 31;
            _evaluardiasalw_SAL7411();
            break;
        case 04:
            SER108.DIAMAX2 = 30;
            _evaluardiasalw_SAL7411();
            break;
        case 05:
            SER108.DIAMAX2 = 31;
            _evaluardiasalw_SAL7411();
            break;
        case 06:
            SER108.DIAMAX2 = 30;
            _evaluardiasalw_SAL7411();
            break;
        case 07:
            SER108.DIAMAX2 = 31;
            _evaluardiasalw_SAL7411();
            break;
        case 08:
            SER108.DIAMAX2 = 31;
            _evaluardiasalw_SAL7411();
            break;
        case 09:
            SER108.DIAMAX2 = 30;
            _evaluardiasalw_SAL7411();
            break;
        case 10:
            SER108.DIAMAX2 = 31;
            _evaluardiasalw_SAL7411();
            break;
        case 11:
            SER108.DIAMAX2 = 30;
            _evaluardiasalw_SAL7411();
            break;
        case 12:
            SER108.DIAMAX2 = 31;
            _evaluardiasalw_SAL7411();
            break;
        default:
            SER108.DIAMAX2 = 31;
            _evaluardiasalw_SAL7411();
            break;
    }
}
function _evaluardiasalw_SAL7411() {
    validarInputs({
        form: "#DIASAL_108",
        orden: "1"
    },
        function () { _evaluarmessalw_SAL7411(); },
        () => {
            SER108.DIASALNUM = $("#diasal_108").val().padStart(2, '0');
            $("#diasal_108").val(SER108.DIASALNUM)
            if ((SER108.ANORETNUM > 0 || SER108.MESSALNUM > 0) && SER108.DIASALNUM == 0) {
                CON851("37", "37", null, "error", "error");
                return _evaluarmessalw_SAL7411()
            }
            if ((SER108.ESTADOW == "1" || SER108.ESTADOW == '2') && (SER108.DIASALNUM == '00')) {
                return _evaluardiasalw_SAL7411();
            } else {
                if (!$.isNumeric(SER108.DIASALNUM)) {
                    CON851("57", "57", null, "error", "error");
                    return _evaluardiasalw_SAL7411();
                } else {
                    if (SER108.DIASALNUM > SER108.DIAMAX2) {
                        CON851("37", "37", null, "error", "error");
                        return _evaluardiasalw_SAL7411();
                    } else {
                        _validaranosal_SAL7411();
                    }
                }
            }
        }
    )
}

function _validaranosal_SAL7411() {
    SER108.FECHAINGNUM = SER108.ANOINGNUM + SER108.MESINGNUM + SER108.DIAINGNUM;
    SER108.FECHASALNUM = SER108.ANORETNUM + SER108.MESSALNUM + SER108.DIASALNUM;

    if (SER108.MESSALNUM > 00 && SER108.FECHASALNUM < SER108.FECHAINGNUM) {
        CON851("", "Fecha de retiro no puede ser menor a la ingreso", null, "error", "error");
        return _evaluardiasalw_SAL7411();
    } else {
        if (SER108.FECHASALNUM > 0 && SER108.FECHASALNUM != SER108.FECHARETIROW) {
            SER108.HORASALW = moment().format('HH:mm');
            $_HORAPACI_RET7411 = SER108.HORASALW.substring(0, 2)
            $_MINPACI_RET7411 = SER108.HORASALW.substring(3, 5)
            $("#horasal_108").val(SER108.HORASALW);
        } else {
            if (SER108.FECHASALNUM == 0) {
                SER108.HORASALW = '0000';
                $_HORAPACI_RET7411 = SER108.HORASALW.substring(0, 2)
                $_MINPACI_RET7411 = SER108.HORASALW.substring(2, 4)
                $("#horasal_108").val($_HORAPACI_RET7411 + ':' + $_MINPACI_RET7411);
            }
        }
        _evaluarservicio_SAL7411();
    }
}

function _evaluarservicio_SAL7411() {
    SER108.REDEXTERW = '';
    validarInputs({
        form: "#SERVICIO_108",
        orden: "1"
    },
        function () { _evaluardiasalw_SAL7411(); },
        () => {
            SER108.SERVICIOW = $("#servicio_108").val();

            if ((($_PREFIJOW == 'P') || ($_PREFIJOW == 'T') || ($_PREFIJOW == 'O') || ($_PREFIJOW == 'Q') || ($_PREFIJOW == 'R') || ($_PREFIJOW == 'S') || ($_PREFIJOW == 'U') || ($_PREFIJOW == 'V') ||
                ($_PREFIJOW == 'W') || ($_PREFIJOW == 'X') || ($_PREFIJOW == 'Y') || ($_PREFIJOW == 'Z')) && ((SER108.SERVICIOW == "00") || (SER108.SERVICIOW.trim() == ""))) {
                CON851('02', '02', null, 'error', 'error');
                $("#servicio_108").val("");
                _evaluarservicio_SAL7411();
            }
            else if ((SER108.SERVICIOW == "00") || (SER108.SERVICIOW.trim() == "")) {
                if (SER108.SERVICIOW == "00") {
                    SER108.SERVICIOW = "00";
                    $_DESCRIPSERHO = "NO APLICA";
                    $("#servicio_108").val(SER108.SERVICIOW);
                    $("#descripservicio_108").val($_DESCRIPSERHO);
                    _evaluarcontrato();
                }
                else {
                    SER108.SERVICIOW = "00";
                    $_DESCRIPSERHO = "NO APLICA";
                    $("#servicio_108").val(SER108.SERVICIOW);
                    $("#descripservicio_108").val($_DESCRIPSERHO);
                    _evaluarcontrato();;
                }
            }
            else {
                LLAMADO_DLL({
                    dato: [SER108.SERVICIOW],
                    callback: _dataSER108_09,
                    nombredll: 'SER108-09',
                    carpeta: 'SALUD'
                });
            }
        }
    )
}

function _dataSER108_09(data) {
    var date = data.split("|");
    var swinvalid = date[0];
    $_DESCRIPSERHO = date[1].trim();
    if (swinvalid == "00") {
        $("#servicio_108").val(SER108.SERVICIOW);
        $("#descripservicio_108").val($_DESCRIPSERHO);
        if (($_NITUSU == "0800037979") && (($_PREFIJOW == "A") || ($_PREFIJOW == "B") || ($_PREFIJOW == "D") || ($_PREFIJOW == "F") || ($_PREFIJOW == "G") || ($_PREFIJOW == "H") || ($_PREFIJOW == "I") || ($_PREFIJOW == "J") || ($_PREFIJOW == "K") || ($_PREFIJOW == "L") || ($_PREFIJOW == "M") || ($_PREFIJOW == "O") || ($_PREFIJOW == "Q") || ($_PREFIJOW == "R") || ($_PREFIJOW == "S") || ($_PREFIJOW == "W") || ($_PREFIJOW == "X") || ($_PREFIJOW == "Y") || ($_PREFIJOW == "Z"))) {
            SER108.CONTRATOW = $_REFER1ATER;
            $("#contrato_108").val(SER108.CONTRATOW);
            _evaluarcontrato()

        } else {
            _evaluarcontrato()

        }

    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarservicio_SAL7411();
    } else {
        CON852(date[0], date[1], date[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _evaluarcontrato() {
    validarInputs({
        form: "#CONTRATO_108",
        orden: "1"
    },
        function () { _evaluarservicio_SAL7411(); },
        () => {
            SER108.CONTRATOW = $("#contrato_108").val();
            if ((($_PUCUSU == "4") || ($_PUCUSU == "6")) && ($_ACTTER == "31") && (SER108.CONTRATOW.trim() == "")) {
                CON851('02', '02', null, 'error', 'error');
                _evaluarcontrato();
            }
            else {
                _evaluarprecapit_SAL7411();
            }
        }
    )
}

function _evaluarprecapit_SAL7411() {
    if ($_ZONATER == "01") {
        SER108.FACTCAPITW = "";
        _evaluarcosto_SAL7411();
    }
    else {
        validarInputs({
            form: "#PRECAPIT_108",
            orden: "1"
        },
            function () { _evaluarcontrato(); },
            () => {
                $_PRECAPITW = $("#precapit_108").val();
                if ($_ZONATER == "02" && $_PRECAPITW.trim() == "" && $_NITUSU != 892000264) {
                    _evaluarprecapit_SAL7411()
                } else {
                    switch ($_PRECAPITW) {
                        case 'A':
                        case 'B':
                        case 'D':
                        case 'F':
                        case 'G':
                        case 'H':
                        case 'I':
                        case 'J':
                        case 'K':
                        case 'L':
                        case 'M':
                        case 'N':
                            _evaluarnrocapit_SAL7411()
                            break;
                        default:
                            $_PRECAPITW = ''
                            $_NROCAPITW = "";
                            $("#precapit_108").val($_PRECAPITW);
                            $("#capit_108").val($_NROCAPITW);
                            if (($_NITUSU == "000162035") && ((SER108.NITW == "0830006405") || ($_NITUSU == "0830003565") || ($_NITUSU == "0860525150"))) {
                                CON851('02', '02', null, 'error', 'error');
                                _evaluarprecapit_SAL7411();
                            }
                            else {
                                _evaluarcosto_SAL7411();
                            }
                            break;
                    }
                }
            }
        )
    }
}


function _evaluarnrocapit_SAL7411() {
    validarInputs({
        form: "#CAPIT_108",
        orden: "1"
    },
        function () { _evaluarcontrato(); },
        () => {
            $_NROCAPITW = $("#capit_108").val();
            $_NROCAPITW = $_NROCAPITW.padStart(6, "0");
            $("#capit_108").val($_NROCAPITW);
            SER108.FACTCAPITW = $_PRECAPITW + $_NROCAPITW;
            if (parseInt($_NROCAPITW) == 0) {
                $("#capit_108").val("");
                _evaluarnrocapit_SAL7411();
            }
            else if (SER108.FACTCAPITW == SER108.LLAVEW) {
                $("#capit_108").val($_NROCAPITW);
                _evaluardatored_SAL7411();
            }
            else {
                postData({ datosh: `${datosEnvio()}${$_PREFIJOW}|${SER108.FACTCAPITW}|${SER108.NITW}|${SER108.FECHAINGNUM}|${SER108.FECHASALNUM}` },
                    get_url("APP/SALUD/SER108C.DLL"))
                    .then(data => {
                        _evaluardatored_SAL7411();
                    })
                    .catch(err => {
                        console.error(err);
                        _evaluarnrocapit_SAL7411()
                    });
            }
        }
    )
}



function _evaluardatored_SAL7411() {
    if (($_PREFIJOW == 'P') || ($_PREFIJOW == 'T') || ($_PREFIJOW == 'O') || ($_PREFIJOW == 'Q') || ($_PREFIJOW == 'R') || ($_PREFIJOW == 'S') || ($_PREFIJOW == 'U') || ($_PREFIJOW == 'V') ||
        ($_PREFIJOW == 'W') || ($_PREFIJOW == 'X') || ($_PREFIJOW == 'Y') || ($_PREFIJOW == 'Z')) {
        SER108.REDEXTERW = "N";
        $("#redext_108").val(SER108.REDEXTERW);
        _evaluardiv_SAL7411();
    } else {
        validarInputs({
            form: "#REDEXT_108",
            orden: "1"
        },
            function () { _evaluarprecapit_SAL7411(); },
            () => {
                SER108.REDEXTERW = $("#redext_108").val();
                if ((SER108.REDEXTERW == 'S') || (SER108.REDEXTERW == 'N')) {
                    if (($_NITUSU == "0800162035") && (($_ADMINW == "MILE") || ($_NITUSU == "YPCL"))) {
                        _evaluarcosto_SAL7411();
                    } else if ((SER108.REDEXTERW == "S") && ($_NITUSU == "0800162035") && (SER108.NOVEDAD == "7")) {
                        $_SECUNUM = "9x"
                        LLAMADO_DLL({
                            dato: [$_SECUNUM],
                            callback: _dataCON007_02,
                            nombredll: 'CON007',
                            carpeta: 'CONTAB'
                        });
                    }
                    else {
                        _evaluardiv_SAL7411();
                    }
                } else if (SER108.REDEXTERW.trim() == '') {
                    SER108.REDEXTERW = 'N';
                    $("#redext_108").val();
                    _evaluardiv_SAL7411();
                } else {
                    _evaluardatored_SAL7411();
                }
            }
        )
    }
}

function _dataCON007_02(data) {
    var date = data.split("|");
    var NUMEROCTL = date[4];
    if (SER108.NOVEDAD == "7") {
        var $_NROW = NUMEROCTL;
        $("#capit_108").val($_NROW);
        _evaluarcosto_SAL7411();
    }
    else {
        var $_NROW = parseInt(NUMEROCTL) - 1;
        $("#capit_108").val($_NROW);
        _evaluarcosto_SAL7411();
    }
}

function _evaluarcosto_SAL7411() {
    if ($_NITUSU == "0844004197" || $_NITUSU == "0900198903" || $_NITUSU == "0892001990" ||
        $_NITUSU == "0845000038" || $_NITUSU == "0800251482" || $_NITUSU == "0900565371" ||
        $_NITUSU == "0900658867" || $_NITUSU == "0900566047" || $_NITUSU == "0900541158" ||
        $_NITUSU == "0900471031") {
        validarInputs({
            form: "#COSTOS_108",
            orden: "1"
        },
            function () { _evaluarcontrato(); },
            () => {
                SER108.CCOSTOW = $("#costos_108").val();
                LLAMADO_DLL({
                    dato: [SER108.CCOSTOW],
                    callback: _dataSER108_10,
                    nombredll: 'SER108-10',
                    carpeta: 'SALUD'
                });
            }
        )
    } else {
        SER108.CCOSTOW = "0000";
        $("#costos_108").val(SER108.CCOSTOW);
        _evaluardiv_SAL7411();
    }
}


function _dataSER108_10(data) {
    var date = data.split("|");
    var swinvalid = date[0];
    $_DESCRIPCOSTOS = date[1].trim();
    if (swinvalid == "00") {
        $("#costos_108").val(SER108.CCOSTOW + "-" + $_DESCRIPCOSTOS);
        _evaluardiv_SAL7411();

    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarcosto_SAL7411()
    }
    else {
        CON852(date[0], date[1], date[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _evaluardiv_SAL7411() {
    validarInputs({
        form: "#DIVISION_108",
        orden: "1"
    },
        function () { _evaluarcontrato(); },
        () => {
            SER108.DIVISIONW = $("#division_108").val();
            if (SER108.DIVISIONW.trim() == "") {
                setTimeout(_formadepago, 500);
            }
            else {
                LLAMADO_DLL({
                    dato: [SER108.DIVISIONW],
                    callback: _dataSER108_11,
                    nombredll: 'SER108-11',
                    carpeta: 'SALUD'
                });
            }
        }
    )
}

function _dataSER108_11(data) {
    var date = data.split("|");
    var swinvalid = date[0];
    if (swinvalid == "00") {
        setTimeout(_formadepago, 300);
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluardiv_SAL7411();
    }
    else {
        CON852(date[0], date[1], date[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}
function _formadepago() {
    var formasdepago = [
        { "COD": "1", "DESCRIP": "ACEPTA COPAGO" },
        { "COD": "2", "DESCRIP": "NO ACEPT COPAGO" },
        { "COD": "3", "DESCRIP": "COPAGO INGRESO" },
        { "COD": "4", "DESCRIP": "COPAGO PGP" }
    ]
    POPUP({
        array: formasdepago,
        titulo: 'Forma de Pago',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_FORMACOPAGNUM,
        callback_f: _evaluardiv_SAL7411
    },
        _evaluarformadepago_108);
}

function _evaluarformadepago_108(formasdepago) {
    SER108.FORMACOPAGW = formasdepago.COD;
    switch (formasdepago.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
            if ($_ENVIONUM.trim() != '') SER108.ENVIOW = $_ENVIONUM
            $("#envio_108").val(SER108.ENVIOW);
            setTimeout(_evaluarcontrolxdiag_SER7411, 300);
            break;
        default:
            _evaluardiv_SAL7411();
            break;
    }
    $('#formadepago_108').val(formasdepago.COD + ' - ' + formasdepago.DESCRIP);
}
function _evaluarenvio_SAL7411() {
    validarInputs({
        form: "#ENVIO_108",
        orden: "1"
    },
        function () { _evaluarobservacion_SAL7411(); },
        _evaluarcontrolxdiag_SER7411
    )
}
function _evaluarcontrolxdiag_SER7411() {
    if (SER108.CTRLXDIAG.trim() == '') {
        if (($_NITUSU == '0890102044') || ($_NITUSU == '0000102044')) {
            $('#ctrldi_108').val('S');
        } else {
            SER108.CTRLXDIAG = 'N';
            $('#ctrldi_108').val(SER108.CTRLXDIAG);
        }
    }
    validarInputs({
        form: "#CTRLDIAG_108",
        orden: "1"
    },
        function () { setTimeout(_formadepago, 300); },
        () => {
            SER108.CTRLXDIAG = $('#ctrldi_108').val();

            if ((SER108.CTRLXDIAG == 'S') || (SER108.CTRLXDIAG == 'N')) {
                _evaluarobservacion_SAL7411();
            } else {
                _evaluarcontrolxdiag_SER7411();
            }
        }
    )
}

function _evaluarobservacion_SAL7411() {
    validarInputs({
        form: "#OBSERVACION_108",
        orden: "1",
        event_f3: () => {
            if (SER108.OBSERVW.trim() != '') {
                CON851P('01', _evaluarobservacion_SAL7411, _validargrabarcambio_7411)
            } else {
                CON851("", "Dato obligatorio!", null, "error", "error");
                return _evaluarobservacion_SAL7411()
            }
        }
    },
        function () { _evaluarcontrato(); },
        () => {
            SER108.OBSERVW = $("#observacion_108").val().toUpperCase()
            if (SER108.OBSERVW.trim() == '' && SER108.ESTADOW == '2' && SER108.NOVEDAD == "8" && $_USUA_GLOBAL[0].NIT == 892000264) {
                CON851("", "Dato obligatorio!", null, "error", "error");
                return _evaluarobservacion_SAL7411()
            }
            _evaluarcontrolcap();
        }
    )
}

function _evaluarcontrolcap() {
    _FloatText({ estado: 'on', msg: [{ mensaje: 'DIGITE 9999 SI NO HAY CONTRATO!' }] })
    validarInputs({
        form: "#CTRLCONT_108",
        orden: "1"
    },
        function () { _evaluarobservacion_SAL7411() },
        () => {
            SER108.CONTROLCAPW = $("#ctrlcont_108").val();
            if (SER108.CONTROLCAPW.trim() == '0') {
                CON851('02', '02', null, 'error', 'error');
                $("#ctrlcont_108").val("0");
                _evaluarcontrolcap();
            }
            else if (SER108.CONTROLCAPW == "9999") {
                _evaluardetalle();
            }
            else {
                LLAMADO_DLL({
                    dato: [SER108.CONTROLCAPW],
                    callback: _dataSER108_12,
                    nombredll: 'SER108-12',
                    carpeta: 'SALUD'
                });
            }
        }
    )
}


function _dataSER108_12(data) {
    var date = data.split("|");
    var swinvalid = date[0];
    var $_ESTADOCNCAP = date[1];
    var $_NITCNCAP = date[2];
    var $_FECHAINICNCAP = date[3];
    var $_FECHAFINCNCAP = date[4];
    if (swinvalid == "00") {
        if ($_ESTADOCNCAP == "1") {
            CON851('13', '13', null, 'error', 'error');
            _evaluarcontrolcap();
        } else if ($_NITUSU == "0800251482") {
            if ($_NITCNCAP != SER108.NITW) {
                if ($_NITCNCAP == $_NITCONTW) {
                    _evaluardetalle();
                }
                else {
                    CON851('06', '06', null, 'error', 'error');
                    _evaluarobservacion_SAL7411();
                }
            }
            else {
                _evaluardetalle();
            }
        }
        else if ($_NITUSU == "0900520317") {
            _evaluardetalle();
        }
        else {
            if ($_NITCNCAP != SER108.NITW) {
                if ($_NITCNCAP != $_NITCONTW) {
                    _evaluardetalle();
                }
                else {
                    CON851('06', '06', null, 'error', 'error');
                    _evaluarobservacion_SAL7411();
                }
            }
            else if ($_PRECAPITW.trim() == "") {
                var fechasigini = moment($_FECHAINICNCAP);
                var fechasigfin = moment($_FECHAFINCNCAP);
                var fechaingw = moment(SER108.FECHAINGNUM);
                if ((fechasigini > fechaingw) || (fechasigfin < fechaingw)) {
                    CON851('37', '37', null, 'error', 'error');
                    if (($_ADMINW == "ADMI") || ($_ADMINW == "DAVI") || ($_ADMINW == "GEBC")) {
                        _evaluardetalle();
                    }
                    else {
                        _evaluarcontrolcap();
                    }
                } else {
                    _evaluardetalle();
                }
            }
            else if (SER108.CONTRATOW.trim() == "") {
                SER108.CONTRATOW = $_NROCONTCNCAP;
                $("#contrato_108").val(SER108.CONTRATOW);
                _evaluardetalle();
            }
            else {
                _evaluardetalle();
            }
        }
    } else if (swinvalid == "01") {

        CON851('01', '01', null, 'error', 'error');
        _evaluarobservacion_SAL7411();
    } else {
        CON852(date[0], date[1], date[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}


function _evaluardetalle() {
    _FloatText({ estado: 'off' })
    validarInputs({
        form: "#DETALLE_108",
        orden: "1"
    },
        function () { _evaluarobservacion_SAL7411(); },
        () => {
            SER108.DETALLEW = $("#detalle_108").val();
            _revisarbloqueos_SER108(data => {
                if (data == "00" && SER108.NOVEDAD == "8") {
                    _evaluarbol();
                } else {
                    SER108.LLAVESALID = '0000000000';
                    $("#bol_108").val(SER108.LLAVESALID);
                    _evaluarctlpaci_SAL7411();
                }
            }, _evaluardetalle, params = { CODIGO: 'IS41S' });
        }
    )
}

function _evaluarbol() {
    validarInputs({
        form: "#BOL_108",
        orden: "1"
    },
        function () { _evaluardetalle(); },
        () => {
            SER108.LLAVESALID = $("#bol_108").val();
            _evaluarctlpaci_SAL7411();
        }
    )
}

function _evaluarctlpaci_SAL7411() {
    if (($_PREFIJOW == 'P') || ($_PREFIJOW == 'T') || ($_PREFIJOW == 'O') || ($_PREFIJOW == 'Q') || ($_PREFIJOW == 'R') || ($_PREFIJOW == 'S') || ($_PREFIJOW == 'U') || ($_PREFIJOW == 'V') ||
        ($_PREFIJOW == 'W') || ($_PREFIJOW == 'X') || ($_PREFIJOW == 'Y') || ($_PREFIJOW == 'Z')) {
        SER108.CTLNROPACIW = 'N';
        $("#mostrar_108").val(SER108.CTLNROPACIW);
        _evaluarnivel_SAL7411();
    } else {
        if (SER108.CTLNROPACIW.trim() == '') {
            SER108.CTLNROPACIW = 'N';
            $("#mostrar_108").val(SER108.CTLNROPACIW);
        }
        validarInputs({
            form: "#COMPROBANTE_108",
            orden: "1"
        },
            function () { _evaluardetalle(); },
            () => {
                SER108.CTLNROPACIW = $("#mostrar_108").val();
                if ((SER108.CTLNROPACIW == 'N') || (SER108.CTLNROPACIW == 'S')) {
                    _evaluarnivel_SAL7411()
                } else {
                    CON851('03', '03', null, 'error', 'error');
                    _evaluarctlpaci_SAL7411();
                }

            }
        )
    }
}

function _evaluarnivel_SAL7411() {
    if (SER108.NIVELCUPSW.trim() == '') {
        SER108.NIVELCUPSW = "*";
        $("#nivel_108").val(SER108.NIVELCUPSW);
    }
    validarInputs({
        form: "#NIVEL_108",
        orden: "1"
    },
        function () { _evaluardetalle(); },
        () => {
            SER108.NIVELCUPSW = $("#nivel_108").val();

            if ((SER108.NIVELCUPSW == "*") || (SER108.NIVELCUPSW == "1") || (SER108.NIVELCUPSW == "2") || (SER108.NIVELCUPSW == "3") || (SER108.NIVELCUPSW == "4")) {
                _evaluardatocis_SAl7411();
            }
            else {
                CON851('03', '03', null, 'error', 'error');
                _evaluarnivel_SAL7411()
            }
        }
    )
}

function _evaluardatocis_SAl7411() {
    validarInputs({
        form: "#CIS_108",
        orden: "1"
    },
        function () { _evaluarnivel_SAL7411(); },
        () => {
            SER108.CISW = $("#codcis_108").val();
            if (SER108.CISW.trim() == '') {
                SER108.CISW = 'N';
                $("#codcis_108").val(SER108.CISW);
                _datotipopaciente_SAL7411();
            } else if ((SER108.CISW == 'N') || (SER108.CISW == 'S')) {
                _datotipopaciente_SAL7411();
            } else {
                CON851('03', '03', null, 'error', 'error');
                _evaluardatocis_SAl7411();
            }
        }
    )
}


function _datotipopaciente_SAL7411() {
    if (($_PREFIJOW == 'T') || ($_PREFIJOW == 'V') || ($_PREFIJOW == 'W') || ($_PREFIJOW == 'X') || ($_PREFIJOW == 'Y') || ($_PREFIJOW == 'Z')) {
        $('#tipopaci_108').val("T - TODOS");
        SER108.TIPOPACIW = "*";
        SER108.MYTW = '';
        SER108.CONTROLXSERVW = '';
        SER108.CONTROLCL0 = '';
        SER108.CONTROLCL1 = '';
        SER108.CONTROLCL2 = '';
        SER108.CONTROLCL3 = '';
        SER108.CONTROLCL4 = '';
        SER108.CONTROLCL5 = '';
        SER108.CONTROLCL6 = '';
        SER108.CONTROLCL7 = '';
        SER108.ARTIVAW = '';
        _evaluarnropol_SAL7411();
    } else {
        var tipac = [
            { "COD": "T", "DESCRIP": "TODOS" },
            { "COD": "C", "DESCRIP": "CONTRIBUTIVO" },
            { "COD": "S", "DESCRIP": "SUBSIDIADO" },
            { "COD": "V", "DESCRIP": "VINCULADO" },
            { "COD": "P", "DESCRIP": "PARTICULAR" },
            { "COD": "O", "DESCRIP": "OTRO TIPO" },
            { "COD": "D", "DESCRIP": "DESP.CONT" },
            { "COD": "E", "DESCRIP": "DESP. SUBS" },
            { "COD": "F", "DESCRIP": "DESP. VINC" }
        ]
        POPUP({
            array: tipac,
            titulo: 'Tipo Usuario',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            seleccion: $_TIPOPACINUM,
            callback_f: _evaluardetalle,
            teclaAlterna: true
        },
            _evaluardatotipodepaciente_108);
    }
}
function _evaluardatotipodepaciente_108(tipac) {
    SER108.TIPOPACIW = tipac.COD;
    switch (tipac.COD) {
        case 'T':
            $('#tipopaci_108').val("T - TODOS");
            SER108.TIPOPACIW = "*";
            _evaluardatomyt_SAl7411();
            break;
        case 'C':
        case 'S':
        case 'V':
        case 'P':
        case 'O':
        case 'D':
        case 'E':
        case 'F':
            $('#tipopaci_108').val(tipac.COD);
            _evaluardatomyt_SAl7411();
            break;
        default:
            _evaluardetalle();
            break;
    }
}

function _evaluardatomyt_SAl7411() {
    if (SER108.TIPOPACIW == 'S') {
        if (SER108.MYTW.trim() == '') SER108.MYTW = 'N'; $("#myt_108").val(SER108.MYTW);
        validarInputs({
            form: "#MYT_108",
            orden: "1"
        },
            () => {
                _evaluardatocis_SAl7411()
            },
            () => {
                SER108.MYTW = $("#myt_108").val();
                if ((SER108.MYTW == 'N') || (SER108.MYTW == 'S')) {
                    _evaluarcovid19_SER108();
                } else {
                    CON851('03', '03', null, 'error', 'error');
                    _evaluardatomyt_SAl7411();
                }
            }
        )
    } else {
        SER108.MYTW = 'N'
        $("#myt_108").val(SER108.MYTW);
        _evaluarcovid19_SER108()
    }
}

function _evaluarcovid19_SER108() {
    if (SER108.COVID19W.trim() == '') SER108.COVID19W = 'N'; $("#covid19_108").val(SER108.COVID19W);
    validarInputs({
        form: "#C19_108",
        orden: "1"
    },
        () => {
            _datotipopaciente_SAL7411();
        },
        () => {
            SER108.COVID19W = $("#covid19_108").val();
            if (SER108.COVID19W == 'S' || SER108.COVID19W == 'N') {
                _evaluarpbs_SER108();
            } else {
                CON851('03', '03', _evaluarcovid19_SER108(), 'error', 'error');
            }
        }
    )
}

function _evaluarpbs_SER108() {
    if (SER108.NPBSW.trim() == '') SER108.NPBSW = 'N'; $("#npbs_108").val(SER108.NPBSW);
    validarInputs({
        form: "#PBS_108",
        orden: "1"
    },
        _evaluarcovid19_SER108,
        () => {
            SER108.NPBSW = $("#npbs_108").val();
            if (SER108.NPBSW == 'S' || SER108.NPBSW == 'N') {
                _evaluardatocontrolxserv_SAl7411();
            } else {
                CON851('03', '03', _evaluarpbs_SER108(), 'error', 'error');
            }
        }
    )
}

function _evaluardatocontrolxserv_SAl7411() {
    validarInputs({
        form: "#CTRLXSERV_108",
        orden: "1"
    },
        function () { _evaluardatomyt_SAl7411(); },
        _datocontrolxserv_SAL7411
    )
}
function _datocontrolxserv_SAL7411() {
    SER108.CONTROLXSERVW = $("#ctrlxserv_108").val();
    if (SER108.CONTROLXSERVW.trim() == '') {
        SER108.CONTROLXSERVW = 'N';
        $("#ctrlxserv_108").val(SER108.CONTROLXSERVW);
        SER108.CONTROLCL0 = '';
        SER108.CONTROLCL1 = '';
        SER108.CONTROLCL2 = '';
        SER108.CONTROLCL3 = '';
        SER108.CONTROLCL4 = '';
        SER108.CONTROLCL5 = '';
        SER108.CONTROLCL6 = '';
        SER108.CONTROLCL7 = '';
        _evaluardatoiva_SAl7411();

    } else if (SER108.CONTROLXSERVW == 'N') {
        SER108.CONTROLCL0 = '';
        SER108.CONTROLCL1 = '';
        SER108.CONTROLCL2 = '';
        SER108.CONTROLCL3 = '';
        SER108.CONTROLCL4 = '';
        SER108.CONTROLCL5 = '';
        SER108.CONTROLCL6 = '';
        SER108.CONTROLCL7 = '';
        _evaluardatoiva_SAl7411();
    } else if (SER108.CONTROLXSERVW == 'S') {
        _evaluarcontrolcl0_SAl7411();
    } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluardatocontrolxserv_SAl7411();
    }
}

function _evaluarcontrolcl0_SAl7411() {
    validarInputs({
        form: "#MED_108",
        orden: "1"
    },
        function () { _evaluardatocontrolxserv_SAl7411(); },
        () => {
            SER108.CONTROLCL0 = $("#controlcl0_108").val();
            if (SER108.CONTROLCL0.trim() == '') {
                SER108.CONTROLCL0 = 'N';
                $("#controlcl0_108").val(SER108.CONTROLCL0);
                _evaluarcontrolcl1_SAl7411();
            } else if ((SER108.CONTROLCL0 == 'N') || (SER108.CONTROLCL0 == 'S')) {
                _evaluarcontrolcl1_SAl7411();
            } else {
                CON851('03', '03', null, 'error', 'error');
                _evaluarcontrolcl0_SAl7411();
            }
        }
    )
}

function _evaluarcontrolcl1_SAl7411() {
    validarInputs({
        form: "#CIRUG_108",
        orden: "1"
    },
        function () { _evaluarcontrolcl0_SAl7411(); },
        () => {
            SER108.CONTROLCL1 = $("#controlcl1_108").val();
            if (SER108.CONTROLCL1.trim() == '') {
                SER108.CONTROLCL1 = 'N';
                $("#controlcl1_108").val(SER108.CONTROLCL1);
                _evaluarcontrolcl2_SAl7411();
            } else if ((SER108.CONTROLCL1 == 'N') || (SER108.CONTROLCL1 == 'S')) {
                _evaluarcontrolcl2_SAl7411();
            } else {
                CON851('03', '03', null, 'error', 'error');
                _evaluarcontrolcl1_SAl7411();
            }
        }
    )
}


function _evaluarcontrolcl2_SAl7411() {
    validarInputs({
        form: "#LAB_108",
        orden: "1"
    },
        function () { _evaluarcontrolcl0_SAl7411(); },
        () => {
            SER108.CONTROLCL2 = $("#controlcl2_108").val();

            if (SER108.CONTROLCL2.trim() == '') {
                SER108.CONTROLCL2 = 'N';
                $("#controlcl2_108").val(SER108.CONTROLCL2);
                _evaluarcontrolcl3_SAl7411();
            } else if ((SER108.CONTROLCL2 == 'N') || (SER108.CONTROLCL2 == 'S')) {
                _evaluarcontrolcl3_SAl7411();
            } else {
                CON851('03', '03', null, 'error', 'error');
                _evaluarcontrolcl2_SAl7411();
            }
        }
    )
}

function _evaluarcontrolcl3_SAl7411() {
    validarInputs({
        form: "#RX_108",
        orden: "1"
    },
        function () { _evaluarcontrolcl2_SAl7411(); },
        () => {
            SER108.CONTROLCL3 = $("#controlcl3_108").val();

            if (SER108.CONTROLCL3.trim() == '') {
                SER108.CONTROLCL3 = 'N';
                $("#controlcl3_108").val(SER108.CONTROLCL3);
                _evaluarcontrolcl4_SAl7411();
            } else if ((SER108.CONTROLCL3 == 'N') || (SER108.CONTROLCL3 == 'S')) {
                _evaluarcontrolcl4_SAl7411();
            } else {
                CON851('03', '03', null, 'error', 'error');
                _evaluarcontrolcl3_SAl7411();
            }
        }
    )
}

function _evaluarcontrolcl4_SAl7411() {
    validarInputs({
        form: "#OTRO_108",
        orden: "1"
    },
        function () { _evaluarcontrolcl3_SAl7411(); },
        () => {
            SER108.CONTROLCL4 = $("#controlcl4_108").val();

            if (SER108.CONTROLCL4.trim() == '') {
                SER108.CONTROLCL4 = 'N';
                $("#controlcl4_108").val(SER108.CONTROLCL4);
                _evaluarcontrolcl5_SAl7411();
            } else if ((SER108.CONTROLCL4 == 'N') || (SER108.CONTROLCL4 == 'S')) {
                _evaluarcontrolcl5_SAl7411();
            } else {
                CON851('03', '03', null, 'error', 'error');
                _evaluarcontrolcl4_SAl7411();
            }
        }
    )
}

function _evaluarcontrolcl5_SAl7411() {
    validarInputs({
        form: "#CONS_108",
        orden: "1"
    },
        function () { _evaluarcontrolcl4_SAl7411(); },
        () => {
            SER108.CONTROLCL5 = $("#controlcl5_108").val();

            if (SER108.CONTROLCL5.trim() == '') {
                SER108.CONTROLCL5 = 'N';
                $("#controlcl5_108").val(SER108.CONTROLCL5);
                _evaluarcontrolcl6_SAl7411();
            } else if ((SER108.CONTROLCL5 == 'N') || (SER108.CONTROLCL5 == 'S')) {
                _evaluarcontrolcl6_SAl7411();
            } else {
                CON851('03', '03', null, 'error', 'error');
                _evaluarcontrolcl5_SAl7411();
            }
        }
    )
}



function _evaluarcontrolcl6_SAl7411() {
    validarInputs({
        form: "#PATO_108",
        orden: "1"
    },
        function () { _evaluarcontrolcl5_SAl7411(); },
        () => {
            SER108.CONTROLCL6 = $("#controlcl6_108").val();

            if (SER108.CONTROLCL6.trim() == '') {
                SER108.CONTROLCL6 = 'N';
                $("#controlcl6_108").val(SER108.CONTROLCL6);
                _evaluarcontrolcl7_SAl7411();
            } else if ((SER108.CONTROLCL6 == 'N') || (SER108.CONTROLCL6 == 'S')) {
                _evaluarcontrolcl7_SAl7411();
            } else {
                CON851('03', '03', null, 'error', 'error');
                _evaluarcontrolcl6_SAl7411();
            }
        }
    )
}

function _evaluarcontrolcl7_SAl7411() {
    validarInputs({
        form: "#PYP_108",
        orden: "1"
    },
        function () { _evaluarcontrolcl6_SAl7411(); },
        () => {
            SER108.CONTROLCL7 = $("#controlcl7_108").val();

            if (SER108.CONTROLCL7.trim() == '') {
                SER108.CONTROLCL7 = 'N';
                $("#controlcl7_108").val(SER108.CONTROLCL7);
                _evaluardatoiva_SAl7411();
            } else if ((SER108.CONTROLCL7 == 'N') || (SER108.CONTROLCL7 == 'S')) {
                _evaluardatoiva_SAl7411();
            } else {
                CON851('03', '03', null, 'error', 'error');
                _evaluarcontrolcl7_SAl7411();
            }
        }
    )
}

function _evaluardatoiva_SAl7411() {
    validarInputs({
        form: "#ARTCONIVA_108",
        orden: "1"
    },
        function () { _evaluardatocontrolxserv_SAl7411(); },
        () => {
            SER108.ARTIVAW = $("#artconiva_108").val();
            if (SER108.ARTIVAW.trim() == '') {
                SER108.ARTIVAW = 'N';
                $("#artconiva_108").val(SER108.ARTIVAW);
                _evaluarnropol_SAL7411();
            } else if ((SER108.ARTIVAW == 'N') || (SER108.ARTIVAW == 'S')) {
                _evaluarnropol_SAL7411();
            } else {
                CON851('03', '03', null, 'error', 'error');
                _evaluardatoiva_SAl7411();
            }
        }
    )
}


function _evaluarnropol_SAL7411() {
    SER108.RUTAW = '';
    validarInputs({
        form: "#NROPOL_108",
        orden: "1"
    },
        function () { _evaluardetalle(); },
        _datopol_SAL7411
    )
}

function _datopol_SAL7411() {
    SER108.NROPOLW = $("#nropol_108").val();
    if ($_NITUSU == "0844001287" && $_ACTTER == "31" && parseInt($_AÑOPACI_ING7411) > 2011) {
        var $_RUTA_108 = [];
        let URL = get_url("APP/" + "CONTAB/CON810" + ".DLL");
        postData({
            datosh: datosEnvio() + localStorage['Usuario'] + "|"
        }, URL)
            .then((data) => {
                loader("hide");
                $_RUTA_108 = data;
                if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                    _ventanaDatos({
                        titulo: "VENTANA DE ZONAS",
                        columnas: ["ZONA", "NOMBRE"],
                        data: $_RUTA_108.ZONAS,
                        callback_esc: function () {
                            $("#ruta_108").focus();
                        },
                        callback: function (data) {
                            document.getElementById('ruta_108').value = data.ZONA;
                            setTimeout(_evaluardiasest_SAL7411, 300);

                        }
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            });
    } else {
        if (SER108.NROPOLW.trim() == '' && $_PREFIJOW == 'T') {
            if (SER108.NOVEDAD == '7') {
                CON851('02', '02', null, 'error', 'error');
                _evaluarnropol_SAL7411()
            } else {
                let URL = get_url("APP/SALUD/SER108-04.DLL");
                postData({ datosh: datosEnvio() + SER108.LLAVEW + '|' }, URL)
                    .then(data => {
                        console.log(data)
                        SER108.NROPOLW = data
                        $("#nropol_108").val(SER108.NROPOLW);
                        _evaluardiasest_SAL7411();
                    })
                    .catch(err => {
                        console.debug(err);
                        _evaluarnropol_SAL7411()
                    })
            }
        } else {
            _evaluardiasest_SAL7411();
        }
    }

}

function _evaluardiasest_SAL7411() {
    validarInputs({
        form: "#DIASEST_108",
        orden: "1"
    },
        function () { _evaluarnropol_SAL7411(); },
        _validardiasest_SAL7411
    )
}
function _validardiasest_SAL7411() {
    SER108.ESTW = $("#est_108").val();
    if (SER108.ESTW.trim() == '') {
        SER108.ESTW = "000";
        $("#est_108").val(SER108.ESTW);
        _validardatoclasif_SAL7411();
    } else {
        _validardatoclasif_SAL7411();
    }
}

function _validardatoclasif_SAL7411() {
    if (($_NITUSU == "0800037021") || ($_NITUSU == "0892000401") || ($_NITUSU == "0900648993") || ($_NITUSU == "0900755133") || ($_NITUSU == "0900870633")) {
        if (SER108.NOVEDAD == '7') {
            $("#clasificacion_108").val("3 - NO APLICA");
            SER108.CLASIFW = "3";
            _datoremitido_SAL7411();
        } else {
            _datoremitido_SAL7411();
        }
    } else if (($_PUCUSU == "3") || ($_PUCUSU == "4") || ($_PUCUSU == "6")) {

        setTimeout(_datoclasif_SAL7411, 300);
    } else {
        $("#clasificacion_108").val("3 - NO APLICA");
        SER108.CLASIFW = "3";
        _datoremitido_SAL7411();
    }
}
function _datoclasif_SAL7411() {
    var datoclasif = [
        { "COD": "1", "DESCRIP": "POS" },
        { "COD": "2", "DESCRIP": "NO POS" },
        { "COD": "3", "DESCRIP": "NO APLICA" }
    ]
    POPUP({
        array: datoclasif,
        titulo: 'Clasificacion',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_CLASIFNUM,
        callback_f: _evaluardiasest_SAL7411
    },
        _evaluardatoclasif_108);
}
function _evaluardatoclasif_108(datoclasif) {
    SER108.CLASIFW = datoclasif.COD;
    switch (datoclasif.COD) {
        case '1':
        case '2':
        case '3':
            _datoremitido_SAL7411();
            break;
        default:
            _evaluardiasest_SAL7411();
            break;
    }
    $('#clasificacion_108').val(datoclasif.COD + " - " + datoclasif.DESCRIP);
}

function _datoremitido_SAL7411() {
    validarInputs({
        form: "#REMITE_108",
        orden: "1"
    }, function () { _evaluardiasest_SAL7411(); },
        _evaluardatoremitido_108
    )
}
function _evaluardatoremitido_108() {
    SER108.ENTRAREMITW = $("#remitido_108").val();

    if (SER108.ENTRAREMITW.trim() == '') {
        SER108.ENTRAREMITW = 'N';
        $("#remitido_108").val(SER108.ENTRAREMITW);
        SER108.ORIGREMIT = $("#origen_108").val();
        setTimeout(_datotipodeevento, 300);
    } else if (SER108.ENTRAREMITW == 'S') {
        _evaluarorigremit();
    } else if (SER108.ENTRAREMITW == 'N') {
        SER108.ORIGREMIT = '';
        $("#origen_108").val(SER108.ORIGREMIT);
        setTimeout(_datotipodeevento, 300);
    } else {
        CON851('03', '03', null, 'error', 'error');
        _datoremitido_SAL7411()
    }
}
function _evaluarorigremit() {
    validarInputs({
        form: "#ORIGEN_108",
        orden: "1"
    },
        function () { _datoremitido_SAL7411(); },
        _validarorigenremit
    )
}
function _validarorigenremit() {
    SER108.ORIGREMIT = $("#origen_108").val();

    if ((SER108.ENTRAREMITW == "S") && (SER108.ORIGREMIT.trim() == '')) {
        CON851('02', '02', null, 'error', 'error');
        _evaluarorigremit();
    }
    else {
        LLAMADO_DLL({
            dato: [SER108.ORIGREMIT],
            callback: _dataSER108_13,
            nombredll: 'SER108-13',
            carpeta: 'SALUD'
        })
    }
}
function _dataSER108_13(data) {
    var date = data.split("|");
    var swinvalid = date[0];
    if (swinvalid == "00") {
        _datotipodeevento();
    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'Error');
        _evaluarorigremit();
    } else {
        CON852(date[0], date[1], date[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _datotipodeevento() {
    if (($_PREFIJOW == 'T') || ($_PREFIJOW == 'V') || ($_PREFIJOW == 'W') || ($_PREFIJOW == 'X') || ($_PREFIJOW == 'Y') || ($_PREFIJOW == 'Z')) {
        if ((SER108.TIPOEVENTOW > '00') && (SER108.TIPOEVENTOW < '18')) {
            _tipodeevento_SAL7411();
        } else {
            _tipodeevento_SAL7411();
        }
    } else if (($_NITUSU == "0892000401") && (parseInt($_ANOLNK) < 16)) {
        _tipodeevento_SAL7411();
    } else {
        if ((SER108.NOVEDAD == '7') && ($_PREFIJOW != "T")) {
            SER108.TIPOEVENTOW = '00';
            $("#tipoevento_108").val("00 - NO APLICA");
            $("#ciudad_108").val($_CODCIUUSU);
            _evaluarciudad_SAL7411();
        } else {
            _evaluarciudad_SAL7411();
        }
    }
}

function _tipodeevento_SAL7411() {
    var tipoeventow = [
        { "COD": "1", "DESCRIP": "ACCIDENTE DE TRANSI" },
        { "COD": "2", "DESCRIP": "SISMO" },
        { "COD": "3", "DESCRIP": "MAREMOTO" },
        { "COD": "4", "DESCRIP": "ERUPCIONES VOLCACNIC" },
        { "COD": "5", "DESCRIP": "DESLIZAMIENTO TIERR" },
        { "COD": "6", "DESCRIP": "INUNDACIONES" },
        { "COD": "7", "DESCRIP": "AVALANCHA" },
        { "COD": "8", "DESCRIP": "INCENDIO NATURA" },
        { "COD": "9", "DESCRIP": "EXPLOSION TERRORIST" },
        { "COD": "10", "DESCRIP": "INCENDIO TERRORISTA" },
        { "COD": "11", "DESCRIP": "COMBATE" },
        { "COD": "12", "DESCRIP": "ATAQUE A MUNICIPIOS" },
        { "COD": "13", "DESCRIP": "MASACRE" },
        { "COD": "14", "DESCRIP": "DESPLAZADOS" },
        { "COD": "15", "DESCRIP": "OTRO" },
        { "COD": "16", "DESCRIP": "HURACAN" },
        { "COD": "18", "DESCRIP": "MINA ANTIPERSONAL" }
    ]
    POPUP({
        array: tipoeventow,
        titulo: 'Tipo de Evento',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_TIPOEVENTONUM.replace(/0/, ''),
        callback_f: _evaluardiasest_SAL7411
    },
        _evaluardatotipoeventow_108);
}
function _evaluardatotipoeventow_108(tipoeventow) {
    SER108.TIPOEVENTOW = tipoeventow.COD;
    switch (tipoeventow.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '10':
        case '11':
        case '12':
        case '13':
        case '14':
        case '15':
        case '16':
        case '18':
            $("#ciudad_108").val($_CODCIUUSU);
            SER108.TIPOEVENTOW = SER108.TIPOEVENTOW.padStart(2, '0')
            setTimeout(_evaluarciudad_SAL7411, 300);
            break;
        default:
            _evaluardiasest_SAL7411();
            break;
    }
    $('#tipoevento_108').val(tipoeventow.COD + " - " + tipoeventow.DESCRIP);
}

function _evaluarciudad_SAL7411() {
    validarInputs({
        form: "#CIUDAD_108",
        orden: "1"
    },
        function () { _datoremitido_SAL7411(); },
        _validarciudad
    )
}

function _validarciudad() {
    SER108.CIUDADW = $("#ciudad_108").val();
    LLAMADO_DLL({
        dato: [SER108.CIUDADW],
        callback: _dataSER108_14,
        nombredll: 'SER108-14',
        carpeta: 'SALUD'
    });
}
function _dataSER108_14(data) {
    var date = data.split("|");
    var swinvalid = date[0];
    $_DESCRIPCIUDADW = date[1];
    if (swinvalid == "00") {
        $("#ciudadd_108").val($_DESCRIPCIUDADW);
        _evaluardatofunauto_SAL7411();
    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarciudad_SAL7411();
    } else {
        CON852(date[0], date[1], date[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _evaluardatofunauto_SAL7411() {
    validarInputs({
        form: "#FUNCAUTO_108",
        orden: "1"
    },
        function () { _evaluarciudad_SAL7411(); },
        _validarfuncauto_SAL7411
    )
}
function _validarfuncauto_SAL7411() {
    SER108.FUNCAUTORINGW = $("#funauto_108").val();
    SER108.FUNCAUTORINGW = SER108.FUNCAUTORINGW.padStart(10, "0");
    if (SER108.FUNCAUTORINGW.trim() == '') {
        SER108.FUNCAUTORINGW = "0000000000";
        $_DESCRIPAUTORINGW = '';
        $("#funcauto_108").val(SER108.FUNCAUTORINGW);
        $("#funautod_108").val($_DESCRIPAUTORINGW);
        _datoautorizacion();
    }
    else {
        LLAMADO_DLL({
            dato: [SER108.FUNCAUTORINGW],
            callback: _dataSER108_15,
            nombredll: 'SER108-05',
            carpeta: 'SALUD'
        });
    }
}
function _dataSER108_15(data) {
    var date = data.split("|");
    var swinvalid = date[0];
    $_DESCRIPAUTORINGW = date[2];
    if (swinvalid == "00") {
        if (SER108.FUNCAUTORINGW == '0000000000') {
            $("#funautod_108").val('');
        } else {
            $("#funautod_108").val($_DESCRIPAUTORINGW);
        }
        _datoautorizacion();
    } else if (swinvalid == "01") {
        $("#funautod_108").val("**********");
        _datoautorizacion();
    }
    else {
        CON852(date[0], date[1], date[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _datoautorizacion() {
    if (($_PREFIJOW == 'T') || ($_PREFIJOW == 'V') || ($_PREFIJOW == 'W') || ($_PREFIJOW == 'X') || ($_PREFIJOW == 'Y') || ($_PREFIJOW == 'Z')) {
        SER108.NROAUTORIZACIONW = '';
        SER108.FECHAINGAUT = '00000000';
        SER108.HORAINGAUT = '0000';
        SER108.FECHAFINAUT = '00000000';
        SER108.HORAFINAUT = '0000';
        $("#nroauto_108").val(SER108.NROAUTORIZACIONW);
        _evaluarobservacionaper();
    }
    else {
        _evaluarnroautorizacion();
    }
}

function _evaluarnroautorizacion() {
    validarInputs({
        form: "#NROAUTO_108",
        orden: "1"
    },
        () => {
            if (SER108F.OPCIONACTIVA == '097415') {
                _evaluarnroautorizacion();
            } else {
                _evaluardatofunauto_SAL7411()
            }
        },
        () => {
            SER108.NROAUTORIZACIONW = $("#nroauto_108").val();
            if (($_NITUSU == '0800037021') && (($_PREFIJOW == 'P') || ($_PREFIJOW == 'O') || ($_PREFIJOW == 'Q') || ($_PREFIJOW == 'R') || ($_PREFIJOW == 'S') || ($_PREFIJOW == 'U')) && (SER108.NROAUTORIZACIONW != '')) {
                $_MESBUSQ = $_FECHABUSQ.substring(4, 6);
                $_ANOBUSQ = $_FECHABUSQ.substring(0, 4);

                if ($_MESBUSQ > 3) {
                    $_MESBUSQW = $_MESBUSQ - 3;
                    if (SER108.IDPACW != "000000000000001") {
                        $_FACTP = '';
                        $_DIABUSQ = $_FECHABUSQ.substring(4, 6);
                        $_MESBUSQ = $_FECHABUSQ.substring(2, 4);
                        $_ANOBUSQ = $_FECHABUSQ.substring(0, 4);
                        $_FECHABUSQENV = $_DIABUSQ + $_MESBUSQW + $_ANOBUSQ;
                        _consultaSER836AU_SER108()
                    } else {
                        _ventanafechaatencion_SER108()
                    }
                } else {
                    if ($_MESBUSQ == 01) {
                        if (SER108.IDPACW != "000000000000001") {
                            $_FACTP = '';
                            _consultaSER836AU_SER108()
                        } else {
                            _ventanafechaatencion_SER108()
                        }

                    } else {
                        $_MESBUSQW == 12;
                        $_ANOBUSQW = $_ANOBUSQ - 1;
                        // $_FECHABUSQ = moment().format('YYMMDD');
                        $_DIABUSQ = $_FECHABUSQ.substring(6, 8);
                        $_MESBUSQ = $_FECHABUSQ.substring(4, 6);
                        $_ANOBUSQ = $_FECHABUSQ.substring(0, 4);
                        $_FECHABUSQENV = $_DIABUSQ + $_MESBUSQW + $_ANOBUSQW;
                        if (SER108.IDPACW != "000000000000001") {
                            $_FACTP = '';
                            _consultaSER836AU_SER108()
                        } else {
                            _ventanafechaatencion_SER108()
                        }
                    }
                }
            } else {
                if (SER108.NROAUTORIZACIONW.trim() == '') {
                    SER108.FECHAINGAUT = '00000000';
                    SER108.HORAINGAUT = '0000';
                    SER108.FECHAFINAUT = '00000000';
                    SER108.HORAFINAUT = '0000';
                    _evaluarobservacionaper();
                } else {
                    // setTimeout(_ventanafechaatencion_SER108, 300)
                    _ventanafechaatencion_SER108();
                }
            }
        }
    )
}
function _consultaSER836AU_SER108() {
    postData({ datosh: datosEnvio() + SER108.IDPACW + '|' + $_FECHABUSQENV + '|' + SER108.LLAVEW + '|' }, get_url("APP/SALUD/SER836AU.DLL"))
        .then(data => {
            SER108.FACTDUPLICADA2 = data.REPETIDO[0]
            SER108.FACTP2 = SER108.FACTDUPLICADA2.FACTURA
            if (SER108.FACTP2.trim() != '') {
                $('#factrepetida_108').val(SER108.FACTP2)
                CON851('8U', '8U', null, 'error', 'error');
            }
            _evaluarobservacionaper()
        })
        .catch(err => {
            console.error(err)
            _evaluarnroautorizacion()
        });
}

function _ventanafechaatencion_SER108() {
    var ventanafechaatenc = bootbox.dialog({
        size: 'medium',
        title: 'Fecha de vigencia autorización',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +

            '<div class="col-md-12 col-sm-6 col-xs-6" id="FECHAINI_SER108"> ' +
            '<label class="col-md-3 col-sm-6 col-xs-6 control-label" for="name">' + "Fecha de inicio:" + '</label> ' +
            '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
            '<input id="anoini_SER108" class="form-control input-md" data-orden="1" maxlength="4" placeholder="AAAA"> ' +
            '</div> ' +
            '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
            '<input id="mesini_SER108" class="form-control input-md" data-orden="2" maxlength="2" placeholder="MM"> ' +
            '</div> ' +
            '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
            '<input id="diaini_SER108" class="form-control input-md" data-orden="3" maxlength="2" placeholder="DD"> ' +
            '</div> ' +
            '<div class="salto-linea"></div>' +
            '<label class="col-md-3 col-sm-6 col-xs-6 control-label" for="name">' + "Hora de inicio:" + '</label> ' +
            '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
            '<input id="hrini_SER108" class="form-control input-md" data-orden="4" maxlength="2" placeholder="HH"> ' +
            '</div> ' +
            '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
            '<input id="mnini_SER108" class="form-control input-md" data-orden="5" maxlength="2" placeholder="MN"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="salto-linea"></div>' +

            '<div class="col-md-12 col-sm-6 col-xs-6" id="FECHAFIN_SER108"> ' +
            '<label class="col-md-3 col-sm-6 col-xs-6 control-label" for="name">' + "Fecha de final:" + '</label> ' +
            '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
            '<input id="anofin_SER108" class="form-control input-md" data-orden="1" maxlength="4" placeholder="AAAA"> ' +
            '</div> ' +
            '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
            '<input id="mesfin_SER108" class="form-control input-md" data-orden="2" maxlength="2" placeholder="MM"> ' +
            '</div> ' +
            '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
            '<input id="diafin_SER108" class="form-control input-md" data-orden="3" maxlength="2" placeholder="DD"> ' +
            '</div> ' +
            '<div class="salto-linea"></div>' +
            '<label class="col-md-3 col-sm-6 col-xs-6 control-label" for="name">' + "Hora de fin:" + '</label> ' +
            '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
            '<input id="hrfin_SER108" class="form-control input-md" data-orden="4" maxlength="2" placeholder="HH"> ' +
            '</div> ' +
            '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
            '<input id="mnfin_SER108" class="form-control input-md" data-orden="5" maxlength="2" placeholder="MN"> ' +
            '</div> ' +
            '</div> ' +

            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanafechaatenc.off('show.bs.modal');
                    setTimeout(_evaluarobservacionaper, 300)
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanafechaatenc.off('show.bs.modal');
                    setTimeout(_evaluarnroautorizacion, 300)
                }
            }
        }
    });
    ventanafechaatenc.init($('.modal-footer').hide());
    ventanafechaatenc.init(_Evaluarinivigencia_SER108('1'));
    ventanafechaatenc.on('shown.bs.modal', function () {
        $("#anoini_SER108").focus();
    });
}

function _Evaluarinivigencia_SER108(orden) {
    _inputControl("disabled");
    if (SER108F.OPCIONACTIVA == '097415') {
        $('#anoini_SER108').val($_AÑOPACI_ING7411);
        $('#mesini_SER108').val($_MESPACI_ING7411);
        $('#diaini_SER108').val($_DIAPACI_ING7411);
        $('#hrini_SER108').val($_HORAPACI_ING7411);
        $('#mnini_SER108').val($_MINPACI_ING7411);
    } else {
        if (SER108.NOVEDAD == '7' || SER108.FECHAINGAUT.trim() == '' || SER108.FECHAINGAUT == '00000000') {
            SER108.HORAINGAUT = SER108.HORAINGNUMW.replace(/:/, '')
            $('#anoini_SER108').val(SER108.ANOINGNUM);
            $('#mesini_SER108').val(SER108.MESINGNUM);
            $('#diaini_SER108').val(SER108.DIAINGNUM);
            $('#hrini_SER108').val(SER108.HORAINGAUT.substring(0, 2));
            $('#mnini_SER108').val(SER108.HORAINGAUT.substring(2, 4));
        } else {
            SER108.ANOINGAUT = SER108.FECHAINGAUT.substring(0, 4);
            SER108.MESINGAUT = SER108.FECHAINGAUT.substring(4, 6);
            SER108.DIAINGAUT = SER108.FECHAINGAUT.substring(6, 8);
            SER108.HRINGAUT = SER108.HORAINGAUT.substring(0, 2);
            SER108.MNINGAUT = SER108.HORAINGAUT.substring(2, 4);
            $('#anoini_SER108').val(SER108.ANOINGAUT);
            $('#mesini_SER108').val(SER108.MESINGAUT);
            $('#diaini_SER108').val(SER108.DIAINGAUT);
            $('#hrini_SER108').val(SER108.HRINGAUT);
            $('#mnini_SER108').val(SER108.MNINGAUT);
        }
    }
    validarInputs({
        form: '#FECHAINI_SER108',
        orden: orden,
    },
        () => { $('.btn-danger').click() },
        () => {

            SER108.ANOINGAUT = $('#anoini_SER108').val();
            SER108.MESINGAUT = $('#mesini_SER108').val();
            SER108.DIAINGAUT = $('#diaini_SER108').val();
            SER108.ANOINGMENOR = SER108.ANOINGNUM - 1
            SER108.ANOINGMAX = SER108.ANOINGNUM + 1
            if (SER108.ANOINGAUT < SER108.ANOINGMENOR || SER108.ANOINGAUT > SER108.ANOINGMAX) {
                CON851('37', '37', _Evaluarinivigencia_SER108('1'), 'error', 'error');
            } else {
                if (SER108.MESINGAUT < 01 || SER108.MESINGAUT > 12) {
                    CON851('37', '37', _Evaluarinivigencia_SER108('2'), 'error', 'error');
                } else {
                    if (SER108.DIAINGAUT < 01 || SER108.DIAINGAUT > 31) {
                        CON851('37', '37', _Evaluarinivigencia_SER108('3'), 'error', 'error');
                    } else {
                        SER108.FECHAINGAUT = SER108.ANOINGAUT + SER108.MESINGAUT.toString().padStart(2, '0') + SER108.DIAINGAUT.toString().padStart(2, '0');
                        SER108.HRINGAUT = $('#hrini_SER108').val();
                        SER108.MNINGAUT = $('#mnini_SER108').val();
                        if (SER108.HRINGAUT > 23) {
                            CON851('37', '37', _Evaluarinivigencia_SER108('4'), 'error', 'error');
                        } else {
                            if (SER108.MNINGAUT > 59) {
                                CON851('37', '37', _Evaluarinivigencia_SER108('5'), 'error', 'error');
                            } else {
                                SER108.HORAINGAUT = SER108.HRINGAUT + SER108.MNINGAUT;
                                _evaluarfinvigencia_SER108('1');
                            }
                        }
                    }
                }
            }
        }
    )
}

function _evaluarfinvigencia_SER108(orden) {
    if (SER108.NOVEDAD == '7' || SER108.FECHAFINAUT.trim() == '' || SER108.FECHAFINAUT == '00000000') {
        $('#anofin_SER108').val(SER108.ANOINGAUT);
        $('#mesfin_SER108').val(SER108.MESINGAUT);
        $('#diafin_SER108').val(SER108.DIAINGAUT);
        $('#hrfin_SER108').val(SER108.HRINGAUT);
        $('#mnfin_SER108').val(SER108.MNINGAUT);
    } else {
        SER108.ANOFINAUT = SER108.FECHAFINAUT.substring(0, 4);
        SER108.MESFINAUT = SER108.FECHAFINAUT.substring(4, 6);
        SER108.DIAFINAUT = SER108.FECHAFINAUT.substring(6, 8);
        SER108.HRFINAUT = SER108.HORAFINAUT.substring(0, 2);
        SER108.MNFINAUT = SER108.HORAFINAUT.substring(2, 4);
        $('#anofin_SER108').val(SER108.ANOFINAUT);
        $('#mesfin_SER108').val(SER108.MESFINAUT);
        $('#diafin_SER108').val(SER108.DIAFINAUT);
        $('#hrfin_SER108').val(SER108.HRFINAUT);
        $('#mnfin_SER108').val(SER108.MNFINAUT);
    }
    validarInputs({
        form: '#FECHAFIN_SER108',
        orden: orden,
    },
        () => { _Evaluarinivigencia_SER108('5') },
        () => {
            SER108.ANOFINAUT = $('#anofin_SER108').val();
            SER108.MESFINAUT = $('#mesfin_SER108').val();
            SER108.DIAFINAUT = $('#diafin_SER108').val();
            SER108.ANORETMENOR = SER108.ANORETNUM - 1
            if (SER108.ANOFINAUT < SER108.ANORETMENOR || SER108.ANOFINAUT > SER108.ANOINGMAX) {
                CON851('37', '37', _evaluarfinvigencia_SER108('1'), 'error', 'error');
            } else {
                if (SER108.MESFINAUT < 01 || SER108.MESFINAUT > 12) {
                    CON851('37', '37', _evaluarfinvigencia_SER108('2'), 'error', 'error');
                } else {
                    if (SER108.DIAFINAUT < 01 || SER108.DIAFINAUT > 31) {
                        CON851('37', '37', _evaluarfinvigencia_SER108('3'), 'error', 'error');
                    } else {
                        SER108.FECHAFINAUT = SER108.ANOFINAUT + SER108.MESFINAUT.toString().padStart(2, '0') + SER108.DIAFINAUT.toString().padStart(2, '0');
                        SER108.HRFINAUT = $('#hrfin_SER108').val();
                        SER108.MNFINAUT = $('#mnfin_SER108').val();
                        if (SER108.HRFINAU > 23) {
                            CON851('37', '37', _evaluarfinvigencia_SER108('4'), 'error', 'error');
                        } else {
                            if (SER108.MNFINAUT > 59) {
                                CON851('37', '37', _evaluarfinvigencia_SER108('5'), 'error', 'error');
                            } else {
                                SER108.HORAFINAUT = SER108.HRFINAUT + SER108.MNFINAUT;
                                $('.btn-primary').click();
                            }
                        }
                    }
                }
            }
        }
    )
}

function _evaluarobservacionaper() {
    validarInputs({
        form: "#OBSERAPERTURA_108",
        orden: "1"
    },
        function () { _evaluardatofunauto_SAL7411(); },
        () => {
            SER108.OBSERAPERW = $("#obserapertura_108").val();
            _validarinformacion();
        }
    )
}


/////////////////////////////////// GRABAR DATOS////////////////////////////////////////////

function _validarinformacion() {
    if (SER108.NOVEDAD == '8') {
        if (SER108F.OPCIONACTIVA == '097415') {
            CON851P('01', _evaluardetalle, _grabarcambio_SER108T)
        } else {
            CON851P('01', _evaluardetalle, _validargrabarcambio_7411)
        }
    } else {
        CON851P('01', _evaluardetalle, _grabarregistro);
    }
}

function _grabarregistro() {
    SER108.FECHACRENUM = moment().format('YYYYMMDD');
    SER108.OPERNUM = $_ADMINW;
    SER108.FECHAMODNUM = ' ';
    SER108.OPERMODNUM = ' ';
    SER108.FACTCAPITW = $_PRECAPITW + $_NROCAPITW;
    SER108.HORASALW = SER108.HORASALW.replace(/:/, '');
    SER108.HORAINGNUMW = SER108.HORAINGNUMW.replace(/:/, '')
    SER108.PORCENCOPAGOW = SER108.PORCENCOPAGOW.replace('.', ' ').padStart(4, '0');
    let datos_envio = {};
    datos_envio.datosh = `${datosEnvio()}${SER108.NOVEDAD}|${SER108.LLAVEW}|${SER108.UNSERV}|${SER108.NITW}|${SER108.DESCRIPW}|${SER108.CONVENIOW}|${SER108.ESTADOW}|${SER108.SUCURSALW}|`
    datos_envio.datosh += `${SER108.PORCRETENCW}|${SER108.SEGRIPSW}|${SER108.CTAPICW}|${SER108.IDPACW}|${SER108.DESCRIPPACINUM}|${SER108.TIPOFACTW}|${SER108.HABW}|${SER108.PORCENCOPAGOW}|`
    datos_envio.datosh += `${SER108.FECHAINGNUM}|${SER108.FECHASALNUM}|${SER108.HORAINGNUMW}|${SER108.HORASALW}|${SER108.SERVICIOW}|${SER108.REDEXTERW}|${SER108.CONTRATOW}|${SER108.DIVISIONW}|${SER108.FACTCAPITW}|`
    datos_envio.datosh += `${SER108.FORMACOPAGW}|${SER108.CCOSTOW}|${SER108.ENVIOW}|${SER108.CONTROLCAPW}|${SER108.OBSERVW}|${SER108.TIPOPACIW}|${SER108.DETALLEW}|${SER108.CTLNROPACIW}|${SER108.CISW}|${SER108.MYTW}|`
    datos_envio.datosh += `${SER108.CONTROLXSERVW}|${SER108.CONTROLCL0}|${SER108.CONTROLCL1}|${SER108.CONTROLCL2}|${SER108.CONTROLCL3}|${SER108.CONTROLCL4}|${SER108.CONTROLCL5}|${SER108.CONTROLCL6}|`
    datos_envio.datosh += `${SER108.CONTROLCL7}|${SER108.ARTIVAW}|${SER108.NROPOLW}|${SER108.RUTAW}|${SER108.ESTW}|${SER108.CLASIFW}|${SER108.ENTRAREMITW}|${SER108.ORIGREMIT}|${SER108.TIPOEVENTOW}|${SER108.CIUDADW}|`
    datos_envio.datosh += `${SER108.FUNCAUTORINGW}|${SER108.NROAUTORIZACIONW}|${SER108.OBSERAPERW}|${SER108.OPERNUM}|${SER108.FECHACRENUM}|${SER108.FECHAMODNUM}|${SER108.OPERMODNUM}|${SER108.OPERBLOQNUM}|${SER108.FECHAINGAUT}|`
    datos_envio.datosh += `${SER108.HORAINGAUT}|${SER108.FECHAFINAUT}|${SER108.HORAFINAUT}|${SER108.CTRLXDIAG}|${SER108.LLAVESALID}|${SER108.NIVELCUPSW}|${SER108.COVID19W}|${SER108.NPBSW}|`
    console.log(datos_envio);
    postData(datos_envio
        , get_url("APP/SALUD/SER108-02.DLL"))
        .then((data) => {
            console.log(data);
            BUSCARNUMERO(_grabarnumero);
        })
        .catch((error) => {
            console.error(error);
            CON852(date[0], date[1], date[2], () => {
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    _cerrarSegundaVentana();
                } else {
                    _toggleNav()
                };
            });
        });
}

function _grabarcambio_SER108T() {
    SER108.FECHAMODNUM = moment().format('YYYYMMDD');
    SER108.OPERMODNUM = $_ADMINW;
    SER108.FECHACRENUM = $_ANOCRENUM + $_MESCRENUM + $_DIACRENUM;
    SER108.FACTCAPITW = $_PRECAPITW + $_NROCAPITW;
    SER108.HORASALW = SER108.HORASALW.replace(/:/, '');
    SER108.HORAINGNUMW = SER108.HORAINGNUMW.replace(/:/, '')
    $_PORCRETENCNUM = $_PORCRETENCNUM.replace('.', '').padStart(4, '0');
    SER108.CONVENIOW = $_CONVENIONUM;
    let datos_envio = {};
    datos_envio.datosh = `${datosEnvio()}${SER108.NOVEDAD}|${SER108.LLAVEW}|${SER108.UNSERV}|${$_NITNUM}|${$_DESCRIPNUM}|${$_CONVENIONUM}|${$_ESTADONUM}|${SER108.SUCURSALW}|`
    datos_envio.datosh += `${$_PORCRETENCNUM}|${$_SEGRIPSNUMW}|${$_CTAPICNUM}|${$_IDPACNUM}|${$_DESCRIPPACINUM}|${$_TIPOFACTNUM}|${$_HABNUM}|${$_PORCENCOPAGONUM}|`
    datos_envio.datosh += `${SER108.FECHAINGNUM}|${SER108.FECHASALNUM}|${SER108.HORAINGNUMW}|${SER108.HORASALW}|${$_SERVICIONUM}|${$_REDEXTERNUM}|${$_CONTRATONUM}|${$_DIVISIONNUM}|${$_FACTCAPITNUMW}|`
    datos_envio.datosh += `${$_FORMACOPAGNUM}|${$_CCOSTONUM}|${$_ENVIONUM}|${$_CONTROLCAPNUM}|${$_OBSERVNUM}|${$_TIPOPACINUM}|${$_DETALLENUM}|${$_CTLNROPACINUM}|${$_CISNUM}|${$_MYTNUM}|`
    datos_envio.datosh += `${$_CONTROLXSERVNUM}|${SER108.CONTROLCL0}|${SER108.CONTROLCL1}|${SER108.CONTROLCL2}|${SER108.CONTROLCL3}|${SER108.CONTROLCL4}|${SER108.CONTROLCL5}|${SER108.CONTROLCL6}|`
    datos_envio.datosh += `${SER108.CONTROLCL7}|${$_ARTIVANUM}|${$_NROPOLNUM}|${$_RUTANUM}|${$_ESTNUM}|${$_CLASIFNUM}|${$_ENTRAREMITNUM}|${SER108.ORIGREMIT}|${$_TIPOEVENTONUM}|${$_CIUDADNUM}|`
    datos_envio.datosh += `${$_FUNCAUTORINGNUM}|${SER108.NROAUTORIZACIONW}|${SER108.OBSERAPERW}|${SER108.OPERNUM}|${SER108.FECHACRENUM}|${SER108.FECHAMODNUM}|${SER108.OPERMODNUM}|${SER108.OPERBLOQNUM}|${SER108.FECHAINGAUT}|`
    datos_envio.datosh += `${SER108.HORAINGAUT}|${SER108.FECHAFINAUT}|${SER108.HORAFINAUT}|${SER108.CTRLXDIAG}|${SER108.LLAVESALID}|${SER108.NIVELCUPSW}|${SER108.COVID19W}|${SER108.NPBSW}|`
    console.log(datos_envio);
    postData(datos_envio
        , get_url("APP/SALUD/SER108-02.DLL"))
        .then((data) => {
            console.log(data);
            _dataSER108_cambio(data)
        })
        .catch((error) => {
            console.error(error);
            CON852(date[0], date[1], date[2], () => {
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    _cerrarSegundaVentana();
                } else {
                    _toggleNav()
                };
            });
        });
}

function _validargrabarcambio_7411() {
    if ((SER108.ESTADOW != $_ESTADONUM) && ($_ESTADONUM == '1' || $_ESTADONUM == '2')) {
        $_SWESTADO = '1';
    } else {
        if ($_ESTADONUM == '0') {
            $_SWESTADO = '1';
        } else {
            $_SWESTADO = '0';
        }
    }
    grabar_auditoria_SALUD(
        {
            'TIPO': 'I46',
            'NOVED': SER108.NOVEDAD,
            'LLAVE': SER108.LLAVEW,
            'ARCH': "NUMERACION     "
        },
        () => {
            loader("hide")
            if (($_NITUSU == '0844003225') || ($_NITUSU == '0800037021')) {
                // PERFORM GRABAR-FACT-TRIAGE2
                _grabarfacttriage2_7411(_grabarcambio_7411);
            } else {
                _grabarcambio_7411();
            }
        }
    )

}

function _grabarcambio_7411() {
    if (SER108.ESTADOW == '0') {
        SER108.OPERBLOQNUM = '';
        $("#bloqueo_108").val(SER108.OPERBLOQNUM);
    }
    SER108.FECHAMODNUM = moment().format('YYYYMMDD');
    SER108.OPERMODNUM = $_ADMINW;
    SER108.FECHACRENUM = $_ANOCRENUM + $_MESCRENUM + $_DIACRENUM;
    SER108.FACTCAPITW = $_PRECAPITW + $_NROCAPITW;
    SER108.HORASALW = SER108.HORASALW.replace(/:/, '');
    SER108.HORAINGNUMW = SER108.HORAINGNUMW.replace(/:/, '')
    SER108.PORCENCOPAGOW = SER108.PORCENCOPAGOW.replace('.', '').padStart(4, '0');
    let datos_envio = {};
    datos_envio.datosh = `${datosEnvio()}${SER108.NOVEDAD}|${SER108.LLAVEW}|${SER108.UNSERV}|${SER108.NITW}|${SER108.DESCRIPW}|${SER108.CONVENIOW}|${SER108.ESTADOW}|${SER108.SUCURSALW}|`
    datos_envio.datosh += `${SER108.PORCRETENCW}|${SER108.SEGRIPSW}|${SER108.CTAPICW}|${SER108.IDPACW}|${SER108.DESCRIPPACINUM}|${SER108.TIPOFACTW}|${SER108.HABW}|${SER108.PORCENCOPAGOW}|`
    datos_envio.datosh += `${SER108.FECHAINGNUM}|${SER108.FECHASALNUM}|${SER108.HORAINGNUMW}|${SER108.HORASALW}|${SER108.SERVICIOW}|${SER108.REDEXTERW}|${SER108.CONTRATOW}|${SER108.DIVISIONW}|${SER108.FACTCAPITW}|`
    datos_envio.datosh += `${SER108.FORMACOPAGW}|${SER108.CCOSTOW}|${SER108.ENVIOW}|${SER108.CONTROLCAPW}|${SER108.OBSERVW}|${SER108.TIPOPACIW}|${SER108.DETALLEW}|${SER108.CTLNROPACIW}|${SER108.CISW}|${SER108.MYTW}|`
    datos_envio.datosh += `${SER108.CONTROLXSERVW}|${SER108.CONTROLCL0}|${SER108.CONTROLCL1}|${SER108.CONTROLCL2}|${SER108.CONTROLCL3}|${SER108.CONTROLCL4}|${SER108.CONTROLCL5}|${SER108.CONTROLCL6}|`
    datos_envio.datosh += `${SER108.CONTROLCL7}|${SER108.ARTIVAW}|${SER108.NROPOLW}|${SER108.RUTAW}|${SER108.ESTW}|${SER108.CLASIFW}|${SER108.ENTRAREMITW}|${SER108.ORIGREMIT}|${SER108.TIPOEVENTOW}|${SER108.CIUDADW}|`
    datos_envio.datosh += `${SER108.FUNCAUTORINGW}|${SER108.NROAUTORIZACIONW}|${SER108.OBSERAPERW}|${SER108.OPERNUM}|${SER108.FECHACRENUM}|${SER108.FECHAMODNUM}|${SER108.OPERMODNUM}|${SER108.OPERBLOQNUM}|${SER108.FECHAINGAUT}|`
    datos_envio.datosh += `${SER108.HORAINGAUT}|${SER108.FECHAFINAUT}|${SER108.HORAFINAUT}|${SER108.CTRLXDIAG}|${SER108.LLAVESALID}|${SER108.NIVELCUPSW}|${SER108.COVID19W}|${SER108.NPBSW}|`
    console.log(datos_envio);
    postData(datos_envio
        , get_url("APP/SALUD/SER108-02.DLL"))
        .then((data) => {
            console.log(data);
            _dataSER108_cambio(data);
        })
        .catch((error) => {
            console.error(error);
            CON852(date[0], date[1], date[2], () => {
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    _cerrarSegundaVentana();
                } else {
                    _toggleNav()
                };
            });
        });
}


function _dataSER108_cambio(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    SER108.LLAVEW = SER108.LLAVEW.substring(0, 1) + date[2].trim();
    if (swinvalid == '00') {
        if (SER108.CONVENIOW == $_CONVENIOACTUAL) {
            if ($_NITNUM == $_NITACTUAL) {
                //////CONTINUE
                _movimientograbarcambio_7411();

            } else {
                setTimeout(() => CON851P('50', _movimientograbarcambio_7411, _reliquidarcomprob_7411), 300)
            }
        } else {
            setTimeout(() => CON851P('50', _movimientograbarcambio_7411, _reliquidarcomprob_7411), 300)
        }
    } else if (swinvalid == '01') {
        CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'Error');
        _evaluarobservacion_SAL7411();
    } else {
        CON852(date[1], date[2], date[3], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _grabarfacttriage2_7411(callback) {
    //////FALTA HACER ESTE FUNCION 
    console.log('grabarfacttriage2')
    if ($_PREFIJOW = "P" || "T" || "O" || "Q" || "R" || "S" || "U" || "V" || "W" || "X" || "Y" || "Z") {
        let URL = get_url("APP/SALUD/108.DLL");
        postData({
            datosh: datosEnvio() + SER108.LLAVETRIAGEW + '|' + SER108.LLAVEW + '|'
        }, URL)
            .then(data => {
                callback();
            })
            .catch(error => {
                console.log(error);
                callback();
            });
    }
}

function _reliquidarcomprob_7411() {
    let URL = get_url("APP/SALUD/SER612R.DLL");
    postData({ datosh: datosEnvio() + $_LLAVENUM + '|' + $_ADMINW + '|' }, URL)
        .then(data => {
            $_COMPROBANTE = data['RELIQUIDA'];
            swinvalid = $_COMPROBANTE[0].ESTADO;
            $_SUCURSAL = $_COMPROBANTE[0].SUCURSAL;
            $_CLFACT = $_COMPROBANTE[0].CLFACT;
            $_NROFACT = $_COMPROBANTE[0].NROFACT;
            $_FECHAFAT = $_COMPROBANTE[0].FECHAFAT;
            if (swinvalid == '08') {
                CON851('08', '08', null, 'error', 'error');
                _movimientograbarcambio_7411();
            } else if (swinvalid == '01') {
                var ventanaDuplicado = bootbox.dialog({
                    title: 'RELIQUIDANDO FACT:' + $_LLAVENUM,
                    message: '<style type="text/css">' + '.modal-footer {' +
                        +'padding: 10px;' +
                        'text-align: right;' +
                        'margin-top:38px;' +
                        'border-top: 1px solid #e5e5e5;}' +
                        '</style>' +
                        '<div class="table-scrollable">' +
                        '<table class="table table-striped table-hover">' +
                        '<thead><tr>' +
                        '<th>Estado</th>' +
                        '</tr></thead>' +
                        '<tbody>' +
                        //registro existente
                        '<tr class="encontrado">' +
                        `<td>"ERROR NO EXISTE CONVENIO"</td></tr>` +
                        '</tbody>' +
                        '</table>' +
                        '</div>' //cierrra portlety
                    ,
                    buttons: {
                        Aceptar: {
                            span: 'Aceptar',
                            className: 'btn-primary',
                            callback: function () {
                                ventanaDuplicado.off('show.bs.modal');
                                setTimeout(_movimientograbarcambio_7411, 300)
                            }
                        }
                    }
                })

            } else {
                var ventanaDuplicado = bootbox.dialog({
                    title: 'RELIQUIDANDO FACT:' + $_LLAVENUM,
                    message: '<style type="text/css">' + '.modal-footer {' +
                        +'padding: 10px;' +
                        'text-align: right;' +
                        'margin-top:38px;' +
                        'border-top: 1px solid #e5e5e5;}' +
                        '</style>' +
                        '<div class="table-scrollable">' +
                        '<table class="table table-striped table-hover">' +
                        '<thead><tr>' +
                        '<th>Sucursal</th>' +
                        '<th>Cl fact</th>' +
                        '<th>Nro fact</th>' +
                        '<th>Fecha fact</th>' +
                        '</tr></thead>' +
                        '<tbody id= "COMPROBANTES">' +
                        `${obtenerComprobantes($_COMPROBANTE = data['RELIQUIDA'])}` +
                        '</tbody>' +
                        '</table>' +
                        '</div>' //cierrra portlety
                    ,
                    buttons: {
                        Aceptar: {
                            span: 'Aceptar',
                            className: 'btn-primary',
                            callback: function () {
                                ventanaDuplicado.off('show.bs.modal');
                                setTimeout(_movimientograbarcambio_7411, 300)
                            }
                        }
                    }
                })
            }


        })
        .catch(err => {
            console.debug(err);
        })
}
function obtenerComprobantes(arrCompr) {
    let comprobantes = '';
    for (let i = 0; i < arrCompr.length; i++) {
        if (arrCompr[i].SUCURSAL.trim() != '') {
            comprobantes += (`<tr><td >${arrCompr[i].SUCURSAL}</td>` + `<td >${arrCompr[i].CLFACT}</td>` + `<td >${arrCompr[i].NROFACT}</td>` + `<td >${arrCompr[i].FECHAFAT}</td></tr>`);
        }
    }
    return comprobantes;
}

function _movimientograbarcambio_7411() {
    console.log('MODIFICA MOVIMIENTO')
    if (($_PREFIJONUM != 'U' && $_PREFIJONUM != 'C' && $_PREFIJONUM != 'V' && $_PREFIJONUM != 'E' && $_PREFIJONUM != 'Ñ')
        && ($_SWESTADO == '1') && ($_AÑOPACI_RET7411 > 1999)) {
        let URL = get_url("APP/SALUD/SAL020E.DLL");
        postData({ datosh: datosEnvio() + $_LLAVENUM + '|' + localStorage.Usuario + '|' }, URL)
            .then(data => {
                console.debug(data);
            })
            .catch(err => {
                console.debug(err);
            })
    }
    _modificanitfacturacion_7411()
}

function _modificanitfacturacion_7411() {
    if (SER108.NITW != $_NITANT) {
        let URL = get_url("APP/SALUD/SER168A.DLL");
        postData({ datosh: datosEnvio() + $_LLAVENUM + '|' + SER108.NITW + '|' + SER108.FECHAINGNUM + '|' }, URL)
            .then(data => {
                console.debug(data);
            })
            .catch(err => {
                console.debug(err);
            })
    }
    otrocodigo_7411();
}

// LLAMADO_DLL({
//     dato: [$_LLAVENUM, SER108.NITW, SER108.FECHAINGNUM],
//     callback: respuestacambianit_7411,
//     nombredll: 'SER168A',
//     carpeta: 'SALUD'
// });

// function respuestacambianit_7411(data) {
//     var date = data.split('|');
//     var swinvalid = date[0].trim();
//     if (swinvalid == '00') {
//         otrocodigo_7411();
//     } else if (swinvalid == '01') {
//         // CON851('01', 'ES IGUAL NIT FACT', null, 'error', 'error');
//         otrocodigo_7411();
//     } else if (swinvalid == '08') {
//         // CON851('08', 'NO HAY MOVIMIENTO', null, 'error', 'error');
//         otrocodigo_7411();
//     } else {
//         CON852(date[0], date[1], date[2], () => {
//             let Window = BrowserWindow.getAllWindows();
//             if (Window.length > 1) {
//                 _cerrarSegundaVentana();
//             } else {
//                 _toggleNav()
//             };
//         });
//     }
// }

function _grabarnumero() {
    var fechacre = moment().format('YYMMDD');
    // $_FACT = $_NROW.substring(1, 7);
    let URL = get_url("APP/CONTAB/CON007X.DLL");
    postData({ datosh: datosEnvio() + $_SECUNUM + '|' + fechacre + '|' + SER108.LLAVEW.substring(1, 7) + '|' }, URL)
        .then(data => {
            grabar_auditoria_SALUD(
                {
                    'TIPO': 'IS41',
                    'NOVED': SER108.NOVEDAD,
                    'LLAVE': SER108.LLAVEW,
                    'ARCH': "NUMERACION     "
                },
                () => {
                    loader("hide")
                    if (($_NITUSU == '0844003225') || ($_NITUSU == '0800037021')) {
                        _grabarfacttriage2_7411(otrocodigo_7411);
                    } else {
                        otrocodigo_7411();
                    }
                }
            )
        })
        .catch(err => {
            console.debug(err);
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        })
}

function otrocodigo_7411() {
    if ((SER108.REDEXTERW == 'S') && ($_NITUSU == "0800162035")) {
        SER108.REDEXTERW = 'N';
        $("#redext_108").val(SER108.REDEXTERW);
        BUSCARNUMERO(_grabarnumero);
        //////// VERIFICAR BIEN ESTE CICLO 

    } else if (SER108.NOVEDAD == '9') {
        _infoCON007B_01();
    } else {
        if ($_NITUSU == '0900264583') {
            _grabarcorresponsalia();
            // GO TO ABRIR-SERVICIOS-HOSP
        } else {
            toastr.success('Se ha guardado', 'APERTURA DE FACTURACION');
            _inputControl('reset');
            console.log($_HISTORIA, $_TRIAGE, 'VARIABLE HISTORIA')
            if ($_HISTORIA) {
                postData({ datosh: datosEnvio() + SER108.LLAVEHISTORIA + '||3||' + $_FECHA_LNK.substring(0, 2) + '|' + SER108.LLAVEW + '|' }, get_url("APP/SALUD/SER405.DLL"))
                    .then(data => {
                        console.log(data)
                        _validarimpresion_SER1089();
                    })
                    .catch(err => {
                        console.error(err)
                        _evaluarobservacionaper()
                    });
            } else {
                if ($_TRIAGE) {
                    postData({ datosh: datosEnvio() + SER108.LLAVETRIAGE + "|" + SER108.LLAVEW + '|' }, get_url("APP/SALUD/SER405A.DLL"))
                        .then(data => {
                            console.log(data)
                            _validarimpresion_SER1089();
                        })
                        .catch(err => {
                            console.error(err)
                            _evaluarobservacionaper()
                        });
                } else {
                    _validarimpresion_SER1089();
                }
            }
        }
    }
}

function _validarimpresion_SER1089() {
    CON851P('00', () => {
        let Window = BrowserWindow.getAllWindows();
        if (Window.length > 1) {
            _cerrarSegundaVentana();
        } else {
            _toggleNav()
        };
    }, _imprimirfactura_SAL7411)
}

function _imprimirfactura_SAL7411() {
    loader("show");
    var datos_envio = datosEnvio();
    datos_envio += SER108.LLAVEW + '|' + $_NITUSU + '|' + $_NOMBREUSU + '|' + $_ADMINW
    let URL = get_url("APP/SALUD/SER108-15.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(function (data) {
            SER108.FACTURAS = data.FACTURAS[0];
            if (SER108.FACTURAS.ANORET == '0000') {
                SER108.FACTURAS.MESRET = ' '
                SER108.FACTURAS.DIARET = ' '
                SER108.FACTURAS.ANORET = ' '
                SER108.FECHARETCOMPLETA = SER108.FACTURAS.MESRET + SER108.FACTURAS.DIARET + SER108.FACTURAS.ANORET
            } else {
                SER108.FECHARETCOMPLETA = SER108.FACTURAS.MESRET + ' ' + SER108.FACTURAS.DIARET + '/' + SER108.FACTURAS.ANORET
            }
            let datosimpresionSER108 = {
                pageSize: "A4",
                pageMargins: [18, 100, 15, 20],
                header: function (currentPage, pageCount, pageSize) {
                    return [
                        { text: ' ' },

                        {
                            image: "logo",
                            fit: [60, 60],
                            absolutePosition: { x: 40, y: 25 },
                        },
                        { text: ' ' },
                        {
                            columns: [
                                { text: 'HOJA DE ADMISION', width: '50%', style: 'titulos1', margin: [120, 0, 0, 0] },
                                { text: 'CUENTA NRO:', width: '16%', style: 'titulos1' },
                                { text: SER108.FACTURAS.FACTURA, width: '15%', style: 'titulos2' },
                            ],
                        },
                        { text: ' ' },
                        {
                            columns: [
                                { text: $_USUA_GLOBAL[0].NOMBRE, width: '56%', style: 'titulos3', margin: [120, 0, 0, 0] },
                                { text: 'NIT', width: '8%', style: 'titulos3' },
                                { text: $_USUA_GLOBAL[0].NIT, width: '10%', style: 'titulos3' },
                            ],
                        },
                    ]
                },
                content: [
                    { canvas: [{ type: 'line', x1: 0, y1: 3, x2: 550, y2: 3, lineWidth: 1 }] },
                    { text: ' ' },
                    {
                        columns: [
                            { text: 'PACIENTE: ', width: "15%", style: "textheadertitle" },
                            { text: SER108.FACTURAS.CEDULA.replace(/^0+/, ''), width: "17%", style: "texto" },
                            { text: SER108.FACTURAS.PACIENTE, width: "50%", style: "titulos3" },
                        ],
                    },
                    { text: ' ' },
                    {
                        columns: [
                            { text: 'ENTIDAD: ', width: "15%", style: "textheadertitle" },
                            { text: SER108.FACTURAS.EPS.replace(/^0+/, ''), width: "30%", style: "texto" },
                            { text: SER108.FACTURAS.NOMBREEPS, width: "50%", style: "texto" },
                        ],
                    },
                    {
                        columns: [
                            { text: 'FECHA INGRESO: ', width: "15%", style: "textheadertitle" },
                            { text: SER108.FACTURAS.MESING + ' ' + SER108.FACTURAS.DIAING + '/' + SER108.FACTURAS.ANOING, width: "30%", style: "texto" },
                            { text: 'HABITACION : ', width: "13%", style: "textheadertitle" },
                            { text: SER108.FACTURAS.HABITACION, width: "15%", style: "texto" },
                        ],
                    },
                    {
                        columns: [
                            { text: 'FECHA SALIDA: ', width: "15%", style: "textheadertitle" },
                            { text: SER108.FECHARETCOMPLETA, width: "30%", style: "texto" },
                        ],
                    },
                    { text: ' ' },
                    { canvas: [{ type: 'line', x1: 0, y1: 3, x2: 550, y2: 3, lineWidth: 1 }] },
                    { text: ' ' },
                    {
                        columns: [
                            { text: 'AUTORIZO: ', width: "15%", style: "textheadertitle" },
                            { text: SER108.FACTURAS.FUNCIONARIO.replace(/^0+/, ''), width: "45%", style: "texto" },
                            { text: '____________________________________________________', width: "50%", style: "texto" },
                        ],
                    },
                    {
                        columns: [
                            { text: ' ', width: "60%", style: "textheadertitle" },
                            { text: SER108.FACTURAS.NOMBREFUNC, width: "50%", style: "texto" },
                        ],
                    },
                    { text: ' ' },
                    {
                        columns: [
                            { text: 'OBSERVACION: ', width: "15%", style: "textheadertitle" },
                            { text: SER108.FACTURAS.OBSERVACION, width: "60%", style: "texto" },
                        ],
                    },
                    { text: ' ' },
                    { text: ' ' },
                    {
                        columns: [
                            { text: " ", width: "54%", style: "textheader" },
                            { text: "CREO:", width: "4%", style: "textheader" },
                            { text: SER108.FACTURAS.OPERCREADO + ' ' + SER108.FACTURAS.FECHACREADO, width: "10%", style: "textheader" },
                            { text: "MODI:", width: "4%", style: "textheader" },
                            { text: SER108.FACTURAS.OPERMODIF + ' ' + SER108.FACTURAS.FECHAMODIF, width: "10%", style: "textheader" },
                            { text: "BLOQ:", width: "4%", style: "textheader" },
                            { text: SER108.FACTURAS.OPERBLOQ, width: "5%", style: "textheader" },
                            { text: "IMP:", width: "4%", style: "textheader" },
                            { text: localStorage.Usuario, width: "5%", style: "textheader" },
                        ]
                    },
                    { text: ' ' },
                    { canvas: [{ type: 'line', x1: 0, y1: 3, x2: 550, y2: 3, lineWidth: 1 }] },
                ],
                styles: {
                    titulos1: {
                        alignment: 'center',
                        fontSize: 15,
                    },
                    titulos2: {
                        alignment: 'center',
                        fontSize: 15,
                        bold: true,
                    },
                    titulos3: {
                        alignment: 'center',
                        fontSize: 11,
                        bold: true,
                    },
                    texto: {
                        fontSize: 9,
                    },
                    textheader: {
                        alignment: 'rigth',
                        fontSize: 7,
                    },
                    textheadertitle: {
                        alignment: 'rigth',
                        fontSize: 9,
                        bold: true
                    },
                }
            };
            datosimpresionSER108.images = {
                logo: "P:\\PROG\\LOGOS\\" + $_USUA_GLOBAL[0].NIT.toString() + ".png"
            };
            _impresion2({
                tipo: 'pdf',
                content: datosimpresionSER108,
                archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}.pdf`,
            })
                .then(() => {
                    loader("hide");
                    let Window = BrowserWindow.getAllWindows();
                    if (Window.length > 1) {
                        setTimeout(_cerrarSegundaVentana, 1000)

                    } else {
                        _toggleNav()
                    };
                })
                .catch((err) => {
                    console.error(err);
                    _evaluarobservacionaper();
                });
        })
        .catch(err => {
            console.debug(err);
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        })
}


//////////////RETIRAR REGISTRO//////////////////////////////7
function _retiroregistro() {
    // $_LLAVEAUD = $_NUMERONUM 
    grabar_auditoria_SALUD(
        {
            'TIPO': 'IS41',
            'NOVED': SER108.NOVEDAD,
            'LLAVE': SER108.LLAVEW,
            'ARCH': "NUMERACION     "
        },
        () => {
            loader('hide');
            if (($_TOTALFACT == 0) && ($_ESTADONUM == '0')) {
                CON851P('54', _evaluarfactura, _eliminarregistro)
            } else {
                if ($_NITUSU == '070100111') {
                    CON851P('54', _evaluarfactura, _eliminarregistro)
                } else {
                    CON851('52', '52', null, 'error', 'error')
                    _prefijo_ser108();
                }
            }
        }
    )
}

function _eliminarregistro() {
    if (SER108.NOVEDAD == '8') {
        SER108.FECHAMODNUM = moment().format('YYYYMMDD');
        SER108.OPERMODNUM = $_ADMINW;
        SER108.FECHACRENUM = $_ANOCRENUM + $_MESCRENUM + $_DIACRENUM;

        SER108.HORAINGNUMW = $_HORAPACI_ING7411 + $_MINPACI_ING7411;
        SER108.NITW = $_NITNUM;
        SER108.DESCRIPW = $_DESCRIPNUM;
    } else {
        SER108.FECHACRENUM = moment().format('YYYYMMDD');
        SER108.OPERNUM = $_ADMINW;
        SER108.FECHAMODNUM = ' ';
        SER108.OPERMODNUM = ' ';
    }
    SER108.FACTCAPITW = $_PRECAPITW + $_NROCAPITW;
    let datos_envio = {};
    datos_envio.datosh = `${datosEnvio()}${SER108.NOVEDAD}|${SER108.LLAVEW}|${SER108.UNSERV}|${SER108.NITW}|${SER108.DESCRIPW}|${SER108.CONVENIOW}|${SER108.ESTADOW}|${SER108.SUCURSALW}|`
    datos_envio.datosh += `${SER108.PORCRETENCW}|${SER108.SEGRIPSW}|${SER108.CTAPICW}|${SER108.IDPACW}|${SER108.DESCRIPPACINUM}|${SER108.TIPOFACTW}|${SER108.HABW}|${SER108.PORCENCOPAGOW}|`
    datos_envio.datosh += `${SER108.FECHAINGNUM}|${SER108.FECHASALNUM}|${SER108.HORAINGNUMW}|${SER108.HORASALW}|${SER108.SERVICIOW}|${SER108.REDEXTERW}|${SER108.CONTRATOW}|${SER108.DIVISIONW}|${SER108.FACTCAPITW}|`
    datos_envio.datosh += `${SER108.FORMACOPAGW}|${SER108.CCOSTOW}|${SER108.ENVIOW}|${SER108.CONTROLCAPW}|${SER108.OBSERVW}|${SER108.TIPOPACIW}|${SER108.DETALLEW}|${SER108.CTLNROPACIW}|${SER108.CISW}|${SER108.MYTW}|`
    datos_envio.datosh += `${SER108.CONTROLXSERVW}|${SER108.CONTROLCL0}|${SER108.CONTROLCL1}|${SER108.CONTROLCL2}|${SER108.CONTROLCL3}|${SER108.CONTROLCL4}|${SER108.CONTROLCL5}|${SER108.CONTROLCL6}|`
    datos_envio.datosh += `${SER108.CONTROLCL7}|${SER108.ARTIVAW}|${SER108.NROPOLW}|${SER108.RUTAW}|${SER108.ESTW}|${SER108.CLASIFW}|${SER108.ENTRAREMITW}|${SER108.ORIGREMIT}|${SER108.TIPOEVENTOW}|${SER108.CIUDADW}|`
    datos_envio.datosh += `${SER108.FUNCAUTORINGW}|${SER108.NROAUTORIZACIONW}|${SER108.OBSERAPERW}|${SER108.OPERNUM}|${SER108.FECHACRENUM}|${SER108.FECHAMODNUM}|${SER108.OPERMODNUM}|${SER108.OPERBLOQNUM}|${SER108.FECHAINGAUT}|`
    datos_envio.datosh += `${SER108.HORAINGAUT}|${SER108.FECHAFINAUT}|${SER108.HORAFINAUT}|${SER108.CTRLXDIAG}|${SER108.LLAVESALID}|${SER108.NIVELCUPSW}|${SER108.COVID19W}|${SER108.NPBSW}|`
    console.log(datosEnvio);
    postData(datos_envio
        , get_url("APP/SALUD/SER108-02.DLL"))
        .then((data) => {
            console.log(data);
            _dataSER108_eliminar(data);
        })
        .catch((error) => {
            console.error(error);
            CON852(date[0], date[1], date[2], () => {
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    _cerrarSegundaVentana();
                } else {
                    _toggleNav()
                };
            });
        });
}

function _dataSER108_eliminar(data) {
    var date = data.split('|');
    var swinvalid = date[0];
    if (swinvalid == "00") {
        toastr.success('Se ha retirado', 'APERTURA DE FACTURACION');
        _revisarbloqueos_SER108(data => {
            if (data == "00") {
                CON851P('24', _saliropcion_97411, _ventanaactualizarcorresponsalia)
            }
            else {
                CON851(swinvalid, swinvalid, null, 'error', 'error');
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    _cerrarSegundaVentana();
                } else {
                    _toggleNav()
                };
            }
        }, _evaluarobservacionaper, params = { CODIGO: 'IS767C' });

    } else if (swinvalid == "01") {
        CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'error');
        _evaluarobservacionaper();
    }
    else {
        CON852(date[0], date[1], date[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}
function _ventanaactualizarcorresponsalia() {
    let { ipcRenderer } = require("electron");
    ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110CFAC.html', factura: SER108.LLAVEW });
    vector = ['on', 'Actualizando corresponsalia de factura...']
    _EventocrearSegventana(vector, _saliropcion_97411);
}

function _saliropcion_97411() {
    loader("hide")
    _inputControl("reset");
    _inputControl("disabled");
    let Window = BrowserWindow.getAllWindows();
    if (Window.length > 1) {
        _cerrarSegundaVentana();
    } else {
        _toggleNav()
    };
}

//////////////////////////// NOVEDAD 8 Y 9 MOSTRAR DATOS /////////////////////////////////

function consultamostrardatos_SAL7411() {
    $("#factura_108").val($_NUMERONUM);
    let unidadservicio = SER108.UNISERVICIO.filter(x => x.DESCRIP.substring(0, 2) == SER108.UNSERV);
    if (unidadservicio.length > 0) {
        $("#undservicio_108").val(`${unidadservicio[0].DESCRIP}`);
    } else {
        $("#undservicio_108").val(`${SER108.UNSERV} - NO EXISTE UNIDAD DE SERVICIO`);
    }
    $("#nit_108").val($_NITNUM);
    $("#nitd_108").val($_DESCRIPNUM);
    SER108.NITW = $_NITNUM;
    $_NITANT = $_NITNUM;
    $_NITACTUAL = $_NITNUM;
    SER108.DESCRIPW = $_DESCRIPNUM;
    $("#convenio_108").val($_CONVENIONUM);
    $_CONVENIOACTUAL = $_CONVENIONUM;
    $("#conveniod_108").val($_DESCRIPTAR);
    let estado = { '0': 'ACTIVO', '1': 'INACTIVO', '2': 'ANULADO', '3': 'BLOQUEO', '4': 'BLOQUEO X DISPERSION' };
    $("#estado_108").val($_ESTADONUM + ' - ' + estado[$_ESTADONUM]);
    $("#sucur_108").val(SER108.SUCURSALW);
    $("#descripsucur_108").val(SER108.DESCRIPSUCW);
    $("#retencion_108").val($_PORCRETENCNUM);
    $("#bloq_108").val($_SEGRIPSNUMW);
    $("#pic_108").val($_CTAPICNUM);
    $("#idpaciente_108").val($_IDPACNUM);
    $("#idpaciented_108").val($_DESCRIPPACINUM);
    var edad = calcular_edad($_FECHANACPAC);
    $("#edad_108").val(edad.unid_edad + edad.vlr_edad.toString().padStart('0'));
    $_UNIDEDADW = edad.unid_edad;
    $_VLREDADW = edad.vlr_edad.toString().padStart('0');
    $("#tipo_108").val($_TIPOFACTNUM);
    $("#habit_108").val($_HABNUM);
    vlrcopago_7411Mask.typedValue = $_PORCENCOPAGONUM;
    $_AÑOPACI_ING7411 = SER108.FECHAINGNUM.substring(0, 4);
    $_MESPACI_ING7411 = SER108.FECHAINGNUM.substring(4, 6);
    $_DIAPACI_ING7411 = SER108.FECHAINGNUM.substring(6, 8);
    $_HORAPACI_ING7411 = SER108.HORAINGNUMW.substring(0, 2)
    $_MINPACI_ING7411 = SER108.HORAINGNUMW.substring(2, 4)
    SER108.FECHARETIROW = SER108.FECHASALNUM
    $_AÑOPACI_RET7411 = SER108.FECHASALNUM.substring(0, 4);
    $_MESPACI_RET7411 = SER108.FECHASALNUM.substring(4, 6);
    $_DIAPACI_RET7411 = SER108.FECHASALNUM.substring(6, 8);
    $_HORAPACI_RET7411 = SER108.HORASALW.substring(0, 2)
    $_MINPACI_RET7411 = SER108.HORASALW.substring(2, 4)
    SER108.ANOINGNUM = $_AÑOPACI_ING7411;
    SER108.MESINGNUM = $_MESPACI_ING7411;
    $("#anoing_108").val($_AÑOPACI_ING7411);
    $("#mesing_108").val($_MESPACI_ING7411);
    $("#diaing_108").val($_DIAPACI_ING7411);
    $("#anosal_108").val($_AÑOPACI_RET7411);
    $("#messal_108").val($_MESPACI_RET7411);
    $("#diasal_108").val($_DIAPACI_RET7411);
    $("#horaing_108").val($_HORAPACI_ING7411 + ':' + $_MINPACI_ING7411);
    $("#horasal_108").val($_HORAPACI_RET7411 + ':' + $_MINPACI_RET7411);
    $("#servicio_108").val($_SERVICIONUM);
    if ($_SERVICIONUM == '00') $_DESCRIPSERHO = 'NO APLICA'
    $("#descripservicio_108").val($_DESCRIPSERHO);
    $("#redext_108").val($_REDEXTERNUM);
    $("#contrato_108").val($_CONTRATONUM);
    if ($_PRECAPITNUM == '0') {
        $_PRECAPITNUM = '';
        $_NROCAPITNUM = '';
        $("#precapit_108").val($_PRECAPITNUM);
        $("#capit_108").val($_NROCAPITNUM);
    } else {
        $("#precapit_108").val($_PRECAPITNUM);
        $("#capit_108").val($_NROCAPITNUM);
    }
    $("#division_108").val($_DIVISIONNUM);
    let formapago = { '1': 'ACEPTA COPAGO', '2': 'NO ACEPT COPAGO', '3': 'COPAGO INGRESO', '4': 'COPAGO PGP' };
    if (formapago[$_FORMACOPAGNUM] == undefined) {
        $("#formadepago_108").val('');
    } else {
        $("#formadepago_108").val($_FORMACOPAGNUM + ' - ' + formapago[$_FORMACOPAGNUM]);
    }

    $("#envio_108").val($_ENVIONUM);
    $("#costos_108").val($_CCOSTONUM);
    $("#costosd_108").val($_NOMBRECOSTO);
    $("#observacion_108").val($_OBSERVNUM);
    $("#ctrlcont_108").val($_CONTROLCAPNUM);
    $("#ctrldi_108").val(SER108.CTRLXDIAG)
    $("#detalle_108").val($_DETALLENUM);
    $("#bol_108").val(SER108.LLAVESALID);
    let tipo = { 'C': 'CONTRIBUTIVO', 'S': 'SUBSIDIADO', 'V': 'VINCULADO', 'P': 'PARTICULAR ', 'O': 'OTRO TIPOP', 'D': 'DESP. CONT', 'E': 'DESP. SUBS', 'F': 'DESP. VINC', 'T': 'TODOS ' };
    if ($_TIPOPACINUM == "*") {
        $_TIPOPACINUM = 'T';
        $("#tipopaci_108").val($_TIPOPACINUM + ' - ' + tipo[$_TIPOPACINUM]);
    } else if (tipo[$_TIPOPACINUM] == undefined) {
        $("#tipopaci_108").val('');
    } else {
        $("#tipopaci_108").val($_TIPOPACINUM + ' - ' + tipo[$_TIPOPACINUM]);
    }
    $("#mostrar_108").val($_CTLNROPACINUM);
    $("#nivel_108").val(SER108.NIVELCUPSW)
    $("#codcis_108").val($_CISNUM);
    $("#myt_108").val($_MYTNUM);
    $("#ctrlxserv_108").val($_CONTROLXSERVNUM);
    $("#controlcl0_108").val(SER108.CONTROLCL0);
    $("#controlcl1_108").val(SER108.CONTROLCL1);
    $("#controlcl2_108").val(SER108.CONTROLCL2);
    $("#controlcl3_108").val(SER108.CONTROLCL3);
    $("#controlcl4_108").val(SER108.CONTROLCL4);
    $("#controlcl5_108").val(SER108.CONTROLCL5);
    $("#controlcl6_108").val(SER108.CONTROLCL6)
    $("#controlcl7_108").val(SER108.CONTROLCL7);
    $("#artconiva_108").val($_ARTIVANUM);
    $("#nropol_108").val($_NROPOLNUM);
    $("#ruta_108").val($_RUTANUM);
    $("#est_108").val($_ESTNUM);
    let clasificacion = { '1': 'POS', '2': 'NO POS', '3': 'NO APLICA' };
    if (clasificacion[$_CLASIFNUM] == undefined) {
        $("#clasificacion_108").val('');
    } else {
        $("#clasificacion_108").val($_CLASIFNUM + ' - ' + clasificacion[$_CLASIFNUM]);
    }
    $("#remitido_108").val($_ENTRAREMITNUM);
    $("#origen_108").val(SER108.ORIGREMIT);
    $("#origend_108").val($_NOMBREIPS);
    let tipoevento = { '00': 'NO APLICA', '01': 'ACCIIDENTE DE TRANSI', '02': 'SISMO', '03': 'MAREMOTO', '04': 'ERUPCIONES VOLCANIC', '05': 'DESLIOZAMIENTO TIERR', '06': 'INUNDACIONES', '07': 'AVALANCHA', '08': 'INCENDIO NATURAL', '09': 'EXPLOSION TERRORIST', '10': 'INCENDIO TERRORISTA', '11': 'COMBATE', '12': 'ATAQUE A MUNICIPIOS', '13': 'MASACRE', '14': 'DESPLAZADOS', '15': 'OTRO', '16': 'HURACAN', '18': 'MINA ANTIPERSONAL' };
    $("#tipoevento_108").val($_TIPOEVENTONUM + ' - ' + tipoevento[$_TIPOEVENTONUM]);
    $("#ciudad_108").val($_CIUDADNUM);
    $("#ciudadd_108").val($_NOMBRECIUD);
    $("#funauto_108").val($_FUNCAUTORINGNUM);
    if ($_FUNCAUTORINGNUM == '0000000000') {
        $_DESCRIPFUNCAUTO = ''
        $("#funautod_108").val($_DESCRIPFUNCAUTO);
    } else {
        $("#funautod_108").val($_DESCRIPFUNCAUTO);
    }
    $("#nroauto_108").val(SER108.NROAUTORIZACIONW);
    $("#obserapertura_108").val(SER108.OBSERAPERW);
    $("#creado_108").val(SER108.OPERNUM);
    $("#creadod_108").val($_ANOCRENUM + '/' + $_MESCRENUM + '/' + $_DIACRENUM);
    $("#modificado_108").val(SER108.OPERMODNUM);
    $("#modificadod_108").val($_ANOMODNUM + '/' + $_MESMODNUM + '/' + $_DIAMODNUM);
    $("#bloqueo_108").val(SER108.OPERBLOQNUM);
    $("#ctrldi_108").val(SER108.CTRLXDIAG);
    if (SER108.CUFEELECNUM.trim() != '') $('#CUFE_SER108').removeClass('hidden');
    $("#cufe_108").val(SER108.CUFEELECNUM);
    $("#covid19_108").val(SER108.COVID19W);
    $("#npbs_108").val(SER108.NPBSW);

    if ($_ESTADONUM != '0' && SER108.CUFEELECNUM != '') {
        CON851('R9', 'R9', null, 'error', 'error');
        // if (localStorage.Usuario == 'GEBC') {
        // _continuarestricciones_SER108()
        // } else {
        _evaluarfactura()
        // }
    } else {
        _continuarestricciones_SER108()
    }
}
function _continuarestricciones_SER108() {
    if ($_ESTADONUM == '1' && $_SEGRIPSNUMW == 'S') {
        CON851('72', '72', null, 'error', 'error');
        if ($_ADMINW == 'GEBC' || $_ADMINW == 'LYRC' || $_ADMINW == 'MSBR') {
            _evaluarconvenio_SAL7411()
        } else {
            _evaluarfactura()
        }
    } else if (($_NITUSU == '0800037021') && ($_ADMINW == 'JASP') && (SER108.OPERNUM != $_ADMINW)) {
        CON851('15', '15', null, 'error', 'error');
        _evaluarfactura();
    } else {
        if (SER108.NOVEDAD == '9') {
            _retiroregistro();
        } else if (SER108.NOVEDAD == '8') {
            if (SER108F.OPCIONACTIVA == '097415') {
                _evaluarnroautorizacion();
            } else {
                _evaluarconvenio_SAL7411();
            }
        }
    }
}


/////////////////////////////////// VENTANAS O VALIDACIONES APARTE ////////////////////////////

function ventanaclave() {
    if ($_PREFIJOW == "A") {
        // CLAVE DE ACCESO 1 AMBULATORIO
        clavedeacceso({
            size: 'small',
            titulo: 'CLAVE DE ACCESO 1 AMBULATORIO',
            span: 'Digite la clave',
            nombrelabel: 'CLAVE',
        })
    }
    else {
        //CALVE DE ACCESO 2 P O T
        clavedeacceso({
            size: 'small',
            titulo: 'CLAVE DE ACCESO 2 P O T',
            span: 'Digite la clave',
            nombrelabel: 'CLAVE',
        })
    }
}

function clavedeacceso(parametros) {
    var ventanaacceso = bootbox.dialog({
        size: parametros.size,
        onEscape: false,
        title: parametros.titulo,
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="form-group" id="clavea_108"> ' +
            '<label class="col-md-4 control-label" for="name">' + parametros.nombrelabel + '</label> ' +
            '<div class="col-md-6" id="search"> ' +
            '<input id="claveacceso_108" type="password" class="form-control input-md" data-orden="1"> ' +
            '<span class="help-block">' + parametros.span + '</span> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanaacceso.off('show.bs.modal');
                    _validarcambioestado();
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanaacceso.off('show.bs.modal');
                    _evaluarfactura();
                }
            }
        }
    });
    ventanaacceso.init($('.modal-footer').hide());
    ventanaacceso.init(evaluarclave());
    ventanaacceso.on('shown.bs.modal', function () {
        $("#claveacceso_108").focus();
    });
}
function evaluarclave() {
    _inputControl("disabled");
    validarInputs({
        form: '#clavea_108',
        orden: "1"
    },
        function () { $('.btn-danger').click() },
        () => {
            $_SWCLAVEING = $("#claveacceso_108").val();
            $(".btn-primary").click();
        }
    )
}


function _validarcambioestado() {

    if ($_SWCLAVEING.trim() == $_SWCLAVE.trim()) {
        setTimeout(_cambiarestado_SAL7411, 300)
        // _cambiarestado_SAL7411();
    }
    else {
        _volverventanaclave();

    }
}
function _volverventanaclave() {
    CON851('03', '03', null, 'error', 'error');
    setTimeout(ventanaclave, 500);
}


function _ventanaipsante() {
    var ventanaipsante = bootbox.dialog({
        size: 'xl',
        onEscape: false,
        title: 'VLR DE FACT Y COPAGO IPS ANT',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="form-group"> ' +
            '<label class="col-md-4 control-label" for="name">' + 'NOMBRE IPS ANT:' + '</label> ' +
            '<div class="col-md-6" id= "ventaipsan_108"> ' +
            '<input id="nombreips_108" type="text" class="form-control input-md" data-orden="1"> ' +
            '</div> ' +
            '<label class="col-md-4 control-label" for="name">' + 'VLR FACT IPS ANT:' + '</label> ' +
            '<div class="col-md-6" id= "ventafactip_108"> ' +
            '<input id="vlrfact_108" type="text" class="form-control input-md" data-orden="1"> ' +
            '</div> ' +
            '<label class="col-md-4 control-label" for="name">' + 'VLR COPA IPS ANT:' + '</label> ' +
            '<div class="col-md-6" id= "ventacopatip_108"> ' +
            '<input id="vlrcopa_108" type="text" class="form-control input-md" data-orden="1"> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanaipsante.off('show.bs.modal');
                    setTimeout(_evaluardatosucur_SER108, 300)
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanaipsante.off('show.bs.modal');
                    _evaluarconvenio_SAL7411();
                }
            }
        }
    });
    ventanaipsante.init($('.modal-footer').hide());
    ventanaipsante.init(_validaripsante());
    ventanaipsante.on('shown.bs.modal', function () {
        $("#nombreips_108").focus();
    });
    var valorfactMask = IMask($("#vlrfact_108")[0], { mask: Number, thousandsSeparator: ",", min: 0, max: 999999999999 });
    var valorcopaMask = IMask($("#vlrcopa_108")[0], { mask: Number, thousandsSeparator: ",", min: 0, max: 999999999999 });
}
function _validaripsante() {
    _inputControl("disabled");
    validarInputs({
        form: '#ventaipsan_108',
        orden: "1"
    },
        function () { $('.btn-danger').click() },
        () => {
            $_NOMBREANTIPS = $("#nombreips_108").val();
            _validarfactips();
        }
    )
}
function _validarfactips() {
    validarInputs({
        form: '#ventafactip_108',
        orden: "1"
    },
        function () { _validaripsante() },
        () => {
            $_VLRFACTIPS = $("#vlrfact_108").val();
            _validarcopaips();
        }
    )
}

function _validarcopaips() {
    validarInputs({
        form: '#ventacopatip_108',
        orden: "1"
    },
        function () { _validarfactips() },
        () => {
            $_VLRCOPAIPS = $("#nombreips_108").val();
            SER108.PORCRETENCW = "00";
            $("#retencion_108").val(SER108.PORCRETENCW);
            $(".btn-primary").click();
        }
    )
}

function BUSCARNUMERO(callback) {
    $_SECU1NUM = "9";
    $_SECU2NUM = $_PREFIJOW;

    if ($_NITUSU == "0800162035") {
        switch ($_SUCOPERW) {
            case "01":
                break;
            case "02":
                switch ($_PREFIJOW) {
                    case "B":
                        $_SECU2NUM = "b";
                    case "Q":
                        $_SECU2NUM = "q";
                    case "V":
                        $_SECU2NUM = "v";
                        break;
                }
            case "03":
                switch ($_PREFIJOW) {
                    case "B":
                        $_SECU2NUM = "b";
                    case "Q":
                        $_SECU2NUM = "q";
                    case "V":
                        $_SECU2NUM = "v";
                        break;
                }
            case "04":
                switch ($_PREFIJOW) {
                    case "B":
                        $_SECU2NUM = "b";
                    case "Q":
                        $_SECU2NUM = "q";
                    case "V":
                        $_SECU2NUM = "v";
                        break;
                }
            case "05":
                switch ($_PREFIJOW) {
                    case "B":
                        $_SECU2NUM = "b";
                    case "Q":
                        $_SECU2NUM = "q";
                    case "V":
                        $_SECU2NUM = "v";
                        break;
                }
            case "06":
                switch ($_PREFIJOW) {
                    case "B":
                        $_SECU2NUM = "b";
                    case "Q":
                        $_SECU2NUM = "q";
                    case "V":
                        $_SECU2NUM = "v";
                        break;
                }
            case "07":
                switch ($_PREFIJOW) {
                    case "B":
                        $_SECU2NUM = "b";
                    case "Q":
                        $_SECU2NUM = "q";
                    case "V":
                        $_SECU2NUM = "v";
                        break;
                }
            case "08":
                switch ($_PREFIJOW) {
                    case "B":
                        $_SECU2NUM = "b";
                    case "Q":
                        $_SECU2NUM = "q";
                    case "V":
                        $_SECU2NUM = "v";
                        break;
                }
            case "09":
                switch ($_PREFIJOW) {
                    case "B":
                        $_SECU2NUM = "b";
                    case "Q":
                        $_SECU2NUM = "q";
                    case "V":
                        $_SECU2NUM = "v";
                        break;
                }
            case "10":
                switch ($_PREFIJOW) {
                    case "B":
                        $_SECU2NUM = "b";
                    case "Q":
                        $_SECU2NUM = "q";
                    case "V":
                        $_SECU2NUM = "v";
                        break;
                }
            case "11":
                switch ($_PREFIJOW) {
                    case "B":
                        $_SECU2NUM = "b";
                    case "Q":
                        $_SECU2NUM = "q";
                    case "V":
                        $_SECU2NUM = "v";
                        break;
                }
            case "12":
                switch ($_PREFIJOW) {
                    case "B":
                        $_SECU2NUM = "b";
                    case "Q":
                        $_SECU2NUM = "q";
                    case "V":
                        $_SECU2NUM = "v";
                        break;
                }
            case "13":
                switch ($_PREFIJOW) {
                    case "B":
                        $_SECU2NUM = "b";
                    case "Q":
                        $_SECU2NUM = "q";
                    case "V":
                        $_SECU2NUM = "v";
                        break;
                }
            case "14":
                switch ($_PREFIJOW) {
                    case "B":
                        $_SECU2NUM = "b";
                    case "Q":
                        $_SECU2NUM = "q";
                    case "V":
                        $_SECU2NUM = "v";
                        break;
                }
            case "15":
                switch ($_PREFIJOW) {
                    case "B":
                        $_SECU2NUM = "b";
                    case "Q":
                        $_SECU2NUM = "q";
                    case "V":
                        $_SECU2NUM = "v";
                        break;
                }
            case "16":
                switch ($_PREFIJOW) {
                    case "B":
                        $_SECU2NUM = "b";
                    case "Q":
                        $_SECU2NUM = "q";
                    case "V":
                        $_SECU2NUM = "v";
                        break;
                }
            case "09":
                switch ($_PREFIJOW) {
                    case "B":
                        $_SECU2NUM = "b";
                    case "Q":
                        $_SECU2NUM = "q";
                    case "V":
                        $_SECU2NUM = "v";
                        break;
                }
                break;
            default:
                break;
        }
    }

    if (($_REDEXTER == "S") && ($_NITUSU == "0800162035")) {
        $_SECU2NUM = "X";
    }
    $_SECUNUM = $_SECU1NUM + $_SECU2NUM;
    callback();
}


//////////////////////////////////// MASCARAS //////////////////////////////////////////

var $_FECHAACTUAL = moment().format('YYYYMMDD');
$_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
$_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
$_DIAACTUAL = $_FECHAACTUAL.substring(6, 8);

var vlrcopago_7411Mask = new IMask(document.getElementById('porcent_108'),
    { mask: Number, min: 0, max: 99999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);

//////////////////////////////////////////// F8 //////////////////////////////////////////////////

function _ventanaFacturacion(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'NUMERACION',
            valoresselect: ['Nombre del tercero', 'buscar paciente'],
            f8data: 'NUMERACION',
            columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
            callback: (data) => {
                console.log(data.COD, 'FACTURA')
                $_NROW = data.COD.substring(1, 7)
                $_PREFIJOW = data.COD.substring(0, 1)
                $('#prefijo_108').val($_PREFIJOW);
                $('#factura_108').val($_NROW);
                _enterInput('#factura_108');
            },
            cancel: () => {
                _enterInput('#factura_108');
            }
        };
        F8LITE(parametros);
    }
}

function _ventanassucursales(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE SUCURSALES",
            columnas: ["CODIGO", "DESCRIPCION"],
            data: SER108.SUCURSAL,
            callback_esc: function () {
                $("#sucur_108").focus();
            },
            callback: function (data) {
                SER108.SUCURSALW = data.CODIGO
                $('#sucur_108').val(SER108.SUCURSALW);
                _enterInput('#sucur_108');
            }
        });
    }

}


function _ventanaTerceros(e) {
    // SER108.ENTIDADTER = "EPS003";
    // filtroterceros = $_TERCEROS_108.filter(terceros => (terceros.ENTIDAD != ENTIDADTER))
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'TERCEROS',
            valoresselect: ['Buscar por nombre tercero'],
            f8data: 'TERCEROS',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }, { title: 'ENTIDAD' }],
            // entidad: SER108.ENTIDADTER,
            callback: (data) => {
                SER108.NITW = data.COD.trim();
                SER108.NITW = SER108.NITW.padStart(10, "0");
                $('#nit_108').val(SER108.NITW);
                _enterInput('#nit_108');
            },
            cancel: () => {
                _evaluarnit_SAL7411()
            }
        };
        F8LITE(parametros);
    }

}


function _ventanaConvenios(e) {
    var $_CONVENIO_108 = [];
    let URL = get_url("APP/" + "SALUD/SER804" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_CONVENIO_108 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE CONVENIOS",
                    columnas: ["COD", "DESCRIP"],
                    data: $_CONVENIO_108.TARIFAS,
                    callback_esc: function () {
                        $("#convenio_108").focus();
                    },
                    callback: function (data) {
                        document.getElementById('convenio_108').value = data.COD;
                        document.getElementById('conveniod_108').value = data.DESCRIP;

                        _enterInput('#convenio_108');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanaPacientes(e) {

    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {

        parametros = {
            dll: 'PACIENTES',
            valoresselect: ['Nombre del paciente'],
            f8data: 'PACIENTES',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }],
            callback: (data) => {
                document.querySelector("#idpaciente_108").value = data.COD;
                // document.querySelector("#idpaciente_108").focus();
                _enterInput('#idpaciente_108');
            },
            cancel: () => {
                _enterInput('#idpaciente_108');
                // document.querySelector("#idpaciente_108").focus() 
            }
        };
        F8LITE(parametros);
    }
}

function _ventanaServicio(e) {
    var $_SERVIHOSP_108 = [];
    let URL = get_url("APP/" + "SALUD/SER812" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_SERVIHOSP_108 = data.SERVICIO;
            $_SERVIHOSP_108.pop()
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE SERVICIOS HOSPITALARIOS",
                    columnas: ["ID", "DESCRIPCION"],
                    data: $_SERVIHOSP_108,
                    callback_esc: function () {
                        $("#servicio_108").focus();
                    },
                    callback: function (data) {
                        document.getElementById('servicio_108').value = data.ID.trim();
                        _enterInput('#servicio_108');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanacontratos(e) {
    var $_CONTRATO_108 = [];
    let URL = get_url("APP/" + "SALUD/SER872" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_CONTRATO_108 = data.CONTRATOS;
            $_CONTRATO_108.pop()
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE CONTROL CONTRATOS",
                    columnas: ["CUENTA", "NIT", 'DESCRIP', 'ESTADO'],
                    data: $_CONTRATO_108,
                    callback_esc: function () {
                        $("#ctrlcont_108").focus();
                    },
                    callback: function (data) {
                        document.getElementById('ctrlcont_108').value = data.CUENTA;

                        _enterInput('#ctrlcont_108');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanaCostos(e) {
    var $_COSTOS = [];
    let URL = get_url("APP/" + "CONTAB/CON803-01" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_COSTOS = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
                    columnas: ["COD", "NOMBRE"],
                    data: $_COSTOS.COSTO,
                    callback_esc: function () {
                        $("#costos_108").focus();
                    },
                    callback: function (data) {
                        document.getElementById('costos_108').value = data.COD.trim()
                        // $('#costos_108').val(data.COD.trim() + "-" + data.NOMBRE.trim());
                        _enterInput('#costos_108');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanaDivision(e) {
    var $_DIVISION_108 = [];
    let URL = get_url("APP/" + "INVENT/INV809-03" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_DIVISION_108 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE CONSULTA DE DIVISION",
                    columnas: ["COD", "DESCRIP"],
                    data: $_DIVISION_108.CODIGOS,
                    callback_esc: function () {
                        $("#division_108").focus();
                    },
                    callback: function (data) {
                        document.getElementById('division_108').value = data.COD.trim();

                        // $('#division_108').val(data.CODIGO.trim() + "-" + data.DESCRIPCION.trim());
                        _enterInput('#division_108');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanaCiudad(e) {
    var $_CIUDAD_108 = [];
    let URL = get_url("APP/" + "CONTAB/CON809" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_CIUDAD_108 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE CONSULTA DE CIUDADES",
                    columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
                    data: $_CIUDAD_108.CIUDAD,
                    callback_esc: function () {
                        $("#ciudad_108").focus();
                    },
                    callback: function (data) {
                        document.getElementById('ciudad_108').value = data.COD.trim();
                        document.getElementById('ciudadd_108').value = data.NOMBRE;
                        // $('#ciudad_108').val(data.COD.trim() + "-" + data.NOMBRE.trim());
                        _enterInput('#ciudad_108');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanaOrigen(e) {
    var $_IPS_108 = [];
    let URL = get_url("APP/" + "SALUD/SER813" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_IPS_108 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE CONSULTA DE IPS",
                    columnas: ["COD", "DESCRIP", "TEL", "FUNCIONARIO", "CODCIUDAD", "CIUDAD"],
                    data: $_IPS_108.IPS,
                    callback_esc: function () {
                        $("#origen_108").focus();
                    },
                    callback: function (data) {
                        document.getElementById('origen_108').value = data.COD.trim();
                        // $('#origen_108').val(data.COD.trim() + "-" + data.DESCRIP.trim());
                        _enterInput('#origen_108');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanaTercerosautoriza(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'TERCEROS',
            valoresselect: ['Buscar por nombre tercero'],
            f8data: 'TERCEROS',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }, { title: 'ENTIDAD' }],
            callback: (data) => {
                SER108.FUNCIONARIO = data.COD.trim();
                $('#funauto_108').val(SER108.FUNCIONARIO);
                _enterInput('#funauto_108');
            },
            cancel: () => {
                _evaluardatofunauto_SAL7411()
            }
        };
        F8LITE(parametros);
    }
    // let URL = get_url("APP/" + "CONTAB/CON802" + ".DLL");
    // postData({
    //     datosh: datosEnvio() + localStorage['Usuario'] + "|"
    // }, URL)
    //     .then((data) => {
    //         loader("hide");
    //         $_FUNCIONARIO_108 = data;
    // if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
    //     _ventanaDatos_lite_v2({
    //         titulo: 'VENTANA DE TERCEROS',
    //         data: $_FUNCIONARIO_108.TERCEROS,
    //         indice: ["COD", "NOMBRE", "CIUDAD", "ACT"],
    //         mascara: [{
    //             "COD": 'Identificacion',
    //             "NOMBRE": 'Nombre',
    //             "CIUDAD": "Ciudad",
    //             "ACT": "Actividad",

    //         }],
    //         minLength: 3,
    //         callback_esc: function () {
    //             $("#funauto_108").focus();
    //         },
    //         callback: function (data) {
    //             document.getElementById("funauto_108").value = data.COD.trim();
    //             document.getElementById("funautod_108").value = data.NOMBRE;
    //             _enterInput('#funauto_108');
    //         }
    //     });
    // }
    // })
    // .catch((error) => {
    //     console.log(error)
    // });
}
function _revisarbloqueos_SER108(callback, back, params) {
    postData({
        datosh: `${datosEnvio()}${localStorage.Usuario}|${params.CODIGO}|`
    },
        get_url("APP/CONTAB/CON904S.DLL"))
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error(error);
            back();
        });
}