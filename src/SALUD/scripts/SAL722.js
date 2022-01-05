/* NOMBRE RM -->CON722 // NOMBRE ELECTR --> SAL722 */

var SAL722 = [];
$(document).ready(function () {
    nombreOpcion('7,2,2 - Trasl. Movimiento por nit');
    _inputControl('reset');
    _inputControl('disabled');
    SAL722TABLAMOV = []; 
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_DIALNK = $_FECHA_LNK.substring(4, 6);
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_ANOACTUAL = $_ANOLNK; 
    $_ANOLNK = 20 + $_ANOLNK;
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    $_PREFIJOUSU = $_USUA_GLOBAL[0].PREFIJ;
    $_DIRINVUSU = $_USUA_GLOBAL[0].DIR_INV.trim();
    $_INVENTUSU = $_USUA_GLOBAL[0].INVENT;

    _toggleF8([
        { input: 'nit1', app: 'sal722', funct: _ventananit1_SAL722 },
        { input: 'nit2', app: 'sal722', funct: _ventananit2_SAL722 },
    ]);
    obtenerDatosCompletos({
        nombreFd: 'TERCEROS'
    }, function (data) {
        $_TERCEROS_722 = data.TERCEROS
        $_TERCEROS_722.pop()
        _evaluarnit1_sal722();
    })
});


function _ventananit1_SAL722(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite_v2({
            titulo: 'VENTANA DE TERCEROS',
            data: $_TERCEROS_722,
            indice: ["COD", "NOMBRE", "DIRREC", "TELEF", "CIUDAD", "FACTOR", "ACT"],
            mascara: [{
                "COD": 'Identificacion',
                "NOMBRE": 'Nombre',
                "DIRREC": "direccion",
                "TELEF": "telefono"
            }],
            minLength: 3,
            callback_esc: function () {
                $("#nit1_sal722").focus();
            }, callback: function (data) {
                $_CODTERCEROW = data.COD.trim();
                // $_CODTERCEROW = $_CODTERCEROW.padStart(10, "0");
                $('#nit1_sal722').val($_CODTERCEROW);
                _enterInput('#nit1_sal722');
            }
        });
    }
}

function _ventananit2_SAL722(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite_v2({
            titulo: 'VENTANA DE TERCEROS',
            data: $_TERCEROS_722,
            indice: ["COD", "NOMBRE", "DIRREC", "TELEF", "CIUDAD", "FACTOR", "ACT"],
            mascara: [{
                "COD": 'Identificacion',
                "NOMBRE": 'Nombre',
                "DIRREC": "direccion",
                "TELEF": "telefono"
            }],
            minLength: 3,
            callback_esc: function () {
                $("#nit2_sal722").focus();
            }, callback: function (data) {
                $_CODTERCEROW = data.COD.trim();
                // $_CODTERCEROW = $_CODTERCEROW.padStart(10, "0");
                $('#nit2_sal722').val($_CODTERCEROW);
                _enterInput('#nit2_sal722');
            }
        });
    }
}
function _evaluarnit1_sal722() {
    validarInputs(
        {
            form: "#NIT1_722",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SAL722.NIT1 = $('#nit1_sal722').val();
            // SAL722.NIT1 = SAL722.NIT1.padStart(10, "0");
            // $('#nit1_sal722').val(SAL722.NIT1);
            busquedanit1 = buscarDescrip_nit1(SAL722.NIT1);
            console.log(busquedanit1)
            switch (busquedanit1) {
                case false:
                    SAL722.DESCRIPNIT1 = 'N.I.T. No Existe!'
                    $('#descripnit1_sal722').val(SAL722.DESCRIPNIT1)
                    CON851('01','01',_evaluarnit1_sal722(),'error','Error')
                    break;
                default:
                    SAL722.DESCRIPNIT1 = busquedanit1.NOMBRE.trim()
                    $('#descripnit1_sal722').val(SAL722.DESCRIPNIT1)
                    _evaluarnit2_sal722()
                    break;
            }
        }
    )
}

function buscarDescrip_nit1(data) {
    var retornar = false;
    for (var i in $_TERCEROS_722) {
        if ($_TERCEROS_722[i].COD.trim() == data) {
            retornar = $_TERCEROS_722[i];
            break;
        }
    }
    return retornar;
}

