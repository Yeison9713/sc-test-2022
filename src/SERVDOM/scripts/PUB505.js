// Resumen para contabilidad - Opcion 5-5 - David.M - 04/08/2021

new Vue({
  el: "#PUB505",
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
    nombreOpcion("5-5 - Resumen para Contabilidad");
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
          this.llamarDLL();
        }
      );
    },

    llamarDLL() {
      CON851P("00", this.datoFechaArchivo, () => {
        var datos_envio = [`${this.ano_gen}${this.mes_gen}`, localStorage.Usuario];

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.ano_gen}/${this.mes_gen}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData({ datosh: moduloDatosEnvio() + datos_envio.join("|") + "|" }, get_url("app/SERVDOM/PUB505.DLL"), {
          onProgress: (progress) => {
            this.progreso = progress;
          },
        })
          .then((data) => {
            data.LISTADO.pop();
            let nom_temp = data.NOM_TEMP;
            data = data.LISTADO;
            this.loader = false;
            this.label_loader = `GENERANDO IMPRESIÓN...`;
            this.progreso.completado = true;
            this.imprimir(data, nom_temp);
          })
          .catch((err) => {
            console.error(err);
            CON851("", "Error consultando datos", null, "error", "Error");
            this.loader = false;
            this.estado_loader = false;
            this.datoFechaArchivo();
          });
      });
    },

    imprimir(data, nom_temp) {
      let listado = data;

      let nombreEmpresa = $_USUARIO_EMPRESA.NOMBRE.trim();
      let nit = $_USUARIO_EMPRESA.NIT.toString();
      let nit_edit = !isNaN(nit) ? new Intl.NumberFormat("ja-JP").format(nit) : nit;
      let fecha = moment().format("MMM DD/YY - HH:mm");

      if (listado.length < 1) {
        CON851("", "08", null, "warning", "");
        this.estado_loader = false;
        this.datoFechaArchivo();
      } else {
        let header_format = [];
        if (this.formato == 3) {
          header_format = [
            { text: `${nombreEmpresa}`, bold: true, size: 16 },
            `RESUMEN PARA CONTABILIDAD   FECHA GENERACIÓN: ${this.ano_gen}-${this.mes_gen}   NIT: ${nit_edit}`,
            `Fecha de reporte: ${fecha}`,
          ];
        } else {
          header_format = [
            `${nombreEmpresa}`,
            `${nit_edit}`,
            { text: `RESUMEN PARA CONTABILIDAD`, marginTop: 4 },
            { text: `FECHA GENERACIÓN: ${this.ano_gen}-${this.mes_gen}` },
          ];
        }

        listado.forEach((el) => {
          el.vlr_fij = el.vlr_fij.replace(/\ /g, "");
          el.vlr_bas = el.vlr_bas.replace(/\ /g, "");
          el.vlr_com = el.vlr_com.replace(/\ /g, "");
          el.vlr_sun = el.vlr_sun.replace(/\ /g, "");
          el.vlr_sub = el.vlr_sub.replace(/\ /g, "");
          el.vlr_net = el.vlr_net.replace(/\ /g, "");
          el.vlr_int = el.vlr_int.replace(/\ /g, "");
          el.vlr_aju = el.vlr_aju.replace(/\ /g, "");
          el.vlr_otr = el.vlr_otr.replace(/\ /g, "");
        });

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
            this.llamar_PUB505A(nom_temp);
            this.estado_loader = false;
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error generando impresion", null, "error", "Error");
            loader("hide");
            this.datoFechaArchivo();
            this.estado_loader = false;
          });
      }
    },

    llamar_PUB505A(nom_temp) {
      if (this.ano_gen == $_USUA_GLOBAL[0].FECHA_ALFA.slice(16)) {
        CON851P("04", _toggleNav, () => {
          let datos_envio = [`${this.ano_gen}${this.mes_gen}`, nom_temp];

          postData({ datosh: moduloDatosEnvio() + datos_envio.join("|") + "|" }, get_url("app/SERVDOM/PUB505A.DLL"))
            .then(() => {
              CON851("", "Proceso completado", null, "success", "");
              _toggleNav();
            })
            .catch((error) => {
              loader("hide");
              console.error(error);
              CON851("", "Error consultando datos", null, "error", "Error");
              _toggleNav();
            });
        });
      } else {
        _toggleNav();
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
          title: "Servicio",
          value: "descrip_serpq",
          width: "25%",
        },
        {
          title: "Est",
          value: "est",
          width: "3%",
        },
        {
          title: "Cargo Fijo",
          value: "vlr_fij",
          format: "money",
          width: "8%",
        },
        {
          title: "Con Basico",
          value: "vlr_bas",
          format: "money",
          width: "8%",
        },
        {
          title: "Cons Compl",
          value: "vlr_com",
          format: "money",
          width: "8%",
        },
        {
          title: "Cons Suntua",
          value: "vlr_sun",
          format: "money",
          width: "8%",
        },
        {
          title: "Subsidio",
          value: "vlr_sub",
          format: "money",
          width: "8%",
        },
        {
          title: "Neto Mes",
          value: "vlr_net",
          format: "money",
          width: "8%",
        },
        {
          title: "Intereses",
          value: "vlr_int",
          format: "money",
          width: "8%",
        },
        {
          title: "Ajustes",
          value: "vlr_aju",
          format: "money",
          width: "8%",
        },
        {
          title: "Otros",
          value: "vlr_otr",
          format: "money",
          width: "8%",
        },
      ];

      return columns;
    },
  },
});
