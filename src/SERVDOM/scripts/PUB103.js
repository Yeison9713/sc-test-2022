// Maestro de usuarios de servicios - 1-3 - David.M - 12-06-2021
const { _ventana_PUB801, PUB827, format_op } = require("../../SERVDOM/scripts/globalDom.js");
const { regs_dom } = require("../../SERVDOM/scripts/regs_dom.js");

new Vue({
  el: "#PUB103",
  data: {
    params_CLAVE: {
      estado: false,
    },
    mostrar_CLAVE: false,

    novedad: "",
    reg_pub: regs_dom.USUAR_SER(),
    fecha_act: moment().format("YYYYMMDD"),
    array_rutas: [],
    array_usuar_ser: [],
    array_serv: [],
    array_uso_tarif: [],
    array_tarifas: [],
    reg_tabla: {
      item: "",
      serv: "",
      estr: "",
      tari: "",
      descrip: "",
      med: "",
      ano: "",
      mes: "",
      valor: "",
      cuotas: "",
    },
    nro_cat_w: {
      nro_1: "0",
      nro_2: "0",
      nro_3: "0",
      nro_4: "0",
    },
    mostrar_igac: false,
  },
  computed: {
    descrip_ruta() {
      let busqueda = this.array_rutas.find((e) => e.cod == this.reg_pub.ruteo.ruta);
      return busqueda ? busqueda.descrip : "_";
    },
    descrip_zona() {
      let busqueda = PUB827.find((e) => e.COD == this.reg_pub.zona);
      return busqueda ? busqueda.DESCRIP : "";
    },
    cod_igac_w() {
      return `${this.reg_pub.cod_igac.zona_igac}${this.reg_pub.cod_igac.sector_igac}${this.reg_pub.cod_igac.manzana_igac}${this.reg_pub.cod_igac.predio_igac}${this.reg_pub.cod_igac.condic_igac}`;
    },
  },
  components: {
    clave: require("../../SERVDOM/scripts/clave.vue"),
  },
  created() {
    nombreOpcion("1-3 - Usuarios de Servicios");
    _inputControl("reset");
    _inputControl("disabled");
    this.datoClave();
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
      this.traerUsuarSer();
    },

    esc_clave() {
      this.params_CLAVE.estado = false;
      this.mostrar_CLAVE = false;
      _toggleNav();
    },

    init() {
      if (!$_USUARIO_EMPRESA.ULT_PER.trim()) $_USUARIO_EMPRESA.ULT_PER = this.fecha_act.slice(0, 6);

      postData(
        {
          datosh: moduloDatosEnvio(),
        },
        get_url("app/SERVDOM/GET_TARIF.DLL")
      )
        .then((data) => {
          this.array_tarifas = data.TARIFAS;
          let busqueda = this.array_tarifas.find(e => e.ano == $_USUARIO_EMPRESA.ULT_PER.slice(0,4));
          if(busqueda) this._ventanaNovedad();
          else {
            CON851("", "64", null, "error", "Error");
            _toggleNav();
          }
        })
        .catch((error) => {
          loader("hide");
          if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    _ventanaNovedad() {
      CON850((data) => {
        this.novedad = data.id;
        if (this.novedad == "F") _toggleNav();
        else this.datoCod();
      });
    },

    datoCod() {
      validarInputs(
        {
          form: "#nro_cat",
        },
        this._ventanaNovedad,
        () => {
          this.reg_pub.nro_cat = this.reg_pub.nro_cat.padStart(15, "0");
          if (isNaN(parseInt(this.reg_pub.nro_cat))) this.reg_pub.nro_cat = "000000000000000";

          if (this.novedad == 7 && this.reg_pub.nro_cat == 0) {
            CON851("", "03", null, "error", "Error");
            this.datoCod();
          } else this.leerUsu();
        }
      );
    },

    leerUsu() {
      let busqueda = this.array_usuar_ser.find((e) => e.CUENTA == this.reg_pub.nro_cat);

      switch (this.novedad) {
        case "7":
          if (!busqueda) {
            this.nuevo();
          } else {
            CON851("", "00", null, "error", "Error");
            this.datoCod();
          }
          break;
        case "8":
          if (busqueda) this.cambio();
          else {
            CON851("", "01", null, "error", "Error");
            this.datoCod();
          }
          break;
        case "9":
          if (busqueda) {
            CON851P("02", this.datoCod, () => {
              this.grabar();
            });
          } else {
            CON851("", "01", null, "error", "Error");
            this.datoCod();
          }
          break;
      }
    },

    nuevo() {
      this.datoNombre();
    },

    cambio() {
      loader("show");
      postData(
        { datosh: moduloDatosEnvio() + this.reg_pub.nro_cat + "|" + $_USUARIO_EMPRESA.ULT_PER.slice(0, 4) + "|" },
        get_url("app/SERVDOM/PUB801_01.DLL")
      )
        .then((data) => {
          console.log(data);
          this.reg_pub = data;
          loader("hide");
          this.datoNombre();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _toggleNav();
        });
    },

    datoNombre() {
      validarInputs(
        {
          form: "#nombre",
        },
        this.datoCod,
        () => {
          this.reg_pub.nombre = this.reg_pub.nombre.replaceEsp().toUpperCase();
          this.datoDireccion();
        }
      );
    },

    datoDireccion() {
      validarInputs(
        {
          form: "#direcc",
        },
        this.datoNombre,
        () => {
          this.reg_pub.direcc = this.reg_pub.direcc.replaceEsp().toUpperCase();
          this.datoDocId();
        }
      );
    },

    datoDocId() {
      validarInputs(
        {
          form: "#doc_id",
        },
        this.datoDireccion,
        () => {
          this.datoEstrato();
        }
      );
    },

    datoEstrato() {
      validarInputs(
        {
          form: "#estrato",
        },
        this.datoDocId,
        () => {
          if(this.reg_pub.estrato < 1) {
            CON851("", "03", null, "error", "Error");
            this.datoEstrato();
          } else this.datoCodIgac();
        }
      );
    },

    datoCodIgac() {
      this.mostrar_igac = true;
      this.datoZonaIgac();
    },

    datoZonaIgac() {
      validarInputs(
        {
          form: "#zona_igac",
        },
        () => {
          this.mostrar_igac = false;
          this.datoEstrato();
        },
        () => {
          this.reg_pub.cod_igac.zona_igac = this.reg_pub.cod_igac.zona_igac.padStart(2, "0");
          if (this.reg_pub.cod_igac.zona_igac == 0) {
            this.mostrar_igac = false;
            this.datoHog();
          } else this.datoSectorIgac();
        }
      );
    },

    datoSectorIgac() {
      validarInputs(
        {
          form: "#sector_igac",
        },
        this.datoZonaIgac,
        () => {
          this.reg_pub.cod_igac.sector_igac = this.reg_pub.cod_igac.sector_igac.padStart(2, "0");
          this.datoManzanaIgac();
        }
      );
    },

    datoManzanaIgac() {
      validarInputs(
        {
          form: "#manzana_igac",
        },
        this.datoSectorIgac,
        () => {
          this.reg_pub.cod_igac.manzana_igac = this.reg_pub.cod_igac.manzana_igac.padStart(4, "0");
          this.datoPredioIgac();
        }
      );
    },

    datoPredioIgac() {
      validarInputs(
        {
          form: "#predio_igac",
        },
        this.datoManzanaIgac,
        () => {
          this.reg_pub.cod_igac.predio_igac = this.reg_pub.cod_igac.predio_igac.padStart(4, "0");
          this.datoCondicIgac();
        }
      );
    },

    datoCondicIgac() {
      validarInputs(
        {
          form: "#condic_igac",
        },
        this.datoPredioIgac,
        () => {
          this.reg_pub.cod_igac.condic_igac = this.reg_pub.cod_igac.condic_igac.padStart(3, "0");
          this.mostrar_igac = false;
          this.datoHog();
        }
      );
    },

    datoHog() {
      if (!this.reg_pub.hog_comun.trim()) this.reg_pub.hog_comun = "N";
      validarInputs(
        {
          form: "#hog_comun",
        },
        this.datoEstrato,
        () => {
          this.reg_pub.hog_comun = this.reg_pub.hog_comun.toUpperCase();
          if (this.reg_pub.hog_comun != "S") this.reg_pub.hog_comun = "N";
          this.datoVivInteres();
        }
      );
    },

    datoVivInteres() {
      if (!this.reg_pub.viv_interes.trim()) this.reg_pub.viv_interes = "N";
      validarInputs(
        {
          form: "#viv_interes",
        },
        this.datoHog,
        () => {
          this.reg_pub.viv_interes = this.reg_pub.viv_interes.toUpperCase();
          if (this.reg_pub.viv_interes != "S") this.reg_pub.viv_interes = "N";
          this.datoRet();
        }
      );
    },

    datoFuenteAlt() {
      if (!this.reg_pub.fuente_alt.trim()) this.reg_pub.fuente_alt = "N";
      validarInputs(
        {
          form: "#fuente_alt",
        },
        this.datoVivInteres,
        () => {
          this.reg_pub.fuente_alt = this.reg_pub.fuente_alt.toUpperCase();
          if (this.reg_pub.fuente_alt != "S") this.reg_pub.fuente_alt = "N";
          this.datoRet();
        }
      );
    },

    datoRet() {
      if (!this.reg_pub.retenedor.trim()) this.reg_pub.retenedor = "N";
      validarInputs(
        {
          form: "#retenedor",
        },
        this.datoVivInteres,
        () => {
          this.reg_pub.retenedor = this.reg_pub.retenedor.toUpperCase();
          if (this.reg_pub.retenedor != "S") this.reg_pub.retenedor = "N";
          this.datoNroRut();
        }
      );
    },

    datoNroRut() {
      validarInputs(
        {
          form: "#ruta",
        },
        this.datoRet,
        () => {
          this.reg_pub.ruteo.ruta = this.reg_pub.ruteo.ruta.padStart(2, "0");
          if (this.reg_pub.ruteo.ruta == 0) {
            this.reg_pub.ruteo.mnz_rut = "0000";
            this.reg_pub.ruteo.cas_rut = "0000";
            this.datoZona();
          } else {
            let busqueda = this.array_rutas.find((e) => e.cod == this.reg_pub.ruteo.ruta);
            if (busqueda) this.datoMznRut();
            else {
              CON851("", "01", null, "error", "Error");
              this.datoNroRut();
            }
          }
        }
      );
    },

    datoMznRut() {
      validarInputs(
        {
          form: "#mnz_rut",
        },
        this.datoNroRut,
        () => {
          this.reg_pub.ruteo.mnz_rut = this.reg_pub.ruteo.mnz_rut.padStart(4, "0");
          this.datoCasRut();
        }
      );
    },

    datoCasRut() {
      validarInputs(
        {
          form: "#cas_rut",
        },
        this.datoMznRut,
        () => {
          this.reg_pub.ruteo.cas_rut = this.reg_pub.ruteo.cas_rut.padStart(4, "0");
          this.buscarRutaDup();
        }
      );
    },

    buscarRutaDup() {
      let llave_ruteo = `${this.reg_pub.ruteo.ruta}${this.reg_pub.ruteo.mnz_rut}${this.reg_pub.ruteo.cas_rut}`;
      let busqueda = this.array_usuar_ser.find((e) => e.RUTEO == llave_ruteo);

      if (busqueda) {
        if (this.reg_pub.nro_cat == busqueda.CUENTA) {
          this.datoZona();
        } else {
          CON851("", "Esa ruta ya esta usada");
          this.datoNroRuta();
        }
      } else this.datoZona();
    },

    datoZona() {
      POPUP(
        {
          array: PUB827,
          titulo: "ZONA",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.reg_pub.zona || "1",
          callback_f: this.datoNroRut,
        },
        async (data) => {
          this.reg_pub.zona = data.COD;
          this.datoCodConex();
        }
      );
    },

    datoCodConex() {
      validarInputs(
        {
          form: "#cod_conex",
        },
        this.datoZona,
        () => {
          this.reg_pub.cod_conex.replaceEsp();
          this.iniciarTabla();
        }
      );
    },

    iniciarTabla() {
      this.evaluarItem();
    },

    evaluarItem() {
      if (this.reg_tabla.item < 1 || !this.reg_tabla.item.trim()) {
        this.reg_tabla.item = "1";
        this.datoItem();
      } else if (this.reg_tabla.item > 10) {
        this.reg_tabla.item = "10";
        this.datoObservacion();
      } else this.datoItem();
    },

    datoItem() {
      if (!this.reg_tabla.item.trim()) this.reg_tabla.item = "1";
      validarInputs(
        {
          form: "#item",
          event_f3: () => {
            this.devolver("f3", () => {
              this.datoItem();
            });
          },
          event_f5: () => {
            this.devolver("f5", () => {
              this.datoItem();
            });
          },
        },
        () => {
          if (this.reg_tabla.item == 1) this.datoItem();
          else this.reg_tabla.item = (parseInt(this.reg_tabla.item) - 1).toString();
        },
        () => {
          this.reg_tabla.item = this.reg_tabla.item.padStart(3, "0");
          this.reg_tabla = Object.assign({}, this.reg_pub.tabla_serv[parseInt(this.reg_tabla.item) - 1]);
          this.datoServicio();
        }
      );
    },

    datoServicio() {
      validarInputs(
        {
          form: "#serv",
          event_f3: () => {
            this.devolver("f3");
          },
        },
        this.datoItem,
        async () => {
          if (this.reg_tabla.serv.trim() && this.reg_tabla.serv > 0) {
            let busqueda = this.array_serv.find((e) => e.cod == this.reg_tabla.serv);
            if (busqueda) {
              await this.traerTarifas()
                .then(() => {
                  this.datoEstr();
                })
                .catch((error) => {
                  console.error(error);
                  this.datoServicio();
                });
            } else {
              CON851("", "01", null, "error", "Error");
              this.datoServicio();
            }
          } else {
            this.reg_pub.tabla_serv[parseInt(this.reg_tabla.item) - 1] = this.reg_tabla = {
              item: this.reg_tabla.item,
              serv: "",
              estr: "",
              tari: "",
              med: "",
              ano: "",
              mes: "",
              valor: "",
              cuotas: "",
              medic: "",
            };
            this.datoServicio();
          }
        }
      );
    },

    datoEstr() {
      if (!this.reg_tabla.estr.trim()) this.reg_tabla.estr = this.reg_pub.estrato;
      validarInputs(
        {
          form: "#estr",
        },
        this.datoServicio,
        () => {
          if ([1, 2, 3, 4, 5, 6].includes(parseInt(this.reg_tabla.estr))) {
            this.datoTarifa();
          } else {
            CON851("", "03", null, "error", "Error");
            this.datoEstr();
          }
        }
      );
    },

    datoTarifa() {
      validarInputs(
        {
          form: "#tari",
        },
        this.datoEstr,
        async () => {
          this.reg_tabla.tari = this.reg_tabla.tari.toUpperCase();

          let llave_w = `${$_USUARIO_EMPRESA.ULT_PER.slice(0, 4)}${this.reg_tabla.serv}${this.reg_tabla.estr}${
            this.reg_tabla.tari
          }`;

          this.reg_tarifa_act = this.array_tarifas.find((e) => e.llave == llave_w);
          if (!this.reg_tarifa_act) {
            CON851("", "01", null, "error", "Error");
            this.datoTarifa();
          } else {
            this.buscarDuplicado()
              .then(() => {
                Vue.set(this.reg_tabla, "descrip", this.reg_tarifa_act.descrip);
                this.datoMed();
              })
              .catch((error) => {
                console.error(error);
                CON851("", "05", null, "warning", "");
                this.datoServicio();
              });
          }
        }
      );
    },

    async buscarDuplicado() {
      return new Promise((resolve, reject) => {
        let llave_w = `${this.reg_tabla.serv}${this.reg_tabla.estr}${this.reg_tabla.tari}`;
        let busqueda = this.reg_pub.tabla_serv.find((e) => `${e.serv}${e.estr}${e.tari}` == llave_w);
        if (busqueda) {
          if (busqueda.item != this.reg_tabla.item) reject();
        }

        for (let i in this.reg_pub.tabla_serv) {
          if (
            this.reg_tabla.item != this.reg_pub.tabla_serv[i].item &&
            this.reg_tabla.serv == this.reg_pub.tabla_serv[i].serv &&
            this.reg_tarifa_act.medic == "S" &&
            this.reg_tabla.medic == "S"
          ) {
            reject();
          }
        }

        resolve();
      });
    },

    datoMed() {
      if (this.reg_tarifa_act.period == "N") {
        this.reg_tabla.med = "";
        this.datoAño();
      } else {
        validarInputs(
          {
            form: "#med",
          },
          this.datoTarifa,
          () => {
            this.reg_tabla.med = this.reg_tabla.med.toUpperCase();
            this.datoAño();
          }
        );
      }
    },

    datoAño() {
      validarInputs(
        {
          form: "#ano",
        },
        this.datoMed,
        () => {
          if (this.reg_tabla.ano > 0 && this.reg_tabla.ano < 1990) {
            CON851("", "37", null, "error", "");
            this.datoAño();
          } else if (this.reg_tarifa_act.period == "N" && this.reg_tabla.ano == 0) {
            CON851("", "37", null, "error", "");
            this.datoAño();
          } else this.datoMes();
        }
      );
    },

    datoMes() {
      validarInputs(
        {
          form: "#mes",
        },
        this.datoAño,
        () => {
          if (this.reg_tabla.mes < 0 || this.reg_tabla.mes > 12) {
            CON851("", "37", null, "error", "");
            this.datoMes();
          } else if (this.reg_tarifa_act.period == "N" && this.reg_tabla.mes == 0) {
            CON851("", "37", null, "error", "");
            this.datoMes();
          } else this.datoValor();
        }
      );
    },

    datoValor() {
      if (this.reg_tarifa_act.period == "S") {
        CON851("", "CONCEPTO PERIODICO!", null, "info", "Información");
        this.otroRenglon();
      } else {
        validarInputs(
          {
            form: "#valor",
          },
          this.datoMes,
          () => {
            this.datoCuotas();
          }
        );
      }
    },

    datoCuotas() {
      validarInputs(
        {
          form: "#cuotas",
        },
        this.datoValor,
        () => {
          this.otroRenglon();
        }
      );
    },

    otroRenglon() {
      this.reg_pub.tabla_serv[parseInt(this.reg_tabla.item) - 1] = Object.assign({}, this.reg_tabla);
      this.reg_tabla.item = (parseInt(this.reg_tabla.item) + 1).toString();
      this.evaluarItem();
    },

    datoObservacion() {
      validarInputs(
        {
          form: "#observ",
        },
        this.iniciarTabla,
        () => {
          this.confirmar();
        }
      );
    },

    confirmar() {
      CON851P("01", this.datoObservacion, this.grabar);
    },

    async grabar() {
      loader("show");

      let datos = _getObjetoSave(this.reg_pub, ["tabla_serv"]);

      datos = {
        ...datos,
        novedad: this.novedad,
        datosh: moduloDatosEnvio() + localStorage.Usuario + "|",
        ruteo: `${this.reg_pub.ruteo.ruta}${this.reg_pub.ruteo.mnz_rut}${this.reg_pub.ruteo.cas_rut}`,
      };

      console.log(datos, "datos");

      postData(datos, get_url("app/SERVDOM/PUB103.DLL"))
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
          _toggleNav();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error", null, "error", "");
          loader("hide");
          this.datoObservacion();
        });
    },

    _ventanaUsuarSer() {
      _fin_validar_form();

      _ventana_PUB801(() => {
        this.datoCod();
      }).then((data) => {
        console.log(data.cuenta, data.nombre);
        this.array_usuar_ser = data.datos;
        this.reg_pub.nro_cat = data.cuenta;
        this.reg_pub.nombre = data.nombre;
        this.leerUsu();
      });
    },

    _ventanaTarifas() {
      for (let i in this.array_tarifas) {
        this.array_tarifas[i].cod = this.array_tarifas[i].llave.slice(4);
      }
      _ventanaDatos({
        titulo: "Ventana de Consulta de Tarifas",
        columnas: ["cod", "descrip", "clase", "medic"],
        data: this.array_tarifas,
        callback_esc: () => {
          document.querySelector(".tari").focus();
        },
        callback: (data) => {
          this.reg_tabla.estr = data.cod.slice(1, 2);
          this.reg_tabla.tari = data.cod.slice(2, 3);
          this.reg_tabla.descrip = data.descrip;
          setTimeout(() => {
            _enterInput(".tari");
          }, 200);
        },
      });
    },

    _ventanaRutas() {
      _ventanaDatos({
        titulo: "Ventana de Rutas",
        columnas: ["cod", "descrip"],
        data: this.array_rutas,
        callback_esc: () => {
          document.querySelector(".ruta").focus();
        },
        callback: (data) => {
          this.reg_pub.ruteo.ruta = data.cod;
          setTimeout(() => {
            _enterInput(".ruta");
          }, 200);
        },
      });
    },

    _ventanaServicios() {
      _ventanaDatos({
        titulo: "Ventana de Servicios P.Q.R.",
        columnas: ["cod", "descrip"],
        data: this.array_serv,
        callback_esc: () => {
          document.querySelector(".serv").focus();
        },
        callback: (data) => {
          this.reg_tabla.serv = data.cod;
          setTimeout(() => {
            _enterInput(".serv");
          }, 200);
        },
      });
    },

    traerUsuarSer() {
      postData({ datosh: moduloDatosEnvio() + "1" }, get_url("app/SERVDOM/PUB801.DLL"))
        .then((data) => {
          this.array_usuar_ser = data.USDOM;
          this.traerRutas();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "");
          _toggleNav();
        });
    },

    traerRutas() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB804.DLL"))
        .then((data) => {
          this.array_rutas = data.RUTAS;
          this.traerServicios();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "");
          _toggleNav();
        });
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          this.traerUsoTarif();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    traerUsoTarif() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB806.DLL"))
        .then((data) => {
          this.array_uso_tarif = data.USTAR;
          loader("hide");
          this.init();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    traerTarifas() {
      return new Promise((resolve, reject) => {
        loader("show");
        postData(
          {
            datosh: moduloDatosEnvio() + $_USUARIO_EMPRESA.ULT_PER.slice(0, 4) + "|" + this.reg_tabla.serv + "|",
          },
          get_url("app/SERVDOM/PUB805.DLL")
        )
          .then((data) => {
            loader("hide");
            this.array_tarifas = data.TARIFAS;
            resolve();
          })
          .catch((error) => {
            loader("hide");
            if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "Error");
            reject(error);
          });
      });
    },

    devolver(key, callback_esc) {
      switch (key) {
        case "f3":
          this.datoObservacion();
          break;
        case "f5":
          CON851P("03", callback_esc, _toggleNav);
          break;
      }
    },
  },
});
