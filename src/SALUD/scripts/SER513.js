const { isNumeric, trim } = require("jquery");
const { TouchBarScrubber } = require("electron");

var fecha_SER513 = IMask.createPipe({
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

var valores_SER513 = IMask.createPipe({
  mask: Number,
  scale: 2,
  radix: '.',
  thousandsSeparator: ',',
  normalizeZeros: true,
  padFractionalZeros: true,
  min: -999999999999,
  max: 999999999999
});

const moment = require("moment");

new Vue({
  el: "#SER513",
  data: {
    SER513: [],
    _ENVIOS: [],
    form: {
      prefijo_SER513: "",
      numero_SER513: "",
      estado_SER513: '',
      convenio_SER513: '',
      creado_SER513: '',
      modificado_SER513: '',
      bloq_SER513: '',
      nit_SER513: '',
      fechaenvio_SER513: '',
      fechaapertura_SER513: '',
      fechacierre_SER513: '',

      anopresente_SER513: '',
      mespresente_SER513: '',
      diapresente_SER513: '',
      anorepret_SER513: '0000',
      mesrepre_SER513: '00',
      diarepre_SER513: '00',
      anoperiodorad_SER513: '',
      mesperiodorad_SER513: '',
      diaperiodorad_SER513: '',
      anoradglosa_SER513: '0000',
      mesradglosa_SER513: '00',
      diaradglosa_SER513: '00',

      fechaglosa_SER513: '',
      radicacion_SER513: '',
      vlrglosa_SER513: '',
      vlrsoportado_SER513: '',
      factarm_SER513: '',
      armadfact_SER513: '',
      armarad_SER513: '',
      radicarma_SER513: '',
      fecharad_SER513: '',
      operradi_SER513: '',
      copagoesti_SER513: '',
      totalfact_SER513: '',
      totalabono_SER513: '',
      saldoneto_SER513: '',
      nroenvioelect_SER513: '',
      fecharadelect_SER513: '',
      cufe_SER513: '',

      anovenci_SER513: '',
      mesvenci_SER513: '',
      diavenci_SER513: '',
    },
    tablaabon_SER513: [],
    tablafact_SER513: [],
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,5,1,3 - Act. radicado de cuentas");
    this.SER513.FECHAACTUAL = moment().format("YYYYMMDD");
    this.SER513.ANOINIW = this.SER513.FECHAACTUAL.substring(0, 4)
    this.SER513.ANOSIST = this.SER513.FECHAACTUAL.substring(0, 4)
    this.SER513.ANOLNK = 20 + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
    this.SER513.MESLNK = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
    this.SER513.DIALNK = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6)
    this.SER513.ANOX = ''
    this.SER513.ENVIOFACTELEC = ''
    this.SER513.FECHAREPREW = '00000000'
    this.SER513.FECHARADGLOW = '00000000'
    this.SER513.ANOALFA = parseInt(this.SER513.ANOLNK);
    this.SER513.ANOALFAW = parseInt(this.SER513.ANOALFA) + 1;
    var $_this = this;
    obtenerDatosCompletos({
      nombreFd: 'ENVIOS',
      // filtro: this.SER513.ANOLNK + $_USUA_GLOBAL[0].FECHALNK.substring(2, 4)
    }, function (data) {
      this._ENVIOS = data.ENVIOS;
      this._ENVIOS.pop();
      $_this.SER513.FILTROENVIO = this._ENVIOS.filter(e => e.PER.trim() == $_this.SER513.ANOLNK + $_this.SER513.MESLNK);
      obtenerDatosCompletos({
        nombreFd: 'PREFIJOS',
      }, function (data) {
        $_this.SER513.PREFIJOS = data.PREFIJOS;
        $_this._evaluarprefijo_SER513();
      })
    })
  },
  methods: {
    _evaluarprefijo_SER513() {
      loader("hide");
      _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F2 para buscar envio' }] })
      validarInputs(
        {
          form: "#VALIDARPREFIJO_513",
          orden: "1",
          event_f2: () => {
            this._ventanabuscarenvio_513()
          }
        }, () => {
          _toggleNav()
        },
        () => {
          this.form.prefijo_SER513 = this.form.prefijo_SER513.toUpperCase();
          if (this.form.prefijo_SER513.trim() == "" || this.form.prefijo_SER513.trim() == "C" || this.form.prefijo_SER513.trim() == "E" ||
            this.form.prefijo_SER513.trim() == "U" || this.form.prefijo_SER513.trim() == "Ñ") {
            CON851("", "Prefijo incorrecto", this._evaluarprefijo_SER513(), "error", "Error");
          } else {
            this._evaluarnumerofact_SER513()
          }
        },
      );
    },
    _evaluarnumerofact_SER513() {
      _FloatText({ estado: 'off' })
      validarInputs(
        {
          form: "#VALIDARNUMERO_513",
          orden: "1"
        },
        this._evaluarprefijo_SER513,
        () => {
          if (isNumeric(this.form.numero_SER513)) {
            this.form.numero_SER513 = this.form.numero_SER513.toString().padStart(6, '0')
            this.SER513.LLAVEW = this.form.prefijo_SER513.trim() + this.form.numero_SER513.trim()
            postData({ datosh: datosEnvio() + this.form.prefijo_SER513.trim() + this.form.numero_SER513.trim() + "|" }, get_url("APP/SALUD/SER808-01.DLL"))
              .then(data => {
                this.SER513.FACTURA = data.NUMER19[0];
                let estado = {
                  '0': 'Activo',
                  '1': 'Retirado',
                  '2': 'Anulado',
                  '3': 'Bloqueo'
                }
                this.form.nit_SER513 = this.SER513.FACTURA.NIT_NUM;
                this.form.descripnit_SER513 = this.SER513.FACTURA.DESCRIP_NUM;
                this.form.estado_SER513 = this.SER513.FACTURA.ESTADO_NUM + '  -  ' + estado[this.SER513.FACTURA.ESTADO_NUM];
                this.SER513.ESTADOW = this.SER513.FACTURA.ESTADO_NUM;
                this.SER513.FACTCAPITW = this.SER513.FACTURA.FACTCAPIT_NUM
                this.SER513.NROCAPITW = this.SER513.FACTURA.FACTCAPIT_NUM.substring(1, 7)
                this.form.convenio_SER513 = this.SER513.FACTURA.CONVENIO_NUM;
                this.form.fechaapertura_SER513 = fecha_SER513(this.SER513.FACTURA.FECHA_ING);

                this.SER513.ANOINGW = this.SER513.FACTURA.FECHA_ING.substring(0, 4)
                this.form.fechacierre_SER513 = fecha_SER513(this.SER513.FACTURA.FECHA_RET);
                this.SER513.ANORETW = this.SER513.FACTURA.FECHA_RET.substring(0, 4)
                this.SER513.MESRETW = this.SER513.FACTURA.FECHA_RET.substring(4, 6)
                this.SER513.DIARETW = this.SER513.FACTURA.FECHA_RET.substring(6, 8)

                this.SER513.FECHAPREW = this.SER513.FACTURA.FECHA_PRE;
                this.form.anopresente_SER513 = this.SER513.FACTURA.FECHA_PRE.substring(0, 4)
                this.form.mespresente_SER513 = this.SER513.FACTURA.FECHA_PRE.substring(4, 6)
                this.form.diapresente_SER513 = this.SER513.FACTURA.FECHA_PRE.substring(6, 8)
                this.SER513.RADICADOEXTERW = this.SER513.FACTURA.RADICADOEXT_NUM.trim()
                this.SER513.RADICADOEXTERX = this.SER513.FACTURA.RADICADOEXT_NUM.trim()
                this.SER513.FECHAREPREW = this.SER513.FACTURA.FECHAREPRE_NUM;
                this.form.anorepret_SER513 = this.SER513.FECHAREPREW.substring(0, 4)
                this.form.mesrepre_SER513 = this.SER513.FECHAREPREW.substring(4, 6)
                this.form.diarepre_SER513 = this.SER513.FECHAREPREW.substring(6, 8)
                this.form.numeroenvio_SER513 = this.SER513.FACTURA.ENVIO_NUM
                this.form.anoperiodorad_SER513 = this.SER513.FACTURA.PERCONTRAD_NUM.substring(0, 2)
                this.form.mesperiodorad_SER513 = this.SER513.FACTURA.PERCONTRAD_NUM.substring(2, 4)
                this.SER513.ANOENV = this.SER513.FACTURA.FECHAENV_NUM.substring(0, 4)
                this.SER513.MESENV = this.SER513.FACTURA.FECHAENV_NUM.substring(4, 6)
                this.SER513.DIAENV = this.SER513.FACTURA.FECHAENV_NUM.substring(6, 8)
                this.SER513.NROENVIOW = this.SER513.FACTURA.ENVIO_NUM
                let tabla = this.SER513.FACTURA.TABLA_ABON.filter(x => x.SECU_ABON.trim() != 0 && x.SECU_ABON.trim() != '')
                let fact = this.SER513.FACTURA.TABLA_FACT.filter(x => parseInt(x.VLR_FACT) > 0);
                this.tablaabon_SER513 = tabla;
                this.tablafact_SER513 = fact;
                this.form.fechaglosa_SER513 = fecha_SER513(this.SER513.FACTURA.FECHAGLOSA_NUM);
                this.form.radicacion_SER513 = this.SER513.FACTURA.RADIC_NUM;
                this.form.vlrglosa_SER513 = valores_SER513(this.SER513.FACTURA.GLOSA_NUM);
                this.form.anoradglosa_SER513 = this.SER513.FACTURA.FECHARADGLO_NUM.substring(0, 4)
                this.form.mesradglosa_SER513 = this.SER513.FACTURA.FECHARADGLO_NUM.substring(4, 6)
                this.form.diaradglosa_SER513 = this.SER513.FACTURA.FECHARADGLO_NUM.substring(6, 8)
                this.form.vlrsoportado_SER513 = valores_SER513(this.SER513.FACTURA.RESPGLOSA_NUM);
                this.form.creado_SER513 = this.SER513.FACTURA.OPER_NUM;
                this.form.modificado_SER513 = this.SER513.FACTURA.OPERMOD_NUM;
                this.form.bloq_SER513 = this.SER513.FACTURA.OPERBLOQ_NUM;
                this.form.factarm_SER513 = this.SER513.FACTURA.DOCUMFACT_NUM + ' - ' + fecha_SER513(this.SER513.FACTURA.FECHAFACT_NUM);
                this.form.armadfact_SER513 = this.SER513.FACTURA.DOCUMARMAFACT_NUM + ' - ' + fecha_SER513(this.SER513.FACTURA.FECHAARMA_NUM);
                this.form.armarad_SER513 = this.SER513.FACTURA.DOCUMARMARAD_NUM + ' - ' + fecha_SER513(this.SER513.FACTURA.FECHAARMARADI_NUM);
                this.form.radicarma_SER513 = this.SER513.FACTURA.DOCRADIARMA_NUM + ' - ' + fecha_SER513(this.SER513.FACTURA.FECHARADIARMA_NUM);
                this.form.copagoesti_SER513 = valores_SER513(parseFloat(this.SER513.FACTURA.COPAGOEST_NUM).toString());
                this.form.radicadoext_SER513 = this.SER513.FACTURA.RADICADOEXT_NUM
                this.form.nroenvioelect_SER513 = this.SER513.FACTURA.ELENVIO
                this.form.fecharadelect_SER513 = fecha_SER513(this.SER513.FACTURA.FECHA_ELENV)
                this.form.cufe_SER513 = this.SER513.FACTURA.CUFEELEC_NUM.trim()
                this.SER513.CUFEELECNUM = this.SER513.FACTURA.CUFEELEC_NUM.trim()
                this.SER513.ESTADOELECNUM = this.SER513.FACTURA.ESTADOELEC_NUM.trim()
                this.form.anovenci_SER513 = this.SER513.FACTURA.FECHAVENCE_NUM.substring(0, 4)
                this.form.mesvenci_SER513 = this.SER513.FACTURA.FECHAVENCE_NUM.substring(4, 6)
                this.form.diavenci_SER513 = this.SER513.FACTURA.FECHAVENCE_NUM.substring(6, 8)
                let totalfact = 0;
                for (var i in this.tablafact_SER513) {
                  if (parseInt(this.tablafact_SER513[i].VLR_FACT) > 0) {
                    totalfact = totalfact + parseInt(this.tablafact_SER513[i].VLR_FACT);
                  }
                }
                let totalabon = 0;
                for (var i in this.tablaabon_SER513) {
                  if (parseInt(this.tablaabon_SER513[i].VLR_ABON) > 0) {
                    totalabon = totalabon - parseInt(this.tablaabon_SER513[i].VLR_ABON);
                  }
                }

                this.form.totalfact_SER513 = valores_SER513(totalfact.toString());
                this.form.copagos_SER513 = valores_SER513(parseInt(this.SER513.FACTURA.COPAGOS_NUM).toString());

                // this.form.totalabono_SER513 = valores_SER513(totalabon.toString());
                this.SER513.VLRABONOW = this.SER513.FACTURA.VLRTOTALABON.padStart(16, '0')
                if (this.SER513.FACTURA.VLRTOTALABON.indexOf('-') >= 0) {
                  this.SER513.VALORABONO = parseInt(this.SER513.FACTURA.VLRTOTALABON.replace('-', '')) * (-1)
                  this.form.totalabono_SER513 = valores_SER513(this.SER513.VALORABONO.toString());
                } else {
                  if (this.SER513.FACTURA.VLRTOTALABON.trim() == '') {
                    this.form.totalabono_SER513 = valores_SER513(parseInt(0).toString());
                  } else {
                    this.form.totalabono_SER513 = valores_SER513(parseInt(this.SER513.FACTURA.VLRTOTALABON).toString());
                  }
                }



                let abono = this.SER513.VLRABONOW.indexOf('-');
                if (abono >= 0) this.SER513.VLRABONOW = parseInt(this.SER513.VLRABONOW) * -1

                this.form.saldoneto_SER513 = totalfact + totalabon - parseInt(this.SER513.FACTURA.COPAGOS_NUM);
                this.form.saldoneto_SER513 = valores_SER513(this.form.saldoneto_SER513.toString())

                postData({ datosh: datosEnvio() + this.form.numeroenvio_SER513.trim() + "|" }, get_url("APP/SALUD/SAL504D.DLL"))
                  .then(data => {
                    this.form.fechaenvio_SER513 = fecha_SER513(data)
                    this._evaluarterceros_SER513();
                  })
                  .catch(err => {
                    this._evaluarnumerofact_SER513();
                  });
              })
              .catch(err => {
                console.error(err);
                this._evaluarnumerofact_SER513();
              });
          } else {
            CON851("01", "01", this._evaluarnumerofact_SER513(), "error", "Error");
          }
        },
      );
    },
    _evaluarterceros_SER513() {
      postData({ datosh: datosEnvio() + '1|' + this.form.nit_SER513 + "|" + this.SER513.NROENVIOW + "|" }, get_url("APP/SALUD/SER513.DLL"))
        .then(data => {
          this.SER513.FECHAENV = data.CONSULTA[0].FECHA
          this.SER513.ACTIVITER = data.CONSULTA[0].ACTIVIDAD
          if (this.SER513.ESTADOW != 1 || this.SER513.MESRETW == 00) {
            CON851("1B", "1B", this._evaluarprefijo_SER513(), "error", "Error");
          } else if (this.SER513.NROCAPITW > 0 && this.SER513.FACTCAPITW != this.SER513.LLAVEW) {
            CON851("1W", "1W", this._evaluarprefijo_SER513(), "error", "Error");
          } else {
            if (this.SER513.FACTCAPITW == this.SER513.LLAVEW || $_USUA_GLOBAL[0].NIT == 891855847 || $_USUA_GLOBAL[0].NIT == 900425676 || (this.SER513.ACTIVITER == '27' || this.SER513.ACTIVITER == '25' || this.SER513.ACTIVITER == '30')) {
              this._evaluaranoradglosas_SER513()
            } else if ($_USUA_GLOBAL[0].NIT == 800037202 && this.SER513.ANOINGW == 2016) {
              this._evaluaranoradglosas_SER513()
            } else {
              // SE AGREGA PERMISO PARA FACTURACION ANTERIOR A PROSOF EN ACACIAS
              if (localStorage.Usuario == 'EPRC' && this.SER513.FACTURA.FECHA_ING == '20210113' && $_USUA_GLOBAL[0].NIT == 892000264) {
                this._evaluaranoradglosas_SER513()
              } else {
                if (this.SER513.NROENVIOW == 00000) {
                  CON851("", "Sin numero de envio", this._validacionesenvio2_SER13(), "error", "Error");
                } else {
                  this._evaluaranoradglosas_SER513()
                }
              }
            }
          }
        })
        .catch(err => {
          console.error(err)
          this._evaluarnumerofact_SER513()
        });
    },
    _validacionesenvio2_SER13() {
      if (this.SER513.ANORETW == this.SER513.ANOINIW) {
        if (localStorage.getItem('Usuario').trim() == 'GEBC') {
          this._evaluaranopresent_SER513();
        } else {
          if ($_USUA_GLOBAL[0].NIT == 830512772 || $_USUA_GLOBAL[0].NIT == 845000038) {
            this._evaluaranoradglosas_SER513()
          } else {
            this._evaluarprefijo_SER513()
          }
        }
      } else {
        this._evaluaranoradglosas_SER513()
      }
    },
    _evaluaranoradglosas_SER513() {
      if (this.form.mespresente_SER513 == 00) {
        this._confirmarreenvio_SER513()
      } else {
        validarInputs(
          {
            form: "#VALIDARANOGLOSAS_513",
            orden: '1',
          },
          this._evaluarprefijo_SER513,
          () => {
            if (this.form.anoradglosa_SER513 == this.SER513.ANOALFA || this.form.anoradglosa_SER513 == this.SER513.ANOALFAW) {
              this._evaluarmesradglosas_SER513()
            } else {
              CON851("03", "03", null, "error", "error");
              if (localStorage.getItem('Usuario').trim() == 'GEBC') {
                this._evaluarmesradglosas_SER513()
              } else {
                if ($_USUA_GLOBAL[0].NIT == 800037202 && this.SER513.ANOINGW == 2016) {
                  this._evaluarmesradglosas_SER513()
                } else {
                  this._evaluaranoradglosas_SER513()
                }
              }
            }
          },
        );
      }
    },
    _evaluarmesradglosas_SER513() {
      validarInputs(
        {
          form: "#VALIDARMESGLOSAS_513",
          orden: '1',
        },
        this._evaluaranoradglosas_SER513,
        () => {
          this.form.mesradglosa_SER513 = this.form.mesradglosa_SER513.padStart(2, "0");
          if (this.form.mesradglosa_SER513.trim() == "" || this.form.mesradglosa_SER513 < 1 || this.form.mesradglosa_SER513 > 12) {
            CON851("03", "03 ", null, "error", "error");
            if (localStorage.getItem('Usuario').trim() == 'GEBC') {
              this._evaluardiaradglosas_SER513()
            } else {
              this._evaluarmesradglosas_SER513()
            }
          } else {
            this._evaluardiaradglosas_SER513()
          }
        },
      );
    },
    _evaluardiaradglosas_SER513() {
      validarInputs(
        {
          form: "#VALIDARDIAGLOSAS_513",
          orden: '1',
        }, this._evaluarmesradglosas_SER513,
        () => {
          this.form.diaradglosa_SER513 = this.form.diaradglosa_SER513.padStart(2, "0");
          this.SER513.FECHARADGLOW = this.form.anoradglosa_SER513 + this.form.mesradglosa_SER513 + this.form.diaradglosa_SER513
          if (this.form.diaradglosa_SER513 > $_USUA_GLOBAL[0].FECHALNK.substring(4, 6)) {
            this._evaluardiaradglosas_SER513()
          } else {
            if (this.SER513.ANORETW != this.SER513.ANOINIW || this.SER513.MESENV == 00) {
              this._validacionfecharadglosas_SER513()
            } else {
              if (this.SER513.FECHARADGLOW < this.form.fechapresent_SER513) {
                CON851("", "FECHA NO PUEDE SER MENOR A LA DEL RADICADO ", this._evaluardiaradglosas_SER513(), "error", "error");
              } else {
                this._confirmarreenvio_SER513()
              }
            }
          }
        },
      );
    },
    _validacionfecharadglosas_SER513() {
      if (this.SER513.FECHARADGLOW < this.form.fechapresent_SER513) {
        CON851("", "FECHA NO PUEDE SER MENOR A LA DEL CIERRE", this._evaluardiaradglosas_SER513(), "error", "error");
        if (localStorage.getItem('Usuario').trim() == 'GEBC') {
          this._confirmarreenvio_SER513()
        } else {
          this._evaluardiaradglosas_SER513()
        }
      } else {
        this._confirmarreenvio_SER513()
      }
    },
    _confirmarreenvio_SER513() {
      if (this.form.mespresente_SER513 == 00) {
        this._evaluarfechapresent_SER513()
      } else {
        CON851P('32', this._evaluarperiodocontab_SER513, this._initializefechapre_SER513)
      }
    },
    _initializefechapre_SER513() {
      this.SER513.FECHAREPREW = this.SER513.FECHAPREW;
      this.form.anorepret_SER513 = this.SER513.FECHAREPREW.substring(0, 4)
      this.form.mesrepre_SER513 = this.SER513.FECHAREPREW.substring(4, 6)
      this.form.diarepre_SER513 = this.SER513.FECHAREPREW.substring(6, 8)
      this._evaluaranopresent_SER513()
    },
    _evaluarfechapresent_SER513() {
      if (this.form.anopresente_SER513 == 0000) {
        this.form.anopresente_SER513 = this.SER513.ANOALFA
        this.form.mespresente_SER513 = this.SER513.MESLNK
      }
      this._evaluaranopresent_SER513()
    },
    _evaluaranopresent_SER513() {
      validarInputs(
        {
          form: "#VALIDARANOPRE_513",
          orden: '1',
        }, this._evaluarprefijo_SER513,
        () => {
          if (this.form.anopresente_SER513 == this.SER513.ANOALFA || this.form.anopresente_SER513 == this.SER513.ANOALFAW) {
            this._evaluarmespresent_SER513()
          } else {
            CON851("03", "03 ", null, "error", "error");
            if (localStorage.getItem('Usuario').trim() == 'GEBC') {
              this._evaluarmespresent_SER513()
            } else {
              if ($_USUA_GLOBAL[0].NIT == 800037202 && this.SER513.ANOINGW == '2016') {
                this._evaluarmespresent_SER513()
              } else {
                this._evaluaranopresent_SER513()
              }
            }
          }
        },
      );
    },
    _evaluarmespresent_SER513() {
      validarInputs(
        {
          form: "#VALIDARMESPRE_513",
          orden: '1',
        },
        this._evaluaranopresent_SER513,
        () => {
          this.form.mespresente_SER513 = this.form.mespresente_SER513.padStart(2, "0");
          if (this.form.mespresente_SER513 == 00 || this.form.mespresente_SER513 > 12) {
            CON851("03", "03 ", null, "error", "error");
            if (localStorage.getItem('Usuario').trim() == 'GEBC') {
              this._evaluardiapresent_SER513()
            } else {
              this._evaluarmespresent_SER513()
            }
          } else {
            this._evaluardiapresent_SER513()
          }
        },
      );
    },
    _evaluardiapresent_SER513() {
      validarInputs(
        {
          form: "#VALIDARDIAPRE_513",
          orden: '1',
        },
        this._evaluarmespresent_SER513,
        () => {
          this.form.diapresente_SER513 = this.form.diapresente_SER513.padStart(2, "0");
          this.SER513.FECHAPREW = this.form.anopresente_SER513 + this.form.mespresente_SER513 + this.form.diapresente_SER513
          if (this.form.diapresente_SER513 > $_USUA_GLOBAL[0].FECHALNK.substring(4, 6)) {
            this._evaluardiapresent_SER513()
          } else {
            if (this.SER513.ANORETW != this.SER513.ANOINIW || this.SER513.MESENV == 00) {
              this._validacionfechapresente_SER513()
            } else {
              if (this.SER513.FECHAPREW < this.SER513.FECHAENV) {
                CON851("", "FECHA NO PUEDE SER MENOR A LA DEL ENVIO!", this._evaluardiapresent_SER513(), "error", "error");
              } else {
                this._evaluardatoradext_SER513()
              }
            }
          }
        },
      );
    },
    _validacionfechapresente_SER513() {
      if (this.SER513.FECHAPREW < this.form.fechacierre_SER513) {
        CON851("", "FECHA NO PUEDE SER MENOR A LA DEL CIERRE ", null, "error", "error");
        if (localStorage.getItem('Usuario').trim() == 'GEBC') {
          this._confirmargrabar_SER513()
        } else {
          this._evaluardiapresent_SER513()
        }
      } else {
        this._evaluardatoradext_SER513()
      }
    },
    _evaluardatoradext_SER513() {
      var $_this = this;
      $('#radicadoext1_ser513').val(this.SER513.RADICADOEXTERW)
      var ventanaradicadoext1 = bootbox.dialog({
        size: 'medium',
        title: 'NRO DE RADICADO - EXTERNO',
        message: '<div class="row"> ' +
          '<div class="col-md-12"> ' +

          '<div class="col-md-10 col-sm-6 col-xs-6"> ' +
          '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Nro:" + '</label> ' +
          '<div class="col-md-6 col-sm-6 col-xs-6" id="RADEXT1_513"> ' +
          '<input id="radicadoext1_ser513" class="form-control input-md" data-orden="1" maxlength="15"> ' +
          '</div> ' +
          '</div> ' +
          // '<div class="salto-linea"></div>' +
          // '<div class="col-md-10 col-sm-6 col-xs-6"> ' +
          // '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Enviar Eletronica:" + '</label> ' +
          // '<div class="col-md-4 col-sm-6 col-xs-6" id="ENVIOELEFACT_513"> ' +
          // '<input id="enviolec_ser513" class="form-control input-md" data-orden="1" maxlength="1 placeholder= "S/N"> ' +
          // '</div> ' +
          // '</div> ' +
          '</div>' +
          '</div>',
        buttons: {
          confirm: {
            label: 'Aceptar',
            className: 'btn-primary',
            callback: function () {
              ventanaradicadoext1.off('show.bs.modal');
              setTimeout(() => { $_this._evaluarrepres_SER513('1') }, 500)


            }
          },
          cancelar: {
            label: 'Cancelar',
            className: 'btn-danger',
            callback: function () {
              ventanaradicadoext1.off('show.bs.modal');
              setTimeout($_this._evaluardiapresent_SER513(), 500)
            }
          }
        }
      });
      ventanaradicadoext1.init($('.modal-footer').hide());
      ventanaradicadoext1.init(this._Evaluarradicadoext1_SER513());
      ventanaradicadoext1.on('shown.bs.modal', function () {
        $("#radicadoext1_ser513").focus();
      });
    },
    _Evaluarradicadoext1_SER513() {
      _inputControl("disabled");
      $('#radicadoext1_ser513').val(this.SER513.RADICADOEXTERW)
      validarInputs({
        form: '#RADEXT1_513',
        orden: "1"
      },
        () => { $('.btn-danger').click() },
        () => {
          this.SER513.RADICADOEXTERW = $('#radicadoext1_ser513').val()
          $('.btn-primary').click();
          // this._Evaluarenvioelect1_SER513()
        }
      )
    },
    // _Evaluarenvioelect1_SER513() {
    //   if (this.SER513.ENVIOFACTELEC.trim() == '') this.SER513.ENVIOFACTELEC = 'N'
    //   $('#enviolec_ser513').val(this.SER513.ENVIOFACTELEC)
    //   validarInputs({
    //     form: '#ENVIOELEFACT_513',
    //     orden: "1"
    //   },
    //     () => { this._Evaluarradicadoext1_SER513() },
    //     () => {
    //       this.SER513.ENVIOFACTELEC = $('#enviolec_ser513').val().toUpperCase()
    //       if (this.SER513.ENVIOFACTELEC == 'S' || this.SER513.ENVIOFACTELEC == 'N') {
    //         $('.btn-primary').click();
    //       } else {
    //         CON851("03", "03 ", this._Evaluarenvioelect1_SER513(), "error", "error");
    //       }

    //     }
    //   )
    // },
    _evaluarrepres_SER513(orden) {
      if (this.form.mespresente_SER513 > 0 && (this.form.mespresente_SER513 != this.form.mespresente_SER513)) {
        validarInputs(
          {
            form: "#VALIDARANOREPRESENT_513",
            orden: orden,
          },
          this._evaluardiapresent_SER513,
          () => {
            if (this.form.anorepret_SER513 < 2010 || this.form.anorepret_SER513 > this.SER513.ANOALFA) {
              this._evaluarrepres_SER513()
            } else {
              this.form.mesrepre_SER513 = this.form.mesrepre_SER513.padStart(2, "0");
              if (this.form.mesrepre_SER513 < 01 || this.form.mesrepre_SER513 > 12) {
                this._evaluarrepres_SER513('2')
              } else {
                this.form.diarepre_SER513 = this.form.diarepre_SER513.padStart(2, "0");
                if (this.form.diarepre_SER513 < 01 || this.form.diarepre_SER513 > 31) {
                  this._evaluarrepres_SER513('3')
                } else {
                  this._evaluarperiodocontab_SER513()
                }
              }
            }
          },
        );
      } else {
        this._evaluarperiodocontab_SER513()
      }
    },
    _evaluarperiodocontab_SER513() {
      if (this.form.mespresente_SER513 > 0 && this.form.mesperiodorad_SER513 == 00) {
        this.form.anoperiodorad_SER513 = this.SER513.FECHAPREW.substring(2, 4)
        this.form.mesperiodorad_SER513 = this.form.mespresente_SER513
      }
      validarInputs(
        {
          form: "#VALIDARANOCONTRAD_513",
          orden: '1',
        },
        this._evaluarprefijo_SER513,
        () => {
          if (this.form.anoperiodorad_SER513 > $_USUA_GLOBAL[0].FECHALNK.substring(0, 2)) {
            CON851("03", "03 ", null, "error", "error");
            if (localStorage.getItem('Usuario').trim() == 'GEBC') {
              this._evaluarperiodocontabmes_SER513()
            } else {
              this._evaluarperiodocontab_SER513()
            }
          } else {
            if (this.form.anopresente_SER513 < this.form.anorepret_SER513 && this.form.anoperiodorad_SER513 < this.form.anopresente_SER513) {
              CON851("03", "03 ", this._evaluarperiodocontab_SER513(), "error", "error");
            } else if (this.form.anorepret_SER513 < this.form.anopresente_SER513 && this.form.anoperiodorad_SER513 < this.form.anorepret_SER513) {
              CON851("03", "03 ", this._evaluarperiodocontab_SER513(), "error", "error");
            } else {
              this._evaluarperiodocontabmes_SER513()
            }
          }

        },
      );
    },
    _evaluarperiodocontabmes_SER513() {
      validarInputs(
        {
          form: "#VALIDARMESCONTRAD_513",
          orden: '1',
        },
        this._evaluarperiodocontab_SER513,
        () => {
          this.form.mesperiodorad_SER513 = this.form.mesperiodorad_SER513.padStart(2, "0");
          if (this.form.mesperiodorad_SER513 == 00 || this.form.mesperiodorad_SER513 > 12 || (this.form.anoperiodorad_SER513 == $_USUA_GLOBAL[0].FECHALNK.substring(0, 2)
            && this.form.mesperiodorad_SER513 > $_USUA_GLOBAL[0].FECHALNK.substring(4, 6))) {
            CON851("03", "03 ", this._evaluarperiodocontabmes_SER513(), "error", "error");
          } else {
            this._confirmargrabar_SER513()
          }
        },
      );
    },
    _confirmargrabar_SER513() {
      CON851P('01', this._evaluardiapresent_SER513, this._grabaropcion_SER513)
    },
    _grabaropcion_SER513() {
      var $_this = this;
      postData({ datosh: datosEnvio() + '3|' + this.form.nit_SER513 + "|" + this.SER513.NROENVIOW + "|" + this.SER513.ANOX + '|' + this.form.prefijo_SER513 + '|' + this.form.numero_SER513 + '|' + this.SER513.FECHARADGLOW + '|' + this.SER513.FECHAPREW + '|' + this.SER513.RADICADOEXTERW + '|' + this.SER513.FECHAREPREW + '|' + this.form.anoperiodorad_SER513 + '|' + this.form.mesperiodorad_SER513 + '|' + localStorage.getItem('Usuario').trim() + '||||' + moment().format('YYYYMMDD') }, get_url("APP/SALUD/SER513.DLL"))
        .then(data => {
          console.log(data);
          if (this.SER513.ENVIOFACTELEC == 'S') {
            this._ventanaorganiza_SER513()
          } else {
            if ($_USUA_GLOBAL[0].NIT == 900264583) {
              this._ventanaformapago_SER513()
              // this._evaluartrasaccion_SER513()
            } else {
              CON851('', 'Factura radicada', _toggleNav(), 'success', 'Exito')
            }
          }
        })
        .catch(err => {
          console.error(err)
          this._evaluarperiodocontabmes_SER513()
        });
    },
    _ventanaformapago_SER513() {

    },
    _evaluartrasaccion_SER513() {
      if ((this.SER513.CUFEELECNUM.trim() == '0' || this.SER513.ESTADOELECNUM == '1' || this.this.SER513.ESTADOELECNUM.trim() == '') && (this.SER513.ENVIOFACTELEC == 'S')) {
        if (this.SER513.ESTADOELECNUM == '') {
          if (this.SER613G.ORGANIZAW == '1') {
            postData({ datosh: datosEnvio() + '1| |' + localStorage.getItem('Usuario').trim() + '|' + this.form.prefijo_SER513 + this.form.numero_SER513 + '|' }, get_url("APP/SALUD/SAL515F.DLL"))
              .then(data => {
                postData({ datosh: datosEnvio() + `${localStorage.Usuario}|${this.form.prefijo_SER513.trim()}${this.form.numero_SER513.padStart(6, '0')}|${data}|` }, get_url("APP/SALUD/SAL515FE.DLL"))
                  .then(data => {
                    console.log(data);
                    // 1 FACSE
                    // 2 CARVAJAL
                    // 3 NOVACORP
                    // 4 EKOMERCIO
                    // 5 EMISION
                    // CONDICIONES PARA ENVIAR EL NOMBRE DEL PROOVEDOR
                    // PROV FACT PREF proveedor tecnoologico -> servicio
                    // PRUEBA TOKEN PREF S - N si es N es produccion -> tipo_ser
                    // DATA SER -> dajaJson respuesta del dll
                    let pruebatoken = this.SER513.PREFIJOS[0].PRUEBA_TOKEN;
                    let proveedor = this.SER513.PREFIJOS[0].PROV_FACT_ELECT;
                    console.log(pruebatoken, proveedor);
                    loader('show');
                    _factura_electronica({ proveedor: proveedor, tipo_ser: pruebatoken, dataJson: data })
                      .then(data => {
                        console.log(data, 'NNNNN');
                        if (data[0].ESTADO_ENVIO.substring(0, 2).trim() == '01') {
                          loader('hide');
                          CON851('', 'FACTURA RECHAZADA POR LA DIAN', this._evaluarperiodocontabmes_SER513(), 'error', 'Error');
                        } else {
                          if (data.CUFE.CODE.trim() == 'ERROR') {
                            CON851('', 'ERROR EN EL CUFE', this._evaluarperiodocontabmes_SER513(), 'error', 'Error');
                          } else {
                            postData({ datosh: `${datosEnvio()}5||||${$_this.form.prefijo_SER513}|${$_this.form.numero_SER513}||||||||${data.CUFE.CODE.trim()}|${parseInt(data.ESTADO_ENVIO.substring(0, 2)).toString()}|${data.FECHA.substring(6, 10)}${data.FECHA.substring(3, 5)}${data.FECHA.substring(0, 2)}|` },
                              get_url("APP/SALUD/SER513.DLL"))
                              .then((data) => {
                                console.debug(data);
                                CON851('', 'Factura enviada', _toggleNav(), 'success', 'Exito');
                              })
                              .catch(error => {
                                console.error(error);
                                this._evaluarperiodocontabmes_SER513();
                              });
                          }
                        }
                      })
                      .catch(error => {
                        console.error(error);
                        this._evaluarperiodocontabmes_SER513();
                      })
                  })
                  .catch(err => {
                    console.error(err)
                    this._evaluarperiodocontabmes_SER513()
                  });
              })
              .catch(err => {
                console.error(err)
                this._evaluarperiodocontabmes_SER513()
              });
          } else if (this.SER613G.ORGANIZAW == '2') {
            ////////////////////////PENDIENTE ORGANIZA 2
          } else if (this.SER613G.ORGANIZAW == '3') {
            ////////////////////////PENDIENTE ORGANIZA 3                
          } else {
            ////////////////////////PENDIENTE ORGANIZA FINAL
          }
        } else {
          CON851('', 'Factura radicada', _toggleNav(), 'success', 'Exito')
        }
      } else {
        CON851('', 'Factura radicada', _toggleNav(), 'success', 'Exito')
      }
    },
    _ventanaorganiza_SER513() {
      $_this = this
      var ventanaorganiza = bootbox.dialog({
        size: 'large',
        title: 'ORGANIZAR FACTURA POR',
        message: '<div class="row"> ' +
          '<div class="col-md-12"> ' +

          '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
          '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + 'Organiza:' + '</label> ' +
          '<div class="col-md-6 col-sm-6 col-xs-6" id="ORGANIZAR_SER513"> ' +
          '<input id="seleccione_SER513" class="form-control input-md" data-orden="1" maxlength="1"> ' +
          '</div> ' +
          '</div> ' +

          '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
          '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Cambiar x fecha de atencion?:" + '</label> ' +
          '<div class="col-md-6 col-sm-6 col-xs-6" id="FECHAATEN_SER513"> ' +
          '<input id="fechaatencion_SER513" class="form-control input-md" data-orden="1" maxlength="1" placeholder= "S/N"> ' +
          '</div> ' +
          '</div> ' +

          '</div>' +
          '</div>',
        buttons: {
          confirm: {
            label: 'Aceptar',
            className: 'btn-primary',
            callback: function () {
              ventanaorganiza.off('show.bs.modal');
              setTimeout(() => { $_this._evaluartrasaccion_SER513() }, 500)
            }
          },
          cancelar: {
            label: 'Cancelar',
            className: 'btn-danger',
            callback: function () {
              ventanaorganiza.off('show.bs.modal');
              setTimeout(() => { $_this._evaluarperiodocontabmes_SER513() }, 500)
            }
          }
        }
      });
      ventanaorganiza.init($('.modal-footer').hide());
      ventanaorganiza.init(() => {
        setTimeout(this._evaluarseleccion_SER513, 500)
      });
      ventanaorganiza.on('shown.bs.modal', function () {
        $("#seleccione_SER513").focus();
      });
    },
    _evaluarseleccion_SER513() {
      _inputControl("disabled");
      // var organiza = [
      //     { COD: "1", DESCRIP: "Comprobante" },
      //     { COD: "2", DESCRIP: "Fecha" },
      //     { COD: "3", DESCRIP: "Nombre" },
      // ];
      // POPUP(
      //     {
      //         array: organiza,
      //         titulo: "Organiza por",
      //         indices: [
      //             {
      //                 id: "COD",
      //                 label: "DESCRIP",
      //             },
      //         ],
      //         seleccion: this.SER513.ORGANIZAW,
      //         callback_f: () => {
      //             $('.btn-danger').click()
      //         },
      //     },
      //     organiza => {
      //         console.log(organiza);
      //         this.SER513.ORGANIZAW = organiza.COD
      //         $('#seleccione_SER513').val(organiza.COD + " - " + organiza.DESCRIP);
      //         this._evaluarfechaaten_SER513()
      //     },
      // );
      $('#seleccione_SER513').val("1 - Comprobante");
      this._evaluarfechaaten_SER513()

    },
    _evaluarfechaaten_SER513() {
      if (this.SER513.FECHAATEN.trim() == '') this.SER513.FECHAATEN = 'N'
      $('#fechaatencion_SER513').val(this.SER513.FECHAATEN);
      validarInputs({
        form: '#FECHAATEN_SER513',
        orden: "1"
      },
        () => { $('.btn-danger').click() },
        () => {
          this.SER513.FECHAATEN = $('#fechaatencion_SER513').val();
          if (this.SER513.FECHAATEN == 'S' || this.SER513.FECHAATEN == 'N') {
            this.SER513.SWDEVOL = 'N'
            $('.btn-primary').click();
          } else {
            this._evaluarfechaaten_SER513()
          }
        }
      )
    },
    ////////////////////VENTANA F2///////////////////
    _ventanabuscarenvio_513() {
      _FloatText({ estado: 'off' })
      var $_this = this;
      var ventanabuscaenv = bootbox.dialog({
        size: 'medium',
        title: 'BUSCA ENVIO',
        message: '<div class="row"> ' +
          '<div class="col-md-12"> ' +

          '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
          '<div class="inline-inputs">' +
          '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "ANO ENVIO:" + '</label> ' +
          '<div class="col-md-6 col-sm-6 col-xs-6" id="ANOENVIO_513"> ' +
          '<input id="anoenv_ser513" class="form-control input-md" data-orden="1" maxlength="4" > ' +
          '</div> ' +
          '</div>' +
          '</div> ' +

          '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
          '<div class="inline-inputs">' +
          '<label class="col-md-6 col-sm-6 col-xs-6 control-label">' + "CONTINUAR?" + '</label> ' +
          '<div class="col-md-6 col-sm-6 col-xs-6" id="CONFIRMARVENTANA_SER513"> ' +
          '<input id="CONFIRMAR_SER513" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
          '</div> ' +
          '</div>' +
          '</div> ' +


          '<div class="salto-linea"></div>' +

          '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
          '<div class="inline-inputs">' +
          '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "NUMERO ENVIO:" + '</label> ' +
          '<div class="col-md-6 col-sm-6 col-xs-6" id="NROENVIO_513"> ' +
          '<input id="nroenv_ser513" class="form-control input-md" data-orden="1" maxlength="6" > ' +
          '</div> ' +
          '<button type="button" id="nroenvBtn_ser513" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
          '<i class="icon-magnifier"></i>' +
          '</button>' +
          '</div>' +
          '</div> ' +


          '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
          '<div class="inline-inputs">' +
          '<label class="col-md-6 col-sm-6 col-xs-6 control-label" >' + "TOTAL ENVIO:" + '</label> ' +
          '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
          '<input id="TOTALENVIO_SER513" class="form-control input-md">' +
          '</div> ' +
          '</div>' +
          '</div> ' +


          '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
          '<div class="inline-inputs">' +
          '<label class="col-md-8 col-sm-8 col-xs-8 control-label" for="name">' + "NUMERO DE FACTURAS:" + '</label> ' +
          '<div class="col-md-4 col-sm-4 col-xs-4"> ' +
          '<input id="NUMERODEFACTURAS_SER513" class="form-control input-md"> ' +
          '</div> ' +
          '</div>' +
          '</div> ' +

          '</div>' +
          '</div>',
        buttons: {
          confirm: {
            label: 'Aceptar',
            className: 'btn-primary',
            callback: function () {
              ventanabuscaenv.off('show.bs.modal');
              setTimeout($_this._evaluarradicacionult_SER513, 500)
            }
          },
          cancelar: {
            label: 'Cancelar',
            className: 'btn-danger',
            callback: function () {
              ventanabuscaenv.off('show.bs.modal');
              setTimeout($_this._evaluarprefijo_SER513, 500)
            }
          }
        }
      });
      ventanabuscaenv.init($('.modal-footer').hide());
      ventanabuscaenv.init($_this._Evaluaranoenv_SER513);
      ventanabuscaenv.on('shown.bs.modal', function () {
        $("#anoenv_ser513").focus();
      });
      ventanabuscaenv.init(_toggleF8([{
        input: 'nroenv',
        app: 'ser513',
        funct: $_this._f8envio_SER513
      },]));
    },
    _Evaluaranoenv_SER513() {
      _inputControl("disabled");
      set_Event_validar('#VALIDARPREFIJO_513', 'off');
      if (this.SER513.ANOX.trim() == '') {
        this.SER513.ANOX = this.SER513.ANOALFA;
        $('#anoenv_ser513').val(this.SER513.ANOX);
      }
      validarInputs({
        form: '#ANOENVIO_513',
        orden: "1"
      },
        () => { $('.btn-danger').click() },
        () => {
          this.SER513.ANOX = $('#anoenv_ser513').val()
          if (this.SER513.ANOX < 2000) {
            CON851("03", "03 ", this._Evaluaranoenv_SER513(), "error", "error");
          } else {
            // postData({ datosh: datosEnvio() + '2|' + this.form.nit_SER513 + "|" + this.SER513.ENVIOX + "|" + this.SER513.ANOX + '|' }, get_url("APP/SALUD/SER513.DLL"))
            //   .then(data => {
            //     this._evaluarnroenv_SER513()
            //   })
            //   .catch(err => {
            //     this._Evaluaranoenv_SER513();
            //   });
            this._evaluarnroenv_SER513()
          }
        }
      )
    },
    _evaluarnroenv_SER513() {
      validarInputs({
        form: '#NROENVIO_513',
        orden: "1"
      },
        () => { this._Evaluaranoenv_SER513() },
        () => {
          this.SER513.ENVIOX = $('#nroenv_ser513').val()
          this.SER513.ENVIOX = cerosIzq(this.SER513.ENVIOX, 6);
          $('#nroenv_ser513').val(this.SER513.ENVIOX)
          if (this.SER513.ENVIOX.trim() == '') {
            CON851("03", "03 ", this._evaluarnroenv_SER513(), "error", "error");
          } else {
            postData({
              datosh: datosEnvio() + this.SER513.ENVIOX + '| |' + '1|' + '|'
            }, get_url("APP/SALUD/SER442-01.DLL"))
              .then((data) => {
                this.SER513.CONSULTA2 = data['ENVIOS'];
                this.form.nit_SER513 = this.SER513.CONSULTA2[0].NIT;
                this.form.descripnit_SER513 = this.SER513.CONSULTA2[0].DESCRIPTER;
                this.SER513.FECHAENV = this.SER513.CONSULTA2[0].FECHA_ENV
                postData({ datosh: datosEnvio() + '1|' + this.form.nit_SER513 + "|" + this.SER513.ENVIOX + "|" }, get_url("APP/SALUD/SER513.DLL"))
                  .then(data => {
                    console.log(data)
                    var totalfacturas = totalfacturado = 0;
                    this.SER513.LLAVEW = this.SER513.CONSULTA2[0].TAB_REG_ENV[0].PREFIJO + this.SER513.CONSULTA2[0].TAB_REG_ENV[0].NUMERO
                    for (var i of this.SER513.CONSULTA2[0].TAB_REG_ENV) {
                      if (i.PREFIJO.trim() != '') {
                        let valor = parseFloat(i.VALOR);
                        if (isNaN(valor)) valor = 0
                        totalfacturado = totalfacturado + valor;
                        totalfacturas++
                      }
                    }
                    $('#TOTALENVIO_SER513').val(numeroencomas(totalfacturado));
                    $('#NUMERODEFACTURAS_SER513').val(totalfacturas.toString());
                    this._evaluarconfirmarventana_SER513();
                  })
                  .catch(err => {
                    console.error(err)
                    this._Evaluaranoenv_SER513();
                  });
              })
              .catch((error) => {
                console.error(error)
                this._evaluarnroenv_SER513();
              });
          }
        }
      )
    },
    _evaluarconfirmarventana_SER513() {
      postData({ datosh: datosEnvio() + this.SER513.LLAVEW + "|" }, get_url("APP/SALUD/SER808-01.DLL"))
        .then(data => {
          this.SER513.FACTURA = data.NUMER19[0];
          this.SER513.FECHAPREX = this.SER513.FACTURA.FECHA_PRE;
          this.form.anopresente_SER513 = this.SER513.FACTURA.FECHA_PRE.substring(0, 4)
          this.form.mespresente_SER513 = this.SER513.FACTURA.FECHA_PRE.substring(4, 6)
          this.form.diapresente_SER513 = this.SER513.FACTURA.FECHA_PRE.substring(6, 8)
          this.SER513.RADICADOEXTERX = this.SER513.FACTURA.RADICADOEXT_NUM.trim()
          this.form.anoperiodorad_SER513 = this.SER513.FACTURA.PERCONTRAD_NUM.substring(0, 2)
          this.form.mesperiodorad_SER513 = this.SER513.FACTURA.PERCONTRAD_NUM.substring(2, 4)
          this.form.numeroenvio_SER513 = this.SER513.ENVIOX
          this.form.fechaenvio_SER513 = this.SER513.FECHAENV
          if (this.form.anoperiodorad_SER513 != '00' && this.form.anoperiodorad_SER513.trim() != '') CON851("", "Facturas de Envio ya tienen fecha de radicado", null, "error", "error");
        })
        .catch(err => {
          this.form.anopresente_SER513 = ""
          this.form.mespresente_SER513 = ""
          this.form.diapresente_SER513 = ""
          this.form.anoperiodorad_SER513 = ""
          this.form.mesperiodorad_SER513 = ""
          console.error(err);
        });
      validarInputs(
        {
          form: "#CONFIRMARVENTANA_SER513",
          orden: '1',
        }, () => {
          this._evaluarnroenv_SER513()
        },
        () => {
          this.SER513.CONFIRMARVENTANA_SER513 = $('#CONFIRMAR_SER513').val().toUpperCase();
          if (this.SER513.CONFIRMARVENTANA_SER513.trim() != 'S' && this.SER513.CONFIRMARVENTANA_SER513.trim() != 'N') {
            CON851('03', '03', null, 'error', 'Error');
            this._evaluarconfirmarventana_SER513()
          } else {
            if (this.SER513.CONFIRMARVENTANA_SER513 == 'S') {
              $('.btn-primary').click();
            } else {
              this._evaluarnroenv_SER513()
            }
          }
        },
      )
    },
    _evaluarradicacionult_SER513() {
      if (this.form.anopresente_SER513 == 0) {
        this.form.anopresente_SER513 = this.SER513.ANOALFA
        this.form.mespresente_SER513 = this.SER513.MESLNK
      }
      validarInputs(
        {
          form: "#VALIDARANOPRE_513",
          orden: '1',
        }, () => {
          setTimeout(this._ventanabuscarenvio_513(), 500)
        },
        () => {
          if (this.form.anopresente_SER513 > this.SER513.ANOSIST) {
            CON851("37", "37 ", this._evaluarradicacionult_SER513(), "error", "error");
          } else {
            this._evaluarmesradicacionult()
          }

        },
      );
    },
    _evaluarmesradicacionult() {
      validarInputs(
        {
          form: "#VALIDARMESPRE_513",
          orden: '1',
        }, () => {
          this._evaluarradicacionult_SER513()
        },
        () => {
          this.form.mespresente_SER513 = this.form.mespresente_SER513.padStart(2, "0");
          if (this.form.mespresente_SER513.trim() == "" || this.form.mespresente_SER513 < 1 || this.form.mespresente_SER513 > 12) {
            CON851("", "Mes incorrecto! ", this._evaluarmesradicacionult(), "error", "error");
          } else {
            switch (this.form.mespresente_SER513) {
              case 01:
                this.SER513.DIAMAX = 31
                break;
              case 02:
                this.SER513.DIAMAX = 29
                break;
              case 03:
                this.SER513.DIAMAX = 31
                break;
              case 04:
                this.SER513.DIAMAX = 30
                break;
              case 05:
                this.SER513.DIAMAX = 31
                break;
              case 06:
                this.SER513.DIAMAX = 30
                break;
              case 07:
                this.SER513.DIAMAX = 31
                break;
              case 08:
                this.SER513.DIAMAX = 31
                break;
              case 09:
                this.SER513.DIAMAX = 30
                break;
              case 10:
                this.SER513.DIAMAX = 31
                break;
              case 11:
                this.SER513.DIAMAX = 30
                break;
              default:
                this.SER513.DIAMAX = 31
                break;
            }
            this._evaluardiaradicacionult()
          }
        },
      );
    },
    _evaluardiaradicacionult() {
      validarInputs(
        {
          form: "#VALIDARDIAPRE_513",
          orden: '1',
        }, () => {
          this._evaluarmesradicacionult()
        },
        () => {
          this.form.diapresente_SER513 = this.form.diapresente_SER513.padStart(2, "0");
          if (this.form.diapresente_SER513.trim() == "" || this.form.diapresente_SER513 < 1 || this.form.diaabonoini_SER110 > this.SER513.DIAMAX) {
            CON851("", "Dia incorrecto! ", this._evaluardiaradicacionult(), "error", "error");
          } else {
            this.SER513.FECHAPREX = this.form.anopresente_SER513 + this.form.mespresente_SER513 + this.form.diapresente_SER513
            this.form.anoperiodorad_SER513 = this.form.anopresente_SER513
            this.form.mesperiodorad_SER513 = this.form.mespresente_SER513
            this._evaluarfechaprex_SER513()
          }
        },
      );

    },
    _evaluarfechaprex_SER513() {
      if (this.SER513.FECHAPREX > this.SER513.FECHAACTUAL) {
        CON851("37", "37 ", this._evaluardiaradicacionult(), "error", "error");
      } else if (this.SER513.FECHAPREX < this.SER513.FECHAENV) {
        CON851("", "FECHA NO PUEDE SER MENOR A LA DEL ENVIO", this._evaluardiaradicacionult(), "error", "error");
      } else {
        this._evaluarradicadoexterx_SER513()
      }
    },
    _evaluarradicadoexterx_SER513() {
      var $_this = this;
      var ventanaradicadoext2 = bootbox.dialog({
        size: 'medium',
        title: 'NRO DE RADICADO - EXTERNO',
        message: '<div class="row"> ' +
          '<div class="col-md-12"> ' +

          '<div class="col-md-10 col-sm-6 col-xs-6"> ' +
          '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Nro:" + '</label> ' +
          '<div class="col-md-6 col-sm-6 col-xs-6" id="RADEXT2_513"> ' +
          '<input id="radicadoext2_ser513" class="form-control input-md" data-orden="1" maxlength="15"> ' +
          '</div> ' +
          '</div> ' +
          '</div>' +
          '</div>',
        buttons: {
          confirm: {
            label: 'Aceptar',
            className: 'btn-primary',
            callback: function () {
              ventanaradicadoext2.off('show.bs.modal');
              setTimeout($_this._grabarenviofact_SER513(), 500)
            }
          },
          cancelar: {
            label: 'Cancelar',
            className: 'btn-danger',
            callback: function () {
              ventanaradicadoext2.off('show.bs.modal');
              setTimeout($_this._evaluarradicacionult_SER513(), 500)
            }
          }
        }
      });
      ventanaradicadoext2.init($('.modal-footer').hide());
      ventanaradicadoext2.init(this._Evaluarradicadoext_SER513());
      ventanaradicadoext2.on('shown.bs.modal', function () {
        $("#radicadoext2_ser513").focus();
      });
    },
    _Evaluarradicadoext_SER513() {
      _inputControl("disabled");
      $('#radicadoext2_ser513').val(this.SER513.RADICADOEXTERX)
      validarInputs({
        form: '#RADEXT2_513',
        orden: "1"
      },
        () => { $('.btn-danger').click() },
        () => {
          this.SER513.RADICADOEXTERX = $('#radicadoext2_ser513').val()
          $('.btn-primary').click();
        }
      )
    },

    _grabarenviofact_SER513() {
      postData({
        datosh: datosEnvio() + '4|' + this.form.nit_SER513 + "|" + this.SER513.ENVIOX + "|" + this.SER513.ANOX + '| | |' + this.SER513.FECHARADGLOW + '|' + this.SER513.FECHAPREX + '|' + this.SER513.RADICADOEXTERX + '|' + this.SER513.FECHAREPREW + '|' + this.form.anoperiodorad_SER513 + '|' + this.form.mesperiodorad_SER513
          + '|' + localStorage.getItem('Usuario').trim() + '| | | |' + moment().format('YYYYMMDD') + '|'
      }, get_url("APP/SALUD/SER513.DLL"))
        .then(data => {
          CON851('', 'Factura radicada', _toggleNav(), 'success', 'Exito');
        })
        .catch(err => {
          console.error(err)
          this._evaluardiaradicacionult()
        });
    },






    // _grabarenviofact_SER513() {
    //   console.log(this.SER513.ENVIOX, 'this.SER513.ENVIOX')
    //   postData({ datosh: datosEnvio() + '4|' + this.form.nit_SER513 + "|" + this.SER513.ENVIOX + "|" + this.SER513.ANOX + '| | |' + this.SER513.FECHARADGLOW + '|' + this.SER513.FECHAPREX + '|' + this.SER513.RADICADOEXTERX + '|' + this.SER513.FECHAREPREW + '|' + this.form.anoperiodorad_SER513 + '|' + this.form.mesperiodorad_SER513 + '|' + localStorage.getItem('Usuario').trim() + '|' }, get_url("APP/SALUD/SER513.DLL"))
    //     .then(data => {
    //       console.log(data, 'SER513 GRABAR MASIVO');
    //       postData({ datosh: datosEnvio() + '2|' + this.SER513.ENVIOX + '|' + localStorage.getItem('Usuario').trim() + '|' + this.form.prefijo_SER513 + this.form.numero_SER513 + '|' }, get_url("APP/SALUD/SAL515F.DLL"))
    //         .then(data => {
    //           CON851('', 'TEMPORAL CREADO', this._evaluardiaradicacionult(), 'success', 'Exito');
    //           postData({ datosh: datosEnvio() + `${localStorage.Usuario}|${this.form.prefijo_SER513.trim()}${this.form.numero_SER513.padStart(6, '0')}|${data.replace(/\//g, '\\')}|` }, get_url("APP/SALUD/SAL515FE.DLL"))
    //             .then(data => {
    //               console.log(data);
    //               // 1 FACSE
    //               // 2 CARVAJAL
    //               // 3 NOVACORP
    //               // 4 EKOMERCIO
    //               // 5 EMISION
    //               // CONDICIONES PARA ENVIAR EL NOMBRE DEL PROOVEDOR
    //               // PROV FACT PREF proveedor tecnoologico -> servicio
    //               // PRUEBA TOKEN PREF S - N si es N es produccion -> tipo_ser
    //               // DATA SER -> dajaJson respuesta del dll
    //               let pruebatoken = this.SER513.PREFIJOS[0].PRUEBA_TOKEN;
    //               let proveedor = this.SER513.PREFIJOS[0].PROV_FACT_ELECT;
    //               console.log(pruebatoken, proveedor);
    //               // _factura_electronica({ proveedor: proveedor, tipo_ser: pruebatoken, dataJson: data });
    //             })
    //             .catch(err => {
    //               console.log(err)
    //               this.__evaluardiaradicacionult()
    //             });
    //         })
    //         .catch(err => {
    //           console.log(err)
    //           this._evaluardiaradicacionult()
    //         });
    //     })
    //     .catch(err => {
    //       this._Evaluaranoenv_SER513();
    //     });
    // },


    /////////////////VENTANAS F8////////////////////
    _f8envio_SER513(e) {
      var $_this = this;
      if ($_this.SER513.FILTROENVIO.length == 0) {
        CON851("08", "08 ", null, "error", "error");
      } else {
        if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
          _ventanaDatos({
            titulo: 'VENTANA DE ENVIOS',
            columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", "FECHA", "OBSERVACION"],
            data: $_this.SER513.FILTROENVIO,
            callback_esc: function () {
              $("#nroenv_ser513").focus();
            },
            callback: function (data) {
              $('#nroenv_ser513').val(data.NRO.trim());
              _enterInput('#nroenv_ser513');
            }
          });
        }
      }
    },
    _f8facturas_SER513() {
      var $_this = this;
      parametros = {
        dll: 'NUMERACION',
        valoresselect: ['Nombre del tercero', 'buscar paciente'],
        f8data: 'NUMERACION',
        columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
        callback: (data) => {
          $_NROW = data.COD;
          $_NROW = $_NROW.substring(1, 7)
          $_this.form.numero_SER513 = $_NROW;
          _enterInput('.factura_SER513');
        },
        cancel: () => {
          _enterInput('.factura_SER513');
        }
      };
      F8LITE(parametros);
    }
  },
});
