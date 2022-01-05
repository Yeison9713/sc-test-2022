
// CREACION - CONTROL DE PLANIFICACION FAMILIAR - SANTIAGO.F - FEBRERO 24/2021

const { getObjRegHC } = require("../../HICLIN/scripts/reg_hc.js");

const {
  grabarDetalles,
  grabarDetallesText,
  detallesHc,
} = require("../../HICLIN/scripts/reg_dethc.js");

// queda pendiente en la funcion signosVitalesPeso() llamar el HC001 y el HC002N
// queda pendiente 2 impresiones de graficos de desarrollo y graficos de embarazadas funcion SignosVitalesCalcularIndices()

new Vue({
  el: '#HC8031',
  data: {

    modal_Embar: false,

    form: {
      año: '',
      mes: '',
      dia: '',
      hr: '',
      mn: '',

      victConflicto: '',

      medico: '',
      descripMedico: '',
      descrip_serv: '',
      folio: '',

      acompanante: '',
      tabla_motivo: '',

      ano_ultParto: '',
      mes_ultParto: '',
      dia_ultParto: '',

      ano_primEmbar: '',
      mes_primEmbar: '',
      dia_primEmbar: '',

      ano_regla: '',
      mes_regla: '',
      dia_regla: '',

      ano_citol: '',
      mes_citol: '',
      dia_citol: '',

      descripCiclo: '',
      descripResultCitol: '',

      descripPrueEmba: '',
      ano_prueEmb: '',
      mes_prueEmb: '',
      dia_prueEmb: '',

      ano_frotis: '',
      mes_frotis: '',
      dia_frotis: '',

      descripMetod: '',
      descripCualMetod: '',

      descripIndicDiu: '',
      descripIndicOral: '',
      descripIndicBarr: '',
      descripIndicDiuBarr: '',
      descripIndicImplSd: '',
      descripIndicSdBarr: '',
      descripIndicOralBarr: '',
      descripIndicInyectMen: '',
      descripIndicInyectBarr: '',
      descripIndicInyectTrim: '',
      descripIndicTrimBarr: '',
      descripIndicEmer: '',
      descripIndicEmerBarr: '',
      descripIndicEste: '',
      descripIndicEsteBarr: '',
      descripIndicCoiInt: '',
      descripIndicMetRit: '',

      descripNoUsaAntic: '',

      telefono_paci: '',
      direcc_paci: '',

      descripUndPeso: '',

      descripAspecGen: '',
      descripMama: '',
      descripPielFan: '',
      descripCabeza: '',
      descripAgudezaV: '',

      descripGenitalesExt: '',
      descripSaludBucal: '',
      descripCuelloTiroides: '',
      descripTorax: '',
      descripCardioPul: '',

      descripAbdomen: '',
      descripGenicoUri: '',
      descripColumna: '',
      descripExtremInfe: '',
      descripNeurolo: '',

      examenFisico: '',

      descripMetodo_eleg: '',
      brindaEduc: '',

      descripMetodAnt: '',
      descripExp_intrauterino: '',
      descripExp_subdermico: '',
      descripNuevo_metodo: '',

      ano_Cambio: '',
      mes_Cambio: '',
      dia_Cambio: '',

      descripRemitido: '',

      ano_Proxi: '',
      mes_Proxi: '',

      diagnosticos: [
        { nro: '01', cod: '', descrip: '' },
        { nro: '02', cod: '', descrip: '' },
        { nro: '03', cod: '', descrip: '' },
        { nro: '04', cod: '', descrip: '' },
        { nro: '05', cod: '', descrip: '' },
        { nro: '06', cod: '', descrip: '' },
        { nro: '07', cod: '', descrip: '' },
        { nro: '08', cod: '', descrip: '' },
        { nro: '09', cod: '', descrip: '' },
        { nro: '10', cod: '', descrip: '' },
      ],

      analisis: '',
      plan: '',

      descrip_embarazo: '',
      descrip_causa: '',
      descrip_tipo_diag: '',
      descrip_finalid: '',
      descrip_planific: '',

      ano_prox_cita: '',
      mes_prox_cita: '',
      dia_prox_cita: '',

      ano_primeraVez: '',
      mes_primeraVez: '',
      dia_primeraVez: '',

      descrip_estado_sal: '',
      descrip_diag_muer: '',

      descripMigra_aura_per: '',
    },

    modal_victimaConf: false,

    detalle_2035: {
      // se guarda alergias en el detalle 2035
      alergias: '',
    },

    dato_4040: {
      gineco_esq_w: {
        hemoglob_esq_w: '',
        toma_calcio_esq_w: '',
        toma_hierro_esq_w: '',
        toma_acidof_esq_w: '',
        gestaciones_esq_w: 0,
        partos_esq_w: 0,
        cesareas_esq_w: 0,
        gine_vivos_esq_w: 0,
        partos_termino_esq_w: 0,
        partos_prematuro_esq_w: 0,
        abortos_esq_w: 0,
        fecha_primer_embar_esq_w: '',
        ult_parto_esq_w: '',
        gine_muertos_esq_w: 0,
        menarquia_esq_w: 0,
        fecha_regla_esq_w: '',
        dismenorrea_esq_w: '',
        ciclos_esq_w: '',
        ciclo_irreg_esq_w: '',
        fecha_citol_esq_w: '',
        result_citol_esq_w: '',
        citol_anormal_esq_w: '',
        cirugias_gineco_esq_w: '',
        prueba_embarazo_esq_w: '',
        fecha_pru_emb_esq_w: '',
        frotis_flujo_esq_w: '',
        resultado_frotis_esq_w: '',
        fecha_frotis_esq_w: '',
      },

      obstetric_esq_w: {
        lactancia_esq_w: '',
        edad_gest_regla_esq_w: 0,
        edad_gest_ultra_esq_w: 0,
      }
    },

    formats: {},

    dato_8031: detallesHc.WS_8031(),

    dato_2079: detallesHc.WS_2079(),

    array_respuesta: _tipoJsonHc('respuesta'),
    array_parentesco: _tipoJsonHc('parentesco'),
    embarazo: [
      { COD: '1', DESCRIP: 'EMBARAZO PRIMER TRIMESTRE' },
      { COD: '2', DESCRIP: 'EMBARAZO SEGUNDO TRIMESTRE' },
      { COD: '3', DESCRIP: 'EMBARAZO TERCER TRIMESTRE' },
      { COD: '4', DESCRIP: 'NO ESTA EMBARAZADA' },
    ],

    ciclos: _tipoJsonHc('ciclos_menstruales'),

    resul_citol: [
      { cod: '1', descrip: 'NORMAL' },
      { cod: '2', descrip: 'ANORMAL' },
      { cod: '3', descrip: 'NO APLICA' },
      { cod: '4', descrip: 'NO SABE' },
    ],

    prueba_embar: [
      { cod: '1', descrip: 'POSITIVO' },
      { cod: '2', descrip: 'NEGATIVO' },
      { cod: '3', descrip: 'NO APLICA' },
    ],

    embarMetod: [
      { cod: '1', descrip: 'SI' },
      { cod: '2', descrip: 'NO' },
      { cod: '3', descrip: 'NO SABE' },
    ],

    cualEmbarMetod: [
      { cod: '1', descrip: 'DIU' },
      { cod: '2', descrip: 'ORAL' },
      { cod: '3', descrip: 'BARRERA' },
      { cod: '4', descrip: 'OTRO' },
      { cod: '5', descrip: 'NINGUNO' },
      { cod: '6', descrip: 'DIU + BARRERA' },
      { cod: '7', descrip: 'IMPLE. SUBDERMICO' },
      { cod: '8', descrip: 'I. SUBDERM + BARRERA' },
      { cod: '9', descrip: 'ORAL + BARRERA' },
      { cod: 'A', descrip: 'INYECTABLE MENSUAL' },
      { cod: 'B', descrip: 'INYECTABLE + BARRERA' },
      { cod: 'C', descrip: 'INYECTABLE TRIMEST' },
      { cod: 'D', descrip: 'TRIMESTRAL + BARRERA' },
      { cod: 'E', descrip: 'EMERGENCIA' },
      { cod: 'F', descrip: 'EMERGENCIA + BARRERA' },
      { cod: 'G', descrip: 'ESTERILIZACION' },
      { cod: 'H', descrip: 'ESTERILIZACION + BARRERA' },
      { cod: 'I', descrip: 'NO USA X TRADICION' },
      { cod: 'J', descrip: 'NO USA X SALUD' },
      { cod: 'K', descrip: 'NO USA X NEGACION' },
      { cod: 'L', descrip: 'COITUS INTERRUPTUS' },
      { cod: 'M', descrip: 'METODO DEL RITMO' },
    ],

    indicPor: [
      { cod: '1', descrip: 'MEDICO' },
      { cod: '2', descrip: 'AUTOINDICADO' },
      { cod: '3', descrip: 'AMIGO(A)' },
      { cod: '4', descrip: 'OTRO' },
      { cod: '5', descrip: 'ENFERMERA' },
    ],

    noUsaAntic: [
      { cod: '1', descrip: 'NO USA X TRADICION' },
      { cod: '2', descrip: 'NO USA X SALUD' },
      { cod: '3', descrip: 'NO USA X NEGACION' },
      { cod: '4', descrip: 'NO APLICA' },
    ],

    signosVitales: [
      { cod: 'N', descrip: 'NORMAL' },
      { cod: 'A', descrip: 'ANORMAL' },
      { cod: '9', descrip: 'NO APLICA' },
      { cod: '0', descrip: 'NO SE VALORA' },
    ],

    array_aper_ocul: _tipoJsonHc("aper_ocul"),
    array_resp_verb: _tipoJsonHc("resp_verb"),
    array_resp_moto: _tipoJsonHc("resp_moto"),
    array_causa: _tipoJsonHc('causa'),
    array_tipo_diag: _tipoJsonHc('tipo_diagnostico'),
    array_finalid: _tipoJsonHc('finalid'),
    array_salida: _tipoJsonHc('salida'),

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

    params_hc890h: {
      estado: false,
      pregunta: 0,
      ciudades: [],
      paises: []
    },

    params_hc890d: {
      estado: false,
      unserv: null,
      finalidad: null,
      sexo: null,
    },

    mostrarSintomaticos: false,

    modal_fuma: false,

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
    stylesHC8031: {
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
    mostrarTacto: false,
    params_tacto: {
      estado: false
    },
    datos_tacto: {},

    covid19: getObjRegHC().covid19,

    fecha_act: moment().format("YYYYMMDD"),
    hcprc: getObjRegHC(),
    hora_act: moment().format("HHmm"),
    nit_usu: $_USUA_GLOBAL[0].NIT,
    nro_ult_comp: '',
  },
  components: {
    covid19: component_hc890h,
    agudeza_visual: require("../../HICLIN/scripts/HC890G.vue.js"),
    tacto: require("../../HICLIN/scripts/HC890O.vue.js"),
    sintomaticos: component_hc890d,
    creatinina: require("../../HICLIN/scripts/HC890A.vue.js"),
  },
  async created() {
    $this = this;

    _inputControl('disabled');
    _inputControl('reset');

    await this.cargarHc_HC8031('1');
    console.clear()
  },
  watch: {
    "dato_8031.dato_per": {
      handler(val) {
        Object.keys(val).forEach(a => {
          this.validar_formato_per(a);
        })
      },
      deep: true,
    },
    "dato_8031.dato_fam": {
      handler(val) {
        Object.keys(val).forEach(a => {
          this.validar_formato_fam(a);
        })
      },
      deep: true,
    },
    'form.acompanante': function (val) {
      this.form.acompanante = val ? val.replaceEsp() : ''
    },

    'form.tabla_motivo': function (val) {
      this.form.tabla_motivo = val ? val.replaceEsp() : ''
    },

    'dato_8031.dato_fam2.cual_hiper': function (val) {
      this.dato_8031.dato_fam2.cual_hiper = val ? val.replaceEsp() : ''
    },

    'dato_8031.dato_fam2.cual_diabet': function (val) {
      this.dato_8031.dato_fam2.cual_diabet = val ? val.replaceEsp() : ''
    },

    'dato_8031.dato_fam2.cual_cardipo': function (val) {
      this.dato_8031.dato_fam2.cual_cardipo = val ? val.replaceEsp() : ''
    },

    'dato_8031.dato_fam2.cual_cuello': function (val) {
      this.dato_8031.dato_fam2.cual_cuello = val ? val.replaceEsp() : ''
    },

    'dato_8031.dato_fam2.cual_mama': function (val) {
      this.dato_8031.dato_fam2.cual_mama = val ? val.replaceEsp() : ''
    },

    'dato_8031.dato_fam2.cual_otro_can': function (val) {
      this.dato_8031.dato_fam2.cual_otro_can = val ? val.replaceEsp() : ''
    },

    'dato_8031.dato_fam2.cual_enf_mental': function (val) {
      this.dato_8031.dato_fam2.cual_enf_mental = val ? val.replaceEsp() : ''
    },

    'dato_8031.dato_fam2.cual_gineco_obs': function (val) {
      this.dato_8031.dato_fam2.cual_gineco_obs = val ? val.replaceEsp() : ''
    },

    'dato_8031.dato_fam2.cual_violencia': function (val) {
      this.dato_8031.dato_fam2.cual_violencia = val ? val.replaceEsp() : ''
    },

    'dato_8031.dato_fam.otros_antec_fam': function (val) {
      this.dato_8031.dato_fam.otros_antec_fam = val ? val.replaceEsp() : ''
    },

    'dato_8031.dato_fam3.cual_its_per': function (val) {
      this.dato_8031.dato_fam3.cual_its_per = val ? val.replaceEsp() : ''
    },

    'detalles.alergias': function (val) {
      this.detalle_2035.alergias = val ? val.replaceEsp() : ''
    },

    'dato_8031.dato_per.cual_cirug_per': function (val) {
      this.dato_8031.dato_per.cual_cirug_per = val ? val.replaceEsp() : ''
    },

    'dato_8031.dato_per.otros_antec_per': function (val) {
      this.dato_8031.dato_per.otros_antec_per = val ? val.replaceEsp() : ''
    },

    'dato_4040.gineco_esq_w.ciclo_irreg_esq_w': function (val) {
      this.dato_4040.gineco_esq_w.ciclo_irreg_esq_w = val ? val.replaceEsp() : ''
    },

    'dato_4040.gineco_esq_w.citol_anormal_esq_w': function (val) {
      this.dato_4040.gineco_esq_w.citol_anormal_esq_w = val ? val.replaceEsp() : ''
    },

    'dato_4040.gineco_esq_w.cirugias_gineco_esq_w': function (val) {
      this.dato_4040.gineco_esq_w.cirugias_gineco_esq_w = val ? val.replaceEsp() : ''
    },

    'dato_4040.gineco_esq_w.resultado_frotis_esq_w': function (val) {
      this.dato_4040.gineco_esq_w.resultado_frotis_esq_w = val ? val.replaceEsp() : ''
    },

    'dato_8031.dato_soc_cul.cual_apoy_social': function (val) {
      this.dato_8031.dato_soc_cul.cual_apoy_social = val ? val.replaceEsp() : ''
    },

    'form.examenFisico': function (val) {
      this.form.examenFisico = val ? val.replaceEsp() : ''
    },

    'form.brindaEduc': function (val) {
      this.form.brindaEduc = val ? val.replaceEsp() : ''
    },

    'dato_8031.asesoria_eleccion.cual_examen_prac': function (val) {
      this.dato_8031.asesoria_eleccion.cual_examen_prac = val ? val.replaceEsp() : ''
    },

    'dato_8031.asesoria_eleccion.cual_tema': function (val) {
      this.dato_8031.asesoria_eleccion.cual_tema = val ? val.replaceEsp() : ''
    },

    'form.analisis': function (val) {
      this.form.analisis = val ? val.replaceEsp() : ''
    },

    'form.plan': function (val) {
      this.form.plan = val ? val.replaceEsp() : ''
    },
  },

  computed: {
    mostrarCovid() {
      switch (this.hcprc.serv) {
        case '01':
        case '02':
        case '08':
        case '09':
        case '63':
          return true;
      }
    },
  },

  methods: {
    validar_formato_fam(formato) {
      let x = this.array_respuesta.find(el => el.COD == this.dato_8031.dato_fam[formato]);
      let descripcion = x ? x.DESCRIP : ''
      Vue.set(this.formats, formato, descripcion)
    },

    validar_formato_per(formato) {
      let x = this.array_respuesta.find(el => el.COD == this.dato_8031.dato_per[formato]);
      let descripcion = x ? x.DESCRIP : ''
      Vue.set(this.formats, formato, descripcion)
    },


    _inicializar_HC8031() {
      loader('hide')

      if (this.dato_8031.tipo == 1) {
        nombreOpcion('Historia Clinica Primera Vez Planificacion Familiar');
      } else {
        nombreOpcion('Historia Clinica Control Planificacion Familiar');
      }


      this.buscarConsultaExterna();
    },

    async buscarConsultaExterna() {
      postData({ datosh: datosEnvio() + localStorage.Usuario + '|' + $_REG_PACI.COD + '|' + $_REG_HC.serv_hc + '|' + moment().format('YYYYMMDD') + '|' }, get_url("APP/HICLIN/HC811B.DLL"))
        .then(data => {
          console.log(data);
          this.nro_ult_comp = data;
          this.iniciar_HC8031();
        })
        .catch(err => {
          console.error(err)
          _regresar_menuhis();
        });
    },

    async iniciar_HC8031() {
      await this.encabezar();
    },

    async encabezar() {
      this.form.medico = $_REG_PROF.IDENTIFICACION;
      this.form.descripMedico = $_REG_PROF.NOMBRE;

      this.form.año = this.fecha_act.substring(0, 4);
      this.form.mes = this.fecha_act.substring(4, 6);
      this.form.dia = this.fecha_act.substring(6, 8);

      this.form.hr = this.hora_act.substring(0, 2);
      this.form.mn = this.hora_act.substring(2, 4);

      this.form.folio = $_REG_HC.llave_hc.substring(15, 23);

      await postData({ datosh: datosEnvio() + $_REG_HC.serv_hc + '|' }, get_url("APP/SALUD/SER873-1.DLL"))
        .then(async (data) => {
          data = data.UNSERV;
          this.form.descrip_serv = data.DESCRIP;
        })
        .catch((err) => {
          CON851('', 'Error consultando unidades de servicio', null, 'error', 'error')
          console.log(err);
        })

      if (this.hcprc.novedad == '7') {
        this.hcprc.fecha = this.form.año + this.form.mes + this.form.dia;
        this.hcprc.hora = this.form.hr + this.form.mn;
        this.hcprc.rips.atiende = $_REG_PROF.ATIENDE_PROF;
        this.hcprc.med = $_REG_PROF.IDENTIFICACION;
        this.hcprc.oper_elab = localStorage.Usuario;
        this.hcprc.serv = $_REG_HC.serv_hc;
        this.hcprc.cierre.nit_fact = $_REG_PACI["NIT-FACT"];
        this.hcprc.cierre.temporal = 1;
        this.hcprc.unid_edad = $_REG_HC.edad_hc.unid_edad;
        this.hcprc.vlr_edad = $_REG_HC.edad_hc.vlr_edad;
        this.hcprc.nit_contabilidad = this.nit_usu;
        this.hcprc.rips.finalid = $_REG_HC.finalid_hc;

        this.hcprc.edad_dias = SC_DIAS($_REG_PACI.NACIM, this.hcprc.fecha);

        console.log('novedad: ', this.hcprc.novedad);
        console.log('finalidad: ', this.hcprc.rips.finalid);

        await this.crear_historia();
      } else {
        // novedad es 8
        console.log('novedad: ', this.hcprc.novedad);
        console.log('finalidad: ', this.hcprc.rips.finalid);

        this.form.acompanante = this.hcprc.acompa;
        this.form.tabla_motivo = this.hcprc.motiv.replace(/(?:\&)/g, "\n");

        let busqDetalle_8031 = this.detalles.find(el => el['COD-DETHC'] == '8031' && el['LLAVE-HC'] == $_REG_HC.llave_hc)
        if (busqDetalle_8031) {
          this.dato_8031 = busqDetalle_8031.DETALLE;
        }

        let busqDetalle_2035 = this.detalles.find(el => el['COD-DETHC'] == '2035' && el['LLAVE-HC'] == $_REG_HC.llave_hc)
        if (busqDetalle_2035) {
          this.detalle_2035.alergias = busqDetalle_2035.DETALLE;
        }

        let busqDetalle_4040 = this.detalles.find(el => el['COD-DETHC'] == '4040' && el['LLAVE-HC'] == $_REG_HC.llave_hc)
        if (busqDetalle_4040) {
          this.dato_4040 = busqDetalle_4040.DETALLE;
        }

        let busqDetalle_4005 = this.detalles.find(el => el['COD-DETHC'] == '4005' && el['LLAVE-HC'] == $_REG_HC.llave_hc)
        if (busqDetalle_4005) {
          this.form.examenFisico = busqDetalle_4005.DETALLE.replace(/(?:\&)/g, "\n");
        }

        this.form.ano_ultParto = this.dato_4040.gineco_esq_w.ult_parto_esq_w.substring(0, 4);
        this.form.mes_ultParto = this.dato_4040.gineco_esq_w.ult_parto_esq_w.substring(4, 6);
        this.form.dia_ultParto = this.dato_4040.gineco_esq_w.ult_parto_esq_w.substring(4, 6);

        this.form.ano_primEmbar = this.dato_4040.gineco_esq_w.fecha_primer_embar_esq_w.substring(0, 4);
        this.form.mes_primEmbar = this.dato_4040.gineco_esq_w.fecha_primer_embar_esq_w.substring(4, 6);
        this.form.dia_primEmbar = this.dato_4040.gineco_esq_w.fecha_primer_embar_esq_w.substring(6, 8);

        this.form.ano_regla = this.dato_4040.gineco_esq_w.fecha_regla_esq_w.substring(0, 4);
        this.form.mes_regla = this.dato_4040.gineco_esq_w.fecha_regla_esq_w.substring(4, 6);
        this.form.dia_regla = this.dato_4040.gineco_esq_w.fecha_regla_esq_w.substring(6, 8);

        this.form.ano_citol = this.dato_4040.gineco_esq_w.fecha_citol_esq_w.substring(0, 4);
        this.form.mes_citol = this.dato_4040.gineco_esq_w.fecha_citol_esq_w.substring(4, 6);
        this.form.dia_citol = this.dato_4040.gineco_esq_w.fecha_citol_esq_w.substring(6, 8);

        switch (this.dato_4040.gineco_esq_w.ciclos_esq_w) {
          case '1': this.form.descripCiclo = 'REGULARES'; break;
          case '2': this.form.descripCiclo = 'IREGULARES'; break;
          default: this.form.descripCiclo = ''; break;
        }

        switch (this.dato_4040.gineco_esq_w.result_citol_esq_w) {
          case '1': this.form.descripResultCitol = 'NORMAL'; break;
          case '2': this.form.descripResultCitol = 'ANORMAL'; break;
          case '3': this.form.descripResultCitol = 'NO APLICA'; break;
          case '4': this.form.descripResultCitol = 'NO SABE'; break;
          default: this.form.descripResultCitol = ''; break;
        }

        switch (this.dato_4040.gineco_esq_w.prueba_embarazo_esq_w) {
          case '1': this.form.descripPrueEmba = 'POSITIVO'; break;
          case '2': this.form.descripPrueEmba = 'NEGATIVO'; break;
          case '3': this.form.descripPrueEmba = 'NO APLICA'; break;
          default: this.form.descripPrueEmba = ''; break;
        }
        this.form.ano_prueEmb = this.dato_4040.gineco_esq_w.fecha_pru_emb_esq_w.substring(0, 4);
        this.form.mes_prueEmb = this.dato_4040.gineco_esq_w.fecha_pru_emb_esq_w.substring(4, 6);
        this.form.dia_prueEmb = this.dato_4040.gineco_esq_w.fecha_pru_emb_esq_w.substring(6, 8);

        this.form.ano_frotis = this.dato_4040.gineco_esq_w.fecha_frotis_esq_w.substring(0, 4);
        this.form.mes_frotis = this.dato_4040.gineco_esq_w.fecha_frotis_esq_w.substring(4, 6);
        this.form.dia_frotis = this.dato_4040.gineco_esq_w.fecha_frotis_esq_w.substring(6, 8);

        let busqDetalle_2079 = this.detalles.find(el => el['COD-DETHC'] == '2079' && el['LLAVE-HC'] == $_REG_HC.llave_hc)
        if (busqDetalle_2079) {
          this.dato_2079 = busqDetalle_2079.DETALLE;
        }

        switch (this.dato_2079.emb_otros_metodos) {
          case '1': this.form.descripMetod = 'SI'; break;
          case '2': this.form.descripMetod = 'NO'; break;
          case '3': this.form.descripMetod = 'NO SABE'; break;
          default: this.form.descripMetod = ''; break;
        }

        switch (this.dato_2079.cual_emb_metodo) {
          case '1': this.form.descripCualMetod = 'DIU'; break;
          case '2': this.form.descripCualMetod = 'ORAL'; break;
          case '3': this.form.descripCualMetod = 'BARRERA'; break;
          case '4': this.form.descripCualMetod = 'OTRO'; break;
          case '5': this.form.descripCualMetod = 'NINGUNO'; break;
          case '6': this.form.descripCualMetod = 'DIU + BARRERA'; break;
          case '7': this.form.descripCualMetod = 'IMPLE. SUBDERMICO'; break;
          case '8': this.form.descripCualMetod = 'I. SUBDERM + BARRERA'; break;
          case '9': this.form.descripCualMetod = 'ORAL + BARRERA'; break;
          case 'A': this.form.descripCualMetod = 'INYECTABLE MENSUAL'; break;
          case 'B': this.form.descripCualMetod = 'INYECTABLE + BARRERA'; break;
          case 'C': this.form.descripCualMetod = 'INYECTABLE TRIMEST'; break;
          case 'D': this.form.descripCualMetod = 'TRIMESTRAL + BARRERA'; break;
          case 'E': this.form.descripCualMetod = 'EMERGENCIA'; break;
          case 'F': this.form.descripCualMetod = 'EMERGENCIA + BARRERA'; break;
          case 'G': this.form.descripCualMetod = 'ESTERILIZACION'; break;
          case 'H': this.form.descripCualMetod = 'ESTERILIZACION + BARRERA'; break;
          case 'I': this.form.descripCualMetod = 'NO USA X TRADICION'; break;
          case 'J': this.form.descripCualMetod = 'NO USA X SALUD'; break;
          case 'K': this.form.descripCualMetod = 'NO USA X NEGACION'; break;
          case 'L': this.form.descripCualMetod = 'COITUS INTERRUPTUS'; break;
          case 'M': this.form.descripCualMetod = 'METODO DEL RITMO'; break;
          default: this.form.descripCualMetod = ''; break;
        }

        switch (this.dato_2079.no_uso_antic) {
          case '1': this.form.descripNoUsaAntic = 'NO USA X TRADICION'; break;
          case '2': this.form.descripNoUsaAntic = 'NO USA X SALUD'; break;
          case '3': this.form.descripNoUsaAntic = 'NO USA X NEGACION'; break;
          case '4': this.form.descripNoUsaAntic = 'NO APLICA'; break;
          default: this.form.descripNoUsaAntic = ''; break;
        }

        switch (this.dato_2079.diu.diu_indic) {
          case '1': this.form.descripIndicDiu = 'MEDICO'; break;
          case '2': this.form.descripIndicDiu = 'AUTOINDICADO'; break;
          case '3': this.form.descripIndicDiu = 'AMIGO(A)'; break;
          case '4': this.form.descripIndicDiu = 'OTRO'; break;
          case '5': this.form.descripIndicDiu = 'ENFERMERA'; break;
          default: this.form.descripIndicDiu = ''; break;
        }

        switch (this.dato_2079.oral.oral_indic) {
          case '1': this.form.descripIndicOral = 'MEDICO'; break;
          case '2': this.form.descripIndicOral = 'AUTOINDICADO'; break;
          case '3': this.form.descripIndicOral = 'AMIGO(A)'; break;
          case '4': this.form.descripIndicOral = 'OTRO'; break;
          case '5': this.form.descripIndicOral = 'ENFERMERA'; break;
          default: this.form.descripIndicOral = ''; break;
        }

        switch (this.dato_2079.barr.barr_indic) {
          case '1': this.form.descripIndicBarr = 'MEDICO'; break;
          case '2': this.form.descripIndicBarr = 'AUTOINDICADO'; break;
          case '3': this.form.descripIndicBarr = 'AMIGO(A)'; break;
          case '4': this.form.descripIndicBarr = 'OTRO'; break;
          case '5': this.form.descripIndicBarr = 'ENFERMERA'; break;
          default: this.form.descripIndicBarr = ''; break;
        }

        switch (this.dato_2079.diu_barr.diu_barr_indic) {
          case '1': this.form.descripIndicDiuBarr = 'MEDICO'; break;
          case '2': this.form.descripIndicDiuBarr = 'AUTOINDICADO'; break;
          case '3': this.form.descripIndicDiuBarr = 'AMIGO(A)'; break;
          case '4': this.form.descripIndicDiuBarr = 'OTRO'; break;
          case '5': this.form.descripIndicDiuBarr = 'ENFERMERA'; break;
          default: this.form.descripIndicDiuBarr = ''; break;
        }

        switch (this.dato_2079.impl_sd.impl_sd_indic) {
          case '1': this.form.descripIndicImplSd = 'MEDICO'; break;
          case '2': this.form.descripIndicImplSd = 'AUTOINDICADO'; break;
          case '3': this.form.descripIndicImplSd = 'AMIGO(A)'; break;
          case '4': this.form.descripIndicImplSd = 'OTRO'; break;
          case '5': this.form.descripIndicImplSd = 'ENFERMERA'; break;
          default: this.form.descripIndicImplSd = ''; break;
        }

        switch (this.dato_2079.sd_barr.sd_barr_indic) {
          case '1': this.form.descripIndicSdBarr = 'MEDICO'; break;
          case '2': this.form.descripIndicSdBarr = 'AUTOINDICADO'; break;
          case '3': this.form.descripIndicSdBarr = 'AMIGO(A)'; break;
          case '4': this.form.descripIndicSdBarr = 'OTRO'; break;
          case '5': this.form.descripIndicSdBarr = 'ENFERMERA'; break;
          default: this.form.descripIndicSdBarr = ''; break;
        }

        switch (this.dato_2079.oral_barr.oral_barr_indic) {
          case '1': this.form.descripIndicOralBarr = 'MEDICO'; break;
          case '2': this.form.descripIndicOralBarr = 'AUTOINDICADO'; break;
          case '3': this.form.descripIndicOralBarr = 'AMIGO(A)'; break;
          case '4': this.form.descripIndicOralBarr = 'OTRO'; break;
          case '5': this.form.descripIndicOralBarr = 'ENFERMERA'; break;
          default: this.form.descripIndicOralBarr = ''; break;
        }

        switch (this.dato_2079.inyec_men.inyec_men_indic) {
          case '1': this.form.descripIndicInyectMen = 'MEDICO'; break;
          case '2': this.form.descripIndicInyectMen = 'AUTOINDICADO'; break;
          case '3': this.form.descripIndicInyectMen = 'AMIGO(A)'; break;
          case '4': this.form.descripIndicInyectMen = 'OTRO'; break;
          case '5': this.form.descripIndicInyectMen = 'ENFERMERA'; break;
          default: this.form.descripIndicInyectMen = ''; break;
        }

        switch (this.dato_2079.men_barr.men_barr_indic) {
          case '1': this.form.descripIndicInyectBarr = 'MEDICO'; break;
          case '2': this.form.descripIndicInyectBarr = 'AUTOINDICADO'; break;
          case '3': this.form.descripIndicInyectBarr = 'AMIGO(A)'; break;
          case '4': this.form.descripIndicInyectBarr = 'OTRO'; break;
          case '5': this.form.descripIndicInyectBarr = 'ENFERMERA'; break;
          default: this.form.descripIndicInyectBarr = ''; break;
        }

        switch (this.dato_2079.inyec_tri.inyec_tri_indic) {
          case '1': this.form.descripIndicInyectTrim = 'MEDICO'; break;
          case '2': this.form.descripIndicInyectTrim = 'AUTOINDICADO'; break;
          case '3': this.form.descripIndicInyectTrim = 'AMIGO(A)'; break;
          case '4': this.form.descripIndicInyectTrim = 'OTRO'; break;
          case '5': this.form.descripIndicInyectTrim = 'ENFERMERA'; break;
          default: this.form.descripIndicInyectTrim = ''; break;
        }

        switch (this.dato_2079.tri_barr.tri_barr_indic) {
          case '1': this.form.descripIndicTrimBarr = 'MEDICO'; break;
          case '2': this.form.descripIndicTrimBarr = 'AUTOINDICADO'; break;
          case '3': this.form.descripIndicTrimBarr = 'AMIGO(A)'; break;
          case '4': this.form.descripIndicTrimBarr = 'OTRO'; break;
          case '5': this.form.descripIndicTrimBarr = 'ENFERMERA'; break;
          default: this.form.descripIndicTrimBarr = ''; break;
        }

        switch (this.dato_2079.emerg.emerg_indic) {
          case '1': this.form.descripIndicEmer = 'MEDICO'; break;
          case '2': this.form.descripIndicEmer = 'AUTOINDICADO'; break;
          case '3': this.form.descripIndicEmer = 'AMIGO(A)'; break;
          case '4': this.form.descripIndicEmer = 'OTRO'; break;
          case '5': this.form.descripIndicEmer = 'ENFERMERA'; break;
          default: this.form.descripIndicEmer = ''; break;
        }

        switch (this.dato_2079.emerg_barr.emerg_barr_indic) {
          case '1': this.form.descripIndicEmerBarr = 'MEDICO'; break;
          case '2': this.form.descripIndicEmerBarr = 'AUTOINDICADO'; break;
          case '3': this.form.descripIndicEmerBarr = 'AMIGO(A)'; break;
          case '4': this.form.descripIndicEmerBarr = 'OTRO'; break;
          case '5': this.form.descripIndicEmerBarr = 'ENFERMERA'; break;
          default: this.form.descripIndicEmerBarr = ''; break;
        }

        switch (this.dato_2079.ester.ester_indic) {
          case '1': this.form.descripIndicEste = 'MEDICO'; break;
          case '2': this.form.descripIndicEste = 'AUTOINDICADO'; break;
          case '3': this.form.descripIndicEste = 'AMIGO(A)'; break;
          case '4': this.form.descripIndicEste = 'OTRO'; break;
          case '5': this.form.descripIndicEste = 'ENFERMERA'; break;
          default: this.form.descripIndicEste = ''; break;
        }

        switch (this.dato_2079.ester_barr.ester_barr_indic) {
          case '1': this.form.descripIndicEsteBarr = 'MEDICO'; break;
          case '2': this.form.descripIndicEsteBarr = 'AUTOINDICADO'; break;
          case '3': this.form.descripIndicEsteBarr = 'AMIGO(A)'; break;
          case '4': this.form.descripIndicEsteBarr = 'OTRO'; break;
          case '5': this.form.descripIndicEsteBarr = 'ENFERMERA'; break;
          default: this.form.descripIndicEsteBarr = ''; break;
        }

        switch (this.dato_2079.coi_int.coi_int_indic) {
          case '1': this.form.descripIndicCoiInt = 'MEDICO'; break;
          case '2': this.form.descripIndicCoiInt = 'AUTOINDICADO'; break;
          case '3': this.form.descripIndicCoiInt = 'AMIGO(A)'; break;
          case '4': this.form.descripIndicCoiInt = 'OTRO'; break;
          case '5': this.form.descripIndicCoiInt = 'ENFERMERA'; break;
          default: this.form.descripIndicCoiInt = ''; break;
        }

        switch (this.dato_2079.met_rit.met_rit_indic) {
          case '1': this.form.descripIndicMetRit = 'MEDICO'; break;
          case '2': this.form.descripIndicMetRit = 'AUTOINDICADO'; break;
          case '3': this.form.descripIndicMetRit = 'AMIGO(A)'; break;
          case '4': this.form.descripIndicMetRit = 'OTRO'; break;
          case '5': this.form.descripIndicMetRit = 'ENFERMERA'; break;
          default: this.form.descripIndicMetRit = ''; break;
        }

        this.examen_visual.agudeza_visual_od_1 = this.hcprc.examen_visual.agud_visual_od_1;
        this.examen_visual.agudeza_visual_od_2 = this.hcprc.examen_visual.agud_visual_od_2;
        this.examen_visual.agudeza_visual_oi_1 = this.hcprc.examen_visual.agud_visual_oi_1;
        this.examen_visual.agudeza_visual_oi_2 = this.hcprc.examen_visual.agud_visual_oi_2;
        this.examen_visual.distancia_agud = this.hcprc.examen_visual.distancia_agud;
        this.examen_visual.estructuras_oculares_od = this.hcprc.examen_visual.estructuras_oculares_od;
        this.examen_visual.estructuras_oculares_oi = this.hcprc.examen_visual.estructuras_oculares_oi;

        switch (this.dato_8031.signos_vitales.aspecto_gen) {
          case 'N': this.form.descripAspecGen = 'NORMAL'; break;
          case 'A': this.form.descripAspecGen = 'ANORMAL'; break;
          case '9': this.form.descripAspecGen = 'NO APLICA'; break;
          case '0': this.form.descripAspecGen = 'NO SE VALORA'; break;
        }

        switch (this.dato_8031.signos_vitales.mamas) {
          case 'N': this.form.descripMama = 'NORMAL'; break;
          case 'A': this.form.descripMama = 'ANORMAL'; break;
          case '9': this.form.descripMama = 'NO APLICA'; break;
          case '0': this.form.descripMama = 'NO SE VALORA'; break;
        }

        switch (this.dato_8031.signos_vitales.piel_fan_muc) {
          case 'N': this.form.descripPielFan = 'NORMAL'; break;
          case 'A': this.form.descripPielFan = 'ANORMAL'; break;
          case '9': this.form.descripPielFan = 'NO APLICA'; break;
          case '0': this.form.descripPielFan = 'NO SE VALORA'; break;
        }

        switch (this.dato_8031.signos_vitales.cabeza) {
          case 'N': this.form.descripCabeza = 'NORMAL'; break;
          case 'A': this.form.descripCabeza = 'ANORMAL'; break;
          case '9': this.form.descripCabeza = 'NO APLICA'; break;
          case '0': this.form.descripCabeza = 'NO SE VALORA'; break;
        }

        switch (this.dato_8031.signos_vitales.agudeza_vis) {
          case 'N': this.form.descripAgudezaV = 'NORMAL'; break;
          case 'A': this.form.descripAgudezaV = 'ANORMAL'; break;
          case '9': this.form.descripAgudezaV = 'NO APLICA'; break;
          case '0': this.form.descripAgudezaV = 'NO SE VALORA'; break;
        }

        switch (this.dato_8031.signos_vitales.genitales_ext) {
          case 'N': this.form.descripGenitalesExt = 'NORMAL'; break;
          case 'A': this.form.descripGenitalesExt = 'ANORMAL'; break;
          case '9': this.form.descripGenitalesExt = 'NO APLICA'; break;
          case '0': this.form.descripGenitalesExt = 'NO SE VALORA'; break;
        }

        switch (this.dato_8031.signos_vitales.salud_bucal) {
          case 'N': this.form.descripSaludBucal = 'NORMAL'; break;
          case 'A': this.form.descripSaludBucal = 'ANORMAL'; break;
          case '9': this.form.descripSaludBucal = 'NO APLICA'; break;
          case '0': this.form.descripSaludBucal = 'NO SE VALORA'; break;
        }

        switch (this.dato_8031.signos_vitales.cuello_tiroi) {
          case 'N': this.form.descripCuelloTiroides = 'NORMAL'; break;
          case 'A': this.form.descripCuelloTiroides = 'ANORMAL'; break;
          case '9': this.form.descripCuelloTiroides = 'NO APLICA'; break;
          case '0': this.form.descripCuelloTiroides = 'NO SE VALORA'; break;
        }

        switch (this.dato_8031.signos_vitales.torax) {
          case 'N': this.form.descripTorax = 'NORMAL'; break;
          case 'A': this.form.descripTorax = 'ANORMAL'; break;
          case '9': this.form.descripTorax = 'NO APLICA'; break;
          case '0': this.form.descripTorax = 'NO SE VALORA'; break;
        }

        switch (this.dato_8031.signos_vitales.cardio_pulmo) {
          case 'N': this.form.descripCardioPul = 'NORMAL'; break;
          case 'A': this.form.descripCardioPul = 'ANORMAL'; break;
          case '9': this.form.descripCardioPul = 'NO APLICA'; break;
          case '0': this.form.descripCardioPul = 'NO SE VALORA'; break;
        }

        switch (this.dato_8031.signos_vitales.abdomen) {
          case 'N': this.form.descripAbdomen = 'NORMAL'; break;
          case 'A': this.form.descripAbdomen = 'ANORMAL'; break;
          case '9': this.form.descripAbdomen = 'NO APLICA'; break;
          case '0': this.form.descripAbdomen = 'NO SE VALORA'; break;
        }

        switch (this.dato_8031.signos_vitales.genito_urina) {
          case 'N': this.form.descripGenicoUri = 'NORMAL'; break;
          case 'A': this.form.descripGenicoUri = 'ANORMAL'; break;
          case '9': this.form.descripGenicoUri = 'NO APLICA'; break;
          case '0': this.form.descripGenicoUri = 'NO SE VALORA'; break;
        }

        switch (this.dato_8031.signos_vitales.columna) {
          case 'N': this.form.descripColumna = 'NORMAL'; break;
          case 'A': this.form.descripColumna = 'ANORMAL'; break;
          case '9': this.form.descripColumna = 'NO APLICA'; break;
          case '0': this.form.descripColumna = 'NO SE VALORA'; break;
        }

        switch (this.dato_8031.signos_vitales.extremidad_inf) {
          case 'N': this.form.descripExtremInfe = 'NORMAL'; break;
          case 'A': this.form.descripExtremInfe = 'ANORMAL'; break;
          case '9': this.form.descripExtremInfe = 'NO APLICA'; break;
          case '0': this.form.descripExtremInfe = 'NO SE VALORA'; break;
        }

        switch (this.dato_8031.signos_vitales.neurologico) {
          case 'N': this.form.descripNeurolo = 'NORMAL'; break;
          case 'A': this.form.descripNeurolo = 'ANORMAL'; break;
          case '9': this.form.descripNeurolo = 'NO APLICA'; break;
          case '0': this.form.descripNeurolo = 'NO SE VALORA'; break;
        }

        var temp = this.dato_8031.asesoria_eleccion.metodo_eleg;
        switch (temp) {
          case '1': this.form.descripMetodo_eleg = 'DIU'; break;
          case '2': this.form.descripMetodo_eleg = 'ORAL'; break;
          case '3': this.form.descripMetodo_eleg = 'BARRERA'; break;
          case '4': this.form.descripMetodo_eleg = 'OTRO'; break;
          case '5': this.form.descripMetodo_eleg = 'NINGUNO'; break;
          case '6': this.form.descripMetodo_eleg = 'DIU + BARRERA'; break;
          case '7': this.form.descripMetodo_eleg = 'IMPLE. SUBDERMICO'; break;
          case '8': this.form.descripMetodo_eleg = 'I. SUBDERM + BARRERA'; break;
          case '9': this.form.descripMetodo_eleg = 'ORAL + BARRERA'; break;
          case 'A': this.form.descripMetodo_eleg = 'INYECTABLE MENSUAL'; break;
          case 'B': this.form.descripMetodo_eleg = 'INYECTABLE + BARRERA'; break;
          case 'C': this.form.descripMetodo_eleg = 'INYECTABLE TRIMEST'; break;
          case 'D': this.form.descripMetodo_eleg = 'TRIMESTRAL + BARRERA'; break;
          case 'E': this.form.descripMetodo_eleg = 'EMERGENCIA'; break;
          case 'F': this.form.descripMetodo_eleg = 'EMERGENCIA + BARRERA'; break;
          case 'G': this.form.descripMetodo_eleg = 'ESTERILIZACION'; break;
          case 'H': this.form.descripMetodo_eleg = 'ESTERILIZACION + BARRERA'; break;
          case 'I': this.form.descripMetodo_eleg = 'NO USA X TRADICION'; break;
          case 'J': this.form.descripMetodo_eleg = 'NO USA X SALUD'; break;
          case 'K': this.form.descripMetodo_eleg = 'NO USA X NEGACION'; break;
          case 'L': this.form.descripMetodo_eleg = 'COITUS INTERRUPTUS'; break;
          case 'M': this.form.descripMetodo_eleg = 'METODO DEL RITMO'; break;
          default: this.form.descripMetodo_eleg = ''; break;
        }

        this.form.brindaEduc = `${this.dato_8031.brinda_educ_1.replace(/(?:\&)/g, "\n")} ${this.dato_8031.brinda_educ_2.replace(/(?:\&)/g, "\n")} ${this.dato_8031.brinda_educ_3.replace(/(?:\&)/g, "\n")}`

        var met = this.dato_8031.control.metodo_ant;

        switch (met) {
          case '1': this.form.descripMetodAnt = 'DIU'; break;
          case '2': this.form.descripMetodAnt = 'ORAL'; break;
          case '3': this.form.descripMetodAnt = 'BARRERA'; break;
          case '4': this.form.descripMetodAnt = 'OTRO'; break;
          case '5': this.form.descripMetodAnt = 'NINGUNO'; break;
          case '6': this.form.descripMetodAnt = 'DIU + BARRERA'; break;
          case '7': this.form.descripMetodAnt = 'IMPLE. SUBDERMICO'; break;
          case '8': this.form.descripMetodAnt = 'I. SUBDERM + BARRERA'; break;
          case '9': this.form.descripMetodAnt = 'ORAL + BARRERA'; break;
          case 'A': this.form.descripMetodAnt = 'INYECTABLE MENSUAL'; break;
          case 'B': this.form.descripMetodAnt = 'INYECTABLE + BARRERA'; break;
          case 'C': this.form.descripMetodAnt = 'INYECTABLE TRIMEST'; break;
          case 'D': this.form.descripMetodAnt = 'TRIMESTRAL + BARRERA'; break;
          case 'E': this.form.descripMetodAnt = 'EMERGENCIA'; break;
          case 'F': this.form.descripMetodAnt = 'EMERGENCIA + BARRERA'; break;
          case 'G': this.form.descripMetodAnt = 'ESTERILIZACION'; break;
          case 'H': this.form.descripMetodAnt = 'ESTERILIZACION + BARRERA'; break;
          case 'I': this.form.descripMetodAnt = 'NO USA X TRADICION'; break;
          case 'J': this.form.descripMetodAnt = 'NO USA X SALUD'; break;
          case 'K': this.form.descripMetodAnt = 'NO USA X NEGACION'; break;
          case 'L': this.form.descripMetodAnt = 'COITUS INTERRUPTUS'; break;
          case 'M': this.form.descripMetodAnt = 'METODO DEL RITMO'; break;
          default: this.form.descripMetodAnt = ''; break;
        }

        switch (this.dato_8031.control.exp_subdermico) {
          case '1': this.form.descripExp_subdermico = 'SI'; break;
          case '2': this.form.descripExp_subdermico = 'NO'; break;
          case '3': this.form.descripExp_subdermico = 'NS'; break;
        }

        switch (this.dato_8031.control.exp_intrauterino) {
          case '1': this.form.descripExp_intrauterino = 'SI'; break;
          case '2': this.form.descripExp_intrauterino = 'NO'; break;
          case '3': this.form.descripExp_intrauterino = 'NS'; break;
        }

        var metNuev = this.dato_8031.control.nuevo_metodo;

        switch (metNuev) {
          case '1': this.form.descripNuevo_metodo = 'DIU'; break;
          case '2': this.form.descripNuevo_metodo = 'ORAL'; break;
          case '3': this.form.descripNuevo_metodo = 'BARRERA'; break;
          case '4': this.form.descripNuevo_metodo = 'OTRO'; break;
          case '5': this.form.descripNuevo_metodo = 'NINGUNO'; break;
          case '6': this.form.descripNuevo_metodo = 'DIU + BARRERA'; break;
          case '7': this.form.descripNuevo_metodo = 'IMPLE. SUBDERMICO'; break;
          case '8': this.form.descripNuevo_metodo = 'I. SUBDERM + BARRERA'; break;
          case '9': this.form.descripNuevo_metodo = 'ORAL + BARRERA'; break;
          case 'A': this.form.descripNuevo_metodo = 'INYECTABLE MENSUAL'; break;
          case 'B': this.form.descripNuevo_metodo = 'INYECTABLE + BARRERA'; break;
          case 'C': this.form.descripNuevo_metodo = 'INYECTABLE TRIMEST'; break;
          case 'D': this.form.descripNuevo_metodo = 'TRIMESTRAL + BARRERA'; break;
          case 'E': this.form.descripNuevo_metodo = 'EMERGENCIA'; break;
          case 'F': this.form.descripNuevo_metodo = 'EMERGENCIA + BARRERA'; break;
          case 'G': this.form.descripNuevo_metodo = 'ESTERILIZACION'; break;
          case 'H': this.form.descripNuevo_metodo = 'ESTERILIZACION + BARRERA'; break;
          case 'I': this.form.descripNuevo_metodo = 'NO USA X TRADICION'; break;
          case 'J': this.form.descripNuevo_metodo = 'NO USA X SALUD'; break;
          case 'K': this.form.descripNuevo_metodo = 'NO USA X NEGACION'; break;
          case 'L': this.form.descripNuevo_metodo = 'COITUS INTERRUPTUS'; break;
          case 'M': this.form.descripNuevo_metodo = 'METODO DEL RITMO'; break;
          default: this.form.descripNuevo_metodo = ''; break;
        }

        this.form.ano_Cambio = this.dato_8031.control.fecha_cambio.substring(0, 4);
        this.form.mes_Cambio = this.dato_8031.control.fecha_cambio.substring(4, 6);
        this.form.dia_Cambio = this.dato_8031.control.fecha_cambio.substring(6, 8);

        if (this.dato_8031.control.remitido.trim() == '') {
          this.dato_8031.control.remitido = '';
          this.form.descripRemitido = '';
        } else {
          let busq = this.especialidades.find(a => a.CODIGO == this.dato_8031.control.remitido);
          if (busq != undefined) {
            this.dato_8031.control.remitido = busq.CODIGO;
            this.form.descripRemitido = busq.NOMBRE;
          } else {
            this.dato_8031.control.remitido = this.dato_8031.control.remitido;
            this.form.descripRemitido = 'Codigo no existe!';
          }
        }

        this.form.ano_Proxi = this.dato_8031.control.fecha_proxima.substring(0, 4);
        this.form.mes_Proxi = this.dato_8031.control.fecha_proxima.substring(4, 6);

        this.form.diagnosticos[0].cod = this.hcprc.rips.tabla_diagn[0].cod_diagn;
        this.form.diagnosticos[1].cod = this.hcprc.rips.tabla_diagn[1].cod_diagn;
        this.form.diagnosticos[2].cod = this.hcprc.rips.tabla_diagn[2].cod_diagn;
        this.form.diagnosticos[3].cod = this.hcprc.rips.tabla_diagn[3].cod_diagn;
        this.form.diagnosticos[4].cod = this.hcprc.rips.tabla_diagn[4].cod_diagn;
        this.form.diagnosticos[5].cod = this.hcprc.rips.tabla_diagn[5].cod_diagn;
        this.form.diagnosticos[6].cod = this.hcprc.rips.tabla_diagn[6].cod_diagn;
        this.form.diagnosticos[7].cod = this.hcprc.rips.tabla_diagn[7].cod_diagn;
        this.form.diagnosticos[8].cod = this.hcprc.rips.tabla_diagn[8].cod_diagn;
        this.form.diagnosticos[9].cod = this.hcprc.rips.tabla_diagn[9].cod_diagn;

        this.form.diagnosticos[0].descrip = this.hcprc.rips.tabla_diagn[0].descrip_diagn;
        this.form.diagnosticos[1].descrip = this.hcprc.rips.tabla_diagn[1].descrip_diagn;
        this.form.diagnosticos[2].descrip = this.hcprc.rips.tabla_diagn[2].descrip_diagn;
        this.form.diagnosticos[3].descrip = this.hcprc.rips.tabla_diagn[3].descrip_diagn;
        this.form.diagnosticos[4].descrip = this.hcprc.rips.tabla_diagn[4].descrip_diagn;
        this.form.diagnosticos[5].descrip = this.hcprc.rips.tabla_diagn[5].descrip_diagn;
        this.form.diagnosticos[6].descrip = this.hcprc.rips.tabla_diagn[6].descrip_diagn;
        this.form.diagnosticos[7].descrip = this.hcprc.rips.tabla_diagn[7].descrip_diagn;
        this.form.diagnosticos[8].descrip = this.hcprc.rips.tabla_diagn[8].descrip_diagn;
        this.form.diagnosticos[9].descrip = this.hcprc.rips.tabla_diagn[9].descrip_diagn;

        let busqDetalle_7501 = this.detalles.find(el => el['COD-DETHC'] == '7501' && el['LLAVE-HC'] == $_REG_HC.llave_hc)
        if (busqDetalle_7501) {
          this.form.analisis = busqDetalle_7501.DETALLE.replace(/(?:\&)/g, "\n");
        }

        let busqDetalle_7503 = this.detalles.find(el => el['COD-DETHC'] == '7503' && el['LLAVE-HC'] == $_REG_HC.llave_hc)
        if (busqDetalle_7503) {
          this.form.plan = busqDetalle_7503.DETALLE.replace(/(?:\&)/g, "\n");
        }

        await this.datoEmbarazada();
      }
    },

    crear_historia() {
      var data = {}
      data['datosh'] = datosEnvio() + $_REG_HC.llave_hc + '|' + localStorage.Usuario + '|' + this.hcprc.novedad + '|'
      data['datos_basicos'] = this.hcprc.fecha + '|' + this.hcprc.hora + '|' + this.hcprc.med + '|' + this.hcprc.serv + '|' + this.hcprc.unid_edad + this.hcprc.vlr_edad + '|' + this.hcprc.edad_dias + '|8031|0|' + this.hcprc.rips.finalid + '|'

      postData(data, get_url("APP/HICLIN/SAVE_TEMP_HC.DLL"))
        .then((data) => {
          console.log(data)

          if (this.hcprc.serv == '01' || this.hcprc.serv == '04') {
            this.hcprc.proceden = data.PROCEDENCIA.trim()
            this.hcprc.motiv = data.MOTIV.trim()
            this.hcprc.signos.peso = parseFloat(data.PESO.trim()).toString()
            this.hcprc.signos.talla = parseInt(data.TALLA).toString()
            this.hcprc.signos.embarazo = data.EMBARAZO.trim()
            this.hcprc.rips.triage = data.TRIAGE.trim()
            this.hcprc.rips.causa = data.CAUSA.trim()
            this.hcprc.rips.finalid = data.FINALID.trim()
            this.hcprc.rips.estado_sal = data.ESTADO_SAL.trim()
            this.hcprc.rips.remitido = data.REMITIDO.trim()
            this.hcprc.cierre.eps = data.EPS.trim()
          }

          this.hcprc.novedad = '8'

          this.cargarHc_HC8031('2');
          this.datoEmbarazada();
        })
        .catch(error => {
          console.log(error)
          CON851('', 'Ha ocurrido un error creando historia', null, 'error', 'Error')
          _regresar_menuhis();
        });
    },

    async datoEmbarazada() {
      if ($_REG_PROF.ATIENDE_PROF == 1) {
        if (($_REG_PROF.TAB_ESPEC[0].COD == 340 || $_REG_PROF.TAB_ESPEC[0].COD == 341) ||
          ($_REG_PROF.TAB_ESPEC[0].COD == 340 || $_REG_PROF.TAB_ESPEC[0].COD == 341)) {
          if ($_REG_PACI.SEXO == 'F' && $_REG_HC.edad_hc.unid_edad == 'A' && ($_REG_HC.edad_hc.vlr_edad > 8 && $_REG_HC.edad_hc.vlr_edad < 55)) {
            if ($_REG_HC.serv_hc == 01 && (this.hcprc.rips.embarazo == 1 || this.hcprc.rips.embarazo == 2 || this.hcprc.rips.embarazo == 3)) {
              CON851('6E', '6E', null, 'error', 'error')
              this.pantalla_01()
            } else {
              this.pantalla_01()
            }
          } else {
            this.pantalla_01()
          }
        } else {
          this.pantalla_01()
        }
      } else {
        this.pantalla_01()
      }
    },

    // aqui empieza el bloque o pantalla 01

    // antecedentes familiares

    pantalla_01() {
      if (this.nit_usu == 844001287) {
        this.hcprc.rips.embarazo = '4';
        this.validarAcompañante();
      } else if ($_REG_PACI.SEXO == 'M') {
        this.hcprc.rips.embarazo = '9';
        this.validarAcompañante();
      } else if ($_REG_HC.edad_hc.unid_edad == 'D' || $_REG_HC.edad_hc.unid_edad == 'M' || ($_REG_HC.edad_hc.unid_edad == 'A' && $_REG_HC.edad_hc.vlr_edad < 11)) {
        this.hcprc.rips.embarazo = '9';
        this.validarAcompañante();
      } else {
        this.embarazo_HC8031();
      }
    },

    validarAcompañante() {
      this.imprimir_HC002B() // IMPRESION EVOLUCIONES ANTERIORES DE ELECTRON
        .then(() => {
          if (this.hcprc.serv != '08') {
            this.validarMotivo();
          } else {
            validarInputs(
              {
                form: "#validarAcompañante",
                orden: '1',
              },
              () => {
                _regresar_menuhis();
              },
              () => {
                this.hcprc.acompa = this.form.acompanante.toUpperCase();
                if (this.hcprc.acompa.trim() == "") {
                  CON851('02', '02', null, 'error', 'error');
                  this.validarAcompañante();
                } else {
                  this.validarMotivo();
                }
              }
            );
          }
        })

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

    validarMotivo() {
      validarInputs(
        {
          form: "#validarTabla_motivo",
          orden: '1',
        },
        () => {
          this.validarAcompañante();
        },
        () => {
          this.hcprc.motiv = this.form.tabla_motivo.toUpperCase();
          this.hcprc.motiv = this.hcprc.motiv.replace(/(\r\n|\n|\r)/gm, "&");
          if (this.hcprc.motiv.trim() == "") {
            CON851('02', '02', null, 'error', 'error');
            this.validarMotivo();
          } else {
            this.validarDatoVictimaConflic();
            // scrollProsoft("antecedentes_familiares", "smooth", "end");
            $("#antecedentes_familiares").get(0).scrollIntoView(true);
          }
        }
      );
    },

    validarDatoVictimaConflic() {
      this.modal_victimaConf = true;
      this.form.victConflicto.trim() == ""
        ? (this.form.victConflicto = $_REG_PACI["VICTI-CONFLICTO"])
        : "";
      validarInputs(
        {
          form: "#victConflicto",
        },
        () => {
          this.modal_victimaConf = false;
          this.validarMotivo();
        },
        async () => {
          this.form.victConflicto = this.form.victConflicto.toUpperCase();
          var temp = this.form.victConflicto;
          if (temp == "S" || temp == "N") {
            await this.actualizarPaciente();
            await this.dato_hipertencion_fam();
          } else {
            CON851("03", "03", null, "error", "error");
            this.validarDatoVictimaConflic();
          }
        }
      );
    },

    dato_hipertencion_fam() {
      this.modal_victimaConf = false;
      let hiper_fam = this.dato_8031.dato_fam.hiper_fam || 2;

      this._hc861("Hipertensión", hiper_fam, '#hiper_fam')
        .then((data) => {
          this.dato_8031.dato_fam.hiper_fam = data;
          if (data == 1)
            this.parentescoAntec(
              "paren_hiper_fam",
              "dato_hipertencion_fam",
              "datoCualhiper",
              '#hiper_fam'
            );
          else {
            this.dato_8031.dato_fam.paren_hiper_fam = "";
            this.dato_8031.dato_fam2.cual_hiper = "";
            this.dato_diabetes_fam();
          }
        })
        .catch((err) => {
          console.log(err)
          this.validarMotivo();
        });
    },

    datoCualhiper() {
      validarInputs(
        {
          form: "#validarCualhiper",
        },
        () => {
          this.dato_hipertencion_fam();
        },
        () => {
          this.dato_8031.dato_fam2.cual_hiper = this.dato_8031.dato_fam2.cual_hiper.toUpperCase();
          this.dato_diabetes_fam();
        }
      );
    },

    dato_diabetes_fam() {
      let diabet_fam = this.dato_8031.dato_fam.diabet_fam || 2;
      console.log(diabet_fam)
      this._hc861("Diabetes", diabet_fam, '#diabet_fam')
        .then((data) => {
          this.dato_8031.dato_fam.diabet_fam = data;
          if (data == 1)
            this.parentescoAntec(
              "paren_diabet_fam",
              "dato_diabetes_fam",
              "datoCualDiabet",
              '#diabet_fam'
            );
          else {
            this.dato_8031.dato_fam2.cual_diabet = "";
            this.dato_8031.dato_fam.paren_diabet_fam = "";
            this.dato_cardio_fam();
          }
        })
        .catch((err) => {
          this.dato_hipertencion_fam();
        });
    },

    datoCualDiabet() {
      validarInputs(
        {
          form: "#validarCualdiabet",
        },
        () => {
          this.dato_diabetes_fam();
        },
        () => {
          this.dato_8031.dato_fam2.cual_diabet = this.dato_8031.dato_fam2.cual_diabet.toUpperCase();
          this.dato_cardio_fam();
        }
      );
    },

    dato_cardio_fam() {
      let cardio_vas_fam = this.dato_8031.dato_fam.cardio_vas_fam || 2;

      this._hc861("Cardio / Vasculares", cardio_vas_fam, '#cardio_vas_fam')
        .then((data) => {
          this.dato_8031.dato_fam.cardio_vas_fam = data;
          if (data == 1)
            this.parentescoAntec(
              "paren_cardio_vas_fam",
              "dato_cardio_fam",
              "datoCualCardio",
              '#cardio_vas_fam'
            );
          else {
            this.dato_8031.dato_fam2.cual_cardipo = "";
            this.dato_8031.dato_fam.paren_cardio_vas_fam = "";
            this.dato_can_cuelloU();
          }
        })
        .catch((err) => {
          this.dato_diabetes_fam();
        });
    },

    datoCualCardio() {
      validarInputs(
        {
          form: "#validarCualcardio",
        },
        () => {
          this.dato_cardio_fam();
        },
        () => {
          this.dato_8031.dato_fam2.cual_cardipo = this.dato_8031.dato_fam2.cual_cardipo.toUpperCase();
          this.dato_can_cuelloU();
        }
      );
    },

    dato_can_cuelloU() {
      if ($_REG_PACI.SEXO == 'M') {
        this.dato_8031.dato_fam.can_cuell_fam = '2';
        this.dato_can_mama();
      } else {
        let can_cuell_fam = this.dato_8031.dato_fam.can_cuell_fam || 2;

        this._hc861("Cancer de cuello uterirno", can_cuell_fam, '#can_cuell_fam')
          .then((data) => {
            this.dato_8031.dato_fam.can_cuell_fam = data;
            if (data == 1)
              this.parentescoAntec(
                "paren_can_cuell_fam",
                "dato_can_cuelloU",
                "datoCualCanCuello",
                '#can_cuell_fam'
              );
            else {
              this.dato_8031.dato_fam2.cual_cuello = "";
              this.dato_8031.dato_fam.paren_can_cuell_fam = "";
              this.dato_can_mama();
            }
          })
          .catch((err) => {
            this.dato_cardio_fam();
          });
      }
    },

    datoCualCanCuello() {
      validarInputs(
        {
          form: "#validarCualCuello",
        },
        () => {
          this.dato_can_cuelloU();
        },
        () => {
          this.dato_8031.dato_fam2.cual_cuello = this.dato_8031.dato_fam2.cual_cuello.toUpperCase();
          this.dato_can_mama();
        }
      );
    },

    dato_can_mama() {
      let can_mama_fam = this.dato_8031.dato_fam.can_mama_fam || 2;

      this._hc861("Cáncer de Mama", can_mama_fam, '#can_mama_fam')
        .then((data) => {
          this.dato_8031.dato_fam.can_mama_fam = data;
          if (data == 1)
            this.parentescoAntec(
              "paren_can_mama_fam",
              "dato_can_mama",
              "datoCualCanMama",
              '#can_mama_fam'
            );
          else {
            this.dato_8031.dato_fam2.cual_mama = "";
            this.dato_8031.dato_fam.paren_can_mama_fam = "";
            this.dato_otro_canFam();
          }
        })
        .catch((err) => {
          if ($_REG_PACI.SEXO == "M") {
            this.dato_cardio_fam();
          } else {
            this.dato_can_cuelloU();
          }
        });
    },

    datoCualCanMama() {
      validarInputs(
        {
          form: "#validarCualMama",
        },
        () => {
          this.dato_can_mama();
        },
        () => {
          this.dato_8031.dato_fam2.cual_mama = this.dato_8031.dato_fam2.cual_mama.toUpperCase();
          this.dato_otro_canFam();
        }
      );
    },

    dato_otro_canFam() {
      let otro_can_fam = this.dato_8031.dato_fam.otro_can_fam || 2;

      this._hc861("Otro Tipo de Cáncer", otro_can_fam, '#otro_can_fam')
        .then((data) => {
          this.dato_8031.dato_fam.otro_can_fam = data;
          if (data == 1)
            this.parentescoAntec(
              "paren_otro_can_fam",
              "dato_otro_canFam",
              "datoCualOtroCan",
              '#otro_can_fam'
            );
          else {
            this.dato_8031.dato_fam2.cual_otro_can = "";
            this.dato_8031.dato_fam.paren_otro_can_fam = "";
            this.dato_enf_mentalFam();
          }
        })
        .catch((err) => {
          this.dato_can_mama();
        });
    },

    datoCualOtroCan() {
      validarInputs(
        {
          form: "#validarCualOtroCan",
        },
        () => {
          this.dato_otro_canFam();
        },
        () => {
          this.dato_8031.dato_fam2.cual_otro_can = this.dato_8031.dato_fam2.cual_otro_can.toUpperCase();
          this.dato_enf_mentalFam();
        }
      );
    },

    dato_enf_mentalFam() {
      let enf_mental_fam = this.dato_8031.dato_fam.enf_mental_fam || 2;

      this._hc861("Enfermedad mental", enf_mental_fam, '#enf_mental_fam')
        .then((data) => {
          this.dato_8031.dato_fam.enf_mental_fam = data;
          if (data == 1)
            this.parentescoAntec(
              "paren_enf_mental_fam",
              "dato_enf_mentalFam",
              "datoCualEnfMental",
              '#enf_mental_fam'
            );
          else {
            this.dato_8031.dato_fam2.cual_enf_mental = "";
            this.dato_8031.dato_fam.paren_enf_mental_fam = "";
            this.dato_gineco_obstFam();
          }
        })
        .catch((err) => {
          this.dato_otro_canFam();
        });
    },

    datoCualEnfMental() {
      validarInputs(
        {
          form: "#validarCualEnfMental",
        },
        () => {
          this.dato_enf_mentalFam();
        },
        () => {
          this.dato_8031.dato_fam2.cual_enf_mental = this.dato_8031.dato_fam2.cual_enf_mental.toUpperCase();
          this.dato_gineco_obstFam();
        }
      );
    },

    dato_gineco_obstFam() {
      if ($_REG_PACI.SEXO == "M") {
        this.dato_8031.dato_fam.gine_obst_fam = "2";
        this.dato_viol_genFam();
      } else {
        let gine_obst_fam = this.dato_8031.dato_fam.gine_obst_fam || 2;

        this._hc861("Gineco / Obstetrico", gine_obst_fam, '#gine_obst_fam')
          .then((data) => {
            this.dato_8031.dato_fam.gine_obst_fam = data;
            if (data == 1)
              this.parentescoAntec(
                "paren_gine_obst_fam",
                "dato_gineco_obstFam",
                "datoCualGineco",
                '#gine_obst_fam'
              );
            else {
              this.dato_8031.dato_fam2.cual_gineco_obs = "";
              this.dato_8031.dato_fam.paren_gine_obst_fam = "";
              this.dato_viol_genFam();
            }
          })
          .catch((err) => {
            this.dato_enf_mentalFam();
          });
      }
    },

    datoCualGineco() {
      validarInputs(
        {
          form: "#validarCualGineco",
        },
        () => {
          this.dato_gineco_obstFam();
        },
        () => {
          this.dato_8031.dato_fam2.cual_gineco_obs = this.dato_8031.dato_fam2.cual_gineco_obs.toUpperCase();
          this.dato_viol_genFam();
        }
      );
    },

    dato_viol_genFam() {
      let viol_gen_fam = this.dato_8031.dato_fam.viol_gen_fam || 2;

      this._hc861("Violencia de genero", viol_gen_fam, '#viol_gen_fam')
        .then((data) => {
          this.dato_8031.dato_fam.viol_gen_fam = data;
          if (data == 1)
            this.parentescoAntec(
              "paren_viol_gen_fam",
              "dato_viol_genFam",
              "datoCualViolen",
              '#viol_gen_fam'
            );
          else {
            this.dato_8031.dato_fam2.cual_violencia = "";
            this.dato_8031.dato_fam.paren_viol_gen_fam = "";
            this.datoOtroCualesFam();
          }
        })
        .catch((err) => {
          if ($_REG_PACI.SEXO == "M") {
            this.dato_enf_mentalFam();
          } else {
            this.dato_gineco_obstFam();
          }
        });
    },

    datoCualViolen() {
      validarInputs(
        {
          form: "#validarCualViolencia",
        },
        () => {
          this.dato_viol_genFam();
        },
        () => {
          this.dato_8031.dato_fam2.cual_violencia = this.dato_8031.dato_fam2.cual_violencia.toUpperCase();
          this.datoOtroCualesFam();
        }
      );
    },

    datoOtroCualesFam() {
      if (this.dato_8031.dato_fam.otros_antec_fam.trim() == '') this.dato_8031.dato_fam.otros_antec_fam = 'N/A';
      validarInputs(
        {
          form: "#otro_cuales_fam",
        },
        () => {
          this.dato_viol_genFam();
        },
        () => {
          scrollProsoft("antecedentes_personales", "smooth", "end");
          this.dato_8031.dato_fam.otros_antec_fam = this.dato_8031.dato_fam.otros_antec_fam.toUpperCase();
          this.dato_hiper_per();
        }
      );
    },

    // antecedentes personales

    dato_hiper_per() {
      let hiper_per = this.dato_8031.dato_per.hiper_per || 2;

      this._hc861("Hipertensión", hiper_per, '#hiper_per')
        .then((data) => {
          this.dato_8031.dato_per.hiper_per = data;
          this.dato_diabet_per();
        })
        .catch((err) => {
          this.datoOtroCualesFam();
          scrollProsoft("antecedentes_familiares", "smooth", "end");
        });
    },

    dato_diabet_per() {
      let diabet_per = this.dato_8031.dato_per.diabet_per || 2;

      this._hc861("Diabetes", diabet_per, '#diabet_per')
        .then((data) => {
          this.dato_8031.dato_per.diabet_per = data;
          this.dato_cardioVasc_per();
        })
        .catch((err) => {
          this.dato_hiper_per();
        });
    },

    dato_cardioVasc_per() {
      let cardio_vas_per = this.dato_8031.dato_per.cardio_vas_per || 2;

      this._hc861("Cardio/Vasculares", cardio_vas_per, '#cardio_vas_per')
        .then((data) => {
          this.dato_8031.dato_per.cardio_vas_per = data;
          this.dato_trombofle_per();
        })
        .catch((err) => {
          this.dato_diabet_per();
        });
    },

    dato_trombofle_per() {
      let trombofle_per = this.dato_8031.dato_per.trombofle_per || 2;

      this._hc861("Tromboflebitis", trombofle_per, '#trombofle_per')
        .then((data) => {
          this.dato_8031.dato_per.trombofle_per = data;
          this.dato_its_per();
        })
        .catch((err) => {
          this.dato_cardioVasc_per();
        });
    },

    dato_its_per() {
      let its_per = this.dato_8031.dato_per.its_per || 2;

      this._hc861("I.T.S", its_per, '#its_per')
        .then((data) => {
          this.dato_8031.dato_per.its_per = data;
          if (data == 1) setTimeout(() => { this.datoCualIts(); }, 200);
          else {
            this.dato_8031.dato_fam3.cual_its_per = "";
            this.dato_alerg_per();
          }
        })
        .catch((err) => {
          this.dato_trombofle_per();
        });
    },

    datoCualIts() {
      if (!this.dato_8031.dato_fam3.cual_its_per)
        this.dato_8031.dato_fam3.cual_its_per = "KU";

      validarInputs(
        {
          form: "#validarCualIts",
        },
        () => {
          this.dato_its_per();
        },
        () => {
          this.dato_8031.dato_fam3.cual_its_per = this.dato_8031.dato_fam3.cual_its_per.toUpperCase();
          this.dato_alerg_per();
        }
      );
    },

    dato_alerg_per() {
      let alergias_per = this.dato_8031.dato_per.alergias_per || 2;

      this._hc861("Alergias", alergias_per, '#alergias_per')
        .then((data) => {
          this.dato_8031.dato_per.alergias_per = data;
          if (data == 1) setTimeout(() => { this.datoCualAlerg(); }, 200);
          else {
            this.detalle_2035.alergias = "";
            this.dato_violGen_per();
          }
        })
        .catch((err) => {
          this.dato_its_per();
        });
    },

    datoCualAlerg() {
      if (!this.detalle_2035.alergias) this.detalle_2035.alergias = "KU";
      validarInputs(
        {
          form: "#validarCualAlerg",
        },
        () => {
          this.dato_alerg_per();
        },
        () => {
          this.detalle_2035.alergias = this.detalle_2035.alergias.toUpperCase();
          this.dato_violGen_per();
        }
      );
    },

    dato_violGen_per() {
      let viol_gen_per = this.dato_8031.dato_per.viol_gen_per || 2;

      this._hc861("Violencia De Genero", viol_gen_per, '#viol_gen_per')
        .then((data) => {
          this.dato_8031.dato_per.viol_gen_per = data;
          this.dato_cefaleas_per();
        })
        .catch((err) => {
          this.dato_alerg_per();
        });
    },

    dato_cefaleas_per() {
      let cefaleas_per = this.dato_8031.dato_per.cefaleas_per || 2;

      this._hc861("Cefaleas", cefaleas_per, '#cefaleas_per')
        .then((data) => {
          this.dato_8031.dato_per.cefaleas_per = data;
          this.dato_migraña_per();
        })
        .catch((err) => {
          this.dato_violGen_per();
        });
    },

    dato_migraña_per() {
      let migra_aura_per = this.dato_8031.dato_per.migra_aura_per || 2;

      // this._hc8612('migra_aura_per', 'dato_cefaleas_per', 'dato_enferMent_per', 'descripMigra_aura_per', 'Migraña Con Aura', '#migra_aura_per' )

      this._hc861("Migraña Con Aura", migra_aura_per, '#migra_aura_per')
        .then((data) => {
          this.dato_8031.dato_per.migra_aura_per = data;
          this.dato_enferMent_per();
        })
        .catch((err) => {
          this.dato_cefaleas_per();
        });
    },

    dato_enferMent_per() {
      let enf_mental_per = this.dato_8031.dato_per.enf_mental_per || 2;

      this._hc861("Enfermedad Mental", enf_mental_per, '#enf_mental_per')
        .then((data) => {
          this.dato_8031.dato_per.enf_mental_per = data;
          this.dato_gineObst_per();
        })
        .catch((err) => {
          this.dato_migraña_per();
        });
    },

    dato_gineObst_per() {
      if ($_REG_PACI.SEXO == "M") {
        this.dato_8031.dato_per.gine_obst_per = "2";
        this.dato_hepato_per();
      } else {
        let gine_obst_per = this.dato_8031.dato_per.gine_obst_per || 2;

        this._hc861("Gineco/Obstetrico", gine_obst_per, '#gine_obst_per')
          .then((data) => {
            this.dato_8031.dato_per.gine_obst_per = data;
            this.dato_hepato_per();
          })
          .catch((err) => {
            this.dato_enferMent_per();
          });
      }
    },

    dato_hepato_per() {
      let hepatopatias_per = this.dato_8031.dato_per.hepatopatias_per || 2;

      this._hc861("Hepatopatias", hepatopatias_per, '#hepatopatias_per')
        .then((data) => {
          this.dato_8031.dato_per.hepatopatias_per = data;
          this.dato_cirug_per();
        })
        .catch((err) => {
          if ($_REG_PACI.SEXO == "M") {
            this.dato_enferMent_per();
          } else {
            this.dato_gineObst_per();
          }
        });
    },

    dato_cirug_per() {
      let cirug_per = this.dato_8031.dato_per.cirug_per || 2;

      this._hc861("Cirugias", cirug_per, '#cirug_per')
        .then((data) => {
          this.dato_8031.dato_per.cirug_per = data;
          if (data == 1) setTimeout(() => { this.datoCualCirug(); }, 200);
          else {
            this.dato_8031.dato_per.cual_cirug_per = "";
            this.dato_cancerMam_per();
          }
        })
        .catch((err) => {
          this.dato_hepato_per();
        });
    },

    datoCualCirug() {
      validarInputs(
        {
          form: "#validarCualCirug",
        },
        () => {
          this.dato_cirug_per();
        },
        () => {
          this.dato_8031.dato_per.cual_cirug_per = this.dato_8031.dato_per.cual_cirug_per.toUpperCase();
          this.dato_cancerMam_per();
        }
      );
    },

    dato_cancerMam_per() {
      let can_mama_per = this.dato_8031.dato_per.can_mama_per || 2;

      this._hc861("Cancer De Mama", can_mama_per, '#can_mama_per')
        .then((data) => {
          this.dato_8031.dato_per.can_mama_per = data;
          this.dato_cancerCuelloUte_per();
        })
        .catch((err) => {
          this.dato_cirug_per();
        });
    },

    dato_cancerCuelloUte_per() {
      if ($_REG_PACI.SEXO == "M") {
        this.dato_8031.dato_per.can_cuell_per = "2";
        this.dato_otroCancer_per();
      } else {
        let can_cuell_per = this.dato_8031.dato_per.can_cuell_per || 2;

        this._hc861("Cancer Cuello Uterino", can_cuell_per, '#can_cuell_per')
          .then((data) => {
            this.dato_8031.dato_per.can_cuell_per = data;
            this.dato_otroCancer_per();
          })
          .catch((err) => {
            this.dato_cancerMam_per();
          });
      }
    },

    dato_otroCancer_per() {
      let otro_can_per = this.dato_8031.dato_per.otro_can_per || 2;

      this._hc861("Otro Tipo Cancer", otro_can_per, '#otro_can_per')
        .then((data) => {
          this.dato_8031.dato_per.otro_can_per = data;
          this.dato_hemoVagi_per();
        })
        .catch((err) => {
          if ($_REG_PACI.SEXO == "M") {
            this.dato_cancerMam_per();
          } else {
            this.dato_cancerCuelloUte_per();
          }
        });
    },

    dato_hemoVagi_per() {
      if ($_REG_PACI.SEXO == 'M') {
        this.dato_8031.dato_per.hemorrag_vag_per = '2';
        this.datoOtroCualesPer();

      } else {
        let hemorrag_vag_per = this.dato_8031.dato_per.hemorrag_vag_per || 2;

        this._hc861("Hemorragia Vaginal", hemorrag_vag_per, '#hemorrag_vag_per')
          .then((data) => {
            this.dato_8031.dato_per.hemorrag_vag_per = data;
            this.datoOtroCualesPer();
          })
          .catch((err) => {
            this.dato_otroCancer_per()
          });
      }
    },

    datoOtroCualesPer() {
      if (this.dato_8031.dato_per.otros_antec_per.trim() == '') this.dato_8031.dato_per.otros_antec_per = 'N/A';
      validarInputs({
        form: '#otro_cuales_per'
      }, () => {

        if ($_REG_PACI.SEXO == 'M') {
          this.dato_otroCancer_per();
        } else {
          this.dato_hemoVagi_per();
        }
      }, () => {
        this.dato_8031.dato_per.otros_antec_per = this.dato_8031.dato_per.otros_antec_per.toUpperCase();
        this.datoCovid19();
      })
    },

    datoCovid19() {
      switch (this.hcprc.serv) {
        case '01':
        case '02':
        case '08':
        case '09':
        case '63':
          if (this.nit_usu == 900541158 && this.hcprc.serv == '09') {
            this.grabarPag1()
          } else {
            this.covid19 = this.hcprc.covid19
            this.params_hc890h.pregunta = 1;
            this.params_hc890h.estado = true;
          }
          break;
        default:
          this.covid19 = {
            consenti_acomp_covid19: '',
            contacto_covid19: '',
            disnea_covid19: '',
            fiebre_covid19: '',
            lugar_dentro_covid19: '',
            lugar_fuera_covid19: '',
            malestar_covid19: '',
            odinofagia_covid19: '',
            personal_salud_covid19: '',
            recomendacion_covid19: '',
            rinorrea_covid19: '',
            tiempo_dentro_covid19: '',
            tiempo_fuera_covid19: '',
            tos_covid19: '',
            viaje_covid19: '',
            viaje_dentro_covid19: '',
            viaje_fuera_covid19: ''
          }

          this.grabarPag1()
          break;
      }
    },

    EscpreguntasCovid(pregunta) {
      this.params_hc890h.pregunta = 0
      this.params_hc890h.estado = false

      switch (parseFloat(pregunta)) {
        case 1:
        default:
          this.datoOtroCualesPer();
          scrollProsoft("antecedentes_personales", "smooth", "end");
          break;
        case 2:
          this.validarDiagnosticos(0);
          break;
      }
    },

    recibirPreguntasCovid(pregunta, param) {
      this.hcprc.covid19 = param
      this.params_hc890h.pregunta = 0
      this.params_hc890h.estado = false

      switch (parseFloat(pregunta)) {
        case 1:
          this.grabarPag1()
          break;
        case 2:
          this.ventanaSintomRespi()
          break;
        default:
          this.grabarPag1()
          break;
      }
    },

    async grabarPag1() {
      await this.grabar();

      await this.grabar_detalle_2035();

      if ($_REG_PACI.SEXO == 'M') {
        await this.pantalla_04();
      } else {
        await this.pantalla_02();
      }
    },

    pantalla_02() {
      scrollProsoft("antecedentes_gineco", "smooth", "end");
      this.datoGestaciones_4040();
    },

    datoGestaciones_4040() {
      validarInputs({
        form: '#gestaciones_esq'
      }, () => {
        this.datoCovid19();
      }, () => {
        var gest = parseInt(this.dato_4040.gineco_esq_w.gestaciones_esq_w);
        if (gest > 30) {
          CON851('02', '02', null, 'error', 'error')
          this.datoGestaciones_4040()
        } else if (gest == 0) {
          this.dato_4040.gineco_esq_w.gestaciones_esq_w = 0;
          this.dato_4040.gineco_esq_w.partos_esq_w = 0;
          this.dato_4040.gineco_esq_w.cesareas_esq_w = 0;
          this.dato_4040.gineco_esq_w.gine_vivos_esq_w = 0;
          this.dato_4040.gineco_esq_w.partos_termino_esq_w = 0;
          this.dato_4040.gineco_esq_w.partos_prematuro_esq_w = 0;
          this.dato_4040.gineco_esq_w.abortos_esq_w = 0;
          this.dato_4040.gineco_esq_w.fecha_primer_embar_esq_w = 0;
          this.form.ano_primEmbar = 0;
          this.form.mes_primEmbar = 0;
          this.form.dia_primEmbar = 0;
          this.dato_4040.gineco_esq_w.ult_parto_esq_w = 0;
          this.form.ano_ultParto = 0;
          this.form.mes_ultParto = 0;
          this.form.dia_ultParto = 0;
          this.dato_4040.gineco_esq_w.gine_muertos_esq_w = 0;

          this.dato_4040.obstetric_esq_w.lactancia_esq_w = '';
          this.dato_8031.dato_per2.embarazo_ectopico = 0;

          this.datoMenarquia_4040();
        } else {
          // continue
          this.datoPartos_4040();
        }
      })
    },

    datoPartos_4040() {
      validarInputs({
        form: '#partos_esq'
      }, () => {
        this.datoGestaciones_4040();
      }, () => {
        var partos = parseInt(this.dato_4040.gineco_esq_w.partos_esq_w);
        var gest = parseInt(this.dato_4040.gineco_esq_w.gestaciones_esq_w);
        if (partos > gest) {
          CON851('03', '03', null, 'error', 'error')
          this.datoPartos_4040();
        } else {
          // continue
          this.datoCesarias_4040();
        }
      })
    },

    datoCesarias_4040() {
      validarInputs({
        form: '#cesareas_esq'
      }, () => {
        this.datoPartos_4040();
      }, () => {
        var cesaria = parseInt(this.dato_4040.gineco_esq_w.cesareas_esq_w);
        var gest = parseInt(this.dato_4040.gineco_esq_w.gestaciones_esq_w);
        var partos = parseInt(this.dato_4040.gineco_esq_w.partos_esq_w);
        if (cesaria > (gest - partos)) {
          CON851('03', '03', null, 'error', 'error')
          this.datoCesarias_4040();
        } else {
          // se calcula los abortos
          this.dato_4040.gineco_esq_w.abortos_esq_w = (gest - partos - cesaria);
          this.dato_4040.gineco_esq_w.abortos_esq_w = this.dato_4040.gineco_esq_w.abortos_esq_w.toString();
          this.datoNacidosVivos_4040();
        }
      })
    },

    datoNacidosVivos_4040() {
      var cesaria = parseInt(this.dato_4040.gineco_esq_w.cesareas_esq_w);
      var partos = parseInt(this.dato_4040.gineco_esq_w.partos_esq_w);
      if (partos == 0 && cesaria == 0) {
        this.dato_4040.gineco_esq_w.gine_vivos_esq_w = 0;
        this.datoAnoParto_4040();
      } else {
        validarInputs({
          form: '#gine_vivos_esq'
        }, () => {
          this.datoCesarias_4040();
        }, () => {
          // continue
          this.datoNaciMuertos_4040();
        })
      }
    },

    datoNaciMuertos_4040() {
      validarInputs({
        form: '#gine_muertos_esq'
      }, () => {
        this.datoNacidosVivos_4040();
      }, () => {
        // continue
        this.datoPartosTermino_4040();
      })
    },

    datoPartosTermino_4040() {
      validarInputs({
        form: '#partos_termino_esq'
      }, () => {
        this.datoNacidosVivos_4040();
      }, () => {
        var partTerminos = parseInt(this.dato_4040.gineco_esq_w.partos_termino_esq_w);
        var cesaria = parseInt(this.dato_4040.gineco_esq_w.cesareas_esq_w);
        var partos = parseInt(this.dato_4040.gineco_esq_w.partos_esq_w);

        if (partTerminos > (partos + cesaria)) {
          CON851('03', '03', null, 'error', 'error')
          this.datoPartosTermino_4040();
        } else {
          this.dato_4040.gineco_esq_w.partos_prematuro_esq_w = (partos + cesaria) - partTerminos;
          this.dato_4040.gineco_esq_w.partos_prematuro_esq_w = this.dato_4040.gineco_esq_w.partos_prematuro_esq_w.toString();
          // continue
          this.datoAnoParto_4040();
        }
      })
    },

    datoAnoParto_4040() {
      var cesaria = parseInt(this.dato_4040.gineco_esq_w.cesareas_esq_w);
      var partos = parseInt(this.dato_4040.gineco_esq_w.partos_esq_w);

      if (partos == 0 && cesaria == 0) {
        // continue
        this.datoLactancia_4040();
      } else {
        validarInputs({
          form: '#anoUltParto'
        }, () => {
          this.datoPartosTermino_4040();
        }, () => {
          var ano = parseInt(this.form.ano_ultParto);

          if (ano < 1950) {
            CON851('03', '03', null, 'error', 'error')
            this.datoAnoParto_4040();
          } else {
            // continue
            this.datoMesParto_4040();
          }
        })
      }
    },

    datoMesParto_4040() {
      validarInputs({
        form: '#mesUltParto'
      }, () => {
        this.datoAnoParto_4040();
      }, () => {
        this.form.mes_ultParto = cerosIzq(this.form.mes_ultParto, 2);
        var mes = parseInt(this.form.mes_ultParto);

        if (mes > 12 || mes == 0 || mes < 0) {
          CON851('03', '03', null, 'error', 'error')
          this.datoMesParto_4040();
        } else {
          // continue
          this.datoDiaParto_4040();
        }
      })
    },

    datoDiaParto_4040() {
      validarInputs({
        form: '#diaUltParto'
      }, () => {
        this.datoMesParto_4040();
      }, () => {
        this.form.dia_ultParto = cerosIzq(this.form.dia_ultParto, 2);
        var dia = parseInt(this.form.dia_ultParto);

        if (dia > 31 || dia == 0 || dia < 0) {
          CON851('03', '03', null, 'error', 'error')
          this.datoDiaParto_4040();
        } else {
          this.dato_4040.gineco_esq_w.ult_parto_esq_w = `${this.form.ano_ultParto}${this.form.mes_ultParto}${this.form.dia_ultParto}`;
          var fechaUltPart = parseInt(this.dato_4040.gineco_esq_w.ult_parto_esq_w);

          if (fechaUltPart > this.fecha_act) {
            CON851('37', '37', null, 'error', 'error')
            this.datoAnoParto_4040();
          } else {
            // continue
            this.datoAnoPrimerEmba_4040();
          }
        }
      })
    },

    datoAnoPrimerEmba_4040() {
      var cesaria = parseInt(this.dato_4040.gineco_esq_w.cesareas_esq_w);
      var partos = parseInt(this.dato_4040.gineco_esq_w.partos_esq_w);

      if ((partos + cesaria) == 1) {
        this.form.ano_primEmbar = this.form.ano_ultParto;
        this.form.mes_primEmbar = this.form.mes_ultParto;
        this.form.dia_primEmbar = this.form.dia_ultParto;

        this.dato_4040.gineco_esq_w.fecha_primer_embar_esq_w = this.dato_4040.gineco_esq_w.ult_parto_esq_w;

        // continue
        this.datoLactancia_4040();
      } else {
        validarInputs({
          form: '#anoPrimEmbar'
        }, () => {
          this.datoDiaParto_4040();
        }, () => {
          var ano = parseInt(this.form.ano_primEmbar);

          if (ano < 1950) {
            CON851('03', '03', null, 'error', 'error')
            this.datoAnoPrimerEmba_4040();
          } else {
            // continue
            this.datoMesPrimerEmba_4040();
          }
        })
      }
    },

    datoMesPrimerEmba_4040() {
      validarInputs({
        form: '#mesPrimEmbar'
      }, () => {
        this.datoAnoPrimerEmba_4040();
      }, () => {
        this.form.mes_primEmbar = cerosIzq(this.form.mes_primEmbar, 2);
        var mes = parseInt(this.form.mes_primEmbar);

        if (mes > 12 || mes < 0 || mes == 0) {
          CON851('03', '03', null, 'error', 'error')
          this.datoMesPrimerEmba_4040();
        } else {
          // continue
          this.datodiaPrimerEmba_4040();
        }
      })
    },

    datodiaPrimerEmba_4040() {
      validarInputs({
        form: '#diaPrimEmbar'
      }, () => {
        this.datoMesPrimerEmba_4040();
      }, () => {
        this.form.dia_primEmbar = cerosIzq(this.form.dia_primEmbar, 2);
        var dia = parseInt(this.form.dia_primEmbar);

        if (dia > 31 || dia < 0 || dia == 0) {
          CON851('03', '03', null, 'error', 'error')
          this.datodiaPrimerEmba_4040();
        } else {
          this.dato_4040.gineco_esq_w.fecha_primer_embar_esq_w = `${this.form.ano_primEmbar}${this.form.mes_primEmbar}${this.form.dia_primEmbar}`;
          var fechaPrimEmba = parseInt(this.dato_4040.gineco_esq_w.fecha_primer_embar_esq_w);

          if (fechaPrimEmba > this.fecha_act) {
            CON851('37', '37', null, 'error', 'error')
            this.datoAnoParto_4040();
          } else {
            // continue
            this.datoLactancia_4040()
          }
        }
      })
    },

    datoLactancia_4040() {
      this.dato_4040.obstetric_esq_w.lactancia_esq_w.trim() == '' ? this.dato_4040.obstetric_esq_w.lactancia_esq_w = 'N' : false;
      validarInputs({
        form: '#lactancia_esq'
      }, () => {
        if (this.dato_4040.gineco_esq_w.ult_parto_esq_w == 00000000 || this.dato_4040.gineco_esq_w.ult_parto_esq_w.trim() == '') {
          this.datoGestaciones_4040();
        } else {
          this.datoAnoParto_4040();
        }
      }, () => {
        this.dato_4040.obstetric_esq_w.lactancia_esq_w = this.dato_4040.obstetric_esq_w.lactancia_esq_w.toUpperCase();
        var lact = this.dato_4040.obstetric_esq_w.lactancia_esq_w;
        if (lact == 'S' || lact == 'N') {
          // continue
          this.datoEtopico();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoLactancia_4040();
        }
      })
    },

    datoEtopico() {
      validarInputs({
        form: '#embarazo_ectopico'
      }, () => {
        this.datoLactancia_4040();
      }, () => {
        // continue
        this.datoMenarquia_4040();
      })
    },

    datoMenarquia_4040() {
      validarInputs({
        form: '#menarquia_esq'
      }, () => {
        var gest = parseInt(this.dato_4040.gineco_esq_w.gestaciones_esq_w);
        if (gest == 0) {
          this.datoGestaciones_4040();
        } else {
          this.datoEtopico();
        }
      }, () => {
        var menarq = parseInt(this.dato_4040.gineco_esq_w.menarquia_esq_w);

        if (menarq == 0) {

          if ($_REG_HC.edad_hc.vlr_edad > 17) {
            CON851('74', '74', null, 'error', 'error')
            this.datoMenarquia_4040();
          } else {
            this.dato_4040.gineco_esq_w.fecha_regla_esq_w = '';
            this.dato_4040.gineco_esq_w.dismenorrea_esq_w = '';
            this.dato_4040.gineco_esq_w.ciclos_esq_w = '';
            // continue
            this.datoAnoCitol_4040();
          }
        } else {
          if (menarq < 9) {
            CON851('03', '03', null, 'error', 'error')
            this.datoMenarquia_4040();
          } else {
            // continue
            this.datoAnoRegla_4040();
          }
        }
      })
    },

    datoAnoRegla_4040() {
      validarInputs({
        form: '#anoRegla'
      }, () => {
        this.datoMenarquia_4040();
      }, () => {
        var ano = parseInt(this.form.ano_regla);

        if (ano < 1950) {
          CON851('03', '03', null, 'error', 'error')
          this.datoAnoRegla_4040();
        } else {
          // continue
          this.datoMesRegla_4040();
        }
      })
    },

    datoMesRegla_4040() {
      validarInputs({
        form: '#mesRegla'
      }, () => {
        this.datoAnoRegla_4040();
      }, () => {
        this.form.mes_regla = cerosIzq(this.form.mes_regla, 2);
        var mes = parseInt(this.form.mes_regla);

        if (mes > 12 || mes < 1 || mes == 0) {
          CON851('03', '03', null, 'error', 'error')
          this.datoMesRegla_4040();
        } else {
          // continue
          this.datoDiaRegla_4040();
        }
      })
    },

    datoDiaRegla_4040() {
      validarInputs({
        form: '#diaRegla'
      }, () => {
        this.datoMesRegla_4040();
      }, () => {
        this.form.dia_regla = cerosIzq(this.form.dia_regla, 2);
        var dia = parseInt(this.form.dia_regla);

        if (dia > 31 || dia < 1 || dia == 0) {
          CON851('03', '03', null, 'error', 'error')
          this.datoDiaRegla_4040();
        } else {
          this.dato_4040.gineco_esq_w.fecha_regla_esq_w = `${this.form.ano_regla}${this.form.mes_regla}${this.form.dia_regla}`;
          var fechaRegla = parseInt(this.dato_4040.gineco_esq_w.fecha_regla_esq_w);

          if (fechaRegla > this.fecha_act) {
            CON851('37', '37', null, 'error', 'error')
            this.datoAnoRegla_4040();
          } else {
            // continue
            this.datoDismenorrea_4040();
          }
        }
      })
    },

    datoDismenorrea_4040() {
      this.dato_4040.gineco_esq_w.dismenorrea_esq_w.trim() == '' ? this.dato_4040.gineco_esq_w.dismenorrea_esq_w = 'N' : false;
      validarInputs({
        form: '#dismenorrea_esq'
      }, () => {
        this.datoAnoRegla_4040();
      }, () => {
        this.dato_4040.gineco_esq_w.dismenorrea_esq_w = this.dato_4040.gineco_esq_w.dismenorrea_esq_w.toUpperCase();
        var disme = this.dato_4040.gineco_esq_w.dismenorrea_esq_w;
        if (disme == 'S' || disme == 'N') {
          // continue
          this.datoCiclos_4040();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoDismenorrea_4040();
        }
      })
    },

    datoCiclos_4040() {
      this.ciclos_HC8031();
    },

    datoIrregular_4040() {
      var ciclo = parseInt(this.dato_4040.gineco_esq_w.ciclos_esq_w);

      if (ciclo == 1) {
        this.dato_4040.gineco_esq_w.ciclo_irreg_esq_w = '';
        this.datoAnoCitol_4040();
      } else {
        validarInputs({
          form: '#ciclo_irreg_esq'
        }, () => {
          this.datoCiclos_4040();
        }, () => {
          // continue
          this.datoAnoCitol_4040();
        })
      }
    },

    datoAnoCitol_4040() {
      validarInputs({
        form: '#anoCitol'
      }, () => {
        this.datoCiclos_4040();
      }, () => {
        var ano = this.form.ano_citol;

        if (ano.trim() == '') {
          if (this.nit_usu == 900005594) {
            CON851('02', '02', null, 'error', 'error')
            this.datoAnoCitol_4040();
          } else {
            // continue
            this.dato_4040.gineco_esq_w.fecha_citol_esq_w = '';
            this.dato_4040.gineco_esq_w.result_citol_esq_w = '';
            this.dato_4040.gineco_esq_w.citol_anormal_esq_w = '';
            this.ventanaCirug_4040();
          }
        } else {
          if (parseInt(ano) < 1950) {
            CON851('03', '03', null, 'error', 'error')
            this.datoAnoCitol_4040();
          } else {
            // continue
            this.datoMesCitol_4040();
          }
        }
      })
    },

    datoMesCitol_4040() {
      validarInputs({
        form: '#mesCitol'
      }, () => {
        this.datoAnoCitol_4040();
      }, () => {
        this.form.mes_citol = cerosIzq(this.form.mes_citol, 2);
        var mes = parseInt(this.form.mes_citol);

        if (mes > 12 || mes == 0 || mes < 1) {
          CON851('03', '03', null, 'error', 'error')
          this.datoMesCitol_4040();
        } else {
          // continue
          this.datoDiaCitol_4040();
        }
      })
    },

    datoDiaCitol_4040() {
      validarInputs({
        form: '#diaCitol'
      }, () => {
        this.datoMesCitol_4040();
      }, () => {
        this.form.dia_citol = cerosIzq(this.form.dia_citol, 2);
        var dia = parseInt(this.form.dia_citol);

        if (dia > 31 || dia == 0 || dia < 1) {
          CON851('03', '03', null, 'error', 'error')
          this.datoDiaCitol_4040();
        } else {
          this.dato_4040.gineco_esq_w.fecha_citol_esq_w = `${this.form.ano_citol}${this.form.mes_citol}${this.form.dia_citol}`;
          var fechaCitol = parseInt(this.dato_4040.gineco_esq_w.fecha_citol_esq_w);

          if (fechaCitol > this.fecha_act) {
            CON851('37', '37', null, 'error', 'error')
            this.datoAnoCitol_4040();
          } else {
            // continue
            this.datoResultCito_4040();
          }
        }
      })
    },

    datoResultCito_4040() {
      this.resultCitol_HC8031();
    },

    datoAnorCitol_4040() {
      validarInputs({
        form: '#citol_anormal_esq'
      }, () => {
        this.datoResultCito_4040();
      }, () => {
        // continue
        this.ventanaCirug_4040();
      })
    },

    ventanaCirug_4040() {
      validarInputs({
        form: '#cirugias_gineco_esq'
      }, () => {
        this.datoAnoCitol_4040();
      }, () => {
        this.dato_4040.gineco_esq_w.cirugias_gineco_esq_w = this.dato_4040.gineco_esq_w.cirugias_gineco_esq_w.toUpperCase();
        // continue
        this.datoResultPrueEmbar_4040();
      })
    },

    datoResultPrueEmbar_4040() {
      this.resultPruebaEmbar_HC8031();
    },

    datoAnoPrueEmbar_4040() {
      validarInputs({
        form: '#anoPrueEmb'
      }, () => {
        this.datoResultPrueEmbar_4040();
      }, () => {
        var ano = parseInt(this.form.ano_prueEmb);

        if (ano < 2000) {
          CON851('03', '03', null, 'error', 'error')
          this.datoAnoPrueEmbar_4040();
        } else {
          // continue
          this.datoMesPrueEmbar_4040();
        }
      })
    },

    datoMesPrueEmbar_4040() {
      validarInputs({
        form: '#mesPrueEmb'
      }, () => {
        this.datoAnoPrueEmbar_4040();
      }, () => {
        this.form.mes_prueEmb = cerosIzq(this.form.mes_prueEmb, 2);
        var mes = parseInt(this.form.mes_prueEmb);

        if (mes > 12 || mes == 0 || mes < 1) {
          CON851('03', '03', null, 'error', 'error')
          this.datoMesPrueEmbar_4040();
        } else {
          // continue
          this.datoDiaPrueEmbar_4040();
        }
      })
    },

    datoDiaPrueEmbar_4040() {
      validarInputs({
        form: '#diaPrueEmb'
      }, () => {
        this.datoMesPrueEmbar_4040();
      }, () => {
        this.form.dia_prueEmb = cerosIzq(this.form.dia_prueEmb, 2);
        var dia = parseInt(this.form.dia_prueEmb);

        if (dia > 31 || dia == 0 || dia < 1) {
          CON851('03', '03', null, 'error', 'error')
          this.datoDiaPrueEmbar_4040();
        } else {
          this.dato_4040.gineco_esq_w.fecha_pru_emb_esq_w = `${this.form.ano_prueEmb}${this.form.mes_prueEmb}${this.form.dia_prueEmb}`;
          var fechaPrueEmbar = parseInt(this.dato_4040.gineco_esq_w.fecha_pru_emb_esq_w);

          if (fechaPrueEmbar > this.fecha_act) {
            CON851('37', '37', null, 'error', 'error')
            this.datoAnoPrueEmbar_4040();
          } else {
            // continue
            this.datoFrotisFlujo_4040();
          }
        }
      })
    },


    datoFrotisFlujo_4040() {
      this.dato_4040.gineco_esq_w.frotis_flujo_esq_w.trim() == '' ? this.dato_4040.gineco_esq_w.frotis_flujo_esq_w = 'N' : false;
      validarInputs({
        form: '#frotis_flujo_esq'
      }, () => {
        this.datoAnoPrueEmbar_4040();
      }, () => {
        this.dato_4040.gineco_esq_w.frotis_flujo_esq_w = this.dato_4040.gineco_esq_w.frotis_flujo_esq_w.toUpperCase();
        var frotis = this.dato_4040.gineco_esq_w.frotis_flujo_esq_w;
        if (frotis == 'S' || frotis == 'N') {
          if (frotis == 'N') {
            this.dato_4040.gineco_esq_w.resultado_frotis_esq_w = '';
            this.dato_4040.gineco_esq_w.fecha_frotis_esq_w = '';
            // continue
            this.grabarPag2();
          } else {
            // continue
            this.ventanaResultFrotis_4040();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoFrotisFlujo_4040();
        }
      })
    },

    ventanaResultFrotis_4040() {
      validarInputs({
        form: '#resultado_frotis_esq'
      }, () => {
        this.datoFrotisFlujo_4040();
      }, () => {
        this.dato_4040.gineco_esq_w.resultado_frotis_esq_w = this.dato_4040.gineco_esq_w.resultado_frotis_esq_w.toUpperCase();
        // continue
        this.datoAnoFrotis_4040();
      })
    },

    datoAnoFrotis_4040() {
      validarInputs({
        form: '#anoFrotis'
      }, () => {
        this.ventanaResultFrotis_4040();
      }, () => {
        var ano = parseInt(this.form.ano_frotis);

        if (ano < 1950) {
          CON851('03', '03', null, 'error', 'error')
          this.datoAnoFrotis_4040();
        } else {
          // continue
          this.datoMesFrotis_4040();
        }
      })
    },

    datoMesFrotis_4040() {
      validarInputs({
        form: '#mesFrotis'
      }, () => {
        this.datoAnoFrotis_4040();
      }, () => {
        this.form.mes_frotis = cerosIzq(this.form.mes_frotis, 2);
        var mes = parseInt(this.form.mes_frotis);

        if (mes > 12 || mes == 0 || mes < 1) {
          CON851('03', '03', null, 'error', 'error')
          this.datoMesFrotis_4040();
        } else {
          // continue
          this.diaMesFrotis_4040();
        }
      })
    },

    diaMesFrotis_4040() {
      validarInputs({
        form: '#diaFrotis'
      }, () => {
        this.datoMesFrotis_4040();
      }, () => {
        this.form.dia_frotis = cerosIzq(this.form.dia_frotis, 2);
        var dia = parseInt(this.form.dia_frotis);

        if (dia > 31 || dia == 0 || dia < 1) {
          CON851('03', '03', null, 'error', 'error')
          this.diaMesFrotis_4040();
        } else {
          this.dato_4040.gineco_esq_w.fecha_frotis_esq_w = `${this.form.ano_frotis}${this.form.mes_frotis}${this.form.dia_frotis}`;
          var fechaFrotis = parseInt(this.dato_4040.gineco_esq_w.fecha_frotis_esq_w);

          if (fechaFrotis > this.fecha_act) {
            CON851('37', '37', null, 'error', 'error')
            this.datoAnoFrotis_4040();
          } else {
            // continue
            this.grabarPag2();
          }
        }
      })
    },

    async grabarPag2() {
      await this.grabar();
      scrollProsoft("antecedentes_anticonceptivos", "smooth", "start");
      await this.pantalla_03();
    },

    pantalla_03() {
      this.datoEmbaMetod();
    },

    datoEmbaMetod() {
      setTimeout(() => { this.embarMetod_HC8031(); }, 300);
    },

    datoCualMetodEmba() {
      setTimeout(() => { this.cualEmbarMetod_HC8031(); }, 300);
    },

    // Diu

    datoDiuConoce() {
      this.dato_2079.diu.diu_con.trim() == '' ? this.dato_2079.diu.diu_con = 'N' : false;
      validarInputs({
        form: '#diu_con'
      }, () => {
        this.datoEmbaMetod();
      }, () => {
        this.dato_2079.diu.diu_con = this.dato_2079.diu.diu_con.toUpperCase();
        var diuCon = this.dato_2079.diu.diu_con;
        if (diuCon == 'S' || diuCon == 'N') {
          if (diuCon == 'N') {
            // continue
            this.dato_2079.diu.diu_usant = 'N';
            this.dato_2079.diu.diu_usact = 'N';
            this.dato_2079.diu.diu_indic = '';
            this.datoOralConoce();
          } else {
            this.datoDiuUsadoAntes();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoDiuConoce();
        }
      })
    },

    datoDiuUsadoAntes() {
      this.dato_2079.diu.diu_usant.trim() == '' ? this.dato_2079.diu.diu_usant = 'N' : false;
      validarInputs({
        form: '#diu_usant'
      }, () => {
        this.datoDiuConoce();
      }, () => {
        this.dato_2079.diu.diu_usant = this.dato_2079.diu.diu_usant.toUpperCase();
        var diuUsaAnt = this.dato_2079.diu.diu_usant;
        if (diuUsaAnt == 'S' || diuUsaAnt == 'N') {
          this.datoDiuUsoAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoDiuUsadoAntes();
        }
      })
    },

    datoDiuUsoAct() {
      this.dato_2079.diu.diu_usact.trim() == '' ? this.dato_2079.diu.diu_usact = 'N' : false;
      validarInputs({
        form: '#diu_usact'
      }, () => {
        this.datoDiuUsadoAntes();
      }, () => {
        this.dato_2079.diu.diu_usact = this.dato_2079.diu.diu_usact.toUpperCase();
        var diuUsaAct = this.dato_2079.diu.diu_usact;
        if (diuUsaAct == 'S' || diuUsaAct == 'N') {
          this.datoDiuIndicPor();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoDiuUsoAct();
        }
      })
    },

    datoDiuIndicPor() {
      var diuUsoAnt = this.dato_2079.diu.diu_usant;
      var diuUsoAct = this.dato_2079.diu.diu_usact;
      if (diuUsoAnt == 'N' && diuUsoAct == 'N') {
        this.dato_2079.diu.diu_indic = '';
        this.datoOralConoce();
      } else {
        this.diuIndicPor_HC8031();
      }
    },

    // oral

    datoOralConoce() {
      this.dato_2079.oral.oral_con.trim() == '' ? this.dato_2079.oral.oral_con = 'N' : false;
      validarInputs({
        form: '#oral_con'
      }, () => {
        this.datoDiuConoce();
      }, () => {
        this.dato_2079.oral.oral_con = this.dato_2079.oral.oral_con.toUpperCase();
        var oralCon = this.dato_2079.oral.oral_con;
        if (oralCon == 'S' || oralCon == 'N') {
          if (oralCon == 'N') {
            // continue
            this.dato_2079.oral.oral_usant = 'N';
            this.dato_2079.oral.oral_usact = 'N';
            this.dato_2079.oral.oral_indic = '';
            this.datoBarreraConoce();
          } else {
            this.datoOralUsadoAntes();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoOralConoce();
        }
      })
    },

    datoOralUsadoAntes() {
      this.dato_2079.oral.oral_usant.trim() == '' ? this.dato_2079.oral.oral_usant = 'N' : false;
      validarInputs({
        form: '#oral_usant'
      }, () => {
        this.datoOralConoce();
      }, () => {
        this.dato_2079.oral.oral_usant = this.dato_2079.oral.oral_usant.toUpperCase();
        var oralUsaAnt = this.dato_2079.oral.oral_usant;
        if (oralUsaAnt == 'S' || oralUsaAnt == 'N') {
          this.datoOralUsoAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoOralUsadoAntes();
        }
      })
    },

    datoOralUsoAct() {
      this.dato_2079.oral.oral_usact.trim() == '' ? this.dato_2079.oral.oral_usact = 'N' : false;
      validarInputs({
        form: '#oral_usact'
      }, () => {
        this.datoDiuUsadoAntes();
      }, () => {
        this.dato_2079.oral.oral_usact = this.dato_2079.oral.oral_usact.toUpperCase();
        var oralUsaAct = this.dato_2079.oral.oral_usact;
        if (oralUsaAct == 'S' || oralUsaAct == 'N') {
          this.datoOralIndicPor();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoOralUsoAct();
        }
      })
    },

    datoOralIndicPor() {
      var oralUsoAnt = this.dato_2079.oral.oral_usant;
      var oralUsoAct = this.dato_2079.oral.oral_usact;
      if (oralUsoAnt == 'N' && oralUsoAct == 'N') {
        this.dato_2079.oral.oral_indic = '';
        this.datoBarreraConoce();
      } else {
        this.oralIndicPor_HC8031();
      }
    },

    // Barrera

    datoBarreraConoce() {
      this.dato_2079.barr.barr_con.trim() == '' ? this.dato_2079.barr.barr_con = 'N' : false;
      validarInputs({
        form: '#barr_con'
      }, () => {
        this.datoOralConoce();
      }, () => {
        this.dato_2079.barr.barr_con = this.dato_2079.barr.barr_con.toUpperCase();
        var barrCon = this.dato_2079.barr.barr_con;
        if (barrCon == 'S' || barrCon == 'N') {
          if (barrCon == 'N') {
            // continue
            this.dato_2079.barr.barr_usant = 'N';
            this.dato_2079.barr.barr_usact = 'N';
            this.dato_2079.barr.barr_indic = '';
            this.datoDiuBarrConoce();
          } else {
            this.datoBarrUsadoAntes();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoBarreraConoce();
        }
      })
    },

    datoBarrUsadoAntes() {
      this.dato_2079.barr.barr_usant.trim() == '' ? this.dato_2079.barr.barr_usant = 'N' : false;
      validarInputs({
        form: '#barr_usant'
      }, () => {
        this.datoBarreraConoce();
      }, () => {
        this.dato_2079.barr.barr_usant = this.dato_2079.barr.barr_usant.toUpperCase();
        var barrUsaAnt = this.dato_2079.barr.barr_usant;
        if (barrUsaAnt == 'S' || barrUsaAnt == 'N') {
          this.datoBarrUsoAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoBarrUsadoAntes();
        }
      })
    },

    datoBarrUsoAct() {
      this.dato_2079.barr.barr_usact.trim() == '' ? this.dato_2079.barr.barr_usact = 'N' : false;
      validarInputs({
        form: '#barr_usact'
      }, () => {
        this.datoBarrUsadoAntes();
      }, () => {
        this.dato_2079.barr.barr_usact = this.dato_2079.barr.barr_usact.toUpperCase();
        var BarrUsaAct = this.dato_2079.barr.barr_usact;
        if (BarrUsaAct == 'S' || BarrUsaAct == 'N') {
          this.datoBarrIndicPor();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoBarrUsoAct();
        }
      })
    },

    datoBarrIndicPor() {
      var barrUsoAnt = this.dato_2079.barr.barr_usant;
      var barrUsoAct = this.dato_2079.barr.barr_usact;
      if (barrUsoAnt == 'N' && barrUsoAct == 'N') {
        this.dato_2079.barr.barr_indic = '';
        this.datoDiuBarrConoce();
      } else {
        this.barrIndicPor_HC8031();
      }
    },

    // Diu + Barrera

    datoDiuBarrConoce() {
      this.dato_2079.diu_barr.diu_barr_con.trim() == '' ? this.dato_2079.diu_barr.diu_barr_con = 'N' : false;
      validarInputs({
        form: '#diu_barr_con'
      }, () => {
        this.datoBarreraConoce();
      }, () => {
        this.dato_2079.diu_barr.diu_barr_con = this.dato_2079.diu_barr.diu_barr_con.toUpperCase();
        var diuBarrCon = this.dato_2079.diu_barr.diu_barr_con;
        if (diuBarrCon == 'S' || diuBarrCon == 'N') {
          if (diuBarrCon == 'N') {
            // continue
            this.dato_2079.diu_barr.diu_barr_usant = 'N';
            this.dato_2079.diu_barr.diu_barr_usact = 'N';
            this.dato_2079.diu_barr.diu_barr_indic = '';
            this.datoImplSdConoce();
          } else {
            this.datoDiuBarrUsadoAntes();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoDiuBarrConoce();
        }
      })
    },

    datoDiuBarrUsadoAntes() {
      this.dato_2079.diu_barr.diu_barr_usant.trim() == '' ? this.dato_2079.diu_barr.diu_barr_usant = 'N' : false;
      validarInputs({
        form: '#diu_barr_usant'
      }, () => {
        this.datoDiuBarrConoce();
      }, () => {
        this.dato_2079.diu_barr.diu_barr_usant = this.dato_2079.diu_barr.diu_barr_usant.toUpperCase();
        var diubarrUsaAnt = this.dato_2079.diu_barr.diu_barr_usant;
        if (diubarrUsaAnt == 'S' || diubarrUsaAnt == 'N') {
          this.datoDiuBarrUsoAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoDiuBarrUsadoAntes();
        }
      })
    },

    datoDiuBarrUsoAct() {
      this.dato_2079.diu_barr.diu_barr_usact.trim() == '' ? this.dato_2079.diu_barr.diu_barr_usact = 'N' : false;
      validarInputs({
        form: '#diu_barr_usact'
      }, () => {
        this.datoDiuBarrUsadoAntes();
      }, () => {
        this.dato_2079.diu_barr.diu_barr_usact = this.dato_2079.diu_barr.diu_barr_usact.toUpperCase();
        var diuBarrUsaAct = this.dato_2079.diu_barr.diu_barr_usact;
        if (diuBarrUsaAct == 'S' || diuBarrUsaAct == 'N') {
          this.datoDiuBarrIndicPor();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoBarrUsoAct();
        }
      })
    },

    datoDiuBarrIndicPor() {
      var diuBarrUsoAnt = this.dato_2079.diu_barr.diu_barr_usant;
      var diuBarrUsoAct = this.dato_2079.diu_barr.diu_barr_usact;
      if (diuBarrUsoAnt == 'N' && diuBarrUsoAct == 'N') {
        this.dato_2079.diu_barr.diu_barr_indic = '';
        this.datoImplSdConoce();
      } else {
        this.diuBarrIndicPor_HC8031();
      }
    },

    // Impl subdermico

    datoImplSdConoce() {
      this.dato_2079.impl_sd.impl_sd_con.trim() == '' ? this.dato_2079.impl_sd.impl_sd_con = 'N' : false;
      validarInputs({
        form: '#impl_sd_con'
      }, () => {
        this.datoDiuBarrConoce();
      }, () => {
        this.dato_2079.impl_sd.impl_sd_con = this.dato_2079.impl_sd.impl_sd_con.toUpperCase();
        var impSdCon = this.dato_2079.impl_sd.impl_sd_con;
        if (impSdCon == 'S' || impSdCon == 'N') {
          if (impSdCon == 'N') {
            // continue
            this.dato_2079.impl_sd.impl_sd_usant = 'N';
            this.dato_2079.impl_sd.impl_sd_usact = 'N';
            this.dato_2079.impl_sd.impl_sd_indic = '';
            this.datoSdBarrConoce();
          } else {
            this.datoImplSdUsadoAntes();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoImplSdConoce();
        }
      })
    },

    datoImplSdUsadoAntes() {
      this.dato_2079.impl_sd.impl_sd_usant.trim() == '' ? this.dato_2079.impl_sd.impl_sd_usant = 'N' : false;
      validarInputs({
        form: '#impl_sd_usant'
      }, () => {
        this.datoImplSdConoce();
      }, () => {
        this.dato_2079.impl_sd.impl_sd_usant = this.dato_2079.impl_sd.impl_sd_usant.toUpperCase();
        var implSdUsaAnt = this.dato_2079.impl_sd.impl_sd_usant;
        if (implSdUsaAnt == 'S' || implSdUsaAnt == 'N') {
          this.datoImplSdUsoAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoImplSdUsadoAntes();
        }
      })
    },

    datoImplSdUsoAct() {
      this.dato_2079.impl_sd.impl_sd_usact.trim() == '' ? this.dato_2079.impl_sd.impl_sd_usact = 'N' : false;
      validarInputs({
        form: '#impl_sd_usact'
      }, () => {
        this.datoImplSdUsadoAntes();
      }, () => {
        this.dato_2079.impl_sd.impl_sd_usact = this.dato_2079.impl_sd.impl_sd_usact.toUpperCase();
        var implSdUsaAct = this.dato_2079.impl_sd.impl_sd_usact;
        if (implSdUsaAct == 'S' || implSdUsaAct == 'N') {
          this.datoImplSdIndicPor();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoImplSdUsoAct();
        }
      })
    },

    datoImplSdIndicPor() {
      var implSdUsoAnt = this.dato_2079.impl_sd.impl_sd_usant;
      var implSdUsoAct = this.dato_2079.impl_sd.impl_sd_usact;
      if (implSdUsoAnt == 'N' && implSdUsoAct == 'N') {
        this.dato_2079.impl_sd.impl_sd_indic = '';
        this.datoSdBarrConoce();
      } else {
        this.implSdIndicPor_HC8031();
      }
    },

    // subderm + barrera

    datoSdBarrConoce() {
      this.dato_2079.sd_barr.sd_barr_con.trim() == '' ? this.dato_2079.sd_barr.sd_barr_con = 'N' : false;
      validarInputs({
        form: '#sd_barr_con'
      }, () => {
        this.datoImplSdConoce();
      }, () => {
        this.dato_2079.sd_barr.sd_barr_con = this.dato_2079.sd_barr.sd_barr_con.toUpperCase();
        var sdBarrCon = this.dato_2079.sd_barr.sd_barr_con;
        if (sdBarrCon == 'S' || sdBarrCon == 'N') {
          if (sdBarrCon == 'N') {
            // continue
            this.dato_2079.sd_barr.sd_barr_usant = 'N';
            this.dato_2079.sd_barr.sd_barr_usact = 'N';
            this.dato_2079.sd_barr.sd_barr_indic = '';
            this.datoOralBarrConoce();
          } else {
            this.datoSdBarrUsadoAntes();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoSdBarrConoce();
        }
      })
    },

    datoSdBarrUsadoAntes() {
      this.dato_2079.sd_barr.sd_barr_usant.trim() == '' ? this.dato_2079.sd_barr.sd_barr_usant = 'N' : false;
      validarInputs({
        form: '#sd_barr_usant'
      }, () => {
        this.datoSdBarrConoce();
      }, () => {
        this.dato_2079.sd_barr.sd_barr_usant = this.dato_2079.sd_barr.sd_barr_usant.toUpperCase();
        var sdBarrUsaAnt = this.dato_2079.sd_barr.sd_barr_usant;
        if (sdBarrUsaAnt == 'S' || sdBarrUsaAnt == 'N') {
          this.datoSdBarrUsoAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoSdBarrUsadoAntes();
        }
      })
    },

    datoSdBarrUsoAct() {
      this.dato_2079.sd_barr.sd_barr_usact.trim() == '' ? this.dato_2079.sd_barr.sd_barr_usact = 'N' : false;
      validarInputs({
        form: '#sd_barr_usact'
      }, () => {
        this.datoSdBarrUsadoAntes();
      }, () => {
        this.dato_2079.sd_barr.sd_barr_usact = this.dato_2079.sd_barr.sd_barr_usact.toUpperCase();
        var sdBarrUsaAct = this.dato_2079.sd_barr.sd_barr_usact;
        if (sdBarrUsaAct == 'S' || sdBarrUsaAct == 'N') {
          this.datoSdBarrIndicPor();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoSdBarrUsoAct();
        }
      })
    },

    datoSdBarrIndicPor() {
      var sdBarrUsoAnt = this.dato_2079.sd_barr.sd_barr_usant;
      var sdBarrUsoAct = this.dato_2079.sd_barr.sd_barr_usact;
      if (sdBarrUsoAnt == 'N' && sdBarrUsoAct == 'N') {
        this.dato_2079.sd_barr.sd_barr_indic = '';
        this.datoOralBarrConoce();
      } else {
        this.sdBarrIndicPor_HC8031();
      }
    },

    // Oral + Barrera

    datoOralBarrConoce() {
      this.dato_2079.oral_barr.oral_barr_con.trim() == '' ? this.dato_2079.oral_barr.oral_barr_con = 'N' : false;
      validarInputs({
        form: '#oral_barr_con'
      }, () => {
        this.datoSdBarrConoce();
      }, () => {
        this.dato_2079.oral_barr.oral_barr_con = this.dato_2079.oral_barr.oral_barr_con.toUpperCase();
        var oralBarrCon = this.dato_2079.oral_barr.oral_barr_con;
        if (oralBarrCon == 'S' || oralBarrCon == 'N') {
          if (oralBarrCon == 'N') {
            // continue
            this.dato_2079.oral_barr.oral_barr_usant = 'N';
            this.dato_2079.oral_barr.oral_barr_usact = 'N';
            this.dato_2079.oral_barr.oral_barr_indic = '';
            this.datoInyectMensConoce();
          } else {
            this.datoOralBarrUsadoAntes();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoOralBarrConoce();
        }
      })
    },

    datoOralBarrUsadoAntes() {
      this.dato_2079.oral_barr.oral_barr_usant.trim() == '' ? this.dato_2079.oral_barr.oral_barr_usant = 'N' : false;
      validarInputs({
        form: '#oral_barr_usant'
      }, () => {
        this.datoOralBarrConoce();
      }, () => {
        this.dato_2079.oral_barr.oral_barr_usant = this.dato_2079.oral_barr.oral_barr_usant.toUpperCase();
        var oralBarrUsaAnt = this.dato_2079.oral_barr.oral_barr_usant;
        if (oralBarrUsaAnt == 'S' || oralBarrUsaAnt == 'N') {
          this.datoOralBarrUsoAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoOralBarrUsadoAntes();
        }
      })
    },

    datoOralBarrUsoAct() {
      this.dato_2079.oral_barr.oral_barr_usact.trim() == '' ? this.dato_2079.oral_barr.oral_barr_usact = 'N' : false;
      validarInputs({
        form: '#oral_barr_usact'
      }, () => {
        this.datoSdBarrUsadoAntes();
      }, () => {
        this.dato_2079.oral_barr.oral_barr_usact = this.dato_2079.oral_barr.oral_barr_usact.toUpperCase();
        var oralBarrUsaAct = this.dato_2079.oral_barr.oral_barr_usact;
        if (oralBarrUsaAct == 'S' || oralBarrUsaAct == 'N') {
          this.datoOralBarrIndicPor();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoOralBarrUsoAct();
        }
      })
    },

    datoOralBarrIndicPor() {
      var oralBarrUsoAnt = this.dato_2079.oral_barr.oral_barr_usant;
      var oralBarrUsoAct = this.dato_2079.oral_barr.oral_barr_usact;
      if (oralBarrUsoAnt == 'N' && oralBarrUsoAct == 'N') {
        this.dato_2079.oral_barr.oral_barr_indic = '';
        this.datoInyectMensConoce();
      } else {
        this.oralBarrIndicPor_HC8031();
      }
    },

    // Inyectable Mensual

    datoInyectMensConoce() {
      this.dato_2079.inyec_men.inyec_men_con.trim() == '' ? this.dato_2079.inyec_men.inyec_men_con = 'N' : false;
      validarInputs({
        form: '#inyec_men_con'
      }, () => {
        this.datoOralBarrConoce();
      }, () => {
        this.dato_2079.inyec_men.inyec_men_con = this.dato_2079.inyec_men.inyec_men_con.toUpperCase();
        var inyectMensCon = this.dato_2079.inyec_men.inyec_men_con;
        if (inyectMensCon == 'S' || inyectMensCon == 'N') {
          if (inyectMensCon == 'N') {
            // continue
            this.dato_2079.inyec_men.inyec_men_usant = 'N';
            this.dato_2079.inyec_men.inyec_men_usact = 'N';
            this.dato_2079.inyec_men.inyec_men_indic = '';
            this.datoMensBarrConoce();
          } else {
            this.datoInyectMensUsadoAntes();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoInyectMensConoce();
        }
      })
    },

    datoInyectMensUsadoAntes() {
      this.dato_2079.inyec_men.inyec_men_usant.trim() == '' ? this.dato_2079.inyec_men.inyec_men_usant = 'N' : false;
      validarInputs({
        form: '#inyec_men_usant'
      }, () => {
        this.datoInyectMensConoce();
      }, () => {
        this.dato_2079.inyec_men.inyec_men_usant = this.dato_2079.inyec_men.inyec_men_usant.toUpperCase();
        var inyectMensUsaAnt = this.dato_2079.inyec_men.inyec_men_usant;
        if (inyectMensUsaAnt == 'S' || inyectMensUsaAnt == 'N') {
          this.datoInyectMensUsoAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoInyectMensUsadoAntes();
        }
      })
    },

    datoInyectMensUsoAct() {
      this.dato_2079.inyec_men.inyec_men_usact.trim() == '' ? this.dato_2079.inyec_men.inyec_men_usact = 'N' : false;
      validarInputs({
        form: '#inyec_men_usact'
      }, () => {
        this.datoInyectMensUsadoAntes();
      }, () => {
        this.dato_2079.inyec_men.inyec_men_usact = this.dato_2079.inyec_men.inyec_men_usact.toUpperCase();
        var inyectMensUsaAct = this.dato_2079.inyec_men.inyec_men_usact;
        if (inyectMensUsaAct == 'S' || inyectMensUsaAct == 'N') {
          this.datoInyectMensIndicPor();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoInyectMensUsoAct();
        }
      })
    },

    datoInyectMensIndicPor() {
      var inyectMensUsoAnt = this.dato_2079.inyec_men.inyec_men_usant;
      var inyectMensUsoAct = this.dato_2079.inyec_men.inyec_men_usact;
      if (inyectMensUsoAnt == 'N' && inyectMensUsoAct == 'N') {
        this.dato_2079.inyec_men.inyec_men_indic = '';
        this.datoMensBarrConoce();
      } else {
        this.inyectMensIndicPor_HC8031();
      }
    },

    // Inyectable + Barrera

    datoMensBarrConoce() {
      this.dato_2079.men_barr.men_barr_con.trim() == '' ? this.dato_2079.men_barr.men_barr_con = 'N' : false;
      validarInputs({
        form: '#men_barr_con'
      }, () => {
        this.datoInyectMensConoce();
      }, () => {
        this.dato_2079.men_barr.men_barr_con = this.dato_2079.men_barr.men_barr_con.toUpperCase();
        var mensBarrCon = this.dato_2079.men_barr.men_barr_con;
        if (mensBarrCon == 'S' || mensBarrCon == 'N') {
          if (mensBarrCon == 'N') {
            // continue
            this.dato_2079.men_barr.men_barr_usant = 'N';
            this.dato_2079.men_barr.men_barr_usact = 'N';
            this.dato_2079.men_barr.men_barr_indic = '';
            this.datoInyectTrimConoce();
          } else {
            this.datoMensBarrUsadoAntes();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoMensBarrConoce();
        }
      })
    },

    datoMensBarrUsadoAntes() {
      this.dato_2079.men_barr.men_barr_usant.trim() == '' ? this.dato_2079.men_barr.men_barr_usant = 'N' : false;
      validarInputs({
        form: '#men_barr_usant'
      }, () => {
        this.datoMensBarrConoce();
      }, () => {
        this.dato_2079.men_barr.men_barr_usant = this.dato_2079.men_barr.men_barr_usant.toUpperCase();
        var mensBarrUsaAnt = this.dato_2079.men_barr.men_barr_usant;
        if (mensBarrUsaAnt == 'S' || mensBarrUsaAnt == 'N') {
          this.datoMensBarrUsoAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoMensBarrUsadoAntes();
        }
      })
    },

    datoMensBarrUsoAct() {
      this.dato_2079.men_barr.men_barr_usact.trim() == '' ? this.dato_2079.men_barr.men_barr_usact = 'N' : false;
      validarInputs({
        form: '#men_barr_usact'
      }, () => {
        this.datoMensBarrUsadoAntes();
      }, () => {
        this.dato_2079.men_barr.men_barr_usact = this.dato_2079.men_barr.men_barr_usact.toUpperCase();
        var mensBarrUsaAct = this.dato_2079.men_barr.men_barr_usact;
        if (mensBarrUsaAct == 'S' || mensBarrUsaAct == 'N') {
          this.datoMensBarrIndicPor();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoMensBarrUsoAct();
        }
      })
    },

    datoMensBarrIndicPor() {
      var mensBarrUsoAnt = this.dato_2079.men_barr.men_barr_usant;
      var mensBarrUsoAct = this.dato_2079.men_barr.men_barr_usact;
      if (mensBarrUsoAnt == 'N' && mensBarrUsoAct == 'N') {
        this.dato_2079.men_barr.men_barr_indic = '';
        this.datoInyectTrimConoce();
      } else {
        this.mensBarrIndicPor_HC8031();
      }
    },

    //  Inyectable Trimestral

    datoInyectTrimConoce() {
      this.dato_2079.inyec_tri.inyec_tri_con.trim() == '' ? this.dato_2079.inyec_tri.inyec_tri_con = 'N' : false;
      validarInputs({
        form: '#inyec_tri_con'
      }, () => {
        this.datoMensBarrConoce();
      }, () => {
        this.dato_2079.inyec_tri.inyec_tri_con = this.dato_2079.inyec_tri.inyec_tri_con.toUpperCase();
        var inyectTriCon = this.dato_2079.inyec_tri.inyec_tri_con;
        if (inyectTriCon == 'S' || inyectTriCon == 'N') {
          if (inyectTriCon == 'N') {
            // continue
            this.dato_2079.inyec_tri.inyec_tri_usant = 'N';
            this.dato_2079.inyec_tri.inyec_tri_usact = 'N';
            this.dato_2079.inyec_tri.inyec_tri_indic = '';
            this.datoTrimBarrConoce();
          } else {
            this.datoInyectTrimUsadoAntes();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoInyectTrimConoce();
        }
      })
    },

    datoInyectTrimUsadoAntes() {
      this.dato_2079.inyec_tri.inyec_tri_usant.trim() == '' ? this.dato_2079.inyec_tri.inyec_tri_usant = 'N' : false;
      validarInputs({
        form: '#inyec_tri_usant'
      }, () => {
        this.datoInyectTrimConoce();
      }, () => {
        this.dato_2079.inyec_tri.inyec_tri_usant = this.dato_2079.inyec_tri.inyec_tri_usant.toUpperCase();
        var inyectTriUsaAnt = this.dato_2079.inyec_tri.inyec_tri_usant;
        if (inyectTriUsaAnt == 'S' || inyectTriUsaAnt == 'N') {
          this.datoInyectTrimUsoAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoInyectTrimUsadoAntes();
        }
      })
    },

    datoInyectTrimUsoAct() {
      this.dato_2079.inyec_tri.inyec_tri_usact.trim() == '' ? this.dato_2079.inyec_tri.inyec_tri_usact = 'N' : false;
      validarInputs({
        form: '#inyec_tri_usact'
      }, () => {
        this.datoInyectTrimUsadoAntes();
      }, () => {
        this.dato_2079.inyec_tri.inyec_tri_usact = this.dato_2079.inyec_tri.inyec_tri_usact.toUpperCase();
        var inyectTrimUsaAct = this.dato_2079.inyec_tri.inyec_tri_usact;
        if (inyectTrimUsaAct == 'S' || inyectTrimUsaAct == 'N') {
          this.datoInyectTrimIndicPor();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoInyectTrimUsoAct();
        }
      })
    },

    datoInyectTrimIndicPor() {
      var inyectTrimUsoAnt = this.dato_2079.inyec_tri.inyec_tri_usant;
      var inyectTrimUsoAct = this.dato_2079.inyec_tri.inyec_tri_usact;
      if (inyectTrimUsoAnt == 'N' && inyectTrimUsoAct == 'N') {
        this.dato_2079.inyec_tri.inyec_tri_indic = '';
        this.datoTrimBarrConoce();
      } else {
        this.inyectTrimIndicPor_HC8031();
      }
    },

    // Trimestral + Barrera

    datoTrimBarrConoce() {
      this.dato_2079.tri_barr.tri_barr_con.trim() == '' ? this.dato_2079.tri_barr.tri_barr_con = 'N' : false;
      validarInputs({
        form: '#tri_barr_con'
      }, () => {
        this.datoInyectTrimConoce();
      }, () => {
        this.dato_2079.tri_barr.tri_barr_con = this.dato_2079.tri_barr.tri_barr_con.toUpperCase();
        var triBarrCon = this.dato_2079.tri_barr.tri_barr_con;
        if (triBarrCon == 'S' || triBarrCon == 'N') {
          if (triBarrCon == 'N') {
            // continue
            this.dato_2079.tri_barr.tri_barr_usant = 'N';
            this.dato_2079.tri_barr.tri_barr_usact = 'N';
            this.dato_2079.tri_barr.tri_barr_indic = '';
            this.datoEmergConoce();
          } else {
            this.datoTrimBarrUsadoAntes();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoTrimBarrConoce();
        }
      })
    },

    datoTrimBarrUsadoAntes() {
      this.dato_2079.tri_barr.tri_barr_usant.trim() == '' ? this.dato_2079.tri_barr.tri_barr_usant = 'N' : false;
      validarInputs({
        form: '#tri_barr_usant'
      }, () => {
        this.datoTrimBarrConoce();
      }, () => {
        this.dato_2079.tri_barr.tri_barr_usant = this.dato_2079.tri_barr.tri_barr_usant.toUpperCase();
        var triBarrUsaAnt = this.dato_2079.tri_barr.tri_barr_usant;
        if (triBarrUsaAnt == 'S' || triBarrUsaAnt == 'N') {
          this.datoTrimBarrUsoAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoTrimBarrUsadoAntes();
        }
      })
    },

    datoTrimBarrUsoAct() {
      this.dato_2079.tri_barr.tri_barr_usact.trim() == '' ? this.dato_2079.tri_barr.tri_barr_usact = 'N' : false;
      validarInputs({
        form: '#tri_barr_usact'
      }, () => {
        this.datoTrimBarrUsadoAntes();
      }, () => {
        this.dato_2079.tri_barr.tri_barr_usact = this.dato_2079.tri_barr.tri_barr_usact.toUpperCase();
        var trimBarrUsaAct = this.dato_2079.tri_barr.tri_barr_usact;
        if (trimBarrUsaAct == 'S' || trimBarrUsaAct == 'N') {
          this.datoTrimBarrIndicPor();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoTrimBarrUsoAct();
        }
      })
    },

    datoTrimBarrIndicPor() {
      var trimBarrUsoAnt = this.dato_2079.tri_barr.tri_barr_usant;
      var trimBarrUsoAct = this.dato_2079.tri_barr.tri_barr_usact;
      if (trimBarrUsoAnt == 'N' && trimBarrUsoAct == 'N') {
        this.dato_2079.tri_barr.tri_barr_indic = '';
        this.datoEmergConoce();
      } else {
        this.trimBarrIndicPor_HC8031();
      }
    },

    // Emergencia

    datoEmergConoce() {
      this.dato_2079.emerg.emerg_con.trim() == '' ? this.dato_2079.emerg.emerg_con = 'N' : false;
      validarInputs({
        form: '#emerg_con'
      }, () => {
        this.datoTrimBarrConoce();
      }, () => {
        this.dato_2079.emerg.emerg_con = this.dato_2079.emerg.emerg_con.toUpperCase();
        var emergCon = this.dato_2079.emerg.emerg_con;
        if (emergCon == 'S' || emergCon == 'N') {
          if (emergCon == 'N') {
            // continue
            this.dato_2079.emerg.emerg_usant = 'N';
            this.dato_2079.emerg.emerg_usact = 'N';
            this.dato_2079.emerg.emerg_indic = '';
            this.datoEmerBarrConoce();
          } else {
            this.datoEmerUsadoAntes();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoEmergConoce();
        }
      })
    },

    datoEmerUsadoAntes() {
      this.dato_2079.emerg.emerg_usant.trim() == '' ? this.dato_2079.emerg.emerg_usant = 'N' : false;
      validarInputs({
        form: '#emerg_usant'
      }, () => {
        this.datoEmergConoce();
      }, () => {
        this.dato_2079.emerg.emerg_usant = this.dato_2079.emerg.emerg_usant.toUpperCase();
        var emerUsaAnt = this.dato_2079.emerg.emerg_usant;
        if (emerUsaAnt == 'S' || emerUsaAnt == 'N') {
          this.datoEmergUsoAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoEmerUsadoAntes();
        }
      })
    },

    datoEmergUsoAct() {
      this.dato_2079.emerg.emerg_usact.trim() == '' ? this.dato_2079.emerg.emerg_usact = 'N' : false;
      validarInputs({
        form: '#emerg_usact'
      }, () => {
        this.datoEmerUsadoAntes();
      }, () => {
        this.dato_2079.emerg.emerg_usact = this.dato_2079.emerg.emerg_usact.toUpperCase();
        var emergUsaAct = this.dato_2079.emerg.emerg_usact;
        if (emergUsaAct == 'S' || emergUsaAct == 'N') {
          this.datoEmerIndicPor();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoEmergUsoAct();
        }
      })
    },

    datoEmerIndicPor() {
      var emergUsoAnt = this.dato_2079.emerg.emerg_usant;
      var emergUsoAct = this.dato_2079.emerg.emerg_usact;
      if (emergUsoAnt == 'N' && emergUsoAct == 'N') {
        this.dato_2079.emerg.emerg_indic = '';
        this.datoEmerBarrConoce();
      } else {
        this.emergIndicPor_HC8031();
      }
    },

    // EMERGENCIA + BARRERA

    datoEmerBarrConoce() {
      this.dato_2079.emerg_barr.emerg_barr_con.trim() == '' ? this.dato_2079.emerg_barr.emerg_barr_con = 'N' : false;
      validarInputs({
        form: '#emerg_barr_con'
      }, () => {
        this.datoEmergConoce();
      }, () => {
        this.dato_2079.emerg_barr.emerg_barr_con = this.dato_2079.emerg_barr.emerg_barr_con.toUpperCase();
        var emergBarrCon = this.dato_2079.emerg_barr.emerg_barr_con;
        if (emergBarrCon == 'S' || emergBarrCon == 'N') {
          if (emergBarrCon == 'N') {
            // continue
            this.dato_2079.emerg_barr.emerg_barr_usant = 'N';
            this.dato_2079.emerg_barr.emerg_barr_usact = 'N';
            this.dato_2079.emerg_barr.emerg_barr_indic = '';
            this.datoEsterConoce();
          } else {
            this.datoEmerBarrUsadoAntes();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoEmerBarrConoce();
        }
      })
    },

    datoEmerBarrUsadoAntes() {
      this.dato_2079.emerg_barr.emerg_barr_usant.trim() == '' ? this.dato_2079.emerg_barr.emerg_barr_usant = 'N' : false;
      validarInputs({
        form: '#emerg_barr_usant'
      }, () => {
        this.datoEmerBarrConoce();
      }, () => {
        this.dato_2079.emerg_barr.emerg_barr_usant = this.dato_2079.emerg_barr.emerg_barr_usant.toUpperCase();
        var emerBarrUsaAnt = this.dato_2079.emerg_barr.emerg_barr_usant;
        if (emerBarrUsaAnt == 'S' || emerBarrUsaAnt == 'N') {
          this.datoEmerBarrUsoAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoEmerBarrUsadoAntes();
        }
      })
    },

    datoEmerBarrUsoAct() {
      this.dato_2079.emerg_barr.emerg_barr_usact.trim() == '' ? this.dato_2079.emerg_barr.emerg_barr_usact = 'N' : false;
      validarInputs({
        form: '#emerg_barr_usact'
      }, () => {
        this.datoEmerBarrUsadoAntes();
      }, () => {
        this.dato_2079.emerg_barr.emerg_barr_usact = this.dato_2079.emerg_barr.emerg_barr_usact.toUpperCase();
        var emergBarrUsaAct = this.dato_2079.emerg_barr.emerg_barr_usact;
        if (emergBarrUsaAct == 'S' || emergBarrUsaAct == 'N') {
          this.datoEmeBarrIndicPor();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoEmerBarrUsoAct();
        }
      })
    },

    datoEmeBarrIndicPor() {
      var emerBarrUsoAnt = this.dato_2079.emerg_barr.emerg_barr_usant;
      var emergBarrUsoAct = this.dato_2079.emerg_barr.emerg_barr_usact;
      if (emerBarrUsoAnt == 'N' && emergBarrUsoAct == 'N') {
        this.dato_2079.emerg_barr.emerg_barr_indic = '';
        this.datoEsterConoce();
      } else {
        this.emerBarrIndicPor_HC8031();
      }
    },

    // ESTERILIZACION

    datoEsterConoce() {
      this.dato_2079.ester.ester_con.trim() == '' ? this.dato_2079.ester.ester_con = 'N' : false;
      validarInputs({
        form: '#ester_con'
      }, () => {
        this.datoEmerBarrConoce();
      }, () => {
        this.dato_2079.ester.ester_con = this.dato_2079.ester.ester_con.toUpperCase();
        var esterCon = this.dato_2079.ester.ester_con;
        if (esterCon == 'S' || esterCon == 'N') {
          if (esterCon == 'N') {
            // continue
            this.dato_2079.ester.ester_usant = 'N';
            this.dato_2079.ester.ester_usact = 'N';
            this.dato_2079.ester.ester_indic = '';
            this.datoEsteBarrConoce();
          } else {
            this.datoEsterUsadoAntes();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoEsterConoce();
        }
      })
    },

    datoEsterUsadoAntes() {
      this.dato_2079.ester.ester_usant.trim() == '' ? this.dato_2079.ester.ester_usant = 'N' : false;
      validarInputs({
        form: '#ester_usant'
      }, () => {
        this.datoEsterConoce();
      }, () => {
        this.dato_2079.ester.ester_usant = this.dato_2079.ester.ester_usant.toUpperCase();
        var esterUsaAnt = this.dato_2079.ester.ester_usant;
        if (esterUsaAnt == 'S' || esterUsaAnt == 'N') {
          this.datoEsterUsoAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoEsterUsadoAntes();
        }
      })
    },

    datoEsterUsoAct() {
      this.dato_2079.ester.ester_usact.trim() == '' ? this.dato_2079.ester.ester_usact = 'N' : false;
      validarInputs({
        form: '#ester_usact'
      }, () => {
        this.datoEsterUsadoAntes();
      }, () => {
        this.dato_2079.ester.ester_usact = this.dato_2079.ester.ester_usact.toUpperCase();
        var esterUsaAct = this.dato_2079.ester.ester_usact;
        if (esterUsaAct == 'S' || esterUsaAct == 'N') {
          this.datoEsterIndicPor();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoEsterUsoAct();
        }
      })
    },

    datoEsterIndicPor() {
      var esteUsoAnt = this.dato_2079.ester.ester_usant;
      var esteUsoAct = this.dato_2079.ester.ester_usact;
      if (esteUsoAnt == 'N' && esteUsoAct == 'N') {
        this.dato_2079.ester.ester_indic = '';
        this.datoEsteBarrConoce();
      } else {
        this.esterIndicPor_HC8031();
      }
    },

    // ESTERILIZACION + BARRERA

    datoEsteBarrConoce() {
      this.dato_2079.ester_barr.ester_barr_con.trim() == '' ? this.dato_2079.ester_barr.ester_barr_con = 'N' : false;
      validarInputs({
        form: '#ester_barr_con'
      }, () => {
        this.datoEsterConoce();
      }, () => {
        this.dato_2079.ester_barr.ester_barr_con = this.dato_2079.ester_barr.ester_barr_con.toUpperCase();
        var esterBarrCon = this.dato_2079.ester_barr.ester_barr_con;
        if (esterBarrCon == 'S' || esterBarrCon == 'N') {
          if (esterBarrCon == 'N') {
            // continue
            this.dato_2079.ester_barr.ester_barr_usant = 'N';
            this.dato_2079.ester_barr.ester_barr_usact = 'N';
            this.dato_2079.ester_barr.ester_barr_indic = '';
            this.datoCoitInteConoce();
          } else {
            this.datoEsteBarrUsadoAntes();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoEsteBarrConoce();
        }
      })
    },

    datoEsteBarrUsadoAntes() {
      this.dato_2079.ester_barr.ester_barr_usant.trim() == '' ? this.dato_2079.ester_barr.ester_barr_usant = 'N' : false;
      validarInputs({
        form: '#ester_barr_usant'
      }, () => {
        this.datoEsteBarrConoce();
      }, () => {
        this.dato_2079.ester_barr.ester_barr_usant = this.dato_2079.ester_barr.ester_barr_usant.toUpperCase();
        var esteBarrUsaAnt = this.dato_2079.ester_barr.ester_barr_usant;
        if (esteBarrUsaAnt == 'S' || esteBarrUsaAnt == 'N') {
          this.datoEsteBarrUsoAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoEsteBarrUsadoAntes();
        }
      })
    },

    datoEsteBarrUsoAct() {
      this.dato_2079.ester_barr.ester_barr_usact.trim() == '' ? this.dato_2079.ester_barr.ester_barr_usact = 'N' : false;
      validarInputs({
        form: '#ester_barr_usact'
      }, () => {
        this.datoEsteBarrUsadoAntes();
      }, () => {
        this.dato_2079.ester_barr.ester_barr_usact = this.dato_2079.ester_barr.ester_barr_usact.toUpperCase();
        var esteBarrUsaAct = this.dato_2079.ester_barr.ester_barr_usact;
        if (esteBarrUsaAct == 'S' || esteBarrUsaAct == 'N') {
          this.datoEsteBarrIndicPor();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoEsteBarrUsoAct();
        }
      })
    },

    datoEsteBarrIndicPor() {
      var esteBarrUsoAnt = this.dato_2079.ester_barr.ester_barr_usant;
      var esteBarrUsoAct = this.dato_2079.ester_barr.ester_barr_usact;
      if (esteBarrUsoAnt == 'N' && esteBarrUsoAct == 'N') {
        this.dato_2079.ester_barr.ester_barr_indic = '';
        this.datoCoitInteConoce();
      } else {
        this.esteBarrIndicPor_HC8031();
      }
    },

    // COITUS INTERRUPTUS

    datoCoitInteConoce() {
      this.dato_2079.coi_int.coi_int_con.trim() == '' ? this.dato_2079.coi_int.coi_int_con = 'N' : false;
      validarInputs({
        form: '#coi_int_con'
      }, () => {
        this.datoEsteBarrConoce();
      }, () => {
        this.dato_2079.coi_int.coi_int_con = this.dato_2079.coi_int.coi_int_con.toUpperCase();
        var coitIntCon = this.dato_2079.coi_int.coi_int_con;
        if (coitIntCon == 'S' || coitIntCon == 'N') {
          if (coitIntCon == 'N') {
            // continue
            this.dato_2079.coi_int.coi_int_usant = 'N';
            this.dato_2079.coi_int.coi_int_usact = 'N';
            this.dato_2079.coi_int.coi_int_indic = '';
            this.datoMetRitmConoce();
          } else {
            this.datoCoitIntUsadoAntes();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoCoitInteConoce();
        }
      })
    },

    datoCoitIntUsadoAntes() {
      this.dato_2079.coi_int.coi_int_usant.trim() == '' ? this.dato_2079.coi_int.coi_int_usant = 'N' : false;
      validarInputs({
        form: '#coi_int_usant'
      }, () => {
        this.datoCoitInteConoce();
      }, () => {
        this.dato_2079.coi_int.coi_int_usant = this.dato_2079.coi_int.coi_int_usant.toUpperCase();
        var coitIntUsaAnt = this.dato_2079.coi_int.coi_int_usant;
        if (coitIntUsaAnt == 'S' || coitIntUsaAnt == 'N') {
          this.datoCoitIntUsoAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoCoitIntUsadoAntes();
        }
      })
    },

    datoCoitIntUsoAct() {
      this.dato_2079.coi_int.coi_int_usact.trim() == '' ? this.dato_2079.coi_int.coi_int_usact = 'N' : false;
      validarInputs({
        form: '#coi_int_usact'
      }, () => {
        this.datoCoitIntUsadoAntes();
      }, () => {
        this.dato_2079.coi_int.coi_int_usact = this.dato_2079.coi_int.coi_int_usact.toUpperCase();
        var coitIntUsaAct = this.dato_2079.coi_int.coi_int_usact;
        if (coitIntUsaAct == 'S' || coitIntUsaAct == 'N') {
          this.datoCoitIntIndicPor();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoCoitIntUsoAct();
        }
      })
    },

    datoCoitIntIndicPor() {
      var coitIntUsoAnt = this.dato_2079.coi_int.coi_int_usant;
      var coitIntUsoAct = this.dato_2079.coi_int.coi_int_usact;
      if (coitIntUsoAnt == 'N' && coitIntUsoAct == 'N') {
        this.dato_2079.coi_int.coi_int_indic = '';
        this.datoMetRitmConoce();
      } else {
        this.coitIntIndicPor_HC8031();
      }
    },

    // METODO DEL RITMO

    datoMetRitmConoce() {
      this.dato_2079.met_rit.met_rit_con.trim() == '' ? this.dato_2079.met_rit.met_rit_con = 'N' : false;
      validarInputs({
        form: '#met_rit_con'
      }, () => {
        this.datoCoitInteConoce();
      }, () => {
        this.dato_2079.met_rit.met_rit_con = this.dato_2079.met_rit.met_rit_con.toUpperCase();
        var metRitCon = this.dato_2079.met_rit.met_rit_con;
        if (metRitCon == 'S' || metRitCon == 'N') {
          if (metRitCon == 'N') {
            // continue
            this.dato_2079.met_rit.met_rit_usant = 'N';
            this.dato_2079.met_rit.met_rit_usact = 'N';
            this.dato_2079.met_rit.met_rit_indic = '';
            this.datoNoUsoAntic();
          } else {
            this.datoMetRitmUsadoAntes();
          }
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoMetRitmConoce();
        }
      })
    },

    datoMetRitmUsadoAntes() {
      this.dato_2079.met_rit.met_rit_usant.trim() == '' ? this.dato_2079.met_rit.met_rit_usant = 'N' : false;
      validarInputs({
        form: '#met_rit_usant'
      }, () => {
        this.datoMetRitmConoce();
      }, () => {
        this.dato_2079.met_rit.met_rit_usant = this.dato_2079.met_rit.met_rit_usant.toUpperCase();
        var metRitUsaAnt = this.dato_2079.met_rit.met_rit_usant;
        if (metRitUsaAnt == 'S' || metRitUsaAnt == 'N') {
          this.datoMetRitmUsoAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoMetRitmUsadoAntes();
        }
      })
    },

    datoMetRitmUsoAct() {
      this.dato_2079.met_rit.met_rit_usact.trim() == '' ? this.dato_2079.met_rit.met_rit_usact = 'N' : false;
      validarInputs({
        form: '#met_rit_usact'
      }, () => {
        this.datoMetRitmUsadoAntes();
      }, () => {
        this.dato_2079.met_rit.met_rit_usact = this.dato_2079.met_rit.met_rit_usact.toUpperCase();
        var metRitUsaAct = this.dato_2079.met_rit.met_rit_usact;
        if (metRitUsaAct == 'S' || metRitUsaAct == 'N') {
          this.datoMetRitmIndicPor();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoMetRitmUsoAct();
        }
      })
    },

    datoMetRitmIndicPor() {
      var metRitmUsoAnt = this.dato_2079.met_rit.met_rit_usant;
      var metRitmUsoAct = this.dato_2079.met_rit.met_rit_usact;
      if (metRitmUsoAnt == 'N' && metRitmUsoAct == 'N') {
        this.dato_2079.met_rit.met_rit_indic = '';
        this.datoNoUsoAntic();
      } else {
        this.metRitmIndicPor_HC8031();
      }
    },

    // no usa anticonceptivo

    datoNoUsoAntic() {
      if (this.dato_2079.diu.diu_usact == 'N' &&
        this.dato_2079.oral.oral_usact == 'N' &&
        this.dato_2079.barr.barr_usact == 'N' &&
        this.dato_2079.diu_barr.diu_barr_usact == 'N' &&
        this.dato_2079.impl_sd.impl_sd_usact == 'N' &&
        this.dato_2079.sd_barr.sd_barr_usact == 'N' &&
        this.dato_2079.oral_barr.oral_barr_usact == 'N' &&
        this.dato_2079.inyec_men.inyec_men_usact == 'N' &&
        this.dato_2079.men_barr.men_barr_usact == 'N' &&
        this.dato_2079.inyec_tri.inyec_tri_usact == 'N' &&
        this.dato_2079.tri_barr.tri_barr_usact == 'N' &&
        this.dato_2079.emerg.emerg_usact == 'N' &&
        this.dato_2079.emerg_barr.emerg_barr_usact == 'N' &&
        this.dato_2079.ester.ester_usact == 'N' &&
        this.dato_2079.ester_barr.ester_barr_usact == 'N' &&
        this.dato_2079.coi_int.coi_int_usact == 'N' &&
        this.dato_2079.met_rit.met_rit_usact == 'N') {
        this.noUsoAntic_HC8031();
      } else {
        // continua
        this.dato_2079.no_uso_antic = '';
        this.grabarPag3();
      }
    },

    async grabarPag3() {
      await this.grabar();
      await this.pantalla_04();
    },

    pantalla_04() {
      this.datoReciApoySocial();
    },

    datoReciApoySocial() {
      this.dato_8031.dato_soc_cul.reci_apoy_social.trim() == '' ? this.dato_8031.dato_soc_cul.reci_apoy_social = 'N' : false;
      validarInputs({
        form: '#reci_apoy_social'
      }, () => {

        if ($_REG_PACI.SEXO == 'M') {
          this.datoCovid19();
        } else {
          this.datoMetRitmConoce();
        }
      }, () => {
        this.dato_8031.dato_soc_cul.reci_apoy_social = this.dato_8031.dato_soc_cul.reci_apoy_social.toUpperCase();
        var apoy = this.dato_8031.dato_soc_cul.reci_apoy_social;
        if (apoy == 'S') {
          this.datoCualApoySocial();
        } else if (apoy == 'N') {
          this.datoViviendaPropia();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoReciApoySocial();
        }
      })
    },

    datoCualApoySocial() {
      validarInputs({
        form: '#cual_apoy_social'
      }, () => {
        this.datoReciApoySocial();
      }, () => {
        this.dato_8031.dato_soc_cul.cual_apoy_social = this.dato_8031.dato_soc_cul.cual_apoy_social.toUpperCase();
        // continue
        this.datoViviendaPropia();
      })
    },

    datoViviendaPropia() {
      this.dato_8031.dato_soc_cul.vivienda_propia.trim() == '' ? this.dato_8031.dato_soc_cul.vivienda_propia = 'N' : false;
      validarInputs({
        form: '#vivienda_propia'
      }, () => {
        this.datoReciApoySocial();
      }, () => {
        this.dato_8031.dato_soc_cul.vivienda_propia = this.dato_8031.dato_soc_cul.vivienda_propia.toUpperCase();
        var vivProp = this.dato_8031.dato_soc_cul.vivienda_propia;
        if (vivProp == 'S' || vivProp == 'N') {
          this.datoViviendaHacina();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoViviendaPropia();
        }
      })
    },

    datoViviendaHacina() {
      this.dato_8031.dato_soc_cul.vivienda_hacina.trim() == '' ? this.dato_8031.dato_soc_cul.vivienda_hacina = 'N' : false;
      validarInputs({
        form: '#vivienda_hacina'
      }, () => {
        this.datoViviendaPropia();
      }, () => {
        this.dato_8031.dato_soc_cul.vivienda_hacina = this.dato_8031.dato_soc_cul.vivienda_hacina.toUpperCase();
        var vivHac = this.dato_8031.dato_soc_cul.vivienda_hacina;
        if (vivHac == 'S' || vivHac == 'N') {
          this.datoCasa();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoViviendaHacina();
        }
      })
    },

    datoCasa() {
      this.dato_8031.dato_soc_cul.casa.trim() == '' ? this.dato_8031.dato_soc_cul.casa = 'N' : false;
      validarInputs({
        form: '#casa'
      }, () => {
        this.datoViviendaHacina();
      }, () => {
        this.dato_8031.dato_soc_cul.casa = this.dato_8031.dato_soc_cul.casa.toUpperCase();
        var casa = this.dato_8031.dato_soc_cul.casa;
        if (casa == 'S' || casa == 'N') {
          this.datoApto();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoCasa();
        }
      })
    },

    datoApto() {
      this.dato_8031.dato_soc_cul.apto.trim() == '' ? this.dato_8031.dato_soc_cul.apto = 'N' : false;
      validarInputs({
        form: '#apto'
      }, () => {
        this.datoCasa();
      }, () => {
        this.dato_8031.dato_soc_cul.apto = this.dato_8031.dato_soc_cul.apto.toUpperCase();
        var apto = this.dato_8031.dato_soc_cul.apto;
        if (apto == 'S' || apto == 'N') {
          this.datoInvac();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoApto();
        }
      })
    },

    datoInvac() {
      this.dato_8031.dato_soc_cul.invasion.trim() == '' ? this.dato_8031.dato_soc_cul.invasion = 'N' : false;
      validarInputs({
        form: '#invasion'
      }, () => {
        this.datoApto();
      }, () => {
        this.dato_8031.dato_soc_cul.invasion = this.dato_8031.dato_soc_cul.invasion.toUpperCase();
        var invasion = this.dato_8031.dato_soc_cul.invasion;
        if (invasion == 'S' || invasion == 'N') {
          this.datoLote();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoInvac();
        }
      })
    },

    datoLote() {
      this.dato_8031.dato_soc_cul.lote.trim() == '' ? this.dato_8031.dato_soc_cul.lote = 'N' : false;
      validarInputs({
        form: '#lote'
      }, () => {
        this.datoInvac();
      }, () => {
        this.dato_8031.dato_soc_cul.lote = this.dato_8031.dato_soc_cul.lote.toUpperCase();
        var lote = this.dato_8031.dato_soc_cul.lote;
        if (lote == 'S' || lote == 'N') {
          this.datoEstAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoLote();
        }
      })
    },

    datoEstAct() {
      this.dato_8031.dato_soc_cul.estudia_act.trim() == '' ? this.dato_8031.dato_soc_cul.estudia_act = 'N' : false;
      validarInputs({
        form: '#estudia_act'
      }, () => {
        this.datoViviendaPropia();
      }, () => {
        this.dato_8031.dato_soc_cul.estudia_act = this.dato_8031.dato_soc_cul.estudia_act.toUpperCase();
        var estudia_act = this.dato_8031.dato_soc_cul.estudia_act;
        if (estudia_act == 'S' || estudia_act == 'N') {
          this.datoTrabAct();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoEstAct();
        }
      })
    },

    datoTrabAct() {
      this.dato_8031.dato_soc_cul.trabaja_act.trim() == '' ? this.dato_8031.dato_soc_cul.trabaja_act = 'N' : false;
      validarInputs({
        form: '#trabaja_act'
      }, () => {
        this.datoEstAct();
      }, () => {
        this.dato_8031.dato_soc_cul.trabaja_act = this.dato_8031.dato_soc_cul.trabaja_act.toUpperCase();
        var trabaja_act = this.dato_8031.dato_soc_cul.trabaja_act;
        if (trabaja_act == 'S' || trabaja_act == 'N') {
          this.datoActFisica();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoTrabAct();
        }
      })
    },

    datoActFisica() {
      validarInputs({
        form: '#actividad_fisica'
      }, () => {
        this.datoTrabAct();
      }, () => {
        // this.dato_8031.dato_soc_cul.actividad_fisica;
        this.dato_8031.dato_soc_cul.actividad_fisica = this.dato_8031.dato_soc_cul.actividad_fisica.toString();
        this.datoActRecrea();
      })
    },

    datoActRecrea() {
      validarInputs({
        form: '#actividad_recrea'
      }, () => {
        this.datoActFisica();
      }, () => {
        // this.dato_8031.dato_soc_cul.actividad_fisica;
        this.dato_8031.dato_soc_cul.actividad_fisica = this.dato_8031.dato_soc_cul.actividad_fisica.toString();
        this.datoAlimentAdec();
      })
    },

    datoAlimentAdec() {
      this.dato_8031.dato_soc_cul.alimentacion_adec.trim() == '' ? this.dato_8031.dato_soc_cul.alimentacion_adec = 'S' : false;
      validarInputs({
        form: '#alimentacion_adec'
      }, () => {
        this.datoEstAct();
      }, () => {
        this.dato_8031.dato_soc_cul.alimentacion_adec = this.dato_8031.dato_soc_cul.alimentacion_adec.toUpperCase();
        var alimentacion_adec = this.dato_8031.dato_soc_cul.alimentacion_adec;
        if (alimentacion_adec == 'S' || alimentacion_adec == 'N') {
          this.datoCuantPorDia();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoAlimentAdec();
        }
      })
    },

    datoCuantPorDia() {
      validarInputs({
        form: '#cuantas_x_dia'
      }, () => {
        this.datoAlimentAdec();
      }, () => {
        // this.dato_8031.dato_soc_cul.cuantas_x_dia;
        this.dato_8031.dato_soc_cul.cuantas_x_dia = this.dato_8031.dato_soc_cul.cuantas_x_dia.toString();
        this.datoCuantasConFamilia();
      })
    },

    datoCuantasConFamilia() {
      validarInputs({
        form: '#cuantas_con_famil'
      }, () => {
        this.datoCuantPorDia();
      }, () => {
        this.dato_8031.dato_soc_cul.cuantas_con_famil = this.dato_8031.dato_soc_cul.cuantas_con_famil.toString();
        var cauntFami = parseInt(this.dato_8031.dato_soc_cul.cuantas_con_famil);
        var cuanXDia = parseInt(this.dato_8031.dato_soc_cul.cuantas_x_dia);
        if (cauntFami > cuanXDia) {
          CON851('03', '03', null, 'error', 'error')
          this.datoCuantasConFamilia();
        } else {
          this.datoSueñoNormal();
        }
      })
    },

    datoSueñoNormal() {
      this.dato_8031.dato_soc_cul.sueno_normal.trim() == '' ? this.dato_8031.dato_soc_cul.sueno_normal = 'S' : false;
      validarInputs({
        form: '#sueno_normal'
      }, () => {
        this.datoCuantasConFamilia();
      }, () => {
        this.dato_8031.dato_soc_cul.sueno_normal = this.dato_8031.dato_soc_cul.sueno_normal.toUpperCase();
        var sueno_normal = this.dato_8031.dato_soc_cul.sueno_normal;
        if (sueno_normal == 'S' || sueno_normal == 'N') {
          this.datoHorasSueño();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoSueñoNormal();
        }
      })
    },

    datoHorasSueño() {
      validarInputs({
        form: '#horas_sueno'
      }, () => {
        this.datoSueñoNormal();
      }, () => {
        // this.dato_8031.dato_soc_cul.horas_sueno;
        this.dato_8031.dato_soc_cul.horas_sueno = this.dato_8031.dato_soc_cul.horas_sueno.toString();
        this.datoCigarrillo();
      })
    },

    datoCigarrillo() {
      this.dato_8031.dato_soc_cul.cigarrillo.trim() == '' ? this.dato_8031.dato_soc_cul.cigarrillo = 'N' : false;
      validarInputs({
        form: '#cigarrillo'
      }, () => {
        this.datoAlimentAdec();
      }, () => {
        this.dato_8031.dato_soc_cul.cigarrillo = this.dato_8031.dato_soc_cul.cigarrillo.toUpperCase();
        var cigarrillo = this.dato_8031.dato_soc_cul.cigarrillo;
        if (cigarrillo == 'S') {
          this.datoCuantCigarrillos();
        } else if (cigarrillo == 'N') {
          this.dato_8031.dato_soc_cul.cuantos_cigarr = '00';
          this.datoAlcohol();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoCigarrillo();
        }
      })
    },

    datoCuantCigarrillos() {
      validarInputs({
        form: '#cuantos_cigarr'
      }, () => {
        this.datoCigarrillo();
      }, () => {
        // this.dato_8031.dato_soc_cul.cuantos_cigarr;
        this.datoFuma();
      })
    },

    datoFuma() {
      var cigarrillo = this.dato_8031.dato_soc_cul.cigarrillo;
      if ($_REG_HC.edad_hc.unid_edad == 'A' && parseInt($_REG_HC.edad_hc.vlr_edad) < 12) {
        this.grabarPag4();
      } else if (cigarrillo == 'S') {
        this.modal_fuma = true;
        this.hcprc.cierre.paciente_cronic.fuma = cigarrillo;
        setTimeout(() => { this.datoFuma2(); }, 300);
      } else {
        this.hcprc.cierre.paciente_cronic.fuma = '';
        this.datoAlcohol();
      }
    },

    datoFuma2() {
      this.hcprc.signos.dejar_fumar.trim() == '' ? this.hcprc.signos.dejar_fumar = 'N' : false;
      validarInputs({
        form: '#dejar_fumar'
      }, () => {
        this.modal_fuma = false;
        this.datoCigarrillo();
      }, () => {
        this.hcprc.signos.dejar_fumar = this.hcprc.signos.dejar_fumar.toUpperCase();
        var dejarF = this.hcprc.signos.dejar_fumar;
        if (dejarF == 'S') {
          setTimeout(() => { this.datoTelefono(); }, 300);
        } else if (dejarF == 'N') {
          setTimeout(() => { this.datoAlcohol(); }, 300);
        } else {
          CON851('03', '03', null, 'error', 'error')
          setTimeout(() => { this.datoFuma2(); }, 300);
        }
      })
    },

    datoTelefono() {
      this.form.telefono_paci == '' ? this.form.telefono_paci = $_REG_PACI['TELEFONO'] : false;
      validarInputs({
        form: '#telefono_paci'
      }, () => {
        setTimeout(() => { this.datoFuma2(); }, 300);
      }, () => {
        setTimeout(() => { this.datoDirecc(); }, 300);
      })
    },

    datoDirecc() {
      this.form.direcc_paci == '' ? this.form.direcc_paci = $_REG_PACI['DIRECC'] : false;
      validarInputs({
        form: '#direcc_paci'
      }, () => {
        this.form.direcc_paci = this.form.direcc_paci.toUpperCase();
        setTimeout(() => { this.datoTelefono(); }, 300);
      }, async () => {
        await this.actualizarPaciente();
        await this.datoAlcohol();
      })
    },

    async actualizarPaciente() {
      var data = {}

      data['datosh'] = datosEnvio();
      data['id_paci'] = $_REG_PACI['COD'];
      data['tipo_id_paci'] = $_REG_PACI['TIPO-ID'];
      data['apellido1_paci'] = $_REG_PACI['APELL-PACI1'];
      data['apellido2_paci'] = $_REG_PACI['APELL-PACI2'];
      data['nombre1_paci'] = $_REG_PACI['NOM-PACI1'];
      data['nombre2_paci'] = $_REG_PACI['NOM-PACI2'];

      if (this.form.telefono_paci == "" || this.form.telefono_paci == 0) {
        data['telefono_paci'] = $_REG_PACI["TELEFONO"];
      } else {
        data['telefono_paci'] = this.form.telefono_paci;
      }

      data['ciudad_paci'] = $_REG_PACI['CIUDAD'];

      if (this.form.direcc_paci.trim() == "") {
        data['direccion_paci'] = $_REG_PACI["DIRECC"];
      } else {
        data['direccion_paci'] = this.form.direcc_paci;
      }

      data['grp_sang_paci'] = $_REG_PACI['GRP-SANG'];
      data['rh_paci'] = $_REG_PACI['RH'];
      data['admin_w'] = $_REG_PACI['OPER-CORR'];

      if (this.form.victConflicto == "") {
        data['victi_conflicto'] = $_REG_PACI['VICTI-CONFLICTO'];
      } else {
        data['victi_conflicto'] = this.form.victConflicto;
      }

      data['diabetes'] = $_REG_PACI['DIABETES'];

      this.data = data;

      await postData(data, get_url("app/SALUD/SER110C-AC.DLL"))
        .then(data => {
          console.log(data, 'data');
          toastr.success("Actualizado correctamente");
        }).catch(err => {
          toastr.error("Error en guardado");
          console.log(err, 'error')
          _regresar_menuhis();
        })
    },

    datoAlcohol() {
      this.modal_fuma = false;
      this.dato_8031.dato_soc_cul.alcohol.trim() == '' ? this.dato_8031.dato_soc_cul.alcohol = 'N' : false;
      validarInputs({
        form: '#alcohol'
      }, () => {
        this.datoCigarrillo();
      }, () => {
        this.dato_8031.dato_soc_cul.alcohol = this.dato_8031.dato_soc_cul.alcohol.toUpperCase();
        var alcohol = this.dato_8031.dato_soc_cul.alcohol;
        if (alcohol == 'S' || alcohol == 'N') {
          this.datoAbuso();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoAlcohol();
        }
      })
    },

    datoAbuso() {
      this.dato_8031.dato_soc_cul.abuso.trim() == '' ? this.dato_8031.dato_soc_cul.abuso = 'N' : false;
      validarInputs({
        form: '#abuso'
      }, () => {
        this.datoAlcohol();
      }, () => {
        this.dato_8031.dato_soc_cul.abuso = this.dato_8031.dato_soc_cul.abuso.toUpperCase();
        var abuso = this.dato_8031.dato_soc_cul.abuso;
        if (abuso == 'S' || abuso == 'N') {
          this.datoOtrasSustan();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoAbuso();
        }
      })
    },

    datoOtrasSustan() {
      this.dato_8031.dato_soc_cul.otras_sustancias.trim() == '' ? this.dato_8031.dato_soc_cul.otras_sustancias = 'N' : false;
      validarInputs({
        form: '#otras_sustancias'
      }, () => {
        this.datoAbuso();
      }, () => {
        this.dato_8031.dato_soc_cul.otras_sustancias = this.dato_8031.dato_soc_cul.otras_sustancias.toUpperCase();
        var otras_sustancias = this.dato_8031.dato_soc_cul.otras_sustancias;
        if (otras_sustancias == 'S') {
          this.datoCualSustancia();
        } else if (otras_sustancias == 'N') {
          this.grabarPag4();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoOtrasSustan();
        }
      })
    },

    datoCualSustancia() {
      validarInputs({
        form: '#cual_sustancias'
      }, () => {
        this.datoOtrasSustan();
      }, () => {
        this.dato_8031.dato_soc_cul.cual_sustancias = this.dato_8031.dato_soc_cul.cual_sustancias.toUpperCase();
        this.grabarPag4();
      })
    },

    async grabarPag4() {
      await this.grabar();
      await this.pantalla_05();
    },

    pantalla_05() {
      this.signosVitalesPeso();
    },

    signosVitalesPeso() {
      validarInputs({
        form: '#signos_peso'
      }, () => {
        this.datoOtrasSustan();
      }, () => {
        this.hcprc.signos.peso = this.formatNumero(this.hcprc.signos.peso);
        var peso = parseFloat(this.hcprc.signos.peso);

        if (($_REG_HC.edad_hc.unid_edad == 'D' || $_REG_HC.edad_hc.unid_edad == 'M') && parseInt($_REG_HC.edad_hc.vlr_edad) < 3) {
          this.hcprc.signos.und_peso = '2';
        } else {
          this.hcprc.signos.und_peso = '1';
        }

        if (this.hcprc.signos.und_peso == '2') {
          this.form.descripUndPeso = 'Gr';
        } else {
          this.form.descripUndPeso = 'Kg';
        }

        switch (this.hcprc.signos.und_peso) {
          case '1':
            if (peso < 2 || peso > 300) {
              CON851('03', '03', null, 'error', 'error')
              this.signosVitalesPeso();
            } else if ($_REG_PROF.ATIENDE_PROF == '1' || $_REG_PROF.ATIENDE_PROF == '5' || $_REG_PROF.ATIENDE_PROF == '7' || $_REG_PROF.ATIENDE_PROF == 'A' ||
              $_REG_PROF.ATIENDE_PROF == 'H' || $_REG_PROF.ATIENDE_PROF == 'I' || $_REG_PROF.ATIENDE_PROF == 'O') {
              // continue
              this.signosVitalesTalla();
            } else if ((peso == '' || peso == 0) && parseInt($this.hcprc.serv) > 1) {
              CON851('02', '02', null, 'error', 'error')
              this.signosVitalesPeso();
            } else {
              // continue
              this.signosVitalesTalla();
            }
            break;
          case '2':
            if (peso < 500 || peso > 20000) {
              CON851('03', '03', null, 'error', 'error')
              this.signosVitalesPeso();
            } else if ($_REG_PROF.ATIENDE_PROF == '1' || $_REG_PROF.ATIENDE_PROF == '5' || $_REG_PROF.ATIENDE_PROF == '7' || $_REG_PROF.ATIENDE_PROF == 'A' ||
              $_REG_PROF.ATIENDE_PROF == 'H' || $_REG_PROF.ATIENDE_PROF == 'I' || $_REG_PROF.ATIENDE_PROF == 'O') {
              // continue
              this.signosVitalesTalla();
            } else if ((peso == '' || peso == 0) && parseInt(this.hcprc.serv) > 1) {
              CON851('02', '02', null, 'error', 'error')
              this.signosVitalesPeso();
            } else {
              // continue
              this.signosVitalesTalla();
            }
            break;
        }
      })
    },

    signosVitalesTalla() {
      validarInputs({
        form: '#signos_talla'
      }, () => {
        this.signosVitalesPeso();
      }, () => {
        this.hcprc.signos.talla = this.formatNumero(this.hcprc.signos.talla);
        var talla = parseInt(this.hcprc.signos.talla);

        if (talla > 230) {
          CON851('03', '03', null, 'error', 'error')
          this.signosVitalesTalla();
        } else if ((talla == 0 || talla == '') && this.hcprc.signos.peso > 0) {
          CON851('02', '02', null, 'error', 'error')
          this.signosVitalesTalla();
        } else {
          this.SignosVitalesCalcularIndices();
        }
      })
    },

    SignosVitalesCalcularIndices() {
      var talla = parseFloat(this.hcprc.signos.talla);
      var peso = parseFloat(this.hcprc.signos.peso);
      var obstEdadGestReg_4040 = parseInt(this.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w);
      if ((peso == 0 || peso == '') || (talla == 0 || talla == '')) {
        this.hcprc.signos.imc_corp = 0;
      } else {
        this.hcprc.signos.imc_corp = peso / ((talla / 100) ** 2).toFixed(2).toString().padStart(2);
        this.hcprc.signos.imc_corp = this.formatNumero(this.hcprc.signos.imc_corp);
      }


      if ((peso == 0 || peso == '') || (talla == 0 || talla == '')) {
        this.hcprc.signos.sup_corp = 0;
      } else {
        this.hcprc.signos.sup_corp = (peso + talla - 60) / 100;
        this.hcprc.signos.sup_corp = this.formatNumero(this.hcprc.signos.sup_corp);

      }

      if ($_REG_HC.edad_hc.unid_edad == 'A' && parseInt($_REG_HC.edad_hc.vlr_edad) > 15) {
        if (parseFloat(this.hcprc.signos.imc_corp) >= 30) {
          CON851('BC', 'BC', null, 'warning', 'Advertencia');
        } else if (parseFloat(this.hcprc.signos.imc_corp) >= 25) {
          CON851('BB', 'BB', null, 'warning', 'Advertencia');
        } else if (parseFloat(this.hcprc.signos.imc_corp) < 16) {
          CON851('BE', 'BE', null, 'warning', 'Advertencia');
        } else if (parseFloat(this.hcprc.signos.imc_corp) <= 17) {
          CON851('BD', 'BD', null, 'warning', 'Advertencia');
        } else if (parseFloat(this.hcprc.signos.imc_corp) < 25) {
          CON851('H1', 'H1', null, 'success', 'success');
        }
      }

      var busqT = this.tabla_oms.find(el => el['CODIGO'] == 'IXS' && el['SEXO'] == 'F');
      if (busqT != undefined) {
        console.log(busqT);
        var imc = parseFloat(this.hcprc.signos.imc_corp);
        var dato_m1 = parseFloat(busqT.DATO_M1);
        var dato_0 = parseFloat(busqT.DATO_0);
        var dato_1 = parseFloat(busqT.DATO_1);

        if ((this.hcprc.rips.embarazo == 1 || this.hcprc.rips.embarazo == 2 || this.hcprc.rips.embarazo == 3) && obstEdadGestReg_4040 > 9) {
          if (imc < dato_m1) {
            this.hcprc.signos.est_nutri = 'E';
            CON851('BE', 'BE', null, 'warning', 'Advertencia');
          } else if (imc > dato_1) {
            this.hcprc.signos.est_nutri = 'O';
            CON851('BC', 'BC', null, 'warning', 'Advertencia');
          } else if (imc > dato_0) {
            this.hcprc.signos.est_nutri = 'S';
            CON851('BB', 'BB', null, 'warning', 'Advertencia');
          } else {
            this.hcprc.signos.est_nutri = 'N';
            CON851('AX', 'AX', null, 'warning', 'Advertencia');
          }
        }

      } else {
        console.log('busqueda de tabla oms fallida');
      }

      this.signosVitalesDatoTemp();
    },

    signosVitalesDatoTemp() {
      validarInputs({
        form: '#signos_temp'
      }, () => {
        this.signosVitalesTalla();
      }, () => {
        this.hcprc.signos.temp = this.formatNumero(this.hcprc.signos.temp);
        var temp = parseFloat(this.hcprc.signos.temp);
        var peso = parseFloat(this.hcprc.signos.peso);

        if ((temp == 0 || temp == '') && this.hcprc.serv == '02' && this.nit_usu == 800037021) {
          CON851('02', '02', null, 'error', 'error')
          this.signosVitalesDatoTemp();
        } else {
          if ($_REG_PROF.ATIENDE_PROF == '1' || $_REG_PROF.ATIENDE_PROF == '5' || $_REG_PROF.ATIENDE_PROF == '7' || $_REG_PROF.ATIENDE_PROF == '8' ||
            $_REG_PROF.ATIENDE_PROF == 'A' || $_REG_PROF.ATIENDE_PROF == 'H' || $_REG_PROF.ATIENDE_PROF == 'I' || $_REG_PROF.ATIENDE_PROF == 'O') {

            if (temp > 0 && (temp < 35.5 || temp > 38)) {
              CON851('BM', 'BM', null, 'warning', 'Advertencia');
              // continue
              this.signosVitalesDatoFc();
            } else if (temp > 45) {
              CON851('03', '03', null, 'error', 'error')
              this.signosVitalesDatoTemp();
            } else {
              // continue
              this.signosVitalesDatoFc();
            }

          } else if ((temp == 0 || temp == '') && peso > 0) {
            CON851('02', '02', null, 'error', 'error')
            this.signosVitalesDatoTemp();
          } else if (temp > 45) {
            CON851('03', '03', null, 'error', 'error')
            this.signosVitalesDatoTemp();
          } else if (temp > 0 && (temp < 35.5 || temp > 38)) {
            CON851('BM', 'BM', null, 'warning', 'Advertencia');
            // continue
            this.signosVitalesDatoFc();
          } else {
            // continue
            this.signosVitalesDatoFc();
          }
        }
      })
    },

    signosVitalesDatoFc() {
      validarInputs({
        form: '#signos_fcard'
      }, () => {
        this.signosVitalesDatoTemp();
      }, () => {
        this.hcprc.signos.fcard = this.formatNumero(this.hcprc.signos.fcard);
        var fcard = parseFloat(this.hcprc.signos.fcard);
        var peso = parseFloat(this.hcprc.signos.peso);

        if ((fcard == 0 || fcard == '') && this.hcprc.serv == '02' && this.nit_usu == 800037021) {
          CON851('02', '02', null, 'error', 'error')
          this.signosVitalesDatoFc();
        } else {

          if ($_REG_PROF.ATIENDE_PROF == '1' || $_REG_PROF.ATIENDE_PROF == '5' || $_REG_PROF.ATIENDE_PROF == '7' || $_REG_PROF.ATIENDE_PROF == '8' ||
            $_REG_PROF.ATIENDE_PROF == 'A' || $_REG_PROF.ATIENDE_PROF == 'H' || $_REG_PROF.ATIENDE_PROF == 'I' || $_REG_PROF.ATIENDE_PROF == 'O') {

            if (fcard > 200) {
              CON851('03', '03', null, 'error', 'error')
              this.signosVitalesDatoFc();
            } else {

              if (fcard > 0) {
                switch ($_REG_HC.edad_hc.unid_edad) {
                  case 'D':
                    if (fcard < 100 || fcard < 150) {
                      CON851('BK', 'BK', null, 'warning', 'Advertencia');
                    }
                    break;
                  case 'M':
                    if ($_REG_HC.edad_hc.vlr_edad < 6) {
                      if (fcard < 80 || fcard > 120) {
                        CON851('BK', 'BK', null, 'warning', 'Advertencia');
                      }
                    } else {
                      if ($_REG_HC.edad_hc.vlr_edad > 3) {
                        if (fcard < 80 || fcard > 120) {
                          CON851('BK', 'BK', null, 'warning', 'Advertencia');
                        }
                      } else {
                        if (fcard < 80 || fcard < 120)
                          CON851('BK', 'BK', null, 'warning', 'Advertencia');
                      }
                    }
                    break;
                  case 'A':
                    if ($_REG_HC.edad_hc.vlr_edad > 10) {
                      if (fcard < 60 || fcard > 100) {
                        CON851('BK', 'BK', null, 'warning', 'Advertencia');
                      }
                    } else {
                      if (fcard < 70 || fcard > 120) {
                        CON851('BK', 'BK', null, 'warning', 'Advertencia');
                      }
                    }
                    break;
                }
              }

              // continue
              this.signosVitalesDatoFr();

            }

          } else if ((fcard == 0 || fcard == '') && peso > 0) {
            CON851('02', '02', null, 'error', 'error')
            this.signosVitalesDatoFc();
          } else if (fcard > 200) {
            CON851('03', '03', null, 'error', 'error')
            this.signosVitalesDatoFc();
          } else {

            if (fcard > 0) {
              switch ($_REG_HC.edad_hc.unid_edad) {
                case 'D':
                  if (fcard < 100 || fcard < 150) {
                    CON851('BK', 'BK', null, 'warning', 'Advertencia');
                  }
                  break;
                case 'M':
                  if ($_REG_HC.edad_hc.vlr_edad < 6) {
                    if (fcard < 80 || fcard > 120) {
                      CON851('BK', 'BK', null, 'warning', 'Advertencia');
                    }
                  } else {
                    if ($_REG_HC.edad_hc.vlr_edad > 3) {
                      if (fcard < 80 || fcard > 120) {
                        CON851('BK', 'BK', null, 'warning', 'Advertencia');
                      }
                    } else {
                      if (fcard < 80 || fcard < 120)
                        CON851('BK', 'BK', null, 'warning', 'Advertencia');
                    }
                  }
                  break;
                case 'A':
                  if ($_REG_HC.edad_hc.vlr_edad > 10) {
                    if (fcard < 60 || fcard > 100) {
                      CON851('BK', 'BK', null, 'warning', 'Advertencia');
                    }
                  } else {
                    if (fcard < 70 || fcard > 120) {
                      CON851('BK', 'BK', null, 'warning', 'Advertencia');
                    }
                  }
                  break;
              }
            }

            // continue
            this.signosVitalesDatoFr();
          }
        }
      })
    },

    signosVitalesDatoFr() {
      validarInputs({
        form: '#signos_fresp'
      }, () => {
        this.signosVitalesDatoFc();
      }, () => {
        this.hcprc.signos.fresp = this.formatNumero(this.hcprc.signos.fresp);
        var fresp = parseFloat(this.hcprc.signos.fresp);
        var peso = parseFloat(this.hcprc.signos.peso);

        if ((fresp == 0 || fresp == '') && this.hcprc.serv == '02' && this.nit_usu == 800037021) {
          CON851('02', '02', null, 'error', 'error')
          this.signosVitalesDatoFr();
        } else {
          if ($_REG_PROF.ATIENDE_PROF == '1' || $_REG_PROF.ATIENDE_PROF == '5' || $_REG_PROF.ATIENDE_PROF == '7' || $_REG_PROF.ATIENDE_PROF == '8' ||
            $_REG_PROF.ATIENDE_PROF == 'A' || $_REG_PROF.ATIENDE_PROF == 'H' || $_REG_PROF.ATIENDE_PROF == 'I' || $_REG_PROF.ATIENDE_PROF == 'O') {
            if (fresp > 100) {
              CON851('03', '03', null, 'error', 'error')
              this.signosVitalesDatoFr();
            } else {
              if (fresp > 0) {
                switch ($_REG_HC.edad_hc.unid_edad) {
                  case 'D':
                    if (fresp < 30 || fresp > 80) {
                      CON851('BL', 'BL', null, 'warning', 'Advertencia');
                    }
                    break;
                  case 'M':
                    if (fresp < 20 || fresp > 40) {
                      CON851('BL', 'BL', null, 'warning', 'Advertencia');
                    }
                    break;
                  case 'A':
                    if ($_REG_HC.edad_hc.vlr_edad > 8) {
                      if (fresp < 15 || fresp > 20) {
                        CON851('BL', 'BL', null, 'warning', 'Advertencia');
                      }
                    } else {
                      if (fresp < 20 || fresp > 30) {
                        CON851('BL', 'BL', null, 'warning', 'Advertencia');
                      }
                    }
                }
              }

              // continue
              this.signosVitalesDatoTens1();
            }
          } else if ((fresp == 0 || fresp == '') && peso > 0) {
            CON851('02', '02', null, 'error', 'error')
            this.signosVitalesDatoFr();
          } else if (fresp > 100) {
            CON851('03', '03', null, 'error', 'error')
            this.signosVitalesDatoFr();
          } else {
            if (fresp > 0) {
              switch ($_REG_HC.edad_hc.unid_edad) {
                case 'D':
                  if (fresp < 30 || fresp > 80) {
                    CON851('BL', 'BL', null, 'warning', 'Advertencia');
                  }
                  break;
                case 'M':
                  if (fresp < 20 || fresp > 40) {
                    CON851('BL', 'BL', null, 'warning', 'Advertencia');
                  }
                  break;
                case 'A':
                  if ($_REG_HC.edad_hc.vlr_edad > 8) {
                    if (fresp < 15 || fresp > 20) {
                      CON851('BL', 'BL', null, 'warning', 'Advertencia');
                    }
                  } else {
                    if (fresp < 20 || fresp > 30) {
                      CON851('BL', 'BL', null, 'warning', 'Advertencia');
                    }
                  }
              }
            }

            // continue
            this.signosVitalesDatoTens1();
          }
        }
      })
    },

    signosVitalesDatoTens1() {
      validarInputs({
        form: '#signos_tens1'
      }, () => {
        this.signosVitalesDatoFr();
      }, () => {
        var tens1 = parseFloat(this.hcprc.signos.tens1);
        var peso = parseFloat(this.hcprc.signos.peso);

        if ((tens1 == 0 || tens1 == '') && this.hcprc.serv == '02' && this.nit_usu == 800037021) {
          CON851('02', '02', null, 'error', 'error')
          this.signosVitalesDatoTens1();
        } else {
          if ($_REG_PROF.ATIENDE_PROF == '1' || $_REG_PROF.ATIENDE_PROF == '5' || $_REG_PROF.ATIENDE_PROF == '7' || $_REG_PROF.ATIENDE_PROF == '8' ||
            $_REG_PROF.ATIENDE_PROF == 'A' || $_REG_PROF.ATIENDE_PROF == 'H' || $_REG_PROF.ATIENDE_PROF == 'I' || $_REG_PROF.ATIENDE_PROF == 'O') {
            if (tens1 > 300) {
              CON851('03', '03', null, 'error', 'error')
              this.signosVitalesDatoTens1();
            } else {
              // continue
              this.signosVitalesDatoTens2();
            }
          } else if ((tens1 == 0 || tens1 == '') && peso > 0) {
            CON851('02', '02', null, 'error', 'error')
            this.signosVitalesDatoTens1();
          } else if (tens1 > 300) {
            CON851('03', '03', null, 'error', 'error')
            this.signosVitalesDatoTens1();
          } else {
            // continue
            this.signosVitalesDatoTens2();
          }
        }
      })
    },

    signosVitalesDatoTens2() {
      validarInputs({
        form: '#signos_tens2'
      }, () => {
        this.signosVitalesDatoTens1();
      }, () => {
        var tens1 = parseFloat(this.hcprc.signos.tens1);
        var tens2 = parseFloat(this.hcprc.signos.tens2);

        if (tens1 > 0 && (tens2 == 0 || tens2 == '')) {
          CON851('02', '02', null, 'error', 'error')
          this.signosVitalesDatoTens2();
        } else if (tens2 > 300) {
          CON851('03', '03', null, 'error', 'error')
          this.signosVitalesDatoTens2();
        } else {
          this.hcprc.signos.tens_media = (tens1 + (tens2 * 2)) / 3;

          if ($_REG_HC.edad_hc.unid_edad == 'D' || $_REG_HC.edad_hc.unid_edad == 'M') {
            this.hcprc.signos.aper_ocul = 0;
            this.hcprc.signos.resp_verb = 0;
            this.hcprc.signos.resp_moto = 0;
            this.hcprc.signos.vlr_glasg = 00;
            // continue
            this.signosVitalesDatoPvc();
          } else {
            // continue
            this.signosVitalesDatoGlasgow();
          }
        }
      })
    },

    signosVitalesDatoGlasgow() {
      setTimeout(() => {
        this.datoGlasg1Ing();
      }, 200);
    },

    signosVitalesDatoPvc() {
      validarInputs({
        form: '#signos_pvc'
      }, () => {
        this.signosVitalesDatoFr();
      }, () => {
        if (this.nit_usu == 832002436 && (this.hcprc.serv == '02' || this.hcprc.serv == '08')) {
          // continue
          this.signosVitalesDatoPerTora();
        } else {
          if ($_REG_HC.edad_hc.unid_edad == 'A' && $_REG_HC.edad_hc.vlr_edad > 10) {
            this.signosVitalesDatoPerAbdo();
          } else {
            // continue
            this.signosVitalesDatoPerTora();
          }
        }
      })
    },

    signosVitalesDatoPerTora() {
      validarInputs({
        form: '#signos_per_tora'
      }, () => {
        this.signosVitalesDatoPvc();
      }, () => {
        var per_tora = parseFloat(this.hcprc.signos.per_tora);

        if ((per_tora == '' || per_tora == 0) && (this.nit_usu == 800037979 || this.nit_usu == 832002436)) {
          CON851('02', '02', null, 'error', 'error')
          this.signosVitalesDatoPerTora();
        } else {
          // continue
          this.signosVitalesDatoPerAbdo();
        }
      })
    },

    signosVitalesDatoPerAbdo() {
      validarInputs({
        form: '#signos_per_abdo'
      }, () => {

        if ($_REG_HC.edad_hc.unid_edad == 'A' && $_REG_HC.edad_hc.vlr_edad > 10) {
          this.signosVitalesDatoPvc();
        } else {
          this.signosVitalesDatoPerTora();
        }

      }, () => {
        var per_abdo = parseFloat(this.hcprc.signos.per_abdo);

        if ((per_abdo == '' || per_abdo == 0) && (this.nit_usu == 800037979 || this.nit_usu == 832002436 || this.nit_usu == 900306771 || this.nit_usu == 844001287) ||
          (this.nit_usu == 892000458 && $_REG_PACI['CRONICO'] == 'S')) {
          CON851('02', '02', null, 'error', 'error')
          this.signosVitalesDatoPerAbdo();
        } else if (this.hcprc.serv == '08' && $_REG_HC.edad_hc.unid_edad == 'A' && $_REG_HC.edad_hc.vlr_edad > 18 && (per_abdo == '' || per_abdo == 0) && $_REG_PACI['CRONICO'] == 'S') {
          CON851('02', '02', null, 'error', 'error')
          this.signosVitalesDatoPerAbdo();
        } else {
          // continue
          this.signosVitalesDatoSat();
        }
      })
    },

    signosVitalesDatoSat() {
      validarInputs({
        form: '#signos_oximetria'
      }, () => {
        if (this.hcprc.serv == '08') {
          this.signosVitalesDatoPerAbdo();
        } else {
          if ($_REG_HC.edad_hc.unid_edad == 'A' && $_REG_HC.edad_hc.vlr_edad > 10) {
            this.signosVitalesDatoPvc();
          } else {
            this.signosVitalesDatoPerTora();
          }
        }
      }, () => {
        this.signosVitalesDatoPerCef();
      })
    },

    signosVitalesDatoPerCef() {
      validarInputs({
        form: '#signos_per_cef'
      }, () => {
        this.signosVitalesDatoSat();
      }, () => {
        this.signosVitalesDatoPerBraq();
      })
    },

    signosVitalesDatoPerBraq() {
      validarInputs({
        form: '#signos_per_braq'
      }, () => {
        this.signosVitalesDatoPerCef();
      }, () => {
        this.signosVitalesDatoPerMune();
      })
    },

    signosVitalesDatoPerMune() {
      validarInputs({
        form: '#signos_per_mune'
      }, () => {
        this.signosVitalesDatoPerBraq();
      }, () => {
        this.validarComplementoVisual();
        // this.LlamarHC890G();
      })
    },

    validarComplementoVisual() {
      if ((this.hcprc.serv == '08' || this.hcprc.serv == '02') && $_REG_PROF.ATIENDE_PROF == '2') {
        // llama agudeza visual
        this.LlamarHC890G();
      } else {
        this.DatoAspectoGeneral();
      }
    },

    escHC890G() {
      this.params_hc890g.estado = false;
      this.signosVitalesDatoPerMune();
    },

    LlamarHC890G() {
      //Agudeza visual
      this.params_hc890g.estado = true;
    },

    evaluarSalidaHC890G(agudeza) {
      this.params_hc890g.estado = false;
      console.log(agudeza);
      this.examen_visual = agudeza;

      this.hcprc.examen_visual.agud_visual_od_1 = this.examen_visual.agudeza_visual_od_1;
      this.hcprc.examen_visual.agud_visual_od_2 = this.examen_visual.agudeza_visual_od_2;
      this.hcprc.examen_visual.agud_visual_oi_1 = this.examen_visual.agudeza_visual_oi_1;
      this.hcprc.examen_visual.agud_visual_oi_2 = this.examen_visual.agudeza_visual_oi_2;
      this.hcprc.examen_visual.distancia_agud = this.examen_visual.distancia_agud;
      this.hcprc.examen_visual.estructuras_oculares_od = this.examen_visual.estructuras_oculares_od;
      this.hcprc.examen_visual.estructuras_oculares_oi = this.examen_visual.estructuras_oculares_oi;

      this.ventanaTactoRectal();
    },

    ventanaTactoRectal() {
      let unserv = this.hcprc.serv;
      let finalidad = this.hcprc.rips.finalid;
      let unidEdad = $_REG_HC.edad_hc.unid_edad;
      let vlrEdad = parseInt($_REG_HC.edad_hc.vlr_edad);
      let sexo = $_REG_PACI.SEXO;

      if (unserv == '08' && finalidad == '07' && unidEdad == 'A' && vlrEdad > 50 && sexo == 'M') {
        this.mostrarTacto = true;
        setTimeout(() => {
          this.params_tacto.estado = true;
        }, 300);
      } else {
        this.DatoAspectoGeneral();
      }
    },

    validarEsc_tacto() {
      this.mostrarTacto = false;
      this.params_tacto.estado = false;
      this.LlamarHC890G();
    },

    validarCallback_tacto(data) {
      this.mostrarTacto = false
      this.params_tacto.estado = false
      this.hcprc.signos.tacto_rectal = data.tacto_rectal;
      this.hcprc.signos.nota_tacto_rectal = data.nota_tacto_rectal;
      this.DatoAspectoGeneral()
    },

    DatoAspectoGeneral() {
      scrollProsoft("signos_hc8031", "smooth", "start");
      setTimeout(() => {
        this.signosVitales_8031('aspecto_gen', 'pantalla_05', 'DatoMama', 'ASPECTO GENERAL', 'descripAspecGen', '#aspecto_gen');
      }, 200);
    },

    DatoMama() {
      setTimeout(() => {
        this.signosVitales_8031('mamas', 'DatoAspectoGeneral', 'datoPielFanMuc', 'MAMA', 'descripMama', '#mamas');
      }, 200);
    },

    datoPielFanMuc() {
      setTimeout(() => {
        this.signosVitales_8031('piel_fan_muc', 'DatoMama', 'datoCabeza', 'PIEL, FANERAS Y MUCOSA', 'descripPielFan', '#piel_fan_muc');
      }, 200);
    },

    datoCabeza() {
      setTimeout(() => {
        this.signosVitales_8031('cabeza', 'datoPielFanMuc', 'datoAgudezaVisual', 'CABEZA', 'descripCabeza', '#cabeza');
      }, 200);
    },

    datoAgudezaVisual() {
      setTimeout(() => {
        this.signosVitales_8031('agudeza_vis', 'datoCabeza', 'datoGenitalesExter', 'AGUDEZA VISUAL', 'descripAgudezaV', '#agudeza_vis');
      }, 200);
    },

    datoGenitalesExter() {
      setTimeout(() => {
        this.signosVitales_8031('genitales_ext', 'datoAgudezaVisual', 'datoSaludBucal', 'GENITALES EXTERNOS', 'descripGenitalesExt', '#genitales_ext');
      }, 200);
    },

    datoSaludBucal() {
      setTimeout(() => {
        this.signosVitales_8031('salud_bucal', 'datoGenitalesExter', 'datoCuelloTiroides', 'SALUD BUCAL', 'descripSaludBucal', '#salud_bucal');
      }, 200);
    },

    datoCuelloTiroides() {
      setTimeout(() => {
        this.signosVitales_8031('cuello_tiroi', 'datoSaludBucal', 'datoTorax', 'CUELLO Y TIROIDES', 'descripCuelloTiroides', '#cuello_tiroi');
      }, 200);
    },

    datoTorax() {
      setTimeout(() => {
        this.signosVitales_8031('torax', 'datoCuelloTiroides', 'datoCardioPulmo', 'TORAX', 'descripTorax', '#torax');
      }, 200);
    },

    datoCardioPulmo() {
      setTimeout(() => {
        this.signosVitales_8031('cardio_pulmo', 'datoTorax', 'datoAbdomen', 'CARDIO PULMONAR', 'descripCardioPul', '#cardio_pulmo');
      }, 200);
    },

    datoAbdomen() {
      setTimeout(() => {
        this.signosVitales_8031('abdomen', 'datoCardioPulmo', 'datoGenicoUrina', 'ABDOMEN', 'descripAbdomen', '#abdomen');
      }, 200);
    },

    datoGenicoUrina() {
      setTimeout(() => {
        this.signosVitales_8031('genito_urina', 'datoAbdomen', 'datoColumna', 'GENICO URINARIO', 'descripGenicoUri', '#genito_urina');
      }, 200);
    },

    datoColumna() {
      setTimeout(() => {
        this.signosVitales_8031('columna', 'datoGenicoUrina', 'datoExtremidadInf', 'COLUMNA', 'descripColumna', '#columna');
      }, 200);
    },

    datoExtremidadInf() {
      setTimeout(() => {
        this.signosVitales_8031('extremidad_inf', 'datoColumna', 'datoNeurologico', 'EXTREMIDADES INFERIOES', 'descripExtremInfe', '#extremidad_inf');
      }, 200);
    },

    datoNeurologico() {
      setTimeout(() => {
        this.signosVitales_8031('neurologico', 'datoExtremidadInf', 'datoDolorPalpitacion', 'NEUROLOGICO', 'descripNeurolo', '#neurologico');
      }, 200);
    },

    datoDolorPalpitacion() {
      this.dato_8031.signos_vitales.dolor_palpacion.trim() == '' ? this.dato_8031.signos_vitales.dolor_palpacion = 'N' : false;
      validarInputs({
        form: '#dolor_palpacion'
      }, () => {
        this.datoNeurologico();
      }, () => {
        this.dato_8031.signos_vitales.dolor_palpacion = this.dato_8031.signos_vitales.dolor_palpacion.toUpperCase();
        var temp = this.dato_8031.signos_vitales.dolor_palpacion;
        if (temp == 'S' || temp == 'N') {
          this.datoSangradoContac();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoDolorPalpitacion();
        }
      })
    },

    datoSangradoContac() {
      this.dato_8031.signos_vitales.sangrado_contac.trim() == '' ? this.dato_8031.signos_vitales.sangrado_contac = 'N' : false;
      validarInputs({
        form: '#sangrado_contac'
      }, () => {
        this.datoDolorPalpitacion();
      }, () => {
        this.dato_8031.signos_vitales.sangrado_contac = this.dato_8031.signos_vitales.sangrado_contac.toUpperCase();
        var temp = this.dato_8031.signos_vitales.sangrado_contac;
        if (temp == 'S' || temp == 'N') {
          this.datoExamen();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoSangradoContac();
        }
      })
    },

    datoExamen() {
      if (this.form.examenFisico.trim() == '') {
        this.form.examenFisico = '* IMSPECCION GENERAL&* CABEZA/CUELLO&* CARDIOVASCULAR&* PULMONAR&* ABDOMEN&* GENITOURINARIOS&* COLUMNA / DORSO&* EXTREMIDADES&* NEUROLOGICO&* PIEL';
        this.form.examenFisico = this.form.examenFisico.replace(/(?:\&)/g, "\n");
      }

      validarInputs({
        form: '#validarExamenFisico'
      }, () => {
        this.datoSangradoContac();
      }, () => {
        this.form.examenFisico = this.form.examenFisico.toUpperCase();
        this.grabarPag5();
      })
    },

    async grabarPag5() {
      await this.grabar();

      await this.grabar_detalle_4005();
      await this.pantalla_06();
    },

    pantalla_06() {
      this.datoMetodoEleg();
    },

    async datoMetodoEleg() {
      var temp = this.dato_8031.asesoria_eleccion.metodo_eleg;
      var tipo = this.dato_8031.tipo;
      // var tipo = '1';

      if (tipo == '1') {

        setTimeout(() => { this.cualEmbarMetod_HC8031_2(); }, 300);

      } else {
        switch (temp) {
          case '1': this.form.descripMetodo_eleg = 'DIU'; break;
          case '2': this.form.descripMetodo_eleg = 'ORAL'; break;
          case '3': this.form.descripMetodo_eleg = 'BARRERA'; break;
          case '4': this.form.descripMetodo_eleg = 'OTRO'; break;
          case '5': this.form.descripMetodo_eleg = 'NINGUNO'; break;
          case '6': this.form.descripMetodo_eleg = 'DIU + BARRERA'; break;
          case '7': this.form.descripMetodo_eleg = 'IMPLE. SUBDERMICO'; break;
          case '8': this.form.descripMetodo_eleg = 'I. SUBDERM + BARRERA'; break;
          case '9': this.form.descripMetodo_eleg = 'ORAL + BARRERA'; break;
          case 'A': this.form.descripMetodo_eleg = 'INYECTABLE MENSUAL'; break;
          case 'B': this.form.descripMetodo_eleg = 'INYECTABLE + BARRERA'; break;
          case 'C': this.form.descripMetodo_eleg = 'INYECTABLE TRIMEST'; break;
          case 'D': this.form.descripMetodo_eleg = 'TRIMESTRAL + BARRERA'; break;
          case 'E': this.form.descripMetodo_eleg = 'EMERGENCIA'; break;
          case 'F': this.form.descripMetodo_eleg = 'EMERGENCIA + BARRERA'; break;
          case 'G': this.form.descripMetodo_eleg = 'ESTERILIZACION'; break;
          case 'H': this.form.descripMetodo_eleg = 'ESTERILIZACION + BARRERA'; break;
          case 'I': this.form.descripMetodo_eleg = 'NO USA X TRADICION'; break;
          case 'J': this.form.descripMetodo_eleg = 'NO USA X SALUD'; break;
          case 'K': this.form.descripMetodo_eleg = 'NO USA X NEGACION'; break;
          case 'L': this.form.descripMetodo_eleg = 'COITUS INTERRUPTUS'; break;
          case 'M': this.form.descripMetodo_eleg = 'METODO DEL RITMO'; break;
          default: this.form.descripMetodo_eleg = ''; break;
        }
        this.datoEduPrev();
      }

    },

    datoEduPrev() {
      validarInputs({
        form: '#validarBrindaEduc'
      }, () => {
        scrollProsoft("signos_hc8031", "smooth", "end");
        this.datoExamen();
      }, () => {
        this.form.brindaEduc = this.form.brindaEduc.toUpperCase();
        this.datoEduPrev1();
      })
    },

    datoEduPrev1() {
      this.dato_8031.brinda_educ_1 = this.form.brindaEduc.substring(0, 95).replace(/(\r\n|\n|\r)/gm, "&");
      this.dato_8031.brinda_educ_2 = this.form.brindaEduc.substring(95, 190).replace(/(\r\n|\n|\r)/gm, "&");
      this.dato_8031.brinda_educ_3 = this.form.brindaEduc.substring(190, 285).replace(/(\r\n|\n|\r)/gm, "&");
      this.datoExamenPrac();
    },

    datoExamenPrac() {
      this.dato_8031.asesoria_eleccion.examen_prac.trim() == '' ? this.dato_8031.asesoria_eleccion.examen_prac = 'N' : false;
      validarInputs({
        form: '#examen_prac'
      }, () => {
        this.datoEduPrev();
      }, () => {
        this.dato_8031.asesoria_eleccion.examen_prac = this.dato_8031.asesoria_eleccion.examen_prac.toUpperCase();
        var temp = this.dato_8031.asesoria_eleccion.examen_prac;
        if (temp == 'S') {
          this.datoCualExamen();
        } else if (temp == 'N') {
          this.datoEfectoSecun();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoExamenPrac();
        }
      })
    },

    datoCualExamen() {
      validarInputs({
        form: '#cual_examen_prac'
      }, () => {
        this.datoExamenPrac();
      }, () => {
        this.dato_8031.asesoria_eleccion.cual_examen_prac = this.dato_8031.asesoria_eleccion.cual_examen_prac.toUpperCase();
        this.datoEfectoSecun();
      })
    },

    datoEfectoSecun() {
      this.dato_8031.asesoria_eleccion.efecto_secun.trim() == '' ? this.dato_8031.asesoria_eleccion.efecto_secun = 'N' : false;
      validarInputs({
        form: '#efecto_secun'
      }, () => {
        this.datoCualExamen();
      }, () => {
        this.dato_8031.asesoria_eleccion.efecto_secun = this.dato_8031.asesoria_eleccion.efecto_secun.toUpperCase();
        var temp = this.dato_8031.asesoria_eleccion.efecto_secun;
        if (temp == 'S' || temp == 'N') {
          this.datoUsoCorrectMet();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoEfectoSecun();
        }
      })
    },

    datoUsoCorrectMet() {
      this.dato_8031.asesoria_eleccion.uso_correc_met.trim() == '' ? this.dato_8031.asesoria_eleccion.uso_correc_met = 'N' : false;
      validarInputs({
        form: '#uso_correc_met'
      }, () => {
        this.datoEfectoSecun();
      }, () => {
        this.dato_8031.asesoria_eleccion.uso_correc_met = this.dato_8031.asesoria_eleccion.uso_correc_met.toUpperCase();
        var temp = this.dato_8031.asesoria_eleccion.uso_correc_met;
        if (temp == 'S' || temp == 'N') {
          this.datoImporControles();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoUsoCorrectMet();
        }
      })
    },

    datoImporControles() {
      this.dato_8031.asesoria_eleccion.impor_controles.trim() == '' ? this.dato_8031.asesoria_eleccion.impor_controles = 'N' : false;
      validarInputs({
        form: '#impor_controles'
      }, () => {
        this.datoUsoCorrectMet();
      }, () => {
        this.dato_8031.asesoria_eleccion.impor_controles = this.dato_8031.asesoria_eleccion.impor_controles.toUpperCase();
        var temp = this.dato_8031.asesoria_eleccion.impor_controles;
        if (temp == 'S' || temp == 'N') {
          this.datoAlarmaMetod();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoImporControles();
        }
      })
    },

    datoAlarmaMetod() {
      this.dato_8031.asesoria_eleccion.alarma_metodo.trim() == '' ? this.dato_8031.asesoria_eleccion.alarma_metodo = 'N' : false;
      validarInputs({
        form: '#alarma_metodo'
      }, () => {
        this.datoImporControles();
      }, () => {
        this.dato_8031.asesoria_eleccion.alarma_metodo = this.dato_8031.asesoria_eleccion.alarma_metodo.toUpperCase();
        var temp = this.dato_8031.asesoria_eleccion.alarma_metodo;
        if (temp == 'S' || temp == 'N') {
          this.datoDemanCitol();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoAlarmaMetod();
        }
      })
    },

    datoDemanCitol() {
      this.dato_8031.asesoria_eleccion.deman_citol.trim() == '' ? this.dato_8031.asesoria_eleccion.deman_citol = 'N' : false;
      validarInputs({
        form: '#deman_citol'
      }, () => {
        this.datoAlarmaMetod();
      }, () => {
        this.dato_8031.asesoria_eleccion.deman_citol = this.dato_8031.asesoria_eleccion.deman_citol.toUpperCase();
        var temp = this.dato_8031.asesoria_eleccion.deman_citol;
        if (temp == 'S' || temp == 'N') {
          this.datoInstrucRecom();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoDemanCitol();
        }
      })
    },

    datoInstrucRecom() {
      this.dato_8031.asesoria_eleccion.instructivo_recom.trim() == '' ? this.dato_8031.asesoria_eleccion.instructivo_recom = 'N' : false;
      validarInputs({
        form: '#instructivo_recom'
      }, () => {
        // this.datoPrevencion();
        this.datoDemanCitol();
      }, () => {
        this.dato_8031.asesoria_eleccion.instructivo_recom = this.dato_8031.asesoria_eleccion.instructivo_recom.toUpperCase();
        var temp = this.dato_8031.asesoria_eleccion.instructivo_recom;
        if (temp == 'S' || temp == 'N') {
          this.datoPrevencion();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoInstrucRecom();
        }
      })
    },

    datoPrevencion() {
      this.dato_8031.asesoria_eleccion.prevencion.trim() == '' ? this.dato_8031.asesoria_eleccion.prevencion = 'N' : false;
      validarInputs({
        form: '#prevencion'
      }, () => {
        this.datoInstrucRecom();
      }, () => {
        this.dato_8031.asesoria_eleccion.prevencion = this.dato_8031.asesoria_eleccion.prevencion.toUpperCase();
        var temp = this.dato_8031.asesoria_eleccion.prevencion;
        if (temp == 'S' || temp == 'N') {
          this.datoMecanismoAccion();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoPrevencion();
        }
      })
    },

    datoMecanismoAccion() {
      this.dato_8031.asesoria_eleccion.mecanismo_accion.trim() == '' ? this.dato_8031.asesoria_eleccion.mecanismo_accion = 'N' : false;
      validarInputs({
        form: '#mecanismo_accion'
      }, () => {
        this.datoPrevencion();
      }, () => {
        this.dato_8031.asesoria_eleccion.mecanismo_accion = this.dato_8031.asesoria_eleccion.mecanismo_accion.toUpperCase();
        var temp = this.dato_8031.asesoria_eleccion.mecanismo_accion;
        if (temp == 'S' || temp == 'N') {
          this.datoAutocuidado();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoMecanismoAccion();
        }
      })
    },

    datoAutocuidado() {
      this.dato_8031.asesoria_eleccion.autocuidado.trim() == '' ? this.dato_8031.asesoria_eleccion.autocuidado = 'N' : false;
      validarInputs({
        form: '#autocuidado'
      }, () => {
        this.datoMecanismoAccion();
      }, () => {
        this.dato_8031.asesoria_eleccion.autocuidado = this.dato_8031.asesoria_eleccion.autocuidado.toUpperCase();
        var temp = this.dato_8031.asesoria_eleccion.autocuidado;
        if (temp == 'S' || temp == 'N') {
          this.datoAutoexamenMama();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoAutocuidado();
        }
      })
    },

    datoAutoexamenMama() {
      this.dato_8031.asesoria_eleccion.autoexamen_mama.trim() == '' ? this.dato_8031.asesoria_eleccion.autoexamen_mama = 'N' : false;
      validarInputs({
        form: '#autoexamen_mama'
      }, () => {
        this.datoAutocuidado();
      }, () => {
        this.dato_8031.asesoria_eleccion.autoexamen_mama = this.dato_8031.asesoria_eleccion.autoexamen_mama.toUpperCase();
        var temp = this.dato_8031.asesoria_eleccion.autoexamen_mama;
        if (temp == 'S' || temp == 'N') {
          this.datoOtroTema();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoAutoexamenMama();
        }
      })
    },

    datoOtroTema() {
      this.dato_8031.asesoria_eleccion.otro_tema.trim() == '' ? this.dato_8031.asesoria_eleccion.otro_tema = 'N' : false;
      validarInputs({
        form: '#otro_tema'
      }, () => {
        this.datoAutoexamenMama();
      }, () => {
        this.dato_8031.asesoria_eleccion.otro_tema = this.dato_8031.asesoria_eleccion.otro_tema.toUpperCase();
        var temp = this.dato_8031.asesoria_eleccion.otro_tema;
        if (temp == 'S') {
          // continue
          this.datoCualTema();
        } else if (temp == 'N') {
          // continue
          this.grabarPag6();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoOtroTema();
        }
      })
    },

    datoCualTema() {
      validarInputs({
        form: '#cual_tema'
      }, () => {
        this.datoExamen();
      }, () => {
        this.dato_8031.asesoria_eleccion.cual_tema = this.dato_8031.asesoria_eleccion.cual_tema.toUpperCase();
        this.grabarPag6();
      })
    },

    async grabarPag6() {
      var tipo = this.dato_8031.tipo;
      // var tipo = '1';

      await this.grabar();

      if (tipo == '2') {
        // continue
        await this.pantalla_07();
      } else {
        // continue
        await this.pantalla_08();
      }
    },

    pantalla_07() {
      this.datoMetodoAnt();
    },

    datoMetodoAnt() {
      var temp = this.dato_8031.control.metodo_ant;

      switch (temp) {
        case '1': this.form.descripMetodAnt = 'DIU'; break;
        case '2': this.form.descripMetodAnt = 'ORAL'; break;
        case '3': this.form.descripMetodAnt = 'BARRERA'; break;
        case '4': this.form.descripMetodAnt = 'OTRO'; break;
        case '5': this.form.descripMetodAnt = 'NINGUNO'; break;
        case '6': this.form.descripMetodAnt = 'DIU + BARRERA'; break;
        case '7': this.form.descripMetodAnt = 'IMPLE. SUBDERMICO'; break;
        case '8': this.form.descripMetodAnt = 'I. SUBDERM + BARRERA'; break;
        case '9': this.form.descripMetodAnt = 'ORAL + BARRERA'; break;
        case 'A': this.form.descripMetodAnt = 'INYECTABLE MENSUAL'; break;
        case 'B': this.form.descripMetodAnt = 'INYECTABLE + BARRERA'; break;
        case 'C': this.form.descripMetodAnt = 'INYECTABLE TRIMEST'; break;
        case 'D': this.form.descripMetodAnt = 'TRIMESTRAL + BARRERA'; break;
        case 'E': this.form.descripMetodAnt = 'EMERGENCIA'; break;
        case 'F': this.form.descripMetodAnt = 'EMERGENCIA + BARRERA'; break;
        case 'G': this.form.descripMetodAnt = 'ESTERILIZACION'; break;
        case 'H': this.form.descripMetodAnt = 'ESTERILIZACION + BARRERA'; break;
        case 'I': this.form.descripMetodAnt = 'NO USA X TRADICION'; break;
        case 'J': this.form.descripMetodAnt = 'NO USA X SALUD'; break;
        case 'K': this.form.descripMetodAnt = 'NO USA X NEGACION'; break;
        case 'L': this.form.descripMetodAnt = 'COITUS INTERRUPTUS'; break;
        case 'M': this.form.descripMetodAnt = 'METODO DEL RITMO'; break;
        default: this.form.descripMetodAnt = ''; break;
      }

      this.datoTiempoUso();
    },

    datoTiempoUso() {
      this.dato_8031.control.tiempo_uso == '' ? this.dato_8031.control.tiempo_uso = 00 : false;
      validarInputs({
        form: '#tiempo_uso'
      }, () => {
        this.datoOtroTema();
      }, () => {
        this.datoSatisfaccion();
      })
    },

    datoSatisfaccion() {
      this.dato_8031.control.satisfaccion.trim() == '' ? this.dato_8031.control.satisfaccion = 'N' : false;
      validarInputs({
        form: '#satisfaccion'
      }, () => {
        this.datoTiempoUso();
      }, () => {
        this.dato_8031.control.satisfaccion = this.dato_8031.control.satisfaccion.toUpperCase();
        var temp = this.dato_8031.control.satisfaccion;
        if (temp == 'S' || temp == 'N') {
          this.datoVisionBorr();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoSatisfaccion();
        }
      })
    },

    datoVisionBorr() {
      if ($_REG_PACI.SEXO == 'M') {
        this.datoContinuaMetodo();
      } else {
        this.dato_8031.control.vision_borr.trim() == '' ? this.dato_8031.control.vision_borr = 'N' : false;
        validarInputs({
          form: '#vision_borr'
        }, () => {
          this.datoSatisfaccion();
        }, () => {
          this.dato_8031.control.vision_borr = this.dato_8031.control.vision_borr.toUpperCase();
          var temp = this.dato_8031.control.vision_borr;
          if (temp == 'S' || temp == 'N') {
            this.datoDolorAbdomen();
          } else {
            CON851('03', '03', null, 'error', 'error')
            this.datoVisionBorr();
          }
        })
      }
    },

    datoDolorAbdomen() {
      this.dato_8031.control.dolor_abdomen.trim() == '' ? this.dato_8031.control.dolor_abdomen = 'N' : false;
      validarInputs({
        form: '#dolor_abdomen'
      }, () => {
        this.datoVisionBorr();
      }, () => {
        this.dato_8031.control.dolor_abdomen = this.dato_8031.control.dolor_abdomen.toUpperCase();
        var temp = this.dato_8031.control.dolor_abdomen;
        if (temp == 'S' || temp == 'N') {
          this.datoDolorTorax();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoDolorAbdomen();
        }
      })
    },

    datoDolorTorax() {
      this.dato_8031.control.dolor_torax.trim() == '' ? this.dato_8031.control.dolor_torax = 'N' : false;
      validarInputs({
        form: '#dolor_torax'
      }, () => {
        this.datoDolorAbdomen();
      }, () => {
        this.dato_8031.control.dolor_torax = this.dato_8031.control.dolor_torax.toUpperCase();
        var temp = this.dato_8031.control.dolor_torax;
        if (temp == 'S' || temp == 'N') {
          this.datoDolorBrazo();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoDolorTorax();
        }
      })
    },

    datoDolorBrazo() {
      this.dato_8031.control.dolor_brazo.trim() == '' ? this.dato_8031.control.dolor_brazo = 'N' : false;
      validarInputs({
        form: '#dolor_brazo'
      }, () => {
        this.datoDolorTorax();
      }, () => {
        this.dato_8031.control.dolor_brazo = this.dato_8031.control.dolor_brazo.toUpperCase();
        var temp = this.dato_8031.control.dolor_brazo;
        if (temp == 'S' || temp == 'N') {
          this.datoMareo();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoDolorBrazo();
        }
      })
    },

    datoMareo() {
      this.dato_8031.control.mareo.trim() == '' ? this.dato_8031.control.mareo = 'N' : false;
      validarInputs({
        form: '#mareo'
      }, () => {
        this.datoDolorBrazo();
      }, () => {
        this.dato_8031.control.mareo = this.dato_8031.control.mareo.toUpperCase();
        var temp = this.dato_8031.control.mareo;
        if (temp == 'S' || temp == 'N') {
          this.datoManchasPiel();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoMareo();
        }
      })
    },

    datoManchasPiel() {
      this.dato_8031.control.manchas_piel.trim() == '' ? this.dato_8031.control.manchas_piel = 'N' : false;
      validarInputs({
        form: '#manchas_piel'
      }, () => {
        this.datoMareo();
      }, () => {
        this.dato_8031.control.manchas_piel = this.dato_8031.control.manchas_piel.toUpperCase();
        var temp = this.dato_8031.control.manchas_piel;
        if (temp == 'S' || temp == 'N') {
          this.datoEdemaPies();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoManchasPiel();
        }
      })
    },

    datoEdemaPies() {
      this.dato_8031.control.edema_pies.trim() == '' ? this.dato_8031.control.edema_pies = 'N' : false;
      validarInputs({
        form: '#edema_pies'
      }, () => {
        this.datoManchasPiel();
      }, () => {
        this.dato_8031.control.edema_pies = this.dato_8031.control.edema_pies.toUpperCase();
        var temp = this.dato_8031.control.edema_pies;
        if (temp == 'S' || temp == 'N') {
          this.datoVarices();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoEdemaPies();
        }
      })
    },

    datoVarices() {
      this.dato_8031.control.varices.trim() == '' ? this.dato_8031.control.varices = 'N' : false;
      validarInputs({
        form: '#varices'
      }, () => {
        this.datoEdemaPies();
      }, () => {
        this.dato_8031.control.varices = this.dato_8031.control.varices.toUpperCase();
        var temp = this.dato_8031.control.varices;
        if (temp == 'S' || temp == 'N') {
          this.datoDolorPelvico();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoVarices();
        }
      })
    },

    datoDolorPelvico() {
      this.dato_8031.control.dolor_pelvico.trim() == '' ? this.dato_8031.control.dolor_pelvico = 'N' : false;
      validarInputs({
        form: '#dolor_pelvico'
      }, () => {
        this.datoVarices();
      }, () => {
        this.dato_8031.control.dolor_pelvico = this.dato_8031.control.dolor_pelvico.toUpperCase();
        var temp = this.dato_8031.control.dolor_pelvico;
        if (temp == 'S' || temp == 'N') {
          this.datoFlujoVaginal();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoDolorPelvico();
        }
      })
    },

    datoFlujoVaginal() {
      this.dato_8031.control.flujo_vag.trim() == '' ? this.dato_8031.control.flujo_vag = 'N' : false;
      validarInputs({
        form: '#flujo_vag'
      }, () => {
        this.datoDolorPelvico();
      }, () => {
        this.dato_8031.control.flujo_vag = this.dato_8031.control.flujo_vag.toUpperCase();
        var temp = this.dato_8031.control.flujo_vag;
        if (temp == 'S' || temp == 'N') {
          this.datoDolorCabeza();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoFlujoVaginal();
        }
      })
    },

    datoDolorCabeza() {
      this.dato_8031.control.dolor_cabeza.trim() == '' ? this.dato_8031.control.dolor_cabeza = 'N' : false;
      validarInputs({
        form: '#dolor_cabeza'
      }, () => {
        this.datoFlujoVaginal();
      }, () => {
        this.dato_8031.control.dolor_cabeza = this.dato_8031.control.dolor_cabeza.toUpperCase();
        var temp = this.dato_8031.control.dolor_cabeza;
        if (temp == 'S' || temp == 'N') {
          this.datoDolorPiernas();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoDolorCabeza();
        }
      })
    },

    datoDolorPiernas() {
      this.dato_8031.control.dolor_piernas.trim() == '' ? this.dato_8031.control.dolor_piernas = 'N' : false;
      validarInputs({
        form: '#dolor_piernas'
      }, () => {
        this.datoDolorCabeza();
      }, () => {
        this.dato_8031.control.dolor_piernas = this.dato_8031.control.dolor_piernas.toUpperCase();
        var temp = this.dato_8031.control.dolor_piernas;
        if (temp == 'S' || temp == 'N') {
          this.datoSangradoVagi();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoDolorPiernas();
        }
      })
    },

    datoSangradoVagi() {
      this.dato_8031.control.sangrado_vag.trim() == '' ? this.dato_8031.control.sangrado_vag = 'N' : false;
      validarInputs({
        form: '#sangrado_vag'
      }, () => {
        this.datoDolorPiernas();
      }, () => {
        this.dato_8031.control.sangrado_vag = this.dato_8031.control.sangrado_vag.toUpperCase();
        var temp = this.dato_8031.control.sangrado_vag;
        if (temp == 'S' || temp == 'N') {
          this.datoCambiosComporta();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoSangradoVagi();
        }
      })
    },

    datoCambiosComporta() {
      this.dato_8031.control.cambios_comporta.trim() == '' ? this.dato_8031.control.cambios_comporta = 'N' : false;
      validarInputs({
        form: '#cambios_comporta'
      }, () => {
        this.datoSangradoVagi();
      }, () => {
        this.dato_8031.control.cambios_comporta = this.dato_8031.control.cambios_comporta.toUpperCase();
        var temp = this.dato_8031.control.cambios_comporta;
        if (temp == 'S' || temp == 'N') {
          this.datoMolestiaPalmas();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoCambiosComporta();
        }
      })
    },

    datoMolestiaPalmas() {
      this.dato_8031.control.molestia_palmas.trim() == '' ? this.dato_8031.control.molestia_palmas = 'N' : false;
      validarInputs({
        form: '#molestia_palmas'
      }, () => {
        this.datoCambiosComporta();
      }, () => {
        this.dato_8031.control.molestia_palmas = this.dato_8031.control.molestia_palmas.toUpperCase();
        var temp = this.dato_8031.control.molestia_palmas;
        if (temp == 'S' || temp == 'N') {
          this.datoSintomaOrd();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoMolestiaPalmas();
        }
      })
    },

    datoSintomaOrd() {
      this.dato_8031.control.sintoma_ord.trim() == '' ? this.dato_8031.control.sintoma_ord = 'N' : false;
      validarInputs({
        form: '#sintoma_ord'
      }, () => {
        this.datoMolestiaPalmas();
      }, () => {
        this.dato_8031.control.sintoma_ord = this.dato_8031.control.sintoma_ord.toUpperCase();
        var temp = this.dato_8031.control.sintoma_ord;
        if (temp == 'S' || temp == 'N') {
          this.datoExpSubdermico();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoSintomaOrd();
        }
      })
    },

    datoExpSubdermico() {
      setTimeout(() => {
        this.expulsionMetodo_HC8031('exp_subdermico', 'datoSintomaOrd', 'datoExpIntrauterino', 'Expulsion del metodo subdermico', 'descripExp_subdermico', '#descripExp_subdermico');
      }, 200);
    },

    datoExpIntrauterino() {
      setTimeout(() => {
        this.expulsionMetodo_HC8031('exp_intrauterino', 'datoExpSubdermico', 'datoContinuaMetodo', 'Expulsion del metodo intrauterino', 'descripExp_intrauterino', '#descripExp_intrauterino');
      }, 200);
    },

    datoContinuaMetodo() {
      this.dato_8031.control.continua_metodo.trim() == '' ? this.dato_8031.control.continua_metodo = 'N' : false;
      validarInputs({
        form: '#continua_metodo'
      }, () => {
        this.datoExpIntrauterino();
      }, () => {
        this.dato_8031.control.continua_metodo = this.dato_8031.control.continua_metodo.toUpperCase();
        var temp = this.dato_8031.control.continua_metodo;
        if (temp == 'S') {
          this.dato_8031.control.nuevo_metodo = '';
          this.form.ano_Cambio = '';
          this.form.mes_Cambio = '';
          this.form.dia_Cambio = '';
          this.datoEspecialidad();
        } else if (temp == 'N') {
          setTimeout(() => { this.datoNuevoMetodo(); }, 300);
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.datoContinuaMetodo();
        }
      })
    },

    datoNuevoMetodo() {
      setTimeout(() => { this.cualEmbarMetod_HC8031_3(); }, 300);
    },

    datoAnoCambio() {
      validarInputs({
        form: '#anoCambio'
      }, () => {
        setTimeout(() => { this.datoNuevoMetodo(); }, 300);
      }, () => {
        // continue
        this.datoMesCambio();
      })
    },

    datoMesCambio() {
      validarInputs({
        form: '#mesCambio'
      }, () => {
        this.datoAnoCambio();
      }, () => {
        this.form.mes_Cambio = cerosIzq(this.form.mes_Cambio, 2);
        var mes = parseInt(this.form.mes_Cambio);

        if (mes > 12) {
          this.datoMesCambio();
        } else {
          // continue
          this.datodiaCambio();
        }
      })
    },

    datodiaCambio() {
      validarInputs({
        form: '#diaCambio'
      }, () => {
        this.datoMesCambio();
      }, () => {
        this.form.dia_Cambio = cerosIzq(this.form.dia_Cambio, 2);
        var dia = parseInt(this.form.dia_Cambio);

        if (dia > 31) {
          this.datodiaCambio();
        } else {
          this.dato_8031.control.fecha_cambio = `${this.form.ano_Cambio}${this.form.mes_Cambio}${this.form.dia_Cambio}`;
          var fechaCambio = parseInt(this.dato_8031.control.fecha_cambio);

          if (fechaCambio < this.fecha_act) {
            CON851('37', '37', null, 'error', 'error')
            this.datoAnoCambio();
          } else {
            // continue
            this.datoEspecialidad();
          }
        }
      })
    },

    datoEspecialidad() {
      validarInputs({
        form: '#validarRemitido'
      }, () => {
        this.datoContinuaMetodo();
      }, () => {
        var temp = this.dato_8031.control.remitido;
        if (temp.trim() == '') {
          this.dato_8031.control.remitido = '';
          this.form.descripRemitido = '';
          // continue
          this.datoAnoProx();
        } else {
          let busq = this.especialidades.find(a => a.CODIGO == temp);
          if (busq != undefined) {
            this.form.descripRemitido = busq.NOMBRE;
            // continue
            this.datoAnoProx();
          } else {
            CON851('03', '03', null, 'error', 'error')
            this.datoEspecialidad();
          }
        }
      })
    },

    datoAnoProx() {
      validarInputs({
        form: '#anoProxi'
      }, () => {
        this.datoEspecialidad();
      }, () => {
        // continue
        this.datoMesProx();
      })
    },

    datoMesProx() {
      validarInputs({
        form: '#mesProxi'
      }, () => {
        this.datoAnoProx();
      }, () => {
        this.form.mes_Proxi = cerosIzq(this.form.mes_Proxi, 2);
        var mes = parseInt(this.form.mes_Proxi);
        var ano = parseInt(this.form.ano_Proxi);

        if (mes > 12) {
          this.datoMesProx();
        } else {
          this.dato_8031.control.fecha_proxima = `${this.form.ano_Proxi}${this.form.mes_Proxi}`;

          if ((ano < this.fecha_act.substring(0, 4)) || (ano == this.fecha_act.substring(0, 4) && mes <= this.fecha_act.substring(4, 6))) {
            CON851('37', '37', null, 'error', 'error')
            this.datoAnoProx();
          } else {
            // continue
            this.grabarPag7();
          }
        }
      })
    },

    async grabarPag7() {
      await this.grabar();
      await this.pantalla_08();
    },

    pantalla_08() {
      this.validarDiagnosticos(0);
    },

    validarDiagnosticos(pos) {
      if (pos > 9) {
        // continue
        this.ventanaImprimirCovid19();
      } else {
        validarInputs(
          {
            form: "#validarCod_diag_" + pos,
            orden: "1",

            // event_f5: () => {
            //   CON851P('03', () => { this.validarDiagnosticos(pos); }, () => { setTimeout(() => { _regresar_menuhis(); }, 300) });
            // },

            // event_f3: () => {
            //   this.ventanaImprimirCovid19();
            // },

          },
          () => {
            if (pos == 0) {
              this.datoAnoProx();
            } else {
              this.validarDiagnosticos(pos - 1)
            }
          },
          () => {
            this.form.diagnosticos[pos].cod = this.form.diagnosticos[pos].cod.toUpperCase();
            var diagn = this.form.diagnosticos[pos].cod;
            if (diagn.trim() == '' && pos == 0) {
              CON851('01', '01', null, 'error', 'error');
              this.validarDiagnosticos(pos);
            } else {
              if (this.form.diagnosticos[pos].cod.trim() == '') {
                for (var i in this.form.diagnosticos) {
                  if (i >= pos) {
                    this.form.diagnosticos[i].cod = '';
                    this.form.diagnosticos[i].descrip = '';
                  }
                }
                this.ventanaImprimirCovid19();
              } else {
                let busqEnf = this._enfermedades.find(e => e.COD_ENF == this.form.diagnosticos[pos].cod);
                if (busqEnf != undefined) {

                  if (busqEnf.HUERFA_ENF != undefined) {
                    if (busqEnf.HUERFA_ENF == 'S') {
                      CON851('G3', 'G3', null, 'warning', 'error');
                    }
                  }
                  this.form.diagnosticos[pos].descrip = busqEnf.NOMBRE_ENF;
                  this.hcprc.rips.tabla_diagn[pos].cod_diagn = this.form.diagnosticos[pos].cod;

                  this.validaciones_diagn(pos).then((data) => {
                    this.validarDiagnosticos(pos + 1)
                  }).catch((error) => {
                    console.log('aqui9');
                    this.hcprc.rips.tabla_diagn[pos].descrip_diagn = ''
                    this.validarDiagnosticos(pos)
                  })

                } else {
                  CON851('01', '01', null, 'error', 'error');
                  this.validarDiagnosticos(pos);
                }
              }

            }
          }
        );
      }
    },

    async validaciones_diagn(pos) {
      return new Promise((resolve, reject) => {
        if (this.nit_usu == 800037979 || this.nit_usu == 900077520) {
          if (this.hcprc.rips.tabla_diagn[0].cod_diagn.substring(0, 1) == 'Z' && (this.hcprc.serv == 01 || this.hcprc.serv == 02)) {
            CON851('03', '03', null, 'error', 'error')
            reject()
          }
        };

        if (this.nit_usu == 800037021 && this.hcprc.rips.tabla_diagn[0].cod_diagn.substring(0, 1) == 'R') {
          CON851('03', '03', null, 'error', 'error')
          reject()
        };

        let busqEnf = this._enfermedades.find(e => e.COD_ENF == this.hcprc.rips.tabla_diagn[pos].cod_diagn)

        if (!busqEnf) {
          CON851('01', '01', null, 'error', 'error')
          reject()
        }

        this.hcprc.rips.tabla_diagn[pos].descrip_diagn = busqEnf.NOMBRE_ENF

        // PYP SOLO APLICA PARA "Z" Y DIABETICOS, HIPERTENSOS, HIPELIPIDEMIA
        if (pos == 0 && this.hcprc.serv == 08) {
          var array_buscar = ["I10X", "I151", "I158", "I159", "O16X", "E782", "E784", "E785", "E119"]
          if (this.hcprc.rips.tabla_diagn[0].cod_diagn.substring(0, 1) == 'Z' ||
            this.hcprc.rips.tabla_diagn[0].cod_diagn.substring(0, 2) == 'E1' ||
            array_buscar.find(el => el == this.hcprc.rips.tabla_diagn[0].cod_diagn)
          ) {
            // continue
          } else {
            CON851('G0', 'G0', null, 'error', 'error')
            this.hcprc.rips.tabla_diagn[0].cod_diagn = ''
            reject()
          }
        }

        if ([02, 03, 06, 08, 63].find(el => el == this.hcprc.serv)) {
          // continue
        } else {
          var array_buscar = ["Z000", "Z001", "Z002", "Z003", "Z006", "Z021", "Z022", "Z023", "Z024", "Z025", "Z026", "Z027", "Z028", "Z029", "Z100", "Z101", "Z102", "Z103", "Z108", "Z300", "Z301", "Z700", "Z701", "Z702", "Z713", "Z714", "Z715", "Z716", "Z717", "Z718", "Z719"]
          if (array_buscar.find(el => el == this.hcprc.rips.tabla_diagn[0].cod_diagn)) {
            CON851('G1', 'G1', null, 'error', 'error')
            this.hcprc.rips.tabla_diagn[0].cod_diagn = ''
            reject()
          }
        }

        this.editarEdad(busqEnf)

        if (busqEnf.SEXO_ENF.trim() != '' && busqEnf.SEXO_ENF != $_REG_PACI.SEXO) {
          CON851('73', '73', null, 'error', 'error')
          reject()
        }

        if (busqEnf.EDAD_MIN_ENF > 0 && parseInt(this.edad_hc_w) < parseInt(this.edadMinW)) {
          CON851('74', '74', null, 'error', 'error')
          reject()
        }

        if (busqEnf.EDAD_MAX_ENF > 0 && parseInt(this.edad_hc_w) > parseInt(this.edadMaxW)) {
          CON851('74', '74', null, 'error', 'error')
          reject()
        }


        if (this.hcprc.rips.tabla_diagn[pos].cod_diagn.trim() != '') {
          let busqueda = this.enfermedades_trans.find(el => el.COD_ENF_J == this.hcprc.rips.tabla_diagn[pos].cod_diagn)
          if (busqueda) {
            CON851('2Z', '2Z', null, 'error', 'error')
          } else {
            // continue
          }
        }

        resolve()
      })
    },

    async editarEdad(enfermedad) {
      switch (enfermedad.UNID_EDAD_ENF) {
        case 'D':
          this.edadMinW = 1;
          this.edadMaxW = 1;
          break;
        case 'M':
          this.edadMinW = 2;
          this.edadMaxW = 2;
          break;
        case 'A':
          this.edadMinW = 3;
          this.edadMaxW = 3;
          break;
        default:
          this.edadMinW = 0;
          this.edadMaxW = 0;
          break;
      }

      this.edadMinW += enfermedad.EDAD_MIN_ENF.padStart(3, "0")
      this.edadMaxW += enfermedad.EDAD_MAX_ENF.padStart(3, "0")
    },

    async ventanaImprimirCovid19() {
      let array_buscar = ["J00X", "J010", "J011", "J012", "J013", "J014", "J018", "J019", "J020", "J028", "J029", "J030", "J038", "J039", "J040", "J041", "J042", "J050", "J051", "J060", "J068", "J069", "J100", "J101", "J108", "J110", "J111", "J118", "J120", "J121", "J122", "J128", "J129", "J13X", "J14X", "J150", "J151", "J152", "J153", "J154", "J155", "J156", "J157", "J158", "J159", "J160", "J168", "J170", "J171", "J172", "J173", "J178", "J180", "J181", "J182", "J188", "J189", "J200", "J201", "J202", "J203", "J204", "J205", "J206", "J207", "J208", "J209", "J210", "J218", "J219", "J22X", "J300", "J301", "J302", "J303", "J304", "J310", "J311", "J312", "J320", "J321", "J322", "J323", "J324", "J328", "J329", "U071", "U072"]
      let flagDiagn = false

      for (var i in this.hcprc.rips.tabla_diagn) {
        if (array_buscar.find(el => el == this.hcprc.rips.tabla_diagn)) flagDiagn = true
      }

      console.log(flagDiagn);

      if (flagDiagn) {
        this.hcprc.covid19.recomendacion_covid19 = 'S'
        this.ventanaSintomRespi()
      } else if (this.nit_usu == 900541158 && this.hcprc.serv == 09) {
        this.hcprc.covid19.recomendacion_covid19 = 'N'
        this.ventanaSintomRespi()
      } else if (![01, 02, 08, 09, 63].find(el => el == this.hcprc.serv)) {
        this.hcprc.covid19.recomendacion_covid19 = 'N'
        this.ventanaSintomRespi()
      } else {
        this.covid19 = this.hcprc.covid19
        this.params_hc890h.pregunta = 2;
        this.params_hc890h.estado = true;
      }
    },

    ventanaSintomRespi() {
      if ($_REG_PROF.ATIENDE_PROF != 2 && $_REG_PROF.ATIENDE_PROF != 6) {
        this.hcprc.signos.sintom_respi = ''
        this.hcprc.signos.sintom_piel = ''
        this.hcprc.signos.victi_maltrato = ''
        this.hcprc.signos.victi_violencia = ''
        this.hcprc.signos.enfer_mental = ''
        this.hcprc.signos.enfer_its = ''
        this.hcprc.signos.cancer_seno = ''
        this.hcprc.signos.cancer_cervis = ''
        this.hcprc.signos.edu_autoexa_seno = ''
        this.ventanaCreatinina()
      } else {
        this.mostrarSintomaticos = true
        setTimeout(() => {
          this.params_hc890d.estado = true
          this.params_hc890d.unserv = this.hcprc.cierre.unserv
          this.params_hc890d.finalidad = this.hcprc.rips.finalid
          this.params_hc890d.sexo = $_REG_PACI.SEXO
        }, 300);
      }
    },

    validarEsc_sintomatico() {
      this.mostrarSintomaticos = false
      this.params_hc890d.estado = false
      this.validarDiagnosticos(0);
    },

    validarCallback_sintomatico(data) {
      this.mostrarSintomaticos = false
      this.params_hc890d.estado = false
      this.hcprc.signos = data
      console.log(data);
      this.ventanaCreatinina()
    },

    ventanaCreatinina() {
      let unserv = this.hcprc.serv
      let finalidad = this.hcprc.rips.finalid

      if ((this.nit_usu == 800037021) ||
        (($_REG_PACI.CRONICO == 'S') &&
          (unserv == 08 && ((finalidad == 10 || finalidad == 11) || (this.nit_usu == 844003225 && (finalidad == 05 || finalidad == 07)))) || unserv == 02)) {

        this.datos_creatinina = {
            fecha: this.hcprc.fecha,
            peso: this.hcprc.signos.peso,
            edad: $_REG_HC.edad_hc.vlr_edad,
            unserv: this.hcprc.cierre.unserv,
            tabla_diagn: this.hcprc.rips.tabla_diagn,

            creatinina2: this.hcprc.signos.creatinina2,
            hemo_glicosilada: this.hcprc.signos.hemo_glicosilada,
            hemo_glico_fecha: this.hcprc.signos.hemo_glico_fecha,
            microalbuminuria: this.hcprc.signos.microalbuminuria,
            fecha_microalbuminuria: this.hcprc.signos.fecha_microalbuminuria,
            riesgo_cardio: this.hcprc.signos.riesgo_cardio,
            rela_albumi_creatini_1: this.hcprc.signos.rela_albumi_creatini_1,
            rela_albumi_creatini_2: this.hcprc.signos.rela_albumi_creatini_2,
            erc: this.hcprc.signos.erc,
            fecha_dx_erc: this.hcprc.signos.fecha_dx_erc,
            fecha_creatinina: this.hcprc.signos.fecha_creatinina,
            estadio_erc: this.hcprc.signos.estadio_erc,
        };
        this.params_creatinina.estado = true;
      } else {
        this.datoAnalisis();
      }
    },

    validarEsc_creatinina() {
      this.params_creatinina.estado = false;
      this.validarDiagnosticos(0)
    },

    validarCallback_creatinina(data) {
      console.log('return creatinina: ', data);

      this.hcprc.signos.creatinina2 = data.creatinina2;
      this.hcprc.signos.hemo_glicosilada = data.hemo_glicosilada;
      this.hcprc.signos.hemo_glico_fecha = data.hemo_glico_fecha;
      this.hcprc.signos.microalbuminuria = data.microalbuminuria;
      this.hcprc.signos.fecha_microalbuminuria = data.fecha_microalbuminuria;
      this.hcprc.signos.riesgo_cardio = data.riesgo_cardio;
      this.hcprc.signos.rela_albumi_creatini_1 = data.rela_albumi_creatini_1;
      this.hcprc.signos.rela_albumi_creatini_2 = data.rela_albumi_creatini_2;
      this.hcprc.signos.erc = data.erc;
      this.hcprc.signos.fecha_dx_erc = data.fecha_dx_erc;
      this.hcprc.signos.fecha_creatinina = data.fecha_creatinina;
      this.hcprc.signos.estadio_erc = data.estadio_erc;

      this.params_creatinina.estado = false;
      this.datoAnalisis();
    },

    datoAnalisis() {
      validarInputs({
        form: '#validarAnalisis'
      }, () => {
        this.validarDiagnosticos(0)
      }, () => {
        this.form.analisis = this.form.analisis.toUpperCase().replaceEsp()
        var analisis = this.form.analisis.replace(/(\r\n|\n|\r)/gm, "&");
        grabarDetallesText(analisis, $_REG_HC.llave_hc + '7501')
        this.datoPlan()
      })
    },

    datoPlan() {
      validarInputs({
        form: '#validarPlan'
      }, () => {
        this.datoAnalisis()
      }, () => {
        this.form.plan = this.form.plan.toUpperCase().replaceEsp()
        var plan = this.form.plan.replace(/(\r\n|\n|\r)/gm, "&");
        grabarDetallesText(plan, $_REG_HC.llave_hc + '7503')
        this.grabarPag8()
      })
    },

    async grabarPag8() {
      await this.grabar();
      await this.pantalla_07_rips();
    },

    async pantalla_07_rips() {
      switch (this.hcprc.rips.embarazo) {
        case '1': this.form.descrip_embarazo = '1ER TRIM. EMBA'; break;
        case '2': this.form.descrip_embarazo = '2DO TRIM. EMBA'; break;
        case '3': this.form.descrip_embarazo = '3ER TRIM. EMBA'; break;
        case '4': this.form.descrip_embarazo = 'NO ESTA EMBA'; break;
        case '9': this.form.descrip_embarazo = 'NO APLICA'; break;
        default: this.form.descrip_embarazo = ''; break;
      }

      switch (this.hcprc.rips.causa) {
        case '0': this.form.descrip_causa = ''; break;
        case '1': this.form.descrip_causa = 'ACCIDENTE TRABAJO'; break;
        case '2': this.form.descrip_causa = 'ACCIDENTE TRANSITO'; break;
        case '3': this.form.descrip_causa = 'ACCIDENTE RABICO'; break;
        case '4': this.form.descrip_causa = 'ACCIDENTE OFIDICO'; break;
        case '5': this.form.descrip_causa = 'OTRO ACCIDENTE'; break;
        case '6': this.form.descrip_causa = 'EVENTO CATASTROFIC'; break;
        case '7': this.form.descrip_causa = 'LESION AGRESION'; break;
        case '8': this.form.descrip_causa = 'LESION AUTO INFLIG'; break;
        case '9': this.form.descrip_causa = 'SOSP. MALTRATO FIS'; break;
        case '10': this.form.descrip_causa = 'SOSP. ABUSO SEXUAL'; break;
        case '11': this.form.descrip_causa = 'SOSP. VIOLENCIA SEX'; break;
        case '12': this.form.descrip_causa = 'SOSP. MALTRATO EMOC'; break;
        case '13': this.form.descrip_causa = 'ENFERMEDAD GENERAL'; break;
        case '14': this.form.descrip_causa = 'ENFERMEDAD PROFES.'; break;
        case '15': this.form.descrip_causa = 'OTRA CAUSA'; break;
        default: this.form.descrip_causa = ''; break;
      }

      switch (this.hcprc.rips.tipo_diag) {
        case '1': this.form.descrip_tipo_diag = 'IMPRESION DIAGNOSTICA'; break;
        case '2': this.form.descrip_tipo_diag = 'CONFIRMADO NUEVO'; break;
        case '3': this.form.descrip_tipo_diag = 'CONFIRMADO REPETIDO'; break;
        default: this.form.descrip_tipo_diag = ''; break;
      }

      switch (this.hcprc.rips.finalid) {
        case '0': this.form.descrip_finalid = ''; break;
        case '1': this.form.descrip_finalid = 'ATENCION PARTO'; break;
        case '2': this.form.descrip_finalid = 'ATENCION REC.NACID'; break;
        case '3': this.form.descrip_finalid = 'ATENC. PLANIF. FAMILIAR'; break;
        case '4': this.form.descrip_finalid = 'DET. ALT CRECIM < 10'; break;
        case '5': this.form.descrip_finalid = 'DET. ALT. DESA. JOVEN'; break;
        case '6': this.form.descrip_finalid = 'DET. ALT. EMBARAZO'; break;
        case '7': this.form.descrip_finalid = 'DET. ALT. ADULTO'; break;
        case '8': this.form.descrip_finalid = 'DET. ALT AGUD. VISUA'; break;
        case '9': this.form.descrip_finalid = 'DET. ENFERM. PROFES.'; break;
        case '10': this.form.descrip_finalid = 'NO APLICA'; break;
        case '11': this.form.descrip_finalid = 'PATOLOGIA CRONICA'; break;
        default: this.form.descrip_finalid = ''; break;
      }

      var tipo = this.dato_8031.tipo;
      // var tipo = '1';

      if (tipo == '1') {
        this.hcprc.rips.primera_vez = 'S';
      } else {
        this.hcprc.rips.primera_vez = 'N';
      }

      if (tipo == '1') {
        this.hcprc.planific = this.dato_8031.asesoria_eleccion.metodo_eleg;
      } else {
        if (this.dato_8031.control.continua_metodo == 'S') {
          this.hcprc.planific = this.dato_8031.control.metodo_ant;
        } else {
          this.hcprc.planific = this.dato_8031.control.nuevo_metodo;
        }
      }

      switch (this.hcprc.planific) {
        case '1': this.form.descrip_planific = 'DIU'; break;
        case '2': this.form.descrip_planific = 'ORAL'; break;
        case '3': this.form.descrip_planific = 'BARRERA'; break;
        case '4': this.form.descrip_planific = 'OTRO'; break;
        case '5': this.form.descrip_planific = 'NINGUNO'; break;
        case '6': this.form.descrip_planific = 'DIU + BARRERA'; break;
        case '7': this.form.descrip_planific = 'IMPLE. SUBDERMICO'; break;
        case '8': this.form.descrip_planific = 'I. SUBDERM + BARRERA'; break;
        case '9': this.form.descrip_planific = 'ORAL + BARRERA'; break;
        case 'A': this.form.descrip_planific = 'INYECTABLE MENSUAL'; break;
        case 'B': this.form.descrip_planific = 'INYECTABLE + BARRERA'; break;
        case 'C': this.form.descrip_planific = 'INYECTABLE TRIMEST'; break;
        case 'D': this.form.descrip_planific = 'TRIMESTRAL + BARRERA'; break;
        case 'E': this.form.descrip_planific = 'EMERGENCIA'; break;
        case 'F': this.form.descrip_planific = 'EMERGENCIA + BARRERA'; break;
        case 'G': this.form.descrip_planific = 'ESTERILIZACION'; break;
        case 'H': this.form.descrip_planific = 'ESTERILIZACION + BARRERA'; break;
        case 'I': this.form.descrip_planific = 'NO USA X TRADICION'; break;
        case 'J': this.form.descrip_planific = 'NO USA X SALUD'; break;
        case 'K': this.form.descrip_planific = 'NO USA X NEGACION'; break;
        case 'L': this.form.descrip_planific = 'COITUS INTERRUPTUS'; break;
        case 'M': this.form.descrip_planific = 'METODO DEL RITMO'; break;
        default: this.form.descrip_planific = ''; break;
      }

      switch (this.hcprc.rips.estado_sal) {
        case '1': this.form.descrip_estado_sal = 'VIVO (A)'; break;
        case '2': this.form.descrip_estado_sal = 'MUERTO (A)'; break;
        case '3': this.form.descrip_estado_sal = 'REMITIDO'; break;
        case '4': this.form.descrip_estado_sal = 'HOSPITALIZAD'; break;
        case '5': this.form.descrip_estado_sal = 'OBSERVACION'; break;
        default: this.form.descrip_estado_sal = ''; break;
      }

      let busqEnf = this._enfermedades.find(e => e.COD_ENF == this.hcprc.cierre.diag_muer);
      if (busqEnf != undefined) {
        this.form.descrip_diag_muer = busqEnf.DESCRIP;
      } else {
        this.form.descrip_diag_muer = '';
      }
      scrollProsoft("actualizacion_rips", "smooth", "end");
      this.aceptarCausa();
    },

    aceptarCausa() {
      if (this.hcprc.serv == 08) {
        if (this.nit_usu == 830511298 || this.hcprc.rips.causa == 00 || (this.hcprc.rips.finalid >= 0 && this.hcprc.rips.finalid <= 09)) {
          this.hcprc.rips.causa = 15
        }
      }

      setTimeout(() => { this.SER828() }, 200);
    },

    SER828() {
      POPUP({
        array: this.array_causa,
        titulo: "CAUSA EXTERNA",
        indices: [{ id: "COD", label: "DESCRIP" }],
        seleccion: this.hcprc.rips.causa,
        callback_f: () => {
          this.datoPlan()
        },
      },
        (data) => {
          this.hcprc.rips.causa = data.COD;
          this.form.descrip_causa = data.DESCRIP;

          if (["T781", "T782", "T783", "T784", "T788", "T789", "T803"].find(el => el == this.hcprc.rips.tabla_diagn[0].cod_diagn)) {
            this.datoTipoDiag()
          } else {
            var diagn1 = this.hcprc.rips.tabla_diagn[0].cod_diagn.substring(0, 1)
            if (this.hcprc.rips.causa == 13 || this.hcprc.rips.causa == 15 && (diagn1 == 'S' || diagn1 == 'T')) {
              CON851('7E', '7E', null, 'error', 'Error')
              this.aceptarCausa()
            } else {
              this.datoTipoDiag()
            }
          }
        }
      );
    },

    datoTipoDiag() {
      setTimeout(() => { this.SER827() }, 200);
    },

    SER827() {
      POPUP({
        array: this.array_tipo_diag,
        titulo: "TIPO DE DIAGNOSTICO",
        indices: [{ id: "COD", label: "DESCRIP" }],
        seleccion: this.hcprc.rips.tipo_diag,
        callback_f: () => {
          this.aceptarCausa()
        },
      },
        (data) => {
          this.hcprc.rips.tipo_diag = data.COD;
          this.form.descrip_tipo_diag = data.DESCRIP;

          if (['K359', "K350", "K351", "K37X"].find(el => el == this.hcprc.rips.tabla_diagn[0].cod_diagn) || ['K359', "K350", "K351", "K37X"].find(el => el == this.hcprc.rips.tabla_diagn[1].cod_diagn) || ['K359', "K350", "K351", "K37X"].find(el => el == this.hcprc.rips.tabla_diagn[2].cod_diagn) || ['K359', "K350", "K351", "K37X"].find(el => el == this.hcprc.rips.tabla_diagn[3].cod_diagn) || ['K359', "K350", "K351", "K37X"].find(el => el == this.hcprc.rips.tabla_diagn[4].cod_diagn)) {
            if (this.hcprc.rips.tipo_diag == 2) {
              CON851('EF', 'EF', null, 'error', 'Error')
            }
          }

          this.datoFechaProxCita('1');

        }
      );
    },

    datoFechaProxCita(orden) {
      if (this.hcprc.serv == 08) {
        validarInputs({
          form: "#fecha_prox_cita",
          orden: orden
        },
          () => {
            this.datoTipoDiag()
          },
          () => {
            this.form.ano_prox_cita = cerosIzq(this.form.ano_prox_cita, 4)
            this.form.mes_prox_cita = cerosIzq(this.form.mes_prox_cita, 2)
            this.form.dia_prox_cita = cerosIzq(this.form.dia_prox_cita, 2)
            this.hcprc.fecha_prox_cita = this.form.ano_prox_cita.toString() + this.form.mes_prox_cita.toString() + this.form.dia_prox_cita.toString()

            if (this.form.ano_prox_cita < 1) {
              this.form.ano_prox_cita = 0
              this.form.mes_prox_cita = 0
              this.form.dia_prox_cita = 0
              this.hcprc.fecha_prox_cita = '00000000'
              this.datoFechaPrimeraVez()
            } else if (this.form.ano_prox_cita < parseFloat(this.fecha_act.substring(0, 4)) || (this.form.ano_prox_cita > parseFloat(this.fecha_act.substring(0, 4)) + 1) || this.hcprc.fecha_prox_cita < parseFloat(this.fecha_act)) {
              CON851('37', '37', null, 'error', 'error')
              this.datoFechaProxCita('1')
            } else if (this.form.mes_prox_cita < 1 || this.form.mes_prox_cita > 12) {
              CON851('03', '03', null, 'error', 'error')
              this.datoFechaProxCita('2')
            } else if (this.form.dia_prox_cita < 1 || this.form.dia_prox_cita > 31) {
              CON851('37', '37', null, 'error', 'error')
              this.datoFechaProxCita('3')
            } else {
              this.datoFechaPrimeraVez()
            }
          }
        )
      } else {
        this.hcprc.fecha_prox_cita == '00000000'
        this.datoFechaPrimeraVez()
      }
    },

    datoFechaPrimeraVez(orden) {
      if (this.hcprc.rips.primera_vez == 'N') {
        validarInputs({
          form: "#fecha_primeraVez",
          orden: orden
        },
          () => {
            this.datoFechaProxCita('1');
          },
          () => {
            this.form.ano_primeraVez = cerosIzq(this.form.ano_primeraVez, 4)
            this.form.mes_primeraVez = cerosIzq(this.form.mes_primeraVez, 2)
            this.form.dia_primeraVez = cerosIzq(this.form.dia_primeraVez, 2)
            this.hcprc.fecha_1ra_vez = this.form.ano_primeraVez.toString() + this.form.mes_primeraVez.toString() + this.form.dia_primeraVez.toString()

            if (this.form.ano_primeraVez < 1) {
              this.form.ano_primeraVez = 0
              this.form.mes_primeraVez = 0
              this.form.dia_primeraVez = 0
              this.hcprc.fecha_1ra_vez = '00000000'
              this.datoSalida()
            } else if (this.form.ano_primeraVez > parseFloat(this.fecha_act.substring(0, 4)) || this.hcprc.fecha_1ra_vez > parseFloat(this.fecha_act)) {
              CON851('37', '37', null, 'error', 'error')
              this.datoFechaPrimeraVez('1')
            } else if (this.form.mes_primeraVez < 1 || this.form.mes_primeraVez > 12) {
              CON851('03', '03', null, 'error', 'error')
              this.datoFechaPrimeraVez('2')
            } else if (this.form.dia_primeraVez < 1 || this.form.dia_primeraVez > 31) {
              CON851('37', '37', null, 'error', 'error')
              this.datoFechaPrimeraVez('3')
            } else {
              this.datoSalida()
            }
          }
        )
      } else {
        this.hcprc.fecha_1ra_vez == '00000000'
        this.datoSalida()
      }
    },

    datoSalida() {
      this.SER831()
    },

    SER831() {
      POPUP({
        array: this.array_salida,
        titulo: "ESTADO SALIDA",
        indices: [{ id: "COD", label: "DESCRIP" }],
        seleccion: this.hcprc.rips.estado_sal,
        callback_f: () => {
          this.datoFechaProxCita('1');
        },
      },
        (data) => {
          this.hcprc.rips.estado_sal = data.COD
          this.form.descrip_estado_sal = data.DESCRIP

          if (this.hcprc.serv == 02 || this.hcprc.serv == 08) {
            if (this.hcprc.rips.estado_sal == 4) {
              this.hcprc.cierre.unserv = 03
            } else if (this.hcprc.rips.estado_sal == 5) {
              this.hcprc.cierre.unserv = 05
            }
          }

          if (this.hcprc.rips.estado_sal == 6) {
            if (this.hcprc.rips.tabla_diagn[0].cod_diagn == 'Z538') {
              this.datoRemitido()
            } else {
              this.datoSalida()
            }
          } else {
            this.datoRemitido()
          }
        }
      );
    },

    datoRemitido() {
      if (this.hcprc.rips.estado_sal == 3) {
        validarInputs({
          form: '#remitido'
        }, () => {
          this.datoSalida()
        }, () => {
          if (this.hcprc.rips.remitido.trim() == '') {
            CON851('03', '03', null, 'error', 'Error')
            this.datoRemitido()
          } else {
            this.aceptarDiagnMuerte()
          }
        })
      } else {
        this.hcprc.rips.remitido = ''
        this.aceptarDiagnMuerte()
      }
    },

    aceptarDiagnMuerte() {
      if (this.hcprc.rips.estado_sal == 2) {
        validarInputs({
          form: '#diag_muer'
        }, () => {
          this.datoSalida()
        }, async () => {
          let busqEnf = this._enfermedades.find(e => e.COD_ENF == this.hcprc.cierre.diag_muer)
          if (busqEnf) {
            await this.editarEdad(busqEnf)

            if (busqEnf.SEXO_ENF.trim() != '' && busqEnf.SEXO_ENF != $_REG_PACI.SEXO) {
              CON851('73', '73', null, 'error', 'error')
              this.aceptarDiagnMuerte()
            } else if (busqEnf.EDAD_MIN_ENF > 0 && parseFloat(this.edad_hc_w) < parseFloat(this.edadMinW)) {
              CON851('74', '74', null, 'error', 'error')
              this.aceptarDiagnMuerte()
            } else if (busqEnf.EDAD_MAX_ENF > 0 && parseFloat(this.edad_hc_w) > parseFloat(this.edadMaxW)) {
              CON851('74', '74', null, 'error', 'error')
              this.aceptarDiagnMuerte()
            } else if (this.hcprc.cierre.diag_muer.substring(3, 4) == 'X') {
              SolicitarDll({ datosh: datosEnvio() + this.hcprc.cierre.diag_muer }, dato => {
                var date = dato.split("|");
                var swinvalid = date[0];
                if (swinvalid == '00') {
                  this.confirmar();
                } else if (swinvalid == '93') {
                  this.aceptarDiagnMuerte();
                }
              }, get_url('APP/SALUD/SER851A.DLL'));
            } else {
              this.confirmar();
            }
          } else {
            CON851('01', '01', null, 'error', 'error')
            this.aceptarDiagnMuerte()
          }
        })
      } else {
        this.hcprc.cierre.diag_muer = ''
        this.confirmar()
      }
    },

    confirmar() {
      CON851P(
        "01",
        () => {
          this.pantalla_07_rips();
        },
        () => {
          this.continuar();
        }
      );
    },

    async continuar() {
      if (this.hcprc.serv > 02 && this.hcprc.serv != 08) {
        this.hcprc.cierre.estado = 1
      } else {
        if (this.nit_usu == 845000038) {
          if (this.hcprc.serv == 02 && this.hcprc.rips.estado_sal == 4) {
            this.hcprc.cierre.estado = 1
          } else {
            this.hcprc.cierre.estado = 2
            this.hcprc.cierre.egreso = this.fecha_act
            this.hcprc.cierre.hora_egres = moment().format('HHmm')
          }
        } else {
          this.hcprc.cierre.estado = 2
          this.hcprc.cierre.egreso = this.fecha_act
        }
      }

      if (this.hcprc.cierre.estado == 2) {
        // LIBERAR CAMA
      }

      this.hcprc.cierre.temporal = 0
      this.hcprc.cierre.clase = 0

      if ($_REG_HC.edad_hc.unid_edad == 'A' && $_REG_HC.edad_hc.vlr_edad > 18) {

      } else {
        if (this.hcprc.cierre.unserv == '08') {
          this.grabarSisvan();
        }
      }

      // ACTUALIZAR SISVAN MATERNAS
      if ((this.hcprc.rips.embarazo == '1' || this.hcprc.rips.embarazo == '2' || this.hcprc.rips.embarazo == '3') && parseFloat(this.hcprc.signos.imc_corp) > 0) {
        this.grabarSisvanMaternas();
      }

      await this.grabar()
      this.actualizarRipsFactura()
    },

    grabarSisvanMaternas() {
      var data = {};
      var edad_gest;
      if (this.dato_4040.obstetric_esq_w.edad_gest_ultra_esq_w > 0) {
        edad_gest = this.dato_4040.obstetric_esq_w.edad_gest_ultra_esq_w;
      } else {
        edad_gest = this.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w;
      }

      data['datosh'] = datosEnvio() + $_REG_PACI['COD'] + '|';

      data['operador'] = localStorage.Usuario;
      data['fecha'] = this.hcprc.fecha;
      data['gesta_prev'] = this.dato_4040.gineco_esq_w.gestaciones_esq_w;
      data['edad_gesta'] = edad_gest;
      data['peso'] = this.hcprc.signos.peso;
      data['talla'] = this.hcprc.signos.talla;
      data['imc'] = this.hcprc.signos.imc_corp;
      data['embarazo'] = this.hcprc.rips.embarazo;
      data['fur'] = this.dato_4040.gineco_esq_w.fecha_regla_esq_w;
      data['alt_uter'] = this.hcprc.signos.alt_uter;
      data['est_nut'] = this.hcprc.signos.est_nutri;
      data['tens_media'] = this.hcprc.signos.tens_media;
      data['hemoglob'] = this.dato_4040.gineco_esq_w.hemoglob_esq_w;
      data['toma_calcio'] = this.dato_4040.gineco_esq_w.toma_calcio_esq_w;
      data['toma_hierro'] = this.dato_4040.gineco_esq_w.toma_hierro_esq_w;
      data['toma_acidof'] = this.dato_4040.gineco_esq_w.toma_acidof_esq_w;

      console.log(data);

      postData(data, get_url("APP/SALUD/SER134M.DLL"))
        .then((data) => {
          console.log('grabo sisvan maternas correctamente');
        })
        .catch(error => {
          console.error(error)
          console.log('error al grabar sisvan maternas')
        });
    },

    async grabarSisvan() {
      var data = {}
      data['fecha'] = this.hcprc.fecha;

      var edad_dias = SC_DIAS($_REG_PACI.NACIM, this.hcprc.fecha);
      var edad_meses = parseInt(edad_dias) / 30.42;

      data['edad_meses'] = edad_meses.toString().substring(0, 3);
      data['peso'] = this.hcprc.signos.peso;
      data['talla'] = this.hcprc.signos.talla;
      data['per_cef'] = this.hcprc.signos.per_cef;
      data['imc'] = this.hcprc.signos.imc_corp;

      data['est_peso'] = '0';
      data['est_talla'] = '0';
      data['peso_tal_estad'] = '0';
      data['per_cef_estad'] = '0';
      data['est_imc'] = '0';
      data['finalidad'] = this.hcprc.rips.finalid;
      data['operador'] = localStorage.Usuario;

      var diag = {};
      diag['cod_diagn'] = this.hcprc.rips.tabla_diagn;
      var diagnos = _getObjetoSaveHc(diag, ['cod_diagn']);
      data = {
        ...data,
        ...diagnos
      }
      data['datosh'] = datosEnvio() + $_REG_PACI['COD'] + '|';

      console.log(data);

      postData(data, get_url("APP/SALUD/SER134X.DLL"))
        .then((data) => {
          console.log('grabo sisvan correctamente');
        })
        .catch(error => {
          console.error(error)
          console.log('error al grabar sisvan')
        });
    },

    actualizarRipsFactura() {
      var data = {}
      data['datosh'] = datosEnvio() + this.nro_ult_comp + '|'
      data['paso'] = '1'

      postData(data, get_url("APP/SALUD/SER448C.DLL"))
        .then((data) => {
          console.log(data)
          this.marcarCita()
        })
        .catch(error => {
          console.error(error)
          this.marcarCita()
        });
    },

    marcarCita() {
      postData({ datosh: datosEnvio() + this.fecha_act + '|' + localStorage.IDUSU + '|' + $_REG_PACI.COD + '|' }, get_url("APP/HICLIN/HC-101.DLL"))
        .then(this.llamarFormulacion)
        .catch((err) => {
          console.error(err)
          setTimeout(() => {
            this.llamarFormulacion()
          }, 300);
        });
    },

    llamarFormulacion() {
      $_REG_HC.fecha_lnk = this.fecha_act;
      $_REG_HC.hora_lnk = this.hora_act;
      $_REG_HC.oper_lnk = localStorage.Usuario;
      $_REG_HC.opc_llamado = "1";
      $("#body_main").load("../../HICLIN/paginas/HC002F.html");
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

    async grabar_detalle_2035() {
      grabarDetallesText(this.detalle_2035.alergias, $_REG_HC.llave_hc + '2035');
    },

    async grabar_detalle_4005() {
      var examenf = this.form.examenFisico.replace(/(\r\n|\n|\r)/gm, "&");
      grabarDetallesText(examenf, $_REG_HC.llave_hc + '4005');
    },

    async grabar() {
      console.log('LLEGA A GRABAR')

      var datos = _getObjetoSaveHc(this.hcprc, filtroArray.tablasHC)

      postData(datos, get_url("APP/HICLIN/SAVE_HC_2.DLL"))
        .then((data) => {
          console.log(data, 'GUARDA')
        })
        .catch((error) => {
          console.log(error, 'ERROR')
        });

      let detalles = {
        "8031": _getObjetoSaveHc(this.dato_8031, []),
        "4040": _getObjetoSaveHc(this.dato_4040, []),
        "2079": _getObjetoSaveHc(this.dato_2079, []),
      }

      grabarDetalles(detalles, $_REG_HC.llave_hc);
    },

    _ventanaEspecialidades() {
      _ventanaDatos({
        titulo: 'ESPECIALIDADES',
        columnas: ['CODIGO', 'NOMBRE'],
        data: this.especialidades,
        callback_esc: () => {
          document.querySelector('.remitido')
        },
        callback: (data) => {
          $this.dato_8031.control.remitido = data.CODIGO
          setTimeout(() => { _enterInput('.remitido') }, 100);
        }
      })
    },

    async _ventanaDiagnosticos(pos) {
      await _ventanaDatos({
        titulo: "VENTANA DE ENFERMEDADES",
        columnas: ["COD_ENF", "NOMBRE_ENF"],
        data: this._enfermedades,
        callback_esc: function () {
          document.querySelector(`.codDiag_${pos}`).focus();
        },
        callback: async function (data) {
          $this.form.diagnosticos[pos].cod = data['COD_ENF'].trim();
          $this.form.diagnosticos[pos].descrip = data['NOMBRE_ENF'].trim();
          setTimeout(() => { _enterInput(`.codDiag_${pos}`); console.log('sale') }, 200);
        }
      });
    },

    _ventanaDiagnosticosMuerte() {
      _ventanaDatos({
        titulo: "VENTANA DE ENFERMEDADES",
        columnas: ["COD_ENF", "NOMBRE_ENF"],
        data: this._enfermedades,
        callback_esc: function () {
          document.querySelector(`.diag_muer`).focus()
        },
        callback: async function (data) {
          $this.hcprc.cierre.diag_muer = data['COD_ENF'].trim()
          $this.form.descrip_diag_muer = data['NOMBRE_ENF'].trim()
          setTimeout(() => { _enterInput(`.diag_muer`) }, 200)
        }
      })
    },

    _hc861(titulo, seleccion, id = '') {
      let _this = this;
      return new Promise((resolve, reject) => {
        POPUP(
          {
            array: _this.array_respuesta,
            titulo: `${titulo} ?`,
            indices: [{ id: "COD", label: "DESCRIP" }],
            seleccion,
            teclaAlterna: true,
            id_input: id,
            callback_f: reject,
          },
          (data) => {
            setTimeout(resolve(data.COD), 300);
          }
        );
      });
    },

    async parentescoAntec(select, escape, siguiente, id = '') {
      POPUP({
        array: this.array_parentesco,
        titulo: "Parentesco",
        indices: [{ id: "COD", label: "DESCRIP" }],
        seleccion: this.dato_8031.dato_fam[select],
        teclaAlterna: true,
        id_input: id,
        callback_f: () => {
          this[escape]()
        },
      },
        async (data) => {
          this.dato_8031.dato_fam[select] = data.DESCRIP;
          setTimeout(() => { this[siguiente]() }, 200);
          // this[siguiente]()
        }
      )
    },

    embarazo_HC8031() {
      POPUP({
        array: this.embarazo,
        titulo: "Embarazo",
        indices: [{ id: "COD", label: "DESCRIP" }],
        seleccion: this.hcprc.rips.embarazo,
        callback_f: () => {
          _regresar_menuhis();
        },
      },
        async (data) => {
          this.hcprc.rips.embarazo = data.COD;
          this.validarAcompañante();
        }
      )
    },

    ciclos_HC8031() {
      POPUP({
        array: this.ciclos,
        titulo: "Ciclos",
        indices: [{ id: "COD", label: "DESCRIP" }],
        seleccion: this.dato_4040.gineco_esq_w.ciclos_esq_w,
        teclaAlterna: true,
        id_input: '#ciclos_esq',
        callback_f: () => {
          this.datoDismenorrea_4040();
        },
      },
        async (data) => {
          this.dato_4040.gineco_esq_w.ciclos_esq_w = data.COD;
          this.form.descripCiclo = data.DESCRIP;
          this.datoIrregular_4040();
        }
      )
    },

    resultCitol_HC8031() {
      POPUP({
        array: this.resul_citol,
        titulo: "Resultado",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_4040.gineco_esq_w.result_citol_esq_w,
        teclaAlterna: true,
        id_input: '#fecha_citol_esq',
        callback_f: () => {
          this.datoAnoCitol_4040();
        },
      },
        async (data) => {
          this.dato_4040.gineco_esq_w.result_citol_esq_w = data.cod;
          this.form.descripResultCitol = data.descrip;

          if (data.cod == '1' || data.cod == '3' || data.cod == '4') {
            this.dato_4040.gineco_esq_w.citol_anormal_esq_w = '';
            this.ventanaCirug_4040();
          } else {
            this.datoAnorCitol_4040();
          }
        }
      )
    },

    resultPruebaEmbar_HC8031() {
      POPUP({
        array: this.prueba_embar,
        titulo: "Resultado",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_4040.gineco_esq_w.prueba_embarazo_esq_w,
        teclaAlterna: true,
        id_input: '#prueba_embarazo_esq',
        callback_f: () => {
          this.ventanaCirug_4040();
        },
      },
        async (data) => {
          this.dato_4040.gineco_esq_w.prueba_embarazo_esq_w = data.cod;
          this.form.descripPrueEmba = data.descrip;

          if (data.cod == '3') {
            this.datoFrotisFlujo_4040();
          } else {
            this.datoAnoPrueEmbar_4040();
          }
        }
      )
    },

    embarMetod_HC8031() {
      POPUP({
        array: this.embarMetod,
        titulo: "Embarazo con uso de metodos anticonceptivos",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.emb_otros_metodos,
        teclaAlterna: true,
        id_input: '#descripMetod',
        callback_f: () => {
          setTimeout(() => { this.datoFrotisFlujo_4040(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.emb_otros_metodos = data.cod;
          this.form.descripMetod = data.descrip;

          if (data.cod == '1') {
            this.datoCualMetodEmba();
          } else {
            this.datoDiuConoce();
          }
        }
      )
    },

    cualEmbarMetod_HC8031() {
      POPUP({
        array: this.cualEmbarMetod,
        titulo: "Metodo de planificacion",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.cual_emb_metodo,
        teclaAlterna: true,
        id_input: '#descripCualMetod',
        callback_f: () => {
          this.datoEmbaMetod();
        },
      },
        async (data) => {
          this.dato_2079.cual_emb_metodo = data.cod;
          this.form.descripCualMetod = data.descrip;

          if ($_REG_PACI.SEXO == 'M') {
            if (data.cod == '3' || data.cod == '4' || data.cod == '5' || data.cod == 'G' || data.cod == 'H' || data.cod == 'I' || data.cod == 'J' || data.cod == 'K' || data.cod == 'L') {
              // continue
              this.datoDiuConoce();
            } else {
              CON851('73', '73', null, 'error', 'error')
              this.datoCualMetodEmba();
            }
          } else {
            this.datoDiuConoce();
          }
        }
      )
    },

    cualEmbarMetod_HC8031_2() {
      POPUP({
        array: this.cualEmbarMetod,
        titulo: "Metodo de planificacion",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_8031.asesoria_eleccion.metodo_eleg,
        teclaAlterna: true,
        id_input: '#metodo_eleg',
        callback_f: () => {
          scrollProsoft("signos_hc8031", "smooth", "end");
          this.datoExamen();
        },
      },
        async (data) => {
          this.dato_8031.asesoria_eleccion.metodo_eleg = data.cod;
          this.form.descripMetodo_eleg = data.descrip;

          if ($_REG_PACI.SEXO == 'M') {
            if (data.cod == '3' || data.cod == '4' || data.cod == '5' || data.cod == 'G' || data.cod == 'H' || data.cod == 'I' || data.cod == 'J' || data.cod == 'K' || data.cod == 'L') {
              // continue
              this.datoEduPrev();
            } else {
              CON851('73', '73', null, 'error', 'error')
              this.datoMetodoEleg();
            }
          } else {
            // continue
            this.datoEduPrev();
          }
        }
      )
    },

    cualEmbarMetod_HC8031_3() {
      POPUP({
        array: this.cualEmbarMetod,
        titulo: "Metodo de planificacion",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_8031.control.nuevo_metodo,
        teclaAlterna: true,
        id_input: '#descripNuevo_metodo',
        callback_f: () => {
          this.datoContinuaMetodo();
        },
      },
        async (data) => {
          this.dato_8031.control.nuevo_metodo = data.cod;
          this.form.descripNuevo_metodo = data.descrip;

          if ($_REG_PACI.SEXO == 'M') {
            if (data.cod == '3' || data.cod == '4' || data.cod == '5' || data.cod == 'G' || data.cod == 'H' || data.cod == 'I' || data.cod == 'J' || data.cod == 'K' || data.cod == 'L') {
              // continue
              this.datoAnoCambio();
            } else {
              CON851('73', '73', null, 'error', 'error')
              this.datoNuevoMetodo();
            }
          } else {
            // continue
            this.datoAnoCambio();
          }
        }
      )
    },

    diuIndicPor_HC8031() {
      POPUP({
        array: this.indicPor,
        titulo: "Indicado por",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.diu.diu_indic,
        teclaAlterna: true,
        id_input: '#diu_indic',
        callback_f: () => {
          setTimeout(() => { this.datoDiuUsoAct(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.diu.diu_indic = data.cod;
          this.form.descripIndicDiu = data.descrip;
          setTimeout(() => { this.datoOralConoce(); }, 300);
        }
      )
    },

    oralIndicPor_HC8031() {
      POPUP({
        array: this.indicPor,
        titulo: "Indicado por",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.oral.oral_indic,
        teclaAlterna: true,
        id_input: '#oral_indic',
        callback_f: () => {
          setTimeout(() => { this.datoOralUsoAct(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.oral.oral_indic = data.cod;
          this.form.descripIndicOral = data.descrip;
          setTimeout(() => { this.datoBarreraConoce(); }, 300);
        }
      )
    },

    barrIndicPor_HC8031() {
      POPUP({
        array: this.indicPor,
        titulo: "Indicado por",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.barr.barr_indic,
        teclaAlterna: true,
        id_input: '#barr_indic',
        callback_f: () => {
          setTimeout(() => { this.datoBarrUsoAct(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.barr.barr_indic = data.cod;
          this.form.descripIndicBarr = data.descrip;
          setTimeout(() => { this.datoDiuBarrConoce(); }, 300);
        }
      )
    },

    diuBarrIndicPor_HC8031() {
      POPUP({
        array: this.indicPor,
        titulo: "Indicado por",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.diu_barr.diu_barr_indic,
        teclaAlterna: true,
        id_input: '#diu_barr_indic',
        callback_f: () => {
          setTimeout(() => { this.datoDiuBarrUsoAct(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.diu_barr.diu_barr_indic = data.cod;
          this.form.descripIndicDiuBarr = data.descrip;
          setTimeout(() => { this.datoImplSdConoce(); }, 300);
        }
      )
    },

    implSdIndicPor_HC8031() {
      POPUP({
        array: this.indicPor,
        titulo: "Indicado por",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.impl_sd.impl_sd_indic,
        teclaAlterna: true,
        id_input: '#impl_sd_indic',
        callback_f: () => {
          setTimeout(() => { this.datoImplSdUsoAct(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.impl_sd.impl_sd_indic = data.cod;
          this.form.descripIndicImplSd = data.descrip;
          setTimeout(() => { this.datoSdBarrConoce(); }, 300);
        }
      )
    },

    sdBarrIndicPor_HC8031() {
      POPUP({
        array: this.indicPor,
        titulo: "Indicado por",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.sd_barr.sd_barr_indic,
        teclaAlterna: true,
        id_input: '#sd_barr_indic',
        callback_f: () => {
          setTimeout(() => { this.datoSdBarrUsoAct(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.sd_barr.sd_barr_indic = data.cod;
          this.form.descripIndicSdBarr = data.descrip;
          setTimeout(() => { this.datoOralBarrConoce(); }, 300);
        }
      )
    },

    oralBarrIndicPor_HC8031() {
      POPUP({
        array: this.indicPor,
        titulo: "Indicado por",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.oral_barr.oral_barr_indic,
        teclaAlterna: true,
        id_input: '#oral_barr_indic',
        callback_f: () => {
          setTimeout(() => { this.datoOralBarrUsoAct(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.oral_barr.oral_barr_indic = data.cod;
          this.form.descripIndicOralBarr = data.descrip;
          setTimeout(() => { this.datoInyectMensConoce(); }, 300);
        }
      )
    },

    inyectMensIndicPor_HC8031() {
      POPUP({
        array: this.indicPor,
        titulo: "Indicado por",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.inyec_men.inyec_men_indic,
        teclaAlterna: true,
        id_input: '#inyec_men_indic',
        callback_f: () => {
          setTimeout(() => { this.datoInyectMensUsoAct(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.inyec_men.inyec_men_indic = data.cod;
          this.form.descripIndicInyectMen = data.descrip;
          setTimeout(() => { this.datoMensBarrConoce(); }, 300);
        }
      )
    },

    mensBarrIndicPor_HC8031() {
      POPUP({
        array: this.indicPor,
        titulo: "Indicado por",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.men_barr.men_barr_indic,
        teclaAlterna: true,
        id_input: '#men_barr_indic',
        callback_f: () => {
          setTimeout(() => { this.datoMensBarrUsoAct(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.men_barr.men_barr_indic = data.cod;
          this.form.descripIndicInyectBarr = data.descrip;
          setTimeout(() => { this.datoInyectTrimConoce(); }, 300);
        }
      )
    },

    inyectTrimIndicPor_HC8031() {
      POPUP({
        array: this.indicPor,
        titulo: "Indicado por",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.inyec_tri.inyec_tri_indic,
        teclaAlterna: true,
        id_input: '#inyec_tri_indic',
        callback_f: () => {
          setTimeout(() => { this.datoInyectTrimUsoAct(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.inyec_tri.inyec_tri_indic = data.cod;
          this.form.descripIndicInyectTrim = data.descrip;
          setTimeout(() => { this.datoTrimBarrConoce(); }, 300);
        }
      )
    },

    trimBarrIndicPor_HC8031() {
      POPUP({
        array: this.indicPor,
        titulo: "Indicado por",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.tri_barr.tri_barr_indic,
        teclaAlterna: true,
        id_input: '#tri_barr_indic',
        callback_f: () => {
          setTimeout(() => { this.datoTrimBarrUsoAct(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.tri_barr.tri_barr_indic = data.cod;
          this.form.descripIndicTrimBarr = data.descrip;
          setTimeout(() => { this.datoEmergConoce(); }, 300);
        }
      )
    },

    emergIndicPor_HC8031() {
      POPUP({
        array: this.indicPor,
        titulo: "Indicado por",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.emerg.emerg_indic,
        teclaAlterna: true,
        id_input: '#emerg_indic',
        callback_f: () => {
          setTimeout(() => { this.datoEmergUsoAct(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.emerg.emerg_indic = data.cod;
          this.form.descripIndicEmer = data.descrip;
          setTimeout(() => { this.datoEmerBarrConoce(); }, 300);
        }
      )
    },

    emerBarrIndicPor_HC8031() {
      POPUP({
        array: this.indicPor,
        titulo: "Indicado por",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.emerg_barr.emerg_barr_indic,
        teclaAlterna: true,
        id_input: '#emerg_barr_indic',
        callback_f: () => {
          setTimeout(() => { this.datoEmerBarrUsoAct(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.emerg_barr.emerg_barr_indic = data.cod;
          this.form.descripIndicEmerBarr = data.descrip;
          setTimeout(() => { this.datoEsterConoce(); }, 300);
        }
      )
    },

    esterIndicPor_HC8031() {
      POPUP({
        array: this.indicPor,
        titulo: "Indicado por",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.ester.ester_indic,
        teclaAlterna: true,
        id_input: '#ester_indic',
        callback_f: () => {
          setTimeout(() => { this.datoEsterUsoAct(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.ester.ester_indic = data.cod;
          this.form.descripIndicEste = data.descrip;
          setTimeout(() => { this.datoEsteBarrConoce(); }, 300);
        }
      )
    },

    esteBarrIndicPor_HC8031() {
      POPUP({
        array: this.indicPor,
        titulo: "Indicado por",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.ester_barr.ester_barr_indic,
        teclaAlterna: true,
        id_input: '#ester_barr_indic',
        callback_f: () => {
          setTimeout(() => { this.datoEsteBarrUsoAct(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.ester_barr.ester_barr_indic = data.cod;
          this.form.descripIndicEsteBarr = data.descrip;
          setTimeout(() => { this.datoCoitInteConoce(); }, 300);
        }
      )
    },

    coitIntIndicPor_HC8031() {
      POPUP({
        array: this.indicPor,
        titulo: "Indicado por",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.coi_int.coi_int_indic,
        teclaAlterna: true,
        id_input: '#coi_int_indic',
        callback_f: () => {
          setTimeout(() => { this.datoCoitIntUsoAct(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.coi_int.coi_int_indic = data.cod;
          this.form.descripIndicCoiInt = data.descrip;
          setTimeout(() => { this.datoMetRitmConoce(); }, 300);
        }
      )
    },

    metRitmIndicPor_HC8031() {
      POPUP({
        array: this.indicPor,
        titulo: "Indicado por",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.met_rit.met_rit_indic,
        teclaAlterna: true,
        id_input: '#met_rit_indic',
        callback_f: () => {
          setTimeout(() => { this.datoMetRitmUsoAct(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.met_rit.met_rit_indic = data.cod;
          this.form.descripIndicMetRit = data.descrip;
          setTimeout(() => { this.datoNoUsoAntic(); }, 300);
        }
      )
    },

    noUsoAntic_HC8031() {
      POPUP({
        array: this.noUsaAntic,
        titulo: "Razon no uso",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_2079.no_uso_antic,
        teclaAlterna: true,
        id_input: '#descripNoUsaAntic',
        callback_f: () => {
          setTimeout(() => { this.datoMetRitmConoce(); }, 300);
        },
      },
        async (data) => {
          this.dato_2079.no_uso_antic = data.cod;
          this.form.descripNoUsaAntic = data.descrip;
          setTimeout(() => { this.grabarPag3(); }, 300);
        }
      )
    },

    datoGlasg1Ing() {
      POPUP(
        {
          array: this.array_aper_ocul,
          titulo: "APERTURA OCULAR",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.hcprc.signos.aper_ocul.toString(),
          callback_f: () => this.signosVitalesDatoFr(),
        },
        (data) => {
          this.hcprc.signos.aper_ocul = data.COD;
          setTimeout(() => {
            this.datoGlasg2Ing();
          }, 200);
        }
      );
    },

    datoGlasg2Ing() {
      POPUP(
        {
          array: this.array_resp_verb,
          titulo: "RESPUESTA VERBAL",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.hcprc.signos.resp_verb.toString(),
          callback_f: () => this.datoGlasg1Ing(),
        },
        (data) => {
          this.hcprc.signos.resp_verb = data.COD;
          setTimeout(() => {
            this.datoGlasg3Ing();
          }, 200);
        }
      );
    },

    datoGlasg3Ing() {
      POPUP(
        {
          array: this.array_resp_moto,
          titulo: "RESPUESTA MOTORA",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.hcprc.signos.resp_moto.toString(),
          callback_f: () => this.datoGlasg2Ing(),
        },
        (data) => {
          this.hcprc.signos.resp_moto = data.COD;

          this.hcprc.signos.vlr_glasg =
            parseInt(this.hcprc.signos.aper_ocul) +
            parseInt(this.hcprc.signos.resp_verb) +
            parseInt(this.hcprc.signos.resp_moto);
          this.hcprc.signos.vlr_glasg = this.hcprc.signos.vlr_glasg.toString();
          setTimeout(() => {
            this.signosVitalesDatoPvc();
          }, 200);
        }
      );
    },

    async signosVitales_8031(select, escape, siguiente, titulo, descrip, id = "") {
      POPUP({
        array: this.signosVitales,
        titulo: titulo,
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_8031.signos_vitales[select],
        teclaAlterna: true,
        id_input: id,
        callback_f: () => {
          setTimeout(() => {
            this[escape]()
          }, 200);
        },
      },
        async (data) => {
          this.dato_8031.signos_vitales[select] = data.cod;
          this.form[descrip] = data.descrip;
          setTimeout(() => {
            this[siguiente]()
          }, 200);
        }
      )
    },

    expulsionMetodo_HC8031(select, escape, siguiente, titulo, descrip, id = '') {
      POPUP({
        array: this.embarMetod,
        titulo: titulo,
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: this.dato_8031.control[select],
        teclaAlterna: true,
        id_input: id,
        callback_f: () => {
          setTimeout(() => {
            this[escape]()
          }, 200);
        },
      },
        async (data) => {
          this.dato_8031.control[select] = data.cod;
          if (data.cod == '3') {
            this.form[descrip] = 'NS';
          } else {
            this.form[descrip] = data.descrip;
          }

          setTimeout(() => {
            this[siguiente]()
          }, 200);
        }
      )
    },

    async cargarHc_HC8031(paso) {
      loader('show');
      await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario.trim() + "|1|" }, get_url("APP/HICLIN/GET_HC.DLL"))
        .then(async (data) => {
          this.hcprc = data
          this.covid19 = this.hcprc.covid19

          if (paso == '1') {
            this.cargarPaisesRips_HC8031();
          } else {
            loader('hide')
          }
        })
        .catch((err) => {
          CON851('', 'Error consultando datos', null, 'error', 'error')
          console.log(err, "err");
          loader('hide');
          _regresar_menuhis();
        });
    },

    async cargarPaisesRips_HC8031() {
      await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER888.DLL"))
        .then((data) => {
          this.params_hc890h.paises = data.PAISESRIPS
          this.params_hc890h.paises.pop()
          this.cargarCiudades_HC8031();
        })
        .catch(error => {
          CON851('', 'Error consultando datos', null, 'error', 'error')
          console.error(error)
          loader('hide')
          _regresar_menuhis();
        });
    },

    async cargarCiudades_HC8031() {
      await postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON809.DLL"))
        .then((data) => {
          this.params_hc890h.ciudades = data.CIUDAD
          this.params_hc890h.ciudades.pop()
          this.cargarDestalles_HC8031();
        })
        .catch(error => {
          CON851('', 'Error consultando datos', null, 'error', 'error')
          console.error(error)
          loader('hide')
          _regresar_menuhis();
        });
    },

    async cargarDestalles_HC8031() {
      await postData({
        // datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + '  ' + '|' + '  ' + '|' + '8001;4040;7501;7503' + '|' + $_REG_HC.serv_hc + '|'
        datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + '  ' + '|' + '  ' + '|' + '8031;2035;4040;2079;4005;7501;7503' + '|' + $_REG_HC.serv_hc + '|'
      }, get_url("app/HICLIN/HCDETAL_PRC.DLL"))
        .then((data) => {
          this.detalles = data["DETHC"]
          this.detalles.pop()
          this.cargarTablasOMS_HC8031();
        })
        .catch((error) => {
          CON851('', 'Error consultando datos', null, 'error', 'error')
          console.log(error)
          loader("hide")
          _regresar_menuhis();
        });
    },

    async cargarTablasOMS_HC8031() {
      await postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/AIE-DESA.DLL"))
        .then((data) => {
          this.tabla_oms = data.TABLAS_OMS
          this.tabla_oms.pop()
          this.traerEspecialidades();
        })
        .catch(error => {
          CON851('', 'Error consultando datos', null, 'error', 'error')
          console.error(error)
          loader('hide')
          _regresar_menuhis();
        });
    },

    async traerEspecialidades() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
        .then((data) => {
          this.especialidades = data.ESPECIALIDADES;
          this.especialidades.pop();
          this.traerEnfermedadesTrans();
        })
        .catch((err) => {
          CON851('', 'Error consultando datos', null, 'error', 'error')
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async traerEnfermedadesTrans() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER753A.DLL"))
        .then((data) => {
          this.enfermedades_trans = data.TRANSMISIBLES
          this.enfermedades_trans.pop()
          this.cargarHistoriaAnterior();
        })
        .catch(error => {
          CON851('', 'Error consultando datos', null, 'error', 'error')
          console.error(error);
          loader('hide');
          _regresar_menuhis();
        });
    },

    async cargarHistoriaAnterior() {
      await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc }, get_url("APP/HICLIN/HC8031-A.DLL"))
        .then((data) => {
          this.dato_8031 = data
          this.cargarDetalle4040Anterior();
        })
        .catch((err) => {
          CON851('', 'Error leyendo datos', null, 'error', 'Error')
          console.log(err)
          _regresar_menuhis();
        });
    },

    async cargarDetalle4040Anterior() {
      await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc }, get_url("APP/HICLIN/HCE4040-A.DLL"))
        .then((data) => {
          this.dato_4040 = data
          this.cargarDetalle2079Anterior();
        })
        .catch((err) => {
          CON851('', 'Error leyendo datos', null, 'error', 'Error')
          console.log(err)
          _regresar_menuhis();
        });
    },

    async cargarDetalle2079Anterior() {
      await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc }, get_url("APP/HICLIN/HCE2079-A.DLL"))
        .then((data) => {
          this.dato_2079 = data
          this.cargarEnfermedades();
        })
        .catch((err) => {
          CON851('', 'Error leyendo datos', null, 'error', 'Error')
          console.log(err)
          _regresar_menuhis();
        });
    },

    cargarEnfermedades() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER851.DLL"))
        .then((data) => {
          this._enfermedades = data.ENFERMEDADES
          this._enfermedades.pop()

          for (var i in this._enfermedades) {
            this._enfermedades[i].NOMBRE_ENF = this._enfermedades[i].NOMBRE_ENF.replace(/\�/g, "Ñ").trim();
          }

        })
        .catch(err => {
          CON851('', 'Error consultando datos enfermedades', null, 'error', 'error')
          console.log(err, 'err')
          loader('hide');
          _regresar_menuhis();
        });
      this._inicializar_HC8031();
    },
  },
})