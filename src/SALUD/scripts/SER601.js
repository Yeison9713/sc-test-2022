/* NOMBRE RM --> SER601 // 15-02-2020- DESARROLLADO: DIANA ESCOBAR */
var SER601 = [];
var $_FECHAACTUAL = moment().format('YYYYMMDD');

$(document).ready(function () {
    nombreOpcion('9,7,6,1 - Contabiliza facturas Ambulatorio');
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
    _aceptarprefijo_SER601();
});


function _aceptarprefijo_SER601() {
    $("#fecha_SER601").val($_FECHA_LNK)
    validarInputs(
        {
            form: "#PREFIJO_SER601",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER601.PREFIJOINI = $('#Prefijo_SER601').val();
            if(SER601.PREFIJOINI.trim() == ''){
                SER601.PREFIJOINI = 'A'; 
                $('#Prefijo_SER601').val(SER601.PREFIJOINI);
                _aceptarinicio_SER601(); 
            }else if(SER601.PREFIJOINI == 'P' || SER601.PREFIJOINI == 'T' || SER601.PREFIJOINI == 'U'){
                _aceptarprefijo_SER601();
            }else{
                _aceptarinicio_SER601();  
            }
        }
    )
}

function _aceptarinicio_SER601(){
    SER601.PREFIJOFIN = SER601.PREFIJOINI;
    validarInputs(
        {
            form: "#CONTAB_SER601",
            orden: '1'
        },
        () => { _aceptarprefijo_SER601(); },
        () => {
            SER601.NROFACINI = $('#Contab_SER601').val();
            SER601.NROFACINI = SER601.NROFACINI.padStart(6, "0");
            $('#Contab_SER601').val(SER601.NROFACINI);
            SER601.LLAVENUMINI =  SER601.PREFIJOINI + SER601.NROFACINI; 
            _aceptarfin_SER601(); 
        }
    )
}

function _aceptarfin_SER601(){
    validarInputs(
        {
            form: "#HASTA_SER601",
            orden: '1'
        },
        () => { _aceptarinicio_SER601(); },
        () => {
            SER601.NROFACFIN = $('#hasta_SER601').val();
            SER601.NROFACFIN =  SER601.NROFACFIN.padStart(6, "0");
            $('#hasta_SER601').val( SER601.NROFACFIN);
            if(parseInt(SER601.NROFACFIN) < parseInt(SER601.NROFACINI)){
                _aceptarfin_SER601(); 
            }else if(SER601.NROFACFIN.trim() == ''){
                _aceptarfin_SER601(); 
            }else{
                SER601.DIFW = SER601.NROFACFIN - SER601.NROFACINI; 
                if(parseInt(SER601.DIFW) > 10000){
                    CON851('9O', '9O', null, 'error', 'error');
                    _aceptarfin_SER601(); 
                }else{
                    SER601.LLAVENUMFIN = SER601.PREFIJOFIN + SER601.NROFACFIN; 
                    _buscarbloqueadas_SER601(); 
                }
            }
        }
    )
}

function _buscarbloqueadas_SER601(){
    loader("show");
    let URL = get_url("APP/SALUD/SER601.DLL");
    postData({ datosh: datosEnvio() + SER601.LLAVENUMINI + '|' + SER601.LLAVENUMFIN + '|' + $_ADMINW + '|'}, URL)
        .then(data => {
            console.debug(data,'consulta SER601')
            SER601.CONTABFACTA = data.FACTA;
            SER601.IMPRESIONESCSV = [];
            SER601.IMPRESIONESCSV.push('LISTADO DE INCONSISTENCIAS EN (A)');
            for (var i in SER601.CONTABFACTA){
                var line = SER601.CONTABFACTA[i].FACT2 + ',' + SER601.CONTABFACTA[i].LLAVE2 + ',' + SER601.CONTABFACTA[i].CTACONTAB2 + ',' + SER601.CONTABFACTA[i].CUPS2;
                    if (SER601.CONTABFACTA[i].FACT2.trim() != ''){
                        SER601.IMPRESIONESCSV.push(line);
                    }
            }
            loader("hide");   
            _generarcsv_SER601();      
        })
        .catch(err => {
            console.error(err);
            loader("hide");   
            _aceptarfin_SER601()
        })  

}
function _generarcsv_SER601(){
    SER601.NOMBRECSV = $_ADMINW + 'A' + $_FECHAACTUAL;  
    console.log('generarcsv')
    opcinesImpresion_SER601 = {
        datos: SER601.IMPRESIONESCSV,
        tipo: 'csv',
        formato: 'salud/SER6011B.html',
        nombre: SER601.NOMBRECSV
    }
    imprimir(opcinesImpresion_SER601, _toggleNav);
}