// COMPONENTE CAPTURA DATOS CREATININA METODO MDRD
// 29/01/2021 JAVIER.L
// 06/08/2021 JAVIER.L REESTRUCTURACION FLUJO PROGRAMA, SE AGREGA COMPONENTE INPUT-MAS-SC

const { getObjRegProf } = require("../../HICLIN/scripts/reg_prof");

module.exports = Vue.component("creatinina-hc890a", {
  props: {
    datos: {},
  },
  data() {
    return {
      reg_prof: getObjRegProf(),
      sexo_paci: $_REG_PACI.SEXO,
      nit_usu: $_USUA_GLOBAL[0].NIT,

      obj_creatinina: this.datos,

      fecha_creatinina: {},
      fecha_hemo_glicosilada: {},
      fecha_microalbuminuria: {},
      fecha_dx_erc: {},

      rela_albumi_creatini: null,

      array_riesgo_cardio: [
        { COD: "1", DESCRIP: "BAJO" },
        { COD: "2", DESCRIP: "MODERADO" },
        { COD: "3", DESCRIP: "ALTO" },
        { COD: "4", DESCRIP: "MUY ALTO" },
      ],
      array_erc: [
        { COD: "0", DESCRIP: "NO PRESENTA ERC" },
        { COD: "1", DESCRIP: "SI PRESENTA ERC" },
        { COD: "2", DESCRIP: "INDETERMINADO" },
        { COD: "3", DESCRIP: "NO ESTUDIADO PARA ERC" },
      ],

      stylesHC890A: {
        "flex-inputs": {
          display: "flex",
          "align-items": "center",
          "justify-content": "space-between",
          margin: "0 !important",
          "text-align": "start",
          padding: "1rem",
        },
        "wrapper-grid": {
          display: "grid",
          "grid-gap": "1rem",
          "grid-template-columns": "1fr",
        },
      },
    };
  },
  components: {
    inputMask: require("../../frameworks/scripts/INPUT-MASK-SC.vue.js"),
  },
  created() {
    _COMPH890A = this;
  },

  mounted() {
    this.fecha_creatinina = this.getObjDate(this.obj_creatinina.fecha_creatinina);
    this.fecha_hemo_glicosilada = this.getObjDate(this.obj_creatinina.hemo_glico_fecha);
    this.fecha_microalbuminuria = this.getObjDate(this.obj_creatinina.fecha_microalbuminuria);
    this.fecha_dx_erc = this.getObjDate(this.obj_creatinina.fecha_dx_erc);

    this.rela_albumi_creatini = `${this.obj_creatinina.rela_albumi_creatini_1}${this.obj_creatinina.rela_albumi_creatini_2}`;
    this.getProfesional();
  },

  computed: {
    TFG() {
      let TFG = 0;
      let edad = parseInt(this.obj_creatinina.edad || 0);
      let creatinina2 = parseFloat(this.obj_creatinina.creatinina2 || 0);
      let peso = parseFloat(this.obj_creatinina.peso || 0);

      if (!edad || !creatinina2 || !peso) return 0;

      if (this.sexo_paci == "F") {
        TFG = (((140 - edad) * peso) / (72 * creatinina2)) * 0.85;
      } else {
        TFG = ((140 - edad) * peso) / (72 * creatinina2);
      }
      return TFG !== Infinity ? TFG : 0;
    },
    descripRiesgoCardio() {
      let riesgo = this.array_riesgo_cardio.find((el) => el.COD == this.obj_creatinina.riesgo_cardio);
      return riesgo ? riesgo.DESCRIP : "";
    },
    descripERC() {
      let erc = this.array_erc.find((el) => el.COD == this.obj_creatinina.erc);
      return erc ? erc.DESCRIP : "";
    },
    descripEstadioErc() {
      let estadio_erc = this.obj_creatinina.estadio_erc || "";
      switch (estadio_erc.toString().trim()) {
        case "1":
          return "Paciente con TFGe igual o mayor a 90 ml/min y pruebas complementarias que soportan daño renal.";
        case "2":
          return "Paciente con TFGe entre 60 y menor de 90 ml/min y pruebas complementarias que soportan daño renal.";
        case "3A":
        case "3B":
          return "Paciente con TFGe entre 30 y menor de 60 ml/min.";
        case "4":
          return "Paciente con TFGe entre 15 y menor de 30 ml/min.";
        case "5":
          return "Paciente con TFGe menor de 15 ml/min o paciente en diálisis. ";
        default:
          return "";
      }
    },
  },
  watch: {
    TFG: function (val) {
      switch (true) {
        case val >= 90:
          this.obj_creatinina.estadio_erc = "1 ";
          break;
        case val >= 60 && val <= 89:
          this.obj_creatinina.estadio_erc = "2 ";
          break;
        case val >= 45 && val <= 59:
          this.obj_creatinina.estadio_erc = "3A";
          break;
        case val >= 30 && val <= 44:
          this.obj_creatinina.estadio_erc = "3B";
          break;
        case val >= 15 && val <= 29:
          this.obj_creatinina.estadio_erc = "4 ";
          break;
        default:
          this.obj_creatinina.estadio_erc = "5 ";
          break;
      }
    },
  },
  methods: {
    getObjDate(strDate) {
      strDate = strDate || 0;
      let date = {
        anio: "",
        mes: "",
        dia: "",
      };

      if (isFinite(strDate) && strDate.toString().length && parseInt(strDate)) {
        [date.anio, date.mes, date.dia] = moment(strDate, "YYYYMMDD").format("YYYY-MM-DD").split("-");
        return date;
      } else return date;
    },
    getStrDate(objDate = {}) {
      return Object.values(objDate).join("").padStart(8, "0");
    },
    getProfesional() {
      loader("show");
      postData({ datosh: datosEnvio(), cod_prof: $_REG_PROF.IDENTIFICACION }, get_url("APP/SALUD/GET_PROF.DLL"))
        .then((data) => {
          loader("hide");
          this.reg_prof = data.REG_PROF[0];

          if (this.reg_prof) {
            this.inicioHC890A();
          } else {
            CON851("", "Profesional no existe", null, "warning", "Advertencia");
            this.salir();
          }
        })
        .catch((err) => {
          loader("hide");
          console.error("Error consultando profesionales: ", err);
          CON851("", "consultando profesionales", null, "error", "Error");
          this.salir();
        });
    },
    inicioHC890A() {
      // validar si pregunta o no pregunta
      if (this.nit_usu == 800037021) {
        if (
          parseInt(this.obj_creatinina.unserv || 0) == 2 &&
          this.reg_prof.atiende == "1" &&
          this.reg_prof.tabla_esp.find((el) => el.esp.trim() == 387) &&
          this.obj_creatinina.tabla_diagn.find(
            (el) =>
              el.cod_diagn.trim().toUpperCase().startsWith("E1") ||
              el.cod_diagn.trim().toUpperCase().startsWith("I1") ||
              el.cod_diagn.trim().toUpperCase().startsWith("O24") ||
              el.cod_diagn.trim().toUpperCase().startsWith("P702")
          )
        )
          this.datoCreatininaHC890A();
        else this.$emit("callback", this.obj_creatinina);
      } else this.datoCreatininaHC890A();
    },

    datoCreatininaHC890A() {
      validarInputs(
        {
          form: "#datoCreatininaHC890A",
          orden: "1",
        },
        () => {
          this.$emit("callback_esc");
        },
        () => {
          if ([800037979, 900061048, 800037021, 900005594].includes(this.nit_usu) && !this.obj_creatinina.creatinina2) {
            CON851("02", "02", null, "warning", "Advertencia");
            this.datoCreatininaHC890A();
          } else {
            this.datoDiaCreatininaHC890A();
          }
        }
      );
    },

    datoDiaCreatininaHC890A() {
      if (parseFloat(this.obj_creatinina.creatinina2 || 0) == 0) {
        this.datoHemoGlicosiladaHC890A();
      } else {
        validarInputs(
          {
            form: "#datoDiaCreatininaHC890A",
          },
          () => {
            this.datoCreatininaHC890A();
          },
          () => {
            this.fecha_creatinina.dia = this.fecha_creatinina.dia.padStart(2, "0");

            if (parseInt(this.fecha_creatinina.dia) == 0) {
              this.fecha_creatinina = this.getObjDate();
              this.obj_creatinina.fecha_creatinina = this.getStrDate(this.fecha_creatinina);
              this.datoHemoGlicosiladaHC890A();
            } else if (parseInt(this.fecha_creatinina.dia) < 1 || parseInt(this.fecha_creatinina.dia) > 31) {
              CON851("37", "37", null, "error", "Error");
              this.datoDiaCreatininaHC890A();
            } else {
              this.datoMesCreatininaHC890A();
            }
          }
        );
      }
    },

    datoMesCreatininaHC890A() {
      validarInputs(
        {
          form: "#datoMesCreatininaHC890A",
        },
        () => {
          this.datoDiaCreatininaHC890A();
        },
        () => {
          this.fecha_creatinina.mes = this.fecha_creatinina.mes.padStart(2, "0");

          if (parseInt(this.fecha_creatinina.mes) < 1 || parseInt(this.fecha_creatinina.mes) > 12) {
            CON851("37", "37", null, "error", "Error");
            this.datoMesCreatininaHC890A();
          } else {
            this.datoAnioCreatininaHC890A();
          }
        }
      );
    },

    datoAnioCreatininaHC890A() {
      validarInputs(
        {
          form: "#datoAnioCreatininaHC890A",
        },
        () => {
          this.datoMesCreatininaHC890A();
        },
        () => {
          this.fecha_creatinina.anio = this.fecha_creatinina.anio.padStart(4, "0");
          if (
            parseInt(this.fecha_creatinina.anio) > parseInt(this.obj_creatinina.fecha.slice(0, 4)) ||
            !_validarFecha(...Object.values(this.fecha_creatinina))
          ) {
            CON851("37", "37", null, "error", "Error");
            this.datoDiaCreatininaHC890A();
          } else {
            this.obj_creatinina.fecha_creatinina = this.getStrDate(this.fecha_creatinina);
            this.datoHemoGlicosiladaHC890A();
          }
        }
      );
    },

    datoHemoGlicosiladaHC890A() {
      validarInputs(
        {
          form: "#datoHemoGlicosiladaHC890A",
          orden: "1",
        },
        () => {
          this.datoCreatininaHC890A();
        },
        () => {
          this.datoDiaHemoGlicosiladaHC890A();
        }
      );
    },

    datoDiaHemoGlicosiladaHC890A() {
      validarInputs(
        {
          form: "#datoDiaHemoGlicosiladaHC890A",
        },
        () => {
          this.datoHemoGlicosiladaHC890A();
        },
        () => {
          this.fecha_hemo_glicosilada.dia = this.fecha_hemo_glicosilada.dia.padStart(2, "0");

          if (parseInt(this.fecha_hemo_glicosilada.dia) == 0) {
            this.fecha_hemo_glicosilada = this.getObjDate();
            this.obj_creatinina.hemo_glico_fecha = this.getStrDate(this.fecha_hemo_glicosilada);
            this.datoMicroalbuminuriaHC890A();
          } else if (parseInt(this.fecha_hemo_glicosilada.dia) < 1 || parseInt(this.fecha_hemo_glicosilada.dia) > 31) {
            CON851("37", "37", null, "error", "Error");
            this.datoDiaHemoGlicosiladaHC890A();
          } else {
            this.datoMesHemoGlicosiladaHC890A();
          }
        }
      );
    },

    datoMesHemoGlicosiladaHC890A() {
      validarInputs(
        {
          form: "#datoMesHemoGlicosiladaHC890A",
        },
        () => {
          this.datoDiaHemoGlicosiladaHC890A();
        },
        () => {
          this.fecha_hemo_glicosilada.mes = this.fecha_hemo_glicosilada.mes.padStart(2, "0");

          if (parseInt(this.fecha_hemo_glicosilada.mes) < 1 || parseInt(this.fecha_hemo_glicosilada.mes) > 12) {
            CON851("37", "37", null, "error", "Error");
            this.datoMesHemoGlicosiladaHC890A();
          } else {
            this.datoAnioHemoGlicosiladaHC890A();
          }
        }
      );
    },

    datoAnioHemoGlicosiladaHC890A() {
      validarInputs(
        {
          form: "#datoAnioHemoGlicosiladaHC890A",
        },
        () => {
          this.datoMesHemoGlicosiladaHC890A();
        },
        () => {
          this.fecha_hemo_glicosilada.anio = this.fecha_hemo_glicosilada.anio.padStart(4, "0");

          if (
            parseInt(this.fecha_hemo_glicosilada.anio) > parseInt(this.obj_creatinina.fecha.slice(0, 4)) ||
            !_validarFecha(...Object.values(this.fecha_hemo_glicosilada))
          ) {
            CON851("37", "37", null, "error", "Error");
            this.datoDiaHemoGlicosiladaHC890A();
          } else {
            this.obj_creatinina.hemo_glico_fecha = this.getStrDate(this.fecha_hemo_glicosilada);
            this.datoMicroalbuminuriaHC890A();
          }
        }
      );
    },

    datoMicroalbuminuriaHC890A() {
      validarInputs(
        {
          form: "#datoMicroalbuminuriaHC890A",
        },
        () => {
          this.datoDiaHemoGlicosiladaHC890A();
        },
        () => {
          this.datoDiaMicroalbuminuriaHC890A();
        }
      );
    },

    datoDiaMicroalbuminuriaHC890A() {
      validarInputs(
        {
          form: "#datoDiaMicroalbuminuriaHC890A",
        },
        () => {
          this.datoMicroalbuminuriaHC890A();
        },
        () => {
          this.fecha_microalbuminuria.dia = this.fecha_microalbuminuria.dia.padStart(2, "0");

          if (parseInt(this.fecha_microalbuminuria.dia) == 0) {
            this.fecha_microalbuminuria = this.getObjDate();
            this.obj_creatinina.fecha_microalbuminuria = this.getStrDate(this.fecha_microalbuminuria);
            this.datoRiesgoCardioHC890A();
          } else if (parseInt(this.fecha_microalbuminuria.dia) < 1 || parseInt(this.fecha_microalbuminuria.dia) > 31) {
            CON851("37", "37", null, "error", "Error");
            this.datoDiaMicroalbuminuriaHC890A();
          } else {
            this.datoMesMicroalbuminuriaHC890A();
          }
        }
      );
    },

    datoMesMicroalbuminuriaHC890A() {
      validarInputs(
        {
          form: "#datoMesMicroalbuminuriaHC890A",
        },
        () => {
          this.datoDiaMicroalbuminuriaHC890A();
        },
        () => {
          this.fecha_microalbuminuria.mes = this.fecha_microalbuminuria.mes.padStart(2, "0");

          if (parseInt(this.fecha_microalbuminuria.mes) < 1 || parseInt(this.fecha_microalbuminuria.mes) > 12) {
            CON851("37", "37", null, "error", "Error");
            this.datoMesMicroalbuminuriaHC890A();
          } else {
            this.datoAnioMicroalbuminuriaHC890A();
          }
        }
      );
    },

    datoAnioMicroalbuminuriaHC890A() {
      validarInputs(
        {
          form: "#datoAnioMicroalbuminuriaHC890A",
        },
        () => {
          this.datoMesMicroalbuminuriaHC890A();
        },
        () => {
          this.fecha_microalbuminuria.anio = this.fecha_microalbuminuria.anio.padStart(4, "0");

          if (
            parseInt(this.fecha_microalbuminuria.anio) > parseInt(this.obj_creatinina.fecha.slice(0, 4)) ||
            !_validarFecha(...Object.values(this.fecha_microalbuminuria))
          ) {
            CON851("37", "37", null, "error", "Error");
            this.datoDiaMicroalbuminuriaHC890A();
          } else {
            this.obj_creatinina.fecha_microalbuminuria = this.getStrDate(this.fecha_microalbuminuria);
            this.datoRiesgoCardioHC890A();
          }
        }
      );
    },

    datoRiesgoCardioHC890A() {
      POPUP(
        {
          titulo: "RIESGO CARDIOVASCULAR",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: this.array_riesgo_cardio,
          seleccion: parseInt(this.obj_creatinina.riesgo_cardio) || "1",
          callback_f: this.datoDiaMicroalbuminuriaHC890A,
        },
        (data) => {
          this.obj_creatinina.riesgo_cardio = data.COD;
          this.datoRelAlbuminaCreatininaHC890A();
        }
      );
    },

    datoRelAlbuminaCreatininaHC890A() {
      validarInputs(
        {
          form: "#datoRelAlbuminaCreatininaHC890A",
        },
        () => {
          this.datoRiesgoCardioHC890A();
        },
        () => {
          this.rela_albumi_creatini = this.rela_albumi_creatini.padStart(7, "0");
          this.obj_creatinina.rela_albumi_creatini_1 = this.rela_albumi_creatini.slice(0, 1);
          this.obj_creatinina.rela_albumi_creatini_2 = this.rela_albumi_creatini.slice(1);

          this.datoErcHC890A();
        }
      );
    },

    datoErcHC890A() {
      POPUP(
        {
          titulo: "ERC",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: this.array_erc,
          seleccion: this.obj_creatinina.erc,
          callback_f: this.datoRelAlbuminaCreatininaHC890A,
        },
        (data) => {
          this.obj_creatinina.erc = data.COD;
          this.datoDiaDxErcHC890A();
        }
      );
    },

    datoDiaDxErcHC890A() {
      if (this.obj_creatinina.erc == 1) {
        validarInputs(
          {
            form: "#datoDiaDxErcHC890A",
          },
          () => {
            this.datoErcHC890A();
          },
          () => {
            this.fecha_dx_erc.dia = this.fecha_dx_erc.dia.padStart(2, "0");

            if (this.fecha_dx_erc.dia == 0) {
              this.fecha_dx_erc = this.getObjDate();
              this.obj_creatinina.fecha_dx_erc = this.getStrDate(this.fecha_dx_erc);
              this.terminar(this.datoDiaDxErcHC890A);
            } else if (this.fecha_dx_erc.dia < 1 || this.fecha_dx_erc.dia > 31) {
              CON851("37", "37", null, "error", "Error");
              this.datoDiaDxErcHC890A();
            } else {
              this.datoMesDxErcHC890A();
            }
          }
        );
      } else {
        this.terminar(this.datoErcHC890A);
      }
    },

    datoMesDxErcHC890A() {
      validarInputs(
        {
          form: "#datoMesDxErcHC890A",
        },
        () => {
          this.datoDiaDxErcHC890A();
        },
        () => {
          this.fecha_dx_erc.mes = this.fecha_dx_erc.mes.padStart(2, "0");

          if (this.fecha_dx_erc.mes < 1 || this.fecha_dx_erc.mes > 12) {
            CON851("37", "37", null, "error", "Error");
            this.datoMesDxErcHC890A();
          } else {
            this.datoAnioDxErcHC890A();
          }
        }
      );
    },

    datoAnioDxErcHC890A() {
      validarInputs(
        {
          form: "#datoAnioDxErcHC890A",
        },
        () => {
          this.datoMesDxErcHC890A();
        },
        () => {
          this.fecha_dx_erc.anio = this.fecha_dx_erc.anio.padStart(4, "0");

          if (
            !_validarFecha(...Object.values(this.fecha_dx_erc)) ||
            this.getStrDate(this.fecha_dx_erc) > parseInt(this.obj_creatinina.fecha)
          ) {
            CON851("37", "37", null, "error", "Error");
            this.datoDiaDxErcHC890A();
          } else {
            this.obj_creatinina.fecha_dx_erc = this.getStrDate(this.fecha_dx_erc);
            this.terminar(this.datoAnioDxErcHC890A);
          }
        }
      );
    },

    salir() {
      this.$emit("callback_esc");
    },

    terminar(callback) {
      CON851P(
        "01",
        () => {
          if (callback) callback();
          else this.inicioHC890A();
        },
        () => this.$emit("callback", this.obj_creatinina)
      );
    },
  },
  template: /*html*/ `
  <transition>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container col-lg-4 col-md-6 col-sm-10 col-xs-10">
          <div class="col-12 no-padding">
            <div class="portlet light box-center box-title">
              <div class="portlet-title">
                <div class="caption" style="width: 100%;">
                  <span class="caption-subject bold">
                    CREATININA - MÉTODO MDRD
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="form-group box-center col-md-12 no-padding"
            style="height: 100%; overflow: auto;"
          >
            <div class="col-12">
              <div class="col-md-12" :style="stylesHC890A['wrapper-grid']">
                <div
                  class="form-group box-center col-12"
                  :style="stylesHC890A['flex-inputs']"
                >
                  <label class="label-center col-md-8 col-sm-6 col-xs-6">
                    Creatinina
                  </label>
                  <div
                    class="input-group col-md-4 col-sm-6 col-xs-6"
                    id="datoCreatininaHC890A"
                  >
                    <input-mask-sc
                      :mask="{max: 99.99, scale: 2}"
                      :val="obj_creatinina.creatinina2"
                      @get_num="obj_creatinina.creatinina2 = $event"
                    />
                  </div>
                </div>
                <div
                  class="form-group box-center col-12"
                  :style="stylesHC890A['flex-inputs']"
                >
                  <label class="label-center col-md-6 col-sm-6 col-xs-6">
                    Fecha toma
                  </label>
                  <div
                    class="col-md-6 col-sm-6 col-xs-6 no-padding"
                    style="display: flex;"
                  >
                    <div id="datoDiaCreatininaHC890A">
                      <input
                        v-model="fecha_creatinina.dia"
                        type="number"
                        class="form-control center text-center"
                        data-orden="1"
                        maxlength="2"
                        disabled
                        placeholder="DD"
                      />
                    </div>
                    <div id="datoMesCreatininaHC890A">
                      <input
                        v-model="fecha_creatinina.mes"
                        type="number"
                        class="form-control center text-center"
                        data-orden="1"
                        maxlength="2"
                        disabled
                        placeholder="MM"
                      />
                    </div>
                    <div id="datoAnioCreatininaHC890A">
                      <input
                        v-model="fecha_creatinina.anio"
                        type="number"
                        class="form-control center text-center"
                        data-orden="1"
                        maxlength="4"
                        disabled
                        placeholder="AAAA"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="form-group box-center col-12"
                  :style="stylesHC890A['flex-inputs']"
                >
                  <label class="col-md-8 col-sm-6 col-xs-6">
                    Tasa de filtración glomerular
                  </label>
                  <div class="input-group col-md-4 col-sm-6 col-xs-6">
                    <input-mask-sc
                      :mask="{max: 9999.9, scale: 1}"
                      :val="TFG"
                    />
                  </div>
                </div>
                <div
                  class="form-group box-center col-12"
                  :style="stylesHC890A['flex-inputs']"
                >
                  <label class="label-center col-md-8 col-sm-6 col-xs-6">
                    Hemoglobina glicosilada
                  </label>
                  <div
                    id="datoHemoGlicosiladaHC890A"
                    class="input-group col-md-4 col-sm-6 col-xs-6"
                  >
                    <input-mask-sc
                      :mask="{max: 99.99, scale: 2}"
                      :val="obj_creatinina.hemo_glicosilada"
                      @get_num="obj_creatinina.hemo_glicosilada = $event"
                    />
                  </div>
                </div>
                <div
                  class="form-group box-center col-12"
                  :style="stylesHC890A['flex-inputs']"
                >
                  <label class="label-center col-md-6 col-sm-6 col-xs-6">
                    Fecha toma
                  </label>
                  <div
                    class="col-md-6 col-sm-6 col-xs-6 no-padding"
                    style="display: flex;"
                  >
                    <div id="datoDiaHemoGlicosiladaHC890A">
                      <input
                        v-model="fecha_hemo_glicosilada.dia"
                        type="number"
                        class="form-control center text-center"
                        data-orden="1"
                        maxlength="2"
                        disabled
                        placeholder="DD"
                      />
                    </div>
                    <div id="datoMesHemoGlicosiladaHC890A">
                      <input
                        v-model="fecha_hemo_glicosilada.mes"
                        type="number"
                        class="form-control center text-center"
                        data-orden="1"
                        maxlength="2"
                        disabled
                        placeholder="MM"
                      />
                    </div>
                    <div id="datoAnioHemoGlicosiladaHC890A">
                      <input
                        v-model="fecha_hemo_glicosilada.anio"
                        type="number"
                        class="form-control center text-center"
                        data-orden="1"
                        maxlength="4"
                        disabled
                        placeholder="AAAA"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="form-group box-center col-12"
                  :style="stylesHC890A['flex-inputs']"
                >
                  <label class="label-center col-md-8 col-sm-6 col-xs-6">
                    Microalbuminuria
                  </label>
                  <div
                    id="datoMicroalbuminuriaHC890A"
                    class="input-group col-md-4 col-sm-6 col-xs-6"
                  >
                    <input-mask-sc
                      :mask="{max: 999.99, scale: 2}"
                      :val="obj_creatinina.microalbuminuria"
                      @get_num="obj_creatinina.microalbuminuria = $event"
                    />
                  </div>
                </div>
                <div
                  class="form-group box-center col-12"
                  :style="stylesHC890A['flex-inputs']"
                >
                  <label class="label-center col-md-6 col-sm-6 col-xs-6">
                    Fecha toma
                  </label>
                  <div
                    class="col-md-6 col-sm-6 col-xs-6 no-padding"
                    style="display: flex;"
                  >
                    <div id="datoDiaMicroalbuminuriaHC890A">
                      <input
                        v-model="fecha_microalbuminuria.dia"
                        type="number"
                        class="form-control center text-center"
                        data-orden="1"
                        maxlength="2"
                        disabled
                        placeholder="DD"
                      />
                    </div>
                    <div id="datoMesMicroalbuminuriaHC890A">
                      <input
                        v-model="fecha_microalbuminuria.mes"
                        type="number"
                        class="form-control center text-center"
                        data-orden="1"
                        maxlength="2"
                        disabled
                        placeholder="MM"
                      />
                    </div>
                    <div id="datoAnioMicroalbuminuriaHC890A">
                      <input
                        v-model="fecha_microalbuminuria.anio"
                        type="number"
                        class="form-control center text-center"
                        data-orden="1"
                        maxlength="4"
                        disabled
                        placeholder="AAAA"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="form-group box-center col-12"
                  :style="stylesHC890A['flex-inputs']"
                >
                  <label class="label-center col-md-8 col-sm-6 col-xs-6">
                    Riesgo cardiovascular
                  </label>
                  <div class="input-group col-md-4 col-sm-6 col-xs-6">
                    <input
                      :value="descripRiesgoCardio"
                      type="text"
                      class="form-control center text-center"
                      data-orden="1"
                      disabled
                    />
                  </div>
                </div>
                <div
                  class="form-group box-center col-12"
                  :style="stylesHC890A['flex-inputs']"
                >
                  <label class="label-center col-md-8 col-sm-6 col-xs-6">
                    Relación albumina/creatinina
                  </label>
                  <div
                    id="datoRelAlbuminaCreatininaHC890A"
                    class="input-group col-md-4 col-sm-6 col-xs-6"
                  >
                    <input-mask-sc
                      :mask="{max: 9999.99, scale: 2, thousandsSeparator: ''}"
                      :val="rela_albumi_creatini"
                      @get_num="rela_albumi_creatini = $event"
                    />
                  </div>
                </div>
                <div
                  class="form-group box-center col-12"
                  :style="stylesHC890A['flex-inputs']"
                >
                  <label class="label-center col-md-8 col-sm-6 col-xs-6">
                    ERC
                  </label>
                  <div class="input-group col-md-4 col-sm-6 col-xs-6">
                    <input
                      :value="descripERC"
                      type="text"
                      class="form-control center text-center"
                      data-orden="1"
                      disabled
                    />
                  </div>
                </div>
                <div
                  class="form-group box-center col-12"
                  :style="stylesHC890A['flex-inputs']"
                >
                  <label class="label-center col-md-6 col-sm-6 col-xs-6">
                    Fecha DX ERC
                  </label>
                  <div
                    class="col-md-6 col-sm-6 col-xs-6 no-padding"
                    style="display: flex;"
                  >
                    <div id="datoDiaDxErcHC890A">
                      <input
                        v-model="fecha_dx_erc.dia"
                        type="number"
                        class="form-control center text-center"
                        data-orden="1"
                        maxlength="2"
                        disabled
                        placeholder="DD"
                      />
                    </div>
                    <div id="datoMesDxErcHC890A">
                      <input
                        v-model="fecha_dx_erc.mes"
                        type="number"
                        class="form-control center text-center"
                        data-orden="1"
                        maxlength="2"
                        disabled
                        placeholder="MM"
                      />
                    </div>
                    <div id="datoAnioDxErcHC890A">
                      <input
                        v-model="fecha_dx_erc.anio"
                        type="number"
                        class="form-control center text-center"
                        data-orden="1"
                        maxlength="4"
                        disabled
                        placeholder="AAAA"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="form-group box-center col-12"
                  :style="stylesHC890A['flex-inputs']"
                >
                  <label class="label-center col-md-8 col-sm-6 col-xs-6">
                    Estadio ERC
                  </label>
                  <div class="input-group col-md-4 col-sm-6 col-xs-6">
                    <input
                      :value="obj_creatinina.estadio_erc"
                      type="text"
                      class="form-control center text-center"
                      data-orden="1"
                      disabled
                    />
                  </div>
                </div>
                <div
                  class="form-group box-center col-12"
                  :style="stylesHC890A['flex-inputs']"
                >
                  <div class="input-group col-md-12 col-sm-12 col-xs-12">
                    <textarea
                      :value="descripEstadioErc"
                      class="form-control center text-center"
                      data-orden="1"
                      disabled
                      style="resize: none; text-align: justify"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
    `,
});
