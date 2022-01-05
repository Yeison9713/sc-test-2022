/* NOMBRE RM --> SER601A // 06-02-2020- DESARROLLADO: DIANA ESCOBAR */
var SER601B = [];

var $_FECHAACTUAL = moment().format('YYYYMMDD');
$_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
$_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
$_DIAACTUAL = $_FECHAACTUAL.substring(6, 8);

$(document).ready(function () {
    nombreOpcion('9,7,6,3 - Contabilizar facturas pensionadas abiertas');
    _inputControl('reset');
    _inputControl('disabled');
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
    $_BARRASUSULNK = ' ';

    _aceptarprefijo_SER601B();
});


function _aceptarprefijo_SER601B() {
    switch (parseInt($_MESLNK)) {
        case 01:
            $('#contab_SER601B').val('ENERO' + '/' + $_ANOLNK);
            continuarproceso_SER601B();
            break;
        case 02:
            $('#contab_SER601B').val('FEBRERO' + '/' + $_ANOLNK);
            continuarproceso_SER601B();
            break;
        case 03:
            $('#contab_SER601B').val('MARZO' + '/' + $_ANOLNK);
            continuarproceso_SER601B();
            break;
        case 04:
            $('#contab_SER601B').val('ABRIL' + '/' + $_ANOLNK);
            continuarproceso_SER601B();
            break;
        case 05:
            $('#contab_SER601B').val('MAYO' + '/' + $_ANOLNK);
            continuarproceso_SER601B();
            break;
        case 06:
            $('#contab_SER601B').val('JUNIO' + '/' + $_ANOLNK);
            continuarproceso_SER601B();
            break;
        case 07:
            $('#contab_SER601B').val('JULIO' + '/' + $_ANOLNK);
            continuarproceso_SER601B();
            break;
        case 08:
            $('#contab_SER601B').val('AGOSTO' + '/' + $_ANOLNK);
            continuarproceso_SER601B();
            break;
        case 09:
            $('#contab_SER601B').val('SEPTIEMBRE' + '/' + $_ANOLNK);
            continuarproceso_SER601B();
            break;
        case 10:
            $('#contab_SER601B').val('OCTUBRE' + '/' + $_ANOLNK);
            continuarproceso_SER601B();
            break;
        case 11:
            $('#contab_SER601B').val('NOVIEMBRE' + '/' + $_ANOLNK);
            continuarproceso_SER601B();
            break;
        case 12:
            $('#contab_SER601B').val('DICIEMBE' + '/' + $_ANOLNK);
            continuarproceso_SER601B();
            break;
        default:
            break;
    }


    SER601B.FECHAFIN = 20 + $_FECHA_LNK;
    SER601B.DIAINIW = SER601B.FECHAFIN.substring(6, 8)
    SER601B.MESINIW = SER601B.FECHAFIN.substring(4, 6)
    SER601B.AÑOINIW = SER601B.FECHAFIN.substring(0, 4)

    SER601B.DIAINIW = "01";
    if (parseInt(SER601B.MESINIW) > 6) {
        SER601B.MESINIW = SER601B.MESINIW - 6;
    } else {
        SER601B.MESINIW = SER601B.MESINIW + 6;
        SER601B.AÑOINIW = SER601B.AÑOINIW - 1;
    }
    $("#fecha_SER601B").val(SER601B.AÑOINIW + SER601B.MESINIW + SER601B.DIAINIW)
}
function continuarproceso_SER601B() {
    CON851P('04', _toggleNav, _leerfacturas_SER601B)
}
function _leerfacturas_SER601B() {
    console.log('leerfactura_ser601B');
    console.log($_FECHAACTUAL + '|' + $_ADMINW)
    loader("show");
    let URL = get_url("APP/SALUD/SER601B.DLL");
    postData({ datosh: datosEnvio() + $_FECHAACTUAL + '|' + $_ADMINW + '|' }, URL)
        .then(data => {
            let array = data.FACTABIERTAS.filter(x => x.FACT2.trim() != '')
            let array2 = data.FACTABIERTAS.filter(x => x.CTACONTAB2.trim() == '410501ERROR')
            data = array2
            columnas = [
                {
                    title: "FACTURAS",
                    value: 'FACT2',
                },
                {
                    title: "COMPROBANTE",
                    value: 'LLAVE2',
                },
                {
                    title: "CTACONTAB",
                    value: 'CTACONTAB2',
                    format: 'string'
                },
                {
                    title: "CUPS",
                    value: 'CUPS2',
                    format: 'string'
                },
            ]
            _impresion2({
                tipo: 'excel',
                header: [
                    { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 14 },
                    `LISTADOS DE INCONSISTENCIAS EN (P)`
                ],
                logo: `${$_USUA_GLOBAL[0].NIT}.png`,
                ruta_logo: 'C:\\PROSOFT\\LOGOS\\',
                tabla: {
                    columnas,
                    data: data,
                },
                archivo: $_ADMINW + 'P' + $_FECHAACTUAL + moment().format('YYYYMMDDHHmmssS'),
                scale: 65,
                orientation: 'landscape'
            })
                .then(() => {
                    loader("hide");
                    CON851('', 'Impreso Correctamente', _toggleNav(), 'success', 'Exito')
                })
                .catch(() => {
                    loader("hide");
                    CON851('', 'Hubo un error en la impresión', _toggleNav(), 'error', 'Error')
                })      
        })
        .catch(err => {
            loader("hide");
            _toggleNav()
            console.debug(err);
        })
}


