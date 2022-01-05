// Listado de consumos por medición - Opcion 5-D - David.M - 17/08/2021

new Vue({
  el: "#PUB515",
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
    medicion: "",
    criticos: "",
    ordenar: "",
    resumido: "",

    array_serv: [],
  },
  created() {
    nombreOpcion("5-D - Listado de Consumos por Medición");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
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
      if (!this.ano_gen.trim()) this.ano_gen = $_USUARIO_EMPRESA.ULT_PER.slice(0, 4);
      if (!this.mes_gen.trim()) this.mes_gen = $_USUARIO_EMPRESA.ULT_PER.slice(4, 6);
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
      if (!this.serv.trim()) this.serv = "1";
      validarInputs(
        {
          form: "#serv",
        },
        this.datoFechaArchivo,
        () => {
          let busqueda = this.array_serv.find((e) => e.cod == this.serv);
          if (busqueda) this.datoMedicion();
          else {
            CON851("", "01", null, "error", "Error");
            this.datoServ();
          }
        }
      );
    },

    datoMedicion() {
      if (!this.medicion.trim()) this.medicion = "S";
      validarInputs(
        {
          form: "#medicion",
        },
        this.datoServ,
        () => {
          this.medicion = this.medicion.toUpperCase();
          if (this.medicion != "S") this.medicion = "N";
          this.datoCriticos();
        }
      );
    },

    datoCriticos() {
      if (!this.criticos.trim()) this.criticos = "S";
      validarInputs(
        {
          form: "#criticos",
        },
        this.datoMedicion,
        () => {
          this.criticos = this.criticos.toUpperCase();
          if (this.criticos != "S") this.criticos = "N";
          this.datoOrdenar();
        }
      );
    },

    datoOrdenar() {
      if (!this.ordenar.trim()) this.ordenar = "S";
      validarInputs(
        {
          form: "#ordenar",
        },
        this.datoCriticos,
        () => {
          this.ordenar = this.ordenar.toUpperCase();
          if (this.ordenar != "S") this.ordenar = "N";
          this.datoResumido();
        }
      );
    },

    datoResumido() {
      if (!this.resumido.trim()) this.resumido = "N";
      validarInputs(
        {
          form: "#resumido",
        },
        this.datoOrdenar,
        () => {
          this.resumido = this.resumido.toUpperCase();
          if (this.resumido != "S") this.resumido = "N";
          this.llamarDLL();
        }
      );
    },

    llamarDLL() {
      CON851P("00", this.datoResumido, () => {
        var datos_envio = [
          `${this.ano_gen}${this.mes_gen}`,
          this.serv.toString(),
          this.medicion,
          this.criticos,
          this.ordenar,
          this.resumido,
          localStorage.Usuario,
        ];

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.ano_gen}/${this.mes_gen}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData({ datosh: moduloDatosEnvio() + datos_envio.join("|") + "|" }, get_url("app/SERVDOM/PUB515.DLL"), {
          onProgress: (progress) => {
            this.progreso = progress;
          },
        })
          .then((data) => {
            data.LISTADO.pop();
            data = data.LISTADO;
            this.loader = false;
            this.label_loader = `GENERANDO IMPRESIÓN...`;
            this.progreso.completado = true;
            this.imprimir(data);
          })
          .catch((err) => {
            console.error(err);
            CON851("", "Error consultando datos", null, "error", "Error");
            this.loader = false;
            this.estado_loader = false;
            this.datoResumido();
          });
      });
    },

    imprimir(data) {
      let listado = data;

      let nombreEmpresa = $_USUARIO_EMPRESA.NOMBRE.trim();
      let nit = $_USUARIO_EMPRESA.NIT.toString();
      let nit_edit = !isNaN(nit) ? new Intl.NumberFormat("ja-JP").format(nit) : nit;
      let fecha = moment().format("MMM DD/YY - HH:mm");

      if (listado.length < 1) {
        CON851("", "08", null, "warning", "");
        this.estado_loader = false;
        this.datoResumido();
      } else {
        let header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `RESUMEN DE CONSUMOS    PERIODO: ${this.ano_gen}/${this.mes_gen}    NIT: ${nit_edit}`,
          `Fecha de reporte: ${fecha}`,
        ];

        listado.forEach((el) => {
          el.promedio = el.promedio.replace(/\ /g, "");
          el.lec_act = el.lec_act.replace(/\ /g, "");
          el.lec_prx = el.lec_prx.replace(/\ /g, "");
          el.consumo = el.consumo.replace(/\ /g, "");
          el.consumo_fac = el.consumo_fac.replace(/\ /g, "");
        });

        _impresion2({
          tipo: "excel",
          header: header_format,
          logo: `${nit}.png`,
          tabla: {
            columnas: this.columnas_listado(),
            data: listado,
          },
          archivo: localStorage.Usuario + moment().format("-YYMMDD-HHmmss"),
          scale: "75",
          orientation: "landscape",
          filas: {
            preTable: [{ merge: [6, 11], text: "Últimos consumos" }],
          },
        })
          .then(() => {
            CON851("", "Generando informe", null, "success", "");
            loader("hide");
            _toggleNav();
            this.estado_loader = false;
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error generando impresion", null, "error", "Error");
            loader("hide");
            this.datoResumido();
            this.estado_loader = false;
          });
      }
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          loader("hide");
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
          title: "Código",
          value: "cat",
          format: "number",
        },
        {
          title: "Factura",
          value: "fact",
          format: "number",
        },
        {
          title: "Nombre de Usuario",
          value: "nombre",
          format: "string",
        },
        {
          title: "Dirección",
          value: "direcc",
          format: "string",
        },
        {
          title: "Estrato",
          value: "est",
          format: "number",
        },
        {
          title: "1",
          value: "ult_cons_1",
          format: "string",
        },
        {
          title: "2",
          value: "ult_cons_2",
          format: "string",
        },
        {
          title: "3",
          value: "ult_cons_3",
          format: "string",
        },
        {
          title: "4",
          value: "ult_cons_4",
          format: "string",
        },
        {
          title: "5",
          value: "ult_cons_5",
          format: "string",
        },
        {
          title: "6",
          value: "ult_cons_6",
          format: "string",
        },
        {
          title: "Promedio",
          value: "promedio",
          format: "money",
        },
        {
          title: "Lect Anter",
          value: "lec_act",
          format: "money",
        },
        {
          title: "Lect Prox",
          value: "lec_prx",
          format: "money",
        },
        {
          title: "Consumo",
          value: "consumo",
          format: "money",
        },
        {
          title: "Consumo fact",
          value: "consumo_fac",
          format: "money",
        },
        {
          title: "Novedad en Lectura",
          value: "noved_lec",
          format: "string",
        },
      ];

      return columns;
    },
  },
});
