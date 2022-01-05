const {
  getObjRegEvo,
  getSintomaticoRegEvo,
  getCreatininaRegEvo,
  getDatosGuardadoEvol,
  getObjUpp,
  getObjMorse,
} = require("../../HICLIN/scripts/reg_evo.js");

new Vue({
  el: "#HC003",
  data: {
    reg_prof: {},
    datos_paciente: {},
    reg_hc: {},
    reg_evo: getObjRegEvo(),
    detalle_evo: "", // TABLA DEVO 95*300
    reg_dethc: {
      // formato_4040
      examen_obstetrico: {
        obstetric_esq_w: {},
        riesgo_biopsicosocial_esq_w: {},
        prenatal_esq_w: {},
        fecha_interconsulta_esq_w: {},
        hepatitis_b_esq_w: {},
        tabla_vih_esq_w: [],
        tabla_uroanali_esq_w: [],
      },
      // formato_9001
      escala_downton: {},
      // formato_9002
      escala_brader: {},
      // formato_9003
      lista_chequeo: {},
    },

    arrayCiudades: [],
    arrayPaises: [],
    arrayEntidades: [],
    arrayEspecialidades: [],
    arrayOcupaciones: [],

    tipos_macro: [
      { COD: "1", DESCRIP: "CIRUGIAS" },
      { COD: "2", DESCRIP: "PROCEDIMIENTOS" },
      { COD: "4", DESCRIP: "ENFERMERIA" },
      { COD: "5", DESCRIP: "MEDICINA GENERAL" },
      { COD: "6", DESCRIP: "MEDICINA ESPECIALIZADA" },
      { COD: "7", DESCRIP: "RESUMENES HISTORIA" },
      { COD: "8", DESCRIP: "TERAPIAS" },
      { COD: "9", DESCRIP: "PRE-ANESTESIA" },
      { COD: "O", DESCRIP: "ODONTOLOGIA" },
      // {COD: 'C', DESCRIP: 'CONSENTIMIENTO INFORMADO'},
      { COD: "P", DESCRIP: "PROMOCION Y PREVENCION" },
    ],
    selec_estado_mental_9001: [
      { COD: "1", DESCRIP: "ORIENTADO" },
      { COD: "2", DESCRIP: "CONFUSO" },
      { COD: "3", DESCRIP: "AGITACIÓN SICOMOTORA" },
      { COD: "0", DESCRIP: "NO APLICA" },
    ],
    selec_deambulacion_9001: [
      { COD: "1", DESCRIP: "NORMAL" },
      { COD: "2", DESCRIP: "ASISTIDA" },
      { COD: "3", DESCRIP: "POSTRADO" },
      { COD: "0", DESCRIP: "NO APLICA" },
    ],
    selec_persep_sensorial_9002: [
      { COD: "1", DESCRIP: "COMPLETAMENTE LIMITADAS" },
      { COD: "2", DESCRIP: "MUY LIMITADAS" },
      { COD: "3", DESCRIP: "LIGERAMENTE LIMITADA" },
      { COD: "4", DESCRIP: "SIN LIMITACIONES" },
    ],
    selec_humedad_9002: [
      { COD: "1", DESCRIP: "COMPLETAMENTE HUMEDO" },
      { COD: "2", DESCRIP: "HUMEDAD CON FRECUENCIA" },
      { COD: "3", DESCRIP: "OCASIONALMENTE HUMEDA" },
      { COD: "4", DESCRIP: "RARAMENTE HUMEDA" },
    ],
    selec_actividad_9002: [
      { COD: "1", DESCRIP: "POSTRADO" },
      { COD: "2", DESCRIP: "EN SILLA" },
      { COD: "3", DESCRIP: "DEAMBULA OCASIONALMENTE" },
      { COD: "4", DESCRIP: "DEAMBULA FRECUENTEMENTE" },
    ],
    selec_movilidad_9002: [
      { COD: "1", DESCRIP: "COMPLETAMENTE INMOVIL" },
      { COD: "2", DESCRIP: "MUY LIMITADA" },
      { COD: "3", DESCRIP: "LIGERAMENTE LIMITADA" },
      { COD: "4", DESCRIP: "SIN LIMITACIONES" },
    ],
    selec_nutricion_9002: [
      { COD: "1", DESCRIP: "MUY POBRE" },
      { COD: "2", DESCRIP: "PROBABLEMENTE INADECUADA" },
      { COD: "3", DESCRIP: "ADECUADA" },
      { COD: "4", DESCRIP: "EXCELENTE" },
    ],
    selec_peligro_lesion_9002: [
      { COD: "1", DESCRIP: "PROBLEMA" },
      { COD: "2", DESCRIP: "PROBLEMA POTENCIAL" },
      { COD: "3", DESCRIP: "NO EXISTE PROBLEMA APARENTE" },
    ],
    selec_ayuda_deambular_morse: [
      { COD: "1", DESCRIP: "NINGUNA/ REPOSO EN CAMA/ ASISTENCIA" },
      { COD: "2", DESCRIP: "BASTON, MULETAS, CAMINADOR" },
      { COD: "3", DESCRIP: "SILLA DE RUEDAS" },
    ],
    selec_marcha_morse: [
      { COD: "1", DESCRIP: "NORMAL/ REPOSO EN CAMA/ SILLA DE RUEDAS" },
      { COD: "2", DESCRIP: "DEBIL" },
      { COD: "3", DESCRIP: "LIMITADA" },
    ],
    selec_estado_mental_morse: [
      { COD: "1", DESCRIP: "RECONOCE SUS LIMITACIONES" },
      { COD: "2", DESCRIP: "SE SOBREESTIMA U OLVIDA SUS LIMITACIONES" },
    ],
    selec_actividad_upp: [
      { COD: "1", DESCRIP: "CONFINADO EN CAMA" },
      { COD: "2", DESCRIP: "DE CAMA A SILLA" },
      { COD: "3", DESCRIP: "DEMABULA" },
      { COD: "4", DESCRIP: "SIN LIMITACIONES" },
    ],
    selec_movilidad_upp: [
      { COD: "1", DESCRIP: "INMOVIL" },
      { COD: "2", DESCRIP: "CAMBIOS DE POSICIÓN CON AYUDA" },
      { COD: "3", DESCRIP: "CAMBIOS DE POSICIÓN CON AYUDA LIMITADO" },
      { COD: "4", DESCRIP: "SIN LIMITACIONES" },
    ],
    selec_nutricion_upp: [
      { COD: "1", DESCRIP: "MUY POBRE" },
      { COD: "2", DESCRIP: "PROBABLEMENTE INADECUADA" },
      { COD: "3", DESCRIP: "ADECUADA" },
      { COD: "4", DESCRIP: "EXCELENTE" },
    ],
    selec_friccion_ciza_upp: [
      { COD: "1", DESCRIP: "PROBLEMA VIGENTE" },
      { COD: "2", DESCRIP: "PROBLEMA POTENCIAL" },
      { COD: "3", DESCRIP: "NO HAY PROBLEMA" },
    ],
    selec_percep_senso_upp: [
      { COD: "1", DESCRIP: "COMPLETAMENTE LIMITADO" },
      { COD: "2", DESCRIP: "MUY LIMITADO" },
      { COD: "3", DESCRIP: "LIGERAMENTE LIMITADO" },
      { COD: "4", DESCRIP: "SIN LIMITACIONES" },
    ],
    selec_expo_humedad_upp: [
      { COD: "1", DESCRIP: "COMPLETAMENTE HUMEDO" },
      { COD: "2", DESCRIP: "HUMEDAD CON FRECUENCIA" },
      { COD: "3", DESCRIP: "OCASIONALMENTE HUMEDA" },
      { COD: "4", DESCRIP: "RARAMENTE HUMEDA" },
    ],

    selec_aper_ocular_glasgow: [
      { COD: "1", DESCRIP: "NINGUNA" },
      { COD: "2", DESCRIP: "AL DOLOR" },
      { COD: "3", DESCRIP: "A ORDENES" },
      { COD: "4", DESCRIP: "EXPONTANEA" },
    ],

    selec_resp_verbal_glasgow: [
      { COD: "1", DESCRIP: "NINGUNA" },
      { COD: "2", DESCRIP: "INCOMPRENSIBLE" },
      { COD: "3", DESCRIP: "INAPROPIADA" },
      { COD: "4", DESCRIP: "CONFUSA" },
      { COD: "5", DESCRIP: "ORIENTADA" },
    ],

    selec_resp_motora_glasgow: [
      { COD: "1", DESCRIP: "NINGUNA" },
      { COD: "2", DESCRIP: "DESCEREBRACIÓN" },
      { COD: "3", DESCRIP: "DECORTICACIÓN" },
      { COD: "4", DESCRIP: "RETIRA" },
      { COD: "5", DESCRIP: "LOCALIZA" },
      { COD: "6", DESCRIP: "OBEDECE ORDEN" },
    ],

    selec_planificacion: [
      { COD: "1", DESCRIP: "DIU" },
      { COD: "2", DESCRIP: "ORAL" },
      { COD: "3", DESCRIP: "BARRERA" },
      { COD: "4", DESCRIP: "OTRO" },
      { COD: "5", DESCRIP: "NINGUNO" },
      { COD: "6", DESCRIP: "DIU + BARRERA" },
      { COD: "7", DESCRIP: "IMPL.SUBDERMICO" },
      { COD: "8", DESCRIP: "I.SUBDERM+BARRERA" },
      { COD: "9", DESCRIP: "ORAL + BARRERA" },
      { COD: "A", DESCRIP: "INYECTABLE MENSUAL" },
      { COD: "B", DESCRIP: "INYECTABLE+BARRERA" },
      { COD: "C", DESCRIP: "INYECTABLE TRIMEST" },
      { COD: "D", DESCRIP: "TRIMESTRAL+BARRERA" },
      { COD: "E", DESCRIP: "EMERGENCIA" },
      { COD: "F", DESCRIP: "EMERGENCIA+BARRERA" },
      { COD: "G", DESCRIP: "ESTERILIZACION" },
      { COD: "H", DESCRIP: "ESTERILIZA+BARRERA" },
      { COD: "I", DESCRIP: "NO USA X TRADICION" },
      { COD: "J", DESCRIP: "NO USA X SALUD" },
      { COD: "K", DESCRIP: "NO USA X NEGACION" },
      { COD: "L", DESCRIP: "COITUS INTERRUPTUS" },
      { COD: "M", DESCRIP: "METODO DEL RITMO" },
    ],

    selec_causa_externa: [
      { COD: "1", DESCRIP: "ACCIDENTE DE TRABAJO" },
      { COD: "2", DESCRIP: "ACCIDENTE DE TRANSITO" },
      { COD: "3", DESCRIP: "ACCIDENTE RABICO" },
      { COD: "4", DESCRIP: "ACCIDENTE OFIDICO" },
      { COD: "5", DESCRIP: "OTRO TIPO ACCIDENTE" },
      { COD: "6", DESCRIP: "EVENTO CATASTROFICO" },
      { COD: "7", DESCRIP: "LESION POR AGRESION" },
      { COD: "8", DESCRIP: "LESION AUTOINFLIGIDA" },
      { COD: "9", DESCRIP: "SOSPECHA MALTRATO FISICO" },
      { COD: "10", DESCRIP: "SOSPECHA ABUSO SEXUAL" },
      { COD: "11", DESCRIP: "SOSPECHA VIOLENCIA SEXUAL" },
      { COD: "12", DESCRIP: "SOSPECHA MALTRATO EMOCION" },
      { COD: "13", DESCRIP: "ENFERMEDAD GENERAL" },
      { COD: "14", DESCRIP: "ENFERMEDAD PROFESIONAL" },
      { COD: "15", DESCRIP: "NO APLICA" },
    ],

    selec_embarazo: [
      { COD: "1", DESCRIP: "EMBARAZO PRIMER TIMESTRE" },
      { COD: "2", DESCRIP: "EMBARAZO SEGUND TIMESTRE" },
      { COD: "3", DESCRIP: "EMBARAZO TERCER TIMESTRE" },
      { COD: "4", DESCRIP: "NO ESTA EMBARAZADA" },
    ],

    // array operadores
    operadores: [],

    // array datos f8 macros
    array_macros: [{ CLASE: "", CODIGO: "", DETALLE: "", FORMATO: "" }],
    // array datos f8 vias
    array_vias: [{ CODIGO: "", NOMBRE: "" }],
    // array datos vias macro seleccionada
    vias_macro: [],

    // array datos enfermedades
    array_enfermedades: [],
    array_patologias: [],
    diagnosticos: [
      { CODIGO: "", DESCRIP: "" },
      { CODIGO: "", DESCRIP: "" },
      { CODIGO: "", DESCRIP: "" },
      { CODIGO: "", DESCRIP: "" },
      { CODIGO: "", DESCRIP: "" },
    ],

    params_lista_chequeo: {
      estado: false,
      fecha: null,
      sexo: null,
      peso: null,
      edad: null,
      nit_usu: null,
      unserv: null,
      atiende: null,
      esp_prof: [],
      diag: [],
    },

    params_admin_liquidos: {
      estado: false,
    },

    params_sintomatico: {
      estado: false,
      unserv: false,
      finalidad: false,
      sexo: false,
    },

    mostrarHC604: false,
    mostrarOpcImp: false,

    paramsHC604: {
      estado: false,
    },

    datosHC604: {
      admin: localStorage.Usuario,
      llave: {
        id: $_REG_HC.llave_hc.slice(0, 15),
        folio: $_REG_HC.llave_hc.slice(15),
      },
      edad: {
        unidad: $_REG_HC.edad_hc.unid_edad,
        valor: $_REG_HC.edad_hc.vlr_edad,
      },
      medico: localStorage.IDUSU,
    },

    datos_sintomatico: getSintomaticoRegEvo(),

    params_creatinina: {
      estado: false,
    },

    datos_creatinina: {
      fecha: null,
      peso: null,
      edad: null,
      unserv: null,
      tabla_diagn: null,

      creatinina2: null,
      hemo_glicosilada: null,
      hemo_glico_fecha: null,
      microalbuminuria: null,
      fecha_microalbuminuria: null,
      riesgo_cardio: null,
      rela_albumi_creatini_1: null,
      rela_albumi_creatini_2: null,
      erc: null,
      fecha_dx_erc: null,
      fecha_creatinina: null,
      estadio_erc: null,
    },

    params_HC9012: {
      estado: false,
      paso: null
    },

    mostrarHC9012: false,

    existe_9003: false,

    morse: getObjMorse(),

    ult_morse: {
      fecha: "",
      calc: "",
    },

    habilitar_morse: false,

    riesgo_morse: {
      bajo: `Cuidados básicos de enfermería: \n* Cama en posición más baja excepto cuando se realicen cuidados de enfermería.\n* Asegúrese de que el paciente tiene los objetos necesarios al alcance (timbre).\n* Evalúe el entorno (iluminación, derrame en el piso).\n* Promueva la rutina de baño.\n`,
      medio: `Estrategias adicionales: \n* Reoriente el paciente si esta desorientado.\n* Evalúe el paciente con relación al uso de barandas.\n* Eduque los pacientes en seguridad.\n`,
      alto: ` * Posición del paciente en un área de facil observación.\n* Barandas siempre arriba.\n* Dejar patos al alcance del paciente.\n* Dejar llamado de enfermería en cabecera.\n* Dejar familiar para que ayude al paciente.\n* Si el paciente esta agitado inmovilizarlo e informar al médico\n`,
    },

    upp: getObjUpp(),

    ult_upp: {
      fecha: "",
      calc: "",
    },

    habilitar_upp: false,

    riesgo_upp: `CUIDADOS\n* Mantener piel integra: Cuidados de piel, control de exceso de humedad, cambios de posicion cada 2 horas prevenir friccion o cizallamiento, aportar dieta adecuada.\n* Evaluar y reevaluar en cada turno riesgo de UPP y factores predisponentes.`,

    evaluar_upp: false,
    riesgo_upp: "",
    anio_act: 0,
    mes_act: 0,
    dia_act: 0,
    anio_sist: 0,
    mes_sist: 0,
    dia_sist: 0,
    hora_sist: 0,
    minuto_sist: 0,
    nit_usu: 0,
    admin_w: "",
    oper_elab: "",
    tipo_w: 0,
    vlr_edad_w: "",
    unid_edad_w: "",
    flag_oper: false,
    novedad_w: 0,
    descrip_novedad: "CREANDO EVOLUCIÓN ENFERMERÍA",
    descrip_unserv: "",
    escala_downton_braden: false,
    sw_embarzo: false,
    paso_embarazo: false,
    peso_w: 0,
    operaciones: {
      sup: "",
    },

    sol_med_general: "",

    anio_regla_emb: 0,
    mes_regla_emb: 0,
    dia_regla_emb: 0,

    mask_perimetro: IMask.createMask({
      mask: Number,
      radix: ".",
      padFractionalZeros: true,
      signed: false,
      scale: 1,
      min: 0000,
      max: 999.9,
    }),
    mask_temp: IMask.createMask({
      mask: Number,
      radix: ".",
      padFractionalZeros: true,
      signed: false,
      scale: 2,
      min: 0.0,
      max: 99.99,
    }),
    mask_g_urin: IMask.createMask({
      mask: Number,
      radix: ".",
      padFractionalZeros: true,
      signed: false,
      scale: 2,
      min: 0000,
      max: 9.99,
    }),

    mask3Int1Dec: IMask.createMask({
      mask: Number,
      radix: ".",
      padFractionalZeros: true,
      signed: false,
      scale: 1,
      min: 0000,
      max: 999.9,
    }),

    mask2Int1Dec: IMask.createMask({
      mask: Number,
      radix: ".",
      padFractionalZeros: true,
      signed: false,
      scale: 1,
      min: 000,
      max: 99.9,
    }),

    mask5Int1Dec: IMask.createMask({
      mask: Number,
      radix: ".",
      padFractionalZeros: true,
      signed: false,
      scale: 1,
      min: 0,
      max: 99999.9,
    }),
  },
  components: {
    lista_chequeo_9003,
    sintomaticos: component_hc890d,
    admin_liquidos,
    creatinina: require("../../HICLIN/scripts/HC890A.vue.js"),
    "nuevo-folio": component_hc604,
    hc9012: require("../../HICLIN/scripts/HC-9012.vue"),
  },
  async created() {
    nombreOpcion("5-1 - Notas Enfermería");
    loader("show");
    _vm = this;
    this.init();
  },
  computed: {
    fecha_act() {
      return (
        this.anio_act.toString().padStart(4, "0") +
        this.mes_act.toString().padStart(2, "0") +
        this.dia_act.toString().padStart(2, "0")
      );
    },

    fecha_sist() {
      return (
        this.anio_sist.toString().padStart(4, "0") +
        this.mes_sist.toString().padStart(2, "0") +
        this.dia_sist.toString().padStart("0")
      );
    },

    fecha_ant() {
      return moment(this.fecha_act).subtract(1, "days").format("YYYYMMDD");
    },

    cod_prof() {
      return parseInt(this.reg_prof.IDENTIFICACION);
    },

    nom_prof() {
      if (this.reg_prof.DESCRIP) {
        return this.reg_prof.DESCRIP.replace(/\s+/g, " ");
      } else {
        return "";
      }
    },

    descrip_tipo_macro() {
      let tipo = this.tipos_macro.find((el) => el.COD.trim() == this.reg_evo.MACRO.CLASE.trim());
      if (tipo) return Object.values(tipo).join(". ");
    },

    detalle_macro() {
      let detalle = this.array_macros.find(
        (el) =>
          el.CLASE.trim() == this.reg_evo.MACRO.CLASE.trim() && el.CODIGO.trim() == this.reg_evo.MACRO.CODIGO.trim()
      );
      if (detalle) return detalle.DETALLE.trim();
    },

    detalle_via() {
      let detalle = this.array_vias.find((el) => el.CODIGO.trim() == this.reg_evo.MACRO.VIA.trim());
      if (detalle) return detalle.NOMBRE.trim();
    },

    resp_ocular() {
      let resp = this.selec_aper_ocular_glasgow.find((el) => el.COD.trim() == this.reg_evo.SIGNOS_VITALES.APER_OCUL);

      if (resp) {
        return Object.values(resp).join(". ");
      } else {
        return "";
      }
    },

    resp_verbal() {
      let resp = this.selec_resp_verbal_glasgow.find((el) => el.COD.trim() == this.reg_evo.SIGNOS_VITALES.RESP_VERB);

      if (resp) {
        return Object.values(resp).join(". ");
      } else {
        return "";
      }
    },

    resp_motora() {
      let resp = this.selec_resp_motora_glasgow.find((el) => el.COD.trim() == this.reg_evo.SIGNOS_VITALES.RESP_MOTO);

      if (resp) {
        return Object.values(resp).join(". ");
      } else {
        return "";
      }
    },

    vlr_glasgow() {
      let aper_ocul = parseInt(this.reg_evo.SIGNOS_VITALES.APER_OCUL) || 0;
      let resp_verb = parseInt(this.reg_evo.SIGNOS_VITALES.RESP_VERB) || 0;
      let resp_moto = parseInt(this.reg_evo.SIGNOS_VITALES.RESP_MOTO) || 0;
      let vlr_glas = aper_ocul + resp_verb + resp_moto;
      this.reg_evo.SIGNOS_VITALES.VLR_GLASG = vlr_glas;
      return `${vlr_glas} /15`;
    },

    descrip_estado_mental_9001() {
      if (this.reg_dethc.escala_downton.estado_mental_9001.trim()) {
        return this.selec_estado_mental_9001
          .find((el) => el.COD.trim() == this.reg_dethc.escala_downton.estado_mental_9001.trim())
          .DESCRIP.trim();
      } else {
        return "";
      }
    },

    descrip_deambulacion_9001() {
      if (this.reg_dethc.escala_downton.deambulacion_9001.trim()) {
        return this.selec_deambulacion_9001
          .find((el) => el.COD.trim() == this.reg_dethc.escala_downton.deambulacion_9001.trim())
          .DESCRIP.trim();
      } else {
        return "";
      }
    },

    descrip_percep_sensorial_9002() {
      if (this.reg_dethc.escala_brader.presep_senso_9002.trim()) {
        return this.selec_persep_sensorial_9002
          .find((el) => el.COD.trim() == this.reg_dethc.escala_brader.presep_senso_9002.trim())
          .DESCRIP.trim();
      } else {
        return "";
      }
    },

    descrip_humedad_9002() {
      if (this.reg_dethc.escala_brader.humedad_9002.trim()) {
        return this.selec_humedad_9002
          .find((el) => el.COD.trim() == this.reg_dethc.escala_brader.humedad_9002.trim())
          .DESCRIP.trim();
      } else {
        return "";
      }
    },

    descrip_actividad_9002() {
      if (this.reg_dethc.escala_brader.actividad_9002.trim()) {
        return this.selec_actividad_9002
          .find((el) => el.COD.trim() == this.reg_dethc.escala_brader.actividad_9002.trim())
          .DESCRIP.trim();
      } else {
        return "";
      }
    },

    descrip_movilidad_9002() {
      if (this.reg_dethc.escala_brader.movilidad_9002.trim()) {
        return this.selec_movilidad_9002
          .find((el) => el.COD.trim() == this.reg_dethc.escala_brader.movilidad_9002.trim())
          .DESCRIP.trim();
      } else {
        return "";
      }
    },

    descrip_nutricion_9002() {
      if (this.reg_dethc.escala_brader.nutricion_9002.trim()) {
        return this.selec_nutricion_9002
          .find((el) => el.COD.trim() == this.reg_dethc.escala_brader.nutricion_9002.trim())
          .DESCRIP.trim();
      } else {
        return "";
      }
    },

    descrip_peligro_lesiones_9002() {
      if (this.reg_dethc.escala_brader.peligro_lesion_9002.trim()) {
        return this.selec_peligro_lesion_9002
          .find((el) => el.COD.trim() == this.reg_dethc.escala_brader.peligro_lesion_9002.trim())
          .DESCRIP.trim();
      } else {
        return "";
      }
    },

    descrip_ayuda_deambular_morse() {
      if (this.morse.ayuda_deambular) {
        return this.selec_ayuda_deambular_morse.find((el) => el.COD.trim() == this.morse.ayuda_deambular).DESCRIP;
      } else {
        return "";
      }
    },

    descrip_marcha_morse() {
      if (this.morse.marcha) {
        return this.selec_marcha_morse.find((el) => el.COD.trim() == this.morse.marcha).DESCRIP;
      } else {
        return "";
      }
    },

    descrip_estado_mental_morse() {
      if (this.morse.estado_mental) {
        return this.selec_estado_mental_morse.find((el) => el.COD.trim() == this.morse.estado_mental).DESCRIP;
      } else {
        return "";
      }
    },

    calc_morse() {
      let puntaje = 0;
      if (this.morse.historial_caidas == "S") puntaje += 25;
      if (this.morse.dx_secu_caidas == "S") puntaje += 25;
      switch (this.morse.ayuda_deambular) {
        case "2":
          puntaje += 15;
          break;
        case "3":
          puntaje += 25;
          break;
      }
      if (this.morse.venoclisis == "S") puntaje += 25;
      switch (this.morse.marcha) {
        case "2":
          puntaje += 10;
          break;
        case "3":
          puntaje += 20;
          break;
      }
      if (this.morse.estado_mental == "2") puntaje += 15;

      return puntaje;
    },

    descrip_percep_senso_upp() {
      let label = "";
      if (this.upp.percep_senso.trim()) {
        label = this.selec_percep_senso_upp.find((el) => el.COD.trim() == this.upp.percep_senso.trim());
        return label ? label.DESCRIP : "";
      } else {
        return "";
      }
    },

    descrip_expo_humedad_upp() {
      let label = "";
      if (this.upp.expo_humedad.trim()) {
        label = this.selec_expo_humedad_upp.find((el) => el.COD.trim() == this.upp.expo_humedad.trim());
        return label ? label.DESCRIP : "";
      } else {
        return "";
      }
    },

    descrip_actividad_upp() {
      let label = "";
      if (this.upp.actividad.trim()) {
        label = this.selec_actividad_upp.find((el) => el.COD.trim() == this.upp.actividad.trim());
        return label ? label.DESCRIP : "";
      } else {
        return "";
      }
    },

    descrip_movilidad_upp() {
      let label = "";
      if (this.upp.movilidad.trim()) {
        label = this.selec_movilidad_upp.find((el) => el.COD.trim() == this.upp.movilidad.trim());
        return label ? label.DESCRIP : "";
      } else {
        return "";
      }
    },

    descrip_nutricion_upp() {
      let label = "";
      if (this.upp.nutricion.trim()) {
        label = this.selec_nutricion_upp.find((el) => el.COD.trim() == this.upp.nutricion.trim());
        return label ? label.DESCRIP : "";
      } else {
        return "";
      }
    },

    descrip_friccion_ciza_upp() {
      let label = "";
      if (this.upp.friccion_ciza.trim()) {
        label = this.selec_friccion_ciza_upp.find((el) => el.COD.trim() == this.upp.friccion_ciza.trim());
        return label ? label.DESCRIP : "";
      } else {
        return "";
      }
    },

    calc_upp() {
      let puntaje = 0;
      puntaje += parseInt(this.upp.percep_senso) || 0;
      puntaje += parseInt(this.upp.expo_humedad) || 0;
      puntaje += parseInt(this.upp.actividad) || 0;
      puntaje += parseInt(this.upp.movilidad) || 0;
      puntaje += parseInt(this.upp.nutricion) || 0;
      puntaje += parseInt(this.upp.friccion_ciza) || 0;
      return puntaje;
    },

    descrip_causa_externa() {
      let causa = this.selec_causa_externa.find((el) => el.COD.trim() == this.reg_evo.RIPS.CAUSA.trim());

      return causa ? causa.DESCRIP : "";
    },

    descrip_embarazo() {
      let embarazo = this.selec_embarazo.find((el) => el.COD.trim() == this.reg_evo.RIPS.EMBAR.trim());

      return embarazo ? embarazo.DESCRIP : "";
    },

    descrip_finalidad() {
      let finalidad = parseInt(this.reg_evo.RIPS.FINALID) || 0;
      let unid_edad = this.unid_edad_w;
      let vlr_edad = parseInt(this.vlr_edad_w) || 0;

      let text = "";

      switch (finalidad) {
        case 0:
          text = "";
          break;
        case 1:
          text = "ATENCION PARTO";
          break;
        case 2:
          text = "ATENCION REC.NACIDO";
          break;
        case 3:
          text = "ATENC.PLANIF.FAMILIAR";
          break;
        case 4:
          if (unid_edad == "D" || unid_edad == "M" || (unid_edad == "A" && vlr_edad < 6)) {
            text = "PRIMERA INFANCIA";
          } else {
            text = "INFANCIA";
          }
          break;
        case 5:
          if (unid_edad == "A" && vlr_edad > 11 && vlr_edad < 29) {
            if (vlr_edad > 11 && vlr_edad < 18) {
              text = "ADOLESCENCIA";
            } else {
              text = "JUVENTUD";
            }
          }
          break;
        case 6:
          text = "DET.ALT.EMBARAZO";
          break;
        case 7:
          if (unid_edad == "A") {
            if (vlr_edad > 28 && vlr_edad <= 59) text = "ADULTEZ";
            if (vlr_edad >= 60) text = "VEJEZ";
          }
          break;
        case 8:
          text = "DET.ALT.AGUD.VISUA";
          break;
        case 9:
          text = "DET.ENFERM.PROFES.";
          break;
        case 10:
          text = "NO APLICA.";
          break;
        case 11:
          text = "PATOLOGIA CRONICA";
          break;
        default:
          text = "";
          break;
      }

      return text;
    },

    descrip_patologia() {
      let patologia = this.array_patologias.find((el) => el.COD.trim() == this.reg_evo.CRONICO.trim());

      return patologia ? patologia.DESCRIP.trim() : "";
    },

    descrip_estadio_tanner() {
      return this.reg_paci.SEXO == "F" ? "Estadio mamario" : "Estadio genital";
    },

    descrip_plan_familiar() {
      let plan = this.selec_planificacion.find((el) => el.COD.trim() == this.reg_evo.EMBAR.PLANIFIC.trim());

      return plan ? plan.DESCRIP : "";
    },
  },
  methods: {
    async init() {
      switch (localStorage.idOpciondata) {
        case "051":
          this.tipo_w = 2;
          break;
      }

      _inputControl("disabled");
      _inputControl("reset");

      [this.anio_sist, this.mes_sist, this.dia_sist] = [this.anio_act, this.mes_act, this.dia_act] = moment()
        .format("YYYY-MM-DD")
        .split("-");
      [this.hora_sist, this.minuto_sist] = moment().format("HH-mm").split("-");

      this.nit_usu = parseInt($_USUA_GLOBAL[0].NIT);
      this.admin_w = localStorage.Usuario;

      this.reg_paci = JSON.parse(JSON.stringify($_REG_PACI));

      this.params_sintomatico.sexo = this.reg_paci.SEXO;

      this.unid_edad_w = $_REG_HC.edad_hc.unid_edad;
      this.vlr_edad_w = $_REG_HC.edad_hc.vlr_edad;

      await this.get_profesional();
    },

    async get_profesional() {
      const _this = this;

      postData(
        {
          datosh: datosEnvio() + localStorage.IDUSU,
        },
        get_url("APP/SALUD/SAL719-01.DLL")
      )
        .then((data) => {
          loader("hide");
          _this.reg_prof = data.PERSATI[0];

          let atiende = _this.reg_prof.ATIENDE;
          if (
            _this.admin_w == "GEBC" ||
            (_this.nit_usu == 800037021 && _this.admin_w == "ADMI") ||
            (_this.tipo_w == 6 && atiende == "I") ||
            ((_this.tipo_w == 2 || _this.tipo_w == 5) &&
              (atiende != 1 ||
                atiende != 2 ||
                atiende != 5 ||
                atiende != 7 ||
                atiende != 8 ||
                atiende != 9 ||
                atiende != "A" ||
                atiende != "O"))
          ) {
            _this.get_enfermedades();
            _this.get_patologias();
            _this.get_historia();
          } else {
            loader("hide");
            CON851("15", "15", null, "error", "Error");
            this.salir_hc003();
          }
        })
        .catch((err) => {
          loader("hide");
          CON851("", "leyendo profesionales", null, "error", "Error");
          console.log("Error leyendo profesionales", err);
          this.salir_hc003();
        });
    },

    get_historia() {
      const _this = this;
      loader("show");

      postData(
        {
          datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + _this.admin_w + "|1|",
        },
        get_url("APP/HICLIN/HC_PRC.DLL")
      )
        .then((data) => {
          loader("hide");
          console.log("Historia clinica: ", data);
          _this.reg_hc = data.HCPAC;

          if (_this.reg_hc.novedad != "8") {
            CON851P(
              "13",
              () => {
                this.salir_hc003();
              },
              () => {
                this.mostrarHC604 = true;
                setTimeout(() => {
                  this.paramsHC604.estado = true;
                });
              }
            );
            // jAlert(
            //   {
            //     titulo: "ATENCION!",
            //     mensaje: "<b>Mensaje: </b>No existe Historia clínica!<br>",
            //   },
            //   () => {
            //     setTimeout(() => {
            //       salir_hc003();
            //     }, 300);
            //   }
            // );
          } else {
            _this.get_detalles_hc();
          }
        })
        .catch((err) => {
          loader("hide");
          console.log("Error leyendo historia clinica ", err);
          CON851("", "leyendo Historia clinica", null, "error", "Error");
          this.salir_hc003();
        });
    },

    validarEsc_nuevoFolio() {
      this.mostrarHC604 = this.paramsHC604.estado = false;
      CON851P(
        "03",
        () => {
          this.salir_hc003();
        },
        () => {
          this.get_historia();
        }
      );
    },

    async validarCallback_nuevoFolio() {
      this.mostrarHC604 = this.paramsHC604.estado = false;
      this.datoVacunacionCovid19();
    },

    async datoVacunacionCovid19() {
      if (
        ($_REG_HC.serv_hc == "08" && (this.reg_prof.ATIENDE == "3" || this.reg_prof.ATIENDE == "4")) ||
        ($_REG_HC.serv_hc == "08" && localStorage.Usuario == "GEBC")
      ) {
        CON851P(
          "58",
          () => {
            this.get_historia();
          },
          () => {
            this.pasoHC9012();
          }
        );
      } else {
        this.get_historia();
      }
    },

    validarEsc_HC9012() {
      this.params_HC9012.estado = this.mostrarHC9012 = false;
      this.get_historia();
    },

    async pasoHC9012() {
      this.mostrarHC9012 = true;
      setTimeout(() => {
        this.params_HC9012.paso = 2;
        this.params_HC9012.estado = true;
      }, 200);
    },

    validarCallback_HC9012(data) {
      this.params_HC9012.estado = this.mostrarHC9012 = false;
      this.get_historia();
    },

    get_detalles_hc() {
      let _this = this;

      postData(
        {
          datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + "  " + "|" + "  " + "|" + "4040;9001;9002;9003" + "|",
        },
        get_url("APP/HICLIN/HCDETAL_PRC.DLL")
      )
        .then((data) => {
          loader("hide");
          console.log("Detalles de historia: ", data);

          let formato_4040 = data.DETHC.find((el) => el["COD-DETHC"] == "4040");
          if (formato_4040) _this.reg_dethc.examen_obstetrico = formato_4040;

          let formato_9001 = data.DETHC.find((el) => el["COD-DETHC"] == "9001");
          if (formato_9001) _this.reg_dethc.escala_downton = formato_9001;

          let formato_9002 = data.DETHC.find((el) => el["COD-DETHC"] == "9002");
          if (formato_9002) _this.reg_dethc.escala_brader = formato_9002;

          let formato_9003 = data.DETHC.find((el) => el["COD-DETHC"] == "9003");
          if (formato_9003) {
            _this.reg_dethc.lista_chequeo = formato_9003;
            _this.existe_9003 = true;
          } else {
            _this.existe_9003 = false;
          }

          _this.ubicar_fecha();
        })
        .catch((err) => {
          loader("hide");
          CON851("", "consultando detalles de historia!", null, "error", "Error");
          this.salir_hc003();
        });
    },

    ubicar_fecha() {
      let _this = this;

      _this.oper_elab = _this.admin_w;

      if (_this.nit_usu == 900030814 || _this.nit_usu == 800037202 || _this.nit_usu == 830511298) {
        _this.dato_anio();
      } else if (
        _this.admin_w == "GEBC" ||
        (_this.nit_usu == 800037021 && _this.admin_w == "ADMI") ||
        _this.nit_usu == 900450008 ||
        _this.nit_usu == 901146885
      ) {
        _this.dato_anio();
      } else if (
        _this.nit_usu == 800037021 ||
        _this.nit_usu == 892000401 ||
        _this.nit_usu == 891855847 ||
        _this.nit_usu == 844001284 ||
        _this.nit_usu == 892000458
      ) {
        _this.get_evolucion();
      } else if (parseInt(_this.hora_sist) < 4) {
        _this.dato_dia();
      } else {
        _this.dato_hora();
      }
    },

    dato_anio() {
      let _this = this;
      validarInputs(
        {
          form: "#validar_anio_HC003",
          orden: "1",
        },
        () => {
          CON851P("03", _this.dato_anio, () => {
            setTimeout(() => {
              this.salir_hc003();
            }, 300);
          });
        },
        () => {
          _this.dato_mes();
        }
      );
    },

    dato_mes() {
      let _this = this;
      validarInputs(
        {
          form: "#validar_mes_HC003",
          orden: "1",
        },
        () => {
          if (_this.mes_act == "01" && _this.dia_act < 3) {
            _this.dato_anio();
          } else {
            CON851P("03", _this.dato_mes, () => {
              setTimeout(() => {
                this.salir_hc003();
              }, 300);
            });
          }
        },
        () => {
          _this.mes_sist = _this.mes_sist.toString().padStart(2, "0");
          if (parseInt(_this.mes_sist) < 1 || parseInt(_this.mes_sist) > 12) {
            _this.dato_mes();
          } else {
            _this.dato_dia();
          }
        }
      );
    },

    dato_dia() {
      let _this = this;
      validarInputs(
        {
          form: "#validar_dia_HC003",
          orden: "1",
          event_f5: () => {
            CON851P("03", _this.dato_dia, () => {
              setTimeout(() => {
                this.salir_hc003();
              }, 300);
            });
          },
        },
        () => {
          if (_this.dia_act == "01" || this.nit_usu == 892000264) {
            _this.dato_mes();
          } else {
            _this.dato_dia();
          }
        },
        () => {
          _this.dia_sist = _this.dia_sist.toString().padStart(2, "0");
          if (!_validarFecha(_this.anio_sist, _this.mes_sist, _this.dia_sist)) {
            CON851("37", "37", null, "warning", "Advertencia");
            _this.dato_anio();
          } else if (
            (parseInt(_this.fecha_sist) < parseInt(_this.fecha_ant) && this.nit_usu != 892000264) ||
            parseInt(_this.fecha_sist) > parseInt(_this.fecha_act)
          ) {
            CON851("37", "37", null, "warning", "Advertencia");

            if (
              _this.nit_usu == 900030814 ||
              _this.nit_usu == 800037202 ||
              _this.nit_usu == 901146885 ||
              _this.nit_usu == 900030814
            ) {
              _this.dato_hora();
            } else {
              _this.dato_anio();
            }
          } else {
            _this.dato_hora();
          }
        }
      );
    },

    dato_hora() {
      let hora_w = moment().format("HH");

      let _this = this;
      validarInputs(
        {
          form: "#valiadr_hora_HC003",
          orden: "1",
          event_f5: function () {
            CON851P("03", _this.dato_hora, () => {
              setTimeout(() => {
                _this.salir_hc003();
              }, 300);
            });
          },
        },
        () => {
          if (_this.hora_sist < 7 || this.nit_usu == 892000264) {
            _this.dato_dia();
          } else {
            _this.dato_hora();
          }
        },
        () => {
          if (_this.hora_sist < 0 || _this.hora_sist > 23) {
            _this.dato_hora();
          } else if (
            _this.nit_usu == 900565371 &&
            ((parseInt(_this.fecha_sist) == parseInt(_this.fecha_ant) && _this.hora_sist < 19) ||
              parseInt(_this.fecha_sist) > parseInt(_this.fecha_act))
          ) {
            CON851("37", "37", null, "warning", "Advertencia");
            _this.dato_hora();
          } else if (
            (parseInt(_this.fecha_sist) == parseInt(_this.fecha_act) && parseInt(_this.hora_sist) > parseInt(hora_w)) ||
            (parseInt(_this.fecha_sist) == parseInt(_this.fecha_act) && parseInt(_this.hora_sist < 19))
          ) {
            CON851("37", "37", null, "warning", "Advertencia");

            if (_this.nit_usu == 900450008 || _this.nit_usu == 901146885 || _this.nit_usu == 900030814) {
              _this.dato_minuto();
            } else {
              _this.dato_hora();
            }
          } else {
            _this.dato_minuto();
          }
        }
      );
    },

    dato_minuto() {
      let _this = this;
      validarInputs(
        {
          form: "#validar_minuto_HC003",
          orden: "1",
        },
        () => {
          _this.dato_hora();
        },
        () => {
          if (_this.minuto_sist < 0 || _this.minuto_sist > 59) {
            _this.dato_minuto();
          } else {
            _this.dato_operador();
          }
        }
      );
    },

    async dato_operador() {
      let _this = this;

      if (_this.admin_w == "GEBC" || (_this.nit_usu == 800037021 && _this.admin_w == "ADMI")) {
        await _this.get_operadores();

        validarInputs(
          {
            form: "#validar_operador_HC003",
            orden: "1",
          },
          () => {
            _this.dato_hora();
          },
          () => {
            postData(
              {
                datosh: datosEnvio() + _this.oper_elab + "|",
              },
              get_url("APP/CONTAB/CON003.DLL")
            )
              .then((data) => {
                console.log("Operadores:", data);
                let nombre_oper = data.split("|")[0];

                if (
                  _this.admin_w == "GEBC" ||
                  (_this.nit_usu == 800037021 && _this.admin_w == "ADMI") ||
                  nombre_oper.slice(0, 4) == _this.oper_elab
                ) {
                  _this.get_evolucion();
                } else {
                  CON851("01", "01", null, "error", "Error");
                  _this.dato_operador();
                }
              })
              .catch((err) => {
                console.log("Error validando operador", err);
                this.salir_hc003();
              });
          }
        );
      } else {
        _this.get_evolucion();
      }
    },

    get_evolucion() {
      loader("show");

      postData(
        {
          datosh:
            datosEnvio() +
            this.reg_hc.llave +
            "|" +
            this.oper_elab +
            "|" +
            this.reg_prof.IDENTIFICACION.padStart(10, "0") +
            "|" +
            this.fecha_sist +
            "|" +
            this.hora_sist +
            this.minuto_sist +
            "|" +
            "CONS" +
            "|",
        },
        get_url("APP/HICLIN/HC002.DLL")
      )
        .then((data) => {
          loader("hide");

          this.reg_evo = {
            ...this.reg_evo,
            ...data.EVOLUCION[0],
          };

          this.morse = getObjMorse();
          this.ult_morse = {};
          this.upp = getObjUpp();
          this.ult_upp = {};
          this.habilitar_morse = false;
          this.habilitar_upp = false;

          if (this.reg_evo.NOVEDAD == 7) {
            if (this.admin_w == "GEBC") {
              CON851("08", "08", null, "warning", "Advertencia");
              this.dato_operador();
            } else {
              this.init_evo();
            }
          } else {
            this.get_detalle_evo();
          }
        })
        .catch((err) => {
          loader("hide");
          console.log("Error leyendo evoluciones: ", err);
          CON851("", "consultando datos evolucion", null, "error", "Error");
          this.ubicar_fecha();
        });
    },

    get_detalle_evo() {
      postData(
        {
          datosh:
            datosEnvio() +
            this.reg_hc.llave +
            "|" +
            this.reg_evo.FECHA_EVO +
            "|" +
            this.reg_evo.HORA_EVO +
            "|" +
            this.reg_evo.OPER_EVO +
            "|1|CONS|",
        },
        get_url("APP/HICLIN/HCDETA_EVO.DLL")
      )
        .then((data) => {
          console.log("Detalles evolucion: ", data);
          this.detalle_evo = data.DETALLE_EVO[0].CONTENIDO.replace(/\&/g, "\n").trim();

          let msj = `Este paciente ya tiene una EVOLUCIÓN clínica abierta, con fecha ${this.reg_evo.ANO_EVO}/${this.reg_evo.MES_EVO}/${this.reg_evo.DIA_EVO}`;

          jAlert(
            {
              titulo: "ATENCION!",
              mensaje: "<b>Mensaje: </b>" + msj + "<br>",
            },
            () => {
              setTimeout(() => {
                if (this.admin_w == "GEBC") {
                  this.inicio();
                } else {
                  this.dato_hora();
                }
              }, 300);
            }
          );
        })
        .catch((err) => {
          console.log("Error leyendo detalles evolucion: ", err);
          CON851("", "leyendo detalles de evolución", null, "error", "Error");
          this.ubicar_fecha();
        });
    },

    async init_evo() {
      let _this = this;

      _this.reg_evo.TIPO = _this.tipo_w;
      _this.reg_evo.MEDICO = _this.cod_prof.toString().padStart(10, "0");
      _this.reg_evo.UNSERV = _this.reg_hc.cierre.unserv; // RM MUEVE UNSERV-W DESDE LINKEGE - PENDIENTE REVISAR ESTE DATO
      _this.reg_evo.RIPS.UNID_EDAD = $_REG_HC.edad_hc.unid_edad;
      _this.reg_evo.RIPS.EDAD = $_REG_HC.edad_hc.vlr_edad;
      _this.reg_evo.HAB = _this.reg_hc.cierre.hab;

      // valida escala de morse
      if (
        (_this.nit_usu == 800037021 || _this.nit_usu == 901146885 || _this.nit_usu == 900450008) &&
        _this.reg_evo.HORA_EVO >= 1400 &&
        _this.reg_evo.HORA_EVO <= 2200
      ) {
        await _this.get_morse();
      } else {
        _this.habilitar_morse = _this.habilitar_upp = false;
      }

      try {
        await _this.get_macros();
        await _this.get_vias();

        _this.inicio();
      } catch (err) {
        _this.ubicar_fecha();
      }
    },

    async inicio() {
      let _this = this;

      if (_this.reg_evo.NOVEDAD == "8") {
        _this.descrip_novedad = "ACTUALIZANDO EVOLUCION";
      } else {
        _this.descrip_novedad = "CREANDO EVOLUCIÓN ENFERMERÍA";
      }

      CON851P(
        "¿Desea ver las evoluciones anteriores?",
        () => {
          _this.ventana_unserv();
        },
        () => {
          iniciar_HC002B(2);
          _this.ventana_unserv();
        })
    },

    ventana_unserv() {
      let _this = this;
      console.log("ventana unidad de servicio");
      if (_this.tipo_w == 6) {
        console.log("Dato evolucion:"); // PENDIENTE
      } else {
        setTimeout(() => {
          SER873(
            () => {
              CON851P("03", _this.ventana_unserv, _this.salir_hc003);
            },
            _this.dato_unidad,
            _this.reg_evo.UNSERV
          );
        }, 300);
      }
    },

    dato_unidad(unserv) {
      this.reg_evo.UNSERV = unserv.COD.padStart(2, "0");
      this.descrip_unserv = `${unserv.COD}. ${unserv.DESCRIP.trim()}`;

      if (unserv.ESTADO == "N") {
        CON851("13", "13", null, "warning", "Advertencia");
        this.ventana_unserv();
      } else if (this.reg_evo.UNSERV == "63") {
        this.paso_escala_braden_downton();
      } else if (this.nit_usu == 900565371) {
        //GEBC YEIMI SOLICITA QUE ALBERGUE SUKURAMI SE OMITAN VARIAS PREGUNTAS DE LA EVOLUCION DE ENFERMERIA

        for (let key in this.reg_evo.SIGNOS_VITALES) {
          this.reg_evo.SIGNOS_VITALES[key] = "";
        }

        this.tipo_macro();
      } else {
        this.actualizar_cama();
      }
    },

    actualizar_cama() {
      //PENDIENTE HC890K
      this.paso_escala_braden_downton();
    },

    paso_escala_braden_downton() {
      if (
        (this.nit_usu == 800037979 ||
          this.nit_usu == 900565371 ||
          this.nit_usu == 901146885 ||
          this.nit_usu == 900450008 ||
          (this.nit_usu == 900450008 && this.reg_evo.UNSERV == "03") ||
          (this.nit_usu == 844003225 && this.reg_evo.UNSERV == "03")) &&
        !this.reg_dethc.escala_downton.caidas_previas_9001.trim() &&
        (this.reg_evo.UNSERV == "03" || this.reg_evo.UNSERV == "05" || this.reg_evo.UNSERV == "09")
      ) {
        this.escala_downton_braden = true;
        this.dato_caidas_previas_9001();
      } else {
        this.escala_downton_braden = false;
        this.paso_escala_morse();
      }
    },

    // ESCALA DOWNTON
    dato_caidas_previas_9001() {
      let _this = this;

      validarInputs(
        {
          form: "#validar_caidas_previas_9001",
          orden: "1",
        },
        () => {
          _this.ventana_unserv();
        },
        () => {
          let value = _this.reg_dethc.escala_downton.caidas_previas_9001.toUpperCase().trim();
          if (value != "N" || value != "S") {
            CON851("03", "03", null, "warning", "Advertencia");
            _this.dato_caidas_previas_9001();
          } else {
            _this.dato_medica_frecuente_9001();
          }
        }
      );
    },

    dato_medica_frecuente_9001() {
      let _this = this;

      validarInputs(
        {
          form: "#validar_medica_frecuente_9001",
          orden: "1",
        },
        () => {
          _this.dato_caidas_previas_9001();
        },
        () => {
          let value = _this.reg_dethc.escala_downton.medica_frecuente_9001.toUpperCase().trim();
          if (value != "N" || value != "S") {
            CON851("03", "03", null, "warning", "Advertencia");
            _this.dato_medica_frecuente_9001();
          } else {
            _this.dato_alteracion_senso_9001();
          }
        }
      );
    },

    dato_alteracion_senso_9001() {
      let _this = this;

      validarInputs(
        {
          form: "#validar_alteracion_senso_9001",
          orden: "1",
        },
        () => {
          _this.dato_medica_frecuente_9001();
        },
        () => {
          let value = _this.reg_dethc.escala_downton.alteracion_senso_9001.toUpperCase().trim();
          if (value != "N" || value != "S") {
            CON851("03", "03", null, "warning", "Advertencia");
            _this.dato_alteracion_senso_9001();
          } else {
            _this.dato_estado_mental_morse_9001();
          }
        }
      );
    },

    dato_estado_mental_morse_9001() {
      let _this = this;

      POPUP(
        {
          titulo: "ESTADO MENTAL",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: _this.selec_estado_mental_9001,
          seleccion: this.reg_dethc.escala_downton.estado_mental_9001.trim() || 1,
          callback_f: () => _this.dato_alteracion_senso_9001(),
        },
        (data) => {
          _this.reg_dethc.escala_downton.estado_mental_9001 = data.COD;
          _this.dato_deambulacion_9001();
        }
      );
    },

    dato_deambulacion_9001() {
      let _this = this;

      POPUP(
        {
          titulo: "DEAMBULACIÓN",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: _this.selec_deambulacion_9001,
          seleccion: this.reg_dethc.escala_downton.deambulacion_9001.trim() || 1,
          callback_f: () => _this.dato_estado_mental_morse_9001(),
        },
        (data) => {
          _this.reg_dethc.escala_downton.deambulacion_9001 = data.COD;
          _this.dato_deambulacion_9001();
        }
      );
    },

    // ESCALA BRADEN
    dato_presep_senso_9002() {
      let _this = this;

      POPUP(
        {
          titulo: "PERCEPCIÓN SENSORIAL",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: _this.selec_persep_sensorial_9002,
          seleccion: this.reg_dethc.escala_brader.presep_senso_9002.trim() || 1,
          callback_f: () => _this.dato_deambulacion_9001(),
        },
        (data) => {
          _this.reg_dethc.escala_brader.presep_senso_9002 = data.COD;
          _this.dato_humedad_9002();
        }
      );
    },

    dato_humedad_9002() {
      let _this = this;

      POPUP(
        {
          titulo: "HUMEDAD",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: _this.selec_humedad_9002,
          seleccion: this.reg_dethc.escala_brader.humedad_9002.trim() || 1,
          callback_f: () => _this.dato_presep_senso_9002(),
        },
        (data) => {
          _this.reg_dethc.escala_brader.humedad_9002 = data.COD;
          _this.dato_actividad_9002();
        }
      );
    },

    dato_actividad_9002() {
      let _this = this;

      POPUP(
        {
          titulo: "ACTIVIDAD",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: _this.selec_actividad_9002,
          seleccion: this.reg_dethc.escala_brader.actividad_9002.trim() || 1,
          callback_f: () => _this.dato_humedad_9002(),
        },
        (data) => {
          _this.reg_dethc.escala_brader.actividad_9002 = data.COD;
          _this.dato_movilidad_9002();
        }
      );
    },

    dato_movilidad_9002() {
      let _this = this;

      POPUP(
        {
          titulo: "MOVILIDAD",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: _this.selec_movilidad_9002,
          seleccion: this.reg_dethc.escala_brader.movilidad_9002.trim() || 1,
          callback_f: () => _this.dato_actividad_9002(),
        },
        (data) => {
          _this.reg_dethc.escala_brader.movilidad_9002 = data.COD;
          _this.dato_nutricion_9002();
        }
      );
    },

    dato_nutricion_9002() {
      let _this = this;

      POPUP(
        {
          titulo: "NUTRICIÓN",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: _this.selec_nutricion_9002,
          seleccion: this.reg_dethc.escala_brader.nutricion_9002.trim() || 1,
          callback_f: () => _this.dato_movilidad_9002(),
        },
        (data) => {
          _this.reg_dethc.escala_brader.nutricion_9002 = data.COD;
          _this.dato_peligro_lesion_9002();
        }
      );
    },

    dato_peligro_lesion_9002() {
      let _this = this;

      POPUP(
        {
          titulo: "ROCE Y PELIGRO DE LESIONES",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: _this.selec_peligro_lesion_9002,
          seleccion: this.reg_dethc.escala_brader.peligro_lesion_9002.trim() || 1,
          callback_f: () => _this.dato_peligro_lesion_9002(),
        },
        (data) => {
          _this.reg_dethc.escala_brader.peligro_lesion_9002 = data.COD;
          _this.paso_escala_morse();
        }
      );
    },

    paso_escala_morse() {
      let hora = parseInt(moment().format("HHmm"));

      if (!this.habilitar_morse) {
        this.paso_escala_upp();
      } else if (hora >= 1400 && hora <= 2200 && this.reg_prof.ATIENDE == 4) {
        this.habilitar_morse = true;

        if (this.reg_hc.cierre.hab.trim() == "" || this.reg_hc.cierre.hab.trim() == "SIN") {
          this.morse.cama = "";
        } else {
          this.morse.cama = this.reg_hc.cierre.hab.trim().padEnd(4, " ");
        }

        this.dato_historial_caidas_morse();
      } else {
        this.habilitar_morse = false;
        this.tipo_macro();
      }
    },

    dato_historial_caidas_morse() {
      let _this = this;

      validarInputs(
        {
          form: "#validar_historial_caidas",
          orden: "1",
        },
        () => {
          _this.dato_historial_caidas_morse();
        },
        () => {
          let value = _this.morse.historial_caidas.toUpperCase().trim();
          if (value == "N" || value == "S") {
            _this.dato_dx_secu_caidas_morse();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            _this.dato_historial_caidas_morse();
          }
        }
      );
    },

    dato_dx_secu_caidas_morse() {
      let _this = this;

      validarInputs(
        {
          form: "#validar_dx_secu_caidas",
          orden: "1",
        },
        () => {
          _this.dato_historial_caidas_morse();
        },
        () => {
          let value = _this.morse.dx_secu_caidas.toUpperCase().trim();
          if (value == "N" || value == "S") {
            _this.dato_ayuda_deambular_morse();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            _this.dato_dx_secu_caidas_morse();
          }
        }
      );
    },

    dato_ayuda_deambular_morse() {
      let _this = this;
      POPUP(
        {
          titulo: "AYUDA PARA DEAMBULAR",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: _this.selec_ayuda_deambular_morse,
          seleccion: _this.morse.ayuda_deambular.trim() || 1,
          callback_f: () => _this.dato_dx_secu_caidas_morse(),
        },
        (data) => {
          _this.morse.ayuda_deambular = data.COD;
          _this.dato_venoclisis_morse();
        }
      );
    },

    dato_venoclisis_morse() {
      let _this = this;

      validarInputs(
        {
          form: "#validar_venoclisis",
          orden: "1",
        },
        () => {
          _this.dato_ayuda_deambular_morse();
        },
        () => {
          let value = _this.morse.venoclisis.toUpperCase().trim();
          if (value == "N" || value == "S") {
            _this.dato_marcha_morse();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            _this.dato_venoclisis_morse();
          }
        }
      );
    },

    dato_marcha_morse() {
      let _this = this;
      POPUP(
        {
          titulo: "MARCHA",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: _this.selec_marcha_morse,
          seleccion: _this.morse.marcha.trim() || 1,
          callback_f: () => _this.dato_venoclisis_morse(),
        },
        (data) => {
          _this.morse.marcha = data.COD;
          _this.dato_estado_mental_morse();
        }
      );
    },

    dato_estado_mental_morse() {
      let _this = this;
      POPUP(
        {
          titulo: "ESTADO MENTAL",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: _this.selec_estado_mental_morse,
          seleccion: _this.morse.estado_mental.trim() || 1,
          callback_f: () => _this.dato_venoclisis_morse(),
        },
        (data) => {
          _this.morse.estado_mental = data.COD;
          _this.paso_escala_upp();
        }
      );
    },

    paso_escala_upp() {
      let hora = parseInt(moment().format("HHmm"));

      if (!this.habilitar_upp) {
        this.tipo_macro();
      } else if (hora >= 1400 && hora <= 2200 && this.reg_prof.ATIENDE == "4") {
        this.dato_evaluar_upp();
      } else {
        this.habilitar_upp = false;
        this.tipo_macro();
      }
    },

    dato_evaluar_upp() {
      let _this = this
      CON851P(
        "Desea evaluar riesgo de UPP:",
        () => {
          _this.evaluar_upp_w = false;
          // inicializar datos escala upp. PENDIENTE
          _this.tipo_macro();
        },
        () => {
          _this.evaluar_upp_w = true;
          _this.dato_percep_senso_upp();
        }
      );
    },

    dato_percep_senso_upp() {
      let _this = this;
      POPUP(
        {
          titulo: "PERCEPCIÓN SENSORIAL",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: _this.selec_persep_sensorial_9002,
          seleccion: _this.upp.percep_senso.trim() || 1,
          callback_f: () => _this.dato_evaluar_upp(),
        },
        (data) => {
          _this.upp.percep_senso = data.COD;
          _this.dato_expo_humedad_upp();
        }
      );
    },

    dato_expo_humedad_upp() {
      let _this = this;
      POPUP(
        {
          titulo: "EXPOSICIÓN HUMEDAD",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: _this.selec_expo_humedad_upp,
          seleccion: _this.upp.expo_humedad.trim() || 1,
          callback_f: () => _this.dato_percep_senso_upp(),
        },
        (data) => {
          _this.upp.expo_humedad = data.COD;
          _this.dato_actividad_upp();
        }
      );
    },

    dato_actividad_upp() {
      let _this = this;
      POPUP(
        {
          titulo: "ACTIVIDAD",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: _this.selec_actividad_upp,
          seleccion: _this.upp.actividad.trim() || 1,
          callback_f: () => _this.dato_expo_humedad_upp(),
        },
        (data) => {
          _this.upp.actividad = data.COD;
          _this.dato_movilidad_upp();
        }
      );
    },

    dato_movilidad_upp() {
      let _this = this;
      POPUP(
        {
          titulo: "MOVILIDAD",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: _this.selec_movilidad_upp,
          seleccion: _this.upp.movilidad.trim() || 1,
          callback_f: () => _this.dato_actividad_upp(),
        },
        (data) => {
          _this.upp.movilidad = data.COD;
          _this.dato_nutricion_upp();
        }
      );
    },

    dato_nutricion_upp() {
      let _this = this;
      POPUP(
        {
          titulo: "MOVILIDAD",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: _this.selec_nutricion_upp,
          seleccion: _this.upp.nutricion.trim() || 1,
          callback_f: () => _this.dato_movilidad_upp(),
        },
        (data) => {
          _this.upp.nutricion = data.COD;
          _this.dato_friccion_ciza_upp();
        }
      );
    },

    dato_friccion_ciza_upp() {
      let _this = this;
      POPUP(
        {
          titulo: "FRICCIÓN Y CIZALLAMIENTO",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: _this.selec_friccion_ciza_upp,
          seleccion: _this.upp.friccion_ciza.trim() || 1,
          callback_f: () => _this.dato_nutricion_upp(),
        },
        (data) => {
          _this.upp.friccion_ciza = data.COD;
          _this.dato_estado_piel_upp();
        }
      );
    },

    dato_estado_piel_upp() {
      let _this = this;
      if (_this.calc_upp < 16) {
        _this.dato_piel_integra_upp();
      } else {
        // inicializar estado_piel pendiente
        _this.tipo_macro();
      }
    },

    dato_piel_integra_upp() {
      let _this = this;

      validarInputs(
        {
          form: "#validar_piel_integra_upp",
          orden: "1",
        },
        () => {
          _this.paso_escala_upp();
        },
        () => {
          let value = _this.upp.estado_piel.piel_integra.toUpperCase().trim();
          if (value == "N" || value == "S") {
            _this.dato_zona_presion_upp();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            _this.dato_piel_integra_upp();
          }
        }
      );
    },

    dato_zona_presion_upp() {
      let _this = this;

      validarInputs(
        {
          form: "#validar_zona_presion",
          orden: "1",
        },
        () => {
          _this.dato_piel_integra_upp();
        },
        () => {
          let value = _this.upp.estado_piel.zona_presion.toUpperCase().trim();
          if (value == "N" || value == "S") {
            _this.dato_laceracion_upp();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            _this.dato_zona_presion_upp();
          }
        }
      );
    },

    dato_laceracion_upp() {
      let _this = this;

      validarInputs(
        {
          form: "#validar_laceracion",
          orden: "1",
        },
        () => {
          _this.dato_zona_presion_upp();
        },
        () => {
          let value = _this.upp.estado_piel.laceracion.toUpperCase().trim();
          console.log(value)
          if (value == "N" || value == "S") {
            _this.dato_flictemas_upp();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            _this.dato_laceracion_upp();
          }
        }
      );
    },

    dato_flictemas_upp() {
      let _this = this;

      validarInputs(
        {
          form: "#validar_flictemas",
          orden: "1",
        },
        () => {
          _this.dato_laceracion_upp();
        },
        () => {
          let value = _this.upp.estado_piel.flictemas.toUpperCase().trim();
          if (value == "N" || value == "S") {
            _this.dato_escara_upp();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            _this.dato_flictemas_upp();
          }
        }
      );
    },

    dato_escara_upp() {
      let _this = this;

      validarInputs(
        {
          form: "#validar_escara",
          orden: "1",
        },
        () => {
          _this.dato_flictemas_upp();
        },
        () => {
          let value = _this.upp.estado_piel.escara.toUpperCase().trim();
          if (value == "N" || value == "S") {
            _this.tipo_macro();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            _this.dato_escara_upp();
          }
        }
      );
    },

    tipo_macro() {
      if (!this.detalle_evo.trim()) {
        this.reg_evo.MACRO.CLASE = "4";

        setTimeout(() => {
          POPUP(
            {
              titulo: "Tipo de macro",
              indices: [
                {
                  id: "COD",
                  label: "DESCRIP",
                },
              ],
              array: this.tipos_macro,
              callback_f: () => this.ventana_unserv(),
              seleccion: this.reg_evo.MACRO.CLASE,
            },
            (data) => {
              this.reg_evo.MACRO.CLASE = data.COD;
              this.dato_macro();
            }
          );
        }, 300);
      } else {
        this.dato_macro();
      }
    },

    dato_macro() {
      if (!this.detalle_evo.trim()) {
        validarInputs(
          {
            form: "#validar_macro",
            orden: "1",
            event_f5: () => {
              CON851P("03", this.dato_macro(), () => {
                setTimeout(() => {
                  this.salir_hc003();
                }, 300);
              });
            },
          },
          () => this.tipo_macro(),
          () => {
            let macro_selec = this.array_macros.find(
              (el) =>
                el.CODIGO.trim() == this.reg_evo.MACRO.CODIGO.trim() &&
                el.CLASE.trim() == this.reg_evo.MACRO.CLASE.trim()
            );
            if (macro_selec || !parseInt(this.reg_evo.MACRO.CODIGO)) {
              this.leer_macro();
            } else {
              CON851("03", "03", null, "warning", "Advertencia");
              this.dato_macro();
            }
          }
        );
      } else {
        this.leer_macro();
      }
    },

    async leer_macro() {
      if (!parseInt(this.reg_evo.MACRO.CODIGO.trim()) || !parseInt(this.reg_evo.MACRO.CODIGO)) {
        this.vias_macro = [];
        this.dato_via();
      } else {
        loader("show");

        let key = this.reg_evo.MACRO.CLASE + this.reg_evo.MACRO.CODIGO.trim().padStart(6, "0");

        postData(
          {
            datosh: datosEnvio() + key + "|",
          },
          get_url("APP/HICLIN/HC808-02.DLL")
        )
          .then((data) => {
            loader("hide");

            if (!this.detalle_evo.trim()) {
              this.detalle_evo = data.MACRO_FULL[0].CONTENIDO.replace(/\&/g, "\n").trim();
            }

            this.vias_macro = data.MACRO_FULL[0].VIAS_ACCESO;

            for (let i in this.vias_macro) {
              let via = this.array_vias.find((el) => el.CODIGO.trim() == this.vias_macro[i].VIA.trim());
              if (via) this.vias_macro[i].DESCRIP = via.NOMBRE.trim();
            }

            this.dato_via();
          })
          .catch((err) => {
            loader("hide");
            console.log("Error leyendo macro seleccionada: ", err);
            CON851("Error leyendo macros", "03", null, "error", "Error");
            this.ventana_unserv();
          });
      }
    },

    dato_via() {
      if (this.vias_macro.length) {
        POPUP(
          {
            titulo: "SELECCIONE VIA DE ACCESO",
            indices: [{ id: "VIA", label: "DESCRIP" }],
            array: this.vias_macro,
            seleccion: this.reg_evo.MACRO.VIA.trim().padStart(2, "0"),
            callback_f: () => this.dato_macro(),
          },
          (data) => {
            this.reg_evo.MACRO.VIA = data.VIA;
            this.validar_via();
          }
        );
      } else {
        this.validar_via();
      }
    },

    validar_via() {
      if (this.reg_evo.MACRO.CLASE == "C") {
        for (let key in this.reg_evo.SIGNOS_VITALES) {
          this.reg_evo.SIGNOS_VITALES[key] = "";
        }

        this.detalle_evolucion();
      } else if (this.nit_usu == 900565371) {
        this.detalle_evolucion();
      } else {
        this.dato_embarazada();
      }
    },

    dato_embarazada() {
      if (this.reg_evo.UNSERV == "08") {
        if (this.reg_paci.SEXO == "F" && this.unid_edad_w == "A" && this.vlr_edad_w > 8 && this.vlr_edad_w < 55) {
          CON851P(
            "29",
            () => {
              this.sw_embarzo = false;
              this.validarSignosVitales();
            },
            () => {
              this.sw_embarzo = true;
              this.validarSignosVitales();
            }
          );
        } else {
          this.sw_embarzo = false;
          this.validarSignosVitales();
        }
      } else {
        this.sw_embarzo = false;
        this.validarSignosVitales();
      }
    },

    validarSignosVitales() {
      CON851P(
        "Llenar signos vitales?",
        () => {
          this.paso_sintomatico();
        },
        () => {
          this.dato_peso();
        }
      );
    },

    dato_peso() {
      let _this = this;

      if (_this.unid_edad_w == "D" || (_this.unid_edad_w == "M" && parseInt(_this.vlr_edad_w) < 3)) {
        _this.reg_evo.SIGNOS_VITALES.UNID_PESO = "2";
      } else {
        _this.reg_evo.SIGNOS_VITALES.UNID_PESO = "1";
      }

      validarInputs(
        {
          form: "#validar_peso",
          orden: "1",
          event_f5: () => CON851P("03", _this.dato_peso, _this.salir_hc003),
        },
        () => {
          CON851P(
            "03",
            () => {
              _this.validarSignosVitales();
            },
            () => {
              _this.salir_hc003();
            }
          );
        },
        () => {
          _this.reg_evo.PESO_NEW = _this.mask5Int1Dec.resolve(_this.reg_evo.PESO_NEW || "0");

          let peso = parseFloat(_this.reg_evo.PESO_NEW);

          if (
            _this.reg_evo.UNSERV == "63" ||
            [800175901, 19381427, 17306492, 31841010, 830511298, 892000264].includes(_this.nit_usu)
          ) {
            _this.dato_talla();
          } else {
            let unidadPeso = parseInt(_this.reg_evo.SIGNOS_VITALES.UNID_PESO);

            if ((unidadPeso == 1 && (peso < 2 || peso > 300)) || (unidadPeso == 2 && (peso < 500 || peso > 20000))) {
              CON851("03", "03", null, "warning", "Advertencia");
              _this.validarSignosVitales();
            } else {
              if (unidadPeso == 1) _this.peso_w = peso;
              else _this.peso_w = peso / 1000;

              if (_this.sw_embarzo && peso == 0) {
                CON851("02", "02", null, "warning", "Advertencia");
                _this.validarSignosVitales();
              } else _this.dato_talla();
            }
          }
        }
      );
    },

    dato_talla() {
      let _this = this;

      validarInputs(
        {
          form: "#validar_talla",
          orden: "1",
          event_f5: () => CON851P("03", _this.dato_talla, _this.salir_hc003),
        },
        () => {
          _this.dato_peso();
        },
        () => {
          let talla = (_this.reg_evo.SIGNOS_VITALES.TALLA = parseInt(_this.reg_evo.SIGNOS_VITALES.TALLA) || 0);

          if (_this.reg_evo.UNSERV == "63" || _this.nit_usu == 892000264) {
            _this.calcular_indices();
          } else if (talla > 230 || talla < 0) {
            CON851("03", "03", null, "warning", "Advertencia");
            _this.dato_talla();
          } else if (_this.sw_embarzo && talla == 0) {
            CON851("02", "02", null, "warning", "Advertencia");
            _this.dato_talla();
          } else {
            _this.calcular_indices();
          }
        }
      );
    },

    calcular_indices() {
      let _this = this;
      if (parseInt(_this.peso_w) == 0 || parseInt(_this.reg_evo.SIGNOS_VITALES.TALLA) == 0) {
        _this.reg_evo.SIGNOS_VITALES.IMC_CORP = 0;
      } else {
        _this.reg_evo.SIGNOS_VITALES.IMC_CORP = (
          parseInt(_this.peso_w) /
          (parseInt(_this.reg_evo.SIGNOS_VITALES.TALLA) / 100) ** 2
        )
          .toFixed(2)
          .toString()
          .padStart(5, "0");
        _this.reg_evo.SIGNOS_VITALES.SUP_CORP = (
          (parseInt(_this.peso_w) + parseInt(_this.reg_evo.SIGNOS_VITALES.TALLA) - 60) /
          100
        )
          .toFixed(2)
          .toString()
          .padStart(5, "0");
      }

      if (
        (_this.reg_evo.UNSERV == "01" || _this.reg_evo.UNSERV == "02" || _this.reg_evo.UNSERV == "08") &&
        _this.unid_edad_w == "A" &&
        _this.vlr_edad_w > 15 &&
        !_this.sw_embarzo
      ) {
        let imc_corp = parseFloat(_this.reg_evo.SIGNOS_VITALES.IMC_CORP);

        if (imc_corp < 16) CON851("BE", "BE", null, "warning", "Advertencia");
        if (imc_corp > 16 && imc_corp <= 17) CON851("BD", "BD", null, "warning", "Advertencia");
        if (imc_corp >= 25 && imc_corp < 30) CON851("BB", "BB", null, "warning", "Advertencia");
        if (imc_corp >= 30) CON851("BC", "BC", null, "warning", "Advertencia");
      }

      if (
        _this.reg_evo.UNSERV == "08" &&
        ((_this.unid_edad_w == "A" && _this.vlr_edad_w == 18) || _this.unid_edad_w == "D" || _this.unid_edad_w == "M")
      ) {
        // PENDIENTE GRAFICO DETARROLLO GRAF-DESA
        _this.dato_temp();
      } else {
        _this.dato_temp();
      }
    },

    dato_temp() {
      let _this = this;

      validarInputs(
        {
          form: "#validar_temperatura",
          orden: "1",
          event_f5: () => CON851P("03", _this.dato_temp, _this.salir_hc003),
        },
        () => {
          _this.dato_talla();
        },
        () => {
          let temp = (_this.reg_evo.SIGNOS_VITALES.TEMP = _this.mask_temp.resolve(
            _this.reg_evo.SIGNOS_VITALES.TEMP.trim() || "0"
          ));

          if (this.reg_evo.UNSERV == "63") {
            if (temp > 0 && (temp < 35.5 || temp > 38)) CON851("BM", "BM", null, "warning", "Advertencia");
            this.dato_frec_card();
          } else if (_this.nit_usu == 892000458 && temp == 0) {
            CON851("02", "02", null, "warning", "Advertencia");
            _this.dato_temp();
          } else {
            if (temp > 0 && (temp < 35.5 || temp > 38)) CON851("BM", "BM", null, "warning", "Advertencia");
            if (temp > 45) {
              CON851("03", "03", null, "error", "Error");
              _this.dato_temp();
            } else {
              _this.dato_frec_card();
            }
          }
        }
      );
    },

    dato_frec_card() {
      let _this = this;

      validarInputs(
        {
          form: "#validar_FC",
          orden: "1",
          event_f5: () => CON851P("03", _this.dato_frec_card, _this.salir_hc003),
        },
        () => {
          _this.dato_temp();
        },
        () => {
          let frec_card = (_this.reg_evo.SIGNOS_VITALES.F_CARD = parseInt(_this.reg_evo.SIGNOS_VITALES.F_CARD) || 0);

          if (_this.nit_usu == 892000458 && frec_card == 0) {
            CON851("02", "02", null, "warning", "Advertencia");
            _this.dato_frec_card();
          } else {
            if (frec_card > 0) {
              if (_this.unid_edad_w == "D" || (_this.unid_edad_w == "M" && _this.vlr_edad_w < 3)) {
                if (frec_card < 120 || frec_card > 160) CON851("BK", "BK", null, "warning", "Advertencia");
              } else if (_this.unid_edad_w == "M" || (_this.unid_edad_w == "A" && _this.vlr_edad_w < 5)) {
                if (frec_card < 60 || frec_card > 100) CON851("BK", "BK", null, "warning", "Advertencia");
              } else {
                if (frec_card < 60 || frec_card > 90) CON851("BK", "BK", null, "warning", "Advertencia");
              }
            }
            _this.dato_frec_resp();
          }
        }
      );
    },

    dato_frec_resp() {
      let _this = this;

      validarInputs(
        {
          form: "#validar_FR",
          orden: "1",
          event_f5: () => CON851P("03", _this.dato_frec_resp, _this.salir_hc003),
        },
        () => {
          _this.dato_frec_card();
        },
        () => {
          let frec_resp = (_this.reg_evo.SIGNOS_VITALES.F_RESP = parseInt(_this.reg_evo.SIGNOS_VITALES.F_RESP) || 0);
          if (_this.nit_usu == 892000458 && frec_resp == 0) {
            CON851("02", "02", null, "warning", "Advertencia");
            _this.dato_frec_resp();
          } else {
            if (frec_resp > 0) {
              switch (_this.unid_edad_w) {
                case "D":
                  if (frec_resp < 30 || frec_resp > 60) CON851("BL", "BL", null, "warning", "Advertencia");
                  break;
                case "M":
                  if (_this.vlr_edad_w < 3) {
                    if (frec_resp < 30 || frec_resp > 60) CON851("BL", "BL", null, "warning", "Advertencia");
                  } else {
                    if (frec_resp < 20 || frec_resp > 50) CON851("BL", "BL", null, "warning", "Advertencia");
                  }
                  break;
                case "A":
                  if (_this.vlr_edad_w < 5) {
                    if (frec_resp < 16 || frec_resp > 40) CON851("BL", "BL", null, "warning", "Advertencia");
                  } else {
                    if (frec_resp < 14 || frec_resp > 30) CON851("BL", "BL", null, "warning", "Advertencia");
                  }
                  break;
              }
            }
            _this.dato_tens1();
          }
        }
      );
    },

    dato_tens1() {
      let _this = this;

      validarInputs(
        {
          form: "#validar_TA_1",
          orden: "1",
          event_f5: () => CON851P("03", _this.dato_tens1, _this.salir_hc003),
        },
        () => {
          _this.dato_frec_resp();
        },
        () => {
          let tension = (_this.reg_evo.SIGNOS_VITALES.TENS_1 = parseInt(_this.reg_evo.SIGNOS_VITALES.TENS_1) || 0);
          if (_this.nit_usu == 892000458 && tension == 0) {
            CON851("02", "02", null, "warning", "Advertencia");
            _this.dato_tens1();
          } else if (tension > 300) {
            CON851("03", "03", null, "warning", "Advertencia");
            _this.dato_tens1();
          } else {
            _this.dato_tens2();
          }
        }
      );
    },

    dato_tens2() {
      let _this = this;

      validarInputs(
        {
          form: "#validar_TA_2",
          orden: "1",
          event_f5: () => CON851P("03", _this.dato_tens2, _this.salir_hc003),
        },
        () => {
          _this.dato_tens1();
        },
        () => {
          let tension = (_this.reg_evo.SIGNOS_VITALES.TENS_2 = parseInt(_this.reg_evo.SIGNOS_VITALES.TENS_2) || 0);
          if (_this.nit_usu == 892000458 && tension == 0) {
            CON851("02", "02", null, "warning", "Advertencia");
            _this.dato_tens2();
          } else if (tension > 200) {
            CON851("03", "03", null, "warning", "Advertencia");
            _this.dato_tens2();
          } else {
            _this.reg_evo.SIGNOS_VITALES.TENS_MEDIA =
              Math.round(
                (parseInt(_this.reg_evo.SIGNOS_VITALES.TENS_1) + parseInt(_this.reg_evo.SIGNOS_VITALES.TENS_2) * 2) / 3
              ) || 0;
            if (_this.unid_edad_w == "M" || _this.unid_edad_w == "D") {
              _this.dato_pvc();
            } else {
              _this.dato_aper_ocul_galsgow();
            }
          }
        }
      );
    },

    dato_aper_ocul_galsgow() {
      let _this = this;

      if (_this.nit_usu == 900565371) {
        // YEIMI SOLICITA QUE SE OMITAN VARIAS PREGUNTAS DE LA EVOLUCION DE ENFERMERIA
        _this.dato_glucometria();
      } else {
        setTimeout(() => {
          POPUP(
            {
              titulo: "APERTURA OCULAR",
              indices: [
                {
                  id: "COD",
                  label: "DESCRIP",
                },
              ],
              array: _this.selec_aper_ocular_glasgow,
              seleccion: parseInt(_this.reg_evo.SIGNOS_VITALES.APER_OCUL) || 4,
              callback_f: () => _this.dato_tens2(),
            },
            (data) => {
              _this.reg_evo.SIGNOS_VITALES.APER_OCUL = parseInt(data.COD);
              _this.dato_resp_verbal_glasgow();
            }
          );
        }, 300);
      }
    },

    dato_resp_verbal_glasgow() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "RESPUESTA VERBAL",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            array: _this.selec_resp_verbal_glasgow,
            seleccion: parseInt(_this.reg_evo.SIGNOS_VITALES.RESP_VERB) || 5,
            callback_f: () => _this.dato_aper_ocul_galsgow(),
          },
          (data) => {
            _this.reg_evo.SIGNOS_VITALES.RESP_VERB = parseInt(data.COD);
            _this.dato_resp_motora_glasgow();
          }
        );
      }, 300);
    },

    dato_resp_motora_glasgow() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "RESPUESTA MOTORA",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            array: _this.selec_resp_motora_glasgow,
            seleccion: parseInt(_this.reg_evo.SIGNOS_VITALES.RESP_MOTO) || "6",
            callback_f: () => _this.dato_resp_verbal_glasgow(),
          },
          (data) => {
            _this.reg_evo.SIGNOS_VITALES.RESP_MOTO = parseInt(data.COD);
            _this.dato_pvc();
          }
        );
      }, 300);
    },

    dato_pvc() {
      let _this = this;

      if (_this.nit_usu == 900005594) {
        _this.dato_per_tora();
      } else {
        validarInputs(
          {
            form: "#validar_PVC",
            orden: "1",
            event_f5: () => CON851P("03", _this.dato_pvc, _this.salir_hc003),
          },
          () => {
            _this.dato_tens2();
          },
          () => {
            _this.reg_evo.SIGNOS_VITALES.PVC = parseInt(_this.reg_evo.SIGNOS_VITALES.PVC) || 0;
            _this.dato_per_tora();
          }
        );
      }
    },

    dato_per_tora() {
      let _this = this;
      if (_this.unid_edad_w == "A" && _this.vlr_edad_w > 10) {
        _this.reg_evo.PER_TORA = _this.mask_perimetro.resolve("0.0");
        _this.dato_per_abdo();
      } else {
        validarInputs(
          {
            form: "#validar_PERTOR",
            orden: "1",
          },
          () => {
            if (_this.nit_usu == 900005594) {
              _this.dato_aper_ocul_galsgow();
            } else {
              _this.dato_pvc();
            }
          },
          () => {
            _this.reg_evo.PER_TORA = _this.mask_perimetro.resolve(_this.reg_evo.PER_TORA.trim() || "0");
            _this.dato_per_abdo();
          }
        );
      }
    },

    dato_per_abdo() {
      let _this = this;

      if (_this.reg_evo.UNSERV == "08" || _this.reg_evo.UNSERV == "02" || _this.nit_usu == 832002436) {
        validarInputs(
          {
            form: "#validar_PERABDO",
            orden: "1",
          },
          () => {
            if (_this.unid_edad_w == "A" && _this.vlr_edad_w > 10) {
              _this.dato_pvc();
            } else {
              _this.dato_per_tora();
            }
          },
          () => {
            let perimetro = (_this.reg_evo.PER_ABDO = _this.mask_perimetro.resolve(
              _this.reg_evo.PER_ABDO.trim() || "0"
            ));

            if (this.reg_evo.UNSERV == "63") {
              this.dato_gurin();
            } else {
              if (
                perimetro == 0 &&
                (_this.nit_usu == 832002436 ||
                  _this.nit_usu == 900306771 ||
                  _this.nit_usu == 844001287 ||
                  (_this.nit_usu == 892000458 && _this.reg_paci.CRONICO == "S"))
              ) {
                CON851("02", "02", null, "warning", "Advertencia");
                _this.dato_per_abdo();
              } else if (
                _this.reg_evo.UNSERV == "08" &&
                _this.unid_edad_w == "A" &&
                _this.vlr_edad_w > 18 &&
                perimetro == 0 &&
                _this.reg_paci.CRONICO == "S"
              ) {
                CON851("02", "02", null, "warning", "Advertencia");
                _this.dato_per_abdo();
              } else {
                _this.dato_gurin();
              }
            }
          }
        );
      } else {
        _this.reg_evo.PER_ABDO = 0;
        _this.dato_gurin();
      }
    },

    dato_gurin() {
      let _this = this;
      validarInputs(
        {
          form: "#validar_G_URIN",
          orden: "1",
          event_f5: () => CON851P("03", _this.dato_gurin, _this.salir_hc003),
        },
        () => {
          console.log("this", this, _this)
          _this.dato_per_tora();
        },
        () => {
          _this.reg_evo.SIGNOS_VITALES.G_URIN = _this.mask_g_urin.resolve(
            _this.reg_evo.SIGNOS_VITALES.G_URIN.trim() || "0"
          );
          if (_this.nit_usu == 800175901) {
            _this.paso_lista_chequeo();
          } else {
            _this.dato_oximetria();
          }
        }
      );
    },

    paso_lista_chequeo() {
      let _this = this;
      if (_this.existe_9003) {
        _this.params_lista_chequeo.estado = false;
        _this.dato_oximetria();
      } else {
        _this.params_lista_chequeo.estado = true;
      }
    },

    dato_oximetria() {
      let _this = this;
      validarInputs(
        {
          form: "#validar_oximetria",
          event_f5: () => CON851P("03", _this.dato_oximetria, _this.salir_hc003),
        },
        () => {
          _this.dato_gurin();
        },
        () => {
          let oxi = (_this.reg_evo.SIGNOS_VITALES.OXIMETRIA = parseInt(_this.reg_evo.SIGNOS_VITALES.OXIMETRIA) || 0);

          if (oxi >= 0 && oxi <= 100) {
            _this.dato_glucometria();
          } else _this.dato_oximetria();
        }
      );
    },

    dato_glucometria() {
      validarInputs(
        {
          form: "#validar_glucometria",
          orden: "1",
          event_f5: () => CON851P("03", this.dato_glucometria, this.salir_hc003),
        },
        () => {
          this.dato_oximetria();
        },
        () => {
          this.reg_evo.SIGNOS_VITALES.GLUCOMETRIA = parseInt(this.reg_evo.SIGNOS_VITALES.GLUCOMETRIA) || 0;
          this.paso_admin_liquidos();
        }
      );
    },

    validarEsc_liquidos() {
      this.params_admin_liquidos.estado = false;
      this.dato_embarazada();
    },

    paso_admin_liquidos() {
      if (this.nit_usu == 900565371 || this.nit_usu == 900005594) {
        //YEIMI SOLICITA QUE SE OMITAN VARIAS PREGUNTAS DE LA EVOLUCION DE ENFERMERIA
        this.params_admin_liquidos.estado = false;
        this.paso_sintomatico();
      } else {
        this.params_admin_liquidos.estado = true;
      }
    },

    validarCallback_liquidos(data) {
      console.log("callback liquidos");
      this.reg_evo.LIQUIDOS = data;
      this.params_admin_liquidos.estado = false;
      this.paso_sintomatico();
    },

    validarEsc_sintomatico() {
      this.params_sintomatico.estado = false;
      this.dato_glucometria();
    },

    paso_sintomatico() {
      if (this.reg_prof.ATIENDE == "2" || this.reg_prof.ATIENDE == "5" || this.reg_prof.ATIENDE == "6") {
        this.datos_sintomatico = getSintomaticoRegEvo(this.reg_evo);

        this.params_sintomatico.estado = true;
        this.params_sintomatico.unserv = this.reg_evo.UNSERV;
        this.params_sintomatico.finalidad = this.reg_evo.RIPS.FINALID;
      } else {
        this.params_sintomatico.estado = false;

        this.reg_evo.SINTOM_RESPI = "";
        this.reg_evo.SINTOM_PIEL = "";
        this.reg_evo.VICTI_MALTRATO = "";
        this.reg_evo.VICTI_VIOLENCIA = "";
        this.reg_evo.ENFER_MENTAL = "";
        this.reg_evo.ENFER_ITS = "";
        this.reg_evo.CUAL_ITS = "";
        this.reg_evo.TRATA_ITS = "";
        this.reg_evo.CANCER_SENO = "";
        this.reg_evo.CANCER_CERVIS = "";
        this.reg_evo.EDU_AUTOEXA_SENO = "";

        this.reg_evo.CITOLOGIA_PREVIA = "";
        this.reg_evo.FECHA_CITO_PREVIA = "";
        this.reg_evo.RESUL_CITO_PREVIA = "";
        this.reg_evo.CONTACTO_LEPRA = "";
        this.reg_evo.FECHA_ULT_MAMO = "";

        this.datos_embarazo();
      }
    },

    validarCallback_sintomatico(data) {
      this.reg_evo.SINTOM_RESPI = data.sintom_resp;
      this.reg_evo.SINTOM_PIEL = data.sintom_piel;
      this.reg_evo.VICTI_MALTRATO = data.victi_maltrato;
      this.reg_evo.VICTI_VIOLENCIA = data.victi_violencia;
      this.reg_evo.ENFER_MENTAL = data.enfer_mental;
      this.reg_evo.ENFER_ITS = data.enfer_its;
      this.reg_evo.CUAL_ITS = data.cual_its;
      this.reg_evo.TRATA_ITS = data.trata_its;
      this.reg_evo.CANCER_SENO = data.cancer_seno;
      this.reg_evo.CANCER_CERVIS = data.cancer_cervis;
      this.reg_evo.EDU_AUTOEXA_SENO = data.edu_autoexa_seno;

      this.reg_evo.CITOLOGIA_PREVIA = data.citologia_previa;
      this.reg_evo.FECHA_CITO_PREVIA = data.fecha_cito_previa;
      this.reg_evo.RESUL_CITO_PREVIA = data.resul_cito_previa;
      this.reg_evo.CONTACTO_LEPRA = data.contacto_lepra;
      this.reg_evo.FECHA_ULT_MAMO = data.fecha_ult_mamo;

      this.params_sintomatico.estado = false;
      this.paso_creatinina();
    },

    paso_creatinina() {
      let unserv = this.reg_evo.UNSERV,
        finalidad = this.reg_evo.RIPS.FINALID;

      if (
        this.nit_usu == 800031021 ||
        (this.reg_paci.CRONICO == "S" &&
          ((unserv == "08" && (finalidad == "10" || finalidad == "11")) ||
            unserv == "02" ||
            (this.nit_usu == 844003225 && (finalidad == "05" || finalidad == "07"))))
      ) {
        this.datos_creatinina = {
          ...this.datos_creatinina,
          ...{
            fecha: this.reg_evo.FECHA_EVO,
            peso: this.reg_evo.PESO_NEW,
            edad: this.reg_hc.vlr_edad,
            unserv: this.reg_evo.UNSERV,
            tabla_diagn: this.reg_evo.TABLA_DIAGNOSTICOS.map((item) => ({ cod_diagn: item })),

            creatinina2: this.reg_evo.CREATININA2,
            hemo_glicosilada: this.reg_evo.HEMO_GLICOSILADA,
            hemo_glico_fecha: this.reg_evo.HEMO_GLICO_FECHA,
            microalbuminuria: this.reg_evo.MICROALBUMINURIA,
            fecha_microalbuminuria: this.reg_evo.FECHA_MICROALBUMINURIA,
            riesgo_cardio: this.reg_evo.RIESGO_CARDIO,
            rela_albumi_creatini_1: this.reg_evo.RELA_ALBUMI_CREATINI_1,
            rela_albumi_creatini_2: this.reg_evo.RELA_ALBUMI_CREATINI_2,
            erc: this.reg_evo.ERC,
            fecha_dx_erc: this.reg_evo.FECHA_DX_ERC,
            fecha_creatinina: this.reg_evo.FECHA_CREATININA,
            estadio_erc: this.reg_evo.ESTADIO_ERC,
          },
        };
        this.params_creatinina.estado = true;
      } else {
        this.datos_embarazo();
      }
    },

    datos_embarazo() {
      if (this.sw_embarzo) {
        this.anio_regla_emb = this.reg_evo.EMBAR.FECHA_REGLA.slice(0, 4);
        this.mes_regla_emb = this.reg_evo.EMBAR.FECHA_REGLA.slice(4, 6);
        this.dia_regla_emb = this.reg_evo.EMBAR.FECHA_REGLA.slice(6);

        this.paso_embarazo = true;
        this.dato_gestaciones();
      } else {
        this.paso_embarazo = false;
        this.detalle_evolucion();
      }
    },

    dato_gestaciones() {
      validarInputs(
        {
          form: "#validar_gesta_prev",
          orden: "1",
        },
        () => {
          this.paso_embarazo = false;
          setTimeout(() => this.validarSignosVitales(), 300);
        },
        () => {
          this.reg_evo.EMBAR.GESTACIONES = this.reg_evo.EMBAR.GESTACIONES.padStart(2, "0");
          this.dato_peso_prev();
        }
      );
    },

    dato_peso_prev() {
      if (!parseInt(this.reg_evo.EMBAR.PESO_PREV)) this.reg_evo.EMBAR.PESO_PREV = this.reg_hc.signos.peso_prev;
      validarInputs(
        {
          form: "#validar_peso_prev",
          orden: "1",
        },
        () => {
          this.dato_gestaciones();
        },
        () => {
          this.reg_evo.EMBAR.PESO_PREV = this.mask3Int1Dec.resolve(this.reg_evo.EMBAR.PESO_PREV.trim() || "0");

          if (!parseFloat(this.reg_evo.EMBAR.PESO_PREV)) {
            CON851("02", "02", null, "warning", "Advertencia");
            this.dato_peso_prev();
          } else {
            this.dato_anio_regla();
          }
        }
      );
    },

    dato_anio_regla() {
      validarInputs(
        {
          form: "#validar_anio_regla_emb",
          orden: "1",
        },
        () => {
          this.dato_peso_prev();
        },
        () => {
          this.anio_regla_emb = this.anio_regla_emb.padStart(4, "0");

          if (parseInt(this.anio_regla_emb) < 0 && parseInt(this.anio_regla_emb) < 1950) {
            this.dato_anio_regla();
          } else {
            this.dato_mes_regla();
          }
        }
      );
    },

    dato_mes_regla() {
      validarInputs(
        {
          form: "#validar_mes_regla_emb",
          orden: "1",
        },
        () => {
          this.dato_anio_regla();
        },
        () => {
          this.mes_regla_emb = this.mes_regla_emb.padStart(2, "0");

          if (parseInt(this.mes_regla_emb > 12)) {
            this.dato_mes_regla();
          } else {
            this.dato_dia_regla();
          }
        }
      );
    },

    dato_dia_regla() {
      validarInputs(
        {
          form: "#validar_dia_regla_emb",
          orden: "1",
        },
        () => {
          this.dato_mes_regla();
        },
        () => {
          this.dia_regla_emb = this.dia_regla_emb.padStart(2, "0");

          this.reg_evo.EMBAR.FECHA_REGLA = `${this.anio_regla_emb}${this.mes_regla_emb}${this.dia_regla_emb}`;

          if (
            parseInt(this.anio_regla_emb) == 0 &&
            parseInt(this.mes_regla_emb) == 0 &&
            parseInt(this.dia_regla_emb) == 0
          ) {
            this.reg_evo.EMBAR.FECHA_REGLA = "00000000";
            this.dato_edad_gest();
          } else {
            if (
              !_validarFecha(this.anio_regla_emb, this.mes_regla_emb, this.dia_regla_emb) ||
              parseInt(this.reg_evo.EMBAR.FECHA_REGLA) > this.fecha_sist
            ) {
              CON851("37", "37", null, "warning", "Advertencia");
              this.dato_anio_regla();
            } else {
              this.dato_edad_gest();
            }
          }
        }
      );
    },

    dato_edad_gest() {
      if (!this.sw_embarzo || !parseInt(this.mes_regla_emb)) {
        this.reg_evo.EMBAR.EDAD_GEST_REGLA = "0";
        this.dato_alt_uterina();
      } else {
        let fecha_act = moment();
        let fecha_regla = moment(this.reg_evo.EMBAR.FECHA_REGLA).format("YYYYMMDD");

        this.reg_evo.EMBAR.EDAD_GEST_REGLA = (fecha_act.diff(fecha_regla, "days") / 7).toString();

        this.reg_evo.EMBAR.EDAD_GEST_REGLA = this.mask2Int1Dec.resolve(this.reg_evo.EMBAR.EDAD_GEST_REGLA || "0");

        this.dato_alt_uterina();
      }
    },

    dato_alt_uterina() {
      validarInputs(
        {
          form: "#validar_alt_uterina",
          orden: "1",
        },
        () => {
          this.dato_dia_regla();
        },
        () => {
          this.reg_evo.EMBAR.ALT_UTER = this.mask2Int1Dec.resolve(this.reg_evo.EMBAR.ALT_UTER.trim() || "0");

          if (!parseFloat(this.reg_evo.EMBAR.ALT_UTER)) {
            CON851("02", "02", null, "warning", "Advertencia");
            this.dato_alt_uterina();
          } else {
            CON851P(
              "Confirmar datos embarazo",
              () => {
                this.dato_alt_uterina();
              },
              () => {
                this.paso_embarazo = false;
                this.detalle_evolucion();
              }
            );
          }
        }
      );
    },

    detalle_evolucion() {
      let _this = this;
      if (!_this.detalle_evo.trim()) {
        if (_this.habilitar_morse) _this.adicionar_morse();
        if (_this.habilitar_upp) _this.adicionar_upp();
      }

      validarInputs(
        {
          form: "#validar_detalleEvo",
          orden: "1",
        },
        () => {
          _this.dato_gurin();
        },
        () => {
          _this.detalle_evo = _this.detalle_evo.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");
          _this.paso_diagnosticos();
        }
      );
    },

    paso_diagnosticos() {
      if (
        this.unid_edad_w == "A" &&
        this.vlr_edad_w < 10 &&
        this.reg_evo.UNSERV == "08" &&
        !this.reg_evo.TABLA_DIAGNOSTICOS[0].trim()
      ) {
        this.reg_evo.TABLA_DIAGNOSTICOS[0] == "Z761";
      }

      this.reg_evo.TABLA_DIAGNOSTICOS.forEach((el, index) => {
        let diag = this.array_enfermedades.find((e) => e.COD_ENF.trim() == el.trim());
        console.log(diag);

        diag
          ? Vue.set(this.diagnosticos, index, {
            CODIGO: diag.COD_ENF,
            DESCRIP: diag.NOMBRE_ENF.trim(),
          })
          : Vue.set(this.diagnosticos, index, { CODIGO: "", DESCRIP: "" });
      });

      if (
        this.unid_edad_w == "A" &&
        this.vlr_edad_w < 10 &&
        this.reg_evo.UNSERV == "08" &&
        !parseInt(this.reg_evo.RIPS.FINALID)
      ) {
        this.reg_evo.RIPS.FINALID = "04";
      }

      this.validar_cod_diag(0);
    },

    ventanaCod_diag(index) {
      let input = `cod_diag${index}`;

      _ventanaDatos({
        titulo: "Ventana enfermedades",
        columnas: ["COD_ENF", "NOMBRE_ENF"],
        data: this.array_enfermedades,
        ancho: "70%",
        callback_esc: () => {
          document.getElementById(input).focus();
        },
        callback: (data) => {
          Vue.set(this.diagnosticos, index, {
            CODIGO: data.COD_ENF.trim(),
            DESCRIP: data.NOMBRE_ENF.trim(),
          });
          setTimeout(() => _enterInput("#" + input), 100);
        },
      });
    },

    validar_cod_diag(index) {
      index = index || 0;
      console.log(index);
      validarInputs(
        {
          form: `#validarCod_diag_${index}`,
          orden: "1",
          event_f3: async () => {
            this.diagnosticos[index].CODIGO = this.diagnosticos[index].CODIGO.trim().toUpperCase();

            await this.validaciones_diganostico(index)
              .then((data) => {
                if (index < 4) {
                  ++index;
                  this.validar_cod_diag(index);
                } else this.mover_diagnosticos();
              })
              .catch((err) => {
                this.validar_cod_diag(index);
              });
          }
        },
        () => {
          this.diagnosticos[index].CODIGO = this.diagnosticos[index].CODIGO.trim().toUpperCase();

          let diag = this.array_enfermedades.find((el) => el.COD_ENF.trim() == this.diagnosticos[index].CODIGO);

          diag
            ? Vue.set(this.diagnosticos, index, {
              CODIGO: diag.COD_ENF,
              DESCRIP: diag.NOMBRE_ENF,
            })
            : Vue.set(this.diagnosticos, index, { CODIGO: "", DESCRIP: "" });

          if (index == 0) {
            this.inicio();
          } else {
            index -= 1;
            this.validar_cod_diag(index);
          }
        },
        async () => {
          this.diagnosticos[index].CODIGO = this.diagnosticos[index].CODIGO.trim().toUpperCase();

          await this.validaciones_diganostico(index)
            .then((data) => {
              if (index < 4) {
                ++index;
                this.validar_cod_diag(index);
              } else this.mover_diagnosticos();
            })
            .catch((err) => {
              this.validar_cod_diag(index);
            });
        }
      );
    },

    mover_diagnosticos() {
      this.reg_evo.TABLA_DIAGNOSTICOS = this.diagnosticos.map((el) => el.CODIGO);
      this.dato_plan_familiar_2();
    },

    async validaciones_diganostico(index) {
      return new Promise((resolve, reject) => {
        let unserv = this.reg_evo.UNSERV;
        let diag = this.array_enfermedades.find((el) => el.COD_ENF.trim() == this.diagnosticos[index].CODIGO);

        if (index == 0 && this.nit_usu == 900565371 && !this.diagnosticos[index].CODIGO) {
          CON851("02", "02", null, "warning", "Advertencia");
          reject();
        }

        if (!this.diagnosticos[index].CODIGO) {
          if (index == 0 && unserv == "08") {
            CON851("02", "02", null, "warning", "Advertencia");
            Vue.set(this.diagnosticos, index, { CODIGO: "", DESCRIP: "" });
            reject();
          } else {
            Vue.set(this.diagnosticos, index, { CODIGO: "", DESCRIP: "" });
            diag = this.array_enfermedades[0];
            for (let key in diag) {
              diag[key] = "";
            }
          }
        } else if (!diag) {
          CON851("01", "01", null, "warning", "Advertencia");
          reject();
        }

        Vue.set(this.diagnosticos, index, {
          CODIGO: diag.COD_ENF,
          DESCRIP: diag.NOMBRE_ENF,
        });

        if (this.diagnosticos[index].DESCRIP.slice(0, 1) == "*") {
          CON851("13", "13", null, "warning", "Advertencia");
          reject();
        }

        let cod_diag = this.diagnosticos[index].CODIGO;

        if (index == 0 && unserv == "08") {
          if (
            cod_diag.slice(0, 1) == "Z" ||
            cod_diag.slice(0, 2) == "E1" ||
            cod_diag == "I10X" ||
            cod_diag == "I151" ||
            cod_diag == "I158" ||
            cod_diag == "I159" ||
            cod_diag == "O16X" ||
            cod_diag == "E782" ||
            cod_diag == "E784" ||
            cod_diag == "E785"
          ) {
            console.log("Ok");
          } else {
            CON851("G0", "G0", null, "warning", "Advertencia");
            reject();
          }
        }

        if (index == 0) {
          if (
            unserv == "02" ||
            unserv == "04" ||
            unserv == "06" ||
            unserv == "08" ||
            unserv == "09" ||
            cod_diag == "Z370" ||
            cod_diag == "Z371" ||
            cod_diag == "Z372" ||
            cod_diag == "Z373" ||
            cod_diag == "Z374" ||
            cod_diag == "Z375" ||
            cod_diag == "Z376" ||
            cod_diag == "Z377" ||
            cod_diag == "Z380" ||
            cod_diag == "X381" ||
            cod_diag == "Z383" ||
            cod_diag == "Z384"
          ) {
            console.log("Ok");
          } else if (unserv == "09" || unserv == "63") {
            console.log("Ok");
          } else if (cod_diag.slice(0, 1) == "Z") {
            CON851("G1", "G1", null, "warning", "Advertencia");
            reject();
          }
        }

        if (diag.SEXO_ENF.trim() && diag.SEXO_ENF.trim() != this.reg_paci.SEXO.trim()) {
          CON851("73", "73", null, "warning", "Advertencia");
          reject();
        }

        let edad_min_w,
          unid_edad_min_w,
          edad_max_w,
          unid_edad_max_w = 0;

        switch (diag.UNID_EDAD_ENF.trim()) {
          case "D":
            unid_edad_min_w = unid_edad_max_w = 1;
            break;
          case "M":
            unid_edad_min_w = unid_edad_max_w = 2;
            break;
          case "A":
            unid_edad_min_w = unid_edad_max_w = 3;
            break;

          default:
            unid_edad_min_w = unid_edad_max_w = 0;
            break;
        }

        edad_min_w = diag.EDAD_MIN_ENF;
        edad_max_w = diag.EDAD_MAX_ENF;

        if (diag.EDAD_MIN_ENF > 0 && this.vlr_edad_w < edad_min_w) {
          CON851("74", "74", null, "warning", "Advertencia");
          reject();
        }

        if (diag.EDAD_MAX_ENF > 0 && this.vlr_edad_w > edad_max_w) {
          CON851("74", "74", null, "warning", "Advertencia");
          reject();
        }

        resolve();
      });
    },

    dato_plan_familiar_2() {
      if (
        (this.reg_prof.ATIENDE == "2" ||
          this.reg_prof.ATIENDE == "6" ||
          (this.reg_prof.ATIENDE == "1" && (this.reg_prof.ESP1 == "340" || this.reg_prof.ESP1 == "341"))) &&
        this.reg_evo.UNSERV == "63" &&
        this.reg_evo.TABLA_DIAGNOSTICOS.find((el) => el == "Z300" || el == "Z304")
      ) {
        POPUP(
          {
            titulo: "MÉTODO DE PLANIFICACIÓN",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            array: this.selec_planificacion,
            seleccion: this.reg_evo.EMBAR.PLANIFIC || "1",
            callback_f: () => this.validar_cod_diag(0),
          },
          (data) => {
            let plan = (this.reg_evo.EMBAR.PLANIFIC = data.COD);

            console.log(plan);

            let planM = ["3", "4", "5", "G", "H", "I", "K", "L"];

            if (this.reg_paci.SEXO == "M" && !planM.find((el) => el == plan)) {
              CON851("73", "73", null, "warning", "Advertencia");
              this.validar_cod_diag(0);
            } else if (!plan.trim()) {
              CON851("02", "02", null, "warning", "Advertencia");
              this.validar_cod_diag(0);
            } else {
              this.dato_solicita_general();
            }
          }
        );
      } else {
        this.dato_solicita_general();
      }
    },

    dato_solicita_general() {
      CON851P(
        "¿Solicita atención medicina general?",
        () => {
          this.sol_med_general = "N";
          this.dato_demanda_inducida();
        },
        () => {
          this.sol_med_general = "S";
          this.dato_demanda_inducida();
        }
      );
    },

    dato_demanda_inducida() {
      if (this.reg_evo.UNSERV == "02" || this.reg_evo.UNSERV == "08" || this.reg_evo.UNSERV == "63") {
        this.dato_causa_externa();
      } else {
        this.dato_pyp();
      }
    },

    dato_causa_externa() {
      if (this.reg_evo.UNSERV == "08") {
        this.reg_evo.RIPS.CAUSA = "15";
        this.dato_pyp();
      } else {
        if (!this.reg_evo.RIPS.CAUSA.trim()) this.reg_evo.RIPS.CAUSA = this.reg_hc.rips.causa.padStart(2, "0");

        POPUP(
          {
            titulo: "Causa externa",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            array: this.selec_causa_externa,
            seleccion: this.reg_evo.RIPS.CAUSA.trim().padStart(2, "0") || "15",
            callback_f: () => this.validar_cod_diag(0),
          },
          (data) => {
            this.reg_evo.RIPS.CAUSA = data.COD.padStart(2, "0");
            this.dato_pyp();
          }
        );
      }
    },

    dato_pyp() {
      if (this.reg_evo.UNSERV == "02" || this.reg_evo.UNSERV == "08") {
        this.dato_embarazo();
      } else {
        this.reg_evo.RIPS.EMBAR = "0";
        this.reg_evo.RIPS.FINALID = "10";
        this.dato_finalidad_consulta();
      }
    },

    dato_embarazo() {
      if (this.reg_paci.SEXO == "M") {
        this.reg_evo.RIPS.EMBAR = "9";
        this.dato_finalidad_consulta();
      } else if (
        this.unid_edad_w == "D" ||
        this.unid_edad_w == "M" ||
        (this.unid_edad_w == "A" && this.vlr_edad_w < 10) ||
        (this.unid_edad_w == "A" && this.vlr_edad_w > 50)
      ) {
        this.reg_evo.RIPS.EMBAR = "4";
        this.dato_finalidad_consulta();
      } else if (!parseInt(this.reg_evo.EMBAR.EDAD_GEST_REGLA)) {
        POPUP(
          {
            titulo: "Condición usuaria",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.selec_embarazo,
            seleccion: this.reg_evo.RIPS.EMBAR,
            callback_f: () => this.validar_cod_diag(0),
          },
          (data) => {
            this.reg_evo.RIPS.EMBAR = data.COD;
            this.dato_finalidad_consulta();
          }
        );
      } else if (parseInt(this.reg_evo.EMBAR.EDAD_GEST_REGLA) < 13) {
        this.reg_evo.RIPS.EMBAR = "1";
        this.dato_finalidad_consulta();
      } else if (parseInt(this.reg_evo.EMBAR.EDAD_GEST_REGLA) < 26) {
        this.reg_evo.RIPS.EMBAR = "2";
        this.dato_finalidad_consulta();
      } else {
        this.reg_evo.RIPS.EMBAR = "3";
        this.dato_finalidad_consulta();
      }
    },

    dato_finalidad_consulta() {
      let _this = this;

      if (this.reg_evo.UNSERV == "08") {
        let datos = {
          EDAD: this.reg_hc.edad,
          SEXOPACI: this.reg_paci.SEXO,
          seleccion: this.reg_evo.RIPS.FINALID,
        };

        setTimeout(() => {
          SER834A(datos, _this.dato_temp, (data) => {
            _this.reg_evo.RIPS.FINALID = data.COD;
            _this.dato_primera_vez();
          });
        }, 300);
      } else {
        this.reg_evo.RIPS.FINALID = "10";
        this.dato_primera_vez();
      }
    },

    dato_primera_vez() {
      if (this.reg_evo.RIPS.FINALID == "00" || this.reg_evo.RIPS.FINALID == "10") {
        this.reg_evo.PRIMERA_VEZ = "";
        this.dato_nro_control();
      } else {
        CON851P(
          "Primera vez",
          () => {
            this.reg_evo.PRIMERA_VEZ = "N";
            this.dato_nro_control();
          },
          () => {
            this.reg_evo.PRIMERA_VEZ = "S";
            this.dato_nro_control();
          }
        );
      }
    },

    dato_nro_control() {
      if (this.reg_evo.RIPS.FINALID == "06") {
        if (this.reg_evo.PRIMERA_VEZ == "S") {
          this.reg_evo.EMBAR.NRO_CONTR = "01";
          this.dato_cronico();
        } else {
          validarInputs(
            {
              form: "#validar_nro_controles",
              orden: "1",
            },
            () => {
              this.dato_finalidad_consulta();
            },
            () => {
              let nro = (this.reg_evo.EMBAR.NRO_CONTR = this.reg_evo.EMBAR.NRO_CONTR.padStart(2, "0"));

              if (nro > 25) {
                CON851("", "LIMITE MAXIMO 25", null, "warning", "Advertencia");
                this.dato_nro_control();
              } else if (nro < 2) {
                CON851("", "NO MARCO PRIMERA VEZ!", null, "warning", "Advertencia");
                this.dato_nro_control();
              } else {
                this.dato_cronico();
              }
            }
          );
        }
      } else {
        this.reg_evo.EMBAR.NRO_CONTR = "00";
        this.dato_cronico();
      }
    },

    ventana_patologias() {
      let _this = this;
      _ventanaDatos({
        titulo: "Ventana patologías crónicas",
        columnas: ["COD", "DESCRIP"],
        data: this.array_patologias,
        ancho: "60%",
        callback_esc: () => {
          document.getElementById("cod_patologias").focus();
        },
        callback: (data) => {
          _this.reg_evo.CRONICO = data.COD;
          setTimeout(() => _enterInput("#cod_patologias"), 100);
        },
      });
    },

    dato_cronico() {
      if (this.reg_evo.RIPS.FINALID == "11") {
        validarInputs(
          {
            form: "#validar_patologias",
            orden: "1",
          },
          () => {
            this.dato_finalidad_consulta();
          },
          () => {
            this.reg_evo.CRONICO = this.reg_evo.CRONICO.trim();

            let patologia = this.array_patologias.find((el) => el.COD.trim() == this.reg_evo.CRONICO);

            if (!this.reg_evo.CRONICO) {
              if (this.reg_evo.RIPS.FINALID == "11") {
                CON851("02", "02", null, "warning", "Advertencia");
                this.dato_cronico();
              } else {
                this.dato_tanner_pubico();
              }
            } else if (!patologia) {
              CON851("01", "01", null, "warning", "Advertencia");
              this.dato_cronico();
            } else {
              this.dato_tanner_pubico();
            }
          }
        );
      } else {
        this.reg_evo.CRONICO = "";
        this.dato_tanner_pubico();
      }
    },

    dato_tanner_pubico() {
      if (this.reg_evo.RIPS.FINALID == "05") {
        validarInputs(
          {
            form: "#validar_tanner_pubico",
            orden: "1",
          },
          () => {
            if (this.reg_evo.RIPS.FINALID == "11") {
              this.dato_cronico();
            } else {
              this.dato_finalidad_consulta();
            }
          },
          () => {
            let tanner = this.reg_evo.SIGNOS_VITALES.TANNER_PUBICO;

            if (parseInt(tanner) >= 0 && parseInt(tanner) <= 5) {
              this.dato_tanner_genital();
            } else {
              CON851("03", "03", null, "warning", "Advertencia");
              this.dato_tanner_pubico();
            }
          }
        );
      } else {
        this.dato_plan_familiar();
      }
    },

    dato_tanner_genital() {
      if (this.reg_evo.RIPS.FINALID == "05") {
        validarInputs(
          {
            form: "#validar_tanner_genital",
            orden: "1",
          },
          () => {
            if (this.reg_evo.RIPS.FINALID == "11") {
              this.dato_cronico();
            } else {
              this.dato_tanner_pubico();
            }
          },
          () => {
            let tanner = this.reg_evo.SIGNOS_VITALES.TANNER_GENIT;

            if (parseInt(tanner) >= 0 && parseInt(tanner) <= 5) {
              this.dato_plan_familiar();
            } else {
              CON851("03", "03", null, "warning", "Advertencia");
              this.dato_tanner_genital();
            }
          }
        );
      } else {
        this.dato_plan_familiar();
      }
    },

    dato_plan_familiar() {
      if (this.reg_evo.RIPS.FINALID == "03" || this.sw_embarzo) {
        POPUP(
          {
            titulo: "MÉTODO DE PLANIFICACIÓN",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            array: this.selec_planificacion,
            seleccion: this.reg_evo.EMBAR.PLANIFIC || "1",
            callback_f: () => this.validar_cod_diag(),
          },
          (data) => {
            this.reg_evo.EMBAR.PLANIFIC = data.COD;

            if (this.reg_evo.RIPS.FINALID == "03" && !this.reg_evo.EMBAR.PLANIFIC.trim()) {
              CON851("02", "02", null, "warning", "Advertencia");
              setTimeout(() => this.dato_plan_familiar(), 300);
            } else {
              this.reg_evo.EMBAR.OTR_PLANIFIC = "";
              this.grabar_evo(this.dato_plan_familiar);
            }
          }
        );
      } else {
        this.grabar_evo(this.validar_cod_diag);
      }
    },

    grabar_evo(callback) {
      CON851P("01", callback, () => {
        let datos_envio = getDatosGuardadoEvol(this.reg_evo, this.admin_w);
        datos_envio.SOL_MED_GENERAL = this.sol_med_general;
        postData(datos_envio, get_url("APP/HICLIN/SAVE_EVOL.DLL"))
          .then((data) => {
            console.log("Data save_evol: ", data);
            CON851("", "Ok", null, "success", "Evolución grabada con exito");
            this.grabar_detalle_evolucion();
          })
          .catch((err) => {
            CON851("", "Ha ocurrido un error guardando informacion de la evolución", null, "error", "Error");
            console.log("Error grabado evolucion: ", err);
            callback();
          });
      });
    },

    grabar_detalle_evolucion() {
      let data = {};

      data.datosh = datosEnvio() + this.reg_evo.LLAVE_EVO + "|" + "1" + "|";

      let detalle = JSON.parse(JSON.stringify(this.detalle_evo.replace(/(\r\n|\n|\r)/gm, "&")));

      let posicion = 0;
      let contadorLin = 0;
      let contadorTotal = 0;
      let linea = "";
      let maximo = 90;

      detalle.split("").forEach((item, i) => {
        contadorTotal = i + 1;
        contadorLin = contadorLin + 1;

        switch (item) {
          case "á":
          case "é":
          case "í":
          case "ó":
          case "ú":
          case "Á":
          case "É":
          case "Í":
          case "Ó":
          case "Ú":
          case "ñ":
          case "Ñ":
          case "!":
          case '"':
          case "#":
          case "$":
          case "%":
          case "/":
          case "(":
          case ")":
          case "=":
          case "?":
          case "*":
          case "+":
          case "-":
          case "@":
          case ">":
          case "<":
            maximo = maximo + 1;
            break;
        }
        linea += item;

        if (contadorLin == maximo || detalle.length == contadorTotal) {
          posicion = posicion + 1;

          data["RENG_DEVO_" + posicion.toString().padStart(3, "0")] = linea;
          contadorLin = 0;
          linea = "";
          maximo = 90;
        }
      });

      postData(data, get_url("APP/HICLIN/SAVE_DETEVO.DLL"))
        .then((data) => {
          console.log(data);
          CON851("", "Ok", null, "success", "Detalles grabados con exito");
          this.marcarCita();
        })
        .catch((error) => {
          console.log(error);
          CON851("", "Error grabando detalles", null, "error", "Error");
          jAlert(
            {
              titulo: "ATENCION!",
              mensaje: "<b>Mensaje: </b>Ha ocurrido un error grabando los detalles!<br>",
            },
            () => {
              setTimeout(() => {
                this.grabar_detalle_evolucion();
              }, 300);
            }
          );
        });
    },

    marcarCita() {
      postData(
        {
          datosh: datosEnvio() + this.reg_evo.FECHA_EVO + "|" + this.reg_evo.MEDICO + "|" + this.reg_paci.COD + "|",
        },
        get_url("APP/HICLIN/HC-101.DLL")
      )
        .then(this.dato_formulacion)
        .catch((err) => {
          CON851("", "Error marcando cita", null, "error", "Error");
          console.log("Error marcando cita: ", err);
          setTimeout(() => {
            this.dato_formulacion();
          }, 300);
        });
    },

    dato_formulacion() {
      if (this.reg_prof.ATIENDE == "4") {
        CON851P(
          "00",
          () => {
            this.salir_hc003();
          },
          () => {
            this.imprimir();
          }
        );
      } else {
        $_REG_HC.fecha_lnk = this.reg_evo.FECHA_EVO;
        $_REG_HC.hora_lnk = this.reg_evo.HORA_EVO;
        $_REG_HC.oper_lnk = this.reg_evo.OPER_EVO;
        $_REG_HC.tipo_evo = "2";
        $("#body_main").load("../../HICLIN/paginas/HC002F.html");
      }
    },

    async imprimir() {
      loader("show");
      await this.getCiudades();
      await this.getPaises();
      await this.getEntidades();
      await this.getOcupaciones();
      await this.getEspecialidades();

      let jsonEnvio = await {
        folio: this.reg_evo.LLAVE_EVO.slice(15, 23),
        macro: this.reg_evo.MACRO.CLASE + this.reg_evo.MACRO.CODIGO,
        id: this.reg_evo.LLAVE_EVO.slice(0, 15),
        oper: this.reg_evo.OPER_EVO,
        medic: this.reg_evo.MEDICO,
        fecha: this.reg_evo.FECHA_EVO,
        hora: this.reg_evo.HORA_EVO,
        _arrayTipoEvo: tipoEvolucion(),
        original: 0,
        _opciones: {
          opc_aper: "N",
          opc_evo: "N",
          opc_enf: "S",
          opc_ter: "N",
          opc_for: "N",
          opc_lab: "N",
          opc_ima: "N",
          opc_ord: "N",
          opc_con: "N",
          opc_inc: "N",
          opc_resu: "N",
          fechaIni: "00000000",
          fechaFin: "99999999",
          opc_macro: this.reg_evo.MACRO.CLASE + this.reg_evo.MACRO.CODIGO,
        },
        arrayDatos_HCI02: {
          _ciudades: this.arrayCiudades,
          _entidades: this.arrayEntidades,
          _ocupaciones: this.arrayOcupaciones,
          reg_pac: $_REG_PACI,
          _paisesRips: this.arrayPaises,
          _hcpac: this.reg_hc,
          _especialidades: this.arrayEsp,
        },
        resumido: false,
        todasFormu: true,
      };

      console.log(jsonEnvio);
      loader("hide");
      await _iniciarHCI02(jsonEnvio);

      this.salir_hc003();
    },

    salir_hc003() {
      _regresar_menuhis();
    },

    async getCiudades() {
      await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
        .then((data) => {
          this.arrayCiudades = data.CIUDAD;
          this.arrayCiudades.pop();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          this.salir_hc003();
        });
    },

    async getPaises() {
      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER888.DLL"))
        .then((data) => {
          this.arrayPaises = data.PAISESRIPS;
          this.arrayPaises.pop();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          this.salir_hc003();
        });
    },

    async getEntidades() {
      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
        .then((data) => {
          this.arrayEntidades = data.ENTIDADES;
          this.arrayEntidades.pop();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          this.salir_hc003();
        });
    },

    async getOcupaciones() {
      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER854.DLL"))
        .then((data) => {
          this.arrayOcupaciones = data.OCUPACIONES;
          this.arrayOcupaciones.pop();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          this.salir_hc003();
        });
    },

    async getEspecialidades() {
      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
        .then((data) => {
          this.arrayEspecialidades = data.ESPECIALIDADES;
          this.arrayEspecialidades.pop();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          this.salir_hc003();
        });
    },

    ventana_operadores() {
      const _this = this;
      _ventanaDatos({
        titulo: "VENTANA CONSULTA DE OPERADORES",
        columnas: ["CODIGO", "DESCRIPCION"],
        data: _this.operadores,
        callback_esc: function () {
          document.querySelector(".validar_operador").focus();
        },
        callback: function (data) {
          _this.oper_elab = data["CODIGO"];
          _enterInput(".validar_operador");
        },
      });
    },

    async get_operadores() {
      loader("show");
      const _this = this;
      await postData(
        {
          datosh: datosEnvio(),
        },
        get_url("APP/CONTAB/CON982.DLL")
      )
        .then((data) => {
          loader("hide");
          data.ARCHREST.pop();
          _this.operadores = data.ARCHREST;
          console.log(_this.operadores);
        })
        .catch((err) => {
          loader("hide");
          console.log("Error leyendo operadores ", err);
          this.salir_hc003();
        });
    },

    async get_morse() {
      let _this = this;

      let datos_envio = {
        datosh: datosEnvio(),
        llave_evo: _this.reg_evo.LLAVE_EVO,
        fecha_upp: moment(_this.reg_evo.FECHA_EVO).subtract(30, "days").format("YYYYMMDD"),
        fecha_morse_1: moment(_this.reg_evo.FECHA_EVO).subtract(1, "days").format("YYYYMMDD"),
        fecha_morse_2: moment(_this.reg_evo.FECHA_EVO).subtract(2, "days").format("YYYYMMDD"),
        fecha_morse_3: moment(_this.reg_evo.FECHA_EVO).subtract(3, "days").format("YYYYMMDD"),
      };

      await postData(datos_envio, get_url("APP/HICLIN/MORSE_UPP.DLL"))
        .then((data) => {
          data.MORSE_UPP.habilitar_morse == 1 ? (_this.habilitar_morse = true) : (_this.habilitar_morse = false);
          _this.morse = data.MORSE_UPP.morse;
          _this.ult_morse = data.MORSE_UPP.ult_morse;

          data.MORSE_UPP.habilitar_upp == 1 ? (_this.habilitar_upp = true) : (_this.habilitar_upp = false);
          _this.upp = data.MORSE_UPP.upp;
          _this.ult_upp = data.MORSE_UPP.ult_upp;
        })
        .catch((err) => {
          console.log("Error morse: ", err);
          this.salir_hc003();
        });
    },

    ventana_macros() {
      let _this = this;
      let macros_filtrados = this.array_macros.filter((el) => el.CLASE == _this.reg_evo.MACRO.CLASE);

      _ventanaDatos({
        titulo: "Ventana macros por tipo",
        columnas: ["CLASE", "CODIGO", "DETALLE"],
        data: macros_filtrados,
        ancho: "70%",
        callback_esc: () => {
          document.getElementById("codigoMacro_hc003").focus();
        },
        callback: (data) => {
          _this.reg_evo.MACRO.CODIGO = data.CODIGO.trim();
          setTimeout(() => _enterInput("#codigoMacro_hc003"), 100);
        },
      });
    },

    async get_macros() {
      let _this = this;
      loader("show");

      await postData(
        {
          datosh: datosEnvio(),
        },
        get_url("APP/HICLIN/HC808.DLL")
      )
        .then((data) => {
          loader("hide");
          console.log("reg_macroevol: ", data);

          _this.array_macros = data.MACROS;
          _this.array_macros.pop();

          for (var i in _this.array_macros) {
            _this.array_macros[i].CODIGO = _this.array_macros[i].CODIGO.trim();
          }
        })
        .catch((err) => {
          loader("hide");
          console.log("Error macros: ", err);
          CON851("", "leyendo macros", null, "error", "Error");
          throw err;
        });
    },

    async get_vias() {
      let _this = this;

      await postData(
        {
          datosh: datosEnvio(),
        },
        get_url("APP/SALUD/SER856.DLL")
      )
        .then((data) => {
          loader("hide");
          console.log("Vias: ", data);
          _this.array_vias = data.VIAS_ACCESO;
          _this.array_vias.pop();
        })
        .catch((err) => {
          loader("hide");
          console.log("Error vias: ", err);
          CON851("", "leyendo vias", null, "error", "Error");
          throw err;
        });
    },

    get_enfermedades() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER851.DLL"))
        .then((data) => {
          console.log("enfermedades", data);
          this.array_enfermedades = data.ENFERMEDADES;
          this.array_enfermedades.pop();

          for (var i in this.array_enfermedades) {
            this.array_enfermedades[i].NOMBRE_ENF = this.array_enfermedades[i].NOMBRE_ENF.replace(/\�/g, "Ñ").trim();
          }
        })
        .catch((err) => {
          console.log("Error leyendo enfermedades: ", err);
          CON851("", "leyendo enfermedades", null, "error", "Error");
          this.salir_hc003();
        });
    },

    get_patologias() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER858.DLL"))
        .then((data) => {
          this.array_patologias = data.PATOLOGIAS;
          this.array_patologias.pop();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "consultando patologías !", null, "error", "Error");
          this.dato_hora();
        });
    },

    validarEsc_lista_chequeo() {
      this.params_lista_chequeo.estado = false;
      this.dato_gurin();
    },

    validarCallback_lista_chequeo(data) {
      this.reg_dethc.lista_chequeo = data;
      this.params_lista_chequeo.estado = false;
      this.dato_oximetria();
    },

    validarEsc_creatinina() {
      this.params_creatinina.estado = false;
      this.dato_oximetria();
    },

    validarCallback_creatinina(data) {
      console.log("return creatinina: ", data);

      this.reg_evo.CREATININA2 = data.creatinina2;
      this.reg_evo.HEMO_GLICOSILADA = data.hemo_glicosilada;
      this.reg_evo.HEMO_GLICO_FECHA = data.hemo_glico_fecha;
      this.reg_evo.MICROALBUMINURIA = data.microalbuminuria;
      this.reg_evo.FECHA_MICROALBUMINURIA = data.fecha_microalbuminuria;
      this.reg_evo.RIESGO_CARDIO = data.riesgo_cardio;
      this.reg_evo.RELA_ALBUMI_CREATINI_1 = data.rela_albumi_creatini_1;
      this.reg_evo.RELA_ALBUMI_CREATINI_2 = data.rela_albumi_creatini_2;
      this.reg_evo.ERC = data.erc;
      this.reg_evo.FECHA_DX_ERC = data.fecha_dx_erc;
      this.reg_evo.FECHA_CREATININA = data.fecha_creatinina;
      this.reg_evo.ESTADIO_ERC = data.estadio_erc;

      this.params_creatinina.estado = false;
      this.datos_embarazo();
    },

    adicionar_morse() {
      this.detalle_evo += "EVALUACION DE RIRESGO DE CAIDAS DE PACIENTES ESCALA DE MORSE\n";
      let calc_morse = this.ult_morse.calc;

      if (calc_morse < 25) {
        this.detalle_evo += `RIESGO BAJO - PUNTAJE: ${calc_morse}\n ${this.riesgo_morse.bajo}`;
      }

      if (calc_morse >= 25 && calc_morse <= 50) {
        this.detalle_evo += `RIESGO MEDIO - PUNTAJE: ${calc_morse}\n
                ${this.riesgo_morse.bajo}\n
                ${this.riesgo_morse.medio}`;
      }

      if (calc_morse > 50) {
        this.detalle_evo += `RIESGO ALTO - PUNTAJE: ${calc_morse}\n 
                    ${this.riesgo_morse.bajo}\n
                    ${this.riesgo_morse.medio}\n
                    ${this.riesgo_morse.alto}`;
      }
    },

    adicionar_upp() {
      this.detalle_evo += `\nCONTROL CUIDADOS DE PIEL PARA PREVENCION DE ULCERAS POR PRESION (UPP) \n`;
      let calc_upp = this.ult_upp.calc;

      if (calc_upp < 13) this.detalle_evo += `RIESGO ALTO - PUNTAJE: ${calc_upp}`;
      if (calc_upp > 13 && calc_upp <= 16)
        this.detalle_evo += `RIESGO MEDIO - PUNTAJE: ${calc_upp} \n ${this.riesgo_upp}`;
      if (calc_upp > 16) this.detalle_evo += `RIESGO BAJO - PUNTAJE: ${calc_upp}`;
    },
  },
});
