const { getObjRegCLAP, grabarRegClap } = require("../../HICLIN/scripts/reg_clap.js");

new Vue({
  el: "#CLAP001",
  data: {
    historiasClap: [],
    HistoriaEscogida: "",
    historia_clinica: {},
    ciudades: [],
    global_CLAP001: getObjRegCLAP(),
    enfermedades: [],
    profesionales: [],
    arrayIps: [],
    arrayRaza: [
      { COD: "1", DESCRIP: "BLANCA" },
      { COD: "2", DESCRIP: "INDÍGENA" },
      { COD: "3", DESCRIP: "MESTIZA" },
      { COD: "4", DESCRIP: "NEGRA" },
      { COD: "5", DESCRIP: "OTRA RAZA" },
    ],
    arrayEstudios: [
      { COD: "1", DESCRIP: "NINGUNA" },
      { COD: "2", DESCRIP: "PRES-ESCOLAR" },
      { COD: "3", DESCRIP: "PRIMARIA" },
      { COD: "4", DESCRIP: "SECUNDARIA" },
      { COD: "5", DESCRIP: "BACHILLER BASICO" },
      { COD: "6", DESCRIP: "BACHILLER TECNICO" },
      { COD: "7", DESCRIP: "NORMALISTA" },
      { COD: "8", DESCRIP: "TECNICA PROFESIONAL" },
      { COD: "9", DESCRIP: "TECNOLOGICA" },
      { COD: "A", DESCRIP: "PROFESIONAL" },
      { COD: "B", DESCRIP: "ESPECIALIZACION" },
      { COD: "C", DESCRIP: "MAESTRIA" },
      { COD: "D", DESCRIP: "DOCTORADO" },
    ],
    arrayDiabetes: [
      { COD: "0", DESCRIP: "NO" },
      { COD: "1", DESCRIP: "I GRADO" },
      { COD: "2", DESCRIP: "II GRADO" },
      { COD: "3", DESCRIP: "III GRADO" },
    ],
    arrayPesoAnt: [
      { COD: "1", DESCRIP: "NO CORRESPONDE" },
      { COD: "2", DESCRIP: "NORMAL" },
      { COD: "3", DESCRIP: "< 2500 GR" },
      { COD: "4", DESCRIP: "> 4200 GR" },
    ],
    arrayMetodoAnticonceptivo: [
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
    arrayNormalAnormal: [
      { COD: "1", DESCRIP: "NORMAL" },
      { COD: "2", DESCRIP: "ANORMAL" },
      { COD: "3", DESCRIP: "NO SE HIZO" },
    ],
    arrayAntirubeola: [
      { COD: "P", DESCRIP: "PREVIA" },
      { COD: "E", DESCRIP: "DURANTE EMBARAZO" },
      { COD: "N", DESCRIP: "NO" },
      { COD: "I", DESCRIP: "IGNORA" },
    ],
    arrayPosNegaHizo: [
      { COD: "+", DESCRIP: "POSITIVO" },
      { COD: "-", DESCRIP: "NEGATIVO" },
      { COD: "N", DESCRIP: "NO SE HIZO" },
    ],
    arrayPosNegaHizoPend: [
      { COD: "+", DESCRIP: "POSITIVO" },
      { COD: "-", DESCRIP: "NEGATIVO" },
      { COD: "N", DESCRIP: "NO SE HIZO" },
      { COD: "P", DESCRIP: "REPORTE PENDIENTE" },
    ],
    arrayPosNegaSin: [
      { COD: "+", DESCRIP: "POSITIVO" },
      { COD: "-", DESCRIP: "NEGATIVO" },
      { COD: "0", DESCRIP: "SIN DATO" },
    ],
    arrayPosNega: [
      { COD: "+", DESCRIP: "POSITIVO" },
      { COD: "-", DESCRIP: "NEGATIVO" },
    ],
    arrayGamaglobulina: [
      { COD: "S", DESCRIP: "SI" },
      { COD: "N", DESCRIP: "NO" },
      { COD: "0", DESCRIP: "NO CORRESPONDE" },
    ],
    arraySIFILIS_1: [
      { COD: "+", DESCRIP: "POSITIVO" },
      { COD: "-", DESCRIP: "NEGATIVO" },
      { COD: "0", DESCRIP: "SIN DATO" },
      { COD: "1", DESCRIP: "NO CORRESPONDE" },
    ],
    arraySIFILIS_2: [
      { COD: "S", DESCRIP: "SI" },
      { COD: "N", DESCRIP: "NO" },
      { COD: "0", DESCRIP: "SIN DATO" },
      { COD: "1", DESCRIP: "NO CORRESPONDE" },
    ],
    arrayPrese: [
      { COD: "1", DESCRIP: "CEFALICA" },
      { COD: "2", DESCRIP: "PELVIANA" },
      { COD: "3", DESCRIP: "TRANSVERSA" },
      { COD: "4", DESCRIP: "INDETERMINADA" },
    ],
    arrayCorticoides: [
      { COD: "1", DESCRIP: "CICLO UNICO COMPLETO" },
      { COD: "2", DESCRIP: "CICLO UNICO INCOMPLETO" },
      { COD: "3", DESCRIP: "MULTIPLES" },
      { COD: "4", DESCRIP: "N/C" },
      { COD: "5", DESCRIP: "NINGUNA" },
    ],
    arrayInicioParto: [
      { COD: "1", DESCRIP: "ESPONTANEO" },
      { COD: "2", DESCRIP: "INDUCIDO" },
      { COD: "3", DESCRIP: "CESAR. ELECT" },
    ],
    arrayAcompanante: [
      { COD: "1", DESCRIP: "PAREJA" },
      { COD: "2", DESCRIP: "FAMILIAR" },
      { COD: "3", DESCRIP: "OTRO" },
      { COD: "4", DESCRIP: "NINGUNO" },
    ],
    arraySegun: [
      { COD: "1", DESCRIP: "FUM" },
      { COD: "2", DESCRIP: "ECO" },
    ],
    arrayPosicion: [
      { COD: "1", DESCRIP: "SENTADA" },
      { COD: "2", DESCRIP: "ACOSTADA" },
      { COD: "3", DESCRIP: "CUNCLILLAS" },
    ],
    arrayTerminacionParto: [
      { COD: "1", DESCRIP: "ESPONTANEA" },
      { COD: "2", DESCRIP: "CESAREA" },
      { COD: "3", DESCRIP: "FORCEPS" },
      { COD: "4", DESCRIP: "VACUUM" },
      { COD: "5", DESCRIP: "OTRA" },
    ],
    arraySexo: [
      { COD: "F", DESCRIP: "FEMENINO" },
      { COD: "M", DESCRIP: "MASCULINO" },
      { COD: "I", DESCRIP: "INDEFINIDO" },
    ],
    arrayPesoEG: [
      { COD: "1", DESCRIP: "ADECUADO" },
      { COD: "2", DESCRIP: "PEQUEÑO" },
      { COD: "3", DESCRIP: "GRANDE" },
    ],
    arrayReferido: [
      { COD: "1", DESCRIP: "ALOJAMIENTO CONTINUO" },
      { COD: "2", DESCRIP: "UNIDAD NEONATOLOGIA" },
      { COD: "3", DESCRIP: "OTRO ESTABLECIMIENTO" },
    ],
    arrayInvolUter: [
      { COD: "1", DESCRIP: "CONTRAIDO" },
      { COD: "2", DESCRIP: "FLACIDO" },
    ],
    arrayLoquios: [
      { COD: "1", DESCRIP: "ESCASO" },
      { COD: "2", DESCRIP: "NORMAL" },
      { COD: "3", DESCRIP: "ANORMAL" },
    ],
    arrayAlimentoAlta: [
      { COD: "1", DESCRIP: "LACT MATERNA EXCLUSIVA" },
      { COD: "2", DESCRIP: "PARCIAL" },
      { COD: "3", DESCRIP: "ARTIFICIAL" },
    ],
    arrayMetodoEscogido: [
      { COD: "1", DESCRIP: "DIU POST EVENTO" },
      { COD: "2", DESCRIP: "DIU" },
      { COD: "3", DESCRIP: "BARRERA" },
      { COD: "4", DESCRIP: "HORMONAL" },
      { COD: "5", DESCRIP: "LIGADURA TUBARIA" },
      { COD: "6", DESCRIP: "NATURAL" },
      { COD: "7", DESCRIP: "OTRO" },
      { COD: "8", DESCRIP: "NINGUNO" },
    ],
    datosPaciente: {},
    datosProfesional: {},
    mostrarObstetricos: false,
    mostrarObstetricos2: false,
    mostrarF3_controles: false,
    mostrarF3_parto: false,
    mostrarF3_puerperio: false,
    ocultarAborto: false,
    primeraVez: false,
    mostrarEnfermedades: false,
    inputEnfer: {
      nombre: "",
      tipo: 0,
      pos: 0,
    },
    fechas: {
      embar_ant: {
        ano: "",
        mes: "",
        dia: "",
      },
      fum: {
        ano: "",
        mes: "",
        dia: "",
      },
      fpp: {
        ano: "",
        mes: "",
        dia: "",
      },
      ingreso: {
        ano: "",
        mes: "",
        dia: "",
      },
      ruptura: {
        ano: "",
        mes: "",
        dia: "",
      },
      nacim: {
        ano: "",
        mes: "",
        dia: "",
      },
      egreso_rn: {
        ano: "",
        mes: "",
        dia: "",
      },
      egreso_mt: {
        ano: "",
        mes: "",
        dia: "",
      },
    },
    datosExt: {
      grupo_sang: "",
      rh: "",
    },
    textos: {
      FOLIO: "",
      ANO: "",
      MES: "",
      DIA: "",
      HORA: "",
      MINUTO: "",
      raza: "",
      estudios: "",
      ciudad_prenatal: "",
      diabetes_per: "",
      peso_ultimo_previo: "",
      metodo_anticonceptivo: "",
      insp_visual: "",
      pap: "",
      colp: "",
      antirubeola: "",
      ex_normal_odont: "",
      ex_normal_mamas: "",
      toxo20semMenos: "",
      toxo20semMas: "",
      primerConsultIgm: "",
      gamaglob_anti_d: "",
      chagas: "",
      malaria: "",
      bacte_men: "",
      bacte_mas: "",
      estrepto: "",
      notrep_men20sem: "",
      notrep_may20sem: "",
      trep_men20sem: "",
      trep_may20sem: "",
      trat_men20sem: "",
      trat_may20sem: "",
      tto_pareja_men20sem: "",
      tto_pareja_may20sem: "",
      tabla_gest: [
        { prese: "", mov_f: "", prote: "" },
        { prese: "", mov_f: "", prote: "" },
        { prese: "", mov_f: "", prote: "" },
        { prese: "", mov_f: "", prote: "" },
        { prese: "", mov_f: "", prote: "" },
        { prese: "", mov_f: "", prote: "" },
        { prese: "", mov_f: "", prote: "" },
        { prese: "", mov_f: "", prote: "" },
        { prese: "", mov_f: "", prote: "" },
        { prese: "", mov_f: "", prote: "" },
        { prese: "", mov_f: "", prote: "" },
      ],
      ciudad_parto: "",
      corticoides: "",
      inicio: "",
      presentacion: "",
      acompanan_tdp: "",
      segun: "",
      tabla_parto: [
        { compania: "", posicion: "", var_posicion: "", meconio: "" },
        { compania: "", posicion: "", var_posicion: "", meconio: "" },
        { compania: "", posicion: "", var_posicion: "", meconio: "" },
        { compania: "", posicion: "", var_posicion: "", meconio: "" },
      ],
      diabetes_enf: "",
      terminacion_parto: "",
      posicion_parto: "",
      sexo: "",
      segun_recien_nacido: "",
      peso_eg_confiable: "",
      medico_parto: "",
      medico_neonato: "",
      referido: "",
      enfermedad_defectos: "",
      vdrl: "",
      tratamiento: "",
      tsh: "",
      hbpatia: "",
      bilirub: "",
      toxo_img: "",
      tabla_puerperio: [
        { invol: "", loquios: "" },
        { invol: "", loquios: "" },
        { invol: "", loquios: "" },
      ],
      antirubeola_post: "",
      gamaglob_anti_d_puerp: "",
      alimento_alta: "",
      lugar_traslado_rn: "",
      medico_responsable_rn: "",
      lugar_traslado_mt: "",
      medico_responsable_mt: "",
      metodo_elegido: "",
    },
    mask: {
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
    stylesCLAP001: {
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
  },
  created() {
    let active = $("#navegacion").find("li.opcion-menu.active");
    var opcion = active[0].attributes[2].nodeValue;

    if (opcion == "0A1") _toggleNav();

    nombreOpcion("A,1 - Formulario CLAP");

    _inputControl("disabled");
    _inputControl("reset");

    this.datosPaciente = JSON.parse(JSON.stringify($_REG_PACI));
    this.datosProfesional = JSON.parse(JSON.stringify($_REG_PROF));

    this.validarPaciente();
  },
  components: {
    ser851: require("../../SALUD/scripts/SER851.vue.js"),
  },
  watch: {
    "global_CLAP001.raza": function (data) {
      var consulta = this.arrayRaza.find((x) => x.COD == data);
      if (consulta) this.textos.raza = consulta.DESCRIP;
    },
    "global_CLAP001.estud": function (data) {
      var consulta = this.arrayEstudios.find((x) => x.COD == data);
      if (consulta) this.textos.estudios = consulta.DESCRIP;
    },
    "global_CLAP001.antecedentes_personales.diab_per": function (data) {
      var consulta = this.arrayDiabetes.find((x) => x.COD == data);
      if (consulta) this.textos.diabetes_per = consulta.DESCRIP;
    },
    "global_CLAP001.obstetricos.peso_ultprev": function (data) {
      var consulta = this.arrayPesoAnt.find((x) => x.COD == data);
      if (consulta) this.textos.peso_ultimo_previo = consulta.DESCRIP;
      else this.textos.peso_ultimo_previo = "";
    },
    "global_CLAP001.met_antico": function (data) {
      var consulta = this.arrayMetodoAnticonceptivo.find((x) => x.COD == data);
      if (consulta) this.textos.metodo_anticonceptivo = consulta.DESCRIP;
    },
    "global_CLAP001.gest_act.cervix.insp": function (data) {
      var consulta = this.arrayNormalAnormal.find((x) => x.COD == data);
      if (consulta) this.textos.insp_visual = consulta.DESCRIP;
    },
    "global_CLAP001.gest_act.cervix.pap": function (data) {
      var consulta = this.arrayNormalAnormal.find((x) => x.COD == data);
      if (consulta) this.textos.pap = consulta.DESCRIP;
    },
    "global_CLAP001.gest_act.cervix.colp": function (data) {
      var consulta = this.arrayNormalAnormal.find((x) => x.COD == data);
      if (consulta) this.textos.colp = consulta.DESCRIP;
    },
    "global_CLAP001.gest_act.antirube": function (data) {
      var consulta = this.arrayAntirubeola.find((x) => x.COD == data);
      if (consulta) this.textos.antirubeola = consulta.DESCRIP;
    },
    "global_CLAP001.gest_act.toxoplasmosis.sem1_igg": function (data) {
      var consulta = this.arrayPosNegaHizo.find((x) => x.COD == data);
      if (consulta) this.textos.toxo20semMenos = consulta.DESCRIP;
    },
    "global_CLAP001.gest_act.toxoplasmosis.sem2_igg": function (data) {
      var consulta = this.arrayPosNegaHizo.find((x) => x.COD == data);
      if (consulta) this.textos.toxo20semMas = consulta.DESCRIP;
    },
    "global_CLAP001.gest_act.toxoplasmosis.primera_cons_igm": function (data) {
      var consulta = this.arrayPosNegaHizo.find((x) => x.COD == data);
      if (consulta) this.textos.primerConsultIgm = consulta.DESCRIP;
    },
    "global_CLAP001.gest_act.gamaglob_anti_d": function (data) {
      var consulta = this.arrayGamaglobulina.find((x) => x.COD == data);
      if (consulta) this.textos.gamaglob_anti_d = consulta.DESCRIP;
    },
    "global_CLAP001.gest_act.chagas": function (data) {
      var consulta = this.arrayPosNegaHizo.find((x) => x.COD == data);
      if (consulta) this.textos.chagas = consulta.DESCRIP;
    },
    "global_CLAP001.gest_act.malaria": function (data) {
      var consulta = this.arrayPosNegaHizo.find((x) => x.COD == data);
      if (consulta) this.textos.malaria = consulta.DESCRIP;
    },
    "global_CLAP001.bacte_men20sem": function (data) {
      var consulta = this.arrayNormalAnormal.find((x) => x.COD == data);
      if (consulta) this.textos.bacte_men = consulta.DESCRIP;
    },
    "global_CLAP001.bacte_may20sem": function (data) {
      var consulta = this.arrayNormalAnormal.find((x) => x.COD == data);
      if (consulta) this.textos.bacte_mas = consulta.DESCRIP;
    },
    "global_CLAP001.gest_act.estrepto": function (data) {
      var consulta = this.arrayPosNegaHizo.find((x) => x.COD == data);
      if (consulta) this.textos.estrepto = consulta.DESCRIP;
    },
    "global_CLAP001.notrep_men20sem": function (data) {
      var consulta = this.arrayPosNegaSin.find((x) => x.COD == data);
      if (consulta) this.textos.notrep_men20sem = consulta.DESCRIP;
    },
    "global_CLAP001.notrep_may20sem": function (data) {
      var consulta = this.arrayPosNegaSin.find((x) => x.COD == data);
      if (consulta) this.textos.notrep_may20sem = consulta.DESCRIP;
    },
    "global_CLAP001.trep_men20sem": function (data) {
      var consulta = this.arraySIFILIS_1.find((x) => x.COD == data);
      if (consulta) this.textos.trep_men20sem = consulta.DESCRIP;
    },
    "global_CLAP001.trep_may20sem": function (data) {
      var consulta = this.arraySIFILIS_1.find((x) => x.COD == data);
      if (consulta) this.textos.trep_may20sem = consulta.DESCRIP;
    },
    "global_CLAP001.trat_men20sem": function (data) {
      var consulta = this.arraySIFILIS_2.find((x) => x.COD == data);
      if (consulta) this.textos.trat_men20sem = consulta.DESCRIP;
    },
    "global_CLAP001.trat_may20sem": function (data) {
      var consulta = this.arraySIFILIS_2.find((x) => x.COD == data);
      if (consulta) this.textos.trat_may20sem = consulta.DESCRIP;
    },
    "global_CLAP001.tto_pareja_men20sem": function (data) {
      var consulta = this.arraySIFILIS_2.find((x) => x.COD == data);
      if (consulta) this.textos.tto_pareja_men20sem = consulta.DESCRIP;
    },
    "global_CLAP001.tto_pareja_may20sem": function (data) {
      var consulta = this.arraySIFILIS_2.find((x) => x.COD == data);
      if (consulta) this.textos.tto_pareja_may20sem = consulta.DESCRIP;
    },
    "global_CLAP001.datos_parto.corticoides_ante": function (data) {
      var consulta = this.arrayCorticoides.find((x) => x.COD == data);
      if (consulta) this.textos.corticoides = consulta.DESCRIP;
      else this.textos.corticoides = "";
    },
    "global_CLAP001.datos_parto.inicio": function (data) {
      var consulta = this.arrayInicioParto.find((x) => x.COD == data);
      if (consulta) this.textos.inicio = consulta.DESCRIP;
      else this.textos.inicio = "";
    },
    "global_CLAP001.datos_parto.presentacion": function (data) {
      var consulta = this.arrayPrese.find((x) => x.COD == data);
      if (consulta) this.textos.presentacion = consulta.DESCRIP;
      else this.textos.presentacion = "";
    },
    "global_CLAP001.datos_parto.acompanan_tdp": function (data) {
      var consulta = this.arrayAcompanante.find((x) => x.COD == data);
      if (consulta) this.textos.acompanan_tdp = consulta.DESCRIP;
      else this.textos.acompanan_tdp = "";
    },
    "global_CLAP001.datos_parto.fum_eco_p_a": function (data) {
      var consulta = this.arraySegun.find((x) => x.COD == data);
      if (consulta) this.textos.segun = consulta.DESCRIP;
      else this.textos.segun = "";
    },
    "global_CLAP001.datos_parto.enfermedades.diabete": function (data) {
      var consulta = this.arrayDiabetes.find((x) => x.COD == data);
      if (consulta) this.textos.diabetes_enf = consulta.DESCRIP;
      else this.textos.diabetes_enf = "";
    },
    "global_CLAP001.termin_part_nac": function (data) {
      var consulta = this.arrayTerminacionParto.find((x) => x.COD == data);
      if (consulta) this.textos.terminacion_parto = consulta.DESCRIP;
      else this.textos.terminacion_parto = "";
    },
    "global_CLAP001.datos_parto.posic_parto": function (data) {
      var consulta = this.arrayPosicion.find((x) => x.COD == data);
      if (consulta) this.textos.posicion_parto = consulta.DESCRIP;
      else this.textos.posicion_parto = "";
    },
    "global_CLAP001.datos_parto.recienacido.rec_sexo": function (data) {
      var consulta = this.arraySexo.find((x) => x.COD == data);
      if (consulta) this.textos.sexo = consulta.DESCRIP;
    },
    "global_CLAP001.datos_parto.recienacido.fum_eco_rn": function (data) {
      var consulta = this.arraySegun.find((x) => x.COD == data);
      if (consulta) this.textos.segun_recien_nacido = consulta.DESCRIP;
    },
    "global_CLAP001.datos_parto.recienacido.peso_eg": function (data) {
      var consulta = this.arrayPesoEG.find((x) => x.COD == data);
      if (consulta) this.textos.peso_eg_confiable = consulta.DESCRIP;
    },
    "global_CLAP001.datos_parto_2.reciennacido2.referido": function (data) {
      var consulta = this.arrayReferido.find((x) => x.COD == data);
      if (consulta) this.textos.referido = consulta.DESCRIP;
    },
    "global_CLAP001.datos_parto_2.reciennacido2.vdrl_rec": function (data) {
      var consulta = this.arrayPosNegaHizoPend.find((x) => x.COD == data);
      if (consulta) this.textos.vdrl = consulta.DESCRIP;
    },
    "global_CLAP001.datos_parto_2.reciennacido2.trat_vdrl_rec": function (data) {
      var consulta = this.arraySIFILIS_2.find((x) => x.COD == data);
      if (consulta) this.textos.tratamiento = consulta.DESCRIP;
    },
    "global_CLAP001.datos_parto_2.reciennacido2.tsh_rec": function (data) {
      var consulta = this.arrayPosNegaHizoPend.find((x) => x.COD == data);
      if (consulta) this.textos.tsh = consulta.DESCRIP;
    },
    "global_CLAP001.datos_parto_2.reciennacido2.hbpatia_rec": function (data) {
      var consulta = this.arrayPosNegaHizo.find((x) => x.COD == data);
      if (consulta) this.textos.hbpatia = consulta.DESCRIP;
    },
    "global_CLAP001.datos_parto_2.reciennacido2.bilirubina_rec": function (data) {
      var consulta = this.arrayPosNegaHizo.find((x) => x.COD == data);
      if (consulta) this.textos.bilirub = consulta.DESCRIP;
    },
    "global_CLAP001.datos_parto_2.reciennacido2.toxo_igm_rec": function (data) {
      var consulta = this.arrayPosNegaHizo.find((x) => x.COD == data);
      if (consulta) this.textos.toxo_img = consulta.DESCRIP;
    },
    "global_CLAP001.datos_parto_2.reciennacido2.antirubeola_pospart": function (data) {
      var consulta = this.arrayGamaglobulina.find((x) => x.COD == data);
      if (consulta) this.textos.antirubeola_post = consulta.DESCRIP;
    },
    "global_CLAP001.datos_parto_2.reciennacido2.gamaglob_ant_d_rec": function (data) {
      var consulta = this.arrayGamaglobulina.find((x) => x.COD == data);
      if (consulta) this.textos.gamaglob_anti_d_puerp = consulta.DESCRIP;
    },
    "global_CLAP001.datos_parto_2.egreso_rn.aliment_eg_rn": function (data) {
      var consulta = this.arrayAlimentoAlta.find((x) => x.COD == data);
      if (consulta) this.textos.alimento_alta = consulta.DESCRIP;
    },
    "global_CLAP001.datos_parto_2.egreso_materno.anticoncepcion.metodo_ant": function (data) {
      var consulta = this.arrayMetodoEscogido.find((x) => x.COD == data);
      if (consulta) this.textos.metodo_elegido = consulta.DESCRIP;
    },
    "global_CLAP001.obstetricos.gestas": function (data) {
      let gestas = parseInt(data) || 0;

      if (gestas == 0) {
        this.global_CLAP001.obstetricos.ectopico = "";
        this.global_CLAP001.obstetricos.partos = "";
        this.global_CLAP001.obstetricos.abortos = "";
        this.global_CLAP001.obstetricos.consecut3 = "";
        this.global_CLAP001.obstetricos.gemelare = "";
        this.global_CLAP001.obstetricos.vaginal = "";
        this.global_CLAP001.obstetricos.cesareas = "";
        this.global_CLAP001.obstetricos.nacivivo = "";
        this.global_CLAP001.obstetricos.nacimuer = "";
        this.global_CLAP001.obstetricos.viven = "";
        this.global_CLAP001.obstetricos.muert1ra = "";
        this.global_CLAP001.obstetricos.muert2da = "";

        this.mostrarObstetricos = false;
      } else this.mostrarObstetricos = true;
    },
    "global_CLAP001.obstetricos.partos": function (data) {
      let partos = parseInt(data) || 0;
      if (partos == 0) {
        this.global_CLAP001.obstetricos.gemelare = "";
        this.global_CLAP001.obstetricos.vaginal = "";
        this.global_CLAP001.obstetricos.cesareas = "";
        this.global_CLAP001.obstetricos.nacivivo = "";
        this.global_CLAP001.obstetricos.nacimuer = "";
        this.global_CLAP001.obstetricos.viven = "";
        this.global_CLAP001.obstetricos.muert1ra = "";
        this.global_CLAP001.obstetricos.muert2da = "";

        this.global_CLAP001.obstetricos.peso_ultprev = "1";

        this.fechas.embar_ant.ano = "";
        this.fechas.embar_ant.mes = "";
        this.fechas.embar_ant.dia = "";

        this.global_CLAP001.fecha_fin = "";

        this.mostrarObstetricos2 = false;
      } else this.mostrarObstetricos2 = true;
    },
  },
  computed: {
    preguntarConsec: function () {
      let retorno = false;

      let gestas = parseInt(this.global_CLAP001.obstetricos.gestas) || 0;
      let partos = parseInt(this.global_CLAP001.obstetricos.partos) || 0;

      let calculo = gestas - partos;

      this.global_CLAP001.obstetricos.abortos = calculo.toString();

      if (calculo < 3) {
        this.global_CLAP001.obstetricos.consecut3 = "N";
        retorno = false;
      } else retorno = true;

      return retorno;
    },
    calculoCesareas: function () {
      let partos = parseInt(this.global_CLAP001.obstetricos.partos) || 0;
      let vaginal = parseInt(this.global_CLAP001.obstetricos.vaginal) || 0;

      let calculo = partos - vaginal;
      this.global_CLAP001.obstetricos.cesareas = calculo.toString();

      return this.global_CLAP001.obstetricos.cesareas;
    },
    calculoMuerte2sem: function () {
      let nacivivos = parseInt(this.global_CLAP001.obstetricos.nacivivo) || 0;
      let viven = parseInt(this.global_CLAP001.obstetricos.viven) || 0;
      let muert1ra = parseInt(this.global_CLAP001.obstetricos.muert1ra) || 0;

      let calculo = nacivivos - viven - muert1ra;
      this.global_CLAP001.obstetricos.muert2da = calculo.toString();

      return this.global_CLAP001.obstetricos.muert2da;
    },
  },
  methods: {
    asignarNombreTablaTrim(index) {
      let descrip = "";

      switch (index) {
        case 0:
          descrip = "1er trim";
          break;
        case 1:
          descrip = "2do trim";
          break;
        case 2:
          descrip = "3er trim";
          break;
      }

      return descrip;
    },
    validarPaciente() {
      // condiciones de sexo y edad
      let unidad = $_REG_HC.edad_hc.unid_edad || "";
      let edad = parseInt($_REG_HC.edad_hc.vlr_edad) || 0;
      console.log(this.datosPaciente.SEXO, unidad, edad);

      if (this.datosPaciente.SEXO == "M") {
        CON851("", "SEXO MASCULINO !", null, "error", "Error");
        this.salir_CLAP001();
      } else if (unidad != "A" || edad < 8 || edad > 55) {
        CON851("", "Edad incompatible !", null, "error", "Error");
        this.salir_CLAP001();
      } else this.traerHistoriaClinica();
    },
    traerHistoriaClinica() {
      postData(
        {
          datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|" + "1" + "|",
        },
        get_url("APP/HICLIN/GET_HC.DLL")
      )
        .then((data) => {
          this.historia_clinica = data;
          this.traerHistorias();
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          CON851("", "Error consultando historia clinica", null, "error", "Error");
          _this.salir_CLAP001();
        });
    },
    traerHistorias() {
      var _this = this;

      loader("show");
      postData({ datosh: datosEnvio() + $_REG_HC.id_paciente + "|" }, get_url("APP/HICLIN/CLAP811.DLL"))
        .then(function (data) {
          loader("hide");
          _this.historiasClap = data.HISTORIAS;
          console.log(_this.historiasClap);
          _this.ventanaHistoriasCLAP();
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          CON851("", "Error consultando historias CLAP", null, "error", "Error");
          _this.salir_CLAP001();
        });
    },
    ventanaHistoriasCLAP() {
      var _this = this;

      _ventanaDatos({
        titulo: this.datosPaciente.DESCRIP,
        columnas: ["FOLIO", "FECHA", "MEDICO", "ESTADO"],
        data: this.historiasClap,
        ancho: "70%",
        callback_esc: () => {
          _this.salir_CLAP001();
        },
        callback: (data) => {
          this.HistoriaEscogida = data.LLAVE;

          _this.consultarClap();
        },
      });
    },
    consultarClap() {
      // aca debe llamar al dll para traer registro completo
      var _this = this;

      loader("show");
      postData(
        { datosh: datosEnvio() + _this.HistoriaEscogida + "|" + $_REG_HC.llave_hc + "|" },
        get_url("APP/HICLIN/CLAP001.DLL")
      )
        .then(function (data) {
          loader("hide");
          _this.global_CLAP001 = data.REG_CLAP[0];
          console.log(_this.global_CLAP001);

          switch (_this.global_CLAP001.novedad) {
            case "7":
              _this.primeraVez = true;
              _this.asignarDatosNuevo();
              break;
            case "8":
              _this.asignarDatosModif();
              break;
          }
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          CON851("", "Error consultando registro CLAP", null, "error", "Error");
          _this.ventanaHistoriasCLAP();
        });
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
    asignarDatosNuevo() {
      this.global_CLAP001.fecha = moment().format("YYYYMMDD");
      this.global_CLAP001.hora = moment().format("HHmm");

      this.global_CLAP001.oper_crea = localStorage.Usuario;
      this.global_CLAP001.fech_crea = moment().format("YYYYMMDD");

      this.global_CLAP001.lug_ctr_prenatal = this.datosPaciente.CIUDAD;

      this.global_CLAP001.estado = "1";

      this.global_CLAP001.med_abre = this.datosProfesional.IDENTIFICACION.trim();
      this.global_CLAP001.descrip_med_abre =
        parseInt(this.datosProfesional.IDENTIFICACION) + " - " + this.datosProfesional.NOMBRE.trim();

      switch (this.datosPaciente.ETNIA) {
        case "1":
          this.global_CLAP001.raza = "2";
          break;
        case "6":
          this.global_CLAP001.raza = "3";
          break;
        case "4":
          this.global_CLAP001.raza = "4";
          break;
        default:
          this.global_CLAP001.raza = "1";
          break;
      }

      this.asignarDatos_2();
    },
    asignarDatosModif() {
      let _this = this;

      [this.fechas.embar_ant.ano, this.fechas.embar_ant.mes, this.fechas.embar_ant.dia] = this.devolverFecha(
        this.global_CLAP001.fecha_fin
      );

      [this.fechas.fpp.ano, this.fechas.fpp.mes, this.fechas.fpp.dia] = this.devolverFecha(
        this.global_CLAP001.gest_act.fpp
      );

      [this.fechas.ingreso.ano, this.fechas.ingreso.mes, this.fechas.ingreso.dia] = this.devolverFecha(
        this.global_CLAP001.datos_parto.fec_ingreso
      );

      [this.fechas.ruptura.ano, this.fechas.ruptura.mes, this.fechas.ruptura.dia] = this.devolverFecha(
        this.global_CLAP001.datos_parto.rupt_memb_anteparto.fecha_rup
      );

      [this.fechas.nacim.ano, this.fechas.nacim.mes, this.fechas.nacim.dia] = this.devolverFecha(
        this.global_CLAP001.datos_parto.fecha_dia2
      );

      [this.fechas.egreso_rn.ano, this.fechas.egreso_rn.mes, this.fechas.egreso_rn.dia] = this.devolverFecha(
        this.global_CLAP001.datos_parto_2.egreso_rn.fecha_eg_rn
      );

      [this.fechas.egreso_mt.ano, this.fechas.egreso_mt.mes, this.fechas.egreso_mt.dia] = this.devolverFecha(
        this.global_CLAP001.datos_parto_2.egreso_materno.fecha_eg_mt
      );

      this.global_CLAP001.tabla_gest.forEach((element, index) => {
        let cons_pres = _this.arrayPrese.find((x) => x.COD == element.present_gest);
        if (cons_pres) _this.textos.tabla_gest[index].prese = cons_pres.DESCRIP;

        let cons_movf = _this.arrayPosNega.find((x) => x.COD == element.mov_fetal_gest);
        if (cons_movf) _this.textos.tabla_gest[index].mov_f = cons_movf.DESCRIP;

        let cons_prote = _this.arrayPosNegaHizo.find((x) => x.COD == element.prote_gest);
        if (cons_prote) _this.textos.tabla_gest[index].prote = cons_prote.DESCRIP;
      });

      this.global_CLAP001.datos_parto.trabajo_parto.forEach((element, index) => {
        let cons_par = _this.arrayAcompanante.find((x) => x.COD == element.compan_par);
        if (cons_par) _this.textos.tabla_parto[index].compania = cons_par.DESCRIP;

        let cons_pos = _this.arrayPosicion.find((x) => x.COD == element.posici_par);
        if (cons_pos) _this.textos.tabla_parto[index].posicion = cons_pos.DESCRIP;

        let cons_po = _this.arrayPosicion.find((x) => x.COD == element.vari_po_par);
        if (cons_po) _this.textos.tabla_parto[index].var_posicion = cons_po.DESCRIP;

        let cons_meconi = _this.arrayPosNega.find((x) => x.COD == element.meconi_par);
        if (cons_meconi) _this.textos.tabla_parto[index].meconio = cons_meconi.DESCRIP;
      });

      this.global_CLAP001.datos_parto_2.reciennacido2.puerperio.forEach((element, index) => {
        let cons_inv = _this.arrayInvolUter.find((x) => x.COD == element.invol_uter_puer);
        if (cons_inv) _this.textos.tabla_puerperio[index].invol = cons_inv.DESCRIP;

        let cons_loq = _this.arrayLoquios.find((x) => x.COD == element.loquios_puer);
        if (cons_loq) _this.textos.tabla_puerperio[index].loquios = cons_loq.DESCRIP;
      });

      this.global_CLAP001.observaciones = this.global_CLAP001.observaciones.replace(/\&/g, "\n").trim();

      if (this.global_CLAP001.datos_parto.aborto == "S") this.ocultarAborto = true;
      else this.ocultarAborto = false;

      this.asignarDatos_2();
    },
    asignarDatos_2() {
      [this.fechas.fum.ano, this.fechas.fum.mes, this.fechas.fum.dia] = this.devolverFecha(
        this.global_CLAP001.gest_act.fum
      );

      this.datosExt.grupo_sang = this.datosPaciente["GRP-SANG"];
      this.datosExt.rh = this.datosPaciente.RH;

      this.textos.HORA = this.global_CLAP001.hora.substring(0, 2);
      this.textos.MINUTO = this.global_CLAP001.hora.substring(2, 4);

      [this.textos.ANO, this.textos.MES, this.textos.DIA] = this.devolverFecha(this.global_CLAP001.fecha);

      let active = $("#navegacion").find("li.opcion-menu.active");
      var opcion = active[0].attributes[2].nodeValue;

      if (opcion == "0A2") this.impresion();
      else if (this.global_CLAP001.estado == "2") {
        CON851("", "Historia CLAP está cerrada", null, "error", "Error");
        this.ventanaHistoriasCLAP();
      } else {
        if (this.global_CLAP001.novedad == "8") {
          CON851P("Desea ir directo a tabla controles ?", this.validarRaza, () => {
            this.validarTablaGestAno(0);
          });
        } else this.validarRaza();
      }
    },
    validarRaza() {
      let _this = this;

      if (this.global_CLAP001.raza == "") this.global_CLAP001.raza = "1";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Raza ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayRaza,
            callback_f: () => {
              CON851P(
                "Seguro que desea salir sin guardar?",
                () => _this.validarRaza(),
                () => {
                  _this.salir_CLAP001();
                }
              );
            },
            seleccion: this.global_CLAP001.raza,
            teclaAlterna: true,
            id_input: "#validarRaza",
          },
          (data) => {
            _this.global_CLAP001.raza = data.COD;

            _this.validarAlfabeta();
          }
        );
      }, 300);
    },
    validarAlfabeta() {
      validarInputs(
        {
          form: "#validarAlfabeta",
          orden: "1",
        },
        () => this.validarRaza(),
        () => {
          this.global_CLAP001.alfab = this.validarSiNo(this.global_CLAP001.alfab);

          this.validarEstudios();
        }
      );
    },
    validarEstudios() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Estudios ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayEstudios,
            callback_f: () => _this.validarAlfabeta(),
            seleccion: this.global_CLAP001.estud,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_CLAP001.estud = data.COD;

            if (_this.global_CLAP001.alfab == "S") _this.validarAnosMayorNivel();
            else {
              _this.global_CLAP001.an_may_niv_est = "0";
              _this.validarViveSola();
            }
          }
        );
      }, 300);
    },
    validarAnosMayorNivel() {
      validarInputs(
        {
          form: "#validarAnosMayorNivel",
          orden: "1",
        },
        () => this.validarEstudios(),
        () => {
          this.global_CLAP001.an_may_niv_est = this.validarNumero(this.global_CLAP001.an_may_niv_est);

          let nro = parseInt(this.global_CLAP001.an_may_niv_est);
          let nivel = parseInt(this.global_CLAP001.estud);

          if ((nivel > 1 && nro == 0) || (nivel == 2 && nro > 5) || (nivel == 3 && nro > 6)) {
            CON851("", "Dato fuera de rango !", null, "error", "Error");
            this.validarAnosMayorNivel();
          } else this.validarViveSola();
        }
      );
    },
    validarViveSola() {
      validarInputs(
        {
          form: "#validarViveSola",
          orden: "1",
        },
        () => {
          if (this.global_CLAP001.alfab == "S") this.validarAnosMayorNivel();
          else this.validarEstudios();
        },
        () => {
          this.global_CLAP001.vive_sola = this.validarSiNo(this.global_CLAP001.vive_sola);

          this.validarLugarPrenatal();
        }
      );
    },
    traerCiudades() {
      var _this = this;
      $("#codCiudadClap001").prop("disabled", true);

      loader("show");
      postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON809.DLL"))
        .then(function (data) {
          loader("hide");
          _this.ciudades = data.CIUDAD;
          _this.ciudades.pop();
          _this.ventanaCiudades();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error consultando todas las ciudades", null, "error", "Error");
          loader("hide");
          $("#codCiudadClap001").removeAttr("disabled");
          $("#codCiudadClap001").focus();
        });
    },
    ventanaCiudades() {
      var _this = this;

      _ventanaDatos({
        titulo: "Ventana ciudades",
        columnas: ["COD", "NOMBRE", "DEPART"],
        data: this.ciudades,
        ancho: "60%",
        callback_esc: () => {
          $("#codCiudadClap001").removeAttr("disabled");
          $("#codCiudadClap001").focus();
        },
        callback: (data) => {
          _this.global_CLAP001.lug_ctr_prenatal = data.COD;
          _this.textos.ciudad_prenatal = data.NOMBRE;
          setTimeout(() => _enterInput("#codCiudadClap001"), 100);
        },
      });
    },
    validarLugarPrenatal() {
      validarInputs(
        {
          form: "#validarLugarPrenatal",
          orden: "1",
        },
        () => this.validarViveSola(),
        () => {
          this.consultarCiudadDig();
        }
      );
    },
    consultarCiudadDig() {
      loader("show");
      var _this = this;
      var data = {
        datosh: datosEnvio(),
        CIUDAD: this.global_CLAP001.lug_ctr_prenatal.padStart(5, "0"),
      };

      postData(data, get_url("APP/CONTAB/CON809.DLL"))
        .then(function (data) {
          console.log(data);
          loader("hide");
          _this.textos.ciudad_prenatal = data.NOMBRE;
          _this.validarAntecFam_TBC();
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          _this.textos.ciudad_prenatal = "NO ENCONTRADA";
          _this.validarLugarPrenatal();
        });
    },
    validarAntecFam_TBC() {
      validarInputs(
        {
          form: "#validarAntecFam_TBC",
          orden: "1",
        },
        () => this.validarLugarPrenatal(),
        () => {
          this.global_CLAP001.antecedentes_familiares.tbc_fam = this.validarSiNo(
            this.global_CLAP001.antecedentes_familiares.tbc_fam
          );

          this.validarAntecFam_diabetes();
        }
      );
    },
    validarAntecFam_diabetes() {
      validarInputs(
        {
          form: "#validarAntecFam_diabetes",
          orden: "1",
        },
        () => this.validarAntecFam_TBC(),
        () => {
          this.global_CLAP001.antecedentes_familiares.diab_fam = this.validarSiNo(
            this.global_CLAP001.antecedentes_familiares.diab_fam
          );

          this.validarAntecFam_hipertension();
        }
      );
    },
    validarAntecFam_hipertension() {
      validarInputs(
        {
          form: "#validarAntecFam_hipertension",
          orden: "1",
        },
        () => this.validarAntecFam_diabetes(),
        () => {
          this.global_CLAP001.antecedentes_familiares.hiper_fam = this.validarSiNo(
            this.global_CLAP001.antecedentes_familiares.hiper_fam
          );

          this.validarAntecFam_preeclampsia();
        }
      );
    },
    validarAntecFam_preeclampsia() {
      validarInputs(
        {
          form: "#validarAntecFam_preeclampsia",
          orden: "1",
        },
        () => this.validarAntecFam_hipertension(),
        () => {
          this.global_CLAP001.antecedentes_familiares.preeclam_fam = this.validarSiNo(
            this.global_CLAP001.antecedentes_familiares.preeclam_fam
          );

          this.validarAntecFam_eclampsia();
        }
      );
    },
    validarAntecFam_eclampsia() {
      validarInputs(
        {
          form: "#validarAntecFam_eclampsia",
          orden: "1",
        },
        () => this.validarAntecFam_preeclampsia(),
        () => {
          this.global_CLAP001.antecedentes_familiares.eclam_fam = this.validarSiNo(
            this.global_CLAP001.antecedentes_familiares.eclam_fam
          );

          this.validarAntecFam_otros();
        }
      );
    },
    validarAntecFam_otros() {
      validarInputs(
        {
          form: "#validarAntecFam_otros",
          orden: "1",
        },
        () => this.validarAntecFam_eclampsia(),
        () => {
          this.global_CLAP001.antecedentes_familiares.otros_fam = this.validarSiNo(
            this.global_CLAP001.antecedentes_familiares.otros_fam
          );

          if (this.global_CLAP001.antecedentes_familiares.otros_fam == "S") this.validarAntecFam_otros_text();
          else {
            this.global_CLAP001.antecedentes_familiares.descr_otros_fam = "";
            this.validarAntecPer_TBC();
          }
        }
      );
    },
    validarAntecFam_otros_text() {
      validarInputs(
        {
          form: "#validarAntecFam_otros_text",
          orden: "1",
        },
        () => this.validarAntecFam_otros(),
        () => {
          this.global_CLAP001.antecedentes_familiares.descr_otros_fam =
            this.global_CLAP001.antecedentes_familiares.descr_otros_fam.trim();

          this.validarAntecPer_TBC();
        }
      );
    },
    validarAntecPer_TBC() {
      validarInputs(
        {
          form: "#validarAntecPer_TBC",
          orden: "1",
        },
        () => {
          if (this.global_CLAP001.antecedentes_familiares.otros_fam == "S") this.validarAntecFam_otros_text();
          else this.validarAntecFam_otros();
        },
        () => {
          this.global_CLAP001.antecedentes_personales.tbc_per = this.validarSiNo(
            this.global_CLAP001.antecedentes_personales.tbc_per
          );

          this.validarAntecPer_diabetes();
        }
      );
    },
    validarAntecPer_diabetes() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Diabetes ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayDiabetes,
            callback_f: () => _this.validarAntecPer_TBC(),
            seleccion: this.global_CLAP001.antecedentes_personales.diab_per,
            teclaAlterna: true,
            id_input: "#validarAntecPer_diabetes",
          },
          (data) => {
            _this.global_CLAP001.antecedentes_personales.diab_per = data.COD;
            _this.validarAntecPer_hipertension();
          }
        );
      }, 300);
    },
    validarAntecPer_hipertension() {
      validarInputs(
        {
          form: "#validarAntecPer_hipertension",
          orden: "1",
        },
        () => this.validarAntecPer_diabetes(),
        () => {
          this.global_CLAP001.antecedentes_personales.hiper_per = this.validarSiNo(
            this.global_CLAP001.antecedentes_personales.hiper_per
          );

          this.validarAntecPer_preeclampsia();
        }
      );
    },
    validarAntecPer_preeclampsia() {
      validarInputs(
        {
          form: "#validarAntecPer_preeclampsia",
          orden: "1",
        },
        () => this.validarAntecPer_hipertension(),
        () => {
          this.global_CLAP001.antecedentes_personales.preeclam_per = this.validarSiNo(
            this.global_CLAP001.antecedentes_personales.preeclam_per
          );

          this.validarAntecPer_eclampsia();
        }
      );
    },
    validarAntecPer_eclampsia() {
      validarInputs(
        {
          form: "#validarAntecPer_eclampsia",
          orden: "1",
        },
        () => this.validarAntecPer_preeclampsia(),
        () => {
          this.global_CLAP001.antecedentes_personales.eclam_per = this.validarSiNo(
            this.global_CLAP001.antecedentes_personales.eclam_per
          );

          this.validarAntecPer_otros();
        }
      );
    },
    validarAntecPer_otros() {
      validarInputs(
        {
          form: "#validarAntecPer_otros",
          orden: "1",
        },
        () => this.validarAntecPer_eclampsia(),
        () => {
          this.global_CLAP001.antecedentes_personales.otros_per = this.validarSiNo(
            this.global_CLAP001.antecedentes_personales.otros_per
          );

          if (this.global_CLAP001.antecedentes_personales.otros_per == "S") this.validarAntecPer_otros_text();
          else {
            this.global_CLAP001.antecedentes_personales.descr_otros_per = "";
            this.validarAntecPer_cirugia();
          }
        }
      );
    },
    validarAntecPer_otros_text() {
      validarInputs(
        {
          form: "#validarAntecPer_otros_text",
          orden: "1",
        },
        () => this.validarAntecPer_otros(),
        () => {
          this.global_CLAP001.antecedentes_personales.descr_otros_per =
            this.global_CLAP001.antecedentes_personales.descr_otros_per.trim();

          this.validarAntecPer_cirugia();
        }
      );
    },
    validarAntecPer_cirugia() {
      validarInputs(
        {
          form: "#validarAntecPer_cirugia",
          orden: "1",
        },
        () => {
          if (this.global_CLAP001.antecedentes_personales.otros_per == "S") this.validarAntecPer_otros_text();
          else this.validarAntecPer_otros();
        },
        () => {
          this.global_CLAP001.cirugia = this.validarSiNo(this.global_CLAP001.cirugia);

          this.validarAntecPer_infertilidad();
        }
      );
    },
    validarAntecPer_infertilidad() {
      validarInputs(
        {
          form: "#validarAntecPer_infertilidad",
          orden: "1",
        },
        () => this.validarAntecPer_cirugia(),
        () => {
          this.global_CLAP001.infertil = this.validarSiNo(this.global_CLAP001.infertil);

          this.validarAntecPer_cardio();
        }
      );
    },
    validarAntecPer_cardio() {
      validarInputs(
        {
          form: "#validarAntecPer_cardio",
          orden: "1",
        },
        () => this.validarAntecPer_infertilidad(),
        () => {
          this.global_CLAP001.cardio = this.validarSiNo(this.global_CLAP001.cardio);

          this.validarAntecPer_nefropatia();
        }
      );
    },
    validarAntecPer_nefropatia() {
      validarInputs(
        {
          form: "#validarAntecPer_nefropatia",
          orden: "1",
        },
        () => this.validarAntecPer_cardio(),
        () => {
          this.global_CLAP001.nefropatia = this.validarSiNo(this.global_CLAP001.nefropatia);

          this.validarAntecPer_violencia();
        }
      );
    },
    validarAntecPer_violencia() {
      validarInputs(
        {
          form: "#validarAntecPer_violencia",
          orden: "1",
        },
        () => this.validarAntecPer_nefropatia(),
        () => {
          this.global_CLAP001.violencia = this.validarSiNo(this.global_CLAP001.violencia);

          // this.validarGestasPrevias();
          this.guardarClap(this.validarAntecPer_violencia, () => {
            if (this.global_CLAP001.novedad == "7") this.global_CLAP001.novedad = "8";
            this.validarGestasPrevias();
          });
        }
      );
    },
    validarGestasPrevias() {
      validarInputs(
        {
          form: "#validarGestasPrevias",
          orden: "1",
        },
        () => this.validarAntecPer_violencia(),
        () => {
          this.global_CLAP001.obstetricos.gestas = this.validarNumero(this.global_CLAP001.obstetricos.gestas);

          let gestas = parseInt(this.global_CLAP001.obstetricos.gestas);

          if (gestas > 25) {
            CON851("", "Límite son 25 !", null, "error", "Error");
            this.validarGestasPrevias();
          } else if (gestas == 0) this.validarEmbarazoPlaneado();
          else this.validarEmbarEctopico();
        }
      );
    },
    validarEmbarEctopico() {
      validarInputs(
        {
          form: "#validarEmbarEctopico",
          orden: "1",
        },
        () => this.validarGestasPrevias(),
        () => {
          this.global_CLAP001.obstetricos.ectopico = this.validarNumero(this.global_CLAP001.obstetricos.ectopico);

          let gestas = parseInt(this.global_CLAP001.obstetricos.gestas);
          let ectopico = parseInt(this.global_CLAP001.obstetricos.ectopico);

          if (ectopico > gestas) {
            CON851("", "Mayor a gestas previas !", null, "error", "Error");
            this.validarEmbarEctopico();
          } else this.validarPartos();
        }
      );
    },
    validarPartos() {
      validarInputs(
        {
          form: "#validarPartos",
          orden: "1",
        },
        () => this.validarEmbarEctopico(),
        () => {
          this.global_CLAP001.obstetricos.partos = this.validarNumero(this.global_CLAP001.obstetricos.partos);

          let gestas = parseInt(this.global_CLAP001.obstetricos.gestas);
          let partos = parseInt(this.global_CLAP001.obstetricos.partos);

          if (partos > gestas) {
            CON851("", "Mayor a gestas previas !", null, "error", "Error");
            this.validarPartos();
          } else if (this.preguntarConsec) this.validar3AbortosConsecutivos();
          else {
            this.global_CLAP001.obstetricos.consecut3 = "";
            if (partos == 0) {
              this.global_CLAP001.obstetricos.peso_ultprev = "";
              this.validarEmbarazoPlaneado();
            } else this.validarPartosGemelares();
          }
        }
      );
    },
    validar3AbortosConsecutivos() {
      validarInputs(
        {
          form: "#validar3AbortosConsecutivos",
          orden: "1",
        },
        () => this.validarPartos(),
        () => {
          this.global_CLAP001.obstetricos.consecut3 = this.validarSiNo(this.global_CLAP001.obstetricos.consecut3);

          let partos = parseInt(this.global_CLAP001.obstetricos.partos);

          if (partos == 0) {
            this.global_CLAP001.obstetricos.peso_ultprev = "";
            this.validarEmbarazoPlaneado();
          } else this.validarPartosGemelares();
        }
      );
    },
    validarPartosGemelares() {
      validarInputs(
        {
          form: "#validarPartosGemelares",
          orden: "1",
        },
        () => {
          if (this.preguntarConsec) this.validar3AbortosConsecutivos();
          else this.validarPartos();
        },
        () => {
          this.global_CLAP001.obstetricos.gemelare = this.validarSiNo(this.global_CLAP001.obstetricos.gemelare);

          this.validarPartosVaginales();
        }
      );
    },
    validarPartosVaginales() {
      validarInputs(
        {
          form: "#validarPartosVaginales",
          orden: "1",
        },
        () => this.validarPartosGemelares(),
        () => {
          this.global_CLAP001.obstetricos.vaginal = this.validarNumero(this.global_CLAP001.obstetricos.vaginal);

          let partos = parseInt(this.global_CLAP001.obstetricos.partos);
          let partosVaginales = parseInt(this.global_CLAP001.obstetricos.vaginal);

          if (partosVaginales > partos) {
            CON851("", "Dato mayor a partos !", null, "error", "Error");
            this.validarPartosVaginales();
          } else this.validarNacidosVivos();
        }
      );
    },
    validarNacidosVivos() {
      validarInputs(
        {
          form: "#validarNacidosVivos",
          orden: "1",
        },
        () => this.validarPartosVaginales(),
        () => {
          this.global_CLAP001.obstetricos.nacivivo = this.validarNumero(this.global_CLAP001.obstetricos.nacivivo);

          let partos = parseInt(this.global_CLAP001.obstetricos.partos);
          let nacivivos = parseInt(this.global_CLAP001.obstetricos.nacivivo);
          let gemelar = this.global_CLAP001.obstetricos.gemelare;

          if (nacivivos > partos && gemelar == "N") {
            CON851("", "Dato mayor a partos !", null, "error", "Error");
            this.validarNacidosVivos();
          } else if (gemelar == "S") {
            this.validarNacidosMuertos();
          } else {
            let calculo = partos - nacivivos;
            this.global_CLAP001.obstetricos.nacimuer = calculo.toString();
            this.validarViven();
          }
        }
      );
    },
    validarNacidosMuertos() {
      validarInputs(
        {
          form: "#validarNacidosMuertos",
          orden: "1",
        },
        () => this.validarNacidosVivos(),
        () => {
          this.global_CLAP001.obstetricos.nacimuer = this.validarNumero(this.global_CLAP001.obstetricos.nacimuer);

          let nacimuer = parseInt(this.global_CLAP001.obstetricos.nacimuer);

          if (nacimuer > 10) {
            CON851("", "Límite es 10 !", null, "error", "Error");
            this.validarNacidosMuertos();
          } else this.validarViven();
        }
      );
    },
    validarViven() {
      validarInputs(
        {
          form: "#validarViven",
          orden: "1",
        },
        () => {
          if (this.global_CLAP001.obstetricos.gemelare == "S") this.validarNacidosMuertos();
          else this.validarNacidosVivos();
        },
        () => {
          this.global_CLAP001.obstetricos.viven = this.validarNumero(this.global_CLAP001.obstetricos.viven);

          let viven = parseInt(this.global_CLAP001.obstetricos.viven);
          let nacivivos = parseInt(this.global_CLAP001.obstetricos.nacivivo);

          if (viven > nacivivos) {
            CON851("", "Mayor a nacidos vivos !", null, "error", "Error");
            this.validarViven();
          } else if (viven == nacivivos) {
            this.global_CLAP001.obstetricos.muert1ra = "00";
            this.validarPesoUltPrevio();
          } else this.validarMuerte1sem();
        }
      );
    },
    validarMuerte1sem() {
      validarInputs(
        {
          form: "#validarMuerte1sem",
          orden: "1",
        },
        () => this.validarViven(),
        () => {
          this.global_CLAP001.obstetricos.muert1ra = this.validarNumero(this.global_CLAP001.obstetricos.muert1ra);

          let muert1ra = parseInt(this.global_CLAP001.obstetricos.muert1ra);
          let calculo =
            parseInt(this.global_CLAP001.obstetricos.nacivivo) - parseInt(this.global_CLAP001.obstetricos.viven);

          if (muert1ra > calculo) {
            CON851("", "No coincide con # de vivos", null, "error", "Error");
            this.validarMuerte1sem();
          } else this.validarPesoUltPrevio();
        }
      );
    },
    validarPesoUltPrevio() {
      let _this = this;

      if (this.global_CLAP001.obstetricos.peso_ultprev == "") this.global_CLAP001.obstetricos.peso_ultprev = "1";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Peso previo ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPesoAnt,
            callback_f: () => {
              if (
                parseInt(this.global_CLAP001.obstetricos.viven) == parseInt(this.global_CLAP001.obstetricos.nacivivo)
              ) {
                this.validarViven();
              } else this.validarMuerte1sem();
            },
            seleccion: this.global_CLAP001.obstetricos.peso_ultprev,
            teclaAlterna: true,
            id_input: "#validarPesoUltPrevio",
          },
          (data) => {
            _this.global_CLAP001.obstetricos.peso_ultprev = data.COD;
            _this.validarFechaFinEmbar_ano();
          }
        );
      }, 300);
    },
    validarFechaFinEmbar_ano() {
      validarInputs(
        {
          form: "#validarFechaFinEmbar_ano",
          orden: "1",
        },
        () => this.validarPesoUltPrevio(),
        () => {
          let ano = parseInt(this.fechas.embar_ant.ano) || 0;

          if (ano < 1900) {
            CON851("37", "Año fuera de rango", null, "error", "Error");
            this.validarFechaFinEmbar_ano();
          } else this.validarFechaFinEmbar_mes();
        }
      );
    },
    validarFechaFinEmbar_mes() {
      validarInputs(
        {
          form: "#validarFechaFinEmbar_mes",
          orden: "1",
        },
        () => this.validarFechaFinEmbar_ano(),
        () => {
          let mes = parseInt(this.fechas.embar_ant.mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "Mes fuera de rango", null, "error", "Error");
            this.validarFechaFinEmbar_mes();
          } else this.validarFechaFinEmbar_dia();
        }
      );
    },
    validarFechaFinEmbar_dia() {
      validarInputs(
        {
          form: "#validarFechaFinEmbar_dia",
          orden: "1",
        },
        () => this.validarFechaFinEmbar_mes(),
        () => {
          let dia_num = parseInt(this.fechas.embar_ant.dia) || 0;

          let fecha_act = parseInt(moment().format("YYYYMMDD")) || 0;

          let ano = this.fechas.embar_ant.ano;
          let mes = this.fechas.embar_ant.mes;
          let dia = this.fechas.embar_ant.dia;

          let fecha_dig =
            parseInt(
              this.fechas.embar_ant.ano +
                this.fechas.embar_ant.mes.padStart(2, "0") +
                this.fechas.embar_ant.dia.padStart(2, "0")
            ) || 0;

          if (dia_num < 1 || dia_num > 31) {
            CON851("37", "Dia fuera de rango", null, "error", "Error");
            this.validarFechaFinEmbar_dia();
          } else if (!_validarFecha(ano, mes, dia)) {
            CON851("37", "Fecha fuera de rango", null, "error", "Error");
            this.validarFechaFinEmbar_dia();
          } else if (fecha_dig > fecha_act) {
            CON851("37", "Fecha mayor a actual!", null, "error", "Error");
            this.validarFechaFinEmbar_dia();
          } else {
            this.global_CLAP001.fecha_fin =
              this.fechas.embar_ant.ano +
              this.fechas.embar_ant.mes.padStart(2, "0") +
              this.fechas.embar_ant.dia.padStart(2, "0");

            this.validarEmbarazoPlaneado();
          }
        }
      );
    },
    validarEmbarazoPlaneado() {
      validarInputs(
        {
          form: "#validarEmbarazoPlaneado",
          orden: "1",
        },
        () => {
          if (parseInt(this.global_CLAP001.obstetricos.gestas) == 0) this.validarGestasPrevias();
          else if (parseInt(this.global_CLAP001.obstetricos.partos) == 0) {
            if (this.preguntarConsec) this.validar3AbortosConsecutivos();
            else this.validarPartos();
          } else this.validarFechaFinEmbar_dia();
        },
        () => {
          this.global_CLAP001.embar_planeado = this.validarSiNo(this.global_CLAP001.embar_planeado);

          this.validarMetodoAnticonceptivo();
        }
      );
    },
    validarMetodoAnticonceptivo() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Método anticonceptivo ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayMetodoAnticonceptivo,
            callback_f: () => this.validarEmbarazoPlaneado(),
            seleccion: this.global_CLAP001.met_antico,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_CLAP001.met_antico = data.COD;
            _this.guardarClap(_this.validarMetodoAnticonceptivo, _this.validarPesoAnterior);
          }
        );
      }, 300);
    },
    validarPesoAnterior() {
      validarInputs(
        {
          form: "#validarPesoAnterior",
          orden: "1",
        },
        () => this.validarMetodoAnticonceptivo(),
        () => {
          this.global_CLAP001.gest_act.peso_ant_gest = this.validarNumero(
            this.global_CLAP001.gest_act.peso_ant_gest,
            3
          );

          this.validarTalla();
        }
      );
    },
    validarTalla() {
      validarInputs(
        {
          form: "#validarTalla",
          orden: "1",
        },
        () => this.validarPesoAnterior(),
        () => {
          this.global_CLAP001.gest_act.talla_gest = this.validarNumero(this.global_CLAP001.gest_act.talla_gest, 3);

          this.validarFechaFum_ano();
        }
      );
    },
    validarFechaFum_ano() {
      validarInputs(
        {
          form: "#validarFechaFum_ano",
          orden: "1",
        },
        () => this.validarTalla(),
        () => {
          let ano = parseInt(this.fechas.fum.ano) || 0;

          if (ano < 1900) {
            CON851("37", "Año fuera de rango", null, "error", "Error");
            this.validarFechaFum_ano();
          } else this.validarFechaFum_mes();
        }
      );
    },
    validarFechaFum_mes() {
      validarInputs(
        {
          form: "#validarFechaFum_mes",
          orden: "1",
        },
        () => this.validarFechaFum_ano(),
        () => {
          let mes = parseInt(this.fechas.fum.mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "Mes fuera de rango", null, "error", "Error");
            this.validarFechaFum_mes();
          } else this.validarFechaFum_dia();
        }
      );
    },
    validarFechaFum_dia() {
      validarInputs(
        {
          form: "#validarFechaFum_dia",
          orden: "1",
        },
        () => this.validarFechaFum_mes(),
        () => {
          let dia_num = parseInt(this.fechas.fum.dia) || 0;

          let ano = this.fechas.fum.ano;
          let mes = this.fechas.fum.mes;
          let dia = this.fechas.fum.dia;

          if (dia_num < 1 || dia_num > 31) {
            CON851("37", "Dia fuera de rango", null, "error", "Error");
            this.validarFechaFum_dia();
          } else if (!_validarFecha(ano, mes, dia)) {
            CON851("37", "Fecha fuera de rango", null, "error", "Error");
            this.validarFechaFum_dia();
          } else {
            this.preValidarFechaFpp();
          }
        }
      );
    },
    preValidarFechaFpp() {
      this.global_CLAP001.gest_act.fum =
        this.fechas.fum.ano + this.fechas.fum.mes.padStart(2, "0") + this.fechas.fum.dia.padStart(2, "0");

      this.global_CLAP001.gest_act.fpp = this.calcularFechaFpp(moment(this.global_CLAP001.gest_act.fum)).format(
        "YYYYMMDD"
      );

      [this.fechas.fpp.ano, this.fechas.fpp.mes, this.fechas.fpp.dia] = this.devolverFecha(
        this.global_CLAP001.gest_act.fpp
      );

      let fecha_act = parseInt(moment().format("YYYYMMDD"));
      let fechaCalc = parseInt(this.global_CLAP001.gest_act.fpp);

      if (fecha_act >= fechaCalc) {
        this.global_CLAP001.gest_act.edad_gest.sema_edad = "40";
        this.global_CLAP001.gest_act.edad_gest.dias_edad = "0";
      } else {
        let dias = SC_DIAS(this.global_CLAP001.gest_act.fum, this.global_CLAP001.fecha);
        this.global_CLAP001.gest_act.edad_gest.sema_edad = parseInt(dias / 6.75) || 0;

        let calculo = dias - this.global_CLAP001.gest_act.edad_gest.sema_edad * 6.75;
        this.global_CLAP001.gest_act.edad_gest.dias_edad = parseInt(calculo);
      }

      this.validarEcografia();
    },
    validarFechaFpp_ano() {
      validarInputs(
        {
          form: "#validarFechaFpp_ano",
          orden: "1",
        },
        () => this.validarFechaFum_dia(),
        () => {
          let ano = parseInt(this.fechas.fpp.ano) || 0;

          if (ano < 1900) {
            CON851("37", "Año fuera de rango", null, "error", "Error");
            this.validarFechaFpp_ano();
          } else this.validarFechaFpp_mes();
        }
      );
    },
    validarFechaFpp_mes() {
      validarInputs(
        {
          form: "#validarFechaFpp_mes",
          orden: "1",
        },
        () => this.validarFechaFpp_ano(),
        () => {
          let mes = parseInt(this.fechas.fpp.mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "Mes fuera de rango", null, "error", "Error");
            this.validarFechaFpp_mes();
          } else this.validarFechaFpp_dia();
        }
      );
    },
    validarFechaFpp_dia() {
      validarInputs(
        {
          form: "#validarFechaFpp_dia",
          orden: "1",
        },
        () => this.validarFechaFpp_mes(),
        () => {
          let dia_num = parseInt(this.fechas.fpp.dia) || 0;

          let ano = this.fechas.fpp.ano;
          let mes = this.fechas.fpp.mes;
          let dia = this.fechas.fpp.dia;

          if (dia_num < 1 || dia_num > 31) {
            CON851("37", "Dia fuera de rango", null, "error", "Error");
            this.validarFechaFpp_dia();
          } else if (!_validarFecha(ano, mes, dia)) {
            CON851("37", "Fecha fuera de rango", null, "error", "Error");
            this.validarFechaFpp_dia();
          } else {
            this.global_CLAP001.gest_act.fpp =
              this.fechas.fpp.ano + this.fechas.fpp.mes.padStart(2, "0") + this.fechas.fpp.dia.padStart(2, "0");

            this.validarEdadGestSem();
          }
        }
      );
    },
    validarEdadGestSem() {
      validarInputs(
        {
          form: "#validarEdadGestSem",
          orden: "1",
        },
        () => this.validarFechaFpp_dia(),
        () => {
          this.global_CLAP001.gest_act.edad_gest.sema_edad = this.validarNumero(
            this.global_CLAP001.gest_act.edad_gest.sema_edad
          );

          this.validarEdadGestDias();
        }
      );
    },
    validarEdadGestDias() {
      validarInputs(
        {
          form: "#validarEdadGestDias",
          orden: "1",
        },
        () => this.validarEdadGestSem(),
        () => {
          this.global_CLAP001.gest_act.edad_gest.dias_edad = this.validarNumero(
            this.global_CLAP001.gest_act.edad_gest.dias_edad
          );

          this.validarEcografia();
        }
      );
    },
    validarEcografia() {
      validarInputs(
        {
          form: "#validarEcografia",
          orden: "1",
        },
        () => this.validarEdadGestDias(),
        () => {
          this.global_CLAP001.gest_act.edad_gest.ecog_men20sem = this.validarSiNo(
            this.global_CLAP001.gest_act.edad_gest.ecog_men20sem
          );

          this.guardarClap(this.validarEcografia, this.validarInspVisual);
        }
      );
    },
    validarInspVisual() {
      let _this = this;

      if (this.global_CLAP001.gest_act.cervix.insp == "") this.global_CLAP001.gest_act.cervix.insp = "1";

      setTimeout(() => {
        POPUP(
          {
            titulo: "INSP VISUAL ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayNormalAnormal,
            callback_f: () => this.validarEcografia(),
            seleccion: this.global_CLAP001.gest_act.cervix.insp,
            teclaAlterna: true,
            id_input: "#validarInspVisual",
          },
          (data) => {
            _this.global_CLAP001.gest_act.cervix.insp = data.COD;
            _this.validarPAP();
          }
        );
      }, 300);
    },
    validarPAP() {
      let _this = this;

      if (this.global_CLAP001.gest_act.cervix.pap == "") this.global_CLAP001.gest_act.cervix.pap = "1";

      setTimeout(() => {
        POPUP(
          {
            titulo: "PAP ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayNormalAnormal,
            callback_f: () => this.validarInspVisual(),
            seleccion: this.global_CLAP001.gest_act.cervix.pap,
            teclaAlterna: true,
            id_input: "#validarPAP",
          },
          (data) => {
            _this.global_CLAP001.gest_act.cervix.pap = data.COD;
            _this.validarCOLP();
          }
        );
      }, 300);
    },
    validarCOLP() {
      let _this = this;

      if (this.global_CLAP001.gest_act.cervix.colp == "") this.global_CLAP001.gest_act.cervix.colp = "1";

      setTimeout(() => {
        POPUP(
          {
            titulo: "COLP ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayNormalAnormal,
            callback_f: () => this.validarPAP(),
            seleccion: this.global_CLAP001.gest_act.cervix.colp,
            teclaAlterna: true,
            id_input: "#validarCOLP",
          },
          (data) => {
            _this.global_CLAP001.gest_act.cervix.colp = data.COD;
            _this.validarAntirubeola();
          }
        );
      }, 300);
    },
    validarAntirubeola() {
      let _this = this;

      if (this.global_CLAP001.gest_act.antirube == "") this.global_CLAP001.gest_act.antirube = "P";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Antirubeola ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayAntirubeola,
            callback_f: () => this.validarCOLP(),
            seleccion: this.global_CLAP001.gest_act.antirube,
            teclaAlterna: true,
            id_input: "#validarAntirubeola",
          },
          (data) => {
            _this.global_CLAP001.gest_act.antirube = data.COD;
            _this.validarExamNormalOdont();
          }
        );
      }, 300);
    },
    validarExamNormalOdont() {
      validarInputs(
        {
          form: "#validarExamNormalOdont",
          orden: "1",
        },
        () => this.validarAntirubeola(),
        () => {
          this.global_CLAP001.gest_act.ex_normal.odont = this.validarSiNo(this.global_CLAP001.gest_act.ex_normal.odont);

          this.validarExamNormalMamas();
        }
      );
    },
    validarExamNormalMamas() {
      validarInputs(
        {
          form: "#validarExamNormalMamas",
          orden: "1",
        },
        () => this.validarExamNormalOdont(),
        () => {
          this.global_CLAP001.gest_act.ex_normal.mamas = this.validarSiNo(this.global_CLAP001.gest_act.ex_normal.mamas);

          this.validarToxo20semMenos();
        }
      );
    },
    validarToxo20semMenos() {
      let _this = this;

      if (this.global_CLAP001.gest_act.toxoplasmosis.sem1_igg == "")
        this.global_CLAP001.gest_act.toxoplasmosis.sem1_igg = "+";

      setTimeout(() => {
        POPUP(
          {
            titulo: "< 20 sem IgG ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosNegaHizo,
            callback_f: () => this.validarExamNormalMamas(),
            seleccion: this.global_CLAP001.gest_act.toxoplasmosis.sem1_igg,
            teclaAlterna: true,
            id_input: "#validarToxo20semMenos",
          },
          (data) => {
            _this.global_CLAP001.gest_act.toxoplasmosis.sem1_igg = data.COD;
            _this.validarToxo20semMas();
          }
        );
      }, 300);
    },
    validarToxo20semMas() {
      let _this = this;

      if (this.global_CLAP001.gest_act.toxoplasmosis.sem2_igg == "")
        this.global_CLAP001.gest_act.toxoplasmosis.sem2_igg = "+";

      setTimeout(() => {
        POPUP(
          {
            titulo: ">= 20 sem IgG ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosNegaHizo,
            callback_f: () => this.validarToxo20semMenos(),
            seleccion: this.global_CLAP001.gest_act.toxoplasmosis.sem2_igg,
            teclaAlterna: true,
            id_input: "#validarToxo20semMas",
          },
          (data) => {
            _this.global_CLAP001.gest_act.toxoplasmosis.sem2_igg = data.COD;
            _this.validar1raConsul();
          }
        );
      }, 300);
    },
    validar1raConsul() {
      let _this = this;

      if (this.global_CLAP001.gest_act.toxoplasmosis.primera_cons_igm == "")
        this.global_CLAP001.gest_act.toxoplasmosis.primera_cons_igm = "+";

      setTimeout(() => {
        POPUP(
          {
            titulo: "1ra consulta IgM ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosNegaHizo,
            callback_f: () => this.validarToxo20semMas(),
            seleccion: this.global_CLAP001.gest_act.toxoplasmosis.primera_cons_igm,
            teclaAlterna: true,
            id_input: "#validar1raConsul",
          },
          (data) => {
            _this.global_CLAP001.gest_act.toxoplasmosis.primera_cons_igm = data.COD;
            _this.validarVigente();
          }
        );
      }, 300);
    },
    validarVigente() {
      validarInputs(
        {
          form: "#validarVigente",
          orden: "1",
        },
        () => this.validar1raConsul(),
        () => {
          this.global_CLAP001.gest_act.antiteta.vigen_ant = this.validarSiNo(
            this.global_CLAP001.gest_act.antiteta.vigen_ant
          );

          this.validarDosis1();
        }
      );
    },
    validarDosis1() {
      validarInputs(
        {
          form: "#validarDosis1",
          orden: "1",
        },
        () => this.validarVigente(),
        () => {
          this.global_CLAP001.gest_act.antiteta.prim_dosis = this.validarSiNo(
            this.global_CLAP001.gest_act.antiteta.prim_dosis
          );

          this.validarDosis2();
        }
      );
    },
    validarDosis2() {
      validarInputs(
        {
          form: "#validarDosis2",
          orden: "1",
        },
        () => this.validarDosis1(),
        () => {
          this.global_CLAP001.gest_act.antiteta.seg_dosis = this.validarSiNo(
            this.global_CLAP001.gest_act.antiteta.seg_dosis
          );

          this.guardarClap(this.validarDosis2, () => this.validarTablaFumaAct(0));
        }
      );
    },
    validarTablaFumaAct(pos) {
      validarInputs(
        {
          form: "#validarFumaAct_" + pos + "_CLAP001",
          orden: "1",
        },
        () => {
          if (pos == 0) this.validarDosis2();
          else this.validarTablaViolencia(pos - 1);
        },
        () => {
          this.global_CLAP001.tabla_trim[pos].fuma_act = this.validarSiNo(this.global_CLAP001.tabla_trim[pos].fuma_act);

          this.validarTablaFumaPas(pos);
        }
      );
    },
    validarTablaFumaPas(pos) {
      validarInputs(
        {
          form: "#validarFumaPas_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaFumaAct(pos),
        () => {
          this.global_CLAP001.tabla_trim[pos].fuma_pas = this.validarSiNo(this.global_CLAP001.tabla_trim[pos].fuma_pas);

          this.validarTablaDrogas(pos);
        }
      );
    },
    validarTablaDrogas(pos) {
      validarInputs(
        {
          form: "#validarDrogas_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaFumaPas(pos),
        () => {
          this.global_CLAP001.tabla_trim[pos].drogas = this.validarSiNo(this.global_CLAP001.tabla_trim[pos].drogas);

          this.validarTablaAlcohol(pos);
        }
      );
    },
    validarTablaAlcohol(pos) {
      validarInputs(
        {
          form: "#validarAlcohol_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaDrogas(pos),
        () => {
          this.global_CLAP001.tabla_trim[pos].alcohol = this.validarSiNo(this.global_CLAP001.tabla_trim[pos].alcohol);

          this.validarTablaViolencia(pos);
        }
      );
    },
    validarTablaViolencia(pos) {
      validarInputs(
        {
          form: "#validarViolencia_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaAlcohol(pos),
        () => {
          this.global_CLAP001.tabla_trim[pos].violencia = this.validarSiNo(
            this.global_CLAP001.tabla_trim[pos].violencia
          );

          if (pos == 2) {
            this.guardarClap(() => this.validarTablaViolencia(pos), this.validarGrupoSang);
          } else this.validarTablaFumaAct(pos + 1);
        }
      );
    },
    validarGrupoSang() {
      validarInputs(
        {
          form: "#validarGrupoSang",
          orden: "1",
        },
        () => this.validarTablaViolencia(2),
        () => {
          this.datosExt.grupo_sang = this.datosExt.grupo_sang.toUpperCase().trim();
          switch (this.datosExt.grupo_sang) {
            case "O":
            case "A":
            case "B":
            case "AB":
              this.ValidarRH();
              break;
            default:
              CON851("03", "03", null, "error", "Error");
              this.validarGrupoSang();
              break;
          }
        }
      );
    },
    ValidarRH() {
      validarInputs(
        {
          form: "#validarRH",
          orden: "1",
        },
        () => {
          this.validarGrupoSang();
        },
        () => {
          switch (this.datosExt.rh.trim()) {
            case "+":
            case "-":
              this.validarInmunizada();
              break;
            default:
              CON851("03", "03", null, "error", "Error");
              this.ValidarRH();
              break;
          }
        }
      );
    },
    validarInmunizada() {
      validarInputs(
        {
          form: "#validarInmunizada",
          orden: "1",
        },
        () => this.ValidarRH(),
        () => {
          this.global_CLAP001.gest_act.inmuniza = this.validarSiNo(this.global_CLAP001.gest_act.inmuniza);

          if (this.datosExt.rh == "+" || (this.datosExt.rh == "-" && this.global_CLAP001.gest_act.inmuniza == "S")) {
            this.global_CLAP001.gest_act.gamaglob_anti_d = "0";
            this.validarChagas();
          } else this.validarGamablobulina();
        }
      );
    },
    validarGamablobulina() {
      let _this = this;

      if (this.global_CLAP001.gest_act.gamaglob_anti_d == "") this.global_CLAP001.gest_act.gamaglob_anti_d = "N";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Gamaglobulina ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayGamaglobulina,
            callback_f: () => this.validarInmunizada(),
            seleccion: this.global_CLAP001.gest_act.gamaglob_anti_d,
            teclaAlterna: true,
            id_input: "#validarGamablobulina",
          },
          (data) => {
            _this.global_CLAP001.gest_act.gamaglob_anti_d = data.COD;
            _this.validarChagas();
          }
        );
      }, 300);
    },
    validarChagas() {
      let _this = this;

      if (this.global_CLAP001.gest_act.inmuniza == "") this.global_CLAP001.gest_act.inmuniza = "+";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Chagas ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosNegaHizo,
            callback_f: () => {
              if (this.datosExt.rh == "+" || (this.datosExt.rh == "-" && this.global_CLAP001.gest_act.inmuniza == "S"))
                this.validarInmunizada();
              else this.validarGamablobulina();
            },
            seleccion: this.global_CLAP001.gest_act.chagas,
            teclaAlterna: true,
            id_input: "#validarChagas",
          },
          (data) => {
            _this.global_CLAP001.gest_act.chagas = data.COD;
            _this.validarMalaria();
          }
        );
      }, 300);
    },
    validarMalaria() {
      let _this = this;

      if (this.global_CLAP001.gest_act.malaria == "") this.global_CLAP001.gest_act.malaria = "+";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Paludismo ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosNegaHizo,
            callback_f: () => this.validarChagas(),
            seleccion: this.global_CLAP001.gest_act.malaria,
            teclaAlterna: true,
            id_input: "#validarMalaria",
          },
          (data) => {
            _this.global_CLAP001.gest_act.malaria = data.COD;
            _this.validarGlucemia20sem();
          }
        );
      }, 300);
    },
    validarGlucemia20sem() {
      validarInputs(
        {
          form: "#validarGlucemia20sem",
          orden: "1",
        },
        () => this.validarMalaria(),
        () => {
          this.global_CLAP001.glucemia_men20sem = this.validarNumero(this.global_CLAP001.glucemia_men20sem, 3);

          this.validarGlucemia30sem();
        }
      );
    },
    validarGlucemia30sem() {
      validarInputs(
        {
          form: "#validarGlucemia30sem",
          orden: "1",
        },
        () => this.validarGlucemia20sem(),
        () => {
          this.global_CLAP001.glucemia_may30sem = this.validarNumero(this.global_CLAP001.glucemia_may30sem, 3);

          this.validarVIHMenosSolic();
        }
      );
    },
    validarVIHMenosSolic() {
      validarInputs(
        {
          form: "#validarVIHMenosSolic",
          orden: "1",
        },
        () => this.validarGlucemia30sem(),
        () => {
          this.global_CLAP001.vihs_men20sem = this.validarSiNo(this.global_CLAP001.vihs_men20sem);

          this.validarVIHMenosRealiz();
        }
      );
    },
    validarVIHMenosRealiz() {
      validarInputs(
        {
          form: "#validarVIHMenosRealiz",
          orden: "1",
        },
        () => this.validarVIHMenosSolic(),
        () => {
          this.global_CLAP001.vihr_men20sem = this.validarSiNo(this.global_CLAP001.vihr_men20sem);

          this.validarVIHMasSolic();
        }
      );
    },
    validarVIHMasSolic() {
      validarInputs(
        {
          form: "#validarVIHMasSolic",
          orden: "1",
        },
        () => this.validarVIHMenosRealiz(),
        () => {
          this.global_CLAP001.vihs_may20sem = this.validarSiNo(this.global_CLAP001.vihs_may20sem);

          this.validarVIHMasRealiz();
        }
      );
    },
    validarVIHMasRealiz() {
      validarInputs(
        {
          form: "#validarVIHMasRealiz",
          orden: "1",
        },
        () => this.validarVIHMasSolic(),
        () => {
          this.global_CLAP001.vihr_may20sem = this.validarSiNo(this.global_CLAP001.vihr_may20sem);

          this.validarHBmenos();
        }
      );
    },
    validarHBmenos() {
      validarInputs(
        {
          form: "#validarHBmenos",
          orden: "1",
        },
        () => this.validarVIHMasRealiz(),
        () => {
          this.global_CLAP001.gest_act.hb_sem1 = this.mask.dos.resolve(this.global_CLAP001.gest_act.hb_sem1);

          this.validarHBmas();
        }
      );
    },
    validarHBmas() {
      validarInputs(
        {
          form: "#validarHBmas",
          orden: "1",
        },
        () => this.validarHBmenos(),
        () => {
          this.global_CLAP001.gest_act.hb_sem2 = this.mask.dos.resolve(this.global_CLAP001.gest_act.hb_sem2);

          this.validarBacteMenos();
        }
      );
    },
    validarBacteMenos() {
      let _this = this;

      if (this.global_CLAP001.bacte_men20sem == "") this.global_CLAP001.bacte_men20sem = "N";

      setTimeout(() => {
        POPUP(
          {
            titulo: "< 20sem ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayNormalAnormal,
            callback_f: () => this.validarHBmas(),
            seleccion: this.global_CLAP001.bacte_men20sem,
            teclaAlterna: true,
            id_input: "#validarBacteMenos",
          },
          (data) => {
            _this.global_CLAP001.bacte_men20sem = data.COD;
            _this.validarBacteMas();
          }
        );
      }, 300);
    },
    validarBacteMas() {
      let _this = this;

      if (this.global_CLAP001.bacte_may20sem == "") this.global_CLAP001.bacte_may20sem = "N";

      setTimeout(() => {
        POPUP(
          {
            titulo: ">= 20sem ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayNormalAnormal,
            callback_f: () => this.validarBacteMenos(),
            seleccion: this.global_CLAP001.bacte_may20sem,
            teclaAlterna: true,
            id_input: "#validarBacteMas",
          },
          (data) => {
            _this.global_CLAP001.bacte_may20sem = data.COD;
            _this.guardarClap(_this.validarBacteMas, _this.validarFE);
          }
        );
      }, 300);
    },
    validarFE() {
      validarInputs(
        {
          form: "#validarFE",
          orden: "1",
        },
        () => this.validarBacteMas(),
        () => {
          this.global_CLAP001.fe = this.validarSiNo(this.global_CLAP001.fe);

          this.validarFolatos();
        }
      );
    },
    validarFolatos() {
      validarInputs(
        {
          form: "#validarFolatos",
          orden: "1",
        },
        () => this.validarFE(),
        () => {
          this.global_CLAP001.gest_act.folatos = this.validarSiNo(this.global_CLAP001.gest_act.folatos);

          this.validarEstrepto();
        }
      );
    },
    validarEstrepto() {
      let _this = this;

      if (this.global_CLAP001.gest_act.estrepto == "") this.global_CLAP001.gest_act.estrepto = "+";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Estreptococo b (35 - 37 sem) ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosNegaHizo,
            callback_f: () => this.validarChagas(),
            seleccion: this.global_CLAP001.gest_act.estrepto,
            teclaAlterna: true,
            id_input: "#validarEstrepto",
          },
          (data) => {
            _this.global_CLAP001.gest_act.estrepto = data.COD;
            _this.validarPrepParto();
          }
        );
      }, 300);
    },
    validarPrepParto() {
      validarInputs(
        {
          form: "#validarPrepParto",
          orden: "1",
        },
        () => this.validarEstrepto(),
        () => {
          this.global_CLAP001.prep_part = this.validarSiNo(this.global_CLAP001.prep_part);

          this.validarLactancia();
        }
      );
    },
    validarLactancia() {
      validarInputs(
        {
          form: "#validarLactancia",
          orden: "1",
        },
        () => this.validarPrepParto(),
        () => {
          this.global_CLAP001.cons_lact_mat = this.validarSiNo(this.global_CLAP001.cons_lact_mat);

          this.guardarClap(this.validarLactancia, this.validarNoTrepone_menos);
        }
      );
    },
    validarNoTrepone_menos() {
      let _this = this;

      if (this.global_CLAP001.notrep_men20sem == "") this.global_CLAP001.notrep_men20sem = "-";

      setTimeout(() => {
        POPUP(
          {
            titulo: "No treponémica < 20sem ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosNegaSin,
            callback_f: () => this.validarLactancia(),
            seleccion: this.global_CLAP001.notrep_men20sem,
            teclaAlterna: true,
            id_input: "#validarNoTrepone_menos",
          },
          (data) => {
            _this.global_CLAP001.notrep_men20sem = data.COD;

            switch (_this.global_CLAP001.notrep_men20sem) {
              case "+":
              case "-":
                _this.validarSemNoTrepone_menos();
                break;
              case "0":
                _this.global_CLAP001.sem_notrep_men20 = "00";
                _this.validarNoTrepone_mas();
                break;
            }
          }
        );
      }, 300);
    },
    validarSemNoTrepone_menos() {
      validarInputs(
        {
          form: "#validarSemNoTrepone_menos",
          orden: "1",
        },
        () => this.validarNoTrepone_menos(),
        () => {
          this.global_CLAP001.sem_notrep_men20 = this.validarNumero(this.global_CLAP001.sem_notrep_men20);

          if (this.global_CLAP001.sem_notrep_men20 == "00") {
            CON851("", "No puede ser cero!", null, "error", "Error");
            this.validarSemNoTrepone_menos();
          } else if (parseInt(this.global_CLAP001.sem_notrep_men20) > 19) {
            CON851("", "No puede ser mayor a 19!", null, "error", "Error");
            this.validarSemNoTrepone_menos();
          } else this.validarNoTrepone_mas();
        }
      );
    },
    validarNoTrepone_mas() {
      let _this = this;

      if (this.global_CLAP001.notrep_may20sem == "") this.global_CLAP001.notrep_may20sem = "-";

      setTimeout(() => {
        POPUP(
          {
            titulo: "No treponémica > = 20sem ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosNegaSin,
            callback_f: () => this.validarNoTrepone_menos(),
            seleccion: this.global_CLAP001.notrep_may20sem,
            teclaAlterna: true,
            id_input: "#validarNoTrepone_mas",
          },
          (data) => {
            _this.global_CLAP001.notrep_may20sem = data.COD;

            switch (_this.global_CLAP001.notrep_may20sem) {
              case "+":
              case "-":
                _this.validarSemNoTrepone_mas();
                break;
              case "0":
                _this.global_CLAP001.sem_notrep_may20 = "00";
                _this.validarTrepone_menos();
                break;
            }
          }
        );
      }, 300);
    },
    validarSemNoTrepone_mas() {
      validarInputs(
        {
          form: "#validarSemNoTrepone_mas",
          orden: "1",
        },
        () => this.validarNoTrepone_mas(),
        () => {
          this.global_CLAP001.sem_notrep_may20 = this.validarNumero(this.global_CLAP001.sem_notrep_may20);

          if (this.global_CLAP001.sem_notrep_may20 == "00") {
            CON851("", "No puede ser cero!", null, "error", "Error");
            this.validarSemNoTrepone_mas();
          } else if (parseInt(this.global_CLAP001.sem_notrep_may20) < 20) {
            CON851("", "No puede ser menor a 20!", null, "error", "Error");
            this.validarSemNoTrepone_mas();
          } else this.validarTrepone_menos();
        }
      );
    },
    validarTrepone_menos() {
      let _this = this;

      if (this.global_CLAP001.trep_men20sem == "") this.global_CLAP001.trep_men20sem = "0";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Treponemica < 20sem ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arraySIFILIS_1,
            callback_f: () => this.validarNoTrepone_mas(),
            seleccion: this.global_CLAP001.trep_men20sem,
            teclaAlterna: true,
            id_input: "#validarTrepone_menos",
          },
          (data) => {
            _this.global_CLAP001.trep_men20sem = data.COD;

            switch (_this.global_CLAP001.trep_men20sem) {
              case "+":
              case "-":
                _this.validarSemTrepone_menos();
                break;
              case "0":
              case "1":
                _this.global_CLAP001.sem_trep_men20 = "00";
                _this.validarTrepone_mas();
                break;
            }
          }
        );
      }, 300);
    },
    validarSemTrepone_menos() {
      validarInputs(
        {
          form: "#validarSemTrepone_menos",
          orden: "1",
        },
        () => this.validarTrepone_menos(),
        () => {
          this.global_CLAP001.sem_trep_men20 = this.validarNumero(this.global_CLAP001.sem_trep_men20);

          if (this.global_CLAP001.sem_trep_men20 == "00") {
            CON851("", "No puede ser cero!", null, "error", "Error");
            this.validarSemTrepone_menos();
          } else if (parseInt(this.global_CLAP001.sem_trep_men20) > 19) {
            CON851("", "No puede ser mayor a 19!", null, "error", "Error");
            this.validarSemTrepone_menos();
          } else this.validarTrepone_mas();
        }
      );
    },
    validarTrepone_mas() {
      let _this = this;

      if (this.global_CLAP001.trep_may20sem == "") this.global_CLAP001.trep_may20sem = "0";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Treponemica >= 20sem ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arraySIFILIS_1,
            callback_f: () => this.validarTrepone_menos(),
            seleccion: this.global_CLAP001.trep_may20sem,
            teclaAlterna: true,
            id_input: "#validarTrepone_mas",
          },
          (data) => {
            _this.global_CLAP001.trep_may20sem = data.COD;

            switch (_this.global_CLAP001.trep_may20sem) {
              case "+":
              case "-":
                _this.validarSemTrepone_mas();
                break;
              case "0":
              case "1":
                _this.global_CLAP001.sem_trep_may20 = "00";
                _this.validarTratar_menos();
                break;
            }
          }
        );
      }, 300);
    },
    validarSemTrepone_mas() {
      validarInputs(
        {
          form: "#validarSemTrepone_mas",
          orden: "1",
        },
        () => this.validarTrepone_menos(),
        () => {
          this.global_CLAP001.sem_trep_may20 = this.validarNumero(this.global_CLAP001.sem_trep_may20);

          if (this.global_CLAP001.sem_trep_may20 == "00") {
            CON851("", "No puede ser cero!", null, "error", "Error");
            this.validarSemTrepone_mas();
          } else if (parseInt(this.global_CLAP001.sem_trep_may20) < 19) {
            CON851("", "No puede ser menor a 20!", null, "error", "Error");
            this.validarSemTrepone_mas();
          } else this.validarTratar_menos();
        }
      );
    },
    validarTratar_menos() {
      let _this = this;

      if (this.global_CLAP001.trat_men20sem == "") this.global_CLAP001.trat_men20sem = "0";

      setTimeout(() => {
        POPUP(
          {
            titulo: "< 20sem ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arraySIFILIS_2,
            callback_f: () => this.validarTrepone_mas(),
            seleccion: this.global_CLAP001.trat_men20sem,
            teclaAlterna: true,
            id_input: "#validarTratar_menos",
          },
          (data) => {
            _this.global_CLAP001.trat_men20sem = data.COD;

            switch (_this.global_CLAP001.trat_men20sem) {
              case "S":
                _this.validarSemTratar_menos();
                break;
              case "N":
              case "0":
              case "1":
                _this.global_CLAP001.sem_trat_men20 = "00";
                _this.validarTratar_mas();
                break;
            }
          }
        );
      }, 300);
    },
    validarSemTratar_menos() {
      validarInputs(
        {
          form: "#validarSemTratar_menos",
          orden: "1",
        },
        () => this.validarTratar_menos(),
        () => {
          this.global_CLAP001.sem_trat_men20 = this.validarNumero(this.global_CLAP001.sem_trat_men20);

          if (this.global_CLAP001.sem_trat_men20 == "00") {
            CON851("", "No puede ser cero!", null, "error", "Error");
            this.validarSemTratar_menos();
          } else if (parseInt(this.global_CLAP001.sem_trat_men20) > 19) {
            CON851("", "No puede ser mayor a 19!", null, "error", "Error");
            this.validarSemTratar_menos();
          } else this.validarTratar_mas();
        }
      );
    },
    validarTratar_mas() {
      let _this = this;

      if (this.global_CLAP001.trat_may20sem == "") this.global_CLAP001.trat_may20sem = "0";

      setTimeout(() => {
        POPUP(
          {
            titulo: ">= 20sem ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arraySIFILIS_2,
            callback_f: () => this.validarTratar_menos(),
            seleccion: this.global_CLAP001.trat_may20sem,
            teclaAlterna: true,
            id_input: "#validarTratar_mas",
          },
          (data) => {
            _this.global_CLAP001.trat_may20sem = data.COD;

            switch (_this.global_CLAP001.trat_may20sem) {
              case "S":
                _this.validarSemTratar_mas();
                break;
              case "N":
              case "0":
              case "1":
                _this.global_CLAP001.sem_trat_may20 = "00";
                _this.validarTrataParejaMenos();
                break;
            }
          }
        );
      }, 300);
    },
    validarSemTratar_mas() {
      validarInputs(
        {
          form: "#validarSemTratar_mas",
          orden: "1",
        },
        () => this.validarTratar_mas(),
        () => {
          this.global_CLAP001.sem_trat_may20 = this.validarNumero(this.global_CLAP001.sem_trat_may20);

          if (this.global_CLAP001.sem_trat_may20 == "00") {
            CON851("", "No puede ser cero!", null, "error", "Error");
            this.validarSemTratar_mas();
          } else if (parseInt(this.global_CLAP001.sem_trat_may20) < 19) {
            CON851("", "No puede ser menor a 20!", null, "error", "Error");
            this.validarSemTratar_mas();
          } else this.validarTrataParejaMenos();
        }
      );
    },
    validarTrataParejaMenos() {
      let _this = this;

      if (this.global_CLAP001.tto_pareja_men20sem == "") this.global_CLAP001.tto_pareja_men20sem = "0";

      setTimeout(() => {
        POPUP(
          {
            titulo: "< 20sem ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arraySIFILIS_2,
            callback_f: () => this.validarTratar_mas(),
            seleccion: this.global_CLAP001.tto_pareja_men20sem,
            teclaAlterna: true,
            id_input: "#validarTrataParejaMenos",
          },
          (data) => {
            _this.global_CLAP001.tto_pareja_men20sem = data.COD;

            _this.validarTrataParejaMas();
          }
        );
      }, 300);
    },
    validarTrataParejaMas() {
      let _this = this;

      if (this.global_CLAP001.tto_pareja_may20sem == "") this.global_CLAP001.tto_pareja_may20sem = "0";

      setTimeout(() => {
        POPUP(
          {
            titulo: ">= 20sem ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arraySIFILIS_2,
            callback_f: () => this.validarTrataParejaMenos(),
            seleccion: this.global_CLAP001.tto_pareja_may20sem,
            teclaAlterna: true,
            id_input: "#validarTrataParejaMas",
          },
          (data) => {
            _this.global_CLAP001.tto_pareja_may20sem = data.COD;

            _this.guardarClap(_this.validarTrataParejaMas, () => _this.validarTablaGestAno(0));
          }
        );
      }, 300);
    },
    validarTablaGestAno(pos) {
      this.mostrarF3_controles = true;

      validarInputs(
        {
          form: "#validarTablaGestAno_" + pos + "_CLAP001",
          orden: "1",
          event_f3: () => {
            let ano_f3 = parseInt(this.global_CLAP001.tabla_gest[pos].ano_gest) || 0;
            if (ano_f3 < 1900) this.inicializarTablaControl(pos);
            this.mostrarF3_controles = false;
            this.guardarTablaParto(pos);
          },
          event_flecha_arriba: () => {
            let ano_fu = parseInt(this.global_CLAP001.tabla_gest[pos].ano_gest) || 0;
            if (ano_fu < 1900) this.inicializarTablaControl(pos);

            if (pos == 0) this.validarTablaGestAno(pos);
            else this.validarTablaGestAno(pos - 1);
          },
          event_flecha_abajo: () => {
            let ano_fd = parseInt(this.global_CLAP001.tabla_gest[pos].ano_gest) || 0;
            if (ano_fd < 1900) this.inicializarTablaControl(pos);

            if (pos == 10) this.validarTablaGestAno(pos);
            else this.validarTablaGestAno(pos + 1);
          },
        },
        () => {
          if (pos == 0) {
            this.mostrarF3_controles = false;
            this.validarTrataParejaMas();
          } else this.validarTablaGestAno(pos - 1);
        },
        () => {
          let ano = parseInt(this.global_CLAP001.tabla_gest[pos].ano_gest) || 0;
          if (ano == 0) {
            this.inicializarTablaControl(pos);
            if (pos == 10) this.guardarTablaParto(pos);
            else this.validarTablaGestAno(pos + 1);
          } else if (ano < 1900) {
            CON851("", "Año inválido", null, "error", "Error");
            this.validarTablaGestAno(pos);
          } else {
            this.mostrarF3_controles = false;
            this.validarTablaGestMes_(pos);
          }
        }
      );
    },
    validarTablaGestMes_(pos) {
      validarInputs(
        {
          form: "#validarTablaGestMes_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaGestAno(pos),
        () => {
          let mes = parseInt(this.global_CLAP001.tabla_gest[pos].mes_gest) || 0;

          if (mes < 1 || mes > 12) {
            CON851("", "Mes inválido", null, "error", "Error");
            this.validarTablaGestMes_(pos);
          } else this.validarTablaGestDia_(pos);
        }
      );
    },
    validarTablaGestDia_(pos) {
      validarInputs(
        {
          form: "#validarTablaGestDia_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaGestMes_(pos),
        () => {
          let dia_num = parseInt(this.global_CLAP001.tabla_gest[pos].dia_gest) || 0;

          let ano = this.global_CLAP001.tabla_gest[pos].ano_gest;
          let mes = this.global_CLAP001.tabla_gest[pos].mes_gest;
          let dia = this.global_CLAP001.tabla_gest[pos].dia_gest;

          if (dia_num < 1 || dia_num > 31) {
            CON851("", "Día inválido", null, "error", "Error");
            this.validarTablaGestDia_(pos);
          } else if (!_validarFecha(ano, mes, dia)) {
            CON851("37", "Fecha fuera de rango", null, "error", "Error");
            this.validarTablaGestDia_();
          } else this.calcularEdadTablaGest(pos);
        }
      );
    },
    calcularEdadTablaGest(pos) {
      let edad = parseFloat(this.global_CLAP001.tabla_gest[pos].edad_gest) || 0;
      let fecha_unida =
        this.global_CLAP001.tabla_gest[pos].ano_gest +
        this.global_CLAP001.tabla_gest[pos].mes_gest.padStart(2, "0") +
        this.global_CLAP001.tabla_gest[pos].dia_gest.padStart(2, "0");

      if (edad == 0) {
        let calculo = SC_DIAS_SEMANAS(this.global_CLAP001.gest_act.fum, fecha_unida, true);
        //  console.log(calculo, this.global_CLAP001.gest_act.fum, fecha_unida)
        this.global_CLAP001.tabla_gest[pos].edad_gest = calculo.toFixed(1).toString();
      }
      this.validarTablaGestEdad_(pos);
    },
    validarTablaGestEdad_(pos) {
      validarInputs(
        {
          form: "#validarTablaGestEdad_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaGestDia_(pos),
        () => {
          this.global_CLAP001.tabla_gest[pos].edad_gest = this.mask.dos.resolve(
            this.global_CLAP001.tabla_gest[pos].edad_gest
          );
          let edad = parseFloat(this.global_CLAP001.tabla_gest[pos].edad_gest) || 0;
          let decimal = this.global_CLAP001.tabla_gest[pos].edad_gest.split(".")[1] || 0;

          if (edad > 45 || parseInt(decimal) > 7) {
            CON851("", "Dato fuera de rango", null, "error", "Error");
            this.validarTablaGestEdad_(pos);
          } else this.validarTablaGestPeso_(pos);
        }
      );
    },
    validarTablaGestPeso_(pos) {
      let pes = this.global_CLAP001.tabla_gest[pos].peso_gest.trim() || "";
      if (pes == "" && pos == 0)
        this.global_CLAP001.tabla_gest[pos].peso_gest = this.global_CLAP001.gest_act.peso_ant_gest;

      validarInputs(
        {
          form: "#validarTablaGestPeso_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaGestEdad_(pos),
        () => {
          let peso = parseInt(this.global_CLAP001.tabla_gest[pos].peso_gest) || 0;

          if (peso > 200 || peso < 20) {
            CON851("", "Dato fuera de rango", null, "error", "Error");
            this.validarTablaGestPeso_(pos);
          } else this.validarTablaGestPa1_(pos);
        }
      );
    },
    validarTablaGestPa1_(pos) {
      validarInputs(
        {
          form: "#validarTablaGestPa1_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaGestPeso_(pos),
        () => {
          let pa1 = parseInt(this.global_CLAP001.tabla_gest[pos].pa1_gest) || 0;

          if (pa1 > 300) {
            CON851("", "Dato fuera de rango", null, "error", "Error");
            this.validarTablaGestPa1_(pos);
          } else if (pa1 == 0) {
            this.global_CLAP001.tabla_gest[pos].pa1_gest = "000";
            this.global_CLAP001.tabla_gest[pos].pa3_gest = "000";
            this.validarTablaGestAltUter_(pos);
          } else this.validarTablaGestPa3_(pos);
        }
      );
    },
    validarTablaGestPa3_(pos) {
      validarInputs(
        {
          form: "#validarTablaGestPa3_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaGestPa1_(pos),
        () => {
          let pa3 = parseInt(this.global_CLAP001.tabla_gest[pos].pa3_gest) || 0;

          if (pa3 > 300) {
            CON851("", "Dato fuera de rango", null, "error", "Error");
            this.validarTablaGestPa3_(pos);
          } else this.validarTablaGestAltUter_(pos);
        }
      );
    },
    validarTablaGestAltUter_(pos) {
      validarInputs(
        {
          form: "#validarTablaGestAltUter_" + pos + "_CLAP001",
          orden: "1",
        },
        () => {
          if (parseInt(this.global_CLAP001.tabla_gest[pos].pa1_gest) == 0) this.validarTablaGestPa1_(pos);
          else this.validarTablaGestPa3_(pos);
        },
        () => {
          this.global_CLAP001.tabla_gest[pos].alt_uteri_gest = this.mask.dos.resolve(
            this.global_CLAP001.tabla_gest[pos].alt_uteri_gest
          );

          this.validarTablaGestPrese_(pos);
        }
      );
    },
    validarTablaGestPrese_(pos) {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Presentacion ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPrese,
            callback_f: () => this.validarTablaGestAltUter_(pos),
            seleccion: this.global_CLAP001.tabla_gest[pos].present_gest,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_CLAP001.tabla_gest[pos].present_gest = data.COD;
            _this.textos.tabla_gest[pos].prese = data.DESCRIP;

            _this.validarTablaGestFCF_(pos);
          }
        );
      }, 300);
    },
    validarTablaGestFCF_(pos) {
      validarInputs(
        {
          form: "#validarTablaGestFCF_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaGestPrese_(pos),
        () => {
          let latido = parseInt(this.global_CLAP001.tabla_gest[pos].latid_fetal_gest) || 0;

          if (latido > 200) {
            CON851("", "Dato fuera de rango", null, "error", "Error");
            this.validarTablaGestFCF_(pos);
          } else this.validarTablaGestMovF_(pos);
        }
      );
    },
    validarTablaGestMovF_(pos) {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Mov fetal ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosNega,
            callback_f: () => this.validarTablaGestFCF_(pos),
            seleccion: this.global_CLAP001.tabla_gest[pos].mov_fetal_gest,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_CLAP001.tabla_gest[pos].mov_fetal_gest = data.COD;
            _this.textos.tabla_gest[pos].mov_f = data.DESCRIP;

            _this.validarTablaGestProte_(pos);
          }
        );
      }, 300);
    },
    validarTablaGestProte_(pos) {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Proteinuria ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosNegaHizo,
            callback_f: () => this.validarTablaGestMovF_(pos),
            seleccion: this.global_CLAP001.tabla_gest[pos].prote_gest,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_CLAP001.tabla_gest[pos].prote_gest = data.COD;
            _this.textos.tabla_gest[pos].prote = data.DESCRIP;

            _this.validarTablaGestSignos_(pos);
          }
        );
      }, 300);
    },
    validarTablaGestSignos_(pos) {
      validarInputs(
        {
          form: "#validarTablaGestSignos_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaGestProte_(pos),
        () => {
          this.global_CLAP001.tabla_gest[pos].sign_alarm_gest =
            this.global_CLAP001.tabla_gest[pos].sign_alarm_gest.trim();

          let fecha = this.global_CLAP001.tabla_gest[pos].ano_prox_cita_gest;

          if (fecha.trim() == "" || parseInt(fecha) == 0) this.calcularProximaCita(pos);
          else this.validarTablaGestAnoProx_(pos);
        }
      );
    },
    calcularProximaCita(pos) {
      var fecha_unida =
        this.global_CLAP001.tabla_gest[pos].ano_gest +
        this.global_CLAP001.tabla_gest[pos].mes_gest.padStart(2, "0") +
        this.global_CLAP001.tabla_gest[pos].dia_gest.padStart(2, "0");

      var fecha = moment(fecha_unida).add(1, "M").format("YYYYMMDD");

      var fecha_2 = ([] = this.devolverFecha(fecha));
      this.global_CLAP001.tabla_gest[pos].ano_prox_cita_gest = fecha_2[0];
      this.global_CLAP001.tabla_gest[pos].mes_prox_cita_gest = fecha_2[1];
      this.global_CLAP001.tabla_gest[pos].dia_prox_cita_gest = fecha_2[2];

      this.validarTablaGestAnoProx_(pos);
    },
    validarTablaGestAnoProx_(pos) {
      validarInputs(
        {
          form: "#validarTablaGestAnoProx_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaGestSignos_(pos),
        () => {
          let ano = parseInt(this.global_CLAP001.tabla_gest[pos].ano_prox_cita_gest) || 0;

          if (ano == 0) {
            this.global_CLAP001.tabla_gest[pos].mes_prox_cita_gest = "";
            this.global_CLAP001.tabla_gest[pos].dia_prox_cita_gest = "";
            this.validarTablaGestAno(pos + 1);
          } else if (ano < 1900) {
            CON851("", "Año inválido", null, "error", "Error");
            this.validarTablaGestAnoProx_(pos);
          } else {
            this.validarTablaGestMesProx_(pos);
          }
        }
      );
    },
    validarTablaGestMesProx_(pos) {
      validarInputs(
        {
          form: "#validarTablaGestMesProx_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaGestAnoProx_(pos),
        () => {
          let mes = parseInt(this.global_CLAP001.tabla_gest[pos].mes_prox_cita_gest) || 0;

          if (mes < 1 || mes > 12) {
            CON851("", "Mes inválido", null, "error", "Error");
            this.validarTablaGestMesProx_(pos);
          } else this.validarTablaGestDiaProx_(pos);
        }
      );
    },
    validarTablaGestDiaProx_(pos) {
      validarInputs(
        {
          form: "#validarTablaGestDiaProx_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaGestMesProx_(pos),
        () => {
          let dia_num = parseInt(this.global_CLAP001.tabla_gest[pos].dia_prox_cita_gest) || 0;

          let ano = this.global_CLAP001.tabla_gest[pos].ano_prox_cita_gest;
          let mes = this.global_CLAP001.tabla_gest[pos].mes_prox_cita_gest;
          let dia = this.global_CLAP001.tabla_gest[pos].dia_prox_cita_gest;

          if (dia_num < 1 || dia_num > 31) {
            CON851("", "Día inválido", null, "error", "Error");
            this.validarTablaGestDiaProx_(pos);
          } else if (!_validarFecha(ano, mes, dia)) {
            CON851("37", "Fecha fuera de rango", null, "error", "Error");
            this.validarTablaGestDiaProx_();
          } else {
            this.global_CLAP001.tabla_gest[pos].tecn_gest = localStorage.Usuario;
            if (pos == 10) this.guardarTablaParto(pos);
            else this.validarTablaGestAno(pos + 1);
          }
        }
      );
    },
    inicializarTablaControl(pos) {
      var _this = this;

      this.$nextTick(function () {
        Vue.set(_this.global_CLAP001.tabla_gest, pos, {
          ano_gest: "",
          mes_gest: "",
          dia_gest: "",
          edad_gest: "",
          peso_gest: "",
          pa1_gest: "",
          pa3_gest: "",
          alt_uteri_gest: "",
          present_gest: "",
          latid_fetal_gest: "",
          mov_fetal_gest: "",
          prote_gest: "",
          sign_alarm_gest: "",
          ano_prox_cita_gest: "",
          mes_prox_cita_gest: "",
          dia_prox_cita_gest: "",
          tecn_gest: "",
        });

        _this.textos.tabla_gest[pos].prese = "";
        _this.textos.tabla_gest[pos].mov_f = "";
        _this.textos.tabla_gest[pos].prote = "";
      });
    },
    guardarTablaParto(pos) {
      let diligenciado = false;
      this.global_CLAP001.tabla_gest.forEach((element, index) => {
        if (parseInt(element.ano_gest) > 0) diligenciado = true;
      });

      if (diligenciado) {
        this.guardarClap(() => this.validarTablaGestAno(pos), this.validarAborto);
      } else {
        CON851("", "Debe digitar al menos una fecha de control !", null, "error", "Error");
        this.validarTablaGestAno(0);
      }
    },
    validarAborto() {
      validarInputs(
        {
          form: "#validarAborto",
          orden: "1",
        },
        () => this.validarTablaGestAno(0),
        () => {
          this.global_CLAP001.datos_parto.aborto = this.validarSiNo(this.global_CLAP001.datos_parto.aborto);

          let semanas = parseInt(this.global_CLAP001.gest_act.edad_gest.sema_edad);

          switch (this.global_CLAP001.datos_parto.aborto) {
            case "S":
              this.global_CLAP001.eva_clin.parto = "N";
              this.ocultarAborto = true;
              this.validarLugarParto();
              break;
            case "N":
              if (semanas < 24) {
                // INICIALIZA BASTANTES VARIABLES YA QUE NO SE CAPTURARÁN
                this.global_CLAP001.datos_parto = getObjRegCLAP().datos_parto;
                this.global_CLAP001.datos_parto_2 = getObjRegCLAP().datos_parto_2;
                this.global_CLAP001.eva_clin.parto = "N";
                this.global_CLAP001.datos_parto.aborto = "N";

                this.fechas.ingreso.ano = "";
                this.fechas.ingreso.mes = "";
                this.fechas.ingreso.dia = "";

                this.finalizarClap(1);
              } else {
                this.ocultarAborto = false;
                this.validarParto_2();
              }
              break;
            default:
              this.validarAborto();
              break;
          }
        }
      );
    },
    validarParto_2() {
      validarInputs(
        {
          form: "#validarParto_2",
          orden: "1",
        },
        () => this.validarAborto(),
        () => {
          this.global_CLAP001.eva_clin.parto = this.validarSiNo(this.global_CLAP001.eva_clin.parto);

          switch (this.global_CLAP001.eva_clin.parto) {
            case "S":
              this.global_CLAP001.datos_parto.aborto = "N";
              this.ocultarAborto = false;
              this.validarLugarParto();
              break;
            case "N":
              if (this.global_CLAP001.datos_parto.aborto == "N") {
                // INICIALIZA BASTANTES VARIABLES YA QUE NO SE CAPTURARÁN
                this.global_CLAP001.datos_parto = getObjRegCLAP().datos_parto;
                this.global_CLAP001.datos_parto_2 = getObjRegCLAP().datos_parto_2;
                this.global_CLAP001.datos_parto.aborto = "N";
                this.finalizarClap(2);
              } else this.validarLugarParto();
              break;
            default:
              this.validarParto_2();
              break;
          }
        }
      );
    },
    traerCiudadesParto() {
      var _this = this;
      $("#codCiudadPartoClap001").prop("disabled", true);
      loader("show");
      postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON809.DLL"))
        .then(function (data) {
          loader("hide");
          _this.ciudades = data.CIUDAD;
          _this.ciudades.pop();
          _this.ventanaCiudadesParto();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error consultando todas las ciudades", null, "error", "Error");
          loader("hide");
          $("#codCiudadPartoClap001").removeAttr("disabled");
          $("#codCiudadPartoClap001").focus();
        });
    },
    ventanaCiudadesParto() {
      var _this = this;

      _ventanaDatos({
        titulo: "Ventana ciudades",
        columnas: ["COD", "NOMBRE", "DEPART"],
        data: this.ciudades,
        ancho: "60%",
        callback_esc: () => {
          $("#codCiudadPartoClap001").removeAttr("disabled");
          $("#codCiudadPartoClap001").focus();
        },
        callback: (data) => {
          _this.global_CLAP001.lug_part_aborto = data.COD;
          _this.textos.ciudad_parto = data.NOMBRE;
          setTimeout(() => _enterInput("#codCiudadPartoClap001"), 100);
        },
      });
    },
    validarLugarParto() {
      validarInputs(
        {
          form: "#validarLugarParto",
          orden: "1",
        },
        () => this.validarParto_2(),
        () => {
          var ciudad = parseInt(this.global_CLAP001.lug_part_aborto) || 0;

          if (ciudad == 0) {
            this.global_CLAP001.lug_part_aborto = "";
            this.textos.ciudad_parto = "NO SELECCIONADA";
            this.validarAnoIngreso();
          } else this.consultarCiudadParto();
        }
      );
    },
    consultarCiudadParto() {
      loader("show");
      var _this = this;
      var data = {
        datosh: datosEnvio(),
        CIUDAD: this.global_CLAP001.lug_part_aborto.padStart(5, "0"),
      };

      postData(data, get_url("APP/CONTAB/CON809.DLL"))
        .then(function (data) {
          loader("hide");
          _this.textos.ciudad_parto = data.NOMBRE;
          _this.validarAnoIngreso();
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          _this.textos.ciudad_parto = "NO ENCONTRADA";
          _this.validarLugarParto();
        });
    },
    validarAnoIngreso() {
      validarInputs(
        {
          form: "#validarAnoIngreso",
          orden: "1",
        },
        () => this.validarLugarParto(),
        () => {
          let ano = parseInt(this.fechas.ingreso.ano) || 0;

          if (ano == 0 || ano < 1900) {
            CON851("", "Año inválido", null, "error", "Error");
            this.validarAnoIngreso();
          } else this.validarMesIngreso();
        }
      );
    },
    validarMesIngreso() {
      validarInputs(
        {
          form: "#validarMesIngreso",
          orden: "1",
        },
        () => this.validarAnoIngreso(),
        () => {
          let mes = parseInt(this.fechas.ingreso.mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("", "Mes inválido", null, "error", "Error");
            this.validarMesIngreso();
          } else this.validarDiaIngreso();
        }
      );
    },
    validarDiaIngreso() {
      validarInputs(
        {
          form: "#validarDiaIngreso",
          orden: "1",
        },
        () => this.validarMesIngreso(),
        () => {
          let dia_num = parseInt(this.fechas.ingreso.dia) || 0;

          let ano = this.fechas.ingreso.ano;
          let mes = this.fechas.ingreso.mes;
          let dia = this.fechas.ingreso.dia;

          if (dia_num < 1 || dia_num > 31) {
            CON851("", "Día inválido", null, "error", "Error");
            this.validarDiaIngreso();
          } else if (!_validarFecha(ano, mes, dia)) {
            CON851("37", "Fecha fuera de rango", null, "error", "Error");
            this.validarDiaIngreso();
          } else {
            this.global_CLAP001.datos_parto.fec_ingreso =
              this.fechas.ingreso.ano +
              this.fechas.ingreso.mes.padStart(2, "0") +
              this.fechas.ingreso.dia.padStart(2, "0");

            this.evaluarAborto();
          }
        }
      );
    },
    evaluarAborto() {
      if (this.global_CLAP001.datos_parto.aborto == "S") {
        this.global_CLAP001.eva_clin.carne = "";
        this.global_CLAP001.datos_parto.consul_pre = "";
        this.global_CLAP001.datos_parto.hospit_emb = "";
        this.global_CLAP001.datos_parto.corticoides_ante = "";
        this.global_CLAP001.datos_parto.sem_ini = "";
        this.global_CLAP001.datos_parto.inicio = "";

        this.fechas.ruptura.ano = "";
        this.fechas.ruptura.mes = "";
        this.fechas.ruptura.dia = "";

        this.global_CLAP001.datos_parto.rupt_memb = "";
        this.global_CLAP001.datos_parto.rupt_memb_anteparto = getObjRegCLAP().datos_parto.rupt_memb_anteparto;

        this.global_CLAP001.datos_parto.tamano_fetal = "";
        this.global_CLAP001.datos_parto.acompanan_tdp = "";
        this.global_CLAP001.datos_parto.presentacion = "";

        this.validarEdadGestParto();
      } else this.validarCarne();
    },
    validarCarne() {
      validarInputs(
        {
          form: "#validarCarne",
          orden: "1",
        },
        () => this.validarDiaIngreso(),
        () => {
          this.global_CLAP001.eva_clin.carne = this.validarSiNo(this.global_CLAP001.eva_clin.carne);

          this.validarNroConsultasPre();
        }
      );
    },
    validarNroConsultasPre() {
      validarInputs(
        {
          form: "#validarNroConsultasPre",
          orden: "1",
        },
        () => this.validarCarne(),
        () => {
          this.global_CLAP001.datos_parto.consul_pre = this.validarNumero(this.global_CLAP001.datos_parto.consul_pre);

          this.validarHospi();
        }
      );
    },
    validarHospi() {
      validarInputs(
        {
          form: "#validarHospi",
          orden: "1",
        },
        () => this.validarNroConsultasPre(),
        () => {
          this.global_CLAP001.datos_parto.hospit_emb = this.validarNumero(
            this.global_CLAP001.datos_parto.hospit_emb,
            3
          );

          this.validarCorticoides();
        }
      );
    },
    validarCorticoides() {
      let _this = this;

      if (this.global_CLAP001.datos_parto.corticoides_ante == "")
        this.global_CLAP001.datos_parto.corticoides_ante = "1";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Corticoides ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayCorticoides,
            callback_f: () => this.validarHospi(),
            seleccion: this.global_CLAP001.datos_parto.corticoides_ante,
            teclaAlterna: true,
            id_input: "#validarCorticoides",
          },
          (data) => {
            _this.global_CLAP001.datos_parto.corticoides_ante = data.COD;

            _this.validarSemanaInicio();
          }
        );
      }, 300);
    },
    validarSemanaInicio() {
      validarInputs(
        {
          form: "#validarSemanaInicio",
          orden: "1",
        },
        () => this.validarCorticoides(),
        () => {
          this.global_CLAP001.datos_parto.sem_ini = this.mask.dos.resolve(this.global_CLAP001.datos_parto.sem_ini);
          let edad = parseFloat(this.global_CLAP001.datos_parto.sem_ini) || 0;
          let decimal = this.global_CLAP001.datos_parto.sem_ini.split(".")[1] || 0;

          if (edad > 45 || parseInt(decimal) > 7) {
            CON851("", "Dato fuera de rango", null, "error", "Error");
            this.validarSemanaInicio();
          } else this.validarInicioParto();
        }
      );
    },
    validarInicioParto() {
      let _this = this;

      if (this.global_CLAP001.datos_parto.inicio == "") this.global_CLAP001.datos_parto.inicio = "1";

      setTimeout(() => {
        POPUP(
          {
            titulo: "INICIO PARTO ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayInicioParto,
            callback_f: () => this.validarSemanaInicio(),
            seleccion: this.global_CLAP001.datos_parto.inicio,
            teclaAlterna: true,
            id_input: "#validarInicioParto",
          },
          (data) => {
            _this.global_CLAP001.datos_parto.inicio = data.COD;

            _this.validarRuptura();
          }
        );
      }, 300);
    },
    validarRuptura() {
      validarInputs(
        {
          form: "#validarRuptura",
          orden: "1",
        },
        () => this.validarInicioParto(),
        () => {
          this.global_CLAP001.datos_parto.rupt_memb = this.validarSiNo(this.global_CLAP001.datos_parto.rupt_memb);

          if (this.global_CLAP001.datos_parto.rupt_memb == "N") {
            this.fechas.ruptura.ano = "";
            this.fechas.ruptura.mes = "";
            this.fechas.ruptura.dia = "";

            this.global_CLAP001.datos_parto.rupt_memb_anteparto = getObjRegCLAP().datos_parto.rupt_memb_anteparto;

            this.validarPresentacion();
          } else this.validarAnoRupt();
        }
      );
    },
    validarAnoRupt() {
      validarInputs(
        {
          form: "#validarAnoRupt",
          orden: "1",
        },
        () => this.validarRuptura(),
        () => {
          let ano = parseInt(this.fechas.ruptura.ano) || 0;

          if (ano == 0 || ano < 1900) {
            CON851("", "Año inválido", null, "error", "Error");
            this.validarAnoRupt();
          } else this.validarMesRupt();
        }
      );
    },
    validarMesRupt() {
      validarInputs(
        {
          form: "#validarMesRupt",
          orden: "1",
        },
        () => this.validarAnoRupt(),
        () => {
          let mes = parseInt(this.fechas.ruptura.mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("", "Mes inválido", null, "error", "Error");
            this.validarMesRupt();
          } else this.validarDiaRupt();
        }
      );
    },
    validarDiaRupt() {
      validarInputs(
        {
          form: "#validarDiaRupt",
          orden: "1",
        },
        () => this.validarMesRupt(),
        () => {
          let dia_num = parseInt(this.fechas.ruptura.dia) || 0;

          let ano = this.fechas.ruptura.ano;
          let mes = this.fechas.ruptura.mes;
          let dia = this.fechas.ruptura.dia;

          if (dia_num < 1 || dia_num > 31) {
            CON851("", "Día inválido", null, "error", "Error");
            this.validarDiaRupt();
          } else if (!_validarFecha(ano, mes, dia)) {
            CON851("37", "Fecha fuera de rango", null, "error", "Error");
            this.validarDiaRupt();
          } else {
            this.global_CLAP001.datos_parto.rupt_memb_anteparto.fecha_rup =
              this.fechas.ruptura.ano +
              this.fechas.ruptura.mes.padStart(2, "0") +
              this.fechas.ruptura.dia.padStart(2, "0");

            this.validarHoraRupt();
          }
        }
      );
    },
    validarHoraRupt() {
      validarInputs(
        {
          form: "#validarHoraRupt",
          orden: "1",
        },
        () => this.validarDiaRupt(),
        () => {
          let hora = parseInt(this.global_CLAP001.datos_parto.rupt_memb_anteparto.hora_rup) || 0;

          if (hora > 23 || hora < 1) {
            CON851("37", "Hora fuera de rango", null, "error", "Error");
            this.validarHoraRupt();
          } else this.validarMinRupt();
        }
      );
    },
    validarMinRupt() {
      validarInputs(
        {
          form: "#validarMinRupt",
          orden: "1",
        },
        () => this.validarHoraRupt(),
        () => {
          let min = parseInt(this.global_CLAP001.datos_parto.rupt_memb_anteparto.min_rup) || 0;

          if (min > 59 || min < 1) {
            CON851("37", "Minuto fuera de rango", null, "error", "Error");
            this.validarMinRupt();
          } else this.validarTempRupt();
        }
      );
    },
    validarTempRupt() {
      validarInputs(
        {
          form: "#validarTempRupt",
          orden: "1",
        },
        () => this.validarMinRupt(),
        () => {
          this.global_CLAP001.datos_parto.rupt_memb_anteparto.temp_may18 = this.mask.dos.resolve(
            this.global_CLAP001.datos_parto.rupt_memb_anteparto.temp_may18
          );

          this.validarPresentacion();
        }
      );
    },
    validarPresentacion() {
      let _this = this;

      if (this.global_CLAP001.datos_parto.presentacion == "") this.global_CLAP001.datos_parto.presentacion = "1";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Presentacion ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPrese,
            callback_f: () => {
              if (this.global_CLAP001.datos_parto.rupt_memb == "S") this.validarTempRupt();
              else this.validarRuptura();
            },
            seleccion: this.global_CLAP001.datos_parto.presentacion,
            teclaAlterna: true,
            id_input: "#validarPresentacion",
          },
          (data) => {
            _this.global_CLAP001.datos_parto.presentacion = data.COD;

            _this.validarTamanoFetal();
          }
        );
      }, 300);
    },
    validarTamanoFetal() {
      validarInputs(
        {
          form: "#validarTamanoFetal",
          orden: "1",
        },
        () => this.validarPresentacion(),
        () => {
          this.global_CLAP001.datos_parto.tamano_fetal = this.validarSiNo(this.global_CLAP001.datos_parto.tamano_fetal);

          this.validarAcompanante();
        }
      );
    },
    validarAcompanante() {
      let _this = this;

      if (this.global_CLAP001.datos_parto.acompanan_tdp == "") this.global_CLAP001.datos_parto.acompanan_tdp = "1";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Acompañante ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayAcompanante,
            callback_f: () => this.validarTamanoFetal(),
            seleccion: this.global_CLAP001.datos_parto.acompanan_tdp,
            teclaAlterna: true,
            id_input: "#validarAcompanante",
          },
          (data) => {
            _this.global_CLAP001.datos_parto.acompanan_tdp = data.COD;

            _this.validarEdadGestParto();
          }
        );
      }, 300);
    },
    validarEdadGestParto() {
      validarInputs(
        {
          form: "#validarEdadGestParto",
          orden: "1",
        },
        () => {
          if (this.global_CLAP001.datos_parto.aborto == "S") this.validarDiaIngreso();
          else this.validarAcompanante();
        },
        () => {
          this.global_CLAP001.datos_parto.sem_fum_ed = this.mask.dos.resolve(
            this.global_CLAP001.datos_parto.sem_fum_ed
          );

          let edad = parseFloat(this.global_CLAP001.datos_parto.sem_fum_ed) || 0;
          let decimal = this.global_CLAP001.datos_parto.sem_fum_ed.split(".")[1] || 0;

          if (edad > 45 || parseInt(decimal) > 7) {
            CON851("", "Dato fuera de rango", null, "error", "Error");
            this.validarEdadGestParto();
          } else this.validarSegun();
        }
      );
    },
    validarSegun() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Segun ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arraySegun,
            callback_f: () => this.validarEdadGestParto(),
            seleccion: this.global_CLAP001.datos_parto.fum_eco_p_a,
            teclaAlterna: true,
            id_input: "#validarSegun",
          },
          (data) => {
            _this.global_CLAP001.datos_parto.fum_eco_p_a = data.COD;

            _this.guardarClap(_this.validarSegun, _this.evaluarSiguientePagina_aborto);
          }
        );
      }, 300);
    },
    evaluarSiguientePagina_aborto() {
      if (this.global_CLAP001.datos_parto.aborto == "S") this.inicializarAborto();
      else this.validarPartograma();
    },
    inicializarAborto() {
      let _this = this;
      // TIENE QUE INICIALIZAR BASTANTES VARIABLES QUE NO SE VAN A CAPTURAR

      this.global_CLAP001.det_partograma = "";
      this.global_CLAP001.datos_parto.trabajo_parto.forEach((element, index) => {
        _this.inicializarTablaParto(index);
      });

      this.global_CLAP001.datos_parto.enfermedades = getObjRegCLAP().datos_parto.enfermedades;
      this.global_CLAP001.datos_parto.vivo_nac = "";
      this.global_CLAP001.datos_parto.muert_nac = "";
      this.global_CLAP001.datos_parto.ante_parto_nac = "";
      this.global_CLAP001.datos_parto.ignor_nac = "";
      this.global_CLAP001.datos_parto.fecha_dia2 = "";
      this.fechas.nacim.ano = "";
      this.fechas.nacim.mes = "";
      this.fechas.nacim.dia = "";
      this.global_CLAP001.datos_parto.hor = "";
      this.global_CLAP001.datos_parto.minu = "";
      this.global_CLAP001.datos_parto.multip_fetos = "";
      this.global_CLAP001.datos_parto.orden_mul = "";
      this.global_CLAP001.ind_prin_induc_oper = "";
      this.global_CLAP001.termin_part_nac = "";
      this.global_CLAP001.datos_parto.posic_parto = "";
      this.global_CLAP001.episiotomia_nac = "";
      this.global_CLAP001.datos_parto.desgarros = "";
      this.global_CLAP001.grado_desg = "";
      this.global_CLAP001.datos_parto.ocitocicos_oci.prelumb_oci = "";
      this.global_CLAP001.datos_parto.ocitocicos_oci.poslumb_oci = "";
      this.global_CLAP001.datos_parto.placenta.comple_pla = "";
      this.global_CLAP001.datos_parto.placenta.reteni_pla = "";
      this.global_CLAP001.datos_parto.ligad_cord = "";
      this.global_CLAP001.datos_parto.medic_recibida = getObjRegCLAP().datos_parto.medic_recibida;
      this.global_CLAP001.datos_parto.recienacido = getObjRegCLAP().datos_parto.recienacido;
      this.global_CLAP001.datos_parto_2.reciennacido2 = getObjRegCLAP().datos_parto_2.reciennacido2;
      this.global_CLAP001.datos_parto.atendi.med_neona = "";
      this.global_CLAP001.datos_parto_2.egreso_rn = getObjRegCLAP().datos_parto_2.egreso_rn;

      this.validarAtendioParto();
    },
    validarPartograma() {
      validarInputs(
        {
          form: "#validarPartograma",
          orden: "1",
        },
        () => this.validarSegun(),
        () => {
          this.global_CLAP001.det_partograma = this.validarSiNo(this.global_CLAP001.det_partograma);

          if (this.global_CLAP001.det_partograma == "S") this.validarTablaPartoHR(0);
          else this.validarEnfermedades();
        }
      );
    },
    validarTablaPartoHR(pos) {
      this.mostrarF3_parto = true;
      validarInputs(
        {
          form: "#validarTablaPartoHR" + pos + "_CLAP001",
          orden: "1",
          event_f3: () => {
            let hr_f3 = parseInt(this.global_CLAP001.datos_parto.trabajo_parto[pos].hora_par) || 0;
            if (hr_f3 == 0) this.inicializarTablaParto(pos);
            this.mostrarF3_parto = false;
            this.guardarTablaPartograma(pos);
          },
          event_flecha_arriba: () => {
            let hr_fu = parseInt(this.global_CLAP001.datos_parto.trabajo_parto[pos].hora_par) || 0;
            if (hr_fu == 0) this.inicializarTablaParto(pos);

            if (pos == 0) this.validarTablaPartoHR(pos);
            else this.validarTablaPartoHR(pos - 1);
          },
          event_flecha_abajo: () => {
            let hr_fd = parseInt(this.global_CLAP001.datos_parto.trabajo_parto[pos].hora_par) || 0;
            if (hr_fd == 0) this.inicializarTablaParto(pos);

            if (pos == 3) this.validarTablaPartoHR(pos);
            else this.validarTablaPartoHR(pos + 1);
          },
        },
        () => {
          if (pos == 0) {
            this.mostrarF3_parto = false;
            this.validarPartograma();
          } else this.validarTablaPartoHR(pos - 1);
        },
        () => {
          let hora = parseInt(this.global_CLAP001.datos_parto.trabajo_parto[pos].hora_par) || 0;

          if (hora == 0) {
            this.inicializarTablaParto(pos);
            if (pos == 3) this.guardarTablaPartograma(pos);
            else this.validarTablaPartoHR(pos + 1);
          } else if (hora < 1 || hora > 23) {
            CON851("", "Hora inválida", null, "error", "Error");
            this.validarTablaPartoHR(pos);
          } else {
            this.mostrarF3_parto = false;
            this.validarTablaPartoMN(pos);
          }
        }
      );
    },
    validarTablaPartoMN(pos) {
      validarInputs(
        {
          form: "#validarTablaPartoMN" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaPartoHR(pos),
        () => {
          let min = parseInt(this.global_CLAP001.datos_parto.trabajo_parto[pos].min_par) || 0;

          if (min < 1 || min > 59) {
            CON851("", "Minuto inválido", null, "error", "Error");
            this.validarTablaPartoMN(pos);
          } else this.validarTablaPartoCompania(pos);
        }
      );
    },
    validarTablaPartoCompania(pos) {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Acompañante ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayAcompanante,
            callback_f: () => this.validarTablaPartoMN(pos),
            seleccion: this.global_CLAP001.datos_parto.trabajo_parto[pos].compan_par,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_CLAP001.datos_parto.trabajo_parto[pos].compan_par = data.COD;
            _this.textos.tabla_parto[pos].compania = data.DESCRIP;

            _this.validarTablaPartoPosicion(pos);
          }
        );
      }, 300);
    },
    validarTablaPartoPosicion(pos) {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Posicion ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosicion,
            callback_f: () => this.validarTablaPartoCompania(pos),
            seleccion: this.global_CLAP001.datos_parto.trabajo_parto[pos].posici_par,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_CLAP001.datos_parto.trabajo_parto[pos].posici_par = data.COD;
            _this.textos.tabla_parto[pos].posicion = data.DESCRIP;

            _this.validarTablaPartoPa1_(pos);
          }
        );
      }, 300);
    },
    validarTablaPartoPa1_(pos) {
      validarInputs(
        {
          form: "#validarTablaPartoPa1_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaPartoPosicion(pos),
        () => {
          let pa1 = parseInt(this.global_CLAP001.datos_parto.trabajo_parto[pos].pa_puls_par1) || 0;

          if (pa1 > 300) {
            CON851("", "Dato fuera de rango", null, "error", "Error");
            this.validarTablaPartoPa1_(pos);
          } else if (pa1 == 0) {
            this.global_CLAP001.datos_parto.trabajo_parto[pos].pa_puls_par1 = "000";
            this.global_CLAP001.datos_parto.trabajo_parto[pos].pa_puls_par3 = "000";
            this.validarTablaPartoPulso(pos);
          } else this.validarTablaPartoPa3_(pos);
        }
      );
    },
    validarTablaPartoPa3_(pos) {
      validarInputs(
        {
          form: "#validarTablaPartoPa3_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaPartoPa1_(pos),
        () => {
          let pa3 = parseInt(this.global_CLAP001.datos_parto.trabajo_parto[pos].pa_puls_par3) || 0;

          if (pa3 > 300) {
            CON851("", "Dato fuera de rango", null, "error", "Error");
            this.validarTablaPartoPa3_(pos);
          } else this.validarTablaPartoPulso(pos);
        }
      );
    },
    validarTablaPartoPulso(pos) {
      validarInputs(
        {
          form: "#validarTablaPartoPulso" + pos + "_CLAP001",
          orden: "1",
        },
        () => {
          if (parseInt(this.global_CLAP001.datos_parto.trabajo_parto[pos].pa_puls_par1) == 0)
            this.validarTablaPartoPa1_(pos);
          else this.validarTablaPartoPa3_(pos);
        },
        () => {
          this.global_CLAP001.datos_parto.trabajo_parto[pos].pulso_par = this.validarNumero(
            this.global_CLAP001.datos_parto.trabajo_parto[pos].pulso_par,
            3
          );
          this.validarTablaPartoContr(pos);
        }
      );
    },
    validarTablaPartoContr(pos) {
      validarInputs(
        {
          form: "#validarTablaPartoContr" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaPartoPulso(pos),
        () => {
          this.global_CLAP001.datos_parto.trabajo_parto[pos].contr_par = this.validarNumero(
            this.global_CLAP001.datos_parto.trabajo_parto[pos].contr_par
          );
          this.validarTablaPartoDilata(pos);
        }
      );
    },
    validarTablaPartoDilata(pos) {
      validarInputs(
        {
          form: "#validarTablaPartoDilata" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaPartoContr(pos),
        () => {
          this.global_CLAP001.datos_parto.trabajo_parto[pos].dilata_par = this.validarNumero(
            this.global_CLAP001.datos_parto.trabajo_parto[pos].dilata_par
          );
          this.validarTablaPartoAltura(pos);
        }
      );
    },
    validarTablaPartoAltura(pos) {
      validarInputs(
        {
          form: "#validarTablaPartoAltura" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaPartoDilata(pos),
        () => {
          this.global_CLAP001.datos_parto.trabajo_parto[pos].alturp_par = this.mask.dos.resolve(
            this.global_CLAP001.datos_parto.trabajo_parto[pos].alturp_par
          );

          this.validarTablaPartoVarPos(pos);
        }
      );
    },
    validarTablaPartoVarPos(pos) {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Posicion ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosicion,
            callback_f: () => this.validarTablaPartoAltura(pos),
            seleccion: this.global_CLAP001.datos_parto.trabajo_parto[pos].vari_po_par,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_CLAP001.datos_parto.trabajo_parto[pos].vari_po_par = data.COD;
            _this.textos.tabla_parto[pos].var_posicion = data.DESCRIP;

            _this.validarTablaPartoMeconio(pos);
          }
        );
      }, 300);
    },
    validarTablaPartoMeconio(pos) {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Meconio ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosNega,
            callback_f: () => this.validarTablaPartoVarPos(pos),
            seleccion: this.global_CLAP001.datos_parto.trabajo_parto[pos].meconi_par,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_CLAP001.datos_parto.trabajo_parto[pos].meconi_par = data.COD;
            _this.textos.tabla_parto[pos].meconio = data.DESCRIP;

            _this.validarTablaPartoFCF(pos);
          }
        );
      }, 300);
    },
    validarTablaPartoFCF(pos) {
      validarInputs(
        {
          form: "#validarTablaPartoFCF" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaPartoMeconio(pos),
        () => {
          this.global_CLAP001.datos_parto.trabajo_parto[pos].fcf_dip_par = this.validarNumero(
            this.global_CLAP001.datos_parto.trabajo_parto[pos].fcf_dip_par
          );

          if (pos == 3) this.guardarTablaPartograma(pos);
          else this.validarTablaPartoHR(pos + 1);
        }
      );
    },
    inicializarTablaParto(pos) {
      var _this = this;

      this.$nextTick(function () {
        Vue.set(_this.global_CLAP001.datos_parto.trabajo_parto, pos, {
          hora_par: "",
          min_par: "",
          compan_par: "",
          posici_par: "",
          pa_puls_par1: "",
          pa_puls_par3: "",
          contr_par: "",
          pulso_par: "",
          dilata_par: "",
          alturp_par: "",
          vari_po_par: "",
          meconi_par: "",
          fcf_dip_par: "",
        });

        _this.textos.tabla_parto[pos].compania = "";
        _this.textos.tabla_parto[pos].posicion = "";
        _this.textos.tabla_parto[pos].var_posicion = "";
        _this.textos.tabla_parto[pos].meconio = "";
      });
    },
    guardarTablaPartograma(pos) {
      this.guardarClap(() => this.validarTablaPartoHR(pos), this.validarEnfermedades);
    },
    validarEnfermedades() {
      validarInputs(
        {
          form: "#validarEnfermedades",
          orden: "1",
        },
        () => {
          if (this.global_CLAP001.det_partograma == "S") this.validarTablaPartoHR(0);
          else this.validarPartograma();
        },
        () => {
          this.global_CLAP001.datos_parto.enfermedades.ninguna = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.ninguna
          );

          if (this.global_CLAP001.datos_parto.enfermedades.ninguna == "S") this.validarHTAprevia();
          else {
            this.global_CLAP001.datos_parto.enfermedades.hta_prev = "N";
            this.global_CLAP001.datos_parto.enfermedades.hta_indu = "N";
            this.global_CLAP001.datos_parto.enfermedades.pre_ecla = "N";
            this.global_CLAP001.datos_parto.enfermedades.eclampsia = "N";
            this.global_CLAP001.datos_parto.enfermedades.cardiop = "N";
            this.global_CLAP001.datos_parto.enfermedades.nefropatia_enf = "N";
            this.global_CLAP001.datos_parto.enfermedades.diabete = "0";
            this.global_CLAP001.datos_parto.enfermedades.infe_ovul = "N";
            this.global_CLAP001.datos_parto.enfermedades.infe_urin = "N";
            this.global_CLAP001.datos_parto.enfermedades.amen_part = "N";
            this.global_CLAP001.datos_parto.enfermedades.rciu = "N";
            this.global_CLAP001.datos_parto.enfermedades.rotu_prem = "N";
            this.global_CLAP001.datos_parto.enfermedades.anemia = "N";
            this.global_CLAP001.datos_parto.enfermedades.otra_cond_enf = "N";

            this.guardarClap(this.validarEnfermedades, this.validarHemorragia);
          }
        }
      );
    },
    validarHTAprevia() {
      validarInputs(
        {
          form: "#validarHTAprevia",
          orden: "1",
        },
        () => this.validarEnfermedades(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.hta_prev = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.hta_prev
          );

          this.validarHTAInducida();
        }
      );
    },
    validarHTAInducida() {
      validarInputs(
        {
          form: "#validarHTAInducida",
          orden: "1",
        },
        () => this.validarHTAprevia(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.hta_indu = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.hta_indu
          );

          this.validarPreeclampcia();
        }
      );
    },
    validarPreeclampcia() {
      validarInputs(
        {
          form: "#validarPreeclampcia",
          orden: "1",
        },
        () => this.validarHTAInducida(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.pre_ecla = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.pre_ecla
          );

          this.validarEclampcia();
        }
      );
    },
    validarEclampcia() {
      validarInputs(
        {
          form: "#validarEclampcia",
          orden: "1",
        },
        () => this.validarPreeclampcia(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.eclampsia = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.eclampsia
          );

          this.validarCardiopatia();
        }
      );
    },
    validarCardiopatia() {
      validarInputs(
        {
          form: "#validarCardiopatia",
          orden: "1",
        },
        () => this.validarEclampcia(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.cardiop = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.cardiop
          );

          this.validarNefropatia();
        }
      );
    },
    validarNefropatia() {
      validarInputs(
        {
          form: "#validarNefropatia",
          orden: "1",
        },
        () => this.validarCardiopatia(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.nefropatia_enf = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.nefropatia_enf
          );

          this.validarDiabetes();
        }
      );
    },
    validarDiabetes() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Diabetes ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayDiabetes,
            callback_f: () => this.validarNefropatia(),
            seleccion: this.global_CLAP001.datos_parto.enfermedades.diabete,
            teclaAlterna: true,
            id_input: "#validarDiabetes",
          },
          (data) => {
            _this.global_CLAP001.datos_parto.enfermedades.diabete = data.COD;

            _this.validarInfecOvul();
          }
        );
      }, 300);
    },
    validarInfecOvul() {
      validarInputs(
        {
          form: "#validarInfecOvul",
          orden: "1",
        },
        () => this.validarDiabetes(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.infe_ovul = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.infe_ovul
          );

          this.validarInfecUrin();
        }
      );
    },
    validarInfecUrin() {
      validarInputs(
        {
          form: "#validarInfecUrin",
          orden: "1",
        },
        () => this.validarInfecOvul(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.infe_urin = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.infe_urin
          );

          this.validarAmenParto();
        }
      );
    },
    validarAmenParto() {
      validarInputs(
        {
          form: "#validarAmenParto",
          orden: "1",
        },
        () => this.validarInfecUrin(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.amen_part = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.amen_part
          );

          this.validarRCIU();
        }
      );
    },
    validarRCIU() {
      validarInputs(
        {
          form: "#validarRCIU",
          orden: "1",
        },
        () => this.validarAmenParto(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.rciu = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.rciu
          );

          this.validarRoturaPrem();
        }
      );
    },
    validarRoturaPrem() {
      validarInputs(
        {
          form: "#validarRoturaPrem",
          orden: "1",
        },
        () => this.validarRCIU(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.rotu_prem = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.rotu_prem
          );

          this.validarAnemia();
        }
      );
    },
    validarAnemia() {
      validarInputs(
        {
          form: "#validarAnemia",
          orden: "1",
        },
        () => this.validarRoturaPrem(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.anemia = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.anemia
          );

          this.validarOtraCondicion();
        }
      );
    },
    validarOtraCondicion() {
      validarInputs(
        {
          form: "#validarOtraCondicion",
          orden: "1",
        },
        () => this.validarAnemia(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.otra_cond_enf = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.otra_cond_enf
          );

          this.guardarClap(this.validarOtraCondicion, this.validarHemorragia);
        }
      );
    },
    validarHemorragia() {
      validarInputs(
        {
          form: "#validarHemorragia",
          orden: "1",
        },
        () => {
          if (this.global_CLAP001.datos_parto.enfermedades.ninguna == "S") this.validarOtraCondicion();
          else this.validarEnfermedades();
        },
        () => {
          this.global_CLAP001.datos_parto.enfermedades.hemorr = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.hemorr
          );

          if (this.global_CLAP001.datos_parto.enfermedades.hemorr == "S") this.validar1erTrim();
          else {
            this.global_CLAP001.datos_parto.enfermedades.primer_trim = "N";
            this.global_CLAP001.datos_parto.enfermedades.segundo_trim = "N";
            this.global_CLAP001.datos_parto.enfermedades.tercer_trim = "N";
            this.global_CLAP001.datos_parto.enfermedades.postpar = "N";
            this.global_CLAP001.datos_parto.enfermedades.infpuer = "N";

            this.guardarClap(this.validarHemorragia, () => this.validarCod_diag_(0));
          }
        }
      );
    },
    validar1erTrim() {
      validarInputs(
        {
          form: "#validar1erTrim",
          orden: "1",
        },
        () => this.validarHemorragia(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.primer_trim = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.primer_trim
          );

          this.validar2doTrim();
        }
      );
    },
    validar2doTrim() {
      validarInputs(
        {
          form: "#validar2doTrim",
          orden: "1",
        },
        () => this.validar1erTrim(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.segundo_trim = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.segundo_trim
          );

          this.validar3erTrim();
        }
      );
    },
    validar3erTrim() {
      validarInputs(
        {
          form: "#validar3erTrim",
          orden: "1",
        },
        () => this.validar2doTrim(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.tercer_trim = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.tercer_trim
          );

          this.validarPosparto();
        }
      );
    },
    validarPosparto() {
      validarInputs(
        {
          form: "#validarPosparto",
          orden: "1",
        },
        () => this.validar3erTrim(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.postpar = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.postpar
          );

          this.validarPuerperal();
        }
      );
    },
    validarPuerperal() {
      validarInputs(
        {
          form: "#validarPuerperal",
          orden: "1",
        },
        () => this.validarPosparto(),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.infpuer = this.validarSiNo(
            this.global_CLAP001.datos_parto.enfermedades.infpuer
          );

          this.guardarClap(this.validarPuerperal, () => this.validarCod_diag_(0));
        }
      );
    },
    escVentanaEnfermedades() {
      this.mostrarEnfermedades = false;
      switch (this.inputEnfer.tipo) {
        case 1:
          this.validarCod_diag_(this.inputEnfer.pos);
          break;
        case 2:
          this.validarCodigoEnfDef();
          break;
        case 3:
          this.validarCod_diag_def_(this.inputEnfer.pos);
          break;
      }
      this.inputEnfer = {
        nombre: "",
        tipo: 0,
        pos: 0,
      };
    },
    ventanaEnfermedades(pos, tipo) {
      this.inputEnfer.pos = pos;
      this.inputEnfer.tipo = tipo;

      switch (this.inputEnfer.tipo) {
        case 1:
          this.inputEnfer.nombre = "#CodDiag_" + pos + "_CLAP001";
          break;
        case 2:
          this.inputEnfer.nombre = "#codEnfDef_CLAP001";
          break;
        case 3:
          this.inputEnfer.nombre = "#CodDiag_posdef_" + pos + "_CLAP001";
          break;
      }
      _fin_validar_form();

      this.mostrarEnfermedades = true;
    },
    successVentanaEnfermedades(data) {
      this.mostrarEnfermedades = false;
      switch (this.inputEnfer.tipo) {
        case 1:
          this.global_CLAP001.datos_parto.enfermedades.tabla_enfermedades[this.inputEnfer.pos].codigo = data.cod;
          this.validarCod_diag_(this.inputEnfer.pos)
          break;
        case 2:
          this.global_CLAP001.datos_parto_2.reciennacido2.cod_def_congen = data.cod;
          this.validarCodigoEnfDef();
          break;
        case 3:
          this.global_CLAP001.datos_parto_2.reciennacido2.enf_rec[this.inputEnfer.pos].codigo = data.cod;
          this.validarCod_diag_def_(this.inputEnfer.pos);
          break;
      }

      setTimeout(() => {
        _enterInput(this.inputEnfer.nombre)
        this.inputEnfer = {
          nombre: "",
          tipo: 0,
          pos: 0,
        };
      }, 100);
    },
    validarCod_diag_(pos) {
      validarInputs(
        {
          form: "#validarCod_diag_" + pos + "_CLAP001",
          orden: "1",
        },
        () => {
          if (pos == 0) {
            if (this.global_CLAP001.datos_parto.enfermedades.hemorr == "S") this.validarPuerperal();
            else this.validarHemorragia();
          } else {
            this.validarCod_diag_(pos - 1);
          }
        },
        () => {
          this.global_CLAP001.datos_parto.enfermedades.tabla_enfermedades[pos].codigo =
            this.global_CLAP001.datos_parto.enfermedades.tabla_enfermedades[pos].codigo.toUpperCase().trim();

          if (this.global_CLAP001.datos_parto.enfermedades.tabla_enfermedades[pos].codigo == "") {
            this.global_CLAP001.datos_parto.enfermedades.tabla_enfermedades[pos].descrip = "NO DIGITADO";
            if (pos == 2) this.validarOtrasNotas();
            else this.validarCod_diag_(pos + 1);
          } else this.consultarCodigoEnf(pos, 1);
        }
      );
    },
    consultarCodigoEnf(pos, tipo) {
      let codigo_envio = "";

      switch (tipo) {
        case 1:
          codigo_envio = this.global_CLAP001.datos_parto.enfermedades.tabla_enfermedades[pos].codigo;
          break;
        case 2:
          codigo_envio = this.global_CLAP001.datos_parto_2.reciennacido2.cod_def_congen;
          break;
        case 3:
          codigo_envio = this.global_CLAP001.datos_parto_2.reciennacido2.enf_rec[pos].codigo;
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

          if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == "")
            _this.errorCodigoEnfermedad(pos, tipo);
          else _this.successCodigoEnfermedad(pos, tipo, data.NOMBRE_ENF.replace(/\s\s+/g, " "));
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          _this.errorCodigoEnfermedad(pos, tipo);
        });
    },
    errorCodigoEnfermedad(pos, tipo) {
      CON851("", "Enfermedad no encontrada!", null, "error", "Error");
      switch (tipo) {
        case 1:
          this.global_CLAP001.datos_parto.enfermedades.tabla_enfermedades[pos].descrip = "ENFERMEDAD NO ENCONTRADA";
          this.validarCod_diag_(pos);
          break;
        case 2:
          this.textos.enfermedad_defectos = "ENFERMEDAD NO ENCONTRADA";
          this.validarCodigoEnfDef();
          break;
        case 3:
          this.global_CLAP001.datos_parto_2.reciennacido2.enf_rec[pos].descrip = "ENFERMEDAD NO ENCONTRADA";
          this.validarCod_diag_def_(pos);
          break;
      }
    },
    successCodigoEnfermedad(pos, tipo, descrip) {
      switch (tipo) {
        case 1:
          this.global_CLAP001.datos_parto.enfermedades.tabla_enfermedades[pos].descrip = descrip;
          if (pos == 2) this.validarOtrasNotas();
          else this.validarCod_diag_(pos + 1);
          break;
        case 2:
          this.textos.enfermedad_defectos = descrip;
          this.validarCod_diag_def_(0);
          break;
        case 3:
          this.global_CLAP001.datos_parto_2.reciennacido2.enf_rec[pos].descrip = descrip;
          if (pos == 2) this.validarVdrl();
          else this.validarCod_diag_def_(pos + 1);
          break;
      }
    },
    validarOtrasNotas() {
      validarInputs(
        {
          form: "#validarOtrasNotas",
          orden: "1",
        },
        () => this.validarCod_diag_(2),
        () => {
          this.global_CLAP001.datos_parto.enfermedades.notas_enf =
            this.global_CLAP001.datos_parto.enfermedades.notas_enf.trim();

          this.guardarClap(this.validarOtrasNotas, this.validarNacidoVivo_2);
        }
      );
    },
    validarNacidoVivo_2() {
      validarInputs(
        {
          form: "#validarNacidoVivo_2",
          orden: "1",
        },
        () => this.validarOtrasNotas(),
        () => {
          this.global_CLAP001.datos_parto.vivo_nac = this.validarSiNo(this.global_CLAP001.datos_parto.vivo_nac);

          if (this.global_CLAP001.datos_parto.vivo_nac == "S") {
            this.global_CLAP001.datos_parto.muert_nac = "N";
            this.global_CLAP001.datos_parto.ante_parto_nac = "N";
            this.global_CLAP001.datos_parto.ignor_nac = "N";

            this.validarAnoNacim();
          } else this.validarNacidoMuerto_2();
        }
      );
    },
    validarNacidoMuerto_2() {
      validarInputs(
        {
          form: "#validarNacidoMuerto_2",
          orden: "1",
        },
        () => this.validarNacidoVivo_2(),
        () => {
          this.global_CLAP001.datos_parto.muert_nac = this.validarSiNo(this.global_CLAP001.datos_parto.muert_nac);

          if (this.global_CLAP001.datos_parto.muert_nac == "S") {
            this.global_CLAP001.datos_parto.ante_parto_nac = "N";
            this.global_CLAP001.datos_parto.ignor_nac = "N";

            this.validarAnoNacim();
          } else this.validarMuerteAnteparto();
        }
      );
    },
    validarMuerteAnteparto() {
      validarInputs(
        {
          form: "#validarMuerteAnteparto",
          orden: "1",
        },
        () => this.validarNacidoMuerto_2(),
        () => {
          this.global_CLAP001.datos_parto.ante_parto_nac = this.validarSiNo(
            this.global_CLAP001.datos_parto.ante_parto_nac
          );

          if (this.global_CLAP001.datos_parto.ante_parto_nac == "S") {
            this.global_CLAP001.datos_parto.ignor_nac = "N";

            this.validarAnoNacim();
          } else this.validarIgnoraMoment();
        }
      );
    },
    validarIgnoraMoment() {
      validarInputs(
        {
          form: "#validarIgnoraMoment",
          orden: "1",
        },
        () => this.validarMuerteAnteparto(),
        () => {
          this.global_CLAP001.datos_parto.ignor_nac = this.validarSiNo(this.global_CLAP001.datos_parto.ignor_nac);

          if (
            this.global_CLAP001.datos_parto.muert_nac == "N" &&
            this.global_CLAP001.datos_parto.ante_parto_nac == "N" &&
            this.global_CLAP001.datos_parto.ignor_nac == "N"
          ) {
            CON851("", "Anteparto y muerte nacido son NO!", null, "error", "Error");
            this.validarIgnoraMoment();
          } else this.validarAnoNacim();
        }
      );
    },
    validarAnoNacim() {
      validarInputs(
        {
          form: "#validarAnoNacim",
          orden: "1",
        },
        () => this.validarNacidoVivo_2(),
        () => {
          let ano = parseInt(this.fechas.nacim.ano) || 0;

          if (ano == 0 || ano < 1900) {
            CON851("", "Año inválido", null, "error", "Error");
            this.validarAnoNacim();
          } else this.validarMesNacim();
        }
      );
    },
    validarMesNacim() {
      validarInputs(
        {
          form: "#validarMesNacim",
          orden: "1",
        },
        () => this.validarAnoNacim(),
        () => {
          let mes = parseInt(this.fechas.nacim.mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("", "Mes inválido", null, "error", "Error");
            this.validarMesNacim();
          } else this.validarDiaNacim();
        }
      );
    },
    validarDiaNacim() {
      validarInputs(
        {
          form: "#validarDiaNacim",
          orden: "1",
        },
        () => this.validarMesNacim(),
        () => {
          let dia_num = parseInt(this.fechas.nacim.dia) || 0;

          let ano = this.fechas.nacim.ano;
          let mes = this.fechas.nacim.mes;
          let dia = this.fechas.nacim.dia;

          if (dia_num < 1 || dia_num > 31) {
            CON851("", "Día inválido", null, "error", "Error");
            this.validarDiaNacim();
          } else if (!_validarFecha(ano, mes, dia)) {
            CON851("37", "Fecha fuera de rango", null, "error", "Error");
            this.validarDiaNacim();
          } else {
            this.global_CLAP001.datos_parto.fecha_dia2 =
              this.fechas.nacim.ano + this.fechas.nacim.mes.padStart(2, "0") + this.fechas.nacim.dia.padStart(2, "0");

            this.validarHoraNacim();
          }
        }
      );
    },
    validarHoraNacim() {
      validarInputs(
        {
          form: "#validarHoraNacim",
          orden: "1",
        },
        () => this.validarDiaNacim(),
        () => {
          let hora = parseInt(this.global_CLAP001.datos_parto.hor) || 0;

          if (hora > 23 || hora < 1) {
            CON851("37", "Hora fuera de rango", null, "error", "Error");
            this.validarHoraNacim();
          } else this.validarMinNacim();
        }
      );
    },
    validarMinNacim() {
      validarInputs(
        {
          form: "#validarMinNacim",
          orden: "1",
        },
        () => this.validarHoraNacim(),
        () => {
          let min = parseInt(this.global_CLAP001.datos_parto.minu) || 0;

          if (min > 59 || min < 1) {
            CON851("37", "Minuto fuera de rango", null, "error", "Error");
            this.validarMinNacim();
          } else this.validarMultiples();
        }
      );
    },
    validarMultiples() {
      validarInputs(
        {
          form: "#validarMultiples",
          orden: "1",
        },
        () => this.validarMinNacim(),
        () => {
          this.global_CLAP001.datos_parto.multip_fetos = this.validarSiNo(this.global_CLAP001.datos_parto.multip_fetos);

          if (this.global_CLAP001.datos_parto.multip_fetos == "N") {
            this.global_CLAP001.datos_parto.orden_mul = "";
            this.validarTerminacionParto();
          } else this.validarMultiplesOrden();
        }
      );
    },
    validarMultiplesOrden() {
      validarInputs(
        {
          form: "#validarMultiplesOrden",
          orden: "1",
        },
        () => this.validarMultiples(),
        () => {
          this.global_CLAP001.datos_parto.orden_mul = this.validarNumero(this.global_CLAP001.datos_parto.orden_mul);

          this.validarTerminacionParto();
        }
      );
    },
    validarTerminacionParto() {
      let _this = this;

      if (this.global_CLAP001.termin_part_nac == "") this.global_CLAP001.termin_part_nac = "1";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Terminacion del parto ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayTerminacionParto,
            callback_f: () => {
              if (this.global_CLAP001.datos_parto.multip_fetos == "S") this.validarMultiplesOrden();
              else this.validarMultiples();
            },
            seleccion: this.global_CLAP001.termin_part_nac,
            teclaAlterna: true,
            id_input: "#validarTerminacionParto",
          },
          (data) => {
            _this.global_CLAP001.termin_part_nac = data.COD;

            _this.validarIndicePrinc();
          }
        );
      }, 300);
    },
    validarIndicePrinc() {
      validarInputs(
        {
          form: "#validarIndicePrinc",
          orden: "1",
        },
        () => this.validarTerminacionParto(),
        () => {
          this.global_CLAP001.ind_prin_induc_oper = this.global_CLAP001.ind_prin_induc_oper.trim();
          this.validarPosicionParto();
        }
      );
    },
    validarPosicionParto() {
      let _this = this;

      if (this.global_CLAP001.datos_parto.posic_parto == "") this.global_CLAP001.datos_parto.posic_parto = "1";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Posicion del parto ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosicion,
            callback_f: () => this.validarIndicePrinc(),
            seleccion: this.global_CLAP001.datos_parto.posic_parto,
            teclaAlterna: true,
            id_input: "#validarPosicionParto",
          },
          (data) => {
            _this.global_CLAP001.datos_parto.posic_parto = data.COD;

            _this.validarEpisiotomia();
          }
        );
      }, 300);
    },
    validarEpisiotomia() {
      validarInputs(
        {
          form: "#validarEpisiotomia",
          orden: "1",
        },
        () => this.validarPosicionParto(),
        () => {
          this.global_CLAP001.episiotomia_nac = this.validarSiNo(this.global_CLAP001.episiotomia_nac);

          this.validarDesgarros();
        }
      );
    },
    validarDesgarros() {
      validarInputs(
        {
          form: "#validarDesgarros",
          orden: "1",
        },
        () => this.validarEpisiotomia(),
        () => {
          this.global_CLAP001.datos_parto.desgarros = this.validarSiNo(this.global_CLAP001.datos_parto.desgarros);

          if (this.global_CLAP001.datos_parto.desgarros == "S") this.validarDesgarroOrden();
          else {
            this.global_CLAP001.grado_desg = "";
            this.validarOcitocitosPre();
          }
        }
      );
    },
    validarDesgarroOrden() {
      validarInputs(
        {
          form: "#validarDesgarroOrden",
          orden: "1",
        },
        () => this.validarDesgarros(),
        () => {
          this.global_CLAP001.grado_desg = this.validarNumero(this.global_CLAP001.grado_desg);

          this.validarOcitocitosPre();
        }
      );
    },
    validarOcitocitosPre() {
      validarInputs(
        {
          form: "#validarOcitocitosPre",
          orden: "1",
        },
        () => {
          if (this.global_CLAP001.datos_parto.desgarros == "S") this.validarDesgarroOrden();
          else this.validarDesgarros();
        },
        () => {
          this.global_CLAP001.datos_parto.ocitocicos_oci.prelumb_oci = this.validarSiNo(
            this.global_CLAP001.datos_parto.ocitocicos_oci.prelumb_oci
          );

          this.validarOcitocitosPos();
        }
      );
    },
    validarOcitocitosPos() {
      validarInputs(
        {
          form: "#validarOcitocitosPos",
          orden: "1",
        },
        () => this.validarOcitocitosPre(),
        () => {
          this.global_CLAP001.datos_parto.ocitocicos_oci.poslumb_oci = this.validarSiNo(
            this.global_CLAP001.datos_parto.ocitocicos_oci.poslumb_oci
          );

          this.validarPlacentaCompleta();
        }
      );
    },
    validarPlacentaCompleta() {
      validarInputs(
        {
          form: "#validarPlacentaCompleta",
          orden: "1",
        },
        () => this.validarOcitocitosPos(),
        () => {
          this.global_CLAP001.datos_parto.placenta.comple_pla = this.validarSiNo(
            this.global_CLAP001.datos_parto.placenta.comple_pla
          );

          this.validarPlacentaRetenida();
        }
      );
    },
    validarPlacentaRetenida() {
      validarInputs(
        {
          form: "#validarPlacentaRetenida",
          orden: "1",
        },
        () => this.validarPlacentaCompleta(),
        () => {
          this.global_CLAP001.datos_parto.placenta.reteni_pla = this.validarSiNo(
            this.global_CLAP001.datos_parto.placenta.reteni_pla
          );

          this.validarLigaduraCordon();
        }
      );
    },
    validarLigaduraCordon() {
      validarInputs(
        {
          form: "#validarLigaduraCordon",
          orden: "1",
        },
        () => this.validarPlacentaRetenida(),
        () => {
          this.global_CLAP001.datos_parto.ligad_cord = this.validarSiNo(this.global_CLAP001.datos_parto.ligad_cord);

          this.guardarClap(this.validarLigaduraCordon, this.validarOcitocicos);
        }
      );
    },
    validarOcitocicos() {
      validarInputs(
        {
          form: "#validarOcitocicos",
          orden: "1",
        },
        () => this.validarLigaduraCordon(),
        () => {
          this.global_CLAP001.datos_parto.medic_recibida.med_ocioto = this.validarSiNo(
            this.global_CLAP001.datos_parto.medic_recibida.med_ocioto
          );

          this.validarAntibioticos();
        }
      );
    },
    validarAntibioticos() {
      validarInputs(
        {
          form: "#validarAntibioticos",
          orden: "1",
        },
        () => this.validarOcitocicos(),
        () => {
          this.global_CLAP001.datos_parto.medic_recibida.med_antib = this.validarSiNo(
            this.global_CLAP001.datos_parto.medic_recibida.med_antib
          );

          this.validarAnalgesicos();
        }
      );
    },
    validarAnalgesicos() {
      validarInputs(
        {
          form: "#validarAnalgesicos",
          orden: "1",
        },
        () => this.validarAntibioticos(),
        () => {
          this.global_CLAP001.datos_parto.medic_recibida.med_analge = this.validarSiNo(
            this.global_CLAP001.datos_parto.medic_recibida.med_analge
          );

          this.validarAnestesiaLocal();
        }
      );
    },
    validarAnestesiaLocal() {
      validarInputs(
        {
          form: "#validarAnestesiaLocal",
          orden: "1",
        },
        () => this.validarAnalgesicos(),
        () => {
          this.global_CLAP001.datos_parto.medic_recibida.med_anest = this.validarSiNo(
            this.global_CLAP001.datos_parto.medic_recibida.med_anest
          );

          this.validarAnestesiaRegi();
        }
      );
    },
    validarAnestesiaRegi() {
      validarInputs(
        {
          form: "#validarAnestesiaRegi",
          orden: "1",
        },
        () => this.validarAnestesiaLocal(),
        () => {
          this.global_CLAP001.datos_parto.medic_recibida.med_anest_regi = this.validarSiNo(
            this.global_CLAP001.datos_parto.medic_recibida.med_anest_regi
          );

          this.validarAnestesiaTotal();
        }
      );
    },
    validarAnestesiaTotal() {
      validarInputs(
        {
          form: "#validarAnestesiaTotal",
          orden: "1",
        },
        () => this.validarAnestesiaRegi(),
        () => {
          this.global_CLAP001.datos_parto.medic_recibida.med_anest_total = this.validarSiNo(
            this.global_CLAP001.datos_parto.medic_recibida.med_anest_total
          );

          this.validarTransfusion();
        }
      );
    },
    validarTransfusion() {
      validarInputs(
        {
          form: "#validarTransfusion",
          orden: "1",
        },
        () => this.validarAnestesiaTotal(),
        () => {
          this.global_CLAP001.datos_parto.medic_recibida.med_transf = this.validarSiNo(
            this.global_CLAP001.datos_parto.medic_recibida.med_transf
          );

          this.validarMedicamentosOtros();
        }
      );
    },
    validarMedicamentosOtros() {
      validarInputs(
        {
          form: "#validarMedicamentosOtros",
          orden: "1",
        },
        () => this.validarTransfusion(),
        () => {
          this.global_CLAP001.datos_parto.medic_recibida.med_otros =
            this.global_CLAP001.datos_parto.medic_recibida.med_otros.trim();

          this.guardarClap(this.validarMedicamentosOtros, this.validarSexo);
        }
      );
    },
    validarSexo() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Sexo ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arraySexo,
            callback_f: () => this.validarMedicamentosOtros(),
            seleccion: this.global_CLAP001.datos_parto.recienacido.rec_sexo,
            teclaAlterna: true,
            id_input: "#validarSexo",
          },
          (data) => {
            _this.global_CLAP001.datos_parto.recienacido.rec_sexo = data.COD;
            _this.validarPesoNacido();
          }
        );
      }, 300);
    },
    validarPesoNacido() {
      validarInputs(
        {
          form: "#validarPesoNacido",
          orden: "1",
        },
        () => this.validarSexo(),
        () => {
          this.global_CLAP001.datos_parto.recienacido.rec_peso = this.validarNumero(
            this.global_CLAP001.datos_parto.recienacido.rec_peso,
            4
          );

          this.validarPerCef();
        }
      );
    },
    validarPerCef() {
      validarInputs(
        {
          form: "#validarPerCef",
          orden: "1",
        },
        () => this.validarPesoNacido(),
        () => {
          this.global_CLAP001.datos_parto.recienacido.rec_percef = this.mask.dos.resolve(
            this.global_CLAP001.datos_parto.recienacido.rec_percef
          );

          this.validarLongitud();
        }
      );
    },
    validarLongitud() {
      validarInputs(
        {
          form: "#validarLongitud",
          orden: "1",
        },
        () => this.validarPerCef(),
        () => {
          this.global_CLAP001.datos_parto.recienacido.rec_longit = this.validarNumero(
            this.global_CLAP001.datos_parto.recienacido.rec_longit,
            3
          );

          this.validarSemEgConfiable();
        }
      );
    },
    validarSemEgConfiable() {
      validarInputs(
        {
          form: "#validarSemEgConfiable",
          orden: "1",
        },
        () => this.validarLongitud(),
        () => {
          this.global_CLAP001.datos_parto.recienacido.rec_eg_conf.conf_sem = this.validarNumero(
            this.global_CLAP001.datos_parto.recienacido.rec_eg_conf.conf_sem
          );

          this.validarDiaEgConfiable();
        }
      );
    },
    validarDiaEgConfiable() {
      validarInputs(
        {
          form: "#validarDiaEgConfiable",
          orden: "1",
        },
        () => this.validarSemEgConfiable(),
        () => {
          this.global_CLAP001.datos_parto.recienacido.rec_eg_conf.conf_dia = this.validarNumero(
            this.global_CLAP001.datos_parto.recienacido.rec_eg_conf.conf_dia
          );

          this.validarSegunRecNacido();
        }
      );
    },
    validarSegunRecNacido() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Según ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arraySegun,
            callback_f: () => this.validarDiaEgConfiable(),
            seleccion: this.global_CLAP001.datos_parto.recienacido.fum_eco_rn,
            teclaAlterna: true,
            id_input: "#validarSegunRecNacido",
          },
          (data) => {
            _this.global_CLAP001.datos_parto.recienacido.fum_eco_rn = data.COD;
            _this.validarPesoEgConfiable();
          }
        );
      }, 300);
    },
    validarPesoEgConfiable() {
      let _this = this;

      if (this.global_CLAP001.datos_parto.recienacido.peso_eg == "")
        this.global_CLAP001.datos_parto.recienacido.peso_eg = "1";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Peso para edad gestacional ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPesoEG,
            callback_f: () => this.validarSegunRecNacido(),
            seleccion: this.global_CLAP001.datos_parto.recienacido.peso_eg,
            teclaAlterna: true,
            id_input: "#validarPesoEgConfiable",
          },
          (data) => {
            _this.global_CLAP001.datos_parto.recienacido.peso_eg = data.COD;

            _this.guardarClap(_this.validarPesoEgConfiable, _this.validar1erApgar);
          }
        );
      }, 300);
    },
    validar1erApgar() {
      validarInputs(
        {
          form: "#validar1erApgar",
          orden: "1",
        },
        () => this.validarPesoEgConfiable(),
        () => {
          this.global_CLAP001.datos_parto.recienacido.primermin = this.validarNumero(
            this.global_CLAP001.datos_parto.recienacido.primermin
          );

          this.validar5toApgar();
        }
      );
    },
    validar5toApgar() {
      validarInputs(
        {
          form: "#validar5toApgar",
          orden: "1",
        },
        () => this.validar1erApgar(),
        () => {
          this.global_CLAP001.datos_parto.recienacido.quintomin = this.validarNumero(
            this.global_CLAP001.datos_parto.recienacido.quintomin
          );

          this.validarOxigeno();
        }
      );
    },
    validarOxigeno() {
      validarInputs(
        {
          form: "#validarOxigeno",
          orden: "1",
        },
        () => this.validar5toApgar(),
        () => {
          this.global_CLAP001.datos_parto.recienacido.o2 = this.validarSiNo(
            this.global_CLAP001.datos_parto.recienacido.o2
          );

          this.validarMascara();
        }
      );
    },
    validarMascara() {
      validarInputs(
        {
          form: "#validarMascara",
          orden: "1",
        },
        () => this.validarOxigeno(),
        () => {
          this.global_CLAP001.datos_parto.recienacido.mascar = this.validarSiNo(
            this.global_CLAP001.datos_parto.recienacido.mascar
          );

          this.validarTubo();
        }
      );
    },
    validarTubo() {
      validarInputs(
        {
          form: "#validarTubo",
          orden: "1",
        },
        () => this.validarMascara(),
        () => {
          this.global_CLAP001.datos_parto.recienacido.tubo = this.validarSiNo(
            this.global_CLAP001.datos_parto.recienacido.tubo
          );

          this.validarMasajeCard();
        }
      );
    },
    validarMasajeCard() {
      validarInputs(
        {
          form: "#validarMasajeCard",
          orden: "1",
        },
        () => this.validarTubo(),
        () => {
          this.global_CLAP001.datos_parto.recienacido.masaje = this.validarSiNo(
            this.global_CLAP001.datos_parto.recienacido.masaje
          );

          this.validarAspiracion();
        }
      );
    },
    validarAspiracion() {
      validarInputs(
        {
          form: "#validarAspiracion",
          orden: "1",
        },
        () => this.validarMasajeCard(),
        () => {
          this.global_CLAP001.datos_parto.recienacido.aspiracion = this.validarSiNo(
            this.global_CLAP001.datos_parto.recienacido.aspiracion
          );

          this.validarEstimulacion();
        }
      );
    },
    validarEstimulacion() {
      validarInputs(
        {
          form: "#validarEstimulacion",
          orden: "1",
        },
        () => this.validarAspiracion(),
        () => {
          this.global_CLAP001.datos_parto.recienacido.estimulacion = this.validarSiNo(
            this.global_CLAP001.datos_parto.recienacido.estimulacion
          );

          this.guardarClap(this.validarEstimulacion, this.validarAtendioParto);
        }
      );
    },
    traerTodosLosMedicos(tipo) {
      loader("show");
      var _this = this;
      let nombre = "";

      switch (tipo) {
        case 1:
          nombre = "#codMedParto_CLAP001";
          break;
        case 2:
          nombre = "#codMedAtend_CLAP001";
          break;
        case 3:
          nombre = "#codMedEgr_RN_CLAP001";
          break;
        case 4:
          nombre = "#codMedEgr_MT_CLAP001";
          break;
      }
      $(nombre).prop("disabled", true);

      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
        .then(function (data) {
          _this.profesionales = data.ARCHPROF;
          _this.profesionales.pop();
          for (var i in _this.profesionales) {
            _this.profesionales[i].NOMBRE = _this.profesionales[i].NOMBRE.replace(/\�/g, "Ñ").trim();
          }
          _this.ventanaProfesionales(tipo, nombre);
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          $(nombre).removeAttr("disabled");
          $(nombre).focus();
        });
    },
    ventanaProfesionales(tipo, nombre) {
      let _this = this;
      loader("hide");
      _ventanaDatos({
        titulo: "Ventana profesionales activos",
        columnas: ["IDENTIFICACION", "NOMBRE", "DESCRIPCION", "REG_MEDICO"],
        data: this.profesionales,
        ancho: "70%",
        callback_esc: () => {
          $(nombre).removeAttr("disabled");
          $(nombre).focus();
        },
        callback: (data) => {
          switch (tipo) {
            case 1:
              _this.global_CLAP001.datos_parto.atendi.med_parto = data.IDENTIFICACION;
              // _this.textos.medico_parto = data.NOMBRE;
              break;
            case 2:
              _this.global_CLAP001.datos_parto.atendi.med_neona = data.IDENTIFICACION;
              // _this.textos.medico_neonato = data.NOMBRE;
              break;
            case 3:
              _this.global_CLAP001.datos_parto_2.egreso_rn.reponsable_rg_rn = data.IDENTIFICACION;
              break;
            case 4:
              _this.global_CLAP001.datos_parto_2.egreso_materno.responsable_eg_mt = data.IDENTIFICACION;
              break;
          }

          $(nombre).removeAttr("disabled");
          setTimeout(() => _enterInput(nombre), 100);
        },
      });
    },
    validarAtendioParto() {
      validarInputs(
        {
          form: "#validarAtendioParto",
          orden: "1",
        },
        () => {
          if (this.global_CLAP001.datos_parto.aborto == "S") this.validarSegun();
          else this.validarEstimulacion();
        },
        () => {
          this.global_CLAP001.datos_parto.atendi.med_parto = this.global_CLAP001.datos_parto.atendi.med_parto.trim();
          this.consultarCodigoMed(1);
        }
      );
    },
    validarAtendioNeonato() {
      validarInputs(
        {
          form: "#validarAtendioNeonato",
          orden: "1",
        },
        () => this.validarAtendioParto(),
        () => {
          this.global_CLAP001.datos_parto.atendi.med_neona = this.global_CLAP001.datos_parto.atendi.med_neona.trim();
          this.consultarCodigoMed(2);
        }
      );
    },
    consultarCodigoMed(tipo) {
      let codigo_envio = "";

      switch (tipo) {
        case 1:
          codigo_envio = this.global_CLAP001.datos_parto.atendi.med_parto;
          break;
        case 2:
          codigo_envio = this.global_CLAP001.datos_parto.atendi.med_neona;
          break;
        case 3:
          codigo_envio = this.global_CLAP001.datos_parto_2.egreso_rn.reponsable_rg_rn;
          break;
        case 4:
          codigo_envio = this.global_CLAP001.datos_parto_2.egreso_materno.responsable_eg_mt;
          break;
      }

      loader("show");
      var _this = this;
      var data = {
        datosh: datosEnvio(),
        codigo: codigo_envio,
        paso: "1",
      };

      postData(data, get_url("APP/SALUD/SER819.DLL"))
        .then(function (data) {
          loader("hide");

          if (data.NOMBRE == "Personal no atiende" || data.IDENTIFICACION.trim() == "") _this.errorCodigoMedico(tipo);
          else _this.successCodigoMedico(tipo, data.NOMBRE.replace(/\s\s+/g, " "));
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          _this.errorCodigoMedico(tipo);
        });
    },
    errorCodigoMedico(tipo) {
      CON851("", "Médico no encontrado!", null, "error", "Error");
      switch (tipo) {
        case 1:
          this.textos.medico_parto = "MÉDICO NO ENCONTRADO";
          this.validarAtendioParto();
          break;
        case 2:
          this.textos.medico_neonato = "MÉDICO NO ENCONTRADO";
          this.validarAtendioNeonato();
          break;
        case 3:
          this.textos.medico_responsable_rn = "MÉDICO NO ENCONTRADO";
          this.validarResponsableRN();
          break;
        case 4:
          this.textos.medico_responsable_mt = "MÉDICO NO ENCONTRADO";
          this.validarResponsableMT();
          break;
      }
    },
    successCodigoMedico(tipo, descrip) {
      switch (tipo) {
        case 1:
          this.textos.medico_parto = descrip;
          if (this.global_CLAP001.datos_parto.aborto == "S") {
            this.guardarClap(this.validarAtendioParto, this.validarVivoEgresoMaterna);
          } else this.validarAtendioNeonato();
          break;
        case 2:
          this.textos.medico_neonato = descrip;
          this.validarFallece();
          break;
        case 3:
          this.textos.medico_responsable_rn = descrip;
          this.guardarClap(this.validarResponsableRN, this.validarVivoEgresoMaterna);
          break;
        case 4:
          this.textos.medico_responsable_mt = descrip;
          this.guardarClap(this.validarResponsableMT, this.validarConsejeria);
          break;
      }
    },
    validarFallece() {
      validarInputs(
        {
          form: "#validarFallece",
          orden: "1",
        },
        () => this.validarAtendioNeonato(),
        () => {
          this.global_CLAP001.datos_parto.recienacido.fallec = this.validarSiNo(
            this.global_CLAP001.datos_parto.recienacido.fallec
          );

          this.validarReferido();
        }
      );
    },
    validarReferido() {
      let _this = this;

      if (this.global_CLAP001.datos_parto_2.reciennacido2.referido == "")
        this.global_CLAP001.datos_parto_2.reciennacido2.referido = "1";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Referido ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayReferido,
            callback_f: () => this.validarFallece(),
            seleccion: this.global_CLAP001.datos_parto_2.reciennacido2.referido,
            teclaAlterna: true,
            id_input: "#validarReferido",
          },
          (data) => {
            _this.global_CLAP001.datos_parto_2.reciennacido2.referido = data.COD;
            _this.validarDefectoMenor();
          }
        );
      }, 300);
    },
    validarDefectoMenor() {
      validarInputs(
        {
          form: "#validarDefectoMenor",
          orden: "1",
        },
        () => this.validarReferido(),
        () => {
          this.global_CLAP001.datos_parto_2.reciennacido2.def_congen_men = this.validarSiNo(
            this.global_CLAP001.datos_parto_2.reciennacido2.def_congen_men
          );

          if (this.global_CLAP001.datos_parto_2.reciennacido2.def_congen_men == "S") {
            this.global_CLAP001.datos_parto_2.reciennacido2.def_congen_may = "N";
            this.validarCodigoEnfDef();
          } else this.validarDefectoMayor();
        }
      );
    },
    validarDefectoMayor() {
      validarInputs(
        {
          form: "#validarDefectoMayor",
          orden: "1",
        },
        () => this.validarDefectoMenor(),
        () => {
          this.global_CLAP001.datos_parto_2.reciennacido2.def_congen_may = this.validarSiNo(
            this.global_CLAP001.datos_parto_2.reciennacido2.def_congen_may
          );

          if (this.global_CLAP001.datos_parto_2.reciennacido2.def_congen_may == "N") {
            this.global_CLAP001.datos_parto_2.reciennacido2.cod_def_congen = "";
            this.textos.enfermedad_defectos = "";
            this.validarCod_diag_def_(0);
          } else this.validarCodigoEnfDef();
        }
      );
    },
    validarCodigoEnfDef() {
      validarInputs(
        {
          form: "#validarCodigoEnfDef",
          orden: "1",
        },
        () => {
          if (this.global_CLAP001.datos_parto_2.reciennacido2.def_congen_men == "S") this.validarDefectoMenor();
          else this.validarDefectoMayor();
        },
        () => {
          this.global_CLAP001.datos_parto_2.reciennacido2.cod_def_congen =
            this.global_CLAP001.datos_parto_2.reciennacido2.cod_def_congen.toUpperCase().trim();

          if (this.global_CLAP001.datos_parto_2.reciennacido2.cod_def_congen == "") {
            this.textos.enfermedad_defectos = "NO DIGITADO";
            this.validarCod_diag_def_(0);
          } else this.consultarCodigoEnf(0, 2);
        }
      );
    },
    validarCod_diag_def_(pos) {
      validarInputs(
        {
          form: "#validarCod_diag_def_" + pos + "_CLAP001",
          orden: "1",
        },
        () => {
          if (pos == 0) {
            if (
              this.global_CLAP001.datos_parto_2.reciennacido2.def_congen_men == "S" ||
              this.global_CLAP001.datos_parto_2.reciennacido2.def_congen_may == "S"
            )
              this.validarCodigoEnfDef();
            else this.validarDefectoMayor();
          } else this.validarCod_diag_def_(pos - 1);
        },
        () => {
          this.global_CLAP001.datos_parto_2.reciennacido2.enf_rec[pos].codigo =
            this.global_CLAP001.datos_parto_2.reciennacido2.enf_rec[pos].codigo.toUpperCase().trim();

          if (this.global_CLAP001.datos_parto_2.reciennacido2.enf_rec[pos].codigo == "") {
            this.global_CLAP001.datos_parto_2.reciennacido2.enf_rec[pos].descrip = "NO DIGITADO";
            if (pos == 2) this.validarVdrl();
            else this.validarCod_diag_def_(pos + 1);
          } else this.consultarCodigoEnf(pos, 3);
        }
      );
    },
    validarVdrl() {
      let _this = this;

      if (this.global_CLAP001.datos_parto_2.reciennacido2.vdrl_rec == "")
        this.global_CLAP001.datos_parto_2.reciennacido2.vdrl_rec = "+";

      setTimeout(() => {
        POPUP(
          {
            titulo: "VDRL ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosNegaHizoPend,
            callback_f: () => this.validarCod_diag_def_(2),
            seleccion: this.global_CLAP001.datos_parto_2.reciennacido2.vdrl_rec,
            teclaAlterna: true,
            id_input: "#validarVdrl",
          },
          (data) => {
            _this.global_CLAP001.datos_parto_2.reciennacido2.vdrl_rec = data.COD;

            if (_this.global_CLAP001.datos_parto_2.reciennacido2.vdrl_rec == "+") _this.validarTratamiento();
            else {
              _this.global_CLAP001.datos_parto_2.reciennacido2.trat_vdrl_rec = "1";
              _this.validarTSH();
            }
          }
        );
      }, 300);
    },
    validarTratamiento() {
      let _this = this;

      if (this.global_CLAP001.datos_parto_2.reciennacido2.trat_vdrl_rec == "")
        this.global_CLAP001.datos_parto_2.reciennacido2.trat_vdrl_rec = "0";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Tratamiento ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arraySIFILIS_2,
            callback_f: () => this.validarVdrl(),
            seleccion: this.global_CLAP001.datos_parto_2.reciennacido2.trat_vdrl_rec,
            teclaAlterna: true,
            id_input: "#validarTratamiento",
          },
          (data) => {
            _this.global_CLAP001.datos_parto_2.reciennacido2.trat_vdrl_rec = data.COD;
            _this.validarTSH();
          }
        );
      }, 300);
    },
    validarTSH() {
      let _this = this;

      if (this.global_CLAP001.datos_parto_2.reciennacido2.tsh_rec == "")
        this.global_CLAP001.datos_parto_2.reciennacido2.tsh_rec = "+";

      setTimeout(() => {
        POPUP(
          {
            titulo: "TSH ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosNegaHizoPend,
            callback_f: () => {
              if (this.global_CLAP001.datos_parto_2.reciennacido2.vdrl_rec == "+") this.validarTratamiento();
              else this.validarVdrl();
            },
            seleccion: this.global_CLAP001.datos_parto_2.reciennacido2.tsh_rec,
            teclaAlterna: true,
            id_input: "#validarTSH",
          },
          (data) => {
            _this.global_CLAP001.datos_parto_2.reciennacido2.tsh_rec = data.COD;
            _this.validarHbpatia();
          }
        );
      }, 300);
    },
    validarHbpatia() {
      let _this = this;

      if (this.global_CLAP001.datos_parto_2.reciennacido2.hbpatia_rec == "")
        this.global_CLAP001.datos_parto_2.reciennacido2.hbpatia_rec = "+";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Hbpatia ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosNegaHizo,
            callback_f: () => this.validarTSH(),
            seleccion: this.global_CLAP001.datos_parto_2.reciennacido2.hbpatia_rec,
            teclaAlterna: true,
            id_input: "#validarHbpatia",
          },
          (data) => {
            _this.global_CLAP001.datos_parto_2.reciennacido2.hbpatia_rec = data.COD;

            _this.validarBilirub();
          }
        );
      }, 300);
    },
    validarBilirub() {
      let _this = this;

      if (this.global_CLAP001.datos_parto_2.reciennacido2.bilirubina_rec == "")
        this.global_CLAP001.datos_parto_2.reciennacido2.bilirubina_rec = "+";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Bilirubina ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosNegaHizo,
            callback_f: () => this.validarHbpatia(),
            seleccion: this.global_CLAP001.datos_parto_2.reciennacido2.bilirubina_rec,
            teclaAlterna: true,
            id_input: "#validarBilirub",
          },
          (data) => {
            _this.global_CLAP001.datos_parto_2.reciennacido2.bilirubina_rec = data.COD;

            _this.validarToxoIgm();
          }
        );
      }, 300);
    },
    validarToxoIgm() {
      let _this = this;

      if (this.global_CLAP001.datos_parto_2.reciennacido2.toxo_igm_rec == "")
        this.global_CLAP001.datos_parto_2.reciennacido2.toxo_igm_rec = "+";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Toxo. igm ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPosNegaHizo,
            callback_f: () => this.validarBilirub(),
            seleccion: this.global_CLAP001.datos_parto_2.reciennacido2.toxo_igm_rec,
            teclaAlterna: true,
            id_input: "#validarToxoIgm",
          },
          (data) => {
            _this.global_CLAP001.datos_parto_2.reciennacido2.toxo_igm_rec = data.COD;

            _this.validarMeconio();
          }
        );
      }, 300);
    },
    validarMeconio() {
      validarInputs(
        {
          form: "#validarMeconio",
          orden: "1",
        },
        () => this.validarToxoIgm(),
        () => {
          this.global_CLAP001.datos_parto_2.reciennacido2.meconio_rec = this.validarSiNo(
            this.global_CLAP001.datos_parto_2.reciennacido2.meconio_rec
          );

          this.guardarClap(this.validarMeconio, () => this.validarTablaPuerpDia(0));
        }
      );
    },
    validarTablaPuerpDia(pos) {
      this.mostrarF3_puerperio = true;

      validarInputs(
        {
          form: "#validarTablaPuerpDia" + pos + "_CLAP001",
          orden: "1",
          event_f3: () => {
            let dia_f3 = parseInt(this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].dia_puer) || 0;
            if (dia_f3 < 1) this.inicializarTablaPuerperio(pos);
            this.mostrarF3_puerperio = false;
            this.validarAntirubeolaPost();
          },
          event_flecha_arriba: () => {
            let dia_fu = parseInt(this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].dia_puer) || 0;
            if (dia_fu < 1) this.inicializarTablaPuerperio(pos);

            if (pos == 0) this.validarTablaPuerpDia(pos);
            else this.validarTablaPuerpDia(pos - 1);
          },
          event_flecha_abajo: () => {
            let dia_fd = parseInt(this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].dia_puer) || 0;
            if (dia_fd < 1) this.inicializarTablaPuerperio(pos);

            if (pos == 2) this.validarTablaPuerpDia(pos);
            else this.validarTablaPuerpDia(pos + 1);
          },
        },
        () => {
          if (pos == 0) {
            this.mostrarF3_puerperio = false;
            this.validarMeconio();
          } else this.validarTablaPuerpDia(pos - 1);
        },
        () => {
          let dia = parseInt(this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].dia_puer) || 0;
          if (dia == 0) {
            this.inicializarTablaPuerperio(pos);
            if (pos == 2) {
              this.mostrarF3_puerperio = false;
              this.validarAntirubeolaPost();
            } else this.validarTablaPuerpDia(pos + 1);
          } else if (dia < 1 || dia > 31) {
            CON851("", "Día inválido", null, "error", "Error");
            this.validarTablaPuerpDia(pos);
          } else {
            this.mostrarF3_puerperio = false;
            this.validarTablaPuerpHR(pos);
          }
        }
      );
    },
    inicializarTablaPuerperio(pos) {
      var _this = this;

      this.$nextTick(function () {
        Vue.set(_this.global_CLAP001.datos_parto_2.reciennacido2.puerperio, pos, {
          dia_puer: "",
          hora_puer: "",
          temp_puer: "",
          pa_puer1: "",
          pa_puer2: "",
          pulso_puer: "",
          invol_uter_puer: "",
          loquios_puer: "",
        });

        _this.textos.tabla_puerperio[pos].invol = "";
        _this.textos.tabla_puerperio[pos].loquios = "";
      });
    },
    validarTablaPuerpHR(pos) {
      validarInputs(
        {
          form: "#validarTablaPuerpHR" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaPuerpDia(pos),
        () => {
          let hora = parseInt(this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].hora_puer) || 0;

          if (hora > 23) {
            CON851("", "Hora inválida", null, "error", "Error");
            this.validarTablaPuerpHR(pos);
          } else this.validarTablaPuerpTemp(pos);
        }
      );
    },
    validarTablaPuerpTemp(pos) {
      validarInputs(
        {
          form: "#validarTablaPuerpTemp" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaPuerpHR(pos),
        () => {
          this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].temp_puer = this.mask.dos.resolve(
            this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].temp_puer
          );

          this.validarTablaPuerpPa1_(pos);
        }
      );
    },
    validarTablaPuerpPa1_(pos) {
      validarInputs(
        {
          form: "#validarTablaPuerpPa1_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaPuerpTemp(pos),
        () => {
          let pa1 = parseInt(this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].pa_puer1) || 0;

          if (pa1 > 300) {
            CON851("", "Dato fuera de rango", null, "error", "Error");
            this.validarTablaPuerpPa1_(pos);
          } else if (pa1 == 0) {
            this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].pa_puer1 = "000";
            this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].pa_puer2 = "000";
            this.validarTablaPuerpPulso(pos);
          } else this.validarTablaPuerpPa2_(pos);
        }
      );
    },
    validarTablaPuerpPa2_(pos) {
      validarInputs(
        {
          form: "#validarTablaPuerpPa2_" + pos + "_CLAP001",
          orden: "1",
        },
        () => this.validarTablaPuerpPa1_(pos),
        () => {
          let pa2 = parseInt(this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].pa_puer2) || 0;

          if (pa2 > 300) {
            CON851("", "Dato fuera de rango", null, "error", "Error");
            this.validarTablaPuerpPa2_(pos);
          } else this.validarTablaPuerpPulso(pos);
        }
      );
    },
    validarTablaPuerpPulso(pos) {
      validarInputs(
        {
          form: "#validarTablaPuerpPulso" + pos + "_CLAP001",
          orden: "1",
        },
        () => {
          if (parseInt(this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].pa_puer1) == 0)
            this.validarTablaPuerpPa1_(pos);
          else this.validarTablaPuerpPa2_(pos);
        },
        () => {
          this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].pulso_puer = this.validarNumero(
            this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].pulso_puer,
            3
          );

          this.validarTablaPuerpInvol(pos);
        }
      );
    },
    validarTablaPuerpInvol(pos) {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Involución uterina ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayInvolUter,
            callback_f: () => this.validarTablaPuerpPulso(pos),
            seleccion: this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].invol_uter_puer,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].invol_uter_puer = data.COD;
            _this.textos.tabla_puerperio[pos].invol = data.DESCRIP;

            _this.validarTablaPuerpLoquios(pos);
          }
        );
      }, 300);
    },
    validarTablaPuerpLoquios(pos) {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Loquios ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayLoquios,
            callback_f: () => this.validarTablaPuerpInvol(pos),
            seleccion: this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].loquios_puer,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_CLAP001.datos_parto_2.reciennacido2.puerperio[pos].loquios_puer = data.COD;
            _this.textos.tabla_puerperio[pos].loquios = data.DESCRIP;

            if (pos == 2) _this.validarAntirubeolaPost();
            else _this.validarTablaPuerpDia(pos + 1);
          }
        );
      }, 300);
    },
    validarAntirubeolaPost() {
      let _this = this;

      if (this.global_CLAP001.datos_parto_2.reciennacido2.antirubeola_pospart == "")
        this.global_CLAP001.datos_parto_2.reciennacido2.antirubeola_pospart = "0";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Antirubeola post parto ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayGamaglobulina,
            callback_f: () => this.validarTablaPuerpDia(2),
            seleccion: this.global_CLAP001.datos_parto_2.reciennacido2.antirubeola_pospart,
            teclaAlterna: true,
            id_input: "#validarAntirubeolaPost",
          },
          (data) => {
            _this.global_CLAP001.datos_parto_2.reciennacido2.antirubeola_pospart = data.COD;

            _this.validarGamablobulinaPost();
          }
        );
      }, 300);
    },
    validarGamablobulinaPost() {
      let _this = this;

      if (this.global_CLAP001.datos_parto_2.reciennacido2.gamaglob_ant_d_rec == "")
        this.global_CLAP001.datos_parto_2.reciennacido2.gamaglob_ant_d_rec = "0";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Gamaglobulina anti d ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayGamaglobulina,
            callback_f: () => this.validarAntirubeolaPost(),
            seleccion: this.global_CLAP001.datos_parto_2.reciennacido2.gamaglob_ant_d_rec,
            teclaAlterna: true,
            id_input: "#validarGamablobulinaPost",
          },
          (data) => {
            _this.global_CLAP001.datos_parto_2.reciennacido2.gamaglob_ant_d_rec = data.COD;

            _this.guardarClap(_this.validarGamablobulinaPost, _this.validarVivoEgresoRn);
          }
        );
      }, 300);
    },
    validarVivoEgresoRn() {
      validarInputs(
        {
          form: "#validarVivoEgresoRn",
          orden: "1",
        },
        () => this.validarGamablobulinaPost(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_rn.vivo_eg_rn = this.validarSiNo(
            this.global_CLAP001.datos_parto_2.egreso_rn.vivo_eg_rn
          );

          switch (this.global_CLAP001.datos_parto_2.egreso_rn.vivo_eg_rn) {
            case "N":
              this.global_CLAP001.datos_parto_2.egreso_rn.fallece_eg_rn = "S";
              this.global_CLAP001.datos_parto_2.egreso_rn.traslado_eg_rn = "N";
              this.global_CLAP001.datos_parto_2.egreso_rn.fallec_trasl_eg_rn = "";
              this.global_CLAP001.datos_parto_2.egreso_rn.lugar_trasl_eg_rn = "";
              this.textos.lugar_traslado_rn = "";
              this.validarAnoEgresoRN();
              break;
            case "S":
              this.global_CLAP001.datos_parto_2.egreso_rn.fallece_eg_rn = "N";
              this.validarTrasladoEgresoRn();
              break;
          }
        }
      );
    },
    validarTrasladoEgresoRn() {
      validarInputs(
        {
          form: "#validarTrasladoEgresoRn",
          orden: "1",
        },
        () => this.validarVivoEgresoRn(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_rn.traslado_eg_rn = this.validarSiNo(
            this.global_CLAP001.datos_parto_2.egreso_rn.traslado_eg_rn
          );

          switch (this.global_CLAP001.datos_parto_2.egreso_rn.traslado_eg_rn) {
            case "N":
              this.global_CLAP001.datos_parto_2.egreso_rn.fallec_trasl_eg_rn = "";
              this.global_CLAP001.datos_parto_2.egreso_rn.lugar_trasl_eg_rn = "";
              this.textos.lugar_traslado_rn = "";
              this.validarAnoEgresoRN();
              break;
            case "S":
              this.validarMuereTrasladoEgresoRN();
              break;
          }
        }
      );
    },
    validarMuereTrasladoEgresoRN() {
      validarInputs(
        {
          form: "#validarMuereTrasladoEgresoRN",
          orden: "1",
        },
        () => this.validarTrasladoEgresoRn(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_rn.fallec_trasl_eg_rn = this.validarSiNo(
            this.global_CLAP001.datos_parto_2.egreso_rn.fallec_trasl_eg_rn
          );

          this.validarLugarTraslEgresoRN();
        }
      );
    },
    traerTodasLasIPS(param) {
      loader("show");
      let input = "";
      switch (param) {
        case 1:
          input = "#codLugarTrasladoRN_CLAP001";
          break;
        case 2:
          input = "#codLugarTrasladoMT_CLAP001";
          break;
      }
      $(input).prop("disabled", true);

      let _this = this;
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER813.DLL"))
        .then(function (data) {
          _this.arrayIps = data.IPS;
          _this.arrayIps.pop();
          _this.ventanaIps(param, input);
        })
        .catch(function (data) {
          loader("hide");
          $(input).removeAttr("disabled");
          $(input).focus();
        });
    },
    ventanaIps(param, input) {
      loader("hide");
      var _this = this;
      _ventanaDatos({
        titulo: "Ventana IPS",
        columnas: ["COD", "DESCRIP"],
        data: this.arrayIps,
        ancho: "90%",
        callback_esc: () => {
          $(input).removeAttr("disabled");
          $(input).focus();
        },
        callback: (data) => {
          switch (param) {
            case 1:
              _this.global_CLAP001.datos_parto_2.egreso_rn.lugar_trasl_eg_rn = data.COD;
              break;
            case 2:
              _this.global_CLAP001.datos_parto_2.egreso_materno.lugar_trasl_eg_mt = data.COD;
              break;
          }
          setTimeout(() => _enterInput(input), 100);
        },
      });
    },
    validarLugarTraslEgresoRN() {
      validarInputs(
        {
          form: "#validarLugarTraslEgresoRN",
          orden: "1",
        },
        () => this.validarMuereTrasladoEgresoRN(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_rn.lugar_trasl_eg_rn =
            this.global_CLAP001.datos_parto_2.egreso_rn.lugar_trasl_eg_rn.trim();
          this.consultarLugarIps(1);
        }
      );
    },
    consultarLugarIps(param) {
      loader("show");
      var _this = this;
      let ips = "";
      switch (param) {
        case 1:
          ips = this.global_CLAP001.datos_parto_2.egreso_rn.lugar_trasl_eg_rn;
          break;
        case 2:
          ips = this.global_CLAP001.datos_parto_2.egreso_materno.lugar_trasl_eg_mt;
          break;
      }

      var data = {
        datosh: datosEnvio(),
        IPS: ips,
      };

      postData(data, get_url("APP/SALUD/SER813.DLL"))
        .then(function (data) {
          loader("hide");

          switch (param) {
            case 1:
              _this.textos.lugar_traslado_rn = data.DESCRIP.replace(/\s\s+/g, " ");
              _this.validarAnoEgresoRN();
              break;
            case 2:
              _this.textos.lugar_traslado_mt = data.DESCRIP.replace(/\s\s+/g, " ");
              _this.validarAnoEgresoMT();
              break;
          }
        })
        .catch((err) => {
          console.error(err);
          loader("hide");

          switch (param) {
            case 1:
              _this.textos.lugar_traslado_rn = "NO ENCONTRADO";
              _this.validarLugarTraslEgresoRN();
              break;
            case 2:
              _this.textos.lugar_traslado_mt = "NO ENCONTRADO";
              _this.validarLugarTraslEgresoMaterna();
              break;
          }
        });
    },
    validarAnoEgresoRN() {
      validarInputs(
        {
          form: "#validarAnoEgresoRN",
          orden: "1",
        },
        () => {
          if (this.global_CLAP001.datos_parto_2.egreso_rn.vivo_eg_rn == "S") {
            if (this.global_CLAP001.datos_parto_2.egreso_rn.traslado_eg_rn == "S") this.validarLugarTraslEgresoRN();
            else this.validarTrasladoEgresoRn();
          } else this.validarVivoEgresoRn();
        },
        () => {
          let ano = parseInt(this.fechas.egreso_rn.ano) || 0;

          if (ano == 0 || ano < 1900) {
            CON851("", "Año inválido", null, "error", "Error");
            this.validarAnoEgresoRN();
          } else this.validarMesEgresoRN();
        }
      );
    },
    validarMesEgresoRN() {
      validarInputs(
        {
          form: "#validarMesEgresoRN",
          orden: "1",
        },
        () => this.validarAnoEgresoRN(),
        () => {
          let mes = parseInt(this.fechas.egreso_rn.mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("", "Mes inválido", null, "error", "Error");
            this.validarMesEgresoRN();
          } else this.validarDiaEgresoRN();
        }
      );
    },
    validarDiaEgresoRN() {
      validarInputs(
        {
          form: "#validarDiaEgresoRN",
          orden: "1",
        },
        () => this.validarMesEgresoRN(),
        () => {
          let dia_num = parseInt(this.fechas.egreso_rn.dia) || 0;

          let fecha_act = parseInt(moment().format("YYYYMMDD")) || 0;

          let ano = this.fechas.egreso_rn.ano;
          let mes = this.fechas.egreso_rn.mes;
          let dia = this.fechas.egreso_rn.dia;

          let fecha_dig =
            parseInt(
              this.fechas.egreso_rn.ano +
                this.fechas.egreso_rn.mes.padStart(2, "0") +
                this.fechas.egreso_rn.dia.padStart(2, "0")
            ) || 0;

          if (dia_num < 1 || dia_num > 31) {
            CON851("", "Día inválido", null, "error", "Error");
            this.validarDiaEgresoRN();
          } else if (!_validarFecha(ano, mes, dia)) {
            CON851("37", "Fecha fuera de rango", null, "error", "Error");
            this.validarDiaEgresoRN();
          } else if (fecha_dig > fecha_act) {
            CON851("37", "Fecha mayor a actual!", null, "error", "Error");
            this.validarDiaEgresoRN();
          } else {
            this.global_CLAP001.datos_parto_2.egreso_rn.fecha_eg_rn =
              this.fechas.egreso_rn.ano +
              this.fechas.egreso_rn.mes.padStart(2, "0") +
              this.fechas.egreso_rn.dia.padStart(2, "0");

            this.validarHoraEgresoRN();
          }
        }
      );
    },
    validarHoraEgresoRN() {
      validarInputs(
        {
          form: "#validarHoraEgresoRN",
          orden: "1",
        },
        () => this.validarDiaEgresoRN(),
        () => {
          let hora = parseInt(this.global_CLAP001.datos_parto_2.egreso_rn.hora_eg_rn) || 0;

          if (hora > 23 || hora < 1) {
            CON851("37", "Hora fuera de rango", null, "error", "Error");
            this.validarHoraEgresoRN();
          } else this.validarMinEgresoRN();
        }
      );
    },
    validarMinEgresoRN() {
      validarInputs(
        {
          form: "#validarMinEgresoRN",
          orden: "1",
        },
        () => this.validarHoraEgresoRN(),
        () => {
          let min = parseInt(this.global_CLAP001.datos_parto_2.egreso_rn.min_eg_rn) || 0;

          if (min > 59 || min < 1) {
            CON851("37", "Minuto fuera de rango", null, "error", "Error");
            this.validarMinEgresoRN();
          } else this.validarEdadEgreso();
        }
      );
    },
    validarEdadEgreso() {
      validarInputs(
        {
          form: "#validarEdadEgreso",
          orden: "1",
        },
        () => this.validarMinEgresoRN(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_rn.edad_eg_rn = this.validarNumero(
            this.global_CLAP001.datos_parto_2.egreso_rn.edad_eg_rn,
            3
          );

          this.validarAlimentoAlta();
        }
      );
    },
    validarAlimentoAlta() {
      let _this = this;

      if (this.global_CLAP001.datos_parto_2.egreso_rn.aliment_eg_rn == "")
        this.global_CLAP001.datos_parto_2.egreso_rn.aliment_eg_rn = "3";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Alimento al alta ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayAlimentoAlta,
            callback_f: () => this.validarEdadEgreso(),
            seleccion: this.global_CLAP001.datos_parto_2.egreso_rn.aliment_eg_rn,
            teclaAlterna: true,
            id_input: "#validarAlimentoAlta",
          },
          (data) => {
            _this.global_CLAP001.datos_parto_2.egreso_rn.aliment_eg_rn = data.COD;
            _this.validarBocaArriba();
          }
        );
      }, 300);
    },
    validarBocaArriba() {
      validarInputs(
        {
          form: "#validarBocaArriba",
          orden: "1",
        },
        () => this.validarAlimentoAlta(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_rn.boca_arriba_eg_rn = this.validarSiNo(
            this.global_CLAP001.datos_parto_2.egreso_rn.boca_arriba_eg_rn
          );

          this.validarBCG();
        }
      );
    },
    validarBCG() {
      validarInputs(
        {
          form: "#validarBCG",
          orden: "1",
        },
        () => this.validarBocaArriba(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_rn.bcg_eg_rn = this.validarSiNo(
            this.global_CLAP001.datos_parto_2.egreso_rn.bcg_eg_rn
          );

          this.validar1erNombre();
        }
      );
    },
    validar1erNombre() {
      validarInputs(
        {
          form: "#validar1erNombre",
          orden: "1",
        },
        () => this.validarBCG(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_rn.nombre_rn.nombre1_rn_cm =
            this.global_CLAP001.datos_parto_2.egreso_rn.nombre_rn.nombre1_rn_cm.trim().toUpperCase();

          this.validar2doNombre();
        }
      );
    },
    validar2doNombre() {
      validarInputs(
        {
          form: "#validar2doNombre",
          orden: "1",
        },
        () => this.validar1erNombre(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_rn.nombre_rn.nombre2_rn_cm =
            this.global_CLAP001.datos_parto_2.egreso_rn.nombre_rn.nombre2_rn_cm.trim().toUpperCase();

          this.validar1erApellido();
        }
      );
    },
    validar1erApellido() {
      validarInputs(
        {
          form: "#validar1erApellido",
          orden: "1",
        },
        () => this.validar2doNombre(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_rn.nombre_rn.apellido1_rn_cm =
            this.global_CLAP001.datos_parto_2.egreso_rn.nombre_rn.apellido1_rn_cm.trim().toUpperCase();

          this.validar2doApellido();
        }
      );
    },
    validar2doApellido() {
      validarInputs(
        {
          form: "#validar2doApellido",
          orden: "1",
        },
        () => this.validar1erApellido(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_rn.nombre_rn.apellido2_rn_cm =
            this.global_CLAP001.datos_parto_2.egreso_rn.nombre_rn.apellido2_rn_cm.trim().toUpperCase();

          this.validarPesoEgreso();
        }
      );
    },
    validarPesoEgreso() {
      validarInputs(
        {
          form: "#validarPesoEgreso",
          orden: "1",
        },
        () => this.validar2doApellido(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_rn.peso_eg_rn = this.validarNumero(
            this.global_CLAP001.datos_parto_2.egreso_rn.peso_eg_rn,
            4
          );

          this.validarIDRN();
        }
      );
    },
    validarIDRN() {
      validarInputs(
        {
          form: "#validarIDRN",
          orden: "1",
        },
        () => this.validarPesoEgreso(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_rn.id_eg_rn = this.validarNumero(
            this.global_CLAP001.datos_parto_2.egreso_rn.id_eg_rn,
            15
          );

          this.validarResponsableRN();
        }
      );
    },
    validarResponsableRN() {
      validarInputs(
        {
          form: "#validarResponsableRN",
          orden: "1",
        },
        () => this.validarIDRN(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_rn.reponsable_rg_rn =
            this.global_CLAP001.datos_parto_2.egreso_rn.reponsable_rg_rn.trim();
          this.consultarCodigoMed(3);
        }
      );
    },
    validarVivoEgresoMaterna() {
      validarInputs(
        {
          form: "#validarVivoEgresoMaterna",
          orden: "1",
        },
        () => {
          if (this.global_CLAP001.datos_parto.aborto == "S") this.validarAtendioParto();
          else this.validarResponsableRN();
        },
        () => {
          this.global_CLAP001.datos_parto_2.egreso_materno.viva_eg_mt = this.validarSiNo(
            this.global_CLAP001.datos_parto_2.egreso_materno.viva_eg_mt
          );

          switch (this.global_CLAP001.datos_parto_2.egreso_materno.viva_eg_mt) {
            case "N":
              this.global_CLAP001.datos_parto_2.egreso_materno.fallece_eg_mt = "S";
              this.global_CLAP001.datos_parto_2.egreso_materno.traslado_eg_mt = "N";
              this.global_CLAP001.datos_parto_2.egreso_materno.fallec_trasl_eg_mt = "";
              this.global_CLAP001.datos_parto_2.egreso_materno.lugar_trasl_eg_mt = "";
              this.textos.lugar_traslado_rn = "";
              this.validarAnoEgresoMT();
              break;
            case "S":
              this.global_CLAP001.datos_parto_2.egreso_materno.fallece_eg_mt = "N";
              this.validarTrasladoEgresoMaterna();
              break;
          }
        }
      );
    },
    validarTrasladoEgresoMaterna() {
      validarInputs(
        {
          form: "#validarTrasladoEgresoMaterna",
          orden: "1",
        },
        () => this.validarVivoEgresoMaterna(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_materno.traslado_eg_mt = this.validarSiNo(
            this.global_CLAP001.datos_parto_2.egreso_materno.traslado_eg_mt
          );

          switch (this.global_CLAP001.datos_parto_2.egreso_materno.traslado_eg_mt) {
            case "N":
              this.global_CLAP001.datos_parto_2.egreso_materno.fallec_trasl_eg_mt = "";
              this.global_CLAP001.datos_parto_2.egreso_materno.lugar_trasl_eg_mt = "";
              this.textos.lugar_traslado_mt = "";
              this.validarAnoEgresoMT();
              break;
            case "S":
              this.validarMuereTrasladoEgresoMaterna();
              break;
          }
        }
      );
    },
    validarMuereTrasladoEgresoMaterna() {
      validarInputs(
        {
          form: "#validarMuereTrasladoEgresoMaterna",
          orden: "1",
        },
        () => this.validarTrasladoEgresoMaterna(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_materno.fallec_trasl_eg_mt = this.validarSiNo(
            this.global_CLAP001.datos_parto_2.egreso_materno.fallec_trasl_eg_mt
          );

          this.validarLugarTraslEgresoMaterna();
        }
      );
    },
    validarLugarTraslEgresoMaterna() {
      validarInputs(
        {
          form: "#validarLugarTraslEgresoMaterna",
          orden: "1",
        },
        () => this.validarMuereTrasladoEgresoMaterna(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_materno.lugar_trasl_eg_mt =
            this.global_CLAP001.datos_parto_2.egreso_materno.lugar_trasl_eg_mt.trim();
          this.consultarLugarIps(2);
        }
      );
    },
    validarAnoEgresoMT() {
      validarInputs(
        {
          form: "#validarAnoEgresoMT",
          orden: "1",
        },
        () => {
          if (this.global_CLAP001.datos_parto_2.egreso_materno.viva_eg_mt == "S") {
            if (this.global_CLAP001.datos_parto_2.egreso_materno.traslado_eg_mt == "S")
              this.validarLugarTraslEgresoMaterna();
            else this.validarTrasladoEgresoMaterna();
          } else this.validarVivoEgresoMaterna();
        },
        () => {
          let ano = parseInt(this.fechas.egreso_mt.ano) || 0;

          if (ano == 0 || ano < 1900) {
            CON851("", "Año inválido", null, "error", "Error");
            this.validarAnoEgresoMT();
          } else this.validarMesEgresoMT();
        }
      );
    },
    validarMesEgresoMT() {
      validarInputs(
        {
          form: "#validarMesEgresoMT",
          orden: "1",
        },
        () => this.validarAnoEgresoMT(),
        () => {
          let mes = parseInt(this.fechas.egreso_mt.mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("", "Mes inválido", null, "error", "Error");
            this.validarMesEgresoMT();
          } else this.validarDiaEgresoMT();
        }
      );
    },
    validarDiaEgresoMT() {
      validarInputs(
        {
          form: "#validarDiaEgresoMT",
          orden: "1",
        },
        () => this.validarMesEgresoMT(),
        () => {
          let dia_num = parseInt(this.fechas.egreso_mt.dia) || 0;

          let fecha_act = parseInt(moment().format("YYYYMMDD")) || 0;

          let ano = this.fechas.egreso_mt.ano;
          let mes = this.fechas.egreso_mt.mes;
          let dia = this.fechas.egreso_mt.dia;

          let fecha_dig =
            parseInt(
              this.fechas.egreso_mt.ano +
                this.fechas.egreso_mt.mes.padStart(2, "0") +
                this.fechas.egreso_mt.dia.padStart(2, "0")
            ) || 0;

          if (dia_num < 1 || dia_num > 31) {
            CON851("", "Día inválido", null, "error", "Error");
            this.validarDiaEgresoMT();
          } else if (!_validarFecha(ano, mes, dia)) {
            CON851("37", "Fecha fuera de rango", null, "error", "Error");
            this.validarDiaEgresoMT();
          } else if (fecha_dig > fecha_act) {
            CON851("37", "Fecha mayor a actual!", null, "error", "Error");
            this.validarDiaEgresoMT();
          } else {
            this.global_CLAP001.datos_parto_2.egreso_materno.fecha_eg_mt =
              this.fechas.egreso_mt.ano +
              this.fechas.egreso_mt.mes.padStart(2, "0") +
              this.fechas.egreso_mt.dia.padStart(2, "0");

            this.validarDiasParto();
          }
        }
      );
    },
    validarDiasParto() {
      validarInputs(
        {
          form: "#validarDiasParto",
          orden: "1",
        },
        () => this.validarDiaEgresoMT(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_materno.dias_desde_parto = this.validarNumero(
            this.global_CLAP001.datos_parto_2.egreso_materno.dias_desde_parto,
            3
          );

          this.validarResponsableMT();
        }
      );
    },
    validarResponsableMT() {
      validarInputs(
        {
          form: "#validarResponsableMT",
          orden: "1",
        },
        () => this.validarDiasParto(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_materno.responsable_eg_mt =
            this.global_CLAP001.datos_parto_2.egreso_materno.responsable_eg_mt.trim();
          this.consultarCodigoMed(4);
        }
      );
    },
    validarConsejeria() {
      validarInputs(
        {
          form: "#validarConsejeria",
          orden: "1",
        },
        () => this.validarResponsableMT(),
        () => {
          this.global_CLAP001.datos_parto_2.egreso_materno.anticoncepcion.consejeria = this.validarSiNo(
            this.global_CLAP001.datos_parto_2.egreso_materno.anticoncepcion.consejeria
          );

          this.validarMetodoElegido();
        }
      );
    },
    validarMetodoElegido() {
      let _this = this;

      if (this.global_CLAP001.datos_parto_2.egreso_materno.anticoncepcion.metodo_ant == "")
        this.global_CLAP001.datos_parto_2.egreso_materno.anticoncepcion.metodo_ant = "3";

      setTimeout(() => {
        POPUP(
          {
            titulo: "Anticonceptivos ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayMetodoEscogido,
            callback_f: () => this.validarConsejeria(),
            seleccion: this.global_CLAP001.datos_parto_2.egreso_materno.anticoncepcion.metodo_ant,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_CLAP001.datos_parto_2.egreso_materno.anticoncepcion.metodo_ant = data.COD;
            _this.validarObservaciones();
          }
        );
      }, 300);
    },
    validarObservaciones() {
      validarInputs(
        {
          form: "#validarObservaciones",
          orden: "1",
        },
        () => this.validarMetodoElegido(),
        () => {
          this.global_CLAP001.observaciones = this.global_CLAP001.observaciones.replaceEsp();
          this.finalizarClap(3);
        }
      );
    },
    guardarClap(callbackErr, callback) {
      loader("show");
      grabarRegClap(_getObjetoSaveHc(this.global_CLAP001, filtroArray.clap))
        .then((data) => {
          loader("hide");
          CON851("", "Guardado correcto", null, "success", "Correcto");
          console.log(data);
          callback();
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          CON851("", "Error guardando datos, intente nuevamente", null, "error", "Error");
          callbackErr();
        });
    },
    finalizarClap(param) {
      let _this = this;
      if (!this.primeraVez) {
        this.global_CLAP001.oper_corr = localStorage.Usuario;
        this.global_CLAP001.fech_corr = moment().format("YYYYMMDD");
      }

      this.guardarClap(
        () => {
          switch (param) {
            case 1:
              _this.validarAborto();
              break;
            case 2:
              _this.validarParto_2();
              break;
            case 3:
              _this.validarObservaciones();
              break;
          }
        },
        () => {
          this.impresion();
        }
      );
    },
    impresion() {
      const { imprimir_CLAPI001 } = require("../../frameworks/pdf/hiclin/Clapi001.formato.js");

      imprimir_CLAPI001({
        HistoriaEscogida: this.global_CLAP001.llave,
        hcprc: this.historia_clinica,
        paci: this.datosPaciente,
        profesional: this.datosProfesional
      });
    },
    calcularFechaFpp(fecha) {
      var fm = moment(fecha).add(9, "M");
      var fm2 = moment(fm).add(6, "d");
      var fmEnd = moment(fm2).endOf("month");
      return fecha.date() != fm2.date() && fm2.isSame(fmEnd.format("YYYYMMDD")) ? fm2.add(1, "d") : fm2;
    },
    validarSiNo(param) {
      return param.toUpperCase().trim() != "S" ? "N" : "S";
    },
    validarNumero(param, cant = 2) {
      return isNaN(parseInt(param)) ? "0".padStart(cant, "0") : parseInt(param).toString();
    },
    salir_CLAP001() {
      _regresar_menuhis();
    },
  },
});
