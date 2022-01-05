const { isNumeric } = require("jquery");

var fecha_SAL504D = IMask.createPipe({
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

var valores_SAL504D = IMask.createPipe({
  mask: Number,
  scale: 2,
  radix: '.',
  thousandsSeparator: ',',
  normalizeZeros: true,
  padFractionalZeros: true,
  min: -999999999999,
  max: 999999999999
});

new Vue({
  el: "#SAL504D",
  data: {
    SAL504D: [],
    form: {
      prefijo_SAL504D: "",
      numero_SAL504D: "",
      estado_SAL504D: "",
      convenio_SAL504D: "",
      creado_SAL504D: "",
      modificado_SAL504D: "",
      bloq_SAL504D: "",
      nit_SAL504D: "",
      descripnit_SAL504D: "",
      fechaapertura_SAL504D: "",
      fechacierre_SAL504D: "",
      fechapresent_SAL504D: "",
      fechaenvio_SAL504D: "",
      periodorad_SAL504D: "",
      fechaglosa_SAL504D: "",
      radicacion_SAL504D: "",
      vlrglosa_SAL504D: "",
      vlrsoportado_SAL504D: "",
      factarm_SAL504D: "",
      armadfact_SAL504D: "",
      armarad_SAL504D: "",
      radicarma_SAL504D: "",
      fecharad_SAL504D: "",
      operradi_SAL504D: "",
      copagoesti_SAL504D: "",
      totalfact_SAL504D: "",
      totalabono_SAL504D: "",
      saldoneto_SAL504D: "",
      radicadoext_SAL504D: "",
      cufe_SAL504D: "",
      fecharadelect_SAL504D: "",
      nroenvioelect_SAL504: ""
    },
    tablaabon_SAL504D: [],
    tablafact_SAL504D: [],
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,4,7 - Consulta saldos de cartera");
    this._evaluarprefijo_SAL504D();
  },
  methods: {
    _evaluarprefijo_SAL504D() {
      loader("hide");
      validarInputs(
        {
          form: "#VALIDARPREFIJO_504D",
          orden: "1",
        },
        _toggleNav,
        () => {
          this.form.prefijo_SAL504D = this.form.prefijo_SAL504D.toUpperCase();
          if (this.form.prefijo_SAL504D.trim() == "" || this.form.prefijo_SAL504D.trim() == "C" || this.form.prefijo_SAL504D.trim() == "U" || this.form.prefijo_SAL504D.trim() == "Ñ") {
            CON851("", "Revise el prefijo", this._evaluarprefijo_SAL504D(), "error", "Error");
          } else {
            postData({ datosh: datosEnvio() + "9" + this.form.prefijo_SAL504D.trim() + "|" }, get_url("APP/CONTAB/CON007.DLL"))
              .then(data => {
                var data = data.split("|");
                let ultimo = parseInt(data[1].substring(3, 9)) - 1;
                this.form.numero_SAL504D = ultimo;
                _FloatText({
                  estado: "on",
                  msg: [{ mensaje: "Oprima F3 para imprimir" }],
                });
                this._evaluarnumerofact_SAL504D();
              })
              .catch(err => {
                console.debug(err);
              });
          }
        },
      );
    },
    _evaluarnumerofact_SAL504D() {
      validarInputs(
        {
          form: "#VALIDARNUMERO_504D",
          orden: "1",
          event_f3: this._imprimir_SAL504D,
        },
        this._evaluarprefijo_SAL504D,
        () => {
          if (isNumeric(this.form.numero_SAL504D)) {
            this.form.numero_SAL504D = this.form.numero_SAL504D.toString().padStart(6, "0");
            postData({ datosh: datosEnvio() + this.form.prefijo_SAL504D.trim() + this.form.numero_SAL504D.trim() + "|" }, get_url("APP/SALUD/SER808-01.DLL"))
              .then(data => {
                this.SAL504D.FACTURA = data.NUMER19[0];
                console.log(this.SAL504D.FACTURA);
                let estado = {
                  "0": "Activo",
                  "1": "Retirado",
                  "2": "Anulado",
                  "3": "Bloqueo",
                };
                this.form.nit_SAL504D = this.SAL504D.FACTURA.NIT_NUM;
                this.form.descripnit_SAL504D = this.SAL504D.FACTURA.DESCRIP_NUM;
                this.form.estado_SAL504D = this.SAL504D.FACTURA.ESTADO_NUM + "  -  " + estado[this.SAL504D.FACTURA.ESTADO_NUM];
                this.form.convenio_SAL504D = this.SAL504D.FACTURA.CONVENIO_NUM + '-' + this.SAL504D.FACTURA.DESCRIP_TAR;
                this.form.nrorad_SAL504D = this.SAL504D.FACTURA.RADICADOEXT_NUM
                this.form.fechaapertura_SAL504D = fecha_SAL504D(this.SAL504D.FACTURA.FECHA_ING);
                this.form.fechacierre_SAL504D = fecha_SAL504D(this.SAL504D.FACTURA.FECHA_RET);
                this.form.fechapresent_SAL504D = fecha_SAL504D(this.SAL504D.FACTURA.FECHA_PRE);
                this.SAL504D.MESREPRENUM = this.SAL504D.FACTURA.FECHAREPRE_NUM.substring(4, 6)
                if (this.SAL504D.MESREPRENUM > 00) {
                  $('#RERADICADO_SAL504D').removeClass('hidden');
                  this.form.fechareradicada_SAL504D = fecha_SAL504D(this.SAL504D.FACTURA.FECHAREPRE_NUM)
                }
                if (this.SAL504D.FACTURA.VLRLEV_NUM > 00) {
                  $('#LEVANTGLOSA_SAL504D').removeClass('hidden');
                  $('#FECHALEVANT_SAL504D').removeClass('hidden');
                  this.form.levant_SAL504D = valores_SAL504D(this.SAL504D.FACTURA.VLRLEV_NUM)
                  this.form.fechalevant_SAL504D = fecha_SAL504D(this.SAL504D.FACTURA.FECHALEV_NUM)
                }
                if (this.SAL504D.FACTURA.FACTCAPIT_NUM > 00) {
                  $('#CAPITAC_SAL504D').removeClass('hidden');
                  this.form.capitac_SAL504D = this.SAL504D.FACTURA.VLRLEV_NUM
                }
                this.form.periodorad_SAL504D = this.SAL504D.FACTURA.PERCONTRAD_NUM;
                let tabla = this.SAL504D.FACTURA.TABLA_ABON.filter(x => x.SECU_ABON.trim() != 0 && x.SECU_ABON.trim() != '')
                this.tablaabon_SAL504D = tabla;
                let fact = this.SAL504D.FACTURA.TABLA_FACT.filter(x => parseInt(x.VLR_FACT) > 0);
                this.tablafact_SAL504D = fact;
                this.form.fechaglosa_SAL504D = fecha_SAL504D(this.SAL504D.FACTURA.FECHAGLOSA_NUM);
                this.form.radicacion_SAL504D = this.SAL504D.FACTURA.RADIC_NUM;
                this.form.vlrglosa_SAL504D = valores_SAL504D(parseFloat(this.SAL504D.FACTURA.GLOSA_NUM).toString());
                this.form.vlrsoportado_SAL504D = valores_SAL504D(parseFloat(this.SAL504D.FACTURA.RESPGLOSA_NUM).toString());
                this.form.creado_SAL504D = this.SAL504D.FACTURA.OPER_NUM;
                this.form.modificado_SAL504D = this.SAL504D.FACTURA.OPERMOD_NUM;
                this.form.bloq_SAL504D = this.SAL504D.FACTURA.OPERBLOQ_NUM;
                this.form.factarm_SAL504D = this.SAL504D.FACTURA.DOCUMFACT_NUM + " - " + fecha_SAL504D(this.SAL504D.FACTURA.FECHAFACT_NUM);
                this.form.armadfact_SAL504D = this.SAL504D.FACTURA.DOCUMARMAFACT_NUM + " - " + fecha_SAL504D(this.SAL504D.FACTURA.FECHAARMA_NUM);
                this.form.armarad_SAL504D = this.SAL504D.FACTURA.DOCUMARMARAD_NUM + " - " + fecha_SAL504D(this.SAL504D.FACTURA.FECHAARMARADI_NUM);
                this.form.radicarma_SAL504D = this.SAL504D.FACTURA.DOCRADIARMA_NUM + " - " + fecha_SAL504D(this.SAL504D.FACTURA.FECHARADIARMA_NUM);
                this.form.fecharadelect_SAL504D = fecha_SAL504D(this.SAL504D.FACTURA.FECHA_ELENV)
                this.form.nroenvioelect_SAL504D = this.SAL504D.FACTURA.ELENVIO
                this.form.copagoesti_SAL504D = valores_SAL504D(parseFloat(this.SAL504D.FACTURA.COPAGOEST_NUM).toString());
                this.form.traslado_SAL504D = this.SAL504D.FACTURA.TRASLGLOSA_NUM
                this.form.radicadoext_SAL504D = this.SAL504D.FACTURA.RADICADOEXT_NUM
                this.form.cufe_SAL504D = this.SAL504D.FACTURA.CUFEELEC_NUM
                this.form.operradi_SAL504D = this.SAL504D.FACTURA.OPER_RADICO
                this.form.fecharad_SAL504D = this.SAL504D.FACTURA.FECHA_RADICO
                let totalfact = 0;
                for (var i in this.tablafact_SAL504D) {
                  let negativo = this.tablafact_SAL504D[i].VLR_FACT.indexOf('-')
                  let valor = parseInt(this.tablafact_SAL504D[i].VLR_FACT.replace(/-/g,''))
                  if (isNaN(valor)) valor = 0
                  if (negativo >= 0) valor = valor * -1
                  totalfact = totalfact + valor;
                }
                this.SAL504D.VLRABONOW = this.SAL504D.FACTURA.VLRTOTALABON.padStart(16, '0')
                this.form.totalfact_SAL504D = valores_SAL504D(totalfact.toString());                
                this.form.copagos_SAL504D = valores_SAL504D(parseInt(this.SAL504D.FACTURA.COPAGOS_NUM).toString());


                if (this.SAL504D.FACTURA.VLRTOTALABON.indexOf('-') >= 0) {
                  this.SAL504D.VALORABONO = parseInt(this.SAL504D.FACTURA.VLRTOTALABON.replace('-', '')) * (-1)
                  this.form.totalabono_SAL504D = valores_SAL504D(this.SAL504D.VALORABONO.toString());
                } else {
                  if(this.SAL504D.FACTURA.VLRTOTALABON.trim() == ''){
                    this.form.totalabono_SAL504D = valores_SAL504D(parseInt(0).toString());
                  }else{
                    this.form.totalabono_SAL504D = valores_SAL504D(parseInt(this.SAL504D.FACTURA.VLRTOTALABON).toString());
                  }
                }

                let abono = this.SAL504D.VLRABONOW.indexOf('-');
                if (abono >= 0) this.SAL504D.VLRABONOW = parseInt(this.SAL504D.VLRABONOW) * -1
                console.log(this.SAL504D.VLRABONOW, 'vsv')

               
                
                this.form.saldoneto_SAL504D = totalfact + parseInt(this.SAL504D.VLRABONOW) - parseInt(this.SAL504D.FACTURA.COPAGOS_NUM) - parseFloat(this.SAL504D.FACTURA.COPAGOEST_NUM);
                this.form.saldoneto_SAL504D = valores_SAL504D(this.form.saldoneto_SAL504D.toString())
                this.form.nroenvio_SAL504D = this.SAL504D.FACTURA.ENVIO_NUM
                postData({ datosh: datosEnvio() + this.form.nroenvio_SAL504D.trim() + "|" }, get_url("APP/SALUD/SAL504D.DLL"))
                  .then(data => {
                    this.form.fechaenvio_SAL504D = fecha_SAL504D(data);
                    postData({ datosh: datosEnvio() + this.form.prefijo_SAL504D.trim() + this.form.numero_SAL504D.trim() + "|" }, get_url("APP/SALUD/SER2723.DLL"))
                      .then(data => {
                        this.SER513.CARTERANIIF = data.CARTERANIIF[0];
                        this.form.periododet_SAL504D = this.SER513.CARTERANIIF.PERIODO.trim()
                        this.form.totaldet_SAL504D = this.SER513.CARTERANIIF.TOTAL

                        this._evaluarnumerofact_SAL504D();
                      })
                      .catch(err => {
                        this._evaluarnumerofact_SAL504D();
                      });
                  })
                  .catch(err => {
                    this._evaluarnumerofact_SAL504D();
                  });
              })
              .catch(err => {
                console.error(err);
                this.form.numero_SAL504D = ""
                this.form.estado_SAL504D = ""
                this.form.convenio_SAL504D = ""
                this.form.creado_SAL504D = ""
                this.form.modificado_SAL504D = ""
                this.form.bloq_SAL504D = ""
                this.form.nit_SAL504D = ""
                this.form.descripnit_SAL504D = ""
                this.form.fechaapertura_SAL504D = ""
                this.form.fechacierre_SAL504D = ""
                this.form.fechapresent_SAL504D = ""
                this.form.fechaenvio_SAL504D = ""
                this.form.periodorad_SAL504D = ""
                this.form.fechaglosa_SAL504D = ""
                this.form.radicacion_SAL504D = ""
                this.form.vlrglosa_SAL504D = ""
                this.form.vlrsoportado_SAL504D = ""
                this.form.factarm_SAL504D = ""
                this.form.armadfact_SAL504D = ""
                this.form.armarad_SAL504D = ""
                this.form.radicarma_SAL504D = ""
                this.form.fecharad_SAL504D = ""
                this.form.operradi_SAL504D = ""
                this.form.copagoesti_SAL504D = ""
                this.form.totalfact_SAL504D = ""
                this.form.totalabono_SAL504D = ""
                this.form.saldoneto_SAL504D = ""
                this.form.radicadoext_SAL504D = ""
                this.form.cufe_SAL504D = ""
                this.form.fecharadelect_SAL504D = ""
                this.form.nroenvioelect_SAL504 = ""
                this.tablaabon_SAL504D = [],
                  this.tablafact_SAL504D = [],
                  this._evaluarnumerofact_SAL504D();
              });
          } else {
            CON851("", "Revise el número de la factura", this._evaluarnumerofact_SAL504D(), "error", "Error");
          }
        },
      );
    },
    _imprimir_SAL504D() {
      _FloatText({ estado: "off" });
      _toggleNav();
    },
    _f8facturas_SAL504D() {
      var $_this = this;
      parametros = {
        dll: 'NUMERACION',
        valoresselect: ['Nombre del tercero', 'buscar paciente'],
        f8data: 'NUMERACION',
        columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
        callback: (data) => {
          $_NROW = data.COD;
          $_NROW = $_NROW.substring(1, 7)
          $_this.form.numero_SAL504D = $_NROW;
          _enterInput('.numero_SAL504D');
        },
        cancel: () => {
          _enterInput('.numero_SAL504D');
        }
      };
      F8LITE(parametros);
    }
  },
});
