const { detallesHc, grabarDetalles } = require("../../HICLIN/scripts/reg_dethc.js");

// componente detalle 2002 estructura 01 - santiago franco
// se tiene que enviar la llave de la historia y la unidad de servicio de la historia en params

module.exports = Vue.component("content_aiepi845", {
  props: {
    params: {},
  },
  data() {
    return {
      dato_2002_1: detallesHc.WS_2002_1(),

      detalle: [],

      stylesAiepi845: {
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

    'dato_2002_1.parent_cancer': function (val) {
      this.dato_2002_1.parent_cancer = val ? val.replaceEsp() : ''
    },

    'dato_2002_1.parent_tension': function (val) {
      this.dato_2002_1.parent_tension = val ? val.replaceEsp() : ''
    },

    'dato_2002_1.parent_tuberculosis': function (val) {
      this.dato_2002_1.parent_tuberculosis = val ? val.replaceEsp() : ''
    },

    'dato_2002_1.parent_cardiopatias': function (val) {
      this.dato_2002_1.parent_cardiopatias = val ? val.replaceEsp() : ''
    },

    'dato_2002_1.parent_diabetes': function (val) {
      this.dato_2002_1.parent_diabetes = val ? val.replaceEsp() : ''
    },

    'dato_2002_1.parent_preeclampsia': function (val) {
      this.dato_2002_1.parent_preeclampsia = val ? val.replaceEsp() : ''
    },

    'dato_2002_1.parent_eclampsia': function (val) {
      this.dato_2002_1.parent_eclampsia = val ? val.replaceEsp() : ''
    },

    'dato_2002_1.parent_gemelares': function (val) {
      this.dato_2002_1.parent_gemelares = val ? val.replaceEsp() : ''
    },

    'dato_2002_1.parent_malformaciones': function (val) {
      this.dato_2002_1.parent_malformaciones = val ? val.replaceEsp() : ''
    },

    'dato_2002_1.otros': function (val) {
      this.dato_2002_1.otros = val ? val.replaceEsp() : ''
    },
  },
  created() {
    $this = this;
    this.cargarDestalles();
  },
  methods: {
    dato_cancer() {
      this.dato_2002_1.patol_cancer.trim() == "" ? (this.dato_2002_1.patol_cancer = "N") : false;
      validarInputs(
        {
          form: "#patol_cancer",
        },
        () => {
          this._escape();
        },
        () => {
          this.dato_2002_1.patol_cancer = this.dato_2002_1.patol_cancer.toUpperCase();
          var temp = this.dato_2002_1.patol_cancer;
          if (temp == "S") {
            this.dato_parentCancer();
          } else if (temp == "N") {
            this.dato_2002_1.parent_cancer = '';
            this.dato_tensionArte();
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
          form: "#parenCancer",
        },
        () => {
          this.dato_cancer();
        },
        () => {
          this.dato_2002_1.parent_cancer = this.dato_2002_1.parent_cancer.toUpperCase();
          var temp = this.dato_2002_1.parent_cancer;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentCancer();
          } else {
            this.dato_tensionArte();
          }
        }
      );
    },

    dato_tensionArte() {
      this.dato_2002_1.patol_tension.trim() == "" ? (this.dato_2002_1.patol_tension = "N") : false;
      validarInputs(
        {
          form: "#patol_tension",
        },
        () => {
          this.dato_cancer();
        },
        () => {
          this.dato_2002_1.patol_tension = this.dato_2002_1.patol_tension.toUpperCase();
          var temp = this.dato_2002_1.patol_tension;
          if (temp == "S") {
            this.dato_parentTensionArte();
          } else if (temp == "N") {
            this.dato_2002_1.parent_tension = '';
            this.dato_tuberculosis();
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
          form: "#parenTensionArte",
        },
        () => {
          this.dato_tensionArte();
        },
        () => {
          this.dato_2002_1.parent_tension = this.dato_2002_1.parent_tension.toUpperCase();
          var temp = this.dato_2002_1.parent_tension;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentTensionArte();
          } else {
            this.dato_tuberculosis();
          }
        }
      );
    },

    dato_tuberculosis() {
      this.dato_2002_1.patol_tuberculosis.trim() == "" ? (this.dato_2002_1.patol_tuberculosis = "N") : false;
      validarInputs(
        {
          form: "#patol_tuberculosis",
        },
        () => {
          this.dato_tensionArte();
        },
        () => {
          this.dato_2002_1.patol_tuberculosis = this.dato_2002_1.patol_tuberculosis.toUpperCase();
          var temp = this.dato_2002_1.patol_tuberculosis;
          if (temp == "S") {
            this.dato_parentTuberculosis();
          } else if (temp == "N") {
            this.dato_2002_1.parent_tuberculosis = '';
            this.dato_cardiopatias();
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
          form: "#parenTuberculosis",
        },
        () => {
          this.dato_tuberculosis();
        },
        () => {
          this.dato_2002_1.parent_tuberculosis = this.dato_2002_1.parent_tuberculosis.toUpperCase();
          var temp = this.dato_2002_1.parent_tuberculosis;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentTuberculosis();
          } else {
            this.dato_cardiopatias();
          }
        }
      );
    },

    dato_cardiopatias() {
      this.dato_2002_1.patol_cardiopatias.trim() == "" ? (this.dato_2002_1.patol_cardiopatias = "N") : false;
      validarInputs(
        {
          form: "#patol_cardiopatias",
        },
        () => {
          this.dato_tuberculosis();
        },
        () => {
          this.dato_2002_1.patol_cardiopatias = this.dato_2002_1.patol_cardiopatias.toUpperCase();
          var temp = this.dato_2002_1.patol_cardiopatias;
          if (temp == "S") {
            this.dato_parentCardiopatias();
          } else if (temp == "N") {
            this.dato_2002_1.parent_cardiopatias = '';
            this.dato_diabetes();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_cardiopatias();
          }
        }
      );
    },

    dato_parentCardiopatias() {
      validarInputs(
        {
          form: "#parenCardiopatias",
        },
        () => {
          this.dato_cardiopatias();
        },
        () => {
          this.dato_2002_1.parent_cardiopatias = this.dato_2002_1.parent_cardiopatias.toUpperCase();
          var temp = this.dato_2002_1.parent_cardiopatias;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentCardiopatias();
          } else {
            this.dato_diabetes();
          }
        }
      );
    },

    dato_diabetes() {
      this.dato_2002_1.patol_diabetes.trim() == "" ? (this.dato_2002_1.patol_diabetes = "N") : false;
      validarInputs(
        {
          form: "#patol_diabetes",
        },
        () => {
          this.dato_cardiopatias();
        },
        () => {
          this.dato_2002_1.patol_diabetes = this.dato_2002_1.patol_diabetes.toUpperCase();
          var temp = this.dato_2002_1.patol_diabetes;
          if (temp == "S") {
            this.dato_parentDiabetes();
          } else if (temp == "N") {
            this.dato_2002_1.parent_diabetes = '';
            this.dato_preeclampsia();
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
          form: "#parenDiabetes",
        },
        () => {
          this.dato_diabetes();
        },
        () => {
          this.dato_2002_1.parent_diabetes = this.dato_2002_1.parent_diabetes.toUpperCase();
          var temp = this.dato_2002_1.parent_diabetes;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentDiabetes();
          } else {
            this.dato_preeclampsia();
          }
        }
      );
    },

    dato_preeclampsia() {
      this.dato_2002_1.patol_preeclampsia.trim() == "" ? (this.dato_2002_1.patol_preeclampsia = "N") : false;
      validarInputs(
        {
          form: "#patol_preeclampsia",
        },
        () => {
          this.dato_diabetes();
        },
        () => {
          this.dato_2002_1.patol_preeclampsia = this.dato_2002_1.patol_preeclampsia.toUpperCase();
          var temp = this.dato_2002_1.patol_preeclampsia;
          if (temp == "S") {
            this.dato_parentPreeclampsia();
          } else if (temp == "N") {
            this.dato_2002_1.parent_preeclampsia = '';
            this.dato_eclampsia();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_preeclampsia();
          }
        }
      );
    },

    dato_parentPreeclampsia() {
      validarInputs(
        {
          form: "#parenPreeclampsia",
        },
        () => {
          this.dato_preeclampsia();
        },
        () => {
          this.dato_2002_1.parent_preeclampsia = this.dato_2002_1.parent_preeclampsia.toUpperCase();
          var temp = this.dato_2002_1.parent_preeclampsia;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentPreeclampsia();
          } else {
            this.dato_eclampsia();
          }
        }
      );
    },

    dato_eclampsia() {
      this.dato_2002_1.patol_eclampsia.trim() == "" ? (this.dato_2002_1.patol_eclampsia = "N") : false;
      validarInputs(
        {
          form: "#patol_eclampsia",
        },
        () => {
          this.dato_preeclampsia();
        },
        () => {
          this.dato_2002_1.patol_eclampsia = this.dato_2002_1.patol_eclampsia.toUpperCase();
          var temp = this.dato_2002_1.patol_eclampsia;
          if (temp == "S") {
            this.dato_parentEclampsia();
          } else if (temp == "N") {
            this.dato_2002_1.parent_eclampsia = '';
            this.dato_gemelares();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_eclampsia();
          }
        }
      );
    },

    dato_parentEclampsia() {
      validarInputs(
        {
          form: "#parenEclampsia",
        },
        () => {
          this.dato_eclampsia();
        },
        () => {
          this.dato_2002_1.parent_eclampsia = this.dato_2002_1.parent_eclampsia.toUpperCase();
          var temp = this.dato_2002_1.parent_eclampsia;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentEclampsia();
          } else {
            this.dato_gemelares();
          }
        }
      );
    },

    dato_gemelares() {
      this.dato_2002_1.patol_gemelares.trim() == "" ? (this.dato_2002_1.patol_gemelares = "N") : false;
      validarInputs(
        {
          form: "#patol_gemelares",
        },
        () => {
          this.dato_eclampsia();
        },
        () => {
          this.dato_2002_1.patol_gemelares = this.dato_2002_1.patol_gemelares.toUpperCase();
          var temp = this.dato_2002_1.patol_gemelares;
          if (temp == "S") {
            this.dato_parentGemelares();
          } else if (temp == "N") {
            this.dato_2002_1.parent_gemelares = '';
            this.dato_malformaciones();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_gemelares();
          }
        }
      );
    },

    dato_parentGemelares() {
      validarInputs(
        {
          form: "#parenGemelares",
        },
        () => {
          this.dato_gemelares();
        },
        () => {
          this.dato_2002_1.parent_gemelares = this.dato_2002_1.parent_gemelares.toUpperCase();
          var temp = this.dato_2002_1.parent_gemelares;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentGemelares();
          } else {
            this.dato_malformaciones();
          }
        }
      );
    },

    dato_malformaciones() {
      this.dato_2002_1.patol_malformaciones.trim() == "" ? (this.dato_2002_1.patol_malformaciones = "N") : false;
      validarInputs(
        {
          form: "#patol_malformaciones",
        },
        () => {
          this.dato_gemelares();
        },
        () => {
          this.dato_2002_1.patol_malformaciones = this.dato_2002_1.patol_malformaciones.toUpperCase();
          var temp = this.dato_2002_1.patol_malformaciones;
          if (temp == "S") {
            this.dato_parentMalformaciones();
          } else if (temp == "N") {
            this.dato_2002_1.parent_malformaciones = '';
            this.dato_otros();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_malformaciones();
          }
        }
      );
    },

    dato_parentMalformaciones() {
      validarInputs(
        {
          form: "#parenMalformaciones",
        },
        () => {
          this.dato_malformaciones();
        },
        () => {
          this.dato_2002_1.parent_malformaciones = this.dato_2002_1.parent_malformaciones.toUpperCase();
          var temp = this.dato_2002_1.parent_malformaciones;
          if (temp.trim() == '') {
            CON851("02", "02", null, "error", "error");
            this.dato_parentMalformaciones();
          } else {
            this.dato_otros();
          }
        }
      );
    },

    dato_otros() {
      validarInputs(
        {
          form: "#tablaOtros_aiepi845",
        },
        () => {
          this.dato_malformaciones();
        },
        () => {
          this.dato_2002_1.otros = this.dato_2002_1.otros.toUpperCase();
          this.grabarDetalle();
        }
      );
    },

    async grabarDetalle() {
      loader('show');
      this.dato_2002_1['tipo_ws'] = '01';

      let detalles = {
        "2002": _getObjetoSaveHc(this.dato_2002_1, []),
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
          this.detalle.pop()

          if (this.detalle.length == 0) {
            this.params.estado = true;
            this.dato_cancer();
          } else {
            let tipo = this.detalle[0].DETALLE.tipo_ws;
            if (tipo != undefined) {
              if (tipo == "01") {
                this.params.estado = true;
                this.dato_2002_1 = this.detalle[0].DETALLE;
                this.dato_cancer();
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

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesAiepi845.flexIzq">1. Cancer</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_cancer'>
                                    <input v-model="dato_2002_1.patol_cancer" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parenCancer'>
                                    <input v-model="dato_2002_1.parent_cancer" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesAiepi845.flexIzq">2. H/Tension arte</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_tension'>
                                    <input v-model="dato_2002_1.patol_tension" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parenTensionArte'>
                                    <input v-model="dato_2002_1.parent_tension" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesAiepi845.flexIzq">3. Tuberculosis</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_tuberculosis'>
                                    <input v-model="dato_2002_1.patol_tuberculosis" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parenTuberculosis'>
                                    <input v-model="dato_2002_1.parent_tuberculosis" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesAiepi845.flexIzq">4. Cardiopatias</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_cardiopatias'>
                                    <input v-model="dato_2002_1.patol_cardiopatias" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parenCardiopatias'>
                                    <input v-model="dato_2002_1.parent_cardiopatias" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesAiepi845.flexIzq">5. Diabetes</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_diabetes'>
                                    <input v-model="dato_2002_1.patol_diabetes" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parenDiabetes'>
                                    <input v-model="dato_2002_1.parent_diabetes" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesAiepi845.flexIzq">6. Preeclampsia</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_preeclampsia'>
                                    <input v-model="dato_2002_1.patol_preeclampsia" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parenPreeclampsia'>
                                    <input v-model="dato_2002_1.parent_preeclampsia" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesAiepi845.flexIzq">7. Eclampsia</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_eclampsia'>
                                    <input v-model="dato_2002_1.patol_eclampsia" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parenEclampsia'>
                                    <input v-model="dato_2002_1.parent_eclampsia" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesAiepi845.flexIzq">8. Gemelares</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_gemelares'>
                                    <input v-model="dato_2002_1.patol_gemelares" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parenGemelares'>
                                    <input v-model="dato_2002_1.parent_gemelares" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesAiepi845.flexIzq">9. Malformaciones</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_malformaciones'>
                                    <input v-model="dato_2002_1.patol_malformaciones" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesAiepi845.flexRow">
                                  <div class="input-group col-md-12 col-sm-12 col-xs-12" id='parenMalformaciones'>
                                    <input v-model="dato_2002_1.parent_malformaciones" type="text"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                    data-orden="1" maxlength="14" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-12 col-sm-12 col-xs-12" style="display:flex" :style="stylesAiepi845.flexIzq">
                                  <div class="input-group col-md-12 col-md-12 col-sm-12 col-xs-12" id='tablaOtros_aiepi845'>
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
                                    <textarea v-model="dato_2002_1.otros" class="form-control tablaNotif uppercase"
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