function _evaluarnit2_sal722() {
    validarInputs(
        {
            form: "#NIT2_722",
            orden: '1'
        },
        () => { _evaluarnit1_sal722(); },
        () => {
            SAL722.NIT2 = $('#nit2_sal722').val();
            // SAL722.NIT2 = SAL722.NIT2.padStart(10, "0");
            // $('#nit2_sal722').val(SAL722.NIT2);
            if (SAL722.NIT1 == SAL722.NIT2) {
                CON851('05', '05', null, 'error', 'error');
                _evaluarnit2_sal722(); 
            } else {
                busquedanit2 = buscarDescrip_nit2(SAL722.NIT2);
                switch (busquedanit2) {
                    case false:
                        SAL722.DESCRIPNIT2 = 'N.I.T. No Existe!';
                        $('#descripnit2_sal722').val(SAL722.DESCRIPNIT2);
                        _evaluarnit2_sal722();
                    default:
                        SAL722.DESCRIPNIT2 = busquedanit2.NOMBRE.trim();
                        $('#descripnit2_sal722').val(SAL722.DESCRIPNIT2);
                        _evaluarconfirme_sal722();
                        break;
                }
            }
        }
    )
}

function buscarDescrip_nit2(data) {
    var retornar = false;
    for (var i in $_TERCEROS_722) {
        if ($_TERCEROS_722[i].COD.trim() == data) {
            retornar = $_TERCEROS_722[i];
            break;
        }
    }
    return retornar;
}

function _evaluarconfirme_sal722() {
    validarInputs(
        {
            form: "#CONFIRMAR2_722",
            orden: '1'
        },
        () => { _evaluarnit2_sal722(); },
        () => {
            SAL722.CONFIMAR = $('#confirmar_sal722').val();

            if ((SAL722.CONFIMAR == 'S') || (SAL722.CONFIMAR.trim() == '')) {
                SAL722.CTLSTAT = '';
                SAL722.CONTROLW = '';
                SAL722.ARCHDIRW = '\\' + $_DIRINVUSU;
                SAL722.ARCHMESW = "ENE";
                $('#directorio_sal722').val(SAL722.ARCHDIRW);
                $('#mes_sal722').val(SAL722.ARCHMESW);
                _evaluartabmes_SAL722();
            } else if (SAL722.CONFIMAR == 'N') {
                _evaluarconfirmar_sal722();
            } else {
                _evaluarconfirmar_sal722(); 
            }
        }
    )
}
/////////////////////INGRESO A LA TABLA////////////////////
function datocerotabla_SAL722() {
    SAL722.ARCHDIRW = '\\' + $_DIRINVUSU;
    $('#directorio_sal722').val(SAL722.ARCHDIRW);

    switch (SAL722.ARCHMESW) {
        case "ENE":
            SAL722.ARCHMESW = "FEB";
            $('#mes_sal722').val(SAL722.ARCHMESW);
            _evaluartabmes_SAL722();
            break;
        case "FEB":
            SAL722.ARCHMESW = "MAR";
            $('#mes_sal722').val(SAL722.ARCHMESW);
            _evaluartabmes_SAL722();
            break;
        case "MAR":
            SAL722.ARCHMESW = "ABR";
            $('#mes_sal722').val(SAL722.ARCHMESW);
            _evaluartabmes_SAL722();
            break;
        case "ABR":
            SAL722.ARCHMESW = "MAY";
            $('#mes_sal722').val(SAL722.ARCHMESW);
            _evaluartabmes_SAL722();
            break;
        case "MAY":
            SAL722.ARCHMESW = "JUN";
            $('#mes_sal722').val(SAL722.ARCHMESW);
            _evaluartabmes_SAL722();
            break;
        case "JUN":
            SAL722.ARCHMESW = "JUL";
            $('#mes_sal722').val(SAL722.ARCHMESW);
            _evaluartabmes_SAL722();
            break;
        case "JUL":
            SAL722.ARCHMESW = "AGT";
            $('#mes_sal722').val(SAL722.ARCHMESW);
            _evaluartabmes_SAL722();
            break;
        case "AGT":
            SAL722.ARCHMESW = "SEP";
            $('#mes_sal722').val(SAL722.ARCHMESW);
            _evaluartabmes_SAL722();
            break;
        case "SEP":
            SAL722.ARCHMESW = "OCT";
            $('#mes_sal722').val(SAL722.ARCHMESW);
            _evaluartabmes_SAL722();
            break;
        case "OCT":
            SAL722.ARCHMESW = "NOV";
            $('#mes_sal722').val(SAL722.ARCHMESW);
            _evaluartabmes_SAL722();
            break;
        case "NOV":
            SAL722.ARCHMESW = "DIC";
            $('#mes_sal722').val(SAL722.ARCHMESW);
            _evaluartabmes_SAL722();
            break;
        case "DIC":
            SAL722.ARCHMESW = "CIE";
            $('#mes_sal722').val(SAL722.ARCHMESW);
            _evaluartabmes_SAL722();
            break;
        case "CIE":
            SAL722.ARCHMESW = " ";
            $('#mes_sal722').val(SAL722.ARCHMESW);
            _evaluartabmes_SAL722();
            break
        default:
            SAL722.ARCHMESW = " ";
            $('#mes_sal722').val(SAL722.ARCHMESW);
            _evaluartabmes_SAL722();
            break;
    }
}

