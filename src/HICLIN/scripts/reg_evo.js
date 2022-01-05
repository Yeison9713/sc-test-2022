// 06/08/2021 JAVIER.L: SE CAMBIA RELA_ALBUMI_CREATININA2 -> RELA_ALBUMI_CREATINI_2
//                      SE AGREGA RELA_ALBUMI_CREATINI_1
function getObjRegEvo() {
  return JSON.parse(
    JSON.stringify({
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
      REG_MEDICO: "",
      ESPEC_MEDICO: "",
      DESCRIP_ESPEC_MEDICO: "",
      UNSERV: "",
      DESCRIP_UNSERV: "",
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
        DETALLE_MACRO: "",
        CLASIF: "",
        VIA: "",
      },
      TABLA_DIAGNOSTICOS: ["", "", "", "", "", "", "", "", "", ""],
      DESCRIPCIONES_DIAGN: ["", "", "", "", "", "", "", "", "", ""],
      TABLA_CUPS: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      DESCRIPCIONES_CUPS: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
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
      CREATININA2: "",
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
      COVID: {
        VIAJE: "",
        CONTACTO: "",
        FIEBRE: "",
        TOS: "",
        DISNEA: "",
        MALESTAR: "",
        RINORREA: "",
        VIAJE_DENTRO: "",
        LUGAR_VIAJE_DENTRO: "",
        TIEMPO_VIAJE_DENTRO: "",
        VIAJE_FUERA: "",
        LUGAR_VIAJE_FUERA: "",
        TIEMPO_VIAJE_FUERA: "",
        ODINOFAGIA: "",
        RECOMENDACION: "",
        CONSENTI_ACOMP: "",
        TIPO_ID_ACOMP: "",
        ID_ACOMP: "",
        PRIMER_APEL: "",
        SEGUNDO_APEL: "",
        PRIMER_NOM: "",
        SEGUNDO_NOM: "",
        LUGAR_ID: "",
        PERSONAL_SALUD: "",
        DIABETES: "",
        ENF_CARDIOVAS: "",
        FALLA_RENAL: "",
        VIH: "",
        CANCER: "",
        ENF_AUTOINMUN: "",
        HIPOTIROID: "",
        CORTICO_INMUNO: "",
        EPOC_ASMA: "",
        MAL_NUTRICION: "",
        FUMADORES: "",
        CONSENTI_INFORM: "",
      },
      PESO_NEW: "",
      FORMULACION: [
        {
          TIPO_FORMU: "",
          COD_FORMU: "",
          DESCRIP_FORMU: "",
          CANT_FORMU: "",
          INDI1_FORMU: "",
          ORDEN_DOSIS: "",
          CANT_DOSIS: "",
          UNID_DOSIS: "",
          CADA_DOSIS: "",
          CANT_FREC: "",
          UNID_FREC: "",
          VIA_DOSIS: "",
          DIAS_TRAT: "",
          CANT_DOSIF: "",
          TIPO_DOSIF: "",
          CANT_FREC_DOSIF: "",
          FREC_DOSIF: "",
          VIA_FORMU: "",
          INDI2_FORMU: "",
          INSTITUTO_FORMU: "",
          TIPO_INCAP_FORMU: "",
          GRADO_INCAP_FORMU: "",
          PRORROG_FORMU: "",
          NRO_ORD_FORMU: "",
          NRO_PED_FORMU: "",
          POSICION_FORMU_J: "",
          FECHA_FOR_W: "",
          HORA_FOR_W: "",
          OTROS1_FORMU: "",
        },
      ],
      OTROS_FORMU_EVO: [
        {
          OBSERV_INTERP1_EVO: "",
          OBSERV_INTERP2_EVO: "",
          RESUL_INTERP_EVO: "",
          VLR_RESUL_EVO: "",
          INDIC2_2FORMU: "",
          MANEJO_FORMU: "",
          ESPEC_FORMU: "",
          OPER_COMP_EVO: "",
          MEDICO_INTERP_EVO: "",
          DATOS_FACT_EVO: {
            LLAVE_FACT_EVO: "",
            FECHA_COMP_EVO: "",
            CTA_FACT_EVO: ["", ""],
            HORA_ELAB_EVO: "",
            FECHA_INTERP_EVO: "",
            POSICION_OTRFORMU_J: "",
          },
        },
      ],
    })
  );
}

