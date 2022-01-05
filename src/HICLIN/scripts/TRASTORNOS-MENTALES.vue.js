//APLICAR ESTA REGLA CSS EN INSTANCIO DE VUE PADRE

{/* <style>
  @media (min-width: 992px) {
    .padding-col-left {
      padding-left: 1rem !important;
    }
  }
</style> */}

module.exports = Vue.component("component-trans-mentales", {
  props: {
    params: {},
    data: {},
  },

  data() {
    return {
      trastorno_mental: this.data,
      fechaRemPsiquiW: {},
      fechaNotiObligW: {},
      fechaCierreCasoW: {},

      opcOriSexual: [
        { COD: "1", DESCRIP: "HETEROSEXUAL" },
        { COD: "2", DESCRIP: "LESBIANA" },
        { COD: "3", DESCRIP: "BISEXUAL" },
        { COD: "4", DESCRIP: "GAY" },
        { COD: "5", DESCRIP: "TRANSEXUAL" },
        { COD: "6", DESCRIP: "INTERSEXUAL" },
        { COD: "7", DESCRIP: "NO APLICA" },
      ],

      opcDiscapacidad: [
        { COD: "1", DESCRIP: "DISCAPACIDAD FISICA" },
        { COD: "2", DESCRIP: "DISCAPACIDAD COGNITIVA" },
        { COD: "3", DESCRIP: "DISCAPACIDAD SENSORIAL" },
        { COD: "4", DESCRIP: "NINGUNA" },
        { COD: "5", DESCRIP: "SIN DATO" },
        { COD: "6", DESCRIP: "DISCAPACIDAD AUDITIVA" },
        { COD: "7", DESCRIP: "DISCAPACIDAD VISUAL" },
        { COD: "8", DESCRIP: "DISCAPACIDAD MENTAL" },
      ],

      opcVulnerabilidad: [
        { COD: "1", DESCRIP: "HABILIDAD EN LA CALLE" },
        { COD: "2", DESCRIP: "TRABAJO SEXUAL" },
        { COD: "3", DESCRIP: "ADULTO MAYOR DE 60 AÑOS" },
        { COD: "4", DESCRIP: "CONSUMO DE SPA" },
        { COD: "5", DESCRIP: "PRIVADO DE LA LIBERTAD" },
        { COD: "6", DESCRIP: "ENFERMEDAD MENTAL" },
        { COD: "7", DESCRIP: "ABANDONO SOCIAL" },
        { COD: "8", DESCRIP: "DESEMPLEO" },
        { COD: "9", DESCRIP: "DESESCOLARIZACION" },
        { COD: "A", DESCRIP: "NO APLICA" },
      ],

      opcTipoEvento: [
        { COD: "1", DESCRIP: "SUSTANCIAS PSICOACTIVAS" },
        { COD: "2", DESCRIP: "DEPRESION" },
        { COD: "3", DESCRIP: "ANSIEDAD" },
        { COD: "4", DESCRIP: "DEPRESION Y ANSIEDAD" },
        { COD: "5", DESCRIP: "DEPRESION E INTENTO DE SUICIDIO" },
        { COD: "6", DESCRIP: "EPILEPSIA" },
        { COD: "7", DESCRIP: "ESQUIZOFRENIA" },
        { COD: "8", DESCRIP: "PSICOSIS" },
        { COD: "9", DESCRIP: "DEMENCIA" },
        { COD: "A", DESCRIP: "AUTOLESION/SUICIDIO" },
        { COD: "B", DESCRIP: "NO APLICA" },
      ],

      opcRecaidas: [
        { COD: "1", DESCRIP: "NO" },
        { COD: "2", DESCRIP: "SI RECAIDA HASTA 2 VECES" },
        { COD: "3", DESCRIP: "SI RECAIDA HASTA 3 VECES" },
        { COD: "4", DESCRIP: "SI RECAIDA MAS DE 3 VECES" },
        { COD: "5", DESCRIP: "N/A" },
      ],

      opcRiesgoPsicosocial: [
        { COD: "1", DESCRIP: "PERIDDA RECIENTE" },
        { COD: "2", DESCRIP: "CONFLICTOS DE PAREJA" },
        { COD: "3", DESCRIP: "CONFLICTO FAMILIAR" },
        { COD: "4", DESCRIP: "PROBLEMAS ESCOLARES" },
        { COD: "5", DESCRIP: "STRESS" },
        { COD: "6", DESCRIP: "CRISIS ECONOMICA" },
        { COD: "7", DESCRIP: "ENFERMEDAD CRONICA" },
        { COD: "8", DESCRIP: "VICTIMA DE MATONEO" },
        { COD: "9", DESCRIP: "ANTECEDENTE FAMILIAR DE CONSUMO DE SPA" },
        { COD: "A", DESCRIP: "ANTECEDENTE FAMILIAR DE SUICIDIO" },
        { COD: "B", DESCRIP: "ANTECEDENTE DE MALTRATO O VIOLENCIA" },
        { COD: "C", DESCRIP: "FALTA DE COMPROMISO FAMILIAR" },
        { COD: "D", DESCRIP: "PERTENECIA A PANDILLAS" },
        { COD: "E", DESCRIP: "NO SE IDENTIFICA" },
        { COD: "F", DESCRIP: "NINGUNO" },
      ],

      opcAccionesRealizadas: [
        { COD: "1", DESCRIP: "NOTIFICACION A JUSTICIA" },
        { COD: "2", DESCRIP: "NOTIFICACION A PROTECCION" },
        { COD: "3", DESCRIP: "CANALIZACION A EDUCACION" },
        { COD: "4", DESCRIP: "CANALIZACION A DESARROLLO SOCIAL" },
        { COD: "5", DESCRIP: "REMISION A SALUD" },
        { COD: "6", DESCRIP: "TODAS" },
        { COD: "7", DESCRIP: "NO APLICA" },
      ],

      opcTamizaje: [
        { COD: "1", DESCRIP: "APGAR FAMILIAR" },
        { COD: "2", DESCRIP: "TEST DE ZUNG" },
        { COD: "3", DESCRIP: "RQC (NIÑOS)" },
        { COD: "4", DESCRIP: "SQR (ADULTOS)" },
        { COD: "5", DESCRIP: "ASSIST" },
        { COD: "6", DESCRIP: "APGAR Y RQC" },
        { COD: "7", DESCRIP: "RQC Y ASSIST" },
        { COD: "8", DESCRIP: "RQC Y SQR" },
        { COD: "9", DESCRIP: "NINGUNO" },
      ],

      opcManejoTamizaje: [
        { COD: "1", DESCRIP: "INTERVENCION BREVE" },
        { COD: "2", DESCRIP: "ENTREVISTA MOTIVACIONAL" },
        { COD: "3", DESCRIP: "PRIMEROS AUXILIOS PSICOLOGICOS" },
        { COD: "4", DESCRIP: "CANALIZACION O REMICION" },
        { COD: "5", DESCRIP: "ARTICULACION OTRO SECTOR" },
        { COD: "6", DESCRIP: "NO APLICA" },
      ],

      opcCapacitacionMent: [
        { COD: "1", DESCRIP: "PYP" },
        { COD: "2", DESCRIP: "CONSULTA EXTERNA" },
        { COD: "3", DESCRIP: "URGENCIAS" },
        { COD: "4", DESCRIP: "TAMIZAJE" },
        { COD: "5", DESCRIP: "OTRA" },
        { COD: "6", DESCRIP: "NO APLICA" },
      ],

      opcConsumoSPA: [
        { COD: "1", DESCRIP: "ALCOHOLICOS ANONIMOS" },
        { COD: "2", DESCRIP: "NARCOTICOS ANONIMOS" },
        { COD: "3", DESCRIP: "TODOS" },
        { COD: "4", DESCRIP: "NINGUNO" },
        { COD: "5", DESCRIP: "N/A" },
        { COD: "6", DESCRIP: "OTROS" },
      ],

      opcCanaliza: [
        { COD: "1", DESCRIP: "ZOE" },
        { COD: "2", DESCRIP: "ZOU" },
        { COD: "3", DESCRIP: "CENTRO DE ESCUCHA" },
        { COD: "4", DESCRIP: "ESTRATEGIA RBC" },
        { COD: "5", DESCRIP: "ZOL" },
        { COD: "6", DESCRIP: "CENTRO DE ESCUCHA Y ZOE" },
        { COD: "7", DESCRIP: "TODAS" },
        { COD: "8", DESCRIP: "NINGUNO" },
      ],

      opcSeguimiento: [
        { COD: "1", DESCRIP: "CONTROL" },
        { COD: "2", DESCRIP: "VISISTAS" },
        { COD: "3", DESCRIP: "REMISION" },
        { COD: "4", DESCRIP: "MONITOREO TELEFONICO" },
        { COD: "5", DESCRIP: "EDUCACION SEGUN RIESGO" },
        { COD: "6", DESCRIP: "OTRO" },
        { COD: "7", DESCRIP: "NO APLICA" },
      ],

      opcAdherenciaTrata: [
        { COD: "1", DESCRIP: "SI" },
        { COD: "2", DESCRIP: "NO INASISTE A TTO PSICOTERAPEUTICO" },
        { COD: "3", DESCRIP: "NO RENUENTE A TTO FARMACOLOGICO" },
        { COD: "4", DESCRIP: "NO SIN RED DE APOYO" },
        { COD: "5", DESCRIP: "NO INASISTE A TTO PSICOTERAPEUTICO Y FARMACOLOGICO" },
        { COD: "6", DESCRIP: "TODAS LAS ANTERIORES" },
        { COD: "7", DESCRIP: "NO APLICA" },
      ],

      opcSeguimientoContrarefe: [
        { COD: "1", DESCRIP: "SI" },
        { COD: "2", DESCRIP: "NO DESCONOCE CONTRAREFERENCIA" },
        { COD: "3", DESCRIP: "NI SIGUE CONTROL" },
        { COD: "4", DESCRIP: "N/A" },
      ],

      opcEvaluacionMHGAP: [
        { COD: "1", DESCRIP: "NO" },
        { COD: "2", DESCRIP: "INTERVENCION FARMACOLOGICA" },
        { COD: "3", DESCRIP: "INTERVENCION PSICOSOCIAL" },
        { COD: "4", DESCRIP: "INTERVENCION FARMACOLOGICA Y PSICOSOCIAL" },
        { COD: "5", DESCRIP: "NINGUNA" },
      ],

      opcPronosticoTerapeutico: [
        { COD: "1", DESCRIP: "BUEN PRONOSTICO (SEGUIMIENTO TRIMESTRAL, SEMESTRAL, ANUAL)" },
        { COD: "2", DESCRIP: "MEJORA ACEPTABLE (REQUIERE REHABILITACION EN SALUD MENTAL)" },
        { COD: "3", DESCRIP: "MAL PRONOSTICO - ABANDONO DE TRATAMIENTO" },
        { COD: "4", DESCRIP: "SIN MEJORA" },
        { COD: "5", DESCRIP: "CON RECAIDAS" },
        { COD: "6", DESCRIP: "BUEN PRONOSTICO - CIERRE CASO" },
        { COD: "7", DESCRIP: "NO APLICA" },
      ],

      styles: {
        rowFlexInput: {
          display: "flex",
          alignItems: "center",
          margin: "0.5rem 0 0.5rem 0",
          flexWrap: "wrap",
        },

        flexJustifyContent: {
          "justify-content": "center !important",
        },

        flexDate: {
          display: "flex",
        },

        labelLeft: {
          textAlign: "left",
        },
      },
    };
  },

  async created() {
    this.fechaRemPsiquiW = this.fechaEdit(this.trastorno_mental.fecha_remision_psiqui);
    this.fechaNotiObligW = this.fechaEdit(this.trastorno_mental.fecha_notifica_oblig);
    this.fechaCierreCasoW = this.fechaEdit(this.trastorno_mental.fecha_cierre_caso);

    this.trastorno_mental.observaciones_ment = this.trastorno_mental.observaciones_ment.enterPut();
    console.log("componente");
  },

  watch: {
    "params.estado": function (estado) {
      if (estado) this.datoOrientacionSexual();
    },

    "trastorno_mental.observaciones_ment": function (val) {
      this.trastorno_mental.observaciones_ment = val ? val.replaceEsp() : "";
    },
  },

  computed: {
    descripOriSexual() {
      let orientacion = this.opcOriSexual.find((el) => el.COD == this.trastorno_mental.orientacion_sex_ment);
      return orientacion ? orientacion.DESCRIP : "";
    },

    descripDiscapacidad() {
      let discapacidad = this.opcDiscapacidad.find((el) => el.COD == this.trastorno_mental.discapacidad_ment);
      return discapacidad ? discapacidad.DESCRIP : "";
    },

    descripVulnerabilidad() {
      let vulnerabilidad = this.opcVulnerabilidad.find((el) => el.COD == this.trastorno_mental.vulnerabilidad_ment);
      return vulnerabilidad ? vulnerabilidad.DESCRIP : "";
    },

    descripTipoEvento() {
      let evento = this.opcTipoEvento.find((el) => el.COD == this.trastorno_mental.tipo_evento_ment);
      return evento ? evento.DESCRIP : "";
    },

    descripRecaidas() {
      let recaidas = this.opcRecaidas.find((el) => el.COD == this.trastorno_mental.recaidas_ment);
      return recaidas ? recaidas.DESCRIP : "";
    },

    descripRiesgoPsico() {
      let riesgo = this.opcRiesgoPsicosocial.find((el) => el.COD == this.trastorno_mental.riesgo_psicos_ment);
      return riesgo ? riesgo.DESCRIP : "";
    },

    descripAcciones() {
      let acciones = this.opcAccionesRealizadas.find((el) => el.COD == this.trastorno_mental.acciones_reali_ment);
      return acciones ? acciones.DESCRIP : "";
    },

    descripAcciones() {
      let acciones = this.opcAccionesRealizadas.find((el) => el.COD == this.trastorno_mental.acciones_reali_ment);
      return acciones ? acciones.DESCRIP : "";
    },

    descripTamizaje() {
      let tamizaje = this.opcTamizaje.find((el) => el.COD == this.trastorno_mental.tamizajes_ment);
      return tamizaje ? tamizaje.DESCRIP : "";
    },

    descripManejoTamizaje() {
      let manejo = this.opcManejoTamizaje.find((el) => el.COD == this.trastorno_mental.manejo_tamizaje_ment);
      return manejo ? manejo.DESCRIP : "";
    },

    descripCapacitacionMent() {
      let capacitacion = this.opcCapacitacionMent.find((el) => el.COD == this.trastorno_mental.captacion_ment);
      return capacitacion ? capacitacion.DESCRIP : "";
    },

    descripConsumoSPA() {
      let consumo = this.opcConsumoSPA.find((el) => el.COD == this.trastorno_mental.consumo_spa_ment);
      return consumo ? consumo.DESCRIP : "";
    },

    descripCanaliza() {
      let canaliza = this.opcCanaliza.find((el) => el.COD == this.trastorno_mental.canaliza_dispos_ment);
      return canaliza ? canaliza.DESCRIP : "";
    },

    descripAccionesSegui() {
      let seguimiento = this.opcSeguimiento.find((el) => el.COD == this.trastorno_mental.acciones_segui_ment);
      return seguimiento ? seguimiento.DESCRIP : "";
    },

    descripAdherenciaTrata() {
      let adherencia = this.opcAdherenciaTrata.find((el) => el.COD == this.trastorno_mental.adherencia_trat_ment);
      return adherencia ? adherencia.DESCRIP : "";
    },

    descripSeguimientoContrarefe() {
      let seguimiento = this.opcSeguimientoContrarefe.find((el) => el.COD == this.trastorno_mental.segui_contra_ment);
      return seguimiento ? seguimiento.DESCRIP : "";
    },

    descripEvaluacionMHGAP() {
      let evaluacion = this.opcEvaluacionMHGAP.find((el) => el.COD == this.trastorno_mental.evaluacion_mhgap);
      return evaluacion ? evaluacion.DESCRIP : "";
    },

    descripPronosticoTerapeutico() {
      let pronostico = this.opcPronosticoTerapeutico.find((el) => el.COD == this.trastorno_mental.pronostico_tera_ment);
      return pronostico ? pronostico.DESCRIP : "";
    },
  },

  methods: {
    datoOrientacionSexual() {
      setTimeout(
        () =>
          POPUP(
            {
              array: this.opcOriSexual,
              titulo: "ORIENTACIÓN SEXUAL",
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.trastorno_mental.orientacion_sex_ment,
              callback_f: () => {
                CON851P(
                  "03",
                  () => this.datoOrientacionSexual(),
                  () => this.salir()
                );
              },
            },
            (data) => {
              this.trastorno_mental.orientacion_sex_ment = data.COD;
              this.datoDiscapacidad();
            }
          ),
        300
      );
    },

    datoDiscapacidad() {
      setTimeout(
        () =>
          POPUP(
            {
              array: this.opcDiscapacidad,
              titulo: "PRESENTA DISCAPACIDAD",
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.trastorno_mental.discapacidad_ment,
              callback_f: () => this.datoOrientacionSexual(),
            },
            (data) => {
              this.trastorno_mental.discapacidad_ment = data.COD;
              this.datoVulnerabilidad();
            }
          ),
        300
      );
    },

    datoVulnerabilidad() {
      setTimeout(
        () =>
          POPUP(
            {
              array: this.opcVulnerabilidad,
              titulo: "CONDICION DE VULNERABILIDAD",
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.trastorno_mental.vulnerabilidad_ment,
              callback_f: () => this.datoDiscapacidad(),
            },
            (data) => {
              this.trastorno_mental.vulnerabilidad_ment = data.COD;
              this.datoTipoEvento();
            }
          ),
        300
      );
    },

    datoTipoEvento() {
      setTimeout(
        () =>
          POPUP(
            {
              array: this.opcTipoEvento,
              titulo: "TIPO EVENTO",
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.trastorno_mental.tipo_evento_ment,
              callback_f: () => this.datoVulnerabilidad(),
            },
            (data) => {
              this.trastorno_mental.tipo_evento_ment = data.COD;
              this.datoRecaidas();
            }
          ),
        300
      );
    },

    datoRecaidas() {
      setTimeout(
        () =>
          POPUP(
            {
              array: this.opcRecaidas,
              titulo: "RECAIDAS",
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.trastorno_mental.recaidas_ment,
              callback_f: () => this.datoTipoEvento(),
            },
            (data) => {
              this.trastorno_mental.recaidas_ment = data.COD;
              this.datoRiesgoPsicosocial();
            }
          ),
        300
      );
    },

    datoRiesgoPsicosocial() {
      setTimeout(
        () =>
          POPUP(
            {
              array: this.opcRiesgoPsicosocial,
              titulo: "EXISTE RIESGO PSICOSOCIAL",
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.trastorno_mental.riesgo_psicos_ment,
              callback_f: () => this.datoRecaidas(),
            },
            (data) => {
              this.trastorno_mental.riesgo_psicos_ment = data.COD;
              this.datoAccionesRealizadas();
            }
          ),
        300
      );
    },

    datoAccionesRealizadas() {
      setTimeout(
        () =>
          POPUP(
            {
              array: this.opcAccionesRealizadas,
              titulo: "ACCIONES REALIZADAS",
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.trastorno_mental.acciones_reali_ment,
              callback_f: () => this.datoRiesgoPsicosocial(),
            },
            (data) => {
              this.trastorno_mental.acciones_reali_ment = data.COD;
              this.datoMedicinaGral();
            }
          ),
        300
      );
    },

    datoMedicinaGral() {
      validarInputs(
        {
          form: "#datoMedicinaGral",
          orden: "1",
        },
        () => this.datoAccionesRealizadas(),
        () => {
          let medicinaGral = (this.trastorno_mental.medicina_gral_ment = this.trastorno_mental.medicina_gral_ment
            .toUpperCase()
            .trim());

          switch (medicinaGral) {
            case "S":
            case "N":
              this.datoPsicologia();
              break;
            default:
              CON851("03", "03", null, "warning", "Advertencia");
              this.datoMedicinaGral();
              break;
          }
        }
      );
    },

    datoPsicologia() {
      validarInputs(
        {
          form: "#datoPsicologia",
          orden: "1",
        },
        () => this.datoMedicinaGral(),
        () => {
          let psicologia = (this.trastorno_mental.psicologia_ment = this.trastorno_mental.psicologia_ment
            .toUpperCase()
            .trim());

          switch (psicologia) {
            case "S":
            case "N":
              this.datoPsicoteratiaInd();
              break;
            default:
              CON851("03", "03", null, "warning", "Advertencia");
              this.datoPsicologia();
              break;
          }
        }
      );
    },

    datoPsicoteratiaInd() {
      validarInputs(
        {
          form: "#datoPsicoteratiaInd",
        },
        () => this.datoPsicologia(),
        () => {
          this.trastorno_mental.psicote_ind_ment = this.trastorno_mental.psicote_ind_ment.padStart(2, "0");
          this.datoPsicoteratiaIndEjec();
        }
      );
    },

    datoPsicoteratiaIndEjec() {
      validarInputs(
        {
          form: "#datoPsicoteratiaIndEjec",
        },
        () => this.datoPsicoteratiaInd(),
        () => {
          this.trastorno_mental.psicote_ind_ejec_ment = this.trastorno_mental.psicote_ind_ejec_ment.padStart(2, "0");
          this.datoPsicoteratiaFam();
        }
      );
    },

    datoPsicoteratiaFam() {
      validarInputs(
        {
          form: "#datoPsicoteratiaFam",
        },
        () => this.datoPsicoteratiaIndEjec(),
        () => {
          this.trastorno_mental.psicote_fam_ment = this.trastorno_mental.psicote_fam_ment.padStart(2, "0");
          this.datoPsicoteratiaFamEjec();
        }
      );
    },

    datoPsicoteratiaFamEjec() {
      validarInputs(
        {
          form: "#datoPsicoteratiaFamEjec",
        },
        () => this.datoPsicoteratiaFam(),
        () => {
          this.trastorno_mental.psicote_fam_ejec_ment = this.trastorno_mental.psicote_fam_ejec_ment.padStart(2, "0");
          this.datoAnioRemPsiquiatria();
        }
      );
    },

    datoAnioRemPsiquiatria() {
      validarInputs(
        {
          form: "#datoAnioRemPsiquiatria",
        },
        () => this.datoPsicoteratiaFamEjec(),
        () => {
          let anio = parseInt((this.fechaRemPsiquiW.anio = this.fechaRemPsiquiW.anio.padStart(4, "0")));
          if (anio == 0) {
            this.fechaRemPsiquiW = this.fechaEdit();
            this.trastorno_mental.fecha_remision_psiqui = Object.values(this.fechaRemPsiquiW).join("");
            this.datoAnioNotiObilig();
          } else this.datoMesRemPsiquiatria();
        }
      );
    },

    datoMesRemPsiquiatria() {
      validarInputs(
        {
          form: "#datoMesRemPsiquiatria",
        },
        () => this.datoAnioRemPsiquiatria(),
        () => {
          let mes = parseInt((this.fechaRemPsiquiW.mes = this.fechaRemPsiquiW.mes.padStart(2, "0")));
          if (mes < 1 || mes > 12) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoMesRemPsiquiatria();
          } else this.datoDiaRemPsiquiatria();
        }
      );
    },

    datoDiaRemPsiquiatria() {
      validarInputs(
        {
          form: "#datoDiaRemPsiquiatria",
        },
        () => this.datoMesRemPsiquiatria(),
        () => {
          let dia = parseInt((this.fechaRemPsiquiW.dia = this.fechaRemPsiquiW.dia.padStart(2, "0")));
          if (
            dia < 1 ||
            dia > 31 ||
            !_validarFecha(this.fechaRemPsiquiW.anio, this.fechaRemPsiquiW.mes, this.fechaRemPsiquiW.dia)
          ) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioRemPsiquiatria();
          } else {
            this.trastorno_mental.fecha_remision_psiqui = Object.values(this.fechaRemPsiquiW).join("");
            this.datoAnioNotiObilig();
          }
        }
      );
    },

    datoAnioNotiObilig() {
      validarInputs(
        {
          form: "#datoAnioNotiObilig",
        },
        () => this.datoAnioRemPsiquiatria(),
        () => {
          let anio = parseInt((this.fechaNotiObligW.anio = this.fechaNotiObligW.anio.padStart(4, "0")));
          if (anio == 0) {
            this.fechaNotiObligW = this.fechaEdit();
            this.trastorno_mental.fecha_notifica_oblig = Object.values(this.fechaNotiObligW).join("");
            this.datoFamiCuida();
          } else this.datoMesNotiObilig();
        }
      );
    },

    datoMesNotiObilig() {
      validarInputs(
        {
          form: "#datoMesNotiObilig",
        },
        () => this.datoAnioNotiObilig(),
        () => {
          let mes = parseInt((this.fechaNotiObligW.mes = this.fechaNotiObligW.mes.padStart(2, "0")));
          if (mes < 1 || mes > 12) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoMesNotiObilig();
          } else this.datoDiaNotiObilig();
        }
      );
    },

    datoDiaNotiObilig() {
      validarInputs(
        {
          form: "#datoDiaNotiObilig",
        },
        () => this.datoMesNotiObilig(),
        () => {
          let dia = parseInt((this.fechaNotiObligW.dia = this.fechaNotiObligW.dia.padStart(2, "0")));
          if (
            dia < 1 ||
            dia > 31 ||
            !_validarFecha(this.fechaNotiObligW.anio, this.fechaNotiObligW.mes, this.fechaNotiObligW.dia)
          ) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioNotiObilig();
          } else {
            this.trastorno_mental.fecha_notifica_oblig = Object.values(this.fechaNotiObligW).join("");
            this.datoFamiCuida();
          }
        }
      );
    },

    datoFamiCuida() {
      validarInputs(
        {
          form: "#datoFamiCuida",
        },
        () => this.datoAnioNotiObilig(),
        () => {
          let cuida = (this.trastorno_mental.familiar_cuida_ment = this.trastorno_mental.familiar_cuida_ment
            .toUpperCase()
            .trim());

          switch (cuida) {
            case "S":
            case "N":
              this.datoTamizaje();
              break;
            default:
              CON851("03", "03", null, "warning", "Advertencia");
              this.datoFamiCuida();
              break;
          }
        }
      );
    },

    datoTamizaje() {
      setTimeout(
        () =>
          POPUP(
            {
              array: this.opcTamizaje,
              titulo: "REALIZACION TAMIZAJE",
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.trastorno_mental.tamizajes_ment,
              callback_f: () => this.datoFamiCuida(),
            },
            (data) => {
              this.trastorno_mental.tamizajes_ment = data.COD;
              this.datoManejoTamizaje();
            }
          ),
        300
      );
    },

    datoManejoTamizaje() {
      setTimeout(
        () =>
          POPUP(
            {
              array: this.opcManejoTamizaje,
              titulo: "MANEJO RESULTADO TAMIZAJE",
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.trastorno_mental.manejo_tamizaje_ment,
              callback_f: () => this.datoTamizaje(),
            },
            (data) => {
              this.trastorno_mental.manejo_tamizaje_ment = data.COD;
              this.datoCapacitacionMent();
            }
          ),
        300
      );
    },

    datoCapacitacionMent() {
      setTimeout(
        () =>
          POPUP(
            {
              array: this.opcCapacitacionMent,
              titulo: "CAPACITACION TEMPRANA DE LA POBLACION",
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.trastorno_mental.captacion_ment,
              callback_f: () => this.datoManejoTamizaje(),
            },
            (data) => {
              this.trastorno_mental.captacion_ment = data.COD;
              this.datoConsumoSPA();
            }
          ),
        300
      );
    },

    datoConsumoSPA() {
      setTimeout(
        () =>
          POPUP(
            {
              array: this.opcConsumoSPA,
              titulo: "CONSUMO DE SPA",
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.trastorno_mental.consumo_spa_ment,
              callback_f: () => this.datoCapacitacionMent(),
            },
            (data) => {
              this.trastorno_mental.consumo_spa_ment = data.COD;
              this.datoCanalizaUsu();
            }
          ),
        300
      );
    },

    datoCanalizaUsu() {
      setTimeout(
        () =>
          POPUP(
            {
              array: this.opcCanaliza,
              titulo: "CANALIZA AL USUARIO A DISPOSITIVOS",
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.trastorno_mental.canaliza_dispos_ment,
              callback_f: () => this.datoConsumoSPA(),
            },
            (data) => {
              this.trastorno_mental.canaliza_dispos_ment = data.COD;
              this.datoAccionesSegui();
            }
          ),
        300
      );
    },

    datoAccionesSegui() {
      setTimeout(
        () =>
          POPUP(
            {
              array: this.opcSeguimiento,
              titulo: "ACCIONES DE SEGUIMIENTO",
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.trastorno_mental.acciones_segui_ment,
              callback_f: () => this.datoCanalizaUsu(),
            },
            (data) => {
              this.trastorno_mental.acciones_segui_ment = data.COD;
              this.datoAdherenciaTrata();
            }
          ),
        300
      );
    },

    datoAdherenciaTrata() {
      setTimeout(
        () =>
          POPUP(
            {
              array: this.opcAdherenciaTrata,
              titulo: "ADHERENCIA A TRATAMIENTO MEDICO",
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.trastorno_mental.adherencia_trat_ment,
              callback_f: () => this.datoAccionesSegui(),
            },
            (data) => {
              this.trastorno_mental.adherencia_trat_ment = data.COD;
              this.datoSeguimientoContrarefe();
            }
          ),
        300
      );
    },

    datoSeguimientoContrarefe() {
      setTimeout(
        () =>
          POPUP(
            {
              array: this.opcSeguimientoContrarefe,
              titulo: "SEGUIMIENTO A LA CONTRAREFERENCIA",
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.trastorno_mental.segui_contra_ment,
              callback_f: () => this.datoAdherenciaTrata(),
            },
            (data) => {
              this.trastorno_mental.segui_contra_ment = data.COD;
              this.datoAnioCierreCaso();
            }
          ),
        300
      );
    },

    datoAnioCierreCaso() {
      validarInputs(
        {
          form: "#datoAnioCierreCaso",
        },
        () => this.datoSeguimientoContrarefe(),
        () => {
          let anio = parseInt((this.fechaCierreCasoW.anio = this.fechaCierreCasoW.anio.padStart(4, "0")));
          if (anio == 0) {
            this.fechaCierreCasoW = this.fechaEdit();
            this.trastorno_mental.fecha_cierre_caso = Object.values(this.fechaCierreCasoW).join("");
            this.datoEvaluacionMHGAP();
          } else this.datoMesCierreCaso();
        }
      );
    },

    datoMesCierreCaso() {
      validarInputs(
        {
          form: "#datoMesCierreCaso",
        },
        () => this.datoAnioCierreCaso(),
        () => {
          let mes = parseInt((this.fechaCierreCasoW.mes = this.fechaCierreCasoW.mes.padStart(2, "0")));
          if (mes < 1 || mes > 12) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoMesCierreCaso();
          } else this.datoDiaCierreCaso();
        }
      );
    },

    datoDiaCierreCaso() {
      validarInputs(
        {
          form: "#datoDiaCierreCaso",
        },
        () => this.datoMesCierreCaso(),
        () => {
          let dia = parseInt((this.fechaCierreCasoW.dia = this.fechaCierreCasoW.dia.padStart(2, "0")));
          if (
            dia < 1 ||
            dia > 31 ||
            !_validarFecha(this.fechaCierreCasoW.anio, this.fechaCierreCasoW.mes, this.fechaCierreCasoW.dia)
          ) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioCierreCaso();
          } else {
            this.trastorno_mental.fecha_cierre_caso = Object.values(this.fechaCierreCasoW).join("");
            this.datoEvaluacionMHGAP();
          }
        }
      );
    },

    datoEvaluacionMHGAP() {
      setTimeout(
        () =>
          POPUP(
            {
              array: this.opcEvaluacionMHGAP,
              titulo: "EVALUACION SEGUN GUIA MHGAP",
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.trastorno_mental.evaluacion_mhgap,
              callback_f: () => this.datoAnioCierreCaso(),
            },
            (data) => {
              this.trastorno_mental.evaluacion_mhgap = data.COD;
              this.datoPronosticoTerapeutico();
            }
          ),
        300
      );
    },

    datoPronosticoTerapeutico() {
      setTimeout(
        () =>
          POPUP(
            {
              array: this.opcPronosticoTerapeutico,
              titulo: "PRONOSTICO TERAPEUTICO",
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.trastorno_mental.pronostico_tera_ment,
              callback_f: () => this.datoEvaluacionMHGAP(),
            },
            (data) => {
              this.trastorno_mental.pronostico_tera_ment = data.COD;
              this.datoObservaciones();
            }
          ),
        300
      );
    },

    datoObservaciones() {
      validarInputs(
        {
          form: "#datoObservaciones",
        },
        () => this.datoPronosticoTerapeutico(),
        () => {
          this.trastorno_mental.observaciones_ment = this.trastorno_mental.observaciones_ment.trim();
          this.terminar();
        }
      );
    },

    salir() {
      this.$emit("callback_esc");
    },

    terminar() {
      console.log(this.trastorno_mental);
      this.$emit("callback", this.trastorno_mental);
    },

    // GENERALES
    fechaEdit(date) {
      date = date || "";

      return {
        anio: date.slice(0, 4),
        mes: date.slice(4, 6),
        dia: date.slice(6),
      };
    },
  },

  template: /*html*/ `
  <div class="col-md-12 no-padding">
    <div class="portlet light box-center box-title"> 
      <div class="portlet-title">
        <div class="caption">
          <span class="caption-subject bold">TRASTORNOS MENTALES Y DEL COMPORTAMIENTO</span>
        </div>
      </div>
    </div>

    <div class="form-horizontal">
      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
        <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
          <div class="col-md-12 no-padding">
            <div class="col-md-4 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
              <label class="col-md-6 col-sm-4 col-xs-4" :style="styles.labelLeft">Orientación sexual</label>
              <div class="input-group col-md-6 col-sm-8 col-xs-8">
                <input v-model="descripOriSexual" class="form-control" type="text" disabled />
              </div>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
              <label class="col-md-6 col-sm-4 col-xs-4" :style="styles.labelLeft">Presenta discapacidad ?</label>
              <div class="input-group col-md-6 col-sm-8 col-xs-8">
                <input v-model="descripDiscapacidad" class="form-control" type="text" data-orden="1" disabled />
              </div>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
              <label class="col-md-6 col-sm-4 col-xs-4" :style="styles.labelLeft">Condición de vulnerabilidad</label>
              <div class="input-group col-md-6 col-sm-8 col-xs-8">
                <input v-model="descripVulnerabilidad" class="form-control" type="text" data-orden="1" disabled />
              </div>
            </div>
          </div>
        </div>

        <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
          <div class="col-md-12 no-padding">
            <div class="col-md-3 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
              <label class="col-md-4 col-sm-4 col-xs-4" :style="styles.labelLeft">Tipo de evento</label>
              <div class="input-group col-md-8 col-sm-8 col-xs-8">
                <input v-model="descripTipoEvento" class="form-control" type="text" data-orden="1" disabled />
              </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
              <label class="col-md-4 col-sm-4 col-xs-4" :style="styles.labelLeft">Recaidas</label>
              <div class="input-group col-md-8 col-sm-8 col-xs-8">
                <input v-model="descripRecaidas" class="form-control" type="text" data-orden="1" disabled />
              </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
              <label class="col-md-4 col-sm-4 col-xs-4" :style="styles.labelLeft">Riesgo psicosocial</label>
              <div class="input-group col-md-8 col-sm-8 col-xs-8">
                <input v-model="descripRiesgoPsico" class="form-control" type="text" data-orden="1" disabled />
              </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
              <label class="col-md-4 col-sm-4 col-xs-4" :style="styles.labelLeft">Acciones realizadas</label>
              <div class="input-group col-md-8 col-sm-8 col-xs-8">
                <input v-model="descripAcciones" class="form-control" type="text" data-orden="1" disabled />
              </div>
            </div>
          </div>
        </div>

        
        <div class="col-md-4 no-padding">
          <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
            <div class="col-md-12 no-padding">
              <div class="col-md-6 col-sm-6 col-xs-12" :style="[styles.rowFlexInput, styles.flexJustifyContent]">
                <label class="col-md-12 col-sm-4 col-xs-4">Medicina general</label>
                <div id="datoMedicinaGral" class="input-group col-md-6 col-sm-6 col-xs-6">
                  <input
                    v-model="trastorno_mental.medicina_gral_ment"
                    class="form-control"
                    type="text"
                    data-orden="1"
                    maxlength="1"
                    placeholder="S/N"
                    style="text-align: center"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12" :style="[styles.rowFlexInput, styles.flexJustifyContent]">
                <label class="col-md-12 col-sm-4 col-xs-4">Psicología</label>
                <div id="datoPsicologia" class="input-group col-md-6 col-sm-6 col-xs-6">
                  <input
                    v-model="trastorno_mental.psicologia_ment"
                    class="form-control"
                    type="text"
                    data-orden="1"
                    maxlength="1"
                    placeholder="S/N"
                    style="text-align: center"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-8 no-padding padding-col-left">
          <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
            <div class="col-md-6 col sm-6 col-xs-12 no-padding">
              <label class="col-md-12 col sm-12 col-xs-12">Psicoterapia individual</label>
              <div class="col-md-6 col-sm-6 col-xs-6" :style="styles.rowFlexInput">
                <label class="col-md-6 col-sm-4 col-xs-4" :style="styles.labelLeft">Programada</label>
                <div id="datoPsicoteratiaInd" class="input-group col-md-3 col-sm-4 col-xs-6">
                  <input
                    v-model="trastorno_mental.psicote_ind_ment"
                    class="form-control"
                    type="number"
                    maxlength="2"
                    data-orden="1"
                    style="text-align: center"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-6" :style="styles.rowFlexInput">
                <label class="col-md-6 col-sm-4 col-xs-4" :style="styles.labelLeft">Ejecutadas</label>
                <div id="datoPsicoteratiaIndEjec" class="input-group col-md-3 col-sm-4 col-xs-6">
                  <input
                    v-model="trastorno_mental.psicote_ind_ejec_ment"
                    class="form-control"
                    type="number"
                    maxlength="2"
                    data-orden="1"
                    style="text-align: center"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6 col sm-6 col-xs-12 no-padding">
              <label class="col-md-12 col sm-12 col-xs-12">Psicoterapia familiar</label>
              <div class="col-md-6 col-sm-6 col-xs-6" :style="styles.rowFlexInput">
                <label class="col-md-6 col-sm-4 col-xs-4" :style="styles.labelLeft">Programada</label>
                <div id="datoPsicoteratiaFam" class="input-group col-md-3 col-sm-4 col-xs-6">
                  <input
                    v-model="trastorno_mental.psicote_fam_ment"
                    class="form-control"
                    type="number"
                    maxlength="2"
                    data-orden="1"
                    style="text-align: center"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-6" :style="styles.rowFlexInput">
                <label class="col-md-6 col-sm-4 col-xs-4" :style="styles.labelLeft">Ejecutadas</label>
                <div id="datoPsicoteratiaFamEjec" class="input-group col-md-3 col-sm-4 col-xs-6">
                  <input
                    v-model="trastorno_mental.psicote_fam_ejec_ment"
                    class="form-control"
                    type="number"
                    maxlength="2"
                    data-orden="1"
                    style="text-align: center"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12 no-padding">
          <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
            <div class="col-md-12 no-padding">
              <div class="col-md-6 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
                <label class="col-md-6 col-sm-12 col-xs-12" :style="styles.labelLeft">Fecha de remisión a psiquiatría</label>
                <div id="datoAnioRemPsiquiatria" class="input-group col-md-2 col-sm-3 col-xs-4">
                  <input
                    v-model="fechaRemPsiquiW.anio"
                    class="form-control"
                    type="number"
                    maxlength="4"
                    placeholder="AAAA"
                    data-orden="1"
                    style="text-align: center"
                    disabled
                  />
                </div>
                <div id="datoMesRemPsiquiatria" class="input-group col-md-2 col-sm-3 col-xs-4">
                  <input
                    v-model="fechaRemPsiquiW.mes"
                    class="form-control"
                    type="number"
                    maxlength="2"
                    placeholder="MM"
                    data-orden="1"
                    style="text-align: center"
                    disabled
                  />
                </div>
                <div id="datoDiaRemPsiquiatria" class="input-group col-md-2 col-sm-3 col-xs-4 input-padding-left">
                  <input
                    v-model="fechaRemPsiquiW.dia"
                    class="form-control"
                    type="number"
                    maxlength="2"
                    placeholder="DD"
                    data-orden="1"
                    style="text-align: center"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
                <label class="col-md-6 col-sm-12 col-xs-12" :style="styles.labelLeft"
                  >Fecha/Notificación obligatoria para casos que aplique</label
                >
                <div id="datoAnioNotiObilig" class="input-group col-md-2 col-sm-3 col-xs-4">
                  <input
                    v-model="fechaNotiObligW.anio"
                    class="form-control"
                    type="number"
                    maxlength="4"
                    data-orden="1"
                    placeholder="AAAA"
                    style="text-align: center"
                    disabled
                  />
                </div>
                <div id="datoMesNotiObilig" class="input-group col-md-2 col-sm-3 col-xs-4">
                  <input
                    v-model="fechaNotiObligW.mes"
                    class="form-control"
                    type="number"
                    maxlength="2"
                    data-orden="1"
                    placeholder="MM"
                    style="text-align: center"
                    disabled
                  />
                </div>
                <div id="datoDiaNotiObilig" class="input-group col-md-2 col-sm-3 col-xs-4 input-padding-left">
                  <input
                    v-model="fechaNotiObligW.dia"
                    class="form-control"
                    type="number"
                    maxlength="2"
                    data-orden="1"
                    placeholder="DD"
                    style="text-align: center"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
          <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
            <div class="col-md-12 no-padding">
              <div class="col-md-4 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
                <label class="col-md-8 col-sm-4 col-xs-4" :style="styles.labelLeft">Se forma familiar como cuidador</label>
                <div id="datoFamiCuida" class="input-group col-md-4 col-sm-8 col-xs-8">
                  <input
                    v-model="trastorno_mental.familiar_cuida_ment"
                    class="form-control"
                    type="text"
                    placeholder="S/N"
                    maxlength="1"
                    data-orden="1"
                    style="text-align: center"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
                <label class="col-md-6 col-sm-4 col-xs-4" :style="styles.labelLeft">Realización de tamizaje</label>
                <div class="input-group col-md-6 col-sm-8 col-xs-8">
                  <input v-model="descripTamizaje" class="form-control" type="text" data-orden="1" disabled />
                </div>
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
                <label class="col-md-6 col-sm-4 col-xs-4" :style="styles.labelLeft">Manejo(s)/resultado de tamizaje</label>
                <div class="input-group col-md-6 col-sm-8 col-xs-8">
                  <input v-model="descripManejoTamizaje" class="form-control" type="text" data-orden="1" disabled />
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
              <div class="col-md-12 no-padding">
                <div class="col-md-4 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
                  <label class="col-lg-6 col-md-12 col-sm-12 col-xs-12" :style="styles.labelLeft"
                    >Servicio capacitación temprana de la población</label
                  >
                  <div class="input-group col-lg-6 col-md12 col-sm-12 col-xs-12">
                    <input v-model="descripCapacitacionMent" class="form-control" type="text" disabled />
                  </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
                  <label class="col-lg-6 col-md-12 col-sm-12 col-xs-12" :style="styles.labelLeft"
                    >En consumo de spa canaliza a grupos de ayuda, cual:</label
                  >
                  <div class="input-group col-lg-6 col-md12 col-sm-12 col-xs-12">
                    <input v-model="descripConsumoSPA" class="form-control" type="text" disabled />
                  </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
                  <label class="col-lg-6 col-md-12 col-sm-12 col-xs-12" :style="styles.labelLeft"
                    >Se canaliza al usuario a dispositivos comunitarios:</label
                  >
                  <div class="input-group col-lg-6 col-md12 col-sm-12 col-xs-12">
                    <input v-model="descripCanaliza" class="form-control" type="text" disabled />
                  </div>
                </div>
                <div class="col-md-12 no-padding">
                  <div class="col-md-4 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
                    <label class="col-lg-6 col-md-12 col-sm-12 col-xs-12" :style="styles.labelLeft">Acciones de seguimiento: </label>
                    <div class="input-group col-lg-6 col-md12 col-sm-12 col-xs-12">
                      <input v-model="descripAccionesSegui" class="form-control" type="text" disabled />
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
                    <label class="col-lg-6 col-md-12 col-sm-12 col-xs-12" :style="styles.labelLeft"
                      >Adherencia a tratamiento médico y/o farmacológico:</label
                    >
                    <div class="input-group col-lg-6 col-md12 col-sm-12 col-xs-12">
                      <input v-model="descripAdherenciaTrata" class="form-control" type="text" disabled />
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
                    <label class="col-lg-6 col-md-12 col-sm-12 col-xs-12" :style="styles.labelLeft"
                      >Seguimiento a la contrareferencia:
                    </label>
                    <div class="input-group col-lg-6 col-md12 col-sm-12 col-xs-12">
                      <input v-model="descripSeguimientoContrarefe" class="form-control" type="text" disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-12 no-padding">
              <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 no-padding">
                  <div class="col-md-2 col-sm-12 col-xs-12" :style="styles.rowFlexInput">
                    <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12" :style="styles.labelLeft">Fecha de cierre</label>
                    <div class="col-md-12 col-sm-12 col-xs-12 no-padding" :style="styles.flexDate">
                      <div id="datoAnioCierreCaso" class="input-group col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <input
                          v-model="fechaCierreCasoW.anio"
                          class="form-control"
                          type="number"
                          maxlength="4"
                          data-orden="1"
                          placeholder="AAAA"
                          style="text-align: center;"
                          disabled
                        />
                      </div>
                      <div id="datoMesCierreCaso" class="input-group col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <input
                          v-model="fechaCierreCasoW.mes"
                          class="form-control"
                          type="number"
                          maxlength="2"
                          data-orden="1"
                          placeholder="MM"
                          style="text-align: center;"
                          disabled
                        />
                      </div>
                      <div
                        id="datoDiaCierreCaso"
                        class="input-group col-lg-4 col-md-4 col-sm-4 col-xs-4 input-padding-left"
                      >
                        <input
                          v-model="fechaCierreCasoW.dia"
                          class="form-control"
                          type="number"
                          maxlength="2"
                          data-orden="1"
                          placeholder="DD"
                          style="text-align: center;"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
                    <label class="col-lg-6 col-md-12 col-sm-12 col-xs-12" :style="styles.labelLeft"
                      >Evaluación según guía mhGAP</label
                    >
                    <div class="input-group col-lg-12 col-md-12 col-sm-12 col-xs-12 input-padding-left">
                      <input v-model="descripEvaluacionMHGAP" class="form-control" type="text" disabled />
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12" :style="styles.rowFlexInput">
                    <label class="col-lg-6 col-md-12 col-sm-12 col-xs-12" :style="styles.labelLeft">Pronóstico terapeutico</label>
                    <div class="input-group col-lg-12 col-md-12 col-sm-12 col-xs-12 input-padding-left">
                      <input v-model="descripPronosticoTerapeutico" class="form-control" type="text" disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-12 no-padding">
              <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-lg-12 no-padding">
                  <div class="col-lg-12 col-md-12" :style="styles.rowFlexInput">
                    <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12" :style="styles.labelLeft">Observaciones</label>
                    <div
                      id="datoObservaciones"
                      class="input-group col-lg-12 col-md-12 col-sm-12 col-xs-12 input-padding-left"
                    >
                      <input
                        v-model="trastorno_mental.observaciones_ment"
                        type="text"
                        class="form-control"
                        data-orden="1"
                        maxlength="95"
                        style="text-align: left"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
});
