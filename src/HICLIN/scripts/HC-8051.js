const Chart = require("chart.js");
const { detallesHc, grabarDetalles, grabarDetallesText } = require("../../HICLIN/scripts/reg_dethc.js");
const { getObjRegHC, getSintomaticoRegHc } = require("../../HICLIN/scripts/reg_hc.js");

new Vue({
  el: "#HC-8051",
  data: {
    modal_victimaConf: false,
    datos_paciente: {},
    datos_profesional: {},
    profesionales_HC8051: [],
    unidades_Serv_HC8051: [],
    enfermedades: [],
    enfer_trans: [],
    nro_ult_comp: "",
    params_hc890h: {
      estado: false,
      pregunta: 0,
      ciudades: [],
      paises: [],
      _siguiente: false,
      _atras: false,
    },
    params_hc9010: {
      estado: false,
    },
    mostrarHC9010: false,
    params_hc890d: {
      estado: false,
      unserv: null,
      finalidad: null,
      sexo: null,
    },
    params_hc9011: {
      estado: false,
    },
    mostrarHC9011: false,
    params_hc890i: {
      estado: false,
    },
    mostrar_hc890l: false,
    params_hc890l: {
      estado: false,
    },
    mostrar_hc890g: false,
    params_hc890g: {
      estado: false,
    },
    mostrarFindrisk: false,
    params_findrisk: {
      estado: false,
    },
    datos_findrisk: {
      peso_lnk: "",
      talla_lnk: "",
      imc_lnk: "",
      vlr_edad_lnk: "",
      per_abdo_lnk: "",
      tens1_lnk: "",
    },
    examen_visual: {
      agudeza_visual_oi_1: "",
      agudeza_visual_oi_2: "",
      agudeza_visual_od_1: "",
      agudeza_visual_od_2: "",
      estructuras_oculares_oi: "",
      estructuras_oculares_od: "",
      distancia_agud: "",
    },
    mostrarBotonPdf: false,
    mostrarSifilis: false,
    mostrarCovid: false,
    mostrarSintomatico: false,
    capturarEmbarazo: false,
    sintomaticos: {
      sintom_resp: "",
      sintom_piel: "",
      contacto_lepra: "",
      victi_maltrato: "",
      victi_violencia: "",
      enfer_mental: "",
      enfer_its: "",
      cual_its: "",
      trata_its: "",
      cancer_seno: "",
      cancer_cervis: "",
      edu_autoexa_seno: "",
      citologia_previa: "",
      fecha_cito_previa: "",
      resul_cito_previa: "",
      fecha_ult_mamo: "",
    },
    global_HC8051: getObjRegHC(),
    DETALLE_HISTORIA: {
      Enfermedad_Actual: "", // WS-1001
      Antecedentes_Quirurgicos: "", // WS_2020
      Antecedentes_Farmacologicos: "", // WS_2030
      Antecedentes_Toxico: "", // WS_2035
      Antecedentes_Traumatologicos: "", // WS_2040
      Examen_fisico: "", // WS-4005
      Analisis: "", // WS_7501
      Plan: "", // WS_7503
      joven8051: detallesHc.WS_8051(), // WS-8051
    },
    personal_atiende: _tipoJsonHc("atiende"),
    finalidades: _tipoJsonHc("finalid"),
    datos_ext: {
      ANO: "",
      MES: "",
      DIA: "",
      HORA: "",
      MINUTO: "",
      NOM_MEDICO: "",
      FOLIO: "",
      UNID_SERV: "",
      meses_naci: "",
      grupo_sang: "",
      RH: "",
      peso_KG: "",
      telefono_paci: "",
      direccion_paci: "",
      sw_embar_w: "",
    },
    SISVAN: {
      TABLA: [],
      talla_ant: 0,
    },
    TABLAS_OMS: [],
    fechas: {
      ultima_menstruacion: {
        ano: "",
        mes: "",
        dia: "",
      },
      citologia: {
        ano: "",
        mes: "",
        dia: "",
      },
      primera_vez: {
        ano: "",
        mes: "",
        dia: "",
      },
      proxima_cita: {
        ano: "",
        mes: "",
        dia: "",
      },
    },
    condicion_embarazo: [
      { COD: "1", DESCRIP: "EMBARAZO PRIMER TRIMESTRE" },
      { COD: "2", DESCRIP: "EMBARAZO SEGUNDO TRIMESTRE" },
      { COD: "3", DESCRIP: "EMBARAZO TERCER TRIMESTRE" },
      { COD: "4", DESCRIP: "NO ESTA EMBARAZADA" },
    ],
    resultado_examen: [
      { COD: "1", DESCRIP: "NORMAL" },
      { COD: "2", DESCRIP: "ANORMAL" },
      { COD: "3", DESCRIP: "POSITIVO" },
      { COD: "4", DESCRIP: "NEGATIVO" },
      { COD: "5", DESCRIP: "NO SE HIZO" },
      { COD: "6", DESCRIP: "REPORTE PENDIENTE" },
      { COD: "7", DESCRIP: "REACTIVO" },
      { COD: "8", DESCRIP: "NO REACTIVO" },
    ],
    tipos_diagnostico: [
      { COD: "1", DESCRIP: "IMPRESION DIAGNOSTICA" },
      { COD: "2", DESCRIP: "CONFIRMADO NUEVO" },
      { COD: "3", DESCRIP: "CONFIRMADO REPETIDO" },
      { COD: "9", DESCRIP: "NO APLICA" },
    ],
    causas_externas: [
      { COD: "1", DESCRIP: "ACCIDENTE DE TRABAJO" },
      { COD: "2", DESCRIP: "ACCIDENTE DE TRANSITO" },
      { COD: "3", DESCRIP: "ACCIDENTE RABICO" },
      { COD: "4", DESCRIP: "ACCIDENTE OFIDICO" },
      { COD: "5", DESCRIP: "OTRO TIPO ACCIDENTE" },
      { COD: "6", DESCRIP: "EVENTO CATASTROFICO" },
      { COD: "7", DESCRIP: "LESION POR AGRESION" },
      { COD: "8", DESCRIP: "LESION AUTOINFLINGIDA" },
      { COD: "9", DESCRIP: "SOSPECHA MALTRATO FISICO" },
      { COD: "10", DESCRIP: "SOSPECHA ABUSO SEXUAL" },
      { COD: "11", DESCRIP: "SOSPECHA VIOLENCIA SEXUAL" },
      { COD: "12", DESCRIP: "SOSPECHA MALTRATO EMOCION" },
      { COD: "13", DESCRIP: "ENFERMEDAD GENERAL" },
      { COD: "14", DESCRIP: "ENFERMEDAD PROFESIONAL" },
      { COD: "15", DESCRIP: "NO APLICA" },
    ],
    parentesco: [
      { COD: "1", DESCRIP: "Madre" },
      { COD: "2", DESCRIP: "Padre" },
      { COD: "3", DESCRIP: "Hij@" },
      { COD: "4", DESCRIP: "Herman@" },
      { COD: "5", DESCRIP: "Tí@" },
      { COD: "6", DESCRIP: "Sobrin@" },
      { COD: "7", DESCRIP: "Prim@" },
      { COD: "8", DESCRIP: "Abuelo" },
      { COD: "9", DESCRIP: "Abuela" },
    ],
    referente: [
      { COD: "1", DESCRIP: "Madre" },
      { COD: "2", DESCRIP: "Padre" },
      { COD: "3", DESCRIP: "Hij@" },
      { COD: "4", DESCRIP: "Espos@" },
      { COD: "5", DESCRIP: "Herman@" },
      { COD: "6", DESCRIP: "Tí@" },
      { COD: "7", DESCRIP: "Sobrin@" },
      { COD: "8", DESCRIP: "Prim@" },
      { COD: "9", DESCRIP: "Madrastra" },
      { COD: "A", DESCRIP: "Padrastro" },
      { COD: "B", DESCRIP: "Amig@" },
      { COD: "C", DESCRIP: "Abuel@" },
    ],
    estadoSalidaRips: [
      { COD: "1", DESCRIP: "VIVO (A)" },
      { COD: "2", DESCRIP: "MUERTO (A)" },
      { COD: "3", DESCRIP: "REMITIDO (A)" },
      { COD: "4", DESCRIP: "HOSPITALIZADO (A)" },
      { COD: "5", DESCRIP: "OBSERVACIÓN" },
      { COD: "6", DESCRIP: "NO APLICA" },
    ],
    estudios: [
      { COD: "1", DESCRIP: "Ninguno" },
      { COD: "2", DESCRIP: "Pre-escolar" },
      { COD: "3", DESCRIP: "Primaria" },
      { COD: "4", DESCRIP: "Secundaria" },
      { COD: "5", DESCRIP: "Bachiller básico" },
      { COD: "6", DESCRIP: "Bachiller técnico" },
      { COD: "7", DESCRIP: "Normalista" },
      { COD: "8", DESCRIP: "Técnico profesional" },
      { COD: "9", DESCRIP: "Tecnológica" },
      { COD: "A", DESCRIP: "Profesional" },
      { COD: "B", DESCRIP: "Especialización" },
      { COD: "C", DESCRIP: "Maestría" },
      { COD: "D", DESCRIP: "Doctorado" },
    ],
    estabilidad_trabajo: [
      { COD: "1", DESCRIP: "Ninguno" },
      { COD: "2", DESCRIP: "No estable" },
      { COD: "3", DESCRIP: "Estable" },
    ],
    array_si_no_nosabe: [
      { COD: "1", DESCRIP: "SI" },
      { COD: "2", DESCRIP: "NO" },
      { COD: "3", DESCRIP: "NO SABE" },
    ],
    array_si_no_noaplica: [
      { COD: "1", DESCRIP: "Si" },
      { COD: "2", DESCRIP: "No" },
      { COD: "3", DESCRIP: "No Aplica" },
    ],
    array_convive: [
      { COD: "1", DESCRIP: "NO" },
      { COD: "2", DESCRIP: "En la casa" },
      { COD: "3", DESCRIP: "En el barrio" },
      { COD: "4", DESCRIP: "Comparte la cama" },
    ],
    array_donde_vive: [
      { COD: "1", DESCRIP: "SOLO" },
      { COD: "2", DESCRIP: "EN LA CASA" },
      { COD: "3", DESCRIP: "EN LA CALLE" },
      { COD: "4", DESCRIP: "INST. PROTECTORA" },
      { COD: "5", DESCRIP: "PRIVADO DE LIBERTAD" },
    ],
    array_percepcion_familia: [
      { COD: "B", DESCRIP: "BUENA" },
      { COD: "R", DESCRIP: "REGULAR" },
      { COD: "M", DESCRIP: "MALA" },
      { COD: "N", DESCRIP: "NO HAY RELACION" },
    ],
    array_acueducto: [
      { COD: "1", DESCRIP: "En el hogar" },
      { COD: "2", DESCRIP: "Fuera del hogar" },
    ],
    array_actividades: [
      { COD: "1", DESCRIP: "TRABAJA" },
      { COD: "2", DESCRIP: "BUSCA PRIMERA VEZ" },
      { COD: "3", DESCRIP: "NO Y NO BUSCA" },
      { COD: "4", DESCRIP: "PASANTIA" },
      { COD: "5", DESCRIP: "DESOCUPADO" },
      { COD: "6", DESCRIP: "NO TRABAJA Y NO ESTUDIA" },
    ],
    array_horario_trabajo: [
      { COD: "1", DESCRIP: "MAÑANA" },
      { COD: "2", DESCRIP: "TARDE" },
      { COD: "3", DESCRIP: "FIN DE SEMANA" },
      { COD: "4", DESCRIP: "TODO EL DIA" },
      { COD: "5", DESCRIP: "NOCHE" },
    ],
    array_razon_trabajo: [
      { COD: "1", DESCRIP: "ECONOMICA" },
      { COD: "2", DESCRIP: "AUTONOMIA" },
      { COD: "3", DESCRIP: "ME GUSTA" },
      { COD: "4", DESCRIP: "TODO EL DIA" },
      { COD: "5", DESCRIP: "NO CONTESTA" },
    ],
    array_aceptacion_social: [
      { COD: "1", DESCRIP: "ACEPTADO" },
      { COD: "2", DESCRIP: "RECHAZADO" },
      { COD: "3", DESCRIP: "IGNORADO" },
      { COD: "4", DESCRIP: "NO SABE" },
    ],
    array_resultado_citologia: [
      { COD: "1", DESCRIP: "NORMAL" },
      { COD: "2", DESCRIP: "ANORMAL" },
      { COD: "3", DESCRIP: "NO APLICA" },
      { COD: "4", DESCRIP: "NO SABE" },
    ],
    array_termino_embarazo: [
      { COD: "1", DESCRIP: "AM" },
      { COD: "2", DESCRIP: "PARTO" },
      { COD: "3", DESCRIP: "ABORTO" },
      { COD: "4", DESCRIP: "CESARIA" },
    ],
    array_orientacion: [
      { COD: "1", DESCRIP: "No" },
      { COD: "2", DESCRIP: "Hetero" },
      { COD: "3", DESCRIP: "Homo" },
      { COD: "4", DESCRIP: "Ambas" },
    ],
    array_pareja_sexual: [
      { COD: "U", DESCRIP: "PAREJA ÚNICA" },
      { COD: "V", DESCRIP: "VARIAS PAREJAS" },
      { COD: "N", DESCRIP: "NO CORRESPONDE" },
    ],
    array_anticonceptivo: [
      { COD: "1", DESCRIP: "DIU" },
      { COD: "2", DESCRIP: "ORAL" },
      { COD: "3", DESCRIP: "BARRERA" },
      { COD: "4", DESCRIP: "OTRO" },
      { COD: "5", DESCRIP: "NINGUNO" },
      { COD: "6", DESCRIP: "DIU + BARRERA" },
      { COD: "7", DESCRIP: "IMPL. SUBDERMICO" },
      { COD: "8", DESCRIP: "IMPL. SUBDERMICO + BARRERA" },
      { COD: "9", DESCRIP: "ORAL + BARRERA" },
      { COD: "A", DESCRIP: "INYECTABLE MENSUAL" },
      { COD: "B", DESCRIP: "INYECTBALE MENS. + BARRERA" },
      { COD: "C", DESCRIP: "INYECTABLE TRIMESTRAL" },
      { COD: "D", DESCRIP: "INYECTABLE TRI. BARRERA" },
      { COD: "E", DESCRIP: "EMERGENCIA" },
      { COD: "F", DESCRIP: "EMERGENCIA + BARRERA" },
      { COD: "G", DESCRIP: "ESTERILIZACION" },
      { COD: "H", DESCRIP: "ESTERILIZACION + BARRERA" },
      { COD: "I", DESCRIP: "NO USA X TRADICION" },
      { COD: "J", DESCRIP: "NO USA X SALUD" },
      { COD: "K", DESCRIP: "NO USA X NEGACION" },
      { COD: "L", DESCRIP: "COITUS INTERRUPTUS" },
      { COD: "M", DESCRIP: "METODO DEL RITMO" },
    ],
    array_imagen_corporal: [
      { COD: "1", DESCRIP: "CONFORME" },
      { COD: "2", DESCRIP: "CREA PREOCUPACIONES" },
      { COD: "3", DESCRIP: "IMPIDE RELACION CON LOS DEMAS" },
    ],
    array_estado_animo: [
      { COD: "1", DESCRIP: "NORMAL" },
      { COD: "2", DESCRIP: "MUY TRISTE" },
      { COD: "3", DESCRIP: "MUY ALEGRE" },
      { COD: "4", DESCRIP: "RETRAIDO" },
      { COD: "5", DESCRIP: "IDEAS SUICIDAS" },
      { COD: "6", DESCRIP: "ANSIOSO/ANGUSTIADO" },
      { COD: "7", DESCRIP: "HOSTIL/AGRESIVO" },
    ],
    array_proyecto_vida: [
      { COD: "1", DESCRIP: "CLARO" },
      { COD: "2", DESCRIP: "CONFUSO" },
      { COD: "3", DESCRIP: "AUSENTE" },
    ],
    array_examen_fisico: [
      { COD: "N", DESCRIP: "Normal" },
      { COD: "A", DESCRIP: "Anormal" },
      { COD: "9", DESCRIP: "No aplica" },
      { COD: "0", DESCRIP: "No se valora" },
    ],
    stylesHC8051: {
      flexRow: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      },
      flexIzq: {
        textAlign: "left",
        paddingLeft: "9px",
      },
    },
    mascaras: {
      peso: IMask.createMask({
        mask: Number,
        radix: ".",
        padFractionalZeros: true,
        signed: false,
        scale: 1,
        min: 000000,
        max: 99999.9,
      }),
      temp: IMask.createMask({
        mask: Number,
        radix: ".",
        padFractionalZeros: true,
        signed: false,
        scale: 2,
        min: 0000,
        max: 99.99,
      }),
      per: IMask.createMask({
        mask: Number,
        radix: ".",
        padFractionalZeros: true,
        signed: false,
        scale: 1,
        min: 000,
        max: 999.9,
      }),
      dos: IMask.createMask({
        mask: Number,
        radix: ".",
        padFractionalZeros: true,
        signed: false,
        scale: 1,
        min: 000,
        max: 99.9,
      }),
    },
    resul_masks: {},
    operaciones: {
      sup_corp: "",
    },
    flujo_bloques: {},
    textos: {
      ant_per: {
        perinatales: "",
        crecimiento: "",
        desarrollo: "",
        vacunas: "",
        enf_cronica: "",
        discapacidad: "",
        enf_infe_cont: "",
        accidentes: "",
        accid_frec: "",
        problem_psico: "",
        judiciales: "",
        violencia: "",
      },
      embarazo: "",
      ant_fam: {
        respuesta: {
          diabetes: "",
          obesidad: "",
          cardiovascular: "",
          alergia: "",
          infecciones: "",
          cancer: "",
          fam_psico: "",
          alcohol_drog: "",
          violencia_fam: "",
          madre_padre_adol: "",
          fam_judiciales: "",
          neurologicos: "",
          otros: "",
        },
        parentesco: {
          dia_quien: "",
          obe_quien: "",
          car_quien: "",
          ale_quien: "",
          inf_quien: "",
          can_quien: "",
          fam_quien: "",
          alc_quien: "",
          vio_quien: "",
          mad_quien: "",
          fam_jud_quien: "",
          neu_quien: "",
        },
      },
      donde_vive: "",
      familia: {
        fam_nivel_estud: {
          niv_estud_padre: "",
          niv_estud_madre: "",
          niv_estud_pareja: "",
        },
        fam_trabajo: {
          ocup_estable_padre: "",
          ocup_estable_madre: "",
          ocup_estable_pareja: "",
        },
      },
      convive: {
        madre: "",
        padre: "",
        madrastra: "",
        padrastro: "",
        hermanos: "",
        pareja: "",
        hijo: "",
        otros: "",
      },
      percepcion_familia: "",
      nivel_estudios: "",
      acueducto: "",
      alcantarillado: "",
      actividad: "",
      horario_trabajo: "",
      razon_trabajo: "",
      trabajo_legalizado: "",
      trabajo_insalubre: "",
      aceptacion_social: "",
      resultado_citologia: "",
      primer_embarazo: "",
      relaciones_sexuales: "",
      pareja_sexual: "",
      anticoncepcion: "",
      imagen_corporal: "",
      estado_animo: "",
      proyecto_vida: "",
      referente_adulto: "",
      examen_fisico: {
        piel_faner_mucosa: "",
        cabeza: "",
        agudeza_visual: "",
        agudeza_auditiva: "",
        salud_bucal: "",
        cuello_tiroides: "",
        toras_mamas: "",
        cardio_pulmon: "",
        abdomen: "",
        genito_urin: "",
        columna: "",
        extremidades: "",
        neurologico: "",
      },
      personal_atiende: "",
      finalidad: "",
      tipo_diagnostico: "",
      descrip_pato_cronica: "",
      estado_salida: "",
      diagnostico_muerte: "",
    },
    mostrarGraficas: false,
    graficas: {
      talla: {
        info: {
          meses: [],
          oms_2: [],
          oms_1: [],
          oms_0: [],
          oms_M1: [],
          oms_M2: [],
          paci: [],
        },
        graf: null,
        img: null,
      },
      imc: {
        info: {
          meses: [],
          oms_2: [],
          oms_1: [],
          oms_0: [],
          oms_M1: [],
          oms_M2: [],
          paci: [],
        },
        graf: null,
        img: null,
      },
    },
    graficasPDF: {
      tallaXedad: null,
      imcXedad: null,
      pesoXtalla: null,
      pesoXedad: null,
      perCefXedad: null,
    },
    mostrarEnfermedades: false,
    inputEnfer: {
      nombre: "",
      tipo: 0,
      pos: 0,
    },
  },
  components: {
    covid19: component_hc890h,
    sintomaticos: component_hc890d,
    incapacidad: require("../../HICLIN/scripts/hc890l.vue.js"),
    sifilis: require("../../HICLIN/scripts/hc890i.vue.js"),
    agudeza_visual: require("../../HICLIN/scripts/HC890G.vue.js"),
    vales: require("../../HICLIN/scripts/HC-9010.vue.js"),
    apgar: require("../../HICLIN/scripts/HC-9011.vue.js"),
    findrisk: require("../../HICLIN/scripts/HC890E.vue.js"),
    ser851: require("../../SALUD/scripts/SER851.vue.js"),
  },
  created() {
    nombreOpcion("3 - Historia de joven");

    _inputControl("disabled");
    _inputControl("reset");
    this.datos_paciente = JSON.parse(JSON.stringify($_REG_PACI));
    this.datos_profesional = JSON.parse(JSON.stringify($_REG_PROF));

    this.traerUnidadesServicio();
  },
  computed: {
    cambios_findrisk: function () {
      return {
        peso_lnk: this.global_HC8051.signos.peso,
        talla_lnk: this.global_HC8051.signos.talla,
        imc_lnk: this.global_HC8051.signos.imc_corp,
        vlr_edad_lnk: this.global_HC8051.vlr_edad,
        per_abdo_lnk: this.global_HC8051.signos.per_abdo,
        tens1_lnk: this.global_HC8051.signos.tens1,
      };
    },
    sintomatico_w: function () {
      return {
        sintom_resp: this.global_HC8051.signos.sintom_respi,
        sintom_piel: this.global_HC8051.signos.sintom_piel,
        contacto_lepra: this.global_HC8051.signos.contacto_lepra,
        victi_maltrato: this.global_HC8051.signos.victi_maltrato,
        victi_violencia: this.global_HC8051.signos.victi_violencia,
        enfer_mental: this.global_HC8051.signos.enfer_mental,
        enfer_its: this.global_HC8051.signos.enfer_its,
        cual_its: this.global_HC8051.signos.cual_its,
        trata_its: this.global_HC8051.signos.trata_its,
        cancer_seno: this.global_HC8051.signos.cancer_seno,
        cancer_cervis: this.global_HC8051.signos.cancer_cervis,
        edu_autoexa_seno: this.global_HC8051.signos.edu_autoexa_seno,
        citologia_previa: this.global_HC8051.signos.citologia_previa,
        fecha_cito_previa: this.global_HC8051.signos.fecha_cito_previa,
        resul_cito_previa: this.global_HC8051.signos.resul_cito_previa,
        fecha_ult_mamo: this.global_HC8051.signos.fecha_ult_mamo,
      };
    },
  },
  watch: {
    cambios_findrisk: function (data) {
      this.datos_findrisk = data;
    },
    sintomatico_w: function (data) {
      this.sintomaticos = data;
    },
    "DETALLE_HISTORIA.joven8051.ant_personales.perinatales": function (data) {
      Vue.set(this.textos.ant_per, "perinatales", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_personales.crecimiento": function (data) {
      Vue.set(this.textos.ant_per, "crecimiento", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_personales.desarrollo": function (data) {
      Vue.set(this.textos.ant_per, "desarrollo", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_personales.vacunas": function (data) {
      Vue.set(this.textos.ant_per, "vacunas", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_personales.enf_cronica": function (data) {
      Vue.set(this.textos.ant_per, "enf_cronica", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_personales.discapacidad": function (data) {
      Vue.set(this.textos.ant_per, "discapacidad", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_personales.enf_infe_cont": function (data) {
      Vue.set(this.textos.ant_per, "enf_infe_cont", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_personales.accidentes": function (data) {
      Vue.set(this.textos.ant_per, "accidentes", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_personales.accid_frec": function (data) {
      Vue.set(this.textos.ant_per, "accid_frec", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_personales.problem_psico": function (data) {
      Vue.set(this.textos.ant_per, "problem_psico", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_personales.judiciales": function (data) {
      Vue.set(this.textos.ant_per, "judiciales", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_personales.violencia": function (data) {
      Vue.set(this.textos.ant_per, "violencia", this.asignarDescrip(data));
    },
    /// HASTA ACA LOS PERSONALES

    "DETALLE_HISTORIA.joven8051.ant_familiares.diabetes": function (data) {
      Vue.set(this.textos.ant_fam.respuesta, "diabetes", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.obesidad": function (data) {
      Vue.set(this.textos.ant_fam.respuesta, "obesidad", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.cardiovascular": function (data) {
      Vue.set(this.textos.ant_fam.respuesta, "cardiovascular", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.alergia": function (data) {
      Vue.set(this.textos.ant_fam.respuesta, "alergia", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.infecciones": function (data) {
      Vue.set(this.textos.ant_fam.respuesta, "infecciones", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.cancer": function (data) {
      Vue.set(this.textos.ant_fam.respuesta, "cancer", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.fam_psico": function (data) {
      Vue.set(this.textos.ant_fam.respuesta, "fam_psico", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.alcohol_drog": function (data) {
      Vue.set(this.textos.ant_fam.respuesta, "alcohol_drog", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.violencia_fam": function (data) {
      Vue.set(this.textos.ant_fam.respuesta, "violencia_fam", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.madre_padre_adol": function (data) {
      Vue.set(this.textos.ant_fam.respuesta, "madre_padre_adol", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.fam_judiciales": function (data) {
      Vue.set(this.textos.ant_fam.respuesta, "fam_judiciales", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.neurologicos": function (data) {
      Vue.set(this.textos.ant_fam.respuesta, "neurologicos", this.asignarDescrip(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.otros": function (data) {
      Vue.set(this.textos.ant_fam.respuesta, "otros", this.asignarDescrip(data));
    },
    // HASTA ACA RESPUESTAS FAMILIARES

    "DETALLE_HISTORIA.joven8051.ant_familiares.dia_quien": function (data) {
      Vue.set(this.textos.ant_fam.parentesco, "dia_quien", this.asignarParentesco(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.obe_quien": function (data) {
      Vue.set(this.textos.ant_fam.parentesco, "obe_quien", this.asignarParentesco(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.car_quien": function (data) {
      Vue.set(this.textos.ant_fam.parentesco, "car_quien", this.asignarParentesco(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.ale_quien": function (data) {
      Vue.set(this.textos.ant_fam.parentesco, "ale_quien", this.asignarParentesco(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.inf_quien": function (data) {
      Vue.set(this.textos.ant_fam.parentesco, "inf_quien", this.asignarParentesco(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.can_quien": function (data) {
      Vue.set(this.textos.ant_fam.parentesco, "can_quien", this.asignarParentesco(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.fam_quien": function (data) {
      Vue.set(this.textos.ant_fam.parentesco, "fam_quien", this.asignarParentesco(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.alc_quien": function (data) {
      Vue.set(this.textos.ant_fam.parentesco, "alc_quien", this.asignarParentesco(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.vio_quien": function (data) {
      Vue.set(this.textos.ant_fam.parentesco, "vio_quien", this.asignarParentesco(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.mad_quien": function (data) {
      Vue.set(this.textos.ant_fam.parentesco, "mad_quien", this.asignarParentesco(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.fam_jud_quien": function (data) {
      Vue.set(this.textos.ant_fam.parentesco, "fam_jud_quien", this.asignarParentesco(data));
    },
    "DETALLE_HISTORIA.joven8051.ant_familiares.neu_quien": function (data) {
      Vue.set(this.textos.ant_fam.parentesco, "neu_quien", this.asignarParentesco(data));
    },
    // HASTA ACA PARENTESCO FAMILIAR

    "DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.niv_estud_padre": function (data) {
      Vue.set(this.textos.familia.fam_nivel_estud, "niv_estud_padre", this.buscarDescripEstudios(data));
    },
    "DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.niv_estud_madre": function (data) {
      Vue.set(this.textos.familia.fam_nivel_estud, "niv_estud_madre", this.buscarDescripEstudios(data));
    },
    "DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.niv_estud_pareja": function (data) {
      Vue.set(this.textos.familia.fam_nivel_estud, "niv_estud_pareja", this.buscarDescripEstudios(data));
    },
    // HASTA ACA ESTUDIOS INTEGRANTES FAMILIA

    "DETALLE_HISTORIA.joven8051.familia.fam_trabajo.ocup_estable_padre": function (data) {
      Vue.set(this.textos.familia.fam_trabajo, "ocup_estable_padre", this.buscarDescripEstabilidad(data));
    },
    "DETALLE_HISTORIA.joven8051.familia.fam_trabajo.ocup_estable_madre": function (data) {
      Vue.set(this.textos.familia.fam_trabajo, "ocup_estable_madre", this.buscarDescripEstabilidad(data));
    },
    "DETALLE_HISTORIA.joven8051.familia.fam_trabajo.ocup_estable_pareja": function (data) {
      Vue.set(this.textos.familia.fam_trabajo, "ocup_estable_pareja", this.buscarDescripEstabilidad(data));
    },
    // HASTA ACA ESTABILIDAD TRABAJO INTEGRANTES FAMILIA

    "DETALLE_HISTORIA.joven8051.familia.convive_madre": function (data) {
      Vue.set(this.textos.convive, "madre", this.buscarDescripConvive(data));
    },
    "DETALLE_HISTORIA.joven8051.familia.convive_padre": function (data) {
      Vue.set(this.textos.convive, "padre", this.buscarDescripConvive(data));
    },
    "DETALLE_HISTORIA.joven8051.familia.convive_madrastra": function (data) {
      Vue.set(this.textos.convive, "madrastra", this.buscarDescripConvive(data));
    },
    "DETALLE_HISTORIA.joven8051.familia.convive_padrastro": function (data) {
      Vue.set(this.textos.convive, "padrastro", this.buscarDescripConvive(data));
    },
    "DETALLE_HISTORIA.joven8051.familia.convive_hermanos": function (data) {
      Vue.set(this.textos.convive, "hermanos", this.buscarDescripConvive(data));
    },
    "DETALLE_HISTORIA.joven8051.familia.convive_pareja": function (data) {
      Vue.set(this.textos.convive, "pareja", this.buscarDescripConvive(data));
    },
    "DETALLE_HISTORIA.joven8051.familia.convive_hijo": function (data) {
      Vue.set(this.textos.convive, "hijo", this.buscarDescripConvive(data));
    },
    "DETALLE_HISTORIA.joven8051.familia.convive_otros": function (data) {
      Vue.set(this.textos.convive, "otros", this.buscarDescripConvive(data));
    },
    // HASTA ACA CONVIVE CON :

    "DETALLE_HISTORIA.joven8051.familia.vive_lugar": function (data) {
      var consulta = this.array_donde_vive.find((x) => x.COD == data);
      if (consulta) this.textos.donde_vive = data + ". " + consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.joven8051.familia.percepcion_familia": function (data) {
      var consulta = this.array_percepcion_familia.find((x) => x.COD == data);
      if (consulta) this.textos.percepcion_familia = data + ". " + consulta.DESCRIP;
    },

    "DETALLE_HISTORIA.joven8051.educacion.nivel_estud": function (data) {
      Vue.set(this.textos, "nivel_estudios", this.buscarDescripEstudios(data));
    },

    /////// HASTA ACA FAMILIA
    "DETALLE_HISTORIA.joven8051.vivienda.acueducto": function (data) {
      var consulta = this.array_acueducto.find((x) => x.COD == data);
      if (consulta) this.textos.acueducto = consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.joven8051.vivienda.alcantarillado": function (data) {
      var consulta = this.array_acueducto.find((x) => x.COD == data);
      if (consulta) this.textos.alcantarillado = consulta.DESCRIP;
    },
    // HASTA ACA VIVIENDA

    "DETALLE_HISTORIA.joven8051.trabajo.actividad": function (data) {
      var consulta = this.array_actividades.find((x) => x.COD == data);
      if (consulta) this.textos.actividad = data + ". " + consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.joven8051.trabajo.horario_trabajo": function (data) {
      var consulta = this.array_horario_trabajo.find((x) => x.COD == data);
      if (consulta) this.textos.horario_trabajo = data + ". " + consulta.DESCRIP;
      else this.textos.horario_trabajo = "";
    },
    "DETALLE_HISTORIA.joven8051.trabajo.razon_trabajo": function (data) {
      var consulta = this.array_razon_trabajo.find((x) => x.COD == data);
      if (consulta) this.textos.razon_trabajo = data + ". " + consulta.DESCRIP;
      else this.textos.razon_trabajo = "";
    },
    "DETALLE_HISTORIA.joven8051.trabajo.trabajo_legalizado": function (data) {
      var consulta = this.array_si_no_noaplica.find((x) => x.COD == data);
      if (consulta) this.textos.trabajo_legalizado = consulta.DESCRIP;
      else this.textos.trabajo_legalizado = "";
    },
    "DETALLE_HISTORIA.joven8051.trabajo.trabajo_insalubre": function (data) {
      var consulta = this.array_si_no_noaplica.find((x) => x.COD == data);
      if (consulta) this.textos.trabajo_insalubre = consulta.DESCRIP;
      else this.textos.trabajo_insalubre = "";
    },
    // HASTA ACA TRABAJO

    "DETALLE_HISTORIA.joven8051.vida_social.aceptacion": function (data) {
      var consulta = this.array_aceptacion_social.find((x) => x.COD == data);
      if (consulta) this.textos.aceptacion_social = consulta.DESCRIP;
      else this.textos.aceptacion_social = "";
    },
    // HASTA ACA VIDA SOCIAL

    "global_HC8051.signos.resul_cito_previa": function (data) {
      var consulta = this.array_resultado_citologia.find((x) => x.COD == data);
      if (consulta) this.textos.resultado_citologia = data + ". " + consulta.DESCRIP;
      else this.textos.resultado_citologia = "";
    },
    "DETALLE_HISTORIA.joven8051.gineco_urologico.termino_1er_embar": function (data) {
      var consulta = this.array_termino_embarazo.find((x) => x.COD == data);
      if (consulta) this.textos.primer_embarazo = data + ". " + consulta.DESCRIP;
      else this.textos.primer_embarazo = "";
    },
    // HASTA ACA GINECO

    "DETALLE_HISTORIA.joven8051.sexualidad.relaciones_sex": function (data) {
      var consulta = this.array_orientacion.find((x) => x.COD == data);
      if (consulta) this.textos.relaciones_sexuales = consulta.DESCRIP;
      else this.textos.relaciones_sexuales = "";
    },
    "DETALLE_HISTORIA.joven8051.sexualidad.pareja_sex": function (data) {
      var consulta = this.array_pareja_sexual.find((x) => x.COD == data);
      if (consulta) this.textos.pareja_sexual = data + ". " + consulta.DESCRIP;
      else this.textos.pareja_sexual = "";
    },
    "global_HC8051.planific": function (data) {
      var consulta = this.array_anticonceptivo.find((x) => x.COD == data);
      if (consulta) this.textos.anticoncepcion = data + ". " + consulta.DESCRIP;
      else this.textos.anticoncepcion = "";
    },
    // HASTA ACA SEXUALIDAD

    "DETALLE_HISTORIA.joven8051.psico_emocional.imagen_corp": function (data) {
      var consulta = this.array_imagen_corporal.find((x) => x.COD == data);
      if (consulta) this.textos.imagen_corporal = data + ". " + consulta.DESCRIP;
      else this.textos.imagen_corporal = "";
    },
    "DETALLE_HISTORIA.joven8051.psico_emocional.estado_animo": function (data) {
      var consulta = this.array_estado_animo.find((x) => x.COD == data);
      if (consulta) this.textos.estado_animo = data + ". " + consulta.DESCRIP;
      else this.textos.estado_animo = "";
    },
    "DETALLE_HISTORIA.joven8051.psico_emocional.proyecto_vida": function (data) {
      var consulta = this.array_proyecto_vida.find((x) => x.COD == data);
      if (consulta) this.textos.proyecto_vida = consulta.DESCRIP;
      else this.textos.proyecto_vida = "";
    },
    // HASTA ACA PSICO-EMOCIONAL

    "DETALLE_HISTORIA.joven8051.examen_fisico.piel_faner_mucosa": function (data) {
      Vue.set(this.textos.examen_fisico, "piel_faner_mucosa", this.buscarDescripExamenFisico(data));
    },
    "DETALLE_HISTORIA.joven8051.examen_fisico.cabeza": function (data) {
      Vue.set(this.textos.examen_fisico, "cabeza", this.buscarDescripExamenFisico(data));
    },
    "DETALLE_HISTORIA.joven8051.examen_fisico.agudeza_visual": function (data) {
      Vue.set(this.textos.examen_fisico, "agudeza_visual", this.buscarDescripExamenFisico(data));
    },
    "DETALLE_HISTORIA.joven8051.examen_fisico.agudeza_auditiva": function (data) {
      Vue.set(this.textos.examen_fisico, "agudeza_auditiva", this.buscarDescripExamenFisico(data));
    },
    "DETALLE_HISTORIA.joven8051.examen_fisico.salud_bucal": function (data) {
      Vue.set(this.textos.examen_fisico, "salud_bucal", this.buscarDescripExamenFisico(data));
    },
    "DETALLE_HISTORIA.joven8051.examen_fisico.cuello_tiroides": function (data) {
      Vue.set(this.textos.examen_fisico, "cuello_tiroides", this.buscarDescripExamenFisico(data));
    },
    "DETALLE_HISTORIA.joven8051.examen_fisico.toras_mamas": function (data) {
      Vue.set(this.textos.examen_fisico, "toras_mamas", this.buscarDescripExamenFisico(data));
    },
    "DETALLE_HISTORIA.joven8051.examen_fisico.cardio_pulmon": function (data) {
      Vue.set(this.textos.examen_fisico, "cardio_pulmon", this.buscarDescripExamenFisico(data));
    },
    "DETALLE_HISTORIA.joven8051.examen_fisico.abdomen": function (data) {
      Vue.set(this.textos.examen_fisico, "abdomen", this.buscarDescripExamenFisico(data));
    },
    "DETALLE_HISTORIA.joven8051.examen_fisico.genito_urin": function (data) {
      Vue.set(this.textos.examen_fisico, "genito_urin", this.buscarDescripExamenFisico(data));
    },
    "DETALLE_HISTORIA.joven8051.examen_fisico.columna": function (data) {
      Vue.set(this.textos.examen_fisico, "columna", this.buscarDescripExamenFisico(data));
    },
    "DETALLE_HISTORIA.joven8051.examen_fisico.extremidades": function (data) {
      Vue.set(this.textos.examen_fisico, "extremidades", this.buscarDescripExamenFisico(data));
    },
    "DETALLE_HISTORIA.joven8051.examen_fisico.neurologico": function (data) {
      Vue.set(this.textos.examen_fisico, "neurologico", this.buscarDescripExamenFisico(data));
    },
    // HASTA ACA EXAMEN FISICO

    "global_HC8051.rips.embarazo": function (data) {
      var consulta = this.condicion_embarazo.find((x) => x.COD == data);
      if (consulta) this.textos.embarazo = data + ". " + consulta.DESCRIP;
    },
    "global_HC8051.rips.atiende": function (data) {
      var consulta = this.personal_atiende.find((x) => x.COD == data);
      if (consulta) this.textos.personal_atiende = data + ". " + consulta.DESCRIP;
    },
    "global_HC8051.rips.finalid": function (data) {
      var consulta = this.finalidades.find((x) => parseInt(x.COD) == parseInt(data));
      if (consulta) this.textos.finalidad = data + ". " + consulta.DESCRIP;
    },
    "global_HC8051.rips.causa": function (data) {
      var consulta = this.causas_externas.find((x) => x.COD == data);
      if (consulta) this.textos.causa_externa = data + ". " + consulta.DESCRIP;
    },
    "global_HC8051.rips.tipo_diag": function (data) {
      var consulta = this.tipos_diagnostico.find((x) => parseInt(x.COD) == parseInt(data));
      if (consulta) this.textos.tipo_diagnostico = data + ". " + consulta.DESCRIP;
    },
    "global_HC8051.rips.estado_sal": function (data) {
      var consulta = this.estadoSalidaRips.find((x) => x.COD == data);
      if (consulta) this.textos.estado_salida = data + ". " + consulta.DESCRIP;
    },
  },
  methods: {
    asignarDescrip(dato) {
      let retorno = "";
      switch (dato) {
        case "1":
          retorno = "Si";
          break;
        case "2":
          retorno = "No";
          break;
        case "3":
          retorno = "No sabe";
          break;
      }
      return retorno;
    },
    asignarParentesco(dato) {
      var consulta = this.parentesco.find((x) => x.COD == dato);
      return consulta ? consulta.DESCRIP : "";
    },
    buscarDescripEstudios(dato) {
      let busqueda = this.estudios.find((x) => x.COD == dato);
      return busqueda ? busqueda.DESCRIP : "";
    },
    buscarDescripEstabilidad(dato) {
      let busqueda = this.estabilidad_trabajo.find((x) => x.COD == dato);
      return busqueda ? busqueda.DESCRIP : "";
    },
    buscarDescripConvive(dato) {
      let busqueda = this.array_convive.find((x) => x.COD == dato);
      return busqueda ? busqueda.DESCRIP : "";
    },
    buscarDescripExamenFisico(dato) {
      let busqueda = this.array_examen_fisico.find((x) => x.COD == dato);
      return busqueda ? busqueda.DESCRIP : "";
    },
    calcularIMCySUP() {
      var peso_kg = parseInt(this.global_HC8051.signos.peso) || 0;
      var talla = parseInt(this.global_HC8051.signos.talla) || 0;

      if (peso_kg == 0 || talla == 0) {
        this.global_HC8051.signos.imc_corp = "0";
        this.global_HC8051.signos.sup_corp = "0";
        this.operaciones.sup_corp = "0 m2";
      } else {
        //indice masa corporal
        var tallaDiv = talla / 100;
        var exponencial = Math.pow(tallaDiv, 2);
        var resultado = peso_kg / exponencial;

        this.global_HC8051.signos.imc_corp = resultado.toFixed(2).toString();

        //sup
        var sup = (peso_kg + talla - 60) / 100;
        this.global_HC8051.signos.sup_corp = sup.toFixed(2).toString();
        this.operaciones.sup_corp = this.global_HC8051.signos.sup_corp + " m2";
      }
    },
    calcularTA_media() {
      var sistole = parseInt(this.global_HC8051.signos.tens1);
      var diastole = parseInt(this.global_HC8051.signos.tens2);
      var calculo = Math.round((sistole + diastole * 2) / 3);

      this.global_HC8051.signos.tens_media = parseInt(calculo).toString();
    },
    traerUnidadesServicio() {
      loader("show");
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then(function (data) {
          _this.unidades_Serv_HC8051 = data.UNSERV;
          _this.unidades_Serv_HC8051.pop();

          _this.traerProfesionales();
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          _this.salir_HC8051();
        });
    },
    traerProfesionales() {
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
        .then(function (data) {
          _this.profesionales_HC8051 = data.ARCHPROF;
          _this.profesionales_HC8051.pop();
          for (var i in _this.profesionales_HC8051) {
            _this.profesionales_HC8051[i].NOMBRE = _this.profesionales_HC8051[i].NOMBRE.replace(/\�/g, "Ñ").trim();
          }
          _this.traerHistoriaClinica(1);
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          _this.salir_HC8051();
        });
    },
    async traerHistoriaClinica(param) {
      var _this = this;

      postData(
        {
          datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|" + "1" + "|",
        },
        get_url("APP/HICLIN/GET_HC.DLL")
      )
        .then(async (data) => {
          console.log(data);
          _this.global_HC8051 = data;

          _this.datos_ext.peso_KG = parseFloat(_this.global_HC8051.signos.peso) / 1000;

          _this.calcularIMCySUP();

          if (parseInt(_this.global_HC8051.edad) == 0)
            _this.global_HC8051.edad = $_REG_HC.edad_hc.unid_edad + $_REG_HC.edad_hc.vlr_edad.toString();

          for (var i in _this.global_HC8051.rips.tabla_diagn) {
            _this.global_HC8051.rips.tabla_diagn[i].cod_diagn = _this.global_HC8051.rips.tabla_diagn[i].cod_diagn
              .toUpperCase()
              .trim();
          }
          console.log(_this.global_HC8051.rips.tabla_diagn);

          _this.global_HC8051.signos.talla = parseInt(_this.global_HC8051.signos.talla) || "";
          _this.global_HC8051.signos.fcard = parseInt(_this.global_HC8051.signos.fcard) || "";
          _this.global_HC8051.signos.fresp = parseInt(_this.global_HC8051.signos.fresp) || "";
          _this.global_HC8051.signos.tens1 = parseInt(_this.global_HC8051.signos.tens1) || "";
          _this.global_HC8051.signos.tens2 = parseInt(_this.global_HC8051.signos.tens2) || "";
          _this.global_HC8051.signos.tens_media = parseInt(_this.global_HC8051.signos.tens_media) || "";
          _this.global_HC8051.signos.oximetria = parseInt(_this.global_HC8051.signos.oximetria) || "";

          _this.global_HC8051.motiv = _this.global_HC8051.motiv.replace(/\&/g, "\n").trim();

          _this.global_HC8051.serv = JSON.parse(JSON.stringify($_REG_HC.serv_hc));

          switch (_this.global_HC8051.serv) {
            case "01":
            case "02":
            case "08":
            case "09":
            case "63":
              _this.mostrarCovid = true;
              break;
            default:
              _this.mostrarCovid = false;
              break;
          }

          if (param == 1) {
            _this.traerCiudades();
            _this.traerDetalleHistoria();
          } else if (param == 2) {
            _this.validarAcompañante();
          }
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_HC8051();
        });
    },
    traerCiudades() {
      var _this = this;
      postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON809.DLL"))
        .then((data) => {
          console.log(data);
          _this.params_hc890h.ciudades = data.CIUDAD;
          _this.params_hc890h.ciudades.pop();

          for (var i in _this.params_hc890h.ciudades) {
            _this.params_hc890h.ciudades[i].NOMBRE = _this.params_hc890h.ciudades[i].NOMBRE.replace(/\�/g, "Ñ").trim();
          }
          _this.traerPaises();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_HC8051();
        });
    },
    traerPaises() {
      var _this = this;
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER888.DLL"))
        .then((data) => {
          console.log(data);
          _this.params_hc890h.paises = data.PAISESRIPS;
          _this.params_hc890h.paises.pop();

          for (var i in _this.params_hc890h.paises) {
            _this.params_hc890h.paises[i].DESCRIP = _this.params_hc890h.paises[i].DESCRIP.replace(/\�/g, "Ñ").trim();
          }
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_HC8051();
        });
    },
    traerDetalleHistoria() {
      var _this = this;

      postData(
        {
          datosh:
            datosEnvio() +
            $_REG_HC.llave_hc +
            "|" +
            "  " +
            "|" +
            "  " +
            "|" +
            "1001;2020;2030;2035;2040;4005;7501;7503;8051" +
            "|" +
            $_REG_HC.serv_hc +
            "|",
        },
        get_url("APP/HICLIN/HCDETAL_PRC.DLL")
      )
        .then((data) => {
          console.log(data);

          var formato_1001 = data.DETHC.find((x) => x["COD-DETHC"] == "1001");
          if (formato_1001) _this.DETALLE_HISTORIA.Enfermedad_Actual = formato_1001.DETALLE.replace(/\&/g, "\n").trim();

          var formato_2020 = data.DETHC.find((x) => x["COD-DETHC"] == "2020");
          if (formato_2020)
            _this.DETALLE_HISTORIA.Antecedentes_Quirurgicos = formato_2020.DETALLE.replace(/\&/g, "\n").trim();

          var formato_2030 = data.DETHC.find((x) => x["COD-DETHC"] == "2030");
          if (formato_2030)
            _this.DETALLE_HISTORIA.Antecedentes_Farmacologicos = formato_2030.DETALLE.replace(/\&/g, "\n").trim();

          var formato_2035 = data.DETHC.find((x) => x["COD-DETHC"] == "2035");
          if (formato_2035)
            _this.DETALLE_HISTORIA.Antecedentes_Toxico = formato_2035.DETALLE.replace(/\&/g, "\n").trim();

          var formato_2040 = data.DETHC.find((x) => x["COD-DETHC"] == "2040");
          if (formato_2040)
            _this.DETALLE_HISTORIA.Antecedentes_Traumatologicos = formato_2040.DETALLE.replace(/\&/g, "\n").trim();

          var formato_4005 = data.DETHC.find((x) => x["COD-DETHC"] == "4005");
          if (formato_4005) _this.DETALLE_HISTORIA.Examen_fisico = formato_4005.DETALLE.replace(/\&/g, "\n").trim();

          var formato_7501 = data.DETHC.find((x) => x["COD-DETHC"] == "7501");
          if (formato_7501) _this.DETALLE_HISTORIA.Analisis = formato_7501.DETALLE.replace(/\&/g, "\n").trim();

          var formato_7503 = data.DETHC.find((x) => x["COD-DETHC"] == "7503");
          if (formato_7503) _this.DETALLE_HISTORIA.Plan = formato_7503.DETALLE.replace(/\&/g, "\n").trim();

          var formato_8051 = data.DETHC.find((x) => x["COD-DETHC"] == "8051");
          if (formato_8051) {
            _this.DETALLE_HISTORIA.joven8051 = formato_8051.DETALLE;

            _this.DETALLE_HISTORIA.joven8051.ant_personales.observ_pers =
              _this.DETALLE_HISTORIA.joven8051.ant_personales.observ_pers.replace(/\&/g, "\n").trim();
            _this.DETALLE_HISTORIA.joven8051.ant_familiares.observ_fam =
              _this.DETALLE_HISTORIA.joven8051.ant_familiares.observ_fam.replace(/\&/g, "\n").trim();
            _this.DETALLE_HISTORIA.joven8051.familia.observacion_familia =
              _this.DETALLE_HISTORIA.joven8051.familia.observacion_familia.replace(/\&/g, "\n").trim();
            _this.DETALLE_HISTORIA.joven8051.educacion.observacion_educacion =
              _this.DETALLE_HISTORIA.joven8051.educacion.observacion_educacion.replace(/\&/g, "\n").trim();
            _this.DETALLE_HISTORIA.joven8051.vivienda.observacion_vivienda =
              _this.DETALLE_HISTORIA.joven8051.vivienda.observacion_vivienda.replace(/\&/g, "\n").trim();
            _this.DETALLE_HISTORIA.joven8051.trabajo.observ_trabajo =
              _this.DETALLE_HISTORIA.joven8051.trabajo.observ_trabajo.replace(/\&/g, "\n").trim();
            _this.DETALLE_HISTORIA.joven8051.vida_social.observaciones_social =
              _this.DETALLE_HISTORIA.joven8051.vida_social.observaciones_social.replace(/\&/g, "\n").trim();
            _this.DETALLE_HISTORIA.joven8051.habitos_consumo.observ_hab_cons =
              _this.DETALLE_HISTORIA.joven8051.habitos_consumo.observ_hab_cons.replace(/\&/g, "\n").trim();
            _this.DETALLE_HISTORIA.joven8051.gineco_urologico.observaciones_gine_uro =
              _this.DETALLE_HISTORIA.joven8051.gineco_urologico.observaciones_gine_uro.replace(/\&/g, "\n").trim();
            _this.DETALLE_HISTORIA.joven8051.sexualidad.observaciones_sex =
              _this.DETALLE_HISTORIA.joven8051.sexualidad.observaciones_sex.replace(/\&/g, "\n").trim();
            _this.DETALLE_HISTORIA.joven8051.psico_emocional.observacion_psico =
              _this.DETALLE_HISTORIA.joven8051.psico_emocional.observacion_psico.replace(/\&/g, "\n").trim();
          }

          _this.traerTablaSisvan();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_HC8051();
        });
    },
    traerTablaSisvan() {
      var _this = this;

      postData({ datosh: datosEnvio() + $_REG_HC.id_paciente + "|" }, get_url("APP/SALUD/SER134-03.DLL"))
        .then(function (data) {
          console.log(data);
          _this.SISVAN.TABLA = data.TABLA;

          for (var i in _this.SISVAN.TABLA) {
            if (parseInt(_this.SISVAN.TABLA[i].TALLA) > parseInt(_this.SISVAN.talla_ant))
              _this.SISVAN.talla_ant = parseInt(_this.SISVAN.TABLA[i].TALLA);
          }

          _this.traerTablaOMS();
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          _this.salir_HC8051();
        });
    },
    traerTablaOMS() {
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/AIE-DESA.DLL"))
        .then(function (data) {
          console.log(data);
          _this.TABLAS_OMS = data.TABLAS_OMS;

          _this.asignarDatos();
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          _this.salir_HC8051();
        });
    },
    async asignarDatos() {
      this.global_HC8051.fecha = $_REG_HC.fecha_hc;

      this.global_HC8051.rips.finalid = $_REG_HC.finalid_hc.toString();

      this.datos_ext.grupo_sang = this.datos_paciente["GRP-SANG"].trim();
      this.datos_ext.RH = this.datos_paciente.RH.trim();

      this.datos_ext.ANO = this.global_HC8051.fecha.substring(0, 4);
      this.datos_ext.MES = this.global_HC8051.fecha.substring(4, 6);
      this.datos_ext.DIA = this.global_HC8051.fecha.substring(6, 8);

      this.datos_ext.telefono_paci = this.datos_paciente.TELEFONO;
      this.datos_ext.direccion_paci = this.datos_paciente.DIRECC;

      var mensaje = "";

      if (this.global_HC8051.novedad == "7") {
        this.global_HC8051.hora = moment().format("HHmm");
        this.global_HC8051.med = this.datos_profesional.IDENTIFICACION.trim();
        this.global_HC8051.rips.atiende = this.datos_profesional.ATIENDE_PROF;
        this.global_HC8051.oper_elab = localStorage.Usuario;
        this.datos_ext.NOM_MEDICO =
          parseInt(this.datos_profesional.IDENTIFICACION) + " - " + this.datos_profesional.NOMBRE.trim();

        this.global_HC8051.unid_edad = $_REG_HC.edad_hc.unid_edad;
        this.global_HC8051.vlr_edad = $_REG_HC.edad_hc.vlr_edad.toString();
        this.global_HC8051.edad_dias = SC_DIAS(this.datos_paciente.NACIM, this.global_HC8051.fecha);

        mensaje = "Creando: ";
      } else {
        this.datos_ext.NOM_MEDICO = parseInt(this.global_HC8051.med) + " - " + this.global_HC8051.descrip_med.trim();
        mensaje = "Modificando: ";
      }

      this.datos_ext.HORA = this.global_HC8051.hora.substring(0, 2);
      this.datos_ext.MINUTO = this.global_HC8051.hora.substring(2, 4);

      this.datos_ext.FOLIO = mensaje + $_REG_HC.suc_folio_hc + $_REG_HC.nro_folio_hc;

      this.mostrarSintomatico = true;

      this.mostrarSifilis = true;
      this.params_hc890d.sexo = this.datos_paciente.SEXO;

      /////////////////////// IMPORTANTE COMENTAR, SOLO PARA PRUEBAAAAA
      // this.datos_paciente.SEXO = "F";
      // this.global_HC8051.vlr_edad = "10" // PARA VALES
      // this.global_HC8051.unid_edad = "A"

      this.global_HC8051.signos.und_peso = "1";

      if (
        this.datos_paciente.SEXO == "M" ||
        this.global_HC8051.unid_edad == "D" ||
        this.global_HC8051.unid_edad == "M" ||
        (this.global_HC8051.unid_edad == "A" && parseInt(this.global_HC8051.vlr_edad) < 11)
      ) {
        this.global_HC8051.rips.embarazo = "9";
        this.textos.embarazo = "NO APLICA";
        this.capturarEmbarazo = false;
      } else {
        this.capturarEmbarazo = true;
      }

      [this.fechas.ultima_menstruacion.ano, this.fechas.ultima_menstruacion.mes, this.fechas.ultima_menstruacion.dia] =
        this.devolverFecha(this.DETALLE_HISTORIA.joven8051.gineco_urologico.fecha_ult_mens);
      [this.fechas.citologia.ano, this.fechas.citologia.mes, this.fechas.citologia.dia] = this.devolverFecha(
        this.global_HC8051.fecha_cito_previa
      );
      [this.fechas.primera_vez.ano, this.fechas.primera_vez.mes, this.fechas.primera_vez.dia] = this.devolverFecha(
        this.global_HC8051.rips.fecha_1ra_vez
      );
      [this.fechas.proxima_cita.ano, this.fechas.proxima_cita.mes, this.fechas.proxima_cita.dia] = this.devolverFecha(
        this.global_HC8051.fecha_prox_cita
      );

      this.examen_visual.agudeza_visual_od_1 = this.global_HC8051.examen_visual.agud_visual_od_1;
      this.examen_visual.agudeza_visual_od_2 = this.global_HC8051.examen_visual.agud_visual_od_2;
      this.examen_visual.agudeza_visual_oi_1 = this.global_HC8051.examen_visual.agud_visual_oi_1;
      this.examen_visual.agudeza_visual_oi_2 = this.global_HC8051.examen_visual.agud_visual_oi_2;
      this.examen_visual.distancia_agud = this.global_HC8051.examen_visual.distancia_agud;
      this.examen_visual.estructuras_oculares_od = this.global_HC8051.examen_visual.estructuras_oculares_od;
      this.examen_visual.estructuras_oculares_oi = this.global_HC8051.examen_visual.estructuras_oculares_oi;

      if (
        (this.global_HC8051.serv == "08" || this.global_HC8051.serv == "02") &&
        this.datos_profesional.ATIENDE_PROF == "2"
      )
        this.mostrar_hc890g = true;
      else this.mostrar_hc890g = false;

      this.global_HC8051.signos.peso = parseFloat(this.global_HC8051.signos.peso).toString();
      this.global_HC8051.signos.per_cef = parseFloat(this.global_HC8051.signos.per_cef).toString();
      this.global_HC8051.signos.per_tora = parseFloat(this.global_HC8051.signos.per_tora).toString();
      this.global_HC8051.signos.per_abdo = parseFloat(this.global_HC8051.signos.per_abdo).toString();
      this.global_HC8051.signos.per_mune = parseFloat(this.global_HC8051.signos.per_mune).toString();
      this.global_HC8051.signos.per_braq = parseFloat(this.global_HC8051.signos.per_braq).toString();
      this.global_HC8051.signos.oximetria = parseInt(this.global_HC8051.signos.oximetria).toString();

      this.mostrar_hc890l = true;

      if (this.global_HC8051.unid_edad == "A" && parseInt(this.global_HC8051.vlr_edad) > 17) {
        this.mostrarFindrisk = true;
        this.mostrarGraficas = false;
      } else {
        this.mostrarFindrisk = false;
        this.mostrarGraficas = true;
      }

      if (this.mostrarGraficas) {
        this.graficas.talla.info = await this.calcularGraficas("TXE");
        this.graficarTalla();

        this.graficas.imc.info = await this.calcularGraficas("IMC");
        this.graficarIMC();
      }

      loader("hide");
      this.verificarEstado();
    },
    devolverFecha(fecha) {
      let ano = (mes = dia = "");
      if (fecha) {
        ano = parseInt(fecha.substring(0, 4)).toString().padStart(4, "0") || "";
        mes = parseInt(fecha.substring(4, 6)).toString().padStart(2, "0") || "";
        dia = parseInt(fecha.substring(6, 8)).toString().padStart(2, "0") || "";
      }
      return [ano, mes, dia];
    },
    verificarEstado() {
      if (this.global_HC8051.cierre.estado == "2") {
        CON851("70", "Historia está cerrada, OJO !", null, "error", "Error");

        if (localStorage.Usuario == "GEBC") {
          this.capturarMes_hc();
        } else {
          this.salir_HC8051();
        }
      } else {
        if (
          localStorage.Usuario == "GEBC" ||
          localStorage.Usuario == "ADMI" ||
          parseInt(this.datos_profesional.IDENTIFICACION) == parseInt(this.global_HC8051.med)
        ) {
          this.evaluarUnidadServicio_hc();
        } else {
          CON851("81", "81", null, "error", "Error");
          this.salir_HC8051();
        }
      }
    },
    capturarMes_hc() {
      validarInputs(
        {
          form: "#validarMes_HC8051",
          orden: "1",
        },
        () => this.salir_HC8051(),
        () => {
          this.datos_ext.MES = cerosIzq(this.datos_ext.MES, 2);
          this.capturarDia_hc();
        }
      );
    },
    capturarDia_hc() {
      validarInputs(
        {
          form: "#validarDia_HC8051",
          orden: "1",
        },
        () => this.capturarMes_hc(),
        () => {
          this.datos_ext.DIA = cerosIzq(this.datos_ext.DIA, 2);

          this.global_HC8051.fecha = this.datos_ext.ANO + this.datos_ext.MES + this.datos_ext.DIA;
          this.capturarHora_hc();
        }
      );
    },
    capturarHora_hc() {
      validarInputs(
        {
          form: "#validarHora_HC8051",
          orden: "1",
        },
        () => this.capturarDia_hc(),
        () => {
          if (parseInt(this.datos_ext.HORA) > 24 || parseInt(this.datos_ext.HORA) < 0) {
            CON851("03", "03", null, "error", "Error");
            this.capturarHora_hc();
          } else {
            this.datos_ext.HORA = cerosIzq(this.datos_ext.HORA, 2);
            this.capturarMinuto_hc();
          }
        }
      );
    },
    capturarMinuto_hc() {
      validarInputs(
        {
          form: "#validarMinuto_HC8051",
          orden: "1",
        },
        () => this.capturarHora_hc(),
        () => {
          if (parseInt(this.datos_ext.MINUTO) > 59) {
            CON851("03", "03", null, "error", "Error");
            this.capturarMinuto_hc();
          } else {
            this.datos_ext.MINUTO = cerosIzq(this.datos_ext.MINUTO, 2);
            this.global_HC8051.hora = this.datos_ext.HORA + this.datos_ext.MINUTO;
            this.capturarMedico_hc();
          }
        }
      );
    },
    capturarMedico_hc() {
      var _this = this;

      _ventanaDatos({
        titulo: "Ventana profesionales activos",
        columnas: ["IDENTIFICACION", "NOMBRE", "DESCRIPCION", "REG_MEDICO"],
        data: this.profesionales_HC8051,
        ancho: "70%",
        callback_esc: () => {
          _this.capturarMinuto_hc();
        },
        callback: (data) => {
          _this.global_HC8051.med = data.IDENTIFICACION.trim();
          _this.datos_ext.NOM_MEDICO = parseInt(data.IDENTIFICACION) + " - " + data.NOMBRE.trim();
          _this.evaluarUnidadServicio_hc();
        },
      });
    },
    evaluarUnidadServicio_hc() {
      if (this.global_HC8051.serv.trim() != "") {
        var busqueda = this.unidades_Serv_HC8051.find((x) => x.COD.trim() == this.global_HC8051.serv.trim());

        if (busqueda) this.datos_ext.UNID_SERV = this.global_HC8051.serv + " - " + busqueda.DESCRIP.trim();
        else this.datos_ext.UNID_SERV = this.global_HC8051.serv;
      }

      this.buscarConsultaExterna();
    },
    buscarConsultaExterna() {
      var _this = this;

      if (this.global_HC8051.serv == "02" || this.global_HC8051.serv == "08") {
        postData(
          {
            datosh:
              datosEnvio() +
              localStorage.Usuario +
              "|" +
              _this.datos_paciente.COD +
              "|" +
              _this.global_HC8051.serv +
              "|" +
              moment().format("YYYYMMDD") +
              "|",
          },
          get_url("APP/HICLIN/HC811B.DLL")
        )
          .then((data) => {
            console.log(data);
            _this.nro_ult_comp = data;
            _this.verificarCrearHistoria();
          })
          .catch((err) => {
            console.error(err);
            _this.salir_HC8051();
          });
      } else {
        this.nro_ult_comp = "";
        this.verificarCrearHistoria();
      }
    },
    verificarCrearHistoria() {
      if (this.global_HC8051.novedad == "7") this.crearHistoria();
      else this.validarAcompañante();
    },
    crearHistoria() {
      var _this = this;

      var data = {};
      data["datosh"] =
        datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|" + this.global_HC8051.novedad + "|";
      data["datos_basicos"] =
        this.global_HC8051.fecha +
        "|" +
        this.global_HC8051.hora +
        "|" +
        this.global_HC8051.med +
        "|" +
        this.global_HC8051.serv +
        "|" +
        this.global_HC8051.unid_edad +
        this.global_HC8051.vlr_edad +
        "|" +
        this.global_HC8051.edad_dias +
        "|8051|0|" +
        this.global_HC8051.rips.finalid +
        "|";

      postData(data, get_url("APP/HICLIN/SAVE_TEMP_HC.DLL"))
        .then((data) => {
          console.log(data);

          _this.traerHistoriaClinica(2);
        })
        .catch((error) => {
          console.log(error);
          CON851("", "Ha ocurrido un error creando historia", null, "error", "Error");
          _this.salir_HC8051();
        });
    },
    validarAcompañante() {
      console.log(this.global_HC8051);
      if (this.global_HC8051.acompa.trim() == "") this.global_HC8051.acompa = this.datos_paciente.MADRE.trim();

      validarInputs(
        {
          form: "#validarAcompañante",
          orden: "1",
        },
        () => CON851P("temp", this.validarAcompañante, this.salir_HC8051),
        () => {
          this.global_HC8051.acompa = this.global_HC8051.acompa.replace(/[0-9|{};:,\+\-]/g, "");
          this.modal_victimaConf = true;
          this.datoPaciVictConflicto();
        }
      );
    },
    datoPaciVictConflicto() {
      validarInputs(
        {
          form: "#victConflicto_hc_8051",
        },
        () => {
          this.modal_victimaConf = false;
          this.validarAcompañante();
        },
        () => {
          this.global_HC8051.victi_conflicto_paci =
            this.global_HC8051.victi_conflicto_paci.toUpperCase().trim() != "S" ? "N" : "S";

          this.modal_victimaConf = false;
          this.validarMotivoConsulta();
        }
      );
    },
    validarMotivoConsulta() {
      validarInputs(
        {
          form: "#validarMotivoConsulta",
          orden: "1",
        },
        () => {
          this.modal_victimaConf = true;
          this.datoPaciVictConflicto();
        },
        () => {
          this.global_HC8051.motiv = this.global_HC8051.motiv.replaceEsp();

          this.guardarHistoria(this.validarMotivoConsulta, () => {
            CON851("", "Motivo y acompañante guardado", null, "success", "Correcto");
            this.validarEnfermedadActual();
          });
        }
      );
    },
    validarEnfermedadActual() {
      validarInputs(
        {
          form: "#validarEnfermedadActual",
          orden: "1",
        },
        () => this.validarMotivoConsulta(),
        () => {
          this.DETALLE_HISTORIA.Enfermedad_Actual = this.DETALLE_HISTORIA.Enfermedad_Actual.replaceEsp();

          let _this = this;
          grabarDetallesText(this.DETALLE_HISTORIA.Enfermedad_Actual, $_REG_HC.llave_hc + "1001")
            .then(() => {
              CON851("", "Enfermedad actual guardada", null, "success", "Correcto");
              _this.validarPerinatalNormal();
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error Guardando enfermedad actual", null, "error", "Error");
              _this.validarEnfermedadActual();
            });
        }
      );
    },
    validarPerinatalNormal() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Perinatales normales",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarEnfermedadActual(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_personales.perinatales,
            teclaAlterna: true,
            id_input: "#validarPerinatalNormal",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_personales.perinatales = data.COD;
            _this.validarCrecimientoNormal();
          }
        );
      }, 300);
    },
    validarCrecimientoNormal() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Crecimiento normal",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarPerinatalNormal(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_personales.crecimiento,
            teclaAlterna: true,
            id_input: "#validarCrecimientoNormal",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_personales.crecimiento = data.COD;
            _this.validarDesarrolloNormal();
          }
        );
      }, 300);
    },
    validarDesarrolloNormal() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Desarrollo normal",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarCrecimientoNormal(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_personales.desarrollo,
            teclaAlterna: true,
            id_input: "#validarDesarrolloNormal",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_personales.desarrollo = data.COD;
            _this.validarVacunasCompletas();
          }
        );
      }, 300);
    },
    validarVacunasCompletas() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Vacunas completas",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarDesarrolloNormal(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_personales.vacunas,
            teclaAlterna: true,
            id_input: "#validarVacunasCompletas",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_personales.vacunas = data.COD;
            _this.validarEnfermedadCronica();
          }
        );
      }, 300);
    },
    validarEnfermedadCronica() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Enfermedad crónica",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarVacunasCompletas(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_personales.enf_cronica,
            teclaAlterna: true,
            id_input: "#validarEnfermedadCronica",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_personales.enf_cronica = data.COD;
            _this.validarDiscapacidad();
          }
        );
      }, 300);
    },
    validarDiscapacidad() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Discapacidad",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarEnfermedadCronica(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_personales.discapacidad,
            teclaAlterna: true,
            id_input: "#validarDiscapacidad",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_personales.discapacidad = data.COD;
            _this.validarEnfContagiosa();
          }
        );
      }, 300);
    },
    validarEnfContagiosa() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Enfermedad Infecto-contagiosa",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarDiscapacidad(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_personales.enf_infe_cont,
            teclaAlterna: true,
            id_input: "#validarEnfContagiosa",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_personales.enf_infe_cont = data.COD;
            _this.validarAccidentes();
          }
        );
      }, 300);
    },
    validarAccidentes() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Accidentes",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarEnfContagiosa(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_personales.accidentes,
            teclaAlterna: true,
            id_input: "#validarAccidentes",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_personales.accidentes = data.COD;

            if (_this.DETALLE_HISTORIA.joven8051.ant_personales.accidentes == "1") _this.validarFrecuenciaAccidentes();
            else {
              _this.DETALLE_HISTORIA.joven8051.ant_personales.accid_frec = "";
              _this.validarProblemasPsicologicos();
            }
          }
        );
      }, 300);
    },
    validarFrecuenciaAccidentes() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Frecuencia Accidentes",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarAccidentes(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_personales.accid_frec,
            teclaAlterna: true,
            id_input: "#validarFrecuenciaAccidentes",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_personales.accid_frec = data.COD;

            _this.validarProblemasPsicologicos();
          }
        );
      }, 300);
    },
    validarProblemasPsicologicos() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Problemas psicologicos",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => {
              if (this.DETALLE_HISTORIA.joven8051.ant_personales.accidentes == "1") this.validarFrecuenciaAccidentes();
              else this.validarAccidentes();
            },
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_personales.problem_psico,
            teclaAlterna: true,
            id_input: "#validarProblemasPsicologicos",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_personales.problem_psico = data.COD;

            _this.validarProblemasJudiciales();
          }
        );
      }, 300);
    },
    validarProblemasJudiciales() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Problemas judiciales",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarProblemasPsicologicos(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_personales.judiciales,
            teclaAlterna: true,
            id_input: "#validarProblemasJudiciales",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_personales.judiciales = data.COD;

            _this.validarViolencia();
          }
        );
      }, 300);
    },
    validarViolencia() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Violencia",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarProblemasJudiciales(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_personales.violencia,
            teclaAlterna: true,
            id_input: "#validarViolencia",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_personales.violencia = data.COD;

            _this.guardarDetalle8051(this.validarViolencia, () => {
              CON851("", "Antecedentes personales guardados", null, "success", "Correcto");
              _this.validarAntecedentesTraumatologicos();
            });
          }
        );
      }, 300);
    },
    validarAntecedentesTraumatologicos() {
      validarInputs(
        {
          form: "#validarAntece_trauma",
          orden: "1",
        },
        () => this.validarViolencia(),
        () => {
          this.DETALLE_HISTORIA.Antecedentes_Traumatologicos =
            this.DETALLE_HISTORIA.Antecedentes_Traumatologicos.replaceEsp();

          let _this = this;
          grabarDetallesText(this.DETALLE_HISTORIA.Antecedentes_Traumatologicos, $_REG_HC.llave_hc + "2040")
            .then(() => {
              CON851("", "Antecedentes traumatologicos guardados", null, "success", "Correcto");
              _this.validarAntecedentesQuirurgicos();
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error Guardando Antecedentes traumatologicos", null, "error", "Error");
              _this.validarAntecedentesTraumatologicos();
            });
        }
      );
    },
    validarAntecedentesQuirurgicos() {
      validarInputs(
        {
          form: "#validarAntece_quirur",
          orden: "1",
        },
        () => this.validarAntecedentesTraumatologicos(),
        () => {
          this.DETALLE_HISTORIA.Antecedentes_Quirurgicos = this.DETALLE_HISTORIA.Antecedentes_Quirurgicos.replaceEsp();

          let _this = this;
          grabarDetallesText(this.DETALLE_HISTORIA.Antecedentes_Quirurgicos, $_REG_HC.llave_hc + "2020")
            .then(() => {
              CON851("", "Antecedentes quirurgicos guardados", null, "success", "Correcto");
              _this.validarAntecedentesToxico();
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error Guardando Antecedentes quirurgicos", null, "error", "Error");
              _this.validarAntecedentesQuirurgicos();
            });
        }
      );
    },
    validarAntecedentesToxico() {
      validarInputs(
        {
          form: "#validarAntece_toxico",
          orden: "1",
        },
        () => this.validarAntecedentesQuirurgicos(),
        () => {
          this.DETALLE_HISTORIA.Antecedentes_Toxico = this.DETALLE_HISTORIA.Antecedentes_Toxico.replaceEsp();

          let _this = this;
          grabarDetallesText(this.DETALLE_HISTORIA.Antecedentes_Toxico, $_REG_HC.llave_hc + "2035")
            .then(() => {
              CON851("", "Antecedentes toxico-alergicos guardados", null, "success", "Correcto");
              _this.validarSaludOral();
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error Guardando Antecedentes toxico-alergicos", null, "error", "Error");
              _this.validarAntecedentesToxico();
            });
        }
      );
    },
    validarSaludOral() {
      validarInputs(
        {
          form: "#validarSaludOral",
          orden: "1",
        },
        () => {
          this.validarAntecedentesToxico();
        },
        () => {
          this.global_HC8051.salud_oral_ult_12mes =
            this.global_HC8051.salud_oral_ult_12mes.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.capturarEmbarazo) this.validarEmbarazo();
          else this.validarObservaciones_Personales();
        }
      );
    },
    validarEmbarazo() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Condición usuaria",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.condicion_embarazo,
            callback_f: () => this.validarSaludOral(),
            seleccion: this.global_HC8051.rips.embarazo,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_HC8051.rips.embarazo = data.COD;

            if (_this.global_HC8051.rips.embarazo == "4") this.datos_ext.sw_embar_w = "N";
            else this.datos_ext.sw_embar_w = "S";

            _this.validarObservaciones_Personales();
          }
        );
      }, 300);
    },
    validarObservaciones_Personales() {
      validarInputs(
        {
          form: "#validarObservPersonal",
          orden: "1",
        },
        () => {
          if (this.capturarEmbarazo) this.validarEmbarazo();
          else this.validarSaludOral();
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.ant_personales.observ_pers =
            this.DETALLE_HISTORIA.joven8051.ant_personales.observ_pers.replaceEsp();

          this.guardarDetalle8051(this.validarObservaciones_Personales, () => {
            CON851("", "Observaciones Antecedentes personales guardados", null, "success", "Correcto");
            this.validarDiabetes();
          });
        }
      );
    },
    validarDiabetes() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Diabetes",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarObservaciones_Personales(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_familiares.diabetes,
            teclaAlterna: true,
            id_input: "#validarDiabetes",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_familiares.diabetes = data.COD;

            if (_this.DETALLE_HISTORIA.joven8051.ant_familiares.diabetes == "1") {
              _this.popUpParentesco("dia_quien", _this.validarDiabetes, _this.validarObesidad);
            } else {
              _this.DETALLE_HISTORIA.joven8051.ant_familiares.dia_quien = "";
              _this.validarObesidad();
            }
          }
        );
      }, 300);
    },
    validarObesidad() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Obesidad",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarDiabetes(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_familiares.obesidad,
            teclaAlterna: true,
            id_input: "#validarObesidad",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_familiares.obesidad = data.COD;

            if (_this.DETALLE_HISTORIA.joven8051.ant_familiares.obesidad == "1") {
              _this.popUpParentesco("obe_quien", _this.validarObesidad, _this.validarCardiovascular);
            } else {
              _this.DETALLE_HISTORIA.joven8051.ant_familiares.obe_quien = "";
              _this.validarCardiovascular();
            }
          }
        );
      }, 300);
    },
    validarCardiovascular() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Cardiovascular",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarObesidad(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_familiares.cardiovascular,
            teclaAlterna: true,
            id_input: "#validarCardiovascular",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_familiares.cardiovascular = data.COD;

            if (_this.DETALLE_HISTORIA.joven8051.ant_familiares.cardiovascular == "1") {
              _this.popUpParentesco("car_quien", _this.validarCardiovascular, _this.validarAlergia);
            } else {
              _this.DETALLE_HISTORIA.joven8051.ant_familiares.car_quien = "";
              _this.validarAlergia();
            }
          }
        );
      }, 300);
    },
    validarAlergia() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Alergia",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarCardiovascular(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_familiares.alergia,
            teclaAlterna: true,
            id_input: "#validarAlergia",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_familiares.alergia = data.COD;

            if (_this.DETALLE_HISTORIA.joven8051.ant_familiares.alergia == "1") {
              _this.popUpParentesco("ale_quien", _this.validarAlergia, _this.validarInfecciones);
            } else {
              _this.DETALLE_HISTORIA.joven8051.ant_familiares.ale_quien = "";
              _this.validarInfecciones();
            }
          }
        );
      }, 300);
    },
    validarInfecciones() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Infecciones",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarAlergia(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_familiares.infecciones,
            teclaAlterna: true,
            id_input: "#validarInfecciones",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_familiares.infecciones = data.COD;

            if (_this.DETALLE_HISTORIA.joven8051.ant_familiares.infecciones == "1") {
              _this.popUpParentesco("inf_quien", _this.validarInfecciones, _this.validarCancer);
            } else {
              _this.DETALLE_HISTORIA.joven8051.ant_familiares.inf_quien = "";
              _this.validarCancer();
            }
          }
        );
      }, 300);
    },
    validarCancer() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Cáncer",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarInfecciones(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_familiares.cancer,
            teclaAlterna: true,
            id_input: "#validarCancer",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_familiares.cancer = data.COD;

            if (_this.DETALLE_HISTORIA.joven8051.ant_familiares.cancer == "1") {
              _this.popUpParentesco("can_quien", _this.validarCancer, _this.validarProblemaPsicoPsiqui);
            } else {
              _this.DETALLE_HISTORIA.joven8051.ant_familiares.can_quien = "";
              _this.validarProblemaPsicoPsiqui();
            }
          }
        );
      }, 300);
    },
    validarProblemaPsicoPsiqui() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Problema psicologico/psiquiatras",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarCancer(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_familiares.fam_psico,
            teclaAlterna: true,
            id_input: "#validarProblemaPsicoPsiqui",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_familiares.fam_psico = data.COD;

            if (_this.DETALLE_HISTORIA.joven8051.ant_familiares.fam_psico == "1") {
              _this.popUpParentesco("fam_quien", _this.validarProblemaPsicoPsiqui, _this.validarAlcohol);
            } else {
              _this.DETALLE_HISTORIA.joven8051.ant_familiares.fam_quien = "";
              _this.validarAlcohol();
            }
          }
        );
      }, 300);
    },
    validarAlcohol() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Alcohol/drogas/otros",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarProblemaPsicoPsiqui(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_familiares.alcohol_drog,
            teclaAlterna: true,
            id_input: "#validarAlcohol",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_familiares.alcohol_drog = data.COD;

            if (_this.DETALLE_HISTORIA.joven8051.ant_familiares.alcohol_drog == "1") {
              _this.popUpParentesco("alc_quien", _this.validarAlcohol, _this.validarViolenciaIntrafam);
            } else {
              _this.DETALLE_HISTORIA.joven8051.ant_familiares.alc_quien = "";
              _this.validarViolenciaIntrafam();
            }
          }
        );
      }, 300);
    },
    validarViolenciaIntrafam() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Violencia intrafamiliar",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarAlcohol(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_familiares.violencia_fam,
            teclaAlterna: true,
            id_input: "#validarViolenciaIntrafam",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_familiares.violencia_fam = data.COD;

            if (_this.DETALLE_HISTORIA.joven8051.ant_familiares.violencia_fam == "1") {
              _this.popUpParentesco("vio_quien", _this.validarViolenciaIntrafam, _this.validarMadrePadreAdol);
            } else {
              _this.DETALLE_HISTORIA.joven8051.ant_familiares.vio_quien = "";
              _this.validarMadrePadreAdol();
            }
          }
        );
      }, 300);
    },
    validarMadrePadreAdol() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Madre/padre adolescente",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarViolenciaIntrafam(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_familiares.madre_padre_adol,
            teclaAlterna: true,
            id_input: "#validarMadrePadreAdol",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_familiares.madre_padre_adol = data.COD;

            if (_this.DETALLE_HISTORIA.joven8051.ant_familiares.madre_padre_adol == "1") {
              _this.popUpParentesco("mad_quien", _this.validarMadrePadreAdol, _this.validarJudiciales);
            } else {
              _this.DETALLE_HISTORIA.joven8051.ant_familiares.mad_quien = "";
              _this.validarJudiciales();
            }
          }
        );
      }, 300);
    },
    validarJudiciales() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Judiciales",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarMadrePadreAdol(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_familiares.fam_judiciales,
            teclaAlterna: true,
            id_input: "#validarJudiciales",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_familiares.fam_judiciales = data.COD;

            if (_this.DETALLE_HISTORIA.joven8051.ant_familiares.fam_judiciales == "1") {
              _this.popUpParentesco("fam_jud_quien", _this.validarJudiciales, _this.validarNeurologicos);
            } else {
              _this.DETALLE_HISTORIA.joven8051.ant_familiares.fam_jud_quien = "";
              _this.validarNeurologicos();
            }
          }
        );
      }, 300);
    },
    validarNeurologicos() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Neurologicos",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarJudiciales(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_familiares.neurologicos,
            teclaAlterna: true,
            id_input: "#validarNeurologicos",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_familiares.neurologicos = data.COD;

            if (_this.DETALLE_HISTORIA.joven8051.ant_familiares.neurologicos == "1") {
              _this.popUpParentesco("neu_quien", _this.validarNeurologicos, _this.validarOtrosFamiliares);
            } else {
              _this.DETALLE_HISTORIA.joven8051.ant_familiares.neu_quien = "";
              _this.validarOtrosFamiliares();
            }
          }
        );
      }, 300);
    },
    popUpParentesco(select, escape, siguiente) {
      setTimeout(() => {
        POPUP(
          {
            array: this.parentesco,
            titulo: "Parentesco",
            indices: [{ id: "COD", label: "DESCRIP" }],
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_familiares[select],
            callback_f: () => escape(),
          },
          (data) => {
            this.DETALLE_HISTORIA.joven8051.ant_familiares[select] = data.COD;
            siguiente();
          }
        );
      }, 300);
    },
    validarOtrosFamiliares() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Otros",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_nosabe,
            callback_f: () => this.validarNeurologicos(),
            seleccion: this.DETALLE_HISTORIA.joven8051.ant_familiares.otros,
            teclaAlterna: true,
            id_input: "#validarOtrosFamiliares",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.ant_familiares.otros = data.COD;

            _this.validarObservAntFamiliares();
          }
        );
      }, 300);
    },
    validarObservAntFamiliares() {
      validarInputs(
        {
          form: "#validarObservAntFamiliares",
          orden: "1",
        },
        () => this.validarOtrosFamiliares(),
        () => {
          this.DETALLE_HISTORIA.joven8051.ant_familiares.observ_fam =
            this.DETALLE_HISTORIA.joven8051.ant_familiares.observ_fam.replaceEsp();

          this.guardarDetalle8051(this.validarObservaciones_Personales, () => {
            CON851("", "Antecedentes familiares guardados", null, "success", "Correcto");
            this.llamarCOVID();
          });
        }
      );
    },
    llamarCOVID() {
      if (this.mostrarCovid) {
        this.params_hc890h.pregunta = 1;
        this.params_hc890h.estado = true;
      } else {
        this.global_HC8051.covid19 = _tipoJsonHc("covid19");
        $("#focoTarjetaFamilia").get(0).scrollIntoView({ behavior: "smooth", block: "center" });
        this.validarDondeVive();
      }
    },
    EscpreguntasCovid() {
      this.params_hc890h.pregunta = 0;
      this.params_hc890h.estado = false;
      this.validarObservAntFamiliares();
    },
    recibirPreguntasCovid(pregunta, param) {
      this.global_HC8051.covid19 = param;
      this.params_hc890h.pregunta = 0;
      this.params_hc890h.estado = false;

      this.guardarHistoria(this.llamarCOVID, () => {
        $("#focoTarjetaFamilia").get(0).scrollIntoView({ behavior: "smooth", block: "center" });
        CON851("", "Signos guardados", null, "success", "Correcto");
        this.validarDondeVive();
      });
    },
    validarDondeVive() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Donde vive",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_donde_vive,
            callback_f: () => {
              if (this.mostrarCovid) {
                this.params_hc890h.pregunta = 1;
                this.params_hc890h.estado = true;
              } else this.validarObservAntFamiliares();
            },
            seleccion: this.DETALLE_HISTORIA.joven8051.familia.vive_lugar,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.familia.vive_lugar = data.COD;

            _this.validarEstudiosPadre();
          }
        );
      }, 300);
    },
    validarEstudiosPadre() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Estudios padre",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.estudios,
            callback_f: () => this.validarDondeVive(),
            seleccion: this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.niv_estud_padre,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.niv_estud_padre = data.COD;

            switch (_this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.niv_estud_padre) {
              case "3":
              case "4":
              case "7":
              case "8":
              case "9":
              case "A":
              case "B":
              case "C":
              case "D":
                _this.validarNivelPadre();
                break;
              default:
                _this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.semestre_estud_padre = "00";
                _this.validarOcupacionPadre();
                break;
            }
          }
        );
      }, 300);
    },
    validarNivelPadre() {
      validarInputs(
        {
          form: "#validarNivelPadre",
          orden: "1",
        },
        () => this.validarEstudiosPadre(),
        () => {
          this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.semestre_estud_padre = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.semestre_estud_padre)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.semestre_estud_padre).toString();

          this.validarOcupacionPadre();
        }
      );
    },
    validarOcupacionPadre() {
      validarInputs(
        {
          form: "#validarOcupacionPadre",
          orden: "1",
        },
        () => {
          switch (this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.niv_estud_padre) {
            case "3":
            case "4":
            case "7":
            case "8":
            case "9":
            case "A":
            case "B":
            case "C":
            case "D":
              this.validarNivelPadre();
              break;
            default:
              this.validarEstudiosPadre();
              break;
          }
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.familia.fam_trabajo.ocup_padre =
            this.DETALLE_HISTORIA.joven8051.familia.fam_trabajo.ocup_padre.toUpperCase().trim();

          this.validarEstabilidadPadre();
        }
      );
    },
    validarEstabilidadPadre() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Estabilidad trabajo del padre",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.estabilidad_trabajo,
            callback_f: () => this.validarOcupacionPadre(),
            seleccion: this.DETALLE_HISTORIA.joven8051.familia.fam_trabajo.ocup_estable_padre,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.familia.fam_trabajo.ocup_estable_padre = data.COD;

            this.validarEstudiosMadre();
          }
        );
      }, 300);
    },
    validarEstudiosMadre() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Estudios madre",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.estudios,
            callback_f: () => this.validarEstudiosPadre(),
            seleccion: this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.niv_estud_madre,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.niv_estud_madre = data.COD;

            switch (_this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.niv_estud_madre) {
              case "3":
              case "4":
              case "7":
              case "8":
              case "9":
              case "A":
              case "B":
              case "C":
              case "D":
                _this.validarNivelMadre();
                break;
              default:
                _this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.semestre_estud_madre = "00";
                _this.validarOcupacionMadre();
                break;
            }
          }
        );
      }, 300);
    },
    validarNivelMadre() {
      validarInputs(
        {
          form: "#validarNivelMadre",
          orden: "1",
        },
        () => this.validarEstudiosMadre(),
        () => {
          this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.semestre_estud_madre = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.semestre_estud_madre)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.semestre_estud_madre).toString();

          this.validarOcupacionMadre();
        }
      );
    },
    validarOcupacionMadre() {
      validarInputs(
        {
          form: "#validarOcupacionMadre",
          orden: "1",
        },
        () => {
          switch (this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.niv_estud_madre) {
            case "3":
            case "4":
            case "7":
            case "8":
            case "9":
            case "A":
            case "B":
            case "C":
            case "D":
              this.validarNivelMadre();
              break;
            default:
              this.validarEstudiosMadre();
              break;
          }
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.familia.fam_trabajo.ocup_madre =
            this.DETALLE_HISTORIA.joven8051.familia.fam_trabajo.ocup_madre.toUpperCase().trim();

          this.validarEstabilidadMadre();
        }
      );
    },
    validarEstabilidadMadre() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Estabilidad trabajo de la madre",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.estabilidad_trabajo,
            callback_f: () => this.validarOcupacionMadre(),
            seleccion: this.DETALLE_HISTORIA.joven8051.familia.fam_trabajo.ocup_estable_madre,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.familia.fam_trabajo.ocup_estable_madre = data.COD;

            this.validarEstudiosPareja();
          }
        );
      }, 300);
    },
    validarEstudiosPareja() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Estudios pareja",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.estudios,
            callback_f: () => this.validarEstudiosMadre(),
            seleccion: this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.niv_estud_pareja,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.niv_estud_pareja = data.COD;

            switch (_this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.niv_estud_pareja) {
              case "3":
              case "4":
              case "7":
              case "8":
              case "9":
              case "A":
              case "B":
              case "C":
              case "D":
                _this.validarNivelPareja();
                break;
              default:
                _this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.semestre_estud_pareja = "00";
                _this.validarOcupacionPareja();
                break;
            }
          }
        );
      }, 300);
    },
    validarNivelPareja() {
      validarInputs(
        {
          form: "#validarNivelPareja",
          orden: "1",
        },
        () => this.validarEstudiosPareja(),
        () => {
          this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.semestre_estud_pareja = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.semestre_estud_pareja)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.semestre_estud_pareja).toString();

          this.validarOcupacionPareja();
        }
      );
    },
    validarOcupacionPareja() {
      validarInputs(
        {
          form: "#validarOcupacionPareja",
          orden: "1",
        },
        () => {
          switch (this.DETALLE_HISTORIA.joven8051.familia.fam_nivel_estud.niv_estud_pareja) {
            case "3":
            case "4":
            case "7":
            case "8":
            case "9":
            case "A":
            case "B":
            case "C":
            case "D":
              this.validarNivelPareja();
              break;
            default:
              this.validarEstudiosPareja();
              break;
          }
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.familia.fam_trabajo.ocup_pareja =
            this.DETALLE_HISTORIA.joven8051.familia.fam_trabajo.ocup_pareja.toUpperCase().trim();

          this.validarEstabilidadPareja();
        }
      );
    },
    validarEstabilidadPareja() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Estabilidad trabajo de la pareja",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.estabilidad_trabajo,
            callback_f: () => this.validarOcupacionPareja(),
            seleccion: this.DETALLE_HISTORIA.joven8051.familia.fam_trabajo.ocup_estable_pareja,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.familia.fam_trabajo.ocup_estable_pareja = data.COD;

            this.validarConviveMadre();
          }
        );
      }, 300);
    },
    validarConviveMadre() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Madre",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_convive,
            callback_f: () => this.validarEstudiosPareja(),
            seleccion: this.DETALLE_HISTORIA.joven8051.familia.convive_madre,
            teclaAlterna: true,
            id_input: "#validarConviveMadre",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.familia.convive_madre = data.COD;

            _this.validarConvivePadre();
          }
        );
      }, 300);
    },
    validarConvivePadre() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Padre",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_convive,
            callback_f: () => this.validarConviveMadre(),
            seleccion: this.DETALLE_HISTORIA.joven8051.familia.convive_padre,
            teclaAlterna: true,
            id_input: "#validarConvivePadre",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.familia.convive_padre = data.COD;

            _this.validarConviveMadrastra();
          }
        );
      }, 300);
    },
    validarConviveMadrastra() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Madrastra",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_convive,
            callback_f: () => this.validarConvivePadre(),
            seleccion: this.DETALLE_HISTORIA.joven8051.familia.convive_madrastra,
            teclaAlterna: true,
            id_input: "#validarConviveMadrastra",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.familia.convive_madrastra = data.COD;

            _this.validarConvivePadrastro();
          }
        );
      }, 300);
    },
    validarConvivePadrastro() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Padrastro",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_convive,
            callback_f: () => this.validarConviveMadrastra(),
            seleccion: this.DETALLE_HISTORIA.joven8051.familia.convive_padrastro,
            teclaAlterna: true,
            id_input: "#validarConvivePadrastro",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.familia.convive_padrastro = data.COD;

            _this.validarConviveHermanos();
          }
        );
      }, 300);
    },
    validarConviveHermanos() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Hermanos",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_convive,
            callback_f: () => this.validarConvivePadrastro(),
            seleccion: this.DETALLE_HISTORIA.joven8051.familia.convive_hermanos,
            teclaAlterna: true,
            id_input: "#validarConviveHermanos",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.familia.convive_hermanos = data.COD;

            _this.validarConvivePareja();
          }
        );
      }, 300);
    },
    validarConvivePareja() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Pareja",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_convive,
            callback_f: () => this.validarConviveHermanos(),
            seleccion: this.DETALLE_HISTORIA.joven8051.familia.convive_pareja,
            teclaAlterna: true,
            id_input: "#validarConvivePareja",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.familia.convive_pareja = data.COD;

            _this.validarConviveHijo();
          }
        );
      }, 300);
    },
    validarConviveHijo() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Hijo",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_convive,
            callback_f: () => this.validarConvivePareja(),
            seleccion: this.DETALLE_HISTORIA.joven8051.familia.convive_hijo,
            teclaAlterna: true,
            id_input: "#validarConviveHijo",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.familia.convive_hijo = data.COD;

            _this.validarConviveOtros();
          }
        );
      }, 300);
    },
    validarConviveOtros() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Otros",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_convive,
            callback_f: () => this.validarConviveHijo(),
            seleccion: this.DETALLE_HISTORIA.joven8051.familia.convive_otros,
            teclaAlterna: true,
            id_input: "#validarConviveOtros",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.familia.convive_otros = data.COD;

            _this.validarApoyoSocial();
          }
        );
      }, 300);
    },
    validarApoyoSocial() {
      validarInputs(
        {
          form: "#validarApoyoSocial",
          orden: "1",
        },
        () => this.validarConviveOtros(),
        () => {
          this.DETALLE_HISTORIA.joven8051.familia.apoyo_social_subsidio =
            this.DETALLE_HISTORIA.joven8051.familia.apoyo_social_subsidio.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarPercepcionFamilia();
        }
      );
    },
    validarPercepcionFamilia() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Percepcion sobre su familia",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_percepcion_familia,
            callback_f: () => this.validarApoyoSocial(),
            seleccion: this.DETALLE_HISTORIA.joven8051.familia.percepcion_familia,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.familia.percepcion_familia = data.COD;

            _this.validarObservacionesFamiliares();
          }
        );
      }, 300);
    },
    validarObservacionesFamiliares() {
      validarInputs(
        {
          form: "#validarObservFamilia",
          orden: "1",
        },
        () => this.validarPercepcionFamilia(),
        () => {
          this.DETALLE_HISTORIA.joven8051.familia.observacion_familia =
            this.DETALLE_HISTORIA.joven8051.familia.observacion_familia.replaceEsp();

          this.guardarDetalle8051(this.validarObservacionesFamiliares, () => {
            CON851("", "Familia guardada", null, "success", "Correcto");
            this.validarEstudia();
          });
        }
      );
    },
    validarEstudia() {
      validarInputs(
        {
          form: "#validarEstudia",
          orden: "1",
        },
        () => this.validarObservacionesFamiliares(),
        () => {
          this.DETALLE_HISTORIA.joven8051.educacion.estudia =
            this.DETALLE_HISTORIA.joven8051.educacion.estudia.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.joven8051.educacion.estudia == "S") this.validarInstitucionEducativa();
          else {
            this.DETALLE_HISTORIA.joven8051.educacion.grado_curso = "";
            this.DETALLE_HISTORIA.joven8051.educacion.nivel_estud = "";
            this.DETALLE_HISTORIA.joven8051.educacion.institucion_est = "";
            this.validarAnosAprobados();
          }
        }
      );
    },
    validarInstitucionEducativa() {
      validarInputs(
        {
          form: "#validarInstitucionEducativa",
          orden: "1",
        },
        () => this.validarEstudia(),
        () => {
          this.DETALLE_HISTORIA.joven8051.educacion.institucion_est =
            this.DETALLE_HISTORIA.joven8051.educacion.institucion_est.toUpperCase().trim();

          this.validarNivelEstudioJoven();
        }
      );
    },
    validarNivelEstudioJoven() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Nivel estudio",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.estudios,
            callback_f: () => this.validarInstitucionEducativa(),
            seleccion: this.DETALLE_HISTORIA.joven8051.educacion.nivel_estud,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.educacion.nivel_estud = data.COD;

            _this.validarGradoCurso();
          }
        );
      }, 300);
    },
    validarGradoCurso() {
      validarInputs(
        {
          form: "#validarGradoCurso",
          orden: "1",
        },
        () => this.validarNivelEstudioJoven(),
        () => {
          this.DETALLE_HISTORIA.joven8051.educacion.grado_curso = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.educacion.grado_curso)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.educacion.grado_curso).toString();

          this.validarAnosAprobados();
        }
      );
    },
    validarAnosAprobados() {
      validarInputs(
        {
          form: "#validarAnosAprobados",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.joven8051.educacion.estudia == "S") this.validarGradoCurso();
          else this.validarEstudia();
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.educacion.anos_aprobados = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.educacion.anos_aprobados)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.educacion.anos_aprobados).toString();

          this.validarProblemasEscuela();
        }
      );
    },
    validarProblemasEscuela() {
      validarInputs(
        {
          form: "#validarProblemasEscuela",
          orden: "1",
        },
        () => this.validarAnosAprobados(),
        () => {
          this.DETALLE_HISTORIA.joven8051.educacion.problemas_escuela =
            this.DETALLE_HISTORIA.joven8051.educacion.problemas_escuela.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarViolenciaEscolar();
        }
      );
    },
    validarViolenciaEscolar() {
      validarInputs(
        {
          form: "#validarViolenciaEscolar",
          orden: "1",
        },
        () => this.validarProblemasEscuela(),
        () => {
          this.DETALLE_HISTORIA.joven8051.educacion.violencia_escolar =
            this.DETALLE_HISTORIA.joven8051.educacion.violencia_escolar.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarAnosRepetidos();
        }
      );
    },
    validarAnosRepetidos() {
      validarInputs(
        {
          form: "#validarAnosRepetidos",
          orden: "1",
        },
        () => this.validarViolenciaEscolar(),
        () => {
          this.DETALLE_HISTORIA.joven8051.educacion.anos_repetidos =
            this.DETALLE_HISTORIA.joven8051.educacion.anos_repetidos.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.joven8051.educacion.anos_repetidos == "S") this.validarCausaAnosRepetidos();
          else {
            this.DETALLE_HISTORIA.joven8051.educacion.causa_repetidos = "";
            this.validarExclusion();
          }
        }
      );
    },
    validarCausaAnosRepetidos() {
      validarInputs(
        {
          form: "#validarCausaAnosRepetidos",
          orden: "1",
        },
        () => this.validarAnosRepetidos(),
        () => {
          this.DETALLE_HISTORIA.joven8051.educacion.desercion_exclusion =
            this.DETALLE_HISTORIA.joven8051.educacion.desercion_exclusion.toUpperCase().trim();

          this.validarExclusion();
        }
      );
    },
    validarExclusion() {
      validarInputs(
        {
          form: "#validarExclusion",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.joven8051.educacion.anos_repetidos == "S") this.validarCausaAnosRepetidos();
          else this.validarAnosRepetidos();
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.educacion.desercion_exclusion =
            this.DETALLE_HISTORIA.joven8051.educacion.desercion_exclusion.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.joven8051.educacion.desercion_exclusion == "S") this.validarCausaExclusion();
          else {
            this.DETALLE_HISTORIA.joven8051.educacion.causa_desercion = "";
            this.validarEducacionNoFormal();
          }
        }
      );
    },
    validarCausaExclusion() {
      validarInputs(
        {
          form: "#validarCausaExclusion",
          orden: "1",
        },
        () => this.validarExclusion(),
        () => {
          this.DETALLE_HISTORIA.joven8051.educacion.causa_desercion =
            this.DETALLE_HISTORIA.joven8051.educacion.causa_desercion.toUpperCase().trim();

          this.validarEducacionNoFormal();
        }
      );
    },
    validarEducacionNoFormal() {
      validarInputs(
        {
          form: "#validarEducacionNoFormal",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.joven8051.educacion.desercion_exclusion == "S") this.validarCausaExclusion();
          else this.validarExclusion();
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.educacion.educacion_no_formal =
            this.DETALLE_HISTORIA.joven8051.educacion.educacion_no_formal.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.joven8051.educacion.educacion_no_formal == "S") this.validarCualEducacionNoFormal();
          else {
            this.DETALLE_HISTORIA.joven8051.educacion.cual_edu_no_formal = "";
            this.validarObservEducacion();
          }
        }
      );
    },
    validarCualEducacionNoFormal() {
      validarInputs(
        {
          form: "#validarCualEducacionNoFormal",
          orden: "1",
        },
        () => this.validarEducacionNoFormal(),
        () => {
          this.DETALLE_HISTORIA.joven8051.educacion.cual_edu_no_formal =
            this.DETALLE_HISTORIA.joven8051.educacion.cual_edu_no_formal.toUpperCase().trim();

          this.validarObservEducacion();
        }
      );
    },
    validarObservEducacion() {
      validarInputs(
        {
          form: "#validarObservEducacion",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.joven8051.educacion.educacion_no_formal == "S") this.validarCualEducacionNoFormal();
          else this.validarEducacionNoFormal();
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.educacion.observacion_educacion =
            this.DETALLE_HISTORIA.joven8051.educacion.observacion_educacion.replaceEsp();

          this.guardarDetalle8051(this.validarObservEducacion, () => {
            CON851("", "Educacion guardada", null, "success", "Correcto");
            this.validarAcueducto();
          });
        }
      );
    },
    validarAcueducto() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Acueducto",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_acueducto,
            callback_f: () => this.validarObservEducacion(),
            seleccion: this.DETALLE_HISTORIA.joven8051.vivienda.acueducto,
            teclaAlterna: true,
            id_input: "#validarAcueducto",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.vivienda.acueducto = data.COD;

            _this.validarAlcantarillado();
          }
        );
      }, 300);
    },
    validarAlcantarillado() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Alcantarillado",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_acueducto,
            callback_f: () => this.validarAcueducto(),
            seleccion: this.DETALLE_HISTORIA.joven8051.vivienda.alcantarillado,
            teclaAlterna: true,
            id_input: "#validarAlcantarillado",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.vivienda.alcantarillado = data.COD;

            _this.validarEnergiaElectrica();
          }
        );
      }, 300);
    },
    validarEnergiaElectrica() {
      validarInputs(
        {
          form: "#validarEnergiaElectrica",
          orden: "1",
        },
        () => this.validarAlcantarillado(),
        () => {
          this.DETALLE_HISTORIA.joven8051.vivienda.electricidad =
            this.DETALLE_HISTORIA.joven8051.vivienda.electricidad.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarHacinamiento();
        }
      );
    },
    validarHacinamiento() {
      validarInputs(
        {
          form: "#validarHacinamiento",
          orden: "1",
        },
        () => this.validarEnergiaElectrica(),
        () => {
          this.DETALLE_HISTORIA.joven8051.vivienda.hacinamiento =
            this.DETALLE_HISTORIA.joven8051.vivienda.hacinamiento.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarGasDomiciliario();
        }
      );
    },
    validarGasDomiciliario() {
      validarInputs(
        {
          form: "#validarGasDomiciliario",
          orden: "1",
        },
        () => this.validarHacinamiento(),
        () => {
          this.DETALLE_HISTORIA.joven8051.vivienda.gas_domicilia =
            this.DETALLE_HISTORIA.joven8051.vivienda.gas_domicilia.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarInternet();
        }
      );
    },
    validarInternet() {
      validarInputs(
        {
          form: "#validarInternet",
          orden: "1",
        },
        () => this.validarGasDomiciliario(),
        () => {
          this.DETALLE_HISTORIA.joven8051.vivienda.internet =
            this.DETALLE_HISTORIA.joven8051.vivienda.internet.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarObservVivienda();
        }
      );
    },
    validarObservVivienda() {
      validarInputs(
        {
          form: "#validarObservVivienda",
          orden: "1",
        },
        () => this.validarInternet(),
        () => {
          this.DETALLE_HISTORIA.joven8051.vivienda.observacion_vivienda =
            this.DETALLE_HISTORIA.joven8051.vivienda.observacion_vivienda.replaceEsp();

          this.guardarDetalle8051(this.validarObservVivienda, () => {
            CON851("", "Vivienda guardada", null, "success", "Correcto");
            $("#focoTarjetaTrabajo").get(0).scrollIntoView({ behavior: "smooth", block: "center" });
            this.validarActividadTrabajo();
          });
        }
      );
    },
    validarActividadTrabajo() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Actividad",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_actividades,
            callback_f: () => this.validarObservVivienda(),
            seleccion: this.DETALLE_HISTORIA.joven8051.trabajo.actividad,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.trabajo.actividad = data.COD;

            switch (_this.DETALLE_HISTORIA.joven8051.trabajo.actividad) {
              case "1":
              case "4":
                _this.validarTipoTrabajo();
                break;
              default:
                _this.DETALLE_HISTORIA.joven8051.trabajo.tipo_trabajo = "";
                _this.DETALLE_HISTORIA.joven8051.trabajo.horario_trabajo = "";
                _this.DETALLE_HISTORIA.joven8051.trabajo.razon_trabajo = "";
                _this.DETALLE_HISTORIA.joven8051.trabajo.trabajo_legalizado = "";
                _this.DETALLE_HISTORIA.joven8051.trabajo.trabajo_insalubre = "";
                _this.DETALLE_HISTORIA.joven8051.trabajo.edad_inicio_trabajo = "";
                _this.validarObservTrabajo();
                break;
            }
          }
        );
      }, 300);
    },
    validarTipoTrabajo() {
      validarInputs(
        {
          form: "#validarTipoTrabajo",
          orden: "1",
        },
        () => this.validarActividadTrabajo(),
        () => {
          this.DETALLE_HISTORIA.joven8051.trabajo.tipo_trabajo = this.DETALLE_HISTORIA.joven8051.trabajo.tipo_trabajo
            .toUpperCase()
            .trim();

          this.validarHorarioTrabajo();
        }
      );
    },
    validarHorarioTrabajo() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Horario trabajo",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_horario_trabajo,
            callback_f: () => this.validarTipoTrabajo(),
            seleccion: this.DETALLE_HISTORIA.joven8051.trabajo.horario_trabajo,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.trabajo.horario_trabajo = data.COD;

            _this.validarRazonTrabajo();
          }
        );
      }, 300);
    },
    validarRazonTrabajo() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Razón trabajo",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_razon_trabajo,
            callback_f: () => this.validarHorarioTrabajo(),
            seleccion: this.DETALLE_HISTORIA.joven8051.trabajo.razon_trabajo,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.trabajo.razon_trabajo = data.COD;

            _this.validarLegalizado();
          }
        );
      }, 300);
    },
    validarLegalizado() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Legalizado",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_noaplica,
            callback_f: () => this.validarRazonTrabajo(),
            seleccion: this.DETALLE_HISTORIA.joven8051.trabajo.trabajo_legalizado,
            teclaAlterna: true,
            id_input: "#validarLegalizado",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.trabajo.trabajo_legalizado = data.COD;

            _this.validarInsalubre();
          }
        );
      }, 300);
    },
    validarInsalubre() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Insalubre",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_si_no_noaplica,
            callback_f: () => this.validarLegalizado(),
            seleccion: this.DETALLE_HISTORIA.joven8051.trabajo.trabajo_insalubre,
            teclaAlterna: true,
            id_input: "#validarInsalubre",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.trabajo.trabajo_insalubre = data.COD;

            _this.validarEdadInicioTrabajo();
          }
        );
      }, 300);
    },
    validarEdadInicioTrabajo() {
      validarInputs(
        {
          form: "#validarEdadInicioTrabajo",
          orden: "1",
        },
        () => this.validarInsalubre(),
        () => {
          this.DETALLE_HISTORIA.joven8051.trabajo.edad_inicio_trabajo = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.trabajo.edad_inicio_trabajo)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.trabajo.edad_inicio_trabajo).toString();

          this.validarObservTrabajo();
        }
      );
    },
    validarObservTrabajo() {
      validarInputs(
        {
          form: "#validarObservTrabajo",
          orden: "1",
        },
        () => {
          switch (this.DETALLE_HISTORIA.joven8051.trabajo.actividad) {
            case "1":
            case "4":
              this.validarEdadInicioTrabajo();
              break;
            default:
              this.validarActividadTrabajo();
              break;
          }
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.trabajo.observ_trabajo =
            this.DETALLE_HISTORIA.joven8051.trabajo.observ_trabajo.replaceEsp();

          this.guardarDetalle8051(this.validarObservTrabajo, () => {
            CON851("", "Trabajo guardado", null, "success", "Correcto");
            this.validarAceptacionSocial();
          });
        }
      );
    },
    validarAceptacionSocial() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Aceptación social",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_aceptacion_social,
            callback_f: () => this.validarObservTrabajo(),
            seleccion: this.DETALLE_HISTORIA.joven8051.vida_social.aceptacion,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.vida_social.aceptacion = data.COD;

            _this.validarTienePareja();
          }
        );
      }, 300);
    },
    validarTienePareja() {
      validarInputs(
        {
          form: "#validarTienePareja",
          orden: "1",
        },
        () => this.validarAceptacionSocial(),
        () => {
          this.DETALLE_HISTORIA.joven8051.vida_social.tiene_pareja =
            this.DETALLE_HISTORIA.joven8051.vida_social.tiene_pareja.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.joven8051.vida_social.tiene_pareja == "S") this.validarEdadPareja();
          else {
            this.DETALLE_HISTORIA.joven8051.vida_social.edad_pareja = "";
            this.DETALLE_HISTORIA.joven8051.vida_social.violencia_pareja = "";
            this.validarAmigos();
          }
        }
      );
    },
    validarEdadPareja() {
      validarInputs(
        {
          form: "#validarEdadPareja",
          orden: "1",
        },
        () => this.validarTienePareja(),
        () => {
          this.DETALLE_HISTORIA.joven8051.vida_social.edad_pareja = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.vida_social.edad_pareja)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.vida_social.edad_pareja).toString();

          this.validarViolenciaRelacion();
        }
      );
    },
    validarViolenciaRelacion() {
      validarInputs(
        {
          form: "#validarViolenciaPareja",
          orden: "1",
        },
        () => this.validarEdadPareja(),
        () => {
          this.DETALLE_HISTORIA.joven8051.vida_social.violencia_pareja =
            this.DETALLE_HISTORIA.joven8051.vida_social.violencia_pareja.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarAmigos();
        }
      );
    },
    validarAmigos() {
      validarInputs(
        {
          form: "#validarAmigos",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.joven8051.vida_social.tiene_pareja == "S") this.validarViolenciaRelacion();
          else this.validarTienePareja();
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.vida_social.amigos =
            this.DETALLE_HISTORIA.joven8051.vida_social.amigos.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarHorasActividadFisica();
        }
      );
    },
    validarHorasActividadFisica() {
      validarInputs(
        {
          form: "#validarHorasActividadFisica",
          orden: "1",
        },
        () => this.validarAmigos(),
        () => {
          this.DETALLE_HISTORIA.joven8051.vida_social.horas_act_fisica = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.vida_social.horas_act_fisica)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.vida_social.horas_act_fisica).toString();

          this.validarHorasTelevision();
        }
      );
    },
    validarHorasTelevision() {
      validarInputs(
        {
          form: "#validarHorasTelevision",
          orden: "1",
        },
        () => this.validarHorasActividadFisica(),
        () => {
          this.DETALLE_HISTORIA.joven8051.vida_social.horas_tv_dia = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.vida_social.horas_tv_dia)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.vida_social.horas_tv_dia).toString();

          this.validarHorasComputador();
        }
      );
    },
    validarHorasComputador() {
      validarInputs(
        {
          form: "#validarHorasComputador",
          orden: "1",
        },
        () => this.validarHorasTelevision(),
        () => {
          this.DETALLE_HISTORIA.joven8051.vida_social.horas_pc_dia = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.vida_social.horas_pc_dia)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.vida_social.horas_pc_dia).toString();

          this.validarHorasJuegos();
        }
      );
    },
    validarHorasJuegos() {
      validarInputs(
        {
          form: "#validarHorasJuegos",
          orden: "1",
        },
        () => this.validarHorasComputador(),
        () => {
          this.DETALLE_HISTORIA.joven8051.vida_social.horas_videojuegos_dia = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.vida_social.horas_videojuegos_dia)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.vida_social.horas_videojuegos_dia).toString();

          this.validarOtrasActividades();
        }
      );
    },
    validarOtrasActividades() {
      validarInputs(
        {
          form: "#validarOtrasActividades",
          orden: "1",
        },
        () => this.validarHorasJuegos(),
        () => {
          this.DETALLE_HISTORIA.joven8051.vida_social.otras_actividades =
            this.DETALLE_HISTORIA.joven8051.vida_social.otras_actividades.toUpperCase().trim();

          this.validarObservVidaSocial();
        }
      );
    },
    validarObservVidaSocial() {
      validarInputs(
        {
          form: "#validarObservVidaSocial",
          orden: "1",
        },
        () => this.validarOtrasActividades(),
        () => {
          this.DETALLE_HISTORIA.joven8051.vida_social.observaciones_social =
            this.DETALLE_HISTORIA.joven8051.vida_social.observaciones_social.replaceEsp();

          this.guardarDetalle8051(this.validarObservVidaSocial, () => {
            CON851("", "Vida social guardada", null, "success", "Correcto");
            this.validarSuenoNormal();
          });
        }
      );
    },
    validarSuenoNormal() {
      validarInputs(
        {
          form: "#validarSuenoNormal",
          orden: "1",
        },
        () => this.validarObservVidaSocial(),
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.sueno_normal =
            this.DETALLE_HISTORIA.joven8051.habitos_consumo.sueno_normal.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarHorasSueno();
        }
      );
    },
    validarHorasSueno() {
      validarInputs(
        {
          form: "#validarHorasSueno",
          orden: "1",
        },
        () => this.validarSuenoNormal(),
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.sueno_horas = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.habitos_consumo.sueno_horas)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.habitos_consumo.sueno_horas).toString();

          this.validarAlimentacionAdecuada();
        }
      );
    },
    validarAlimentacionAdecuada() {
      validarInputs(
        {
          form: "#validarAlimentacionAdecuada",
          orden: "1",
        },
        () => this.validarHorasSueno(),
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.alimenta_adecuada =
            this.DETALLE_HISTORIA.joven8051.habitos_consumo.alimenta_adecuada.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarComidasDia();
        }
      );
    },
    validarComidasDia() {
      validarInputs(
        {
          form: "#validarComidasDia",
          orden: "1",
        },
        () => this.validarAlimentacionAdecuada(),
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.comidas_dia = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.habitos_consumo.comidas_dia)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.habitos_consumo.comidas_dia).toString();

          this.validarComidasDiaFamilia();
        }
      );
    },
    validarComidasDiaFamilia() {
      validarInputs(
        {
          form: "#validarComidasDiaFamilia",
          orden: "1",
        },
        () => this.validarComidasDia(),
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.comidas_familia = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.habitos_consumo.comidas_familia)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.habitos_consumo.comidas_familia).toString();

          if (
            parseInt(this.DETALLE_HISTORIA.joven8051.habitos_consumo.comidas_familia) >
            parseInt(this.DETALLE_HISTORIA.joven8051.habitos_consumo.comidas_dia)
          ) {
            CON851("", "Mayor a número de comidas diarias", null, "error", "Error");
            this.validarComidasDiaFamilia();
          } else this.validarTabaco();
        }
      );
    },
    validarTabaco() {
      validarInputs(
        {
          form: "#validarTabaco",
          orden: "1",
        },
        () => this.validarComidasDiaFamilia(),
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.tabaco =
            this.DETALLE_HISTORIA.joven8051.habitos_consumo.tabaco.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.joven8051.habitos_consumo.tabaco == "S") this.validarDejarFumar();
          else {
            this.global_HC8051.signos.dejar_fumar = "";
            this.DETALLE_HISTORIA.joven8051.habitos_consumo.tabaco_edad_inicio = "";
            this.DETALLE_HISTORIA.joven8051.habitos_consumo.nro_ciga_dia = "";
            this.validarAlcoholFrecuente();
          }
        }
      );
    },
    validarDejarFumar() {
      validarInputs(
        {
          form: "#validarDejarFumar",
          orden: "1",
        },
        () => this.validarTabaco(),
        () => {
          this.global_HC8051.signos.dejar_fumar =
            this.global_HC8051.signos.dejar_fumar.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.global_HC8051.signos.dejar_fumar == "S") this.validarTelefonoPaci();
          else this.validarEdadInicioTabaco();
        }
      );
    },
    validarTelefonoPaci() {
      validarInputs(
        {
          form: "#validarTelefonoPaci",
          orden: "1",
        },
        () => this.validarDejarFumar(),
        () => {
          this.datos_ext.telefono_paci = this.datos_ext.telefono_paci.trim();
          this.validarDireccionPaci();
        }
      );
    },
    validarDireccionPaci() {
      validarInputs(
        {
          form: "#validarDireccionPaci",
          orden: "1",
        },
        () => this.validarTelefonoPaci(),
        () => {
          this.datos_ext.direccion_paci = this.datos_ext.direccion_paci.trim();
          this.validarEdadInicioTabaco();
        }
      );
    },
    validarEdadInicioTabaco() {
      validarInputs(
        {
          form: "#validarEdadInicioTabaco",
          orden: "1",
        },
        () => {
          if (this.global_HC8051.signos.dejar_fumar == "S") this.validarDireccionPaci();
          else this.validarDejarFumar();
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.tabaco_edad_inicio = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.habitos_consumo.tabaco_edad_inicio)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.habitos_consumo.tabaco_edad_inicio).toString();

          this.validarCigarrillosDia();
        }
      );
    },
    validarCigarrillosDia() {
      validarInputs(
        {
          form: "#validarCigarrillosDia",
          orden: "1",
        },
        () => this.validarEdadInicioTabaco(),
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.nro_ciga_dia = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.habitos_consumo.nro_ciga_dia)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.habitos_consumo.nro_ciga_dia).toString();

          this.validarAlcoholFrecuente();
        }
      );
    },
    validarAlcoholFrecuente() {
      validarInputs(
        {
          form: "#validarAlcoholFrecuente",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.joven8051.habitos_consumo.tabaco == "S") this.validarCigarrillosDia();
          else this.validarTabaco();
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.alcohol =
            this.DETALLE_HISTORIA.joven8051.habitos_consumo.alcohol.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarEdadInicioAlcohol();
        }
      );
    },
    validarEdadInicioAlcohol() {
      validarInputs(
        {
          form: "#validarEdadInicioAlcohol",
          orden: "1",
        },
        () => this.validarAlcoholFrecuente(),
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.alcohol_edad_inicio = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.habitos_consumo.alcohol_edad_inicio)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.habitos_consumo.alcohol_edad_inicio).toString();

          this.validarAbusoAlcohol();
        }
      );
    },
    validarAbusoAlcohol() {
      validarInputs(
        {
          form: "#validarAbusoAlcohol",
          orden: "1",
        },
        () => this.validarEdadInicioAlcohol(),
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.alcohol_abuso =
            this.DETALLE_HISTORIA.joven8051.habitos_consumo.alcohol_abuso.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarOtrasSustancias();
        }
      );
    },
    validarOtrasSustancias() {
      validarInputs(
        {
          form: "#validarOtrasSustancias",
          orden: "1",
        },
        () => this.validarAbusoAlcohol(),
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.otras_sustancias =
            this.DETALLE_HISTORIA.joven8051.habitos_consumo.otras_sustancias.trim();

          if (this.DETALLE_HISTORIA.joven8051.habitos_consumo.otras_sustancias.trim() == "") {
            this.DETALLE_HISTORIA.joven8051.habitos_consumo.edad_inicio_sust = "";
            this.DETALLE_HISTORIA.joven8051.habitos_consumo.repercucion_sust = "";
            this.validarConduceVehiculo();
          } else {
            this.validarEdadInicioSustancias();
          }
        }
      );
    },
    validarEdadInicioSustancias() {
      validarInputs(
        {
          form: "#validarEdadInicioSustancias",
          orden: "1",
        },
        () => this.validarOtrasSustancias(),
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.edad_inicio_sust = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.habitos_consumo.edad_inicio_sust)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.habitos_consumo.edad_inicio_sust).toString();

          this.validarRepercusiones();
        }
      );
    },
    validarRepercusiones() {
      validarInputs(
        {
          form: "#validarRepercusiones",
          orden: "1",
        },
        () => this.validarEdadInicioSustancias(),
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.repercucion_sust =
            this.DETALLE_HISTORIA.joven8051.habitos_consumo.repercucion_sust.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarConduceVehiculo();
        }
      );
    },
    validarConduceVehiculo() {
      validarInputs(
        {
          form: "#validarConduceVehiculo",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.joven8051.habitos_consumo.otras_sustancias.trim() == "")
            this.validarOtrasSustancias();
          else this.validarRepercusiones();
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.conduce_vehiculo =
            this.DETALLE_HISTORIA.joven8051.habitos_consumo.conduce_vehiculo.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.joven8051.habitos_consumo.conduce_vehiculo == "S") this.validarCualVehiculo();
          else {
            this.DETALLE_HISTORIA.joven8051.habitos_consumo.cual_vehiculo = "";
            this.validarSeguridadVial();
          }
        }
      );
    },
    validarCualVehiculo() {
      validarInputs(
        {
          form: "#validarCualVehiculo",
          orden: "1",
        },
        () => this.validarConduceVehiculo(),
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.cual_vehiculo =
            this.DETALLE_HISTORIA.joven8051.habitos_consumo.cual_vehiculo.trim();

          this.validarSeguridadVial();
        }
      );
    },
    validarSeguridadVial() {
      validarInputs(
        {
          form: "#validarSeguridadVial",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.joven8051.habitos_consumo.conduce_vehiculo == "S") this.validarCualVehiculo();
          else this.validarConduceVehiculo();
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.seguridad_val =
            this.DETALLE_HISTORIA.joven8051.habitos_consumo.seguridad_val.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarObservHabitos();
        }
      );
    },
    validarObservHabitos() {
      validarInputs(
        {
          form: "#validarObservHabitos",
          orden: "1",
        },
        () => this.validarSeguridadVial(),
        () => {
          this.DETALLE_HISTORIA.joven8051.habitos_consumo.observ_hab_cons =
            this.DETALLE_HISTORIA.joven8051.habitos_consumo.observ_hab_cons.replaceEsp();

          this.guardarDetalle8051(this.validarObservHabitos, () => {
            CON851("", "Habitos guardados", null, "success", "Correcto");
            this.validarMenarcaEspermarca();
          });
        }
      );
    },
    validarMenarcaEspermarca() {
      validarInputs(
        {
          form: "#validarMenarcaEspermarca",
          orden: "1",
        },
        () => this.validarObservHabitos(),
        () => {
          this.DETALLE_HISTORIA.joven8051.gineco_urologico.menar_espermar = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.gineco_urologico.menar_espermar)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.gineco_urologico.menar_espermar).toString();

          this.validarFlujoSecrecion();
        }
      );
    },
    validarFlujoSecrecion() {
      validarInputs(
        {
          form: "#validarFlujoSecrecion",
          orden: "1",
        },
        () => this.validarMenarcaEspermarca(),
        () => {
          this.DETALLE_HISTORIA.joven8051.gineco_urologico.flujo_secrecion =
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.flujo_secrecion.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.datos_paciente.SEXO == "M") this.validarVIH();
          else if (parseInt(this.DETALLE_HISTORIA.joven8051.gineco_urologico.menar_espermar) == 0) {
            this.fechas.ultima_menstruacion.ano = "";
            this.fechas.ultima_menstruacion.mes = "";
            this.fechas.ultima_menstruacion.dia = "";
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.fecha_ult_mens = "";
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.ciclos_regulares = "";
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.dismenorrea = "";
            this.validarCitologia();
          } else this.validarAnoUltMens();
        }
      );
    },
    validarAnoUltMens() {
      validarInputs(
        {
          form: "#validarAnoUltMens",
          orden: "1",
        },
        () => this.validarFlujoSecrecion(),
        () => {
          let ano_actual = parseInt(moment().format("YYYY"));
          let ano = parseInt(this.fechas.ultima_menstruacion.ano) || 0;

          if (ano < 2000) {
            CON851("37", "37", null, "error", "Error");
            this.validarAnoUltMens();
          } else if (ano > ano_actual) {
            CON851("", "Año mayor al actual", null, "error", "Error");
            this.validarAnoUltMens();
          } else this.validarMesUltMens();
        }
      );
    },
    validarMesUltMens() {
      validarInputs(
        {
          form: "#validarMesUltMens",
          orden: "1",
        },
        () => this.validarAnoUltMens(),
        () => {
          let ano_actual = parseInt(moment().format("YYYY"));
          let mes_actual = parseInt(moment().format("MM"));
          let ano = parseInt(this.fechas.ultima_menstruacion.ano) || 0;
          let mes = parseInt(this.fechas.ultima_menstruacion.mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "37", null, "error", "Error");
            this.validarMesUltMens();
          } else if (ano == ano_actual && mes > mes_actual) {
            CON851("", "Mes mayor al actual", null, "error", "Error");
            this.validarMesUltMens();
          } else this.validarDiaUltMens();
        }
      );
    },
    validarDiaUltMens() {
      validarInputs(
        {
          form: "#validarDiaUltMens",
          orden: "1",
        },
        () => this.validarMesUltMens(),
        () => {
          let ano_actual = parseInt(moment().format("YYYY"));
          let mes_actual = parseInt(moment().format("MM"));
          let dia_actual = parseInt(moment().format("DD"));
          let ano = this.fechas.ultima_menstruacion.ano;
          let mes = this.fechas.ultima_menstruacion.mes;
          let dia = this.fechas.ultima_menstruacion.dia;

          if (!_validarFecha(ano, mes, dia)) {
            CON851("37", "37", null, "error", "Error");
            this.validarDiaUltMens();
          } else if (parseInt(ano) == ano_actual && parseInt(mes) == mes_actual && parseInt(dia) > dia_actual) {
            CON851("", "Día mayor al actual", null, "error", "Error");
            this.validarDiaUltMens();
          } else {
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.fecha_ult_mens =
              this.fechas.ultima_menstruacion.ano +
              this.fechas.ultima_menstruacion.mes.padStart(2, "0") +
              this.fechas.ultima_menstruacion.dia.padStart(2, "0");
            console.log(this.DETALLE_HISTORIA.joven8051.gineco_urologico.fecha_ult_mens);
            this.validarCiclosRegulares();
          }
        }
      );
    },
    validarCiclosRegulares() {
      validarInputs(
        {
          form: "#validarCiclosRegulares",
          orden: "1",
        },
        () => this.validarDiaUltMens(),
        () => {
          this.DETALLE_HISTORIA.joven8051.gineco_urologico.ciclos_regulares =
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.ciclos_regulares.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarDismenorrea();
        }
      );
    },
    validarDismenorrea() {
      validarInputs(
        {
          form: "#validarDismenorrea",
          orden: "1",
        },
        () => this.validarCiclosRegulares(),
        () => {
          this.DETALLE_HISTORIA.joven8051.gineco_urologico.dismenorrea =
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.dismenorrea.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarCitologia();
        }
      );
    },
    validarCitologia() {
      validarInputs(
        {
          form: "#validarCitologia",
          orden: "1",
        },
        () => {
          if (parseInt(this.DETALLE_HISTORIA.joven8051.gineco_urologico.menar_espermar) == 0)
            this.validarFlujoSecrecion();
          else this.validarDismenorrea();
        },
        () => {
          this.global_HC8051.signos.citologia_previa =
            this.global_HC8051.signos.citologia_previa.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.global_HC8051.signos.citologia_previa == "S") this.validarAnoCitologia();
          else {
            this.fechas.citologia.ano = "";
            this.fechas.citologia.mes = "";
            this.fechas.citologia.dia = "";
            this.global_HC8051.fecha_cito_previa = "";
            this.global_HC8051.signos.resul_cito_previa = "";
            this.validarVIH();
          }
        }
      );
    },
    validarAnoCitologia() {
      validarInputs(
        {
          form: "#validarAnoCitologia",
          orden: "1",
        },
        () => this.validarCitologia(),
        () => {
          let ano_actual = parseInt(moment().format("YYYY"));
          let ano = parseInt(this.fechas.citologia.ano) || 0;

          if (ano < 2000) {
            CON851("37", "37", null, "error", "Error");
            this.validarAnoCitologia();
          } else if (ano > ano_actual) {
            CON851("", "Año mayor al actual", null, "error", "Error");
            this.validarAnoCitologia();
          } else this.validarMesCitologia();
        }
      );
    },
    validarMesCitologia() {
      validarInputs(
        {
          form: "#validarMesCitologia",
          orden: "1",
        },
        () => this.validarAnoCitologia(),
        () => {
          let mes = parseInt(this.fechas.citologia.mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "37", null, "error", "Error");
            this.validarMesCitologia();
          } else this.validarDiaCitologia();
        }
      );
    },
    validarDiaCitologia() {
      validarInputs(
        {
          form: "#validarDiaCitologia",
          orden: "1",
        },
        () => this.validarMesCitologia(),
        () => {
          let dia = parseInt(this.fechas.citologia.dia) || 0;

          if (dia < 1 || dia > 31) {
            CON851("37", "37", null, "error", "Error");
            this.validarDiaCitologia();
          } else {
            this.global_HC8051.signos.fecha_cito_previa =
              this.fechas.citologia.ano +
              this.fechas.citologia.mes.padStart(2, "0") +
              this.fechas.citologia.dia.padStart(2, "0");
            console.log(this.global_HC8051.signos.fecha_cito_previa);
            this.validarResultadoCitologia();
          }
        }
      );
    },
    validarResultadoCitologia() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Resultado citologia",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_resultado_citologia,
            callback_f: () => this.validarDiaCitologia(),
            seleccion: this.global_HC8051.signos.resul_cito_previa,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_HC8051.signos.resul_cito_previa = data.COD;

            _this.validarVIH();
          }
        );
      }, 300);
    },
    validarVIH() {
      validarInputs(
        {
          form: "#validarVIH",
          orden: "1",
        },
        () => {
          if (this.datos_paciente.SEXO == "M") this.validarFlujoSecrecion();
          else if (this.global_HC8051.signos.citologia_previa == "S") this.validarResultadoCitologia();
          else this.validarCitologia();
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.gineco_urologico.vih =
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.vih.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.joven8051.gineco_urologico.vih == "S") this.validarTratamientoVIH();
          else {
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.vih_tratamiento = "";
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.vih_busq_contac = "";
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.vih_trata_contac = "";
            this.validarITS();
          }
        }
      );
    },
    validarTratamientoVIH() {
      validarInputs(
        {
          form: "#validarTratamientoVIH",
          orden: "1",
        },
        () => this.validarVIH(),
        () => {
          this.DETALLE_HISTORIA.joven8051.gineco_urologico.vih_tratamiento =
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.vih_tratamiento.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarBusqContactosVIH();
        }
      );
    },
    validarBusqContactosVIH() {
      validarInputs(
        {
          form: "#validarBusqContactosVIH",
          orden: "1",
        },
        () => this.validarTratamientoVIH(),
        () => {
          this.DETALLE_HISTORIA.joven8051.gineco_urologico.vih_busq_contac =
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.vih_busq_contac.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarTrataContactosVIH();
        }
      );
    },
    validarTrataContactosVIH() {
      validarInputs(
        {
          form: "#validarTrataContactosVIH",
          orden: "1",
        },
        () => this.validarBusqContactosVIH(),
        () => {
          this.DETALLE_HISTORIA.joven8051.gineco_urologico.vih_trata_contac =
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.vih_trata_contac.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarITS();
        }
      );
    },
    validarITS() {
      validarInputs(
        {
          form: "#validarITS",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.joven8051.gineco_urologico.vih == "S") this.validarTrataContactosVIH();
          else this.validarVIH();
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.gineco_urologico.gine_its =
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.gine_its.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.joven8051.gineco_urologico.gine_its == "S") this.validarCualITS();
          else {
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.its_cual = "";
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.its_tratamiento = "";
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.its_busq_contac = "";
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.its_trata_contac = "";

            if (this.capturarEmbarazo) this.validarEmbarazos();
            else this.validarObservGineco();
          }
        }
      );
    },
    validarCualITS() {
      validarInputs(
        {
          form: "#validarCualITS",
          orden: "1",
        },
        () => this.validarITS(),
        () => {
          this.DETALLE_HISTORIA.joven8051.gineco_urologico.its_cual =
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.its_cual.trim();

          this.validarTratamientoITS();
        }
      );
    },
    validarTratamientoITS() {
      validarInputs(
        {
          form: "#validarTratamientoITS",
          orden: "1",
        },
        () => this.validarCualITS(),
        () => {
          this.DETALLE_HISTORIA.joven8051.gineco_urologico.its_tratamiento =
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.its_tratamiento.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarBusqContactosITS();
        }
      );
    },
    validarBusqContactosITS() {
      validarInputs(
        {
          form: "#validarBusqContactosITS",
          orden: "1",
        },
        () => this.validarTratamientoITS(),
        () => {
          this.DETALLE_HISTORIA.joven8051.gineco_urologico.its_busq_contac =
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.its_busq_contac.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarTrataContactosITS();
        }
      );
    },
    validarTrataContactosITS() {
      validarInputs(
        {
          form: "#validarTrataContactosITS",
          orden: "1",
        },
        () => this.validarBusqContactosITS(),
        () => {
          this.DETALLE_HISTORIA.joven8051.gineco_urologico.its_trata_contac =
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.its_trata_contac.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.capturarEmbarazo) this.validarEmbarazos();
          else this.validarObservGineco();
        }
      );
    },
    validarEmbarazos() {
      validarInputs(
        {
          form: "#validarEmbarazos",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.joven8051.gineco_urologico.gine_its == "S") this.validarTrataContactosITS();
          else this.validarITS();
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.gineco_urologico.embarazos = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.gineco_urologico.embarazos)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.gineco_urologico.embarazos).toString();

          if (parseInt(this.DETALLE_HISTORIA.joven8051.gineco_urologico.embarazos) > 0) this.validarHijos();
          else {
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.hijos = "";
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.gine_abortos = "";
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.edad_1er_embar = "";
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.termino_1er_embar = "";
            this.validarObservGineco();
          }
        }
      );
    },
    validarHijos() {
      validarInputs(
        {
          form: "#validarHijos",
          orden: "1",
        },
        () => this.validarEmbarazos(),
        () => {
          let hijos = parseInt(this.DETALLE_HISTORIA.joven8051.gineco_urologico.hijos);
          this.DETALLE_HISTORIA.joven8051.gineco_urologico.hijos = isNaN(hijos) ? "00" : hijos.toString();

          if (hijos > parseInt(this.DETALLE_HISTORIA.joven8051.gineco_urologico.embarazos)) {
            CON851("", "Dato mayor a embarazos !", null, "error", "Error");
            this.validarHijos();
          } else {
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.gine_abortos =
              parseInt(this.DETALLE_HISTORIA.joven8051.gineco_urologico.embarazos) - hijos;
            this.validarEdadPrimerEmbarazo();
          }
        }
      );
    },
    validarEdadPrimerEmbarazo() {
      validarInputs(
        {
          form: "#validarEdadPrimerEmbarazo",
          orden: "1",
        },
        () => this.validarHijos(),
        () => {
          let edad = parseInt(this.DETALLE_HISTORIA.joven8051.gineco_urologico.edad_1er_embar);
          this.DETALLE_HISTORIA.joven8051.gineco_urologico.edad_1er_embar = isNaN(edad) ? "00" : edad.toString();

          if (parseInt(this.DETALLE_HISTORIA.joven8051.gineco_urologico.edad_1er_embar) == 0) {
            CON851("03", "03", null, "error", "Error");
            this.validarEdadPrimerEmbarazo();
          } else this.validarPrimerEmbarazo();
        }
      );
    },
    validarPrimerEmbarazo() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Como terminó primer embarazo ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_termino_embarazo,
            callback_f: () => this.validarEdadPrimerAborto(),
            seleccion: this.DETALLE_HISTORIA.joven8051.gineco_urologico.termino_1er_embar,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.gineco_urologico.termino_1er_embar = data.COD;

            _this.validarObservGineco();
          }
        );
      }, 300);
    },
    validarObservGineco() {
      validarInputs(
        {
          form: "#validarObservGineco",
          orden: "1",
        },
        () => {
          if (this.capturarEmbarazo) {
            if (parseInt(this.DETALLE_HISTORIA.joven8051.gineco_urologico.embarazos) > 0) this.validarPrimerEmbarazo();
            else this.validarEmbarazos();
          } else if (this.DETALLE_HISTORIA.joven8051.gineco_urologico.gine_its == "S") this.validarTrataContactosITS();
          else this.validarITS();
        },
        () => {
          this.DETALLE_HISTORIA.joven8051.gineco_urologico.observaciones_gine_uro =
            this.DETALLE_HISTORIA.joven8051.gineco_urologico.observaciones_gine_uro.replaceEsp();

          this.guardarDetalle8051(this.validarObservGineco, () => {
            CON851("", "Gineco urologico guardado", null, "success", "Correcto");
            this.validarRelacionesSexuales();
          });
        }
      );
    },
    validarRelacionesSexuales() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Relación sexual con",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_orientacion,
            callback_f: () => this.validarObservGineco(),
            seleccion: this.DETALLE_HISTORIA.joven8051.sexualidad.relaciones_sex,
            teclaAlterna: true,
            id_input: "#validarOrientacionSexual",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.sexualidad.relaciones_sex = data.COD;

            if (_this.DETALLE_HISTORIA.joven8051.sexualidad.relaciones_sex == "1") {
              _this.DETALLE_HISTORIA.joven8051.sexualidad.pareja_sex = "";
              _this.DETALLE_HISTORIA.joven8051.sexualidad.edad_inicio_sex = "";
              _this.DETALLE_HISTORIA.joven8051.sexualidad.inicio_sex_coercion = "";
              _this.DETALLE_HISTORIA.joven8051.sexualidad.dificultad_rel_sex = "";
              this.params_hc890i.estado = true;
            } else _this.validarParejaSexual();
          }
        );
      }, 300);
    },
    validarParejaSexual() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Pareja sexual ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_pareja_sexual,
            callback_f: () => this.validarRelacionesSexuales(),
            seleccion: this.DETALLE_HISTORIA.joven8051.sexualidad.pareja_sex,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.sexualidad.pareja_sex = data.COD;

            _this.validarEdadInicioSex();
          }
        );
      }, 300);
    },
    validarEdadInicioSex() {
      validarInputs(
        {
          form: "#validarEdadInicioSex",
          orden: "1",
        },
        () => this.validarParejaSexual(),
        () => {
          this.DETALLE_HISTORIA.joven8051.sexualidad.edad_inicio_sex = isNaN(
            parseInt(this.DETALLE_HISTORIA.joven8051.sexualidad.edad_inicio_sex)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.joven8051.sexualidad.edad_inicio_sex).toString();

          this.validarCoercion();
        }
      );
    },
    validarCoercion() {
      validarInputs(
        {
          form: "#validarCoercion",
          orden: "1",
        },
        () => this.validarEdadInicioSex(),
        () => {
          this.DETALLE_HISTORIA.joven8051.sexualidad.inicio_sex_coercion =
            this.DETALLE_HISTORIA.joven8051.sexualidad.inicio_sex_coercion.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarDificultadesSex();
        }
      );
    },
    validarDificultadesSex() {
      validarInputs(
        {
          form: "#validarDificultadesSex",
          orden: "1",
        },
        () => this.validarCoercion(),
        () => {
          this.DETALLE_HISTORIA.joven8051.sexualidad.dificultad_rel_sex =
            this.DETALLE_HISTORIA.joven8051.sexualidad.dificultad_rel_sex.toUpperCase().trim() != "S" ? "N" : "S";

          this.params_hc890i.estado = true;
        }
      );
    },
    EscSifilis() {
      this.params_hc890i.estado = false;
      if (this.DETALLE_HISTORIA.joven8051.sexualidad.relaciones_sex == "1") this.validarRelacionesSexuales();
      else this.validarDificultadesSex();
    },
    recibirSifilis(signos) {
      this.params_hc890i.estado = false;
      this.global_HC8051.signos = signos;
      this.validarMetodoAnticonceptivo();
    },
    validarMetodoAnticonceptivo() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Método anticonceptivo",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_anticonceptivo,
            callback_f: () => (this.params_hc890i.estado = true),
            seleccion: this.global_HC8051.planific,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_HC8051.planific = data.COD;

            if (_this.datos_paciente.SEXO == "M") {
              switch (_this.global_HC8051.planific) {
                case "3":
                case "4":
                case "5":
                case "G":
                case "H":
                case "I":
                case "J":
                case "K":
                case "L":
                  _this.validarConsejeria();
                  break;
                default:
                  CON851("73", "73", null, "error", "Error");
                  _this.validarMetodoAnticonceptivo();
                  break;
              }
            } else _this.validarConsejeria();
          }
        );
      }, 300);
    },
    validarConsejeria() {
      validarInputs(
        {
          form: "#validarConsejeria",
          orden: "1",
        },
        () => this.validarMetodoAnticonceptivo(),
        () => {
          this.DETALLE_HISTORIA.joven8051.sexualidad.consejeria_sex =
            this.DETALLE_HISTORIA.joven8051.sexualidad.consejeria_sex.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarUsoCorrecto();
        }
      );
    },
    validarUsoCorrecto() {
      validarInputs(
        {
          form: "#validarUsoCorrecto",
          orden: "1",
        },
        () => this.validarConsejeria(),
        () => {
          this.DETALLE_HISTORIA.joven8051.sexualidad.uso_correcto_sex =
            this.DETALLE_HISTORIA.joven8051.sexualidad.uso_correcto_sex.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarEcoEmergencia();
        }
      );
    },
    validarEcoEmergencia() {
      validarInputs(
        {
          form: "#validarEcoEmergencia",
          orden: "1",
        },
        () => this.validarUsoCorrecto(),
        () => {
          this.DETALLE_HISTORIA.joven8051.sexualidad.eco_emergen_sex =
            this.DETALLE_HISTORIA.joven8051.sexualidad.eco_emergen_sex.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarUsoCondon();
        }
      );
    },
    validarUsoCondon() {
      validarInputs(
        {
          form: "#validarUsoCondon",
          orden: "1",
        },
        () => this.validarEcoEmergencia(),
        () => {
          this.DETALLE_HISTORIA.joven8051.sexualidad.uso_habitual_condon =
            this.DETALLE_HISTORIA.joven8051.sexualidad.uso_habitual_condon.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarSatisfaccionMetodo();
        }
      );
    },
    validarSatisfaccionMetodo() {
      validarInputs(
        {
          form: "#validarSatisfaccionMetodo",
          orden: "1",
        },
        () => this.validarUsoCondon(),
        () => {
          this.DETALLE_HISTORIA.joven8051.sexualidad.satis_metodo_plan =
            this.DETALLE_HISTORIA.joven8051.sexualidad.satis_metodo_plan.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarObservSexualidad();
        }
      );
    },
    validarObservSexualidad() {
      validarInputs(
        {
          form: "#validarObservSexualidad",
          orden: "1",
        },
        () => this.validarSatisfaccionMetodo(),
        () => {
          this.DETALLE_HISTORIA.joven8051.sexualidad.observaciones_sex =
            this.DETALLE_HISTORIA.joven8051.sexualidad.observaciones_sex.replaceEsp();

          this.guardarDetalle8051(this.validarObservSexualidad, () => {
            CON851("", "Sexualidad guardada", null, "success", "Correcto");
            this.validarImagenCorporal();
          });
        }
      );
    },
    validarImagenCorporal() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Imagen corporal",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_imagen_corporal,
            callback_f: () => this.validarObservSexualidad(),
            seleccion: this.DETALLE_HISTORIA.joven8051.psico_emocional.imagen_corp,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.psico_emocional.imagen_corp = data.COD;

            _this.validarEstadoAnimo();
          }
        );
      }, 300);
    },
    validarEstadoAnimo() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Estado ánimo",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_estado_animo,
            callback_f: () => this.validarImagenCorporal(),
            seleccion: this.DETALLE_HISTORIA.joven8051.psico_emocional.estado_animo,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.psico_emocional.estado_animo = data.COD;

            _this.validarProyectoVida();
          }
        );
      }, 300);
    },
    validarProyectoVida() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Proyecto vida",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_proyecto_vida,
            callback_f: () => this.validarEstadoAnimo(),
            seleccion: this.DETALLE_HISTORIA.joven8051.psico_emocional.proyecto_vida,
            teclaAlterna: true,
            id_input: "#validarProyectoVida",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.psico_emocional.proyecto_vida = data.COD;

            _this.validarRedesSociales();
          }
        );
      }, 300);
    },
    validarRedesSociales() {
      validarInputs(
        {
          form: "#validarRedesSociales",
          orden: "1",
        },
        () => this.validarProyectoVida(),
        () => {
          this.DETALLE_HISTORIA.joven8051.psico_emocional.redes_social_apoyo =
            this.DETALLE_HISTORIA.joven8051.psico_emocional.redes_social_apoyo.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarReferenteAdulto();
        }
      );
    },
    validarReferenteAdulto() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Referente adulto",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.referente,
            callback_f: () => this.validarRedesSociales(),
            seleccion: this.DETALLE_HISTORIA.joven8051.psico_emocional.ref_adulto,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.psico_emocional.ref_adulto = data.DESCRIP;

            _this.validarCelularAdulto();
          }
        );
      }, 300);
    },
    validarCelularAdulto() {
      validarInputs(
        {
          form: "#validarCelularAdulto",
          orden: "1",
        },
        () => this.validarReferenteAdulto(),
        () => {
          this.DETALLE_HISTORIA.joven8051.psico_emocional.ref_adulto_cel =
            this.DETALLE_HISTORIA.joven8051.psico_emocional.ref_adulto_cel.trim();
          this.validarTelefonoAdulto();
        }
      );
    },
    validarTelefonoAdulto() {
      validarInputs(
        {
          form: "#validarTelefonoAdulto",
          orden: "1",
        },
        () => this.validarCelularAdulto(),
        () => {
          this.DETALLE_HISTORIA.joven8051.psico_emocional.ref_adulto_fijo =
            this.DETALLE_HISTORIA.joven8051.psico_emocional.ref_adulto_fijo.trim();
          this.validarObservPsico();
        }
      );
    },
    validarObservPsico() {
      validarInputs(
        {
          form: "#validarObservPsico",
          orden: "1",
        },
        () => this.validarTelefonoAdulto(),
        () => {
          this.DETALLE_HISTORIA.joven8051.psico_emocional.observacion_psico =
            this.DETALLE_HISTORIA.joven8051.psico_emocional.observacion_psico.replaceEsp();

          this.guardarDetalle8051(this.validarObservPsico, () => {
            CON851("", "Situacion psico-emocional guardada", null, "success", "Correcto");
            this.validarPeso();
          });
        }
      );
    },
    validarPeso() {
      validarInputs(
        {
          form: "#validarPeso",
          orden: "1",
        },
        () => this.validarObservPsico(),
        () => {
          var peso = parseFloat(this.global_HC8051.signos.peso);
          this.global_HC8051.signos.peso = this.mascaras.peso.resolve(this.global_HC8051.signos.peso);

          let atiende = false;
          switch (this.datos_profesional.ATIENDE_PROF) {
            case "1":
            case "5":
            case "7":
            case "A":
            case "H":
            case "I":
            case "O":
              atiende = true;
              break;
          }

          if (
            (this.global_HC8051.signos.peso.toString() == "" || peso == 0) &&
            !atiende &&
            parseInt(this.global_HC8051.serv) > 1
          ) {
            CON851("02", "02", null, "error", "Error");
            this.validarPeso();
          } else if (peso > 300 || peso < 2) {
            CON851("03", "03", null, "error", "Error");
            this.validarPeso();
          } else {
            this.validarTalla();
          }
        }
      );
    },
    validarTalla() {
      validarInputs(
        {
          form: "#validartalla",
          orden: "1",
        },
        () => {
          this.validarPeso();
        },
        () => {
          var talla = parseInt(this.global_HC8051.signos.talla);
          var peso = parseFloat(this.global_HC8051.signos.peso);

          if (this.global_HC8051.signos.talla.toString().trim() == "" || (talla == 0 && peso > 1)) {
            CON851("02", "02", null, "error", "Error");
            this.validarTalla();
          } else if (talla > 230) {
            CON851("03", "03", null, "error", "Error");
            this.validarTalla();
          } else {
            this.global_HC8051.signos.talla = talla.toString();

            if (this.mostrarGraficas) this.verificarGraficas();
            else this.verificarIMC_SUP();
          }
        }
      );
    },
    verificarGraficas() {
      this.global_HC8051.signos.imc_estad = this.validarRangosOMS(
        "IMC",
        parseFloat(this.global_HC8051.signos.imc_corp)
      );

      switch (this.global_HC8051.signos.imc_estad) {
        case "2":
          CON851("BC", "BC", null, "warning", "Advertencia");
          break;
        case "1":
          CON851("BB", "BB", null, "warning", "Advertencia");
          break;
        case "-1":
          CON851("BD", "BD", null, "warning", "Advertencia");
          break;
        case "-2":
          CON851("BE", "BE", null, "warning", "Advertencia");
          break;
      }

      var fecha_Actual = moment();
      var fecha_Nacim = moment(this.datos_paciente.NACIM).format("YYYYMMDD");

      var edadMeses = fecha_Actual.diff(fecha_Nacim, "months");

      let TALLA = parseInt(this.global_HC8051.signos.talla);
      let IMC = parseInt(this.global_HC8051.signos.imc_corp);

      ////grafica talla por edad
      var index_talla = this.graficas.talla.info.paci.findIndex((x) => parseInt(x.x) == parseInt(edadMeses));
      if (index_talla != -1) {
        this.graficas.talla.info.paci[index_talla].y = TALLA;
      } else {
        this.graficas.talla.info.paci.push({ x: parseInt(edadMeses), y: TALLA });
      }

      ////grafica imc
      var index_imc = this.graficas.imc.info.paci.findIndex((x) => parseInt(x.x) == parseInt(edadMeses));
      if (index_imc != -1) {
        this.graficas.imc.info.paci[index_imc].y = IMC;
      } else {
        this.graficas.imc.info.paci.push({
          x: parseInt(edadMeses),
          y: IMC,
        });
      }

      this.graficarTalla();
      this.graficarIMC();

      this.mostrarBotonPdf = true;

      this.verificarIMC_SUP();
    },
    verificarIMC_SUP() {
      if (
        this.global_HC8051.unid_edad == "A" &&
        parseInt(this.global_HC8051.vlr_edad) > 15 &&
        this.datos_ext.sw_embar_w == "N"
      ) {
        let imc = parseFloat(this.global_HC8051.signos.imc_corp);

        if (imc >= 30) CON851("BC", "BC", null, "warning", "Advertencia");
        else if (imc >= 25) CON851("BB", "BB", null, "warning", "Advertencia");
        else if (imc < 16) CON851("BE", "BE", null, "warning", "Advertencia");
        else if (imc <= 17) CON851("BD", "BD", null, "warning", "Advertencia");

        this.validarTemperatura();
      } else this.validarTemperatura();
    },
    validarTemperatura() {
      validarInputs(
        {
          form: "#validarTemperatura",
          orden: "1",
        },
        () => {
          if (this.mostrarGraficas) this.mostrarBotonPdf = false;
          this.validarTalla();
        },
        () => {
          let peso = parseFloat(this.global_HC8051.signos.peso);
          let temp = parseFloat(this.global_HC8051.signos.temp);

          let atiende = false;
          switch (this.datos_profesional.ATIENDE_PROF) {
            case "1":
            case "5":
            case "7":
            case "8":
            case "A":
            case "H":
            case "I":
            case "O":
              atiende = true;
              break;
          }

          if (
            (this.global_HC8051.signos.temp.toString().trim() == "" || temp == 0) &&
            (parseInt(this.global_HC8051.serv) > 2 || (peso > 0 && !atiende))
          ) {
            CON851("02", "02", null, "error", "Error");
            this.validarTemperatura();
          } else {
            this.global_HC8051.signos.temp = this.mascaras.temp.resolve(this.global_HC8051.signos.temp);

            if (temp > 0 && (temp < 35.5 || temp > 38)) CON851("BM", "BM", null, "warning", "Advertencia");

            if (temp > 45) {
              CON851("03", "03", null, "error", "Error");
              this.validarTemperatura();
            } else if (temp < 30) {
              CON851("03", "03", null, "error", "Error");
              this.validarTemperatura();
            } else {
              this.validar_FC();
            }
          }
        }
      );
    },
    validar_FC() {
      validarInputs(
        {
          form: "#validar_FC",
          orden: "1",
        },
        () => this.validarTemperatura(),
        () => {
          var fc = parseInt(this.global_HC8051.signos.fcard);

          if (fc < 60 || fc > 100) {
            CON851("BK", "BK", null, "warning", "Advertencia");
            this.validar_FC();
          } else {
            this.validar_FR();
          }
        }
      );
    },
    validar_FR() {
      validarInputs(
        {
          form: "#validar_FR",
          orden: "1",
        },
        () => this.validar_FC(),
        () => {
          var fr = parseInt(this.global_HC8051.signos.fresp);

          if (fr > 100) {
            CON851("BL", "BL", null, "error", "Error");
            this.validar_FR();
          } else {
            this.validarTensArt_1();
          }
        }
      );
    },
    validarTensArt_1() {
      validarInputs(
        {
          form: "#validar_TA_1",
          orden: "1",
        },
        () => this.validar_FR(),
        () => {
          let atiende = false;
          switch (this.datos_profesional.ATIENDE_PROF) {
            case "1":
            case "5":
            case "7":
            case "8":
            case "A":
            case "H":
            case "I":
            case "O":
              atiende = true;
              break;
          }

          if (this.global_HC8051.signos.tens1.toString().trim() == "") {
            if (parseFloat(this.global_HC8051.signos.peso) > 0 && !atiende) {
              CON851("02", "02", null, "error", "Error");
              this.validarTensArt_1();
            } else {
              this.global_HC8051.signos.tens2 = "";
              this.global_HC8051.signos.tens_m = "0";
              this.validar_PVC();
            }
          } else if (parseInt(this.global_HC8051.signos.tens1) > 300) {
            CON851("03", "03", null, "error", "Error");
            this.validarTensArt_1();
          } else {
            this.validarTensArt_2();
          }
        }
      );
    },
    validarTensArt_2() {
      validarInputs(
        {
          form: "#validar_TA_2",
          orden: "1",
        },
        () => this.validarTensArt_1(),
        () => {
          if (this.global_HC8051.signos.tens2.toString().trim() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarTensArt_2();
          } else if (parseInt(this.global_HC8051.signos.tens2) > 300) {
            CON851("03", "03", null, "error", "Error");
            this.validarTensArt_2();
          } else {
            this.validar_PVC();
          }
        }
      );
    },
    validar_PVC() {
      validarInputs(
        {
          form: "#validar_PVC",
          orden: "1",
        },
        () => {
          if (this.global_HC8051.signos.tens1.toString().trim() == "") this.validarTensArt_1();
          else this.validarTensArt_2();
        },
        () => {
          this.global_HC8051.signos.pvc = isNaN(parseInt(this.global_HC8051.signos.pvc))
            ? "00"
            : parseInt(this.global_HC8051.signos.pvc).toString();

          this.validarPeCef();
        }
      );
    },
    validarPeCef() {
      validarInputs(
        {
          form: "#validar_PeCef",
          orden: "1",
        },
        () => this.validar_PVC(),
        () => {
          this.global_HC8051.signos.per_cef = this.mascaras.per.resolve(this.global_HC8051.signos.per_cef);

          if (this.global_HC8051.unid_edad == "A" && parseInt(this.global_HC8051.vlr_edad) > 10) {
            this.global_HC8051.signos.per_tora = "";
            if (this.global_HC8051.serv == "08") this.validar_PERABDO();
            else this.validar_PerMuneca();
          } else this.validar_PERTOR();
        }
      );
    },
    validar_PERTOR() {
      validarInputs(
        {
          form: "#validar_PERTOR",
          orden: "1",
        },
        () => this.validarPeCef(),
        () => {
          this.global_HC8051.signos.per_tora = this.mascaras.per.resolve(this.global_HC8051.signos.per_tora);

          if (this.global_HC8051.serv == "08") this.validar_PERABDO();
          else this.validar_PerMuneca();
        }
      );
    },
    validar_PERABDO() {
      validarInputs(
        {
          form: "#validar_PERABDO",
          orden: "1",
        },
        () => {
          if (this.global_HC8051.unid_edad == "A" && parseInt(this.global_HC8051.vlr_edad) > 10) this.validarPeCef();
          else this.validar_PERTOR();
        },
        () => {
          if (
            this.global_HC8051.unid_edad == "A" &&
            parseInt(this.global_HC8051.vlr_edad) > 18 &&
            this.global_HC8051.serv == "08" &&
            (parseInt(this.global_HC8051.signos.per_abdo) == 0 || this.global_HC8051.signos.per_abdo.trim() == "") &&
            this.datos_paciente.CRONICO == "S"
          ) {
            CON851("02", "02", null, "error", "Error");
            this.validar_PERABDO();
          } else {
            this.global_HC8051.signos.per_abdo = this.mascaras.per.resolve(this.global_HC8051.signos.per_abdo);

            this.validar_PerMuneca();
          }
        }
      );
    },
    validar_PerMuneca() {
      validarInputs(
        {
          form: "#validar_PerMuneca",
          orden: "1",
        },
        () => {
          if (this.global_HC8051.serv == "08") this.validar_PERABDO();
          else this.validar_PERTOR();
        },
        () => {
          this.global_HC8051.signos.per_mune = this.mascaras.per.resolve(this.global_HC8051.signos.per_mune);

          this.validar_PerBraqueal();
        }
      );
    },
    validar_PerBraqueal() {
      validarInputs(
        {
          form: "#validar_PerBraqueal",
          orden: "1",
        },
        () => this.validar_PerMuneca(),
        () => {
          this.global_HC8051.signos.per_braq = this.mascaras.per.resolve(this.global_HC8051.signos.per_braq);

          this.validar_SV02();
        }
      );
    },
    validar_SV02() {
      validarInputs(
        {
          form: "#validar_SV02",
          orden: "1",
        },
        () => this.validar_PerBraqueal(),
        () => {
          this.global_HC8051.signos.oximetria = parseInt(this.global_HC8051.signos.oximetria).toString() || "";

          this.LlamarHC890G();
        }
      );
    },
    LlamarHC890G() {
      //Agudeza visual
      if (this.mostrar_hc890g) this.params_hc890g.estado = true;
      else {
        this.guardarHistoria(this.validar_SV02, () => {
          CON851("", "Signos guardados", null, "success", "Correcto");
          this.params_hc890l.estado = true;
        });
      }
    },
    escHC890G() {
      this.params_hc890g.estado = false;
      this.validar_SV02();
    },
    evaluarSalidaHC890G(agudeza) {
      this.params_hc890g.estado = false;
      this.examen_visual = agudeza;

      this.global_HC8051.examen_visual.agud_visual_od_1 = this.examen_visual.agudeza_visual_od_1;
      this.global_HC8051.examen_visual.agud_visual_od_2 = this.examen_visual.agudeza_visual_od_2;
      this.global_HC8051.examen_visual.agud_visual_oi_1 = this.examen_visual.agudeza_visual_oi_1;
      this.global_HC8051.examen_visual.agud_visual_oi_2 = this.examen_visual.agudeza_visual_oi_2;
      this.global_HC8051.examen_visual.distancia_agud = this.examen_visual.distancia_agud;
      this.global_HC8051.examen_visual.estructuras_oculares_od = this.examen_visual.estructuras_oculares_od;
      this.global_HC8051.examen_visual.estructuras_oculares_oi = this.examen_visual.estructuras_oculares_oi;

      this.params_hc890l.estado = true;
    },
    escHc890l() {
      this.params_hc890l.estado = false;

      if (this.mostrar_hc890g) this.params_hc890g.estado = true;
      else this.validar_SV02();
    },
    evaluarSalidaHC890L(param) {
      this.params_hc890l.estado = false;
      this.global_HC8051.rips.discapacidades = param;

      this.guardarHistoria(this.validar_SV02, () => {
        CON851("", "Signos guardados", null, "success", "Correcto");
        this.validarPielFaneras();
      });
    },
    validarPielFaneras() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Piel/faneras/mucosa",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_examen_fisico,
            callback_f: () => this.validar_SV02(),
            seleccion: this.DETALLE_HISTORIA.joven8051.examen_fisico.piel_faner_mucosa,
            teclaAlterna: true,
            id_input: "#validarExamenPiel",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.examen_fisico.piel_faner_mucosa = data.COD;

            _this.validarExamenCabeza();
          }
        );
      }, 300);
    },
    validarExamenCabeza() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Cabeza",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_examen_fisico,
            callback_f: () => this.validarPielFaneras(),
            seleccion: this.DETALLE_HISTORIA.joven8051.examen_fisico.cabeza,
            teclaAlterna: true,
            id_input: "#validarExamenCabeza",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.examen_fisico.cabeza = data.COD;

            _this.validarExamenVisual();
          }
        );
      }, 300);
    },
    validarExamenVisual() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Agudeza visual",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_examen_fisico,
            callback_f: () => this.validarExamenCabeza(),
            seleccion: this.DETALLE_HISTORIA.joven8051.examen_fisico.agudeza_visual,
            teclaAlterna: true,
            id_input: "#validarExamenVisual",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.examen_fisico.agudeza_visual = data.COD;

            _this.validarExamenAuditiva();
          }
        );
      }, 300);
    },
    validarExamenAuditiva() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Agudeza auditiva",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_examen_fisico,
            callback_f: () => this.validarExamenVisual(),
            seleccion: this.DETALLE_HISTORIA.joven8051.examen_fisico.agudeza_auditiva,
            teclaAlterna: true,
            id_input: "#validarExamenAuditiva",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.examen_fisico.agudeza_auditiva = data.COD;

            _this.validarExamenBucal();
          }
        );
      }, 300);
    },
    validarExamenBucal() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Salud bucal",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_examen_fisico,
            callback_f: () => this.validarExamenAuditiva(),
            seleccion: this.DETALLE_HISTORIA.joven8051.examen_fisico.salud_bucal,
            teclaAlterna: true,
            id_input: "#validarExamenBucal",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.examen_fisico.salud_bucal = data.COD;

            _this.validarExamenCuello();
          }
        );
      }, 300);
    },
    validarExamenCuello() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Cuello y tiroides",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_examen_fisico,
            callback_f: () => this.validarExamenBucal(),
            seleccion: this.DETALLE_HISTORIA.joven8051.examen_fisico.cuello_tiroides,
            teclaAlterna: true,
            id_input: "#validarExamenCuello",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.examen_fisico.cuello_tiroides = data.COD;

            _this.validarExamenToras();
          }
        );
      }, 300);
    },
    validarExamenToras() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Toras y mamas",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_examen_fisico,
            callback_f: () => this.validarExamenCuello(),
            seleccion: this.DETALLE_HISTORIA.joven8051.examen_fisico.toras_mamas,
            teclaAlterna: true,
            id_input: "#validarExamenToras",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.examen_fisico.toras_mamas = data.COD;

            _this.validarExamenPulmonar();
          }
        );
      }, 300);
    },
    validarExamenPulmonar() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Cardio/pulmonar",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_examen_fisico,
            callback_f: () => this.validarExamenToras(),
            seleccion: this.DETALLE_HISTORIA.joven8051.examen_fisico.cardio_pulmon,
            teclaAlterna: true,
            id_input: "#validarExamenPulmonar",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.examen_fisico.cardio_pulmon = data.COD;

            _this.validarExamenAbdomen();
          }
        );
      }, 300);
    },
    validarExamenAbdomen() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Abdomen",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_examen_fisico,
            callback_f: () => this.validarExamenPulmonar(),
            seleccion: this.DETALLE_HISTORIA.joven8051.examen_fisico.abdomen,
            teclaAlterna: true,
            id_input: "#validarExamenAbdomen",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.examen_fisico.abdomen = data.COD;

            _this.validarExamenUrinario();
          }
        );
      }, 300);
    },
    validarExamenUrinario() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Genito/urinario",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_examen_fisico,
            callback_f: () => this.validarExamenAbdomen(),
            seleccion: this.DETALLE_HISTORIA.joven8051.examen_fisico.genito_urin,
            teclaAlterna: true,
            id_input: "#validarExamenUrinario",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.examen_fisico.genito_urin = data.COD;

            _this.validarExamenColumna();
          }
        );
      }, 300);
    },
    validarExamenColumna() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Columna",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_examen_fisico,
            callback_f: () => this.validarExamenUrinario(),
            seleccion: this.DETALLE_HISTORIA.joven8051.examen_fisico.columna,
            teclaAlterna: true,
            id_input: "#validarExamenColumna",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.examen_fisico.columna = data.COD;

            _this.validarExamenExtremidades();
          }
        );
      }, 300);
    },
    validarExamenExtremidades() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Extremidades",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_examen_fisico,
            callback_f: () => this.validarExamenColumna(),
            seleccion: this.DETALLE_HISTORIA.joven8051.examen_fisico.extremidades,
            teclaAlterna: true,
            id_input: "#validarExamenExtremidades",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.examen_fisico.extremidades = data.COD;

            _this.validarExamenNeurologico();
          }
        );
      }, 300);
    },
    validarExamenNeurologico() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Neurologico",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.array_examen_fisico,
            callback_f: () => this.validarExamenExtremidades(),
            seleccion: this.DETALLE_HISTORIA.joven8051.examen_fisico.neurologico,
            teclaAlterna: true,
            id_input: "#validarExamenNeurologico",
          },
          (data) => {
            _this.DETALLE_HISTORIA.joven8051.examen_fisico.neurologico = data.COD;

            _this.guardarDetalle8051(this.validarExamenNeurologico, () => {
              CON851("", "Examen fisico guardado", null, "success", "Correcto");
              _this.validarExamenFisico();
            });
          }
        );
      }, 300);
    },
    validarExamenFisico() {
      validarInputs(
        {
          form: "#validarExamenFisico",
          orden: "1",
        },
        () => this.validarExamenNeurologico(),
        () => {
          this.DETALLE_HISTORIA.Examen_fisico = this.DETALLE_HISTORIA.Examen_fisico.replaceEsp();

          let _this = this;
          grabarDetallesText(this.DETALLE_HISTORIA.Examen_fisico, $_REG_HC.llave_hc + "4005")
            .then(() => {
              CON851("", "Examen fisico guardado", null, "success", "Correcto");
              _this.validarVelloPubico();
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error Guardando examen fisico", null, "error", "Error");
              _this.validarExamenFisico();
            });
        }
      );
    },
    validarVelloPubico() {
      validarInputs(
        {
          form: "#validarVelloPubico",
          orden: "1",
        },
        () => this.validarExamenFisico(),
        () => {
          let tanner = parseInt(this.global_HC8051.signos.tanner_pubico) || 0;
          if (tanner > 5 || tanner < 1) {
            CON851("", "Dato fuera de rango", null, "error", "Error");
            this.validarVelloPubico();
          } else this.validarGenitales();
        }
      );
    },
    validarGenitales() {
      validarInputs(
        {
          form: "#validarGenitales",
          orden: "1",
        },
        () => this.validarVelloPubico(),
        () => {
          let tanner = parseInt(this.global_HC8051.signos.tanner_genit) || 0;
          if (tanner > 5 || tanner < 1) {
            CON851("", "Dato fuera de rango", null, "error", "Error");
            this.validarGenitales();
          } else this.verificarLlamar9010();
        }
      );
    },
    verificarLlamar9010() {
      let finalidad = false;
      switch (this.global_HC8051.rips.finalid) {
        case "04":
        case "05":
        case "06":
          finalidad = true;
          break;
        default:
          finalidad = false;
          break;
      }
      console.log(
        this.global_HC8051.serv,
        finalidad,
        this.global_HC8051.unid_edad,
        parseInt(this.global_HC8051.vlr_edad)
      );
      if (this.global_HC8051.serv == "08" && finalidad) {
        if (
          this.global_HC8051.unid_edad == "D" ||
          this.global_HC8051.unid_edad == "M" ||
          (this.global_HC8051.unid_edad == "A" &&
            parseInt(this.global_HC8051.vlr_edad) < 18 &&
            parseInt(this.global_HC8051.vlr_edad) > 11)
        ) {
          this.llamadoHC_9010();
        } else this.llamadoHC_9011();
      } else this.llamadoHC_9011();
    },
    escHC_9010() {
      this.params_hc9010.estado = false;
      this.validarGenitales();
    },
    llamadoHC_9010() {
      this.mostrarHC9010 = true;
      setTimeout(() => (this.params_hc9010.estado = true), 300);
    },
    finHC_9010() {
      this.params_hc9010.estado = false;
      this.llamadoHC_9011();
    },
    escHC_9011() {
      this.params_hc9011.estado = false;
      if (this.mostrarHC9010) this.llamadoHC_9010();
      else this.validarGenitales();
    },
    llamadoHC_9011() {
      var valido = false;

      switch (this.global_HC8051.rips.finalid) {
        case "01":
        case "02":
        case "03":
        case "04":
        case "05":
        case "06":
        case "07":
        case "08":
        case "09":
          valido = true;
          break;
        default:
          valido = false;
          break;
      }

      if (this.global_HC8051.serv == "08" && valido) {
        this.mostrarHC9011 = true;
        setTimeout(() => (this.params_hc9011.estado = true), 300);
      } else {
        this.mostrarHC9011 = false;
        if (this.global_HC8051.rips.tabla_diagn[0].cod_diagn.trim() == "")
          this.global_HC8051.rips.tabla_diagn[0].cod_diagn = "Z003";
        this.validarCod_diagnosticos(0);
      }
    },
    finHC_9011() {
      this.params_hc9011.estado = false;
      if (this.global_HC8051.rips.tabla_diagn[0].cod_diagn.trim() == "")
        this.global_HC8051.rips.tabla_diagn[0].cod_diagn = "Z003";
      this.validarCod_diagnosticos(0);
    },
    escVentanaEnfermedades() {
      this.mostrarEnfermedades = false;
      switch (this.inputEnfer.tipo) {
        case 1:
          this.validarCod_diagnosticos(this.inputEnfer.pos);
          break;
        case 2:
          this.validarDiagnosticoMuerte();
          break;
      }

      this.inputEnfer = {
        nombre: "",
        tipo: 0,
        pos: 0,
      };
    },
    ventanaCod_diag(pos, tipo) {
      this.inputEnfer.pos = pos;
      this.inputEnfer.tipo = tipo;
      switch (this.inputEnfer.tipo) {
        case 1:
          this.inputEnfer.nombre = "#CodDiag_" + pos + "_HC8051";
          break;
        case 2:
          this.inputEnfer.nombre = "#diagnosMuerte_HC8051";
          break;
      }
      _fin_validar_form();
      this.mostrarEnfermedades = true;
    },
    successVentanaEnfermedades(data) {
      this.mostrarEnfermedades = false;

      switch (this.inputEnfer.tipo) {
        case 1:
          this.global_HC8051.rips.tabla_diagn[this.inputEnfer.pos].cod_diagn = data.cod;
          this.validarCod_diagnosticos(this.inputEnfer.pos);
          break;
        case 2:
          this.global_HC8051.cierre.diag_muer = data.cod;
          this.validarDiagnosticoMuerte();
          break;
      }

      setTimeout(() => {
        _enterInput(this.inputEnfer.nombre);
        this.inputEnfer = {
          nombre: "",
          tipo: 0,
          pos: 0,
        };
      }, 100);
    },
    validarCod_diagnosticos(pos) {
      validarInputs(
        {
          form: "#validarCod_diag_" + pos + "_HC8051",
          orden: "1",
          event_f3: () => {
            if (this.global_HC8051.rips.tabla_diagn[0].cod_diagn.trim() == "") {
              CON851("02", "02", null, "error", "Error");
              this.validarCod_diagnosticos(pos);
            } else this.consultarCodigoEnf(pos, 1, true);
          },
        },
        () => {
          if (pos == 0) {
            if (this.llamadoHC_9011) this.llamadoHC_9011();
            else {
              if (this.mostrarHC9010) this.llamadoHC_9010();
              else this.validarGenitales();
            }
          } else this.validarCod_diagnosticos(pos - 1);
        },
        () => {
          if (this.global_HC8051.rips.tabla_diagn[pos].cod_diagn.trim() == "") {
            if (pos == 0) {
              CON851("02", "02", null, "error", "Error");
              this.validarCod_diagnosticos(pos);
            } else {
              this.global_HC8051.rips.tabla_diagn[pos].descrip_diagn = "";
              this.finalizarDiagnosticoDigitado(pos);
            }
          } else this.consultarCodigoEnf(pos, 1);
        }
      );
    },
    consultarCodigoEnf(pos, tipo, f3 = false) {
      var _this = this;
      let codigo_envio = "";

      switch (tipo) {
        case 1:
          codigo_envio = this.global_HC8051.rips.tabla_diagn[pos].cod_diagn.toUpperCase().trim();
          this.$nextTick(function () {
            Vue.set(_this.global_HC8051.rips.tabla_diagn[pos], "cod_diagn", codigo_envio);
          });
          break;
        case 2:
          codigo_envio = this.global_HC8051.cierre.diag_muer;
          break;
      }

      loader("show");
      var _this = this;
      var data = {
        datosh: datosEnvio(),
        codigo: codigo_envio,
        paso: "1",
      };

      postData(data, get_url("APP/SALUD/SER851.DLL"))
        .then(function (data) {
          loader("hide");
          console.log(data);

          if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == "")
            _this.errorCodigoEnfermedad(pos, tipo);
          else _this.successCodigoEnfermedad(pos, tipo, data, f3);
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          _this.errorCodigoEnfermedad(pos);
        });
    },
    errorCodigoEnfermedad(pos, tipo) {
      CON851("", "Enfermedad no encontrada!", null, "error", "Error");
      switch (tipo) {
        case 1:
          this.global_HC8051.rips.tabla_diagn[pos].descrip_diagn = "ENFERMEDAD NO ENCONTRADA";
          this.validarCod_diagnosticos(pos);
          break;
        case 2:
          this.textos.diagnostico_muerte = "ENFERMEDAD NO ENCONTRADA";
          this.validarDiagnosticoMuerte();
          break;
      }
    },
    successCodigoEnfermedad(pos, tipo, data, f3) {
      switch (tipo) {
        case 1:
          this.validarDiagnosticoDigitado(pos, data, f3);
          break;
        case 2:
          this.validarDiagMuerte(data);
          break;
      }
    },
    async validarDiagnosticoDigitado(pos, enf, f3 = false) {
      this.global_HC8051.rips.tabla_diagn[pos].descrip_diagn = enf.NOMBRE_ENF.replace(/\s\s+/g, " ");

      let codigo = this.global_HC8051.rips.tabla_diagn[pos].cod_diagn
      let error = false;

      var unidEdad_paci = "0";
      switch (this.global_HC8051.unid_edad) {
        case "A":
          unidEdad_paci = "1";
          break;
        case "M":
          unidEdad_paci = "2";
          break;
        case "D":
          unidEdad_paci = "3";
          break;
      }

      var edad_paci = unidEdad_paci + this.global_HC8051.vlr_edad.padStart(3, "0") || 0;

      var unidEdad_enf = "0";
      switch (enf.UNID_EDAD_ENF) {
        case "A":
          unidEdad_enf = "1";
          break;
        case "M":
          unidEdad_enf = "2";
          break;
        case "D":
          unidEdad_enf = "3";
          break;
      }

      var edadEnf_min = parseInt(unidEdad_enf + enf.EDAD_MIN_ENF.trim().padStart(3, "0")) || 0;
      var edadEnf_max = parseInt(unidEdad_enf + enf.EDAD_MAX_ENF.trim().padStart(3, "0")) || 0;
      console.log(edadEnf_min, edadEnf_max, edad_paci);

      var primer_caracter = codigo.substring(0, 1);

      if (enf.HUERFA_ENF.toUpperCase() == "S") CON851("G3", "G3", null, "error", "Error");

      if (pos == 0) {
        switch (this.global_HC8051.serv) {
          case "08":
            var validos = ["I10X", "I151", "I158", "I159", "O16X", "E782", "E784", "E785", "E119"];

            var busqueda_validos = validos.find((x) => x == codigo);

            if (!busqueda_validos && primer_caracter != "Z") {
              CON851("G0", "G0", null, "error", "Error");
              error = true;
            }

            break;
          case "02":
          case "03":
          case "06":
          case "63":
            break;
          default:
            var excluidos = [
              "Z000",
              "Z001",
              "Z002",
              "Z003",
              "Z006",
              "Z021",
              "Z023",
              "Z024",
              "Z025",
              "Z026",
              "Z027",
              "Z028",
              "Z029",
              "Z100",
              "Z101",
              "Z102",
              "Z103",
              "Z108",
              "Z300",
              "Z301",
              "Z700",
              "Z701",
              "Z702",
              "Z713",
              "Z714",
              "Z715",
              "Z716",
              "Z717",
              "Z718",
              "Z719",
            ];

            var busqueda_exclu = excluidos.find((x) => x == codigo);

            if (busqueda_exclu) {
              CON851("G1", "G1", null, "error", "Error");
              error = true;
            }

            break;
        }
      }

      if (enf.SEXO_ENF.trim() != "" && enf.SEXO_ENF != this.datos_paciente.SEXO) {
        CON851("73", "73", null, "error", "Error");
        error = true;
      } else if (primer_caracter == "Z" && (this.global_HC8051.serv == "01" || this.global_HC8051.serv == "02")) {
        CON851("03", "03", null, "error", "Error");
        error = true;
      } else if (primer_caracter == "R" && $_USUA_GLOBAL[0].NIT.toString().trim() == "800037021") {
        CON851("03", "03", null, "error", "Error");
        error = true;
      } else if (parseInt(enf.EDAD_MIN_ENF) > 0 && parseInt(edad_paci) < edadEnf_min) {
        CON851("74", "74", null, "error", "Error");
        error = true;
      } else if (parseInt(enf.EDAD_MAX_ENF) > 0 && parseInt(edad_paci) > edadEnf_max) {
        CON851("74", "74", null, "error", "Error");
        error = true;
      }

      if (error) {
        this.validarCod_diagnosticos(pos);
      } else {
        let busqueda_enfer_trans = await this.consultarEnfermedadSexual(pos);

        if (pos == 9 || f3) this.finalizarDiagnosticoDigitado(pos);
        else this.validarCod_diagnosticos(pos + 1);
      }
    },
    consultarEnfermedadSexual(pos) {
      return new Promise(async (resolve, reject) => {
        let envio = {
          datosh: datosEnvio(),
          codigo: this.global_HC8051.rips.tabla_diagn[pos].cod_diagn,
          paso: "1",
        };
        await postData(envio, get_url("APP/SALUD/SER753A.DLL"))
          .then((data) => {
            if (data.EXISTE.trim() == "NO") resolve(data);
            else resolve(false);
          })
          .catch((error) => {
            console.error(error);
            resolve(false);
          });
      });
    },
    finalizarDiagnosticoDigitado(pos) {
      this.global_HC8051.rips.tabla_diagn = this.global_HC8051.rips.tabla_diagn.filter((el) => el.cod_diagn.trim());

      while (this.global_HC8051.rips.tabla_diagn.length < 10) {
        this.global_HC8051.rips.tabla_diagn.push({ cod_diagn: "", descrip_diagn: "" });
      }

      this.guardarHistoria(
        () => this.validarCod_diagnosticos(pos),
        () => {
          CON851("", "Diagnosticos guardados", null, "success", "Correcto");
          this.validarAnalisis();
        }
      );
    },
    validarAnalisis() {
      validarInputs(
        {
          form: "#validarAnalisis",
          orden: "1",
        },
        () => this.validarCod_diagnosticos(0),
        () => {
          this.DETALLE_HISTORIA.Analisis = this.DETALLE_HISTORIA.Analisis.replaceEsp();

          let _this = this;
          grabarDetallesText(this.DETALLE_HISTORIA.Analisis, $_REG_HC.llave_hc + "7501")
            .then(() => {
              CON851("", "Analisis guardado", null, "success", "Correcto");
              _this.validarPlan();
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error Guardando analisis", null, "error", "Error");
              _this.validarAnalisis();
            });
        }
      );
    },
    validarPlan() {
      validarInputs(
        {
          form: "#validarPlan",
          orden: "1",
        },
        () => this.validarAnalisis(),
        () => {
          this.DETALLE_HISTORIA.Plan = this.DETALLE_HISTORIA.Plan.replaceEsp();

          let _this = this;
          grabarDetallesText(this.DETALLE_HISTORIA.Plan, $_REG_HC.llave_hc + "7503")
            .then(() => {
              CON851("", "Plan guardado", null, "success", "Correcto");
              this.evaluarLlamadoFindRisk();
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error Guardando Plan", null, "error", "Error");
              _this.validarPlan();
            });
        }
      );
    },
    evaluarLlamadoFindRisk() {
      if (this.mostrarFindrisk) this.params_findrisk.estado = true;
      else this.llamadoSintomatico();
    },
    validarEsc_findrisk() {
      this.params_findrisk.estado = false;
      this.validarPlan();
    },
    validarCallback_findrisk(param) {
      this.params_findrisk.estado = false;
      this.global_HC8051.requiere_findrisk = param;

      this.guardarHistoria(
        () => (this.params_findrisk.estado = true),
        () => {
          this.llamadoSintomatico();
        }
      );
    },
    llamadoSintomatico() {
      if (this.datos_profesional.ATIENDE_PROF == "2") {
        this.params_hc890d.unserv = this.global_HC8051.serv;
        this.params_hc890d.finalidad = this.global_HC8051.rips.finalid;
        this.params_hc890d.estado = true;
      } else this.capturarCausaExterna();
    },
    validarEsc_sintomatico() {
      this.params_hc890d.estado = false;
      if (this.mostrarFindrisk) this.params_findrisk.estado = true;
      else this.validarPlan();
    },
    validarCallback_sintomatico(data) {
      console.log(data);
      this.params_hc890d.estado = false;
      this.sintomaticos = data;

      this.global_HC8051.signos.sintom_respi = this.sintomaticos.sintom_resp;
      this.global_HC8051.signos.sintom_piel = this.sintomaticos.sintom_piel;
      this.global_HC8051.signos.contacto_lepra = this.sintomaticos.contacto_lepra;
      this.global_HC8051.signos.victi_maltrato = this.sintomaticos.victi_maltrato;
      this.global_HC8051.signos.victi_violencia = this.sintomaticos.victi_violencia;
      this.global_HC8051.signos.enfer_mental = this.sintomaticos.enfer_mental;
      this.global_HC8051.signos.enfer_its = this.sintomaticos.enfer_its;
      this.global_HC8051.signos.cual_its = this.sintomaticos.cual_its;
      this.global_HC8051.signos.trata_its = this.sintomaticos.trata_its;
      this.global_HC8051.signos.cancer_seno = this.sintomaticos.cancer_seno;
      this.global_HC8051.signos.cancer_cervis = this.sintomaticos.cancer_cervis;
      this.global_HC8051.signos.edu_autoexa_seno = this.sintomaticos.edu_autoexa_seno;
      this.global_HC8051.signos.citologia_previa = this.sintomaticos.citologia_previa;
      this.global_HC8051.signos.fecha_cito_previa = this.sintomaticos.fecha_cito_previa;
      this.global_HC8051.signos.resul_cito_previa = this.sintomaticos.resul_cito_previa;
      this.global_HC8051.signos.fecha_ult_mamo = this.sintomaticos.fecha_ult_mamo;
      console.log(this.global_HC8051.signos);
      this.capturarCausaExterna();
    },
    capturarCausaExterna() {
      if (
        this.global_HC8051.serv == "08" &&
        parseInt(this.global_HC8051.rips.finalid) >= 0 &&
        parseInt(this.global_HC8051.rips.finalid) <= 9
      ) {
        this.global_HC8051.rips.causa = "15";

        this.capturarTipoDiagnostico();
      } else {
        var _this = this;

        setTimeout(() => {
          POPUP(
            {
              titulo: "Causa externa",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.causas_externas,
              callback_f: () => {
                if (this.datos_profesional.ATIENDE_PROF == "2") this.params_hc890d.estado = true;
                else this.validarPlan();
              },
              seleccion: this.global_HC8051.rips.causa,
              teclaAlterna: true,
            },
            (data) => {
              _this.global_HC8051.rips.causa = data.COD;

              let primer_caracter = _this.global_HC8051.rips.tabla_diagn[0].cod_diagn.substring(0, 1);
              let condic_diag = false;

              switch (_this.global_HC8051.rips.tabla_diagn[0].cod_diagn) {
                case "T781":
                case "T782":
                case "T783":
                case "T784":
                case "T788":
                case "T789":
                case "T803":
                  condic_diag = true;
                  break;
              }

              if (
                (_this.global_HC8051.rips.causa == "13" || _this.global_HC8051.rips.causa == "15") &&
                (primer_caracter == "S" || primer_caracter == "T") &&
                !condic_diag
              ) {
                CON851("7E", "7E", null, "error", "Error");
                _this.capturarCausaExterna();
              } else _this.capturarTipoDiagnostico();
            }
          );
        }, 300);
      }
    },
    capturarTipoDiagnostico() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Tipo de diagnóstico",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.tipos_diagnostico,
            callback_f: () => {
              if (
                this.global_HC8051.serv == "08" &&
                parseInt(this.global_HC8051.rips.finalid) >= 0 &&
                parseInt(this.global_HC8051.rips.finalid) <= 9
              ) {
                if (this.datos_profesional.ATIENDE_PROF == "2") this.params_hc890d.estado = true;
                else this.validarPlan();
              } else this.capturarCausaExterna();
            },
            seleccion: this.global_HC8051.rips.tipo_diag,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_HC8051.rips.tipo_diag = data.COD;

            if (_this.global_HC8051.serv != "08") _this.global_HC8051.rips.finalid = "10";

            _this.validarPrimeraVez();
          }
        );
      }, 300);
    },
    validarPrimeraVez() {
      validarInputs(
        {
          form: "#validarPrimeraVez",
          orden: "1",
        },
        () => this.capturarTipoDiagnostico(),
        () => {
          this.global_HC8051.rips.primera_vez =
            this.global_HC8051.rips.primera_vez.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.global_HC8051.rips.primera_vez == "S") {
            if (this.global_HC8051.serv == "08") this.validarDiaProximaVez();
            else this.evaluarEstadoSalida();
          } else this.validarDiaPrimeraVez();
        }
      );
    },
    validarDiaPrimeraVez() {
      validarInputs(
        {
          form: "#validarDiaPrimeraVez",
          orden: "1",
        },
        () => this.validarPrimeraVez(),
        () => {
          this.fechas.primera_vez.dia = cerosIzq(this.fechas.primera_vez.dia, 2);

          if (parseInt(this.fechas.primera_vez.dia) == 0) {
            this.fechas.primera_vez.mes = "00";
            this.fechas.primera_vez.ano = "0000";
            this.global_HC8051.rips.fecha_1ra_vez = "00000000";
            this.evaluarEstadoSalida();
          } else if (parseInt(this.fechas.primera_vez.dia) > 31) {
            CON851("37", "37", null, "error", "Error");
            this.validarDiaPrimeraVez();
          } else {
            this.validarMesPrimeraVez();
          }
        }
      );
    },
    validarMesPrimeraVez() {
      validarInputs(
        {
          form: "#validarMesPrimeraVez",
          orden: "1",
        },
        () => this.validarDiaPrimeraVez(),
        () => {
          this.fechas.primera_vez.mes = cerosIzq(this.fechas.primera_vez.mes, 2);

          if (parseInt(this.fechas.primera_vez.mes) > 12 || parseInt(this.fechas.primera_vez.mes) == 0) {
            CON851("37", "37", null, "error", "Error");
            this.validarMesPrimeraVez();
          } else {
            this.validarAnoPrimeraVez();
          }
        }
      );
    },
    validarAnoPrimeraVez() {
      validarInputs(
        {
          form: "#validarAnoPrimeraVez",
          orden: "1",
        },
        () => this.validarMesPrimeraVez(),
        () => {
          this.fechas.primera_vez.ano = cerosIzq(this.fechas.primera_vez.ano, 4);

          var fecha_rips = this.fechas.primera_vez.ano + this.fechas.primera_vez.mes + this.fechas.primera_vez.dia;
          console.log(fecha_rips);

          if (parseInt(this.fechas.primera_vez.ano) == 0) {
            CON851("37", "37", null, "error", "Error");
            this.validarAnoPrimeraVez();
          } else if (parseInt(this.global_HC8051.fecha) < parseInt(fecha_rips)) {
            CON851("37", "Fecha mayor a historia !", null, "error", "Error");
            this.validarAnoPrimeraVez();
          } else {
            this.global_HC8051.rips.fecha_1ra_vez = fecha_rips;
            this.evaluarEstadoSalida();
          }
        }
      );
    },
    validarDiaProximaVez() {
      validarInputs(
        {
          form: "#validarDiaProximaVez",
          orden: "1",
        },
        () => this.validarPrimeraVez(),
        () => {
          this.fechas.proxima_cita.dia = cerosIzq(this.fechas.proxima_cita.dia, 2);

          if (parseInt(this.fechas.proxima_cita.dia) == 0) {
            this.fechas.proxima_cita.mes = "00";
            this.fechas.proxima_cita.ano = "0000";
            this.global_HC8051.fecha_prox_cita = "00000000";
            this.evaluarEstadoSalida();
          } else if (parseInt(this.fechas.proxima_cita.dia) > 31) {
            CON851("37", "37", null, "error", "Error");
            this.validarDiaProximaVez();
          } else {
            this.validarMesProximaVez();
          }
        }
      );
    },
    validarMesProximaVez() {
      validarInputs(
        {
          form: "#validarMesProximaVez",
          orden: "1",
        },
        () => this.validarDiaProximaVez(),
        () => {
          this.fechas.proxima_cita.mes = cerosIzq(this.fechas.proxima_cita.mes, 2);

          if (parseInt(this.fechas.proxima_cita.mes) > 12 || parseInt(this.fechas.proxima_cita.mes) == 0) {
            CON851("37", "37", null, "error", "Error");
            this.validarMesProximaVez();
          } else {
            this.validarAnoProximaVez();
          }
        }
      );
    },
    validarAnoProximaVez() {
      validarInputs(
        {
          form: "#validarAnoProximaVez",
          orden: "1",
        },
        () => this.validarMesProximaVez(),
        () => {
          this.fechas.proxima_cita.ano = cerosIzq(this.fechas.proxima_cita.ano, 4);

          var fecha_rips = this.fechas.proxima_cita.ano + this.fechas.proxima_cita.mes + this.fechas.proxima_cita.dia;
          console.log(fecha_rips);

          if (parseInt(this.fechas.proxima_cita.ano) == 0) {
            CON851("37", "37", null, "error", "Error");
            this.validarAnoProximaVez();
          } else if (parseInt(this.global_HC8051.fecha) > parseInt(fecha_rips)) {
            CON851("37", "Fecha menor a historia !", null, "error", "Error");
            this.validarAnoProximaVez();
          } else {
            this.global_HC8051.fecha_prox_cita = fecha_rips;
            this.evaluarEstadoSalida();
          }
        }
      );
    },
    evaluarEstadoSalida() {
      var _this = this;
      setTimeout(() => {
        POPUP(
          {
            titulo: "Estado de salida",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.estadoSalidaRips,
            callback_f: () => {
              if (this.global_HC8051.rips.finalid == "08") {
                this.validarAnoProximaVez();
              } else {
                this.validarPrimeraVez();
              }
            },
            seleccion: this.global_HC8051.rips.estado_sal,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_HC8051.rips.estado_sal = data.COD;

            switch (_this.global_HC8051.rips.estado_sal) {
              case "2":
                this.validarDiagnosticoMuerte();
                break;
              case "3":
                this.validarRemitido();
                break;
              default:
                this.validarObservacionRips();
                break;
            }
          }
        );
      }, 300);
    },
    ventanaDiagNosMuerte() {
      var _this = this;

      _ventanaDatos({
        titulo: "Ventana de enfermedades",
        columnas: ["COD_ENF", "NOMBRE_ENF"],
        data: this.enfermedades,
        ancho: "70%",
        callback_esc: () => {
          document.getElementById("diagnosMuerte_HC8051").focus();
        },
        callback: (data) => {
          _this.global_HC8051.cierre.diag_muer = data.COD_ENF;
          setTimeout(() => _enterInput("#diagnosMuerte_HC8051"), 100);
        },
      });
    },
    validarDiagnosticoMuerte() {
      validarInputs(
        {
          form: "#validarDiagMuerte",
          orden: "1",
        },
        () => this.evaluarEstadoSalida(),
        () => {
          this.global_HC8051.cierre.diag_muer = this.global_HC8051.cierre.diag_muer.toUpperCase().trim();

          var busqueda = this.enfermedades.find((x) => x.COD_ENF.trim() == this.global_HC8051.cierre.diag_muer);

          if (busqueda) {
            this.textos.diagnostico_muerte = busqueda.NOMBRE_ENF.trim();

            if (busqueda.SEXO_ENF.trim() != "" && busqueda.SEXO_ENF != this.datos_paciente.SEXO) {
              CON851("73", "73", null, "error", "Error");
              this.validarDiagnosticoMuerte();
            } else {
              this.validarObservacionRips();
            }
          } else {
            CON851("01", "01", null, "error", "Error");
            this.validarDiagnosticoMuerte();
          }
        }
      );
    },
    validarRemitido() {
      validarInputs(
        {
          form: "#validarRemitido",
          orden: "1",
        },
        () => this.evaluarEstadoSalida(),
        () => {
          if (this.global_HC8051.rips.remitido.trim() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarRemitido();
          } else {
            this.validarObservacionRips();
          }
        }
      );
    },
    validarObservacionRips() {
      if (this.global_HC8051.serv == "01") {
        validarInputs(
          {
            form: "#validarObservacionRips",
            orden: "1",
          },
          () => {
            switch (this.global_HC8051.rips.estado_sal) {
              case "2":
                this.validarDiagnosticoMuerte();
                break;
              case "3":
                this.validarRemitido();
                break;
              default:
                this.evaluarEstadoSalida();
                break;
            }
          },
          () => {
            this.global_HC8051.rips.observ = this.global_HC8051.rips.observ.toUpperCase().trim() != "S" ? "N" : "S";

            this.validarTriage();
          }
        );
      } else {
        this.global_HC8051.rips.triage = "0";
        this.global_HC8051.rips.observ = "";
        this.preguntarGuardado();
      }
    },
    validarTriage() {
      validarInputs(
        {
          form: "#validarTriage",
          orden: "1",
        },
        () => this.validarObservacionRips(),
        () => {
          switch (this.global_HC8051.rips.triage) {
            case "1":
            case "2":
            case "3":
              this.preguntarGuardado();
              break;
            default:
              CON851("02", "02", null, "error", "Error");
              this.validarTriage();
              break;
          }
        }
      );
    },
    preguntarGuardado() {
      var _this = this;

      setTimeout(() => {
        CON851P(
          "01",
          () => {
            if (this.global_HC8051.serv == "01") {
              this.validarTriage();
            } else {
              switch (_this.global_HC8051.rips.estado_sal) {
                case "2":
                  this.validarDiagnosticoMuerte();
                  break;
                case "3":
                  this.validarRemitido();
                  break;
                default:
                  this.evaluarEstadoSalida();
                  break;
              }
            }
          },
          _this.grabado_HC8051
        );
      }, 300);
    },
    async grabado_HC8051() {
      await this.guardarHistoria(this.preguntarGuardado, () => console.log("guarda RIPS"));

      var data = {};

      data["datosh"] =
        datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|" + this.global_HC8051.novedad + "|";

      data["telefono_paci"] = this.datos_ext.telefono_paci;
      data["direccion_paci"] = this.datos_ext.direccion_paci;

      console.log(data);

      var _this = this;

      postData(data, get_url("APP/HICLIN/SAVE_HC8051.DLL"))
        .then((data) => {
          console.log(data);
          CON851("", data, null, "success", "Correcto");
          _this.actualizarSisvan();
        })
        .catch((error) => {
          console.log(error);
          CON851("", "Ha ocurrido un error", null, "error", "Error");
          _this.validarPrimeraVez();
        });
    },
    actualizarSisvan() {
      var _this = this;

      var data = {};

      data["datosh"] = datosEnvio() + $_REG_HC.id_paciente + "|";

      data["operador"] = localStorage.Usuario;
      data["fecha"] = this.global_HC8051.fecha;
      data["embarazo"] = this.global_HC8051.rips.embarazo;
      data["tens_media"] = this.global_HC8051.signos.tens_media;

      data["edad_dias"] = this.global_HC8051.edad_dias;
      data["peso"] = this.global_HC8051.signos.peso;
      data["talla"] = this.global_HC8051.signos.talla;
      data["per_cef"] = this.global_HC8051.signos.per_cef;
      data["imc"] = this.global_HC8051.signos.imc_corp;

      data["estad_peso"] = "0";
      data["estad_talla"] = "0";
      data["estad_peso_talla"] = "0";
      data["estad_per_cef"] = "0";
      data["estad_imc"] = this.global_HC8051.signos.imc_estad;
      data["finalidad"] = this.global_HC8051.rips.finalid;

      this.global_HC8051.rips.tabla_diagn.forEach((el, index) => {
        let index_label = (index + 1).toString().padStart(3, "0");
        data[`DIAGN_${index_label}`] = el.cod_diagn || "";
      });
      console.log(data);

      postData(data, get_url("APP/SALUD/SER134X.DLL"))
        .then((data) => {
          console.log(data);
          _this.actualizarRipsFactura();
        })
        .catch((error) => {
          console.log(error);
          CON851("", "Ha ocurrido un error guardando SISVAN ", null, "error", "Error");
          _this.validarPrimeraVez();
        });
    },
    actualizarRipsFactura() {
      var _this = this;

      var data = {};
      data["datosh"] = datosEnvio() + this.nro_ult_comp + "|";
      data["paso"] = "1";

      postData(data, get_url("APP/SALUD/SER448C.DLL"))
        .then((data) => {
          console.log(data);
          _this.marcarCita();
        })
        .catch((error) => {
          console.error(error);
          _this.marcarCita();
        });
    },
    marcarCita() {
      var _this = this;

      postData(
        {
          datosh:
            datosEnvio() + this.global_HC8051.fecha + "|" + localStorage.IDUSU + "|" + this.datos_paciente.COD + "|",
        },
        get_url("APP/HICLIN/HC-101.DLL")
      )
        .then(_this.llamarFormulacion)
        .catch((err) => {
          console.error(err);
          setTimeout(() => {
            _this.llamarFormulacion();
          }, 300);
        });
    },
    llamarFormulacion() {
      $_REG_HC.fecha_lnk = this.global_HC8051.fecha;
      $_REG_HC.hora_lnk = this.global_HC8051.hora;
      $_REG_HC.oper_lnk = localStorage.Usuario;
      $_REG_HC.opc_llamado = "1";
      $("#body_main").load("../../HICLIN/paginas/HC002F.html");
    },
    async guardarHistoria(callbackErr, callback) {
      loader("show");
      var datos = _getObjetoSaveHc(this.global_HC8051, filtroArray.tablasHC);
      console.log(datos);

      await postData(datos, get_url("APP/HICLIN/SAVE_HC_2.DLL"))
        .then(() => {
          loader("hide");
          callback();
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          CON851("", "Error guardando datos, intente nuevamente", null, "error", "Error");
          callbackErr();
        });
    },
    async guardarDetalle8051(callbackErr, callback) {
      let detal = _getObjetoSaveHc(this.DETALLE_HISTORIA.joven8051, []);
      console.log(detal);
      detal.observ_pers = detal.observ_pers.enterReplace();
      detal.observ_fam = detal.observ_fam.enterReplace();
      detal.observacion_familia = detal.observacion_familia.enterReplace();
      detal.observacion_educacion = detal.observacion_educacion.enterReplace();
      detal.observacion_vivienda = detal.observacion_vivienda.enterReplace();
      detal.observ_trabajo = detal.observ_trabajo.enterReplace();
      detal.observaciones_social = detal.observaciones_social.enterReplace();
      detal.observ_hab_cons = detal.observ_hab_cons.enterReplace();
      detal.observaciones_gine_uro = detal.observaciones_gine_uro.enterReplace();
      detal.observaciones_sex = detal.observaciones_sex.enterReplace();
      detal.observacion_psico = detal.observacion_psico.enterReplace();

      await grabarDetalles({ 8051: detal }, $_REG_HC.llave_hc)
        .then(() => {
          callback();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error guardando datos, intente nuevamente", null, "error", "Error");
          callbackErr();
        });
    },
    validarRangosOMS(filtro, dato) {
      console.log(dato);
      var edad_meses = parseInt(this.global_HC8051.edad_dias) / 30;

      var oms = this.TABLAS_OMS.find(
        (x) =>
          x.CODIGO.trim() == filtro && x.SEXO == this.datos_paciente.SEXO && parseInt(x.RANGO) == parseInt(edad_meses)
      );
      console.log(oms);

      if (oms) {
        if (parseInt(oms.DATO_3) > 0 && dato >= parseFloat(oms.DATO_3)) {
          return "3";
        } else if (parseInt(oms.DATO_2) > 0 && dato >= parseFloat(oms.DATO_2)) {
          return "2";
        } else if (parseInt(oms.DATO_1) > 0 && dato >= parseFloat(oms.DATO_1)) {
          return "1";
        } else if (parseInt(oms.DATO_M3) > 0 && dato <= parseFloat(oms.DATO_M3)) {
          return "-3";
        } else if (parseInt(oms.DATO_M2) > 0 && dato <= parseFloat(oms.DATO_M2)) {
          return "-2";
        } else if (parseInt(oms.DATO_M1) > 0 && dato <= parseFloat(oms.DATO_M1)) {
          return "-1";
        } else {
          return "0";
        }
      } else {
        CON851("", "No se encontró tabla OMS correspondiente", null, "error", "Error");
        return "0";
      }
    },
    async calcularGraficas(codigo) {
      var _this = this;

      var info_grafica = {
        meses: [],
        oms_3: [],
        oms_2: [],
        oms_1: [],
        oms_0: [],
        oms_M1: [],
        oms_M2: [],
        oms_M3: [],
        paci: [],
      };

      var fecha_Actual = moment();
      var fecha_Nacim = moment(this.datos_paciente.NACIM).format("YYYYMMDD");

      var edadMeses = fecha_Actual.diff(fecha_Nacim, "months");
      var limite = parseInt(edadMeses) + 5;

      for (var i = 1; i < limite; i++) {
        var busqueda_oms = _this.TABLAS_OMS.find(
          (x) => x.CODIGO.trim() == codigo && x.SEXO == _this.datos_paciente.SEXO && parseInt(x.RANGO) == i
        );

        info_grafica.meses.push(i);

        if (busqueda_oms) {
          info_grafica.oms_2.push({ x: i, y: parseFloat(busqueda_oms.DATO_2) });
          info_grafica.oms_1.push({ x: i, y: parseFloat(busqueda_oms.DATO_1) });
          info_grafica.oms_0.push({ x: i, y: parseFloat(busqueda_oms.DATO_0) });
          info_grafica.oms_M1.push({ x: i, y: parseFloat(busqueda_oms.DATO_M1) });
          info_grafica.oms_M2.push({ x: i, y: parseFloat(busqueda_oms.DATO_M2) });
        }

        var busqueda_sisvan = _this.SISVAN.TABLA.find((x) => parseInt(x.EDAD_MES) == i);

        if (busqueda_sisvan) {
          switch (codigo) {
            case "TXE":
              info_grafica.paci.push({ x: i, y: parseFloat(busqueda_sisvan.TALLA) });
              break;
            case "IMC":
              info_grafica.paci.push({ x: i, y: parseFloat(busqueda_sisvan.IMC) });
              break;
          }
        }
      }

      console.log(info_grafica);
      return info_grafica;
    },
    generarPDFgraficas() {
      const { imprimir_GRAF_DES } = require("../../frameworks/pdf/hiclin/GRAF_DES.formato");

      imprimir_GRAF_DES({
        hcprc: this.global_HC8051,
        paci: $_REG_PACI,
        graficas: this.graficasPDF,
        callback: () => {
          console.log("TERMINA GRAFICAS");
        },
      });
    },
    graficarTalla() {
      var $this = this;
      if (this.graficas.talla.graf) this.graficas.talla.graf.destroy();

      this.graficas.talla.graf = new Chart(document.getElementById("grafica_talla_HC8051").getContext("2d"), {
        type: "line",
        data: {
          labels: this.graficas.talla.info.meses,
          datasets: [
            {
              fill: false,
              label: "Paciente",
              data: this.graficas.talla.info.paci,
              backgroundColor: "rgb(15, 15, 15)",
              borderColor: "rgb(15, 15, 15)",
              borderWidth: 1,
              pointRadius: 2,
            },
            {
              fill: false,
              label: "+2",
              data: this.graficas.talla.info.oms_2,
              backgroundColor: "rgb(173, 71, 71)",
              borderColor: "rgb(173, 71, 71)",
              borderWidth: 1,
              pointRadius: 0,
            },
            {
              fill: false,
              label: "+1",
              data: this.graficas.talla.info.oms_1,
              backgroundColor: "rgba(255,165,0)",
              borderColor: "rgba(255,165,0)",
              borderWidth: 1,
              pointRadius: 0,
              borderDash: [10, 5],
            },
            {
              fill: false,
              label: "Normal",
              data: this.graficas.talla.info.oms_0,
              backgroundColor: "rgb(37, 170, 79)",
              borderColor: "rgb(37, 170, 79)",
              borderWidth: 1,
              pointRadius: 0,
            },
            {
              fill: false,
              label: "-1",
              data: this.graficas.talla.info.oms_M1,
              backgroundColor: "rgba(255,165,0)",
              borderColor: "rgba(255,165,0)",
              borderWidth: 1,
              pointRadius: 0,
              borderDash: [10, 5],
            },
            {
              fill: false,
              label: "-2",
              data: this.graficas.talla.info.oms_M2,
              backgroundColor: "rgb(173, 71, 71)",
              borderColor: "rgb(173, 71, 71)",
              borderWidth: 1,
              pointRadius: 0,
            },
          ],
        },
        options: {
          tooltips: {
            mode: "x",
            // intersect: true
          },
          hover: {
            mode: "x",
            // intersect: true
          },
          animation: {
            onComplete: function (animation) {
              $this.graficasPDF.tallaXedad = this.toBase64Image();
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  labelFontWeight: "bold",
                },
                scaleLabel: {
                  display: true,
                  labelFontWeight: "bold",
                  labelString: "Talla en cm",
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  labelFontWeight: "bold",
                  autoSkip: true,
                  maxTicksLimit: 24,
                },
                scaleLabel: {
                  display: true,
                  labelFontWeight: "bold",
                  labelString: "Edad en meses",
                },
              },
            ],
          },
        },
      });
    },
    graficarIMC() {
      var $this = this;
      if (this.graficas.imc.graf) this.graficas.imc.graf.destroy();

      this.graficas.imc.graf = new Chart(document.getElementById("grafica_IMC_HC8051").getContext("2d"), {
        type: "line",
        data: {
          labels: this.graficas.imc.info.meses,
          datasets: [
            {
              fill: false,
              label: "Paciente",
              data: this.graficas.imc.info.paci,
              backgroundColor: "rgb(15, 15, 15)",
              borderColor: "rgb(15, 15, 15)",
              borderWidth: 1,
              pointRadius: 2,
            },
            {
              fill: false,
              label: "+2",
              data: this.graficas.imc.info.oms_2,
              backgroundColor: "rgb(173, 71, 71)",
              borderColor: "rgb(173, 71, 71)",
              borderWidth: 1,
              pointRadius: 0,
            },
            {
              fill: false,
              label: "+1",
              data: this.graficas.imc.info.oms_1,
              backgroundColor: "rgba(255,165,0)",
              borderColor: "rgba(255,165,0)",
              borderWidth: 1,
              pointRadius: 0,
              borderDash: [10, 5],
            },
            {
              fill: false,
              label: "Normal",
              data: this.graficas.imc.info.oms_0,
              backgroundColor: "rgb(37, 170, 79)",
              borderColor: "rgb(37, 170, 79)",
              borderWidth: 1,
              pointRadius: 0,
            },
            {
              fill: false,
              label: "-1",
              data: this.graficas.imc.info.oms_M1,
              backgroundColor: "rgba(255,165,0)",
              borderColor: "rgba(255,165,0)",
              borderWidth: 1,
              pointRadius: 0,
              borderDash: [10, 5],
            },
            {
              fill: false,
              label: "-2",
              data: this.graficas.imc.info.oms_M2,
              backgroundColor: "rgb(173, 71, 71)",
              borderColor: "rgb(173, 71, 71)",
              borderWidth: 1,
              pointRadius: 0,
            },
          ],
        },
        options: {
          tooltips: {
            mode: "x",
            // intersect: true
          },
          hover: {
            mode: "x",
            // intersect: true
          },
          animation: {
            onComplete: function (animation) {
              $this.graficasPDF.imcXedad = this.toBase64Image();
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  labelFontWeight: "bold",
                },
                scaleLabel: {
                  display: true,
                  labelFontWeight: "bold",
                  labelString: "IMC",
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  labelFontWeight: "bold",
                  autoSkip: true,
                  maxTicksLimit: 18,
                },
                scaleLabel: {
                  display: true,
                  labelFontWeight: "bold",
                  labelString: "Edad en meses",
                },
              },
            ],
          },
        },
      });
    },
    botonFlujo(param) {},
    salir_HC8051() {
      _regresar_menuhis();
    },
  },
});
