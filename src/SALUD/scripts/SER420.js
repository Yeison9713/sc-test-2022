var SER420 = new Object;
var IMPRESIONSER420 = new Object;

$(document).ready(function () {
    nombreOpcion('9,7,4,A,4 - Formato constancia de servicios recibidos');
    _inputControl("reset");
    _inputControl('disabled');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    SER420.NITUSU = $_USUA_GLOBAL[0].NIT;
    SER420.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE; 
    SER420.CIUDADUSU = $_USUA_GLOBAL[0].NOMBRE_CIU;
    // _toggleF8([
    //     { input: 'codigo', app: '715', funct: _ventanaConvenios715 }
    // ]);
    _aceptarprefijo_SER420();
});

function _aceptarprefijo_SER420() {
    validarInputs(
        {
            form: "#PREFIJO_SER420",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER420.PREFIJO = $('#prefijo_420').val();
            SER420.FACTURA = '';
            if (SER420.PREFIJO.trim() == '') {
                _aceptarprefijo_SER420();
            } else if ((SER420.PREFIJO == "A") || (SER420.PREFIJO == "P") || (SER420.PREFIJO == "T") || (SER420.PREFIJO == "B") || (SER420.PREFIJO == "D") || (SER420.PREFIJO == "F") ||
                (SER420.PREFIJO == "G") || (SER420.PREFIJO == "H") || (SER420.PREFIJO == "I") || (SER420.PREFIJO == "J") || (SER420.PREFIJO == "K") || (SER420.PREFIJO == "L") || (SER420.PREFIJO == "M") || (SER420.PREFIJO == "N") ||
                (SER420.PREFIJO == "O") || (SER420.PREFIJO == "Q") || (SER420.PREFIJO == "R") || (SER420.PREFIJO == "S") || (SER420.PREFIJO == "V") || (SER420.PREFIJO == "W") || (SER420.PREFIJO == "X") || (SER420.PREFIJO == "Y") ||
                (SER420.PREFIJO == "Z")) {
                _aceptarfactura_SER420();
            } else {
                _aceptarprefijo_SER420();
            }
        }
    )
}

function _aceptarfactura_SER420() {
    if (SER420.FACTURA.trim() == '') {
        _buscarnumero_SER420();
    }
    validarInputs(
        {
            form: "#FACTURA_SER420",
            orden: '1'
        },
        () => { _aceptarprefijo_SER420(); },
        () => {
            SER420.FACTURA = $('#factura_420').val();
            SER420.FACTURA = SER420.FACTURA.padStart(6, "0");
            $('#factura_420').val(SER420.FACTURA);
            SER420.LLAVEW = SER420.PREFIJO + SER420.FACTURA;
            if (SER420.FACTURA.trim() == '') {
                CON851('01', '01', null, 'error', 'error');
                _aceptarfactura_SER420();
            } else {
                let datos_envio = datosEnvio() + SER420.LLAVEW + '|';
                SolicitarDll({ datosh: datos_envio }, dato => {
                    var date = dato.split("|");
                    var SWINVALID = date[0];
                    SER420.IDPACNUM = date[10].trim();
                    SER420.DESCRIPPACINUM = date[11].trim();
                    SER420.FECHAINGNUM = date[15].trim();
                    SER420.FECHASALNUM = date[16].trim();
                    if (SWINVALID == '00') {
                        $('#numeropaciente_420').val(SER420.IDPACNUM);
                        $('#paciente_420').val(SER420.DESCRIPPACINUM);
                        _aceptarexpediciondoc_SER420();

                    } else if (SWINVALID == '01') {
                        CON851('01', '01', null, 'error', 'error');
                        _aceptarnumero_SER108B();
                    }
                }, get_url('APP/SALUD/SER108-01.DLL'));

            }
        }
    )
}

