// SUI REPORTE P.Q.R - Opcion 8-5 - David.M - 09/09/2021

new Vue({
  el: "#SUI005",
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
    nombreOpcion("8-5 - SUI - P.Q.R");
    _inputControl("reset");
    _inputControl("disabled");
    this.datoFechaArchivo();
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
          this.llamarDLL();
        }
      );
    },

    llamarDLL() {
      CON851P("00", this.datoFechaArchivo, () => {
        let datos = {
          datosh: moduloDatosEnvio(),
          fecha: `${this.ano_gen.slice(2,4)}${this.mes_gen}`,
        };

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.ano_gen} / ${this.mes_gen}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData(datos, get_url("app/SERVDOM/SUI005.DLL"), {
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
        archivo: `PQR1${this.fecha_act.slice(2, 6)}`,
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

    columnas_listado() {
      let columns = [
        {
          title: "CIUDAD",
          value: "ciudad",
        },
        {
          title: "SERV",
          value: "ser",
        },
        {
          title: "RADICADO",
          value: "nro",
        },
        {
          title: "FECHA",
          value: "fecha",
          format: "string",
        },
        {
          title: "TRAMITE",
          value: "tramite",
        },
        {
          title: "CAUSAL",
          value: "equiv2",
        },
        {
          title: "USUARIO",
          value: "usu2",
        },
        {
          title: "FACT",
          value: "fact",
        },
        {
          title: "RESP",
          value: "respuesta",
        },
        {
          title: "FECHA RESP",
          value: "fecha_resp",
          format: "string"
        },
        {
          title: "RADIC RESP",
          value: "radic_resp",
          format: "string"
        },
        {
          title: "FECHA NOT",
          value: "fecha_not",
          format: "string"
        },
        {
          title: "TIPO NOT",
          value: "tipo_not",
        },
        {
          title: "FECHA TRASLADO",
          value: "fecha_ssp",
          format: "string"
        },
      ];

      return columns;
    },
  },
});
