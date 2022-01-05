/* NOMBRE RM --> SER601A // 06-02-2020- DESARROLLADO: DIANA ESCOBAR */
var SER601A = [];

var $_FECHACT = moment().format('YYMMDD');

$(document).ready(function () {
    nombreOpcion('9,7,6,2 - Contabilizar facturas pensionados');
    _inputControl('reset');
    _inputControl('disabled');
    loader("show");
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_ANOLNK = $_ANOLNK;
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
    SER601A.NITW = ''
    _toggleF8([
        { input: 'nit', app: 'SER601A', funct: _ventanatercetos_SER601A },
    ]);
    loader("hide");
    _aceptarprefijo_SER601A();
});

function _ventanatercetos_SER601A(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'TERCEROS',
            valoresselect: ['Buscar por nombre tercero'],
            f8data: 'TERCEROS',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
            callback: (data) => {
                $_CODTERCEROW = data.COD.trim();
                $('#nit_SER601A').val($_CODTERCEROW.padStart(10, "0"));
                _enterInput('#nit_SER601A');
            },
            cancel: () => {
                $("#nit_SER601A").focus();
            }
        };
        F8LITE(parametros);
    }
}

function _aceptarprefijo_SER601A() {
    SER601A.FECHAINI = 20 + $_ANOLNK + $_MESLNK + '01';
    SER601A.FECHAFIN = 20 + $_FECHA_LNK;
    $("#fechaini_SER601A").val(SER601A.FECHAINI)
    $("#fechafin_SER601A").val(SER601A.FECHAFIN)
    validarInputs(
        {
            form: "#PREFIJO_SER601A",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER601A.PREFIJOINI = $('#Prefijo_SER601A').val().toUpperCase();
            $('#Prefijo_SER601A').val(SER601A.PREFIJOINI)
            if (SER601A.PREFIJOINI.trim() == '') {
                SER601A.PREFIJOINI = 'P';
                $('#Prefijo_SER601A').val(SER601A.PREFIJOINI);
                _aceptarinicio_SER601A();
            } else if (SER601A.PREFIJOINI == 'P' || SER601A.PREFIJOINI == 'T') {
                SER601A.PREFIJOFIN = SER601A.PREFIJOINI;
                _aceptarinicio_SER601A();
            } else {
                _aceptarprefijo_SER601A()
            }
        }
    )
}

function _aceptarinicio_SER601A() {
    validarInputs(
        {
            form: "#CONTAB_SER601A",
            orden: '1'
        },
        () => { _aceptarprefijo_SER601A(); },
        () => {
            SER601A.NROFACINI = $('#Contab_SER601A').val()
            if (SER601A.NROFACINI.trim() == '') {
                SER601A.NROFACINI = "1";
                SER601A.NROFACFIN = "999999";
                SER601A.NROFACINI = SER601A.NROFACINI.padStart(6, "0");
                SER601A.LLAVENUMINI = SER601A.PREFIJOINI + SER601A.NROFACINI;
                $('#Contab_SER601A').val(SER601A.NROFACINI);
                $('#hasta_SER601A').val(SER601A.NROFACFIN);
                _aceptarfin_SER601A();
            } else {

                SER601A.NROFACINI = SER601A.NROFACINI.padStart(6, "0");
                $('#Contab_SER601A').val(SER601A.NROFACINI);
                SER601A.LLAVENUMINI = SER601A.PREFIJOINI + SER601A.NROFACINI;
                _aceptarfin_SER601A();
            }
        }
    )
}

function _aceptarfin_SER601A() {
    validarInputs(
        {
            form: "#HASTA_SER601A",
            orden: '1'
        },
        () => { _aceptarinicio_SER601A(); },
        () => {
            SER601A.NROFACFIN = $('#hasta_SER601A').val();
            if (parseInt(SER601A.NROFACFIN) < parseInt(SER601A.NROFACINI)) {
                _aceptarfin_SER601A();
            } else if (SER601A.NROFACFIN.trim() == '') {
                _aceptarfin_SER601A();
            } else {
                SER601A.DIFW = SER601A.NROFACFIN - SER601A.NROFACINI;
                if (parseInt(SER601A.DIFW) > 10000) {
                    CON851('9O', '9O', null, 'error', 'error');
                    _aceptarfin_SER601A();
                } else {
                    SER601A.NROFACFIN = SER601A.NROFACFIN.padStart(6, "0");
                    $('#hasta_SER601A').val(SER601A.NROFACFIN);
                    SER601A.LLAVENUMFIN = SER601A.PREFIJOFIN + SER601A.NROFACFIN;
                    _aceptarentidad_SER601A();
                }
            }
        }
    )
}

function _aceptarentidad_SER601A() {
    if (SER601A.NITW.trim() == '') SER601A.NITW = '99'
    $('#nit_SER601A').val(SER601A.NITW);
    validarInputs(
        {
            form: "#NIT_SER601A",
            orden: '1'
        },
        () => { _aceptarfin_SER601A(); },
        () => {
            SER601A.NITW = $('#nit_SER601A').val();
            if (SER601A.NITW.trim() == '' || parseInt(SER601A.NITW) == 0) {
                SER601A.NITW = 99;
                $('#nit_SER601A').val(SER601A.NITW);
                $('#descripnit_SER601A').val("TODAS LAS ENTIDADES");
                _leerfacturas_SER601A();
            } else {
                if (SER601A.NITW == '99') {
                    $('#descripnit_SER601A').val("TODAS LAS ENTIDADES");
                    _leerfacturas_SER601A();
                } else {
                    let URL = get_url("APP/CONTAB/CON802_01.DLL");
                    postData({
                        datosh: datosEnvio() + SER601A.NITW.padStart(10, '0') + "|",
                    }, URL)
                        .then(data => {
                            SER601A.TERCEROS = data.TERCER[0];
                            $('#descripnit_SER601A').val(SER601A.TERCEROS.DESCRIP_TER);
                            _leerfacturas_SER601A();
                        }).catch(error => {
                            CON851("01", "01", this._aceptarentidad_SER601A(), "error", "error");
                        });
                }
            }
        }
    )
}


function _leerfacturas_SER601A() {
    loader("show");
    let URL = get_url("APP/SALUD/SER601A.DLL");
    postData({ datosh: datosEnvio() + SER601A.LLAVENUMINI + '|' + SER601A.LLAVENUMFIN + '|' + SER601A.FECHAINI + '|' + SER601A.FECHAFIN + '|' + SER601A.NITW + '|' + $_ADMINW + '|' }, URL)
        .then(data => {
            console.log(data)
            let array = data.CONTAB.filter(x => x.FACT2.trim() != '')
            data = array
            console.log(data)
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
                archivo: $_ADMINW + 'P' + $_FECHACT + moment().format('YYYYMMDDHHmmssS'),
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
            console.error(err);
            loader("hide");
            CON851('', 'Hubo un error en la consulta del dll', _toggleNav(), 'error', 'Error')
        })
}

