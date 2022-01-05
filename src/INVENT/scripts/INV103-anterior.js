var $_TABLA_103 = [];
var INV103 = [];

var $_TARW, $_CODLINK, $_BARRASLNK, $_SWCLAVE, $_TIPO_803_LNK, $_COD_GRUPO_803_LNK, $_NUMERO_803_LNK, $_CLASE_803_LNK, $_VISUALWEBARTW, $_ACOMPARTW, $_OBSERVFACTARTW;

var $_VLRULTCOMPRAARTW = '', $_CANTCOMPARTW = '', $_FECHAULTCOMPRAARTW = '', $_FECHALISTACOMP = '', $_VIDAUTILARTW = '', $_OTROSARTW = '', $_UBICAC2ARTW = '', $_INGACTARTW = '', $_ACOMPARTW = '', $_VISUALWEBARTW = '', $_OBSERVFACTARTW = '', $_CLASEARTW = '', $_TIPOARTW = '', $_COMPRAALTAARTW = '',
    $_FECHACOMPRAALTAARTW = '', $_PRESENTACIONARTW = '', $_UNIDADARTW = '', $_CONCENTRADOARTW = '', $_ATCARTW = '', $_EXSISMEDARTW = '', $_MEDREGULADOARTW = '', $_SISDISARTW = '', $_CLASERIESGOARTW = '', $_HOMOLOGOARTW = '', $_HOMOLOGOCODARTW = '', $_CONVHOMOLOARTW = '', $_ESTADOARTW = '', $_FORMALIQARTW = '', $_NOMBRETXT = '';

var dcto_103Mask = new IMask(document.getElementById('dcto_103'),
    { mask: Number, min: 0, max: 100, radix: '.', scale: 1, padFractionalZeros: true });
var autoret_103Mask = new IMask(document.getElementById('autoret_103'),
    { mask: Number, min: 0, max: 999, scale: 2, radix: '.', padFractionalZeros: true });
