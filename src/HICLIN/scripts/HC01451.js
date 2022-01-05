const { detallesHc, grabarDetalles, grabarDetallesText } = require("../../HICLIN/scripts/reg_dethc.js");
const { getObjRegHC, getSintomaticoRegHc } = require("../../HICLIN/scripts/reg_hc.js");

new Vue({
  el: "#HC01451",
  data: {
    datos_paciente: {},
    datos_profesional: {},
    nro_ult_comp: "",
    examen_visual: {
      agudeza_visual_oi_1: "",
      agudeza_visual_oi_2: "",
      agudeza_visual_od_1: "",
      agudeza_visual_od_2: "",
      estructuras_oculares_oi: "",
      estructuras_oculares_od: "",
      distancia_agud: "",
    },
    index_riesgos: 0,
    permitirCambioRiesgos: false,
    focoTablaRiesgos: false,
    bloquearPopupRiesgos: false,
    accidentesTrabajo: false,
    ventanaProfesionales: false,
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
    global_HC01451: getObjRegHC(),
    DETALLE_HISTORIA: {
      ocup_9520: detallesHc.WS_9520(), // WS-9520
      Antecedentes_Quirurgicos: "", // WS_2020
      Antecedentes_Farmacologicos: "", // WS_2030
      Antecedentes_Toxico: "", // WS_2035
      Antecedentes_Traumatologicos: "", // WS_2040
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
      ingreso: {
        ano: "",
        mes: "",
        dia: "",
      },
      accidente: {
        ano: "",
        mes: "",
      },
      diagn_1: {
        ano: "",
        mes: "",
        dia: "",
      },
      diagn_2: {
        ano: "",
        mes: "",
        dia: "",
      },
    },
    paramsEspec: [],
    paramsAtiende: [],
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
    arrayMotivoConsulta: [
      { COD: "1", DESCRIP: "EXAMEN DE PRE-INGRESO" },
      { COD: "2", DESCRIP: "EXAMEN PARA REINGRESO" },
      { COD: "3", DESCRIP: "EXAMEN POST-INCAPACIDAD" },
      { COD: "4", DESCRIP: "EXAMEN POR CAMBIO DE OCUPACION" },
      { COD: "5", DESCRIP: "EXAMEN PERIODICO PROGRAMADO" },
      { COD: "6", DESCRIP: "EXAMEN EGRESO" },
      { COD: "7", DESCRIP: "OTRO" },
      { COD: "8", DESCRIP: "REUBICACION" },
      { COD: "9", DESCRIP: "VALORACION MEDICA" },
      { COD: "A", DESCRIP: "BRIGADISTA" },
      { COD: "B", DESCRIP: "PRE VACACIONAL" },
      { COD: "C", DESCRIP: "POST VACACIONAL" },
    ],
    arrayNivelEducativo: [
      { COD: "1", DESCRIP: "PRIMARIA" },
      { COD: "2", DESCRIP: "SECUNDARIA" },
      { COD: "3", DESCRIP: "TÉCNICO" },
      { COD: "4", DESCRIP: "UNIVERSITARIO" },
      { COD: "5", DESCRIP: "POSTGRADO" },
    ],
    arrayJornadaTrabajo: [
      { COD: "1", DESCRIP: "DIURNO" },
      { COD: "2", DESCRIP: "NOCTURNO" },
      { COD: "3", DESCRIP: "ROTATIVO" },
    ],
    arrayLuminosidad: [
      { COD: "1", DESCRIP: "EXCESIVA" },
      { COD: "2", DESCRIP: "DEFICIENTE" },
      { COD: "3", DESCRIP: "REFLEJOS" },
      { COD: "N", DESCRIP: "NINGUNA" },
    ],
    arrayConsumo: [
      { COD: "1", DESCRIP: "CONSUMIDOR ACTUAL" },
      { COD: "2", DESCRIP: "EX-CONSUMIDOR" },
      { COD: "3", DESCRIP: "NO CONSUMIDOR" },
    ],
    arrayFrecuencia: [
      { COD: "1", DESCRIP: "DIARIO" },
      { COD: "2", DESCRIP: "SEMANAL" },
      { COD: "3", DESCRIP: "QUINCENAL" },
      { COD: "4", DESCRIP: "MENSUAL" },
      { COD: "5", DESCRIP: "OCASIONAL" },
    ],
    arrayLateralidad: [
      { COD: "1", DESCRIP: "DIESTRO" },
      { COD: "2", DESCRIP: "ZURDO" },
      { COD: "3", DESCRIP: "AMBIDIESTRO" },
    ],
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
    textos: {
      estado_civil: "",
      jornada: "",
      alcohol: {
        consumo: "",
        frecuencia: "",
      },
      tabaco: {
        consumo: "",
        frecuencia: "",
      },
      sustancias: {
        consumo: "",
        frecuencia: "",
      },
      lateralidad: "",
    },
  },
  components: {
    covid19: component_hc890h,
    sintomaticos: component_hc890d,
    incapacidad: require("../../HICLIN/scripts/hc890l.vue.js"),
    sifilis: require("../../HICLIN/scripts/hc890i.vue.js"),
    agudeza_visual: require("../../HICLIN/scripts/HC890G.vue.js"),
    ser851: require("../../SALUD/scripts/SER851.vue.js"),
    ser819: require("../../SALUD/scripts/SER819.vue.js"),
  },
  created() {
    nombreOpcion("A,5,1 - Apertura salud ocupacional");

    _inputControl("disabled");
    _inputControl("reset");
    this.datos_paciente = JSON.parse(JSON.stringify($_REG_PACI));
    this.datos_profesional = JSON.parse(JSON.stringify($_REG_PROF));

    this.traerHistoriaClinica(1);
  },
  computed: {
    CALCULO: function () {
      var peso_kg = parseInt(this.global_HC01451.signos.peso) || 0;
      var talla = parseInt(this.global_HC01451.signos.talla) || 0;
      var sup_calc = "0 m2";

      if (peso_kg == 0 || talla == 0) {
        this.global_HC01451.signos.imc_corp = "0";
        this.global_HC01451.signos.sup_corp = "0";
        sup_calc = "0 m2";
      } else {
        //indice masa corporal
        var tallaDiv = talla / 100;
        var exponencial = Math.pow(tallaDiv, 2);
        var resultado = peso_kg / exponencial;

        this.global_HC01451.signos.imc_corp = resultado.toFixed(2).toString();

        //sup
        var sup = (peso_kg + talla - 60) / 100;
        this.global_HC01451.signos.sup_corp = sup.toFixed(2).toString();
        sup_calc = this.global_HC01451.signos.sup_corp + " m2";
      }

      return {
        imc: this.global_HC01451.signos.imc_corp,
        sup: sup_calc,
      };
    },
  },
  watch: {
    "DETALLE_HISTORIA.ocup_9520.nivel_educ.cod_educ": function (data) {
      var consulta = this.arrayNivelEducativo.find((x) => x.COD == data);
      if (consulta) this.DETALLE_HISTORIA.ocup_9520.nivel_educ.det_educ = consulta.COD + ". " + consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.ocup_9520.ante_labor.lab_jorn": function (data) {
      var consulta = this.arrayJornadaTrabajo.find((x) => x.COD == data);
      if (consulta) this.textos.jornada = consulta.COD + ". " + consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.ocup_9520.hab_ant.alcoh_ant": function (data) {
      var consulta = this.arrayConsumo.find((x) => x.COD == data);
      if (consulta) this.textos.alcohol.consumo = consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.ocup_9520.hab_ant.frec_alcoh_ant": function (data) {
      var consulta = this.arrayFrecuencia.find((x) => x.COD == data);
      if (consulta) this.textos.alcohol.frecuencia = consulta.DESCRIP;
      else this.textos.alcohol.frecuencia = "";
    },
    "DETALLE_HISTORIA.ocup_9520.hab_ant.tabac_ant": function (data) {
      var consulta = this.arrayConsumo.find((x) => x.COD == data);
      if (consulta) this.textos.tabaco.consumo = consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.ocup_9520.hab_ant.frec_tabac_ant": function (data) {
      var consulta = this.arrayFrecuencia.find((x) => x.COD == data);
      if (consulta) this.textos.tabaco.frecuencia = consulta.DESCRIP;
      else this.textos.tabaco.frecuencia = "";
    },
    "DETALLE_HISTORIA.ocup_9520.hab_ant.psico_ant": function (data) {
      var consulta = this.arrayConsumo.find((x) => x.COD == data);
      if (consulta) this.textos.sustancias.consumo = consulta.DESCRIP;
    },
    "DETALLE_HISTORIA.ocup_9520.hab_ant.frec_psico_ant": function (data) {
      var consulta = this.arrayFrecuencia.find((x) => x.COD == data);
      if (consulta) this.textos.sustancias.frecuencia = consulta.DESCRIP;
      else this.textos.sustancias.frecuencia = "";
    },
    "global_HC01451.signos.lateral": function (data) {
      var consulta = this.arrayLateralidad.find((x) => x.COD == data);
      if (consulta) this.textos.lateralidad = consulta.DESCRIP;
    },
  },
  methods: {
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
          _this.global_HC01451 = data;

          _this.datos_ext.peso_KG = parseFloat(_this.global_HC01451.signos.peso) / 1000;

          if (parseInt(_this.global_HC01451.edad) == 0)
            _this.global_HC01451.edad = $_REG_HC.edad_hc.unid_edad + $_REG_HC.edad_hc.vlr_edad.toString();

          for (var i in _this.global_HC01451.rips.tabla_diagn) {
            _this.global_HC01451.rips.tabla_diagn[i].cod_diagn = _this.global_HC01451.rips.tabla_diagn[i].cod_diagn
              .toUpperCase()
              .trim();
          }

          _this.global_HC01451.signos.peso = parseFloat(_this.global_HC01451.signos.peso).toString() || "";
          _this.global_HC01451.signos.talla = parseInt(_this.global_HC01451.signos.talla).toString() || "";
          _this.global_HC01451.signos.fcard = parseInt(_this.global_HC01451.signos.fcard).toString() || "";
          _this.global_HC01451.signos.fresp = parseInt(_this.global_HC01451.signos.fresp).toString() || "";
          _this.global_HC01451.signos.tens1 = parseInt(_this.global_HC01451.signos.tens1).toString() || "";
          _this.global_HC01451.signos.tens2 = parseInt(_this.global_HC01451.signos.tens2).toString() || "";
          _this.global_HC01451.signos.tens_media = parseInt(_this.global_HC01451.signos.tens_media).toString() || "";
          _this.global_HC01451.signos.per_abdo = parseFloat(_this.global_HC01451.signos.per_abdo).toString() || "";

          _this.global_HC01451.motiv = _this.global_HC01451.motiv.replace(/\&/g, "\n").trim();

          switch (param) {
            case 1:
              _this.traerDetalleHistoria();
              break;
            case 2:
              _this.validarProcedencia();
              break;
          }
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_HC01451();
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
            "9520;2020;2030;2035;2040" +
            "|" +
            $_REG_HC.serv_hc +
            "|",
        },
        get_url("APP/HICLIN/HCDETAL_PRC.DLL")
      )
        .then(async (data) => {
          console.log(data);

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

          var formato_9520 = data.DETHC.find((x) => x["COD-DETHC"] == "9520");
          if (formato_9520) {
            _this.DETALLE_HISTORIA.ocup_9520 = formato_9520.DETALLE;
          }

          _this
            .imprimir_HC002B() // IMPRESION EVOLUCIONES ANTERIORES DE ELECTRON
            .then(async () => {
              if (_this.global_HC01451.novedad == "7") this.asignarDatosCrea();
              else _this.asignarDatosModif();
            });
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          _this.salir_HC01451();
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
    asignarDatosCrea() {
      this.global_HC01451.fecha = moment().format("YYYYMMDD");
      this.global_HC01451.hora = moment().format("HHmm");
      this.global_HC01451.med = this.datos_profesional.IDENTIFICACION.trim();
      this.global_HC01451.serv = "02";
      this.global_HC01451.rips.atiende = this.datos_profesional.ATIENDE_PROF;
      this.global_HC01451.oper_elab = localStorage.Usuario;
      this.datos_ext.NOM_MEDICO = this.datos_profesional.NOMBRE.trim();

      this.global_HC01451.unid_edad = $_REG_HC.edad_hc.unid_edad;
      this.global_HC01451.vlr_edad = $_REG_HC.edad_hc.vlr_edad.toString();
      this.global_HC01451.edad_dias = SC_DIAS(this.datos_paciente.NACIM, this.global_HC01451.fecha);

      switch (this.datos_paciente["NIV-ESTUD"]) {
        case "3":
          this.DETALLE_HISTORIA.ocup_9520.nivel_educ.cod_educ = "1";
          break;
        case "4":
          this.DETALLE_HISTORIA.ocup_9520.nivel_educ.cod_educ = "2";
          break;
        case "5":
          this.DETALLE_HISTORIA.ocup_9520.nivel_educ.cod_educ = "2";
          break;
        case "6":
          this.DETALLE_HISTORIA.ocup_9520.nivel_educ.cod_educ = "2";
          break;
        case "7":
          this.DETALLE_HISTORIA.ocup_9520.nivel_educ.cod_educ = "2";
          break;
        case "8":
          this.DETALLE_HISTORIA.ocup_9520.nivel_educ.cod_educ = "3";
          break;
        case "9":
          this.DETALLE_HISTORIA.ocup_9520.nivel_educ.cod_educ = "3";
          break;
        case "A":
          this.DETALLE_HISTORIA.ocup_9520.nivel_educ.cod_educ = "4";
          break;
        case "B":
          this.DETALLE_HISTORIA.ocup_9520.nivel_educ.cod_educ = "5";
          break;
        case "C":
          this.DETALLE_HISTORIA.ocup_9520.nivel_educ.cod_educ = "5";
          break;
        case "D":
          this.DETALLE_HISTORIA.ocup_9520.nivel_educ.cod_educ = "5";
          break;
      }

      this.global_HC01451.signos.und_peso = "1";

      this.datos_ext.FOLIO = "Creando: " + $_REG_HC.suc_folio_hc + $_REG_HC.nro_folio_hc;

      this.finAsignarDatos();
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
    asignarDatosModif() {
      this.datos_ext.NOM_MEDICO = this.global_HC01451.descrip_med.trim();
      this.datos_ext.FOLIO = "Modificando: " + $_REG_HC.suc_folio_hc + $_REG_HC.nro_folio_hc;

      [this.fechas.ingreso.ano, this.fechas.ingreso.mes, this.fechas.ingreso.dia] = this.devolverFecha(
        this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_fecha
      );

      this.fechas.accidente.ano = this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.fecha_accid_trab.substring(
        0,
        4
      );
      this.fechas.accidente.mes = this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.fecha_accid_trab.substring(
        4,
        6
      );

      [this.fechas.diagn_1.ano, this.fechas.diagn_1.mes, this.fechas.diagn_1.dia] = this.devolverFecha(
        this.DETALLE_HISTORIA.ocup_9520.ante_labor.enf1_prof.fecha_enf1_prof
      );

      [this.fechas.diagn_2.ano, this.fechas.diagn_2.mes, this.fechas.diagn_2.dia] = this.devolverFecha(
        this.DETALLE_HISTORIA.ocup_9520.ante_labor.enf2_prof.fecha_enf2_prof
      );

      this.finAsignarDatos();
    },
    finAsignarDatos() {
      // this.global_HC01451.rips.finalid = $_REG_HC.finalid_hc.toString();

      this.datos_ext.grupo_sang = this.datos_paciente["GRP-SANG"].trim();
      this.datos_ext.RH = this.datos_paciente.RH.trim();

      this.datos_ext.telefono_paci = this.datos_paciente.TELEFONO;
      this.datos_ext.direccion_paci = this.datos_paciente.DIRECC;

      this.datos_ext.UNID_SERV = this.global_HC01451.serv + " - CONSULTA EXTERNA";

      this.datos_ext.ANO = this.global_HC01451.fecha.substring(0, 4);
      this.datos_ext.MES = this.global_HC01451.fecha.substring(4, 6);
      this.datos_ext.DIA = this.global_HC01451.fecha.substring(6, 8);

      this.datos_ext.HORA = this.global_HC01451.hora.substring(0, 2);
      this.datos_ext.MINUTO = this.global_HC01451.hora.substring(2, 4);

      switch (this.datos_paciente["EST-CIV"]) {
        case "S":
          this.textos.estado_civil = "SOLTER@";
          break;
        case "C":
          this.textos.estado_civil = "CASAD@";
          break;
        case "U":
          this.textos.estado_civil = "U. LIBRE";
          break;
        case "V":
          this.textos.estado_civil = "VIUD@";
          break;
        case "D":
          this.textos.estado_civil = "DIVORCIAD@";
          break;
      }

      if (this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_riesg == "S") this.permitirCambioRiesgos = true;

      if (this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.hay_accid_trab == "S")
        this.accidentesTrabajo = true;

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
      if (this.global_HC01451.cierre.estado == "2") {
        CON851("70", "Historia está cerrada, OJO !", null, "error", "Error");

        switch (localStorage.Usuario) {
          case "GEBC":
          case "ADMI":
          case "TEMP":
            this.capturarMes_hc();
            break;
          default:
            this.salir_HC01451();
            break;
        }
      } else {
        if (
          localStorage.Usuario == "GEBC" ||
          localStorage.Usuario == "ADMI" ||
          localStorage.Usuario == "TEMP" ||
          parseInt(this.datos_profesional.IDENTIFICACION) == parseInt(this.global_HC01451.med)
        ) {
          this.crearHistoria();
        } else {
          CON851("81", "81", null, "error", "Error");
          this.salir_HC01451();
        }
      }
    },
    capturarMes_hc() {
      validarInputs(
        {
          form: "#validarMes_HC01451",
          orden: "1",
        },
        () => this.salir_HC01451(),
        () => {
          this.datos_ext.MES = this.datos_ext.MES.padStart("0", 2);
          let mes = parseInt(this.datos_ext.MES);
          if (mes < 1 || mes > 12) {
            CON851("", "Mes fuera de rango", null, "error", "Error");
            this.capturarMes_hc();
          } else this.capturarDia_hc();
        }
      );
    },
    capturarDia_hc() {
      validarInputs(
        {
          form: "#validarDia_HC01451",
          orden: "1",
        },
        () => this.capturarMes_hc(),
        () => {
          this.datos_ext.DIA = this.datos_ext.DIA.padStart("0", 2);
          let dia = parseInt(this.datos_ext.DIA);

          if (dia < 1 || dia > 31) {
            CON851("", "Dia fuera de rango", null, "error", "Error");
            this.capturarDia_hc();
          } else {
            this.global_HC01451.fecha = this.datos_ext.ANO + this.datos_ext.MES + this.datos_ext.DIA;
            this.capturarHora_hc();
          }
        }
      );
    },
    capturarHora_hc() {
      validarInputs(
        {
          form: "#validarHora_HC01451",
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
          form: "#validarMinuto_HC01451",
          orden: "1",
        },
        () => this.capturarHora_hc(),
        () => {
          if (parseInt(this.datos_ext.MINUTO) > 59) {
            CON851("03", "03", null, "error", "Error");
            this.capturarMinuto_hc();
          } else {
            this.datos_ext.MINUTO = cerosIzq(this.datos_ext.MINUTO, 2);
            this.global_HC01451.hora = this.datos_ext.HORA + this.datos_ext.MINUTO;
            this.validarMedico();
          }
        }
      );
    },
    escVentanaProfe() {
      this.ventanaProfesionales = false;
      this.validarMedico();
    },
    ventanaMedico() {
      _fin_validar_form();
      this.ventanaProfesionales = true;
    },
    successVentanaProfe(data) {
      this.ventanaProfesionales = false;
      this.global_HC01451.med = data.identificacion;
      this.validarMedico();
      setTimeout(() => _enterInput("#inputMedico_HC01451"), 100);
    },
    async validarMedico() {
      validarInputs(
        {
          form: "#validarMedico_HC01451",
          orden: "1",
        },
        () => this.capturarMinuto_hc(),
        async () => {
          this.global_HC01451.med = this.global_HC01451.med.trim();

          var medico = await this.buscarMedico();

          if (medico) {
            this.datos_ext.NOM_MEDICO = medico.NOMBRE;
            this.crearHistoria();
          } else {
            CON851("", "Médico no existe", null, "error", "Error");
            this.validarMedico();
          }
        }
      );
    },
    async buscarMedico() {
      loader("show");
      return new Promise(async (resolve, reject) => {
        let envio = {
          datosh: datosEnvio(),
          codigo: this.global_HC01451.med,
          paso: "1",
        };
        await postData(envio, get_url("APP/SALUD/SER819.DLL"))
          .then((data) => {
            loader("hide");
            if (data.NOMBRE.trim() == "Personal no atiende") resolve(false);
            else resolve(data);
          })
          .catch((error) => {
            console.error(error);
            loader("hide");
            resolve(false);
          });
      });
    },
    crearHistoria() {
      var _this = this;

      if (this.global_HC01451.novedad == "7" && localStorage.Usuario != "TEMP") {
        var data = {};
        data["datosh"] =
          datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|" + this.global_HC01451.novedad + "|";
        data["datos_basicos"] =
          this.global_HC01451.fecha +
          "|" +
          this.global_HC01451.hora +
          "|" +
          this.global_HC01451.med +
          "|" +
          this.global_HC01451.serv +
          "|" +
          this.global_HC01451.unid_edad +
          this.global_HC01451.vlr_edad +
          "|" +
          this.global_HC01451.edad_dias +
          "|9520|o|" +
          this.global_HC01451.rips.finalid +
          "|";

        postData(data, get_url("APP/HICLIN/SAVE_TEMP_HC.DLL"))
          .then((data) => {
            console.log(data);
            _this.traerHistoriaClinica(2);
          })
          .catch((error) => {
            console.log(error);
            CON851("", "Ha ocurrido un error creando historia", null, "error", "Error");
            _this.salir_HC01451();
          });
      } else {
        this.nro_ult_comp = "";
        this.validarProcedencia();
      }
    },
    buscarConsultaExterna() {
      // se llamaba hc811b en rm pero no se hacia nada con el comprobante traido
    },
    validarProcedencia() {
      console.log(this.global_HC01451);
      if (this.global_HC01451.proceden.trim() == "") this.global_HC01451.proceden = this.datos_paciente.MADRE.trim();

      validarInputs(
        {
          form: "#validarProcedencia",
          orden: "1",
        },
        () => CON851P("temp", this.validarProcedencia, this.salir_HC01451),
        () => {
          this.seleccionMotivoConsulta();
        }
      );
    },
    seleccionMotivoConsulta() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "MOTIVO DE CONSULTA",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayMotivoConsulta,
            callback_f: () => this.validarProcedencia(),
            seleccion: this.DETALLE_HISTORIA.ocup_9520.tipo_motiv,
            teclaAlterna: true,
          },
          (data) => {
            _this.DETALLE_HISTORIA.ocup_9520.tipo_motiv = data.COD;
            _this.global_HC01451.motiv = data.DESCRIP;
            _this.validarNivelEducativo();
          }
        );
      }, 300);
    },
    validarMotivoConsulta() {
      validarInputs(
        {
          form: "#validarMotivoConsulta",
          orden: "1",
        },
        () => this.validarProcedencia(),
        () => {
          this.global_HC01451.motiv = this.global_HC01451.motiv.replaceEsp();

          this.validarNivelEducativo();
        }
      );
    },
    validarNivelEducativo() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "NIVEL EDUCATIVO",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayNivelEducativo,
            callback_f: () => this.validarMotivoConsulta(),
            seleccion: this.DETALLE_HISTORIA.ocup_9520.nivel_educ.cod_educ,
            teclaAlterna: true,
            id_input: "#validarNivelEducativo",
          },
          (data) => {
            _this.DETALLE_HISTORIA.ocup_9520.nivel_educ.cod_educ = data.COD;
            _this.validarNroHijos();
          }
        );
      }, 300);
    },
    validarNroHijos() {
      validarInputs(
        {
          form: "#validarNroHijos",
          orden: "1",
        },
        () => this.validarNivelEducativo(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.hijos.nro_hijos = this.validarNumero(
            this.DETALLE_HISTORIA.ocup_9520.hijos.nro_hijos
          );

          if (parseInt(this.DETALLE_HISTORIA.ocup_9520.hijos.nro_hijos) == 1)
            this.DETALLE_HISTORIA.ocup_9520.hijos.det_educ = "HIJO";
          else this.DETALLE_HISTORIA.ocup_9520.hijos.det_educ = "HIJOS";

          this.guardarHistoria(this.validarNroHijos, this.validarSedeTrabajo);
        }
      );
    },
    validarSedeTrabajo() {
      validarInputs(
        {
          form: "#validarSedeTrabajo",
          orden: "1",
        },
        () => this.validarNroHijos(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_sede = this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_sede
            .trim()
            .toUpperCase();

          this.validarActividadEconomica();
        }
      );
    },
    validarActividadEconomica() {
      validarInputs(
        {
          form: "#validarActividadEconomica",
          orden: "1",
        },
        () => this.validarSedeTrabajo(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.activ_empresa =
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.activ_empresa.trim().toUpperCase();

          this.validarEmpresaMision();
        }
      );
    },
    validarEmpresaMision() {
      validarInputs(
        {
          form: "#validarEmpresaMision",
          orden: "1",
        },
        () => this.validarActividadEconomica(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_empresa =
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_empresa.trim().toUpperCase();

          this.validarAreaTrabajo();
        }
      );
    },
    validarAreaTrabajo() {
      validarInputs(
        {
          form: "#validarAreaTrabajo",
          orden: "1",
        },
        () => this.validarEmpresaMision(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_area_trab =
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_area_trab.trim().toUpperCase();

          this.validarARL();
        }
      );
    },
    validarARL() {
      validarInputs(
        {
          form: "#validarARL",
          orden: "1",
        },
        () => this.validarAreaTrabajo(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_arp = this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_arp
            .trim()
            .toUpperCase();

          this.validarFondoPensiones();
        }
      );
    },
    validarFondoPensiones() {
      validarInputs(
        {
          form: "#validarFondoPensiones",
          orden: "1",
        },
        () => this.validarARL(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_pens = this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_pens
            .trim()
            .toUpperCase();

          this.validarAnoIngreso_HC01451();
        }
      );
    },
    validarAnoIngreso_HC01451() {
      validarInputs(
        {
          form: "#validarAnoIngreso_HC01451",
          orden: "1",
        },
        () => this.validarFondoPensiones(),
        () => {
          let ano = parseInt(this.fechas.ingreso.ano) || 0;

          if (ano == 0) {
            this.fechas.ingreso.ano = "";
            this.fechas.ingreso.mes = "";
            this.fechas.ingreso.dia = "";
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_fecha = "00000000";
            this.validarJornada();
          } else if (ano < 1900) {
            CON851("37", "Año fuera de rango", null, "error", "Error");
            this.validarAnoIngreso_HC01451();
          } else this.validarMesIngreso_HC01451();
        }
      );
    },
    validarMesIngreso_HC01451() {
      validarInputs(
        {
          form: "#validarMesIngreso_HC01451",
          orden: "1",
        },
        () => this.validarAnoIngreso_HC01451(),
        () => {
          let mes = parseInt(this.fechas.ingreso.mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "Mes fuera de rango", null, "error", "Error");
            this.validarMesIngreso_HC01451();
          } else this.validarDiaIngreso_HC01451();
        }
      );
    },
    validarDiaIngreso_HC01451() {
      validarInputs(
        {
          form: "#validarDiaIngreso_HC01451",
          orden: "1",
        },
        () => this.validarMesIngreso_HC01451(),
        () => {
          let dia_num = parseInt(this.fechas.ingreso.dia) || 0;

          let ano = this.fechas.ingreso.ano;
          let mes = this.fechas.ingreso.mes;
          let dia = this.fechas.ingreso.dia;

          if (dia_num < 1 || dia_num > 31) {
            CON851("37", "Dia fuera de rango", null, "error", "Error");
            this.validarDiaIngreso_HC01451();
          } else if (!_validarFecha(ano, mes, dia)) {
            CON851("37", "Fecha fuera de rango", null, "error", "Error");
            this.validarDiaIngreso_HC01451();
          } else {
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_fecha =
              this.fechas.ingreso.ano +
              this.fechas.ingreso.mes.padStart(2, "0") +
              this.fechas.ingreso.dia.padStart(2, "0");

            this.validarJornada();
          }
        }
      );
    },
    validarJornada() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "JORNADA DE TRABAJO",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayJornadaTrabajo,
            callback_f: () => {
              if (this.fechas.ingreso.ano == "") this.validarAnoIngreso_HC01451();
              else this.validarDiaIngreso_HC01451();
            },
            seleccion: this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_jorn,
            teclaAlterna: true,
            id_input: "#validarJornada",
          },
          (data) => {
            _this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_jorn = data.COD;
            _this.validarCargo();
          }
        );
      }, 300);
    },
    validarCargo() {
      validarInputs(
        {
          form: "#validarCargo",
          orden: "1",
        },
        () => this.validarJornada(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_cargo = this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_cargo
            .trim()
            .toUpperCase();

          this.validarNit();
        }
      );
    },
    validarNit() {
      validarInputs(
        {
          form: "#validarNit",
          orden: "1",
        },
        () => this.validarCargo(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.nit_empre = parseInt(this.DETALLE_HISTORIA.ocup_9520.nit_empre) || 0;

          this.validarFunciones();
        }
      );
    },
    validarFunciones() {
      validarInputs(
        {
          form: "#validarFunciones",
          orden: "1",
        },
        () => this.validarNit(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_funci = this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_funci
            .trim()
            .toUpperCase();

          this.validarMaquina();
        }
      );
    },
    validarMaquina() {
      validarInputs(
        {
          form: "#validarMaquina",
          orden: "1",
        },
        () => this.validarFunciones(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_maqui = this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_maqui
            .trim()
            .toUpperCase();

          this.validarHerramientas();
        }
      );
    },
    validarHerramientas() {
      validarInputs(
        {
          form: "#validarHerramientas",
          orden: "1",
        },
        () => this.validarMaquina(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_herra = this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_herra
            .trim()
            .toUpperCase();

          this.validarMateriaPrima();
        }
      );
    },
    validarMateriaPrima() {
      validarInputs(
        {
          form: "#validarMateriaPrima",
          orden: "1",
        },
        () => this.validarHerramientas(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_mater = this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_mater
            .trim()
            .toUpperCase();

          this.guardarHistoria(this.validarMateriaPrima, this.validarGafas);
        }
      );
    },
    validarGafas() {
      validarInputs(
        {
          form: "#validarGafas",
          orden: "1",
        },
        () => this.validarMateriaPrima(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_protec.lab_gafa = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_protec.lab_gafa
          );

          this.validarCasco();
        }
      );
    },
    validarCasco() {
      validarInputs(
        {
          form: "#validarCasco",
          orden: "1",
        },
        () => this.validarGafas(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_protec.lab_casc = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_protec.lab_casc
          );

          this.validarTapabocas();
        }
      );
    },
    validarTapabocas() {
      validarInputs(
        {
          form: "#validarTapabocas",
          orden: "1",
        },
        () => this.validarCasco(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_protec.lab_tapa = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_protec.lab_tapa
          );

          this.validarOverol();
        }
      );
    },
    validarOverol() {
      validarInputs(
        {
          form: "#validarOverol",
          orden: "1",
        },
        () => this.validarTapabocas(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_protec.lab_over = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_protec.lab_over
          );

          this.validarBotas();
        }
      );
    },
    validarBotas() {
      validarInputs(
        {
          form: "#validarBotas",
          orden: "1",
        },
        () => this.validarOverol(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_protec.lab_bota = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_protec.lab_bota
          );

          this.validarProtector();
        }
      );
    },
    validarProtector() {
      validarInputs(
        {
          form: "#validarProtector",
          orden: "1",
        },
        () => this.validarBotas(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_protec.lab_prot = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_protec.lab_prot
          );

          this.validarRespirador();
        }
      );
    },
    validarRespirador() {
      validarInputs(
        {
          form: "#validarRespirador",
          orden: "1",
        },
        () => this.validarProtector(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_protec.lab_resp = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_protec.lab_resp
          );

          this.validarGuantes();
        }
      );
    },
    validarGuantes() {
      validarInputs(
        {
          form: "#validarGuantes",
          orden: "1",
        },
        () => this.validarRespirador(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_protec.lab_guan = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_protec.lab_guan
          );

          this.guardarHistoria(this.validarGuantes, this.validarRiesgosOcupacionales);
        }
      );
    },
    validarRiesgosOcupacionales() {
      validarInputs(
        {
          form: "#validarRiesgosOcupacionales",
          orden: "1",
        },
        () => this.validarGuantes(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_riesg = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_riesg
          );

          if (this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_riesg == "S") {
            this.index_riesgos = 0;
            this.focoTablaRiesgos = true;
            this.permitirCambioRiesgos = true;
            this.empresaLaboro_HC01451();
          } else {
            if (this.permitirCambioRiesgos) {
              CON851P(
                "Seguro que desea borrar los datos de la tabla ?",
                this.validarRiesgosOcupacionales,
                this.inicializarTablaRiesgos
              );
            } else this.validarAccidenteTrabajo();
          }
        }
      );
    },
    inicializarTablaRiesgos() {
      this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter = detallesHc.WS_9520().ante_labor.lab_tab_anter;
      this.focoTablaRiesgos = false;
      this.permitirCambioRiesgos = false;
      this.validarAccidenteTrabajo();
    },
    mostrarTablaRiesgos(index) {
      if (!this.bloquearPopupRiesgos) {
        this.index_riesgos = index;
        if (this.focoTablaRiesgos) {
          _fin_validar_form();
          this.empresaLaboro_HC01451();
        }
      }
    },
    textoIluminacion(index) {
      let retorno = "";
      switch (this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[index].lab_ilumi) {
        case "1":
          retorno = "EXCE";
          break;
        case "2":
          retorno = "DEFI";
          break;
        case "3":
          retorno = "REFL";
          break;
        case "N":
          retorno = "NING";
          break;
        default:
          retorno = "";
          break;
      }
      return retorno;
    },
    empresaLaboro_HC01451() {
      console.log(
        this.index_riesgos,
        this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_empr_ant
      );
      validarInputs(
        {
          form: "#empresaLaboro_HC01451",
          orden: "1",
          event_f3: () => this.validarFinTablaRiesgos(),
        },
        () => {
          if (this.index_riesgos == 0) {
            this.focoTablaRiesgos = false;
            this.validarRiesgosOcupacionales();
          } else {
            this.index_riesgos--;
            this.empresaLaboro_HC01451();
          }
        },
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_empr_ant =
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_empr_ant
              .trim()
              .toUpperCase();

          if (this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_empr_ant == "") {
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos] =
              detallesHc.WS_9520().ante_labor.lab_tab_anter[0];

            if (this.index_riesgos == 3) this.validarFinTablaRiesgos();
            else {
              this.index_riesgos++;
              this.empresaLaboro_HC01451();
            }
          } else this.actividadEconomica_HC01451();
        }
      );
    },
    validarFinTablaRiesgos() {
      this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter =
        this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter.filter((el) => el.lab_empr_ant.trim() != "");

      while (this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter.length < 4) {
        this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter.push(detallesHc.WS_9520().ante_labor.lab_tab_anter[0]);
      }

      this.guardarHistoria(this.empresaLaboro_HC01451, this.validarAccidenteTrabajo);
    },
    actividadEconomica_HC01451() {
      validarInputs(
        {
          form: "#actividadEconomica_HC01451",
          orden: "1",
        },
        () => this.empresaLaboro_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_activ_ant =
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_activ_ant
              .trim()
              .toUpperCase();

          this.seccionEmpresa_HC01451();
        }
      );
    },
    seccionEmpresa_HC01451() {
      validarInputs(
        {
          form: "#seccionEmpresa_HC01451",
          orden: "1",
        },
        () => this.actividadEconomica_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_secc_ant =
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_secc_ant
              .trim()
              .toUpperCase();

          this.cargoDesempeño_HC01451();
        }
      );
    },
    cargoDesempeño_HC01451() {
      validarInputs(
        {
          form: "#cargoDesempeño_HC01451",
          orden: "1",
        },
        () => this.seccionEmpresa_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_carg_ant =
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_carg_ant
              .trim()
              .toUpperCase();

          this.funcionesDesempeñadas_HC01451();
        }
      );
    },
    funcionesDesempeñadas_HC01451() {
      validarInputs(
        {
          form: "#funcionesDesempeñadas_HC01451",
          orden: "1",
        },
        () => this.cargoDesempeño_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_func_ant =
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_func_ant
              .trim()
              .toUpperCase();

          this.medidasControl_HC01451();
        }
      );
    },
    medidasControl_HC01451() {
      validarInputs(
        {
          form: "#medidasControl_HC01451",
          orden: "1",
        },
        () => this.funcionesDesempeñadas_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_med_ant =
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_med_ant
              .trim()
              .toUpperCase();

          this.empresaActual_HC01451();
        }
      );
    },
    empresaActual_HC01451() {
      validarInputs(
        {
          form: "#empresaActual_HC01451",
          orden: "1",
        },
        () => this.medidasControl_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_emp_act = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_emp_act
          );

          this.tiempoCargo_HC01451();
        }
      );
    },
    tiempoCargo_HC01451() {
      validarInputs(
        {
          form: "#tiempoCargo_HC01451",
          orden: "1",
        },
        () => this.empresaActual_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_tiemp_ant =
            this.validarNumero(
              this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_tiemp_ant,
              5
            );

          this.entregaSoportes_HC01451();
        }
      );
    },
    entregaSoportes_HC01451() {
      validarInputs(
        {
          form: "#entregaSoportes_HC01451",
          orden: "1",
        },
        () => this.tiempoCargo_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_sop_ant = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_sop_ant
          );

          if (this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_sop_ant == "S")
            this.cualesSoportes_HC01451();
          else {
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_cualsop_ant = "";
            this.iluminacion_HC01451();
          }
        }
      );
    },
    cualesSoportes_HC01451() {
      validarInputs(
        {
          form: "#cualesSoportes_HC01451",
          orden: "1",
        },
        () => this.entregaSoportes_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_cualsop_ant =
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_cualsop_ant
              .trim()
              .toUpperCase();

          this.iluminacion_HC01451();
        }
      );
    },
    iluminacion_HC01451() {
      let _this = this;
      this.bloquearPopupRiesgos = true;
      setTimeout(() => {
        POPUP(
          {
            titulo: "ILUMINACION INADEC",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayLuminosidad,
            callback_f: () => {
              if (this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_sop_ant == "S")
                this.cualesSoportes_HC01451();
              else this.entregaSoportes_HC01451();
            },
            seleccion: this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_ilumi,
            teclaAlterna: true,
            id_input: "#iluminacion_HC01451",
          },
          (data) => {
            _this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_ilumi = data.COD;
            _this.bloquearPopupRiesgos = false;
            _this.ionizantes_HC01451();
          }
        );
      }, 300);
    },
    ionizantes_HC01451() {
      validarInputs(
        {
          form: "#ionizantes_HC01451",
          orden: "1",
        },
        () => this.iluminacion_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_radio = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_radio
          );

          this.NOionizantes_HC01451();
        }
      );
    },
    NOionizantes_HC01451() {
      validarInputs(
        {
          form: "#NOionizantes_HC01451",
          orden: "1",
        },
        () => this.ionizantes_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_radno = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_radno
          );

          this.ruido_HC01451();
        }
      );
    },
    ruido_HC01451() {
      validarInputs(
        {
          form: "#ruido_HC01451",
          orden: "1",
        },
        () => this.NOionizantes_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_ruido = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_ruido
          );

          this.tempAlta_HC01451();
        }
      );
    },
    tempAlta_HC01451() {
      validarInputs(
        {
          form: "#tempAlta_HC01451",
          orden: "1",
        },
        () => this.ruido_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_tmalt = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_tmalt
          );

          this.tempBaja_HC01451();
        }
      );
    },
    tempBaja_HC01451() {
      validarInputs(
        {
          form: "#tempBaja_HC01451",
          orden: "1",
        },
        () => this.tempAlta_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_tmbaj = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_tmbaj
          );

          this.vibraciones_HC01451();
        }
      );
    },
    vibraciones_HC01451() {
      validarInputs(
        {
          form: "#vibraciones_HC01451",
          orden: "1",
        },
        () => this.tempBaja_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_vibra = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_vibra
          );

          this.presion_HC01451();
        }
      );
    },
    presion_HC01451() {
      validarInputs(
        {
          form: "#presion_HC01451",
          orden: "1",
        },
        () => this.vibraciones_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_presi = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_presi
          );

          this.gases_HC01451();
        }
      );
    },
    gases_HC01451() {
      validarInputs(
        {
          form: "#gases_HC01451",
          orden: "1",
        },
        () => this.presion_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_gases = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_gases
          );

          this.humos_HC01451();
        }
      );
    },
    humos_HC01451() {
      validarInputs(
        {
          form: "#humos_HC01451",
          orden: "1",
        },
        () => this.gases_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_humos = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_humos
          );

          this.polvos_HC01451();
        }
      );
    },
    polvos_HC01451() {
      validarInputs(
        {
          form: "#polvos_HC01451",
          orden: "1",
        },
        () => this.humos_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_polvo = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_polvo
          );

          this.liquido_HC01451();
        }
      );
    },
    liquido_HC01451() {
      validarInputs(
        {
          form: "#liquido_HC01451",
          orden: "1",
        },
        () => this.polvos_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_liqui = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_liqui
          );

          this.vapores_HC01451();
        }
      );
    },
    vapores_HC01451() {
      validarInputs(
        {
          form: "#vapores_HC01451",
          orden: "1",
        },
        () => this.liquido_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_vapor = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_vapor
          );

          this.fibras_HC01451();
        }
      );
    },
    fibras_HC01451() {
      validarInputs(
        {
          form: "#fibras_HC01451",
          orden: "1",
        },
        () => this.vapores_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_fibra = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_fibra
          );

          this.cargaDina_HC01451();
        }
      );
    },
    cargaDina_HC01451() {
      validarInputs(
        {
          form: "#cargaDina_HC01451",
          orden: "1",
        },
        () => this.fibras_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_cardi = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_cardi
          );

          this.cargaEsta_HC01451();
        }
      );
    },
    cargaEsta_HC01451() {
      validarInputs(
        {
          form: "#cargaEsta_HC01451",
          orden: "1",
        },
        () => this.cargaDina_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_cares = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_cares
          );

          this.diseñoPuesto_HC01451();
        }
      );
    },
    diseñoPuesto_HC01451() {
      validarInputs(
        {
          form: "#diseñoPuesto_HC01451",
          orden: "1",
        },
        () => this.cargaEsta_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_disen = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_disen
          );

          this.manejoCarga_HC01451();
        }
      );
    },
    manejoCarga_HC01451() {
      validarInputs(
        {
          form: "#manejoCarga_HC01451",
          orden: "1",
        },
        () => this.diseñoPuesto_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_manej = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_manej
          );

          this.movimRepe_HC01451();
        }
      );
    },
    movimRepe_HC01451() {
      validarInputs(
        {
          form: "#movimRepe_HC01451",
          orden: "1",
        },
        () => this.manejoCarga_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_movim = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_movim
          );

          this.videoTerminal_HC01451();
        }
      );
    },
    videoTerminal_HC01451() {
      validarInputs(
        {
          form: "#videoTerminal_HC01451",
          orden: "1",
        },
        () => this.movimRepe_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_video = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_video
          );

          this.microorganismos_HC01451();
        }
      );
    },
    microorganismos_HC01451() {
      validarInputs(
        {
          form: "#microorganismos_HC01451",
          orden: "1",
        },
        () => this.videoTerminal_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_micro = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_micro
          );

          this.animales_HC01451();
        }
      );
    },
    animales_HC01451() {
      validarInputs(
        {
          form: "#animales_HC01451",
          orden: "1",
        },
        () => this.microorganismos_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_anima = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_anima
          );

          this.vegetales_HC01451();
        }
      );
    },
    vegetales_HC01451() {
      validarInputs(
        {
          form: "#vegetales_HC01451",
          orden: "1",
        },
        () => this.animales_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_veget = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_veget
          );

          this.electricos_HC01451();
        }
      );
    },
    electricos_HC01451() {
      validarInputs(
        {
          form: "#electricos_HC01451",
          orden: "1",
        },
        () => this.vegetales_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_elect = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_elect
          );

          this.indendio_HC01451();
        }
      );
    },
    indendio_HC01451() {
      validarInputs(
        {
          form: "#indendio_HC01451",
          orden: "1",
        },
        () => this.electricos_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_incen = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_incen
          );

          this.explosion_HC01451();
        }
      );
    },
    explosion_HC01451() {
      validarInputs(
        {
          form: "#explosion_HC01451",
          orden: "1",
        },
        () => this.indendio_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_explo = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_explo
          );

          this.mecanico_HC01451();
        }
      );
    },
    mecanico_HC01451() {
      validarInputs(
        {
          form: "#mecanico_HC01451",
          orden: "1",
        },
        () => this.explosion_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_mecan = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_mecan
          );

          this.locativos_HC01451();
        }
      );
    },
    locativos_HC01451() {
      validarInputs(
        {
          form: "#locativos_HC01451",
          orden: "1",
        },
        () => this.mecanico_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_locat = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_locat
          );

          this.desplazamiento_HC01451();
        }
      );
    },
    desplazamiento_HC01451() {
      validarInputs(
        {
          form: "#desplazamiento_HC01451",
          orden: "1",
        },
        () => this.locativos_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_despl = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_despl
          );

          this.ordenPublico_HC01451();
        }
      );
    },
    ordenPublico_HC01451() {
      validarInputs(
        {
          form: "#ordenPublico_HC01451",
          orden: "1",
        },
        () => this.desplazamiento_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_ordpu = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_ordpu
          );

          this.natural_HC01451();
        }
      );
    },
    natural_HC01451() {
      validarInputs(
        {
          form: "#natural_HC01451",
          orden: "1",
        },
        () => this.ordenPublico_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_natur = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_natur
          );

          this.contenido_HC01451();
        }
      );
    },
    contenido_HC01451() {
      validarInputs(
        {
          form: "#contenido_HC01451",
          orden: "1",
        },
        () => this.natural_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_conte = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_conte
          );

          this.orgTiempo_HC01451();
        }
      );
    },
    orgTiempo_HC01451() {
      validarInputs(
        {
          form: "#orgTiempo_HC01451",
          orden: "1",
        },
        () => this.contenido_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_organ = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_organ
          );

          this.relacHumanas_HC01451();
        }
      );
    },
    relacHumanas_HC01451() {
      validarInputs(
        {
          form: "#relacHumanas_HC01451",
          orden: "1",
        },
        () => this.orgTiempo_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_relac = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_relac
          );

          this.gestion_HC01451();
        }
      );
    },
    gestion_HC01451() {
      validarInputs(
        {
          form: "#gestion_HC01451",
          orden: "1",
        },
        () => this.relacHumanas_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_gesti = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_gesti
          );

          this.ambFisico_HC01451();
        }
      );
    },
    ambFisico_HC01451() {
      validarInputs(
        {
          form: "#ambFisico_HC01451",
          orden: "1",
        },
        () => this.gestion_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_fisic = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.lab_tab_anter[this.index_riesgos].lab_fisic
          );

          if (this.index_riesgos == 3) this.validarFinTablaRiesgos();
          else {
            this.index_riesgos++;
            this.empresaLaboro_HC01451();
          }
        }
      );
    },
    validarAccidenteTrabajo() {
      this.focoTablaRiesgos = false;
      validarInputs(
        {
          form: "#validarAccidenteTrabajo",
          orden: "1",
        },
        () => {
          if (this.permitirCambioRiesgos) {
            this.focoTablaRiesgos = true;
            this.permitirCambioRiesgos = true;
            this.empresaLaboro_HC01451();
          } else this.validarRiesgosOcupacionales();
        },
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.hay_accid_trab = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.hay_accid_trab
          );

          if (this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.hay_accid_trab == "S") {
            this.accidentesTrabajo = true;
            this.validarTiempoIncapacitado();
          } else {
            this.accidentesTrabajo = false;
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab = detallesHc.WS_9520().ante_labor.ant_accid_trab;
            this.fechas.accidente.ano = "";
            this.fechas.accidente.mes = "";
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.hay_accid_trab = "N";
            this.guardarHistoria(this.validarAccidenteTrabajo, this.validarEnfermedadProfesional);
          }
        }
      );
    },
    validarTiempoIncapacitado() {
      validarInputs(
        {
          form: "#validarTiempoIncapacitado",
          orden: "1",
        },
        () => this.validarAccidenteTrabajo(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.dias_accid_trab = this.validarNumero(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.dias_accid_trab,
            3
          );

          this.validarArp();
        }
      );
    },
    validarArp() {
      validarInputs(
        {
          form: "#validarArp",
          orden: "1",
        },
        () => this.validarTiempoIncapacitado(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.report_accid_trab = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.report_accid_trab
          );

          this.validarAnoAccidente_HC01451();
        }
      );
    },
    validarAnoAccidente_HC01451() {
      validarInputs(
        {
          form: "#validarAnoAccidente_HC01451",
          orden: "1",
        },
        () => this.validarArp(),
        () => {
          let ano = parseInt(this.fechas.accidente.ano) || 0;

          if (ano == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarAnoAccidente_HC01451();
          } else if (ano < 1950) {
            CON851("37", "Año fuera de rango", null, "error", "Error");
            this.validarAnoAccidente_HC01451();
          } else this.validarMesAccidente_HC01451();
        }
      );
    },
    validarMesAccidente_HC01451() {
      validarInputs(
        {
          form: "#validarMesAccidente_HC01451",
          orden: "1",
        },
        () => this.validarAnoAccidente_HC01451(),
        () => {
          let mes = parseInt(this.fechas.accidente.mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "Mes fuera de rango", null, "error", "Error");
            this.validarMesAccidente_HC01451();
          } else {
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.fecha_accid_trab =
              this.fechas.accidente.ano.padStart(2, "0") + this.fechas.accidente.mes.padStart(2, "0");
            this.validarAccidenteEmpresa();
          }
        }
      );
    },
    validarAccidenteEmpresa() {
      validarInputs(
        {
          form: "#validarAccidenteEmpresa",
          orden: "1",
        },
        () => this.validarMesAccidente_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.empresa_accid_trab =
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.empresa_accid_trab.trim().toUpperCase();

          this.validarTipoLesion();
        }
      );
    },
    validarTipoLesion() {
      validarInputs(
        {
          form: "#validarTipoLesion",
          orden: "1",
        },
        () => this.validarAccidenteEmpresa(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.lesion_accid_trab =
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.lesion_accid_trab.trim().toUpperCase();

          this.validarParteCuerpo();
        }
      );
    },
    validarParteCuerpo() {
      validarInputs(
        {
          form: "#validarParteCuerpo",
          orden: "1",
        },
        () => this.validarTipoLesion(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.parte_accid_trab =
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.parte_accid_trab.trim().toUpperCase();

          this.validarSecuelas();
        }
      );
    },
    validarSecuelas() {
      validarInputs(
        {
          form: "#validarSecuelas",
          orden: "1",
        },
        () => this.validarParteCuerpo(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.secuel_accid_trab =
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.secuel_accid_trab.trim().toUpperCase();

          this.validarAtencionRecibida();
        }
      );
    },
    validarAtencionRecibida() {
      validarInputs(
        {
          form: "#validarAtencionRecibida",
          orden: "1",
        },
        () => this.validarSecuelas(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.atenc_accid_trab =
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.ant_accid_trab.atenc_accid_trab.trim().toUpperCase();

          this.guardarHistoria(this.validarAtencionRecibida, this.validarEnfermedadProfesional);
        }
      );
    },
    validarEnfermedadProfesional() {
      validarInputs(
        {
          form: "#validarEnfermedadProfesional",
          orden: "1",
        },
        () => {
          if (this.accidentesTrabajo) this.validarAtencionRecibida();
          else this.validarAccidenteTrabajo();
        },
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.hay_enf_prof = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.hay_enf_prof
          );

          if (this.DETALLE_HISTORIA.ocup_9520.ante_labor.hay_enf_prof == "S") this.validarEnfermedadProfesional_1();
          else {
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.enf1_prof = detallesHc.WS_9520().ante_labor.enf1_prof;
            this.fechas.diagn_1.ano = "";
            this.fechas.diagn_1.mes = "";
            this.fechas.diagn_1.dia = "";

            this.DETALLE_HISTORIA.ocup_9520.ante_labor.enf2_prof = detallesHc.WS_9520().ante_labor.enf2_prof;
            this.fechas.diagn_2.ano = "";
            this.fechas.diagn_2.mes = "";
            this.fechas.diagn_2.dia = "";

            this.guardarHistoria(this.validarEnfermedadProfesional, this.validarAntecedentesQuirur);
          }
        }
      );
    },
    validarEnfermedadProfesional_1() {
      validarInputs(
        {
          form: "#validarEnfermedadProfesional_1",
          orden: "1",
        },
        () => this.validarEnfermedadProfesional(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.enf1_prof.det_enf1_prof =
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.enf1_prof.det_enf1_prof.trim().toUpperCase();

          this.validarAnoDiagnostico_1_HC01451();
        }
      );
    },
    validarAnoDiagnostico_1_HC01451() {
      validarInputs(
        {
          form: "#validarAnoDiagnostico_1_HC01451",
          orden: "1",
        },
        () => this.validarEnfermedadProfesional_1(),
        () => {
          let ano = parseInt(this.fechas.diagn_1.ano) || 0;

          if (ano == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarAnoDiagnostico_1_HC01451();
          } else if (ano < 1900) {
            CON851("37", "Año fuera de rango", null, "error", "Error");
            this.validarAnoDiagnostico_1_HC01451();
          } else this.validarMesDiagnostico_1_HC01451();
        }
      );
    },
    validarMesDiagnostico_1_HC01451() {
      validarInputs(
        {
          form: "#validarMesDiagnostico_1_HC01451",
          orden: "1",
        },
        () => this.validarAnoDiagnostico_1_HC01451(),
        () => {
          let mes = parseInt(this.fechas.diagn_1.mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "Mes fuera de rango", null, "error", "Error");
            this.validarMesDiagnostico_1_HC01451();
          } else this.validarDiaDiagnostico_1_HC01451();
        }
      );
    },
    validarDiaDiagnostico_1_HC01451() {
      validarInputs(
        {
          form: "#validarDiaDiagnostico_1_HC01451",
          orden: "1",
        },
        () => this.validarMesDiagnostico_1_HC01451(),
        () => {
          let dia_num = parseInt(this.fechas.diagn_1.dia) || 0;

          let ano = this.fechas.diagn_1.ano;
          let mes = this.fechas.diagn_1.mes;
          let dia = this.fechas.diagn_1.dia;

          if (dia_num < 1 || dia_num > 31) {
            CON851("37", "Dia fuera de rango", null, "error", "Error");
            this.validarDiaDiagnostico_1_HC01451();
          } else if (!_validarFecha(ano, mes, dia)) {
            CON851("37", "Fecha fuera de rango", null, "error", "Error");
            this.validarDiaDiagnostico_1_HC01451();
          } else {
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.enf1_prof.fecha_enf1_prof =
              this.fechas.diagn_1.ano +
              this.fechas.diagn_1.mes.padStart(2, "0") +
              this.fechas.diagn_1.dia.padStart(2, "0");

            this.validarEnfermedadProfesional_2();
          }
        }
      );
    },
    validarEnfermedadProfesional_2() {
      validarInputs(
        {
          form: "#validarEnfermedadProfesional_2",
          orden: "1",
        },
        () => this.validarDiaDiagnostico_1_HC01451(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.ante_labor.enf2_prof.det_enf2_prof =
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.enf2_prof.det_enf2_prof.trim().toUpperCase();

          this.validarAnoDiagnostico_2_HC01451();
        }
      );
    },
    validarAnoDiagnostico_2_HC01451() {
      validarInputs(
        {
          form: "#validarAnoDiagnostico_2_HC01451",
          orden: "1",
        },
        () => this.validarEnfermedadProfesional_2(),
        () => {
          let ano = parseInt(this.fechas.diagn_2.ano) || 0;

          if (ano == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarAnoDiagnostico_2_HC01451();
          } else if (ano < 1900) {
            CON851("37", "Año fuera de rango", null, "error", "Error");
            this.validarAnoDiagnostico_2_HC01451();
          } else this.validarMesDiagnostico_2_HC01451();
        }
      );
    },
    validarMesDiagnostico_2_HC01451() {
      validarInputs(
        {
          form: "#validarMesDiagnostico_2_HC01451",
          orden: "1",
        },
        () => this.validarAnoDiagnostico_2_HC01451(),
        () => {
          let mes = parseInt(this.fechas.diagn_2.mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "Mes fuera de rango", null, "error", "Error");
            this.validarMesDiagnostico_2_HC01451();
          } else this.validarDiaDiagnostico_2_HC01451();
        }
      );
    },
    validarDiaDiagnostico_2_HC01451() {
      validarInputs(
        {
          form: "#validarDiaDiagnostico_2_HC01451",
          orden: "1",
        },
        () => this.validarMesDiagnostico_2_HC01451(),
        () => {
          let dia_num = parseInt(this.fechas.diagn_2.dia) || 0;

          let ano = this.fechas.diagn_2.ano;
          let mes = this.fechas.diagn_2.mes;
          let dia = this.fechas.diagn_2.dia;

          if (dia_num < 1 || dia_num > 31) {
            CON851("37", "Dia fuera de rango", null, "error", "Error");
            this.validarDiaDiagnostico_2_HC01451();
          } else if (!_validarFecha(ano, mes, dia)) {
            CON851("37", "Fecha fuera de rango", null, "error", "Error");
            this.validarDiaDiagnostico_2_HC01451();
          } else {
            this.DETALLE_HISTORIA.ocup_9520.ante_labor.enf2_prof.fecha_enf2_prof =
              this.fechas.diagn_2.ano +
              this.fechas.diagn_2.mes.padStart(2, "0") +
              this.fechas.diagn_2.dia.padStart(2, "0");

            this.guardarHistoria(this.validarDiaDiagnostico_2_HC01451, this.validarAntecedentesQuirur);
          }
        }
      );
    },
    validarAntecedentesQuirur() {
      if (this.DETALLE_HISTORIA.Antecedentes_Quirurgicos.trim() == "")
        this.DETALLE_HISTORIA.Antecedentes_Quirurgicos = "No refiere";
      validarInputs(
        {
          form: "#validarAntecedentesQuirur",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.ocup_9520.ante_labor.hay_enf_prof == "S") this.validarDiaDiagnostico_2_HC01451();
          else this.validarEnfermedadProfesional();
        },
        () => {
          this.DETALLE_HISTORIA.Antecedentes_Quirurgicos = this.DETALLE_HISTORIA.Antecedentes_Quirurgicos.replaceEsp();

          let _this = this;
          grabarDetallesText(this.DETALLE_HISTORIA.Antecedentes_Quirurgicos, $_REG_HC.llave_hc + "2020")
            .then(() => {
              CON851("", "Antecedentes quirurgicos guardados", null, "success", "Correcto");
              _this.validarAntecedentesFarma();
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error guardando antecedentes quirurgicos", null, "error", "Error");
              _this.validarAntecedentesQuirur();
            });
        }
      );
    },
    validarAntecedentesFarma() {
      if (this.DETALLE_HISTORIA.Antecedentes_Farmacologicos.trim() == "")
        this.DETALLE_HISTORIA.Antecedentes_Farmacologicos = "No refiere";
      validarInputs(
        {
          form: "#validarAntecedentesFarma",
          orden: "1",
        },
        () => this.validarAntecedentesQuirur(),
        () => {
          this.DETALLE_HISTORIA.Antecedentes_Farmacologicos =
            this.DETALLE_HISTORIA.Antecedentes_Farmacologicos.replaceEsp();

          let _this = this;
          grabarDetallesText(this.DETALLE_HISTORIA.Antecedentes_Farmacologicos, $_REG_HC.llave_hc + "2030")
            .then(() => {
              CON851("", "Antecedentes farmacologicos guardados", null, "success", "Correcto");
              _this.validarAntecedentesToxico();
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error guardando antecedentes farmacologicos", null, "error", "Error");
              _this.validarAntecedentesFarma();
            });
        }
      );
    },
    validarAntecedentesToxico() {
      if (this.DETALLE_HISTORIA.Antecedentes_Toxico.trim() == "")
        this.DETALLE_HISTORIA.Antecedentes_Toxico = "No refiere";
      validarInputs(
        {
          form: "#validarAntecedentesToxico",
          orden: "1",
        },
        () => this.validarAntecedentesFarma(),
        () => {
          this.DETALLE_HISTORIA.Antecedentes_Toxico = this.DETALLE_HISTORIA.Antecedentes_Toxico.replaceEsp();

          let _this = this;
          grabarDetallesText(this.DETALLE_HISTORIA.Antecedentes_Toxico, $_REG_HC.llave_hc + "2035")
            .then(() => {
              CON851("", "Antecedentes toxicoalergicos guardados", null, "success", "Correcto");
              _this.validarAntecedentesTrauma();
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error guardando antecedentes toxicoalergicos", null, "error", "Error");
              _this.validarAntecedentesToxico();
            });
        }
      );
    },
    validarAntecedentesTrauma() {
      if (this.DETALLE_HISTORIA.Antecedentes_Traumatologicos.trim() == "")
        this.DETALLE_HISTORIA.Antecedentes_Traumatologicos = "No refiere";
      validarInputs(
        {
          form: "#validarAntecedentesTrauma",
          orden: "1",
        },
        () => this.validarAntecedentesToxico(),
        () => {
          this.DETALLE_HISTORIA.Antecedentes_Traumatologicos =
            this.DETALLE_HISTORIA.Antecedentes_Traumatologicos.replaceEsp();

          let _this = this;
          grabarDetallesText(this.DETALLE_HISTORIA.Antecedentes_Traumatologicos, $_REG_HC.llave_hc + "2040")
            .then(() => {
              CON851("", "Antecedentes traumatologicos guardados", null, "success", "Correcto");
              _this.validarEjercicioDep();
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error guardando antecedentes traumatologicos", null, "error", "Error");
              _this.validarAntecedentesTrauma();
            });
        }
      );
    },
    validarEjercicioDep() {
      validarInputs(
        {
          form: "#validarEjercicioDep",
          orden: "1",
        },
        () => this.validarAntecedentesTrauma(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.habitos.deporte = this.DETALLE_HISTORIA.ocup_9520.habitos.deporte
            .trim()
            .toUpperCase();

          this.validarHorasEjercicioDep();
        }
      );
    },
    validarHorasEjercicioDep() {
      validarInputs(
        {
          form: "#validarHorasEjercicioDep",
          orden: "1",
        },
        () => this.validarEjercicioDep(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.habitos.hr_deporte = this.validarNumero(
            this.DETALLE_HISTORIA.ocup_9520.habitos.hr_deporte
          );

          this.validarEjercicioChoque();
        }
      );
    },
    validarEjercicioChoque() {
      validarInputs(
        {
          form: "#validarEjercicioChoque",
          orden: "1",
        },
        () => this.validarHorasEjercicioDep(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.habitos.dep_choque = this.DETALLE_HISTORIA.ocup_9520.habitos.dep_choque
            .trim()
            .toUpperCase();

          this.validarHorasEjercicioChoque();
        }
      );
    },
    validarHorasEjercicioChoque() {
      validarInputs(
        {
          form: "#validarHorasEjercicioChoque",
          orden: "1",
        },
        () => this.validarEjercicioChoque(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.habitos.hr_dep_choque = this.validarNumero(
            this.DETALLE_HISTORIA.ocup_9520.habitos.hr_dep_choque
          );

          this.validarActManuales();
        }
      );
    },
    validarActManuales() {
      validarInputs(
        {
          form: "#validarActManuales",
          orden: "1",
        },
        () => this.validarHorasEjercicioChoque(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.habitos.act_manual = this.DETALLE_HISTORIA.ocup_9520.habitos.act_manual
            .trim()
            .toUpperCase();

          this.validarHorasActManuales();
        }
      );
    },
    validarHorasActManuales() {
      validarInputs(
        {
          form: "#validarHorasActManuales",
          orden: "1",
        },
        () => this.validarActManuales(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.habitos.hr_act_manual = this.validarNumero(
            this.DETALLE_HISTORIA.ocup_9520.habitos.hr_act_manual
          );

          this.validarOficiosDomesticos();
        }
      );
    },
    validarOficiosDomesticos() {
      validarInputs(
        {
          form: "#validarOficiosDomesticos",
          orden: "1",
        },
        () => this.validarHorasActManuales(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.habitos.hr_of_domes = this.DETALLE_HISTORIA.ocup_9520.habitos.hr_of_domes
            .trim()
            .toUpperCase();

          this.validarHorasOficiosDomesticos();
        }
      );
    },
    validarHorasOficiosDomesticos() {
      validarInputs(
        {
          form: "#validarHorasOficiosDomesticos",
          orden: "1",
        },
        () => this.validarOficiosDomesticos(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.habitos.hr_of_domes = this.validarNumero(
            this.DETALLE_HISTORIA.ocup_9520.habitos.hr_of_domes
          );

          this.guardarHistoria(this.validarHorasOficiosDomesticos, this.validarConsumoAlcohol);
        }
      );
    },
    validarConsumoAlcohol() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "ALCOHOL",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayConsumo,
            callback_f: () => this.validarHorasOficiosDomesticos(),
            seleccion: this.DETALLE_HISTORIA.ocup_9520.hab_ant.alcoh_ant,
            teclaAlterna: true,
            id_input: "#validarConsumoAlcohol",
          },
          (data) => {
            _this.DETALLE_HISTORIA.ocup_9520.hab_ant.alcoh_ant = data.COD;

            if (_this.DETALLE_HISTORIA.ocup_9520.hab_ant.alcoh_ant == "3") {
              _this.DETALLE_HISTORIA.ocup_9520.hab_ant.frec_alcoh_ant = "";
              _this.DETALLE_HISTORIA.ocup_9520.hab_ant.anos_alcoh_ant = "";
              _this.validarConsumoCigar();
            } else _this.validarFrecuenciaAlcohol();
          }
        );
      }, 300);
    },
    validarFrecuenciaAlcohol() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Frecuencia",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayFrecuencia,
            callback_f: () => this.validarConsumoAlcohol(),
            seleccion: this.DETALLE_HISTORIA.ocup_9520.hab_ant.frec_alcoh_ant,
            teclaAlterna: true,
            id_input: "#validarFrecuenciaAlcohol",
          },
          (data) => {
            _this.DETALLE_HISTORIA.ocup_9520.hab_ant.frec_alcoh_ant = data.COD;

            _this.validarAnosAlcohol();
          }
        );
      }, 300);
    },
    validarAnosAlcohol() {
      validarInputs(
        {
          form: "#validarAnosAlcohol",
          orden: "1",
        },
        () => this.validarFrecuenciaAlcohol(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.hab_ant.anos_alcoh_ant = this.validarNumero(
            this.DETALLE_HISTORIA.ocup_9520.hab_ant.anos_alcoh_ant
          );
          this.validarConsumoCigar();
        }
      );
    },
    validarConsumoCigar() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "TABACO/CIGARRILLO",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayConsumo,
            callback_f: () => {
              if (this.DETALLE_HISTORIA.ocup_9520.hab_ant.alcoh_ant == "3") this.validarConsumoAlcohol();
              else this.validarAnosAlcohol();
            },
            seleccion: this.DETALLE_HISTORIA.ocup_9520.hab_ant.tabac_ant,
            teclaAlterna: true,
            id_input: "#validarConsumoCigar",
          },
          (data) => {
            _this.DETALLE_HISTORIA.ocup_9520.hab_ant.tabac_ant = data.COD;

            if (_this.DETALLE_HISTORIA.ocup_9520.hab_ant.tabac_ant == "3") {
              _this.DETALLE_HISTORIA.ocup_9520.hab_ant.frec_tabac_ant = "";
              _this.DETALLE_HISTORIA.ocup_9520.hab_ant.anos_tabac_ant = "";
              _this.validarConsumoSustancias();
            } else _this.validarFrecuenciaCigar();
          }
        );
      }, 300);
    },
    validarFrecuenciaCigar() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Frecuencia",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayFrecuencia,
            callback_f: () => this.validarConsumoCigar(),
            seleccion: this.DETALLE_HISTORIA.ocup_9520.hab_ant.frec_tabac_ant,
            teclaAlterna: true,
            id_input: "#validarFrecuenciaCigar",
          },
          (data) => {
            _this.DETALLE_HISTORIA.ocup_9520.hab_ant.frec_tabac_ant = data.COD;

            _this.validarAnosCigar();
          }
        );
      }, 300);
    },
    validarAnosCigar() {
      validarInputs(
        {
          form: "#validarAnosCigar",
          orden: "1",
        },
        () => this.validarFrecuenciaCigar(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.hab_ant.anos_tabac_ant = this.validarNumero(
            this.DETALLE_HISTORIA.ocup_9520.hab_ant.anos_tabac_ant
          );
          this.validarConsumoSustancias();
        }
      );
    },
    validarConsumoSustancias() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "TABACO/CIGARRILLO",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayConsumo,
            callback_f: () => {
              if (this.DETALLE_HISTORIA.ocup_9520.hab_ant.tabac_ant == "3") this.validarConsumoCigar();
              else this.validarAnosCigar();
            },
            seleccion: this.DETALLE_HISTORIA.ocup_9520.hab_ant.psico_ant,
            teclaAlterna: true,
            id_input: "#validarConsumoSustancias",
          },
          (data) => {
            _this.DETALLE_HISTORIA.ocup_9520.hab_ant.psico_ant = data.COD;

            if (_this.DETALLE_HISTORIA.ocup_9520.hab_ant.psico_ant == "3") {
              _this.DETALLE_HISTORIA.ocup_9520.hab_ant.frec_psico_ant = "";
              _this.DETALLE_HISTORIA.ocup_9520.hab_ant.anos_psico_ant = "";
              _this.guardarHistoria(_this.validarConsumoSustancias, _this.validarDosisTetanos);
            } else _this.validarFrecuenciaSustancias();
          }
        );
      }, 300);
    },
    validarFrecuenciaSustancias() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Frecuencia",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayFrecuencia,
            callback_f: () => this.validarConsumoSustancias(),
            seleccion: this.DETALLE_HISTORIA.ocup_9520.hab_ant.frec_psico_ant,
            teclaAlterna: true,
            id_input: "#validarFrecuenciaSustancias",
          },
          (data) => {
            _this.DETALLE_HISTORIA.ocup_9520.hab_ant.frec_psico_ant = data.COD;

            _this.validarAnosSustancias();
          }
        );
      }, 300);
    },
    validarAnosSustancias() {
      validarInputs(
        {
          form: "#validarAnosSustancias",
          orden: "1",
        },
        () => this.validarFrecuenciaSustancias(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.hab_ant.anos_psico_ant = this.validarNumero(
            this.DETALLE_HISTORIA.ocup_9520.hab_ant.anos_psico_ant
          );

          this.guardarHistoria(this.validarAnosSustancias, this.validarDosisTetanos);
        }
      );
    },
    validarDosisTetanos() {
      validarInputs(
        {
          form: "#validarDosisTetanos",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.ocup_9520.hab_ant.psico_ant == "3") this.validarConsumoSustancias();
          else this.validarAnosSustancias();
        },
        () => {
          this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_tetan_dosis = this.validarNumero(
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_tetan_dosis,
            1
          );

          let vacuna = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_tetan_dosis);
          if (vacuna == 0) {
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_tetan_ano = "";
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_tetan_mes = "";
            this.validarDosisFiebre();
          } else this.validarAnoTetanos();
        }
      );
    },
    validarAnoTetanos() {
      validarInputs(
        {
          form: "#validarAnoTetanos",
          orden: "1",
        },
        () => this.validarDosisTetanos(),
        () => {
          let ano = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_tetan_ano) || 0;

          if (ano == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarAnoTetanos();
          } else if (ano < 1900) {
            CON851("37", "Año fuera de rango", null, "error", "Error");
            this.validarAnoTetanos();
          } else this.validarMesTetanos();
        }
      );
    },
    validarMesTetanos() {
      validarInputs(
        {
          form: "#validarMesTetanos",
          orden: "1",
        },
        () => this.validarAnoTetanos(),
        () => {
          let mes = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_tetan_mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "Mes fuera de rango", null, "error", "Error");
            this.validarMesTetanos();
          } else this.validarDosisFiebre();
        }
      );
    },
    validarDosisFiebre() {
      validarInputs(
        {
          form: "#validarDosisFiebre",
          orden: "1",
        },
        () => this.validarDosisTetanos(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_famar_dosis = this.validarNumero(
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_famar_dosis,
            1
          );

          let vacuna = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_famar_dosis);
          if (vacuna == 0) {
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_famar_ano = "";
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_famar_mes = "";
            this.validarDosisHepa_A();
          } else this.validarAnoFiebre();
        }
      );
    },
    validarAnoFiebre() {
      validarInputs(
        {
          form: "#validarAnoFiebre",
          orden: "1",
        },
        () => this.validarDosisFiebre(),
        () => {
          let ano = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_famar_ano) || 0;

          if (ano == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarAnoFiebre();
          } else if (ano < 1900) {
            CON851("37", "Año fuera de rango", null, "error", "Error");
            this.validarAnoFiebre();
          } else this.validarMesFiebre();
        }
      );
    },
    validarMesFiebre() {
      validarInputs(
        {
          form: "#validarMesFiebre",
          orden: "1",
        },
        () => this.validarAnoFiebre(),
        () => {
          let mes = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_famar_mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "Mes fuera de rango", null, "error", "Error");
            this.validarMesFiebre();
          } else this.validarDosisHepa_A();
        }
      );
    },
    validarDosisHepa_A() {
      validarInputs(
        {
          form: "#validarDosisHepa_A",
          orden: "1",
        },
        () => this.validarDosisFiebre(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_hepaa_dosis = this.validarNumero(
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_hepaa_dosis,
            1
          );

          let vacuna = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_hepaa_dosis);
          if (vacuna == 0) {
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_hepaa_ano = "";
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_hepaa_mes = "";
            this.validarDosisInfluenza();
          } else this.validarAnoHepa_A();
        }
      );
    },
    validarAnoHepa_A() {
      validarInputs(
        {
          form: "#validarAnoHepa_A",
          orden: "1",
        },
        () => this.validarDosisHepa_A(),
        () => {
          let ano = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_hepaa_ano) || 0;

          if (ano == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarAnoHepa_A();
          } else if (ano < 1900) {
            CON851("37", "Año fuera de rango", null, "error", "Error");
            this.validarAnoHepa_A();
          } else this.validarMesHepa_A();
        }
      );
    },
    validarMesHepa_A() {
      validarInputs(
        {
          form: "#validarMesHepa_A",
          orden: "1",
        },
        () => this.validarAnoHepa_A(),
        () => {
          let mes = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_hepaa_mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "Mes fuera de rango", null, "error", "Error");
            this.validarMesHepa_A();
          } else this.validarDosisInfluenza();
        }
      );
    },
    validarDosisInfluenza() {
      validarInputs(
        {
          form: "#validarDosisInfluenza",
          orden: "1",
        },
        () => this.validarDosisHepa_A(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_influ_dosis = this.validarNumero(
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_influ_dosis,
            1
          );

          let vacuna = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_influ_dosis);
          if (vacuna == 0) {
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_influ_ano = "";
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_influ_mes = "";
            this.validarDosisHepa_B();
          } else this.validarAnoInfluenza();
        }
      );
    },
    validarAnoInfluenza() {
      validarInputs(
        {
          form: "#validarAnoInfluenza",
          orden: "1",
        },
        () => this.validarDosisInfluenza(),
        () => {
          let ano = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_influ_ano) || 0;

          if (ano == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarAnoInfluenza();
          } else if (ano < 1900) {
            CON851("37", "Año fuera de rango", null, "error", "Error");
            this.validarAnoInfluenza();
          } else this.validarMesInfluenza();
        }
      );
    },
    validarMesInfluenza() {
      validarInputs(
        {
          form: "#validarMesInfluenza",
          orden: "1",
        },
        () => this.validarAnoInfluenza(),
        () => {
          let mes = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_influ_mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "Mes fuera de rango", null, "error", "Error");
            this.validarMesInfluenza();
          } else this.validarDosisHepa_B();
        }
      );
    },
    validarDosisHepa_B() {
      validarInputs(
        {
          form: "#validarDosisHepa_B",
          orden: "1",
        },
        () => this.validarDosisInfluenza(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_hepab_dosis = this.validarNumero(
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_hepab_dosis,
            1
          );

          let vacuna = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_hepab_dosis);
          if (vacuna == 0) {
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_hepab_ano = "";
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_hepab_mes = "";
            this.validarDosisOtra_1();
          } else this.validarAnoHepa_B();
        }
      );
    },
    validarAnoHepa_B() {
      validarInputs(
        {
          form: "#validarAnoHepa_B",
          orden: "1",
        },
        () => this.validarDosisHepa_B(),
        () => {
          let ano = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_hepab_ano) || 0;

          if (ano == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarAnoHepa_B();
          } else if (ano < 1900) {
            CON851("37", "Año fuera de rango", null, "error", "Error");
            this.validarAnoHepa_B();
          } else this.validarMesHepa_B();
        }
      );
    },
    validarMesHepa_B() {
      validarInputs(
        {
          form: "#validarMesHepa_B",
          orden: "1",
        },
        () => this.validarAnoHepa_B(),
        () => {
          let mes = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_hepab_mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "Mes fuera de rango", null, "error", "Error");
            this.validarMesHepa_B();
          } else this.validarDosisOtra_1();
        }
      );
    },
    validarDosisOtra_1() {
      validarInputs(
        {
          form: "#validarDosisOtra_1",
          orden: "1",
        },
        () => this.validarDosisHepa_B(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_otra1_dosis =
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_otra1_dosis.trim().toUpperCase();

          if (this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_otra1_dosis == "") {
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_otra1_ano = "";
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_otra1_mes = "";
            this.validarDosisOtra_2();
          } else this.validarAnoOtra_1();
        }
      );
    },
    validarAnoOtra_1() {
      validarInputs(
        {
          form: "#validarAnoOtra_1",
          orden: "1",
        },
        () => this.validarDosisOtra_1(),
        () => {
          let ano = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_otra1_ano) || 0;

          if (ano == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarAnoOtra_1();
          } else if (ano < 1900) {
            CON851("37", "Año fuera de rango", null, "error", "Error");
            this.validarAnoOtra_1();
          } else this.validarMesOtra_1();
        }
      );
    },
    validarMesOtra_1() {
      validarInputs(
        {
          form: "#validarMesOtra_1",
          orden: "1",
        },
        () => this.validarAnoOtra_1(),
        () => {
          let mes = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_otra1_mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "Mes fuera de rango", null, "error", "Error");
            this.validarMesOtra_1();
          } else this.validarDosisOtra_2();
        }
      );
    },
    validarDosisOtra_2() {
      validarInputs(
        {
          form: "#validarDosisOtra_2",
          orden: "1",
        },
        () => this.validarDosisOtra_1(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_otra2_dosis =
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_otra2_dosis.trim().toUpperCase();

          if (this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_otra2_dosis == "") {
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_otra2_ano = "";
            this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_otra2_mes = "";
            this.guardarHistoria(this.validarDosisOtra_2, this.validarExamenesRealizados);
          } else this.validarAnoOtra_2();
        }
      );
    },
    validarAnoOtra_2() {
      validarInputs(
        {
          form: "#validarAnoOtra_2",
          orden: "1",
        },
        () => this.validarDosisOtra_2(),
        () => {
          let ano = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_otra2_ano) || 0;

          if (ano == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarAnoOtra_2();
          } else if (ano < 1900) {
            CON851("37", "Año fuera de rango", null, "error", "Error");
            this.validarAnoOtra_2();
          } else this.validarMesOtra_2();
        }
      );
    },
    validarMesOtra_2() {
      validarInputs(
        {
          form: "#validarMesOtra_2",
          orden: "1",
        },
        () => this.validarAnoOtra_2(),
        () => {
          let mes = parseInt(this.DETALLE_HISTORIA.ocup_9520.vacun_ant.vac_otra2_mes) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "Mes fuera de rango", null, "error", "Error");
            this.validarMesOtra_2();
          } else this.guardarHistoria(this.validarMesOtra_2, this.validarExamenesRealizados);
        }
      );
    },
    validarExamenesRealizados() {
      validarInputs(
        {
          form: "#validarExamenesRealizados",
          orden: "1",
        },
        () => this.validarDosisOtra_2(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.resultados_ext = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.resultados_ext
          );

          if (this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.resultados_ext == "S") this.validarOptometria();
          else {
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso = detallesHc.WS_9520().examenes_ingreso;
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.resultados_ext = "N";
            this.validarPeso();
          }
        }
      );
    },
    validarOptometria() {
      validarInputs(
        {
          form: "#validarOptometria",
          orden: "1",
        },
        () => this.validarExamenesRealizados(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.optometria_ing = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.optometria_ing
          );

          this.validarAudiometria();
        }
      );
    },
    validarAudiometria() {
      validarInputs(
        {
          form: "#validarAudiometria",
          orden: "1",
        },
        () => this.validarOptometria(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.audiometria_ing = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.audiometria_ing
          );

          this.validarEspirometria();
        }
      );
    },
    validarEspirometria() {
      validarInputs(
        {
          form: "#validarEspirometria",
          orden: "1",
        },
        () => this.validarAudiometria(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.espirometria_ing = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.espirometria_ing
          );

          this.validarOsteomuscular();
        }
      );
    },
    validarOsteomuscular() {
      validarInputs(
        {
          form: "#validarOsteomuscular",
          orden: "1",
        },
        () => this.validarEspirometria(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.anex_osteo_ing = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.anex_osteo_ing
          );

          this.validarCardiovascular();
        }
      );
    },
    validarCardiovascular() {
      validarInputs(
        {
          form: "#validarCardiovascular",
          orden: "1",
        },
        () => this.validarOsteomuscular(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.anex_cardio_ing = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.anex_cardio_ing
          );

          this.validarAlturas();
        }
      );
    },
    validarAlturas() {
      validarInputs(
        {
          form: "#validarAlturas",
          orden: "1",
        },
        () => this.validarCardiovascular(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.anex_altu_ing = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.anex_altu_ing
          );

          this.validarPsicologia();
        }
      );
    },
    validarPsicologia() {
      validarInputs(
        {
          form: "#validarPsicologia",
          orden: "1",
        },
        () => this.validarAlturas(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.psicologia_ing = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.psicologia_ing
          );

          this.validarLaboratorios();
        }
      );
    },
    validarLaboratorios() {
      validarInputs(
        {
          form: "#validarLaboratorios",
          orden: "1",
        },
        () => this.validarPsicologia(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.laboratorios_ing = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.laboratorios_ing
          );

          if (this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.laboratorios_ing == "S") this.validarCuadroHematico();
          else {
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.cuadro_hematico = "";
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.glicemia = "";
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.parcial_orina = "";
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.perfil_lipidico = "";
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.alcohol_saliva = "";
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.marihuana_orina = "";
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.cocaina_orina = "";
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.creatinina = "";
            this.validarManipulacionAlim();
          }
        }
      );
    },
    validarCuadroHematico() {
      validarInputs(
        {
          form: "#validarCuadroHematico",
          orden: "1",
        },
        () => this.validarLaboratorios(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.cuadro_hematico = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.cuadro_hematico
          );

          this.validarGlicemia();
        }
      );
    },
    validarGlicemia() {
      validarInputs(
        {
          form: "#validarGlicemia",
          orden: "1",
        },
        () => this.validarCuadroHematico(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.glicemia = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.glicemia
          );

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
        () => this.validarGlicemia(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.parcial_orina = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.parcial_orina
          );

          this.validarPerfilLipidico();
        }
      );
    },
    validarPerfilLipidico() {
      validarInputs(
        {
          form: "#validarPerfilLipidico",
          orden: "1",
        },
        () => this.validarParcialOrina(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.perfil_lipidico = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.perfil_lipidico
          );

          this.validarAlcoholSaliva();
        }
      );
    },
    validarAlcoholSaliva() {
      validarInputs(
        {
          form: "#validarAlcoholSaliva",
          orden: "1",
        },
        () => this.validarPerfilLipidico(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.alcohol_saliva = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.alcohol_saliva
          );

          this.validarMarihuanaOrina();
        }
      );
    },
    validarMarihuanaOrina() {
      validarInputs(
        {
          form: "#validarMarihuanaOrina",
          orden: "1",
        },
        () => this.validarAlcoholSaliva(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.marihuana_orina = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.marihuana_orina
          );

          this.validarCocainaOrina();
        }
      );
    },
    validarCocainaOrina() {
      validarInputs(
        {
          form: "#validarCocainaOrina",
          orden: "1",
        },
        () => this.validarMarihuanaOrina(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.cocaina_orina = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.cocaina_orina
          );

          this.validarCreatinina();
        }
      );
    },
    validarCreatinina() {
      validarInputs(
        {
          form: "#validarCreatinina",
          orden: "1",
        },
        () => this.validarCocainaOrina(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.creatinina = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.creatinina
          );

          this.validarOtroExam_1();
        }
      );
    },
    validarOtroExam_1() {
      validarInputs(
        {
          form: "#validarOtroExam_1",
          orden: "1",
        },
        () => this.validarCreatinina(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.paraclin.otros_1 = this.DETALLE_HISTORIA.ocup_9520.paraclin.otros_1
            .trim()
            .toUpperCase();

          this.validarOtroExam_2();
        }
      );
    },
    validarOtroExam_2() {
      validarInputs(
        {
          form: "#validarOtroExam_2",
          orden: "1",
        },
        () => this.validarOtroExam_1(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.paraclin.otros_2 = this.DETALLE_HISTORIA.ocup_9520.paraclin.otros_2
            .trim()
            .toUpperCase();

          this.validarOtroExam_3();
        }
      );
    },
    validarOtroExam_3() {
      validarInputs(
        {
          form: "#validarOtroExam_3",
          orden: "1",
        },
        () => this.validarOtroExam_2(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.paraclin.otros_3 = this.DETALLE_HISTORIA.ocup_9520.paraclin.otros_3
            .trim()
            .toUpperCase();

          this.validarManipulacionAlim();
        }
      );
    },
    validarManipulacionAlim() {
      validarInputs(
        {
          form: "#validarManipulacionAlim",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.laboratorios_ing == "S") this.validarOtroExam_3();
          else this.validarLaboratorios();
        },
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.manipu_alimen_ing = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.manipu_alimen_ing
          );

          if (this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.manipu_alimen_ing == "S") this.validarKOH();
          else {
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.koh = "";
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.coprologico = "";
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.serologia = "";
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.frotis_garganta = "";
            this.guardarHistoria(this.validarManipulacionAlim, this.validarPeso);
          }
        }
      );
    },
    validarKOH() {
      validarInputs(
        {
          form: "#validarKOH",
          orden: "1",
        },
        () => this.validarManipulacionAlim(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.koh = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.koh
          );

          this.validarCoprologico();
        }
      );
    },
    validarCoprologico() {
      validarInputs(
        {
          form: "#validarCoprologico",
          orden: "1",
        },
        () => this.validarKOH(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.coprologico = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.coprologico
          );

          this.validarSerologia();
        }
      );
    },
    validarSerologia() {
      validarInputs(
        {
          form: "#validarSerologia",
          orden: "1",
        },
        () => this.validarCoprologico(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.serologia = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.serologia
          );

          this.validarFrotisGarganta();
        }
      );
    },
    validarFrotisGarganta() {
      validarInputs(
        {
          form: "#validarFrotisGarganta",
          orden: "1",
        },
        () => this.validarSerologia(),
        () => {
          this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.frotis_garganta = this.validarSiNo(
            this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.frotis_garganta
          );

          this.guardarHistoria(this.validarFrotisGarganta, this.validarPeso);
        }
      );
    },
    validarPeso() {
      validarInputs(
        {
          form: "#validarPeso",
          orden: "1",
        },
        () => {
          if (this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.laboratorios_ing == "S") {
            if (this.DETALLE_HISTORIA.ocup_9520.examenes_ingreso.manipu_alimen_ing == "S") this.validarFrotisGarganta();
            else this.validarManipulacionAlim();
          } else this.validarLaboratorios();
        },
        () => {
          var peso = parseFloat(this.global_HC01451.signos.peso);
          this.global_HC01451.signos.peso = this.mascaras.peso.resolve(this.global_HC01451.signos.peso);

          if (peso < 20 || peso > 300) {
            CON851("03", "03", null, "error", "Error");
            this.validarPeso();
          } else this.validarTalla();
        }
      );
    },
    validarTalla() {
      validarInputs(
        {
          form: "#validarTalla",
          orden: "1",
        },
        () => this.validarPeso(),
        () => {
          var talla = parseInt(this.global_HC01451.signos.talla);
          let unid_edad = this.global_HC01451.unid_edad;
          let edad = parseInt(this.global_HC01451.vlr_edad) || 0;
          let imc = parseFloat(this.global_HC01451.signos.imc_corp);

          if (talla < 50 || talla > 230) {
            CON851("03", "03", null, "error", "Error");
            this.validarTalla();
          } else {
            if (unid_edad == "A" && edad > 15) {
              if (imc >= 30) CON851("BC", "BC", null, "warning", "Advertencia");
              if (imc >= 25) CON851("BB", "BB", null, "warning", "Advertencia");
              if (imc < 16) CON851("BE", "BE", null, "warning", "Advertencia");
              if (imc <= 17) CON851("BD", "BD", null, "warning", "Advertencia");
            }
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
        () => this.validarTalla(),
        () => {
          let temp = parseFloat(this.global_HC01451.signos.temp);
          this.global_HC01451.signos.temp = this.mascaras.temp.resolve(this.global_HC01451.signos.temp);

          if (temp > 45) {
            CON851("03", "03", null, "error", "Error");
            this.validarTemperatura();
          } else {
            if (temp > 0 && (temp < 35.5 || temp > 38)) CON851("BM", "BM", null, "warning", "Advertencia");
            this.validarFC();
          }
        }
      );
    },
    validarFC() {
      validarInputs(
        {
          form: "#validarFC",
          orden: "1",
        },
        () => this.validarTemperatura(),
        () => {
          let fcard = parseInt(this.global_HC01451.signos.fcard) || 0;
          let edad = parseInt(this.global_HC01451.vlr_edad) || 0;

          if (fcard == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarFC();
          } else if (fcard > 200) {
            CON851("03", "03", null, "error", "Error");
            this.validarFC();
          } else {
            if (edad > 10 && (fcard < 60 || fcard > 100)) CON851("BK", "BK", null, "warning", "Advertencia");
            else if (fcard < 70 || fcard > 120) CON851("BK", "BK", null, "warning", "Advertencia");
            this.validarFR();
          }
        }
      );
    },
    validarFR() {
      validarInputs(
        {
          form: "#validarFR",
          orden: "1",
        },
        () => this.validarFC(),
        () => {
          let fresp = parseInt(this.global_HC01451.signos.fresp) || 0;
          let edad = parseInt(this.global_HC01451.vlr_edad) || 0;

          if (fresp == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarFR();
          } else if (fresp > 100) {
            CON851("03", "03", null, "error", "Error");
            this.validarFR();
          } else {
            if (edad > 8 && (fresp < 15 || fresp > 20)) CON851("BK", "BK", null, "warning", "Advertencia");
            else if (fresp < 20 || fresp > 30) CON851("BK", "BK", null, "warning", "Advertencia");
            this.validarSistole();
          }
        }
      );
    },
    validarSistole() {
      validarInputs(
        {
          form: "#validarSistole",
          orden: "1",
        },
        () => this.validarFR(),
        () => {
          let tens1 = parseInt(this.global_HC01451.signos.tens1) || 0;

          if (tens1 == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarSistole();
          } else if (tens1 > 300) {
            CON851("03", "03", null, "error", "Error");
            this.validarSistole();
          } else this.validarDiastole();
        }
      );
    },
    validarDiastole() {
      validarInputs(
        {
          form: "#validarDiastole",
          orden: "1",
        },
        () => this.validarSistole(),
        () => {
          let tens1 = parseInt(this.global_HC01451.signos.tens1);
          let tens2 = parseInt(this.global_HC01451.signos.tens2) || 0;

          if (tens2 == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarDiastole();
          } else if (tens2 > 300) {
            CON851("03", "03", null, "error", "Error");
            this.validarDiastole();
          } else {
            var calculo = Math.round((tens1 + tens2 * 2) / 3);

            this.global_HC01451.signos.tens_media = parseInt(calculo).toString();
            this.validarPerAbdom();
          }
        }
      );
    },
    validarPerAbdom() {
      validarInputs(
        {
          form: "#validarPerAbdom",
          orden: "1",
        },
        () => this.validarDiastole(),
        () => {
          let per_abdom = parseFloat(this.global_HC01451.signos.per_abdo);

          this.global_HC01451.signos.per_abdo = this.mascaras.per.resolve(this.global_HC01451.signos.per_abdo);

          if (per_abdom > 300) {
            CON851("03", "03", null, "error", "Error");
            this.validarPerAbdom();
          } else {
            // se omite condicion de RM de unid serv 08 porque siempre es 02

            switch (this.datos_paciente.SEXO) {
              case "F":
                if (per_abdom >= 80) CON851("EE", "EE", null, "error", "Error");
                break;
              case "M":
                if (per_abdom >= 90) CON851("EE", "EE", null, "error", "Error");
                break;
            }

            this.validarLateralidad();
          }
        }
      );
    },
    validarLateralidad() {
      let _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "LATERALIDAD DOMINANTE",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayLateralidad,
            callback_f: () => this.validarPerAbdom(),
            seleccion: this.global_HC01451.signos.lateral,
            teclaAlterna: true,
          },
          (data) => {
            _this.global_HC01451.signos.lateral = data.COD;

            _this.preguntarGuardado();
          }
        );
      }, 300);
    },
    preguntarGuardado() {
      CON851P("01", this.validarLateralidad, () =>
        this.guardarHistoria(this.validarLateralidad, this.grabadoFinal_HC01451)
      );
    },
    grabadoFinal_HC01451() {
      var _this = this;

      var data = {};

      data["datosh"] =
        datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|" + this.global_HC01451.novedad + "|";

      postData(data, get_url("APP/HICLIN/SAVE_HC9520.DLL"))
        .then((data) => {
          console.log(data);
          CON851("", data, null, "success", "Correcto");
          _this.salir_HC01451();
        })
        .catch((error) => {
          console.log(error);
          CON851("", "Ha ocurrido un error, intente de nuevo", null, "error", "Error");
          _this.validarLateralidad();
        });
    },
    async guardarHistoria(callbackErr, callback) {
      loader("show");
      var datos = _getObjetoSaveHc(this.global_HC01451, filtroArray.tablasHC);
      console.log(datos);

      await postData(datos, get_url("APP/HICLIN/SAVE_HC_2.DLL"))
        .then(async () => {
          loader("hide");
          await this.grabarDetalle9520(callbackErr, callback);
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          CON851("", "Error guardando datos historia, intente nuevamente", null, "error", "Error");
          callbackErr();
        });
    },
    async grabarDetalle9520(callbackErr, callback) {
      let detal = _getObjetoSaveHc(this.DETALLE_HISTORIA.ocup_9520, filtroArray.tabla9520);
      console.log(detal);

      await grabarDetalles({ 9520: detal }, $_REG_HC.llave_hc)
        .then(() => {
          CON851("", "Guardado correcto", null, "success", "Correcto");
          callback();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error guardando datos detalle, intente nuevamente", null, "error", "Error");
          callbackErr();
        });
    },
    validarSiNo(param) {
      return param.toUpperCase().trim() != "S" ? "N" : "S";
    },
    validarNumero(param, cant = 2) {
      return isNaN(parseInt(param)) ? "0".padStart(cant, "0") : parseInt(param).toString();
    },
    salir_HC01451() {
      _regresar_menuhis();
    },
  },
});
