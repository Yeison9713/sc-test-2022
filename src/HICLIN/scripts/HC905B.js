// Informe de Egresos de Pacientes - 9-5-9 - 14/05/2021 - David.M

new Vue({
  el: "#HC905B",
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
    ano_fin: 0,
    mes_fin: 0,
    dia_fin: 0,
    sucursal: "",
    unserv: "",
    array_unserv: [],
    array_sucursales: [],

    fecha_act: moment().format("YYYYMMDD"),
    nit_usu: $_USUA_GLOBAL[0].NIT,
  },
  created() {
    nombreOpcion("9-5-B - Censo Basado Ingreso Y Egreso");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerUnserv();
  },
  computed: {
    descrip_unserv() {
      if (this.unserv == "**") {
        return "Todos los hospitaliz.";
      } else {
        let busqueda = this.array_unserv.find((e) => e.COD == this.unserv);
        return busqueda ? busqueda.DESCRIP : "";
      }
    },
    descrip_sucursal() {
      if (this.sucursal == "**") {
        return "Todas las Sucursales";
      } else {
        let busqueda = this.array_sucursales.find((e) => e.CODIGO == this.sucursal);
        return busqueda ? busqueda.DESCRIPCION : "";
      }
    },
  },
  methods: {
    datoFechaIni(orden) {
      if (!this.mes_ini) {
        this.ano_ini = this.fecha_act.slice(0, 4);
        this.mes_ini = this.fecha_act.slice(4, 6);
        this.dia_ini = this.fecha_act.slice(6);
      }
      validarInputs(
        {
          form: "#fecha_inicial",
          orden: orden,
        },
        _regresar_menuhis,
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
            this.datoFechaFin("1");
          }
        }
      );
    },

    datoFechaFin(orden) {
      if (!this.mes_fin) {
        this.ano_fin = this.fecha_act.slice(0, 4);
        this.mes_fin = this.fecha_act.slice(4, 6);
        this.dia_fin = this.fecha_act.slice(6);
      }
      validarInputs(
        {
          form: "#fecha_final",
          orden: orden,
        },
        () => {
          this.datoFechaIni("3")
        },
        () => {
          this.ano_fin = cerosIzq(this.ano_fin, 4);
          this.mes_fin = cerosIzq(this.mes_fin, 2);
          this.dia_fin = cerosIzq(this.dia_fin, 2);
          this.final = `${this.ano_fin}${this.mes_fin}${this.dia_fin}`;

          if (parseInt(this.final) < parseInt(this.inicial)) {
            CON851("", "37", null, "error", "");
            this.datoFechaFin("1");
          } else if (isNaN(moment(this.final).format("YYYYMMDD"))) {
            CON851("", "37", null, "error", "");
            this.datoFechaFin("3");
          } else {
            this.datoSucursal();
          }
        }
      );
    },

    datoSucursal() {
      if (!this.sucursal.trim()) this.sucursal = "**";
      validarInputs(
        {
          form: "#sucursal",
        },
        () => {
          this.datoFechaFin("3");
        },
        () => {
          if (!this.sucursal.trim()) this.datoSucursal();
          else this.datoUnidad();
        }
      );
    },

    datoUnidad() {
      if (!this.unserv.trim()) this.unserv = "**";
      validarInputs(
        {
          form: "#unserv",
        },
        this.datoSucursal,
        () => {
          this.unserv = this.unserv.padStart(2, "0");
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
        async () => {
          this.progreso.completado = false;
          let datos_envio = [
            this.inicial.toString(),
            this.final.toString(),
            this.sucursal.toString(),
            this.unserv.toString(),
          ];

          this.estado_loader = true;
          this.label_loader = `Procesando: ${_editFecha2(this.inicial)} - ${_editFecha2(this.final)}`;

          let consulta_general = await this.procesar_envio(datos_envio);

          this.loader = false;
          this.label_loader = `GENERANDO IMPRESIÓN...`;
          this.progreso.completado = true;
          setTimeout(() => {
            this.imprimir(consulta_general);
          }, 200);
        }
      );
    },

    procesar_envio(datos_envio) {
      const _this = this;
      return new Promise((resolve, reject) => {
        postData({ datosh: datosEnvio() + datos_envio.join("|") + "|" }, get_url("app/HICLIN/HC905B.DLL"), {
          onProgress: (progress) => {
            _this.progreso = progress;
          },
        })
          .then((data) => {
            data.LISTADO.pop();
            resolve(data.LISTADO);
          })
          .catch((err) => {
            CON851("", "Error consultando datos", null, "error", "Error");
            reject(err);
            this.loader = false;
            this.estado_loader = false;
            this.datoUnidad();
          });
      });
    },

    imprimir(data) {
      let listado = data;

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = this.nit_usu.toString();
      let fecha = moment().format("MMM DD/YY - HH:mm");

      for (let i in listado) {
        listado[i].HORA_HC = _editHora(listado[i].HORA_HC);
        listado[i].HORA_EGRES_HC = _editHora(listado[i].HORA_EGRES_HC);
        listado[i].HORA_FACT_ARMA_NUM = _editHora(listado[i].HORA_FACT_ARMA_NUM);
        listado[i].HORA_RET_NUM = _editHora(listado[i].HORA_RET_NUM);
        listado[i].HORA_BOL_NUM = _editHora(listado[i].HORA_BOL_NUM);

        listado[i].FECHA_HC = _editarFecha(listado[i].FECHA_HC);
        listado[i].EGRESO_HC = _editarFecha(listado[i].EGRESO_HC);
        listado[i].FECHA_RET_NUM = _editarFecha(listado[i].FECHA_RET_NUM);
        listado[i].FECHA_ABON_NUM = _editarFecha(listado[i].FECHA_ABON_NUM);
      }

      if (listado.length < 1) {
        CON851("", "08", null, "warning", "");
        this.estado_loader = false;
        this.datoUnidad();
      } else {
        let columnas = [
          {
            title: "Habitación",
            value: "HAB_HC",
            filterButton: true,
          },
          {
            title: "Unidad de Servicio",
            value: "UNSERV_HC",
            format: "string",
            filterButton: true,
          },
          {
            title: "Tipo Doc",
            value: "TIPO_ID_PACI",
            filterButton: true,
          },
          {
            title: "Identificación",
            value: "ID_HC",
            filterButton: true,
          },
          {
            title: "Sexo",
            value: "SEXO_PACI",
            filterButton: true,
          },
          {
            title: "Fecha Nac",
            value: "NACIM_PACI",
            format: "fecha",
          },
          {
            title: "Folio",
            value: "FOLIO_HC",
          },
          {
            title: "Zona",
            value: "ZONA_PACI",
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
            format: "string",
          },
          {
            title: "Entidad Factura",
            value: "DESCRIP_NUM",
          },
          {
            title: "Fecha Apertura HC",
            value: "FECHA_HC",
          },
          {
            title: "Hora Apertura HC",
            value: "HORA_HC",
            format: "string",
          },
          {
            title: "Fecha Egreso HC",
            value: "EGRESO_HC",
          },
          {
            title: "Hora Egreso HC",
            value: "HORA_EGRES_HC",
            format: "string",
          },
          {
            title: "Dias Estancia",
            value: "ESTANCIA",
          },
          {
            title: "Estado HC",
            value: "ESTADO_HC",
          },
          {
            title: "# Fact",
            value: "FACT",
            format: "string",
          },
          {
            title: "Estado Fact",
            value: "ESTADO_NUM",
          },
          {
            title: "Fecha Cierre Fact",
            value: "FECHA_RET_NUM",
          },
          {
            title: "Entidad",
            value: "ENTIDAD",
            format: "string",
          },
          {
            title: "Diag1",
            value: "COD_DIAGN_HC_1",
            format: "string",
          },
          {
            title: "Descripción Diag1",
            value: "NOMBRE_ENF_1",
            format: "string",
          },
          {
            title: "Diag2",
            value: "COD_DIAGN_HC_2",
            format: "string",
          },
          {
            title: "Descripción Diag2",
            value: "NOMBRE_ENF_2",
            format: "string",
          },
          {
            title: "Diag3",
            value: "COD_DIAGN_HC_3",
            format: "string",
          },
          {
            title: "Diag4",
            value: "COD_DIAGN_HC_4",
            format: "string",
          },
          {
            title: "Cedula Acompa",
            value: "ID_ACOMPA_HC",
          },
          {
            title: "Nombre Acompa",
            value: "DESCRIP_ACOMPA_HC",
            format: "string",
          },
          {
            title: "Telefono Acompa",
            value: "NUM_TELE_PACI",
          },
          {
            title: "Otro Acompañante",
            value: "ACOMPA_PACI",
          },
          {
            title: "Ciudad Pac",
            value: "NOMBRE_CIU",
            format: "string",
          },
          {
            title: "Etnia",
            value: "ETNIA_PACI",
            format: "string",
          },
          {
            title: "Descrip Etnia",
            value: "DESCRIP_ETNI",
            format: "string",
          },
          {
            title: "Comunidad",
            value: "DESCRIP_NOMCU",
            format: "string",
          },
          {
            title: "Resguardo",
            value: "DESCRIP_NOM_RE",
            format: "string",
          },
          {
            title: "Motivo de Ingreso",
            value: "MOTIV_HC",
            format: "string",
          },
          {
            title: "Observacion",
            value: "OBSERV",
            format: "string",
          },
        ];

        let header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `Informe de Censo de Pacientes     NIT: ${nit}`,
          `Fecha de reporte: ${fecha}`,
          `Desde: ${_editFecha2(this.inicial)}`,
        ];

        _impresion2({
          tipo: "excel",
          header: header_format,
          logo: `${nit}.png`,
          tabla: {
            columnas,
            data: listado,
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
          teclaAlterna: true,
          callback_f: this.datoUnidad,
        },
        (data) => {
          this.unserv = data.COD.toString().padStart(2, "0");
          this.datoUnidad();
          setTimeout(() => {
            _enterInput(".unserv");
          }, 100);
        }
      );
    },

    _ventanaSucursales() {
      _ventanaDatos({
        titulo: "Ventana de Sucursales",
        columnas: ["CODIGO", "DESCRIPCION", "ALMACEN"],
        data: this.array_sucursales,
        callback_esc: () => {
          document.querySelector(".sucursal").focus();
        },
        callback: (data) => {
          this.sucursal = data.CODIGO;
          setTimeout(() => {
            _enterInput(".sucursal");
          }, 200);
        },
      });
    },

    traerUnserv() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER873.DLL"))
        .then((data) => {
          this.array_unserv = data.UNSERV;
          this.traerSucursales();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando unidades de servicio", null, "error", "");
          _regresar_menuhis();
        });
    },

    traerSucursales() {
      postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON823.DLL"))
        .then((data) => {
          console.log(data);
          this.array_sucursales = data.SUCURSAL;
          loader("hide");
          this.datoFechaIni("1");
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando profesionales", null, "error", "");
          _regresar_menuhis();
        });
    },
  },
});
