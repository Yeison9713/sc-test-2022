var FAC135C = [];

$(document).ready(() => {
    nombreOpcion('Generación de recibos de caja')
    _inputControl('reset');
    _inputControl('disabled');
    _toggleF8([
        { input: 'codcontable', app: 'FAC135C', funct: _ventanaMaestros },
        { input: 'facturad', app: 'FAC135C', funct: _ventanacomprobante },
    ]);
    obtenerDatosCompletos({ nombreFd: 'CTA-MAYOR', filtro: '4' }, data => {
        data.MAESTROS.pop();
        FAC135C.MAESTROS = data.MAESTROS;
        FAC135C.COMPLIMI = '99999';
        FAC135C.LOTEW = '4R';
        if (SUCURSAL_0A) FAC135C.LOTEW = SUCURSAL_0A;
        FAC135C.NOMBRELOTEW = 'COPAGOS';
        postData({ datosh: `${datosEnvio()}1|${FAC135C.LOTEW}|` }, get_url("APP/SALUD/FAC135.DLL"))
            .then(data => {
                console.log(data);
                $('#nombrelote_FAC135C').val(data.CONSULTA[0].NOMBRE_LOTE);
                FAC135C.CONSECLOTE = data.CONSULTA[0].CONSEC_LOTE;
                let datos_envio = datosEnvio()
                datos_envio += localStorage.getItem('Usuario').trim();
                SolicitarDll({ datosh: datos_envio }, data => {
                    console.debug(data);
                    data = data.split('|');
                    console.debug(data);
                    $_NOMBREOPERW = data[0].trim();
                    var $_SUCOPERW = $_NOMBREOPERW.substring(28, 30);
                    var $_SUCOPERW = '01';
                    console.debug($_SUCOPERW);
                    FAC135C.SUCFACTW = $_SUCOPERW;
                    let URL = get_url("APP/CONTAB/CON007.DLL");
                    var data = {};
                    if (FAC135C.CONSECLOTE == '1') data.datosh = `|${localStorage.Contab}|\\CONTROL\\|${FAC135C.LOTEW}|`
                    else data.datosh = `${datosEnvio()}${FAC135C.LOTEW}|`
                    postData(data, URL)
                        .then(data => {
                            console.debug(data);
                            var data = data.split("|");
                            FAC135C.COMPINGRESO = parseInt(data[1].substring(3, 9)).toString().padStart(6, '0');
                            $('#comprobante_FAC135C').val(FAC135C.COMPINGRESO);
                            FAC135C.ULTFECHANUM = data[2].trim();
                            FAC135C.FECHACOMP = moment().format('YYYY-MM-DD');
                            switch ($_USUA_GLOBAL[0].NIT) {
                                case 900004059:
                                    FAC135C.HORACORTE = '0630';
                                    FAC135C.FECHACOMP = moment(FAC135C.FECHACOMP).subtract(1, 'days');
                                    break;
                                default:
                                    FAC135C.HORACORTE = '0000'
                                    break;
                            }
                            $('#nombreusu_FAC135C').val(FAC135C.LOTEW + ' ' + $_USUA_GLOBAL[0].NOMBRE);
                            $('#fechaelaboracion_FAC135C').val(FAC135C.FECHACOMP);
                            let params = {
                              2: {
                                MAYLIMI1: "2320",
                                MAYDEUD1: "1605",
                                MAYINV: "13",
                                MAYDIF: "17",
                                MAYRET1: "2330",
                                MAYRET2: "2330",
                                MAYMEDI: "2815",
                                SCTAOTROS: "80",
                                CTACAJA: "11050100001",
                                CTACOPAGO: "28150500010",
                                CTACAPITA: "168090CAP01",
                                ACTPARTIC1: "25",
                                ACTPARTIC2: "30",
                              },
                              3: {
                                MAYLIMI1: "2365",
                                MAYDEUD1: "1305",
                                MAYDEUD2: "1306",
                                MAYINV: "14",
                                MAYDIF: "17",
                                MAYRET1: "2365",
                                MAYRET2: "2367",
                                MAYMEDI: "2815",
                                SCTAOTROS: "80",
                                CTACAJA: "11050100001",
                                CTACOPAGO: "28150500010",
                                CTACAPITA: "138090CAP01",
                                ACTPARTIC1: "25",
                                ACTPARTIC2: "30",
                              },
                              4: {
                                MAYLIMI1: "2325",
                                MAYDEUD1: "1409",
                                MAYINV: "17",
                                MAYRET1: "2436",
                                MAYRET2: "2436",
                                MAYMEDI: "2815",
                                CTACAJA: "11050100001",
                                CTACOPAGO: "29050500010",
                                CTACAPITA: "147090CAP01",
                                ACTPARTIC1: "27",
                                ACTPARTIC2: "27",
                              },
                              5: {
                                MAYLIMI1: "2201",
                                MAYDEUD1: "1301",
                                MAYDEUD2: "1301",
                                MAYINV: "14",
                                MAYDIF: "17",
                                MAYRET1: "2201",
                                MAYRET2: "2201",
                                MAYMEDI: "2815",
                                SCTAOTROS: "80",
                                CTACAJA: "11050500001",
                                CTACOPAGO: "28150500010",
                                CTACAPITA: "138090CAP01",
                                ACTPARTIC1: "25",
                                ACTPARTIC2: "30",
                              },
                              6: {
                                MAYLIMI1: "2425",
                                MAYDEUD1: "1319",
                                MAYDEUD2: "1319",
                                MAYINV: "17",
                                MAYRET1: "2436",
                                MAYRET2: "2436",
                                MAYMEDI: "2815",
                                SCTAOTROS: "95",
                                CTACAJA: "11050100001",
                                CTACOPAGO: "24070600010",
                                CTACAPITA: "138490CAP01",
                                ACTPARTIC1: "27",
                                ACTPARTIC2: "16",
                              },
                            };
                            FAC135C.CTASEXEP = params[parseInt($_USUA_GLOBAL[0].PUC)];
                            let Window = BrowserWindow.getAllWindows();
                            if (Window.length > 1) {
                                $('#anodir_FAC135C').val(moment().format('YYYY'));
                                prefijoMask_FAC135C.typedValue = 'C';
                                nronumMask_FAC135C.typedValue = $_MESSAGE[2].comprobante;
                                tipofactMask_FAC135C.typedValue = $_MESSAGE[2].tipofact;
                            }
                            _evaluaranodir_FAC135C();
                        })
                        .catch(err => {
                            console.debug(err);
                        })
                }, get_url('APP/CONTAB/CON003.DLL'));
            })
            .catch(err => {
                console.error(err);
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    setTimeout(_cerrarSegundaVentana, 500);
                } else {
                    _toggleNav();
                }
            })
    });
})

