/* NOMBRE RM --> SER601 // 15-02-2020- DESARROLLADO: DIANA ESCOBAR */
var SER431 = [];
var $_FECHAACTUAL = moment().format('YYYYMMDD');

$(document).ready(function () {
    nombreOpcion('9,7,7,3,1 - Validacion de rips por fact');
    _inputControl('reset');
    _inputControl('disabled');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_DIALNK = $_FECHA_LNK.substring(4, 6);
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_ANOLNK = parseInt($_ANOLNK) + 2000;
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
    SER431.HORASISTEMA = moment().format('HHmmss');
    _aceptarprefijo_SER431();
});


function _aceptarprefijo_SER431() {
    validarInputs(
        {
            form: "#PREFIJO_SER431",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER431.PREFIJOINI = $('#Prefijo_431').val();

            if (SER431.PREFIJOINI.trim() == '') {
                _aceptarprefijo_SER431();
            } else if ((SER431.PREFIJOINI == 'A') || (SER431.PREFIJOINI == 'P') || (SER431.PREFIJOINI == 'T') || (SER431.PREFIJOINI == 'B') ||
                (SER431.PREFIJOINI == 'D') || (SER431.PREFIJOINI == 'F') || (SER431.PREFIJOINI == 'G') || (SER431.PREFIJOINI == 'H') ||
                (SER431.PREFIJOINI == 'I') || (SER431.PREFIJOINI == 'J') || (SER431.PREFIJOINI == 'K') || (SER431.PREFIJOINI == 'L') ||
                (SER431.PREFIJOINI == 'M') || (SER431.PREFIJOINI == 'N') || (SER431.PREFIJOINI == 'O') || (SER431.PREFIJOINI == 'Q') ||
                (SER431.PREFIJOINI == 'R') || (SER431.PREFIJOINI == 'S') || (SER431.PREFIJOINI == 'V') || (SER431.PREFIJOINI == 'W') ||
                (SER431.PREFIJOINI == 'X') || (SER431.PREFIJOINI == 'Y') || (SER431.PREFIJOINI == 'Z')) {
                _aceptarnumero_SER431();
            } else {
                _aceptarprefijo_SER431();
            }
        }
    )
}

function _aceptarnumero_SER431() {
    SER431.NUMEROW = '';
    if (SER431.NUMEROW.trim() == '') {
        SER431.SECU1NUM = '9';
        SER431.SECU2NUM = SER431.PREFIJOINI;
        $_SECUNUM = SER431.SECU1NUM + SER431.SECU2NUM;
        console.log('SECUNUM', $_SECUNUM)
        let URL = get_url("APP/CONTAB/CON007.DLL");
        postData({ datosh: datosEnvio() + $_SECUNUM }, URL)
            .then(data => {
                console.debug(data, 'CON007');
                var data = data.split("|");
                $_ULTFECHANUM = data[2].trim();
                $_NUMEROCTL = data[1].substring(3, 9);
                SER431.NUMEROW = parseInt($_NUMEROCTL) - 1;
                $('#Numero_431').val(SER431.NUMEROW);
            })
            .catch(err => {
                console.debug(err);
            })

    }
    validarInputs(
        {
            form: "#NUMER_SER431",
            orden: '1'
        },
        () => { _aceptarprefijo_SER431(); },
        () => {
            SER431.NUMEROW = $('#Numero_431').val();
            SER431.NUMEROW = SER431.NUMEROW.padStart(6, "0");
            $('#Numero_431').val(SER431.NUMEROW);
            if (SER431.NUMEROW.trim() == '') {
                _aceptarnumero_SER431();
            } else {
                SER431.LLAVEW = SER431.PREFIJOINI + SER431.NUMEROW;
                LLAMADO_DLL({
                    dato: [SER431.LLAVEW],
                    callback: _respuestafactura_SER431,
                    nombredll: 'SER108-01',
                    carpeta: 'SALUD'
                });
            }

        }
    )
}

