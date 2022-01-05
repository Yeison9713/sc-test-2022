// 23/05/2020 DIANA E: CREADO
var SER168 = [];
var $_FECHAACTUAL = moment().format('YYYYMMDD');

$(document).ready(function () {
    nombreOpcion('9,7,6,5 - Asigna nuevo nit a comprobante');
    _inputControl('reset');
    _inputControl('disabled');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    _toggleF8([
        { input: 'factura', app: '168', funct: _ventanaFacturacion_SER168 }

    ]);
    _aceptarprefijo_SER168();
});


function _aceptarprefijo_SER168() {
    validarInputs(
        {
            form: "#PREFIJO_SER168",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER168.PREFIJOW = $('#prefijo_168').val();
            if ((SER168.PREFIJOW == "A") || (SER168.PREFIJOW == "P") || (SER168.PREFIJOW == "T") || (SER168.PREFIJOW == "B") || (SER168.PREFIJOW == "D") || (SER168.PREFIJOW == "F") ||
                (SER168.PREFIJOW == "G") || (SER168.PREFIJOW == "H") || (SER168.PREFIJOW == "I") || (SER168.PREFIJOW == "J") || (SER168.PREFIJOW == "K") || (SER168.PREFIJOW == "L") ||
                (SER168.PREFIJOW == "M") || (SER168.PREFIJOW == "N") || (SER168.PREFIJOW == "O") || (SER168.PREFIJOW == "Q") || (SER168.PREFIJOW == "R") || (SER168.PREFIJOW == "S") ||
                (SER168.PREFIJOW == "V") || (SER168.PREFIJOW == "W") || (SER168.PREFIJOW == "X") || (SER168.PREFIJOW == "Y") || (SER168.PREFIJOW == "Z")) {
                _aceptarnumero_SER168();
            } else {
                _aceptarprefijo_SER168();
            }
        }
    )
}

function _aceptarnumero_SER168() {
    validarInputs(
        {
            form: "#FACTURA_SER168",
            orden: '1'
        },
        () => { _aceptarprefijo_SER168(); },
        () => {
            SER168.NUMEROW = $('#factura_168').val();
            SER168.NUMEROW = SER168.NUMEROW.padStart(6, "0");
            $('#factura_168').val(SER168.NUMEROW);
            console.log(SER168.NUMEROW, 'SER168.NUMEROW')
            if ((SER168.NUMEROW == '000000') || (SER168.NUMEROW.trim() == '')) {
                _aceptarnumero_SER168();

            } else {
                SER168.LLAVEW = SER168.PREFIJOW + SER168.NUMEROW;
                console.log(SER168.LLAVEW, 'SER168.LLAVEW')
                let datos_envio = datosEnvio() + SER168.LLAVEW + '|';
                SolicitarDll({ datosh: datos_envio }, dato => {
                    var date = dato.split("|");
                    var SWINVALID = date[0];
                    SER168.NITNUM = date[2].trim();
                    SER168.DESCRIPNUM = date[3].trim();
                    if (SWINVALID == '00') {
                        $('#tercero_168').val(SER168.DESCRIPNUM);
                        _dllactualizar_SER168();

                    } else if (SWINVALID == '01') {
                        CON851('01', '01', null, 'error', 'error');
                        _aceptarnumero_SER168();
                    }
                }, get_url('APP/SALUD/SER108-01.DLL'));
            }
        }
    )
}

function _dllactualizar_SER168() {
    let datos_envio = datosEnvio() + SER168.LLAVEW + '|' + SER168.NITNUM + '|' + $_FECHAACTUAL;
    SolicitarDll({ datosh: datos_envio }, dato => {
        console.log('data', dato)
        var date = dato.split("|");
        var SWINVALID = date[0];
        if (SWINVALID == '00') {
            _toggleNav();
        } else if (SWINVALID == '01') {
            CON851('01', 'ERROR AL ACTUALIZAR', null, 'error', 'error');
            _aceptarnumero_SER168();
        }
    }, get_url('APP/SALUD/SER168A.DLL'));
}

////////////////VENTANA DE F8//////////////////////////
function _ventanaFacturacion_SER168(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'NUMERACION',
            valoresselect: ['Nombre del tercero', 'buscar paciente'],
            f8data: 'NUMERACION',
            columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
            callback: (data) => {
                $_NROW = data.COD;
                $_NROW = $_NROW.substring(1, 7)
                $('#factura_168').val($_NROW);
                _enterInput('#factura_168');
            },
            cancel: () => {
                _enterInput('#factura_168');
            }
        };
        F8LITE(parametros);
    }
}