function _aceptarexpediciondoc_SER420() {
    validarInputs(
        {
            form: "#EXPEDICION_SER420",
            orden: '1'
        },
        () => { _aceptarfactura_SER420(); },
        () => {
            SER420.EXPEDICION = $('#expedicion_420').val();
            _aceptaanoimpresion_SER420();
        }
    )
}

function _aceptaanoimpresion_SER420() {
    validarInputs(
        {
            form: "#ANOIM_SER420",
            orden: '1'
        },
        () => { _aceptarexpediciondoc_SER420(); },
        () => {
            SER420.ANOIMPR = $('#ano_420').val();
            _aceptamesimpresion_SER420();
        }
    )
}
function _aceptamesimpresion_SER420() {
    validarInputs(
        {
            form: "#MESIM_SER420",
            orden: '1'
        },
        () => { _aceptaanoimpresion_SER420(); },
        () => {
            SER420.MESIMPR = $('#mes_420').val();
            if ((parseInt(SER420.MESIMPR) < 1) || (parseInt(SER420.MESIMPR) > 12)) {
                _aceptamesimpresion_SER420();
            } else if(SER420.MESIMPR.trim() == ''){
                _aceptamesimpresion_SER420(); 
            }else {
                switch (SER420.MESIMPR) {
                    case '01':
                        SER420.MESLETRAW = "Enero     "; 
                        break;
                    case '02':
                        SER420.MESLETRAW = "Febrero   "; 
                        break;
                    case '03':
                        SER420.MESLETRAW = "Marzo     "; 
                        break;
                    case '04':
                        SER420.MESLETRAW = "Abril     "; 
                        break;
                    case '05':
                        SER420.MESLETRAW = "Mayo      "; 
                        break;
                    case '06':
                        SER420.MESLETRAW = "Junio     "; 
                        break;
                    case '07':
                        SER420.MESLETRAW = "Julio     "; 
                        break;
                    case '08':
                        SER420.MESLETRAW = "Agosto    "; 
                        break;
                    case '09':
                        SER420.MESLETRAW = "Septiembre"; 
                        break;
                    case '10':
                        SER420.MESLETRAW = "Octubre   "; 
                        break;
                    case '11':
                        SER420.MESLETRAW = "Noviembre "; 
                        break;
                    default:
                        SER420.MESLETRAW = "Diciembre "; 
                        break;
                }
                _aceptadiaimpresion_SER420()
            }
        }
    )
}
function _aceptadiaimpresion_SER420() {
    validarInputs(
        {
            form: "#DIAIM_SER420",
            orden: '1'
        },
        () => { _aceptamesimpresion_SER420(); },
        () => {
            SER420.DIAIMPR = $('#dia_420').val();
            if ((parseInt(SER420.DIAIMPR) < 1) || (parseInt(SER420.DIAIMPR) > 31)) {
                _aceptadiaimpresion_SER420();
            }else if(SER420.DIAIMPR.trim() == ''){
                _aceptadiaimpresion_SER420(); 
            } else {
                switch (SER420.DIAIMPR) {
                    case '01':
                        SER420.DIALETRAW = "Un           "; 
                        break;
                    case '02':
                        SER420.DIALETRAW = "Dos          "; 
                        break;
                    case '03':
                        SER420.DIALETRAW = "Tres         "; 
                        break;
                    case '04':
                        SER420.DIALETRAW = "Cuatro       "; 
                        break;
                    case '05':
                        SER420.DIALETRAW = "Cinco        "; 
                        break;
                    case '06':
                        SER420.DIALETRAW = "Seis         "; 
                        break;
                    case '07':
                        SER420.DIALETRAW = "Siete        "; 
                        break;
                    case '08':
                        SER420.DIALETRAW = "Ocho         "; 
                        break;
                    case '09':
                        SER420.DIALETRAW = "Nueve        "; 
                        break;
                    case '10':
                        SER420.DIALETRAW = "Diez         "; 
                        break;
                    case '11':
                        SER420.DIALETRAW = "Once         "; 
                        break;
                    case '12':
                        SER420.DIALETRAW = "Doce         "; 
                        break;
                    case '13':
                        SER420.DIALETRAW = "Trece        "; 
                        break;
                    case '14':
                        SER420.DIALETRAW = "Catorce      "; 
                        break;
                    case '15':
                        SER420.DIALETRAW = "Quince       "; 
                        break;
                    case '16':
                        SER420.DIALETRAW = "Diciseis     "; 
                        break;
                    case '17':
                        SER420.DIALETRAW = "Diecisiete   "; 
                        break;
                    case '18':
                        SER420.DIALETRAW = "Dieciocho    "; 
                        break;
                    case '19':
                        SER420.DIALETRAW = "Diecinueve   "; 
                        break;
                    case '20':
                        SER420.DIALETRAW = "Veinte       "; 
                        break;
                    case '21':
                        SER420.DIALETRAW = "Veintiuno    "; 
                        break;
                    case '22':
                        SER420.DIALETRAW = "Veintidos    "; 
                        break;
                    case '23':
                        SER420.DIALETRAW = "Ventitres    "; 
                        break;
                    case '24':
                        SER420.DIALETRAW = "Veinticuatro "; 
                        break;
                    case '25':
                        SER420.DIALETRAW = "Veinticinco  "; 
                        break;
                    case '26':
                        SER420.DIALETRAW = "Veintiseis   "; 
                        break;
                    case '27':
                        SER420.DIALETRAW = "Veintisiete  "; 
                        break;
                    case '28':
                        SER420.DIALETRAW = "Veintiocho   "; 
                        break;
                    case '29':
                        SER420.DIALETRAW = "Veintinueve  "; 
                        break;
                    case '30':
                        SER420.DIALETRAW = "Treinta      "; 
                        break;
                    default:
                        SER420.DIALETRAW = "Treinta y uno"; 
                        break;
                }
                _consultaimpresion_SER420();
            }
        }
    )
}
function _consultaimpresion_SER420() {
    console.log('consulta de impresion');
    setTimeout(function () { _cargandoimpresion('imprimiendo') }, 300);
    IMPRESIONSER420 = SER420; 
    _imprimirconstancia_SER420()
}

