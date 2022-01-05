const { regs_dom } = require("../../SERVDOM/scripts/regs_dom.js");
const { _ventana_PUB801 } = require("../../SERVDOM/scripts/globalDom.js");

new Vue({
  el: "#PUB704",
  data: {
    novedad: "",
    reg_pqr: regs_dom.PQR(),
    fecha_act: moment().format("YYYYMMDD"),

    array_usuar_ser: [],
    array_serv: [],
    array_motivos: [],
    array_dependencias: [],
    array_pqr: [],

    array_tramite: [
      { cod: "1", descrip: "RECLAMACIÓN" },
      { cod: "2", descrip: "RECURSO REPOSICIÓN" },
      { cod: "3", descrip: "RECURSO APELACIÓN" },
      { cod: "4", descrip: "PETICIÓN" },
    ],

    array_medio: [
      { cod: "1", descrip: "Telefono" },
      { cod: "2", descrip: "Escrito" },
      { cod: "3", descrip: "Personal" },
    ],

    array_solic: [
      { cod: "1", descrip: "Usuario" },
      { cod: "2", descrip: "Otro" },
    ],

    array_estado: [
      { cod: "1", descrip: "Solucionado" },
      { cod: "2", descrip: "No solucionado" },
      { cod: "3", descrip: "Pendiente" },
    ],

    array_resp1: [
      { cod: "1", descrip: "RECHAZADA" },
      { cod: "2", descrip: "ACEPTADA EJECUTADA" },
      { cod: "3", descrip: "ACEPTADA EN TRAMITE" },
      { cod: "4", descrip: "PENDIENTE GESTION DEL USUARIO" },
      { cod: "5", descrip: "PENDIENTE DE RESPUESTA" },
      { cod: "6", descrip: "SIN RESPUESTA" },
    ],

    array_resp2: [
      { cod: "1", descrip: "ACCEDE" },
      { cod: "2", descrip: "ACCEDE PARCIALMENTE" },
      { cod: "3", descrip: "NO ACCEDE" },
      { cod: "4", descrip: "CONFIRMA" },
      { cod: "5", descrip: "MODIFICA" },
      { cod: "6", descrip: "REVOCA" },
      { cod: "7", descrip: "RECHAZADA" },
      { cod: "8", descrip: "TRASLADADA POR COMPETENCIA" },
      { cod: "9", descrip: "PENDIENTE DE RESPUESTA" },
      { cod: "10", descrip: "SIN RESPUESTA" },
      { cod: "11", descrip: "ARCHIVA" },
    ],

    mostrar_btn_imp: false,
  },
  created() {
    nombreOpcion("7-4 - Actualización Datos P.Q.R");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerUsuarSer();
  },
  watch: {
    "reg_pqr.descrip": function (val) {
      this.reg_pqr.descrip = val.enterPut().replaceEsp();
    },
    "reg_pqr.concep": function (val) {
      this.reg_pqr.concep = val.enterPut().replaceEsp();
    },
  },
  computed: {
    fecha() {
      return _getObjectDate6(this.reg_pqr.fecha);
    },
    fecha_sol() {
      return _getObjectDate6(this.reg_pqr.fecha_sol);
    },
    fecha_not() {
      return _getObjectDate6(this.reg_pqr.fecha_not);
    },
    fecha_ssp() {
      return _getObjectDate6(this.reg_pqr.fecha_ssp);
    },
    descrip_serv() {
      let busqueda = this.array_serv.find((e) => e.cod == this.reg_pqr.ser);
      return busqueda ? busqueda.descrip : "";
    },
    descrip_mot() {
      let busqueda = this.array_motivos.find((e) => e.llave == this.reg_pqr.mot);
      return busqueda ? busqueda.descrip : "";
    },
    descrip_dep() {
      let busqueda = this.array_dependencias.find((e) => e.cod == this.reg_pqr.dep);
      return busqueda ? busqueda.descrip : "";
    },
    respuesta_edit() {
      let array = this.reg_pqr.tramite == 4 ? this.array_resp1 : this.array_resp2;
      let busqueda = array.find((e) => parseInt(e.cod) == parseInt(this.reg_pqr.respuesta));
      return busqueda ? `${busqueda.cod} - ${busqueda.descrip}` : "";
    },
    tramite_edit() {
      let busqueda = this.array_tramite.find((e) => e.cod == this.reg_pqr.tramite);
      return busqueda ? `${busqueda.cod} - ${busqueda.descrip}` : "";
    },
    medio_edit() {
      let busqueda = this.array_medio.find((e) => e.cod == this.reg_pqr.medio);
      return busqueda ? `${busqueda.cod} - ${busqueda.descrip}` : "";
    },
    tipo_solic_edit() {
      let busqueda = this.array_solic.find((e) => e.cod == this.reg_pqr.tipo_solic);
      return busqueda ? `${busqueda.cod} - ${busqueda.descrip}` : "";
    },
    estado_edit() {
      let busqueda = this.array_estado.find((e) => e.cod == this.reg_pqr.est);
      return busqueda ? `${busqueda.cod} - ${busqueda.descrip}` : "";
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
        postData({ datosh: moduloDatosEnvio(), nro: "999999", paso: "2" }, get_url("app/SERVDOM/PUB704_01.DLL"))
          .then((data) => {
            loader("hide");
            if (!data.llave.trim() || data.llave == 0) {
              this.reg_pqr.llave = "0";
            } else {
              this.reg_pqr.llave = data.llave;
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

    leerArchivo() {
      if (this.reg_pqr.llave == 0 || isNaN(this.reg_pqr.llave)) {
        CON851("", "03", null, "error", "Error");
        this.datoNro();
      } else {
        let sw_invalid = 0;
        loader("show");
        postData(
          { datosh: moduloDatosEnvio(), nro: this.reg_pqr.llave, paso: "1" },
          get_url("app/SERVDOM/PUB704_01.DLL")
        )
          .then((data) => {
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
      this.reg_pqr = Object.assign({}, data);
      this.mostrar_btn_imp = true;
      this.datoFecha();
    },

    datoFecha() {
      if (this.fecha.mes_w == 0 || this.novedad == 7) {
        this.reg_pqr.fecha = this.fecha_act.slice(2);
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
          this.reg_pqr.fecha = `${this.fecha.ano_w.slice(2, 4)}${this.fecha.mes_w}${this.fecha.dia_w}`;

          if (this.fecha.mes_w < 1 || this.fecha.mes_w > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFecha();
          } else if (this.fecha.dia_w < 1 || this.fecha.dia_w > 31) {
            CON851("", "37", null, "error", "Error");
            this.datoFecha();
          } else {
            setTimeout(() => {
              this.datoMedio();
            }, 200);
          }
        }
      );
    },

    datoMedio() {
      POPUP(
        {
          array: this.array_medio,
          titulo: "MEDIO",
          indices: [{ id: "cod", label: "descrip" }],
          seleccion: this.reg_pqr.medio,
          callback_f: this.datoFecha,
        },
        (data) => {
          this.reg_pqr.medio = data.cod;
          this.datoSolic();
        }
      );
    },

    datoSolic() {
      POPUP(
        {
          array: this.array_solic,
          titulo: "SOLICITANTE",
          indices: [{ id: "cod", label: "descrip" }],
          seleccion: this.reg_pqr.tipo_solic,
          callback_f: this.datoMedio,
        },
        (data) => {
          this.reg_pqr.tipo_solic = data.cod;
          this.datoUsu();
        }
      );
    },

    datoUsu() {
      validarInputs(
        {
          form: "#usu",
        },
        this.datoSolic,
        () => {
          this.reg_pqr.usu = this.reg_pqr.usu.padStart(15, "0");
          this.leerUsu();
        }
      );
    },

    leerUsu() {
      if (this.reg_pqr.tipo_solic == 2) this.datoTelefono();
      else {
        let busqueda = this.array_usuar_ser.find((e) => e.CUENTA == this.reg_pqr.usu);
        if (busqueda) {
          this.reg_pqr.nom = busqueda.NOMBRE;
          this.reg_pqr.dir = busqueda.DIRECCION;
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
          this.datoFact();
        }
      );
    },

    datoFact() {
      validarInputs(
        {
          form: "#fact",
        },
        this.datoTelefono,
        () => {
          if (this.reg_pqr.tipo_solic == 2) this.datoNombre();
          else this.datoDirecc();
        }
      );
    },

    datoNombre() {
      validarInputs(
        {
          form: "#nom",
        },
        this.datoFact,
        () => {
          this.reg_pqr.nom = this.reg_pqr.nom.replaceEsp();
          if (!this.reg_pqr.nom.trim()) {
            CON851("", "02", null, "error", "Error");
            this.datoNombre();
          } else {
            this.datoDirecc();
          }
        }
      );
    },

    datoDirecc() {
      validarInputs(
        {
          form: "#dir",
        },
        this.datoNombre,
        () => {
          this.reg_pqr.dir = this.reg_pqr.dir.replaceEsp();
          if (!this.reg_pqr.dir.trim()) {
            CON851("", "02", null, "error", "Error");
            this.datoDirecc();
          } else {
            this.datoDescrip();
          }
        }
      );
    },

    datoDescrip() {
      validarInputs(
        {
          form: "#descrip",
        },
        this.datoFact,
        () => {
          this.reg_pqr.descrip = this.reg_pqr.descrip.replaceEsp();
          if (!this.reg_pqr.descrip.trim()) {
            CON851("", "02", null, "error", "Error");
            this.datoDescrip();
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
        this.datoDescrip,
        () => {
          let busqueda = this.array_serv.find((e) => e.cod == this.reg_pqr.ser);
          if (busqueda) this.datoTramite();
          else {
            CON851("", "01", null, "error", "Error");
            this.datoSer();
          }
        }
      );
    },

    datoTramite() {
      POPUP(
        {
          array: this.array_tramite,
          titulo: "TRAMITE",
          indices: [{ id: "cod", label: "descrip" }],
          seleccion: this.reg_pqr.tramite,
          callback_f: this.datoSer,
        },
        (data) => {
          this.reg_pqr.tramite = data.cod;
          this.datoMotivo();
        }
      );
    },

    datoMotivo() {
      validarInputs(
        {
          form: "#mot",
        },
        this.datoTramite,
        () => {
          let busqueda = this.array_motivos.find((e) => e.llave == this.reg_pqr.mot);
          if (busqueda) {
            if (this.reg_pqr.tramite == 4 && busqueda.llave.slice(0, 1) == 1) {
              CON851("", "03", null, "error", "Error");
              this.datoMotivo();
            } else if (this.reg_pqr.tramite < 4 && busqueda.llave.slice(0, 1) == 2) {
              CON851("", "03", null, "error", "Error");
              this.datoMotivo();
            } else {
              this.datoDependencia();
            }
          } else {
            CON851("", "01", null, "error", "Error");
            this.datoMotivo();
          }
        }
      );
    },

    datoDependencia() {
      validarInputs(
        {
          form: "#dep",
        },
        this.datoMotivo,
        () => {
          let busqueda = this.array_dependencias.find((e) => e.cod == this.reg_pqr.dep);
          if (busqueda) this.datoConcep();
          else {
            CON851("", "01", null, "error", "Error");
            this.datoDependencia();
          }
        }
      );
    },

    datoConcep() {
      validarInputs(
        {
          form: "#concep",
        },
        this.datoDependencia,
        () => {
          this.reg_pqr.concep = this.reg_pqr.concep.replaceEsp();
          this.datoEstado();
        }
      );
    },

    datoEstado() {
      if (!this.reg_pqr.est.trim()) this.reg_pqr.est = "3";
      POPUP(
        {
          array: this.array_estado,
          titulo: "ESTADO",
          indices: [{ id: "cod", label: "descrip" }],
          seleccion: this.reg_pqr.est,
          callback_f: this.datoConcep,
        },
        (data) => {
          this.reg_pqr.est = data.cod;
          if (this.reg_pqr.est == 3) {
            this.reg_pqr.fecha_sol = "000000";
            if (this.reg_pqr.tramite == 4) {
              this.reg_pqr.respuesta = "5";
            } else {
              this.reg_pqr.respuesta = "9";
            }
            this.confirmar();
          } else {
            this.datoRespuesta();
          }
        }
      );
    },

    datoRespuesta() {
      POPUP(
        {
          array: this.reg_pqr.tramite == 4 ? this.array_resp1 : this.array_resp2,
          titulo: "TIPO RESPUESTA",
          indices: [{ id: "cod", label: "descrip" }],
          seleccion: parseInt(this.reg_pqr.respuesta).toString(),
          callback_f: this.datoConcep,
        },
        (data) => {
          this.reg_pqr.respuesta = data.cod;
          this.datoFechaSol();
        }
      );
    },

    datoFechaSol() {
      validarInputs(
        {
          form: "#fecha_sol",
        },
        this.datoEstado,
        () => {
          this.fecha_sol.ano_w = this.fecha_sol.ano_w.padStart(4, "0");
          this.fecha_sol.mes_w = this.fecha_sol.mes_w.padStart(2, "0");
          this.fecha_sol.dia_w = this.fecha_sol.dia_w.padStart(2, "0");
          this.reg_pqr.fecha_sol = `${this.fecha_sol.ano_w.slice(2, 4)}${this.fecha_sol.mes_w}${this.fecha_sol.dia_w}`;

          if (this.fecha_sol.mes_w < 1 || this.fecha_sol.mes_w > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaSol();
          } else if (this.fecha_sol.dia_w < 1 || this.fecha_sol.dia_w > 31) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaSol();
          } else {
            setTimeout(() => {
              this.datoFechaNot();
            }, 200);
          }
        }
      );
    },

    datoFechaNot() {
      if (this.reg_pqr.tramite == 4) {
        this.reg_pqr.fecha_not = "00000000";
        this.reg_pqr.fecha_ssp = "00000000";
        this.confirmar();
      } else {
        validarInputs(
          {
            form: "#fecha_not",
          },
          this.datoFechaSol,
          () => {
            this.fecha_not.ano_w = this.fecha_not.ano_w.padStart(4, "0");
            this.fecha_not.mes_w = this.fecha_not.mes_w.padStart(2, "0");
            this.fecha_not.dia_w = this.fecha_not.dia_w.padStart(2, "0");
            this.reg_pqr.fecha_not = `${this.fecha_not.ano_w.slice(2, 4)}${this.fecha_not.mes_w}${
              this.fecha_not.dia_w
            }`;

            if (this.fecha_not.ano_w == 0 && this.fecha_not.mes_w == 0) {
              this.reg_pqr.fecha_not = "000000";
              this.reg_pqr.fecha_ssp = "000000";
              this.confirmar();
            } else if (this.fecha_not.mes_w < 1 || this.fecha_not.mes_w > 12) {
              CON851("", "37", null, "error", "Error");
              this.datoFechaNot();
            } else if (this.fecha_not.dia_w < 1 || this.fecha_not.dia_w > 31) {
              CON851("", "37", null, "error", "Error");
              this.datoFechaNot();
            } else {
              setTimeout(() => {
                this.datoFechaSsp();
              }, 200);
            }
          }
        );
      }
    },

    datoFechaSsp() {
      validarInputs(
        {
          form: "#fecha_ssp",
        },
        this.datoFechaNot,
        () => {
          this.fecha_ssp.ano_w = this.fecha_ssp.ano_w.padStart(4, "0");
          this.fecha_ssp.mes_w = this.fecha_ssp.mes_w.padStart(2, "0");
          this.fecha_ssp.dia_w = this.fecha_ssp.dia_w.padStart(2, "0");
          this.reg_pqr.fecha_ssp = `${this.fecha_ssp.ano_w.slice(2, 4)}${this.fecha_ssp.mes_w}${this.fecha_ssp.dia_w}`;

          if (this.fecha_ssp.ano_w == 0 && this.fecha_ssp.mes_w == 0) {
            this.reg_pqr.fecha_ssp = "000000";
            this.confirmar();
          } else if (this.fecha_ssp.mes_w < 1 || this.fecha_ssp.mes_w > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaSsp();
          } else if (this.fecha_ssp.dia_w < 1 || this.fecha_ssp.dia_w > 31) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaSsp();
          } else {
            setTimeout(() => {
              this.confirmar();
            }, 200);
          }
        }
      );
    },

    retiro(data) {
      this.reg_pqr = Object.assign({}, data);
      CON851P("02", this._ventanaNovedad, this.llamarDll);
    },

    confirmar() {
      CON851P("01", this.datoEstado, this.llamarDll);
    },

    async llamarDll() {
      loader("show");
      let descrip_w = this.reg_pqr.descrip.enterReplace().strToTable("DESCRIP");
      let concep_w = this.reg_pqr.concep.enterReplace().strToTable("CONCEP");

      let pqr_w = JSON.parse(JSON.stringify(this.reg_pqr));

      delete pqr_w.descrip;
      delete pqr_w.concep;

      let datos = {
        ..._getObjetoSave(pqr_w),
        novedad: this.novedad.toString(),
        ...descrip_w,
        ...concep_w,
        datosh: moduloDatosEnvio(),
        admin_w: localStorage.Usuario,
      };

      postData(datos, get_url("app/SERVDOM/PUB704.DLL"))
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
          CON851P("00", _toggleNav, this.imprimir);
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
      const { imprimir_PUB704P } = require("../../frameworks/pdf/servdom/PUB704P.formato.js");
      imprimir_PUB704P({
        llave: this.reg_pqr.llave,
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
          this.traerMotivos();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    traerMotivos() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB782.DLL"))
        .then((data) => {
          this.array_motivos = data.DATOS;
          this.traerDependencias();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          loader("hide");
          _toggleNav();
        });
    },

    traerDependencias() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB783.DLL"))
        .then((data) => {
          this.array_dependencias = data.DATOS;
          this.traerPQR();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          loader("hide");
          _toggleNav();
        });
    },

    traerPQR() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB784.DLL"))
        .then((data) => {
          this.array_pqr = data.DATOS;
          loader("hide");
          this._ventanaNovedad();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          loader("hide");
          _toggleNav();
        });
    },

    _ventanaPQR() {
      _ventanaDatos({
        titulo: "Ventana de Usuarios P.Q.R.",
        columnas: [
          { label: "Nombre", value: "nom" },
          { label: "Numero", value: "llave" },
          { label: "Fecha", value: "fecha" },
          { label: "Motivo", value: "descrip_mot" },
        ],
        data: this.array_pqr,
        callback_esc: () => {
          document.querySelector(".llave").focus();
        },
        callback: (data) => {
          this.reg_pqr.llave = data.llave;
          setTimeout(() => {
            _enterInput(".llave");
          }, 200);
        },
      });
    },

    _ventanaUsuarSer() {
      _fin_validar_form();

      _ventana_PUB801(() => {
        this.datoUsu();
      }).then((data) => {
        this.reg_pqr.usu = data.cuenta;
        if (this.reg_pqr.tipo_solic == 2) this.datoNombre();
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
          this.reg_pqr.ser = data.cod;
          setTimeout(() => {
            _enterInput(".ser");
          }, 200);
        },
      });
    },

    _ventanaMotivos() {
      _ventanaDatos({
        titulo: "Ventana de Motivos de P.Q.R.",
        columnas: ["llave", "descrip"],
        data: this.array_motivos,
        callback_esc: () => {
          document.querySelector(".mot").focus();
        },
        callback: (data) => {
          this.reg_pqr.mot = data.llave;
          setTimeout(() => {
            _enterInput(".mot");
          }, 200);
        },
      });
    },

    _ventanaDependencias() {
      _ventanaDatos({
        titulo: "Ventana de Dependencias P.Q.R.",
        columnas: [
          { value: "cod", label: "Codigo" },
          { value: "descrip", label: "Descripción" },
          { value: "responsable", label: "Responsable" },
        ],
        data: this.array_dependencias,
        callback_esc: () => {
          document.querySelector(".dep").focus();
        },
        callback: (data) => {
          this.reg_pqr.dep = data.cod;
          setTimeout(() => {
            _enterInput(".dep");
          }, 200);
        },
      });
    },
  },
});
