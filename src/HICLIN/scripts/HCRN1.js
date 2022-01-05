const { get_WS_RECIE, getObjRegEvo } = require("../../HICLIN/scripts/reg_evo.js");

var _this = new Vue({
  el: "#HCRN1",
  data: {
    reg_recie: get_WS_RECIE(),
    reg_evo: getObjRegEvo(),
    reg_med: {},

    medico_w: "",
    descrip_medico_w: "",
    paci: JSON.parse(JSON.stringify($_REG_PACI)),

    fecha_act: moment().format("YYYYMMDD"),
    hora_act: moment().format("HHmm"),
    admin_w: localStorage.Usuario,

    array_est_civ: [
      { COD: "1", DESCRIP: "UNION ESTABLE" },
      { COD: "2", DESCRIP: "UNION INESTABLE" },
      { COD: "3", DESCRIP: "MADRE SOLTERA" },
    ],
    array_riesgo_obst: [
      { COD: "1", DESCRIP: "ALTO" },
      { COD: "2", DESCRIP: "MEDIO" },
      { COD: "3", DESCRIP: "BAJO" },
    ],
    array_HCRN817: [
      { COD: "S", DESCRIP: "SI REACTIVO" },
      { COD: "N", DESCRIP: "NO REACTIVO" },
      { COD: "1", DESCRIP: "NO SABE" },
      { COD: "2", DESCRIP: "NO RESPONDE" },
    ],
    array_atencion_parto: [
      { COD: "1", DESCRIP: "GINECOLOGO" },
      { COD: "2", DESCRIP: "MED. GENERAL" },
      { COD: "O", DESCRIP: "OTRO" },
    ],
    array_sexo: [
      { COD: "F", DESCRIP: "FEMENINO" },
      { COD: "M", DESCRIP: "MASCULINO" },
      { COD: "P", DESCRIP: "POR DEFINIR" },
    ],
    array_presentacion: [
      { COD: "1", DESCRIP: "CEFALICA" },
      { COD: "2", DESCRIP: "PODALICA" },
    ],
    array_nacimiento: [
      { COD: "1", DESCRIP: "VAGINAL" },
      { COD: "2", DESCRIP: "ABDOMINAL" },
      { COD: "3", DESCRIP: "INSTRUMENTADO" },
    ],
    array_parto: [
      { COD: "1", DESCRIP: "SIMPLE" },
      { COD: "2", DESCRIP: "MULTIPLE" },
    ],
    array_instrumentacion: [
      { COD: "1", DESCRIP: "ESPATULA" },
      { COD: "2", DESCRIP: "FORCEPS" },
      { COD: "3", DESCRIP: "OTRO" },
    ],
    array_liq_amn: [
      { COD: "1", DESCRIP: "NORMAL" },
      { COD: "2", DESCRIP: "ANORMAL" },
      { COD: "3", DESCRIP: "NO SE SABE" },
    ],
    array_placenta: [
      { COD: "1", DESCRIP: "NORMAL" },
      { COD: "2", DESCRIP: "ANORMAL" },
      { COD: "3", DESCRIP: "NO SE SABE" },
    ],
    array_pinza_cordon: [
      { COD: "1", DESCRIP: "PRECOZ" },
      { COD: "2", DESCRIP: "HABITUAL" },
      { COD: "3", DESCRIP: "DIFERIDO" },
    ],
    array_adapt_neon: [
      { COD: "1", DESCRIP: "ESPONTANEA" },
      { COD: "2", DESCRIP: "CONDUCIDA" },
      { COD: "3", DESCRIP: "INDUCIDA" },
    ],
    array_HCRN813_1: [
      { COD: "1", DESCRIP: "MUY FINA-GELATINOSA", IMG: "ERRORD1" },
      { COD: "2", DESCRIP: "FINA - LISA", IMG: "ERRORD2" },
      { COD: "3", DESCRIP: "GRUESA-DESCAMACION-SUPERFICIAL-DISCRE", IMG: "ERRORD3" },
      { COD: "4", DESCRIP: "GRUESA-GRIETAS SUPERFICIALES-DESCAMAC", IMG: "ERRORD4" },
      { COD: "5", DESCRIP: "GRUESA-GRIETAS PROFUNDAS APERGAMINADA", IMG: "ERRORD5" },
    ],
    array_HCRN814_1: [
      { COD: "1", DESCRIP: "INCURVACION ESCASA O NULA DEL PABELLON         ", IMG: "ERRORDA" },
      { COD: "2", DESCRIP: "PABELLON PARCIALMENTE INCURVADO EN EL BORDE SUP", IMG: "ERRORDB" },
      { COD: "3", DESCRIP: "PABELLON INCURVADO TODO EL BORDE SUPERIOR      ", IMG: "ERRORDC" },
      { COD: "4", DESCRIP: "PABELLON TOTALMENTE INCURVADO                  ", IMG: "ERRORDD" },
    ],
    array_HCRN814_2: [
      { COD: "1", DESCRIP: "NO PALPABLE             ", IMG: "ERRORDE" },
      { COD: "2", DESCRIP: "PALPABLE MENOR DE 5 mm  ", IMG: "ERRORDF" },
      { COD: "3", DESCRIP: "PALPABLE ENTRE 5 Y 10 mm", IMG: "ERRORDG" },
      { COD: "4", DESCRIP: "PALPABLE MAYOR DE 10 mm ", IMG: "ERRORDH" },
    ],
    array_HCRN814_3: [
      { COD: "1", DESCRIP: "APENAS VISIBLE SIN AREOLA                           ", IMG: "ERRORDI" },
      { COD: "2", DESCRIP: "DIAMETRO < DE 7.5 mm AREOLA LISA Y CHATA            ", IMG: "ERRORDJ" },
      { COD: "3", DESCRIP: "DIAMETRO > 7.5 mm AREOLA PUNTEADA BORDE NO LEVANTADO", IMG: "ERRORDK" },
      { COD: "4", DESCRIP: "DIAMETRO > 7.5 mm AREOLA PUNTEADA BORDE LEVANTADO   ", IMG: "ERRORDL" },
    ],
    array_HCRN813_2: [
      { COD: "1", DESCRIP: "SIN PLIEGUES                         ", IMG: "ERRORD6" },
      { COD: "2", DESCRIP: "MARCAS MAL DEFINIDAS EN LA MITAD ANT.", IMG: "ERRORD7" },
      { COD: "3", DESCRIP: "MARCAS BIEN DEFIN. EN LA MITAD ANT.. ", IMG: "ERRORD8" },
      { COD: "4", DESCRIP: "SURCOS EN LA MITAD ANTERIOR          ", IMG: "ERRORD9" },
      { COD: "5", DESCRIP: "SURCOS EN MAS DE LA MITAD ANTERIOR   ", IMG: "ERRORD0" },
    ],

    index_tabla_gen: 0,
    array_drogas: [],

    array_HCRN812: [
      { COD: "1", DESCRIP: "NORMAL" },
      { COD: "2", DESCRIP: "ANORMAL" },
    ],

    titulos_estim: [
      "Textura de la Piel",
      "Forma de la Oreja",
      "Tamaño de la Glandula Mamaria",
      "Formación del Pezón",
      "Pliegues Plantares",
    ],
    index_estim: 0,
    mostrar_estim: false,
    img_estim: "",

    mascara4: IMask.createMask({
      mask: Number,
      thousandsSeparator: ",",
      radix: ".",
      padFractionalZeros: true,
      signed: false,
      scale: 1,
      min: -9.9,
      max: 99.9,
    }),

    mascara5: IMask.createMask({
      mask: Number,
      thousandsSeparator: ",",
      radix: ".",
      padFractionalZeros: true,
      signed: false,
      scale: 1,
      min: -9.99,
      max: 99.99,
    }),

    styles: {
      flexRow: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      },
      flexIzq: {
        textAlign: "left",
        paddingLeft: "13px",
      },
      center: {
        textAlign: "center",
      },
      flexCen: {
        display: "flex",
        alignItems: "center",
      },
      divImage: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
      },
      image: {
        maxHeight: "150px",
        width: "52%",
      },
    },
  },
  components: {
    input_mask: require("../../frameworks/scripts/INPUT-MASK-SC.vue.js"),
  },
  created() {
    loader("show");
    _inputControl("disabled");
    _inputControl("reset");
    if (localStorage.idOpciondata == "0A4") {
      nombreOpcion("A-4 - Re-imprimir Recien Nacido");
    } else {
      nombreOpcion("A-3 - Historia Clinica Recien Nacido");
    }
    this.traerDrogas();
  },
  watch: {
    "reg_recie.observaciones": function (val) {
      Vue.set(this.reg_recie, "observaciones", val.enterPut());
    },
  },
  computed: {
    fecha_ini() {
      return getObjectDate(this.fecha_act);
    },
    hora_ini() {
      return getObjectHour(this.hora_act);
    },
    id_madre_edit() {
      return isNaN(this.paci.COD) ? this.paci.COD : new Intl.NumberFormat("ja-JP").format(this.paci.COD);
    },
    edad_edit() {
      return `${this.reg_recie.madre.und_edad_madre}${this.reg_recie.madre.vlr_edad_madre}`;
    },
    est_civ_madre_edit() {
      let busqueda = this.array_est_civ.find((e) => e.COD == this.reg_recie.madre.est_civ_madre);
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
    riesgo_edit() {
      let busqueda = this.array_riesgo_obst.find((e) => e.COD == this.reg_recie.madre.riesgo_obst);
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
    enf_edit() {
      let object = {};
      for (let i in this.reg_recie.madre) {
        if (
          [
            "vdrl_madre",
            "vdrl_padre",
            "hiv_madre",
            "hiv_padre",
            "hep_madre",
            "hep_padre",
            "tox_madre",
            "tox_padre",
          ].includes(i)
        ) {
          switch (this.reg_recie.madre[`${i}`]) {
            case "S":
              object[`${i}`] = "SI";
              break;
            case "N":
              object[`${i}`] = "NO";
              break;
            case "1":
              object[`${i}`] = "NS";
              break;
            case "2":
              object[`${i}`] = "NR";
              break;
            default:
              object[`${i}`] = "";
              break;
          }
        }
      }
      return object;
    },
    atencion_parto_edit() {
      let busqueda = this.array_atencion_parto.find((e) => e.COD == this.reg_recie.neonat.atencion_parto);
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
    sexo_edit() {
      let busqueda = this.array_sexo.find((e) => e.COD == this.reg_recie.neonat.sexo);
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
    presentacion_edit() {
      let busqueda = this.array_presentacion.find((e) => e.COD == this.reg_recie.neonat.presentacion);
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
    nacimiento_edit() {
      let busqueda = this.array_nacimiento.find((e) => e.COD == this.reg_recie.neonat.nacimiento);
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
    parto_edit() {
      let busqueda = this.array_parto.find((e) => e.COD == this.reg_recie.neonat.parto);
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
    instrumentacion_edit() {
      let busqueda = this.array_instrumentacion.find((e) => e.COD == this.reg_recie.neonat.instrumentacion);
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
    liq_amn_edit() {
      let busqueda = this.array_liq_amn.find((e) => e.COD == this.reg_recie.neonat.liq_amn);
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
    placenta_edit() {
      let busqueda = this.array_placenta.find((e) => e.COD == this.reg_recie.neonat.placenta);
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
    pinza_cordon_edit() {
      let busqueda = this.array_pinza_cordon.find((e) => e.COD == this.reg_recie.neonat.pinza_cordon);
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
    adapt_neon_edit() {
      let busqueda = this.array_adapt_neon.find((e) => e.COD == this.reg_recie.neonat.adapt_neon);
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
    fecha_nac_w() {
      return _getObjectDate6(this.reg_recie.neonat.fecha_nac);
    },
    descrip_drogas() {
      let descripciones = (busqueda = {});
      for (let i in this.reg_recie.neonat.medica_usad) {
        busqueda = this.array_drogas.find(
          (e) => e.COD.trim() == this.reg_recie.neonat.medica_usad[i].drogas.trim().toUpperCase()
        );
        descripciones[`descrip_${i}`] = busqueda ? busqueda.DESCRIP : "";
      }
      console;
      return descripciones;
    },
    tot_tabla_general() {
      let totales = [];
      for (let i = 0; i < 3; i++) {
        let suma =
          (parseInt(this.reg_recie.neonat.tabla_general[i].aspecto) || 0) +
          (parseInt(this.reg_recie.neonat.tabla_general[i].pulso) || 0) +
          (parseInt(this.reg_recie.neonat.tabla_general[i].gesticular) || 0) +
          (parseInt(this.reg_recie.neonat.tabla_general[i].actitud) || 0) +
          (parseInt(this.reg_recie.neonat.tabla_general[i].respiracion) || 0);

        totales[i] = suma;
      }
      return totales;
    },
    exam_neon_edit() {
      let object = {};
      for (let i in this.reg_recie.exam_neon) {
        switch (parseInt(this.reg_recie.exam_neon[`${i}`])) {
          case 1:
            object[`${i}`] = "1 - NORMAL";
            break;
          case 2:
            object[`${i}`] = "2 - ANORMAL";
            break;
          default:
            object[`${i}`] = "";
            break;
        }
      }
      return object;
    },
    ruta_img() {
      return this.img_estim ? `../../frameworks/imagenes/hiclin/${this.img_estim}.png` : "";
    },

    estim_ed_gest_w() {
      let obj = {};

      switch (this.reg_recie.estim_ed_gest.text_piel) {
        case "00":
          obj.text_piel = "1";
          break;
        case "05":
          obj.text_piel = "2";
          break;
        case "10":
          obj.text_piel = "3";
          break;
        case "15":
          obj.text_piel = "4";
          break;
        case "20":
          obj.text_piel = "5";
          break;
        default:
          obj.text_piel = "";
          break;
      }
      switch (this.reg_recie.estim_ed_gest.forma_orej) {
        case "00":
          obj.forma_orej = "1";
          break;
        case "08":
          obj.forma_orej = "2";
          break;
        case "16":
          obj.forma_orej = "3";
          break;
        case "24":
          obj.forma_orej = "4";
          break;
        default:
          obj.forma_orej = "";
          break;
      }
      switch (this.reg_recie.estim_ed_gest.tamano_gland_mama) {
        case "00":
          obj.tamano_gland_mama = "1";
          break;
        case "05":
          obj.tamano_gland_mama = "2";
          break;
        case "10":
          obj.tamano_gland_mama = "3";
          break;
        case "15":
          obj.tamano_gland_mama = "4";
          break;
        default:
          obj.tamano_gland_mama = "";
          break;
      }
      switch (this.reg_recie.estim_ed_gest.forma_pezon) {
        case "00":
          obj.forma_pezon = "1";
          break;
        case "05":
          obj.forma_pezon = "2";
          break;
        case "10":
          obj.forma_pezon = "3";
          break;
        case "15":
          obj.forma_pezon = "4";
          break;
        default:
          obj.forma_pezon = "";
          break;
      }
      switch (this.reg_recie.estim_ed_gest.pliegues_planta) {
        case "00":
          obj.pliegues_planta = "1";
          break;
        case "05":
          obj.pliegues_planta = "2";
          break;
        case "10":
          obj.pliegues_planta = "3";
          break;
        case "15":
          obj.pliegues_planta = "4";
          break;
        case "20":
          obj.pliegues_planta = "5";
          break;
        default:
          obj.pliegues_planta = "";
          break;
      }

      return obj;
    },

    get_array_estim() {
      switch (parseInt(this.index_estim)) {
        case 0:
          return this.array_HCRN813_1;
        case 1:
          return this.array_HCRN814_1;
        case 2:
          return this.array_HCRN814_2;
        case 3:
          return this.array_HCRN814_3;
        case 4:
          return this.array_HCRN813_2;
      }
    },
    text_piel_edit() {
      let busqueda = this.array_HCRN813_1.find((e) => e.COD == parseInt(this.estim_ed_gest_w.text_piel));
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
    forma_orej_edit() {
      let busqueda = this.array_HCRN814_1.find((e) => e.COD == parseInt(this.estim_ed_gest_w.forma_orej));
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
    tamano_gland_mama_edit() {
      let busqueda = this.array_HCRN814_2.find((e) => e.COD == parseInt(this.estim_ed_gest_w.tamano_gland_mama));
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
    forma_pezon_edit() {
      let busqueda = this.array_HCRN814_3.find((e) => e.COD == parseInt(this.estim_ed_gest_w.forma_pezon));
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
    pliegues_planta_edit() {
      let busqueda = this.array_HCRN813_2.find((e) => e.COD == parseInt(this.estim_ed_gest_w.pliegues_planta));
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
  },
  methods: {
    async traerHistoriaClinica() {
      let datos_envio = [$_REG_HC.llave_hc, localStorage["Usuario"], "1"];

      postData({ datosh: datosEnvio() + datos_envio.join("|") + "|" }, get_url("APP/HICLIN/GET_HC.DLL"))
        .then((data) => {
          this.hcprc = data;
          if (this.hcprc.estado == 2 && parseInt(this.hcprc.serv) > 02) {
            CON851("", "9Y", null, "error", "Error");
            _regresar_menuhis();
          } else {
            this.datoFolio();
          }
        })
        .catch((error) => {
          console.error(error, "err");
          CON851("", "Error consultando historia", null, "error", "Error");
          _regresar_menuhis();
        });
    },

    datoFolio() {
      loader("show");
      this.reg_evo.LLAVE_EVO = this.hcprc.llave;

      let datos_envio = {
        datosh: datosEnvio(),
        admin: this.admin_w,
        llave: this.hcprc.llave,
      };

      postData(datos_envio, get_url("APP/HICLIN/HCRN815.DLL"))
        .then((data) => {
          data = data.LISTADO;
          data = data.sort((a, b) => {
            return b.folio - a.folio;
          });
          loader("hide");
          _ventanaDatos({
            titulo: `${this.paci.DESCRIP}`,
            columnas: ["folio", "fecha", "hora", "medico", "estado"],
            data: data,
            callback_esc: _regresar_menuhis,
            callback: (data) => {
              this.reg_evo.LLAVE_EVO = data.llave;
              if (localStorage.idOpciondata == "0A4") {
                if(data.medico.trim() == "SELECCIONE AQUI PARA ABRIR NUEVO FORMULARIO") {
                  CON851("", "Registro no válido para Impresión", null, "info", "Información");
                  this.datoFolio();
                } else this.confirmarImprimir();
              } else {
                this.buscarEvolucion();
              }
            },
          });
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando historias", null, "error", "Error");
          _regresar_menuhis();
        });
    },

    buscarEvolucion() {
      let datos_envio = [
        this.reg_evo.LLAVE_EVO.slice(0, 23),
        this.reg_evo.LLAVE_EVO.slice(35),
        $_REG_PROF.IDENTIFICACION.padStart(10, "0"),
        this.reg_evo.LLAVE_EVO.slice(23, 31),
        this.reg_evo.LLAVE_EVO.slice(31, 35),
        "GEBC",
      ];

      postData({ datosh: datosEnvio() + datos_envio.join("|") + "|" }, get_url("app/HICLIN/HC002.DLL"))
        .then(async (data) => {
          this.reg_evo = JSON.parse(JSON.stringify(data.EVOLUCION[0]));
          this.validarEvolucion();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando evolución", null, "error", "Error");
          this.datoFolio();
        });
    },

    async validarEvolucion() {
      if (this.reg_evo.NOVEDAD == "7") {
        this.reg_recie.novedad = "7";
        this.reg_evo.FECHA_EVO = this.fecha_act;
        this.reg_evo.HORA_EVO = this.hora_act;
        this.crearEvolucion();
      } else {
        if (this.reg_recie.novedad != "8") this.reg_recie.novedad = "8";
        if (this.admin_w == "ADMI" || this.admin_w == "GEBC") {
          await this.leerRecie();
          this.leerMedico();
        } else {
          CON851("", "9X", null, "error", "Error");
          this.salir();
        }
      }
    },

    crearEvolucion() {
      this.reg_recie.novedad = "7";
      this.reg_evo.TIPO = "N";
      this.reg_evo.MEDICO = $_REG_PROF.IDENTIFICACION;
      this.reg_evo.RIPS.EDAD = `${$_REG_HC.edad_hc.unid_edad}${$_REG_HC.edad_hc.vlr_edad.toString().padStart(3, "0")}`;
      this.reg_evo.OPER_EVO = this.admin_w;
      this.reg_recie.neonat.orden_hijo = "01";

      this.reg_recie.madre.primer_apel_madre = this.paci["APELL-PACI1"];
      this.reg_recie.madre.segundo_apel_madre = this.paci["APELL-PACI2"];
      this.reg_recie.madre.nombre_madre = `${this.paci["NOM-PACI1"]} ${this.paci["NOM-PACI2"]}`;
      this.reg_recie.madre.id_madre = this.paci.COD;

      this.reg_recie.madre.und_edad_madre = $_REG_HC.edad_hc.unid_edad;
      this.reg_recie.madre.vlr_edad_madre = $_REG_HC.edad_hc.vlr_edad.toString().padStart(3, "0");

      CON851("", "CREANDO", null, "info", "");
      this.leerMedico();
    },

    leerMedico() {
      loader("show");
      let datos_envio = {
        datosh: datosEnvio(),
        paso: 1,
        codigo: $_REG_PROF.IDENTIFICACION.padStart(10, "0"),
      };

      postData(datos_envio, get_url("APP/SALUD/SER819.DLL"))
        .then((data) => {
          if (data.NOMBRE.trim() == "Personal no atiende") {
            CON851("9X", "9X", null, "error", "Error");
            this.salir();
          } else {
            this.leerPaciente();
          }
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error leyendo profesional", null, "error", "Error");
          this.salir();
        });
    },

    leerPaciente() {
      postData({ datosh: datosEnvio() + this.paci.COD + "|" }, get_url("APP/SALUD/SER810-1.DLL"))
        .then((data) => {
          this.paci = JSON.parse(JSON.stringify(data["REG-PACI"][0]));

          if (this.paci.SEXO == "M") {
            CON851("", "73", null, "error", "Error");
            this.salir();
          } else if (
            $_REG_HC.edad_hc.unid_edad != "A" ||
            $_REG_HC.edad_hc.vlr_edad < 8 ||
            $_REG_HC.edad_hc.vlr_edad > 55
          ) {
            CON851("", "74", null, "error", "Error");
            this.salir();
          } else {
            this.datoMedico();
          }
        })
        .catch((error) => {
          if (!error.STATUS) CON851("", "Error leyendo datos del paciente", null, "error", "Error");
          console.error(error);
          this.salir();
        });
    },

    datoMedico() {
      let datos_envio = {
        datosh: datosEnvio(),
        paso: 1,
        codigo: this.reg_evo.MEDICO.padStart(10, "0"),
      };

      postData(datos_envio, get_url("APP/SALUD/SER819.DLL"))
        .then((data) => {
          loader("hide");
          this.reg_med = data;
          if (data.NOMBRE.trim() == "Personal no atiende") {
            CON851("01", "01", null, "error", "Error");
            this.salir();
          } else {
            this.datoUnidad();
          }
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error leyendo profesional", null, "error", "Error");
          this.salir();
        });
    },

    datoUnidad() {
      SER873(
        () => {
          this.confirmarSalir("datoUnidad");
        },
        (data) => {
          this.reg_evo.UNSERV = data.COD;
          this.evaluarUnidad();
        },
        this.reg_evo.UNSERV
      );
    },

    evaluarUnidad() {
      loader("show");
      postData({ datosh: datosEnvio() + this.reg_evo.UNSERV + "|" }, get_url("APP/SALUD/SER873-1.DLL"))
        .then(async (data) => {
          loader("hide");
          data = data.UNSERV;
          this.reg_evo.DESCRIP_UNSERV = data.DESCRIP;
          if (data.DESCRIP == "No se encontro codigo") {
            CON851("", "01", null, "error", "Error");
            this.datoUnidad();
          } else if (data.ESTADO == "N") {
            CON851("", "13", null, "error", "Error");
            this.datoUnidad();
          } else {
            this.datoEstCivilMadre();
          }
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando unidades de servicio", null, "error", "Error");
          this.datoUnidad();
        });
    },

    datoEstCivilMadre() {
      if (!this.reg_recie.madre.est_civ_madre.trim()) this.reg_recie.madre.est_civ_madre = "1";
      POPUP(
        {
          titulo: "Estado Civil",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.array_est_civ,
          callback_f: this.datoUnidad,
          seleccion: this.reg_recie.madre.est_civ_madre,
          teclaAlterna: true,
          id_input: "#datoEstCivilMadre",
        },
        (data) => {
          this.reg_recie.madre.est_civ_madre = data.COD;
          this.datoParidadG();
        }
      );
    },

    datoParidadG() {
      validarInputs(
        {
          form: "#paridad_g",
        },
        this.datoEstCivilMadre,
        () => {
          if (!this.reg_recie.madre.paridad.g.trim()) this.reg_recie.madre.paridad.g = "0";
          if (this.reg_recie.madre.paridad.g <= 0) {
            this.reg_recie.madre.paridad = JSON.parse(
              JSON.stringify({
                g: "0",
                p: "0",
                a: "0",
                c: "0",
                vivos: "0",
              })
            );
            this.datoEdGest();
          } else {
            this.datoParidadP();
          }
        }
      );
    },

    datoParidadP() {
      validarInputs(
        {
          form: "#paridad_p",
        },
        this.datoParidadG,
        () => {
          if (!this.reg_recie.madre.paridad.p.trim()) this.reg_recie.madre.paridad.p = "0";
          this.datoParidadC();
        }
      );
    },

    datoParidadC() {
      validarInputs(
        {
          form: "#paridad_c",
        },
        this.datoParidadP,
        () => {
          if (!this.reg_recie.madre.paridad.c.trim()) this.reg_recie.madre.paridad.c = "0";
          this.datoParidadA();
        }
      );
    },

    datoParidadA() {
      validarInputs(
        {
          form: "#paridad_a",
        },
        this.datoParidadC,
        () => {
          if (!this.reg_recie.madre.paridad.a.trim()) this.reg_recie.madre.paridad.a = "0";
          let total =
            parseInt(this.reg_recie.madre.paridad.p) +
            parseInt(this.reg_recie.madre.paridad.c) +
            parseInt(this.reg_recie.madre.paridad.a);

          if (this.reg_recie.madre.paridad.g == 0 && total > 0) {
            CON851("", "03", null, "error", "Error");
            this.datoParidadG();
          } else if (total < parseInt(this.reg_recie.madre.paridad.g) - 1) {
            CON851("", "03", null, "error", "Error");
            this.datoParidadA();
          } else this.datoParidadVivos();
        }
      );
    },

    datoParidadVivos() {
      validarInputs(
        {
          form: "#paridad_vivos",
        },
        this.datoParidadA,
        () => {
          if (!this.reg_recie.madre.paridad.vivos.trim()) this.reg_recie.madre.paridad.vivos = "0";
          this.datoParidadMuertos();
        }
      );
    },

    datoParidadMuertos() {
      validarInputs(
        {
          form: "#paridad2_muertos",
        },
        this.datoParidadVivos,
        () => {
          if (!this.reg_recie.madre.paridad2.muertos.trim()) this.reg_recie.madre.paridad2.muertos = "0";
          let total =
            parseInt(this.reg_recie.madre.paridad.p) +
            parseInt(this.reg_recie.madre.paridad.c) +
            parseInt(this.reg_recie.madre.paridad.a);

          let total2 = parseInt(this.reg_recie.madre.paridad.vivos) + parseInt(this.reg_recie.madre.paridad2.muertos);

          if (total != total2) {
            CON851("", "03", null, "error", "Error");
            this.datoParidadMuertos();
          } else this.datoEdGest();
        }
      );
    },

    datoEdGest() {
      validarInputs(
        {
          form: "#ed_gest",
        },
        () => {
          if (this.reg_recie.madre.paridad.g == 0) this.datoParidadG();
          else this.datoParidadMuertos();
        },
        () => {
          this.datoControlPrenatal();
        }
      );
    },

    datoControlPrenatal() {
      if (!this.reg_recie.madre.ctrl_prentl.trim()) this.reg_recie.madre.ctrl_prentl = "S";
      validarInputs(
        {
          form: "#ctrl_prentl",
        },
        this.datoEdGest,
        () => {
          this.reg_recie.madre.ctrl_prentl = this.reg_recie.madre.ctrl_prentl.toUpperCase();
          if (this.reg_recie.madre.ctrl_prentl != "S") this.reg_recie.madre.ctrl_prentl = "N";
          this.datoRiesgoObst();
        }
      );
    },

    datoRiesgoObst() {
      if (!this.reg_recie.madre.riesgo_obst.trim()) this.reg_recie.madre.riesgo_obst = "1";
      POPUP(
        {
          titulo: "Riesgo Obst",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.array_riesgo_obst,
          callback_f: this.datoControlPrenatal,
          seleccion: this.reg_recie.madre.riesgo_obst,
          teclaAlterna: true,
          id_input: "#riesgo_obst",
        },
        (data) => {
          this.reg_recie.madre.riesgo_obst = data.COD;
          this.datoGrupoMadre();
        }
      );
    },

    datoGrupoMadre() {
      if (!this.reg_recie.madre.grupo_madre.trim()) this.reg_recie.madre.grupo_madre = this.paci["GRP-SANG"];
      validarInputs(
        {
          form: "#grupo_madre",
        },
        this.datoRiesgoObst,
        () => {
          this.reg_recie.madre.grupo_madre = this.reg_recie.madre.grupo_madre.toUpperCase();
          let busqueda = ["O", "A", "B", "AB"].includes(this.reg_recie.madre.grupo_madre);
          if (busqueda) this.datoRhMadre();
          else {
            CON851("", "03", null, "error", "Error");
            this.datoGrupoMadre();
          }
        }
      );
    },

    datoRhMadre() {
      if (!this.reg_recie.madre.rh_madre.trim()) this.reg_recie.madre.rh_madre = this.paci["RH"];
      validarInputs(
        {
          form: "#rh_madre",
        },
        this.datoGrupoMadre,
        () => {
          this.reg_recie.madre.rh_madre = this.reg_recie.madre.rh_madre.toUpperCase();
          let busqueda = ["+", "-"].includes(this.reg_recie.madre.rh_madre);
          if (busqueda) this.verificarDatosPaci();
          else {
            CON851("", "03", null, "error", "Error");
            this.datoRhMadre();
          }
        }
      );
    },

    verificarDatosPaci() {
      if (
        this.reg_recie.madre.grupo_madre != this.paci["GRP-SANG"] ||
        this.reg_recie.madre.rh_madre != this.paci["RH"]
      ) {
        this.actualizarPaci();
      } else this.datosEnfMadre("vdrl_madre");
    },

    actualizarPaci() {
      let datos = {};

      datos["datosh"] = datosEnvio();
      datos["id_paci"] = this.paci["COD"];
      datos["tipo_id_paci"] = this.paci["TIPO-ID"];
      datos["apellido1_paci"] = this.paci["APELL-PACI1"];
      datos["apellido2_paci"] = this.paci["APELL-PACI2"];
      datos["nombre1_paci"] = this.paci["NOM-PACI1"];
      datos["nombre2_paci"] = this.paci["NOM-PACI2"];
      datos["telefono_paci"] = this.paci["TELEFONO"];
      datos["ciudad_paci"] = this.paci["CIUDAD"];
      datos["direccion_paci"] = this.paci["DIRECC"];

      if (this.reg_recie.madre.grupo_madre != this.paci["GRP-SANG"]) {
        datos["grp_sang_paci"] = this.reg_recie.madre.grupo_madre;
      } else {
        datos["grp_sang_paci"] = this.paci["GRP-SANG"];
      }

      if (this.reg_recie.madre.rh_madre != this.paci["RH"]) {
        datos["rh_paci"] = this.reg_recie.madre.rh_madre;
      } else {
        datos["rh_paci"] = this.paci["RH"];
      }

      datos["admin_w"] = this.paci["OPER-CORR"];
      datos["victi_conflicto"] = this.paci["VICTI-CONFLICTO"];
      datos["diabetes"] = this.paci["DIABETES"];

      postData(datos, get_url("app/SALUD/SER110C-AC.DLL"))
        .then((data) => {
          console.log(data, "data");
          CON851("", "Actualizado correctamente", null, "success", "Completado");
          this.datosEnfMadre("vdrl_madre");
        })
        .catch((err) => {
          console.error(err, "error");
          CON851("", "Error en guardado", null, "error", "Error");
          this.datoRhMadre();
        });
    },

    datosEnfMadre(input) {
      if (!this.reg_recie.madre[input].trim()) this.reg_recie.madre[input] = "N";
      POPUP(
        {
          titulo: "Respuesta",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.array_HCRN817,
          callback_f: () => {
            switch (input) {
              case "vdrl_madre":
                this.datoRhMadre();
                break;
              case "hiv_madre":
                this.datosEnfMadre("vdrl_madre");
                break;
              case "hep_madre":
                this.datosEnfMadre("hiv_madre");
                break;
              case "tox_madre":
                this.datosEnfMadre("hep_madre");
                break;
            }
          },
          seleccion: this.reg_recie.madre[input],
          teclaAlterna: true,
          id_input: `#${input}`,
        },
        (data) => {
          this.reg_recie.madre[input] = data.COD;
          switch (data.COD) {
            case "S":
              Vue.set(this.enf_edit, input, "SI");
              break;
            case "N":
              Vue.set(this.enf_edit, input, "NO");
              break;
            case "1":
              Vue.set(this.enf_edit, input, "NS");
              break;
            case "2":
              Vue.set(this.enf_edit, input, "NR");
              break;
          }
          switch (input) {
            case "vdrl_madre":
              this.datosEnfMadre("hiv_madre");
              break;
            case "hiv_madre":
              this.datosEnfMadre("hep_madre");
              break;
            case "hep_madre":
              this.datosEnfMadre("tox_madre");
              break;
            case "tox_madre":
              this.datoGrupoPadre();
              break;
          }
        }
      );
    },

    datoGrupoPadre() {
      validarInputs(
        {
          form: "#grupo_padre",
        },
        () => {
          this.datosEnfMadre("tox_madre");
        },
        () => {
          this.reg_recie.madre.grupo_padre = this.reg_recie.madre.grupo_padre.toUpperCase();
          if (this.reg_recie.madre.grupo_padre.trim()) {
            let busqueda = ["O", "A", "B", "AB"].includes(this.reg_recie.madre.grupo_padre);
            if (busqueda) this.datoRhPadre();
            else {
              CON851("", "03", null, "error", "Error");
              this.datoGrupoPadre();
            }
          } else {
            this.reg_recie.madre.rh_padre = "";
            this.datosEnfPadre("vdrl_padre");
          }
        }
      );
    },

    datoRhPadre() {
      validarInputs(
        {
          form: "#rh_padre",
        },
        this.datoGrupoPadre,
        () => {
          this.reg_recie.madre.rh_padre = this.reg_recie.madre.rh_padre.toUpperCase();
          let busqueda = ["+", "-"].includes(this.reg_recie.madre.rh_padre);
          if (busqueda) this.datosEnfPadre("vdrl_padre");
          else {
            CON851("", "03", null, "error", "Error");
            this.datoRhPadre();
          }
        }
      );
    },

    datosEnfPadre(input) {
      if (!this.reg_recie.madre[input].trim()) this.reg_recie.madre[input] = "N";
      POPUP(
        {
          titulo: "Respuesta",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.array_HCRN817,
          callback_f: () => {
            switch (input) {
              case "vdrl_padre":
                this.datoRhPadre();
                break;
              case "hiv_padre":
                this.datosEnfPadre("vdrl_padre");
                break;
              case "hep_padre":
                this.datosEnfPadre("hiv_padre");
                break;
              case "tox_padre":
                this.datosEnfPadre("hep_padre");
                break;
            }
          },
          seleccion: this.reg_recie.madre[input],
          teclaAlterna: true,
          id_input: `#${input}`,
        },
        (data) => {
          this.reg_recie.madre[input] = data.COD;
          switch (data.COD) {
            case "S":
              Vue.set(this.enf_edit, input, "SI");
              break;
            case "N":
              Vue.set(this.enf_edit, input, "NO");
              break;
            case "1":
              Vue.set(this.enf_edit, input, "NS");
              break;
            case "2":
              Vue.set(this.enf_edit, input, "NR");
              break;
          }
          switch (input) {
            case "vdrl_padre":
              this.datosEnfPadre("hiv_padre");
              break;
            case "hiv_padre":
              this.datosEnfPadre("hep_padre");
              break;
            case "hep_padre":
              this.datosEnfPadre("tox_padre");
              break;
            case "tox_padre":
              this.datoOrdenHijo();
              break;
          }
        }
      );
    },

    datoOrdenHijo() {
      validarInputs(
        {
          form: "#orden_hijo",
        },
        () => {
          this.datosEnfPadre("tox_padre");
        },
        () => {
          if (!this.reg_recie.neonat.orden_hijo.trim()) this.reg_recie.neonat.orden_hijo = "0";
          this.datoAtencionParto();
        }
      );
    },

    datoAtencionParto() {
      POPUP(
        {
          titulo: "Atención del Parto",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.array_atencion_parto,
          callback_f: this.datoOrdenHijo,
          seleccion: this.reg_recie.neonat.atencion_parto,
          teclaAlterna: true,
          id_input: "#atencion_parto",
        },
        (data) => {
          this.reg_recie.neonat.atencion_parto = data.COD;
          if (data.COD == "O") this.datoOtroParto();
          else this.datoHoraNac();
        }
      );
    },

    datoOtroParto() {
      validarInputs(
        {
          form: "#otro_part",
        },
        this.datoAtencionParto,
        () => {
          this.reg_recie.neonat.otro_part = this.reg_recie.neonat.otro_part.toUpperCase().replaceEsp();
          this.datoHoraNac();
        }
      );
    },

    datoHoraNac() {
      validarInputs(
        {
          form: "#hora_nac",
        },
        this.datoAtencionParto,
        () => {
          this.reg_recie.neonat.hr_nac = this.reg_recie.neonat.hr_nac.padStart(2, "0");
          this.reg_recie.neonat.mn_nac = this.reg_recie.neonat.mn_nac.padStart(2, "0");
          if (parseInt(this.reg_recie.neonat.hr_nac) < 0 || parseInt(this.reg_recie.neonat.hr_nac) > 23) {
            CON851("", "03", null, "error", "Error");
            this.datoHoraNac();
          } else if (parseInt(this.reg_recie.neonat.mn_nac) < 0 || parseInt(this.reg_recie.neonat.mn_nac) > 59) {
            CON851("", "03", null, "error", "Error");
            this.datoHoraNac();
          } else {
            this.datoFechaNac();
          }
        }
      );
    },

    datoFechaNac() {
      validarInputs(
        {
          form: "#fecha_nac",
        },
        this.datoHoraNac,
        () => {
          this.fecha_nac_w.ano_w = this.fecha_nac_w.ano_w.padStart(4, "0");
          this.fecha_nac_w.mes_w = this.fecha_nac_w.mes_w.padStart(2, "0");
          this.fecha_nac_w.dia_w = this.fecha_nac_w.dia_w.padStart(2, "0");
          this.reg_recie.neonat.fecha_nac = `${this.fecha_nac_w.ano_w.slice(2)}${this.fecha_nac_w.mes_w}${
            this.fecha_nac_w.dia_w
          }`;

          if (this.fecha_nac_w.ano_w < 1900 || this.fecha_nac_w.ano_w > this.fecha_act.slice(0, 4)) {
            CON851("", "03", null, "error", "Error");
            this.datoFechaNac();
          } else if (this.fecha_nac_w.mes_w < 1 || this.fecha_nac_w.mes_w > 12) {
            CON851("", "03", null, "error", "Error");
            this.datoFechaNac();
          } else if (this.fecha_nac_w.dia_w < 1 || this.fecha_nac_w.dia_w > 31) {
            CON851("", "03", null, "error", "Error");
            this.datoFechaNac();
          } else {
            this.datoSexo();
          }
        }
      );
    },

    datoSexo() {
      POPUP(
        {
          titulo: "Sexo",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.array_sexo,
          callback_f: this.datoFechaNac,
          seleccion: this.reg_recie.neonat.sexo,
          teclaAlterna: true,
          id_input: "#sexo",
        },
        (data) => {
          this.reg_recie.neonat.sexo = data.COD;
          this.datoPeso();
        }
      );
    },

    datoPeso() {
      validarInputs(
        {
          form: "#peso_neo",
        },
        this.datoSexo,
        () => {
          if (!this.reg_recie.neonat.peso_neo.trim()) this.reg_recie.neonat.peso_neo = "0";
          this.datoTalla();
        }
      );
    },

    datoTalla() {
      validarInputs(
        {
          form: "#talla_neo",
        },
        this.datoPeso,
        () => {
          if (!this.reg_recie.neonat.talla_neo.trim()) this.reg_recie.neonat.talla_neo = "0";
          this.datoPerCef();
        }
      );
    },

    datoPerCef() {
      validarInputs(
        {
          form: "#percef",
        },
        this.datoTalla,
        () => {
          this.reg_recie.neonat.percef = this.mascara4.resolve(_format_num(this.reg_recie.neonat.percef).toString());
          if (!this.reg_recie.neonat.percef.trim()) this.reg_recie.neonat.percef = "0";
          this.datoPerTor();
        }
      );
    },

    datoPerTor() {
      validarInputs(
        {
          form: "#pertor",
        },
        this.datoPerCef,
        () => {
          this.reg_recie.neonat.pertor = this.mascara4.resolve(_format_num(this.reg_recie.neonat.pertor).toString());
          if (!this.reg_recie.neonat.pertor.trim()) this.reg_recie.neonat.pertor = "0";
          this.datoPerAbd();
        }
      );
    },

    datoPerAbd() {
      validarInputs(
        {
          form: "#perabd",
        },
        this.datoPerTor,
        () => {
          this.reg_recie.neonat.perabd = this.mascara5.resolve(_format_num(this.reg_recie.neonat.perabd).toString());
          if (!this.reg_recie.neonat.perabd.trim()) this.reg_recie.neonat.perabd = "0";
          this.datoTemp();
        }
      );
    },

    datoTemp() {
      validarInputs(
        {
          form: "#TEMP",
        },
        this.datoPerAbd,
        () => {
          this.reg_evo.SIGNOS_VITALES.TEMP = this.mascara4.resolve(
            _format_num(this.reg_evo.SIGNOS_VITALES.TEMP).toString()
          );
          if (!this.reg_evo.SIGNOS_VITALES.TEMP.trim()) this.reg_evo.SIGNOS_VITALES.TEMP = "0";
          this.validarTemp()
            .then(() => {
              this.datoFc();
            })
            .catch(() => {
              this.datoTemp();
            });
        }
      );
    },

    validarTemp() {
      return new Promise((resolve, reject) => {
        let temp = parseFloat(this.reg_evo.SIGNOS_VITALES.TEMP) || 0;

        if (temp == 0 && this.reg_evo.UNSERV > "02") {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if ($_USUA_GLOBAL[0].NIT == "800037021" && this.reg_med.ATIENDE == 1 && temp == 0) {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if ($_USUA_GLOBAL[0].NIT == "800037021" && this.reg_evo.UNSERV == "02" && temp == 0) {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if (["1", "5", "7", "8", "A", "H", "I", "O"].includes(this.reg_med.ATIENDE)) {
          // continue
        } else if (temp == 0 && (this.reg_evo.SIGNOS_VITALES.PESO > 0 || this.reg_evo.PESO_NEW > 0)) {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if (temp > 0 && (temp < 35.5 || temp > 38)) {
          CON851("", "BM", null, "warning", "");
        }

        if (temp > 45) {
          CON851("", "03", null, "error", "Error");
          reject();
        }

        resolve();
      });
    },

    datoFc() {
      validarInputs(
        {
          form: "#F_CARD",
        },
        this.datoTemp,
        () => {
          if (!this.reg_evo.SIGNOS_VITALES.F_CARD.trim()) this.reg_evo.SIGNOS_VITALES.F_CARD = "0";
          this.validarFc()
            .then(() => {
              this.datoFr();
            })
            .catch(() => {
              this.datoFc();
            });
        }
      );
    },

    validarFc() {
      return new Promise((resolve, reject) => {
        let fcard = parseFloat(this.reg_evo.SIGNOS_VITALES.F_CARD) || 0;

        if (fcard == 0 && this.reg_evo.UNSERV == "02" && $_USUA_GLOBAL[0].NIT == "800037021") {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if ($_USUA_GLOBAL[0].NIT == "800037021" && this.reg_med.ATIENDE == 1 && fcard == 0) {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if (["1", "5", "7", "8", "A", "H", "I", "O"].includes(this.reg_med.ATIENDE)) {
          // continue
        } else if (fcard == 0 && this.hcprc.signos.peso > 0) {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if (fcard > 0) {
          switch ($_REG_HC.edad_hc.unid_edad) {
            case "D":
              if (fcard < 100 || fcard > 150) CON851("", "BK", null, "warning", "");
              break;
            case "M":
              if (fcard < 80 || fcard > 120) CON851("", "BK", null, "warning", "");
              break;
          }
        }

        if (fcard > 200) {
          CON851("", "03", null, "error", "Error");
          reject();
        }

        resolve();
      });
    },

    datoFr() {
      validarInputs(
        {
          form: "#F_RESP",
        },
        this.datoFc,
        () => {
          if (!this.reg_evo.SIGNOS_VITALES.F_RESP.trim()) this.reg_evo.SIGNOS_VITALES.F_RESP = "0";
          this.validarFr()
            .then(() => {
              this.datoTens1();
            })
            .catch(() => {
              this.datoFr();
            });
        }
      );
    },

    validarFr() {
      return new Promise((resolve, reject) => {
        let fresp = parseFloat(this.reg_evo.SIGNOS_VITALES.F_RESP) || 0;

        if (fresp == 0 && this.reg_evo.UNSERV == "02" && $_USUA_GLOBAL[0].NIT == "800037021") {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if ($_USUA_GLOBAL[0].NIT == "800037021" && this.reg_med.ATIENDE == 1 && fresp == 0) {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if (["1", "5", "7", "8", "A", "H", "I", "O"].includes(this.reg_med.ATIENDE)) {
          // continue
        } else if (fresp == 0 && this.hcprc.signos.peso > 0) {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if (fresp > 0) {
          switch ($_REG_HC.edad_hc.unid_edad) {
            case "D":
              if (fresp < 30 || fresp > 80) CON851("", "BL", null, "warning", "");
              break;
            case "M":
              if (fresp < 20 || fresp > 40) CON851("", "BL", null, "warning", "");
              break;
          }
        }

        if (fresp > 100) {
          CON851("", "03", null, "error", "Error");
          reject();
        }

        resolve();
      });
    },

    datoTens1() {
      validarInputs(
        {
          form: "#TENS_1",
        },
        this.datoFr,
        () => {
          if (!this.reg_evo.SIGNOS_VITALES.TENS_1.trim()) this.reg_evo.SIGNOS_VITALES.TENS_1 = "0";
          if (this.reg_evo.SIGNOS_VITALES.TENS_1 > 300) {
            CON851("", "03", null, "error", "Error");
            this.datoTens1();
          } else this.datoTens2();
        }
      );
    },

    datoTens2() {
      validarInputs(
        {
          form: "#TENS_2",
        },
        this.datoTens1,
        () => {
          if (!this.reg_evo.SIGNOS_VITALES.TENS_2.trim()) this.reg_evo.SIGNOS_VITALES.TENS_2 = "0";
          if (this.reg_evo.SIGNOS_VITALES.TENS_1 > 0 && this.reg_evo.SIGNOS_VITALES.TENS_2 <= 0) {
            CON851("", "02", null, "error", "Error");
            this.datoTens2();
          } else if (this.reg_evo.SIGNOS_VITALES.TENS_2 > 300) {
            CON851("", "03", null, "error", "Error");
            this.datoTens2();
          } else {
            this.reg_evo.SIGNOS_VITALES.TENS_MEDIA =
              Math.round(
                parseFloat(this.reg_evo.SIGNOS_VITALES.TENS_1) + parseFloat(this.reg_evo.SIGNOS_VITALES.TENS_2) * 2
              ) / 3;
            this.datoSat();
          }
        }
      );
    },

    datoSat() {
      validarInputs(
        {
          form: "#OXIMETRIA",
        },
        this.datoTens2,
        () => {
          if (!this.reg_evo.SIGNOS_VITALES.OXIMETRIA.trim()) this.reg_evo.SIGNOS_VITALES.OXIMETRIA = "0";
          this.datoPresentacion();
        }
      );
    },

    datoPresentacion() {
      POPUP(
        {
          titulo: "Presentación",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.array_presentacion,
          callback_f: this.datoSat,
          seleccion: this.reg_recie.neonat.presentacion,
          teclaAlterna: true,
          id_input: "#presentacion",
        },
        (data) => {
          this.reg_recie.neonat.presentacion = data.COD;
          this.datoRuptHr();
        }
      );
    },

    datoRuptHr() {
      validarInputs(
        {
          form: "#rupt_hr",
        },
        this.datoPresentacion,
        () => {
          if (!this.reg_recie.neonat.rupt_hr.trim()) this.reg_recie.neonat.rupt_hr = "0";
          this.datoNacimiento();
        }
      );
    },

    datoNacimiento() {
      POPUP(
        {
          titulo: "Nacimiento",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.array_nacimiento,
          callback_f: this.datoSat,
          seleccion: this.reg_recie.neonat.nacimiento,
          teclaAlterna: true,
          id_input: "#nacimiento",
        },
        (data) => {
          this.reg_recie.neonat.nacimiento = data.COD;
          setTimeout(() => {
            this.datoParto();
          }, 200);
        }
      );
    },

    datoParto() {
      POPUP(
        {
          titulo: "Parto",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.array_parto,
          callback_f: this.datoNacimiento,
          seleccion: this.reg_recie.neonat.parto,
          teclaAlterna: true,
          id_input: "#parto",
        },
        (data) => {
          this.reg_recie.neonat.parto = data.COD;
          this.datoInstrumentacion();
        }
      );
    },

    datoInstrumentacion() {
      POPUP(
        {
          titulo: "Instrumentación",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.array_instrumentacion,
          callback_f: this.datoParto,
          seleccion: this.reg_recie.neonat.instrumentacion,
          teclaAlterna: true,
          id_input: "#instrumentacion",
        },
        (data) => {
          this.reg_recie.neonat.instrumentacion = data.COD;
          if (data.COD == 3) this.datoOtroInstr();
          else {
            this.reg_recie.neonat.otro_instr = "";
            this.datoTrabajoParto();
          }
        }
      );
    },

    datoOtroInstr() {
      validarInputs(
        {
          form: "#otro_instr",
        },
        this.datoInstrumentacion,
        () => {
          this.reg_recie.neonat.otro_instr = this.reg_recie.neonat.otro_instr.toUpperCase().replaceEsp();
          this.datoTrabajoParto();
        }
      );
    },

    datoTrabajoParto() {
      validarInputs(
        {
          form: "#trabj_part_hrs",
        },
        this.datoInstrumentacion,
        () => {
          if (!this.reg_recie.neonat.trabj_part_hrs.trim()) this.reg_recie.neonat.trabj_part_hrs = "0";
          this.datoSufriFetal();
        }
      );
    },

    datoSufriFetal() {
      if (!this.reg_recie.neonat.sufri_fet.trim()) this.reg_recie.neonat.sufri_fet = "N";
      validarInputs(
        {
          form: "#sufri_fet",
        },
        this.datoTrabajoParto,
        () => {
          this.reg_recie.neonat.sufri_fet = this.reg_recie.neonat.sufri_fet.toUpperCase();
          if (this.reg_recie.neonat.sufri_fet != "S") {
            this.reg_recie.neonat.sufri_fet = "N";
            this.reg_recie.neonat.sufri_fet_ampl = "";
            this.datoLiqAmn();
          } else this.datoSufriFetalAmpl();
        }
      );
    },

    datoSufriFetalAmpl() {
      validarInputs(
        {
          form: "#sufri_fet_ampl",
        },
        this.datoSufriFetal,
        () => {
          this.reg_recie.neonat.sufri_fet_ampl = this.reg_recie.neonat.sufri_fet_ampl.toUpperCase().replaceEsp();
          this.datoLiqAmn();
        }
      );
    },

    datoLiqAmn() {
      POPUP(
        {
          titulo: "Liquido Amniotico",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.array_liq_amn,
          callback_f: this.datoSufriFetal,
          seleccion: this.reg_recie.neonat.liq_amn,
          teclaAlterna: true,
          id_input: "#liq_amn",
        },
        (data) => {
          this.reg_recie.neonat.liq_amn = data.COD;
          this.datoPlacenta();
        }
      );
    },

    datoPlacenta() {
      POPUP(
        {
          titulo: "Placenta",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.array_placenta,
          callback_f: this.datoLiqAmn,
          seleccion: this.reg_recie.neonat.placenta,
          teclaAlterna: true,
          id_input: "#placenta",
        },
        (data) => {
          this.reg_recie.neonat.placenta = data.COD;
          if (data.COD == 2) this.datoPlacentaDescrip();
          else {
            this.reg_recie.neonat.placenta_descrip = "";
            this.datoPinzaCordon();
          }
        }
      );
    },

    datoPlacentaDescrip() {
      validarInputs(
        {
          form: "#placenta_descrip",
        },
        this.datoPlacenta,
        () => {
          this.reg_recie.neonat.placenta_descrip = this.reg_recie.neonat.placenta_descrip.toUpperCase().replaceEsp();
          this.datoPinzaCordon();
        }
      );
    },

    datoPinzaCordon() {
      POPUP(
        {
          titulo: "Pinza Cordón",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.array_pinza_cordon,
          callback_f: this.datoPlacenta,
          seleccion: this.reg_recie.neonat.pinza_cordon,
          teclaAlterna: true,
          id_input: "#pinza_cordon",
        },
        (data) => {
          this.reg_recie.neonat.pinza_cordon = data.COD;
          this.datoAdaptNeon();
        }
      );
    },

    datoAdaptNeon() {
      POPUP(
        {
          titulo: "Adapt. del Neonato",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.array_adapt_neon,
          callback_f: this.datoPinzaCordon,
          seleccion: this.reg_recie.neonat.adapt_neon,
          teclaAlterna: true,
          id_input: "#adapt_neon",
        },
        (data) => {
          this.reg_recie.neonat.adapt_neon = data.COD;
          this.datoTablaGeneral();
        }
      );
    },

    datoTablaGeneral() {
      if (this.index_tabla_gen <= 0) this.index_tabla_gen = 0;
      if (this.index_tabla_gen >= 2) this.index_tabla_gen = 2;
      this.datoAspecto();
    },

    datoAspecto() {
      validarInputs(
        {
          form: `#aspecto_${this.index_tabla_gen}`,
        },
        () => {
          if (this.index_tabla_gen == 0) this.datoAdaptNeon();
          else {
            this.index_tabla_gen -= 1;
            this.datoRespiracion();
          }
        },
        () => {
          let busqueda = [0, 1, 2].includes(
            parseInt(this.reg_recie.neonat.tabla_general[this.index_tabla_gen].aspecto)
          );
          if (busqueda) this.datoPulso();
          else {
            CON851("", "03", null, "error", "Error");
            this.datoAspecto();
          }
        }
      );
    },

    datoPulso() {
      validarInputs(
        {
          form: `#pulso_${this.index_tabla_gen}`,
        },
        this.datoAspecto,
        () => {
          let busqueda = [0, 1, 2].includes(parseInt(this.reg_recie.neonat.tabla_general[this.index_tabla_gen].pulso));
          if (busqueda) this.datoGesticular();
          else {
            CON851("", "03", null, "error", "Error");
            this.datoPulso();
          }
        }
      );
    },

    datoGesticular() {
      validarInputs(
        {
          form: `#gesticular_${this.index_tabla_gen}`,
        },
        this.datoPulso,
        () => {
          let busqueda = [0, 1, 2].includes(
            parseInt(this.reg_recie.neonat.tabla_general[this.index_tabla_gen].gesticular)
          );
          if (busqueda) this.datoActitud();
          else {
            CON851("", "03", null, "error", "Error");
            this.datoGesticular();
          }
        }
      );
    },

    datoActitud() {
      validarInputs(
        {
          form: `#actitud_${this.index_tabla_gen}`,
        },
        this.datoGesticular,
        () => {
          let busqueda = [0, 1, 2].includes(
            parseInt(this.reg_recie.neonat.tabla_general[this.index_tabla_gen].actitud)
          );
          if (busqueda) this.datoRespiracion();
          else {
            CON851("", "03", null, "error", "Error");
            this.datoActitud();
          }
        }
      );
    },

    datoRespiracion() {
      validarInputs(
        {
          form: `#respiracion_${this.index_tabla_gen}`,
        },
        this.datoActitud,
        () => {
          let busqueda = [0, 1, 2].includes(
            parseInt(this.reg_recie.neonat.tabla_general[this.index_tabla_gen].respiracion)
          );
          if (busqueda) this.controlTablaGeneral();
          else {
            CON851("", "03", null, "error", "Error");
            this.datoRespiracion();
          }
        }
      );
    },

    controlTablaGeneral() {
      if (this.index_tabla_gen == 2) this.datoDrogas(0);
      else {
        this.index_tabla_gen += 1;
        this.datoTablaGeneral();
      }
    },

    datoDrogas(index) {
      if (index > 2) this.examenFisico("piel");
      else {
        validarInputs(
          {
            form: `#datoDroga_${index}`,
          },
          () => {
            if (index == 0) this.datoTablaGeneral();
            else {
              index -= 1;
              this.datoDrogas(index);
            }
          },
          () => {
            this.reg_recie.neonat.medica_usad[index].drogas =
              this.reg_recie.neonat.medica_usad[index].drogas.toUpperCase();
            this.leerDrogas(index);
          }
        );
      }
    },

    leerDrogas(index) {
      if (this.reg_recie.neonat.medica_usad[index].drogas.trim()) {
        let busqueda = this.array_drogas.find((e) => e.COD == this.reg_recie.neonat.medica_usad[index].drogas);
        if (busqueda) {
          index += 1;
          this.datoDrogas(index);
        } else {
          CON851("", "01", null, "error", "Error");
          this.datoDrogas(index);
        }
      } else {
        index += 1;
        this.datoDrogas(index);
      }
    },

    examenFisico(input) {
      POPUP(
        {
          titulo: "Respuesta",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.array_HCRN812,
          callback_f: () => {
            switch (input) {
              case "piel":
                this.datoDrogas(2);
                break;
              case "cabeza_cuell":
                this.examenFisico("piel");
                break;
              case "ojos_orl_pal_pabe_auri":
                this.examenFisico("cabeza_cuell");
                break;
              case "torax_coraz_pulm":
                this.examenFisico("ojos_orl_pal_pabe_auri");
                break;
              case "abdomen":
                this.examenFisico("torax_coraz_pulm");
                break;
              case "genitales":
                this.examenFisico("abdomen");
                break;
              case "ano_exam":
                this.examenFisico("genitales");
                break;
              case "osteomuscular":
                this.examenFisico("ano_exam");
                break;
              case "extremidades":
                this.examenFisico("osteomuscular");
                break;
            }
          },
          seleccion: this.reg_recie.exam_neon[input],
          teclaAlterna: true,
          id_input: `#${input}`,
        },
        (data) => {
          this.reg_recie.exam_neon[input] = data.COD;
          switch (input) {
            case "piel":
              this.examenFisico("cabeza_cuell");
              break;
            case "cabeza_cuell":
              this.examenFisico("ojos_orl_pal_pabe_auri");
              break;
            case "ojos_orl_pal_pabe_auri":
              this.examenFisico("torax_coraz_pulm");
              break;
            case "torax_coraz_pulm":
              this.examenFisico("abdomen");
              break;
            case "abdomen":
              this.examenFisico("genitales");
              break;
            case "genitales":
              this.examenFisico("ano_exam");
              break;
            case "ano_exam":
              this.examenFisico("osteomuscular");
              break;
            case "osteomuscular":
              this.examenFisico("extremidades");
              break;
            case "extremidades":
              this.index_estim = 0;
              setTimeout(() => {
                this.datosEstim();
              }, 200);
              break;
          }
        }
      );
    },

    datosEstim() {
      this.mostrar_estim = true;

      let input = "";
      switch (this.index_estim) {
        case 0:
          input = "text_piel";
          break;
        case 1:
          input = "forma_orej";
          break;
        case 2:
          input = "tamano_gland_mama";
          break;
        case 3:
          input = "forma_pezon";
          break;
        case 4:
          input = "pliegues_planta";
          break;
        default:
          this.index_estim = 0;
          input = "text_piel";
          break;
      }

      // obtener array de datos
      let array = this.get_array_estim;

      if (this.index_estim > 5) this.index_estim = 5;
      if (!this.estim_ed_gest_w[input].trim()) this.estim_ed_gest_w[input] = "1";

      // buscar imagen
      let busqueda = array.find((e) => e.COD == parseInt(this.estim_ed_gest_w[input]));

      if (busqueda) this.img_estim = busqueda.IMG;

      validarTabla(
        {
          tabla: "#tabla_estim",
          orden: parseInt(this.estim_ed_gest_w[input]) - 1,
          cambioFoco: (a) => {
            let dato = parseInt(a) + 1,
              busqueda = array.find((e) => e.COD == dato.toString());
            if (busqueda) this.img_estim = busqueda.IMG;
          },
          Esc: () => {
            if (this.index_estim == 0) {
              this.mostrar_estim = false;
              this.examenFisico("extremidades");
            } else {
              this.index_estim -= 1;
              this.datosEstim();
            }
          },
        },
        (data) => {
          this.estim_ed_gest_w[input] = data.cells[0].textContent.slice(0, 1);

          // cambio de valores segun imagenes
          switch (input) {
            case "text_piel":
              switch (this.estim_ed_gest_w[input]) {
                case "1":
                  this.reg_recie.estim_ed_gest[input] = "00";
                  break;
                case "2":
                  this.reg_recie.estim_ed_gest[input] = "05";
                  break;
                case "3":
                  this.reg_recie.estim_ed_gest[input] = "10";
                  break;
                case "4":
                  this.reg_recie.estim_ed_gest[input] = "15";
                  break;
                case "5":
                  this.reg_recie.estim_ed_gest[input] = "20";
                  break;
              }
              break;
            case "forma_orej":
              switch (this.estim_ed_gest_w[input]) {
                case "1":
                  this.reg_recie.estim_ed_gest[input] = "00";
                  break;
                case "2":
                  this.reg_recie.estim_ed_gest[input] = "08";
                  break;
                case "3":
                  this.reg_recie.estim_ed_gest[input] = "16";
                  break;
                case "4":
                  this.reg_recie.estim_ed_gest[input] = "24";
                  break;
              }
              break;
            case "tamano_gland_mama":
              switch (this.estim_ed_gest_w[input]) {
                case "1":
                  this.reg_recie.estim_ed_gest[input] = "00";
                  break;
                case "2":
                  this.reg_recie.estim_ed_gest[input] = "05";
                  break;
                case "3":
                  this.reg_recie.estim_ed_gest[input] = "10";
                  break;
                case "4":
                  this.reg_recie.estim_ed_gest[input] = "15";
                  break;
              }
              break;
            case "forma_pezon":
              switch (this.estim_ed_gest_w[input]) {
                case "1":
                  this.reg_recie.estim_ed_gest[input] = "00";
                  break;
                case "2":
                  this.reg_recie.estim_ed_gest[input] = "05";
                  break;
                case "3":
                  this.reg_recie.estim_ed_gest[input] = "10";
                  break;
                case "4":
                  this.reg_recie.estim_ed_gest[input] = "15";
                  break;
              }
              break;
            case "pliegues_planta":
              switch (this.estim_ed_gest_w[input]) {
                case "1":
                  this.reg_recie.estim_ed_gest[input] = "00";
                  break;
                case "2":
                  this.reg_recie.estim_ed_gest[input] = "05";
                  break;
                case "3":
                  this.reg_recie.estim_ed_gest[input] = "10";
                  break;
                case "4":
                  this.reg_recie.estim_ed_gest[input] = "15";
                  break;
                case "5":
                  this.reg_recie.estim_ed_gest[input] = "20";
                  break;
              }
              break;
          }

          if (this.index_estim < 4) {
            this.index_estim += 1;
            this.datosEstim(this.index_estim);
          } else {
            this.mostrar_estim = false;
            this.datoCalculoEdad();
          }
        },
        () => {
          this.datosEstim(0);
        },
        () => {
          this.datosEstim(array.length - 1);
        }
      );
    },

    datoCalculoEdad() {
      let t_min =
        parseInt(this.reg_recie.estim_ed_gest.text_piel) +
        parseInt(this.reg_recie.estim_ed_gest.forma_orej) +
        parseInt(this.reg_recie.estim_ed_gest.tamano_gland_mama) +
        parseInt(this.reg_recie.estim_ed_gest.forma_pezon) +
        parseInt(this.reg_recie.estim_ed_gest.pliegues_planta);

      switch (true) {
        case t_min >= 0 && t_min <= 2:
          this.reg_recie.estim_ed_gest.ed_gest_corr = "29";
          break;
        case t_min >= 3 && t_min <= 9:
          this.reg_recie.estim_ed_gest.ed_gest_corr = "30";
          break;
        case t_min >= 10 && t_min <= 16:
          this.reg_recie.estim_ed_gest.ed_gest_corr = "31";
          break;
        case t_min >= 17 && t_min <= 23:
          this.reg_recie.estim_ed_gest.ed_gest_corr = "32";
          break;
        case t_min >= 24 && t_min <= 30:
          this.reg_recie.estim_ed_gest.ed_gest_corr = "33";
          break;
        case t_min >= 31 && t_min <= 37:
          this.reg_recie.estim_ed_gest.ed_gest_corr = "34";
          break;
        case t_min >= 38 && t_min <= 44:
          this.reg_recie.estim_ed_gest.ed_gest_corr = "35";
          break;
        case t_min >= 45 && t_min <= 51:
          this.reg_recie.estim_ed_gest.ed_gest_corr = "36";
          break;
        case t_min >= 52 && t_min <= 58:
          this.reg_recie.estim_ed_gest.ed_gest_corr = "37";
          break;
        case t_min >= 59 && t_min <= 65:
          this.reg_recie.estim_ed_gest.ed_gest_corr = "38";
          break;
        case t_min >= 66 && t_min <= 72:
          this.reg_recie.estim_ed_gest.ed_gest_corr = "39";
          break;
        case t_min >= 73 && t_min <= 79:
          this.reg_recie.estim_ed_gest.ed_gest_corr = "40";
          break;
        case t_min >= 80 && t_min <= 86:
          this.reg_recie.estim_ed_gest.ed_gest_corr = "41";
          break;
        case t_min >= 87 && t_min <= 93:
          this.reg_recie.estim_ed_gest.ed_gest_corr = "42";
          break;
        case t_min >= 94:
          this.reg_recie.estim_ed_gest.ed_gest_corr = "43";
          break;
      }

      this.datoObservaciones();
    },

    datoObservaciones() {
      validarInputs(
        {
          form: "#observaciones",
        },
        () => {
          this.index_estim = 4;
          this.datosEstim();
        },
        () => {
          this.reg_recie.observaciones = this.reg_recie.observaciones.toUpperCase().replaceEsp();
          this.confirmar();
        }
      );
    },

    confirmar() {
      CON851P("01", this.datoObservaciones, this.grabar);
    },

    grabar() {
      loader("show");

      let datos = {
        datosh: datosEnvio(),
        ..._getObjetoSave(this.reg_recie, ["tabla_general", "medica_usad"]),
        llave_hc: this.hcprc.llave,
        llave_evo: this.reg_evo.LLAVE_EVO,
        med_evo: this.reg_evo.MEDICO,
        unserv_evo: this.reg_evo.UNSERV,
        temp_evo: this.reg_evo.SIGNOS_VITALES.TEMP,
        fcard_evo: this.reg_evo.SIGNOS_VITALES.F_CARD,
        fresp_evo: this.reg_evo.SIGNOS_VITALES.F_RESP,
        tens1_evo: this.reg_evo.SIGNOS_VITALES.TENS_1,
        tens2_evo: this.reg_evo.SIGNOS_VITALES.TENS_2,
        tens_media_evo: this.reg_evo.SIGNOS_VITALES.TENS_MEDIA,
        oximetria_evo: this.reg_evo.SIGNOS_VITALES.OXIMETRIA,
        tipo_evo: this.reg_evo.TIPO,
        edad_evo: this.reg_evo.RIPS.EDAD,
      };

      console.log(datos, "DATOS");
      postData(datos, get_url("APP/HICLIN/SAVE_RECIE.DLL"))
        .then((data) => {
          loader("hide");
          console.log(data);
          CON851("", "Grabado Correctamente", null, "success", "Completado");
          this.confirmarImprimir();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error intentando grabar", null, "error", "Error");
          this.datoObservaciones();
        });
    },

    confirmarImprimir() {
      CON851P("00", this.salir, this.imprimir);
    },

    imprimir() {
      const { imprimir_HCRNI } = require("../../frameworks/pdf/hiclin/HCRNI.formato.js");

      imprimir_HCRNI({
        hcprc: this.hcprc,
        admin_w: this.admin_w,
        llave_evo: this.reg_evo.LLAVE_EVO,
      });
    },

    leerRecie() {
      loader("show");
      return new Promise((resolve) => {
        let datos_envio = {
          datosh: datosEnvio(),
          llave_evo: this.reg_evo.LLAVE_EVO,
          admin_w: this.admin_w,
        };
        postData(datos_envio, get_url("app/HICLIN/GET_RECIE.DLL"))
          .then((data) => {
            loader("hide");
            this.reg_recie = data;
            resolve();
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error leyendo detalle", null, "error", "Error");
            this.datoFolio();
          });
      });
    },

    _ventanaDrogas(index) {
      _fin_validar_form();
      _ventanaDatos({
        titulo: "VENTANA CONSULTA DE FARMACOS",
        columnas: [
          { label: "Codigo", value: "COD" },
          { label: "Descripción", value: "DESCRIP" },
        ],
        data: this.array_drogas,
        callback_esc: () => {
          this.datoDrogas(index);
        },
        callback: (data) => {
          Vue.set(this.reg_recie.neonat.medica_usad[index], "drogas", data.COD);
          this.leerDrogas(index);
        },
      });
    },

    traerDrogas() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER809.DLL"))
        .then((data) => {
          this.array_drogas = data.FARMACOS;
          this.traerHistoriaClinica();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error leyendo farmacos", null, "error", "Error");
          _regresar_menuhis();
        });
    },

    confirmarSalir(call_esc) {
      CON851P("03", this[call_esc], this.salir);
    },

    salir() {
      loader("hide");
      _regresar_menuhis();
    },
  },
});
