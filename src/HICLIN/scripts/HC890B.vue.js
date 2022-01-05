const { detallesHc, grabarDetalles, grabarDetallesText } = require("../../HICLIN/scripts/reg_dethc.js");

module.exports = Vue.component("component-HC890B", {
  props: {
    params: {},
  },

  data() {
    return {
      ws9005: detallesHc.WS_9005(),
      modalDependeciaFuncional: false,

      totalBarthel: 0,
      colorDependencia: "",

      styles: {
        "flex-row-inputs": {
          display: "flex",
          "flex-wrap": "wrap",
          "align-items": "center",
        },
        "group-input": {
          "margin-bottom": "1rem",
        },
        "label-left": {
          "text-align": "left",
          "text-overflow": "ellipsis",
          "white-space": "nowrap",
          overflow: "hidden",
        },
      },
    };
  },

  created() {
    _compHC890B = this;
  },

  watch: {
    "params.estado": function (estado) {
      if (estado) this.getDetalleHistoria();
    },
  },

  computed: {
    descripComer() {
      let comer = this.opcArrayPoPup("comer").find((el) => el.COD == this.ws9005.comer_9005);
      return comer ? comer.DESCRIP : "";
    },

    descripLavarse() {
      let lavarse = this.opcArrayPoPup("lavarse").find((el) => el.COD == this.ws9005.lavarse_9005);
      return lavarse ? lavarse.DESCRIP : "";
    },

    descripVestirse() {
      let vestirse = this.opcArrayPoPup("vestirse").find((el) => el.COD == this.ws9005.vestirse_9005);
      return vestirse ? vestirse.DESCRIP : "";
    },

    descripArreglarse() {
      let arreglarse = this.opcArrayPoPup("arreglarse").find((el) => el.COD == this.ws9005.arreglarse_9005);
      return arreglarse ? arreglarse.DESCRIP : "";
    },

    descripDeposicion() {
      let deposicion = this.opcArrayPoPup("deposicion").find((el) => el.COD == this.ws9005.deposicion_9005);
      return deposicion ? deposicion.DESCRIP : "";
    },

    descripMiccion() {
      let miccion = this.opcArrayPoPup("miccion").find((el) => el.COD == this.ws9005.miccion_9005);
      return miccion ? miccion.DESCRIP : "";
    },

    descripBanio() {
      let banio = this.opcArrayPoPup("baño").find((el) => el.COD == this.ws9005.bano_9005);
      return banio ? banio.DESCRIP : "";
    },

    descripTrasladarse() {
      let trasladarse = this.opcArrayPoPup("trasladarse").find((el) => el.COD == this.ws9005.trasladarse_9005);
      return trasladarse ? trasladarse.DESCRIP : "";
    },

    descripDeambulacion() {
      let deambulacion = this.opcArrayPoPup("deambulacion").find((el) => el.COD == this.ws9005.deambulacion_9005);
      return deambulacion ? deambulacion.DESCRIP : "";
    },

    descripEscaleras() {
      let escaleras = this.opcArrayPoPup("escaleras").find((el) => el.COD == this.ws9005.escaleras_9005);
      return escaleras ? escaleras.DESCRIP : "";
    },

    calcularBarthel() {
      this.totalBarthel = 0;

      switch (this.ws9005.comer_9005) {
        case "1":
          this.totalBarthel += 10;
          break;
        case "2":
          this.totalBarthel += 5;
          break;
        default:
          this.totalBarthel += 0;
          break;
      }

      this.totalBarthel += this.ws9005.lavarse_9005 == "1" ? 5 : 0;

      switch (this.ws9005.vestirse_9005) {
        case "1":
          this.totalBarthel += 10;
          break;
        case "2":
          this.totalBarthel += 5;
          break;
        default:
          this.totalBarthel += 0;
          break;
      }

      this.totalBarthel += this.ws9005.arreglarse_9005 == "1" ? 5 : 0;

      switch (this.ws9005.deposicion_9005) {
        case "1":
          this.totalBarthel += 10;
          break;
        case "2":
          this.totalBarthel += 5;
          break;
        default:
          this.totalBarthel += 0;
          break;
      }

      switch (this.ws9005.miccion_9005) {
        case "1":
          this.totalBarthel += 10;
          break;
        case "2":
          this.totalBarthel += 5;
          break;
        default:
          this.totalBarthel += 0;
          break;
      }

      switch (this.ws9005.bano_9005) {
        case "1":
          this.totalBarthel += 10;
          break;
        case "2":
          this.totalBarthel += 5;
          break;
        default:
          this.totalBarthel += 0;
          break;
      }

      switch (this.ws9005.trasladarse_9005) {
        case "1":
          this.totalBarthel += 15;
          break;
        case "2":
          this.totalBarthel += 10;
          break;
        case "3":
          this.totalBarthel += 5;
          break;
        default:
          this.totalBarthel += 0;
          break;
      }

      switch (this.ws9005.deambulacion_9005) {
        case "1":
          this.totalBarthel += 15;
          break;
        case "2":
          this.totalBarthel += 10;
          break;
        case "3":
          this.totalBarthel += 5;
          break;
        default:
          this.totalBarthel += 0;
          break;
      }

      switch (this.ws9005.escaleras_9005) {
        case "1":
          this.totalBarthel += 10;
          break;
        case "2":
          this.totalBarthel += 5;
          break;
        default:
          this.totalBarthel += 0;
          break;
      }

      return this.totalBarthel;
    },

    descripDependencia() {
      if (this.totalBarthel >= 0 && this.totalBarthel <= 20) {
        this.colorDependencia = "red";
        return "TOTAL";
      }

      if (this.totalBarthel >= 25 && this.totalBarthel <= 45) {
        this.colorDependencia = "red";
        return "SEVERA";
      }

      if (this.totalBarthel >= 50 && this.totalBarthel <= 60) {
        this.colorDependencia = "brown";
        return "MODERADA";
      }

      if (this.totalBarthel > 60) {
        this.colorDependencia = "green";
        return "LEVE";
      }

      this.colorDependencia = "";
      return "";
    },
  },

  methods: {
    opcArrayPoPup(dato) {
      switch (dato) {
        case "comer":
        case "vestirse":
        case "baño":
        case "escaleras":
          return [
            { COD: "1", DESCRIP: "INDEPENDIENTE" },
            { COD: "2", DESCRIP: "NECESITA AYUDA" },
            { COD: "3", DESCRIP: "DEPENDIENTE" },
          ];
        case "lavarse":
        case "arreglarse":
          return [
            { COD: "1", DESCRIP: "INDEPENDIENTE" },
            { COD: "2", DESCRIP: "DEPENDIENTE" },
          ];
        case "deposicion":
        case "miccion":
          return [
            { COD: "1", DESCRIP: "COTINENTE" },
            { COD: "2", DESCRIP: "ACCIDENTE OCASIONAL" },
            { COD: "3", DESCRIP: "INCONCIENTE" },
          ];
        case "trasladarse":
          return [
            { COD: "1", DESCRIP: "INDEPENDIENTE" },
            { COD: "2", DESCRIP: "MINIMA AYUDA" },
            { COD: "3", DESCRIP: "GRAN AYUDA" },
            { COD: "4", DESCRIP: "DEPENDIENTE" },
          ];
        case "deambulacion":
          return [
            { COD: "1", DESCRIP: "INDEPENDIENTE" },
            { COD: "2", DESCRIP: "NECESITA AYUDA" },
            { COD: "3", DESCRIP: "INDEPENDIENTE DE LA SILLA DE RUEDAS" },
            { COD: "4", DESCRIP: "DEPENDIENTE" },
          ];
      }
    },

    getDetalleHistoria() {
      loader("show");
      postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + "|||9005|" }, get_url("APP/HICLIN/HCDETAL_PRC.DLL"))
        .then((data) => {
          loader("hide");
          let WS9005 = data.DETHC.find((el) => el["COD-DETHC"] == "9005");
          this.ws9005 = WS9005 ? WS9005.DETALLE : detallesHc.WS_9005();

          if (this.params.estado == 1) this.datoValoracionHC90B();
          else {
            this.modalDependeciaFuncional = true;

            setTimeout(() => {
              this.dato_NivelSecuelas()
            }, 300);

          }
        })
        .catch((error) => {
          loader("hide");
          console.error("Error consultado detalle de Historia", error);
          this.salir();
        });
    },

    datoValoracionHC90B() {
      validarInputs(
        {
          form: "#datoValoracionHC90B",
        },
        () => this.salir(),
        () => {
          let val = (this.ws9005.valoracion_9005 = this.ws9005.valoracion_9005.toUpperCase().trim());

          switch (val) {
            case "S":
            case "N":
              this.datoRevaloracionHC90B();
              break;
            default:
              CON851("03", "03", null, "warning", "Advertencia");
              this.datoValoracionHC90B();
          }
        }
      );
    },

    datoRevaloracionHC90B() {
      validarInputs(
        {
          form: "#datoRevaloracionHC90B",
        },
        () => this.datoValoracionHC90B(),
        () => {
          let val = (this.ws9005.revaloracion_9005 = this.ws9005.revaloracion_9005.toUpperCase().trim());

          switch (val) {
            case "S":
            case "N":
              this.datoComerHC90B();
              break;
            default:
              CON851("03", "03", null, "warning", "Advertencia");
              this.datoRevaloracionHC90B();
          }
        }
      );
    },

    datoComerHC90B() {
      setTimeout(
        () =>
          POPUP(
            {
              titulo: "COMER",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.opcArrayPoPup("comer"),
              seleccion: this.ws9005.comer_9005,
              callback_f: () => this.datoRevaloracionHC90B(),
            },
            (data) => {
              this.ws9005.comer_9005 = data.COD;
              this.datoLavarseHC90B();
            }
          ),
        300
      );
    },

    datoLavarseHC90B() {
      setTimeout(
        () =>
          POPUP(
            {
              titulo: "LAVARSE / BAÑARSE",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.opcArrayPoPup("lavarse"),
              seleccion: this.ws9005.lavarse_9005,
              callback_f: () => this.datoComerHC90B(),
            },
            (data) => {
              this.ws9005.lavarse_9005 = data.COD;
              this.datoVestirseHC90B();
            }
          ),
        300
      );
    },

    datoVestirseHC90B() {
      setTimeout(
        () =>
          POPUP(
            {
              titulo: "VESTIRSE",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.opcArrayPoPup("vestirse"),
              seleccion: this.ws9005.vestirse_9005,
              callback_f: () => this.datoLavarseHC90B(),
            },
            (data) => {
              this.ws9005.vestirse_9005 = data.COD;
              this.datoArreglarseHC90B();
            }
          ),
        300
      );
    },

    datoArreglarseHC90B() {
      setTimeout(
        () =>
          POPUP(
            {
              titulo: "ARREGLARSE",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.opcArrayPoPup("arreglarse"),
              seleccion: this.ws9005.arreglarse_9005,
              callback_f: () => this.datoVestirseHC90B(),
            },
            (data) => {
              this.ws9005.arreglarse_9005 = data.COD;
              this.datoDeposicionHC90B();
            }
          ),
        300
      );
    },

    datoDeposicionHC90B() {
      setTimeout(
        () =>
          POPUP(
            {
              titulo: "DEPOSICION",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.opcArrayPoPup("deposicion"),
              seleccion: this.ws9005.deposicion_9005,
              callback_f: () => this.datoArreglarseHC90B(),
            },
            (data) => {
              this.ws9005.deposicion_9005 = data.COD;
              this.datoMiccionHC90B();
            }
          ),
        300
      );
    },

    datoMiccionHC90B() {
      setTimeout(
        () =>
          POPUP(
            {
              titulo: "MICCION",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.opcArrayPoPup("miccion"),
              seleccion: this.ws9005.miccion_9005,
              callback_f: () => this.datoDeposicionHC90B(),
            },
            (data) => {
              this.ws9005.miccion_9005 = data.COD;
              this.datoBanioHC90B();
            }
          ),
        300
      );
    },

    datoBanioHC90B() {
      setTimeout(
        () =>
          POPUP(
            {
              titulo: "IR AL BAÑO",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.opcArrayPoPup("baño"),
              seleccion: this.ws9005.bano_9005,
              callback_f: () => this.datoMiccionHC90B(),
            },
            (data) => {
              this.ws9005.bano_9005 = data.COD;
              this.datoTrasladarseHC90B();
            }
          ),
        300
      );
    },

    datoTrasladarseHC90B() {
      setTimeout(
        () =>
          POPUP(
            {
              titulo: "TRASLADARSE DEL SILLON A LA CAMA",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.opcArrayPoPup("trasladarse"),
              seleccion: this.ws9005.trasladarse_9005,
              callback_f: () => this.datoBanioHC90B(),
            },
            (data) => {
              this.ws9005.trasladarse_9005 = data.COD;
              this.datoDeambulacionHC90B();
            }
          ),
        300
      );
    },

    datoDeambulacionHC90B() {
      setTimeout(
        () =>
          POPUP(
            {
              titulo: "DEAMBULACION",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.opcArrayPoPup("deambulacion"),
              seleccion: this.ws9005.deambulacion_9005,
              callback_f: () => this.datoTrasladarseHC90B(),
            },
            (data) => {
              this.ws9005.deambulacion_9005 = data.COD;
              this.datoEscaleras();
            }
          ),
        300
      );
    },

    datoEscaleras() {
      setTimeout(
        () =>
          POPUP(
            {
              titulo: "SUBIR Y BAJAR ESCALERAS",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.opcArrayPoPup("escaleras"),
              seleccion: this.ws9005.escaleras_9005,
              callback_f: () => this.datoDeambulacionHC90B(),
            },
            (data) => {
              this.ws9005.escaleras_9005 = data.COD;
              this.grabarDetalleHC890B();
            }
          ),
        300
      );
    },

    // dependencia funcional

    dato_NivelSecuelas() {
      validarInputs(
        {
          form: "#datoNivelSecuelas",
        },
        () => {
          this.salir();
        },
        () => {
          let text = this.ws9005.nivel_secuelas_9005 || "";
          this.ws9005.nivel_secuelas_9005 = text.toUpperCase().replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "");
          this.dato_controlActividades()
        }
      );
    },

    dato_controlActividades() {
      validarInputs(
        {
          form: "#datoActividades",
        },
        () => {
          this.dato_NivelSecuelas();
        },
        () => {
          let tabla = this.ws9005.tabla_actividades_9005 || ""
          this.ws9005.tabla_actividades_9005 = tabla.toUpperCase().replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")

          this.dato_dependFuncional()
        }
      );
    },

    dato_dependFuncional() {
      validarInputs(
        {
          form: "#datoDependFuncional",
        },
        () => {
          this.dato_controlActividades();
        },
        () => {
          this.modalDependeciaFuncional = false;

          let text = this.ws9005.depen_funcional_9005 || "";
          this.ws9005.depen_funcional_9005 = text.toUpperCase().replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "");
          this.grabarDetalleHC890B()

        }
      );
    },
    async grabarDetalleHC890B() {
      loader("show");
      let detalle = {
        9005: _getObjetoSaveHc(this.ws9005),
      };

      console.log(detalle);
      grabarDetalles(detalle, $_REG_HC.llave_hc)
        .then(() => {
          loader("hide");
          CON851("", "Escala Barthel grabada con exito!", null, "success", "Exito");
          this.terminar();
        })
        .catch((error) => {
          console.error("Error grabando WS9005: ", error);
          CON851("", "grabando escala Barthel", null, "error", "Error");
          this.datoEscaleras();
          loader("hide");
        });
    },

    salir() {
      this.$emit("callback_esc");
    },

    terminar() {
      this.$emit("callback");
    },
  },

  template: /* html */ `
      <div>
        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
          <div class="portlet light box-center box-title">
            <div class="portlet-title">
              <div class="caption">
                <span class="caption-subject bold">ESCALA DE BARTHEL PARA LA VALORACION DE FUNCION FISICA</span>
              </div>
            </div>
          </div>
          <div class="col-md-12 no-padding">
            <div class="form-horizontal">
              <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                <div class="form-group box-center col-md-12">
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding">
                    <div class="col-md-12" :style="styles['flex-row-inputs']">
                      <label class="col-md-6 col-sm-6 col-xs-6" :style="styles['label-left']">Primera valoración</label>
                      <div id="datoValoracionHC90B" class="col-md-6 col-sm-6 col-xs-6">
                        <input
                          v-model="ws9005.valoracion_9005"
                          class="form-control"
                          type="text"
                          maxlength="1"
                          placeholder="S/N"
                          data-orden="1"
                          required
                          disabled
                          style="text-align: center"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding">
                    <div class="col-md-12" :style="styles['flex-row-inputs']">
                      <label class="col-md-6 col-sm-6 col-xs-6" :style="styles['label-left']">Revaloración</label>
                      <div id="datoRevaloracionHC90B" class="col-md-6 col-sm-6 col-xs-6">
                        <input
                          v-model="ws9005.revaloracion_9005"
                          class="form-control"
                          type="text"
                          maxlength="1"
                          placeholder="S/N"
                          data-orden="1"
                          required
                          disabled
                          style="text-align: center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                <div class="form-group box-center col-md-12">
                  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 no-padding" :style="styles['group-input']">
                    <div class="col-md-12" :style="styles['flex-row-inputs']">
                      <label class="col-md-12 col-sm-12 col-xs-12" :style="styles['label-left']">Comer</label>
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                        <input v-model="descripComer" class="form-control" type="text" maxlength="1" disabled />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 no-padding" :style="styles['group-input']">
                    <div class="col-md-12" :style="styles['flex-row-inputs']">
                      <label class="col-md-12 col-sm-12 col-xs-12" :style="styles['label-left']">Lavarse/Bañarse</label>
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                        <input v-model="descripLavarse" class="form-control" type="text" maxlength="1" disabled />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 no-padding" :style="styles['group-input']">
                    <div class="col-md-12" :style="styles['flex-row-inputs']">
                      <label class="col-md-12 col-sm-12 col-xs-12" :style="styles['label-left']">Vestirse</label>
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                        <input v-model="descripVestirse" class="form-control" type="text" maxlength="1" disabled />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 no-padding" :style="styles['group-input']">
                    <div class="col-md-12" :style="styles['flex-row-inputs']">
                      <label class="col-md-12 col-sm-12 col-xs-12" :style="styles['label-left']">Arreglarse</label>
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                        <input v-model="descripArreglarse" class="form-control" type="text" maxlength="1" disabled />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 no-padding" :style="styles['group-input']">
                    <div class="col-md-12" :style="styles['flex-row-inputs']">
                      <label class="col-md-12 col-sm-12 col-xs-12" :style="styles['label-left']">Deposición</label>
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                        <input v-model="descripDeposicion" class="form-control" type="text" maxlength="1" disabled />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 no-padding" :style="styles['group-input']">
                    <div class="col-md-12" :style="styles['flex-row-inputs']">
                      <label class="col-md-12 col-sm-12 col-xs-12" :style="styles['label-left']"
                        >Micción/Valorar la situación en la semana previa</label
                      >
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                        <input v-model="descripMiccion" class="form-control" type="text" maxlength="1" disabled />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 no-padding" :style="styles['group-input']">
                    <div class="col-md-12" :style="styles['flex-row-inputs']">
                      <label class="col-md-12 col-sm-12 col-xs-12" :style="styles['label-left']">Ir al baño</label>
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                        <input v-model="descripBanio" class="form-control" type="text" maxlength="1" disabled />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 no-padding" :style="styles['group-input']">
                    <div class="col-md-12" :style="styles['flex-row-inputs']">
                      <label class="col-md-12 col-sm-12 col-xs-12" :style="styles['label-left']"
                        >Trasladarse del sillón a la cama</label
                      >
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                        <input v-model="descripTrasladarse" class="form-control" type="text" maxlength="1" disabled />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 no-padding" :style="styles['group-input']">
                    <div class="col-md-12" :style="styles['flex-row-inputs']">
                      <label class="col-md-12 col-sm-12 col-xs-12" :style="styles['label-left']">Deambulación</label>
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                        <input v-model="descripDeambulacion" class="form-control" type="text" maxlength="1" disabled />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 no-padding" :style="styles['group-input']">
                    <div class="col-md-12" :style="styles['flex-row-inputs']">
                      <label class="col-md-12 col-sm-12 col-xs-12" :style="styles['label-left']"
                        >Subir y bajar escalera</label
                      >
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                        <input v-model="descripEscaleras" class="form-control" type="text" maxlength="1" disabled />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                <div class="form-group box-center col-md-12">
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding">
                    <div class="col-md-12" :style="styles['flex-row-inputs']">
                      <label class="col-md-6 col-sm-6 col-xs-6" :style="styles['label-left']">PUNTAJE TOTAL:</label>
                      <div class="col-md-6 col-sm-6 col-xs-6">
                        <input
                          v-model="calcularBarthel"
                          class="form-control"
                          type="text"
                          data-orden="1"
                          disabled
                          style="text-align: center"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding">
                    <div class="col-md-12" :style="styles['flex-row-inputs']">
                      <label class="col-md-6 col-sm-6 col-xs-6" :style="styles['label-left']">TIPO DE DEPENDENCIA:</label>
                      <div class="col-md-6 col-sm-6 col-xs-6">
                        <input
                          v-model="descripDependencia"
                          class="form-control"
                          type="text"
                          data-orden="1"
                          disabled
                          :style="[{background: colorDependencia, color: 'white', textAlign: 'center'}]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <transition name="modal_prosoft" v-if="modalDependeciaFuncional">
              <div class="modal-mask">
                  <div class="modal-wrapper">
                      <div class="box-center col-md-11 col-sm-11 col-xs-12">
                          <div class="form-group box-center col-md-12 no-padding">
                              <div class="col-12">
                                  <div class="portlet light box-center box-title">
                                      <div class="portlet-title">
                                          <div class="caption" style="width: 100%">
                                              <span class="caption-subject bold"> Dependencia funcional </span>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="form-horizontal col-md-12 col-sm-12 col-xs-12 no-padding">

                                      <div class="inline-inputs col-md-12 col-sm-12 col-xs-12">
                                        <label class="col-md-3 col-sm-3 col-xs-3"
                                            style="background: 0; text-align: left;">Nivel de secuelas o
                                            consecuencias:</label>
                                        <div class="input-group col-md-8 col-sm-8 col-xs-8" id='datoNivelSecuelas'>
                                            <input v-model="ws9005.nivel_secuelas_9005" type="text"
                                                class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                                data-orden="1" maxlength="50" disabled>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="inline-inputs col-md-12 col-sm-12 col-xs-12">
                                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding" id="datoActividades">
                                            <label class="col-md-12 col-sm-12 col-xs-12 head-box"
                                                style="background: 0; text-align: left;">Actividades que necesitan ayudas de
                                                un tercero:</label>
                                            <div class="salto-linea"></div>
                                            <textarea rows="5" maxlength="475"
                                                class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1"
                                                style="margin: 0" v-model="ws9005.tabla_actividades_9005" disabled>
                                        </textarea>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="inline-inputs col-md-12 col-sm-12 col-xs-12">
                                        <label class="col-md-3 col-sm-3 col-xs-3"
                                            style="background: 0; text-align: left;">Dependencia funcional:</label>
                                        <div class="input-group col-md-8 col-sm-8 col-xs-8" id='datoDependFuncional'>
                                            <input v-model="ws9005.depen_funcional_9005" type="text"
                                                class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                                data-orden="1" maxlength="50" disabled>
                                        </div>
                                    </div>

                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </transition>


      </div>
  `,
});
