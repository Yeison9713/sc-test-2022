// Cuenta de cobro por subsidios - Opcion 5-7 - David.M - 11/08/2021

const { styles_imp, mascara_valor } = require("../../SERVDOM/scripts/globalDom.js");

new Vue({
  el: "#PUB507",
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

    array_serv: [],
  },
  created() {
    nombreOpcion("5-7 - Cuenta de Cobro por Subsidios");
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
        var datos_envio = [`${this.ano_gen}${this.mes_gen}`, this.serv.toString(), localStorage.Usuario];

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.ano_gen}/${this.mes_gen}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData({ datosh: moduloDatosEnvio() + datos_envio.join("|") + "|" }, get_url("app/SERVDOM/PUB507.DLL"), {
          onProgress: (progress) => {
            this.progreso = progress;
          },
        })
          .then((data) => {
            data.LISTADO.pop();
            let nit_ger = data.NIT_GER;
            let cargo_ger = data.CARGO_GER;
            data = data.LISTADO;
            this.loader = false;
            this.label_loader = `GENERANDO IMPRESIÓN...`;
            this.progreso.completado = true;
            this.imprimir(data, nit_ger, cargo_ger);
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

    imprimir(data, nit_ger, cargo_ger) {
      let listado = data;

      if (listado.length < 1) {
        CON851("", "08", null, "warning", "");
        this.estado_loader = false;
        this.datoServ();
      } else {
        listado.forEach((el) => {
          el.vlr_s = el.vlr_s.replace(/\ /g, "");
          el.vlr_usu = el.vlr_usu.replace(/\ /g, "");
          el.vlr_sub = el.vlr_sub.replace(/\ /g, "");
        });

        let tabla = {
          columnas: this.columnas_listado(),
          data: listado,
        };

        _impresion2({
          tipo: "pdf",
          archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmss")}.pdf`,
          content: this.format(tabla, nit_ger, cargo_ger),
        })
          .then(() => {
            this.estado_loader = false;
            CON851("", "Impresion generada correctamente", null, "success", "");
            _toggleNav();
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
          title: "Periodo",
          value: "periodo",
          format: "string",
          width: "12%",
        },
        {
          title: "Tarifa",
          value: "tarifa",
          format: "string",
          width: "14%",
        },
        {
          title: "Usuarios",
          value: "nro_usu",
          width: "14%",
        },
        {
          title: "Valor servicio",
          value: "vlr_s",
          format: "money",
          width: "20%",
        },
        {
          title: "Valor Fac. Usuario",
          value: "vlr_usu",
          format: "money",
          width: "20%",
        },
        {
          title: "Valor subsidio",
          value: "vlr_sub",
          format: "money",
          width: "20%",
        },
      ];

      return columns;
    },

    format(tabla, nit_ger, cargo_ger) {
      return {
        pageMargins: [20, 80, 20, 40],
        images: { logo: `P:\\PROG\\LOGOS\\${$_USUARIO_EMPRESA.NIT}.png` },
        header: function (currentPage, pageCount) {
          return {
            margin: [20, 20, 20, 0],
            stack: [
              {
                style: "left8",
                table: {
                  widths: ["25%", "50%", "25%"],
                  heights: [50],
                  body: [
                    [
                      {
                        margin: [10, 4, 0, 0],
                        stack: [
                          {
                            image: "logo",
                            width: 70,
                            height: 50,
                          },
                        ],
                        border: [true, true, false, true],
                        width: "20%",
                      },
                      {
                        marginTop: 11,
                        style: "center10Bold",
                        stack: [{ text: $_USUARIO_EMPRESA.NOMBRE }, { text: $_USUARIO_EMPRESA.NIT, marginTop: 9 }],
                        width: "60%",
                        border: [false, true, false, true],
                      },
                      {
                        text: "",
                        width: "20%",
                        border: [false, true, true, true],
                      },
                    ],
                  ],
                },
              },
            ],
          };
        },
        content: [
          {
            stack: [
              {
                marginTop: 10,
                style: "left9",
                columns: [
                  { text: "FECHA:", bold: true, width: "10%" },
                  { text: moment().format("MMMM DD/YY").toUpperCase(), width: "50%" },
                  { text: "FACTURA NUMERO:", bold: true, width: "16%" },
                  { text: "______________", width: "15%" },
                ],
              },
              {
                marginTop: 5,
                style: "left9",
                columns: [
                  { text: "CLIENTE:", bold: true, width: "10%" },
                  { text: `${$_USUARIO_EMPRESA.NOMBRE}, ${$_USUARIO_EMPRESA.CIUDAD}`, width: "50%" },
                ],
              },
              {
                marginTop: 5,
                style: "left9",
                columns: [
                  { text: "CONCEPTO:", bold: true, width: "10%" },
                  {
                    text: `Subsidio y contribuciones por la prestación de servicio de ${this.descrip_serv} según facturación ${this.ano_gen}/${this.mes_gen}`,
                    width: "82%",
                  },
                ],
              },
            ],
          },
          {
            margin: [00, 10, 0, 0],
            table: this.llenarFormato(tabla),
            layout: {
              hLineWidth: function (i) {
                if (i == 0 || i == 1 || i == tabla.data.length + 1) return 1;
                else return 0;
              },
              vLineWidth: function (i) {
                if (i == 0 || i <= tabla.columnas.length) return 1;
                else return 0;
              },
              hLineColor: function (i) {
                return i != 0 && i != tabla.data.length + 1 ? "gray" : "black";
              },
              vLineColor: function (i) {
                return i != 0 && i != tabla.columnas.length ? "gray" : "black";
              },
            },
          },
          {
            stack: [
              {
                marginTop: 30,
                style: "left9",
                stack: [
                  { text: nit_ger, bold: true, width: "10%" },
                  { text: cargo_ger, bold: true, width: "50%", marginTop: 3 },
                ],
              },
              {
                marginTop: 5,
                style: "left9",
                alignment: "right",
                text: [
                  { text: "RECIBI, FECHA:  ", bold: true },
                  { text: `_____________________`, width: "82%" },
                ],
              },
            ],
          },
        ],
        styles: styles_imp(),
      };
    },
    llenarFormato(tabla) {
      let table = {
        body: [],
      };

      let row_header = [];
      let widths = [];
      tabla.columnas.forEach((col) => {
        row_header.push({ text: col.title, style: "center9BoldT" });
        if (col.width) {
          widths.push(col.width);
        } else widths.push("*");
      });
      table.widths = widths;

      table.body.push(row_header);

      tabla.data.forEach((row) => {
        let row_content = [];
        tabla.columnas.forEach((col) => {
          let cell = row[col.value],
            style = "";

          switch (col.format) {
            case "money":
              cell = parseFloat(cell.toString().replace(/\,/g, "")) || 0;
              cell = mascara_valor.resolve(parseFloat(cell).toString());
              // cell = `$ ${cell}`;
              style = "right9";
              break;
            case "fecha":
              cell = `${cell.slice(0, 4)}/${cell.slice(4, 6)}/${cell.slice(6)}`;
              style = "center9";
              break;
            case "string":
              cell = cell;
              style = "left9";
              break;
            case "number":
              cell = parseFloat(cell) ? parseFloat(cell) : cell;
              style = "center9";
              break;
            default:
              cell = parseFloat(cell) ? parseFloat(cell) : cell;
              style = "left9";
              break;
          }

          row_content.push({ text: cell, style: col.style ? col.style : style });
        });
        table.body.push(row_content);
      });

      return table;
    },
  },
});
