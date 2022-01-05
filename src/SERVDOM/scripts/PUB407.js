// Listado para lectura medidor - Opcion 4-7 - David.M - 31/07/2021

new Vue({
  el: "#PUB407",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    formato: "",
    ano_gen: "",
    mes_gen: "",
    serv: "",

    array_serv: [],
  },
  created() {
    nombreOpcion("4-7 - Listado para Lectura Medidor");
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
    datoFormato() {
      POPUP(
        {
          titulo: "FORMATO DE IMPRESIÓN",
          indices: [{ id: "id", label: "label" }],
          seleccion: this.formato || 3,
          teclaAlterna: true,
          array: [
            { id: 3, label: "EXCEL" },
            { id: 4, label: "PDF" },
          ],
          callback_f: _toggleNav,
        },
        (data) => {
          this.formato = data.id;
          setTimeout(() => {
            this.datoFechaArchivo();
          }, 200);
        }
      );
    },

    datoFechaArchivo() {
      validarInputs(
        {
          form: "#fecha_gen",
        },
        this.datoFormato,
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
          if (busqueda) this.llamarDLL();
          else {
            CON851("", "01", null, "error", "Error");
            this.datoServ();
          }
        }
      );
    },

    llamarDLL() {
      CON851P("00", this.datoServ, () => {
        var datos_envio = [`${this.ano_gen}${this.mes_gen}`, this.serv.toString()];

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.ano_gen}/${this.mes_gen}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData({ datosh: moduloDatosEnvio() + datos_envio.join("|") + "|" }, get_url("app/SERVDOM/PUB407.DLL"), {
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
            this.datoServ();
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
        this.datoServ();
      } else {
        let header_format = [];
        if (this.formato == 3) {
          header_format = [
            { text: `${nombreEmpresa}`, bold: true, size: 16 },
            `VALIDACIÓN DE FACTURACIÓN     NIT: ${nit_edit}`,
            `Fecha de reporte: ${fecha}`,
          ];
        } else {
          header_format = [`${nombreEmpresa}`, `${nit_edit}`, { text: `VALIDACIÓN DE FACTURACIÓN`, marginTop: 4 }];
        }

        _impresion2({
          tipo: this.formato == 3 ? "excel" : "list_pdf",
          header: header_format,
          logo: `${nit}.png`,
          tabla: {
            columnas: this.columnas_listado(),
            data: listado,
          },
          archivo: localStorage.Usuario + moment().format("-YYMMDD-HHmmss"),
          scale: "75",
          orientation: "landscape",
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
            this.datoServ();
            this.estado_loader = false;
          });
      }
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          this.datoFormato();
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
          title: "Cod Usuario",
          value: "cat",
          width: "10%",
        },
        {
          title: "Nombre del Usuario",
          value: "nombre",
          width: "25%",
        },
        {
          title: "Dirección",
          value: "direcc",
          width: "25%",
        },
        {
          title: "Factura",
          value: "llave",
          format: "number",
          width: "8%",
        },
        {
          title: "Lectura Anterior",
          value: "lec_ant",
          format: "string",
          width: "11%",
          style: "right9"
        },
        {
          title: "Lectura Actual",
          value: "lec_act",
          format: "string",
          width: "11%",
          style: "right9"
        },
        {
          title: "Fecha Lectura",
          value: "fech_cor",
          width: "10%",
        },
      ];

      return columns;
    },
  },
});