function getSintomaticoRegEvo(evo) {
  let sintomatico = {};

  evo = evo || getObjRegEvo();

  sintomatico.sintom_resp = evo.SINTOM_RESPI;
  sintomatico.sintom_piel = evo.SINTOM_PIEL;
  sintomatico.victi_maltrato = evo.VICTI_MALTRATO;
  sintomatico.victi_violencia = evo.VICTI_VIOLENCIA;
  sintomatico.enfer_mental = evo.ENFER_MENTAL;
  sintomatico.enfer_its = evo.ENFER_ITS;
  sintomatico.cual_its = evo.CUAL_ITS;
  sintomatico.trata_its = evo.TRATA_ITS;
  sintomatico.cancer_seno = evo.CANCER_SENO;
  sintomatico.cancer_cervis = evo.CANCER_CERVIS;
  sintomatico.edu_autoexa_seno = evo.EDU_AUTOEXA_SENO;

  sintomatico.citologia_previa = evo.CITOLOGIA_PREVIA;
  sintomatico.fecha_cito_previa = evo.FECHA_CITO_PREVIA;
  sintomatico.resul_cito_previa = evo.RESUL_CITO_PREVIA;
  sintomatico.contacto_lepra = evo.CONTACTO_LEPRA;
  sintomatico.fecha_ult_mamo = evo.FECHA_ULT_MAMO;

  return sintomatico;
}

function getCreatininaRegEvo(evo) {
  let creatinina = {};

  creatinina.CREATININA2 = evo.CREATININA2;
  creatinina.HEMO_GLICOSILADA = evo.HEMO_GLICOSILADA;
  creatinina.HEMO_GLICO_FECHA = evo.HEMO_GLICO_FECHA;
  creatinina.MICROALBUMINURIA_2 = evo.MICROALBUMINURIA_2;
  creatinina.FECHA_MICROALBUMINURIA = evo.FECHA_MICROALBUMINURIA;
  creatinina.RIESGO_CARDIO = evo.RIESGO_CARDIO;
  creatinina.RELA_ALBUMI_CREATININA2 = evo.RELA_ALBUMI_CREATININA2;
  creatinina.ERC = evo.ERC;
  creatinina.FECHA_DX_ERC = evo.FECHA_DX_ERC;
  creatinina.FECHA_CREATININA = evo.FECHA_CREATININA;
  creatinina.ESTADIO_ERC = evo.ESTADIO_ERC;

  return creatinina;
}