function _evaluartabdirect_SAL722() {
    validarInputs(
        {
            form: "#DIRECT_722",
            orden: '1'
        },
        () => { _evaluartabdirect_SAL722(); },
        () => {
            SAL722.ARCHDIRW = $('#directorio_sal722').val();
            if (SAL722.ARCHDIRW.trim() == '') {
                SAL722.ARCHIVOW = '';
                _abrirmovimiento_SAL722();
            } else {
                _evaluartabmes_SAL722();
            }
        }
    )
}
function _evaluartabmes_SAL722() {
    validarInputs(
        {
            form: "#MES_722",
            orden: '1',
            event_f3: _grabar_SAL722
        },
        () => { _evaluartabdirect_SAL722(); },
        () => {
            SAL722.ARCHMESW = $('#mes_sal722').val();
            if (SAL722.ARCHMESW.trim() == '') {
                SAL722.ARCHIVOW = '';
                _abrirmovimiento_SAL722();
            } else {
                _evaluararchivo3_SAL722();
            }
        }
    )
}
function _evaluararchivo3_SAL722() {
    if (SAL722.ARCHMESW.trim() == '') {
        SAL722.ARCHGUIONW = " ";
    } else {
        SAL722.ARCHGUIONW = "/";

    }
    SAL722.ARCHMOVW = '/SC-ARCHMOV.DAT';

    SAL722.ARCHW = SAL722.ARCHGUIONW + SAL722.ARCHMESW + SAL722.ARCHMOVW;
    SAL722.ARCHIVOW = SAL722.ARCHDIRW + SAL722.ARCHW;
    $('#ruta_sal722').val(SAL722.ARCHIVOW);
    _abrirmovimiento_SAL722();
}

function _abrirmovimiento_SAL722() {
    if (SAL722.ARCHIVOW.trim() == '') {
        SAL722.ARCHDIRW = '';
        SAL722.ARCHMESW = '';
        SAL722.ARCHMOVW = '';
        _validaciontablamov_SAL722();
    } else {
        let datos_envio = datosEnvio() + SAL722.ARCHDIRW + '|' + SAL722.ARCHW + '|';
        SolicitarDll({ datosh: datos_envio }, dato => {
            var date = dato.split("|");
            var CTLSTAT = date[0];
            if (CTLSTAT == '00') {
                $('#TABLAMOVINCTA_722 tbody').append(
                    '<tr>' +
                    '<td>' + $('#directorio_sal722').val() + '</td>' +
                    '<td>' + $('#mes_sal722').val() + '</td>' +
                    '<td>' + $('#ruta_sal722').val() + '</td>' +
                    '</tr>'
                );
                _validaciontablamov_SAL722();
            } else {
                _evaluartabmes_SAL722()
            }
        }, get_url('APP/SALUD/SAL722-01.DLL'));
        

        
    }
}

function _validaciontablamov_SAL722(orden) {
    validarTabla(
        {
            tabla: '#TABLAMOVINCTA_722',
            orden: orden,
        },
        _movimiento722,
        function () {
            _evaluartabmes_SAL722();
        },
        () => {
            _grabar_SAL722();
        }
    );
}

function _movimiento722(datos) {
    $('#directorio_sal722').val(datos.cells[0].textContent);
    $('#mes_sal722').val(datos.cells[1].textContent);
    $('#ruta_sal722').val(datos.cells[2].textContent);
    
    _infoCON007B_SAL722();
}

