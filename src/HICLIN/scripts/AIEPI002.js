var Chart = require("chart.js");

const { detallesHc, grabarDetalles, grabarDetallesText } = require("../../HICLIN/scripts/reg_dethc.js");

new Vue({
  el: "#AIEPI002",
  data: {
    datos_paciente: {},
    datos_profesional: {},
    profesionales_AIEPI002: [],
    unidades_Serv_AIEPO002: [],
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
      textos: {},
      respuestas: {},
    },
    params_hc9010: {
      estado: false,
    },
    mostrarBotonPdf: false,
    mostrarHC9010: false,
    params_hc9011: {
      estado: false,
    },
    mostrarHC9011: false,
    params_aiepi845b: {
      estado: false,
    },
    params_aiepi826: {
      paso: false,
      edad: "",
      respuestas: [],
    },
    params_hc890d: {
      estado: false,
      unserv: null,
      finalidad: null,
      sexo: null,
    },
    paramsBajoPesoNacer: {
      estado: false,
    },
    paramsHC832A: {
      estado: false,
    },
    paramsEvaluacionDNT: {
      estado: false,
    },
    params_sifilis: {
      estado: false,
    },
    paramsPYP2: {
      estado: false,
    },
    mostrarPYP2: false,
    mostrarBajoPeso: false,
    mostrarSifilis: false,
    mostrarEvaluacionDNT: false,
    mostrarAnomaliasCong: false,
    mostrarCovid: false,
    mostrarAiepi845b: false,
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
    mostrarAiepi826: false,
    global_AIEPI002: {
      serv: "",
      edad: "",
      motivo: "",
      proceden: "",
      fecha: "",
      hora: "",
      med: "",
      covid19: _tipoJsonHc("covid19"),
      cierre: {
        estado: "",
        diag_muer: "",
      },
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
      tratamiento_sifilis: [
        {
          tabla_tto_sifi: [],
        },
        {
          tabla_segui_serol: [],
        },
        {
          nece_retto: " ",
          fecha_retto: "",
          medica_retto: " ",
          dosis_retto: " ",
          profe_aplico_retto: " ",
          cuantos_dias_retto: "",
          dx_contacto: " ",
          tto_contacto: " ",
          remitio_contacto: " ",
        },
      ],
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
      },
      anomalias_congenitas: {
        descrip_anomalia: "",
        seguimien_anomal: "",
        laboratorio_anomal: "",
        fecha_prox_ctl: "",
        fecha_ult_cyd: "",
        fecha_vac_anomal: "",
        fecha_hig_oral_anomal: "",
      },
    },
    DETALLE_HISTORIA: {
      antec_perinatal: detallesHc.WS_2002_3(),
      antec_perinatal_text: "",
      // anteriores dos son 2002, depende de unidad de servicio
      Tratar: "", // WS 9503
      Examen_fisico: "", // WS-4005
      Enfermedad_Actual: "", // WS-1001
      aiepi9501: detallesHc.WS_9501(), // WS-9501
    },
    tratamiento_sifilis: {
      // se usa como -w para poder usar componente sifilis, estructura que llega del dll esta mal
      tabla_tto_sifi: [],
      tabla_segui_serol: [],
      retrata_sifi: {
        nece_retto_sifi: "",
        fecha_retto_sifi: "",
        medicamento_retto: "",
        dosis_retto: "",
        profe_aplico_retto: "",
        cuantos_dias_retto: "",
      },
      dx_contacto: "",
      tto_contacto: "",
      remitio_contacto: "",
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
    estado_general: [
      { COD: "1", DESCRIP: "ALERTA, INTRANQUILO O IRRITABLE" },
      { COD: "2", DESCRIP: "LETARGICO O INCONSCIENTE" },
      { COD: "3", DESCRIP: "TRANQUILO" },
    ],
    arrayPalidez: [
      { COD: "1", DESCRIP: "LEVE" },
      { COD: "2", DESCRIP: "INTENSA" },
      { COD: "3", DESCRIP: "NORMAL" },
    ],
    pliegue_cutiano: [
      { COD: "1", DESCRIP: "NORMAL" },
      { COD: "2", DESCRIP: "LENTO" },
      { COD: "3", DESCRIP: "MUY LENTO" },
    ],
    arrayPustulas: [
      { COD: "1", DESCRIP: "MUCHAS O EXTENSAS" },
      { COD: "2", DESCRIP: "ESCASAS" },
      { COD: "3", DESCRIP: "NO TIENE" },
    ],
    succion: [
      { COD: "1", DESCRIP: "NO SUCCIONA NADA" },
      { COD: "2", DESCRIP: "NO SUCCIONA BIEN" },
      { COD: "3", DESCRIP: "SUCCIONA BIEN" },
    ],
    tendencia_peso: [
      { COD: "1", DESCRIP: "ASCENDENTE" },
      { COD: "2", DESCRIP: "HORIZONTAL" },
      { COD: "3", DESCRIP: "DESCENDENTE" },
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
    flujo_bloques: {},
    textos: {
      resultado_examen: "",
      palidez: "",
      pustulas: "",
      estado_general: "",
      pliegue_cutiano: "",
      agarre: "",
      succion: "",
      tendencia_peso: "",
      lactancia_materna_exclusiva: "",
      alimentacion_complementaria: "",
      aiepi826: {},
      descrip_diagnosticos: ["", "", "", "", "", "", "", "", "", ""],
      personal_atiende: "",
      finalidad: "",
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
    aiepi826: component_AIEPI826,
    aiepi845b: require("../../HICLIN/scripts/AIEPI845B.vue.js"),
    vales: require("../../HICLIN/scripts/HC-9010.vue.js"),
    apgar: require("../../HICLIN/scripts/HC-9011.vue.js"),
    bajopeso: require("../../HICLIN/scripts/bajoPesoNacer.vue.js"),
    anomalias: require("../../HICLIN/scripts/HC832A.vue.js"),
    evaluaciondnt: require("../../HICLIN/scripts/EVALDNT.vue.js"),
    sifilis: require("../../HICLIN/scripts/SIFILIS.vue.js"),
    pyp2: require("../../HICLIN/scripts/PYP2.vue.js"),
    ser851: require("../../SALUD/scripts/SER851.vue.js"),
  },
  created() {
    nombreOpcion("3 - AIEPI 0 a 2 meses");

    _inputControl("disabled");
    _inputControl("reset");
    this.datos_paciente = JSON.parse(JSON.stringify($_REG_PACI));
    this.datos_profesional = JSON.parse(JSON.stringify($_REG_PROF));

    this.traerUnidadesServicio();
  },
  computed: {
    sintomatico_w: function () {
      return {
        sintom_resp: this.global_AIEPI002.signos.sintom_resp,
        sintom_piel: this.global_AIEPI002.signos.sintom_piel,
        contacto_lepra: this.global_AIEPI002.signos.contacto_lepra,
        victi_maltrato: this.global_AIEPI002.signos.victi_maltrato,
        victi_violencia: this.global_AIEPI002.signos.victi_violencia,
        enfer_mental: this.global_AIEPI002.signos.enfer_mental,
        enfer_its: this.global_AIEPI002.signos.enfer_its,
        cual_its: this.global_AIEPI002.signos.cual_its,
        trata_its: this.global_AIEPI002.signos.trata_its,
        cancer_seno: this.global_AIEPI002.signos.cancer_seno,
        cancer_cervis: this.global_AIEPI002.signos.cancer_cervis,
        edu_autoexa_seno: this.global_AIEPI002.signos.edu_autoexa_seno,
        citologia_previa: this.global_AIEPI002.signos.citologia_previa,
        fecha_cito_previa: this.global_AIEPI002.signos.fecha_cito_previa,
        resul_cito_previa: this.global_AIEPI002.signos.resul_cito_previa,
        fecha_ult_mamo: this.global_AIEPI002.signos.fecha_ult_mamo,
      };
    },
  },
  watch: {
    sintomatico_w: function (data) {
      this.sintomaticos = data;
    },
    "global_AIEPI002.signos.tsh_nacer": function (data) {
      var consulta = this.resultado_examen.find((x) => x.COD == data);
      if (consulta) this.textos.resultado_examen = consulta.COD + ". " + consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.aiepi9501.signo_desnut.despal": function (data) {
      var consulta = this.arrayPalidez.find((x) => x.COD == data);
      if (consulta) this.textos.palidez = consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.aiepi9501.signo_peligro.enfpus": function (data) {
      var consulta = this.arrayPustulas.find((x) => x.COD == data);
      if (consulta) this.textos.pustulas = consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.aiepi9501.signo_diare.dialet": function (data) {
      var consulta = this.estado_general.find((x) => x.COD == data);
      if (consulta) this.textos.estado_general = consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.aiepi9501.signo_diare.pliegu": function (data) {
      var consulta = this.pliegue_cutiano.find((x) => x.COD == data);
      if (consulta) this.textos.pliegue_cutiano = consulta.DESCRIP;
      else if (data == "0") this.textos.pliegue_cutiano = "NO EVALUA";
    },
    "DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_succion": function (data) {
      var consulta = this.succion.find((x) => x.COD == data);
      if (consulta) this.textos.succion = consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.aiepi9501.signo_desnut.destend": function (data) {
      var consulta = this.tendencia_peso.find((x) => x.COD == data);
      if (consulta) this.textos.tendencia_peso = consulta.DESCRIP;
    },
    "global_AIEPI002.rips.atiende": function (data) {
      var consulta = this.personal_atiende.find((x) => x.COD == data);
      if (consulta) this.textos.personal_atiende = data + ". " + consulta.DESCRIP;
    },
    "global_AIEPI002.rips.finalidad": function (data) {
      var consulta = this.finalidades.find((x) => parseInt(x.COD) == parseInt(data));
      if (consulta) this.textos.finalidad = data + ". " + consulta.DESCRIP;
    },
    "global_AIEPI002.rips.tipo_diag": function (data) {
      var consulta = this.tipos_diagnostico.find((x) => x.COD == data);
      if (consulta) this.textos.tipo_diagnostico = data + ". " + consulta.DESCRIP;
    },
    "global_AIEPI002.rips.estado_sal": function (data) {
      var consulta = this.estadoSalidaRips.find((x) => x.COD == data);
      if (consulta) this.textos.estado_salida = data + ". " + consulta.DESCRIP;
    },
  },
  methods: {
    calcularIMCySUP() {
      var peso_kg = parseInt(this.datos_ext.peso_KG) || 0;
      var talla = parseInt(this.global_AIEPI002.signos.talla) || 0;

      if (peso_kg == 0 || talla == 0) {
        this.global_AIEPI002.signos.imc = "0";
        this.global_AIEPI002.signos.imc = "0";
        this.operaciones.sup = "0 m2";
      } else {
        //indice masa corporal
        var tallaDiv = talla / 100;
        var exponencial = Math.pow(tallaDiv, 2);
        var resultado = peso_kg / exponencial;

        this.global_AIEPI002.signos.imc = resultado.toFixed(2).toString();
      }
    },
    calcularTA_media() {
      var sistole = parseInt(this.global_AIEPI002.signos.tens1);
      var diastole = parseInt(this.global_AIEPI002.signos.tens2);
      var calculo = Math.round((sistole + diastole * 2) / 3);

      this.global_AIEPI002.signos.tens_m = parseInt(calculo).toString();
    },
    traerUnidadesServicio() {
      loader("show");
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then(function (data) {
          _this.unidades_Serv_AIEPO002 = data.UNSERV;
          _this.unidades_Serv_AIEPO002.pop();

          _this.traerProfesionales();
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          _this.salir_AIEPI002();
        });
    },
    traerProfesionales() {
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
        .then(function (data) {
          _this.profesionales_AIEPI002 = data.ARCHPROF;
          _this.profesionales_AIEPI002.pop();
          for (var i in _this.profesionales_AIEPI002) {
            _this.profesionales_AIEPI002[i].NOMBRE = _this.profesionales_AIEPI002[i].NOMBRE.replace(/\�/g, "Ñ").trim();
          }
          _this.traerHistoriaClinica(1);
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          _this.salir_AIEPI002();
        });
    },
    async traerHistoriaClinica(param) {
      var _this = this;

      postData(
        {
          datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|" + "1" + "|",
        },
        get_url("APP/HICLIN/HC_PRC.DLL")
      )
        .then(async (data) => {
          console.log(data);
          _this.global_AIEPI002 = data.HCPAC;

          _this.global_AIEPI002.paciente = $_REG_HC.id_paciente;
          _this.global_AIEPI002.folio_suc = $_REG_HC.llave_hc.substr(15, 2);
          _this.global_AIEPI002.folio_nro = $_REG_HC.llave_hc.substr(17, 6);
          //// SE ESTAN CREANDO

          _this.datos_ext.peso_KG = parseFloat(_this.global_AIEPI002.signos.peso) / 1000;

          _this.calcularIMCySUP();

          if (parseInt(_this.global_AIEPI002.edad) == 0)
            _this.global_AIEPI002.edad = $_REG_HC.edad_hc.unid_edad + $_REG_HC.edad_hc.vlr_edad.toString();

          for (var i in _this.global_AIEPI002.covid19) {
            if (typeof _this.global_AIEPI002.covid19[i] != "object")
              _this.global_AIEPI002.covid19[i] = _this.global_AIEPI002.covid19[i].trim();
          }

          _this.global_AIEPI002.signos.talla = parseInt(_this.global_AIEPI002.signos.talla) || "";
          _this.global_AIEPI002.signos.fcard = parseInt(_this.global_AIEPI002.signos.fcard) || "";
          _this.global_AIEPI002.signos.fresp = parseInt(_this.global_AIEPI002.signos.fresp) || "";
          _this.global_AIEPI002.signos.tens1 = parseInt(_this.global_AIEPI002.signos.tens1) || "";
          _this.global_AIEPI002.signos.tens2 = parseInt(_this.global_AIEPI002.signos.tens2) || "";
          _this.global_AIEPI002.signos.tens_m = parseInt(_this.global_AIEPI002.signos.tens_m) || "";
          _this.global_AIEPI002.signos.oximetria = parseInt(_this.global_AIEPI002.signos.oximetria) || "";

          _this.global_AIEPI002.motivo = _this.global_AIEPI002.motivo.replace(/\&/g, "\n").trim();

          switch (_this.global_AIEPI002.serv) {
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

          await _this.organizarTratamientoSifilis();

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
          _this.salir_AIEPI002();
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
          _this.salir_AIEPI002();
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

          _this.traerPatologiasCronicas();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_AIEPI002();
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
          _this.salir_AIEPI002();
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
            "2002;1001;4005;9503;9501" +
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

          var formato_4005 = data.DETHC.find((x) => x["COD-DETHC"] == "4005");
          if (formato_4005) _this.DETALLE_HISTORIA.Examen_fisico = formato_4005.DETALLE.replace(/\&/g, "\n").trim();

          var formato_9503 = data.DETHC.find((x) => x["COD-DETHC"] == "9503");
          if (formato_9503) _this.DETALLE_HISTORIA.Tratar = formato_9503.DETALLE.replace(/\&/g, "\n").trim();

          var formato_9501 = data.DETHC.find((x) => x["COD-DETHC"] == "9501");
          if (formato_9501) {
            _this.DETALLE_HISTORIA.aiepi9501 = formato_9501.DETALLE;
            _this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.recomtrato =
              _this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.recomtrato.replace(/\&/g, "\n").trim();
            _this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.medprev =
              _this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.medprev.replace(/\&/g, "\n").trim();
            _this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volinme =
              _this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volinme.replace(/\&/g, "\n").trim();
          }

          _this.traerTablaSisvan();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_AIEPI002();
        });
    },
    traerTablaSisvan() {
      var _this = this;

      postData({ datosh: datosEnvio() + $_REG_HC.id_paciente }, get_url("APP/SALUD/SER134-03.DLL"))
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
          _this.salir_AIEPI002();
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
          _this.salir_AIEPI002();
        });
    },
    async organizarTratamientoSifilis() {
      this.tratamiento_sifilis.tabla_tto_sifi = [];
      this.global_AIEPI002.tratamiento_sifilis[0].tabla_tto_sifi.forEach((item, index) => {
        this.tratamiento_sifilis.tabla_tto_sifi.push({
          fecha_tto_sifi: item.fecha,
          medicamento_sifi: item.medicamento,
          dosis_sifi: item.dosis,
          profe_aplico_sifi: item.profe_aplico,
        });
      });

      this.tratamiento_sifilis.tabla_segui_serol = [];
      this.global_AIEPI002.tratamiento_sifilis[1].tabla_segui_serol.forEach((item, index) => {
        this.tratamiento_sifilis.tabla_segui_serol.push({
          tipo_serol: item.tipo,
          fecha_serol: item.fecha,
          resul_serol: item.resul,
        });
      });

      this.tratamiento_sifilis.retrata_sifi = {
        nece_retto_sifi: this.global_AIEPI002.tratamiento_sifilis[2].nece_retto,
        fecha_retto_sifi: this.global_AIEPI002.tratamiento_sifilis[2].fecha_retto,
        medicamento_retto: this.global_AIEPI002.tratamiento_sifilis[2].medica_retto,
        dosis_retto: this.global_AIEPI002.tratamiento_sifilis[2].dosis_retto,
        profe_aplico_retto: this.global_AIEPI002.tratamiento_sifilis[2].profe_aplico_retto,
        cuantos_dias_retto: this.global_AIEPI002.tratamiento_sifilis[2].cuantos_dias_retto,
      };

      this.tratamiento_sifilis.dx_contacto = this.global_AIEPI002.tratamiento_sifilis[2].dx_contacto;
      this.tratamiento_sifilis.tto_contacto = this.global_AIEPI002.tratamiento_sifilis[2].tto_contacto;
      this.tratamiento_sifilis.remitio_contacto = this.global_AIEPI002.tratamiento_sifilis[2].remitio_contacto;
    },
    async desorganizarTratamientoSifilis() {
      this.tratamiento_sifilis.tabla_tto_sifi.forEach((item, index) => {
        this.global_AIEPI002.tratamiento_sifilis[0].tabla_tto_sifi[index].fecha = item.fecha_tto_sifi;
        this.global_AIEPI002.tratamiento_sifilis[0].tabla_tto_sifi[index].medicamento = item.medicamento_sifi;
        this.global_AIEPI002.tratamiento_sifilis[0].tabla_tto_sifi[index].dosis = item.dosis_sifi;
        this.global_AIEPI002.tratamiento_sifilis[0].tabla_tto_sifi[index].profe_aplico = item.profe_aplico_sifi;
      });

      this.tratamiento_sifilis.tabla_segui_serol.forEach((item, index) => {
        this.global_AIEPI002.tratamiento_sifilis[1].tabla_segui_serol[index].tipo = item.tipo_serol;
        this.global_AIEPI002.tratamiento_sifilis[1].tabla_segui_serol[index].fecha = item.fecha_serol;
        this.global_AIEPI002.tratamiento_sifilis[1].tabla_segui_serol[index].resul = item.resul_serol;
      });

      this.global_AIEPI002.tratamiento_sifilis[2] = {
        nece_retto: this.tratamiento_sifilis.retrata_sifi.nece_retto_sifi,
        fecha_retto: this.tratamiento_sifilis.retrata_sifi.fecha_retto_sifi,
        medica_retto: this.tratamiento_sifilis.retrata_sifi.medicamento_retto,
        dosis_retto: this.tratamiento_sifilis.retrata_sifi.dosis_retto,
        profe_aplico_retto: this.tratamiento_sifilis.retrata_sifi.profe_aplico_retto,
        cuantos_dias_retto: this.tratamiento_sifilis.retrata_sifi.cuantos_dias_retto,
        dx_contacto: this.tratamiento_sifilis.dx_contacto,
        tto_contacto: this.tratamiento_sifilis.tto_contacto,
        remitio_contacto: this.tratamiento_sifilis.remitio_contacto,
      };
    },
    async asignarDatos() {
      this.global_AIEPI002.fecha = $_REG_HC.fecha_hc;

      this.global_AIEPI002.rips.finalidad = $_REG_HC.finalid_hc.toString();

      this.datos_ext.grupo_sang = this.datos_paciente["GRP-SANG"].trim();
      this.datos_ext.RH = this.datos_paciente.RH.trim();

      this.datos_ext.ANO = this.global_AIEPI002.fecha.substring(0, 4);
      this.datos_ext.MES = this.global_AIEPI002.fecha.substring(4, 6);
      this.datos_ext.DIA = this.global_AIEPI002.fecha.substring(6, 8);

      var mensaje = "";

      if (this.global_AIEPI002.novedad == "7") {
        this.global_AIEPI002.hora = moment().format("HHmm");
        this.global_AIEPI002.serv = JSON.parse(JSON.stringify($_REG_HC.serv_hc));
        this.global_AIEPI002.med = this.datos_profesional.IDENTIFICACION.trim();
        this.global_AIEPI002.rips.atiende = this.datos_profesional.ATIENDE_PROF;
        this.global_AIEPI002.oper_elab = localStorage.Usuario;
        this.datos_ext.NOM_MEDICO =
          parseInt(this.datos_profesional.IDENTIFICACION) + " - " + this.datos_profesional.NOMBRE.trim();

        mensaje = "Creando: ";
      } else {
        this.datos_ext.NOM_MEDICO =
          parseInt(this.global_AIEPI002.med) + " - " + this.global_AIEPI002.descrip_med.trim();
        mensaje = "Modificando: ";
      }

      this.datos_ext.HORA = this.global_AIEPI002.hora.substring(0, 2);
      this.datos_ext.MINUTO = this.global_AIEPI002.hora.substring(2, 4);

      this.datos_ext.FOLIO = mensaje + $_REG_HC.suc_folio_hc + $_REG_HC.nro_folio_hc;

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

      this.params_hc890d.sexo = this.datos_paciente.SEXO;

      this.mostrarAiepi845b = true;

      this.params_aiepi826.edad = this.global_AIEPI002.edad_dias = SC_DIAS(
        this.datos_paciente.NACIM,
        this.global_AIEPI002.fecha
      );

      this.params_aiepi826.respuestas = this.DETALLE_HISTORIA.aiepi9501.signo_desarr.des_test_act;

      this.mostrarAiepi826 = true;

      await this.evaluarDiagnosticos();

      loader("hide");
      this.verificarEdad();
    },
    verificarEdad() {
      var unid_edad = this.global_AIEPI002.edad.substring(0, 1);
      var edad = parseInt(this.global_AIEPI002.edad.substring(1, 4));

      if ((unid_edad == "M" && edad > 2) || unid_edad == "A") {
        CON851("74", "74", null, "error", "Error");
        this.salir_AIEPI002();
      } else {
        this.verificarEstado();
      }
    },
    verificarEstado() {
      if (this.global_AIEPI002.cierre.estado == "2") {
        CON851("70", "Historia está cerrada, OJO !", null, "error", "Error");

        if (localStorage.Usuario == "GEBC") {
          this.capturarMes_hc();
        } else {
          this.salir_AIEPI002();
        }
      } else {
        if (
          localStorage.Usuario == "GEBC" ||
          localStorage.Usuario == "ADMI" ||
          parseInt(this.datos_profesional.IDENTIFICACION) == parseInt(this.global_AIEPI002.med)
        ) {
          this.evaluarUnidadServicio_hc();
        } else {
          CON851("81", "81", null, "error", "Error");
          this.salir_AIEPI002();
        }
      }
    },
    capturarMes_hc() {
      validarInputs(
        {
          form: "#validarMes_AIEPI002",
          orden: "1",
        },
        () => this.salir_AIEPI002(),
        () => {
          this.datos_ext.MES = cerosIzq(this.datos_ext.MES, 2);
          this.capturarDia_hc();
        }
      );
    },
    capturarDia_hc() {
      validarInputs(
        {
          form: "#validarDia_AIEPI002",
          orden: "1",
        },
        () => this.capturarMes_hc(),
        () => {
          this.datos_ext.DIA = cerosIzq(this.datos_ext.DIA, 2);

          this.global_AIEPI002.fecha = this.datos_ext.ANO + this.datos_ext.MES + this.datos_ext.DIA;
          this.capturarHora_hc();
        }
      );
    },
    capturarHora_hc() {
      validarInputs(
        {
          form: "#validarHora_AIEPI002",
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
          form: "#validarMinuto_AIEPI002",
          orden: "1",
        },
        () => this.capturarHora_hc(),
        () => {
          if (parseInt(this.datos_ext.MINUTO) > 59) {
            CON851("03", "03", null, "error", "Error");
            this.capturarMinuto_hc();
          } else {
            this.datos_ext.MINUTO = cerosIzq(this.datos_ext.MINUTO, 2);
            this.global_AIEPI002.hora = this.datos_ext.HORA + this.datos_ext.MINUTO;
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
        data: this.profesionales_AIEPI002,
        ancho: "70%",
        callback_esc: () => {
          _this.capturarMinuto_hc();
        },
        callback: (data) => {
          _this.global_AIEPI002.med = data.IDENTIFICACION.trim();
          _this.datos_ext.NOM_MEDICO = parseInt(data.IDENTIFICACION) + " - " + data.NOMBRE.trim();
          _this.evaluarUnidadServicio_hc();
        },
      });
    },
    evaluarUnidadServicio_hc() {
      if (this.global_AIEPI002.serv.trim() != "") {
        var busqueda = this.unidades_Serv_AIEPO002.find((x) => x.COD.trim() == this.global_AIEPI002.serv.trim());

        if (busqueda) this.datos_ext.UNID_SERV = this.global_AIEPI002.serv + " - " + busqueda.DESCRIP.trim();
        else this.datos_ext.UNID_SERV = this.global_AIEPI002.serv;
      }

      this.buscarConsultaExterna();
    },
    buscarConsultaExterna() {
      var _this = this;

      if (this.global_AIEPI002.serv == "02" || this.global_AIEPI002.serv == "08") {
        postData(
          {
            datosh:
              datosEnvio() +
              localStorage.Usuario +
              "|" +
              _this.datos_paciente.COD +
              "|" +
              _this.global_AIEPI002.serv +
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
            salir_AIEPI002();
          });
      } else {
        this.nro_ult_comp = "";
        this.verificarCrearHistoria();
      }
    },
    verificarCrearHistoria() {
      if (this.global_AIEPI002.novedad == "7") this.crearHistoria();
      else this.validarProcedencia();
    },
    crearHistoria() {
      var _this = this;

      var data = {};
      data["datosh"] =
        datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|" + this.global_AIEPI002.novedad + "|";
      data["datos_basicos"] =
        this.global_AIEPI002.fecha +
        "|" +
        this.global_AIEPI002.hora +
        "|" +
        this.global_AIEPI002.med +
        "|" +
        this.global_AIEPI002.serv +
        "|" +
        this.global_AIEPI002.edad +
        "|" +
        this.global_AIEPI002.edad_dias +
        "|AI02|2|" +
        this.global_AIEPI002.rips.finalidad +
        "|";

      postData(data, get_url("APP/HICLIN/SAVE_TEMP_HC.DLL"))
        .then((data) => {
          console.log(data);

          _this.traerHistoriaClinica(2);
        })
        .catch((error) => {
          console.log(error);
          CON851("", "Ha ocurrido un error creando historia", null, "error", "Error");
          _this.salir_AIEPI002();
        });
    },
    validarProcedencia() {
      validarInputs(
        {
          form: "#validarProcedencia",
          orden: "1",
        },
        () => CON851P("temp", this.validarProcedencia, this.salir_AIEPI002),
        () => {
          this.validarAcompañante();
        }
      );
    },
    validarAcompañante() {
      if (this.global_AIEPI002.acompa.trim() == "") this.global_AIEPI002.acompa = this.datos_paciente.MADRE.trim();

      validarInputs(
        {
          form: "#validarAcompañante",
          orden: "1",
        },
        () => this.validarProcedencia(),
        () => {
          this.global_AIEPI002.acompa = this.global_AIEPI002.acompa.replace(/[0-9|{};:,\+\-]/g, "");

          if (this.global_AIEPI002.acompa.length < 3) {
            CON851("", "Mínimo tres caracteres !", null, "error", "Error");
            this.validarAcompañante();
          } else this.validarParentesco();
        }
      );
    },
    validarParentesco() {
      if (this.global_AIEPI002.parent_acompa.trim() == "") {
        if (this.global_AIEPI002.acompa == this.datos_paciente.MADRE.trim()) {
          this.global_AIEPI002.parent_acompa = "MADRE";
        } else if (this.global_AIEPI002.acompa == this.datos_paciente.PADRE.trim()) {
          this.global_AIEPI002.parent_acompa = "PADRE";
        }
      }

      validarInputs(
        {
          form: "#validarParentesco",
          orden: "1",
        },
        () => this.validarAcompañante(),
        () => {
          this.global_AIEPI002.parent_acompa = this.global_AIEPI002.parent_acompa.replace(/[0-9|{};:,\+\-]/g, "");

          this.modal_victimaConf = true;
          this.datoPaciVictConflicto();
        }
      );
    },
    datoPaciVictConflicto() {
      validarInputs(
        {
          form: "#victConflicto_aiepi002",
        },
        () => {
          this.modal_victimaConf = false;
          this.validarParentesco();
        },
        () => {
          this.global_AIEPI002.victi_conflicto_paci =
            this.global_AIEPI002.victi_conflicto_paci.toUpperCase().trim() != "S" ? "N" : "S";

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
          this.global_AIEPI002.motivo = this.global_AIEPI002.motivo.replaceEsp();

          this.guardarHistoria(this.validarMotivoConsulta, () => {
            CON851("", "Primer bloque guardado", null, "success", "Correcto");
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
        () => {
          this.DETALLE_HISTORIA.Enfermedad_Actual.replaceEsp();

          this.validarMotivoConsulta();
        },
        () => {
          this.DETALLE_HISTORIA.Enfermedad_Actual = this.DETALLE_HISTORIA.Enfermedad_Actual.replaceEsp();

          this.guardarEnfermedadActual();
        }
      );
    },
    guardarEnfermedadActual() {
      let _this = this;

      grabarDetallesText(this.DETALLE_HISTORIA.Enfermedad_Actual, $_REG_HC.llave_hc + "1001")
        .then(() => {
          CON851("", "Enfermedad actual guardada", null, "success", "Correcto");
          _this.llamarAIEPI845A();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error guardando enfermedad actual", null, "error", "Error");
          _this.validarEnfermedadActual();
        });
    },
    llamarAIEPI845A() {
      this.params_aiepi845a.estado = 1;
    },
    salirAiepi845a(detalle, estado) {
      this.params_aiepi845a.estado = false;

      if (this.global_AIEPI002.serv == "08") {
        this.DETALLE_HISTORIA.antec_perinatal = detalle.antec_perinatal;
      } else {
        this.DETALLE_HISTORIA.antec_perinatal_text = detalle.antec_perinatal_text;
      }

      this.guardarAntecedentesPerinatales();
    },
    guardarAntecedentesPerinatales() {
      var _this = this;
      var data = {};

      if (this.global_AIEPI002.serv == "08") {
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

      console.log(data, "WS 2002");
      grabarDetalles(data, $_REG_HC.llave_hc)
        .then(() => {
          CON851("", "Antecedentes perinatales guardados", null, "success", "Correcto");
          _this.LlamarCOVID19();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error Guardando antecedentes", null, "error", "Error");
          _this.llamarAIEPI845A();
        });
    },
    LlamarCOVID19() {
      switch (this.global_AIEPI002.serv) {
        case "01":
        case "02":
        case "08":
        case "09":
        case "63":
          this.params_hc890h.pregunta = 1;
          this.params_hc890h.estado = true;
          break;
        default:
          this.global_AIEPI002.covid19 = _tipoJsonHc("covid19");

          this.validarPesoAlNacer();
          break;
      }
    },
    EscpreguntasCovid(pregunta) {
      this.params_hc890h.pregunta = 0;
      this.params_hc890h.estado = false;

      this.params_aiepi845a.estado = 2; // Esc para perinatal
    },
    recibirPreguntasCovid(pregunta, param) {
      this.global_AIEPI002.covid19 = param;
      this.params_hc890h.pregunta = 0;
      this.params_hc890h.estado = false;

      this.guardarHistoria(this.LlamarCOVID19, () => {
        CON851("", "Preguntas COVID 19 guardadas", null, "success", "Correcto");
        this.validarPesoAlNacer();
      });
    },
    validarPesoAlNacer() {
      validarInputs(
        {
          form: "#validarPesoNacer",
          orden: "1",
        },
        () => {
          this.params_hc890h.pregunta = 1;
          this.params_hc890h.estado = true;
        },
        () => {
          this.global_AIEPI002.signos.peso_nacer = this.mascaras.peso.resolve(this.global_AIEPI002.signos.peso_nacer);

          if (this.global_AIEPI002.signos.peso_nacer.toString() == "" && this.global_AIEPI002.serv == "08") {
            CON851("02", "02", null, "error", "Error");
            this.validarPesoAlNacer();
          } else if (parseFloat(this.global_AIEPI002.signos.peso_nacer) > 12000) {
            CON851("03", "03", null, "error", "Error");
            this.validarPesoAlNacer();
          } else {
            this.validarTallaNacer();
          }
        }
      );
    },
    validarTallaNacer() {
      validarInputs(
        {
          form: "#validarTalla_nace",
          orden: "1",
        },
        () => {
          this.validarPesoAlNacer();
        },
        () => {
          var talla = parseInt(this.global_AIEPI002.signos.talla_nacer);

          if (this.global_AIEPI002.signos.talla_nacer.trim() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarTallaNacer();
          } else if (talla > 60) {
            CON851("03", "03", null, "error", "Error");
            this.validarTallaNacer();
          } else {
            this.global_AIEPI002.signos.talla_nacer = talla.toString();

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
          this.validarTallaNacer();
        },
        () => {
          if (
            parseInt(this.global_AIEPI002.signos.edad_gestacional) > 42 ||
            parseInt(this.global_AIEPI002.signos.edad_gestacional) < 21
          ) {
            CON851("03", "03", null, "error", "Error");
            this.validarEdad_gestacion();
          } else if (this.global_AIEPI002.signos.edad_gestacional.trim() == "" && this.global_AIEPI002.serv == "08") {
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
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Resultado TSH",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.resultado_examen,
            callback_f: () => this.ValidarRH(),
            seleccion: this.global_AIEPI002.signos.tsh_nacer,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_AIEPI002.signos.tsh_nacer = data.COD;

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
          this.validarResul_examen();
        },
        () => {
          var peso = parseFloat(this.global_AIEPI002.signos.peso);
          this.global_AIEPI002.signos.peso = this.mascaras.peso.resolve(this.global_AIEPI002.signos.peso);

          if (this.global_AIEPI002.signos.peso.toString() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarPeso();
          } else if (peso > 20000 || peso < 500) {
            CON851("03", "03", null, "error", "Error");
            this.validarPeso();
          } else {
            this.datos_ext.peso_KG = peso / 1000;
            this.validarPeso_toGraficar();
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
        this.graficas.peso_edad.info.paci.push({
          x: parseInt(edadMeses),
          y: parseFloat(this.datos_ext.peso_KG),
        });
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
          var talla = parseInt(this.global_AIEPI002.signos.talla);

          if (this.global_AIEPI002.signos.talla.toString().trim() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarTalla();
          } else if (talla > 70 || talla == 0) {
            CON851("03", "03", null, "error", "Error");
            this.validarTalla();
          } else {
            this.global_AIEPI002.signos.talla = talla.toString();
            this.global_AIEPI002.signos.imc_estad = this.validarRangosOMS(
              "IMC",
              parseFloat(this.global_AIEPI002.signos.imc)
            );

            switch (this.global_AIEPI002.signos.imc_estad) {
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

            this.DETALLE_HISTORIA.aiepi9501.signo_desnut.pes_ed_estad = this.validarRangosOMS(
              "PXE",
              parseFloat(this.datos_ext.peso_KG)
            );
            var pes_ed_estad = parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_desnut.pes_ed_estad);
            console.log(pes_ed_estad);

            this.DETALLE_HISTORIA.aiepi9501.signo_desnut.talla_ed_estad = this.validarRangosOMS(
              "TXE",
              parseInt(this.global_AIEPI002.signos.talla)
            );
            var talla_ed_estad = parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_desnut.talla_ed_estad);
            console.log(talla_ed_estad);

            this.DETALLE_HISTORIA.aiepi9501.signo_desnut.peso_tal_estad = this.validarRangosOMS(
              "PXT",
              parseFloat(this.datos_ext.peso_KG)
            );
            var peso_tal_estad = parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_desnut.peso_tal_estad);
            console.log(peso_tal_estad);

            if (pes_ed_estad == "-3") {
              CON851("BI", "BI", null, "warning", "Advertencia");
            } else if (
              pes_ed_estad == "-2" ||
              pes_ed_estad == "-1" ||
              peso_tal_estad == "-2" ||
              peso_tal_estad == "-1"
            ) {
              CON851("BJ", "BJ", null, "warning", "Advertencia");
            }

            var fecha_Actual = moment();
            var fecha_Nacim = moment(this.datos_paciente.NACIM).format("YYYYMMDD");

            var edadMeses = fecha_Actual.diff(fecha_Nacim, "months");

            ////grafica talla por edad
            var index_talla = this.graficas.talla.info.paci.findIndex((x) => parseInt(x.x) == parseInt(edadMeses));
            if (index_talla != -1) {
              this.graficas.talla.info.paci[index_talla].y = talla;
            } else {
              this.graficas.talla.info.paci.push({
                x: parseInt(edadMeses),
                y: talla,
              });
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
              this.graficas.peso_talla.info.paci.push({
                x: talla,
                y: parseFloat(this.datos_ext.peso_KG),
              });
            }

            ////grafica imc
            var index_imc = this.graficas.imc.info.paci.findIndex((x) => parseInt(x.x) == parseInt(edadMeses));
            if (index_imc != -1) {
              this.graficas.imc.info.paci[index_imc].y = parseFloat(this.global_AIEPI002.signos.imc);
            } else {
              this.graficas.imc.info.paci.push({
                x: parseInt(edadMeses),
                y: parseFloat(this.global_AIEPI002.signos.imc),
              });
            }

            this.SISVAN.talla_ant_grafica = talla;

            this.graficarTalla();
            this.graficarPesoTalla();
            this.graficarIMC();

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
          this.validarTalla();
        },
        () => {
          var unidad_edad = this.global_AIEPI002.edad.substring(0, 1);
          var edad = parseInt(this.global_AIEPI002.edad.substring(1, 4));

          var PER_CEF = parseFloat(this.global_AIEPI002.signos.per_cef) || 0;

          if (this.global_AIEPI002.signos.per_cef.toString().trim() == "" || PER_CEF == 0 || PER_CEF > 50) {
            CON851("02", "02", null, "error", "Error");
            this.validarPeCef();
          } else {
            // variable de WS AIEPI 9501
            this.DETALLE_HISTORIA.aiepi9501.signo_desnut.per_cef_estad = this.validarRangosOMS(
              "CEF",
              parseFloat(this.global_AIEPI002.signos.per_cef)
            );

            this.global_AIEPI002.signos.per_cef = this.mascaras.per.resolve(this.global_AIEPI002.signos.per_cef);

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
              this.graficas.per_cef.info.paci[index_cef].y = parseFloat(this.global_AIEPI002.signos.per_cef);
            } else {
              this.graficas.per_cef.info.paci.push({
                x: parseInt(edadMeses),
                y: parseFloat(this.global_AIEPI002.signos.per_cef),
              });
            }

            this.graficarPerCef();

            this.mostrarBotonPdf = true;

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
          this.mostrarBotonPdf = false;
          this.validarPeCef();
        },
        () => {
          var fc = parseInt(this.global_AIEPI002.signos.fcard);

          if (this.global_AIEPI002.signos.fcard.toString().trim() == "" || fc == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validar_FC();
          } else if (fc > 200) {
            CON851("03", "03", null, "warning", "Advertencia");
            this.validar_FC();
          } else if (fc < 100 || fc > 180) {
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
          var fr = parseInt(this.global_AIEPI002.signos.fresp) || 0;

          if (fr == 0 || this.global_AIEPI002.signos.fresp.toString().trim() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validar_FR();
          } else if (fr > 100) {
            CON851("03", "03", null, "error", "Error");
            this.validar_FR();
          } else {
            if (fr < 30 || fr >= 60) CON851("BL", "BL", null, "warning", "Advertencia");

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
          this.validar_FR();
        },
        () => {
          var per_baq = parseFloat(this.global_AIEPI002.signos.per_braq) || 0;

          if (this.global_AIEPI002.signos.per_braq.toString().trim() == "" || per_baq == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarPerBraq();
          } else {
            this.global_AIEPI002.signos.per_braq = this.mascaras.dos.resolve(this.global_AIEPI002.signos.per_braq);

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
          this.validarPerBraq();
        },
        () => {
          var temp = parseFloat(this.global_AIEPI002.signos.temp) || 0;

          if (this.global_AIEPI002.signos.temp.toString().trim() == "" || temp == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarTemperatura();
          } else if (temp < 30) {
            CON851("03", "03", null, "error", "Error");
            this.validarTemperatura();
          } else if (temp > 41) {
            CON851("03", "03", null, "error", "Error");
            this.validarTemperatura();
          } else {
            if (temp < 35.5 || temp > 38) CON851("BM", "BM", null, "warning", "Advertencia");

            this.global_AIEPI002.signos.temp = this.mascaras.temp.resolve(this.global_AIEPI002.signos.temp);

            this.guardarHistoria(this.validarTemperatura, () => {
              CON851("", "Signos guardados", null, "success", "Correcto");
              this.validarBebeTomaPecho();
            });
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
        () => this.validarTemperatura(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.tpecho =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.tpecho.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarDiuresis24H();
        }
      );
    },
    validarDiuresis24H() {
      validarInputs(
        {
          form: "#validarDiuresis24H",
          orden: "1",
        },
        () => this.validarBebeTomaPecho(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiediure =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiediure.toUpperCase().trim() != "S" ? "N" : "S";

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
        () => this.validarDiuresis24H(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.convul =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.convul.toUpperCase().trim() != "S" ? "N" : "S";

          if (parseFloat(this.global_AIEPI002.signos.temp) > 38) {
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enffie = "S";
            this.validarVomitaTodo();
          } else this.validarFiebreHipotermia();
        }
      );
    },
    validarFiebreHipotermia() {
      validarInputs(
        {
          form: "#validarFiebreHipotermia",
          orden: "1",
        },
        () => this.validarConvulsiones(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enffie =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enffie.toUpperCase().trim() != "S" ? "N" : "S";

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
        () => {
          if (parseFloat(this.global_AIEPI002.signos.temp) > 38) this.validarConvulsiones();
          else this.validarFiebreHipotermia();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.vomito =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.vomito.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_peligro.vomito == "S") this.validarVomitoUlt4H();
          else {
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diavom_cant = "00";
            this.validarTirajeSubcostal();
          }
        }
      );
    },
    validarVomitoUlt4H() {
      validarInputs(
        {
          form: "#validarVomitoUlt4H",
          orden: "1",
        },
        () => this.validarVomitaTodo(),
        () => {
          var dato = parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_diare.diavom_cant);

          if (this.DETALLE_HISTORIA.aiepi9501.signo_diare.diavom_cant.trim() == "" || dato == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarVomitoUlt4H();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diavom_cant = dato.toString();
            this.validarTirajeSubcostal();
          }
        }
      );
    },
    validarTirajeSubcostal() {
      validarInputs(
        {
          form: "#validarTirajeSubcostal",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.aiepi9501.signo_peligro.vomito == "S") this.validarVomitoUlt4H();
          else this.validarVomitaTodo();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_tos.tostri =
            this.DETALLE_HISTORIA.aiepi9501.signo_tos.tostri.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarQuejidos();
        }
      );
    },
    validarQuejidos() {
      validarInputs(
        {
          form: "#validarQuejidos",
          orden: "1",
        },
        () => this.validarTirajeSubcostal(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfque =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfque.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarSeVeMal();
        }
      );
    },
    validarSeVeMal() {
      validarInputs(
        {
          form: "#validarSeVeMal",
          orden: "1",
        },
        () => this.validarQuejidos(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfmal =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfmal.toUpperCase().trim() != "S" ? "N" : "S";

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
        () => this.validarSeVeMal(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosest =
            this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosest.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarSibilancia();
        }
      );
    },
    validarSibilancia() {
      validarInputs(
        {
          form: "#validarSibilancia",
          orden: "1",
        },
        () => this.validarEstridorReposo(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosibi =
            this.DETALLE_HISTORIA.aiepi9501.signo_tos.tosibi.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarAleteoNasal();
        }
      );
    },
    validarAleteoNasal() {
      validarInputs(
        {
          form: "#validarAleteoNasal",
          orden: "1",
        },
        () => this.validarSibilancia(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfale =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfale.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarApenas();
        }
      );
    },
    validarApenas() {
      validarInputs(
        {
          form: "#validarApenas",
          orden: "1",
        },
        () => this.validarAleteoNasal(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfapn =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfapn.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarIctericia();
        }
      );
    },
    validarIctericia() {
      validarInputs(
        {
          form: "#validarIctericia",
          orden: "1",
        },
        () => this.validarApenas(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfict =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfict.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarCianosis();
        }
      );
    },
    validarCianosis() {
      validarInputs(
        {
          form: "#validarCianosis",
          orden: "1",
        },
        () => this.validarIctericia(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfcia =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfcia.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarPalidez();
        }
      );
    },
    validarPalidez() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Palidez",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPalidez,
            callback_f: () => this.validarCianosis(),
            seleccion: this.DETALLE_HISTORIA.aiepi9501.signo_desnut.despal,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.aiepi9501.signo_desnut.despal = data.COD;

            _this.validarOmbligo();
          }
        );
      }, 300);
    },
    validarOmbligo() {
      validarInputs(
        {
          form: "#validarOmbligo",
          orden: "1",
        },
        () => this.validarPalidez(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfomb =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfomb.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarEritema();
        }
      );
    },
    validarEritema() {
      validarInputs(
        {
          form: "#validarEritema",
          orden: "1",
        },
        () => this.validarOmbligo(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enferi =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enferi.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarDistencionAbdo();
        }
      );
    },
    validarDistencionAbdo() {
      validarInputs(
        {
          form: "#validarDistencionAbdo",
          orden: "1",
        },
        () => this.validarEritema(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfdis =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfdis.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarPlacaBlanquecina();
        }
      );
    },
    validarPlacaBlanquecina() {
      validarInputs(
        {
          form: "#validarPlacaBlanquecina",
          orden: "1",
        },
        () => this.validarDistencionAbdo(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfpla =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfpla.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarSecrecionConjuntiva();
        }
      );
    },
    validarSecrecionConjuntiva() {
      validarInputs(
        {
          form: "#validarSecrecionConjuntiva",
          orden: "1",
        },
        () => this.validarPlacaBlanquecina(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfsec =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfsec.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarSupuracionOido();
        }
      );
    },
    validarSupuracionOido() {
      validarInputs(
        {
          form: "#validarSupuracionOido",
          orden: "1",
        },
        () => this.validarSecrecionConjuntiva(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidsup =
            this.DETALLE_HISTORIA.aiepi9501.signo_oido.oidsup.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarFontanelaObombada();
        }
      );
    },
    validarFontanelaObombada() {
      validarInputs(
        {
          form: "#validarFontanelaObombada",
          orden: "1",
        },
        () => this.validarSupuracionOido(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enffon =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enffon.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarPetequias();
        }
      );
    },
    validarPetequias() {
      validarInputs(
        {
          form: "#validarPetequias",
          orden: "1",
        },
        () => this.validarFontanelaObombada(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfpet =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfpet.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarHemorragea();
        }
      );
    },
    validarHemorragea() {
      validarInputs(
        {
          form: "#validarHemorragea",
          orden: "1",
        },
        () => this.validarPetequias(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfhem =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfhem.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarEquimosis();
        }
      );
    },
    validarEquimosis() {
      validarInputs(
        {
          form: "#validarEquimosis",
          orden: "1",
        },
        () => this.validarHemorragea(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfequ =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfequ.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarPustula();
        }
      );
    },
    validarPustula() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Pustulas",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayPustulas,
            callback_f: () => this.validarEquimosis(),
            seleccion: this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfpus,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfpus = data.COD;

            _this.validarEdemaPalpebral();
          }
        );
      }, 300);
    },
    validarEdemaPalpebral() {
      validarInputs(
        {
          form: "#validarEdemaPalpebral",
          orden: "1",
        },
        () => this.validarPustula(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.edepalp =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.edepalp.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarLlenadoCapilar();
        }
      );
    },
    validarLlenadoCapilar() {
      validarInputs(
        {
          form: "#validarLlenadoCapilar",
          orden: "1",
        },
        () => this.validarEdemaPalpebral(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiecapi =
            this.DETALLE_HISTORIA.aiepi9501.signo_fiebr.fiecapi.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarVIH();
        }
      );
    },
    validarVIH() {
      validarInputs(
        {
          form: "#validarVIH",
          orden: "1",
        },
        () => this.validarLlenadoCapilar(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfvih =
            this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfvih.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarMalformaciones();
        }
      );
    },
    validarMalformaciones() {
      validarInputs(
        {
          form: "#validarMalformaciones",
          orden: "1",
        },
        () => this.validarVIH(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfmfo = this.DETALLE_HISTORIA.aiepi9501.signo_peligro.enfmfo
            .toUpperCase()
            .trim();

          this.validarEstadoGeneral();
        }
      );
    },
    validarEstadoGeneral() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Estado general del niño",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.estado_general,
            callback_f: () => this.validarMalformaciones(),
            seleccion: this.DETALLE_HISTORIA.aiepi9501.signo_diare.dialet,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.aiepi9501.signo_diare.dialet = data.COD;

            _this.evaluarEnfermedadGrave();
          }
        );
      }, 300);
    },
    evaluarEnfermedadGrave() {
      var PELIGRO = this.DETALLE_HISTORIA.aiepi9501.signo_peligro;
      var TOS = this.DETALLE_HISTORIA.aiepi9501.signo_tos;
      var DIARE = this.DETALLE_HISTORIA.aiepi9501.signo_diare;
      var FIEBRE = this.DETALLE_HISTORIA.aiepi9501.signo_fiebr;
      var OIDO = this.DETALLE_HISTORIA.aiepi9501.signo_oido;

      var estado_general = parseInt(DIARE.dialet);
      var FRESP = parseInt(this.global_AIEPI002.signos.fresp);
      var FCARD = parseInt(this.global_AIEPI002.signos.fcard);
      var TEMP = parseFloat(this.global_AIEPI002.signos.temp);

      var primer_if =
        PELIGRO.tpecho == "S" ||
        estado_general < 3 ||
        PELIGRO.enfmal == "S" ||
        PELIGRO.vomito == "S" ||
        PELIGRO.convul == "S" ||
        PELIGRO.enfpal == "S" ||
        PELIGRO.enfcia == "S" ||
        PELIGRO.enfict == "S" ||
        FRESP < 30 ||
        FRESP >= 60 ||
        FCARD < 100 ||
        TEMP < 35.5 ||
        TEMP > 38
          ? true
          : false;

      var segundo_if = PELIGRO.enfsec == "S" && PELIGRO.edepalp == "S" ? true : false;
      var tercer_if = PELIGRO.enfomb == "S" && PELIGRO.enferi == "S" ? true : false;

      var cuarto_if =
        FIEBRE.fiecapi == "S" ||
        PELIGRO.enffon == "S" ||
        PELIGRO.enfapn == "S" ||
        PELIGRO.enfale == "S" ||
        PELIGRO.enfque == "S" ||
        TOS.tosest == "S" ||
        TOS.tosibi == "S" ||
        TOS.tostri == "S" ||
        OIDO.oidsup == "S" ||
        PELIGRO.enfpus == "1" ||
        PELIGRO.enferi == "S" ||
        PELIGRO.enfequ == "S" ||
        PELIGRO.enfpet == "S" ||
        PELIGRO.enfhem == "S" ||
        PELIGRO.enfdis == "S" ||
        PELIGRO.enfvih == "S" ||
        PELIGRO.fiediure == "S"
          ? true
          : false;

      if (primer_if || segundo_if || tercer_if || cuarto_if) {
        this.DETALLE_HISTORIA.aiepi9501.enfer_grave = 1;
        CON851("A1", "A1", null, "warning", "Advertencia");
      } else {
        this.DETALLE_HISTORIA.aiepi9501.enfer_grave = 0;

        if (
          (PELIGRO.enfsec == "S" && PELIGRO.edepalp == "N") ||
          (PELIGRO.enfomb == "S" && PELIGRO.enferi == "S") ||
          PELIGRO.enfpus == "2" ||
          PELIGRO.enfpla == "S"
        ) {
          this.DETALLE_HISTORIA.aiepi9501.var_neonato.infec_local = 1;
          CON851("EM", "EM", null, "warning", "Advertencia");
        } else this.DETALLE_HISTORIA.aiepi9501.var_neonato.infec_local = 0;
      }

      this.validarDiarrea();
    },
    validarDiarrea() {
      validarInputs(
        {
          form: "#validarDiarrea",
          orden: "1",
        },
        () => this.validarEstadoGeneral(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_diare.diarre =
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diarre.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_diare.diarre == "S") {
            this.validarDiarreaDias();
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

            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diadia = "00";
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diasan = "N";
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diaojo = "N";
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.pliegu = "0";

            this.validarDificultadAlim();
          }
        }
      );
    },
    validarDiarreaDias() {
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
            this.validarDiarreaDias();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diadia = parseInt(
              this.DETALLE_HISTORIA.aiepi9501.signo_diare.diadia
            ).toString();

            this.validarSangreHeces();
          }
        }
      );
    },
    validarSangreHeces() {
      validarInputs(
        {
          form: "#validarSangreHeces",
          orden: "1",
        },
        () => this.validarDiarreaDias(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_diare.diasan =
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diasan.toUpperCase().trim() != "S" ? "N" : "S";

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
        () => this.validarSangreHeces(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_diare.diaojo =
            this.DETALLE_HISTORIA.aiepi9501.signo_diare.diaojo.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarPliegueCutaneo();
        }
      );
    },
    validarPliegueCutaneo() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Pliegue cutiano",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.pliegue_cutiano,
            callback_f: () => this.validarOjosHundidos(),
            seleccion: this.DETALLE_HISTORIA.aiepi9501.signo_diare.pliegu,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.aiepi9501.signo_diare.pliegu = data.COD;

            _this.evaluarEnferDiarrea();
          }
        );
      }, 300);
    },
    evaluarEnferDiarrea() {
      var DIARREA = this.DETALLE_HISTORIA.aiepi9501.signo_diare;

      const enfer_diarr = {
        diarre_grave: 0,
        diarre_deshi: 0,
        diarre_riesg: 0,
        diarre_leve: 0,
        diarre_pers_grave: 0,
        diarre_pers_leve: 0,
        disenteria: 0,
      };

      var contar_w = 0;
      if (parseInt(DIARREA.dialet) < 3) contar_w = 1;
      if (DIARREA.diaojo == "S") contar_w = contar_w + 1;
      if (parseInt(DIARREA.pliegu) == 3) contar_w = contar_w + 1;

      if (DIARREA.diasan == "S") {
        CON851("EN", "EN", null, "warning", "Advertencia");
        enfer_diarr.disenteria = 1;
      } else if (parseInt(DIARREA.diadia) >= 7) {
        CON851("BT", "BT", null, "warning", "Advertencia");
        enfer_diarr.diarre_pers_grave = 1;
      } else if (contar_w >= 2) {
        CON851("A6", "A6", null, "warning", "Advertencia");
        enfer_diarr.diarre_grave = 1;
      } else {
        contar_w = 0;
        if (parseInt(DIARREA.dialet) == 1) contar_w = 1;
        if (DIARREA.diaojo == "S") contar_w = contar_w + 1;
        if (parseInt(DIARREA.pliegu) == 2) contar_w = contar_w + 1;

        if (contar_w >= 2) {
          CON851("A7", "A7", null, "warning", "Advertencia");
          enfer_diarr.diarre_deshi = 1;
        } else if (parseInt(DIARREA.diavom_cant) > 3) {
          CON851("A8", "A8", null, "warning", "Advertencia");
          enfer_diarr.diarre_riesg = 1;
        } else {
          CON851("BS", "BS", null, "warning", "Advertencia");
          enfer_diarr.diarre_leve = 1;
        }
      }

      this.DETALLE_HISTORIA.aiepi9501.var_diarr = enfer_diarr;

      this.validarDificultadAlim();
    },
    validarDificultadAlim() {
      validarInputs(
        {
          form: "#validarDificultadAlim",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.aiepi9501.signo_diare.diarre == "S") this.validarPliegueCutaneo();
          else this.validarDiarrea();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_dific =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_dific.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarDejadoComer();
        }
      );
    },
    validarDejadoComer() {
      validarInputs(
        {
          form: "#validarDejadoComer",
          orden: "1",
        },
        () => this.validarDificultadAlim(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_dejad =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_dejad.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_dejad == "S") {
            this.validarDejadoComerDias();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_dias = "00";
            this.validarLecheMaterna();
          }
        }
      );
    },
    validarDejadoComerDias() {
      validarInputs(
        {
          form: "#validarDejadoComerDias",
          orden: "1",
        },
        () => this.validarDejadoComer(),
        () => {
          var dias = this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_dias;

          if (dias.trim() == "" || parseInt(dias) == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarDejadoComerDias();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_dias = parseInt(dias).toString();

            this.validarLecheMaterna();
          }
        }
      );
    },
    validarLecheMaterna() {
      validarInputs(
        {
          form: "#validarLecheMaterna",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_dejad == "S") this.validarDejadoComerDias();
          else this.validarDejadoComer();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.aneleche =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.aneleche.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.aneleche == "S") this.validarLecheMaterna24h();
          else {
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.aneveces = "00";
            this.validarLecheOtra();
          }
        }
      );
    },
    validarLecheMaterna24h() {
      validarInputs(
        {
          form: "#validarLecheMaterna24h",
          orden: "1",
        },
        () => this.validarLecheMaterna(),
        () => {
          var dias = this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.aneveces;

          if (dias.trim() == "" || parseInt(dias) == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarLecheMaterna24h();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.aneveces = parseInt(dias).toString();

            this.validarLecheOtra();
          }
        }
      );
    },
    validarLecheOtra() {
      validarInputs(
        {
          form: "#validarLecheOtra",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.aneleche == "S") this.validarLecheMaterna24h();
          else this.validarLecheMaterna();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_otrleche =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_otrleche.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_otrleche == "S") this.validarCualOtraLeche();
          else {
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_cualleche = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_como = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.anelevec = "00";
            this.validarOtroAlimento();
          }
        }
      );
    },
    validarCualOtraLeche() {
      validarInputs(
        {
          form: "#validarCualOtraLeche",
          orden: "1",
        },
        () => this.validarLecheOtra(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_cualleche =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_cualleche.trim().toUpperCase();
          this.validarPreparaLeche();
        }
      );
    },
    validarPreparaLeche() {
      validarInputs(
        {
          form: "#validarPreparaLeche",
          orden: "1",
        },
        () => this.validarCualOtraLeche(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_como =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_como.trim().toUpperCase();
          this.validarLecheOtra24h();
        }
      );
    },
    validarLecheOtra24h() {
      validarInputs(
        {
          form: "#validarLecheOtra24h",
          orden: "1",
        },
        () => this.validarPreparaLeche(),
        () => {
          var dias = this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.anelevec;

          if (dias.trim() == "" || parseInt(dias) == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarLecheOtra24h();
          } else {
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.anelevec = parseInt(dias).toString();

            this.validarOtroAlimento();
          }
        }
      );
    },
    validarOtroAlimento() {
      validarInputs(
        {
          form: "#validarOtroAlimento",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_otrleche == "S") this.validarLecheOtra24h();
          else this.validarLecheOtra();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_otr_alim =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_otr_alim.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_otr_alim == "S") this.validarCualesOtroAlimentos();
          else {
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_cualalim = "";
            this.validarAmamantamiento();
          }
        }
      );
    },
    validarCualesOtroAlimentos() {
      validarInputs(
        {
          form: "#validarCualesOtroAlimentos",
          orden: "1",
        },
        () => this.validarOtroAlimento(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_cualalim =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_cualalim.trim().toUpperCase();
          this.validarAmamantamiento();
        }
      );
    },
    validarAmamantamiento() {
      validarInputs(
        {
          form: "#validarAmamantamiento",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_otr_alim == "S") this.validarCualesOtroAlimentos();
          else this.validarOtroAlimento();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_amamantamiento =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_amamantamiento.toUpperCase().trim() != "S"
              ? "N"
              : "S";

          if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_amamantamiento == "S") this.validarTocaSeno();
          else {
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_tocaseno = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_bocaabi = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_lab_inf = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_aerola = "";
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_agarre = "0";
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_succion = "0";
            this.textos.agarre = "";
            this.validarTendenciaPeso();
          }
        }
      );
    },
    validarTocaSeno() {
      validarInputs(
        {
          form: "#validarTocaSeno",
          orden: "1",
        },
        () => this.validarAmamantamiento(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_tocaseno =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_tocaseno.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarBocaAbierta();
        }
      );
    },
    validarBocaAbierta() {
      validarInputs(
        {
          form: "#validarBocaAbierta",
          orden: "1",
        },
        () => this.validarTocaSeno(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_bocaabi =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_bocaabi.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarLabioInferior();
        }
      );
    },
    validarLabioInferior() {
      validarInputs(
        {
          form: "#validarLabioInferior",
          orden: "1",
        },
        () => this.validarBocaAbierta(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_lab_inf =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_lab_inf.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarAureola();
        }
      );
    },
    validarAureola() {
      validarInputs(
        {
          form: "#validarAureola",
          orden: "1",
        },
        () => this.validarLabioInferior(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_aerola =
            this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_aerola.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarAgarre();
        }
      );
    },
    validarAgarre() {
      var ALIM = this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion;
      var agarre = "0";

      if (ALIM.ali_tocaseno == "" && ALIM.ali_bocaabi == "" && ALIM.ali_lab_inf == "" && ALIM.ali_aerola == "")
        agarre = "0";
      else if (ALIM.ali_tocaseno == "S" && ALIM.ali_bocaabi == "S" && ALIM.ali_lab_inf == "S" && ALIM.ali_aerola == "S")
        agarre = "3";
      else if (ALIM.ali_tocaseno == "N" && ALIM.ali_bocaabi == "N" && ALIM.ali_lab_inf == "N" && ALIM.ali_aerola == "N")
        agarre = "1";
      else agarre = "2";

      switch (agarre) {
        case "0":
          this.textos.agarre = "SIN EVALUAR";
          break;
        case "1":
          this.textos.agarre = "NO AGARRE";
          break;
        case "2":
          this.textos.agarre = "AGARRE DEFICIENTE";
          break;
        case "3":
          this.textos.agarre = "BUEN AGARRE";
          break;
      }

      this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_agarre = agarre;

      this.validarSuccion();
    },
    validarSuccion() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Succion",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.succion,
            callback_f: () => this.validarAureola(),
            seleccion: this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_succion,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_succion = data.COD;

            _this.validarTendenciaPeso();
          }
        );
      }, 300);
    },
    validarTendenciaPeso() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Tendencia de peso",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.tendencia_peso,
            callback_f: () => {
              if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_amamantamiento == "S") this.validarSuccion();
              else this.validarAmamantamiento();
            },
            seleccion: this.DETALLE_HISTORIA.aiepi9501.signo_desnut.destend,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.aiepi9501.signo_desnut.destend = data.COD;

            _this.evaluarProblemaAlimentacion();
          }
        );
      }, 300);
    },
    evaluarProblemaAlimentacion() {
      var ALIM = this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion;
      var DESNUT = this.DETALLE_HISTORIA.aiepi9501.signo_desnut;

      if (ALIM.ali_agarre == "1" || ALIM.ali_succion == "1" || DESNUT.destend == "3") {
        this.DETALLE_HISTORIA.aiepi9501.var_neonato.prob_alim_grave = 1;
        CON851("E0", "EO", null, "warning", "Advertencia");
      } else if (
        DESNUT.destend == "2" ||
        ALIM.ali_agarre == "2" ||
        ALIM.ali_succion == "2" ||
        parseInt(ALIM.aneveces) < 8 ||
        ALIM.ali_otrleche == "S" ||
        ALIM.ali_otr_alim == "S"
      ) {
        this.DETALLE_HISTORIA.aiepi9501.var_neonato.prob_alim_grave = 1;
        CON851("EP", "EP", null, "warning", "Advertencia");
      } else this.DETALLE_HISTORIA.aiepi9501.var_neonato.prob_alim_grave = 0;

      this.guardarDetalle9501(this.validarTendenciaPeso, () => {
        CON851("", "Signos extendidos guardados", null, "success", "Correcto");
        this.evaluarAlimento();
      });
    },
    evaluarAlimento() {
      if (this.global_AIEPI002.serv == "08") this.validarEdadPrimerAlimento();
      else {
        this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_edad == "00";

        this.DETALLE_HISTORIA.aiepi9501.nino_6meses = {
          rec_liqui: "",
          rec_leche_for: "",
          rec_leche_otr: "",
          rec_espeso: "",
        };

        this.textos.lactancia_materna_exclusiva = "";
        this.textos.alimentacion_complementaria = "";

        this.validarFactorRiesgo();
      }
    },
    validarEdadPrimerAlimento() {
      validarInputs(
        {
          form: "#validarEdadPrimerAlimento",
          orden: "1",
        },
        () => this.validarTendenciaPeso(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_edad = isNaN(
            parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_edad)
          )
            ? "00"
            : parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.ali_edad).toString();

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

          var nino = this.DETALLE_HISTORIA.aiepi9501.nino_6meses;
          if (
            nino.rec_liqui == "N" &&
            nino.rec_leche_for == "N" &&
            nino.rec_leche_otr == "N" &&
            nino.rec_espeso == "N"
          ) {
            this.textos.lactancia_materna_exclusiva = "SI";
            this.textos.alimentacion_complementaria = "NO";
          } else {
            this.textos.lactancia_materna_exclusiva = "NO";
            this.textos.alimentacion_complementaria = "SI";
          }

          this.guardarDetalle9501(this.validarRecibioSopa_alimentos, () => {
            CON851("", "Alimentos guardados", null, "success", "Correcto");
            this.validarFactorRiesgo();
          });
        }
      );
    },
    validarFactorRiesgo() {
      validarInputs(
        {
          form: "#validarFactorRiesgo",
          orden: "1",
        },
        () => {
          if (this.global_AIEPI002.serv == "08") this.validarRecibioSopa_alimentos();
          else this.validarTendenciaPeso();
        },
        () => {
          this.DETALLE_HISTORIA.aiepi9501.signo_desarr.desobs = this.DETALLE_HISTORIA.aiepi9501.signo_desarr.desobs
            .toUpperCase()
            .trim();

          this.llamarAIEPI826();
        }
      );
    },
    escAIEPI826() {
      this.params_aiepi826.paso = 0;
      this.validarFactorRiesgo();
    },
    llamarAIEPI826() {
      console.log("entra a 826");
      this.DETALLE_HISTORIA.aiepi9501.signo_desarr.desarr = "S";
      //////// las respuestas se envian al cargar el detalle
      setTimeout(() => (this.params_aiepi826.paso = 1), 300);
    },
    llamar2daVezAIEPI826() {
      this.params_aiepi826.respuestas = this.DETALLE_HISTORIA.aiepi9501.signo_desarr.des_test_act_ant;
      this.params_aiepi826.paso = 2;
    },
    finAIEPI826(param, resultado, limite) {
      this.DETALLE_HISTORIA.aiepi9501.signo_desarr.desact = resultado;

      switch (this.params_aiepi826.paso) {
        case 1:
          this.DETALLE_HISTORIA.aiepi9501.signo_desarr.des_test_act = param;
          this.DETALLE_HISTORIA.aiepi9501.signo_desarr.des_limi_act = limite;
          break;
        case 2:
          this.DETALLE_HISTORIA.aiepi9501.signo_desarr.des_test_act = ["", "", "", "", "", "", "", ""];
          this.DETALLE_HISTORIA.aiepi9501.signo_desarr.des_test_act_ant = param;
          this.DETALLE_HISTORIA.aiepi9501.signo_desarr.des_limi_act_Ant = limite;
          break;
      }

      if (this.params_aiepi826.paso == 2) {
        this.params_aiepi826.paso = 0;
        this.llamarAIEPI845B();
      } else {
        if (resultado == 0 && this.global_AIEPI002.edad_dias > 30) this.llamar2daVezAIEPI826();
        else {
          this.params_aiepi826.paso = 0;
          this.llamarAIEPI845B();
        }
      }
    },
    escAIEPI845B() {
      this.params_aiepi845b.estado = false;
      this.llamarAIEPI826();
    },
    llamarAIEPI845B() {
      this.params_aiepi845b.estado = true;
    },
    finAIEPI845B(param) {
      this.params_aiepi845b.estado = false;

      this.DETALLE_HISTORIA.aiepi9501.signo_desarr = param;
      this.evaluarDesarrollo();
    },
    evaluarDesarrollo() {
      let contar_w = 0;
      let PESO_NACE = parseFloat(this.global_AIEPI002.signos.peso_nacer);
      let EDAD_GEST = parseInt(this.global_AIEPI002.signos.edad_gestacional);
      let DESARR = this.DETALLE_HISTORIA.aiepi9501.signo_desarr;
      let EDAD_DIAS = parseInt(this.global_AIEPI002.edad_dias);
      let resultado = this.DETALLE_HISTORIA.aiepi9501.signo_desarr.desact;
      let limite = this.DETALLE_HISTORIA.aiepi9501.signo_desarr.des_limi_act;
      let limite_ant = this.DETALLE_HISTORIA.aiepi9501.signo_desarr.des_limi_act_Ant;
      let PER_CEF_ESTAD = parseInt(this.DETALLE_HISTORIA.aiepi9501.signo_desnut.per_cef_estad);

      const VAR_DESARR = {
        retraso_grave: 0,
        retraso_riesgo: 0,
        desarro_riesgo: 0,
        desarro_normal: 0,
      };

      if (PESO_NACE < 2000) contar_w += 1;
      else if (EDAD_GEST < 35 || EDAD_GEST > 40) contar_w += 1;
      else if (DESARR.des_prob_embar == "S") contar_w += 1;
      else if (DESARR.des_prob_parto == "S") contar_w += 1;
      else if (DESARR.des_prob_salud == "S") contar_w += 1;
      else if (DESARR.des_prob_paren == "S") contar_w += 1;
      else if (DESARR.des_prob_disca == "S") contar_w += 1;
      else if (DESARR.des_prob_entor == "S") contar_w += 1;
      else if (DESARR.des_prob_desar == "S") contar_w += 1;

      if (
        (EDAD_DIAS < 31 && resultado < limite) ||
        (EDAD_DIAS > 30 && resultado < limite_ant) ||
        PER_CEF_ESTAD < -2 ||
        PER_CEF_ESTAD > 2 ||
        contar_w > 2
      ) {
        VAR_DESARR.retraso_grave = 1;
        CON851("BH", "BH", null, "warning", "Advertencia");
      } else if (resultado < limite) {
        VAR_DESARR.retraso_riesgo = 1;
        CON851("AY", "AY", null, "warning", "Advertencia");
      } else if (contar_w > 0) {
        VAR_DESARR.desarro_riesgo = 1;
        CON851("AZ", "AZ", null, "warning", "Advertencia");
      } else if (DESARR.desarr == "S") {
        VAR_DESARR.desarro_normal = 1;
        CON851("A0", "A0", null, "warning", "Advertencia");
      }

      this.DETALLE_HISTORIA.aiepi9501.var_desarrollo = VAR_DESARR;

      this.guardarDetalle9501(this.llamarAIEPI845B, () => {
        CON851("", "Desarrollo guardado", null, "success", "Correcto");
        this.validarAntitetanica_1();
      });
    },
    validarAntitetanica_1() {
      validarInputs(
        {
          form: "#validarAntitetanica_1",
          orden: "1",
        },
        () => this.llamarAIEPI845B(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_tetanica1 =
            this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_tetanica1.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarAntitetanica_2();
        }
      );
    },
    validarAntitetanica_2() {
      validarInputs(
        {
          form: "#validarAntitetanica_2",
          orden: "1",
        },
        () => this.validarAntitetanica_1(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_tetanica2 =
            this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_tetanica2.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarBcg();
        }
      );
    },
    validarBcg() {
      validarInputs(
        {
          form: "#validarBcg",
          orden: "1",
        },
        () => this.validarAntitetanica_2(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_bcg =
            this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_bcg.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarVop();
        }
      );
    },
    validarVop() {
      validarInputs(
        {
          form: "#validarVop",
          orden: "1",
        },
        () => this.validarBcg(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop1 =
            this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vavop1.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarHepb();
        }
      );
    },
    validarHepb() {
      validarInputs(
        {
          form: "#validarHepb",
          orden: "1",
        },
        () => this.validarVop(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_hepb1 =
            this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.vac_hepb1.toUpperCase().trim() != "S" ? "N" : "S";

          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.proxvac_ano.trim() == ""
            ? moment().format("YYYY")
            : this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.proxvac_ano.trim();
          this.validarAnoProxVac();
        }
      );
    },
    validarAnoProxVac() {
      validarInputs(
        {
          form: "#validarAnoProxVac",
          orden: "1",
        },
        () => this.validarHepb(),
        () => {
          let ano = parseInt(this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.proxvac_ano) || 0;
          let ano_actual = parseInt(moment().format("YYYY"));
          let ano_max = ano_actual + 3;

          if (ano == 0) {
            this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.proxvac_ano = "0000";
            this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.proxvac_mes = "00";
            this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.proxvac_dia = "00";
            this.guardarVacunacion();
          } else if (ano < ano_actual || ano > ano_max) {
            CON851("37", "37", null, "error", "Error");
            this.validarAnoProxVac();
          } else {
            this.validarMesProxVac();
          }
        }
      );
    },
    validarMesProxVac() {
      validarInputs(
        {
          form: "#validarMesProxVac",
          orden: "1",
        },
        () => this.validarAnoProxVac(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.proxvac_mes = cerosIzq(
            this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.proxvac_mes,
            2
          );
          let ano = parseInt(this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.proxvac_ano) || 0;
          let ano_actual = parseInt(moment().format("YYYY"));
          let mes = parseInt(this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.proxvac_mes) || 0;
          let mes_actual = parseInt(moment().format("MM"));

          if ((ano == ano_actual && mes < mes_actual) || mes > 12 || mes < 1) {
            CON851("37", "37", null, "error", "Error");
            this.validarMesProxVac();
          } else {
            this.validarDiaProxVac();
          }
        }
      );
    },
    validarDiaProxVac() {
      validarInputs(
        {
          form: "#validarDiaProxVac",
          orden: "1",
        },
        () => this.validarMesProxVac(),
        () => {
          this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.proxvac_dia = cerosIzq(
            this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.proxvac_dia,
            2
          );
          let ano = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.proxvac_ano;
          let ano_actual = parseInt(moment().format("YYYY"));
          let mes = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.proxvac_mes;
          let mes_actual = parseInt(moment().format("MM"));
          let dia = this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.proxvac_dia;
          let dia_actual = parseInt(moment().format("DD"));

          if (
            (parseInt(ano) == ano_actual && parseInt(mes) == mes_actual && parseInt(dia) < dia_actual) ||
            !_validarFecha(ano, mes, dia)
          ) {
            CON851("37", "37", null, "error", "Error");
            this.validarDiaProxVac();
          } else {
            this.guardarVacunacion();
          }
        }
      );
    },
    guardarVacunacion() {
      this.guardarDetalle9501(this.validarAnoProxVac, () => {
        CON851("", "Vacunacion guardada", null, "success", "Correcto");
        this.validarExamenFisico();
      });
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
          if (this.DETALLE_HISTORIA.aiepi9501.sig_vacunacion.proxvac_ano == "0000") this.validarAnoProxVac();
          else this.validarDiaProxVac();
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
          _this.llamdadoPYP2();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error guardando examen fisico", null, "error", "Error");
          _this.validarExamenFisico();
        });
    },
    llamdadoPYP2() {
      if (this.global_AIEPI002.serv == "08") {
        this.mostrarPYP2 = true;
        setTimeout(() => (this.paramsPYP2.estado = 1), 300);
      } else {
        this.llamadoHC_9010();
      }
    },
    escPYP2() {
      this.paramsPYP2.estado = false;
      this.validarExamenFisico();
    },
    salirPYP2() {
      this.paramsPYP2.estado = false;
      this.llamadoHC_9010();
    },
    escHC_9010() {
      this.params_hc9010.estado = false;

      if (this.global_AIEPI002.serv == "08") this.paramsPYP2.estado = 2;
      else this.validarExamenFisico();
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
      this.llamadoHC_9010();
    },
    llamadoHC_9011() {
      var valido = false;

      switch (this.global_AIEPI002.rips.finalidad) {
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

      if (this.global_AIEPI002.serv == "08" && valido) {
        this.mostrarHC9011 = true;
        setTimeout(() => (this.params_hc9011.estado = true), 300);
      } else {
        this.evaluarCodDiagPredeter();
      }
    },
    finHC_9011() {
      this.params_hc9011.estado = false;
      this.evaluarCodDiagPredeter();
    },
    evaluarCodDiagPredeter() {
      if (this.global_AIEPI002.rips.tabla_diag[0].diagn.trim() == "" && this.global_AIEPI002.serv == "08")
        this.global_AIEPI002.rips.tabla_diag[0].diagn = "Z001";
      ////// FALTA AGREGAR MAS CONDICIONES DE DIAGNOSTICOS PREDETERMINADOS
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
          this.inputEnfer.nombre = "#CodDiag_" + pos + "_AIEPI002";
          break;
        case 2:
          this.inputEnfer.nombre = "#diagnosMuerte_AIEPI002";
          break;
      }
      _fin_validar_form();
      this.mostrarEnfermedades = true;
    },
    successVentanaEnfermedades(data) {
      this.mostrarEnfermedades = false;

      switch (this.inputEnfer.tipo) {
        case 1:
          this.global_AIEPI002.rips.tabla_diag[this.inputEnfer.pos].diagn = data.cod;
          this.validarCod_diagnosticos(this.inputEnfer.pos);
          break;
        case 2:
          this.global_AIEPI002.cierre.diag_muer = data.cod;
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
          form: "#validarCod_diag_" + pos + "_AIEPI002",
          orden: "1",
          event_f3: () => {
            if (this.global_AIEPI002.rips.tabla_diag[0].diagn.trim() == "") {
              CON851("02", "02", null, "error", "Error");
              this.validarCod_diagnosticos(pos);
            } else {
              this.consultarCodigoEnf(pos, 1, true);
            }
          },
        },
        () => {
          if (pos == 0) this.llamadoHC_9011();
          else this.validarCod_diagnosticos(pos - 1);
        },
        () => {
          if (this.global_AIEPI002.rips.tabla_diag[pos].diagn.trim() == "") {
            if (pos == 0) {
              CON851("02", "02", null, "error", "Error");
              this.validarCod_diagnosticos(pos);
            } else {
              this.global_AIEPI002.rips.tabla_diag[pos].descrip = "";
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
          codigo_envio = this.global_AIEPI002.rips.tabla_diag[pos].diagn.toUpperCase().trim();
          this.$nextTick(function () {
            Vue.set(_this.global_AIEPI002.rips.tabla_diag[pos], "diagn", codigo_envio);
          });
          break;
        case 2:
          codigo_envio = this.global_AIEPI002.cierre.diag_muer;
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
          this.global_AIEPI002.rips.tabla_diag[pos].descrip = "ENFERMEDAD NO ENCONTRADA";
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
      this.global_AIEPI002.rips.tabla_diag[pos].descrip = enf.NOMBRE_ENF.replace(/\s\s+/g, " ");

      var primer_caracter = this.global_AIEPI002.rips.tabla_diag[pos].diagn.substring(0, 1);

      if (enf.SEXO_ENF.trim() != "" && enf.SEXO_ENF != this.datos_paciente.SEXO) {
        CON851("73", "73", null, "error", "Error");
        this.validarCod_diagnosticos(pos);
      } else if (primer_caracter == "Z" && (this.global_AIEPI002.serv == "01" || this.global_AIEPI002.serv == "02")) {
        CON851("03", "03", null, "error", "Error");
        this.validarCod_diagnosticos(pos);
      } else if (primer_caracter == "R" && $_USUA_GLOBAL[0].NIT.toString().trim() == "800037021") {
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
          codigo: this.global_AIEPI002.rips.tabla_diag[pos].diagn,
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
      this.global_AIEPI002.rips.tabla_diag = this.global_AIEPI002.rips.tabla_diag.filter((el) => el.diagn.trim());
      while (this.global_AIEPI002.rips.tabla_diag.length < 10) {
        this.global_AIEPI002.rips.tabla_diag.push({ nro: "", diagn: "", descrip: "" });
      }

      this.guardarHistoria(
        () => this.validarCod_diagnosticos(pos),
        () => {
          CON851("", "Diagnosticos guardados", null, "success", "Correcto");
          this.llamadoSintomatico();
        }
      );
    },
    validarEsc_sintomatico() {
      this.params_hc890d.estado = false;
      this.validarCod_diagnosticos(0);
    },
    llamadoSintomatico() {
      this.params_hc890d.estado = true;
      this.params_hc890d.unserv = this.global_AIEPI002.serv;
      this.params_hc890d.finalidad = this.global_AIEPI002.rips.finalidad;
    },
    async validarCallback_sintomatico(param) {
      this.params_hc890d.estado = false;
      this.sintomaticos = param;

      this.global_AIEPI002.signos.sintom_resp = this.sintomaticos.sintom_resp;
      this.global_AIEPI002.signos.sintom_piel = this.sintomaticos.sintom_piel;
      this.global_AIEPI002.signos.contacto_lepra = this.sintomaticos.contacto_lepra;
      this.global_AIEPI002.signos.victi_maltrato = this.sintomaticos.victi_maltrato;
      this.global_AIEPI002.signos.victi_violencia = this.sintomaticos.victi_violencia;
      this.global_AIEPI002.signos.enfer_mental = this.sintomaticos.enfer_mental;
      this.global_AIEPI002.signos.enfer_its = this.sintomaticos.enfer_its;
      this.global_AIEPI002.signos.cual_its = this.sintomaticos.cual_its;
      this.global_AIEPI002.signos.trata_its = this.sintomaticos.trata_its;
      this.global_AIEPI002.signos.cancer_seno = this.sintomaticos.cancer_seno;
      this.global_AIEPI002.signos.cancer_cervis = this.sintomaticos.cancer_cervis;
      this.global_AIEPI002.signos.edu_autoexa_seno = this.sintomaticos.edu_autoexa_seno;
      this.global_AIEPI002.signos.citologia_previa = this.sintomaticos.citologia_previa;
      this.global_AIEPI002.signos.fecha_cito_previa = this.sintomaticos.fecha_cito_previa;
      this.global_AIEPI002.signos.resul_cito_previa = this.sintomaticos.resul_cito_previa;
      this.global_AIEPI002.signos.fecha_ult_mamo = this.sintomaticos.fecha_ult_mamo;

      this.guardarHistoria(this.llamadoSintomatico, async () => {
        CON851("", "Sintomatico guardado", null, "success", "Correcto");
        await this.evaluarDiagnosticos();

        if (this.mostrarBajoPeso) this.llamarBajoPesoNacer();
        else if (this.mostrarAnomaliasCong) this.llamarAnomaliasCongenitas();
        else if (this.mostrarSifilis) this.llamarSifilis();
        else if (this.mostrarEvaluacionDNT) this.llamarEvaluacionDNT();
        else this.evaluarRecomendaciones();
      });
    },
    llamarBajoPesoNacer() {
      this.paramsBajoPesoNacer.estado = true;
    },
    escBajoPesoNacer() {
      this.paramsBajoPesoNacer.estado = false;
      this.llamadoSintomatico();
    },
    finBajoPesoNacer(params) {
      this.paramsBajoPesoNacer.estado = false;

      this.DETALLE_HISTORIA.aiepi9501.dato_bajo_peso = params;

      if (this.mostrarAnomaliasCong) this.llamarAnomaliasCongenitas();
      else if (this.mostrarSifilis) this.llamarSifilis();
      else if (this.mostrarEvaluacionDNT) this.llamarEvaluacionDNT();
      else this.guardarDiagnosticosExtendidos();
    },
    llamarAnomaliasCongenitas() {
      setTimeout(() => (this.paramsHC832A.estado = true), 300);
    },
    escAnomaliasCongenitas() {
      this.paramsHC832A.estado = false;

      if (this.mostrarBajoPeso) this.llamarBajoPesoNacer();
      else this.llamadoSintomatico();
    },
    finAnomaliasCongenitas(param) {
      this.paramsHC832A.estado = false;
      this.global_AIEPI002.anomalias_congenitas = param;
      console.log(this.global_AIEPI002.anomalias_congenitas);

      if (this.mostrarSifilis) this.llamarSifilis();
      else if (this.mostrarEvaluacionDNT) this.llamarEvaluacionDNT();
      else this.guardarDiagnosticosExtendidos();
    },
    llamarSifilis() {
      this.params_sifilis.estado = true;
    },
    escSifilis() {
      this.params_sifilis.estado = false;

      if (this.mostrarAnomaliasCong) this.llamarAnomaliasCongenitas();
      else if (this.mostrarBajoPeso) this.llamarBajoPesoNacer();
      else this.llamadoSintomatico();
    },
    async finSifilis(param) {
      this.params_sifilis.estado = false;
      this.tratamiento_sifilis = param;

      await this.desorganizarTratamientoSifilis();

      console.log(this.global_AIEPI002.tratamiento_sifilis);

      if (this.mostrarEvaluacionDNT) this.llamarEvaluacionDNT();
      else this.guardarDiagnosticosExtendidos();
    },
    llamarEvaluacionDNT() {
      this.paramsEvaluacionDNT.estado = true;
    },
    escEvaluacionDNT() {
      this.paramsEvaluacionDNT.estado = false;

      if (this.mostrarSifilis) this.llamarSifilis();
      else if (this.mostrarAnomaliasCong) this.llamarAnomaliasCongenitas();
      else if (this.mostrarBajoPeso) this.llamarBajoPesoNacer();
      else this.llamadoSintomatico();
    },
    finEvaluacionDNT(param) {
      this.paramsEvaluacionDNT.estado = false;
      this.DETALLE_HISTORIA.aiepi9501.control_desarrollo = param;

      this.guardarDiagnosticosExtendidos();
    },
    async guardarDiagnosticosExtendidos() {
      let error = false;

      if (this.mostrarSifilis || this.mostrarAnomaliasCong) {
        await this.guardarHistoria(
          () => (error = true),
          () => console.log("termina diagnostico extendidos hist")
        );
      }

      if (this.mostrarBajoPeso || this.mostrarEvaluacionDNT) {
        await this.guardarDetalle9501(
          () => (error = true),
          () => console.log("termina diagnostico extendidos detal")
        );
      }

      if (error) {
        if (this.mostrarBajoPeso) this.llamarBajoPesoNacer();
        else if (this.mostrarAnomaliasCong) this.llamarAnomaliasCongenitas();
        else if (this.mostrarSifilis) this.llamarSifilis();
        else if (this.mostrarEvaluacionDNT) this.llamarEvaluacionDNT();
        else this.llamadoSintomatico();
      } else {
        CON851("", "Diagnosticos extendidos guardados", null, "success", "Correcto");
        this.evaluarRecomendaciones();
      }
    },
    evaluarRecomendaciones() {
      var VAR_DIARR = this.DETALLE_HISTORIA.aiepi9501.var_diarr;
      var DIARR = this.DETALLE_HISTORIA.aiepi9501.signo_diare;
      var NEONATO = this.DETALLE_HISTORIA.aiepi9501.var_neonato;

      this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volinme =
        this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volinme.trim() == ""
          ? "Cuando no puede beber ni tomar pecho, vomita todo, empeora o no se ve bien, aparece fiebre"
          : this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volinme.trim();

      if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volcontr.trim() == "") {
        if (
          NEONATO.infec_local == 1 ||
          VAR_DIARR.diarre_deshi == 1 ||
          VAR_DIARR.diarre_riesg == 1 ||
          VAR_DIARR.diarre_leve == 1 ||
          VAR_DIARR.diarre_pers_leve == 1 ||
          VAR_DIARR.disenteria == 1 ||
          NEONATO.prob_alim_leve == 1
        ) {
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.volcontr = "Dentro de 2 dias";
          this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.refconsul = "Medicina general";
        }

        var mensaje_2 = "";
        if (DIARR.diarre == "S") {
          if (parseInt(this.global_AIEPI002.edad_dias) < 181) {
            mensaje_2 += "Debe ser amamantado exclusivamente\n";
          } else {
            mensaje_2 += "Alimentos nutritivos y prácticas higiénicas cuando se preparan\n";
          }
          mensaje_2 +=
            "Recoger agua de la fuente mas limpia, almacenarla en recipientes limpias, hervirla.\n Lavado de manos siempre, inocuidad de los alimentos, uso de letrinas, vacuna contra rotavirus";
        } else {
          mensaje_2 += "18 prácticas de vida saludable, ";

          if (parseInt(this.global_AIEPI002.edad_dias) < 181) {
            mensaje_2 += "lactancia materna exclusiva";
          } else {
            mensaje_2 += "lactancia materna complementaria, dar alimentos ricos en zinc, hierro, vitamina A";
          }
        }

        this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.medprev = mensaje_2;
      }

      if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.recomtrato.trim() == "") {
        this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.recomtrato =
          "Orientar a la madre para que todos los miembros de la familia mantengan un diálogo con el niño buscando un contacto visual. Enseñar a los padres que deben hablarle mientras lo alimenta con voz suave y tranquila";
      }

      this.validarRecomendacionesAlarma();
    },
    validarRecomendacionesAlarma() {
      validarInputs(
        {
          form: "#validarRecomendacionesAlarma",
          orden: "1",
        },
        () => this.llamadoSintomatico(),
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
            this.guardarDetalle9501(this.validarVitamina_A, () => {
              CON851("", "Recomendaciones guardadas", null, "success", "Correcto");
              this.validarTratar();
            });
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

          this.guardarDetalle9501(this.validarProximaVitamina_A, () => {
            CON851("", "Recomendaciones guardadas", null, "success", "Correcto");
            this.validarTratar();
          });
        }
      );
    },
    validarTratar() {
      validarInputs(
        {
          form: "#validar_tratar",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.aiepi9501.signo_alimentacion.vitaminaA == "S") this.validarProximaVitamina_A();
          else this.validarVitamina_A();
        },
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
          CON851("", "Enfermedad actual guardada", null, "success", "Correcto");
          _this.capturarTipoDiagnostico();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error guardando enfermedad actual", null, "error", "Error");
          _this.validarTratar();
        });
    },
    capturarTipoDiagnostico() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Tipo de diagnóstico",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.tipos_diagnostico,
            callback_f: () => this.validarTratar(),
            seleccion: this.global_AIEPI002.rips.tipo_diag,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_AIEPI002.rips.tipo_diag = data.COD;

            if (_this.global_AIEPI002.rips.finalidad == "11") {
              _this.validarDatoCronico();
            } else if (_this.global_AIEPI002.rips.finalidad == "08") {
              _this.global_AIEPI002.rips.primera_vez = "";
              _this.global_AIEPI002.rips.dia_primera_vez = "";
              _this.global_AIEPI002.rips.mes_primera_vez = "";
              _this.global_AIEPI002.rips.ano_primera_vez = "";
              _this.evaluarEstadoSalida();
            } else {
              _this.global_AIEPI002.rips.cronico = "";
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
          document.getElementById("codPatologia_AIEPI002").focus();
        },
        callback: (data) => {
          _this.global_AIEPI002.rips.cronico = data.COD;
          setTimeout(() => _enterInput("#codPatologia_AIEPI002"), 100);
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

          if (this.global_AIEPI002.rips.cronico.trim() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarDatoCronico();
          } else {
            this.global_AIEPI002.rips.cronico = cerosIzq(this.global_AIEPI002.rips.cronico, 3);

            var busqueda = this.patologias_cronicas.find((x) => x.COD == this.global_AIEPI002.rips.cronico);

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
          if (this.global_AIEPI002.rips.finalidad == "11") this.validarDatoCronico();
          else this.capturarTipoDiagnostico();
        },
        () => {
          this.global_AIEPI002.rips.primera_vez =
            this.global_AIEPI002.rips.primera_vez.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.global_AIEPI002.rips.primera_vez == "S") this.evaluarEstadoSalida();
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
          this.global_AIEPI002.rips.dia_primera_vez = cerosIzq(this.global_AIEPI002.rips.dia_primera_vez, 2);

          if (parseInt(this.global_AIEPI002.rips.dia_primera_vez) == 0) {
            this.global_AIEPI002.rips.mes_primera_vez = "00";
            this.global_AIEPI002.rips.ano_primera_vez = "0000";
            this.evaluarEstadoSalida();
          } else if (parseInt(this.global_AIEPI002.rips.dia_primera_vez) > 31) {
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
          this.global_AIEPI002.rips.mes_primera_vez = cerosIzq(this.global_AIEPI002.rips.mes_primera_vez, 2);

          if (
            parseInt(this.global_AIEPI002.rips.mes_primera_vez) > 12 ||
            parseInt(this.global_AIEPI002.rips.mes_primera_vez) == 0
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
          this.global_AIEPI002.rips.ano_primera_vez = cerosIzq(this.global_AIEPI002.rips.ano_primera_vez, 4);

          var fecha_rips =
            this.global_AIEPI002.rips.ano_primera_vez +
            this.global_AIEPI002.rips.mes_primera_vez +
            this.global_AIEPI002.rips.dia_primera_vez;
          console.log(fecha_rips);

          if (parseInt(this.global_AIEPI002.rips.ano_primera_vez) == 0) {
            CON851("37", "37", null, "error", "Error");
            this.validarAnoPrimeraVez();
          } else if (parseInt(this.global_AIEPI002.fecha) < parseInt(fecha_rips)) {
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
      setTimeout(() => {
        POPUP(
          {
            titulo: "Estado de salida",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.estadoSalidaRips,
            callback_f: () => {
              if (this.global_AIEPI002.rips.finalidad == "08") {
                this.capturarTipoDiagnostico();
              } else {
                this.validarPrimeraVez();
              }
            },
            seleccion: this.global_AIEPI002.rips.estado_sal,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_AIEPI002.rips.estado_sal = data.COD;

            switch (_this.global_AIEPI002.rips.estado_sal) {
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
    validarDiagnosticoMuerte() {
      validarInputs(
        {
          form: "#validarDiagMuerte",
          orden: "1",
        },
        () => this.evaluarEstadoSalida(),
        () => {
          this.global_AIEPI002.cierre.diag_muer = this.global_AIEPI002.cierre.diag_muer.toUpperCase().trim();

          this.consultarCodigoEnf(null, 2);
        }
      );
    },
    validarDiagMuerte(enf) {
      this.textos.diagnostico_muerte = enf.NOMBRE_ENF.replace(/\s\s+/g, " ");

      if (enf.SEXO_ENF.trim() != "" && enf.SEXO_ENF != this.datos_paciente.SEXO) {
        CON851("73", "73", null, "error", "Error");
        this.validarDiagnosticoMuerte();
      } else this.validarObservacionRips()
    },
    validarRemitido() {
      validarInputs(
        {
          form: "#validarRemitido",
          orden: "1",
        },
        () => this.evaluarEstadoSalida(),
        () => {
          if (this.global_AIEPI002.rips.remitido.trim() == "") {
            CON851("02", "02", null, "error", "Error");
            this.validarRemitido();
          } else {
            this.validarObservacionRips();
          }
        }
      );
    },
    validarObservacionRips() {
      if (this.global_AIEPI002.serv == "01") {
        validarInputs(
          {
            form: "#validarObservacionRips",
            orden: "1",
          },
          () => {
            switch (this.global_AIEPI002.rips.estado_sal) {
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
            this.global_AIEPI002.rips.observ = this.global_AIEPI002.rips.observ.toUpperCase().trim() != "S" ? "N" : "S";

            this.validarTriage();
          }
        );
      } else {
        this.global_AIEPI002.rips.triage = "0";
        this.global_AIEPI002.rips.observ = "";
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
          switch (this.global_AIEPI002.rips.triage) {
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
            if (this.global_AIEPI002.serv == "01") {
              this.validarTriage();
            } else {
              switch (_this.global_AIEPI002.rips.estado_sal) {
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
          _this.grabado_AIEPI002
        );
      }, 300);
    },
    async grabado_AIEPI002() {
      await this.guardarHistoria(this.preguntarGuardado, () => console.log("guarda RIPS"));

      var data = {};

      data["datosh"] =
        datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|" + this.global_AIEPI002.novedad + "|";

      data["RH"] = this.datos_ext.RH;
      data["grupo_sang"] = this.datos_ext.grupo_sang;

      console.log(data);

      var _this = this;

      postData(data, get_url("APP/HICLIN/SAVE_AIEPI002.DLL"))
        .then((data) => {
          console.log(data);
          CON851("", data, null, "success", "Correcto");
          _this.actualizarSisvan();
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
      data["fecha"] = this.global_AIEPI002.fecha;
      data["embarazo"] = "";
      data["tens_media"] = this.global_AIEPI002.signos.tens_m;

      data["edad_dias"] = this.global_AIEPI002.edad_dias;
      data["peso"] = this.global_AIEPI002.signos.peso;
      data["talla"] = this.global_AIEPI002.signos.talla;
      data["per_cef"] = this.global_AIEPI002.signos.per_cef;
      data["imc"] = this.global_AIEPI002.signos.imc;

      data["estad_peso"] = "0";
      data["estad_talla"] = "0";
      data["estad_peso_talla"] = "0";
      data["estad_per_cef"] = "0";
      data["estad_imc"] = this.global_AIEPI002.signos.imc_estad;
      data["finalidad"] = this.global_AIEPI002.rips.finalidad;

      this.global_AIEPI002.rips.tabla_diag.forEach((el, index) => {
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
            datosEnvio() + this.global_AIEPI002.fecha + "|" + localStorage.IDUSU + "|" + this.datos_paciente.COD + "|",
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
      $_REG_HC.fecha_lnk = this.global_AIEPI002.fecha;
      $_REG_HC.hora_lnk = this.global_AIEPI002.hora;
      $_REG_HC.oper_lnk = localStorage.Usuario;
      $_REG_HC.opc_llamado = "1";
      $("#body_main").load("../../HICLIN/paginas/HC002F.html");
    },
    async guardarHistoria(callbackErr, callback) {
      loader("show");
      var datos = _getObjetoHc(this.global_AIEPI002);
      console.log(datos);

      await postData(datos, get_url("APP/HICLIN/SAVE_HC.DLL"))
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
    async guardarDetalle9501(callbackErr, callback) {
      let detal = _getObjetoSaveHc(this.DETALLE_HISTORIA.aiepi9501, filtroArray.tabla9501);
      detal.volinme = detal.volinme.enterReplace();
      detal.medprev = detal.medprev.enterReplace();
      detal.recomtrato = detal.recomtrato.enterReplace();

      await grabarDetalles({ 9501: detal }, $_REG_HC.llave_hc)
        .then(() => {
          callback();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error guardando datos, intente nuevamente", null, "error", "Error");
          callbackErr();
        });
    },
    async evaluarDiagnosticos() {
      var evaluarCodigos = async (iniciales, completo) => {
        let retorno = false;

        this.global_AIEPI002.rips.tabla_diag.forEach(async (item) => {
          let filtro_1 = iniciales.includes(item.diagn.trim().substring(0, 3));
          let filtro_2 = completo.includes(item.diagn.trim());
          if (filtro_1 || filtro_2) retorno = true;
        });
        return retorno;
      };

      this.mostrarBajoPeso = await evaluarCodigos(["P07"], ["P050", "P052"]);
      console.log(this.mostrarBajoPeso, "BAJO PESO");

      this.mostrarSifilis = await evaluarCodigos(
        ["A50", "A51", "A52", "A53", "A65"],
        ["I980", "M031", "N290", "N742", "O981", "R762"]
      );
      console.log(this.mostrarSifilis, "SIFILIS");

      this.mostrarEvaluacionDNT = await evaluarCodigos(["E43", "E44", "E45", "E46", "E64"], []);
      console.log(this.mostrarEvaluacionDNT, "DNT");

      this.mostrarAnomaliasCong = await evaluarCodigos(
        [
          "E00",
          "E03",
          "E25",
          "E32",
          "E70",
          "E71",
          "E72",
          "E74",
          "E75",
          "E76",
          "E77",
          "E78",
          "E79",
          "E80",
          "E83",
          "E84",
          "E85",
          "E88",
          "H90",
          "H91",
          "Q00",
          "Q01",
          "Q02",
          "Q03",
          "Q05",
          "Q35",
          "Q36",
          "Q37",
          "Q41",
          "Q54",
          "Q56",
          "Q60",
          "Q66",
          "Q69",
          "Q70",
          "Q71",
          "Q72",
          "Q77",
          "Q90",
          "Q96",
        ],
        [
          "E703",
          "H470",
          "H55X",
          "H355",
          "Q042",
          "Q070",
          "Q111",
          "Q112",
          "Q120",
          "Q150",
          "Q160",
          "Q172",
          "Q200",
          "Q203",
          "Q204",
          "Q210",
          "Q211",
          "Q212",
          "Q213",
          "Q220",
          "Q221",
          "Q224",
          "Q225",
          "Q226",
          "Q230",
          "Q231",
          "Q250",
          "Q251",
          "Q262",
          "Q300",
          "Q330",
          "Q390",
          "Q391",
          "Q422",
          "Q423",
          "Q431",
          "Q522",
          "Q614",
          "Q620",
          "Q641",
          "Q645",
          "Q743",
          "Q750",
          "Q780",
          "Q790",
          "Q792",
          "Q793",
          "Q794",
          "Q860",
          "Q894",
          "Q913",
          "Q917",
        ]
      );
      console.log(this.mostrarAnomaliasCong, "ANOM");
    },
    validarRangosOMS(filtro, dato) {
      console.log(dato);
      var edad_meses = parseInt(this.global_AIEPI002.edad_dias) / 30;
      var mult = parseInt(this.global_AIEPI002.signos.talla) * 10;

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
        var limite = parseInt(edadMeses) < 1 ? 3 : parseInt(edadMeses) + 2;

        for (var i = 1; i < limite; i++) {
          var busqueda_oms = _this.TABLAS_OMS.find(
            (x) => x.CODIGO.trim() == codigo && x.SEXO == _this.datos_paciente.SEXO && parseInt(x.RANGO) == i
          );

          info_grafica.meses.push(i);

          if (busqueda_oms) {
            info_grafica.oms_2.push({
              x: i,
              y: parseFloat(busqueda_oms.DATO_2),
            });
            info_grafica.oms_1.push({
              x: i,
              y: parseFloat(busqueda_oms.DATO_1),
            });
            info_grafica.oms_0.push({
              x: i,
              y: parseFloat(busqueda_oms.DATO_0),
            });
            info_grafica.oms_M1.push({
              x: i,
              y: parseFloat(busqueda_oms.DATO_M1),
            });
            info_grafica.oms_M2.push({
              x: i,
              y: parseFloat(busqueda_oms.DATO_M2),
            });
          }

          var busqueda_sisvan = _this.SISVAN.TABLA.find((x) => parseInt(x.EDAD_MES) == i);

          if (busqueda_sisvan) {
            switch (codigo) {
              case "TXE":
                info_grafica.paci.push({
                  x: i,
                  y: parseFloat(busqueda_sisvan.TALLA),
                });
                break;
              case "PXE":
                info_grafica.paci.push({
                  x: i,
                  y: parseFloat(busqueda_sisvan.PESO),
                });
                break;
              case "IMC":
                info_grafica.paci.push({
                  x: i,
                  y: parseFloat(busqueda_sisvan.IMC),
                });
                break;
              case "CEF":
                info_grafica.paci.push({
                  x: i,
                  y: parseFloat(busqueda_sisvan.PER_CEF),
                });
                break;
            }
          }
        }
      } else {
        this.SISVAN.TABLA.forEach((element) => {
          if (parseInt(element.TALLA) > 0 && parseInt(element.PESO) > 0) {
            info_grafica.paci.push({
              x: parseInt(element.TALLA),
              y: parseFloat(element.PESO),
            });
          }
        });

        for (var i = 450; i < 800; i++) {
          var busqueda_oms_pxt = _this.TABLAS_OMS.find(
            (x) => x.CODIGO.trim() == codigo && x.SEXO == _this.datos_paciente.SEXO && parseInt(x.RANGO) == i
          );

          info_grafica.meses.push(i / 10);

          if (busqueda_oms_pxt) {
            info_grafica.oms_3.push({
              x: i / 10,
              y: parseFloat(busqueda_oms_pxt.DATO_3),
            });
            info_grafica.oms_2.push({
              x: i / 10,
              y: parseFloat(busqueda_oms_pxt.DATO_2),
            });
            info_grafica.oms_1.push({
              x: i / 10,
              y: parseFloat(busqueda_oms_pxt.DATO_1),
            });
            info_grafica.oms_0.push({
              x: i / 10,
              y: parseFloat(busqueda_oms_pxt.DATO_0),
            });
            info_grafica.oms_M1.push({
              x: i / 10,
              y: parseFloat(busqueda_oms_pxt.DATO_M1),
            });
            info_grafica.oms_M2.push({
              x: i / 10,
              y: parseFloat(busqueda_oms_pxt.DATO_M2),
            });
            info_grafica.oms_M3.push({
              x: i / 10,
              y: parseFloat(busqueda_oms_pxt.DATO_M3),
            });
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

      this.graficas.talla.graf = new Chart(document.getElementById("grafica_talla_AIEPI002").getContext("2d"), {
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
          maintainAspectRatio: false,
          responsive: true,
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

      this.graficas.peso_edad.graf = new Chart(document.getElementById("grafica_peso_edad_AIEPI002").getContext("2d"), {
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
          maintainAspectRatio: false,
          responsive: true,
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
        document.getElementById("grafica_peso_talla_AIEPI002").getContext("2d"),
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
            maintainAspectRatio: false,
            responsive: true,
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

      this.graficas.imc.graf = new Chart(document.getElementById("grafica_IMC_AIEPI002").getContext("2d"), {
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
          maintainAspectRatio: false,
          responsive: true,
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

      this.graficas.per_cef.graf = new Chart(document.getElementById("grafica_PerCef_AIEPI002").getContext("2d"), {
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
          maintainAspectRatio: false,
          responsive: true,
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
        hcprc: this.global_AIEPI002,
        paci: $_REG_PACI,
        graficas: this.graficasPDF,
        callback: () => {
          console.log("TERMINA GRAFICAS");
        },
      });
    },
    botonFlujo(param) {},
    salir_AIEPI002() {
      _regresar_menuhis();
    },
  },
});
