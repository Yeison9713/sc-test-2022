module.exports = Vue.component("content_hc890l", {
  props: {
    params: {},
    data: {},
  },
  data() {
    return {
      discap: this.data,
    };
  },
  watch: {
    "params.estado": function (estado) {
      if (estado) this._validarInitDisacapacidad();
    },
  },
  methods: {
    _validarInitDisacapacidad() {
      let _this = this;
      CON851P("Desea determinar la discapacidad del paciente ?", _this._terminar, _this._validarFisica);
    },
    _validarFisica() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_fisica",
          orden: "1",
        },
        _this._escape,
        () => {
          let fisica = _this._validarSioNo(_this.discap.fisica);
          _this.discap.fisica = fisica;
          _this._validarMental();
        }
      );
    },
    _validarMental() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_mental",
          orden: "1",
        },
        _this._validarFisica,
        () => {
          let mental = _this._validarSioNo(_this.discap.mental);
          _this.discap.mental = mental;
          _this._validarCognitiva();
        }
      );
    },
    _validarCognitiva() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_cognitiva",
          orden: "1",
        },
        _this._validarMental,
        () => {
          let cognitiva = _this._validarSioNo(_this.discap.cognitiva);
          _this.discap.cognitiva = cognitiva;
          _this._validarAuditiva();
        }
      );
    },
    _validarAuditiva() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_auditiva",
          orden: "1",
        },
        _this._validarCognitiva,
        () => {
          let auditiva = _this._validarSioNo(_this.discap.auditiva);
          _this.discap.auditiva = auditiva;
          _this._validarVisual();
        }
      );
    },
    _validarVisual() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_visual",
          orden: "1",
        },
        _this._validarAuditiva,
        () => {
          let visual = _this._validarSioNo(_this.discap.visual);
          _this.discap.visual = visual;
          _this._terminar();
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
      this.$emit("callback", this.discap);
    },
  },
  template: /*html*/ ` 
          <div>
              <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                <div class="form-group box-center" style="text-align: left;">
                    <div
                     class="col-md-12 col-sm-12 col-xs-12 head-box"
                     style="display: flex; justify-content: center; padding-right: 0; padding-left: 0"
                    >
                      <label>Discapacidades paciente</label>
                    </div>

                    <div class="col-md-4 no-padding">

                      <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                        id="fase_fisica">
                        <label style="position: relative;top: 6px;">Fisica ?</label>
                        <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                           <input type="text" v-model="discap.fisica" maxlength="1" placeholder="N" data-orden="1"
                               disabled="disabled" class="form-control col-md-12 col-sm-12 col-xs-12"
                               style="text-align: center;">
                        </div>
                      </div>

                    </div>
                    <div class="col-md-4 no-padding">

                       <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                          id="fase_mental">
                          <label style="position: relative;top: 6px;">Mental ?</label>
                          <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                            <input type="text" v-model="discap.mental" maxlength="1" placeholder="N" data-orden="1"
                              disabled="disabled" class="form-control col-md-12 col-sm-12 col-xs-12"
                              style="text-align: center;">
                          </div>
                      </div>

                    </div>
                    <div class="col-md-4 no-padding">

                       <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                          id="fase_cognitiva">
                          <label style="position: relative;top: 6px;">Cognitiva ?</label>
                          <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                            <input type="text" v-model="discap.cognitiva" maxlength="1" placeholder="N" data-orden="1"
                              disabled="disabled" class="form-control col-md-12 col-sm-12 col-xs-12"
                              style="text-align: center;">
                          </div>
                       </div>

                      
                    </div>
                    <div class="col-md-4 no-padding">

                      <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                          id="fase_auditiva">
                         <label style="position: relative;top: 6px;">Auditiva ?</label>
                         <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                         <input type="text" v-model="discap.auditiva" maxlength="1" placeholder="N" data-orden="1"
                            disabled="disabled" class="form-control col-md-12 col-sm-12 col-xs-12"
                            style="text-align: center;">
                         </div>
                      </div>
                    
                    </div>
                   <div class="col-md-4 no-padding">

                     <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                        id="fase_visual">
                        <label style="position: relative;top: 6px;">Visual ?</label>
                        <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                          <input type="text" v-model="discap.visual" maxlength="1" placeholder="N" data-orden="1"
                            disabled="disabled" class="form-control col-md-12 col-sm-12 col-xs-12"
                            style="text-align: center;">
                        </div>
                     </div>
                   </div>
                </div>
             </div>
          </div>`,
});
