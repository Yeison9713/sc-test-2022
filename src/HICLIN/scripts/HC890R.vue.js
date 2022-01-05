const { detallesHc, grabarDetalles } = require("../../HICLIN/scripts/reg_dethc.js");

module.exports = Vue.component("component-epoc", {
  props: {
    params: {},
  },

  data() {
    return {
      ws9014: detallesHc.WS_9014(),
      llave_hc: null,
      styles: {
        "flex-inputs": {
          display: "flex",
          "align-items": "center",
          "justify-content": "space-between",
          "text-align": "start",
          padding: "1rem",
        },
        calcEPOC: {
          color: "white",
          background: "",
          "font-weight": "bold",
        },
      },
    };
  },

  async created() {
    _compHC890R = this;
    this.getDetalleHistoria();
  },

  computed: {
    calcularEPOC() {
      let puntaje = 0;
      // Object.values(this.ws9014).forEach(val => puntaje += val == "S" ? 1 : 0);
      if (this.ws9014.tos == "S") ++puntaje;
      if (this.ws9014.flema_mocos == "S") ++puntaje;
      if (this.ws9014.sin_aire == "S") ++puntaje;
      if (this.ws9014.mayor_40 == "S") ++puntaje;
      if (this.ws9014.fuma_exfuma == "S") ++puntaje;

      this.$nextTick(() => {
        this.ws9014.calc_epoc = puntaje;
      });

      return puntaje;
    },
    descripPuntajeHC890R() {
      if (this.calcularEPOC >= 3) {
        this.styles.calcEPOC.background = "red";
        return "PUEDE TENER EPOC";
      } else if (this.calcularEPOC == 0) {
        this.styles.calcEPOC.background = "";
        return "";
      } else {
        this.styles.calcEPOC.background = "green";
        return "RIESGO BAJO";
      }
    },
  },

  methods: {
    getDetalleHistoria() {
      loader("show");
      postData({ datosh: datosEnvio() + this.params.llave_hc + "|||9014|" }, get_url("APP/HICLIN/HCDETAL_PRC.DLL"))
        .then((data) => {
          loader("hide");
          let det9014 = data.DETHC.find((el) => el["COD-DETHC"] == "9014");
          this.ws9014 = det9014 ? det9014.DETALLE : detallesHc.WS_9014();
          this.datoTosHC890R();
        })
        .catch((error) => {
          loader("hide");
          console.error("Error consultado detalle de Historia", error);
          this.salir();
        });
    },

    datoTosHC890R() {
      validarInputs(
        {
          form: "#datoTosHC890R",
        },
        () =>this.salir(),
        () => {
          this.ws9014.tos = this.ws9014.tos.trim() ? this.ws9014.tos.trim().toUpperCase() : "N";

          if (this.ws9014.tos == "S" || this.ws9014.tos == "N") this.datoFlemaHC890R();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoTosHC890R();
          }
        }
      );
    },

    datoFlemaHC890R() {
      validarInputs(
        {
          form: "#datoFlemaHC890R",
        },
        () => this.datoTosHC890R(),
        () => {
          this.ws9014.flema_mocos = this.ws9014.flema_mocos.trim() ? this.ws9014.flema_mocos.trim().toUpperCase() : "N";

          if (this.ws9014.flema_mocos == "S" || this.ws9014.flema_mocos == "N") this.datoSinAireHC890R();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoFlemaHC890R();
          }
        }
      );
    },

    datoSinAireHC890R() {
      validarInputs(
        {
          form: "#datoSinAireHC890R",
        },
        () => this.datoFlemaHC890R(),
        () => {
          this.ws9014.sin_aire = this.ws9014.sin_aire.trim() ? this.ws9014.sin_aire.trim().toUpperCase() : "N";

          if (this.ws9014.sin_aire == "S" || this.ws9014.sin_aire == "N") this.datoMayor40HC890R();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoSinAireHC890R();
          }
        }
      );
    },

    datoMayor40HC890R() {
      validarInputs(
        {
          form: "#datoMayor40HC890R",
        },
        () => this.datoSinAireHC890R(),
        () => {
          this.ws9014.mayor_40 = this.ws9014.mayor_40.trim() ? this.ws9014.mayor_40.trim().toUpperCase() : "N";

          if (this.ws9014.mayor_40 == "S" || this.ws9014.mayor_40 == "N") this.datoFumaExFumaHC890R();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoMayor40HC890R();
          }
        }
      );
    },

    datoFumaExFumaHC890R() {
      validarInputs(
        {
          form: "#datoFumaExFumaHC890R",
        },
        () => this.datoMayor40HC890R(),
        () => {
          this.ws9014.fuma_exfuma = this.ws9014.fuma_exfuma.trim() ? this.ws9014.fuma_exfuma.trim().toUpperCase() : "N";

          if (this.ws9014.fuma_exfuma == "S" || this.ws9014.fuma_exfuma == "N") {
            CON851P(
              "01",
              () => this.datoFumaExFumaHC890R(),
              () => this.grabarDetalleHC890R()
            );
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoFumaExFumaHC890R();
          }
        }
      );
    },

    async grabarDetalleHC890R() {
      loader("show");
      let detalle = {
        9014: _getObjetoSaveHc(this.ws9014),
      };

      console.log(detalle);
      grabarDetalles(detalle, this.params.llave_hc)
        .then(() => {
          loader("hide");
          CON851("", "Formulario EPOC grabado con exito!", null, "success", "Exito");
          this.terminar();
        })
        .catch((error) => {
          loader("hide");
          CON851("", "grabando Formulario EPOC", null, "error", "Error");
          this.datoFumaExFumaHC890R();
        });
    },

    salir() {
      this.$emit("callback_esc");
    },

    terminar() {
      this.$emit("callback");
    },
  },

  template: /*html*/ `
  <transition>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="box-center col-lg-6 col-md-8 col-sm-10 col-xs-12">
          <div id="HC890R" class="form-group box-center col-md-12 no-padding">
            <div class="col-12">
              <div class="portlet light box-center box-title">
                <div class="portlet-title">
                  <div class="caption" style="width: 100%">
                    <span class="caption-subject bold">ENFERMEDAD PULMONAR OBSTRUCTIVA CRÓNICA</span>
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
                              >1. ¿ Tose muchas veces la mayoría de los días ?</label
                            >
                            <div class="input-group col-md-2 col-xs-2" id="datoTosHC890R">
                              <input v-model="ws9014.tos" type="text" class="form-control center text-center" placeholder="S/N" data-orden="1" maxlength="1" disabled />
                            </div>
                          </div>
                          <div class="form-group box-center col-12" :style="styles['flex-inputs']">
                            <label class="label-center col-md-10 col-sm-10 col-xs-10"
                              >2. ¿ Tiene flemas o mocos la mayoría de los días ?</label
                            >
                            <div class="input-group col-md-2 col-xs-2" id="datoFlemaHC890R">
                              <input v-model="ws9014.flema_mocos" type="text" class="form-control center text-center" placeholder="S/N" data-orden="1" maxlength="1" disabled />
                            </div>
                          </div>
                          <div class="form-group box-center col-12" :style="styles['flex-inputs']">
                            <label class="label-center col-md-10 col-sm-10 col-xs-10"
                              >3. ¿ Se queda sin aire más facilmente que otras personas de su edad ?</label
                            >
                            <div class="input-group col-md-2 col-xs-2" id="datoSinAireHC890R">
                              <input v-model="ws9014.sin_aire" type="text" class="form-control center text-center" placeholder="S/N" data-orden="1" maxlength="1" disabled />
                            </div>
                          </div>
                          <div class="form-group box-center col-12" :style="styles['flex-inputs']">
                            <label class="label-center col-md-10 col-sm-10 col-xs-10"
                              >4. ¿ Es mayor de 40 años ?</label
                            >
                            <div class="input-group col-md-2 col-xs-2" id="datoMayor40HC890R">
                              <input v-model="ws9014.mayor_40" type="text" class="form-control center text-center" placeholder="S/N" data-orden="1" maxlength="1" disabled />
                            </div>
                          </div>
                          <div class="form-group box-center col-12" :style="styles['flex-inputs']">
                            <label class="label-center col-md-10 col-sm-10 col-xs-10"
                              >5. ¿ Actualmente fuma o es un exfumador ?</label
                            >
                            <div class="input-group col-md-2 col-xs-2" id="datoFumaExFumaHC890R">
                              <input v-model="ws9014.fuma_exfuma" type="text" class="form-control center text-center" placeholder="S/N" data-orden="1" maxlength="1" disabled />
                            </div>
                          </div>
                          
                          <div class="form-group box-center col-md-12 col-md-12 col-xs-12" :style="styles['flex-inputs']">
                            <div class="input-group col-md-12 col-sm-12 col-xs-12">
                              <input :value="descripPuntajeHC890R" :style="styles.calcEPOC" type="text" class="form-control center text-center" data-orden="1" maxlength="1" disabled/>
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
