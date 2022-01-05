/// 12-12-2019 - DIANA E. = creadoo

var SAL713 = [];

var vlrmonto_713Mask = new IMask(document.getElementById('monto_713'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);

$(document).ready(function () {
    nombreOpcion('9,7,1,3- Actualizacion del Maestro Tabla de Tarifas');
    loader('show')
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
        { input: 'codtar', app: '713', funct: _ventanaNomtarif },
        { input: 'grupo', app: '713', funct: _ventanaGruposer },
        { input: 'cups', app: '713', funct: _ventanaTablatarif },
        { input: 'divis', app: '713', funct: _ventanaDivis },
        { input: 'contab', app: '713', funct: _ventanaContab }

    ]);
    obtenerDatosCompletos({
        nombreFd: 'GRUPO-SER'
    }, function (data) {
        $_GRUPOSER_703 = data.CODIGOS;
        $_GRUPOSER_703.pop()
        loader('hide');
        CON850(_evaluarCON850);
        obtenerDatosCompletos({
            nombreFd: 'CTA-MAYOR'
        }, function (data) {
            $_CTAMAYOR_703 = data.MAESTROS;
            $_CTAMAYOR_703.pop()
        })
    })
});


/////////EMPIEZA OPCION DE MAESTRO DE TABLA DE TARIFAS/////// 
function _evaluarCON850(novedad) {

    SAL713.$_NovedSal713 = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarDato713();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#noved713').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarDato713() {
    validarInputs(
        {
            form: "#dato",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        _validacionestarifa_713
    )
}
function _validacionestarifa_713() {
    SAL713.$codigo713 = $('#codtar_713').val();
    if (SAL713.$codigo713.trim() == '') {
        CON851('01', '01', null, 'error', 'error');
        _validarDato713()
    } else {
        LLAMADO_DLL({
            dato: [SAL713.$codigo713],
            callback: _dataCONSULTANOMTAR_713,
            nombredll: 'SER105_01',
            carpeta: 'SALUD'
        });
    }
}

function _dataCONSULTANOMTAR_713(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    SAL713.$_DESCRIPNOMTAR_713 = date[1].trim();
    if (swinvalid == "00") {
        $('#descptar_713').val(SAL713.$_DESCRIPNOMTAR_713);
        tipoSer_713();

    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _validarDato713();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function tipoSer_713() {
    if ($_NITUSU == '0800156469') {
        var tiposer = '[{"COD": "0","DESCRIP": "Drogueria"},{"COD": "1", "DESCRIP": "Cirugias"},{"COD": "2","DESCRIP": "Ecografias."},{"COD": "3","DESCRIP": "RX - Imagenol"},{ "COD": "4", "DESCRIP": "Doppler" },{ "COD": "5", "DESCRIP": "T.A.C" },{ "COD": "6", "DESCRIP": "Resonancia Nuclear" },{ "COD": "7", "DESCRIP": "Promoc y Preven" }]'
        var datoSerTarif = JSON.parse(tiposer);
    } else {
        var tiposer = '[{"COD": "0","DESCRIP": "Drogueria"},{"COD": "1", "DESCRIP": "Cirugias"},{"COD": "2","DESCRIP": "Laboratorio y Otros diag."},{"COD": "3","DESCRIP": "RX - Imagenol"},{ "COD": "4", "DESCRIP": "Otros Servic" },{ "COD": "5", "DESCRIP": "Consulta y Terap" },{ "COD": "6", "DESCRIP": "Patologia" },{ "COD": "7", "DESCRIP": "Promoc y Preven" }]'
        var datoSerTarif = JSON.parse(tiposer);
    }
    POPUP({
        array: datoSerTarif,
        titulo: 'Tipo de Servicio?',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: SAL713.$_tiposer713,
        callback_f: _validarDato713,
        teclaAlterna: true

    }, _evaluartiposerv_713);
}

function _evaluartiposerv_713(datoSerTarif) {
    SAL713.$_tiposer713 = datoSerTarif.COD;
    switch (datoSerTarif.COD) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
            $('#tiposer_713').val(datoSerTarif.COD)
            $('#descpser_713').val(datoSerTarif.DESCRIP)
            grupoTar713();
            break;
        default:
            _validarDato713();
            break;
    }
}

function grupoTar713() {

    validarInputs(
        {
            form: "#grupo",
            orden: '1'
        },
        function () { tipoSer_713(); },
        validacionesgrupo_713
    )
}

function validacionesgrupo_713() {
    SAL713.$grupo713 = $('#grupo_713').val();
    if (SAL713.$grupo713.trim() == '') {
        CON851('02', '02', null, 'error', 'error');
        grupoTar713();
    } else {
        LLAMADO_DLL({
            dato: [SAL713.$grupo713],
            callback: _dataCONSULTAGRUPO_713,
            nombredll: 'SER102-04',
            carpeta: 'SALUD'
        });

    }
}
function _dataCONSULTAGRUPO_713(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    SAL713.$_DESCRIPGRUPOTAR_713 = date[1];
    if (swinvalid == "00") {
        $('#descrgrp_103').val(SAL713.$_DESCRIPGRUPOTAR_713);
        // $_filtrocups_SER102 = $_TABLA_703.filter(clase => (clase.COD == SAL713.$codigo713) && (clase.TIPO == SAL713.$_tiposer713) && (clase.GR_SER == SAL713.$grupo713))
        _validarCodig();
    } else if (swinvalid == "01") {
        if (SAL713.$grupo713 == 'XX') {
            SAL713.$_DESCRIPGRUPOTAR_713 = 'CODIGOS FUERA DE CUPS';
            $('#descrgrp_103').val(SAL713.$_DESCRIPGRUPOTAR_713);
            $_filtrocups_SER102 = $_TABLA_703.filter(clase => (clase.COD == SAL713.$codigo713) && (clase.TIPO == SAL713.$_tiposer713) && (clase.GR_SER == SAL713.$grupo713))
            _validarCodig();
        } else {
            CON851('01', '01', null, 'error', 'error');
            grupoTar713();
        }
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _validarCodig() {
    validarInputs(
        {
            form: "#codcups",
            orden: '1'
        },
        function () { grupoTar713(); },
        _validacionescodtabla_713
    )
}
function _validacionescodtabla_713() {
    SAL713.$codigocups713 = $('#cups_713').val();

    if (SAL713.$codigocups713.trim() == '') {
        CON851('02', '02', null, 'error', 'error');
        _validarCodig();
    } else {
        SAL713.$codserr713 = SAL713.$grupo713 + SAL713.$codigocups713;
        postData({
            datosh: datosEnvio() + SAL713.$codserr713.padEnd(15, ' ') + '|'
        }, get_url("APP/SALUD/SER102C-01.DLL"))
            .then((data) => {
                SAL713.CUPS = data.CUPS[0];
                $('#descrpcups_103').val(SAL713.CUPS.DESCRIP.trim())
                SAL713.$tipocup = SAL713.CUPS.TIPO_CUPS.substring(0, 1);
                if ((SAL713.$tipocup != SAL713.$_tiposer713) && (SAL713.$_tiposer713 != '7')) {
                    jAlert({ titulo: 'Error ', mensaje: 'Atencion! el tipo dado para este proceso, no corresponde con el tipo de los cups' }, _validarCodig);
                } else {
                    consultatabla_713();
                }
            })
            .catch((error) => {
                console.log(error);
                jAlert({ titulo: 'Error ', mensaje: 'Atencion! Este proceso No esta codificado en los cups, Puede actualizar los cups por la opc 7.1.8' }, _validarCodig);
            });
        // let res = $_CUPS_703.find(e => e.LLAVE.trim() == SAL713.$codserr713.trim());
        // console.log(res);
        // if (res == undefined) {
        //     jAlert({ titulo: 'Error ', mensaje: 'Atencion! Este proceso No esta codificado en los cups, Puede actualizar los cups por la opc 7.1.8' }, _validarCodig);
        // } else {
        //     $('#descrpcups_103').val(res.DESCRIP.trim());
        //     SAL713.$tipocup = res.TIPO.trim()
        //     if ((SAL713.$tipocup != SAL713.$_tiposer713) && (SAL713.$_tiposer713 != '7')) {
        //         jAlert({ titulo: 'Error ', mensaje: 'Atencion! el tipo dado para este proceso, no corresponde con el tipo de los cups' }, _validarCodig);
        //     } else {
        //         consultatabla_713();
        //     }
        // }
    }
}


function consultatabla_713() {
    SAL713.$llavetab713 = SAL713.$codigo713 + SAL713.$_tiposer713 + SAL713.$grupo713 + SAL713.$codigocups713;
    LLAMADO_DLL({
        dato: [SAL713.$llavetab713],
        callback: _datavalidartabla_713,
        nombredll: 'SER102-01',
        carpeta: 'SALUD'
    });
}
function _datavalidartabla_713(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if ((SAL713.$_NovedSal713 == '7') && (swinvalid == '01')) {
        _descriptabla()
    }
    else if ((SAL713.$_NovedSal713 == '7') && (swinvalid == '00')) {
        CON851('00', '00', null, 'error', 'Error');
        CON850(_evaluarCON850);
    }
    else if ((SAL713.$_NovedSal713 == '8') && (swinvalid == '00')) {
        _llenarCampos713();
    }
    else if ((SAL713.$_NovedSal713 == '8') && (swinvalid == '01')) {
        CON851('01', '01', null, 'error', 'Error');
        CON850(_evaluarCON850);
    }
    else if ((SAL713.$_NovedSal713 == '9') && (swinvalid == '00')) {
        _llenarCampos713();
    }
    else if ((SAL713.$_NovedSal713 == '9') && (swinvalid == '01')) {
        CON851('01', '01', null, 'error', 'Error');
        CON850(_evaluarCON850);
    }
}

function _descriptabla() {
    validarInputs(
        {
            form: "#DESCRIPCUPS_713",
            orden: '1'
        },
        function () { _validarCodig() },
        () => {
            SAL713.$descripcups713 = $('#descrpcups_103').val();
            if (SAL713.$descripcups713.trim() == '') {
                CON851('02', '02', null, 'error', 'error');
                _descriptabla()
            } else {
                // setTimeout(_validarformliqui_713, 300);
                _validarformliqui_713();
            }
        }
    )
}

function _validarformliqui_713() {
    var liquidar = [
        { "COD": "1", "DESCRIP": "Puntos" },
        { "COD": "2", "DESCRIP": "Grupos" },
        { "COD": "3", "DESCRIP": "Valor fijo" },
        { "COD": "4", "DESCRIP": "Salario min." },
        { "COD": "5", "DESCRIP": "% 1er valor" }
    ]
    POPUP({
        array: liquidar,
        titulo: 'FORMA DE LIQUIDAR',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: SAL713.$liquidar713,
        callback_f: _descriptabla
    },
        _evaluarliquidacion);
}

function _evaluarliquidacion(liquidar) {
    SAL713.$liquidar713 = liquidar.COD;
    switch (liquidar.COD) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
            setTimeout(_evaluarmonto_713, 300);
            // _evaluarmonto_713();
            break;
        default:
            _descriptabla();
            break;
    }
    $("#liquidar_713").val(liquidar.COD + " - " + liquidar.DESCRIP);
}

function _evaluarmonto_713() {
    validarInputs(
        {
            form: "#monto",
            orden: '1'
        },
        function () { _validarformliqui_713() },
        () => {
            SAL713.$monto713 = vlrmonto_713Mask.value.replace(/,/g, "");

            if ((SAL713.$liquidar713 != '3') && (SAL713.$monto713 == '0')) {
                _evaluarmonto_713();
            } else if (SAL713.$liquidar713 == '4') {
                SAL713.$_valor = ($_SALMINUSU / 30) * SAL713.$monto713
                $('#valortotal_713').val(parseInt(SAL713.$_valor));
                setTimeout(_validacionesincre_713, 300);
                // _validacionesincre_713();
            } else {
                setTimeout(_validacionesincre_713, 300)
                // _validacionesincre_713();
            }
        }
    )
}

function _validacionesincre_713() {
    var incre = '[{"COD": "1", "DESCRIP": " % Cirugias"},{"COD": "2","DESCRIP": " % Laboratorios"},{"COD": "3","DESCRIP": " % Imagenologia"},{ "COD": "4", "DESCRIP": " % Otros Servic" },{ "COD": "5", "DESCRIP": " % Consultas" },{ "COD": "6", "DESCRIP": " % Internacion" },{ "COD": "9", "DESCRIP": "No incrementar" }]'
    var incremento = JSON.parse(incre);
    POPUP({
        array: incremento,
        titulo: 'Incrementar Tarifa',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: SAL713.$increm713,
        callback_f: _evaluarmonto_713,
        teclaAlterna: true

    }, function (incremento) {
        SAL713.$increm713 = incremento.COD;
        switch (incremento.COD) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '9':
                $('#incrementar_713').val(incremento.COD + '-' + incremento.DESCRIP)
                if (SAL713.$_tiposer713 == '1') {
                    SAL713.$paqint713 = '';
                    _evaluarcodint_713();
                } else {
                    SAL713.$paqint713 = '';
                    $('#integ_713').val(SAL713.$paqint713);
                    _evaluarinsumos_713();
                }
                break;
            default:
                _evaluarmonto_713()
                break;
        }
    })
}
function _evaluarcodint_713() {
    validarInputs(
        {
            form: "#paquete",
            orden: '1'
        },
        function () { _validacionesincre_713() },
        _evaluarinsumos_713
    )
}

function _evaluarinsumos_713() {
    SAL713.$paqint713 = $('#integ_713').val();
    validarInputs(
        {
            form: "#insumo",
            orden: '1'
        },
        function () {
            if (SAL713.$_tiposer713 == '1') {
                _evaluarcodint_713();
            } else {
                _validacionesincre_713();
            }
        },
        _validacioninsumos
    )
}

function _validacioninsumos() {
    SAL713.$insumos_713 = $('#insumos_713').val();
    if ((SAL713.$insumos_713 == 'S') || (SAL713.$insumos_713 == 'N')) {
        _evaluarcodtar_713();
    } else {
        _evaluarinsumos_713();
    }
}
function _evaluarcodtar_713() {
    validarInputs(
        {
            form: "#seguntari",
            orden: '1'
        },
        function () { _evaluarinsumos_713() },
        _validaciontarifa
    )
}
function _validaciontarifa() {
    SAL713.$codtari_713 = $('#codtari_713').val();
    _evaluardivision_713();
}

// function _evaluarctacontab_713(){

//     validarInputs(
//         {
//             form: "#contable",
//             orden: '1'
//         },
//         function () { _descriptabla() },
//         _validacionctacontab
//     )
// }
// function __validacionctacontab(){
//     contab_713
//     descontab_713
// }
function _evaluardivision_713() {
    validarInputs(
        {
            form: "#division",
            orden: '1'
        },
        function () { _evaluarcodtar_713() },
        _validaciondivision
    )
}
function _validaciondivision() {
    SAL713.$division_713 = $('#divis_713').val();
    if (SAL713.$division_713.trim() == '') {
        SAL713.$descrpdiv_713 = '';
        $('#descrpdiv_713').val(SAL713.$descrpdiv_713);
        _evaluarcantdias_713();
    } else {
        LLAMADO_DLL({
            dato: [SAL713.$division_713],
            callback: _dataCONSULTADIVISION_713,
            nombredll: 'SER108-11',
            carpeta: 'SALUD'
        });
    }
}
function _dataCONSULTADIVISION_713(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    SAL713.$descrpdiv_713 = date[1].trim();
    if (swinvalid == "00") {
        $('#descrpdiv_713').val(SAL713.$descrpdiv_713);
        _evaluarcantdias_713();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluardivision_713();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluarcantdias_713() {
    validarInputs(
        {
            form: "#cantidad",
            orden: '1'
        },
        function () { _evaluardivision_713() },
        _evaluardescripext
    )
}
function _evaluardescripext() {
    SAL713.$cantidaddias713 = $('#cantidaddias713').val();

    if (SAL713.$cantidaddias713.trim() == '') {
        SAL713.$cantidaddias713 = '0';
        $('#cantidaddias713').val(SAL713.$cantidaddias713);
    } else {
        $('#cantidaddias713').val(SAL713.$cantidaddias713);
    }

    validarInputs(
        {
            form: "#extensa",
            orden: '1'
        },
        function () { _evaluarcantdias_713() },
        _evaluarfinalidades713
    )
}
function _evaluarfinalidades713() {
    SAL713.$descripextensa713 = $('#descrpexten_713').val();
    if (SAL713.$_tiposer713 == '7') {
        _evaluarprimerfinalidad();
    } else {
        SAL713.$primerfinal713 = '';
        SAL713.$segundfinal713 = '';
        SAL713.$tercefinal713 = '';
        SAL713.$cuartafinal713 = '';
        enviarDatos713();
    }
}
function _evaluarprimerfinalidad() {
    validarInputs(
        {
            form: "#primerfinalidad",
            orden: '1'
        },
        function () { _evaluardescripext() },
        _validarprimerfinalidad
    )
}
function _validarprimerfinalidad() {
    SAL713.$primerfinal713 = $('#fina1_713').val();

    if (SAL713.$primerfinal713.trim() == '') {
        SAL713.$primerfinal713 = '99';
        SAL713.$descripprimerfinal = 'TODAS LAS FINALIDADES';
        $('#fina1_713').val(SAL713.$primerfinal713);
        $('#descripfina1_713').val(SAL713.$descripprimerfinal);
        enviarDatos713();
    } else {
        switch (SAL713.$primerfinal713) {
            case '01':
                $('#descripfina1_713').val("ATENCION PARTO");
                _evaluarsegunfinalidad()
                break;
            case '02':
                $('#descripfina1_713').val("ATENCION REC.NACI");
                _evaluarsegunfinalidad()
                break;
            case '03':
                $('#descripfina1_713').val("ATENC.PLANIF.FAMI");
                _evaluarsegunfinalidad()
                break;
            case '04':
                $('#descripfina1_713').val("PRIMERA INFANCIA");
                _evaluarsegunfinalidad()
                break;
            case '05':
                $('#descripfina1_713').val("ADOLESCENCIA");
                _evaluarsegunfinalidad()
                break;
            case '06':
                $('#descripfina1_713').val("DET.ALT.EMBARAZO");
                _evaluarsegunfinalidad()
                break;
            case '07':
                $('#descripfina1_713').val("ADULTEZ");
                _evaluarsegunfinalidad()
                break;
            case '08':
                $('#descripfina1_713').val("DET.ALT.AGUD.VISU");
                _evaluarsegunfinalidad()
                break;
            case '09':
                $('#descripfina1_713').val("DET.ENFERM.PROFES");
                _evaluarsegunfinalidad()
                break;
            case '10':
                $('#descripfina1_713').val("NO APLICA");
                _evaluarsegunfinalidad()
                break;
            case '11':
                $('#descripfina1_713').val("PATOLOGIA CRONICA");
                _evaluarsegunfinalidad()
                break;
            case '99':
                $('#descripfina1_713').val("TODAS LAS FINALID");
                enviarDatos713();
                break;
            default:
                _evaluarprimerfinalidad();
                break;
        }
    }
}

function _evaluarsegunfinalidad() {
    validarInputs(
        {
            form: "#segundfinalidad",
            orden: '1'
        },
        function () { _evaluarprimerfinalidad() },
        _validarsegundfinalidad
    )
}
function _validarsegundfinalidad() {
    SAL713.$segundfinal713 = $('#fina2_713').val();

    switch (SAL713.$segundfinal713) {
        case '01':
            $('#descripfina2_713').val("ATENCION PARTO");
            _evaluartercefinalidad()
            break;
        case '02':
            $('#descripfina2_713').val("ATENCION REC.NACI");
            _evaluartercefinalidad()
            break;
        case '03':
            $('#descripfina2_713').val("ATENC.PLANIF.FAMI");
            _evaluartercefinalidad()
            break;
        case '04':
            $('#descripfina2_713').val("PRIMERA INFANCIA");
            _evaluartercefinalidad()
            break;
        case '05':
            $('#descripfina2_713').val("ADOLESCENCIA");
            _evaluartercefinalidad()
            break;
        case '06':
            $('#descripfina2_713').val("DET.ALT.EMBARAZO");
            _evaluartercefinalidad()
            break;
        case '07':
            $('#descripfina2_713').val("ADULTEZ");
            _evaluartercefinalidad()
            break;
        case '08':
            $('#descripfina2_713').val("DET.ALT.AGUD.VISU");
            _evaluartercefinalidad()
            break;
        case '09':
            $('#descripfina2_713').val("DET.ENFERM.PROFES");
            _evaluartercefinalidad()
            break;
        case '10':
            $('#descripfina2_713').val("NO APLICA");
            _evaluartercefinalidad()
            break;
        case '11':
            $('#descripfina2_713').val("PATOLOGIA CRONICA");
            _evaluartercefinalidad()
            break;
        case '00':
            $('#descripfina2_713').val(" ");
            _evaluartercefinalidad()
            break;
        default:
            _evaluarsegunfinalidad();
            break;
    }
}

function _evaluartercefinalidad() {
    validarInputs(
        {
            form: "#tercerfinalidad",
            orden: '1'
        },
        function () { _evaluarsegunfinalidad() },
        _validartercefinalidad
    )
}
function _validartercefinalidad() {
    SAL713.$tercefinal713 = $('#fina3_713').val();

    switch (SAL713.$tercefinal713) {
        case '01':
            $('#descripfina3_713').val("ATENCION PARTO");
            _evaluarcuartafinalidad()
            break;
        case '02':
            $('#descripfina3_713').val("ATENCION REC.NACI");
            _evaluarcuartafinalidad()
            break;
        case '03':
            $('#descripfina3_713').val("ATENC.PLANIF.FAMI");
            _evaluarcuartafinalidad()
            break;
        case '04':
            $('#descripfina3_713').val("PRIMERA INFANCIA");
            _evaluarcuartafinalidad()
            break;
        case '05':
            $('#descripfina3_713').val("ADOLESCENCIA");
            _evaluarcuartafinalidad()
            break;
        case '06':
            $('#descripfina3_713').val("DET.ALT.EMBARAZO");
            _evaluarcuartafinalidad()
            break;
        case '07':
            $('#descripfina3_713').val("ADULTEZ");
            _evaluarcuartafinalidad()
            break;
        case '08':
            $('#descripfina3_713').val("DET.ALT.AGUD.VISU");
            _evaluarcuartafinalidad()
            break;
        case '09':
            $('#descripfina3_713').val("DET.ENFERM.PROFES");
            _evaluarcuartafinalidad()
            break;
        case '10':
            $('#descripfina3_713').val("NO APLICA");
            _evaluarcuartafinalidad()
            break;
        case '11':
            $('#descripfina3_713').val("PATOLOGIA CRONICA");
            _evaluarcuartafinalidad()
            break;
        case '00':
            $('#descripfina3_713').val(" ");
            _evaluarcuartafinalidad()
            break;
        default:
            _evaluartercefinalidad();
            break;
    }
}
function _evaluarcuartafinalidad() {
    validarInputs(
        {
            form: "#cuartafinalidad",
            orden: '1'
        },
        function () { _evaluartercefinalidad() },
        _validarcuartafinalidad
    )
}
function _validarcuartafinalidad() {
    SAL713.$cuartafinal713 = $('#fina4_713').val();

    switch (SAL713.$cuartafinal713) {
        case '01':
            $('#descripfina4_713').val("ATENCION PARTO");
            enviarDatos713();
            break;
        case '02':
            $('#descripfina4_713').val("ATENCION REC.NACI");
            enviarDatos713();
            break;
        case '03':
            $('#descripfina4_713').val("ATENC.PLANIF.FAMI");
            enviarDatos713();
            break;
        case '04':
            $('#descripfina4_713').val("PRIMERA INFANCIA");
            enviarDatos713();
            break;
        case '05':
            $('#descripfina4_713').val("ADOLESCENCIA");
            enviarDatos713();
            break;
        case '06':
            $('#descripfina4_713').val("DET.ALT.EMBARAZO");
            enviarDatos713();
            break;
        case '07':
            $('#descripfina4_713').val("ADULTEZ");
            enviarDatos713();
            break;
        case '08':
            $('#descripfina4_713').val("DET.ALT.AGUD.VISU");
            enviarDatos713();
            break;
        case '09':
            $('#descripfina4_713').val("DET.ENFERM.PROFES");
            enviarDatos713();
            break;
        case '10':
            $('#descripfina4_713').val("NO APLICA");
            enviarDatos713();
            break;
        case '11':
            $('#descripfina4_713').val("PATOLOGIA CRONICA");
            enviarDatos713();
            break;
        case '00':
            $('#descripfina4_713').val(" ");
            enviarDatos713();
            break;
        default:
            _evaluarcuartafinalidad();
            break;
    }
}
///////////////////////GRABAR////////


function enviarDatos713() {
    console.log(SAL713.$_valor, SAL713.$monto713)
    SAL713.$fechaact = moment().format('YYMMDD');
    SAL713.$monto713 = SAL713.$monto713.replace('.', '').padStart(14, '0');
    SAL713.$operario = $_ADMINW;

    LLAMADO_DLL({
        dato: [SAL713.$_NovedSal713, SAL713.$llavetab713, SAL713.$descripcups713, SAL713.$liquidar713, SAL713.$monto713, SAL713.$paqint713, SAL713.$codtari_713,
        SAL713.$insumos_713, SAL713.$cantidaddias713, SAL713.$increm713, SAL713.$division_713, SAL713.$descripextensa713, SAL713.$primerfinal713,
        SAL713.$segundfinal713, SAL713.$tercefinal713, SAL713.$cuartafinal713, SAL713.$operario, SAL713.$fechaact],
        callback: validargrabado713,
        nombredll: 'SER102-02',
        carpeta: 'SALUD'
    })
}

function validargrabado713(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if (SAL713.$_NovedSal713 == '9') {
            toastr.success('Se ha retirado', 'MAESTRO TABLAS');
            _inputControl('reset');
            _inputControl('disabled');
            loader("hide");
            _toggleNav();
            // CON850(_evaluarCON850);
        } else {
            toastr.success('Se ha guardado', 'MAESTRO TABLAS');
            _inputControl('reset');
            _inputControl('disabled');
            loader("hide");
            _toggleNav();
            // CON850(_evaluarCON850);
        }
    } else if (swinvalid == "01") {
        CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'error');

    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
// ELIMINAR REGISTRO
function _eliminaDatos713() {
    LLAMADO_DLL({
        dato: [SAL713.$_NovedSal713, SAL713.$llavetab713],
        callback: validargrabado713,
        nombredll: 'SER102-02',
        carpeta: 'SALUD'
    })
}
/////MOSTRAR DATOS NOVEDAD 8 Y 9 /////////////
function _llenarCampos713() {
    LLAMADO_DLL({
        dato: [SAL713.$llavetab713],
        callback: on_datosTbla713,
        nombredll: 'SER102-01',
        carpeta: 'SALUD'
    });
}

function on_datosTbla713(data) {
    var date = data.split('|');
    SAL713.$llavetab713 = date[1].trim();
    SAL713.$descripcups713 = date[2].trim();
    SAL713.$liquidar713 = date[3].trim();
    SAL713.$monto713 = date[4].trim();
    SAL713.$monto_713 = SAL713.$monto713.substring(0, 12)
    SAL713.$paqint713 = date[5].trim();
    SAL713.$codtari_713 = date[6].trim();
    SAL713.$insumos_713 = date[7].trim();
    SAL713.$cantidaddias713 = date[8].trim();
    SAL713.$increm713 = date[9].trim();
    SAL713.$division_713 = date[10].trim();
    SAL713.$descrpdiv_713 = date[11].trim();
    SAL713.$descripextensa713 = date[12].trim();
    SAL713.$primerfinal713 = date[13].trim();
    SAL713.$segundfinal713 = date[14].trim();
    SAL713.$tercefinal713 = date[15].trim();
    SAL713.$cuartafinal713 = date[16].trim();
    SAL713.$operario = date[18].trim();
    SAL713.$fechaact = date[19].trim();

    if (date[0].trim() == '00') {
        _mostrarDatos713()
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        validarCodig();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


function _mostrarDatos713() {

    $('#descrpcups_103').val(SAL713.$descripcups713);
    $('#liquidar_713').val(SAL713.$liquidar713);
    vlrmonto_713Mask.typedValue = SAL713.$monto713;
    if (SAL713.$liquidar713 == '4') {
        SAL713.$_valor = ($_SALMINUSU / 30) * SAL713.$monto_713
        $('#valortotal_713').val(parseInt(SAL713.$_valor));
    } else {
        SAL713.$_valor = '';
        $('#valortotal_713').val(SAL713.$_valor);
    }
    $('#incrementar_713').val(SAL713.$increm713);
    $('#integ_713').val(SAL713.$paqint713);
    $('#insumos_713').val(SAL713.$insumos_713);
    $('#codtari_713').val(SAL713.$codtari_713);
    $('#divis_713').val(SAL713.$division_713);
    $('#cantidaddias713').val(parseInt(SAL713.$cantidaddias713));
    $('#descrpdiv_713').val(SAL713.$descrpdiv_713);
    $('#descrpexten_713').val(SAL713.$descripextensa713);
    $('#fina1_713').val(SAL713.$primerfinal713);
    $('#fina2_713').val(SAL713.$segundfinal713);
    $('#fina3_713').val(SAL713.$tercefinal713);
    $('#fina4_713').val(SAL713.$cuartafinal713);
    $('#oper_713').val(SAL713.$operario);
    $('#fechat_713').val(SAL713.$fechaact);

    switch (parseInt(SAL713.$_NovedSal713)) {
        case 8:
            _descriptabla();
            break;
        case 9:
            CON851P('54', _validarDato713, _eliminaDatos713)
            break;
    }
}

///////////////////F8-VENTANAS//////////////////////////
function _ventanaNomtarif(e) {
    var $_CONVENIO_713 = [];
    let URL = get_url("APP/" + "SALUD/SER803" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_CONVENIO_713 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE NOMDRE TARIFAS",
                    columnas: ["COD", "DESCRIP"],
                    data: $_CONVENIO_713.NOMTAR,
                    callback_esc: function () {
                        $("#codtar_713").focus();
                    },
                    callback: function (data) {
                        $('#codtar_713').val(data.COD);
                        $('#descptar_713').val(data.DESCRIP.trim());
                        _enterInput('#codtar_713');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanaGruposer(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "GRUPOS DE SERVICIO",
            columnas: ["COD", "DESCRIP"],
            data: $_GRUPOSER_703,
            callback_esc: function () {
                $("#grupo_713").focus();
            },
            callback: function (data) {
                $('#grupo_713').val(data.COD.trim())
                $('#descrgrp_103').val(data.DESCRIP.trim())
                _enterInput('#grupo_713');
            }
        });
    }

}

function _ventanaTablatarif(e) {

    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var ARTICULOS_SAL41 = [];
        postData({ datosh: `${datosEnvio()}${$('#codtar_713').val().trim()}${$('#tiposer_713').val().trim()}|` },
            get_url("APP/SALUD/SER802.DLL"))
            .then((data) => {
                loader("hide");
                ARTICULOS_SAL41 = data.TABLA;
                ARTICULOS_SAL41.pop();
                _ventanaDatos({
                    titulo: 'VENTANA TABLA DE TARIFAS',
                    columnas: ["COD", "TIPO", "COD_SER", "DESCRIP"],
                    data: ARTICULOS_SAL41,
                    callback_esc: function () {
                        $("#cups_713").focus();
                    },
                    callback: function (data) {
                        var cod713 = data.COD_SER.trim()
                        $('#grupo_713').val(cod713.substring(0, 2).trim());
                        $('#cups_713').val(cod713.substring(2, 15).trim());
                        $('#descrpcups_103').val(data.DESCRIP.trim());
                        _enterInput('#cups_713');
                    }
                });
            })
            .catch((error) => {
                loader("hide");
                console.error(error);
                CON851('', 'Hubo un error consultando los articulos', null, 'error', 'Error');
                $("#cups_713").focus();
            });
    }

}

function _ventanaDivis(e) {
    var $_DIVISION_713 = [];
    let URL = get_url("APP/" + "INVENT/INV809-03" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_DIVISION_713 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE CONSULTA DE DIVISION",
                    columnas: ["COD", "DESCRIP"],
                    data: $_DIVISION_713.CODIGOS,
                    callback_esc: function () {
                        $("#divis_713").focus();
                    },
                    callback: function (data) {
                        document.getElementById('divis_713').value = data.COD.trim();
                        document.getElementById('descrpdiv_713').value = data.DESCRIP;
                        _enterInput('#divis_713');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });

}

function _ventanaContab(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite({
            titulo: 'VENTANA PLAN DE CUENTAS',
            columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "NOMBRE_MAE", "TIPO_MAE"],
            data: $_CTAMAYOR_103,
            callback_esc: function () {
                $("#contab_713").focus();
            },
            callback: function (data) {
                $('#contab_713').val(data.CTA_MAY.trim() + data.SUB_CTA.trim() + data.AUX_MAE.trim() + data.TIPO_MAE.trim())
                $('#descontab_713').val(data.NOMBRE_MAE.trim())
                _enterInput('#contab_713');
            }
        });
    }
}


