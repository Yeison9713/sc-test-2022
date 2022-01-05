var SER110CFAC = [];

$(document).ready(function () {
    nombreOpcion('- CORRESPONSALIA FACT');
    _inputControl('reset');
    _inputControl('disabled');
    SER110CFAC.FECHASIG = moment().format('YYYYMMDD');
    SER110CFAC.ANOSIG = SER110CFAC.FECHASIG.substring(0, 4);
    SER110CFAC.MESSIG = SER110CFAC.FECHASIG.substring(4, 6);
    SER110CFAC.DIASIG = SER110CFAC.FECHASIG.substring(6, 8);
    SER110CFAC.HORAACTUAL = moment().format('HHmm');
    SER110CFAC.HRACTUAL = SER110CFAC.HORAACTUAL.substring(0, 2);
    SER110CFAC.MNACTUAL = SER110CFAC.HORAACTUAL.substring(2, 4);

    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    _toggleF8([
        { input: 'factura', app: '110CFAC', funct: _ventanaFacturacion_SER110CFAC },

    ]);
    _validarsegundaventana_SER110FAC();
});

function _ventanaFacturacion_SER110CFAC(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'NUMERACION',
            valoresselect: ['Nombre del tercero', 'Nombre del paciente'],
            f8data: 'NUMERACION',
            columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
            callback: (data) => {
                $_FACTURAW = data.COD;
                $('#factura_110CFAC').val($_FACTURAW);
                _enterInput('#factura_110CFAC');
            },
            cancel: () => {
                _enterInput('#factura_110CFAC');
            }
        };
        F8LITE(parametros);
    }
}

function _validarsegundaventana_SER110FAC(){
    // if(SER110CFAC.LLAVELOCAL.trim() == ''){
    //     _datofactura_SER110CFAC()
    // }else{

    // }
    let Window = BrowserWindow.getAllWindows();
    if (Window.length > 1) {
        $('#factura_110CFAC').val($_MESSAGE[2].factura);
        _datofactura_SER110CFAC();
    }else{
        _datofactura_SER110CFAC()
    }
}

function _datofactura_SER110CFAC() {
    
    $('#ano_110CFAC').val(SER110CFAC.ANOSIG);
    $('#mes_110CFAC').val(SER110CFAC.MESSIG);
    $('#dia_110CFAC').val(SER110CFAC.DIASIG);
    $('#hora_110CFAC').val(SER110CFAC.HRACTUAL);
    $('#minuto_110CFAC').val(SER110CFAC.MNACTUAL);
    SER110CFAC.FECHACNUM = SER110CFAC.FECHASIG;
    SER110CFAC.HRCNUM = SER110CFAC.HRACTUAL
    SER110CFAC.MNCNUM = SER110CFAC.MNACTUAL
    validarInputs(
        {
            form: "#FACTURA_SERC110FAC",
            orden: '1'
        },
        () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        },
        () => {
            SER110CFAC.LLAVELOCAL = $('#factura_110CFAC').val();
            if (SER110CFAC.LLAVELOCAL.trim() == '') {
                _datofactura_SER110CFAC();
            } else {
                if (($_ADMINW == 'ADMI') || ($_ADMINW == 'GEBC') || ($_ADMINW == '0101')) {
                    _aceptarmes_SER110CFAC();
                } else {
                    _buscarcorresponsalia_SER110CFAC();
                }
            }
        }
    )
}

function _aceptarmes_SER110CFAC() {
    validarInputs(
        {
            form: "#MES_SER110CFAC",
            orden: '1'
        },
        () => { _datofactura_SER110CFAC(); },
        () => {
            SER110CFAC.MES2ACT = $('#mes_110CFAC').val();
            if (SER110CFAC.MES2ACT.trim() == '') {
                _aceptarmes_SER110CFAC();
            } else if ((SER110CFAC.MES2ACT < 01) || (SER110CFAC.MES2ACT > 12)) {
                _aceptarmes_SER110CFAC();
            } else {
                _aceptardia_SER110CFACT();
            }
        }
    )
}


