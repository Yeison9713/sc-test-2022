new Vue({
  el: "#HC002",
  data: {
    macros_existentes: [],
    opc_tipo_anes: [
      { COD: "1", DESCRIP: "GENERAL" },
      { COD: "2", DESCRIP: "EPIDURAL" },
      { COD: "3", DESCRIP: "RAQUIDEA" },
      { COD: "4", DESCRIP: "SEDACION" },
      { COD: "5", DESCRIP: "BLOQUEO" },
      { COD: "6", DESCRIP: "LOCAL ASISTIDA" },
      { COD: "7", DESCRIP: "LOCAL" },
      { COD: "8", DESCRIP: "SIN ANESTESIA" },
    ],
    opc_even_adverso: [
      { COD: "1", DESCRIP: "INFECCION INTRAHOSPITALARIA" },
      { COD: "2", DESCRIP: "COMPLICACION QUIRURGICA HOSP" },
      { COD: "3", DESCRIP: "COMPLICACION QUIRURGICA MEDIAT" },
      { COD: "4", DESCRIP: "COMPLICACION DE ANESTESIA" },
      { COD: "5", DESCRIP: "PACIENTE REINTERVENIDO" },
      { COD: "9", DESCRIP: "NO APLICA" },
    ],
    opc_tipo_ciru: [
      { COD: "1", DESCRIP: "LIMPIA" },
      { COD: "2", DESCRIP: "CONTAMINADA" },
      { COD: "3", DESCRIP: "LIMPIA-CONTAMINADA" },
      { COD: "4", DESCRIP: "SUCIA" },
      { COD: "9", DESCRIP: "NO APLICA" },
    ],
    condicion_embarazo: [
      { COD: "1", DESCRIP: "EMBARAZO PRIMER TRIMESTRE" },
      { COD: "2", DESCRIP: "EMBARAZO SEGUNDO TRIMESTRE" },
      { COD: "3", DESCRIP: "EMBARAZO TERCER TRIMESTRE" },
      { COD: "4", DESCRIP: "NO ESTA EMBARAZADA" },
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
    tipos_diagnostico: [
      { COD: "1", DESCRIP: "IMPRESION DIAGNOSTICA" },
      { COD: "2", DESCRIP: "CONFIRMADO NUEVO" },
      { COD: "3", DESCRIP: "CONFIRMADO REPETIDO" },
      { COD: "9", DESCRIP: "NO APLICA" },
    ],
    metodos_planificacion: [
      { COD: "1", DESCRIP: "DIE" },
      { COD: "2", DESCRIP: "ORAL" },
      { COD: "3", DESCRIP: "BARRERA" },
      { COD: "4", DESCRIP: "OTRO" },
      { COD: "5", DESCRIP: "NINGUNO" },
      { COD: "6", DESCRIP: "DIU + BARRERA" },
      { COD: "7", DESCRIP: "IMPLA. SUBDERMICO" },
      { COD: "8", DESCRIP: "I. SUBDERMICO + BARRERA" },
      { COD: "9", DESCRIP: "ORAL + BARRERA" },
      { COD: "A", DESCRIP: "INYECTABLE MENSUAL" },
      { COD: "B", DESCRIP: "INYECTABLE + BARRERA" },
      { COD: "C", DESCRIP: "INYECTABLE TRIMESTRAL" },
      { COD: "D", DESCRIP: "TRIMESTRAL + BARRERA" },
      { COD: "E", DESCRIP: "EMERGENCIA" },
      { COD: "F", DESCRIP: "EMERGENCIA + BARRERA" },
      { COD: "G", DESCRIP: "ESTERILIZACION" },
      { COD: "H", DESCRIP: "ESTERILIZA + BARRERA" },
      { COD: "I", DESCRIP: "NO USA X TRADICION" },
      { COD: "J", DESCRIP: "NO USA X SALUD" },
      { COD: "K", DESCRIP: "NO USA X NEGACION" },
      { COD: "L", DESCRIP: "COITUS INTERRUPTUS" },
      { COD: "M", DESCRIP: "METODO DEL RITMO" },
    ],
    estadoSalidaRips: [
      { COD: "1", DESCRIP: "VIVO (A)" },
      { COD: "2", DESCRIP: "MUERTO (A)" },
      { COD: "3", DESCRIP: "REMITIDO (A)" },
      { COD: "4", DESCRIP: "HOSPITALIZADO (A)" },
      { COD: "5", DESCRIP: "OBSERVACIÓN" },
      { COD: "6", DESCRIP: "NO APLICA" },
    ],
    fecha_citologia_previa: "",
    fecha_mamografia: "",
    patologias_cronicas: [],
    vias_existentes: [],
    enfermedades: [],
    salas_cirugias: [],
    cups: [],
    solicitud_patologia: "",
    nuevo_folio: false,
    operador: "",
    datos_paciente: {
      SEXO: "",
    },
    mascaras: {
      fecha_citologia: "",
      fecha_mamografia: "",
      temp: IMask.createMask({
        mask: Number,
        radix: ".",
        padFractionalZeros: true,
        signed: false,
        scale: 2,
        min: 0000,
        max: 99.99,
      }),
      PER_TORA: IMask.createMask({
        mask: Number,
        radix: ".",
        padFractionalZeros: true,
        signed: false,
        scale: 1,
        min: 0000,
        max: 999.9,
      }),
      G_URIN: IMask.createMask({
        mask: Number,
        radix: ".",
        padFractionalZeros: true,
        signed: false,
        scale: 2,
        min: 000,
        max: 9.99,
      }),
      peso: IMask.createMask({
        mask: Number,
        radix: ".",
        padFractionalZeros: true,
        signed: false,
        scale: 1,
        min: 0,
        max: 99999.9,
      }),
    },
    ciudades: [],
    paises: [],
    macro_escogida: {
      DETALLE: "",
      VIAS_ACCESO: [],
      CONTENIDO: "",
    },
    global_HC002: {
      LLAVE_EVO: "",
      FECHA_EVO: "",
      ANO_EVO: "",
      MES_EVO: "",
      DIA_EVO: "",
      HORA_EVO: "",
      OPER_EVO: "",
      NOVEDAD: "",
      TIPO: "",
      MEDICO: "",
      NOM_MEDICO: "",
      UNSERV: "",
      COVID: {
        FIEBRE: "",
        TOS: "",
        DISNEA: "",
        MALESTAR: "",
        RINORREA: "",
        ODINOFAGIA: "",
        VIAJE: "",
        CONTACTO: "",
        PERSONAL_SALUD: "",
        VIAJE_DENTRO: "",
        LUGAR_VIAJE_DENTRO: "",
        TIEMPO_VIAJE_DENTRO: "",
        VIAJE_FUERA: "",
        LUGAR_VIAJE_FUERA: "",
        TIEMPO_VIAJE_FUERA: "",
      },
      PESO_NEW: "",
      SIGNOS_VITALES: {
        PESO: "",
        TALLA: "",
        IMC_CORP: "",
        SUP_CORP: "",
        TEMP: "",
        F_CARD: "",
        F_RESP: "",
        TENS_1: "",
        TENS_2: "",
        TENS_MEDIA: "",
        UNID_PESO: "",
        TANNER_PUBICO: "",
        TANNER_GENIT: "",
        PVC: "",
        APER_OCUL: "",
        RESP_VERB: "",
        RESP_MOTO: "",
        VLR_GLASG: "",
        G_URIN: "",
        OXIMETRIA: "",
        GLUCOMETRIA: "",
        PESO_GRAMOS: "",
        ETCO: "",
        RESUL_CITO: "",
        MUEST_CITO: "",
        CREATININA: "",
        OTR_SIG: "",
      },
      MACRO: {
        CLASE: "",
        CODIGO: "",
        CLASIF: "",
        VIA: "",
      },
      TABLA_DIAGNOSTICOS: ["", "", "", "", "", "", "", "", "", ""],
      TABLA_CUPS: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      PROCEDIMIENTOS: {
        TIPO_ANES: "",
        TIEMPO_PROC: "",
        TIEMPO_SALA: "",
        SALA_CIRU: "",
        PROC_PROGRAMADO: "",
        PROC_AMBULA: "",
        EVEN_ADVERSO: "",
        TIPO_CIRUGIA: "",
      },
      RIPS: {
        EMBAR: "",
        CAUSA: "",
        FINALID: "",
        ESTADO_SAL: "",
        REMITIDO: "",
        ATIENDE: "",
        UNID_EDAD: "",
        EDAD: "",
        DIAG_MUER: "",
      },
      OPER_LECT: "",
      FECHA_LECT: "",
      OPER_FACT: "",
      FECHA_FACT: "",
      LIQUIDOS: {
        LIQ_ADM_ORAL: "",
        LIQ_ADM_VENA: "",
        LIQ_ADM_TRAN: "",
        LIQ_ELI_ORIN: "",
        LIQ_ELI_DIAR: "",
        LIQ_ELI_SOND: "",
        LIQ_ELI_OTR1: "",
        LIQ_ELI_DET: "",
      },
      PUPILAS: {
        TAM_PUP_DR: "",
        REA_PUP_DR: "",
        TAM_PUP_IZ: "",
        REA_PUP_IZ: "",
      },
      MUSCULAR: {
        MSD: "",
        MSI: "",
        MII: "",
        MID: "",
      },
      REV_CITO: "",
      SINTOM_RESPI: "",
      PRIMERA_VEZ: "",
      SINTOM_PIEL: "",
      TIPO_MET_OXI: "",
      DESC_MET_OXI: "",
      FCARD_FET: "",
      DOSIS_OXIGENO: "",
      PER_TORA: "",
      PER_MUNE: "",
      TIPO_DIAG: "",
      CRONICO: "",
      CRECIMIENTO: {
        PER_CEF: "",
        PES_ED_ESTAD: "",
        TALLA_ED_ESTAD: "",
        PESO_TAL_ESTAD: "",
        IMC_ESTAD: "",
        PER_CEF_ESTAD: "",
      },
      EMBAR: {
        GESTACIONES: "",
        FECHA_REGLA: "",
        EDAD_GEST_REGLA: "",
        ALT_UTER: "",
        PESO_PREV: "",
        EST_NUTRI: "",
        PLANIFIC: "",
        OTR_PLANIFIC: "",
        NRO_CONTR: "",
      },
      PATOLOGIA: {
        PIEZA_QUIR: "",
        DATOS_CLINICOS: "",
        FECHA_MUEST: "",
        TIPO_ESTUD: "",
        HISTOL_ESTUD: "",
        GRADO_DIF_ESTUD: "",
      },
      VICTI_MALTRATO: "",
      VICTI_VIOLENCIA: "",
      ENFER_MENTAL: "",
      ENFER_ITS: "",
      CANCER_SENO: "",
      CANCER_CERVIS: "",
      LISTA_CHEQUEO_CIR: "",
      HEMO_GLICOSILADA: "",
      HEMO_GLICO_FECHA: "",
      MICROALBUMINURIA: "",
      FECHA_MICROALBUMINURIA: "",
      RIESGO_CARDIO: "",
      MICROALBUMINURIA_2: "",
      EDU_AUTOEXA_SENO: "",
      ERC: "",
      FECHA_DX_ERC: "",
      TRATA_ITS: "",
      CUAL_ITS: "",
      CITOLOGIA_PREVIA: "",
      FECHA_CITO_PREVIA: "",
      RESUL_CITO_PREVIA: "",
      RELA_ALBUMI_CREATINI_2: "",
      CONTACTO_LEPRA: "",
      FECHA_ASESORIA_PRE_VIH: "",
      FECHA_ASESORIA_POS_VIH: "",
      FECHA_ULT_MAMO: "",
      CONDUCTA: "",
      FECHA_CREATININA: "",
      ESTADIO_ERC: "",
      RELA_ALBUMI_CREATINI_1: "",
      HAB: "",
      ID_ACEPTA_CONSEN: "",
      ESPECIALIDAD_HC02: "",
      FECHA_CITA_ESP_HC02: "",
      ACOMPA: "",
      PRIORIDAD_FORMU: "",
      PER_ABDO: "",
      DATOS_GRABADO: {
        FECHA_GRAB: "",
        HORA_GRAB: "",
      },
      INST_EXAM: "",
      IPS_EXAM: "",
      DATOS_TRAS: {
        OPER_TRAS: "",
        FECHA_TRAS: "",
        LLAVE_PACI_TRAS: "",
      },
    },
    DETALLE_EVO: {
      CONTENIDO: "", //TIPO 1 EN LLAVE DETALLE EVO & 1001 EN HISTORIA DETALLADA
      ANALISIS: "", //TIPO 2 EN LLAVE DETALLE EVO & 7501 EN HISTORIA DETALLADA
      PLAN: "", //TIPO 6 EN LLAVE DETALLE EVO & 7503 EN HISTORIA DETALLADA
    },
    DETALLE_HC: {
      ANTECEDENTES_TOXICO: "", // 2035 TOXICOLOGIA
    },
    historia_clinica: {
      edad: "",
      motivo: "",
      proceden: "",
      rips: {
        tabla_diag: [],
      },
      covid19: {
        consenti_acomp_covid19: "",
        contacto_covid19: "",
        disnea_covid19: "",
        fiebre_covid19: "",
        lugar_dentro_covid19: "",
        lugar_fuera_covid19: "",
        malestar_covid19: "",
        odinofagia_covid19: "",
        personal_salud_covid19: "",
        recomendacion_covid19: "",
        rinorrea_covid19: "",
        tiempo_dentro_covid19: "",
        tiempo_fuera_covid19: "",
        tos_covid19: "",
        viaje_covid19: "",
        viaje_dentro_covid19: "",
        viaje_fuera_covid19: "",
      },
      revaloracion: "",
    },
    bandera_revalorar: "N",
    unidad_peso: "",
    nro_ult_comp: "",
    tipos_macro: [
      { COD: "1", DESCRIP: "CIRUGIAS" },
      { COD: "2", DESCRIP: "PROCEDIMIENTOS" },
      { COD: "3", DESCRIP: "RESULTADOS IMAGENOL" },
      { COD: "4", DESCRIP: "ENFERMERIA" },
      { COD: "5", DESCRIP: "MEDICINA GENERAL" },
      { COD: "6", DESCRIP: "MEDICINA ESPECIALIZ" },
      { COD: "7", DESCRIP: "RESUMENES HISTORIA" },
      { COD: "8", DESCRIP: "TERAPIAS" },
      { COD: "9", DESCRIP: "PRE-ANESTESIA" },
      { COD: "O", DESCRIP: "ODONTOLOGIA" },
      { COD: "P", DESCRIP: "PROMOCION Y PREVENC" },
    ],
    resultados_cito: [
      { COD: "1", DESCRIP: "Normal" },
      { COD: "2", DESCRIP: "Anormal" },
      { COD: "3", DESCRIP: "No aplica" },
      { COD: "4", DESCRIP: "No sabe" },
    ],
    textos: {
      unidad_servicio: "",
      descrip_tipo_macro: "",
      descrip_via_macro: "",
      descrip_evol: "",
      ciudad_dentro: "",
      pais_fuera: "",
      resultado_citologia: "",
      glasgow: "",
      ocular: "",
      verbal: "",
      motora: "",
      descrip_diagnosticos: ["", "", "", "", "", "", "", "", "", ""],
      descrip_cups: ["", "", "", "", "", "", "", "", "", ""],
      anestesia: "",
      descrip_sala_cirugia: "",
      evento_adverso: "",
      tipo_cirugia: "",
      estado_salida: "",
      personal_atiende: "",
      estado_gravidez: "",
      causa_externa: "",
      tipo_diagnostico: "",
      finalidad_consulta: "",
      estado_salida_rips: "",
      descrip_tipo_diag_rips: "",
      metodo_planificacion: "",
      descrip_pato_cronica: "",
    },
    operaciones: {
      sup: "",
    },
    flujo_bloques: {
      apertura: false,
      evolucion: false,
      covid: false,
      sintomaticos: false,
      procedimientos_cirugias: false,
      signos_vitales: false,
      codificacion_diagnosticos: false,
      analisis: false,
      rips: false,
    },
    params_vacunacion_covid: {
      estado: false,
      modal: false,
      paso: null,
    },
    mostrarEnfermedades: false,
    inputEnfer: {
      nombre: "",
      tipo: 0,
      pos: 0,
    },
  },
  components: {
    vacunacion_covid: require("../../HICLIN/scripts/HC-9012.vue"),
    ser851: require("../../SALUD/scripts/SER851.vue.js"),
  },
  created() {
    _toggleNav();
    nombreOpcion("4,1 - Evolución médica");

    _inputControl("disabled");
    _inputControl("reset");
    this.datos_paciente = JSON.parse(JSON.stringify($_REG_PACI));

    this.global_HC002.OPER_EVO = localStorage.Usuario;

    if (this.global_HC002.OPER_EVO == "GEBC") {
      this.global_HC002.ANO_EVO = moment().format("YYYY");
      this.global_HC002.MES_EVO = moment().format("MM");
      this.global_HC002.DIA_EVO = moment().format("DD");
      this.global_HC002.HORA_EVO = moment().format("HHmm");
      this.aceptarOperadorEvo();
    } else {
      this.traerEvolucion();
    }
  },
  watch: {},
  methods: {
    aceptarOperadorEvo() {
      validarInputs(
        {
          form: "#ValidarOperador_HC002",
          orden: "1",
        },
        () => this.salir_hc002(),
        () => {
          if (this.global_HC002.OPER_EVO.trim() == "") {
            CON851("", "Operador en espacios !", null, "error", "Error");
            this.aceptarOperadorEvo();
          } else this.aceptarAnoEvo()
        }
      );
    },
    aceptarAnoEvo() {
      validarInputs(
        {
          form: "#validarAno_hc002",
          orden: "1",
        },
        () => this.aceptarOperadorEvo(),
        () => {
          let ano = parseInt(this.global_HC002.ANO_EVO) || 0
          if (ano < 1900) {
            CON851("", "Año fuera de rango !", null, "error", "Error");
            this.aceptarAnoEvo()
          } else this.aceptarMesEvo();
        }
      );
    },
    aceptarMesEvo() {
      validarInputs(
        {
          form: "#validarMes_hc002",
          orden: "1",
        },
        () => this.aceptarAnoEvo(),
        () => {
          this.global_HC002.MES_EVO = this.global_HC002.MES_EVO.padStart(2, "0")
          let mes = parseInt(this.global_HC002.MES_EVO) || 0
          if (mes < 1 || mes > 12){
            CON851("", "Mes fuera de rango !", null, "error", "Error");
            this.aceptarMesEvo()
          } else this.aceptarDiaEvo();
        }
      );
    },
    aceptarDiaEvo() {
      validarInputs(
        {
          form: "#validarDia_hc002",
          orden: "1",
        },
        () => this.aceptarMesEvo(),
        () => {
          this.global_HC002.DIA_EVO = this.global_HC002.DIA_EVO.padStart(2, "0")
          let dia = parseInt(this.global_HC002.DIA_EVO) || 0
          if (dia < 1 || dia > 31){
            CON851("", "Dia fuera de rango !", null, "error", "Error");
            this.aceptarDiaEvo()
          } else this.aceptarHoraEvo();
        }
      );
    },
    aceptarHoraEvo() {
      validarInputs(
        {
          form: "#validarHora_hc002",
          orden: "1",
        },
        () => this.aceptarDiaEvo(),
        () => {
          this.global_HC002.FECHA_EVO =
            this.global_HC002.ANO_EVO + this.global_HC002.MES_EVO + this.global_HC002.DIA_EVO;

          this.traerEvolucion();
        }
      );
    },
    botonFlujo(flujo) {
      console.log(flujo);

      _inputControl("disabled");

      // apertura
      set_Event_validar("#validarProcedencia", "off");
      set_Event_validar("#validarMotivoConsulta", "off");
      set_Event_validar("#validarAntecedentes", "off");

      // evolucion
      set_Event_validar("#validarMacro_hc002", "off");
      set_Event_validar("#validarContenido_HC002", "off");

      // procedimientos
      for (var i = 1; i < 15; i++) {
        set_Event_validar("#validarCups_" + i + "_HC002", "off");
      }

      set_Event_validar("#validar_tiempoProce", "off");
      set_Event_validar("#validar_tiempoSala", "off");
      set_Event_validar("#validar_SalaCirugia", "off");
      set_Event_validar("#validarProce_programado", "off");
      set_Event_validar("#validarProce_ambulatorio", "off");
      set_Event_validar("#validarSolicitud_patologia", "off");
      set_Event_validar("#validar_pieza_quirur", "off");
      set_Event_validar("#validar_datos_clinicos", "off");

      //covid
      set_Event_validar("#validarFiebre_COVID", "off");
      set_Event_validar("#validarTos_COVID", "off");
      set_Event_validar("#validarDisnea_COVID", "off");
      set_Event_validar("#validarMalestar_COVID", "off");
      set_Event_validar("#validarRinorrea_COVID", "off");
      set_Event_validar("#validarOdinofagia_COVID", "off");
      set_Event_validar("#validarViaje_COVID", "off");
      set_Event_validar("#validarContacto_COVID", "off");
      set_Event_validar("#validarPersonalSalud_COVID", "off");
      set_Event_validar("#validarViajeDentro_COVID", "off");
      set_Event_validar("#validarTiempoViajeDentro_COVID", "off");
      set_Event_validar("#validarViajeFuera_COVID", "off");
      set_Event_validar("#validarTiempoViajeFuera_COVID", "off");

      //sintomatico
      set_Event_validar("#validarSintomas_respiratorio", "off");
      set_Event_validar("#validarSintomas_piel", "off");
      set_Event_validar("#validarContacto_lepra", "off");
      set_Event_validar("#validarVictima_maltrato", "off");
      set_Event_validar("#validarVictima_violencia", "off");
      set_Event_validar("#validarEnfermedad_mental", "off");
      set_Event_validar("#validarITS", "off");
      set_Event_validar("#validarCual_ITS", "off");
      set_Event_validar("#validarTratamiento_ITS", "off");

      if (this.datos_paciente.SEXO == "F") {
        set_Event_validar("#validarCancer_seno", "off");
        set_Event_validar("#validarCancer_cervix", "off");
        set_Event_validar("#validarAutoexa_seno", "off");
        set_Event_validar("#validarCitologia", "off");
        set_Event_validar("#validarFecha_Citologia", "off");
        set_Event_validar("#validarFecha_mamografia", "off");
      }

      // signos vitales

      set_Event_validar("#validarPeso", "off");

      set_Event_validar("#validartalla", "off");
      set_Event_validar("#validarTemperatura", "off");
      set_Event_validar("#validar_FC", "off");
      set_Event_validar("#validar_FR", "off");
      set_Event_validar("#validar_TA_1", "off");
      set_Event_validar("#validar_TA_2", "off");
      set_Event_validar("#validar_PVC", "off");
      set_Event_validar("#validar_PERTOR", "off");
      set_Event_validar("#validar_PERABDO", "off");
      set_Event_validar("#validar_G_URIN", "off");
      set_Event_validar("#validarOximetria", "off");
      set_Event_validar("#validarGlucometria", "off");

      for (var i = 1; i < 11; i++) {
        set_Event_validar("#validarCod_diag_" + i + "_HC002", "off");
      }

      set_Event_validar("#validar_Analisis", "off");

      set_Event_validar("#validarPrimeraVez", "off");

      set_Event_validar("#validarNroControles", "off");
      set_Event_validar("#validarPatologiaCronica", "off");
      set_Event_validar("#validarVelloPubico", "off");
      set_Event_validar("#validarGenitales", "off");

      set_Event_validar("#validarDiagMuerte", "off");
      set_Event_validar("#validarRemitido", "off");

      if (flujo != 1 && this.historia_clinica.novedad == "7") document.getElementById("btnFlujo_aper").disabled = false;

      switch (flujo) {
        case 1:
          this.validarProcedencia();
          break;
        case 2:
          this.empieza();
          break;
        case 3:
          document.getElementById("btnFlujo_evo").disabled = false;

          this.validarCups_proce(1);
          break;
        case 4:
          document.getElementById("btnFlujo_evo").disabled = false;
          if (this.global_HC002.MACRO.CLASE == "1" || this.global_HC002.MACRO.CLASE == "2")
            document.getElementById("btnFlujo_proce").disabled = false;

          this.validarFiebre_COVID();
          break;
        case 5:
          document.getElementById("btnFlujo_evo").disabled = false;
          if (this.global_HC002.MACRO.CLASE == "1" || this.global_HC002.MACRO.CLASE == "2")
            document.getElementById("btnFlujo_proce").disabled = false;
          document.getElementById("btnFlujo_covid").disabled = false;

          this.validarSintomas_respiratorio();
          break;
        case 6:
          document.getElementById("btnFlujo_evo").disabled = false;
          if (this.global_HC002.MACRO.CLASE == "1" || this.global_HC002.MACRO.CLASE == "2")
            document.getElementById("btnFlujo_proce").disabled = false;
          document.getElementById("btnFlujo_covid").disabled = false;
          document.getElementById("btnFlujo_sintom").disabled = false;

          this.verificarEdad();
          break;
        case 7:
          document.getElementById("btnFlujo_evo").disabled = false;
          if (this.global_HC002.MACRO.CLASE == "1" || this.global_HC002.MACRO.CLASE == "2")
            document.getElementById("btnFlujo_proce").disabled = false;
          document.getElementById("btnFlujo_covid").disabled = false;
          document.getElementById("btnFlujo_sintom").disabled = false;
          document.getElementById("btnFlujo_signos").disabled = false;

          this.validarCod_diagnosticos(0);
          break;
        case 8:
          document.getElementById("btnFlujo_evo").disabled = false;
          if (this.global_HC002.MACRO.CLASE == "1" || this.global_HC002.MACRO.CLASE == "2")
            document.getElementById("btnFlujo_proce").disabled = false;
          document.getElementById("btnFlujo_covid").disabled = false;
          document.getElementById("btnFlujo_sintom").disabled = false;
          document.getElementById("btnFlujo_signos").disabled = false;
          document.getElementById("btnFlujo_diagnosticos").disabled = false;

          this.validarAnalisis();
          break;
      }
    },
    calcularIMCySUP() {
      var peso = "";
      var unid_edad = this.historia_clinica.edad.substring(0, 1);
      var edad = parseInt(this.historia_clinica.edad.substring(1, 4));

      if (unid_edad == "D" || (unid_edad == "M" && edad < 3)) {
        peso = parseFloat(this.global_HC002.PESO_NEW) / 1000;
      } else {
        peso = parseFloat(this.global_HC002.PESO_NEW);
      }
      var talla = parseInt(this.global_HC002.SIGNOS_VITALES.TALLA);

      if (peso == 0 || talla == 0) {
        this.global_HC002.SIGNOS_VITALES.IMC_CORP = 0;
        this.global_HC002.SIGNOS_VITALES.SUP_CORP = 0;
        this.operaciones.sup = "0 m2";
      } else {
        //indice masa corporal
        var tallaDiv = talla / 100;
        var exponencial = Math.pow(tallaDiv, 2);

        var resultado = peso / exponencial;
        this.global_HC002.SIGNOS_VITALES.IMC_CORP = resultado.toFixed(2);

        //sup
        var sup = (peso + talla - 60) / 100;
        this.global_HC002.SIGNOS_VITALES.SUP_CORP = sup.toFixed(2);
        this.operaciones.sup = this.global_HC002.SIGNOS_VITALES.SUP_CORP + " m2";
      }
    },
    calcularTA_media() {
      var sistole = parseInt(this.global_HC002.SIGNOS_VITALES.TENS_1);
      var diastole = parseInt(this.global_HC002.SIGNOS_VITALES.TENS_2);
      var calculo = Math.round((sistole + diastole * 2) / 3);

      this.global_HC002.SIGNOS_VITALES.TENS_MEDIA = parseInt(calculo);
    },
    asignar_Mascaras() {
      var _this = this;
      var momentFormat = "YYYY/MM/DD";
      this.fecha_citologia_previa = new IMask(document.getElementById("fecha_citologia_hc002"), {
        mask: Date,
        pattern: momentFormat,
        lazy: true,
        min: new Date(2000, 0, 1, 0, 0),
        max: new Date(2080, 0, 1, 0, 0),

        format: function (date) {
          return moment(date).format(momentFormat);
        },
        parse: function (str) {
          _this.mascaras.fecha_citologia = str;
          return moment(str, momentFormat);
        },

        blocks: {
          YYYY: {
            mask: IMask.MaskedRange,
            from: 2000,
            to: 2080,
          },
          MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
          },
          DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31,
          },
        },
      });

      this.fecha_mamografia = new IMask(document.getElementById("fecha_mamografia_hc002"), {
        mask: Date,
        pattern: momentFormat,
        lazy: true,
        min: new Date(2000, 0, 1, 0, 0),
        max: new Date(2080, 0, 1, 0, 0),

        format: function (date) {
          return moment(date).format(momentFormat);
        },
        parse: function (str) {
          _this.mascaras.fecha_mamografia = str;
          return moment(str, momentFormat);
        },

        blocks: {
          YYYY: {
            mask: IMask.MaskedRange,
            from: 2000,
            to: 2080,
          },
          MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
          },
          DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31,
          },
        },
      });
    },
    traerEvolucion() {
      loader("show");
      var _this = this;

      postData(
        {
          datosh:
            datosEnvio() +
            $_REG_HC.llave_hc +
            "|" +
            _this.global_HC002.OPER_EVO +
            "|" +
            localStorage.IDUSU +
            "|" +
            _this.global_HC002.FECHA_EVO +
            "|" +
            _this.global_HC002.HORA_EVO +
            "|" +
            localStorage.Usuario +
            "|",
        },
        get_url("APP/HICLIN/HC002.DLL")
      )
        .then((data) => {
          console.log(data);
          _this.global_HC002 = data.EVOLUCION[0];

          if (localStorage.Usuario == "GEBC") {
            switch (_this.global_HC002.NOVEDAD) {
              case "7":
                CON851("", "Está creando evolución como GEBC !", null, "warning", "Advertencia");
                break;
              case "8":
                CON851("", "Está modificando evolución como GEBC !", null, "warning", "Advertencia");
                break;
            }
          }
          _this.global_HC002.MACRO.CODIGO = parseInt(_this.global_HC002.MACRO.CODIGO).toString();
          if (_this.global_HC002.MACRO.VIA.trim() == "0") _this.global_HC002.MACRO.VIA = "";
          if (_this.global_HC002.MACRO.CODIGO.trim() == "0") _this.global_HC002.MACRO.CODIGO = "";

          if (_this.global_HC002.SINTOM_RESPI.trim() == "") _this.global_HC002.SINTOM_RESPI = "";
          if (_this.global_HC002.SINTOM_PIEL.trim() == "") _this.global_HC002.SINTOM_PIEL = "";
          if (_this.global_HC002.CONTACTO_LEPRA.trim() == "") _this.global_HC002.CONTACTO_LEPRA = "";
          if (_this.global_HC002.VICTI_MALTRATO.trim() == "") _this.global_HC002.VICTI_MALTRATO = "";
          if (_this.global_HC002.VICTI_VIOLENCIA.trim() == "") _this.global_HC002.VICTI_VIOLENCIA = "";
          if (_this.global_HC002.ENFER_MENTAL.trim() == "") _this.global_HC002.ENFER_MENTAL = "";
          if (_this.global_HC002.ENFER_ITS.trim() == "") _this.global_HC002.ENFER_ITS = "";
          if (_this.global_HC002.CUAL_ITS.trim() == "") _this.global_HC002.CUAL_ITS = "";

          if (_this.global_HC002.SIGNOS_VITALES.TEMP.trim() == "") _this.global_HC002.SIGNOS_VITALES.TEMP = "";

          if (_this.global_HC002.TRATA_ITS.trim() == "") _this.global_HC002.TRATA_ITS = "";

          if (_this.global_HC002.CANCER_SENO.trim() == "") _this.global_HC002.CANCER_SENO = "";
          if (_this.global_HC002.CANCER_CERVIS.trim() == "") _this.global_HC002.CANCER_CERVIS = "";
          if (_this.global_HC002.EDU_AUTOEXA_SENO.trim() == "") _this.global_HC002.EDU_AUTOEXA_SENO = "";
          if (_this.global_HC002.CITOLOGIA_PREVIA.trim() == "") _this.global_HC002.CITOLOGIA_PREVIA = "";

          if (_this.global_HC002.PROCEDIMIENTOS.SALA_CIRU.trim() == "")
            _this.global_HC002.PROCEDIMIENTOS.SALA_CIRU = "";

          if (_this.global_HC002.PROCEDIMIENTOS.TIEMPO_SALA.trim() == "")
            _this.global_HC002.PROCEDIMIENTOS.TIEMPO_SALA = "";
          if (_this.global_HC002.PROCEDIMIENTOS.TIEMPO_PROC.trim() == "")
            _this.global_HC002.PROCEDIMIENTOS.TIEMPO_PROC = "";
          if (_this.global_HC002.PROCEDIMIENTOS.PROC_PROGRAMADO.trim() == "")
            _this.global_HC002.PROCEDIMIENTOS.PROC_PROGRAMADO = "";
          if (_this.global_HC002.PROCEDIMIENTOS.PROC_AMBULA.trim() == "")
            _this.global_HC002.PROCEDIMIENTOS.PROC_AMBULA = "";
          if (_this.global_HC002.PATOLOGIA.PIEZA_QUIR.trim() == "") _this.global_HC002.PATOLOGIA.PIEZA_QUIR = "";
          if (_this.global_HC002.PATOLOGIA.DATOS_CLINICOS.trim() == "")
            _this.global_HC002.PATOLOGIA.DATOS_CLINICOS = "";

          for (var i in _this.global_HC002.TABLA_DIAGNOSTICOS) {
            _this.global_HC002.TABLA_DIAGNOSTICOS[i] = _this.global_HC002.TABLA_DIAGNOSTICOS[i].toUpperCase().trim();
          }

          for (var i in _this.global_HC002.TABLA_CUPS) {
            _this.global_HC002.TABLA_CUPS[i] = _this.global_HC002.TABLA_CUPS[i].toUpperCase().trim();
          }

          _this.global_HC002.RIPS.CAUSA = _this.global_HC002.RIPS.CAUSA.trim();

          _this.global_HC002.PRIMERA_VEZ = _this.global_HC002.PRIMERA_VEZ.trim();
          _this.global_HC002.RIPS.DIAG_MUER = _this.global_HC002.RIPS.DIAG_MUER.trim();
          _this.global_HC002.RIPS.REMITIDO = _this.global_HC002.RIPS.REMITIDO.trim();
          _this.global_HC002.EMBAR.NRO_CONTR = _this.global_HC002.EMBAR.NRO_CONTR.trim();
          _this.global_HC002.CRONICO = _this.global_HC002.CRONICO.trim();

          _this.asignar_Mascaras();

          _this.global_HC002.PESO_NEW = parseFloat(_this.global_HC002.PESO_NEW);

          if (_this.global_HC002.NOVEDAD == "8") {
            _this.traerDetalleEvolucion("1");
          } else {
            _this.traerHistoriaClinica();
          }
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          if (localStorage.Usuario == "GEBC") {
            _this.aceptarOperadorEvo();
          } else {
            _this.salir_hc002();
          }
        });
    },
    traerDetalleEvolucion(param) {
      var _this = this;
      // 1 es para el contenido, 2 para el analisis, 6 para plan
      postData(
        {
          datosh:
            datosEnvio() +
            $_REG_HC.llave_hc +
            "|" +
            this.global_HC002.FECHA_EVO +
            "|" +
            _this.global_HC002.HORA_EVO +
            "|" +
            _this.global_HC002.OPER_EVO +
            "|" +
            param +
            "|",
        },
        get_url("APP/HICLIN/HCDETA_EVO.DLL")
      )
        .then((data) => {
          console.log(data);

          switch (param) {
            case "1":
              _this.DETALLE_EVO.CONTENIDO = data.DETALLE_EVO[0].CONTENIDO.replace(/\&/g, "\n").trim();
              _this.traerDetalleEvolucion("2");
              break;
            case "2":
              _this.DETALLE_EVO.ANALISIS = data.DETALLE_EVO[0].CONTENIDO.replace(/\&/g, "\n").trim();
              _this.traerDetalleEvolucion("6");
              break;
            case "6":
              _this.DETALLE_EVO.PLAN = data.DETALLE_EVO[0].CONTENIDO.replace(/\&/g, "\n").trim();
              _this.traerHistoriaClinica();
              break;
          }
        })
        .catch((error) => {
          console.error(error);
          var texto = "";
          switch (param) {
            case "1":
              texto = "contenido principal !";
              _this.traerDetalleEvolucion("2");
              break;
            case "2":
              texto = "analisis !";
              _this.traerDetalleEvolucion("6");
              break;
            case "6":
              texto = "plan !";
              _this.traerHistoriaClinica();
              break;
          }
          CON851("", "Error consultando detalle evolucion de " + texto, null, "error", "Error");
        });
    },
    traerHistoriaClinica() {
      var _this = this;
      postData(
        {
          datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|" + "1" + "|",
        },
        get_url("APP/HICLIN/HC_PRC.DLL")
      )
        .then((data) => {
          console.log(data);
          _this.historia_clinica = data.HCPAC;

          for (var i in _this.historia_clinica.covid19) {
            if (typeof _this.historia_clinica.covid19[i] != "object")
              _this.historia_clinica.covid19[i] = _this.historia_clinica.covid19[i].trim();
          }
          if (parseInt(_this.historia_clinica.edad) == 0)
            _this.historia_clinica.edad = $_REG_HC.edad_hc.unid_edad + $_REG_HC.edad_hc.vlr_edad.toString();
          console.log(_this.historia_clinica.edad);
          _this.historia_clinica.proceden = _this.historia_clinica.proceden.trim();
          _this.historia_clinica.motivo = _this.historia_clinica.motivo.trim();

          if (_this.historia_clinica.cierre.temporal == "1") _this.asignarInfoAper();

          // _this.traerEnfermedades();
          _this.traerViasAcceso();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_hc002();
        });
    },
    asignarInfoAper() {
      this.global_HC002.UNSERV = this.historia_clinica.cierre.unserv;

      // this.pasarPreguntasCovid();

      this.textos.unidad_servicio = this.global_HC002.UNSERV;

      this.global_HC002.MACRO.CLASE = this.historia_clinica.cierre.clase_macro;
      this.global_HC002.MACRO.CODIGO =
        parseInt(this.historia_clinica.cierre.codigo_macro) == 0
          ? ""
          : parseInt(this.historia_clinica.cierre.codigo_macro).toString();

      var tipo_macro = this.tipos_macro.find((x) => x.COD == this.global_HC002.MACRO.CLASE);
      if (tipo_macro) this.textos.descrip_tipo_macro = tipo_macro.COD + ". " + tipo_macro.DESCRIP;

      var macro = this.macros_existentes.find(
        (x) =>
          x.CLASE.trim() == this.global_HC002.MACRO.CLASE && x.CODIGO.trim() == this.global_HC002.MACRO.CODIGO.trim()
      );

      if (macro) this.macro_escogida.DETALLE = macro.DETALLE.trim();

      if (this.historia_clinica.serv == "08") {
        this.global_HC002.PESO_NEW = parseFloat(this.historia_clinica.signos.peso).toString();
        this.global_HC002.SIGNOS_VITALES.TALLA = parseInt(this.historia_clinica.signos.talla).toString();
        this.global_HC002.SIGNOS_VITALES.F_CARD = parseInt(this.historia_clinica.signos.fcard).toString();
        this.global_HC002.SIGNOS_VITALES.F_RESP = parseInt(this.historia_clinica.signos.fresp).toString();
        this.global_HC002.SIGNOS_VITALES.TENS_1 = parseInt(this.historia_clinica.signos.tens1).toString();
        this.global_HC002.SIGNOS_VITALES.TENS_2 = parseInt(this.historia_clinica.signos.tens2).toString();
        this.global_HC002.SIGNOS_VITALES.TENS_MEDIA = parseInt(this.historia_clinica.signos.tens_m).toString();
        this.global_HC002.SIGNOS_VITALES.OXIMETRIA = this.historia_clinica.signos.oximetria.toString();
        this.global_HC002.SIGNOS_VITALES.PVC = this.historia_clinica.signos.pvc.toString();
        this.global_HC002.SIGNOS_VITALES.TEMP = this.historia_clinica.signos.temp.toString();
        this.global_HC002.SIGNOS_VITALES.PER_TORA = this.historia_clinica.signos.per_tora.toString();
        this.global_HC002.SIGNOS_VITALES.PER_ABDO = this.historia_clinica.signos.per_abdo.toString();
        this.calcularIMCySUP();

        this.global_HC002.SIGNOS_VITALES.APER_OCUL = this.historia_clinica.signos.glasg.substring(0, 1);
        this.global_HC002.SIGNOS_VITALES.RESP_VERB = this.historia_clinica.signos.glasg.substring(1, 2);
        this.global_HC002.SIGNOS_VITALES.RESP_MOTO = this.historia_clinica.signos.glasg.substring(2, 3);
        this.calcularVlrGlasgow(1);

        switch (this.global_HC002.SIGNOS_VITALES.APER_OCUL) {
          case "1":
            this.textos.ocular = "1. Ninguna";
            break;
          case "2":
            this.textos.ocular = "2. Al dolor";
            break;
          case "3":
            this.textos.ocular = "3. A ordenes";
            break;
          case "4":
            this.textos.ocular = "4. Expontánea";
            break;
        }

        switch (this.global_HC002.SIGNOS_VITALES.RESP_VERB) {
          case "1":
            this.textos.verbal = "1. Ninguna";
            break;
          case "2":
            this.textos.verbal = "2. Incomprensible";
            break;
          case "3":
            this.textos.verbal = "3. Inapropiada";
            break;
          case "4":
            this.textos.verbal = "4. Confusa";
            break;
        }

        switch (this.global_HC002.SIGNOS_VITALES.RESP_MOTO) {
          case "1":
            this.textos.motora = "1. Ninguna";
            break;
          case "2":
            this.textos.motora = "2. Descerebracion";
            break;
          case "3":
            this.textos.motora = "3. Decorticacion";
            break;
          case "4":
            this.textos.motora = "4. Retira";
            break;
          case "5":
            this.textos.motora = "5. Localiza";
            break;
          case "6":
            this.textos.motora = "6. Obedece orden";
            break;
        }
      }

      this.global_HC002.SINTOM_RESPI = this.historia_clinica.signos.sintom_resp;
      this.global_HC002.SINTOM_PIEL = this.historia_clinica.signos.sintom_piel;
      this.global_HC002.CONTACTO_LEPRA = this.historia_clinica.signos.contacto_lepra;
      this.global_HC002.VICTI_MALTRATO = this.historia_clinica.signos.victi_maltrato;
      this.global_HC002.VICTI_VIOLENCIA = this.historia_clinica.signos.victi_violencia;
      this.global_HC002.ENFER_MENTAL = this.historia_clinica.signos.enfer_mental;
      this.global_HC002.ENFER_ITS = this.historia_clinica.signos.enfer_its;
      this.global_HC002.CUAL_ITS = this.historia_clinica.signos.cual_its;
      this.global_HC002.TRATA_ITS = this.historia_clinica.signos.trata_its;

      if (this.datos_paciente.SEXO == "F") {
        this.global_HC002.CANCER_SENO = this.historia_clinica.signos.cancer_seno;
        this.global_HC002.CANCER_CERVIS = this.historia_clinica.signos.cancer_cervis;
        this.global_HC002.EDU_AUTOEXA_SENO = this.historia_clinica.signos.edu_autoexa_seno;
        this.global_HC002.CITOLOGIA_PREVIA = this.historia_clinica.signos.citologia_previa;

        this.global_HC002.FECHA_CITO_PREVIA = this.historia_clinica.signos.fecha_cito_previa;
        this.fecha_citologia_previa.typedValue = this.global_HC002.FECHA_CITO_PREVIA;

        this.global_HC002.RESUL_CITO_PREVIA = this.historia_clinica.signos.resul_cito_previa;
        var resul_cito = this.resultados_cito.find((x) => x.COD == this.global_HC002.RESUL_CITO_PREVIA);
        if (resul_cito)
          this.textos.resultado_citologia = this.global_HC002.RESUL_CITO_PREVIA + ". " + resul_cito.DESCRIP;

        this.global_HC002.FECHA_ULT_MAMO = this.historia_clinica.signos.fecha_ult_mamo;
        this.fecha_mamografia.typedValue = this.global_HC002.FECHA_ULT_MAMO;
      }

      this.traerDetallesHistoriaClinica();
    },
    traerDetallesHistoriaClinica() {
      var _this = this;

      postData(
        {
          datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + "  " + "|" + "  " + "|" + "1001;7501;2035;7503" + "|",
        },
        get_url("APP/HICLIN/HCDETAL_PRC.DLL")
      )
        .then((data) => {
          console.log(data);

          var formato_1001 = data.DETHC.find((x) => x["COD-DETHC"] == "1001");
          if (formato_1001) _this.DETALLE_EVO.CONTENIDO = formato_1001.DETALLE.replace(/\&/g, "\n").trim();

          var formato_7501 = data.DETHC.find((x) => x["COD-DETHC"] == "7501");
          if (formato_7501) _this.DETALLE_EVO.ANALISIS = formato_7501.DETALLE.replace(/\&/g, "\n").trim();

          var formato_2035 = data.DETHC.find((x) => x["COD-DETHC"] == "2035");
          if (formato_2035) _this.DETALLE_HC.ANTECEDENTES_TOXICO = formato_2035.DETALLE.replace(/\&/g, "\n").trim();

          var formato_7503 = data.DETHC.find((x) => x["COD-DETHC"] == "7503");
          if (formato_7503) _this.DETALLE_EVO.PLAN = formato_7503.DETALLE.replace(/\&/g, "\n").trim();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando detalles de historia!", null, "error", "Error");
        });
    },
    traerViasAcceso() {
      var _this = this;
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER856.DLL"))
        .then((data) => {
          console.log(data);
          _this.vias_existentes = data.VIAS_ACCESO;
          _this.vias_existentes.pop();
          _this.traerCiudades();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_hc002();
        });
    },
    traerCiudades() {
      var _this = this;
      postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON809.DLL"))
        .then((data) => {
          console.log(data);
          _this.ciudades = data.CIUDAD;
          _this.ciudades.pop();

          for (var i in _this.ciudades) {
            _this.ciudades[i].NOMBRE = _this.ciudades[i].NOMBRE.replace(/\�/g, "Ñ").trim();
          }
          _this.traerPaises();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_hc002();
        });
    },
    traerPaises() {
      var _this = this;
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER888.DLL"))
        .then((data) => {
          console.log(data);
          _this.paises = data.PAISESRIPS;
          _this.paises.pop();

          for (var i in _this.paises) {
            _this.paises[i].DESCRIP = _this.paises[i].DESCRIP.replace(/\�/g, "Ñ").trim();
          }

          _this.traerPatologiasCronicas();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_hc002();
        });
    },
    traerPatologiasCronicas() {
      var _this = this;
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER858.DLL"))
        .then((data) => {
          console.log(data);
          _this.patologias_cronicas = data.PATOLOGIAS;
          _this.patologias_cronicas.pop();

          _this.traerMacrosEvol();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_hc002();
        });
    },
    traerEnfermedades() {
      var _this = this;
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER851.DLL"))
        .then((data) => {
          console.log(data);
          _this.enfermedades = data.ENFERMEDADES;
          _this.enfermedades.pop();

          for (var i in _this.enfermedades) {
            _this.enfermedades[i].NOMBRE_ENF = _this.enfermedades[i].NOMBRE_ENF.replace(/\�/g, "Ñ").trim();
          }

          if (
            (localStorage.Usuario == "GEBC" && _this.global_HC002.NOVEDAD == "8") ||
            _this.global_HC002.NOVEDAD == "7"
          ) {
            if (_this.global_HC002.NOVEDAD == "7" || _this.historia_clinica.temporal == "1") {
              _this.global_HC002.TABLA_DIAGNOSTICOS = [];

              for (var i in _this.historia_clinica.rips.tabla_diag) {
                _this.global_HC002.TABLA_DIAGNOSTICOS[i] = _this.historia_clinica.rips.tabla_diag[i].diagn;
              }
            }

            for (var i in _this.global_HC002.TABLA_DIAGNOSTICOS) {
              var busqueda = _this.enfermedades.find(
                (x) => x.COD_ENF == cerosIzq(_this.global_HC002.TABLA_DIAGNOSTICOS[i].toUpperCase(), 4)
              );
              if (busqueda) _this.textos.descrip_diagnosticos[i] = busqueda.NOMBRE_ENF.trim();
            }
          }

          if (_this.global_HC002.RIPS.ESTADO_SAL == "2" && _this.global_HC002.NOVEDAD == "8") {
            var diag_muerte = _this.enfermedades.find(
              (x) => x.COD_ENF.trim() == cerosIzq(_this.global_HC002.RIPS.DIAG_MUER, 4)
            );
            console.log(diag_muerte);
            if (diag_muerte) _this.textos.descrip_tipo_diag_rips = diag_muerte.NOMBRE_ENF.trim();
          }
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_hc002();
        });
    },
    traerMacrosEvol() {
      var _this = this;
      var URL = get_url("APP/HICLIN/HC808.DLL");
      postData(
        {
          datosh: datosEnvio(),
        },
        URL
      )
        .then((data) => {
          loader("hide");
          console.log(data);
          _this.macros_existentes = data.MACROS;
          _this.macros_existentes.pop();

          for (var i in _this.macros_existentes) {
            _this.macros_existentes[i].CODIGO = _this.macros_existentes[i].CODIGO.trim();
          }

          switch (_this.global_HC002.NOVEDAD) {
            case "7":
              _this.global_HC002.RIPS.ATIENDE = $_REG_PROF.ATIENDE_PROF;
              _this.textos.descrip_evol = "CREANDO EVOLUCION MEDICA";
              _this.pasarPreguntasCovid();
              _this.validarNovedad_hc002();
              break;
            case "8":
              _this.textos.descrip_evol = "ACTUALIZANDO EVOLUCION";
              _this.traerCups(1);
              break;
          }

          _this.pasarDiagnosticos();

          switch (_this.global_HC002.RIPS.ATIENDE) {
            case "1":
              _this.textos.personal_atiende = "1. MEDICO ESPECIALISTA";
              break;
            case "2":
              _this.textos.personal_atiende = "2. MEDICO GENERAL";
              break;
            case "3":
              _this.textos.personal_atiende = "3. ENFERMERA";
              break;
            case "4":
              _this.textos.personal_atiende = "4. AUXILIAR ENFERMERIA";
              break;
            case "5":
              _this.textos.personal_atiende = "5. TERAPIAS Y OTROS";
              break;
            case "6":
              _this.textos.personal_atiende = "6. ENFERMERA JEFE PYP";
              break;
            case "7":
              _this.textos.personal_atiende = "7. PSICOLOGIA";
              break;
            case "8":
              _this.textos.personal_atiende = "8. NUTRICIONISTA";
              break;
            case "9":
              _this.textos.personal_atiende = "9. SIN DETERMINAR";
              break;
            case "A":
              _this.textos.personal_atiende = "A. ODONTOLOGO";
              break;
            case "H":
              _this.textos.personal_atiende = "H. HIGIENISTA ORAL";
              break;
            case "I":
              _this.textos.personal_atiende = "I. INSTRUMENTACION";
              break;
            case "O":
              _this.textos.personal_atiende = "O. OPTOMETRA";
              break;
          }
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_hc002();
        });
    },
    pasarPreguntasCovid() {
      console.log("entra reemplazar covid");
      this.global_HC002.COVID.FIEBRE = this.historia_clinica.covid19.fiebre_covid19;
      this.global_HC002.COVID.TOS = this.historia_clinica.covid19.tos_covid19;
      this.global_HC002.COVID.DISNEA = this.historia_clinica.covid19.disnea_covid19;
      this.global_HC002.COVID.MALESTAR = this.historia_clinica.covid19.malestar_covid19;
      this.global_HC002.COVID.RINORREA = this.historia_clinica.covid19.rinorrea_covid19;
      this.global_HC002.COVID.ODINOFAGIA = this.historia_clinica.covid19.odinofagia_covid19;
      this.global_HC002.COVID.VIAJE = this.historia_clinica.covid19.viaje_covid19;
      this.global_HC002.COVID.CONTACTO = this.historia_clinica.covid19.contacto_covid19;
      this.global_HC002.COVID.PERSONAL_SALUD = this.historia_clinica.covid19.personal_salud_covid19;
      this.global_HC002.COVID.VIAJE_DENTRO = this.historia_clinica.covid19.viaje_dentro_covid19;
      this.global_HC002.COVID.LUGAR_VIAJE_DENTRO = this.historia_clinica.covid19.lugar_dentro_covid19;

      var ciudad_dentro = this.ciudades.find((x) => x.COD.trim() == this.global_HC002.COVID.LUGAR_VIAJE_DENTRO);
      if (ciudad_dentro) this.textos.ciudad_dentro = ciudad_dentro.NOMBRE.trim();

      this.global_HC002.COVID.TIEMPO_VIAJE_DENTRO = this.historia_clinica.covid19.tiempo_dentro_covid19;
      this.global_HC002.COVID.VIAJE_FUERA = this.historia_clinica.covid19.viaje_fuera_covid19;
      this.global_HC002.COVID.LUGAR_VIAJE_FUERA = this.historia_clinica.covid19.lugar_fuera_covid19;

      var pais = this.paises.find((x) => x.CODIGO.trim() == this.global_HC002.COVID.LUGAR_VIAJE_FUERA);
      if (pais) this.textos.pais_fuera = pais.DESCRIP.trim();

      this.global_HC002.COVID.TIEMPO_VIAJE_FUERA = this.historia_clinica.covid19.tiempo_fuera_covid19;
    },
    pasarDiagnosticos() {
      if (this.global_HC002.NOVEDAD == "7" || this.historia_clinica.temporal == "1") {
        console.log(this.historia_clinica.rips.tabla_diag, "TABLA DIAG");
        this.global_HC002.TABLA_DIAGNOSTICOS = [];

        for (var i in this.historia_clinica.rips.tabla_diag) {
          this.global_HC002.TABLA_DIAGNOSTICOS[i] = this.historia_clinica.rips.tabla_diag[i].diagn;
          this.textos.descrip_diagnosticos[i] = this.historia_clinica.rips.tabla_diag[i].descrip;
        }
      } else {
        for (var i in this.global_HC002.DESCRIPCIONES_DIAGN) {
          this.textos.descrip_diagnosticos[i] = this.global_HC002.DESCRIPCIONES_DIAGN[i];
        }
      }
    },
    mostrarTextos() {
      var _this = this;

      this.textos.unidad_servicio = this.global_HC002.UNSERV;

      var tipo_macro = this.tipos_macro.find((x) => x.COD == this.global_HC002.MACRO.CLASE);
      if (tipo_macro) this.textos.descrip_tipo_macro = tipo_macro.COD + ". " + tipo_macro.DESCRIP;

      var macro = this.macros_existentes.find(
        (x) =>
          x.CLASE.trim() == this.global_HC002.MACRO.CLASE && x.CODIGO.trim() == this.global_HC002.MACRO.CODIGO.trim()
      );
      if (macro) this.macro_escogida.DETALLE = macro.DETALLE.trim();

      var tipo_anes = this.opc_tipo_anes.find((x) => x.COD == this.global_HC002.PROCEDIMIENTOS.TIPO_ANES);
      if (tipo_anes) this.textos.anestesia = tipo_anes.COD + ". " + tipo_anes.DESCRIP;

      this.global_HC002.PROCEDIMIENTOS.TIEMPO_PROC = parseInt(this.global_HC002.PROCEDIMIENTOS.TIEMPO_PROC);
      this.global_HC002.PROCEDIMIENTOS.TIEMPO_SALA = parseInt(this.global_HC002.PROCEDIMIENTOS.TIEMPO_SALA);

      this.global_HC002.PROCEDIMIENTOS.SALA_CIRU = cerosIzq(this.global_HC002.PROCEDIMIENTOS.SALA_CIRU, 2);

      var sala = this.salas_cirugias.find((x) => x.CODIGO == this.global_HC002.PROCEDIMIENTOS.SALA_CIRU);
      console.log(sala);
      if (sala) this.textos.descrip_sala_cirugia = sala.DESCRIP.trim();

      var evento = this.opc_even_adverso.find((x) => x.COD == this.global_HC002.PROCEDIMIENTOS.EVEN_ADVERSO);
      if (evento) this.textos.evento_adverso = evento.COD + ". " + evento.DESCRIP;

      var tipo_ciru = this.opc_tipo_ciru.find((x) => x.COD == this.global_HC002.PROCEDIMIENTOS.TIPO_CIRUGIA);
      if (tipo_ciru) this.textos.tipo_cirugia = tipo_ciru.COD + ". " + tipo_ciru.DESCRIP;

      switch (this.global_HC002.RIPS.ESTADO_SAL) {
        case "1":
          this.textos.estado_salida = "1. VIVO";
          break;
        case "2":
          this.textos.estado_salida = "2. MUERTO";
          break;
      }

      if (
        this.global_HC002.PATOLOGIA.PIEZA_QUIR.trim() != "" ||
        this.global_HC002.PATOLOGIA.DATOS_CLINICOS.trim() != ""
      ) {
        this.solicitud_patologia = "S";
        this.global_HC002.PATOLOGIA.PIEZA_QUIR = this.global_HC002.PATOLOGIA.PIEZA_QUIR.replace(/\&/g, "\n").trim();
        this.global_HC002.PATOLOGIA.DATOS_CLINICOS = this.global_HC002.PATOLOGIA.DATOS_CLINICOS.replace(
          /\&/g,
          "\n"
        ).trim();
      }

      for (var i in _this.global_HC002.TABLA_CUPS) {
        var busqueda = _this.cups.find(
          (x) => x.LLAVE.trim() == cerosIzq(_this.global_HC002.TABLA_CUPS[i].toUpperCase(), 6)
        );
        if (busqueda) _this.textos.descrip_cups[i] = busqueda.DESCRIP;
      }

      var ciudad_dentro = this.ciudades.find((x) => x.COD.trim() == this.global_HC002.COVID.LUGAR_VIAJE_DENTRO);
      if (ciudad_dentro) this.textos.ciudad_dentro = ciudad_dentro.NOMBRE.trim();
      this.global_HC002.COVID.TIEMPO_VIAJE_DENTRO = parseInt(this.global_HC002.COVID.TIEMPO_VIAJE_DENTRO);

      var pais = this.paises.find((x) => x.CODIGO.trim() == this.global_HC002.COVID.LUGAR_VIAJE_FUERA);
      if (pais) this.textos.pais_fuera = pais.DESCRIP.trim();
      this.global_HC002.COVID.TIEMPO_VIAJE_FUERA = parseInt(this.global_HC002.COVID.TIEMPO_VIAJE_FUERA);

      if (this.global_HC002.UNSERV == "08") {
        this.global_HC002.PESO_NEW = parseFloat(this.global_HC002.PESO_NEW).toString();
        this.global_HC002.SIGNOS_VITALES.TALLA = parseInt(this.global_HC002.SIGNOS_VITALES.TALLA).toString();
        this.global_HC002.SIGNOS_VITALES.F_CARD = parseInt(this.global_HC002.SIGNOS_VITALES.F_CARD).toString();
        this.global_HC002.SIGNOS_VITALES.F_RESP = parseInt(this.global_HC002.SIGNOS_VITALES.F_RESP).toString();
        this.global_HC002.SIGNOS_VITALES.TENS_1 = parseInt(this.global_HC002.SIGNOS_VITALES.TENS_1).toString();
        this.global_HC002.SIGNOS_VITALES.TENS_2 = parseInt(this.global_HC002.SIGNOS_VITALES.TENS_2).toString();
        this.global_HC002.SIGNOS_VITALES.PVC = parseFloat(this.global_HC002.SIGNOS_VITALES.PVC).toString();
        this.global_HC002.SIGNOS_VITALES.PER_TORA = parseFloat(this.global_HC002.SIGNOS_VITALES.PER_TORA).toString();
        this.global_HC002.SIGNOS_VITALES.PER_ABDO = parseFloat(this.global_HC002.SIGNOS_VITALES.PER_ABDO).toString();
        this.global_HC002.SIGNOS_VITALES.OXIMETRIA = parseInt(this.global_HC002.SIGNOS_VITALES.OXIMETRIA).toString();
        this.global_HC002.SIGNOS_VITALES.GLUCOMETRIA = parseInt(
          this.global_HC002.SIGNOS_VITALES.GLUCOMETRIA
        ).toString();

        this.calcularIMCySUP();

        switch (this.global_HC002.SIGNOS_VITALES.APER_OCUL) {
          case "1":
            this.textos.ocular = "1. Ninguna";
            break;
          case "2":
            this.textos.ocular = "2. Al dolor";
            break;
          case "3":
            this.textos.ocular = "3. A ordenes";
            break;
          case "4":
            this.textos.ocular = "4. Expontánea";
            break;
        }

        switch (this.global_HC002.SIGNOS_VITALES.RESP_VERB) {
          case "1":
            this.textos.verbal = "1. Ninguna";
            break;
          case "2":
            this.textos.verbal = "2. Incomprensible";
            break;
          case "3":
            this.textos.verbal = "3. Inapropiada";
            break;
          case "4":
            this.textos.verbal = "4. Confusa";
            break;
        }

        switch (this.global_HC002.SIGNOS_VITALES.RESP_MOTO) {
          case "1":
            this.textos.motora = "1. Ninguna";
            break;
          case "2":
            this.textos.motora = "2. Descerebracion";
            break;
          case "3":
            this.textos.motora = "3. Decorticacion";
            break;
          case "4":
            this.textos.motora = "4. Retira";
            break;
          case "5":
            this.textos.motora = "5. Localiza";
            break;
          case "6":
            this.textos.motora = "6. Obedece orden";
            break;
        }

        switch (this.global_HC002.RIPS.FINALID) {
          case "01":
            this.textos.finalidad_consulta = "01. ATENCION PARTO";
            break;
          case "02":
            this.textos.finalidad_consulta = "02. ATENCION REC. NACIDO";
            break;
          case "03":
            this.textos.finalidad_consulta = "03. ATENCION PLANIF. FAMILIAR";

            var planif = this.metodos_planificacion.find((x) => x.COD == this.global_HC002.EMBAR.PLANIFIC);
            this.textos.metodo_planificacion = "03. " + planif.DESCRIP;
            break;
          case "04":
            this.textos.finalidad_consulta = "04. DET.ALT CRECIM <10";
            break;
          case "05":
            this.textos.finalidad_consulta = "05. DET.ALT.DESA.JOVEN";
            break;
          case "06":
            this.textos.finalidad_consulta = "06. DET.ALT.EMBARAZO";
            break;
          case "07":
            this.textos.finalidad_consulta = "07. DET.ALT. ADULTO";
            break;
          case "08":
            this.textos.finalidad_consulta = "08. DET.ALT.AGUD.VISUA";
            break;
          case "09":
            this.textos.finalidad_consulta = "09. DET.ENFERM.PROFES";
            break;
          case "10":
            this.textos.finalidad_consulta = "10. NO APLICA";
            break;
          case "11":
            this.textos.finalidad_consulta = "11. PATOLOGIA CRONICA";
            var pato_cronica = this.patologias_cronicas.find((x) => x.COD == this.global_HC002.CRONICO);
            console.log(pato_cronica);
            this.textos.descrip_pato_cronica = pato_cronica.DESCRIP.trim();
            break;
        }

        this.calcularVlrGlasgow(1);
      }

      if (this.global_HC002.RIPS.EMBAR == "9") {
        this.textos.estado_gravidez = "9. NO APLICA";
      } else {
        var estad_embar = this.condicion_embarazo.find((x) => x.COD == this.global_HC002.RIPS.EMBAR);

        if (estad_embar) this.textos.estado_gravidez = this.global_HC002.RIPS.EMBAR + ". " + estad_embar.DESCRIP;
      }

      var causa = this.causas_externas.find((x) => x.COD == this.global_HC002.RIPS.CAUSA);
      if (causa) this.textos.causa_externa = this.global_HC002.RIPS.CAUSA + ". " + causa.DESCRIP;

      var tipo_diag = this.tipos_diagnostico.find((x) => x.COD == this.global_HC002.TIPO_DIAG);
      console.log(tipo_diag);
      if (tipo_diag) this.textos.tipo_diagnostico = this.global_HC002.TIPO_DIAG + ". " + tipo_diag.DESCRIP;

      var estad_sal_rips = this.estadoSalidaRips.find((x) => x.COD == this.global_HC002.RIPS.ESTADO_SAL);
      console.log(estad_sal_rips);
      if (estad_sal_rips)
        this.textos.estado_salida_rips = this.global_HC002.RIPS.ESTADO_SAL + ". " + estad_sal_rips.DESCRIP;

      if (this.datos_paciente.SEXO == "F") {
        this.fecha_citologia_previa.typedValue = this.global_HC002.FECHA_CITO_PREVIA;
        this.fecha_mamografia.typedValue = this.global_HC002.FECHA_ULT_MAMO;

        var resul_cito = this.resultados_cito.find((x) => x.COD == this.global_HC002.RESUL_CITO_PREVIA);
        if (resul_cito)
          this.textos.resultado_citologia = this.global_HC002.RESUL_CITO_PREVIA + ". " + resul_cito.DESCRIP;
      }

      this.validarNovedad_hc002();
    },
    validarNovedad_hc002() {
      if (this.global_HC002.NOVEDAD == "8") {
        if (localStorage.Usuario == "GEBC") {
          this.empieza();
        } else {
          CON851("", "Evolución no es modificable!", null, "error", "Error");
          this.salir_hc002();
        }
      } else {
        this.validar_estado_hc();
      }
    },
    validar_estado_hc() {
      var _this = this;

      if (
        ($_REG_HC.clase_hc == "1" || $_REG_HC.clase_hc == "2") &&
        parseInt($_REG_HC.estado_hc) > 1 &&
        parseInt(moment().format("YYYYMMDD")) > parseInt($_REG_HC.fecha_limite) &&
        $_REG_HC.unser_hc == "02"
      ) {
        CON851("B3", "B3", null, "error", "Error");
        _regresar_menuhis();
      } else if (
        this.historia_clinica.cierre.temporal == "1" &&
        this.historia_clinica.oper_elab == localStorage.Usuario
      ) {
        _this.nuevo_folio = true;
        this.validarProcedencia();
      } else if (
        $_REG_HC.estado_hc == "1" ||
        $_REG_HC.unser_hc == "08" ||
        ($_REG_HC.estado_hc == "2" &&
          ($_REG_HC.unser_hc == "01" || $_REG_HC.unser_hc == "02") &&
          parseInt(moment().format("YYYYMMDD")) < parseInt($_REG_HC.fecha_limite))
      ) {
        // imprimir_HC002B(2, this.historia_clinica.cierre.unserv) ESTE ES EL DE RM
        this.imprimir_HC002B()
          .then(() => {
            this.evaluarRevaloracion();
        })
      } else if (
        ($_REG_HC.estado_hc == "0" || $_REG_HC.estado_hc.trim() == "") &&
        ($_REG_PROF.ATIENDE_PROF == "1" || $_REG_PROF.ATIENDE_PROF == "2")
      ) {
        CON851P(
          "Crear folio?",
          () => {
            CON851("9Y", "9Y", null, "error", "Error");
            _regresar_menuhis();
          },
          () => {
            _this.nuevo_folio = true;
            _this.imprimir_HC002B()
              .then(() => {
                _this.validarProcedencia();
              })
          }
        );
      } else {
        CON851("9Y", "9Y", null, "error", "Error");
        _regresar_menuhis();
      }
    },
    imprimir_HC002B() {
      return new Promise((resolve) => {
        CON851P(
          "¿Desea ver las evoluciones anteriores?", 
          resolve, 
          () => {
            iniciar_HC002B(2);
            resolve();
          })
      })
    },
    validarProcedencia() {
      var _this = this;

      validarInputs(
        {
          form: "#validarProcedencia",
          orden: "1",
        },
        () => CON851P("03", _this.validarProcedencia, _this.salir_hc002),
        () => {
          this.validarMotivo_consulta();
        }
      );
    },
    validarMotivo_consulta() {
      validarInputs(
        {
          form: "#validarMotivoConsulta",
          orden: "1",
        },
        () => this.validarProcedencia(),
        () => {
          this.historia_clinica.motivo = this.historia_clinica.motivo.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");

          this.validarAntecedentes_toxicologia();
        }
      );
    },
    validarAntecedentes_toxicologia() {
      var _this = this;

      validarInputs(
        {
          form: "#validarAntecedentes",
          orden: "1",
        },
        () => this.validarMotivo_consulta(),
        () => {
          this.DETALLE_HC.ANTECEDENTES_TOXICO = this.DETALLE_HC.ANTECEDENTES_TOXICO.replace(
            /[\!\*\]\[\}\{\"\'\&\t]/g,
            " "
          );

          this.flujo_bloques.apertura = true;
          document.getElementById("btnFlujo_aper").disabled = false;

          this.empieza();
        }
      );
    },
    evaluarRevaloracion() {
      if (this.historia_clinica.revaloracion == "1") {
        CON851P(
          "Desea revalorar paciente?",
          () => this.empieza(),
          () => {
            this.bandera_revalorar = "S";
            this.empieza();
          }
        );
      } else this.empieza();
    },
    empieza() {
      if (this.global_HC002.NOVEDAD == "7") this.global_HC002.UNSERV = this.historia_clinica.cierre.unserv;

      var _this = this;

      setTimeout(() => {
        SER873(
          () => {
            if (_this.nuevo_folio) {
              _this.validarAntecedentes_toxicologia();
            } else {
              CON851P("03", _this.evaluarRevaloracion, _this.salir_hc002);
            }
          },
          _this.evaluarUnidadServicio,
          _this.global_HC002.UNSERV
        );
      }, 300);
    },
    evaluarUnidadServicio(unidServ) {
      this.textos.unidad_servicio = unidServ.COD + ". " + unidServ.DESCRIP.trim();

      if (this.historia_clinica.novedad == "7") {
        this.global_HC002.UNSERV = unidServ.COD;
        //YEIMY SOLICITA QUE AL CREAR HISTORIA SOLO DEJE PASAR CON ESTAS UNID SERV
        switch (unidServ.COD) {
          case "08":
            CON851P("58", this.actualizarCama, this.llamarHC9012);
            break;
          case "02":
          case "63":
            this.actualizarCama();
            break;
          default:
            CON851("B1", "B1", null, "error", "Error");
            this.empieza();
            break;
        }
      } else {
        if (unidServ.COD == "02" && this.historia_clinica.serv == "01") {
          CON851("B1", "B1", null, "error", "Error");
          this.empieza();
        } else if (unidServ.COD == "02" && localStorage.Usuario != "GEBC") {
          switch (this.historia_clinica.serv) {
            case "01":
            case "02":
            case "04":
              this.global_HC002.UNSERV = unidServ.COD;
              this.actualizarCama();
              break;
            default:
              CON851("2A", "2A", null, "error", "Error");
              this.empieza();
              break;
          }
        } else {
          this.global_HC002.UNSERV = unidServ.COD;
          this.actualizarCama();
        }
      }
    },
    // llamarHC9012() {
    //   var unid_edad = this.historia_clinica.edad.substring(0, 1);
    //   var edad = unid_edad + this.historia_clinica.edad.substring(1, 4).padStart(3, "0");

    //   var parametros = {
    //     operador: localStorage.Usuario,
    //     id_paci: $_REG_HC.id_paciente,
    //     suc_folio: $_REG_HC.suc_folio_hc,
    //     nro_folio: $_REG_HC.nro_folio_hc,
    //     edad: edad,
    //     medico: $_REG_PROF.IDENTIFICACION,
    //     fecha: $_REG_HC.fecha_hc,
    //     unidServ: this.global_HC002.UNSERV,
    //     finalidad: "10",
    //   };
    //   console.log(parametros);

    //   _validarVentanaMain(
    //     {
    //       Id: "4,1",
    //       Descripcion: "Vacunacion COVID-19",
    //       Tipo: "RM",
    //       Params: [{ formulario: "HC-9012", dll: "HICLIN\\HC9012", parametros }],
    //     },
    //     () => {
    //       console.log("sale de vacuna covid");
    //       this.salir_hc002();
    //     }
    //   );
    // },
    llamarHC9012() {
      this.params_vacunacion_covid.modal = true;
      setTimeout(() => {
        this.params_vacunacion_covid.paso = 2;
        this.params_vacunacion_covid.estado = true;
      }, 200);
    },
    validarSalirVacunacion_covid() {
      this.params_vacunacion_covid.estado = this.params_vacunacion_covid.modal = false;
      this.salir_hc002();
    },
    actualizarCama() {
      // PENDIENTEEEE

      this.buscarConsultaExterna();
    },
    buscarConsultaExterna() {
      var _this = this;

      if (this.global_HC002.UNSERV == "02" || this.global_HC002.UNSERV == "08") {
        postData(
          {
            datosh:
              datosEnvio() +
              localStorage.Usuario +
              "|" +
              _this.datos_paciente.COD +
              "|" +
              _this.global_HC002.UNSERV +
              "|" +
              moment().format("YYYYMMDD") +
              "|",
          },
          get_url("APP/HICLIN/HC811B.DLL")
        )
          .then((data) => {
            console.log(data);
            _this.nro_ult_comp = data;
            _this.validarTipoMacro();
          })
          .catch((err) => {
            console.error(err);
            salir_hc002();
          });
      } else {
        this.nro_ult_comp = "";
        this.validarTipoMacro();
      }
    },
    validarTipoMacro() {
      if (this.global_HC002.MACRO.CLASE.trim() == "") {
        if (this.global_HC002.UNSERV == "08") {
          this.global_HC002.MACRO.CLASE = "P";
        } else {
          switch ($_REG_PROF.ATIENDE_PROF) {
            case "1":
              switch (this.global_HC002.UNSERV) {
                case "01":
                  this.global_HC002.MACRO.CLASE = "2";
                  break;
                case "04":
                  this.global_HC002.MACRO.CLASE = "1";
                  break;
                default:
                  this.global_HC002.MACRO.CLASE = "6";
                  break;
              }
              break;
            case "2":
              this.global_HC002.MACRO.CLASE = "5";
              break;
            case "3":
              this.global_HC002.MACRO.CLASE = "4";
              break;
            case "4":
              this.global_HC002.MACRO.CLASE = "4";
              break;
            case "5":
              this.global_HC002.MACRO.CLASE = "8";
              break;
            case "6":
              this.global_HC002.MACRO.CLASE = "4";
              break;
            case "7":
              this.global_HC002.MACRO.CLASE = "8";
              break;
            case "8":
              this.global_HC002.MACRO.CLASE = "8";
              break;
            case "I":
            case "i":
              this.global_HC002.MACRO.CLASE = "2";
              break;
          }
        }
      }

      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Tipo",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.tipos_macro,
            callback_f: () => this.empieza(),
            seleccion: this.global_HC002.MACRO.CLASE,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_HC002.MACRO.CLASE = data.COD;
            _this.textos.descrip_tipo_macro = data.COD + ". " + data.DESCRIP;

            if (_this.global_HC002.MACRO.CLASE == "N") {
              _this.global_HC002.MACRO.CODIGO = "";
              _this.validarContenido();
            } else {
              _this.validarMacro();
            }
          }
        );
      }, 300);
    },
    ventanaMacros() {
      var _this = this;
      var macros_filtrados = this.macros_existentes.filter((x) => x.CLASE == _this.global_HC002.MACRO.CLASE);

      _ventanaDatos({
        titulo: "Ventana macros por tipo",
        columnas: ["CLASE", "CODIGO", "DETALLE"],
        data: macros_filtrados,
        ancho: "70%",
        callback_esc: () => {
          document.getElementById("codigoMacro_hc002").focus();
        },
        callback: (data) => {
          _this.global_HC002.MACRO.CODIGO = data.CODIGO.trim();
          setTimeout(() => _enterInput("#codigoMacro_hc002"), 100);
        },
      });
    },
    validarMacro() {
      var _this = this;

      validarInputs(
        {
          form: "#validarMacro_hc002",
          orden: "1",
        },
        () => this.validarTipoMacro(),
        () => {
          var busqueda = this.macros_existentes.find(
            (x) =>
              x.CLASE.trim() == _this.global_HC002.MACRO.CLASE &&
              x.CODIGO.trim() == _this.global_HC002.MACRO.CODIGO.trim()
          );

          if (_this.global_HC002.MACRO.CODIGO.trim() == "") {
            if (_this.global_HC002.MACRO.CLASE == "1") {
              CON851P("Desea reemplazar contenido por la macro?", _this.validarContenido, () => {
                _this.macro_escogida = {};
                _this.DETALLE_EVO.CONTENIDO =
                  "Descripción quirurgica:\nFecha procedimiento:\nHora inicio:                 Hora final:\nDiagnostico de ingreso:\nDiagnostico de salida:\nCirujano: Anestesiologo:\nAyudante:\nInstrumentadora:\nSala de cirugia:\nProcedimientos:\nHallazgos:\nPatologias:\nDescripción:";
                _this.validarContenido();
              });
            } else {
              _this.validarContenido();
            }
          } else {
            if (busqueda) {
              if (_this.DETALLE_EVO.CONTENIDO.trim() == "") {
                this.traerMacroSeleccionada();
              } else {
                CON851P(
                  "Desea reemplazar contenido por la macro?",
                  _this.validarContenido,
                  _this.traerMacroSeleccionada
                );
              }
            } else {
              CON851("", "Macro no existe!", null, "error", "Error");
              _this.validarMacro();
            }
          }
        }
      );
    },
    traerMacroSeleccionada() {
      var _this = this;
      loader("show");
      var llave = _this.global_HC002.MACRO.CLASE + cerosIzq(_this.global_HC002.MACRO.CODIGO.trim(), 6);
      postData({ datosh: datosEnvio() + llave + "|" }, get_url("APP/HICLIN/HC808-02.DLL"))
        .then((data) => {
          loader("hide");
          console.log(data);
          _this.macro_escogida = data.MACRO_FULL[0];
          _this.DETALLE_EVO.CONTENIDO = _this.macro_escogida.CONTENIDO.replace(/\&/g, "\n").trim();
          _this.macro_escogida.DETALLE = _this.macro_escogida.DETALLE.trim();

          for (var i in _this.macro_escogida.VIAS_ACCESO) {
            var buscar = _this.vias_existentes.find(
              (x) => x.CODIGO.trim() == _this.macro_escogida.VIAS_ACCESO[i].VIA.trim()
            );
            if (buscar) _this.macro_escogida.VIAS_ACCESO[i].DESCRIP = buscar.NOMBRE.trim();
          }

          _this.validarContenido();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.validarMacro();
        });
    },
    validarContenido() {
      var _this = this;

      validarInputs(
        {
          form: "#validarContenido_HC002",
          orden: "1",
        },
        () => {
          if (_this.global_HC002.MACRO.CLASE == "N") {
            _this.validarTipoMacro();
          } else {
            _this.validarMacro();
          }
        },
        () => {
          this.DETALLE_EVO.CONTENIDO = this.DETALLE_EVO.CONTENIDO.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");

          this.flujo_bloques.evolucion = true;
          document.getElementById("btnFlujo_evo").disabled = false;

          this.crearHistoria();
        }
      );
    },
    crearHistoria() {
      var _this = this;

      if (this.historia_clinica.novedad == "7") {
        var data = {};
        data["datosh"] =
          datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|" + this.global_HC002.NOVEDAD + "|";

        data["datos_basicos"] =
          this.global_HC002.FECHA_EVO +
          "|" +
          this.global_HC002.HORA_EVO +
          "|" +
          localStorage.IDUSU +
          "|" +
          this.global_HC002.UNSERV +
          "|" +
          this.historia_clinica.edad +
          "|";

        data["procedencia"] = this.historia_clinica.proceden;
        data["motivo_consulta"] = this.historia_clinica.motivo.replace(/(\r\n|\n|\r)/gm, "&");

        postData(data, get_url("APP/HICLIN/HC002-03.DLL"))
          .then((data) => {
            console.log(data);

            if (_this.global_HC002.UNSERV == "02" || _this.global_HC002.UNSERV == "08") {
              if (data.trim() == "") CON851("", "No se encontro movimiento !", null, "error", "Error");
              else CON851("", data, null, "success", "Numeracion");
            }

            _this.guardarContenido_apertura();
          })
          .catch((error) => {
            console.log(error);
            CON851("", "Ha ocurrido un error creando historia", null, "error", "Error");
            _regresar_menuhis();
          });
      } else if (this.historia_clinica.cierre.temporal == "1") {
        this.guardarContenido_apertura();
      } else {
        this.validarFlujoContenido();
      }
    },
    guardarContenido_apertura() {
      var _this = this;

      var data = {};
      data["datosh"] =
        datosEnvio() +
        $_REG_HC.llave_hc +
        "|" +
        this.global_HC002.LLAVE_EVO +
        "|" +
        localStorage.Usuario +
        "|" +
        this.historia_clinica.novedad +
        "|" +
        "1" +
        "|";

      data["medico"] = localStorage.IDUSU;

      data["procedencia"] = this.historia_clinica.proceden;
      data["motivo_consulta"] = this.historia_clinica.motivo.replace(/(\r\n|\n|\r)/gm, "&");
      data["antecedentes_toxico"] = this.DETALLE_HC.ANTECEDENTES_TOXICO.replace(/(\r\n|\n|\r)/gm, "&");

      data["UNID_SERV"] = this.global_HC002.UNSERV;

      data["edad"] = this.historia_clinica.edad;

      data["MACRO"] =
        this.global_HC002.MACRO.CLASE +
        "|" +
        this.global_HC002.MACRO.CODIGO.trim() +
        "|" +
        this.global_HC002.MACRO.VIA +
        "|";

      var detalle_Evol_content = JSON.parse(JSON.stringify(this.DETALLE_EVO.CONTENIDO.replace(/(\r\n|\n|\r)/gm, "&")));

      var posicion = 0;
      var contadorLin = 0;
      var contadorTotal = 0;
      var linea = "";
      var maximo = 90;

      detalle_Evol_content.split("").forEach((item, i) => {
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

        if (contadorLin == maximo || detalle_Evol_content.length == contadorTotal) {
          posicion = posicion + 1;

          data["DETALLE_CON-" + posicion.toString().padStart(3, "0")] = linea;
          contadorLin = 0;
          linea = "";
          maximo = 90;
        }
      });

      postData(data, get_url("APP/HICLIN/HC002-02.DLL"))
        .then((data) => {
          console.log(data);

          _this.validarFlujoContenido();
        })
        .catch((error) => {
          console.log(error);
          CON851("", "Ha ocurrido un error guardando informacion de historia", null, "error", "Error");
          _this.validarFlujoContenido();
        });
    },
    validarFlujoContenido() {
      if (this.global_HC002.MACRO.CLASE == "N") {
        this.global_HC002.MACRO.VIA = "";
        this.textos.descrip_via_macro = "";
        this.verificarProcedimientos();
      } else {
        this.ventanaViasAcceso();
      }
    },
    ventanaViasAcceso() {
      var _this = this;
      if (this.global_HC002.MACRO.CLASE == "1" || this.global_HC002.MACRO.CLASE == "2") {
        if (this.global_HC002.MACRO.CLASE == "1" && this.global_HC002.MACRO.CODIGO.trim() == "") {
          this.global_HC002.MACRO.VIA = "";
          this.textos.descrip_via_macro = "";
          this.verificarProcedimientos();
        } else {
          var vias_filtrados = this.macro_escogida.VIAS_ACCESO.filter((x) => x.VIA.trim() != "");
          console.log(vias_filtrados);

          if (vias_filtrados.length > 0) {
            POPUP(
              {
                titulo: "Selección via de acceso",
                indices: [{ id: "VIA", label: "DESCRIP" }],
                array: vias_filtrados,
                callback_f: () => this.validarContenido(),
                seleccion: this.global_HC002.MACRO.VIA,
                teclaAlterna: true,
              },
              (data) => {
                _this.global_HC002.MACRO.VIA = data.VIA;
                _this.textos.descrip_via_macro = data.DESCRIP;
                _this.verificarProcedimientos();
              }
            );
          } else {
            this.global_HC002.MACRO.VIA = "";
            this.textos.descrip_via_macro = "";
            this.verificarProcedimientos();
          }
        }
      } else {
        this.global_HC002.MACRO.VIA = "";
        this.textos.descrip_via_macro = "";
        this.verificarProcedimientos();
      }
    },
    verificarProcedimientos() {
      if (this.global_HC002.MACRO.CLASE == "1" || this.global_HC002.MACRO.CLASE == "2") {
        this.traerCups(2);
      } else {
        this.validarCovid();
      }
    },
    traerCups(flujo) {
      var _this = this;

      if (this.cups.length > 0) {
        this.validarCups_proce(1);
      } else {
        loader("show");
        CON851("", "Consultando cups y salas..", null, "success", "Espere");
        postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER802C.DLL"))
          .then((data) => {
            console.log(data);
            _this.cups = data.CODIGOS;
            _this.cups.pop();

            _this.traerSalas_cirugias(flujo);
          })
          .catch((error) => {
            CON851("", "Ha ocurrido un error consultando cups", null, "error", "Error");
            console.error(error);
            loader("hide");
            _this.validarContenido();
          });
      }
    },
    traerSalas_cirugias(flujo) {
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/HC878.DLL"))
        .then((data) => {
          loader("hide");
          CON851("", "Informacion traida correctamente", null, "success", "Correcto");
          console.log(data);
          _this.salas_cirugias = data.SALAS_CIRUGIA;
          _this.salas_cirugias.pop();

          if (flujo == 1) {
            _this.mostrarTextos();
          } else if (flujo == 2) {
            _this.validarCups_proce(1);
          }
        })
        .catch((error) => {
          CON851("", "Ha ocurrido un error consultando salas", null, "error", "Error");
          console.error(error);
          loader("hide");

          if (flujo == 1) {
            _this.salir_hc002();
          } else if (flujo == 2) {
            _this.validarContenido();
          }
        });
    },
    ventanaCups(num) {
      var _this = this;
      var copia = JSON.parse(JSON.stringify(this.global_HC002.TABLA_CUPS));

      var cups_filtrados = this.cups.filter((x) => x.LLAVE.trim().length <= 6);

      _ventanaDatos({
        titulo: "Ventana de CUPS",
        columnas: ["LLAVE", "DESCRIP", "TIPO"],
        data: cups_filtrados,
        ancho: "70%",
        callback_esc: () => {
          document.getElementById("cod_cups_" + num).focus();
        },
        callback: (data) => {
          var pos = parseInt(num) - 1;
          copia[pos] = data.LLAVE.trim();
          _this.global_HC002.TABLA_CUPS = [];
          _this.global_HC002.TABLA_CUPS = copia;
          setTimeout(() => _enterInput("#cod_cups_" + num), 100);
        },
      });
    },
    validarCups_proce(a) {
      validarInputs(
        {
          form: "#validarCups_" + a + "_HC002",
          orden: "1",
        },
        () => {
          if (a == 1) {
            this.validarContenido();
          } else {
            this.validarCups_proce(parseInt(a) - 1);
          }
        },
        () => {
          var pos = parseInt(a) - 1;
          var copia = JSON.parse(JSON.stringify(this.textos.descrip_cups));

          this.global_HC002.TABLA_CUPS[pos] = this.global_HC002.TABLA_CUPS[pos].toUpperCase().trim();

          var busqueda = this.cups.find((x) => x.LLAVE.trim() == cerosIzq(this.global_HC002.TABLA_CUPS[pos], 6));

          if (busqueda) {
            this.global_HC002.TABLA_CUPS[pos] = busqueda.LLAVE.trim();
            copia[pos] = busqueda.DESCRIP.trim();

            this.textos.descrip_cups = [];
            this.textos.descrip_cups = copia;

            if (a == 14) {
              this.validarTipoanestesia();
            } else {
              this.validarCups_proce(parseInt(a) + 1);
            }
          } else if (a != 1 && this.global_HC002.TABLA_CUPS[pos] == "") {
            this.validarTipoanestesia();
          } else {
            copia[pos] = "";
            this.textos.descrip_cups = [];
            this.textos.descrip_cups = copia;
            CON851("", "Cup no existe!", null, "error", "Error");
            this.validarCups_proce(a);
          }
        }
      );
    },
    validarTipoanestesia() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Tipo de anestesia",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.opc_tipo_anes,
            callback_f: () => this.validarCups_proce(1),
            seleccion: this.global_HC002.PROCEDIMIENTOS.TIPO_ANES,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_HC002.PROCEDIMIENTOS.TIPO_ANES = data.COD;
            _this.textos.anestesia = data.COD + ". " + data.DESCRIP;
            _this.validarDuracion_proce();
          }
        );
      }, 300);
    },
    validarDuracion_proce() {
      validarInputs(
        {
          form: "#validar_tiempoProce",
          orden: "1",
        },
        () => {
          this.validarTipoanestesia();
        },
        () => {
          this.validarTiempo_sala();
        }
      );
    },
    validarTiempo_sala() {
      validarInputs(
        {
          form: "#validar_tiempoSala",
          orden: "1",
        },
        () => {
          this.validarDuracion_proce();
        },
        () => {
          if (
            parseInt(this.global_HC002.PROCEDIMIENTOS.TIEMPO_SALA) <
            parseInt(this.global_HC002.PROCEDIMIENTOS.TIEMPO_PROC)
          ) {
            CON851("", "No puede ser menor a tiempo de procedimiento!", null, "error", "Error");
            this.validarTiempo_sala();
          } else {
            this.global_HC002.PROCEDIMIENTOS.TIEMPO_SALA = this.global_HC002.PROCEDIMIENTOS.TIEMPO_SALA.toString();
            this.validarSala_cirugia();
          }
        }
      );
    },
    ventanaSalaCirugias() {
      var _this = this;

      _ventanaDatos({
        titulo: "Ventana salas cirugia",
        columnas: ["CODIGO", "DESCRIP"],
        data: this.salas_cirugias,
        ancho: "50%",
        callback_esc: () => {
          document.getElementById("sala_cirugia").focus();
        },
        callback: (data) => {
          _this.global_HC002.PROCEDIMIENTOS.SALA_CIRU = data.CODIGO.trim();
          setTimeout(() => _enterInput("#sala_cirugia"), 100);
        },
      });
    },
    validarSala_cirugia() {
      validarInputs(
        {
          form: "#validar_SalaCirugia",
          orden: "1",
        },
        () => {
          this.validarTiempo_sala();
        },
        () => {
          this.global_HC002.PROCEDIMIENTOS.SALA_CIRU = cerosIzq(this.global_HC002.PROCEDIMIENTOS.SALA_CIRU, 2);

          var busqueda = this.salas_cirugias.find((x) => x.CODIGO == this.global_HC002.PROCEDIMIENTOS.SALA_CIRU);

          if (busqueda) {
            this.textos.descrip_sala_cirugia = busqueda.DESCRIP.trim();
            this.validarProce_programado();
          } else {
            this.textos.descrip_sala_cirugia = "";
            CON851("", "Sala no existe!", null, "error", "Error");
            this.validarSala_cirugia();
          }
        }
      );
    },
    validarProce_programado() {
      validarInputs(
        {
          form: "#validarProce_programado",
          orden: "1",
        },
        () => {
          this.validarSala_cirugia();
        },
        () => {
          this.global_HC002.PROCEDIMIENTOS.PROC_PROGRAMADO =
            this.global_HC002.PROCEDIMIENTOS.PROC_PROGRAMADO.toUpperCase().trim() != "S" ? "N" : "S";
          this.validarProce_ambulatorio();
        }
      );
    },
    validarProce_ambulatorio() {
      validarInputs(
        {
          form: "#validarProce_ambulatorio",
          orden: "1",
        },
        () => {
          this.validarProce_programado();
        },
        () => {
          this.global_HC002.PROCEDIMIENTOS.PROC_AMBULA =
            this.global_HC002.PROCEDIMIENTOS.PROC_AMBULA.toUpperCase().trim() != "S" ? "N" : "S";
          this.validarEvento_adverso();
        }
      );
    },
    validarEvento_adverso() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Evento adverso",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.opc_even_adverso,
            callback_f: () => this.validarProce_ambulatorio(),
            seleccion: this.global_HC002.PROCEDIMIENTOS.EVEN_ADVERSO,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_HC002.PROCEDIMIENTOS.EVEN_ADVERSO = data.COD;
            _this.textos.evento_adverso = data.COD + ". " + data.DESCRIP;
            _this.validarTipo_cirugia();
          }
        );
      }, 300);
    },
    validarTipo_cirugia() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Tipo cirugia",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.opc_tipo_ciru,
            callback_f: () => this.validarEvento_adverso(),
            seleccion: this.global_HC002.PROCEDIMIENTOS.TIPO_CIRUGIA,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_HC002.PROCEDIMIENTOS.TIPO_CIRUGIA = data.COD;
            _this.textos.tipo_cirugia = data.COD + ". " + data.DESCRIP;
            _this.validarEstado_salida();
          }
        );
      }, 300);
    },
    validarEstado_salida() {
      var _this = this;
      var opciones = [
        { COD: "1", DESCRIP: "VIVO" },
        { COD: "2", DESCRIP: "MUERTO" },
      ];

      setTimeout(() => {
        POPUP(
          {
            titulo: "Estado salida",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: opciones,
            callback_f: () => this.validarTipo_cirugia(),
            seleccion: this.global_HC002.RIPS.ESTADO_SAL,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_HC002.RIPS.ESTADO_SAL = data.COD;
            _this.textos.estado_salida = data.COD + ". " + data.DESCRIP;
            _this.validarSolicitud_patologia();
          }
        );
      }, 300);
    },
    validarSolicitud_patologia() {
      validarInputs(
        {
          form: "#validarSolicitud_patologia",
          orden: "1",
        },
        () => {
          this.validarEstado_salida();
        },
        () => {
          this.solicitud_patologia = this.solicitud_patologia.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.solicitud_patologia == "S") {
            this.validarPieza_quirurgica();
          } else {
            this.flujo_bloques.procedimientos_cirugias = true;
            document.getElementById("btnFlujo_proce").disabled = false;
            this.global_HC002.PATOLOGIA.PIEZA_QUIR = "";
            this.global_HC002.PATOLOGIA.DATOS_CLINICOS = "";
            this.validarCovid();
          }
        }
      );
    },
    validarPieza_quirurgica() {
      validarInputs(
        {
          form: "#validar_pieza_quirur",
          orden: "1",
        },
        () => {
          this.validarSolicitud_patologia();
        },
        () => {
          this.global_HC002.PATOLOGIA.PIEZA_QUIR = this.global_HC002.PATOLOGIA.PIEZA_QUIR.replace(/\&/g, " ").trim();
          this.global_HC002.PATOLOGIA.PIEZA_QUIR = this.global_HC002.PATOLOGIA.PIEZA_QUIR.replace(/\"/g, " ").trim();
          this.global_HC002.PATOLOGIA.PIEZA_QUIR = this.global_HC002.PATOLOGIA.PIEZA_QUIR.replace(/\{/g, " ").trim();
          this.global_HC002.PATOLOGIA.PIEZA_QUIR = this.global_HC002.PATOLOGIA.PIEZA_QUIR.replace(/\}/g, " ").trim();
          this.global_HC002.PATOLOGIA.PIEZA_QUIR = this.global_HC002.PATOLOGIA.PIEZA_QUIR.replace(/\[/g, " ").trim();
          this.global_HC002.PATOLOGIA.PIEZA_QUIR = this.global_HC002.PATOLOGIA.PIEZA_QUIR.replace(/\]/g, " ").trim();
          this.global_HC002.PATOLOGIA.PIEZA_QUIR = this.global_HC002.PATOLOGIA.PIEZA_QUIR.replace(/\*/g, " ").trim();

          this.validarDatos_clinicos();
        }
      );
    },
    validarDatos_clinicos() {
      validarInputs(
        {
          form: "#validar_datos_clinicos",
          orden: "1",
        },
        () => {
          this.validarPieza_quirurgica();
        },
        () => {
          this.global_HC002.PATOLOGIA.DATOS_CLINICOS = this.global_HC002.PATOLOGIA.DATOS_CLINICOS.replace(
            /\&/g,
            " "
          ).trim();
          this.global_HC002.PATOLOGIA.DATOS_CLINICOS = this.global_HC002.PATOLOGIA.DATOS_CLINICOS.replace(
            /\"/g,
            " "
          ).trim();
          this.global_HC002.PATOLOGIA.DATOS_CLINICOS = this.global_HC002.PATOLOGIA.DATOS_CLINICOS.replace(
            /\{/g,
            " "
          ).trim();
          this.global_HC002.PATOLOGIA.DATOS_CLINICOS = this.global_HC002.PATOLOGIA.DATOS_CLINICOS.replace(
            /\}/g,
            " "
          ).trim();
          this.global_HC002.PATOLOGIA.DATOS_CLINICOS = this.global_HC002.PATOLOGIA.DATOS_CLINICOS.replace(
            /\[/g,
            " "
          ).trim();
          this.global_HC002.PATOLOGIA.DATOS_CLINICOS = this.global_HC002.PATOLOGIA.DATOS_CLINICOS.replace(
            /\]/g,
            " "
          ).trim();
          this.global_HC002.PATOLOGIA.DATOS_CLINICOS = this.global_HC002.PATOLOGIA.DATOS_CLINICOS.replace(
            /\*/g,
            " "
          ).trim();

          this.flujo_bloques.procedimientos_cirugias = true;
          document.getElementById("btnFlujo_proce").disabled = false;
          this.validarCovid();
        }
      );
    },
    validarCovid() {
      switch (this.global_HC002.UNSERV) {
        case "01":
        case "02":
        case "08":
        case "09":
        case "63":
          this.validarFiebre_COVID();
          break;
        default:
          this.global_HC002.COVID = {
            FIEBRE: "",
            TOS: "",
            DISNEA: "",
            MALESTAR: "",
            RINORREA: "",
            ODINOFAGIA: "",
            VIAJE: "",
            CONTACTO: "",
            PERSONAL_SALUD: "",
            VIAJE_DENTRO: "",
            LUGAR_VIAJE_DENTRO: "",
            TIEMPO_VIAJE_DENTRO: "",
            VIAJE_FUERA: "",
            LUGAR_VIAJE_FUERA: "",
            TIEMPO_VIAJE_FUERA: "",
          };
          this.validarSintomas_respiratorio();
          break;
      }
    },
    validarFiebre_COVID() {
      validarInputs(
        {
          form: "#validarFiebre_COVID",
          orden: "1",
        },
        () => {
          if (this.global_HC002.MACRO.CLASE == "1" || this.global_HC002.MACRO.CLASE == "2") {
            this.validarSolicitud_patologia();
          } else {
            this.validarContenido();
          }
        },
        () => {
          this.global_HC002.COVID.FIEBRE = this.global_HC002.COVID.FIEBRE.toUpperCase().trim() != "S" ? "N" : "S";
          this.validarTos_COVID();
        }
      );
    },
    validarTos_COVID() {
      validarInputs(
        {
          form: "#validarTos_COVID",
          orden: "1",
        },
        () => {
          this.validarFiebre_COVID();
        },
        () => {
          this.global_HC002.COVID.TOS = this.global_HC002.COVID.TOS.toUpperCase().trim() != "S" ? "N" : "S";
          this.validarDisnea_COVID();
        }
      );
    },
    validarDisnea_COVID() {
      validarInputs(
        {
          form: "#validarDisnea_COVID",
          orden: "1",
        },
        () => {
          this.validarTos_COVID();
        },
        () => {
          this.global_HC002.COVID.DISNEA = this.global_HC002.COVID.DISNEA.toUpperCase().trim() != "S" ? "N" : "S";
          this.validarMalestar_COVID();
        }
      );
    },
    validarMalestar_COVID() {
      validarInputs(
        {
          form: "#validarMalestar_COVID",
          orden: "1",
        },
        () => {
          this.validarDisnea_COVID();
        },
        () => {
          this.global_HC002.COVID.MALESTAR = this.global_HC002.COVID.MALESTAR.toUpperCase().trim() != "S" ? "N" : "S";
          this.validarRinorrea_COVID();
        }
      );
    },
    validarRinorrea_COVID() {
      validarInputs(
        {
          form: "#validarRinorrea_COVID",
          orden: "1",
        },
        () => {
          this.validarMalestar_COVID();
        },
        () => {
          this.global_HC002.COVID.RINORREA = this.global_HC002.COVID.RINORREA.toUpperCase().trim() != "S" ? "N" : "S";
          this.validarOdinofagia_COVID();
        }
      );
    },
    validarOdinofagia_COVID() {
      validarInputs(
        {
          form: "#validarOdinofagia_COVID",
          orden: "1",
        },
        () => {
          this.validarRinorrea_COVID();
        },
        () => {
          this.global_HC002.COVID.ODINOFAGIA =
            this.global_HC002.COVID.ODINOFAGIA.toUpperCase().trim() != "S" ? "N" : "S";
          this.validarViaje_COVID();
        }
      );
    },
    validarViaje_COVID() {
      validarInputs(
        {
          form: "#validarViaje_COVID",
          orden: "1",
        },
        () => {
          this.validarOdinofagia_COVID();
        },
        () => {
          this.global_HC002.COVID.VIAJE = this.global_HC002.COVID.VIAJE.toUpperCase().trim() != "S" ? "N" : "S";
          this.validarContacto_COVID();
        }
      );
    },
    validarContacto_COVID() {
      validarInputs(
        {
          form: "#validarContacto_COVID",
          orden: "1",
        },
        () => {
          this.validarViaje_COVID();
        },
        () => {
          this.global_HC002.COVID.CONTACTO = this.global_HC002.COVID.CONTACTO.toUpperCase().trim() != "S" ? "N" : "S";
          this.validarPersonalSalud_COVID();
        }
      );
    },
    validarPersonalSalud_COVID() {
      validarInputs(
        {
          form: "#validarPersonalSalud_COVID",
          orden: "1",
        },
        () => {
          this.validarContacto_COVID();
        },
        () => {
          this.global_HC002.COVID.PERSONAL_SALUD =
            this.global_HC002.COVID.PERSONAL_SALUD.toUpperCase().trim() != "S" ? "N" : "S";
          this.validarViajeDentro_COVID();
        }
      );
    },
    validarViajeDentro_COVID() {
      validarInputs(
        {
          form: "#validarViajeDentro_COVID",
          orden: "1",
        },
        () => {
          this.validarPersonalSalud_COVID();
        },
        () => {
          this.global_HC002.COVID.VIAJE_DENTRO =
            this.global_HC002.COVID.VIAJE_DENTRO.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.global_HC002.COVID.VIAJE_DENTRO == "S") {
            this.ventanaCiudadViajeDentro_COVID();
          } else {
            this.textos.ciudad_dentro = "";
            this.global_HC002.COVID.LUGAR_VIAJE_DENTRO = "";
            this.global_HC002.COVID.TIEMPO_VIAJE_DENTRO = "";
            this.validarViajeFuera_COVID();
          }
        }
      );
    },
    ventanaCiudadViajeDentro_COVID() {
      var _this = this;

      _ventanaDatos({
        titulo: "Ventana ciudades",
        columnas: ["COD", "NOMBRE", "DEPART"],
        data: this.ciudades,
        ancho: "70%",
        callback_esc: () => {
          _this.validarViajeDentro_COVID();
        },
        callback: (data) => {
          _this.global_HC002.COVID.LUGAR_VIAJE_DENTRO = data.COD.trim();
          _this.textos.ciudad_dentro = data.NOMBRE.trim();
          _this.validarTiempoViajeDentro_COVID();
        },
      });
    },
    validarTiempoViajeDentro_COVID() {
      validarInputs(
        {
          form: "#validarTiempoViajeDentro_COVID",
          orden: "1",
        },
        () => {
          this.ventanaCiudadViajeDentro_COVID();
        },
        () => {
          this.validarViajeFuera_COVID();
        }
      );
    },
    validarViajeFuera_COVID() {
      validarInputs(
        {
          form: "#validarViajeFuera_COVID",
          orden: "1",
        },
        () => {
          this.validarViajeDentro_COVID();
        },
        () => {
          this.global_HC002.COVID.VIAJE_FUERA =
            this.global_HC002.COVID.VIAJE_FUERA.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.global_HC002.COVID.VIAJE_FUERA == "S") {
            this.ventanaCiudadViajeFuera_COVID();
          } else {
            this.global_HC002.COVID.LUGAR_VIAJE_FUERA = "";
            this.global_HC002.COVID.TIEMPO_VIAJE_FUERA = "";
            this.textos.pais_fuera = "";
            document.getElementById("btnFlujo_covid").disabled = false;
            this.flujo_bloques.covid = true;
            this.guardarPreguntasCovid();
          }
        }
      );
    },
    ventanaCiudadViajeFuera_COVID() {
      var _this = this;

      _ventanaDatos({
        titulo: "Ventana paises",
        columnas: ["CODIGO", "DESCRIP"],
        data: this.paises,
        ancho: "70%",
        callback_esc: () => {
          _this.validarViajeFuera_COVID();
        },
        callback: (data) => {
          _this.global_HC002.COVID.LUGAR_VIAJE_FUERA = data.CODIGO.trim();
          _this.textos.pais_fuera = data.DESCRIP.trim();
          _this.validarTiempoViajeFuera_COVID();
        },
      });
    },
    validarTiempoViajeFuera_COVID() {
      validarInputs(
        {
          form: "#validarTiempoViajeFuera_COVID",
          orden: "1",
        },
        () => {
          this.ventanaCiudadViajeFuera_COVID();
        },
        () => {
          document.getElementById("btnFlujo_covid").disabled = false;
          this.flujo_bloques.covid = true;
          this.guardarPreguntasCovid();
        }
      );
    },
    guardarPreguntasCovid() {
      if (this.historia_clinica.novedad == "7" || this.historia_clinica.cierre.temporal == "1") {
        var _this = this;

        var data = {};
        data["datosh"] =
          datosEnvio() +
          $_REG_HC.llave_hc +
          "|" +
          this.global_HC002.LLAVE_EVO +
          "|" +
          localStorage.Usuario +
          "|" +
          this.historia_clinica.novedad +
          "|" +
          "2" +
          "|";

        var preguntas_covid = this.global_HC002.COVID.FIEBRE;
        preguntas_covid += "|";
        preguntas_covid += this.global_HC002.COVID.TOS;
        preguntas_covid += "|";
        preguntas_covid += this.global_HC002.COVID.DISNEA;
        preguntas_covid += "|";
        preguntas_covid += this.global_HC002.COVID.MALESTAR;
        preguntas_covid += "|";
        preguntas_covid += this.global_HC002.COVID.RINORREA;
        preguntas_covid += "|";
        preguntas_covid += this.global_HC002.COVID.ODINOFAGIA;
        preguntas_covid += "|";
        preguntas_covid += this.global_HC002.COVID.VIAJE;
        preguntas_covid += "|";
        preguntas_covid += this.global_HC002.COVID.CONTACTO;
        preguntas_covid += "|";
        preguntas_covid += this.global_HC002.COVID.PERSONAL_SALUD;
        preguntas_covid += "|";
        preguntas_covid += this.global_HC002.COVID.VIAJE_DENTRO;
        preguntas_covid += "|";
        preguntas_covid += this.global_HC002.COVID.LUGAR_VIAJE_DENTRO;
        preguntas_covid += "|";
        preguntas_covid += this.global_HC002.COVID.TIEMPO_VIAJE_DENTRO;
        preguntas_covid += "|";
        preguntas_covid += this.global_HC002.COVID.VIAJE_FUERA;
        preguntas_covid += "|";
        preguntas_covid += this.global_HC002.COVID.LUGAR_VIAJE_FUERA;
        preguntas_covid += "|";
        preguntas_covid += this.global_HC002.COVID.TIEMPO_VIAJE_FUERA;
        preguntas_covid += "|";

        data["covid"] = preguntas_covid;

        postData(data, get_url("APP/HICLIN/HC002-02.DLL"))
          .then((data) => {
            console.log(data);

            _this.validarSintomas_respiratorio();
          })
          .catch((error) => {
            console.log(error);
            CON851("", "Ha ocurrido un error guardando preguntas de covid", null, "error", "Error");
            _this.validarSintomas_respiratorio();
          });
      } else {
        this.validarSintomas_respiratorio();
      }
    },
    validarSintomas_respiratorio() {
      validarInputs(
        {
          form: "#validarSintomas_respiratorio",
          orden: "1",
        },
        () => {
          switch (this.global_HC002.UNSERV) {
            case "01":
            case "02":
            case "08":
            case "09":
            case "63":
              this.validarViajeFuera_COVID();
              break;
            default:
              if (this.global_HC002.MACRO.CLASE == "1" || this.global_HC002.MACRO.CLASE == "2") {
                this.validarSolicitud_patologia();
              } else {
                this.validarContenido();
              }
              break;
          }
        },
        () => {
          switch (this.global_HC002.SINTOM_RESPI.toUpperCase().trim()) {
            case "S":
            case "N":
            case "X":
              this.global_HC002.SINTOM_RESPI = this.global_HC002.SINTOM_RESPI.toUpperCase();
              break;
            default:
              this.global_HC002.SINTOM_RESPI = "N";
              break;
          }
          this.validarSintomas_piel();
        }
      );
    },
    validarSintomas_piel() {
      validarInputs(
        {
          form: "#validarSintomas_piel",
          orden: "1",
        },
        () => {
          this.validarSintomas_respiratorio();
        },
        () => {
          switch (this.global_HC002.SINTOM_PIEL.toUpperCase().trim()) {
            case "S":
            case "N":
            case "X":
              this.global_HC002.SINTOM_PIEL = this.global_HC002.SINTOM_PIEL.toUpperCase();
              break;
            default:
              this.global_HC002.SINTOM_PIEL = "N";
              break;
          }
          this.validarContacto_lepra();
        }
      );
    },
    validarContacto_lepra() {
      validarInputs(
        {
          form: "#validarContacto_lepra",
          orden: "1",
        },
        () => {
          this.validarSintomas_piel();
        },
        () => {
          switch (this.global_HC002.CONTACTO_LEPRA.toUpperCase().trim()) {
            case "S":
            case "N":
            case "X":
              this.global_HC002.CONTACTO_LEPRA = this.global_HC002.CONTACTO_LEPRA.toUpperCase();
              break;
            default:
              this.global_HC002.CONTACTO_LEPRA = "N";
              break;
          }
          this.validarVictima_maltrato();
        }
      );
    },
    validarVictima_maltrato() {
      validarInputs(
        {
          form: "#validarVictima_maltrato",
          orden: "1",
        },
        () => {
          this.validarContacto_lepra();
        },
        () => {
          switch (this.global_HC002.VICTI_MALTRATO.toUpperCase().trim()) {
            case "S":
            case "N":
            case "X":
              this.global_HC002.VICTI_MALTRATO = this.global_HC002.VICTI_MALTRATO.toUpperCase();
              break;
            default:
              this.global_HC002.VICTI_MALTRATO = "N";
              break;
          }
          this.validarVictima_violencia();
        }
      );
    },
    validarVictima_violencia() {
      validarInputs(
        {
          form: "#validarVictima_violencia",
          orden: "1",
        },
        () => {
          this.validarVictima_maltrato();
        },
        () => {
          switch (this.global_HC002.VICTI_VIOLENCIA.toUpperCase().trim()) {
            case "S":
            case "N":
            case "X":
              this.global_HC002.VICTI_VIOLENCIA = this.global_HC002.VICTI_VIOLENCIA.toUpperCase();
              break;
            default:
              this.global_HC002.VICTI_VIOLENCIA = "N";
              break;
          }
          this.validarEnfermedad_mental();
        }
      );
    },
    validarEnfermedad_mental() {
      validarInputs(
        {
          form: "#validarEnfermedad_mental",
          orden: "1",
        },
        () => {
          this.validarVictima_violencia();
        },
        () => {
          switch (this.global_HC002.ENFER_MENTAL.toUpperCase().trim()) {
            case "S":
            case "N":
            case "X":
              this.global_HC002.ENFER_MENTAL = this.global_HC002.ENFER_MENTAL.toUpperCase();
              break;
            default:
              this.global_HC002.ENFER_MENTAL = "N";
              break;
          }
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
          this.validarEnfermedad_mental();
        },
        () => {
          switch (this.global_HC002.ENFER_ITS.toUpperCase().trim()) {
            case "S":
            case "N":
            case "X":
              this.global_HC002.ENFER_ITS = this.global_HC002.ENFER_ITS.toUpperCase();
              break;
            default:
              this.global_HC002.ENFER_ITS = "N";
              break;
          }
          if (this.global_HC002.ENFER_ITS == "S") {
            this.validarCual_ITS();
          } else {
            this.global_HC002.CUAL_ITS = "";
            this.global_HC002.TRATA_ITS = "";
            this.evaluarSexo();
          }
        }
      );
    },
    validarCual_ITS() {
      validarInputs(
        {
          form: "#validarCual_ITS",
          orden: "1",
        },
        () => {
          this.validarITS();
        },
        () => {
          this.validarTratamiento_ITS();
        }
      );
    },
    validarTratamiento_ITS() {
      validarInputs(
        {
          form: "#validarTratamiento_ITS",
          orden: "1",
        },
        () => {
          this.validarCual_ITS();
        },
        () => {
          switch (this.global_HC002.TRATA_ITS.toUpperCase().trim()) {
            case "S":
            case "N":
            case "X":
              this.global_HC002.TRATA_ITS = this.global_HC002.TRATA_ITS.toUpperCase();
              break;
            default:
              this.global_HC002.TRATA_ITS = "N";
              break;
          }
          this.evaluarSexo();
        }
      );
    },
    evaluarSexo() {
      if (this.datos_paciente.SEXO == "F") {
        this.validarCancer_seno();
      } else {
        this.global_HC002.CANCER_SENO = "";
        this.global_HC002.CANCER_CERVIS = "";
        this.global_HC002.EDU_AUTOEXA_SENO = "";
        this.global_HC002.CITOLOGIA_PREVIA = "";
        this.global_HC002.FECHA_CITO_PREVIA = "";
        this.global_HC002.RESUL_CITO_PREVIA = "";
        this.global_HC002.FECHA_ULT_MAMO = "";

        this.guardarSintomasAper();
      }
    },
    validarCancer_seno() {
      validarInputs(
        {
          form: "#validarCancer_seno",
          orden: "1",
        },
        () => {
          this.validarITS();
        },
        () => {
          switch (this.global_HC002.CANCER_SENO.toUpperCase().trim()) {
            case "S":
            case "N":
            case "X":
              this.global_HC002.CANCER_SENO = this.global_HC002.CANCER_SENO.toUpperCase();
              break;
            default:
              this.global_HC002.CANCER_SENO = "N";
              break;
          }
          this.validarCancer_cervix();
        }
      );
    },
    validarCancer_cervix() {
      validarInputs(
        {
          form: "#validarCancer_cervix",
          orden: "1",
        },
        () => {
          this.validarCancer_seno();
        },
        () => {
          switch (this.global_HC002.CANCER_CERVIS.toUpperCase().trim()) {
            case "S":
            case "N":
            case "X":
              this.global_HC002.CANCER_CERVIS = this.global_HC002.CANCER_CERVIS.toUpperCase();
              break;
            default:
              this.global_HC002.CANCER_CERVIS = "N";
              break;
          }
          this.validarAutoexa_seno();
        }
      );
    },
    validarAutoexa_seno() {
      validarInputs(
        {
          form: "#validarAutoexa_seno",
          orden: "1",
        },
        () => {
          this.validarCancer_cervix();
        },
        () => {
          switch (this.global_HC002.EDU_AUTOEXA_SENO.toUpperCase().trim()) {
            case "S":
            case "N":
            case "X":
              this.global_HC002.EDU_AUTOEXA_SENO = this.global_HC002.EDU_AUTOEXA_SENO.toUpperCase();
              break;
            default:
              this.global_HC002.EDU_AUTOEXA_SENO = "N";
              break;
          }
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
          this.validarAutoexa_seno();
        },
        () => {
          switch (this.global_HC002.CITOLOGIA_PREVIA.toUpperCase().trim()) {
            case "S":
            case "N":
            case "X":
              this.global_HC002.CITOLOGIA_PREVIA = this.global_HC002.CITOLOGIA_PREVIA.toUpperCase();
              break;
            default:
              this.global_HC002.CITOLOGIA_PREVIA = "N";
              break;
          }
          if (this.global_HC002.CITOLOGIA_PREVIA == "S") {
            this.validarFecha_Citologia();
          } else {
            this.global_HC002.FECHA_CITO_PREVIA = "";
            this.global_HC002.RESUL_CITO_PREVIA = "";
            this.validarMamografia();
          }
        }
      );
    },
    validarFecha_Citologia() {
      validarInputs(
        {
          form: "#validarFecha_Citologia",
          orden: "1",
        },
        () => {
          this.validarCitologia();
        },
        () => {
          this.global_HC002.FECHA_CITO_PREVIA = moment(this.mascaras.fecha_citologia).format("YYYYMMDD");
          console.log(this.global_HC002.FECHA_CITO_PREVIA);
          this.validarResultado_Citologia();
        }
      );
    },
    validarResultado_Citologia() {
      var _this = this;
      POPUP(
        {
          titulo: "Resultado citologia",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.resultados_cito,
          callback_f: () => this.validarFecha_Citologia(),
          seleccion: this.global_HC002.RESUL_CITO_PREVIA,
          teclaAlterna: true,
        },
        (data) => {
          _this.global_HC002.RESUL_CITO_PREVIA = data.COD;
          _this.textos.resultado_citologia = data.COD + ". " + data.DESCRIP;
          _this.validarMamografia();
        }
      );
    },
    validarMamografia() {
      validarInputs(
        {
          form: "#validarFecha_mamografia",
          orden: "1",
        },
        () => {
          this.validarCitologia();
        },
        () => {
          this.global_HC002.FECHA_ULT_MAMO = moment(this.mascaras.fecha_mamografia).format("YYYYMMDD");
          console.log(this.global_HC002.FECHA_ULT_MAMO);
          this.guardarSintomasAper();
        }
      );
    },
    guardarSintomasAper() {
      if (this.historia_clinica.novedad == "7" || this.historia_clinica.cierre.temporal == "1") {
        var _this = this;

        var data = {};
        data["datosh"] =
          datosEnvio() +
          $_REG_HC.llave_hc +
          "|" +
          this.global_HC002.LLAVE_EVO +
          "|" +
          localStorage.Usuario +
          "|" +
          this.historia_clinica.novedad +
          "|" +
          "3" +
          "|";

        var sintomas = this.global_HC002.SINTOM_RESPI;
        sintomas += "|";
        sintomas += this.global_HC002.SINTOM_PIEL;
        sintomas += "|";
        sintomas += this.global_HC002.CONTACTO_LEPRA;
        sintomas += "|";
        sintomas += this.global_HC002.VICTI_MALTRATO;
        sintomas += "|";
        sintomas += this.global_HC002.VICTI_VIOLENCIA;
        sintomas += "|";
        sintomas += this.global_HC002.ENFER_MENTAL;
        sintomas += "|";
        sintomas += this.global_HC002.ENFER_ITS;
        sintomas += "|";
        sintomas += espaciosDer(this.global_HC002.CUAL_ITS, 30);
        sintomas += "|";
        sintomas += this.global_HC002.TRATA_ITS;
        sintomas += "|";
        sintomas += this.global_HC002.CANCER_SENO;
        sintomas += "|";
        sintomas += this.global_HC002.CANCER_CERVIS;
        sintomas += "|";
        sintomas += this.global_HC002.EDU_AUTOEXA_SENO;
        sintomas += "|";
        sintomas += this.global_HC002.CITOLOGIA_PREVIA;
        sintomas += "|";
        sintomas += this.global_HC002.FECHA_CITO_PREVIA;
        sintomas += "|";
        sintomas += this.global_HC002.RESUL_CITO_PREVIA;
        sintomas += "|";
        sintomas += this.global_HC002.FECHA_ULT_MAMO;
        sintomas += "|";

        data["sintomatico"] = sintomas;

        postData(data, get_url("APP/HICLIN/HC002-02.DLL"))
          .then((data) => {
            console.log(data);

            _this.verificarEdad();
          })
          .catch((error) => {
            console.log(error);
            CON851("", "Ha ocurrido un error guardando preguntas sintomatico", null, "error", "Error");
            _this.verificarEdad();
          });
      } else {
        this.verificarEdad();
      }
    },
    verificarEdad() {
      this.flujo_bloques.sintomaticos = true;
      document.getElementById("btnFlujo_sintom").disabled = false;

      var unid_edad = this.historia_clinica.edad.substring(0, 1);
      var edad = parseInt(this.historia_clinica.edad.substring(1, 4));

      if (this.global_HC002.UNSERV == "08") {
        if (unid_edad == "D" || (unid_edad == "M" && edad < 3)) {
          this.global_HC002.SIGNOS_VITALES.UNID_PESO = "2";
          this.unidad_peso = "Gr";
          this.validarPeso();
        } else {
          this.unidad_peso = "Kg";
          this.global_HC002.SIGNOS_VITALES.UNID_PESO = "1";
          this.validarPeso();
        }
      } else {
        this.validarCod_diagnosticos(0);
      }
    },
    validarPeso() {
      validarInputs(
        {
          form: "#validarPeso",
          orden: "1",
        },
        () => {
          this.validarITS();
        },
        () => {
          this.global_HC002.PESO_NEW = this.mascaras.peso.resolve(this.global_HC002.PESO_NEW) || "0";

          let peso = parseFloat(this.global_HC002.PESO_NEW);
          let unidadPeso = parseInt(this.global_HC002.SIGNOS_VITALES.UNID_PESO);

          if ((unidadPeso == 1 && (peso < 2 || peso > 300)) || (unidadPeso == 2 && (peso < 500 || peso > 20000))) {
            CON851("03", "03", null, "warning", "Advertencia");
            this.validarPeso();
          } else this.validarTalla();
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
          this.verificarEdad();
        },
        () => {
          if (parseInt(this.global_HC002.SIGNOS_VITALES.TALLA) > 230) {
            CON851("", "Dato fuera de rango!", null, "error", "Error");
            this.validarTalla();
          } else {
            this.evaluarIndices();
          }
        }
      );
    },
    evaluarIndices() {
      var unid_Edad = this.historia_clinica.edad.substring(0, 1);
      var edad = parseInt(this.historia_clinica.edad.substring(1, 4));
      var imc = parseInt(this.global_HC002.SIGNOS_VITALES.IMC_CORP);
      console.log(edad);
      if (
        (this.global_HC002.UNSERV == "01" || this.global_HC002.UNSERV == "02" || this.global_HC002.UNSERV == "08") &&
        unid_Edad == "A" &&
        edad > 15
      ) {
        if (imc >= 30) CON851("BC", "BC", null, "warning", "Advertencia");
        if (imc >= 25) CON851("BB", "BB", null, "warning", "Advertencia");
        if (imc < 16) CON851("BE", "BE", null, "warning", "Advertencia");
        if (imc <= 17) CON851("BD", "BD", null, "warning", "Advertencia");
      }
      this.validarTemperatura();
    },
    validarTemperatura() {
      validarInputs(
        {
          form: "#validarTemperatura",
          orden: "1",
        },
        () => {
          this.validarTalla();
        },
        () => {
          this.global_HC002.SIGNOS_VITALES.TEMP = this.mascaras.temp.resolve(this.global_HC002.SIGNOS_VITALES.TEMP);

          if (
            parseFloat(this.global_HC002.SIGNOS_VITALES.TEMP) > 0 &&
            (parseFloat(this.global_HC002.SIGNOS_VITALES.TEMP) < 35.5 ||
              parseFloat(this.global_HC002.SIGNOS_VITALES.TEMP) > 38)
          )
            CON851("BM", "BM", null, "warning", "Advertencia");

          if (parseFloat(this.global_HC002.SIGNOS_VITALES.TEMP) > 45) {
            this.validarTemperatura();
          } else {
            this.validar_FC();
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
        () => {
          this.validarTemperatura();
        },
        () => {
          var unidad_edad = this.historia_clinica.edad.substring(0, 1);
          var edad = parseInt(this.historia_clinica.edad.substring(1, 4));
          var fc = parseInt(this.global_HC002.SIGNOS_VITALES.F_CARD);

          if (fc > 0) {
            if (unidad_edad == "D" || (unidad_edad == "M" && edad < 3)) {
              if (fc < 120 || fc > 160) CON851("BK", "BK", null, "warning", "Advertencia");
            } else if (unidad_edad == "M" || (unidad_edad == "A" && edad < 5)) {
              if (fc < 60 || fc > 100) CON851("BK", "BK", null, "warning", "Advertencia");
            } else if (fc < 60 || fc > 90) {
              CON851("BK", "BK", null, "warning", "Advertencia");
            }
          }
          this.validarF_resp();
        }
      );
    },
    validarF_resp() {
      validarInputs(
        {
          form: "#validar_FR",
          orden: "1",
        },
        () => {
          this.validar_FC();
        },
        () => {
          var unidad_edad = this.historia_clinica.edad.substring(0, 1);
          var edad = parseInt(this.historia_clinica.edad.substring(1, 4));
          var fr = parseInt(this.global_HC002.SIGNOS_VITALES.F_RESP);

          if (fr > 0) {
            switch (unidad_edad) {
              case "D":
                if (fr < 30 || fr > 60) CON851("BL", "BL", null, "warning", "Advertencia");
                break;
              case "M":
                if (edad < 3) {
                  if (fr < 30 || fr > 60) CON851("BL", "BL", null, "warning", "Advertencia");
                } else {
                  if (fr < 20 || fr > 50) CON851("BL", "BL", null, "warning", "Advertencia");
                }
                break;
              case "A":
                if (edad < 5) {
                  if (fr < 16 || fr > 40) CON851("BL", "BL", null, "warning", "Advertencia");
                } else {
                  if (fr < 14 || fr > 30) CON851("BL", "BL", null, "warning", "Advertencia");
                }
                break;
            }
          }
          this.validarTensionArterial_1();
        }
      );
    },
    validarTensionArterial_1() {
      validarInputs(
        {
          form: "#validar_TA_1",
          orden: "1",
        },
        () => {
          this.validarF_resp();
        },
        () => {
          if (parseInt(this.global_HC002.TENS_1) > 200) {
            CON851("03", "03", null, "error", "Error");
            this.validarTensionArterial_1();
          } else {
            this.validarTensionArterial_2();
          }
        }
      );
    },
    validarTensionArterial_2() {
      validarInputs(
        {
          form: "#validar_TA_2",
          orden: "1",
        },
        () => {
          this.validarTensionArterial_1();
        },
        () => {
          if (parseInt(this.global_HC002.TENS_2) > 200) {
            CON851("03", "03", null, "error", "Error");
            this.validarTensionArterial_2();
          } else {
            this.validarResp_ocular();
          }
        }
      );
    },
    validarResp_ocular() {
      var _this = this;
      var opc = [
        { COD: "1", DESCRIP: "Ninguna" },
        { COD: "2", DESCRIP: "Al dolor" },
        { COD: "3", DESCRIP: "A ordenes" },
        { COD: "4", DESCRIP: "Expontánea" },
      ];

      setTimeout(() => {
        POPUP(
          {
            titulo: "Apertura ocular",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: opc,
            callback_f: () => this.validarTensionArterial_2(),
            seleccion: this.global_HC002.SIGNOS_VITALES.APER_OCUL,
          },
          (data) => {
            _this.global_HC002.SIGNOS_VITALES.APER_OCUL = data.COD;
            _this.textos.ocular = data.COD + ". " + data.DESCRIP;
            _this.validarRespVerbal();
          }
        );
      }, 300);
    },
    validarRespVerbal() {
      var _this = this;
      var opc = [
        { COD: "1", DESCRIP: "Ninguna" },
        { COD: "2", DESCRIP: "Incomprensible" },
        { COD: "3", DESCRIP: "Inapropiada" },
        { COD: "4", DESCRIP: "Confusa" },
        { COD: "5", DESCRIP: "Orientada" },
      ];

      setTimeout(() => {
        POPUP(
          {
            titulo: "Respuesta verbal",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: opc,
            callback_f: () => this.validarResp_ocular(),
            seleccion: this.global_HC002.SIGNOS_VITALES.RESP_VERB,
          },
          (data) => {
            _this.global_HC002.SIGNOS_VITALES.RESP_VERB = data.COD;
            _this.textos.verbal = data.COD + ". " + data.DESCRIP;
            _this.validarRespMotora();
          }
        );
      }, 300);
    },
    validarRespMotora() {
      var _this = this;
      var opc = [
        { COD: "1", DESCRIP: "Ninguna" },
        { COD: "2", DESCRIP: "Descerebracion" },
        { COD: "3", DESCRIP: "Decorticacion" },
        { COD: "4", DESCRIP: "Retira" },
        { COD: "5", DESCRIP: "Localiza" },
        { COD: "6", DESCRIP: "Obedece orden" },
      ];

      setTimeout(() => {
        POPUP(
          {
            titulo: "Respuesta motora",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: opc,
            callback_f: () => this.validarRespVerbal(),
            seleccion: this.global_HC002.SIGNOS_VITALES.RESP_MOTO,
          },
          (data) => {
            _this.global_HC002.SIGNOS_VITALES.RESP_MOTO = data.COD;
            _this.textos.motora = data.COD + ". " + data.DESCRIP;
            _this.calcularVlrGlasgow();
          }
        );
      }, 300);
    },
    calcularVlrGlasgow(a) {
      var ocular = parseInt(this.global_HC002.SIGNOS_VITALES.APER_OCUL);
      var verbal = parseInt(this.global_HC002.SIGNOS_VITALES.RESP_VERB);
      var motora = parseInt(this.global_HC002.SIGNOS_VITALES.RESP_MOTO);

      this.global_HC002.SIGNOS_VITALES.VLR_GLASG = ocular + verbal + motora;
      this.textos.glasgow = this.global_HC002.SIGNOS_VITALES.VLR_GLASG + "/15";

      if (a != 1) {
        this.validar_PVC();
      }
    },
    validar_PVC() {
      validarInputs(
        {
          form: "#validar_PVC",
          orden: "1",
        },
        () => {
          this.validarRespMotora();
        },
        () => {
          var unidad_edad = this.historia_clinica.edad.substring(0, 1);
          var edad = parseInt(this.historia_clinica.edad.substring(1, 4));

          if (unidad_edad == "A" && edad > 10) {
            this.global_HC002.SIGNOS_VITALES.PER_TORA = this.mascaras.PER_TORA.resolve("000");
            this.global_HC002.SIGNOS_VITALES.PER_ABDO = this.mascaras.PER_TORA.resolve("000");
            this.validar_G_URIN();
          } else {
            this.validar_PERTOR();
          }
        }
      );
    },
    validar_PERTOR() {
      validarInputs(
        {
          form: "#validar_PERTOR",
          orden: "1",
        },
        () => {
          this.validar_PVC();
        },
        () => {
          this.global_HC002.SIGNOS_VITALES.PER_TORA = this.mascaras.PER_TORA.resolve(
            this.global_HC002.SIGNOS_VITALES.PER_TORA
          );
          this.validar_PERABDO();
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
          this.validar_PERTOR();
        },
        () => {
          this.global_HC002.SIGNOS_VITALES.PER_ABDO = this.mascaras.PER_TORA.resolve(
            this.global_HC002.SIGNOS_VITALES.PER_ABDO
          );
          this.validar_G_URIN();
        }
      );
    },
    validar_G_URIN() {
      validarInputs(
        {
          form: "#validar_G_URIN",
          orden: "1",
        },
        () => {
          var unidad_edad = this.historia_clinica.edad.substring(0, 1);
          var edad = parseInt(this.historia_clinica.edad.substring(1, 4));

          if (unidad_edad == "A" && edad > 10) {
            this.validar_PVC();
          } else {
            this.validar_PERABDO();
          }
        },
        () => {
          this.global_HC002.SIGNOS_VITALES.G_URIN = this.mascaras.G_URIN.resolve(
            this.global_HC002.SIGNOS_VITALES.G_URIN
          );
          this.validarOximetria();
        }
      );
    },
    validarOximetria() {
      validarInputs(
        {
          form: "#validarOximetria",
          orden: "1",
        },
        () => {
          this.validar_G_URIN();
        },
        () => {
          this.validarGlucometria();
        }
      );
    },
    validarGlucometria() {
      validarInputs(
        {
          form: "#validarGlucometria",
          orden: "1",
        },
        () => {
          this.validarOximetria();
        },
        () => {
          this.global_HC002.SIGNOS_VITALES.GLUCOMETRIA = parseInt(this.global_HC002.SIGNOS_VITALES.GLUCOMETRIA);
          document.getElementById("btnFlujo_signos").disabled = false;
          this.flujo_bloques.signos_vitales = true;
          this.guardarSignosVitalesAper();
        }
      );
    },
    guardarSignosVitalesAper() {
      if (this.historia_clinica.novedad == "7" || this.historia_clinica.cierre.temporal == "1") {
        var _this = this;

        var data = {};
        data["datosh"] =
          datosEnvio() +
          $_REG_HC.llave_hc +
          "|" +
          this.global_HC002.LLAVE_EVO +
          "|" +
          localStorage.Usuario +
          "|" +
          this.historia_clinica.novedad +
          "|" +
          "4" +
          "|";

        var signos = this.global_HC002.SIGNOS_VITALES.UNID_PESO;
        signos += "|";
        signos += this.global_HC002.PESO_NEW;
        signos += "|";
        signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.TALLA, 3);
        signos += "|";
        signos += this.global_HC002.SIGNOS_VITALES.IMC_CORP;
        signos += "|";
        signos += this.global_HC002.SIGNOS_VITALES.SUP_CORP;
        signos += "|";
        signos += this.global_HC002.SIGNOS_VITALES.TEMP;
        signos += "|";
        signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.F_CARD, 3);
        signos += "|";
        signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.F_RESP, 3);
        signos += "|";
        signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.TENS_1, 3);
        signos += "|";
        signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.TENS_2, 3);
        signos += "|";
        signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.TENS_MEDIA, 3);
        signos += "|";
        signos += this.global_HC002.SIGNOS_VITALES.APER_OCUL;
        signos += "|";
        signos += this.global_HC002.SIGNOS_VITALES.RESP_VERB;
        signos += "|";
        signos += this.global_HC002.SIGNOS_VITALES.RESP_MOTO;
        signos += "|";
        signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.VLR_GLASG, 2);
        signos += "|";
        signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.PVC, 2);
        signos += "|";
        signos += this.global_HC002.SIGNOS_VITALES.PER_TORA;
        signos += "|";
        signos += this.global_HC002.SIGNOS_VITALES.PER_ABDO;
        signos += "|";
        signos += this.global_HC002.SIGNOS_VITALES.G_URIN;
        signos += "|";
        signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.OXIMETRIA, 3);
        signos += "|";
        signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.GLUCOMETRIA, 3);
        signos += "|";

        data["signos_vitales"] = signos;

        postData(data, get_url("APP/HICLIN/HC002-02.DLL"))
          .then((data) => {
            console.log(data);

            _this.validarCod_diagnosticos(0);
          })
          .catch((error) => {
            console.log(error);
            CON851("", "Ha ocurrido un error guardando signos vitales", null, "error", "Error");
            _this.validarCod_diagnosticos(0);
          });
      } else {
        this.validarCod_diagnosticos(0);
      }
    },
    // ventanaCod_diag(num) {
    //   var _this = this;
    //   var filtrados = [];
    //   var excepciones = ["I10X", "I151", "I158", "I159", "O16X", "E782", "E784", "E785", "E119"];
    //   var titulo_ventana = "";

    //   var copia = JSON.parse(JSON.stringify(this.global_HC002.TABLA_DIAGNOSTICOS));

    //   var filtro = (param) => {
    //     return excepciones.find((x) => x == param.toUpperCase().trim());
    //   };

    //   if (num == "1" && this.global_HC002.UNSERV == "08") {
    //     titulo_ventana = "Ventana enfermedades filtrados por PYP";
    //     filtrados = this.enfermedades.filter((x) => filtro(x.COD_ENF) || x.COD_ENF.trim().substring(0, 1) == "Z");
    //   } else {
    //     titulo_ventana = "Ventana enfermedades";
    //     filtrados = JSON.parse(JSON.stringify(this.enfermedades));
    //   }

    //   var nombre_input = "cod_diag_" + num;

    //   _ventanaDatos({
    //     titulo: titulo_ventana,
    //     columnas: ["COD_ENF", "NOMBRE_ENF"],
    //     data: filtrados,
    //     ancho: "70%",
    //     callback_esc: () => {
    //       document.getElementById(nombre_input).focus();
    //     },
    //     callback: (data) => {
    //       var pos = parseInt(num) - 1;
    //       copia[pos] = data.COD_ENF.trim();
    //       _this.global_HC002.TABLA_DIAGNOSTICOS = [];
    //       _this.global_HC002.TABLA_DIAGNOSTICOS = copia;
    //       setTimeout(() => _enterInput("#" + nombre_input), 100);
    //     },
    //   });
    // },
    escVentanaEnfermedades() {
      this.mostrarEnfermedades = false;
      this.validarCod_diagnosticos(this.inputEnfer.pos);
      this.inputEnfer = {
        nombre: "",
        tipo: 0,
        pos: 0,
      };
    },
    ventanaCod_diag(pos) {
      this.inputEnfer.pos = pos;
      this.inputEnfer.nombre = "#cod_diag_" + pos;
      console.log(this.inputEnfer.nombre);
      _fin_validar_form();

      this.mostrarEnfermedades = true;
    },
    successVentanaEnfermedades(data) {
      this.mostrarEnfermedades = false;
      this.global_HC002.TABLA_DIAGNOSTICOS[this.inputEnfer.pos] = data.cod;
      this.validarCod_diagnosticos(this.inputEnfer.pos);
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
          form: "#validarCod_diag_" + pos + "_HC002",
          orden: "1",
          event_f3: () => {
            if (pos == 0 && this.global_HC002.TABLA_DIAGNOSTICOS[0].trim() == "") {
              CON851("02", "02", null, "error", "Error");
              this.validarCod_diagnosticos(pos);
            } else this.consultarCodigoEnf(pos, true);
          },
        },
        () => {
          if (pos == 0) {
            if (this.global_HC002.UNSERV == "08") {
              this.validarGlucometria();
            } else {
              this.validarITS();
            }
          } else this.validarCod_diagnosticos(pos - 1);
        },
        () => {
          if (this.global_HC002.TABLA_DIAGNOSTICOS[pos].trim() == "") {
            if (pos == 0) {
              CON851("02", "02", null, "error", "Error");
              this.validarCod_diagnosticos(pos);
            } else {
              this.textos.descrip_diagnosticos[pos] = "";
              this.finalizarDiagnosticoDigitado();
            }
          } else this.consultarCodigoEnf(pos);
        }
      );
    },
    consultarCodigoEnf(pos, f3 = false) {
      var _this = this;
      this.$nextTick(function () {
        Vue.set(
          _this.global_HC002.TABLA_DIAGNOSTICOS,
          pos,
          _this.global_HC002.TABLA_DIAGNOSTICOS[pos].toUpperCase().trim()
        );
      });

      loader("show");
      var _this = this;
      var data = {
        datosh: datosEnvio(),
        codigo: this.global_HC002.TABLA_DIAGNOSTICOS[pos].toUpperCase().trim(),
        paso: "1",
      };

      postData(data, get_url("APP/SALUD/SER851.DLL"))
        .then(function (data) {
          loader("hide");
          console.log(data);

          if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == "")
            _this.errorCodigoEnfermedad(pos);
          else _this.successCodigoEnfermedad(pos, data, f3);
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          _this.errorCodigoEnfermedad(pos);
        });
    },
    errorCodigoEnfermedad(pos) {
      let _this = this;
      CON851("", "Enfermedad no encontrada!", null, "error", "Error");
      this.$nextTick(function () {
        Vue.set(_this.textos.descrip_diagnosticos, pos, "ENFERMEDAD NO ENCONTRADA !!");
      });
      this.validarCod_diagnosticos(pos);
    },
    successCodigoEnfermedad(pos, enf, f3) {
      let _this = this;
      this.$nextTick(function () {
        Vue.set(_this.textos.descrip_diagnosticos, pos, enf.NOMBRE_ENF.replace(/\s\s+/g, " "));
      });
      // this.textos.descrip_diagnosticos[pos] = enf.NOMBRE_ENF.replace(/\s\s+/g, " ");

      var unidEdad_paci = "0";
      switch (this.historia_clinica.edad.substring(0, 1)) {
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

      var edad_paci = unidEdad_paci + cerosIzq(this.historia_clinica.edad.substring(1, 4), 3);

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

      var edadEnf_min = unidEdad_enf + cerosIzq(enf.EDAD_MIN_ENF.trim(), 3);
      var edadEnf_max = unidEdad_enf + cerosIzq(enf.EDAD_MAX_ENF.trim(), 3);

      var error = false;

      if (enf.HUERFA_ENF.toUpperCase() == "S") CON851("G3", "G3", null, "error", "Error");

      if (pos == 0) {
        switch (this.global_HC002.UNSERV) {
          case "08":
            var validos = ["I10X", "I151", "I158", "I159", "O16X", "E782", "E784", "E785", "E119"];

            var busqueda_validos = validos.find((x) => x == this.global_HC002.TABLA_DIAGNOSTICOS[pos]);
            console.log(busqueda_validos, this.global_HC002.TABLA_DIAGNOSTICOS[pos].substring(0, 1));

            if (!busqueda_validos && this.global_HC002.TABLA_DIAGNOSTICOS[pos].substring(0, 1) != "Z") {
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

            var busqueda_exclu = excluidos.find((x) => x == this.global_HC002.TABLA_DIAGNOSTICOS[pos]);

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
      } else if (parseInt(enf.EDAD_MIN_ENF) > 0 && parseInt(edad_paci) < parseInt(edadEnf_min)) {
        CON851("74", "74", null, "error", "Error");
        error = true;
      } else if (parseInt(enf.EDAD_MAX_ENF) > 0 && parseInt(edad_paci) > parseInt(edadEnf_max)) {
        CON851("74", "74", null, "error", "Error");
        error = true;
      }

      if (error) {
        this.validarCod_diagnosticos(pos);
      } else {
        if (pos == 9 || f3) this.finalizarDiagnosticoDigitado();
        else this.validarCod_diagnosticos(pos + 1);
      }
    },
    finalizarDiagnosticoDigitado() {
      this.global_HC002.TABLA_DIAGNOSTICOS = this.global_HC002.TABLA_DIAGNOSTICOS.filter((el) => el.trim());
      while (this.global_HC002.TABLA_DIAGNOSTICOS.length < 10) {
        this.global_HC002.TABLA_DIAGNOSTICOS.push("");
      }

      this.textos.descrip_diagnosticos = this.textos.descrip_diagnosticos.filter((el) => el.trim());
      while (this.textos.descrip_diagnosticos.length < 10) {
        this.textos.descrip_diagnosticos.push("");
      }

      this.flujo_bloques.codificacion_diagnosticos = true;
      document.getElementById("btnFlujo_diagnosticos").disabled = false;
      this.guardarTablaDiagnosticosAper();
    },
    guardarTablaDiagnosticosAper() {
      if (this.historia_clinica.novedad == "7" || this.historia_clinica.cierre.temporal == "1") {
        var _this = this;

        var data = {};
        data["datosh"] =
          datosEnvio() +
          $_REG_HC.llave_hc +
          "|" +
          this.global_HC002.LLAVE_EVO +
          "|" +
          localStorage.Usuario +
          "|" +
          this.historia_clinica.novedad +
          "|" +
          "5" +
          "|";

        data["TAB_DIAG"] = "";

        this.global_HC002.TABLA_DIAGNOSTICOS.forEach((item) => {
          data.TAB_DIAG += item;
          data.TAB_DIAG += "|";
        });

        postData(data, get_url("APP/HICLIN/HC002-02.DLL"))
          .then((data) => {
            console.log(data);

            _this.validarAnalisis();
          })
          .catch((error) => {
            console.log(error);
            CON851("", "Ha ocurrido un error guardando diagnosticos", null, "error", "Error");
            _this.validarCod_diagnosticos(0);
          });
      } else {
        this.validarAnalisis();
      }
    },
    validarAnalisis() {
      validarInputs(
        {
          form: "#validar_Analisis",
          orden: "1",
        },
        () => {
          this.validarCod_diagnosticos(0);
        },
        () => {
          this.DETALLE_EVO.ANALISIS = this.DETALLE_EVO.ANALISIS.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");

          this.validarPlan();
        }
      );
    },
    validarPlan() {
      validarInputs(
        {
          form: "#validar_PLAN",
          orden: "1",
        },
        () => {
          this.validarAnalisis();
        },
        () => {
          this.DETALLE_EVO.PLAN = this.DETALLE_EVO.PLAN.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");

          this.flujo_bloques.analisis = true;
          document.getElementById("btnFlujo_analisis").disabled = false;
          this.guardarAnalisisAper();
        }
      );
    },
    guardarAnalisisAper() {
      if (this.historia_clinica.novedad == "7" || this.historia_clinica.cierre.temporal == "1") {
        var _this = this;

        var data = {};
        data["datosh"] =
          datosEnvio() +
          $_REG_HC.llave_hc +
          "|" +
          this.global_HC002.LLAVE_EVO +
          "|" +
          localStorage.Usuario +
          "|" +
          this.historia_clinica.novedad +
          "|" +
          "6" +
          "|";

        var ANALISIS_ENVIO = this.DETALLE_EVO.ANALISIS.enterReplace().strToTable("DETALLE_ANA");
        for (indice in ANALISIS_ENVIO) data[indice] = ANALISIS_ENVIO[indice];

        var PLAN_ENVIO = this.DETALLE_EVO.PLAN.enterReplace().strToTable("DETALLE_PLAN");
        for (indice in PLAN_ENVIO) data[indice] = PLAN_ENVIO[indice];

        console.log(data);

        postData(data, get_url("APP/HICLIN/HC002-02.DLL"))
          .then((data) => {
            console.log(data);

            _this.ValidarRips();
          })
          .catch((error) => {
            console.log(error);
            CON851("", "Ha ocurrido un error guardando analisis", null, "error", "Error");
            _this.validarAnalisis();
          });
      } else {
        this.ValidarRips();
      }
    },
    ValidarRips() {
      if (this.historia_clinica.novedad == "7") {
        this.global_HC002.RIPS.ATIENDE = $_REG_PROF.ATIENDE_PROF;
        this.global_HC002.RIPS.CAUSA = this.historia_clinica.rips.causa;
        this.evaluarEstadoEmbarazo();
      } else if (this.historia_clinica.novedad == "8") {
        switch (this.global_HC002.UNSERV) {
          case "01":
          case "02":
          case "08":
            this.evaluarEstadoEmbarazo();
            break;
          default:
            this.global_HC002.RIPS.ATIENDE = $_REG_PROF.ATIENDE_PROF;
            this.global_HC002.RIPS.CAUSA = this.historia_clinica.rips.causa;
            this.confirmarGuardado(1);
            break;
        }
      }
    },
    evaluarEstadoEmbarazo() {
      var _this = this;

      var unid_edad = this.historia_clinica.edad.substring(0, 1);
      var edad = parseInt(this.historia_clinica.edad.substring(1, 4));

      document.getElementById("tarjeta_rips_foco").classList.add("active-text-area");
      $(".active-text-area").get(0).scrollIntoView(true);

      if (
        this.datos_paciente.SEXO == "M" ||
        unid_edad == "D" ||
        unid_edad == "M" ||
        (unid_edad == "A" && parseInt(edad) < 11)
      ) {
        this.global_HC002.RIPS.EMBAR = "9";
        this.textos.estado_gravidez = "9. NO APLICA";
        this.capturarCausa();
      } else {
        setTimeout(() => {
          POPUP(
            {
              titulo: "Condición usuaria",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.condicion_embarazo,
              callback_f: () => this.validarAnalisis(),
              seleccion: this.global_HC002.RIPS.EMBAR,
              teclaAlterna: true,
            },
            (data) => {
              _this.global_HC002.RIPS.EMBAR = data.COD;
              _this.textos.estado_gravidez = data.COD + ". " + data.DESCRIP;
              _this.capturarCausa();
            }
          );
        }, 300);
      }
    },
    capturarCausa() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Causa externa",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.causas_externas,
            callback_f: () => {
              if (this.datos_paciente.SEXO == "M") {
                this.validarAnalisis();
              } else {
                this.evaluarEstadoEmbarazo();
              }
            },
            seleccion: this.global_HC002.RIPS.CAUSA,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_HC002.RIPS.CAUSA = data.COD;
            _this.textos.causa_externa = data.COD + ". " + data.DESCRIP;

            switch (this.global_HC002.TABLA_DIAGNOSTICOS[0]) {
              case "T781":
              case "T782":
              case "T783":
              case "T784":
              case "T788":
              case "T789":
              case "T803":
                _this.capturarTipoDiagnostico();
                break;
              default:
                var primer_carac = this.global_HC002.TABLA_DIAGNOSTICOS[0].substring(0, 1);
                var dos_carac = this.global_HC002.TABLA_DIAGNOSTICOS[0].substring(0, 2);

                if (
                  (_this.global_HC002.RIPS.CAUSA == "13" || _this.global_HC002.RIPS.CAUSA == "15") &&
                  (primer_carac == "S" || primer_carac == "T")
                ) {
                  if (dos_carac == "T1") {
                    _this.capturarTipoDiagnostico();
                  } else {
                    CON851("7E", "7E", null, "error", "Error");
                    _this.capturarCausa();
                  }
                } else {
                  _this.capturarTipoDiagnostico();
                }
                break;
            }
          }
        );
      }, 300);
    },
    capturarTipoDiagnostico() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Tipo de diagnóstico",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.tipos_diagnostico,
            callback_f: () => this.capturarCausa(),
            seleccion: this.global_HC002.TIPO_DIAG,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_HC002.TIPO_DIAG = data.COD;
            _this.textos.tipo_diagnostico = data.COD + ". " + data.DESCRIP;

            var busqueda = false;
            for (var i in _this.global_HC002.TABLA_DIAGNOSTICOS) {
              switch (_this.global_HC002.TABLA_DIAGNOSTICOS[i]) {
                case "K359":
                case "K350":
                case "K351":
                case "K37X":
                  busqueda = true;
                  break;
              }
            }

            if (busqueda && _this.global_HC002.TIPO_DIAG == "2") CON851("EF", "EF", null, "error", "Error");
            _this.evaluar_finalidad_consulta("adelante");
          }
        );
      }, 300);
    },
    evaluar_finalidad_consulta(flujo) {
      var _this = this;

      if (this.global_HC002.UNSERV == "08") {
        var datos = {
          EDAD: _this.historia_clinica.edad,
          SEXOPACI: this.datos_paciente.SEXO,
          seleccion: this.global_HC002.RIPS.FINALID,
        };
        // var datos = { EDAD: 'A028', SEXOPACI: this.datos_paciente.SEXO, seleccion: this.global_HC002.RIPS.FINALID }
        console.log(datos);

        setTimeout(() => {
          SER834A(datos, this.capturarCausa, (data) => {
            _this.global_HC002.RIPS.FINALID = data.COD;
            _this.textos.finalidad_consulta = data.COD + ". " + data.DESCRIP;
            _this.evaluar1raVez();
          });
        }, 300);
      } else {
        if (flujo == "adelante") {
          this.global_HC002.RIPS.FINALID = "10";
          this.textos.finalidad_consulta = "10. NO APLICA";
          this.evaluar1raVez();
        } else if (flujo == "atras") {
          _this.capturarTipoDiagnostico();
        }
      }
    },
    evaluar1raVez() {
      if (this.global_HC002.RIPS.FINALID == "00" || this.global_HC002.RIPS.FINALID == "10") {
        this.global_HC002.PRIMERA_VEZ == "";
        this.estadoSalida();
      } else {
        validarInputs(
          {
            form: "#validarPrimeraVez",
            orden: "1",
          },
          () => {
            this.evaluar_finalidad_consulta("atras");
          },
          () => {
            this.global_HC002.PRIMERA_VEZ = this.global_HC002.PRIMERA_VEZ.toUpperCase().trim() != "S" ? "N" : "S";

            this.determinaFlujoFinalidad();
          }
        );
      }
    },
    determinaFlujoFinalidad() {
      switch (this.global_HC002.RIPS.FINALID) {
        case "03":
          this.datoPlanFamiliar();
          break;
        case "05":
          this.datoTannerPubico();
          break;
        case "06":
          this.evaluarNroControl();
          break;
        case "11":
          this.validarDatoCronico();
          break;
        default:
          this.estadoSalida();
          break;
      }
    },
    evaluarNroControl() {
      if (this.global_HC002.PRIMERA_VEZ == "S") {
        this.global_HC002.EMBAR.NRO_CONTR = "1";
        this.estadoSalida();
      } else {
        validarInputs(
          {
            form: "#validarNroControles",
            orden: "1",
          },
          () => {
            this.evaluar1raVez();
          },
          () => {
            if (parseInt(this.global_HC002.EMBAR.NRO_CONTR) > 25) {
              CON851("", "Limite máximo 25!", null, "error", "Error");
              this.evaluarNroControl();
            } else if (parseInt(this.global_HC002.EMBAR.NRO_CONTR) < 2) {
              CON851("", "No es primera vez!", null, "error", "Error");
              this.evaluarNroControl();
            } else {
              this.estadoSalida();
            }
          }
        );
      }
    },
    datoPlanFamiliar() {
      var _this = this;
      var unid_edad = this.historia_clinica.edad.substring(0, 1);
      var edad = parseInt(this.historia_clinica.edad.substring(1, 4));

      if (unid_edad == "A" && edad > 10 && edad < 60) {
        setTimeout(() => {
          POPUP(
            {
              titulo: "Método de planificación",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.metodos_planificacion,
              callback_f: () => this.evaluar1raVez(),
              seleccion: this.global_HC002.TIPO_DIAG,
              teclaAlterna: true,
            },
            (data) => {
              _this.global_HC002.EMBAR.PLANIFIC = data.COD;
              _this.textos.metodo_planificacion = data.COD + ". " + data.DESCRIP;

              if (_this.datos_paciente.SEXO == "M") {
                switch (_this.global_HC002.EMBAR.PLANIFIC) {
                  case "3":
                  case "4":
                  case "5":
                  case "G":
                  case "H":
                  case "I":
                  case "J":
                  case "K":
                  case "L":
                    CON851("73", "73", null, "error", "Error");
                    _this.estadoSalida();
                    break;
                  default:
                    _this.estadoSalida();
                    break;
                }
              } else {
                _this.estadoSalida();
              }
            }
          );
        }, 300);
      } else {
        this.global_HC002.EMBAR.PLANIFIC = " ";
        this.estadoSalida();
      }
    },
    ventanaPatologias() {
      var _this = this;

      _ventanaDatos({
        titulo: "Ventana patologías crónicas",
        columnas: ["COD", "DESCRIP"],
        data: this.patologias_cronicas,
        ancho: "60%",
        callback_esc: () => {
          document.getElementById("codPatologia_hc002").focus();
        },
        callback: (data) => {
          _this.global_HC002.CRONICO = data.COD;
          setTimeout(() => _enterInput("#codPatologia_hc002"), 100);
        },
      });
    },
    validarDatoCronico() {
      validarInputs(
        {
          form: "#validarPatologiaCronica",
          orden: "1",
        },
        () => {
          this.evaluar1raVez();
        },
        () => {
          this.textos.descrip_pato_cronica = "";

          if (this.global_HC002.CRONICO.trim() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarDatoCronico();
          } else {
            this.global_HC002.CRONICO = cerosIzq(this.global_HC002.CRONICO, 3);

            var busqueda = this.patologias_cronicas.find((x) => x.COD == this.global_HC002.CRONICO);

            if (busqueda) {
              this.textos.descrip_pato_cronica = busqueda.DESCRIP.trim();
              this.estadoSalida();
            } else {
              CON851("01", "01", null, "error", "Error");
              this.validarDatoCronico();
            }
          }
        }
      );
    },
    datoTannerPubico() {
      validarInputs(
        {
          form: "#validarVelloPubico",
          orden: "1",
        },
        () => {
          this.evaluar1raVez();
        },
        () => {
          switch (this.global_HC002.SIGNOS_VITALES.TANNER_PUBICO) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
              this.datoTannerGenital();
              break;
            default:
              CON851("", "Dato fuera de rango!", null, "error", "Error");
              this.datoTannerPubico();
              break;
          }
        }
      );
    },
    datoTannerGenital() {
      validarInputs(
        {
          form: "#validarGenitales",
          orden: "1",
        },
        () => {
          this.datoTannerPubico();
        },
        () => {
          switch (this.global_HC002.SIGNOS_VITALES.TANNER_GENIT) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
              this.estadoSalida();
              break;
            default:
              CON851("", "Dato fuera de rango!", null, "error", "Error");
              this.datoTannerGenital();
              break;
          }
        }
      );
    },
    estadoSalida() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Estado salida",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.estadoSalidaRips,
            callback_f: () => {
              switch (this.global_HC002.RIPS.FINALID) {
                case "03":
                  this.datoPlanFamiliar();
                  break;
                case "05":
                  this.datoTannerGenital();
                  break;
                case "06":
                  this.evaluar1raVez();
                  break;
                case "11":
                  this.validarDatoCronico();
                  break;
                default:
                  this.capturarTipoDiagnostico();
                  break;
              }
            },
            seleccion: this.global_HC002.RIPS.ESTADO_SAL,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_HC002.RIPS.ESTADO_SAL = data.COD;
            _this.textos.estado_salida_rips = data.COD + ". " + data.DESCRIP;

            switch (_this.global_HC002.RIPS.ESTADO_SAL) {
              case "2":
                _this.validarDiagnos_muerte_rips();
                break;
              case "3":
                _this.validarRemitido_rips();
                break;
              default:
                _this.confirmarGuardado(2);
                break;
            }
          }
        );
      }, 300);
    },
    ventanaDiagnos_rips() {
      var _this = this;

      _ventanaDatos({
        titulo: "Ventana de enfermedades",
        columnas: ["COD_ENF", "NOMBRE_ENF"],
        data: this.enfermedades,
        ancho: "70%",
        callback_esc: () => {
          document.getElementById("diagnosMuerte_hc002").focus();
        },
        callback: (data) => {
          _this.global_HC002.RIPS.DIAG_MUER = data.COD_ENF;
          setTimeout(() => _enterInput("#diagnosMuerte_hc002"), 100);
        },
      });
    },
    validarDiagnos_muerte_rips() {
      validarInputs(
        {
          form: "#validarDiagMuerte",
          orden: "1",
        },
        () => {
          this.estadoSalida();
        },
        () => {
          this.global_HC002.RIPS.DIAG_MUER = this.global_HC002.RIPS.DIAG_MUER.toUpperCase().trim();

          var busqueda = this.enfermedades.find(
            (x) => x.COD_ENF.trim() == cerosIzq(this.global_HC002.RIPS.DIAG_MUER, 4)
          );

          if (busqueda) {
            this.textos.descrip_tipo_diag_rips = busqueda.NOMBRE_ENF.trim();

            if (busqueda.SEXO_ENF.trim() != "" && busqueda.SEXO_ENF != this.datos_paciente.SEXO) {
              CON851("73", "73", null, "error", "Error");
              this.validarDiagnos_muerte_rips();
            } else {
              this.confirmarGuardado(3);
            }
          } else {
            CON851("01", "01", null, "error", "Error");
            this.validarDiagnos_muerte_rips();
          }
        }
      );
    },
    validarRemitido_rips() {
      validarInputs(
        {
          form: "#validarRemitido",
          orden: "1",
        },
        () => {
          this.estadoSalida();
        },
        () => {
          this.confirmarGuardado(4);
        }
      );
    },
    confirmarGuardado(flujo) {
      var _this = this;

      setTimeout(() => {
        CON851P(
          "01",
          () => {
            switch (flujo) {
              case 1:
                _this.validarAnalisis();
                break;
              case 2:
                _this.estadoSalida();
                break;
              case 3:
                _this.validarDiagnos_muerte_rips();
                break;
              case 4:
                _this.validarRemitido_rips();
                break;
            }
          },
          _this.guardarRegistro_completo
        );
      }, 300);
    },
    guardarRegistro_completo() {
      var _this = this;

      var data = {};
      data["datosh"] =
        datosEnvio() +
        $_REG_HC.llave_hc +
        "|" +
        this.global_HC002.LLAVE_EVO +
        "|" +
        localStorage.Usuario +
        "|" +
        this.historia_clinica.novedad +
        "|" +
        "7" +
        "|";

      data["procedencia"] = this.historia_clinica.proceden;
      data["motivo_consulta"] = this.historia_clinica.motivo.replace(/(\r\n|\n|\r)/gm, "&");
      data["antecedentes_toxico"] = this.DETALLE_HC.ANTECEDENTES_TOXICO.replace(/(\r\n|\n|\r)/gm, "&");

      data["UNID_SERV"] = this.global_HC002.UNSERV;

      data["edad"] = this.historia_clinica.edad;

      data["MACRO"] =
        this.global_HC002.MACRO.CLASE +
        "|" +
        this.global_HC002.MACRO.CODIGO.trim() +
        "|" +
        this.global_HC002.MACRO.VIA +
        "|";

      var detalle_Evol_content = JSON.parse(JSON.stringify(this.DETALLE_EVO.CONTENIDO.replace(/(\r\n|\n|\r)/gm, "&")));

      var posicion = 0;
      var contadorLin = 0;
      var contadorTotal = 0;
      var linea = "";
      var maximo = 90;

      detalle_Evol_content.split("").forEach((item, i) => {
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

        if (contadorLin == maximo || detalle_Evol_content.length == contadorTotal) {
          posicion = posicion + 1;

          data["DETALLE_CON-" + posicion.toString().padStart(3, "0")] = linea;
          contadorLin = 0;
          linea = "";
          maximo = 90;
        }
      });

      data["TAB_CUPS"] = "";

      this.global_HC002.TABLA_CUPS.forEach((item) => {
        data.TAB_CUPS += item;
        data.TAB_CUPS += "|";
      });

      var proce = this.global_HC002.PROCEDIMIENTOS.TIPO_ANES;
      proce += "|";
      proce += cerosIzq(this.global_HC002.PROCEDIMIENTOS.TIEMPO_PROC, 3);
      proce += "|";
      proce += cerosIzq(this.global_HC002.PROCEDIMIENTOS.TIEMPO_SALA, 3);
      proce += "|";
      proce += this.global_HC002.PROCEDIMIENTOS.SALA_CIRU;
      proce += "|";
      proce += this.global_HC002.PROCEDIMIENTOS.PROC_PROGRAMADO;
      proce += "|";
      proce += this.global_HC002.PROCEDIMIENTOS.PROC_AMBULA;
      proce += "|";
      proce += this.global_HC002.PROCEDIMIENTOS.EVEN_ADVERSO;
      proce += "|";
      proce += this.global_HC002.PROCEDIMIENTOS.TIPO_CIRUGIA;
      proce += "|";
      proce += this.global_HC002.RIPS.ESTADO_SAL;
      proce += "|";
      proce += this.solicitud_patologia;
      proce += "|";
      proce += this.global_HC002.PATOLOGIA.PIEZA_QUIR.replace(/(\r\n|\n|\r)/gm, "&");
      proce += "|";
      proce += this.global_HC002.PATOLOGIA.DATOS_CLINICOS.replace(/(\r\n|\n|\r)/gm, "&");
      proce += "|";

      data["procedimientos"] = proce;

      var preguntas_covid = this.global_HC002.COVID.FIEBRE;
      preguntas_covid += "|";
      preguntas_covid += this.global_HC002.COVID.TOS;
      preguntas_covid += "|";
      preguntas_covid += this.global_HC002.COVID.DISNEA;
      preguntas_covid += "|";
      preguntas_covid += this.global_HC002.COVID.MALESTAR;
      preguntas_covid += "|";
      preguntas_covid += this.global_HC002.COVID.RINORREA;
      preguntas_covid += "|";
      preguntas_covid += this.global_HC002.COVID.ODINOFAGIA;
      preguntas_covid += "|";
      preguntas_covid += this.global_HC002.COVID.VIAJE;
      preguntas_covid += "|";
      preguntas_covid += this.global_HC002.COVID.CONTACTO;
      preguntas_covid += "|";
      preguntas_covid += this.global_HC002.COVID.PERSONAL_SALUD;
      preguntas_covid += "|";
      preguntas_covid += this.global_HC002.COVID.VIAJE_DENTRO;
      preguntas_covid += "|";
      preguntas_covid += this.global_HC002.COVID.LUGAR_VIAJE_DENTRO;
      preguntas_covid += "|";
      preguntas_covid += this.global_HC002.COVID.TIEMPO_VIAJE_DENTRO;
      preguntas_covid += "|";
      preguntas_covid += this.global_HC002.COVID.VIAJE_FUERA;
      preguntas_covid += "|";
      preguntas_covid += this.global_HC002.COVID.LUGAR_VIAJE_FUERA;
      preguntas_covid += "|";
      preguntas_covid += this.global_HC002.COVID.TIEMPO_VIAJE_FUERA;
      preguntas_covid += "|";

      data["covid"] = preguntas_covid;

      var sintomas = this.global_HC002.SINTOM_RESPI;
      sintomas += "|";
      sintomas += this.global_HC002.SINTOM_PIEL;
      sintomas += "|";
      sintomas += this.global_HC002.CONTACTO_LEPRA;
      sintomas += "|";
      sintomas += this.global_HC002.VICTI_MALTRATO;
      sintomas += "|";
      sintomas += this.global_HC002.VICTI_VIOLENCIA;
      sintomas += "|";
      sintomas += this.global_HC002.ENFER_MENTAL;
      sintomas += "|";
      sintomas += this.global_HC002.ENFER_ITS;
      sintomas += "|";
      sintomas += espaciosDer(this.global_HC002.CUAL_ITS, 30);
      sintomas += "|";
      sintomas += this.global_HC002.TRATA_ITS;
      sintomas += "|";
      sintomas += this.global_HC002.CANCER_SENO;
      sintomas += "|";
      sintomas += this.global_HC002.CANCER_CERVIS;
      sintomas += "|";
      sintomas += this.global_HC002.EDU_AUTOEXA_SENO;
      sintomas += "|";
      sintomas += this.global_HC002.CITOLOGIA_PREVIA;
      sintomas += "|";
      sintomas += this.global_HC002.FECHA_CITO_PREVIA;
      sintomas += "|";
      sintomas += this.global_HC002.RESUL_CITO_PREVIA;
      sintomas += "|";
      sintomas += this.global_HC002.FECHA_ULT_MAMO;
      sintomas += "|";

      data["sintomatico"] = sintomas;

      var signos = this.global_HC002.SIGNOS_VITALES.UNID_PESO;
      signos += "|";
      signos += this.global_HC002.PESO_NEW;
      signos += "|";
      signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.TALLA, 3);
      signos += "|";
      signos += this.global_HC002.SIGNOS_VITALES.IMC_CORP;
      signos += "|";
      signos += this.global_HC002.SIGNOS_VITALES.SUP_CORP;
      signos += "|";
      signos += this.global_HC002.SIGNOS_VITALES.TEMP;
      signos += "|";
      signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.F_CARD, 3);
      signos += "|";
      signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.F_RESP, 3);
      signos += "|";
      signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.TENS_1, 3);
      signos += "|";
      signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.TENS_2, 3);
      signos += "|";
      signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.TENS_MEDIA, 3);
      signos += "|";
      signos += this.global_HC002.SIGNOS_VITALES.APER_OCUL;
      signos += "|";
      signos += this.global_HC002.SIGNOS_VITALES.RESP_VERB;
      signos += "|";
      signos += this.global_HC002.SIGNOS_VITALES.RESP_MOTO;
      signos += "|";
      signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.VLR_GLASG, 2);
      signos += "|";
      signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.PVC, 2);
      signos += "|";
      signos += this.global_HC002.SIGNOS_VITALES.PER_TORA;
      signos += "|";
      signos += this.global_HC002.SIGNOS_VITALES.PER_ABDO;
      signos += "|";
      signos += this.global_HC002.SIGNOS_VITALES.G_URIN;
      signos += "|";
      signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.OXIMETRIA, 3);
      signos += "|";
      signos += cerosIzq(this.global_HC002.SIGNOS_VITALES.GLUCOMETRIA, 3);
      signos += "|";

      data["signos_vitales"] = signos;

      data["TAB_DIAG"] = "";

      this.global_HC002.TABLA_DIAGNOSTICOS.forEach((item) => {
        data.TAB_DIAG += item;
        data.TAB_DIAG += "|";
      });

      var ANALISIS_ENVIO = this.DETALLE_EVO.ANALISIS.enterReplace().strToTable("DETALLE_ANA");
      for (indice in ANALISIS_ENVIO) data[indice] = ANALISIS_ENVIO[indice];

      var PLAN_ENVIO = this.DETALLE_EVO.PLAN.enterReplace().strToTable("DETALLE_PLAN");
      for (indice in PLAN_ENVIO) data[indice] = PLAN_ENVIO[indice];

      data["medico"] = localStorage.IDUSU;

      data["atiende_evo"] = this.global_HC002.RIPS.ATIENDE;
      data["causa_rips"] = this.global_HC002.RIPS.CAUSA;

      data["embarazo_rips"] = this.global_HC002.RIPS.EMBAR;

      data["tipo_diag_rips"] = this.global_HC002.TIPO_DIAG;
      data["finalidad_rips"] = this.global_HC002.RIPS.FINALID;
      data["primera_vez_rips"] = this.global_HC002.PRIMERA_VEZ;

      data["planFamiliar_rips"] = this.global_HC002.EMBAR.PLANIFIC;

      data["velloPubico_rips"] = this.global_HC002.SIGNOS_VITALES.TANNER_PUBICO;
      data["genitales_rips"] = this.global_HC002.SIGNOS_VITALES.TANNER_GENIT;

      data["nroControles_rips"] = this.global_HC002.EMBAR.NRO_CONTR;
      data["patoCronica_rips"] = this.global_HC002.CRONICO;
      data["estadoSalida_rips"] = this.global_HC002.RIPS.ESTADO_SAL;
      data["remitido_rips"] = this.global_HC002.RIPS.REMITIDO;
      data["diagMuerte_rips"] = this.global_HC002.RIPS.DIAG_MUER;

      data["revalorar"] = this.bandera_revalorar;

      console.log(data);

      postData(data, get_url("APP/HICLIN/HC002-02.DLL"))
        .then((data) => {
          console.log(data);
          var mensaje = "";

          if (localStorage.Usuario == "GEBC" && this.global_HC002.NOVEDAD == "8") {
            mensaje = "Evolución modificada correctamente";
          } else {
            switch (data) {
              case "1":
                mensaje = "Apertura creada correctamente";
                $_REG_HC.opc_llamado = "1";
                break;
              case "2":
                $_REG_HC.opc_llamado = "2";
                mensaje = "Evolución creada correctamente";
                break;
            }
          }
          CON851("", mensaje, null, "success", "Correcto");
          _this.actualizarRipsFactura();
        })
        .catch((error) => {
          console.log(error);
          CON851("", "Ha ocurrido un error", null, "error", "Error");
          _this.validarAnalisis();
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

      if (this.historia_clinica.novedad == "7" || this.historia_clinica.cierre.temporal == "1") {
        var datos = datosEnvio();
        datos += this.global_HC002.FECHA_EVO;
        datos += "|";
        datos += localStorage.IDUSU;
        datos += "|";
        datos += this.datos_paciente.COD;
        datos += "|";

        postData({ datosh: datos }, get_url("APP/HICLIN/HC-101.DLL"))
          .then(_this.llamarFormulacion)
          .catch((err) => {
            console.error(err);
            setTimeout(() => {
              _this.llamarFormulacion();
            }, 300);
          });
      } else {
        _this.llamarFormulacion();
      }
    },
    llamarFormulacion() {
      $_REG_HC.fecha_lnk = this.global_HC002.FECHA_EVO;
      $_REG_HC.hora_lnk = this.global_HC002.HORA_EVO;
      $_REG_HC.oper_lnk = this.global_HC002.OPER_EVO;
      $("#body_main").load("../../HICLIN/paginas/HC002F.html");
    },
    salir_hc002() {
      _regresar_menuhis();
    },
  },
});