var paquetes_103Mask = new IMask(document.getElementById('paquetes_103'),
    { mask: Number, min: 0, max: 9999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
var reposicion_103Mask = new IMask(document.getElementById('reposicion_103'),
    { mask: Number, min: 0, max: 99999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
var uniconversion_103Mask = new IMask(document.getElementById('uniconversion_103'),
    { mask: Number, min: 0, max: 9999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
var smin_103Mask = new IMask(document.getElementById('smin_103'),
    { mask: Number, min: 0, max: 9999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
var smax_103Mask = new IMask(document.getElementById('smax_103'),
    { mask: Number, min: 0, max: 9999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
var stockalm_103Mask = new IMask(document.getElementById('stockalm_103'),
    { mask: Number, min: 0, max: 9999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
var peso_103Mask = new IMask(document.getElementById('peso_103'),
    { mask: Number, min: 0, max: 999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
var tablaiva = new IMask(document.getElementById('iva_103'),
    { mask: Number, min: 0, max: 3 })
var lista_103Mask = new IMask(document.getElementById('vlrlista_103'),
    { mask: Number, min: 0, max: 999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
var vlrref_103Mask = new IMask(document.getElementById('vlrref_103'),
    { mask: Number, min: 0, max: 999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
var razonable_103Mask = new IMask(document.getElementById('vlrrazonable_103'),
    { mask: Number, min: 0, max: 999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
var vlrresidual_103Mask = new IMask(document.getElementById('vlrresidual_103'),
    { mask: Number, min: 0, max: 999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
var vlrcompraalta_103Mask = new IMask(document.getElementById('compraalta_103'),
    { mask: Number, min: 0, max: 999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
var porcinccomp_103Mask = new IMask(document.getElementById('inccomp_103'),
    { mask: Number, min: 0, max: 100, radix: '.', scale: 1, padFractionalZeros: true });
var baseventa_103Mask = new IMask(document.getElementById('baseventa_103'),
    { mask: Number, min: 0, max: 999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
var vlradicional_103Mask = new IMask(document.getElementById('vlrradic_103'),
    { mask: Number, min: 0, max: 999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
var incvta_103Mask = new IMask(document.getElementById('incvta_103'), { mask: Number, min: 0, max: 100, radix: '.', scale: 1, padFractionalZeros: true });
var valorfinal_103Mask = new IMask(document.getElementById('vlrfinal_103'),
    { mask: Number, min: 0, max: 999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
var cantidadart_103Mask = new IMask(document.getElementById('cantidad_103'),
    { mask: Number, min: 0, max: 999, radix: '.', scale: 4, padFractionalZeros: true });


// var $_ARTICULOS_INV103 = [];
// var INV103.USO = [];
// var INV103.GRUPOS = [];
// var $_POLIT_103 = [];
// var INV103.CTAMAYOR = [];
// var $_PREMED_103 = [];
// var INV103.ALMACEN = [];

var filtroarticulos = [];
var filtrogrupo = [];
var filtroclase = [];
var filtrouso = [];
var filtropresentacion = [];
var filtromedida = [];

$(document).ready(function () {
    _inputControl("reset");
    _inputControl("disabled");
    loader('hide');
    nombreOpcion("9,1,3 - Maestro de Articulos");
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario || false;
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
    $_TIPOEMPRESAUSU = $_USUA_GLOBAL[0].TIPO_EMPRE;
    _toggleF8([
        { input: 'grupo', app: '103', funct: _ventanagrupo },
        { input: 'codigo', app: '103', funct: _ventanaarticulos },
        { input: 'clase', app: '103', funct: _ventanaclase },
        { input: 'uso', app: '103', funct: _ventanauso },
        { input: 'proveedor', app: '103', funct: _ventanaproveedores },
        { input: 'politica', app: '103', funct: _ventanapoliticas },
        { input: 'ccostos', app: '103', funct: _ventanacosto },
        { input: 'contable', app: '103', funct: _ventanacontable },
        { input: 'almacen', app: '103', funct: _ventanaalmacenes },
        { input: 'codigoart', app: '103', funct: _ventanasegundaarticulos },
        { input: 'presentacion', app: '103', funct: _ventanapresentacion },
        { input: 'unidadme', app: '103', funct: _ventanaunidadmedida },
        { input: 'codhomologo', app: '103', funct: _ventanacodhomologo },
        { input: 'atc', app: '103', funct: _ventanamedatc }
    ]);

    obtenerDatosCompletos({
        nombreFd: 'ARTICULOS'
    }, function (data) {
        INV103.ARTICULOS = data.ARTICULOS;
        INV103.ARTICULOS.pop();
        obtenerDatosCompletos({
            nombreFd: 'GRUPOS'
        }, function (data) {
            INV103.GRUPOS = data.GRUPOS;
            INV103.GRUPOS.pop();
            obtenerDatosCompletos({
                nombreFd: 'USO'
            }, function (data) {
                INV103.USO = data.USO;
                INV103.USO.pop();
                obtenerDatosCompletos({
                    nombreFd: 'COSTOS'
                }, function (data) {
                    INV103.COSTO = data.COSTO;
                    INV103.COSTO.pop();
                    obtenerDatosCompletos({
                        nombreFd: 'LOCALIZACION'
                    }, function (data) {
                        INV103.ALMACEN = data.LOCALIZACION;
                        INV103.ALMACEN.pop();
                        _buscarrestriccion();
                        obtenerDatosCompletos({
                            nombreFd: 'CTA-MAYOR'
                        }, function (data) {
                            INV103.CTAMAYOR = data.MAESTROS;
                            INV103.CTAMAYOR.pop();
                        }, 'OFF')
                    })
                })
            })
        })
    }, 'ON')
})




/////////////////////////////// OPCION INV103 //////////////////////////////////

function _buscarrestriccion() {
    $_OPSEGU = "I13";
    postData({ datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|${$_OPSEGU}|` },
        get_url("APP/CONTAB/CON904.DLL"))
        .then(data => {
            _iniciar_articulos();
        })
        .catch(err => {
            console.error(err);
            CON851('15', '15', null, 'error', 'error');
            _toogleNav();
        });
}

function _iniciar_articulos() {
    $_CODLINK = "                 ";
    $_CODARTW = $_CODLINK;
    $_TIPOARTW = $_CODLINK.substring(0, 1);
    $_GRUPOARTW = $_CODLINK.substring(1, 3);
    $_NUMEROARTW = $_CODLINK.substring(3, 16);
    $_CLASEARTW = $_CODLINK.substring(16, 18);
    if ($_CODLINK.trim() == "") {
        $_NOVEDAD = 7;
        _iniciar_articulos2();
    }
    else {
        $_CODART = $_CODLINK;
        LLAMADO_DLL({
            dato: [$_CODART],
            callback: _dataINV103,
            nombredll: 'INV103',
            carpeta: 'INVENT'
        });
    }

}
function _dataINV103(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        $_NOVEDAD = 8;
        _iniciar_articulos2();
    }
    else if (swinvalid == "01") {
        $_NOVEDAD = 7;
        _iniciar_articulos2();
    }
    else {
        CON852(date[0], date[1], date[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                () => {
                    let Window = BrowserWindow.getAllWindows();
                    if (Window.length > 1) {
                        _cerrarSegundaVentana();
                    } else {
                        _toggleNav()
                    };
                }
            };
        });
    }
}

function _iniciar_articulos2() {
    $_BARRASLNK = "000000000000000";
    if (($_GRUPOARTW.trim() == "") && ($_BARRASLNK == "000000000000000")) {
        $_TIPOARTW = "0";
        $_SW9 = "1";
        _dato0();
    }
    else {
        $_SW9 = "0"
        _dato0();
    }
}

function _dato0() {
    if ($_SW9 == "0") {
        $_SW9 = "1";
        if (($_BARRAS_USU == "S") && ($_BARRASLNK != "000000000000000")) {
            $_CODBARRASARTW = $_BARRASLNK;
            _leerllavebarras();
        }
        _leergrupo();
        _mostrarclase();
        setTimeout(_leerarticulo, 50);
    }
    else {
        _ventanaclave();
    }

}

function _leergrupo() {
    $_GRUPOARTW = $("#grupo_103").val().trim();
    $_LLAVEGRUPOARTW = $_TIPOARTW + $_GRUPOARTW;
    LLAMADO_DLL({
        dato: [$_LLAVEGRUPOARTW],
        callback: _dataINV103_02,
        nombredll: 'INV103_02',
        carpeta: 'INVENT'
    });
}

function _dataINV103_02(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPGRUPO = date[1].trim();
    if (swinvalid == "00") {
        $("#grupod_103").val($_DESCRIPGRUPO);
        if ((parseInt($_TIPOARTW) < 2) || (parseInt($_TIPOARTW) == 4)) {
            $("#T91").css("display", "none");
        }
        else {
            // console.debug('no hidden vida-l');
        }
    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        $("#grupo_103").val("");
        _evaluargrupo();
    }
    else {
        CON852(date[0], date[1], date[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                () => {
                    let Window = BrowserWindow.getAllWindows();
                    if (Window.length > 1) {
                        _cerrarSegundaVentana();
                    } else {
                        _toggleNav()
                    };
                }
            };
        });
    }
}

function _mostrarclase() {

    if ($_CLASEARTW.trim() == '') {
        $_DESCRIUSO = ' '; //SPACES

    }
    else {
        $_TIPOUSO = '1';
        $_CODUSO = $_CLASEARTW;
        $_LLAVE_USOW = $_TIPOUSO + $_CODUSO;
        LLAMADO_DLL({
            dato: [$_LLAVE_USOW],
            callback: _perform2,
            nombredll: 'INV103_04',
            carpeta: 'INVENT'
        });
    }
}

function _perform2(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPUSO = date[1].trim();
    if (swinvalid == "00") {
    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'Error');
        if ($_NOVEDAD == 7) {
            _datoclase();
        }
    }
    else {
        CON852(date[0], date[1], date[3], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                () => {
                    let Window = BrowserWindow.getAllWindows();
                    if (Window.length > 1) {
                        _cerrarSegundaVentana();
                    } else {
                        _toggleNav()
                    };
                }
            };
        });
    }
}


function _ventanaclave() {
    if ($_NITUSU == "017355476") {
        $_SWCLAVE = "1";
        CON850(_evaluarNovedad);
    } else if ($_CLAVEINVUSU.trim() == '') {
        $_SWCLAVE = '1';
        if ($_GRUPOARTW.trim() == '') {
            CON850(_evaluarNovedad);
        }
        else {
            CON850(_evaluarNovedad);
        }
    }
}


function aceptar_clave() {
    $_SWESC = "0";
    // CLAVE I103
}

function _validaraceptarclave() {
    if ($_SWESC == "1") {
        let Window = BrowserWindow.getAllWindows();
        if (Window.length > 1) {
            _cerrarSegundaVentana();
        } else {
            () => {
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    _cerrarSegundaVentana();
                } else {
                    _toggleNav()
                };
            }
        };
    }
    else if ($_CLAVELNK == $_CLAVEINVUSU) {
        $_SWCLAVE = "1";
    }
    else {
        CON851('26', '26', null, 'error', 'error');
        aceptar_clave();
    }
}

function _evaluarNovedad(novedad) {
    $('#tab1').click();
    $_NOVEDAD = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
            _ventanabarras();
            break;
        case 8:
            if ($_SWCLAVE == '0') {
                _ventanaclave();
            } else {
                _ventanabarras();
            }
            break;
        case 9:
            if ($_SWCLAVE == '0') {
                _ventanaclave();
            } else {
                _ventanabarras();
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
    $('#novedad_103').val(novedad.id + ' - ' + novedad.descripcion)
}


function _ventanabarras() {
    $_CODBARRASARTW = "               ";
    if ($_BARRAS_USU == "S") {
        _aceptarlectordebarras();
    }
    else {
        _datotipo();
    }
}

function _aceptarlectordebarras() {
    fuente = '<div class="col-md-12" id="CODIGOBARRAS_103"> ' +
        '<input id="codigobarras_103" type="text" class="form-control input-md" data-orden="1" maxlength="15"> ' +
        '</div>';
    _ventana({
        source: fuente,
        title: 'CODIGO DE BARRAS',
        size: 'small',
        espace: true,
        focus: '#codigobarras_103',
        form: '#CODIGOBARRAS_103',
        order: '1',
        global1: '$_CODBARRASARTW',
        inputglobal1: '#codigobarras_103',
    }, _leerllavebarras, _datotipo);
}

function _leerllavebarras() {
    if ((parseInt($_CODBARRASARTW) == 0) || ($_CODBARRASARTW.trim() == "")) {
        _datotipo();
    }
    else {
        LLAMADO_DLL({
            dato: [$_CODBARRASARTW],
            callback: _dataINV103_01,
            nombredll: 'INV103_01',
            carpeta: 'INVENT'
        });
    }
}
function _dataINV103_01(data) {
    var date = data.split('|');
    $SWINVALIDINV103_01 = date[0].trim();
    $('#codbarras_103').val($_CODBARRASARTW);
    if (($_NOVEDAD == "7") && ($SWINVALIDINV103_01 == "01")) {
        _datotipo();
    }
    else if (($_NOVEDAD == "7") && ($SWINVALIDINV103_01 == "00")) {
        _error_1();
    }
    else if (($_NOVEDAD == "8") && ($SWINVALIDINV103_01 == "00")) {
        _cambioregistro();
    }
    else if (($_NOVEDAD == "8") && ($SWINVALIDINV103_01 == "01")) {
        _error_2();
    }
    else if (($_NOVEDAD == "9") && ($SWINVALIDINV103_01 == "00")) {
        setTimeout(_retirar, 100);
    }
    else if (($_NOVEDAD == "9") && ($SWINVALIDINV103_01 == "01")) {
        _error_3();
    }
}

function _error_1() {
    if (($SWINVALIDINV103_01 == "00") && ($_SW9 == "0")) {
        $_NOVEDAD = 8;
        $_REGARTW = $REGMAESTRO;
        // _mostrardatos();
        _cambioregistro();
    }
    else if ($_NOVEDAD == 8) {
        _datotipo();

    }
    else {

        CON851('', 'Ya existe el codigo digitado', null, 'error', 'Error');
        CON850(_evaluarNovedad)

    }
}

function _error_2() {
    if (($SWINVALIDINV103_01 == "00") && ($_SW9 == "0")) {
        $_NOVEDAD = 8;
        $_REGARTW = $REGMAESTRO;
        // _mostrardatos();
        _cambioregistro();
    } else {

        CON851('01', '01', null, 'error', 'error');
        _datotipo();
    }
}

function _error_3() {
    CON851('01', '01', null, 'error', 'error');
    setTimeout(_ventanabarras, 100);

}

function _datotipo() {
    $_CODGRUPO_301_LNK = '   ';
    if ($_CODGRUPO_301_LNK.trim() == '') {
        _datotipo2();
    }
    else {
        $_CODGRUPO_301_LNK = $_LLAVEGRUPOARTW;
        $_NUMERO_301_LNK = $_NUMEROARTW;
        _datotipo2();
    }
}

function _datotipo2() {
    if ($_NOVEDAD == '7') {
        _mostrartipo_INV103()
    }
    else {
        // $_TIPO_803_LNK  IMPRIMIR DATOS EN TIPOE-L
        // COD-GRUPO-803-LNK IMPRIMIR DATOS EN GRUPO-L
        // NUMERO_803_LNK IMPRIMIR DATOS EN NUMERO-L
        // CLASE_803_LNK IMPRIMIR DATOS EN CLASE-L
        $_TIPO_803_LNK == undefined ? ' ' : $_TIPO_803_LNK;
        $_COD_GRUPO_803_LNK == undefined ? ' ' : $_COD_GRUPO_803_LNK;
        $_NUMERO_803_LNK == undefined ? ' ' : $_NUMERO_803_LNK;
        $_CLASE_803_LNK == undefined ? ' ' : $_CLASE_803_LNK
        _mostrartipo_INV103()
    }

}
function _mostrartipo_INV103() {
    var tipoart = '[{"COD": "0","DESCRIP": "MERCANCIA PARA LA VENTA"},{"COD": "1", "DESCRIP": "BIENES DE CONSUMO"},{"COD": "2","DESCRIP": "BIENES DEVOLUTIVAS"},{"COD": "3","DESCRIP": "BIENES INMUEBLES"}, { "COD": "4", "DESCRIP": "MENOS CUANTIA" }]'
    var tipoarti = JSON.parse(tipoart);
    var titulo = 'TIPO ARTICULO';
    POPUP({
        array: tipoarti,
        titulo: titulo,
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: function () {
            CON850(_evaluarNovedad)
        },
        teclaAlterna: true
    },
        _evaluartipo_INV103);
}

function _evaluartipo_INV103(tipoarti) {
    console.log('EVALUARTIPO')
    $_TIPOARTW = tipoarti.COD;
    switch (tipoarti.COD) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
            INV103.FILTROGRUPO = INV103.GRUPOS.filter(clase => clase.TIPO == $_TIPOARTW);
            console.log(INV103.FILTROGRUPO)
            _evaluargrupo();
            break;
        default:
            CON850(_evaluarNovedad);
            break;
    }
    $("#tipo_103").val(tipoarti.COD + " - " + tipoarti.DESCRIP);
}

function _evaluargrupo() {

    validarInputs({
        form: '#GRUPO_103',
        orden: "1"
    }, _mostrartipo_INV103,
        () => {
            $_GRUPOARTW = $('#grupo_103').val().toUpperCase();
            $('#grupo_103').val($_GRUPOARTW)
            $_LLAVEGRUPOARTW = $_TIPOARTW + $_GRUPOARTW;
            const res = INV103.FILTROGRUPO.find(e => e.GRUPO == $_GRUPOARTW);
            if (res == undefined) {
                if ($_NOVEDAD == 7) {
                    CON851('01', '01', _evaluargrupo(), 'error', 'error');
                }
                else {
                    _leergrupol2();
                }
            } else {
                $_DESCRIPGRUPO = res.DESCRIP;
                $('#grupod_103').val($_DESCRIPGRUPO);
                INV103.FILTROARTICULO = INV103.ARTICULOS.filter(clase => clase.GRUPO_ART == $_GRUPOARTW);
                _leergrupol2();
            }
        }
    )
}


function _leergrupol2() {
    if ((parseInt($_TIPOARTW) < "2") || (parseInt($_TIPOARTW) == "4")) {
        $("#T91").css("display", "none");
        _datonumero();
    }
    else {
        _datonumero();
    }
}

function _datonumero() {
    if ($_NOVEDAD == '9') {
        _buscarclase();
    }
    else if (($_NOVEDAD == 7) && ($_NITUSU == "0830061678") && ($_LLAVEBARRASW.trim() != "")) {
        $_LLAVEBARRASW = $_BARRASUNIVERSO;
        $_BAR2UNIV = $_BARRASUNIVERSO.substring(2, 16);
        $_BAR2UNIV = $_NUMEROARTW;
        _evaluarnumero();
    }
    else {
        _evaluarnumero();
    }
}
function _evaluarnumero() {
    validarInputs({
        form: '#NUMERO_103',
        orden: "1"
    }, _evaluargrupo,
        () => {
            $_NUMEROARTW = $('#codigo_103').val().toUpperCase();
            $('#codigo_103').val($_NUMEROARTW)
            if ($_NOVEDAD == '7') {
                _evaluarclase();
            }
            else {
                setTimeout(_consultagrupo, 50);
                _buscarclase();
            }
        }
    )
}

function _evaluarclase() {
    validarInputs({
        form: '#CLASE_103',
        orden: '1'
    },
        function () { _evaluarnumero() },
        _mostrarclasel
    )
}

function _mostrarclasel() {
    $_CLASEARTW = $('#clase_103').val();
    // if ($_NOVEDAD == '7') {
    if ($_CLASEARTW.trim() == '') {
        $_DESCRIPUSO = '';
        $('#clased_103').val($_DESCRIPUSO);
        _leerarticulo();
    }
    else {
        $_TIPOUSO = "1";
        $_CODUSO = $_CLASEARTW;
        $_LLAVE_USOW = $_TIPOUSO + $_CODUSO;
        LLAMADO_DLL({
            dato: [$_LLAVE_USOW],
            callback: _dataINV103_04,
            nombredll: 'INV103_04',
            carpeta: 'INVENT'
        });
    }
}

function _dataINV103_04(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPUSO = date[1].trim();
    if (swinvalid == "00") {
        $('#clased_103').val($_DESCRIPUSO);
        _leerarticulo();
    }
    else if (swinvalid == "01") {
        // CON851('01', '01', null, 'error', 'Error');
        if ($_NOVEDAD == '7') {
            _datoclase();
        }
        else {
            _leerarticulo();
        }
    }
    else {
        CON852(date[0], date[1], date[3], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                () => {
                    let Window = BrowserWindow.getAllWindows();
                    if (Window.length > 1) {
                        _cerrarSegundaVentana();
                    } else {
                        _toggleNav()
                    }
                }
            }
        })
    }
}

function _consultagrupo() {
    console.log($_GRUPOARTW, 'CONSULTA GRUPO')
    $_GRUPOARTW = $('#grupo_103').val();
    $_LLAVEGRUPOARTW = $_TIPOARTW + $_GRUPOARTW;
    LLAMADO_DLL({
        dato: [$_LLAVEGRUPOARTW],
        callback: _dataINV103_023,
        nombredll: 'INV103_02',
        carpeta: 'INVENT'
    });
}

function _dataINV103_023(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPGRUPO = date[1].trim();
    if (swinvalid == "00") {
        $('#grupod_103').val($_DESCRIPGRUPO);
    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        $("#grupo_103").val("");
        _evaluargrupo();
    }
    else {
        CON852(date[0], date[1], date[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                () => {
                    let Window = BrowserWindow.getAllWindows();
                    if (Window.length > 1) {
                        _cerrarSegundaVentana();
                    } else {
                        _toggleNav()
                    };
                }
            };
        });
    }
}

function _buscarclase() {
    $_NUMEROARTW = $_NUMEROARTW.padEnd(13, ' ');
    $_CODART2W = $_LLAVEGRUPOARTW + $_NUMEROARTW;
    LLAMADO_DLL({
        dato: [$_CODART2W],
        callback: _dataINV103_03,
        nombredll: 'INV103_03',
        carpeta: 'INVENT'
    });
}

function _dataINV103_03(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_claseartiw = date[1].trim();

    if (swinvalid == '00') {
        // if (($_llavegrupoartiw == $_LLAVEGRUPOARTW) && ($_numeroartiw == $_NUMEROARTW)) {
        $_CLASEARTW = $_claseartiw;
        $('#clase_103').val($_CLASEARTW);
        _mostrarclasel();
        // }
    }
    else if (swinvalid == '01') {
        if ($_claseartiw.trim() == '') {
            CON851('01', '01', null, 'error', 'error');
            _datonumero();
        }
        else {
            $_CLASEARTW = '';
            $('#clase_103').val($_DESCRIPGRUPO);
            _buscarclase();
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

function _datoclase() {
    if (($_NITUSU == "0830061678") && ($_LLAVEGRUPOARTW == "088")) {
        $_NROUNIV = $_NUMEROARTW;
        $_NRO1UNIV = $_NROUNIV.substring(0, 6);
        $_NRO2UNIV = $_NROUNIV.substring(7, 12);
        // PROBAR SUBSTRING
        if (($_NOVEDAD == '7') && (($.isNumeric($_NRO1UNIV)) || ($_NRO2UNIV.trim() != ""))) {
            CON851('57', '57', null, 'error', 'error');
            _datonumero();
        }
        else {
            $_CLASEARTW = "";
            _mostrarclasel();
        }
    }
    else if ($_NOVEDAD == '7') {
        if (($_LLAVEGRUPOARTW == '1AP') || ($_LLAVEGRUPOARTW == '1A1')) {
            $_CLASEARTW = "";
            _mostrarclasel();
        }
        else {
            _evaluarclase();
        }
    }
    else {
        _evaluarclase();
    }
}

function _leerarticulo() {
    // _leergrupo();
    $_NRO1ARTW = $_NUMEROARTW.substring(0, 2);
    if ((parseInt($_NOVEDAD) < 9) && ($_NRO1ARTW.trim() == '')) {
        _datonumero();
    }
    else {
        // $_NUMEROARTW = $('#codigo_103').val();
        //////OPCION DE PAQUETE INTEGRALES 971G/// USA ESTA COSULTA
        $_CODARTW = $_LLAVEGRUPOARTW + $_NUMEROARTW + $_CLASEARTW;
        LLAMADO_DLL({
            dato: [$_CODARTW],
            callback: _dataINV103_05,
            nombredll: 'INV103_05',
            carpeta: 'INVENT'
        });
    }
}

function _dataINV103_05(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (($_NOVEDAD == '7') && (swinvalid == '01')) {
        _nuevoregistro();
    }
    else if (($_NOVEDAD == '7') && (swinvalid == '00')) {
        $("#codigo_103").val('');
        CON851('00', '00', null, 'error', 'Error');
        _evaluarnumero();
    }
    else if (($_NOVEDAD == '8') && (swinvalid == '00')) {
        _cambioregistro();
    }
    else if (($_NOVEDAD == '8') && (swinvalid == '01')) {
        CON851('01', '01', null, 'error', 'Error');
        $("#codigo_103").val('');
        _evaluarnumero()
    }
    else if (($_NOVEDAD == '9') && (swinvalid == '01')) {
        CON851('01', '01', null, 'error', 'Error');
        $("#codigo_103").val('');
        _evaluarnumero()
    }
    else if (($_NOVEDAD == '9') && (swinvalid == '00')) {
        setTimeout(_retirar, 100);
    }
}

function _nuevoregistro() {
    _validartablanueva();
    // _validarsegundatabla();
    _evaluardescripcion();
}

function _validartablanueva() {

    LLAMADO_DLL({
        dato: [],
        callback: _dataINV103_14,
        nombredll: 'INV103_14',
        carpeta: 'INVENT'
    });
}

function _dataINV103_14(data) {
    var date = data.split('|');

    if (date[0].trim() == '00') {

        var json = date[1].trim();
        var rutajson = get_url("temp/" + json);
        SolicitarDatos(
            null,
            function (data) {
                $_PREFIJOS_103 = data.PREFIJOS;

                var arrayEliminar = [];
                arrayEliminar.push(json)
                _eliminarJson(arrayEliminar, on_eliminarJson_103_01);
            },
            rutajson
        );
    } else {
        loader('hide');
        CON852(rdll[0], rdll[1], rdll[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function on_eliminarJson_103_01(data) {
    loader('hide');
    var rdll = data.split('|');
    if (rdll[0].trim() == '00') {
        _agregardatostablanuevo();
    } else {
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _agregardatostablanuevo() {
    var cont = 0;
    for (var i = 0; i < $_PREFIJOS_103.length; i++) {
        cont++;
        var comparar = $_PREFIJOS_103[i].TB_DESCRIP.trim();
        if (comparar.length > 1) {
            $('#TABLAVTAARTW_103 tbody').append(
                '<tr>' +
                '<td>' + '0' + cont + '</td>' +
                '<td>' + $_PREFIJOS_103[i].TB_DESCRIP + '</td>' +
                '<td>' + '0' + '.00' + '</td>' +
                '<td>' + '0' + '.00' + '</td>' +
                '<td>' + '0' + '</td>' +
                '<td>' + '0' + '</td>' +
                '<td>' + '0' + '</td>' +
                "</tr>"
            );
        }
        else {
            cont++;
        }
    }
}


function _evaluardescripcion() {
    validarInputs({
        form: '#DESCRIPCION_103',
        orden: "1"
    },
        function () { _evaluarclase() },
        _validardescripcion
    )
}

function _validardescripcion() {
    $_DESCRIPARTW = $('#descripcion_103').val();
    if ($_DESCRIPARTW.trim() == '') {
        CON851('03', '03', null, 'error', 'Error');
        $('#descripcion_103').val('');
        _evaluardescripcion();
    }
    else if ($_BARRASUSULNK == 'S') {
        _evaluarcodbarras();
    }
    else {
        _evaluaruso();
    }
}

function _evaluarcodbarras() {
    validarInputs({
        form: '#CODBARRAS_103',
        orden: "1"
    },
        function () { CON850(_evaluarNovedad); },
        _validarcodbarras
    )
}

function _validarcodbarras() {
    $_CODBARRASARTW = $('#codbarras_103').val();
    _validarlectorbarras();
}

function _validarlectorbarras() {
    if ($_CODBARRASARTW.trim() == '') {
        _evaluarotros();
    }
    else {
        $_LLAVEBARRAS_103_LNK = $_CODBARRASARTW;
        LLAMADO_DLL({
            dato: [$_CODBARRASARTW],
            callback: _dataINV103_01_02,
            nombredll: 'INV103_01',
            carpeta: 'INVENT'
        });
    }
}

function _dataINV103_01_02(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == '00') {
        _validarlectorbarras2();
    }
    else if (swinvalid == '01') {
        $_LLAVEBARRAS_103_LNK = '';
        _validarlectorbarras2();
    }
    else {
        CON852(date[0], date[1], date[2], _toogleNav);
    }
}

function _validarlectorbarras2() {
    if ($_LLAVEBARRAS_103_LNK.trim() == '') {
        _evaluarotros();
    }
    else {
        if ($_LLAVEBARRAS_103_LNK == $_CODARTW) {
            _evaluarotros();
        }
        else {
            CON851('', 'Codigo de barras ya esta asignado!', null, 'warning', 'Advertencia!');
            _evaluarcodbarras();
        }
    }
}

function _evaluaruso() {
    validarInputs({
        form: '#USO_103',
        orden: "1"
    },
        function () { _evaluardescripcion() },
        _leeruso
    )
}

function _leeruso() {
    $_USOARTW = $("#uso_103").val();
    if ($_USOARTW.trim() == '') {
        $_DESCRIPUSO2 = '';
        $('#usod_103').val($_DESCRIPUSO2);
        if ($_TIPOEMPRESAUSU == 'H') {
            _evaluarnitprove()
        } else {
            _evaluaringactivo();
        }
    }
    else {
        $_TIPOUSO = "2";
        $_LLAVE_USOW = $_TIPOUSO + $_USOARTW;
        LLAMADO_DLL({
            dato: [$_LLAVE_USOW],
            callback: _dataINV103_11,
            nombredll: 'INV103_11',
            carpeta: 'INVENT'
        });
    }
}

function _dataINV103_11(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPUSO2 = date[1].trim();
    if (swinvalid == "00") {
        $('#usod_103').val($_DESCRIPUSO2);
        if ($_TIPOEMPRESAUSU == 'H') {
            _evaluarnitprove()
        } else {
            _evaluaringactivo();
        }

    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluaruso();
    }
    else {
        CON852(date[0], date[1], date[3], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _evaluaringactivo() {
    validarInputs({
        form: '#ACTIVO_103',
        orden: "1"
    },
        function () { _evaluaruso() },
        _leeringrediente
    )
}

function _leeringrediente() {
    $_INGACTARTW = $("#ingactivo_103").val();

    if ($_INGACTARTW.trim() == '') {
        _evaluarnitprove();
    } else {
        LLAMADO_DLL({
            dato: [$_INGACTARTW],
            callback: _dataINV103_06,
            nombredll: 'INV103_06',
            carpeta: 'INVENT'
        });
    }
}

function _dataINV103_06(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPINGACT = date[1].trim();
    if (swinvalid == "00") {
        $('#ingactivod_103').val($_DESCRIPINGACT);
        _evaluarnitprove();
    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluaringactivo();
    }
    else {
        CON852(date[0], date[1], date[3], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _evaluarnitprove() {
    validarInputs({
        form: '#PORVEEDOR_103',
        orden: '1'
    },
        function () { _evaluaringactivo() },
        _leerpreveedor
    )
}

function _leerpreveedor() {
    $_NITARTW = $('#proveedor_103').val();
    $_CODTERCEROW = $_NITARTW.padStart(10, "0");
    $('#proveedor_103').val($_NITARTW);


    if ((parseInt($_NITARTW) == 0) || ($_NITARTW.trim() == '')) {
        $_NITARTW = ' ';
        _evaluarotros();
    }
    else {
        LLAMADO_DLL({
            dato: [$_NITARTW],
            callback: _dataINV103_07,
            nombredll: 'INV103_07',
            carpeta: 'INVENT'
        });
    }
}

function _dataINV103_07(data) {

    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPTER = date[1].trim();
    if (swinvalid == "00") {
        $('#proveedorp_103').val($_DESCRIPTER);
        _evaluarotros();
    }
    else if (swinvalid = "01") {
        CON851('', 'No existe tercero', null, 'error', 'Error');
        $('#proveedor_103').val('');
        $('#proveedorp_103').val('');
        _evaluarnitprove();
    }
    else {
        CON852(date[0], date[1], date[3], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _evaluarotros() {
    validarInputs({
        form: '#OTROS_103',
        orden: "1"
    },
        function () { _evaluardescripcion() },
        _validarotros
    )
}

function _validarotros() {
    $_OTROSARTW = $("#otros_103").val();
    $("#prefijo_103").val("01");

    _validarestado();
}

function _validarestado() {
    var estados = [
        { "COD": "1", "DESCRIP": "BUENO" },
        { "COD": "2", "DESCRIP": "REGULAR" },
        { "COD": "3", "DESCRIP": "MALO" }
    ]
    POPUP({
        array: estados,
        titulo: 'ESTADO',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_ESTADOARTW,
        callback_f: _evaluarotros
    },
        _evaluarestado);
}

function _evaluarestado(estados) {
    $_ESTADOARTW = estados.COD;
    switch (estados.COD) {
        case "1":
        case "2":
        case "3":
            _evaluarmarca();
            break;
        default:
            _evaluarotros();
            break;
    }
    $("#estado_103").val(estados.COD + " - " + estados.DESCRIP);
}
function _evaluarmarca() {
    validarInputs({
        form: '#MARCA_103',
        orden: "1"
    },
        function () { _evaluardescripcion() },
        _leermarca
    )
}
function _leermarca() {
    $_CODMARCAARTW = $("#marca_103").val();
    if (($_CODMARCAARTW.trim() == "00") || ($_CODMARCAARTW.trim() == "")) {
        $_DESCRIPMARCAARTW = '';
        if ($_TIPOEMPRESAUSU == 'H') {
            $_REFARTW = '';
            _evaluardardcto();
        } else {
            _evaluarrefencia();
        }
    }
    else {
        LLAMADO_DLL({
            dato: [$_CODMARCAARTW],
            callback: _dataINV103_08,
            nombredll: 'INV103_08',
            carpeta: 'INVENT'
        });
    }
}

function _dataINV103_08(data) {

    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPMARCAARTW = date[1].trim();
    if (swinvalid == "00") {
        $("#marcad_103").val($_DESCRIPMARCAARTW);
        $_DESCRIPMARCAW = $_DESCRIPMARCAARTW;
        _evaluarrefencia();
    }
    else if (swinvalid == "01") {
        CON851('02', '02', null, 'error', 'error');
        _evaluarmarca();
    }
    else {
        CON852(date[0], date[1], date[3], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _evaluarrefencia() {
    $('#tab1').click();
    validarInputs({
        form: '#REFERENCIA_103',
        orden: "1"
    },
        function () { _evaluarmarca() },
        _datoreferencia
    )
}

function _datoreferencia() {
    $_REFARTW = $("#referencia_103").val();
    _evaluardardcto();
}
function _evaluardardcto() {
    dcto_103Mask.updateValue();
    validarInputs({
        form: '#DCTO_103',
        orden: "1"
    },
        function () { _evaluarrefencia(); },
        _validardcto
    )
}
function _validardcto() {
    $_DCTOGRALVTAARTW = dcto_103Mask.unmaskedValue;
    _evaluarautoret();
}

function _evaluarautoret() {
    validarInputs({
        form: '#AUTORET_103',
        orden: "1"
    },
        function () { _evaluarrefencia(); },
        _validarautoret
    )
}
function _validarautoret() {
    $_AUTORETARTW = autoret_103Mask.unmaskedValue;
    if ($_AUTORETARTW == '') {
        autoret_103Mask.unmaskedValue = '0';
        $_AUTORETARTW = '0';
    }
    _evaluarpaquetes();

}
function _evaluarpaquetes() {
    validarInputs({
        form: '#PAQUETES_103',
        orden: "1"
    },
        function () { _evaluarautoret(); },
        _validarpaquetes
    )
}
function _validarpaquetes() {
    $_PAQUETESARTW = paquetes_103Mask.unmaskedValue;
    if ($_PAQUETESARTW == '') {
        paquetes_103Mask.unmaskedValue = '0';
        $_PAQUETESARTW = '0';
    }
    _evaluarunidad();
}

function _evaluarunidad() {
    validarInputs({
        form: '#UNIDAD_103',
        orden: "1"
    },
        function () { _evaluarpaquetes() },
        _validarunidad
    )
}

function _validarunidad() {
    $_UNIDADARTW = $('#unimedida_103').val();
    _evaluarreposicion();
}

function _evaluarreposicion() {
    validarInputs({
        form: '#REPOSICION_103',
        orden: "1"
    },
        function () { _evaluarunidad() },
        _validarreposicion
    )
}

function _validarreposicion() {
    $_REPOSARTW = reposicion_103Mask.unmaskedValue;
    if ($_REPOSARTW.trim() == '') {
        reposicion_103Mask.unmaskedValue = '0';
        $_REPOSARTW = '0';
    }
    _evaluarunidadconver();
}

function _evaluarunidadconver() {
    validarInputs({
        form: '#UNICONVERSION_103',
        orden: "1"
    },
        function () { _evaluarreposicion() },
        _validarunidadconver
    )
}

function _validarunidadconver() {
    $_UNIDCONVARTW = uniconversion_103Mask.unmaskedValue;
    if ($_UNIDCONVARTW == '') {
        uniconversion_103Mask = '0';
        $_UNIDCONVARTW = '0';
    }
    _evaluarstockmin();
}

function _evaluarstockmin() {
    validarInputs({
        form: '#SMIN_103',
        orden: "1"
    },
        function () { _evaluarunidadconver() },
        _validarstockmin
    )
}
function _validarstockmin() {
    $_STOCKMINARTW = smin_103Mask.unmaskedValue;
    if ($_STOCKMINARTW == '') {
        smin_103Mask.unmaskedValue = '0';
        $_STOCKMINARTW = '0';
    }
    _evaluarstockmax();
}
function _evaluarstockmax() {
    validarInputs({
        form: '#SMAX_103',
        orden: "1"
    },
        function () { _evaluarstockmin() },
        _validarstockmax
    )
}
function _validarstockmax() {
    $_STOCKMAXARTW = smax_103Mask.unmaskedValue;
    if ($_STOCKMAXARTW == '') {
        smax_103Mask.unmaskedValue = '0';
        $_STOCKMAXARTW = '0';
    }
    _evaluarstockalmacen();
}

function _evaluarstockalmacen() {
    validarInputs({
        form: '#STOCKALM_103',
        orden: "1"
    },
        function () { _evaluarstockmin() },
        _validarstockalmacen
    )
}
function _validarstockalmacen() {
    $_STOCKALMARTW = stockalm_103Mask.unmaskedValue;
    if ($_STOCKALMARTW == '') {
        stockalm_103Mask.unmaskedValue = '0';
        $_STOCKALMARTW = '0';
    }
    if (parseInt($_TIPOARTW) > '0') {
        if ($_TIPOEMPRESAUSU == 'H') {
            _evaluarpoliticas();
        }
        else { _ubicargrabar(); }
    }
    else {
        _evaluarpoliticas();
    }
}

function _evaluarpoliticas() {
    validarInputs({
        form: '#POLITICA_103',
        orden: "1"
    },
        function () { _evaluarstockalmacen() },
        _validarpoliticas
    )
}

function _validarpoliticas() {
    $_POLARTW = $('#politica_103').val();

    if ($_POLARTW.trim() == '') {
        $_POLARTW = '00';
        $_DESCRIPPOL = '';
        $('#politica_103').val($_POLARTW);
        $('#politicad_103').val($_DESCRIPPOL);
        _evaluarmerma();
    }
    else {
        if ($_POLARTW == '00') {
            $_DESCRIPPOL = '';
            $('#politicad_103').val($_DESCRIPPOL);
            _evaluarmerma();
        } else {
            LLAMADO_DLL({
                dato: [$_POLARTW],
                callback: _dataINV103_09,
                nombredll: 'INV103_09',
                carpeta: 'INVENT'
            });
        }
    }
}

function _dataINV103_09(data) {

    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPPOL = date[1].trim();
    if (swinvalid == "00") {
        $("#politicad_103").val($_DESCRIPPOL);
        _evaluarmerma();
    }
    else if (swinvalid == "01") {
        CON851('', 'No existe la politica', null, 'warning', 'Advertencia!');
        _evaluarpoliticas();
    }
    else {
        CON852(date[0], date[1], date[3], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _evaluarmerma() {
    validarInputs({
        form: '#MERMA_103',
        orden: '1'
    },
        function () { _evaluarpoliticas() },
        _validarmerma
    )
}
function _validarmerma() {
    $_MERMAARTW = $('#merma_103').val();
    _validarliquidar();
}

function _validarliquidar() {
    loader('hide');
    var precios = [
        { "COD": "1", "DESCRIP": "PRECIO BASE" },
        { "COD": "2", "DESCRIP": "% SOBRE VR ULTCOMPRA" },
        { "COD": "3", "DESCRIP": "% SOBRE VR REFERENCIA" }
    ]
    POPUP({
        array: precios,
        titulo: 'EL PRECIO DE VENTA',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_FORMALIQARTW,
        callback_f: () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        }
    },
        _evaluarliquidar);
}

function _evaluarliquidar(precios) {
    $_FORMALIQARTW = precios.COD;
    switch (precios.COD) {
        case "1":
        case "2":
        case "3":
            _evaluarpeso();
            break;
        default:
            _evaluarpoliticas();
            break;
    }
    $("#fliquidar_103").val(precios.COD + " - " + precios.DESCRIP);
}

function _evaluarpeso() {
    validarInputs({
        form: '#PESO_103',
        orden: '1'
    },
        function () { _evaluarpoliticas() },
        _validarpeso
    )
}

function _validarpeso() {
    $_PESOARTW = peso_103Mask.unmaskedValue;
    _evaluariva();
}

function _evaluariva() {
    validarInputs({
        form: '#IVA_103',
        orden: '1'
    },
        function () { _evaluarpeso() },
        _validariva
    )
}
function _validariva() {
    $_IVAARTW = $('#iva_103').val();
    if (($_IVAARTW == "0") || ($_IVAARTW == "1") || ($_IVAARTW == "2") || ($_IVAARTW == "3")) {
        switch ($_IVAARTW) {
            case "0":
                $_TARW = "0";
                $("#iva_103").val($_TARW);
                $("#tabivap_103").val("00");
                _evaluarcolor();
                break;
            case "1":
                $_TARW = $_IVA_USU;
                $("#tabivap_103").val($_IVA_USU);
                _evaluarcolor();
                break;
            case "2":
                $_TARW = $_IVA_2_USU;
                $("#tabivap_103").val($_TARW);
                _evaluarcolor();
                break;
            case "3":
                $_TARW = $_IVA_3_USU;
                $("#tabivap_103").val($_TARW);
                _evaluarcolor();
                break;
        }
    }
    else if (($_IVAARTW > "0") && ($_TARW == "00")) {
        CON851('', 'Error en tarifa de iva', null, 'warning', 'Advertencia!');
        $('#iva_103').val('');
        _evaluariva();
    }
    else {
        CON851('03', '03', null, 'error', 'Error');
        _evaluariva();
    }

}

function _evaluarultcantcompra() {
    validarInputs({
        form: '#ULTCOMPRA_103',
        orden: '1'
    },
        function () { _evaluariva() },
        _validarultcantcompra
    )
}

function _validarultcantcompra() {
    $_VLRULTCOMPRAARTW = $('#ultcompra_103').val();
    _evaluarfecha();
}

function _evaluarfecha() {
    momentMaskFecha.updateValue();
    validarInputs({
        form: '#FECHA_103',
        orden: "1"
    },
        function () { _evaluarultcantcompra() },
        _evaluarcantcomp
    )
}

function _evaluarcantcomp() {
    validarInputs({
        form: '#CANTCOMP_103',
        orden: "1"
    },
        function () { _evaluarfecha() },
        _validarcantcomp
    )
}
function _validarcantcomp() {
    $_CANTCOMPARTW = $("#cantc_103").val();

    if ($_CANTCOMPARTW.trim() == "00") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarfecha();
    } else {
        _evaluarcompraalta();
    }
}
function _evaluarcompraalta() {
    validarInputs({
        form: '#COMPRAALTA_103',
        orden: "1"
    },
        function () { _evaluarcantcomp() },
        _validarcompraalta
    )
}
function _validarcompraalta() {
    $_COMPRAALTAARTW = vlrcompraalta_103Mask.unmaskedValue;
    _evaluarfechacompraalta();
}
function _evaluarfechacompraalta() {
    momentMaskFechacompra.updateValue();
    validarInputs({
        form: '#FECHACOMPRAALTA_103',
        orden: "1"
    },
        function () { _evaluarcompraalta(); },
        _evaluarcolor
    )
}

function _evaluarcolor() {

    validarInputs({
        form: '#COLOR_103',
        orden: '1'
    },
        function () { _evaluarcantcomp() },
        _datocolor
    )
}

function _datocolor() {
    $_COLORARTW = $('#color_103').val();
    _evaluartalla();
}

function _evaluartalla() {
    validarInputs({
        form: '#TALLA_103',
        orden: '1'
    },
        function () { _evaluarcolor() },
        _validartalla
    )
}

function _validartalla() {
    $_TALLAARTW = $('#talla_103').val();
    _datolista();
}

function _datolista() {
    if (($_PUCUSU == "4") && (parseInt($_TIPOARTW) > 0)) {
        _datoextension();
    }
    else {
        _evaluarlista();
    }
}

function _evaluarlista() {
    validarInputs({
        form: '#VLRLISTA_103',
        orden: "1"
    },
        function () { _evaluariva() },
        _validarlista
    )
}

function _validarlista() {
    $_PRECIOLISTACOMPRATW = lista_103Mask.unmaskedValue;
    _evaluarcosto();
}

function _datoextension() {
    if ((parseInt($_TIPOARTW) > 1) || ($_LLAVEGRUPO == "0VE") || ($_LLAVEGRUPO == "0AU") || ($_LLAVEGRUPO == "0GL") || ($_LLAVEGRUPO == "0FR") || ($_LLAVEGRUPO == "0CA") || ($_NITUSU == "0830009610") || ($_NITUSU == "0800194192")) {
        $_SWESC = "0";
        $_EXTENSION_103LNK = $_TALLAARTW;
        $('#tab2').click();
        _evaluarextension();
    }
    else {
        _ubicargrabar();
    }
}

function _evaluarextension() {
    validarInputs({
        form: '#EXTENSION_103',
        orden: "1"
    },
        function () { _datoiva() },
        _validarextension
    )
}

function _validarextension() {
    $_EXTENSION_103LNK = $('#extension_103').val();
    if ($_EXTENSION_103LNK.trim() == '') {
        CON851('', 'Dato necesario', null, 'warning', 'Advertencia!');
        _evaluarextension();
    }
    else {
        $_TABLAARTW = $_EXTENSION_103LNK;
        $('#tab1').click();
    }
}

function _evaluarcosto() {
    validarInputs({
        form: '#CCOSTOS_103',
        orden: "1"
    }, _evaluarlista,
        () => {
            $_CCOSTOARTW = $("#ccostos_103").val();
            $_COD1 = $_CCOSTOARTW.substring(0, 1);
            $_COD2 = $_CCOSTOARTW.substring(1, 2);
            $_COD3 = $_CCOSTOARTW.substring(2, 3);
            $_COD4 = $_CCOSTOARTW.substring(3, 4);
            if (($_COD1.trim() == "") || ($_COD2.trim() == "") || ($_COD3.trim() == "") || ($_COD4.trim() == "")) {
                if ($_TIPOEMPRESAUSU == 'H') {
                    if (parseInt($_TIPOARTW) > 1) {
                        _evaluarvidautil();
                    } else {
                        _evaluarvlrreferencia();
                    }
                } else {
                    CON851('', 'Centro de costos incompleto', _evaluarcosto(), 'error', 'Error');
                }
            }
            else {
                console.log(INV103.COSTO)
                const res = INV103.COSTO.find(e => e.COD == $_CCOSTOARTW);
                if (res == undefined) {
                    CON851("02", "02", _evaluarcosto(), "error", "error");
                } else {
                    $_NOMBRECOSTO = res.NOMBRE;
                    $("#ccostosd_103").val($_NOMBRECOSTO);
                    if (parseInt($_TIPOARTW) > 1) {
                        _evaluarvidautil();
                    } else {
                        _evaluarvlrreferencia();
                    }
                }
                // LLAMADO_DLL({
                //     dato: [$_CCOSTOARTW],
                //     callback: _dataINV103_10,
                //     nombredll: 'INV103_10',
                //     carpeta: 'INVENT'
                // });
            }
        }
    )
}


// function _dataINV103_10(data) {

//     var date = data.split('|');
//     var swinvalid = date[0].trim();
//     $_NOMBRECOSTO = date[1].trim();
//     if (swinvalid == "00") {
//         $("#ccostosd_103").val($_NOMBRECOSTO);
//         if (parseInt($_TIPOARTW) > 1) {
//             _evaluarvidautil();
//         } else {
//             _evaluarvlrreferencia();
//         }
//     }
//     else if (swinvalid == "01") {
//         CON851('02', '02', null, 'error', 'error');
//         _evaluarcosto();
//     }
//     else {
//         CON852(date[0], date[1], date[3], () => {
//             let Window = BrowserWindow.getAllWindows();
//             if (Window.length > 1) {
//                 _cerrarSegundaVentana();
//             } else {
//                 _toggleNav()
//             };
//         });
//     }
// }

function _evaluarvidautil() {
    validarInputs({
        form: '#VIDAUTIL_103',
        orden: "1"
    },
        function () { _evaluarcosto() },
        _validarvidautil
    )

}

function _validarvidautil() {
    $_VIDAUTILARTW = $("#vidautil_103").val();
    if ($_TIPOEMPRESAUSU == 'H') {
        _ubicargrabar();
    } else {
        _evaluarvlrreferencia();
    }
}

function _evaluarvlrreferencia() {
    validarInputs({
        form: '#VLRREF_103',
        orden: "1"
    },
        function () { _evaluarlista() },
        _validarvlrreferencia
    )
}

function _validarvlrreferencia() {
    $_VLRREFARTW = vlrref_103Mask.unmaskedValue;
    if ($_TIPOARTW == "1") {
        if ($_TIPOEMPRESAUSU == 'H') {
            _evaluarvlrazonable();
        } else {
            _ubicargrabar();
        }

    } else {
        _evaluarvlrazonable();
    }
}

function _evaluarvlrazonable() {
    validarInputs({
        form: '#VLRRAZONABLE_103',
        orden: "1"
    },
        function () { _evaluarvlrreferencia() },
        _validarvrlrazonable
    )
}

function _validarvrlrazonable() {
    $_VLRRAZONABLEARTW = razonable_103Mask.unmaskedValue;
    _evaluarvlrresidual()
}

function _evaluarvlrresidual() {
    validarInputs({
        form: '#VLRRESIDUAL_103',
        orden: "1"
    },
        function () { _evaluarvlrazonable() },
        _validarvrlresidual
    )
}

function _validarvrlresidual() {
    $_VLRRESIDUALARTW = vlrresidual_103Mask.unmaskedValue;
    if ($_TIPOEMPRESAUSU == 'H') {
        if ($_TIPOARTW > 0) {
            _evaluarvidautil();
        } else {
            _evaluarubicacionart();
        }
    } else {
        _evaluarubicacionart();
    }

}

function _evaluarubicacionart() {
    validarInputs({
        form: '#UBICART_103',
        orden: "1"
    },
        function () { _evaluarvlrresidual() },
        _validarubicacionart
    )

}
function _validarubicacionart() {
    $_UBICAC2ARTW = $("#ubicart_103").val();
    _evaluaimpoconsumo()
}

function _evaluaimpoconsumo() {
    validarInputs({
        form: '#IMPOCONSUMO_103',
        orden: "1"
    },
        function () { _evaluarubicacionart() },
        _validarimpoconsumo
    )

}
function _validarimpoconsumo() {
    $_IMPOCONSARTW = $("#impoconsumo_103").val();
    if (parseInt($_IMPOCONSARTW) > 0) {
        $_VLR_IMPOCONS_ARTW = "";
        _evaluacodigocontable();
    }
    else {
        _evaluarvalorimpoconsumo();
    }

}

function _evaluarvalorimpoconsumo() {
    validarInputs({
        form: '#VLRIMPOCONSUMO_103',
        orden: "1"
    },
        function () { _evaluariva() },
        _validarvlrimpoconsumo
    )
}

function _validarvlrimpoconsumo() {
    $_VLRIMPOCONSARTW = $("#vlrimpoconsumo_103").val();
    if (parseInt($_VLRIMPOCONSARTW) > 0) {
        $_IMPOCONSARTW = '';
        _evaluacodigocontable();
    } else {
        _evaluacodigocontable();
    }
}
function _datocuenta() {
    if (parseInt($_TIPOARTW) > 0) {
        if ($_TIPOEMPRESAUSU == 'H') {
            _evaluacodigocontable();
        } else {
            _ubicargrabar();
        }
    }
    else {
        _evaluacodigocontable();
    }
}

function _devolverprimerpag_103() {
    $('#tab1').click();
    _evaluacodigocontable();
}

function _evaluacodigocontable() {
    validarInputs({
        form: '#CONTABLE_103',
        orden: "1"
    },
        function () { _evaluarvlrreferencia(); },
        _leercodigocontable
    )
}


function _leercodigocontable() {
    $_CTAARTW = $("#contable_103").val();
    _leercuenta();
}

function _leercuenta() {
    if (parseInt($_TIPOARTW) > 0) {
        if ($_TIPOEMPRESAUSU == 'H') {
            // _evaluacodigocontable();
            _evaluarpresentacionsalud();
        } else {
            _leeriva()
        }
    }
    else {
        $_TIPOMAE = "4";
        $_LLAVEMAE = $_CTAARTW + $_TIPOMAE;
        LLAMADO_DLL({
            dato: [$_LLAVEMAE],
            callback: _dataINV103_12,
            nombredll: 'INV103_12',
            carpeta: 'INVENT'
        });
    }
}

function _dataINV103_12(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_NOMBREMAE = date[1].trim();
    $_CTAMAE = date[2].trim();
    $_MAYOR1MAE = $_CTAMAE.substring(0, 1);
    $_PORCENTRETMAE = date[3].trim();
    if (swinvalid == "00") {
        $("#contablep_103").val($_NOMBREMAE);

        if (($_MAYOR1MAE == '4') && (($_NITUSU == '0800202522') || (parseInt($_PORCENTRETMAE) > 0)) && ($_PORCENTRETMAE != $_TARW)) {
            CON851('', 'Tarifa diferente a cuenta contable', null, 'warning', 'Advertencia!');

            if ($_NITUSU = '0800202522') {
                _leeriva();
            } else {
                _datocuenta();
            }
        } else if ($_TIPOEMPRESAUSU == 'H') {
            _evaluarpresentacionsalud();
        } else {
            _leeriva();
        }
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        // VA A DATO-CUENTA  HAY UN IF (TIPO-ART > 0) OPCION-GRABAR
        // _evaluacodigocontable()
        _datocuenta();
    } else {
        CON852(date[0], date[1], date[3], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _leeriva() {

    if (($_IVAARTW == "0") || ($_IVAARTW == "1") || ($_IVAARTW == "2") || ($_IVAARTW == "3")) {
        switch ($_IVAARTW) {
            case "0":
                $_TARW == "0";
                $("#iva_103").val($_TARW);
                $("#tabivap_103").val("00");
                _evaluartabla();
                break;
            case "1":
                $_TARW == $_IVA_USU;
                $("#tabivap_103").val($_IVA_USU);
                _evaluartabla();
                break;
            case "2":
                $_TARW = $_IVA_2_USU;
                $("#tabivap_103").val($_TARW);
                _evaluartabla();
                break;
            case "3":
                $_TARW = $_IVA_3_USU;
                $("#tabivap_103").val($_TARW);
                _evaluartabla();
                break;
        }
    }
    else if (($_IVAARTW > "0") && ($_TARW == "00")) {
        alert("ERROR EN TARIFA DE IVA");
    }
}

/////////////////////// PRIMER TABLA ////////////////////////////////////////


function _evaluartabla(orden) {
    _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F3- Grabar' }] })
    validarTabla(
        {
            tabla: '#TABLAVTAARTW_103',
            orden: orden,
            event_f3: _ubicargrabar
        },
        seleccion,
        function () {
            _evaluariva();
        },
        // _ubicargrabar
        _pestañaproduccion
    );
}

function seleccion(datos) {
    // var tabla = datos;
    $('#prefijo_103').val(datos.cells[0].textContent);
    $('#prefijod_103').val(datos.cells[1].textContent);
    porcinccomp_103Mask.typedValue = datos.cells[2].textContent;
    baseventa_103Mask.typedValue = datos.cells[3].textContent;
    vlradicional_103Mask.typedValue = datos.cells[4].textContent;
    incvta_103Mask.typedValue = datos.cells[5].textContent;
    $('#vlrfinal_103').val(datos.cells[6].textContent);
    INV103.tablaINV103 = [];
    let b = {
        'prefijo': datos.cells[0].textContent,
        'prefijod': datos.cells[1].textContent,
        'porcinc': datos.cells[2].textContent,
        'baseventa': datos.cells[3].textContent,
        'vlradicional': datos.cells[4].textContent,
        'incvta': datos.cells[5].textContent,
        'vlrfinal': datos.cells[6].textContent,
    }
    INV103.tablaINV103.push(b);

    if ($_FORMALIQARTW == '1') {
        _evaluartablal('2');
    }
    else {
        _evaluartablal('1');
    }
}

function _evaluartablal(orden) {

    validarInputs({
        form: '#TABLAL_103',
        orden: orden
    },
        function () { _evaluartabla() },
        _validartablal
    )
}

function _validartablal() {

    var cambiar = $('#prefijo_103').val();
    cambiar = parseInt(cambiar);
    var fila = $('#TABLAVTAARTW_103').find('tr:eq(' + cambiar + ')');
    var base = $('#baseventa_103').val();
    base = base.replace(/,/g, '');
    var iva = parseInt($_TARW);
    iva = iva / 100;
    var valorfinaltabla = parseInt(base) * (iva);
    valorfinaltabla = valorfinaltabla + parseInt(base);
    valorfinal_103Mask.typedValue = parseInt(valorfinaltabla);


    var html = '<td>' + $('#prefijo_103').val() +
        '</td><td>' + $('#prefijod_103').val() +
        '</td><td>' + $('#inccomp_103').val() +
        '</td><td>' + $('#baseventa_103').val() +
        '</td><td>' + $('#vlrradic_103').val() +
        '</td><td>' + $('#incvta_103').val() +
        '</td><td>' + $('#vlrfinal_103').val() +
        '</td>';
    fila.html(html);

    _evaluartabla();
}


//////// SEGUNDA TABLA///////////////////////////////////////////////////////

function _pestañaproduccion() {
    // $('#grabar_inv103').hide()
    $('#tab5').click();
    if ($_NOVEDAD == '7') {
        _evaluaralmacen();
    }
    else {
        _validaciontablaalmacen_103();
    }
}
function _evaluaralmacensalud() {
    _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F3 para Grabar' }] })
    validarInputs({
        form: '#validarAlmacen_103',
        orden: "1",
        event_f3: _ubicargrabar
    },
        function () { _evaluarhomologosalud(); },
        _validaralmacen
    )
}
function _evaluaralmacen() {
    validarInputs({
        form: '#validarAlmacen_103',
        orden: "1",
        event_f3: _ubicargrabar
    },
        function () { _devolverprimerpag_103() },
        _validaralmacen
    )
}

function _validaralmacen() {
    $_ALMACENARTW = $("#almacen_103").val();
    if ($_ALMACENARTW.trim() == '') {
        $_ALMACENARTW = '';
        _evaluarcodigoarticulo();

    } else {
        LLAMADO_DLL({
            dato: [$_ALMACENARTW],
            callback: _dataINV103_21,
            nombredll: 'INV103_21',
            carpeta: 'INVENT'
        });
    }
}

function _dataINV103_21(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        _evaluarcodigoarticulo();
    }
    else if (swinvalid = "01") {
        CON851('01', '01', null, 'error', 'Error');
        _evaluaralmacen();
    }
    else {
        CON852(date[0], date[1], date[3], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _evaluarcodigoarticulo() {

    validarInputs({
        form: '#validarcodigo_103',
        orden: "1"
    },
        function () { _evaluaralmacen() },
        _validarcodigoarticulo
    )
}

function _validarcodigoarticulo() {
    $_CODIGOARTW = $("#codigoart_103").val();

    if ($_CODIGOARTW.trim() == '') {
        $_CODIGOARTW = '';
        _evaluarcantidadart();

    } else {
        LLAMADO_DLL({
            dato: [$_CODIGOARTW],
            callback: _dataINV103_18_01,
            nombredll: 'INV103_18',
            carpeta: 'INVENT'
        });
    }
}
function _dataINV103_18_01(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        _evaluarcantidadart();
    }
    else if (swinvalid = "01") {
        CON851('01', '01', null, 'error', 'Error');
        _evaluaralmacen();
    }
    else {
        CON852(date[0], date[1], date[3], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _evaluarcantidadart() {

    cantidadart_103Mask.updateValue();
    validarInputs({
        form: '#validarcant_103',
        orden: "1"
    },
        function () { _evaluarcodigoarticulo() },
        _validarcantidadarticulo
    )
}

function _validarcantidadarticulo() {

    $_CANTIDADARTW = cantidadart_103Mask.unmaskedValue;
    if ($_NOVEDAD == 7) {
        agregarFilaTabla();
    } else {
        editarfilatabla();
    }
}

function editarfilatabla() {

    var tamañotabla = $('#tablaalmacen_103 tbody tr').length;
    let nfila = parseInt($_Nfila) - 1;
    let fila = $('#tablaalmacen_103 tbody tr:eq(' + nfila + ')');
    let html = '<td>' + $('#almacen_103').val() +
        '</td><td>' + $('#codigoart_103').val() +
        '</td><td>' + $('#cantidad_103').val() +
        '</td>';
    fila.html(html);

    _validaciontablaalmacen_103();
}

function agregarFilaTabla() {

    $('#tablaalmacen_103 tbody').append(
        '<tr>' +
        '<td>' + $('#almacen_103').val() + '</td>' +
        '<td>' + $('#codigoart_103').val() + '</td>' +
        '<td>' + $('#cantidad_103').val() + '</td>' +
        '</tr>'
    );
    _validaciontablaalmacen_103();
}

function _validaciontablaalmacen_103(orden) {
    validarTabla(
        {
            tabla: '#tablaalmacen_103',
            orden: orden,
            event_f3: _ubicargrabar
        },
        _produccion,
        function () {
            _evaluartabla()
        },
        _ubicargrabar

    );
}

function _produccion(datos) {
    $('#almacen_103').val(datos.cells[0].textContent);
    $('#codigoart_103').val(datos.cells[1].textContent);
    cantidadart_103Mask.typedValue = datos.cells[2].textContent;
    INV103.TABLAPRODUC = [];
    let c = {
        'almacen': datos.cells[0].textContent,
        'codigoart': datos.cells[1].textContent,
        'cantidadart': datos.cells[2].textContent
    }
    INV103.TABLAPRODUC.push(c);

    if ($_NOVEDAD == 7) {
        _limpiarcampos_103();
        _evaluaralmacen();
    } else {
        _evaluaralmacen();
    }

}

function _limpiarcampos_103() {

    $('#almacen_103').val('');
    $('#codigoart_103').val('');
    $('#cantidad_103').val('');
}


///////////////////////////// GRABAR DATOS ///////////////////////////////
function _ubicargrabar() {
    _FloatText({ estado: 'off' })
    if ($_TIPOEMPRESAUSU == 'H') {
        CON851P('01', _devolverconsulta_inv103, _grabarsalud_INV103)
    } else {
        CON851P('01', _devolverconsulta_inv103, _tablatxt)
    }
}
function _grabarsalud_INV103() {

    $('#web_103').is(':checked') ? $_VISUALWEBARTW == 'S' : $_VISUALWEBARTW == 'N';
    $('#acomp_103').is(':checked') ? $_ACOMPARTW == 'S' : $_ACOMPARTW == 'N';
    $('#observfac_103').is(':checked') ? $_OBSERVFACTARTW == 'S' : $_OBSERVFACTARTW == 'N';
    $_VLRULTCOMPRAARTW.length > 0 ? $_VLRULTCOMPRAARTW = $_VLRULTCOMPRAARTW : $_VLRULTCOMPRAARTW = ' ';
    $_FECHAULTCOMPRAARTW = momentMaskFecha.unmaskedValue;
    $_FECHACOMPRAALTAARTW = momentMaskFechacompra.unmaskedValue;
    if ($_NOVEDAD == '7') {
        $_POLARTW = '0';
        $_MERMAARTW = '0';
        $_FORMALIQARTW = '2';
        $_PESOARTW = '0';
        $_IVAARTW = '0';
        $_VLRULTCOMPRAARTW = '000';
        $_CANTCOMPARTW = ' ';
        $_FECHAULTCOMPRAARTW = '00000000';
        $_COLORARTW = ' ';
        $_FECHALISTACOMP = '00000000';
        $_TALLAARTW = ' ';
        $_PRECIOLISTACOMPRATW = '0';
        $_CCOSTOARTW = ' ';
        $_VLRREFARTW = '0';
        $_VLRRAZONABLEARTW = '0';
        $_VLRRESIDUALARTW = '0';
        $_VIDAUTILARTW = '0';
        $_OBSERVFACTARTW = '0';
        $_UBICAC2ARTW = '0';
        $_IMPOCONSARTW = '0';
        $_VLRIMPOCONSARTW = '0';
        $_CTAARTW = ' ';
        $_OPERELABARTW = $_ADMINW;
        $_FECHAELABARTW = moment().format('YYMMDD');
        $_HORAELABARTW = moment().format('HHmm');
        $_OPERMODARTW = ' ';
        $_FECHAMODARTW = ' ';
        $_HORAMODARTW = ' ';
    }
    else {
        $_FECHAELABARTW = ' ';
        $_HORAELABARTW = ' ';
        $_OPERELABARTW = ' ';
        $_FECHAMODARTW = moment().format('YYMMDD');;
        $_HORAMODARTW = moment().format('HHmm');
        $_OPERMODARTW = $_ADMINW
    }
    $_CODARTW = $_TIPOARTW + $_GRUPOARTW + $_NUMEROARTW.padEnd(13, ' ') + $_CLASEARTW;
    if ($_NOVEDAD == '9') {
        postData({ datosh: datosEnvio() + $_NOVEDAD + "|" + $_TIPOARTW + "|" + $_GRUPOARTW + "|" + $_NUMEROARTW + "|" + $_CLASEARTW + "|" }, get_url("APP/INVENT/INV103_24.DLL"))
            .then(data => {
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    _cerrarSegundaVentana();
                } else {
                    CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
                };
            })
            .catch(err => {
                _evaluarnumero()
            });
    }
    else {
        postData({
            datosh: datosEnvio() + $_NOVEDAD + "|" + $_TIPOARTW + "|" + $_GRUPOARTW + "|" + $_NUMEROARTW + "|" + $_CLASEARTW + "|" + $_DESCRIPARTW + "|" + $_USOARTW + "|" + $_VISUALWEBARTW + "|" + $_INGACTARTW + "|" + $_NITARTW + "|" + $_ACOMPARTW + "|" + $_CODBARRASARTW + "|" + $_OTROSARTW + "|" + $_ESTADOARTW + "|" + $_CODMARCAARTW + "|" + $_DESCRIPMARCAARTW + "|" + $_REFARTW + "|" + $_DCTOGRALVTAARTW + "|" + $_AUTORETARTW + "|" + $_PAQUETESARTW + "|" + $_UNIDADARTW + "|" + $_REPOSARTW + "|" + $_UNIDCONVARTW + "|" + $_STOCKALMARTW + "|" + $_STOCKMINARTW + "|" + $_STOCKMAXARTW + "|" + $_POLARTW + "|" + $_MERMAARTW + "|" +
                $_FORMALIQARTW + "|" + $_PESOARTW + "|" + $_IVAARTW + "|" + $_VLRULTCOMPRAARTW + "|" + $_CANTCOMPARTW + "|" + $_FECHAULTCOMPRAARTW + "|" + $_COMPRAALTAARTW + "|" + $_FECHACOMPRAALTAARTW + "|" + $_COLORARTW + "|" + $_FECHALISTACOMP + "|" + $_TALLAARTW + "|" + $_PRECIOLISTACOMPRATW + "|" + $_CCOSTOARTW + "|" + $_VLRREFARTW + "|" + $_VLRRAZONABLEARTW + "|" + $_VLRRESIDUALARTW + "|" +
                $_VIDAUTILARTW + "|" + $_OBSERVFACTARTW + "|" + $_UBICAC2ARTW + "|" + $_IMPOCONSARTW + "|" + $_VLRIMPOCONSARTW + "|" + $_CTAARTW + "|" + $_OPERELABARTW + "|" + $_FECHAELABARTW + "|" + $_HORAELABARTW + "|" + $_OPERMODARTW + "|" + $_FECHAMODARTW + "|" + $_HORAMODARTW + "|" + $_PRESENTACIONARTW + "|" + $_UNIDADARTW + "|" + $_ATCARTW + "|" +
                $_EXSISMEDARTW + "|" + $_MEDREGULADOARTW + "|" + $_SISDISARTW + "|" + $_CLASERIESGOARTW + "|" + $_HOMOLOGOARTW + "|" + $_HOMOLOGOCODARTW + "|" + $_CONVHOMOLOARTW + '|'
        }, get_url("APP/INVENT/INV103_24.DLL"))
            .then(data => {
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    _cerrarSegundaVentana();
                } else {
                    CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
                };
            })
            .catch(err => {
                _devolverconsulta_inv103()
            });
    }

}
function _devolverconsulta_inv103() {
    if (($_NOVEDAD == 7) && (parseInt($_TIPOARTW) > 0)) {
        _evaluarrefencia();
    }
    else {
        _devolverprimerpag_103();
    }
}

function _tablatxt() {

    let fecha = moment().format('YY/MM/DD HH:mm:ss:ms');
    let nombretxt = $_ADMINW + '_' + fecha.substring(0, 2) + fecha.substring(3, 5) + fecha.substring(6, 8) + fecha.substring(9, 11) + fecha.substring(12, 14) + fecha.substring(15, 17) + fecha.substring(18, 20);
    INV103['NOMBREINVENT'] = nombretxt;
    let datosEnvio = {
        nombre_archinventarios: INV103.NOMBREINVENT,
        datos_inventarios: INV103.tablaINV103,
    };
    $.ajax({
        data: datosEnvio,
        type: 'POST',
        async: false,
        url: get_url('SALUD/paginas/_datosTablas_INV103.php')
    }).done(function (data) {
        if (data == '00') {
            _tabladostxt();
        } else {
            jAlert({ titulo: 'Error 99', mensaje: 'Error escribiendo plano', autoclose: true });
        }
    });
}

function _tabladostxt() {


    let fecha = moment().format('YY/MM/DD HH:mm:ss:ms');
    let nombretxt = $_ADMINW + '_2' + fecha.substring(0, 2) + fecha.substring(3, 5) + fecha.substring(6, 8) + fecha.substring(9, 11) + fecha.substring(12, 14) + fecha.substring(15, 17) + fecha.substring(18, 20);
    INV103['NOMBREPRODUCC'] = nombretxt;
    let datosEnvio = {
        nombre_archivo: INV103.NOMBREPRODUCC,
        datos_produccion: INV103.TABLAPRODUC,
    };
    $.ajax({
        data: datosEnvio,
        type: 'POST',
        async: false,
        url: get_url('app/Inc/_datosTablas_INV103.php')
    }).done(function (data) {
        if (data == '00') {
            if ($_NOVEDAD == '9') {
                _eliminarregistro();
            }
            else {
                _grabardatos();
            }

        } else {
            jAlert({ titulo: 'Error 99', mensaje: 'Error escribiendo plano', autoclose: true });
        }
    });
}


function _grabardatos() {

    $('#web_103').is(':checked') ? $_VISUALWEBARTW == 'S' : $_VISUALWEBARTW == 'N';
    $('#acomp_103').is(':checked') ? $_ACOMPARTW == 'S' : $_ACOMPARTW == 'N';
    $('#observfac_103').is(':checked') ? $_OBSERVFACTARTW == 'S' : $_OBSERVFACTARTW == 'N';
    $_VLRULTCOMPRAARTW.length > 0 ? $_VLRULTCOMPRAARTW = $_VLRULTCOMPRAARTW : $_VLRULTCOMPRAARTW = ' ';

    $_FECHAULTCOMPRAARTW = momentMaskFecha.unmaskedValue;
    $_FECHACOMPRAALTAARTW = momentMaskFechacompra.unmaskedValue;

    if ($_NOVEDAD == '8') {
        $_FECHAMODARTW = moment().format('YYMMDD');
        $_HORAMODARTW = moment().format('HH:mm');
        $_OPERMODARTW = $_ADMINW;
    }
    else if (($_NOVEDAD == '7' && $_TIPOARTW > 0) || ($_NOVEDAD == '8' && $_TIPOARTW > 0)) {
        $_POLARTW = '0';
        $_MERMAARTW = '0';
        $_FORMALIQARTW = '2';
        $_PESOARTW = '0';
        $_IVAARTW = '0';
        $_VLRULTCOMPRAARTW = '000';
        $_CANTCOMPARTW = ' ';
        $_FECHAULTCOMPRAARTW = '00000000';
        $_COLORARTW = ' ';
        $_FECHALISTACOMP = '00000000';
        $_TALLAARTW = ' ';
        $_PRECIOLISTACOMPRATW = '0';
        $_CCOSTOARTW = ' ';
        $_VLRREFARTW = '0';
        $_VLRRAZONABLEARTW = '0';
        $_VLRRESIDUALARTW = '0';
        $_VIDAUTILARTW = '0';
        $_OBSERVFACTARTW = '0';
        $_UBICAC2ARTW = '0';
        $_IMPOCONSARTW = '0';
        $_VLRIMPOCONSARTW = '0';
        $_CTAARTW = ' ';
        $_OPERELABARTW = $_ADMINW;
        $_FECHAELABARTW = moment().format('YYMMDD');
        $_HORAELABARTW = moment().format('HH:mm');
        $_OPERMODARTW = ' ';
        $_FECHAMODARTW = ' ';
        $_HORAMODARTW = ' ';
        // $_NOMBRETXT = ' ';
        // $_NOMBREDOSTXT = ' ';
    }
    else {
        $_FECHAELABARTW = moment().format('YYMMDD');
        $_HORAELABARTW = moment().format('HH:mm');
        $_OPERELABARTW = $_ADMINW;
        $_FECHAMODARTW = ' ';
        $_HORAMODARTW = ' ';
        $_OPERMODARTW = ' ';
    }
    $_CODARTW = $_TIPOARTW + $_GRUPOARTW + $_NUMEROARTW.padEnd(13, ' ') + $_CLASEARTW;
    LLAMADO_DLL({
        dato: [$_NOVEDAD, $_TIPOARTW, $_GRUPOARTW, $_NUMEROARTW, $_CLASEARTW, $_DESCRIPARTW, $_USOARTW, $_VISUALWEBARTW, $_INGACTARTW, $_NITARTW,
            $_ACOMPARTW, $_CODBARRASARTW, $_OTROSARTW, $_ESTADOARTW, $_CODMARCAARTW, $_DESCRIPMARCAARTW, $_REFARTW, $_DCTOGRALVTAARTW, $_AUTORETARTW,
            $_PAQUETESARTW, $_UNIDADARTW, $_REPOSARTW, $_UNIDCONVARTW, $_STOCKALMARTW, $_STOCKMINARTW, $_STOCKMAXARTW, $_POLARTW, $_MERMAARTW,
            $_FORMALIQARTW, $_PESOARTW, $_IVAARTW, $_VLRULTCOMPRAARTW, $_CANTCOMPARTW, $_FECHAULTCOMPRAARTW, $_COMPRAALTAARTW, $_FECHACOMPRAALTAARTW,
            $_COLORARTW, $_FECHALISTACOMP, $_TALLAARTW, $_PRECIOLISTACOMPRATW, $_CCOSTOARTW, $_VLRREFARTW, $_VLRRAZONABLEARTW, $_VLRRESIDUALARTW,
            $_VIDAUTILARTW, $_OBSERVFACTARTW, $_UBICAC2ARTW, $_IMPOCONSARTW, $_VLRIMPOCONSARTW, $_CTAARTW, $_OPERELABARTW, $_FECHAELABARTW,
            $_HORAELABARTW, $_OPERMODARTW, $_FECHAMODARTW, $_HORAMODARTW, INV103.NOMBREINVENT, INV103.NOMBREPRODUCC, $_PRESENTACIONARTW, $_UNIDADARTW, $_ATCARTW,
            $_EXSISMEDARTW, $_MEDREGULADOARTW, $_SISDISARTW, $_CLASERIESGOARTW, $_HOMOLOGOARTW, $_HOMOLOGOCODARTW, $_CONVHOMOLOARTW, $_TIPOEMPRESAUSU],
        callback: _dataINV103_17,
        nombredll: 'INV103_17',
        carpeta: 'INVENT'
    });
}


function _eliminarregistro() {
    $('#web_103').is(':checked') ? $_VISUALWEBARTW == 'S' : $_VISUALWEBARTW == 'N';
    $('#acomp_103').is(':checked') ? $_ACOMPARTW == 'S' : $_ACOMPARTW == 'N';
    $('#observfac_103').is(':checked') ? $_OBSERVFACTARTW == 'S' : $_OBSERVFACTARTW == 'N';
    $_VLRULTCOMPRAARTW.length > 0 ? $_VLRULTCOMPRAARTW = $_VLRULTCOMPRAARTW : $_VLRULTCOMPRAARTW = ' ';

    if ($_NOVEDAD == '8') {
        $_FECHAMODARTW = moment().format('YYMMDD');
        $_HORAMODARTW = moment().format('HH:mm');
        $_OPERMODARTW = $_ADMINW;
        $_FECHAELABARTW = ' ';
        $_HORAELABARTW = ' ';
        $_OPERELABARTW = ' '
    }
    else {
        $_FECHAELABARTW = moment().format('YYMMDD');
        $_HORAELABARTW = moment().format('HH:mm');
        $_OPERELABARTW = $_ADMINW;
        $_FECHAMODARTW = ' ';
        $_HORAMODARTW = ' ';
        $_OPERMODARTW = ' ';
    }
    $_CODARTW = $_TIPOARTW + $_GRUPOARTW + $_NUMEROARTW + $_CLASEARTW;

    LLAMADO_DLL({
        dato: [$_NOVEDAD, $_TIPOARTW, $_GRUPOARTW, $_NUMEROARTW, $_CLASEARTW, $_DESCRIPARTW, $_USOARTW, $_VISUALWEBARTW, $_INGACTARTW, $_NITARTW,
            $_ACOMPARTW, $_CODBARRASARTW, $_OTROSARTW, $_ESTADOARTW, $_CODMARCAARTW, $_DESCRIPMARCAARTW, $_REFARTW, $_DCTOGRALVTAARTW, $_AUTORETARTW,
            $_PAQUETESARTW, $_UNIDADARTW, $_REPOSARTW, $_UNIDCONVARTW, $_STOCKALMARTW, $_STOCKMINARTW, $_STOCKMAXARTW, $_POLARTW, $_MERMAARTW,
            $_FORMALIQARTW, $_PESOARTW, $_IVAARTW, $_VLRULTCOMPRAARTW, $_CANTCOMPARTW, $_FECHAULTCOMPRAARTW, $_COMPRAALTAARTW, $_FECHACOMPRAALTAARTW,
            $_COLORARTW, $_FECHALISTACOMP, $_TALLAARTW, $_PRECIOLISTACOMPRATW, $_CCOSTOARTW, $_VLRREFARTW, $_VLRRAZONABLEARTW, $_VLRRESIDUALARTW,
            $_VIDAUTILARTW, $_OBSERVFACTARTW, $_UBICAC2ARTW, $_IMPOCONSARTW, $_VLRIMPOCONSARTW, $_CTAARTW, $_OPERELABARTW, $_FECHAELABARTW,
            $_HORAELABARTW, $_OPERMODARTW, $_FECHAMODARTW, $_HORAMODARTW, INV103.NOMBREINVENT, INV103.NOMBREPRODUCC, $_PRESENTACIONARTW, $_UNIDADARTW, $_ATCARTW,
            $_EXSISMEDARTW, $_MEDREGULADOARTW, $_SISDISARTW, $_CLASERIESGOARTW, $_HOMOLOGOARTW, $_HOMOLOGOCODARTW, $_CONVHOMOLOARTW],
        callback: _dataINV103_17,
        nombredll: 'INV103_17',
        carpeta: 'INVENT'
    });
}

function _dataINV103_17(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if ($_NOVEDAD == '9') {
            toastr.success('Se ha retirado', 'MAESTRO ARTICULOS');
            _inputControl('reset');
            () => {
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    _cerrarSegundaVentana();
                } else {
                    _toggleNav()
                };
            }
        } else {
            toastr.success('Se ha guardado', 'MAESTRO ARTICULOS');
            _inputControl('reset');
            () => {
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    _cerrarSegundaVentana();
                } else {
                    _toggleNav()
                };
            }
        }
    } else if (swinvalid == "01") {
        CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'error');
        _evaluacodigocontable();
    } else {
        CON852(date[0], date[1], date[3], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}


function _retirar() {
    _cambioregistro();
}

function _cambioregistro() {
    $_CODARTW = $_CODARTW.padEnd(18, ' ');
    $_CODBARRASARTW = $_CODBARRASARTW.padEnd(15, ' ');
    LLAMADO_DLL({
        dato: [$_ADMINW, $_CODARTW, $_CODBARRASARTW],
        callback: _dataINV103_15,
        nombredll: 'INV103_15',
        carpeta: 'INVENT'
    });
}

function _dataINV103_15(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    var codenv = date[1].trim();
    $_TIPOARTW = codenv.substring(0, 1);
    $_GRUPOARTW = codenv.substring(1, 3);
    $_NUMEROARTW = codenv.substring(3, 16);
    $_CLASEARTW = codenv.substring(16, 18);
    $_DESCRIPGRUPO = date[2].trim();
    $_DESCRIPARTW = date[3].trim();
    $_CODBARRASARTW = date[4].trim();
    $_USOARTW = date[5].trim();
    $_CODMARCAARTW = date[6].trim();
    $_DESCRIPMARCAARTW = date[7].trim();
    $_REFARTW = date[8].trim();
    $_VISUALWEBARTW = date[9].trim();
    $_INGACTARTW = date[10].trim();
    $_ACOMPARTW = date[11].trim();
    $_NITARTW = date[12].trim();
    $_DESCRIPTER = date[13].trim();
    $_OTROSARTW = date[14].trim();
    $_CTAARTW = date[15].trim();
    $_NOMBREMAE = date[16].trim();
    $_ESTADOARTW = date[17].trim();
    $_DCTOGRALVTAARTW = date[18].trim();
    $_AUTORETARTW = date[19].trim();
    $_PAQUETESARTW = date[20].trim();
    $_UNIDADARTW = date[21].trim();
    $_REPOSARTW = date[22].trim();
    $_UNIDCONVARTW = date[23].trim();
    $_STOCARTW = date[24].trim();
    $_STOCKALMARTW = $_STOCARTW.substring(0, 5);
    $_STOCKMINARTW = $_STOCARTW.substring(5, 11);
    $_STOCKMAXARTW = $_STOCARTW.substring(11, 17);
    $_POLARTW = date[25].trim();
    $_DESCRIPPOL = date[26].trim();
    $_MERMAARTW = date[27].trim();
    $_FORMALIQARTW = date[28].trim();
    $_PESOARTW = date[29].trim();
    $_IVAARTW = date[30].trim();
    if ($_IVAARTW == '1') {
        $_TARW = $_IVA_USU;
    }
    else if ($_IVAARTW == '2') {
        $_TARW = $_IVA_2_USU;
    }
    else if ($_IVAARTW == '3') {
        $_TARW = $_IVA_3_USU;
    }
    else if ($_IVAARTW == '0') {
        $_TARW = '0';
    }
    $_VLRULTCOMPRAARTW = date[31].trim();
    $_CANTCOMPARTW = date[32].trim();
    $_FECHAULTCOMPRAARTW = date[33].trim();
    $_COMPRAALTAARTW = date[34].trim();
    $_FECHACOMPRAALTAARTW = date[35].trim();
    $_COLORARTW = date[36].trim();
    $_FECHALISTACOMP = date[37].trim();
    $_TALLAARTW = date[38].trim();
    $_PRECIOLISTACOMPRATW = date[39].trim();
    $_CCOSTOARTW = date[40].trim();
    $_NOMBRECOSTO = date[41].trim();
    $_VLRREFARTW = date[42].trim();
    $_FECHAMODARTW = date[43].trim();
    $_VLRRAZONABLEARTW = date[44].trim();
    $_VLRRESIDUALARTW = date[45].trim();
    $_VIDAUTILARTW = date[46].trim();
    $_OBSERVFACTARTW = date[47].trim();
    $_UBICAC2ARTW = date[48].trim();
    $_IMPOCONSARTW = date[49].trim();
    $_VLRIMPOCONSARTW = date[50].trim();
    $_OPERELABARTW = date[51].trim();
    $_FECHAELABARTW = date[52].trim();
    $_HORAELABARTW = date[53].trim();
    $_OPERMODARTW = date[54].trim();
    $_FECHAMODARTW = date[55].trim();
    $_HORAMODARTW = date[56].trim();
    $_DESCRIPUSO = date[58].trim();
    $_DESCRIPUSO2 = date[59].trim();

    if (swinvalid == '00') {
        var json = date[60].trim();
        var rutajson = get_url("temp/" + json);
        SolicitarDatos(
            null,
            function (data) {
                $_TABLA_103 = data.TABLA;
                var arrayEliminar = [];
                arrayEliminar.push(json)
                _eliminarJson(arrayEliminar, on_eliminarJson_109_01);
            },
            rutajson
        );
        // if ($_LISTAPRECIOUSU == '1') {
        //     LLAMADO_DLL({
        //         dato: [],
        //         callback: _dataINV103_16,
        //         nombredll: 'INV103_16',
        //         carpeta: 'INVENT'
        //     });
        // }
        // else {
        //     _ubicarcambio();

        // }
    }
    else {
        CON852(date[1], date[2], date[3], _toogleNav);
    }
}

function on_eliminarJson_109_01(data) {
    loader('hide');
    var rdll = data.split('|');
    if (rdll[0].trim() == '00') {
        // if ($_LISTAPRECIOUSU == '1') {
        LLAMADO_DLL({
            dato: [],
            callback: _dataINV103_16,
            nombredll: 'INV103_16',
            carpeta: 'INVENT'
        });
    } else {
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _dataINV103_16(data) {
    var date = data.split('|');
    if (date[0].trim() == '00') {
        var json = date[1].trim();
        var rutaJson = get_url("temp/" + json);
        SolicitarDatos(
            null,
            function (data) {
                $_CLASC_103 = data.TABLA;
                var arrayEliminar = [];
                arrayEliminar.push(json)
                _eliminarJson(arrayEliminar, on_eliminarJson_103_02);
            },
            rutaJson
        );
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
function on_eliminarJson_103_02(data) {
    loader('hide');
    var rdll = data.split('|');
    if (rdll[0].trim() == '00') {
        _consultatablaproduccion();
    } else {
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _consultatablaproduccion() {
    $_CODARTW = $_CODARTW.padEnd(18, ' ');
    $_CODBARRASARTW = $_CODBARRASARTW.padEnd(15, ' ');
    LLAMADO_DLL({
        dato: [$_CODARTW, $_CODBARRASARTW],
        callback: _dataINV103_22,
        nombredll: 'INV103_22',
        carpeta: 'INVENT'
    });
}

function _dataINV103_22(data) {
    console.log(data, 'ARTICULOS')
    var date = data.split('|');
    if (date[0].trim() == '00') {
        var json = date[3].trim();
        $_PRESENTACIONARTW = date[4].trim();
        $_UNIDADARTW = date[5].trim();
        $_ATCARTW = date[6].trim();
        $_CONCENTRADOARTW = date[7].trim();
        $_EXSISMEDARTW = date[8].trim();
        $_MEDREGULADOARTW = date[9].trim();
        $_SISDISARTW = date[10].trim();
        $_CLASERIESGOARTW = date[11].trim();
        $_HOMOLOGOARTW = date[12].trim();
        $_HOMOLOGOCODARTW = date[13].trim();
        $_CONVHOMOLOARTW = date[14].trim();
        var rutajson = get_url("temp/" + json);
        SolicitarDatos(
            null,
            function (data) {
                $_PRODUCCION_103 = data.PRODUCCION;
                var arrayEliminar = [];
                arrayEliminar.push(json)
                _eliminarJson(arrayEliminar, on_eliminarJson_103_03);
            },
            rutajson
        );

    } else {
        loader('hide');
        CON852(rdll[0], rdll[1], rdll[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function on_eliminarJson_103_03(data) {
    loader('hide');
    var rdll = data.split('|');
    if (rdll[0].trim() == '00') {
        _consultatablamacroinv();
    } else {
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}
function _consultatablamacroinv() {
    $_CODARTW = $_CODARTW.padEnd(18, ' ');
    $_CODBARRASARTW = $_CODBARRASARTW.padEnd(15, ' ');
    LLAMADO_DLL({
        dato: [$_CODARTW, $_CODBARRASARTW],
        callback: _dataINV103_23,
        nombredll: 'INV103_23',
        carpeta: 'INVENT'
    });
}
function _dataINV103_23(data) {
    var date = data.split('|');
    if (date[0].trim() == '00') {
        var json = date[1].trim();
        var rutajson = get_url("temp/" + json);
        SolicitarDatos(
            null,
            function (data) {
                $_MACROINVENT_103 = data.MACROINVENT;
                var arrayEliminar = [];
                arrayEliminar.push(json)
                _eliminarJson(arrayEliminar, on_eliminarJson_103_04);
            },
            rutajson
        );

    } else {
        loader('hide');
        CON852(rdll[0], rdll[1], rdll[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}
function on_eliminarJson_103_04(data) {
    loader('hide');
    var rdll = data.split('|');
    if (rdll[0].trim() == '00') {

        setTimeout(_ubicarcambio, 300);
    } else {
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}
////////////////////////////////////////////////////


function _ubicarcambio() {
    var cont = 0;
    for (var i = 0; i < $_TABLA_103.length; i++) {
        valorrealvrventa0 = $_TABLA_103[i].VR_VENTA;
        valorrealvrventa = valorrealvrventa0.substring(0, 12);
        valorrealvrventa = parseInt(valorrealvrventa);
        valoriva0 = parseInt($_TARW);
        valoriva = valoriva0 / 100;

        valorfinal = valorrealvrventa * (valoriva);
        valorfinal = valorfinal + valorrealvrventa;
        valorfinal = parseInt(valorfinal);

        if (cont == 0) {
            valorfinal = valorfinal.toString();
            $_VALORFINAL = '[{"VALOR":"' + valorfinal + '.00';
            cont++;
        }
        else if (cont < $_TABLA_103.length - 1) {
            valorfinal = valorfinal.toString();
            $_VALORFINAL = $_VALORFINAL + '"},{"VALOR":"' + valorfinal + '.00';
            cont++;
        }
        else if (cont < $_TABLA_103.length) {
            valorfinal = valorfinal.toString();
            $_VALORFINAL = $_VALORFINAL + '"},{"VALOR":"' + valorfinal + '.00' + '"}]';
            $_VALORFINALTABLA = JSON.parse($_VALORFINAL);
            _mostrardatos();
            break;
        }
    }
}

function _mostrardatos() {
    $_VISUALWEBARTW == 'S' ? $('#web_103')[0].checked = true : $('#web_103')[0].checked = false;
    $_ACOMPARTW == 'S' ? $('#acomp_103')[0].checked = true : $('#acomp_103')[0].checked = false;
    $_OBSERVFACTARTW == 'S' ? $('#observfac_103')[0].checked = true : $('#observfac_103')[0].checked = false;
    let tipo = { '0': 'MERCANCIA PARA LA VENTA', '1': 'BIENES DE CONSUMO', '2': 'BIENES DEVOLUTIVAS', '3': 'BIENES INMUEBLES', '4': 'MENOS CUANTIA' };
    $('#tipo_103').val($_TIPOARTW + ' - ' + tipo[$_TIPOARTW]);
    $('#grupo_103').val($_GRUPOARTW);
    $('#codigo_103').val($_NUMEROARTW);
    $('#clase_103').val($_CLASEARTW);
    $('#clased_103').val($_DESCRIPUSO);
    $('#descripcion_103').val($_DESCRIPARTW);
    $('#uso_103').val($_USOARTW);
    $('#grupod_103').val($_DESCRIPGRUPO);
    $('#ingactivo_103').val($_INGACTARTW);
    if ($_NITARTW == '0000000000') {
        $_NITARTW = '';
        $_DESCRIPTER = ''
        $('#proveedor_103').val($_NITARTW);
        $('#proveedorp_103').val($_DESCRIPTER);
    } else {
        $('#proveedor_103').val($_NITARTW);
        $('#proveedorp_103').val($_DESCRIPTER);
    }
    $('#codbarras_103').val($_CODBARRASARTW);
    $('#otros_103').val($_OTROSARTW);
    let estado = { '1': 'BUENO', '2': 'REGULAR', '3': 'MALO' };
    if (estado[$_ESTADOARTW] == undefined) {
        $('#estado_103').val();
    } else {
        $('#estado_103').val($_ESTADOARTW + ' - ' + estado[$_ESTADOARTW]);
    }
    $('#marca_103').val($_CODMARCAARTW);
    $('#marcad_103').val($_DESCRIPMARCAARTW);
    $('#referencia_103').val($_REFARTW);
    autoret_103Mask.typedValue = $_DCTOGRALVTAARTW;
    $('#autoret_103').val($_AUTORETARTW);
    paquetes_103Mask.typedValue = $_PAQUETESARTW;
    $('#unimedida_103').val($_UNIDADARTW);
    $('#reposicion_103').val($_REPOSARTW);
    $('#uniconversion_103').val($_UNIDCONVARTW);
    smin_103Mask.typedValue = $_STOCKMINARTW;
    smax_103Mask.typedValue = $_STOCKMAXARTW;
    stockalm_103Mask.typedValue = $_STOCKALMARTW;
    $('#politica_103').val($_POLARTW);
    $('#politicad_103').val($_DESCRIPPOL);
    $('#merma_103').val($_MERMAARTW);
    let liquidar = { '1': 'PRECIO BASE', '2': '% SOBRE VR ULTCOMPRA', '3': '% SOBRE VR REFERENCIA' };
    $('#fliquidar_103').val($_FORMALIQARTW + ' - ' + liquidar[$_FORMALIQARTW]);
    peso_103Mask.typedValue = $_PESOARTW;
    tablaiva.typedValue = $_TARW;
    $('#ultcompra_103').val($_VLRULTCOMPRAARTW);
    $('#cantc_103').val($_CANTCOMPARTW);
    $_ANOULTCOMPRAARTW = $_FECHAULTCOMPRAARTW.substring(0, 2);
    $_MESULTCOMPRAARTW = $_FECHAULTCOMPRAARTW.substring(2, 4);
    $_DIAULTCOMPRAARTW = $_FECHAULTCOMPRAARTW.substring(4, 6);
    $('#fecha_103').val($_ANOULTCOMPRAARTW + '/' + $_MESULTCOMPRAARTW + '/' + $_DIAULTCOMPRAARTW);
    vlrcompraalta_103Mask.typedValue = $_COMPRAALTAARTW;
    $_ANOCOMPRAALTAARTW = $_FECHACOMPRAALTAARTW.substring(0, 2);
    $_MESCOMPRAALTAARTW = $_FECHACOMPRAALTAARTW.substring(2, 4);
    $_DIACOMPRAALTAARTW = $_FECHACOMPRAALTAARTW.substring(4, 6);
    $('#fechacompra_103').val($_ANOCOMPRAALTAARTW + '/' + $_MESCOMPRAALTAARTW + '/' + $_DIACOMPRAALTAARTW);
    $('#color_103').val($_COLORARTW);
    $_ANOLISTAARTW = $_FECHALISTACOMP.substring(0, 4);
    $_MESLISTAARTW = $_FECHALISTACOMP.substring(4, 6);
    $_DIALISTAARTW = $_FECHALISTACOMP.substring(6, 8);
    $('#listaprec_103').val($_ANOLISTAARTW + '/' + $_MESLISTAARTW + '/' + $_DIALISTAARTW);
    $('#talla_103').val($_TALLAARTW);
    $_ANOMODARTW = $_FECHAMODARTW.substring(0, 2);
    $_MESMODARTW = $_FECHAMODARTW.substring(2, 4);
    $_DIAMODARTW = $_FECHAMODARTW.substring(4, 6);
    $('#ultactu_103').val($_ANOMODARTW + '/' + $_MESMODARTW + '/' + $_DIAMODARTW);
    lista_103Mask.typedValue = $_PRECIOLISTACOMPRATW;
    $('#ccostos_103').val($_CCOSTOARTW.padStart(4, '0'));
    $('#ccostosd_103').val($_NOMBRECOSTO);
    vlrref_103Mask.typedValue = $_VLRREFARTW;
    razonable_103Mask.typedValue = $_VLRRAZONABLEARTW;
    vlrresidual_103Mask.typedValue = $_VLRRESIDUALARTW;
    $('#vidautil_103').val($_VIDAUTILARTW);
    $('#ubicart_103').val($_UBICAC2ARTW);
    $('#contable_103').val($_CTAARTW);
    $('#contablep_103').val($_NOMBREMAE);
    $('#impoconsumo_103').val($_IMPOCONSARTW);
    $('#vlrimpoconsumo_103').val($_VLRIMPOCONSARTW);
    $('#elab2_103').val($_OPERELABARTW);
    $('#elabd2_103').val($_FECHAELABARTW);
    $('#mod2_103').val($_OPERMODARTW);
    $('#modd2_103').val($_FECHAMODARTW);
    let presentacion = { '1': 'CAPSULA', '2': 'TABLETAS', '3': 'PILDORAS', '4': 'GRAGEAS', '5': 'POLVO', '6': 'SUPOSITORIOS', '7': 'OVULOS', '8': 'POMADAS', '9': 'CREMAS', 'A': 'SOLUCIONES', 'B': 'JARABE', 'C': 'COLIRIOS', 'D': 'LOCIONES', 'E': 'LINIMENTOS', 'F': 'ELIXIR', 'G': 'ENEMAS', 'H': 'INHALADOR', 'I': 'AEROSOL', 'J': 'UNIDAD', 'Z': 'NO APLICA' };
    if (presentacion[$_PRESENTACIONARTW] == undefined) {
        $('#presentacion_103').val();
    } else {
        $('#presentacion_103').val($_PRESENTACIONARTW + ' - ' + presentacion[$_PRESENTACIONARTW]);
    }

    let unidad = { '1': 'UNIDAD', '2': 'KILOGRAMOS', '3': 'GRAMOS', '4': 'MILIGRAMOS', '5': 'MICROGRAMOS', '6': 'LITROS', '7': 'MILILITROS', '8': 'CENTIMETROS', '9': 'CENTIMETROS CUBICOS', 'A': 'MILIEQUIVALENTE', 'Z': 'NO APLICA' };
    if (unidad[$_UNIDADARTW] == undefined) {
        $('#unidadme_103').val();
    } else {
        $('#unidadme_103').val($_UNIDADARTW + ' - ' + unidad[$_UNIDADARTW]);
    }
    $('#atc_103').val($_ATCARTW);
    $('#concentrado_103').val($_CONCENTRADOARTW);
    $('#excluir_103').val($_EXSISMEDARTW);
    $('#regulado_103').val($_MEDREGULADOARTW);
    $('#sisdis_103').val($_SISDISARTW);
    let riesgo = { '1': 'CL 1  RIESGO BAJO', '2': 'CL 2A RIESGO MODERADO', '3': 'CL 2B RIESGO ALTO', '4': 'CL 3  RIESGO MUY ALTO' };
    if (riesgo[$_CLASERIESGOARTW] == undefined) {
        $('#riesgo_103').val();
    } else {
        $('#riesgo_103').val($_CLASERIESGOARTW + ' - ' + riesgo[$_CLASERIESGOARTW]);
    }
    
    $('#homologo_103').val($_HOMOLOGOARTW);
    $('#codhomologo_103').val($_HOMOLOGOCODARTW);
    let codhomolo = { '1': 'UNITARIO', '2': 'DUPLICADO', '3': 'TRIPLICADO' };
    if (codhomolo[$_CONVHOMOLOARTW] == undefined) {
        $('#convers_103').val();
    } else {
        $('#convers_103').val($_CONVHOMOLOARTW + ' - ' + codhomolo[$_CONVHOMOLOARTW]);
    }


    var cont = 0;
    for (var i = 0; i < $_TABLA_103.length; i++) {
        valorporcinccompr = $_TABLA_103[i].PORCINC_COMPR;
        valorporcinccompr = valorporcinccompr.substring(0, 3) + '.' + valorporcinccompr.substring(3, 5);
        let valor1 = valorporcinccompr.substring(0, 1);
        valor1 = ! '0' ? valorporcinccompr = valorporcinccompr : valorporcinccompr = valorporcinccompr.substring(1, 6);
        valorvrrenta = $_TABLA_103[i].VR_VENTA;
        valorvrrenta0 = parseInt(valorvrrenta.substring(0, 12));
        valorvrrenta = valorvrrenta0.toString() + '.' + valorvrrenta.substring(12, 14);
        valorvrincrem = $_TABLA_103[i].VR_INCREM;
        valorvrincrem0 = parseInt(valorvrincrem.substring(0, 12));
        valorvrincrem = valorvrincrem0.toString() + '.' + valorvrincrem.substring(12, 14);
        vlrporcinv = $_TABLA_103[i].PORCINV_VTA;
        vlrporcinv = vlrporcinv.substring(0, 3) + '.' + vlrporcinv.substring(3, 5);
        var comparar = $_CLASC_103[i].TB_DESCRIP.trim();
        var comparar2 = $_TABLA_103[i].TB_DESCRIP.trim();
        if (comparar.length > 1) {
            cont++;
            $('#TABLAVTAARTW_103 tbody').append(
                '<tr>' +
                '<td>' + cont.toString().padStart(2, '0') + '</td>' +
                '<td>' + $_CLASC_103[i].TB_DESCRIP + '</td>' +
                '<td>' + valorporcinccompr + '</td>' +
                '<td>' + valorvrrenta + '</td>' +
                '<td>' + valorvrincrem + '</td>' +
                '<td>' + vlrporcinv + '</td>' +
                '<td>' + $_VALORFINALTABLA[i].VALOR + '</td>' +
                "</tr>"
            );
        }
        else if (comparar2.length > 1) {
            cont++;
            $('#TABLAVTAARTW_103 tbody').append(
                '<tr>' +
                '<td>' + cont.toString().padStart(2, '0') + '</td>' +
                '<td>' + $_TABLA_103[i].TB_DESCRIP + '</td>' +
                '<td>' + valorporcinccompr + '</td>' +
                '<td>' + valorvrrenta + '</td>' +
                '<td>' + valorvrincrem + '</td>' +
                '<td>' + vlrporcinv + '</td>' +
                '<td>' + $_VALORFINALTABLA[i].VALOR + '</td>' +
                "</tr>"
            );
        }
        else {
            cont++
        }
    }

    for (var i = 0; i < $_PRODUCCION_103.length; i++) {
        almacentabla = $_PRODUCCION_103[i].ALMACEN;
        codigotabla = $_PRODUCCION_103[i].CODIGO;
        cantidadtabla = $_PRODUCCION_103[i].CANTIDAD;
        cantidadtabla = cantidadtabla.substring(0, 3) + '.' + cantidadtabla.substring(3, 7);
        var comparar4 = $_PRODUCCION_103[i].ALMACEN.trim();
        if (comparar4.length > 1) {
            $('#tablaalmacen_103 tbody').append(''
                + '<tr>'
                + '<td>' + almacentabla + '</td>'
                + '<td>' + codigotabla + '</td>'
                + '<td>' + cantidadtabla + '</td>'
                + "</tr>"
            );
        }

    }

    for (var i = 0; i < $_MACROINVENT_103.length; i++) {

        cod_artic = $_MACROINVENT_103[i].COD_ART;
        descrip_artic = $_MACROINVENT_103[i].DESCRIP_ART;
        almacen_artic = $_MACROINVENT_103[i].ALM_MACRO;
        cantidad_artic = $_MACROINVENT_103[i].CANT_MACRO;
        var sumar = $_MACROINVENT_103[i].COD_ART.trim();
        if (sumar.length > 1) {
            cont++;
            $('#tablamacros_103 tbody').append(''
                + '<tr>'
                + '<td>' + cont.toString().padStart(2, '0') + '</td>'
                + '<td>' + cod_artic + '</td>'
                + '<td>' + descrip_artic + '</td>'
                + '<td>' + almacen_artic + '</td>'
                + '<td>' + cantidad_artic + '</td>'
                + "</tr>"
            );
        }

    }



    if ($_NOVEDAD == '8') {
        _evaluardescripcion();
    } else {
        CON851P('54', _devolverprimerpag_103, _grabarsalud_INV103)
    }
}


////////// CAMPOS DEL MENU SALUD ////////////////////////////

// function _evaluarpresentacionsalud() {
//     $('#tab4').click();
//     validarInputs({
//         form: '#PRESENTACION_103',
//         orden: "1"
//     },
//         function () { _devolverprimerpag_103(); },
//         _presentacionsalud
//     )
// }

function _evaluarpresentacionsalud() {
    $('#tab4').click();
    var presentacion = [
        { "COD": "1", "DESCRIP": "CAPSULA" },
        { "COD": "2", "DESCRIP": "TABLETAS" },
        { "COD": "3", "DESCRIP": "PILDORAS" },
        { "COD": "4", "DESCRIP": "GRAGEAS" },
        { "COD": "5", "DESCRIP": "POLVO" },
        { "COD": "6", "DESCRIP": "SUPOSITORIOS" },
        { "COD": "7", "DESCRIP": "OVULOS" },
        { "COD": "8", "DESCRIP": "POMADAS" },
        { "COD": "9", "DESCRIP": "CREMAS" },
        { "COD": "A", "DESCRIP": "SOLUCIONES" },
        { "COD": "B", "DESCRIP": "JARABE" },
        { "COD": "C", "DESCRIP": "COLIRIOS" },
        { "COD": "D", "DESCRIP": "LOCIONES" },
        { "COD": "E", "DESCRIP": "LINIMENTOS" },
        { "COD": "F", "DESCRIP": "ELIXIR" },
        { "COD": "G", "DESCRIP": "ENEMAS" },
        { "COD": "H", "DESCRIP": "INHALADOR" },
        { "COD": "I", "DESCRIP": "AEROSOL" },
        { "COD": "J", "DESCRIP": "UNIDAD" },
        { "COD": "Z", "DESCRIP": "NO APLICA" }
    ]
    POPUP({
        array: presentacion,
        titulo: 'TIPO DE PRESENTACIÓN',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_PRESENTACIONARTW,
        callback_f: _devolverprimerpag_103
    },
        _seleccionarpresent103);
}

function _seleccionarpresent103(presentacion) {
    $_PRESENTACIONARTW = presentacion.COD;
    switch (presentacion.COD) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "A":
        case "B":
        case "C":
        case "D":
        case "E":
        case "F":
        case "G":
        case "H":
        case "I":
        case "J":
        case "Z":
            setTimeout(_evaluarunidadmedsalud, 300);
            // _evaluarunidadmedsalud();
            break;
        default:
            _devolverprimerpag_103();
            break;
    }
    $("#presentacion_103").val(presentacion.COD + " - " + presentacion.DESCRIP);
}


function _evaluarunidadmedsalud() {
    var unidadmed = [
        { "COD": "1", "DESCRIP": "UNIDAD" },
        { "COD": "2", "DESCRIP": "KILOGRAMOS" },
        { "COD": "3", "DESCRIP": "GRAMOS" },
        { "COD": "4", "DESCRIP": "MILIGRAMOS" },
        { "COD": "5", "DESCRIP": "MICROGRAMOS" },
        { "COD": "6", "DESCRIP": "LITROS" },
        { "COD": "7", "DESCRIP": "MILILITROS" },
        { "COD": "8", "DESCRIP": "CENTIMETROS" },
        { "COD": "9", "DESCRIP": "CENTIMETROS CUBICOS" },
        { "COD": "A", "DESCRIP": "MILIEQUIVALENTES" },
        { "COD": "Z", "DESCRIP": "NO APLICA" }
    ]
    POPUP({
        array: unidadmed,
        titulo: 'UNIDAD DE MEDIDA',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_UNIDADARTW,
        callback_f: () => {
            setTimeout(_evaluarpresentacionsalud, 300);
        }
    },
        _seleccionarunidad103);
}

function _seleccionarunidad103(unidadmed) {
    $_UNIDADARTW = unidadmed.COD;
    switch (unidadmed.COD) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "A":
        case "Z":
            if ($_LLAVEGRUPOARTW == '0MQ') {
                $_ATCARTW = '';
                $_CONCENTRADOARTW = '';
                _evaluarsismedsalud();
            } else {
                _evaluaratc_INV103();
            }
            break;
        default:
            _devolverprimerpag_103();
            break;
    }
    $("#unidadme_103").val(unidadmed.COD + " - " + unidadmed.DESCRIP);

}

function _evaluaratc_INV103() {
    validarInputs({
        form: '#ATC_103',
        orden: "1"
    },
        function () { _evaluarunidadmedsalud(); },
        _validaratc_INV103
    )
}
function _validaratc_INV103() {
    $_ATCARTW = $("#atc_103").val();
    if (($_GRUPOARTW == 'PO') || ($_GRUPOARTW == 'NP')) {
        if ($_ATCARTW.trim() == '') {
            CON851('79', '79', null, 'error', 'error');
            _evaluaratc_INV103();
        } else {
            LLAMADO_DLL({
                dato: [$_ATCARTW],
                callback: _dataATC_INV103,
                nombredll: 'SER857_01',
                carpeta: 'SALUD'
            });
        }
    } else {
        _evaluarsismedsalud();
    }
}
function _dataATC_INV103(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_CONCENTRADOARTW = date[2];
    if (swinvalid == "00") {
        $("#concentrado_103").val($_CONCENTRADOARTW);
        _evaluarsismedsalud();
    }
    else if (swinvalid == "01") {
        CON851('79', '79', null, 'error', 'error');
        _evaluaratc_INV103();
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

function _evaluarsismedsalud() {
    if ($_EXSISMEDARTW.trim() == '')$_EXSISMEDARTW = 'N'; $('#excluir_103').val($_EXSISMEDARTW);
    validarInputs({
        form: '#EXCLUIR_103',
        orden: "1"
    },
        function () { _evaluaratc_INV103(); },
        ()=>{
            $_EXSISMEDARTW = $("#excluir_103").val();
            if (($_EXSISMEDARTW == 'S') || ($_EXSISMEDARTW == 'N')) {
                _evaluarreguladosalud();
            }else {
                _evaluarsismedsalud();
            }
        }
    )
}

function _evaluarreguladosalud() {
    if ($_MEDREGULADOARTW.trim() == '') $_MEDREGULADOARTW = 'N'; $('#regulado_103').val($_MEDREGULADOARTW);
    validarInputs({
        form: '#REGULADO_103',
        orden: "1"
    }, _evaluarsismedsalud,
        () => {
            $_MEDREGULADOARTW = $("#regulado_103").val();
            if (($_MEDREGULADOARTW == 'S') || ($_MEDREGULADOARTW == 'N')) {
                _evaluarsisdissalud();
            }
            else {
                _evaluarreguladosalud();
            }
        }
    )
}

function _evaluarsisdissalud() {
    if ($_SISDISARTW.trim() == '') $_SISDISARTW = 'N'; $('#sisdis_103').val($_SISDISARTW);
    validarInputs({
        form: '#SISDIS_103',
        orden: "1"
    },
        _evaluarreguladosalud,
        () => {
            $_SISDISARTW = $("#sisdis_103").val();
            if ($_SISDISARTW == 'S' || $_SISDISARTW == 'N') {
                if ($_LLAVEGRUPOARTW == '0MQ') {
                    _ubicargrabar()
                } else {
                    $_CLASERIESGOARTW = '';
                    _evaluarhomologosalud();
                }
            }
            else {
                _evaluarsisdissalud();
            }
        }
    )
}

function _mostrarclaseriesgo() {
    var riesgos = [
        { "COD": "1 ", "DESCRIP": "CL 1 RIESGO BAJO" },
        { "COD": "2A", "DESCRIP": "CL 2A RIESGO MODERADO" },
        { "COD": "2B", "DESCRIP": "CL 2B RIESGO ALTO" },
        { "COD": "3 ", "DESCRIP": "CL 3 RIESGO MUY ALTO" }
    ]
    POPUP({
        array: riesgos,
        titulo: 'CLASE DE RIESGO',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_CLASERIESGOARTW,
        callback_f: _evaluarsisdissalud
    },
        _seleccionarriesgo103);
}

function _seleccionarriesgo103(riesgos) {
    $_CLASERIESGOARTW = riesgos.COD;
    switch (riesgos.COD) {
        case "1":
        case "2":
        case "3":
        case "4":
            if (($_LLAVEGRUPOARTW == '0PO') || ($_LLAVEGRUPOARTW == '0NP')) {
                _evaluarhomologosalud();
            } else {
                _ubicargrabar();
            }
            break;
        default:
            _evaluarsisdissalud();
            break;
    }
    $("#riesgo_103").val(riesgos.COD + " - " + riesgos.DESCRIP);
}


function _evaluarhomologosalud() {
    $('#tab4').click();
    validarInputs({
        form: '#HOMOLOGO_103',
        orden: "1"
    }, _evaluarreguladosalud, 
        () => {
            if (($_LLAVEGRUPOARTW == '0PO') || ($_LLAVEGRUPOARTW == '0NP') || ($_LLAVEGRUPOARTW == '0MQ')) {
                $_HOMOLOGOARTW = $("#homologo_103").val();
                if ($_HOMOLOGOARTW.trim() == '') {
                    $_HOMOLOGOARTW = 'N';
                    $('#homologo_103').val($_HOMOLOGOARTW);
                    _ubicargrabar()
                } else if (($_HOMOLOGOARTW == 'S') || ($_HOMOLOGOARTW == 'N')) {
                    if ($_HOMOLOGOARTW == 'N') {
                        _ubicargrabar()
                    } else {
                        _evaluarcodhomologosalud();
                    }

                } else {
                    _evaluarhomologosalud();
                }

            } else {
                _ubicargrabar()
            }
        }
    )
}


function _evaluarcodhomologosalud() {
    validarInputs({
        form: '#CODHOMOLOGO_103',
        orden: "1"
    },_evaluarhomologosalud,
        () => {
            $_HOMOLOGOCODARTW = $("#codhomologo_103").val();
            $_HOMOLOGOGRUPOARTW = $_HOMOLOGOCODARTW.substring(0, 3);
            $_HOMOLOGONUMEROARTW = $_HOMOLOGOCODARTW.substring(3, 16);
            $_HOMOLOGOCLASEARTW = $_HOMOLOGOCODARTW.substring(16, 18);
            if (($_HOMOLOGOGRUPOARTW = '0NP') || ($_HOMOLOGOGRUPOARTW = '0PO')) {
                LLAMADO_DLL({
                    dato: [$_HOMOLOGOCODARTW],
                    callback: _dataINV103_18,
                    nombredll: 'INV103_18',
                    carpeta: 'INVENT'
                });
            } else {
                CON851('03', '03', null, 'error', 'error');
                _evaluarcodhomologosalud();
            }
        }
    )
}

function _dataINV103_18(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPARTHOMO = date[1].trim();
    if (swinvalid == "00") {
        $("#codhomologod_103").val($_DESCRIPARTHOMO);
        _cantconverssalud();
    }else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarcodhomologosalud();
    }else {
        CON852(date[0], date[1], date[3], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _cantconverssalud() {
    loader('hide');
    var cantconver = [
        { "COD": "1", "DESCRIP": "UNITARIO" },
        { "COD": "2", "DESCRIP": "DUPLICADO" },
        { "COD": "3", "DESCRIP": "TRIPLICADO" }
    ]
    POPUP({
        array: cantconver,
        titulo: 'DATO CONVERSION',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_CONVHOMOLOARTW,
        callback_f: () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        }
    },
        _seleccionarconversion);
}

function _seleccionarconversion(cantconver) {
    $_CONVHOMOLOARTW = cantconver.COD;
    switch (cantconver.COD) {
        case "1":
        case "2":
        case "3":
            _ubicargrabar()
            break;
        default:
            _evaluarconversionsalud();
            break;
    }
    $("#convers_103").val(cantconver.COD + " - " + cantconver.DESCRIP);
}

///////////////////////////////// F8 ///////////////////////////////////////////

function _ventanagrupo(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE GRUPO',
            columnas: ["TIPO", "GRUPO", "DESCRIP"],
            data: INV103.FILTROGRUPO,
            callback_esc: function () {
                $("#grupo_103").focus();
            },
            callback: function (data) {
                $_TIPOARTW = data.TIPO;
                // $('#tipo_103').val($_TIPOARTW)
                $('#grupo_103').val(data.GRUPO.trim());
                $('#grupod_103').val(data.DESCRIP.trim());
                _enterInput('#grupo_103');
            }
        });
    }

}

function _ventanaarticulos(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'BUSQUEDA DE ARTICULOS',
            columnas: ["LLAVE_ART", "DESCRIP_ART"],
            data: INV103.FILTROARTICULO,
            callback_esc: function () {
                $('#codigo_103').focus();
            },
            callback: function (data) {
                $_LLAVENROART = data.LLAVE_ART.trim();
                $_TIPOARTW = $_LLAVENROART.substring(0, 1);
                $_GRUPOARTW = $_LLAVENROART.substring(1, 3);
                $_NUMEROARTW = $_LLAVENROART.substring(3, 16);
                // $('#tipo_103').val($_TIPOARTW);
                // $('#grupo_103').val($_GRUPOARTW);
                $('#codigo_103').val($_NUMEROARTW);
                _enterInput('#codigo_103');
            }
        });
        // _ventanaDatos_lite_v2({
        //     titulo: 'BUSQUEDA DE ARTICULOS',
        //     data: INV103.FILTROARTICULO,
        //     indice: ['LLAVE_ART', 'DESCRIP_ART'],
        //     mascara: [
        //         {
        //             'LLAVE_ART': 'Codigo',
        //             'DESCRIP_ART': 'Descripcion'
        //         }],
        //     minLength: 3,
        //     callback_esc: function () {
        //         $('#codigo_103').focus();
        //     },
        //     callback: function (data) {
        //         $_LLAVENROART = data.LLAVE_ART.trim();
        //         $_TIPOARTW = $_LLAVENROART.substring(0, 1);
        //         $_GRUPOARTW = $_LLAVENROART.substring(1, 3);
        //         $_NUMEROARTW = $_LLAVENROART.substring(3, 16);
        //         $('#tipo_103').val($_TIPOARTW);
        //         $('#grupo_103').val($_GRUPOARTW);
        //         $('#codigo_103').val($_NUMEROARTW);
        //         _enterInput('#codigo_103');
        //     }
        // });
    }

}

function _ventanaclase(e) {
    TIPOUSO = "1";
    filtroclase = INV103.USO.filter(clase => (clase.TIPO == TIPOUSO))
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE CLASE',
            columnas: ["COD", "DESCRIP"],
            data: filtroclase,
            callback_esc: function () {
                $("#clase_103").focus();
            },
            callback: function (data) {
                document.getElementById('clase_103').value = data.COD.trim();
                document.getElementById('clased_103').value = data.DESCRIP;

                _enterInput('#clase_103');
            }
        });
    }
}


function _ventanauso(e) {
    TIPOUSOD = "2";
    filtrouso = INV103.USO.filter(clase => (clase.TIPO == TIPOUSOD))
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE USO',
            columnas: ["COD", "DESCRIP"],
            data: filtrouso,
            callback_esc: function () {
                $("#uso_103").focus();
            },
            callback: function (data) {
                document.getElementById('uso_103').value = data.COD.trim();
                document.getElementById('usod_103').value = data.DESCRIP;
                _enterInput('#uso_103');
            }
        });
    }
}


function _ventanaproveedores(e) {
    var $_TERCEROS_110c = [];
    let URL = get_url("APP/" + "CONTAB/CON802" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_TERCEROS_110c = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos_lite_v2({
                    titulo: 'VENTANA DE TERCEROS',
                    data: $_TERCEROS_110c.TERCEROS,
                    indice: ["COD", "NOMBRE", "DIRREC", "TELEF", "CIUDAD", "FACTOR", "ACT"],
                    mascara: [{
                        "COD": 'Identificacion',
                        "NOMBRE": 'Nombre',
                        "DIRREC": "direccion",
                        "TELEF": "telefono"
                    }],
                    minLength: 3,
                    callback_esc: function () {
                        $("#proveedor_103").focus();
                    },
                    callback: function (data) {
                        $_NITARTW = data.COD.trim();
                        $_NITARTW = $_NITARTW.padStart(10, "0");
                        $('#proveedor_103').val($_NITARTW);
                        _enterInput('#proveedor_103');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanapoliticas(e) {
    let URL = get_url("APP/" + "INVENT/INV807" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_POLIT_103 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: 'VENTANA DE POLITICAS',
                    columnas: ["COD", "DESCRIP"],
                    data: $_POLIT_103.POLIT,
                    callback_esc: function () {
                        $("#politica_103").focus();
                    },
                    callback: function (data) {
                        $('#politica_103').val(data.COD);
                        $('#politicad_103').val(data.DESCRIP.trim());
                        _enterInput('#politica_103');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanacosto(e) {
    var $_COSTOS_INV103 = [];
    let URL = get_url("APP/" + "CONTAB/CON803-01" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_COSTOS_INV103 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
                    columnas: ["COD", "NOMBRE"],
                    data: $_COSTOS_INV103.COSTO,
                    callback_esc: function () {
                        $("#ccostos_103").focus();
                    },
                    callback: function (data) {
                        document.getElementById('ccostos_103').value = data.COD.trim()
                        _enterInput('#ccostos_103');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanacontable(e) {
    TIPO = "4";
    var filtrocuenta = INV103.CTAMAYOR.filter(clase => (clase.TIPO_MAE == TIPO))
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA COD CONTABLE',
            columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "TIPO_MAE", "NOMBRE_MAE"],
            data: filtrocuenta,
            callback_esc: function () {
                $("#contable_103").focus();
            },
            callback: function (data) {
                $_CTAARTW = data.CTA_MAY.trim() + data.SUB_CTA.trim() + data.AUX_MAE.trim();
                $('#contable_103').val($_CTAARTW)
                _enterInput('#contable_103');
            }
        });
    }
}

function _ventanaalmacenes(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE ALMACENES',
            columnas: ["CODIGO", "DESCRIPCION", "RESPONSABLE"],
            data: INV103.ALMACEN,
            callback_esc: function () {
                $("#almacen_103").focus();
            },
            callback: function (data) {
                $('#almacen_103').val(data.CODIGO);
                _enterInput('#almacen_103');
            }
        });
    }
}

function _ventanasegundaarticulos(e) {

    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite_v2({
            titulo: 'BUSQUEDA DE ARTICULOS',
            data: INV103.ARTICULOS,
            indice: ['LLAVE_ART', 'DESCRIP_ART'],
            mascara: [
                {
                    'LLAVE_ART': 'Codigo',
                    'DESCRIP_ART': 'Descripcion'
                }],
            minLength: 3,
            callback_esc: function () {
                $('#codigoart_103').focus();
            },
            callback: function (data) {
                $_LLAVENROART = data.LLAVE_ART.trim();
                $_TIPOARTW = $_LLAVENROART.substring(0, 1);
                $_GRUPOARTW = $_LLAVENROART.substring(1, 3);
                $_NUMEROARTW = $_LLAVENROART.substring(3, 16);

                $('#codigoart_103').val($_LLAVENROART);
                _enterInput('#codigoart_103');
            }
        });
    }
}

function _ventanapresentacion(e) {
    TIPOPRESENT = "1";
    filtropresentacion = $_PREMED_103.filter(presenta => (presenta.TIPO == TIPOPRESENT))

    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE PRESENTACION',
            columnas: ["COD", "DESCRIP"],
            data: filtropresentacion,
            callback_esc: function () {
                $("#presentacion_103").focus();
            },
            callback: function (data) {
                $('#presentacion_103').val(data.COD);
                $('#presentaciond_103').val(data.DESCRIP.trim());
                _enterInput('#presentacion_103');
            }
        });
    }
}
function _ventanaunidadmedida(e) {
    TIPOMEDIDA = "2";
    filtromedida = $_PREMED_103.filter(medida => (medida.TIPO == TIPOMEDIDA))
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE UNIDAD MEDIDA',
            columnas: ["COD", "DESCRIP"],
            data: filtromedida,
            callback_esc: function () {
                $("#unidadme_103").focus();
            },
            callback: function (data) {
                $('#unidadme_103').val(data.COD);
                $('#unidadmed_103').val(data.DESCRIP.trim());
                _enterInput('#unidadme_103');
            }
        });
    }
}

function _ventanacodhomologo(e) {

    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite_v2({
            titulo: 'BUSQUEDA DE ARTICULOS',
            data: INV103.ARTICULOS,
            indice: ['LLAVE_ART', 'DESCRIP_ART'],
            mascara: [
                {
                    'LLAVE_ART': 'Codigo',
                    'DESCRIP_ART': 'Descripcion'
                }],
            minLength: 3,
            callback_esc: function () {
                $('#codigoart_103').focus();
            },
            callback: function (data) {
                $_LLAVENROART = data.LLAVE_ART.trim();
                $_TIPOARTW = $_LLAVENROART.substring(0, 1);
                $_GRUPOARTW = $_LLAVENROART.substring(1, 3);
                $_NUMEROARTW = $_LLAVENROART.substring(3, 16);
                $('#codhomologo_103').val($_LLAVENROART);
                _enterInput('#codhomologo_103');
            }
        });
    }
}


function _ventanamedatc(e) {
    var $_ATC_INV103;
    let URL = get_url("APP/" + "SALUD/SER857" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_ATC_INV103 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos_lite_v2({
                    titulo: 'BUSQUEDA DE CODIGOS ATC MEDICAMENTOS',
                    data: $_ATC_INV103.MEDATC,
                    indice: ['COD', 'DESCRIP', 'CONCENTRADO'],
                    mascara: [
                        {
                        }],
                    minLength: 3,
                    callback_esc: function () {
                        $('#atc_103').focus();
                    },
                    callback: function (data) {
                        $('#atc_103').val(data.COD);
                        _enterInput('#atc_103');

                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

//////////////////MASCARAS DE FECHA/////////////////////////
var momentFormat = 'YYYY/MM/DD HH:mm';
var momentMaskFecha = IMask($("#fecha_103")[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(2009, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {

        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },
    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 2009,
            to: 2030
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }
});

var momentMaskFechacompra = IMask($("#fechacompra_103")[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(2009, 0, 1),
    max: new Date(2080, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 2009,
            to: 2080
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }

});