function _imprimirconstancia_SER420(){
    SER420.NOMBREPDF = SER420.NITUSU;
    
    opcinesImpresion_SER420 = {
        datos: IMPRESIONSER420,
        tipo: 'pdf',
        formato: 'salud/SER420P.html',
        nombre: SER420.NOMBREPDF
    }
    imprimir(opcinesImpresion_SER420, _finalizaimpresion_ser420);
}

function _finalizaimpresion_ser420() {
    _cargandoimpresion('termino');
} 

function _cargandoimpresion(estado) {
    switch (estado) {
        case 'imprimiendo':
            var ventanaimpresion = bootbox.dialog({
                message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Imprimiendo...</div>',
                closeButton: false,
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanaimpresion.off('show.bs.modal');
                            CON851('39', '39', null, 'success', 'Exito'); // MOMENTANEO MIENTRAS SE APLICA LA IMPRESION
                            _toggleNav();
                        }
                    }
                }
            })
            ventanaimpresion.init($('.modal-footer').hide());
            break;
        case 'termino':

            $('.btn-primary').click();
            break;
    }
}



function _buscarnumero_SER420() {
    $_SECU1NUM = '9';
    $_SECU2NUM = SER420.PREFIJO;
    $_SECUNUM = $_SECU1NUM + $_SECU2NUM;
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + $_SECUNUM }, URL)
        .then(data => {
            var data = data.split("|");
            $_ULTFECHA = data[2].trim();
            $_NUMEROCTL = data[1].substring(3, 9);
            $_LOTE = data[0].trim();

            SER420.FACTURA = parseInt($_NUMEROCTL) - 1;
            $('#factura_420').val(SER420.FACTURA);
        })
        .catch(err => {
            console.debug(err);
        })
}