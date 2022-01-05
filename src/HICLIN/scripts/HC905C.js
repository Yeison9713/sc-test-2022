// Informe de productividad - 9-5-C - 14/05/2021 - David.M

new Vue({
  el: "#HC905C",
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
    fecha_act: moment().format("YYYYMMDD"),
    nit_usu: $_USUA_GLOBAL[0].NIT,
  },
  created() {
    nombreOpcion("9-5-C - Informe Productividad x H.C");
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
            this.consultaDll();
          }
        }
      );
    },

    consultaDll() {
      CON851P(
        "00",
        () => {
          this.datoFechaFin("3");
        },
        async () => {
          let datos_envio = [
            localStorage.Usuario,
            this.unserv.toString(),
            this.finalidad.toString(),
            this.profesional.toString(),
            this.inicial,
            this.final,
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
        postData({ datosh: datosEnvio() + datos_envio.join("|") + "|" }, get_url("app/HICLIN/HC905C.DLL"), {
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
            this.datoFechaFin("3");
          });
      });
    },

    imprimir(data) {
      let listado = data;

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = this.nit_usu.toString();
      let fecha = moment().format("MMM DD/YY - HH:mm");

      for (let i in listado) {
        for (let k = 1; k < 14; k++) {
          if (listado[i][`TOTAL_APER${k}`] == 0) listado[i][`TOTAL_APER${k}`] = 0;
          if (listado[i][`TOTAL_EVOL${k}`] == 0) listado[i][`TOTAL_EVOL${k}`] = 0;
          if (listado[i][`TOTAL_FORM${k}`] == 0) listado[i][`TOTAL_FORM${k}`] = 0;
        }

        for (let k = 31; k < 33; k++) {
          if (listado[i][`TOTAL_APER${k}`] == 0) listado[i][`TOTAL_APER${k}`] = 0;
          if (listado[i][`TOTAL_EVOL${k}`] == 0) listado[i][`TOTAL_EVOL${k}`] = 0;
          if (listado[i][`TOTAL_FORM${k}`] == 0) listado[i][`TOTAL_FORM${k}`] = 0;
        }
      }

      if (listado.length < 1) {
        CON851("", "08", null, "warning", "");
        this.estado_loader = false;
        this.datoFechaFin("3");
      } else {
        let columnas = [
          {
            title: "Item",
            value: "ITEM",
            filterButton: true,
          },
          {
            title: "Triage",
            value: "TRIAGE",
            filterButton: true,
          },
          {
            title: "Id Medico",
            value: "MED",
            filterButton: true,
          },
          {
            title: "Atiende",
            value: "DESCRIP_PROF",
          },
          {
            title: "Tipo de Personal",
            value: "ATIENDE_PROF",
          },
          {
            title: "Paciente",
            value: "ID_PACI",
          },
          {
            title: "Descrip Paciente",
            value: "DESCRIP_PACI",
          },
          {
            title: "Aperturas 1",
            value: "TOTAL_APER1",
          },
          {
            title: "Evolucion 1",
            value: "TOTAL_EVOL1",
          },
          {
            title: "Formulación 1",
            value: "TOTAL_FORM1",
          },
          {
            title: "Aperturas 2",
            value: "TOTAL_APER2",
          },
          {
            title: "Evolucion 2",
            value: "TOTAL_EVOL2",
          },
          {
            title: "Formulación 2",
            value: "TOTAL_FORM2",
          },
          {
            title: "Aperturas 3",
            value: "TOTAL_APER3",
          },
          {
            title: "Evolucion 3",
            value: "TOTAL_EVOL3",
          },
          {
            title: "Formulación 3",
            value: "TOTAL_FORM3",
          },
          {
            title: "Aperturas 4",
            value: "TOTAL_APER4",
          },
          {
            title: "Evolucion 4",
            value: "TOTAL_EVOL4",
          },
          {
            title: "Formulación 4",
            value: "TOTAL_FORM4",
          },
          {
            title: "Aperturas 5",
            value: "TOTAL_APER5",
          },
          {
            title: "Evolucion 5",
            value: "TOTAL_EVOL5",
          },
          {
            title: "Formulación 5",
            value: "TOTAL_FORM5",
          },
          {
            title: "Aperturas 6",
            value: "TOTAL_APER6",
          },
          {
            title: "Evolucion 6",
            value: "TOTAL_EVOL6",
          },
          {
            title: "Formulación 6",
            value: "TOTAL_FORM6",
          },
          {
            title: "Aperturas 7",
            value: "TOTAL_APER7",
          },
          {
            title: "Evolucion 7",
            value: "TOTAL_EVOL7",
          },
          {
            title: "Formulación 7",
            value: "TOTAL_FORM7",
          },
          {
            title: "Aperturas 8",
            value: "TOTAL_APER8",
          },
          {
            title: "Evolucion 8",
            value: "TOTAL_EVOL8",
          },
          {
            title: "Formulación 8",
            value: "TOTAL_FORM8",
          },
          {
            title: "Aperturas 9",
            value: "TOTAL_APER9",
          },
          {
            title: "Evolucion 9",
            value: "TOTAL_EVOL9",
          },
          {
            title: "Formulación 9",
            value: "TOTAL_FORM9",
          },
          {
            title: "Aperturas 11",
            value: "TOTAL_APER11",
          },
          {
            title: "Evolucion 11",
            value: "TOTAL_EVOL11",
          },
          {
            title: "Formulación 11",
            value: "TOTAL_FORM11",
          },
          {
            title: "Aperturas 12",
            value: "TOTAL_APER12",
          },
          {
            title: "Evolucion 12",
            value: "TOTAL_EVOL12",
          },
          {
            title: "Formulación 12",
            value: "TOTAL_FORM12",
          },
          {
            title: "Aperturas 13",
            value: "TOTAL_APER13",
          },
          {
            title: "Evolucion 13",
            value: "TOTAL_EVOL13",
          },
          {
            title: "Formulación 13",
            value: "TOTAL_FORM13",
          },
          {
            title: "Aperturas 31",
            value: "TOTAL_APER31",
          },
          {
            title: "Evolucion 31",
            value: "TOTAL_EVOL31",
          },
          {
            title: "Formulación 31",
            value: "TOTAL_FORM31",
          },
          {
            title: "Aperturas 32",
            value: "TOTAL_APER32",
          },
          {
            title: "Evolucion 32",
            value: "TOTAL_EVOL32",
          },
          {
            title: "Formulación 32",
            value: "TOTAL_FORM32",
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
          filas: {
            preTable: [
              { merge: [8, 10], text: "URGENCIAS" },
              { merge: [11, 13], text: "CONSULTA EXTERNA" },
              { merge: [14, 16], text: "HOSPITALIZACIÓN" },
              { merge: [17, 19], text: "CIRUGIA" },
              { merge: [20, 22], text: "OBSERVACIÓN" },
              { merge: [23, 25], text: "BRIGADAS" },
              { merge: [26, 28], text: "PRIORITARIA" },
              { merge: [29, 31], text: "PROMOCIÓN Y PREVENCIÓN" },
              { merge: [32, 34], text: "HOSPICASA" },
              { merge: [35, 37], text: "UCI NEONATAL CRITICO" },
              { merge: [38, 40], text: "UCI NEONATAL INTERMEDIO" },
              { merge: [41, 43], text: "UCI NEONATAL BASICO" },
              { merge: [44, 46], text: "UCI ADULTO CRITICO" },
              { merge: [47, 49], text: "UCI ADULTO INTERMEDIA" },
            ],
          },
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
            this.datoFechaFin("3");
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
