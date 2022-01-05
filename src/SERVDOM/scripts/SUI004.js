// Resumen SUI Tarifas de acueducto alcantarillado y aseo - Opcion 8-4 - David.M - 09/09/2021

const { _editFecha2 } = require("../../SERVDOM/scripts/globalDom");

new Vue({
  el: "#SUI004",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    serv: "",
    ano_ini: "",
    mes_ini: "",
    ano_fin: "",
    mes_fin: "",
    ano_pub: "",
    mes_pub: "",
    dia_pub: "",
    ano_apl: "",
    mes_apl: "",
    dia_apl: "",
    publicacion: "",
    pagina: "",
    fecha_act: moment().format("YYYYMMDD"),

    array_serv: [],
  },
  created() {
    nombreOpcion("8-4 - SUI Tarifas - Acueducto, alcantarillado, aseo");
    _inputControl("reset");
    _inputControl("disabled");
    this.traerServicios();
  },
  computed: {
    descrip_serv() {
      let busqueda = this.array_serv.find((e) => e.cod == this.serv);
      return busqueda ? busqueda.descrip : "";
    },
  },
  methods: {
    datoServ() {
      validarInputs(
        {
          form: "#serv",
        },
        _toggleNav,
        () => {
          let busqueda = this.array_serv.find((e) => e.cod == this.serv);
          if (busqueda) {
            this.datoFechaIni();
          } else {
            CON851("", "01", null, "error", "Error");
            this.datoServ();
          }
        }
      );
    },

    datoFechaIni() {
      if (!this.mes_ini.trim()) {
        this.ano_ini = $_USUARIO_EMPRESA.ULT_PER.slice(0, 4);
        this.mes_ini = $_USUARIO_EMPRESA.ULT_PER.slice(4);
      }
      validarInputs(
        {
          form: "#fecha_ini",
        },
        this.datoServ,
        () => {
          this.ano_ini = this.ano_ini.padStart(4, "0");
          this.mes_ini = this.mes_ini.padStart(2, "0");
          if (this.ano_ini < 2000) {
            CON851("", "03", null, "error", "Error");
            this.datoFechaIni();
          } else if (this.mes_ini < 1 || this.mes_ini > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaIni();
          } else {
            this.ano_fin = this.ano_pub = this.ano_apl = this.ano_ini;
            this.datoFechaFin();
          }
        }
      );
    },

    datoFechaFin() {
      if (!this.mes_fin.trim()) {
        this.ano_fin = this.ano_ini;
        this.mes_fin = this.mes_ini;
      }
      validarInputs(
        {
          form: "#fecha_fin",
          orden: "2",
        },
        this.datoFechaIni,
        () => {
          this.ano_fin = this.ano_fin.padStart(4, "0");
          this.mes_fin = this.mes_fin.padStart(2, "0");
          if (this.mes_fin < 1 || this.mes_fin > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaFin();
          } else if (parseInt(this.mes_fin) < parseInt(this.mes_ini)) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaFin();
          } else {
            this.datoFechaPub();
          }
        }
      );
    },

    datoFechaPub() {
      if (!this.mes_pub.trim()) {
        this.ano_pub = this.ano_ini;
        this.mes_pub = this.mes_ini;
        this.dia_pub = "01";
      }
      validarInputs(
        {
          form: "#fecha_pub",
        },
        this.datoFechaFin,
        () => {
          this.ano_pub = this.ano_pub.padStart(4, "0");
          this.mes_pub = this.mes_pub.padStart(2, "0");
          this.dia_pub = this.dia_pub.padStart(2, "0");
          if (this.ano_pub < 2000) {
            CON851("", "03", null, "error", "Error");
            this.datoFechaPub();
          } else if (this.mes_pub < 1 || this.mes_pub > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaPub();
          } else if (this.dia_pub < 1 || this.dia_pub > 31) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaPub();
          } else {
            this.datoFechaApl();
          }
        }
      );
    },

    datoFechaApl() {
      if (!this.mes_apl.trim()) {
        this.ano_apl = this.ano_ini;
        this.mes_apl = this.mes_ini;
        this.dia_apl = "01";
      }
      validarInputs(
        {
          form: "#fecha_apl",
        },
        this.datoFechaPub,
        () => {
          this.ano_apl = this.ano_apl.padStart(4, "0");
          this.mes_apl = this.mes_apl.padStart(2, "0");
          this.dia_apl = this.dia_apl.padStart(2, "0");
          if (this.ano_apl < 2000) {
            CON851("", "03", null, "error", "Error");
            this.datoFechaApl();
          } else if (this.mes_apl < 1 || this.mes_apl > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaApl();
          } else if (this.dia_apl < 1 || this.dia_apl > 31) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaApl();
          } else {
            this.datoPublicacion();
          }
        }
      );
    },

    datoPublicacion() {
      if (this.publicacion == 0) this.publicacion = "2";
      validarInputs(
        {
          form: "#publicacion",
        },
        this.datoFechaApl,
        () => {
          if (this.publicacion == 0) {
            CON851("", "02", null, "error", "Error");
            this.datoPublicacion();
          } else {
            this.datoPagina();
          }
        }
      );
    },

    datoPagina() {
      if (this.publicacion == 0) {
        this.pagina = "";
        this.llamarDLL();
      } else {
        validarInputs(
          {
            form: "#pagina",
          },
          this.datoPublicacion,
          () => {
            this.llamarDLL();
          }
        );
      }
    },

    llamarDLL() {
      CON851P("00", this.datoPublicacion, () => {
        let datos = {
          datosh: moduloDatosEnvio(),
          serv: this.serv,
          fecha_ini: `${this.ano_ini}${this.mes_ini}`,
          fecha_fin: `${this.ano_fin}${this.mes_fin}`,
        };

        this.estado_loader = true;
        this.label_loader = `Procesando: ${datos.fecha_ini} / ${datos.fecha_fin}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData(datos, get_url("app/SERVDOM/SUI004.DLL"), {
          onProgress: (progress) => {
            this.progreso = progress;
          },
        })
          .then(async (data) => {
            data.LISTADO.pop();
            data = data.LISTADO;
            this.loader = false;
            this.label_loader = `GENERANDO IMPRESIÓN...`;
            this.progreso.completado = true;

            data.forEach((el) => {
              el.publicacion = this.publicacion;
              el.pagina = this.pagina;
              el.fecha_pub = _editFecha2(`${this.ano_pub}${this.mes_pub}${this.dia_pub}`);
              el.fecha_apl = _editFecha2(`${this.ano_apl}${this.mes_apl}${this.dia_apl}`);
            });

            this.format_csv(data);
          })
          .catch((err) => {
            console.error(err);
            CON851("", "Error consultando datos", null, "error", "Error");
            this.loader = false;
            this.estado_loader = false;
            this.datoPublicacion();
          });
      });
    },

    async format_csv(datos) {
      let array_columns = this.columnas_listado();

      _impresion2({
        tipo: "csv",
        ruta_guardado: "C:\\PROSOFT\\ENVIOS\\",
        archivo: `AC${this.fecha_act.slice(0, 6)}`,
        datos: datos,
        opts: { header: false },
        columnas: array_columns,
      })
        .then(() => {
          this.estado_loader = false;
          CON851("", "Impreso Correctamente", null, "success", "Exito");
          _toggleNav();
        })
        .catch(() => {
          this.estado_loader = false;
          CON851("", "Error generando impresión", null, "error", "Error");
          CON851("", "Puede que tenga el archivo abierto", null, "warning", "");
          this.datoPublicacion();
        });
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          this.datoServ();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
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
          this.serv = data.cod;
          setTimeout(() => {
            _enterInput(".serv");
          }, 200);
        },
      });
    },

    columnas_listado() {
      let columns = [
        {
          value: "ciudad",
        },
        {
          value: "ubicacion",
        },
        {
          value: "mes",
        },
        {
          value: "tipo_clase",
        },
        {
          value: "clase",
        },
        {
          value: "car_fijo",
        },
        {
          value: "basi",
        },
        {
          value: "comp",
        },
        {
          value: "sunt",
        },
        {
          value: "vlr_1",
        },
        {
          value: "vlr_2",
        },
        {
          value: "publicacion",
        },
        {
          value: "pagina",
        },
        {
          value: "fecha_pub",
        },
        {
          value: "fecha_apl",
        },
      ];

      return columns;
    },
  },
});
