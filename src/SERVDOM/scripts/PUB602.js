const { regs_dom } = require("../../SERVDOM/scripts/regs_dom.js");
const { _editFecha2 } = require("../../SERVDOM/scripts/globalDom.js");

new Vue({
  el: "#PUB602",
  data: {
    params_CLAVE: {
      estado: false,
    },
    mostrar_CLAVE: false,

    reg_control_w: regs_dom.CONTROL(),
    reg_ctl: regs_dom.CONTROL(),
    conf_1: "",
    conf_2: "",
    conf_3: "",
    indice: 0,
    titulos_tabla: ["EST", "", "", "", "", "", ""],
    tabla_fact_w: [],
    fecha_act_edit: moment().format("YYYY-MM-DD"),
    mascara5: IMask.createMask({
      mask: Number,
      thousandsSeparator: ",",
      radix: ".",
      padFractionalZeros: true,
      signed: false,
      scale: 2,
      min: -9.99,
      max: 99.99,
    }),
    mascara11: IMask.createMask({
      mask: Number,
      thousandsSeparator: ",",
      radix: ".",
      padFractionalZeros: true,
      signed: false,
      scale: 2,
      min: -9999999.99,
      max: 99999999.99,
    }),
  },
  created() {
    nombreOpcion("6-2 - Anular Facturación");
    _inputControl("reset");
    _inputControl("disabled");
    this.datoClave();
  },
  components: {
    clave: require("../../SERVDOM/scripts/clave.vue"),
  },
  computed: {
    fecha_ctl() {
      return _getObjectDate(this.reg_control_w.llave);
    },
    fecha_per_ant() {
      return _getObjectDate(this.reg_control_w.per_ant);
    },
    fecha_vence() {
      return _getObjectDate(this.reg_control_w.fecha_vence);
    },
    fecha_vence2() {
      return _getObjectDate(this.reg_control_w.fecha_vence2);
    },
    fecha_exp_edit() {
      return _editFecha2(this.reg_control_w.fecha_exp);
    },
    fecha_vence3() {
      return _getObjectDate(this.reg_control_w.fecha_vence3);
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
      this.alerta();
    },

    esc_clave() {
      this.params_CLAVE.estado = false;
      this.mostrar_CLAVE = false;
      _toggleNav();
    },

    alerta() {
      jAlert(
        {
          titulo: "ATENCIÓN",
          mensaje: `Se dispone a borrar, asegurese de tener una copia de seguridad`,
        },
        () => {
          setTimeout(() => {
            CON851P("04", _toggleNav, this.datoFechaCtl);
          }, 300);
        }
      );
    },

    datoFechaCtl() {
      validarInputs(
        {
          form: "#llave_ctl",
        },
        _toggleNav,
        () => {
          this.fecha_ctl.ano_w = this.fecha_ctl.ano_w.padStart(4, "0");
          this.fecha_ctl.mes_w = this.fecha_ctl.mes_w.padStart(2, "0");
          this.reg_control_w.llave = `${this.fecha_ctl.ano_w}${this.fecha_ctl.mes_w}`;
          if (this.fecha_ctl.ano_w < 1996) {
            this.datoFechaCtl();
          } else if (this.fecha_ctl.mes_w < 1 || this.fecha_ctl.mes_w > 12) {
            this.datoFechaCtl();
          } else this.leerCtl();
        }
      );
    },

    leerCtl() {
      loader("show");
      postData({ datosh: moduloDatosEnvio() + this.reg_control_w.llave + "|1|" }, get_url("app/SERVDOM/PUB201_01.DLL"))
        .then(async (data) => {
          if (!data.llave) {
            CON851("", "08", null, "error", "");
            this.datoFechaCtl();
          } else {
            this.reg_control_w = data;
            await this.mostrarConfig();
            this.buscarPagos();
          }
          loader("hide");
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFechaCtl();
          loader("hide");
        });
    },

    buscarPagos() {
      console.log("BUSCAR PAGOS");
      let llave_pago = `${this.reg_control_w.llave.slice(0, 4)}${this.reg_control_w.llave.slice(4)}`;
      postData({ datosh: moduloDatosEnvio() + llave_pago + "|3|" }, get_url("app/SERVDOM/PUB601_01.DLL"))
        .then((data) => {
          if (data == 8) CON851("", "16", null, "warning", "");
          this.confirmar();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFechaCtl();
        });
    },

    mostrarConfig() {
      return new Promise(async (resolve) => {
        this.reg_control_w.periodo.forEach(async (el, index) => {
          loader("show");
          await this.buscarTarifa(el, index);

          if (parseInt(index) + 1 == this.reg_control_w.periodo.length) {
            resolve();
            console.log("TERMINA");
            loader("hide");
          }
        });
      });
    },

    buscarTarifa(el, index) {
      if (index == 1) console.log("INDEX", index);
      return new Promise((resolve) => {
        let periodo = `${el.ano_per}${el.mes_per.padStart(2, "0")}`;

        console.log(periodo, "periodo");

        if (periodo > 0) {
          postData({ datosh: moduloDatosEnvio() + periodo + "|" }, get_url("app/SERVDOM/PUB201_03.DLL"))
            .then(async (data) => {
              tabla = data.TABLA;

              for (let r = 0; r < 4; r++) {
                let fila = {};
                for (let i = 1; i < 7; i++) {
                  if (r == 0) {
                    // titulos tabla
                    Vue.set(this.titulos_tabla, i, tabla[parseInt(i) - 1][`COL${i}`][r].descrip_serpq);
                  }

                  // contenido tabla LLAVE-TAR
                  if (i == 1) {
                    Vue.set(fila, "est", tabla[parseInt(i) - 1][`COL${i}`][r].cod_tarifa_tar);
                  } else {
                    if (tabla[parseInt(i) - 1][`COL${i}`][r].cod_tarifa_tar.trim()) {
                      Vue.set(fila, "est", tabla[parseInt(i) - 1][`COL${i}`][r].cod_tarifa_tar);
                    }
                  }

                  // contenido tabla
                  let neto = this.mascara11.resolve(tabla[parseInt(i) - 1][`COL${i}`][r].neto_tar);
                  Vue.set(fila, `col${i}`, neto);
                }
                this.tabla_fact_w.push(fila);
              }

              let fila_vacia = {
                est: "",
                col1: "",
                col2: "",
                col3: "",
                col4: "",
                col5: "",
                col6: "",
              };
              this.tabla_fact_w.push(fila_vacia);

              resolve();
            })
            .catch((error) => {
              loader("hide");
              console.error(error);
              if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "Error");
              resolve();
            });
        } else {
          resolve();
        }
      });
    },

    confirmar() {
      CON851P("02", this.datoFechaCtl, this.llamarDLL);
    },

    llamarDLL() {
      loader("show");
      postData({ datosh: moduloDatosEnvio() + this.reg_control_w.llave + "|" }, get_url("app/SERVDOM/PUB602.DLL"))
        .then((data) => {
          console.log(data);
          CON851("", "Anulado correctamente", null, "success", "");
          loader("hide");
          _toggleNav();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFechaCtl();
          loader("hide");
        });
    },
  },
});
