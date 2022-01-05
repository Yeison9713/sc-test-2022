// Catalogo de Tarifas - Opcion 5-A - David.M - 12/08/2021

const { mascara_valor } = require("../../SERVDOM/scripts/globalDom.js");

new Vue({
  el: "#PUB510",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    periodo: "",
  },
  created() {
    nombreOpcion("5-A - Catálogo de Tarifas");
    _inputControl("reset");
    _inputControl("disabled");
    this.datoPeriodo();
  },
  methods: {
    datoPeriodo() {
      if (!this.periodo.trim()) this.periodo = moment().format("YYYY");
      validarInputs(
        {
          form: "#periodo",
        },
        _toggleNav,
        () => {
          this.periodo = this.periodo.padStart(4, "0");
          this.llamarDLL();
        }
      );
    },

    llamarDLL() {
      CON851P("00", this.datoPeriodo, () => {
        var datos_envio = [this.periodo.toString()];

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.periodo}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData({ datosh: moduloDatosEnvio() + datos_envio.join("|") + "|" }, get_url("app/SERVDOM/PUB510.DLL"), {
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
            this.datoPeriodo();
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
        this.datoPeriodo();
      } else {
        let header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `LISTADO DE TARIFAS   PERIODO: ${this.periodo}    NIT: ${nit_edit}`,
          `Fecha de reporte: ${fecha}`,
        ];

        listado.forEach((el) => {
          if (!isNaN(el.car_fijo)) el.car_fijo = mascara_valor.resolve(el.car_fijo);
          if (!isNaN(el.con_basi)) el.con_basi = mascara_valor.resolve(el.con_basi);
          if (!isNaN(el.con_comp)) el.con_comp = mascara_valor.resolve(el.con_comp);
          if (!isNaN(el.con_sunt)) el.con_sunt = mascara_valor.resolve(el.con_sunt);
          if (!isNaN(el.subsid)) el.subsid = mascara_valor.resolve(el.subsid);
          if (!isNaN(el.neto)) el.neto = mascara_valor.resolve(el.neto);
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
            this.datoPeriodo();
            this.estado_loader = false;
          });
      }
    },

    columnas_listado() {
      let columns = [
        {
          title: "TAR",
          value: "tarifa",
          format: "string",
        },
        {
          title: "M",
          value: "mm",
        },
        {
          title: "Cargo Fijo",
          value: "car_fijo",
          format: "string",
        },
        {
          title: "Con basic",
          value: "con_basi",
          format: "string",
        },
        {
          title: "Con complem",
          value: "con_comp",
          format: "string",
        },
        {
          title: "Con suntuar",
          value: "con_sunt",
          format: "string",
        },
        {
          title: "Subsidio",
          value: "subsid",
          format: "string",
        },
        {
          title: "Neto",
          value: "neto",
          format: "string",
        },
      ];

      return columns;
    },
  },
});
