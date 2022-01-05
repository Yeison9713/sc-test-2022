// // 01-09-2020 DIANA E: creado
const moment = require("moment");
const { isNumeric } = require("jquery");
var fecha_SER109H = IMask.createPipe({
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
  el: "#SER109H",
  data: {
    SER109H: [],
    form: {
      numerofact_SER109H: "",
      estadofact_SER109H: "",
      entidadfact_SER109H: "",
      pacifact_SER109H: "",
      tipo1_SER109H: "",
      tipo2_SER109H: "",
      tipo3_SER109H: "",
      paciente_SER109H: "",
      decrippaci_SER109H: "",
      anolistarini_SER109H: "",
      meslistarini_SER109H: "",
      dialistarini_SER109H: "",
      anolistarfin_SER109H: "",
      meslistarfin_SER109H: "",
      dialistarfin_SER109H: "",
      observacion_SER109H: "",
      anexos_SER109H: "",
      descripdivision_SER109H: "",
      fechafacturaano_SER109H: "",
      fechafacturames_SER109H: "",
      fechafacturadia_SER109H: "",
      division_SER109H: "",
      valorsalmin_SER109H: "",
      topepoliza_SER109H: "",
      totalfact_SER109H: "",

    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    this.SER109H.PREFIJOW = "A";
    this.SER109H.FECHALNK = "20" + $_USUA_GLOBAL[0].FECHALNK;
    this.SER109H.PUCUSU = $_USUA_GLOBAL[0].PUC;
    this.SER109H.NITUSU = $_USUA_GLOBAL[0].NIT;
    this.SER109H.PEDIDOUSU = $_USUA_GLOBAL[0].PEDIDO;
    if ($_USUA_GLOBAL[0].NIT == 800156469) {
      this.SER109H.SERVICIOS = [
        { COD: "0", DESCRIP: "DROGUERIA" },
        { COD: "1", DESCRIP: "CIRUGIAS" },
        { COD: "2", DESCRIP: "ECOGRAFIAS" },
        { COD: "3", DESCRIP: "RX - IMAGENOLOGIA" },
        { COD: "4", DESCRIP: "DOPPLER" },
        { COD: "5", DESCRIP: "T.A.C." },
        { COD: "6", DESCRIP: "RESONANCIA NUCLEAR" },
        { COD: "7", DESCRIP: "PROMOCION Y PREVENCION" },
      ];
    } else {
      this.SER109H.SERVICIOS = [
        { COD: "0", DESCRIP: "DROGUERIA" },
        { COD: "1", DESCRIP: "CIRUGIAS" },
        { COD: "2", DESCRIP: "LAB. Y OTROS DIAG." },
        { COD: "3", DESCRIP: "RX - IMAGENOLOGIA" },
        { COD: "4", DESCRIP: "OTROS SERVICIOS" },
        { COD: "5", DESCRIP: "CONSULTAS Y TERAPIAS" },
        { COD: "6", DESCRIP: "PATOLOGIA" },
        { COD: "7", DESCRIP: "PROMOCION Y PREVENCION" },
      ];
    }
    var $_this = this;
    obtenerDatosCompletos({ nombreFd: "PREFIJOS" }, data => {
      data = data.PREFIJOS;
      this.SER109H.PREFIJOS = data;
      obtenerDatosCompletos({ nombreFd: "GRCAPITA" }, data => {
        data = data.GRCAPITA;
        this.SER109H.GRCAPITA = data;
        $_this._evaluarinicio_SER109H()
        // _evaluarprefijo_SER109H();
        obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
          data = data.FIRMAS;
          this.SER109H.FIRMAS = data;
        })
      });
    });
  },
  methods: {
    _evaluarinicio_SER109H() {
      let OPCIONES = new Object;
      OPCIONES = {
        '097434': this._evaluarprefijo_SER109H,
        '09743H': this._evaluarprefijo_SER109H,
        '09743I': this._evaluarprefijo_SER109H,
      }
      let active = $('#navegacion').find('li.opcion-menu.active');
      if (active.length == 0) {
        _usuarios_SAL7411();
      } else {
        this.SER109H.OPCIONACTIVA = active[0].attributes[2].nodeValue;
        let opcion = new Function();
        opcion = OPCIONES[active[0].attributes[2].nodeValue];
        opcion();
        let Nombreopcion = {
          '097434': '9,7,4,3,4 - Imprimir fact. subtotal paciente',
          '09743H': '9,7,4,3,H - Imprime factura en csv',
          '09743I': '9,7,4,3,I - Imprimir fact. subt. paci vlr uni'
        }
        nombreOpcion(Nombreopcion[this.SER109H.OPCIONACTIVA]);
      }

    },
    _evaluarprefijo_SER109H() {
      loader("hide");
      validarInputs(
        {
          form: "#PREFIJO_SER109H",
          orden: "1",
        },
        _toggleNav,
        () => {
          this.SER109H.PREFIJOW = prefijoMask_SER109H.value;
          let URL = get_url("APP/CONTAB/CON007.DLL");
          postData(
            {
              datosh: datosEnvio() + "9" + this.SER109H.PREFIJOW + "|",
            },
            URL,
          )
            .then(data => {
              data = data.split("|");
              this.form.numerofact_SER109H = parseInt(data[1].substring(3, 9)) - 1;
              this._evaluarnumeroprefijo_SER109H();
            })
            .catch(error => {
              _toggleNav();
            });
        },
      );
    },
    _evaluarnumeroprefijo_SER109H() {
      validarInputs(
        {
          form: "#NUMEROFACT_SER109H",
          orden: "1",
        },
        this._evaluarprefijo_SER109H,
        () => {
          this.SER109H.LLAVEW = this.SER109H.PREFIJOW + this.form.numerofact_SER109H.toString().padStart(6, "0");
          postData({ datosh: datosEnvio() + this.SER109H.LLAVEW + "|" }, get_url("APP/SALUD/SER808-01.DLL"))
            .then(data => {
              this.SER109H.FACTURA = data.NUMER19[0];
              let estado = {
                0: "Activo",
                1: "Retirado",
                2: "Anulado",
                3: "Bloqueo",
              };
              this.form.nit_SER109H = this.SER109H.FACTURA.NIT_NUM;
              this.form.entidadfact_SER109H = this.SER109H.FACTURA.DESCRIP_NUM;
              this.form.estadofact_SER109H = this.SER109H.FACTURA.ESTADO_NUM + "  -  " + estado[this.SER109H.FACTURA.ESTADO_NUM];
              this.form.pacifact_SER109H = this.SER109H.FACTURA.PACIENTE_NUM;
              this.SER109H.CONVENIONUM = this.SER109H.FACTURA.CONVENIO_NUM;
              this.SER109H.FECHARETNUM = this.SER109H.FACTURA.FECHA_RET;
              this.SER109H.FECHAINGNUM = this.SER109H.FACTURA.FECHA_ING;
              if (this.SER109H.FACTURA.FECHA_RET != 00000000) {
                this.form.anolistarfin_SER109H = this.SER109H.FACTURA.FECHA_RET.substring(0, 4);
                this.form.meslistarfin_SER109H = this.SER109H.FACTURA.FECHA_RET.substring(4, 6);
                this.form.dialistarfin_SER109H = this.SER109H.FACTURA.FECHA_RET.substring(6, 8);
                this.SER109H.FECHAFINW = this.form.anolistarfin_SER109H + this.form.meslistarfin_SER109H + this.form.dialistarfin_SER109H;
              } else {
                let fechasistema = moment().format("YYYYMMDD");
                this.form.anolistarfin_SER109H = fechasistema.substring(0, 4);
                this.form.meslistarfin_SER109H = fechasistema.substring(4, 6);
                this.form.dialistarfin_SER109H = fechasistema.substring(6, 8);
                this.SER109H.FECHAFINW = this.form.anolistarfin_SER109H + this.form.meslistarfin_SER109H + this.form.dialistarfin_SER109H;
              }
              if (this.SER109H.FACTURA.ESTADO_NUM == "0" || this.SER109H.FACTURA.ESTADO_NUM == "1") {
                $("#FECHARET_SER109H").removeClass("hidden");
                this.form.fecharet_SER109H = fecha_SER109H(this.SER109H.FACTURA.FECHA_RET);
              } else {
                $("#OPERBLOQ_SER109H").removeClass("hidden");
                this.form.operbloq_SER109H = this.SER109H.FACTURA.OPERBLOQ_NUM;
              }
              if (this.SER109H.FACTURA.FECHA_RET.substring(0, 4) > 0 && this.SER109H.FACTURA.FECHA_RET.substring(0, 4) != this.SER109H.FECHALNK.substring(0, 4)) {
                CON851("2R", "2R", this._evaluarnumeroprefijo_SER109H(), "error", "Error");
              }
              this.form.anolistarini_SER109H = this.SER109H.FACTURA.FECHA_ING.substring(0, 4);
              this.form.meslistarini_SER109H = this.SER109H.FACTURA.FECHA_ING.substring(4, 6);
              this.form.dialistarini_SER109H = this.SER109H.FACTURA.FECHA_ING.substring(6, 8);
              this.SER109H.FECHAINIW = this.form.anolistarini_SER109H + this.form.meslistarini_SER109H + this.form.dialistarini_SER109H;
              this._evaluartipo1_SER109H();
            })
            .catch(err => {
              this._evaluarnumeroprefijo_SER109H();
            });
        },
      );
    },
    _evaluartipo1_SER109H() {
      if (this.form.tipo1_SER109H.trim() == '') this.form.tipo1_SER109H = '*'
      validarInputs(
        {
          form: "#validartipo1_SER109H",
          orden: "1",
        },
        this._evaluarnumeroprefijo_SER109H,
        () => {
          if (this.form.tipo1_SER109H.trim() != "" && isNumeric(this.form.tipo1_SER109H)) {
            for (var i in this.SER109H.SERVICIOS) {
              if (parseInt(this.form.tipo1_SER109H) == this.SER109H.SERVICIOS[i].COD) {
                this.form.tipo1_SER109H = this.SER109H.SERVICIOS[i].COD + " - " + this.SER109H.SERVICIOS[i].DESCRIP;
                this._evaluartipo2_SER109H();
              }
            }
            if (this.form.tipo1_SER109H.length < 2) {
              CON851("03", "03", null, "error", "error");
              this._evaluartipo1_SER109H();
            }
          } else if (this.form.tipo1_SER109H == "*") {
            this.form.tipo1_SER109H = this.form.tipo1_SER109H + " TODOS LOS TIPOS";
            this.form.tipo2_SER109H = "* TODOS LOS TIPOS";
            this.form.tipo3_SER109H = "* TODOS LOS TIPOS";
            this._evaluarpacientes_SER109H();
          } else {
            CON851("03", "03", null, "error", "error");
            this._evaluartipo1_SER109H();
          }
        },
      );
    },
    _evaluartipo2_SER109H() {
      validarInputs(
        {
          form: "#validartipo2_SER109H",
          orden: "1",
        },
        () => {
          this.form.tipo1_SER109H = this.form.tipo1_SER109H.substring(0, 1);
          this._evaluartipo1_SER109H();
        },
        () => {
          if (this.form.tipo2_SER109H.trim() != "" && isNumeric(this.form.tipo2_SER109H)) {
            for (var i in this.SER109H.SERVICIOS) {
              if (this.form.tipo2_SER109H == this.SER109H.SERVICIOS[i].COD) {
                this.form.tipo2_SER109H = this.SER109H.SERVICIOS[i].COD + " - " + this.SER109H.SERVICIOS[i].DESCRIP;
                this._evaluartipo3_SER109H();
              }
            }
            if (this.form.tipo2_SER109H.length < 2) {
              CON851("03", "03", null, "error", "error");
              this._evaluartipo2_SER109H();
            }
          } else if (this.form.tipo2_SER109H.trim() == "*") {
            this.form.tipo2_SER109H = "* TODOS LOS TIPOS";
            this.form.tipo3_SER109H = "* TODOS LOS TIPOS";
            this._evaluarpacientes_SER109H();
          } else {
            CON851("03", "03", null, "error", "error");
            this._evaluartipo2_SER109H();
          }
        },
      );
    },
    _evaluartipo3_SER109H() {
      validarInputs(
        {
          form: "#validartipo3_SER109H",
          orden: "1",
        },
        () => {
          this.form.tipo2_SER109H = this.form.tipo2_SER109H.substring(0, 1);
          this._evaluartipo2_SER109H();
        },
        () => {
          if (this.form.tipo3_SER109H.trim() != "" && isNumeric(this.form.tipo3_SER109H)) {
            for (var i in this.SER109H.SERVICIOS) {
              if (this.form.tipo3_SER109H == this.SER109H.SERVICIOS[i].COD) {
                this.form.tipo3_SER109H = this.SER109H.SERVICIOS[i].COD + " - " + this.SER109H.SERVICIOS[i].DESCRIP;
                this._evaluarpacientes_SER109H();
              }
            }
            if (this.form.tipo3_SER109H.length < 2) {
              CON851("03", "03", null, "error", "error");
              this._evaluartipo3_SER109H();
            }
          } else if (this.form.tipo3_SER109H.trim() == "*") {
            this.form.tipo3_SER109H = "* TODOS LOS TIPOS";
            this._evaluarpacientes_SER109H();
          } else {
            CON851("03", "03", null, "error", "error");
            this._evaluartipo3_SER109H();
          }
        },
      );
    },
    _evaluarpacientes_SER109H() {
      if (this.SER109H.FACTURA.FACTCAPIT_NUM == this.SER109H.LLAVEW) {
        this.form.paciente_SER109H = "99";
        this.form.decrippaci_SER109H = "TODOS LOS PACIENTES";
        CON851("1W", "1W", this._evaluarfechainicio_SER109H("1"), "error", "error");
      } else {
        if (this.form.paciente_SER109H.trim() == "") {
          this.form.paciente_SER109H = "99";
        }
        validarInputs(
          {
            form: "#validarpaciente_SER109H",
            orden: "1",
          },
          () => {
            this.form.tipo3_SER109H = this.form.tipo3_SER109H.substring(0, 1);
            this._evaluartipo3_SER109H();
          },
          () => {
            this.form.paciente_SER109H = this.form.paciente_SER109H.padStart(15, "0");
            if (this.form.paciente_SER109H == "000000000000099") {
              this.SER109H.ESTRATO_PACI = '';
              this.form.decrippaci_SER109H = "TODOS LOS PACIENTES";
              this._evaluarfechafin_SER109H("3");
            } else {
              let URL = get_url("APP/SALUD/SER810-1.DLL");
              postData(
                {
                  datosh: datosEnvio() + this.form.paciente_SER109H + "|",
                },
                URL,
              )
                .then(data => {
                  this.SER109H.PACIENTE = data["REG-PACI"];
                  this.form.decrippaci_SER109H = this.SER109H.PACIENTE[0].DESCRIP;
                  this.SER109H.ESTRATO_PACI = this.SER109H.PACIENTE[0].ESTRATO;
                  this._evaluarfechainicio_SER109H("1");
                })
                .catch(error => {
                  this._evaluarpacientes_SER109H();
                });
            }
          },
        );
      }
    },
    _evaluarfechainicio_SER109H(orden) {
      validarInputs(
        {
          form: "#fechalistarInicial_SER109H",
          orden: orden,
        },
        this._evaluarpacientes_SER109H,
        () => {
          this.SER109H.FECHAINIW = moment(this.form.anolistarini_SER109H + this.form.meslistarini_SER109H + this.form.dialistarini_SER109H).format("YYYYMMDD");
          if (this.SER109H.FECHAINIW == "Invalid date") {
            CON851("", "fecha invalido!", this._evaluarfechainicio_SER109H("1"), "error", "error");
          } else {
            this._evaluarfechafin_SER109H("1");
          }
        },
      );
    },
    _evaluarfechafin_SER109H(orden) {
      if (this.SER109H.FECHAFINW < this.SER109H.FECHAINIW) {
        this.SER109H.FECHAFINW = this.SER109H.FECHAINIW;
        this.form.anolistarfin_SER109H = this.SER109H.FECHAFINW.substring(0, 4);
        this.form.meslistarfin_SER109H = this.SER109H.FECHAFINW.substring(4, 6);
        this.form.dialistarfin_SER109H = this.SER109H.FECHAFINW.substring(6, 8);
      }
      validarInputs(
        {
          form: "#fechalistarFinal_SER109H",
          orden: orden,
        },
        () => {
          this._evaluarfechainicio_SER109H("1");
        },
        () => {
          this.SER109H.FECHAFINW = moment(this.form.anolistarfin_SER109H + this.form.meslistarfin_SER109H + this.form.dialistarfin_SER109H).format("YYYYMMDD");
          if (this.SER109H.FECHAFINW == "Invalid date") {
            CON851("", "Dia invalido!", this._evaluarfechafin_SER109H("1"), "error", "error");
          } else {
            if (this.SER109H.FECHAFINW < this.SER109H.FECHAINIW) {
              CON851("37", "37", this._evaluarfechafin_SER109H("1"), "error", "error");
            } else {
              this._actualizarcopagos_SER109H();
            }
          }
        },
      );
    },
    _actualizarcopagos_SER109H() {
      if (this.SER109H.FACTURA.FACTCAPIT_NUM == this.SER109H.LLAVEW) {
        if (this.SER109H.FACTURA.FECHA_ING.substring(0, 4) == this.SER109H.FECHALNK.substring(0, 4)) {
          let URL = get_url("APP/SALUD/SAL020H.DLL");
          postData(
            {
              datosh: datosEnvio() + this.SER109H.LLAVEW + "|",
            },
            URL,
          )
            .then(data => {
              console.debug(data);
            })
            .catch(error => {
              console.error(error);
            });
        }
      } else {
        let URL = get_url("APP/SALUD/SAL020F.DLL");
        postData(
          {
            datosh: datosEnvio() + this.SER109H.LLAVEW + "|" + this.SER109H.FACTURA.NIT_NUM + "|",
          },
          URL,
        )
          .then(data => {
            console.debug(data);
          })
          .catch(error => {
            console.error(error);
          });
      }
      this._evaluarestado_SER109H();
    },
    _evaluarestado_SER109H() {
      if (this.SER109H.FACTURA.ESTADO_NUM == "1") {
        this._afectarnumeracion_SER109H();
      } else {
        let URL = get_url("APP/SALUD/SAL020GA.DLL");
        postData(
          {
            datosh: datosEnvio() + this.SER109H.LLAVEW + "|" + $_USUA_GLOBAL[0].FECHALNK + "|",
          },
          URL,
        )
          .then(data => {
            if (this.SER109H.PREFIJOW == 'T') {
              this.SER109H.VALORES = data.VALORES[0];
              $('#VALORESCARTERA_109H').removeClass('hidden');
              this.form.valorsalmin_SER109H = this.SER109H.VALORES.SALMIN
              this.form.topepoliza_SER109H = this.SER109H.VALORES.TOPE
              this.form.totalfact_SER109H = this.SER109H.VALORES.TOTAL
            }
            this._afectarnumeracion_SER109H();
          })
          .catch(error => {
            this._afectarnumeracion_SER109H();
          });
      }
    },
    _afectarnumeracion_SER109H() {
      this.form.observacion_SER109H = this.SER109H.FACTURA.OBSERV_NUM.trim();
      this.form.anexos_SER109H = this.SER109H.FACTURA.ANEXOS_NUM.trim();
      if (parseInt(this.SER109H.FACTURA.FECHA_PRE.substring(4, 6)) == 0) {
        if (parseInt(this.SER109H.FACTURA.FECHA_PRE.substring(4, 6)) > 0) {
          this.form.fechafacturaano_SER109H = this.SER109H.FACTURA.FECHA_RET.substring(0, 4);
          this.form.fechafacturames_SER109H = this.SER109H.FACTURA.FECHA_RET.substring(4, 6);
          this.form.fechafacturadia_SER109H = this.SER109H.FACTURA.FECHA_RET.substring(6, 8);
        } else {
          let fechaactual = moment().format("YYYYMMDD");
          this.form.fechafacturaano_SER109H = fechaactual.substring(0, 4);
          this.form.fechafacturames_SER109H = fechaactual.substring(4, 6);
          this.form.fechafacturadia_SER109H = fechaactual.substring(6, 8);
        }
      } else {
        this.form.fechafacturaano_SER109H = this.SER109H.FACTURA.FECHA_ING.substring(0, 4);
        this.form.fechafacturames_SER109H = this.SER109H.FACTURA.FECHA_ING.substring(4, 6);
        this.form.fechafacturadia_SER109H = this.SER109H.FACTURA.FECHA_ING.substring(6, 8);
      }
      if (this.SER109H.FACTURA.ESTADO_NUM == "3" || this.SER109H.FACTURA.ESTADO_NUM == "0") {
        this._evaluarobservacion_SER109H("1");
      } else {
        this._evaluarfechaimpresion_SER109H("1");
      }
    },
    _evaluarobservacion_SER109H(orden) {
      _FloatText({ estado: "on", msg: [{ mensaje: "Oprima F3 para continuar" }] });
      validarInputs(
        {
          form: "#OBSERVACION_SER109H",
          orden: orden,
        },
        () => {
          _FloatText({ estado: "off" });
          this._evaluarfechafin_SER109H("1");
        },
        () => {
          _FloatText({ estado: "off" });
          this.form.observacion_SER109H = this.form.observacion_SER109H.toUpperCase();
          this.form.anexos_SER109H = this.form.anexos_SER109H.toUpperCase();
          if (this.SER109H.FACTURA.ESTADO_NUM == "3") {
            this._evaluargrabarnumeracion_SER109H();
          } else {
            this._evaluarbloqfactura_SER109H();
          }
        },
      );
    },
    _evaluarbloqfactura_SER109H() {
      if (bloqueoMask_SER109H.value.trim() == "") bloqueoMask_SER109H.typedValue = "N";
      validarInputs(
        {
          form: "#BLOQFACT_SER109H",
          orden: "1",
        },
        () => {
          this._evaluarobservacion_SER109H("2");
        },
        () => {
          if (bloqueoMask_SER109H.value == "S") (this.form.estadofact_SER109H = "3"), (this.form.operbloq_SER109H = localStorage.getItem("Usuario").trim());
          this._evaluargrabarnumeracion_SER109H();
        },
      );
    },
    _evaluargrabarnumeracion_SER109H() {
      if (this.form.observacion_SER109H.trim() != this.SER109H.FACTURA.OBSERV_NUM.trim() || this.form.anexos_SER109H.trim() != this.SER109H.FACTURA.ANEXOS_NUM.trim() || this.form.estadofact_SER109H.substring(0, 1) != this.SER109H.FACTURA.ESTADO_NUM) {
        let URL = get_url("APP/SALUD/SER109D.DLL");
        postData(
          {
            datosh: datosEnvio() + "2|" + $_USUA_GLOBAL[0].COD_CIUD + "|" + this.SER109H.LLAVEW + "|" + this.form.observacion_SER109H + "|" + this.form.anexos_SER109H + "|" + this.form.estadofact_SER109H.substring(0, 1) + "|" + "|" + "|" + "|" + "|" + "|" + localStorage.getItem("Usuario").trim() + "|",
          },
          URL,
        )
          .then(data => {
            this._evaluarfechaimpresion_SER109H("1");
          })
          .catch(error => {
            if (error.MENSAJE == "01") {
              this._evaluarbloqfactura_SER109H();
            }
          });
      } else {
        this._evaluarfechaimpresion_SER109H("1");
      }
    },
    _evaluarfechaimpresion_SER109H(orden) {
      drogueriaMask_SER109H.typedValue = "N";
      mostrarcomprobanteMask_SER109H.typedValue = "N";
      ordenarfechaMask_SER109H.typedValue = "N";
      cambiarfechaMask_SER109H.typedValue = "N";
      medicoMask_SER109H.typedValue = "N";
      totalizarpacMask_SER109H.typedValue = "N";
      cambiarcupsMask_SER109H.typedValue = "N";
      fechaserMask_SER109H.typedValue = "N";
      originalMask_SER109H.typedValue = "N";
      recibosMask_SER109H.typedValue = "N";
      validarInputs(
        {
          form: "#FECHAFACT_SER109H",
          orden: orden,
        },
        this._evaluarbloqfactura_SER109H,
        () => {
          this.SER109H.FECHA = this.form.fechafacturaano_SER109H + this.form.fechafacturames_SER109H.padStart(2, "0") + this.form.fechafacturadia_SER109H.padStart(2, "0");
          this._evaluardrogueria_SER109H("1");
        },
      );
    },
    _evaluardrogueria_SER109H(orden) {
      validarInputs(
        {
          form: "#DISCDROGUERIA_SER109H",
          orden: orden,
        },
        this._evaluarbloqfactura_SER109H,
        () => {
          if (drogueriaMask_SER109H.value.trim() == "") drogueriaMask_SER109H.typedValue = "S";
          if (mostrarcomprobanteMask_SER109H.value.trim() == "") mostrarcomprobanteMask_SER109H.typedValue = "N";
          this._evaluarunidadserv_SER109H();
        },
      );
    },
    _evaluarunidadserv_SER109H() {
      if (this.form.paciente_SER109H == "000000000000099") {
        this.form.division_SER109H = "**";
        this.form.descripdivision_SER109H = "TODAS LAS UNIDADES DE SERVICIO";
        this._evaluarorden_SER109H("1");
      } else {
        if (this.form.division_SER109H == "") this.form.division_SER109H == "**";
        validarInputs(
          {
            form: "#DIVISIONFACT_SER109H",
            orden: "1",
          },
          () => {
            this._evaluardrogueria_SER109H("1");
          },
          () => {
            if (this.form.division_SER109H.trim() == "**") {
              this.form.descripdivision_SER109H = "TODAS LAS UNIDADES DE SERVICIO";
              this._evaluarorden_SER109H("1");
            } else {
              const res = this.SER109H.GRCAPITA.find(e => e.CODIGO == this.form.division_SER109H);
              if (res == undefined) {
                CON851("01", "01", this._evaluarunidadserv_SER109H(), "error", "error");
              } else {
                this.form.descripdivision_SER109H = res.DESCRIP;
                this.SER109H.CLASEGRCAP8 = res.MEDICM;
                this._evaluarorden_SER109H("1");
              }
            }
          },
        );
      }
    },
    _evaluarorden_SER109H(orden) {
      if (ordenarfechaMask_SER109H.value.trim() == "") ordenarfechaMask_SER109H.typedValue = "S";
      if (cambiarfechaMask_SER109H.value.trim() == "") cambiarfechaMask_SER109H.typedValue = "N";
      validarInputs(
        {
          form: "#ORDENFECHA_SER109H",
          orden: orden,
        },
        () => {
          this._evaluardrogueria_SER109H("2");
        },
        () => {
          if (ordenarfechaMask_SER109H.value.trim() == "") ordenarfechaMask_SER109H.typedValue = "S";
          if (cambiarfechaMask_SER109H.value.trim() == "") cambiarfechaMask_SER109H.typedValue = "N";
          this._evaluarfiltrosimpresion_SER109H()
        },
      );
    },
    _evaluarfiltrosimpresion_SER109H() {
      let URL = get_url("APP/SALUD/SER109H.DLL");
      postData({
        datosh: datosEnvio() + `${this.SER109H.LLAVEW}|${this.form.paciente_SER109H.trim().padStart(15, '0')}|${this.form.division_SER109H}|${this.SER109H.FECHAINIW}|${this.SER109H.FECHAFINW}|${this.form.tipo1_SER109H.substring(0, 1)}|${this.form.tipo2_SER109H.substring(0, 1)}|${this.form.tipo3_SER109H.substring(0, 1)}|${mostrarcomprobanteMask_SER109H.value.trim()}|${ordenarfechaMask_SER109H.value.trim()}|${drogueriaMask_SER109H.value.trim()}|${cambiarfechaMask_SER109H.value.trim()}|`
      }, URL)
        .then((data) => {
          this.SER109H.IMPRESION = data.FACTURA
          this.SER109H.IMPRESION.pop()
          this._evaluarorden2_SER109H('1')
        })
        .catch((error) => {
          console.log(error);
          if (error.MENSAJE == '08') {
            $('#VACIA_SER109H').removeClass('hidden');
            facturavaciaMask_SER109H.typedValue = 'N';
            this._evaluarimprimirvacia_SER109H();
          } else {
            console.error(error);
            CON851('', 'Hubo un error con el cierre', this._evaluarimpresionorig_SER109H(), 'error', 'Error');
          }
        })
    },
    _evaluarimprimirvacia_SER109H() {
      validarInputs({
        form: '#BLANCO_SER109H',
        orden: '1'
      }, () => { this._evaluarorden_SER109H("2") },
        () => {
          if (facturavaciaMask_SER109H.value.trim() == '') facturavaciaMask_SER109H.typedValue = 'N'
          if (facturavaciaMask_SER109H == 'S') {
            this._datosimpresion_SER10A9()
          } else {
            _toggleNav()
          }
        }
      )
    },
    _evaluarorden2_SER109H(orden) {
      validarInputs(
        {
          form: "#ORDENAR2_SER109H",
          orden: orden,
        },
        () => { this._evaluarorden_SER109H("2"); },
        () => {
          if (medicoMask_SER109H.value.trim() == "") medicoMask_SER109H.typedValue = "N";
          if (totalizarpacMask_SER109H.value.trim() == "") totalizarpacMask_SER109H.typedValue = "S";
          this._evaluarcups_SER109H();
        },
      );
    },
    _evaluarcups_SER109H() {
      if ($_USUA_GLOBAL[0].NIT == 845000038) {
        validarInputs(
          {
            form: "#CAMBCUPS_SER109H",
            orden: "1",
          },
          () => {
            this._evaluarorden_SER109H("2");
          },
          () => {
            if (cambiarcupsMask_SER109H.value.trim() == "") cambiarcupsMask_SER109H.typedValue = "N";
            this._evaluarcambiarfecha_SER109H();
          },
        );
      } else {
        this._evaluarcambiarfecha_SER109H();
      }
    },
    _evaluarcambiarfecha_SER109H() {
      if ($_USUA_GLOBAL[0].NIT == 800162035 || $_USUA_GLOBAL[0].NIT == 900004059) {
        if (fechaserMask_SER109H.value.trim() == "") fechaserMask_SER109H.typedValue = "N";
        validarInputs(
          {
            form: "#CAMBIARFECHA_SER109H",
            orden: "1",
          },
          () => {
            this._evaluarorden_SER109H("2");
          },
          () => {
            if (fechaserMask_SER109H.value.trim() == "") fechaserMask_SER109H.typedValue = "N";
            this._evaluarimpresionorig_SER109H("1");
          },
        );
      } else {
        this._evaluarimpresionorig_SER109H("1");
      }
    },
    _evaluarimpresionorig_SER109H(orden) {
      this.SER109H.TOTBASECOPAGO = this.SER109H.TOTCOPAGOFAME = this.SER109H.TOTCTAMODFAME = 0;
      for (var i in this.SER109H.FACTURAS){
          let valor = 0;
          if (this.SER109H.OPCIONACTIVA != '09743A') {valor = parseInt(this.SER109H.FACTURAS[i].VALOR.replace(/,/g,''))}
          else{valor = parseInt(this.SER109H.FACTURAS[i].VALOR_NETO.replace(/,/g,''))}
          console.log(valor)
          if (isNaN(valor)) valor = 0;
          if (this.SER109H.FACTURA.ACUERDO260.trim() == 'S'){
              this.SER109H.TOTBASECOPAGO = this.SER109H.TOTBASECOPAGO + valor;
          } else {
              if (this.SER109H.OPCIONACTIVA != '097436'){
                  if (this.SER109H.OPCIONACTIVA != '097439'){
                      if (this.SER109H.FACTURAS[i].CUPS.trim() != '890701'){
                          this.SER109H.TOTBASECOPAGO = this.SER109H.TOTBASECOPAGO + valor;
                      }
                  } else {
                      if (this.SER109H.FACTURAS[i].CODIGO.trim() != '890701'){
                          this.SER109H.TOTBASECOPAGO = this.SER109H.TOTBASECOPAGO + valor;
                      }
                  }
              } else {
                  this.SER109H.TOTBASECOPAGO = this.SER109H.TOTBASECOPAGO + valor;
              }
          }
          if (this.SER109H.PREFIJOW != 'C' && this.SER109H.PREFIJOW != 'E' && this.SER109H.PREFIJOW != 'Ñ' && this.SER109H.PREFIJOW != 'O' && this.SER109H.PREFIJOW != 'T' && this.SER109H.PREFIJOW != 'V' && this.SER109H.PREFIJOW != 'X' && this.SER109H.PREFIJOW != 'Y' && this.SER109H.PREFIJOW != 'Z' && this.SER109H.PREFIJOW != 'W'){
              if (this.SER109H.FACTURAS[i].TIPO_COPAGO == '1'){
                  if (this.SER109H.OPCIONACTIVA != '09743A'){
                      if (this.SER109H.FACTURAS[i].COPAGO.trim() != ''){
                          this.SER109H.TOTCOPAGOFAME = this.SER109H.TOTCOPAGOFAME + valor
                      }
                  } else {
                      if (this.SER109H.FACTURAS[i].COPAGO.trim() != '' || this.SER109H.FACTURAS[i].VALOR_COPAGOS.trim()){
                          this.SER109H.TOTCOPAGOFAME = this.SER109H.TOTCOPAGOFAME + valor
                      }
                  }
              } else if (this.SER109H.FACTURAS[i].TIPO_COPAGO == '2'){
                  if (this.SER109H.OPCIONACTIVA != '09743A'){
                      if (this.SER109H.FACTURAS[i].COPAGO.trim() != ''){
                          this.SER109H.TOTCTAMODFAME = this.SER109H.TOTCTAMODFAME + valor
                      }
                  } else {
                      if (this.SER109H.FACTURAS[i].COPAGO.trim() != '' || this.SER109H.FACTURAS[i].VALOR_COPAGOS.trim()){
                          this.SER109H.TOTCTAMODFAME = this.SER109H.TOTCTAMODFAME + valor
                      }
                  }
              } else {
                  if (this.SER109H.OPCIONACTIVA != '09743A'){
                      if (this.SER109H.FACTURAS[i].COPAGO.trim() != ''){
                          this.SER109H.TOTCTAMODFAME = this.SER109H.TOTCTAMODFAME + valor
                      }
                  } else {
                      if (this.SER109H.FACTURAS[i].COPAGO.trim() != '' || this.SER109H.FACTURAS[i].VALOR_COPAGOS.trim()){
                          this.SER109H.TOTCTAMODFAME = this.SER109H.TOTCTAMODFAME + valor
                      }
                  }
              }
          }
      }
      validarInputs(
        {
          form: "#IMPRIMIR_SER109H",
          orden: orden,
        },
        () => {
          this._evaluarorden_SER109H("2");
        },
        () => {
          if (originalMask_SER109H.value.trim() == "") originalMask_SER109H.typedValue = "N";
          if (recibosMask_SER109H.value.trim() == "") recibosMask_SER109H.typedValue = "N";
          if (parseFloat(this.SER109H.FACTURA.PORCECOPAGO_NUM) > 0 && (this.SER109H.PREFIJOW == 'P' || this.SER109H.PREFIJOW == 'T' || this.SER109H.PREFIJOW == 'O' || this.SER109H.PREFIJOW == 'Q' || this.SER109H.PREFIJOW == 'R' || this.SER109H.PREFIJOW == 'U' || this.SER109H.PREFIJOW == 'V' || this.SER109H.PREFIJOW == 'W' || this.SER109H.PREFIJOW == 'X' || this.SER109H.PREFIJOW == 'Y' || this.SER109H.PREFIJOW == 'Z')) {
            if (this.form.estadofact_SER109H.substring(0, 1) == '0' || this.form.estadofact_SER109H.substring(0, 1) == '3') {
              postData({
                datosh: datosEnvio() + this.SER109H.LLAVEW + '|' + this.SER109H.FACTURA.IDPAC_NUM + '|' + this.SER109H.FACTURA.PACIENTE_NUM.substring(0, 5) + '|' + '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2) + '|'
              }, get_url("APP/SALUD/SER836E.DLL"))
                .then((data) => {
                  console.debug(data);
                  this.SER109H.COPAGOSACUMW = data.CONSULTA[0].COPAGO;
                  setTimeout( () => {
                    _liquidacioncopagos_SALUD(this._datosimpresion_SER109H, this._evaluarfacturaoriginal_SER109H, params = { NUMERACION: this.SER109H.FACTURA, LLAVE_NUM: this.SER109H.LLAVEW, TOTBASECOPAGO: this.SER109H.TOTBASECOPAGO });
                }, 300 );
                })
                .catch((error) => {
                  console.error(error);
                  this._evaluarfacturaoriginal_SER109();
                });
            }
          } else {
            this._datosimpresion_SER109H();
          }
        },
      );
    },

    _datosimpresion_SER109H(data) {
      CON851P('Factura resumida', 
      () => {
        this.SER109H.RESUMIDO = 'N';
        this._datosimpresion2_SER109H(data) 
      },
       () => { 
        this.SER109H.RESUMIDO = 'S';
         this._datosimpresion2_SER109H(data) 
        }
      );
    },
    _datosimpresion2_SER109H(data){
      if (data) {
        this.SER109H.FACTURA.COPAGOEST_NUM = data.COPAGO;
        this.SER109H.FACTURA.PORCECOPAGO_NUM = data.PORCENTAJE;
      }
      if (this.SER109H.IMPRESION.length == 0) CON851('', 'No existen facturas en ese periodo de tiempo', this._evaluarimpresionorig_SER109H('1'), 'error', 'Error')
      if (this.SER109H.OPCIONACTIVA == '09743H') {
        console.log('EXCEL')
        this.SER109H.DVTER = this.SER109H.IMPRESION[0].DV
        this.SER109H.DIRTER = this.SER109H.IMPRESION[0].DIR
        this.SER109H.TELTER = this.SER109H.IMPRESION[0].TEL
        this.SER109H.CIUDTER = this.SER109H.IMPRESION[0].CIUDAD
        for (var i in this.SER109H.IMPRESION) {
          if (parseInt(this.SER109H.IMPRESION[i].VALOR) > 0) {
            this.SER109H.IMPRESION[i].VALOR = this.SER109H.IMPRESION[i].VALOR.replace(/,/g, '')
          }
        }
        if (originalMask_SER109H.value.trim() == 'S') this.SER109H.TIPOIMPRESION = '***ORIGINAL***'
        else this.SER109H.TIPOIMPRESION = '***COPIA***'
        var saldocopago = 0;
        if ($_USUA_GLOBAL[0] == 891855847) {
          saldocopago = 0;
        } else if (($_USUA_GLOBAL[0].PUC == '4' || $_USUA_GLOBAL[0].PUC == '6') && (parseInt(this.SER109H.FACTURA.NIT_NUM) == 9990 || parseInt(this.SER109H.FACTURA.NIT_NUM) == 9999) && (parseInt(this.SER109H.FACTURA.FECHA_ING) > 20070930)) {
          saldocopago = parseInt(this.SER109H.FACTURA.COPAGO_NUM) + abono
        } else {
          if (abono != 0) {
            saldocopago = 0
          } else {
            saldocopago = parseInt(this.SER109H.FACTURA.COPAGO_NUM);
          }
        }
        let neto = vlr - saldocopago;
        this.SER109H.VLRTOTAL = vlr;
        this.SER109H.SALDOCOPAGO = saldocopago;
        this.SER109H.SALDO = neto;
        data = this.SER109H.IMPRESION
        columnas = [
          {
            title: "Comp.",
            value: 'COMP',
          },
          {
            title: "Fecha.",
            value: 'FECHA',
          },
          {
            title: "Nombre",
            value: 'NOMBRE_PACIENTE',
          },{
            title: "Identificacion",
            value: 'DOCUMENTO',
            format: 'string'
          },
          {
            title: "Edad",
            value: 'EDAD',
          },
          {
            title: "Sx",
            value: 'SEXO',
          },
          {
            title: "Concepto",
            value: 'CONCEPTO',
          },
          {
            title: "Cant",
            value: 'CANTIDAD',
          },
          {
            title: "Valor",
            value: 'VALOR',
          },
          {
            title: "Cod. Serv",
            value: 'ARTICULO',
          },
          {
            title: "Und autorizacion",
            value: 'NROAUTORI_NUM',
          },
          {
            title: "Copagos",
            value: 'COPAGO',
          }

        ]
        _impresion2({
          tipo: 'excel',
          header: [
            { text: `${$_USUA_GLOBAL[0].NOMBRE}`, center: { left: 0.5, top: 0.5 }, bold: true, size: 16 },
            { text: `${$_USUA_GLOBAL[0].NIT}`, horizontalCentered: 'true', size: 14 },
            { text: `${$_USUA_GLOBAL[0].DIRECC}` + 'TEL: ' + `${$_USUA_GLOBAL[0].TEL}` + ' ' + `${$_USUA_GLOBAL[0].NOMBRE_CIU}`, size: 14 },
            { text: `${this.SER109H.TIPOIMPRESION}`, horizontal: 'right', bold: true, size: 14 },
            `FECHA: ` + moment(this.SER109H.FECHA).format('MMMM DD YYYY').toUpperCase() + ' FACTURA DE VENTA No:' + this.SER109H.LLAVEW,
            `CLIENTE: ` + this.SER109H.FACTURA.DESCRIP_NUM + ' NIT:' + this.SER109H.FACTURA.NIT_NUM + '-' + this.SER109H.DVTER,
            `DIRECCION: ` + this.SER109H.DIRTER + ' TEL:' + this.SER109H.TELTER + ' CIUDAD: ' + this.SER109H.CIUDTER,
            ` ` + this.SER109H.FACTURA.DESCRIP_TAR,
            `OBSERVAC: ` + this.SER109H.FACTURA.OBSERV_NUM,
            `ANEXOS: ` + this.SER109H.FACTURA.ANEXOS_NUM,

          ],
          // footer:[
          //   `TOTAL FACTURA: ` + this.SER109H.VLRTOTAL,
          //   `SALDO: ` + this.SER109H.SALDO,
          // ],
          logo: `${$_USUA_GLOBAL[0].NIT}.png`,
          ruta_logo: 'C:\\PROSOFT\\LOGOS\\',
          tabla: {
            columnas,
            data: data,
          },
          archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
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

      } else {
        console.log('PDF', this.SER109H.FACTURA)
        let impresion = new Object;
        impresion.FORMATOTABLA = 1;
        impresion.TARIF = 1;
        impresion.OBSERVACION = 2;
        impresion.ANEXO = 2;
        impresion.FIRMA = 1;
        impresion.MARGIN = [10, 120, 10, 20];
        if (this.SER109H.RESUMIDO == 'S') {
          impresion.WIDTH = ['9%', '9%', '31%', '8%', '25%', '5%', '10%'];
          impresion.COLUMNAS = ["NRO_COMP", "FECHA", "DETALLE", "ARTICULO", "CONCEPTO", "CANTIDAD", "VALOR"];
        } else {
          impresion.WIDTH = ['5%', '8%', '19%', '5%', '4%', '25%', '3%', '8%', '8%', '5%', '8%'];
          impresion.COLUMNAS = ["NRO_COMP", "FECHA", "DETALLE", "EDAD", "SEXO", "CONCEPTO", "CANTIDAD", "VALOR", "COPAGO", "NRO_AUTOR", "ARTICULO"];
        }
        impresion.RESUMIDO = this.SER109H.RESUMIDO;
        if (originalMask_SER109H.value.trim() == 'S') impresion.ORIGINAL = '***ORIGINAL***'
        else impresion.ORIGINAL = '***COPIA***'
        impresion.FECHAVENCE = moment(this.SER109H.FECHA).add(1, 'months').format('MMMM DD YYYY').toUpperCase();
        impresion.FECHA = moment(this.SER109H.FECHA).format('MMMM DD YYYY').toUpperCase();
        impresion.LLAVE = this.SER109H.LLAVEW;
        impresion.NOMTER = this.SER109H.FACTURA.DESCRIP_NUM;
        impresion.NITTER = this.SER109H.FACTURA.NIT_NUM;
        impresion.DVTER = this.SER109H.IMPRESION[0].DV;
        impresion.DIRECCTER = this.SER109H.IMPRESION[0].DIR;
        impresion.TELTER = this.SER109H.IMPRESION[0].TEL;
        impresion.CIUDADTER = this.SER109H.IMPRESION[0].CIUDAD;
        impresion.DESCRIPTAR = this.SER109H.FACTURA.DESCRIP_TAR;
        impresion.REGIMEN = this.SER109H.IMPRESION[0].CUENTA;
        let tipo = { 'C': 'CONTRIBUTIVO', 'S': 'SUBSIDIADO', 'V': 'VINCULADO', 'P': 'PARTICULAR ', 'O': 'OTRO TIPOP', 'D': 'DESP. CONT', 'E': 'DESP. SUBS', 'F': 'DESP. VINC' };
        if (tipo == undefined) impresion.TIPOPACI = '';
        impresion.TIPOPACI = tipo[this.SER109H.FACTURA.TIPOPACI_NUM]
        var valorpaciente = 0;
        let arrayimpresion = [];
        let idpacientes = this.SER109H.IMPRESION
        idpacientes.sort((a, b) => {
          if (a.IDPAC > b.IDPAC) {
              return 1;
          }
          if (a.IDPAC < b.IDPAC) {
              return -1;
          }
          return 0;
        })
        console.log(this.SER109H.IMPRESION);
        for (var i in this.SER109H.IMPRESION) {
          arrayimpresion.push(this.SER109H.IMPRESION[i]);
          let siguiente = parseInt(i) + 1;
          if (this.SER109H.IMPRESION[siguiente] == undefined) {
            let valor = parseFloat(this.SER109H.IMPRESION[i].VALOR.replace(/,/g, '').replace(/ /g,''))
            console.log(valor);
            valorpaciente = valorpaciente + valor;
            // arrayimpresion.splice(i + 1, 0, { 'NRO_COMP': ' ', 'FECHA': ' ', 'DETALLE': ' ', 'EDAD': ' ', 'SEXO': ' ', 'CONCEPTO': 'TOTAL PACIENTE', 'CANTIDAD': ' ', 'VALOR': numeroencomas(valorpaciente), 'COPAGO': ' ', 'NRO_AUTOR': ' ', 'ARTICULO': ' ' })
            arrayimpresion.push({ 'NRO_COMP': ' ', 'FECHA': ' ', 'DETALLE': ' ', 'EDAD': ' ', 'SEXO': ' ', 'CONCEPTO': 'TOTAL PACIENTE', 'CANTIDAD': ' ', 'VALOR': numeroencomas(valorpaciente), 'COPAGO': ' ', 'NRO_AUTOR': ' ', 'ARTICULO': ' ' });
          } else {
            if (this.SER109H.IMPRESION[i].IDPAC != this.SER109H.IMPRESION[siguiente].IDPAC && this.SER109H.IMPRESION[siguiente].IDPAC.trim() != '') {
              let valor = parseFloat(this.SER109H.IMPRESION[i].VALOR.replace(/,/g, '').replace(/ /g,''));
              console.log(valor);
              valorpaciente = valorpaciente + valor;
              // arrayimpresion.splice(i + 1, 0, { 'NRO_COMP': ' ', 'FECHA': ' ', 'DETALLE': ' ', 'EDAD': ' ', 'SEXO': ' ', 'CONCEPTO': 'TOTAL PACIENTE', 'CANTIDAD': ' ', 'VALOR': numeroencomas(valorpaciente), 'COPAGO': ' ', 'NRO_AUTOR': ' ', 'ARTICULO': ' ' })
              arrayimpresion.push({ 'NRO_COMP': ' ', 'FECHA': ' ', 'DETALLE': ' ', 'EDAD': ' ', 'SEXO': ' ', 'CONCEPTO': 'TOTAL PACIENTE', 'CANTIDAD': ' ', 'VALOR': numeroencomas(valorpaciente), 'COPAGO': ' ', 'NRO_AUTOR': ' ', 'ARTICULO': ' ' });
              valorpaciente = 0;
            } else {
              let valor = parseFloat(this.SER109H.IMPRESION[i].VALOR.replace(/,/g, '').replace(/ /g,''));
              console.log(valor);
              valorpaciente = valorpaciente + valor;
            }
          }
        }
        console.log(arrayimpresion);
        impresion.FACTURAS = arrayimpresion;
        impresion.TABLARBOS_NUM = this.SER109H.FACTURA.TABLA_ABON.filter(x => parseInt(x.VLR_ABON) > 0);
        impresion.OBSERVNUM = this.SER109H.FACTURA.OBSERV_NUM;
        impresion.ANEXOSNUM = this.SER109H.FACTURA.ANEXOS_NUM;
        impresion.OPERMODNUM = this.SER109H.FACTURA.OPERMOD_NUM;
        impresion.OPERBLOQNUM = this.SER109H.FACTURA.OPERBLOQ_NUM;
        impresion.OPERNUM = this.SER109H.FACTURA.OPER_NUM;
        impresion.ADMINW = localStorage.getItem('Usuario');
        impresion.IDPACNUM = this.SER109H.FACTURA.IDPAC_NUM;
        impresion.NOMBREPACNUM = this.SER109H.FACTURA.NOMBREPAC_NUM;
        if ($_USUA_GLOBAL[0].IVA_S == 'C') {
          if ($_USUA_GLOBAL[0].RETEIVA == 'S') {
            impresion.IVA = 'IVA Regimen Comun - Retenedor Iva'
          } else {
            impresion.IVA = 'IVA Regimen Comun'
          }
        } else if ($_USUA_GLOBAL[0].IVA_S == 'C') {
          if ($_USUA_GLOBAL[0].NIT == 900565371 || $_USUA_GLOBAL[0].NIT == 901120152) {
            impresion.IVA = 'Somos Responsables de IVA - Actividad Excluida de IVA'
          } else {
            impresion.IVA = 'IVA Regimen Simplificado'
          }
        } else if ($_USUA_GLOBAL[0].IVA_S == 'N') {
          impresion.IVA = 'No somos responsables de IVA'
        } else {
          impresion.IVA = '';
        }
        let prefijo = this.SER109H.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == this.SER109H.PREFIJOW)
        if (prefijo.length == 0) {
          prefijo[0] = new Object;
          prefijo[0].AUT_DIAN = '';
          prefijo[0].PREFIJO = $_PREFIJOFACT;
          prefijo[0].DESDE_NRO = '';
          prefijo[0].HASTA_NRO = '';
        }
        if (prefijo[0].PREFIJO == 'A'){
          impresion.FIRMA = 2
        }
        var vlr = 0;
        for (var i in this.SER109H.IMPRESION) {
          vlr = vlr + parseInt(this.SER109H.IMPRESION[i].VALOR.replace(/,/g, ''));
        }
        var abono = 0;
        for (var i in this.SER109H.FACTURA.TABLA_ABON) {
          if (this.SER109H.FACTURA.TABLA_ABON[i].VLR_ABON != '') {
            abono = parseInt(this.SER109H.FACTURA.TABLA_ABON[i].VLR_ABON.replace(/,/g, '')) + abono;
          }
        }
        var saldocopago = 0;
        if ($_USUA_GLOBAL[0] == 891855847) {
          saldocopago = 0;
        } else if (($_USUA_GLOBAL[0].PUC == '4' || $_USUA_GLOBAL[0].PUC == '6') && (parseInt(this.SER109H.FACTURA.NIT_NUM) == 9990 || parseInt(this.SER109H.FACTURA.NIT_NUM) == 9999) && (parseInt(this.SER109H.FACTURA.FECHA_ING) > 20070930)) {
          saldocopago = parseInt(this.SER109H.FACTURA.COPAGOS_NUM) + abono
        } else {
          if (abono != 0) {
            saldocopago = 0
          } else {
            saldocopago = parseInt(this.SER109H.FACTURA.COPAGOS_NUM);
          }
        }
        let neto = vlr - saldocopago - parseInt(this.SER109H.FACTURA.COPAGOS_NUM);
        impresion.VLRTOTAL = vlr;
        impresion.SALDOCOPAGO = saldocopago;
        impresion.SALDO = neto;
        impresion.PREFIJO = prefijo;
        impresion.COPAGO = parseInt(this.SER109H.FACTURA.COPAGOS_NUM)
        impresion.IMPRESION = 'SER109H';
        impresion.ADMINW = localStorage.getItem('Usuario').trim();
        impresion.FECHAIMPRESION = moment().format('YYMMDD');
        console.log(this.SER109H.FACTURA);
        impresion.FECHAOPER = moment(this.SER109H.FACTURA.FECHA_ING, 'YYYYMMDD').format('YYMMDD');
        if (impresion.FECHAOPER.trim() == 'Fecha inválida') impresion.FECHAOPER = '000000'
        impresion.FECHAMODOPER = moment(this.SER109H.FACTURA.FECHAMOD_NUM, 'YYYYMMDD').format('YYMMDD');
        if (impresion.FECHAMODOPER.trim() == 'Fecha inválida') impresion.FECHAMODOPER = '000000'
        impresion.FECHARETOPER = moment(this.SER109H.FACTURA.FECHA_RET, 'YYYYMMDD').format('YYMMDD');
        if (impresion.FECHARETOPER.trim() == 'Fecha inválida') impresion.FECHARETOPER = '000000'
        let valorenletras = FAC146(impresion.VLRTOTAL);
        impresion.NUMEROENLETRAS = 'SON: ' + valorenletras;
        if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900755133 || $_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900161116 || $_USUA_GLOBAL[0].NIT == 900424844 || $_USUA_GLOBAL[0].NIT == 900870633) {
          impresion.FIRMA1 = localStorage.getItem('IDUSU')
        } else {
          impresion.FIRMA1 = this.SER109H.FIRMAS[0].DATOS_GER.substring(0, 10)
        }
        _impresionformatoSER109(impresion, this._cerrarnumeracion_SER109H, this._evaluarimpresionorig_SER109H)
      }
    },
    _cerrarnumeracion_SER109H() {
      if (this.form.estadofact_SER109H.substring(0, 1) == "0" || "3") {
        if (this.SER109H.PREFIJOW == "A" || this.SER109H.PREFIJOW == "B" || this.SER109H.PREFIJOW == "D" || this.SER109H.PREFIJOW == "F" || this.SER109H.PREFIJOW == "G" || this.SER109H.PREFIJOW == "H" || this.SER109H.PREFIJOW == "I" || this.SER109H.PREFIJOW == "J" || this.SER109H.PREFIJOW == "K") {
          if (this.SER109H.FECHALNK.substring(0, 4) == this.SER109H.FACTURA.FECHA_ING.substring(0, 4) && this.SER109H.FECHALNK.substring(4, 6) == this.SER109H.FACTURA.FECHA_ING.substring(4, 6)) {
            _cerrarnumeracion_VENTANA(_toggleNav, this._evaluarprefijo_SER109H, params = { LLAVE_NUM: `${this.SER109H.PREFIJOW}${this.form.numerofact_SER109H.toString().trim().padStart(6,'0')}` , PREFIJOW: this.SER109H.PREFIJOW , FECHAING_NUM: this.SER109H.FACTURA.FECHA_ING, ESTADOW: this.form.estadofact_SER109H.substring(0,1), FECHALNK: `20${$_USUA_GLOBAL[0].FECHALNK}` });
          } else {
            CON851("3G", "3G", null, "error", "Error");
            _toggleNav();
          }
        } else {
          _cerrarnumeracion_VENTANA(_toggleNav, this._evaluarprefijo_SER109H, params = { LLAVE_NUM: `${this.SER109H.PREFIJOW}${this.form.numerofact_SER109H.toString().trim().padStart(6,'0')}` , PREFIJOW: this.SER109H.PREFIJOW , FECHAING_NUM: this.SER109H.FACTURA.FECHA_ING, ESTADOW: this.form.estadofact_SER109H.substring(0,1), FECHALNK: `20${$_USUA_GLOBAL[0].FECHALNK}` });
        }
      } else {
        _toggleNav();
      }
    },

    _f8paciente_SER109H() {
      $_this = this;
      parametros = {
        dll: "PACIENTES",
        valoresselect: ["Nombre del paciente"],
        f8data: "PACIENTES",
        columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "EPS" }],
        callback: data => {
          $_this.form.paciente_SER109H = data.COD;
          _enterInput(".paciente_SER109H");
        },
        cancel: () => {
          _enterInput(".paciente_SER109H");
        },
      };
      F8LITE(parametros);
    },
    _f8division_SER109H() {
      $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DIVISION FACT",
        columnas: ["CODIGO", "DESCRIP"],
        data: $_this.SER109H.GRCAPITA,
        callback_esc: function () {
          $(".division_SER109H").focus();
        },
        callback: function (data) {
          this.form.division_SER109H = data.COD.trim();
          _enterInput(".division_SER109H");
        },
      });
    },
    _f8tipo1_SER109H() {
      $_this = this;
      _ventanaDatos({
        titulo: "TIPO DE SERVICIO",
        columnas: ["COD", "DESCRIP"],
        data: $_this.SER109H.SERVICIOS,
        callback_esc: function () {
          $(".tipo1_SER109H").focus();
        },
        callback: function (data) {
          $_this.form.tipo1_SER109H = data.COD;
          _enterInput(".tipo1_SER109H");
        },
      });
    },
    _f8tipo2_SER109H() {
      $_this = this;
      _ventanaDatos({
        titulo: "TIPO DE SERVICIO",
        columnas: ["COD", "DESCRIP"],
        data: $_this.SER109H.SERVICIOS,
        callback_esc: function () {
          $(".tipo2_SER109H").focus();
        },
        callback: function (data) {
          $_this.form.tipo2_SER109H = data.COD;
          _enterInput(".tipo2_SER109H");
        },
      });
    },
    _f8tipo3_SER109H() {
      $_this = this;
      _ventanaDatos({
        titulo: "TIPO DE SERVICIO",
        columnas: ["COD", "DESCRIP"],
        data: $_this.SER109H.SERVICIOS,
        callback_esc: function () {
          $(".tipo3_SER109H").focus();
        },
        callback: function (data) {
          $_this.form.tipo3_SER109H = data.COD;
          _enterInput(".tipo3_SER109H");
        },
      });
    },
  },
});

