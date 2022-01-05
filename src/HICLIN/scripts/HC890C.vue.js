const { detallesHc, grabarDetalles } = require("../../HICLIN/scripts/reg_dethc.js");

module.exports = Vue.component("component-karnofsky", {
  props: {
    params: {},
  },

  data() {
    return {
      ws9006: detallesHc.WS_9006(),

      opcActvNormales: [
        { COD: "1", DESCRIP: "Actividad normal, sin evidencia de enfermedad" },
        { COD: "2", DESCRIP: "Actividad normal con esfuerzo, algunos signos o sintomas de enfermedad." },
        { COD: "3", DESCRIP: "Cuida de si mismo pero es incapaz de llevar a cabo una actividad o trabajo normal." },
      ],

      opcIncapTrabajar: [
        {
          COD: "1",
          DESCRIP:
            "Necesita ayuda ocasional de otros pero es capaz de cuidar de sí mismo para la mayor parte de sus necesidades.",
        },
        { COD: "2", DESCRIP: "Requiere ayuda considerable de otros y cuidados especiales frecuentes incapacitado." },
        { COD: "3", DESCRIP: "Requiere cuidados especiales, severamente incapacitado." },
      ],

      opcIncapCuidarse: [
        { COD: "1", DESCRIP: "Indicación de hospitalización aunque no hay indicios de muerte." },
        { COD: "2", DESCRIP: "Gravemente enfermo, necesita asistencia activa de soporte." },
        { COD: "3", DESCRIP: "Moribundo." },
        { COD: "4", DESCRIP: "Fallecido." },
      ],

      colorRiesgo: ""
    };
  },

  async created() {
    _compHC890C = this;
  },

  watch: {
    "params.estado": function (estado) {
      if (estado) this.getDetalleHistoria();
    },
  },

  computed: {
    descripActvNormales() {
      let actividad = this.opcActvNormales.find((el) => el.COD == this.ws9006.actividad_normal_9006);
      return actividad ? actividad.DESCRIP : "";
    },

    descripIncapTrabajar() {
      let trabajar = this.opcIncapTrabajar.find((el) => el.COD == this.ws9006.incapaz_trabajar_9006);
      return trabajar ? trabajar.DESCRIP : "";
    },

    descripIncapCuidarse() {
      let cuidarse = this.opcIncapCuidarse.find((el) => el.COD == this.ws9006.incapaz_cuidarse_9006);
      return cuidarse ? cuidarse.DESCRIP : "";
    },

    calcKarnofsky() {
      let total = 0;

      switch (this.ws9006.actividad_normal_9006) {
        case "1":
          total += 100;
          break;
        case "2":
          total += 90;
          break;
        case "3":
          total += 80;
          break;
        default:
          total += 0;
          break;
      }

      switch (this.ws9006.incapaz_trabajar_9006) {
        case "1":
          total += 70;
          break;
        case "2":
          total += 60;
          break;
        case "3":
          total += 50;
          break;
        default:
          total += 0;
          break;
      }

      switch (this.ws9006.incapaz_cuidarse_9006) {
        case "1":
          total += 30;
          break;
        case "2":
          total += 20;
          break;
        case "3":
          total += 10;
          break;
        case "4":
          total += 10;
          break;
        default:
          total += 0;
          break;
      }

      return total;
    },

    descripPuntaje() {
      let karnofsky = this.calcKarnofsky || 0;

      if (karnofsky >= 0 && karnofsky <= 50) {
        this.colorRiesgo = "brown"
        return "ALTO GRADO DE MUERTE EN LOS 6 MESES SIGUIENTES";
      }
      
      if (karnofsky >= 51 && karnofsky <= 100) {
        this.colorRiesgo = "red"
        return "EXPECTATIVA DE VIDA MAYOR A 6 MESES";
      }

      this.colorRiesgo = "";
      return ""
    },
  },

  methods: {
    getDetalleHistoria() {
      loader("show");
      postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + "|||9006|" }, get_url("APP/HICLIN/HCDETAL_PRC.DLL"))
        .then((data) => {
          loader("hide");
          let WS9006 = data.DETHC.find((el) => el["COD-DETHC"] == "9006");
          this.ws9006 = WS9006 ? WS9006.DETALLE : detallesHc.WS_9006();
          this.datoValoracionHC890C();
        })
        .catch((error) => {
          loader("hide");
          console.error("Error consultado detalle de Historia", error);
          this.salir();
        });
    },

    datoValoracionHC890C() {
      validarInputs(
        {
          form: "#datoValoracionHC890C",
        },
        () => {
          this.salir()
        },
        () => {
          let valoracion = (this.ws9006.valoracion_9006 = this.ws9006.valoracion_9006.toUpperCase().trim());

          switch (valoracion) {
            case "S":
            case "N":
              this.datoRevaloracionHC890C();
              break;
            default:
              CON851("03", "03", null, "warning", "Advertencia");
              this.datoValoracionHC890C();
          }
        }
      );
    },

    datoRevaloracionHC890C() {
      validarInputs(
        {
          form: "#datoRevaloracionHC890C",
        },
        () => this.datoValoracionHC890C(),
        () => {
          let revaloracion = (this.ws9006.revaloracion_9006 = this.ws9006.revaloracion_9006.toUpperCase().trim());

          switch (revaloracion) {
            case "S":
            case "N":
              this.datoCategoriaHC890C();
              break;
            default:
              CON851("03", "03", null, "warning", "Advertencia");
              this.datoRevaloracionHC890C();
          }
        }
      );
    },

    datoCategoriaHC890C() {
      validarInputs(
        {
          form: "#datoCategoriaHC890C",
        },
        () => this.datoRevaloracionHC890C(),
        () => {
          let cat = parseInt(this.ws9006.categoria_9006);

          switch (cat) {
            case 1:
              this.ws9006.incapaz_trabajar_9006 = this.ws9006.incapaz_cuidarse_9006 = "";
              this.datoActividadNormalHC890C();
              break;
            case 2:
              this.ws9006.actividad_normal_9006 = this.ws9006.incapaz_cuidarse_9006 = "";
              this.datoIncapazTrabajarHC890C();
              break;
            case 3:
              this.ws9006.actividad_normal_9006 = this.ws9006.incapaz_trabajar_9006 = "";
              this.datoIncapazCuidarseHC890C();
              break;
            default:
              CON851("03", "03", null, "warning", "Advertencia");
              this.datoCategoriaHC890C();
              break;
          }
        }
      );
    },

    datoActividadNormalHC890C() {
      setTimeout(
        () =>
          POPUP(
            {
              titulo: "ACTIVIDADES NORMALES",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.opcActvNormales,
              seleccion: this.ws9006.actividad_normal_9006,
              callback_f: () => this.datoCategoriaHC890C(),
            },
            (data) => {
              this.ws9006.actividad_normal_9006 = data.COD;
              this.grabarDetalleHC890C();
            }
          ),
        300
      );
    },

    datoIncapazTrabajarHC890C() {
      setTimeout(
        () =>
          POPUP(
            {
              titulo: "INCAPAZ DE TRABAJAR",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.opcIncapTrabajar,
              seleccion: this.ws9006.incapaz_trabajar_9006,
              callback_f: () => this.datoCategoriaHC890C(),
            },
            (data) => {
              this.ws9006.incapaz_trabajar_9006 = data.COD;
              this.grabarDetalleHC890C();
            }
          ),
        300
      );
    },

    datoIncapazCuidarseHC890C() {
      setTimeout(
        () =>
          POPUP(
            {
              titulo: "INCAPAZ DE CUIDARSE",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: this.opcIncapCuidarse,
              seleccion: this.ws9006.incapaz_cuidarse_9006,
              callback_f: () => this.datoCategoriaHC890C(),
            },
            (data) => {
              this.ws9006.incapaz_cuidarse_9006 = data.COD;
              this.grabarDetalleHC890C();
            }
          ),
        300
      );
    },

    async grabarDetalleHC890C() {
      loader("show");
      let detalle = {
        9006: _getObjetoSaveHc(this.ws9006),
      };

      console.log(detalle);
      grabarDetalles(detalle, $_REG_HC.llave_hc)
        .then(() => {
          loader("hide");
          CON851("", "Escala Karnofsky grabada con exito!", null, "success", "Exito");
          this.terminar();
        })
        .catch((error) => {
          console.log(error)
          loader("hide");
          CON851("", "grabando Escala Karnofsky", null, "error", "Error");
          this.datoCategoriaHC890C();
        });
    },

    salir() {
      this.$emit("callback_esc");
    },

    terminar() {
      this.$emit("callback");
    },
  },

  template: /*html*/ `\
  <div id="HC890C" class="col-md-12 col-sm-12 col-xs-12 no-padding">
    <div class="col-md-12 no-padding">
      <div class="portlet light box-center box-title">
        <div class="portlet-title">
          <div class="caption">
            <span class="caption-subject bold">ESCALA DE KARNOFSKY PARA LA VALORACIÓN FUNCIONAL</span>
          </div>
        </div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
        <div class="form-horizontal">
          <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
            <div class="form-group box-center col-md-12">
              <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 d-flex ai-center jc-between">
                  <label>Primera valoración</label>
                  <div id="datoValoracionHC890C" class="input-group col-md-4 col-sm-4 col-xs-4">
                    <input
                      v-model="ws9006.valoracion_9006"
                      type="text"
                      class="form-control"
                      data-orden="1"
                      maxlength="1"
                      placeholder="S/N"
                      disabled
                      style="text-align: center"
                    />
                  </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 d-flex ai-center jc-between">
                  <label>Revaloración</label>
                  <div id="datoRevaloracionHC890C" class="input-group col-md-4 col-sm-4 col-xs-4">
                    <input
                      v-model="ws9006.revaloracion_9006"
                      type="text"
                      class="form-control"
                      data-orden="1"
                      maxlength="1"
                      placeholder="S/N"
                      disabled
                      style="text-align: center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
            <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
              <div class="form-group box-center col-md-12">
                <div class="col-md-12 col-sm-12 col-xs-12 no-padding table-HC890C">
                  <div class="col-md-12 col-sm-12 col-xs-12 no-padding header-table-HC890C">
                    <div class="col-lg-2 col-md-3 col-sm-3 col-xs-3 no-padding col-header-table-HC890C">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding cell-header-table-HC890C fd-row jc-between">
                        <span>Categorías</span>
                        <div id="datoCategoriaHC890C" class="input-group col-md-4 col-sm-6 col-xs-6">
                          <input 
                            v-model="ws9006.categoria_9006" 
                            type="number" 
                            class="form-control" 
                            data-orden="1" 
                            maxlength="1" 
                            disabled 
                            style="text-align: center"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-5 col-sm-5 col-xs-5 no-padding col-header-table-HC890C">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding cell-header-table-HC890C">
                        <span>Descripción</span>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 no-padding col-header-table-HC890C">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding cell-header-table-HC890C">
                        <span>Observaciones</span>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 col-sm-12 col-xs-12 no-padding body-table-HC890C">
                    <div class="col-md-12 col-sm-12 col-xs-12 no-padding row-body-table-HC890C">
                      <div class="col-lg-2 col-md-3 col-sm-3 col-xs-3 no-padding cell-body-table-HC890C">
                        <span class="col-md-12 col-sm-12 col-xs-12 no-padding"><strong>1.</strong></span>
                      </div>
                      <div
                        class="col-lg-6 col-md-5 col-sm-5 col-xs-5 no-padding cell-body-table-HC890C"
                        style="text-align: justify"
                      >
                        <span>Capaz de realizar actividades normales no requiere cuidados especiales.</span>
                      </div>
                      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 no-padding cell-body-table-HC890C">
                        <span> {{ descripActvNormales }} </span>
                      </div>
                    </div>
                    <div class="col-md-12 col-sm-12 col-xs-12 no-padding row-body-table-HC890C">
                      <div class="col-lg-2 col-md-3 col-sm-3 col-xs-3 no-padding cell-body-table-HC890C">
                        <span class="col-md-12 col-sm-12 col-xs-12 no-padding"><strong>2.</strong></span>
                      </div>
                      <div
                        class="col-lg-6 col-md-5 col-sm-5 col-xs-5 no-padding cell-body-table-HC890C"
                        style="text-align: justify"
                      >
                        <span>Cuida de sí mismo, pero es incapaz de llevar una actividad o trabajo normal.</span>
                      </div>
                      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 no-padding cell-body-table-HC890C">
                        <span> {{ descripIncapTrabajar }} </span>
                      </div>
                    </div>
                    <div class="col-md-12 col-sm-12 col-xs-12 no-padding row-body-table-HC890C">
                      <div class="col-lg-2 col-md-3 col-sm-3 col-xs-3 no-padding cell-body-table-HC890C">
                        <span class="col-md-12 col-sm-12 col-xs-12 no-padding"><strong>3.</strong></span>
                      </div>
                      <div
                        class="col-lg-6 col-md-5 col-sm-5 col-xs-5 no-padding cell-body-table-HC890C"
                        style="text-align: justify"
                      >
                        <span
                          >Incapaz de auto cuidarse, requiere cuidados especiales, susceptible de hospitalización.
                          probable avance rápido de enfermedad.</span
                        >
                      </div>
                      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 no-padding cell-body-table-HC890C">
                        <span> {{ descripIncapCuidarse }} </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
            <div class="form-group box-center col-md-12">
              <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-4 d-flex jc-between ai-center flex-wrap">
                  <label class="col-md-6 col-sm-12 col-xs-12" style="text-align: left;">Puntaje total</label>
                  <div class="input-group col-md-4 col-sm-4 col-xs-4">
                    <input
                      v-model="calcKarnofsky"
                      type="number"
                      class="form-control"
                      data-orden="1"
                      disabled
                      style="text-align: center"
                    />
                  </div>
                </div>
                <div class="col-lg-8 col-md-9 col-sm-8 col-xs-8 d-flex jc-between ai-center flex-wrap">
                  <label class="col-lg-2 col-md-3 col-sm-12 col-xs-12" style="text-align: left;">Tipo de riesgo</label>
                  <div class="input-group col-lg-10 col-md-9 col-sm-12 col-xs-12">
                    <input
                      v-model="descripPuntaje"
                      type="text"
                      class="form-control"
                      data-orden="1"
                      disabled
                      :style="[{'text-lign': 'center', color: '#fff', background: colorRiesgo}]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
});
