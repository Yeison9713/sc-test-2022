const { regs_dom } = require("../../SERVDOM/scripts/regs_dom.js");
const { mascara_valor, format_op, _ventana_PUB801 } = require("../../SERVDOM/scripts/globalDom.js");

new Vue({
  el: "#PUB206",
  data: {
    params_CLAVE: {
      estado: false,
    },
    mostrar_CLAVE: false,

    nom_fac: "",
    novedad: "",
    llave_abo: "",
    reg_abo: regs_dom.ABONOS(),
    reg_fact: regs_dom.FACT(),
    reg_usuar_ser: {},
    array_serv: [],
    array_tarifas: [],
    nombre_cat: "",
    fecha_act: moment().format("YYYYMMDD"),
    cargos_w: "",
    total_abonos_w: "",
    saldo_w: "",
    ajuste_w: "",
    tabla_serv_w: [
      {
        abo_serv_w: "",
        tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
      },
      {
        abo_serv_w: "",
        tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
      },
      {
        abo_serv_w: "",
        tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
      },
      {
        abo_serv_w: "",
        tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
      },
      {
        abo_serv_w: "",
        tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
      },
      {
        abo_serv_w: "",
        tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
      },
    ],
  },
  created() {
    nombreOpcion("2-6 - Liquidación de Abonos Parciales");
    _inputControl("reset");
    _inputControl("disabled");
    this.datoClave();
  },
  components: {
    clave: require("../../SERVDOM/scripts/clave.vue"),
  },
  computed: {
    descripciones_serv() {
      let descripciones = {};

      for (let i = 0; i < 5; i++) {
        let busqueda = this.array_serv.find((e) => e.cod == parseInt(i) + 1);

        if (busqueda) {
          busqueda = JSON.parse(JSON.stringify(busqueda));
          busqueda.descrip = busqueda.descrip.split(" ");
        }

        descripciones[`descrip_${i}`] = busqueda ? busqueda.descrip[0] : "";
      }

      return descripciones;
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
      loader("show");
      this.traerServicios();
    },

    esc_clave() {
      this.params_CLAVE.estado = false;
      this.mostrar_CLAVE = false;
      _toggleNav();
    },

    abrirArchivo() {
      this.nom_fac = `${$_USUARIO_EMPRESA.ULT_PER.slice(0, 4)}${$_USUARIO_EMPRESA.ULT_PER.slice(4)}`;
      loader("hide");
      this.datoFechaArchivo();
    },

    datoFechaArchivo() {
      validarInputs(
        {
          form: "#fecha_gen",
        },
        _toggleNav,
        () => {
          this.reg_abo.fecha_gen.ano_gen = this.reg_abo.fecha_gen.ano_gen.padStart(4, "0");
          this.reg_abo.fecha_gen.mes_gen = this.reg_abo.fecha_gen.mes_gen.padStart(2, "0");
          this.leerArchivo();
        }
      );
    },

    leerArchivo() {
      this.nom_fac = `${this.reg_abo.fecha_gen.ano_gen}${this.reg_abo.fecha_gen.mes_gen}`;
      loader("show");
      postData({ datosh: moduloDatosEnvio() + this.nom_fac + "|1|" }, get_url("app/SERVDOM/PUB201_02.DLL"))
        .then((data) => {
          if (data == 8) this.leerCtl();
          else {
            CON851("", "No existe el archivo", null, "error", "");
            this.datoFechaArchivo();
          }
          loader("hide");
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFechaArchivo();
          loader("hide");
        });
    },

    leerCtl() {
      loader("show");
      postData({ datosh: moduloDatosEnvio() + this.nom_fac + "|1|" }, get_url("app/SERVDOM/PUB201_01.DLL"))
        .then((data) => {
          if (data.llave && data.llave != 0) this.reg_ctl = data;
          else this.reg_ctl = regs_dom.CONTROL();

          loader("hide");
          this._ventanaNovedad();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFechaCtl();
          loader("hide");
        });
    },

    _ventanaNovedad() {
      CON850((data) => {
        this.novedad = data.id;
        if (this.novedad == "F") _toggleNav();
        else if (this.novedad == "7" || this.novedad == "8") {
          this.datoFact();
        } else this._ventanaNovedad();
      });
    },

    datoFact() {
      validarInputs(
        {
          form: "#llave",
        },
        this._ventanaNovedad,
        () => {
          this.reg_abo.fact = this.reg_fact.llave;
          this.leerFact();
        }
      );
    },

    leerFact() {
      loader("show");
      postData(
        {
          datosh: moduloDatosEnvio() + "1|",
          fecha: this.nom_fac,
          nro_fac: this.reg_fact.llave,
        },
        get_url("app/SERVDOM/PUB203_02.DLL")
      )
        .then((data) => {
          loader("hide");

          if (data.llave == 0) data.llave = "";

          if (!data.llave.trim()) {
            CON851("", "01", null, "error", "Error");
            this.datoFact();
          } else {
            this.reg_fact = Object.assign({}, data);
            this.inicializarVariables();

            this.consultaFechaAbono();
          }
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    async consultaFechaAbono() {
      if (this.novedad == "8" || this.novedad == "9") {
        await this.buscarFecha();
      } else {
        if (!this.reg_abo.fecha.mes.trim()) {
          this.reg_abo.fecha.ano = this.fecha_act.slice(0, 4);
          this.reg_abo.fecha.mes = this.fecha_act.slice(4, 6);
          this.reg_abo.fecha.dia = this.fecha_act.slice(6);
        }
      }

      this.datoFechaAbono("1");
    },

    datoFechaAbono(orden) {
      validarInputs(
        {
          form: "#fecha_abo",
          orden: orden,
        },
        this.datoFact,
        () => {
          this.reg_abo.fecha.ano = this.reg_abo.fecha.ano.padStart(4, "0");
          this.reg_abo.fecha.mes = this.reg_abo.fecha.mes.padStart(2, "0");
          this.reg_abo.fecha.dia = this.reg_abo.fecha.dia.padStart(2, "0");
          if (parseInt(this.reg_abo.fecha.ano) < parseInt(this.nom_fac.slice(0, 4))) {
            this.datoFechaAbono("1");
          } else if (this.reg_abo.fecha.mes < 1 || this.reg_abo.fecha.mes > 12) {
            this.datoFechaAbono("2");
          } else if (this.reg_abo.fecha.dia < 1 || this.reg_abo.fecha.dia > 31) {
            this.datoFechaAbono("3");
          } else this.leerAbono();
        }
      );
    },

    leerAbono() {
      loader("show");

      this.llave_abo = `${this.reg_abo.fecha_gen.ano_gen}${this.reg_abo.fecha_gen.mes_gen}${this.reg_abo.fact.padStart(
        9,
        "0"
      )}${this.reg_abo.fecha.ano}${this.reg_abo.fecha.mes}${this.reg_abo.fecha.dia}`;

      postData(
        {
          datosh: moduloDatosEnvio() + "1|",
          llave_abo: this.llave_abo,
        },
        get_url("app/SERVDOM/PUB206_01.DLL")
      )
        .then((data) => {
          loader("hide");

          switch (this.novedad) {
            case "7":
              if (!data.fact) this.nuevo();
              else {
                CON851("", "00", null, "error", "Error");
                this.datoFact();
              }
              break;
            case "8":
              if (data.fact) this.cambio(data);
              else {
                CON851("", "01", null, "error", "Error");
                this.datoFact();
              }
              break;
          }
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFechaAbono("3");
        });
    },

    async cambio(data) {
      this.reg_abo = data;
      await this.mostrarDatos();
      this.datoRecargo();
    },

    async nuevo() {
      await this.mostrarUsuario();
      await this.total();
      this.datoRecargo();
    },

    datoRecargo() {
      let fecha_abo = `${this.reg_abo.fecha.ano}${this.reg_abo.fecha.mes}${this.reg_abo.fecha.dia}`;
      if (this.reg_ctl.recargo > 0 && fecha_abo > this.reg_ctl.fecha_vence) {
        this.reg_abo.tabla.recargo = this.reg_ctl.recargo;
      } else this.reg_abo.tabla.recargo = "";

      this.datoAbono();
    },

    datoAbono() {
      validarInputs(
        {
          form: "#vlr_abo",
        },
        this.datoFact,
        () => {
          if (format_op(this.reg_abo.tabla.vlr_abo) > format_op(this.saldo_w)) CON851("", "07", null, "error", "Error");

          this.reg_abo.tabla.vlr_abo = mascara_valor.resolve(this.reg_abo.tabla.vlr_abo.toString());

          this.factor_w =
            (format_op(this.reg_abo.tabla.vlr_abo) - format_op(this.reg_abo.tabla.recargo)) / format_op(this.saldo_w);

          let vlr_tmp = 0;

          vlr_tmp = Math.round(
            (format_op(this.tabla_serv_w[0].tabla_tot_w[1].tot_serv_w) * format_op(this.factor_w)) / 100
          );

          this.reg_abo.tabla.vlr_ser[0].vlr = vlr_tmp * 100;
          console.log(vlr_tmp, "temp", this.factor_w, "fact");

          vlr_tmp = Math.round(
            (format_op(this.tabla_serv_w[1].tabla_tot_w[1].tot_serv_w) * format_op(this.factor_w)) / 100
          );
          this.reg_abo.tabla.vlr_ser[1].vlr = vlr_tmp * 100;

          vlr_tmp = Math.round(
            (format_op(this.tabla_serv_w[2].tabla_tot_w[1].tot_serv_w) * format_op(this.factor_w)) / 100
          );
          this.reg_abo.tabla.vlr_ser[2].vlr = vlr_tmp * 100;

          vlr_tmp = Math.round(
            (format_op(this.tabla_serv_w[3].tabla_tot_w[1].tot_serv_w) * format_op(this.factor_w)) / 100
          );
          this.reg_abo.tabla.vlr_ser[3].vlr = vlr_tmp * 100;

          vlr_tmp = Math.round(
            (format_op(this.tabla_serv_w[4].tabla_tot_w[1].tot_serv_w) * format_op(this.factor_w)) / 100
          );
          this.reg_abo.tabla.vlr_ser[4].vlr = vlr_tmp * 100;

          vlr_tmp = Math.round(
            (format_op(this.tabla_serv_w[5].tabla_tot_w[1].tot_serv_w) * format_op(this.factor_w)) / 100
          );
          this.reg_abo.tabla.vlr_ser[5].vlr = vlr_tmp * 100;

          this.ajuste_w =
            format_op(this.reg_abo.tabla.vlr_abo) -
            format_op(this.reg_abo.tabla.vlr_ser[0].vlr) -
            format_op(this.reg_abo.tabla.vlr_ser[1].vlr) -
            format_op(this.reg_abo.tabla.vlr_ser[2].vlr) -
            format_op(this.reg_abo.tabla.vlr_ser[3].vlr) -
            format_op(this.reg_abo.tabla.vlr_ser[4].vlr) -
            format_op(this.reg_abo.tabla.vlr_ser[5].vlr) -
            format_op(this.reg_abo.tabla.recargo);

          if (format_op(this.ajuste_w) != 0) {
            if (format_op(this.reg_abo.tabla.vlr_ser[0].vlr) > 0) {
              this.reg_abo.tabla.vlr_ser[0].vlr =
                format_op(this.reg_abo.tabla.vlr_ser[0].vlr) + format_op(this.ajuste_w);
            } else if (format_op(this.reg_abo.tabla.vlr_ser[1].vlr) > 0) {
              this.reg_abo.tabla.vlr_ser[1].vlr =
                format_op(this.reg_abo.tabla.vlr_ser[1].vlr) + format_op(this.ajuste_w);
            } else if (format_op(this.reg_abo.tabla.vlr_ser[2].vlr) > 0) {
              this.reg_abo.tabla.vlr_ser[2].vlr =
                format_op(this.reg_abo.tabla.vlr_ser[2].vlr) + format_op(this.ajuste_w);
            } else if (format_op(this.reg_abo.tabla.vlr_ser[3].vlr) > 0) {
              this.reg_abo.tabla.vlr_ser[3].vlr =
                format_op(this.reg_abo.tabla.vlr_ser[3].vlr) + format_op(this.ajuste_w);
            } else if (format_op(this.reg_abo.tabla.vlr_ser[4].vlr) > 0) {
              this.reg_abo.tabla.vlr_ser[4].vlr =
                format_op(this.reg_abo.tabla.vlr_ser[4].vlr) + format_op(this.ajuste_w);
            } else if (format_op(this.reg_abo.tabla.vlr_ser[5].vlr) > 0) {
              this.reg_abo.tabla.vlr_ser[5].vlr =
                format_op(this.reg_abo.tabla.vlr_ser[5].vlr) + format_op(this.ajuste_w);
            }
          }

          this.aceptarServicios(0);
        }
      );
    },

    aceptarServicios(indice) {
      validarInputs(
        {
          form: `#vlr_ser_${indice}`,
        },
        () => {
          if (indice == 0) {
            this.datoAbono();
          } else {
            indice -= 1;
            this.aceptarServicios(indice);
          }
        },
        () => {
          if (this.reg_abo.tabla.vlr_ser[indice].vlr < 0) {
            CON851("", "46", null, "error", "Error");
            this.aceptarServicios(indice);
          } else {
            if (
              format_op(this.reg_abo.tabla.vlr_ser[indice].vlr) >
              format_op(this.tabla_serv_w[indice].tabla_tot_w[1].tot_serv_w)
            ) {
              CON851("", "07", null, "error", "Error");
              this.reg_abo.tabla.vlr_ser[indice].vlr = mascara_valor.resolve(
                this.reg_abo.tabla.vlr_ser[indice].vlr.toString()
              );
            }

            this.reg_abo.tabla.vlr_ser[indice].vlr = mascara_valor.resolve(
              this.reg_abo.tabla.vlr_ser[indice].vlr.toString()
            );

            if (indice < 5) {
              indice += 1;
              this.aceptarServicios(indice);
            } else {
              if (
                format_op(this.reg_abo.tabla.vlr_abo) ==
                format_op(this.reg_abo.tabla.vlr_ser[0].vlr) +
                  format_op(this.reg_abo.tabla.vlr_ser[1].vlr) +
                  format_op(this.reg_abo.tabla.vlr_ser[2].vlr) +
                  format_op(this.reg_abo.tabla.vlr_ser[3].vlr) +
                  format_op(this.reg_abo.tabla.vlr_ser[4].vlr) +
                  format_op(this.reg_abo.tabla.vlr_ser[5].vlr) +
                  format_op(this.reg_abo.tabla.recargo)
              ) {
                this.datoObserv();
              } else {
                CON851("", "51", null, "error", "Error");
                this.datoRecargo();
              }
            }
          }
        }
      );
    },

    datoObserv() {
      validarInputs(
        {
          form: "#observ",
        },
        this.datoRecargo,
        () => {
          this.reg_abo.observ = this.reg_abo.observ.replaceEsp();
          this.llamarDLL();
        }
      );
    },

    llamarDLL() {
      loader("show");

      for (let i in this.reg_abo.tabla.vlr_ser) {
        this.reg_abo.tabla.vlr_ser[i].vlr = format_op(this.reg_abo.tabla.vlr_ser[i].vlr).toString();
      }

      this.reg_abo.tabla.vlr_abo = format_op(this.reg_abo.tabla.vlr_abo).toString();
      this.reg_abo.tabla.recargo = format_op(this.reg_abo.tabla.recargo).toString();

      this.reg_abo.fact = format_op(this.reg_fact.llave).toString();

      let datos = _getObjetoSave(this.reg_abo, ["vlr_ser"]);

      datos = {
        ...datos,
        datosh: moduloDatosEnvio() + localStorage.Usuario + "|",
        novedad: this.novedad,
      };

      console.log(datos, "datos");

      postData(datos, get_url("app/SERVDOM/PUB206.DLL"))
        .then((data) => {
          console.log(data);
          switch (this.novedad) {
            case "7":
              CON851("", "Guardado correctamente", null, "success", "");
              break;
            case "8":
              CON851("", "Modificado correctamente", null, "success", "");
              break;
          }
          loader("hide");
          this.confirmar();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error intentando grabar", null, "error", "Error");
          loader("hide");
          this.datoObserv();
        });
    },

    confirmar() {
      CON851P("00", _toggleNav, this.imprimir);
    },

    imprimir() {
      let variable_emp = "";

      let url = variable_emp
        ? `../../frameworks/pdf/servdom/${variable_emp}/PUB206A.formato`
        : "../../frameworks/pdf/servdom/PUB206A.formato";

      const { imprimir_PUB206A } = require(url);
      imprimir_PUB206A({
        array_usuar_ser: this.array_usuar_ser,
        array_serv: this.array_serv,
        llave_abo: this.llave_abo,
        callback: () => {
          _toggleNav();
        },
        callback_err: _toggleNav,
      });
    },

    async mostrarDatos() {
      loader("show");
      return new Promise(async (resolve) => {
        await this.mostrarUsuario();
        await this.total();

        this.reg_abo.tabla.vlr_abo = mascara_valor.resolve(this.reg_abo.tabla.vlr_abo.toString());

        this.reg_abo.tabla.vlr_ser[0].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[0].vlr.toString());
        this.reg_abo.tabla.vlr_ser[1].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[1].vlr.toString());
        this.reg_abo.tabla.vlr_ser[2].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[2].vlr.toString());
        this.reg_abo.tabla.vlr_ser[3].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[3].vlr.toString());
        this.reg_abo.tabla.vlr_ser[4].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[4].vlr.toString());
        this.reg_abo.tabla.vlr_ser[5].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[5].vlr.toString());

        this.reg_abo.tabla.recargo = mascara_valor.resolve(this.reg_abo.tabla.recargo.toString());

        loader("hide");
        resolve();
      });
    },

    mostrarUsuario() {
      return new Promise(async (resolve) => {
        postData(
          {
            datosh: moduloDatosEnvio() + this.reg_fact.cat + "|" + this.reg_ctl.periodo[0].ano_per + "|",
          },
          get_url("app/SERVDOM/PUB801_01.DLL")
        )
          .then((data) => {
            if (data.nro_cat) this.reg_usuar_ser = data;
            else {
              this.reg_usuar_ser = regs_dom.USUAR_SER();
              this.reg_usuar_ser.nombre = "USUARIO NO EXISTE";
            }

            resolve();
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error leyendo usuario", null, "error", "Error");
            loader("hide");
            this.datoFact();
          });
      });
    },

    total() {
      return new Promise(async (resolve) => {
        await this.totalizarServicio();

        this.tabla_serv_w[0].tabla_tot_w[0].tot_serv_w = mascara_valor.resolve(
          this.tabla_serv_w[0].tabla_tot_w[0].tot_serv_w.toString()
        );
        this.tabla_serv_w[1].tabla_tot_w[0].tot_serv_w = mascara_valor.resolve(
          this.tabla_serv_w[1].tabla_tot_w[0].tot_serv_w.toString()
        );
        this.tabla_serv_w[2].tabla_tot_w[0].tot_serv_w = mascara_valor.resolve(
          this.tabla_serv_w[2].tabla_tot_w[0].tot_serv_w.toString()
        );
        this.tabla_serv_w[3].tabla_tot_w[0].tot_serv_w = mascara_valor.resolve(
          this.tabla_serv_w[3].tabla_tot_w[0].tot_serv_w.toString()
        );
        this.tabla_serv_w[4].tabla_tot_w[0].tot_serv_w = mascara_valor.resolve(
          this.tabla_serv_w[4].tabla_tot_w[0].tot_serv_w.toString()
        );
        this.tabla_serv_w[5].tabla_tot_w[0].tot_serv_w = mascara_valor.resolve(
          this.tabla_serv_w[5].tabla_tot_w[0].tot_serv_w.toString()
        );

        this.cargos_w = mascara_valor.resolve(this.cargos_w.toString());

        await this.sumarAbono();

        console.log(this.tabla_serv_w[0].abo_serv_w, "abo 0");
        this.tabla_serv_w[0].abo_serv_w = mascara_valor.resolve(
          Math.trunc(format_op(this.tabla_serv_w[0].abo_serv_w)).toString()
        );
        this.tabla_serv_w[1].abo_serv_w = mascara_valor.resolve(
          Math.trunc(format_op(this.tabla_serv_w[1].abo_serv_w)).toString()
        );
        this.tabla_serv_w[2].abo_serv_w = mascara_valor.resolve(
          Math.trunc(format_op(this.tabla_serv_w[2].abo_serv_w)).toString()
        );
        this.tabla_serv_w[3].abo_serv_w = mascara_valor.resolve(
          Math.trunc(format_op(this.tabla_serv_w[3].abo_serv_w)).toString()
        );
        this.tabla_serv_w[4].abo_serv_w = mascara_valor.resolve(
          Math.trunc(format_op(this.tabla_serv_w[4].abo_serv_w)).toString()
        );
        this.tabla_serv_w[5].abo_serv_w = mascara_valor.resolve(
          Math.trunc(format_op(this.tabla_serv_w[5].abo_serv_w)).toString()
        );

        this.total_abonos_w = mascara_valor.resolve(this.total_abonos_w.toString());

        await this.calcularNeto();

        this.tabla_serv_w[0].tabla_tot_w[1].tot_serv_w = mascara_valor.resolve(
          this.tabla_serv_w[0].tabla_tot_w[1].tot_serv_w.toString()
        );
        this.tabla_serv_w[1].tabla_tot_w[1].tot_serv_w = mascara_valor.resolve(
          this.tabla_serv_w[1].tabla_tot_w[1].tot_serv_w.toString()
        );
        this.tabla_serv_w[2].tabla_tot_w[1].tot_serv_w = mascara_valor.resolve(
          this.tabla_serv_w[2].tabla_tot_w[1].tot_serv_w.toString()
        );
        this.tabla_serv_w[3].tabla_tot_w[1].tot_serv_w = mascara_valor.resolve(
          this.tabla_serv_w[3].tabla_tot_w[1].tot_serv_w.toString()
        );
        this.tabla_serv_w[4].tabla_tot_w[1].tot_serv_w = mascara_valor.resolve(
          this.tabla_serv_w[4].tabla_tot_w[1].tot_serv_w.toString()
        );
        this.tabla_serv_w[5].tabla_tot_w[1].tot_serv_w = mascara_valor.resolve(
          this.tabla_serv_w[5].tabla_tot_w[1].tot_serv_w.toString()
        );

        this.saldo_w = format_op(this.cargos_w) - format_op(this.total_abonos_w);
        this.saldo_w = mascara_valor.resolve(this.saldo_w.toString());

        resolve();
      });
    },

    totalizarServicio() {
      return new Promise((resolve) => {
        for (let serv_w = 0; serv_w < 6; serv_w++) {
          this.tabla_serv_w[serv_w].tabla_tot_w[0].tot_serv_w =
            format_op(this.reg_fact.tabla.serv_tab[serv_w].sub_tot) +
            format_op(this.reg_fact.tabla.serv_tab[serv_w].sdo_ant) +
            format_op(this.reg_fact.tabla.serv_tab[serv_w].int_ant) +
            format_op(this.reg_fact.tabla.serv_tab[serv_w].int_mes) +
            format_op(this.reg_fact.tabla.serv_tab[serv_w].ajustes) +
            format_op(this.reg_fact.tabla.serv_tab[serv_w].refinanc_mes);

          this.cargos_w = format_op(this.cargos_w) + format_op(this.tabla_serv_w[serv_w].tabla_tot_w[0].tot_serv_w);

          if (serv_w == 5) resolve();
        }
      });
    },

    sumarAbono() {
      return new Promise((resolve) => {
        this.total_abonos_w = 0;
        for (let i = 0; i < 5; i++) {
          this.total_abonos_w = format_op(this.total_abonos_w) + format_op(this.reg_fact.tabla.datos_abon[i].tot_abon);
          this.tabla_serv_w[0].abo_serv_w =
            format_op(this.tabla_serv_w[0].abo_serv_w) +
            format_op(this.reg_fact.tabla.datos_abon[i].abonos_ser[0].abono_ser);
          this.tabla_serv_w[1].abo_serv_w =
            format_op(this.tabla_serv_w[1].abo_serv_w) +
            format_op(this.reg_fact.tabla.datos_abon[i].abonos_ser[1].abono_ser);
          this.tabla_serv_w[2].abo_serv_w =
            format_op(this.tabla_serv_w[2].abo_serv_w) +
            format_op(this.reg_fact.tabla.datos_abon[i].abonos_ser[2].abono_ser);
          this.tabla_serv_w[3].abo_serv_w =
            format_op(this.tabla_serv_w[3].abo_serv_w) +
            format_op(this.reg_fact.tabla.datos_abon[i].abonos_ser[3].abono_ser);
          this.tabla_serv_w[4].abo_serv_w =
            format_op(this.tabla_serv_w[4].abo_serv_w) +
            format_op(this.reg_fact.tabla.datos_abon[i].abonos_ser[4].abono_ser);
          this.tabla_serv_w[5].abo_serv_w =
            format_op(this.tabla_serv_w[5].abo_serv_w) +
            format_op(this.reg_fact.tabla.datos_abon[i].abonos_ser[5].abono_ser);

          if (i == 4) resolve();
        }
      });
    },

    calcularNeto() {
      return new Promise((resolve) => {
        for (let serv_w = 0; serv_w < 6; serv_w++) {
          this.tabla_serv_w[serv_w].tabla_tot_w[1].tot_serv_w =
            format_op(this.tabla_serv_w[serv_w].tabla_tot_w[0].tot_serv_w) -
            format_op(this.tabla_serv_w[serv_w].abo_serv_w);
          if (serv_w == 5) resolve();
        }
      });
    },

    buscarFecha() {
      loader("show");
      postData(
        {
          datosh: moduloDatosEnvio() + "2|",
          fact_abo: this.reg_abo.fact,
        },
        get_url("app/SERVDOM/PUB206_01.DLL")
      )
        .then((data) => {
          loader("hide");
          if (data.fecha) {
            this.reg_abo.fecha.ano = data.fecha.ano;
            this.reg_abo.fecha.mes = data.fecha.mes;
            this.reg_abo.fecha.dia = data.fecha.dia;
          }
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "Error");
          // this.datoFact();
        });
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          this.traerUsuarSer();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    traerUsuarSer() {
      postData({ datosh: moduloDatosEnvio() + "1" }, get_url("app/SERVDOM/PUB801.DLL"))
        .then((data) => {
          this.array_usuar_ser = data.USDOM;
          this.abrirArchivo();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "");
          _toggleNav();
        });
    },

    _ventanaUsuarSer(esc) {
      _fin_validar_form();

      _ventana_PUB801(() => {
        this[esc]();
      }).then((data) => {
        this.array_usuar_ser = data.datos;
        Vue.set(this.reg_fact, "cat", data.cuenta);

        postData(
          {
            datosh: moduloDatosEnvio() + "2|",
            fecha: `${this.reg_abo.fecha_gen.ano_gen}${this.reg_abo.fecha_gen.mes_gen}`,
            cat: this.reg_fact.cat,
          },
          get_url("app/SERVDOM/PUB203_02.DLL")
        )
          .then((data) => {
            loader("hide");
            if (data.llave == 0) data.llave = "";

            if (!data.llave) {
              if (this.novedad == 7) this.leerFact();
            } else {
              this.reg_fact.llave = data.llave;
              this.reg_abo.fact = this.reg_fact.llave;
              this.leerFact();
            }
          })
          .catch((error) => {
            console.error(error);
            loader("hide");
            CON851("", "Error consultando datos", null, "error", "Error");
            _toggleNav();
          });
      });
    },

    inicializarVariables() {
      this.cargos_w = "";
      this.total_abonos_w = "";
      this.saldo_w = "";
      this.ajuste_w = "";
      this.tabla_serv_w = [
        {
          abo_serv_w: "",
          tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
        },
        {
          abo_serv_w: "",
          tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
        },
        {
          abo_serv_w: "",
          tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
        },
        {
          abo_serv_w: "",
          tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
        },
        {
          abo_serv_w: "",
          tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
        },
        {
          abo_serv_w: "",
          tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
        },
      ];
    },
  },
});
