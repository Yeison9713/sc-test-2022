// Resumen de facturacion por Edades - Opcion 5-B - David.M - 13/08/2021

new Vue({
  el: "#PUB511",
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
    ano_cor: "",
    mes_cor: "",
    dia_cor: "",
    serv: "",
    discr_usu: "",
    discr_col: "",

    array_serv: [],
  },
  created() {
    nombreOpcion("5-B - Resumen Facturación por Edades");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerServicios();
  },
  computed: {
    descrip_serv() {
      if (this.serv == 9) {
        return "TODOS LOS SERVICIOS";
      } else {
        let busqueda = this.array_serv.find((e) => e.cod == this.serv);
        return busqueda ? busqueda.descrip : "";
      }
    },

    descrip_col() {
      switch (this.discr_col) {
        case "*":
          return "TODAS LAS COLUMNAS";
        case "1":
          return "0 A 30 DIAS VENCIDO";
        case "2":
          return "31 A 60 DIAS VENCID";
        case "3":
          return "61 A 90 DIAS VENCID";
        case "4":
          return "91 A 180 DIAS VENC.";
        case "5":
          return "181 A 360 DIAS VENC";
        case "6":
          return "MAS DE 360 DIAS VEN";
        default:
          return "";
      }
    },
  },
  methods: {
    datoFechaArchivo() {
      validarInputs(
        {
          form: "#fecha_gen",
        },
        _toggleNav,
        () => {
          this.ano_gen = this.ano_gen.padStart(4, "0");
          this.mes_gen = this.mes_gen.padStart(2, "0");
          this.datoFechaCorte();
        }
      );
    },

    datoFechaCorte() {
      if (!this.ano_cor.trim()) this.ano_cor = this.ano_gen;
      if (!this.mes_cor.trim()) this.mes_cor = this.mes_gen;
      if (!this.dia_cor.trim()) {
        if (this.mes_cor == 02) {
          this.dia_cor = "29";
        } else {
          if ([01, 03, 05, 07, 08, 10, 12].includes(parseInt(this.mes_cor))) {
            this.dia_cor = "31";
          } else this.dia_cor = "30";
        }
      }
      validarInputs(
        {
          form: "#fecha_corte",
        },
        this.datoFechaArchivo,
        () => {
          this.ano_cor = this.ano_cor.padStart(4, "0");
          this.mes_cor = this.mes_cor.padStart(2, "0");
          this.dia_cor = this.dia_cor.padStart(2, "0");
          this.corte = `${this.ano_cor}${this.mes_cor}${this.dia_cor}`;

          if (this.ano_cor < this.ano_gen) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaCorte();
          } else if (this.mes_cor < this.mes_gen) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaCorte();
          } else if (this.dia_cor < 1 || this.dia_cor > 31) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaCorte();
          } else {
            setTimeout(() => {
              this.datoServ();
            }, 200);
          }
        }
      );
    },

    datoServ() {
      if (!this.serv.trim()) this.serv = "9";
      validarInputs(
        {
          form: "#serv",
        },
        this.datoFechaCorte,
        () => {
          if (this.serv == 9) {
            this.datoDiscrim();
          } else {
            let busqueda = this.array_serv.find((e) => e.cod == this.serv);
            if (busqueda) this.datoDiscrim();
            else {
              CON851("", "01", null, "error", "Error");
              this.datoServ();
            }
          }
        }
      );
    },

    datoDiscrim() {
      validarInputs(
        {
          form: "#discr_usu",
        },
        this.datoServ,
        () => {
          this.discr_usu = this.discr_usu.toUpperCase();
          if (this.discr_usu != "S") this.discr_usu = "N";
          if (this.discr_usu == "N") {
            this.discr_col = "*";
            this.llamarDLL();
          } else this.datoCol();
        }
      );
    },

    datoCol() {
      if (!this.discr_col.trim()) this.discr_col = "*";
      validarInputs(
        {
          form: "#discr_col",
        },
        this.datoDiscrim,
        () => {
          if (["*", "1", "2", "3", "4", "5", "6"].includes(this.discr_col)) {
            this.llamarDLL();
          } else this.datoCol();
        }
      );
    },

    llamarDLL() {
      CON851P("00", this.datoDiscrim, () => {
        var datos_envio = [
          `${this.ano_gen}${this.mes_gen}`,
          this.corte.toString(),
          this.serv.toString(),
          this.discr_usu.toString(),
          this.discr_col.toString(),
          localStorage.Usuario,
        ];

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.ano_gen}/${this.mes_gen}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData({ datosh: moduloDatosEnvio() + datos_envio.join("|") + "|" }, get_url("app/SERVDOM/PUB511.DLL"), {
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
          `LISTADO DE CARTERA POR EDAD    PERIODO: ${this.ano_gen}/${this.mes_gen}    NIT: ${nit_edit}`,
          `Fecha de reporte: ${fecha}`,
        ];

        listado.forEach((el) => {
          el.cuota_01 = el.cuota_01.replace(/\ /g, "");
          el.cuota_02 = el.cuota_02.replace(/\ /g, "");
          el.cuota_03 = el.cuota_03.replace(/\ /g, "");
          el.cuota_04 = el.cuota_04.replace(/\ /g, "");
          el.cuota_05 = el.cuota_05.replace(/\ /g, "");
          el.cuota_06 = el.cuota_06.replace(/\ /g, "");
          el.cuota_07 = el.cuota_07.replace(/\ /g, "");
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
            this.datoDiscrim();
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
          title: "Usuario",
          value: "descrip",
          format: "string",
        },
        {
          title: "Estrato",
          value: "clase",
          format: "number",
        },
        {
          title: "Factura",
          value: "fact",
          format: "number",
        },
        {
          title: "0 a 30 DIAS",
          value: "cuota_01",
          format: "money",
        },
        {
          title: "31 a 60 DIAS",
          value: "cuota_02",
          format: "money",
        },
        {
          title: "61 a 90 DIAS",
          value: "cuota_03",
          format: "money",
        },
        {
          title: "91 a 180 DIAS",
          value: "cuota_04",
          format: "money",
        },
        {
          title: "181 a 360 DIAS",
          value: "cuota_05",
          format: "money",
        },
        {
          title: "MAS DE 360 DIAS",
          value: "cuota_06",
          format: "money",
        },
        {
          title: "ACUMULADO",
          value: "cuota_07",
          format: "money",
        },
        {
          title: "Dirección",
          value: "direcc",
          format: "string",
        },
      ];

      return columns;
    },
  },
});
