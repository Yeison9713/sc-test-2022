// Usuarios x codigo - Opcion 4-1 - David.M - 31/07/2021

new Vue({
  el: "#PUB401",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    formato: "",
    ano_ini: "",
    mes_ini: "",
    dia_ini: "",
  },
  created() {
    nombreOpcion("4-1 - Catalogo de Usuarios por Nro Catastral");
    _inputControl("reset");
    _inputControl("disabled");
    this.datoFormato();
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
          this.datoFechaInicial();
        }
      );
    },

    datoFechaInicial() {
      validarInputs(
        {
          form: "#fecha_ini",
        },
        this.datoFormato,
        () => {
          this.ano_ini = this.ano_ini.padStart(4, "0");
          this.mes_ini = this.mes_ini.padStart(2, "0");
          this.dia_ini = this.dia_ini.padStart(2, "0");
          this.fecha_inicial = `${this.ano_ini}${this.mes_ini}${this.dia_ini}`;

          if(this.ano_ini == 0) {
            this.ano_ini = "0000";
            this.mes_ini = "00";
            this.dia_ini = "00";
            this.llamarDLL();
          } else if(this.mes_ini < 1 || this.mes_ini > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaInicial();
          } else if(this.dia_ini < 1 || this.dia_ini > 31) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaInicial();
          } else {
            this.llamarDLL();
          }
        }
      );
    },

    llamarDLL() {
      CON851P("00", this.datoFechaInicial, () => {
        var datos_envio = [`${this.ano_ini}${this.mes_ini}${this.dia_ini}`];

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.ano_ini}/${this.mes_ini}/${this.dia_ini}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData({ datosh: moduloDatosEnvio() + datos_envio.join("|") + "|" }, get_url("app/SERVDOM/PUB401.DLL"), {
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
            this.datoFechaInicial();
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
        this.datoFechaInicial();
      } else {
        let header_format = [];
        if (this.formato == 3) {
          header_format = [
            { text: `${nombreEmpresa}`, bold: true, size: 16 },
            `LISTADO DE USUARIOS DE SERVICIOS PUBLICOS     NIT: ${nit_edit}`,
            `Fecha de reporte: ${fecha}`,
          ];
        } else {
          header_format = [
            `${nombreEmpresa}`,
            `${nit_edit}`,
            { text: `LISTADO DE USUARIOS DE SERVICIOS PUBLICOS`, marginTop: 4 },
          ];
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
            this.datoFechaInicial();
            this.estado_loader = false;
          });
      }
    },

    columnas_listado() {
      let columns = [
        {
          title: "Nro Catastral",
          value: "nro_cat",
          width: "10%",
        },
        {
          title: "Nombre del Usuario de Servicio",
          value: "nombre",
          width: "22%",
        },
        {
          title: "Dirección",
          value: "direcc",
          format: "string",
          width: "22%",
        },
        {
          title: "Identificación",
          value: "doc_id",
          format: "string",
          width: "12%",
        },
        {
          title: "Ruteo",
          value: "ruteo",
          format: "string",
          width: "8%",
        },
        {
          title: "Est",
          value: "estrato",
          width: "3%",
        },
        {
          title: "Servicios configurados",
          value: "servicios",
          format: "string",
          width: "23%",
        },
      ];

      return columns;
    },
  },
});
