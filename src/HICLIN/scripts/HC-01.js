/*nit clientes
  * 892000401 - Nn
  * 800162035 - Nn
  * 800074996 - Nn
  * 901146885 - Nn
  * 900450008 - Nn
  * 900541158 - Nn
  * 832002436 - Nn
  * 900566047 - Nn
  * 822001570 - Nn
  * 900565371 - Nn
  * 800037202 - Nn

  * 844003225 - Ese Yopal
  * 900005594 - Ese Granada
  * 892000264 - ese acacias
  * 
  * 800037021 - H. Granada
  * 830511298 - multisalud
  * 900405505 - famedic
  * 845000038 - H. Mitu
  * 892000458 - H. San martin
  * 800037979 - H. Puerto lopez
  * 
  * 900004059 - H. Castilla
  * 844001287 - H. tauramena
  * 900306771 - MATSULDANY
  * 900077520 - San carlos de guaroa

  * 800175901 - Clinica emperatriz
*/

// pendiente f2 que llama HC002N cuando captura procedencia "fase_procedencia_hc_01"
// pendiente ventana urgencias que si "hc_01.sw_var.urg" es true y serv es 51 la abre si no continua con antecedentes familiares (al iniciar pag2)
// pendientes agregar componentes AIEPI845, HC845A, AIEPI845A Y HC845B "fase_af_hc_01"
// pendiente agregar ventana otros antecedentes despues de capturar antecedentes alergicos "fase_alergicos_hc_01"
// pendiente agregar ventana de fuma despues de otros antecedentes "fase_alergicos_hc_01"
// pendiente agregar componente HC890I riesgo VHI sifilis despues de captuar el campo de otros ant "fase_otros_ant_hc_01"
// pendiente ventana de embarazo violencia despues del componente de riesgo VIH, sifilis "fase_otros_ant_hc_01"
// pendiente tabla y captura de genograma despues de ventana de embarazo violencia
// pendiente al calcular imc agregar validaciones de imc con respecto al embarazo
// pendiente componente de discapacidad y tacto rectal despues de capturar examen visual "fase_ojoDerecho_hc_01"
// pendiente ventana de altura uterina despues de abrir componen de discapacidad o tacto rectal
// pendiente cuando termina de grabar pag5 llama HC-9010 INSTRUMENTO VALE como pag6
// pendiente pag7 examen obstetrico

// pendiente ventana de solo ETV despues de multidrogoresistente

// pendiente ventana de cifilis gest despues de ventana solo ETV
// pendiente componente HC832A de anomalias congenitas despues de ventana de cifilis gest
// pendiente ventana de citologias anormales despues del componente de anomalias congenitas
// pendiente ventana de violencia de genero y violencia de genero2 despues de ventana de citologias anormales
// pendiente ventana de trastornos mentales y trastornos mentales2 despues de ventana violencia de genero2
// pendiente ventana de observaciones ment despues de trastornos mentales2
// pendiente ventana requiere mamografia despues de observ ment

const { data } = require("jquery");
const {
  grabarDetalles,
  detallesHc,
} = require("../../HICLIN/scripts/reg_dethc.js");

const {
  getObjRegHC,
} = require("../../HICLIN/scripts/reg_hc.js");

new Vue({
  el: "#hc_01",
  data: {
    dato_4040: detallesHc.WS_4040(),
    dato_2080: detallesHc.WS_2080(),
    dato_9005: detallesHc.WS_9005(),

    descrip: {
      edad: "",
      descripCiclo: "",

      fecha_limi_regla: "",
      ano_regla: "",
      mes_regla: "",
      dia_regla: "",

      ano_parto: "",
      mes_parto: "",
      dia_parto: "",

      ano_citol: "",
      mes_citol: "",
      dia_citol: "",
      descripResultCitol: "",
      descripResultEspec: "",

      codEmba: "",
      descripEmba: "",
      nivelEst: "",

      ano_aseso_pre: "",
      mes_aseso_pre: "",
      dia_aseso_pre: "",

      ano_aseso_pos: "",
      mes_aseso_pos: "",
      dia_aseso_pos: "",

      ano_eco_obst: "",
      mes_eco_obst: "",
      dia_eco_obst: "",

      ano_vac_influ: "",
      mes_vac_influ: "",
      dia_vac_influ: "",

      ano_vac_tdap: "",
      mes_vac_tdap: "",
      dia_vac_tdap: "",

      ano_vac_tt: "",
      mes_vac_tt: "",
      dia_vac_tt: "",

      grupo: "",
      rh: "",
      victConflicto: "",

      indEmb: "",
      ano_vih: "",
      mes_vih: "",
      dia_vih: "",
      resultado_vih1: "",
      resultado_vih2: "",
      resultado_vih3: "",

      ano_serolo: "",
      mes_serolo: "",
      dia_serolo: "",
      resultado_serolo1: "",
      resultado_serolo2: "",
      resultado_serolo3: "",

      ano_hemog: "",
      mes_hemog: "",
      dia_hemog: "",
      resultado_hemog1: "",
      resultado_hemog2: "",
      resultado_hemog3: "",

      ano_igg: "",
      mes_igg: "",
      dia_igg: "",
      resultado_igg1: "",
      resultado_igg2: "",
      resultado_igg3: "",

      ano_glicem: "",
      mes_glicem: "",
      dia_glicem: "",
      resultado_glicem1: "",
      resultado_glicem2: "",
      resultado_glicem3: "",

      ano_hemogra: "",
      mes_hemogra: "",
      dia_hemogra: "",
      resultado_hemogra1: "",
      resultado_hemogra2: "",
      resultado_hemogra3: "",

      ano_hemopara: "",
      mes_hemopara: "",
      dia_hemopara: "",
      resultado_hemopara1: "",
      resultado_hemopara2: "",
      resultado_hemopara3: "",

      ano_fta_abs: "",
      mes_fta_abs: "",
      dia_fta_abs: "",
      resultado_fta_abs1: "",
      resultado_fta_abs2: "",
      resultado_fta_abs3: "",

      ano_uroanali: "",
      mes_uroanali: "",
      dia_uroanali: "",
      resultado_uroanali1: "",
      resultado_uroanali2: "",
      resultado_uroanali3: "",

      ano_uroculti: "",
      mes_uroculti: "",
      dia_uroculti: "",
      resultado_uroculti1: "",
      resultado_uroculti2: "",
      resultado_uroculti3: "",

      ano_frotisv: "",
      mes_frotisv: "",
      dia_frotisv: "",
      resultado_frotisv1: "",
      resultado_frotisv2: "",
      resultado_frotisv3: "",

      ano_glicemia: "",
      mes_glicemia: "",
      dia_glicemia: "",
      resultado_glicemia1: "",
      resultado_glicemia2: "",
      resultado_glicemia3: "",

      ano_hepatB: "",
      mes_hepatB: "",
      dia_hepatB: "",
      resultado_hepatB: "",

      ano_gineco: "",
      mes_gineco: "",
      dia_gineco: "",

      ano_odonto: "",
      mes_odonto: "",
      dia_odonto: "",

      ano_nutri: "",
      mes_nutri: "",
      dia_nutri: "",

      ano_psicol: "",
      mes_psicol: "",
      dia_psicol: "",

      geme_cesa: "",

      tiempo: "",
      espacio: "",
      dinero: "",

      subtotal1: "",
      subtotal2: "",
      subtotal3: "",
      subtotal4: "",
      total: "",

      evaluarHeridas: '',
      tabla_actividades_9005: '',

      bisiesto: '',
      ano_diagDm: '',
      mes_diagDm: '',
      dia_diagDm: '',

      ano_diagHta: '',
      mes_diagHta: '',
      dia_diagHta: '',

      ano_ingProg: '',
      mes_ingProg: '',
      dia_ingProg: '',

      descripRecibeIeca: '',
      descripRecibeAraii: '',

      ano_mi: '',
      mes_mi: '',
      dia_mi: '',

      ano_endocri: '',
      mes_endocri: '',
      dia_endocri: '',

      ano_cardio: '',
      mes_cardio: '',
      dia_cardio: '',

      ano_oftal: '',
      mes_oftal: '',
      dia_oftal: '',

      ano_nefro: '',
      mes_nefro: '',
      dia_nefro: '',

      ano_psicol: '',
      mes_psicol: '',
      dia_psicol: '',

      ano_nutri: '',
      mes_nutri: '',
      dia_nutri: '',

      ano_trabajoSoc: '',
      mes_trabajoSoc: '',
      dia_trabajoSoc: '',
    },
    fecha_actual: null,

    resul_citol: [
      { COD: "1", DESCRIP: "NORMAL" },
      { COD: "2", DESCRIP: "ANORMAL" },
      { COD: "3", DESCRIP: "NO APLICA" },
      { COD: "4", DESCRIP: "NO SABE" },
    ],

    result_vih: [
      { COD: "1", DESCRIP: "POSITIVO" },
      { COD: "2", DESCRIP: "NEGATIVO" },
    ],

    result_serolo: [
      { COD: "1", DESCRIP: "REACTIVO" },
      { COD: "2", DESCRIP: "NO REACTIVO" },
    ],

    result_hemogra: [
      { COD: "1", DESCRIP: "NORMAL" },
      { COD: "2", DESCRIP: "ANORMAL" },
    ],

    soporte_fam: [
      { COD: "1", DESCRIP: "CASI SIEMPRE" },
      { COD: "2", DESCRIP: "A VECES" },
      { COD: "3", DESCRIP: "NUNCA" },
    ],

    resp_Ieca_araii: [
      { COD: "1", DESCRIP: "SI RECIBE" },
      { COD: "2", DESCRIP: "NO FUE FORMULADO DENTRO DEL PLAN TERAPEUTICO" },
      { COD: "3", DESCRIP: "NO RECIBE, AUNQUE FUE FORMULADO DENTRO DEL PLAN" },
      { COD: "4", DESCRIP: "NO APLICA, PACIENTE CON ERC SIN HTA NI DM" },
    ],

    modal_victimaConf: false,
    ventanaHeridasPaq: null,
    modal_total: false,

    sw_var: {
      embar: false,
      urg: false,
      covid: false,
      sintomatico: false,
      agudeza: true,
      epoc: false,
      ipa: false,
      notificacion: false
    },

    params_noti: {
      estado: false,
      llave_hc: null,
      admin: null,
      callback: null,
      callback_esc: null
    },

    params_hc890b: {
      enabled: false,
      estado: false
    },
    params_hc890c: {
      enabled: false,
      estado: false
    },
    params_hc890a: {
      modal: false,
    },
    params_sifilis: {
      enabled: false,
      estado: false,
    },
    params_trastornos: {
      enabled: false,
      estado: false,
    },
    params_hc9010: {
      enabled: false,
      estado: false
    },
    params_hc9011: {
      enabled: false,
      estado: false,
      edadPaci: ""
    },
    params_hc890q: {
      enabled: false,
      estado: false,
      edadPaci: ""
    },
    params_hc890h: {
      estado: false,
      pregunta: 0,
      ciudades: [],
      paises: [],
    },
    params_hc890l: {
      modal: false,
      estado: false,
    },
    params_hc890d: {
      estado: false,
      unserv: null,
      finalidad: null,
      sexo: null,
    },
    params_vacunacion_covid: {
      estado: false,
      modal: false,
      paso: null,
    },
    form_sintomatico: {
      sintom_resp: null,
      sintom_piel: null,
      contacto_lepra: null,
      victi_maltrato: null,
      victi_violencia: null,
      enfer_mental: null,
      enfer_its: null,
      cual_its: null,
      trata_its: null,
      cancer_seno: null,
      cancer_cervis: null,
      edu_autoexa_seno: null,
      citologia_previa: null,
      fecha_cito_previa: null,
      resul_cito_previa: null,
      fecha_ult_mamo: null,
    },
    hora_act: {
      hr: null,
      min: null,
    },
    fecha_act: {
      año: null,
      mes: null,
      dia: null,
    },
    paciente: $_REG_PACI,
    usuar: $_USUA_GLOBAL[0],
    profesional: $_REG_PROF,
    enfermedades: [],
    nro_ult_comp: "",
    form: getObjRegHC(),
    obj_triage: {},
    hc_detalles: [],
    form_deta: {
      enfer_act: null,
      af: null,
      am: null,
      aq: null,
      aFame: null,
      alergicos: null,
      aTrauma: null,
      aOcupa: null,
      otros: null,
      ago: null,
      os: null,
      cp: null,
      sd: null,
      sDermat: null,
      sist_oeste: null,
      sn: null,
      sis_psiq: null,
      sis_gent: null,
      sis_gine: null,
      sis_ago: null,
      examen: null,
      analisis: null,
    },
    descripcion: {
      novedad: null,
      unserv: null,
      profesional: null,
      resp_ocular: null,
      resp_verbal: null,
      resp_motora: null,
      estr_oi: null,
      estr_od: null,
      personal_atiende: null,
      est_grav: null,
      causa: null,
      tipo_diagn: null,
      finalidad: null,
      planifica: null,
      estado_salida: null,
    },
    cod_diagn: "",
    datos_creatinina: {},
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
    data_enferm: {
      observaciones_ment: ""
    },
    mostrarFindrisk: false,
    params_findrisk: {
      estado: false
    },
    datos_findrisk: {
      peso_lnk: "",
      talla_lnk: "",
      imc_lnk: "",
      vlr_edad_lnk: "",
      per_abdo_lnk: "",
      tens1_lnk: ""
    },

    mostrarHeridas: null,
    params_heridas: {
      estado: null
    },
    datos_heridas: {},

    mostrarDependFuncional: null,
    ventanaPacienteCronico: false,
    ventanaValoradoPorCronic: false,
    ventanaMultidrogoresistente: false,

    params_hc890g: {
      estado: false,
    },
    mostrar_hc890g: true,

    examen_visual: {
      agudeza_visual_oi_1: "",
      agudeza_visual_oi_2: "",
      agudeza_visual_od_1: "",
      agudeza_visual_od_2: "",
      estructuras_oculares_oi: "",
      estructuras_oculares_od: "",
      distancia_agud: "",
    },
    array_detalles: [
      1001,
      2002,
      2010,
      2020,
      2030,
      2035,
      2040,
      2050,
      2060,
      2070,
      3010,
      3020,
      3030,
      3040,
      3050,
      3060,
      3070,
      3080,
      3090,
      3095,
      4005,
      7501,
      7503
    ]
  },
  components: {
    covid19: component_hc890h,
    sintomaticos: component_hc890d,
    notificaiones: require("../../HICLIN/scripts/HC002N.vue"),
    discapacidad: require("../../HICLIN/scripts/hc890l.vue"),
    barthel: require("../../HICLIN/scripts/HC890B.vue"),
    karnosky: require("../../HICLIN/scripts/HC890C.vue"),
    findrisk: require("../../HICLIN/scripts/HC890E.vue.js"),
    heridas: require("../../HICLIN/scripts/HC890F.vue.js"),
    creatinina: require("../../HICLIN/scripts/HC890A.vue"),
    sifilis: require("../../HICLIN/scripts/SIFILIS.vue"),
    enfer_mental: require("../../HICLIN/scripts/TRASTORNOS-MENTALES.vue"),
    vales: require("../../HICLIN/scripts/HC-9010.vue.js"),
    apgar: require("../../HICLIN/scripts/HC-9011.vue"),
    minimental: require("../../HICLIN/scripts/HC890Q.vue"),
    vacunacion_covid: require("../../HICLIN/scripts/HC-9012.vue"),
  },
  created() {
    _vm = this;
    loader("show");
    _inputControl("reset");
    _inputControl("disabled");

    this.fecha_actual = this._getFechaActual();

    this._getCiudades();
    let serv = parseFloat($_REG_HC.serv_hc) || 0;
    let nit = this.usuar.NIT;
    if (
      serv == 02 ||
      serv == 08 ||
      ([900405505].includes(nit) && serv == 63) ||
      ([892000458].includes(nit) && serv == 01) ||
      (nit == 892000264 && [1, 3, 5, 6, 63].includes(serv))
    ) {
      this._buscarConsultaExterna();
    } else {
      this._setNroFolio();
    }
  },
  // computed: {
  //   cambios_findrisk: function () {
  //     return {
  //       peso_lnk: this.form.signos.peso,
  //       talla_lnk: this.form.signos.talla,
  //       imc_lnk: this.form.signos.imc,
  //       vlr_edad_lnk: this.form.edad.vlr_edad || '',
  //       per_abdo_lnk: this.form.signos.per_abdo,
  //       tens1_lnk: this.form.signos.tens1,
  //     }
  //   }
  // },
  watch: {
    "cambios_findrisk": function (data) {
      this.datos_findrisk = data
    },
    "form.signos.aper_ocul": function (val) {
      let consulta = _tipoJsonHc("resp_ocular").find((e) => e.COD == val);
      if (consulta) this.descripcion.resp_ocular = consulta.DESCRIP;
      this._calcularIndiceGlasgow();
    },
    "form.signos.resp_verb": function (val) {
      let consulta = _tipoJsonHc("resp_verbal").find((e) => e.COD == val);
      if (consulta) this.descripcion.resp_verbal = consulta.DESCRIP;
      this._calcularIndiceGlasgow();
    },
    "form.signos.resp_moto": function (val) {
      let consulta = _tipoJsonHc("resp_motora").find((e) => e.COD == val);
      if (consulta) this.descripcion.resp_motora = consulta.DESCRIP;
      this._calcularIndiceGlasgow();
    },
    "form.examen_visual.estructuras_oculares_oi": function (val) {
      let consulta = _tipoJsonHc("estructurasOculares").find(
        (e) => e.COD == val
      );
      if (consulta) this.descripcion.estr_oi = consulta.DESCRIP;
    },
    "form.examen_visual.estructuras_oculares_od": function (val) {
      let consulta = _tipoJsonHc("estructurasOculares").find(
        (e) => e.COD == val
      );
      if (consulta) this.descripcion.estr_od = consulta.DESCRIP;
    },
    'form.cual_multidrogoresis': function (val) {
      this.form.cual_multidrogoresis = val ? val.replaceEsp() : ''
    },
  },
  methods: {
    _textEdit(e) {
      let funcion = e.srcElement.getAttribute("data-edit");
      if (funcion) _fin_validar_form(), this[funcion]();
    },
    _getCiudades() {
      let hc_01 = this;
      postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON809.DLL"))
        .then((data) => {
          hc_01.params_hc890h.ciudades = data.CIUDAD;
          hc_01._getPaises();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    _getPaises() {
      let hc_01 = this;
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER888.DLL"))
        .then((data) => {
          hc_01.params_hc890h.paises = data.PAISESRIPS;
          hc_01._getEnfermedades();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    _getEnfermedades() {
      let datosh = datosEnvio();
      postData({ datosh }, get_url("APP/SALUD/SER851.DLL"))
        .then((data) => {
          this.enfermedades = data.ENFERMEDADES.filter(
            (e) => e.COD_ENF.trim() != ""
          );
        })
        .catch((err) => {
          console.error(err);
        });
    },
    _buscarConsultaExterna() {
      let hc_01 = this;
      let fecha = this._getFechaActual();

      let datosh =
        datosEnvio() +
        localStorage.Usuario +
        "|" +
        this.paciente.COD +
        "|" +
        this.serv_hc +
        "|" +
        fecha +
        "|";

      postData({ datosh }, get_url("APP/HICLIN/HC811B.DLL"))
        .then((data) => {
          hc_01.nro_ult_comp = data;
          hc_01._setNroFolio();
        })
        .catch((err) => {
          _regresar_menuhis();
        });
    },

    _setNroFolio() {
      // multisalud se asigna el folio y sucursal segun la sucursal del comprobante
      let nit = this.usuar.NIT || 0;

      if ([830511298].includes(nit)) {
        let nro_comp = this.nro_ult_comp || "";
        let datos = {
          datosh: datosEnvio(),
          paciente: this.paciente.COD || "",
          sucursal: nro_comp.substring(0, 2),
          llave: $_REG_HC.llave_hc
        }

        postData(datos, get_url("APP/HICLIN/HC811A.DLL"))
          .then(res => {
            $_REG_HC.llave_hc = res
            this._getHistoria();
          })
          .catch(err => {
            loader("hide");
            _regresar_menuhis();
          })
      } else this._getHistoria();

    },

    _getHistoria() {
      let hc_01 = this;
      let datosh =
        datosEnvio() +
        $_REG_HC.llave_hc +
        "|" +
        localStorage["Usuario"].trim() +
        "|";

      postData({ datosh }, get_url("APP/HICLIN/GET_HC.DLL"))
        .then((res) => {
          let data = res;
          data.paciente = $_REG_HC.id_paciente;
          data.folio_suc = $_REG_HC.llave_hc.substr(15, 2);
          data.folio_nro = $_REG_HC.llave_hc.substr(17, 6);

          let new_array = [];
          let tabla_diagn = data.rips.tabla_diagn.filter((e) => e.cod_diagn.trim() != "");

          tabla_diagn.forEach((item, index) => {
            new_array.push(
              {
                nro: index + 1,
                ...item
              }
            )
          })

          data.rips.tabla_diagn = new_array || [];

          // se modifica en caso de novedad 8
          data.serv = $_REG_HC.serv_hc;
          data.cierre.unserv = $_REG_HC.serv_hc;
          data.rips.finalidad = $_REG_HC.finalid_hc;

          data.edad = $_REG_HC.edad_hc;
          data.edad_dias = this._calcularEdadDias($_REG_PACI.NACIM);

          hc_01.form = JSON.parse(JSON.stringify(data));
          hc_01.form.motivo = hc_01.form.motivo.enterPut();

          loader("hide");
          hc_01.imprimir_HC002B() // IMPRESION EVOLUCIONES ANTERIORES DE ELECTRON
            .then(() => {
              loader("show");
              hc_01._getUnser();
            })
        })
        .catch((error) => {
          loader("hide");
          _regresar_menuhis();
        });
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

    _getUnser() {
      let hc_01 = this,
        datos = {
          datosh: datosEnvio(),
          paso: 1,
          codigo: this.form.serv,
        };

      postData(datos, get_url("APP/SALUD/SER873.dll"))
        .then((data) => {
          hc_01.descripcion.unserv = `${data.COD} - ${data.DESCRIP}`;
          hc_01._getDetallesHc();
        })
        .catch((err) => {
          loader("hide");
          _regresar_menuhis();
        });
    },

    _getDetallesHc() {
      let folio = parseFloat(this.form.folio_nro),
        llave = "",
        data_w = this.form,
        hc_01 = this;

      if (data_w.novedad == "7") {
        folio = folio - 1;
      }

      if (folio < 1) llave = data_w.llave;
      else {
        llave =
          data_w.paciente +
          data_w.folio_suc +
          folio.toString().padStart(6, "0");
      }

      let cod_detalles = ""
      this.array_detalles.forEach(e => cod_detalles += e + ";")

      let datos = {
        datosh: datosEnvio() + llave + "|||" + cod_detalles + "|"
      }

      postData(datos, get_url("APP/HICLIN/HCDETAL_PRC.DLL"))
        .then((data) => {
          let detalles = Regexp_detalle(
            data.DETHC.filter((e) => e["LLAVE-HC"].trim() != "")
          );

          hc_01.hc_detalles = JSON.parse(JSON.stringify(detalles));

          hc_01._montarPrincipal();
        })
        .catch((error) => {
          console.log(error);
          loader("hide");
          // _regresar_menuhis();
        });
    },

    _montarPrincipal() {
      var date = new Date(),
        fecha = this._getFechaActual(),
        novedad = this.form.novedad,
        hora = `${date
          .getHours()
          .toString()
          .padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}`;

      if (novedad == "7") {
        this.form.cierre.temporal = "1";
        this.form.cierre.estado = "0";
        this.form.esquema = "HC01";
        this.descripcion.novedad = "Creando";
        this.form.oper_elab = localStorage.Usuario;
        this.form.med = this.profesional.IDENTIFICACION.trim();
      } else {
        if (parseFloat(this.form.fecha) != 0) {
          hora = this.form.hora;
          fecha = this.form.fecha;
        }
        this.descripcion.novedad = "Actualizando";
      }

      this.fecha_act.año = fecha.substr(0, 4);
      this.fecha_act.mes = fecha.substr(4, 2);
      this.fecha_act.dia = fecha.substr(6, 2);
      this.hora_act.hr = hora.substr(0, 2);
      this.hora_act.min = hora.substr(2, 2);

      this.form.rips.atiende = this.profesional.ATIENDE_PROF;
      this.descripcion.profesional = `${this.profesional.IDENTIFICACION} - ${this.profesional.DESCRIPCION}`;

      // consulta historia anterior y consulta triage

      if ((this.form.edad.unid_edad == 'A' && this.form.edad.vlr_edad > 17) &&
        (this.form.cierre.unserv == '08' || this.form.cierre.unserv == '02') &&
        (this.profesional.ATIENDE_PROF == '2' || this.profesional.ATIENDE_PROF == '6')) {
        this.mostrarFindrisk = true
      } else this.mostrarFindrisk = false

      if (
        (this.form.novedad == "7" || this.form.cierre.temporal == "1") &&
        (this.form.serv == 01 || this.form.serv == 04)
      ) {
        this._buscarTriage();
      } else this._validarConsultaCompFact();
    },

    _buscarTriage() {
      let hc_01 = this;
      this.form.cierre.nit_contab = this.usuar.NIT;

      let fecha = hc_01.fecha_act;
      let hora = hc_01.hora_act;
      let datosh =
        datosEnvio() +
        hc_01.form.llave +
        "|" +
        fecha.año +
        fecha.mes +
        fecha.dia +
        "|" +
        hora.hr +
        hora.min +
        "|";

      postData({ datosh }, get_url("APP/HICLIN/TRIAGE.DLL"))
        .then((data) => {
          if (data.llave) {
            Object.keys(data).forEach((a) => {
              data[a] = data[a].enterPut();
            });

            hc_01.obj_triage = JSON.parse(JSON.stringify(data));
          }

          if (data.llave && hc_01.form.novedad == "7") {
            hc_01.form.proceden = data.procedencia;
            hc_01.form.motiv = data.motiv.enterPut();
            hc_01.form.signos.peso = data.peso;
            hc_01.form.signos.talla = data.talla;
            hc_01.form.signos.temp = data.temp;

            hc_01.form.signos.fcard = data.fcard;
            hc_01.form.signos.fresp = data.fresp;
            hc_01.form.signos.tens1 = data.tens1;
            hc_01.form.signos.tens2 = data.tens2;
            hc_01.form.signos.oximetria = data.oximetria;

            hc_01.form.signos.aper_ocul = data.glasg.substring(0, 1)
            hc_01.form.signos.resp_verb = data.glasg.substring(1, 2)
            hc_01.form.signos.resp_moto = data.glasg.substring(2, 3)

            hc_01.form.rips.embarazo = data.embar;
            hc_01.form.rips.triage = data.triage;
            hc_01.form.rips.causa = data.causa;

            hc_01.form.rips.finalidad = data.finalidad;
            hc_01.form.rips.remitido = data.remitido;
            if (!hc_01.form.cierre.eps) hc_01.form.cierre.eps = data.eps;

            if (!data.prefijo && !data.nro_fact) {
              hc_01.form.cierre.prefijo = data.prefijo;
              hc_01.form.cierre.nro_fact = data.nro_fact;
            }

            let { enf_act, af, aq, alergicos, analisis, examen } = data;

            hc_01.modificarArrayDetalle("1001", enf_act).then(() => {
              hc_01.modificarArrayDetalle("2002", af).then(() => {
                hc_01.modificarArrayDetalle("2020", aq).then(() => {
                  hc_01.modificarArrayDetalle("2035", alergicos).then(() => {
                    hc_01.modificarArrayDetalle("7501", analisis).then(() => {
                      hc_01.modificarArrayDetalle("4005", examen).then(() => {
                        hc_01._validarConsultaCompFact();

                        console.log(
                          enf_act,
                          af,
                          aq,
                          alergicos,
                          analisis,
                          examen
                        );

                        hc_01.form_deta.enfer_act = enf_act;
                        hc_01.form_deta.af = af;
                        hc_01.form_deta.aq = aq;
                        hc_01.form_deta.alergicos = alergicos;
                        hc_01.form_deta.analisis = analisis;

                        console.log(hc_01.form_deta);
                      });
                    });
                  });
                });
              });
            });
          } else hc_01._validarConsultaCompFact();
        })
        .catch((err) => {
          console.log(err);
          loader("hide");
          _regresar_menuhis();
        });
    },

    _validarConsultaCompFact() {
      if (this.form.serv != "02") this._buscarFactura();
      else this._validarCompFact();
    },

    _buscarFactura() {
      let hc_01 = this,
        prefijo = hc_01.obj_triage.prefijo,
        nro_fact = hc_01.obj_triage.nro_fact || "0",
        fecha = hc_01.fecha_act,
        datosh =
          datosEnvio() +
          hc_01.form.llave +
          "|" +
          fecha.año +
          fecha.mes +
          fecha.dia +
          "|" +
          prefijo +
          "|" +
          nro_fact.padStart(6, "0") +
          "|";
      postData({ datosh }, get_url("APP/HICLIN/CON_NUMER.DLL"))
        .then((data) => {
          hc_01.form.cierre.prefijo = data.prefijo;
          hc_01.form.cierre.nro_fact = data.nro_fact;
          hc_01._validarCompFact();
        })
        .catch((err) => {
          console.log(err);
          loader("hide");
          _regresar_menuhis();
        });
    },
    _validarCompFact() {
      let fecha = parseFloat(this._getFechaActual());

      // antes de la atencion

      let nit = this.usuar.NIT;

      if (this.form.serv == 01 && [844003225].includes(nit)) {
        console.log(this.form.serv, this.usuar.NIT);

        if (fecha > 20190331) {
          let prefijo = this.usuar.PREFIJ;
          if (
            (prefijo != "EM" ||
              prefijo != "CH" ||
              prefijo != "TL" ||
              prefijo != "CS") &&
            this.form.cierre.prefijo == ""
          ) {
            loader("hide");
            plantillaError("9A", "9A", "HC-01", _regresar_menuhis);
          } else this._llenarDatosPag1();
        } else this._llenarDatosPag1();
      } else this._llenarDatosPag1();
    },

    _llenarDatosPag1() {
      loader("hide");
      _inputControl("disabled");

      this._montarDatosPantalla();
      this._validarPerinatal();
    },
    _validarPerinatal() {
      /* 
          Se deshabilita preguntas de embarazadas - mientras se prueba
      */
      if (
        this.paciente.SEXO == "F" &&
        this.form.edad.unid_edad == "A" &&
        this.form.edad.vlr_edad > 8 &&
        this.form.edad.vlr_edad < 55
      ) {
        if (
          this.form.serv == "01" &&
          (this.form.rips.embarazo == "1" ||
            this.form.rips.embarazo == "2" ||
            this.form.rips.embarazo == "3")
        ) {
          plantillaToast("6E", "6E", null, "warning", "");
          // this.sw_var.embar = true;
          this.sw_var.embar = false;
          this._validarProcedencia();
        } else if (this.form.serv == "08" && this.form.rips.finalidad == "6") {
          // this.sw_var.embar = true;
          this.sw_var.embar = false;
          this._validarProcedencia();
        } else {
          CON851P(
            "29",
            () => {
              this.sw_var.embar = false;
              this._validarProcedencia();
            },
            () => {
              // this.sw_var.embar = true;
              this.sw_var.embar = false;
              this._validarProcedencia();
            }
          );
        }
      } else this._validarProcedencia(), this.sw_var.embar == false;
    },
    _validarProcedencia() {
      let hc_01 = this;

      if (this.sw_var.embar) {
        if (!this.form.motiv) this.form.motiv = "Evaluacion perinatal";
      }

      validarInputs(
        {
          form: "#fase_procedencia_hc_01",
          orden: "1",
          event_f2: () => {
            this._activarVentanaF2({
              callback: "validarDatoVictimaConflic",
              callback_esc: "_validarProcedencia"
            })
          },
        },
        () => {
          CON851P("03", hc_01._validarProcedencia, _regresar_menuhis);
        },
        hc_01.validarDatoVictimaConflic
      );
    },

    validarDatoVictimaConflic() {
      let hc_01 = this;
      hc_01.modal_victimaConf = true;

      hc_01.descrip.victConflicto.trim() == ""
        ? (hc_01.descrip.victConflicto = $_REG_PACI["VICTI-CONFLICTO"])
        : "";
      validarInputs(
        {
          form: "#victConflicto_hc_01",
        },
        () => {
          hc_01.modal_victimaConf = false;
          hc_01._validarProcedencia();
        },
        async () => {
          hc_01.descrip.victConflicto = hc_01.descrip.victConflicto.toUpperCase();
          var temp = hc_01.descrip.victConflicto;
          if (temp == "S" || temp == "N") {
            await hc_01.actualizarDatosPaci();
            await hc_01._validarAcompañante();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoVictimaConflic();
          }
        }
      );
    },

    _validarAcompañante() {
      let hc_01 = this;
      hc_01.modal_victimaConf = false;
      validarInputs(
        {
          form: "#fase_acompa_hc_01",
          orden: "1",
        },
        hc_01._validarProcedencia,
        hc_01._validarMotivo
      );
    },
    _validarMotivo() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_motivo_hc_01",
          orden: "1",
        },
        hc_01._validarAcompañante,
        hc_01._validarEnferActual
      );
    },
    _validarEnferActual() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_enferActual_hc_01",
          orden: "1",
        },
        hc_01._validarMotivo,
        hc_01.validarVacunacionCovid19
      );
    },

    validarVacunacionCovid19() {
      this.params_vacunacion_covid.modal = true;
      setTimeout(() => {
        this.params_vacunacion_covid.paso = 1;
        this.params_vacunacion_covid.estado = true;
      }, 200);
    },

    validarEsc_vacunacion_covid() {
      this.params_vacunacion_covid.estado = this.params_vacunacion_covid.modal = false;
      this._validarMotivo();
    },

    validarCallback_vacunacion_covid() {
      this.params_vacunacion_covid.estado = this.params_vacunacion_covid.modal = false;
      this._validarPag_01();
    },

    _validarPag_01() {
      if (this.form.novedad) {
        if (this.form.cierre.eps == "") {
          this.form.cierre.eps = this.paciente.EPS;
        }
        this.form.cierre.nit_fact = this.paciente["NIT-FACT"];
      }

      let {
        fecha_act,
        hora_act,
        form_deta: { enfer_act },
      } = this;

      this.form.fecha = `${fecha_act.año}${fecha_act.mes}${fecha_act.dia}`;
      this.form.hora = `${hora_act.hr}${hora_act.min}`;

      loader("show")

      this.modificarArrayDetalle("1001", enfer_act).then(() => {
        this._guardarHistoria()
          .then(() => {
            this.form.novedad = "8";
            this._guardarDetallesHc()
              .then(() => {
                loader("hide")
                this._validarAf();
              })
              .catch((err) => {
                loader("hide")
                this._validarEnferActual();
              });
          })
          .catch((err) => {
            loader("hide")
            this._validarEnferActual();
          });
      });
    },
    _grabarDetalles_pag1() {
      let hc_01 = this;
      let filtro = ["2002", "2070", "3010", "9012"];

      let detalles = hc_01.hc_detalles.filter(
        (e) => e["LLAVE-HC"] == hc_01.form.llave && !filtro.includes(e["COD-DETHC"])
      );

      var datos = _getObjetoHcDetal(detalles, hc_01.form.llave);

      postData(datos, get_url("APP/HICLIN/SAVE_DETALLE.DLL"))
        .then(hc_01._llenarDatosPag2)
        .catch((err) => {
          loader("hide");
          hc_01._validarEnferActual();
        });
    },
    _llenarDatosPag2() {
      loader("hide");
      this._validarAf();
    },
    _validarAf() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_af_hc_01",
          orden: "1",
          event_f8: hc_01._ventanaAf,
          event_av_pag: hc_01.validarGenogPad,
        },
        hc_01._validarPerinatal,
        () => {
          if (hc_01.sw_var.urg) hc_01._validarAlergicos();
          else hc_01._validarAm();
        }
      );
    },
    _validarAm() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_am_hc_01",
          orden: "1",
          event_f8: hc_01._ventanaAm,
        },
        hc_01._validarAf,
        hc_01._validarAq
      );
    },
    _validarAq() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_aq_hc_01",
          orden: "1",
          event_f8: hc_01._ventanaAq,
        },
        hc_01._validarAm,
        hc_01._validarAfame
      );
    },
    _validarAfame() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_aFame_hc_01",
          orden: "1",
          event_f8: hc_01._ventanaAfame,
        },
        hc_01._validarAq,
        hc_01._validarAlergicos
      );
    },
    _validarAlergicos() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_alergicos_hc_01",
          orden: "1",
          event_f8: hc_01._ventanaAlergicos,
        },
        () => {
          if (hc_01.sw_var.urg) hc_01._validarAf();
          else hc_01._validarAfame();
        },
        () => {
          if (hc_01.sw_var.urg) hc_01.validarGenogPad();
          else hc_01._validarATrauma();
        }
      );
    },
    _validarATrauma() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_aTrauma_hc_01",
          orden: "1",
          event_f8: hc_01._ventanaATrauma,
        },
        hc_01._validarAlergicos,
        hc_01._validarAOcupa
      );
    },
    _validarAOcupa() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_aOcupa_hc_01",
          orden: "1",
          event_f8: hc_01._ventanaAOcupa,
        },
        hc_01._validarATrauma,
        hc_01._validarOtros
      );
    },
    _validarOtros() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_otros_ant_hc_01",
          orden: "1",
          event_f8: hc_01._ventanaOtros,
        },
        hc_01._validarAOcupa,
        hc_01._validarObstetricos
      );
    },
    _validarObstetricos() {
      if (this.paciente.SEXO == "M") {
        this.validarGenogPad();
      } else {
        this._validarAgo();
      }
    },
    _validarAgo() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_ago_hc_01",
          orden: "1",
          event_f8: hc_01._ventanaAgo,
        },
        hc_01._validarOtros,
        hc_01.validarGenogPad
      );
    },

    // genograma

    validarGenogPad() {
      let hc_01 = this;

      if (
        hc_01.form.edad.unid_edad == "D" ||
        hc_01.form.edad.unid_edad == "M" ||
        hc_01.form.edad.vlr_edad < 15
      ) {
        let { TAB_ESPEC } = this.profesional;

        if (
          hc_01.form.rips.atiende == 2 ||
          TAB_ESPEC.includes("431") ||
          TAB_ESPEC.includes("442") ||
          TAB_ESPEC.includes("490") ||
          TAB_ESPEC.includes("492") ||
          TAB_ESPEC.includes("550") ||
          TAB_ESPEC.includes("551")
        ) {
          hc_01.dato_2080.edad1_pad_esq_w = "A";
          hc_01.dato_2080.edad1_mad_esq_w = "A";
          validarInputs(
            {
              form: "#padre_hc_01",
            },
            () => {
              hc_01._validarOtros();
            },
            () => {
              var temp = parseInt(hc_01.dato_2080.edad2_pad_esq_w);
              if ((temp > 0 && temp < 12) || temp > 120) {
                hc_01.validarGenogPad();
              } else {
                hc_01.validarGenogMad();
              }
            }
          );
        } else hc_01.grabarDetalle_2080();
      } else hc_01.grabarDetalle_2080();
    },

    validarGenogMad() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#madre_hc_01",
        },
        () => {
          hc_01.validarGenogPad();
        },
        () => {
          var temp = parseInt(hc_01.dato_2080.edad2_mad_esq_w);
          if ((temp > 0 && temp < 12) || temp > 120) {
            hc_01.validarGenogMad();
          } else {
            hc_01.validarGenogHer1Sex();
          }
        }
      );
    },

    validarGenogHer1Sex() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#herm1_sex_hc_01",
        },
        () => {
          hc_01.validarGenogMad();
        },
        () => {
          hc_01.dato_2080.sexo_her1_esq_w = hc_01.dato_2080.sexo_her1_esq_w.toUpperCase();
          var temp = hc_01.dato_2080.sexo_her1_esq_w;
          if (temp == "M" || temp == "F") {
            hc_01.validarGenogHer1Ed1();
          } else if (temp == "") {
            hc_01.dato_2080.edad1_her1_esq_w = "";
            hc_01.dato_2080.edad2_her1_esq_w = "";
            hc_01.validarGenogHer2Sex();
          } else {
            hc_01.validarGenogHer1Sex();
          }
        }
      );
    },

    validarGenogHer1Ed1() {
      let hc_01 = this;
      hc_01.dato_2080.edad1_her1_esq_w.trim() == ""
        ? (hc_01.dato_2080.edad1_her1_esq_w = "A")
        : false;
      validarInputs(
        {
          form: "#herm1_edad1_hc_01",
        },
        () => {
          hc_01.validarGenogHer1Sex();
        },
        () => {
          hc_01.dato_2080.edad1_her1_esq_w = hc_01.dato_2080.edad1_her1_esq_w.toUpperCase();
          var temp = hc_01.dato_2080.edad1_her1_esq_w;
          if (temp == "D" || temp == "M" || temp == "A") {
            hc_01.validarGenogHer1Ed2();
          } else {
            hc_01.validarGenogHer1Ed1();
          }
        }
      );
    },

    validarGenogHer1Ed2() {
      let hc_01 = this;
      hc_01.dato_2080.edad2_her1_esq_w == ""
        ? (hc_01.dato_2080.edad2_her1_esq_w = 0)
        : false;
      validarInputs(
        {
          form: "#herm1_edad2_hc_01",
        },
        () => {
          hc_01.validarGenogHer1Ed1();
        },
        () => {
          var temp = parseInt(hc_01.dato_2080.edad2_her1_esq_w);
          var undE = hc_01.dato_2080.edad1_her1_esq_w;
          var edadM = parseInt(hc_01.dato_2080.edad2_mad_esq_w);

          if (
            temp == 0 ||
            (undE == "D" && temp > 29) ||
            (undE == "M" && temp > 11) ||
            (edadM > 0 && temp > edadM)
          ) {
            hc_01.validarGenogHer1Ed2();
          } else {
            hc_01.validarGenogHer2Sex();
          }
        }
      );
    },

    validarGenogHer2Sex() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#herm2_sex_hc_01",
        },
        () => {
          hc_01.validarGenogHer1Sex();
        },
        () => {
          hc_01.dato_2080.sexo_her2_esq_w = hc_01.dato_2080.sexo_her2_esq_w.toUpperCase();
          var temp = hc_01.dato_2080.sexo_her2_esq_w;
          if (temp == "M" || temp == "F") {
            hc_01.validarGenogHer2Ed1();
          } else if (temp == "") {
            hc_01.dato_2080.edad1_her2_esq_w = "";
            hc_01.dato_2080.edad2_her2_esq_w = "";
            hc_01.validarGenogHer3Sex();
          } else {
            hc_01.validarGenogHer2Sex();
          }
        }
      );
    },

    validarGenogHer2Ed1() {
      let hc_01 = this;
      hc_01.dato_2080.edad1_her2_esq_w.trim() == ""
        ? (hc_01.dato_2080.edad1_her2_esq_w = "A")
        : false;
      validarInputs(
        {
          form: "#herm2_edad1_hc_01",
        },
        () => {
          hc_01.validarGenogHer2Sex();
        },
        () => {
          hc_01.dato_2080.edad1_her2_esq_w = hc_01.dato_2080.edad1_her2_esq_w.toUpperCase();
          var temp = hc_01.dato_2080.edad1_her2_esq_w;
          if (temp == "D" || temp == "M" || temp == "A") {
            hc_01.validarGenogHer2Ed2();
          } else {
            hc_01.validarGenogHer2Ed1();
          }
        }
      );
    },

    validarGenogHer2Ed2() {
      let hc_01 = this;
      hc_01.dato_2080.edad2_her2_esq_w == ""
        ? (hc_01.dato_2080.edad2_her2_esq_w = 0)
        : false;
      validarInputs(
        {
          form: "#herm2_edad2_hc_01",
        },
        () => {
          hc_01.validarGenogHer2Ed1();
        },
        () => {
          var temp = parseInt(hc_01.dato_2080.edad2_her2_esq_w);
          var undE = hc_01.dato_2080.edad1_her2_esq_w;
          var edadM = parseInt(hc_01.dato_2080.edad2_mad_esq_w);

          if (
            temp == 0 ||
            (undE == "D" && temp > 29) ||
            (undE == "M" && temp > 11) ||
            (edadM > 0 && temp > edadM)
          ) {
            hc_01.validarGenogHer2Ed2();
          } else {
            hc_01.validarGenogHer3Sex();
          }
        }
      );
    },

    validarGenogHer3Sex() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#herm3_sex_hc_01",
        },
        () => {
          hc_01.validarGenogHer2Sex();
        },
        () => {
          hc_01.dato_2080.sexo_her3_esq_w = hc_01.dato_2080.sexo_her3_esq_w.toUpperCase();
          var temp = hc_01.dato_2080.sexo_her3_esq_w;
          if (temp == "M" || temp == "F") {
            hc_01.validarGenogHer3Ed1();
          } else if (temp == "") {
            hc_01.dato_2080.edad1_her3_esq_w = "";
            hc_01.dato_2080.edad2_her3_esq_w = "";
            hc_01.validarGenogHer4Sex();
          } else {
            hc_01.validarGenogHer3Sex();
          }
        }
      );
    },

    validarGenogHer3Ed1() {
      let hc_01 = this;
      hc_01.dato_2080.edad1_her3_esq_w.trim() == ""
        ? (hc_01.dato_2080.edad1_her3_esq_w = "A")
        : false;
      validarInputs(
        {
          form: "#herm3_edad1_hc_01",
        },
        () => {
          hc_01.validarGenogHer3Sex();
        },
        () => {
          hc_01.dato_2080.edad1_her3_esq_w = hc_01.dato_2080.edad1_her3_esq_w.toUpperCase();
          var temp = hc_01.dato_2080.edad1_her3_esq_w;
          if (temp == "D" || temp == "M" || temp == "A") {
            hc_01.validarGenogHer3Ed2();
          } else {
            hc_01.validarGenogHer3Ed1();
          }
        }
      );
    },

    validarGenogHer3Ed2() {
      let hc_01 = this;
      hc_01.dato_2080.edad2_her3_esq_w == ""
        ? (hc_01.dato_2080.edad2_her3_esq_w = 0)
        : false;
      validarInputs(
        {
          form: "#herm3_edad2_hc_01",
        },
        () => {
          hc_01.validarGenogHer3Ed1();
        },
        () => {
          var temp = parseInt(hc_01.dato_2080.edad2_her3_esq_w);
          var undE = hc_01.dato_2080.edad1_her3_esq_w;
          var edadM = parseInt(hc_01.dato_2080.edad2_mad_esq_w);

          if (
            temp == 0 ||
            (undE == "D" && temp > 29) ||
            (undE == "M" && temp > 11) ||
            (edadM > 0 && temp > edadM)
          ) {
            hc_01.validarGenogHer3Ed2();
          } else {
            hc_01.validarGenogHer4Sex();
          }
        }
      );
    },

    validarGenogHer4Sex() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#herm4_sex_hc_01",
        },
        () => {
          hc_01.validarGenogHer3Sex();
        },
        () => {
          hc_01.dato_2080.sexo_her4_esq_w = hc_01.dato_2080.sexo_her4_esq_w.toUpperCase();
          var temp = hc_01.dato_2080.sexo_her4_esq_w;
          if (temp == "M" || temp == "F") {
            hc_01.validarGenogHer4Ed1();
          } else if (temp == "") {
            hc_01.dato_2080.edad1_her4_esq_w = "";
            hc_01.dato_2080.edad2_her4_esq_w = "";
            hc_01.validarGenogHer5Sex();
          } else {
            hc_01.validarGenogHer4Sex();
          }
        }
      );
    },

    validarGenogHer4Ed1() {
      let hc_01 = this;
      hc_01.dato_2080.edad1_her4_esq_w.trim() == ""
        ? (hc_01.dato_2080.edad1_her4_esq_w = "A")
        : false;
      validarInputs(
        {
          form: "#herm4_edad1_hc_01",
        },
        () => {
          hc_01.validarGenogHer4Sex();
        },
        () => {
          hc_01.dato_2080.edad1_her4_esq_w = hc_01.dato_2080.edad1_her4_esq_w.toUpperCase();
          var temp = hc_01.dato_2080.edad1_her4_esq_w;
          if (temp == "D" || temp == "M" || temp == "A") {
            hc_01.validarGenogHer4Ed2();
          } else {
            hc_01.validarGenogHer4Ed1();
          }
        }
      );
    },

    validarGenogHer4Ed2() {
      let hc_01 = this;
      hc_01.dato_2080.edad2_her4_esq_w == ""
        ? (hc_01.dato_2080.edad2_her4_esq_w = 0)
        : false;
      validarInputs(
        {
          form: "#herm4_edad2_hc_01",
        },
        () => {
          hc_01.validarGenogHer4Ed1();
        },
        () => {
          var temp = parseInt(hc_01.dato_2080.edad2_her4_esq_w);
          var undE = hc_01.dato_2080.edad1_her4_esq_w;
          var edadM = parseInt(hc_01.dato_2080.edad2_mad_esq_w);

          if (
            temp == 0 ||
            (undE == "D" && temp > 29) ||
            (undE == "M" && temp > 11) ||
            (edadM > 0 && temp > edadM)
          ) {
            hc_01.validarGenogHer4Ed2();
          } else {
            hc_01.validarGenogHer5Sex();
          }
        }
      );
    },

    validarGenogHer5Sex() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#herm5_sex_hc_01",
        },
        () => {
          hc_01.validarGenogHer4Sex();
        },
        () => {
          hc_01.dato_2080.sexo_her5_esq_w = hc_01.dato_2080.sexo_her5_esq_w.toUpperCase();
          var temp = hc_01.dato_2080.sexo_her5_esq_w;
          if (temp == "M" || temp == "F") {
            hc_01.validarGenogHer5Ed1();
          } else if (temp == "") {
            hc_01.dato_2080.edad1_her5_esq_w = "";
            hc_01.dato_2080.edad2_her5_esq_w = "";
            hc_01.validarGenogHer6Sex();
          } else {
            hc_01.validarGenogHer5Sex();
          }
        }
      );
    },

    validarGenogHer5Ed1() {
      let hc_01 = this;
      hc_01.dato_2080.edad1_her5_esq_w.trim() == ""
        ? (hc_01.dato_2080.edad1_her5_esq_w = "A")
        : false;
      validarInputs(
        {
          form: "#herm5_edad1_hc_01",
        },
        () => {
          hc_01.validarGenogHer5Sex();
        },
        () => {
          hc_01.dato_2080.edad1_her5_esq_w = hc_01.dato_2080.edad1_her5_esq_w.toUpperCase();
          var temp = hc_01.dato_2080.edad1_her5_esq_w;
          if (temp == "D" || temp == "M" || temp == "A") {
            hc_01.validarGenogHer5Ed2();
          } else {
            hc_01.validarGenogHer5Ed1();
          }
        }
      );
    },

    validarGenogHer5Ed2() {
      let hc_01 = this;
      hc_01.dato_2080.edad2_her5_esq_w == ""
        ? (hc_01.dato_2080.edad2_her5_esq_w = 0)
        : false;
      validarInputs(
        {
          form: "#herm5_edad2_hc_01",
        },
        () => {
          hc_01.validarGenogHer5Ed1();
        },
        () => {
          var temp = parseInt(hc_01.dato_2080.edad2_her5_esq_w);
          var undE = hc_01.dato_2080.edad1_her5_esq_w;
          var edadM = parseInt(hc_01.dato_2080.edad2_mad_esq_w);

          if (
            temp == 0 ||
            (undE == "D" && temp > 29) ||
            (undE == "M" && temp > 11) ||
            (edadM > 0 && temp > edadM)
          ) {
            hc_01.validarGenogHer5Ed2();
          } else {
            hc_01.validarGenogHer6Sex();
          }
        }
      );
    },

    validarGenogHer6Sex() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#herm6_sex_hc_01",
        },
        () => {
          hc_01.validarGenogHer5Sex();
        },
        () => {
          hc_01.dato_2080.sexo_her6_esq_w = hc_01.dato_2080.sexo_her6_esq_w.toUpperCase();
          var temp = hc_01.dato_2080.sexo_her6_esq_w;
          if (temp == "M" || temp == "F") {
            hc_01.validarGenogHer6Ed1();
          } else if (temp == "") {
            hc_01.dato_2080.edad1_her6_esq_w = "";
            hc_01.dato_2080.edad2_her6_esq_w = "";
            hc_01.grabarDetalle_2080();
          } else {
            hc_01.validarGenogHer6Sex();
          }
        }
      );
    },

    validarGenogHer6Ed1() {
      let hc_01 = this;
      hc_01.dato_2080.edad1_her6_esq_w.trim() == ""
        ? (hc_01.dato_2080.edad1_her6_esq_w = "A")
        : false;
      validarInputs(
        {
          form: "#herm6_edad1_hc_01",
        },
        () => {
          hc_01.validarGenogHer6Sex();
        },
        () => {
          hc_01.dato_2080.edad1_her6_esq_w = hc_01.dato_2080.edad1_her6_esq_w.toUpperCase();
          var temp = hc_01.dato_2080.edad1_her6_esq_w;
          if (temp == "D" || temp == "M" || temp == "A") {
            hc_01.validarGenogHer6Ed2();
          } else {
            hc_01.validarGenogHer6Ed1();
          }
        }
      );
    },

    validarGenogHer6Ed2() {
      let hc_01 = this;
      hc_01.dato_2080.edad2_her6_esq_w == ""
        ? (hc_01.dato_2080.edad2_her6_esq_w = 0)
        : false;
      validarInputs(
        {
          form: "#herm6_edad2_hc_01",
        },
        () => {
          hc_01.validarGenogHer6Ed1();
        },
        () => {
          var temp = parseInt(hc_01.dato_2080.edad2_her6_esq_w);
          var undE = hc_01.dato_2080.edad1_her6_esq_w;
          var edadM = parseInt(hc_01.dato_2080.edad2_mad_esq_w);

          if (
            temp == 0 ||
            (undE == "D" && temp > 29) ||
            (undE == "M" && temp > 11) ||
            (edadM > 0 && temp > edadM)
          ) {
            hc_01.validarGenogHer6Ed2();
          } else {
            hc_01.grabarDetalle_2080();
          }
        }
      );
    },

    grabarDetalle_2080() {
      let hc_01 = this;
      let detalles = {
        2080: _getObjetoSaveHc(hc_01.dato_2080, []),
      };

      grabarDetalles(detalles, hc_01.form.llave);
      hc_01.validarPag_02();
    },

    validarPag_02() {
      let {
        af,
        am,
        aq,
        aFame,
        alergicos,
        aTrauma,
        aOcupa,
        ago,
        otros,
      } = this.form_deta,
        hc_01 = this;

      // loader("show");
      // hc_01.modificarArrayDetalle("2002", af).then(() => {
      hc_01.modificarArrayDetalle("2010", am).then(() => {
        hc_01.modificarArrayDetalle("2020", aq).then(() => {
          hc_01.modificarArrayDetalle("2030", aFame).then(() => {
            hc_01.modificarArrayDetalle("2035", alergicos).then(() => {
              hc_01.modificarArrayDetalle("2040", aTrauma).then(() => {
                hc_01.modificarArrayDetalle("2050", aOcupa).then(() => {
                  hc_01.modificarArrayDetalle("2060", ago).then(() => {
                    // hc_01.modificarArrayDetalle("2070", otros).then(() => {
                    hc_01._grabarDetalle_2002();
                    // });
                  });
                });
              });
            });
          });
        });
      });
      // });

      // detella 2080 falta estructurar tanto en cobol como el front...
    },

    _grabarDetalle_2002() {
      let data = {}

      this.form_deta.af = this.form_deta.af.replaceEsp();
      let texto = this.form_deta.af.enterReplace().strToTable("RENG_DETHC");
      for (indice in texto) data[indice] = texto[indice];
      texto.tipo_ws = "PL";
      data = { 2002: texto };

      console.log(data, "data")
      grabarDetalles(data, this.form.llave)
        .then(() => {
          // CON851("", "Antecedentes guardados", null, "success", "Correcto");
          this._grabarDetalle_2070();
        })
        .catch((err) => {
          console.error(err);
          // CON851("", "Error Guardando antecedentes", null, "error", "Error");
          this._validarOtros();
        });
    },

    _grabarDetalle_2070() {
      let data = {}
      let otros = this.form_deta.otros || "";
      otros = otros.replaceEsp();

      let texto = otros.enterReplace().strToTable("RENG_DETHC");
      for (indice in texto) data[indice] = texto[indice];
      texto.tipo_ws = "PL";
      data = { 2070: texto };

      grabarDetalles(data, this.form.llave)
        .then(() => {
          CON851("", "Antecedentes guardados", null, "success", "Correcto");
          this._grabarDetalles_pag2();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error Guardando antecedentes", null, "error", "Error");
          this._validarOtros();
        });
    },

    _grabarDetalles_pag2() {
      let hc_01 = this;
      let filtro = ["2002", "2070", "3010", "9012"];

      let detalles = hc_01.hc_detalles.filter(
        (e) => e["LLAVE-HC"] == hc_01.form.llave && !filtro.includes(e["COD-DETHC"])
      );

      var datos = _getObjetoHcDetal(detalles, hc_01.form.llave);

      postData(datos, get_url("APP/HICLIN/SAVE_DETALLE.DLL"))
        .then(hc_01._llenarDatosPag3)
        .catch((err) => {
          loader("hide");
          hc_01._validarOtros();
        });
    },
    _llenarDatosPag3() {
      // loader("hide");
      if (this.sw_var.covid) this._evaluarPreguntasaCovid();
      else this._validarOS();
    },
    _evaluarEscPag3() {
      if (this.sw_var.urg) this._validarAlergicos();
      else if (this.paciente.SEXO == "M") {
        this._validarOtros();
      } else {
        this._validarAgo();
      }
    },
    _evaluarPreguntasaCovid() {
      this.params_hc890h.pregunta = 1;
      this.params_hc890h.estado = true;
    },

    _validarEpoc() {
      let edad = this.form.edad;

      if (
        this.form.serv == 08
        && edad.unid_edad == "A"
        && edad.vlr_edad >= 18
        && [7, 11].includes(this.form.rips.finalid)
      ) {
        this.sw_var.epoc = true;
        this.params_hc890r.llave_hc = this.form.llave;
      } else this._validarIpa()
    },

    _callbackEpoc() {
      this.params_hc890r.estado = false
      this.sw_var.epoc = false;

      this._validarIpa()
    },
    _validarEscEpoc() {
      this.params_hc890r.estado = false
      this.sw_var.epoc = false;
      this._evaluarEscPag3()
    },

    _validarIpa() {
      let edad = this.form.edad;

      if (
        this.form.serv == 08
        && edad.unid_edad == "A"
        && edad.vlr_edad >= 18
      ) {
        this.sw_var.ipa = true;
        this.params_ipa.fuma = this.form.cierre.paciente_cronic.fuma;
        this.params_ipa.nroCigarrillosDiario = this.form.signos.nro_cigarrillos_diario;
        this.params_ipa.ipa = this.form.signos.ipa;
        this.params_ipa.edad = this.form.edad.vlr_edad;
      } else this._validarOS();
    },

    _callbackIpa(data) {
      this.form.cierre.paciente_cronic.fuma = data.fuma;
      this.form.signos.nro_cigarrillos_diario = data.nroCigarrillosDiario;
      this.form.signos.ipa = data.ipa

      this.sw_var.ipa = false;
      this._validarOS()
    },

    _validarEscIpa() {
      this.sw_var.ipa = false;
      this._evaluarEscPag3()
    },

    _validarOS() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_os_hc_01",
          orden: "1",
          event_f8: hc_01._ventana_os,
          event_av_pag: hc_01.validarPag_03,
        },
        () => {
          if (hc_01.sw_var.covid) hc_01._evaluarPreguntasaCovid();
          else hc_01._evaluarEscPag3();
        },
        hc_01._validarCP
      );
    },
    _validarCP() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_cp_hc_01",
          orden: "1",
          event_f8: hc_01._ventana_cp,
        },
        hc_01._validarOS,
        hc_01._validarSD
      );
    },
    _validarSD() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_sd_hc_01",
          orden: "1",
          event_f8: hc_01._ventana_sd,
        },
        hc_01._validarCP,
        hc_01._validarSDemart
      );
    },
    _validarSDemart() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_sdermat_hc_01",
          orden: "1",
          event_f8: hc_01._ventana_sdermat,
        },
        hc_01._validarSD,
        hc_01._validarSOeste
      );
    },
    _validarSOeste() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_oeste_hc_01",
          orden: "1",
          event_f8: hc_01._ventanaSOeste,
        },
        hc_01._validarSDemart,
        hc_01._validarSN
      );
    },
    _validarSN() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_sn_hc_01",
          orden: "1",
          event_f8: hc_01._ventana_sn,
        },
        hc_01._validarSOeste,
        hc_01._validarSPsiq
      );
    },
    _validarSPsiq() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_sPsiq_hc_01",
          orden: "1",
          event_f8: hc_01._ventana_Siq,
        },
        hc_01._validarSN,
        hc_01._validarSGeni
      );
    },
    _validarSGeni() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_sgeni_hc_01",
          orden: "1",
          event_f8: hc_01._ventana_sgeni,
        },
        hc_01._validarSPsiq,
        hc_01._validarSGine
      );
    },
    _validarSGine() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_sGine_hc_01",
          orden: "1",
          event_f8: hc_01._ventana_sGine,
        },
        hc_01._validarSGeni,
        hc_01._validarS_obst
      );
    },
    _validarS_obst() {
      if (this.paciente.SEXO == "M") {
        this.validarPag_03();
      } else {
        this._validarSAgo();
      }
    },
    _validarSAgo() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_sAgo_hc_01",
          orden: "1",
          event_f8: hc_01._ventana_sAgo,
        },
        hc_01._validarSGine,
        hc_01.validarPag_03
      );
    },
    validarPag_03() {
      loader("show");

      let hc_01 = this,
        {
          os,
          cp,
          sd,
          sDermat,
          sist_oeste,
          sn,
          sis_psiq,
          sis_gent,
          sis_gine,
          sis_ago,
        } = hc_01.form_deta;

      // hc_01.modificarArrayDetalle("3010", os).then(() => {
      hc_01.modificarArrayDetalle("3020", cp).then(() => {
        hc_01.modificarArrayDetalle("3030", sd).then(() => {
          hc_01.modificarArrayDetalle("3040", sDermat).then(() => {
            hc_01.modificarArrayDetalle("3050", sist_oeste).then(() => {
              hc_01.modificarArrayDetalle("3060", sn).then(() => {
                hc_01.modificarArrayDetalle("3070", sis_psiq).then(() => {
                  hc_01.modificarArrayDetalle("3080", sis_gent).then(() => {
                    hc_01.modificarArrayDetalle("3090", sis_gine).then(() => {
                      hc_01
                        .modificarArrayDetalle("3095", sis_ago)
                        .then(() => {
                          hc_01._grabarDetalle_3010();
                        });
                    });
                  });
                });
              });
            });
          });
        });
      });
      // });
    },

    _grabarDetalle_3010() {
      let data = {}

      let os = this.form_deta.os || "";
      os = os.replaceEsp();

      texto = os.enterReplace().strToTable("RENG_DETHC");
      for (indice in texto) data[indice] = texto[indice];
      texto.tipo_ws = "PL";
      data = { 3010: texto };

      grabarDetalles(data, this.form.llave)
        .then(() => {
          // CON851("", "Antecedentes guardados", null, "success", "Correcto");
          this._grabarHc_pag3();
        })
        .catch((err) => {
          console.error(err);
          // CON851("", "Error Guardando antecedentes", null, "error", "Error");
          this._validarSGine();
        });
    },

    _grabarHc_pag3() {
      let hc_01 = this,
        datos = _getObjetoHc(hc_01.form);

      postData(datos, get_url("APP/HICLIN/SAVE_HC.DLL"))
        .then((data) => {
          hc_01._grabarDetalles_pag3_hc_01();
        })
        .catch((ee) => {
          loader("hide");
          hc_01._validarSGine();
        });
    },
    _grabarDetalles_pag3_hc_01() {
      let hc_01 = this;
      let filtro = ["2002", "2070", "3010", "9012"];

      let detalles = hc_01.hc_detalles.filter(
        (e) => e["LLAVE-HC"] == hc_01.form.llave && !filtro.includes(e["COD-DETHC"])
      );

      var datos = _getObjetoHcDetal(detalles, hc_01.form.llave);

      postData(datos, get_url("APP/HICLIN/SAVE_DETALLE.DLL"))
        .then(() => {
          if (this.paciente.SEXO == "M") {
            hc_01._llenarDatosPag5();
          } else {
            if (
              this.sw_var.embar ||
              $_REG_PROF.TAB_ESPEC[0].COD == "340" ||
              $_REG_PROF.TAB_ESPEC[0].COD == "341" ||
              $_REG_PROF.TAB_ESPEC[1].COD == "340" ||
              $_REG_PROF.TAB_ESPEC[1].COD == "341"
            ) {
              hc_01._llenarDatosPag4();
            } else {
              hc_01._llenarDatosPag5();
            }
          }
        })
        // .then(hc_01._llenarDatosPag4)
        .catch((err) => {
          loader("hide");
          hc_01._validarSGine();
        });
    },

    _llenarDatosPag4() {
      this.validarMenarquia();
      loader("hide");
    },

    validarMenarquia() {
      let hc_01 = this;
      hc_01.dato_4040.gineco_esq_w.menarquia_esq_w == ""
        ? (hc_01.dato_4040.gineco_esq_w.menarquia_esq_w = 0)
        : false;
      validarInputs(
        {
          form: "#menarquia_esq_hc_01",
        },
        () => {
          hc_01._validarOS;
        },
        () => {
          var menarq = parseInt(hc_01.dato_4040.gineco_esq_w.menarquia_esq_w);

          if (menarq == 0) {
            if ($_REG_HC.edad_hc.vlr_edad > 17) {
              CON851("74", "74", null, "error", "error");
              hc_01.validarMenarquia();
            } else {
              hc_01.dato_4040.gineco_esq_w.fecha_regla_esq_w = "";
              hc_01.dato_4040.gineco_esq_w.dismenorrea_esq_w = "";
              hc_01.dato_4040.gineco_esq_w.ciclos_esq_w = "";

              hc_01.validarDatoEmbarazo();
            }
          } else {
            if (menarq < 9) {
              CON851("03", "03", null, "error", "error");
              hc_01.validarMenarquia();
            } else {
              hc_01.validarDatoCiclos();
            }
          }
        }
      );
    },

    validarDatoCiclos() {
      let hc_01 = this;
      hc_01._ventanaCiclos();
    },

    validarDatoIrregular() {
      let hc_01 = this;
      var ciclo = parseInt(hc_01.dato_4040.gineco_esq_w.ciclos_esq_w);
      if (ciclo == 1) {
        hc_01.dato_4040.gineco_esq_w.ciclo_irreg_esq_w = "";
        hc_01.validarDatoGestaciones();
      } else {
        validarInputs(
          {
            form: "#ciclo_irreg_esq_hc_01",
          },
          () => {
            hc_01.validarDatoCiclos();
          },
          () => {
            hc_01.validarDatoGestaciones();
          }
        );
      }
    },

    validarDatoGestaciones() {
      let hc_01 = this;
      hc_01.dato_4040.gineco_esq_w.gestaciones_esq_w == ""
        ? (hc_01.dato_4040.gineco_esq_w.gestaciones_esq_w = 0)
        : false;
      validarInputs(
        {
          form: "#gestaciones_esq_hc_01",
        },
        () => {
          hc_01.validarDatoCiclos();
        },
        () => {
          var gest = parseInt(hc_01.dato_4040.gineco_esq_w.gestaciones_esq_w);
          if (gest > 30) {
            CON851("02", "02", null, "error", "error");
            hc_01.validarDatoGestaciones();
          } else if (gest == 0) {
            hc_01.dato_4040.gineco_esq_w.gestaciones_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.partos_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.cesareas_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.abortos_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.ectopicos_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.gine_molas_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.gine_obito_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.gine_gemel_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.gine_vivos_esq_w = 0;

            hc_01.validarDatoAnoRegla();
          } else {
            hc_01.validarDatoPartos();
          }
        }
      );
    },

    validarDatoPartos() {
      let hc_01 = this;
      hc_01.dato_4040.gineco_esq_w.partos_esq_w == ""
        ? (hc_01.dato_4040.gineco_esq_w.partos_esq_w = 0)
        : false;
      validarInputs(
        {
          form: "#partos_esq_hc_01",
        },
        () => {
          hc_01.validarDatoGestaciones();
        },
        () => {
          var partos = parseInt(hc_01.dato_4040.gineco_esq_w.partos_esq_w);
          var gest = parseInt(hc_01.dato_4040.gineco_esq_w.gestaciones_esq_w);
          if (partos > gest) {
            CON851("03", "03", null, "error", "error");
            hc_01.datoPartos_4040();
          } else if (partos == gest) {
            hc_01.dato_4040.gineco_esq_w.cesareas_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.abortos_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.ectopicos_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.gine_molas_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.gine_obito_esq_w = 0;
            hc_01.validarDatoGemelares();
          } else {
            hc_01.validarDatoCesarias();
          }
        }
      );
    },

    validarDatoCesarias() {
      let hc_01 = this;
      hc_01.dato_4040.gineco_esq_w.cesareas_esq_w == ""
        ? (hc_01.dato_4040.gineco_esq_w.cesareas_esq_w = 0)
        : false;
      validarInputs(
        {
          form: "#cesareas_esq_hc_01",
        },
        () => {
          hc_01.validarDatoPartos();
        },
        () => {
          var cesaria = parseInt(hc_01.dato_4040.gineco_esq_w.cesareas_esq_w);
          var gest = parseInt(hc_01.dato_4040.gineco_esq_w.gestaciones_esq_w);
          var partos = parseInt(hc_01.dato_4040.gineco_esq_w.partos_esq_w);
          if (cesaria > gest - partos) {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoCesarias();
          } else if (cesaria == gest - partos) {
            hc_01.dato_4040.gineco_esq_w.abortos_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.ectopicos_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.gine_molas_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.gine_obito_esq_w = 0;
            hc_01.validarDatoGemelares();
          } else {
            hc_01.validarDatoAbortos();
          }
        }
      );
    },

    validarDatoAbortos() {
      let hc_01 = this;
      hc_01.dato_4040.gineco_esq_w.abortos_esq_w == ""
        ? (hc_01.dato_4040.gineco_esq_w.abortos_esq_w = 0)
        : false;
      validarInputs(
        {
          form: "#abortos_esq_hc_01",
        },
        () => {
          hc_01.validarDatoPartos();
        },
        () => {
          var cesaria = parseInt(hc_01.dato_4040.gineco_esq_w.cesareas_esq_w);
          var gest = parseInt(hc_01.dato_4040.gineco_esq_w.gestaciones_esq_w);
          var partos = parseInt(hc_01.dato_4040.gineco_esq_w.partos_esq_w);
          var abort = parseInt(hc_01.dato_4040.gineco_esq_w.abortos_esq_w);
          if (abort > gest - partos - cesaria) {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoAbortos();
          } else if (abort == gest - partos - cesaria) {
            hc_01.dato_4040.gineco_esq_w.ectopicos_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.gine_molas_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.gine_obito_esq_w = 0;
            hc_01.validarDatoGemelares();
          } else {
            hc_01.validarDatoEctopicos();
          }
        }
      );
    },

    validarDatoEctopicos() {
      let hc_01 = this;
      hc_01.dato_4040.gineco_esq_w.ectopicos_esq_w == ""
        ? (hc_01.dato_4040.gineco_esq_w.ectopicos_esq_w = 0)
        : false;
      validarInputs(
        {
          form: "#ectopicos_esq_hc_01",
        },
        () => {
          hc_01.validarDatoPartos();
        },
        () => {
          var cesaria = parseInt(hc_01.dato_4040.gineco_esq_w.cesareas_esq_w);
          var gest = parseInt(hc_01.dato_4040.gineco_esq_w.gestaciones_esq_w);
          var partos = parseInt(hc_01.dato_4040.gineco_esq_w.partos_esq_w);
          var abort = parseInt(hc_01.dato_4040.gineco_esq_w.abortos_esq_w);
          var ectop = parseInt(hc_01.dato_4040.gineco_esq_w.ectopicos_esq_w);
          if (ectop > gest - partos - cesaria - abort) {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoEctopicos();
          } else if (ectop == gest - partos - cesaria - abort) {
            hc_01.dato_4040.gineco_esq_w.gine_molas_esq_w = 0;
            hc_01.dato_4040.gineco_esq_w.gine_obito_esq_w = 0;
            hc_01.validarDatoGemelares();
          } else {
            hc_01.validarDatoMolas();
          }
        }
      );
    },

    validarDatoMolas() {
      let hc_01 = this;
      hc_01.dato_4040.gineco_esq_w.gine_molas_esq_w == ""
        ? (hc_01.dato_4040.gineco_esq_w.gine_molas_esq_w = 0)
        : false;
      validarInputs(
        {
          form: "#gine_molas_esq_hc_01",
        },
        () => {
          hc_01.validarDatoPartos();
        },
        () => {
          var cesaria = parseInt(hc_01.dato_4040.gineco_esq_w.cesareas_esq_w);
          var gest = parseInt(hc_01.dato_4040.gineco_esq_w.gestaciones_esq_w);
          var partos = parseInt(hc_01.dato_4040.gineco_esq_w.partos_esq_w);
          var abort = parseInt(hc_01.dato_4040.gineco_esq_w.abortos_esq_w);
          var ectop = parseInt(hc_01.dato_4040.gineco_esq_w.ectopicos_esq_w);
          var molas = parseInt(hc_01.dato_4040.gineco_esq_w.gine_molas_esq_w);
          if (molas > gest - partos - cesaria - abort - ectop) {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoMolas();
          } else if (molas == gest - partos - cesaria - abort - ectop) {
            hc_01.dato_4040.gineco_esq_w.gine_obito_esq_w = 0;
            hc_01.validarDatoGemelares();
          } else {
            hc_01.validarDatoObitos();
          }
        }
      );
    },

    validarDatoObitos() {
      let hc_01 = this;
      hc_01.dato_4040.gineco_esq_w.gine_obito_esq_w == ""
        ? (hc_01.dato_4040.gineco_esq_w.gine_obito_esq_w = 0)
        : false;
      validarInputs(
        {
          form: "#gine_obito_esq_hc_01",
        },
        () => {
          hc_01.validarDatoPartos();
        },
        () => {
          var cesaria = parseInt(hc_01.dato_4040.gineco_esq_w.cesareas_esq_w);
          var gest = parseInt(hc_01.dato_4040.gineco_esq_w.gestaciones_esq_w);
          var partos = parseInt(hc_01.dato_4040.gineco_esq_w.partos_esq_w);
          var abort = parseInt(hc_01.dato_4040.gineco_esq_w.abortos_esq_w);
          var ectop = parseInt(hc_01.dato_4040.gineco_esq_w.ectopicos_esq_w);
          var molas = parseInt(hc_01.dato_4040.gineco_esq_w.gine_molas_esq_w);
          var obitos = parseInt(hc_01.dato_4040.gineco_esq_w.gine_obito_esq_w);
          if (obitos == gest - partos - cesaria - abort - ectop - molas) {
            hc_01.validarDatoGemelares();
          } else {
            CON851("51", "51", null, "error", "error");
            hc_01.validarDatoObitos();
          }
        }
      );
    },

    validarDatoGemelares() {
      let hc_01 = this;
      hc_01.dato_4040.gineco_esq_w.gine_gemel_esq_w == ""
        ? (hc_01.dato_4040.gineco_esq_w.gine_gemel_esq_w = 0)
        : false;
      validarInputs(
        {
          form: "#gine_gemel_esq_hc_01",
        },
        () => {
          hc_01.validarDatoPartos();
        },
        () => {
          var cesaria = parseInt(hc_01.dato_4040.gineco_esq_w.cesareas_esq_w);
          var partos = parseInt(hc_01.dato_4040.gineco_esq_w.partos_esq_w);
          var gemel = parseInt(hc_01.dato_4040.gineco_esq_w.gine_gemel_esq_w);
          if (gemel > partos + cesaria) {
            CON851("51", "51", null, "error", "error");
            hc_01.validarDatoGemelares();
          } else {
            hc_01.validarDatoNaciVivos();
          }
        }
      );
    },

    validarDatoNaciVivos() {
      let hc_01 = this;
      hc_01.dato_4040.gineco_esq_w.gine_vivos_esq_w == ""
        ? (hc_01.dato_4040.gineco_esq_w.gine_vivos_esq_w = 0)
        : false;
      validarInputs(
        {
          form: "#gine_vivos_esq_hc_01",
        },
        () => {
          hc_01.validarDatoPartos();
        },
        () => {
          var cesaria = parseInt(hc_01.dato_4040.gineco_esq_w.cesareas_esq_w);
          var partos = parseInt(hc_01.dato_4040.gineco_esq_w.partos_esq_w);
          var gemel = parseInt(hc_01.dato_4040.gineco_esq_w.gine_gemel_esq_w);
          var vivos = parseInt(hc_01.dato_4040.gineco_esq_w.gine_vivos_esq_w);
          if (gemel == 0 && vivos > partos + cesaria) {
            CON851("51", "51", null, "error", "error");
            hc_01.validarDatoNaciVivos();
          } else {
            hc_01.validarDatoNacPesoInf();
          }
        }
      );
    },

    validarDatoNacPesoInf() {
      let hc_01 = this;
      hc_01.dato_4040.gineco_esq_w.gine_vivos_esq_w == 0
        ? (hc_01.dato_4040.gineco_esq_w.gine_25_esq_w = 0)
        : false;
      validarInputs(
        {
          form: "#gine_25_esq_hc_01",
        },
        () => {
          hc_01.validarDatoNaciVivos();
        },
        () => {
          var gine25 = parseInt(hc_01.dato_4040.gineco_esq_w.gine_25_esq_w);
          var vivos = parseInt(hc_01.dato_4040.gineco_esq_w.gine_vivos_esq_w);
          if (gine25 > vivos) {
            CON851("51", "51", null, "error", "error");
            hc_01.validarDatoNacPesoInf();
          } else {
            hc_01.validarDatoNacPesoSup();
          }
        }
      );
    },

    validarDatoNacPesoSup() {
      let hc_01 = this;
      var gine25 = parseInt(hc_01.dato_4040.gineco_esq_w.gine_25_esq_w);
      var vivos = parseInt(hc_01.dato_4040.gineco_esq_w.gine_vivos_esq_w);
      if (vivos == 0 || vivos == gine25) {
        hc_01.dato_4040.gineco_esq_w.gine_40_esq_w = 0;
        hc_01.validarDatoAnoRegla();
      } else {
        validarInputs(
          {
            form: "#gine_40_esq_hc_01",
          },
          () => {
            hc_01.validarDatoNacPesoInf();
          },
          () => {
            var gine25 = parseInt(hc_01.dato_4040.gineco_esq_w.gine_25_esq_w);
            var gine40 = parseInt(hc_01.dato_4040.gineco_esq_w.gine_40_esq_w);
            var vivos = parseInt(hc_01.dato_4040.gineco_esq_w.gine_vivos_esq_w);
            if (gine40 > vivos - gine25) {
              CON851("51", "51", null, "error", "error");
              hc_01.validarDatoNacPesoSup();
            } else {
              hc_01.validarDatoAnoRegla();
            }
          }
        );
      }
    },

    validarDatoAnoRegla() {
      let hc_01 = this;
      hc_01.fecha_limi_regla = this._getFechaActual();

      var ano = parseInt(hc_01.fecha_limi_regla.substring(0, 4));
      var mes = parseInt(hc_01.fecha_limi_regla.substring(4, 6));
      var dia = parseInt(hc_01.fecha_limi_regla.substring(6, 8));

      if (mes > 10) {
        mes = mes - 10;
      } else {
        ano = ano - 1;
        mes = mes + 2;
      }
      dia = 1;

      var mes = cerosIzq(mes, 2);
      var dia = cerosIzq(dia, 2);

      hc_01.fecha_limi_regla = `${ano}${mes}${dia}`;

      validarInputs(
        {
          form: "#anoRegla",
        },
        () => {
          hc_01.validarDatoNacPesoInf();
        },
        () => {
          var ano = parseInt(hc_01.descrip.ano_regla);

          if (ano < 1950) {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoAnoRegla();
          } else {
            hc_01.validarDatoMesRegla();
          }
        }
      );
    },

    validarDatoMesRegla() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#mesRegla",
        },
        () => {
          hc_01.validarDatoAnoRegla();
        },
        () => {
          hc_01.descrip.mes_regla = cerosIzq(hc_01.descrip.mes_regla, 2);
          var mes = parseInt(hc_01.descrip.mes_regla);

          if (mes > 12 || mes < 1 || mes == 0) {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoMesRegla();
          } else {
            hc_01.validarDatoDiaRegla();
          }
        }
      );
    },

    validarDatoDiaRegla() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#diaRegla",
        },
        () => {
          hc_01.validarDatoMesRegla();
        },
        () => {
          hc_01.descrip.dia_regla = cerosIzq(hc_01.descrip.dia_regla, 2);
          var dia = parseInt(hc_01.descrip.dia_regla);

          if (dia > 31 || dia < 1 || dia == 0) {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoDiaRegla();
          } else {
            hc_01.dato_4040.gineco_esq_w.fecha_regla_esq_w = `${hc_01.descrip.ano_regla}${hc_01.descrip.mes_regla}${hc_01.descrip.dia_regla}`;
            var fechaRegla = parseInt(
              hc_01.dato_4040.gineco_esq_w.fecha_regla_esq_w
            );

            if (fechaRegla > hc_01.fecha_actual) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoRegla();
            } else {
              if (this.sw_var.embar && fechaRegla < hc_01.fecha_limi_regla) {
                CON851("37", "37", null, "error", "error");
                hc_01.validarDatoAnoRegla();
              } else {
                hc_01.datoCalcularEdadGestRegla();
              }
            }
          }
        }
      );
    },

    datoCalcularEdadGestRegla() {
      let hc_01 = this;

      var fechaRegla = hc_01.dato_4040.gineco_esq_w.fecha_regla_esq_w;
      var mes = hc_01.descrip.mes_regla;

      if (!this.sw_var.embar || mes == "") {
        hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w = "";
      } else {
        var nro_dias = SC_DIAS(fechaRegla, hc_01.fecha_actual);
        hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w = nro_dias / 7;
      }
      hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w = hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w
        .toString()
        .substring(0, 4);
      hc_01.validarDatoAnoParto();
    },

    validarDatoAnoParto() {
      let hc_01 = this;
      hc_01.descrip.ano_parto == "" ? (hc_01.descrip.ano_parto = 0) : false;

      var cesaria = parseInt(hc_01.dato_4040.gineco_esq_w.cesareas_esq_w);
      var partos = parseInt(hc_01.dato_4040.gineco_esq_w.partos_esq_w);
      if (partos == 0 && cesaria == 0) {
        hc_01.dato_4040.gineco_esq_w.ult_parto_esq_w = "";
        hc_01.validarDatoAnoCitol();
      } else {
        validarInputs(
          {
            form: "#anoParto",
          },
          () => {
            hc_01.validarDatoAnoRegla();
          },
          () => {
            var ano = parseInt(hc_01.descrip.ano_parto);

            if (ano > 0 && ano < 1950) {
              CON851("03", "03", null, "error", "error");
              hc_01.validarDatoAnoParto();
            } else {
              hc_01.validarDatoMesParto();
            }
          }
        );
      }
    },

    validarDatoMesParto() {
      let hc_01 = this;
      hc_01.descrip.mes_parto == "" ? (hc_01.descrip.mes_parto = 0) : false;
      validarInputs(
        {
          form: "#mesParto",
        },
        () => {
          hc_01.validarDatoAnoParto();
        },
        () => {
          hc_01.descrip.mes_parto = cerosIzq(hc_01.descrip.mes_parto, 2);
          var mes = parseInt(hc_01.descrip.mes_parto);

          if (mes > 12) {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoMesParto();
          } else {
            hc_01.validarDatoDiaParto();
          }
        }
      );
    },

    validarDatoDiaParto() {
      let hc_01 = this;
      hc_01.descrip.dia_parto == "" ? (hc_01.descrip.dia_parto = 0) : false;
      validarInputs(
        {
          form: "#diaParto",
        },
        () => {
          hc_01.validarDatoMesParto();
        },
        () => {
          hc_01.descrip.dia_parto = cerosIzq(hc_01.descrip.dia_parto, 2);
          var dia = parseInt(hc_01.descrip.dia_parto);

          if (dia > 31) {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoDiaParto();
          } else {
            hc_01.dato_4040.gineco_esq_w.ult_parto_esq_w = `${hc_01.descrip.ano_parto}${hc_01.descrip.mes_parto}${hc_01.descrip.dia_parto}`;
            var fechaParto = parseInt(
              hc_01.dato_4040.gineco_esq_w.ult_parto_esq_w
            );

            if (fechaParto > hc_01.fecha_actual) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoParto();
            } else {
              hc_01.validarDatoAnoCitol();
            }
          }
        }
      );
    },

    validarDatoAnoCitol() {
      let hc_01 = this;
      hc_01.descrip.ano_citol == "" ? (hc_01.descrip.ano_citol = 0) : false;
      validarInputs(
        {
          form: "#anoCitol",
        },
        () => {
          var cesaria = parseInt(hc_01.dato_4040.gineco_esq_w.cesareas_esq_w);
          var partos = parseInt(hc_01.dato_4040.gineco_esq_w.partos_esq_w);
          if (partos == 0 && cesaria == 0) {
            hc_01.validarDatoAnoRegla();
          } else {
            hc_01.validarDatoAnoParto();
          }
        },
        () => {
          var ano = parseInt(hc_01.descrip.ano_citol);

          if (ano > 0 && ano < 2000) {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoAnoCitol();
          } else if (ano == "" || ano == 0) {
            (hc_01.dato_4040.gineco_esq_w.fecha_citol_esq_w = ""),
              (hc_01.dato_4040.gineco_esq_w.result_citol_esq_w = ""),
              (hc_01.dato_4040.gineco_esq_w.citol_anormal_esq_w = ""),
              (hc_01.descrip.descripResultCitol = ""),
              hc_01.validarDatoInfec();
          } else {
            hc_01.validarDatoMesCitol();
          }
        }
      );
    },

    validarDatoMesCitol() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#mesCitol",
        },
        () => {
          hc_01.validarDatoAnoCitol();
        },
        () => {
          hc_01.descrip.mes_citol = cerosIzq(hc_01.descrip.mes_citol, 2);
          var mes = parseInt(hc_01.descrip.mes_citol);

          if (mes > 12) {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoMesCitol();
          } else {
            hc_01.validarDatoDiaCitol();
          }
        }
      );
    },

    validarDatoDiaCitol() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#diaCitol",
        },
        () => {
          hc_01.validarDatoMesCitol();
        },
        () => {
          hc_01.descrip.dia_citol = cerosIzq(hc_01.descrip.dia_citol, 2);
          var dia = parseInt(hc_01.descrip.dia_citol);

          if (dia > 31) {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoDiaCitol();
          } else {
            hc_01.dato_4040.gineco_esq_w.fecha_citol_esq_w = `${hc_01.descrip.ano_citol}${hc_01.descrip.mes_citol}${hc_01.descrip.dia_citol}`;
            var fechaCitol = parseInt(
              hc_01.dato_4040.gineco_esq_w.fecha_citol_esq_w
            );

            if (fechaCitol > hc_01.fecha_actual) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoCitol();
            } else {
              hc_01.validarDatoResultCitol();
            }
          }
        }
      );
    },

    validarDatoResultCitol() {
      let hc_01 = this;
      hc_01.ventanaResultCitol();
    },

    validarDatoAnorCitol() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#citol_anormal_esq_hc_01",
        },
        () => {
          hc_01.validarDatoResultCitol();
        },
        () => {
          hc_01.dato_4040.gineco_esq_w.citol_anormal_esq_w = hc_01.dato_4040.gineco_esq_w.citol_anormal_esq_w.replace(
            /[\!\*\]\[\}\{\"\'\&\t]/g,
            ""
          );

          hc_01.validarDatoInfec();
        }
      );
    },

    validarDatoInfec() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#infec_pelvic_esq_hc_01",
        },
        () => {
          hc_01.validarDatoAnoCitol();
        },
        () => {
          hc_01.dato_4040.gineco_esq_w.infec_pelvic_esq_w = hc_01.dato_4040.gineco_esq_w.infec_pelvic_esq_w.replace(
            /[\!\*\]\[\}\{\"\'\&\t]/g,
            ""
          );

          hc_01.validarDatoEndomec();
        }
      );
    },

    validarDatoEndomec() {
      let hc_01 = this;
      // this.dato_4040.gineco_esq_w.endometros_esq_w.trim() == '' ? this.dato_4040.gineco_esq_w.endometros_esq_w = 'N' : false;
      validarInputs(
        {
          form: "#endometros_esq_hc_01",
        },
        () => {
          hc_01.validarDatoInfec();
        },
        () => {
          hc_01.dato_4040.gineco_esq_w.endometros_esq_w = hc_01.dato_4040.gineco_esq_w.endometros_esq_w.toUpperCase();
          var endo = hc_01.dato_4040.gineco_esq_w.endometros_esq_w;
          if (endo == "S" || endo == "N" || endo == "") {
            hc_01.validarDatoEspeculo();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoEndomec();
          }
        }
      );
    },

    validarDatoEspeculo() {
      let hc_01 = this;
      hc_01.ventanaEspeculoscopia();
    },

    validarDatoAnormalEspec() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#especul_anormal_esq_hc_01",
        },
        () => {
          hc_01.validarDatoEspeculo();
        },
        () => {
          hc_01.dato_4040.gineco_esq_w.especul_anormal_esq_w = hc_01.dato_4040.gineco_esq_w.especul_anormal_esq_w.replace(
            /[\!\*\]\[\}\{\"\'\&\t]/g,
            ""
          );

          hc_01.validarDatoUtero();
        }
      );
    },

    validarDatoUtero() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#ultrason_utero_esq_hc_01",
        },
        () => {
          hc_01.validarDatoEspeculo();
        },
        () => {
          hc_01.dato_4040.gineco_esq_w.ultrason_utero_esq_w = hc_01.dato_4040.gineco_esq_w.ultrason_utero_esq_w
            .replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
            .toUpperCase();
          var utero = hc_01.dato_4040.gineco_esq_w.ultrason_utero_esq_w;
          if (utero.trim() == "") {
            CON851("EG", "EG", null, "error", "error");
          }

          hc_01.validarDatoOvarios();
        }
      );
    },

    validarDatoOvarios() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#ultrason_ovario_esq_hc_01",
        },
        () => {
          hc_01.validarDatoUtero();
        },
        () => {
          hc_01.dato_4040.gineco_esq_w.ultrason_ovario_esq_w = hc_01.dato_4040.gineco_esq_w.ultrason_ovario_esq_w
            .replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
            .toUpperCase();

          hc_01.validarDatoTrompas();
        }
      );
    },

    validarDatoTrompas() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#ultrason_trompa_esq_hc_01",
        },
        () => {
          hc_01.validarDatoOvarios();
        },
        () => {
          hc_01.dato_4040.gineco_esq_w.ultrason_trompa_esq_w = hc_01.dato_4040.gineco_esq_w.ultrason_trompa_esq_w
            .replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
            .toUpperCase();

          hc_01.validarDatoOtrosUlt();
        }
      );
    },

    validarDatoOtrosUlt() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#ultrason_otros_esq_hc_01",
        },
        () => {
          hc_01.validarDatoTrompas();
        },
        () => {
          hc_01.dato_4040.gineco_esq_w.ultrason_otros_esq_w = hc_01.dato_4040.gineco_esq_w.ultrason_otros_esq_w
            .replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
            .toUpperCase();

          hc_01.validarDatoEmbarazo();
        }
      );
    },

    validarDatoEmbarazo() {
      let hc_01 = this;
      let rips = this.form.rips;
      let edad_gest = hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w;
      if (this.paciente.SEXO == "M") {
        rips.embarazo = "9";
        hc_01.validarDatoEstado();
      } else {
        if (
          hc_01.form.edad.unid_edad == "D" ||
          hc_01.form.edad.unid_edad == "M" ||
          (hc_01.form.edad.unid_edad == "A" && hc_01.form.edad.vlr_edad < 10) ||
          (hc_01.form.edad.unid_edad == "A" && hc_01.form.edad.vlr_edad > 60) ||
          !this.sw_var.embar
        ) {
          rips.embarazo = "4";
          hc_01.validarDatoEstado();
        } else {
          if (edad_gest == 0 || edad_gest == "") {
            hc_01.ventanaEmbarazo();
          } else {
            if (edad_gest < 13) {
              rips.embarazo = "1";
              hc_01.validarDatoEstado();
            } else {
              if (edad_gest < 26) {
                rips.embarazo = "2";
                hc_01.validarDatoEstado();
              } else {
                rips.embarazo = "3";
                hc_01.validarDatoEstado();
              }
            }
          }
        }
      }
    },

    validarDatoEstado() {
      let hc_01 = this;
      let rips = this.form.rips;

      switch (rips.embarazo) {
        case "1":
          for (var i in hc_01.dato_4040.tabla_vih_esq_w) {
            if (i != 0) {
              hc_01.dato_4040.tabla_vih_esq_w[i].fecha_vih_esq_w = "";
              hc_01.dato_4040.tabla_vih_esq_w[i].resultado_vih_esq_w = "";
            }
          }

          for (var i in hc_01.dato_4040.tabla_serolo_esq_w) {
            if (i != 0) {
              hc_01.dato_4040.tabla_serolo_esq_w[i].fecha_serolo_esq_w = "";
              hc_01.dato_4040.tabla_serolo_esq_w[i].resultado_serolo_esq_w = "";
            }
          }

          for (var i in hc_01.dato_4040.tabla_hemogl_esq_w) {
            if (i != 0) {
              hc_01.dato_4040.tabla_hemogl_esq_w[i].fecha_hemogl_esq_w = "";
              hc_01.dato_4040.tabla_hemogl_esq_w[i].resultado_hemogl_esq_w = "";
            }
          }

          for (var i in hc_01.dato_4040.tabla_igg_esq_w) {
            if (i != 0) {
              hc_01.dato_4040.tabla_igg_esq_w[i].fecha_igg_esq_w = "";
              hc_01.dato_4040.tabla_igg_esq_w[i].resultado_igg_esq_w = "";
            }
          }

          for (var i in hc_01.dato_4040.tabla_glicem_esq_w) {
            if (i != 0) {
              hc_01.dato_4040.tabla_glicem_esq_w[i].fecha_glicem_esq_w = "";
              hc_01.dato_4040.tabla_glicem_esq_w[i].resultado_glicem_esq_w = "";
            }
          }

          for (var i in hc_01.dato_4040.tabla_uroanali_esq_w) {
            if (i != 0) {
              hc_01.dato_4040.tabla_uroanali_esq_w[i].fecha_uroanali_esq_w = "";
              hc_01.dato_4040.tabla_uroanali_esq_w[i].resultado_uroanali_esq_w =
                "";
            }
          }

          for (var i in hc_01.dato_4040.tabla_uroculti_esq_w) {
            if (i != 0) {
              hc_01.dato_4040.tabla_uroculti_esq_w[i].fecha_uroculti_esq_w = "";
              hc_01.dato_4040.tabla_uroculti_esq_w[i].resultado_uroculti_esq_w =
                "";
            }
          }

          for (var i in hc_01.dato_4040.tabla_frotisv_esq_w) {
            if (i != 0) {
              hc_01.dato_4040.tabla_frotisv_esq_w[i].fecha_frotisv_esq_w = "";
              hc_01.dato_4040.tabla_frotisv_esq_w[i].resultado_frotisv_esq_w =
                "";
            }
          }

          for (var i in hc_01.dato_4040.tabla_glicemia_esq_w) {
            if (i != 0) {
              hc_01.dato_4040.tabla_glicemia_esq_w[i].fecha_glicemia_esq_w = "";
              hc_01.dato_4040.tabla_glicemia_esq_w[i].resultado_glicemia_esq_w =
                "";
            }
          }
          break;
        case "2":
          hc_01.dato_4040.tabla_vih_esq_w[2].fecha_vih_esq_w = "";
          hc_01.dato_4040.tabla_vih_esq_w[2].resultado_vih_esq_w = "";

          hc_01.dato_4040.tabla_serolo_esq_w[2].fecha_serolo_esq_w = "";
          hc_01.dato_4040.tabla_serolo_esq_w[2].resultado_serolo_esq_w = "";

          hc_01.dato_4040.tabla_hemogl_esq_w[2].fecha_hemogl_esq_w = "";
          hc_01.dato_4040.tabla_hemogl_esq_w[2].resultado_hemogl_esq_w = "";

          hc_01.dato_4040.tabla_igg_esq_w[2].fecha_igg_esq_w = "";
          hc_01.dato_4040.tabla_igg_esq_w[2].resultado_igg_esq_w = "";

          hc_01.dato_4040.tabla_glicem_esq_w[2].fecha_glicem_esq_w = "";
          hc_01.dato_4040.tabla_glicem_esq_w[2].resultado_glicem_esq_w = "";

          hc_01.dato_4040.tabla_uroanali_esq_w[2].fecha_uroanali_esq_w = "";
          hc_01.dato_4040.tabla_uroanali_esq_w[2].resultado_uroanali_esq_w = "";

          hc_01.dato_4040.tabla_uroculti_esq_w[2].fecha_uroculti_esq_w = "";
          hc_01.dato_4040.tabla_uroculti_esq_w[2].resultado_uroculti_esq_w = "";

          hc_01.dato_4040.tabla_frotisv_esq_w[2].fecha_frotisv_esq_w = "";
          hc_01.dato_4040.tabla_frotisv_esq_w[2].resultado_frotisv_esq_w = "";

          hc_01.dato_4040.tabla_glicemia_esq_w[2].fecha_glicemia_esq_w = "";
          hc_01.dato_4040.tabla_glicemia_esq_w[2].resultado_glicemia_esq_w = "";
          break;
        default:
          for (var i in hc_01.dato_4040.tabla_vih_esq_w) {
            hc_01.dato_4040.tabla_vih_esq_w[i].fecha_vih_esq_w = "";
            hc_01.dato_4040.tabla_vih_esq_w[i].resultado_vih_esq_w = "";
          }

          for (var i in hc_01.dato_4040.tabla_serolo_esq_w) {
            hc_01.dato_4040.tabla_serolo_esq_w[i].fecha_serolo_esq_w = "";
            hc_01.dato_4040.tabla_serolo_esq_w[i].resultado_serolo_esq_w = "";
          }

          for (var i in hc_01.dato_4040.tabla_hemogl_esq_w) {
            hc_01.dato_4040.tabla_hemogl_esq_w[i].fecha_hemogl_esq_w = "";
            hc_01.dato_4040.tabla_hemogl_esq_w[i].resultado_hemogl_esq_w = "";
          }

          for (var i in hc_01.dato_4040.tabla_igg_esq_w) {
            hc_01.dato_4040.tabla_igg_esq_w[i].fecha_igg_esq_w = "";
            hc_01.dato_4040.tabla_igg_esq_w[i].resultado_igg_esq_w = "";
          }

          for (var i in hc_01.dato_4040.tabla_glicem_esq_w) {
            hc_01.dato_4040.tabla_glicem_esq_w[i].fecha_glicem_esq_w = "";
            hc_01.dato_4040.tabla_glicem_esq_w[i].resultado_glicem_esq_w = "";
          }

          hc_01.dato_4040.prenatal_esq_w.fecha_aseso_pre_esq_w = "";
          hc_01.dato_4040.prenatal_esq_w.fecha_aseso_pos_esq_w = "";
          hc_01.dato_4040.prenatal_esq_w.fecha_eco_obst_esq_w = "";
          hc_01.dato_4040.prenatal_esq_w.fecha_vac_influ_esq_w = "";
          hc_01.dato_4040.prenatal_esq_w.fecha_vac_tdap_esq_w = "";
          hc_01.dato_4040.prenatal_esq_w.fecha_vac_tt_esq_w = "";

          hc_01.dato_4040.fecha_interconsulta_esq_w.fecha_gineco_esq_w = "";
          hc_01.dato_4040.fecha_interconsulta_esq_w.fecha_odonto_esq_w = "";
          hc_01.dato_4040.fecha_interconsulta_esq_w.fecha_nutri_esq_w = "";
          hc_01.dato_4040.fecha_interconsulta_esq_w.fecha_psicol_esq_w = "";

          hc_01.dato_4040.hepatitis_b_esq_w.fecha_hepat_b_esq_w = "";
          hc_01.dato_4040.hepatitis_b_esq_w.resultado_hepat_b_esq_w = "";
          hc_01.dato_4040.hepatitis_b_esq_w.nro_dosis_tt_esq_w = "";

          for (var i in hc_01.dato_4040.tabla_hemogra_esq_w) {
            hc_01.dato_4040.tabla_hemogra_esq_w[i].fecha_hemogra_esq_w = "";
            hc_01.dato_4040.tabla_hemogra_esq_w[i].resultado_hemogra_esq_w = "";
          }

          for (var i in hc_01.dato_4040.tabla_hemopara_esq_w) {
            hc_01.dato_4040.tabla_hemopara_esq_w[i].fecha_hemopara_esq_w = "";
            hc_01.dato_4040.tabla_hemopara_esq_w[i].resultado_hemopara_esq_w =
              "";
          }

          for (var i in hc_01.dato_4040.tabla_fta_abs_esq_w) {
            hc_01.dato_4040.tabla_fta_abs_esq_w[i].fecha_fta_abs_esq_w = "";
            hc_01.dato_4040.tabla_fta_abs_esq_w[i].resultado_fta_abs_esq_w = "";
          }

          for (var i in hc_01.dato_4040.tabla_uroanali_esq_w) {
            hc_01.dato_4040.tabla_uroanali_esq_w[i].fecha_uroanali_esq_w = "";
            hc_01.dato_4040.tabla_uroanali_esq_w[i].resultado_uroanali_esq_w =
              "";
          }

          for (var i in hc_01.dato_4040.tabla_uroculti_esq_w) {
            hc_01.dato_4040.tabla_uroculti_esq_w[i].fecha_uroculti_esq_w = "";
            hc_01.dato_4040.tabla_uroculti_esq_w[i].resultado_uroculti_esq_w =
              "";
          }

          for (var i in hc_01.dato_4040.tabla_frotisv_esq_w) {
            hc_01.dato_4040.tabla_frotisv_esq_w[i].fecha_frotisv_esq_w = "";
            hc_01.dato_4040.tabla_frotisv_esq_w[i].resultado_frotisv_esq_w = "";
          }

          for (var i in hc_01.dato_4040.tabla_glicemia_esq_w) {
            hc_01.dato_4040.tabla_glicemia_esq_w[i].fecha_glicemia_esq_w = "";
            hc_01.dato_4040.tabla_glicemia_esq_w[i].resultado_glicemia_esq_w =
              "";
          }
          break;
      }

      var embar = consult_embar(rips.embarazo);
      hc_01.descrip.codEmba = rips.embarazo;
      hc_01.descrip.descripEmba = embar;

      if (this.sw_var.embar && (rips.embarazo == "4" || rips.embarazo == "9")) {
        CON851("03", "03", null, "error", "error");
        hc_01.validarDatoEmbarazo();
      } else {
        hc_01.validarDatoPlaneado();
      }
    },

    validarDatoPlaneado() {
      let hc_01 = this;
      this.dato_4040.gineco_esq_w.gine_plane_esq_w.trim() == ""
        ? (this.dato_4040.gineco_esq_w.gine_plane_esq_w = "N")
        : false;
      validarInputs(
        {
          form: "#gine_plane_esq_hc_01",
        },
        () => {
          hc_01.validarDatoAnoRegla();
        },
        () => {
          hc_01.dato_4040.gineco_esq_w.gine_plane_esq_w = hc_01.dato_4040.gineco_esq_w.gine_plane_esq_w.toUpperCase();
          var temp = hc_01.dato_4040.gineco_esq_w.gine_plane_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoAceptado();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoPlaneado();
          }
        }
      );
    },

    validarDatoAceptado() {
      let hc_01 = this;
      this.dato_4040.gineco_esq_w.gine_acept_esq_w.trim() == ""
        ? (this.dato_4040.gineco_esq_w.gine_acept_esq_w = "N")
        : false;
      validarInputs(
        {
          form: "#gine_acept_esq_hc_01",
        },
        () => {
          hc_01.validarDatoPlaneado();
        },
        () => {
          hc_01.dato_4040.gineco_esq_w.gine_acept_esq_w = hc_01.dato_4040.gineco_esq_w.gine_acept_esq_w.toUpperCase();
          var temp = hc_01.dato_4040.gineco_esq_w.gine_acept_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoEstudio();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoAceptado();
          }
        }
      );
    },

    validarDatoEstudio() {
      let hc_01 = this;
      hc_01.ventanaNivelEstudio();
    },

    validarDatoPesoPrevio() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#peso_prev_hc_01",
        },
        () => {
          hc_01.validarDatoEstudio();
        },
        () => {
          var temp = parseFloat(this.form.signos.peso_prev);

          if (temp < 30) {
            CON851("02", "02", null, "error", "error");
            hc_01.validarDatoPesoPrevio();
          } else {
            hc_01.validarDatoHemoglob();
          }
        }
      );
    },

    validarDatoHemoglob() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#hemoglob_esq_hc_01",
        },
        () => {
          hc_01.validarDatoPesoPrevio();
        },
        () => {
          hc_01.validarDatoTomaHierro();
        }
      );
    },

    validarDatoTomaHierro() {
      let hc_01 = this;
      this.dato_4040.gineco_esq_w.toma_hierro_esq_w.trim() == ""
        ? (this.dato_4040.gineco_esq_w.toma_hierro_esq_w = "N")
        : false;
      validarInputs(
        {
          form: "#toma_hierro_esq_hc_01",
        },
        () => {
          hc_01.validarDatoHemoglob();
        },
        () => {
          hc_01.dato_4040.gineco_esq_w.toma_hierro_esq_w = hc_01.dato_4040.gineco_esq_w.toma_hierro_esq_w.toUpperCase();
          var temp = hc_01.dato_4040.gineco_esq_w.toma_hierro_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoTomaAcido();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoTomaHierro();
          }
        }
      );
    },

    validarDatoTomaAcido() {
      let hc_01 = this;
      this.dato_4040.gineco_esq_w.toma_acidof_esq_w.trim() == ""
        ? (this.dato_4040.gineco_esq_w.toma_acidof_esq_w = "N")
        : false;
      validarInputs(
        {
          form: "#toma_acidof_esq_hc_01",
        },
        () => {
          hc_01.validarDatoTomaHierro();
        },
        () => {
          hc_01.dato_4040.gineco_esq_w.toma_acidof_esq_w = hc_01.dato_4040.gineco_esq_w.toma_acidof_esq_w.toUpperCase();
          var temp = hc_01.dato_4040.gineco_esq_w.toma_acidof_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoTomaCalcio();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoTomaAcido();
          }
        }
      );
    },

    validarDatoTomaCalcio() {
      let hc_01 = this;
      this.dato_4040.gineco_esq_w.toma_calcio_esq_w.trim() == ""
        ? (this.dato_4040.gineco_esq_w.toma_calcio_esq_w = "N")
        : false;
      validarInputs(
        {
          form: "#toma_calcio_esq_hc_01",
        },
        () => {
          hc_01.validarDatoTomaAcido();
        },
        () => {
          hc_01.dato_4040.gineco_esq_w.toma_calcio_esq_w = hc_01.dato_4040.gineco_esq_w.toma_calcio_esq_w.toUpperCase();
          var temp = hc_01.dato_4040.gineco_esq_w.toma_calcio_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoAltoRiesgo();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoTomaCalcio();
          }
        }
      );
    },

    validarDatoAltoRiesgo() {
      let hc_01 = this;
      this.dato_4040.gineco_esq_w.emb_alto_riesg_esq_w.trim() == ""
        ? (this.dato_4040.gineco_esq_w.emb_alto_riesg_esq_w = "N")
        : false;
      validarInputs(
        {
          form: "#emb_alto_riesg_esq_hc_01",
        },
        () => {
          hc_01.validarDatoTomaCalcio();
        },
        () => {
          hc_01.dato_4040.gineco_esq_w.emb_alto_riesg_esq_w = hc_01.dato_4040.gineco_esq_w.emb_alto_riesg_esq_w.toUpperCase();
          var temp = hc_01.dato_4040.gineco_esq_w.emb_alto_riesg_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoAnoAsePre();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoAltoRiesgo();
          }
        }
      );
    },

    validarDatoAnoAsePre() {
      let hc_01 = this;
      hc_01.descrip.ano_aseso_pre == ""
        ? (hc_01.descrip.ano_aseso_pre = 0000)
        : false;
      validarInputs(
        {
          form: "#ano_aseso_pre_hc_01",
        },
        () => {
          hc_01.validarDatoAltoRiesgo();
        },
        () => {
          var ano = parseInt(hc_01.descrip.ano_aseso_pre);

          if (this.usuar.NIT == 900004059 && ano == 1800) {
            hc_01.descrip.ano_aseso_pre = hc_01.descrip.ano_aseso_pre.toString();
            hc_01.descrip.mes_aseso_pre = "01";
            hc_01.descrip.dia_aseso_pre = "01";
            hc_01.dato_4040.prenatal_esq_w.fecha_aseso_pre_esq_w = `${hc_01.descrip.ano_aseso_pre}${hc_01.descrip.mes_aseso_pre}${hc_01.descrip.dia_aseso_pre}`;
            hc_01.validarDatoAnoAsePos();
          } else if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoAsePre();
          } else if (ano == 0000 || ano == "") {
            if (this.usuar.NIT == 900004059) {
              CON851("02", "02", null, "error", "error");
              hc_01.validarDatoAnoAsePre();
            } else {
              hc_01.descrip.mes_aseso_pre = 00;
              hc_01.descrip.dia_aseso_pre = 00;
              hc_01.validarDatoAnoAsePos();
            }
          } else {
            hc_01.validarDatoMesAsePre();
          }
        }
      );
    },

    validarDatoMesAsePre() {
      let hc_01 = this;
      hc_01.descrip.mes_aseso_pre == ""
        ? (hc_01.descrip.mes_aseso_pre = 00)
        : false;
      validarInputs(
        {
          form: "#mes_aseso_pre_hc_01",
        },
        () => {
          hc_01.validarDatoAnoAsePre();
        },
        () => {
          hc_01.descrip.mes_aseso_pre = cerosIzq(
            hc_01.descrip.mes_aseso_pre,
            2
          );
          var mes = parseInt(hc_01.descrip.mes_aseso_pre);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesAsePre();
          } else {
            hc_01.validarDatoDiaAsePre();
          }
        }
      );
    },

    validarDatoDiaAsePre() {
      let hc_01 = this;
      hc_01.descrip.dia_aseso_pre == ""
        ? (hc_01.descrip.dia_aseso_pre = 00)
        : false;
      validarInputs(
        {
          form: "#dia_aseso_pre_hc_01",
        },
        () => {
          hc_01.validarDatoAnoAsePre();
        },
        () => {
          hc_01.descrip.dia_aseso_pre = cerosIzq(
            hc_01.descrip.dia_aseso_pre,
            2
          );
          var dia = parseInt(hc_01.descrip.dia_aseso_pre);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaAsePre();
          } else {
            hc_01.dato_4040.prenatal_esq_w.fecha_aseso_pre_esq_w = `${hc_01.descrip.ano_aseso_pre}${hc_01.descrip.mes_aseso_pre}${hc_01.descrip.dia_aseso_pre}`;
            var fecha = parseInt(
              hc_01.dato_4040.prenatal_esq_w.fecha_aseso_pre_esq_w
            );

            if (fecha > hc_01.fecha_actual) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoAsePre();
            } else {
              hc_01.validarDatoAnoAsePos();
            }
          }
        }
      );
    },

    validarDatoAnoAsePos() {
      let hc_01 = this;
      hc_01.descrip.ano_aseso_pos == ""
        ? (hc_01.descrip.ano_aseso_pos = 0000)
        : false;
      validarInputs(
        {
          form: "#ano_aseso_pos_hc_01",
        },
        () => {
          hc_01.validarDatoAnoAsePre();
        },
        () => {
          var ano = parseInt(hc_01.descrip.ano_aseso_pos);

          if (this.usuar.NIT == 900004059 && ano == 1800) {
            hc_01.descrip.ano_aseso_pos = hc_01.descrip.ano_aseso_pos.toString();
            hc_01.descrip.mes_aseso_pos = "01";
            hc_01.descrip.dia_aseso_pos = "01";
            hc_01.dato_4040.prenatal_esq_w.fecha_aseso_pos_esq_w = `${hc_01.descrip.ano_aseso_pos}${hc_01.descrip.mes_aseso_pos}${hc_01.descrip.dia_aseso_pos}`;
            hc_01.validarDatoAnoEcoObst();
          } else if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoAsePos();
          } else if (ano == 0000 || ano == "") {
            if (this.usuar.NIT == 900004059) {
              CON851("02", "02", null, "error", "error");
              hc_01.validarDatoAnoAsePos();
            } else {
              hc_01.descrip.mes_aseso_pos = 00;
              hc_01.descrip.dia_aseso_pos = 00;
              hc_01.validarDatoAnoEcoObst();
            }
          } else {
            hc_01.validarDatoMesAsePos();
          }
        }
      );
    },

    validarDatoMesAsePos() {
      let hc_01 = this;
      hc_01.descrip.mes_aseso_pos == ""
        ? (hc_01.descrip.mes_aseso_pos = 00)
        : false;
      validarInputs(
        {
          form: "#mes_aseso_pos_hc_01",
        },
        () => {
          hc_01.validarDatoAnoAsePos();
        },
        () => {
          hc_01.descrip.mes_aseso_pos = cerosIzq(
            hc_01.descrip.mes_aseso_pos,
            2
          );
          var mes = parseInt(hc_01.descrip.mes_aseso_pos);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesAsePos();
          } else {
            hc_01.validarDatoDiaAsePos();
          }
        }
      );
    },

    validarDatoDiaAsePos() {
      let hc_01 = this;
      hc_01.descrip.dia_aseso_pos == ""
        ? (hc_01.descrip.dia_aseso_pos = 00)
        : false;
      validarInputs(
        {
          form: "#dia_aseso_pos_hc_01",
        },
        () => {
          hc_01.validarDatoMesAsePos();
        },
        () => {
          hc_01.descrip.dia_aseso_pos = cerosIzq(
            hc_01.descrip.dia_aseso_pos,
            2
          );
          var dia = parseInt(hc_01.descrip.dia_aseso_pos);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaAsePos();
          } else {
            hc_01.dato_4040.prenatal_esq_w.fecha_aseso_pos_esq_w = `${hc_01.descrip.ano_aseso_pos}${hc_01.descrip.mes_aseso_pos}${hc_01.descrip.dia_aseso_pos}`;
            var fecha = parseInt(
              hc_01.dato_4040.prenatal_esq_w.fecha_aseso_pos_esq_w
            );

            if (fecha > hc_01.fecha_actual) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoAsePos();
            } else {
              hc_01.validarDatoAnoEcoObst();
            }
          }
        }
      );
    },

    validarDatoAnoEcoObst() {
      let hc_01 = this;
      hc_01.descrip.ano_eco_obst == ""
        ? (hc_01.descrip.ano_eco_obst = 0000)
        : false;
      validarInputs(
        {
          form: "#ano_eco_obst_hc_01",
        },
        () => {
          hc_01.validarDatoAnoAsePos();
        },
        () => {
          var ano = parseInt(hc_01.descrip.ano_eco_obst);

          if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoEcoObst();
          } else if (ano == 0000 || ano == "") {
            hc_01.descrip.mes_eco_obst = 00;
            hc_01.descrip.dia_eco_obst = 00;
            hc_01.validarDatoAnoVacInflu();
          } else {
            hc_01.validarDatoMesEcoObst();
          }
        }
      );
    },

    validarDatoMesEcoObst() {
      let hc_01 = this;
      hc_01.descrip.mes_eco_obst == ""
        ? (hc_01.descrip.mes_eco_obst = 00)
        : false;
      validarInputs(
        {
          form: "#mes_eco_obst_hc_01",
        },
        () => {
          hc_01.validarDatoAnoEcoObst();
        },
        () => {
          hc_01.descrip.mes_eco_obst = cerosIzq(hc_01.descrip.mes_eco_obst, 2);
          var mes = parseInt(hc_01.descrip.mes_eco_obst);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesEcoObst();
          } else {
            hc_01.validarDatoDiaEcoObst();
          }
        }
      );
    },

    validarDatoDiaEcoObst() {
      let hc_01 = this;
      hc_01.descrip.dia_eco_obst == ""
        ? (hc_01.descrip.dia_eco_obst = 00)
        : false;
      validarInputs(
        {
          form: "#dia_eco_obst_hc_01",
        },
        () => {
          hc_01.validarDatoMesEcoObst();
        },
        () => {
          hc_01.descrip.dia_eco_obst = cerosIzq(hc_01.descrip.dia_eco_obst, 2);
          var dia = parseInt(hc_01.descrip.dia_eco_obst);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaEcoObst();
          } else {
            hc_01.dato_4040.prenatal_esq_w.fecha_eco_obst_esq_w = `${hc_01.descrip.ano_eco_obst}${hc_01.descrip.mes_eco_obst}${hc_01.descrip.dia_eco_obst}`;
            var fecha = parseInt(
              hc_01.dato_4040.prenatal_esq_w.fecha_eco_obst_esq_w
            );

            if (fecha > hc_01.fecha_actual) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoEcoObst();
            } else {
              hc_01.validarDatoAnoVacInflu();
            }
          }
        }
      );
    },

    validarDatoAnoVacInflu() {
      let hc_01 = this;
      hc_01.descrip.ano_vac_influ == ""
        ? (hc_01.descrip.ano_vac_influ = 0000)
        : false;
      validarInputs(
        {
          form: "#ano_vac_influ_hc_01",
        },
        () => {
          hc_01.validarDatoAnoEcoObst();
        },
        () => {
          var ano = parseInt(hc_01.descrip.ano_vac_influ);

          if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoVacInflu();
          } else if (ano == 0000 || ano == "") {
            hc_01.descrip.mes_vac_influ = 00;
            hc_01.descrip.dia_vac_influ = 00;
            hc_01.validarDatoAnoVacTdap();
          } else {
            hc_01.validarDatoMesVacInflu();
          }
        }
      );
    },

    validarDatoMesVacInflu() {
      let hc_01 = this;
      hc_01.descrip.mes_vac_influ == ""
        ? (hc_01.descrip.mes_vac_influ = 00)
        : false;
      validarInputs(
        {
          form: "#mes_vac_influ_hc_01",
        },
        () => {
          hc_01.validarDatoAnoVacInflu();
        },
        () => {
          hc_01.descrip.mes_vac_influ = cerosIzq(
            hc_01.descrip.mes_vac_influ,
            2
          );
          var mes = parseInt(hc_01.descrip.mes_vac_influ);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesVacInflu();
          } else {
            hc_01.validarDatoDiaVacInflu();
          }
        }
      );
    },

    validarDatoDiaVacInflu() {
      let hc_01 = this;
      hc_01.descrip.dia_vac_influ == ""
        ? (hc_01.descrip.dia_vac_influ = 00)
        : false;
      validarInputs(
        {
          form: "#dia_vac_influ_hc_01",
        },
        () => {
          hc_01.validarDatoMesVacInflu();
        },
        () => {
          hc_01.descrip.dia_vac_influ = cerosIzq(
            hc_01.descrip.dia_vac_influ,
            2
          );
          var dia = parseInt(hc_01.descrip.dia_vac_influ);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaVacInflu();
          } else {
            hc_01.dato_4040.prenatal_esq_w.fecha_vac_influ_esq_w = `${hc_01.descrip.ano_vac_influ}${hc_01.descrip.mes_vac_influ}${hc_01.descrip.dia_vac_influ}`;
            var fecha = parseInt(
              hc_01.dato_4040.prenatal_esq_w.fecha_vac_influ_esq_w
            );

            if (fecha > hc_01.fecha_actual) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoVacInflu();
            } else {
              hc_01.validarDatoAnoVacTdap();
            }
          }
        }
      );
    },

    validarDatoAnoVacTdap() {
      let hc_01 = this;
      hc_01.descrip.ano_vac_tdap == ""
        ? (hc_01.descrip.ano_vac_tdap = 0000)
        : false;
      validarInputs(
        {
          form: "#ano_vac_tdap_hc_01",
        },
        () => {
          hc_01.validarDatoAnoVacInflu();
        },
        () => {
          var ano = parseInt(hc_01.descrip.ano_vac_tdap);

          if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoVacTdap();
          } else if (ano == 0000 || ano == "") {
            hc_01.descrip.mes_vac_tdap = 00;
            hc_01.descrip.dia_vac_tdap = 00;
            hc_01.validarDatoAnoVacTt();
          } else {
            hc_01.validarDatoMesVacTdap();
          }
        }
      );
    },

    validarDatoMesVacTdap() {
      let hc_01 = this;
      hc_01.descrip.mes_vac_tdap == ""
        ? (hc_01.descrip.mes_vac_tdap = 00)
        : false;
      validarInputs(
        {
          form: "#mes_vac_tdap_hc_01",
        },
        () => {
          hc_01.validarDatoAnoVacTdap();
        },
        () => {
          hc_01.descrip.mes_vac_tdap = cerosIzq(hc_01.descrip.mes_vac_tdap, 2);
          var mes = parseInt(hc_01.descrip.mes_vac_tdap);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesVacTdap();
          } else {
            hc_01.validarDatoDiaVacTdap();
          }
        }
      );
    },

    validarDatoDiaVacTdap() {
      let hc_01 = this;
      hc_01.descrip.dia_vac_tdap == ""
        ? (hc_01.descrip.dia_vac_tdap = 00)
        : false;
      validarInputs(
        {
          form: "#dia_vac_tdap_hc_01",
        },
        () => {
          hc_01.validarDatoMesVacTdap();
        },
        () => {
          hc_01.descrip.dia_vac_tdap = cerosIzq(hc_01.descrip.dia_vac_tdap, 2);
          var dia = parseInt(hc_01.descrip.dia_vac_tdap);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaVacTdap();
          } else {
            hc_01.dato_4040.prenatal_esq_w.fecha_vac_tdap_esq_w = `${hc_01.descrip.ano_vac_tdap}${hc_01.descrip.mes_vac_tdap}${hc_01.descrip.dia_vac_tdap}`;
            var fecha = parseInt(
              hc_01.dato_4040.prenatal_esq_w.fecha_vac_tdap_esq_w
            );

            if (fecha > hc_01.fecha_actual) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoVacTdap();
            } else {
              hc_01.validarDatoAnoVacTt();
            }
          }
        }
      );
    },

    validarDatoAnoVacTt() {
      let hc_01 = this;
      hc_01.descrip.ano_vac_tt == ""
        ? (hc_01.descrip.ano_vac_tt = 0000)
        : false;
      validarInputs(
        {
          form: "#ano_vac_tt_hc_01",
        },
        () => {
          hc_01.validarDatoAnoVacTdap();
        },
        () => {
          var ano = parseInt(hc_01.descrip.ano_vac_tt);

          if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoVacTt();
          } else if (ano == 0000 || ano == "") {
            hc_01.descrip.mes_vac_tt = 00;
            hc_01.descrip.dia_vac_tt = 00;
            hc_01.validarDatoGrupo();
          } else {
            hc_01.validarDatoMesVacTt();
          }
        }
      );
    },

    validarDatoMesVacTt() {
      let hc_01 = this;
      hc_01.descrip.mes_vac_tt == "" ? (hc_01.descrip.mes_vac_tt = 00) : false;
      validarInputs(
        {
          form: "#mes_vac_tt_hc_01",
        },
        () => {
          hc_01.validarDatoAnoVacTt();
        },
        () => {
          hc_01.descrip.mes_vac_tt = cerosIzq(hc_01.descrip.mes_vac_tt, 2);
          var mes = parseInt(hc_01.descrip.mes_vac_tt);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesVacTt();
          } else {
            hc_01.validarDatoDiaVacTt();
          }
        }
      );
    },

    validarDatoDiaVacTt() {
      let hc_01 = this;
      hc_01.descrip.dia_vac_tt == "" ? (hc_01.descrip.dia_vac_tt = 00) : false;
      validarInputs(
        {
          form: "#dia_vac_tt_hc_01",
        },
        () => {
          hc_01.validarDatoMesVacTt();
        },
        () => {
          hc_01.descrip.dia_vac_tt = cerosIzq(hc_01.descrip.dia_vac_tt, 2);
          var dia = parseInt(hc_01.descrip.dia_vac_tt);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaVacTt();
          } else {
            hc_01.dato_4040.prenatal_esq_w.fecha_vac_tt_esq_w = `${hc_01.descrip.ano_vac_tt}${hc_01.descrip.mes_vac_tt}${hc_01.descrip.dia_vac_tt}`;

            hc_01.validarDatoNroDosis();

            // var fecha = parseInt(hc_01.dato_4040.prenatal_esq_w.fecha_vac_tt_esq_w);

            // if (fecha > hc_01.fecha_actual) {
            //   CON851('37', '37', null, 'error', 'error')
            //   hc_01.validarDatoAnoVacTdap();
            // } else {
            // }
          }
        }
      );
    },

    validarDatoNroDosis() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#nro_dosis_tt_esq_hc_01",
        },
        () => {
          hc_01.validarDatoAnoVacTt();
        },
        () => {
          hc_01.validarDatoGrupo();
        }
      );
    },

    validarDatoGrupo() {
      let hc_01 = this;
      hc_01.descrip.grupo = $_REG_PACI["GRP-SANG"];
      validarInputs(
        {
          form: "#grupo_hc_01",
        },
        () => {
          hc_01.validarDatoAnoVacTt();
        },
        () => {
          hc_01.descrip.grupo = hc_01.descrip.grupo.toUpperCase();
          var grSang = hc_01.descrip.grupo;

          if (
            grSang == "O" ||
            grSang == "A" ||
            grSang == "B" ||
            grSang == "AB"
          ) {
            hc_01.validarDatoRh();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoGrupo();
          }
        }
      );
    },

    validarDatoRh() {
      let hc_01 = this;
      hc_01.descrip.rh = $_REG_PACI["RH"];
      validarInputs(
        {
          form: "#rh_hc_01",
        },
        () => {
          hc_01.validarDatoGrupo();
        },
        async () => {
          var rh = hc_01.descrip.rh;

          if (rh == "+" || rh == "-") {
            await hc_01.actualizarDatosPaci();
            await hc_01.validarDatosVentanaTrimestral();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoRh();
          }
        }
      );
    },

    async actualizarDatosPaci() {
      let hc_01 = this;
      var data = {};
      data["datosh"] = datosEnvio();
      data["id_paci"] = $_REG_PACI["COD"];
      data["tipo_id_paci"] = $_REG_PACI["TIPO-ID"];
      data["apellido1_paci"] = $_REG_PACI["APELL-PACI1"];
      data["apellido2_paci"] = $_REG_PACI["APELL-PACI2"];
      data["nombre1_paci"] = $_REG_PACI["NOM-PACI1"];
      data["nombre2_paci"] = $_REG_PACI["NOM-PACI2"];
      data["telefono_paci"] = $_REG_PACI["TELEFONO"];
      data["ciudad_paci"] = $_REG_PACI["CIUDAD"];
      data["direccion_paci"] = $_REG_PACI["DIRECC"];

      if (hc_01.descrip.grupo.trim() == "") {
        data["grp_sang_paci"] = $_REG_PACI["GRP-SANG"];
      } else {
        data["grp_sang_paci"] = hc_01.descrip.grupo;
      }

      if (hc_01.descrip.rh.trim() == "") {
        data["rh_paci"] = $_REG_PACI["RH"];
      } else {
        data["rh_paci"] = hc_01.descrip.rh;
      }

      data["admin_w"] = $_REG_PACI["OPER-CORR"];

      if (
        hc_01.descrip.victConflicto == "S" ||
        hc_01.descrip.victConflicto == "N"
      ) {
        if (hc_01.descrip.victConflicto != $_REG_PACI["VICTI-CONFLICTO"]) {
          data["victi_conflicto"] = hc_01.descrip.victConflicto;
        } else {
          data["victi_conflicto"] = $_REG_PACI["VICTI-CONFLICTO"];
        }
      } else {
        data["victi_conflicto"] = $_REG_PACI["VICTI-CONFLICTO"];
      }

      data['diabetes'] = $_REG_PACI['DIABETES'];

      await postData(data, get_url("app/SALUD/SER110C-AC.DLL"))
        .then((data) => {
          console.log('grabo paciente')
          console.log(data, "data");
        })
        .catch((err) => {
          toastr.error("Error en guardado");
          console.log(err, "error");
          _regresar_menuhis();
        });
    },

    validarDatosVentanaTrimestral() {
      let hc_01 = this;
      hc_01.descrip.indEmb = parseInt(this.form.rips.embarazo) - 1;

      hc_01.descrip.ano_vih = hc_01.dato_4040.tabla_vih_esq_w[
        hc_01.descrip.indEmb
      ].fecha_vih_esq_w.substring(0, 4);
      hc_01.descrip.mes_vih = hc_01.dato_4040.tabla_vih_esq_w[
        hc_01.descrip.indEmb
      ].fecha_vih_esq_w.substring(4, 6);
      hc_01.descrip.dia_vih = hc_01.dato_4040.tabla_vih_esq_w[
        hc_01.descrip.indEmb
      ].fecha_vih_esq_w.substring(6, 8);

      switch (hc_01.dato_4040.tabla_vih_esq_w[0].resultado_vih_esq_w) {
        case "1":
          hc_01.descrip.resultado_vih1 = "POSITIVO";
          break;
        case "2":
          hc_01.descrip.resultado_vih1 = "NEGATIVO";
          break;
        case "3":
          hc_01.descrip.resultado_vih1 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_vih1 = "";
          break;
      }

      switch (hc_01.dato_4040.tabla_vih_esq_w[1].resultado_vih_esq_w) {
        case "1":
          hc_01.descrip.resultado_vih2 = "POSITIVO";
          break;
        case "2":
          hc_01.descrip.resultado_vih2 = "NEGATIVO";
          break;
        case "3":
          hc_01.descrip.resultado_vih2 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_vih2 = "";
          break;
      }

      switch (hc_01.dato_4040.tabla_vih_esq_w[2].resultado_vih_esq_w) {
        case "1":
          hc_01.descrip.resultado_vih3 = "POSITIVO";
          break;
        case "2":
          hc_01.descrip.resultado_vih3 = "NEGATIVO";
          break;
        case "3":
          hc_01.descrip.resultado_vih3 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_vih3 = "";
          break;
      }

      hc_01.descrip.ano_serolo = hc_01.dato_4040.tabla_serolo_esq_w[
        hc_01.descrip.indEmb
      ].fecha_serolo_esq_w.substring(0, 4);
      hc_01.descrip.mes_serolo = hc_01.dato_4040.tabla_serolo_esq_w[
        hc_01.descrip.indEmb
      ].fecha_serolo_esq_w.substring(4, 6);
      hc_01.descrip.dia_serolo = hc_01.dato_4040.tabla_serolo_esq_w[
        hc_01.descrip.indEmb
      ].fecha_serolo_esq_w.substring(6, 8);

      switch (hc_01.dato_4040.tabla_serolo_esq_w[0].resultado_serolo_esq_w) {
        case "1":
          hc_01.descrip.resultado_serolo1 = "REACTIVO";
          break;
        case "2":
          hc_01.descrip.resultado_serolo1 = "NO REACTIVO";
          break;
        case "3":
          hc_01.descrip.resultado_serolo1 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_serolo1 = "";
          break;
      }

      switch (hc_01.dato_4040.tabla_serolo_esq_w[1].resultado_serolo_esq_w) {
        case "1":
          hc_01.descrip.resultado_serolo2 = "REACTIVO";
          break;
        case "2":
          hc_01.descrip.resultado_serolo2 = "NO REACTIVO";
          break;
        case "3":
          hc_01.descrip.resultado_serolo2 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_serolo2 = "";
          break;
      }

      switch (hc_01.dato_4040.tabla_serolo_esq_w[2].resultado_serolo_esq_w) {
        case "1":
          hc_01.descrip.resultado_serolo3 = "REACTIVO";
          break;
        case "2":
          hc_01.descrip.resultado_serolo3 = "NO REACTIVO";
          break;
        case "3":
          hc_01.descrip.resultado_serolo3 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_serolo3 = "";
          break;
      }

      hc_01.descrip.ano_hemog = hc_01.dato_4040.tabla_hemogl_esq_w[
        hc_01.descrip.indEmb
      ].fecha_hemogl_esq_w.substring(0, 4);
      hc_01.descrip.mes_hemog = hc_01.dato_4040.tabla_hemogl_esq_w[
        hc_01.descrip.indEmb
      ].fecha_hemogl_esq_w.substring(4, 6);
      hc_01.descrip.dia_hemog = hc_01.dato_4040.tabla_hemogl_esq_w[
        hc_01.descrip.indEmb
      ].fecha_hemogl_esq_w.substring(6, 8);

      hc_01.descrip.resultado_hemog1 =
        hc_01.dato_4040.tabla_hemogl_esq_w[0].resultado_hemogl_esq_w;
      hc_01.descrip.resultado_hemog2 =
        hc_01.dato_4040.tabla_hemogl_esq_w[1].resultado_hemogl_esq_w;
      hc_01.descrip.resultado_hemog3 =
        hc_01.dato_4040.tabla_hemogl_esq_w[2].resultado_hemogl_esq_w;

      hc_01.descrip.ano_igg = hc_01.dato_4040.tabla_igg_esq_w[
        hc_01.descrip.indEmb
      ].fecha_igg_esq_w.substring(0, 4);
      hc_01.descrip.mes_igg = hc_01.dato_4040.tabla_igg_esq_w[
        hc_01.descrip.indEmb
      ].fecha_igg_esq_w.substring(4, 6);
      hc_01.descrip.dia_igg = hc_01.dato_4040.tabla_igg_esq_w[
        hc_01.descrip.indEmb
      ].fecha_igg_esq_w.substring(6, 8);

      switch (hc_01.dato_4040.tabla_igg_esq_w[0].resultado_igg_esq_w) {
        case "1":
          hc_01.descrip.resultado_igg1 = "REACTIVO";
          break;
        case "2":
          hc_01.descrip.resultado_igg1 = "NO REACTIVO";
          break;
        case "3":
          hc_01.descrip.resultado_igg1 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_igg1 = "";
          break;
      }

      switch (hc_01.dato_4040.tabla_igg_esq_w[1].resultado_igg_esq_w) {
        case "1":
          hc_01.descrip.resultado_igg2 = "REACTIVO";
          break;
        case "2":
          hc_01.descrip.resultado_igg2 = "NO REACTIVO";
          break;
        case "3":
          hc_01.descrip.resultado_igg2 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_igg2 = "";
          break;
      }

      switch (hc_01.dato_4040.tabla_igg_esq_w[2].resultado_igg_esq_w) {
        case "1":
          hc_01.descrip.resultado_igg3 = "REACTIVO";
          break;
        case "2":
          hc_01.descrip.resultado_igg3 = "NO REACTIVO";
          break;
        case "3":
          hc_01.descrip.resultado_igg3 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_igg3 = "";
          break;
      }

      hc_01.descrip.ano_glicem = hc_01.dato_4040.tabla_glicem_esq_w[
        hc_01.descrip.indEmb
      ].fecha_glicem_esq_w.substring(0, 4);
      hc_01.descrip.mes_glicem = hc_01.dato_4040.tabla_glicem_esq_w[
        hc_01.descrip.indEmb
      ].fecha_glicem_esq_w.substring(4, 6);
      hc_01.descrip.dia_glicem = hc_01.dato_4040.tabla_glicem_esq_w[
        hc_01.descrip.indEmb
      ].fecha_glicem_esq_w.substring(6, 8);

      hc_01.descrip.resultado_glicem1 =
        hc_01.dato_4040.tabla_glicem_esq_w[0].resultado_glicem_esq_w;
      hc_01.descrip.resultado_glicem2 =
        hc_01.dato_4040.tabla_glicem_esq_w[1].resultado_glicem_esq_w;
      hc_01.descrip.resultado_glicem3 =
        hc_01.dato_4040.tabla_glicem_esq_w[2].resultado_glicem_esq_w;

      hc_01.descrip.ano_hemogra = hc_01.dato_4040.tabla_hemogra_esq_w[
        hc_01.descrip.indEmb
      ].fecha_hemogra_esq_w.substring(0, 4);
      hc_01.descrip.mes_hemogra = hc_01.dato_4040.tabla_hemogra_esq_w[
        hc_01.descrip.indEmb
      ].fecha_hemogra_esq_w.substring(4, 6);
      hc_01.descrip.dia_hemogra = hc_01.dato_4040.tabla_hemogra_esq_w[
        hc_01.descrip.indEmb
      ].fecha_hemogra_esq_w.substring(6, 8);

      switch (hc_01.dato_4040.tabla_hemogra_esq_w[0].resultado_hemogra_esq_w) {
        case "1":
          hc_01.descrip.resultado_hemogra1 = "NORMAL";
          break;
        case "2":
          hc_01.descrip.resultado_hemogra1 = "ANORMAL";
          break;
        case "3":
          hc_01.descrip.resultado_hemogra1 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_hemogra1 = "";
          break;
      }

      switch (hc_01.dato_4040.tabla_hemogra_esq_w[1].resultado_hemogra_esq_w) {
        case "1":
          hc_01.descrip.resultado_hemogra2 = "NORMAL";
          break;
        case "2":
          hc_01.descrip.resultado_hemogra2 = "ANORMAL";
          break;
        case "3":
          hc_01.descrip.resultado_hemogra2 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_hemogra2 = "";
          break;
      }

      switch (hc_01.dato_4040.tabla_hemogra_esq_w[2].resultado_hemogra_esq_w) {
        case "1":
          hc_01.descrip.resultado_hemogra3 = "NORMAL";
          break;
        case "2":
          hc_01.descrip.resultado_hemogra3 = "ANORMAL";
          break;
        case "3":
          hc_01.descrip.resultado_hemogra3 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_hemogra3 = "";
          break;
      }

      hc_01.descrip.ano_hemopara = hc_01.dato_4040.tabla_hemopara_esq_w[
        hc_01.descrip.indEmb
      ].fecha_hemopara_esq_w.substring(0, 4);
      hc_01.descrip.mes_hemopara = hc_01.dato_4040.tabla_hemopara_esq_w[
        hc_01.descrip.indEmb
      ].fecha_hemopara_esq_w.substring(4, 6);
      hc_01.descrip.dia_hemopara = hc_01.dato_4040.tabla_hemopara_esq_w[
        hc_01.descrip.indEmb
      ].fecha_hemopara_esq_w.substring(6, 8);

      switch (
      hc_01.dato_4040.tabla_hemopara_esq_w[0].resultado_hemopara_esq_w
      ) {
        case "1":
          hc_01.descrip.resultado_hemopara1 = "POSITIVO";
          break;
        case "2":
          hc_01.descrip.resultado_hemopara1 = "NEGATIVO";
          break;
        case "3":
          hc_01.descrip.resultado_hemopara1 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_hemopara1 = "";
          break;
      }

      switch (
      hc_01.dato_4040.tabla_hemopara_esq_w[1].resultado_hemopara_esq_w
      ) {
        case "1":
          hc_01.descrip.resultado_hemopara2 = "POSITIVO";
          break;
        case "2":
          hc_01.descrip.resultado_hemopara2 = "NEGATIVO";
          break;
        case "3":
          hc_01.descrip.resultado_hemopara2 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_hemopara2 = "";
          break;
      }

      switch (
      hc_01.dato_4040.tabla_hemopara_esq_w[2].resultado_hemopara_esq_w
      ) {
        case "1":
          hc_01.descrip.resultado_hemopara3 = "POSITIVO";
          break;
        case "2":
          hc_01.descrip.resultado_hemopara3 = "NEGATIVO";
          break;
        case "3":
          hc_01.descrip.resultado_hemopara3 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_hemopara3 = "";
          break;
      }

      hc_01.descrip.ano_fta_abs = hc_01.dato_4040.tabla_fta_abs_esq_w[
        hc_01.descrip.indEmb
      ].fecha_fta_abs_esq_w.substring(0, 4);
      hc_01.descrip.mes_fta_abs = hc_01.dato_4040.tabla_fta_abs_esq_w[
        hc_01.descrip.indEmb
      ].fecha_fta_abs_esq_w.substring(4, 6);
      hc_01.descrip.dia_fta_abs = hc_01.dato_4040.tabla_fta_abs_esq_w[
        hc_01.descrip.indEmb
      ].fecha_fta_abs_esq_w.substring(6, 8);

      switch (hc_01.dato_4040.tabla_fta_abs_esq_w[0].resultado_fta_abs_esq_w) {
        case "1":
          hc_01.descrip.resultado_fta_abs1 = "POSITIVO";
          break;
        case "2":
          hc_01.descrip.resultado_fta_abs1 = "NEGATIVO";
          break;
        case "3":
          hc_01.descrip.resultado_fta_abs1 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_fta_abs1 = "";
          break;
      }

      switch (hc_01.dato_4040.tabla_fta_abs_esq_w[1].resultado_fta_abs_esq_w) {
        case "1":
          hc_01.descrip.resultado_fta_abs2 = "POSITIVO";
          break;
        case "2":
          hc_01.descrip.resultado_fta_abs2 = "NEGATIVO";
          break;
        case "3":
          hc_01.descrip.resultado_fta_abs2 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_fta_abs2 = "";
          break;
      }

      switch (hc_01.dato_4040.tabla_fta_abs_esq_w[2].resultado_fta_abs_esq_w) {
        case "1":
          hc_01.descrip.resultado_fta_abs3 = "POSITIVO";
          break;
        case "2":
          hc_01.descrip.resultado_fta_abs3 = "NEGATIVO";
          break;
        case "3":
          hc_01.descrip.resultado_fta_abs3 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_fta_abs3 = "";
          break;
      }

      hc_01.descrip.ano_uroanali = hc_01.dato_4040.tabla_uroanali_esq_w[
        hc_01.descrip.indEmb
      ].fecha_uroanali_esq_w.substring(0, 4);
      hc_01.descrip.mes_uroanali = hc_01.dato_4040.tabla_uroanali_esq_w[
        hc_01.descrip.indEmb
      ].fecha_uroanali_esq_w.substring(4, 6);
      hc_01.descrip.dia_uroanali = hc_01.dato_4040.tabla_uroanali_esq_w[
        hc_01.descrip.indEmb
      ].fecha_uroanali_esq_w.substring(6, 8);

      switch (
      hc_01.dato_4040.tabla_uroanali_esq_w[0].resultado_uroanali_esq_w
      ) {
        case "1":
          hc_01.descrip.resultado_uroanali1 = "NORMAL";
          break;
        case "2":
          hc_01.descrip.resultado_uroanali1 = "ANORMAL";
          break;
        case "3":
          hc_01.descrip.resultado_uroanali1 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_uroanali1 = "";
          break;
      }

      switch (
      hc_01.dato_4040.tabla_uroanali_esq_w[1].resultado_uroanali_esq_w
      ) {
        case "1":
          hc_01.descrip.resultado_uroanali2 = "NORMAL";
          break;
        case "2":
          hc_01.descrip.resultado_uroanali2 = "ANORMAL";
          break;
        case "3":
          hc_01.descrip.resultado_uroanali2 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_uroanali2 = "";
          break;
      }

      switch (
      hc_01.dato_4040.tabla_uroanali_esq_w[2].resultado_uroanali_esq_w
      ) {
        case "1":
          hc_01.descrip.resultado_uroanali3 = "NORMAL";
          break;
        case "2":
          hc_01.descrip.resultado_uroanali3 = "ANORMAL";
          break;
        case "3":
          hc_01.descrip.resultado_uroanali3 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_uroanali3 = "";
          break;
      }

      hc_01.descrip.ano_uroculti = hc_01.dato_4040.tabla_uroculti_esq_w[
        hc_01.descrip.indEmb
      ].fecha_uroculti_esq_w.substring(0, 4);
      hc_01.descrip.mes_uroculti = hc_01.dato_4040.tabla_uroculti_esq_w[
        hc_01.descrip.indEmb
      ].fecha_uroculti_esq_w.substring(4, 6);
      hc_01.descrip.dia_uroculti = hc_01.dato_4040.tabla_uroculti_esq_w[
        hc_01.descrip.indEmb
      ].fecha_uroculti_esq_w.substring(6, 8);

      switch (
      hc_01.dato_4040.tabla_uroculti_esq_w[0].resultado_uroculti_esq_w
      ) {
        case "1":
          hc_01.descrip.resultado_uroculti1 = "NORMAL";
          break;
        case "2":
          hc_01.descrip.resultado_uroculti1 = "ANORMAL";
          break;
        case "3":
          hc_01.descrip.resultado_uroculti1 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_uroculti1 = "";
          break;
      }

      switch (
      hc_01.dato_4040.tabla_uroculti_esq_w[1].resultado_uroculti_esq_w
      ) {
        case "1":
          hc_01.descrip.resultado_uroculti2 = "NORMAL";
          break;
        case "2":
          hc_01.descrip.resultado_uroculti2 = "ANORMAL";
          break;
        case "3":
          hc_01.descrip.resultado_uroculti2 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_uroculti2 = "";
          break;
      }

      switch (
      hc_01.dato_4040.tabla_uroculti_esq_w[2].resultado_uroculti_esq_w
      ) {
        case "1":
          hc_01.descrip.resultado_uroculti3 = "NORMAL";
          break;
        case "2":
          hc_01.descrip.resultado_uroculti3 = "ANORMAL";
          break;
        case "3":
          hc_01.descrip.resultado_uroculti3 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_uroculti3 = "";
          break;
      }

      hc_01.descrip.ano_frotisv = hc_01.dato_4040.tabla_frotisv_esq_w[
        hc_01.descrip.indEmb
      ].fecha_frotisv_esq_w.substring(0, 4);
      hc_01.descrip.mes_frotisv = hc_01.dato_4040.tabla_frotisv_esq_w[
        hc_01.descrip.indEmb
      ].fecha_frotisv_esq_w.substring(4, 6);
      hc_01.descrip.dia_frotisv = hc_01.dato_4040.tabla_frotisv_esq_w[
        hc_01.descrip.indEmb
      ].fecha_frotisv_esq_w.substring(6, 8);

      switch (hc_01.dato_4040.tabla_frotisv_esq_w[0].resultado_frotisv_esq_w) {
        case "1":
          hc_01.descrip.resultado_frotisv1 = "NORMAL";
          break;
        case "2":
          hc_01.descrip.resultado_frotisv1 = "ANORMAL";
          break;
        case "3":
          hc_01.descrip.resultado_frotisv1 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_frotisv1 = "";
          break;
      }

      switch (hc_01.dato_4040.tabla_frotisv_esq_w[1].resultado_frotisv_esq_w) {
        case "1":
          hc_01.descrip.resultado_frotisv2 = "NORMAL";
          break;
        case "2":
          hc_01.descrip.resultado_frotisv2 = "ANORMAL";
          break;
        case "3":
          hc_01.descrip.resultado_frotisv2 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_frotisv2 = "";
          break;
      }

      switch (hc_01.dato_4040.tabla_frotisv_esq_w[2].resultado_frotisv_esq_w) {
        case "1":
          hc_01.descrip.resultado_frotisv3 = "NORMAL";
          break;
        case "2":
          hc_01.descrip.resultado_frotisv3 = "ANORMAL";
          break;
        case "3":
          hc_01.descrip.resultado_frotisv3 = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_frotisv3 = "";
          break;
      }

      hc_01.descrip.ano_glicemia = hc_01.dato_4040.tabla_glicemia_esq_w[
        hc_01.descrip.indEmb
      ].fecha_glicemia_esq_w.substring(0, 4);
      hc_01.descrip.mes_glicemia = hc_01.dato_4040.tabla_glicemia_esq_w[
        hc_01.descrip.indEmb
      ].fecha_glicemia_esq_w.substring(4, 6);
      hc_01.descrip.dia_glicemia = hc_01.dato_4040.tabla_glicemia_esq_w[
        hc_01.descrip.indEmb
      ].fecha_glicemia_esq_w.substring(6, 8);

      hc_01.descrip.resultado_glicemia1 =
        hc_01.dato_4040.tabla_glicem_esq_w[0].resultado_glicemia_esq_w;
      hc_01.descrip.resultado_glicemia2 =
        hc_01.dato_4040.tabla_glicem_esq_w[1].resultado_glicemia_esq_w;
      hc_01.descrip.resultado_glicemia3 =
        hc_01.dato_4040.tabla_glicem_esq_w[2].resultado_glicemia_esq_w;

      hc_01.descrip.ano_hepatB = hc_01.dato_4040.hepatitis_b_esq_w.fecha_hepat_b_esq_w.substring(
        0,
        4
      );
      hc_01.descrip.mes_hepatB = hc_01.dato_4040.hepatitis_b_esq_w.fecha_hepat_b_esq_w.substring(
        4,
        6
      );
      hc_01.descrip.dia_hepatB = hc_01.dato_4040.hepatitis_b_esq_w.fecha_hepat_b_esq_w.substring(
        6,
        8
      );

      switch (hc_01.dato_4040.hepatitis_b_esq_w.resultado_hepat_b_esq_w) {
        case "1":
          hc_01.descrip.resultado_hepatB = "POSITIVO";
          break;
        case "2":
          hc_01.descrip.resultado_hepatB = "NEGATIVO";
          break;
        case "3":
          hc_01.descrip.resultado_hepatB = "PENDIENTE";
          break;
        default:
          hc_01.descrip.resultado_hepatB = "";
          break;
      }

      hc_01.validarDatoAnoVih();
    },

    validarDatoAnoVih() {
      let hc_01 = this;
      hc_01.descrip.ano_vih == "" ? (hc_01.descrip.ano_vih = 0) : false;
      validarInputs(
        {
          form: "#ano_vih_hc_01",
        },
        () => {
          hc_01.validarDatoAnoAsePre();
        },
        () => {
          var edad_gest = parseInt(
            hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w
          );
          var ano = parseInt(hc_01.descrip.ano_vih);

          if (this.usuar.NIT == 900004059 && ano == 1800) {
            hc_01.descrip.ano_vih = hc_01.descrip.ano_vih.toString();
            hc_01.descrip.mes_vih = "01";
            hc_01.descrip.dia_vih = "01";
            hc_01.dato_4040.tabla_vih_esq_w[
              hc_01.descrip.indEmb
            ].fecha_vih_esq_w = `${hc_01.descrip.ano_vih}${hc_01.descrip.mes_vih}${hc_01.descrip.dia_vih}`;
            hc_01.dato_4040.tabla_vih_esq_w[
              hc_01.descrip.indEmb
            ].resultado_vih_esq_w = "3";
            switch (hc_01.descrip.indEmb.toString()) {
              case "0":
                hc_01.descrip.resultado_vih1 = "PENDIENTE";
                break;
              case "1":
                hc_01.descrip.resultado_vih2 = "PENDIENTE";
                break;
              case "2":
                hc_01.descrip.resultado_vih3 = "PENDIENTE";
                break;
            }

            hc_01.validarDatoAnoSerolo();
          } else if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoVih();
          } else if (ano == "" || ano == 0) {
            if (this.usuar.NIT == 900004059 && edad_gest >= 20) {
              CON851("03", "03", null, "error", "error");
              hc_01.validarDatoAnoVih();
            } else {
              hc_01.descrip.ano_vih = 0;
              hc_01.descrip.mes_vih = 0;
              hc_01.descrip.dia_vih = 0;
              hc_01.dato_4040.tabla_vih_esq_w[
                hc_01.descrip.indEmb
              ].fecha_vih_esq_w = "";
              hc_01.dato_4040.tabla_vih_esq_w[
                hc_01.descrip.indEmb
              ].resultado_vih_esq_w = "3";
              switch (hc_01.descrip.indEmb.toString()) {
                case "0":
                  hc_01.descrip.resultado_vih1 = "PENDIENTE";
                  break;
                case "1":
                  hc_01.descrip.resultado_vih2 = "PENDIENTE";
                  break;
                case "2":
                  hc_01.descrip.resultado_vih3 = "PENDIENTE";
                  break;
              }

              hc_01.validarDatoAnoSerolo();
            }
          } else {
            hc_01.validarDatoMesVih();
          }
        }
      );
    },

    validarDatoMesVih() {
      let hc_01 = this;
      hc_01.descrip.mes_vih == "" ? (hc_01.descrip.mes_vih = 0) : false;
      validarInputs(
        {
          form: "#mes_vih_hc_01",
        },
        () => {
          hc_01.validarDatoAnoVih();
        },
        () => {
          hc_01.descrip.mes_vih = cerosIzq(hc_01.descrip.mes_vih, 2);
          var mes = parseInt(hc_01.descrip.mes_vih);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesVih();
          } else {
            hc_01.validarDatoDiaVih();
          }
        }
      );
    },

    async validarDatoDiaVih() {
      let hc_01 = this;
      hc_01.descrip.dia_vih == "" ? (hc_01.descrip.dia_vih = 0) : false;
      validarInputs(
        {
          form: "#dia_vih_hc_01",
        },
        () => {
          hc_01.validarDatoMesVih();
        },
        () => {
          hc_01.descrip.dia_vih = cerosIzq(hc_01.descrip.dia_vih, 2);
          var dia = parseInt(hc_01.descrip.dia_vih);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaVih();
          } else {
            hc_01.dato_4040.tabla_vih_esq_w[
              hc_01.descrip.indEmb
            ].fecha_vih_esq_w = `${hc_01.descrip.ano_vih}${hc_01.descrip.mes_vih}${hc_01.descrip.dia_vih}`;

            var fecha = parseInt(
              hc_01.dato_4040.tabla_vih_esq_w[hc_01.descrip.indEmb]
                .fecha_vih_esq_w
            );
            var fechaRegla = parseInt(
              hc_01.dato_4040.gineco_esq_w.fecha_regla_esq_w
            );

            if (fecha > hc_01.fecha_actual || fecha < fechaRegla) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoVih();
            } else {
              fecha = fecha.toString();
              fechaRegla = fechaRegla.toString();

              var nro_dias = SC_DIAS(fechaRegla, fecha);

              var edad_gest_temp = nro_dias / 7;
              var embarazo_temp;

              if (edad_gest_temp < 13) {
                embarazo_temp = "1";
              } else if (edad_gest_temp < 26) {
                embarazo_temp = "2";
              } else {
                embarazo_temp = "3";
              }

              // console.log(edad_gest_temp);
              // console.log('emba: ', this.form.rips.embarazo, ' emba_w: ', embarazo_temp);
              if (this.form.rips.embarazo == embarazo_temp) {
                hc_01.validarDatoResultVih();
              } else {
                embarazo_temp = parseInt(embarazo_temp) - 1;
                hc_01.dato_4040.tabla_vih_esq_w[embarazo_temp].fecha_vih_esq_w =
                  hc_01.dato_4040.tabla_vih_esq_w[
                    hc_01.descrip.indEmb
                  ].fecha_vih_esq_w;
                hc_01.dato_4040.tabla_vih_esq_w[
                  hc_01.descrip.indEmb
                ].fecha_vih_esq_w = "";
                hc_01.dato_4040.tabla_vih_esq_w[
                  hc_01.descrip.indEmb
                ].resultado_vih_esq_w = "";
                hc_01.descrip.indEmb = embarazo_temp;

                hc_01.validarDatoResultVih();
              }
            }
          }
        }
      );
    },

    validarDatoResultVih() {
      let hc_01 = this;
      hc_01.ventanaResultadoVih(
        "tabla_vih_esq_w",
        "resultado_vih_esq_w",
        "validarDatoAnoVih",
        "validarDatoAnoSerolo",
        "resultado_vih"
      );
    },

    validarDatoAnoSerolo() {
      let hc_01 = this;
      hc_01.descrip.ano_serolo == "" ? (hc_01.descrip.ano_serolo = 0) : false;
      validarInputs(
        {
          form: "#ano_serolo_hc_01",
        },
        () => {
          hc_01.validarDatoAnoVih();
        },
        () => {
          hc_01.descrip.indEmb = parseInt(this.form.rips.embarazo) - 1;

          var edad_gest = parseInt(
            hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w
          );
          var ano = parseInt(hc_01.descrip.ano_serolo);

          if (this.usuar.NIT == 900004059 && ano == 1800) {
            hc_01.descrip.ano_serolo = hc_01.descrip.ano_serolo.toString();
            hc_01.descrip.mes_serolo = "01";
            hc_01.descrip.dia_serolo = "01";
            hc_01.dato_4040.tabla_serolo_esq_w[
              hc_01.descrip.indEmb
            ].fecha_serolo_esq_w = `${hc_01.descrip.ano_serolo}${hc_01.descrip.mes_serolo}${hc_01.descrip.dia_serolo}`;
            hc_01.dato_4040.tabla_serolo_esq_w[
              hc_01.descrip.indEmb
            ].resultado_serolo_esq_w = "3";
            switch (hc_01.descrip.indEmb.toString()) {
              case "0":
                hc_01.descrip.resultado_serolo1 = "PENDIENTE";
                break;
              case "1":
                hc_01.descrip.resultado_serolo2 = "PENDIENTE";
                break;
              case "2":
                hc_01.descrip.resultado_serolo3 = "PENDIENTE";
                break;
            }

            hc_01.validarDatoAnoHemog();
          } else if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoSerolo();
          } else if (ano == "" || ano == 0) {
            if (this.usuar.NIT == 900004059 && edad_gest >= 20) {
              CON851("03", "03", null, "error", "error");
              hc_01.validarDatoAnoSerolo();
            } else {
              hc_01.descrip.ano_serolo = 0;
              hc_01.descrip.mes_serolo = 0;
              hc_01.descrip.dia_serolo = 0;
              hc_01.dato_4040.tabla_serolo_esq_w[
                hc_01.descrip.indEmb
              ].fecha_serolo_esq_w = "";
              hc_01.dato_4040.tabla_serolo_esq_w[
                hc_01.descrip.indEmb
              ].resultado_serolo_esq_w = "3";
              switch (hc_01.descrip.indEmb.toString()) {
                case "0":
                  hc_01.descrip.resultado_serolo1 = "PENDIENTE";
                  break;
                case "1":
                  hc_01.descrip.resultado_serolo2 = "PENDIENTE";
                  break;
                case "2":
                  hc_01.descrip.resultado_serolo3 = "PENDIENTE";
                  break;
              }

              hc_01.validarDatoAnoHemog();
            }
          } else {
            hc_01.validarDatoMesSerolo();
          }
        }
      );
    },

    validarDatoMesSerolo() {
      let hc_01 = this;
      hc_01.descrip.mes_serolo == "" ? (hc_01.descrip.mes_serolo = 0) : false;
      validarInputs(
        {
          form: "#mes_serolo_hc_01",
        },
        () => {
          hc_01.validarDatoAnoSerolo();
        },
        () => {
          hc_01.descrip.mes_serolo = cerosIzq(hc_01.descrip.mes_serolo, 2);
          var mes = parseInt(hc_01.descrip.mes_serolo);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesSerolo();
          } else {
            hc_01.validarDatoDiaSerolo();
          }
        }
      );
    },

    validarDatoDiaSerolo() {
      let hc_01 = this;
      hc_01.descrip.dia_serolo == "" ? (hc_01.descrip.dia_serolo = 0) : false;
      validarInputs(
        {
          form: "#dia_serolo_hc_01",
        },
        () => {
          hc_01.validarDatoMesSerolo();
        },
        () => {
          hc_01.descrip.dia_serolo = cerosIzq(hc_01.descrip.dia_serolo, 2);
          var dia = parseInt(hc_01.descrip.dia_serolo);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaSerolo();
          } else {
            hc_01.dato_4040.tabla_serolo_esq_w[
              hc_01.descrip.indEmb
            ].fecha_serolo_esq_w = `${hc_01.descrip.ano_serolo}${hc_01.descrip.mes_serolo}${hc_01.descrip.dia_serolo}`;

            var fecha = parseInt(
              hc_01.dato_4040.tabla_serolo_esq_w[hc_01.descrip.indEmb]
                .fecha_serolo_esq_w
            );
            var fechaRegla = parseInt(
              hc_01.dato_4040.gineco_esq_w.fecha_regla_esq_w
            );

            if (fecha > hc_01.fecha_actual || fecha < fechaRegla) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoSerolo();
            } else {
              fecha = fecha.toString();
              fechaRegla = fechaRegla.toString();

              var nro_dias = SC_DIAS(fechaRegla, fecha);
              var edad_gest_temp = nro_dias / 7;
              var embarazo_temp;

              if (edad_gest_temp < 13) {
                embarazo_temp = "1";
              } else if (edad_gest_temp < 26) {
                embarazo_temp = "2";
              } else {
                embarazo_temp = "3";
              }

              // console.log('emba: ', this.form.rips.embarazo, ' emba_w: ', embarazo_temp);
              if (this.form.rips.embarazo == embarazo_temp) {
                hc_01.validarDatoResultSerolo();
              } else {
                embarazo_temp = parseInt(embarazo_temp) - 1;
                hc_01.dato_4040.tabla_serolo_esq_w[
                  embarazo_temp
                ].fecha_serolo_esq_w =
                  hc_01.dato_4040.tabla_serolo_esq_w[
                    hc_01.descrip.indEmb
                  ].fecha_serolo_esq_w;
                hc_01.dato_4040.tabla_serolo_esq_w[
                  hc_01.descrip.indEmb
                ].fecha_serolo_esq_w = "";
                hc_01.dato_4040.tabla_serolo_esq_w[
                  hc_01.descrip.indEmb
                ].resultado_serolo_esq_w = "";
                hc_01.descrip.indEmb = embarazo_temp;

                hc_01.validarDatoResultSerolo();
              }
            }
          }
        }
      );
    },

    validarDatoResultSerolo() {
      let hc_01 = this;
      hc_01.ventanarResultadoSerolo();
    },

    validarDatoAnoHemog() {
      let hc_01 = this;
      hc_01.descrip.ano_hemog == "" ? (hc_01.descrip.ano_hemog = 0) : false;
      validarInputs(
        {
          form: "#ano_hemog_hc_01",
        },
        () => {
          hc_01.validarDatoAnoSerolo();
        },
        () => {
          hc_01.descrip.indEmb = parseInt(this.form.rips.embarazo) - 1;

          var edad_gest = parseInt(
            hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w
          );
          var ano = parseInt(hc_01.descrip.ano_hemog);

          if (this.usuar.NIT == 900004059 && ano == 1800) {
            hc_01.descrip.ano_hemog = hc_01.descrip.ano_hemog.toString();
            hc_01.descrip.mes_hemog = "01";
            hc_01.descrip.dia_hemog = "01";
            hc_01.dato_4040.tabla_hemogl_esq_w[
              hc_01.descrip.indEmb
            ].fecha_hemogl_esq_w = `${hc_01.descrip.ano_hemog}${hc_01.descrip.mes_hemog}${hc_01.descrip.dia_hemog}`;
            hc_01.dato_4040.tabla_hemogl_esq_w[
              hc_01.descrip.indEmb
            ].resultado_hemogl_esq_w = "";
            switch (hc_01.descrip.indEmb.toString()) {
              case "0":
                hc_01.descrip.resultado_hemog1 = "";
                break;
              case "1":
                hc_01.descrip.resultado_hemog2 = "";
                break;
              case "2":
                hc_01.descrip.resultado_hemog3 = "";
                break;
            }

            hc_01.validarDatoAnoIgg();
          } else if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoHemog();
          } else if (ano == "" || ano == 0) {
            if (this.usuar.NIT == 900004059 && edad_gest >= 20) {
              CON851("03", "03", null, "error", "error");
              hc_01.validarDatoAnoHemog();
            } else {
              hc_01.descrip.ano_hemog = 0;
              hc_01.descrip.mes_hemog = 0;
              hc_01.descrip.dia_hemog = 0;
              hc_01.dato_4040.tabla_hemogl_esq_w[
                hc_01.descrip.indEmb
              ].fecha_hemogl_esq_w = "";
              hc_01.dato_4040.tabla_hemogl_esq_w[
                hc_01.descrip.indEmb
              ].resultado_hemogl_esq_w = "";
              switch (hc_01.descrip.indEmb.toString()) {
                case "0":
                  hc_01.descrip.resultado_hemog1 = "";
                  break;
                case "1":
                  hc_01.descrip.resultado_hemog2 = "";
                  break;
                case "2":
                  hc_01.descrip.resultado_hemog3 = "";
                  break;
              }

              hc_01.validarDatoAnoIgg();
            }
          } else {
            hc_01.validarDatoMesHemog();
          }
        }
      );
    },

    validarDatoMesHemog() {
      let hc_01 = this;
      hc_01.descrip.mes_hemog == "" ? (hc_01.descrip.mes_hemog = 0) : false;
      validarInputs(
        {
          form: "#mes_hemog_hc_01",
        },
        () => {
          hc_01.validarDatoAnoHemog();
        },
        () => {
          hc_01.descrip.mes_hemog = cerosIzq(hc_01.descrip.mes_hemog, 2);
          var mes = parseInt(hc_01.descrip.mes_hemog);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesHemog();
          } else {
            hc_01.validarDatoDiaHemog();
          }
        }
      );
    },

    validarDatoDiaHemog() {
      let hc_01 = this;
      hc_01.descrip.dia_hemog == "" ? (hc_01.descrip.dia_hemog = 0) : false;
      validarInputs(
        {
          form: "#dia_hemog_hc_01",
        },
        () => {
          hc_01.validarDatoMesHemog();
        },
        () => {
          hc_01.descrip.dia_hemog = cerosIzq(hc_01.descrip.dia_hemog, 2);
          var dia = parseInt(hc_01.descrip.dia_hemog);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaHemog();
          } else {
            hc_01.dato_4040.tabla_hemogl_esq_w[
              hc_01.descrip.indEmb
            ].fecha_hemogl_esq_w = `${hc_01.descrip.ano_hemog}${hc_01.descrip.mes_hemog}${hc_01.descrip.dia_hemog}`;

            var fecha = parseInt(
              hc_01.dato_4040.tabla_hemogl_esq_w[hc_01.descrip.indEmb]
                .fecha_hemogl_esq_w
            );
            var fechaRegla = parseInt(
              hc_01.dato_4040.gineco_esq_w.fecha_regla_esq_w
            );

            if (fecha > hc_01.fecha_actual || fecha < fechaRegla) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoHemog();
            } else {
              fecha = fecha.toString();
              fechaRegla = fechaRegla.toString();

              var nro_dias = SC_DIAS(fechaRegla, fecha);
              var edad_gest_temp = nro_dias / 7;
              var embarazo_temp;

              if (edad_gest_temp < 13) {
                embarazo_temp = "1";
              } else if (edad_gest_temp < 26) {
                embarazo_temp = "2";
              } else {
                embarazo_temp = "3";
              }

              // console.log('emba: ', this.form.rips.embarazo, ' emba_w: ', embarazo_temp);
              if (this.form.rips.embarazo == embarazo_temp) {
                hc_01.validarDatoResultHemog();
              } else {
                embarazo_temp = parseInt(embarazo_temp) - 1;
                hc_01.dato_4040.tabla_hemogl_esq_w[
                  embarazo_temp
                ].fecha_hemogl_esq_w =
                  hc_01.dato_4040.tabla_hemogl_esq_w[
                    hc_01.descrip.indEmb
                  ].fecha_hemogl_esq_w;
                hc_01.dato_4040.tabla_hemogl_esq_w[
                  hc_01.descrip.indEmb
                ].fecha_hemogl_esq_w = "";
                hc_01.dato_4040.tabla_hemogl_esq_w[
                  hc_01.descrip.indEmb
                ].resultado_hemogl_esq_w = "";
                hc_01.descrip.indEmb = embarazo_temp;

                hc_01.validarDatoResultHemog();
              }
            }
          }
        }
      );
    },

    validarDatoResultHemog() {
      let hc_01 = this;
      var indice = (parseInt(hc_01.descrip.indEmb) + 1).toString();
      hc_01.descrip[`resultado_hemog${indice}`] == ""
        ? (hc_01.descrip[`resultado_hemog${indice}`] = "00.0")
        : false;
      validarInputs(
        {
          form: `#resultado_hemog${indice}_hc_01`,
        },
        () => {
          hc_01.validarDatoAnoHemog();
        },
        () => {
          hc_01.dato_4040.tabla_hemogl_esq_w[
            hc_01.descrip.indEmb
          ].resultado_hemogl_esq_w = hc_01.descrip[`resultado_hemog${indice}`];

          hc_01.validarDatoAnoIgg();
        }
      );
    },

    validarDatoAnoIgg() {
      let hc_01 = this;
      hc_01.descrip.ano_igg == "" ? (hc_01.descrip.ano_igg = 0) : false;
      validarInputs(
        {
          form: "#ano_igg_hc_01",
        },
        () => {
          hc_01.validarDatoAnoHemog();
        },
        () => {
          hc_01.descrip.indEmb = parseInt(this.form.rips.embarazo) - 1;

          var edad_gest = parseInt(
            hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w
          );
          var ano = parseInt(hc_01.descrip.ano_igg);

          if (this.usuar.NIT == 900004059 && ano == 1800) {
            hc_01.descrip.ano_igg = hc_01.descrip.ano_igg.toString();
            hc_01.descrip.mes_igg = "01";
            hc_01.descrip.dia_igg = "01";
            hc_01.dato_4040.tabla_igg_esq_w[
              hc_01.descrip.indEmb
            ].fecha_igg_esq_w = `${hc_01.descrip.ano_igg}${hc_01.descrip.mes_igg}${hc_01.descrip.dia_igg}`;
            hc_01.dato_4040.tabla_igg_esq_w[
              hc_01.descrip.indEmb
            ].resultado_igg_esq_w = "3";
            switch (hc_01.descrip.indEmb.toString()) {
              case "0":
                hc_01.descrip.resultado_igg1 = "PENDIENTE";
                break;
              case "1":
                hc_01.descrip.resultado_igg2 = "PENDIENTE";
                break;
              case "2":
                hc_01.descrip.resultado_igg3 = "PENDIENTE";
                break;
            }

            hc_01.validarDatoAnoGlicem();
          } else if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoIgg();
          } else if (ano == "" || ano == 0) {
            if (this.usuar.NIT == 900004059 && edad_gest >= 20) {
              CON851("03", "03", null, "error", "error");
              hc_01.validarDatoAnoIgg();
            } else {
              hc_01.descrip.ano_igg = 0;
              hc_01.descrip.mes_igg = 0;
              hc_01.descrip.dia_igg = 0;
              hc_01.dato_4040.tabla_igg_esq_w[
                hc_01.descrip.indEmb
              ].fecha_igg_esq_w = "";
              hc_01.dato_4040.tabla_igg_esq_w[
                hc_01.descrip.indEmb
              ].resultado_igg_esq_w = "3";
              switch (hc_01.descrip.indEmb.toString()) {
                case "0":
                  hc_01.descrip.resultado_igg1 = "PENDIENTE";
                  break;
                case "1":
                  hc_01.descrip.resultado_igg2 = "PENDIENTE";
                  break;
                case "2":
                  hc_01.descrip.resultado_igg3 = "PENDIENTE";
                  break;
              }

              hc_01.validarDatoAnoGlicem();
            }
          } else {
            hc_01.validarDatoMesIgg();
          }
        }
      );
    },

    validarDatoMesIgg() {
      let hc_01 = this;
      hc_01.descrip.mes_igg == "" ? (hc_01.descrip.mes_igg = 0) : false;
      validarInputs(
        {
          form: "#mes_igg_hc_01",
        },
        () => {
          hc_01.validarDatoAnoIgg();
        },
        () => {
          hc_01.descrip.mes_igg = cerosIzq(hc_01.descrip.mes_igg, 2);
          var mes = parseInt(hc_01.descrip.mes_igg);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesIgg();
          } else {
            hc_01.validarDatoDiaIgg();
          }
        }
      );
    },

    validarDatoDiaIgg() {
      let hc_01 = this;
      hc_01.descrip.dia_igg == "" ? (hc_01.descrip.dia_igg = 0) : false;
      validarInputs(
        {
          form: "#dia_igg_hc_01",
        },
        () => {
          hc_01.validarDatoMesIgg();
        },
        () => {
          hc_01.descrip.dia_igg = cerosIzq(hc_01.descrip.dia_igg, 2);
          var dia = parseInt(hc_01.descrip.dia_igg);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaIgg();
          } else {
            hc_01.dato_4040.tabla_igg_esq_w[
              hc_01.descrip.indEmb
            ].fecha_igg_esq_w = `${hc_01.descrip.ano_igg}${hc_01.descrip.mes_igg}${hc_01.descrip.dia_igg}`;

            var fecha = parseInt(
              hc_01.dato_4040.tabla_igg_esq_w[hc_01.descrip.indEmb]
                .fecha_igg_esq_w
            );
            var fechaRegla = parseInt(
              hc_01.dato_4040.gineco_esq_w.fecha_regla_esq_w
            );

            if (fecha > hc_01.fecha_actual || fecha < fechaRegla) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoIgg();
            } else {
              fecha = fecha.toString();
              fechaRegla = fechaRegla.toString();

              var nro_dias = SC_DIAS(fechaRegla, fecha);
              var edad_gest_temp = nro_dias / 7;
              var embarazo_temp;

              if (edad_gest_temp < 13) {
                embarazo_temp = "1";
              } else if (edad_gest_temp < 26) {
                embarazo_temp = "2";
              } else {
                embarazo_temp = "3";
              }

              // console.log('emba: ', this.form.rips.embarazo, ' emba_w: ', embarazo_temp);
              if (this.form.rips.embarazo == embarazo_temp) {
                hc_01.validarDatoResultIgg();
              } else {
                embarazo_temp = parseInt(embarazo_temp) - 1;
                hc_01.dato_4040.tabla_igg_esq_w[embarazo_temp].fecha_igg_esq_w =
                  hc_01.dato_4040.tabla_igg_esq_w[
                    hc_01.descrip.indEmb
                  ].fecha_igg_esq_w;
                hc_01.dato_4040.tabla_igg_esq_w[
                  hc_01.descrip.indEmb
                ].fecha_igg_esq_w = "";
                hc_01.dato_4040.tabla_igg_esq_w[
                  hc_01.descrip.indEmb
                ].resultado_igg_esq_w = "";

                hc_01.descrip.indEmb = embarazo_temp;

                hc_01.validarDatoResultIgg();
              }
            }
          }
        }
      );
    },

    validarDatoResultIgg() {
      let hc_01 = this;
      hc_01.ventanaResultadoVih(
        "tabla_igg_esq_w",
        "resultado_igg_esq_w",
        "validarDatoAnoIgg",
        "validarDatoAnoGlicem",
        "resultado_igg"
      );
    },

    validarDatoAnoGlicem() {
      let hc_01 = this;
      hc_01.descrip.ano_glicem == "" ? (hc_01.descrip.ano_glicem = 0) : false;
      validarInputs(
        {
          form: "#ano_glicem_hc_01",
        },
        () => {
          hc_01.validarDatoAnoIgg();
        },
        () => {
          hc_01.descrip.indEmb = parseInt(this.form.rips.embarazo) - 1;

          var edad_gest = parseInt(
            hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w
          );
          var ano = parseInt(hc_01.descrip.ano_glicem);

          if (this.usuar.NIT == 900004059 && ano == 1800) {
            hc_01.descrip.ano_glicem = hc_01.descrip.ano_glicem.toString();
            hc_01.descrip.mes_glicem = "01";
            hc_01.descrip.dia_glicem = "01";
            hc_01.dato_4040.tabla_glicem_esq_w[
              hc_01.descrip.indEmb
            ].fecha_glicem_esq_w = `${hc_01.descrip.ano_glicem}${hc_01.descrip.mes_glicem}${hc_01.descrip.dia_glicem}`;
            hc_01.dato_4040.tabla_glicem_esq_w[
              hc_01.descrip.indEmb
            ].resultado_glicem_esq_w = "";
            switch (hc_01.descrip.indEmb.toString()) {
              case "0":
                hc_01.descrip.resultado_glicem1 = "";
                break;
              case "1":
                hc_01.descrip.resultado_glicem2 = "";
                break;
              case "2":
                hc_01.descrip.resultado_glicem3 = "";
                break;
            }

            hc_01.validarDatoAnoHemogra();
          } else if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoGlicem();
          } else if (ano == "" || ano == 0) {
            if (this.usuar.NIT == 900004059 && edad_gest >= 20) {
              CON851("03", "03", null, "error", "error");
              hc_01.validarDatoAnoGlicem();
            } else {
              hc_01.descrip.ano_glicem = 0;
              hc_01.descrip.mes_glicem = 0;
              hc_01.descrip.dia_glicem = 0;
              hc_01.dato_4040.tabla_glicem_esq_w[
                hc_01.descrip.indEmb
              ].fecha_glicem_esq_w = "";
              hc_01.dato_4040.tabla_glicem_esq_w[
                hc_01.descrip.indEmb
              ].resultado_glicem_esq_w = "";
              switch (hc_01.descrip.indEmb.toString()) {
                case "0":
                  hc_01.descrip.resultado_hemog1 = "";
                  break;
                case "1":
                  hc_01.descrip.resultado_hemog2 = "";
                  break;
                case "2":
                  hc_01.descrip.resultado_hemog3 = "";
                  break;
              }

              hc_01.validarDatoAnoHemogra();
            }
          } else {
            hc_01.validarDatoMesGlicem();
          }
        }
      );
    },

    validarDatoMesGlicem() {
      let hc_01 = this;
      hc_01.descrip.mes_glicem == "" ? (hc_01.descrip.mes_glicem = 0) : false;
      validarInputs(
        {
          form: "#mes_glicem_hc_01",
        },
        () => {
          hc_01.validarDatoAnoGlicem();
        },
        () => {
          hc_01.descrip.mes_glicem = cerosIzq(hc_01.descrip.mes_glicem, 2);
          var mes = parseInt(hc_01.descrip.mes_glicem);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesGlicem();
          } else {
            hc_01.validarDatoDiaGlicem();
          }
        }
      );
    },

    validarDatoDiaGlicem() {
      let hc_01 = this;
      hc_01.descrip.dia_glicem == "" ? (hc_01.descrip.dia_glicem = 0) : false;
      validarInputs(
        {
          form: "#dia_glicem_hc_01",
        },
        () => {
          hc_01.validarDatoMesGlicem();
        },
        () => {
          hc_01.descrip.dia_glicem = cerosIzq(hc_01.descrip.dia_glicem, 2);
          var dia = parseInt(hc_01.descrip.dia_glicem);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaGlicem();
          } else {
            hc_01.dato_4040.tabla_glicem_esq_w[
              hc_01.descrip.indEmb
            ].fecha_glicem_esq_w = `${hc_01.descrip.ano_glicem}${hc_01.descrip.mes_glicem}${hc_01.descrip.dia_glicem}`;

            var fecha = parseInt(
              hc_01.dato_4040.tabla_glicem_esq_w[hc_01.descrip.indEmb]
                .fecha_glicem_esq_w
            );
            var fechaRegla = parseInt(
              hc_01.dato_4040.gineco_esq_w.fecha_regla_esq_w
            );

            if (fecha > hc_01.fecha_actual || fecha < fechaRegla) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoGlicem();
            } else {
              fecha = fecha.toString();
              fechaRegla = fechaRegla.toString();

              var nro_dias = SC_DIAS(fechaRegla, fecha);
              var edad_gest_temp = nro_dias / 7;
              var embarazo_temp;

              if (edad_gest_temp < 13) {
                embarazo_temp = "1";
              } else if (edad_gest_temp < 26) {
                embarazo_temp = "2";
              } else {
                embarazo_temp = "3";
              }

              // console.log('emba: ', this.form.rips.embarazo, ' emba_w: ', embarazo_temp);
              if (this.form.rips.embarazo == embarazo_temp) {
                hc_01.validarDatoResultGlicem();
              } else {
                embarazo_temp = parseInt(embarazo_temp) - 1;
                hc_01.dato_4040.tabla_glicem_esq_w[
                  embarazo_temp
                ].fecha_glicem_esq_w =
                  hc_01.dato_4040.tabla_glicem_esq_w[
                    hc_01.descrip.indEmb
                  ].fecha_glicem_esq_w;
                hc_01.dato_4040.tabla_glicem_esq_w[
                  hc_01.descrip.indEmb
                ].fecha_glicem_esq_w = "";
                hc_01.dato_4040.tabla_glicem_esq_w[
                  hc_01.descrip.indEmb
                ].resultado_glicem_esq_w = "";
                hc_01.descrip.indEmb = embarazo_temp;

                hc_01.validarDatoResultGlicem();
              }
            }
          }
        }
      );
    },

    validarDatoResultGlicem() {
      let hc_01 = this;
      var indice = (parseInt(hc_01.descrip.indEmb) + 1).toString();
      validarInputs(
        {
          form: `#resultado_glicem${indice}_hc_01`,
        },
        () => {
          hc_01.validarDatoAnoGlicem();
        },
        () => {
          hc_01.dato_4040.tabla_glicem_esq_w[
            hc_01.descrip.indEmb
          ].resultado_glicem_esq_w = hc_01.descrip[`resultado_glicem${indice}`];

          hc_01.validarDatoAnoHemogra();
        }
      );
    },

    validarDatoAnoHemogra() {
      let hc_01 = this;
      hc_01.descrip.ano_hemogra == "" ? (hc_01.descrip.ano_hemogra = 0) : false;
      validarInputs(
        {
          form: "#ano_hemogra_hc_01",
        },
        () => {
          hc_01.validarDatoAnoGlicem();
        },
        () => {
          hc_01.descrip.indEmb = parseInt(this.form.rips.embarazo) - 1;

          var edad_gest = parseInt(
            hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w
          );
          var ano = parseInt(hc_01.descrip.ano_hemogra);

          if (this.usuar.NIT == 900004059 && ano == 1800) {
            hc_01.descrip.ano_hemogra = hc_01.descrip.ano_hemogra.toString();
            hc_01.descrip.mes_hemogra = "01";
            hc_01.descrip.dia_hemogra = "01";
            hc_01.dato_4040.tabla_hemogra_esq_w[
              hc_01.descrip.indEmb
            ].fecha_hemogra_esq_w = `${hc_01.descrip.ano_hemogra}${hc_01.descrip.mes_hemogra}${hc_01.descrip.dia_hemogra}`;
            hc_01.dato_4040.tabla_hemogra_esq_w[
              hc_01.descrip.indEmb
            ].resultado_hemogra_esq_w = "3";
            switch (hc_01.descrip.indEmb.toString()) {
              case "0":
                hc_01.descrip.resultado_hemogra1 = "PENDIENTE";
                break;
              case "1":
                hc_01.descrip.resultado_hemogra2 = "PENDIENTE";
                break;
              case "2":
                hc_01.descrip.resultado_hemogra3 = "PENDIENTE";
                break;
            }

            hc_01.validarDatoAnoHemopara();
          } else if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoHemogra();
          } else if (ano == "" || ano == 0) {
            if (this.usuar.NIT == 900004059 && edad_gest >= 20) {
              CON851("03", "03", null, "error", "error");
              hc_01.validarDatoAnoHemogra();
            } else {
              hc_01.descrip.ano_hemogra = 0;
              hc_01.descrip.mes_hemogra = 0;
              hc_01.descrip.dia_hemogra = 0;
              hc_01.dato_4040.tabla_hemogra_esq_w[
                hc_01.descrip.indEmb
              ].fecha_hemogra_esq_w = "";
              hc_01.dato_4040.tabla_hemogra_esq_w[
                hc_01.descrip.indEmb
              ].resultado_hemogra_esq_w = "3";
              switch (hc_01.descrip.indEmb.toString()) {
                case "0":
                  hc_01.descrip.resultado_hemogra1 = "PENDIENTE";
                  break;
                case "1":
                  hc_01.descrip.resultado_hemogra2 = "PENDIENTE";
                  break;
                case "2":
                  hc_01.descrip.resultado_hemogra3 = "PENDIENTE";
                  break;
              }

              hc_01.validarDatoAnoHemopara();
            }
          } else {
            hc_01.validarDatoMesHemogra();
          }
        }
      );
    },

    validarDatoMesHemogra() {
      let hc_01 = this;
      hc_01.descrip.mes_hemogra == "" ? (hc_01.descrip.mes_hemogra = 0) : false;
      validarInputs(
        {
          form: "#mes_hemogra_hc_01",
        },
        () => {
          hc_01.validarDatoAnoHemogra();
        },
        () => {
          hc_01.descrip.mes_hemogra = cerosIzq(hc_01.descrip.mes_hemogra, 2);
          var mes = parseInt(hc_01.descrip.mes_hemogra);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesHemogra();
          } else {
            hc_01.validarDatoDiaHemogra();
          }
        }
      );
    },

    validarDatoDiaHemogra() {
      let hc_01 = this;
      hc_01.descrip.dia_hemogra == "" ? (hc_01.descrip.dia_hemogra = 0) : false;
      validarInputs(
        {
          form: "#dia_hemogra_hc_01",
        },
        () => {
          hc_01.validarDatoMesHemogra();
        },
        () => {
          hc_01.descrip.dia_hemogra = cerosIzq(hc_01.descrip.dia_hemogra, 2);
          var dia = parseInt(hc_01.descrip.dia_hemogra);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaHemogra();
          } else {
            hc_01.dato_4040.tabla_hemogra_esq_w[
              hc_01.descrip.indEmb
            ].fecha_hemogra_esq_w = `${hc_01.descrip.ano_hemogra}${hc_01.descrip.mes_hemogra}${hc_01.descrip.dia_hemogra}`;

            var fecha = parseInt(
              hc_01.dato_4040.tabla_hemogra_esq_w[hc_01.descrip.indEmb]
                .fecha_hemogra_esq_w
            );
            var fechaRegla = parseInt(
              hc_01.dato_4040.gineco_esq_w.fecha_regla_esq_w
            );

            if (fecha > hc_01.fecha_actual || fecha < fechaRegla) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoHemogra();
            } else {
              fecha = fecha.toString();
              fechaRegla = fechaRegla.toString();

              var nro_dias = SC_DIAS(fechaRegla, fecha);
              var edad_gest_temp = nro_dias / 7;
              var embarazo_temp;

              if (edad_gest_temp < 13) {
                embarazo_temp = "1";
              } else if (edad_gest_temp < 26) {
                embarazo_temp = "2";
              } else {
                embarazo_temp = "3";
              }

              // console.log('emba: ', this.form.rips.embarazo, ' emba_w: ', embarazo_temp);
              if (this.form.rips.embarazo == embarazo_temp) {
                hc_01.validarDatoResultHemogra();
              } else {
                embarazo_temp = parseInt(embarazo_temp) - 1;
                hc_01.dato_4040.tabla_hemogra_esq_w[
                  embarazo_temp
                ].fecha_hemogra_esq_w =
                  hc_01.dato_4040.tabla_hemogra_esq_w[
                    hc_01.descrip.indEmb
                  ].fecha_hemogra_esq_w;
                hc_01.dato_4040.tabla_hemogra_esq_w[
                  hc_01.descrip.indEmb
                ].fecha_hemogra_esq_w = "";
                hc_01.dato_4040.tabla_hemogra_esq_w[
                  hc_01.descrip.indEmb
                ].resultado_hemogra_esq_w = "";

                hc_01.descrip.indEmb = embarazo_temp;

                hc_01.validarDatoResultHemogra();
              }
            }
          }
        }
      );
    },

    validarDatoResultHemogra() {
      let hc_01 = this;
      hc_01.ventanarResultadoHemogra();
    },

    validarDatoAnoHemopara() {
      let hc_01 = this;
      hc_01.descrip.ano_hemopara == ""
        ? (hc_01.descrip.ano_hemopara = 0)
        : false;
      validarInputs(
        {
          form: "#ano_hemopara_hc_01",
        },
        () => {
          hc_01.validarDatoAnoHemogra();
        },
        () => {
          hc_01.descrip.indEmb = parseInt(this.form.rips.embarazo) - 1;

          var edad_gest = parseInt(
            hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w
          );
          var ano = parseInt(hc_01.descrip.ano_hemopara);

          if (this.usuar.NIT == 900004059 && ano == 1800) {
            hc_01.descrip.ano_hemopara = hc_01.descrip.ano_hemopara.toString();
            hc_01.descrip.mes_hemopara = "01";
            hc_01.descrip.dia_hemopara = "01";
            hc_01.dato_4040.tabla_hemopara_esq_w[
              hc_01.descrip.indEmb
            ].fecha_hemopara_esq_w = `${hc_01.descrip.ano_hemopara}${hc_01.descrip.mes_hemopara}${hc_01.descrip.dia_hemopara}`;
            hc_01.dato_4040.tabla_hemopara_esq_w[
              hc_01.descrip.indEmb
            ].resultado_hemopara_esq_w = "3";
            switch (hc_01.descrip.indEmb.toString()) {
              case "0":
                hc_01.descrip.resultado_hemopara1 = "PENDIENTE";
                break;
              case "1":
                hc_01.descrip.resultado_hemopara2 = "PENDIENTE";
                break;
              case "2":
                hc_01.descrip.resultado_hemopara3 = "PENDIENTE";
                break;
            }

            hc_01.validarDatoAnoFtaAbs();
          } else if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoHemopara();
          } else if (ano == "" || ano == 0) {
            if (this.usuar.NIT == 900004059 && edad_gest >= 20) {
              CON851("03", "03", null, "error", "error");
              hc_01.validarDatoAnoHemopara();
            } else {
              hc_01.descrip.ano_hemopara = 0;
              hc_01.descrip.mes_hemopara = 0;
              hc_01.descrip.dia_hemopara = 0;
              hc_01.dato_4040.tabla_hemopara_esq_w[
                hc_01.descrip.indEmb
              ].fecha_hemopara_esq_w = "";
              hc_01.dato_4040.tabla_hemopara_esq_w[
                hc_01.descrip.indEmb
              ].resultado_hemopara_esq_w = "3";
              switch (hc_01.descrip.indEmb.toString()) {
                case "0":
                  hc_01.descrip.resultado_hemopara1 = "PENDIENTE";
                  break;
                case "1":
                  hc_01.descrip.resultado_hemopara2 = "PENDIENTE";
                  break;
                case "2":
                  hc_01.descrip.resultado_hemopara3 = "PENDIENTE";
                  break;
              }

              hc_01.validarDatoAnoFtaAbs();
            }
          } else {
            hc_01.validarDatoMesHemopara();
          }
        }
      );
    },

    validarDatoMesHemopara() {
      let hc_01 = this;
      hc_01.descrip.mes_hemopara == ""
        ? (hc_01.descrip.mes_hemopara = 0)
        : false;
      validarInputs(
        {
          form: "#mes_hemopara_hc_01",
        },
        () => {
          hc_01.validarDatoAnoHemopara();
        },
        () => {
          hc_01.descrip.mes_hemopara = cerosIzq(hc_01.descrip.mes_hemopara, 2);
          var mes = parseInt(hc_01.descrip.mes_hemopara);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesHemopara();
          } else {
            hc_01.validarDatoDiaHemopara();
          }
        }
      );
    },

    validarDatoDiaHemopara() {
      let hc_01 = this;
      hc_01.descrip.dia_hemopara == ""
        ? (hc_01.descrip.dia_hemopara = 0)
        : false;
      validarInputs(
        {
          form: "#dia_hemopara_hc_01",
        },
        () => {
          hc_01.validarDatoMesHemopara();
        },
        () => {
          hc_01.descrip.dia_hemopara = cerosIzq(hc_01.descrip.dia_hemopara, 2);
          var dia = parseInt(hc_01.descrip.dia_hemopara);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaHemopara();
          } else {
            hc_01.dato_4040.tabla_hemopara_esq_w[
              hc_01.descrip.indEmb
            ].fecha_hemopara_esq_w = `${hc_01.descrip.ano_hemopara}${hc_01.descrip.mes_hemopara}${hc_01.descrip.dia_hemopara}`;

            var fecha = parseInt(
              hc_01.dato_4040.tabla_hemopara_esq_w[hc_01.descrip.indEmb]
                .fecha_hemopara_esq_w
            );
            var fechaRegla = parseInt(
              hc_01.dato_4040.gineco_esq_w.fecha_regla_esq_w
            );

            if (fecha > hc_01.fecha_actual || fecha < fechaRegla) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoHemopara();
            } else {
              fecha = fecha.toString();
              fechaRegla = fechaRegla.toString();

              var nro_dias = SC_DIAS(fechaRegla, fecha);
              var edad_gest_temp = nro_dias / 7;
              var embarazo_temp;

              if (edad_gest_temp < 13) {
                embarazo_temp = "1";
              } else if (edad_gest_temp < 26) {
                embarazo_temp = "2";
              } else {
                embarazo_temp = "3";
              }

              // console.log('emba: ', this.form.rips.embarazo, ' emba_w: ', embarazo_temp);
              if (this.form.rips.embarazo == embarazo_temp) {
                hc_01.validarDatoResultHemopara();
              } else {
                embarazo_temp = parseInt(embarazo_temp) - 1;
                hc_01.dato_4040.tabla_hemopara_esq_w[
                  embarazo_temp
                ].fecha_hemopara_esq_w =
                  hc_01.dato_4040.tabla_hemopara_esq_w[
                    hc_01.descrip.indEmb
                  ].fecha_hemopara_esq_w;
                hc_01.dato_4040.tabla_hemopara_esq_w[
                  hc_01.descrip.indEmb
                ].fecha_hemopara_esq_w = "";
                hc_01.dato_4040.tabla_hemopara_esq_w[
                  hc_01.descrip.indEmb
                ].resultado_hemopara_esq_w = "";

                hc_01.descrip.indEmb = embarazo_temp;

                hc_01.validarDatoResultHemopara();
              }
            }
          }
        }
      );
    },

    validarDatoResultHemopara() {
      let hc_01 = this;
      hc_01.ventanaResultadoVih(
        "tabla_hemopara_esq_w",
        "resultado_hemopara_esq_w",
        "validarDatoAnoHemopara",
        "validarDatoAnoFtaAbs",
        "resultado_hemopara"
      );
    },

    validarDatoAnoFtaAbs() {
      let hc_01 = this;
      hc_01.descrip.ano_fta_abs == "" ? (hc_01.descrip.ano_fta_abs = 0) : false;
      validarInputs(
        {
          form: "#ano_fta_abs_hc_01",
        },
        () => {
          hc_01.validarDatoAnoHemopara();
        },
        () => {
          hc_01.descrip.indEmb = parseInt(this.form.rips.embarazo) - 1;

          var edad_gest = parseInt(
            hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w
          );
          var ano = parseInt(hc_01.descrip.ano_fta_abs);

          if (this.usuar.NIT == 900004059 && ano == 1800) {
            hc_01.descrip.ano_fta_abs = hc_01.descrip.ano_fta_abs.toString();
            hc_01.descrip.mes_fta_abs = "01";
            hc_01.descrip.dia_fta_abs = "01";
            hc_01.dato_4040.tabla_fta_abs_esq_w[
              hc_01.descrip.indEmb
            ].fecha_fta_abs_esq_w = `${hc_01.descrip.ano_fta_abs}${hc_01.descrip.mes_fta_abs}${hc_01.descrip.dia_fta_abs}`;
            hc_01.dato_4040.tabla_fta_abs_esq_w[
              hc_01.descrip.indEmb
            ].resultado_fta_abs_esq_w = "3";
            switch (hc_01.descrip.indEmb.toString()) {
              case "0":
                hc_01.descrip.resultado_fta_abs1 = "PENDIENTE";
                break;
              case "1":
                hc_01.descrip.resultado_fta_abs2 = "PENDIENTE";
                break;
              case "2":
                hc_01.descrip.resultado_fta_abs3 = "PENDIENTE";
                break;
            }

            hc_01.validarDatoAnoUroanali();
          } else if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoFtaAbs();
          } else if (ano == "" || ano == 0) {
            if (this.usuar.NIT == 900004059 && edad_gest >= 20) {
              CON851("03", "03", null, "error", "error");
              hc_01.validarDatoAnoFtaAbs();
            } else {
              hc_01.descrip.ano_fta_abs = 0;
              hc_01.descrip.mes_fta_abs = 0;
              hc_01.descrip.dia_fta_abs = 0;
              hc_01.dato_4040.tabla_fta_abs_esq_w[
                hc_01.descrip.indEmb
              ].fecha_fta_abs_esq_w = "";
              hc_01.dato_4040.tabla_fta_abs_esq_w[
                hc_01.descrip.indEmb
              ].resultado_fta_abs_esq_w = "3";
              switch (hc_01.descrip.indEmb.toString()) {
                case "0":
                  hc_01.descrip.resultado_fta_abs1 = "PENDIENTE";
                  break;
                case "1":
                  hc_01.descrip.resultado_fta_abs2 = "PENDIENTE";
                  break;
                case "2":
                  hc_01.descrip.resultado_fta_abs3 = "PENDIENTE";
                  break;
              }

              hc_01.validarDatoAnoUroanali();
            }
          } else {
            hc_01.validarDatoMesFtaAbs();
          }
        }
      );
    },

    validarDatoMesFtaAbs() {
      let hc_01 = this;
      hc_01.descrip.mes_fta_abs == "" ? (hc_01.descrip.mes_fta_abs = 0) : false;
      validarInputs(
        {
          form: "#mes_fta_abs_hc_01",
        },
        () => {
          hc_01.validarDatoAnoFtaAbs();
        },
        () => {
          hc_01.descrip.mes_fta_abs = cerosIzq(hc_01.descrip.mes_fta_abs, 2);
          var mes = parseInt(hc_01.descrip.mes_fta_abs);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesFtaAbs();
          } else {
            hc_01.validarDatoDiaFtaAbs();
          }
        }
      );
    },

    validarDatoDiaFtaAbs() {
      let hc_01 = this;
      hc_01.descrip.dia_fta_abs == "" ? (hc_01.descrip.dia_fta_abs = 0) : false;
      validarInputs(
        {
          form: "#dia_fta_abs_hc_01",
        },
        () => {
          hc_01.validarDatoMesFtaAbs();
        },
        () => {
          hc_01.descrip.dia_fta_abs = cerosIzq(hc_01.descrip.dia_fta_abs, 2);
          var dia = parseInt(hc_01.descrip.dia_fta_abs);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaFtaAbs();
          } else {
            hc_01.dato_4040.tabla_fta_abs_esq_w[
              hc_01.descrip.indEmb
            ].fecha_fta_abs_esq_w = `${hc_01.descrip.ano_fta_abs}${hc_01.descrip.mes_fta_abs}${hc_01.descrip.dia_fta_abs}`;

            var fecha = parseInt(
              hc_01.dato_4040.tabla_fta_abs_esq_w[hc_01.descrip.indEmb]
                .fecha_fta_abs_esq_w
            );
            var fechaRegla = parseInt(
              hc_01.dato_4040.gineco_esq_w.fecha_regla_esq_w
            );

            if (fecha > hc_01.fecha_actual || fecha < fechaRegla) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoFtaAbs();
            } else {
              fecha = fecha.toString();
              fechaRegla = fechaRegla.toString();

              var nro_dias = SC_DIAS(fechaRegla, fecha);
              var edad_gest_temp = nro_dias / 7;
              var embarazo_temp;

              if (edad_gest_temp < 13) {
                embarazo_temp = "1";
              } else if (edad_gest_temp < 26) {
                embarazo_temp = "2";
              } else {
                embarazo_temp = "3";
              }

              // console.log('emba: ', this.form.rips.embarazo, ' emba_w: ', embarazo_temp);
              if (this.form.rips.embarazo == embarazo_temp) {
                hc_01.validarDatoResultFtaAbs();
              } else {
                embarazo_temp = parseInt(embarazo_temp) - 1;
                hc_01.dato_4040.tabla_fta_abs_esq_w[
                  embarazo_temp
                ].fecha_fta_abs_esq_w =
                  hc_01.dato_4040.tabla_fta_abs_esq_w[
                    hc_01.descrip.indEmb
                  ].fecha_fta_abs_esq_w;
                hc_01.dato_4040.tabla_fta_abs_esq_w[
                  hc_01.descrip.indEmb
                ].fecha_fta_abs_esq_w = "";
                hc_01.dato_4040.tabla_fta_abs_esq_w[
                  hc_01.descrip.indEmb
                ].resultado_fta_abs_esq_w = "";

                hc_01.descrip.indEmb = embarazo_temp;

                hc_01.validarDatoResultFtaAbs();
              }
            }
          }
        }
      );
    },

    validarDatoResultFtaAbs() {
      let hc_01 = this;
      hc_01.ventanaResultadoVih(
        "tabla_fta_abs_esq_w",
        "resultado_fta_abs_esq_w",
        "validarDatoAnoFtaAbs",
        "validarDatoAnoUroanali",
        "resultado_fta_abs"
      );
    },

    validarDatoAnoUroanali() {
      let hc_01 = this;
      hc_01.descrip.ano_uroanali == ""
        ? (hc_01.descrip.ano_uroanali = 0)
        : false;
      validarInputs(
        {
          form: "#ano_uroanali_hc_01",
        },
        () => {
          hc_01.validarDatoAnoFtaAbs();
        },
        () => {
          hc_01.descrip.indEmb = parseInt(this.form.rips.embarazo) - 1;

          var edad_gest = parseInt(
            hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w
          );
          var ano = parseInt(hc_01.descrip.ano_uroanali);

          if (this.usuar.NIT == 900004059 && ano == 1800) {
            hc_01.descrip.ano_uroanali = hc_01.descrip.ano_uroanali.toString();
            hc_01.descrip.mes_uroanali = "01";
            hc_01.descrip.dia_uroanali = "01";
            hc_01.dato_4040.tabla_uroanali_esq_w[
              hc_01.descrip.indEmb
            ].fecha_uroanali_esq_w = `${hc_01.descrip.ano_uroanali}${hc_01.descrip.mes_uroanali}${hc_01.descrip.dia_uroanali}`;
            hc_01.dato_4040.tabla_uroanali_esq_w[
              hc_01.descrip.indEmb
            ].resultado_uroanali_esq_w = "3";
            switch (hc_01.descrip.indEmb.toString()) {
              case "0":
                hc_01.descrip.resultado_uroanali1 = "PENDIENTE";
                break;
              case "1":
                hc_01.descrip.resultado_uroanali2 = "PENDIENTE";
                break;
              case "2":
                hc_01.descrip.resultado_uroanali3 = "PENDIENTE";
                break;
            }

            hc_01.validarDatoAnoUroculti();
          } else if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoUroanali();
          } else if (ano == "" || ano == 0) {
            if (this.usuar.NIT == 900004059 && edad_gest >= 20) {
              CON851("03", "03", null, "error", "error");
              hc_01.validarDatoAnoUroanali();
            } else {
              hc_01.descrip.ano_uroanali = 0;
              hc_01.descrip.mes_uroanali = 0;
              hc_01.descrip.dia_uroanali = 0;
              hc_01.dato_4040.tabla_uroanali_esq_w[
                hc_01.descrip.indEmb
              ].fecha_uroanali_esq_w = "";
              hc_01.dato_4040.tabla_uroanali_esq_w[
                hc_01.descrip.indEmb
              ].resultado_uroanali_esq_w = "3";
              switch (hc_01.descrip.indEmb.toString()) {
                case "0":
                  hc_01.descrip.resultado_uroanali1 = "PENDIENTE";
                  break;
                case "1":
                  hc_01.descrip.resultado_uroanali2 = "PENDIENTE";
                  break;
                case "2":
                  hc_01.descrip.resultado_uroanali3 = "PENDIENTE";
                  break;
              }

              hc_01.validarDatoAnoUroculti();
            }
          } else {
            hc_01.validarDatoMesUroanali();
          }
        }
      );
    },

    validarDatoMesUroanali() {
      let hc_01 = this;
      hc_01.descrip.mes_uroanali == ""
        ? (hc_01.descrip.mes_uroanali = 0)
        : false;
      validarInputs(
        {
          form: "#mes_uroanali_hc_01",
        },
        () => {
          hc_01.validarDatoAnoUroanali();
        },
        () => {
          hc_01.descrip.mes_uroanali = cerosIzq(hc_01.descrip.mes_uroanali, 2);
          var mes = parseInt(hc_01.descrip.mes_uroanali);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesUroanali();
          } else {
            hc_01.validarDatoDiaUroanali();
          }
        }
      );
    },

    validarDatoDiaUroanali() {
      let hc_01 = this;
      hc_01.descrip.dia_uroanali == ""
        ? (hc_01.descrip.dia_uroanali = 0)
        : false;
      validarInputs(
        {
          form: "#dia_uroanali_hc_01",
        },
        () => {
          hc_01.validarDatoMesUroanali();
        },
        () => {
          hc_01.descrip.dia_uroanali = cerosIzq(hc_01.descrip.dia_uroanali, 2);
          var dia = parseInt(hc_01.descrip.dia_uroanali);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaUroanali();
          } else {
            hc_01.dato_4040.tabla_uroanali_esq_w[
              hc_01.descrip.indEmb
            ].fecha_uroanali_esq_w = `${hc_01.descrip.ano_uroanali}${hc_01.descrip.mes_uroanali}${hc_01.descrip.dia_uroanali}`;

            var fecha = parseInt(
              hc_01.dato_4040.tabla_uroanali_esq_w[hc_01.descrip.indEmb]
                .fecha_uroanali_esq_w
            );
            var fechaRegla = parseInt(
              hc_01.dato_4040.gineco_esq_w.fecha_regla_esq_w
            );

            if (fecha > hc_01.fecha_actual || fecha < fechaRegla) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoUroanali();
            } else {
              fecha = fecha.toString();
              fechaRegla = fechaRegla.toString();

              var nro_dias = SC_DIAS(fechaRegla, fecha);
              var edad_gest_temp = nro_dias / 7;
              var embarazo_temp;

              if (edad_gest_temp < 13) {
                embarazo_temp = "1";
              } else if (edad_gest_temp < 26) {
                embarazo_temp = "2";
              } else {
                embarazo_temp = "3";
              }

              // console.log('emba: ', this.form.rips.embarazo, ' emba_w: ', embarazo_temp);
              if (this.form.rips.embarazo == embarazo_temp) {
                hc_01.validarDatoResultUroanali();
              } else {
                embarazo_temp = parseInt(embarazo_temp) - 1;
                hc_01.dato_4040.tabla_uroanali_esq_w[
                  embarazo_temp
                ].fecha_uroanali_esq_w =
                  hc_01.dato_4040.tabla_uroanali_esq_w[
                    hc_01.descrip.indEmb
                  ].fecha_uroanali_esq_w;
                hc_01.dato_4040.tabla_uroanali_esq_w[
                  hc_01.descrip.indEmb
                ].fecha_uroanali_esq_w = "";
                hc_01.dato_4040.tabla_uroanali_esq_w[
                  hc_01.descrip.indEmb
                ].resultado_uroanali_esq_w = "";

                hc_01.descrip.indEmb = embarazo_temp;

                hc_01.validarDatoResultUroanali();
              }
            }
          }
        }
      );
    },

    validarDatoResultUroanali() {
      let hc_01 = this;
      hc_01.ventanarResultadoUroanali();
    },

    validarDatoAnoUroculti() {
      let hc_01 = this;
      hc_01.descrip.ano_uroculti == ""
        ? (hc_01.descrip.ano_uroculti = 0)
        : false;
      validarInputs(
        {
          form: "#ano_uroculti_hc_01",
        },
        () => {
          hc_01.validarDatoAnoUroanali();
        },
        () => {
          hc_01.descrip.indEmb = parseInt(this.form.rips.embarazo) - 1;

          var edad_gest = parseInt(
            hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w
          );
          var ano = parseInt(hc_01.descrip.ano_uroculti);

          if (this.usuar.NIT == 900004059 && ano == 1800) {
            hc_01.descrip.ano_uroculti = hc_01.descrip.ano_uroculti.toString();
            hc_01.descrip.mes_uroculti = "01";
            hc_01.descrip.dia_uroculti = "01";
            hc_01.dato_4040.tabla_uroculti_esq_w[
              hc_01.descrip.indEmb
            ].fecha_uroculti_esq_w = `${hc_01.descrip.ano_uroculti}${hc_01.descrip.mes_uroculti}${hc_01.descrip.dia_uroculti}`;
            hc_01.dato_4040.tabla_uroculti_esq_w[
              hc_01.descrip.indEmb
            ].resultado_uroculti_esq_w = "3";
            switch (hc_01.descrip.indEmb.toString()) {
              case "0":
                hc_01.descrip.resultado_uroculti1 = "PENDIENTE";
                break;
              case "1":
                hc_01.descrip.resultado_uroculti2 = "PENDIENTE";
                break;
              case "2":
                hc_01.descrip.resultado_uroculti3 = "PENDIENTE";
                break;
            }

            hc_01.validarDatoAnoFrotisV();
          } else if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoUroculti();
          } else if (ano == "" || ano == 0) {
            if (this.usuar.NIT == 900004059 && edad_gest >= 20) {
              CON851("03", "03", null, "error", "error");
              hc_01.validarDatoAnoUroculti();
            } else {
              hc_01.descrip.ano_uroculti = 0;
              hc_01.descrip.mes_uroculti = 0;
              hc_01.descrip.dia_uroculti = 0;
              hc_01.dato_4040.tabla_uroculti_esq_w[
                hc_01.descrip.indEmb
              ].fecha_uroculti_esq_w = "";
              hc_01.dato_4040.tabla_uroculti_esq_w[
                hc_01.descrip.indEmb
              ].resultado_uroculti_esq_w = "3";
              switch (hc_01.descrip.indEmb.toString()) {
                case "0":
                  hc_01.descrip.resultado_uroculti1 = "PENDIENTE";
                  break;
                case "1":
                  hc_01.descrip.resultado_uroculti2 = "PENDIENTE";
                  break;
                case "2":
                  hc_01.descrip.resultado_uroculti3 = "PENDIENTE";
                  break;
              }

              hc_01.validarDatoAnoFrotisV();
            }
          } else {
            hc_01.validarDatoMesUroculti();
          }
        }
      );
    },

    validarDatoMesUroculti() {
      let hc_01 = this;
      hc_01.descrip.mes_uroculti == ""
        ? (hc_01.descrip.mes_uroculti = 0)
        : false;
      validarInputs(
        {
          form: "#mes_uroculti_hc_01",
        },
        () => {
          hc_01.validarDatoAnoUroculti();
        },
        () => {
          hc_01.descrip.mes_uroculti = cerosIzq(hc_01.descrip.mes_uroculti, 2);
          var mes = parseInt(hc_01.descrip.mes_uroculti);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesUroculti();
          } else {
            hc_01.validarDatoDiaUroculti();
          }
        }
      );
    },

    validarDatoDiaUroculti() {
      let hc_01 = this;
      hc_01.descrip.dia_uroculti == ""
        ? (hc_01.descrip.dia_uroculti = 0)
        : false;
      validarInputs(
        {
          form: "#dia_uroculti_hc_01",
        },
        () => {
          hc_01.validarDatoMesUroculti();
        },
        () => {
          hc_01.descrip.dia_uroculti = cerosIzq(hc_01.descrip.dia_uroculti, 2);
          var dia = parseInt(hc_01.descrip.dia_uroculti);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaUroculti();
          } else {
            hc_01.dato_4040.tabla_uroculti_esq_w[
              hc_01.descrip.indEmb
            ].fecha_uroculti_esq_w = `${hc_01.descrip.ano_uroculti}${hc_01.descrip.mes_uroculti}${hc_01.descrip.dia_uroculti}`;

            var fecha = parseInt(
              hc_01.dato_4040.tabla_uroculti_esq_w[hc_01.descrip.indEmb]
                .fecha_uroculti_esq_w
            );
            var fechaRegla = parseInt(
              hc_01.dato_4040.gineco_esq_w.fecha_regla_esq_w
            );

            if (fecha > hc_01.fecha_actual || fecha < fechaRegla) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoUroculti();
            } else {
              fecha = fecha.toString();
              fechaRegla = fechaRegla.toString();

              var nro_dias = SC_DIAS(fechaRegla, fecha);
              var edad_gest_temp = nro_dias / 7;
              var embarazo_temp;

              if (edad_gest_temp < 13) {
                embarazo_temp = "1";
              } else if (edad_gest_temp < 26) {
                embarazo_temp = "2";
              } else {
                embarazo_temp = "3";
              }

              // console.log('emba: ', this.form.rips.embarazo, ' emba_w: ', embarazo_temp);
              if (this.form.rips.embarazo == embarazo_temp) {
                hc_01.validarDatoResultUroculti();
              } else {
                embarazo_temp = parseInt(embarazo_temp) - 1;
                hc_01.dato_4040.tabla_uroculti_esq_w[
                  embarazo_temp
                ].fecha_uroculti_esq_w =
                  hc_01.dato_4040.tabla_uroculti_esq_w[
                    hc_01.descrip.indEmb
                  ].fecha_uroculti_esq_w;
                hc_01.dato_4040.tabla_uroculti_esq_w[
                  hc_01.descrip.indEmb
                ].fecha_uroculti_esq_w = "";
                hc_01.dato_4040.tabla_uroculti_esq_w[
                  hc_01.descrip.indEmb
                ].resultado_uroculti_esq_w = "";

                hc_01.descrip.indEmb = embarazo_temp;

                hc_01.validarDatoResultUroculti();
              }
            }
          }
        }
      );
    },

    validarDatoResultUroculti() {
      let hc_01 = this;
      hc_01.ventanarResultadoUroculti();
    },

    validarDatoAnoFrotisV() {
      let hc_01 = this;
      hc_01.descrip.ano_frotisv == "" ? (hc_01.descrip.ano_frotisv = 0) : false;
      validarInputs(
        {
          form: "#ano_frotisv_hc_01",
        },
        () => {
          hc_01.validarDatoAnoUroculti();
        },
        () => {
          hc_01.descrip.indEmb = parseInt(this.form.rips.embarazo) - 1;

          var edad_gest = parseInt(
            hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w
          );
          var ano = parseInt(hc_01.descrip.ano_frotisv);

          if (this.usuar.NIT == 900004059 && ano == 1800) {
            hc_01.descrip.ano_frotisv = hc_01.descrip.ano_frotisv.toString();
            hc_01.descrip.mes_frotisv = "01";
            hc_01.descrip.dia_frotisv = "01";
            hc_01.dato_4040.tabla_frotisv_esq_w[
              hc_01.descrip.indEmb
            ].fecha_frotisv_esq_w = `${hc_01.descrip.ano_frotisv}${hc_01.descrip.mes_frotisv}${hc_01.descrip.dia_frotisv}`;
            hc_01.dato_4040.tabla_frotisv_esq_w[
              hc_01.descrip.indEmb
            ].resultado_frotisv_esq_w = "3";
            switch (hc_01.descrip.indEmb.toString()) {
              case "0":
                hc_01.descrip.resultado_frotisv1 = "PENDIENTE";
                break;
              case "1":
                hc_01.descrip.resultado_frotisv2 = "PENDIENTE";
                break;
              case "2":
                hc_01.descrip.resultado_frotisv3 = "PENDIENTE";
                break;
            }

            hc_01.validarDatoAnoGlicemia();
          } else if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoFrotisV();
          } else if (ano == "" || ano == 0) {
            if (this.usuar.NIT == 900004059 && edad_gest >= 20) {
              CON851("03", "03", null, "error", "error");
              hc_01.validarDatoAnoFrotisV();
            } else {
              hc_01.descrip.ano_frotisv = 0;
              hc_01.descrip.mes_frotisv = 0;
              hc_01.descrip.dia_frotisv = 0;
              hc_01.dato_4040.tabla_frotisv_esq_w[
                hc_01.descrip.indEmb
              ].fecha_frotisv_esq_w = "";
              hc_01.dato_4040.tabla_frotisv_esq_w[
                hc_01.descrip.indEmb
              ].resultado_frotisv_esq_w = "3";
              switch (hc_01.descrip.indEmb.toString()) {
                case "0":
                  hc_01.descrip.resultado_frotisv1 = "PENDIENTE";
                  break;
                case "1":
                  hc_01.descrip.resultado_frotisv2 = "PENDIENTE";
                  break;
                case "2":
                  hc_01.descrip.resultado_frotisv3 = "PENDIENTE";
                  break;
              }

              hc_01.validarDatoAnoGlicemia();
            }
          } else {
            hc_01.validarDatoMesFrotisV();
          }
        }
      );
    },

    validarDatoMesFrotisV() {
      let hc_01 = this;
      hc_01.descrip.mes_frotisv == "" ? (hc_01.descrip.mes_frotisv = 0) : false;
      validarInputs(
        {
          form: "#mes_frotisv_hc_01",
        },
        () => {
          hc_01.validarDatoAnoFrotisV();
        },
        () => {
          hc_01.descrip.mes_frotisv = cerosIzq(hc_01.descrip.mes_frotisv, 2);
          var mes = parseInt(hc_01.descrip.mes_frotisv);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesFrotisV();
          } else {
            hc_01.validarDatoDiaFrotisV();
          }
        }
      );
    },

    validarDatoDiaFrotisV() {
      let hc_01 = this;
      hc_01.descrip.dia_frotisv == "" ? (hc_01.descrip.dia_frotisv = 0) : false;
      validarInputs(
        {
          form: "#dia_frotisv_hc_01",
        },
        () => {
          hc_01.validarDatoMesUroculti();
        },
        () => {
          hc_01.descrip.dia_frotisv = cerosIzq(hc_01.descrip.dia_frotisv, 2);
          var dia = parseInt(hc_01.descrip.dia_frotisv);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaFrotisV();
          } else {
            hc_01.dato_4040.tabla_frotisv_esq_w[
              hc_01.descrip.indEmb
            ].fecha_frotisv_esq_w = `${hc_01.descrip.ano_frotisv}${hc_01.descrip.mes_frotisv}${hc_01.descrip.dia_frotisv}`;

            var fecha = parseInt(
              hc_01.dato_4040.tabla_frotisv_esq_w[hc_01.descrip.indEmb]
                .fecha_frotisv_esq_w
            );
            var fechaRegla = parseInt(
              hc_01.dato_4040.gineco_esq_w.fecha_regla_esq_w
            );

            if (fecha > hc_01.fecha_actual || fecha < fechaRegla) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoFrotisV();
            } else {
              fecha = fecha.toString();
              fechaRegla = fechaRegla.toString();

              var nro_dias = SC_DIAS(fechaRegla, fecha);
              var edad_gest_temp = nro_dias / 7;
              var embarazo_temp;

              if (edad_gest_temp < 13) {
                embarazo_temp = "1";
              } else if (edad_gest_temp < 26) {
                embarazo_temp = "2";
              } else {
                embarazo_temp = "3";
              }

              // console.log('emba: ', this.form.rips.embarazo, ' emba_w: ', embarazo_temp);
              if (this.form.rips.embarazo == embarazo_temp) {
                hc_01.validarDatoResultFrotisV();
              } else {
                embarazo_temp = parseInt(embarazo_temp) - 1;
                hc_01.dato_4040.tabla_frotisv_esq_w[
                  embarazo_temp
                ].fecha_frotisv_esq_w =
                  hc_01.dato_4040.tabla_frotisv_esq_w[
                    hc_01.descrip.indEmb
                  ].fecha_frotisv_esq_w;
                hc_01.dato_4040.tabla_frotisv_esq_w[
                  hc_01.descrip.indEmb
                ].fecha_frotisv_esq_w = "";
                hc_01.dato_4040.tabla_frotisv_esq_w[
                  hc_01.descrip.indEmb
                ].resultado_frotisv_esq_w = "";

                hc_01.descrip.indEmb = embarazo_temp;

                hc_01.validarDatoResultFrotisV();
              }
            }
          }
        }
      );
    },

    validarDatoResultFrotisV() {
      let hc_01 = this;
      hc_01.ventanarResultadoFrotisV();
    },

    validarDatoAnoGlicemia() {
      let hc_01 = this;
      hc_01.descrip.ano_glicemia == ""
        ? (hc_01.descrip.ano_glicemia = 0)
        : false;
      validarInputs(
        {
          form: "#ano_glicemia_hc_01",
        },
        () => {
          hc_01.validarDatoAnoFrotisV();
        },
        () => {
          hc_01.descrip.indEmb = parseInt(this.form.rips.embarazo) - 1;

          var edad_gest = parseInt(
            hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w
          );
          var ano = parseInt(hc_01.descrip.ano_glicemia);

          if (this.usuar.NIT == 900004059 && ano == 1800) {
            hc_01.descrip.ano_glicemia = hc_01.descrip.ano_glicemia.toString();
            hc_01.descrip.mes_glicemia = "01";
            hc_01.descrip.dia_glicemia = "01";
            hc_01.dato_4040.tabla_glicemia_esq_w[
              hc_01.descrip.indEmb
            ].fecha_glicemia_esq_w = `${hc_01.descrip.ano_glicemia}${hc_01.descrip.mes_glicemia}${hc_01.descrip.dia_glicemia}`;
            hc_01.dato_4040.tabla_glicemia_esq_w[
              hc_01.descrip.indEmb
            ].resultado_glicemia_esq_w = "";
            switch (hc_01.descrip.indEmb.toString()) {
              case "0":
                hc_01.descrip.resultado_glicemia1 = "";
                break;
              case "1":
                hc_01.descrip.resultado_glicemia2 = "";
                break;
              case "2":
                hc_01.descrip.resultado_glicemia3 = "";
                break;
            }

            hc_01.validarDatoAnoHepatB();
          } else if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoGlicemia();
          } else if (ano == "" || ano == 0) {
            if (this.usuar.NIT == 900004059 && edad_gest >= 20) {
              CON851("03", "03", null, "error", "error");
              hc_01.validarDatoAnoGlicemia();
            } else {
              hc_01.descrip.ano_glicemia = 0;
              hc_01.descrip.mes_glicemia = 0;
              hc_01.descrip.dia_glicemia = 0;
              hc_01.dato_4040.tabla_glicemia_esq_w[
                hc_01.descrip.indEmb
              ].fecha_glicemia_esq_w = "";
              hc_01.dato_4040.tabla_glicemia_esq_w[
                hc_01.descrip.indEmb
              ].resultado_glicemia_esq_w = "";
              switch (hc_01.descrip.indEmb.toString()) {
                case "0":
                  hc_01.descrip.resultado_glicemia1 = "";
                  break;
                case "1":
                  hc_01.descrip.resultado_glicemia2 = "";
                  break;
                case "2":
                  hc_01.descrip.resultado_glicemia3 = "";
                  break;
              }

              hc_01.validarDatoAnoHepatB();
            }
          } else {
            hc_01.validarDatoMesGlicemia();
          }
        }
      );
    },

    validarDatoMesGlicemia() {
      let hc_01 = this;
      hc_01.descrip.mes_glicemia == ""
        ? (hc_01.descrip.mes_glicemia = 0)
        : false;
      validarInputs(
        {
          form: "#mes_glicemia_hc_01",
        },
        () => {
          hc_01.validarDatoAnoGlicemia();
        },
        () => {
          hc_01.descrip.mes_glicemia = cerosIzq(hc_01.descrip.mes_glicemia, 2);
          var mes = parseInt(hc_01.descrip.mes_glicemia);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesGlicemia();
          } else {
            hc_01.validarDatoDiaGlicemia();
          }
        }
      );
    },

    validarDatoDiaGlicemia() {
      let hc_01 = this;
      hc_01.descrip.dia_glicemia == ""
        ? (hc_01.descrip.dia_glicemia = 0)
        : false;
      validarInputs(
        {
          form: "#dia_glicemia_hc_01",
        },
        () => {
          hc_01.validarDatoMesGlicemia();
        },
        () => {
          hc_01.descrip.dia_glicemia = cerosIzq(hc_01.descrip.dia_glicemia, 2);
          var dia = parseInt(hc_01.descrip.dia_glicemia);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaGlicemia();
          } else {
            hc_01.dato_4040.tabla_glicemia_esq_w[
              hc_01.descrip.indEmb
            ].fecha_glicemia_esq_w = `${hc_01.descrip.ano_glicemia}${hc_01.descrip.mes_glicemia}${hc_01.descrip.dia_glicemia}`;

            var fecha = parseInt(
              hc_01.dato_4040.tabla_glicemia_esq_w[hc_01.descrip.indEmb]
                .fecha_glicemia_esq_w
            );
            var fechaRegla = parseInt(
              hc_01.dato_4040.gineco_esq_w.fecha_regla_esq_w
            );

            if (fecha > hc_01.fecha_actual || fecha < fechaRegla) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoGlicemia();
            } else {
              fecha = fecha.toString();
              fechaRegla = fechaRegla.toString();

              var nro_dias = SC_DIAS(fechaRegla, fecha);
              var edad_gest_temp = nro_dias / 7;
              var embarazo_temp;

              if (edad_gest_temp < 13) {
                embarazo_temp = "1";
              } else if (edad_gest_temp < 26) {
                embarazo_temp = "2";
              } else {
                embarazo_temp = "3";
              }

              // console.log('emba: ', this.form.rips.embarazo, ' emba_w: ', embarazo_temp);
              if (this.form.rips.embarazo == embarazo_temp) {
                hc_01.validarDatoResultGlicemia();
              } else {
                embarazo_temp = parseInt(embarazo_temp) - 1;
                hc_01.dato_4040.tabla_glicemia_esq_w[
                  embarazo_temp
                ].fecha_glicemia_esq_w =
                  hc_01.dato_4040.tabla_glicemia_esq_w[
                    hc_01.descrip.indEmb
                  ].fecha_glicemia_esq_w;
                hc_01.dato_4040.tabla_glicemia_esq_w[
                  hc_01.descrip.indEmb
                ].fecha_glicemia_esq_w = "";
                hc_01.dato_4040.tabla_glicemia_esq_w[
                  hc_01.descrip.indEmb
                ].resultado_glicemia_esq_w = "";
                hc_01.descrip.indEmb = embarazo_temp;

                hc_01.validarDatoResultGlicemia();
              }
            }
          }
        }
      );
    },

    validarDatoResultGlicemia() {
      let hc_01 = this;
      var indice = (parseInt(hc_01.descrip.indEmb) + 1).toString();
      validarInputs(
        {
          form: `#resultado_glicemia${indice}_hc_01`,
        },
        () => {
          hc_01.validarDatoAnoGlicemia();
        },
        () => {
          hc_01.dato_4040.tabla_glicemia_esq_w[
            hc_01.descrip.indEmb
          ].resultado_glicemia_esq_w =
            hc_01.descrip[`resultado_glicemia${indice}`];

          hc_01.validarDatoAnoHepatB();
        }
      );
    },

    validarDatoAnoHepatB() {
      let hc_01 = this;
      hc_01.descrip.ano_hepatB == "" ? (hc_01.descrip.ano_hepatB = 0) : false;
      validarInputs(
        {
          form: "#ano_hepatB_hc_01",
        },
        () => {
          hc_01.validarDatoAnoGlicemia();
        },
        () => {
          var edad_gest = parseInt(
            hc_01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w
          );
          var ano = parseInt(hc_01.descrip.ano_hepatB);

          if (this.usuar.NIT == 900004059 && ano == 1800) {
            hc_01.descrip.ano_hepatB = hc_01.descrip.ano_hepatB.toString();
            hc_01.descrip.mes_hepatB = "01";
            hc_01.descrip.dia_hepatB = "01";
            hc_01.dato_4040.hepatitis_b_esq_w.fecha_hepat_b_esq_w = `${hc_01.descrip.ano_hepatB}${hc_01.descrip.mes_hepatB}${hc_01.descrip.dia_hepatB}`;
            hc_01.dato_4040.hepatitis_b_esq_w.resultado_hepat_b_esq_w = "3";

            hc_01.descrip.resultado_hepatB = "PENDIENTE";

            hc_01.validarDatoAnoGineco();
          } else if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoHepatB();
          } else if (ano == "" || ano == 0) {
            if (this.usuar.NIT == 900004059 && edad_gest >= 20) {
              CON851("03", "03", null, "error", "error");
              hc_01.validarDatoAnoHepatB();
            } else {
              hc_01.descrip.ano_hepatB = 0;
              hc_01.descrip.mes_hepatB = 0;
              hc_01.descrip.dia_hepatB = 0;
              hc_01.dato_4040.hepatitis_b_esq_w.fecha_hepat_b_esq_w = "";
              hc_01.dato_4040.hepatitis_b_esq_w.resultado_hepat_b_esq_w = "3";

              hc_01.descrip.resultado_hepatB = "PENDIENTE";

              hc_01.validarDatoAnoGineco();
            }
          } else {
            hc_01.validarDatoMesHepatB();
          }
        }
      );
    },

    validarDatoMesHepatB() {
      let hc_01 = this;
      hc_01.descrip.mes_hepatB == "" ? (hc_01.descrip.mes_hepatB = 0) : false;
      validarInputs(
        {
          form: "#mes_hepatB_hc_01",
        },
        () => {
          hc_01.validarDatoAnoHepatB();
        },
        () => {
          hc_01.descrip.mes_hepatB = cerosIzq(hc_01.descrip.mes_hepatB, 2);
          var mes = parseInt(hc_01.descrip.mes_hepatB);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesHepatB();
          } else {
            hc_01.validarDatoDiaHepatB();
          }
        }
      );
    },

    validarDatoDiaHepatB() {
      let hc_01 = this;
      hc_01.descrip.dia_hepatB == "" ? (hc_01.descrip.dia_hepatB = 0) : false;
      validarInputs(
        {
          form: "#dia_hepatB_hc_01",
        },
        () => {
          hc_01.validarDatoMesHepatB();
        },
        () => {
          hc_01.descrip.dia_hepatB = cerosIzq(hc_01.descrip.dia_hepatB, 2);
          var dia = parseInt(hc_01.descrip.dia_hepatB);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaHepatB();
          } else {
            hc_01.dato_4040.hepatitis_b_esq_w.fecha_hepat_b_esq_w = `${hc_01.descrip.ano_hepatB}${hc_01.descrip.mes_hepatB}${hc_01.descrip.dia_hepatB}`;

            var fecha = parseInt(
              hc_01.dato_4040.hepatitis_b_esq_w.fecha_hepat_b_esq_w
            );

            if (fecha > hc_01.fecha_actual) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoHepatB();
            } else {
              hc_01.validarDatoResultHepatB();
            }
          }
        }
      );
    },

    validarDatoResultHepatB() {
      let hc_01 = this;
      hc_01.ventanarResultadoHepatB();
    },

    validarDatoAnoGineco() {
      let hc_01 = this;
      hc_01.descrip.ano_gineco == "" ? (hc_01.descrip.ano_gineco = 0) : false;
      validarInputs(
        {
          form: "#ano_gineco_hc_01",
        },
        () => {
          hc_01.validarDatosVentanaTrimestral();
        },
        () => {
          var ano = parseInt(hc_01.descrip.ano_gineco);

          if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoGineco();
          } else if (ano == 0 || ano == "") {
            hc_01.descrip.ano_gineco = 0;
            hc_01.descrip.mes_gineco = 0;
            hc_01.descrip.dia_gineco = 0;
            hc_01.dato_4040.fecha_interconsulta_esq_w.fecha_gineco_esq_w = "";

            hc_01.validarDatoAnoOdonto();
          } else {
            hc_01.validarDatoMesGineco();
          }
        }
      );
    },

    validarDatoMesGineco() {
      let hc_01 = this;
      hc_01.descrip.mes_gineco == "" ? (hc_01.descrip.mes_gineco = 0) : false;
      validarInputs(
        {
          form: "#mes_gineco_hc_01",
        },
        () => {
          hc_01.validarDatoAnoGineco();
        },
        () => {
          hc_01.descrip.mes_gineco = cerosIzq(hc_01.descrip.mes_gineco, 2);
          var mes = parseInt(hc_01.descrip.mes_gineco);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesGineco();
          } else {
            hc_01.validarDatoDiaGineco();
          }
        }
      );
    },

    validarDatoDiaGineco() {
      let hc_01 = this;
      hc_01.descrip.dia_gineco == "" ? (hc_01.descrip.dia_gineco = 0) : false;
      validarInputs(
        {
          form: "#dia_gineco_hc_01",
        },
        () => {
          hc_01.validarDatoMesGineco();
        },
        () => {
          hc_01.descrip.dia_gineco = cerosIzq(hc_01.descrip.dia_gineco, 2);
          var dia = parseInt(hc_01.descrip.dia_gineco);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaGineco();
          } else {
            hc_01.dato_4040.fecha_interconsulta_esq_w.fecha_gineco_esq_w = `${hc_01.descrip.ano_gineco}${hc_01.descrip.mes_gineco}${hc_01.descrip.dia_gineco}`;

            var fecha = parseInt(
              hc_01.dato_4040.fecha_interconsulta_esq_w.fecha_gineco_esq_w
            );

            if (fecha > hc_01.fecha_actual) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoGineco();
            } else {
              hc_01.validarDatoAnoOdonto();
            }
          }
        }
      );
    },

    validarDatoAnoOdonto() {
      let hc_01 = this;
      hc_01.descrip.ano_odonto == "" ? (hc_01.descrip.ano_odonto = 0) : false;
      validarInputs(
        {
          form: "#ano_odonto_hc_01",
        },
        () => {
          hc_01.validarDatoAnoGineco();
        },
        () => {
          var ano = parseInt(hc_01.descrip.ano_odonto);

          if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoOdonto();
          } else if (ano == 0 || ano == "") {
            hc_01.descrip.ano_odonto = 0;
            hc_01.descrip.mes_odonto = 0;
            hc_01.descrip.dia_odonto = 0;
            hc_01.dato_4040.fecha_interconsulta_esq_w.fecha_odonto_esq_w = "";

            hc_01.validarDatoAnoNutri();
          } else {
            hc_01.validarDatoMesOdonto();
          }
        }
      );
    },

    validarDatoMesOdonto() {
      let hc_01 = this;
      hc_01.descrip.mes_odonto == "" ? (hc_01.descrip.mes_odonto = 0) : false;
      validarInputs(
        {
          form: "#mes_odonto_hc_01",
        },
        () => {
          hc_01.validarDatoAnoOdonto();
        },
        () => {
          hc_01.descrip.mes_odonto = cerosIzq(hc_01.descrip.mes_odonto, 2);
          var mes = parseInt(hc_01.descrip.mes_odonto);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesOdonto();
          } else {
            hc_01.validarDatoDiaOdonto();
          }
        }
      );
    },

    validarDatoDiaOdonto() {
      let hc_01 = this;
      hc_01.descrip.dia_odonto == "" ? (hc_01.descrip.dia_odonto = 0) : false;
      validarInputs(
        {
          form: "#dia_odonto_hc_01",
        },
        () => {
          hc_01.validarDatoMesOdonto();
        },
        () => {
          hc_01.descrip.dia_odonto = cerosIzq(hc_01.descrip.dia_odonto, 2);
          var dia = parseInt(hc_01.descrip.dia_odonto);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaOdonto();
          } else {
            hc_01.dato_4040.fecha_interconsulta_esq_w.fecha_odonto_esq_w = `${hc_01.descrip.ano_odonto}${hc_01.descrip.mes_odonto}${hc_01.descrip.dia_odonto}`;

            var fecha = parseInt(
              hc_01.dato_4040.fecha_interconsulta_esq_w.fecha_odonto_esq_w
            );

            if (fecha > hc_01.fecha_actual) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoOdonto();
            } else {
              hc_01.validarDatoAnoNutri();
            }
          }
        }
      );
    },

    validarDatoAnoNutri() {
      let hc_01 = this;
      hc_01.descrip.ano_nutri == "" ? (hc_01.descrip.ano_nutri = 0) : false;
      validarInputs(
        {
          form: "#ano_nutri_hc_01",
        },
        () => {
          hc_01.validarDatoAnoOdonto();
        },
        () => {
          var ano = parseInt(hc_01.descrip.ano_nutri);

          if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoNutri();
          } else if (ano == 0 || ano == "") {
            hc_01.descrip.ano_nutri = 0;
            hc_01.descrip.mes_nutri = 0;
            hc_01.descrip.dia_nutri = 0;
            hc_01.dato_4040.fecha_interconsulta_esq_w.fecha_nutri_esq_w = "";

            hc_01.validarDatoAnoPsicol();
          } else {
            hc_01.validarDatoMesNutri();
          }
        }
      );
    },

    validarDatoMesNutri() {
      let hc_01 = this;
      hc_01.descrip.mes_nutri == "" ? (hc_01.descrip.mes_nutri = 0) : false;
      validarInputs(
        {
          form: "#mes_nutri_hc_01",
        },
        () => {
          hc_01.validarDatoAnoNutri();
        },
        () => {
          hc_01.descrip.mes_nutri = cerosIzq(hc_01.descrip.mes_nutri, 2);
          var mes = parseInt(hc_01.descrip.mes_nutri);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesNutri();
          } else {
            hc_01.validarDatoDiaNutri();
          }
        }
      );
    },

    validarDatoDiaNutri() {
      let hc_01 = this;
      hc_01.descrip.dia_nutri == "" ? (hc_01.descrip.dia_nutri = 0) : false;
      validarInputs(
        {
          form: "#dia_nutri_hc_01",
        },
        () => {
          hc_01.validarDatoMesNutri();
        },
        () => {
          hc_01.descrip.dia_nutri = cerosIzq(hc_01.descrip.dia_nutri, 2);
          var dia = parseInt(hc_01.descrip.dia_nutri);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaNutri();
          } else {
            hc_01.dato_4040.fecha_interconsulta_esq_w.fecha_nutri_esq_w = `${hc_01.descrip.ano_nutri}${hc_01.descrip.mes_nutri}${hc_01.descrip.dia_nutri}`;

            var fecha = parseInt(
              hc_01.dato_4040.fecha_interconsulta_esq_w.fecha_nutri_esq_w
            );

            if (fecha > hc_01.fecha_actual) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoNutri();
            } else {
              hc_01.validarDatoAnoPsicol();
            }
          }
        }
      );
    },

    validarDatoAnoPsicol() {
      let hc_01 = this;
      hc_01.descrip.ano_psicol == "" ? (hc_01.descrip.ano_psicol = 0) : false;
      validarInputs(
        {
          form: "#ano_psicol_hc_01",
        },
        () => {
          hc_01.validarDatoAnoNutri();
        },
        () => {
          var ano = parseInt(hc_01.descrip.ano_psicol);

          if (ano > 0 && ano < 1950) {
            hc_01.validarDatoAnoPsicol();
          } else if (ano == 0 || ano == "") {
            hc_01.descrip.ano_psicol = 0;
            hc_01.descrip.mes_psicol = 0;
            hc_01.descrip.dia_psicol = 0;
            hc_01.dato_4040.fecha_interconsulta_esq_w.fecha_psicol_esq_w = "";

            hc_01._grabarHc_pag4();
          } else {
            hc_01.validarDatoMesPsicol();
          }
        }
      );
    },

    validarDatoMesPsicol() {
      let hc_01 = this;
      hc_01.descrip.mes_psicol == "" ? (hc_01.descrip.mes_psicol = 0) : false;
      validarInputs(
        {
          form: "#mes_psicol_hc_01",
        },
        () => {
          hc_01.validarDatoAnoPsicol();
        },
        () => {
          hc_01.descrip.mes_psicol = cerosIzq(hc_01.descrip.mes_psicol, 2);
          var mes = parseInt(hc_01.descrip.mes_psicol);

          if (mes < 1 || mes > 12) {
            hc_01.validarDatoMesPsicol();
          } else {
            hc_01.validarDatoDiaPsicol();
          }
        }
      );
    },

    validarDatoDiaPsicol() {
      let hc_01 = this;
      hc_01.descrip.dia_psicol == "" ? (hc_01.descrip.dia_psicol = 0) : false;
      validarInputs(
        {
          form: "#dia_psicol_hc_01",
        },
        () => {
          hc_01.validarDatoMesPsicol();
        },
        () => {
          hc_01.descrip.dia_psicol = cerosIzq(hc_01.descrip.dia_psicol, 2);
          var dia = parseInt(hc_01.descrip.dia_psicol);

          if (dia < 1 || dia > 31) {
            hc_01.validarDatoDiaPsicol();
          } else {
            hc_01.dato_4040.fecha_interconsulta_esq_w.fecha_psicol_esq_w = `${hc_01.descrip.ano_psicol}${hc_01.descrip.mes_psicol}${hc_01.descrip.dia_psicol}`;

            var fecha = parseInt(
              hc_01.dato_4040.fecha_interconsulta_esq_w.fecha_psicol_esq_w
            );

            if (fecha > hc_01.fecha_actual) {
              CON851("37", "37", null, "error", "error");
              hc_01.validarDatoAnoPsicol();
            } else {
              hc_01._grabarHc_pag4();
            }
          }
        }
      );
    },

    _grabarHc_pag4() {
      loader("show");
      let hc_01 = this,
        datos = _getObjetoHc(hc_01.form);

      postData(datos, get_url("APP/HICLIN/SAVE_HC.DLL"))
        .then((data) => {
          hc_01._grabarDetalles_pag4_hc_01();
        })
        .catch((ee) => {
          loader("hide");
          console.log(error, "ERROR");
          _regresar_menuhis();
        });
    },

    async _grabarDetalles_pag4_hc_01() {
      let hc_01 = this;
      console.log("LLEGA A GRABAR");

      // var datos = _getObjetoSaveHc(this.hcprc, filtroArray.tablasHC)

      // postData(datos, get_url("APP/HICLIN/SAVE_HC_2.DLL"))
      //   .then((data) => {
      //     console.log(data, 'GUARDA')
      //   })
      //   .catch((error) => {
      //     console.log(error, 'ERROR')
      //   });

      let detalles = {
        4040: _getObjetoSaveHc(hc_01.dato_4040, filtroArray.tabla4040),
      };

      grabarDetalles(detalles, hc_01.form.llave);

      if (
        (hc_01.form.serv =
          ("08" && hc_01.form.rips.atiende == 2) ||
          hc_01.form.rips.atiende == 6)
      ) {
        hc_01._llenarDatosPag4E();
      } else {
        hc_01._llenarDatosPag5();
      }
    },

    _llenarDatosPag4E() {
      loader("hide");
      this.descrip.edad = this.form.edad.unid_edad + this.form.edad.vlr_edad;
      this.validarDatoAbortHab();
    },

    validarDatoAbortHab() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.infertilidad_aborto_esq_w.trim() ==
        ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.infertilidad_aborto_esq_w =
          "N")
        : false;
      validarInputs(
        {
          form: "#infertilidad_aborto_esq_hc_01",
        },
        () => {
          hc_01._llenarDatosPag4();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.infertilidad_aborto_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.infertilidad_aborto_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w
              .infertilidad_aborto_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoRetePace();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoAbortHab();
          }
        }
      );
    },

    validarDatoRetePace() {
      let hc_01 = this;
      hc_01.dato_4040.riesgo_biopsicosocial_esq_w.retencion_pacentaria_esq_w.trim() ==
        ""
        ? (hc_01.dato_4040.riesgo_biopsicosocial_esq_w.retencion_pacentaria_esq_w =
          "N")
        : false;
      validarInputs(
        {
          form: "#retencion_pacentaria_esq_hc_01",
        },
        () => {
          hc_01.validarDatoAbortHab();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.retencion_pacentaria_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.retencion_pacentaria_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w
              .retencion_pacentaria_esq_w;
          if (temp == "S" || temp == "N") {
            var gemel = parseInt(hc_01.dato_4040.gineco_esq_w.gine_gemel_esq_w);
            var cesarias = parseInt(
              hc_01.dato_4040.gineco_esq_w.cesareas_esq_w
            );

            if (gemel > 0 || cesarias > 0) {
              hc_01.descrip.geme_cesa = "S";
            } else {
              hc_01.descrip.geme_cesa = "N";
            }

            hc_01.validarDatoHtaInducida();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoRetePace();
          }
        }
      );
    },

    validarDatoHtaInducida() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.hta_inducida_embar_esq_w.trim() ==
        ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.hta_inducida_embar_esq_w =
          "N")
        : false;
      validarInputs(
        {
          form: "#hta_inducida_embar_esq_hc_01",
        },
        () => {
          hc_01.validarDatoRetePace();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.hta_inducida_embar_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.hta_inducida_embar_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w
              .hta_inducida_embar_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoMortiMuerte();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoHtaInducida();
          }
        }
      );
    },

    validarDatoMortiMuerte() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.mortinato_muerte_neo_esq_w.trim() ==
        ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.mortinato_muerte_neo_esq_w =
          "N")
        : false;
      validarInputs(
        {
          form: "#mortinato_muerte_neo_esq_hc_01",
        },
        () => {
          hc_01.validarDatoHtaInducida();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.mortinato_muerte_neo_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.mortinato_muerte_neo_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w
              .mortinato_muerte_neo_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoDificilEsq();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoMortiMuerte();
          }
        }
      );
    },

    validarDatoDificilEsq() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.tp_dificil_esq_w.trim() == ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.tp_dificil_esq_w = "N")
        : false;
      validarInputs(
        {
          form: "#tp_dificil_esq_hc_01",
        },
        () => {
          hc_01.validarDatoMortiMuerte();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.tp_dificil_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.tp_dificil_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w.tp_dificil_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoGinecoEct();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoDificilEsq();
          }
        }
      );
    },

    validarDatoGinecoEct() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.qx_gineco_ectopico_esq_w.trim() ==
        ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.qx_gineco_ectopico_esq_w =
          "N")
        : false;
      validarInputs(
        {
          form: "#qx_gineco_ectopico_esq_hc_01",
        },
        () => {
          hc_01.validarDatoDificilEsq();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.qx_gineco_ectopico_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.qx_gineco_ectopico_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w
              .qx_gineco_ectopico_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoRenalCro();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoGinecoEct();
          }
        }
      );
    },

    validarDatoRenalCro() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.enf_renal_cronica_esq_w.trim() ==
        ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.enf_renal_cronica_esq_w =
          "N")
        : false;
      validarInputs(
        {
          form: "#enf_renal_cronica_esq_hc_01",
        },
        () => {
          hc_01.validarDatoGinecoEct();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.enf_renal_cronica_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.enf_renal_cronica_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w.enf_renal_cronica_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoDiabGes();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoRenalCro();
          }
        }
      );
    },

    validarDatoDiabGes() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.diab_gestacional_esq_w.trim() ==
        ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.diab_gestacional_esq_w =
          "N")
        : false;
      validarInputs(
        {
          form: "#diab_gestacional_esq_hc_01",
        },
        () => {
          hc_01.validarDatoRenalCro();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.diab_gestacional_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.diab_gestacional_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w.diab_gestacional_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoDiabMelli();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoDiabGes();
          }
        }
      );
    },

    validarDatoDiabMelli() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.diab_mellitus_esq_w.trim() ==
        ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.diab_mellitus_esq_w = "N")
        : false;
      validarInputs(
        {
          form: "#diab_mellitus_esq_hc_01",
        },
        () => {
          hc_01.validarDatoDiabGes();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.diab_mellitus_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.diab_mellitus_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w.diab_mellitus_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoEnfCardiaca();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoDiabMelli();
          }
        }
      );
    },

    validarDatoEnfCardiaca() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.enf_cardiaca_esq_esq_w.trim() ==
        ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.enf_cardiaca_esq_esq_w =
          "N")
        : false;
      validarInputs(
        {
          form: "#enf_cardiaca_esq_esq_hc_01",
        },
        () => {
          hc_01.validarDatoDiabMelli();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.enf_cardiaca_esq_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.enf_cardiaca_esq_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w.enf_cardiaca_esq_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoInfecAgudas();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoEnfCardiaca();
          }
        }
      );
    },

    validarDatoInfecAgudas() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.enf_infec_agudas_esq_w.trim() ==
        ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.enf_infec_agudas_esq_w =
          "N")
        : false;
      validarInputs(
        {
          form: "#enf_infec_agudas_esq_hc_01",
        },
        () => {
          hc_01.validarDatoEnfCardiaca();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.enf_infec_agudas_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.enf_infec_agudas_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w.enf_infec_agudas_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoAutoinAgudas();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoInfecAgudas();
          }
        }
      );
    },

    validarDatoAutoinAgudas() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.enf_autoinmunes_esq_w.trim() ==
        ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.enf_autoinmunes_esq_w =
          "N")
        : false;
      validarInputs(
        {
          form: "#enf_autoinmunes_esq_hc_01",
        },
        () => {
          hc_01.validarDatoInfecAgudas();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.enf_autoinmunes_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.enf_autoinmunes_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w.enf_autoinmunes_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoAnemiaHb();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoAutoinAgudas();
          }
        }
      );
    },

    validarDatoAnemiaHb() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.anemia_hb_esq_w.trim() == ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.anemia_hb_esq_w = "N")
        : false;
      validarInputs(
        {
          form: "#anemia_hb_esq_hc_01",
        },
        () => {
          hc_01.validarDatoAutoinAgudas();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.anemia_hb_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.anemia_hb_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w.anemia_hb_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoHemorraMen();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoAnemiaHb();
          }
        }
      );
    },

    validarDatoHemorraMen() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.hemorragia_men_20_esq_w.trim() ==
        ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.hemorragia_men_20_esq_w =
          "N")
        : false;
      validarInputs(
        {
          form: "#hemorragia_men_20_esq_hc_01",
        },
        () => {
          hc_01.validarDatoAnemiaHb();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.hemorragia_men_20_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.hemorragia_men_20_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w.hemorragia_men_20_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoHemorraMay();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoHemorraMen();
          }
        }
      );
    },

    validarDatoHemorraMay() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.hemorragia_may_20_esq_w.trim() ==
        ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.hemorragia_may_20_esq_w =
          "N")
        : false;
      validarInputs(
        {
          form: "#hemorragia_may_20_esq_hc_01",
        },
        () => {
          hc_01.validarDatoHemorraMen();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.hemorragia_may_20_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.hemorragia_may_20_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w.hemorragia_may_20_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoEmbProlong();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoHemorraMay();
          }
        }
      );
    },

    validarDatoEmbProlong() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.emb_prolongado_esq_w.trim() ==
        ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.emb_prolongado_esq_w =
          "N")
        : false;
      validarInputs(
        {
          form: "#emb_prolongado_esq_hc_01",
        },
        () => {
          hc_01.validarDatoHemorraMay();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.emb_prolongado_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.emb_prolongado_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w.emb_prolongado_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoHtaEsq();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoEmbProlong();
          }
        }
      );
    },

    validarDatoHtaEsq() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.hta_esq_w.trim() == ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.hta_esq_w = "N")
        : false;
      validarInputs(
        {
          form: "#hta_esq_hc_01",
        },
        () => {
          hc_01.validarDatoEmbProlong();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.hta_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.hta_esq_w.toUpperCase();
          var temp = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.hta_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoRpmEsq();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoHtaEsq();
          }
        }
      );
    },

    validarDatoRpmEsq() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.rpm_esq_w.trim() == ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.rpm_esq_w = "N")
        : false;
      validarInputs(
        {
          form: "#rpm_esq_w_hc_01",
        },
        () => {
          hc_01.validarDatoHtaEsq();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.rpm_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.rpm_esq_w.toUpperCase();
          var temp = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.rpm_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoPolihidramEsq();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoRpmEsq();
          }
        }
      );
    },

    validarDatoPolihidramEsq() {
      let hc_01 = this;
      this.dato_4040.obstetric_esq_w.polihidram_esq_w.trim() == ""
        ? (this.dato_4040.obstetric_esq_w.polihidram_esq_w = "N")
        : false;
      validarInputs(
        {
          form: "#polihidram_esq_hc_01",
        },
        () => {
          hc_01.validarDatoRpmEsq();
        },
        () => {
          hc_01.dato_4040.obstetric_esq_w.polihidram_esq_w = hc_01.dato_4040.obstetric_esq_w.polihidram_esq_w.toUpperCase();
          var temp = hc_01.dato_4040.obstetric_esq_w.polihidram_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoRciuEsq();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoPolihidramEsq();
          }
        }
      );
    },

    validarDatoRciuEsq() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.rciu_esq_w.trim() == ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.rciu_esq_w = "N")
        : false;
      validarInputs(
        {
          form: "#rciu_esq_hc_01",
        },
        () => {
          hc_01.validarDatoPolihidramEsq();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.rciu_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.rciu_esq_w.toUpperCase();
          var temp = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.rciu_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoEmbMultiple();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoRciuEsq();
          }
        }
      );
    },

    validarDatoEmbMultiple() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.emb_multiple_esq_w.trim() == ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.emb_multiple_esq_w = "N")
        : false;
      validarInputs(
        {
          form: "#emb_multiple_esq_hc_01",
        },
        () => {
          hc_01.validarDatoRciuEsq();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.emb_multiple_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.emb_multiple_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w.emb_multiple_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoMalaPrese();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoEmbMultiple();
          }
        }
      );
    },

    validarDatoMalaPrese() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.mala_presenta_esq_w.trim() ==
        ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.mala_presenta_esq_w = "N")
        : false;
      validarInputs(
        {
          form: "#mala_presenta_esq_hc_01",
        },
        () => {
          hc_01.validarDatoEmbMultiple();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.mala_presenta_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.mala_presenta_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w.mala_presenta_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoInsinmRh();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoMalaPrese();
          }
        }
      );
    },

    validarDatoInsinmRh() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.isoinm_rh_esq_w.trim() == ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.isoinm_rh_esq_w = "N")
        : false;
      validarInputs(
        {
          form: "#isoinm_rh_esq_hc_01",
        },
        () => {
          hc_01.validarDatoMalaPrese();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.isoinm_rh_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.isoinm_rh_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w.isoinm_rh_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoTensionEmocional();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoInsinmRh();
          }
        }
      );
    },

    validarDatoTensionEmocional() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.tension_emocional_esq_w.trim() ==
        ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.tension_emocional_esq_w =
          "N")
        : false;
      validarInputs(
        {
          form: "#tension_emocional_esq_hc_01",
        },
        () => {
          hc_01.validarDatoInsinmRh();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.tension_emocional_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.tension_emocional_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w.tension_emocional_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoHumorDespresivo();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoTensionEmocional();
          }
        }
      );
    },

    validarDatoHumorDespresivo() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.humor_depresivo_esq_w.trim() ==
        ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.humor_depresivo_esq_w =
          "N")
        : false;
      validarInputs(
        {
          form: "#humor_depresivo_esq_hc_01",
        },
        () => {
          hc_01.validarDatoTensionEmocional();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.humor_depresivo_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.humor_depresivo_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w.humor_depresivo_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoSintoNeurovege();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoHumorDespresivo();
          }
        }
      );
    },

    validarDatoSintoNeurovege() {
      let hc_01 = this;
      this.dato_4040.riesgo_biopsicosocial_esq_w.sinto_neurovegeta_esq_w.trim() ==
        ""
        ? (this.dato_4040.riesgo_biopsicosocial_esq_w.sinto_neurovegeta_esq_w =
          "N")
        : false;
      validarInputs(
        {
          form: "#sinto_neurovegeta_esq_hc_01",
        },
        () => {
          hc_01.validarDatoHumorDespresivo();
        },
        () => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w.sinto_neurovegeta_esq_w = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.sinto_neurovegeta_esq_w.toUpperCase();
          var temp =
            hc_01.dato_4040.riesgo_biopsicosocial_esq_w.sinto_neurovegeta_esq_w;
          if (temp == "S" || temp == "N") {
            hc_01.validarDatoTiempoFami();
          } else {
            CON851("03", "03", null, "error", "error");
            hc_01.validarDatoSintoNeurovege();
          }
        }
      );
    },

    validarDatoTiempoFami() {
      let hc_01 = this;
      hc_01.HC877(
        "soporte_fami_tiempo_esq_w",
        "validarDatoSintoNeurovege",
        "validarDatoEspacioFami",
        "tiempo"
      );
    },

    validarDatoEspacioFami() {
      let hc_01 = this;
      hc_01.HC877(
        "soporte_fami_espacio_esq_w",
        "validarDatoTiempoFami",
        "validarDatoDineroFami",
        "espacio"
      );
    },

    validarDatoDineroFami() {
      let hc_01 = this;
      hc_01.HC877(
        "soporte_fami_dienro_esq_w",
        "validarDatoEspacioFami",
        "validarDatoTotalRiesgo",
        "dinero"
      );
    },

    validarDatoTotalRiesgo() {
      let hc_01 = this;
      _fin_validar_form();
      hc_01.modal_total = true;
      hc_01.parte1Total();
    },

    async parte1Total() {
      let hc_01 = this;

      var dato_w;
      var subtotal1_w = 0;
      var subtotal2_w = 0;
      var subtotal3_w = 0;
      var subtotal4_w = 0;

      unidadEdad = hc_01.form.edad.unid_edad;
      vlrEdad = hc_01.form.edad.vlr_edad;

      if (unidadEdad == "A") {
        if (vlrEdad < 16) {
          dato_w = 1;
        } else {
          if (vlrEdad >= 16 && vlrEdad <= 35) {
            dato_w = 0;
          } else {
            dato_w = 2;
          }
        }
      } else {
        dato_w = 1;
      }
      subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

      var gest = parseInt(hc_01.dato_4040.gineco_esq_w.gestaciones_esq_w);

      if (gest == 0) {
        dato_w = 1;
      } else {
        if (gest >= 1 || gest <= 4) {
          dato_w = 0;
        } else {
          dato_w = 2;
        }
      }
      subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

      var inferAbort =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.infertilidad_aborto_esq_w;

      if (inferAbort == "S") {
        dato_w = 1;
      } else {
        dato_w = 0;
      }
      subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

      var retenPace =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.retencion_pacentaria_esq_w;

      if (retenPace == "S") {
        dato_w = 1;
      } else {
        dato_w = 0;
      }
      subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

      // si tiene hijos con peso > 4000g

      var gine40 = parseInt(hc_01.dato_4040.gineco_esq_w.gine_40_esq_w);

      if (gine40 > 0) {
        dato_w = 1;
      } else {
        dato_w = 0;
      }
      subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

      var gine25 = parseInt(hc_01.dato_4040.gineco_esq_w.gine_25_esq_w);

      if (gine25 > 0) {
        dato_w = 1;
      } else {
        dato_w = 0;
      }
      subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

      var htaIndu =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.hta_inducida_embar_esq_w;

      if (htaIndu == "S") {
        dato_w = 1;
      } else {
        dato_w = 0;
      }
      subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

      var gemel = parseInt(hc_01.dato_4040.gineco_esq_w.gine_gemel_esq_w);
      var cesarias = parseInt(hc_01.dato_4040.gineco_esq_w.cesareas_esq_w);

      if (gemel > 0 || cesarias > 0) {
        dato_w = 1;
      } else {
        dato_w = 0;
      }
      subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

      var mortMuerte =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.mortinato_muerte_neo_esq_w;

      if (mortMuerte == "S") {
        dato_w = 1;
      } else {
        dato_w = 0;
      }
      subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

      var tpDificil =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.tp_dificil_esq_w;

      if (tpDificil == "S") {
        dato_w = 1;
      } else {
        dato_w = 0;
      }
      subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

      // parte 2

      var qxGine =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.qx_gineco_ectopico_esq_w;

      if (qxGine == "S") {
        dato_w = 1;
      } else {
        dato_w = 0;
      }
      subtotal2_w = parseInt(dato_w) + parseInt(subtotal2_w);

      var enfCron =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.enf_renal_cronica_esq_w;

      if (enfCron == "S") {
        dato_w = 1;
      } else {
        dato_w = 0;
      }
      subtotal2_w = parseInt(dato_w) + parseInt(subtotal2_w);

      var diabGest =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.diab_gestacional_esq_w;

      if (diabGest == "S") {
        dato_w = 2;
      } else {
        dato_w = 0;
      }
      subtotal2_w = parseInt(dato_w) + parseInt(subtotal2_w);

      var diabMell =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.diab_mellitus_esq_w;

      if (diabMell == "S") {
        dato_w = 3;
      } else {
        dato_w = 0;
      }
      subtotal2_w = parseInt(dato_w) + parseInt(subtotal2_w);

      var enfCard =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.enf_cardiaca_esq_esq_w;

      if (enfCard == "S") {
        dato_w = 3;
      } else {
        dato_w = 0;
      }
      subtotal2_w = parseInt(dato_w) + parseInt(subtotal2_w);

      var enfAgud =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.enf_infec_agudas_esq_w;

      if (enfAgud == "S") {
        dato_w = 1;
      } else {
        dato_w = 0;
      }
      subtotal2_w = parseInt(dato_w) + parseInt(subtotal2_w);

      var enfAuto =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.enf_autoinmunes_esq_w;

      if (enfAuto == "S") {
        dato_w = 3;
      } else {
        dato_w = 0;
      }
      subtotal2_w = parseInt(dato_w) + parseInt(subtotal2_w);

      var anemiaHb =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.anemia_hb_esq_w;

      if (anemiaHb == "S") {
        dato_w = 1;
      } else {
        dato_w = 0;
      }
      subtotal2_w = parseInt(dato_w) + parseInt(subtotal2_w);

      // parte 3

      var hemoMen20 =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.hemorragia_men_20_esq_w;

      if (hemoMen20 == "S") {
        dato_w = 1;
      } else {
        dato_w = 0;
      }
      subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

      var hemoMay20 =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.hemorragia_may_20_esq_w;

      if (hemoMay20 == "S") {
        dato_w = 3;
      } else {
        dato_w = 0;
      }
      subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

      var embProlon =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.emb_prolongado_esq_w;

      if (embProlon == "S") {
        dato_w = 1;
      } else {
        dato_w = 0;
      }
      subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

      var hta = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.hta_esq_w;

      if (hta == "S") {
        dato_w = 2;
      } else {
        dato_w = 0;
      }
      subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

      var rpm = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.rpm_esq_w;

      if (rpm == "S") {
        dato_w = 2;
      } else {
        dato_w = 0;
      }
      subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

      var polihi = hc_01.dato_4040.obstetric_esq_w.polihidram_esq_w;

      if (polihi == "S") {
        dato_w = 2;
      } else {
        dato_w = 0;
      }
      subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

      var rciu = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.rciu_esq_w;

      if (rciu == "S") {
        dato_w = 3;
      } else {
        dato_w = 0;
      }
      subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

      var embMulti =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.emb_multiple_esq_w;

      if (embMulti == "S") {
        dato_w = 3;
      } else {
        dato_w = 0;
      }
      subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

      var malaPresen =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.mala_presenta_esq_w;

      if (malaPresen == "S") {
        dato_w = 3;
      } else {
        dato_w = 0;
      }
      subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

      var insoinm = hc_01.dato_4040.riesgo_biopsicosocial_esq_w.isoinm_rh_esq_w;

      if (insoinm == "S") {
        dato_w = 3;
      } else {
        dato_w = 0;
      }
      subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

      // parte 4

      var texto;
      var texto2;
      dato_w = "";

      var tensionEmo =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.tension_emocional_esq_w;

      if (tensionEmo == "S") {
        texto = "INTENSO";
        dato_w = parseInt(dato_w) + 1;
      } else {
        texto = "AUSENTE";
      }

      var humorDepre =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.humor_depresivo_esq_w;

      if (humorDepre == "S") {
        texto = "INTENSO";
        dato_w = parseInt(dato_w) + 1;
      } else {
        texto = "AUSENTE";
      }

      var sintoNeuro =
        hc_01.dato_4040.riesgo_biopsicosocial_esq_w.sinto_neurovegeta_esq_w;

      if (sintoNeuro == "S") {
        texto = "INTENSO";
        dato_w = parseInt(dato_w) + 1;
      } else {
        texto = "AUSENTE";
      }

      if (dato_w >= 2) {
        dato_w = 1;
        subtotal4_w = parseInt(subtotal4_w) + 1;
      } else {
        dato_w = "";
      }

      switch (
      hc_01.dato_4040.riesgo_biopsicosocial_esq_w.soporte_fami_tiempo_esq_w
      ) {
        case "1":
          texto2 = "CASI SIEMPRE";
          break;
        case "2":
          texto2 = "A VECES";
          break;
        case "3":
          texto2 = "NUNCA";
          dato_w = parseInt(dato_w) + 1;
          break;
        default:
          texto2 = "";
          break;
      }

      switch (
      hc_01.dato_4040.riesgo_biopsicosocial_esq_w.soporte_fami_espacio_esq_w
      ) {
        case "1":
          texto2 = "CASI SIEMPRE";
          break;
        case "2":
          texto2 = "A VECES";
          break;
        case "3":
          texto2 = "NUNCA";
          dato_w = parseInt(dato_w) + 1;
          break;
        default:
          texto2 = "";
          break;
      }

      switch (
      hc_01.dato_4040.riesgo_biopsicosocial_esq_w.soporte_fami_dienro_esq_w
      ) {
        case "1":
          texto2 = "CASI SIEMPRE";
          break;
        case "2":
          texto2 = "A VECES";
          break;
        case "3":
          texto2 = "NUNCA";
          dato_w = parseInt(dato_w) + 1;
          break;
        default:
          texto2 = "";
          break;
      }

      if (dato_w >= 2) {
        dato_w = 1;
        subtotal4_w = parseInt(subtotal4_w) + 1;
      } else {
        dato_w = 0;
      }

      // parte final

      var total_w =
        parseInt(subtotal1_w) +
        parseInt(subtotal2_w) +
        parseInt(subtotal3_w) +
        parseInt(subtotal4_w);

      hc_01.descrip.subtotal1 = subtotal1_w;
      hc_01.descrip.subtotal2 = subtotal2_w;
      hc_01.descrip.subtotal3 = subtotal3_w;
      hc_01.descrip.subtotal4 = subtotal4_w;
      hc_01.descrip.total = total_w;
    },

    _AceptarVentanaTotal() {
      let hc_01 = this;
      hc_01.modal_total = false;
      hc_01._grabarHc_pag4E();
    },

    _grabarHc_pag4E() {
      loader("show");
      let hc_01 = this,
        datos = _getObjetoHc(hc_01.form);

      postData(datos, get_url("APP/HICLIN/SAVE_HC.DLL"))
        .then((data) => {
          hc_01._grabarDetalles_pag4E_hc_01();
        })
        .catch((ee) => {
          loader("hide");
          console.log(error, "ERROR");
          _regresar_menuhis();
        });
    },

    async _grabarDetalles_pag4E_hc_01() {
      let hc_01 = this;
      console.log("LLEGA A GRABAR");

      // var datos = _getObjetoSaveHc(this.hcprc, filtroArray.tablasHC)

      // postData(datos, get_url("APP/HICLIN/SAVE_HC_2.DLL"))
      //   .then((data) => {
      //     console.log(data, 'GUARDA')
      //   })
      //   .catch((error) => {
      //     console.log(error, 'ERROR')
      //   });

      let detalles = {
        4040: _getObjetoSaveHc(hc_01.dato_4040, filtroArray.tabla4040),
      };

      grabarDetalles(detalles, hc_01.form.llave);
      hc_01._llenarDatosPag5();
    },

    _llenarDatosPag5() {
      this.validarPeso();
      loader("hide");
    },
    validarPeso() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_peso_hc_01",
          orden: "1",
        },
        () => {
          if (this.paciente.SEXO == "M") {
            this._validarSAgo();
          } else {
            this._validarSGine();
          }
        },
        () => {
          hc_01
            ._onValidarPeso()
            .then((data) => {
              hc_01.form.signos.peso = hc_01.formatNumero(data);
              hc_01.validarTalla();
            })
            .catch((err) => {
              console.log(err);
              hc_01.form.signos.peso = "";
              hc_01.validarPeso();
            });
        }
      );
    },

    _onValidarPeso() {
      let hc_01 = this,
        codigo = false,
        retorno = true,
        unidad = parseFloat(this.form.signos.und_peso) || 1,
        peso = parseFloat(this.form.signos.peso) || 0,
        consult_atiende = ["1", "5", "7", "8", "A", "H", "I", "O"].find((e) => {
          e == this.profesional.ATIENDE_PROF;
        });

      peso = peso == 0 ? 1 : peso;

      return new Promise((resolve, reject) => {
        if (unidad == 1 && peso < 2.5) {
          retorno = false;
          codigo = "03";
        }

        if (
          hc_01.usuar.NIT == 800037021 &&
          hc_01.profesional.ATIENDE_PROF == 1 &&
          peso == 0
        ) {
          retorno = false;
          codigo = "02";
        }

        if (!consult_atiende) {
          if (peso == 0 && hc_01.form.serv > 01) {
            retorno = false;
            codigo = "02";
          }
        }

        if (!retorno) {
          plantillaError(codigo, codigo, "HC-01", () => {
            reject();
          });
        } else {
          if (codigo) {
            plantillaToast("", codigo, null, "warning", "");
          }
          resolve(peso.toString());
        }
      });
    },

    validarTalla() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_talla_hc_01",
          orden: "1",
        },
        hc_01.validarPeso,
        () => {
          var peso = hc_01.form.signos.peso;
          var talla = hc_01.formatNumero(hc_01.form.signos.talla);

          if (talla == 0 && peso > 0) {
            plantillaError("02", "02", "HC-01", () => {
              hc_01.form.signos.talla = "";
              hc_01.validarTalla();
            });
          } else if (talla > 230) {
            plantillaError("03", "03", "HC-01", () => {
              hc_01.form.signos.talla = "";
              hc_01.validarTalla();
            });
          } else {
            hc_01.form.signos.talla = talla;
            hc_01._calcularindices();
          }
        }
      );
    },
    _calcularindices() {
      var peso = this.form.signos.peso,
        talla = this.form.signos.talla,
        imc = 0,
        sup_cop = 0,
        resultado = 0,
        resultadop = 0;

      if (!peso == 0 || !talla == 0) {
        resultado = parseInt(talla) / 100;
        resultadop = Math.pow(resultado, 2);

        imc = parseInt(peso) / resultadop;
        this.form.signos.imc = this.formatNumero(imc);

        sup_cop = (parseInt(peso) + parseInt(talla) - 60) / 100;
        this.form.signos.sup = this.formatNumero(sup_cop);

        if (imc >= 30) {
          plantillaToast("", "BC", null, "warning", "");
        } else if (imc >= 25) {
          plantillaToast("", "BB", null, "warning", "");
        } else if (imc < 18.5) {
          plantillaToast("", "H2", null, "warning", "");
        } else if (imc < 25) {
          plantillaToast("", "H1", null, "success", "");
        }
        this.validarTemp();
      }
    },

    validarTemp() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_temp_hc_01",
          orden: "1",
        },
        hc_01.validarTalla,
        () => {
          hc_01
            ._onValidarTemp()
            .then((data) => {
              hc_01.form.signos.temp = hc_01.formatNumero(data);
              hc_01.validarFcard();
            })
            .catch((err) => {
              console.log(err);
              hc_01.form.signos.temp = "";
              hc_01.validarTemp();
            });
        }
      );
    },
    _onValidarTemp() {
      let hc_01 = this,
        retorno = true,
        codigo = false,
        temp = parseFloat(this.form.signos.temp) || 0,
        peso = parseFloat(this.form.signos.peso) || 0,
        consult_atiende = ["1", "5", "7", "8", "A", "H", "I", "O"].find((e) => {
          e == this.profesional.ATIENDE_PROF;
        });

      return new Promise((resolve, reject) => {
        if (hc_01.form.serv > 02 && temp == 0) {
          retorno = false;
          codigo = "02";
        }

        if (
          hc_01.usuar.NIT == 800037021 &&
          hc_01.profesional.ATIENDE_PROF == 1 &&
          temp == 0
        ) {
          retorno = false;
          codigo = "02";
        }

        if (
          temp == 0 &&
          hc_01.form.serv == 02 &&
          hc_01.usuar.NIT == 800037021
        ) {
          retorno = false;
          codigo = "02";
        }

        if (!consult_atiende) {
          if (temp == 0 && peso > 0) {
            retorno = false;
            codigo = "02";
          }
        }

        if ((temp > 0 && temp < 35.5) || temp > 38) {
          codigo = "BM";
        }

        if (temp > 45) {
          retorno = false;
          codigo = "03";
        }

        if (!retorno) {
          plantillaError(codigo, codigo, "HC-01", () => {
            reject();
          });
        } else {
          if (codigo) {
            plantillaToast("", codigo, null, "warning", "");
          }
          resolve(temp.toString());
        }
      });
    },

    validarFcard() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_fcard_hc_01",
          orden: "1",
        },
        hc_01.validarTemp,
        () => {
          hc_01
            ._onValidarFcard()
            .then((data) => {
              hc_01.form.signos.fcard = data;
              hc_01.validarFresp();
            })
            .catch((err) => {
              console.log(err);
              hc_01.form.signos.fcard = "";
              hc_01.validarFcard();
            });
        }
      );
    },

    _onValidarFcard() {
      let hc_01 = this,
        retorno = true,
        codigo = false,
        edad = calcular_edad(this.paciente.NACIM),
        peso = parseFloat(this.form.signos.peso) || 0,
        fcard = parseFloat(hc_01.form.signos.fcard) || 0,
        consult_atiende = ["1", "5", "7", "8", "A", "H", "I", "O"].find((e) => {
          e == this.profesional.ATIENDE_PROF;
        });

      return new Promise((resolve, reject) => {
        if (
          fcard == 0 &&
          hc_01.form.serv == 02 &&
          hc_01.usuar.NIT == 800037021
        ) {
          retorno = false;
          codigo = "02";
        }

        if (
          hc_01.usuar.NIT == 800037021 &&
          hc_01.profesional.ATIENDE_PROF == 1 &&
          fcard == 0
        ) {
          retorno = false;
          codigo = "02";
        }

        if (!consult_atiende) {
          if (fcard == 0 && peso > 0) {
            retorno = false;
            codigo = "02";
          }
        }

        switch (edad.unid_edad) {
          case "D":
            if (fcard < 100 || fcard > 150) {
              codigo = "BK";
            }
            break;
          case "M":
            if (fcard < 80 || fcard > 120) {
              codigo = "BK";
            }
            break;
          case "A":
            if (edad.vlr_edad > 10) {
              if (fcard < 60 || fcard > 100) {
                codigo = "BK";
              }
            } else {
              if (fcard < 70 || fcard > 120) {
                codigo = "BK";
              }
            }
            break;
        }

        if (fcard > 200) {
          retorno = false;
          codigo = "03";
        }

        if (!retorno) {
          plantillaError(codigo, codigo, "HC-01", () => {
            reject();
          });
        } else {
          if (codigo) {
            plantillaToast("", codigo, null, "warning", "");
          }
          resolve(fcard.toString());
        }
      });
    },
    validarFresp() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_resp_hc_01",
          orden: "1",
        },
        hc_01.validarFcard,
        () => {
          hc_01
            ._onValidarFResp()
            .then((data) => {
              hc_01.form.signos.fresp = data;
              hc_01.validarTens1();
            })
            .catch((err) => {
              console.log(err);
              hc_01.form.signos.fresp = "";
              hc_01.validarFresp();
            });
        }
      );
    },

    _onValidarFResp() {
      let hc_01 = this,
        retorno = true,
        codigo = false,
        edad = calcular_edad(this.paciente.NACIM),
        peso = parseFloat(this.form.signos.peso) || 0,
        fresp = parseFloat(hc_01.form.signos.fresp) || 0,
        consult_atiende = ["1", "5", "7", "8", "A", "H", "I", "O"].find((e) => {
          e == this.profesional.ATIENDE_PROF;
        });

      return new Promise((resolve, reject) => {
        if (
          fresp == 0 &&
          hc_01.form.serv == 02 &&
          hc_01.usuar.NIT == 800037021
        ) {
          retorno = false;
          codigo = "02";
        }

        if (
          hc_01.usuar.NIT == 800037021 &&
          hc_01.profesional.ATIENDE_PROF == 1 &&
          fresp == 0
        ) {
          retorno = false;
          codigo = "02";
        }

        if (!consult_atiende) {
          if (fresp == 0 && peso > 0) {
            retorno = false;
            codigo = "02";
          }
        }

        switch (edad.unid_edad) {
          case "D":
            if (fresp < 30 || fresp > 80) {
              codigo = "BL";
            }
            break;
          case "M":
            if (fresp < 20 || fresp > 40) {
              codigo = "BL";
            }
            break;
          case "A":
            if (edad.vlr_edad > 8) {
              if (fresp < 15 || fresp > 20) {
                codigo = "BL";
              }
            } else {
              if (fresp < 20 || fresp > 30) {
                codigo = "BL";
              }
            }
            break;
        }

        if (fresp > 100) {
          retorno = false;
          codigo = "03";
        }

        if (!retorno) {
          plantillaError(codigo, codigo, "HC-01", () => {
            reject();
          });
        } else {
          if (codigo) {
            plantillaToast("", codigo, null, "warning", "");
          }
          resolve(fresp.toString());
        }
      });
    },

    validarTens1() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_tens1_hc_01",
          orden: "1",
        },
        hc_01.validarFresp,
        () => {
          hc_01
            ._onValidarTens1()
            .then((data) => {
              hc_01.form.signos.tens1 = data;
              hc_01.validarTens2();
            })
            .catch((err) => {
              console.log(err);
              hc_01.form.signos.tens1 = "";
              hc_01.validarTens1();
            });
        }
      );
    },

    _onValidarTens1() {
      let hc_01 = this,
        retorno = true,
        codigo = false,
        peso = parseFloat(this.form.signos.peso) || 0,
        tens1 = parseFloat(this.form.signos.tens1) || 0,
        consult_atiende = ["1", "5", "7", "8", "A", "H", "I", "O"].find((e) => {
          e == this.profesional.ATIENDE_PROF;
        });

      return new Promise((resolve, reject) => {
        if (
          tens1 == 0 &&
          hc_01.form.serv == 02 &&
          hc_01.usuar.NIT == 800037021
        ) {
          retorno = false;
          codigo = "02";
        }

        if (
          hc_01.usuar.NIT == 800037021 &&
          hc_01.profesional.ATIENDE_PROF == 1 &&
          tens1 == 0
        ) {
          retorno = false;
          codigo = "02";
        }

        if (!consult_atiende) {
          if (tens1 == 0 && peso > 0) {
            retorno = false;
            codigo = "02";
          }
        }

        if (tens1 > 300) {
          retorno = false;
          codigo = "03";
        }

        if (!retorno) {
          plantillaError(codigo, codigo, "HC-01", () => {
            reject();
          });
        } else {
          if (codigo) {
            plantillaToast("", codigo, null, "warning", "");
          }
          resolve(tens1.toString());
        }
      });
    },

    validarTens2() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_tens2_hc_01",
          orden: "1",
        },
        hc_01.validarTens1,
        () => {
          hc_01
            ._onValidarTens2()
            .then((data) => {
              hc_01.form.signos.tens2 = data;
              hc_01.validarPvc();
            })
            .catch((err) => {
              hc_01.form.signos.tens2 = "";
              hc_01.validarTens2();
            });
        }
      );
    },

    _onValidarTens2() {
      let hc_01 = this,
        retorno = true,
        codigo = false,
        tens1 = parseFloat(this.form.signos.tens1) || 0,
        tens2 = parseFloat(this.form.signos.tens2) || 0;

      return new Promise((resolve, reject) => {
        if (tens1 > 0 && tens2 == 0) {
          retorno = false;
          codigo = "02";
        }

        if (
          hc_01.usuar.NIT == 800037021 &&
          hc_01.profesional.ATIENDE_PROF == 1 &&
          tens2 == 0
        ) {
          retorno = false;
          codigo = "02";
        }

        if (tens2 > 300) {
          retorno = false;
          codigo = "03";
        }

        if (!retorno) {
          plantillaError(codigo, codigo, "HC-01", () => {
            reject();
          });
        } else {
          if (codigo) {
            plantillaToast("", codigo, null, "warning", "");
          }
          let tens_media = (parseInt(tens1) + parseInt(tens2) * 2) / 3;
          hc_01.form.signos.tens_m = hc_01.formatNumero(tens_media);
          resolve(tens2.toString());
        }
      });
    },

    validarPvc() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_pvc_hc_01",
          orden: "1",
        },
        hc_01.validarTens2,
        hc_01._validarResOcular
      );
    },
    _validarResOcular() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("resp_ocular"),
          titulo: "Respuesta ocular",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: hc_01.form.signos.aper_ocul,
          callback_f: hc_01.validarPvc,
        },
        (data) => {
          hc_01.form.signos.aper_ocul = data.COD;
          hc_01._validarRespVerbal();
        }
      );
    },
    _validarRespVerbal() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("resp_verbal"),
          titulo: "Respuesta verbal",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: hc_01.form.signos.resp_verb,
          callback_f: hc_01._validarResOcular,
        },
        (data) => {
          hc_01.form.signos.resp_verb = data.COD;
          hc_01._validarRespMotora();
        }
      );
    },

    _validarRespMotora() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("resp_motora"),
          titulo: "Respuesta motora",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: hc_01.form.signos.resp_moto,
          callback_f: hc_01._validarRespVerbal,
        },
        (data) => {
          hc_01.form.signos.resp_moto = data.COD;
          hc_01._validarPerTor();
        }
      );
    },

    _validarPerTor() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_per_tor",
          orden: "1",
        },
        hc_01.validarPvc,
        hc_01._validarPerAbdo
      );
    },
    _validarPerAbdo() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_per_abdo",
          orden: "1",
        },
        hc_01._validarPerTor,
        () => {
          let serv = hc_01.form.serv;

          if (serv == 01) {
            hc_01._validarOximetria();
          } else {
            let abdo = hc_01.form.signos.per_abdo;

            if (abdo == 0 || abdo > 300) {
              plantillaToast("03", "03", null, "warning", "");
              hc_01.form.signos.per_abdo = "";
              hc_01._validarPerAbdo();
            } else hc_01._validarOximetria();
          }
        }
      );
    },
    _validarOximetria() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_oximetria",
          orden: "1",
        },
        hc_01._validarPerAbdo,
        () => {
          let oximetria = parseFloat(hc_01.form.signos.oximetria);

          if (oximetria > 100) {
            plantillaError("03", "03", "HC-01", () => {
              hc_01.form.signos.oximetria = "";
              hc_01._validarOximetria();
            });
          } else {
            if (
              hc_01.form.edad.unid_edad == "A" &&
              hc_01.form.edad.vlr_edad > 5
            ) {
              hc_01._validarPerBraquial();
            } else hc_01._validarPerCefalico();
          }
        }
      );
    },
    _validarPerCefalico() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_per_cefalico",
          orden: "1",
        },
        hc_01._validarOximetria,
        hc_01._validarPerBraquial
      );
    },
    _validarPerBraquial() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_per_braquial",
          orden: "1",
        },
        () => {
          if (
            hc_01.form.edad.unid_edad == "A" &&
            hc_01.form.edad.vlr_edad > 5
          ) {
            hc_01._validarOximetria();
          } else hc_01._validarPerCefalico();
        },
        hc_01._validarPerMuñeca
      );
    },
    _validarPerMuñeca() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_per_muneca",
          orden: "1",
        },
        hc_01._validarPerBraquial,
        () => {
          if (hc_01.usuar.NIT == 900541158) {
            hc_01.validarExamenHc();
          } else {
            if (!hc_01.sw_var.agudeza) hc_01.validarExamenHc();
            else {
              setTimeout(hc_01.LlamarHC890G, 500);
            }
          }
        }
      );
    },

    // ventanaEstructOcularesIO() {
    //   let hc_01 = this;
    //   let selecion = hc_01.form.examen_visual.estructuras_oculares_oi;

    //   POPUP(
    //     {
    //       array: _tipoJsonHc("estructurasOculares"),
    //       titulo: "ESTRUCTURAS OCULARES OJO IZQUIERDO",
    //       indices: [{ id: "COD", label: "DESCRIP" }],
    //       seleccion: selecion,
    //       callback_f: () => {
    //         setTimeout(() => {
    //           hc_01._validarPerMuñeca();
    //         }, 300);
    //       },
    //     },
    //     (data) => {
    //       hc_01.form.examen_visual.estructuras_oculares_oi = data.COD;
    //       setTimeout(hc_01.validarOjoIzquierdo, 250);
    //     }
    //   );
    // },
    // validarOjoIzquierdo() {
    //   let hc_01 = this;
    //   validarInputs(
    //     {
    //       form: "#fase_ojoIzquierdo_hc_01",
    //       orden: "1",
    //     },
    //     hc_01.ventanaEstructOcularesIO,
    //     hc_01.ventanaEstructOcularesOD
    //   );
    // },

    // ventanaEstructOcularesOD() {
    //   let hc_01 = this;
    //   let selecion = hc_01.form.examen_visual.estructuras_oculares_od;

    //   POPUP(
    //     {
    //       array: _tipoJsonHc("estructurasOculares"),
    //       titulo: "ESTRUCTURAS OCULARES OJO DERECHO",
    //       indices: [{ id: "COD", label: "DESCRIP" }],
    //       seleccion: selecion,
    //       callback_f: () => {
    //         setTimeout(hc_01.validarOjoIzquierdo, 300);
    //       },
    //     },
    //     (data) => {
    //       hc_01.form.examen_visual.estructuras_oculares_od = data.COD;
    //       setTimeout(hc_01.validarOjoDerecho, 250);
    //     }
    //   );
    // },

    // validarOjoDerecho() {
    //   let hc_01 = this;
    //   validarInputs(
    //     {
    //       form: "#fase_ojoDerecho_hc_01",
    //       orden: "1",
    //     },
    //     hc_01.ventanaEstructOcularesOD,
    //     hc_01.validarExamenHc
    //   );
    // },

    // validarComplementoVisual() {
    //   if ((this.hcprc.serv == '08' || this.hcprc.serv == '02') && $_REG_PROF.ATIENDE_PROF == '2') {
    //     // llama agudeza visual
    //     this.LlamarHC890G();
    //   } else {
    //     this.DatoAspectoGeneral();
    //   }
    // },

    escHC890G() {
      this.params_hc890g.estado = false;
      this._validarPerMuñeca();
    },

    LlamarHC890G() {
      //Agudeza visual
      scrollProsoft("fase_examen_hc_01", "smooth", "start");
      this.params_hc890g.estado = true;
    },

    evaluarSalidaHC890G(agudeza) {
      this.params_hc890g.estado = false;
      var examen_visual = agudeza;

      console.log(examen_visual);

      this.form.examen_visual.agudeza_visual_od_1 = examen_visual.agudeza_visual_od_1;
      this.form.examen_visual.agudeza_visual_od_2 = examen_visual.agudeza_visual_od_2;
      this.form.examen_visual.agudeza_visual_oi_1 = examen_visual.agudeza_visual_oi_1;
      this.form.examen_visual.agudeza_visual_oi_2 = examen_visual.agudeza_visual_oi_2;
      this.form.examen_visual.distancia_agud = examen_visual.distancia_agud;
      this.form.examen_visual.estructuras_oculares_od = examen_visual.estructuras_oculares_od;
      this.form.examen_visual.estructuras_oculares_oi = examen_visual.estructuras_oculares_oi;

      this.validarExamenHc();
    },

    validarExamenHc() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_examen_hc_01",
          orden: "1",
        },
        () => {
          if (!hc_01.sw_var.agudeza) hc_01._validarPerMuñeca();
          else hc_01.validarOjoDerecho();
        },
        hc_01.validarPag_05
      );
    },

    validarPag_05() {
      let hc_01 = this;
      var datos = _getObjetoHc(hc_01.form);

      hc_01.form.signos.und_peso = 1;

      loader("show");

      hc_01.modificarArrayDetalle("4005", hc_01.form_deta.examen).then(() => {
        postData(datos, get_url("APP/HICLIN/SAVE_HC.DLL"))
          .then((data) => {
            hc_01._grabarDetalles_pag5();
          })
          .catch((err) => {
            loader("hide");
            hc_01.validarExamenHc();
          });
      });
    },

    _grabarDetalles_pag5() {
      let hc_01 = this;
      let filtro = ["2002", "2070", "3010", "9012"];

      let detalles = hc_01.hc_detalles.filter(
        (e) => e["LLAVE-HC"] == hc_01.form.llave && !filtro.includes(e["COD-DETHC"])
      );

      var datos = _getObjetoHcDetal(detalles, hc_01.form.llave);

      postData(datos, get_url("APP/HICLIN/SAVE_DETALLE.DLL"))
        .then(hc_01._llenarDatosPag8)
        .catch((err) => {
          loader("hide");
          hc_01.validarExamenHc();
        });
    },

    _llenarDatosPag8() {
      loader("hide");
      this._validarDiagnosticos();
    },

    _validarDiagnosticos() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_diagnosticos_hc_01",
          orden: "1",
          event_f3: () => {
            let length = hc_01.form.rips.tabla_diagn.length;
            if (length > 0) hc_01._evaluarPacienteConfirmado();
            else {
              plantillaToast("", "02", null, "warning", "");
              hc_01._validarDiagnosticos();
            }
          },
        },
        hc_01.validarExamenHc,
        hc_01._addItemDiagn
      );
    },

    _deleteItemDiagn(element) {
      let cod = element.srcElement.value;
      if (element.srcElement.checked) {
        CON851P(
          "Desea eliminar el item ?",
          () => {
            element.srcElement.checked = false;
            this.$refs.cod_diagn.focus();
          },
          () => {
            element.srcElement.checked = false;

            let filter = this.form.rips.tabla_diagn.filter(
              (e) => e.cod_diagn != cod
            );

            this.form.rips.tabla_diagn = JSON.parse(JSON.stringify(filter));

            this.form.rips.tabla_diagn.map((a, b) => {
              a.nro = b + 1;
              return a;
            });

            this.$refs.cod_diagn.focus();
          }
        );
      } else element.srcElement.checked = false;
    },
    _addItemDiagn() {
      let data = this._validarCodDiag();
      if (data.error != "00") {
        plantillaError("", data.error, "HC-01", () => {
          this.cod_diagn = "";
          setTimeout(this._validarDiagnosticos, 150);
        });
      } else {
        let cod_diag = this.cod_diagn || "";
        var verificar = this.form.rips.tabla_diagn.find(
          (e) => e.cod_diagn == cod_diag.toUpperCase()
        );

        let length = this.form.rips.tabla_diagn.length + 1;

        if (length > 10) {
          plantillaError("", "Tabla en su limite!", "HC-01", () => {
            this.cod_diagn = "";
            setTimeout(this._validarDiagnosticos, 150);
          });
        } else {
          if (!verificar) {
            this.form.rips.tabla_diagn.push({
              nro: length,
              cod_diagn: data.item.COD_ENF,
            });

            this.cod_diagn = "";
            this._validarDiagnosticos();
          } else {
            plantillaToast("", "05", null, "warning", "");
            this.cod_diagn = "";
            this._validarDiagnosticos();
          }
        }
      }
    },
    _validarCodDiag() {
      let nit = this.usuar.NIT,
        serv = this.form.serv,
        retornar = { item: false, error: "00" },
        cod_diag = this.cod_diagn.toUpperCase() || "";

      let consulta = this.enfermedades.find((e) => e.COD_ENF == cod_diag);

      let length = this.form.rips.tabla_diagn.length + 1;

      if (consulta) {
        retornar.item = consulta;
        if (consulta.HUERFA_ENF.trim() == "S") {
          plantillaToast("G3", "G3", "", "warning", "");
        }

        if (length == 1) {
          if (serv == 08) {
            if (
              cod_diag.substr(0, 1) == "Z" ||
              cod_diag.substr(0, 2) == "E1" ||
              cod_diag == "I10X" ||
              cod_diag == "I151" ||
              cod_diag == "I158" ||
              cod_diag == "I159" ||
              cod_diag == "O16X" ||
              cod_diag == "E782" ||
              cod_diag == "E784" ||
              cod_diag == "E785" ||
              cod_diag == "E119"
            ) {
              retornar.item = consulta;
            } else {
              retornar.error = "G0";
            }
          }

          if (nit == 800037021) {
            if (
              (cod_diag.substr(0, 1) == "Z" && serv == 01) ||
              cod_diag.substr(0, 1) == "R"
            ) {
              retornar.error = "03";
            }
          }

          if (nit == 800037021) {
            if (cod_diag != "Z539" && this.profesional.ATIENDE_PROF != "1") {
              if (cod_diag.substr(0, 1) == "Z" && serv == 02) {
                retornar.error = "03";
              }
            }
          }

          if (nit == 800037979 || nit == 900077520) {
            if (cod_diag.substr(0, 1) == "Z" && (serv == 01 || serv == 02)) {
              retornar.error = "03";
            }
          }

          // ese de granada

          if (
            nit == 900005594 ||
            nit == 845000038 ||
            nit == 900004059 ||
            nit == 822001570 ||
            nit == 800037979 ||
            nit == 892000458 ||
            nit == 900077520 ||
            (nit == 900306771 && (serv == 01 || serv == 02 || serv == 03))
          ) {
            if (cod_diag.substr(0, 1) == "Z") {
              if (cod_diag != "Z000" && cod_diag != "Z519") {
                retornar.error = "03";
              }
            }
          }

          if (![02, 03, 06, 08, 63, 65].find((e) => e == serv)) {
            let espejo_diagnosticos = [
              "Z000",
              "Z001",
              "Z002",
              "Z003",
              "Z006",
              "Z021",
              "Z022",
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
            if (espejo_diagnosticos.find((e) => e == cod_diag)) {
              retornar.error = "G1";
            }
          }

          if (
            consulta.SEXO_ENF.trim() != "" &&
            consulta.SEXO_ENF.trim() != this.paciente.SEXO
          ) {
            retornar.error = "73";
          }

          let edad_paci = this._editarEdad(this.form.edad.unid_edad, "");
          let vlr_edad = this.form.edad.vlr_edad;
          edad_paci = `${edad_paci}${vlr_edad.toString().padStart(3, "0")}`;
          let vlr_unidad = this._editarEdad(consulta.UNID_EDAD_ENF, "");
          let edad_max_enf = `${vlr_unidad}${consulta.EDAD_MAX_ENF}`;
          let edad_min_enf = `${vlr_unidad}${consulta.EDAD_MIN_ENF}`;

          if (
            parseFloat(consulta.EDAD_MIN_ENF) > 0 &&
            parseFloat(edad_paci) < parseFloat(edad_min_enf)
          ) {
            retornar.error = "74";
          }

          if (
            parseFloat(consulta.EDAD_MAX_ENF) > 0 &&
            parseFloat(edad_paci) > parseFloat(edad_max_enf)
          ) {
            retornar.error = "74";
          }
        }
      } else {
        retornar.error = "01";
      }
      return retornar;
    },
    _editarEdad(unidad, vlr) {
      switch (unidad) {
        case "D":
          unidad = "1";
          break;
        case "M":
          unidad = "2";
          break;
        case "A":
          unidad = "3";
          break;
        default:
          unidad = "0";
          break;
      }
      return `${unidad}${vlr}`;
    },
    _evaluarPacienteConfirmado() {
      let consulta = this.form.rips.tabla_diagn.find((e) => e.cod_diagn == "U071");
      let serv = this.form.serv;
      if (consulta) {
        if (
          (this.usuar.NIT == 900541158 || this.usuar.NIT == 900405505) &&
          serv == 09
        ) {
          this._initPacienteConfimado();
          this._evaluarImprimirCovid19();
        } else if (
          serv == 01 ||
          serv == 02 ||
          serv == 08 ||
          serv == 09 ||
          serv == 63
        ) {
          //  init ventana covid
          this.params_hc890h.pregunta = 4;
          this.params_hc890h.estado = true;
        } else {
          this._initPacienteConfimado();
          this._evaluarImprimirCovid19();
        }
      } else {
        this._initPacienteConfimado();
        this._evaluarImprimirCovid19();
      }
    },
    _initPacienteConfimado() {
      this.form.covid19.paci_confirmado = _tipoJsonHc(
        "covid19"
      ).paci_confirmado;
    },
    _evaluarImprimirCovid19() {
      let consulta = this._validarDiagnRecomendacionCovid();
      let serv = this.form.serv;
      if (consulta) {
        this.form.covid19.recomendacion_covid19 = "S";
        this._datoAcompañanteCovid19();
      } else {
        if (
          (this.usuar.NIT == 900541158 || this.usuar.NIT == 900405505) &&
          serv == 09
        ) {
          this.form.covid19.recomendacion_covid19 = "N";
          this.form.covid19.consenti_acomp_covid19 = "N";
          this._vetanaSintomaticoRespiratorio();
        } else if (
          serv == 01 ||
          serv == 02 ||
          serv == 08 ||
          serv == 09 ||
          serv == 63
        ) {
          this.params_hc890h.pregunta = 2;
          this.params_hc890h.estado = true;
        } else {
          this.form.covid19.recomendacion_covid19 = "N";
          this.form.covid19.consenti_acomp_covid19 = "N";
          this._vetanaSintomaticoRespiratorio();
        }
      }
    },
    _datoAcompañanteCovid19() {
      let consulta = this._validarDiagnAcompañanteCovid();
      let serv = this.form.serv;
      if (consulta) {
        if (
          (this.usuar.NIT == 900541158 || this.usuar.NIT == 900405505) &&
          serv == 09
        ) {
          this._inicializarAcompañanteCovid();
          this._vetanaSintomaticoRespiratorio();
        } else if (
          serv == 01 ||
          serv == 02 ||
          serv == 08 ||
          serv == 09 ||
          serv == 63
        ) {
          this.params_hc890h.pregunta = 3;
          this.params_hc890h.estado = true;
        } else {
          this._inicializarAcompañanteCovid();
          this._vetanaSintomaticoRespiratorio();
        }
      } else {
        this._inicializarAcompañanteCovid();
        this._vetanaSintomaticoRespiratorio();
      }
    },
    _inicializarAcompañanteCovid() {
      this.form.covid19.acompanante_covid19 = _tipoJsonHc(
        "covid19"
      ).acompanante_covid19;
      this.form.covid19.consenti_acomp_covid19 = "N";
    },
    _vetanaSintomaticoRespiratorio() {
      if (this.sw_var.sintomatico) {
        this.params_hc890d.estado = true;
        this.params_hc890d.unserv = this.form.cierre.unserv;
        this.params_hc890d.finalidad = this.form.rips.finalidad;
        this.params_hc890d.sexo = this.paciente.SEXO;
      } else {
        this._validar_barthel()
      }
    },

    _validar_barthel() {
      let nit = this.usuar.NIT;
      if ([900541158, 900565371, 900405505].includes(nit)
        && this.form.cierre.unserv == 09) {
        this._initBarthel();
      } else {
        this.validarFindrisk()
      }
    },

    _validarEsc_barthel() {
      this.params_hc890b.estado = false
      this._validarDiagnosticos();
    },

    _initBarthel() {
      this.params_hc890b.enabled = true
      this.params_hc890b.estado = true

      scrollProsoft("div_barthel", "smooth", "start");
    },

    _validarEsc_karnosky() {
      this.params_hc890c.estado = false;
      this._validarDiagnosticos();
    },

    _validarkarnosky() {
      let nit = this.usuar.NIT;
      if ([900541158, 900405505].includes(nit)
        && this.form.cierre.unserv == 09) {
        this.params_hc890b.estado = false;
        this.params_hc890c.enabled = true
        this.params_hc890c.estado = true

        scrollProsoft("div_karnosky", "smooth", "start");
      } else {
        this.validarDependFuncional()
      }
    },

    validarDependFuncional() {
      let nit = this.usuar.NIT;
      if ([900541158, 900405505].includes(nit)
        && this.form.cierre.unserv == 09) {
        scrollProsoft("datoNivelSecuelas", "smooth", "start");

        let busqDetalle_9005 = this.hc_detalles.find(
          (el) => el["COD-DETHC"] == "9005" && el["LLAVE-HC"] == $_REG_HC.llave_hc
        );
        if (busqDetalle_9005) {
          this.dato_9005 = busqDetalle_9005.DETALLE;
          this.descrip.tabla_actividades_9005 = this.dato_9005.tabla_actividades_9005.replace(/(?:\&)/g, "\n");
        }

        this.mostrarDependFuncional = true
        this.dato_NivelSecuelas();
      } else {
        this.validarFindrisk()
      }
    },

    dato_NivelSecuelas() {
      validarInputs(
        {
          form: "#datoNivelSecuelas",
        },
        () => {
          this.mostrarDependFuncional = false;
          this._validarDiagnosticos();
        },
        () => {
          this.dato_9005.nivel_secuelas_9005 = this.dato_9005.nivel_secuelas_9005.toUpperCase().replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "");
          this.dato_controlActividades()
        }
      );
    },

    dato_controlActividades() {
      validarInputs(
        {
          form: "#datoActividades",
        },
        () => {
          this.dato_NivelSecuelas();
        },
        () => {
          this.descrip.tabla_actividades_9005 = this.descrip.tabla_actividades_9005.toUpperCase().replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "");
          this.dato_9005.tabla_actividades_9005 = this.descrip.tabla_actividades_9005.replace(/(\r\n|\n|\r)/gm, "&");
          this.dato_dependFuncional()
        }
      );
    },

    dato_dependFuncional() {
      validarInputs(
        {
          form: "#datoDependFuncional",
        },
        () => {
          this.dato_controlActividades();
        },
        () => {
          this.dato_9005.depen_funcional_9005 = this.dato_9005.depen_funcional_9005.toUpperCase().replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "");
          this.grabarDetalle_9005()
        }
      );
    },

    async grabarDetalle_9005() {
      loader("show");
      let detalle = {
        9005: _getObjetoSaveHc(this.dato_9005),
      };

      grabarDetalles(detalle, $_REG_HC.llave_hc)
        .then(() => {
          loader("hide");
          CON851("", "Dependencia funcional grabado con exito!", null, "success", "Exito");
          this.validarFindrisk();
        })
        .catch((error) => {
          console.log(error)
          loader("hide");
          CON851("", "Error grabando dependencia funcional", null, "error", "Error");
          this.validarFindrisk();
        });
    },

    validarFindrisk() {
      let nit = this.usuar.NIT;
      if ([900541158, 900405505].includes(nit)
        && this.form.cierre.unserv == '09') {
        this._validarVentanaHeridasEvaluar();
      } else if (
        (this.form.edad.unid_edad == 'A' && this.form.edad.vlr_edad > 17) &&
        (this.form.cierre.unserv == '08' || this.form.cierre.unserv == '02') &&
        (this.profesional.ATIENDE_PROF == '2' || this.profesional.ATIENDE_PROF == '6')
      ) {
        this.ventanaFindrisk();
      } else {
        this._validarVentanaHeridasEvaluar();
      }
    },

    ventanaFindrisk() {
      // this.mostrarFindrisk = true;
      setTimeout(() => {
        this.params_findrisk.estado = true;
      }, 300);
    },

    validarEsc_findrisk() {
      // this.mostrarFindrisk = false;
      this.params_findrisk.estado = false;
      this._validarDiagnosticos();
    },

    validarCallback_findrisk(data) {
      // this.mostrarFindrisk = false
      this.params_findrisk.estado = false
      this.form.requiere_findrisk = data.requiere_findrisk;
      this._validarVentanaHeridasEvaluar();
    },

    _validarVentanaHeridasEvaluar() {
      if (this.form.cierre.unserv == '09') {
        this._ventanaHeridasEvaluar();
      } else {
        this._validarVentanaCreatinina();
      }
    },

    _ventanaHeridasEvaluar() {
      this.ventanaHeridasPaq = true;
      this.descrip.evaluarHeridas.trim() == "" ? this.descrip.evaluarHeridas = 'S' : false;
      validarInputs(
        {
          form: "#evaluarHeridas",
        },
        () => {
          this.ventanaHeridasPaq = false;
          this._validarDiagnosticos();
        },
        async () => {
          this.descrip.evaluarHeridas = this.descrip.evaluarHeridas.toUpperCase();
          var temp = this.descrip.evaluarHeridas;
          if (temp == "S") {
            this.ventanaHeridasPaq = false;
            this.mostrarHeridas = true;
            this.datoHeridasEvaluar();
          } else if (temp == "N") {
            this.ventanaHeridasPaq = false;
            this.mostrarHeridas = false;
            this._validarVentanaCreatinina();
          } else {
            CON851("03", "03", null, "error", "error");
            this._ventanaHeridasEvaluar();
          }
        }
      );
    },

    datoHeridasEvaluar() {
      scrollProsoft("heridas", "smooth", "center");
      setTimeout(() => {
        this.params_heridas.estado = true;
      }, 300);
    },

    validarEsc_heridas() {
      // this.mostrarFindrisk = false;
      this.params_heridas.estado = false;
      this._validarDiagnosticos();
    },

    validarCallback_heridas(data) {
      // this.mostrarFindrisk = false
      this.params_heridas.estado = false
      this._validarVentanaCreatinina();
    },

    _validarVentanaCreatinina() {
      this.params_hc890c.estado = false;

      let nit = this.usuar.NIT;
      let unserv = this.form.cierre.unserv;
      let finalidad = this.form.rips.finalidad;
      // let cronico = this.paciente.CRONICO;
      let cronico = "S";

      if ([800037021, 900306771].includes(nit)) {
        this._initCreatinina()
      } else {
        if (cronico == "S") {
          if (
            (unserv == 08 &&
              ([10, 11].includes(finalidad) ||
                (nit == 844003225 && [05, 07].includes(finalidad)))) ||
            unserv == 02
          ) {
            this._initCreatinina()
          } else {
            this.ventana_soloCronico();
            // this._validarSifilis();
          }
        } else {
          this.ventana_soloCronico();
          // this._validarSifilis();
        }
      }
    },

    _validarEsc_creatinina() {
      this.params_hc890a.modal = false;
      this._validarDiagnosticos();
    },

    _initCreatinina() {
      let fecha = this.form.fecha;
      let peso = this.form.signos.peso || "";
      let vlr_edad = this.form.edad.vlr_edad.toString() || "";
      let form = { ...this.form };

      let creatinina2 = form.signos.creatinina2;
      let hemo_glicosilada = form.signos.hemo_glicosilada;
      let hemo_glico_fecha = form.signos.hemo_glico_fecha;
      let microalbuminuria = form.signos.microalbuminuria;
      let fecha_microalbuminuria = form.signos.fecha_microalbuminuria;

      let riesgo_cardio = form.signos.riesgo_cardio;
      let rela_albumi_creatini_1 = form.signos.rela_albumi_creatini_1
      let rela_albumi_creatini_2 = form.signos.rela_albumi_creatini_2
      let erc = form.signos.erc;
      let fecha_dx_erc = form.signos.fecha_dx_erc;

      let fecha_creatinina = form.signos.fecha_creatinina || "";
      let estadio_erc = form.signos.estadio_erc || "";

      this.datos_creatinina = {
        fecha: fecha,
        peso: peso,
        edad: vlr_edad,
        unserv: form.cierre.unserv,
        tabla_diagn: form.rips.tabla_diag.map((item) => ({ cod_diagn: item.diagn })),

        creatinina2: creatinina2,
        hemo_glicosilada: hemo_glicosilada,
        hemo_glico_fecha: hemo_glico_fecha,
        microalbuminuria: microalbuminuria,
        fecha_microalbuminuria: fecha_microalbuminuria,
        riesgo_cardio: riesgo_cardio,
        rela_albumi_creatini_1: rela_albumi_creatini_1,
        rela_albumi_creatini_2: rela_albumi_creatini_2,
        erc: erc,
        fecha_dx_erc: fecha_dx_erc,
        fecha_creatinina: fecha_creatinina,
        estadio_erc: estadio_erc,
      };

      this.params_hc890a.modal = true;
    },

    _validarCallback_creatinina(data) {
      console.log('return creatinina: ', data);
      this.form.signos.creatinina2 = data.creatinina2;
      this.form.signos.hemo_glicosilada = data.hemo_glicosilada;
      this.form.signos.hemo_glico_fecha = data.hemo_glico_fecha;
      this.form.signos.microalbuminuria = data.microalbuminuria;
      this.form.signos.fecha_microalbuminuria = data.fecha_microalbuminuria;
      this.form.signos.riesgo_cardio = data.riesgo_cardio;
      this.form.signos.rela_albumi_creatini_1 = data.rela_albumi_creatini_1;
      this.form.signos.rela_albumi_creatini_2 = data.rela_albumi_creatini_2;
      this.form.signos.erc = data.erc;
      this.form.signos.fecha_dx_erc = data.fecha_dx_erc;
      this.form.signos.fecha_creatinina = data.fecha_creatinina;
      this.form.signos.estadio_erc = data.estadio_erc;

      this.params_hc890a.modal = false;
      this.params_hc890a.estado = false;
      this.ventana_soloCronico();
    },

    ventana_soloCronico() {
      // let cronico = this.paciente.CRONICO;
      let cronico = "S";

      if (cronico == "S") {
        this.ventanaPacienteCronico = true;

        this.descrip.ano_diagDm = this.form.datos_cronic_2.fecha_diag_dm.substring(0, 4);
        this.descrip.mes_diagDm = this.form.datos_cronic_2.fecha_diag_dm.substring(4, 6);
        this.descrip.dia_diagDm = this.form.datos_cronic_2.fecha_diag_dm.substring(6, 8);

        this.descrip.ano_diagHta = this.form.datos_cronic_2.fecha_diag_hta.substring(0, 4);
        this.descrip.mes_diagHta = this.form.datos_cronic_2.fecha_diag_hta.substring(4, 6);
        this.descrip.dia_diagHta = this.form.datos_cronic_2.fecha_diag_hta.substring(6, 8);

        this.descrip.ano_ingProg = this.form.datos_cronic_2.fecha_prog_cro.substring(0, 4);
        this.descrip.mes_ingProg = this.form.datos_cronic_2.fecha_prog_cro.substring(4, 6);
        this.descrip.dia_ingProg = this.form.datos_cronic_2.fecha_prog_cro.substring(6, 8);

        switch (this.form.datos_cronic_2.ieca) {
          case '01': this.descrip.descripRecibeIeca = 'SI RECIBE'; break;
          case '02': this.descrip.descripRecibeIeca = 'NO FUE FORMULADO DENTRO DEL PLAN TERAPEUTICO'; break;
          case '03': this.descrip.descripRecibeIeca = 'NO RECIBE, AUNQUE FUE FORMULADO DENTRO DEL PLAN'; break;
          case '98': this.descrip.descripRecibeIeca = 'NO APLICA, PACIENTE CON ERC SIN HTA NI DM'; break;
        }

        switch (this.form.datos_cronic_2.araii) {
          case '01': this.descrip.descripRecibeAraii = 'SI RECIBE'; break;
          case '02': this.descrip.descripRecibeAraii = 'NO FUE FORMULADO DENTRO DEL PLAN TERAPEUTICO'; break;
          case '03': this.descrip.descripRecibeAraii = 'NO RECIBE, AUNQUE FUE FORMULADO DENTRO DEL PLAN'; break;
          case '98': this.descrip.descripRecibeAraii = 'NO APLICA, PACIENTE CON ERC SIN HTA NI DM'; break;
        }

        this.dato_expTabaco();
      } else {
        this._validarMultidrogoresistente()
      }
    },

    dato_expTabaco() {
      this.form.cierre.paciente_cronic.exp_tabaco.trim() == '' ? this.form.cierre.paciente_cronic.exp_tabaco = 'N' : false;
      validarInputs({
        form: '#expTabaco'
      }, () => {
        this._validarDiagnosticos();
        this.ventanaPacienteCronico = false;
      }, () => {
        this.form.cierre.paciente_cronic.exp_tabaco = this.form.cierre.paciente_cronic.exp_tabaco.toUpperCase();
        var temp = this.form.cierre.paciente_cronic.exp_tabaco;
        if (temp == 'S' || temp == 'N') {
          this.dato_fuma();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.dato_expTabaco();
        }
      })
    },

    dato_fuma() {
      this.form.cierre.paciente_cronic.fuma.trim() == '' ? this.form.cierre.paciente_cronic.fuma = 'N' : false;
      validarInputs({
        form: '#fumaActualmente'
      }, () => {
        this.dato_expTabaco();
      }, () => {
        this.form.cierre.paciente_cronic.fuma = this.form.cierre.paciente_cronic.fuma.toUpperCase();
        var temp = this.form.cierre.paciente_cronic.fuma;
        if (temp == 'S' || temp == 'N') {
          this.dato_humoLeña();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.dato_fuma();
        }
      })
    },

    dato_humoLeña() {
      this.form.cierre.paciente_cronic.humo_lena.trim() == '' ? this.form.cierre.paciente_cronic.humo_lena = 'N' : false;
      validarInputs({
        form: '#expoHumoLeña'
      }, () => {
        this.dato_fuma();
      }, () => {
        this.form.cierre.paciente_cronic.humo_lena = this.form.cierre.paciente_cronic.humo_lena.toUpperCase();
        var temp = this.form.cierre.paciente_cronic.humo_lena;
        if (temp == 'S' || temp == 'N') {
          this.dato_alcohol();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.dato_humoLeña();
        }
      })
    },

    dato_alcohol() {
      this.form.cierre.paciente_cronic.alcohol.trim() == '' ? this.form.cierre.paciente_cronic.alcohol = 'N' : false;
      validarInputs({
        form: '#alcohol'
      }, () => {
        this.dato_humoLeña();
      }, () => {
        this.form.cierre.paciente_cronic.alcohol = this.form.cierre.paciente_cronic.alcohol.toUpperCase();
        var temp = this.form.cierre.paciente_cronic.alcohol;
        if (temp == 'S' || temp == 'N') {
          this.dato_sedentarismo();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.dato_alcohol();
        }
      })
    },

    dato_sedentarismo() {
      this.form.cierre.paciente_cronic.sedentarismo.trim() == '' ? this.form.cierre.paciente_cronic.sedentarismo = 'N' : false;
      validarInputs({
        form: '#sedentarismo'
      }, () => {
        this.dato_alcohol();
      }, () => {
        this.form.cierre.paciente_cronic.sedentarismo = this.form.cierre.paciente_cronic.sedentarismo.toUpperCase();
        var temp = this.form.cierre.paciente_cronic.sedentarismo;
        if (temp == 'S' || temp == 'N') {
          this.dato_diagDm();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.dato_sedentarismo();
        }
      })
    },

    dato_diagDm() {
      this.form.datos_cronic_2.diag_dm.trim() == '' ? this.form.datos_cronic_2.diag_dm = 'N' : false;
      validarInputs({
        form: '#diagDm'
      }, () => {
        this.dato_sedentarismo();
      }, () => {
        this.form.datos_cronic_2.diag_dm = this.form.datos_cronic_2.diag_dm.toUpperCase();
        var temp = this.form.datos_cronic_2.diag_dm;
        if (temp == 'S') {
          this.descrip.ano_diagDm = this.fecha_actual.substring(0, 4);
          this.descrip.mes_diagDm = this.fecha_actual.substring(4, 6);
          // this.descrip.dia_diagDm = this.fecha_actual.substring(6, 8);
          this.dato_anoDiagDm();
        } else if (temp == 'N') {
          this.descrip.ano_diagDm = 0;
          this.descrip.mes_diagDm = 0;
          this.descrip.dia_diagDm = 0;
          this.form.datos_cronic_2.fecha_diag_dm = '';
          this.dato_diagHta();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.dato_diagDm();
        }
      })
    },

    dato_anoDiagDm() {
      validarInputs({
        form: '#ano_diagDm'
      }, () => {
        this.dato_diagDm();
      }, () => {
        var ano = parseInt(this.descrip.ano_diagDm);
        if (ano < 1950) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_anoDiagDm();
        } else {
          // continue
          this.descrip.bisiesto = _validarBisiesto(ano);
          this.dato_mesDiagDm();
        }
      })
    },

    dato_mesDiagDm() {
      validarInputs({
        form: '#mes_diagDm'
      }, () => {
        this.dato_anoDiagDm();
      }, () => {
        this.descrip.mes_diagDm = cerosIzq(this.descrip.mes_diagDm, 2);
        var mes = parseInt(this.descrip.mes_diagDm);
        if (mes > 12 || mes == 0 || mes < 0) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_mesDiagDm();
        } else {
          // continue
          this.dato_diaDiagDm();
        }
      })
    },

    dato_diaDiagDm() {
      validarInputs({
        form: '#dia_diagDm'
      }, () => {
        this.dato_mesDiagDm();
      }, () => {
        this.descrip.dia_diagDm = cerosIzq(this.descrip.dia_diagDm, 2);
        var ano = parseInt(this.descrip.ano_diagDm);
        var mes = parseInt(this.descrip.mes_diagDm);
        var dia = parseInt(this.descrip.dia_diagDm);
        if (((mes == 01 || mes == 03 || mes == 05 || mes == 07 || mes == 08 || mes == 10 || mes == 12) && (dia < 01 && dia < 31))
          || ((mes == 04 || mes == 06 || mes == 09 || mes == 11) && (dia < 01 && dia < 30))
          || (mes == 02 && this.descrip.bisiesto && (dia < 01 && dia < 29))
          || (mes == 02 && !this.descrip.bisiesto && (dia < 01 && dia < 28))) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_diaDiagDm();
        } else {
          this.form.datos_cronic_2.fecha_diag_dm = `${this.descrip.ano_diagDm}${this.descrip.mes_diagDm}${this.descrip.dia_diagDm}`;
          // continue
          this.dato_diagHta();
        }
      })
    },

    dato_diagHta() {
      this.form.datos_cronic_2.diag_hta.trim() == '' ? this.form.datos_cronic_2.diag_hta = 'N' : false;
      validarInputs({
        form: '#diagHta'
      }, () => {
        this.dato_diagDm();
      }, () => {
        this.form.datos_cronic_2.diag_hta = this.form.datos_cronic_2.diag_hta.toUpperCase();
        var temp = this.form.datos_cronic_2.diag_hta;
        if (temp == 'S') {
          this.descrip.ano_diagHta = this.fecha_actual.substring(0, 4);
          this.descrip.mes_diagHta = this.fecha_actual.substring(4, 6);
          // this.descrip.dia_diagHta = this.fecha_actual.substring(6, 8);
          this.dato_anoDiagHta();
        } else if (temp == 'N') {
          this.descrip.ano_diagHta = 0;
          this.descrip.mes_diagHta = 0;
          this.descrip.dia_diagHta = 0;
          this.form.datos_cronic_2.fecha_diag_hta = '';
          this.dato_progCro();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.dato_diagHta();
        }
      })
    },

    dato_anoDiagHta() {
      validarInputs({
        form: '#ano_diagHta'
      }, () => {
        this.dato_diagHta();
      }, () => {
        var ano = parseInt(this.descrip.ano_diagHta);
        if (ano < 1950) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_anoDiagHta();
        } else {
          // continue
          this.descrip.bisiesto = _validarBisiesto(ano);
          this.dato_mesDiagHta();
        }
      })
    },

    dato_mesDiagHta() {
      validarInputs({
        form: '#mes_diagHta'
      }, () => {
        this.dato_anoDiagHta();
      }, () => {
        this.descrip.mes_diagHta = cerosIzq(this.descrip.mes_diagHta, 2);
        var mes = parseInt(this.descrip.mes_diagHta);
        if (mes > 12 || mes == 0 || mes < 0) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_mesDiagHta();
        } else {
          // continue
          this.dato_diaDiagHta();
        }
      })
    },

    dato_diaDiagHta() {
      validarInputs({
        form: '#dia_diagHta'
      }, () => {
        this.dato_mesDiagHta();
      }, () => {
        this.descrip.dia_diagHta = cerosIzq(this.descrip.dia_diagHta, 2);
        var ano = parseInt(this.descrip.ano_diagHta);
        var mes = parseInt(this.descrip.mes_diagHta);
        var dia = parseInt(this.descrip.dia_diagHta);
        if (((mes == 01 || mes == 03 || mes == 05 || mes == 07 || mes == 08 || mes == 10 || mes == 12) && (dia < 01 && dia < 31))
          || ((mes == 04 || mes == 06 || mes == 09 || mes == 11) && (dia < 01 && dia < 30))
          || (mes == 02 && this.descrip.bisiesto && (dia < 01 && dia < 29))
          || (mes == 02 && !this.descrip.bisiesto && (dia < 01 && dia < 28))) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_diaDiagHta();
        } else {
          this.form.datos_cronic_2.fecha_diag_hta = `${this.descrip.ano_diagHta}${this.descrip.mes_diagHta}${this.descrip.dia_diagHta}`;
          // continue
          this.dato_progCro();
        }
      })
    },

    dato_progCro() {
      this.form.datos_cronic_2.prog_cro.trim() == '' ? this.form.datos_cronic_2.prog_cro = 'N' : false;
      validarInputs({
        form: '#progCronicos'
      }, () => {
        this.dato_diagHta();
      }, () => {
        this.form.datos_cronic_2.prog_cro = this.form.datos_cronic_2.prog_cro.toUpperCase();
        var temp = this.form.datos_cronic_2.prog_cro;
        if (temp == 'S') {
          this.descrip.ano_ingProg = this.fecha_actual.substring(0, 4);
          this.descrip.mes_ingProg = this.fecha_actual.substring(4, 6);
          // this.descrip.dia_ingProg = this.fecha_actual.substring(6, 8);
          this.dato_anoProgCro();
        } else if (temp == 'N') {
          this.descrip.ano_ingProg = 0;
          this.descrip.mes_ingProg = 0;
          this.descrip.dia_ingProg = 0;
          this.form.datos_cronic_2.fecha_prog_cro = '';
          this.dato_ieca();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.dato_progCro();
        }
      })
    },

    dato_anoProgCro() {
      validarInputs({
        form: '#ano_ingProg'
      }, () => {
        this.dato_progCro();
      }, () => {
        var ano = parseInt(this.descrip.ano_ingProg);
        if (ano < 1950) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_anoProgCro();
        } else {
          // continue
          this.descrip.bisiesto = _validarBisiesto(ano);
          this.dato_mesProgCro();
        }
      })
    },

    dato_mesProgCro() {
      validarInputs({
        form: '#mes_ingProg'
      }, () => {
        this.dato_anoProgCro();
      }, () => {
        this.descrip.mes_ingProg = cerosIzq(this.descrip.mes_ingProg, 2);
        var mes = parseInt(this.descrip.mes_ingProg);
        if (mes > 12 || mes == 0 || mes < 0) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_mesProgCro();
        } else {
          // continue
          this.dato_diaProgCro();
        }
      })
    },

    dato_diaProgCro() {
      validarInputs({
        form: '#dia_ingProg'
      }, () => {
        this.dato_mesProgCro();
      }, () => {
        this.descrip.dia_ingProg = cerosIzq(this.descrip.dia_ingProg, 2);
        var ano = parseInt(this.descrip.ano_ingProg);
        var mes = parseInt(this.descrip.mes_ingProg);
        var dia = parseInt(this.descrip.dia_ingProg);
        if (((mes == 01 || mes == 03 || mes == 05 || mes == 07 || mes == 08 || mes == 10 || mes == 12) && (dia < 01 && dia < 31))
          || ((mes == 04 || mes == 06 || mes == 09 || mes == 11) && (dia < 01 && dia < 30))
          || (mes == 02 && this.descrip.bisiesto && (dia < 01 && dia < 29))
          || (mes == 02 && !this.descrip.bisiesto && (dia < 01 && dia < 28))) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_diaProgCro();
        } else {
          this.form.datos_cronic_2.fecha_prog_cro = `${this.descrip.ano_ingProg}${this.descrip.mes_ingProg}${this.descrip.dia_ingProg}`;
          // continue
          this.dato_progCroTrr();
        }
      })
    },

    dato_progCroTrr() {
      this.form.datos_cronic_2.prog_cro_trr.trim() == '' ? this.form.datos_cronic_2.prog_cro_trr = 'N' : false;
      validarInputs({
        form: '#pacienTrr'
      }, () => {
        this.dato_progCro();
      }, () => {
        this.form.datos_cronic_2.prog_cro_trr = this.form.datos_cronic_2.prog_cro_trr.toUpperCase();
        var temp = this.form.datos_cronic_2.prog_cro_trr;
        if (temp == 'S' || temp == 'N') {
          this.dato_inasProgCro();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.dato_progCroTrr();
        }
      })
    },

    dato_inasProgCro() {
      this.form.datos_cronic_2.inas_prog_cro.trim() == '' ? this.form.datos_cronic_2.inas_prog_cro = 'N' : false;
      validarInputs({
        form: '#pteIngreAsist'
      }, () => {
        this.dato_progCroTrr();
      }, () => {
        this.form.datos_cronic_2.inas_prog_cro = this.form.datos_cronic_2.inas_prog_cro.toUpperCase();
        var temp = this.form.datos_cronic_2.inas_prog_cro;
        if (temp == 'S' || temp == 'N') {
          this.dato_ieca();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.dato_inasProgCro();
        }
      })
    },

    dato_ieca() {
      let select;
      if (this.form.datos_cronic_2.ieca == '98') {
        select = 4
      } else {
        select = parseInt(this.form.datos_cronic_2.ieca);
      }
      POPUP(
        {
          titulo: "Respuesta IECA",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.resp_Ieca_araii,
          seleccion: select,
          callback_f: () => setTimeout(() => { this.dato_progCro(); }, 200),
        },
        (data) => {
          var dato_w = parseInt(data.COD);
          if (dato_w == 4) {
            this.form.datos_cronic_2.ieca = 98;
          } else {
            this.form.datos_cronic_2.ieca = dato_w;
          }
          this.descrip.descripRecibeIeca = data.DESCRIP;
          setTimeout(() => { this.dato_araii(); }, 200);
        }
      );
    },

    dato_araii() {
      let select;
      if (this.form.datos_cronic_2.araii == '98') {
        select = 4
      } else {
        select = parseInt(this.form.datos_cronic_2.araii);
      }
      POPUP(
        {
          titulo: "Respuesta ARAII",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.resp_Ieca_araii,
          seleccion: select,
          callback_f: () => setTimeout(() => { this.dato_ieca(); }, 200),
        },
        (data) => {
          var dato_w = parseInt(data.COD);
          if (dato_w == 4) {
            this.form.datos_cronic_2.araii = 98;
          } else {
            this.form.datos_cronic_2.araii = dato_w;
          }
          this.descrip.descripRecibeAraii = data.DESCRIP;
          this.ventanaPacienteCronico = false;
          setTimeout(() => { this.validar_ventanaFechaCronic(); }, 200);
        }
      );
    },

    validar_ventanaFechaCronic() {
      this.ventanaValoradoPorCronic = true;
      this.dato_añoMi();
    },

    dato_añoMi() {
      this.descrip.ano_mi == "" ? this.descrip.ano_mi = 0 : false;
      validarInputs({
        form: '#ano_mi'
      }, () => {
        this.ventanaValoradoPorCronic = false;
        this.ventana_soloCronico();
      }, () => {
        var ano = parseInt(this.descrip.ano_mi);
        if (ano > 0 && ano < 1950) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_añoMi();
        } else if (ano == 0) {
          this.descrip.ano_mi = 0;
          this.descrip.mes_mi = 0;
          this.descrip.dia_mi = 0;
          this.form.cierre.fecha_mi = '00000000';
          this.dato_añoEndocri();
        } else {
          this.dato_mesMi();
        }
      })
    },

    dato_mesMi() {
      validarInputs({
        form: '#mes_mi'
      }, () => {
        this.dato_añoMi();
      }, () => {
        this.descrip.mes_mi = cerosIzq(this.descrip.mes_mi, 2);
        var mes = parseInt(this.descrip.mes_mi);
        if (mes > 12 || mes < 1) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_mesMi();
        } else {
          // continue
          this.dato_diaMi();
        }
      })
    },

    dato_diaMi() {
      validarInputs({
        form: '#dia_mi'
      }, () => {
        this.dato_mesMi();
      }, () => {
        this.descrip.dia_mi = cerosIzq(this.descrip.dia_mi, 2);
        var dia = parseInt(this.descrip.dia_mi);

        if (dia > 31 || dia < 1) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_diaMi();
        } else {
          this.form.cierre.fecha_mi = `${this.descrip.ano_mi}${this.descrip.mes_mi}${this.descrip.dia_mi}`;
          let fecha_w = parseInt(this.form.cierre.fecha_mi);

          if (fecha_w > this.fecha_actual) {
            CON851('37', '37', null, 'error', 'error')
            this.dato_añoMi();
          } else {
            // continue
            this.dato_añoEndocri();
          }
        }
      })
    },

    dato_añoEndocri() {
      this.descrip.ano_endocri == "" ? this.descrip.ano_endocri = 0 : false;
      validarInputs({
        form: '#ano_endocri'
      }, () => {
        this.dato_añoMi();
      }, () => {
        var ano = parseInt(this.descrip.ano_endocri);
        if (ano > 0 && ano < 1950) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_añoEndocri();
        } else if (ano == 0) {
          this.descrip.ano_endocri = 0;
          this.descrip.mes_endocri = 0;
          this.descrip.dia_endocri = 0;
          this.form.cierre.fecha_emdocro = '00000000';
          this.dato_añoCardio();
        } else {
          this.dato_mesEndocri();
        }
      })
    },

    dato_mesEndocri() {
      validarInputs({
        form: '#mes_endocri'
      }, () => {
        this.dato_añoEndocri();
      }, () => {
        this.descrip.mes_endocri = cerosIzq(this.descrip.mes_endocri, 2);
        var mes = parseInt(this.descrip.mes_endocri);
        if (mes > 12 || mes < 1) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_mesEndocri();
        } else {
          // continue
          this.dato_diaEndocri();
        }
      })
    },

    dato_diaEndocri() {
      validarInputs({
        form: '#dia_endocri'
      }, () => {
        this.dato_mesEndocri();
      }, () => {
        this.descrip.dia_endocri = cerosIzq(this.descrip.dia_endocri, 2);
        var dia = parseInt(this.descrip.dia_endocri);

        if (dia > 31 || dia < 1) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_diaEndocri();
        } else {
          this.form.cierre.fecha_emdocro = `${this.descrip.ano_endocri}${this.descrip.mes_endocri}${this.descrip.dia_endocri}`;
          let fecha_w = parseInt(this.form.cierre.fecha_emdocro);

          if (fecha_w > this.fecha_actual) {
            CON851('37', '37', null, 'error', 'error')
            this.dato_añoEndocri();
          } else {
            // continue
            this.dato_añoCardio();
          }
        }
      })
    },

    dato_añoCardio() {
      this.descrip.ano_cardio == "" ? this.descrip.ano_cardio = 0 : false;
      validarInputs({
        form: '#ano_cardio'
      }, () => {
        this.dato_añoEndocri();
      }, () => {
        var ano = parseInt(this.descrip.ano_cardio);
        if (ano > 0 && ano < 1950) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_añoCardio();
        } else if (ano == 0) {
          this.descrip.ano_cardio = 0;
          this.descrip.mes_cardio = 0;
          this.descrip.dia_cardio = 0;
          this.form.cierre.fecha_cardio = '00000000';
          this.dato_añoOftalmol();
        } else {
          this.dato_mesCardio();
        }
      })
    },

    dato_mesCardio() {
      validarInputs({
        form: '#mes_cardio'
      }, () => {
        this.dato_añoCardio();
      }, () => {
        this.descrip.mes_cardio = cerosIzq(this.descrip.mes_cardio, 2);
        var mes = parseInt(this.descrip.mes_cardio);
        if (mes > 12 || mes < 1) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_mesCardio();
        } else {
          // continue
          this.dato_diaCardio();
        }
      })
    },

    dato_diaCardio() {
      validarInputs({
        form: '#dia_cardio'
      }, () => {
        this.dato_mesCardio();
      }, () => {
        this.descrip.dia_cardio = cerosIzq(this.descrip.dia_cardio, 2);
        var dia = parseInt(this.descrip.dia_cardio);

        if (dia > 31 || dia < 1) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_diaCardio();
        } else {
          this.form.cierre.fecha_cardio = `${this.descrip.ano_cardio}${this.descrip.mes_cardio}${this.descrip.dia_cardio}`;
          let fecha_w = parseInt(this.form.cierre.fecha_cardio);

          if (fecha_w > this.fecha_actual) {
            CON851('37', '37', null, 'error', 'error')
            this.dato_añoCardio();
          } else {
            // continue
            this.dato_añoOftalmol();
          }
        }
      })
    },

    dato_añoOftalmol() {
      this.descrip.ano_oftal == "" ? this.descrip.ano_oftal = 0 : false;
      validarInputs({
        form: '#ano_oftal'
      }, () => {
        this.dato_añoCardio();
      }, () => {
        var ano = parseInt(this.descrip.ano_oftal);
        if (ano > 0 && ano < 1950) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_añoOftalmol();
        } else if (ano == 0) {
          this.descrip.ano_oftal = 0;
          this.descrip.mes_oftal = 0;
          this.descrip.dia_oftal = 0;
          this.form.cierre.fecha_oftamol = '00000000';
          this.dato_añoNefro();
        } else {
          this.dato_mesOftalmol();
        }
      })
    },

    dato_mesOftalmol() {
      validarInputs({
        form: '#mes_oftal'
      }, () => {
        this.dato_añoOftalmol();
      }, () => {
        this.descrip.mes_oftal = cerosIzq(this.descrip.mes_oftal, 2);
        var mes = parseInt(this.descrip.mes_oftal);
        if (mes > 12 || mes < 1) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_mesOftalmol();
        } else {
          // continue
          this.dato_diaOftalmol();
        }
      })
    },

    dato_diaOftalmol() {
      validarInputs({
        form: '#dia_oftal'
      }, () => {
        this.dato_mesOftalmol();
      }, () => {
        this.descrip.dia_oftal = cerosIzq(this.descrip.dia_oftal, 2);
        var dia = parseInt(this.descrip.dia_oftal);

        if (dia > 31 || dia < 1) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_diaOftalmol();
        } else {
          this.form.cierre.fecha_oftamol = `${this.descrip.ano_oftal}${this.descrip.mes_oftal}${this.descrip.dia_oftal}`;
          let fecha_w = parseInt(this.form.cierre.fecha_oftamol);

          if (fecha_w > this.fecha_actual) {
            CON851('37', '37', null, 'error', 'error')
            this.dato_añoOftalmol();
          } else {
            // continue
            this.dato_añoNefro();
          }
        }
      })
    },

    dato_añoNefro() {
      this.descrip.ano_nefro == "" ? this.descrip.ano_nefro = 0 : false;
      validarInputs({
        form: '#ano_nefro'
      }, () => {
        this.dato_añoOftalmol();
      }, () => {
        var ano = parseInt(this.descrip.ano_nefro);
        if (ano > 0 && ano < 1950) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_añoNefro();
        } else if (ano == 0) {
          this.descrip.ano_nefro = 0;
          this.descrip.mes_nefro = 0;
          this.descrip.dia_nefro = 0;
          this.form.cierre.fecha_nefro = '00000000';
          this.dato_añoPsicol();
        } else {
          this.dato_mesNefro();
        }
      })
    },

    dato_mesNefro() {
      validarInputs({
        form: '#mes_nefro'
      }, () => {
        this.dato_añoNefro();
      }, () => {
        this.descrip.mes_nefro = cerosIzq(this.descrip.mes_nefro, 2);
        var mes = parseInt(this.descrip.mes_nefro);
        if (mes > 12 || mes < 1) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_mesNefro();
        } else {
          // continue
          this.dato_diaNefro();
        }
      })
    },

    dato_diaNefro() {
      validarInputs({
        form: '#dia_nefro'
      }, () => {
        this.dato_mesNefro();
      }, () => {
        this.descrip.dia_nefro = cerosIzq(this.descrip.dia_nefro, 2);
        var dia = parseInt(this.descrip.dia_nefro);

        if (dia > 31 || dia < 1) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_diaNefro();
        } else {
          this.form.cierre.fecha_nefro = `${this.descrip.ano_nefro}${this.descrip.mes_nefro}${this.descrip.dia_nefro}`;
          let fecha_w = parseInt(this.form.cierre.fecha_nefro);

          if (fecha_w > this.fecha_actual) {
            CON851('37', '37', null, 'error', 'error')
            this.dato_añoNefro();
          } else {
            // continue
            this.dato_añoPsicol();
          }
        }
      })
    },

    dato_añoPsicol() {
      this.descrip.ano_psicol == "" ? this.descrip.ano_psicol = 0 : false;
      validarInputs({
        form: '#ano_psicol'
      }, () => {
        this.dato_añoNefro();
      }, () => {
        var ano = parseInt(this.descrip.ano_psicol);
        if (ano > 0 && ano < 1950) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_añoPsicol();
        } else if (ano == 0) {
          this.descrip.ano_psicol = 0;
          this.descrip.mes_psicol = 0;
          this.descrip.dia_psicol = 0;
          this.form.cierre.fecha_psicol = '00000000';
          this.dato_añoNutri();
        } else {
          this.dato_mesPsicol();
        }
      })
    },

    dato_mesPsicol() {
      validarInputs({
        form: '#mes_psicol'
      }, () => {
        this.dato_añoPsicol();
      }, () => {
        this.descrip.mes_psicol = cerosIzq(this.descrip.mes_psicol, 2);
        var mes = parseInt(this.descrip.mes_psicol);
        if (mes > 12 || mes < 1) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_mesPsicol();
        } else {
          // continue
          this.dato_diaPsicol();
        }
      })
    },

    dato_diaPsicol() {
      validarInputs({
        form: '#dia_psicol'
      }, () => {
        this.dato_mesPsicol();
      }, () => {
        this.descrip.dia_psicol = cerosIzq(this.descrip.dia_psicol, 2);
        var dia = parseInt(this.descrip.dia_psicol);

        if (dia > 31 || dia < 1) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_diaPsicol();
        } else {
          this.form.cierre.fecha_psicol = `${this.descrip.ano_psicol}${this.descrip.mes_psicol}${this.descrip.dia_psicol}`;
          let fecha_w = parseInt(this.form.cierre.fecha_psicol);

          if (fecha_w > this.fecha_actual) {
            CON851('37', '37', null, 'error', 'error')
            this.dato_añoPsicol();
          } else {
            // continue
            this.dato_añoNutri();
          }
        }
      })
    },

    dato_añoNutri() {
      this.descrip.ano_nutri == "" ? this.descrip.ano_nutri = 0 : false;
      validarInputs({
        form: '#ano_nutri'
      }, () => {
        this.dato_añoPsicol();
      }, () => {
        var ano = parseInt(this.descrip.ano_nutri);
        if (ano > 0 && ano < 1950) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_añoNutri();
        } else if (ano == 0) {
          this.descrip.ano_nutri = 0;
          this.descrip.mes_nutri = 0;
          this.descrip.dia_nutri = 0;
          this.form.cierre.fecha_nutri = '00000000';
          this.dato_añoTrabSoc();
        } else {
          this.dato_mesNutri();
        }
      })
    },

    dato_mesNutri() {
      validarInputs({
        form: '#mes_nutri'
      }, () => {
        this.dato_añoNutri();
      }, () => {
        this.descrip.mes_nutri = cerosIzq(this.descrip.mes_nutri, 2);
        var mes = parseInt(this.descrip.mes_nutri);
        if (mes > 12 || mes < 1) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_mesNutri();
        } else {
          // continue
          this.dato_diaNutri();
        }
      })
    },

    dato_diaNutri() {
      validarInputs({
        form: '#dia_nutri'
      }, () => {
        this.dato_mesNutri();
      }, () => {
        this.descrip.dia_nutri = cerosIzq(this.descrip.dia_nutri, 2);
        var dia = parseInt(this.descrip.dia_nutri);

        if (dia > 31 || dia < 1) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_diaNutri();
        } else {
          this.form.cierre.fecha_nutri = `${this.descrip.ano_nutri}${this.descrip.mes_nutri}${this.descrip.dia_nutri}`;
          let fecha_w = parseInt(this.form.cierre.fecha_nutri);

          if (fecha_w > this.fecha_actual) {
            CON851('37', '37', null, 'error', 'error')
            this.dato_añoNutri();
          } else {
            // continue
            this.dato_añoTrabSoc();
          }
        }
      })
    },

    dato_añoTrabSoc() {
      this.descrip.ano_trabajoSoc == "" ? this.descrip.ano_trabajoSoc = 0 : false;
      validarInputs({
        form: '#ano_trabajoSoc'
      }, () => {
        this.dato_añoNutri();
      }, () => {
        var ano = parseInt(this.descrip.ano_trabajoSoc);
        if (ano > 0 && ano < 1950) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_añoNutri();
        } else if (ano == 0) {
          this.descrip.ano_trabajoSoc = 0;
          this.descrip.mes_trabajoSoc = 0;
          this.descrip.dia_trabajoSoc = 0;
          this.form.cierre.fecha_trasboc = '00000000';
          this.ventanaValoradoPorCronic = false;
          this._validarMultidrogoresistente();
        } else {
          this.dato_mesTrabSoc();
        }
      })
    },

    dato_mesTrabSoc() {
      validarInputs({
        form: '#mes_trabajoSoc'
      }, () => {
        this.dato_añoTrabSoc();
      }, () => {
        this.descrip.mes_trabajoSoc = cerosIzq(this.descrip.mes_trabajoSoc, 2);
        var mes = parseInt(this.descrip.mes_trabajoSoc);
        if (mes > 12 || mes < 1) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_mesTrabSoc();
        } else {
          // continue
          this.dato_diaTrabSoc();
        }
      })
    },

    dato_diaTrabSoc() {
      validarInputs({
        form: '#dia_trabajoSoc'
      }, () => {
        this.dato_mesTrabSoc();
      }, () => {
        this.descrip.dia_trabajoSoc = cerosIzq(this.descrip.dia_trabajoSoc, 2);
        var dia = parseInt(this.descrip.dia_trabajoSoc);

        if (dia > 31 || dia < 1) {
          CON851('37', '37', null, 'error', 'error')
          this.dato_diaTrabSoc();
        } else {
          this.form.cierre.fecha_trasboc = `${this.descrip.ano_trabajoSoc}${this.descrip.mes_trabajoSoc}${this.descrip.dia_trabajoSoc}`;
          let fecha_w = parseInt(this.form.cierre.fecha_trasboc);

          if (fecha_w > this.fecha_actual) {
            CON851('37', '37', null, 'error', 'error')
            this.dato_añoTrabSoc();
          } else {
            // continue
            this.ventanaValoradoPorCronic = false;
            this._validarMultidrogoresistente();
          }
        }
      })
    },

    _validarMultidrogoresistente() {
      let codigos_validar = [
        "A150",
        "A159",
      ];

      const intersection = this.form.rips.tabla_diagn.find((e) =>
        codigos_validar.includes(e.cod_diagn)
      );

      if (intersection) {
        this.ventanaMultidrogoresistente = true;
        this.dato_multidrogoresistente();
      } else {
        // sigue a ventana solo etv
        this._validarSifilis();
      }
    },

    dato_multidrogoresistente() {
      this.form.multidrogoresis.trim() == '' ? this.form.multidrogoresis = 'N' : false;
      validarInputs({
        form: '#multidrogoresis_hc_01'
      }, () => {
        this._validarDiagnosticos();
        this.ventanaMultidrogoresistente = false;
      }, () => {
        this.form.multidrogoresis = this.form.multidrogoresis.toUpperCase();
        var temp = this.form.multidrogoresis;
        if (temp == 'S') {
          this.dato_cualMto();
        } else if (temp == 'N') {
          // sigue a ventana solo etv
          this.form.cual_multidrogoresis = '';
          this.ventanaMultidrogoresistente = false;
          this._validarSifilis();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.dato_multidrogoresistente();
        }
      })
    },

    dato_cualMto() {
      validarInputs({
        form: '#cualMto_hc_01'
      }, () => {
        this.dato_multidrogoresistente();
      }, () => {
        this.form.cual_multidrogoresis = this.form.cual_multidrogoresis.toUpperCase();
        this.ventanaMultidrogoresistente = false;
        // sigue a ventana solo etv
        this._validarSifilis();
      })
    },

    _validarEsc_sifilis() {
      this._validarDiagnosticos();
      this.params_sifilis.estado = false
    },

    _validarSifilis() {
      let codigos_validar = [
        "A50",
        "A51",
        "A52",
        "A53",
        "A65",
        "I980",
        "B54",
        "M031",
        "N290",
        "N742",
        "O981",
        "R762",
      ];
      const intersection = this.form.rips.tabla_diagn.find((e) =>
        codigos_validar.includes(e.cod_diagn)
      );

      this.validarAnalisis()

      /*
        Se omite componente de sifilis - mientras tanto
      */

      // if (intersection){
      //   this.params_sifilis.enabled = true
      //   this.params_sifilis.estado = true
      // }else{
      //   this.params_sifilis.enabled = true
      //   this.params_sifilis.estado = true
      //   console.log("anomalias congenitas");
      // }
    },

    _validarCallback_sifilis() {
      this.params_sifilis.estado = false
    },

    escHC_9010() { },
    finHC_9010() { },

    validarAnalisis() {
      setTimeout(() => {
        scrollProsoft("fase_analisis_hc_01", "smooth", "center");
      }, 100);

      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_analisis_hc_01",
          orden: "1",
        },
        hc_01._validarDiagnosticos,
        hc_01._validarPlan
      );

    },
    _validarPlan() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_plan_hc_01",
          orden: "1",
        },
        hc_01.validarAnalisis,
        hc_01._initDiscapacidad
      );
    },
    _initDiscapacidad() {
      this.params_hc890l.modal = true;
      setTimeout(() => {
        this.params_hc890l.estado = true;
      }, 150);
    },
    _terminarDiscapacidad() {
      this.validarPag_08();
    },
    validarPag_08() {
      loader("show");

      let hc_01 = this,
        { analisis, plan } = hc_01.form_deta,
        datos = _getObjetoHc(hc_01.form);

      hc_01.modificarArrayDetalle("7501", analisis).then(() => {
        hc_01.modificarArrayDetalle("7503", plan).then((result) => {
          postData(datos, get_url("APP/HICLIN/SAVE_HC.DLL"))
            .then(hc_01._grabarDetalles_pag08)
            .catch((err) => {
              console.log(err)
              loader("hide");
              hc_01._validarPlan();
            });
        });
      });
    },
    _grabarDetalles_pag08() {
      let hc_01 = this;
      let filtro = ["2002", "2070", "3010", "9012"];

      let detalles = hc_01.hc_detalles.filter(
        (e) => e["LLAVE-HC"] == hc_01.form.llave && !filtro.includes(e["COD-DETHC"])
      );

      var datos = _getObjetoHcDetal(detalles, hc_01.form.llave);

      postData(datos, get_url("APP/HICLIN/SAVE_DETALLE.DLL"))
        .then(hc_01._llenarDatosPag10)
        .catch((err) => {
          console.log(err);
          loader("hide");
          hc_01._validarPlan();
        });
    },

    _llenarDatosPag10() {
      loader("hide");
      this.evaluarEstadoEmbarazo();
    },

    evaluarEstadoEmbarazo() {
      let rips = this.form.rips;
      // let edad = calcular_edad(this.paciente.FECHA_NACI);
      let edad = this.form.edad;

      if (
        this.sw_var.embar &&
        (rips.embarazo == 1 || rips.embarazo == 2 || rips.embarazo == 3)
      ) {
        this.leerEstadoEmbarazo(rips.embarazo);
      } else {
        if (this.paciente.SEXO == "M") {
          this.leerEstadoEmbarazo("9");
        } else {
          if (
            edad.unid_edad == "D" ||
            edad.unid_edad == "M" ||
            (edad.unid_edad == "A" && edad.vlr_edad < 11) ||
            (edad.unid_edad == "A" && edad.vlr_edad > 60)
          ) {
            this.leerEstadoEmbarazo("9");
          } else {
            let hc_01 = this;
            POPUP(
              {
                array: _tipoJsonHc("embarazo").filter((e) => e.COD != "9"),
                titulo: "Estado embarazo",
                indices: [{ id: "COD", label: "DESCRIP" }],
                seleccion: rips.embarazo,
                callback_f: () => {
                  hc_01._llenarDatosPag8();
                },
              },
              (data) => {
                hc_01.leerEstadoEmbarazo(data.COD);
              }
            );
          }
        }
      }
    },

    leerEstadoEmbarazo(embarazo) {
      var edad = calcular_edad(this.paciente.NACIM),
        data = consult_embar(embarazo);
      if (embarazo == "9") {
        if (
          this.paciente.SEXO == "F" &&
          edad.unid_edad == "A" &&
          edad.vlr_edad > 10 &&
          edad.vlr_edad < 61
        ) {
          this.evaluarEstadoEmbarazo();
        } else {
          this.evaluarCausa();
        }
      } else {
        setTimeout(this.evaluarCausa, 250);
      }

      this.form.rips.embarazo = embarazo;
      this.descripcion.est_grav = `${embarazo} ${data}`;
    },

    evaluarCausa() {
      let hc_01 = this;

      if (hc_01.form.serv == 02) {
        let causa = hc_01.form.rips.causa;
        if (causa == "00" || causa == "") hc_01.form.rips.causa = "13";
      }

      POPUP(
        {
          array: _tipoJsonHc("causa"),
          titulo: "Causa externa",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: hc_01.form.rips.causa,
          tipo_listado: true,
          callback_f: () => {
            setTimeout(hc_01._llenarDatosPag8, 500);
          },
        },
        (data) => {
          hc_01.form.rips.causa = data.COD;
          var causa = consult_causa(data.COD);
          hc_01.descripcion.causa = data.COD + "  " + causa;
          hc_01.validarCausa(data.COD);
        }
      );
    },

    validarCausa(causa) {
      var espejo_diagnosticos = [
        "T781",
        "T782",
        "T783",
        "T784",
        "T788",
        "T789",
      ];

      var cod_diag1 = "";
      if (this.form.rips.tabla_diagn.length > 0) {
        cod_diag1 = espejo_diagnosticos.find((e) => {
          if (e == this.form.rips.tabla_diagn[0].value) return e;
        });
      }
      cod_diag1 = cod_diag1 ? cod_diag1 : "";

      if (
        cod_diag1 ||
        (this.usuar.NIT == 900005594 &&
          (cod_diag1.substr(1, 1) == "S" || cod_diag1.substr(1, 1) == "T"))
      ) {
        this.evaluarTipoDiagnostico();
      } else {
        if (
          (causa == "13" || causa == "15") &&
          (cod_diag1.substr(1, 1) == "S" || cod_diag1.substr(1, 1) == "T")
        ) {
          plantillaToast("", "7E", null, "warning", "");
          this.evaluarCausa();
        } else {
          setTimeout(() => {
            this.evaluarTipoDiagnostico();
          }, 500);
        }
      }
    },

    evaluarTipoDiagnostico() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("tipo_diagnostico"),
          titulo: "Tipo diagnostico",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: hc_01.form.rips.tipo_diag,
          callback_f: () => {
            setTimeout(hc_01.evaluarCausa, 500);
          },
        },
        (data) => {
          hc_01.validarTipoDiagnostico(data.COD);
        }
      );
    },

    validarTipoDiagnostico(tipo_diag) {
      this.form.rips.tipo_diag = tipo_diag;
      var descript = consult_tipoDiagn(tipo_diag);
      this.descripcion.tipo_diagn = tipo_diag + " - " + descript;
      this.form.rips.finalidad = "10";
      var finalidad = get_finalidadConsulta("10");
      this.descripcion.finalidad = `10 - ${finalidad}`;

      this.form.rips["1ra_vez"] = "";
      this.form.rips.nro_contr = 0;
      this.form.rips.cronico = "";

      setTimeout(() => {
        this.evaluarDatoSalida();
      }, 500);
    },

    evaluarDatoSalida() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("salida"),
          titulo: "Estado salida",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: hc_01.form.rips.estado_sal,
          callback_f: () => {
            setTimeout(hc_01.evaluarTipoDiagnostico, 500);
          },
        },
        (data) => {
          hc_01.validarDatoSalida(data.COD);
        }
      );
    },

    validarDatoSalida(salida) {
      this.form.rips.estado_sal = salida;
      var estadoSalida = estad_salida(salida);
      this.descripcion.estado_salida = `${salida} ${estadoSalida}`;

      if (this.form.serv == 01) {
        this._validarDatoObservacion();
      } else this._validarDatoSalidaOn();
    },

    _validarDatoObservacion() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_dato_observacion",
          orden: "1",
        },
        hc_01.evaluarDatoSalida,
        () => {
          let observ = hc_01.form.rips.observ.toUpperCase();
          if (observ == "S" || observ == "N") {
            hc_01.form.rips.observ = observ;
            if (hc_01.form.serv == 01) hc_01._validarTriage();
            else hc_01._validarDatoSalidaOn();
          } else {
            hc_01._validarDatoObservacion();
          }
        }
      );
    },
    _validarTriage() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_triage",
          orden: "1",
        },
        hc_01._validarDatoObservacion,
        () => {
          let triage = hc_01.form.rips.triage;

          if (triage == 1 || triage == 2 || triage == 3) {
            hc_01._validarDatoSalidaOn();
          } else {
            if (hc_01.usuar.NIT == 800162035 && triage == 4) {
              hc_01._validarDatoSalidaOn();
            } else {
              hc_01._validarTriage();
            }
          }
        }
      );
    },
    _validarDatoSalidaOn() {
      let salida = this.form.rips.estado_sal;
      if (salida == "3") {
        this.evaluarDatoRemitido();
      } else {
        if (salida == "2") {
          this.evaluarDiagMuerte();
        } else {
          this.validarDiagMueter();
        }
      }
    },
    evaluarDatoRemitido() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_remitido_hc_01",
          orden: "1",
        },
        hc_01.evaluarDatoSalida,
        () => {
          if (hc_01.form.rips.remitido) {
            hc_01.evaluarDiagMuerte();
          } else {
            plantillaToast("", "02", null, "warning", "error");
            hc_01.evaluarDatoRemitido();
          }
        }
      );
    },

    evaluarDiagMuerte() {
      let hc_01 = this;
      validarInputs(
        {
          form: "#fase_diag_muerte_hc_01",
          orden: "1",
        },
        hc_01.evaluarDatoSalida,
        () => {
          hc_01.validarDiagMueter();
        }
      );
    },

    validarDiagMueter(diagnostico) {
      if (
        this.form.rips.estado_sal == "2" &&
        this.form.cierre.diag_muer == ""
      ) {
        plantillaToast("", "02", null, "warning", "error");
        this.evaluarDiagMuerte();
      } else {
        var enfermedad = this.enfermedades.find(
          (e) => e.COD_ENF == this.form.cierre.diag_muer.toUpperCase()
        );

        if (enfermedad) {
          console.log("descripcion diagn muerte");
          // $("#diagn_muert_hc_01").val(
          //   diagnostico + " - " + enfermedad.NOMBRE_ENF.trim()
          // );
        }
        this.validarPag_10();
      }
    },

    validarPag_10() {
      let hc_01 = this;
      CON851P("01", hc_01.evaluarCausa, () => {
        var date = new Date(),
          hora = `${date
            .getHours()
            .toString()
            .padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}`;

        if (
          (hc_01.form.serv > 02 && hc_01.form.serv != 08) ||
          (hc_01.form.serv == 01 && hc_01.form.rips.observ == "S") ||
          (hc_01.form.serv == 01 && hc_01.form.rips.estado_sal == 3) ||
          (hc_01.form.serv == 01 && hc_01.form.rips.estado_sal == 4) ||
          (hc_01.form.serv == 02 && hc_01.form.rips.observ == "S") ||
          (hc_01.form.serv == 02 && hc_01.form.rips.estado_sal == 4)
        ) {
          hc_01.form.cierre.estado = "1";
        } else {
          if (hc_01.usuar.NIT == 845000038) {
            if (hc_01.form.serv == 02 && hc_01.form.rips.estado_sal == 4) {
              hc_01.form.cierre.estado = "1";
            } else {
              hc_01.form.egreso = hc_01.form.fecha;
              hc_01.form.hora_egres = hora;
              hc_01.form.cierre.estado = "2";
            }
          } else {
            hc_01.form.egreso = hc_01.form.fecha;
            hc_01.form.hora_egres = hora;
            hc_01.form.cierre.estado = "2";
          }
        }

        hc_01.form.cierre.temporal = "0";
        hc_01._finGuardarHc01();
      });
    },

    _finGuardarHc01() {
      let hc_01 = this;
      var datos = _getObjetoHc(hc_01.form);

      datos.datosh = datos.datosh + "1|";
      postData(datos, get_url("APP/HICLIN/SAVE_HC.DLL"))
        .then(hc_01._guardarDetallesHc01)
        .catch((err) => {
          hc_01.evaluarCausa();
        });
    },

    _guardarDetallesHc01() {
      let hc_01 = this;
      let filtro = ["2002", "2070", "3010", "9012"];

      let detalles = hc_01.hc_detalles.filter(
        (e) => e["LLAVE-HC"] == hc_01.form.llave && !filtro.includes(e["COD-DETHC"])
      );

      var datos = _getObjetoHcDetal(detalles, hc_01.form.llave);

      postData(datos, get_url("APP/HICLIN/SAVE_DETALLE.DLL"))
        .then(hc_01._acualizarRipsFactura)
        .catch((err) => {
          _regresar_menuhis();
        });
    },

    _acualizarRipsFactura() {
      let hc_01 = this,
        datos = {
          datosh:
            datosEnvio() + this.nro_ult_comp + "|",
          paso: 1,
        };

      postData(datos, get_url("APP/SALUD/SER448C.DLL"))
        .then(hc_01._marcarCitaHc01)
        .catch(hc_01._marcarCitaHc01);
    },

    _marcarCitaHc01() {
      let hc_01 = this;

      var fecha = hc_01.form.fecha;
      var medico = hc_01.profesional.IDENTIFICACION.trim();
      var paciente = hc_01.paciente.COD.padStart(15, "0");
      var datosh = `${datosEnvio()}${fecha}|${medico}|${paciente}|`;

      postData({ datosh }, get_url("APP/HICLIN/HC-101.DLL"))
        .then(hc_01._callHc002f)
        .catch((error) => {
          setTimeout(() => {
            hc_01._callHc002f();
          }, 300);
        });
    },

    _callHc002f() {
      $_REG_HC.fecha_lnk = this.form.fecha;
      $_REG_HC.hora_lnk = this.form.hora;
      $_REG_HC.oper_lnk = this.form.oper_elab;
      $_REG_HC.opc_llamado = "1";
      $("#body_main").load("../../HICLIN/paginas/HC002F.html");
    },

    _calcularIndiceGlasgow() {
      let ocular = this.form.signos.aper_ocul || 0;
      let verbal = this.form.signos.resp_verb || 0;
      let motora = this.form.signos.resp_moto || 0;

      var glasg = parseFloat(ocular) + parseFloat(verbal) + parseFloat(motora);
      this.form.signos.vlr_glasg = `${glasg} / 15`;
    },

    formatNumero: function (val) {
      var mask = IMask.createMask({
        mask: Number,
        min: 0,
        max: 99999.99,
        scale: 2,
        thousandsSeparator: ",",
        radix: ".",
      });
      mask.resolve(val.toString());
      return `${mask.value}`;
    },

    _ventanaCiclos() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("ciclos_menstruales"),
          titulo: "Ciclos",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: hc_01.dato_4040.gineco_esq_w.ciclos_esq_w,
          callback_f: () => {
            hc_01.validarMenarquia();
          },
        },
        async (data) => {
          hc_01.dato_4040.gineco_esq_w.ciclos_esq_w = data.COD;
          hc_01.descrip.descripCiclo = data.DESCRIP;
          setTimeout(() => {
            hc_01.validarDatoIrregular();
          }, 200);
        }
      );
    },

    ventanaResultCitol() {
      let hc_01 = this;
      POPUP(
        {
          array: hc_01.resul_citol,
          titulo: "Resultado Citologia",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: hc_01.dato_4040.gineco_esq_w.result_citol_esq_w,
          callback_f: () => {
            hc_01.validarDatoAnoCitol();
          },
        },
        async (data) => {
          hc_01.dato_4040.gineco_esq_w.result_citol_esq_w = data.COD;
          hc_01.descrip.descripResultCitol = data.DESCRIP;

          if (data.COD == "1" || data.COD == "3" || data.COD == "4") {
            hc_01.dato_4040.gineco_esq_w.citol_anormal_esq_w = "";
            hc_01.validarDatoInfec();
          } else {
            hc_01.validarDatoAnorCitol();
          }
        }
      );
    },

    ventanaEspeculoscopia() {
      let hc_01 = this;
      POPUP(
        {
          array: hc_01.resul_citol,
          titulo: "Resultado Especuloscopia",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: hc_01.dato_4040.gineco_esq_w.especuloscop_esq_w,
          callback_f: () => {
            hc_01.validarDatoEndomec();
          },
        },
        async (data) => {
          hc_01.dato_4040.gineco_esq_w.especuloscop_esq_w = data.COD;
          hc_01.descrip.descripResultEspec = data.DESCRIP;

          if (data.COD == "1" || data.COD == "3" || data.COD == "4") {
            hc_01.dato_4040.gineco_esq_w.especul_anormal_esq_w = "";
            hc_01.validarDatoUtero();
          } else {
            hc_01.validarDatoAnormalEspec();
          }
        }
      );
    },

    ventanaEmbarazo() {
      let hc_01 = this;
      let rips = this.form.rips;
      POPUP(
        {
          array: _tipoJsonHc("embarazo"),
          titulo: "Embarazo",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: rips.embarazo,
          callback_f: () => {
            hc_01.validarDatoUtero();
          },
        },
        async (data) => {
          rips.embarazo = data.COD;
          hc_01.validarDatoEstado();
        }
      );
    },

    ventanaNivelEstudio() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("nivel_estudio"),
          titulo: "Nivel estudio",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.form.niv_estud,
          callback_f: () => {
            hc_01.validarDatoAceptado();
          },
        },
        async (data) => {
          this.form.niv_estud = data.COD;
          hc_01.descrip.nivelEst = data.DESCRIP;
          hc_01.validarDatoPesoPrevio();
        }
      );
    },

    ventanaResultadoVih(object, select, escape, siguiente, descrip) {
      let hc_01 = this;
      POPUP(
        {
          array: hc_01.result_vih,
          titulo: "Resultado",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: hc_01.dato_4040[object][hc_01.descrip.indEmb][select],
          callback_f: () => {
            setTimeout(() => {
              hc_01[escape]();
            }, 200);
          },
        },
        async (data) => {
          var indice = (parseInt(hc_01.descrip.indEmb) + 1).toString();
          Vue.set(
            hc_01.dato_4040[object][hc_01.descrip.indEmb],
            select,
            data.COD
          );
          hc_01.descrip[descrip + indice] = data.DESCRIP;
          setTimeout(() => {
            hc_01[siguiente]();
          }, 200);
        }
      );
    },

    ventanarResultadoSerolo() {
      let hc_01 = this;
      POPUP(
        {
          array: hc_01.result_serolo,
          titulo: "Resultado",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion:
            hc_01.dato_4040.tabla_serolo_esq_w[hc_01.descrip.indEmb]
              .resultado_serolo_esq_w,
          callback_f: () => {
            hc_01.validarDatoAnoSerolo();
          },
        },
        async (data) => {
          var indice = (parseInt(hc_01.descrip.indEmb) + 1).toString();
          hc_01.dato_4040.tabla_serolo_esq_w[
            hc_01.descrip.indEmb
          ].resultado_serolo_esq_w = data.COD;
          hc_01.descrip["resultado_serolo" + indice] = data.DESCRIP;
          hc_01.validarDatoAnoHemog();
        }
      );
    },

    ventanarResultadoHemogra() {
      let hc_01 = this;
      POPUP(
        {
          array: hc_01.result_hemogra,
          titulo: "Resultado",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion:
            hc_01.dato_4040.tabla_hemogra_esq_w[hc_01.descrip.indEmb]
              .resultado_hemogra_esq_w,
          callback_f: () => {
            hc_01.validarDatoAnoHemogra();
          },
        },
        async (data) => {
          var indice = (parseInt(hc_01.descrip.indEmb) + 1).toString();
          hc_01.dato_4040.tabla_hemogra_esq_w[
            hc_01.descrip.indEmb
          ].resultado_hemogra_esq_w = data.COD;
          hc_01.descrip["resultado_hemogra" + indice] = data.DESCRIP;
          hc_01.validarDatoAnoHemopara();
        }
      );
    },

    ventanarResultadoUroanali() {
      let hc_01 = this;
      POPUP(
        {
          array: hc_01.result_hemogra,
          titulo: "Resultado",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion:
            hc_01.dato_4040.tabla_uroanali_esq_w[hc_01.descrip.indEmb]
              .resultado_uroanali_esq_w,
          callback_f: () => {
            hc_01.validarDatoAnoUroanali();
          },
        },
        async (data) => {
          var indice = (parseInt(hc_01.descrip.indEmb) + 1).toString();
          hc_01.dato_4040.tabla_uroanali_esq_w[
            hc_01.descrip.indEmb
          ].resultado_uroanali_esq_w = data.COD;
          hc_01.descrip["resultado_uroanali" + indice] = data.DESCRIP;
          hc_01.validarDatoAnoUroculti();
        }
      );
    },

    ventanarResultadoUroculti() {
      let hc_01 = this;
      POPUP(
        {
          array: hc_01.result_hemogra,
          titulo: "Resultado",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion:
            hc_01.dato_4040.tabla_uroculti_esq_w[hc_01.descrip.indEmb]
              .resultado_uroculti_esq_w,
          callback_f: () => {
            hc_01.validarDatoAnoUroculti();
          },
        },
        async (data) => {
          var indice = (parseInt(hc_01.descrip.indEmb) + 1).toString();
          hc_01.dato_4040.tabla_uroculti_esq_w[
            hc_01.descrip.indEmb
          ].resultado_uroculti_esq_w = data.COD;
          hc_01.descrip["resultado_uroculti" + indice] = data.DESCRIP;
          hc_01.validarDatoAnoFrotisV();
        }
      );
    },

    ventanarResultadoFrotisV() {
      let hc_01 = this;
      POPUP(
        {
          array: hc_01.result_hemogra,
          titulo: "Resultado",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion:
            hc_01.dato_4040.tabla_frotisv_esq_w[hc_01.descrip.indEmb]
              .resultado_frotisv_esq_w,
          callback_f: () => {
            hc_01.validarDatoAnoFrotisV();
          },
        },
        async (data) => {
          var indice = (parseInt(hc_01.descrip.indEmb) + 1).toString();
          hc_01.dato_4040.tabla_frotisv_esq_w[
            hc_01.descrip.indEmb
          ].resultado_frotisv_esq_w = data.COD;
          hc_01.descrip["resultado_frotisv" + indice] = data.DESCRIP;
          hc_01.validarDatoAnoGlicemia();
        }
      );
    },

    ventanarResultadoHepatB() {
      let hc_01 = this;
      POPUP(
        {
          array: hc_01.result_vih,
          titulo: "Resultado",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: hc_01.dato_4040.hepatitis_b_esq_w.resultado_hepat_b_esq_w,
          callback_f: () => {
            hc_01.validarDatoAnoHepatB();
          },
        },
        async (data) => {
          hc_01.dato_4040.hepatitis_b_esq_w.resultado_hepat_b_esq_w = data.COD;
          hc_01.descrip.resultado_hepatB = data.DESCRIP;
          hc_01.validarDatoAnoGineco();
        }
      );
    },

    HC877(select, escape, siguiente, descrip) {
      let hc_01 = this;
      POPUP(
        {
          array: hc_01.soporte_fam,
          titulo: "SOPORTE FAMILIAR",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: hc_01.dato_4040.riesgo_biopsicosocial_esq_w[select],
          align: "start",
          callback_f: () => {
            setTimeout(() => {
              hc_01[escape]();
            }, 200);
          },
        },
        async (data) => {
          hc_01.dato_4040.riesgo_biopsicosocial_esq_w[select] = data.COD;
          hc_01.descrip[descrip] = data.DESCRIP;
          setTimeout(() => {
            hc_01[siguiente]();
          }, 200);
        }
      );
    },

    _ventanaAf() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarAf,
        },
        (data) => {
          hc_01.form_deta.af = data.DESCRIP;
          if (hc_01.sw_var.urg) hc_01._validarAlergicos();
          else hc_01._validarAm();
        }
      );
    },
    _ventanaAm() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarAm,
        },
        (data) => {
          hc_01.form_deta.am = data.DESCRIP;
          hc_01._validarAq();
        }
      );
    },
    _ventanaAq() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarAq,
        },
        (data) => {
          hc_01.form_deta.aq = data.DESCRIP;
          hc_01._validarAfame();
        }
      );
    },
    _ventanaAfame() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarAfame,
        },
        (data) => {
          hc_01.form_deta.aFame = data.DESCRIP;
          hc_01._validarAlergicos();
        }
      );
    },
    _ventanaAlergicos() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarAlergicos,
        },
        (data) => {
          hc_01.form_deta.alergicos = data.DESCRIP;
          if (hc_01.sw_var.urg) hc_01.validarGenogPad();
          else hc_01._validarATrauma();
        }
      );
    },
    _ventanaATrauma() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarATrauma,
        },
        (data) => {
          hc_01.form_deta.aTrauma = data.DESCRIP;
          hc_01._validarAOcupa();
        }
      );
    },
    _ventanaAOcupa() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarAOcupa,
        },
        (data) => {
          hc_01.form_deta.aOcupa = data.DESCRIP;
          hc_01._validarOtros();
        }
      );
    },
    _ventanaOtros() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarOtros,
        },
        (data) => {
          hc_01.form_deta.otros = data.DESCRIP;
          hc_01._validarObstetricos();
        }
      );
    },
    _ventanaAgo() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarAgo,
        },
        (data) => {
          hc_01.form_deta.ago = data.DESCRIP;
          hc_01.validarGenogPad();
        }
      );
    },

    /*
      Ventanas de revision por sistemas
    */

    _ventana_os() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarOS,
        },
        (data) => {
          hc_01.form_deta.os = data.DESCRIP;
          setTimeout(hc_01._validarCP, 200);
        }
      );
    },
    _ventana_cp() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarCP,
        },
        (data) => {
          hc_01.form_deta.cp = data.DESCRIP;
          setTimeout(hc_01._validarSD, 200);
        }
      );
    },
    _ventana_sd() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarSD,
        },
        (data) => {
          hc_01.form_deta.sd = data.DESCRIP;
          setTimeout(hc_01._validarSDemart, 200);
        }
      );
    },
    _ventana_sdermat() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarSDemart,
        },
        (data) => {
          hc_01.form_deta.sDermat = data.DESCRIP;
          setTimeout(hc_01._validarSOeste, 200);
        }
      );
    },
    _ventanaSOeste() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarSOeste,
        },
        (data) => {
          hc_01.form_deta.sist_oeste = data.DESCRIP;
          setTimeout(hc_01._validarSN, 200);
        }
      );
    },
    _ventana_sn() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarSN,
        },
        (data) => {
          hc_01.form_deta.sn = data.DESCRIP;
          setTimeout(hc_01._validarSPsiq, 200);
        }
      );
    },
    _ventana_Siq() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarSPsiq,
        },
        (data) => {
          hc_01.form_deta.sis_psiq = data.DESCRIP;
          setTimeout(hc_01._validarSGeni, 200);
        }
      );
    },
    _ventana_sgeni() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarSGeni,
        },
        (data) => {
          hc_01.form_deta.sis_gent = data.DESCRIP;
          setTimeout(hc_01._validarSGine, 200);
        }
      );
    },
    _ventana_sGine() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarSGine,
        },
        (data) => {
          hc_01.form_deta.sis_gine = data.DESCRIP;
          setTimeout(hc_01._validarS_obst, 200);
        }
      );
    },
    _ventana_sAgo() {
      let hc_01 = this;
      POPUP(
        {
          array: _tipoJsonHc("selecionantecedentes"),
          titulo: "Ventana de selecion de antecedentes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: hc_01._validarSGine,
        },
        (data) => {
          hc_01.form_deta.sis_ago = data.DESCRIP;
          setTimeout(hc_01.validarPag_03, 200);
        }
      );
    },

    _ventanaDiagnosticos() {
      let hc_01 = this;
      _ventanaDatos({
        titulo: "Busqueda de enfermedades",
        columnas: ["COD_ENF", "NOMBRE_ENF"],
        data: hc_01.enfermedades,
        callback_esc: function () {
          hc_01.$refs.cod_diagn.focus();
        },
        callback: function (data) {
          hc_01.cod_diagn = data.COD_ENF;
          hc_01.$refs.cod_diag.focus();
          _enterInput(`[ref="cod_diag"`);
        },
      });
    },

    _consultaDetalle(cod) {
      let { llave } = this.form,
        detalle = this.hc_detalles.find(
          (a) => a["COD-DETHC"] == cod && a["LLAVE-HC"] == llave
        );

      let antecedente =
        this.hc_detalles.find((a) => a["COD-DETHC"] == cod) || {};

      if (detalle) detalle = detalle.DETALLE;
      else detalle = antecedente.DETALLE || "";
      return detalle;
    },
    modificarArrayDetalle(cod, detalle) {
      let hc_01 = this;

      return new Promise((resolve, reject) => {
        detalle = detalle || "";
        detalle = detalle.replaceEsp();
        let index = hc_01.hc_detalles.findIndex((e) => {
          if (e["LLAVE-HC"] == hc_01.form.llave && e["COD-DETHC"] == cod)
            return e;
        });

        if (index == -1) {
          hc_01.hc_detalles.push({
            "LLAVE-HC": hc_01.form.llave,
            "COD-DETHC": cod,
            DETALLE: detalle,
          });
        } else {
          hc_01.hc_detalles[index].DETALLE = detalle;
        }
        resolve(index);
      });
    },
    _consultarDiagnostico(cod) {
      return (
        this.enfermedades.find((e) => e.COD_ENF == cod.toUpperCase()) || {
          NOMBRE_ENF: "Sin definir",
        }
      );
    },
    _calcularEdadDias(a) {
      let date_1 = new Date(
        `${a.substr(0, 4)}/${a.substr(4, 2)}/${a.substr(6, 2)}`
      );
      let date_2 = new Date();

      let milliseconds = 86400000;
      let diff_in_millisenconds = date_2 - date_1;
      return parseInt(diff_in_millisenconds / milliseconds);
    },
    _montarDatosPantalla() {
      if (this.form.novedad != "7") {
        this.form_deta.enfer_act = this._consultaDetalle("1001");
      }

      let serv = this.form.serv;
      this.form.proceden =
        this.form.proceden || this.paciente["DESCRIP-CIUDAD"].trim();

      if (this.usuar.NIT == 900004059 || this.usuar.NIT == 844001287) {
        this.sw_var.urg = false;
      } else {
        if (serv == 01 || this.usuar.NIT == 800074996) {
          this.sw_var.urg = true;
        } else this.sw_var.urg = false;
      }

      if (this.sw_var.urg || ["02", "05"].includes(serv)) this.sw_var.agudeza = false;

      if (serv == 01 || serv == 02 || serv == 08 || serv == 09 || serv == 63) {
        this.sw_var.covid = true;
      }

      // datos antencedentes

      this.form_deta.af = this._consultaDetalle("2002");
      this.form_deta.alergicos = this._consultaDetalle("2035");

      let busqDetalle_2080 = this.hc_detalles.find(
        (el) => el["COD-DETHC"] == "2080" && el["LLAVE-HC"] == $_REG_HC.llave_hc
      );
      if (busqDetalle_2080) {
        this.dato_2080 = busqDetalle_2080.DETALLE;
      }

      let busqDetalle_4040 = this.hc_detalles.find(
        (el) => el["COD-DETHC"] == "4040" && el["LLAVE-HC"] == $_REG_HC.llave_hc
      );
      if (busqDetalle_4040) {
        this.dato_4040 = busqDetalle_4040.DETALLE;
      }

      switch (this.dato_4040.gineco_esq_w.ciclos_esq_w) {
        case "1":
          this.descrip.descripCiclo = "REGULARES";
          break;
        case "2":
          this.descrip.descripCiclo = "IREGULARES";
          break;
        default:
          this.descrip.descripCiclo = "";
          break;
      }

      this.descrip.ano_regla = this.dato_4040.gineco_esq_w.fecha_regla_esq_w.substring(
        0,
        4
      );
      this.descrip.mes_regla = this.dato_4040.gineco_esq_w.fecha_regla_esq_w.substring(
        4,
        6
      );
      this.descrip.dia_regla = this.dato_4040.gineco_esq_w.fecha_regla_esq_w.substring(
        6,
        8
      );

      this.descrip.ano_parto = this.dato_4040.gineco_esq_w.ult_parto_esq_w.substring(
        0,
        4
      );
      this.descrip.mes_parto = this.dato_4040.gineco_esq_w.ult_parto_esq_w.substring(
        4,
        6
      );
      this.descrip.dia_parto = this.dato_4040.gineco_esq_w.ult_parto_esq_w.substring(
        6,
        8
      );

      this.descrip.ano_citol = this.dato_4040.gineco_esq_w.fecha_citol_esq_w.substring(
        0,
        4
      );
      this.descrip.mes_citol = this.dato_4040.gineco_esq_w.fecha_citol_esq_w.substring(
        4,
        6
      );
      this.descrip.dia_citol = this.dato_4040.gineco_esq_w.fecha_citol_esq_w.substring(
        6,
        8
      );

      switch (this.dato_4040.gineco_esq_w.result_citol_esq_w) {
        case "1":
          this.descrip.descripResultCitol = "NORMAL";
          break;
        case "2":
          this.descrip.descripResultCitol = "ANORMAL";
          break;
        case "3":
          this.descrip.descripResultCitol = "NO APLICA";
          break;
        case "4":
          this.descrip.descripResultCitol = "NO SABE";
          break;
        default:
          this.descrip.descripResultCitol = "";
          break;
      }

      switch (this.dato_4040.gineco_esq_w.especuloscop_esq_w) {
        case "1":
          this.descrip.descripResultEspec = "NORMAL";
          break;
        case "2":
          this.descrip.descripResultEspec = "ANORMAL";
          break;
        case "3":
          this.descrip.descripResultEspec = "NO APLICA";
          break;
        case "4":
          this.descrip.descripResultEspec = "NO SABE";
          break;
        default:
          this.descrip.descripResultEspec = "";
          break;
      }

      this.descrip.nivelEst = nivel_estudio_mainHc(this.form.niv_estud);

      this.descrip.ano_aseso_pre = this.dato_4040.prenatal_esq_w.fecha_aseso_pre_esq_w.substring(
        0,
        4
      );
      this.descrip.mes_aseso_pre = this.dato_4040.prenatal_esq_w.fecha_aseso_pre_esq_w.substring(
        4,
        6
      );
      this.descrip.dia_aseso_pre = this.dato_4040.prenatal_esq_w.fecha_aseso_pre_esq_w.substring(
        6,
        8
      );

      this.descrip.ano_aseso_pos = this.dato_4040.prenatal_esq_w.fecha_aseso_pos_esq_w.substring(
        0,
        4
      );
      this.descrip.mes_aseso_pos = this.dato_4040.prenatal_esq_w.fecha_aseso_pos_esq_w.substring(
        4,
        6
      );
      this.descrip.dia_aseso_pos = this.dato_4040.prenatal_esq_w.fecha_aseso_pos_esq_w.substring(
        6,
        8
      );

      this.descrip.ano_eco_obst = this.dato_4040.prenatal_esq_w.fecha_eco_obst_esq_w.substring(
        0,
        4
      );
      this.descrip.mes_eco_obst = this.dato_4040.prenatal_esq_w.fecha_eco_obst_esq_w.substring(
        4,
        6
      );
      this.descrip.dia_eco_obst = this.dato_4040.prenatal_esq_w.fecha_eco_obst_esq_w.substring(
        6,
        8
      );

      this.descrip.ano_vac_influ = this.dato_4040.prenatal_esq_w.fecha_vac_influ_esq_w.substring(
        0,
        4
      );
      this.descrip.mes_vac_influ = this.dato_4040.prenatal_esq_w.fecha_vac_influ_esq_w.substring(
        4,
        6
      );
      this.descrip.dia_vac_influ = this.dato_4040.prenatal_esq_w.fecha_vac_influ_esq_w.substring(
        6,
        8
      );

      this.descrip.ano_vac_tdap = this.dato_4040.prenatal_esq_w.fecha_vac_tdap_esq_w.substring(
        0,
        4
      );
      this.descrip.mes_vac_tdap = this.dato_4040.prenatal_esq_w.fecha_vac_tdap_esq_w.substring(
        4,
        6
      );
      this.descrip.dia_vac_tdap = this.dato_4040.prenatal_esq_w.fecha_vac_tdap_esq_w.substring(
        6,
        8
      );

      this.descrip.ano_vac_tt = this.dato_4040.prenatal_esq_w.fecha_vac_tt_esq_w.substring(
        0,
        4
      );
      this.descrip.mes_vac_tt = this.dato_4040.prenatal_esq_w.fecha_vac_tt_esq_w.substring(
        4,
        6
      );
      this.descrip.dia_vac_tt = this.dato_4040.prenatal_esq_w.fecha_vac_tt_esq_w.substring(
        6,
        8
      );

      this.descrip.ano_hepatB = this.dato_4040.hepatitis_b_esq_w.fecha_hepat_b_esq_w.substring(
        0,
        4
      );
      this.descrip.mes_hepatB = this.dato_4040.hepatitis_b_esq_w.fecha_hepat_b_esq_w.substring(
        4,
        6
      );
      this.descrip.dia_hepatB = this.dato_4040.hepatitis_b_esq_w.fecha_hepat_b_esq_w.substring(
        6,
        8
      );

      switch (this.dato_4040.hepatitis_b_esq_w.resultado_hepat_b_esq_w) {
        case "1":
          this.descrip.resultado_hepatB = "POSITIVO";
          break;
        case "2":
          this.descrip.resultado_hepatB = "NEGATIVO";
          break;
        default:
          this.descrip.resultado_hepatB = "";
          break;
      }

      this.descrip.ano_gineco = this.dato_4040.fecha_interconsulta_esq_w.fecha_gineco_esq_w.substring(
        0,
        4
      );
      this.descrip.mes_gineco = this.dato_4040.fecha_interconsulta_esq_w.fecha_gineco_esq_w.substring(
        4,
        6
      );
      this.descrip.dia_gineco = this.dato_4040.fecha_interconsulta_esq_w.fecha_gineco_esq_w.substring(
        6,
        8
      );

      this.descrip.ano_odonto = this.dato_4040.fecha_interconsulta_esq_w.fecha_odonto_esq_w.substring(
        0,
        4
      );
      this.descrip.mes_odonto = this.dato_4040.fecha_interconsulta_esq_w.fecha_odonto_esq_w.substring(
        4,
        6
      );
      this.descrip.dia_odonto = this.dato_4040.fecha_interconsulta_esq_w.fecha_odonto_esq_w.substring(
        6,
        8
      );

      this.descrip.ano_nutri = this.dato_4040.fecha_interconsulta_esq_w.fecha_nutri_esq_w.substring(
        0,
        4
      );
      this.descrip.mes_nutri = this.dato_4040.fecha_interconsulta_esq_w.fecha_nutri_esq_w.substring(
        4,
        6
      );
      this.descrip.dia_nutri = this.dato_4040.fecha_interconsulta_esq_w.fecha_nutri_esq_w.substring(
        6,
        8
      );

      this.descrip.ano_psicol = this.dato_4040.fecha_interconsulta_esq_w.fecha_nutri_esq_w.substring(
        0,
        4
      );
      this.descrip.mes_psicol = this.dato_4040.fecha_interconsulta_esq_w.fecha_nutri_esq_w.substring(
        4,
        6
      );
      this.descrip.dia_psicol = this.dato_4040.fecha_interconsulta_esq_w.fecha_nutri_esq_w.substring(
        6,
        8
      );

      switch (
      this.dato_4040.riesgo_biopsicosocial_esq_w.soporte_fami_tiempo_esq_w
      ) {
        case "1":
          this.descrip.tiempo = "CASI SIEMPRE";
          break;
        case "2":
          this.descrip.tiempo = "A VECES";
          break;
        case "3":
          this.descrip.tiempo = "NUNCA";
          break;
        default:
          this.descrip.tiempo = "";
          break;
      }

      switch (
      this.dato_4040.riesgo_biopsicosocial_esq_w.soporte_fami_espacio_esq_w
      ) {
        case "1":
          this.descrip.espacio = "CASI SIEMPRE";
          break;
        case "2":
          this.descrip.espacio = "A VECES";
          break;
        case "3":
          this.descrip.espacio = "NUNCA";
          break;
        default:
          this.descrip.espacio = "";
          break;
      }

      switch (
      this.dato_4040.riesgo_biopsicosocial_esq_w.soporte_fami_dienro_esq_w
      ) {
        case "1":
          this.descrip.dinero = "CASI SIEMPRE";
          break;
        case "2":
          this.descrip.dinero = "A VECES";
          break;
        case "3":
          this.descrip.dinero = "NUNCA";
          break;
        default:
          this.descrip.dinero = "";
          break;
      }

      // ano_vih: '',
      // mes_vih: '',
      // dia_vih: '',
      // resultado_vih1: '',
      // resultado_vih2: '',
      // resultado_vih3: '',

      // ano_serolo: '',
      // mes_serolo: '',
      // dia_serolo: '',
      // resultado_serolo1: '',
      // resultado_serolo2: '',
      // resultado_serolo3: '',

      // ano_hemog: '',
      // mes_hemog: '',
      // dia_hemog: '',
      // resultado_hemog1: '',
      // resultado_hemog2: '',
      // resultado_hemog3: '',

      // ano_igg: '',
      // mes_igg: '',
      // dia_igg: '',
      // resultado_igg1: '',
      // resultado_igg2: '',
      // resultado_igg3: '',

      // ano_glicem: '',
      // mes_glicem: '',
      // dia_glicem: '',
      // resultado_glicem1: '',
      // resultado_glicem2: '',
      // resultado_glicem3: '',

      // ano_hemogra: '',
      // mes_hemogra: '',
      // dia_hemogra: '',
      // resultado_hemogra1: '',
      // resultado_hemogra2: '',
      // resultado_hemogra3: '',

      // ano_hemopara: '',
      // mes_hemopara: '',
      // dia_hemopara: '',
      // resultado_hemopara1: '',
      // resultado_hemopara2: '',
      // resultado_hemopara3: '',

      // ano_fta_abs: '',
      // mes_fta_abs: '',
      // dia_fta_abs: '',
      // resultado_fta_abs1: '',
      // resultado_fta_abs2: '',
      // resultado_fta_abs3: '',

      // ano_uroanali: '',
      // mes_uroanali: '',
      // dia_uroanali: '',
      // resultado_uroanali1: '',
      // resultado_uroanali2: '',
      // resultado_uroanali3: '',

      // ano_uroculti: '',
      // mes_uroculti: '',
      // dia_uroculti: '',
      // resultado_uroculti1: '',
      // resultado_uroculti2: '',
      // resultado_uroculti3: '',

      // ano_frotisv: '',
      // mes_frotisv: '',
      // dia_frotisv: '',
      // resultado_frotisv1: '',
      // resultado_frotisv2: '',
      // resultado_frotisv3: '',

      // ano_glicemia: '',
      // mes_glicemia: '',
      // dia_glicemia: '',
      // resultado_glicemia1: '',
      // resultado_glicemia2: '',
      // resultado_glicemia3: '',

      if (serv != 01) {
        this.form_deta.am = this._consultaDetalle("2010");
        this.form_deta.aq = this._consultaDetalle("2020");
        this.form_deta.aFame = this._consultaDetalle("2030");

        this.form_deta.aTrauma = this._consultaDetalle("2040");
        this.form_deta.aOcupa = this._consultaDetalle("2050");
        this.form_deta.otros = this._consultaDetalle("2070");
        this.form_deta.ago = this._consultaDetalle("2060");
      }

      if (this.sw_var.urg) {
        let detalle =
          "- FAMILIARES: \n" +
          "- MEDICO-QUIRURGICOS: \n" +
          "- FARMACOLOGICOS: \n" +
          "- TOXICOLOGICOS: \n" +
          "- TRAUMATOLOGICOS: \n" +
          "- OCUPACIONALES:";

        if (
          this.paciente.SEXO == "F" &&
          this.form.edad.unid_edad == "A" &&
          this.form.edad.vlr_edad > 8
        ) {
          detalle = detalle + "\n- GINECO-OBSTETRICOS:";
        }

        if (!this.form_deta.af) this.form_deta.af = detalle;
      }

      // datos revision de sistemas
      if (serv != 01 || (serv == 01 && this.form.novedad == "8")) {
        this.form_deta.os = this._consultaDetalle("3010");
        this.form_deta.cp = this._consultaDetalle("3020");
        this.form_deta.sd = this._consultaDetalle("3030");
        this.form_deta.sDermat = this._consultaDetalle("3040");
        this.form_deta.sist_oeste = this._consultaDetalle("3050");
        this.form_deta.sn = this._consultaDetalle("3060");
        this.form_deta.sis_psiq = this._consultaDetalle("3070");
        this.form_deta.sis_gent = this._consultaDetalle("3080");
        this.form_deta.sis_gine = this._consultaDetalle("3090");
        this.form_deta.sis_ago = this._consultaDetalle("3095");
      }

      // datos signos vitales
      let examen = this._consultaDetalle("4005");

      if (!examen) {
        examen =
          "" +
          "- INSPECCION GENERAL \n" +
          "- CABEZA / CUELLO \n" +
          "- CARDIOVASCULAR \n" +
          "- PULMONAR \n" +
          "- ABDOMEN \n" +
          "- GENITOURINARIOS \n" +
          "- COLUMNA / DORSO \n" +
          "- EXTREMIDADES \n" +
          "- NEUROLOGICO \n" +
          "- PIEL";
      }

      this.form_deta.examen = examen;

      // datos diagnosticos y otros

      this.form_deta.analisis = this._consultaDetalle("7501");
      this.form_deta.plan = this._consultaDetalle("7503");

      let atiende = this.profesional.ATIENDE_PROF;
      if (atiende == 2 || atiende == 6) {
        if (
          (this.usuar.NIT == 900541158 ||
            this.usuar.NIT == 900565371 ||
            this.usuar.NIT == 900405505) &&
          serv == 09
        ) {
          this.sw_var.sintomatico = false;
        } else {
          this.sw_var.sintomatico = true;
        }
      }

      // datos rips

      var rips = this.form.rips;
      var embar = consult_embar(rips.embarazo);
      var causa = consult_causa(rips.causa);
      var tipo_diag = consult_tipoDiagn(rips.tipo_diag.trim());
      var finalidad = get_finalidadConsulta(rips.finalidad);
      var metodPlanif = consult_planifica(this.form.planific);
      var estad_salid = estad_salida(rips.estado_sal);

      this.descripcion.personal_atiende = `${atiende} - ${this.profesional.DESCRIPCION.trim()}`;

      this.descripcion.est_grav = `${rips.embarazo} ${embar}`;
      this.descripcion.causa = `${rips.causa} ${causa}`;

      this.descripcion.tipo_diagn = `${rips.tipo_diag} ${tipo_diag}`;
      this.descripcion.finalidad = `${rips.finalidad} ${finalidad}`;
      this.descripcion.planifica = `${this.form.planific} ${metodPlanif}`;
      this.descripcion.estado_salida = `${rips.estado_sal} ${estad_salid}`;
    },
    _validarDiagnRecomendacionCovid() {
      var codigos_validar = [
        "J00X",
        "J010",
        "J011",
        "J012",
        "J013",
        "J014",
        "J018",
        "J019",
        "J020",
        "J028",
        "J029",
        "J030",
        "J038",
        "J039",
        "J040",
        "J041",
        "J042",
        "J050",
        "J051",
        "J060",
        "J068",
        "J069",
        "J100",
        "J101",
        "J108",
        "J110",
        "J111",
        "J118",
        "J120",
        "J121",
        "J122",
        "J128",
        "J129",
        "J13X",
        "J14X",
        "J150",
        "J151",
        "J152",
        "J153",
        "J154",
        "J155",
        "J156",
        "J157",
        "J158",
        "J159",
        "J160",
        "J168",
        "J170",
        "J171",
        "J172",
        "J173",
        "J178",
        "J180",
        "J181",
        "J182",
        "J188",
        "J189",
        "J200",
        "J201",
        "J202",
        "J203",
        "J204",
        "J205",
        "J206",
        "J207",
        "J208",
        "J209",
        "J210",
        "J218",
        "J219",
        "J22X",
        "J300",
        "J301",
        "J302",
        "J303",
        "J304",
        "J310",
        "J311",
        "J312",
        "J320",
        "J321",
        "J322",
        "J323",
        "J324",
      ];

      const intersection = this.form.rips.tabla_diagn.find((e) =>
        codigos_validar.includes(e.cod_diagn)
      );

      return intersection || false;
    },
    _validarDiagnAcompañanteCovid() {
      let codigos_validar = [
        "J00X",
        "J010",
        "J011",
        "J012",
        "J013",
        "J014",
        "J018",
        "J019",
        "J020",
        "J028",
        "J029",
        "J030",
        "J038",
        "J039",
        "J040",
        "J041",
        "J042",
        "J050",
        "J051",
        "J060",
        "J068",
        "J069",
        "J100",
        "J101",
        "J108",
        "J110",
        "J111",
        "J118",
        "J120",
        "J121",
        "J122",
        "J128",
        "J129",
        "J13X",
        "J14X",
        "J150",
        "J151",
        "J152",
        "J153",
        "J154",
        "J155",
        "J156",
        "J157",
        "J158",
        "J159",
        "J160",
        "J168",
        "J170",
        "J171",
        "J172",
        "J173",
        "J178",
        "J180",
        "J181",
        "J182",
        "J188",
        "J189",
        "J200",
        "J201",
        "J202",
        "J203",
        "J204",
        "J205",
        "J206",
        "J207",
        "J208",
        "J209",
        "J210",
        "J218",
        "J219",
        "J22X",
        "J300",
        "J301",
        "J302",
        "J303",
        "J304",
        "J310",
        "J311",
        "J312",
        "J320",
        "J321",
        "J322",
        "J323",
        "J324",
        "J328",
        "J329",
        "U071",
        "U072",
      ];

      const intersection = this.form.rips.tabla_diagn.find((e) =>
        codigos_validar.includes(e.cod_diagn)
      );

      return intersection || false;
    },
    validarEsc_covid(esc) {
      this.params_hc890h.estado = false;
      this.params_hc890h.pregunta = 0;

      switch (parseInt(esc)) {
        case 1:
          this._evaluarEscPag3();
          break;
        case 2:
        case 3:
        case 4:
          this._validarDiagnosticos();
          break;
      }
    },
    validarCallback_covid(call, data) {
      this.form.covid19 = data;
      this.params_hc890h.estado = false;
      this.params_hc890h.pregunta = 0;

      switch (parseInt(call)) {
        case 1:
          this._validarEpoc();
          break;
        case 2:
          setTimeout(() => {
            this._datoAcompañanteCovid19();
          }, 500);
          break;
        case 3:
          this._vetanaSintomaticoRespiratorio();
          break;
        case 4:
          setTimeout(() => {
            this._evaluarImprimirCovid19();
          }, 500);
          break;
      }
    },

    validarEsc_sintomatico() {
      this.params_hc890d.estado = false;
      this._validarDiagnosticos();
    },

    validarCallback_sintomatico(data) {
      this.params_hc890d.estado = false;
      this.form_sintomatico = data;
      this._validar_barthel();
    },

    validarEsc_discap() {
      this.params_hc890l.modal = false;
      this.params_hc890l.estado = false;
      this._validarPlan();
    },
    validarCallback_discap(data) {
      this.params_hc890l.modal = false;
      this.params_hc890l.estado = false;
      this.form.rips.discapacidades = data;
      this._terminarDiscapacidad();
    },

    _guardarHistoria() {
      return new Promise((resolve, reject) => {
        let datos = _getObjetoSaveHc(this.form, filtroArray.tablasHC);

        postData(datos, get_url("APP/HICLIN/SAVE_HC_2.DLL"))
          .then(resolve)
          .catch((err) => {
            CON851("", "Error guardando datos, intente nuevamente", null, "error", "Error");
            reject();
          });
      });
    },
    _guardarDetallesHc() {
      return new Promise((resolve, reject) => {
        let detalles = this.hc_detalles.filter(e => e["LLAVE-HC"] == this.form.llave);
        let datos = _getObjetoHcDetal(detalles, this.form.llave);

        postData(datos, get_url("APP/HICLIN/SAVE_DETALLE.DLL"))
          .then(resolve)
          .catch((err) => {
            reject();
            CON851("", "Error guardando datos, intente nuevamente", null, "error", "Error");
          });
      });
    },
    _getFechaActual() {
      let date = new Date().toLocaleDateString("es-CO").split("/")

      return date[2] + date[1].padStart(2, "0") + date[0].padStart(2, "0");
    },

    _activarVentanaF2(data = {}) {
      this.sw_var.notificacion = true;
      this.params_noti.estado = true;

      this.params_noti.llave_hc = this.form.llave
      this.params_noti.admin = localStorage.Usuario;

      this.params_noti.callback = data.callback
      this.params_noti.callback_esc = data.callback_esc
    },
    _validarCallbackNotificacion(data) {
      this.sw_var.notificacion = false;
      this.params_noti.estado = false;
      this[data.callback]();
    },
    _validarEscNotificacion(data) {
      this.sw_var.notificacion = false;
      this.params_noti.estado = false;
      this[data.callback_esc]();
    }
  },
});
