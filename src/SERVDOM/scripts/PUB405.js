// Usuarios x estrato - Opcion 4-5 - David.M - 31/07/2021

new Vue({
  el: "#PUB405",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    formato: "",
    estrato: "",
    tarifa: "",
  },
  created() {
    nombreOpcion("4-5 - Catalogo de Usuarios por Estrato");
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
          this.datoEstrato();
        }
      );
    },

    datoEstrato() {
      if (!this.estrato.trim()) this.estrato = "*";
      validarInputs(
        {
          form: "#estrato",
        },
        this.datoFormato,
        this.datoTarifa
      );
    },

    datoTarifa() {
      if (!this.tarifa.trim()) this.tarifa = "*";
      validarInputs(
        {
          form: "#tarifa",
        },
        this.datoEstrato,
        this.llamarDLL
      );
    },

    llamarDLL() {
      CON851P("00", this.datoTarifa, () => {
        var datos_envio = [this.estrato.toString(), this.tarifa.toString()];

        this.estado_loader = true;
        this.label_loader = `Procesando`;
        this.progreso = { transferred: 0, speed: 0 };

        postData({ datosh: moduloDatosEnvio() + datos_envio.join("|") + "|" }, get_url("app/SERVDOM/PUB405.DLL"), {
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
            this.datoTarifa();
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
        this.datoTarifa();
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
            this.datoTarifa();
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
