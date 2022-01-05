var Chart = require("chart.js");

const { detallesHc, grabarDetalles, grabarDetallesText } = require("../../HICLIN/scripts/reg_dethc.js");

new Vue({
  el: "#AIEPI001",
  data: {
    datos_paciente: {},
    datos_profesional: {},
    profesionales_AIEPO001: [],
    unidades_Serv_AIEPO001: [],
    enfermedades: [],
    enfer_trans: [],
    patologias_cronicas: [],
    nro_ult_comp: "",
    params_hc890h: {
      estado: false,
      pregunta: 0,
      ciudades: [],
      paises: [],
      _siguiente: false,
      _atras: false,
    },
    modal_victimaConf: false,
    params_aiepi845a: {
      estado: false,
    },
    params_hc9010: {
      estado: false,
    },
    params_hc890g: {
      estado: false,
    },
    mostrar_hc890g: false,
    mostrarHC9010: false,
    params_hc9011: {
      estado: false,
    },
    mostrarHC9011: false,
    params_hc890d: {
      estado: false,
      unserv: null,
      finalidad: null,
      sexo: null,
    },
    params_hc9007: {
      estado: false,
    },
    mostrarBotonPdf: false,
    mostrarCovid: false,
    mostrar_hc890l: false,
    params_hc890l: {
      estado: false,
    },
    mostrarPYP2: false,
    paramsPYP2: {
      estado: false,
    },
    paramshc890b: {
      estado: false,
    },
    mostrarBarthel: false,
    mostrarAutismo: false,
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
    global_AIEPI001: {
      edad: "",
      motivo: "",
      paciente: "", //
      folio_suc: "", //
      folio_nro: "", // VARIABLES QUE NO LLEGAN DEL DLL
      proceden: "",
      fecha: "",
      hora: "",
      parent_acompa: "",
      victi_conflicto_paci: "",
      covid19: _tipoJsonHc("covid19"),
      examen_visual: {
        agudeza_visual_oi_1: "",
        agudeza_visual_oi_2: "",
        agudeza_visual_od_1: "",
        agudeza_visual_od_2: "",
        estructuras_oculares_oi: "",
        estructuras_oculares_od: "",
        distancia_agud: "",
      },
      cierre: {
        estado: "",
        diag_muer: "",
      },
      salud_oral_ult_6mes: "",
      esq_vacuna_completo: "",
      signos: {
        und_peso: "",
        peso: "",
        talla: "",
        imc: "",
        sup: "",
        temp: "",
        fcard: "",
        fresp: "",
        tens1: "",
        tens2: "",
        tens_m: "",
        per_cef: "",
        per_tora: "",
        imc_estad: "",
        per_abdo: "",
        per_mune: "",
        per_braq: "",
        tsh_nacer: "",
        edad_gestacional: "",
        peso_nacer: "",
        talla_nacer: "",
        oximetria: "",
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
      rips: {
        tabla_diag: [
          { nro: "01", diagn: "" },
          { nro: "02", diagn: "" },
          { nro: "03", diagn: "" },
          { nro: "04", diagn: "" },
          { nro: "05", diagn: "" },
          { nro: "06", diagn: "" },
          { nro: "07", diagn: "" },
          { nro: "08", diagn: "" },
          { nro: "09", diagn: "" },
          { nro: "10", diagn: "" },
        ],
        primera_vez: "",
        causa: "",
        estado_sal: "",
        remitido: "",
        cronico: "",
        tipo_diag: "",
        finalidad: "",
        ano_primera_vez: "",
        mes_primera_vez: "",
        dia_primera_vez: "",
        observ: "",
        triage: "",
        discapacidades: {
          fisica: "",
          mental: "",
          cognitiva: "",
          auditiva: "",
          visual: "",
        },
      },
    },
    DETALLE_HISTORIA: {
      antec_perinatal: detallesHc.WS_2002_3(),
      antec_perinatal_text: "",
      // anteriores dos son 2002, depende de unidad de servicio
      Enfermedad_Actual: "", // WS-1001
      Examen_fisico: "", // WS-4005
      Tratar: "", // WS 9503
      aiepi9501: detallesHc.WS_9501(), // WS-9501
      autismo: detallesHc.WS_9007(), // WS-9007
    },
    datos_ext: {
      ANO: "",
      MES: "",
      DIA: "",
      HORA: "",
      MINUTO: "",
      NOM_MEDICO: "",
      FOLIO: "",
      UNID_SERV: "",
      anos_naci: "",
      meses_naci: "",
      grupo_sang: "",
      RH: "",
      peso_KG: "",
      evaluarSaludBucal: "",
    },
    SISVAN: {
      TABLA: [],
      talla_ant: 0,
      talla_ant_grafica: null,
    },
    TABLAS_OMS: [],
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
    unidad_medida: [
      { COD: "1", DESCRIP: "KILOGRAMOS" },
      { COD: "2", DESCRIP: "GRAMOS" },
    ],
    estado_general: [
      { COD: "1", DESCRIP: "ALERTA, INTRANQUILO O IRRITABLE" },
      { COD: "2", DESCRIP: "LETARGICO O INCONSCIENTE" },
      { COD: "3", DESCRIP: "TRANQUILO" },
    ],
    pliegue_cutiano: [
      { COD: "1", DESCRIP: "NORMAL" },
      { COD: "2", DESCRIP: "LENTO" },
      { COD: "3", DESCRIP: "MUY LENTO" },
    ],
    ofrece_agua: [
      { COD: "1", DESCRIP: "NO PUEDE BEBER O BEBE CON DIFICULTAD" },
      { COD: "2", DESCRIP: "BEBE AVIDAMENTE CON SED" },
      { COD: "3", DESCRIP: "LA RECHAZA" },
      { COD: "4", DESCRIP: "BEBE NORMALMENTE" },
    ],
    estimulo_social: [
      { COD: "1", DESCRIP: "NINGUNA RESPUESTA AL ESTIMULO SOCIAL" },
      { COD: "2", DESCRIP: "NO SONRIE, DISMINUCION ACTIVIDAD, SE DESPIERTA AL ESTIMULO" },
      { COD: "3", DESCRIP: "RESPUESTA ADECUADA AL ESTIMULO SOCIAL" },
    ],
    tendencia_peso: [
      { COD: "1", DESCRIP: "ASCENDENTE" },
      { COD: "2", DESCRIP: "HORIZONTAL" },
      { COD: "3", DESCRIP: "DESCENDENTE" },
    ],
    palidez: [
      { COD: "1", DESCRIP: "LEVE" },
      { COD: "2", DESCRIP: "INTENSA" },
      { COD: "3", DESCRIP: "NO TIENE" },
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
    estadoSalidaRips: [
      { COD: "1", DESCRIP: "VIVO (A)" },
      { COD: "2", DESCRIP: "MUERTO (A)" },
      { COD: "3", DESCRIP: "REMITIDO (A)" },
      { COD: "4", DESCRIP: "HOSPITALIZADO (A)" },
      { COD: "5", DESCRIP: "OBSERVACIÓN" },
      { COD: "6", DESCRIP: "NO APLICA" },
    ],
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
      sup: "",
    },
    flujo_bloques: {
      inicio: false,
      antec_perinatales: false,
    },
    textos: {
      resultado_examen: "",
      embarazo_deseado: "",
      serologia_madre: "",
      lactancia_materna: "",
      unidad_medida: "",
      respiracion_rapida: "",
      estado_general: "",
      pliegue_cutiano: "",
      ofrece_agua: "",
      resp_estimulo_social: "",
      tendencia_peso: "",
      palidez_palmar: "",
      palidez_conjuntiva: "",
      descrip_diagnosticos: ["", "", "", "", "", "", "", "", "", ""],
      personal_atiende: "",
      causa_externa: "",
      tipo_diagnostico: "",
      descrip_pato_cronica: "",
      estado_salida: "",
      diagnostico_muerte: "",
    },
    graficas: {
      peso_edad: {
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
      peso_talla: {
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
      per_cef: {
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
    aiepi845a: component_AIEPI845A,
    autismo: component_hc9007,
    incapacidad: require("../../HICLIN/scripts/hc890l.vue.js"),
    vales: require("../../HICLIN/scripts/HC-9010.vue.js"),
    apgar: require("../../HICLIN/scripts/HC-9011.vue.js"),
    agudeza_visual: require("../../HICLIN/scripts/HC890G.vue.js"),
    pyp2: require("../../HICLIN/scripts/PYP2.vue.js"),
    hc890b: require("../../HICLIN/scripts/HC890B.vue.js"),
    ser851: require("../../SALUD/scripts/SER851.vue.js"),
  },
  created() {
    nombreOpcion("3 - AIEPI 2 meses a 5 años");

    _inputControl("disabled");
    _inputControl("reset");
    this.datos_paciente = JSON.parse(JSON.stringify($_REG_PACI));
    this.datos_profesional = JSON.parse(JSON.stringify($_REG_PROF));

    this.traerUnidadesServicio();
  },
  computed: {
    sintomatico_w: function () {
      return {
        sintom_resp: this.global_AIEPI001.signos.sintom_resp,
        sintom_piel: this.global_AIEPI001.signos.sintom_piel,
        contacto_lepra: this.global_AIEPI001.signos.contacto_lepra,
        victi_maltrato: this.global_AIEPI001.signos.victi_maltrato,
        victi_violencia: this.global_AIEPI001.signos.victi_violencia,
        enfer_mental: this.global_AIEPI001.signos.enfer_mental,
        enfer_its: this.global_AIEPI001.signos.enfer_its,
        cual_its: this.global_AIEPI001.signos.cual_its,
        trata_its: this.global_AIEPI001.signos.trata_its,
        cancer_seno: this.global_AIEPI001.signos.cancer_seno,
        cancer_cervis: this.global_AIEPI001.signos.cancer_cervis,
        edu_autoexa_seno: this.global_AIEPI001.signos.edu_autoexa_seno,
        citologia_previa: this.global_AIEPI001.signos.citologia_previa,
        fecha_cito_previa: this.global_AIEPI001.signos.fecha_cito_previa,
        resul_cito_previa: this.global_AIEPI001.signos.resul_cito_previa,
        fecha_ult_mamo: this.global_AIEPI001.signos.fecha_ult_mamo,
      };
    },
  },
  watch: {
    sintomatico_w: function (data) {
      this.sintomaticos = data;
    },
    "global_AIEPI001.signos.tsh_nacer": function (data) {
      var consulta = this.resultado_examen.find((x) => x.COD == data);
      if (consulta) this.textos.resultado_examen = consulta.COD + ". " + consulta.DESCRIP;
    },
    "global_AIEPI001.signos.und_peso": function (data) {
      var consulta = this.unidad_medida.find((x) => x.COD == data);
      if (consulta) this.textos.unidad_medida = consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.aiepi9501.signo_tos.tosrap": function (data) {
      if (data == "S") this.textos.respiracion_rapida = "SI";
      else this.textos.respiracion_rapida = "NO";
    },
    "DETALLE_HISTORIA.aiepi9501.signo_diare.dialet": function (data) {
      var consulta = this.estado_general.find((x) => x.COD == data);
      if (consulta) this.textos.estado_general = consulta.COD + ". " + consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.aiepi9501.signo_diare.pliegu": function (data) {
      var consulta = this.pliegue_cutiano.find((x) => x.COD == data);
      if (consulta) this.textos.pliegue_cutiano = consulta.COD + ". " + consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.aiepi9501.signo_diare.bebsed": function (data) {
      var consulta = this.ofrece_agua.find((x) => x.COD == data);
      if (consulta) this.textos.ofrece_agua = consulta.COD + ". " + consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiesocial": function (data) {
      var consulta = this.estimulo_social.find((x) => x.COD == data);
      if (consulta) this.textos.resp_estimulo_social = consulta.COD + ". " + consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.aiepi9501.signo_desnut.destend": function (data) {
      var consulta = this.tendencia_peso.find((x) => x.COD == data);
      if (consulta) this.textos.tendencia_peso = consulta.COD + ". " + consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.aiepi9501.signo_desnut.despal": function (data) {
      var consulta = this.palidez.find((x) => x.COD == data);
      if (consulta) this.textos.palidez_palmar = consulta.COD + ". " + consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.aiepi9501.signo_desnut.despalcon": function (data) {
      var consulta = this.palidez.find((x) => x.COD == data);
      if (consulta) this.textos.palidez_conjuntiva = consulta.COD + ". " + consulta.DESCRIP;
    },
    "global_AIEPI001.rips.causa": function (data) {
      var consulta = this.causas_externas.find((x) => x.COD == data);
      if (consulta) this.textos.causa_externa = data + ". " + consulta.DESCRIP;
    },
    "global_AIEPI001.rips.tipo_diag": function (data) {
      var consulta = this.tipos_diagnostico.find((x) => parseInt(x.COD) == parseInt(data));
      if (consulta) this.textos.tipo_diagnostico = data + ". " + consulta.DESCRIP;
    },
    "global_AIEPI001.rips.estado_sal": function (data) {
      var consulta = this.estadoSalidaRips.find((x) => x.COD == data);
      if (consulta) this.textos.estado_salida = data + ". " + consulta.DESCRIP;
    },
  },
  methods: {
    calcularIMCySUP() {
      var peso_kg = parseInt(this.datos_ext.peso_KG) || 0;
      var talla = parseInt(this.global_AIEPI001.signos.talla) || 0;

      if (peso_kg == 0 || talla == 0) {
        this.global_AIEPI001.signos.imc = "0";
        this.global_AIEPI001.signos.imc = "0";
        this.operaciones.sup = "0 m2";
      } else {
        //indice masa corporal
        var tallaDiv = talla / 100;
        var exponencial = Math.pow(tallaDiv, 2);
        var resultado = peso_kg / exponencial;

        this.global_AIEPI001.signos.imc = resultado.toFixed(2).toString();

        //sup
        var sup = (peso_kg + talla - 60) / 100;
        this.global_AIEPI001.signos.sup = sup.toFixed(2).toString();
        this.operaciones.sup = this.global_AIEPI001.signos.sup + " m2";
      }
    },
    calcularTA_media() {
      var sistole = parseInt(this.global_AIEPI001.signos.tens1);
      var diastole = parseInt(this.global_AIEPI001.signos.tens2);
      var calculo = Math.round((sistole + diastole * 2) / 3);

      this.global_AIEPI001.signos.tens_m = parseInt(calculo).toString();
    },
    traerUnidadesServicio() {
      loader("show");
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then(function (data) {
          _this.unidades_Serv_AIEPO001 = data.UNSERV;
          _this.unidades_Serv_AIEPO001.pop();

          _this.traerProfesionales();
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          _this.salir_AIEPI001();
        });
    },
    traerProfesionales() {
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
        .then(function (data) {
          _this.profesionales_AIEPO001 = data.ARCHPROF;
          _this.profesionales_AIEPO001.pop();
          for (var i in _this.profesionales_AIEPO001) {
            _this.profesionales_AIEPO001[i].NOMBRE = _this.profesionales_AIEPO001[i].NOMBRE.replace(/\�/g, "Ñ").trim();
          }
          _this.traerHistoriaClinica(1);
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          _this.salir_AIEPI001();
        });
    },
    traerHistoriaClinica(param) {
      var _this = this;

      postData(
        { datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|" + "1" + "|" },
        get_url("APP/HICLIN/HC_PRC.DLL")
      )
        .then((data) => {
          console.log(data);
          _this.global_AIEPI001 = data.HCPAC;

          _this.global_AIEPI001.paciente = $_REG_HC.id_paciente;
          _this.global_AIEPI001.folio_suc = $_REG_HC.llave_hc.substr(15, 2);
          _this.global_AIEPI001.folio_nro = $_REG_HC.llave_hc.substr(17, 6);
          //// SE ESTAN CREANDO

          switch (_this.global_AIEPI001.signos.und_peso) {
            case "1":
              _this.datos_ext.peso_KG = parseFloat(_this.global_AIEPI001.signos.peso);
              break;
            case "2":
              _this.datos_ext.peso_KG = parseFloat(_this.global_AIEPI001.signos.peso) / 1000;
              break;
          }
          _this.calcularIMCySUP();

          if (parseInt(_this.global_AIEPI001.edad) == 0)
            _this.global_AIEPI001.edad = $_REG_HC.edad_hc.unid_edad + $_REG_HC.edad_hc.vlr_edad.toString();

          for (var i in _this.global_AIEPI001.rips.tabla_diag) {
            _this.global_AIEPI001.rips.tabla_diag[i].diagn = _this.global_AIEPI001.rips.tabla_diag[i].diagn
              .toUpperCase()
              .trim();
          }

          _this.global_AIEPI001.signos.talla = parseInt(_this.global_AIEPI001.signos.talla) || "";
          _this.global_AIEPI001.signos.fcard = parseInt(_this.global_AIEPI001.signos.fcard) || "";
          _this.global_AIEPI001.signos.fresp = parseInt(_this.global_AIEPI001.signos.fresp) || "";
          _this.global_AIEPI001.signos.tens1 = parseInt(_this.global_AIEPI001.signos.tens1) || "";
          _this.global_AIEPI001.signos.tens2 = parseInt(_this.global_AIEPI001.signos.tens2) || "";
          _this.global_AIEPI001.signos.tens_m = parseInt(_this.global_AIEPI001.signos.tens_m) || "";
          _this.global_AIEPI001.signos.oximetria = parseInt(_this.global_AIEPI001.signos.oximetria) || "";

          _this.global_AIEPI001.motivo = _this.global_AIEPI001.motivo.replace(/\&/g, "\n").trim();

          switch (_this.global_AIEPI001.serv) {
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

          if (_this.global_AIEPI001.serv == "02" || _this.global_AIEPI001.serv == "08") _this.mostrar_hc890l = true;
          else _this.mostrar_hc890l = false;

          var unidad_edad = _this.global_AIEPI001.edad.substring(0, 1);
          var edad = parseInt(_this.global_AIEPI001.edad.substring(1, 4));

          console.log(_this.global_AIEPI001.examen_visual);
          if (
            (_this.global_AIEPI001.serv == "08" || _this.global_AIEPI001.serv == "02") &&
            _this.datos_profesional.ATIENDE_PROF == "2" &&
            unidad_edad == "A" &&
            edad > 2
          )
            _this.mostrar_hc890g = true;
          else _this.mostrar_hc890g = false;

          if (param == 1) {
            _this.traerCiudades();
            _this.traerDetalleHistoria();
          } else if (param == 2) {
            _this.validarProcedencia();
          }
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_AIEPI001();
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
          _this.salir_AIEPI001();
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

          this.traerPatologiasCronicas();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_AIEPI001();
        });
    },
    traerPatologiasCronicas() {
      var _this = this;
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER858.DLL"))
        .then((data) => {
          console.log(data);
          _this.patologias_cronicas = data.PATOLOGIAS;
          _this.patologias_cronicas.pop();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando patologias cronicas !", null, "error", "Error");
          _this.salir_AIEPI001();
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
            "2002;1001;4005;9501;9503;9007" +
            "|" +
            $_REG_HC.serv_hc +
            "|",
        },
        get_url("APP/HICLIN/HCDETAL_PRC.DLL")
      )
        .then((data) => {
          console.log(data);

          var formato_2002 = data.DETHC.find((x) => x["COD-DETHC"] == "2002");

          if (formato_2002) {
            if ($_REG_HC.serv_hc == "08" && formato_2002.DETALLE.tipo_ws == "03") {
              _this.DETALLE_HISTORIA.antec_perinatal = formato_2002.DETALLE;
              _this.DETALLE_HISTORIA.antec_perinatal.patologias_familiares =
                _this.DETALLE_HISTORIA.antec_perinatal.patologias_familiares.replace(/\&/g, "\n").trim();
            } else _this.DETALLE_HISTORIA.antec_perinatal_text = formato_2002.DETALLE.replace(/\&/g, "\n").trim();
          }

          var formato_1001 = data.DETHC.find((x) => x["COD-DETHC"] == "1001");
          if (formato_1001) _this.DETALLE_HISTORIA.Enfermedad_Actual = formato_1001.DETALLE.replace(/\&/g, "\n").trim();

          var formato_9501 = data.DETHC.find((x) => x["COD-DETHC"] == "9501");
          if (formato_9501) _this.DETALLE_HISTORIA.aiepi9501 = formato_9501.DETALLE;

          var formato_4005 = data.DETHC.find((x) => x["COD-DETHC"] == "4005");
          if (formato_4005) _this.DETALLE_HISTORIA.Examen_fisico = formato_4005.DETALLE.replace(/\&/g, "\n").trim();

          var formato_9503 = data.DETHC.find((x) => x["COD-DETHC"] == "9503");
          if (formato_9503) _this.DETALLE_HISTORIA.Tratar = formato_9503.DETALLE.replace(/\&/g, "\n").trim();

          var formato_9007 = data.DETHC.find((x) => x["COD-DETHC"] == "9007");
          if (formato_9007) _this.DETALLE_HISTORIA.autismo = formato_9007.DETALLE;

          _this.traerTablaSisvan();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_AIEPI001();
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
          _this.salir_AIEPI001();
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
          _this.salir_AIEPI001();
        });
    },
    async asignarDatos() {
      loader("hide");
      this.imprimir_HC002B() // IMPRESION EVOLUCIONES ANTERIORES DE ELECTRON
        .then(async () => {
          loader("show");

          this.global_AIEPI001.fecha = $_REG_HC.fecha_hc;

          this.global_AIEPI001.rips.finalidad = $_REG_HC.finalid_hc.toString();

          this.datos_ext.grupo_sang = this.datos_paciente["GRP-SANG"];
          this.datos_ext.RH = this.datos_paciente.RH;

          this.datos_ext.ANO = this.global_AIEPI001.fecha.substring(0, 4);
          this.datos_ext.MES = this.global_AIEPI001.fecha.substring(4, 6);
          this.datos_ext.DIA = this.global_AIEPI001.fecha.substring(6, 8);

          var mensaje = "";

          if (this.global_AIEPI001.novedad == "7") {
            this.global_AIEPI001.hora = moment().format("HHmm");
            this.global_AIEPI001.serv = JSON.parse(JSON.stringify($_REG_HC.serv_hc));
            this.global_AIEPI001.med = this.datos_profesional.IDENTIFICACION;
            this.global_AIEPI001.oper_elab = localStorage.Usuario;
            this.global_AIEPI001.rips.atiende = this.datos_profesional.ATIENDE_PROF;
            this.datos_ext.NOM_MEDICO =
              parseInt(this.datos_profesional.IDENTIFICACION) + " - " + this.datos_profesional.NOMBRE.trim();

            mensaje = "Creando: ";
          } else {
            this.datos_ext.NOM_MEDICO =
              parseInt(this.global_AIEPI001.med) + " - " + this.global_AIEPI001.descrip_med.trim();
            mensaje = "Modificando: ";
          }

          this.datos_ext.HORA = this.global_AIEPI001.hora.substring(0, 2);
          this.datos_ext.MINUTO = this.global_AIEPI001.hora.substring(2, 4);

          this.datos_ext.NOM_MEDICO = this.datos_profesional.NOMBRE;

          this.datos_ext.FOLIO = mensaje + $_REG_HC.suc_folio_hc + $_REG_HC.nro_folio_hc;

          //SIGNOS

          this.graficas.talla.info = await this.calcularGraficas("TXE");
          this.graficarTalla();

          this.graficas.peso_edad.info = await this.calcularGraficas("PXE");
          this.graficarPesoEdad();

          this.graficas.peso_talla.info = await this.calcularGraficas("PXT");
          this.graficarPesoTalla();

          this.graficas.imc.info = await this.calcularGraficas("IMC");
          this.graficarIMC();

          this.graficas.per_cef.info = await this.calcularGraficas("CEF");
          this.graficarPerCef();

          switch (this.global_AIEPI001.rips.atiende) {
            case "1":
              this.textos.personal_atiende = "1. MEDICO ESPECIALISTA";
              break;
            case "2":
              this.textos.personal_atiende = "2. MEDICO GENERAL";
              break;
            case "3":
              this.textos.personal_atiende = "3. ENFERMERA";
              break;
            case "4":
              this.textos.personal_atiende = "4. AUXILIAR ENFERMERIA";
              break;
            case "5":
              this.textos.personal_atiende = "5. TERAPIAS Y OTROS";
              break;
            case "6":
              this.textos.personal_atiende = "6. ENFERMERA JEFE PYP";
              break;
            case "7":
              this.textos.personal_atiende = "7. PSICOLOGIA";
              break;
            case "8":
              this.textos.personal_atiende = "8. NUTRICIONISTA";
              break;
            case "9":
              this.textos.personal_atiende = "9. SIN DETERMINAR";
              break;
            case "A":
              this.textos.personal_atiende = "A. ODONTOLOGO";
              break;
            case "H":
              this.textos.personal_atiende = "H. HIGIENISTA ORAL";
              break;
            case "I":
              this.textos.personal_atiende = "I. INSTRUMENTACION";
              break;
            case "O":
              this.textos.personal_atiende = "O. OPTOMETRA";
              break;
          }

          this.params_hc890d.sexo = this.datos_paciente.SEXO;

          if (this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_odont.trim() != "")
            this.datos_ext.evaluarSaludBucal = "S";
          else this.datos_ext.evaluarSaludBucal = "N";

          if (this.DETALLE_HISTORIA.autismo.balan_salto_rodilla_9007.trim() != "") this.mostrarAutismo = true;

          loader("hide");
          this.verificarEdad();
        });
    },
    imprimir_HC002B() {
      return new Promise((resolve) => {
        CON851P("¿Desea ver las evoluciones anteriores?", resolve, () => {
          iniciar_HC002B(2);
          resolve();
        });
      });
    },
    verificarEdad() {
      var unid_edad = this.global_AIEPI001.edad.substring(0, 1);
      var edad = parseInt(this.global_AIEPI001.edad.substring(1, 4));

      if ((unid_edad == "M" && edad < 2) || (unid_edad == "A" && edad > 5) || unid_edad == "D") {
        CON851("74", "74", null, "error", "Error");
        this.salir_AIEPI001();
      } else {
        this.verificarEstado();
      }
    },
    verificarEstado() {
      if (this.global_AIEPI001.cierre.estado == "2") {
        CON851("70", "70", null, "error", "Error");

        if (localStorage.Usuario == "GEBC" || localStorage.Usuario == "ADMI") {
          this.capturarMes_hc();
        } else {
          this.salir_AIEPI001();
        }
      } else {
        console.log(this.datos_profesional.IDENTIFICACION, this.global_AIEPI001.med);

        if (
          localStorage.Usuario == "GEBC" ||
          parseInt(this.datos_profesional.IDENTIFICACION) == parseInt(this.global_AIEPI001.med)
        ) {
          this.evaluarUnidadServicio_hc();
        } else {
          CON851("81", "81", null, "error", "Error");
          this.salir_AIEPI001();
        }
      }
    },
    capturarMes_hc() {
      validarInputs(
        {
          form: "#validarMes_AIEPI001",
          orden: "1",
        },
        () => this.salir_AIEPI001(),
        () => {
          this.datos_ext.MES = cerosIzq(this.datos_ext.MES, 2);
          this.capturarDia_hc();
        }
      );
    },
    capturarDia_hc() {
      validarInputs(
        {
          form: "#validarDia_AIEPI001",
          orden: "1",
        },
        () => this.capturarMes_hc(),
        () => {
          this.datos_ext.DIA = cerosIzq(this.datos_ext.DIA, 2);

          this.global_AIEPI001.fecha = this.datos_ext.ANO + this.datos_ext.MES + this.datos_ext.DIA;
          this.capturarHora_hc();
        }
      );
    },
    capturarHora_hc() {
      validarInputs(
        {
          form: "#validarHora_AIEPI001",
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
          form: "#validarMinuto_AIEPI001",
          orden: "1",
        },
        () => this.capturarHora_hc(),
        () => {
          if (parseInt(this.datos_ext.MINUTO) > 59) {
            CON851("03", "03", null, "error", "Error");
            this.capturarMinuto_hc();
          } else {
            this.datos_ext.MINUTO = cerosIzq(this.datos_ext.MINUTO, 2);
            this.global_AIEPI001.hora = this.datos_ext.HORA + this.datos_ext.MINUTO;
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
        data: this.profesionales_AIEPO001,
        ancho: "70%",
        callback_esc: () => {
          _this.capturarMinuto_hc();
        },
        callback: (data) => {
          _this.global_AIEPI001.med = data.IDENTIFICACION.trim();
          _this.datos_ext.NOM_MEDICO = parseInt(data.IDENTIFICACION) + " - " + data.NOMBRE.trim();
          _this.evaluarUnidadServicio_hc();
        },
      });
    },
    evaluarUnidadServicio_hc() {
      if (this.global_AIEPI001.serv.trim() != "") {
        var busqueda = this.unidades_Serv_AIEPO001.find((x) => x.COD.trim() == this.global_AIEPI001.serv.trim());

        if (busqueda) this.datos_ext.UNID_SERV = this.global_AIEPI001.serv + " - " + busqueda.DESCRIP.trim();
        else this.datos_ext.UNID_SERV = this.global_AIEPI001.serv;
      }

      this.global_AIEPI001.edad_dias = SC_DIAS(this.datos_paciente.NACIM, this.global_AIEPI001.fecha);

      var fecha_Actual = moment();
      var fecha_Nacim = moment(this.datos_paciente.NACIM).format("YYYYMMDD");

      if (parseInt(this.global_AIEPI001.edad_dias) > 365) {
        this.datos_ext.anos_naci = fecha_Actual.diff(fecha_Nacim, "years");
      } else {
        this.datos_ext.anos_naci = 0;
      }

      this.datos_ext.meses_naci = fecha_Actual.diff(fecha_Nacim, "months");

      if (parseInt(this.datos_ext.meses_naci) > 30) {
        this.datos_ext.meses_naci = parseInt(this.datos_ext.meses_naci) / 30;
      } else {
        this.datos_ext.meses_naci = 0;
      }

      this.buscarConsultaExterna();
    },
    buscarConsultaExterna() {
      var _this = this;

      if (this.global_AIEPI001.serv == "02" || this.global_AIEPI001.serv == "08") {
        postData(
          {
            datosh:
              datosEnvio() +
              localStorage.Usuario +
              "|" +
              _this.datos_paciente.COD +
              "|" +
              _this.global_AIEPI001.serv +
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
            _this.salir_AIEPI001();
          });
      } else {
        this.nro_ult_comp = "";
        this.verificarCrearHistoria();
      }
    },
    verificarCrearHistoria() {
      if (this.global_AIEPI001.novedad == "7") {
        this.crearHistoria();
      } else {
        this.validarProcedencia();
      }
    },
    crearHistoria() {
      var _this = this;

      var data = {};
      data["datosh"] =
        datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|" + this.global_AIEPI001.novedad + "|";
      data["datos_basicos"] =
        this.global_AIEPI001.fecha +
        "|" +
        this.global_AIEPI001.hora +
        "|" +
        this.global_AIEPI001.med +
        "|" +
        this.global_AIEPI001.serv +
        "|" +
        this.global_AIEPI001.edad +
        "|" +
        this.global_AIEPI001.edad_dias +
        "|AI01|2|" +
        this.global_AIEPI001.rips.finalidad +
        "|";

      postData(data, get_url("APP/HICLIN/SAVE_TEMP_HC.DLL"))
        .then((data) => {
          console.log(data);

          // if (_this.global_AIEPI001.serv == "01") {
          //   _this.global_AIEPI001.proceden = data.PROCEDENCIA.trim();
          //   _this.global_AIEPI001.motivo = data.MOTIV.trim();
          //   _this.global_AIEPI001.signos.peso = parseFloat(data.PESO.trim()).toString();
          //   _this.global_AIEPI001.signos.talla = parseInt(data.TALLA).toString();
          //   _this.global_AIEPI001.rips.triage = data.TRIAGE.trim();
          //   _this.global_AIEPI001.rips.causa = data.CAUSA.trim();
          //   _this.global_AIEPI001.rips.finalidad = data.FINALID.trim();
          //   _this.global_AIEPI001.rips.estado_sal = data.ESTADO_SAL.trim();
          //   _this.global_AIEPI001.rips.remitido = data.REMITIDO.trim();
          // }

          // _this.global_AIEPI001.novedad = "8";
          _this.traerHistoriaClinica(2);
        })
        .catch((error) => {
          console.log(error);
          CON851("", "Ha ocurrido un error creando historia", null, "error", "Error");
          _this.salir_AIEPI001();
        });
    },
    validarProcedencia() {
      validarInputs(
        {
          form: "#validarProcedencia",
          orden: "1",
        },
        () => CON851P("temp", this.validarProcedencia, this.salir_AIEPI001),
        () => {
          this.validarAcompañante();
        }
      );
    },
    validarAcompañante() {
      if (this.global_AIEPI001.acompa.trim() == "") this.global_AIEPI001.acompa = this.datos_paciente.MADRE.trim();

      validarInputs(
        {
          form: "#validarAcompañante",
          orden: "1",
        },
        () => this.validarProcedencia(),
        () => {
          this.global_AIEPI001.acompa = this.global_AIEPI001.acompa.replace(/[0-9|{};:,\+\-]/g, "");

          if (this.global_AIEPI001.acompa.length < 3) {
            CON851("", "Mínimo tres caracteres !", null, "error", "Error");
            this.validarAcompañante();
          } else this.validarParentesco();
        }
      );
    },
    validarParentesco() {
      if (this.global_AIEPI001.parent_acompa.trim() == "") {
        if (this.global_AIEPI001.acompa == this.datos_paciente.MADRE.trim()) {
          this.global_AIEPI001.parent_acompa = "MADRE";
        } else if (this.global_AIEPI001.acompa == this.datos_paciente.PADRE.trim()) {
          this.global_AIEPI001.parent_acompa = "PADRE";
        }
      }

      validarInputs(
        {
          form: "#validarParentesco",
          orden: "1",
        },
        () => this.validarAcompañante(),
        () => {
          this.global_AIEPI001.parent_acompa = this.global_AIEPI001.parent_acompa.replace(/[0-9|{};:,\+\-]/g, "");
          this.modal_victimaConf = true;
          this.datoPaciVictConflicto();
        }
      );
    },
    datoPaciVictConflicto() {
      validarInputs(
        {
          form: "#victConflicto_aiepi001",
        },
        () => {
          this.modal_victimaConf = false;
          this.validarParentesco();
        },
        () => {
          this.global_AIEPI001.victi_conflicto_paci =
            this.global_AIEPI001.victi_conflicto_paci.toUpperCase().trim() != "S" ? "N" : "S";

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
          this.global_AIEPI001.motivo = this.global_AIEPI001.motivo.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");

          this.validarPeso_nacer();
        }
      );
    },
    validarPeso_nacer() {
      validarInputs(
        {
          form: "#validarPeso_nace",
          orden: "1",
        },
        () => {
          this.validarMotivoConsulta();
        },
        () => {
          if (parseInt(this.global_AIEPI001.signos.peso_nacer) > 15000) {
            CON851("03", "03", null, "error", "Error");
            this.validarPeso_nacer();
          } else if (this.global_AIEPI001.signos.peso_nacer.trim() == "" && this.global_AIEPI001.serv == "08") {
            CON851("02", "02", null, "error", "Error");
            this.validarPeso_nacer();
          } else {
            this.validarTalla_nace();
          }
        }
      );
    },
    validarTalla_nace() {
      validarInputs(
        {
          form: "#validarTalla_nace",
          orden: "1",
        },
        () => {
          this.validarPeso_nacer();
        },
        () => {
          if (parseInt(this.global_AIEPI001.signos.talla_nacer) > 60) {
            CON851("03", "03", null, "error", "Error");
            this.validarTalla_nace();
          } else if (this.global_AIEPI001.signos.talla_nacer.trim() == "" && this.global_AIEPI001.serv == "08") {
            CON851("02", "02", null, "error", "Error");
            this.validarTalla_nace();
          } else {
            this.validarEdad_gestacion();
          }
        }
      );
    },
    validarEdad_gestacion() {
      validarInputs(
        {
          form: "#validarEdad_Gesta",
          orden: "1",
        },
        () => {
          this.validarTalla_nace();
        },
        () => {
          if (
            parseInt(this.global_AIEPI001.signos.edad_gestacional) > 42 ||
            parseInt(this.global_AIEPI001.signos.edad_gestacional) < 21
          ) {
            CON851("03", "03", null, "error", "Error");
            this.validarEdad_gestacion();
          } else if (this.global_AIEPI001.signos.edad_gestacional.trim() == "" && this.global_AIEPI001.serv == "08") {
            CON851("02", "02", null, "error", "Error");
            this.validarEdad_gestacion();
          } else {
            this.validarGrupo_sang();
          }
        }
      );
    },
    validarGrupo_sang() {
      validarInputs(
        {
          form: "#validarGrupoSang",
          orden: "1",
        },
        () => {
          this.validarEdad_gestacion();
        },
        () => {
          this.datos_ext.grupo_sang = this.datos_ext.grupo_sang.toUpperCase().trim();
          switch (this.datos_ext.grupo_sang) {
            case "O":
            case "A":
            case "B":
            case "AB":
              this.ValidarRH();
              break;
            default:
              CON851("03", "03", null, "error", "Error");
              this.validarGrupo_sang();
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
          this.validarGrupo_sang();
        },
        () => {
          switch (this.datos_ext.RH.trim()) {
            case "+":
            case "-":
              this.validarResul_examen();
              break;
            default:
              CON851("03", "03", null, "error", "Error");
              this.ValidarRH();
              break;
          }
        }
      );
    },
    validarResul_examen() {
      this.params_aiepi845a.estado = false;

      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Resultado TSH",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.resultado_examen,
            callback_f: () => this.ValidarRH(),
            seleccion: this.global_AIEPI001.signos.tsh_nacer,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_AIEPI001.signos.tsh_nacer = data.COD;

            _this.guardarHistoria(_this.ValidarRH, _this.llamarAIEPI845A);
          }
        );
      }, 300);
    },
    llamarAIEPI845A() {
      CON851("", "Primer bloque guardado", null, "success", "Correcto");
      this.params_aiepi845a.estado = 1;
    },
    salirAiepi845a(detalle, estado) {
      this.params_aiepi845a.estado = false;

      if (this.global_AIEPI001.serv == "08") {
        this.DETALLE_HISTORIA.antec_perinatal = detalle.antec_perinatal;
      } else {
        this.DETALLE_HISTORIA.antec_perinatal_text = detalle.antec_perinatal_text;
      }
      this.validarEsquemaVacunacion();
    },
    validarEsquemaVacunacion() {
      validarInputs(
        {
          form: "#validarEsqVacuna",
          orden: "1",
        },
        () => {
          this.params_aiepi845a.estado = 2;
        },
        () => {
          this.global_AIEPI001.esq_vacuna_completo =
            this.global_AIEPI001.esq_vacuna_completo.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarSaludOral6Mes();
        }
      );
    },
    validarSaludOral6Mes() {
      validarInputs(
        {
          form: "#validarSaludOral6Meses",
          orden: "1",
        },
        () => {
          this.validarEsquemaVacunacion();
        },
        () => {
          this.global_AIEPI001.salud_oral_ult_6mes =
            this.global_AIEPI001.salud_oral_ult_6mes.toUpperCase().trim() != "S" ? "N" : "S";

          this.guardarAntecedentesPerinatales();
        }
      );
    },
    guardarAntecedentesPerinatales() {
      var _this = this;
      var data = {};

      if (this.global_AIEPI001.serv == "08") {
        let antec = JSON.parse(JSON.stringify(this.DETALLE_HISTORIA.antec_perinatal));
        antec.patologias_familiares = antec.patologias_familiares.enterReplace();

        antec.tipo_ws = "03";

        data = { 2002: antec };
      } else {
        var texto = this.DETALLE_HISTORIA.antec_perinatal_text.enterReplace().strToTable("RENG_DETHC");
        for (indice in texto) data[indice] = texto[indice];
        texto.tipo_ws = "PL";
        data = { 2002: texto };
      }

      console.log(data, "DATA WS 2002");
      grabarDetalles(data, $_REG_HC.llave_hc)
        .then(() => {
          CON851("", "Antecedentes perinatales guardados", null, "success", "Correcto");
          _this.LlamarCOVID19();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error Guardando antecedentes", null, "error", "Error");
          _this.validarSaludOral6Mes();
        });
    },
    LlamarCOVID19() {
      if (this.mostrarCovid) {
        this.params_hc890h.pregunta = 1;
        this.params_hc890h.estado = true;
      } else {
        this.global_AIEPI001.covid19 = _tipoJsonHc("covid19");
        this.validarEnfermedadActual();
      }
    },
    EscpreguntasCovid(pregunta) {
      this.params_hc890h.pregunta = 0;
      this.params_hc890h.estado = false;

      this.validarSaludOral6Mes();
    },
    recibirPreguntasCovid(pregunta, param) {
      this.global_AIEPI001.covid19 = param;
      this.params_hc890h.pregunta = 0;
      this.params_hc890h.estado = false;

      this.guardarHistoria(this.LlamarCOVID19, () => {
        CON851("", "Preguntas COVID 19 guardadas", null, "success", "Correcto");
        this.validarEnfermedadActual();
      });
    },
    validarEnfermedadActual() {
      validarInputs(
        {
          form: "#validarEnfermedadActual",
          orden: "1",
        },
        () => {
          this.DETALLE_HISTORIA.Enfermedad_Actual = this.DETALLE_HISTORIA.Enfermedad_Actual.replace(
            /[\!\*\]\[\}\{\"\'\&\t]/g,
            " "
          );

          if (this.mostrarCovid) {
            this.params_hc890h.pregunta = 1;
            this.params_hc890h.estado = true;
          } else {
            this.validarSaludOral6Mes();
          }
        },
        () => {
          this.DETALLE_HISTORIA.Enfermedad_Actual = this.DETALLE_HISTORIA.Enfermedad_Actual.replace(
            /[\!\*\]\[\}\{\"\'\&\t]/g,
            " "
          );

          this.guardarEnfermedadActual();
        }
      );
    },
    guardarEnfermedadActual() {
      let _this = this;

      grabarDetallesText(this.DETALLE_HISTORIA.Enfermedad_Actual, $_REG_HC.llave_hc + "1001")
        .then(() => {
          CON851("", "Enfermedad actual guardada", null, "success", "Correcto");
          _this.validarUnidadMedidaPeso();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error guardando enfermedad actual", null, "error", "Error");
          _this.validarEnfermedadActual();
        });
    },
    validarUnidadMedidaPeso() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Unidad de medida Peso",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.unidad_medida,
            callback_f: () => this.validarEnfermedadActual(),
            seleccion: this.global_AIEPI001.signos.und_peso,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_AIEPI001.signos.und_peso = data.COD;
            _this.textos.unidad_medida = data.DESCRIP;

            _this.validarPeso();
          }
        );
      }, 300);
    },
    validarPeso() {
      validarInputs(
        {
          form: "#validarPeso",
          orden: "1",
        },
        () => {
          this.validarUnidadMedidaPeso();
        },
        () => {
          var peso = parseFloat(this.global_AIEPI001.signos.peso);
          this.global_AIEPI001.signos.peso = this.mascaras.peso.resolve(this.global_AIEPI001.signos.peso);

          if (this.global_AIEPI001.signos.peso.toString().trim() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarPeso();
          } else {
            switch (this.global_AIEPI001.signos.und_peso) {
              case "1":
                if (peso > 300) {
                  CON851("03", "03", null, "error", "Error");
                  this.validarPeso();
                } else {
                  this.datos_ext.peso_KG = peso;
                  this.validarPeso_toGraficar();
                }
                break;
              case "2":
                if (peso > 20000) {
                  CON851("03", "03", null, "error", "Error");
                  this.validarPeso();
                } else {
                  this.datos_ext.peso_KG = peso / 1000;
                  this.validarPeso_toGraficar();
                }
                break;
            }
          }
        }
      );
    },
    validarPeso_toGraficar() {
      var fecha_Actual = moment();
      var fecha_Nacim = moment(this.datos_paciente.NACIM).format("YYYYMMDD");

      var edadMeses = fecha_Actual.diff(fecha_Nacim, "months");

      var index_peso_edad = this.graficas.peso_edad.info.paci.findIndex((x) => parseInt(x.x) == parseInt(edadMeses));
      console.log(index_peso_edad, parseFloat(this.datos_ext.peso_KG));

      if (index_peso_edad != -1) {
        this.graficas.peso_edad.info.paci[index_peso_edad].y = parseFloat(this.datos_ext.peso_KG);
      } else {
        this.graficas.peso_edad.info.paci.push({ x: parseInt(edadMeses), y: parseFloat(this.datos_ext.peso_KG) });
      }

      this.graficarPesoEdad();

      this.validarTalla();
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
          var talla = parseInt(this.global_AIEPI001.signos.talla);

          if (this.global_AIEPI001.signos.talla.toString().trim() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarTalla();
          } else if (talla > 150) {
            CON851("03", "03", null, "error", "Error");
            this.validarTalla();
          } else {
            if (parseInt(this.SISVAN.talla_ant) > 0 && talla < parseInt(this.SISVAN.talla_ant))
              CON851("H3", "Talla menor a la anterior SISVAN", null, "warning", "Advertencia");

            this.global_AIEPI001.signos.talla = talla.toString();
            this.global_AIEPI001.signos.imc_estad = this.validarRangosOMS(
              "IMC",
              parseFloat(this.global_AIEPI001.signos.imc)
            );

            switch (this.global_AIEPI001.signos.imc_estad) {
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

            ////grafica talla por edad
            var index_talla = this.graficas.talla.info.paci.findIndex((x) => parseInt(x.x) == parseInt(edadMeses));
            if (index_talla != -1) {
              this.graficas.talla.info.paci[index_talla].y = talla;
            } else {
              this.graficas.talla.info.paci.push({ x: parseInt(edadMeses), y: talla });
            }

            ////grafica peso talla
            var index_peso_talla;
            if (this.SISVAN.talla_ant_grafica) {
              index_peso_talla = this.graficas.peso_talla.info.paci.findIndex(
                (x) => parseInt(x.x) == this.SISVAN.talla_ant_grafica
              );
            } else {
              index_peso_talla = this.graficas.peso_talla.info.paci.findIndex((x) => parseInt(x.x) == talla);
            }

            if (index_peso_talla != -1) {
              this.graficas.peso_talla.info.paci[index_peso_talla].x = talla;
              this.graficas.peso_talla.info.paci[index_peso_talla].y = parseFloat(this.datos_ext.peso_KG);
            } else {
              this.graficas.peso_talla.info.paci.push({ x: talla, y: parseFloat(this.datos_ext.peso_KG) });
            }

            ////grafica imc
            var index_imc = this.graficas.imc.info.paci.findIndex((x) => parseInt(x.x) == parseInt(edadMeses));
            if (index_imc != -1) {
              this.graficas.imc.info.paci[index_imc].y = parseFloat(this.global_AIEPI001.signos.imc);
            } else {
              this.graficas.imc.info.paci.push({
                x: parseInt(edadMeses),
                y: parseFloat(this.global_AIEPI001.signos.imc),
              });
            }

            this.SISVAN.talla_ant_grafica = talla;

            this.graficarTalla();
            this.graficarPesoTalla();
            this.graficarIMC();

            this.validarTemperatura();
          }
        }
      );
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
          if (this.global_AIEPI001.signos.temp.toString().trim() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarTemperatura();
          } else {
            this.global_AIEPI001.signos.temp = this.mascaras.temp.resolve(this.global_AIEPI001.signos.temp);

            if (
              parseFloat(this.global_AIEPI001.signos.temp) > 0 &&
              (parseFloat(this.global_AIEPI001.signos.temp) < 35.5 || parseFloat(this.global_AIEPI001.signos.temp) > 38)
            )
              CON851("BM", "BM", null, "warning", "Advertencia");

            if (parseFloat(this.global_AIEPI001.signos.temp) > 45) {
              CON851("03", "03", null, "error", "Error");
              this.validarTemperatura();
            } else if (parseFloat(this.global_AIEPI001.signos.temp) < 30) {
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
        () => {
          this.validarTemperatura();
        },
        () => {
          var fc = parseInt(this.global_AIEPI001.signos.fcard);

          if (this.global_AIEPI001.signos.fcard.toString().trim() == "" || fc == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validar_FC();
          } else if (fc > 200) {
            CON851("03", "03", null, "error", "Error");
            this.validar_FC();
          } else if (fc < 60 || fc > 100) {
            CON851("BK", "BK", null, "warning", "Advertencia");
            this.validar_FR();
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
        () => {
          this.validar_FC();
        },
        () => {
          var unidad_edad = this.global_AIEPI001.edad.substring(0, 1);
          var edad = parseInt(this.global_AIEPI001.edad.substring(1, 4));
          var fr = parseInt(this.global_AIEPI001.signos.fresp);

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
                  if (fr < 16 || fr > 30) CON851("BL", "BL", null, "warning", "Advertencia");
                }
                break;
            }

            if (parseInt(this.global_AIEPI001.edad_dias) < 60) {
              if (fr >= 60) this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosrap = "S";
              else this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosrap = "N";
            } else if (parseInt(this.global_AIEPI001.edad_dias) < 331) {
              if (fr >= 50) this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosrap = "S";
              else this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosrap = "N";
            } else {
              if (fr >= 40) this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosrap = "S";
              else this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosrap = "N";
            }

            if (fr > 100) {
              CON851("BL", "BL", null, "error", "Error");
              this.validar_FR();
            } else {
              this.validarTensArt_1();
            }
          } else {
            CON851("02", "02", null, "error", "Error");
            this.validar_FR();
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
        () => {
          this.validar_FR();
        },
        () => {
          if (this.global_AIEPI001.signos.tens1.toString().trim() == "") {
            this.global_AIEPI001.signos.tens2 = "";
            this.global_AIEPI001.signos.tens_m = "0";
            this.validarPeCef();
          } else if (parseInt(this.global_AIEPI001.signos.tens1) > 300) {
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
        () => {
          this.validarTensArt_1();
        },
        () => {
          if (this.global_AIEPI001.signos.tens2.toString().trim() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarTensArt_2();
          } else if (parseInt(this.global_AIEPI001.signos.tens2) > 300) {
            CON851("03", "03", null, "error", "Error");
            this.validarTensArt_2();
          } else {
            this.validarPeCef();
          }
        }
      );
    },
    validarPeCef() {
      validarInputs(
        {
          form: "#validar_PeCef",
          orden: "1",
        },
        () => {
          this.validarTensArt_2();
        },
        () => {
          var unidad_edad = this.global_AIEPI001.edad.substring(0, 1);
          var edad = parseInt(this.global_AIEPI001.edad.substring(1, 4));

          if (this.global_AIEPI001.signos.per_cef.toString().trim() == "" && unidad_edad != "A" && edad < 3) {
            CON851("02", "02", null, "error", "Error");
            this.validarPeCef();
          } else {
            // variable de WS AIEPI 9501
            this.DETALLE_HISTORIA.aiepi9501.signo_desnut.per_cef_estad = this.validarRangosOMS(
              "CEF",
              parseFloat(this.global_AIEPI001.signos.per_cef)
            );

            this.global_AIEPI001.signos.per_cef = this.mascaras.per.resolve(this.global_AIEPI001.signos.per_cef);

            switch (this.DETALLE_HISTORIA.aiepi9501.signo_desnut.per_cef_estad) {
              case "2":
                CON851("BG", "BG", null, "warning", "Advertencia");
                break;
              case "-2":
                CON851("BF", "BF", null, "warning", "Advertencia");
                break;
            }

            var fecha_Actual = moment();
            var fecha_Nacim = moment(this.datos_paciente.NACIM).format("YYYYMMDD");

            var edadMeses = fecha_Actual.diff(fecha_Nacim, "months");

            ////grafica per cef
            var index_cef = this.graficas.per_cef.info.paci.findIndex((x) => parseInt(x.x) == parseInt(edadMeses));
            if (index_cef != -1) {
              this.graficas.per_cef.info.paci[index_cef].y = parseFloat(this.global_AIEPI001.signos.per_cef);
            } else {
              this.graficas.per_cef.info.paci.push({
                x: parseInt(edadMeses),
                y: parseFloat(this.global_AIEPI001.signos.per_cef),
              });
            }

            this.graficarPerCef();
            this.mostrarBotonPdf = true;

            // valida si capturar per tora
            if (unidad_edad == "A" && edad > 10) {
              this.validarPerAbdo();
            } else {
              this.validarPerTora();
            }
          }
        }
      );
    },
    validarPerTora() {
      validarInputs(
        {
          form: "#validar_PERTOR",
          orden: "1",
        },
        () => {
          this.mostrarBotonPdf = false;
          this.validarPeCef();
        },
        () => {
          if (this.global_AIEPI001.signos.per_tora.toString().trim() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarPerTora();
          } else {
            this.global_AIEPI001.signos.per_tora = this.mascaras.per.resolve(this.global_AIEPI001.signos.per_tora);

            this.validarPerAbdo();
          }
        }
      );
    },
    validarPerAbdo() {
      if (this.global_AIEPI001.serv == "02" || this.global_AIEPI001.serv == "08") {
        validarInputs(
          {
            form: "#validar_PERABDO",
            orden: "1",
          },
          () => {
            var unidad_edad = this.global_AIEPI001.edad.substring(0, 1);
            var edad = parseInt(this.global_AIEPI001.edad.substring(1, 4));

            if (unidad_edad == "A" && edad > 10) {
              this.validarPeCef();
            } else {
              this.validarPerTora();
            }
          },
          () => {
            if (this.global_AIEPI001.signos.per_abdo.toString().trim() == "") {
              CON851("02", "02", null, "error", "Error");
              this.validarPerAbdo();
            } else {
              this.global_AIEPI001.signos.per_abdo = this.mascaras.per.resolve(this.global_AIEPI001.signos.per_abdo);

              this.validarPerMune();
            }
          }
        );
      } else {
        this.global_AIEPI001.signos.per_abdo = "000.0";
        this.global_AIEPI001.signos.per_mune = "00.0";
        this.validarPerBraq();
      }
    },
    validarPerMune() {
      validarInputs(
        {
          form: "#validar_PerMuneca",
          orden: "1",
        },
        () => {
          this.validarPerAbdo();
        },
        () => {
          if (this.global_AIEPI001.signos.per_mune.toString().trim() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarPerMune();
          } else {
            this.global_AIEPI001.signos.per_mune = this.mascaras.dos.resolve(this.global_AIEPI001.signos.per_mune);

            this.validarPerBraq();
          }
        }
      );
    },
    validarPerBraq() {
      validarInputs(
        {
          form: "#validar_PerBraqueal",
          orden: "1",
        },
        () => {
          if (this.global_AIEPI001.serv == "02" || this.global_AIEPI001.serv == "08") {
            this.validarPerMune();
          } else {
            this.validarPerTora();
          }
        },
        () => {
          if (this.global_AIEPI001.signos.per_braq.toString().trim() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarPerBraq();
          } else {
            this.global_AIEPI001.signos.per_braq = this.mascaras.dos.resolve(this.global_AIEPI001.signos.per_braq);

            this.validarOximetria();
          }
        }
      );
    },
    validarOximetria() {
      validarInputs(
        {
          form: "#validar_SV02",
          orden: "1",
        },
        () => {
          this.validarPerBraq();
        },
        () => {
          if (
            this.global_AIEPI001.signos.oximetria.toString().trim() == "" ||
            parseInt(this.global_AIEPI001.signos.oximetria) == 0
          ) {
            CON851("02", "02", null, "error", "Error");
            this.validarOximetria();
          } else {
            if (parseInt(this.global_AIEPI001.signos.oximetria) > 100) {
              CON851("03", "03", null, "error", "Error");
              this.validarOximetria();
            } else {
              this.validarComplementoVisual();
            }
          }
        }
      );
    },
    validarComplementoVisual() {
      var unidad_edad = this.global_AIEPI001.edad.substring(0, 1);
      var edad = parseInt(this.global_AIEPI001.edad.substring(1, 4));

      if (
        (this.global_AIEPI001.serv == "08" || this.global_AIEPI001.serv == "02") &&
        this.datos_profesional.ATIENDE_PROF == "2" &&
        unidad_edad == "A" &&
        edad > 2
      ) {
        this.LlamarHC890G();
      } else {
        this.evaluarLlamadoDiscapacidad();
      }
    },
    escHC890G() {
      this.params_hc890g.estado = false;
      this.validarOximetria();
    },
    LlamarHC890G() {
      //Agudeza visual
      this.params_hc890g.estado = true;
    },
    evaluarSalidaHC890G(agudeza) {
      this.params_hc890g.estado = false;
      console.log(agudeza);
      this.global_AIEPI001.examen_visual = agudeza;
      this.evaluarLlamadoDiscapacidad();
    },
    evaluarLlamadoDiscapacidad() {
      if (this.mostrar_hc890l) this.params_hc890l.estado = true;
      else {
        this.global_AIEPI001.rips.discapacidades = {
          fisica: "",
          mental: "",
          cognitiva: "",
          auditiva: "",
          visual: "",
        };

        this.guardarHistoria(this.validarOximetria, () => {
          CON851("", "Signos guardados", null, "success", "Correcto");
          this.validarSignoPeligroGeneral();
        });
      }
    },
    escHc890l() {
      this.params_hc890l.estado = false;

      var unidad_edad = this.global_AIEPI001.edad.substring(0, 1);
      var edad = parseInt(this.global_AIEPI001.edad.substring(1, 4));

      if (this.datos_profesional.ATIENDE_PROF == "2" && unidad_edad == "A" && edad > 2) {
        this.LlamarHC890G();
      } else this.validarOximetria();
    },
    evaluarSalidaHC890L(param) {
      this.params_hc890l.estado = false;
      this.global_AIEPI001.rips.discapacidades = param;

      this.guardarHistoria(this.validarOximetria, () => {
        CON851("", "Signos guardados", null, "success", "Correcto");
        this.validarSignoPeligroGeneral();
      });
    },
    validarSignoPeligroGeneral() {
      validarInputs(
        {
          form: "#validarSignoPeligroGeneral",
          orden: "1",
        },
        () => {
          if (this.mostrar_hc890l) this.params_hc890l.estado = true;
          else this.validarOximetria();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.peligr =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.peligr.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_peligro.peligr == "S") {
            this.validarBebeTomaPecho();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.tpecho = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.letarg = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.vomito = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.convul = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enf_observ = "";

            this.validarDificultadRespirar();
          }
        }
      );
    },
    validarBebeTomaPecho() {
      validarInputs(
        {
          form: "#validarBebeTomaPecho",
          orden: "1",
        },
        () => this.validarSignoPeligroGeneral(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.tpecho =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.tpecho.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarVomitaTodo();
        }
      );
    },
    validarVomitaTodo() {
      validarInputs(
        {
          form: "#validarVomitaTodo",
          orden: "1",
        },
        () => this.validarBebeTomaPecho(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.vomito =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.vomito.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarLetargicoInconsiente();
        }
      );
    },
    validarLetargicoInconsiente() {
      validarInputs(
        {
          form: "#validarLetargicoInconsiente",
          orden: "1",
        },
        () => this.validarVomitaTodo(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.letarg =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.letarg.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarConvulsiones();
        }
      );
    },
    validarConvulsiones() {
      validarInputs(
        {
          form: "#validarConvulsiones",
          orden: "1",
        },
        () => this.validarLetargicoInconsiente(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.convul =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.convul.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarObservacionesPeligroGeneral();
        }
      );
    },
    validarObservacionesPeligroGeneral() {
      validarInputs(
        {
          form: "#validarObservacionesPeligroGeneral",
          orden: "1",
        },
        () => this.validarConvulsiones(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enf_observ =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enf_observ.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ").trim();

          if (
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.convul == "S" &&
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.letarg == "S" &&
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.vomito == "S" &&
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.tpecho == "S"
          ) {
            this.DETALLE_HISTORIA.aiepi9501.enfer_grave = 1;
            CON851("A1", "A1", null, "warning", "Advertencia");
          } else {
            this.DETALLE_HISTORIA.aiepi9501.enfer_grave = 0;
          }

          this.validarDificultadRespirar();
        }
      );
    },
    validarDificultadRespirar() {
      if (this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosrap == "S") {
        this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosres = "S";
        CON851("", "Paciente con frec respiratoria rapida !", null, "warning", "Advertencia");
        this.validarDifRes_desde();
      } else {
        validarInputs(
          {
            form: "#validarDificultadRespirar",
            orden: "1",
          },
          () => {
            if (this.DETALLE_HISTORIA.aiepi9501.signo_peligro.peligr == "S") this.validarObservacionesPeligroGeneral();
            else this.validarSignoPeligroGeneral();
          },
          () => {
            this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosres =
              this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosres.toUpperCase().trim() != "S" ? "N" : "S";

            if (this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosres == "S") {
              this.validarDifRes_desde();
            } else {
              this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosdia = "";
              this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosapnea = "";
              this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosgrip = "";
              this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosest = "";
              this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosibi = "";
              this.DETALLE_HISTORIA.aiepi9501.signo_tos.tossib = "";
              this.DETALLE_HISTORIA.aiepi9501.signo_tos.tostri = "";
              this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosprem = "";
              this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosomnol = "";
              this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosbeber = "";
              this.DETALLE_HISTORIA.aiepi9501.signo_tos.tos_observ = "";
              this.validarDiarrea();
            }
          }
        );
      }
    },
    validarDifRes_desde() {
      validarInputs(
        {
          form: "#validarDifRes_desde",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosrap == "S") {
            if (this.DETALLE_HISTORIA.aiepi9501.signo_peligro.peligr == "S") this.validarObservacionesPeligroGeneral();
            else this.validarSignoPeligroGeneral();
          } else this.validarDificultadRespirar();
        },
        () => {
          if (
            this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosdia.trim() == "" ||
            parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosdia) == 0
          ) {
            CON851("02", "02", null, "error", "Error");
            this.validarDifRes_desde();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosdia = parseInt(
              this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosdia
            ).toString();

            this.validarTosApnea();
          }
        }
      );
    },
    validarTosApnea() {
      validarInputs(
        {
          form: "#validarTosApnea",
          orden: "1",
        },
        () => this.validarDifRes_desde(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosapnea =
            this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosapnea.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarCuadroGripal();
        }
      );
    },
    validarCuadroGripal() {
      validarInputs(
        {
          form: "#validarCuadroGripal",
          orden: "1",
        },
        () => this.validarTosApnea(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosgrip =
            this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosgrip.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarEstridorReposo();
        }
      );
    },
    validarEstridorReposo() {
      validarInputs(
        {
          form: "#validarEstridorReposo",
          orden: "1",
        },
        () => this.validarCuadroGripal(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosest =
            this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosest.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarSibilancias();
        }
      );
    },
    validarSibilancias() {
      validarInputs(
        {
          form: "#validarSibilancias",
          orden: "1",
        },
        () => this.validarEstridorReposo(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosibi =
            this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosibi.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosibi == "S") {
            this.validarEpisodioSibilancias();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_tos.tossib = "";
            this.validarPrematuro();
          }
        }
      );
    },
    validarEpisodioSibilancias() {
      validarInputs(
        {
          form: "#validarEpSibiPrev",
          orden: "1",
        },
        () => this.validarSibilancias(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_tos.tossib =
            this.DETALLE_HISTORIA.aiepi9501.signo_tos.tossib.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarPrematuro();
        }
      );
    },
    validarPrematuro() {
      validarInputs(
        {
          form: "#validarPrematuro",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosibi == "S") this.validarEpisodioSibilancias();
          else this.validarSibilancias();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosprem =
            this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosprem.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarTirajeSubcostal();
        }
      );
    },
    validarTirajeSubcostal() {
      validarInputs(
        {
          form: "#validarTirajeSubcostal",
          orden: "1",
        },
        () => this.validarPrematuro(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_tos.tostri =
            this.DETALLE_HISTORIA.aiepi9501.signo_tos.tostri.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarSomnoliento();
        }
      );
    },
    validarSomnoliento() {
      validarInputs(
        {
          form: "#validarSomnoliento",
          orden: "1",
        },
        () => this.validarTirajeSubcostal(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosomnol =
            this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosomnol.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarIncapacidadBeber();
        }
      );
    },
    validarIncapacidadBeber() {
      validarInputs(
        {
          form: "#validarIncapacidadHablar",
          orden: "1",
        },
        () => this.validarSomnoliento(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosbeber =
            this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosbeber.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarObservacionesRespiratorias();
        }
      );
    },
    validarObservacionesRespiratorias() {
      validarInputs(
        {
          form: "#validarObservacionesRespiratorias",
          orden: "1",
        },
        () => this.validarIncapacidadBeber(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_tos.tos_observ = this.DETALLE_HISTORIA.aiepi9501.signo_tos.tos_observ
            .replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ")
            .trim();

          this.evaluarEnfermedadRespiratoria();
        }
      );
    },
    evaluarEnfermedadRespiratoria() {
      this.DETALLE_HISTORIA.aiepi9501.var_resp = {
        neumo_grave: 0,
        neumo_leve: 0,
        crup_grave: 0,
        crup_leve: 0,
        bronquiolitis_grave: 0,
        bronquiolitis_leve: 0,
        sibilancia_grave: 0,
        sibilancia_leve: 0,
        resfriado: 0,
      };

      var TOS = JSON.parse(JSON.stringify(this.DETALLE_HISTORIA.aiepi9501.signo_tos));
      var OXIMETRIA = parseInt(this.global_AIEPI001.signos.oximetria);
      var dias = parseInt(this.global_AIEPI001.edad_dias);

      if (TOS.tosest == "S" && (dias < 91 || TOS.tosomnol == "S" || TOS.tostri == "S" || OXIMETRIA < 92)) {
        this.DETALLE_HISTORIA.aiepi9501.var_resp.crup_grave = 1;
        CON851("BN", "BN", null, "error", "Error");
      } else if (TOS.tosibi == "S") {
        var valida_1 = false;
        if (
          TOS.tostri == "S" ||
          TOS.tosrap == "S" ||
          TOS.tosapnea == "S" ||
          OXIMETRIA < 92 ||
          dias < 91 ||
          (dias < 181 && TOS.tosprem == "S")
        )
          valida_1 = true;

        if (dias < 731 && TOS.tossib == "N" && TOS.tosgrip == "S" && parseInt(TOS.tosdia) > 1 && valida_1) {
          this.DETALLE_HISTORIA.aiepi9501.var_resp.bronquiolitis_grave = 1;
          CON851("BO", "BO", null, "error", "Error");
        } else if (
          (dias > 730 || TOS.tossib == "S") &&
          (TOS.tosbeber == "S" || TOS.tosomnol == "S" || TOS.tostri == "S" || TOS.tosrap || OXIMETRIA < 92)
        ) {
          this.DETALLE_HISTORIA.aiepi9501.var_resp.sibilancia_grave = 1;
          CON851("BP", "BP", null, "error", "Error");
        } else if (
          (dias > 730 || TOS.tosibi == "S" || TOS.tossib == "S") &&
          TOS.tosbeber == "N" &&
          TOS.tosomnol == "N" &&
          OXIMETRIA > 84
        ) {
          this.DETALLE_HISTORIA.aiepi9501.var_resp.sibilancia_leve = 1;
          CON851("A5", "A5", null, "error", "Error");
        } else if (
          dias < 731 &&
          TOS.tosibi == "S" &&
          TOS.tossib == "N" &&
          TOS.tosgrip == "S" &&
          parseInt(TOS.tosdia) > 1 &&
          TOS.tostri == "N" &&
          TOS.tosrap == "N" &&
          TOS.tosapnea == "N" &&
          OXIMETRIA >= 92 &&
          dias > 90 &&
          (TOS.tosprem == "N" || dias > 18)
        ) {
          this.DETALLE_HISTORIA.aiepi9501.var_resp.bronquiolitis_leve = 1;
          CON851("BR", "BR", null, "error", "Error");
        }
      } else if (TOS.tosest == "S" && TOS.tosomnol == "N" && TOS.tostri == "N" && OXIMETRIA >= 92 && dias > 90) {
        this.DETALLE_HISTORIA.aiepi9501.var_resp.crup_leve = 1;
        CON851("BQ", "BQ", null, "error", "Error");
      } else if (this.DETALLE_HISTORIA.aiepi9501.enfer_grave == 1 || TOS.tostri == "S" || OXIMETRIA < 92) {
        this.DETALLE_HISTORIA.aiepi9501.var_resp.neumo_grave = 1;
        CON851("A2", "A2", null, "error", "Error");
      } else if (TOS.tosrap == "S") {
        this.DETALLE_HISTORIA.aiepi9501.var_resp.neumo_leve = 1;
        CON851("A3", "A3", null, "error", "Error");
      } else if (TOS.tosres == "S") {
        this.DETALLE_HISTORIA.aiepi9501.var_resp.resfriado = 1;
        CON851("A3", "A3", null, "error", "Error");
      }

      this.validarDiarrea();
    },
    validarDiarrea() {
      validarInputs(
        {
          form: "#validarDiarrea",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosres == "S") this.validarObservacionesRespiratorias();
          else this.validarDificultadRespirar();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_diare.diarre =
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diarre.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_diare.diarre == "S") {
            this.validarDiasDiarrea();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.var_diarr = {
              diarre_grave: 0,
              diarre_deshi: 0,
              diarre_riesg: 0,
              diarre_leve: 0,
              diarre_pers_grave: 0,
              diarre_pers_leve: 0,
              disenteria: 0,
            };

            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diadia = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_cant_24h = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_cant_4h = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diasan = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diavom_cant = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diaojo = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.dialet = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.pliegu = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_alim = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.bebsed = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_liqu = "";

            this.textos.ofrece_agua = "";

            if (parseFloat(this.global_AIEPI001.signos.temp) > 38) {
              CON851("3O", "3O", null, "warning", "Advertencia");
              this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiebre = "S";
              this.validarFiebre_desde();
            } else {
              this.validarFiebre();
            }
          }
        }
      );
    },
    validarDiasDiarrea() {
      validarInputs(
        {
          form: "#validarDiarreaDias",
          orden: "1",
        },
        () => this.validarDiarrea(),
        () => {
          if (
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diadia.trim() == "" ||
            parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_diare.diadia) == 0
          ) {
            CON851("02", "02", null, "error", "Error");
            this.validarDiasDiarrea();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diadia = parseInt(
              this.DETALLE_HISTORIA.aiepi9501.signo_diare.diadia
            ).toString();

            this.validarDeposicionesUlt24H();
          }
        }
      );
    },
    validarDeposicionesUlt24H() {
      validarInputs(
        {
          form: "#validarDiarreaCant24h",
          orden: "1",
        },
        () => this.validarDiasDiarrea(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_cant_24h = isNaN(
            parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_cant_24h)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_cant_24h).toString();

          this.validarDeposicionesUlt4h();
        }
      );
    },
    validarDeposicionesUlt4h() {
      validarInputs(
        {
          form: "#validarDiarreaCant4h",
          orden: "1",
        },
        () => this.validarDiasDiarrea(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_cant_4h = isNaN(
            parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_cant_4h)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_cant_4h).toString();

          this.validarSangreHeces();
        }
      );
    },
    validarSangreHeces() {
      validarInputs(
        {
          form: "#validarSangreHeces",
          orden: "1",
        },
        () => this.validarDeposicionesUlt4h(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_diare.diasan =
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diasan.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarVomitosUlt4H();
        }
      );
    },
    validarVomitosUlt4H() {
      validarInputs(
        {
          form: "#validarVomitoUlt4H",
          orden: "1",
        },
        () => this.validarSangreHeces(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_diare.diavom_cant = isNaN(
            parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_diare.diavom_cant)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_diare.diavom_cant).toString();

          this.validarOjosHundidos();
        }
      );
    },
    validarOjosHundidos() {
      validarInputs(
        {
          form: "#validarOjosHundidos",
          orden: "1",
        },
        () => this.validarVomitosUlt4H(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_diare.diaojo =
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diaojo.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarEstadoGeneral_nino();
        }
      );
    },
    validarEstadoGeneral_nino() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Estado general del niño",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.estado_general,
            callback_f: () => this.validarOjosHundidos(),
            seleccion: this.DETALLE_HISTORIA.aiepi9501.signo_diare.dialet,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.aiepi9501.signo_diare.dialet = data.COD;

            this.validarPliegueCutaneo();
          }
        );
      }, 300);
    },
    validarPliegueCutaneo() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Pliegue cutiano",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.pliegue_cutiano,
            callback_f: () => this.validarEstadoGeneral_nino(),
            seleccion: this.DETALLE_HISTORIA.aiepi9501.signo_diare.pliegu,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.aiepi9501.signo_diare.pliegu = data.COD;

            _this.validarAlimentosRecibidos();
          }
        );
      }, 300);
    },
    validarAlimentosRecibidos() {
      validarInputs(
        {
          form: "#validarAlimentosRecibidos",
          orden: "1",
        },
        () => this.validarPliegueCutaneo(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_alim = this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_alim
            .replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ")
            .toUpperCase()
            .trim();

          this.validarOfreceAgua();
        }
      );
    },
    validarOfreceAgua() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Si se le ofrece agua",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.ofrece_agua,
            callback_f: () => this.validarAlimentosRecibidos(),
            seleccion: this.DETALLE_HISTORIA.aiepi9501.signo_diare.bebsed,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.aiepi9501.signo_diare.bebsed = data.COD;

            _this.validarLiquidosRecibidos();
          }
        );
      }, 300);
    },
    validarLiquidosRecibidos() {
      validarInputs(
        {
          form: "#validarLiquidosRecibidos",
          orden: "1",
        },
        () => this.validarOfreceAgua(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_liqu = this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_liqu
            .replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ")
            .toUpperCase()
            .trim();

          this.validarEnfermedadDiarrea();
        }
      );
    },
    validarEnfermedadDiarrea() {
      this.DETALLE_HISTORIA.aiepi9501.var_diarr = {
        diarre_grave: 0,
        diarre_deshi: 0,
        diarre_riesg: 0,
        diarre_leve: 0,
        diarre_pers_grave: 0,
        diarre_pers_leve: 0,
        disenteria: 0,
      };

      var contar_w = 0;

      if (
        this.DETALLE_HISTORIA.aiepi9501.signo_diare.dialet == "1" ||
        this.DETALLE_HISTORIA.aiepi9501.signo_diare.dialet == "2"
      )
        contar_w = 1;
      if (this.DETALLE_HISTORIA.aiepi9501.signo_diare.diaojo == "S") contar_w = contar_w + 1;
      if (
        this.DETALLE_HISTORIA.aiepi9501.signo_diare.bebsed == "1" ||
        this.DETALLE_HISTORIA.aiepi9501.signo_diare.bebsed == "2"
      )
        contar_w = contar_w + 1;
      if (
        this.DETALLE_HISTORIA.aiepi9501.signo_diare.pliegu == "2" ||
        this.DETALLE_HISTORIA.aiepi9501.signo_diare.pliegu == "3"
      )
        contar_w = contar_w + 1;

      if (parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_diare.diadia) >= 14) {
        if (contar_w >= 2 || this.global_AIEPI001.edad_dias < 181) {
          this.DETALLE_HISTORIA.aiepi9501.var_diarr.diarre_pers_grave = 1;
          CON851("BT", "BT", null, "warning", "Advertencia");
        } else {
          this.DETALLE_HISTORIA.aiepi9501.var_diarr.diarre_pers_leve = 1;
          CON851("BU", "BU", null, "warning", "Advertencia");
        }
      } else if (contar_w >= 2) {
        this.DETALLE_HISTORIA.aiepi9501.var_diarr.diarre_grave = 1;
        CON851("A6", "A6", null, "warning", "Advertencia");
      } else {
        contar_w = 0;

        if (this.DETALLE_HISTORIA.aiepi9501.signo_diare.dialet == "1") contar_w = 1;
        if (this.DETALLE_HISTORIA.aiepi9501.signo_diare.diaojo == "S") contar_w = contar_w + 1;
        if (this.DETALLE_HISTORIA.aiepi9501.signo_diare.bebsed == "2") contar_w = contar_w + 1;
        if (this.DETALLE_HISTORIA.aiepi9501.signo_diare.pliegu == "2") contar_w = contar_w + 1;

        if (contar_w >= 2) {
          this.DETALLE_HISTORIA.aiepi9501.var_diarr.diarre_deshi = 1;
          CON851("A7", "A7", null, "warning", "Advertencia");
        }

        if (
          parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_cant_4h) > 4 ||
          parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_diare.diavom_cant) > 4 ||
          this.DETALLE_HISTORIA.aiepi9501.signo_diare.bebsed == "3"
        ) {
          this.DETALLE_HISTORIA.aiepi9501.var_diarr.diarre_riesg = 1;
          CON851("A8", "A8", null, "warning", "Advertencia");
        } else {
          this.DETALLE_HISTORIA.aiepi9501.var_diarr.diarre_leve = 1;
          CON851("BS", "BS", null, "warning", "Advertencia");
        }

        if (this.DETALLE_HISTORIA.aiepi9501.signo_diare.diasan == "S") {
          this.DETALLE_HISTORIA.aiepi9501.var_diarr.disenteria = 1;
          CON851("AB", "AB", null, "warning", "Advertencia");
        }
      }

      if (parseFloat(this.global_AIEPI001.signos.temp) > 38) {
        CON851("3O", "3O", null, "warning", "Advertencia");
        this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiebre = "S";
        this.validarFiebre_desde();
      } else {
        this.validarFiebre();
      }
    },
    validarFiebre() {
      validarInputs(
        {
          form: "#validarSignoFiebre",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.aiepi9501.signo_diare.diarre == "S") this.validarLiquidosRecibidos();
          else this.validarDiarrea();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiebre =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiebre.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiebre == "N") {
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiedia = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fietodia = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fierig = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieasp = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiepost = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiesan = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiedol = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fietorn = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiepie = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiedeng = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiemalur = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiemalru = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieeru = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiecapi = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieapari = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieconvul = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieciano = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieneuro = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiesocial = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiecef = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieocu = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiemial = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieastr = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiehepa = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fielipo = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiepulso = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieascit = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiediure = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiemanif = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiegota = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieparc = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fie_tgo = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fietrombo = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieleucop = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiehemato = "";

            this.validarProblemasOido();
          } else {
            this.validarFiebre_desde();
          }
        }
      );
    },
    validarFiebre_desde() {
      validarInputs(
        {
          form: "#validarFiebre_desde",
          orden: "1",
        },
        () => {
          if (parseFloat(this.global_AIEPI001.signos.temp) > 38) {
            if (this.DETALLE_HISTORIA.aiepi9501.signo_diare.diarre == "S") this.validarLiquidosRecibidos();
            else this.validarDiarrea();
          } else {
            this.validarFiebre();
          }
        },
        () => {
          if (
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiedia.trim() == "" ||
            parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiedia) == 0
          ) {
            CON851("02", "02", null, "error", "Error");
            this.validarFiebre_desde();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiedia = parseInt(
              this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiedia
            ).toString();

            if (parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiedia) < 6) {
              this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fietodia = "N";
              this.validarRigidezNuca();
            } else {
              this.validarFiebreTodosDias();
            }
          }
        }
      );
    },
    validarFiebreTodosDias() {
      validarInputs(
        {
          form: "#validarFiebreTodosDias",
          orden: "1",
        },
        () => this.validarFiebre_desde(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fietodia =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fietodia.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarRigidezNuca();
        }
      );
    },
    validarRigidezNuca() {
      validarInputs(
        {
          form: "#validarRigidezNuca",
          orden: "1",
        },
        () => {
          if (parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiedia) < 6) this.validarFiebre_desde();
          else this.validarFiebreTodosDias();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fierig =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fierig.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarAparienciaGrave();
        }
      );
    },
    validarAparienciaGrave() {
      validarInputs(
        {
          form: "#validarAparienciaGrave",
          orden: "1",
        },
        () => this.validarRigidezNuca(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieapari =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieapari.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarAspectoToxico();
        }
      );
    },
    validarAspectoToxico() {
      validarInputs(
        {
          form: "#validarAspectoToxico",
          orden: "1",
        },
        () => this.validarAparienciaGrave(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieasp =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieasp.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarPielPalida();
        }
      );
    },
    validarPielPalida() {
      validarInputs(
        {
          form: "#validarPielPalida",
          orden: "1",
        },
        () => this.validarAspectoToxico(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiepie =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiepie.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarEstimuloSocial();
        }
      );
    },
    validarEstimuloSocial() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Respuesta frente al estimulo social",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.estimulo_social,
            callback_f: () => this.validarPielPalida(),
            seleccion: this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiesocial,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiesocial = data.COD;

            this.validarManifestacionSangrado();
          }
        );
      }, 300);
    },
    validarManifestacionSangrado() {
      validarInputs(
        {
          form: "#validarManifestacionSangrado",
          orden: "1",
        },
        () => this.validarEstimuloSocial(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiesan =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiesan.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarRashNoCede();
        }
      );
    },
    validarRashNoCede() {
      validarInputs(
        {
          form: "#validarRashNoCede",
          orden: "1",
        },
        () => this.validarManifestacionSangrado(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieeru =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieeru.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarDolorAbdominal();
        }
      );
    },
    validarDolorAbdominal() {
      validarInputs(
        {
          form: "#validarDolorAbdominal",
          orden: "1",
        },
        () => this.validarRashNoCede(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiedol =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiedol.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarCefalea();
        }
      );
    },
    validarCefalea() {
      validarInputs(
        {
          form: "#validarCefalea",
          orden: "1",
        },
        () => this.validarDolorAbdominal(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiecef =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiecef.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarDolorRetrocular();
        }
      );
    },
    validarDolorRetrocular() {
      validarInputs(
        {
          form: "#validarDolorRetrocular",
          orden: "1",
        },
        () => this.validarCefalea(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieocu =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieocu.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarMialgias();
        }
      );
    },
    validarMialgias() {
      validarInputs(
        {
          form: "#validarMialgias",
          orden: "1",
        },
        () => this.validarDolorRetrocular(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiemial =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiemial.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarArtralgias();
        }
      );
    },
    validarArtralgias() {
      validarInputs(
        {
          form: "#validarArtralgias",
          orden: "1",
        },
        () => this.validarMialgias(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieastr =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieastr.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarPostracion();
        }
      );
    },
    validarPostracion() {
      validarInputs(
        {
          form: "#validarPostracion",
          orden: "1",
        },
        () => this.validarArtralgias(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiepost =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiepost.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarPruebaTorniquete();
        }
      );
    },
    validarPruebaTorniquete() {
      validarInputs(
        {
          form: "#validarPruebaTorniquete",
          orden: "1",
        },
        () => this.validarPostracion(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fietorn =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fietorn.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarHepatomegalia();
        }
      );
    },
    validarHepatomegalia() {
      validarInputs(
        {
          form: "#validarHepatomegalia",
          orden: "1",
        },
        () => this.validarPruebaTorniquete(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiehepa =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiehepa.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarLipotimia();
        }
      );
    },
    validarLipotimia() {
      validarInputs(
        {
          form: "#validarLipotimia",
          orden: "1",
        },
        () => this.validarHepatomegalia(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fielipo =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fielipo.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarLlenadoCapilarLento();
        }
      );
    },
    validarLlenadoCapilarLento() {
      validarInputs(
        {
          form: "#validarLlenadoCapilarLento",
          orden: "1",
        },
        () => this.validarLipotimia(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiecapi =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiecapi.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarPulsoRapido();
        }
      );
    },
    validarPulsoRapido() {
      validarInputs(
        {
          form: "#validarPulsoRapido",
          orden: "1",
        },
        () => this.validarLlenadoCapilarLento(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiepulso =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiepulso.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarAscitis();
        }
      );
    },
    validarAscitis() {
      validarInputs(
        {
          form: "#validarAscitis",
          orden: "1",
        },
        () => this.validarPulsoRapido(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieascit =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieascit.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarDisminucionDiuresis();
        }
      );
    },
    validarDisminucionDiuresis() {
      validarInputs(
        {
          form: "#validarDisminucionDiuresis",
          orden: "1",
        },
        () => this.validarAscitis(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiediure =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiediure.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarManifInfecc();
        }
      );
    },
    validarManifInfecc() {
      validarInputs(
        {
          form: "#validarManifInfecc",
          orden: "1",
        },
        () => this.validarDisminucionDiuresis(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiemanif =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiemanif.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarGotaGruesa();
        }
      );
    },
    validarGotaGruesa() {
      validarInputs(
        {
          form: "#validarGotaGruesa",
          orden: "1",
        },
        () => this.validarManifInfecc(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiegota =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiegota.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarParcialOrina();
        }
      );
    },
    validarParcialOrina() {
      validarInputs(
        {
          form: "#validarParcialOrina",
          orden: "1",
        },
        () => this.validarGotaGruesa(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieparc =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieparc.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarTgoTgp();
        }
      );
    },
    validarTgoTgp() {
      validarInputs(
        {
          form: "#validarTgoTgp",
          orden: "1",
        },
        () => this.validarParcialOrina(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fie_tgo =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fie_tgo.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarTrombocitopenia();
        }
      );
    },
    validarTrombocitopenia() {
      validarInputs(
        {
          form: "#validarTrombocitopenia",
          orden: "1",
        },
        () => this.validarTgoTgp(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fietrombo =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fietrombo.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarLeucopenia();
        }
      );
    },
    validarLeucopenia() {
      validarInputs(
        {
          form: "#validarLeucopenia",
          orden: "1",
        },
        () => this.validarTrombocitopenia(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieleucop =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieleucop.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarAumentoHematocrito();
        }
      );
    },
    validarAumentoHematocrito() {
      validarInputs(
        {
          form: "#validarAumentoHematocrito",
          orden: "1",
        },
        () => this.validarLeucopenia(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiehemato =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiehemato.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarExtremidadesFrias();
        }
      );
    },
    validarExtremidadesFrias() {
      validarInputs(
        {
          form: "#validarExtremidadesFrias",
          orden: "1",
        },
        () => this.validarAumentoHematocrito(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieciano =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieciano.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarCompromisoNeuro();
        }
      );
    },
    validarCompromisoNeuro() {
      validarInputs(
        {
          form: "#validarCompromisoNeuro",
          orden: "1",
        },
        () => this.validarExtremidadesFrias(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieneuro =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieneuro.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarConvulsionesFiebre();
        }
      );
    },
    validarConvulsionesFiebre() {
      validarInputs(
        {
          form: "#validarConvulsionesFiebre",
          orden: "1",
        },
        () => this.validarCompromisoNeuro(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieconvul =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieconvul.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarZonaDengue();
        }
      );
    },
    validarZonaDengue() {
      validarInputs(
        {
          form: "#validarZonaDengue",
          orden: "1",
        },
        () => this.validarConvulsionesFiebre(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiedeng =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiedeng.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarZonaMalariaUrbana();
        }
      );
    },
    validarZonaMalariaUrbana() {
      validarInputs(
        {
          form: "#validarZonaMalariaUrbana",
          orden: "1",
        },
        () => this.validarZonaDengue(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiemalur =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiemalur.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarZonaMalariaRural();
        }
      );
    },
    validarZonaMalariaRural() {
      validarInputs(
        {
          form: "#validarZonaMalariaRural",
          orden: "1",
        },
        () => this.validarZonaMalariaUrbana(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiemalru =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiemalru.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarEnfermedadFiebre();
        }
      );
    },
    validarEnfermedadFiebre() {
      this.DETALLE_HISTORIA.aiepi9501.var_fiebre = {
        febril_grave: 0,
        febril_inter: 0,
        febril_leve: 0,
        malaria_grave: 0,
        dengue_grave: 0,
        dengue_inter: 0,
        dengue_proba: 0,
        malaria_leve: 0,
      };

      var TEMP = parseFloat(this.global_AIEPI001.signos.temp);
      var FIEBRE = this.DETALLE_HISTORIA.aiepi9501.signo_fiebr;

      var primer_if = false;
      if (
        (this.global_AIEPI001.edad_dias < 91 && TEMP >= 38) ||
        (this.global_AIEPI001.edad_dias > 90 && this.global_AIEPI001.edad_dias < 181 && TEMP >= 39)
      )
        primer_if = true;

      if (
        this.DETALLE_HISTORIA.aiepi9501.enfer_grave == 1 ||
        FIEBRE.fierig == "S" ||
        FIEBRE.fieasp == "S" ||
        FIEBRE.fieapari == "S" ||
        FIEBRE.fiesocial == "1" ||
        FIEBRE.fiepie == "S" ||
        FIEBRE.fiesan == "S" ||
        FIEBRE.fieeru == "S" ||
        FIEBRE.fiemanif == "S" ||
        primer_if
      ) {
        this.DETALLE_HISTORIA.aiepi9501.var_fiebre.febril_grave = 1;
        CON851("AC", "AC", null, "warning", "Advertencia");

        if (FIEBRE.fiemalur == "S" || FIEBRE.fiemalru == "S") {
          this.DETALLE_HISTORIA.aiepi9501.var_fiebre.malaria_grave = 1;
          CON851("AF", "AF", null, "warning", "Advertencia");
        }
      } else {
        if (FIEBRE.fiemalur == "S" || FIEBRE.fiemalru == "S") {
          this.DETALLE_HISTORIA.aiepi9501.var_fiebre.malaria_leve = 2;
          CON851("AG", "AG", null, "warning", "Advertencia");
        }

        if (
          parseInt(FIEBRE.fiedia) >= 5 ||
          (this.global_AIEPI001.edad_dias > 180 && this.global_AIEPI001.edad_dias < 730 && TEMP >= 39) ||
          FIEBRE.fiesocial == "2"
        ) {
          this.DETALLE_HISTORIA.aiepi9501.var_fiebre.febril_inter = 1;
          CON851("AD", "AD", null, "warning", "Advertencia");
        } else {
          this.DETALLE_HISTORIA.aiepi9501.var_fiebre.febril_leve = 1;
          CON851("AE", "AE", null, "warning", "Advertencia");
        }
      }

      var contar_W = 0;

      if (FIEBRE.fiecef == "S") contar_W = 1;
      if (FIEBRE.fieocu == "S") contar_W = contar_W + 1;
      if (FIEBRE.fiemial == "S") contar_W = contar_W + 1;
      if (FIEBRE.fieastr == "S") contar_W = contar_W + 1;
      if (FIEBRE.fiepost == "S") contar_W = contar_W + 1;
      if (FIEBRE.fiehemato == "S") contar_W = contar_W + 1;

      if (FIEBRE.fiedeng == "S" && TEMP >= 39 && contar_W > 1) {
        if (
          FIEBRE.fielipo == "S" ||
          FIEBRE.fieciano == "S" ||
          FIEBRE.fiepulso == "S" ||
          FIEBRE.fiecapi == "S" ||
          this.DETALLE_HISTORIA.aiepi9501.signo_tos.tostri == "S" ||
          FIEBRE.fieascit == "S" ||
          FIEBRE.fierig == "S" ||
          FIEBRE.fiepost == "S" ||
          FIEBRE.fieconvul == "S" ||
          FIEBRE.fieneuro == "S" ||
          FIEBRE.fiesan == "S" ||
          FIEBRE.fie_tgo == "S"
        ) {
          this.DETALLE_HISTORIA.aiepi9501.var_fiebre.dengue_grave = 2;
          CON851("AH", "AH", null, "warning", "Advertencia");
        } else if (
          FIEBRE.fiedol == "S" ||
          FIEBRE.fiehepa == "S" ||
          FIEBRE.fiediure == "S" ||
          FIEBRE.fieleucop == "S" ||
          FIEBRE.fiehemato == "S" ||
          FIEBRE.fietrombo == "S"
        ) {
          this.DETALLE_HISTORIA.aiepi9501.var_fiebre.dengue_inter = 1;
          CON851("AI", "AI", null, "warning", "Advertencia");
        } else {
          this.DETALLE_HISTORIA.aiepi9501.var_fiebre.dengue_proba = 1;
          CON851("CA", "CA", null, "warning", "Advertencia");
        }
      }

      this.validarProblemasOido();
    },
    validarProblemasOido() {
      validarInputs(
        {
          form: "#validarSignoOido",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiebre == "S") this.validarZonaMalariaRural();
          else this.validarFiebre();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidopr =
            this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidopr.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidopr == "S") {
            this.DETALLE_HISTORIA.aiepi9501.var_oido.otitis_notiene = 0;
            this.validarDolorOido();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_oido.oiddol = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidsup = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_oido.oiddia = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidtim = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidtac = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidnum = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidnum_12 = "";

            this.DETALLE_HISTORIA.aiepi9501.var_oido.otitis_notiene = 1;
            this.validarGarganta();
          }
        }
      );
    },
    validarDolorOido() {
      validarInputs(
        {
          form: "#validarDolorOido",
          orden: "1",
        },
        () => this.validarProblemasOido(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_oido.oiddol =
            this.DETALLE_HISTORIA.aiepi9501.signo_oido.oiddol.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarSupuracion();
        }
      );
    },
    validarSupuracion() {
      validarInputs(
        {
          form: "#validarSupuracion",
          orden: "1",
        },
        () => this.validarDolorOido(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidsup =
            this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidsup.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidsup == "N") {
            this.DETALLE_HISTORIA.aiepi9501.signo_oido.oiddia = "00";

            this.validarTimpanoRojo();
          } else {
            this.validarDiasSupuracion();
          }
        }
      );
    },
    validarDiasSupuracion() {
      validarInputs(
        {
          form: "#validarDiasSupuracion",
          orden: "1",
        },
        () => this.validarSupuracion(),
        () => {
          if (
            this.DETALLE_HISTORIA.aiepi9501.signo_oido.oiddia.toString() == "" ||
            parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_oido.oiddia) == 0
          ) {
            CON851("02", "02", null, "error", "Error");
            this.validarDiasSupuracion();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_oido.oiddia = parseInt(
              this.DETALLE_HISTORIA.aiepi9501.signo_oido.oiddia
            ).toString();
            this.validarTimpanoRojo();
          }
        }
      );
    },
    validarTimpanoRojo() {
      validarInputs(
        {
          form: "#validarTimpanoRojo",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidsup == "S") this.validarDiasSupuracion();
          else this.validarSupuracion();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidtim =
            this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidtim.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarTumefaccion();
        }
      );
    },
    validarTumefaccion() {
      validarInputs(
        {
          form: "#validarTumefaccion",
          orden: "1",
        },
        () => this.validarTimpanoRojo(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidtac =
            this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidtac.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarOidoUlt6Meses();
        }
      );
    },
    validarOidoUlt6Meses() {
      validarInputs(
        {
          form: "#validarOidoUlt6Meses",
          orden: "1",
        },
        () => this.validarTumefaccion(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidnum = isNaN(
            parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidnum)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidnum).toString();

          this.validarOidoUlt12Meses();
        }
      );
    },
    validarOidoUlt12Meses() {
      validarInputs(
        {
          form: "#validarOidoUlt12Meses",
          orden: "1",
        },
        () => this.validarOidoUlt6Meses(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidnum_12 = isNaN(
            parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidnum_12)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidnum_12).toString();

          this.validarEnfermedadOido();
        }
      );
    },
    validarEnfermedadOido() {
      this.DETALLE_HISTORIA.aiepi9501.var_oido = {
        mastoid_grave: 0,
        otitis_cronic: 0,
        otitis_recurr: 0,
        otitis_aguda: 0,
        otitis_notiene: 0,
      };

      var OIDO = this.DETALLE_HISTORIA.aiepi9501.signo_oido;

      if (OIDO.oidtac == "S") {
        this.DETALLE_HISTORIA.aiepi9501.var_oido.mastoid_grave = 1;
        CON851("AK", "AK", null, "warning", "Advertencia");
      } else if (parseInt(OIDO.oiddia) > 14) {
        this.DETALLE_HISTORIA.aiepi9501.var_oido.otitis_cronic = 1;
        CON851("AM", "AM", null, "warning", "Advertencia");
      } else if (
        OIDO.oidtim == "S" ||
        OIDO.oiddol == "S" ||
        (parseInt(OIDO.oiddia) > 0 && parseInt(OIDO.oiddia) < 14)
      ) {
        if (parseInt(OIDO.oidnum) >= 3 || OIDO.oidnum_12 >= 4) {
          this.DETALLE_HISTORIA.aiepi9501.var_oido.otitis_recurr = 1;
          CON851("BV", "BV", null, "warning", "Advertencia");
        } else {
          this.DETALLE_HISTORIA.aiepi9501.var_oido.otitis_aguda = 1;
          CON851("AL", "AL", null, "warning", "Advertencia");
        }
      } else {
        this.DETALLE_HISTORIA.aiepi9501.var_oido.otitis_notiene = 1;
        CON851("AN", "AN", null, "warning", "Advertencia");
      }

      this.validarGarganta();
    },
    validarGarganta() {
      validarInputs(
        {
          form: "#validarSignoGarganta",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidopr == "S") this.validarOidoUlt12Meses();
          else this.validarProblemasOido();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_gargan.gargan =
            this.DETALLE_HISTORIA.aiepi9501.signo_gargan.gargan.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_gargan.gargan == "S") {
            this.validarDolorGarganta();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_gargan.gardol = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_gargan.garcue = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_gargan.garexu = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_gargan.garg_observ = "";

            this.guardarDetalle9501(this.validarGarganta, () => {
              CON851("", "Signos extendidos guardados", null, "success", "Correcto");
              this.validarCrecimiento();
            });
          }
        }
      );
    },
    validarDolorGarganta() {
      validarInputs(
        {
          form: "#validarDolorGarganta",
          orden: "1",
        },
        () => this.validarGarganta(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_gargan.gardol =
            this.DETALLE_HISTORIA.aiepi9501.signo_gargan.gardol.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarGargantaGanglios();
        }
      );
    },
    validarGargantaGanglios() {
      validarInputs(
        {
          form: "#validarGargantaGanglios",
          orden: "1",
        },
        () => this.validarDolorGarganta(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_gargan.garcue =
            this.DETALLE_HISTORIA.aiepi9501.signo_gargan.garcue.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarAmigdalas();
        }
      );
    },
    validarAmigdalas() {
      validarInputs(
        {
          form: "#validarAmigdalas",
          orden: "1",
        },
        () => this.validarGargantaGanglios(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_gargan.garexu =
            this.DETALLE_HISTORIA.aiepi9501.signo_gargan.garexu.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarObservacionesGarganta();
        }
      );
    },
    validarObservacionesGarganta() {
      validarInputs(
        {
          form: "#validarObservacionesGarganta",
          orden: "1",
        },
        () => this.validarAmigdalas(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_gargan.garg_observ =
            this.DETALLE_HISTORIA.aiepi9501.signo_gargan.garg_observ
              .replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ")
              .toUpperCase()
              .trim();

          this.validarEnfermedadGarganta();
        }
      );
    },
    validarEnfermedadGarganta() {
      var GARGAN = this.DETALLE_HISTORIA.aiepi9501.signo_gargan;
      var TEMP = parseFloat(this.global_AIEPI001.signos.temp);

      this.DETALLE_HISTORIA.aiepi9501.var_garganta = {
        faringo_bacte: 0,
        faringo_viral: 0,
        faringo_notiene: 0,
      };

      if (GARGAN.garcue == "S" && GARGAN.garexu == "S") {
        if (this.global_AIEPI001.edad_dias > 1090 && TEMP >= 38) {
          this.DETALLE_HISTORIA.aiepi9501.var_garganta.faringo_bacte = 1;
          CON851("AO", "AO", null, "warning", "Advertencia");
        } else {
          this.DETALLE_HISTORIA.aiepi9501.var_garganta.faringo_viral = 1;
          CON851("AP", "AP", null, "warning", "Advertencia");
        }
      } else {
        this.DETALLE_HISTORIA.aiepi9501.var_garganta.faringo_notiene = 1;
        CON851("AQ", "AQ", null, "warning", "Advertencia");
      }

      this.guardarDetalle9501(this.validarObservacionesGarganta, () => {
        CON851("", "Signos extendidos guardados", null, "success", "Correcto");
        this.validarCrecimiento();
      });
    },
    validarCrecimiento() {
      validarInputs(
        {
          form: "#validarSignoDesnutricion",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.aiepi9501.signo_gargan.gargan == "S") this.validarObservacionesGarganta();
          else this.validarGarganta();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_desnut.desema =
            this.DETALLE_HISTORIA.aiepi9501.signo_desnut.desema.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarEdemaAmbosPies();
        }
      );
    },
    validarEdemaAmbosPies() {
      validarInputs(
        {
          form: "#validarEdemaAmbosPies",
          orden: "1",
        },
        () => this.validarCrecimiento(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_desnut.desede =
            this.DETALLE_HISTORIA.aiepi9501.signo_desnut.desede.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarTendenciaPeso();
        }
      );
    },
    validarTendenciaPeso() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Tendencia de peso",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.tendencia_peso,
            callback_f: () => this.validarEdemaAmbosPies(),
            seleccion: this.DETALLE_HISTORIA.aiepi9501.signo_desnut.destend,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.aiepi9501.signo_desnut.destend = data.COD;

            _this.validarEnfermedadCrecimiento();
          }
        );
      }, 300);
    },
    validarEnfermedadCrecimiento() {
      this.DETALLE_HISTORIA.aiepi9501.var_crecim = {
        obeso: 0,
        sobrepeso: 0,
        desnutri_grave: 0,
        desnutri_leve: 0,
        desnutri_riesg: 0,
        desnutri_notiene: 0,
      };

      this.DETALLE_HISTORIA.aiepi9501.signo_desnut.pes_ed_estad = this.validarRangosOMS(
        "PXE",
        parseFloat(this.datos_ext.peso_KG)
      );
      var pes_ed_estad = parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_desnut.pes_ed_estad);
      console.log(pes_ed_estad);

      this.DETALLE_HISTORIA.aiepi9501.signo_desnut.talla_ed_estad = this.validarRangosOMS(
        "TXE",
        parseInt(this.global_AIEPI001.signos.talla)
      );
      var talla_ed_estad = parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_desnut.talla_ed_estad);
      console.log(talla_ed_estad);

      this.DETALLE_HISTORIA.aiepi9501.signo_desnut.peso_tal_estad = this.validarRangosOMS(
        "PXT",
        parseFloat(this.datos_ext.peso_KG)
      );
      var peso_tal_estad = parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_desnut.peso_tal_estad);
      console.log(peso_tal_estad);

      ///////////////////////////// Arriba se calculan rangos para validar abajo //////////////////////////////////////////////////

      if (peso_tal_estad == 3 || parseInt(this.global_AIEPI001.signos.imc_estad) == 3) {
        this.DETALLE_HISTORIA.aiepi9501.var_crecim.obeso = 1;
        CON851("BC", "BC", null, "warning", "Advertencia");
      } else if (peso_tal_estad == 2 || parseInt(this.global_AIEPI001.signos.imc_estad) == 2) {
        this.DETALLE_HISTORIA.aiepi9501.var_crecim.sobrepeso = 1;
        CON851("BB", "BB", null, "warning", "Advertencia");
      } else if (
        this.DETALLE_HISTORIA.aiepi9501.signo_desnut.desema == "S" ||
        this.DETALLE_HISTORIA.aiepi9501.signo_desnut.desede == "S" ||
        peso_tal_estad == -3 ||
        pes_ed_estad == -3
      ) {
        this.DETALLE_HISTORIA.aiepi9501.var_crecim.desnutri_grave = 1;
        CON851("AV", "AV", null, "warning", "Advertencia");
      } else if (
        peso_tal_estad <= -2 ||
        pes_ed_estad < -2 ||
        parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_desnut.destend) > 1
      ) {
        this.DETALLE_HISTORIA.aiepi9501.var_crecim.desnutri_leve = 1;
        CON851("AW", "AW", null, "warning", "Advertencia");
      } else if (peso_tal_estad == -2 || pes_ed_estad == -2) {
        this.DETALLE_HISTORIA.aiepi9501.var_crecim.desnutri_riesg = 1;
        CON851("BW", "BW", null, "warning", "Advertencia");
      } else if (peso_tal_estad == 2 && parseInt(this.global_AIEPI001.signos.imc_estad) == 2) {
        CON851("G5", "G5", null, "warning", "Advertencia");
      } else if (
        peso_tal_estad >= -1 &&
        peso_tal_estad <= 1 &&
        pes_ed_estad >= -1 &&
        pes_ed_estad <= 1 &&
        talla_ed_estad >= -1 &&
        parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_desnut.destend) == 1
      ) {
        this.DETALLE_HISTORIA.aiepi9501.var_crecim.desnutri_notiene = 1;
        CON851("AX", "AX", null, "warning", "Advertencia");
      }

      this.validarObservacionesCrecimiento();
    },
    validarObservacionesCrecimiento() {
      validarInputs(
        {
          form: "#validarObservacionesDesnutricion",
          orden: "1",
        },
        () => this.validarTendenciaPeso(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_desnut.desnobs = this.DETALLE_HISTORIA.aiepi9501.signo_desnut.desnobs
            .replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ")
            .toUpperCase()
            .trim();

          this.validarPalidezPalmar();
        }
      );
    },
    validarPalidezPalmar() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Palidez palmar",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.palidez,
            callback_f: () => this.validarObservacionesCrecimiento(),
            seleccion: this.DETALLE_HISTORIA.aiepi9501.signo_desnut.despal,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.aiepi9501.signo_desnut.despal = data.COD;

            _this.validarPalidezConjuntiva();
          }
        );
      }, 300);
    },
    validarPalidezConjuntiva() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Palidez conjuntiva",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.palidez,
            callback_f: () => this.validarPalidezPalmar(),
            seleccion: this.DETALLE_HISTORIA.aiepi9501.signo_desnut.despalcon,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.aiepi9501.signo_desnut.despalcon = data.COD;

            _this.validarAnemia();
          }
        );
      }, 300);
    },
    validarAnemia() {
      this.DETALLE_HISTORIA.aiepi9501.var_anemia = {
        anemia_grave: 0,
        anemia_leve: 0,
        anemia_notiene: 0,
      };

      if (
        this.DETALLE_HISTORIA.aiepi9501.signo_desnut.despal == "2" ||
        this.DETALLE_HISTORIA.aiepi9501.signo_desnut.despalcon == "2"
      ) {
        this.DETALLE_HISTORIA.aiepi9501.var_anemia.anemia_grave = 1;
        CON851("BX", "BX", null, "warning", "Advertencia");
      } else if (
        this.DETALLE_HISTORIA.aiepi9501.signo_desnut.despal == "1" ||
        this.DETALLE_HISTORIA.aiepi9501.signo_desnut.despalcon == "1"
      ) {
        this.DETALLE_HISTORIA.aiepi9501.var_anemia.anemia_leve = 1;
        CON851("BY", "BY", null, "warning", "Advertencia");
      } else {
        this.DETALLE_HISTORIA.aiepi9501.var_anemia.anemia_notiene = 1;
        CON851("BZ", "BZ", null, "warning", "Advertencia");
      }

      this.validarExamenFisico();
    },
    validarExamenFisico() {
      validarInputs(
        {
          form: "#validarExamenFisico",
          orden: "1",
        },
        () => {
          this.DETALLE_HISTORIA.Examen_fisico = this.DETALLE_HISTORIA.Examen_fisico.replace(
            /[\!\*\]\[\}\{\"\'\&\t]/g,
            " "
          );
          this.validarPalidezConjuntiva();
        },
        () => {
          this.DETALLE_HISTORIA.Examen_fisico = this.DETALLE_HISTORIA.Examen_fisico.replace(
            /[\!\*\]\[\}\{\"\'\&\t]/g,
            " "
          );

          this.guardarExamenFisico();
        }
      );
    },
    guardarExamenFisico() {
      let _this = this;

      grabarDetallesText(this.DETALLE_HISTORIA.Examen_fisico, $_REG_HC.llave_hc + "4005")
        .then(() => {
          CON851("", "Examen fisico guardado", null, "success", "Correcto");
          _this.validarRecienNacido();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error guardando examen fisico", null, "error", "Error");
          _this.validarExamenFisico();
        });
    },
    validarRecienNacido() {
      validarInputs(
        {
          form: "#validarRecienNacido",
          orden: "1",
        },
        () => this.validarExamenFisico(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.bsghep = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.bsghep
            .toUpperCase()
            .trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.bsghep) {
            case "S":
            case "N":
            case "I":
              this.validarPenta1_2Mes();
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.bsghep = "N";
              this.validarPenta1_2Mes();
              break;
          }
        }
      );
    },
    validarPenta1_2Mes() {
      validarInputs(
        {
          form: "#validarPenta1_2Mes",
          orden: "1",
        },
        () => this.validarRecienNacido(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.penta1 = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.penta1
            .toUpperCase()
            .trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.penta1) {
            case "S":
            case "N":
            case "I":
              this.validarVop1_2Mes();
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.penta1 = "N";
              this.validarVop1_2Mes();
              break;
          }
        }
      );
    },
    validarVop1_2Mes() {
      validarInputs(
        {
          form: "#validarVop1_2Mes",
          orden: "1",
        },
        () => this.validarPenta1_2Mes(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop1 = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop1
            .toUpperCase()
            .trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop1) {
            case "S":
            case "N":
            case "I":
              this.validarNeumoc1_2Mes();
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop1 = "N";
              this.validarNeumoc1_2Mes();
              break;
          }
        }
      );
    },
    validarNeumoc1_2Mes() {
      validarInputs(
        {
          form: "#validarNeumoc1_2Mes",
          orden: "1",
        },
        () => this.validarVop1_2Mes(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.neumoc1 =
            this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.neumoc1.toUpperCase().trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.neumoc1) {
            case "S":
            case "N":
            case "I":
              this.validarRotavir1_2Mes();
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.neumoc1 = "N";
              this.validarRotavir1_2Mes();
              break;
          }
        }
      );
    },
    validarRotavir1_2Mes() {
      validarInputs(
        {
          form: "#validarRotavir1_2Mes",
          orden: "1",
        },
        () => this.validarNeumoc1_2Mes(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_rotavir1 =
            this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_rotavir1.toUpperCase().trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_rotavir1) {
            case "S":
            case "N":
            case "I":
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_rotavir1 = "N";
              break;
          }

          if (this.global_AIEPI001.edad_dias < 118) this.salirVacunacion();
          else this.validarPenta2_4Mes();
        }
      );
    },
    validarPenta2_4Mes() {
      validarInputs(
        {
          form: "#validarPenta2_4Mes",
          orden: "1",
        },
        () => this.validarRotavir1_2Mes(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.penta2 = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.penta2
            .toUpperCase()
            .trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.penta2) {
            case "S":
            case "N":
            case "I":
              this.validarVop2_4Mes();
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.penta2 = "N";
              this.validarVop2_4Mes();
              break;
          }
        }
      );
    },
    validarVop2_4Mes() {
      validarInputs(
        {
          form: "#validarVop2_4Mes",
          orden: "1",
        },
        () => this.validarPenta2_4Mes(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop2 = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop2
            .toUpperCase()
            .trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop2) {
            case "S":
            case "N":
            case "I":
              this.validarNeumoc2_4Mes();
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop2 = "N";
              this.validarNeumoc2_4Mes();
              break;
          }
        }
      );
    },
    validarNeumoc2_4Mes() {
      validarInputs(
        {
          form: "#validarNeumoc2_4Mes",
          orden: "1",
        },
        () => this.validarVop2_4Mes(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.neumoc2 =
            this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.neumoc2.toUpperCase().trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.neumoc2) {
            case "S":
            case "N":
            case "I":
              this.validarRotavir2_4Mes();
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.neumoc2 = "N";
              this.validarRotavir2_4Mes();
              break;
          }
        }
      );
    },
    validarRotavir2_4Mes() {
      validarInputs(
        {
          form: "#validarRotavir2_4Mes",
          orden: "1",
        },
        () => this.validarNeumoc2_4Mes(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_rotavir2 =
            this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_rotavir2.toUpperCase().trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_rotavir2) {
            case "S":
            case "N":
            case "I":
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_rotavir2 = "N";
              break;
          }

          if (this.global_AIEPI001.edad_dias < 178) this.salirVacunacion();
          else this.validarPenta3_6Mes();
        }
      );
    },
    validarPenta3_6Mes() {
      validarInputs(
        {
          form: "#validarPenta3_6Mes",
          orden: "1",
        },
        () => this.validarRotavir2_4Mes(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.penta3 = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.penta3
            .toUpperCase()
            .trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.penta3) {
            case "S":
            case "N":
            case "I":
              this.validarVop3_6Mes();
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.penta3 = "N";
              this.validarVop3_6Mes();
              break;
          }
        }
      );
    },
    validarVop3_6Mes() {
      validarInputs(
        {
          form: "#validarVop3_6Mes",
          orden: "1",
        },
        () => this.validarPenta3_6Mes(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop3 = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop3
            .toUpperCase()
            .trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop3) {
            case "S":
            case "N":
            case "I":
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop3 = "N";
              break;
          }

          if (this.global_AIEPI001.edad_dias < 360) this.validarInfluenza_18Mes();
          else this.validarSRP1_12Mes();
        }
      );
    },
    validarSRP1_12Mes() {
      validarInputs(
        {
          form: "#validarSRP1_12Mes",
          orden: "1",
        },
        () => this.validarVop3_6Mes(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.tripl1 = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.tripl1
            .toUpperCase()
            .trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.tripl1) {
            case "S":
            case "N":
            case "I":
              this.validarVaricela_12Mes();
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.tripl1 = "N";
              this.validarVaricela_12Mes();
              break;
          }
        }
      );
    },
    validarVaricela_12Mes() {
      validarInputs(
        {
          form: "#validarVaricela_12Mes",
          orden: "1",
        },
        () => this.validarSRP1_12Mes(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_varicela =
            this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_varicela.toUpperCase().trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_varicela) {
            case "S":
            case "N":
            case "I":
              this.validarNeumoc3_12Mes();
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_varicela = "N";
              this.validarNeumoc3_12Mes();
              break;
          }
        }
      );
    },
    validarNeumoc3_12Mes() {
      validarInputs(
        {
          form: "#validarNeumoc3_12Mes",
          orden: "1",
        },
        () => this.validarVaricela_12Mes(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.neumoc3 =
            this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.neumoc3.toUpperCase().trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.neumoc3) {
            case "S":
            case "N":
            case "I":
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.neumoc3 = "N";
              break;
          }

          if (this.global_AIEPI001.edad_dias < 540) this.validarInfluenza_18Mes();
          else this.validarFAmarilla_18Mes();
        }
      );
    },
    validarFAmarilla_18Mes() {
      validarInputs(
        {
          form: "#validarFAmarilla_18Mes",
          orden: "1",
        },
        () => this.validarNeumoc3_12Mes(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.fiebam = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.fiebam
            .toUpperCase()
            .trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.fiebam) {
            case "S":
            case "N":
            case "I":
              this.validarVop4_18Mes();
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.fiebam = "N";
              this.validarVop4_18Mes();
              break;
          }
        }
      );
    },
    validarVop4_18Mes() {
      validarInputs(
        {
          form: "#validarVop4_18Mes",
          orden: "1",
        },
        () => this.validarFAmarilla_18Mes(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop4 = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop4
            .toUpperCase()
            .trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop4) {
            case "S":
            case "N":
            case "I":
              this.validarDPT1_18Mes();
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop4 = "N";
              this.validarDPT1_18Mes();
              break;
          }
        }
      );
    },
    validarDPT1_18Mes() {
      validarInputs(
        {
          form: "#validarDPT1_18Mes",
          orden: "1",
        },
        () => this.validarVop4_18Mes(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vdptr1 = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vdptr1
            .toUpperCase()
            .trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vdptr1) {
            case "S":
            case "N":
            case "I":
              this.validarInfluenza_18Mes();
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vdptr1 = "N";
              this.validarInfluenza_18Mes();
              break;
          }
        }
      );
    },
    validarInfluenza_18Mes() {
      validarInputs(
        {
          form: "#validarInfluenza_18Mes",
          orden: "1",
        },
        () => {
          if (this.global_AIEPI001.edad_dias < 360) {
            this.validarVop3_6Mes();
          } else if (this.global_AIEPI001.edad_dias < 540) {
            this.validarNeumoc3_12Mes();
          } else {
            this.validarDPT1_18Mes();
          }
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_influenza =
            this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_influenza.toUpperCase().trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_influenza) {
            case "S":
            case "N":
            case "I":
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_influenza = "N";
              break;
          }

          if (this.global_AIEPI001.edad_dias < 1800) this.salirVacunacion();
          else this.validarDPT2_5ano();
        }
      );
    },
    validarDPT2_5ano() {
      validarInputs(
        {
          form: "#validarDPT2_5ano",
          orden: "1",
        },
        () => this.validarInfluenza_18Mes(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vdptr2 = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vdptr2
            .toUpperCase()
            .trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vdptr2) {
            case "S":
            case "N":
            case "I":
              this.validarVop5_5ano();
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vdptr2 = "N";
              this.validarVop5_5ano();
              break;
          }
        }
      );
    },
    validarVop5_5ano() {
      validarInputs(
        {
          form: "#validarVop5_5ano",
          orden: "1",
        },
        () => this.validarDPT2_5ano(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop5 = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop5
            .toUpperCase()
            .trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop5) {
            case "S":
            case "N":
            case "I":
              this.validarSRP2_5ano();
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop5 = "N";
              this.validarSRP2_5ano();
              break;
          }
        }
      );
    },
    validarSRP2_5ano() {
      validarInputs(
        {
          form: "#validarSRP2_5ano",
          orden: "1",
        },
        () => this.validarVop5_5ano(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.tripl2 = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.tripl2
            .toUpperCase()
            .trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.tripl2) {
            case "S":
            case "N":
            case "I":
              this.salirVacunacion();
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.tripl2 = "N";
              this.salirVacunacion();
              break;
          }
        }
      );
    },
    salirVacunacion() {
      this.guardarDetalle9501(this.validarRecienNacido, () => {
        CON851("", "Antecedentes Vacunacion guardado", null, "success", "Correcto");
        if (this.global_AIEPI001.rips.tabla_diag[0].diagn.trim() == "" && this.global_AIEPI001.serv == "08")
          this.global_AIEPI001.rips.tabla_diag[0].diagn = "Z001";
        this.llamdadoPYP2();
      });
    },
    llamdadoPYP2() {
      if (this.global_AIEPI001.serv == "08") {
        this.mostrarPYP2 = true;
        setTimeout(() => (this.paramsPYP2.estado = 1), 300);
      } else {
        this.validarSignoMaltrato();
      }
    },
    escPYP2() {
      this.paramsPYP2.estado = false;

      if (this.global_AIEPI001.edad_dias < 118) {
        this.validarRotavir1_2Mes();
      } else if (this.global_AIEPI001.edad_dias < 178) {
        this.validarRotavir2_4Mes();
      } else if (this.global_AIEPI001.edad_dias < 1800) {
        this.validarInfluenza_18Mes();
      } else {
        this.validarSRP2_5ano();
      }
    },
    salirPYP2() {
      this.paramsPYP2.estado = false;
      this.validarSignoMaltrato();
    },
    validarSignoMaltrato() {
      validarInputs(
        {
          form: "#validarSignoMaltrato",
          orden: "1",
        },
        () => {
          if (this.global_AIEPI001.serv == "08") this.paramsPYP2.estado = 2;
          else {
            if (this.global_AIEPI001.edad_dias < 118) {
              this.validarRotavir1_2Mes();
            } else if (this.global_AIEPI001.edad_dias < 178) {
              this.validarRotavir2_4Mes();
            } else if (this.global_AIEPI001.edad_dias < 1800) {
              this.validarInfluenza_18Mes();
            } else {
              this.validarSRP2_5ano();
            }
          }
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.maltra =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.maltra.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.maltra == "S") {
            this.validarCorrigeHijo();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato = {
              maltra: "N",
              malpro: "",
              maline: "",
              malcua: "",
              maldis: "",
              malexp: "",
              malcor: "",
              malalt: "",
              malcrian: "",
              malcon: "",
              malhig: "",
              malt_observ: "",
              malcran: "",
              malquem: "",
              malfract: "",
              malcuta: "",
              maltrame: "",
              malemoci: "",
              malexprob: "",
              malinade: "",
              malautori: "",
              malviolen: "",
              malsalud: "",
              malcalle: "",
              malasiste: "",
            };

            this.DETALLE_HISTORIA.aiepi9501.signo_abusex = {
              abusex: "",
              abusex_sang: "",
              abusex_relat: "",
              abusex_vener: "",
              abusex_traum: "",
              abusex_semen: "",
              abusex_activi: "",
              abusex_clamid: "",
              abusex_condil: "",
              abusex_cuerpo: "",
              abusex_comport: "",
              abusex_dolor: "",
              abusex_temor: "",
            };

            this.DETALLE_HISTORIA.aiepi9501.var_maltrato = {
              maltrato_grave: "",
              maltrato_leve: "",
              abuso_sex_grave: "",
              abuso_sex_sospe: "",
              abandono: "",
              maltrato_nohay: "",
            };

            this.validarSaludBucal();
          }
        }
      );
    },
    validarCorrigeHijo() {
      validarInputs(
        {
          form: "#validarCorrigeHijo",
          orden: "1",
        },
        () => this.validarSignoMaltrato(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcor = this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcor
            .toUpperCase()
            .trim();

          if (this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcor == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarCorrigeHijo();
          } else {
            this.validarSolucionaConflictos();
          }
        }
      );
    },
    validarSolucionaConflictos() {
      validarInputs(
        {
          form: "#validarSolucionaConflictos",
          orden: "1",
        },
        () => this.validarCorrigeHijo(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcon = this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcon
            .toUpperCase()
            .trim();

          if (this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcon == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarSolucionaConflictos();
          } else {
            this.validarProdujeronLesiones();
          }
        }
      );
    },
    validarProdujeronLesiones() {
      validarInputs(
        {
          form: "#validarProdujeronLesiones",
          orden: "1",
        },
        () => this.validarSolucionaConflictos(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malpro = this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malpro
            .toUpperCase()
            .trim();

          if (this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malpro == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarProdujeronLesiones();
          } else {
            this.validarCuandoProdujeronLesiones();
          }
        }
      );
    },
    validarCuandoProdujeronLesiones() {
      validarInputs(
        {
          form: "#validarCuandoProdujeronLesiones",
          orden: "1",
        },
        () => this.validarProdujeronLesiones(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcua = this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcua
            .toUpperCase()
            .trim();

          if (this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcua == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarCuandoProdujeronLesiones();
          } else {
            this.validarLesionesFisicasGraves();
          }
        }
      );
    },
    validarLesionesFisicasGraves() {
      validarInputs(
        {
          form: "#validarLesionesFisicasGraves",
          orden: "1",
        },
        () => this.validarCuandoProdujeronLesiones(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.maline =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.maline.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarLesionesCraneo();
        }
      );
    },
    validarLesionesCraneo() {
      validarInputs(
        {
          form: "#validarLesionesCraneo",
          orden: "1",
        },
        () => this.validarLesionesFisicasGraves(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcran =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcran.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarQuemaduras();
        }
      );
    },
    validarQuemaduras() {
      validarInputs(
        {
          form: "#validarQuemaduras",
          orden: "1",
        },
        () => this.validarLesionesCraneo(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malquem =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malquem.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarFracturas();
        }
      );
    },
    validarFracturas() {
      validarInputs(
        {
          form: "#validarFracturas",
          orden: "1",
        },
        () => this.validarQuemaduras(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malfract =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malfract.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarLesionesCutaneas();
        }
      );
    },
    validarLesionesCutaneas() {
      validarInputs(
        {
          form: "#validarLesionesCutaneas",
          orden: "1",
        },
        () => this.validarFracturas(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcuta =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcuta.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarTraumaMenorExaFisico();
        }
      );
    },
    validarTraumaMenorExaFisico() {
      validarInputs(
        {
          form: "#validarTraumaMenorExaFisico",
          orden: "1",
        },
        () => this.validarLesionesCutaneas(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.maltrame =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.maltrame.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarRelatoSospechoso();
        }
      );
    },
    validarRelatoSospechoso() {
      validarInputs(
        {
          form: "#validarRelatoSospechoso",
          orden: "1",
        },
        () => this.validarTraumaMenorExaFisico(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malexp =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malexp.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarIncoherenciaRelato();
        }
      );
    },
    validarIncoherenciaRelato() {
      validarInputs(
        {
          form: "#validarIncoherenciaRelato",
          orden: "1",
        },
        () => this.validarRelatoSospechoso(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.maldis =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.maldis.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarFallaCrianza();
        }
      );
    },
    validarFallaCrianza() {
      validarInputs(
        {
          form: "#validarFallaCrianza",
          orden: "1",
        },
        () => this.validarIncoherenciaRelato(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcrian =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcrian.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarCompPadresMaltFisico();
        }
      );
    },
    validarCompPadresMaltFisico() {
      validarInputs(
        {
          form: "#validarCompPadresMaltFisico",
          orden: "1",
        },
        () => this.validarFallaCrianza(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malalt =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malalt.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarRelatoMaltratoEmocional();
        }
      );
    },
    validarRelatoMaltratoEmocional() {
      validarInputs(
        {
          form: "#validarRelatoMaltratoEmocional",
          orden: "1",
        },
        () => this.validarCompPadresMaltFisico(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malemoci =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malemoci.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarExpProblemaEmocional();
        }
      );
    },
    validarExpProblemaEmocional() {
      validarInputs(
        {
          form: "#validarExpProblemaEmocional",
          orden: "1",
        },
        () => this.validarRelatoMaltratoEmocional(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malexprob =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malexprob.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarCompInadec_Cuidador();
        }
      );
    },
    validarCompInadec_Cuidador() {
      validarInputs(
        {
          form: "#validarCompInadec_Cuidador",
          orden: "1",
        },
        () => this.validarExpProblemaEmocional(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malinade =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malinade.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarPatronesCrianzaAutoritaria();
        }
      );
    },
    validarPatronesCrianzaAutoritaria() {
      validarInputs(
        {
          form: "#validarPatronesCrianzaAutoritaria",
          orden: "1",
        },
        () => this.validarCompInadec_Cuidador(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malautori =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malautori.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarExposicionIntrafamiliar();
        }
      );
    },
    validarExposicionIntrafamiliar() {
      validarInputs(
        {
          form: "#validarExposicionIntrafamiliar",
          orden: "1",
        },
        () => this.validarPatronesCrianzaAutoritaria(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malviolen =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malviolen.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarDescuidoSalud();
        }
      );
    },
    validarExposicionIntrafamiliar() {
      validarInputs(
        {
          form: "#validarExposicionIntrafamiliar",
          orden: "1",
        },
        () => this.validarPatronesCrianzaAutoritaria(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malviolen =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malviolen.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarDescuidoSalud();
        }
      );
    },
    validarDescuidoSalud() {
      validarInputs(
        {
          form: "#validarDescuidoSalud",
          orden: "1",
        },
        () => this.validarExposicionIntrafamiliar(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malsalud =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malsalud.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarDescuidoHigiene();
        }
      );
    },
    validarDescuidoHigiene() {
      validarInputs(
        {
          form: "#validarDescuidoHigiene",
          orden: "1",
        },
        () => this.validarDescuidoSalud(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malhig =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malhig.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarSituacionCalle();
        }
      );
    },
    validarSituacionCalle() {
      validarInputs(
        {
          form: "#validarSituacionCalle",
          orden: "1",
        },
        () => this.validarDescuidoHigiene(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcalle =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcalle.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarAccionesProteccion();
        }
      );
    },
    validarAccionesProteccion() {
      validarInputs(
        {
          form: "#validarAccionesProteccion",
          orden: "1",
        },
        () => this.validarSituacionCalle(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malasiste =
            this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malasiste.toUpperCase().trim() != "S" ? "N" : "S";

          this.evaluarMaltrato();
        }
      );
    },
    evaluarMaltrato() {
      var MALTRATO = this.DETALLE_HISTORIA.aiepi9501.signo_maltrato;

      this.DETALLE_HISTORIA.aiepi9501.var_maltrato = {
        maltrato_grave: 0,
        maltrato_leve: 0,
        abuso_sex_grave: 0,
        abuso_sex_sospe: 0,
        abandono: 0,
        maltrato_nohay: 0,
      };

      var contar_w = 0;

      if (MALTRATO.malemoci == "S") contar_w = 1;
      if (MALTRATO.malinade == "S") contar_w = contar_w + 1;
      if (MALTRATO.malexprob == "S") contar_w = contar_w + 1;
      if (MALTRATO.malautori == "S") contar_w = contar_w + 1;
      if (MALTRATO.malviolen == "S") contar_w = contar_w + 1;
      if (MALTRATO.malasiste == "S") contar_w = contar_w + 1;
      if (MALTRATO.malsalud == "S") contar_w = contar_w + 1;
      if (MALTRATO.malhig == "S") contar_w = contar_w + 1;
      if (MALTRATO.malcalle == "S") contar_w = contar_w + 1;

      if (
        MALTRATO.maline == "S" ||
        MALTRATO.malcran == "S" ||
        MALTRATO.malquem == "S" ||
        MALTRATO.malfract == "S" ||
        MALTRATO.malcuta == "S" ||
        MALTRATO.maldis == "S"
      ) {
        this.DETALLE_HISTORIA.aiepi9501.var_maltrato.maltrato_grave = 1;
        CON851("CB", "CB", null, "warning", "Advertencia");
      } else if (
        MALTRATO.maltrame == "S" ||
        MALTRATO.malexp == "S" ||
        MALTRATO.malcrian == "S" ||
        MALTRATO.malalt == "S"
      ) {
        this.DETALLE_HISTORIA.aiepi9501.var_maltrato.maltrato_leve = 1;
        CON851("CC", "CC", null, "warning", "Advertencia");
      } else if (contar_w > 1) {
        this.DETALLE_HISTORIA.aiepi9501.var_maltrato.abandono = 1;
        CON851("CF", "CF", null, "warning", "Advertencia");
      }

      this.guardarDetalle9501(this.validarAccionesProteccion, () => {
        CON851("", "Maltrato guardado", null, "success", "Correcto");
        this.validarSignoAbusoSexual();
      });
    },
    validarSignoAbusoSexual() {
      validarInputs(
        {
          form: "#validarSignoAbusoSexual",
          orden: "1",
        },
        () => {
          this.validarAccionesProteccion();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex =
            this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex == "S") {
            this.validarSangradoViolencia();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_abusex = {
              abusex: "N",
              abusex_sang: "",
              abusex_relat: "",
              abusex_vener: "",
              abusex_traum: "",
              abusex_semen: "",
              abusex_activi: "",
              abusex_clamid: "",
              abusex_condil: "",
              abusex_cuerpo: "",
              abusex_comport: "",
              abusex_dolor: "",
              abusex_temor: "",
            };

            this.DETALLE_HISTORIA.aiepi9501.var_maltrato.abuso_sex_grave = "";
            this.DETALLE_HISTORIA.aiepi9501.var_maltrato.abuso_sex_sospe = "";

            this.validarSaludBucal();
          }
        }
      );
    },
    validarSangradoViolencia() {
      validarInputs(
        {
          form: "#validarSangradoViolencia",
          orden: "1",
        },
        () => {
          this.validarSignoAbusoSexual();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_sang =
            this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_sang.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarRelatoAbusoSex();
        }
      );
    },
    validarRelatoAbusoSex() {
      validarInputs(
        {
          form: "#validarRelatoAbusoSex",
          orden: "1",
        },
        () => {
          this.validarSangradoViolencia();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_relat =
            this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_relat.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarDiagnosEnferSex();
        }
      );
    },
    validarDiagnosEnferSex() {
      validarInputs(
        {
          form: "#validarDiagnosEnferSex",
          orden: "1",
        },
        () => {
          this.validarRelatoAbusoSex();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_vener =
            this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_vener.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarSignoTraumaGenital();
        }
      );
    },
    validarSignoTraumaGenital() {
      validarInputs(
        {
          form: "#validarSignoTraumaGenital",
          orden: "1",
        },
        () => this.validarDiagnosEnferSex(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_traum =
            this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_traum.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarSemenCuerpo();
        }
      );
    },
    validarSemenCuerpo() {
      validarInputs(
        {
          form: "#validarSemenCuerpo",
          orden: "1",
        },
        () => this.validarSignoTraumaGenital(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_semen =
            this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_semen.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarExpresionesActSexuales();
        }
      );
    },
    validarExpresionesActSexuales() {
      validarInputs(
        {
          form: "#validarExpresionesActSexuales",
          orden: "1",
        },
        () => this.validarSemenCuerpo(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_activi =
            this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_activi.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarClamida();
        }
      );
    },
    validarClamida() {
      validarInputs(
        {
          form: "#validarClamida",
          orden: "1",
        },
        () => this.validarExpresionesActSexuales(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_clamid =
            this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_clamid.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarCondilomatosis();
        }
      );
    },
    validarCondilomatosis() {
      validarInputs(
        {
          form: "#validarCondilomatosis",
          orden: "1",
        },
        () => this.validarClamida(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_condil =
            this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_condil.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarCuerposExtranos();
        }
      );
    },
    validarCuerposExtranos() {
      validarInputs(
        {
          form: "#validarCuerposExtranos",
          orden: "1",
        },
        () => this.validarCondilomatosis(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_cuerpo =
            this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_cuerpo.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarComportamientoSexualizados();
        }
      );
    },
    validarComportamientoSexualizados() {
      validarInputs(
        {
          form: "#validarComportamientoSexualizados",
          orden: "1",
        },
        () => this.validarCuerposExtranos(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_comport =
            this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_comport.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarDolorAreaGenital();
        }
      );
    },
    validarDolorAreaGenital() {
      validarInputs(
        {
          form: "#validarDolorAreaGenital",
          orden: "1",
        },
        () => this.validarComportamientoSexualizados(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_dolor =
            this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_dolor.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarTemorAdultos();
        }
      );
    },
    validarTemorAdultos() {
      validarInputs(
        {
          form: "#validarTemorAdultos",
          orden: "1",
        },
        () => this.validarDolorAreaGenital(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_temor =
            this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_temor.toUpperCase().trim() != "S" ? "N" : "S";

          this.evaluarAbusoSexual();
        }
      );
    },
    evaluarAbusoSexual() {
      var ABU_SEX = this.DETALLE_HISTORIA.aiepi9501.signo_abusex;
      var SIG_MALTR = this.DETALLE_HISTORIA.aiepi9501.var_maltrato;

      if (
        ABU_SEX.abusex_sang == "S" ||
        ABU_SEX.abusex_traum == "S" ||
        ABU_SEX.abusex_semen == "S" ||
        ABU_SEX.abusex_vener == "S" ||
        ABU_SEX.abusex_activi == "S" ||
        ABU_SEX.abusex_relat == "S"
      ) {
        this.DETALLE_HISTORIA.aiepi9501.var_maltrato.abuso_sex_grave = "";
        CON851("CD", "CD", null, "warning", "Advertencia");
      } else if (
        ABU_SEX.abusex_clamid == "S" ||
        ABU_SEX.abusex_condil == "S" ||
        ABU_SEX.abusex_cuerpo == "S" ||
        ABU_SEX.abusex_dolor == "S" ||
        ABU_SEX.abusex_temor == "S" ||
        ABU_SEX.abusex_comport == "S" ||
        this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcalle == "S"
      ) {
        this.DETALLE_HISTORIA.aiepi9501.var_maltrato.abuso_sex_sospe = 1;
        CON851("CE", "CE", null, "warning", "Advertencia");
      } else if (SIG_MALTR.maltrato_grave == 0 && SIG_MALTR.maltrato_leve == 0 && SIG_MALTR.abandono == 0) {
        this.DETALLE_HISTORIA.aiepi9501.var_maltrato.maltrato_nohay = 0;
        CON851("CG", "CG", null, "success", "");
      }

      this.guardarDetalle9501(this.validarTemorAdultos, () => {
        CON851("", "Abuso sexual guardado", null, "success", "Correcto");
        this.validarSaludBucal();
      });
    },
    validarSaludBucal() {
      validarInputs(
        {
          form: "#validarSignoSaludBucal",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.maltra == "S") {
            if (this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex == "S") this.validarTemorAdultos();
            else this.validarSignoAbusoSexual();
          } else {
            this.validarSignoMaltrato();
          }
        },
        () => {
          this.datos_ext.evaluarSaludBucal = this.datos_ext.evaluarSaludBucal.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.datos_ext.evaluarSaludBucal == "S") {
            this.validarVisitaOdontologo();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc = {
              salbuc_odont: "",
              salbuc_cepil: "",
              salbuc_biber: "",
              salbuc_anteced: "",
              salbuc_trauma: "",
              salbuc_dolor: "",
              salbuc_color: "",
              salbuc_fractu: "",
              salbuc_movil: "",
              salbuc_perdida: "",
              salbuc_lesion: "",
              salbuc_caries: "",
              salbuc_mancha: "",
              salbuc_placa: "",
              salbuc_ulcera: "",
              salbuc_exudado: "",
              salbuc_edema: "",
              salbuc_inflam: "",
              salbuc_enroje: "",
              salbuc_gingiv: "",
              salbuc_abceso: "",
            };

            this.DETALLE_HISTORIA.aiepi9501.var_bucal = {
              celulit_faci: "",
              enfer_bucal: "",
              trauma_bucal: "",
              estomatitis: "",
              enfer_denta_gingi: "",
              enfer_bucal_riesg: "",
              enfer_bucal_leve: "",
            };

            this.evaluarAlimentos();
          }
        }
      );
    },
    validarVisitaOdontologo() {
      validarInputs(
        {
          form: "#validarVisitaOdontologo",
          orden: "1",
        },
        () => this.validarSaludBucal(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_odont =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_odont.toUpperCase().trim();

          switch (this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_odont) {
            case "S":
            case "N":
            case "I":
              this.validarCepillaDientes();
              break;
            default:
              this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_odont = "N";
              this.validarCepillaDientes();
              break;
          }
        }
      );
    },
    validarCepillaDientes() {
      validarInputs(
        {
          form: "#validarCepillaDientes",
          orden: "1",
        },
        () => this.validarVisitaOdontologo(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_cepil =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_cepil.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarBiberonNoche();
        }
      );
    },
    validarBiberonNoche() {
      validarInputs(
        {
          form: "#validarBiberonNoche",
          orden: "1",
        },
        () => this.validarCepillaDientes(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_biber =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_biber.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarAnteceden_dental();
        }
      );
    },
    validarAnteceden_dental() {
      validarInputs(
        {
          form: "#validarAnteceden_dental",
          orden: "1",
        },
        () => this.validarBiberonNoche(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_anteced =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_anteced.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarGolpeCara();
        }
      );
    },
    validarGolpeCara() {
      validarInputs(
        {
          form: "#validarGolpeCara",
          orden: "1",
        },
        () => this.validarAnteceden_dental(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_trauma =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_trauma.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarDolorDental();
        }
      );
    },
    validarDolorDental() {
      validarInputs(
        {
          form: "#validarDolorDental",
          orden: "1",
        },
        () => this.validarGolpeCara(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_dolor =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_dolor.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarCambioColorDiente();
        }
      );
    },
    validarCambioColorDiente() {
      validarInputs(
        {
          form: "#validarCambioColorDiente",
          orden: "1",
        },
        () => this.validarDolorDental(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_color =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_color.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarFracturaDiente();
        }
      );
    },
    validarFracturaDiente() {
      validarInputs(
        {
          form: "#validarFracturaDiente",
          orden: "1",
        },
        () => this.validarCambioColorDiente(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_fractu =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_fractu.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarMovilidadDiente();
        }
      );
    },
    validarMovilidadDiente() {
      validarInputs(
        {
          form: "#validarMovilidadDiente",
          orden: "1",
        },
        () => this.validarFracturaDiente(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_movil =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_movil.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarPerdidaDiente();
        }
      );
    },
    validarPerdidaDiente() {
      validarInputs(
        {
          form: "#validarPerdidaDiente",
          orden: "1",
        },
        () => this.validarMovilidadDiente(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_perdida =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_perdida.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarLesionEncia();
        }
      );
    },
    validarLesionEncia() {
      validarInputs(
        {
          form: "#validarLesionEncia",
          orden: "1",
        },
        () => this.validarPerdidaDiente(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_lesion =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_lesion.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarCariesCavita();
        }
      );
    },
    validarCariesCavita() {
      validarInputs(
        {
          form: "#validarCariesCavita",
          orden: "1",
        },
        () => this.validarLesionEncia(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_caries =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_caries.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarManchaDiente();
        }
      );
    },
    validarManchaDiente() {
      validarInputs(
        {
          form: "#validarManchaDiente",
          orden: "1",
        },
        () => this.validarCariesCavita(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_mancha =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_mancha.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarPlacaBacteriana();
        }
      );
    },
    validarPlacaBacteriana() {
      validarInputs(
        {
          form: "#validarPlacaBacteriana",
          orden: "1",
        },
        () => this.validarManchaDiente(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_placa =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_placa.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarVesiculaDental();
        }
      );
    },
    validarVesiculaDental() {
      validarInputs(
        {
          form: "#validarVesiculaDental",
          orden: "1",
        },
        () => this.validarPlacaBacteriana(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_ulcera =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_ulcera.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarExudadoPurulento();
        }
      );
    },
    validarExudadoPurulento() {
      validarInputs(
        {
          form: "#validarExudadoPurulento",
          orden: "1",
        },
        () => this.validarVesiculaDental(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_exudado =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_exudado.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarEdemaFacial();
        }
      );
    },
    validarEdemaFacial() {
      validarInputs(
        {
          form: "#validarEdemaFacial",
          orden: "1",
        },
        () => this.validarExudadoPurulento(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_edema =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_edema.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarInflamacionLabio();
        }
      );
    },
    validarInflamacionLabio() {
      validarInputs(
        {
          form: "#validarInflamacionLabio",
          orden: "1",
        },
        () => this.validarEdemaFacial(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_inflam =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_inflam.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarEnrojoEncia();
        }
      );
    },
    validarEnrojoEncia() {
      validarInputs(
        {
          form: "#validarEnrojoEncia",
          orden: "1",
        },
        () => this.validarInflamacionLabio(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_enroje =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_enroje.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarGingivitis();
        }
      );
    },
    validarGingivitis() {
      validarInputs(
        {
          form: "#validarGingivitis",
          orden: "1",
        },
        () => this.validarEnrojoEncia(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_gingiv =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_gingiv.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarAbsceso();
        }
      );
    },
    validarAbsceso() {
      validarInputs(
        {
          form: "#validarAbsceso",
          orden: "1",
        },
        () => this.validarGingivitis(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_abceso =
            this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_abceso.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarEnfermedadBucal();
        }
      );
    },
    validarEnfermedadBucal() {
      var SAL_BUCAL = this.DETALLE_HISTORIA.aiepi9501.signo_salbuc;

      this.DETALLE_HISTORIA.aiepi9501.var_bucal = {
        celulit_faci: 0,
        enfer_bucal: 0,
        trauma_bucal: 0,
        estomatitis: 0,
        enfer_denta_gingi: 0,
        enfer_bucal_riesg: 0,
        enfer_bucal_leve: 0,
      };

      var contar_w = 0;

      if (SAL_BUCAL.salbuc_color == "S") contar_w = 1;
      if (SAL_BUCAL.salbuc_fractu == "S") contar_w = contar_w + 1;
      if (SAL_BUCAL.salbuc_movil == "S") contar_w = contar_w + 1;
      if (SAL_BUCAL.salbuc_perdida == "S") contar_w = contar_w + 1;
      if (SAL_BUCAL.salbuc_lesion == "S") contar_w = contar_w + 1;

      if (SAL_BUCAL.salbuc_edema == "S") {
        this.DETALLE_HISTORIA.aiepi9501.var_bucal.celulit_faci = 1;
        CON851("E7", "E7", null, "warning", "Advertencia");
      } else if (
        SAL_BUCAL.salbuc_inflam == "S" ||
        SAL_BUCAL.salbuc_abceso == "S" ||
        SAL_BUCAL.salbuc_exudado == "S" ||
        SAL_BUCAL.salbuc_caries == "S" ||
        SAL_BUCAL.salbuc_dolor == "S"
      ) {
        this.DETALLE_HISTORIA.aiepi9501.var_bucal.enfer_bucal = 1;
        CON851("E8", "E8", null, "warning", "Advertencia");
      } else if (SAL_BUCAL.salbuc_trauma == "S" && contar_w > 0) {
        this.DETALLE_HISTORIA.aiepi9501.var_bucal.trauma_bucal = 1;
        CON851("E9", "E9", null, "warning", "Advertencia");
      } else if (SAL_BUCAL.salbuc_ulcera == "S" || SAL_BUCAL.salbuc_enroje == "S") {
        this.DETALLE_HISTORIA.aiepi9501.var_bucal.estomatitis = 1;
        CON851("EA", "EA", null, "warning", "Advertencia");
      } else if (SAL_BUCAL.salbuc_gingiv == "S" || SAL_BUCAL.salbuc_mancha == "S") {
        this.DETALLE_HISTORIA.aiepi9501.var_bucal.enfer_denta_gingi = 1;
        CON851("EB", "EB", null, "warning", "Advertencia");
      } else if (
        SAL_BUCAL.salbuc_placa == "S" ||
        SAL_BUCAL.salbuc_cepil == "N" ||
        SAL_BUCAL.salbuc_odont == "N" ||
        SAL_BUCAL.salbuc_biber == "S" ||
        SAL_BUCAL.salbuc_anteced == "S"
      ) {
        this.DETALLE_HISTORIA.aiepi9501.var_bucal.enfer_bucal_riesg = 1;
        CON851("EC", "EC", null, "warning", "Advertencia");
      } else {
        this.DETALLE_HISTORIA.aiepi9501.var_bucal.enfer_bucal_leve = 1;
        CON851("ED", "ED", null, "warning", "Advertencia");
      }

      this.guardarDetalle9501(this.validarAbsceso, () => {
        CON851("", "Salud bucal guardado", null, "success", "Correcto");
        this.evaluarAlimentos();
      });
    },
    evaluarAlimentos() {
      if (this.global_AIEPI001.serv == "08") {
        this.validarEdadPrimerAlimento();
      } else {
        this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_edad == "00";

        this.DETALLE_HISTORIA.aiepi9501.nino_6meses = {
          rec_liqui: "",
          rec_leche_for: "",
          rec_leche_otr: "",
          rec_espeso: "",
        };

        this.llamadoHC_9010();
      }
    },
    validarEdadPrimerAlimento() {
      validarInputs(
        {
          form: "#validarEdadPrimerAlimento",
          orden: "1",
        },
        () => {
          if (this.datos_ext.evaluarSaludBucal == "S") this.validarAbsceso();
          else this.validarSaludBucal();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_edad = cerosIzq(
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_edad.trim(),
            2
          );

          if (parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_edad) < 25) {
            this.validarRecibioLiquidos_alimentos();
          } else {
            CON851("03", "03", null, "error", "Error");
            this.validarEdadPrimerAlimento();
          }
        }
      );
    },
    validarRecibioLiquidos_alimentos() {
      validarInputs(
        {
          form: "#validarRecibioLiquidos_alimentos",
          orden: "1",
        },
        () => this.validarEdadPrimerAlimento(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.nino_6meses.rec_liqui =
            this.DETALLE_HISTORIA.aiepi9501.nino_6meses.rec_liqui.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarRecibioLecheFormul_alimentos();
        }
      );
    },
    validarRecibioLecheFormul_alimentos() {
      validarInputs(
        {
          form: "#validarRecibioLecheFormul_alimentos",
          orden: "1",
        },
        () => this.validarRecibioLiquidos_alimentos(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.nino_6meses.rec_leche_for =
            this.DETALLE_HISTORIA.aiepi9501.nino_6meses.rec_leche_for.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarRecibioLecheOtr_alimentos();
        }
      );
    },
    validarRecibioLecheOtr_alimentos() {
      validarInputs(
        {
          form: "#validarRecibioLecheOtr_alimentos",
          orden: "1",
        },
        () => this.validarRecibioLecheFormul_alimentos(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.nino_6meses.rec_leche_otr =
            this.DETALLE_HISTORIA.aiepi9501.nino_6meses.rec_leche_otr.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarRecibioSopa_alimentos();
        }
      );
    },
    validarRecibioSopa_alimentos() {
      validarInputs(
        {
          form: "#validarRecibioSopa_alimentos",
          orden: "1",
        },
        () => this.validarRecibioLecheOtr_alimentos(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.nino_6meses.rec_espeso =
            this.DETALLE_HISTORIA.aiepi9501.nino_6meses.rec_espeso.toUpperCase().trim() != "S" ? "N" : "S";

          this.guardarDetalle9501(this.validarRecibioSopa_alimentos, () => {
            CON851("", "Alimentos guardados", null, "success", "Correcto");
            this.llamadoHC_9010();
          });
        }
      );
    },
    escHC_9010() {
      this.params_hc9010.estado = false;

      if (this.global_AIEPI001.serv == "08") this.validarRecibioSopa_alimentos();
      else if (this.datos_ext.evaluarSaludBucal == "S") this.validarAbsceso();
      else this.validarSaludBucal();
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
      if (this.global_AIEPI001.serv == "08") this.validarRecibioSopa_alimentos();
      else if (this.datos_ext.evaluarSaludBucal == "S") this.validarAbsceso();
      else this.validarSaludBucal();
    },
    llamadoHC_9011() {
      var valido = false;

      switch (this.global_AIEPI001.rips.finalidad) {
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

      if (this.global_AIEPI001.serv == "08" && valido) {
        this.mostrarHC9011 = true;
        setTimeout(() => (this.params_hc9011.estado = true), 300);
      } else {
        this.evaluarRecomendaciones();
      }
    },
    finHC_9011() {
      this.params_hc9011.estado = false;
      this.evaluarRecomendaciones();
    },
    evaluarRecomendaciones() {
      var RESPI = this.DETALLE_HISTORIA.aiepi9501.var_resp;
      var DIARR = this.DETALLE_HISTORIA.aiepi9501.var_diarr;

      var unidad_edad = this.global_AIEPI001.edad.substring(0, 1);
      var edad = parseInt(this.global_AIEPI001.edad.substring(1, 4));

      if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volinme.trim() == "") {
        var mensaje_1 = "";

        mensaje_1 = "Cuando no puede beber ni tomar pecho, vomita todo, empeora o no se ve bien, aparece fiebre";

        if (
          RESPI.neumo_leve == 1 ||
          RESPI.crup_leve == 1 ||
          RESPI.bronquiolitis_leve == 1 ||
          RESPI.sibilancia_leve == 1 ||
          RESPI.resfriado == 1
        ) {
          mensaje_1 += "\n Si presenta respiración rápida o dificultad para respirar";
        }

        if (
          DIARR.diarre_deshi == 1 ||
          DIARR.diarre_riesg == 1 ||
          DIARR.diarre_leve == 1 ||
          DIARR.diarre_pers_leve == 1 ||
          DIARR.disenteria == 1
        ) {
          mensaje_1 += "\n Sangre en heces, heces líquidas y abundantes mas de 10 en 24 horas";
        }

        this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volinme = mensaje_1;
      }

      if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volcontr.trim() == "") {
        if (RESPI.resfriado == 1) {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volcontr = "Sin mejora en 5 dias";
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.refconsul = "Medicina general";
        } else if (
          RESPI.bronquiolitis_leve == 1 ||
          RESPI.sibilancia_leve == 1 ||
          DIARR.diarre_deshi == 1 ||
          DIARR.diarre_riesg == 1 ||
          DIARR.diarre_leve == 1 ||
          DIARR.diarre_pers_leve == 1 ||
          DIARR.disenteria == 1 ||
          RESPI.neumo_leve == 1
        ) {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volcontr = "Dentro de 2 dias";
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.refconsul = "Medicina general";
        }
      }

      if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volsano.trim() == "") {
        if (unidad_edad == "D" || unidad_edad == "M") {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volsano = "En 3 meses";
        } else if (edad == 1) {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volsano = "En 4 meses";
        } else {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volsano = "En 6 meses";
        }
      }

      if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.medprev.trim() == "") {
        var mensaje_2 = "";

        if (this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosres == "S") {
          mensaje_2 +=
            "Evitar contacto con fumadores, personas con gripa, tapar boca y nariz al cambio de temperatura \n lavado de manos siempre, evitar tocarse ojos, nariz y boca, enseñar a toser, cuidar niño enfermo en casa, ventilar adecuadamente a diario la casa y habitación del niño, vacunación completa";
        } else if (this.DETALLE_HISTORIA.aiepi9501.signo_diare.diarre == "S") {
          if (parseInt(this.global_AIEPI001.edad_dias) < 181) {
            mensaje_2 += "Debe ser amamantado exclusivamente\n";
          } else {
            mensaje_2 += "Alimentos nutritivos y prácticas higiénicas cuando se preparan\n";
          }

          mensaje_2 +=
            "Recoger agua de la fuente mas limpia, almacenarla en recipientes limpias, hervirla.\n Lavado de manos siempre, inocuidad de los alimentos, uso de letrinas, vacuna contra rotavirus";
        } else {
          mensaje_2 += "18 prácticas de vida saludable, ";

          if (parseInt(this.global_AIEPI001.edad_dias) < 181) {
            mensaje_2 += "lactancia materna exclusiva";
          } else {
            mensaje_2 += "lactancia materna complementaria, dar alimentos ricos en zinc, hierro, vitamina A";
          }
        }

        this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.medprev = mensaje_2;
      }

      if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.recomtrato.trim() == "") {
        this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.recomtrato =
          "Establezca reglas claras, aplique siempre las mismas reglas, no castigue al niño dos veces por la misma falta, escuche los motivos del niño antes de reprenderlo, cuando un hijo comete una falta explíquele por qué lo que hizo estuvo mal, jamás le diga a un hijo que es tonto o bruto";
      }

      this.validarRecomendacionesAlarma();
    },
    validarRecomendacionesAlarma() {
      validarInputs(
        {
          form: "#validarRecomendacionesAlarma",
          orden: "1",
        },
        () => {
          if (this.global_AIEPI001.serv == "08") {
            this.validarRecibioSopa_alimentos();
          } else if (this.datos_ext.evaluarSaludBucal == "S") {
            this.validarAbsceso();
          } else {
            this.validarSaludBucal();
          }
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volinme =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volinme.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");

          this.validarVolverConsultaControl();
        }
      );
    },
    validarVolverConsultaControl() {
      validarInputs(
        {
          form: "#validarVolverConsultaControl",
          orden: "1",
        },
        () => this.validarRecomendacionesAlarma(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volcontr =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volcontr.toUpperCase().trim();

          this.validarVolverConsultaSano();
        }
      );
    },
    validarVolverConsultaSano() {
      validarInputs(
        {
          form: "#validarVolverConsultaSano",
          orden: "1",
        },
        () => this.validarVolverConsultaControl(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volsano =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volsano.toUpperCase().trim();

          this.validarReferidoConsulta();
        }
      );
    },
    validarReferidoConsulta() {
      validarInputs(
        {
          form: "#validarReferidoConsulta",
          orden: "1",
        },
        () => this.validarVolverConsultaSano(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.refconsul =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.refconsul.toUpperCase().trim();

          this.validarMedidasPreventivas();
        }
      );
    },
    validarMedidasPreventivas() {
      validarInputs(
        {
          form: "#validarMedidasPreventivas",
          orden: "1",
        },
        () => this.validarReferidoConsulta(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.medprev =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.medprev.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");

          this.validarRecomendacionesBuenTrato();
        }
      );
    },
    validarRecomendacionesBuenTrato() {
      validarInputs(
        {
          form: "#validarRecomendacionesBuenTrato",
          orden: "1",
        },
        () => this.validarMedidasPreventivas(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.recomtrato =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.recomtrato.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");

          this.validarVitamina_A();
        }
      );
    },
    validarVitamina_A() {
      validarInputs(
        {
          form: "#validarVitamina_A",
          orden: "1",
        },
        () => this.validarRecomendacionesBuenTrato(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.vitaminaA =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.vitaminaA.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.vitaminaA == "S") {
            this.validarProximaVitamina_A();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.prox_vit_A = "";
            this.validarAlbendazol();
          }
        }
      );
    },
    validarProximaVitamina_A() {
      validarInputs(
        {
          form: "#validarProximaVitamina_A",
          orden: "1",
        },
        () => this.validarVitamina_A(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.prox_vit_A =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.prox_vit_A.toUpperCase().trim();

          this.validarAlbendazol();
        }
      );
    },
    validarAlbendazol() {
      validarInputs(
        {
          form: "#validarAlbendazol",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.vitaminaA == "S") this.validarProximaVitamina_A();
          else this.validarVitamina_A();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.albendazol =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.albendazol.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarHierro();
        }
      );
    },
    validarHierro() {
      validarInputs(
        {
          form: "#validarHierro",
          orden: "1",
        },
        () => this.validarAlbendazol(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.hierro =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.hierro.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.hierro == "S") {
            this.validarHierroCuando();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.cuando_hier = "";
            this.guardarDetalle9501(this.validarHierro, () => {
              CON851("", "Recomendaciones guardadas", null, "success", "Correcto");
              this.preguntaAutismo();
            });
          }
        }
      );
    },
    validarHierroCuando() {
      validarInputs(
        {
          form: "#validarHierroCuando",
          orden: "1",
        },
        () => this.validarHierro(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.cuando_hier =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.cuando_hier.toUpperCase().trim();

          this.guardarDetalle9501(this.validarHierroCuando, () => {
            CON851("", "Recomendaciones guardadas", null, "success", "Correcto");
            this.preguntaAutismo();
          });
        }
      );
    },
    preguntaAutismo() {
      var _this = this;

      if (this.global_AIEPI001.serv == "01") {
        this.validarCod_diagnosticos(0);
      } else {
        CON851P("Desea evaluar autismo ?", () => _this.validarCod_diagnosticos(0), _this.abrirAutismo);
      }
    },

    abrirAutismo() {
      this.mostrarAutismo = true;
      setTimeout(() => (this.params_hc9007.estado = 1), 300);
    },
    validarEsc_autismo() {
      this.params_hc9007.estado = 0;

      if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.hierro == "S") this.validarHierroCuando();
      else this.validarHierro();
    },
    validarCallback_autismo(datos) {
      console.log(datos);
      this.DETALLE_HISTORIA.autismo = datos;
      this.params_hc9007.estado = 0;

      var _this = this;

      grabarDetalles({ 9007: this.DETALLE_HISTORIA.autismo }, $_REG_HC.llave_hc)
        .then(() => {
          CON851("", "Autismo guardado", null, "success", "Correcto");
          _this.validarCod_diagnosticos(0);
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error guardando Autismo", null, "error", "Error");
          _this.abrirAutismo();
        });
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
          this.inputEnfer.nombre = "#CodDiag_" + pos + "_AIEPI001";
          break;
        case 2:
          this.inputEnfer.nombre = "#diagnosMuerte_AIEPI001";
          break;
      }
      _fin_validar_form();
      this.mostrarEnfermedades = true;
    },
    successVentanaEnfermedades(data) {
      this.mostrarEnfermedades = false;

      switch (this.inputEnfer.tipo) {
        case 1:
          this.global_AIEPI001.rips.tabla_diag[this.inputEnfer.pos].diagn = data.cod;
          this.validarCod_diagnosticos(this.inputEnfer.pos);
          break;
        case 2:
          this.global_AIEPI001.cierre.diag_muer = data.cod;
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
          form: "#validarCod_diag_" + pos + "_AIEPI001",
          orden: "1",
          event_f3: () => {
            if (this.global_AIEPI001.rips.tabla_diag[0].diagn.trim() == "") {
              CON851("02", "02", null, "error", "Error");
              this.validarCod_diagnosticos(pos);
            } else {
              this.consultarCodigoEnf(pos, 1, true);
            }
          },
        },
        () => {
          if (pos == 0) {
            if (this.mostrarAutismo) this.params_hc9007.estado = 2;
            else {
              if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.hierro == "S") this.validarHierroCuando();
              else this.validarHierro();
            }
          } else {
            this.validarCod_diagnosticos(pos - 1);
          }
        },
        () => {
          if (this.global_AIEPI001.rips.tabla_diag[pos].diagn.trim() == "") {
            if (pos == 0) {
              CON851("02", "02", null, "error", "Error");
              this.validarCod_diagnosticos(pos);
            } else {
              this.global_AIEPI001.rips.tabla_diag[pos].descrip = "";
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
          codigo_envio = this.global_AIEPI001.rips.tabla_diag[pos].diagn.toUpperCase().trim();
          this.$nextTick(function () {
            Vue.set(_this.global_AIEPI001.rips.tabla_diag[pos], "diagn", codigo_envio);
          });
          break;
        case 2:
          codigo_envio = this.global_AIEPI001.cierre.diag_muer;
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
          this.global_AIEPI001.rips.tabla_diag[pos].descrip = "ENFERMEDAD NO ENCONTRADA";
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
      this.global_AIEPI001.rips.tabla_diag[pos].descrip = enf.NOMBRE_ENF.replace(/\s\s+/g, " ");

      var NIT = $_USUA_GLOBAL[0].NIT.toString().trim();

      var primer_caracter = this.global_AIEPI001.rips.tabla_diag[pos].diagn.substring(0, 1);

      if (enf.SEXO_ENF.trim() != "" && enf.SEXO_ENF != this.datos_paciente.SEXO) {
        CON851("73", "73", null, "error", "Error");
        this.validarCod_diagnosticos(pos);
      } else if (
        primer_caracter == "Z" &&
        (this.global_AIEPI001.serv == "01" || this.global_AIEPI001.serv == "02") &&
        (NIT == "800037021" || NIT == "900077520")
      ) {
        CON851("03", "03", null, "error", "Error");
        this.validarCod_diagnosticos(pos);
      } else if (primer_caracter == "R" && NIT == "800037021") {
        CON851("03", "03", null, "error", "Error");
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
          codigo: this.global_AIEPI001.rips.tabla_diag[pos].diagn,
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
      this.global_AIEPI001.rips.tabla_diag = this.global_AIEPI001.rips.tabla_diag.filter((el) => el.diagn.trim());
      while (this.global_AIEPI001.rips.tabla_diag.length < 10) {
        this.global_AIEPI001.rips.tabla_diag.push({ nro: "", diagn: "", descrip: "" });
      }

      this.guardarHistoria(
        () => this.validarCod_diagnosticos(pos),
        () => {
          CON851("", "Diagnosticos guardados", null, "success", "Correcto");
          this.validarTratar();
        }
      );
    },
    validarTratar() {
      validarInputs(
        {
          form: "#validar_tratar",
          orden: "1",
        },
        () => this.validarCod_diagnosticos(0),
        () => {
          this.DETALLE_HISTORIA.Tratar = this.DETALLE_HISTORIA.Tratar.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");

          this.guardarTratar();
        }
      );
    },
    guardarTratar() {
      let _this = this;

      grabarDetallesText(this.DETALLE_HISTORIA.Tratar, $_REG_HC.llave_hc + "9503")
        .then(() => {
          CON851("", "Tratar guardado", null, "success", "Correcto");
          _this.llamadoBarthel();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error guardando Tratar", null, "error", "Error");
          _this.validarTratar();
        });
    },
    llamadoBarthel() {
      if (this.global_AIEPI001.serv == "09") {
        this.mostrarBarthel = true;
        setTimeout(() => (this.paramshc890b.estado = true), 300);
      } else this.llamadoSintomatico();
    },
    EscHc890B() {
      this.paramshc890b.estado = false;
      this.validarTratar();
    },
    FinHC890B() {
      this.paramshc890b.estado = false;
      this.llamadoSintomatico();
    },
    llamadoSintomatico() {
      this.params_hc890d.estado = true;
      this.params_hc890d.unserv = this.global_AIEPI001.serv;
      this.params_hc890d.finalidad = this.global_AIEPI001.rips.finalidad;
    },
    validarEsc_sintomatico() {
      this.params_hc890d.estado = false;
      if (this.global_AIEPI001.serv == "09") this.paramshc890b.estado = true;
      else this.validarTratar();
    },
    validarCallback_sintomatico(param) {
      this.params_hc890d.estado = false;
      this.sintomaticos = param;

      this.global_AIEPI001.signos.sintom_resp = this.sintomaticos.sintom_resp;
      this.global_AIEPI001.signos.sintom_piel = this.sintomaticos.sintom_piel;
      this.global_AIEPI001.signos.contacto_lepra = this.sintomaticos.contacto_lepra;
      this.global_AIEPI001.signos.victi_maltrato = this.sintomaticos.victi_maltrato;
      this.global_AIEPI001.signos.victi_violencia = this.sintomaticos.victi_violencia;
      this.global_AIEPI001.signos.enfer_mental = this.sintomaticos.enfer_mental;
      this.global_AIEPI001.signos.enfer_its = this.sintomaticos.enfer_its;
      this.global_AIEPI001.signos.cual_its = this.sintomaticos.cual_its;
      this.global_AIEPI001.signos.trata_its = this.sintomaticos.trata_its;
      this.global_AIEPI001.signos.cancer_seno = this.sintomaticos.cancer_seno;
      this.global_AIEPI001.signos.cancer_cervis = this.sintomaticos.cancer_cervis;
      this.global_AIEPI001.signos.edu_autoexa_seno = this.sintomaticos.edu_autoexa_seno;
      this.global_AIEPI001.signos.citologia_previa = this.sintomaticos.citologia_previa;
      this.global_AIEPI001.signos.fecha_cito_previa = this.sintomaticos.fecha_cito_previa;
      this.global_AIEPI001.signos.resul_cito_previa = this.sintomaticos.resul_cito_previa;
      this.global_AIEPI001.signos.fecha_ult_mamo = this.sintomaticos.fecha_ult_mamo;

      console.log(this.global_AIEPI001.signos);

      this.capturarCausaExterna();
    },
    capturarCausaExterna() {
      if (
        this.global_AIEPI001.serv == "08" &&
        parseInt(this.global_AIEPI001.rips.finalidad) >= 0 &&
        parseInt(this.global_AIEPI001.rips.finalidad) <= 9
      ) {
        this.global_AIEPI001.rips.causa = "15";

        this.capturarTipoDiagnostico();
      } else {
        var _this = this;

        setTimeout(() => {
          POPUP(
            {
              titulo: "Causa externa",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.causas_externas,
              callback_f: () => this.llamadoSintomatico(),
              seleccion: this.global_AIEPI001.rips.causa,
              teclaAlterna: true,
            },
            (data) => {
              _this.global_AIEPI001.rips.causa = data.COD;

              _this.capturarTipoDiagnostico();
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
                this.global_AIEPI001.serv == "08" &&
                parseInt(this.global_AIEPI001.rips.finalidad) >= 0 &&
                parseInt(this.global_AIEPI001.rips.finalidad) <= 9
              ) {
                this.validarTratar();
              } else {
                this.capturarCausaExterna();
              }
            },
            seleccion: this.global_AIEPI001.rips.tipo_diag,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_AIEPI001.rips.tipo_diag = data.COD;

            if (_this.global_AIEPI001.rips.finalidad == "11") {
              _this.validarDatoCronico();
            } else if (_this.global_AIEPI001.rips.finalidad == "08") {
              _this.global_AIEPI001.rips.cronico = "";
              _this.textos.descrip_pato_cronica = "";
              _this.global_AIEPI001.rips.primera_vez = "";
              _this.evaluarEstadoSalida();
            } else {
              _this.global_AIEPI001.rips.cronico = "";
              _this.textos.descrip_pato_cronica = "";
              _this.validarPrimeraVez();
            }
          }
        );
      }, 300);
    },
    ventanaPatologias() {
      var _this = this;

      _ventanaDatos({
        titulo: "Ventana patologías crónicas",
        columnas: ["COD", "DESCRIP"],
        data: this.patologias_cronicas,
        ancho: "60%",
        callback_esc: () => {
          document.getElementById("codPatologia_AIEPI001").focus();
        },
        callback: (data) => {
          _this.global_AIEPI001.rips.cronico = data.COD;
          setTimeout(() => _enterInput("#codPatologia_AIEPI001"), 100);
        },
      });
    },
    validarDatoCronico() {
      validarInputs(
        {
          form: "#validarPatologiaCronica",
          orden: "1",
        },
        () => this.capturarTipoDiagnostico(),
        () => {
          this.textos.descrip_pato_cronica = "";

          if (this.global_AIEPI001.rips.cronico.trim() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarDatoCronico();
          } else {
            this.global_AIEPI001.rips.cronico = cerosIzq(this.global_AIEPI001.rips.cronico, 3);

            var busqueda = this.patologias_cronicas.find((x) => x.COD == this.global_AIEPI001.rips.cronico);

            if (busqueda) {
              this.textos.descrip_pato_cronica = busqueda.DESCRIP.trim();
              this.validarPrimeraVez();
            } else {
              CON851("01", "01", null, "error", "Error");
              this.validarDatoCronico();
            }
          }
        }
      );
    },
    validarPrimeraVez() {
      validarInputs(
        {
          form: "#validarPrimeraVez",
          orden: "1",
        },
        () => {
          if (this.global_AIEPI001.rips.finalidad == "11") this.validarDatoCronico();
          else this.capturarTipoDiagnostico();
        },
        () => {
          this.global_AIEPI001.rips.primera_vez =
            this.global_AIEPI001.rips.primera_vez.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.global_AIEPI001.rips.primera_vez == "S") this.evaluarEstadoSalida();
          else this.validarDiaPrimeraVez();
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
          this.global_AIEPI001.rips.dia_primera_vez = cerosIzq(this.global_AIEPI001.rips.dia_primera_vez, 2);

          if (parseInt(this.global_AIEPI001.rips.dia_primera_vez) == 0) {
            this.global_AIEPI001.rips.mes_primera_vez = "00";
            this.global_AIEPI001.rips.ano_primera_vez = "0000";
            this.evaluarEstadoSalida();
          } else if (parseInt(this.global_AIEPI001.rips.dia_primera_vez) > 31) {
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
          this.global_AIEPI001.rips.mes_primera_vez = cerosIzq(this.global_AIEPI001.rips.mes_primera_vez, 2);

          if (
            parseInt(this.global_AIEPI001.rips.mes_primera_vez) > 12 ||
            parseInt(this.global_AIEPI001.rips.mes_primera_vez) == 0
          ) {
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
          this.global_AIEPI001.rips.ano_primera_vez = cerosIzq(this.global_AIEPI001.rips.ano_primera_vez, 4);

          var fecha_rips =
            this.global_AIEPI001.rips.ano_primera_vez +
            this.global_AIEPI001.rips.mes_primera_vez +
            this.global_AIEPI001.rips.dia_primera_vez;
          console.log(fecha_rips);

          if (parseInt(this.global_AIEPI001.rips.ano_primera_vez) == 0) {
            CON851("37", "37", null, "error", "Error");
            this.validarAnoPrimeraVez();
          } else if (parseInt(this.global_AIEPI001.fecha) < parseInt(fecha_rips)) {
            CON851("37", "Fecha mayor a historia !", null, "error", "Error");
            this.validarAnoPrimeraVez();
          } else {
            this.evaluarEstadoSalida();
          }
        }
      );
    },
    evaluarEstadoSalida() {
      var _this = this;

      if (this.global_AIEPI001.serv == "01") {
        this.global_AIEPI001.rips.estado_sal = "";
        this.validarObservacionRips();
      } else {
        setTimeout(() => {
          POPUP(
            {
              titulo: "Estado de salida",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.estadoSalidaRips,
              callback_f: () => {
                if (this.global_AIEPI001.rips.finalidad == "08") {
                  this.capturarTipoDiagnostico();
                } else {
                  this.validarPrimeraVez();
                }
              },
              seleccion: this.global_AIEPI001.rips.estado_sal,
              teclaAlterna: true,
            },
            (data) => {
              _this.global_AIEPI001.rips.estado_sal = data.COD;

              switch (_this.global_AIEPI001.rips.estado_sal) {
                case "2":
                  this.validarDiagnosticoMuerte();
                  break;
                case "3":
                  this.validarRemitido();
                  break;
                case "6":
                  if (this.global_AIEPI001.rips.tabla_diag[0].diagn == "Z538") this.validarObservacionRips();
                  else this.evaluarEstadoSalida();
                  break;
                default:
                  this.validarObservacionRips();
                  break;
              }
            }
          );
        }, 300);
      }
    },
    validarDiagnosticoMuerte() {
      validarInputs(
        {
          form: "#validarDiagMuerte",
          orden: "1",
        },
        () => this.evaluarEstadoSalida(),
        () => {
          this.global_AIEPI001.cierre.diag_muer = this.global_AIEPI001.cierre.diag_muer.toUpperCase().trim();

          this.consultarCodigoEnf(null, 2);
        }
      );
    },
    validarDiagMuerte(enf) {
      this.textos.diagnostico_muerte = enf.NOMBRE_ENF.replace(/\s\s+/g, " ");

      if (enf.SEXO_ENF.trim() != "" && enf.SEXO_ENF != this.datos_paciente.SEXO) {
        CON851("73", "73", null, "error", "Error");
        this.validarDiagnosticoMuerte();
      } else this.validarObservacionRips();
    },
    validarRemitido() {
      validarInputs(
        {
          form: "#validarRemitido",
          orden: "1",
        },
        () => this.evaluarEstadoSalida(),
        () => {
          if (this.global_AIEPI001.rips.remitido.trim() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarRemitido();
          } else this.validarObservacionRips();
        }
      );
    },
    validarObservacionRips() {
      if (this.global_AIEPI001.serv == "01") {
        validarInputs(
          {
            form: "#validarObservacionRips",
            orden: "1",
          },
          () => {
            switch (this.global_AIEPI001.rips.estado_sal) {
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
            this.global_AIEPI001.rips.observ = this.global_AIEPI001.rips.observ.toUpperCase().trim() != "S" ? "N" : "S";

            this.validarTriage();
          }
        );
      } else {
        this.global_AIEPI001.rips.triage = "0";
        this.global_AIEPI001.rips.observ = "";
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
          switch (this.global_AIEPI001.rips.triage) {
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
            if (this.global_AIEPI001.serv == "01") {
              this.validarTriage();
            } else {
              switch (_this.global_AIEPI001.rips.estado_sal) {
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
          _this.grabado_AIEPI001
        );
      }, 300);
    },
    grabado_AIEPI001() {
      var data = {};

      data["datosh"] =
        datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|" + this.global_AIEPI001.novedad + "|";

      data["datos_basicos"] =
        this.global_AIEPI001.fecha +
        "|" +
        this.global_AIEPI001.hora +
        "|" +
        this.global_AIEPI001.med +
        "|" +
        this.global_AIEPI001.serv +
        "|" +
        this.global_AIEPI001.edad +
        "|" +
        this.global_AIEPI001.edad_dias +
        "|";

      data["procedencia"] = this.global_AIEPI001.proceden.trim();
      data["acompañante"] = this.global_AIEPI001.acompa.trim();
      data["parentesco"] = this.global_AIEPI001.parent_acompa.trim();
      data["motivo_consulta"] = this.global_AIEPI001.motivo.replace(/(\r\n|\n|\r)/gm, "&").trim();

      data["signos_nacer"] =
        this.global_AIEPI001.signos.peso_nacer +
        "|" +
        this.global_AIEPI001.signos.talla_nacer +
        "|" +
        this.global_AIEPI001.signos.edad_gestacional +
        "|" +
        this.datos_ext.grupo_sang +
        "|" +
        this.datos_ext.RH +
        "|" +
        this.global_AIEPI001.signos.tsh_nacer +
        "|";

      var posicion = 0;
      var contadorLin = 0;
      var contadorTotal = 0;
      var linea = "";
      var maximo = 90;

      if (this.global_AIEPI001.serv == "08") {
        var ant_perinata = this.DETALLE_HISTORIA.antec_perinatal.embarazo_deseado;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.patol_embarazo;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.patol_parto;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.patol_puerperio;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.lugar_nacimiento;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.apgar_1_min;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.apgar_5_min;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.apgar_10_min;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.atencion_perinatal;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.reanimacion;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.grupo_sang_madre;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.rh_madre;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.serologia_madre;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.lactan_materna;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.sano;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.hemorragias;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.infecciones;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.deforma_cong;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.hipoglicemia;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.apnea;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.ictericia;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.broncoasp;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.neurologia;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.memb_hialina;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.nro_hermanos;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.hermanos_muer;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.hermanos_vivos;
        ant_perinata += "|";
        ant_perinata += this.DETALLE_HISTORIA.antec_perinatal.patologias_familiares
          .replace(/(\r\n|\n|\r)/gm, "&")
          .trim();
        ant_perinata += "|";

        data["antec_perinata"] = ant_perinata;
      } else {
        var detalle_perintatal = JSON.parse(
          JSON.stringify(this.DETALLE_HISTORIA.antec_perinatal_text.replace(/(\r\n|\n|\r)/gm, "&"))
        );

        detalle_perintatal.split("").forEach((item, i) => {
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

          if (contadorLin == maximo || detalle_perintatal.length == contadorTotal) {
            posicion = posicion + 1;

            data["ANT_PERINATA-" + posicion.toString().padStart(3, "0")] = linea;
            contadorLin = 0;
            linea = "";
            maximo = 90;
          }
        });
      }

      data["otr_antecedentes"] =
        this.global_AIEPI001.esq_vacuna_completo + "|" + this.global_AIEPI001.salud_oral_ult_6mes + "|";

      var datos_covid = this.global_AIEPI001.covid19.fiebre_covid19;
      datos_covid += "|";
      datos_covid += this.global_AIEPI001.covid19.tos_covid19;
      datos_covid += "|";
      datos_covid += this.global_AIEPI001.covid19.disnea_covid19;
      datos_covid += "|";
      datos_covid += this.global_AIEPI001.covid19.malestar_covid19;
      datos_covid += "|";
      datos_covid += this.global_AIEPI001.covid19.rinorrea_covid19;
      datos_covid += "|";
      datos_covid += this.global_AIEPI001.covid19.odinofagia_covid19;
      datos_covid += "|";
      datos_covid += this.global_AIEPI001.covid19.viaje_covid19;
      datos_covid += "|";
      datos_covid += this.global_AIEPI001.covid19.contacto_covid19;
      datos_covid += "|";
      datos_covid += this.global_AIEPI001.covid19.personal_salud_covid19;
      datos_covid += "|";
      datos_covid += this.global_AIEPI001.covid19.viaje_dentro_covid19;
      datos_covid += "|";
      datos_covid += this.global_AIEPI001.covid19.lugar_dentro_covid19;
      datos_covid += "|";
      datos_covid += this.global_AIEPI001.covid19.tiempo_dentro_covid19;
      datos_covid += "|";
      datos_covid += this.global_AIEPI001.covid19.viaje_fuera_covid19;
      datos_covid += "|";
      datos_covid += this.global_AIEPI001.covid19.lugar_fuera_covid19;
      datos_covid += "|";
      datos_covid += this.global_AIEPI001.covid19.tiempo_fuera_covid19;
      datos_covid += "|";

      data["covid"] = datos_covid;

      var enfer_actual = JSON.parse(
        JSON.stringify(this.DETALLE_HISTORIA.Enfermedad_Actual.replace(/(\r\n|\n|\r)/gm, "&"))
      );

      posicion = 0;
      contadorLin = 0;
      contadorTotal = 0;
      linea = "";
      maximo = 90;

      enfer_actual.split("").forEach((item, i) => {
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

        if (contadorLin == maximo || enfer_actual.length == contadorTotal) {
          posicion = posicion + 1;

          data["ENFER_ACT-" + posicion.toString().padStart(3, "0")] = linea;
          contadorLin = 0;
          linea = "";
          maximo = 90;
        }
      });

      var signos = this.global_AIEPI001.signos.und_peso;
      signos += "|";
      signos += this.datos_ext.peso_KG;
      signos += "|";
      signos += this.global_AIEPI001.signos.talla;
      signos += "|";
      signos += this.global_AIEPI001.signos.imc;
      signos += "|";
      signos += this.global_AIEPI001.signos.sup;
      signos += "|";
      signos += this.global_AIEPI001.signos.temp;
      signos += "|";
      signos += this.global_AIEPI001.signos.fcard;
      signos += "|";
      signos += this.global_AIEPI001.signos.fresp;
      signos += "|";
      signos += this.global_AIEPI001.signos.tens1;
      signos += "|";
      signos += this.global_AIEPI001.signos.tens2;
      signos += "|";
      signos += this.global_AIEPI001.signos.tens_m;
      signos += "|";
      signos += this.global_AIEPI001.signos.per_cef;
      signos += "|";
      signos += this.global_AIEPI001.signos.per_tora;
      signos += "|";
      signos += this.global_AIEPI001.signos.per_abdo;
      signos += "|";
      signos += this.global_AIEPI001.signos.per_mune;
      signos += "|";
      signos += this.global_AIEPI001.signos.per_braq;
      signos += "|";
      signos += this.global_AIEPI001.signos.oximetria;
      signos += "|";

      data["signos_vitales"] = signos;

      var agud_visual = this.global_AIEPI001.examen_visual.agudeza_visual_oi_1;
      agud_visual += "|";
      agud_visual += this.global_AIEPI001.examen_visual.agudeza_visual_oi_2;
      agud_visual += "|";
      agud_visual += this.global_AIEPI001.examen_visual.agudeza_visual_od_1;
      agud_visual += "|";
      agud_visual += this.global_AIEPI001.examen_visual.agudeza_visual_od_2;
      agud_visual += "|";
      agud_visual += this.global_AIEPI001.examen_visual.distancia_agud;
      agud_visual += "|";

      data["agudeza_visual"] = agud_visual;

      var disca = this.global_AIEPI001.rips.discapacidades.fisica;
      disca += "|";
      disca += this.global_AIEPI001.rips.discapacidades.mental;
      disca += "|";
      disca += this.global_AIEPI001.rips.discapacidades.cognitiva;
      disca += "|";
      disca += this.global_AIEPI001.rips.discapacidades.auditiva;
      disca += "|";
      disca += this.global_AIEPI001.rips.discapacidades.visual;
      disca += "|";

      data["discapacidad"] = disca;

      ///// 9501

      var peligro = this.DETALLE_HISTORIA.aiepi9501.signo_peligro.peligr;
      peligro += "|";
      peligro += this.DETALLE_HISTORIA.aiepi9501.signo_peligro.tpecho;
      peligro += "|";
      peligro += this.DETALLE_HISTORIA.aiepi9501.signo_peligro.letarg;
      peligro += "|";
      peligro += this.DETALLE_HISTORIA.aiepi9501.signo_peligro.vomito;
      peligro += "|";
      peligro += this.DETALLE_HISTORIA.aiepi9501.signo_peligro.convul;
      peligro += "|";
      peligro += this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enf_observ;
      peligro += "|";

      data["peligro_general"] = peligro;

      data["enfer_peligro_general"] = this.DETALLE_HISTORIA.aiepi9501.enfer_grave.toString();

      var tos = this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosres;
      tos += "|";
      tos += this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosdia;
      tos += "|";
      tos += this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosapnea;
      tos += "|";
      tos += this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosgrip;
      tos += "|";
      tos += this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosest;
      tos += "|";
      tos += this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosibi;
      tos += "|";
      tos += this.DETALLE_HISTORIA.aiepi9501.signo_tos.tossib;
      tos += "|";
      tos += this.DETALLE_HISTORIA.aiepi9501.signo_tos.tostri;
      tos += "|";
      tos += this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosprem;
      tos += "|";
      tos += this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosomnol;
      tos += "|";
      tos += this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosbeber;
      tos += "|";
      tos += this.DETALLE_HISTORIA.aiepi9501.signo_tos.tos_observ;
      tos += "|";
      tos += this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosrap;
      tos += "|";

      data["dificultad_respirar"] = tos;

      var enfer_resp = this.DETALLE_HISTORIA.aiepi9501.var_resp.crup_grave.toString();
      enfer_resp += "|";
      enfer_resp += this.DETALLE_HISTORIA.aiepi9501.var_resp.bronquiolitis_grave.toString();
      enfer_resp += "|";
      enfer_resp += this.DETALLE_HISTORIA.aiepi9501.var_resp.sibilancia_grave.toString();
      enfer_resp += "|";
      enfer_resp += this.DETALLE_HISTORIA.aiepi9501.var_resp.sibilancia_leve.toString();
      enfer_resp += "|";
      enfer_resp += this.DETALLE_HISTORIA.aiepi9501.var_resp.bronquiolitis_leve.toString();
      enfer_resp += "|";
      enfer_resp += this.DETALLE_HISTORIA.aiepi9501.var_resp.crup_leve.toString();
      enfer_resp += "|";
      enfer_resp += this.DETALLE_HISTORIA.aiepi9501.var_resp.neumo_grave.toString();
      enfer_resp += "|";
      enfer_resp += this.DETALLE_HISTORIA.aiepi9501.var_resp.neumo_leve.toString();
      enfer_resp += "|";
      enfer_resp += this.DETALLE_HISTORIA.aiepi9501.var_resp.resfriado.toString();
      enfer_resp += "|";

      data["enfer_resp_v"] = enfer_resp;

      var diarrea = this.DETALLE_HISTORIA.aiepi9501.signo_diare.diarre;
      diarrea += "|";
      diarrea += this.DETALLE_HISTORIA.aiepi9501.signo_diare.diadia;
      diarrea += "|";
      diarrea += this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_cant_24h;
      diarrea += "|";
      diarrea += this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_cant_4h;
      diarrea += "|";
      diarrea += this.DETALLE_HISTORIA.aiepi9501.signo_diare.diasan;
      diarrea += "|";
      diarrea += this.DETALLE_HISTORIA.aiepi9501.signo_diare.diavom_cant;
      diarrea += "|";
      diarrea += this.DETALLE_HISTORIA.aiepi9501.signo_diare.diaojo;
      diarrea += "|";
      diarrea += this.DETALLE_HISTORIA.aiepi9501.signo_diare.dialet;
      diarrea += "|";
      diarrea += this.DETALLE_HISTORIA.aiepi9501.signo_diare.pliegu;
      diarrea += "|";
      diarrea += this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_alim;
      diarrea += "|";
      diarrea += this.DETALLE_HISTORIA.aiepi9501.signo_diare.bebsed;
      diarrea += "|";
      diarrea += this.DETALLE_HISTORIA.aiepi9501.signo_diare.dia_liqu;
      diarrea += "|";

      data["diarrea"] = diarrea;

      var enfer_diarr = this.DETALLE_HISTORIA.aiepi9501.var_diarr.diarre_pers_grave.toString();
      enfer_diarr += "|";
      enfer_diarr += this.DETALLE_HISTORIA.aiepi9501.var_diarr.diarre_pers_leve.toString();
      enfer_diarr += "|";
      enfer_diarr += this.DETALLE_HISTORIA.aiepi9501.var_diarr.diarre_grave.toString();
      enfer_diarr += "|";
      enfer_diarr += this.DETALLE_HISTORIA.aiepi9501.var_diarr.diarre_deshi.toString();
      enfer_diarr += "|";
      enfer_diarr += this.DETALLE_HISTORIA.aiepi9501.var_diarr.diarre_riesg.toString();
      enfer_diarr += "|";
      enfer_diarr += this.DETALLE_HISTORIA.aiepi9501.var_diarr.diarre_leve.toString();
      enfer_diarr += "|";
      enfer_diarr += this.DETALLE_HISTORIA.aiepi9501.var_diarr.disenteria.toString();
      enfer_diarr += "|";

      data["enfer_diarr_v"] = enfer_diarr;

      var fiebre = this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiebre;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiedia;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fietodia;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fierig;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieapari;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieasp;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiepie;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiesocial;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiesan;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieeru;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiedol;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiecef;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieocu;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiemial;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieastr;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiepost;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fietorn;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiehepa;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fielipo;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiecapi;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiepulso;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieascit;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiediure;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiemanif;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiegota;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieparc;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fie_tgo;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fietrombo;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieleucop;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiehemato;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieciano;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieneuro;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fieconvul;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiedeng;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiemalur;
      fiebre += "|";
      fiebre += this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiemalru;
      fiebre += "|";

      data["fiebre"] = fiebre;

      var enfer_fiebre = this.DETALLE_HISTORIA.aiepi9501.var_fiebre.febril_grave.toString();
      enfer_fiebre += "|";
      enfer_fiebre += this.DETALLE_HISTORIA.aiepi9501.var_fiebre.malaria_grave.toString();
      enfer_fiebre += "|";
      enfer_fiebre += this.DETALLE_HISTORIA.aiepi9501.var_fiebre.malaria_leve.toString();
      enfer_fiebre += "|";
      enfer_fiebre += this.DETALLE_HISTORIA.aiepi9501.var_fiebre.febril_inter.toString();
      enfer_fiebre += "|";
      enfer_fiebre += this.DETALLE_HISTORIA.aiepi9501.var_fiebre.febril_leve.toString();
      enfer_fiebre += "|";
      enfer_fiebre += this.DETALLE_HISTORIA.aiepi9501.var_fiebre.dengue_grave.toString();
      enfer_fiebre += "|";
      enfer_fiebre += this.DETALLE_HISTORIA.aiepi9501.var_fiebre.dengue_inter.toString();
      enfer_fiebre += "|";
      enfer_fiebre += this.DETALLE_HISTORIA.aiepi9501.var_fiebre.dengue_proba.toString();
      enfer_fiebre += "|";

      data["enfer_fiebre_v"] = enfer_fiebre;

      var oido = this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidopr;
      oido += "|";
      oido += this.DETALLE_HISTORIA.aiepi9501.signo_oido.oiddol;
      oido += "|";
      oido += this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidsup;
      oido += "|";
      oido += this.DETALLE_HISTORIA.aiepi9501.signo_oido.oiddia;
      oido += "|";
      oido += this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidtim;
      oido += "|";
      oido += this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidtac;
      oido += "|";
      oido += this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidnum;
      oido += "|";
      oido += this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidnum_12;
      oido += "|";

      data["oido"] = oido;

      var enfer_oido = this.DETALLE_HISTORIA.aiepi9501.var_oido.otitis_notiene.toString();
      enfer_oido += "|";
      enfer_oido += this.DETALLE_HISTORIA.aiepi9501.var_oido.mastoid_grave.toString();
      enfer_oido += "|";
      enfer_oido += this.DETALLE_HISTORIA.aiepi9501.var_oido.otitis_cronic.toString();
      enfer_oido += "|";
      enfer_oido += this.DETALLE_HISTORIA.aiepi9501.var_oido.otitis_recurr.toString();
      enfer_oido += "|";
      enfer_oido += this.DETALLE_HISTORIA.aiepi9501.var_oido.otitis_aguda.toString();
      enfer_oido += "|";

      data["enfer_oido_v"] = enfer_oido;

      var garganta = this.DETALLE_HISTORIA.aiepi9501.signo_gargan.gargan;
      garganta += "|";
      garganta += this.DETALLE_HISTORIA.aiepi9501.signo_gargan.gardol;
      garganta += "|";
      garganta += this.DETALLE_HISTORIA.aiepi9501.signo_gargan.garcue;
      garganta += "|";
      garganta += this.DETALLE_HISTORIA.aiepi9501.signo_gargan.garexu;
      garganta += "|";
      garganta += this.DETALLE_HISTORIA.aiepi9501.signo_gargan.garg_observ;
      garganta += "|";

      data["garganta"] = garganta;

      var enfer_gargan = this.DETALLE_HISTORIA.aiepi9501.var_garganta.faringo_bacte.toString();
      enfer_gargan += "|";
      enfer_gargan += this.DETALLE_HISTORIA.aiepi9501.var_garganta.faringo_viral.toString();
      enfer_gargan += "|";
      enfer_gargan += this.DETALLE_HISTORIA.aiepi9501.var_garganta.faringo_notiene.toString();
      enfer_gargan += "|";

      data["enfer_garganta_v"] = enfer_gargan;

      var rangos_estad = this.DETALLE_HISTORIA.aiepi9501.signo_desnut.peso_tal_estad;
      rangos_estad += "|";
      rangos_estad += this.DETALLE_HISTORIA.aiepi9501.signo_desnut.talla_ed_estad;
      rangos_estad += "|";
      rangos_estad += this.DETALLE_HISTORIA.aiepi9501.signo_desnut.pes_ed_estad;
      rangos_estad += "|";
      rangos_estad += this.global_AIEPI001.signos.imc_estad;
      rangos_estad += "|";
      rangos_estad += this.DETALLE_HISTORIA.aiepi9501.signo_desnut.per_cef_estad;
      rangos_estad += "|";

      data["estados_rangos"] = rangos_estad;

      var desarrollo = this.DETALLE_HISTORIA.aiepi9501.signo_desnut.desema;
      desarrollo += "|";
      desarrollo += this.DETALLE_HISTORIA.aiepi9501.signo_desnut.desede;
      desarrollo += "|";
      desarrollo += this.DETALLE_HISTORIA.aiepi9501.signo_desnut.destend;
      desarrollo += "|";
      desarrollo += this.DETALLE_HISTORIA.aiepi9501.signo_desnut.desnobs;
      desarrollo += "|";
      desarrollo += this.DETALLE_HISTORIA.aiepi9501.signo_desnut.despal;
      desarrollo += "|";
      desarrollo += this.DETALLE_HISTORIA.aiepi9501.signo_desnut.despalcon;
      desarrollo += "|";

      data["desarrollo"] = desarrollo;

      var vacunacion = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.bsghep;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.penta1;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop1;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.neumoc1;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_rotavir1;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.penta2;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop2;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.neumoc2;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_rotavir2;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.penta3;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop3;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.tripl1;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_varicela;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.neumoc3;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.fiebam;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vdptr1;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop4;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_influenza;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vdptr2;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop5;
      vacunacion += "|";
      vacunacion += this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.tripl2;
      vacunacion += "|";

      data["vacunacion"] = vacunacion;

      var examen_fisico = JSON.parse(
        JSON.stringify(this.DETALLE_HISTORIA.Examen_fisico.replace(/(\r\n|\n|\r)/gm, "&"))
      );

      posicion = 0;
      contadorLin = 0;
      contadorTotal = 0;
      linea = "";
      maximo = 90;

      examen_fisico.split("").forEach((item, i) => {
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

        if (contadorLin == maximo || examen_fisico.length == contadorTotal) {
          posicion = posicion + 1;

          data["EXA_FISICO-" + posicion.toString().padStart(3, "0")] = linea;
          contadorLin = 0;
          linea = "";
          maximo = 90;
        }
      });

      data["TAB_DIAG"] = "";

      this.global_AIEPI001.rips.tabla_diag.forEach((item) => {
        data.TAB_DIAG += item.diagn;
        data.TAB_DIAG += "|";
      });

      var tabla_tratar = JSON.parse(JSON.stringify(this.DETALLE_HISTORIA.Tratar.replace(/(\r\n|\n|\r)/gm, "&")));

      posicion = 0;
      contadorLin = 0;
      contadorTotal = 0;
      linea = "";
      maximo = 90;

      tabla_tratar.split("").forEach((item, i) => {
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

        if (contadorLin == maximo || tabla_tratar.length == contadorTotal) {
          posicion = posicion + 1;

          data["TRATAR-" + posicion.toString().padStart(3, "0")] = linea;
          contadorLin = 0;
          linea = "";
          maximo = 90;
        }
      });

      var signos_Maltrato = this.DETALLE_HISTORIA.aiepi9501.var_maltrato.maltrato_grave.toString();
      signos_Maltrato += "|";
      signos_Maltrato += this.DETALLE_HISTORIA.aiepi9501.var_maltrato.maltrato_leve.toString();
      signos_Maltrato += "|";
      signos_Maltrato += this.DETALLE_HISTORIA.aiepi9501.var_maltrato.abuso_sex_grave.toString();
      signos_Maltrato += "|";
      signos_Maltrato += this.DETALLE_HISTORIA.aiepi9501.var_maltrato.abuso_sex_sospe.toString();
      signos_Maltrato += "|";
      signos_Maltrato += this.DETALLE_HISTORIA.aiepi9501.var_maltrato.abandono.toString();
      signos_Maltrato += "|";
      signos_Maltrato += this.DETALLE_HISTORIA.aiepi9501.var_maltrato.maltrato_nohay.toString();
      signos_Maltrato += "|";

      data["signos_Maltrato"] = signos_Maltrato;

      var maltrato = this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.maltra;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malpro;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.maline;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcua;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.maldis;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malexp;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcor;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malalt;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcrian;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcon;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malhig;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcran;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malquem;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malfract;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcuta;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.maltrame;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malemoci;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malexprob;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malinade;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malautori;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malviolen;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malsalud;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malcalle;
      maltrato += "|";
      maltrato += this.DETALLE_HISTORIA.aiepi9501.signo_maltrato.malasiste;
      maltrato += "|";

      data["maltrato"] = maltrato;

      var abuso_sex = this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex;
      abuso_sex += "|";
      abuso_sex += this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_sang;
      abuso_sex += "|";
      abuso_sex += this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_relat;
      abuso_sex += "|";
      abuso_sex += this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_vener;
      abuso_sex += "|";
      abuso_sex += this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_traum;
      abuso_sex += "|";
      abuso_sex += this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_semen;
      abuso_sex += "|";
      abuso_sex += this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_activi;
      abuso_sex += "|";
      abuso_sex += this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_clamid;
      abuso_sex += "|";
      abuso_sex += this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_condil;
      abuso_sex += "|";
      abuso_sex += this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_cuerpo;
      abuso_sex += "|";
      abuso_sex += this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_comport;
      abuso_sex += "|";
      abuso_sex += this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_dolor;
      abuso_sex += "|";
      abuso_sex += this.DETALLE_HISTORIA.aiepi9501.signo_abusex.abusex_temor;
      abuso_sex += "|";

      data["abuso_sexual"] = abuso_sex;

      var signoSaludBucal = this.DETALLE_HISTORIA.aiepi9501.var_bucal.celulit_faci.toString();
      signoSaludBucal += "|";
      signoSaludBucal += this.DETALLE_HISTORIA.aiepi9501.var_bucal.enfer_bucal.toString();
      signoSaludBucal += "|";
      signoSaludBucal += this.DETALLE_HISTORIA.aiepi9501.var_bucal.trauma_bucal.toString();
      signoSaludBucal += "|";
      signoSaludBucal += this.DETALLE_HISTORIA.aiepi9501.var_bucal.estomatitis.toString();
      signoSaludBucal += "|";
      signoSaludBucal += this.DETALLE_HISTORIA.aiepi9501.var_bucal.enfer_denta_gingi.toString();
      signoSaludBucal += "|";
      signoSaludBucal += this.DETALLE_HISTORIA.aiepi9501.var_bucal.enfer_bucal_riesg.toString();
      signoSaludBucal += "|";
      signoSaludBucal += this.DETALLE_HISTORIA.aiepi9501.var_bucal.enfer_bucal_leve.toString();
      signoSaludBucal += "|";

      data["signo_salud_bucal"] = signoSaludBucal;

      var saludBucal = this.datos_ext.evaluarSaludBucal;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_odont;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_cepil;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_biber;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_anteced;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_trauma;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_dolor;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_color;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_fractu;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_movil;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_perdida;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_lesion;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_caries;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_mancha;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_placa;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_ulcera;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_exudado;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_edema;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_inflam;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_enroje;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_gingiv;
      saludBucal += "|";
      saludBucal += this.DETALLE_HISTORIA.aiepi9501.signo_salbuc.salbuc_abceso;
      saludBucal += "|";

      data["salud_bucal"] = saludBucal;

      if (this.global_AIEPI001.serv == "08") {
        var alimento = this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_edad;
        alimento += "|";
        alimento += this.DETALLE_HISTORIA.aiepi9501.nino_6meses.rec_liqui;
        alimento += "|";
        alimento += this.DETALLE_HISTORIA.aiepi9501.nino_6meses.rec_leche_for;
        alimento += "|";
        alimento += this.DETALLE_HISTORIA.aiepi9501.nino_6meses.rec_leche_otr;
        alimento += "|";
        alimento += this.DETALLE_HISTORIA.aiepi9501.nino_6meses.rec_espeso;
        alimento += "|";

        data["alimentos"] = alimento;
      }

      var signo_alim = this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volcontr;
      signo_alim += "|";
      signo_alim += this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volsano;
      signo_alim += "|";
      signo_alim += this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.refconsul;
      signo_alim += "|";
      signo_alim += this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.vitaminaA;
      signo_alim += "|";
      signo_alim += this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.prox_vit_A;
      signo_alim += "|";
      signo_alim += this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.albendazol;
      signo_alim += "|";
      signo_alim += this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.hierro;
      signo_alim += "|";
      signo_alim += this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.cuando_hier;
      signo_alim += "|";

      data["signo_alimentacion"] = signo_alim;

      data["recomendacion_alarma"] = this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volinme.replace(
        /(\r\n|\n|\r)/gm,
        "&"
      );
      data["recomendacion_preventiva"] = this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.medprev.replace(
        /(\r\n|\n|\r)/gm,
        "&"
      );
      data["recomendacion_trato"] = this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.recomtrato.replace(
        /(\r\n|\n|\r)/gm,
        "&"
      );

      var sintomas = this.global_AIEPI001.signos.sintom_resp;
      sintomas += "|";
      sintomas += this.global_AIEPI001.signos.sintom_piel;
      sintomas += "|";
      sintomas += this.global_AIEPI001.signos.contacto_lepra;
      sintomas += "|";
      sintomas += this.global_AIEPI001.signos.victi_maltrato;
      sintomas += "|";
      sintomas += this.global_AIEPI001.signos.victi_violencia;
      sintomas += "|";
      sintomas += this.global_AIEPI001.signos.enfer_mental;
      sintomas += "|";
      sintomas += this.global_AIEPI001.signos.enfer_its;
      sintomas += "|";
      sintomas += this.global_AIEPI001.signos.cual_its;
      sintomas += "|";
      sintomas += this.global_AIEPI001.signos.trata_its;
      sintomas += "|";
      sintomas += this.global_AIEPI001.signos.cancer_seno;
      sintomas += "|";
      sintomas += this.global_AIEPI001.signos.cancer_cervis;
      sintomas += "|";
      sintomas += this.global_AIEPI001.signos.edu_autoexa_seno;
      sintomas += "|";
      sintomas += this.global_AIEPI001.signos.citologia_previa;
      sintomas += "|";
      sintomas += this.global_AIEPI001.signos.fecha_cito_previa;
      sintomas += "|";
      sintomas += this.global_AIEPI001.signos.resul_cito_previa;
      sintomas += "|";
      sintomas += this.global_AIEPI001.signos.fecha_ult_mamo;
      sintomas += "|";

      data["sintomatico"] = sintomas;

      data["finalidad"] = this.global_AIEPI001.rips.finalidad;
      data["causa_externa"] = this.global_AIEPI001.rips.causa;
      data["tipo_diagnostico"] = this.global_AIEPI001.rips.tipo_diag;
      data["patologia_cronica"] = this.global_AIEPI001.rips.cronico;
      data["primera_vez"] = this.global_AIEPI001.rips.primera_vez;
      data["fecha_primera_vez"] =
        this.global_AIEPI001.rips.dia_primera_vez +
        "|" +
        this.global_AIEPI001.rips.mes_primera_vez +
        "|" +
        this.global_AIEPI001.rips.ano_primera_vez +
        "|";
      data["estado_salida"] = this.global_AIEPI001.rips.estado_sal;
      data["remitido"] = this.global_AIEPI001.rips.remitido;
      data["diag_muerte"] = this.global_AIEPI001.cierre.diag_muer;

      data["observ"] = this.global_AIEPI001.rips.observ;
      data["triage"] = this.global_AIEPI001.rips.triage;

      console.log(data);

      var _this = this;

      postData(data, get_url("APP/HICLIN/SAVE_AIEPI.DLL"))
        .then((data) => {
          console.log(data);
          CON851("", data, null, "success", "Correcto");
          _this.actualizarSisvan();
          // _this.validarTratar() solo para pare
        })
        .catch((error) => {
          console.log(error);
          CON851("", "Ha ocurrido un error", null, "error", "Error");
          _this.validarTratar();
        });
    },
    actualizarSisvan() {
      var _this = this;

      var data = {};

      data["datosh"] = datosEnvio() + $_REG_HC.id_paciente + "|";

      data["operador"] = localStorage.Usuario;
      data["fecha"] = this.global_AIEPI001.fecha;
      data["embarazo"] = "";
      data["tens_media"] = this.global_AIEPI001.signos.tens_m;

      data["edad_dias"] = this.global_AIEPI001.edad_dias;
      data["peso"] = this.global_AIEPI001.signos.peso;
      data["talla"] = this.global_AIEPI001.signos.talla;
      data["per_cef"] = this.global_AIEPI001.signos.per_cef;
      data["imc"] = this.global_AIEPI001.signos.imc;

      data["estad_peso"] = "0";
      data["estad_talla"] = "0";
      data["estad_peso_talla"] = "0";
      data["estad_per_cef"] = "0";
      data["estad_imc"] = this.global_AIEPI001.signos.imc_estad;
      data["finalidad"] = this.global_AIEPI001.rips.finalidad;

      this.global_AIEPI001.rips.tabla_diag.forEach((el, index) => {
        let index_label = (index + 1).toString().padStart(3, "0");
        data[`DIAGN_${index_label}`] = el.diagn || "";
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
          _this.validarTratar();
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
            datosEnvio() + this.global_AIEPI001.fecha + "|" + localStorage.IDUSU + "|" + this.datos_paciente.COD + "|",
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
      $_REG_HC.fecha_lnk = this.global_AIEPI001.fecha;
      $_REG_HC.hora_lnk = this.global_AIEPI001.hora;
      $_REG_HC.oper_lnk = localStorage.Usuario;
      $_REG_HC.opc_llamado = "1";
      $("#body_main").load("../../HICLIN/paginas/HC002F.html");
    },
    guardarHistoria(callbackErr, callback) {
      loader("show");
      var datos = _getObjetoHc(this.global_AIEPI001);
      console.log(datos);

      postData(datos, get_url("APP/HICLIN/SAVE_HC.DLL"))
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
    guardarDetalle9501(callbackErr, callback) {
      grabarDetalles(
        { 9501: _getObjetoSaveHc(this.DETALLE_HISTORIA.aiepi9501, filtroArray.tabla9501) },
        $_REG_HC.llave_hc
      )
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
      var edad_meses = parseInt(this.global_AIEPI001.edad_dias) / 30;
      var mult = parseInt(this.global_AIEPI001.signos.talla) * 10;

      var filtro_Rango = filtro == "PXT" ? mult : parseInt(edad_meses);

      var oms = this.TABLAS_OMS.find(
        (x) => x.CODIGO.trim() == filtro && x.SEXO == this.datos_paciente.SEXO && parseInt(x.RANGO) == filtro_Rango
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

      if (codigo != "PXT") {
        var fecha_Actual = moment();
        var fecha_Nacim = moment(this.datos_paciente.NACIM).format("YYYYMMDD");

        var edadMeses = fecha_Actual.diff(fecha_Nacim, "months");
        // var limite = (parseInt(edadMeses) + 1) < 24 ? parseInt(edadMeses) + 1 : 24
        var limite = parseInt(edadMeses) + 2;

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
              case "PXE":
                info_grafica.paci.push({ x: i, y: parseFloat(busqueda_sisvan.PESO) });
                break;
              case "IMC":
                info_grafica.paci.push({ x: i, y: parseFloat(busqueda_sisvan.IMC) });
                break;
              case "CEF":
                info_grafica.paci.push({ x: i, y: parseFloat(busqueda_sisvan.PER_CEF) });
                break;
            }
          }
        }
      } else {
        this.SISVAN.TABLA.forEach((element) => {
          if (parseInt(element.TALLA) > 0 && parseInt(element.PESO) > 0) {
            info_grafica.paci.push({ x: parseInt(element.TALLA), y: parseFloat(element.PESO) });
          }
        });

        for (var i = 450; i < 1340; i++) {
          var busqueda_oms_pxt = _this.TABLAS_OMS.find(
            (x) => x.CODIGO.trim() == codigo && x.SEXO == _this.datos_paciente.SEXO && parseInt(x.RANGO) == i
          );

          info_grafica.meses.push(i / 10);

          if (busqueda_oms_pxt) {
            info_grafica.oms_3.push({ x: i / 10, y: parseFloat(busqueda_oms_pxt.DATO_3) });
            info_grafica.oms_2.push({ x: i / 10, y: parseFloat(busqueda_oms_pxt.DATO_2) });
            info_grafica.oms_1.push({ x: i / 10, y: parseFloat(busqueda_oms_pxt.DATO_1) });
            info_grafica.oms_0.push({ x: i / 10, y: parseFloat(busqueda_oms_pxt.DATO_0) });
            info_grafica.oms_M1.push({ x: i / 10, y: parseFloat(busqueda_oms_pxt.DATO_M1) });
            info_grafica.oms_M2.push({ x: i / 10, y: parseFloat(busqueda_oms_pxt.DATO_M2) });
            info_grafica.oms_M3.push({ x: i / 10, y: parseFloat(busqueda_oms_pxt.DATO_M3) });
          } else if (!busqueda_oms_pxt && i > 1230) {
            i = 1340;
          }
        }
      }

      console.log(info_grafica);
      return info_grafica;
    },
    graficarTalla() {
      var $this = this;
      if (this.graficas.talla.graf) this.graficas.talla.graf.destroy();

      this.graficas.talla.graf = new Chart(document.getElementById("grafica_talla_AIEPI001").getContext("2d"), {
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
    graficarPesoEdad() {
      var $this = this;
      if (this.graficas.peso_edad.graf) this.graficas.peso_edad.graf.destroy();

      this.graficas.peso_edad.graf = new Chart(document.getElementById("grafica_peso_edad_AIEPI001").getContext("2d"), {
        type: "line",
        data: {
          labels: this.graficas.peso_edad.info.meses,
          datasets: [
            {
              fill: false,
              label: "Paciente",
              data: this.graficas.peso_edad.info.paci,
              backgroundColor: "rgb(15, 15, 15)",
              borderColor: "rgb(15, 15, 15)",
              borderWidth: 1,
              pointRadius: 2,
            },
            {
              fill: false,
              label: "+2",
              data: this.graficas.peso_edad.info.oms_2,
              backgroundColor: "rgb(173, 71, 71)",
              borderColor: "rgb(173, 71, 71)",
              borderWidth: 1,
              pointRadius: 0,
            },
            {
              fill: false,
              label: "+1",
              data: this.graficas.peso_edad.info.oms_1,
              backgroundColor: "rgba(255,165,0)",
              borderColor: "rgba(255,165,0)",
              borderWidth: 1,
              pointRadius: 0,
              borderDash: [10, 5],
            },
            {
              fill: false,
              label: "Normal",
              data: this.graficas.peso_edad.info.oms_0,
              backgroundColor: "rgb(37, 170, 79)",
              borderColor: "rgb(37, 170, 79)",
              borderWidth: 1,
              pointRadius: 0,
            },
            {
              fill: false,
              label: "-1",
              data: this.graficas.peso_edad.info.oms_M1,
              backgroundColor: "rgba(255,165,0)",
              borderColor: "rgba(255,165,0)",
              borderWidth: 1,
              pointRadius: 0,
              borderDash: [10, 5],
            },
            {
              fill: false,
              label: "-2",
              data: this.graficas.peso_edad.info.oms_M2,
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
              $this.graficasPDF.pesoXedad = this.toBase64Image();
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
                  labelString: "Peso en kg",
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
    graficarPesoTalla() {
      var $this = this;
      if (this.graficas.peso_talla.graf) this.graficas.peso_talla.graf.destroy();

      this.graficas.peso_talla.graf = new Chart(
        document.getElementById("grafica_peso_talla_AIEPI001").getContext("2d"),
        {
          type: "line",
          data: {
            labels: this.graficas.peso_talla.info.meses,
            datasets: [
              {
                fill: false,
                label: "Paciente",
                data: this.graficas.peso_talla.info.paci,
                backgroundColor: "rgb(15, 15, 15)",
                borderColor: "rgb(15, 15, 15)",
                borderWidth: 1,
                pointRadius: 2,
              },
              {
                fill: false,
                label: "+3",
                data: this.graficas.peso_talla.info.oms_3,
                backgroundColor: "rgb(173, 71, 71)",
                borderColor: "rgb(173, 71, 71)",
                borderWidth: 1,
                pointRadius: 0,
              },
              {
                fill: false,
                label: "+2",
                data: this.graficas.peso_talla.info.oms_2,
                backgroundColor: "rgb(173, 71, 71)",
                borderColor: "rgb(173, 71, 71)",
                borderWidth: 1,
                pointRadius: 0,
                borderDash: [10, 5],
              },
              {
                fill: false,
                label: "+1",
                data: this.graficas.peso_talla.info.oms_1,
                backgroundColor: "rgba(255,165,0)",
                borderColor: "rgba(255,165,0)",
                borderWidth: 1,
                pointRadius: 0,
              },
              {
                fill: false,
                label: "Normal",
                data: this.graficas.peso_talla.info.oms_0,
                backgroundColor: "rgb(37, 170, 79)",
                borderColor: "rgb(37, 170, 79)",
                borderWidth: 1,
                pointRadius: 0,
              },
              {
                fill: false,
                label: "-1",
                data: this.graficas.peso_talla.info.oms_M1,
                backgroundColor: "rgba(255,165,0)",
                borderColor: "rgba(255,165,0)",
                borderWidth: 1,
                pointRadius: 0,
              },
              {
                fill: false,
                label: "-2",
                data: this.graficas.peso_talla.info.oms_M2,
                backgroundColor: "rgb(173, 71, 71)",
                borderColor: "rgb(173, 71, 71)",
                borderWidth: 1,
                pointRadius: 0,
                borderDash: [10, 5],
              },
              {
                fill: false,
                label: "-3",
                data: this.graficas.peso_talla.info.oms_M3,
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
                $this.graficasPDF.pesoXtalla = this.toBase64Image();
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
                    labelString: "Peso en kg",
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    labelFontWeight: "bold",
                    autoSkip: true,
                    maxTicksLimit: 15,
                  },
                  scaleLabel: {
                    display: true,
                    labelFontWeight: "bold",
                    labelString: "Talla en cm",
                  },
                },
              ],
            },
          },
        }
      );
    },
    graficarIMC() {
      var $this = this;
      if (this.graficas.imc.graf) this.graficas.imc.graf.destroy();

      this.graficas.imc.graf = new Chart(document.getElementById("grafica_IMC_AIEPI001").getContext("2d"), {
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
    graficarPerCef() {
      var $this = this;
      if (this.graficas.per_cef.graf) this.graficas.per_cef.graf.destroy();

      this.graficas.per_cef.graf = new Chart(document.getElementById("grafica_PerCef_AIEPI001").getContext("2d"), {
        type: "line",
        data: {
          labels: this.graficas.per_cef.info.meses,
          datasets: [
            {
              fill: false,
              label: "Paciente",
              data: this.graficas.per_cef.info.paci,
              backgroundColor: "rgb(15, 15, 15)",
              borderColor: "rgb(15, 15, 15)",
              borderWidth: 1,
              pointRadius: 2,
            },
            {
              fill: false,
              label: "+2",
              data: this.graficas.per_cef.info.oms_2,
              backgroundColor: "rgb(173, 71, 71)",
              borderColor: "rgb(173, 71, 71)",
              borderWidth: 1,
              pointRadius: 0,
            },
            {
              fill: false,
              label: "+1",
              data: this.graficas.per_cef.info.oms_1,
              backgroundColor: "rgba(255,165,0)",
              borderColor: "rgba(255,165,0)",
              borderWidth: 1,
              pointRadius: 0,
              borderDash: [10, 5],
            },
            {
              fill: false,
              label: "Normal",
              data: this.graficas.per_cef.info.oms_0,
              backgroundColor: "rgb(37, 170, 79)",
              borderColor: "rgb(37, 170, 79)",
              borderWidth: 1,
              pointRadius: 0,
            },
            {
              fill: false,
              label: "-1",
              data: this.graficas.per_cef.info.oms_M1,
              backgroundColor: "rgba(255,165,0)",
              borderColor: "rgba(255,165,0)",
              borderWidth: 1,
              pointRadius: 0,
              borderDash: [10, 5],
            },
            {
              fill: false,
              label: "-2",
              data: this.graficas.per_cef.info.oms_M2,
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
              $this.graficasPDF.perCefXedad = this.toBase64Image();
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
                  labelString: "Per. cef en CM",
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
    generarPDFgraficas() {
      const { imprimir_GRAF_DES } = require("../../frameworks/pdf/hiclin/GRAF_DES.formato");

      imprimir_GRAF_DES({
        hcprc: this.global_AIEPI001,
        paci: $_REG_PACI,
        graficas: this.graficasPDF,
        callback: () => {
          console.log("TERMINA GRAFICAS");
        },
      });
    },
    botonFlujo(param) {},
    salir_AIEPI001() {
      _regresar_menuhis();
    },
  },
});