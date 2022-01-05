/* NOMBRE RM --> CON721 // NOMBRE ELECTR --> SAL721 */

var SAL721 = [];

$(document).ready(function () {
    nombreOpcion('7,2,1 - Trasl. Movimiento por cta');
    _inputControl('reset');
    _inputControl('disabled');
    SAL721TABLAMOV1 = [];
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_DIALNK = $_FECHA_LNK.substring(4, 6);
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_ANOLNK = 20 + $_ANOLNK;
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
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
    $_DIRINVUSU = $_USUA_GLOBAL[0].DIR_INV.trim();
    $_BARRASUSULNK = ' ';
    $_LISTAPRECIOUSU = $_USUA_GLOBAL[0].LISTA_PRECIO;
    $_CODCIUUSU = $_USUA_GLOBAL[0].CONTROL_USU
    $_DPTCIUUSU = $_CODCIUUSU.substring(0, 1);
    $_CIUCIUUSU = $_CODCIUUSU.substring(1, 5);
    $_INVENTUSU = $_USUA_GLOBAL[0].INVENT;

    _toggleF8([
        { input: 'cta1', app: 'sal721', funct: _ventanacta1_SAL721 },
        { input: 'cta2', app: 'sal721', funct: _ventanacta2_SAL721 },
        { input: 'lote', app: 'sal721', funct: _ventanalote_SAL721 },
    ]);
    obtenerDatosCompletos({
        nombreFd: 'CTA-MAYOR'
    }, function (data) {
        $_CTAMAYOR_721 = data.MAESTROS;
        $_CTAMAYOR_7212 = data.MAESTROS;
        $_CTAMAYOR_721.pop();
        obtenerDatosCompletos({
            nombreFd: 'LOTES'
        }, function (data) {
            $_LOTES_721 = data.LOTES;
            $_LOTES_721.pop();
            _evaluarcta1_sal721();
        }, 'OFF')
    }, 'ON')
});


function _ventanacta1_SAL721(e) {
    TIPO = "4";
    var filtrocuenta721 = $_CTAMAYOR_721.filter(clase => (clase.TIPO_MAE == TIPO))
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA COD CONTABLE',
            columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "TIPO_MAE", "NOMBRE_MAE"],
            data: filtrocuenta721,
            callback_esc: function () {
                $("#cta1_sal721").focus();
            },
            callback: function (data) {
                $('#cta1_sal721').val(data.CTA_MAY.trim() + data.SUB_CTA.trim() + data.AUX_MAE.trim());
                $('#descripcta1_sal721').val(data.NOMBRE_MAE.trim());

                _enterInput('#cta1_sal721');
            }
        });
    }
}
function _ventanacta2_SAL721(e) {
    TIPO = "4";
    var filtrocuent721 = $_CTAMAYOR_721.filter(clase => (clase.TIPO_MAE == TIPO))
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA COD CONTABLE',
            columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "TIPO_MAE", "NOMBRE_MAE"],
            data: filtrocuent721,
            callback_esc: function () {
                $("#cta2_sal721").focus();
            },
            callback: function (data) {
                $('#cta2_sal721').val(data.CTA_MAY.trim() + data.SUB_CTA.trim() + data.AUX_MAE.trim())
                $('#descripcta2_sal721').val(data.NOMBRE_MAE.trim());

                _enterInput('#cta2_sal721');
            }
        });
    }
}

function _ventanalote_SAL721(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA LOTES',
            columnas: ["LOTE", "NOMBRE"],
            data: $_LOTES_721,
            callback_esc: function () {
                $('#lote_sal721').focus()
            },
            callback: function (data) {
                $('#lote_sal721').val(data.LOTE.trim());
                _enterInput('#lote_sal721');
            }
        });
    }
}