function _ventanaMaestros(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA PLAN DE CUENTAS",
            columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "NOMBRE_MAE", "TIPO_MAE"],
            data: FAC135C.MAESTROS,
            callback_esc: function () {
                $("#codcontable_FAC135C").focus();
            },
            callback: function (data) {
                console.debug(data);
                $('#codcontable_FAC135C').val(data.CTA_MAY + data.SUB_CTA + data.AUX_MAE);
                _enterInput('#codcontable_FAC135C');
            }
        });
    }
}

function _evaluaranodir_FAC135C() {
    validarInputs({
        form: '#VALIDAR1_FAC135C',
        orden: '1'
    },
        () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                // RECOMENDACION DE JEISON PARA NO DEJAR QUE LA FACTURA SE HAGA SIN COPAGO
                _evaluaranodir_FAC135C();
            } else {
                _toggleNav();
            }
        },
        () => {
            FAC135C.ANODIRW = $('#anodir_FAC135C').val();
            if (FAC135C.SUCFACTW.trim() == '') {
                _evaluarsucursal_FAC135C();
            } else {
                $('#sucursal_FAC135C').val(FAC135C.SUCFACTW);
                _evaluarfactura_FAC135C();
            }
        }
    )
}

function _evaluarsucursal_FAC135C() {
    $('#sucursal_FAC135C').val($_USUA_GLOBAL[0].PREFIJ);
    validarInputs({
        form: '#VALIDAR2_FAC135C',
        orden: '1'
    },
        _evaluaranodir_FAC135C,
        () => {
            FAC135C.SUCFACTW = $('#sucursal_FAC135C').val();
            _evaluarfactura_FAC135C('1');
        }
    )
}

function _evaluarfactura_FAC135C() {
    validarInputs({
        form: '#VALIDAR3_FAC135C',
        orden: '1'
    },
        _evaluaranodir_FAC135C,
        () => {
            FAC135C.PREFIJOW = prefijoMask_FAC135C.value;
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) _evaluartipofact_FAC135C()
            else if (FAC135C.PREFIJOW.trim() == '') _evaluarfactura_FAC135C()
            else _evaluarnrofact_FAC135C()
        }
    )
}

function _evaluarnrofact_FAC135C() {
    validarInputs({
        form: '#VALIDAR4_FAC135C',
        orden: '1'
    },
        _evaluarfactura_FAC135C,
        () => {
            FAC135C.NRONUMW = nronumMask_FAC135C.value;
            if (FAC135C.NRONUMW.trim() == '') _evaluarnrofact_FAC135C()
            else _evaluartipofact_FAC135C()
        }
    )
}

