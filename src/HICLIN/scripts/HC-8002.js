const { getObjRegHC, getSintomaticoRegHc } = require("../../HICLIN/scripts/reg_hc.js");

const { detallesHc, grabarDetalles, grabarDetallesText } = require("../../HICLIN/scripts/reg_dethc.js");

const { duration } = require("moment");
const { createTempUpdateFile } = require("electron-updater/out/DownloadedUpdateHelper");
const { parseUpdateInfo } = require("electron-updater/out/providers/Provider");

new Vue({
  el: "#HC-8002",
  data: {
    reg_hc: getObjRegHC(),
    reg_paci: JSON.parse(JSON.stringify($_REG_PACI)),
    reg_prof: {},

    ws2005: detallesHc.WS_2005() || {},
    ws8002: detallesHc.WS_8002() || {},

    detalleAnalisisHc: "",
    detallePlanHc: "",

    arrayUnserv: [],
    arrayEnfermedades: [],

    // DATOS POPUP
    opcCausa: _tipoJsonHc("causa"),
    opcTipoDiagn: _tipoJsonHc("tipo_diagnostico"),
    opcFinalid: _tipoJsonHc("finalid"),
    opcSalida: _tipoJsonHc("salida"),

    modal_victimaConf: false,

    opcEmbarazo: [
      { COD: "1", DESCRIP: "EMBARAZO PRIMER TRIMESTRE" },
      { COD: "2", DESCRIP: "EMBARAZO SEGUNDO TRIMESTRE" },
      { COD: "3", DESCRIP: "EMBARAZO TERCER TRIMESTRE" },
      { COD: "4", DESCRIP: "NO ESTA EMBARAZADA" },
    ],

    opcMetodoPlanificacion: [
      { COD: "1", DESCRIP: "DIU" },
      { COD: "2", DESCRIP: "ORAL" },
      { COD: "3", DESCRIP: "BARRERA" },
      { COD: "4", DESCRIP: "OTRO" },
      { COD: "5", DESCRIP: "NINGUNO" },
      { COD: "6", DESCRIP: "DIU + BARRERA" },
      { COD: "7", DESCRIP: "IMPL. SUBDERMICO" },
      { COD: "8", DESCRIP: "I.SUBDERM+BARRERA" },
      { COD: "9", DESCRIP: "ORAL + BARRERA" },
      { COD: "A", DESCRIP: "INYECTABLE MENSUAL" },
      { COD: "B", DESCRIP: "INYECTABLE+BARRERA" },
      { COD: "C", DESCRIP: "INYECTABLE TRIMEST" },
      { COD: "D", DESCRIP: "TRIMESTRAL+BERRERA" },
      { COD: "E", DESCRIP: "EMERGENCIA" },
      { COD: "F", DESCRIP: "EMERGENCIA+BARRERA" },
      { COD: "G", DESCRIP: "ESTERILIZACION" },
      { COD: "H", DESCRIP: "ESTERILIZA+BARRERA" },
      { COD: "I", DESCRIP: "NO USA X TRADICION" },
      { COD: "J", DESCRIP: "NO USA X SALUD" },
      { COD: "K", DESCRIP: "NO USA X NEGACION " },
      { COD: "L", DESCRIP: "COITUS INTERRUPTUS" },
      { COD: "M", DESCRIP: "METODO DEL RITMO" },
    ],

    opcResultUltCito: [
      { COD: "1", DESCRIP: "NORMAL" },
      { COD: "2", DESCRIP: "ANORMAL" },
      { COD: "3", DESCRIP: "NO SABE" },
    ],

    opcProcedCuelloUter: [
      { COD: "1", DESCRIP: "NO" },
      { COD: "2", DESCRIP: "CAUTERIZACION" },
      { COD: "3", DESCRIP: "CONIZACION" },
      { COD: "4", DESCRIP: "HISTERECTOMIA" },
      { COD: "5", DESCRIP: "DESCONOCE" },
      { COD: "6", DESCRIP: "BIOPSIA" },
      { COD: "7", DESCRIP: "RADIOTERAPIA" },
    ],

    opcAspectCuelloUter: [
      { COD: "1", DESCRIP: "AUSENTE" },
      { COD: "2", DESCRIP: "SANO" },
      { COD: "3", DESCRIP: "ATROFICO" },
      { COD: "4", DESCRIP: "CONGESTIVO" },
      { COD: "5", DESCRIP: "SANGRANTE" },
      { COD: "6", DESCRIP: "EROSIONADO/ULCERADO" },
      { COD: "7", DESCRIP: "POLIPO" },
      { COD: "8", DESCRIP: "LESION VISIBLE" },
    ],

    opcSiNo: [
      { COD: "1", DESCRIP: "SI" },
      { COD: "2", DESCRIP: "NO" },
      { COD: "3", DESCRIP: "NO SABE" },
    ],

    // VARIABLES LINKAGE
    admiLnk: localStorage.Usuario,
    paciLnk: $_REG_HC.llave_hc.slice(0, 15),
    folioLnk: $_REG_HC.llave_hc.slice(15),
    edadLnk: {
      unid: $_REG_HC.edad_hc.unid_edad,
      vlr: $_REG_HC.edad_hc.vlr_edad.toString().padStart(3, "0"),
    },
    medicoLnk: localStorage.IDUSU,
    servLnk: $_REG_HC.serv_hc,
    finalidLnk: $_REG_HC.finalid_hc,

    // VARIABLES GENERALES

    edadHcW: null,
    edadMaxW: null,
    edadMinW: null,

    anioAct: null,
    mesAct: null,
    diaAct: null,

    horaAct: null,
    minutoAct: null,

    anioPrimerVez: null,
    mesPrimerVez: null,
    diaPrimerVez: null,

    anioProxCita: null,
    mesProxCita: null,
    diaProxCita: null,

    anioRegla: null,
    mesRegla: null,
    diaRegla: null,

    anioUltCitologia: null,
    mesUltCitologia: null,
    diaUltCitologia: null,

    anioProcedCuello: null,
    mesProcedCuello: null,
    diaProcedCuello: null,

    anioProxCitologia: null,
    mesProxCitologia: null,
    diaProxCitologia: null,

    nit_usu: $_USUA_GLOBAL[0].NIT,

    llaveUltComp: null,

    paramsCovid: {
      estado: false,
      pregunta: 0,
      ciudades: [],
      paises: [],
    },

    covid19: {},

    paramsSintomatico: {
      estado: false,
      unserv: null,
      finalidad: null,
      sexo: null,
    },

    datosSintomatico: getSintomaticoRegHc(),
  },
  components: {
    covid19: component_hc890h,
    sintomaticos: component_hc890d,
  },
  created() {
    _vm = this;

    nombreOpcion("Formato citología Bethesda");
    loader("show");

    _inputControl("disabled");
    _inputControl("reset");
    this.init();
  },
  computed: {
    fechaAct() {
      return `${this.anioAct}${this.mesAct}${this.diaAct}`;
    },

    horaActual() {
      return `${this.horaAct}${this.minutoAct}`;
    },

    descripProf() {
      if (this.reg_prof.DESCRIP)
        return parseInt(this.reg_prof.IDENTIFICACION) + " - " + this.reg_prof.DESCRIP.replace(/\s+/g, " ");
      return "";
    },

    descripUnserv() {
      if (this.arrayUnserv.length) {
        let unserv = this.arrayUnserv.find((el) => el.COD == this.servLnk);
        return unserv ? unserv.DESCRIP.trim() : "";
      }
    },

    descripEmbarazo() {
      let embarazo = this.opcEmbarazo.find((el) => el.COD == this.reg_hc.rips.embarazo);
      return embarazo ? embarazo.DESCRIP : "";
    },

    descripMetPlanFam() {
      let metodo = this.opcMetodoPlanificacion.find((el) => el.COD == this.reg_hc.planific);
      return metodo ? metodo.DESCRIP : "";
    },

    descripResultUltCito() {
      let result = this.opcResultUltCito.find((el) => el.COD == this.ws8002.resultado_ult_cito);
      return result ? result.DESCRIP : "";
    },

    descripProcedCuello() {
      let proced = this.opcProcedCuelloUter.find((el) => el.COD == this.ws8002.proced_cuello);
      return proced ? proced.DESCRIP : "";
    },

    descripAspectoCuelloUter() {
      let aspecto = this.opcAspectCuelloUter.find((el) => el.COD == this.ws8002.aspecto_cuello);
      return aspecto ? aspecto.DESCRIP : "";
    },

    descripEts() {
      let ets = this.opcSiNo.find((el) => el.COD == this.ws8002.ets);
      return ets ? ets.DESCRIP : "";
    },

    fechaUltCitologia() {
      return `${
        this.anioUltCitologia.padStart(4, "0") +
        this.mesUltCitologia.padStart(2, "0") +
        this.diaUltCitologia.padStart(2, "0")
      }`;
    },

    fechaRegla() {
      return `${this.anioRegla.padStart(4, "0") + this.mesRegla.padStart(2, "0") + this.diaRegla.padStart(2, "0")}`;
    },

    fechaProcedCuello() {
      return `${
        this.anioProcedCuello.padStart(4, "0") +
        this.mesProcedCuello.padStart(2, "0") +
        this.diaProcedCuello.padStart(2, "0")
      }`;
    },

    fechaProxCitologia() {
      return `${
        this.anioProxCitologia.padStart(4, "0") +
        this.mesProxCitologia.padStart(2, "0") +
        this.diaProxCitologia.padStart(2, "0")
      }`;
    },

    fechaPrimerVez() {
      return `${
        this.anioPrimerVez.padStart(4, "0") + this.mesPrimerVez.padStart(2, "0") + this.diaPrimerVez.padStart(2, "0")
      }`;
    },

    fechaProxCita() {
      return `${
        this.anioProxCita.padStart(4, "0") + this.mesProxCita.padStart(2, "0") + this.diaProxCita.padStart(2, "0")
      }`;
    },

    descripCausaExterna() {
      let causa = this.opcCausa.find((el) => el.COD.trim() == this.reg_hc.rips.causa);
      return causa ? causa.DESCRIP : "";
    },

    descripTipoDiag() {
      let tipoDiagn = this.opcTipoDiagn.find((el) => el.COD.trim() == this.reg_hc.rips.tipo_diag);
      return tipoDiagn ? tipoDiagn.DESCRIP : "";
    },

    descripFinalid() {
      let finalid = this.opcFinalid.find((el) => el.COD.trim() == this.reg_hc.rips.finalid);
      return finalid ? finalid.DESCRIP : "";
    },

    descripSalida() {
      let salida = this.opcSalida.find((el) => el.COD.trim() == this.reg_hc.rips.estado_sal);
      return salida ? salida.DESCRIP : "";
    },

    descripDiagnMuerte() {
      let diagnMuerte = this.arrayEnfermedades.find((el) => el.COD_ENF.trim() == this.reg_hc.cierre.diag_muer);
      return diagnMuerte ? diagnMuerte.NOMBRE_ENF : "";
    },

    descripEstadioTanner() {
      return this.reg_paci.SEXO == "F" ? "Estadio mamario" : "Estadio genital";
    },
  },
  watch: {
    "ws8002.ets_cual": function (val) {
      this.ws8002.ets_cual = val ? val.replaceEsp() : "";
    },

    "ws8002.institucion_ult_cito": function (val) {
      this.ws8002.institucion_ult_cito = val ? val.replaceEsp() : "";
    },

    "ws8002.observaciones_cit": function (val) {
      this.ws8002.observaciones_cit = val ? val.replaceEsp() : "";
    },

    detalleAnalisisHc: function (val) {
      this.detalleAnalisisHc = val ? val.replaceEsp() : "";
    },

    detallePlanHc: function (val) {
      this.detallePlanHc = val ? val.replaceEsp() : "";
    },

    "reg_hc.rips.remitido": function (val) {
      this.reg_hc.rips.remitido = val ? val.replaceEsp() : "";
    },
  },
  methods: {
    init() {
      [this.anioAct, this.mesAct, this.diaAct] = moment().format("YYYY-MM-DD").split("-");
      [this.horaAct, this.minutoAct] = moment().format("HH-mm").split("-");

      switch (this.edadLnk.unid) {
        case "D":
          this.edadHcW = 1 + this.edadLnk.vlr;
          break;
        case "M":
          this.edadHcW = 2 + this.edadLnk.vlr;
          break;
        case "A":
          this.edadHcW = 3 + this.edadLnk.vlr;
          break;
        default:
          this.edadHcW = 0 + this.edadLnk.vlr;
          break;
      }
      this.getCiudades();
      this.getPaises();
      this.getEnfermedades();
      this.getUnserv();
    },

    getCiudades() {
      postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON809.DLL"))
        .then((data) => {
          console.log("getCiudades: ", data);
          this.paramsCovid.ciudades = data.CIUDAD;
        })
        .catch((error) => {
          console.log("Error consultando ciudades: ", error);
          CON851("", "Error consultando ciudades", null, "error", "Error");
          this.salir();
        });
    },

    getPaises() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER888.DLL"))
        .then((data) => {
          console.log("getPaises: ", data);
          this.paramsCovid.paises = data.PAISESRIPS;
        })
        .catch((error) => {
          console.log("Error consultando paises: ", error);
          CON851("", "Error consultando paises", null, "error", "Error");
          this.salir();
        });
    },

    getEnfermedades() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER851.DLL"))
        .then((data) => {
          console.log("getEnfermedades", data);
          this.arrayEnfermedades = data.ENFERMEDADES;
          this.arrayEnfermedades.pop();

          for (var i in this.arrayEnfermedades) {
            this.arrayEnfermedades[i].NOMBRE_ENF = this.arrayEnfermedades[i].NOMBRE_ENF.replace(/\�/g, "Ñ").trim();
          }
        })
        .catch((err) => {
          console.log("Error leyendo enfermedades: ", err);
          CON851("", "Error consultando enfermedades", null, "error", "Error");
          this.salir();
        });
    },

    getUnserv() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then((data) => {
          console.log("getUnserv", data);
          this.arrayUnserv = data.UNSERV;
          this.getProfesional();
        })
        .catch((error) => {
          loader("hide");
          console.log("error getUnserv", error);
          CON851("", "Error consultando unidades de servicio", null, "error", "Error");
          this.salir();
        });
    },

    getProfesional() {
      postData({ datosh: datosEnvio() + this.medicoLnk }, get_url("APP/SALUD/SAL719-01.DLL"))
        .then((data) => {
          console.log("getProfesional: ", data);

          this.reg_prof = data.PERSATI[0];

          if (!parseInt(this.reg_prof.IDENTIFICACION)) {
            CON851("9X", "9X", null, "error", "Error");
            this.salir();
          } else {
            this.getComprobante();
          }
        })
        .catch((error) => {
          loader("hide");
          console.log("error getProfesional", error);
          CON851("", "Error consultando datos profesional!", null, "error", "Error");
          this.salir();
        });
    },

    getComprobante() {
      if (
        this.servLnk == "02" ||
        this.servLnk == "08" ||
        (this.nit_usu == 900405505 && this.servLnk == "63") ||
        (this.servLnk == "01" && this.nit_usu == 892000458)
      ) {
        postData(
          {
            datosh:
              datosEnvio() +
              this.admiLnk +
              "|" +
              this.paciLnk +
              "|" +
              this.servLnk +
              "|" +
              moment().format("YYYYMMDD") +
              "|",
          },
          get_url("APP/HICLIN/HC811B.DLL")
        )
          .then((data) => {
            console.log("getComprobante", data);
            this.llaveUltComp = data;
            this.getHistoria();
          })
          .catch((error) => {
            loader("hide");
            console.log("Error getComprobante", error);
            CON851("", "Error consultando comprobante", null, "error", "Error");
            this.salir();
          });
      } else {
        this.getHistoria();
      }
    },

    getHistoria() {
      // MULTISALUD SE ASIGNA EL FOLIO Y SUCURSAL SEGUN LA SUCURSAL DEL COMPROBANTE
      if (this.nit_usu == 830511298) console.log("pendiente HC811A.DLL");

      postData(
        {
          datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + this.admiLnk + "|1|",
        },
        get_url("APP/HICLIN/GET_HC.DLL")
      )
        .then((data) => {
          loader("hide");

          this.reg_hc = data;

          this.anioPrimerVez = this.reg_hc.rips.fecha_1ra_vez.slice(0, 4);
          this.mesPrimerVez = this.reg_hc.rips.fecha_1ra_vez.slice(4, 6);
          this.diaPrimerVez = this.reg_hc.rips.fecha_1ra_vez.slice(6);

          this.anioProxCita = this.reg_hc.fecha_prox_cita.slice(0, 4);
          this.mesProxCita = this.reg_hc.fecha_prox_cita.slice(4, 6);
          this.diaProxCita = this.reg_hc.fecha_prox_cita.slice(6);

          if (this.reg_hc.novedad == "7") {
            this.reg_hc.fecha = this.fechaAct;
            this.reg_hc.hora = this.horaActual;
            this.reg_hc.serv = this.servLnk;
            this.reg_hc.esquema = "8002";
            this.reg_hc.cierre.clase = "0";
            this.reg_hc.rips.finalid = this.finalidLnk;
            this.reg_hc.rips.atiende = this.reg_prof.ATIENDE;
            this.reg_hc.med = this.reg_prof.IDENTIFICACION;
            this.reg_hc.oper_elab = this.admiLnk;
            this.reg_hc.cierre.unserv = this.reg_hc.serv;
            this.reg_hc.cierre.nit_fact = this.reg_paci["NIT-FACT"];

            this.reg_hc.unid_edad = this.edadLnk.unid;
            this.reg_hc.vlr_edad = this.edadLnk.vlr;
            this.reg_hc.cierre.nit_contabilidad = this.nit_usu;

            this.reg_hc.cierre.temporal = "1";

            this.grabarHcTemporal();
          } else {
            let fecha =
              this.reg_hc.fecha.slice(0, 4) + "/" + this.reg_hc.fecha.slice(4, 6) + "/" + this.reg_hc.fecha.slice(6);

            let temporal = this.reg_hc.cierre.temporal;
            jAlert(
              {
                titulo: "ATENCIÓN!",
                mensaje: `<b>Mensaje: </b> Este paciente ya tiene historia clínica abierta, con fecha ${fecha}. ${
                  temporal == "1" ? "No fue totalmente diligenciada." : ""
                }`,
              },
              () => {
                setTimeout(() => {
                  if (
                    this.admiLnk == "GEBC" ||
                    temporal == "1" ||
                    (this.nit_usu == 800037021 && this.admiLnk == "ADMI") ||
                    (this.nit_usu == 892000401 && this.admiLnk == "ADMI")
                  ) {
                    this.reg_hc.cierre.estado = "1";
                    this.getDetallesHistoria();
                  } else {
                    this.salir();
                  }
                });
              }
            );
          }
        })
        .catch((error) => {
          loader("hide");
          console.log("Error getHistoria: ", error);
          CON851("", "Error consultando datos Historia clínica", null, "error", "Error");
          this.salir();
        });
    },

    getDetallesHistoria() {
      loader("show");
      postData(
        {
          datosh: datosEnvio() + this.reg_hc.llave + "|||2005;8002;7501;7503|",
        },
        get_url("APP/HICLIN/HCDETAL_PRC.DLL")
      )
        .then((data) => {
          loader("hide");
          console.log("getDetallesHistoria: ", data);

          let det2005 = data.DETHC.find((el) => el["COD-DETHC"] == "2005");
          this.ws2005 = det2005 ? det2005.DETALLE : detallesHc.WS_2005();

          let det8002 = data.DETHC.find((el) => el["COD-DETHC"] == "8002");
          this.ws8002 = det8002 ? det8002.DETALLE : detallesHc.WS_8002();

          this.ws8002.observaciones_cit = this.ws8002.observaciones_cit.enterPut();

          let analisis = data.DETHC.find((el) => el["COD-DETHC"] == "7501");
          this.detalleAnalisisHc = analisis ? analisis.DETALLE.enterPut() : "";

          let plan = data.DETHC.find((el) => el["COD-DETHC"] == "7503");
          this.detallePlanHc = plan ? plan.DETALLE.enterPut() : "";

          this.anioRegla = this.ws8002.fecha_regla.slice(0, 4);
          this.mesRegla = this.ws8002.fecha_regla.slice(4, 6);
          this.diaRegla = this.ws8002.fecha_regla.slice(6);

          this.anioUltCitologia = this.ws8002.fecha_ult_cito.slice(0, 4);
          this.mesUltCitologia = this.ws8002.fecha_ult_cito.slice(4, 6);
          this.diaUltCitologia = this.ws8002.fecha_ult_cito.slice(6);

          this.anioProcedCuello = this.ws8002.fecha_proced_cuello.slice(0, 4);
          this.mesProcedCuello = this.ws8002.fecha_proced_cuello.slice(4, 6);
          this.diaProcedCuello = this.ws8002.fecha_proced_cuello.slice(6);

          this.anioProxCitologia = this.ws8002.fecha_prox_cito.slice(0, 4);
          this.mesProxCitologia = this.ws8002.fecha_prox_cito.slice(4, 6);
          this.diaProxCitologia = this.ws8002.fecha_prox_cito.slice(6);

          this.datoEmbarazada();
        })
        .catch((error) => {
          loader("hide");
          console.log("Error getDetallesHistoria: ", error);
          CON851("", "consultando detalles de historia!", null, "error", "Error");
          this.salir();
        });
    },

    datoEmbarazada() {
      if (
        this.reg_prof.ATIENDE == "1" &&
        (this.reg_prof.ESP1 == "340" ||
          this.reg_prof.ESP1 == "341" ||
          this.reg_prof.ESP2 == "340" ||
          this.reg_prof.ESP2 == "341")
      ) {
        if (
          this.reg_paci.SEXO == "F" &&
          this.edadLnk.unid == "A" &&
          parseInt(this.edadLnk.vlr) > 8 &&
          parseInt(this.edadLnk.vlr) < 55 &&
          this.reg_hc.serv == "01" &&
          (this.reg_hc.rips.embarazo == "1" || this.reg_hc.rips.embarazo == "2" || this.reg_hc.rips.embarazo == "3")
        ) {
          CON851("6E", "6E", null, "warning", "Advertencia");
        }
      }
      this.datoEmbarazo();
    },

    grabarHcTemporal() {
      let datos = {
        datosh: datosEnvio() + this.reg_hc.llave + "|" + this.admiLnk + "|" + this.reg_hc.novedad + "|",
        datos_basicos:
          this.reg_hc.fecha +
          "|" +
          this.reg_hc.hora +
          "|" +
          this.reg_hc.med +
          "|" +
          this.reg_hc.serv +
          "|" +
          `${this.reg_hc.unid_edad}${this.reg_hc.vlr_edad}` +
          "|" +
          this.reg_hc.edad_dias +
          "|" +
          this.reg_hc.esquema +
          "|" +
          this.reg_hc.cierre.clase +
          "|",
      };

      postData(datos, get_url("APP/HICLIN/SAVE_TEMP_HC.DLL"))
        .then((data) => {
          console.log("grabarHcTemporal: ", data);

          // TRIAGE
          if (this.reg_hc.serv == "01" || this.reg_hc.serv == "04") {
            console.log("triage");
            this.reg_hc.rips.embarazo = data.EMBARAZO;
            this.reg_hc.rips.triage = data.TRIAGE;
            this.reg_hc.rips.causa = data.CAUSA;
            this.reg_hc.rips.finalid = data.FINALID;
            this.reg_hc.rips.estado_sal = data.ESTADO_SAL;
            this.reg_hc.rips.remitido = data.REMITIDO;
            this.reg_hc.cierre.eps = data.EPS;
          }

          this.reg_hc.novedad = "8";

          this.datoEmbarazo();
        })
        .catch((error) => {
          console.log("Error grabarHcTemporal: ", error);
          CON851("", "Error grabando Historia temporal", null, "error", "Error");
          this.salir();
        });
    },

    datoEmbarazo() {
      if (this.reg_paci.SEXO == "M") {
        this.reg_hc.rips.embarazo = "9";
        this.datoAnioRegla();
      } else if (
        this.edadLnk.unid == "D" ||
        this.edadLnk.unid == "M" ||
        (this.edadLnk.unid == "A" && this.edadLnk.vlr < 10) ||
        (this.edadLnk.unid == "A" && this.edadLnk.vlr > 60)
      ) {
        this.reg_hc.rips.embarazo = "4";
        this.datoAnioRegla();
      } else {
        POPUP(
          {
            titulo: "CONDICION USUARIA",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            array: this.opcEmbarazo,
            seleccion: parseInt(this.reg_hc.rips.embarazo) || "4",
            callback_f: () => {
              CON851P("temp", this.datoEmbarazo, this.salir);
            },
          },
          (data) => {
            this.reg_hc.rips.embarazo = data.COD;
            this.datoAnioRegla();
          }
        );
      }
    },

    datoAnioRegla() {
      validarInputs(
        {
          form: "#datoAnioRegla",
          orden: "1",
        },
        () => {
          this.datoEmbarazo();
        },
        () => {
          if (!parseInt(this.anioRegla) && this.nit_usu == 844003225) {
            this.anioRegla = this.mesRegla = this.diaRegla = "";
            this.ws8002.fecha_regla = this.fechaRegla;
            this.datoPlanificacion();
          } else if (!parseInt(this.anioRegla) || parseInt(this.anioRegla) < 0) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioRegla();
          } else {
            this.anioRegla = this.anioRegla.padStart(4, "0");
            this.datoMesRegla();
          }
        }
      );
    },

    datoMesRegla() {
      validarInputs(
        {
          form: "#datoMesRegla",
          orden: "1",
        },
        () => {
          this.datoAnioRegla();
        },
        () => {
          if (parseInt(this.mesRegla) < 1 || parseInt(this.mesRegla) > 12) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoMesRegla();
          } else {
            this.mesRegla = this.mesRegla.padStart(2, "0");
            this.datoDiaRegla();
          }
        }
      );
    },

    datoDiaRegla() {
      validarInputs(
        {
          form: "#datoDiaRegla",
          orden: "1",
        },
        () => {
          this.datoMesRegla();
        },
        () => {
          this.diaRegla = this.diaRegla.padStart(2, "0");
          this.ws8002.fecha_regla = this.fechaRegla;

          if (
            !_validarFecha(this.anioRegla, this.mesRegla, this.diaRegla) ||
            parseInt(this.ws8002.fecha_regla) > parseInt(this.fechaAct)
          ) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioRegla();
          } else {
            this.datoPlanificacion();
          }
        }
      );
    },

    datoPlanificacion() {
      setTimeout(() => {
        POPUP(
          {
            titulo: "METODO PLANIFICACION",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            array: this.opcMetodoPlanificacion,
            seleccion: this.reg_hc.planific || "5",
            callback_f: () => this.datoDiaRegla(),
          },
          (data) => {
            this.reg_hc.planific = data.COD;
            this.datoGestaciones();
          }
        );
      }, 300);
    },

    datoGestaciones() {
      validarInputs(
        {
          form: "#datoGestaciones",
          orden: "1",
        },
        () => {
          this.datoPlanificacion();
        },
        () => {
          this.ws8002.gestaciones = this.ws8002.gestaciones.padStart(2, "0");
          if (!parseInt(this.ws8002.gestaciones)) {
            this.ws8002.gestaciones =
              this.ws8002.partos =
              this.ws8002.abortos =
              this.ws8002.cesareas =
              this.ws8002.nacidos_muertos =
              this.ws8002.nacidos_vivos =
                "0";
            this.datoEts();
          } else {
            this.datoPartos();
          }
        }
      );
    },

    datoPartos() {
      validarInputs(
        {
          form: "#datoPartos",
          orden: "1",
        },
        () => {
          this.datoGestaciones();
        },
        () => {
          this.ws8002.partos = this.ws8002.partos.padStart(2, "0");
          if (parseInt(this.ws8002.partos) > parseInt(this.ws8002.gestaciones)) {
            this.datoGestaciones();
          } else {
            this.datoCesareas();
          }
        }
      );
    },

    datoCesareas() {
      validarInputs(
        {
          form: "#datoCesareas",
          orden: "1",
        },
        () => {
          this.datoPartos();
        },
        () => {
          this.ws8002.cesareas = this.ws8002.cesareas.padStart(2, "0");

          if (parseInt(this.ws8002.partos) + parseInt(this.cesareas) == parseInt(this.ws8002.gestaciones)) {
            this.ws8002.abortos = "0";
            this.datoNaciMuertos();
          } else {
            this.datoAbortos();
          }
        }
      );
    },

    datoAbortos() {
      this.ws8002.abortos = (
        parseInt(this.ws8002.gestaciones) -
        parseInt(this.ws8002.partos) -
        parseInt(this.ws8002.cesareas)
      )
        .toString()
        .padStart(2, "0");

      if (this.ws8002.abortos < 0) {
        CON851("", "partos + cesareas supera el número de gestaciones", null, "warning", "Advertencia");
        this.ws8002.abortos = "";
        this.datoCesareas();
      } else this.datoNaciMuertos();
    },

    datoNaciMuertos() {
      validarInputs(
        {
          form: "#datoNaciMuertos",
          orden: "1",
        },
        () => {
          this.datoCesareas();
        },
        () => {
          this.ws8002.nacidos_muertos = this.ws8002.nacidos_muertos.padStart(2, "0");
          this.datoNaciVivos();
        }
      );
    },

    datoNaciVivos() {
      validarInputs(
        {
          form: "#datoNaciVivos",
          orden: "1",
        },
        () => {
          this.datoNaciMuertos();
        },
        () => {
          this.ws8002.nacidos_vivos = this.ws8002.nacidos_vivos.padStart(2, "0");
          this.datoEts();
        }
      );
    },

    datoEts() {
      setTimeout(() => {
        POPUP(
          {
            titulo: "ENFERMEDAD TRANS. SEXUAL",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            array: this.opcSiNo,
            seleccion: this.ws8002.ets || "3",
            callback_f: () => this.datoPartos(),
          },
          (data) => {
            this.ws8002.ets = data.COD;
            if (this.ws8002.ets == "1") {
              this.datoCualEts();
            } else {
              this.ws8002.ets_cual = "";
              this.datoPaciVictConflicto();
            }
          }
        );
      }, 300);
    },

    datoCualEts() {
      validarInputs(
        {
          form: "#datoCualEts",
          orden: "1",
        },
        () => {
          this.datoEts();
        },
        () => {
          this.datoPaciVictConflicto();
        }
      );
    },

    datoPaciVictConflicto() {
      setTimeout(() => {
        this.reg_hc.victi_conflicto_paci = $_REG_PACI["VICTI-CONFLICTO"].trim();
        this.modal_victimaConf = true;

        validarInputs(
          {
            form: "#datoPaciVictConflicto",
          },
          () => {
            this.modal_victimaConf = false;
            this.datoEts();
          },
          () => {
            this.modal_victimaConf = false;
            this.reg_hc.victi_conflicto_paci = this.reg_hc.victi_conflicto_paci.toUpperCase().trim();
            

            if (this.reg_hc.victi_conflicto_paci == "S" || this.reg_hc.victi_conflicto_paci == "N") {
              $_REG_PACI["VICTI-CONFLICTO"] = this.reg_hc.victi_conflicto_paci;
              this.datoPrimerCitologia();
            } else {
              CON851("03", "03", null, "warning", "Advertencia");
              this.datoPaciVictConflicto();
            }
          }
        );
      }, 300);
    },

    datoPrimerCitologia() {
      validarInputs(
        {
          form: "#datoPrimerCitologia",
          orden: "1",
        },
        () => {
          this.ws8002.ets == "1" ? this.datoCualEts() : this.datoEts();
        },
        () => {
          this.ws8002.primer_cito = this.ws8002.primer_cito.toUpperCase();

          switch (this.ws8002.primer_cito) {
            case "S":
              this.anioUltCitologia = this.mesUltCitologia = this.diaUltCitologia = "";
              this.ws8002.fecha_ult_cito = this.fechaUltCitologia;
              this.datoCualCancer();
              break;
            case "N":
              this.datoAnioUltCitologia();
              break;
            default:
              this.ws8002.primer_cito = "";
              this.datoPrimerCitologia();
              break;
          }
        }
      );
    },

    datoAnioUltCitologia() {
      validarInputs(
        {
          form: "#datoAnioUltCitologia",
          orden: "1",
        },
        () => {
          this.datoPrimerCitologia();
        },
        () => {
          if (!parseInt(this.anioUltCitologia)) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioUltCitologia();
          } else {
            this.anioUltCitologia = this.anioUltCitologia.padStart(4, "0");
            this.datoMesUltCitologia();
          }
        }
      );
    },

    datoMesUltCitologia() {
      validarInputs(
        {
          form: "#datoMesUltCitologia",
          orden: "1",
        },
        () => {
          this.datoAnioUltCitologia();
        },
        () => {
          if (parseInt(this.mesUltCitologia) < 1 || parseInt(this.mesUltCitologia) > 12) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoMesUltCitologia();
          } else {
            this.mesUltCitologia = this.mesUltCitologia.padStart(2, "0");
            this.datoDiaUltCitologia();
          }
        }
      );
    },

    datoDiaUltCitologia() {
      validarInputs(
        {
          form: "#datoDiaUltCitologia",
          orden: "1",
        },
        () => {
          this.datoMesUltCitologia();
        },
        () => {
          this.diaUltCitologia = this.diaUltCitologia.padStart(2, "0");
          this.ws8002.fecha_ult_cito = this.fechaUltCitologia;

          if (
            !_validarFecha(this.anioUltCitologia, this.mesUltCitologia, this.diaUltCitologia) ||
            parseInt(this.ws8002.fecha_ult_cito) > parseInt(this.fechaAct)
          ) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioUltCitologia();
          } else {
            this.datoInstitucionCito();
          }
        }
      );
    },

    datoInstitucionCito() {
      validarInputs(
        {
          form: "#datoInstitucionCito",
          orden: "1",
        },
        () => {
          this.datoDiaUltCitologia();
        },
        () => {
          this.datoResultCitologia();
        }
      );
    },

    datoResultCitologia() {
      setTimeout(() => {
        POPUP(
          {
            titulo: "RESULTADO CITOLOGÍA",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            array: this.opcResultUltCito,
            seleccion: parseInt(this.ws8002.resultado_ult_cito) || "3",
            callback_f: () => this.datoInstitucionCito(),
          },
          (data) => {
            this.ws8002.resultado_ult_cito = data.COD;
            this.datoCualCancer();
          }
        );
      }, 300);
    },

    datoCualCancer() {
      validarInputs(
        {
          form: "#datoCualCancer",
          orden: "1",
        },
        () => {
          this.datoPrimerCitologia();
        },
        () => {
          this.datoProcedCuelloUter();
        }
      );
    },

    datoProcedCuelloUter() {
      setTimeout(() => {
        POPUP(
          {
            titulo: "PROCEDIMIENTO CUELLO UTERINO",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            array: this.opcProcedCuelloUter,
            seleccion: parseInt(this.ws8002.proced_cuello) || "1",
            callback_f: () =>
              this.ws8002.primer_cito == "S" ? this.datoPrimerCitologia() : this.datoResultCitologia(),
          },
          (data) => {
            this.ws8002.proced_cuello = data.COD;
            if (this.ws8002.proced_cuello == "1") this.datoAspectCuelloUter();
            else this.datoAnioProcedCuelloUter();
          }
        );
      }, 300);
    },

    datoAnioProcedCuelloUter() {
      validarInputs(
        {
          form: "#datoAnioProcedCuelloUter",
          orden: "1",
        },
        () => {
          this.datoProcedCuelloUter();
        },
        () => {
          if (!parseInt(this.anioProcedCuello)) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioProcedCuelloUter();
          } else {
            this.anioProcedCuello = this.anioProcedCuello.padStart(4, "0");
            this.datoMesProcedCuelloUter();
          }
        }
      );
    },

    datoMesProcedCuelloUter() {
      validarInputs(
        {
          form: "#datoMesProcedCuelloUter",
          orden: "1",
        },
        () => {
          this.datoAnioProcedCuelloUter();
        },
        () => {
          if (parseInt(this.mesProcedCuello) < 1 || parseInt(this.mesProcedCuello) > 12) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoMesProcedCuelloUter();
          } else {
            this.mesProcedCuello = this.mesProcedCuello.padStart(2, "0");
            this.datoDiaProcedCuelloUter();
          }
        }
      );
    },

    datoDiaProcedCuelloUter() {
      validarInputs(
        {
          form: "#datoDiaProcedCuelloUter",
          orden: "1",
        },
        () => {
          this.datoMesProcedCuelloUter();
        },
        () => {
          this.diaProcedCuello = this.diaProcedCuello.padStart(2, "0");
          this.ws8002.fecha_proced_cuello = this.fechaProcedCuello;

          if (
            !_validarFecha(this.anioProcedCuello, this.mesProcedCuello, this.diaProcedCuello) ||
            this.ws8002.fecha_proced_cuello > this.fechaAct
          ) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioProcedCuelloUter();
          } else {
            this.datoAspectCuelloUter();
          }
        }
      );
    },

    datoAspectCuelloUter() {
      setTimeout(() => {
        POPUP(
          {
            titulo: "ASPECTO DEL CUELLO UTERINO",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            array: this.opcAspectCuelloUter,
            seleccion: parseInt(this.ws8002.aspecto_cuello) || "2",
            callback_f: () => this.datoDiaProcedCuelloUter(),
          },
          (data) => {
            this.ws8002.aspecto_cuello = data.COD;
            this.datoVPH();
          }
        );
      }, 300);
    },

    datoVPH() {
      validarInputs(
        {
          form: "#datoVPH",
          orden: "1",
        },
        () => {
          this.datoAspectCuelloUter();
        },
        () => {
          this.ws8002.vacunas_vph = this.ws8002.vacunas_vph.toUpperCase();

          if (this.ws8002.vacunas_vph == "S" || this.ws8002.vacunas_vph == "N") {
            this.datoDispareunia();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.ws8002.vacunas_vph = "";
            this.datoVPH();
          }
        }
      );
    },

    datoDispareunia() {
      validarInputs(
        {
          form: "#datoDispareunia",
          orden: "1",
        },
        () => {
          this.datoVPH();
        },
        () => {
          this.ws8002.dispareunia = this.ws8002.dispareunia.toUpperCase();

          if (this.ws8002.dispareunia == "S" || this.ws8002.dispareunia == "N") {
            this.datoObservaciones();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.ws8002.dispareunia = "";
            this.datoDispareunia();
          }
        }
      );
    },

    datoObservaciones() {
      validarInputs(
        {
          form: "#datoObservaciones",
          orden: "1",
        },
        () => {
          this.datoDispareunia();
        },
        () => {
          this.datoAnioProxCito();
        }
      );
    },

    datoAnioProxCito() {
      validarInputs(
        {
          form: "#datoAnioProxCito",
          orden: "1",
        },
        () => {
          this.datoObservaciones();
        },
        () => {
          if (parseInt(this.anioProxCitologia) < 1950) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioProxCito();
          } else if (parseInt(this.anioProxCitologia) == 0) {
            this.anioProxCitologia = this.mesProxCitologia = this.diaProxCitologia = "";
            this.ws8002.fecha_prox_cito = this.fechaProxCitologia;

            this.pasoCovid19();
          } else {
            this.anioProxCitologia = this.anioProxCitologia.padStart(4, "0");
            this.datoMesProxCito();
          }
        }
      );
    },

    datoMesProxCito() {
      validarInputs(
        {
          form: "#datoMesProxCito",
          orden: "1",
        },
        () => {
          this.datoAnioProxCito();
        },
        () => {
          if (parseInt(this.mesProxCitologia) < 1 || parseInt(this.mesProxCitologia) > 12) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoMesProxCito();
          } else {
            this.mesProxCitologia = this.mesProxCitologia.padStart(2, "0");
            this.datoDiaProxCito();
          }
        }
      );
    },

    datoDiaProxCito() {
      validarInputs(
        {
          form: "#datoDiaProxCito",
          orden: "1",
        },
        () => {
          this.datoMesProxCito();
        },
        () => {
          this.diaProxCitologia = this.diaProxCitologia.padStart(2, "0");
          this.ws8002.fecha_prox_cito = this.fechaProxCitologia;

          if (
            !_validarFecha(this.anioProxCitologia, this.mesProxCitologia, this.diaProxCitologia) ||
            parseInt(this.ws8002.fecha_prox_cito) < parseInt(this.fechaAct)
          ) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioProxCito();
          } else {
            this.pasoCovid19();
          }
        }
      );
    },

    validarEsc_covid(esc) {
      this.paramsCovid.estado = false;
      this.paramsCovid.pregunta = 0;

      switch (parseInt(esc)) {
        case 1:
          this.datoDiaProxCito();
          break;
      }
    },

    async pasoCovid19() {
      let serv = this.reg_hc.serv;
      if (serv == "01" || serv == "02" || serv == "08" || serv == "09" || serv == "63") {
        if (this.nit_usu == 900541158 && serv == "09") {
          this.reg_hc.covid19 = await getObjRegHC().covid19;
          this.grabarHistoriaClinica(this.datoDiaProxCito, this.pasoDiagnosticos);
        } else {
          this.covid19 = await { ...this.covid19, ...this.reg_hc.covid19 };
          this.paramsCovid.pregunta = 1;
          this.paramsCovid.estado = true;
        }
      } else {
        this.reg_hc.covid19 = getObjRegHC().covid19;
        this.grabarHistoriaClinica(this.datoDiaProxCito, this.pasoDiagnosticos);
      }
    },

    async validarCallback_covid(call, data) {
      this.reg_hc.covid19 = await { ...this.reg_hc.covid19, ...data };
      this.paramsCovid.pregunta = false;
      this.paramsCovid.estado = 0;

      this.grabarHistoriaClinica(this.datoDiaProxCito, this.pasoDiagnosticos);
    },

    async pasoDiagnosticos() {
      loader("hide");
      if (!this.arrayEnfermedades.length) {
        loader("show");
        await this.getEnfermedades();
        this.pasoDiagnosticos();
      } else {
        if (!this.reg_hc.rips.tabla_diagn.find((el) => el.cod_diagn == "Z124")) {
          let enfermedad = this.arrayEnfermedades.find((el) => el.COD_ENF == "Z124");
          let objDiag = enfermedad
            ? {
                cod_diagn: enfermedad.COD_ENF,
                descrip_diagn: enfermedad.NOMBRE_ENF,
              }
            : { cod_diagn: "", descrip_diagn: "" };

          Vue.set(
            this.reg_hc.rips.tabla_diagn,
            this.reg_hc.rips.tabla_diagn.findIndex((el) => el.cod_diagn == ""),
            objDiag
          );
        }
        this.validarCodDiagn(0);
      }
    },

    ventanaCodDiagn(index) {
      let input = `cod_diagn${index}`;

      _ventanaDatos({
        titulo: "Ventana enfermedades",
        columnas: ["COD_ENF", "NOMBRE_ENF"],
        data: this.arrayEnfermedades,
        ancho: "70%",
        callback_esc: () => {
          document.getElementById(input).focus();
        },
        callback: (data) => {
          Vue.set(this.reg_hc.rips.tabla_diagn, index, {
            cod_diagn: data.COD_ENF.trim(),
            descrip_diagn: data.NOMBRE_ENF.trim(),
          });
          setTimeout(() => _enterInput("#" + input), 100);
        },
      });
    },

    async validarCodDiagn(index = 0) {
      validarInputs(
        {
          form: `#validarCodDiagn${index}`,
          orden: "1",
          event_f3: () => {
            if (this.reg_hc.rips.tabla_diagn[0].cod_diagn && !this.reg_hc.rips.tabla_diagn[index].cod_diagn) {
              this.datoImprimirCovid();
            } else this.validarCodDiagn(index);
          },
        },
        () => {
          let currentDiagn = (this.reg_hc.rips.tabla_diagn[index].cod_diagn = this.reg_hc.rips.tabla_diagn[
            index
          ].cod_diagn
            .trim()
            .toUpperCase());

          let busqueda = this.arrayEnfermedades.find((el) => el.COD_ENF.trim() == currentDiagn);

          currentDiagn = busqueda
            ? {
                cod_diagn: busqueda.COD_ENF,
                descrip_diagn: busqueda.NOMBRE_ENF,
              }
            : { cod_diagn: "", descrip_diagn: "" };

          Vue.set(this.reg_hc.rips.tabla_diagn, index, currentDiagn);

          if (index == 0) {
            this.datoDiaProxCito();
          } else {
            this.validarCodDiagn(--index);
          }
        },
        async () => {
          this.reg_hc.rips.tabla_diagn[index].cod_diagn = this.reg_hc.rips.tabla_diagn[index].cod_diagn
            .trim()
            .toUpperCase();

          await this.validacionesDiagn(index)
            .then(() => {
              if (index < 9) {
                this.validarCodDiagn(++index);
              } else {
                if (this.reg_hc.rips.tabla_diagn[index - 1].cod_diagn.trim()) {
                  CON851("02", "02", null, "warning", "Advertencia");
                  this.validarCodDiagn(index - 1);
                } else this.datoImprimirCovid();
              }
            })
            .catch((error) => {
              this.reg_hc.rips.tabla_diagn[index].descrip_diagn = "";
              console.log("error validar diag", error);
              this.validarCodDiagn(index);
            });
        }
      );
    },

    validacionesDiagn(index) {
      return new Promise((resolve, reject) => {
        let serv = this.reg_hc.serv;

        let diagn = this.reg_hc.rips.tabla_diagn[index].cod_diagn;

        let enfTemp = JSON.parse(JSON.stringify(this.arrayEnfermedades[0]));

        for (let key in enfTemp) {
          enfTemp[key] = "";
        }

        if (index == 0) {
          if (
            (this.nit_usu == 800037979 || this.nit_usu == 900077520) &&
            diagn.slice(0, 1) == "Z" &&
            (serv == "01" || serv == "02")
          ) {
            CON851("03", "03", null, "warning", "Advertencia");
            reject();
          }

          if (this.nit_usu == 800037021 && diagn.slice(0, 1) == "R") {
            CON851("03", "03", null, "warning", "Advertencia");
            reject();
          }
        }

        if (diagn.trim()) {
          let busqueda = this.arrayEnfermedades.find((el) => el.COD_ENF.trim() == diagn);

          if (busqueda) {
            enfTemp = busqueda;

            Vue.set(this.reg_hc.rips.tabla_diagn, index, {
              cod_diagn: busqueda.COD_ENF,
              descrip_diagn: busqueda.NOMBRE_ENF,
            });
          } else {
            CON851("01", "01", null, "warning", "Advertencia");
            reject();
          }
        }

        if (enfTemp.HUERFA_ENF == "S") {
          CON851("G3", "G3", null, "warning", "Advertencia");
          reject();
        }

        if (index == 0 && serv == "08") {
          if (
            !(
              diagn.slice(0, 1) == "Z" ||
              diagn.slice(0, 2) == "E1" ||
              ["I10X", "I151", "I158", "I159", "O16X", "E782", "E784", "E785", "E119"].includes(diagn)
            )
          ) {
            CON851("G0", "G0", null, "warning", "Advertencia");
            reject();
          }
        }

        if (
          index == 0 &&
          !["02", "03", "06", "08", "63"].includes(serv) &&
          [
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
          ].find(diagn)
        ) {
          CON851("G1", "G1", null, "warning", "Advertencia");
          reject();
        }

        if (enfTemp.SEXO_ENF.trim() != "" && enfTemp.SEXO_ENF.trim() != this.reg_paci.SEXO) {
          CON851("73", "73", null, "warning", "Advertencia");
          reject();
        }

        this.editarEdad(enfTemp);

        if (
          (enfTemp.EDAD_MIN_ENF > 0 && this.edadHcW < this.edadMinW) ||
          (enfTemp.EDAD_MAX_ENF > 0 && this.edadHcW > this.edadMaxW)
        ) {
          CON851("74", "74", null, "warning", "Advertencia");
          reject();
        }

        resolve();
      });
    },

    datoImprimirCovid() {
      let filtro = [
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

      let result = false;
      this.reg_hc.rips.tabla_diagn.forEach((el) => (result = filtro.includes(el.cod_diagn.trim()) || result));

      if (result) {
        this.reg_hc.covid19.recomendacion_covid19 = "S";
        this.pasoSintomatico();
      } else {
        if (
          (this.nit_usu == 900541158 && this.reg_hc.serv == "09") ||
          !["01", "02", "08", "09", "63"].includes(this.reg_hc.serv)
        ) {
          this.reg_hc.covid19.recomendacion_covid19 = "N";
          this.pasoSintomatico();
        } else {
          setTimeout(() => {
            CON851P(
              "Desea imprimir recomendaciones de COVID-19",
              () => {
                this.reg_hc.covid19.recomendacion_covid19 = "N";
                this.pasoSintomatico();
              },
              () => {
                this.reg_hc.covid19.recomendacion_covid19 = "S";
                this.pasoSintomatico();
              }
            );
          }, 300);
        }
      }
    },

    validarEsc_sintomatico() {
      this.paramsSintomatico.estado = false;
      this.validarCodDiagn(0);
    },

    pasoSintomatico() {
      if (this.reg_prof.ATIENDE == "02" || this.reg_prof.ATIENDE == "06") {
        this.datosSintomatico = getSintomaticoRegHc();

        this.paramsSintomatico.unserv = this.reg_hc.cierre.unserv;
        this.paramsSintomatico.finalidad = this.reg_hc.rips.finalid;
        this.paramsSintomatico.sexo = this.reg_paci.SEXO;
        this.paramsSintomatico.estado = true;
      } else {
        this.reg_hc.signos = {
          ...this.reg_hc.signos,
          ...getSintomaticoRegHc(),
        };
        this.datoAnalisis();
      }
    },

    validarCallback_sintomatico(data) {
      console.log("validarCallback_sintomatico", data);

      this.reg_hc.signos = { ...this.reg_hc.signos, ...data };
      this.paramsSintomatico.estado = false;
      this.datoAnalisis();
    },

    datoAnalisis() {
      validarInputs(
        {
          form: "#datoAnalisis",
          orden: "1",
          event_f5: () => {
            setTimeout(() => {
              CON851P(
                "03",
                () => {
                  this.datoAnalisis();
                },
                () => {
                  this.salir();
                }
              );
            }, 300);
          },
        },
        () => {
          this.validarCodDiagn(0);
        },
        async () => {
          let analisis = await this.detalleAnalisisHc.enterReplace();
          await grabarDetallesText(analisis, this.reg_hc.llave + "7501");
          this.datoPlan();
        }
      );
    },

    datoPlan() {
      validarInputs(
        {
          form: "#datoPlan",
          orden: "1",
          event_f5: () => {
            setTimeout(() => {
              CON851P(
                "03",
                () => {
                  this.datoPlan();
                },
                () => {
                  this.salir();
                }
              );
            }, 300);
          },
        },
        () => {
          this.datoAnalisis(0);
        },
        async () => {
          let plan = await this.detallePlanHc.enterReplace();
          await grabarDetallesText(plan, this.reg_hc.llave + "7503");
          this.datoEstado();
        }
      );
    },

    datoEstado() {
      let embarazo = this.reg_hc.rips.embarazo;

      if (embarazo == "1" || embarazo == "2" || embarazo == "3") {
        this.datoCausa();
      } else if (this.reg_paci.SEXO == "M") {
        this.reg_hc.rips.embarazo = "9";
        this.datoCausa();
      } else if (
        this.edadLnk.unid == "D" ||
        this.edadLnk.unid == "M" ||
        (this.edadLnk.unid == "A" && parseInt(this.edadLnk.vlr) < 11)
      ) {
        this.reg_hc.rips.embarazo = "9";
        this.datoCausa();
      } else {
        setTimeout(() => {
          POPUP(
            {
              titulo: "CONDICION USUARIA",
              indices: [
                {
                  id: "COD",
                  label: "DESCRIP",
                },
              ],
              array: this.opcEmbarazo,
              seleccion: parseInt(this.reg_hc.rips.embarazo) || "4",
              callback_f: () => {
                this.validarCodDiagn(0);
              },
            },
            (data) => {
              this.reg_hc.rips.embarazo = data.COD;
              this.datoCausa();
            }
          );
        }, 300);
      }
    },

    datoCausa() {
      if (
        this.reg_hc.serv == "08" &&
        (this.nit_usu == 830511298 ||
          this.reg_hc.rips.causa == "00" ||
          (parseInt(this.reg_hc.rips.finalid) >= 0 && parseInt(this.reg_hc.rips.finalid) <= 90))
      ) {
        this.reg_hc.rips.causa = "15";
      }
      setTimeout(() => {
        POPUP(
          {
            titulo: "CAUSA EXTERNA",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            array: this.opcCausa,
            seleccion: parseInt(this.reg_hc.rips.causa) || "15",
            callback_f: this.datoEstado,
          },
          (data) => {
            let causa = (this.reg_hc.rips.causa = data.COD);
            let cod_diagn = this.reg_hc.rips.tabla_diagn[0].cod_diagn;

            if (["T781", "T782", "T783", "T784", "T788", "T789", "T803"].includes(cod_diagn)) {
              this.datoTipoDiagn();
            } else if (
              (causa == "13" || causa == "15") &&
              (cod_diagn.slice(0, 1) == "S" || cod_diagn.slice(0, 1) == "T")
            ) {
              CON851("7E", "7E", null, "warning", "Advertencia");
              this.datoCausa();
            } else this.datoTipoDiagn();
          }
        );
      }, 300);
    },

    datoTipoDiagn() {
      setTimeout(() => {
        POPUP(
          {
            titulo: "TIPO DE DIAGNOSTICO",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            array: this.opcTipoDiagn,
            seleccion: parseInt(this.reg_hc.rips.tipo_diag) || "1",
            callback_f: this.datoCausa,
          },
          (data) => {
            let tipo_diag = (this.reg_hc.rips.tipo_diag = data.COD);
            let filtro = ["K359", "K350", "K351", "K37X"];
            let result = false;

            for (i = 0; i < 5; i++) {
              result = filtro.includes(this.reg_hc.rips.tabla_diagn[i].cod_diagn) || result;
            }

            if (result && tipo_diag == "2") CON851("EF", "EF", null, "warning", "Advertencia");

            this.datoPrimerVez();
          }
        );
      }, 300);
    },

    datoPrimerVez() {
      validarInputs(
        {
          form: "#datoPrimerVez",
          orden: "1",
        },
        () => {
          this.datoTipoDiagn();
        },
        () => {
          this.reg_hc.rips.primera_vez = this.reg_hc.rips.primera_vez.toUpperCase();

          if (this.reg_hc.rips.primera_vez == "S" || this.reg_hc.rips.primera_vez == "N") {
            this.reg_hc.rips.primera_vez == "S" ? this.datoNroControl() : this.datoDiaPrimerVez();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.reg_hc.rips.primera_vez = "";
            this.datoPrimerVez();
          }
        }
      );
    },

    datoDiaPrimerVez() {
      validarInputs(
        {
          form: "#datoDiaPrimerVez",
          orden: "1",
        },
        () => {
          this.datoPrimerVez();
        },
        () => {
          this.diaPrimerVez = this.diaPrimerVez.padStart(2, "0");

          if (parseInt(this.diaPrimerVez) === 0) {
            this.diaPrimerVez = this.mesPrimerVez = this.anioPrimerVez = "";
            this.datoNroControl();
          } else if (parseInt(this.diaPrimerVez) > 31 || parseInt(this.diaPrimerVez) < 1) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoDiaPrimerVez();
          } else {
            this.datoMesPrimerVez();
          }
        }
      );
    },

    datoMesPrimerVez() {
      validarInputs(
        {
          form: "#datoMesPrimerVez",
          orden: "1",
        },
        () => {
          this.datoDiaPrimerVez();
        },
        () => {
          this.mesPrimerVez = this.mesPrimerVez.padStart(2, "0");

          if (parseInt(this.mesPrimerVez) < 1 || parseInt(this.mesPrimerVez) > 12) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoMesPrimerVez();
          } else this.datoAnioPrimerVez();
        }
      );
    },

    datoAnioPrimerVez() {
      validarInputs(
        {
          form: "#datoAnioPrimerVez",
          orden: "1",
        },
        () => {
          this.datoMesPrimerVez();
        },
        () => {
          this.anioPrimerVez = this.anioPrimerVez.padStart(4, "0");

          this.reg_hc.rips.fecha_1ra_vez = this.fechaPrimerVez;

          if (
            !_validarFecha(this.anioPrimerVez, this.mesPrimerVez, this.diaPrimerVez) ||
            parseInt(this.fechaPrimerVez) > parseInt(this.fechaAct) ||
            parseInt(this.fechaPrimerVez) == 0
          ) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoDiaPrimerVez();
          } else {
            this.datoNroControl();
          }
        }
      );
    },

    datoNroControl() {
      if (this.reg_hc.rips.finalid == "06") {
        if (this.reg_hc.rips.primera_vez == "S") {
          this.reg_hc.rips.nro_contr = "1";
          this.datoTannerPubico();
        } else {
          validarInputs(
            {
              form: "#datoNroControl",
              orden: "1",
            },
            () => {
              this.datoTipoDiagn();
            },
            () => {
              if (parseInt(this.reg_hc.rips.nro_contr) > 25) {
                CON851("", "Límite máximo 25", null, "warning", "Advertencia");
                this.datoNroControl();
              } else if (parseInt(this.reg_hc.rips.nro_contr) < 2) {
                CON851("", "No marco primera vez", null, "warning", "Advertencia");
                this.datoNroControl();
              } else this.datoTannerPubico();
            }
          );
        }
      } else {
        this.reg_hc.rips.nro_contr = "0";
        this.datoTannerPubico();
      }
    },

    datoTannerPubico() {
      if (this.reg_hc.rips.finalid == "05") {
        validarInputs(
          {
            form: "#datoTannerPubico",
            orden: "1",
          },
          () => {
            this.datoTipoDiagn();
          },
          () => {
            if (parseInt(this.reg_hc.signos.tanner_pubico) >= 0 && parseInt(this.reg_hc.signos.tanner_pubico) <= 5) {
              this.datoTannerGenital();
            } else {
              CON851("03", "03", null, "warning", "Advertencia");
              this.datoTannerPubico();
            }
          }
        );
      } else this.datoDiaProxCita();
    },

    datoTannerGenital() {
      if (this.reg_hc.rips.finalid == "05") {
        validarInputs(
          {
            form: "#datoTannerGenital",
            orden: "1",
          },
          () => {
            this.datoTannerPubico();
          },
          () => {
            if (parseInt(this.reg_hc.signos.tanner_genit) >= 0 && parseInt(this.reg_hc.signos.tanner_genit) <= 5) {
              this.datoDiaProxCita();
            } else {
              CON851("03", "03", null, "warning", "Advertencia");
              this.datoTannerGenital();
            }
          }
        );
      }
    },

    datoDiaProxCita() {
      if (this.reg_hc.serv == "08") {
        validarInputs(
          {
            form: "#datoDiaProxCita",
            orden: "1",
          },
          this.datoEstado,
          () => {
            this.diaProxCita = this.diaProxCita.padStart(2, "0");

            if (parseInt(this.diaProxCita) === 0) {
              this.diaProxCita = this.mesProxCita = this.anioProxCita = "";
              this.reg_hc.fecha_prox_cita = this.fechaProxCita;

              this.datoSalida();
            } else if (parseInt(this.diaProxCita) < 1 || parseInt(this.diaProxCita) > 31) {
              CON851("37", "37", null, "warning", "Advertencia");
              this.datoDiaProxCita();
            } else {
              this.datoMesProxCita();
            }
          }
        );
      } else {
        this.diaProxCita = this.mesProxCita = this.anioProxCita = "";
        this.reg_hc.fecha_prox_cita = this.fechaProxCita;
        this.datoSalida();
      }
    },

    datoMesProxCita() {
      validarInputs(
        {
          form: "#datoMesProxCita",
          orden: "1",
        },
        this.datoDiaProxCita,
        () => {
          this.mesProxCita = this.mesProxCita.padStart(2, "0");

          if (parseInt(this.mesProxCita) < 1 || parseInt(this.mesProxCita) > 12) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoMesProxCita();
          } else {
            this.datoAnioProxCita();
          }
        }
      );
    },

    datoAnioProxCita() {
      validarInputs(
        {
          form: "#datoAnioProxCita",
          orden: "1",
        },
        this.datoMesProxCita,
        () => {
          this.anioProxCita = this.anioProxCita.padStart(4, "0");

          this.reg_hc.fecha_prox_cita = this.fechaProxCita;

          if (
            !_validarFecha(this.anioProxCita, this.mesProxCita, this.diaProxCita) ||
            parseInt(this.anioProxCita) < parseInt(this.anioAct) ||
            parseInt(this.anioProxCita) > parseInt(this.anioAct) + 1 ||
            parseInt(this.reg_hc.fecha_prox_cita) < parseInt(this.fechaAct)
          ) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoDiaProxCita();
          } else {
            this.datoSalida();
          }
        }
      );
    },

    datoSalida() {
      POPUP(
        {
          titulo: "ESTADO SALIDA",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: this.opcSalida,
          seleccion: parseInt(this.reg_hc.rips.estado_sal) || "6",
          callback_f: this.datoTipoDiagn,
        },
        (data) => {
          let estado = (this.reg_hc.rips.estado_sal = data.COD);

          if (estado == "6" && !(this.reg_hc.rips.tabla_diagn[0].cod_diagn == "Z538")) {
            setTimeout(() => {
              this.datoSalida();
            }, 300);
          } else {
            if (this.reg_hc.serv == "02" || this.reg_hc.serv == "08") {
              if (estado == "4") this.reg_hc.cierre.unserv = "03";
              if (estado == "5") this.reg_hc.cierre.unserv = "05";

              this.datoRemitido();
            } else {
              this.datoRemitido();
            }
          }
        }
      );
    },

    datoRemitido() {
      if (this.reg_hc.rips.estado_sal == "3") {
        validarInputs(
          {
            form: "#datoRemitido",
            orden: "1",
          },
          this.datoSalida,
          () => {
            if (!this.reg_hc.rips.remitido.trim()) {
              CON851("02", "02", null, "warning", "Advertencia");
              this.datoRemitido();
            } else {
              this.datoDiagnMuerte();
            }
          }
        );
      } else {
        this.reg_hc.rips.remitido = "";
        this.datoDiagnMuerte();
      }
    },

    ventanaDiagnMuerte() {
      _ventanaDatos({
        titulo: "VENTANA DE ENFERMEDADES",
        columnas: ["COD_ENF", "NOMBRE_ENF"],
        data: this.arrayEnfermedades,
        callback_esc: function () {
          document.querySelector(`.diag_muer`).focus();
        },
        callback: (data) => {
          this.reg_hc.cierre.diag_muer = data["COD_ENF"].trim();
          setTimeout(() => {
            _enterInput(`.diag_muer`);
          }, 200);
        },
      });
    },

    datoDiagnMuerte() {
      if (this.reg_hc.rips.estado_sal == "2") {
        validarInputs(
          {
            form: "#datoDiagnMuerte",
            orden: "1",
          },
          this.datoSalida,
          () => {
            this.reg_hc.cierre.diag_muer = this.reg_hc.cierre.diag_muer.trim().toUpperCase();
            let diagnMuerte = null;

            return new Promise((resolve, reject) => {
              console.log("validar diagn muerte");
              diagnMuerte = this.reg_hc.cierre.diag_muer.trim();

              if (!diagnMuerte) {
                CON851("02", "02", null, "warning", "Advertencia");
                reject();
              }

              let enfermedad = this.arrayEnfermedades.find((el) => el.COD_ENF.trim() == diagnMuerte);

              if (!enfermedad) {
                CON851("01", "01", null, "warning", "Advertencia");
                reject();
              }

              this.editarEdad(enfermedad);

              if (enfermedad.SEXO_ENF.trim() && enfermedad.SEXO_ENF != this.reg_paci.SEXO) {
                CON851("73", "73", null, "warning", "Advertencia");
                reject();
              }

              if (
                (parseInt(enfermedad.EDAD_MIN_ENF) > 0 && parseInt(this.edadHcW) < parseInt(this.edadMinW)) ||
                (parseInt(enfermedad.EDAD_MAX_ENF) > 0 && parseInt(this.edadHcW) > parseInt(this.edadMaxW))
              ) {
                CON851("74", "74", null, "warning", "Advertencia");
                reject();
              }

              resolve();
            })
              .then(() => {
                console.log("then promise");
                if (diagnMuerte.slice(0, 1) == "X") {
                  SolicitarDll(
                    {
                      datosh: datosEnvio() + "|2|" + this.reg_hc.cierre.diag_muer,
                    },
                    (data) => {
                      let swInvalid = data.split("|")[0];
                      if (swInvalid == "93") {
                        CON851("93", "93", null, "warning", "Advertencia");
                        this.datoDiagnMuerte();
                      } else {
                        this.confirmar();
                      }
                    },
                    get_url("APP/SALUD/SER851A.DLL")
                  );
                } else {
                  this.confirmar();
                }
              })
              .catch(() => {
                this.datoDiagnMuerte();
              });
          }
        );
      } else {
        this.reg_hc.cierre.diag_muer = "";
        this.confirmar();
      }
    },

    confirmar() {
      console.log("confirmar");
      CON851P("01", this.datoEstado, () => {
        let serv = this.reg_hc.serv;

        if (parseInt(serv) > 2 && parseInt(serv) != 8) {
          this.reg_hc.cierre.estado = "1";
        } else if (this.nit_usu == 845800138) {
          if (serv == "02" && this.reg_hc.rips.estado_sal == "4") {
            this.reg_hc.cierre.estado = "1";
          } else {
            this.reg_hc.cierre.estado = "2";
            this.reg_hc.cierre.egreso = moment().format("YYYYMMDD");
            this.reg_hc.cierre.hora_egres = moment().format("HHmm");
          }
        } else {
          this.reg_hc.cierre.estado = "2";
          this.reg_hc.cierre.egreso = this.fechaAct;
        }

        if (this.reg_hc.cierre.estado == "2") {
          // LIBERAR-CAMA-HC
        }

        this.reg_hc.cierre.temporal = this.reg_hc.cierre.clase = "0";

        this.grabarHistoriaClinica(this.datoEstado, this.actualizarRipsFactura);
      });
    },

    async actualizarRipsFactura() {
      await postData(
        {
          datosh: datosEnvio() + this.llaveUltComp + "|",
          paso: "1",
        },
        get_url("APP/SALUD/SER448C.DLL")
      )
        .then(this.datoBuscarCitas())
        .catch((error) => {
          CON851("", "Ha ocurrido un error grabando último comprobante RIPS", null, "error", "Error");
          this.datoCausa();
        });
    },

    datoBuscarCitas() {
      postData(
        {
          datosh: datosEnvio() + this.reg_hc.fecha + "|" + this.reg_hc.med + "|" + this.reg_hc.llave.slice(0, 15) + "|",
        },
        get_url("APP/HICLIN/HC-101.DLL")
      )
        .then(this.datoFormulacion)
        .catch((error) => {
          console.log("Error marcando cita", error);
          setTimeout(() => {
            this.datoFormulacion();
          }, 300);
        });
    },

    datoFormulacion() {
      $_REG_HC.fecha_lnk = this.reg_hc.fecha;
      $_REG_HC.hora_lnk = this.reg_hc.hora;
      $_REG_HC.oper_lnk = this.admiLnk;
      $_REG_HC.opc_llamado = "1";
      $("#body_main").load("../../HICLIN/paginas/HC002F.html");
    },

    salir() {
      _regresar_menuhis();
    },

    grabarHistoriaClinica(callback, callbackSig) {
      loader("show");
      let datos = {
        datosh: datosEnvio() + this.reg_hc.llave + "|" + this.admiLnk + "|",
        ..._getObjetoSaveHc(this.reg_hc, filtroArray.tablasHC),
      };

      postData(datos, get_url("APP/HICLIN/SAVE_HC_2.DLL"))
        .then((data) => {
          console.log("Historia ok", data);
          CON851("", "Historia clínica grabada con exito", null, "success", "Success");

          let ws2005Temp = {};

          this.ws2005.tabla_organo.forEach((el, index) => {
            ws2005Temp[`reng_organo_cancer${(index + 1).toString().padStart(3, "0")}`] =
              this.ws2005.tabla_organo[index];
          });

          ws2005Temp.ant_canc_fam = this.ws2005.ant_canc_fam;

          let detalles = {
            8002: _getObjetoSaveHc(this.ws8002),
            2005: ws2005Temp,
          };

          grabarDetalles(detalles, this.reg_hc.llave)
            .then(() => {
              loader("hide");
              console.log("Detalles grabados correctamente.");
              callbackSig();
            })
            .catch(() => {
              callback();
            });
        })
        .catch((error) => {
          loader("hide");
          console.log("Error grabarHistoriaClinica: ", error);
          CON851("", "Error grabando Historia clínica", null, "error", "Error");
          callback();
        });
    },

    editarEdad(enfermedad) {
      switch (enfermedad.UNID_EDAD_ENF) {
        case "D":
          this.edadMinW = 1;
          this.edadMaxW = 1;
          break;
        case "M":
          this.edadMinW = 2;
          this.edadMaxW = 2;
          break;
        case "A":
          this.edadMinW = 3;
          this.edadMaxW = 3;
          break;
        default:
          this.edadMinW = 0;
          this.edadMaxW = 0;
          break;
      }

      this.edadMinW += enfermedad.EDAD_MIN_ENF.padStart(3, "0");
      this.edadMaxW += enfermedad.EDAD_MAX_ENF.padStart(3, "0");
    },
  },
});