function _evaluarcta1_sal721() {
    validarInputs(
        {
            form: "#CTA1_721",
            orden: '1'
        },
        () => { _toggleNav() },
        () => {
            SAL721.CTA1 = $('#cta1_sal721').val();
            SAL721.TIPOMAE = '4';
            SAL721.LLAVEMAE = SAL721.CTA1 + SAL721.TIPOMAE;
            busquedacta1 = buscarDescrip_cta1(SAL721.LLAVEMAE);
            switch (busquedacta1) {
                case false:
                    CON851('01', '01', null, 'error', 'error')
                    _evaluarcta1_sal721()
                    break;
                default:
                    // SAL721.DESCRIPCTA1 = busquedacta1.NOMBRE_MAE.trim();
                    // $('#descripcta1_sal721').val(SAL721.DESCRIPCTA1);
                    _evaluarcta2_sal721()
                    break;
            }
        }
    )
}
function buscarDescrip_cta1(data) {
    var retornar = false;
    for (var i in $_CTAMAYOR_721) {
        if ($_CTAMAYOR_721[i].CTA_MAY.trim() + $_CTAMAYOR_721[i].SUB_CTA.trim() + $_CTAMAYOR_721[i].AUX_MAE.trim() + $_CTAMAYOR_721[i].TIPO_MAE.trim() == data) {
            retornar = $_CTAMAYOR_721[i];
            break;
        }
    }
    return retornar;
}

function _evaluarcta2_sal721() {
    validarInputs(
        {
            form: "#CTA2_721",
            orden: '1'
        },
        () => { _evaluarcta1_sal721(); },
        () => {
            SAL721.CTA2 = $('#cta1_sal721').val();
            SAL721.TIPOMAE2 = '4';
            SAL721.LLAVEMAE2 = SAL721.CTA2 + SAL721.TIPOMAE2;
            busquedacta2 = buscarDescrip_cta2(SAL721.LLAVEMAE2);
            switch (busquedacta2) {
                case false:
                    CON851('01', '01', null, 'error', 'error');
                    _evaluarcta2_sal721();
                default:
                    // SAL721.DESCRIPCTA2 = busquedacta2.NOMBRE_MAE.trim();
                    // $('#descripcta2_sal721').val(SAL721.DESCRIPCTA2);
                    SAL721.LOTEW = '';
                    _evaluarlote_sal721();
                    break;
            }

        }
    )
}

function buscarDescrip_cta2(data) {
    var retornar = false;
    for (var i in $_CTAMAYOR_7212) {
        if ($_CTAMAYOR_7212[i].CTA_MAY.trim() + $_CTAMAYOR_7212[i].SUB_CTA.trim() + $_CTAMAYOR_7212[i].AUX_MAE.trim() + $_CTAMAYOR_7212[i].TIPO_MAE.trim() == data) {
            retornar = $_CTAMAYOR_7212[i];
            break;
        }
    }
    return retornar;
}

function _evaluarlote_sal721() {
    SAL721.SWNIIF = '';
    if (SAL721.LOTEW.trim() == '') {
        SAL721.LOTEW = '**';
        $('#lote_sal721').val(SAL721.LOTEW);
    }
    validarInputs(
        {
            form: "#LOTE_721",
            orden: '1'
        },
        () => { _evaluarcta2_sal721(); },
        () => {
            SAL721.LOTEW = $('#lote_sal721').val();
            if (SAL721.LOTEW == '**') {
                SAL721.DESCRIPLOTE = 'TODOS LOS LOTES';
                $('#descriplote_sal721').val(SAL721.DESCRIPLOTE);
                _evaluarniif_sal721();
            } else {
                busquedalote = buscarDescrip_lote(SAL721.LOTEW);
                switch (busquedalote) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _evaluarlote_sal721();
                    default:
                        SAL721.DESCRIPLOTE = busquedalote.NOMBRE.trim();
                        $('#descriplote_sal721').val(SAL721.DESCRIPLOTE);
                        _evaluarniif_sal721();
                        break;
                }
            }
        }
    )
}

function buscarDescrip_lote(data) {
    var retornar = false;
    for (var i in $_LOTES_721) {
        if ($_LOTES_721[i].LOTE.trim() == data) {
            retornar = $_LOTES_721[i];
            break;
        }
    }
    return retornar;
}

