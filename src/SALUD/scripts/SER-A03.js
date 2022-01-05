const { Console } = require("console");
const { link } = require("fs");

// // 01-09-2020 DIANA E: creado
moment.locale("es");
var fecha_SERA03 = IMask.createPipe({
  mask: Date,
  pattern: "Y/m/d",
  lazy: true,
  blocks: {
    Y: { mask: IMask.MaskedRange, placeholderChar: "Y", from: "0000", to: "9000", maxLength: 4 },
    m: { mask: IMask.MaskedRange, placeholderChar: "m", from: "00", to: "12", maxLength: 2 },
    d: { mask: IMask.MaskedRange, placeholderChar: "d", from: "00", to: "31", maxLength: 2 },
  },
  format: function (date) {
    return moment(date).format("YYYY/MM/DD");
  },
  parse: function (str) {
    var fecha = moment(str).format("YYYY/MM/DD");
    if (fecha == "Invalid date") return "0000/00/00";
    return str;
  },
});

new Vue({
  el: "#SERA03",
  data: {
    SERA03: [],
    novedad_SERA03: "",
    ano_SERA03: "",
    consecutivo_SERA03: "",
    entidad_SERA03: "",
    descripentidad_SERA03: "",
    descrippaciente_SERA03: "",
    anoent_SERA03: "",
    mesent_SERA03: "",
    diaent_SERA03: "",
    anoaud_SERA03: "",
    mesaud_SERA03: "",
    diaaud_SERA03: "",
    anoultdoc_SERA03: "",
    mesultdoc_SERA03: "",
    diaultdoc_SERA03: "",
    anocontab_SERA03: "",
    mescontab_SERA03: "",
    diacontab_SERA03: "",
    radicado_SERA03: "",
    estado_SERA03: "",
    referencia_SERA03: "",
    motivo_SERA03: "",
    motivod_SERA03: "",
    anomotivo_SERA03: "",
    mesmotivo_SERA03: "",
    diamotivo_SERA03: "",
    respuesta_SERA03: "",
    valorrecobro_SERA03: "",
    responsable_SERA03: "",
    opercreado_SERA03: "",
    fechacreado_SERA03: "",
    opermodif_SERA03: "",
    fechamodif_SERA03: "",
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    // loader("show");
    this.SERA03.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    this.SERA03.ANO_LNK = 20 + this.SERA03.FECHA_LNK.substring(0, 2);
    nombreOpcion("9,7,A,3 - Recepción de Glosas");
    this.SERA03.PREFIJOW = "A";
    if (parseInt($_USUA_GLOBAL[0].FECHALNK.substring(0, 2)) < 90) {
      this.SERA03.FECHALNK = "20" + $_USUA_GLOBAL[0].FECHALNK;
    } else {
      this.SERA03.FECHALNK = "19" + $_USUA_GLOBAL[0].FECHALNK;
    }
    this.SERA03.BANDERAW = 0
    this.SERA03.FECHAACT = this.SERA03.FECHALNK.substring(0, 4) + moment().format("MMDD");
    this.SERA03.PUCUSU = $_USUA_GLOBAL[0].PUC;
    this.SERA03.NITUSU = $_USUA_GLOBAL[0].NIT;
    this.SERA03.PEDIDOUSU = $_USUA_GLOBAL[0].PEDIDO;
    $this = this;
    loader("show");
    obtenerDatosCompletos({ nombreFd: "SUBCUENTASINGRESOSOPER" }, function (data) {
      $this.SERA03.SUBCUENTAS = data();
      $this.SERA03.SUBCUENTAS = $this.SERA03.SUBCUENTAS.CUENTAS;
      loader("hide");
      CON850($this._evaluarCON850_SERA03);
      obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
        data = data.PREFIJOS;
        $this.SERA03.PREFIJOS = data;
        obtenerDatosCompletos({ nombreFd: "COSTOS" }, function (data) {
          data.COSTO.pop();
          $this.SERA03.COSTOS = data.COSTO;
          obtenerDatosCompletos({ nombreFd: "MOTIVOSGLOSA" }, function (data) {
            loader("hide");
            data.MOTIVOS.pop();
            $this.SERA03.MOTIVOS = data.MOTIVOS;
            obtenerDatosCompletos({ nombreFd: "MACROSGLOSA" }, function (data) {
              data.MACROS.pop();
              $this.SERA03.MACROS = data.MACROS;
              obtenerDatosCompletos({ nombreFd: "TERCEROS" }, function (data) {
                loader("hide");
                data.TERCEROS.pop();
                $this.SERA03.TERCEROS = data.TERCEROS;
              });
            });
          });
        });
      });
    });
  },
  methods: {
    _evaluarCON850_SERA03(data) {
      this._inicializar_SERA03();
      this.ano_SERA03 = this.SERA03.ANO_LNK
      this.novedad_SERA03 = `${data.id} - ${data.descripcion}`;
      if (data.id == "F") {
        _toggleNav();
      } else {
        if (data.id == "9") {
          if (localStorage.Usuario.trim() == "GEBC" || localStorage.Usuario.trim() == "ADMI" || localStorage.Usuario.trim() == "BAST" || localStorage.Usuario.trim() == "CAT1" || localStorage.Usuario.trim() == "MARY" || localStorage.Usuario.trim() == "EFEC1") {
            this._consultarnumero_SERA03();
          } else {
            CON851("14", "14", null, "error", "Error");
            setTimeout(() => {
              CON850(this._evaluarCON850_SERA03);
            }, 300);
          }
        } else {
          this._consultarnumero_SERA03();
        }
      }
    },
    _consultarnumero_SERA03() {
      postData({ datosh: datosEnvio() + "9G|" }, get_url("APP/CONTAB/CON007.DLL"))
        .then(data => {
          data = data.split("|");
          let ultimo = "";
          ultimo = parseInt(data[1].substring(3, 9));
          postData({ datosh: datosEnvio() + "5|" + this.ano_SERA03 + ultimo.toString().padStart(6, '0') + '|' }, get_url("APP/SALUD/SER-A03.DLL"))
            .then(data => {
              this.SERA03.SECU = data
              if (this.novedad_SERA03.substring(0, 1) == "7") {
                this.consecutivo_SERA03 = this.SERA03.SECU
              } else {
                this.consecutivo_SERA03 = parseInt(this.SERA03.SECU) - 1;
              }
              this.consecutivo_SERA03 = this.consecutivo_SERA03.toString()
            })
            .catch(err => {
              console.error(err);
              setTimeout(() => {
                CON850(this._evaluarCON850_SERA03);
              }, 300);
            });
          this._evaluarañoglosa_SERA03();
        })
        .catch(err => {
          console.error(err);
          setTimeout(() => {
            CON850(this._evaluarCON850_SERA03);
          }, 300);
        });
    },
    _evaluarañoglosa_SERA03() {
      validarInputs(
        {
          form: "#VALIDAR01_A03",
          orden: "1",
        },
        () => {
          setTimeout(() => {
            CON850(this._evaluarCON850_SERA03);
          }, 300);
        },
        () => {
          if (this.ano_SERA03.length < 4) {
            CON851("", "Digite la fecha completa", this._evaluarañoglosa_SERA03(), "error", "Error");
          } else {
            if (parseInt(this.ano_SERA03) < 1990 || parseInt(this.ano_SERA03) > parseInt(this.SERA03.FECHALNK.substring(0, 4))) {
              CON851("37", "37", null, "error", "Error");
              if (this.novedad_SERA03.substring(0, 1) == "7") {
                this._evaluarañoglosa_SERA03();
              } else {
                this._evaluarnumeroglosa_SERA03();
              }
            } else {
              this._evaluarnumeroglosa_SERA03();
            }
          }
        },
      );
    },
    _evaluarnumeroglosa_SERA03() {
      validarInputs(
        {
          form: "#VALIDAR02_A03",
          orden: "1",
        },
        this._evaluarañoglosa_SERA03,
        () => {
          this._leerconsecutivo_SERA03();
        },
      );
    },
    _leerconsecutivo_SERA03(data) {
      if (data) {
        this.ano_SERA03 = data.GLOSA.substring(0, 4);
        this.consecutivo_SERA03 = data.GLOSA.substring(4, 10);
      }
      this.consecutivo_SERA03 = this.consecutivo_SERA03.padStart(6, "0");
      postData(
        {
          datosh: datosEnvio() + `1|${this.ano_SERA03}${this.consecutivo_SERA03}|`,
        },
        get_url("APP/SALUD/SER-A03.DLL"),
      )
        .then(data => {
          console.debug(data);
          if (this.novedad_SERA03.substring(0, 1) == "7") {
            CON851("00", "00", this._evaluarnumeroglosa_SERA03(), "error", "Error");
          } else {
            this.SERA03.GLOSA = data.GLOSA[0];
            prefijoMask_SERA03.typedValue = data.GLOSA[0].CTA.substring(0, 1);
            numerofacturaMask_SERA03.typedValue = data.GLOSA[0].CTA.substring(1, 7);
            this.anoent_SERA03 = data.GLOSA[0].FECHARECEP.substring(0, 4);
            this.mesent_SERA03 = data.GLOSA[0].FECHARECEP.substring(4, 6);
            this.diaent_SERA03 = data.GLOSA[0].FECHARECEP.substring(6, 8);
            this.anoaud_SERA03 = data.GLOSA[0].FECHA.substring(0, 4);
            this.mesaud_SERA03 = data.GLOSA[0].FECHA.substring(4, 6);
            this.diaaud_SERA03 = data.GLOSA[0].FECHA.substring(6, 8);
            this.entidad_SERA03 = data.GLOSA[0].NIT;
            this.descripentidad_SERA03 = data.GLOSA[0].DESCRIP_NIT.replace(/\�/g, "Ñ");
            pacienteMask_SERA03.typedValue = data.GLOSA[0].PACIENTE;
            this.descrippaciente_SERA03 = data.GLOSA[0].DESCRIP_PAC.replace(/\�/g, "ñ");
            this.anoultdoc_SERA03 = data.GLOSA[0].FECHARESP2.substring(0, 4);
            this.mesultdoc_SERA03 = data.GLOSA[0].FECHARESP2.substring(4, 6);
            this.diaultdoc_SERA03 = data.GLOSA[0].FECHARESP2.substring(6, 8);
            // this.fechacontab_SERA03 = data.GLOSA[0].
            this.radicado_SERA03 = data.GLOSA[0].RADICACION;
            this.estado_SERA03 = data.GLOSA[0].ESTADO;
            let estado = {
              '1': 'REGISTRO OBJECION',
              '2': 'RESPUESTA OBJECION',
              '3': 'GLOSA',
              '4': 'SEGUNDA RESPUESTA',
              '5': 'CONCILIACION',
            }
            this.estado_SERA03 = `${this.estado_SERA03} - ${estado[this.estado_SERA03]}`
            this.SERA03.ESTADOW = parseInt(data.GLOSA[0].ESTADO) - 1;
            itemMask_SERA03.typedValue = "1";
            this.SERA03.ITEMW = parseInt(itemMask_SERA03.value) - 1;
            this.referencia_SERA03 = data.GLOSA[0].TABLA[this.SERA03.ITEMW].REFER;
            this.motivo_SERA03 = data.GLOSA[0].TABLA[this.SERA03.ITEMW].MOTIVO;
            this.motivod_SERA03 = data.GLOSA[0].TABLA[this.SERA03.ITEMW].DESCRIP_MOTIVO;
            this.anomotivo_SERA03 = data.GLOSA[0].TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP.substring(0, 4);
            this.mesmotivo_SERA03 = data.GLOSA[0].TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP.substring(4, 6);
            this.diamotivo_SERA03 = data.GLOSA[0].TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP.substring(6, 8);
            this.respuesta_SERA03 = data.GLOSA[0].TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].DETALLES[0].trim();
            valorglosaMask_SERA03.typedValue = data.GLOSA[0].TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRGLOSA;
            valorsoportadoMask_SERA03.typedValue = data.GLOSA[0].TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRRESPU;
            valoraceptadoMask_SERA03.typedValue = data.GLOSA[0].TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRACEPT;
            totalglosaMask_SERA03.typedValue = data.GLOSA[0].TABLAVALORESGLO[this.SERA03.ESTADOW].TOTGLOSA;
            totalrespuMask_SERA03.typedValue = data.GLOSA[0].TABLAVALORESGLO[this.SERA03.ESTADOW].TOTRESPU;
            totalaceptadoMask_SERA03.typedValue = data.GLOSA[0].TABLAVALORESGLO[this.SERA03.ESTADOW].TOTACEPT;
            this.responsable_SERA03 = `${data.GLOSA[0].RESPONSABLE} ${data.GLOSA[0].DESCRIP_RES}`;
            this.opercreado_SERA03 = `${data.GLOSA[0].OPERCRE} - ${data.GLOSA[0].FECHACRE}`;
            this.opermodif_SERA03 = `${data.GLOSA[0].OPERMOD} - ${data.GLOSA[0].FECHAMOD}`;
            postData(
              {
                datosh: datosEnvio() + `${prefijoMask_SERA03.value.trim()}${numerofacturaMask_SERA03.value.padStart(6, "0")}|`,
              },
              get_url("APP/SALUD/SER808-01.DLL"),
            )
              .then(data => {
                this.SERA03.NUMERACION = data.NUMER19[0];
                this.SERA03.CUFEFACTURA = this.SERA03.NUMERACION.CUFEELEC_NUM.trim();
                var vlr = vlrabono = 0;
                for (var i in this.SERA03.NUMERACION.TABLA_FACT) {
                  let vlrfact = 0;
                  vlrfact = parseFloat(this.SERA03.NUMERACION.TABLA_FACT[i].VLR_FACT);
                  if (isNaN(vlrfact)) vlrfact = 0;
                  vlr = vlrfact + vlr;
                }
                for (var i in this.SERA03.NUMERACION.TABLA_ABON) {
                  let vlrabon = 0;
                  vlrabon = parseFloat(this.SERA03.NUMERACION.TABLA_ABON[i].VLR_ABON);
                  if (isNaN(vlrabon)) vlrabon = 0;
                  vlrabono = vlrabon + vlrabono;
                }
                totalfactMask_SERA03.typedValue = vlr.toString();
                abonosMask_SERA03.typedValue = vlrabono - parseInt(this.SERA03.NUMERACION.COPAGOS_NUM);
                let saldo = vlr - parseInt(this.SERA03.NUMERACION.COPAGOS_NUM) - vlrabono;
                saldofactMask_SERA03.typedValue = saldo.toString();
                if (this.novedad_SERA03.substring(0, 1) != "9") {
                  this._evaluarradicado_SERA03();
                } else {
                  CON851P("02", this._evaluarnumeroglosa_SERA03, () => {
                    postData(
                      {
                        datosh: datosEnvio() + `4|${this.ano_SERA03}${this.consecutivo_SERA03}|`,
                      },
                      get_url("APP/SALUD/SER-A03.DLL"),
                    )
                      .then(data => {
                        this._inicializar_SERA03();
                        CON851("", "EL REGISTRO HA SIDO ELIMINADO", null, "success", "");
                        setTimeout(() => {
                          CON850(this._evaluarCON850_SERA03);
                        }, 300);
                      })
                      .catch(error => {
                        console.error(error);
                      });
                  });
                }
              })
              .catch(error => {
                console.error(error);
                this._evaluarnumeroglosa_SERA03();
              });
          }
        })
        .catch(error => {
          console.error(error);
          if (error.MENSAJE == "01" && this.novedad_SERA03.substring(0, 1) == "7") {
            this.SERA03.GLOSA = new Object();
            this.SERA03.GLOSA.TABLA = [];
            this.SERA03.GLOSA.TABLAVALORESGLO = [];
            if (parseInt(this.SERA03.FECHALNK.substring(4, 6)) > 12) {
              CON851("32", "32", this._evaluarnumeroglosa_SERA03(), "error", "Error");
            } else {
              this.fechaent_SERA03 = this.SERA03.FECHAACT;
              this._evaluarprefijo_SERA03();
            }
          } else {
            this.consecutivo_SERA03 = "";
            this._evaluarnumeroglosa_SERA03();
          }
        });
    },
    _evaluarprefijo_SERA03() {
      validarInputs(
        {
          form: "#VALIDAR03_A03",
          orden: "1",
        },
        this._evaluarañoglosa_SERA03,
        () => {
          let prefijos = this.SERA03.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == prefijoMask_SERA03.value);
          if (prefijos.length > 0) {
            this.SERA03.FECHAINIPREFIJO = prefijos[0].FECHA_INI
            this._evaluarnumerofactura_SERA03();
          } else {
            CON851("01", "01", this._evaluarprefijo_SERA03(), "error", "Error");
          }

        },
      );
    },
    _evaluarnumerofactura_SERA03() {
      validarInputs(
        {
          form: "#VALIDAR04_A03",
          orden: "1",
        },
        this._evaluarañoglosa_SERA03,
        () => {
          postData({ datosh: datosEnvio() + `${prefijoMask_SERA03.value.trim()}${numerofacturaMask_SERA03.value.trim().padStart(6, "0")}|`, },
            get_url("APP/SALUD/SER808-01.DLL"))
            .then(data => {
              this.SERA03.NUMERACION = data.NUMER19[0];
              this.SERA03.CUFEFACTURA = this.SERA03.NUMERACION.CUFEELEC_NUM.trim();
              pacienteMask_SERA03.typedValue = parseInt(this.SERA03.NUMERACION.IDPAC_NUM).toString();
              if (parseInt(this.SERA03.NUMERACION.FACTCAPIT_NUM.substring(1, 7)) > 0 && this.SERA03.NUMERACION.FACTCAPIT_NUM == prefijoMask_SERA03.value.trim() + numerofacturaMask_SERA03.value.padStart(6, "0")) {
                CON851("5C", "5C", this._evaluarnumerofactura_SERA03(), "error", "Error");
              } else {
                if ((this.SERA03.CUFEFACTURA.trim() == '' && prefijoMask_SERA03.value != "Z") || this.SERA03.FECHAINIPREFIJO.substring(0, 4) >= this.SERA03.FECHALNK) {
                  CON851(" ", "Factura no tiene cufe de envio", this._evaluarnumerofactura_SERA03(), "error", "Error");
                } else {
                  var vlr = vlrabono = 0;
                  for (var i in this.SERA03.NUMERACION.TABLA_FACT) {
                    let vlrfact = 0;
                    vlrfact = parseFloat(this.SERA03.NUMERACION.TABLA_FACT[i].VLR_FACT);
                    if (isNaN(vlrfact)) vlrfact = 0;
                    vlr = vlrfact + vlr;
                  }
                  for (var i in this.SERA03.NUMERACION.TABLA_ABON) {
                    let vlrabon = 0;
                    vlrabon = parseFloat(this.SERA03.NUMERACION.TABLA_ABON[i].VLR_ABON);
                    if (isNaN(vlrabon)) vlrabon = 0;
                    vlrabono = vlrabon + vlrabono;
                  }
                  totalfactMask_SERA03.typedValue = vlr.toString();
                  abonosMask_SERA03.typedValue = vlrabono - parseInt(this.SERA03.NUMERACION.COPAGOS_NUM);
                  let saldo = vlr - parseInt(this.SERA03.NUMERACION.COPAGOS_NUM) - vlrabono;
                  saldofactMask_SERA03.typedValue = saldo.toString();
                  if (prefijoMask_SERA03.value.trim() == 'P') pacienteMask_SERA03.typedValue = this.SERA03.NUMERACION.IDPAC_NUM;
                  if (parseInt(this.SERA03.NUMERACION.FECHA_PRE.substring(4, 6)) < 0) {
                    CON851("6T", "6T", null, "warning", "Advertencia");
                  } else if (saldo < 0) {
                    CON851("07", "07", null, "error", "Error");
                    if (this.novedad_SERA03.substring(0, 1) == "7") {
                      if (localStorage.Usuario.trim() == 'GEBC') {
                        this._mostrarentidad_SERA03();
                      } else {
                        this._evaluarnumerofactura_SERA03();
                      }
                    } else {
                      this._mostrarentidad_SERA03();
                    }
                  } else {
                    this._mostrarentidad_SERA03();
                  }
                }
              }
            })
            .catch(error => {
              console.error(error);
              this._evaluarnumerofactura_SERA03();
            });
        },
      );
    },
    _mostrarentidad_SERA03() {
      this.entidad_SERA03 = this.SERA03.NUMERACION.NIT_NUM;
      this.descripentidad_SERA03 = this.SERA03.NUMERACION.DESCRIP_NUM.replace(/\�/g, "Ñ");
      if (prefijoMask_SERA03.value.trim() == "P" || prefijoMask_SERA03.value.trim() == "T") {
        if (this.novedad_SERA03.substring(0, 1) == "7") {
          this.leerpaciente_SERA03();
        } else {
          this._evaluarpaciente_SERA03();
        }
      } else {
        this._evaluarpaciente_SERA03();
      }
    },
    _evaluarpaciente_SERA03() {
      validarInputs(
        {
          form: "#VALIDAR06_A03",
          orden: "1",
        },
        this._evaluarnumerofactura_SERA03,
        this.leerpaciente_SERA03,
      );
    },
    leerpaciente_SERA03() {
      if (pacienteMask_SERA03.value.trim() == "" || parseInt(pacienteMask_SERA03.unmaskedValue) == 0) {
        CON851("", "Por favor digite un paciente", this._evaluarpaciente_SERA03(), "error", "Error");
      } else {
        if (pacienteMask_SERA03.unmaskedValue == '1' && prefijoMask_SERA03.value.trim() == "A") {
          CON851("", "Por favor digite un paciente que correspoda a la factura", this._evaluarpaciente_SERA03(), "error", "Error");
        } else {
          postData(
            {
              datosh: datosEnvio() + `${pacienteMask_SERA03.unmaskedValue.trim().padStart(15, "0")}|`,
            },
            get_url("APP/SALUD/SER810-1.DLL"),
          )
            .then(data => {
              this.descrippaciente_SERA03 = data["REG-PACI"][0]["NOM-PACI1"].replace(/\�/g, "Ñ") + data["REG-PACI"][0]["NOM-PACI2"].replace(/\�/g, "Ñ") + data["REG-PACI"][0]["APELL-PACI1"].replace(/\�/g, "Ñ") + data["REG-PACI"][0]["APELL-PACI2"].replace(/\�/g, "Ñ");
              if (prefijoMask_SERA03.value.trim() == "A") {
                let URL = get_url("APP/SALUD/SER810G" + ".DLL");
                postData({
                  datosh: datosEnvio() + `${prefijoMask_SERA03.value.trim()}${numerofacturaMask_SERA03.value.trim().padStart(6, "0")}|`
                }, URL)
                  .then((data) => {
                    this.SERA03.PACIENTEFACTURA = data.COMPROBANTE
                    let pacientecomp = ''
                    for (var i in this.SERA03.PACIENTEFACTURA) {
                      if (pacienteMask_SERA03.unmaskedValue.trim().padStart(15, "0") == this.SERA03.PACIENTEFACTURA[i].ID) {
                        pacientecomp = this.SERA03.PACIENTEFACTURA[i].ID
                      }
                    }
                    if (pacientecomp != '') {
                      this._consultarexistenciaglosa_SERA03()
                    } else {
                      CON851("", "paciente no corresponde a esta factura!", this._evaluarpaciente_SERA03(), "error", "Error");
                    }
                  })
                  .catch((error) => {
                    console.log(error)
                    this._evaluarpaciente_SERA03();
                  });
              } else {
                this._consultarexistenciaglosa_SERA03();
              }
            })
            .catch(error => {
              console.error(error);
              this.descrippaciente_SERA03 = "******************************";
              if (error.MENSAJE == "01") {
                if (this.novedad_SERA03.substring(0, 1) == "7") {
                  this._evaluarpaciente_SERA03();
                } else {
                  this._consultarexistenciaglosa_SERA03();
                }
              } else {
                this._evaluarpaciente_SERA03();
              }
            });
        }
      }
    },
    _consultarexistenciaglosa_SERA03() {
      postData(
        {
          datosh: datosEnvio() + `2|${this.ano_SERA03}${this.consecutivo_SERA03}||${prefijoMask_SERA03.value.trim()}${numerofacturaMask_SERA03.value.trim().padStart(6, "0")}${pacienteMask_SERA03.unmaskedValue.trim().padStart(15, "0")}|`,
        },
        get_url("APP/SALUD/SER-A03.DLL"),
      )
        .then(data => {
          this.ano_SERA03 = data.substring(0, 4)
          this.consecutivo_SERA03 = data.substring(4, 10)
          this.novedad_SERA03 = `8 - Cambio`;
          this.SERA03.BANDERAW = 1
          CON851("05", "05", this._evaluarpaciente_SERA03(), "error", "Error");
        })
        .catch(error => {
          console.error(error);
          if (this.SERA03.BANDERAW == '1') {
            this._llenaregistro_SERA03()
          } else {
            this.anoent_SERA03 = this.SERA03.FECHAACT.substring(0, 4);
            this.mesent_SERA03 = this.SERA03.FECHAACT.substring(4, 6);
            this.diaent_SERA03 = this.SERA03.FECHAACT.substring(6, 8);
            this._evaluarañofecharecep_SERA03('1')
          }
        });
    },
    _llenaregistro_SERA03() {
      this.consecutivo_SERA03 = this.consecutivo_SERA03.padStart(6, "0");
      postData(
        {
          datosh: datosEnvio() + `1|${this.ano_SERA03}${this.consecutivo_SERA03}|`,
        },
        get_url("APP/SALUD/SER-A03.DLL"),
      )
        .then(data => {
          console.debug(data);
          if (this.novedad_SERA03.substring(0, 1) == "7") {
            CON851("00", "00", this._evaluarnumeroglosa_SERA03(), "error", "Error");
          } else {
            this.SERA03.GLOSA = data.GLOSA[0];
            prefijoMask_SERA03.typedValue = data.GLOSA[0].CTA.substring(0, 1);
            numerofacturaMask_SERA03.typedValue = data.GLOSA[0].CTA.substring(1, 7);
            this.anoent_SERA03 = data.GLOSA[0].FECHARECEP.substring(0, 4);
            this.mesent_SERA03 = data.GLOSA[0].FECHARECEP.substring(4, 6);
            this.diaent_SERA03 = data.GLOSA[0].FECHARECEP.substring(6, 8);
            this.anoaud_SERA03 = data.GLOSA[0].FECHA.substring(0, 4);
            this.mesaud_SERA03 = data.GLOSA[0].FECHA.substring(4, 6);
            this.diaaud_SERA03 = data.GLOSA[0].FECHA.substring(6, 8);
            this.entidad_SERA03 = data.GLOSA[0].NIT;
            this.descripentidad_SERA03 = data.GLOSA[0].DESCRIP_NIT.replace(/\�/g, "Ñ");
            pacienteMask_SERA03.typedValue = data.GLOSA[0].PACIENTE;
            this.descrippaciente_SERA03 = data.GLOSA[0].DESCRIP_PAC.replace(/\�/g, "ñ");
            this.anoultdoc_SERA03 = data.GLOSA[0].FECHARESP2.substring(0, 4);
            this.mesultdoc_SERA03 = data.GLOSA[0].FECHARESP2.substring(4, 6);
            this.diaultdoc_SERA03 = data.GLOSA[0].FECHARESP2.substring(6, 8);
            this.radicado_SERA03 = data.GLOSA[0].RADICACION;
            this.estado_SERA03 = data.GLOSA[0].ESTADO;
            let estado = {
              '1': 'REGISTRO OBJECION',
              '2': 'RESPUESTA OBJECION',
              '3': 'GLOSA',
              '4': 'SEGUNDA RESPUESTA',
              '5': 'CONCILIACION',
            }
            this.estado_SERA03 = `${this.estado_SERA03} - ${estado[this.estado_SERA03]}`
            this.SERA03.ESTADOW = parseInt(data.GLOSA[0].ESTADO) - 1;
            itemMask_SERA03.typedValue = "1";
            this.SERA03.ITEMW = parseInt(itemMask_SERA03.value) - 1;
            this.referencia_SERA03 = data.GLOSA[0].TABLA[this.SERA03.ITEMW].REFER;
            this.motivo_SERA03 = data.GLOSA[0].TABLA[this.SERA03.ITEMW].MOTIVO;
            this.motivod_SERA03 = data.GLOSA[0].TABLA[this.SERA03.ITEMW].DESCRIP_MOTIVO;
            this.anomotivo_SERA03 = data.GLOSA[0].TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP.substring(0, 4);
            this.mesmotivo_SERA03 = data.GLOSA[0].TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP.substring(4, 6);
            this.diamotivo_SERA03 = data.GLOSA[0].TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP.substring(6, 8);
            this.respuesta_SERA03 = data.GLOSA[0].TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].DETALLES[0].trim();
            valorglosaMask_SERA03.typedValue = data.GLOSA[0].TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRGLOSA;
            valorsoportadoMask_SERA03.typedValue = data.GLOSA[0].TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRRESPU;
            valoraceptadoMask_SERA03.typedValue = data.GLOSA[0].TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRACEPT;
            totalglosaMask_SERA03.typedValue = data.GLOSA[0].TABLAVALORESGLO[this.SERA03.ESTADOW].TOTGLOSA;
            totalrespuMask_SERA03.typedValue = data.GLOSA[0].TABLAVALORESGLO[this.SERA03.ESTADOW].TOTRESPU;
            totalaceptadoMask_SERA03.typedValue = data.GLOSA[0].TABLAVALORESGLO[this.SERA03.ESTADOW].TOTACEPT;
            this.responsable_SERA03 = `${data.GLOSA[0].RESPONSABLE} ${data.GLOSA[0].DESCRIP_RES}`;
            this.opercreado_SERA03 = `${data.GLOSA[0].OPERCRE} - ${data.GLOSA[0].FECHACRE}`;
            this.opermodif_SERA03 = `${data.GLOSA[0].OPERMOD} - ${data.GLOSA[0].FECHAMOD}`;
            postData(
              {
                datosh: datosEnvio() + `${prefijoMask_SERA03.value.trim()}${numerofacturaMask_SERA03.value.padStart(6, "0")}|`,
              },
              get_url("APP/SALUD/SER808-01.DLL"),
            )
              .then(data => {
                this.SERA03.NUMERACION = data.NUMER19[0];
                var vlr = vlrabono = 0;
                for (var i in this.SERA03.NUMERACION.TABLA_FACT) {
                  let vlrfact = 0;
                  vlrfact = parseFloat(this.SERA03.NUMERACION.TABLA_FACT[i].VLR_FACT);
                  if (isNaN(vlrfact)) vlrfact = 0;
                  vlr = vlrfact + vlr;
                }
                for (var i in this.SERA03.NUMERACION.TABLA_ABON) {
                  let vlrabon = 0;
                  vlrabon = parseFloat(this.SERA03.NUMERACION.TABLA_ABON[i].VLR_ABON);
                  if (isNaN(vlrabon)) vlrabon = 0;
                  vlrabono = vlrabon + vlrabono;
                }
                totalfactMask_SERA03.typedValue = vlr.toString();
                abonosMask_SERA03.typedValue = vlrabono - parseInt(this.SERA03.NUMERACION.COPAGOS_NUM);
                let saldo = vlr - parseInt(this.SERA03.NUMERACION.COPAGOS_NUM) - vlrabono;
                saldofactMask_SERA03.typedValue = saldo.toString();
                this._evaluarradicado_SERA03()
              })
              .catch(error => {
                console.error(error);
                this._evaluarnumeroglosa_SERA03();
              });
          }
        })
        .catch(error => {
          console.error(error);
          this._evaluarnumeroglosa_SERA03();
        });
    },
    _evaluarañofecharecep_SERA03(orden) {
      validarInputs(
        {
          form: "#VALIDAR07_SERA03",
          orden: orden,
        },
        this._evaluarnumerofactura_SERA03,
        () => {
          this.mesent_SERA03 = this.mesent_SERA03.padStart(2, "0");
          this.diaent_SERA03 = this.diaent_SERA03.padStart(2, "0");
          let fecha = moment(this.anoent_SERA03 + this.mesent_SERA03 + this.diaent_SERA03).format("YYYYMMDD");
          if (fecha == "Invalid date") {
            CON851("37", "37", this._evaluarañofecharecep_SERA03("1"), "error", "Error");
          } else {
            this.anoaud_SERA03 = this.anoent_SERA03;
            this._evaluarañofechaaud_SERA03("2");
          }
        },
      );
    },
    _evaluarañofechaaud_SERA03(orden) {
      validarInputs(
        {
          form: "#VALIDAR08_SERA03",
          orden: orden,
        },
        () => {
          this._evaluarañofecharecep_SERA03("3");
        },
        () => {
          this.mesaud_SERA03 = this.mesaud_SERA03.padStart(2, "0");
          this.diaaud_SERA03 = this.diaaud_SERA03.padStart(2, "0");
          let fechaW = moment(this.anoaud_SERA03 + this.mesaud_SERA03 + this.diaaud_SERA03).format("YYYYMMDD");
          if (fechaW == "Invalid date") {
            CON851("37", "37", this._evaluarañofechaaud_SERA03("1"), "error", "Error");
          } else {
            if (this.novedad_SERA03.substring(0, 1) == "8" && (localStorage.Usuario == "GEBC" || localStorage.Usuario == "ADMI")) {
              this._evaluarañofechaultdoc_SERA03("1");
            } else {
              this._evaluarradicado_SERA03();
            }
          }
        },
      );
    },
    _evaluarañofechaultdoc_SERA03(orden) {
      validarInputs(
        {
          form: "#VALIDAR09_SERA03",
          orden: orden,
        },
        this._evaluarnumerofactura_SERA03,
        () => {
          this.mesultdoc_SERA03 = this.mesultdoc_SERA03.padStart(2, "0");
          this.diaultdoc_SERA03 = this.diaultdoc_SERA03.padStart(2, "0");
          let fecha = moment(this.anoultdoc_SERA03 + this.mesultdoc_SERA03 + this.diaultdoc_SERA03).format("YYYYMMDD");
          if (fecha == "Invalid date") {
            CON851("37", "37", this._evaluarañofechaultdoc_SERA03("1"), "error", "Error");
          } else {
            this._evaluarradicado_SERA03();
          }
        },
      );
    },
    _evaluarradicado_SERA03() {
      validarInputs(
        {
          form: "#VALIDAR11_SERA03",
          orden: "1",
        },
        () => {
          this._evaluarañofechaaud_SERA03("3");
        },
        () => {
          this.radicado_SERA03 = this.radicado_SERA03.toUpperCase();
          if (this.novedad_SERA03.substring(0, 1) == "7") {
            this._evaluarSER838_SERA03({ COD: "1", DESCRIP: "REGISTRO DE OBJECION" });
          } else {
            SER838(this._evaluarSER838_SERA03, this._evaluarradicado_SERA03);
          }
        },
      );
    },
    _evaluarSER838_SERA03(data) {
      this.estado_SERA03 = `${data.COD} - ${data.DESCRIP}`;
      (this.estado_SERA03.substring(0, 1) == '1')
        ? this.SERA03.ESTADOW = '0'
        : this.SERA03.ESTADOW = parseInt(data.COD) - 1;
      postData({ datosh: datosEnvio() + `${localStorage.Usuario}|ISA3${data.COD}|` }, get_url("APP/CONTAB/CON904.DLL"))
        .then(data => {
          if (this.estado_SERA03.substring(0, 1) == "5") {
            this._evaluarventanaconciliacion_SERA03();
          } else {
            this.SERA03.LEVANTAGLO = "";
            this.SERA03.FECHALEVANTAGLO = "00000000";
            this.SERA03.OPERLEVANTAGLO = "";
            itemMask_SERA03.typedValue = "1";
            this._evaluaritem_SERA03();
          }
        })
        .catch(err => {
          console.error(err);
          this._evaluarradicado_SERA03();
        });
    },
    _evaluarventanaconciliacion_SERA03() {
      var $this = this;
      var ventanaconciliacion_SERA03 = bootbox.dialog({
        size: "small",
        title: "CONCILIACION",
        message:
          '<div class="row"> ' +
          '<div class="col-md-12 col-sm-12 col-xs-12"> ' +
          '<div class="inline-inputs">' +
          '<label class="col-md-10 col-sm-10 col-xs-12 control-label" for="name">' +
          "Es un levantamiento de glosa?" +
          "</label> " +
          '<div class="input-group col-md-2 col-sm-2 col-xs-12" id="LEVANTAMIENTO_SERA03"> ' +
          '<input id="levantamientoglosa_SERA03" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="1" > ' +
          "</div> " +
          "</div>" +
          "</div> " +
          "</div>",
        buttons: {
          confirm: {
            label: "Aceptar",
            className: "btn-primary",
            callback: function () {
              ventanaconciliacion_SERA03.off("show.bs.modal");
              setTimeout($this._evaluaritem_SERA03, 500);
            },
          },
          cancelar: {
            label: "Cancelar",
            className: "btn-danger",
            callback: function () {
              ventanaconciliacion_SERA03.off("show.bs.modal");
              setTimeout($this._evaluarradicado_SERA03, 500);
            },
          },
        },
      });
      ventanaconciliacion_SERA03.init($(".modal-footer").hide());
      ventanaconciliacion_SERA03.init(this._evaluarlevantamiento_SERA03());
      ventanaconciliacion_SERA03.on("shown.bs.modal", function () {
        $("#levantamientoglosa_SERA03").focus();
      });
    },
    _evaluarlevantamiento_SERA03() {
      validarInputs(
        {
          form: "#LEVANTAMIENTO_SERA03",
          orden: "1",
          event_f3: this._evaluarunidadfunc_SERA03,
        },
        () => {
          $(".btn-danger").click();
        },
        () => {
          this.SERA03.LEVANTAGLO = $("#levantamientoglosa_SERA03").val().toUpperCase();
          if (this.SERA03.LEVANTAGLO == "S" || this.SERA03.LEVANTAGLO == "N") {
            this.SERA03.FECHALEVANTAGLO = moment().format("YYYYMMDD");
            this.SERA03.OPERLEVANTAGLO = localStorage.Usuario;
            $(".btn-primary").click();
          } else {
            CON851("", "Digite S o N", this._evaluarlevantamiento_SERA03(), "error", "Error");
          }
        },
      );
    },
    _evaluaritem_SERA03() {
      if (this.novedad_SERA03.substring(0, 1).trim() != '7') {
        this.referencia_SERA03 = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].REFER;
        this.motivo_SERA03 = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].MOTIVO;
        this.motivod_SERA03 = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].DESCRIP_MOTIVO;
        this.respuesta_SERA03 = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].DETALLES[0].trim();
        valorglosaMask_SERA03.typedValue = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRGLOSA;
        valorsoportadoMask_SERA03.typedValue = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRRESPU;
        valoraceptadoMask_SERA03.typedValue = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRACEPT;
        totalglosaMask_SERA03.typedValue = this.SERA03.GLOSA.TABLAVALORESGLO[this.SERA03.ESTADOW].TOTGLOSA;
        totalrespuMask_SERA03.typedValue = this.SERA03.GLOSA.TABLAVALORESGLO[this.SERA03.ESTADOW].TOTRESPU;
        totalaceptadoMask_SERA03.typedValue = this.SERA03.GLOSA.TABLAVALORESGLO[this.SERA03.ESTADOW].TOTACEPT;
        this.anomotivo_SERA03 = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP.substring(0, 4);
        this.mesmotivo_SERA03 = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP.substring(4, 6);
        this.diamotivo_SERA03 = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP.substring(6, 8);
        // if (this.SERA03.ESTADOW > '0') {
        //   this.SERA03.ESTADOANT = this.SERA03.ESTADOW - 1
        //   this.anomotivo_SERA03 = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOANT].FECHARESP.substring(0, 4);
        //   this.mesmotivo_SERA03 = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOANT].FECHARESP.substring(4, 6);
        //   this.diamotivo_SERA03 = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOANT].FECHARESP.substring(6, 8);
        // }
      }
      _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F3 para continuar' }] })
      validarInputs(
        {
          form: "#VALIDAR12_SERA03",
          orden: "1",
          event_f3: () => {
            _FloatText({ estado: 'off' });
            this._evaluarunidadfunc_SERA03();
          },
        },
        () => {
          _FloatText({ estado: 'off' });
          this._evaluarradicado_SERA03()
        },
        () => {
          _FloatText({ estado: 'off' });
          if (itemMask_SERA03.value.trim() == "" || itemMask_SERA03.value == 0) {
            CON851("", "Digite un item", this._evaluaritem_SERA03(), "error", "Error");
          } else {
            if (itemMask_SERA03.value > 12) {
              _FloatText({ estado: 'off' });
              this._evaluarunidadfunc_SERA03()
            } else {
              this.SERA03.ITEMW = parseInt(itemMask_SERA03.value.trim()) - 1;
              if (this.novedad_SERA03.substring(0, 1).trim() != '7') {
                this.referencia_SERA03 = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].REFER;
                this.motivo_SERA03 = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].MOTIVO;
                this.motivod_SERA03 = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].DESCRIP_MOTIVO;
                this.respuesta_SERA03 = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].DETALLES[0].trim();
                valorglosaMask_SERA03.typedValue = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRGLOSA;
                valorsoportadoMask_SERA03.typedValue = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRRESPU;
                valoraceptadoMask_SERA03.typedValue = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRACEPT;
                totalglosaMask_SERA03.typedValue = this.SERA03.GLOSA.TABLAVALORESGLO[this.SERA03.ESTADOW].TOTGLOSA;
                totalrespuMask_SERA03.typedValue = this.SERA03.GLOSA.TABLAVALORESGLO[this.SERA03.ESTADOW].TOTRESPU;
                totalaceptadoMask_SERA03.typedValue = this.SERA03.GLOSA.TABLAVALORESGLO[this.SERA03.ESTADOW].TOTACEPT;
              }
              if (this.estado_SERA03.substring(0, 1) == 5) {
                if (this.novedad_SERA03.substring(0, 1) == "7") {
                  this.SERA03.ESTADOANT = "0";
                } else {
                  if (this.SERA03.GLOSA) {
                    if (parseFloat(this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[3].VLRGLOSA.trim().replace(/,/g, "").padStart(15, "0")) > 0) {
                      this.SERA03.ESTADOANT = "3";
                    } else if (parseFloat(this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[2].VLRGLOSA.trim().replace(/,/g, "").padStart(15, "0")) > 0) {
                      this.SERA03.ESTADOANT = "2";
                    } else if (parseFloat(this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[1].VLRGLOSA.trim().replace(/,/g, "").padStart(15, "0")) > 0) {
                      this.SERA03.ESTADOANT = "1";
                    } else {
                      this.SERA03.ESTADOANT = "0";
                    }
                  } else {
                    this.SERA03.ESTADOANT = "0";
                  }
                }
              } else {
                let estadoant = {
                  1: "0",
                  2: "0",
                  3: "1",
                  4: "2",
                };
                this.SERA03.ESTADOANT = estadoant[this.estado_SERA03.substring(0, 1)];
              }
              if (this.novedad_SERA03.substring(0, 1) == "7" || this.anomotivo_SERA03.trim() == "" || this.anomotivo_SERA03.trim() == "0000") {
                this.anomotivo_SERA03 = this.SERA03.FECHALNK.substring(0, 4);
                this.mesmotivo_SERA03 = this.SERA03.FECHALNK.substring(4, 6);
                if (this.SERA03.FECHALNK.substring(0, 4) == moment().format("YYYY") && this.SERA03.FECHALNK.substring(4, 6) == moment().format("MM")) {
                  this.diamotivo_SERA03 = moment().format("DD");
                } else {
                  this.diamotivo_SERA03 = this.SERA03.FECHALNK.substring(6, 8);
                }
              }
              if (parseInt(this.estado_SERA03.substring(0, 1)) > 1 && this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOANT].VLRGLOSA == 0) {
                CON851("96", "96", this._evaluaritem_SERA03(), "error", "Error");
              } else if ((localStorage.Usuario == "GEBC" || localStorage.Usuario == "ADMI") && this.novedad_SERA03.substring(0, 1) == "8") {
                this._evaluarñaofecharesp_SERA03("1");
              } else if (this.estado_SERA03.substring(0, 1) == "5" && parseInt(this.SERA03.ESTADOANT) > 1
                && this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP.substring(4, 6) == this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOANT].FECHARESP.substring(4, 6)
                && this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOANT].FECHARESP.substring(0, 4) == this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP.substring(0, 4)) {
                CON851("6T", "6T", null, "error", "Error");
                if (parseInt(this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRACEPT) > 0) {
                  this._validacionesitem_SERA03();
                } else {
                  this._evaluaritem_SERA03();
                }
              } else {
                this._validacionesitem_SERA03();
              }
            }
          }
        },
      );
    },
    _evaluarñaofecharesp_SERA03(orden) {
      validarInputs(
        {
          form: "#VALIDAR15_SERA03",
          orden: orden,
        },
        this._evaluaritem_SERA03,
        () => {
          this.mesmotivo_SERA03 = this.mesmotivo_SERA03.padStart(2, "0");
          this.diamotivo_SERA03 = this.diamotivo_SERA03.padStart(2, "0");
          let fecha = moment(this.anomotivo_SERA03 + this.mesmotivo_SERA03 + this.diamotivo_SERA03).format("YYYYMMDD");
          if (fecha == "Invalid date") {
            CON851("91", "91", null, "error", "Error");
            if (localStorage.Usuario == "GEBC" || localStorage.Usuario == "ADMI") {
              this._validarfechadoc_SERA03()
            } else {
              this._evaluaritem_SERA03();
            }
          } else {
            if (fecha > moment().format("YYYYMMDD")) {
              CON851("37", "37", this._evaluarñaofecharesp_SERA03("1"), "error", "Error");
            } else {
              this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP = fecha;
              if (this.estado_SERA03.substring(0, 1) == "5" && parseInt(this.SERA03.ESTADOANT) > 1 && this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP.substring(4, 6) && this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP.substring(4, 6)) {
                CON851("6T", "6T", null, "error", "Error");
                if (parseInt(this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRACEPT) > 0) {
                  this._validacionesitem_SERA03();
                } else {
                  this._evaluaritem_SERA03();
                }
              } else {
                this._validacionesitem_SERA03();
              }
            }
          }
        },
      );
    },
    _validacionesitem_SERA03() {
      if ((this.novedad_SERA03.substring(0, 1) == "8") && (this.estado_SERA03.substring(0, 1) == "2" || this.estado_SERA03.substring(0, 1) == "4" || this.estado_SERA03.substring(0, 1) == "5") && (this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP.substring(4, 6).replace(/ /g, "0") > 0)) {
        if (this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP.substring(4, 6) != this.SERA03.FECHALNK.substring(4, 6) || this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP.substring(0, 4) != this.SERA03.FECHALNK.substring(0, 4)) {
          CON851("91", "91", null, "error", "Error");
          if (localStorage.Usuario != "GEBC" || localStorage.Usuario != "ADMI") {
            return this._evaluaritem_SERA03();
          }
        }
      }
      this._evaluarrefer_SERA03();
    },
    _evaluarrefer_SERA03() {
      if (this.estado_SERA03.substring(0, 1) == "1") {
        validarInputs(
          {
            form: "#VALIDAR13_SERA03",
            orden: "1",
          },
          this._evaluaritem_SERA03,
          () => {
            this.referencia_SERA03 = this.referencia_SERA03.toUpperCase()
            this._evaluarmotivo_SERA03()
          },
        );
      } else {
        this._evaluarmotivo_SERA03();
      }
    },
    _evaluarmotivo_SERA03() {
      if (this.estado_SERA03.substring(0, 1) == 1) {
        if (this.motivo_SERA03.length > 0) this.motivo_SERA03 = this.motivo_SERA03.trim().substring(0, 3);
        validarInputs(
          {
            form: "#VALIDAR14_SERA03",
            orden: "1",
          },
          this._evaluaritem_SERA03,
          () => {
            if (this.motivo_SERA03.trim() == "") {
              CON851("", "Digite un motivo", this._evaluarmotivo_SERA03(), "error", "Error");
            } else {
              let motivo = this.SERA03.MOTIVOS.filter(x => x.CUENTA.trim() == this.motivo_SERA03.trim());
              if (motivo.length > 0) {
                this.motivo_SERA03 = motivo[0].CUENTA.trim();
                this.motivod_SERA03 = motivo[0].NOMBRE;
                this._ubicarfechadoc_SERA03();
              } else {
                CON851("01", "01", this._evaluarmotivo_SERA03(), "error", "Error");
              }
            }
          },
        );
      } else {
        this._ubicarfechadoc_SERA03();
      }
    },
    _ubicarfechadoc_SERA03() {
      if (itemMask_SERA03.value.trim() == "1" || itemMask_SERA03.value.trim() == "3") {
        this._validarfechadoc_SERA03();
      } else {
        if (this.anomotivo_SERA03.trim() != this.SERA03.FECHALNK.substring(0, 4) || this.mesmotivo_SERA03.trim() != this.SERA03.FECHALNK.substring(4, 6)) {
          CON851("91", "91", null, "error", "Error");
          if (localStorage.Usuario == "GEBC" || localStorage.Usuario == "ADMI" || localStorage.Usuario == "YGNM") {
            this._validarfechadoc_SERA03();
          } else {
            this._evaluaritem_SERA03();
          }
        } else {
          this._validarfechadoc_SERA03();
        }
      }
    },
    _validarfechadoc_SERA03() {
      if (this.estado_SERA03.substring(0, 1) == "1") {
        this.SERA03.FECHAANT = "00000000";
      } else {
        this.SERA03.FECHAANT = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOANT].FECHARESP;
      }
      this.SERA03.FECHARESPW = this.anomotivo_SERA03 + this.mesmotivo_SERA03 + this.diamotivo_SERA03;
      this.SERA03.FECHARECEP = this.anoent_SERA03 + this.mesent_SERA03 + this.diaent_SERA03;
      this.SERA03.FECHASIST = moment().format("YYYYMMDD");
      if (this.estado_SERA03.substring(0, 1) == "3" && this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].DETALLES[0].trim() == "") {
        this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[2].DETALLES[0] = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[0].DETALLES[0];
        this.respuesta_SERA03 = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[2].DETALLES[0];
      }
      if ((this.estado_SERA03.substring(0, 1) == "2" || this.estado_SERA03.substring(0, 1) == "4" || this.estado_SERA03.substring(0, 1) == "5") && this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].DETALLES[0].trim() == "") {
        this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].DETALLES[0] = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOANT].DETALLES[0];
        this.respuesta_SERA03 = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOANT].DETALLES[0];
      }
      if (this.SERA03.FECHARESPW < this.SERA03.FECHARECEP || this.SERA03.FECHARESPW < this.SERA03.FECHAANT || this.SERA03.FECHARECEP > this.SERA03.FECHASIST) {
        CON851("37", "37", null, "error", "Error");
        if (localStorage.Usuario == "GEBC" || localStorage.Usuario == "ADMI") {
          this._evaluarrespuestaglosa_SERA03();
        } else {
          this._evaluarñaofecharesp_SERA03("3");
        }
      } else {
        this._evaluarrespuestaglosa_SERA03();
      }
    },
    _evaluarrespuestaglosa_SERA03() {
      _FloatText({ estado: "on", msg: [{ mensaje: "Oprima F3 para continuar" }] });
      validarInputs(
        {
          form: "#VALIDARRESP_SERA03",
          orden: "1",
        },
        () => {
          _FloatText({ estado: "off" });
          this._evaluaritem_SERA03();
        },
        () => {
          _FloatText({ estado: "off" });
          this.respuesta_SERA03 = this.respuesta_SERA03.toUpperCase()
          if (this.respuesta_SERA03.trim() == "") {
            CON851("", "Digite la respuesta de la glosa", this._evaluarrespuestaglosa_SERA03(), "error", "Error");
          } else {
            this._evaluarvlrglosa_SERA03();
          }
        },
      );
    },
    _evaluarvlrglosa_SERA03() {
      if (this.estado_SERA03.substring(0, 1) == "5" && this.SERA03.LEVANTAGLO == "S") {
        valorglosaMask_SERA03.typedValue = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[0].VLRGLOSA.replace(/,/g, "");
        let vlracept1 = parseFloat(this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[0].VLRACEPT.replace(/,/g));
        let vlracept2 = parseFloat(this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[3].VLRACEPT.replace(/,/g));
        if (isNaN(vlracept1)) vlracept1 = 0;
        if (isNaN(vlracept2)) vlracept2 = 0;
        valoraceptadoMask_SERA03.typedValue = (vlracept1 + vlracept2).toString();
        let vlrrespu = parseFloat(valorglosaMask_SERA03.value.replace(/,/g, "")) - parseFloat(valoraceptadoMask_SERA03.value.replace(/,/g, "")) * -1;
        valorsoportadoMask_SERA03.typedValue = vlrrespu.toString();
        this._evaluarvlrresp_SERA03();
      } else if (this.estado_SERA03.substring(0, 1) == "2" || this.estado_SERA03.substring(0, 1) == "4" || this.estado_SERA03.substring(0, 1) == "5") {
        if (parseInt(this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOANT].VLRGLOSA) > 0) {
          this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRGLOSA = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOANT].VLRGLOSA;
          valorglosaMask_SERA03.typedValue = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRGLOSA;
        } else {
          this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[0].VLRGLOSA = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRGLOSA;
          valorglosaMask_SERA03.typedValue = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRGLOSA;
        }
        this._validarvlrglosa_SERA03();
      } else {
        if (this.estado_SERA03.substring(0, 1) == "3") {
          if ((this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[1].VLRGLOSA == this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[1].VLRRESPU) && this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[1].VLRACEPT.trim() == '') {
            this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[2].VLRGLOSA = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[1].VLRRESPU
            valorglosaMask_SERA03.typedValue = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[2].VLRGLOSA
          } else {
            if (this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[1].VLRRESPU.trim() != '' && this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[1].VLRACEPT.trim() != '') {
              this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[2].VLRGLOSA = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[1].VLRRESPU
              valorglosaMask_SERA03.typedValue = this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[2].VLRGLOSA
            } else {
              valorglosaMask_SERA03.typedValue = 0
              this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[2].VLRGLOSA = valorglosaMask_SERA03.typedValue
              CON851("", "Glosa ya esta aceptada!", null, "error", "Error");
            }
          }
        }
        validarInputs(
          {
            form: "#VALIDAR16_SERA03",
            orden: "1",
          },
          this._evaluarrespuestaglosa_SERA03,
          this._validarvlrglosa_SERA03,
        );
      }
    },
    _validarvlrglosa_SERA03() {
      if (this.estado_SERA03.substring(0, 1) == "1" && parseInt(this.valorglosa_SERA03) == 0 && itemMask_SERA03.value.trim() == "1" && this.novedad_SERA03.substring(0, 1) == "7") {
        CON851("02", "02", this._evaluarvlrglosa_SERA03(), "error", "Error");
      } else if (this.estado_SERA03.substring(0, 1) == "1") {
        var vlrtotalglosa = 0;
        if (this.SERA03.GLOSA.TABLA) {
          for (var i in this.SERA03.GLOSA.TABLA) {
            vlrtotalglosa = parseInt(this.SERA03.GLOSA.TABLA[i].TABESTAD[0].VLRGLOSA) + vlrtotalglosa;
          }
          vlrtotalglosa = parseInt(valorglosaMask_SERA03.value.replace(/,/g, "")) + vlrtotalglosa;
          if (vlrtotalglosa > parseInt(saldofactMask_SERA03.value.replace(/,/g, ""))) {
            CON851("07", "07", null, "error", "Error");
            this._evaluarrespuestaglosa_SERA03()
          } else {
            this._otroitem_SERA03();
          }
        } else {
          totalglosaMask_SERA03.typedValue = valorglosaMask_SERA03.value.replace(/,/g, "");
          if (parseInt(totalglosaMask_SERA03.value.replace(/,/g, "")) > parseInt(saldofactMask_SERA03.value.replace(/,/g, ""))) {
            CON851("07", "07", null, "error", "Error");
            this._evaluarrespuestaglosa_SERA03()
          } else {
            this._otroitem_SERA03();
          }
        }
      } else {
        if (this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRGLOSA > this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[0].VLRGLOSA) {
          CON851("07", "07", null, "error", "Error");
          this._evaluarrespuestaglosa_SERA03()
        } else {
          if (this.estado_SERA03.substring(0, 1) == "3") {
            this._otroitem_SERA03();
          } else {
            this._evaluarvlrresp_SERA03();
          }
        }
      }
    },
    _evaluarvlrresp_SERA03() {
      validarInputs(
        {
          form: "#VALIDAR17_SERA03",
          orden: "1",
        },
        this._evaluarrespuestaglosa_SERA03,
        () => {
          if (valorsoportadoMask_SERA03.value.trim() == "") valorsoportadoMask_SERA03.typedValue = "0";
          this._evaluarvlracept_SERA03();
        },
      );
    },
    _evaluarvlracept_SERA03() {
      valoraceptadoMask_SERA03.typedValue = parseFloat(valorglosaMask_SERA03.value.replace(/,/g, "")) - parseInt(valorsoportadoMask_SERA03.value.replace(/,/g, ""));
      validarInputs(
        {
          form: "#VALIDAR18_SERA03",
          orden: "1",
        },
        this._evaluarrespuestaglosa_SERA03,
        () => {
          if (valoraceptadoMask_SERA03.value.trim() == "") valoraceptadoMask_SERA03.typedValue = "0";
          if (parseInt(valorsoportadoMask_SERA03.value.replace(/,/g, "")) + parseFloat(valoraceptadoMask_SERA03.value.replace(/,/g, "")) != parseFloat(valorglosaMask_SERA03.value.replace(/,/g, ""))) {
            CON851("51", "51", this._evaluarvlracept_SERA03(), "error", "Error");
          } else {
            if (this.estado_SERA03.substring(0, 1) == "2" || this.estado_SERA03.substring(0, 1) == "4" || this.estado_SERA03.substring(0, 1) == "5") {
              let valor1 = parseInt(this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[1].VLRACEPT);
              if (isNaN(valor1)) valor1 = 0;
              let valor2 = parseInt(this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[3].VLRACEPT);
              if (isNaN(valor2)) valor2 = 0;
              let valor3 = parseInt(this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[4].VLRACEPT);
              if (isNaN(valor3)) valor3 = 0;
              var totalaceptado = valor1 + valor2 + valor3;
              if (totalaceptado > parseInt(this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[0].VLRGLOSA)) {
                CON851("07", "07", null, "error", "Error");
                if (localStorage.Usuario.trim() == 'GEBC') {
                  this._otroitem_SERA03();
                } else {
                  this._evaluarvlracept_SERA03()
                }
              } else {
                this._otroitem_SERA03();
              }
            }
          }
        },
      );
    },
    _otroitem_SERA03() {
      if (this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW]) {
        this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].REFER = this.referencia_SERA03.trim();
        this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].MOTIVO = this.motivo_SERA03.trim().substring(0, 3);
        if (this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].hasOwnProperty("TABESTAD")) {
          this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP = this.anomotivo_SERA03 + this.mesmotivo_SERA03 + this.diamotivo_SERA03;
          this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].DETALLES[0] = this.respuesta_SERA03;
          this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRGLOSA = valorglosaMask_SERA03.value.replace(/,/g, "");
          this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRRESPU = valorsoportadoMask_SERA03.value.replace(/,/g, "");
          this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRACEPT = valoraceptadoMask_SERA03.value.replace(/,/g, "");
        } else {
          this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD = [];
          this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD.push({ FECHARESP: this.anomotivo_SERA03 + this.mesmotivo_SERA03 + this.diamotivo_SERA03, DETALLES: [this.respuesta_SERA03], VLRGLOSA: valorglosaMask_SERA03.value.replace(/,/g, ""), VLRACEPT: valoraceptadoMask_SERA03.value.replace(/,/g, ""), VLRRESPU: valorsoportadoMask_SERA03.value.replace(/,/g, "") });
        }
      } else {
        this.SERA03.GLOSA.TABLA.push({ REFER: this.referencia_SERA03.trim(), MOTIVO: this.motivo_SERA03.trim().substring(0, 3) });
        if (this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].hasOwnProperty("TABESTAD")) {
          this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].FECHARESP = this.anomotivo_SERA03 + this.mesmotivo_SERA03 + this.diamotivo_SERA03;
          this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].DETALLES = this.respuesta_SERA03;
          this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRGLOSA = valorglosaMask_SERA03.value.replace(/,/g, "");
          this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRRESPU = valorsoportadoMask_SERA03.value.replace(/,/g, "");
          this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD[this.SERA03.ESTADOW].VLRACEPT = valoraceptadoMask_SERA03.value.replace(/,/g, "");
        } else {
          this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD = [];
          this.SERA03.GLOSA.TABLA[this.SERA03.ITEMW].TABESTAD.push({ FECHARESP: this.anomotivo_SERA03 + this.mesmotivo_SERA03 + this.diamotivo_SERA03, DETALLES: [this.respuesta_SERA03], VLRGLOSA: valorglosaMask_SERA03.value.replace(/,/g, ""), VLRACEPT: valoraceptadoMask_SERA03.value.replace(/,/g, ""), VLRRESPU: valorsoportadoMask_SERA03.value.replace(/,/g, "") });
        }
      }
      var totalglosa = (totalacept = totalrespu = 0);
      for (var i in this.SERA03.GLOSA.TABLA) {
        if (isNaN(parseFloat(this.SERA03.GLOSA.TABLA[i].TABESTAD[this.SERA03.ESTADOW].VLRGLOSA.replace(/,/g, "")))) {
          vlrglosa = 0;
        } else {
          vlrglosa = parseFloat(this.SERA03.GLOSA.TABLA[i].TABESTAD[this.SERA03.ESTADOW].VLRGLOSA.replace(/,/g, ""));
        }
        if (isNaN(parseFloat(this.SERA03.GLOSA.TABLA[i].TABESTAD[this.SERA03.ESTADOW].VLRRESPU.replace(/,/g, "")))) {
          vlrrespu = 0;
        } else {
          vlrrespu = parseFloat(this.SERA03.GLOSA.TABLA[i].TABESTAD[this.SERA03.ESTADOW].VLRRESPU.replace(/,/g, ""));
        }
        if (isNaN(parseFloat(this.SERA03.GLOSA.TABLA[i].TABESTAD[this.SERA03.ESTADOW].VLRACEPT.replace(/,/g, "")))) {
          vlracept = 0;
        } else {
          vlracept = parseFloat(this.SERA03.GLOSA.TABLA[i].TABESTAD[this.SERA03.ESTADOW].VLRACEPT.replace(/,/g, ""));
        }
        totalglosa = vlrglosa + totalglosa;
        totalrespu = vlrrespu + totalrespu;
        totalacept = vlracept + totalacept;
      }
      totalglosaMask_SERA03.typedValue = totalglosa.toString();
      totalrespuMask_SERA03.typedValue = totalrespu.toString();
      totalaceptadoMask_SERA03.typedValue = totalacept.toString();
      if (this.SERA03.GLOSA.TABLAVALORESGLO[this.SERA03.ESTADOW]) {
        this.SERA03.GLOSA.TABLAVALORESGLO[this.SERA03.ESTADOW].TOTGLOSA = totalglosaMask_SERA03.value.replace(/,/g, "");
        this.SERA03.GLOSA.TABLAVALORESGLO[this.SERA03.ESTADOW].TOTACEPT = totalaceptadoMask_SERA03.value.replace(/,/g, "");
        this.SERA03.GLOSA.TABLAVALORESGLO[this.SERA03.ESTADOW].TOTRESPU = totalrespuMask_SERA03.value.replace(/,/g, "");
      } else {
        this.SERA03.GLOSA.TABLAVALORESGLO.push({ TOTGLOSA: totalglosaMask_SERA03.value.replace(/,/g, "").padStart(15, "0"), TOTACEPT: totalaceptadoMask_SERA03.value.replace(/,/g, "").padStart(15, "0"), TOTRESPU: totalrespuMask_SERA03.value.replace(/,/g, "").padStart(15, "0") });
      }
      let nuevoitem = parseInt(itemMask_SERA03.value.trim()) + 1;
      itemMask_SERA03.typedValue = nuevoitem.toString();
      this._inicializaritem_SERA03()
      setTimeout(this._evaluaritem_SERA03, 300)
    },
    _inicializaritem_SERA03() {
      this.referencia_SERA03 = "";
      this.motivo_SERA03 = "";
      this.motivod_SERA03 = "";
      this.respuesta_SERA03 = "";
      valorglosaMask_SERA03.typedValue = "";
      valoraceptadoMask_SERA03.typedValue = "";
      valorsoportadoMask_SERA03.typedValue = "";
    },
    _evaluarunidadfunc_SERA03() {
      if (parseInt(totalaceptadoMask_SERA03.value.replace(/,/g, "")) > parseInt(saldofactMask_SERA03.value.replace(/,/g, ""))) {
        CON851("07", "07", null, "error", "Error");
        if (localStorage.Usuario == "GEBC" || localStorage.Usuario == "ADMI" || $_USUA_GLOBAL[0].NIT == 892000401) {
          this._evaluarunidadfunc2_SERA03();
        } else {
          this._evaluaritem_SERA03();
        }
      } else {
        this._evaluarunidadfunc2_SERA03();
      }
    },
    _evaluarunidadfunc2_SERA03() {
      if (this.estado_SERA03.substring(0, 1) == "1" || this.estado_SERA03.substring(0, 1) == "3" || parseFloat(totalaceptadoMask_SERA03.value.replace(/,/g, "")) == 0) {
        this._confirmar_SERA03();
      } else {
        this._evaluarventanacontabilizacionglosa_SERA03();
      }
    },
    _evaluarventanacontabilizacionglosa_SERA03() {
      this.SERA03.ITEMCONTAB = 0;
      this.SERA03.TOTALCONTAB = 0;
      var $this = this;
      var ventanacontabilizacion_SERA03 = bootbox.dialog({
        size: "large",
        title: `CONTABILIZACION DE LAS GLOSA ESTADO ${this.estado_SERA03.substring(0, 1)}  - Saldo de factura = ${saldofactMask_SERA03.value}`,
        message:
          '<div class="row"> ' +
          '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding"> ' +
          '<label class="col-md-2 col-sm-2 col-xs-12">' +
          "</label> " +
          '<label class="col-md-3 col-sm-3 col-xs-12" id="descripunidad_SERA03" style="padding-left:15px">' +
          "</label> " +
          '<label class="col-md-3 col-sm-3 col-xs-12" id="descripcosto_SERA03" style="padding-left:15px">' +
          "</label> " +
          '<div class="salto-linea"></div>' +
          '<div class="col-md-2 col-sm-2 col-xs-12"> ' +
          '<div class="inline-inputs">' +
          '<label class="col-md-6 col-sm-6 col-xs-12">' +
          "Item" +
          "</label> " +
          '<div class="input-group col-md-6 col-sm-6 col-xs-12"> ' +
          '<input id="itemcontab_SERA03" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="1" > ' +
          "</div> " +
          "</div>" +
          "</div> " +
          '<div class="col-md-3 col-sm-12 col-xs-12"> ' +
          '<div class="inline-inputs">' +
          '<label class="col-md-7 col-sm-7 col-xs-12">' +
          "Unidad funcional" +
          "</label> " +
          '<div class="input-group col-md-4 col-sm-4 col-xs-11" id="VALIDARUNIDAD_SERA03"> ' +
          '<input id="unidadfuncional_SERA03" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="2"> ' +
          "</div> " +
          '<button type="button" id="unidadfuncionalBtn_SERA03" class="btn  f8-Btn btn-default col-md-1 col-sm-1 col-xs-1">' +
          '<i class="icon-magnifier"></i>' +
          "</button>" +
          "</div>" +
          "</div> " +
          '<div class="col-md-3 col-sm-12 col-xs-12"> ' +
          '<div class="inline-inputs">' +
          '<label class="col-md-7 col-sm-7 col-xs-12">' +
          "Centro de costos" +
          "</label> " +
          '<div class="input-group col-md-4 col-sm-4 col-xs-11" id="VALIDARCOSTOS_SERA03"> ' +
          '<input id="costos_SERA03" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="4" > ' +
          "</div> " +
          '<button type="button" id="costosBtn_SERA03" class="btn  f8-Btn btn-default col-md-1 col-sm-1 col-xs-1">' +
          '<i class="icon-magnifier"></i>' +
          "</button>" +
          "</div>" +
          "</div> " +
          '<div class="col-md-3 col-sm-12 col-xs-12"> ' +
          '<div class="inline-inputs">' +
          '<label class="col-md-6 col-sm-6 col-xs-12">' +
          "Valor" +
          "</label> " +
          '<div class="input-group col-md-6 col-sm-6 col-xs-12" id="VALIDARVALOR_SERA03"> ' +
          '<input id="valor_SERA03" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="15" > ' +
          "</div> " +
          "</div>" +
          "</div> " +
          "</div>" +
          '<div class="col-md-12 col-sm-12 col-xs-12 no-padding" style="overflow-y: auto; max-height: 220px;"> ' +
          '<table id="TABLACONTABILIZACION_SERA03" class="table table-light table-striped table-bordered" data-orden="1" >' +
          "<thead>" +
          '<th style="width: 25%">#</th>' +
          '<th style="width: 25%">Unidad funcional</th>' +
          '<th style="width: 25%">Centro de costo</th>' +
          '<th style="width: 25%">Valor</th>' +
          "</thead>" +
          "<tbody>" +
          "</tbody>" +
          "</table>" +
          "</div>" +
          '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding"> ' +
          '<div class="col-md-12 col-sm-12 col-xs-12"> ' +
          '<div class="inline-inputs">' +
          '<label class="col-md-6 col-sm-6 col-xs-12">' +
          "Total contabilizaciones" +
          "</label> " +
          '<div class="input-group col-md-6 col-sm-6 col-xs-12"> ' +
          '<input id="totalcontab_SERA03" class="form-control col-md-12 col-sm-12 col-xs-12"> ' +
          "</div> " +
          "</div>" +
          "</div> " +
          "</div>" +
          "</div>",
        buttons: {
          confirm: {
            label: "Aceptar",
            className: "btn-primary",
            callback: function () {
              ventanacontabilizacion_SERA03.off("show.bs.modal");
              setTimeout($this._evaluarresponsable_SERA03, 500);
            },
          },
          cancelar: {
            label: "Cancelar",
            className: "btn-danger",
            callback: function () {
              ventanacontabilizacion_SERA03.off("show.bs.modal");
              setTimeout($this._evaluarradicado_SERA03, 500);
            },
          },
        },
      });
      ventanacontabilizacion_SERA03.init($(".modal-footer").hide(), _inputControl("disabled"));
      ventanacontabilizacion_SERA03.init(this._evaluarunidadfuncional_SERA03());
      ventanacontabilizacion_SERA03.on("shown.bs.modal", function () {
        $("#unidadfuncional_SERA03").focus();
      });
      ventanacontabilizacion_SERA03.init(
        _toggleF8([{
          input: 'unidadfuncional',
          app: 'SERA03',
          funct: this._ventanadeunidadfuncional_SERA03
        },
        {
          input: 'costos',
          app: 'SERA03',
          funct: this._ventanadecostos_SERA03
        },
        ])
      );
    },
    _evaluarunidadfuncional_SERA03(data) {
      _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F3 para continuar' }, { mensaje: 'Oprima F7 para modificar la tabla' }] })
      $("#TABLACONTABILIZACION_SERA03 tbody").html("");
      for (var i in this.SERA03.GLOSA.TABLACONTAB) {
        if (this.estado_SERA03.substring(0, 1) == "2") {
          if (this.SERA03.GLOSA.TABLACONTAB[i].COSTO.trim() != '00') {
            $("#TABLACONTABILIZACION_SERA03 tbody").append("<tr>" + '<td style="width: 25%">' + i + "</td>" + '<td style="width: 25%">' + this.SERA03.GLOSA.TABLACONTAB[i].CTACONTAB + "</td>" + '<td style="width: 25%">' + this.SERA03.GLOSA.TABLACONTAB[i].COSTO + "</td>" + '<td style="width: 25%">' + numeroencomas(parseFloat(this.SERA03.GLOSA.TABLACONTAB[i].VLRCONTAB.trim().replace(/,/g, '').padStart(15, '0'))) + "</td>" + "</tr>");
          }
        } else {
          if (this.SERA03.GLOSA.TABLACONTAB[i].COSTO.trim() != '00') {
            $("#TABLACONTABILIZACION_SERA03 tbody").append("<tr>" + '<td style="width: 25%">' + i + "</td>" + '<td style="width: 25%">' + this.SERA03.GLOSA.TABLACONTAB[i].CTACONTAB + "</td>" + '<td style="width: 25%">' + this.SERA03.GLOSA.TABLACONTAB[i].COSTO + "</td>" + '<td style="width: 25%">' + numeroencomas(parseFloat(this.SERA03.GLOSA.TABLACONTAB2[i].VLRCONTAB.trim().replace(/,/g, '').padStart(15, '0'))) + "</td>" + "</tr>");
          }
        }
      }
      var valorMask_SERA03 = IMask($("#valor_SERA03")[0], {
        mask: Number,
        thousandsSeparator: ",",
        scale: 2,
        radix: ".",
        thousandsSeparator: ",",
        normalizeZeros: true,
        padFractionalZeros: true,
      });
      if (data) {
        this.SERA03.ITEMCONTAB = parseInt(data.cells[0].textContent);
        $("#itemcontab_SERA03").val(data.cells[0].textContent);
        $("#unidadfuncional_SERA03").val(data.cells[1].textContent);
        $("#costos_SERA03").val(data.cells[2].textContent);
        valorMask_SERA03.typedValue = data.cells[3].textContent;
      } else {
        $("#itemcontab_SERA03").val(this.SERA03.ITEMCONTAB);
      }
      if (this.SERA03.ITEMCONTAB > 15) {
        this._evaluartotalcontable_SERA03()
      } else {
        validarInputs(
          {
            form: "#VALIDARUNIDAD_SERA03",
            orden: "1",
            event_f3: () => {
              _FloatText({ estado: 'off' });
              this._evaluartotalcontable_SERA03();
            },
            event_f7: () => {
              _FloatText({ estado: 'off' });
              if ($("#TABLACONTABILIZACION_SERA03 tbody tr").length == 0) {
                this._evaluarunidadfuncional_SERA03();
              } else {
                validarTabla(
                  {
                    tabla: "#TABLACONTABILIZACION_SERA03",
                    orden: "0",
                    Supr: data => {
                      this.SERA03.ITEMCONTAB = data.cells[0].textContent;
                      this.SERA03.GLOSA.TABLACONTAB[this.SERA03.ITEMCONTAB].CTACONTAB = "00";
                      this.SERA03.GLOSA.TABLACONTAB[this.SERA03.ITEMCONTAB].COSTO = "    ";
                      this.SERA03.GLOSA.TABLACONTAB[this.SERA03.ITEMCONTAB].VLRCONTAB = "                   ";
                      this.SERA03.GLOSA.TABLACONTAB2[this.SERA03.ITEMCONTAB].VLRCONTAB = "                   ";
                      $("#TABLACONTABILIZACION_SERA03 tbody").html("");
                      for (var i in this.SERA03.GLOSA.TABLACONTAB) {
                        if (this.estado_SERA03.substring(0, 1) == "2") {
                          $("#TABLACONTABILIZACION_SERA03 tbody").append("<tr>" + '<td style="width: 25%">' + i + "</td>" + '<td style="width: 25%">' + this.SERA03.GLOSA.TABLACONTAB[i].CTACONTAB + "</td>" + '<td style="width: 25%">' + this.SERA03.GLOSA.TABLACONTAB[i].COSTO + "</td>" + '<td style="width: 25%">' + this.SERA03.GLOSA.TABLACONTAB[i].VLRCONTAB + "</td>" + "</tr>");
                        } else {
                          $("#TABLACONTABILIZACION_SERA03 tbody").append("<tr>" + '<td style="width: 25%">' + i + "</td>" + '<td style="width: 25%">' + this.SERA03.GLOSA.TABLACONTAB[i].CTACONTAB + "</td>" + '<td style="width: 25%">' + this.SERA03.GLOSA.TABLACONTAB[i].COSTO + "</td>" + '<td style="width: 25%">' + this.SERA03.GLOSA.TABLACONTAB2[i].VLRCONTAB + "</td>" + "</tr>");
                        }
                      }
                      this._evaluarunidadfuncional_SERA03();
                    },
                  },
                  this._evaluarunidadfuncional_SERA03,
                  () => {
                    this._evaluarunidadfuncional_SERA03();
                  },
                  () => {
                    this._evaluarunidadfuncional_SERA03();
                  },
                );
              }
            },
          },
          () => {
            _FloatText({ estado: 'off' })
            $(".btn-danger").click();
          },
          () => {
            _FloatText({ estado: 'off' })
            this.SERA03.CTACONTAB = $("#unidadfuncional_SERA03").val();
            if (this.SERA03.CTACONTAB.trim() == "") {
              CON851("", "Digite una unidad", this._evaluarunidadfuncional_SERA03(), "error", "Error");
            } else if (parseInt(this.SERA03.CTACONTAB) == 0) {
              this.SERA03.ITEMCONTAB++;
              $("#itemcontab_SERA03").val(this.SERA03.ITEMCONTAB);
              this._evaluarunidadfuncional_SERA03();
            } else {
              let subcuenta = this.SERA03.SUBCUENTAS.filter(x => x.COD.trim() == this.SERA03.CTACONTAB);
              if (subcuenta.length > 0) {
                $("#descripunidad_SERA03").text(subcuenta[0].DESCRIP);
                this._evaluarcosto_SERA03();
              } else {
                CON851("01", "01", this._evaluarunidadfuncional_SERA03(), "error", "Error");
              }
            }
          },
        );
      }
    },
    _evaluarcosto_SERA03() {
      validarInputs(
        {
          form: "#VALIDARCOSTOS_SERA03",
          orden: "1",
        },
        () => { this._evaluarunidadfuncional_SERA03() },
        () => {
          this.SERA03.COSTO = $("#costos_SERA03").val();
          if (this.SERA03.COSTO.trim() == "" || parseInt(this.SERA03.COSTO) == 0) {
            CON851("", "Digite un centro de costos", this._evaluarcosto_SERA03(), "error", "Error");
          } else {
            let costo = this.SERA03.COSTOS.filter(x => x.COD.trim() == this.SERA03.COSTO.trim());
            if (costo.length > 0) {
              $("#descripcosto_SERA03").text(costo[0].NOMBRE);
              this._evaluarvalor_SERA03();
            } else {
              CON851("01", "01", this._evaluarcosto_SERA03(), "error", "Error");
            }
          }
        },
      );
    },
    _evaluarvalor_SERA03() {
      var valorMask_SERA03 = IMask($("#valor_SERA03")[0], {
        mask: Number,
        thousandsSeparator: ",",
        scale: 2,
        radix: ".",
        thousandsSeparator: ",",
        normalizeZeros: true,
        padFractionalZeros: true,
      });
      valorMask_SERA03.updateValue();
      var totalcontabilizacionMask_SERA03 = IMask($("#totalcontab_SERA03")[0], {
        mask: Number,
        thousandsSeparator: ",",
        scale: 2,
        radix: ".",
        thousandsSeparator: ",",
        normalizeZeros: true,
        padFractionalZeros: true,
      });
      validarInputs(
        {
          form: "#VALIDARVALOR_SERA03",
          orden: "1",
        },
        this._evaluarcosto_SERA03,
        () => {
          // this.SERA03.VALORCONTAB = $("#valor_SERA03").val().replace(/,/g,'');
          this.SERA03.VALORCONTAB = valorMask_SERA03.value.replace(/,/g, "");
          this.SERA03.GLOSA.TABLACONTAB[this.SERA03.ITEMCONTAB].CTACONTAB = this.SERA03.CTACONTAB;
          this.SERA03.GLOSA.TABLACONTAB[this.SERA03.ITEMCONTAB].COSTO = this.SERA03.COSTO;
          if (this.estado_SERA03.substring(0, 1) == "2") {
            this.SERA03.GLOSA.TABLACONTAB[this.SERA03.ITEMCONTAB].VLRCONTAB = this.SERA03.VALORCONTAB.replace(/,/g, '').padStart(15, "0");
          } else {
            this.SERA03.GLOSA.TABLACONTAB2[this.SERA03.ITEMCONTAB].VLRCONTAB = this.SERA03.VALORCONTAB.replace(/,/g, '').padStart(15, "0");
          }
          let vlr = parseInt(this.SERA03.VALORCONTAB);
          this.SERA03.TOTALCONTAB = this.SERA03.TOTALCONTAB + vlr;
          // $("#totalcontab_SERA03").val();
          totalcontabilizacionMask_SERA03.typedValue = this.SERA03.TOTALCONTAB.toString();
          // $("#TABLACONTABILIZACION_SERA03 tbody").html("");
          // for (var i in this.SERA03.GLOSA.TABLACONTAB) {
          //   if (this.estado_SERA03.substring(0, 1) == "2") {
          //     $("#TABLACONTABILIZACION_SERA03 tbody").append("<tr>" + '<td style="width: 25%">' + i + "</td>" + '<td style="width: 25%">' + this.SERA03.GLOSA.TABLACONTAB[i].CTACONTAB + "</td>" + '<td style="width: 25%">' + this.SERA03.GLOSA.TABLACONTAB[i].COSTO + "</td>" + '<td style="width: 25%">' + numeroencomas(parseFloat(this.SERA03.GLOSA.TABLACONTAB[i].VLRCONTAB)) + "</td>" + "</tr>");
          //   } else {
          //     $("#TABLACONTABILIZACION_SERA03 tbody").append("<tr>" + '<td style="width: 25%">' + i + "</td>" + '<td style="width: 25%">' + this.SERA03.GLOSA.TABLACONTAB[i].CTACONTAB + "</td>" + '<td style="width: 25%">' + this.SERA03.GLOSA.TABLACONTAB[i].COSTO + "</td>" + '<td style="width: 25%">' + numeroencomas(parseFloat(this.SERA03.GLOSA.TABLACONTAB2[i].VLRCONTAB)) + "</td>" + "</tr>");
          //   }
          // }
          $("#descripunidad_SERA03").text("");
          $("#descripcosto_SERA03").text("");
          $("#itemcontab_SERA03").val("");
          $("#unidadfuncional_SERA03").val("");
          $("#costos_SERA03").val("");
          valorMask_SERA03.typedValue = "";
          this.SERA03.ITEMCONTAB++;
          this._evaluarunidadfuncional_SERA03();
        },
      );
    },
    _evaluartotalcontable_SERA03() {
      if ($("#totalcontab_SERA03").val().replace(/,/g, "") != totalaceptadoMask_SERA03.value.replace(/,/g, "")) {
        CON851("07", "07", this._evaluarunidadfuncional_SERA03(), "error", "Error");
      } else {
        $(".btn-primary").click();
      }
    },
    _evaluarresponsable_SERA03() {
      if (parseFloat(totalaceptadoMask_SERA03.value.replace(/,/g, "")) > 0) {
        validarInputs(
          {
            form: "#VALIDAR26_SERA03",
            orden: "1",
          },
          this._evaluaritem_SERA03,
          () => {
            let responsable = this.SERA03.TERCEROS.filter(x => x.COD.trim() == this.responsable_SERA03.trim());
            if (responsable.length > 0) {
              this.responsable_SERA03 = this.responsable_SERA03 + ` - ${responsable[0].NOMBRE}`;
            } else {
              this.responsable_SERA03 = this.responsable_SERA03 + " NO EXISTE TERCERO";
            }
            this._confirmar_SERA03();
          },
        );
      } else {
        this._confirmar_SERA03();
      }
    },
    _confirmar_SERA03() {
      CON851P("01", this._evaluaritem_SERA03, this._validartipoguradado_SERA03);
    },
    _validartipoguradado_SERA03() {
      if (this.estado_SERA03.substring(0, 1) == "7") {
        postData({ datosh: datosEnvio() + "9G|" }, get_url("APP/CONTAB/CON007.DLL"))
          .then(data => {
            data = data.split("|");
            let ultimo1 = "";
            ultimo1 = parseInt(data[1].substring(3, 9));
            this.SERA03.CONSECUTIVO = ultimo1.toString()
            postData({ datosh: datosEnvio() + "5|" + this.ano_SERA03 + this.SERA03.CONSECUTIVO.padStart(6, '0') + '|' }, get_url("APP/SALUD/SER-A03.DLL"))
              .then(data => {
                this.consecutivo_SERA03 = data
              })
              .catch(err => {
                console.error(err);
              });
          })
          .catch(err => {
            console.error(err);
          });
      }
      let datos = new Object();
      var lin = 1;
      datos.datosh =
        datosEnvio() +
        `3|${this.ano_SERA03}${this.consecutivo_SERA03}|${this.entidad_SERA03.padStart(10, "0")}|${prefijoMask_SERA03.value}${numerofacturaMask_SERA03.value.padStart(6, "0")}${pacienteMask_SERA03.unmaskedValue.padStart(15, "0")}|${this.novedad_SERA03.substring(0, 1)}|${this.anoaud_SERA03}${this.mesaud_SERA03}${this.diaaud_SERA03}|${this.radicado_SERA03}|${this.anoent_SERA03}${this.mesent_SERA03
        }${this.diaent_SERA03}|${this.estado_SERA03.substring(0, 1)}|${this.anoultdoc_SERA03}${this.mesultdoc_SERA03}${this.diaultdoc_SERA03}||${this.SERA03.LEVANTAGLO}|${this.SERA03.FECHALEVANTAGLO}|${this.SERA03.OPERLEVANTAGLO}|||||${localStorage.Usuario.trim()}|${localStorage.Usuario.trim()}|${this.responsable_SERA03.substring(0, 10)}|`;
      for (var i in this.SERA03.GLOSA.TABLA) {
        var datostablaestad = (datosarreglo = "");
        for (var x in this.SERA03.GLOSA.TABLA[i].TABESTAD) {
          if (this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRGLOSA.trim() == "") {
            this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRGLOSA = "000000000000.00";
          } else {
            if (this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRGLOSA.indexOf("-") < 0) {
              this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRGLOSA = this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRGLOSA.padStart(15, "0");
            } else {
              this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRGLOSA = this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRGLOSA.replace("-", "").padStart(14, "0");
              this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRGLOSA = `-${this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRGLOSA}`;
            }
          }
          if (this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRACEPT.trim() == "") {
            this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRACEPT = "000000000000.00";
          } else {
            if (this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRACEPT.indexOf("-") < 0) {
              this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRACEPT = this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRACEPT.padStart(15, "0");
            } else {
              this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRACEPT = this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRACEPT.replace("-", "").padStart(14, "0");
              this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRACEPT = `-${this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRACEPT}`;
            }
          }
          if (this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRRESPU.trim() == "") {
            this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRRESPU = "000000000000.00";
          } else {
            if (this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRRESPU.indexOf("-") < 0) {
              this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRRESPU = this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRRESPU.padStart(15, "0");
            } else {
              this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRRESPU = this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRRESPU.replace("-", "").padStart(14, "0");
              this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRRESPU = `-${this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRRESPU}`;
            }
          }
          datostablaestad = `${datostablaestad}${this.SERA03.GLOSA.TABLA[i].TABESTAD[x].FECHARESP}${this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRGLOSA.trim().replace(/,/g, "").padStart(15, "0")}${this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRACEPT.trim().replace(/,/g, "").padStart(15, "0")}${this.SERA03.GLOSA.TABLA[i].TABESTAD[x].VLRRESPU.trim().replace(/,/g, "").padStart(15, "0")}`;
          let estado = parseInt(x) + 1;
          datos[`DET-${lin.toString().padStart(2, "0")}${estado.toString()}`] = this.SERA03.GLOSA.TABLA[i].TABESTAD[x].DETALLES[0];
        }
        datos["LIN-" + lin.toString().padStart(3, "0")] = `${this.SERA03.GLOSA.TABLA[i].MOTIVO.trim()}|${this.SERA03.GLOSA.TABLA[i].REFER.trim()}|${datostablaestad}|`;
        lin++;
      }
      for (var i in this.SERA03.GLOSA.TABLAVALORESGLO) {
        if (this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTGLOSA.indexOf("-") >= 0) {
          this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTGLOSA = this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTGLOSA.replace("-", "");
          this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTGLOSA = `-${this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTGLOSA.trim().replace(/,/g, "").padStart(15, "0")}`;
        }
        if (this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTGLOSA.trim() == "") {
          this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTGLOSA = "000000000000.00";
        } else {
          this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTGLOSA = `${this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTGLOSA.trim().replace(/,/g, "").padStart(15, "0")}`;
        }
        if (this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTRESPU.indexOf("-") >= 0) {
          this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTRESPU = this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTRESPU.replace("-", "");
          this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTRESPU = `-${this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTRESPU.trim().replace(/,/g, "").padStart(15, "0")}`;
        }
        if (this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTRESPU.trim() == "") {
          this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTRESPU = "000000000000.00";
        } else {
          this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTRESPU = `${this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTRESPU.trim().replace(/,/g, "").padStart(15, "0")}`;
        }
        if (this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTACEPT.indexOf("-") >= 0) {
          this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTACEPT = this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTACEPT.trim().replace("-", "");
          this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTACEPT = `-${this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTACEPT.trim().replace(/,/g, "").padStart(15, "0")}`;
        }
        if (this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTACEPT.trim() == "") {
          this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTACEPT = "000000000000.00";
        } else {
          this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTACEPT = `${this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTACEPT.trim().replace(/,/g, "").padStart(15, "0")}`;
        }
        datosarreglo = datosarreglo + `${this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTGLOSA}${this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTACEPT}${this.SERA03.GLOSA.TABLAVALORESGLO[i].TOTRESPU}`;
      }
      datos["VALORES"] = `${datosarreglo}|`;
      datos["CONTAB"] = "";
      datos["CONTAB2"] = "";
      for (var i in this.SERA03.GLOSA.TABLACONTAB) {
        if (this.SERA03.GLOSA.TABLACONTAB[i].VLRCONTAB.trim() == "") this.SERA03.GLOSA.TABLACONTAB[i].VLRCONTAB = "000000000000.00";
        if (this.SERA03.GLOSA.TABLACONTAB2[i].VLRCONTAB.trim() == "") this.SERA03.GLOSA.TABLACONTAB2[i].VLRCONTAB = "000000000000.00";
        if (this.SERA03.GLOSA.TABLACONTAB[i].CTACONTAB.trim() == "") this.SERA03.GLOSA.TABLACONTAB[i].CTACONTAB = "00";
        if (this.SERA03.GLOSA.TABLACONTAB[i].COSTO.trim() == "") this.SERA03.GLOSA.TABLACONTAB[i].COSTO = "    ";
        datos["CONTAB"] = `${datos["CONTAB"]}${this.SERA03.GLOSA.TABLACONTAB[i].CTACONTAB}${this.SERA03.GLOSA.TABLACONTAB[i].COSTO}${this.SERA03.GLOSA.TABLACONTAB[i].VLRCONTAB.trim().replace(/,/g, "").padStart(15, "0")}`;
        datos["CONTAB2"] = `${datos["CONTAB2"]}${this.SERA03.GLOSA.TABLACONTAB2[i].VLRCONTAB.trim().replace(/,/g, "").padStart(15, "0")}`;
      }
      postData(datos, get_url("APP/SALUD/SER-A03.DLL"))
        .then(data => {
          if (this.novedad_SERA03.substring(0, 1) == "7") {
            postData({ datosh: datosEnvio() + `9G|${moment().format("YYMMDD")}|${this.consecutivo_SERA03}|` }, get_url("APP/CONTAB/CON007X.DLL"))
              .then(data => {
                this._actualizarcartera_SERA03();
              })
              .catch(error => {
                console.error(error);
                this._evaluarradicado_SERA03();
              });
          } else {
            this._actualizarcartera_SERA03();
          }
        })
        .catch(error => {
          console.error(error);
          this._evaluarradicado_SERA03();
        });
    },
    _actualizarcartera_SERA03() {
      postData({ datosh: datosEnvio() + `${prefijoMask_SERA03.value.trim()}${numerofacturaMask_SERA03.value.trim().padStart(6, "0")}|` }, get_url("APP/SALUD/SER-A03C.DLL"))
        .then(data => {
          let valoraceptado = totalaceptadoMask_SERA03.value.indexOf('-')
          if ((this.estado_SERA03.substring(0, 1) == 2 || this.estado_SERA03.substring(0, 1) == 4 || this.estado_SERA03.substring(0, 1) == 5) && (parseInt(totalaceptadoMask_SERA03.value) > 0)) {
            if (valoraceptado > 0) {
              this.SERA03.TIPONOTA = "1"
            } else {
              this.SERA03.TIPONOTA = "2"
            }
            if (prefijoMask_SERA03.value == 'Z') {
              CON851("", "CON EL PREFIJO Z SE DEBE DE CREAR LA NOTA MANUALMENTE SI LO REQUIREN!", null, "success", "")
              CON851("", "PROCESO TERMINADO", null, "success", "");
              this._inicializar_SERA03();
              CON850(this._evaluarCON850_SERA03);
            } else {
              this._crearnota_SERA03()
            }
          } else {
            CON851("", "PROCESO TERMINADO", null, "success", "");
            this._inicializar_SERA03();
            CON850(this._evaluarCON850_SERA03);
          }
        })
        .catch(error => {
          console.error(error);
          this._evaluarradicado_SERA03();
        });
    },
    _crearnota_SERA03() {
      postData({ datosh: `${datosEnvio()}4||||${prefijoMask_SERA03.value.trim()}|${prefijoMask_SERA03.value.trim()}${numerofacturaMask_SERA03.value.trim().padStart(6, "0")}|${this.anoultdoc_SERA03}|${this.entidad_SERA03}|${totalaceptadoMask_SERA03.value.replace(/,/g, "")}||||000000000000.00|000000000000.00|${totalaceptadoMask_SERA03.value.replace(/,/g, "")}||||${localStorage.Usuario.trim()}|${moment().format("YYYYMMDD")}|||${this.novedad_SERA03.substring(0, 1)}|${this.SERA03.TIPONOTA}|3|${this.ano_SERA03}${this.consecutivo_SERA03}|${this.estado_SERA03.substring(0, 1)}|` }
        , get_url("APP/INVENT/INV94E.DLL"))
        .then(data => {
          this.SERA03.TIPONOTA == '2'
            ? CON851("", `Se crean Nota Credito consecutivo Nro: ${data}`, null, "success", "")
            : CON851("", `Se crean Nota Debito consecutivo Nro: ${data}`, null, "success", "")
          CON851("", "PROCESO TERMINADO", null, "success", "");
          this._inicializar_SERA03();
          CON850(this._evaluarCON850_SERA03);
        })
        .catch(error => {
          console.error(error);
          this._evaluarradicado_SERA03();
        });

    },
    _f8entidad_SERA03() { },
    _f8consecutivo_SERA03() {
      set_Event_validar("#VALIDAR02_A03", "off");
      $("#con_SERA03").attr("disabled", "true");
      SERA83(this._leerconsecutivo_SERA03, this._evaluarnumeroglosa_SERA03);
    },
    _f8numeracion_SERA03(e) {
      if (e.keyCode == 119 || e.type == "click") {
        parametros = {
          dll: "NUMERACION",
          valoresselect: ["Nombre del tercero", "buscar paciente"],
          f8data: "NUMERACION",
          columnas: [{ title: "COD" }, { title: "FECHA_ING" }, { title: "DESCRIP" }, { title: "NOM_PAC" }, { title: "CONVENIO" }, { title: "ESTADO" }],
          filtro: prefijoMask_SERA03.value.toUpperCase().trim(),
          // fecha: `20${$_USUA_GLOBAL[0].FECHALNK.substring(0,4)}00`,
          prefijo: prefijoMask_SERA03.value,
          callback: data => {
            numerofacturaMask_SERA03.typedValue = data.COD.substring(1, 7);
            _enterInput("#factura_SERA03");
          },
          cancel: () => {
            this._evaluarnumerofactura_SERA03();
          },
        };
        F8LITE(parametros);
      }
    },
    _f8paciente_SERA03() {
      var $_this = this;
      let URL = get_url("APP/SALUD/SER810G" + ".DLL");
      postData({
        datosh: datosEnvio() + `${prefijoMask_SERA03.value.trim()}${numerofacturaMask_SERA03.value.trim().padStart(6, "0")}|`
      }, URL)
        .then((data) => {
          loader("hide");
          $_this.SERA03.PACIENTEFACT = data.COMPROBANTE
          $_this.SERA03.PACIENTEFACT.pop()
          _ventanaDatos({
            titulo: "VENTANA DE PACIENTES POR LA FACTURA " + `${prefijoMask_SERA03.value.trim()}${numerofacturaMask_SERA03.value.trim().padStart(6, "0")}`,
            columnas: ["ID", "PACIENTE", "FECHA", "COMPROBANTE", "CODIGO", "MEDICO", "VALOR"],
            data: $_this.SERA03.PACIENTEFACT,
            ancho: '90%',
            callback_esc: function () {
              $("#paciente_SERA03").focus();
            },
            callback: function (data) {
              pacienteMask_SERA03.typedValue = data.ID
              _enterInput('#paciente_SERA03');
            },
          });
        })
        .catch((error) => {
          console.log(error)
          this._evaluaringresofact_SER405()
        });
    },
    _ventanadecostos_SERA03(e) {
      if (e.which == 119 || e.type == 'click') {
        _ventanaDatos({
          titulo: "CENTROS DE COSTOS",
          columnas: ["COD", "NOMBRE"],
          data: this.SERA03.COSTOS,
          callback_esc: function () {
            $("#costos_SERA03").focus();
          },
          callback: function (data) {
            $('#costos_SERA03').val(data.COD.trim());
            _enterInput('#costos_SERA03');
          }
        });
      }
    },
    _ventanadeunidadfuncional_SERA03(e) {
      console.log(e);
      if (e.which == 119 || e.type == 'click') {
        _ventanaDatos({
          titulo: "UNIDADES FUNCIONALES",
          columnas: ["COD", "DESCRIP"],
          data: this.SERA03.SUBCUENTAS,
          callback_esc: function () {
            $("#unidadfuncional_SERA03").focus();
          },
          callback: function (data) {
            $('#unidadfuncional_SERA03').val(data.COD.trim());
            _enterInput('#unidadfuncional_SERA03');
          }
        });
      }
    },
    _ventanamotivosglosa_SERA03(e) {
      let $_this = this;
      if (e.which == 119 || e.type == 'click') {
        _ventanaDatos({
          titulo: "UNIDADES FUNCIONALES",
          columnas: ["CUENTA", "NOMBRE"],
          data: this.SERA03.MOTIVOS,
          callback_esc: function () {
            $(".motivoclass_SERA03").focus();
          },
          callback: function (data) {
            $_this.motivo_SERA03 = data.CUENTA.trim();
            _enterInput('.motivoclass_SERA03');
          }
        });
      }
    },
    _inicializar_SERA03() {
      this.novedad_SERA03 = "";
      this.ano_SERA03 = "";
      this.consecutivo_SERA03 = "";
      prefijoMask_SERA03.typedValue = "";
      numerofacturaMask_SERA03.typedValue = "";
      this.anoent_SERA03 = "";
      this.mesent_SERA03 = "";
      this.diaent_SERA03 = "";
      this.anoaud_SERA03 = "";
      this.mesaud_SERA03 = "";
      this.diaaud_SERA03 = "";
      this.anoultdoc_SERA03 = "";
      this.mesultdoc_SERA03 = "";
      this.diaultdoc_SERA03 = "";
      this.anocontab_SERA03 = "";
      this.mescontab_SERA03 = "";
      pacienteMask_SERA03.typedValue = "";
      this.descrippaciente_SERA03 = "";
      this.entidad_SERA03 = "";
      this.descripentidad_SERA03 = "";
      this.radicado_SERA03 = "";
      this.estado_SERA03 = "";
      this.referencia_SERA03 = "";
      this.motivo_SERA03 = "";
      this.motivod_SERA03 = "";
      this.anomotivo_SERA03 = "";
      this.mesmotivo_SERA03 = "";
      this.diamotivo_SERA03 = "";
      this.respuesta_SERA03 = "";
      this.valorrecobro_SERA03 = "";
      this.responsable_SERA03 = "";
      this.opercreado_SERA03 = "";
      this.fechacreado_SERA03 = "";
      this.opermodif_SERA03 = "";
      this.fechamodif_SERA03 = "";
      valorglosaMask_SERA03.typedValue = "";
      valorsoportadoMask_SERA03.typedValue = "";
      valoraceptadoMask_SERA03.typedValue = "";
      totalglosaMask_SERA03.typedValue = "";
      totalrespuMask_SERA03.typedValue = "";
      totalaceptadoMask_SERA03.typedValue = "";
      totalfactMask_SERA03.typedValue = "";
      abonosMask_SERA03.typedValue = "";
      saldofactMask_SERA03.typedValue = "";
    },
  },
});

