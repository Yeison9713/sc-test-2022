// Usuarios x ruta - Opcion 4-4 - David.M - 31/07/2021

new Vue({
  el: "#PUB404",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    formato: "",
    ruta: "",
    descrip_ruta: "Para proceso total 99",
    tipo: "",

    array_rutas: [],
  },
  created() {
    nombreOpcion("4-4 - Catalogo de Usuarios por Ruta");
    _inputControl("reset");
    _inputControl("disabled");
    this.traerRutas();
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
          this.datoRuta();
        }
      );
    },

    datoRuta() {
      validarInputs(
        {
          form: "#ruta",
        },
        this.datoFormato,
        () => {
          this.ruta = this.ruta.padStart(2, "0");
          if (this.ruta == 99) {
            this.descrip_ruta = "PROCESO TOTAL";
            this.datoTipo();
          } else {
            let busqueda = this.array_rutas.find((e) => e.cod == this.ruta.padStart(2, "0"));
            if (busqueda) {
              this.descrip_ruta = busqueda.descrip;
              this.datoTipo();
            } else {
              this.descrip_ruta = "NO EXISTEN USUARIOS CON ESA RUTA";
              this.datoRuta();
            }
          }
        }
      );
    },

    datoTipo() {
      if (!this.tipo.trim()) this.tipo = "*";
      validarInputs(
        {
          form: "#tipo",
        },
        this.datoRuta,
        () => {
          this.llamarDLL();
        }
      );
    },

    llamarDLL() {
      CON851P("00", this.datoTipo, () => {
        var datos_envio = [this.ruta.toString(), this.tipo.toString()];

        this.estado_loader = true;
        this.label_loader = `Procesando`;
        this.progreso = { transferred: 0, speed: 0 };

        postData({ datosh: moduloDatosEnvio() + datos_envio.join("|") + "|" }, get_url("app/SERVDOM/PUB404.DLL"), {
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
            this.datoTipo();
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
        this.datoTipo();
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
            this.datoTipo();
            this.estado_loader = false;
          });
      }
    },

    traerRutas() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB804.DLL"))
        .then((data) => {
          this.array_rutas = data.RUTAS;
          loader("hide");
          this.datoFormato();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando archivo de rutas", null, "error", "");
          loader("hide");
          _toggleNav();
        });
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