function _evaluarniif_sal721() {
    if (SAL721.SWNIIF.trim() == '') {
        SAL721.SWNIIF = 'N';
        $('#niif_sal721').val(SAL721.SWNIIF);
    }
    validarInputs(
        {
            form: "#NIIF_721",
            orden: '1'
        },
        () => { _evaluarlote_sal721(); },
        () => {
            SAL721.SWNIIF = $('#niif_sal721').val();
            if ((SAL721.SWNIIF == 'N') || (SAL721.SWNIIF == 'S')) {
                _evaluarconfirmar_sal721();
            } else {
                _evaluarniif_sal721();
            }
        }
    )
}

function _evaluarconfirmar_sal721() {
    validarInputs(
        {
            form: "#CONFIRMAR_721",
            orden: '1'
        },
        () => { _evaluarcta2_sal721(); },
        () => {
            SAL721.CONFIMAR = $('#confirmar_sal721').val();

            if ((SAL721.CONFIMAR == 'S') || (SAL721.CONFIMAR.trim() == '')) {
                SAL721.CTLSTAT = '';
                SAL721.CONTROLW = '';
                SAL721.ARCHDIRW = '\\' + $_DIRINVUSU;
                SAL721.ARCHMESW = "ENE";
                $('#directorio_sal721').val(SAL721.ARCHDIRW);
                $('#mes_sal721').val(SAL721.ARCHMESW);
                _evaluartabmes_SAL721();
            } else if (SAL721.CONFIMAR == 'N') {
                _evaluarconfirmar_sal721()
            } else {
                _evaluarconfirmar_sal721()
            }
        }
    )
}
/////////////////////INGRESO A LA TABLA////////////////////
function datocerotabla_SAL721() {
    SAL721.ARCHDIRW = '\\' + $_DIRINVUSU;
    $('#directorio_sal721').val(SAL721.ARCHDIRW);
    switch (SAL721.ARCHMESW) {
        case "ENE":
            SAL721.ARCHMESW = "FEB";
            $('#mes_sal721').val(SAL721.ARCHMESW);
            _evaluartabmes_SAL721();
            break;
        case "FEB":
            SAL721.ARCHMESW = "MAR";
            $('#mes_sal721').val(SAL721.ARCHMESW);
            _evaluartabmes_SAL721();
            break;
        case "MAR":
            SAL721.ARCHMESW = "ABR";
            $('#mes_sal721').val(SAL721.ARCHMESW);
            _evaluartabmes_SAL721();
            break;
        case "ABR":
            SAL721.ARCHMESW = "MAY";
            $('#mes_sal721').val(SAL721.ARCHMESW);
            _evaluartabmes_SAL721();
            break;
        case "MAY":
            SAL721.ARCHMESW = "JUN";
            $('#mes_sal721').val(SAL721.ARCHMESW);
            _evaluartabmes_SAL721();
            break;
        case "JUN":
            SAL721.ARCHMESW = "JUL";
            $('#mes_sal721').val(SAL721.ARCHMESW);
            _evaluartabmes_SAL721();
            break;
        case "JUL":
            SAL721.ARCHMESW = "AGT";
            $('#mes_sal721').val(SAL721.ARCHMESW);
            _evaluartabmes_SAL721();
            break;
        case "AGT":
            SAL721.ARCHMESW = "SEP";
            $('#mes_sal721').val(SAL721.ARCHMESW);
            _evaluartabmes_SAL721();
            break;
        case "SEP":
            SAL721.ARCHMESW = "OCT";
            $('#mes_sal721').val(SAL721.ARCHMESW);
            _evaluartabmes_SAL721();
            break;
        case "OCT":
            SAL721.ARCHMESW = "NOV";
            $('#mes_sal721').val(SAL721.ARCHMESW);
            _evaluartabmes_SAL721();
            break;
        case "NOV":
            SAL721.ARCHMESW = "DIC";
            $('#mes_sal721').val(SAL721.ARCHMESW);
            _evaluartabmes_SAL721();
            break;
        case "DIC":
            SAL721.ARCHMESW = "CIE";
            $('#mes_sal721').val(SAL721.ARCHMESW);
            _evaluartabmes_SAL721();
            break;
        case "CIE":
            SAL721.ARCHMESW = " ";
            $('#mes_sal721').val(SAL721.ARCHMESW);
            _evaluartabmes_SAL721();
            break
        default:
            SAL721.ARCHMESW = " ";
            $('#mes_sal721').val(SAL721.ARCHMESW);
            _evaluartabmes_SAL721();
            break;
    }
}

