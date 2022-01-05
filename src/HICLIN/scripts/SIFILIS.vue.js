module.exports = Vue.component("component-sifilis", {
  props: {
    params: {},
    data: {
      tabla_tto_sifi: [{ fecha_tto_sifi: "", medicamento_sifi: "", dosis_sifi: "", profe_aplico_sifi: "" }],
      tabla_segui_serol: [{ tipo_serol: "", fecha_serol: "", resul_serol: "" }],
      retrata_sifi: {},
    },
  },

  data() {
    return {
      tratamiento_sifilis: this.data,
      fechasTtoSifi: [],
      fechasSerol: [],
      fechaRettoSifi: {},
      descripResult: [],

      nitUsu: $_USUA_GLOBAL[0].NIT,
      fechaAct: moment().format("YYYYMMDD"),

      styleSifilis: {
        flexRow: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
          flexWrap: "wrap",
        },
        sinMargin: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        },
        reTratar: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginBottom: "16px",
        },
      },
    };
  },

  async created() {
    _componentSifilis = this;
    this.moverFechasTtoSifi();
    this.moverFechasSerol();
    this.moverFechaRetrata();
  },

  watch: {
    "params.estado": function (estado) {
      if (estado) this.init();
    },
  },

  methods: {
    moverFechasTtoSifi() {
      this.fechasTtoSifi = [];
      this.tratamiento_sifilis.tabla_tto_sifi.forEach((el) => {
        this.fechasTtoSifi.push({
          anioTtoSifi: el.fecha_tto_sifi.slice(0, 4),
          mesTtoSifi: el.fecha_tto_sifi.slice(4, 6),
          diaTtoSifi: el.fecha_tto_sifi.slice(6),
        });
      });
    },

    moverFechasSerol() {
      this.fechasSerol = [];
      this.tratamiento_sifilis.tabla_segui_serol.forEach((el) => {
        this.fechasSerol.push({
          anioSerol: el.fecha_serol.slice(0, 4),
          mesSerol: el.fecha_serol.slice(4, 6),
          diaSerol: el.fecha_serol.slice(6),
        });
      });
    },

    moverFechaRetrata() {
      this.fechaRettoSifi = {
        anioRettoSifi: this.tratamiento_sifilis.retrata_sifi.fecha_retto_sifi.slice(0, 4),
        mesRettoSifi: this.tratamiento_sifilis.retrata_sifi.fecha_retto_sifi.slice(4, 6),
        diaRettoSifi: this.tratamiento_sifilis.retrata_sifi.fecha_retto_sifi.slice(6),
      };
    },

    init() {
      this.moverFechasTtoSifi();
      this.moverFechasSerol();
      this.moverFechaRetrata();

      this.datoAnioTtoSifi(0);
    },

    datoAnioTtoSifi(index) {
      validarInputs(
        {
          form: `#datoAnioTtoSifi_${index}`,
        },
        () => {
          if (index == 0) {
            CON851P(
              "03",
              () => this.datoAnioTtoSifi(index),
              () => this.salir()
            );
          } else {
            this.datoAnioTtoSifi(--index);
          }
        },
        () => {
          let anio = parseInt(
            (this.fechasTtoSifi[index].anioTtoSifi = this.fechasTtoSifi[index].anioTtoSifi.padStart(4, "0"))
          );

          if ((this.nitUsu == 900541158 || this.nitUsu == 900566047) && anio == 0 && index == 0) {
            CON851("02", "02", null, "warning", "Advertencia");
            this.datoAnioTtoSifi(index);
          } else if (anio < 2000) {
            for (let key in this.tratamiento_sifilis.tabla_tto_sifi[index]) {
              this.tratamiento_sifilis.tabla_tto_sifi[index][key] = "";
            }

            for (let key in this.fechasTtoSifi[index]) {
              this.fechasTtoSifi[index][key] = "";
            }

            if (index < this.tratamiento_sifilis.tabla_tto_sifi.length - 1) {
              this.datoAnioTtoSifi(++index);
            } else this.datoTipoSerol(0);
          } else this.datoMesTtoSifi(index);
        }
      );
    },

    datoMesTtoSifi(index) {
      validarInputs(
        {
          form: `#datoMesTtoSifi_${index}`,
        },
        () => this.datoAnioTtoSifi(index),
        () => {
          let mes = parseInt(
            (this.fechasTtoSifi[index].mesTtoSifi = this.fechasTtoSifi[index].mesTtoSifi.padStart(2, "0"))
          );
          if (mes < 1 || mes > 12) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoMesTtoSifi(index);
          } else this.datoDiaTtoSifi(index);
        }
      );
    },

    datoDiaTtoSifi(index) {
      validarInputs(
        {
          form: `#datoDiaTtoSifi_${index}`,
        },
        () => this.datoMesTtoSifi(index),
        () => {
          let dia = parseInt(
            (this.fechasTtoSifi[index].diaTtoSifi = this.fechasTtoSifi[index].diaTtoSifi.padStart(2, "0"))
          );

          let fecha =
            this.fechasTtoSifi[index].anioTtoSifi +
            this.fechasTtoSifi[index].mesTtoSifi +
            this.fechasTtoSifi[index].diaTtoSifi;

          if (
            dia < 1 ||
            dia > 31 ||
            !_validarFecha(
              this.fechasTtoSifi[index].anioTtoSifi,
              this.fechasTtoSifi[index].mesTtoSifi,
              this.fechasTtoSifi[index].diaTtoSifi
            ) ||
            parseInt(fecha) > parseInt(this.fechaAct)
          ) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoMesTtoSifi(index);
          } else {
            this.tratamiento_sifilis.tabla_tto_sifi[index].fecha_tto_sifi = fecha;
            this.datoMedicamentoSifi(index);
          }
        }
      );
    },

    datoMedicamentoSifi(index) {
      validarInputs(
        {
          form: `#datoMedicamentoSifi_${index}`,
        },
        () => this.datoDiaTtoSifi(index),
        () => {
          if (
            (this.nitUsu == 900541158 || this.nitUsu == 900566047) &&
            !this.tratamiento_sifilis.tabla_tto_sifi[0].medicamento_sifi.trim()
          ) {
            CON851("02", "02", null, "warning", "Advertencia");
            this.datoMedicamentoSifi(index);
          } else this.datoDosisSifi(index);
        }
      );
    },

    datoDosisSifi(index) {
      validarInputs(
        {
          form: `#datoDosisSifi_${index}`,
        },
        () => this.datoMedicamentoSifi(index),
        () => {
          if (
            (this.nitUsu == 900541158 || this.nitUsu == 900566047) &&
            !this.tratamiento_sifilis.tabla_tto_sifi[0].dosis_sifi.trim()
          ) {
            CON851("02", "02", null, "warning", "Advertencia");
            this.datoDosisSifi(index);
          } else this.datoMedicoSifi(index);
        }
      );
    },

    datoMedicoSifi(index) {
      validarInputs(
        {
          form: `#datoMedicoSifi_${index}`,
        },
        () => this.datoDosisSifi(index),
        () => {
          if (
            (this.nitUsu == 900541158 || this.nitUsu == 900566047) &&
            !this.tratamiento_sifilis.tabla_tto_sifi[0].profe_aplico_sifi.trim()
          ) {
            CON851("02", "02", null, "warning", "Advertencia");
            this.datoMedicoSifi(index);
          } else {
            if (index < this.tratamiento_sifilis.tabla_tto_sifi.length - 1) {
              this.datoAnioTtoSifi(++index);
            } else this.datoTipoSerol(0);
          }
        }
      );
    },

    datoTipoSerol(index) {
      validarInputs(
        {
          form: `#datoTipoSerol_${index}`,
        },
        () => {
          if (index == 0) {
            this.datoAnioTtoSifi(0);
          } else this.datoTipoSerol(--index);
        },
        () => {
          if (this.tratamiento_sifilis.tabla_segui_serol[index].tipo_serol.trim()) {
            this.datoAnioSerol(index);
          } else {
            for (let key in this.tratamiento_sifilis.tabla_segui_serol[index]) {
              this.tratamiento_sifilis.tabla_segui_serol[index][key] = "";
            }

            for (let key in this.fechasSerol[index]) {
              this.fechasSerol[index][key] = "";
            }

            if (index < this.tratamiento_sifilis.tabla_segui_serol.length - 1) {
              this.datoTipoSerol(++index);
            } else this.datoRettoSifi();
          }
        }
      );
    },

    datoAnioSerol(index) {
      validarInputs(
        {
          form: `#datoAnioSerol_${index}`,
        },
        () => this.datoTipoSerol(index),
        () => {
          let anio = parseInt((this.fechasSerol[index].anioSerol = this.fechasSerol[index].anioSerol.padStart(4, "0")));
          if (anio < 2000) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioSerol(index);
          } else this.datoMesSerol(index);
        }
      );
    },

    datoMesSerol(index) {
      validarInputs(
        {
          form: `#datoMesSerol_${index}`,
        },
        () => this.datoAnioSerol(index),
        () => {
          let mes = parseInt((this.fechasSerol[index].mesSerol = this.fechasSerol[index].mesSerol.padStart(2, "0")));
          if (mes < 1 || mes > 12) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoMesSerol(index);
          } else this.datoDiaSerol(index);
        }
      );
    },

    datoDiaSerol(index) {
      validarInputs(
        {
          form: `#datoDiaSerol_${index}`,
        },
        () => this.datoMesSerol(index),
        () => {
          let dia = parseInt((this.fechasSerol[index].diaSerol = this.fechasSerol[index].diaSerol.padStart(2, "0")));

          let fecha =
            this.fechasSerol[index].anioSerol + this.fechasSerol[index].mesSerol + this.fechasSerol[index].diaSerol;

          if (dia < 1 || dia > 31 || parseInt(fecha) > parseInt(this.fechaAct)) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoDiaSerol(index);
          } else {
            this.tratamiento_sifilis.tabla_segui_serol[index].fecha_serol = fecha;
            this.datoResultSerol(index);
          }
        }
      );
    },

    datoResultSerol(index) {
      POPUP(
        {
          array: [
            { COD: "1", DESCRIP: "POSITIVO" },
            { COD: "2", DESCRIP: "NEGATIVO" },
          ],
          titulo: `RESULTADO SEGUIMIENTO ${3 * (index + 1)} MESES`,
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.tratamiento_sifilis.tabla_segui_serol[index].resul_serol,
          callback_f: () => this.datoDiaSerol(index),
        },
        async (data) => {
          this.tratamiento_sifilis.tabla_segui_serol[index].resul_serol = data.COD;
          if (index < this.tratamiento_sifilis.tabla_segui_serol.length - 1) {
            this.datoTipoSerol(++index);
          } else this.datoRettoSifi();
        }
      );
    },

    datoRettoSifi() {
      validarInputs(
        {
          form: "#datoRettoSifi",
        },
        () => this.datoTipoSerol(this.tratamiento_sifilis.tabla_segui_serol.length - 1),
        () => {
          let tratamiento = (this.tratamiento_sifilis.retrata_sifi.nece_retto_sifi = this.tratamiento_sifilis.retrata_sifi.nece_retto_sifi
            .toUpperCase()
            .trim());

          switch (tratamiento) {
            case "S":
              this.datoAnioRettoSifi();
              break;
            case "N":
              this.tratamiento_sifilis.retrata_sifi.fecha_retto_sifi = "";
              this.tratamiento_sifilis.retrata_sifi.medicamento_retto = "";
              this.tratamiento_sifilis.retrata_sifi.dosis_retto = "";
              this.tratamiento_sifilis.retrata_sifi.profe_aplico_retto = "";
              this.tratamiento_sifilis.retrata_sifi.cuantos_dias_retto = "";

              this.fechaRettoSifi.anioRettoSifi = "";
              this.fechaRettoSifi.mesRettoSifi = "";
              this.fechaRettoSifi.diaRettoSifi = "";

              this.datoDxContactoRetto();
              break;
            default:
              CON851("03", "03", null, "error", "Error");
              this.datoRettoSifi();
              break;
          }
        }
      );
    },

    datoAnioRettoSifi() {
      validarInputs(
        {
          form: "#datoAnioRettoSifi",
        },
        () => this.datoRettoSifi(),
        () => {
          let anio = (this.fechaRettoSifi.anioRettoSifi = this.fechaRettoSifi.anioRettoSifi.padStart(4, "0"));
          if (anio <= 0) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioRettoSifi();
          } else this.datoMesRettoSifi();
        }
      );
    },

    datoMesRettoSifi() {
      validarInputs(
        {
          form: "#datoMesRettoSifi",
        },
        () => this.datoAnioRettoSifi(),
        () => {
          let mes = (this.fechaRettoSifi.mesRettoSifi = this.fechaRettoSifi.mesRettoSifi.padStart(2, "0"));
          if (mes < 1 || mes > 12) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoMesRettoSifi();
          } else this.datoDiaRettoSifi();
        }
      );
    },

    datoDiaRettoSifi() {
      validarInputs(
        {
          form: "#datoDiaRettoSifi",
        },
        () => this.datoMesRettoSifi(),
        () => {
          let dia = (this.fechaRettoSifi.diaRettoSifi = this.fechaRettoSifi.diaRettoSifi.padStart(2, "0"));
          let fechaRetto =
            this.fechaRettoSifi.anioRettoSifi + this.fechaRettoSifi.mesRettoSifi + this.fechaRettoSifi.diaRettoSifi;

          if (
            dia < 1 ||
            dia > 31 ||
            !_validarFecha(
              this.fechaRettoSifi.anioRettoSifi,
              this.fechaRettoSifi.mesRettoSifi,
              this.fechaRettoSifi.diaRettoSifi
            ) ||
            parseInt(fechaRetto) > parseInt(this.fechaAct)
          ) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioRettoSifi();
          } else {
            this.tratamiento_sifilis.retrata_sifi.fecha_retto_sifi = fechaRetto;
            this.datoDiasRetto();
          }
        }
      );
    },

    datoDiasRetto() {
      validarInputs(
        {
          form: "#datoDiasRetto",
        },
        () => this.datoDiaRettoSifi(),
        () => {
          this.datoMedicamentoRetto();
        }
      );
    },

    datoMedicamentoRetto() {
      validarInputs(
        {
          form: "#datoMedicamentoRetto",
        },
        () => this.datoDiaRettoSifi(),
        () => {
          this.datoDosisRetto();
        }
      );
    },

    datoDosisRetto() {
      validarInputs(
        {
          form: "#datoDosisRetto",
        },
        () => this.datoMedicamentoRetto(),
        () => {
          this.datoMedicoRetto();
        }
      );
    },

    datoMedicoRetto() {
      validarInputs(
        {
          form: "#datoMedicoRetto",
        },
        () => this.datoDosisRetto(),
        () => {
          this.datoDxContactoRetto();
        }
      );
    },

    datoDxContactoRetto() {
      validarInputs(
        {
          form: "#datoDxContactoRetto",
        },
        () => {
          if (this.tratamiento_sifilis.retrata_sifi.nece_retto_sifi == "N") this.datoRettoSifi();
          else this.datoDiasRetto();
        },
        () => {
          let dxRetto = (this.tratamiento_sifilis.dx_contacto = this.tratamiento_sifilis.dx_contacto
            .toUpperCase()
            .trim());

          switch (dxRetto) {
            case "S":
            case "N":
              this.datoTtocontactoRetto();
              break;
            default:
              CON851("03", "03", null, "warning", "Advertencia");
              this.datoDxContactoRetto();
              break;
          }
        }
      );
    },

    datoTtocontactoRetto() {
      validarInputs(
        {
          form: "#datoTtocontactoRetto",
        },
        () => this.datoDxContactoRetto(),
        () => {
          let ttoContacto = (this.tratamiento_sifilis.tto_contacto = this.tratamiento_sifilis.tto_contacto
            .toUpperCase()
            .trim());

          switch (ttoContacto) {
            case "S":
            case "N":
              this.datoRemitidoRetto();
              break;
            default:
              CON851("03", "03", null, "warning", "Advertencia");
              this.datoTtocontactoRetto();
              break;
          }
        }
      );
    },

    datoRemitidoRetto() {
      validarInputs(
        {
          form: "#datoRemitidoRetto",
        },
        () => this.datoTtocontactoRetto(),
        () => {
          this.terminar();
        }
      );
    },

    salir() {
      this.$emit("callback_esc");
    },

    terminar() {
      console.log(this.tratamiento_sifilis);
      this.$emit("callback", this.tratamiento_sifilis);
    },
  },

  template:
    /*html*/ '\
    <div class="col-md-12 no-padding"> \
        <div class="portlet light box-center box-title"> \
          <div class="portlet-title">\
            <div class="caption">\
              <span class="caption-subject bold">Sífilis congenita y gestacional</span>\
            </div>\
          </div>\
        </div>\
        <div class="form-horizontal"> \
          <div \
            class="col-xs-12 no-padding" \
            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); column-gap: 1rem" \
          > \
            <div class="col-md-12 no-padding" v-for="(el, index) in tratamiento_sifilis.tabla_tto_sifi" :key="index"> \
              <div class="col-md-12 col-sm-12 col-xs-12 no-padding"> \
                <div class="form-group col-md-12 box-center" style="padding: 1rem !important"> \
                  <div class="col-md-12 no-padding"> \
                    <div class="col-md-12 no-padding" style="margin-bottom: 1rem; border-bottom: 1px solid gray"> \
                      <label> Tratamiento Dosis #{{ index + 1 }}</label> \
                    </div> \
                     <div class="col-md-12 no-padding flex-row" :style="styleSifilis.flexRow"> \
                      <label class="col-md-3 col-sm-3 col-xs-3" style="text-align: left">Fecha</label> \
                      <div class="col-md-6 col-sm-9 col-xs-9 no-padding" style="display: flex"> \
                        <div :id="`datoAnioTtoSifi_${index}`" class="input-group col-md-5 col-sm-5 col-xs-5"> \
                          <input \
                            v-model="fechasTtoSifi[index].anioTtoSifi" \
                            type="number" \
                            class="form-control" \
                            data-orden="1" \
                            maxlength="4" \
                            disabled \
                            placeholder="AAAA" \
                            style="text-align: center" \
                          /> \
                        </div> \
                        <div :id="`datoMesTtoSifi_${index}`" class="input-group col-md-4 col-sm-4 col-xs-4"> \
                          <input \
                            v-model="fechasTtoSifi[index].mesTtoSifi" \
                            type="number" \
                            class="form-control" \
                            data-orden="1" \
                            maxlength="2" \
                            disabled \
                            placeholder="MM" \
                            style="text-align: center" \
                          /> \
                        </div> \
                        <div :id="`datoDiaTtoSifi_${index}`" class="input-group col-md-4 col-sm-4 col-xs-4"> \
                          <input \
                            v-model="fechasTtoSifi[index].diaTtoSifi" \
                            type="number" \
                            class="form-control" \
                            data-orden="1" \
                            maxlength="2" \
                            disabled \
                            placeholder="DD" \
                            style="text-align: center" \
                          /> \
                        </div> \
                      </div> \
                    </div> \
                    <div class="col-md-12 no-padding flex-row" :style="styleSifilis.flexRow"> \
                      <label class="col-md-12 col-sm-12 col-xs-12" style="text-align: left">Medicamentos</label> \
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding"> \
                        <div :id="`datoMedicamentoSifi_${index}`" class="input-group col-md-12 col-sm-12 col-xs-12"> \
                          <input \
                            v-model="el.medicamento_sifi" \
                            type="text" \
                            class="form-control" \
                            data-orden="1" \
                            maxlength="45" \
                            disabled \
                            style="text-align: left" \
                          /> \
                        </div> \
                      </div> \
                    </div> \
                    <div class="col-md-12 no-padding flex-row" :style="styleSifilis.flexRow"> \
                      <label class="col-md-12 col-sm-12 col-xs-12" style="text-align: left">Dosis</label> \
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding"> \
                        <div :id="`datoDosisSifi_${index}`" class="input-group col-md-12 col-sm-12 col-xs-12"> \
                          <input \
                            v-model="el.dosis_sifi" \
                            type="text" \
                            class="form-control" \
                            data-orden="1" \
                            maxlength="45" \
                            disabled \
                            style="text-align: left" \
                          /> \
                        </div> \
                      </div> \
                    </div> \
                    <div class="col-md-12 no-padding flex-row" :style="styleSifilis.sinMargin"> \
                      <label class="col-md-12 col-sm-12 col-xs-12" style="text-align: left" \
                        >Profesional que aplico</label \
                      > \
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding"> \
                        <div :id="`datoMedicoSifi_${index}`" class="input-group col-md-12 col-sm-12 col-xs-12"> \
                          <input \
                            v-model="el.profe_aplico_sifi" \
                            type="text" \
                            class="form-control" \
                            data-orden="1" \
                            maxlength="45" \
                            disabled \
                            style="text-align: left" \
                          /> \
                        </div> \
                      </div> \
                    </div> \
                  </div> \
                </div> \
              </div> \
            </div> \
          </div> \
           <div class="col-md-12 no-padding"> \
            <div class="col-md-7 col-sm-12 col-xs-12 no-padding"> \
              <div class="form-group col-md-12 box-center" style="padding: 1rem 1rem 0rem 1rem  !important"> \
                <div class="col-md-12 no-padding" style="margin-bottom: 5px; border-bottom: 1px solid gray"> \
                  <label>Seguimiento Serológico</label> \
                </div> \
                <div class="col-md-12 no-padding flex-row" :style="styleSifilis.flexRow"> \
                  <div class="col-md-1 col-sm-2 col-xs-3 no-padding"></div> \
                  <div class="col-md-5 col-sm-5 col-xs-4 no-padding"><label>Tipo de prueba</label></div> \
                  <div class="col-md-4 col-sm-3 col-xs-3 no-padding"><label>Fecha</label></div> \
                  <div class="col-md-2 col-sm-2 col-xs-2 no-padding"><label>Resultado</label></div> \
                </div> \
                <div \
                  class="col-md-12 no-padding" \
                  v-for="(el, index) in tratamiento_sifilis.tabla_segui_serol" \
                  :key="index" \
                > \
                  <div class="col-md-12 no-padding flex-row" :style="styleSifilis.flexRow"> \
                    <div class="col-md-1 col-sm-1 col-xs-2 no-padding"> \
                      <span>{{ 3 * (index + 1) }} Meses</span> \
                    </div> \
                    <div class="col-md-5 col-sm-5 col-xs-5 no-padding" style="padding-right: 0.3rem !important"> \
                      <div :id="`datoTipoSerol_${index}`" class="input-group col-md-12 col-sm-12 col-xs-12"> \
                        <input \
                          v-model="el.tipo_serol" \
                          type="text" \
                          class="form-control" \
                          data-orden="1" \
                          maxlength="30" \
                          disabled \
                          style="text-align: left" \
                        /> \
                      </div> \
                    </div> \
                    <div class="col-md-4 col-sm-3 col-xs-3 no-padding"> \
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding" style="display: flex"> \
                        <div :id="`datoAnioSerol_${index}`" class="input-group col-md-5 col-sm-5 col-xs-5"> \
                          <input \
                            v-model="fechasSerol[index].anioSerol" \
                            type="number" \
                            class="form-control" \
                            data-orden="1" \
                            maxlength="4" \
                            disabled \
                            placeholder="AAAA" \
                            style="text-align: center" \
                          /> \
                        </div> \
                        <div :id="`datoMesSerol_${index}`" class="input-group col-md-4 col-sm-4 col-xs-4"> \
                          <input \
                            v-model="fechasSerol[index].mesSerol" \
                            type="number" \
                            class="form-control" \
                            data-orden="1" \
                            maxlength="2" \
                            disabled \
                            placeholder="MM" \
                            style="text-align: center" \
                          /> \
                        </div> \
                        <div :id="`datoDiaSerol_${index}`" class="input-group col-md-4 col-sm-4 col-xs-4"> \
                          <input \
                            v-model="fechasSerol[index].diaSerol" \
                            type="number" \
                            class="form-control" \
                            data-orden="1" \
                            maxlength="2" \
                            disabled \
                            placeholder="DD" \
                            style="text-align: center" \
                          /> \
                        </div> \
                      </div> \
                    </div> \
                    <div class="col-md-2 no-padding"> \
                      <span \
                        >{{ tratamiento_sifilis.tabla_segui_serol[index].resul_serol == 1 ? "POSITIVO" : \
                        tratamiento_sifilis.tabla_segui_serol[index].resul_serol == 2 ? "NEGATIVO" : "" }}</span \
                      > \
                    </div> \
                  </div> \
                </div> \
              </div> \
              <div class="col-md-12 no-padding"> \
              <div class="col-md-12 col-sm-12 col-xs-12 no-padding"> \
                <div class="form-group col-md-12 box-center"> \
                  <div class="col-md-12 no-padding" style="display: flex; flex-wrap: wrap"> \
                    <div class="col-md-3 col-sm-4 col-xs-6 flex-row" :style="styleSifilis.sinMargin"> \
                      <label class="col-md-8 col-sm-8 col-xs-6" style="text-align: left">Dx contacto</label> \
                      <div class="col-md-4 col-sm-4 col-xs-6 no-padding"> \
                        <div id="datoDxContactoRetto" class="input-group col-md-12 col-sm-12 col-xs-12"> \
                          <input \
                            v-model="tratamiento_sifilis.dx_contacto" \
                            type="text" \
                            class="form-control" \
                            data-orden="1" \
                            placeholder="S/N" \
                            maxlength="1" \
                            disabled \
                            style="text-align: center" \
                          /> \
                        </div> \
                      </div> \
                    </div> \
                     <div class="col-md-3 col-sm-4 col-xs-6 flex-row" :style="styleSifilis.sinMargin"> \
                      <label class="col-md-8 col-sm-8 col-xs-6" style="text-align: left">Tto a contactos</label> \
                      <div class="col-md-4 col-sm-4 col-xs-6 no-padding"> \
                        <div id="datoTtocontactoRetto" class="input-group col-md-12 col-sm-12 col-xs-12"> \
                          <input \
                            v-model="tratamiento_sifilis.tto_contacto" \
                            type="text" \
                            class="form-control" \
                            data-orden="1" \
                            placeholder="S/N" \
                            maxlength="1" \
                            disabled \
                            style="text-align: center" \
                          /> \
                        </div> \
                      </div> \
                    </div> \
                     <div class="col-md-6 col-sm-12 col-xs-12 flex-row" :style="styleSifilis.sinMargin" style="padding-right: 0px"> \
                      <label style="text-align: left" \
                        >Donde se remitió al contacto</label \
                      > \
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding"> \
                        <div id="datoRemitidoRetto" class="input-group col-md-12 col-sm-12 col-xs-12"> \
                          <input \
                            v-model="tratamiento_sifilis.remitio_contacto" \
                            type="text" \
                            class="form-control" \
                            data-orden="1" \
                            maxlength="45" \
                            disabled \
                            style="text-align:left"\
                          /> \
                        </div> \
                      </div> \
                    </div> \
                  </div> \
                </div> \
              </div> \
            </div> \
            </div> \
             <div class="col-md-5" style="padding-right: 0px"> \
              <div class="col-md-12 col-sm-12 col-xs-12 no-padding"> \
                <div class="form-group col-md-12 box-center" style="padding: 1rem !important"> \
                  <div class="col-md-12 no-padding" style="display: flex; justify-content: center"> \
                    <div class="col-md-8 col-sm-6 col-xs-5 flex-row" :style="styleSifilis.reTratar"> \
                      <label class="col-md-9 col-sm-8 col-xs-8" style="text-align: left">Necesito re-tratamiento</label> \
                      <div class="col-md-3 col-sm-4 col-xs-4 no-padding"> \
                        <div id="datoRettoSifi" class="input-group col-md-12 col-sm-12 col-xs-12"> \
                          <input \
                            v-model="tratamiento_sifilis.retrata_sifi.nece_retto_sifi" \
                            type="text" \
                            class="form-control" \
                            data-orden="1" \
                            placeholder="S/N" \
                            maxlength="1" \
                            disabled \
                            style="text-align: center" \
                          /> \
                        </div> \
                      </div> \
                    </div> \
                  </div> \
                  <div class="col-md-12 no-padding" style="display: flex; flex-wrap: wrap"> \
                     <div class="col-md-6 col-sm-6 col-xs-7 flex-row" :style="styleSifilis.flexRow" style="padding-left: 0px"> \
                      <label style="text-align: left">Fecha re-tratamiento</label> \
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding" style="display: flex"> \
                        <div id="datoAnioRettoSifi" class="input-group col-md-4 col-sm-4 col-xs-4"> \
                          <input \
                            v-model="fechaRettoSifi.anioRettoSifi" \
                            type="number" \
                            class="form-control" \
                            data-orden="1" \
                            maxlength="4" \
                            disabled \
                            placeholder="AAAA" \
                            style="text-align: center" \
                          /> \
                        </div> \
                        <div id="datoMesRettoSifi" class="input-group col-md-4 col-sm-4 col-xs-4"> \
                          <input \
                            v-model="fechaRettoSifi.mesRettoSifi" \
                            type="number" \
                            class="form-control" \
                            data-orden="1" \
                            maxlength="2" \
                            disabled \
                            placeholder="MM" \
                            style="text-align: center" \
                          /> \
                        </div> \
                        <div id="datoDiaRettoSifi" class="input-group col-md-4 col-sm-4 col-xs-4"> \
                          <input \
                            v-model="fechaRettoSifi.diaRettoSifi" \
                            type="number" \
                            class="form-control" \
                            data-orden="1" \
                            maxlength="2" \
                            disabled \
                            placeholder="DD" \
                            style="text-align: center" \
                          /> \
                        </div> \
                      </div> \
                    </div> \
                    <div class="col-md-6 col-sm-4 col-xs-6 flex-row" :style="styleSifilis.flexRow"> \
                      <label class="col-md-8 col-sm-8 col-xs-2" style="text-align: left">Cuantos días</label> \
                      <div class="col-md-4 col-sm-4 col-xs-6 no-padding"> \
                        <div id="datoDiasRetto" class="input-group col-md-12 col-sm-12 col-xs-12"> \
                          <input \
                            v-model="tratamiento_sifilis.retrata_sifi.cuantos_dias_retto" \
                            type="number" \
                            class="form-control" \
                            data-orden="1" \
                            maxlength="2" \
                            disabled \
                            style="text-align: center" \
                          /> \
                        </div> \
                      </div> \
                    </div> \
                     <div class="col-md-12 col-sm-12 col-xs-12 flex-row no-padding" :style="styleSifilis.flexRow"> \
                      <label style="text-align: left">Medicamentos</label> \
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding"> \
                        <div id="datoMedicamentoRetto" class="input-group col-md-12 col-sm-12 col-xs-12"> \
                          <input \
                            v-model="tratamiento_sifilis.retrata_sifi.medicamento_retto" \
                            type="text" \
                            class="form-control" \
                            data-orden="1" \
                            maxlength="45" \
                            disabled \
                            style="text-align:left"\
                          /> \
                        </div> \
                      </div> \
                    </div> \
                     <div class="col-md-12 col-sm-12 col-xs-12 flex-row no-padding" :style="styleSifilis.flexRow"> \
                      <label style="text-align: left">Dosis</label> \
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding"> \
                        <div id="datoDosisRetto" class="input-group col-md-12 col-sm-12 col-xs-12"> \
                          <input \
                            v-model="tratamiento_sifilis.retrata_sifi.dosis_retto" \
                            type="text" \
                            class="form-control" \
                            data-orden="1" \
                            maxlength="45" \
                            disabled \
                            style="text-align:left"\
                          /> \
                        </div> \
                      </div> \
                    </div> \
                     <div class="col-md-12 col-sm-12 col-xs-12 flex-row no-padding" :style="styleSifilis.sinMargin"> \
                      <label style="text-align: left">Profesional</label> \
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding"> \
                        <div id="datoMedicoRetto" class="input-group col-md-12 col-sm-12 col-xs-12"> \
                          <input \
                            v-model="tratamiento_sifilis.retrata_sifi.profe_aplico_retto" \
                            type="text" \
                            class="form-control" \
                            data-orden="1" \
                            maxlength="45" \
                            disabled \
                            style="text-align:left"\
                          /> \
                        </div> \
                      </div> \
                    </div> \
                  </div> \
                </div> \
              </div> \
            </div> \
          </div> \
        </div> \
      </div> \
  ',
});