var prefijoMask_SERA03 = IMask($("#prefijo_SERA03")[0], {
  mask: "a",
  definitions: {
    a: /[ABDFGHIJKLMNOPQRSTUVWXYZ]/,
  },
  prepare: function (str) {
    return str.toUpperCase();
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
var numerofacturaMask_SERA03 = IMask($("#factura_SERA03")[0], { mask: Number });
var itemMask_SERA03 = IMask($("#item_SERA03")[0], { mask: Number });
var pacienteMask_SERA03 = IMask($("#paciente_SERA03")[0], { mask: Number, thousandsSeparator: "," });
var valorglosaMask_SERA03 = IMask($("#valorglosa_SERA03")[0], {
  mask: Number,
  thousandsSeparator: ",",
  scale: 2,
  radix: ".",
  thousandsSeparator: ",",
  normalizeZeros: true,
  padFractionalZeros: true,
});
var valorsoportadoMask_SERA03 = IMask($("#valorsoportado_SERA03")[0], {
  mask: Number,
  thousandsSeparator: ",",
  scale: 2,
  radix: ".",
  thousandsSeparator: ",",
  normalizeZeros: true,
  padFractionalZeros: true,
});
var valoraceptadoMask_SERA03 = IMask($("#valoraceptado_SERA03")[0], {
  mask: Number,
  thousandsSeparator: ",",
  scale: 2,
  radix: ".",
  thousandsSeparator: ",",
  normalizeZeros: true,
  padFractionalZeros: true,
});
var totalglosaMask_SERA03 = IMask($("#totalglosa_SERA03")[0], {
  mask: Number,
  thousandsSeparator: ",",
  scale: 2,
  radix: ".",
  thousandsSeparator: ",",
  normalizeZeros: true,
  padFractionalZeros: true,
});
var totalrespuMask_SERA03 = IMask($("#totalsoportado_SERA03")[0], {
  mask: Number,
  thousandsSeparator: ",",
  scale: 2,
  radix: ".",
  thousandsSeparator: ",",
  normalizeZeros: true,
  padFractionalZeros: true,
});
var totalaceptadoMask_SERA03 = IMask($("#totalaceptado_SERA03")[0], {
  mask: Number,
  thousandsSeparator: ",",
  scale: 2,
  radix: ".",
  thousandsSeparator: ",",
  normalizeZeros: true,
  padFractionalZeros: true,
});
var totalfactMask_SERA03 = IMask($("#totalfact_SERA03")[0], {
  mask: Number,
  thousandsSeparator: ",",
  scale: 2,
  radix: ".",
  thousandsSeparator: ",",
  normalizeZeros: true,
  padFractionalZeros: true,
});
var abonosMask_SERA03 = IMask($("#abonos_SERA03")[0], {
  mask: Number,
  thousandsSeparator: ",",
  scale: 2,
  radix: ".",
  thousandsSeparator: ",",
  normalizeZeros: true,
  padFractionalZeros: true,
});
var saldofactMask_SERA03 = IMask($("#saldofact_SERA03")[0], {
  mask: Number,
  thousandsSeparator: ",",
  scale: 2,
  radix: ".",
  thousandsSeparator: ",",
  normalizeZeros: true,
  padFractionalZeros: true,
});