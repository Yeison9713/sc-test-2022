// Resumen SUI acueducto - Opcion 8-8 - David.M - 07/09/2021

new Vue({
  el: "#SUI001-5000",
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
    nombreOpcion("8-8 - Resumen SUI Acueducto - 5000 Usuarios");
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

        postData(datos, get_url("app/SERVDOM/SUI001-5000.DLL"), {
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
        archivo: `AC${this.fecha_act.slice(0, 6)}`,
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
          title: "NUIS",
          value: "cat",
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
          format: "string",
        },
        {
          title: "ID SISTEMA",
          value: "id_sistema",
        },
        {
          title: "RUTA LECT",
          value: "ruta_lect",
        },
        {
          title: "DIRECCION PREDIO",
          value: "direcc",
          format: "string",
        },
        {
          title: "TIPO FACT",
          value: "tipo_fact",
        },
        {
          title: "FACTURA",
          value: "fact",
          format: "string",
        },
        {
          title: "FECHA EXPED",
          value: "fecha_fact",
          format: "string",
        },
        {
          title: "FECHA INI PER",
          value: "fecha_ini",
          format: "string",
        },
        {
          title: "MAS DE 15 D SIN PRESENT",
          value: "mas_15_sin_pagar",
        },
        {
          title: "DIAS FACT",
          value: "dia",
        },
        {
          title: "CLASE USO",
          value: "clase",
        },
        {
          title: "U RESID INDEP",
          value: "u_resid_indep",
        },
        {
          title: "U NO RES INDEP",
          value: "u_no_resid_indep",
        },
        {
          title: "H COMU",
          value: "h_comun",
        },
        {
          title: "V INT PRIO",
          value: "v_int_prio",
        },
        {
          title: "SERIAL MEDIDOR",
          value: "serial_med",
        },
        {
          title: "EST MED",
          value: "est_med",
        },
        {
          title: "DET CONSUMO",
          value: "det_consu",
        },
        {
          title: "DET CONSUMO",
          value: "det_consu",
        },
        {
          title: "LECT ANT",
          value: "lec_ant",
        },
        {
          title: "LECT ACT",
          value: "lec_act",
        },
        {
          title: "CONSUMO MTR3",
          value: "consu",
        },
        {
          title: "CONSUMO SUBS MTR3",
          value: "consumo_subs_mtr3",
        },
        {
          title: "CMA",
          value: "cma",
        },
        {
          title: "CMO",
          value: "cmo",
        },
        {
          title: "CMI",
          value: "cmi",
        },
        {
          title: "CMT",
          value: "cmt",
        },
        {
          title: "CONSUMO EXCESIVO",
          value: "suntuario",
        },
        {
          title: "FT SUBS C-FIJO",
          value: "factor_cf",
        },
        {
          title: "VR SUBS C-FIJO",
          value: "vlr_subs_c_fijo",
        },
        {
          title: "FT SUBS CONSUMO",
          value: "factor_cons",
        },
        {
          title: "VR SUBS CONSUMO",
          value: "vlr_subs_consumo",
        },
        {
          title: "CONEXION",
          value: "matric",
        },
        {
          title: "RECONEXION",
          value: "reconex",
        },
        {
          title: "REINSTALACION",
          value: "reinst",
        },
        {
          title: "SUSPENSION",
          value: "susp",
        },
        {
          title: "CORTE",
          value: "corte",
        },
        {
          title: "SALDO A FAVOR",
          value: "anticip",
        },
        {
          title: "DIAS MORA",
          value: "dias_mora",
        },
        {
          title: "VLR MORA",
          value: "vlr_mora",
        },
        {
          title: "INT MORA",
          value: "int_mora",
        },
        {
          title: "DESCUENTOS",
          value: "descuentos",
        },
        {
          title: "VR INT DCTO",
          value: "vlr_int_dcto",
        },
        {
          title: "OTROS",
          value: "otros",
        },
        {
          title: "DEVOLUCIONES",
          value: "devoluciones",
        },
        {
          title: "TOTAL",
          value: "total",
        },
        {
          title: "RECAUDO",
          value: "pag",
        },
      ];

      return columns;
    },
  },
});