function _evaluartipofact_FAC135C() {
    validarInputs(
      {
        form: "#VALIDAR5_FAC135C",
        orden: "1",
      },
      _evaluarfactura_FAC135C,
      () => {
        FAC135C.NRONUMW = nronumMask_FAC135C.value;
        FAC135C.CLFACTW = tipofactMask_FAC135C.value;

        let URL = get_url("APP/SALUD/FAC135C.DLL");
        postData(
          {
            datosh:
              datosEnvio() +
              "1|" +
              FAC135C.SUCFACTW +
              FAC135C.CLFACTW +
              FAC135C.NRONUMW.padStart(6, "0") +
              "|" +
              FAC135C.CLFACTW +
              "|" +
              FAC135C.FECHACOMP.replace(/-/g, "") +
              "|",
          },
          URL
        )
          .then((data) => {
            FAC135C.TOTALFACT = data.VLRCOPAGO[0].TOTALFACT.trim();
            FAC135C.TOTALFACT = "" ? "0" : (FAC135C.TOTALFACT = FAC135C.TOTALFACT);
            FAC135C.COPAGOESTW = data.VLRCOPAGO[0].COPAGO;
            FAC135C.DESCRIPTER = data.VLRCOPAGO[0].DESCRIP_TER;
            FAC135C.DESCRIPPACI = data.VLRCOPAGO[0].DESCRIP_PACI;
            FAC135C.IDPACI = data.VLRCOPAGO[0].ID_PACI;
            FAC135C.CODTER = data.VLRCOPAGO[0].COD_TER;
            FAC135C.ACTTER = data.VLRCOPAGO[0].ACT_TER;
            FAC135C.TABLA = [];
            FAC135C.TABLAALTERNA = [];
            FAC135C.CTAFACT = data.VLRCOPAGO[0].CTA_FACT;
            if (parseInt(FAC135C.TOTALFACT) <= 0) {
              CON851("", "16", null, "error", "Error");
              _evaluaranodir_FAC135C();
            } else {
              FAC135C.COPAGOESTW = FAC135C.TOTALFACT;
              if (parseInt(FAC135C.COPAGOESTW) <= 0) {
                CON851("", "07", null, "error", "Error");
                _evaluaranodir_FAC135C();
              } else {
                if (FAC135C.ACTTER == "01") {
                  FAC135C.ACTTER = "25";
                }
                if (
                  ($_USUA_GLOBAL[0].PUC == "4" || $_USUA_GLOBAL[0].PUC == "6") &&
                  (FAC135C.ACTTER == "41" ||
                    FAC135C.ACTTER == "42" ||
                    FAC135C.ACTTER == "43" ||
                    FAC135C.ACTTER == "44" ||
                    FAC135C.ACTTER == "45" ||
                    FAC135C.ACTTER == "46")
                ) {
                  FAC135C.ACTTER = "31";
                }
                if (
                //   (FAC135C.CLFACTW == "D" || FAC135C.CLFACTW == "E" || FAC135C.CLFACTW == "C") &&
                  (FAC135C.PREFIJOW == "D" || FAC135C.PREFIJOW == "E" || FAC135C.PREFIJOW == "C") &&
                  FAC135C.ACTTER != FAC135C.CTASEXEP.ACTPARTIC1 &&
                  FAC135C.ACTTER != FAC135C.CTASEXEP.ACTPARTIC2
                ) {
                  let params = {
                    1: { CODIGOCONTROL: "13050500001" },
                    3: { CODIGOCONTROL: FAC135C.CTASEXEP.CTACOPAGO },
                    4: { CODIGOCONTROL: FAC135C.CTASEXEP.CTACOPAGO },
                    5: { CODIGOCONTROL: FAC135C.CTASEXEP.CTACOPAGO },
                    6: { CODIGOCONTROL: FAC135C.CTASEXEP.CTACOPAGO, FLUJOARR: "112" },
                  };
                  FAC135C.TABLA.CODIGOCONTROL = params[parseInt($_USUA_GLOBAL[0].PUC)];
                  FAC135C.TABLA.CODIGOCONTROL = FAC135C.TABLA.CODIGOCONTROL.CODIGOCONTROL;
                  console.debug(FAC135C.TABLA);
                } else {
                  let params = {
                    1: { CODIGOCONTROL: "13050500001" },
                    2: { CODIGOCONTROL: "16150200001" },
                    3: { CODIGOCONTROL: "13052500001" },
                    4: { CODIGOCONTROL: "14090700001", FLUJOARR: "112" },
                    5: { CODIGOCONTROL: "13012506025" },
                    6: { CODIGOCONTROL: "13191600001", FLUJOARR: "112" },
                  };
                  // HICE CAMBIO EN EL PUC-USU 5 ANTES ESTABA ASI 13012406025 ATT: DIANA ESCOBAR
                  FAC135C.TABLA.CODIGOCONTROL = params[parseInt($_USUA_GLOBAL[0].PUC)];
                  FAC135C.TABLA.CODIGOCONTROL = FAC135C.TABLA.CODIGOCONTROL.CODIGOCONTROL;
                  console.debug(FAC135C.TABLA);
                }
                console.debug(FAC135C.TABLA);
                FAC135C.TABLA.NITARR = FAC135C.CODTER;
                console.debug(FAC135C.TABLA);
                FAC135C.TABLA.SUCURSALARR = FAC135C.CLFACTW;
                // if (FAC135C.PREFIJOW == 'C') {
                //     FAC135C.TABLA.SUCURSALARR = 'E';
                // }
                FAC135C.TABLA.DOCUMARR = FAC135C.NRONUMW;
                FAC135C.TABLA.COSTOARR = "00";
                FAC135C.TABLA.VALORARR = parseFloat(FAC135C.COPAGOESTW) * -1;
                FAC135C.TABLA.DETALLEARR =
                  FAC135C.CTAFACT + " " + FAC135C.IDPACI + " " + FAC135C.DESCRIPPACI.replace(/\s{2,}/g, " ");
                FAC135C.TABLA.TIPODOCARR = FAC135C.CLFACTW;
                // FAC135C.TABLAALTERNA = FAC135C.TABLA;
                // console.debug(FAC135C.TABLA, FAC135C.TABLAALTERNA)
                FAC135C.TABLAALTERNA.VALORARR = parseFloat(FAC135C.COPAGOESTW);
                FAC135C.TABLAALTERNA.CODIGOCONTROL = FAC135C.CTASEXEP.CTACAJA;
                FAC135C.TABLAALTERNA.COSTOARR = "00";
                FAC135C.TABLAALTERNA.NITARR = FAC135C.TABLA.NITARR;
                FAC135C.TABLAALTERNA.SUCURSALARR = FAC135C.TABLA.SUCURSALARR;
                FAC135C.TABLAALTERNA.DOCUMARR = FAC135C.TABLA.DOCUMARR;
                FAC135C.TABLAALTERNA.TIPODOCARR = FAC135C.TABLA.TIPODOCARR;
                FAC135C.TABLAALTERNA.FLUJOARR = "*";
                FAC135C.TABLAALTERNA.DETALLEARR = FAC135C.TABLA.DETALLEARR;
                if (FAC135C.FLUJOARR == undefined) {
                  FAC135C.FLUJOARR = "           ";
                }
                console.debug(FAC135C.TABLA, FAC135C.TABLAALTERNA);
                _mostrarTabla_FAC135C();
              }
            }
          })
          .catch((err) => {
            console.debug(err);
            _evaluarfactura_FAC135C("1");
          });
      }
    );
}


