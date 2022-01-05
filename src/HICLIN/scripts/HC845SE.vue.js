const { detallesHc, grabarDetalles } = require("../../HICLIN/scripts/reg_dethc.js");

// componente detalle 3010 estructura 01 - santiago franco
// se tiene que enviar la llave de la historia y la unidad de servicio de la historia en params

module.exports = Vue.component("content_hc845se", {
  props: {
    params: {},
  },
  data() {
    return {
      dato_3010_1: detallesHc.WS_3010_1(),

      detalle: [],

      stylesHc845se: {
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
  },
  created() {
    $this = this;
    this.cargarDestalles();
  },
  methods: {
    dato_ardorOjos() {
      this.dato_3010_1.patol_ardor_ojos.trim() == "" ? (this.dato_3010_1.patol_ardor_ojos = "N") : false;
      validarInputs(
        {
          form: "#patol_ardor_ojos_1",
        },
        () => {
          this._escape();
        },
        () => {
          this.dato_3010_1.patol_ardor_ojos = this.dato_3010_1.patol_ardor_ojos.toUpperCase();
          var temp = this.dato_3010_1.patol_ardor_ojos;
          if (temp == "S" || temp == "N") {
            this.dato_prurito();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_ardorOjos();
          }
        }
      );
    },

    dato_prurito() {
      this.dato_3010_1.patol_prurito.trim() == "" ? (this.dato_3010_1.patol_prurito = "N") : false;
      validarInputs(
        {
          form: "#patol_prurito_1",
        },
        () => {
          this.dato_ardorOjos();
        },
        () => {
          this.dato_3010_1.patol_prurito = this.dato_3010_1.patol_prurito.toUpperCase();
          var temp = this.dato_3010_1.patol_prurito;
          if (temp == "S" || temp == "N") {
            this.dato_cansancioOcul();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_prurito();
          }
        }
      );
    },

    dato_cansancioOcul() {
      this.dato_3010_1.patol_cansancio_ocul.trim() == "" ? (this.dato_3010_1.patol_cansancio_ocul = "N") : false;
      validarInputs(
        {
          form: "#patol_cansancio_ocul_1",
        },
        () => {
          this.dato_prurito();
        },
        () => {
          this.dato_3010_1.patol_cansancio_ocul = this.dato_3010_1.patol_cansancio_ocul.toUpperCase();
          var temp = this.dato_3010_1.patol_cansancio_ocul;
          if (temp == "S" || temp == "N") {
            this.dato_visionBorrosa();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_cansancioOcul();
          }
        }
      );
    },

    dato_visionBorrosa() {
      this.dato_3010_1.patol_vision_borrosa.trim() == "" ? (this.dato_3010_1.patol_vision_borrosa = "N") : false;
      validarInputs(
        {
          form: "#patol_vision_borrosa_1",
        },
        () => {
          this.dato_cansancioOcul();
        },
        () => {
          this.dato_3010_1.patol_vision_borrosa = this.dato_3010_1.patol_vision_borrosa.toUpperCase();
          var temp = this.dato_3010_1.patol_vision_borrosa;
          if (temp == "S" || temp == "N") {
            this.dato_tamizajeNorm();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_visionBorrosa();
          }
        }
      );
    },

    dato_tamizajeNorm() {
      this.dato_3010_1.patol_tamizaje_norm.trim() == "" ? (this.dato_3010_1.patol_tamizaje_norm = "N") : false;
      validarInputs(
        {
          form: "#patol_tamizaje_norm_1",
        },
        () => {
          this.dato_visionBorrosa();
        },
        () => {
          this.dato_3010_1.patol_tamizaje_norm = this.dato_3010_1.patol_tamizaje_norm.toUpperCase();
          var temp = this.dato_3010_1.patol_tamizaje_norm;
          if (temp == "S" || temp == "N") {
            this.dato_lagrimeo();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_tamizajeNorm();
          }
        }
      );
    },

    dato_lagrimeo() {
      this.dato_3010_1.patol_lagrimeo.trim() == "" ? (this.dato_3010_1.patol_lagrimeo = "N") : false;
      validarInputs(
        {
          form: "#patol_lagrimeo_1",
        },
        () => {
          this.dato_tamizajeNorm();
        },
        () => {
          this.dato_3010_1.patol_lagrimeo = this.dato_3010_1.patol_lagrimeo.toUpperCase();
          var temp = this.dato_3010_1.patol_lagrimeo;
          if (temp == "S" || temp == "N") {
            this.dato_ojoRojo();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_lagrimeo();
          }
        }
      );
    },

    dato_ojoRojo() {
      this.dato_3010_1.patol_ojo_rojo.trim() == "" ? (this.dato_3010_1.patol_ojo_rojo = "N") : false;
      validarInputs(
        {
          form: "#patol_ojo_rojo_1",
        },
        () => {
          this.dato_lagrimeo();
        },
        () => {
          this.dato_3010_1.patol_ojo_rojo = this.dato_3010_1.patol_ojo_rojo.toUpperCase();
          var temp = this.dato_3010_1.patol_ojo_rojo;
          if (temp == "S" || temp == "N") {
            this.dato_disfonia();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_ojoRojo();
          }
        }
      );
    },

    dato_disfonia() {
      this.dato_3010_1.patol_disfonia.trim() == "" ? (this.dato_3010_1.patol_disfonia = "N") : false;
      validarInputs(
        {
          form: "#patol_disfonia_1",
        },
        () => {
          this.dato_ojoRojo();
        },
        () => {
          this.dato_3010_1.patol_disfonia = this.dato_3010_1.patol_disfonia.toUpperCase();
          var temp = this.dato_3010_1.patol_disfonia;
          if (temp == "S" || temp == "N") {
            this.dato_epitaxis();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_disfonia();
          }
        }
      );
    },

    dato_epitaxis() {
      this.dato_3010_1.patol_epitaxis.trim() == "" ? (this.dato_3010_1.patol_epitaxis = "N") : false;
      validarInputs(
        {
          form: "#patol_epitaxis_1",
        },
        () => {
          this.dato_disfonia();
        },
        () => {
          this.dato_3010_1.patol_epitaxis = this.dato_3010_1.patol_epitaxis.toUpperCase();
          var temp = this.dato_3010_1.patol_epitaxis;
          if (temp == "S" || temp == "N") {
            this.dato_hipoacusia();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_epitaxis();
          }
        }
      );
    },

    dato_hipoacusia() {
      this.dato_3010_1.patol_hipoacusia.trim() == "" ? (this.dato_3010_1.patol_hipoacusia = "N") : false;
      validarInputs(
        {
          form: "#patol_hipoacusia_1",
        },
        () => {
          this.dato_epitaxis();
        },
        () => {
          this.dato_3010_1.patol_hipoacusia = this.dato_3010_1.patol_hipoacusia.toUpperCase();
          var temp = this.dato_3010_1.patol_hipoacusia;
          if (temp == "S" || temp == "N") {
            this.dato_obstruccionNasal();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_hipoacusia();
          }
        }
      );
    },

    dato_obstruccionNasal() {
      this.dato_3010_1.patol_obstrucc_nasal.trim() == "" ? (this.dato_3010_1.patol_obstrucc_nasal = "N") : false;
      validarInputs(
        {
          form: "#patol_obstrucc_nasal_1",
        },
        () => {
          this.dato_hipoacusia();
        },
        () => {
          this.dato_3010_1.patol_obstrucc_nasal = this.dato_3010_1.patol_obstrucc_nasal.toUpperCase();
          var temp = this.dato_3010_1.patol_obstrucc_nasal;
          if (temp == "S" || temp == "N") {
            this.dato_rinorrea();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_obstruccionNasal();
          }
        }
      );
    },

    dato_rinorrea() {
      this.dato_3010_1.patol_rinorrea.trim() == "" ? (this.dato_3010_1.patol_rinorrea = "N") : false;
      validarInputs(
        {
          form: "#patol_rinorrea_1",
        },
        () => {
          this.dato_obstruccionNasal();
        },
        () => {
          this.dato_3010_1.patol_rinorrea = this.dato_3010_1.patol_rinorrea.toUpperCase();
          var temp = this.dato_3010_1.patol_rinorrea;
          if (temp == "S" || temp == "N") {
            this.dato_tinitus();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_rinorrea();
          }
        }
      );
    },

    dato_tinitus() {
      this.dato_3010_1.patol_tinitus.trim() == "" ? (this.dato_3010_1.patol_tinitus = "N") : false;
      validarInputs(
        {
          form: "#patol_tinitus_1",
        },
        () => {
          this.dato_rinorrea();
        },
        () => {
          this.dato_3010_1.patol_tinitus = this.dato_3010_1.patol_tinitus.toUpperCase();
          var temp = this.dato_3010_1.patol_tinitus;
          if (temp == "S" || temp == "N") {
            this.grabarDetalle();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_tinitus();
          }
        }
      );
    },

    async grabarDetalle() {
      loader('show');
      this.dato_3010_1['tipo_ws'] = '01';

      let detalles = {
        "3010": _getObjetoSaveHc(this.dato_3010_1, []),
      }

      grabarDetalles(detalles, this.params.llave_hc);
      loader('hide')
      this._terminar();
    },

    async cargarDestalles() {
      await postData({
        datosh: datosEnvio() + this.params.llave_hc + '|' + '  ' + '|' + '  ' + '|' + '3010' + '|' + this.params.serv_hc + '|'
      }, get_url("app/HICLIN/HCDETAL_PRC.DLL"))
        .then((data) => {
          this.detalle = data["DETHC"];
          this.detalle.pop()

          if (this.detalle.length == 0) {
            this.params.estado = true;
            this.dato_ardorOjos();
          } else {
            let tipo = this.detalle[0].DETALLE.tipo_ws;
            if (tipo != undefined) {
              if (tipo == "01") {
                this.params.estado = true;
                this.dato_3010_1 = this.detalle[0].DETALLE;
                this.dato_ardorOjos();
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
                                      <span class="caption-subject bold">SISTEMA SENTIDOS</span>
                                    </div>
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845se.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845se.flexIzq">1. Ardor ojos ?</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_ardor_ojos_1'>
                                    <input v-model="dato_3010_1.patol_ardor_ojos" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845se.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845se.flexIzq">8. Disfonia ?</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_disfonia_1'>
                                    <input v-model="dato_3010_1.patol_disfonia" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845se.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845se.flexIzq">2. Prurito ?</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_prurito_1'>
                                    <input v-model="dato_3010_1.patol_prurito" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845se.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845se.flexIzq">9. Epitaxis ?</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_epitaxis_1'>
                                    <input v-model="dato_3010_1.patol_epitaxis" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845se.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845se.flexIzq">3. Cansancio ocul ?</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_cansancio_ocul_1'>
                                    <input v-model="dato_3010_1.patol_cansancio_ocul" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845se.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845se.flexIzq">10. Hipoacusia ?</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_hipoacusia_1'>
                                    <input v-model="dato_3010_1.patol_hipoacusia" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845se.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845se.flexIzq">4. Vision borrosa ?</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_vision_borrosa_1'>
                                    <input v-model="dato_3010_1.patol_vision_borrosa" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845se.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845se.flexIzq">11. Obstrucc nasal ?</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_obstrucc_nasal_1'>
                                    <input v-model="dato_3010_1.patol_obstrucc_nasal" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845se.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845se.flexIzq">5. Tamizaje normal ?</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_tamizaje_norm_1'>
                                    <input v-model="dato_3010_1.patol_tamizaje_norm" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845se.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845se.flexIzq">12. Rinorrea ?</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_rinorrea_1'>
                                    <input v-model="dato_3010_1.patol_rinorrea" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845se.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845se.flexIzq">6. Lagrimeo ?</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_lagrimeo_1'>
                                    <input v-model="dato_3010_1.patol_lagrimeo" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845se.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845se.flexIzq">13. Tinitus ?</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_tinitus_1'>
                                    <input v-model="dato_3010_1.patol_tinitus" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-6 col-sm-6 col-xs-6" :style="stylesHc845se.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesHc845se.flexIzq">7. Ojo rojo ?</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_ojo_rojo_1'>
                                    <input v-model="dato_3010_1.patol_ojo_rojo" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
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
