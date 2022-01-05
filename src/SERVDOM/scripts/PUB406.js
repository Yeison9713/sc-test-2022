// Listado de totales por estratificacion - Opcion 4-6 - David.M - 02/08/2021

new Vue({
  el: "#PUB406",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,
  },
  created() {
    nombreOpcion("4-6 - Resumen por estratificación");
    _inputControl("reset");
    _inputControl("disabled");
    this.llamarDLL();
  },
  methods: {
    llamarDLL() {
      CON851P("00", _toggleNav, () => {
        this.estado_loader = true;
        this.label_loader = `Procesando`;
        this.progreso = { transferred: 0, speed: 0 };

        postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB406.DLL"), {
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
            _toggleNav();
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
        _toggleNav();
      } else {
        let header_format = [];
        header_format = [
          `${nombreEmpresa}`,
          `${nit_edit}`,
          { text: `RESUMEN USUARIOS POR ESTRATO`, marginTop: 4 },
        ];

        _impresion2({
          tipo: "list_pdf",
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
            _toggleNav();
            this.estado_loader = false;
          });
      }
    },

    columnas_listado() {
      let columns = [
        {
          title: "Tarifa",
          value: "cod_tab",
          format: "string",
          width: "15%",
        },
        {
          title: "Servicio",
          value: "descrip_serv",
          width: "30%",
        },
        {
          title: "Nombre Tarifa",
          value: "descrip_tar",
          format: "string",
          width: "30%",
        },
        {
          title: "Nro Usua",
          value: "cant",
          width: "15%",
        },
        {
          title: "%",
          value: "porc",
          format: "string",
          width: "10%",
        },
      ];

      return columns;
    },
  },
});
