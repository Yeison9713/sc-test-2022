module.exports = Vue.component("content_hc890i", {
  props: {
    params: {},
    data: {},
  },
  data() {
    return {
      signos: this.data,
      stylesHC890i: {
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
    "params.estado": function (estado) {
      if (estado) this._validarPreservativo();
    },
  },
  methods: {
    _validarPreservativo() {
      validarInputs(
        {
          form: "#validarPreservativo_hc890i",
          orden: "1",
        },
        this._escape,
        () => {
          this.signos.sexo_sin_proteccion = this._validarSioNo(this.signos.sexo_sin_proteccion);

          if (this.signos.sexo_sin_proteccion == 'S') this.validarPrueba()
          else {
            this.signos.prueba_vih_sifilis = ''
            this.signos.resultado_vih_sifilis = ''
            this._terminar();
          }
        }
      );
    },
    validarPrueba() {
      validarInputs(
        {
          form: "#validarPruebaVIH_hc890i",
          orden: "1",
        },
        this._validarPreservativo,
        () => {
          this.signos.prueba_vih_sifilis = this._validarSioNo(this.signos.prueba_vih_sifilis);
           
          if (this.signos.prueba_vih_sifilis == 'S') this.validarResultadoPrueba()
          else {
            this.signos.resultado_vih_sifilis = ''
            this._terminar();
          }
        }
      );
    },
    validarResultadoPrueba() {
      validarInputs(
        {
          form: "#validarResultadoPrueba_hc890i",
          orden: "1",
        },
        this.validarPrueba,
        () => {
          this.signos.resultado_vih_sifilis = this.signos.resultado_vih_sifilis.toUpperCase().trim()
          this._terminar();
        }
      );
    },
    _validarSioNo(val) {
      let retornar = "N";
      val = val || "";
      val = val.toUpperCase();
      switch (val) {
        case "S":
        case "N":
          retornar = val;
          break;
      }
      return retornar;
    },
    _escape() {
      this.$emit("callback_esc");
    },
    _terminar() {
      this.$emit("callback", this.signos);
    },
  },
  template: /*html*/ ` 
          <div>
              <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                <div class="form-group box-center" style="text-align: left;">

                    <div class="col-md-12" :style="stylesHC890i.flexRow"
                       id="validarPreservativo_hc890i">
                      <div class="col-md-11 col-sm-10 col-xs-10 no-padding">
                        <label class="col-md-12 col-sm-12 col-xs-12" :style="stylesHC890i.flexIzq">Ha participado en relaciones sexuales penetrativas sin preservativo ?</label>
                      </div>
                      <div class="col-md-1 no-padding" :style="stylesHC890i.flexRow">
                        <div class="col-md-12 col-sm-4 col-xs-4 no-padding">
                           <input type="text" v-model="signos.sexo_sin_proteccion" maxlength="1" placeholder="N" data-orden="1"
                             disabled="disabled" class="form-control col-md-12 col-sm-12 col-xs-12">
                        </div>
                      </div>
                    </div>

                    <div v-if="signos.sexo_sin_proteccion == 'S'">

                      <div class="salto-linea"></div>

                      <div class="col-md-12" :style="stylesHC890i.flexRow" style="padding-left: 0"
                       id="validarPruebaVIH_hc890i">
                       <div class="col-md-11 col-sm-10 col-xs-10 no-padding">
                         <label class="col-md-12 col-sm-12 col-xs-12" :style="stylesHC890i.flexIzq">Después de esa relación se ha realizó alguna prueba para la detección de VIH o SÍFILIS ?</label>
                        </div>
                        <div class="col-md-1 no-padding" :style="stylesHC890i.flexRow">
                         <div class="col-md-12 col-sm-4 col-xs-4 no-padding">
                           <input type="text" v-model="signos.prueba_vih_sifilis" maxlength="1" placeholder="N" data-orden="1"
                             disabled="disabled" class="form-control col-md-12 col-sm-12 col-xs-12">
                          </div>
                        </div>
                      </div>

                      <div v-if="signos.prueba_vih_sifilis == 'S'">
                         <div class="salto-linea"></div>

                         <div class="col-md-12" :style="stylesHC890i.flexRow" style="padding-left: 0">
                           <div class="col-md-6 col-sm-6 col-xs-6 no-padding">
                             <label class="col-md-12 col-sm-12 col-xs-12" :style="stylesHC890i.flexIzq">Resultado de la prueba :</label>
                           </div>
                           <div class="col-md-6 col-sm-6 col-xs-6 no-padding" :style="stylesHC890i.flexRow">
                              <div class="col-md-12 col-sm-4 col-xs-4 no-padding" id="validarResultadoPrueba_hc890i">
                                <input
                                    v-model="signos.resultado_vih_sifilis"
                                    class="form-control"
                                    type="text"
                                    maxlength="30" 
                                    data-orden="1"
                                    disabled
                                    style="text-align: left"
                                />
                              </div>
                            </div>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>`,
});
