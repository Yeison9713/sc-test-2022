const { regs_dom } = require("../../SERVDOM/scripts/regs_dom.js");
const { _editFecha2 } = require("../../SERVDOM/scripts/globalDom.js");

var _vm = new Vue({
  el: "#PUB201",
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
    fecha_act: moment().format("YYYYMMDD"),
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
    nombreOpcion("2-1 - Generar Facturación");
    _inputControl("reset");
    _inputControl("disabled");
    this.reg_control_w.fecha_exp = this.fecha_act;
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
      this.datoFechaCtl();
    },

    esc_clave() {
      this.params_CLAVE.estado = false;
      this.mostrar_CLAVE = false;
      _toggleNav();
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
        .then((data) => {
          if (data.llave) {
            this.reg_ctl = data;
            CON851("", "ERROR! ESE PERIODO YA ESTA FACTURADO", null, "warning", "");
            this.datoFechaCtl();
          } else {
            this.buscarArchivo();
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

    buscarArchivo() {
      postData({ datosh: moduloDatosEnvio() + this.reg_control_w.llave + "|1|" }, get_url("app/SERVDOM/PUB201_02.DLL"))
        .then((data) => {
          if (data == 8) {
            CON851("", "ERROR! ESE PERIODO YA ESTA FACTURADO", null, "warning", "");
            this.datoFechaCtl();
          } else {
            this.validarAnt();
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

    validarAnt() {
      if ($_USUARIO_EMPRESA.ULT_PER.trim() == 0) {
        this.reg_control_w.per_ant = this.reg_control_w.llave;
        if (this.fecha_per_ant.mes_w == 1) {
          this.fecha_per_ant.mes_w = "12";
          this.fecha_per_ant.ano_w = (parseInt(this.fecha_per_ant.ano_w) - 1).toString();
        } else {
          this.fecha_per_ant.mes_w = (parseInt(this.fecha_per_ant.mes_w) - 1).toString();
        }
        this.datoFechaAnt();
      } else {
        this.reg_control_w.per_ant = $_USUARIO_EMPRESA.ULT_PER;
        this.leerAnt();
      }
    },

    datoFechaAnt() {
      validarInputs(
        {
          form: "#per_ant",
        },
        this.datoFechaCtl,
        () => {
          this.fecha_per_ant.ano_w = this.fecha_per_ant.ano_w.padStart(4, "0");
          this.fecha_per_ant.mes_w = this.fecha_per_ant.mes_w.padStart(2, "0");
          this.reg_control_w.per_ant = `${this.fecha_per_ant.ano_w}${this.fecha_per_ant.mes_w}`;
          if (this.fecha_per_ant.ano_w < 1996) {
            this.datoFechaAnt();
          } else if (this.fecha_per_ant.mes_w < 1 || this.fecha_per_ant.mes_w > 12) {
            this.datoFechaAnt();
          } else this.leerAnt();
        }
      );
    },

    leerAnt() {
      if (this.reg_control_w.per_ant > this.reg_control_w.llave) {
        CON851("", "NO ES UNA FECHA ANTERIOR!", null, "error", "Error");
        this.datoFechaAnt();
      } else {
        loader("show");
        postData(
          { datosh: moduloDatosEnvio() + this.reg_control_w.per_ant + "|2|" },
          get_url("app/SERVDOM/PUB201_01.DLL")
        )
          .then((data) => {
            if (!data.llave) {
              if ($_USUARIO_EMPRESA.ULT_PER.trim() != 0) {
                CON851("", "ERROR! PERIODO ANTERIOR NO EXISTE", null, "error", "Error");
                this.datoFechaAnt();
              } else {
                this.buscarArchivoAnt();
              }
            } else {
              this.reg_ctl = data;
              this.buscarArchivoAnt();
            }
            loader("hide");
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error consultando datos", null, "error", "Error");
            this.datoFechaAnt();
            loader("hide");
          });
      }
    },

    buscarArchivoAnt() {
      postData(
        { datosh: moduloDatosEnvio() + this.reg_control_w.per_ant + "|2|" },
        get_url("app/SERVDOM/PUB201_02.DLL")
      )
        .then((data) => {
          if (data == 7) {
            CON851("", "NO SE PUDO ABRIR ARCHIVO ANTERIOR", null, "error", "");
            this.datoFechaAnt();
          } else {
            this.datoNro();
          }
          loader("hide");
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFechaAnt();
          loader("hide");
        });
    },

    datoNro() {
      if (!this.reg_control_w.nro_ant.trim()) this.reg_control_w.nro_ant = $_USUARIO_EMPRESA.ULT_FACT;
      validarInputs(
        {
          form: "#nro_ant",
        },
        this.datoFechaCtl,
        () => {
          if (parseInt(this.reg_control_w.nro_ant) < parseInt($_USUARIO_EMPRESA.ULT_FACT)) {
            this.datoNro();
          } else {
            this.formarDatoPer();
          }
        }
      );
    },

    async formarDatoPer() {
      if (this.reg_ctl.periodo[2].mes_per > 0) {
        this.reg_control_w.periodo[0] = Object.assign({}, this.reg_ctl.periodo[2]);
      } else if (this.reg_ctl.periodo[1].mes_per > 0) {
        this.reg_control_w.periodo[0] = Object.assign({}, this.reg_ctl.periodo[1]);
      } else if (this.reg_ctl.periodo[0].mes_per > 0) {
        this.reg_control_w.periodo[0] = Object.assign({}, this.reg_ctl.periodo[0]);
      } else {
        this.reg_control_w.periodo[0].ano_per = this.fecha_per_ant.ano_w;
        this.reg_control_w.periodo[0].mes_per = this.fecha_per_ant.mes_w;
      }

      if (this.reg_control_w.periodo[0].mes_per > 11) {
        this.reg_control_w.periodo[0].mes_per = "01";
        this.reg_control_w.periodo[0].ano_per = (parseInt(this.reg_control_w.periodo[0].ano_per) + 1).toString();
      } else {
        this.reg_control_w.periodo[0].mes_per = (parseInt(this.reg_control_w.periodo[0].mes_per) + 1).toString();
      }

      this.reg_control_w.periodo[1] = Object.assign({}, this.reg_control_w.periodo[0]);

      if (this.reg_control_w.periodo[1].mes_per > 11) {
        this.reg_control_w.periodo[1].mes_per = "01";
        this.reg_control_w.periodo[1].ano_per = (parseInt(this.reg_control_w.periodo[1].ano_per) + 1).toString();
      } else {
        this.reg_control_w.periodo[1].mes_per = (parseInt(this.reg_control_w.periodo[1].mes_per) + 1).toString();
      }

      this.reg_control_w.periodo[2] = Object.assign({}, this.reg_control_w.periodo[1]);

      if (this.reg_control_w.periodo[2].mes_per > 11) {
        this.reg_control_w.periodo[2].mes_per = "01";
        this.reg_control_w.periodo[2].ano_per = (parseInt(this.reg_control_w.periodo[2].ano_per) + 1).toString();
      } else {
        this.reg_control_w.periodo[2].mes_per = (parseInt(this.reg_control_w.periodo[2].mes_per) + 1).toString();
      }

      this.datoPer1();
    },

    datoPer1() {
      if (!this.conf_1.trim()) this.conf_1 = "S";
      validarInputs(
        {
          form: "#conf_1",
        },
        this.datoNro,
        () => {
          this.conf_1 = this.conf_1.toUpperCase();
          if (this.conf_1 == "S") {
            this.indice = 1;
            this.buscarTarifa();
          } else this.datoPer1();
        }
      );
    },

    datoPer2() {
      if (!this.conf_2.trim()) this.conf_2 = "N";
      validarInputs(
        {
          form: "#conf_2",
        },
        this.datoPer1,
        () => {
          this.conf_2 = this.conf_2.toUpperCase();
          if (this.conf_2 != "S") this.conf_2 = "N";
          if (this.conf_2 == "S") {
            this.indice = 2;
            this.buscarTarifa();
          } else {
            this.tabla_fact_w.splice(5, 20);
            this.datoMensaje1();
          }
        }
      );
    },

    datoPer3() {
      if (!this.conf_3.trim()) this.conf_3 = "N";
      validarInputs(
        {
          form: "#conf_3",
        },
        this.datoPer2,
        () => {
          this.conf_3 = this.conf_3.toUpperCase();
          if (this.conf_3 != "S") this.conf_3 = "N";
          if (this.conf_3 == "S") {
            this.indice = 3;
            this.buscarTarifa();
          } else {
            this.tabla_fact_w.splice(10, 20);
            this.datoMensaje1();
          }
        }
      );
    },

    buscarTarifa() {
      loader("show");
      let periodo = `${this.reg_control_w.periodo[parseInt(this.indice) - 1].ano_per}${this.reg_control_w.periodo[
        parseInt(this.indice) - 1
      ].mes_per.padStart(2, "0")}`;

      console.log(periodo, "periodo");
      postData({ datosh: moduloDatosEnvio() + periodo + "|" }, get_url("app/SERVDOM/PUB201_03.DLL"))
        .then(async (data) => {
          tabla = data.TABLA;

          this.limpiarTabla();

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

          this.indice += 1;
          this.regresarDato();

          loader("hide");
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          this[`datoPer${this.indice}`]();
        });
    },

    regresarDato() {
      switch (this.indice) {
        case 1:
          this.datoPer1();
          break;
        case 2:
          this.datoPer2();
          break;
        case 3:
          this.datoPer3();
          break;
        default:
          this.datoMensaje1();
          break;
      }
    },

    limpiarTabla() {
      switch (this.indice) {
        case 1:
          this.tabla_fact_w = [];
          break;
        case 2:
          this.tabla_fact_w.splice(5, 20);
          break;
        case 3:
          this.tabla_fact_w.splice(10, 20);
          break;
      }
    },

    datoMensaje1() {
      validarInputs(
        {
          form: "#mensaje1",
        },
        this.datoNro,
        () => {
          this.reg_control_w.mensaje1 = this.reg_control_w.mensaje1.replaceEsp();
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
          this.reg_control_w.mensaje2 = this.reg_control_w.mensaje2.replaceEsp();
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
          this.reg_control_w.mensaje3 = this.reg_control_w.mensaje3.replaceEsp();
          this.datoVence("1");
        }
      );
    },

    datoVence(orden) {
      if (!this.fecha_vence.ano_w.trim()) {
        this.fecha_vence.ano_w = this.fecha_ctl.ano_w;
        this.fecha_vence.mes_w = this.fecha_ctl.mes_w;
      }
      validarInputs(
        {
          form: "#fecha_vence",
          orden: orden,
        },
        this.datoMensaje3,
        () => {
          this.fecha_vence.ano_w = this.fecha_vence.ano_w.padStart(4, "0");
          this.fecha_vence.mes_w = this.fecha_vence.mes_w.padStart(2, "0");
          this.fecha_vence.dia_w = this.fecha_vence.dia_w.padStart(2, "0");
          this.reg_control_w.fecha_vence = `${this.fecha_vence.ano_w}${this.fecha_vence.mes_w}${this.fecha_vence.dia_w}`;

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
          if (!this.fecha_vence2.ano_w.trim() || this.fecha_vence2.ano_w == 0) {
            this.fecha_vence2.ano_w = "";
            this.fecha_vence2.mes_w = "";
            this.fecha_vence2.dia_w = "";
            this.reg_control_w.recargo = "";
            this.datoInteres();
          } else {
            this.fecha_vence2.ano_w = this.fecha_vence2.ano_w.padStart(4, "0");
            this.fecha_vence2.mes_w = this.fecha_vence2.mes_w.padStart(2, "0");
            this.fecha_vence2.dia_w = this.fecha_vence2.dia_w.padStart(2, "0");
            this.reg_control_w.fecha_vence2 = `${this.fecha_vence2.ano_w}${this.fecha_vence2.mes_w}${this.fecha_vence2.dia_w}`;

            if (this.fecha_vence2.mes_w < 1 || this.fecha_vence2.mes_w > 12) {
              CON851("", "37", null, "error", "Error");
              this.datoVence2("2");
            } else if (this.fecha_vence2.dia_w < 1 || this.fecha_vence2.dia_w > 31) {
              CON851("", "37", null, "error", "Error");
              this.datoVence2("3");
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
          this.datoVence2("3");
        },
        () => {
          this.datoInteres();
        }
      );
    },

    datoInteres() {
      validarInputs(
        {
          form: "#int",
        },
        this.datoRecargo,
        () => {
          Vue.set(this.reg_control_w, "int", this.mascara5.resolve(this.reg_control_w.int));
          this.datoIntRefinanc();
        }
      );
    },

    datoIntRefinanc() {
      validarInputs(
        {
          form: "#int_ref",
        },
        this.datoInteres,
        () => {
          Vue.set(this.reg_control_w, "int_ref", this.mascara5.resolve(this.reg_control_w.int_ref));
          this.confirmar();
        }
      );
    },

    confirmar() {
      CON851P("01", this.datoMensaje1, this.grabar);
    },

    async grabar() {
      loader("show");

      // Se eliminan fechas de periodos si seleccion es N - David.M
      if(this.conf_2 == "N") {
        this.reg_control_w.periodo[1].ano_per = "";
        this.reg_control_w.periodo[1].mes_per = "";
        this.reg_control_w.periodo[2].ano_per = "";
        this.reg_control_w.periodo[2].mes_per = "";
      } else if(this.conf_3 == "N") {
        this.reg_control_w.periodo[2].ano_per = "";
        this.reg_control_w.periodo[2].mes_per = "";
      }

      let datos = _getObjetoSave(this.reg_control_w, ["periodo"]);

      datos = {
        ...datos,
        datosh: moduloDatosEnvio() + localStorage.Usuario + "|",
      };

      postData(datos, get_url("app/SERVDOM/PUB201.DLL"))
        .then((data) => {
          CON851("", "Guardado con éxito", null, "success", "");
          this.llamar_PUB201P(data);
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error en guardado", null, "error", "");
          loader("hide");
          this.datoIntRefinanc();
        });
    },

    llamar_PUB201P(per_ant) {
      postData({ datosh: moduloDatosEnvio() + per_ant }, get_url("app/SERVDOM/PUB201P.DLL"))
        .then((data) => {
          CON851("", "Guardado con éxito", null, "success", "");
          console.log(data);
          loader("hide");
          this.llamar_PUB201A();
        })
        .catch((error) => {
          if(error.STATUS) this.llamar_PUB201A();
          else {
            console.error(error);
            CON851("", "Error generando facturación", null, "error", "");
            loader("hide");
            this.datoIntRefinanc();
          }
        });
    },

    llamar_PUB201A() {
      loader("show");
      postData({ datosh: moduloDatosEnvio() + this.reg_control_w.llave }, get_url("app/SERVDOM/PUB201A.DLL"))
        .then((data) => {
          console.log(data);
          CON851("", "Facturación generada correctamente", null, "success", "");
          loader("hide");
          _toggleNav();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error generando facturación", null, "error", "");
          loader("hide");
          _toggleNav();
        });
    },
  },
});
