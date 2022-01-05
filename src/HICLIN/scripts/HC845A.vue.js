const { detallesHc, grabarDetalles } = require("../../HICLIN/scripts/reg_dethc.js");

// componente detalle 2002 estructura 02 - santiago franco
// se tiene que enviar la llave de la historia y la unidad de servicio de la historia en params

module.exports = Vue.component("content_hc845a", {
  props: {
    params: {},
  },
  data() {
    return {
      dato_2002_2: detallesHc.WS_2002_2(),

      detalle: [],

      stylesHc845a: {
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
    };
  },
  watch: {

    'dato_2002_2.parent_asma': function (val) {
      this.dato_2002_2.parent_asma = val ? val.replaceEsp() : ''
    },

    'dato_2002_2.parent_alergias': function (val) {
      this.dato_2002_2.parent_alergias = val ? val.replaceEsp() : ''
    },

    'dato_2002_2.parent_tension': function (val) {
      this.dato_2002_2.parent_tension = val ? val.replaceEsp() : ''
    },

    'dato_2002_2.parent_cardiopulmonar': function (val) {
      this.dato_2002_2.parent_cardiopulmonar = val ? val.replaceEsp() : ''
    },

    'dato_2002_2.parent_diabetes': function (val) {
      this.dato_2002_2.parent_diabetes = val ? val.replaceEsp() : ''
    },

    'dato_2002_2.parent_cancer': function (val) {
      this.dato_2002_2.parent_cancer = val ? val.replaceEsp() : ''
    },

    'dato_2002_2.parent_tuberculosis': function (val) {
      this.dato_2002_2.parent_tuberculosis = val ? val.replaceEsp() : ''
    },

    'dato_2002_2.parent_sifilis': function (val) {
      this.dato_2002_2.parent_sifilis = val ? val.replaceEsp() : ''
    },

    'dato_2002_2.parent_epilepsia': function (val) {
      this.dato_2002_2.parent_epilepsia = val ? val.replaceEsp() : ''
    },

    'dato_2002_2.parent_distrofia': function (val) {
      this.dato_2002_2.parent_distrofia = val ? val.replaceEsp() : ''
    },

    'dato_2002_2.parent_enfer_mental': function (val) {
      this.dato_2002_2.parent_enfer_mental = val ? val.replaceEsp() : ''
    },

    'dato_2002_2.parent_anom_congenita': function (val) {
      this.dato_2002_2.parent_anom_congenita = val ? val.replaceEsp() : ''
    },

    'dato_2002_2.otros': function (val) {
      this.dato_2002_2.otros = val ? val.replaceEsp() : ''
    },
  },
  created() {
    $this = this;
    this.cargarDestalles();
  },
  methods: {
    dato_asma() {
      this.dato_2002_2.patol_asma.trim() == "" ? (this.dato_2002_2.patol_asma = "N") : false;
      validarInputs(
        {
          form: "#patol_asma_2",
        },
        () => {
          this._escape();
        },
        () => {
          this.dato_2002_2.patol_asma = this.dato_2002_2.patol_asma.toUpperCase();
          var temp = this.dato_2002_2.patol_asma;
          if (temp == "S") {
            this.dato_parentAsma();
          } else if (temp == "N") {
            this.dato_2002_2.parent_asma = '';
            this.dato_alergias();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_asma();
          }
        }
      );
    },

    dato_parentAsma() {
      validarInputs(
        {
          form: "#parent_asma_2",
        },
        () => {
          this.dato_asma();
        },
        () => {
          this.dato_2002_2.parent_asma = this.dato_2002_2.parent_asma.toUpperCase();
          var temp = this.dato_2002_2.parent_asma;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentAsma();
          } else {
            this.dato_alergias();
          }
        }
      );
    },

    dato_alergias() {
      this.dato_2002_2.patol_alergias.trim() == "" ? (this.dato_2002_2.patol_alergias = "N") : false;
      validarInputs(
        {
          form: "#patol_alergias_2",
        },
        () => {
          this.dato_asma();
        },
        () => {
          this.dato_2002_2.patol_alergias = this.dato_2002_2.patol_alergias.toUpperCase();
          var temp = this.dato_2002_2.patol_alergias;
          if (temp == "S") {
            this.dato_parentAlergias();
          } else if (temp == "N") {
            this.dato_2002_2.parent_alergias = '';
            this.dato_tensionArte();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_alergias();
          }
        }
      );
    },

    dato_parentAlergias() {
      validarInputs(
        {
          form: "#parent_alergias_2",
        },
        () => {
          this.dato_alergias();
        },
        () => {
          this.dato_2002_2.parent_alergias = this.dato_2002_2.parent_alergias.toUpperCase();
          var temp = this.dato_2002_2.parent_alergias;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentAlergias();
          } else {
            this.dato_tensionArte();
          }
        }
      );
    },

    dato_tensionArte() {
      this.dato_2002_2.patol_tension.trim() == "" ? (this.dato_2002_2.patol_tension = "N") : false;
      validarInputs(
        {
          form: "#patol_tension_2",
        },
        () => {
          this.dato_alergias();
        },
        () => {
          this.dato_2002_2.patol_tension = this.dato_2002_2.patol_tension.toUpperCase();
          var temp = this.dato_2002_2.patol_tension;
          if (temp == "S") {
            this.dato_parentTensionArte();
          } else if (temp == "N") {
            this.dato_2002_2.parent_tension = '';
            this.dato_cardiopulmonar();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_tensionArte();
          }
        }
      );
    },

    dato_parentTensionArte() {
      validarInputs(
        {
          form: "#parent_tension_2",
        },
        () => {
          this.dato_tensionArte();
        },
        () => {
          this.dato_2002_2.parent_tension = this.dato_2002_2.parent_tension.toUpperCase();
          var temp = this.dato_2002_2.parent_tension;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentTensionArte();
          } else {
            this.dato_cardiopulmonar();
          }
        }
      );
    },

    dato_cardiopulmonar() {
      this.dato_2002_2.patol_cardiopulmonar.trim() == "" ? (this.dato_2002_2.patol_cardiopulmonar = "N") : false;
      validarInputs(
        {
          form: "#patol_cardiopulmonar_2",
        },
        () => {
          this.dato_tensionArte();
        },
        () => {
          this.dato_2002_2.patol_cardiopulmonar = this.dato_2002_2.patol_cardiopulmonar.toUpperCase();
          var temp = this.dato_2002_2.patol_cardiopulmonar;
          if (temp == "S") {
            this.dato_parentCardiopulmonar();
          } else if (temp == "N") {
            this.dato_2002_2.parent_cardiopulmonar = '';
            this.dato_diabetes();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_cardiopulmonar();
          }
        }
      );
    },

    dato_parentCardiopulmonar() {
      validarInputs(
        {
          form: "#parent_cardiopulmonar_2",
        },
        () => {
          this.dato_cardiopulmonar();
        },
        () => {
          this.dato_2002_2.parent_cardiopulmonar = this.dato_2002_2.parent_cardiopulmonar.toUpperCase();
          var temp = this.dato_2002_2.parent_cardiopulmonar;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentCardiopulmonar();
          } else {
            this.dato_diabetes();
          }
        }
      );
    },

    dato_diabetes() {
      this.dato_2002_2.patol_diabetes.trim() == "" ? (this.dato_2002_2.patol_diabetes = "N") : false;
      validarInputs(
        {
          form: "#patol_diabetes_2",
        },
        () => {
          this.dato_cardiopulmonar();
        },
        () => {
          this.dato_2002_2.patol_diabetes = this.dato_2002_2.patol_diabetes.toUpperCase();
          var temp = this.dato_2002_2.patol_diabetes;
          if (temp == "S") {
            this.dato_parentDiabetes();
          } else if (temp == "N") {
            this.dato_2002_2.parent_diabetes = '';
            this.dato_cancer();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_diabetes();
          }
        }
      );
    },

    dato_parentDiabetes() {
      validarInputs(
        {
          form: "#parent_diabetes_2",
        },
        () => {
          this.dato_diabetes();
        },
        () => {
          this.dato_2002_2.parent_diabetes = this.dato_2002_2.parent_diabetes.toUpperCase();
          var temp = this.dato_2002_2.parent_diabetes;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentDiabetes();
          } else {
            this.dato_cancer();
          }
        }
      );
    },

    dato_cancer() {
      this.dato_2002_2.patol_cancer.trim() == "" ? (this.dato_2002_2.patol_cancer = "N") : false;
      validarInputs(
        {
          form: "#patol_cancer_2",
        },
        () => {
          this.dato_diabetes();
        },
        () => {
          this.dato_2002_2.patol_cancer = this.dato_2002_2.patol_cancer.toUpperCase();
          var temp = this.dato_2002_2.patol_cancer;
          if (temp == "S") {
            this.dato_parentCancer();
          } else if (temp == "N") {
            this.dato_2002_2.parent_cancer = '';
            this.dato_tuberculosis();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_cancer();
          }
        }
      );
    },

    dato_parentCancer() {
      validarInputs(
        {
          form: "#parent_cancer_2",
        },
        () => {
          this.dato_cancer();
        },
        () => {
          this.dato_2002_2.parent_cancer = this.dato_2002_2.parent_cancer.toUpperCase();
          var temp = this.dato_2002_2.parent_cancer;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentCancer();
          } else {
            this.dato_tuberculosis();
          }
        }
      );
    },

    dato_tuberculosis() {
      this.dato_2002_2.patol_tuberculosis.trim() == "" ? (this.dato_2002_2.patol_tuberculosis = "N") : false;
      validarInputs(
        {
          form: "#patol_tuberculosis_2",
        },
        () => {
          this.dato_cancer();
        },
        () => {
          this.dato_2002_2.patol_tuberculosis = this.dato_2002_2.patol_tuberculosis.toUpperCase();
          var temp = this.dato_2002_2.patol_tuberculosis;
          if (temp == "S") {
            this.dato_parentTuberculosis();
          } else if (temp == "N") {
            this.dato_2002_2.parent_tuberculosis = '';
            this.dato_sifilis();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_tuberculosis();
          }
        }
      );
    },

    dato_parentTuberculosis() {
      validarInputs(
        {
          form: "#parent_tuberculosis_2",
        },
        () => {
          this.dato_tuberculosis();
        },
        () => {
          this.dato_2002_2.parent_tuberculosis = this.dato_2002_2.parent_tuberculosis.toUpperCase();
          var temp = this.dato_2002_2.parent_tuberculosis;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentTuberculosis();
          } else {
            this.dato_sifilis();
          }
        }
      );
    },

    dato_sifilis() {
      this.dato_2002_2.patol_sifilis.trim() == "" ? (this.dato_2002_2.patol_sifilis = "N") : false;
      validarInputs(
        {
          form: "#patol_sifilis_2",
        },
        () => {
          this.dato_tuberculosis();
        },
        () => {
          this.dato_2002_2.patol_sifilis = this.dato_2002_2.patol_sifilis.toUpperCase();
          var temp = this.dato_2002_2.patol_sifilis;
          if (temp == "S") {
            this.dato_parentSifilis();
          } else if (temp == "N") {
            this.dato_2002_2.parent_sifilis = '';
            this.dato_epilepsia();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_sifilis();
          }
        }
      );
    },

    dato_parentSifilis() {
      validarInputs(
        {
          form: "#parent_sifilis_2",
        },
        () => {
          this.dato_sifilis();
        },
        () => {
          this.dato_2002_2.parent_sifilis = this.dato_2002_2.parent_sifilis.toUpperCase();
          var temp = this.dato_2002_2.parent_sifilis;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentSifilis();
          } else {
            this.dato_epilepsia();
          }
        }
      );
    },

    dato_epilepsia() {
      this.dato_2002_2.patol_epilepsia.trim() == "" ? (this.dato_2002_2.patol_epilepsia = "N") : false;
      validarInputs(
        {
          form: "#patol_epilepsia_2",
        },
        () => {
          this.dato_sifilis();
        },
        () => {
          this.dato_2002_2.patol_epilepsia = this.dato_2002_2.patol_epilepsia.toUpperCase();
          var temp = this.dato_2002_2.patol_epilepsia;
          if (temp == "S") {
            this.dato_parentEpilepsia();
          } else if (temp == "N") {
            this.dato_2002_2.parent_epilepsia = '';
            this.dato_distrofia();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_epilepsia();
          }
        }
      );
    },

    dato_parentEpilepsia() {
      validarInputs(
        {
          form: "#parent_epilepsia_2",
        },
        () => {
          this.dato_epilepsia();
        },
        () => {
          this.dato_2002_2.parent_epilepsia = this.dato_2002_2.parent_epilepsia.toUpperCase();
          var temp = this.dato_2002_2.parent_epilepsia;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentEpilepsia();
          } else {
            this.dato_distrofia();
          }
        }
      );
    },

    dato_distrofia() {
      this.dato_2002_2.patol_distrofia.trim() == "" ? (this.dato_2002_2.patol_distrofia = "N") : false;
      validarInputs(
        {
          form: "#patol_distrofia_2",
        },
        () => {
          this.dato_epilepsia();
        },
        () => {
          this.dato_2002_2.patol_distrofia = this.dato_2002_2.patol_distrofia.toUpperCase();
          var temp = this.dato_2002_2.patol_distrofia;
          if (temp == "S") {
            this.dato_parentDistrofia();
          } else if (temp == "N") {
            this.dato_2002_2.parent_distrofia = '';
            this.dato_enferMental();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_distrofia();
          }
        }
      );
    },

    dato_parentDistrofia() {
      validarInputs(
        {
          form: "#parent_distrofia_2",
        },
        () => {
          this.dato_distrofia();
        },
        () => {
          this.dato_2002_2.parent_distrofia = this.dato_2002_2.parent_distrofia.toUpperCase();
          var temp = this.dato_2002_2.parent_distrofia;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentDistrofia();
          } else {
            this.dato_enferMental();
          }
        }
      );
    },

    dato_enferMental() {
      this.dato_2002_2.patol_enfer_mental.trim() == "" ? (this.dato_2002_2.patol_enfer_mental = "N") : false;
      validarInputs(
        {
          form: "#patol_enfer_mental_2",
        },
        () => {
          this.dato_distrofia();
        },
        () => {
          this.dato_2002_2.patol_enfer_mental = this.dato_2002_2.patol_enfer_mental.toUpperCase();
          var temp = this.dato_2002_2.patol_enfer_mental;
          if (temp == "S") {
            this.dato_parentEnferMental();
          } else if (temp == "N") {
            this.dato_2002_2.parent_enfer_mental = '';
            this.dato_anomCongenita();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_enferMental();
          }
        }
      );
    },

    dato_parentEnferMental() {
      validarInputs(
        {
          form: "#parent_enfer_mental_2",
        },
        () => {
          this.dato_enferMental();
        },
        () => {
          this.dato_2002_2.parent_enfer_mental = this.dato_2002_2.parent_enfer_mental.toUpperCase();
          var temp = this.dato_2002_2.parent_enfer_mental;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentEnferMental();
          } else {
            this.dato_anomCongenita();
          }
        }
      );
    },

    dato_anomCongenita() {
      this.dato_2002_2.patol_anom_congenita.trim() == "" ? (this.dato_2002_2.patol_anom_congenita = "N") : false;
      validarInputs(
        {
          form: "#patol_anom_congenita_2",
        },
        () => {
          this.dato_enferMental();
        },
        () => {
          this.dato_2002_2.patol_anom_congenita = this.dato_2002_2.patol_anom_congenita.toUpperCase();
          var temp = this.dato_2002_2.patol_anom_congenita;
          if (temp == "S") {
            this.dato_parentAnomCongenita();
          } else if (temp == "N") {
            this.dato_2002_2.parent_anom_congenita = '';
            this.dato_otros();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_anomCongenita();
          }
        }
      );
    },

    dato_parentAnomCongenita() {
      validarInputs(
        {
          form: "#parent_anom_congenita_2",
        },
        () => {
          this.dato_anomCongenita();
        },
        () => {
          this.dato_2002_2.parent_anom_congenita = this.dato_2002_2.parent_anom_congenita.toUpperCase();
          var temp = this.dato_2002_2.parent_anom_congenita;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentAnomCongenita();
          } else {
            this.dato_otros();
          }
        }
      );
    },

    dato_otros() {
      validarInputs(
        {
          form: "#tablaOtros_hc845a",
        },
        () => {
          this.dato_anomCongenita();
        },
        () => {
          this.dato_2002_2.otros = this.dato_2002_2.otros.toUpperCase();
          this.grabarDetalle();
        }
      );
    },

    async grabarDetalle() {
      loader('show');
      this.dato_2002_2['tipo_ws'] = '02';

      let detalles = {
        "2002": _getObjetoSaveHc(this.dato_2002_2, []),
      }

      grabarDetalles(detalles, this.params.llave_hc);
      loader('hide')
      this._terminar();
    },

    async cargarDestalles() {
      await postData({
        datosh: datosEnvio() + this.params.llave_hc + '|' + '  ' + '|' + '  ' + '|' + '2002' + '|' + this.params.serv_hc + '|'
      }, get_url("app/HICLIN/HCDETAL_PRC.DLL"))
        .then((data) => {
          this.detalle = data["DETHC"];
          this.detalle.pop();

          if (this.detalle.length == 0) {
            this.params.estado = true;
            this.dato_asma();
          } else {
            let tipo = this.detalle[0].DETALLE.tipo_ws;
            if (tipo != undefined) {
              if (tipo == "02") {
                this.params.estado = true;
                this.dato_2002_2 = this.detalle[0].DETALLE;
                this.dato_asma();
              } else {
                CON851('', 'Estructura de antecedentes no corresponde', null, 'error', 'error')
                this._escape();
              }
            } else {
              CON851('', 'Estructura de antecedentes no corresponde', null, 'error', 'error')
              this._escape();
            }
          }
        })
        .catch((error) => {
          CON851('', 'Error consultando datos', null, 'error', 'error')
          loader("hide")
          this._escape();
        });
    },

    _escape() {
      this.$emit("callback_esc");
    },
    _terminar() {
      this.$emit("callback");
    },

  },
  template: /*html*/ `
  <transition name="modal_prosoft" v-if="params.estado">
      <div class="overlay_prosoft">
          <div class="modal_prosoft" style="width: 45%;">
              <div class="container_prosoft">
                  <div class="body_prosoft">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div class="portlet light no-padding">
                              <div class="portlet-body" style="
                                padding-left: 7px;
                                padding-right: 7px;
                                padding-top: 7px;">

                                <div class="portlet light box-center box-title">
                                  <div class="portlet-title">
                                    <div class="caption" style="width: 100%">
                                      <span class="caption-subject bold">ANTECEDENTES FAMILIARES</span>
                                    </div>
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845a.flexIzq">1. Asma</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_asma_2'>
                                    <input v-model="dato_2002_2.patol_asma" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parent_asma_2'>
                                    <input v-model="dato_2002_2.parent_asma" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845a.flexIzq">2. Alergias</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_alergias_2'>
                                    <input v-model="dato_2002_2.patol_alergias" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parent_alergias_2'>
                                    <input v-model="dato_2002_2.parent_alergias" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845a.flexIzq">3. H/Tension arte</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_tension_2'>
                                    <input v-model="dato_2002_2.patol_tension" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parent_tension_2'>
                                    <input v-model="dato_2002_2.parent_tension" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845a.flexIzq">4. Cardiopulmonar</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_cardiopulmonar_2'>
                                    <input v-model="dato_2002_2.patol_cardiopulmonar" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parent_cardiopulmonar_2'>
                                    <input v-model="dato_2002_2.parent_cardiopulmonar" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845a.flexIzq">5. Diabetes</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_diabetes_2'>
                                    <input v-model="dato_2002_2.patol_diabetes" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parent_diabetes_2'>
                                    <input v-model="dato_2002_2.parent_diabetes" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845a.flexIzq">6. Cancer</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_cancer_2'>
                                    <input v-model="dato_2002_2.patol_cancer" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parent_cancer_2'>
                                    <input v-model="dato_2002_2.parent_cancer" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845a.flexIzq">7. Tuberculosis</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_tuberculosis_2'>
                                    <input v-model="dato_2002_2.patol_tuberculosis" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parent_tuberculosis_2'>
                                    <input v-model="dato_2002_2.parent_tuberculosis" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845a.flexIzq">8. Sifilis</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_sifilis_2'>
                                    <input v-model="dato_2002_2.patol_sifilis" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parent_sifilis_2'>
                                    <input v-model="dato_2002_2.parent_sifilis" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845a.flexIzq">9. Epilepsia</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_epilepsia_2'>
                                    <input v-model="dato_2002_2.patol_epilepsia" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parent_epilepsia_2'>
                                    <input v-model="dato_2002_2.parent_epilepsia" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845a.flexIzq">10. Distrofia</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_distrofia_2'>
                                    <input v-model="dato_2002_2.patol_distrofia" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parent_distrofia_2'>
                                    <input v-model="dato_2002_2.parent_distrofia" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845a.flexIzq">11. Enferm. Mental</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_enfer_mental_2'>
                                    <input v-model="dato_2002_2.patol_enfer_mental" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parent_enfer_mental_2'>
                                    <input v-model="dato_2002_2.parent_enfer_mental" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845a.flexIzq">12. Anom. Congenita</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_anom_congenita_2'>
                                    <input v-model="dato_2002_2.patol_anom_congenita" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845a.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parent_anom_congenita_2'>
                                    <input v-model="dato_2002_2.parent_anom_congenita" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-12 col-sm-12 col-xs-12" style="display:flex" :style="stylesHc845a.flexIzq">
                                  <div class="input-group col-md-12 col-md-12 col-sm-12 col-xs-12" id='tablaOtros_hc845a'>
                                    <div class="head-textarea">
                                        <div class="col-md-6 col-sm-6 col-xs-6">
                                          <label for="title-textarea">Otros.</label>
                                        </div>
                                        <div class="col-md-6 col-sm-6 col-xs-6" style="text-align: right;">
                                          <label>(350 caracteres maximo)</label>
                                          <div class="tooltip-proft bottom-text">
                                            <span class="icon-proft icon-info"></span>
                                            <span class="tiptext">
                                              <div>Presione F3 para pasar al siguiente campo.</div>
                                            </span>
                                          </div>
                                        </div>
                                    </div>
                                    <textarea v-model="dato_2002_2.otros" class="form-control tablaNotif uppercase"
                                    disabled="disabled" rows="4" style="resize: none; text-align: justify" data-orden="1"
                                    maxlength="380"></textarea>
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                              </div>
                          </div>
                      </div>
                      <div style="clear: both"></div>
                  </div>
              </div>
          </div>
      </div>
  </transition>
`,
});
