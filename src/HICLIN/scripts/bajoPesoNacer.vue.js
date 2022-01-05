module.exports = Vue.component("bajoPesoNacer", {
  props: {
    params: {},
    data: {},
  },
  data() {
    return {
      bajoPeso: this.data,
    };
  },
  created() {},
  watch: {
    "params.estado": function (estado) {
      if (estado) this.validarGemelo();
    },
  },
  methods: {
    validarGemelo() {
      validarInputs(
        {
          form: "#validarGemelo",
          orden: "1",
        },
        () => this.$emit("callback_esc"),
        () => {
          this.bajoPeso.gemelo = this.bajoPeso.gemelo.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarPrematuro();
        }
      );
    },
    validarPrematuro() {
      validarInputs(
        {
          form: "#validarPrematuro",
          orden: "1",
        },
        () => this.validarGemelo(),
        () => {
          this.bajoPeso.prematuro = this.bajoPeso.prematuro.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarNombreInsParto();
        }
      );
    },
    validarNombreInsParto() {
      validarInputs(
        {
          form: "#validarNombreInsParto",
          orden: "1",
        },
        () => this.validarPrematuro(),
        () => {
          this.bajoPeso.institu_parto = this.bajoPeso.institu_parto.trim();

          this.validarHospitalizacion();
        }
      );
    },
    validarHospitalizacion() {
      validarInputs(
        {
          form: "#validarHospitalizacion",
          orden: "1",
        },
        () => this.validarNombreInsParto(),
        () => {
          this.bajoPeso.hospit_egre = this.bajoPeso.hospit_egre.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.bajoPeso.hospit_egre == "S") this.validarAnoHosp();
          else {
            this.bajoPeso.ano_hospit = "";
            this.bajoPeso.mes_hospit = "";
            this.bajoPeso.dia_hospit = "";
            this.validarAnoValoracion();
          }
        }
      );
    },
    validarAnoHosp() {
      validarInputs(
        {
          form: "#validarAnoHosp",
          orden: "1",
        },
        () => this.validarHospitalizacion(),
        () => {
          let ano = parseInt(this.bajoPeso.ano_hospit) || 0;

          if (ano < 2000) {
            CON851("37", "37", null, "error", "Error");
            this.validarAnoHosp();
          } else this.validarMesHosp();
        }
      );
    },
    validarMesHosp() {
      validarInputs(
        {
          form: "#validarMesHosp",
          orden: "1",
        },
        () => this.validarAnoHosp(),
        () => {
          this.bajoPeso.mes_hospit = cerosIzq(this.bajoPeso.mes_hospit, 2);
          let mes = parseInt(this.bajoPeso.mes_hospit) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "37", null, "error", "Error");
            this.validarMesHosp();
          } else this.validarDiaHosp();
        }
      );
    },
    validarDiaHosp() {
      validarInputs(
        {
          form: "#validarDiaHosp",
          orden: "1",
        },
        () => this.validarMesHosp(),
        () => {
          this.bajoPeso.dia_hospit = cerosIzq(this.bajoPeso.dia_hospit, 2);
          let dia = parseInt(this.bajoPeso.dia_hospit) || 0;
          let fecha_act = parseInt(moment().format("YYYYMMDD"));
          let fecha = parseInt(this.bajoPeso.ano_hospit + this.bajoPeso.mes_hospit + this.bajoPeso.dia_hospit);

          if (dia < 1 || dia > 31) {
            CON851("37", "37", null, "error", "Error");
            this.validarDiaHosp();
          } else if (fecha > fecha_act) {
            CON851("", "Fecha mayor a la actual !", null, "error", "Error");
            this.validarDiaHosp();
          } else this.validarAnoValoracion();
        }
      );
    },
    validarAnoValoracion() {
      validarInputs(
        {
          form: "#validarAnoValoracion",
          orden: "1",
        },
        () => {
          if (this.bajoPeso.hospit_egre == "S") this.validarDiaHosp();
          else this.validarHospitalizacion();
        },
        () => {
          let ano = parseInt(this.bajoPeso.ano_valoracion) || 0;

          if (ano < 2000) {
            CON851("37", "37", null, "error", "Error");
            this.validarAnoValoracion();
          } else this.validarMesValoracion();
        }
      );
    },
    validarMesValoracion() {
      validarInputs(
        {
          form: "#validarMesValoracion",
          orden: "1",
        },
        () => this.validarAnoValoracion(),
        () => {
          this.bajoPeso.mes_valoracion = cerosIzq(this.bajoPeso.mes_valoracion, 2);
          let mes = parseInt(this.bajoPeso.mes_valoracion) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "37", null, "error", "Error");
            this.validarMesValoracion();
          } else this.validarDiaValoracion();
        }
      );
    },
    validarDiaValoracion() {
      validarInputs(
        {
          form: "#validarDiaValoracion",
          orden: "1",
        },
        () => this.validarMesValoracion(),
        () => {
          this.bajoPeso.dia_valoracion = cerosIzq(this.bajoPeso.dia_valoracion, 2);
          let dia = parseInt(this.bajoPeso.dia_valoracion) || 0;
          let fecha_act = parseInt(moment().format("YYYYMMDD"));
          let fecha = parseInt(this.bajoPeso.ano_valoracion + this.bajoPeso.mes_valoracion + this.bajoPeso.dia_valoracion);

          if (dia < 1 || dia > 31) {
            CON851("37", "37", null, "error", "Error");
            this.validarDiaValoracion();
          } else if (fecha > fecha_act) {
            CON851("", "Fecha mayor a la actual !", null, "error", "Error");
            this.validarDiaValoracion();
          } else this.validarCitaPrimerMes();
        }
      );
    },
    validarCitaPrimerMes() {
      validarInputs(
        {
          form: "#validarCitaPrimerMes",
          orden: "1",
        },
        () => this.validarDiaValoracion(),
        () => {
          this.bajoPeso.cita_1er_mes = this.bajoPeso.cita_1er_mes.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.bajoPeso.cita_1er_mes == "S") this.validarAno1erMes();
          else {
            this.bajoPeso.ano_cita_1er = "";
            this.bajoPeso.mes_cita_1er = "";
            this.bajoPeso.dia_cita_1er = "";
            this.bajoPeso.edad_cita_1er = "";
            this.bajoPeso.peso_cita_1er = "";
            this.bajoPeso.talla_cita_1er = "";
            this.validarGananciaPeso();
          }
        }
      );
    },
    validarAno1erMes() {
      validarInputs(
        {
          form: "#validarAno1erMes",
          orden: "1",
        },
        () => this.validarCitaPrimerMes(),
        () => {
          let ano = parseInt(this.bajoPeso.ano_cita_1er) || 0;

          if (ano < 2000) {
            CON851("37", "37", null, "error", "Error");
            this.validarAno1erMes();
          } else this.validarMes1erMes();
        }
      );
    },
    validarMes1erMes() {
      validarInputs(
        {
          form: "#validarMes1erMes",
          orden: "1",
        },
        () => this.validarAno1erMes(),
        () => {
          this.bajoPeso.mes_cita_1er = cerosIzq(this.bajoPeso.mes_cita_1er, 2);
          let mes = parseInt(this.bajoPeso.mes_cita_1er) || 0;

          if (mes < 1 || mes > 12) {
            CON851("37", "37", null, "error", "Error");
            this.validarMes1erMes();
          } else this.validarDia1erMes();
        }
      );
    },
    validarDia1erMes() {
      validarInputs(
        {
          form: "#validarDia1erMes",
          orden: "1",
        },
        () => this.validarMes1erMes(),
        () => {
          this.bajoPeso.dia_cita_1er = cerosIzq(this.bajoPeso.dia_cita_1er, 2);
          let dia = parseInt(this.bajoPeso.dia_cita_1er) || 0;
          let fecha_act = parseInt(moment().format("YYYYMMDD"));
          let fecha = parseInt(this.bajoPeso.ano_cita_1er + this.bajoPeso.mes_cita_1er + this.bajoPeso.dia_cita_1er);

          if (dia < 1 || dia > 31) {
            CON851("37", "37", null, "error", "Error");
            this.validarDia1erMes();
          } else if (fecha > fecha_act) {
            CON851("", "Fecha mayor a la actual !", null, "error", "Error");
            this.validarDia1erMes();
          } else this.validarEdad1erMes();
        }
      );
    },
    validarEdad1erMes() {
      validarInputs(
        {
          form: "#validarEdad1erMes",
          orden: "1",
        },
        () => this.validarDia1erMes(),
        () => {
          this.bajoPeso.edad_cita_1er = isNaN(parseInt(this.bajoPeso.edad_cita_1er))
            ? "0"
            : parseInt(this.bajoPeso.edad_cita_1er).toString();

          this.validarPeso1erMes();
        }
      );
    },
    validarPeso1erMes() {
      validarInputs(
        {
          form: "#validarPeso1erMes",
          orden: "1",
        },
        () => this.validarEdad1erMes(),
        () => {
          this.bajoPeso.peso_cita_1er = isNaN(parseInt(this.bajoPeso.peso_cita_1er))
            ? "00000"
            : parseInt(this.bajoPeso.peso_cita_1er).toString();

          this.validarTalla1erMes();
        }
      );
    },
    validarTalla1erMes() {
      validarInputs(
        {
          form: "#validarTalla1erMes",
          orden: "1",
        },
        () => this.validarPeso1erMes(),
        () => {
          this.bajoPeso.talla_cita_1er = isNaN(parseInt(this.bajoPeso.talla_cita_1er))
            ? "00"
            : parseInt(this.bajoPeso.talla_cita_1er).toString();

          this.validarGananciaPeso();
        }
      );
    },
    validarGananciaPeso() {
      validarInputs(
        {
          form: "#validarGananciaPeso",
          orden: "1",
        },
        () => {
          if (this.bajoPeso.cita_1er_mes == "S") this.validarTalla1erMes();
          else this.validarCitaPrimerMes();
        },
        () => {
          this.bajoPeso.ganancia_peso = this.bajoPeso.ganancia_peso.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.bajoPeso.ganancia_peso == "S") this.validarGramosGanados();
          else {
            this.bajoPeso.gramos_ganados = "";

            this.terminar();
          }
        }
      );
    },
    validarGramosGanados() {
      validarInputs(
        {
          form: "#validarGramosGanados",
          orden: "1",
        },
        () => this.validarGananciaPeso(),
        () => {
          this.bajoPeso.gramos_ganados = isNaN(parseInt(this.bajoPeso.gramos_ganados))
            ? "00"
            : parseInt(this.bajoPeso.gramos_ganados).toString();

          this.terminar();
        }
      );
    },
    terminar() {
      this.$emit("callback", this.bajoPeso);
    },
  },
  template: /*html*/ `
    <div class="col-md-12 no-padding">
      <div class="form-horizontal">
        <div class="col-md-12 no-padding">
        <div class="portlet light box-center box-title">
          <div class="portlet-title">
            <div class="caption">
              <span class="caption-subject bold">Bajo peso al nacer</span>
            </div>
          </div>
        </div>
        <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center" style="text-align: left">

        <div class="col-md-12 no-padding" style="display: flex">
          <div class="col-md-4 no-padding">
            <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarGemelo">
              <label class="labelPreguntas">Gemelo ?</label>
              <div class="col-md-4 no-padding inline-inputs" style="float: right">
                <input
                  type="text"
                  v-model="bajoPeso.gemelo"
                  maxlength="1"
                  placeholder="N"
                  data-orden="1"
                  disabled="disabled"
                  class="form-control col-md-12 col-sm-12 col-xs-12"
                  style="text-align: center"
                />
              </div>
            </div>
            <div class="salto-linea"></div>
            <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarPrematuro">
              <label class="labelPreguntas">Prematuro ?</label>
              <div class="col-md-4 no-padding inline-inputs" style="float: right">
                <input
                  type="text"
                  v-model="bajoPeso.prematuro"
                  maxlength="1"
                  placeholder="N"
                  data-orden="1"
                  disabled="disabled"
                  class="form-control col-md-12 col-sm-12 col-xs-12"
                  style="text-align: center"
                />
              </div>
            </div>
          </div>
          <div class="col-md-8 no-padding" style="display: flex; align-items: center">
            <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarNombreInsParto">
              <label>Nombre de institución que atendió el parto</label>
              <div class="col-md-12 inline-inputs no-padding">
                <input
                  type="text"
                  v-model="bajoPeso.institu_parto"
                  required="true"
                  disabled="disabled"
                  class="form-control col-md-12 col-sm-12 col-xs-12"
                  data-orden="1"
                  maxlength="45"
                  style="text-align: left"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="salto-linea"></div>
        <div class="col-md-12 no-padding">
          <div class="col-md-6 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarHospitalizacion">
            <label class="labelPreguntas">Hospitalización posterior al egreso ?</label>
            <div class="col-md-2 no-padding inline-inputs" style="float: right">
              <input
                type="text"
                v-model="bajoPeso.hospit_egre"
                maxlength="1"
                placeholder="N"
                data-orden="1"
                disabled="disabled"
                class="form-control col-md-12 col-sm-12 col-xs-12"
                style="text-align: center"
              />
            </div>
          </div>

          <div v-if="bajoPeso.hospit_egre == 'S'" class="col-md-6 col-sm-12 col-xs-12 form-group form-md-checkboxes">
            <div class="col-md-12 no-padding inline-inputs">
              <div class="inline-inputs">
                <div class="input-group col-md-6 col-sm-4 col-xs-4" id="validarAnoHosp">
                  <input
                    type="number"
                    v-model="bajoPeso.ano_hospit"
                    data-orden="1"
                    maxlength="4"
                    style="padding-right: 0"
                    disabled="disabled"
                    placeholder="AAAA"
                    class="form-control col-md-12 col-sm-12 col-xs-12"
                  />
                </div>
                <div class="input-group col-md-3 col-sm-4 col-xs-4" id="validarMesHosp">
                  <input
                    type="number"
                    v-model="bajoPeso.mes_hospit"
                    data-orden="1"
                    maxlength="2"
                    required="true"
                    style="padding-right: 0"
                    disabled="disabled"
                    placeholder="MM"
                    class="form-control col-md-12 col-sm-12 col-xs-12"
                  />
                </div>
                <div class="input-group col-md-3 col-sm-4 col-xs-4" id="validarDiaHosp">
                  <input
                    type="number"
                    v-model="bajoPeso.dia_hospit"
                    data-orden="1"
                    maxlength="2"
                    required="true"
                    style="padding-right: 0"
                    disabled="disabled"
                    placeholder="DD"
                    class="form-control col-md-12 col-sm-12 col-xs-12"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="salto-linea"></div>
        <div class="col-md-12 no-padding">
          <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarFechaValoracion">
            <label class="labelPreguntas">Fecha de valoración al recién nacido</label>
            <div class="col-md-6 inline-inputs" style="float: right; padding-right: 0">
              <div class="inline-inputs">
                <div class="input-group col-md-6 col-sm-4 col-xs-4" id="validarAnoValoracion">
                  <input
                    type="number"
                    v-model="bajoPeso.ano_valoracion"
                    data-orden="1"
                    maxlength="4"
                    style="padding-right: 0"
                    disabled="disabled"
                    placeholder="AAAA"
                    class="form-control col-md-12 col-sm-12 col-xs-12"
                  />
                </div>
                <div class="input-group col-md-3 col-sm-4 col-xs-4" id="validarMesValoracion">
                  <input
                    type="number"
                    v-model="bajoPeso.mes_valoracion"
                    data-orden="1"
                    maxlength="2"
                    required="true"
                    style="padding-right: 0"
                    disabled="disabled"
                    placeholder="MM"
                    class="form-control col-md-12 col-sm-12 col-xs-12"
                  />
                </div>
                <div class="input-group col-md-3 col-sm-4 col-xs-4" id="validarDiaValoracion">
                  <input
                    type="number"
                    v-model="bajoPeso.dia_valoracion"
                    data-orden="1"
                    maxlength="2"
                    required="true"
                    style="padding-right: 0"
                    disabled="disabled"
                    placeholder="DD"
                    class="form-control col-md-12 col-sm-12 col-xs-12"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="salto-linea"></div>
        <div class="col-md-12 no-padding">
          <div class="col-md-6 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarCitaPrimerMes">
            <label class="labelPreguntas">Cita al primer mes de nacido ?</label>
            <div class="col-md-2 no-padding inline-inputs" style="float: right">
              <input
                type="text"
                v-model="bajoPeso.cita_1er_mes"
                maxlength="1"
                placeholder="N"
                data-orden="1"
                disabled="disabled"
                class="form-control col-md-12 col-sm-12 col-xs-12"
                style="text-align: center"
              />
            </div>
          </div>

          <div v-if="bajoPeso.cita_1er_mes == 'S'" class="col-md-6 col-sm-12 col-xs-12 form-group form-md-checkboxes">
            <div class="col-md-12 no-padding inline-inputs">
              <div class="inline-inputs">
                <div class="input-group col-md-6 col-sm-4 col-xs-4" id="validarAno1erMes">
                  <input
                    type="number"
                    v-model="bajoPeso.ano_cita_1er"
                    data-orden="1"
                    maxlength="4"
                    style="padding-right: 0"
                    disabled="disabled"
                    placeholder="AAAA"
                    class="form-control col-md-12 col-sm-12 col-xs-12"
                  />
                </div>
                <div class="input-group col-md-3 col-sm-4 col-xs-4" id="validarMes1erMes">
                  <input
                    type="number"
                    v-model="bajoPeso.mes_cita_1er"
                    data-orden="1"
                    maxlength="2"
                    required="true"
                    style="padding-right: 0"
                    disabled="disabled"
                    placeholder="MM"
                    class="form-control col-md-12 col-sm-12 col-xs-12"
                  />
                </div>
                <div class="input-group col-md-3 col-sm-4 col-xs-4" id="validarDia1erMes">
                  <input
                    type="number"
                    v-model="bajoPeso.dia_cita_1er"
                    data-orden="1"
                    maxlength="2"
                    required="true"
                    style="padding-right: 0"
                    disabled="disabled"
                    placeholder="DD"
                    class="form-control col-md-12 col-sm-12 col-xs-12"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="salto-linea"></div>

          <div v-if="bajoPeso.cita_1er_mes == 'S'" class="col-md-12 no-padding" style="display: flex; justify-content: center">
            <div class="col-md-3 col-sm-6 col-xs-12" id="validarEdad1erMes" style="text-align: left">
              <label>Edad Meses</label>
              <div class="inline-inputs">
                <div class="input-group col-md-12 col-sm-12 col-xs-12">
                  <input
                    data-orden="1"
                    maxlength="1"
                    type="number"
                    v-model="bajoPeso.edad_cita_1er"
                    class="form-control col-md-12 col-sm-12 col-xs-12"
                    disabled="disabled"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-4 col-xs-12" id="validarPeso1erMes" style="text-align: left">
              <label>Peso (Gr)</label>
              <div class="inline-inputs">
                <div class="input-group col-md-12 col-sm-12 col-xs-12">
                  <input
                    data-orden="1"
                    maxlength="5"
                    type="number"
                    min="0"
                    v-model="bajoPeso.peso_cita_1er"
                    class="form-control col-md-12 col-sm-12 col-xs-12"
                    disabled="disabled"
                  />
                </div>
              </div>
            </div>

            <div class="col-md-3 col-sm-4 col-xs-12" id="validarTalla1erMes" style="text-align: left">
              <label>Talla (Cm)</label>
              <div class="inline-inputs">
                <div class="input-group col-md-12 col-sm-12 col-xs-12">
                  <input
                    data-orden="1"
                    maxlength="2"
                    type="number"
                    v-model="bajoPeso.talla_cita_1er"
                    min="0"
                    class="form-control col-md-12 col-sm-12 col-xs-12"
                    disabled="disabled"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="salto-linea"></div>
        <div class="col-md-12 no-padding" style="display: flex; justify-content: center">
          <div class="col-md-7 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarGananciaPeso">
            <label class="labelPreguntas">Ganancia de peso esperado a los 30 días ?</label>
            <div class="col-md-2 no-padding inline-inputs" style="float: right">
              <input
                type="text"
                v-model="bajoPeso.ganancia_peso"
                maxlength="1"
                placeholder="N"
                data-orden="1"
                disabled="disabled"
                class="form-control col-md-12 col-sm-12 col-xs-12"
                style="text-align: center"
              />
            </div>
          </div>
          <div
            v-if="bajoPeso.ganancia_peso == 'S'"
            class="col-md-5 col-sm-12 col-xs-12 form-group form-md-checkboxes"
            id="validarGramosGanados"
          >
            <label class="labelPreguntas">Gramos ganados</label>
            <div class="col-md-4 no-padding inline-inputs" style="float: right">
              <input
                type="number"
                min="0"
                v-model="bajoPeso.gramos_ganados"
                maxlength="3"
                data-orden="1"
                disabled="disabled"
                class="form-control col-md-12 col-sm-12 col-xs-12"
                style="text-align: center"
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
  `,
});