function _infoCON007B_SAL722() {
    postData({
        datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`
    }, get_url("APP/CONTAB/CON007B.DLL"))
    .then(data => {
        console.debug(data);
        data = data.split("|");
        if (data[1].substring(0, 1) == '0') {
            datocerotabla_SAL722();
        } else {
            CON851B(segw, _validacionpermisos_SAL722);
        }
    })
    .catch(error => {
        console.error(error);
        CON851('','Ocurrio un error con el usuario',null,'error','Error');
        _toggleNav();
    });
}
function _validacionpermisos_SAL722(){
    if (segw > '0') {
        $_OPSEGU = "X1";
        let datos_envio = datosEnvio()
        datos_envio += $_ADMINW + '|' + $_OPSEGU + '|'; 
        SolicitarDll({ datosh: datos_envio }, data => {
            console.debug(data, "CON904S");
            var data = data.split("|");
            var swinvalid = data[0].trim();
            if (swinvalid == "00") {
                datocerotabla_SAL722();
            } else if((swinvalid == "01") || ($_ADMINW == 'GEBC')){
                segw = '0'; 
                datocerotabla_SAL722();
            } else {
                CON852(data[0], data[1], data[2], _toggleNav)
            }
        }, get_url('APP/CONTAB/CON904S.DLL'));
    } 
}

function _grabar_SAL722() {
    let meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGT', 'SEP', 'OCT', 'NOV', 'DIC', 'CIE', '', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGT', 'SEP', 'OCT', 'NOV'];
    if ($('#TABLAMOVINCTA_722 tbody tr').length < 24) {
        for (i = 0; i < 24; i++) {
            if ($('#TABLAMOVINCTA_722 tbody tr')[i] == undefined) {
                $('#TABLAMOVINCTA_722 tbody').append(
                    '<tr>' +
                    '<td> </td>' +
                    '<td>' + meses[i] + '</td>' +
                    '<td> </td>' +
                    '</tr>'
                )  
            }
        }
        _enviotabla_SAL722(); 
    }
}

function _enviotabla_SAL722(){
    // if ($('#TABLAMOVINCTA_722 tbody tr').length == 24) {
        for (var i in $('#TABLAMOVINCTA_722 tbody tr')) {
            if (i < $('#TABLAMOVINCTA_722 tbody tr').length) {
                if ($.isNumeric(i)) {
                    let a = {
                        'directorio': $('#TABLAMOVINCTA_722 tbody tr')[i].cells[0].textContent,
                        'mes': $('#TABLAMOVINCTA_722 tbody tr')[i].cells[1].textContent,
                        'ruta': $('#TABLAMOVINCTA_722 tbody tr')[i].cells[2].textContent
                    }
                    SAL722TABLAMOV.push(a);
                }
            }
            if (i == $('#TABLAMOVINCTA_722 tbody tr').length - 1) {
                _tablamovtxt_SAL722();
            }
        }
    // }
}

function _tablamovtxt_SAL722() {
    let fecha = moment().format('YY/MM/DD HH:mm:ss:ms');
    let nombretxt = $_ADMINW + '_' + fecha.substring(0, 2) + fecha.substring(3, 5) + fecha.substring(6, 8) + fecha.substring(9, 11) + fecha.substring(12, 14) + fecha.substring(15, 17) + fecha.substring(18, 20);
    SAL722.NOMBRETABLA = nombretxt;
    let datosEnvio = {
        nombre_archivo2: SAL722.NOMBRETABLA,
        datos_movimnit: SAL722TABLAMOV,
    };
    $.ajax({
        data: datosEnvio,
        type: 'POST',
        async: false,
        url: get_url('app/Inc/_datostablas_SAL721.php')
    }).done(function (data) {
        console.log('data', data)
        if (data == '00') {
            _realizarmovimiento_SAL722();
        } else {
            console.debug('problemas para crear el txt');
        }
    });
}

function _realizarmovimiento_SAL722() {
    loader("show");
    SAL722.HORASISTEMA = moment().format('HHmmss');
    let URL = get_url("APP/SALUD/SAL722.DLL");
    postData({ datosh: datosEnvio() + SAL722.NIT1 + '|' + SAL722.NIT2 + '|' + SAL722.HORASISTEMA + '|' + $_ANOACTUAL + '|' + $_ADMINW + '|' + SAL722.NOMBRETABLA }, URL)
        .then(data => {
            console.log(data, 'sal722 mov nit')
            SAL722.MOVNIT = data;
            loader("hide"); 
            _toggleNav(); 
        })
        .catch(err => {
            console.debug(err);
        })
}