function getDatosGuardadoEvol(reg_evo, admin_w) {
  let registro = {};
  registro.datosh = datosEnvio() + reg_evo.LLAVE_EVO + "|" + reg_evo.TIPO + "|" + admin_w + "|" + reg_evo.NOVEDAD + "|";
  registro.MEDICO = reg_evo.MEDICO;
  registro.UNSERV = reg_evo.UNSERV;
  registro.SIGNOS_VITALES = [
    reg_evo.SIGNOS_VITALES.PESO,
    reg_evo.SIGNOS_VITALES.TALLA,
    reg_evo.SIGNOS_VITALES.IMC_CORP,
    reg_evo.SIGNOS_VITALES.SUP_CORP,
    reg_evo.SIGNOS_VITALES.TEMP,
    reg_evo.SIGNOS_VITALES.F_CARD,
    reg_evo.SIGNOS_VITALES.F_RESP,
    reg_evo.SIGNOS_VITALES.TENS_1,
    reg_evo.SIGNOS_VITALES.TENS_2,
    reg_evo.SIGNOS_VITALES.TENS_MEDIA,
    reg_evo.SIGNOS_VITALES.UNID_PESO,
    reg_evo.SIGNOS_VITALES.TANNER_PUBICO,
    reg_evo.SIGNOS_VITALES.TANNER_GENIT,
    reg_evo.SIGNOS_VITALES.PVC,
    reg_evo.SIGNOS_VITALES.APER_OCUL,
    reg_evo.SIGNOS_VITALES.RESP_VERB,
    reg_evo.SIGNOS_VITALES.RESP_MOTO,
    reg_evo.SIGNOS_VITALES.VLR_GLASG,
    reg_evo.SIGNOS_VITALES.G_URIN,
    reg_evo.SIGNOS_VITALES.OXIMETRIA,
    reg_evo.SIGNOS_VITALES.GLUCOMETRIA,
    reg_evo.SIGNOS_VITALES.PESO_GRAMOS,
    reg_evo.SIGNOS_VITALES.ETCO,
    reg_evo.SIGNOS_VITALES.RESUL_CITO,
    reg_evo.SIGNOS_VITALES.MUEST_CITO,
    reg_evo.SIGNOS_VITALES.CREATININA,
    reg_evo.SIGNOS_VITALES.OTR_SIG,
  ].join("|");

  registro.PESO_NEW = reg_evo.PESO_NEW;

  registro.MACRO = [reg_evo.MACRO.CLASE, reg_evo.MACRO.CODIGO, reg_evo.MACRO.CLASIF, reg_evo.MACRO.VIA].join("|");

  registro.TABLA_CUPS = reg_evo.TABLA_CUPS.join("|");

  registro.PROCEDIMIENTOS = [
    reg_evo.PROCEDIMIENTOS.TIPO_ANES,
    reg_evo.PROCEDIMIENTOS.TIEMPO_PROC,
    reg_evo.PROCEDIMIENTOS.TIEMPO_SALA,
    reg_evo.PROCEDIMIENTOS.SALA_CIRU,
    reg_evo.PROCEDIMIENTOS.PROC_PROGRAMADO,
    reg_evo.PROCEDIMIENTOS.PROC_AMBULA,
    reg_evo.PROCEDIMIENTOS.EVEN_ADVERSO,
    reg_evo.PROCEDIMIENTOS.TIPO_CIRUGIA,
  ].join("|");

  registro.CREATININA2 = reg_evo.CREATININA2;

  registro.TABLA_DIAG = reg_evo.TABLA_DIAGNOSTICOS.join("|");

  registro.RIPS = [
    reg_evo.RIPS.EMBAR,
    reg_evo.RIPS.CAUSA,
    reg_evo.RIPS.FINALID,
    reg_evo.RIPS.ESTADO_SAL,
    reg_evo.RIPS.REMITIDO,
    reg_evo.RIPS.ATIENDE,
    reg_evo.RIPS.UNID_EDAD,
    reg_evo.RIPS.EDAD,
    reg_evo.RIPS.DIAG_MUER,
  ].join("|");

  registro.DATO_LECT = [reg_evo.OPER_LECT, reg_evo.FECHA_LECT].join("|");
  registro.DATO_FACT = [reg_evo.OPER_FACT, reg_evo.FECHA_FACT].join("|");

  registro.LIQUIDOS = [
    reg_evo.LIQUIDOS.LIQ_ADM_ORAL,
    reg_evo.LIQUIDOS.LIQ_ADM_VENA,
    reg_evo.LIQUIDOS.LIQ_ADM_TRAN,
    reg_evo.LIQUIDOS.LIQ_ELI_ORIN,
    reg_evo.LIQUIDOS.LIQ_ELI_DIAR,
    reg_evo.LIQUIDOS.LIQ_ELI_SOND,
    reg_evo.LIQUIDOS.LIQ_ELI_OTR1,
    reg_evo.LIQUIDOS.LIQ_ELI_DET,
  ].join("|");

  registro.PUPILAS = [
    reg_evo.PUPILAS.TAM_PUP_DR,
    reg_evo.PUPILAS.REA_PUP_DR,
    reg_evo.PUPILAS.TAM_PUP_IZ,
    reg_evo.PUPILAS.REA_PUP_IZ,
  ].join("|");

  registro.MUSCULAR = [reg_evo.MUSCULAR.MSD, reg_evo.MUSCULAR.MSI, reg_evo.MUSCULAR.MII, reg_evo.MUSCULAR.MID].join(
    "|"
  );

  registro.REV_CITO = reg_evo.REV_CITO;
  registro.SINTOM_RESPI = reg_evo.SINTOM_RESPI;
  registro.PRIMERA_VEZ = reg_evo.PRIMERA_VEZ;
  registro.SINTOM_PIEL = reg_evo.SINTOM_PIEL;
  registro.METODO_OXI = [reg_evo.TIPO_MET_OXI, reg_evo.DESC_MET_OXI].join("|");
  registro.FCARD_FET = reg_evo.FCARD_FET;
  registro.DOSIS_OXIGENO = reg_evo.DOSIS_OXIGENO;
  registro.PER_TORA = reg_evo.PER_TORA;
  registro.PER_MUNE = reg_evo.PER_MUNE;
  registro.TIPO_DIAG = reg_evo.TIPO_DIAG;
  registro.CRONICO = reg_evo.CRONICO;

  registro.VAR_CRECIM = [
    reg_evo.CRECIMIENTO.PER_CEF,
    reg_evo.CRECIMIENTO.PES_ED_ESTAD,
    reg_evo.CRECIMIENTO.TALLA_ED_ESTAD,
    reg_evo.CRECIMIENTO.PESO_TAL_ESTAD,
    reg_evo.CRECIMIENTO.IMC_ESTAD,
    reg_evo.CRECIMIENTO.PER_CEF_ESTAD,
  ].join("|");

  registro.VAR_EMBAR = [
    reg_evo.EMBAR.GESTACIONES,
    reg_evo.EMBAR.FECHA_REGLA,
    reg_evo.EMBAR.EDAD_GEST_REGLA,
    reg_evo.EMBAR.ALT_UTER,
    reg_evo.EMBAR.PESO_PREV,
    reg_evo.EMBAR.EST_NUTRI,
    reg_evo.EMBAR.PLANIFIC,
    reg_evo.EMBAR.OTR_PLANIFIC,
    reg_evo.EMBAR.NRO_CONTR,
  ].join("|");

  registro.PATOLOGIA = [
    reg_evo.PATOLOGIA.PIEZA_QUIR,
    reg_evo.PATOLOGIA.DATOS_CLINICOS,
    reg_evo.PATOLOGIA.FECHA_MUEST,
    reg_evo.PATOLOGIA.TIPO_ESTUD,
    reg_evo.PATOLOGIA.HISTOL_ESTUD,
    reg_evo.PATOLOGIA.GRADO_DIF_ESTUD,
  ].join("|");

  registro.VICTI_MALTRATO = reg_evo.VICTI_MALTRATO;
  registro.VICTI_VIOLENCIA = reg_evo.VICTI_VIOLENCIA;
  registro.ENFER_MENTAL = reg_evo.ENFER_MENTAL;
  registro.ENFER_ITS = reg_evo.ENFER_ITS;
  registro.CANCER_SENO = reg_evo.CANCER_SENO;
  registro.CANCER_CERVIS = reg_evo.CANCER_CERVIS;
  registro.LISTA_CHEQUEO_CIR = reg_evo.LISTA_CHEQUEO_CIR;
  registro.HEMO_GLICOSILADA = reg_evo.HEMO_GLICOSILADA;
  registro.HEMO_GLICO_FECHA = reg_evo.HEMO_GLICO_FECHA;
  registro.MICROALBUMINURIA = reg_evo.MICROALBUMINURIA;
  registro.FECHA_MICROALBUMINURIA = reg_evo.FECHA_MICROALBUMINURIA;
  registro.RIESGO_CARDIO = reg_evo.RIESGO_CARDIO;
  registro.MICROALBUMINURIA2 = reg_evo.MICROALBUMINURIA_2;
  registro.EDU_AUTOEXA_SENO = reg_evo.EDU_AUTOEXA_SENO;
  registro.ERC_EVO = reg_evo.ERC;
  registro.FECHA_DX_ERC = reg_evo.FECHA_DX_ERC;
  registro.TRATA_ITS = reg_evo.TRATA_ITS;
  registro.CUAL_ITS = reg_evo.CUAL_ITS;
  registro.CITOLOGIA_PREVIA = reg_evo.CITOLOGIA_PREVIA;
  registro.FECHA_CITO_PREVIA = reg_evo.FECHA_CITO_PREVIA;
  registro.RESUL_CITO_PREVIA = reg_evo.RESUL_CITO_PREVIA;
  registro.RELA_ALBUMI_CREATININA2 = reg_evo.RELA_ALBUMI_CREATININA2;
  registro.CONTACTO_LEPRA = reg_evo.CONTACTO_LEPRA;
  registro.FECHA_ASESORIA_PRE_VIH = reg_evo.FECHA_ASESORIA_PRE_VIH;
  registro.FECHA_ASESORIA_POS_VIH = reg_evo.FECHA_ASESORIA_POS_VIH;
  registro.FECHA_ULT_MAMO = reg_evo.FECHA_ULT_MAMO;
  registro.CONDUCTA = reg_evo.CONDUCTA;
  registro.FECHA_CREATININA = reg_evo.FECHA_CREATININA;
  registro.ESTADIO_ERC = reg_evo.ESTADIO_ERC;

  registro.COVID19 = [
    reg_evo.COVID.VIAJE,
    reg_evo.COVID.CONTACTO,
    reg_evo.COVID.FIEBRE,
    reg_evo.COVID.TOS,
    reg_evo.COVID.DISNEA,
    reg_evo.COVID.MALESTAR,
    reg_evo.COVID.RINORREA,
    reg_evo.COVID.VIAJE_DENTRO,
    reg_evo.COVID.LUGAR_VIAJE_DENTRO,
    reg_evo.COVID.TIEMPO_VIAJE_DENTRO,
    reg_evo.COVID.VIAJE_FUERA,
    reg_evo.COVID.LUGAR_VIAJE_FUERA,
    reg_evo.COVID.TIEMPO_VIAJE_FUERA,
    reg_evo.COVID.ODINOFAGIA,
    reg_evo.COVID.RECOMENDACION,
    reg_evo.COVID.CONSENTI_ACOMP,
    reg_evo.COVID.TIPO_ID_ACOMP,
    reg_evo.COVID.ID_ACOMP.padStart(15, "0"),
    reg_evo.COVID.PRIMER_APEL,
    reg_evo.COVID.SEGUNDO_APEL,
    reg_evo.COVID.PRIMER_NOM,
    reg_evo.COVID.SEGUNDO_NOM,
    reg_evo.COVID.LUGAR_ID,
    reg_evo.COVID.PERSONAL_SALUD,
    reg_evo.COVID.DIABETES,
    reg_evo.COVID.ENF_CARDIOVAS,
    reg_evo.COVID.FALLA_RENAL,
    reg_evo.COVID.VIH,
    reg_evo.COVID.CANCER,
    reg_evo.COVID.ENF_AUTOINMUN,
    reg_evo.COVID.HIPOTIROID,
    reg_evo.COVID.CORTICO_INMUNO,
    reg_evo.COVID.EPOC_ASMA,
    reg_evo.COVID.MAL_NUTRICION,
    reg_evo.COVID.FUMADORES,
    reg_evo.COVID.CONSENTI_INFORM,
  ].join("|");

  registro.HAB_EVO = reg_evo.HAB;
  registro.ESPECIALIDAD_HC02 = reg_evo.ESPECIALIDAD_HC02;
  registro.FECHA_CITA_ESP_HC02 = reg_evo.FECHA_CITA_ESP_HC02;
  registro.ACOMPA = reg_evo.ACOMPA;
  registro.PRIORIDAD_FORMU = reg_evo.PRIORIDAD_FORMU;
  registro.PER_ABDO = reg_evo.PER_ABDO;
  registro.DATOS_GRAB = [reg_evo.DATOS_GRABADO.FECHA_GRAB, reg_evo.DATOS_GRABADO.HORA_GRAB].join("|");
  registro.VAR_EXAMEN = reg_evo.INST_EXAM + "|" + reg_evo.IPS_EXAM;
  registro.TABLA_CUPS_ANT = reg_evo.TABLA_CUPS.join("|");

  registro.DATOS_TRAS = [
    reg_evo.DATOS_TRAS.OPER_TRAS,
    reg_evo.DATOS_TRAS.FECHA_TRAS,
    reg_evo.DATOS_TRAS.LLAVE_PACI_TRAS,
  ].join("|");

  return registro;
}

