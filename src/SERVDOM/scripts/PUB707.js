// Solicitud de servicios - 7-7 - David.M - 03-09-2021

const { regs_dom } = require("../../SERVDOM/scripts/regs_dom.js");
const { _ventana_PUB801, mascara_valor, format_op } = require("../../SERVDOM/scripts/globalDom.js");

new Vue({
  el: "#PUB707",
  data: {
    novedad: "",
    reg_sol: regs_dom.SOLIC(),
    fecha_act: moment().format("YYYYMMDD"),

    array_usuar_ser: [],
    array_serv: [],
    array_tarifas: [],

    mostrar_btn_imp: false,
  },
  created() {
    nombreOpcion("7-7 - Solicitud de Servicios");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerUsuarSer();
  },
  watch: {
    "reg_sol.observ": function (val) {
      this.reg_sol.observ = val.enterPut().replaceEsp();
    },
  },
  computed: {
    fecha() {
      return _getObjectDate(this.reg_sol.fecha);
    },
    fecha_ins() {
      return _getObjectDate(this.reg_sol.fecha_ins);
    },
    descrip_serv() {
      let busqueda = this.array_serv.find((e) => e.cod == this.reg_sol.ser);
      return busqueda ? busqueda.descrip : "";
    },
    deduccion() {
      let total = format_op(this.reg_sol.vlr_ini) + format_op(this.reg_sol.vlr_mob) + format_op(this.reg_sol.vlr_mat);
      return mascara_valor.resolve(format_op(total).toString());
    },
    neto() {
      let total = format_op(this.reg_sol.vlr_cnx) - format_op(this.deduccion);
      return mascara_valor.resolve(format_op(total).toString());
    },
  },
  methods: {
    _ventanaNovedad() {
      CON850((data) => {
        this.novedad = data.id;
        if (this.novedad == "F") _toggleNav();
        else this.datoNro();
      });
    },

    datoNro() {
      if (this.novedad == 7) {
        loader("show");
        postData({ datosh: moduloDatosEnvio(), nro: "999999", paso: "2" }, get_url("app/SERVDOM/PUB707_01.DLL"))
          .then(async (data) => {
            loader("hide");
            if (!data.llave.trim() || data.llave == 0) {
              this.reg_sol.llave = "0";
            } else {
              this.reg_sol.llave = data.llave;
            }
            this.leerArchivo();
          })
          .catch((error) => {
            console.error(error);
            loader("hide");
            CON851("", "Error consultando datos", null, "error", "Error");
            _toggleNav();
          });
      } else {
        validarInputs(
          {
            form: "#llave",
          },
          this._ventanaNovedad,
          () => {
            this.leerArchivo();
          }
        );
      }
    },

    async leerArchivo() {
      if (this.reg_sol.llave == 0 || isNaN(this.reg_sol.llave)) {
        CON851("", "03", null, "error", "Error");
        this.datoNro();
      } else {
        let sw_invalid = 0;
        loader("show");
        postData(
          { datosh: moduloDatosEnvio(), nro: this.reg_sol.llave, paso: "1" },
          get_url("app/SERVDOM/PUB707_01.DLL")
        )
          .then(async (data) => {
            loader("hide");

            if (!data.llave.trim() || data.llave == 0) {
              sw_invalid = 1;
            } else {
              sw_invalid = 0;
            }

            switch (this.novedad) {
              case "7":
                if (sw_invalid == 1) {
                  this.datoFecha();
                } else {
                  CON851("", "00", null, "error", "Error");
                  this.datoNro();
                }
                break;
              case "8":
                if (sw_invalid == 0) {
                  this.mostrarDatos(data);
                } else {
                  CON851("", "01", null, "error", "Error");
                  this.datoNro();
                }
                break;
              case "9":
                if (sw_invalid == 0) {
                  this.retiro(data);
                } else {
                  CON851("", "01", null, "error", "Error");
                  this.datoNro();
                }
                break;
            }
          })
          .catch((error) => {
            console.error(error);
            loader("hide");
            CON851("", "Error consultando datos", null, "error", "Error");
            this.datoNro();
          });
      }
    },

    mostrarDatos(data) {
      this.reg_sol = Object.assign({}, data);

      this.reg_sol.vlr_cnx = mascara_valor.resolve(format_op(this.reg_sol.vlr_cnx).toString());
      this.reg_sol.vlr_ini = mascara_valor.resolve(format_op(this.reg_sol.vlr_ini).toString());
      this.reg_sol.vlr_mob = mascara_valor.resolve(format_op(this.reg_sol.vlr_mob).toString());
      this.reg_sol.vlr_mat = mascara_valor.resolve(format_op(this.reg_sol.vlr_mat).toString());
      this.reg_sol.vlr_net = mascara_valor.resolve(format_op(this.reg_sol.vlr_net).toString());

      this.mostrar_btn_imp = true;
      this.datoFecha();
    },

    datoFecha() {
      if (this.fecha.mes_w == 0 || this.novedad == 7) {
        this.reg_sol.fecha = this.fecha_act;
      }

      validarInputs(
        {
          form: "#fecha",
        },
        this._ventanaNovedad,
        () => {
          this.fecha.ano_w = this.fecha.ano_w.padStart(4, "0");
          this.fecha.mes_w = this.fecha.mes_w.padStart(2, "0");
          this.fecha.dia_w = this.fecha.dia_w.padStart(2, "0");
          this.reg_sol.fecha = `${this.fecha.ano_w}${this.fecha.mes_w}${this.fecha.dia_w}`;

          if (this.fecha.mes_w < 1 || this.fecha.mes_w > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFecha();
          } else if (this.fecha.dia_w < 1 || this.fecha.dia_w > 31) {
            CON851("", "37", null, "error", "Error");
            this.datoFecha();
          } else {
            setTimeout(() => {
              this.datoUsu();
            }, 200);
          }
        }
      );
    },

    datoUsu() {
      validarInputs(
        {
          form: "#usu",
        },
        this.datoFecha,
        () => {
          this.reg_sol.usu = this.reg_sol.usu.padStart(15, "0");
          this.leerUsu();
        }
      );
    },

    leerUsu() {
      if (this.reg_sol.tipo_solic == 2) this.datoTelefono();
      else {
        let busqueda = this.array_usuar_ser.find((e) => e.CUENTA == this.reg_sol.usu);
        if (busqueda) {
          if (this.novedad == 7) {
            this.reg_sol.nom = busqueda.NOMBRE;
            this.reg_sol.dir = busqueda.DIRECCION;
            this.reg_sol.tel = busqueda.TEL;
          }
          this.datoTelefono();
        } else {
          this.datoUsu();
        }
      }
    },

    datoTelefono() {
      validarInputs(
        {
          form: "#tel",
        },
        this.datoUsu,
        () => {
          this.datoDirecc();
        }
      );
    },

    datoDirecc() {
      validarInputs(
        {
          form: "#dir",
        },
        this.datoTelefono,
        () => {
          this.reg_sol.dir = this.reg_sol.dir.replaceEsp();
          if (!this.reg_sol.dir.trim()) {
            CON851("", "02", null, "error", "Error");
            this.datoDirecc();
          } else {
            this.datoSer();
          }
        }
      );
    },

    datoSer() {
      validarInputs(
        {
          form: "#ser",
        },
        this.datoDirecc,
        () => {
          let busqueda = this.array_serv.find((e) => e.cod == this.reg_sol.ser);
          if (busqueda) this.datoTarif();
          else {
            CON851("", "01", null, "error", "Error");
            this.datoSer();
          }
        }
      );
    },

    datoTarif() {
      validarInputs(
        {
          form: "#cod_tar",
        },
        this.datoSer,
        () => {
          this.reg_sol.cod_tar = this.reg_sol.cod_tar.toUpperCase();

          let busqueda = this.array_tarifas.find(
            (e) => e.llave == `${this.fecha.ano_w}${this.reg_sol.ser}${this.reg_sol.cod_tar}`
          );
          if (busqueda) this.datoObserv();
          else {
            CON851("", "01", null, "error", "Error");
            this.datoTarif();
          }
        }
      );
    },

    datoObserv() {
      validarInputs(
        {
          form: "#observ",
        },
        this.datoTarif,
        () => {
          this.reg_sol.observ = this.reg_sol.observ.replaceEsp();
          this.datoVlrCnx();
        }
      );
    },

    datoVlrCnx() {
      validarInputs(
        {
          form: "#vlr_cnx",
        },
        this.datoObserv,
        () => {
          this.reg_sol.vlr_cnx = mascara_valor.resolve(format_op(this.reg_sol.vlr_cnx).toString());
          this.datoVlrIni();
        }
      );
    },

    datoVlrIni() {
      validarInputs(
        {
          form: "#vlr_ini",
        },
        this.datoVlrCnx,
        () => {
          this.reg_sol.vlr_ini = mascara_valor.resolve(format_op(this.reg_sol.vlr_ini).toString());
          if (format_op(this.reg_sol.vlr_ini) > format_op(this.reg_sol.vlr_cnx)) {
            CON851("", "07", null, "error", "Error");
            this.datoVlrIni();
          } else this.datoVlrMob();
        }
      );
    },

    datoVlrMob() {
      validarInputs(
        {
          form: "#vlr_mob",
        },
        this.datoVlrIni,
        () => {
          this.reg_sol.vlr_mob = mascara_valor.resolve(format_op(this.reg_sol.vlr_mob).toString());
          if (format_op(this.reg_sol.vlr_ini) + format_op(this.reg_sol.vlr_mob) > format_op(this.reg_sol.vlr_cnx)) {
            CON851("", "07", null, "error", "Error");
            this.datoVlrMob();
          } else this.datoVlrMat();
        }
      );
    },

    datoVlrMat() {
      validarInputs(
        {
          form: "#vlr_mat",
        },
        this.datoVlrMob,
        () => {
          this.reg_sol.vlr_mat = mascara_valor.resolve(format_op(this.reg_sol.vlr_mat).toString());
          if (
            format_op(this.reg_sol.vlr_ini) + format_op(this.reg_sol.vlr_mob) + format_op(this.reg_sol.vlr_mat) >
            format_op(this.reg_sol.vlr_cnx)
          ) {
            CON851("", "07", null, "error", "Error");
            this.datoVlrMat();
          } else this.datoCta();
        }
      );
    },

    datoCta() {
      if (format_op(this.neto) == 0) {
        this.reg_sol.cta = 0;
      } else {
        validarInputs(
          {
            form: "#cta",
          },
          this.datoVlrMat,
          () => {
            if (format_op(this.neto) > 0 && this.reg_sol.cta == 0) {
              CON851("", "02", null, "error", "Error");
              this.datoCta();
            } else this.datoFechaIns();
          }
        );
      }
    },

    datoFechaIns() {
      validarInputs(
        {
          form: "#fecha_ins",
        },
        this.datoVlrMat,
        () => {
          this.fecha_ins.ano_w = this.fecha_ins.ano_w.padStart(4, "0");
          this.fecha_ins.mes_w = this.fecha_ins.mes_w.padStart(2, "0");
          this.fecha_ins.dia_w = this.fecha_ins.dia_w.padStart(2, "0");
          this.reg_sol.fecha_ins = `${this.fecha_ins.ano_w}${this.fecha_ins.mes_w}${this.fecha_ins.dia_w}`;

          if (this.fecha_ins.ano_w > 0 && format_op(this.fecha_ins.ano_w) < format_op(this.fecha.ano_w)) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaIns();
          } else if (this.fecha_ins.mes_w < 1 || this.fecha_ins.mes_w > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaIns();
          } else if (this.fecha_ins.dia_w < 1 || this.fecha_ins.dia_w > 31) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaIns();
          } else if (this.fecha_ins.mes_w > 0 && format_op(this.reg_sol.fecha_ins) < format_op(this.reg_sol.fecha)) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaIns();
          } else {
            setTimeout(() => {
              this.confirmar();
            }, 200);
          }
        }
      );
    },

    retiro(data) {
      this.reg_sol = Object.assign({}, data);
      CON851P("02", this._ventanaNovedad, this.llamarDll);
    },

    confirmar() {
      CON851P("01", this.datoFechaIns, this.llamarDll);
    },

    async llamarDll() {
      loader("show");

      this.reg_sol.vlr_cnx = format_op(this.reg_sol.vlr_cnx).toString();
      this.reg_sol.vlr_ini = format_op(this.reg_sol.vlr_ini).toString();
      this.reg_sol.vlr_mob = format_op(this.reg_sol.vlr_mob).toString();
      this.reg_sol.vlr_mat = format_op(this.reg_sol.vlr_mat).toString();
      this.reg_sol.vlr_net = format_op(this.neto).toString();
      this.reg_sol.cta = format_op(this.reg_sol.cta).toString();

      let datos = {
        ..._getObjetoSave(this.reg_sol),
        novedad: this.novedad.toString(),
        datosh: moduloDatosEnvio(),
        admin_w: localStorage.Usuario,
      };

      console.log(datos, "DATOS");

      postData(datos, get_url("app/SERVDOM/PUB707.DLL"))
        .then((data) => {
          switch (data) {
            case "7":
              CON851("", "Guardado con éxito", null, "success", "");
              break;
            case "8":
              CON851("", "Modificado con éxito", null, "success", "");
              break;
            case "9":
              CON851("", "Eliminado con éxito", null, "success", "");
              break;
          }
          loader("hide");
          if(this.novedad != 9) CON851P("00", _toggleNav, this.imprimir);
          else _toggleNav();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error", null, "error", "");
          loader("hide");
          this.datoEstado();
        });
    },

    imprimir() {
      _fin_validar_form();
      loader("show");
      const { imprimir_PUB707P } = require("../../frameworks/pdf/servdom/PUB707P.formato.js");
      imprimir_PUB707P({
        llave: this.reg_sol.llave,
        callback: () => {
          loader("hide");
          _toggleNav();
        },
        callback_err: () => {
          loader("hide");
          CON851("", "Error generando impresión", null, "error", "Error");
          _toggleNav();
        },
      });
    },

    traerUsuarSer() {
      postData({ datosh: moduloDatosEnvio() + "1" }, get_url("app/SERVDOM/PUB801.DLL"))
        .then((data) => {
          this.array_usuar_ser = data.USDOM;
          this.traerServicios();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          this.traerTarifas();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    traerTarifas() {
      postData(
        {
          datosh: moduloDatosEnvio(),
        },
        get_url("app/SERVDOM/GET_TARIF.DLL")
      )
        .then((data) => {
          this.array_tarifas = data.TARIFAS;
          loader("hide");
          this._ventanaNovedad();
        })
        .catch((error) => {
          loader("hide");
          if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    _ventanaUsuarSer() {
      _fin_validar_form();

      _ventana_PUB801(() => {
        this.datoUsu();
      }).then((data) => {
        this.reg_sol.usu = data.cuenta;
        if (this.reg_sol.tipo_solic == 2) this.datoNombre();
        else this.leerUsu();
      });
    },

    _ventanaServicios() {
      _ventanaDatos({
        titulo: "Ventana de Servicios P.Q.R.",
        columnas: ["cod", "descrip"],
        data: this.array_serv,
        callback_esc: () => {
          document.querySelector(".ser").focus();
        },
        callback: (data) => {
          this.reg_sol.ser = data.cod;
          setTimeout(() => {
            _enterInput(".ser");
          }, 200);
        },
      });
    },

    _ventanaTarifas() {
      for (let i in this.array_tarifas) {
        this.array_tarifas[i].cod = this.array_tarifas[i].llave.slice(4);
      }
      _ventanaDatos({
        titulo: `Ventana de Consulta de Tarifas - ${this.fecha.ano_w} - ${this.reg_sol.ser}`,
        data: this.array_tarifas.filter((e) => e.llave.slice(0, 5) == `${this.fecha.ano_w}${this.reg_sol.ser}`),
        columnas: [
          { label: "Codigo", value: "cod" },
          { label: "Descripción", value: "descrip" },
          { label: "Clase", value: "clase" },
          { label: "Medic", value: "medic" },
        ],
        callback_esc: () => {
          document.querySelector(".cod_tar").focus();
        },
        callback: (data) => {
          this.reg_sol.ser = data.cod.slice(0, 1);
          this.reg_sol.cod_tar = data.cod.slice(1);
          setTimeout(() => {
            _enterInput(".cod_tar");
          }, 200);
        },
      });
    },
  },
});
