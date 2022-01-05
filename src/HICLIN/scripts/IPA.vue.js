const { detallesHc, grabarDetalles } = require("../../HICLIN/scripts/reg_dethc.js");

module.exports = Vue.component("component-epoc", {
  props: {
    params: {},
  },

  data() {
    return {
      ipa: this.params,

      styles: {
        "flex-inputs": {
          display: "flex",
          "align-items": "center",
          "justify-content": "space-between",
          "text-align": "start",
          padding: "1rem",
        },
        calcIpa: {
          color: "white",
          background: "",
          "font-weight": "bold",
        },
      },

      maskIpa: IMask.createMask({
        mask: Number,
        radix: ".",
        padFractionalZeros: true,
        signed: false,
        scale: 2,
        min: 0,
        max: 999.99,
      }),
    };
  },

  async created() {
    console.log(this.ipa)
    _compIPA = this;
    this.datoFuma();
  },

  computed: {
    calculoIpa() {
      return (this.ipa.nroAnosFumando * this.ipa.nroCigarrillosDiario) / 20 || 0;
    },
    descripValoracionIpa() {
      let descrip = "";
      if (this.calculoIpa >= 41) {
        this.styles.calcIpa.background = "red";
        descrip = "ALTO";
      }
      if (this.calculoIpa >= 21 && this.calculoIpa < 41) {
        this.styles.calcIpa.background = "brown";
        descrip = "MODERADO";
      }
      if (this.calculoIpa < 21) {
        this.styles.calcIpa.background = "green";
        descrip = "LEVE";
      }

      return descrip;
    },
  },

  methods: {
    datoFuma() {
      validarInputs(
        {
          form: "#datoFuma",
        },
        () => this.salir(),
        () => {
          this.ipa.fuma = this.ipa.fuma.trim() ? this.ipa.fuma.trim().toUpperCase() : "N";

          switch (this.ipa.fuma) {
            case "S":
              this.datoNroAniosFumando();
              break;
            case "N":
              this.ipa.nroCigarrillosDiario = "0";
              this.ipa.ipa = this.maskIpa.resolve("0");
              CON851P(
                "01",
                () => this.datoFuma(),
                () => this.terminar()
              );
              break;
            default:
              CON851("03", "03", null, "warning", "Advertencia");
              this.datoFuma();
              break;
          }
        }
      );
    },

    datoNroAniosFumando() {
      validarInputs(
        {
          form: "#datoNroAnosFumando",
        },
        () => this.datoFuma(),
        () => {
          this.ipa.nroAnosFumando = parseInt(this.ipa.nroAnosFumando);

          if (this.ipa.nroAnosFumando) {
            this.datoNroCigarrillosDiario();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoNroAniosFumando();
          }
        }
      );
    },

    datoNroCigarrillosDiario() {
      validarInputs(
        {
          form: "#datoNroCigarrillosDiario",
        },
        () => this.datoNroAniosFumando(),
        () => {
          this.ipa.nroCigarrillosDiario = parseInt(this.ipa.nroCigarrillosDiario);

          if (this.ipa.nroCigarrillosDiario) {
            CON851P(
              "01",
              () => this.datoNroCigarrillosDiario(),
              () => {
                this.ipa.ipa = this.maskIpa.resolve((this.calculoIpa).toString() || "")
                this.terminar()
              }
            );
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoNroCigarrillosDiario();
          }
        }
      );
    },

    salir() {
      this.$emit("callback_esc");
    },

    terminar() {
      console.log(this.ipa)
      this.$emit("callback", this.ipa);
    },
  },

  template: /*html*/ `
  <transition>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="box-center col-lg-5 col-md-5 col-sm-6 col-xs-8">
          <div id="IPA" class="form-group box-center col-md-12 no-padding">
            <div class="col-12">
              <div class="portlet light box-center box-title">
                <div class="portlet-title">
                  <div class="caption" style="width: 100%">
                    <span class="caption-subject bold">INDICE DE PAQUETES DE CIGARRILLOS ANUALES</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12 no-padding">
                <div class="form-horizontal">
                  <div class="col-md-12 no-padding">
                    <div>
                     <div class="col-md-12 no-padding">
                        <div class="col-md-12">
                          <div class="form-group box-center col-12" :style="styles['flex-inputs']">
                            <label class="label-center col-md-10 col-sm-10 col-xs-10"
                              >¿ Fuma actualmente ?</label
                            >
                            <div class="input-group col-md-2 col-xs-2" id="datoFuma">
                              <input 
                                v-model="ipa.fuma" 
                                type="text" 
                                class="form-control center text-center" 
                                placeholder="S/N" 
                                data-orden="1" 
                                maxlength="1" 
                                disabled />
                            </div>
                          </div>
                          <div class="form-group box-center col-12" :style="styles['flex-inputs']">
                            <label class="label-center col-md-10 col-sm-10 col-xs-10"
                              >¿ Número de años fumando ?</label
                            >
                            <div class="input-group col-md-2 col-xs-2" id="datoNroAnosFumando">
                              <input 
                                v-model="ipa.nroAnosFumando"
                                type="number" 
                                class="form-control center text-center" 
                                data-orden="1" 
                                maxlength="2" 
                                disabled />
                            </div>
                          </div>
                          <div class="form-group box-center col-12" :style="styles['flex-inputs']">
                            <label class="label-center col-md-10 col-sm-10 col-xs-10"
                              >¿ Número de cigarrillos diarios ?</label
                            >
                            <div class="input-group col-md-2 col-xs-2" id="datoNroCigarrillosDiario">
                              <input 
                                v-model="ipa.nroCigarrillosDiario" 
                                type="number" 
                                class="form-control center text-center" 
                                data-orden="1" 
                                maxlength="3" 
                                disabled />
                            </div>
                          </div>
                          <div class="form-group box-center col-12" :style="styles['flex-inputs']">
                            <label class="label-center col-md-10 col-sm-10 col-xs-10"
                              >IPA</label
                            >
                            <div class="input-group col-md-2 col-xs-2">
                              <input 
                                :value="calculoIpa" 
                                type="number" 
                                class="form-control center text-center" 
                                data-orden="1" 
                                maxlength="6" 
                                disabled />
                            </div>
                          </div>
                          <div class="form-group box-center col-12" :style="styles['flex-inputs']">
                            <label class="label-center col-md-8 col-sm-8 col-xs-6"
                              >Riesgo de cancer de pulmon</label
                            >
                            <div class="input-group col-md-4 col-sm-4 col-xs-6">
                            <input 
                              :value="descripValoracionIpa" 
                              :style="styles.calcIpa" 
                              type="text" 
                              class="form-control center text-center" 
                              data-orden="1" 
                              maxlength="1" 
                              disabled/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
