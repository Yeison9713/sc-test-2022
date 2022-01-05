
moment.locale('es')
var fecha_SER109L = IMask.createPipe({
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
        if (fecha == 'Invalid date') return '0000/00/00'
        return str;
    },
});

new Vue({
  el: "#ser109L",
  data: {
    SER109L: [],
    entidad_SER109L: "",
    numeroprefijo_SER109L: "",
    nombrepaciente_SER109L: "",
    estadofactura_SER109L: "",
    observacion_SER109L: "",
    anexos_SER109L: "",
    ano_SER109L: "",
    mes_SER109L: "",
    dia_SER109L: "",
    fechafactura_SER109L: "",
    operbloq_SER109L: "",
    valorsalmin_SER109L: "",
    topepoliza_SER109L: "",
    totalfact_SER109L: "",
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    nombreOpcion("9,7,4,3,8 - Imprimir fact. orden comprobante");
    
    this.SER109L.FECHALNK = `20${$_USUA_GLOBAL[0].FECHALNK}`;
    $_this = this;
    $_this._evaluarprefijofact_SER109L();
    obtenerDatosCompletos({ nombreFd: "PREFIJOS" }, (data) => {
      console.log(data);
      $_this.SER109L.PREFIJOS = data.PREFIJOS;
      obtenerDatosCompletos({ nombreFd: "CIUDADES" }, (data) => {
        $_this.SER109L.CIUDAD = data.CIUDAD;
        obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
          console.log(data);
          $_this.SER109L.FIRMAS = data.FIRMAS;
      })
      });
    });
  },
  methods: {
    _evaluarprefijofact_SER109L() {
      console.log('Prefijo')
      validarInputs(
        {
          form: "#VALIDAR1_SER109L",
          orden: "1",
        },
        _toggleNav,
        () => {
          this.SER109L.PREFIJOW = prefijoMask_SER109L.value;
          if (this.SER109L.PREFIJOW == "") {
            this._evaluarprefijofact_SER109L();
          } else {
            let URL = get_url("APP/CONTAB/CON007.DLL");
            postData({
              datosh: datosEnvio() + '9' + this.SER109L.PREFIJOW + '|'
            }, URL)
              .then(data => {
                data = data.split('|');
                this.numeroprefijo_SER109L = parseInt(data[1].substring(3, 9)) - 1
                this._evaluarctafact_SER109L();
              })
              .catch(error => {
                _toggleNav();
              });
          }
        }
      );
    },
    _evaluarctafact_SER109L() {
      validarInputs(
        {
          form: "#VALIDAR2_SER109L",
          orden: "1",
        },
        this._evaluarprefijofact_SER109L,
        () => {
          // if (this.numeroprefijo_SER109L.trim() == "" || parseInt(this.numeroprefijo_SER109L) == 0) {
          //   this._evaluarctafact_SER109L();
          // } else {
            this.SER109L.LLAVEW = this.SER109L.PREFIJOW + this.numeroprefijo_SER109L.toString().padStart(6, "0"),
              _ImpresionesActualizarCopagos({ LLAVENUM: this.SER109L.LLAVEW }, this._validarfactura_SER109L, this._evaluarctafact_SER109L);
          // }
        }
      );
    },
    _validarfactura_SER109L(data1, data2) {
      console.log(data1, data2, 'VALLIDAR FACT',)
      this.SER109L.NUMERACION = data1
      this.SER109L.VALORES = data2
      this.SER109L.FECHARETNUM = this.SER109L.NUMERACION.FECHARET_NUM;
      this.SER109L.FACTCAPITNUM = this.SER109L.NUMERACION.FACTCAPIT_NUM;
      this.SER109L.FECHAPRENUM = this.SER109L.NUMERACION.FECHAPRE_NUM;
      this.entidad_SER109L = this.SER109L.NUMERACION.DESCRIP_NUM;
      this.nombrepaciente_SER109L = this.SER109L.NUMERACION.NOMBREPAC_NUM;
      this.observacion_SER109L = this.SER109L.NUMERACION.OBSERV_NUM.trim();
      this.anexos_SER109L = this.SER109L.NUMERACION.ANEXOS_NUM.trim();
      let estado = { "0": "ACTIVA", "1": "CERRADA", "2": "ANULADA", "3": "BLOQUEADA", };
      this.estadofactura_SER109L = this.SER109L.NUMERACION.ESTADO_NUM + " - " + estado[this.SER109L.NUMERACION.ESTADO_NUM];
      if (this.SER109L.NUMERACION.ESTADO_NUM == '0' || this.SER109L.NUMERACION.ESTADO_NUM == '1') {
        $('#FECHARET_SER109L').removeClass('hidden');
        this.fechafactura_SER109L = fecha_SER109L(this.SER109L.NUMERACION.FECHARET_NUM)
      } else {
        $('#OPERBLOQUEO_SER109L').removeClass('hidden');
        this.operbloq_SER109L = this.SER109L.NUMERACION.OPERBLOQ_NUM
      }
      if (parseInt(this.SER109L.NUMERACION.FECHAPRE_NUM.substring(4, 6)) == 0) {
        if (
          parseInt(this.SER109L.NUMERACION.FECHARET_NUM.substring(4, 6)) > 0
        ) {
          this.ano_SER109L = this.SER109L.NUMERACION.FECHARET_NUM.substring(0, 4);
          this.mes_SER109L = this.SER109L.NUMERACION.FECHARET_NUM.substring(4, 6);
          this.dia_SER109L = this.SER109L.NUMERACION.FECHARET_NUM.substring(6, 8);
        } else {
          let fechaactual = moment().format("YYYYMMDD");
          this.ano_SER109L = fechaactual.substring(0, 4);
          this.mes_SER109L = fechaactual.substring(4, 6);
          this.dia_SER109L = fechaactual.substring(6, 8);
        }
      } else {
        this.ano_SER109L = this.SER109L.NUMERACION.FECHAPRE_NUM.substring(0, 4);
        this.mes_SER109L = this.SER109L.NUMERACION.FECHAPRE_NUM.substring(4, 6);
        this.dia_SER109L = this.SER109L.NUMERACION.FECHAPRE_NUM.substring(6, 8);
      }
      if (this.SER109L.PREFIJOW == 'T') {
        $('#VALORESCARTERA_109L').removeClass('hidden');
        this.valorsalmin_SER109L = this.SER109L.VALORES.SALMIN
        this.topepoliza_SER109L = this.SER109L.VALORES.TOPE
        this.totalfact_SER109L = this.SER109L.VALORES.TOTAL
      }
      this._afectarnumeracion_SER109L()
    },
    _afectarnumeracion_SER109L() {
      if (this.SER109L.NUMERACION.ESTADO_NUM == "0" || this.SER109L.NUMERACION.ESTADO_NUM == "3") {
        this._evaluarobservaciones_SER109L("1");
      } else {
        this._evaluarfechaimpresion_SER109L();
      }
    },
    _evaluarobservaciones_SER109L(orden) {
      _FloatText({ estado: "on", msg: [{ mensaje: "Oprima F3 para continuar" }, { mensaje: "Oprima F5 para salir" },], });
      validarInputs(
        {
          form: "#VALIDAR3_SER109L",
          orden: orden,
        },
        () => {
          this._evaluarctafact_SER109L();
        },
        () => {
          _FloatText({ estado: 'off' })
          if (this.SER109L.NUMERACION.ESTADO_NUM == "3") {
            this._grabarnumeracion_SER109L();
          } else {
            bloqueoMask_SER109L.typedValue = "N";
            this._evaluarbloqueofactura_SER109L();
          }
        }
      );
    },
    _evaluarbloqueofactura_SER109L() {
      validarInputs(
        {
          form: "#VALIDAR4_SER109L",
          orden: "1",
        },
        () => {
          this._evaluarctafact_SER109L();
        },
        () => {
          if (bloqueoMask_SER109L.value.trim() == "")
            bloqueoMask_SER109L.typedValue = "N";
          if (bloqueoMask_SER109L.value == "S") {
            this.estadofactura_SER109L = "3 - BLOQUEADA";
            this.SER109L.OPERBLOQNUM = localStorage.getItem("Usuario").trim();
          }
          this._grabarnumeracion_SER109L();
        }
      );
    },
    _grabarnumeracion_SER109L() {
      if (
        this.observacion_SER109L.trim() != this.SER109L.NUMERACION.OBSERV_NUM ||
        this.anexos_SER109L != this.SER109L.NUMERACION.ANEXOS_NUM ||
        this.estadofactura_SER109L.substring(0, 1) !=
        this.SER109L.NUMERACION.ESTADO_NUM
      ) {
        postData(
          {
            datosh:
              datosEnvio() +
              "2|" +
              $_USUA_GLOBAL[0].COD_CIUD +
              "|" +
              this.SER109L.LLAVEW +
              "|" +
              this.observacion_SER109L +
              "|" +
              this.anexos_SER109L +
              "|" +
              this.estadofactura_SER109L.substring(0, 1) +
              "|",
          },
          (URL = get_url("APP/SALUD/SER109D.DLL"))
        )
          .then((data) => {
            this._evaluarfechaimpresion_SER109L();
          })
          .catch((error) => {
            CON851("", "Error grabando numeración", this._evaluarctafact_SER109L(), "error","Error");
          });
      } else {
        this._evaluarfechaimpresion_SER109L("1");
      }
    },
    _evaluarfechaimpresion_SER109L(orden) {
      validarInputs(
        {
          form: "#VALIDAR5_SER109L",
          orden: orden,
        },
        this._evaluarbloqueofactura_SER109L,
        () => {
          var validate = moment(
            this.ano_SER109L + this.mes_SER109L + this.dia_SER109L
          ).format("YYYYMMDD");
          if (validate == "Invalid date") {
            CON851("37", "37", null, "error", "Error");
            this._evaluarfechaimpresion_SER109L("1");
          } else {
            drogueriaMask_SER109L.typedValue = "S";
            costodrogaMask_SER109L.typedValue = "N";
            cambfechaMask_SER109L.typedValue = "S";
            fechaatencionMask_SER109L.typedValue = "N";
            originalMask_SER109L.typedValue = "S";
            this._evaluardatosadicionales_SER109L();
          }
        }
      );
    },
    _evaluardatosadicionales_SER109L(orden) {
      validarInputs(
        {
          form: "#VALIDAR6_SER109L",
          orden: orden,
        },
        () => this._evaluarfechaimpresion_SER109L("1"),
        () => {
          postData(
            {
              datosh:
                datosEnvio() +
                this.SER109L.LLAVEW +
                "|" +
                drogueriaMask_SER109L.value.trim() +
                "|" +
                costodrogaMask_SER109L.value.trim() +
                "|" +
                cambfechaMask_SER109L.value.trim() +
                "|" +
                fechaatencionMask_SER109L.value.trim() +
                "|",
            },
            get_url("APP/SALUD/SER109L.DLL")
          )
            .then((data) => {
              console.log(data);
              let impresion_SER109L = new Object;
                let original = {
                    'S': '*** ORIGINAL ***',
                    'N': '*** COPIA ***'
                };
                impresion_SER109L.ORIGINAL = original[originalMask_SER109L.value.trim()];
                // impresion_SER109L.FECHAVENCE = 
                let fecha = '';
                if (parseInt($_USUA_GLOBAL[0].FECHALNK.substring(2, 4)) < 90) {
                    fecha = moment('20' + $_USUA_GLOBAL[0].FECHALNK, 'YYYYMMDD', 'es', true).format('MMMM DD YYYY');
                } else {
                    fecha = moment('19' + $_USUA_GLOBAL[0].FECHALNK, 'YYYYMMDD', 'es', true).format('MMMM DD YYYY');
                }
                impresion_SER109L.FECHA = fecha.toUpperCase();
                impresion_SER109L.LLAVE = `${prefijoMask_SER109L.value.trim()}${this.numeroprefijo_SER109L.trim().padStart(6, '0')}`
                impresion_SER109L.NOMTER = this.SER109L.NUMERACION.DESCRIP_TER;
                impresion_SER109L.NITTER = this.SER109L.NUMERACION.NIT_TER;
                impresion_SER109L.DVTER = this.SER109L.NUMERACION.DV_TER;
                impresion_SER109L.DIRECCTER = this.SER109L.NUMERACION.DIRECC_TER;
                impresion_SER109L.TELTER = this.SER109L.NUMERACION.TEL_TER;
                impresion_SER109L.CIUDADTER = this.SER109L.NUMERACION.CIUDAD_TER;
                impresion_SER109L.TARIF = 1;
                impresion_SER109L.DESCRIPTAR = this.SER109L.NUMERACION.CONVENIO_NUM;
                if (this.SER109L.NUMERACION.FACTCAPIT_NUM == `${prefijoMask_SER109L.value.trim()}${this.numeroprefijo_SER109L.trim().padStart(6, '0')}`) {
                    impresion_SER109L.REGIMEN = 'CAPITA'
                } else {
                    impresion_SER109L.REGIMEN = 'EVENTO'
                }
                let tipopaci = {
                    'C': 'CONTRIBUTIVO',
                    'S': 'SUBSIDIADO',
                    'V': 'VINCULADO',
                    'P': 'PARTICULAR',
                    'O': 'OTRO TIPO',
                    'D': 'DESPLAZADO CONTRIBUTIV',
                    'E': 'DESPLAZADO SUBSIDIADO',
                    'F': 'DESPLAZADO VINCULADO',
                    'X': ' '
                }
                impresion_SER109L.TIPOPACI = tipopaci[this.SER109L.NUMERACION.TIPOPACI_NUM];
                impresion_SER109L.OBSERVNUM = this.SER109L.NUMERACION.OBSERV_NUM;
                impresion_SER109L.ANEXOSNUM = this.SER109L.NUMERACION.ANEXOS_NUM;
                impresion_SER109L.FORMATOTABLA = 1;
                impresion_SER109L.WIDTH = ['5%', '8%', '19%', '5%', '4%', '25%', '3%', '8%', '8%', '5%', '8%', '3%'];
                impresion_SER109L.COLUMNAS = ["NRO_FACT", "FECHA", "DETALLE", "EDAD", "SEXO", "CONCEPTO", "CANTIDAD", "VALOR", "COPAGO", "NRO_AUTOR", "CODIGO", "ESPEC"];
                impresion_SER109L.FACTURAS = data.FACTURAS;
                impresion_SER109L.TABLARBOS_NUM = this.SER109L.NUMERACION.TABLARBOS_NUM;
                impresion_SER109L.COPAGO = this.SER109L.NUMERACION.COPAGO_NUM;
                let valorfact = 0;
                let copago = 0;
                let iva = 0;
                for (var i in impresion_SER109L.FACTURAS) {
                    valorfact = parseFloat(impresion_SER109L.FACTURAS[i].VALOR.replace(/,/g,'').trim().padStart(15, '0')) + valorfact;
                    copago = parseFloat(impresion_SER109L.FACTURAS[i].COPAGO.trim().padStart(15, '0')) + copago;
                    iva = parseFloat(impresion_SER109L.FACTURAS[i].IVA.replace(/,/g,'').trim().padStart(15, '0')) + iva;
                }
                let abonocopago = 0;
                for (var i in this.SER109L.NUMERACION.TABLARBOS_NUM) {
                    if (this.SER109L.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM.substring(0, 1) != 'G' && this.SER109L.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM.substring(1, 2) == 'R' && this.SER109L.NUMERACION.COPAGO_NUM != 0) {
                        if (parseInt(this.SER109L.NUMERACION.TABLARBOS_NUM[i].FECHAABON_NUM) <= parseInt(this.SER109L.NUMERACION.FECHAPRE_NUM)) {
                            abonocopago = parseFloat(this.SER109L.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM) + abonocopago;
                        }
                    }
                }
                impresion_SER109L.TABLARBOS_NUM = this.SER109L.NUMERACION.TABLARBOS_NUM;
                if ($_USUA_GLOBAL[0].NIT == 891855847) {
                    impresion_SER109L.SALDOCOPAGO = 0;
                } else {
                    if (($_USUA_GLOBAL[0].PUC == '6' || $_USUA_GLOBAL[0].PUC == '4') && ($_USUA_GLOBAL[0].NIT == 9990 || $_USUA_GLOBAL[0].NIT == 9999) && parseInt(this.SER109L.NUMERACION.FECHAING_NUM) > 20070903) {
                        impresion_SER109L.SALDOCOPAGO = parseInt(this.SER109L.NUMERACION.COPAGO_NUM) + abonocopago;
                    } else {
                        if (abonocopago != 0) {
                            impresion_SER109L.SALDOCOPAGO = 0;
                        } else {
                            impresion_SER109L.SALDOCOPAGO = parseInt(this.SER109L.NUMERACION.CO_PAGO_NUM);
                        }
                    }
                }
                impresion_SER109L.SALDO = valorfact - parseInt(this.SER109L.NUMERACION.CO_PAGO_NUM) - impresion_SER109L.SALDOCOPAGO;
                impresion_SER109L.VLRTOTAL = valorfact;
                let valorenletras = FAC146(valorfact);
                impresion_SER109L.NUMEROENLETRAS = valorenletras;
                let prefijo = this.SER109L.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == prefijoMask_SER109L.value.trim())
                if (prefijo.length == 0) {
                    prefijo[0] = new Object;
                    prefijo[0].AUT_DIAN = '';
                    prefijo[0].PREFIJO = prefijoMask_SER109L.value.trim();
                    prefijo[0].DESDE_NRO = '';
                    prefijo[0].HASTA_NRO = '';
                }
                impresion_SER109L.PREFIJO = prefijo;
                if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900755133 || $_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900161116 || $_USUA_GLOBAL[0].NIT == 900424844 || $_USUA_GLOBAL[0].NIT == 900870633) {
                    impresion_SER109L.FIRMA1 = localStorage.getItem('IDUSU')
                } else {
                    impresion_SER109L.FIRMA1 = this.SER109L.FIRMAS[0].DATOS_GER.substring(0, 10)
                }
                let comprobantes = impresion_SER109L.FACTURAS;
                comprobantes.sort((a, b) => {
                  if (a.NRO_FACT > b.NRO_FACT) {
                      return 1;
                  }
                  if (a.NRO_FACT < b.NRO_FACT) {
                      return -1;
                  }
                  return 0;
                })
                impresion_SER109L.FACTURAS = comprobantes;
                impresion_SER109L.OPERNUM = this.SER109L.NUMERACION.OPER_NUM;
                impresion_SER109L.OPERMODNUM = this.SER109L.NUMERACION.OPERMOD_NUM;
                impresion_SER109L.OPERBLOQNUM = this.SER109L.NUMERACION.OPERBLOQ_NUM;
                impresion_SER109L.ADMINW = localStorage.getItem('Usuario').trim();
                impresion_SER109L.FECHAIMPRESION = moment().format('YYMMDD');
                impresion_SER109L.FECHAOPER = moment(this.SER109L.NUMERACION.FECHAING_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109L.FECHAOPER == 'Invalid date') impresion_SER109L.FECHAOPER = '000000'
                impresion_SER109L.FECHAMODOPER = moment(this.SER109L.NUMERACION.FECHAMOD_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109L.FECHAMODOPER == 'Invalid date') impresion_SER109L.FECHAMODOPER = '000000'
                impresion_SER109L.FECHARETOPER = moment(this.SER109L.NUMERACION.FECHARET_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109L.FECHARETOPER == 'Invalid date') impresion_SER109L.FECHARETOPER = '000000'
                impresion_SER109L.MARGIN = [10, 140, 10, 20];
                impresion_SER109L.IMPRESION = 'SER109F';
                _impresionformatoSER109(impresion_SER109L, this._cerrarnumeracion_SER109L, () => {this._evaluardatosadicionales_SER109L('4')});
            })
            .catch((error) => {
              console.error(error);
              this._evaluardatosadicionales_SER109L("4");
            });
        }
      );
    },
    _cerrarnumeracion_SER109L() {
      if (this.estadofactura_SER109L.substring(0, 1) == '0' || this.estadofactura_SER109L.substring(0, 1) == '3') {
          if (this.SER109L.PREFIJOW == 'A' || this.SER109L.PREFIJOW == 'B' || this.SER109L.PREFIJOW == 'D' || this.SER109L.PREFIJOW == 'F' || this.SER109L.PREFIJOW == 'G' ||
              this.SER109L.PREFIJOW == 'H' || this.SER109L.PREFIJOW == 'I' || this.SER109L.PREFIJOW == 'J' || this.SER109L.PREFIJOW == 'K') {
              if (this.SER109L.FECHALNK.substring(0, 4) == this.SER109L.NUMERACION.FECHAING_NUM.substring(0, 4) && this.SER109L.FECHALNK.substring(4, 6) == this.SER109L.NUMERACION.FECHAING_NUM.substring(4, 6)) {
                  _cerrarnumeracion_VENTANA(_toggleNav, this._evaluarprefijofact_SER109L, params = { LLAVE_NUM: this.SER109L.LLAVEW , PREFIJOW: this.SER109L.PREFIJOW , FECHAING_NUM: this.SER109L.NUMERACION.FECHAING_NUM, ESTADOW: this.estadofactura_SER109L.substring(0,1), FECHALNK: `20${$_USUA_GLOBAL[0].FECHALNK}` });
              } else {
                  CON851('3G', '3G', null, 'error', 'Error');
                  _toggleNav();
              }
          } else {
            _cerrarnumeracion_VENTANA(_toggleNav, this._evaluarprefijofact_SER109L, params = { LLAVE_NUM: this.SER109L.LLAVEW , PREFIJOW: this.SER109L.PREFIJOW , FECHAING_NUM: this.SER109L.NUMERACION.FECHAING_NUM, ESTADOW: this.estadofactura_SER109L.substring(0,1), FECHALNK: `20${$_USUA_GLOBAL[0].FECHALNK}` });
          }
      } else {
          _toggleNav();
      }
    },
  }
});

var prefijoMask_SER109L = IMask($("#prefijo_SER109L")[0], {
  mask: "a",
  definitions: {
    a: /[APTBDFGHIJKLMNOQRSVWXYZ]/,
  },
  prepare: function (str) {
    return str.toUpperCase();
  },
  commit: function (value, masked) {
    masked._value = value.toUpperCase();
  },
});

var bloqueoMask_SER109L = IMask($("#bloquearfactura_SER109L")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    return str.toUpperCase();
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
var drogueriaMask_SER109L = IMask($("#bloqueardrogueria_SER109L")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    return str.toUpperCase();
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
var costodrogaMask_SER109L = IMask($("#costodroga_SER109L")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    return str.toUpperCase();
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
var cambfechaMask_SER109L = IMask($("#cambfecha_SER109L")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    return str.toUpperCase();
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
var fechaatencionMask_SER109L = IMask($("#fechaatencion_SER109L")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    return str.toUpperCase();
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
var originalMask_SER109L = IMask($("#original_SER109L")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    return str.toUpperCase();
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
