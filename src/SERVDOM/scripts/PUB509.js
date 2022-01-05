// Resumen de recaudos - Opcion 5-9 - David.M - 12/08/2021

new Vue({
  el: "#PUB509",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    ano_ini: "",
    mes_ini: "",
    dia_ini: "",
    ano_fin: "",
    mes_fin: "",
    dia_fin: "",
    discr_fact: "",
  },
  created() {
    nombreOpcion("5-9 - Resumen de Recaudos por Concepto");
    _inputControl("reset");
    _inputControl("disabled");
    this.datoFechaInicial();
  },
  methods: {
    datoFechaInicial() {
      validarInputs(
        {
          form: "#fecha_ini",
        },
        _toggleNav,
        () => {
          this.ano_ini = this.ano_ini.padStart(4, "0");
          this.mes_ini = this.mes_ini.padStart(2, "0");
          this.dia_ini = this.dia_ini.padStart(2, "0");
          this.inicial = `${this.ano_ini}${this.mes_ini}${this.dia_ini}`;

          this.ano_fin = this.ano_ini;
          this.mes_fin = this.mes_ini;
          if (["01", "03", "05", "07", "08", "10", "12"].includes(this.mes_fin)) {
            this.dia_fin = "31";
          } else this.dia_fin = "30";

          setTimeout(() => {
            this.datoFechaFinal();
          }, 200);
        }
      );
    },

    datoFechaFinal() {
      validarInputs(
        {
          form: "#fecha_fin",
        },
        this.datoFechaInicial,
        () => {
          this.ano_fin = this.ano_fin.padStart(4, "0");
          this.mes_fin = this.mes_fin.padStart(2, "0");
          this.dia_fin = this.dia_fin.padStart(2, "0");
          this.final = `${this.ano_fin}${this.mes_fin}${this.dia_fin}`;

          setTimeout(() => {
            this.datoDiscrim();
          }, 200);
        }
      );
    },

    datoDiscrim() {
      if (!this.discr_fact.trim()) this.discr_fact = "S";
      validarInputs(
        {
          form: "#discr_fact",
        },
        this.datoFechaFinal,
        () => {
          this.discr_fact = this.discr_fact.toUpperCase();
          if (this.discr_fact != "S") this.discr_fact = "N";
          this.llamarDLL();
        }
      );
    },

    llamarDLL() {
      CON851P("00", this.datoDiscrim, () => {
        var datos_envio = [
          this.inicial.toString(),
          this.final.toString(),
          this.discr_fact.toString(),
          localStorage.Usuario,
        ];

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.inicial} - ${this.final}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData({ datosh: moduloDatosEnvio() + datos_envio.join("|") + "|" }, get_url("app/SERVDOM/PUB509.DLL"), {
          onProgress: (progress) => {
            this.progreso = progress;
          },
        })
          .then((data) => {
            data.LISTADO.pop();
            data = data.LISTADO;
            if (data.ERROR) CON851("", data.ERROR, null, "warning", "");
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
            this.datoDiscrim();
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
        this.datoDiscrim();
      } else {
        let header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `RESUMEN DE RECAUDOS POR PERIODO   DESDE: ${this.inicial} - HASTA: ${this.final}    NIT: ${nit_edit}`,
          `Fecha de reporte: ${fecha}`,
        ];

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
            this.datoDiscrim();
            this.estado_loader = false;
          });
      }
    },

    columnas_listado() {
      let columns = [
        {
          title: "Concepto",
          value: "tarifa",
        },
        {
          title: "Periodo Actual",
          value: "vlr_act",
          format: "money",
        },
        {
          title: "Saldo Anterior",
          value: "vlr_ant",
          format: "money",
        },
        {
          title: "Ajustes Fact",
          value: "vlr_aju",
          format: "money",
        },
        {
          title: "Intereses mes",
          value: "vlr_int_mes",
          format: "money",
        },
        {
          title: "Interes Anterior",
          value: "vlr_int_ant",
          format: "money",
        },
        {
          title: "Cuota Refinanciación",
          value: "vlr_ref",
          format: "money",
        },
        {
          title: "Recargos",
          value: "vlr_recar",
          format: "money",
        },
        {
          title: "Acumulado",
          value: "vlr_tot",
          format: "money",
        },
      ];

      return columns;
    },
  },
});
