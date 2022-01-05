// Facturacion x estrato - Opcion 5-1 - David.M - 02/08/2021

new Vue({
  el: "#PUB501",
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
    ruta: "",

    descripciones: {},

    array_serv: [],
  },
  created() {
    nombreOpcion("5-1 - Resumen Facturación por Estrato");
    _inputControl("reset");
    _inputControl("disabled");
    this.traerServicios();
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
          this.datoRuta();
        }
      );
    },

    datoRuta() {
      if (!this.ruta.trim()) this.ruta = "*";
      validarInputs(
        {
          form: "#ruta",
        },
        this.datoFechaArchivo,
        () => {
          if (this.ruta == "*" || parseInt(this.ruta)) {
            this.titulosServ();
          } else this.datoRuta();
        }
      );
    },

    titulosServ() {
      for (let i = 0; i < 6; i++) {
        let busqueda = this.array_serv.find((e) => e.cod == (parseInt(i) + 1).toString());
        this.descripciones[`serv${parseInt(i) + 1}`] = busqueda ? busqueda.descrip : `Serv ${parseInt(i) + 1}`;

        if (i == 5) this.llamarDLL();
      }
    },

    llamarDLL() {
      CON851P("00", this.datoRuta, () => {
        var datos_envio = [`${this.ano_gen}${this.mes_gen}`, this.ruta.toString()];

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.ano_gen}/${this.mes_gen}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData({ datosh: moduloDatosEnvio() + datos_envio.join("|") + "|" }, get_url("app/SERVDOM/PUB501.DLL"), {
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
            this.datoRuta();
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
        this.datoRuta();
      } else {
        let header_format = [];
        if (this.formato == 3) {
          header_format = [
            { text: `${nombreEmpresa}`, bold: true, size: 16 },
            `RESUMEN POR ESTRATO     NIT: ${nit_edit}`,
            `Fecha de reporte: ${fecha}`,
          ];
        } else {
          header_format = [`${nombreEmpresa}`, `${nit_edit}`, { text: `RESUMEN POR ESTRATO`, marginTop: 4 }];
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
          filas: {
            preTable: [
              { merge: [5, 9], text: "Facturación por Periodos" },
              { merge: [10, 16], text: "Facturación por Conceptos" },
            ],
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
            this.datoRuta();
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

    columnas_listado() {
      let columns = [
        {
          title: "Est",
          value: "est",
          width: "2%",
          style: {
            fontSize: 7,
          },
        },
        {
          title: "Cant",
          value: "cant",
          width: "3%",
          style: {
            fontSize: 7,
          },
        },
        {
          title: "Del Periodo",
          value: "per_act",
          format: "money",
          width: "6.5%",
          style: {
            fontSize: 7,
            alignment: "right",
          },
        },
        {
          title: "Cuota refinanciación",
          value: "cuota_ref",
          format: "string",
          width: "9%",
          style: {
            fontSize: 7,
            alignment: "right",
          },
        },
        {
          title: "Ajustes",
          value: "aju_mes",
          format: "money",
          width: "6.5%",
          style: {
            fontSize: 7,
            alignment: "right",
          },
        },
        {
          title: "Saldo anterior",
          value: "sdo_ant",
          format: "money",
          width: "6.5%",
          style: {
            fontSize: 7,
            alignment: "right",
          },
        },
        {
          title: "Interes anterior",
          value: "int_ant",
          format: "money",
          width: "6.5%",
          style: {
            fontSize: 7,
            alignment: "right",
          },
        },
        {
          title: "Interes mes",
          value: "int_mes",
          format: "money",
          width: "6.5%",
          style: {
            fontSize: 7,
            alignment: "right",
          },
        },
        {
          title: "Total",
          value: "vlr_tot",
          format: "money",
          width: "6.5%",
          style: {
            fontSize: 7,
            alignment: "right",
          },
        },
        {
          title: this.descripciones.serv1,
          value: "serv1",
          width: "7%",
          style: {
            fontSize: 7,
            alignment: "right",
          },
        },
        {
          title: this.descripciones.serv2,
          value: "serv2",
          width: "11%",
          style: {
            fontSize: 7,
            alignment: "right",
          },
        },
        {
          title: this.descripciones.serv3,
          value: "serv3",
          width: "7%",
          style: {
            fontSize: 7,
            alignment: "right",
          },
        },
        {
          title: this.descripciones.serv4,
          value: "serv4",
          width: "7%",
          style: {
            fontSize: 7,
            alignment: "right",
          },
        },
        {
          title: this.descripciones.serv5,
          value: "serv5",
          width: "7%",
          style: {
            fontSize: 7,
            alignment: "right",
          },
        },
        {
          title: this.descripciones.serv6,
          value: "serv6",
          width: "8%",
          style: {
            fontSize: 7,
            alignment: "right",
          },
        },
      ];

      return columns;
    },
  },
});
