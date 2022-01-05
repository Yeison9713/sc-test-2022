// Resumen SUI aseo - Opcion 8-3 - David.M - 07/09/2021

new Vue({
  el: "#SUI003",
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
    nombreOpcion("8-3 - Resumen SUI Aseo");
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
      let busqueda = this.array_serv.find((e) => e.descrip.toUpperCase().slice(0, 4) == "ASEO");
      if (busqueda) {
        this.serv = busqueda.cod;
        this.llamarDLL();
      } else {
        CON851("", "Servicio de aseo no encontrado", null, "error", "Error");
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

        postData(datos, get_url("app/SERVDOM/SUI003.DLL"), {
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
        archivo: `AS${this.fecha_act.slice(0, 6)}`,
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
          title: "FECHA EXPED",
          value: "fecha_exped",
          format: "string",
        },
        {
          title: "CIUDAD",
          value: "ciudad",
        },
        {
          title: "SECTOR",
          value: "0000",
        },
        {
          title: "SECC",
          value: "00",
        },
        {
          title: "MZN",
          value: "",
        },
        {
          title: "FECHA INI",
          value: "fecha_ini",
          format: "string",
        },
        {
          title: "NRO FACT",
          value: "fact",
        },
        {
          title: "CARGO FIJO",
          value: "car_fijo",
        },
        {
          title: "CARGO VAR",
          value: "car_var",
        },
        {
          title: "CLASE",
          value: "clase",
        },
        {
          title: "COD CLASE",
          value: "cod_clase",
        },
        {
          title: "TIPO FACT",
          value: "tipo_fact",
        },
        {
          title: "DIAx",
          value: "dias",
        },
        {
          title: "AFORO",
          value: "aforo",
        },
        {
          title: "SUBSID",
          value: "subsid",
        },
        {
          title: "AJUSTES",
          value: "ajustes",
        },
        {
          title: "SALDO ANT",
          value: "saldo_ant",
        },
        {
          title: "INTERESES",
          value: "intereses",
        },
        {
          title: "TOTAL FACT",
          value: "total",
        },
        {
          title: "PAGOS",
          value: "pagos",
        },
        {
          title: "FREC RECOL",
          value: "frec_recol",
        },
        {
          title: "FREC BARRIDO",
          value: "frec_barrido",
        },
        {
          title: "TARIFA",
          value: "tarifa",
        },
        {
          title: "DIRECCION",
          value: "direcc",
        },
      ];

      return columns;
    },
  },
});