function _respuestafactura_SER431(data) {
    console.log('data', data)
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_LLAVENUM = date[1].trim();
    $_PREFIJONUM = $_LLAVENUM.substring(0, 1)
    $_NITNUM = date[2].trim();
    $_DESCRIPNUM = date[3].trim();
    $_CONVENIONUM = date[4].trim();
    $_DESCRIPTAR = date[5].trim();
    $_IDPACNUM = date[10].trim();
    $_DESCRIPPACINUM = date[11].trim();
    $_FECHARETNUM = date[16].trim();
    $_ANORETNUM = $_FECHARETNUM.substring(0, 4);
    $_MESRETNUM = $_FECHARETNUM.substring(4, 6);
    $_DIARETNUM = $_FECHARETNUM.substring(6, 8);

    if (swinvalid == '00') {
        $('#descripnum_431').val($_DESCRIPNUM);
        $('#pacinum_431').val($_DESCRIPPACINUM);
        if ($_MESRETNUM == 00) {
            console.log('en ceroz')
            SER431.ANOFACW = $_ANOLNK;
            SER431.MESFACW = $_MESLNK;
            SER431.DIAFACW = $_DIALNK;
            _aceptarmes_SER431();
        } else {
            console.log('lleno')
            SER431.ANOFACW = $_ANORETNUM;
            SER431.MESFACW = $_MESRETNUM;
            SER431.DIAFACW = $_DIARETNUM;
            _aceptarmes_SER431();
        }
    } else if (swinvalid == '01') {
        CON851('01', 'ERROR EN LA FACTURA', null, 'error', 'error');
        _aceptarnumero_SER431()
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _aceptarmes_SER431() {
    SER431.FECHAFACTW = SER431.ANOFACW + SER431.MESFACW + SER431.DIAFACW;
    $('#Anofact_431').val(SER431.ANOFACW);
    $('#Mesfact_431').val(SER431.MESFACW);
    $('#Diafact_431').val(SER431.DIAFACW);
    validarInputs(
        {
            form: "#MESFACT_SER431",
            orden: '1'
        },
        () => { _aceptarnumero_SER431(); },
        () => {
            SER431.MESFACW = $('#Mesfact_431').val();
            if ((SER431.MESFACW < 1) || (SER431.MESFACW > 12)) {
                _aceptarmes_SER431();
            } else {
                switch (SER431.MESFACW) {
                    case '01':
                        SER431.MESLETRA = 'ENERO';
                        break;
                    case '02':
                        SER431.MESLETRA = 'FEBRERO';
                        break;
                    case '03':
                        SER431.MESLETRA = 'MARZO';
                        break;
                    case '04':
                        SER431.MESLETRA = 'ABRIL';
                        break;
                    case '05':
                        SER431.MESLETRA = 'MAYO';
                        break;
                    case '06':
                        SER431.MESLETRA = 'JUNIO';
                        break;
                    case '07':
                        SER431.MESLETRA = 'JULIO';
                        break;
                    case '08':
                        SER431.MESLETRA = 'AGOSTO';
                        break;
                    case '09':
                        SER431.MESLETRA = 'SEPTIEMBRE';
                        break;
                    case '10':
                        SER431.MESLETRA = 'OCTUBRE';
                        break;
                    case '11':
                        SER431.MESLETRA = 'NOVIEMBRE';
                        break;
                    case '12':
                        SER431.MESLETRA = 'DICIEMBRE';
                        break;
                    default:
                        SER431.MESLETRA = 'OTRO';
                        break;
                }
                _aceptardia_SER431();
            }
        }
    )
}
function _aceptardia_SER431() {
    validarInputs(
        {
            form: "#DIAFACT_SER431",
            orden: '1'
        },
        () => { _aceptarnumero_SER431(); },
        () => {
            SER431.DIAFACW = $('#Diafact_431').val();
            if ((SER431.DIAFACW < 1) || (SER431.DIAFACW > 31)) {
                _aceptardia_SER431();
            } else {
                SER431.SWDET = '';
                _aceptaropcion_SER431();
            }
        }
    )
}
function _aceptaropcion_SER431() {
    console.log(SER431.SWDET, 'SER431.SWDET')
    if (SER431.SWDET.trim() == '') {
        if ($_NITUSU == '0891855847') {
            SER431.SWDET = 'S';
            $('#Mostrar_431').val(SER431.SWDET);
        } else {
            SER431.SWDET = 'N';
            $('#Mostrar_431').val(SER431.SWDET);
        }
    }
    validarInputs(
        {
            form: "#MOSTRAR_SER431",
            orden: '1'
        },
        () => { _aceptardia_SER431(); },
        () => {
            SER431.SWDET = $('#Mostrar_431').val();
            if ((SER431.SWDET == 'S') || (SER431.SWDET == 'N')) {
                _arrancarfact_SER431();
            } else {
                _aceptaropcion_SER431();
            }
        }
    )
}
function _arrancarfact_SER431() {
    let datos_envio = datosEnvio() + SER431.LLAVEW + '|';
    SolicitarDll({ datosh: datos_envio }, dato => {
        console.log(dato, 'ARRANCARFACT')
        var date = dato.split("|");
        var SWINVALID = date[0];
        SER431.NROFACT = date[1].trim();
        if (SWINVALID == '00') {
            $('#Nrofact_431').val(SER431.NROFACT);
            SER431.SWVAL = '';
            _datovalor_SER431();
        } else if (SWINVALID == '08') {
            CON851('08', '08', null, 'error', 'error');
            _aceptarnumero_SER431();
        }
    }, get_url('APP/SALUD/SER431.DLL'));
}

function _datovalor_SER431() {
    if (SER431.SWVAL.trim() == '') {
        SER431.SWVAL = 'S';
        $('#Imprimir_431').val(SER431.SWVAL);
    }
    validarInputs(
        {
            form: "#IMPRIMIR_SER431",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER431.SWVAL = $('#Imprimir_431').val();
            if ((SER431.SWVAL == 'S') || (SER431.SWVAL == 'N')) {
                _consultaarchivoplano_SER431();
            } else {
                _datovalor_SER431();
            }
        }
    )
}

function _consultaarchivoplano_SER431() {
    
    loader("show");
    let URL = get_url("APP/SALUD/SER431-01.DLL");
    postData({ datosh: datosEnvio() + SER431.LLAVEW + '|' + SER431.FECHAFACTW + '|' + SER431.SWDET + '|' + SER431.SWVAL + '|' + SER431.HORASISTEMA + '|' + $_ADMINW }, URL)
        .then(data => {
            console.log(data, 'SER431-01 movimiento')
            SER431.TEMPO = data.TEMP;
            SER431.IMPRESIONCSV = [];
            SER431.IMPRESIONCSV.push($_NOMBREUSU + ', NIT ' + $_NITUSU + ', VALIDACION DE RIPS,  FACTURA ' + SER431.LLAVEW + ', FECHA: ' + SER431.MESLETRA + SER431.DIAFACW+ '/' + SER431.ANOFACW + ', ENTIDAD: ' + $_DESCRIPNUM + ', NIT: ' + $_NITNUM);
            if(SER431.SWVAL == 'S'){
                var encabezado = 'Compr'+ ',' + 'FECHA'+ ',' + 'Paciente'+ ',' + 'Identificacion'+ ',' + 'Afiliacion'+ ',' + 'Edad'+ ',' + 'Sx'+ ',' + 'Concepto'+ ',' + 'Cod.servicio'+ ',' + 'cnt'+ ',' + 'Valor'+ ',' + 'Esp'+ ',' + 'Codusua'+ ',' + 'Tipodiag'+ ',' + 'cod.Diag'+ ',' + 'Causext'+ ',' + 'perati'+ ',' + 'tipoproc'+ ',' + 'clasproc'+ ',' + 'finalidad'+ ',' + 'clcomp'+ ',' + 'oper'+ ',' + 'fecha elab'+ ',' + 'opercorrect'+ ',' + 'fechacorrec'+ ',' + 'oper rips'+ ',' + 'fecha rips'+ ',' + 'detalle'; 
            }else{
                var encabezado = 'Compr'+ ',' + 'FECHA'+ ',' + 'Paciente'+ ',' + 'Identificacion'+ ',' + 'Afiliacion'+ ',' + 'Edad'+ ',' + 'Sx'+ ',' + 'Concepto'+ ',' + 'Cod.servicio'+ ',' + 'cnt'+ ','  + 'Esp'+ ',' + 'Codusua'+ ',' + 'Tipodiag'+ ',' + 'cod.Diag'+ ',' + 'Causext'+ ',' + 'perati'+ ',' + 'tipoproc'+ ',' + 'clasproc'+ ',' + 'finalidad'+ ',' + 'clcomp'+ ',' + 'oper'+ ',' + 'fecha elab'+ ',' + 'opercorrect'+ ',' + 'fechacorrec'+ ',' + 'oper rips'+ ',' + 'fecha rips'+ ',' + 'detalle'; 
            }
            SER431.IMPRESIONCSV.push(encabezado); 
            for (var i in SER431.TEMPO) {
                if(SER431.SWVAL == 'S'){
                    var line = SER431.TEMPO[i].COMP + ',' + SER431.TEMPO[i].FECHA + ',' + SER431.TEMPO[i].NOM_PACI + ',' + SER431.TEMPO[i].ID + ',' + SER431.TEMPO[i].AFILIACION + ',' + SER431.TEMPO[i].EDAD + ',' + SER431.TEMPO[i].ESTADO_CONTAB + ',' + SER431.TEMPO[i].CONCEPTO + ',' + SER431.TEMPO[i].CODIGO + ',' + SER431.TEMPO[i].CANT + ',' + SER431.TEMPO[i].VALOR + ',' + SER431.TEMPO[i].ESPEC + ',' + SER431.TEMPO[i].COND + ',' + SER431.TEMPO[i].TIPO_DIAG + ',' + SER431.TEMPO[i].COD_DIAG + ',' + SER431.TEMPO[i].CAUSA_EXT + ',' + SER431.TEMPO[i].PERSONA + ',' + SER431.TEMPO[i].TIPO_PROC + ',' + SER431.TEMPO[i].CLASE_PROC + ',' + SER431.TEMPO[i].TIPO_DIAG + ',' + SER431.TEMPO[i].CL_FACT + ',' + SER431.TEMPO[i].OPER_ELAB + ',' + SER431.TEMPO[i].FECHA_ELAB + ',' + SER431.TEMPO[i].OPER_MOD + ',' + SER431.TEMPO[i].FECHA_MOD + ',' + SER431.TEMPO[i].OPER_RIPS + ',' + SER431.TEMPO[i].FECHA_RIPS + ',' + SER431.TEMPO[i].DETALLE;
                }else{
                    var line = SER431.TEMPO[i].COMP + ',' + SER431.TEMPO[i].FECHA + ',' + SER431.TEMPO[i].NOM_PACI + ',' + SER431.TEMPO[i].ID + ',' + SER431.TEMPO[i].AFILIACION + ',' + SER431.TEMPO[i].EDAD + ',' + SER431.TEMPO[i].ESTADO_CONTAB + ',' + SER431.TEMPO[i].CONCEPTO + ',' + SER431.TEMPO[i].CODIGO + ',' + SER431.TEMPO[i].CANT +  ',' + SER431.TEMPO[i].ESPEC + ',' + SER431.TEMPO[i].COND + ',' + SER431.TEMPO[i].TIPO_DIAG + ',' + SER431.TEMPO[i].COD_DIAG + ',' + SER431.TEMPO[i].CAUSA_EXT + ',' + SER431.TEMPO[i].PERSONA + ',' + SER431.TEMPO[i].TIPO_PROC + ',' + SER431.TEMPO[i].CLASE_PROC + ',' + SER431.TEMPO[i].TIPO_DIAG + ',' + SER431.TEMPO[i].CL_FACT + ',' + SER431.TEMPO[i].OPER_ELAB + ',' + SER431.TEMPO[i].FECHA_ELAB + ',' + SER431.TEMPO[i].OPER_MOD + ',' + SER431.TEMPO[i].FECHA_MOD + ',' + SER431.TEMPO[i].OPER_RIPS + ',' + SER431.TEMPO[i].FECHA_RIPS + ',' + SER431.TEMPO[i].DETALLE;
                }
                // SER431.TEMPO[i].VALOR_TOT
                if (SER431.TEMPO[i].COMP.trim() != '') {
                    SER431.IMPRESIONCSV.push(line);
                }
            }
            loader("hide");
            _generararchivocsv_SER431();
        })
        .catch(err => {
            console.debug(err);
        })
}

function _generararchivocsv_SER431(){
    SER431.NOMBRECSV = $_ADMINW + SER431.HORASISTEMA;  
    opcinesImpresion_SER431 = {
        datos: SER431.IMPRESIONCSV,
        tipo: 'csv',
        formato: 'salud/SER6011B.html',
        nombre: SER431.NOMBRECSV
    }
    imprimir(opcinesImpresion_SER431, _toggleNav);
}



