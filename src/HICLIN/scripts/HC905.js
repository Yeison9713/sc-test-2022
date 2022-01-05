// Informe H.C Abiertas - 9-5-1 - 27/04/2021 - David.M

new Vue({
  el: "#HC905",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    unserv: "",
    salida: "",
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
    datoUnidad() {
      if (!this.unserv.trim()) this.unserv = "**";
      validarInputs(
        {
          form: "#unserv",
        },
        () => {
          _regresar_menuhis();
        },
        () => {
          if (this.unserv == "**") {
            this.datoSalida();
          } else {
            if (this.unserv.trim()) {
              let busqueda = this.array_unserv.find((e) => e.COD == this.unserv);
              if (busqueda) {
                if (busqueda.ESTADO == "S") {
                  this.datoSalida();
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

    datoSalida() {
      validarInputs(
        {
          form: "#salida",
        },
        this.datoUnidad,
        () => {
          this.salida = this.salida.toUpperCase();
          if (this.salida != "S") this.salida = "N";
          this.consultaDll();
        }
      );
    },

    consultaDll() {
      CON851P(
        "00",
        () => {
          this.datoSalida();
        },
        () => {
          let datos = [this.unserv, this.salida];

          this.estado_loader = true;
          this.label_loader = `Procesando: ${moment(this.inicial).format("YYYY/MM/DD")}`;
          this.progreso = { transferred: 0, speed: 0 };

          postData({ datosh: datosEnvio() + datos.join("|") + "|" }, get_url("app/HICLIN/HC905.DLL"), {
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
              this.datoSalida();
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
        data.LISTADO[i].UNSERV_EDIT = `${data.LISTADO[i].UNSERV_HC} - ${data.LISTADO[i].DESCRIP_UNID_SERV}`;
        data.LISTADO[
          i
        ].SALIDA = `${data.LISTADO[i].FECHA_ORD_SALIDA_HC}  ${data.LISTADO[i].OPER_ORD_SALIDA_HC}  ${data.LISTADO[i].HR_ORD_SALIDA_HC}  ${data.LISTADO[i].MN_ORD_SALIDA_HC}`;
        data.LISTADO[i].NRO_HORAS_EDIT = `${data.LISTADO[i].NRO_HORAS} Horas`;
      }

      if (data.LISTADO.length < 1) {
        CON851("", "08", null, "warning", "");
        this.estado_loader = false;
        this.datoSalida("3");
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
            title: "Dirección",
            value: "DIRECC_PACI",
          },
          {
            title: "Telefono",
            value: "TELEFONO_PACI",
          },
          {
            title: "Ciudad",
            value: "NOMBRE_CIU",
          },
          {
            title: "Edad",
            value: "EDAD_HC",
          },
          {
            title: "Habitac.",
            value: "HAB_HC",
          },
          {
            title: "Unidad Servicio",
            value: "UNSERV_EDIT",
            format: "string",
          },
          {
            title: "Fecha Apertura",
            value: "FECHA_HC",
            format: "string",
          },
          {
            title: "Orden de salida",
            value: "SALIDA",
            format: "string",
          },
          {
            title: "Oportunidad",
            value: "NRO_HORAS_EDIT",
            format: "string",
          },
          {
            title: "Eps Paci",
            value: "EPS_PACI",
          },
          {
            title: "Entidad Apertura",
            value: "DESCRIP_TER",
          },
          {
            title: "Medico Apertura",
            value: "MED_HC",
          },
          {
            title: "Descripción Medico",
            value: "DESCRIP_PROF",
          },
          {
            title: "Medico Evolución",
            value: "COD_PROF_EVO",
          },
          {
            title: "Descripción Medico Evo",
            value: "DESCRIP_PROF_EVO",
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
            this.datoSalida();
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
          console.log(data);
          loader("hide");
          this.datoUnidad();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