var recibosMask_SER109H = IMask($("#reciboscaja_SER109")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});

var porcentcopagoMask_SER109H = IMask.createPipe({
  mask: Number,
  scale: 2,
  radix: '.',
  normalizeZeros: true,
  padFractionalZeros: true,
});

var originalMask_SER109H = IMask($("#imprimirorig_SER109")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
var fechaserMask_SER109H = IMask($("#fechaxservi_SER109H")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});

var cambiarcupsMask_SER109H = IMask($("#cambiarcups_SER109H")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});

var totalizarpacMask_SER109H = IMask($("#totalizar_SER109H")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});

var medicoMask_SER109H = IMask($("#nommedico_SER109H")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});

var cambiarfechaMask_SER109H = IMask($("#cambiarfecha_SER109H")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
var ordenarfechaMask_SER109H = IMask($("#ordenarfecha_SER109H")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});

var mostrarcomprobanteMask_SER109H = IMask($("#mostrarcomprob_SER109H")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});

var drogueriaMask_SER109H = IMask($("#drogueria_SER109H")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});

var prefijoMask_SER109H = IMask($("#prefijo_SER109H")[0], {
  mask: "a",
  definitions: {
    a: /[APTBDFGHIJKLMNQRSVWXYZ]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});

var bloqueoMask_SER109H = IMask($("#bloquearfactura_SER109H")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
var facturavaciaMask_SER109H = IMask($("#facturavacia_SER109H")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});


