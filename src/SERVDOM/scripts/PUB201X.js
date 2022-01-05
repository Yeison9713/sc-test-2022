const { regs_dom } = require("../../SERVDOM/scripts/regs_dom.js");

new Vue({
  el: "#PUB201X",
  data: {
    params_CLAVE: {
      estado: false,
    },
    mostrar_CLAVE: false,

    novedad: "",
    reg_ctl: regs_dom.CONTROL(),
    fecha_act: moment().format("YYYYMMDD"),
    mod_edit: "",
    cre_edit: "",
  },
  created() {
    nombreOpcion("6-6 - Actualización Datos Última Facturación");
    _inputControl("reset");
    _inputControl("disabled");
    this.datoClave();
  },
  components: {
    clave: require("../../SERVDOM/scripts/clave.vue"),
  },
  computed: {
    fecha_ctl() {
      return _getObjectDate(this.reg_ctl.llave);
    },
    fecha_vence() {
      return _getObjectDate(this.reg_ctl.fecha_vence);
    },
    fecha_vence2() {
      return _getObjectDate(this.reg_ctl.fecha_vence2);
    },
    fecha_exp() {
      return _getObjectDate(this.reg_ctl.fecha_exp);
    },
    fecha_vence3() {
      return _getObjectDate(this.reg_ctl.fecha_vence3);
    },
  },
  methods: {
    datoClave() {
      this.mostrar_CLAVE = true;
      setTimeout(() => {
        this.params_CLAVE.estado = true;
      }, 300);
    },

    callback_clave() {
      this.params_CLAVE.estado = false;
      this.mostrar_CLAVE = false;
      this._ventanaNovedad();
    },

    esc_clave() {
      this.params_CLAVE.estado = false;
      this.mostrar_CLAVE = false;
      _toggleNav();
    },

    _ventanaNovedad() {
      CON850((data) => {
        this.novedad = data.id;
        if (this.novedad == "F") _toggleNav();
        else {
          setTimeout(() => {
            this.datoFechaCtl();
          }, 300);
        }
      });
    },

    datoFechaCtl() {
      validarInputs(
        {
          form: "#llave_ctl",
        },
        this._ventanaNovedad,
        () => {
          this.fecha_ctl.ano_w = this.fecha_ctl.ano_w.padStart(4, "0");
          this.fecha_ctl.mes_w = this.fecha_ctl.mes_w.padStart(2, "0");
          this.reg_ctl.llave = `${this.fecha_ctl.ano_w}${this.fecha_ctl.mes_w}`;
          if (this.fecha_ctl.ano_w < 1990) {
            this.datoFechaCtl();
          } else if (this.fecha_ctl.mes_w < 1 || this.fecha_ctl.mes_w > 12) {
            this.datoFechaCtl();
          } else this.leerCtl();
        }
      );
    },

    leerCtl() {
      loader("show");
      postData({ datosh: moduloDatosEnvio() + this.reg_ctl.llave + "|1|" }, get_url("app/SERVDOM/PUB201_01.DLL"))
        .then((data) => {
          loader("hide");
          if (data.llave) {
            this.reg_ctl = Object.assign({}, data);
            this.cre_edit = `${this.reg_ctl.oper_cre} - ${this.reg_ctl.fecha_cre}`;
            this.mod_edit = `${this.reg_ctl.oper_mod} - ${this.reg_ctl.fecha_mod}`;
          }
          let sw_invalid = data.llave ? 0 : 1;
          switch (this.novedad) {
            case "7":
              if (sw_invalid == 1) this.datoNroInicial();
              else {
                CON851("", "00", null, "error", "Error");
                this.datoFechaCtl();
              }
              break;
            case "8":
              if (sw_invalid == 0) this.datoCambio();
              else {
                CON851("", "01", null, "error", "Error");
                this.datoFechaCtl();
              }
              break;
            case "9":
              if (sw_invalid == 0) this.datoRetiro();
              else {
                CON851("", "01", null, "error", "Error");
                this.datoFechaCtl();
              }
              break;
          }
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFechaCtl();
          loader("hide");
        });
    },

    datoCambio() {
      this.datoNroInicial();
    },

    datoNroInicial() {
      validarInputs(
        {
          form: "#nro_ant",
        },
        this._ventanaNovedad,
        () => {
          this.datoNroFinal();
        }
      );
    },

    datoNroFinal() {
      validarInputs(
        {
          form: "#nro_fin",
        },
        this.datoNroInicial,
        () => {
          this.datoPeriodo1();
        }
      );
    },

    datoPeriodo1() {
      validarInputs(
        {
          form: "#periodo_1",
        },
        this.datoNroFinal,
        () => {
          this.reg_ctl.periodo[0].ano_per = this.reg_ctl.periodo[0].ano_per.padStart(4, "0");
          this.reg_ctl.periodo[0].mes_per = this.reg_ctl.periodo[0].mes_per.padStart(2, "0");
          if (this.reg_ctl.periodo[0].ano_per < 1990) {
            this.datoPeriodo1();
          } else if (this.reg_ctl.periodo[0].mes_per < 1 || this.reg_ctl.periodo[0].mes_per > 12) {
            this.datoPeriodo1();
          } else this.datoPeriodo2();
        }
      );
    },

    datoPeriodo2() {
      validarInputs(
        {
          form: "#periodo_2",
        },
        this.datoPeriodo1,
        () => {
          this.reg_ctl.periodo[1].ano_per = this.reg_ctl.periodo[1].ano_per.padStart(4, "0");
          this.reg_ctl.periodo[1].mes_per = this.reg_ctl.periodo[1].mes_per.padStart(2, "0");

          if (this.reg_ctl.periodo[1].ano_per == 0) {
            this.reg_ctl.periodo[1].ano_per = "";
            this.reg_ctl.periodo[1].mes_per = "";
            this.reg_ctl.periodo[2].ano_per = "";
            this.reg_ctl.periodo[2].mes_per = "";
            this.datoVence("1");
          } else if (
            this.reg_ctl.periodo[1].ano_per > 0 &&
            this.reg_ctl.periodo[1].ano_per < this.reg_ctl.periodo[0].ano_per
          ) {
            this.datoPeriodo2();
          } else if (this.reg_ctl.periodo[1].ano_per < 1990) {
            this.datoPeriodo2();
          } else if (this.reg_ctl.periodo[1].mes_per < 1 || this.reg_ctl.periodo[1].mes_per > 12) {
            this.datoPeriodo2();
          } else this.datoPeriodo3();
        }
      );
    },

    datoPeriodo3() {
      validarInputs(
        {
          form: "#periodo_3",
        },
        this.datoPeriodo2,
        () => {
          this.reg_ctl.periodo[2].ano_per = this.reg_ctl.periodo[2].ano_per.padStart(4, "0");
          this.reg_ctl.periodo[2].mes_per = this.reg_ctl.periodo[2].mes_per.padStart(2, "0");
          let periodo1 = `${this.reg_ctl.periodo[0].ano_per}${this.reg_ctl.periodo[0].mes_per}`;
          let periodo2 = `${this.reg_ctl.periodo[1].ano_per}${this.reg_ctl.periodo[1].mes_per}`;
          let periodo3 = `${this.reg_ctl.periodo[2].ano_per}${this.reg_ctl.periodo[2].mes_per}`;

          if (this.reg_ctl.periodo[2].ano_per == 0) {
            this.reg_ctl.periodo[2].ano_per = "";
            this.reg_ctl.periodo[2].mes_per = "";
            this.datoVence("1");
          } else if (
            this.reg_ctl.periodo[1].ano_per > 0 &&
            this.reg_ctl.periodo[1].ano_per < this.reg_ctl.periodo[0].ano_per
          ) {
            this.datoPeriodo3();
          } else if (parseInt(periodo3) < parseInt(periodo2)) {
            this.datoPeriodo3();
          } else if (this.reg_ctl.periodo[1].ano_per < 1990) {
            this.datoPeriodo3();
          } else if (this.reg_ctl.periodo[1].mes_per < 1 || this.reg_ctl.periodo[1].mes_per > 12) {
            this.datoPeriodo3();
          } else this.datoVence("1");
        }
      );
    },

    datoVence(orden) {
      if (!this.fecha_vence.ano_w.trim()) {
        this.fecha_vence.ano_w = this.fecha_ctl.ano_w;
        this.fecha_vence.mes_w = this.fecha_ctl.mes_w;
        this.fecha_vence.dia_w = this.fecha_act.slice(6);
      }
      validarInputs(
        {
          form: "#fecha_vence",
          orden: orden,
        },
        this.datoPeriodo3,
        () => {
          this.fecha_vence.ano_w = this.fecha_vence.ano_w.padStart(4, "0");
          this.fecha_vence.mes_w = this.fecha_vence.mes_w.padStart(2, "0");
          this.fecha_vence.dia_w = this.fecha_vence.dia_w.padStart(2, "0");
          this.reg_ctl.fecha_vence = `${this.fecha_vence.ano_w}${this.fecha_vence.mes_w}${this.fecha_vence.dia_w}`;

          if (this.fecha_vence.ano_w == 0) {
            this.reg_ctl.fecha_vence = "00000000";
            this.datoVence2("1");
          } else {
            if (this.fecha_vence.mes_w < 1 || this.fecha_vence.mes_w > 12) {
              CON851("", "37", null, "error", "Error");
              this.datoVence("2");
            } else if (this.fecha_vence.dia_w < 1 || this.fecha_vence.dia_w > 31) {
              CON851("", "37", null, "error", "Error");
              this.datoVence("3");
            } else {
              this.datoVence2("1");
            }
          }
        }
      );
    },

    datoVence2(orden) {
      validarInputs(
        {
          form: "#fecha_vence2",
          orden: orden,
        },
        () => {
          this.datoVence("3");
        },
        () => {
          this.fecha_vence2.ano_w = this.fecha_vence2.ano_w.padStart(4, "0");
          this.fecha_vence2.mes_w = this.fecha_vence2.mes_w.padStart(2, "0");
          this.fecha_vence2.dia_w = this.fecha_vence2.dia_w.padStart(2, "0");
          this.reg_ctl.fecha_vence2 = `${this.fecha_vence2.ano_w}${this.fecha_vence2.mes_w}${this.fecha_vence2.dia_w}`;

          if (this.fecha_vence2.ano_w == 0) {
            this.reg_ctl.fecha_vence2 = "00000000";
            this.datoExped("1");
          } else {
            if (this.fecha_vence2.mes_w < 1 || this.fecha_vence2.mes_w > 12) {
              CON851("", "37", null, "error", "Error");
              this.datoVence2("2");
            } else if (this.fecha_vence2.dia_w < 1 || this.fecha_vence2.dia_w > 31) {
              CON851("", "37", null, "error", "Error");
              this.datoVence2("3");
            } else {
              this.datoExped("1");
            }
          }
        }
      );
    },

    datoExped(orden) {
      validarInputs(
        {
          form: "#fecha_exp",
          orden: orden,
        },
        () => {
          this.datoVence2("3");
        },
        () => {
          this.fecha_exp.ano_w = this.fecha_exp.ano_w.padStart(4, "0");
          this.fecha_exp.mes_w = this.fecha_exp.mes_w.padStart(2, "0");
          this.fecha_exp.dia_w = this.fecha_exp.dia_w.padStart(2, "0");
          this.reg_ctl.fecha_exp = `${this.fecha_exp.ano_w}${this.fecha_exp.mes_w}${this.fecha_exp.dia_w}`;

          if (this.fecha_exp.ano_w == 0) {
            this.reg_ctl.fecha_exp = "00000000";
            this.datoRecargo();
          } else {
            if (this.fecha_exp.mes_w < 1 || this.fecha_exp.mes_w > 12) {
              CON851("", "37", null, "error", "Error");
              this.datoExped("2");
            } else if (this.fecha_exp.dia_w < 1 || this.fecha_exp.dia_w > 31) {
              CON851("", "37", null, "error", "Error");
              this.datoExped("3");
            } else {
              this.datoRecargo();
            }
          }
        }
      );
    },

    datoRecargo() {
      validarInputs(
        {
          form: "#recargo",
        },
        () => {
          this.datoExped("3");
        },
        () => {
          this.datoMensaje1();
        }
      );
    },

    datoMensaje1() {
      validarInputs(
        {
          form: "#mensaje1",
        },
        this.datoRecargo,
        () => {
          this.reg_ctl.mensaje1 = this.reg_ctl.mensaje1.replaceEsp();
          this.datoMensaje2();
        }
      );
    },

    datoMensaje2() {
      validarInputs(
        {
          form: "#mensaje2",
        },
        this.datoMensaje1,
        () => {
          this.reg_ctl.mensaje2 = this.reg_ctl.mensaje2.replaceEsp();
          this.datoMensaje3();
        }
      );
    },

    datoMensaje3() {
      validarInputs(
        {
          form: "#mensaje3",
        },
        this.datoMensaje2,
        () => {
          this.reg_ctl.mensaje3 = this.reg_ctl.mensaje3.replaceEsp();
          this.confirmar();
        }
      );
    },

    confirmar() {
      CON851P("01", this.datoMensaje1, this.grabar);
    },

    grabar() {
      loader("show");

      let datos = _getObjetoSave(this.reg_ctl, ["periodo"]);

      datos = {
        ...datos,
        datosh: moduloDatosEnvio() + localStorage.Usuario + "|2|",
        novedad: this.novedad,
      };

      postData(datos, get_url("app/SERVDOM/PUB201.DLL"))
        .then((data) => {
          switch (parseInt(data)) {
            case 7:
              CON851("", "Guardado correctamente", null, "success", "");
              break;
            case 8:
              CON851("", "Modificado correctamente", null, "success", "");
              break;
            case 9:
              CON851("", "Eliminado correctamente", null, "success", "");
              break;
          }
          loader("hide");
          _toggleNav();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error en guardado", null, "error", "");
          loader("hide");
          this.datoMensaje1();
        });
    },

    datoRetiro() {
      CON851P("Desea anular el registro?", this._ventanaNovedad, () => {
        this.grabar();
      });
    },
  },
});
