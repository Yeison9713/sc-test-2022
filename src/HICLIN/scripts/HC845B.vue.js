const { detallesHc, grabarDetalles } = require("../../HICLIN/scripts/reg_dethc.js");

// componente detalle 2002 estructura 04 - santiago franco
// se tiene que enviar la llave de la historia y la unidad de servicio de la historia en params

module.exports = Vue.component("content_aiepi845", {
  props: {
    params: {},
  },
  data() {
    return {
      dato_2002_4: detallesHc.WS_2002_4(),

      detalle: [],

      stylesHc845b: {
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
    'dato_2002_4.otros': function (val) {
      this.dato_2002_4.otros = val ? val.replaceEsp() : ''
    },
  },
  created() {
    $this = this;
    this.cargarDestalles();
  },
  methods: {
    dato_asma() {
      this.dato_2002_4.asma.trim() == "" ? (this.dato_2002_4.asma = "N") : false;
      validarInputs(
        {
          form: "#asma_4",
        },
        () => {
          this._escape();
        },
        () => {
          this.dato_2002_4.asma = this.dato_2002_4.asma.toUpperCase();
          var temp = this.dato_2002_4.asma;
          if (temp == "S" || temp == "N") {
            this.dato_cancer();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_asma();
          }
        }
      );
    },

    dato_cancer() {
      this.dato_2002_4.cancer.trim() == "" ? (this.dato_2002_4.cancer = "N") : false;
      validarInputs(
        {
          form: "#cancer_4",
        },
        () => {
          this.dato_asma();
        },
        () => {
          this.dato_2002_4.cancer = this.dato_2002_4.cancer.toUpperCase();
          var temp = this.dato_2002_4.cancer;
          if (temp == "S" || temp == "N") {
            this.dato_diabetes();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_cancer();
          }
        }
      );
    },

    dato_diabetes() {
      this.dato_2002_4.diabetes.trim() == "" ? (this.dato_2002_4.diabetes = "N") : false;
      validarInputs(
        {
          form: "#diabetes_4",
        },
        () => {
          this.dato_cancer();
        },
        () => {
          this.dato_2002_4.diabetes = this.dato_2002_4.diabetes.toUpperCase();
          var temp = this.dato_2002_4.diabetes;
          if (temp == "S" || temp == "N") {
            this.dato_tensionArter();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_diabetes();
          }
        }
      );
    },

    dato_tensionArter() {
      this.dato_2002_4.tension_arter.trim() == "" ? (this.dato_2002_4.tension_arter = "N") : false;
      validarInputs(
        {
          form: "#tension_arter_4",
        },
        () => {
          this.dato_diabetes();
        },
        () => {
          this.dato_2002_4.tension_arter = this.dato_2002_4.tension_arter.toUpperCase();
          var temp = this.dato_2002_4.tension_arter;
          if (temp == "S" || temp == "N") {
            this.dato_enferCoronaria();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_tensionArter();
          }
        }
      );
    },

    dato_enferCoronaria() {
      this.dato_2002_4.enfer_coronaria.trim() == "" ? (this.dato_2002_4.enfer_coronaria = "N") : false;
      validarInputs(
        {
          form: "#enfer_coronaria_4",
        },
        () => {
          this.dato_tensionArter();
        },
        () => {
          this.dato_2002_4.enfer_coronaria = this.dato_2002_4.enfer_coronaria.toUpperCase();
          var temp = this.dato_2002_4.enfer_coronaria;
          if (temp == "S" || temp == "N") {
            this.dato_cerebroVasc();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_enferCoronaria();
          }
        }
      );
    },

    dato_cerebroVasc() {
      this.dato_2002_4.cerebro_vasc.trim() == "" ? (this.dato_2002_4.cerebro_vasc = "N") : false;
      validarInputs(
        {
          form: "#cerebro_vasc_4",
        },
        () => {
          this.dato_enferCoronaria();
        },
        () => {
          this.dato_2002_4.cerebro_vasc = this.dato_2002_4.cerebro_vasc.toUpperCase();
          var temp = this.dato_2002_4.cerebro_vasc;
          if (temp == "S" || temp == "N") {
            this.dato_neurologicos();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_cerebroVasc();
          }
        }
      );
    },

    dato_neurologicos() {
      this.dato_2002_4.neurologicos.trim() == "" ? (this.dato_2002_4.neurologicos = "N") : false;
      validarInputs(
        {
          form: "#neurologicos_4",
        },
        () => {
          this.dato_cerebroVasc();
        },
        () => {
          this.dato_2002_4.neurologicos = this.dato_2002_4.neurologicos.toUpperCase();
          var temp = this.dato_2002_4.neurologicos;
          if (temp == "S" || temp == "N") {
            this.dato_hepatopatias();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_neurologicos();
          }
        }
      );
    },

    dato_hepatopatias() {
      this.dato_2002_4.hepatopatias.trim() == "" ? (this.dato_2002_4.hepatopatias = "N") : false;
      validarInputs(
        {
          form: "#hepatopatias_4",
        },
        () => {
          this.dato_neurologicos();
        },
        () => {
          this.dato_2002_4.hepatopatias = this.dato_2002_4.hepatopatias.toUpperCase();
          var temp = this.dato_2002_4.hepatopatias;
          if (temp == "S" || temp == "N") {
            this.dato_obesidad();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_hepatopatias();
          }
        }
      );
    },

    dato_obesidad() {
      this.dato_2002_4.obesidad.trim() == "" ? (this.dato_2002_4.obesidad = "N") : false;
      validarInputs(
        {
          form: "#obesidad_4",
        },
        () => {
          this.dato_hepatopatias();
        },
        () => {
          this.dato_2002_4.obesidad = this.dato_2002_4.obesidad.toUpperCase();
          var temp = this.dato_2002_4.obesidad;
          if (temp == "S" || temp == "N") {
            this.dato_infecciones();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_obesidad();
          }
        }
      );
    },

    dato_infecciones() {
      this.dato_2002_4.infecciones.trim() == "" ? (this.dato_2002_4.infecciones = "N") : false;
      validarInputs(
        {
          form: "#infecciones_4",
        },
        () => {
          this.dato_obesidad();
        },
        () => {
          this.dato_2002_4.infecciones = this.dato_2002_4.infecciones.toUpperCase();
          var temp = this.dato_2002_4.infecciones;
          if (temp == "S" || temp == "N") {
            this.dato_alergias();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_infecciones();
          }
        }
      );
    },

    dato_alergias() {
      this.dato_2002_4.alergias.trim() == "" ? (this.dato_2002_4.alergias = "N") : false;
      validarInputs(
        {
          form: "#alergias_4",
        },
        () => {
          this.dato_infecciones();
        },
        () => {
          this.dato_2002_4.alergias = this.dato_2002_4.alergias.toUpperCase();
          var temp = this.dato_2002_4.alergias;
          if (temp == "S" || temp == "N") {
            this.dato_probPsicolog();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_alergias();
          }
        }
      );
    },


    dato_probPsicolog() {
      this.dato_2002_4.prob_psicolog.trim() == "" ? (this.dato_2002_4.prob_psicolog = "N") : false;
      validarInputs(
        {
          form: "#prob_psicolog_4",
        },
        () => {
          this.dato_alergias();
        },
        () => {
          this.dato_2002_4.prob_psicolog = this.dato_2002_4.prob_psicolog.toUpperCase();
          var temp = this.dato_2002_4.prob_psicolog;
          if (temp == "S" || temp == "N") {
            this.dato_madreAdolesc();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_probPsicolog();
          }
        }
      );
    },

    dato_madreAdolesc() {
      this.dato_2002_4.madre_adolesc.trim() == "" ? (this.dato_2002_4.madre_adolesc = "N") : false;
      validarInputs(
        {
          form: "#madre_adolesc_4",
        },
        () => {
          this.dato_probPsicolog();
        },
        () => {
          this.dato_2002_4.madre_adolesc = this.dato_2002_4.madre_adolesc.toUpperCase();
          var temp = this.dato_2002_4.madre_adolesc;
          if (temp == "S" || temp == "N") {
            this.dato_judiciales();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_madreAdolesc();
          }
        }
      );
    },

    dato_judiciales() {
      this.dato_2002_4.judiciales.trim() == "" ? (this.dato_2002_4.judiciales = "N") : false;
      validarInputs(
        {
          form: "#judiciales_4",
        },
        () => {
          this.dato_madreAdolesc();
        },
        () => {
          this.dato_2002_4.judiciales = this.dato_2002_4.judiciales.toUpperCase();
          var temp = this.dato_2002_4.judiciales;
          if (temp == "S" || temp == "N") {
            this.dato_otros();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_judiciales();
          }
        }
      );
    },

    dato_otros() {
      validarInputs(
        {
          form: "#tablaOtros_hc845b",
        },
        () => {
          this.dato_judiciales();
        },
        () => {
          this.dato_2002_4.otros = this.dato_2002_4.otros.toUpperCase();
          this.grabarDetalle();
        }
      );
    },

    async grabarDetalle() {
      loader('show');
      this.dato_2002_4['tipo_ws'] = '04';

      let detalles = {
        "2002": _getObjetoSaveHc(this.dato_2002_4, []),
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
            this.dato_asma();
          } else {
            let tipo = this.detalle[0].DETALLE.tipo_ws;
            if (tipo != undefined) {
              if (tipo == "04") {
                this.params.estado = true;
                this.dato_2002_4 = this.detalle[0].DETALLE;
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

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845b.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845b.flexIzq">1. Asma</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='asma_4'>
                                    <input v-model="dato_2002_4.asma" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845b.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845b.flexIzq">8. Hepatopatias</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='hepatopatias_4'>
                                    <input v-model="dato_2002_4.hepatopatias" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845b.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845b.flexIzq">2. Cancer</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='cancer_4'>
                                    <input v-model="dato_2002_4.cancer" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845b.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845b.flexIzq">9. Obesidad</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='obesidad_4'>
                                    <input v-model="dato_2002_4.obesidad" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845b.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845b.flexIzq">3. diabetes</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='diabetes_4'>
                                    <input v-model="dato_2002_4.diabetes" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845b.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845b.flexIzq">10. Infecciones</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='infecciones_4'>
                                    <input v-model="dato_2002_4.infecciones" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845b.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845b.flexIzq">4. H/Tension Arter</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='tension_arter_4'>
                                    <input v-model="dato_2002_4.tension_arter" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845b.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845b.flexIzq">11. Alergias</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='alergias_4'>
                                    <input v-model="dato_2002_4.alergias" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845b.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845b.flexIzq">5. Enf. Coronaria</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='enfer_coronaria_4'>
                                    <input v-model="dato_2002_4.enfer_coronaria" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845b.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845b.flexIzq">12. Prob. Psicolog</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='prob_psicolog_4'>
                                    <input v-model="dato_2002_4.prob_psicolog" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845b.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845b.flexIzq">6. Cerebro Vascul.</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='cerebro_vasc_4'>
                                    <input v-model="dato_2002_4.cerebro_vasc" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845b.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845b.flexIzq">13. Madre adolesc</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='madre_adolesc_4'>
                                    <input v-model="dato_2002_4.madre_adolesc" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845b.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845b.flexIzq">7. Neurologicos</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='neurologicos_4'>
                                    <input v-model="dato_2002_4.neurologicos" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845b.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845b.flexIzq">14. Judiciales</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='judiciales_4'>
                                    <input v-model="dato_2002_4.judiciales" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-12 col-sm-12 col-xs-12" style="display:flex" :style="stylesHc845b.flexIzq">
                                  <div class="input-group col-md-12 col-md-12 col-sm-12 col-xs-12" id='tablaOtros_hc845b'>
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
                                    <textarea v-model="dato_2002_4.otros" class="form-control tablaNotif uppercase"
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
