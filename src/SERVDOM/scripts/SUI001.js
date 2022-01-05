// Resumen SUI acueducto - Opcion 8-1 - David.M - 07/09/2021

new Vue({
  el: "#SUI001",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    ano_gen: "",
    mes_gen: "",
    serv: "",
    fecha_act: moment().format("YYYYMMDD"),

    array_serv: [],
  },
  created() {
    nombreOpcion("8-1 - Resumen SUI Acueducto");
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
    datoFechaArchivo() {
      if (!this.mes_gen.trim()) {
        this.ano_gen = $_USUARIO_EMPRESA.ULT_PER.slice(0, 4);
        this.mes_gen = $_USUARIO_EMPRESA.ULT_PER.slice(4);
      }
      validarInputs(
        {
          form: "#fecha_gen",
        },
        _toggleNav,
        () => {
          this.ano_gen = this.ano_gen.padStart(4, "0");
          this.mes_gen = this.mes_gen.padStart(2, "0");
          this.datoServ();
        }
      );
    },

    datoServ() {
      let busqueda = this.array_serv.find((e) => e.descrip.toUpperCase().slice(0, 5) == "ACUED");
      if (busqueda) {
        this.serv = busqueda.cod;
        this.llamarDLL();
      } else {
        CON851("", "Servicio de acueducto no encontrado", null, "error", "Error");
        this.datoFechaArchivo();
      }
    },

    llamarDLL() {
      CON851P("00", this.datoFechaArchivo, () => {
        let datos = {
          datosh: moduloDatosEnvio(),
          fecha: `${this.ano_gen}${this.mes_gen}`,
          serv: this.serv,
        };

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.ano_gen} / ${this.mes_gen}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData(datos, get_url("app/SERVDOM/SUI001.DLL"), {
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

            this.format_csv(data);
          })
          .catch((err) => {
            console.error(err);
            CON851("", "Error consultando datos", null, "error", "Error");
            this.loader = false;
            this.estado_loader = false;
            this.datoFechaArchivo();
          });
      });
    },

    async format_csv(datos) {
      let array_columns = this.columnas_listado();

      for (let i in array_columns) {
        array_columns[i]["label"] = array_columns[i].title;
      }

      _impresion2({
        tipo: "csv",
        ruta_guardado: "C:\\PROSOFT\\ENVIOS\\",
        archivo: `AC${this.fecha_act.slice(0,6)}`,
        datos: datos,
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
          this.datoFechaArchivo();
        });
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          this.datoFechaArchivo();
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
          title: "NUID",
          value: "cat",
        },
        {
          title: "CTA",
          value: "cat",
        },
        {
          title: "DPT",
          value: "dpt",
        },
        {
          title: "CIU",
          value: "ciu",
        },
        {
          title: "ZON",
          value: "zona",
        },
        {
          title: "SECT",
          value: "sector",
        },
        {
          title: "MZ",
          value: "manzana",
        },
        {
          title: "PRED",
          value: "predio",
        },
        {
          title: "COND",
          value: "condic",
        },
        {
          title: "DIR",
          value: "direcc",
        },
        {
          title: "FACT",
          value: "fact",
        },
        {
          title: "F. EXP",
          value: "fecha_fact",
          format: "string",
        },
        {
          title: "F. INI",
          value: "fecha_ini",
          format: "string",
        },
        {
          title: "DIA",
          value: "dia",
        },
        {
          title: "CLAS",
          value: "clase",
        },
        {
          title: "MULT R",
          value: "",
        },
        {
          title: "MULT NR",
          value: "",
        },
        {
          title: "H.COMU",
          value: "h_comun",
        },
        {
          title: "EST MED",
          value: "est_med",
        },
        {
          title: "DET CONSU",
          value: "det_consu",
        },
        {
          title: "LEC ANT",
          value: "lec_ant",
        },
        {
          title: "LEC ACT",
          value: "lec_act",
        },
        {
          title: "CONSU",
          value: "consu",
        },
        {
          title: "CARG FIJ",
          value: "car_fijo",
        },
        {
          title: "BASIC",
          value: "basi",
        },
        {
          title: "COMPLEM",
          value: "comp",
        },
        {
          title: "SUNT",
          value: "sunt",
        },
        {
          title: "CMT",
          value: "cmt",
        },
        {
          title: "UNIT",
          value: "unit",
        },
        {
          title: "BRUTO",
          value: "bruto",
        },
        {
          title: "SUBSID",
          value: "subsid",
        },
        {
          title: "CONTRIB",
          value: "contrib",
        },
        {
          title: "FTOR CF",
          value: "factor_cf",
        },
        {
          title: "FTOR CONS",
          value: "factor_cons",
        },
        {
          title: "MATRIC",
          value: "matric",
        },
        {
          title: "RECONEX",
          value: "reconex",
        },
        {
          title: "REINST",
          value: "reinst",
        },
        {
          title: "SUSP",
          value: "susp",
        },
        {
          title: "CORTE",
          value: "corte",
        },
        {
          title: "ANTICIP",
          value: "anticip",
        },
        {
          title: "MORA",
          value: "dias_mora",
        },
        {
          title: "VLR MORA",
          value: "vlr_mora",
          format: "money",
        },
        {
          title: "INT MORA",
          value: "int_mora",
        },
        {
          title: "OTROS",
          value: "otros",
        },
        {
          title: "CAUS",
          value: "caus",
        },
        {
          title: "NRO REFA",
          value: "nro_refa",
        },
        {
          title: "TOT",
          value: "total",
          format: "money",
        },
        {
          title: "PAG",
          value: "pag",
          format: "money",
        },
      ];

      return columns;
    },
  },
});
