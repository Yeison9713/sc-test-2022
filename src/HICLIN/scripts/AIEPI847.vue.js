const { detallesHc, grabarDetalles } = require("../../HICLIN/scripts/reg_dethc.js");

// componente detalle 2070 estructura 01 - santiago franco
// se tiene que enviar la llave de la historia y la unidad de servicio de la historia en params

module.exports = Vue.component("content_aiepi847", {
  props: {
    params: {},
  },
  data() {
    return {
      dato_2070_1: detallesHc.WS_2070_1(),

      detalle: [],

      stylesAiepi847: {
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
    dato_tabaquismo() {
      this.dato_2070_1.patol_tabaquismo.trim() == "" ? (this.dato_2070_1.patol_tabaquismo = "N") : false;
      validarInputs(
        {
          form: "#patol_tabaquismo_1",
        },
        () => {
          this._escape();
        },
        () => {
          this.dato_2070_1.patol_tabaquismo = this.dato_2070_1.patol_tabaquismo.toUpperCase();
          var temp = this.dato_2070_1.patol_tabaquismo;
          if (temp == "S" || temp == "N") {
            this.dato_alcoholismo();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_tabaquismo();
          }
        }
      );
    },

    dato_alcoholismo() {
      this.dato_2070_1.patol_alcoholismo.trim() == "" ? (this.dato_2070_1.patol_alcoholismo = "N") : false;
      validarInputs(
        {
          form: "#patol_alcoholismo_1",
        },
        () => {
          this.dato_tabaquismo();
        },
        () => {
          this.dato_2070_1.patol_alcoholismo = this.dato_2070_1.patol_alcoholismo.toUpperCase();
          var temp = this.dato_2070_1.patol_alcoholismo;
          if (temp == "S" || temp == "N") {
            this.dato_drogPsicoact();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_alcoholismo();
          }
        }
      );
    },

    dato_drogPsicoact() {
      this.dato_2070_1.patol_drog_psicoact.trim() == "" ? (this.dato_2070_1.patol_drog_psicoact = "N") : false;
      validarInputs(
        {
          form: "#patol_drog_psicoact_1",
        },
        () => {
          this.dato_alcoholismo();
        },
        () => {
          this.dato_2070_1.patol_drog_psicoact = this.dato_2070_1.patol_drog_psicoact.toUpperCase();
          var temp = this.dato_2070_1.patol_drog_psicoact;
          if (temp == "S" || temp == "N") {
            this.dato_vacunaTeta();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_drogPsicoact();
          }
        }
      );
    },

    dato_vacunaTeta() {
      this.dato_2070_1.vacuna_teta.patol_vacuna_teta.trim() == "" ? (this.dato_2070_1.vacuna_teta.patol_vacuna_teta = "N") : false;
      validarInputs(
        {
          form: "#patol_vacuna_teta_1",
        },
        () => {
          this.dato_drogPsicoact();
        },
        () => {
          this.dato_2070_1.vacuna_teta.patol_vacuna_teta = this.dato_2070_1.vacuna_teta.patol_vacuna_teta.toUpperCase();
          var temp = this.dato_2070_1.vacuna_teta.patol_vacuna_teta;
          if (temp == "S") {
            this.dato_añoVacunaTeta();
          } else if (temp == "N") {
            this.dato_2070_1.vacuna_teta.fecha_vacuna_teta.ano_vacuna_teta = '';
            this.dato_2070_1.vacuna_teta.fecha_vacuna_teta.mes_vacuna_teta = '';
            this.dato_vacunaHepat();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_vacunaTeta();
          }
        }
      );
    },

    dato_añoVacunaTeta() {
      validarInputs({
        form: '#ano_vacuna_teta_1'
      }, () => {
        this.dato_vacunaTeta();
      }, () => {
        let ano = parseInt(this.dato_2070_1.vacuna_teta.fecha_vacuna_teta.ano_vacuna_teta);

        if (ano < 1930) {
          CON851('03', '03', null, 'error', 'error')
          this.dato_añoVacunaTeta();
        } else {
          // continue
          this.dato_mesVacunaTeta();
        }
      })
    },

    dato_mesVacunaTeta() {
      validarInputs({
        form: '#mes_vacuna_teta_1'
      }, () => {
        this.dato_añoVacunaTeta();
      }, () => {
        this.dato_2070_1.vacuna_teta.fecha_vacuna_teta.mes_vacuna_teta = cerosIzq(this.dato_2070_1.vacuna_teta.fecha_vacuna_teta.mes_vacuna_teta, 2);

        let mes = this.dato_2070_1.vacuna_teta.fecha_vacuna_teta.mes_vacuna_teta;
        
        if (mes > 12 || mes == 0 || mes < 0) {
          CON851('03', '03', null, 'error', 'error')
          this.dato_mesVacunaTeta();
        } else {
          // continue
          this.dato_vacunaHepat();
        }
      })
    },

    dato_vacunaHepat() {
      this.dato_2070_1.vacuna_hepat.patol_vacuna_hepat.trim() == "" ? (this.dato_2070_1.vacuna_hepat.patol_vacuna_hepat = "N") : false;
      validarInputs(
        {
          form: "#patol_vacuna_hepat_1",
        },
        () => {
          this.dato_vacunaTeta();
        },
        () => {
          this.dato_2070_1.vacuna_hepat.patol_vacuna_hepat = this.dato_2070_1.vacuna_hepat.patol_vacuna_hepat.toUpperCase();
          var temp = this.dato_2070_1.vacuna_hepat.patol_vacuna_hepat;
          if (temp == "S") {
            this.dato_añoVacunaHepat();
          } else if (temp == "N") {
            this.dato_2070_1.vacuna_hepat.fecha_vacuna_hepat.ano_vacuna_hepat = '';
            this.dato_2070_1.vacuna_hepat.fecha_vacuna_hepat.mes_vacuna_hepat = '';
            this.dato_vacunaRube();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_vacunaHepat();
          }
        }
      );
    },

    dato_añoVacunaHepat() {
      validarInputs({
        form: '#ano_vacuna_hepat_1'
      }, () => {
        this.dato_vacunaHepat();
      }, () => {
        let ano = parseInt(this.dato_2070_1.vacuna_hepat.fecha_vacuna_hepat.ano_vacuna_hepat);

        if (ano < 1930) {
          CON851('03', '03', null, 'error', 'error')
          this.dato_añoVacunaHepat();
        } else {
          // continue
          this.dato_mesVacunaHepat();
        }
      })
    },

    dato_mesVacunaHepat() {
      validarInputs({
        form: '#mes_vacuna_hepat_1'
      }, () => {
        this.dato_añoVacunaHepat();
      }, () => {
        this.dato_2070_1.vacuna_hepat.fecha_vacuna_hepat.mes_vacuna_hepat = cerosIzq(this.dato_2070_1.vacuna_hepat.fecha_vacuna_hepat.mes_vacuna_hepat, 2);

        let mes = this.dato_2070_1.vacuna_hepat.fecha_vacuna_hepat.mes_vacuna_hepat;
        
        if (mes > 12 || mes == 0 || mes < 0) {
          CON851('03', '03', null, 'error', 'error')
          this.dato_mesVacunaHepat();
        } else {
          // continue
          this.dato_vacunaRube();
        }
      })
    },

    dato_vacunaRube() {
      this.dato_2070_1.vacuna_rube.patol_vacuna_rube.trim() == "" ? (this.dato_2070_1.vacuna_rube.patol_vacuna_rube = "N") : false;
      validarInputs(
        {
          form: "#patol_vacuna_rube_1",
        },
        () => {
          this.dato_vacunaHepat();
        },
        () => {
          this.dato_2070_1.vacuna_rube.patol_vacuna_rube = this.dato_2070_1.vacuna_rube.patol_vacuna_rube.toUpperCase();
          var temp = this.dato_2070_1.vacuna_rube.patol_vacuna_rube;
          if (temp == "S") {
            this.dato_añoVacunaRube();
          } else if (temp == "N") {
            this.dato_2070_1.vacuna_rube.fecha_vacuna_rube.ano_vacuna_rube = '';
            this.dato_2070_1.vacuna_rube.fecha_vacuna_rube.mes_vacuna_rube = '';
            this.dato_cuagulopatia();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_vacunaRube();
          }
        }
      );
    },

    dato_añoVacunaRube() {
      validarInputs({
        form: '#ano_vacuna_rube_1'
      }, () => {
        this.dato_vacunaRube();
      }, () => {
        let ano = parseInt(this.dato_2070_1.vacuna_rube.fecha_vacuna_rube.ano_vacuna_rube);

        if (ano < 1930) {
          CON851('03', '03', null, 'error', 'error')
          this.dato_añoVacunaRube();
        } else {
          // continue
          this.dato_mesVacunaRube();
        }
      })
    },

    dato_mesVacunaRube() {
      validarInputs({
        form: '#mes_vacuna_rube_1'
      }, () => {
        this.dato_añoVacunaRube();
      }, () => {
        this.dato_2070_1.vacuna_rube.fecha_vacuna_rube.mes_vacuna_rube = cerosIzq(this.dato_2070_1.vacuna_rube.fecha_vacuna_rube.mes_vacuna_rube, 2);

        let mes = this.dato_2070_1.vacuna_rube.fecha_vacuna_rube.mes_vacuna_rube;
        
        if (mes > 12 || mes == 0 || mes < 0) {
          CON851('03', '03', null, 'error', 'error')
          this.dato_mesVacunaRube();
        } else {
          // continue
          this.dato_cuagulopatia();
        }
      })
    },

    dato_cuagulopatia() {
      this.dato_2070_1.patol_cuagulopatia.trim() == "" ? (this.dato_2070_1.patol_cuagulopatia = "N") : false;
      validarInputs(
        {
          form: "#patol_cuagulopatia_1",
        },
        () => {
          this.dato_vacunaRube();
        },
        () => {
          this.dato_2070_1.patol_cuagulopatia = this.dato_2070_1.patol_cuagulopatia.toUpperCase();
          var temp = this.dato_2070_1.patol_cuagulopatia;
          if (temp == "S" || temp == "N") {
            this.dato_transfusionales();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_cuagulopatia();
          }
        }
      );
    },

    dato_transfusionales() {
      this.dato_2070_1.patol_transfusionales.trim() == "" ? (this.dato_2070_1.patol_transfusionales = "N") : false;
      validarInputs(
        {
          form: "#patol_transfusionales_1",
        },
        () => {
          this.dato_cuagulopatia();
        },
        () => {
          this.dato_2070_1.patol_transfusionales = this.dato_2070_1.patol_transfusionales.toUpperCase();
          var temp = this.dato_2070_1.patol_transfusionales;
          if (temp == "S" || temp == "N") {
            this.grabarDetalle();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_transfusionales();
          }
        }
      );
    },

    async grabarDetalle() {
      loader('show');
      this.dato_2070_1['tipo_ws'] = '01';

      let detalles = {
        "2070": _getObjetoSaveHc(this.dato_2070_1, []),
      }

      grabarDetalles(detalles, this.params.llave_hc);
      loader('hide')
      this._terminar();
    },

    async cargarDestalles() {
      await postData({
        datosh: datosEnvio() + this.params.llave_hc + '|' + '  ' + '|' + '  ' + '|' + '2070' + '|' + this.params.serv_hc + '|'
      }, get_url("app/HICLIN/HCDETAL_PRC.DLL"))
        .then((data) => {
          this.detalle = data["DETHC"];
          this.detalle.pop()

          if (this.detalle.length == 0) {
            this.params.estado = true;
            this.dato_tabaquismo();
          } else {
            let tipo = this.detalle[0].DETALLE.tipo_ws;
            if (tipo != undefined) {
              if (tipo == "01") {
                this.params.estado = true;
                this.dato_2070_1 = this.detalle[0].DETALLE;
                this.dato_tabaquismo();
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
                                      <span class="caption-subject bold">OTROS ANTECEDENTES</span>
                                    </div>
                                  </div>
                                </div>

                                <div class="col-md-7 col-sm-7 col-xs-7" :style="stylesAiepi847.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesAiepi847.flexIzq">1. Tabaquismo</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_tabaquismo_1'>
                                    <input v-model="dato_2070_1.patol_tabaquismo" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-7 col-sm-7 col-xs-7" :style="stylesAiepi847.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesAiepi847.flexIzq">2. Alcoholismo</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_alcoholismo_1'>
                                    <input v-model="dato_2070_1.patol_alcoholismo" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-7 col-sm-7 col-xs-7" :style="stylesAiepi847.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesAiepi847.flexIzq">3. Drogas psicoactivas</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_drog_psicoact_1'>
                                    <input v-model="dato_2070_1.patol_drog_psicoact" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-7 col-sm-7 col-xs-7" :style="stylesAiepi847.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesAiepi847.flexIzq">4. Vacuna tetano</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_vacuna_teta_1'>
                                    <input v-model="dato_2070_1.vacuna_teta.patol_vacuna_teta" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-5 col-sm-5 col-xs-5" :style="stylesAiepi847.flexRow">
                                  <div class="input-group col-md-6 col-sm-6 col-xs-6" style="padding-right: 5px;" id="ano_vacuna_teta_1">
                                    <input v-model="dato_2070_1.vacuna_teta.fecha_vacuna_teta.ano_vacuna_teta" type="number" placeholder="AAAA"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 text-center" maxlength="4" data-orden="1"
                                      required="true" disabled="disabled" />
                                  </div>
                                  <div class="input-group col-md-5 col-sm-5 col-xs-5" style="padding-right: 5px;" id="mes_vacuna_teta_1">
                                    <input v-model="dato_2070_1.vacuna_teta.fecha_vacuna_teta.mes_vacuna_teta" type="number" placeholder="MM"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 text-center" maxlength="2" data-orden="1"
                                      required="true" disabled="disabled" />
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-7 col-sm-7 col-xs-7" :style="stylesAiepi847.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesAiepi847.flexIzq">5. Vacuna hepat. B</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_vacuna_hepat_1'>
                                    <input v-model="dato_2070_1.vacuna_hepat.patol_vacuna_hepat" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-5 col-sm-5 col-xs-5" :style="stylesAiepi847.flexRow">
                                  <div class="input-group col-md-6 col-sm-6 col-xs-6" style="padding-right: 5px;" id="ano_vacuna_hepat_1">
                                    <input v-model="dato_2070_1.vacuna_hepat.fecha_vacuna_hepat.ano_vacuna_hepat" type="number" placeholder="AAAA"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 text-center" maxlength="4" data-orden="1"
                                      required="true" disabled="disabled" />
                                  </div>
                                  <div class="input-group col-md-5 col-sm-5 col-xs-5" style="padding-right: 5px;" id="mes_vacuna_hepat_1">
                                    <input v-model="dato_2070_1.vacuna_hepat.fecha_vacuna_hepat.mes_vacuna_hepat" type="number" placeholder="MM"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 text-center" maxlength="2" data-orden="1"
                                      required="true" disabled="disabled" />
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-7 col-sm-7 col-xs-7" :style="stylesAiepi847.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesAiepi847.flexIzq">6. Vacuna rubeola</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_vacuna_rube_1'>
                                    <input v-model="dato_2070_1.vacuna_rube.patol_vacuna_rube" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="col-md-5 col-sm-5 col-xs-5" :style="stylesAiepi847.flexRow">
                                  <div class="input-group col-md-6 col-sm-6 col-xs-6" style="padding-right: 5px;" id="ano_vacuna_rube_1">
                                    <input v-model="dato_2070_1.vacuna_rube.fecha_vacuna_rube.ano_vacuna_rube" type="number" placeholder="AAAA"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 text-center" maxlength="4" data-orden="1"
                                      required="true" disabled="disabled" />
                                  </div>
                                  <div class="input-group col-md-5 col-sm-5 col-xs-5" style="padding-right: 5px;" id="mes_vacuna_rube_1">
                                    <input v-model="dato_2070_1.vacuna_rube.fecha_vacuna_rube.mes_vacuna_rube" type="number" placeholder="MM"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 text-center" maxlength="2" data-orden="1"
                                      required="true" disabled="disabled" />
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-7 col-sm-7 col-xs-7" :style="stylesAiepi847.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesAiepi847.flexIzq">7. Cuagulopatia</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_cuagulopatia_1'>
                                    <input v-model="dato_2070_1.patol_cuagulopatia" type="text" placeholder="N"
                                    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
                                    data-orden="1" maxlength="1" disabled="disabled">
                                  </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-7 col-sm-7 col-xs-7" :style="stylesAiepi847.flexRow">
                                  <label class="col-md-8 col-sm-8 col-xs-8" :style="stylesAiepi847.flexIzq">8. Tranfusionales</label>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" id='patol_transfusionales_1'>
                                    <input v-model="dato_2070_1.patol_transfusionales" type="text" placeholder="N"
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
