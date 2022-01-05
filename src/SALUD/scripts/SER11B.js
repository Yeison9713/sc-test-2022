
var UNSERVICIO = [];
var $NOMBRECOSTO, $CODSERV, $DESCRIPSERV, $EDADMINSERV, $EDADMAXSERV, $CODCOSTO, $ACTIVARSERV, $_OPERADOR71B, $_FECHAMOD71B; 

$(document).ready(function () {
    nombreOpcion('9,7,1,B - Actualizacion Unidades de Atencion'); 
    _inputControl('reset');
    _inputControl('disabled');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
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
    $_BARRASUSULNK = ' ';
    $_LISTAPRECIOUSU = $_USUA_GLOBAL[0].LISTA_PRECIO;
    $_CODCIUUSU = $_USUA_GLOBAL[0].CONTROL_USU
    $_DPTCIUUSU = $_CODCIUUSU.substring(0, 1);
    $_CIUCIUUSU = $_CODCIUUSU.substring(1, 5);
    _toggleF8([
        { input: 'codcentro', app: '71B', funct: _ventanaCostos },
    ]);

    _evaluarunidadservic_71B();
});


/////////////////f8///////////////
function _ventanaCostos(e) {
    var $_COSTOS71B = [];
    let URL = get_url("APP/" + "CONTAB/CON803-01" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_COSTOS71B = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
                    columnas: ["COD", "NOMBRE"],
                    data: $_COSTOS71B.COSTO,
                    callback_esc: function () {
                        $("#codcentro_71B").focus();
                    },
                    callback: function (data) {
                        document.getElementById('codcentro_71B').value = data.COD.trim()
                        _enterInput('#codcentro_71B');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}
/////////////OPCION///////////////////////

function _evaluarunidadservic_71B() {
    console.log('_evaluarunidadservic_71B')
    let datos_envio = datosEnvio()
    datos_envio += $_ADMINW
    let URL = get_url("APP/SALUD/SER873.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(function (data) {
            console.log(data);
            UNSERVICIO = data;
            _ventanaDatos({
                titulo: 'VENTANA UNIDADES DE SERVICIO',
                data: UNSERVICIO.UNSERV,
                columnas: ["COD", "DESCRIP", "DESCRIPEST"],
                callback_esc: function () {
                    // $("#codaten_71B").focus();
                    _toggleNav(); 
                },
                callback: function (data) {
                    $CODSERV = data.COD; 
                    $('#codaten_71B').val($CODSERV);
                    $DESCRIPSERV = data.DESCRIP.trim()
                    $('#descripaten_71B').val($DESCRIPSERV);
                    $CODCOSTO = data.CENCOS.trim()
                    $CODCOSTO = $CODCOSTO.padStart(4,'0')
                    $NOMBRECOSTO = data.DESCRIPCOSTO.trim()
                    $('#codcentro_71B').val($CODCOSTO);
                    $('#descripcosto_71B').val($NOMBRECOSTO);
                    $EDADMAXSERV = data.EDADMAX;
                    $UNIDADEDADMAX = $EDADMAXSERV.substring(0, 1);
                    $VLREDADMAX = $EDADMAXSERV.substring(1, 4);
                    $('#grupmaxedad_71B').val( $UNIDADEDADMAX);
                    $('#edadmax_71B').val($VLREDADMAX);
                    
                    $EDADMINSERV = data.EDADMIN;
                    $UNIDADEDADMIN = $EDADMINSERV.substring(0, 1);
                    $VLREDADMIN = $EDADMINSERV.substring(1, 4);
                    $('#grupemindad_71B').val($UNIDADEDADMIN);
                    $('#edadmini_71B').val($VLREDADMIN);
                    $ACTIVARSERV = data.ESTADO; 
                    $('#Activar_71B').val($ACTIVARSERV);
            

                    setTimeout(_leerunidadminedad_71B, 300);
                }
            });

            // console.log(SAL71B.UNSERV, 'unidades')
            // _UndServicio_71B();
        })
        .catch(err => {
            console.debug(err);
        })
}

function _leerunidadminedad_71B() {
    validarInputs(
        {
            form: "#GRUPMIN_71B",
            orden: '1'
        },
        function () { _toggleNav(); },
        _validacionesunidadedadmin_71B
    )

}
function _validacionesunidadedadmin_71B() {

    $UNIDADEDADMIN = $('#grupemindad_71B').val();
    if ($UNIDADEDADMIN.trim() == '') {
        $UNIDADEDADMIN = 'D';
        $('#grupemindad_71B').val($UNIDADEDADMIN);
        _leervlrminedad_71B();
    } else if (($UNIDADEDADMIN == 'D') || ($UNIDADEDADMIN == 'M') || ($UNIDADEDADMIN == 'A')) {
        _leervlrminedad_71B();

    } else {
        CON851('03', '03', null, 'error', 'Error');
        _leerunidadminedad_71B();
    }
}
function _leervlrminedad_71B() {
    validarInputs(
        {
            form: "#EDADMIN_71B",
            orden: '1'
        },
        function () { _leerunidadminedad_71B(); },
        _validacionesvlredadmin_71B
    )
}
function _validacionesvlredadmin_71B() {
    $VLREDADMIN = $('#edadmini_71B').val();
    $VLREDADMIN = $VLREDADMIN.padStart(3, "0");
    $('#edadmini_71B').val($VLREDADMIN);

    if (($UNIDADEDADMIN == 'D') && ($VLREDADMIN > 30)) {
        CON851('74', '74', null, 'error', 'Error');
        _leervlrminedad_71B();
    } else if (($UNIDADEDADMIN == 'M') && ($VLREDADMIN > 11)) {
        CON851('74', '74', null, 'error', 'Error');
        _leervlrminedad_71B();
    } else if($VLREDADMIN.trim() == ''){
        $VLREDADMIN = '000';
        $('#edadmini_71B').val($VLREDADMIN);
        _leerunidadmaxedad_71B(); 
    }else {
        _leerunidadmaxedad_71B();
    }
}
function _leerunidadmaxedad_71B() {
    validarInputs(
        {
            form: "#GRUPMAX_71B",
            orden: '1'
        },
        function () { _leervlrminedad_71B(); },
        _validacionesunidadmax_71B
    )
}
function _validacionesunidadmax_71B() {
    $UNIDADEDADMAX = $('#grupmaxedad_71B').val();
    if ($UNIDADEDADMAX.trim() == '') {
        $UNIDADEDADMIN = 'A';
        $('#grupmaxedad_71B').val($UNIDADEDADMAX);
        _leervlrmaxedad_71B();
    } else if (($UNIDADEDADMAX == 'D') || ($UNIDADEDADMAX == 'M') || ($UNIDADEDADMAX == 'A')) {
        _leervlrmaxedad_71B();
    } else {
        CON851('03', '03', null, 'error', 'Error');
        _leerunidadmaxedad_71B();
    }
}
function _leervlrmaxedad_71B() {
    validarInputs(
        {
            form: "#EDADMAX_71B",
            orden: '1'
        },
        function () { _leerunidadmaxedad_71B(); },
        _validacionesvlredadmax_71B
    )
}
function _validacionesvlredadmax_71B() {
    $VLREDADMAX = $('#edadmax_71B').val();
    $VLREDADMAX = $VLREDADMAX.padStart(3, "0");
    $('#edadmax_71B').val($VLREDADMAX);

    if (($UNIDADEDADMAX == 'D') && ($VLREDADMAX > 30)) {
        CON851('74', '74', null, 'error', 'Error');
        _leervlrmaxedad_71B();
    } else if (($UNIDADEDADMAX == 'M') && ($VLREDADMAX > 11)) {
        CON851('74', '74', null, 'error', 'Error');
        _leervlrmaxedad_71B();

    }else if($VLREDADMAX.trim() == ''){
        $VLREDADMAX = '120';
        $('#edadmax_71B').val($VLREDADMAX);
        _evaluarcentrodecosto_71B(); 
    }else {
        _evaluarcentrodecosto_71B();
    }
}
function _evaluarcentrodecosto_71B() {
    validarInputs(
        {
            form: "#CCOSTO_SAL71B",
            orden: '1'
        },
        function () { _leervlrmaxedad_71B(); },
        _validacionesccosto_71B
    )
}
function _validacionesccosto_71B() {
    $CODCOSTO = $('#codcentro_71B').val();
    if ($CODCOSTO.trim() == '') {
        $NOMBRECOSTO = '';
        $('#descripcosto_71B').val($NOMBRECOSTO);
        _evaluaractivarserv_71B();
    } else {
        LLAMADO_DLL({
            dato: [$CODCOSTO],
            callback: _datacentrocosto_71B,
            nombredll: 'SER108-10',
            carpeta: 'SALUD'
        });
    }
}
function _datacentrocosto_71B(data) {
    console.log(data, 'SAL108-10')
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $NOMBRECOSTO = date[1].trim();
    if (swinvalid == "00") {
        $('#descripcosto_71B').val($NOMBRECOSTO);
        _evaluaractivarserv_71B();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarcentrodecosto_71B();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluaractivarserv_71B() {
    validarInputs(
        {
            form: "#ACTIVARUNI_71B",
            orden: '1'
        },
        function () { _evaluarcentrodecosto_71B(); },
        _validacionesactserv_71B
    )
}

function _validacionesactserv_71B() {
    $ACTIVARSERV = $('#Activar_71B').val();
    if ($ACTIVARSERV.trim() == '') {
        CON851('03', '03', null, 'error', 'error');
        _evaluaractivarserv_71B();
    } else if (($ACTIVARSERV == 'N') || ($ACTIVARSERV == 'S')) {
        CON851P('01', _evaluaractivarserv_71B, _grabardatos_71B)

    } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluaractivarserv_71B();
    }
}
function _grabardatos_71B() {
    $_FECHAMOD71B = moment().format('YYYYMMDD');
    $_OPERADOR71B = $_ADMINW;
    $EDADMAXSERV = $UNIDADEDADMAX + $VLREDADMAX;
    $EDADMINSERV = $UNIDADEDADMIN + $VLREDADMIN; 
    LLAMADO_DLL({
        dato: [$CODSERV, $DESCRIPSERV, $EDADMINSERV, $EDADMAXSERV, $CODCOSTO, $ACTIVARSERV, $_OPERADOR71B, $_FECHAMOD71B],
        callback: _dataSAL71B_01,
        nombredll: 'SER11B',
        carpeta: 'SALUD'
    });
}

function _dataSAL71B_01(data) {
    console.log(data, 'data')
    var date = data.split('|');
    var swinvalid = date[0];
    if (swinvalid == "00") {
        toastr.success('Se ha guardado');
        _inputControl('reset');
        _toggleNav();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
