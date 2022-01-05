// Informe H.C Abiertas - 9-5-4 - 04/05/2021 - David.M

new Vue({
  el: "#HC9054",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    ano_ini: 0,
    mes_ini: 0,
    dia_ini: 0,
    unserv: "",
    array_unserv: [],
    fecha_act: moment().format("YYYYMMDD"),
    nit_usu: $_USUA_GLOBAL[0].NIT,
  },
  created() {
    nombreOpcion("9-5-1 - Informe H.C Abiertas");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerUnserv();
  },
  computed: {
    descrip_unserv() {
      if (this.unserv == "**") {
        return "Todas las unidades de servicio";
      } else {
        let busqueda = this.array_unserv.find((e) => e.COD == this.unserv);
        return busqueda ? busqueda.DESCRIP : "";
      }
    },
  },
  methods: {
    datoFechaIni(orden) {
      if (!this.mes_ini) {
        this.ano_ini = this.fecha_act.slice(0, 4);
        this.mes_ini = this.fecha_act.slice(4, 6);
        this.dia_ini = "01";
      }
      validarInputs(
        {
          form: "#fecha_inicial",
          orden: orden,
        },
        () => {
          _regresar_menuhis();
        },
        () => {
          this.ano_ini = cerosIzq(this.ano_ini, 4);
          this.mes_ini = cerosIzq(this.mes_ini, 2);
          this.dia_ini = cerosIzq(this.dia_ini, 2);
          this.inicial = `${this.ano_ini}${this.mes_ini}${this.dia_ini}`;

          if (this.ano_ini < 2008) {
            CON851("", "37", null, "error", "");
            this.datoFechaIni("1");
          } else if (isNaN(moment(this.inicial).format("YYYYMMDD"))) {
            CON851("", "37", null, "error", "");
            this.datoFechaIni("3");
          } else {
            this.datoUnidad();
          }
        }
      );
    },

    datoUnidad() {
      if (!this.unserv.trim()) this.unserv = "**";
      validarInputs(
        {
          form: "#unserv",
        },
        () => {
          this.datoFechaIni("3");
        },
        () => {
          if (this.unserv == "**") {
            this.consultaDll();
          } else {
            if (this.unserv.trim()) {
              let busqueda = this.array_unserv.find((e) => e.COD == this.unserv);
              if (busqueda) {
                if (busqueda.ESTADO == "S") {
                  this.consultaDll();
                } else {
                  CON851("", "03", null, "error", "");
                  this.datoUnidad();
                }
              } else {
                CON851("", "01", null, "error", "");
                this.datoUnidad();
              }
            } else {
              CON851("", "01", null, "error", "");
              this.datoUnidad();
            }
          }
        }
      );
    },

    consultaDll() {
      CON851P(
        "00",
        () => {
          this.datoUnidad();
        },
        () => {
          let datos = [this.inicial, this.unserv];

          this.estado_loader = true;
          this.label_loader = `Procesando: ${moment(this.inicial).format("YYYY/MM/DD")} - ${moment(this.final).format(
            "YYYY/MM/DD"
          )}`;
          this.progreso = { transferred: 0, speed: 0 };

          postData({ datosh: datosEnvio() + datos.join("|") + "|" }, get_url("app/HICLIN/HC9054.DLL"), {
            onProgress: (progress) => {
              this.progreso = progress;
            },
          })
            .then((data) => {
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
              this.datoUnidad();
            });
        }
      );
    },

    imprimir(data) {
      data.LISTADO.pop();

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = this.nit_usu.toString();
      let fecha = moment().format("MMM DD/YY - HH:mm");

      for (let i in data.LISTADO) {
        data.LISTADO[i].FECHA_HC = _editarFecha(data.LISTADO[i].FECHA_HC);
        data.LISTADO[i].EGRESO_HC = _editarFecha(data.LISTADO[i].EGRESO_HC);
      }

      if (data.LISTADO.length < 1) {
        CON851("", "08", null, "warning", "");
        this.estado_loader = false;
        this.datoUnidad();
      } else {
        let columnas = [
          {
            title: "Identificación",
            value: "ID_HC",
            filterButton: true,
          },
          {
            title: "Folio",
            value: "FOLIO_HC",
            filterButton: true,
          },
          {
            title: "1er Apellido",
            value: "1ER_APEL_PACI",
          },
          {
            title: "2do Apellido",
            value: "2DO_APEL_PACI",
          },
          {
            title: "Nombres",
            value: "NOMBRE_PACI",
          },
          {
            title: "Edad",
            value: "EDAD_HC",
          },
          {
            title: "Habitac",
            value: "HAB_HC",
          },
          {
            title: "Unidad Servicio",
            value: "UNSERV_HC",
            format: "string",
          },
          {
            title: "Fecha Apertura",
            value: "FECHA_HC",
            format: "string",
          },
          {
            title: "Fecha de Salida",
            value: "EGRESO_HC",
            format: "string",
          },
          {
            title: "Factura",
            value: "FACT_HC",
          },
          {
            title: "Estado",
            value: "ESTADO_NUM",
          },
          {
            title: "Detalle",
            value: "VALIDA",
          },
          {
            title: "Vlr Factura",
            value: "VLR_FACT",
          },
          {
            title: "Operador Abre",
            value: "OPER_NUM",
          },
        ];

        let header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `Listado de Historias Clinicas     NIT: ${nit}`,
          `Fecha de reporte: ${fecha}`,
          `Unidad de servicio: ${this.descrip_unserv}`,
        ];

        _impresion2({
          tipo: "excel",
          header: header_format,
          logo: `${nit}.png`,
          tabla: {
            columnas,
            data: data.LISTADO,
          },
          archivo: localStorage.Usuario + moment().format("-YYMMDD-HHmmss"),
          scale: "75",
          orientation: "landscape",
        })
          .then(() => {
            CON851("", "Generando informe", null, "success", "");
            loader("hide");
            _regresar_menuhis();
            this.estado_loader = false;
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error generando impresion", null, "error", "Error");
            loader("hide");
            this.datoUnidad();
            this.estado_loader = false;
          });
      }
    },

    _ventanaUnserv() {
      _fin_validar_form();
      POPUP(
        {
          array: this.array_unserv.filter((e) => e.ESTADO == "S"),
          titulo: "Unidades de Servicio",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.unserv,
          callback_f: this.datoUnidad,
        },
        (data) => {
          this.unserv = data.COD;
          this.datoUnidad();
          setTimeout(() => {
            _enterInput(".unserv");
          }, 100);
        }
      );
    },

    traerUnserv() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER873.DLL"))
        .then((data) => {
          this.array_unserv = data.UNSERV;
          loader("hide");
          this.datoFechaIni("1");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