function _aceptardia_SER110CFACT() {
    validarInputs(
        {
            form: "#DIA_SER110CFAC",
            orden: '1'
        },
        () => { _aceptarmes_SER110CFAC(); },
        () => {
            SER110CFAC.DIA2ACT = $('#dia_110CFAC').val();
            if (SER110CFAC.DIA2ACT.trim() == '') {
                _aceptardia_SER110CFACT();
            } else if ((SER110CFAC.DIA2ACT < 01) || (SER110CFAC.DIA2ACT > 31)) {
                _aceptardia_SER110CFACT();
            } else {
                _aceptarhora_SER110CFACT();
            }
        }
    )
}

function _aceptarhora_SER110CFACT() {
    validarInputs(
        {
            form: "#HORA_SER110CFAC",
            orden: '1'
        },
        () => { _aceptardia_SER110CFACT(); },
        () => {
            SER110CFAC.HRACT = $('#hora_110CFAC').val();
            if ((SER110CFAC.HRACT.trim() == '') || (SER110CFAC.HRACT > 23)) {
                _aceptarhora_SER110CFACT();
            } else {
                _aceptarminutos_SER110CFACT();
            }
        }
    )
}
function _aceptarminutos_SER110CFACT() {
    validarInputs(
        {
            form: "#MINUT_SER110CFAC",
            orden: '1'
        },
        () => { _aceptarhora_SER110CFACT(); },
        () => {
            SER110CFAC.MNACT = $('#minuto_110CFAC').val();
            if ((SER110CFAC.MNACT.trim() == '') || (SER110CFAC.MNACT > 59)) {
                _aceptarminutos_SER110CFACT();
            } else {
                _buscarcorresponsalia_SER110CFAC();
            }
        }
    )
}

function _buscarcorresponsalia_SER110CFAC() {

    let datos_envio = datosEnvio() + SER110CFAC.LLAVELOCAL + '|' + SER110CFAC.FECHACNUM + '|' + SER110CFAC.HORAACTUAL + '|' + $_ADMINW + '|';
    SolicitarDll({ datosh: datos_envio }, dato => {
        console.log('respuesa', dato)
        var date = dato.split("|");
        var SWINVALID = date[0];
        SER110CFAC.FECHACORREGRABADA = date[1];
        if (SWINVALID == '00') {
            SER110CFAC.NOVEDAD = '8';
            CON851('', 'ACTUALIZANDO', null, 'warning', 'error');
            jAlert({ titulo: 'Atencion! ', mensaje: 'Ese cliente ya tiene corresponsalia abierta, con fecha' + SER110CFAC.FECHACORREGRABADA }, _crearcorresponsalida_SER110CFAC);
        } else if (SWINVALID == '08') {
            SER110CFAC.OPERCNUM = $_ADMINW;
            SER110CFAC.HORACNUM = SER110CFAC.HORAACTUAL; 
            SER110CFAC.NOVEDAD = '7';
            CON851('', 'CREANDO', null, 'warning', 'error');
            _crearcorresponsalida_SER110CFAC();
        }
    }, get_url('APP/SALUD/SER110CFAC.DLL'));
}

function _crearcorresponsalida_SER110CFAC() {
    console.log('crearcorresponsalia')
    let datos_envio = datosEnvio() + $_ADMINW + '|' + SER110CFAC.CODPACI;
    SolicitarDll({ datosh: datos_envio }, dato => {
        console.log('respuesa', dato)
        var date = dato.split("|");
        var SWINVALID = date[0];
        if (SWINVALID == '00') {
            _datoobservacion_SER110CFAC();
        } else if (SWINVALID == '08') {
            _datoobservacion_SER110CFAC();
        }
    }, get_url('APP/SALUD/SER110CFAC_01.DLL'));
}

function _datoobservacion_SER110CFAC() {
    validarInputs({
        form: '#OBSERVACIONES_SER110CFAC',
        orden: '1'
    },
        () => { _datocliente_SER110CFAC() },
        () => {
            SER110CFAC.OBSERVACIONES = $('#observacion_110CFAC').val();

        }
    )
}