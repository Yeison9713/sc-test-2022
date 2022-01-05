// Registro Diario de H.C - 9-5-2 - 1/05/2021 - David.M

new Vue({
  el: "#HC9052",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    formato: 0,
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
    sucursal: "",
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
    nombreOpcion("9-5-2 - Registro Diario de H.C");
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
    descrip_sucursal() {
      return this.sucursal == "**" ? "Todas las sucursales" : "";
    },
  },
  methods: {
    datoFormato() {
      POPUP(
        {
          titulo: "FORMATO DE IMPRESIÓN",
          indices: [{ id: "id", label: "label" }],
          seleccion: this.formato || 1,
          array: [
            { id: 1, label: "EXCEL" },
            { id: 2, label: "CSV" },
          ],
          callback_f: _regresar_menuhis,
        },
        (data) => {
          this.formato = data.id;
          this.datoUnidad();
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
          this.datoFormato();
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
            this.datoFechaFin("2");
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
          this.aceptarSucursal();
        }
      );
    },

    aceptarSucursal() {
      if (!this.sucursal.trim()) this.sucursal = "**";
      validarInputs(
        {
          form: "#sucursal",
        },
        this.opcionEvol,
        () => {
          this.sucursal = this.sucursal.padStart(2, "0");
          if (this.sucursal.trim()) {
            this.consultaDll();
          } else {
            this.aceptarSucursal();
          }
        }
      );
    },

    consultaDll() {
      CON851P(
        "00",
        () => {
          this.aceptarSucursal();
        },
        async () => {
          let datos_envio = [
            localStorage.Usuario,
            this.unserv.toString(),
            this.finalidad.toString(),
            this.profesional.toString(),
            "",
            "",
            this.evoluciones.toString(),
            this.sucursal.toString(),
          ];

          let fecha_ini = moment(this.inicial);
          let fecha_fin = moment(this.final);
          let diff_fechas = fecha_fin.diff(fecha_ini, "days");
          diff_fechas += 1;

          let consulta_general = [];
          this.estado_loader = true;
          for (let i = 0; i < diff_fechas; i++) {
            let new_fecha = moment(this.inicial).add(i, "days");
            datos_envio[4] = moment(new_fecha).format("YYYYMMDD");
            datos_envio[5] = moment(new_fecha).format("YYYYMMDD");

            this.label_loader = `Procesando: ${_editarFecha(datos_envio[4])}`;

            let data = await this.procesar_envio(datos_envio).catch((error) => {
              console.error(error);
              i = 99999;
              this.loader = false;
              this.estado_loader = false;
              this.aceptarSucursal();
            });

            consulta_general = consulta_general.concat(data);
            this.progreso = { transferred: 0, speed: 0 };
          }

          if (this.loader) {
            this.loader = false;
            this.label_loader = `GENERANDO IMPRESIÓN...`;
            this.progreso.completado = true;
            setTimeout(() => {
              if (this.formato == 1) this.imprimir(consulta_general);
              else this.format_csv(consulta_general);
            }, 700);
          }
        }
      );
    },

    procesar_envio(datos_envio) {
      const _this = this;
      return new Promise((resolve, reject) => {
        postData({ datosh: datosEnvio() + datos_envio.join("|") + "|" }, get_url("app/HICLIN/HC9052.DLL"), {
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
            if (err.STATUS) resolve([]);
            else reject(err);
          });
      });
    },

    async format_csv(datos) {
      let array_columns = this.columnas_listado()

      for(let i in array_columns) {
        array_columns[i]["label"] = array_columns[i].title;
      }
    
      _impresion2({
        tipo: "csv",
        datos: datos,
        columnas: array_columns,
      })
        .then(() => {
          this.estado_loader = false;
          CON851("", "Impreso Correctamente", null, "success", "Exito");
          _regresar_menuhis();
        })
        .catch(() => {
          this.estado_loader = false;
          CON851("", "Ha ocurrido un error generando la impresión.", null, "error", "Error");
          this.aceptarSucursal();
        });
    },

    imprimir(data) {
      let listado = data;

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = this.nit_usu.toString();
      let fecha = moment().format("MMM DD/YY - HH:mm");

      if (listado.length < 1) {
        CON851("", "08", null, "warning", "");
        this.estado_loader = false;
        this.datoFechaFin("3");
      } else {
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
            _regresar_menuhis();
            this.estado_loader = false;
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error generando impresion", null, "error", "Error");
            loader("hide");
            this.aceptarSucursal();
            this.estado_loader = false;
          });
      }
    },

    columnas_listado() {
      return [
        {
          title: "Docum",
          value: "DOC",
          filterButton: true,
        },
        {
          title: "Fecha",
          value: "FECHA",
          format: "string",
          filterButton: true,
        },
        {
          title: "Hora",
          value: "HORA",
          format: "string",
          filterButton: true,
        },
        {
          title: "Sucursal",
          value: "FOLIO_SUC",
        },
        {
          title: "Folio",
          value: "FOLIO_NRO",
        },
        {
          title: "Tipo identificación",
          value: "TIPO_ID_PACI",
        },
        {
          title: "Id Paciente",
          value: "ID",
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
          title: "1er Nombre",
          value: "1ER_NOM_PACI",
        },
        {
          title: "2do Nombre",
          value: "2DO_NOM_PACI",
        },
        {
          title: "Sexo",
          value: "SEXO_PACI",
        },
        {
          title: "Edad",
          value: "EDAD",
        },
        {
          title: "Peso",
          value: "PESO",
        },
        {
          title: "Talla",
          value: "TALLA",
        },
        {
          title: "Fcard",
          value: "FCARD",
        },
        {
          title: "Fresp",
          value: "FRESP",
        },
        {
          title: "Temp",
          value: "TEMP",
        },
        {
          title: "Diagn",
          value: "DIAGN1",
        },
        {
          title: "Descripción del diagnóstico",
          value: "NOMBRE1_ENF",
        },
        {
          title: "Est Salida",
          value: "EST_SAL",
        },
        {
          title: "Unidad servicio inicial",
          value: "DESCRIP1_SERV",
        },
        {
          title: "Unidad servicio final",
          value: "DESCRIP1_UNSERV",
        },
        {
          title: "Atendio",
          value: "DESCRIP_MED",
        },
        {
          title: "Entidad",
          value: "ENTIDAD",
        },
        {
          title: "Fecha Nacim",
          value: "NACIM_PACI",
          format: "string",
        },
        {
          title: "Dirección",
          value: "DIRECC_PACI",
        },
        {
          title: "Ciudad base de datos",
          value: "NOMBRE_CIU",
          format: "string",
        },
        {
          title: "Procedencia",
          value: "PROCEDEN",
        },
        {
          title: "Telefono",
          value: "TELEFONO_PACI",
        },
        {
          title: "Med",
          value: "MEDIC",
        },
        {
          title: "Lab",
          value: "LABOR",
        },
        {
          title: "Imag",
          value: "IMAGE",
        },
        {
          title: "Ord",
          value: "ORDEN",
        },
        {
          title: "Intercons",
          value: "INTER",
        },
        {
          title: "Finalidad",
          value: "FINALID",
        },
        {
          title: "Causa Externa",
          value: "CAUSA",
        },
        {
          title: "Motivo de consulta",
          value: "MOTIVO",
        },
        {
          title: "Sintom resp",
          value: "SINTORES",
        },
        {
          title: "Planific",
          value: "PLANIFIC",
        },
        {
          title: "t Embarazo",
          value: "EMBARAZO",
        },
        {
          title: "FUR",
          value: "FUR",
          format: "string",
        },
        {
          title: "Zona",
          value: "ZONA_PACI",
        },
        {
          title: "Diag2",
          value: "DIAGN2",
        },
        {
          title: "Diag3",
          value: "DIAGN3",
        },
        {
          title: "Diag4",
          value: "DIAGN4",
        },
        {
          title: "IMC",
          value: "IMC_CORP",
        },
        {
          title: "Tension sistolica",
          value: "TENS1",
        },
        {
          title: "Tension diastolica",
          value: "TENS2",
        },
        {
          title: "Tens Media",
          value: "TENS_MEDIA",
        },
        {
          title: "EmbaraAltories",
          value: "EMB_ALTO_RIESG",
        },
        {
          title: "Semanas de Gestación",
          value: "EDAD_GEST_REGLA",
          format: "string",
        },
        {
          title: "Fecha probable de parto",
          value: "FECHA_PARTO_FUR_CALE",
          format: "string",
        },
        {
          title: "Perimetro cefalico",
          value: "PER_CEF",
        },
        {
          title: "Altura Uterina",
          value: "ALT_UTER",
        },
        {
          title: "TSH",
          value: "TSH_NACER",
        },
        {
          title: "Lactancia Materna",
          value: "LACTAN_MATER_RESP",
        },
        {
          title: "Revisión de Citologia",
          value: "REV_CITO",
        },
        {
          title: "Oximetria",
          value: "OXIMETRIA",
        },
        {
          title: "Nombre de la madre",
          value: "MADRE_PACI",
        },
        {
          title: "Etnia",
          value: "ETNIA_PACI",
        },
        {
          title: "Tipo de Usuario",
          value: "REGIMEN_PACI",
        },
        {
          title: "Grado Discapacidad",
          value: "DISCAP_PACI",
        },
        {
          title: "Escolaridad",
          value: "NIV_ESTUD_PACI",
        },
        {
          title: "Fecha Ultima Citologia",
          value: "FECHA_CITOL_HC",
          format: "string",
        },
        {
          title: "Creatinina",
          value: "CREATININA",
        },
        {
          title: "TFG",
          value: "TFG",
        },
        {
          title: "Comprobante",
          value: "LLAVE_COMP",
        },
        {
          title: "_",
          value: "ERROR",
        },
        {
          title: "Vitamina A",
          value: "VITAMINAA_AIE",
        },
        {
          title: "Albendazol",
          value: "ALBENDAZOL_AIE",
        },
        {
          title: "Hierro",
          value: "HIERRO_AIE",
        },
        {
          title: "Antecedentes Gineco Obstetricos",
          value: "GINEC_HC",
        },
        {
          title: "Prenatal 1ra Vez",
          value: "PRIMERA_VEZ",
        },
        {
          title: "Numero de controles asistidos",
          value: "NRO_CONTR",
        },
        {
          title: "Diagnostico Dx salida",
          value: "DIAG_EGR",
        },
        {
          title: "Fecha de Egreso",
          value: "FECHA_EGRESO",
          format: "string",
        },
        {
          title: "Hora de Egreso",
          value: "HORA_EGRES",
          format: "string",
        },
        {
          title: "Cod Cronico",
          value: "CRONICO",
        },
        {
          title: "Descripción Cronico",
          value: "DESCRIP_CRONIC",
        },
        {
          title: "RH",
          value: "HEMOCLAS_PACI",
        },
        {
          title: "FACTURA",
          value: "FACT",
        },
        {
          title: "Perimetro Abdominal",
          value: "PER_ABDO",
        },
        {
          title: "Perimetro Mune",
          value: "PER_MUNE",
        },
        {
          title: "Especialidad",
          value: "NOMBRE_ESP_HC02",
        },
        {
          title: "Fecha Cita Especialidad",
          value: "FECHA_CITA_ESP_HC02",
          format: "string",
        },
        {
          title: "Codigo Cups Procedi 1",
          value: "CUPS_EVO1",
        },
        {
          title: "Descrip Cups 1",
          value: "DESCRIP_CUP_EVO1",
        },
        {
          title: "Codigo Cups Procedi 2",
          value: "CUPS_EVO2",
        },
        {
          title: "Descrip Cups 2",
          value: "DESCRIP_CUP_EVO2",
        },
        {
          title: "Glucometria",
          value: "GLUCOMETRIA",
        },
        {
          title: "Ocupación",
          value: "OCUPACION",
        },
        {
          title: "Estado Civil",
          value: "EST_CIV",
        },
        {
          title: "Comunidad",
          value: "NOMCU",
        },
        {
          title: "Resguardo",
          value: "NOMRE",
        },
        {
          title: "Nivel de Estudio",
          value: "NIV_ESTUD",
        },
        {
          title: "Victima de conflicto",
          value: "VICTI_CONFLICTO",
        },
        {
          title: "Antecedentes farmacologicos",
          value: "FARMA_HC",
        },
        {
          title: "Toma Calcio",
          value: "TOMA_CALCIO",
        },
        {
          title: "Toma Hierro",
          value: "TOMA_HIERRO",
        },
        {
          title: "Toma Ácido Folio",
          value: "TOMA_ACIDO",
        },
        {
          title: "Fecha Fin",
          value: "FECHA_GRAB",
          format: "string",
        },
        {
          title: "Hora Fin",
          value: "HORA_GRAB",
          format: "string",
        },
        {
          title: "Hemo Glicosilada",
          value: "HEMO_GLICOSILADA",
        },
        {
          title: "Fecha Toma Gli",
          value: "FECHA_HEMO_GLICO",
          format: "string",
        },
        {
          title: "Microalbuminuria",
          value: "MICROALBUMINURIA",
        },
        {
          title: "Fecha Toma Micro",
          value: "FECHA_MICROALBU",
          format: "string",
        },
        {
          title: "Riesgo Cardiovascular",
          value: "RIESGO_CARDIO",
          format: "string",
        },
        {
          title: "Fecha Asesoria Pre",
          value: "FECHA_ASESO_PRE",
          format: "string",
        },
        {
          title: "Fecha Asesoria Pos",
          value: "FECHA_ASESO_POS",
          format: "string",
        },
        {
          title: "Fecha Ecografia Obstetrica",
          value: "FECHA_ECO_OBST",
          format: "string",
        },
        {
          title: "Fecha Vacuna Influenza",
          value: "FECHA_VAC_INFLU",
          format: "string",
        },
        {
          title: "Fecha Vacuna TDAP",
          value: "FECHA_VAC_TDAP",
          format: "string",
        },
        {
          title: "Fecha Vacuna TT",
          value: "FECHA_VAC_TT",
          format: "string",
        },
        {
          title: "VIH (1er trim)",
          value: "FECHA_VIH_1",
          format: "string",
        },
        {
          title: "Resultado 1",
          value: "RESULTADO_VIH_1",
        },
        {
          title: "VIH (2do trim)",
          value: "FECHA_VIH_2",
          format: "string",
        },
        {
          title: "Resultado 2",
          value: "RESULTADO_VIH_2",
        },
        {
          title: "VIH (3er trim)",
          value: "FECHA_VIH_3",
          format: "string",
        },
        {
          title: "Resultado 3",
          value: "RESULTADO_VIH_3",
        },
        {
          title: "Serologia (1er trim)",
          value: "FECHA_SEROLO_1",
          format: "string",
        },
        {
          title: "Resultado 4",
          value: "RESULTADO_SEROLO_1",
        },
        {
          title: "Serologia (2do trim)",
          value: "FECHA_SEROLO_2",
          format: "string",
        },
        {
          title: "Resultado 5",
          value: "RESULTADO_SEROLO_2",
        },
        {
          title: "Serologia (3er trim)",
          value: "FECHA_SEROLO_3",
          format: "string",
        },
        {
          title: "Resultado 6",
          value: "RESULTADO_SEROLO_3",
        },
        {
          title: "Hemoglobina (1er trim)",
          value: "FECHA_HEMOGL_1",
          format: "string",
        },
        {
          title: "Resultado 7",
          value: "RESULTADO_HEMOGL_1",
        },
        {
          title: "Hemoglobina (2do trim)",
          value: "FECHA_HEMOGL_2",
          format: "string",
        },
        {
          title: "Resultado 8",
          value: "RESULTADO_HEMOGL_2",
        },
        {
          title: "Hemoglobina (3er trim)",
          value: "FECHA_HEMOGL_3",
          format: "string",
        },
        {
          title: "Resultado 9",
          value: "RESULTADO_HEMOGL_3",
        },
        {
          title: "IGG (1er trim)",
          value: "FECHA_IGG_1",
          format: "string",
        },
        {
          title: "Resultado 10",
          value: "RESULTADO_IGG_1",
        },
        {
          title: "IGG (2do trim)",
          value: "FECHA_IGG_2",
          format: "string",
        },
        {
          title: "Resultado 11",
          value: "RESULTADO_IGG_2",
        },
        {
          title: "IGG (3er trim)",
          value: "FECHA_IGG_3",
          format: "string",
        },
        {
          title: "Resultado 12",
          value: "RESULTADO_IGG_3",
        },
        {
          title: "Curva de glicemia (1er trim)",
          value: "FECHA_GLICEM_1",
          format: "string",
        },
        {
          title: "Resultado 13",
          value: "RESUL_GLICEM_1",
        },
        {
          title: "Curva de glicemia (2do trim)",
          value: "FECHA_GLICEM_2",
          format: "string",
        },
        {
          title: "Resultado 14",
          value: "RESUL_GLICEM_2",
        },
        {
          title: "Curva de glicemia (3er trim)",
          value: "FECHA_GLICEM_3",
          format: "string",
        },
        {
          title: "Resultado 15",
          value: "RESUL_GLICEM_3",
        },
        {
          title: "Hepatitis B",
          value: "FECHA_HEPAT_B",
          format: "string",
        },
        {
          title: "Resultado 16",
          value: "RESULTADO_HEPAT_B",
        },
        {
          title: "Fecha Ginecologia",
          value: "FECHA_GINECO",
          format: "string",
        },
        {
          title: "Fecha Odontologia",
          value: "FECHA_ODONTO",
          format: "string",
        },
        {
          title: "Fecha Nutrición",
          value: "FECHA_NUTRI",
          format: "string",
        },
        {
          title: "Fecha Psicologia",
          value: "FECHA_PSICOL",
          format: "string",
        },
        {
          title: "Planeado",
          value: "GINE_PLANE",
        },
        {
          title: "Experiencia con tabaco",
          value: "EXP_TABACO_HC",
        },
        {
          title: "Fuma actualmente",
          value: "FUMA_HC",
        },
        {
          title: "Humo lena",
          value: "HUMO_LENA_HC",
        },
        {
          title: "Alcohol",
          value: "ALCOHOL_HC",
        },
        {
          title: "Sedentarismo",
          value: "SEDENTARISMO_HC",
        },
        {
          title: "Fecha de MI(cronic)",
          value: "FECHA_MI_HC",
          format: "string",
        },
        {
          title: "Fecha Endocrinologia(cronic)",
          value: "FECHA_ENDOCRI_HC",
          format: "string",
        },
        {
          title: "Fecha Cardiologia(cronic)",
          value: "FECHA_CARDIO_HC",
          format: "string",
        },
        {
          title: "Fecha Oftalmologia(cronic)",
          value: "FECHA_OFTAMOL_HC",
          format: "string",
        },
        {
          title: "Fecha Nefrologia(cronic)",
          value: "FECHA_NEFRO_HC",
          format: "string",
        },
        {
          title: "Fecha Psicologia(cronic)",
          value: "FECHA_PSICOL_HC",
          format: "string",
        },
        {
          title: "Fecha Nutrición(cronic)",
          value: "FECHA_NUTRI_HC",
          format: "string",
        },
        {
          title: "Fecha Trabajo Social(cronic)",
          value: "FECHA_TRABSOC_HC",
          format: "string",
        },
        {
          title: "Fecha Proxima Citologia BETESDA",
          value: "FECHA_ULT_CITO_8002",
          format: "string",
        },
        {
          title: "Peso para la Edad",
          value: "PES_ED_ESTAD_AIE",
        },
        {
          title: "Talla para la Edad",
          value: "TALLA_ED_ESTAD_AIE",
        },
        {
          title: "Peso para la Talla",
          value: "PESO_TAL_ESTAD_AIE",
        },
        {
          title: "Victima Maltrato",
          value: "VICTI_MALTRATO",
        },
        {
          title: "Victima Violencia",
          value: "VICTI_VIOLENCIA",
        },
        {
          title: "Enfermedad Mental",
          value: "ENFER_MENTAL",
        },
        {
          title: "Enfermedad ITS",
          value: "ENFER_ITS",
        },
        {
          title: "Cancer Seno",
          value: "CANCER_SENO",
        },
        {
          title: "Cancer Cervis",
          value: "CANCER_CERVIS",
        },
        {
          title: "Calidad en la muestra",
          value: "MUEST_CITO",
        },
        {
          title: "Interpretación del resultado",
          value: "RESUL_CITO",
        },
        {
          title: "Fecha Ult Cierre",
          value: "FECHA_ULT_CIERRE_HC",
          format: "string",
        },
        {
          title: "Operador Ult Cierre",
          value: "OPER_ULT_CIERRE_HC",
        },
        {
          title: "Fecha Ult Reapertura",
          value: "FECHA_ULT_REAPER_HC",
          format: "string",
        },
        {
          title: "Operador Ult Reapertura",
          value: "OPER_ULT_REAPER_HC",
        },
        {
          title: "Relación Albumina/Creatinina",
          value: "RELA_ALBUMI_CREATININA2",
        },
        {
          title: "ERC",
          value: "ERC",
        },
        {
          title: "Fecha Dx ERC",
          value: "FECHA_DX_ERC",
          format: "string",
        },
        {
          title: "Escala de Barthel",
          value: "CALC_BARTHEL",
        },
        {
          title: "Test de Findrisk",
          value: "CALC_FINDRISK",
        },
        {
          title: "Escala de Karnofsky",
          value: "CALC_KARNOFSKY",
        },
        {
          title: "Clasificación de la herida",
          value: "CLASIF_HERI",
        },
        {
          title: "Dimensión de la herida",
          value: "DIMENSION_HERI",
        },
        {
          title: "Profundidad Tejidos afectados",
          value: "PROFUN_TEJID",
        },
        {
          title: "Comorbilidad",
          value: "COMORBILIDAD",
        },
        {
          title: "Estadio de la herida",
          value: "ESTADIO_HERI",
        },
        {
          title: "Infección",
          value: "INFECCION",
        },
        {
          title: "Tiempo de Evolución en Tratamiento",
          value: "TIEMPO_EVOLU",
        },
        {
          title: "Registro Fotografico",
          value: "REGISTRO_FOTO",
        },
        {
          title: "Escala de Heridas",
          value: "CALC_HERIDAS",
        },
        {
          title: "Observaciones Paciente",
          value: "OBSERV",
        },
        {
          title: "Pais",
          value: "DESCRIP_PAIR",
        },
        {
          title: "Agudeza Visual OI",
          value: "AGUD_VISUAL_OI",
        },
        {
          title: "Estruct Ocul OI",
          value: "ESTRUCTURAS_OCULARES_OI",
        },
        {
          title: "Agudeza Visual OD",
          value: "AGUD_VISUAL_OD",
        },
        {
          title: "Estruct Ocul OD",
          value: "ESTRUCTURAS_OCULARES_OD",
        },
        {
          title: "Sexo sin Protección",
          value: "SEXO_SIN_PROTECCION",
        },
        {
          title: "Prueba Vih-Sifilis",
          value: "PRUEBA_VIH_SIFILIS",
        },
        {
          title: "Resultado Vih-Sifilis",
          value: "RESULTADO_VIH_SIFILIS",
        },
        {
          title: "Esquema de Vacunación Completo",
          value: "ESQ_VACUNA_COMPLETO",
        },
        {
          title: "Salud Oral Ultimos 6 meses",
          value: "SALUD_ORAL_ULT_6MES",
        },
        {
          title: "Estado IMC",
          value: "ESTADO_IMC",
        },
        {
          title: "Indicador Talla para la Edad",
          value: "INDICADOR_TALLA_EDAD",
        },
        {
          title: "Pre Asesoria Vih",
          value: "FECHA_ASESORIA_PRE_VIH",
          format: "string",
        },
        {
          title: "Pos Asesoria Vih",
          value: "FECHA_ASESORIA_POS_VIH",
          format: "string",
        },
        {
          title: "Fecha Ult Mamografia",
          value: "FECHA_ULT_MAMO",
          format: "string",
        },
        {
          title: "Tacto Rectal",
          value: "TACTO_RECTAL",
        },
        {
          title: "Resultado Tacto Rectal",
          value: "RESULT_TACTO_RECTAL",
        },
        {
          title: "Nota Tacto Rectal",
          value: "NOTA_TACTO_RECTAL",
        },
        {
          title: "Disc Fisica",
          value: "FISICA",
        },
        {
          title: "Disc Mental",
          value: "MENTAL",
        },
        {
          title: "Disc Cognitiva",
          value: "COGNITIVA",
        },
        {
          title: "Disc Auditiva",
          value: "AUDITIVA",
        },
        {
          title: "Disc Visual",
          value: "VISUAL",
        },
        {
          title: "Disc Multiple",
          value: "DISCAPACIDADES",
        },
        {
          title: "Prueba Embarazo",
          value: "PRUEBA_EMBARAZO",
        },
        {
          title: "Gest previas",
          value: "GESTACIONES",
        },
        {
          title: "Partos Vaginales",
          value: "PARTOS",
        },
        {
          title: "Partos Abdominales",
          value: "CESAREAS",
        },
        {
          title: "Nacidos Vivos",
          value: "GINE_VIVOS",
        },
        {
          title: "Nacidos Muertos",
          value: "GINE_MUERTOS",
        },
        {
          title: "Partos a Termino",
          value: "PARTOS_TERMINO",
        },
        {
          title: "Partos Prematuros",
          value: "PARTOS_PREMATURO",
        },
        {
          title: "Abortos",
          value: "ABORTOS",
        },
        {
          title: "Fecha 1ra Vez",
          value: "FECHA_PRIMERA_VEZ",
        },
        {
          title: "Continua Metodo Plan",
          value: "CONTINUA_METODO",
        },
        {
          title: "Edad Gest Nacer",
          value: "EDAD_GEST",
        },
        {
          title: "Quiere Dejar de Fumar",
          value: "DEJAR_FUMAR_HC",
        },
        {
          title: "Perimetro Braquial",
          value: "PER_BRAQ",
        },
        {
          title: "Conducta Evo",
          value: "CONDUCTA_EVO",
        },
        {
          title: "Procedimiento Cuello Uterino",
          value: "PROCED_CUELLO",
        },
        {
          title: "Sala de cirugia",
          value: "DESCRIP_SALA",
        },
        {
          title: "Edad Primer Alimento Diferente a la Leche Materna",
          value: "ALI_EDAD_PRIMER_AIE",
        },
        {
          title: "Transito o Viajo en los Ultimos 14 dias por Pais Confirmado con COVID19",
          value: "VIAJE_COVID19",
        },
        {
          title: "Contacto con Persona Diagnosticada con COVID19",
          value: "CONTACTO_COVID19",
        },
        {
          title: "Fiebre COVID19",
          value: "FIEBRE_COVID19",
        },
        {
          title: "Tos COVID19",
          value: "TOS_COVID19",
        },
        {
          title: "Disnea COVID19",
          value: "DISNEA_COVID19",
        },
        {
          title: "Malestar COVID19",
          value: "MALESTAR_COVID19",
        },
        {
          title: "Rinorrea COVID19",
          value: "RINORREA_COVID19",
        },
        {
          title: "Odinofagia COVID19",
          value: "ODINOFAGIA_COVID19",
        },
        {
          title: "Viaje dentro del Pais (14 dias) COVID19",
          value: "VIAJE_DENTRO_COVID19",
        },
        {
          title: "Lugar Viaje dentro COVID19",
          value: "LUGAR_DENTRO_COVID19",
        },
        {
          title: "Dias de Viaje COVID19",
          value: "TIEMPO_DENTRO_COVID19",
        },
        {
          title: "Viaje al Extranjero (14 dias) COVID19",
          value: "VIAJE_FUERA_COVID19",
        },
        {
          title: "Lugar Viaje Exterior COVID19",
          value: "LUGAR_FUERA_COVID19",
        },
        {
          title: "Dias de Viaje Exterior COVID19",
          value: "TIEMPO_FUERA_COVID19",
        },
        {
          title: "Es Personal de la Salud u otro Ambito Hospitalario",
          value: "PERSONAL_SALUD_COVID19",
        },
        {
          title: "Diabetes COVID19",
          value: "DIABETES_COVID19",
        },
        {
          title: "Enfermedad Cardiovascular COVID19",
          value: "ENF_CARDIOVAS_COVID19",
        },
        {
          title: "Falla Renal COVID19",
          value: "FALLA_RENAL_COVID19",
        },
        {
          title: "Vih COVID19",
          value: "VIH_COVID19",
        },
        {
          title: "Cancer COVID19",
          value: "CANCER_COVID19",
        },
        {
          title: "Enf Autoinmunes COVID19",
          value: "ENF_AUTOINMUN_COVID19",
        },
        {
          title: "Hipotiroidismo COVID19",
          value: "HIPOTIROID_COVID19",
        },
        {
          title: "Uso de Corticoides o Inmunosupresores COVID19",
          value: "CORTICO_INMUNO_COVID19",
        },
        {
          title: "Epoc y Asma COVID19",
          value: "EPOC_ASMA_COVID19",
        },
        {
          title: "Mal Nutrición COVID19",
          value: "MAL_NUTRICION_COVID19",
        },
        {
          title: "Fumadores COVID19",
          value: "FUMADORES_COVID19",
        },
        {
          title: "Impresión de Recomendaciones COVID19",
          value: "RECOMENDACION_COVID19",
        },
        {
          title: "Se Realizó consentimiento a acompañante COVID19",
          value: "CONSENTI_ACOMP_COVID19",
        },
        {
          title: "Cod Especialidad",
          value: "ESP_PROF",
        },
        {
          title: "Especialidad Medico",
          value: "NOMBRE_ESP_MED",
        },
        {
          title: "Puntuación Comprensión Vale",
          value: "RESP_NEG_COMP",
        },
        {
          title: "Puntuación Expresión Vale",
          value: "RESP_NEG_EXPR",
        },
        {
          title: "Puntuación interacción Vale",
          value: "RESP_NEG_INTE",
        },
        {
          title: "Puntuación Vestibular Vale",
          value: "RESP_NEG_VESI",
        },
        {
          title: "Total Puntuación Neg Vale",
          value: "TOTAL_RESP_NEG",
        },
        {
          title: "Total Puntuación Afi Vale",
          value: "TOTAL_RESP_AFI",
        },
        {
          title: "Paciente Diag DM",
          value: "DIAG_DM",
        },
        {
          title: "Fecha Diag DM",
          value: "FECHA_DIAG_DM",
          format: "string",
        },
        {
          title: "Paciente Diag HTA",
          value: "DIAG_HTA",
        },
        {
          title: "Fecha Diag HTA",
          value: "FECHA_DIAG_HTA",
          format: "string",
        },
        {
          title: "Paciente esta en el Programa Cronicos/Renal",
          value: "PROG_CRO",
        },
        {
          title: "Fecha Ingreso",
          value: "FECHA_PROG_CRO",
          format: "string",
        },
        {
          title: "No Aplica-Paciente TRR",
          value: "PROG_CRO_TRR",
        },
        {
          title: "Pte no ha Ingresado o es Inasistente",
          value: "INAS_PROG_CRO",
        },
        {
          title: "Usuario Recibe IECA",
          value: "IECA",
        },
        {
          title: "Usuario Recibe ARAII",
          value: "ARAII",
        },
        {
          title: "Fecha Ultimo Parto",
          value: "FECHA_ULT_PARTO",
          format: "string",
        },
        {
          title: "Peso al Nacer",
          value: "PESO_NACER",
        },
        {
          title: "Paciente Cronico",
          value: "CRONICO_PACI",
        },
        {
          title: "Resultado Vale",
          value: "PTJ_VALE",
        },
        {
          title: "Ptj Apgar 1",
          value: "PTJ_APGAR_1",
        },
        {
          title: "Ptj Apgar 2",
          value: "PTJ_APGAR_2",
        },
        {
          title: "Ptj Apgar 3",
          value: "PTJ_APGAR_3",
        },
        {
          title: "Ptj Apgar 4",
          value: "PTJ_APGAR_4",
        },
        {
          title: "Ptj Apgar 5",
          value: "PTJ_APGAR_5",
        },
        {
          title: "Estadio ERC",
          value: "ESTADIO_ERC",
        },
        {
          title: "Paciente Diabetico",
          value: "DIABETES_PACI",
        },
        {
          title: "Resultado de Colesterol Ultimos 3 meses",
          value: "COLESTEROL_HDL_3M_9008",
        },
        {
          title: "Resultado de Colesterol",
          value: "VALOR_COLESTEROL_9008",
        },
        {
          title: "Resultado HDL",
          value: "VALOR_HDL_9008",
        },
        {
          title: "Consume Derivados del Tabaco",
          value: "CONSUME_TABACO_9008",
        },
        {
          title: "Acompañante HC",
          value: "ACOMPA_HC",
        },
        {
          title: "Acompañante Evolución",
          value: "ACOMPA_EVO",
        },
        {
          title: "Puntaje Final Minimental",
          value: "MNSE_9013",
        },
        {
          title: "Puntaje con Factores Minimental",
          value: "MNSE_FIN_9013",
        },
        {
          title: "Total Motricidad Gruesa",
          value: "PT_DIRECTA_EAD3_MG",
        },
        {
          title: "Total Motricidad Fina Adaptativa",
          value: "PT_DIRECTA_EAD3_MF",
        },
        {
          title: "Total Audición y Lenguaje",
          value: "PT_DIRECTA_EAD3_AL",
        },
        {
          title: "Total Personal Social",
          value: "PT_DIRECTA_EAD3_PS",
        },
        {
          title: "Vacunado contra COVID19",
          value: "VACUNADO_COVID19_9012",
        },
        {
          title: "Etapa de Vacunación COVID",
          value: "ETAPA_VACUNA_9012",
        },
        {
          title: "Tipo de Vacuna COVID",
          value: "TIPO_VACUNA_9012",
        },
        {
          title: "Numero de Dosis COVID",
          value: "NRO_DOSIS_9012",
        },
        {
          title: "IRA TRIAGE",
          value: "ERA_TRIA",
        },
      ];
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
          this.datoFormato();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando profesionales", null, "error", "");
          _regresar_menuhis();
        });
    },
  },
});
