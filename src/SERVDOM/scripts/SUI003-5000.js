// Resumen SUI aseo - Opcion 8-3 - David.M - 07/09/2021

new Vue({
  el: "#SUI003-5000",
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
    nombreOpcion("8-A - Resumen SUI Aseo - 5000 Usuarios");
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

        postData(datos, get_url("app/SERVDOM/SUI003-5000.DLL"), {
          onProgress: (progress) => {
            this.progreso = progress;
          },
        })
          .then(async (data) => {
            data.LISTADO.pop();
            data = data.LISTADO;
            this.loader = false;
            this.label_loader = `GENERANDO IMPRESI??N...`;
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
          CON851("", "Error generando impresi??n", null, "error", "Error");
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
          title: "NUIS ASEO",
          value: "cat",
        },
        {
          title: "NUIS FACT",
          value: "nuis_fact",
        },
        {
          title: "DANE DPT",
          value: "dpt",
        },
        {
          title: "DANE CIU",
          value: "ciu",
        },
        {
          title: "DANE C POBLADO",
          value: "zona",
        },
        {
          title: "PRED UTILIZADA",
          value: "pred_util",
        },
        {
          title: "NRO PREDIAL",
          value: "nro_predial",
        },
        {
          title: "DIRECCION PREDIO",
          value: "direcc",
        },
        {
          title: "FECHA EXPED",
          value: "fecha_fact",
        },
        {
          title: "METODO",
          value: "metodo_tari",
        },
        {
          title: "NUAP",
          value: "nuap",
        },
        {
          title: "FACTURA",
          value: "fact",
        },
        {
          title: "MULTIUSUARIO",
          value: "multiusuario",
        },
        {
          title: "CAUSAL REFACT",
          value: "causal_refact",
        },
        {
          title: "NRO REFACT",
          value: "nro_refact",
        },
        {
          title: "UBICACION",
          value: "ubicacion",
        },
        {
          title: "CLASE USO",
          value: "clase",
        },
        {
          title: "TIPO AFORO",
          value: "aforo",
        },
        {
          title: "SERV PUERTA",
          value: "serv_puerta",
        },
        {
          title: "COD FACTOR",
          value: "cod_factor",
        },
        {
          title: "FACTOR PROD",
          value: "factor_prod",
        },
        {
          title: "INQUILIDATO",
          value: "inquilidato",
        },
        {
          title: "INT SOCIAL",
          value: "int_social",
        },
        {
          title: "H.COMUNIT",
          value: "h_comun",
        },
        {
          title: "DIAS FACT",
          value: "dias",
        },
        {
          title: "TN NA",
          value: "tn_na",
        },
        {
          title: "TN TRLU",
          value: "tn_trlu",
        },
        {
          title: "TON TRBL",
          value: "ton_trbl",
        },
        {
          title: "TON TRA",
          value: "ton_tra",
        },
        {
          title: "TON TRRA",
          value: "ton_trra",
        },
        {
          title: "SERV CONJ",
          value: "serv_conj",
        },
        {
          title: "TARIFA TC",
          value: "tarifa_tc",
        },
        {
          title: "TARIFA TLU",
          value: "tarifa_tlu",
        },
        {
          title: "TARIFA TBL",
          value: "tarifa_tbl",
        },
        {
          title: "TARIFA TRT",
          value: "tarifa_trt",
        },
        {
          title: "TARIFA TTE",
          value: "tarifa_tte",
        },
        {
          title: "TARIFA TDF",
          value: "tarifa_tdf",
        },
        {
          title: "TARIFA TTL",
          value: "tarifa_ttl",
        },
        {
          title: "TARIFA TA",
          value: "tarifa_ta",
        },
        {
          title: "FACTOR SUB",
          value: "factor_sub",
        },
        {
          title: "VLR SUBS",
          value: "vlr_subs",
        },
        {
          title: "VLR SUSCRI",
          value: "vlr_suscri",
        },
        {
          title: "VLR MORA",
          value: "vlr_mora",
        },
        {
          title: "VLR INTERESES",
          value: "vlr_int",
        },
        {
          title: "DESC CALID",
          value: "desc_calid",
        },
        {
          title: "DESC RECLA",
          value: "desc_recla",
        },
        {
          title: "DESC COMPACT",
          value: "desc_compact",
        },
        {
          title: "DEVOLU",
          value: "devolu",
        },
        {
          title: "DEVOL PEND",
          value: "devol_pend",
        },
        {
          title: "OTRAS DEVOL",
          value: "otras_devol",
        },
        {
          title: "VALOR TOTAL",
          value: "total",
        },
        {
          title: "RECAUDO",
          value: "pagos",
        },
      ];

      return columns;
    },
  },
});