function _evaluartabdirect_SAL721() {
    validarInputs(
        {
            form: "#DIRECT_721",
            orden: '1'
        },
        () => { _evaluartabdirect_SAL721(); },
        () => {
            SAL721.ARCHDIRW = $('#directorio_sal721').val();
            if (SAL721.ARCHDIRW.trim() == '') {
                SAL721.ARCHIVOW = '';
                _abrirmovimiento_SAL721();
            } else {
                _evaluartabmes_SAL721();
            }
        }
    )
}
function _evaluartabmes_SAL721() {
    validarInputs(
        {
            form: "#MES_721",
            orden: '1',
            event_f3: _grabar_SAL721
        },
        () => { _evaluartabdirect_SAL721(); },
        () => {
            SAL721.ARCHMESW = $('#mes_sal721').val();
            if (SAL721.ARCHMESW.trim() == '') {
                SAL721.ARCHIVOW = '';
                _abrirmovimiento_SAL721();
            } else {
                _evaluararchivo3_SAL721();

            }
        }
    )
}
function _evaluararchivo3_SAL721() {

    if (SAL721.ARCHMESW.trim() == '') {
        SAL721.ARCHGUIONW = " ";
    } else {
        SAL721.ARCHGUIONW = "/";

    }
    SAL721.ARCHMOVW = '/SC-ARCHMOV.DAT';

    SAL721.ARCHW = SAL721.ARCHGUIONW + SAL721.ARCHMESW + SAL721.ARCHMOVW;
    SAL721.ARCHIVOW = SAL721.ARCHDIRW + SAL721.ARCHW;
    $('#ruta_sal721').val(SAL721.ARCHIVOW);
    _abrirmovimiento_SAL721();
}

function _abrirmovimiento_SAL721() {

    if (SAL721.ARCHIVOW.trim() == '') {
        SAL721.ARCHDIRW = '';
        SAL721.ARCHMESW = '';
        SAL721.ARCHMOVW = '';
        _validaciontablamov_SAL721();
    } else {

        let datos_envio = datosEnvio() + SAL721.ARCHDIRW + '|' + SAL721.ARCHW + '|';
        SolicitarDll({ datosh: datos_envio }, dato => {
            var date = dato.split("|");
            var CTLSTAT = date[0];
            if (CTLSTAT == '00') {
                $('#TABLAMOVINCTA_721 tbody').append(
                    '<tr>' +
                    '<td>' + $('#directorio_sal721').val() + '</td>' +
                    '<td>' + $('#mes_sal721').val() + '</td>' +
                    '<td>' + $('#ruta_sal721').val() + '</td>' +
                    '</tr>'
                );
                _validaciontablamov_SAL721();
            } else {
                _evaluartabmes_SAL721();
                console.log('NO EXISTE RUTA')
            }
        }, get_url('APP/SALUD/SAL721-01.DLL'));
    }
}

function _validaciontablamov_SAL721(orden) {
    validarTabla(
        {
            tabla: '#TABLAMOVINCTA_721',
            orden: orden,
        },
        _movimiento,
        function () {
            _evaluartabmes_SAL721();
        },
        () => {
            _grabar_SAL721();
        }
    );
}

function _movimiento(datos) {
    $('#directorio_sal721').val(datos.cells[0].textContent);
    $('#mes_sal721').val(datos.cells[1].textContent);
    $('#ruta_sal721').val(datos.cells[2].textContent);

    _infoCON007B_SAL721();
}