function _mostrarTabla_FAC135C() {
    // FAC135C.TABLA.VALORARR < 0 ? FAC135C.TABLA.VLREDIT = 0 : FAC135C.TABLA.VLREDIT = FAC135C.TABLA.VALORARR;
    $('#COPAGOS_FAC135C tbody').html('');
    $('#COPAGOS_FAC135C tbody').append(
        '<tr>' +
        '<th>001</th>' +
        '<th>' + FAC135C.TABLA.CODIGOCONTROL + '</th>' +
        '<th></th>' +
        '<th>' + FAC135C.TABLA.NITARR + '</th>' +
        '<th>' + FAC135C.TABLA.SUCURSALARR + ' ' + FAC135C.TABLA.DOCUMARR.padStart(6, '0') + '</th>' +
        '<th></th>' +
        '<th>' + FAC135C.TABLA.VALORARR + '</th>' +
        '</tr>'
    )
    // FAC135C.TABLAALTERNA.VALORARR < 0 ? FAC135C.TABLAALTERNA.VLREDIT = 0 : FAC135C.TABLAALTERNA.VLREDIT = FAC135C.TABLAALTERNA.VALORARR, FAC135C.TABLAALTERNA.VALORARR = 0;
    $('#COPAGOS_FAC135C tbody').append(
        '<tr>' +
        '<th>002</th>' +
        '<th>' + FAC135C.TABLAALTERNA.CODIGOCONTROL + '</th>' +
        '<th></th>' +
        '<th>' + FAC135C.TABLAALTERNA.NITARR + '</th>' +
        '<th>' + FAC135C.TABLAALTERNA.SUCURSALARR + ' ' + FAC135C.TABLA.DOCUMARR.padStart(6, '0') + '</th>' +
        '<th>' + FAC135C.TABLAALTERNA.VALORARR + '</th>' +
        '<th></th>' +
        '</tr>'
    )
    _evaluarcodigo_FAC135C();
}

function _evaluarcodigo_FAC135C() {
    $('#numerotabla_FAC135C').val('001');
    $('#codcontable_FAC135C').val(FAC135C.TABLA.CODIGOCONTROL);
    $('#tercerotabla_FAC135C').val(FAC135C.TABLA.NITARR);
    $('#facturatabla_FAC135C').val(FAC135C.TABLA.SUCURSALARR + ' ' + FAC135C.TABLA.DOCUMARR.padStart(6, '0'));
    // $('#debito_FAC135C').val(FAC135C.TABLA.VALORARR);
    debitoMask_FAC135C.typedValue = FAC135C.TABLA.VALORARR.toString();
    $('#detalle_FAC135C').val(FAC135C.CTAFACT + ' ' + FAC135C.DESCRIPPACI);
    $('#totaldebito_FAC135C').val(FAC135C.TABLAALTERNA.VALORARR);
    $('#totalcredito_FAC135C').val(FAC135C.TABLA.VALORARR);
    FAC135C.DESCUADRE = 0; FAC135C.TOTALDEBITOS = 0; FAC135C.TOTALCREDITOS = 0;
    _evaluarcopagos_FAC135C();
}

function _evaluarcopagos_FAC135C() {
    validarInputs({
        form: '#VALIDAR6_FAC135C',
        orden: '1'
    },
        () => {
            $('#COPAGOS_FAC135C tbody').html('');
            _evaluaranodir_FAC135C()
        },
        () => {
            FAC135C.CODIGOCONTROL = $('#codcontable_FAC135C').val();
            let URL = get_url("APP/SALUD/FAC135C.DLL");
            postData({
                datosh: datosEnvio() + '2|' + FAC135C.SUCFACTW + FAC135C.CLFACTW + FAC135C.NRONUMW.padStart(6, '0') + '|' + FAC135C.CLFACTW + '|' + FAC135C.FECHACOMP.replace(/-/g, '') + '|' + FAC135C.CODIGOCONTROL + '|' + FAC135C.TABLA.COSTOARR.padStart(4, '0') + '|'
            }, URL)
                .then((data) => {
                    console.debug(data);
                    $('#nombrecta_FAC135C').val(data.CONSULTA[0].NOMBRE_MAE);
                    $('#centrocosto_FAC135C').val(data.CONSULTA[0].NOMBRE_COSTO);
                    _evaluarvalorarr_FAC135C();
                })
                .catch((error) => {
                    console.log(error);
                    _evaluarcopagos_FAC135C();
                });
        }
    )
}

function _evaluarvalorarr_FAC135C() {
    validarInputs({
        form: '#VALIDAR7_FAC135C',
        orden: '1'
    },
        _evaluarcopagos_FAC135C,
        () => {
            FAC135C.VALORARR = debitoMask_FAC135C.value;
            FAC135C.VALORARR = parseFloat(FAC135C.VALORARR) * -1;
            console.debug(FAC135C.VALORARR);
            var total = FAC135C.VALORARR + parseFloat(FAC135C.TOTALFACT);
            console.debug(total);
            $('#debito_FAC135C').val(FAC135C.VALORARR);
            if (FAC135C.VALORARR > 0) {
                CON851('', '46', null, 'error', 'Error');
                _evaluarvalorarr_FAC135C();
            } else if (total < 0) {
                CON851('', '07', null, 'error', 'Error');
                _evaluarvalorarr_FAC135C();
            } else {
                // $('#COPAGOS_FAC135C tbody tr').find('th').eq(6).text(FAC135C.VALORARR);
                // FAC135C.DESCUADRE = FAC135C.DESCUADRE + FAC135C.VALORARR;
                // if (FAC135C.VALORARR > 0){
                //     FAC135C.TOTALDEBITOS = FAC135C.TOTALDEBITOS + FAC135C.VALORARR;
                // } else {
                //     FAC135C.TOTALCREDITOS = FAC135C.TOTALCREDITOS + FAC135C.VALORARR;
                // }
                $('#totaldebito_FAC135C').val(FAC135C.VALORARR * -1);
                $('#totalcredito_FAC135C').val(FAC135C.VALORARR);
                _evaluardocumento_FAC135C();
            }
        }
    )
}

function _evaluardocumento_FAC135C() {
    $('#documento_FAC135C').val('EFECTV');
    validarInputs({
        form: '#VALIDAR8_FAC135C',
        orden: '1'
    },
        () => { _evaluarvalorarr_FAC135C() },
        () => {
            FAC135C.REFERENCIAW = $('#documento_FAC135C').val();
            if (FAC135C.REFERENCIAW.trim() == '') {
                _evaluardocumento_FAC135C();
            } else {
                CON851P('00', _evaluardocumento_FAC135C, _grabarnumerocomp_FAC135C);
            }
        }
    )
}

