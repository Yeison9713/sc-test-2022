// Informe Facturación Consult - 9-5-9 - 13/05/2021 - David.M

new Vue({
  el: "#HC9059",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    unserv: "",
    finalidad: "",
    profesional: "",
    ano_ini: 0,
    mes_ini: 0,
    dia_ini: 0,
    ano_fin: 0,
    mes_fin: 0,
    dia_fin: 0,
    evoluciones: "",
    array_unserv: [],
    array_finalidades: [
      { COD: 01, DESCRIP: "ATENCION PARTO    " },
      { COD: 02, DESCRIP: "ATENCION REC.NACID" },
      { COD: 03, DESCRIP: "ATENC.PLANIF.FAMIL" },
      { COD: 04, DESCRIP: "DET.ALT CRECIM <10" },
      { COD: 05, DESCRIP: "DET.ALT.DESA.JOVEN" },
      { COD: 06, DESCRIP: "DET.ALT.EMBARAZO  " },
      { COD: 07, DESCRIP: "DET.ALT. ADULTO   " },
      { COD: 08, DESCRIP: "DET.ALT.AGUD.VISUA" },
      { COD: 09, DESCRIP: "DET.ENFERM.PROFES." },
      { COD: 10, DESCRIP: "NO APLICA         " },
      { COD: 11, DESCRIP: "PATOLOGIA CRONICA " },
    ],
    array_profesionales: [],
    array_evoluciones: [
      { COD: "1", DESCRIP: "EVOLUCION MEDICA" },
      { COD: "2", DESCRIP: "NOTAS DE ENFERMERIA" },
      { COD: "3", DESCRIP: "TERAPIAS" },
      { COD: "4", DESCRIP: "APLICACION MEDICAMENTOS" },
      { COD: "6", DESCRIP: "INSTRUMENTACION" },
      { COD: "7", DESCRIP: "CONSULTA PRE-ANESTESIA" },
      { COD: "8", DESCRIP: "EVOLUCION ANESTESIA" },
      { COD: "O", DESCRIP: "OMITIR EVOLUCIONES" },
      { COD: "*", DESCRIP: "TODAS LAS EVOLUCIONES" },
    ],
    fecha_act: moment().format("YYYYMMDD"),
    nit_usu: $_USUA_GLOBAL[0].NIT,
  },
  created() {
    nombreOpcion("9-5-9 - Informe Facturación Consult");
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
    descrip_finalidad() {
      if (this.finalidad == "**") {
        return "Todas las finalid.";
      } else {
        let busqueda = this.array_finalidades.find((e) => e.COD == this.finalidad);
        return busqueda ? busqueda.DESCRIP : "";
      }
    },
    descrip_profesional() {
      if (this.profesional == 99) {
        return "Todos los medicos";
      } else {
        let busqueda = this.array_profesionales.find((e) => e.IDENTIFICACION == this.profesional);
        return busqueda ? busqueda.NOMBRE : "";
      }
    },
    descrip_evoluciones() {
      let busqueda = this.array_evoluciones.find((e) => e.COD == this.evoluciones);
      return busqueda ? busqueda.DESCRIP : "";
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
          this.unserv = this.unserv.padStart(2, "0");
          if (this.unserv == "**") {
            this.datoFinalidad();
          } else {
            if (this.unserv.trim()) {
              let busqueda = this.array_unserv.find((e) => e.COD == this.unserv);
              if (busqueda) {
                if (busqueda.ESTADO == "S") {
                  this.datoFinalidad();
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

    datoFinalidad() {
      if (!this.finalidad.trim()) this.finalidad = "**";
      validarInputs(
        {
          form: "#finalidad",
        },
        () => {
          this.datoUnidad();
        },
        () => {
          this.finalidad = this.finalidad.padStart(2, "0");
          if (this.finalidad == "**") {
            this.datoMedico();
          } else {
            if (this.finalidad.trim()) {
              let busqueda = this.array_finalidades.find((e) => e.COD == this.finalidad);
              if (busqueda) {
                this.datoMedico();
              } else {
                CON851("", "01", null, "error", "");
                this.datoFinalidad();
              }
            } else {
              CON851("", "01", null, "error", "");
              this.datoFinalidad();
            }
          }
        }
      );
    },

    datoMedico() {
      if (!this.profesional.trim()) this.profesional = $_REG_PROF.IDENTIFICACION;
      validarInputs(
        {
          form: "#profesional",
        },
        () => {
          this.datoFinalidad();
        },
        () => {
          if (this.profesional == 99) {
            this.datoFechaIni("1");
          } else {
            if (this.profesional.trim()) {
              let busqueda = this.array_profesionales.find((e) => e.IDENTIFICACION == this.profesional);
              if (busqueda) {
                this.datoFechaIni("1");
              } else {
                CON851("", "01", null, "error", "");
                this.datoMedico();
              }
            } else {
              CON851("", "01", null, "error", "");
              this.datoMedico();
            }
          }
        }
      );
    },

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
        () => {
          this.datoMedico();
        },
        () => {
          this.ano_ini = cerosIzq(this.ano_ini, 4);
          this.mes_ini = cerosIzq(this.mes_ini, 2);
          this.dia_ini = cerosIzq(this.dia_ini, 2);
          this.inicial = `${this.ano_ini}${this.mes_ini}${this.dia_ini}`;

          if (this.ano_ini < 1900) {
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
        this.ano_fin = this.ano_ini;
        this.mes_fin = this.mes_ini;
        this.dia_fin = this.dia_ini;
      }
      validarInputs(
        {
          form: "#fecha_final",
          orden: orden,
        },
        () => {
          this.datoFechaIni("3");
        },
        () => {
          this.ano_fin = cerosIzq(this.ano_fin, 4);
          this.mes_fin = cerosIzq(this.mes_fin, 2);
          this.dia_fin = cerosIzq(this.dia_fin, 2);
          this.final = `${this.ano_fin}${this.mes_fin}${this.dia_fin}`;

          if (isNaN(moment(this.final).format("YYYYMMDD"))) {
            CON851("", "37", null, "error", "");
            this.datoFechaFin("3");
          } else if (parseInt(this.final) < parseInt(this.inicial)) {
            CON851("", "37", null, "error", "");
            this.datoFechaFin("3");
          } else {
            this.opcionEvol("1");
          }
        }
      );
    },

    opcionEvol() {
      if (!this.evoluciones.trim()) this.evoluciones = "1";
      POPUP(
        {
          titulo: "EVOLUCIONES",
          array: this.array_evoluciones,
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.evoluciones,
          callback_f: () => {
            this.datoFechaFin("3");
          },
        },
        (data) => {
          this.evoluciones = data.COD;
          this.consultaDll();
        }
      );
    },

    consultaDll() {
      CON851P(
        "00",
        () => {
          this.opcionEvol();
        },
        async () => {
          let datos_envio = [
            localStorage.Usuario,
            this.unserv.toString(),
            this.finalidad.toString(),
            this.profesional.toString(),
            this.inicial,
            this.final,
            this.evoluciones.toString(),
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
        postData({ datosh: datosEnvio() + datos_envio.join("|") + "|" }, get_url("app/HICLIN/HC9059.DLL"), {
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
            this.opcionEvol();
          });
      });
    },

    imprimir(data) {
      let listado = data;

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = this.nit_usu.toString();
      let fecha = moment().format("MMM DD/YY - HH:mm");

      for (let i in listado) {
        listado[i]["HORA_EDIT"] = _editHora(listado[i].HORA);
      }

      if (listado.length < 1) {
        CON851("", "08", null, "warning", "");
        this.estado_loader = false;
        this.datoFechaFin("3");
      } else {
        let columnas = [
          {
            title: "Docum",
            value: "DOC",
            filterButton: true,
          },
          {
            title: "Sucur",
            value: "SUCUR",
          },
          {
            title: "Clase",
            value: "CLASE",
            filterButton: true,
          },
          {
            title: "Fecha",
            value: "FECHA",
            format: "fecha",
            filterButton: true,
          },
          {
            title: "Hora",
            value: "HORA_EDIT",
            format: "string",
          },
          {
            title: "prefijo",
            value: "",
          },
          {
            title: "Nro Fact",
            value: "",
          },
          {
            title: "Nit Entidad",
            value: "NIT_ENTIDAD",
          },
          {
            title: "Id Paciente",
            value: "ID",
            filterButton: true,
          },
          {
            title: "Pta Ingre",
            value: "PTA_INGRE",
          },
          {
            title: "Unidad Serv",
            value: "UNSERV",
          },
          {
            title: "Cups",
            value: "CUPS",
          },
          {
            title: "Clase_",
            value: "",
          },
          {
            title: "Almacen",
            value: "",
          },
          {
            title: "Cantidad",
            value: "CANTIDAD",
          },
          {
            title: "Valor",
            value: "",
          },
          {
            title: "Copago",
            value: "COPAGO",
          },
          {
            title: "TIpo Diag",
            value: "TIPO_DIAG",
          },
          {
            title: "DIAG1",
            value: "DIAGN1",
            format: "string",
          },
          {
            title: "DIAG2",
            value: "DIAGN2",
            format: "string",
          },
          {
            title: "DIAG3",
            value: "DIAGN3",
            format: "string",
          },
          {
            title: "DIAG4",
            value: "DIAGN4",
            format: "string",
          },
          {
            title: "Moticon",
            value: "MOTICON",
          },
          {
            title: "Nro Id Medico",
            value: "MED",
          },
          {
            title: "Unidad",
            value: "TIPEDAD",
          },
          {
            title: "Edad",
            value: "EDAD",
          },
          {
            title: "CC",
            value: "CC",
          },
          {
            title: "FinalidCons",
            value: "FINALID",
          },
          {
            title: "Causa",
            value: "CAUSA",
          },
          {
            title: "Autorización",
            value: "",
          },
          {
            title: "Eps Paci",
            value: "EPS",
            format: "string",
          },
        ];

        let header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `Informe de Atención     NIT: ${nit}`,
          `Fecha de reporte: ${fecha}`,
          `Desde: ${_editFecha2(this.inicial)} - Hasta: ${_editFecha2(this.final)}`,
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
            this.opcionEvol();
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

    _ventanaFinalidades() {
      _fin_validar_form();
      POPUP(
        {
          array: this.array_finalidades,
          titulo: "Finalidad",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.finalidad,
          teclaAlterna: true,
          callback_f: this.datoFinalidad,
        },
        (data) => {
          this.finalidad = data.COD.toString().padStart(2, "0");
          this.datoFinalidad();
          setTimeout(() => {
            _enterInput(".finalidad");
          }, 100);
        }
      );
    },

    _ventanaProfesionales() {
      _ventanaDatos({
        titulo: "Ventana de Profesionales",
        columnas: ["IDENTIFICACION", "NOMBRE"],
        data: this.array_profesionales,
        callback_esc: () => {
          document.querySelector(".profesional").focus();
        },
        callback: (data) => {
          this.profesional = data.IDENTIFICACION;
          setTimeout(() => {
            _enterInput(".profesional");
          }, 200);
        },
      });
    },

    traerUnserv() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER873.DLL"))
        .then((data) => {
          this.array_unserv = data.UNSERV;
          this.traerProfesionales();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando unidades de servicio", null, "error", "");
          _regresar_menuhis();
        });
    },

    traerProfesionales() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER819.DLL"))
        .then((data) => {
          console.log(data);
          this.array_profesionales = data.ARCHPROF;
          this.array_profesionales.pop();
          loader("hide");
          this.datoUnidad();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando profesionales", null, "error", "");
          _regresar_menuhis();
        });
    },
  },
});