function _infoCON007B_SAL721() {
    postData({
        datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`
    }, get_url("APP/CONTAB/CON007B.DLL"))
    .then(data => {
        console.debug(data);
        data = data.split("|");
        if (data[1].substring(0, 1) == '0') {
            datocerotabla_SAL721();
        } else {
            CON851B(segw, _validacionpermisos_SAL721);
        }
    })
    .catch(error => {
        console.error(error);
        CON851('','Ocurrio un error con el usuario',null,'error','Error');
        _toggleNav();
    });
}

function _validacionpermisos_SAL721() {
    if (segw > '0') {
        $_OPSEGU = "X1";
        let datos_envio = datosEnvio()
        datos_envio += $_ADMINW + '|' + $_OPSEGU + '|'; 
        SolicitarDll({ datosh: datos_envio }, data => {
            console.debug(data, "CON904S");
            var data = data.split("|");
            var swinvalid = data[0].trim();
            if (swinvalid == "00") {
                datocerotabla_SAL721();
            } else if((swinvalid == "01") || ($_ADMINW == 'GEBC')){
                segw = '0'; 
                datocerotabla_SAL721();
            } else {
                CON852(data[0], data[1], data[2], _toggleNav)
            }
        }, get_url('APP/CONTAB/CON904S.DLL'));
    } 
}

function _grabar_SAL721() {
    let meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGT', 'SEP', 'OCT', 'NOV', 'DIC', 'CIE', '', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGT', 'SEP', 'OCT', 'NOV'];
    if ($('#TABLAMOVINCTA_721 tbody tr').length < 24) {
        for (i = 0; i < 24; i++) {
            if ($('#TABLAMOVINCTA_721 tbody tr')[i] == undefined) {
                $('#TABLAMOVINCTA_721 tbody').append(
                    '<tr>' +
                    '<td> </td>' +
                    '<td>' + meses[i] + '</td>' +
                    '<td> </td>' +
                    '</tr>'
                )
            }
        }
        _enviotabla_SAL721()
    }
}

function _enviotabla_SAL721() {
    // if ($('#TABLAMOVINCTA_721 tbody tr').length == 24) {
    for (var i in $('#TABLAMOVINCTA_721 tbody tr')) {
        if (i < $('#TABLAMOVINCTA_721 tbody tr').length) {
            if ($.isNumeric(i)) {
                let a = {
                    'directorio': $('#TABLAMOVINCTA_721 tbody tr')[i].cells[0].textContent,
                    'mes': $('#TABLAMOVINCTA_721 tbody tr')[i].cells[1].textContent,
                    'ruta': $('#TABLAMOVINCTA_721 tbody tr')[i].cells[2].textContent
                }
                SAL721TABLAMOV1.push(a);
            }
        }
        if (i == $('#TABLAMOVINCTA_721 tbody tr').length - 1) {
            _tablamovtxt_SAL721();
        }
    }
    // }
}

function _tablamovtxt_SAL721() {
    let fecha = moment().format('YY/MM/DD HH:mm:ss:ms');
    let nombretxt = $_ADMINW + '_' + fecha.substring(0, 2) + fecha.substring(3, 5) + fecha.substring(6, 8) + fecha.substring(9, 11) + fecha.substring(12, 14) + fecha.substring(15, 17) + fecha.substring(18, 20);
    SAL721.NOMBRETABLA = nombretxt;
    let datosEnvio = {
        nombre_archivo: SAL721.NOMBRETABLA,
        datos_movimcta: SAL721TABLAMOV1,
    };
    $.ajax({
        data: datosEnvio,
        type: 'POST',
        async: false,
        url: get_url('app/Inc/_datostablas_SAL721.php')
    }).done(function (data) {
        console.log('data', data)
        if (data == '00') {
            _realizarmovimiento_SAL721();
        } else {
            console.debug('problemas para crear el txt');
        }
    });
}


function _realizarmovimiento_SAL721() {
    loader("show");
    SAL721.HORASISTEMA = moment().format('HHmmss');
    let URL = get_url("APP/SALUD/SAL721.DLL");
    postData({ datosh: datosEnvio() + SAL721.CTA1 + '|' + SAL721.CTA2 + '|' + SAL721.LOTEW + '|' + SAL721.SWNIIF + '|' + SAL721.HORASISTEMA + '|' + $_ADMINW + '|' + SAL721.NOMBRETABLA }, URL)
        .then(data => {
            console.log(data, 'sal721 mov cta cuenta')
            SAL721.MOVCTA = data;
            loader("hide"); 
            _toggleNav(); 
        })
        .catch(err => {
            console.debug(err);
        })
}