function _grabarnumerocomp_FAC135C() {
    let URL = get_url("APP/CONTAB/CON007.DLL");
    var data = {};
    if (FAC135C.CONSECLOTE == '1') data.datosh = `|${localStorage.Contab}|\\CONTROL\\|${FAC135C.LOTEW}|`
    else data.datosh = `${datosEnvio()}${FAC135C.LOTEW}|`
    postData(data, URL)
        .then(data => {
            console.debug(data);
            data = data.split('|');
            FAC135C.COMPINGRESO = parseInt(data[1].substring(3, 9)).toString().padStart(6, '0');
            FAC135C.COMPCTL = FAC135C.COMPINGRESO = data[1].substring(3, 9);
            var valorarr = FAC135C.VALORARR.toFixed(2);
            var negative = false;
            if (valorarr.match('-')) {
                valorarr = valorarr.replace('-', '');
                negative = true;
            }
            valorarr = valorarr.toString().replace(/,/g, '').padStart(13, '0');
            if (negative) valorarr = '-' + valorarr;
            valorarr2 = parseFloat(valorarr2);
            var valorarr2 = FAC135C.VALORARR.toFixed(2);
            valorarr2 = valorarr2.replace('-', '');
            valorarr2 = valorarr2.toString().replace(/,/g, '').padStart(14, '0');
            data.datosh = `${datosEnvio()}` + '3|' + FAC135C.SUCFACTW + FAC135C.CLFACTW + FAC135C.NRONUMW.padStart(6, '0') + '|' + FAC135C.CLFACTW + '|' + FAC135C.FECHACOMP.replace(/-/g, '') + '|' + FAC135C.CODIGOCONTROL + '|' + FAC135C.TABLA.COSTOARR.padStart(4, '0') + '|' + FAC135C.LOTEW + '|' + FAC135C.COMPINGRESO + '|'
            // if (FAC135C.CONSECLOTE == '1') data.datosh = `|${localStorage.Contab}|\\CONTROL\\|` + '3|' + FAC135C.SUCFACTW + FAC135C.CLFACTW + FAC135C.NRONUMW.padStart(6, '0') + '|' + FAC135C.CLFACTW + '|' + FAC135C.FECHACOMP.replace(/-/g, '') + '|' + FAC135C.CODIGOCONTROL + '|' + FAC135C.TABLA.COSTOARR.padStart(4, '0') + '|' + FAC135C.LOTEW + '|' + FAC135C.COMPINGRESO + '|'
            // else data.datosh = `${datosEnvio()}` + '3|' + FAC135C.SUCFACTW + FAC135C.CLFACTW + FAC135C.NRONUMW.padStart(6, '0') + '|' + FAC135C.CLFACTW + '|' + FAC135C.FECHACOMP.replace(/-/g, '') + '|' + FAC135C.CODIGOCONTROL + '|' + FAC135C.TABLA.COSTOARR.padStart(4, '0') + '|' + FAC135C.LOTEW + '|' + FAC135C.COMPINGRESO + '|'
            let URL = get_url("APP/SALUD/FAC135C.DLL");
            postData(data, URL)
                .then((data) => {
                    console.debug(data);
                    var datos_envio = datosEnvio() + FAC135C.LOTEW + '|' + FAC135C.FECHACOMP.replace(/-/g, '') + '|' + FAC135C.COMPINGRESO + '|'
                    console.debug(datos_envio);
                    var data = {};
                    if (FAC135C.CONSECLOTE == '1') data.datosh = `|${localStorage.Contab}|\\CONTROL\\|${FAC135C.LOTEW}|${moment().format('YYMMDD')}|${FAC135C.COMPINGRESO}|`
                    else data.datosh = `${datosEnvio()}${FAC135C.LOTEW}|${moment().format('YYMMDD')}|${FAC135C.COMPINGRESO}|`
                    SolicitarDll(data, data => {
                        console.debug(data);
                        let URL = get_url("APP/SALUD/FAC135C.DLL");
                        var data = {};
                        data.datosh = `${datosEnvio()}` + '4|' + FAC135C.SUCFACTW + FAC135C.CLFACTW + FAC135C.NRONUMW.padStart(6, '0') + '|' + FAC135C.CLFACTW + '|' + FAC135C.FECHACOMP.replace(/-/g, '').substring(2, 8) + '|' + FAC135C.CODIGOCONTROL + '|' + FAC135C.TABLA.COSTOARR.padStart(4, '0') + '|' + FAC135C.LOTEW + '|' + FAC135C.COMPINGRESO + '|' + localStorage.getItem('Usuario').trim() + '|' + FAC135C.CODIGOCONTROL + '|' + FAC135C.TABLA.NITARR + '|' + valorarr + '|' + FAC135C.TABLA.COSTOARR + '|' + FAC135C.TABLA.SUCURSALARR + '|' + FAC135C.TABLA.DOCUMARR.padStart(6, '0') + '|' + FAC135C.TABLA.DETALLEARR + '|' + FAC135C.SUCFACTW + '|' + FAC135C.TABLA.FLUJOARR + '|' + FAC135C.TABLA.TIPODOCARR + '|' + '001' + '|' + FAC135C.CTASEXEP.MAYDEUD1 + '|' + FAC135C.CTASEXEP.MAYDEUD2 + '|' + FAC135C.CTASEXEP.SCTAOTROS + '|' + FAC135C.CTASEXEP.CTACOPAGO + '|' + tipofactMask_FAC135C.value + '|' + FAC135C.REFERENCIAW + '|'
                        // if (FAC135C.CONSECLOTE == '1') data.datosh = `|${localStorage.Contab}|\\CONTROL\\|` + '4|' + FAC135C.SUCFACTW + FAC135C.CLFACTW + FAC135C.NRONUMW.padStart(6, '0') + '|' + FAC135C.CLFACTW + '|' + FAC135C.FECHACOMP.replace(/-/g, '').substring(2, 8) + '|' + FAC135C.CODIGOCONTROL + '|' + FAC135C.TABLA.COSTOARR.padStart(4, '0') + '|' + FAC135C.LOTEW + '|' + FAC135C.COMPINGRESO + '|' + localStorage.getItem('Usuario').trim() + '|' + FAC135C.CODIGOCONTROL + '|' + FAC135C.TABLA.NITARR + '|' + valorarr + '|' + FAC135C.TABLA.COSTOARR + '|' + FAC135C.TABLA.SUCURSALARR + '|' + FAC135C.TABLA.DOCUMARR.padStart(6, '0') + '|' + FAC135C.TABLA.DETALLEARR + '|' + FAC135C.SUCFACTW + '|' + FAC135C.TABLA.FLUJOARR + '|' + FAC135C.TABLA.TIPODOCARR + '|' + '001' + '|' + FAC135C.CTASEXEP.MAYDEUD1 + '|' + FAC135C.CTASEXEP.MAYDEUD2 + '|' + FAC135C.CTASEXEP.SCTAOTROS + '|' + FAC135C.CTASEXEP.CTACOPAGO + '|' + tipofactMask_FAC135C.value + '|' + FAC135C.REFERENCIAW + '|'
                        // else data.datosh = `${datosEnvio()}` + '4|' + FAC135C.SUCFACTW + FAC135C.CLFACTW + FAC135C.NRONUMW.padStart(6, '0') + '|' + FAC135C.CLFACTW + '|' + FAC135C.FECHACOMP.replace(/-/g, '').substring(2, 8) + '|' + FAC135C.CODIGOCONTROL + '|' + FAC135C.TABLA.COSTOARR.padStart(4, '0') + '|' + FAC135C.LOTEW + '|' + FAC135C.COMPINGRESO + '|' + localStorage.getItem('Usuario').trim() + '|' + FAC135C.CODIGOCONTROL + '|' + FAC135C.TABLA.NITARR + '|' + valorarr + '|' + FAC135C.TABLA.COSTOARR + '|' + FAC135C.TABLA.SUCURSALARR + '|' + FAC135C.TABLA.DOCUMARR.padStart(6, '0') + '|' + FAC135C.TABLA.DETALLEARR + '|' + FAC135C.SUCFACTW + '|' + FAC135C.TABLA.FLUJOARR + '|' + FAC135C.TABLA.TIPODOCARR + '|' + '001' + '|' + FAC135C.CTASEXEP.MAYDEUD1 + '|' + FAC135C.CTASEXEP.MAYDEUD2 + '|' + FAC135C.CTASEXEP.SCTAOTROS + '|' + FAC135C.CTASEXEP.CTACOPAGO + '|' + tipofactMask_FAC135C.value + '|' + FAC135C.REFERENCIAW + '|'
                        postData(data, URL)
                            .then((data) => {
                                console.debug(data);
                                let URL = get_url("APP/SALUD/FAC135C.DLL");
                                data = {};
                                data.datosh = `${datosEnvio()}` + '4|' + FAC135C.SUCFACTW + FAC135C.CLFACTW + FAC135C.NRONUMW.padStart(6, '0') + '|' + FAC135C.CLFACTW + '|' + FAC135C.FECHACOMP.replace(/-/g, '').substring(2, 8) + '|' + FAC135C.CODIGOCONTROL + '|' + FAC135C.TABLA.COSTOARR.padStart(4, '0') + '|' + FAC135C.LOTEW + '|' + FAC135C.COMPINGRESO + '|' + localStorage.getItem('Usuario').trim() + '|' + FAC135C.TABLAALTERNA.CODIGOCONTROL + '|' + FAC135C.TABLAALTERNA.NITARR + '|' + valorarr2 + '|' + FAC135C.TABLAALTERNA.COSTOARR + '|' + FAC135C.TABLAALTERNA.SUCURSALARR + '|' + FAC135C.TABLAALTERNA.DOCUMARR.padStart(6, '0') + '|' + FAC135C.TABLAALTERNA.DETALLEARR + '|' + FAC135C.SUCFACTW + '|' + FAC135C.TABLAALTERNA.FLUJOARR + '|' + FAC135C.TABLAALTERNA.TIPODOCARR + '|' + '002' + '|' + FAC135C.CTASEXEP.MAYDEUD1 + '|' + FAC135C.CTASEXEP.MAYDEUD2 + '|' + FAC135C.CTASEXEP.SCTAOTROS + '|' + FAC135C.CTASEXEP.CTACOPAGO + '|' + tipofactMask_FAC135C.value + '|' + FAC135C.REFERENCIAW + '|'
                                // if (FAC135C.CONSECLOTE == '1') data.datosh = `|${localStorage.Contab}|\\CONTROL\\|` + '4|' + FAC135C.SUCFACTW + FAC135C.CLFACTW + FAC135C.NRONUMW.padStart(6, '0') + '|' + FAC135C.CLFACTW + '|' + FAC135C.FECHACOMP.replace(/-/g, '').substring(2, 8) + '|' + FAC135C.CODIGOCONTROL + '|' + FAC135C.TABLA.COSTOARR.padStart(4, '0') + '|' + FAC135C.LOTEW + '|' + FAC135C.COMPINGRESO + '|' + localStorage.getItem('Usuario').trim() + '|' + FAC135C.TABLAALTERNA.CODIGOCONTROL + '|' + FAC135C.TABLAALTERNA.NITARR + '|' + valorarr2 + '|' + FAC135C.TABLAALTERNA.COSTOARR + '|' + FAC135C.TABLAALTERNA.SUCURSALARR + '|' + FAC135C.TABLAALTERNA.DOCUMARR.padStart(6, '0') + '|' + FAC135C.TABLAALTERNA.DETALLEARR + '|' + FAC135C.SUCFACTW + '|' + FAC135C.TABLAALTERNA.FLUJOARR + '|' + FAC135C.TABLAALTERNA.TIPODOCARR + '|' + '002' + '|' + FAC135C.CTASEXEP.MAYDEUD1 + '|' + FAC135C.CTASEXEP.MAYDEUD2 + '|' + FAC135C.CTASEXEP.SCTAOTROS + '|' + FAC135C.CTASEXEP.CTACOPAGO + '|' + tipofactMask_FAC135C.value + '|' + FAC135C.REFERENCIAW + '|'
                                // else data.datosh = `${datosEnvio()}` + '4|' + FAC135C.SUCFACTW + FAC135C.CLFACTW + FAC135C.NRONUMW.padStart(6, '0') + '|' + FAC135C.CLFACTW + '|' + FAC135C.FECHACOMP.replace(/-/g, '').substring(2, 8) + '|' + FAC135C.CODIGOCONTROL + '|' + FAC135C.TABLA.COSTOARR.padStart(4, '0') + '|' + FAC135C.LOTEW + '|' + FAC135C.COMPINGRESO + '|' + localStorage.getItem('Usuario').trim() + '|' + FAC135C.TABLAALTERNA.CODIGOCONTROL + '|' + FAC135C.TABLAALTERNA.NITARR + '|' + valorarr2 + '|' + FAC135C.TABLAALTERNA.COSTOARR + '|' + FAC135C.TABLAALTERNA.SUCURSALARR + '|' + FAC135C.TABLAALTERNA.DOCUMARR.padStart(6, '0') + '|' + FAC135C.TABLAALTERNA.DETALLEARR + '|' + FAC135C.SUCFACTW + '|' + FAC135C.TABLAALTERNA.FLUJOARR + '|' + FAC135C.TABLAALTERNA.TIPODOCARR + '|' + '002' + '|' + FAC135C.CTASEXEP.MAYDEUD1 + '|' + FAC135C.CTASEXEP.MAYDEUD2 + '|' + FAC135C.CTASEXEP.SCTAOTROS + '|' + FAC135C.CTASEXEP.CTACOPAGO + '|' + tipofactMask_FAC135C.value + '|' + FAC135C.REFERENCIAW + '|'
                                postData(data, URL)
                                    .then((data) => {
                                        console.log(data);
                                        data = {};
                                        console.log('aca');
                                        data.datosh = `${datosEnvio()}` + FAC135C.LOTEW + "|" + FAC135C.COMPINGRESO + "|" + FAC135C.CTASEXEP.MAYDEUD1 + "|" + FAC135C.CTASEXEP.MAYDEUD2 + "| |",
                                        // if (FAC135C.CONSECLOTE == '1') data.datosh = `|${localStorage.Contab}|\\CONTROL\\|` + FAC135C.LOTEW + "|" + FAC135C.COMPINGRESO + "|" + FAC135C.CTASEXEP.MAYDEUD1 + "|" + FAC135C.CTASEXEP.MAYDEUD2 + "| |"
                                        // else data.datosh = `${datosEnvio()}` + FAC135C.LOTEW + "|" + FAC135C.COMPINGRESO + "|" + FAC135C.CTASEXEP.MAYDEUD1 + "|" + FAC135C.CTASEXEP.MAYDEUD2 + "| |",
                                        console.log('aca');
                                        postData(
                                            data,
                                            URL = get_url("APP/SALUD/FAC145.DLL"),
                                        )
                                            .then(data => {
                                                console.log(data);
                                                FAC145.IMPRESION = new Object();
                                                FAC145.IMPRESION.NITTER = data.IMPRESION[0].NIT_TER;
                                                moment.updateLocale("es", {
                                                    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                                                });
                                                let fecha = data.IMPRESION[0].FECHA_MOV;
                                                if (parseInt(fecha.substring(0, 2)) > 0 && parseInt(fecha.substring(0, 2)) < 70) {
                                                    fecha = "20" + data.IMPRESION[0].FECHA_MOV;
                                                } else {
                                                    fecha = "19" + data.IMPRESION[0].FECHA_MOV;
                                                }
                                                FAC145.IMPRESION.DIRECCPACI = data.IMPRESION[0].DIRECC_PACI;
                                                FAC145.IMPRESION.TELTER = data.IMPRESION[0].TEL_TER;
                                                FAC145.IMPRESION.OPERMOV = data.IMPRESION[0].OPER_MOV;
                                                FAC145.IMPRESION.APELLIDOPACI = data.IMPRESION[0].APELLIDO_PACI;
                                                FAC145.IMPRESION.TELEFONOPACI = data.IMPRESION[0].TELEFONO_PACI;
                                                FAC145.IMPRESION.NETO = data.IMPRESION[0].NETO;
                                                FAC145.IMPRESION.NOMBRECIU = data.IMPRESION[0].NOMBRE_CIU;
                                                FAC145.IMPRESION.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
                                                FAC145.IMPRESION.LOTE = FAC135C.LOTEW;
                                                FAC145.IMPRESION.SUCURSAL = $_USUA_GLOBAL[0].PREFIJ;
                                                FAC145.IMPRESION.NITUSU = $_USUA_GLOBAL[0].NIT;
                                                FAC145.IMPRESION.NOMBRELOTE = FAC135C.NOMBRELOTEW;
                                                FAC145.IMPRESION.COMPROBANTE = FAC135C.COMPINGRESO;
                                                FAC145.IMPRESION.DIRECCIONUSU = $_USUA_GLOBAL[0].DIRECC;
                                                FAC145.IMPRESION.TELEFONOUSU = $_USUA_GLOBAL[0].TEL;
                                                FAC145.IMPRESION.FECHA = moment(fecha).format("MMMM DD YYYY");
                                                FAC145.IMPRESION.NOMBRECIUDADUSU = $_USUA_GLOBAL[0].NOMBRE_CIU;
                                                FAC145.IMPRESION.VLRCREDITO = data.IMPRESION[0].TOTAL_CR;
                                                FAC145.IMPRESION.TABLA = [];
                                                FAC145.IMPRESION.TABLA.push({ CODIGO_CONTROL: data.IMPRESION[0].CUENTA_MOV, NOMBRE: data.IMPRESION[0].NOMBRE_MAE, DOCUM: data.IMPRESION[0].DOCUM_MOV, VALORDEBITO: data.IMPRESION[0].TOTAL_DB, VALORCREDITO: data.IMPRESION[0].TOTAL_CR })
                                                FAC145.IMPRESION.TABLA.push({ CODIGO_CONTROL: data.IMPRESION[1].CUENTA_MOV, NOMBRE: data.IMPRESION[1].NOMBRE_MAE, DOCUM: data.IMPRESION[1].DOCUM_MOV, VALORDEBITO: data.IMPRESION[1].TOTAL_DB, VALORCREDITO: ' ' })
                                                FAC145.IMPRESION.DESCRIPCIONTERCERO = data.IMPRESION[0].DESCRIP_TER;
                                                FAC145.IMPRESION.IDTERCERO = data.IMPRESION[0].ID_PAC;
                                                let valor = FAC146(data.IMPRESION[0].TOTAL_CR.replace(/-/g, ""));
                                                FAC145.IMPRESION.VALORENLETRAS = valor;
                                                FAC145.IMPRESION.DESCRIPCIONID = $_USUA_GLOBAL[0].NOMBRE;
                                                FAC145.IMPRESION.IDMOV = FAC145.IMPRESION.NITUSU;
                                                FAC145.IMPRESION.NIT = $_USUA_GLOBAL[0].NIT.toString().substring(1, 9);
                                                FAC145.IMPRESION.DETALLEMOV = data.IMPRESION[0].DETALLE_MOV;
                                                FAC145.IMPRESION.REFERMOV = data.IMPRESION[0].REFER_MOV;
                                                FAC145.IMPRESION.OTROMOV = data.IMPRESION[0].OTRO_MOV;
                                                FAC145.IMPRESION.TIPOCOMP = data.IMPRESION[0].TIPO_COMP;
                                                FAC145.IMPRESION.COLUMNAS = ["CODIGO_CONTROL", "NOMBRE", "DOCUM", "VALORDEBITO", "VALORCREDITO"];
                                                FAC145.IMPRESION.WIDTH = ['13%', '43%', '15%', '15%', '15%'];
                                                console.log('aca');
                                                _impresioncopagosyrecibosdecaja(FAC145.IMPRESION, _evaluardocumento_FAC135C, () => {
                                                    CON851('', 'Impresion finalizada', null, 'success', '');
                                                    let Window = BrowserWindow.getAllWindows();
                                                    if (Window.length > 1) {
                                                        setTimeout(_cerrarSegundaVentana, 500);
                                                    } else {
                                                        _toggleNav();
                                                    }
                                                });
                                                // callback(data);
                                            })
                                            .catch(error => {
                                                console.error(error);
                                            });
                                        // FAC145({ LOTE: FAC135C.LOTEW, COMPROBANTE: FAC135C.COMPINGRESO, MAYDEUD1: FAC135C.CTASEXEP.MAYDEUD1, MAYDEUD2: FAC135C.CTASEXEP.MAYDEUD2, MAYDEUD3: '' }, () => {
                                        //     CON851('', 'Impresion finalizada', null, 'success', '');
                                        //     let Window = BrowserWindow.getAllWindows();
                                        //     if (Window.length > 1) {
                                        //         // let remote = require("electron").remote;
                                        //         // remote.getCurrentWindow().close();
                                        //         // win.webContents.send("closed2");
                                        //         _cerrarSegundaVentana();
                                        //     } else {
                                        //         _toggleNav();
                                        //     }
                                        // })
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }, get_url('APP/CONTAB/CON007X.DLL'));
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch(err => {
            console.debug(err);
        })
}
function _ventanacomprobante(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        set_Event_validar('#VALIDAR4_FAC135C', 'off');
        $('#facturad_FAC135C').attr('disabled', 'true');
        SER825(_evaluarnrofact_FAC135C, _mostrarcomprobante_FAC135, '1');
    }
}

function _mostrarcomprobante_FAC135(data) {
    FAC135C.FACTURA = data.FACTURA[0];
    $('#sucursal_FAC135C').val(FAC135C.FACTURA.SUC);
    tipofactMask_FAC135C.typedValue = FAC135C.FACTURA.CLASE.substring(0, 1)
    nronumMask_FAC135C.typedValue = FAC135C.FACTURA.NRO
    FAC135C.SUCFACTW = FAC135C.FACTURA.SUC
    FAC135C.CLFACTW = FAC135C.FACTURA.CLASE.substring(0, 1)
    FAC135C.NRONUMW = FAC135C.FACTURA.NRO
    _evaluartipofact_FAC135C()
}



///////////////////////////////////// MASCARAS /////////////////////////////////////////////////////////
var prefijoMask_FAC135C = IMask($("#factura_FAC135C")[0], {
    mask: 'a',
    definitions: {
        'a': /[C,D]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var tipofactMask_FAC135C = IMask($("#tipofact_FAC135C")[0], {
    mask: '0',
    definitions: {
        '0': /[0-7]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var debitoMask_FAC135C = IMask($("#debito_FAC135C")[0], {
    mask: Number,
    scale: 2,
    // thousandsSeparator: ' ',
    normalizeZeros: true,
    padFractionalZeros: true,
    radix: '.',
});
var nronumMask_FAC135C = new IMask($('#facturad_FAC135C')[0], { mask: Number });