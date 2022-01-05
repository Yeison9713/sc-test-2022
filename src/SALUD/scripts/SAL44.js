/* NOMBRE RM --> INV404 // NOMBRE ELECTR --> SAL44 */

var SAL44 = [];
var CONTAITEM = 0;
var CONTAITEM2 = 0;

$(document).ready(function () {
    nombreOpcion('9,4,4,1 - Reconsolida comprobante por prefijo');
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
    $_LISTAPRECIOUSU = $_USUA_GLOBAL[0].LISTA_PRECIO;
    $_CODCIUUSU = $_USUA_GLOBAL[0].CONTROL_USU
    $_DPTCIUUSU = $_CODCIUUSU.substring(0, 1);
    $_CIUCIUUSU = $_CODCIUUSU.substring(1, 5);
    $_INVENTUSU = $_USUA_GLOBAL[0].INVENT;

    _toggleF8([
        { input: 'prefijo', app: '9441', funct: _ventanaprefijo_9441 },
    ]);
    _evaluarprefijofact_sal44();

});


function _ventanaprefijo_9441(e) {
    var formapago = '[{"COD": "E","DESCRIP": "E- EFECTIVO"},{"COD": "C", "DESCRIP": "C- CREDITO"},{"COD": "P","DESCRIP": "P- PENSIONADO"}, {"COD": "A", "DESCRIP": "A- AMBULATORIO"}, {"COD": "T", "DESCRIP": "T- T- ACC.TRANS"}]'
    var formaspago = JSON.parse(formapago);
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE PAGO",
            columnas: ["COD", "DESCRIP"],
            data: formaspago,
            callback_esc: function () {
                $("#prefijo_9441").focus();
            },
            callback: function (data) {
                $('#prefijo_9441').val(data.COD.trim());
                // $('#descrippref_9441').val(data.DESCRIP.trim());
                _enterInput('#prefijo_9441');
            }
        });
    }
}

function _evaluarprefijofact_sal44() {
    validarInputs(
        {
            form: "#PREFIJO_9441",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SAL44.PREFIJOW = $('#prefijo_9441').val();
            switch (SAL44.PREFIJOW) {
                case "E":
                    $('#descrippref_9441').val('CONTADO');
                    _evaluarfechaini_sal44();
                    break;
                case "C":
                    $('#descrippref_9441').val('CREDITO');
                    _evaluarfechaini_sal44();
                    break;
                case "P":
                    $('#descrippref_9441').val('PENSIONADO');
                    _evaluarfechaini_sal44();
                    break;
                case "A":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "B":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "D":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "F":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "G":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "H":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "I":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "J":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "K":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "L":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "M":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "N":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "O":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "Q":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "R":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "S":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "V":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "W":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "X":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "Y":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "Z":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "T":
                    $('#descrippref_9441').val('AMBULATORIO');
                    _evaluarfechaini_sal44();
                    break;
                default:
                    _evaluarprefijofact_sal44();
                    break;
            }

        }
    )
}


function _evaluarfechaini_sal44() {
    $('#anoini_9441').val($_ANOLNK);
    $('#mesini_9441').val($_MESLNK);
    $('#diaini_9441').val('01');
    validarInputs(
        {
            form: "#DIAINIC_9441",
            orden: '1'
        },
        () => { _evaluarprefijofact_sal44(); },
        () => {
            SAL44.DIAINI = $('#diaini_9441').val();
            if (SAL44.DIAINI.trim() == '') {
                _evaluarfechaini_sal44();
            } else {
                SAL44.DIAINI = cerosIzq(SAL44.DIAINI, 2)
                $('#diaini_9441').val(SAL44.DIAINI);
                SAL44.FECHAINICIAL = $_ANOLNK + $_MESLNK + SAL44.DIAINI;
                _evaluarfechasal_sal44();
            }
        }
    )
}

function _evaluarfechasal_sal44() {
    $('#anofin_9441').val($_ANOLNK);
    $('#mesfin_9441').val($_MESLNK);
    $('#diafin_9441').val($_DIALNK);
    validarInputs(
        {
            form: "#DIAFINAL_9441",
            orden: '1'
        },
        () => { _evaluarfechaini_sal44(); },
        () => {
            SAL44.DIAFIN = $('#diafin_9441').val();
            if (SAL44.DIAFIN.trim() == '') {
                _evaluarfechasal_sal44();
            } else {
                SAL44.FECHAFINAL = $_ANOLNK + $_MESLNK + SAL44.DIAFIN;
                if (parseInt(SAL44.DIAFIN) < parseInt(SAL44.DIAINI)) {
                    _evaluarfechasal_sal44();
                } else {
                    loader("show");
                    let URL = get_url("APP/SALUD/SAL44-02.DLL");
                    postData({ datosh: datosEnvio() + SAL44.PREFIJOW + '|' + SAL44.FECHAINICIAL + '|' + SAL44.FECHAFINAL + '|' }, URL)
                        .then(data => {
                            loader("hide");
                            console.log(data)

                            data.SAL44_02.pop();
                            if(data.SAL44_02.length) {
                                format_csv(data.SAL44_02);
                            } else {
                                CON851("", "08", null, "error", "Error");
                                _evaluarfechasal_sal44();
                            }

                            // SAL44.RECONSOLIDACION = data.RECONSOLIDA;
                            // SAL44.RECONSOLIDACION.pop();
                            // swinvalid = SAL44.RECONSOLIDACION[0].ESTADO;
                            // if(swinvalid == '00'){

                            // }else if (swinvalid == '08'){
                            //     CON851('01', '01', null, 'error', 'error');
                            // }
                            // loader('hide');
                            // _borrarinput_SAL44()
                        })
                        .catch(err => {
                            loader('hide');
                            console.debug(err);
                            _evaluarfechasal_sal44()
                        })
                }
            }
        }
    )
}

async function format_csv(datos) {
  _impresion2({
    tipo: "csv",
    datos: datos,
    columnas: false,
  })
    .then(() => {
      loader("hide");
      CON851("", "Impreso Correctamente", null, "success", "Exito");
      _toggleNav();
    })
    .catch((error) => {
      console.error(error);
      loader("hide");
      CON851("", "Ha ocurrido un error generando la impresión.", null, "error", "Error");
      _evaluarfechasal_sal44();
    });
}

function _borrarinput_SAL44() {
    _inputControl('reset');
    _inputControl('disabled');
    _toggleNav(); 
}