function getObjMorse() {
  return {
    cama: "",
    historial_caidas: "",
    dx_secu_caidas: "",
    ayuda_deambular: "",
    venoclisis: "",
    marcha: "",
    estado_mental: "",
  };
}

function getObjUpp() {
  return {
    percep_senso: "",
    expo_humedad: "",
    actividad: "",
    movilidad: "",
    nutricion: "",
    friccion_ciza: "",
    estado_piel: {
      piel_integra: "",
      zona_presion: "",
      laceracion: "",
      flictemas: "",
      escara: "",
    },
  };
}

function get_WSPYP2() {
  return {
    MG: {
      reflej_busq_succi: "",
      reflej_moro_pres_simet: "",
      mueve_extremidades: "",
      sost_cabe_levan_braz: "",
      levan_cabe_pecho_prono: "",
      gira_cobe_ln_media: "",
      contr_cabe_sent_apo: "",
      se_voltea: "",
      se_mant_sent_moment: "",
      se_mant_sent_sin_apo: "",
      adopt_posic_sentado: "",
      se_arrast_posic_prono: "",
      gatea_despla_curzado: "",
      adopt_posic_bipe_apo: "",
      se_sost_pie_sin_apo: "",
      pone_de_pie_sin_ayuda: "",
      pasos_solo: "",
      camin_desp_cruz_sin_ayud: "",
      corre: "",
      lanza_pelota: "",
      patea_pelota: "",
      salta_pies_juntos: "",
      se_empina_ambos_pies: "",
      sube_2_escal_sin_apo: "",
      camin_punta_pies: "",
      se_para_1_pie: "",
      baja_2_escal_sin_apo: "",
      camin_ln_rect_sin_apo: "",
      salta_3_un_pie: "",
      rebota_agarra_pelota: "",
      hace_caballitos: "",
      salt_lado_ln_pies_junt: "",
      salt_despla_ambos_pies: "",
      equi_punt_pies_ojos_cer: "",
      saltos_alter_secuenc: "",
      real_activ_integ_motora: "",
      p_inicio_ead3_mg: "",
      p_cierre_ead3_mg: "",
      pt_directa_ead3_mg: "",
      pt_tipica_ead3_mg: "",
    },

    MF: {
      reflej_presion_palmar: "",
      reacc_luz_sonidos: "",
      sigue_movi_horiz: "",
      abre_mira_sus_manos: "",
      sotiene_obj_mano: "",
      lleva_obj_boca: "",
      agarra_obj_volunt: "",
      ret_obj_quitar: "",
      pasa_obj_manos: "",
      sost_obj_cada_mano: "",
      deja_caer_obj_inten: "",
      agarra_pulgar_indice: "",
      agarra_terc_obj_sin_solt: "",
      saca_obj_contenedor: "",
      busca_obj_escondido: "",
      hace_torre_3_cubos: "",
      pasa_hojas_libro: "",
      agarra_cuchara_llev_boca: "",
      garabatea_expont: "",
      quita_tapa_contenedor: "",
      hace_torre_5_cubos: "",
      ensart_cuent_perf_pinza: "",
      rasg_pap_pinza_2_manos: "",
      copia_ln_vert_horiz: "",
      hace_bola_pap_dedos: "",
      copia_circulo: "",
      fig_humana_rudiment: "",
      imita_dibujo_escalera: "",
      cort_pap_tijera: "",
      fig_humana_2: "",
      dibuja_hogar: "",
      mod_cubos_escalera: "",
      copia_triangulo: "",
      copia_fig_puntos: "",
      hace_fig_plegada: "",
      ensart_cordon_cruzado: "",
      p_inicio_ead3_mf: "",
      p_cierre_ead3_mf: "",
      pt_directa_ead3_mf: "",
      pt_tipica_ead3_mf: "",
    },

    AL: {
      se_sobresalta_ruido: "",
      contemp_moment_persona: "",
      llora_expre_necesi: "",
      se_tranq_voz_humana: "",
      produc_soni_gutur_indif: "",
      busc_soni_mirada: "",
      busc_dif_soni_mirada: "",
      pone_atenc_conversacion: "",
      produc_4_mas_soni_dif: "",
      pronunc_3_mas_silabas: "",
      reacc_llamado_nomre: "",
      reacc_3_palabas_dif: "",
      reacc_palab_no: "",
      llama_cuidador: "",
      resp_instruc_sencilla: "",
      aprox_palab_intenc_comu: "",
      recon_6_obj_imag: "",
      sigue_instruc_2_pasos: "",
      nombra_5_obj_imag: "",
      uti_mas_20_palab: "",
      usa_frac_2_palab: "",
      dice_nom_completo: "",
      dice_frac_3_palab: "",
      recon_cualid_obj: "",
      define_uso_5_obj: "",
      hace_comparativos: "",
      describe_dibujo: "",
      recon_5_colores: "",
      resp_3_preg_relato: "",
      elab_relato_imag: "",
      expresa_opiniones: "",
      repit_palb_pronunc_corr: "",
      absurdos_visuales: "",
      ident_palab_soni_parec: "",
      conoce_ayer_hoy_man: "",
      ordena_hist_relata: "",
      p_inicio_ead3_al: "",
      p_cierre_ead3_al: "",
      pt_directa_ead3_al: "",
      pt_tipica_ead3_al: "",
    },

    PS: {
      tranq_toma_brazos: "",
      resp_caricias: "",
      bebe_registrado: "",
      recon_voz_cuidador_ppal: "",
      sonrisa_social: "",
      resp_conversacion: "",
      coge_manos_examin: "",
      rie_carcajadas: "",
      busc_conti_juego: "",
      reacc_desconf_extrano: "",
      busc_apoyo_cuidador: "",
      reacc_imag_espejo: "",
      participa_juegos: "",
      int_aliment_solo: "",
      explora_entorno: "",
      sigue_rutinas: "",
      ayuda_desvestirse: "",
      senala_5_part_cuerpo: "",
      acce_tol_cont_piel_text: "",
      expresa_satisf_logro: "",
      ident_emoci_basic_imag: "",
      ident_obj_prop_otros: "",
      dice_nomb_famil_cerc: "",
      expresa_verb_emoci: "",
      recha_ayud_int_solo: "",
      compart_juegos_otros: "",
      recon_emoci_otros: "",
      puede_vest_desv_solo: "",
      propone_juegos: "",
      sabe_su_edad: "",
      part_juego_resp_reglas: "",
      comenta_vida_familiar: "",
      colab_inici_prop_activ: "",
      manif_emoc_acomt_import: "",
      recon_norma_prohib: "",
      recon_emoci_complejas: "",
      p_inicio_ead3_ps: "",
      p_cierre_ead3_ps: "",
      pt_directa_ead3_ps: "",
      pt_tipica_ead3_ps: "",
    },
    rango_edad: "",
    fecha_edad_paci: "",
    und_edad: "",
    nombres_aco: "",
    tel_aco: "",
    novedad: "",
    llave_ult_evo: "",
  };
}

function get_WSTransfusiones() {
  return {
    llave_paci_evo: "",
    fecha_evo: "",
    hora_evo: "",
    oper_evo: "",
    unserv_evo: "",
    nom_oper_evo: "",
    cama: "",
    producto: "",
    grp_sang: "",
    rh: "",
    carac_orina: "",
    dato_unidades: Array(6).fill({
      nro_unidad: "",
      fecha_venc: "",
      fecha_ini: "",
      hora_ini: "",
      fecha_fin: "",
      hora_fin: "",
      datos_signos: Array(10).fill({
        fecha: "",
        hora: "",
        tens1: "",
        tens2: "",
        temp: "",
        fcard: "",
        diuresis: "",
      }),
    }),
    cierre: {
      volumen_mili: "",
      reaccion: "",
      fecha: "",
      hora: "",
      carac_carac: "",
      carac_tratamiento: "",
      estado_comp: "",
      motivo_devol: "",
      observacion: "",
    },
  };
}

const get_WS_RECIE = () => {
  return {
    madre: {
      encab_madre: "",
      id_madre: "",
      primer_apel_madre: "",
      segundo_apel_madre: "",
      nombre_madre: "",
      und_edad_madre: "",
      vlr_edad_madre: "",
      est_civ_madre: "",
      paridad: {
        g: "",
        p: "",
        a: "",
        c: "",
        vivos: "",
      },
      ed_gest: "",
      ctrl_prentl: "",
      riesgo_obst: "",
      grupo_madre: "",
      rh_madre: "",
      vdrl_madre: "",
      hiv_madre: "",
      hep_madre: "",
      tox_madre: "",
      grupo_padre: "",
      rh_padre: "",
      vdrl_padre: "",
      hiv_padre: "",
      hep_padre: "",
      tox_padre: "",
      paridad2: {
        muertos: "",
      },
    },
    neonat: {
      encab_rn: "",
      orden_hijo: "",
      atencion_parto: "",
      otro_part: "",
      hr_nac: "",
      mn_nac: "",
      fecha_nac: "",
      sexo: "",
      peso_neo: "",
      talla_neo: "",
      percef: "",
      pertor: "",
      perabd: "",
      presentacion: "",
      rupt_hr: "",
      nacimiento: "",
      parto: "",
      instrumentacion: "",
      otro_instr: "",
      trabj_part_hrs: "",
      sufri_fet: "",
      sufri_fet_ampl: "",
      liq_amn: "",
      placenta: "",
      pinza_cordon: "",
      adapt_neon: "",
      tabla_general: [
        {
          aspecto: "",
          pulso: "",
          gesticular: "",
          actitud: "",
          respiracion: "",
        },
        {
          aspecto: "",
          pulso: "",
          gesticular: "",
          actitud: "",
          respiracion: "",
        },
        {
          aspecto: "",
          pulso: "",
          gesticular: "",
          actitud: "",
          respiracion: "",
        },
      ],
      medica_usad: [
        { drogas: "", descrip: "" },
        { drogas: "", descrip: "" },
        { drogas: "", descrip: "" },
      ],
      placenta_descrip: "",
    },
    exam_neon: {
      encab_exam_neon: "",
      piel: "",
      cabeza_cuell: "",
      ojos_orl_pal_pabe_auri: "",
      torax_coraz_pulm: "",
      abdomen: "",
      genitales: "",
      ano_exam: "",
      osteomuscular: "",
      extremidades: "",
    },
    estim_ed_gest: {
      encab_estim_ed_gest: "",
      text_piel: "",
      forma_orej: "",
      tamano_gland_mama: "",
      forma_pezon: "",
      pliegues_planta: "",
      ed_gest_corr: "",
    },
    observaciones: "",
    reng: "",
    analisis: "",
    novedad: "",
  };
};

module.exports = {
  getObjRegEvo,
  getSintomaticoRegEvo,
  getCreatininaRegEvo,
  getDatosGuardadoEvol,
  getObjUpp,
  getObjMorse,
  get_WSPYP2,
  get_WSTransfusiones,
  get_WS_RECIE,
};
