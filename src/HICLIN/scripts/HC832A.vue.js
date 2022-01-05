module.exports = Vue.component("content_hc832a", {
  props: {
    params: {},
    data: {},
  },
  data() {
    return {
      anomalias_congenitas: {},
      data_anomalias: "",
      ano_prox_ctl: "",
      mes_prox_ctl: "",
      dia_prox_ctl: "",
      ano_ult_cyd: "",
      mes_ult_cyd: "",
      dia_ult_cyd: "",
      ano_vac_anomal: "",
      mes_vac_anomal: "",
      dia_vac_anomal: "",
      ano_hig_oral_anomal: "",
      mes_hig_oral_anomal: "",
      dia_hig_oral_anomal: "",
    };
  },
  created() {
    _fs = this
  },
  watch: {
    "params.estado": function (estado) {
      if (estado) this.validarDescripcion();
    },
    data: {
      handler(params) {
        let fecha = []
        this.anomalias_congenitas = params

        fecha = this.devolverFecha(params.fecha_prox_ctl);
        this.ano_prox_ctl = fecha[0]
        this.mes_prox_ctl = fecha[1]
        this.dia_prox_ctl = fecha[2]

        fecha = this.devolverFecha(params.fecha_prox_ctl);
        this.ano_prox_ctl = fecha[0]
        this.mes_prox_ctl = fecha[1]
        this.dia_prox_ctl = fecha[2]

        fecha = this.devolverFecha(params.fecha_ult_cyd);
        this.ano_ult_cyd = fecha[0]
        this.mes_ult_cyd = fecha[1]
        this.dia_ult_cyd = fecha[2]

        fecha = this.devolverFecha(params.fecha_vac_anomal);
        this.ano_vac_anomal = fecha[0]
        this.mes_vac_anomal = fecha[1]
        this.dia_vac_anomal = fecha[2]

        fecha = this.devolverFecha(params.fecha_hig_oral_anomal);
        this.ano_hig_oral_anomal = fecha[0]
        this.mes_hig_oral_anomal = fecha[1]
        this.dia_hig_oral_anomal = fecha[2]
      },
      deep: true
    },
  },
  methods: {
    devolverFecha(fecha) {
      let ano = mes = "", dia = "";

      if (fecha) {
        ano = parseInt(fecha.substring(0, 4)) || "";
        mes = parseInt(fecha.substring(4, 6)) || "";
        dia = parseInt(fecha.substring(6, 8)) || "";
      }

      return [ano, mes, dia];
    },
    validarDescripcion() {
      validarInputs(
        {
          form: "#datoDescripcion",
          orden: "1",
        },
        this._escape,
        () => {
          this.anomalias_congenitas.descrip_anomalia = this.anomalias_congenitas.descrip_anomalia || "Sin anomalías congenitas";
          this.validarSeguimiento();
        }
      );
    },
    validarSeguimiento() {
      validarInputs(
        {
          form: "#datoSeguimiento",
          orden: "1",
        },
        this.validarDescripcion,
        () => {
          this.anomalias_congenitas.seguimien_anomal = this.anomalias_congenitas.seguimien_anomal.toUpperCase().trim() == "S" ? "S" : "N";

          this.validarLaboratorio();
        }
      );
    },
    validarLaboratorio() {
      validarInputs(
        {
          form: "#datoLaboratorio",
          orden: "1",
        },
        this.validarSeguimiento,
        () => {
          this.anomalias_congenitas.laboratorio_anomal = this.anomalias_congenitas.laboratorio_anomal.toUpperCase().trim() == "S" ? "S" : "N";

          this.datoFechaProx_año();
        }
      );
    },
    datoFechaProx_año() {
      validarInputs(
        {
          form: "#datoFechaProx_año",
          orden: "1",
        },
        () => this.validarLaboratorio(),
        () => {
          let ano = parseInt(this.ano_prox_ctl) || 0;
          if (ano == 0) {
            this.ano_prox_ctl = this.mes_prox_ctl = this.dia_prox_ctl = "";
            this.datoFechaUlt_año();
          } else if (ano < 2000) {
            CON851("37", "37", null, "error", "Error");
            this.datoFechaProx_año();
          } else this.datoFechaProx_mes();
        }
      );
    },
    datoFechaProx_mes() {
      validarInputs(
        {
          form: "#datoFechaProx_mes",
          orden: "1",
        },
        () => this.datoFechaProx_año(),
        () => {
          this.mes_prox_ctl = this.mes_prox_ctl.toString().padStart(2, "0");
          let mes = parseInt(this.mes_prox_ctl) || 0;
          if (mes == 0 || mes < 1 || mes > 12) {
            CON851("37", "37", null, "error", "Error");
            this.datoFechaProx_mes();
          } else this.datoFechaProx_dia();
        }
      );
    },
    datoFechaProx_dia() {
      validarInputs(
        {
          form: "#datoFechaProx_dia",
          orden: "1",
        },
        () => this.datoFechaProx_mes(),
        () => {
          this.dia_prox_ctl = this.dia_prox_ctl.toString().padStart(2, "0");
          let dia = parseInt(this.dia_prox_ctl) || 0;
          if (dia == 0 || !_validarFecha(this.ano_prox_ctl, this.mes_prox_ctl, this.dia_prox_ctl)) {
            CON851("37", "37", null, "error", "Error");
            this.datoFechaProx_dia();
          } else this.datoFechaUlt_año();
        }
      );
    },
    datoFechaUlt_año() {
      validarInputs(
        {
          form: "#datoFechaUlt_año",
          orden: "1",
        },
        () => this.datoFechaProx_año(),
        () => {
          let ano = parseInt(this.ano_ult_cyd) || 0;
          if (ano == 0) {
            this.ano_ult_cyd = this.mes_ult_cyd = this.dia_ult_cyd = "";
            this.datoFechaVac_año();
          } else if (ano < 2000) {
            CON851("37", "37", null, "error", "Error");
            this.datoFechaUlt_año();
          } else this.datoFechaUlt_mes();
        }
      );
    },
    datoFechaUlt_mes() {
      validarInputs(
        {
          form: "#datoFechaUlt_mes",
          orden: "1",
        },
        () => this.datoFechaUlt_año(),
        () => {
          this.mes_ult_cyd = this.mes_ult_cyd.toString().padStart(2, "0");
          let mes = parseInt(this.mes_ult_cyd) || 0;

          if (mes == 0 || mes < 1 || mes > 12) {
            CON851("37", "37", null, "error", "Error");
            this.datoFechaUlt_mes();
          } else this.datoFechaUlt_dia();
        }
      );
    },
    datoFechaUlt_dia() {
      validarInputs(
        {
          form: "#datoFechaUlt_dia",
          orden: "1",
        },
        () => this.datoFechaUlt_mes(),
        () => {
          this.dia_ult_cyd = this.dia_ult_cyd.toString().padStart(2, "0");
          let dia = parseInt(this.dia_ult_cyd) || 0;

          if (dia == 0 || !_validarFecha(this.ano_ult_cyd, this.mes_ult_cyd, this.dia_ult_cyd)) {
            CON851("37", "37", null, "error", "Error");
            this.datoFechaUlt_dia();
          } else this.datoFechaVac_año();
        }
      );
    },
    datoFechaVac_año() {
      validarInputs(
        {
          form: "#datoFechaVac_año",
          orden: "1",
        },
        () => this.datoFechaUlt_año(),
        () => {
          let ano = parseInt(this.ano_vac_anomal) || 0;
          if (ano == 0) {
            this.ano_vac_anomal = this.mes_vac_anomal = this.dia_vac_anomal = "";
            this.datoFechaHigOral_año();
          } else if (ano < 2000) {
            CON851("37", "37", null, "error", "Error");
            this.datoFechaVac_año();
          } else this.datoFechaVac_mes();
        }
      );
    },
    datoFechaVac_mes() {
      validarInputs(
        {
          form: "#datoFechaVac_mes",
          orden: "1",
        },
        () => this.datoFechaVac_año(),
        () => {
          this.mes_vac_anomal = this.mes_vac_anomal.toString().padStart(2, "0");
          let mes = parseInt(this.mes_vac_anomal) || 0;
          if (mes == 0 || mes < 1 || mes > 12) {
            CON851("37", "37", null, "error", "Error");
            this.datoFechaVac_mes();
          } else this.datoFechaVac_dia();
        }
      );
    },
    datoFechaVac_dia() {
      validarInputs(
        {
          form: "#datoFechaVac_dia",
          orden: "1",
        },
        () => this.datoFechaVac_mes(),
        () => {
          this.dia_vac_anomal = this.dia_vac_anomal.toString().padStart(2, "0");
          let dia = parseInt(this.dia_vac_anomal) || 0;

          if (dia == 0 || !_validarFecha(this.ano_vac_anomal, this.mes_vac_anomal, this.dia_vac_anomal)) {
            CON851("37", "37", null, "error", "Error");
            this.datoFechaVac_dia();
          } else this.datoFechaHigOral_año();
        }
      );
    },
    datoFechaHigOral_año() {
      validarInputs(
        {
          form: "#datoFechaHigOral_año",
          orden: "1",
        },
        () => this.datoFechaVac_año(),
        () => {
          let ano = parseInt(this.ano_hig_oral_anomal) || 0
          if (ano == 0) {
            this.ano_hig_oral_anomal = this.mes_hig_oral_anomal = this.dia_hig_oral_anomal = "";
            this._terminar();
          } else if (ano < 2000) {
            CON851("37", "37", null, "error", "Error");
            this.datoFechaHigOral_año();
          } else this.datoFechaHigOral_mes();
        }
      );
    },
    datoFechaHigOral_mes() {
      validarInputs(
        {
          form: "#datoFechaHigOral_mes",
          orden: "1",
        },
        () => this.datoFechaHigOral_año(),
        () => {
          this.mes_hig_oral_anomal = this.mes_hig_oral_anomal.toString().padStart(2, "0");
          let mes = parseInt(this.mes_hig_oral_anomal) || 0;

          if (mes == 0 || mes < 1 || mes > 12) {
            CON851("37", "37", null, "error", "Error");
            this.datoFechaHigOral_mes();
          } else this.datoFechaHigOral_dia();
        }
      );
    },
    datoFechaHigOral_dia() {
      validarInputs(
        {
          form: "#datoFechaHigOral_dia",
          orden: "1",
        },
        () => this.datoFechaHigOral_año(),
        () => {
          this.dia_hig_oral_anomal = this.dia_hig_oral_anomal.toString().padStart(2, "0");
          let dia = parseInt(this.dia_hig_oral_anomal) || 0;

          if (dia == 0 || !_validarFecha(this.ano_hig_oral_anomal, this.mes_hig_oral_anomal, this.dia_hig_oral_anomal)) {
            CON851("37", "37", null, "error", "Error");
            this.datoFechaHigOral_dia();
          } else this._terminar();
        }
      );
    },
    _escape() {
      this.$emit("callback_esc");
    },
    _terminar() {
      this.anomalias_congenitas.fecha_prox_ctl = this.ano_prox_ctl.toString().concat(this.mes_prox_ctl.toString(), this.dia_prox_ctl.toString()) || "00000000";
      this.anomalias_congenitas.fecha_ult_cyd = this.ano_ult_cyd.toString().concat(this.mes_ult_cyd.toString(), this.dia_ult_cyd.toString()) || "00000000";
      this.anomalias_congenitas.fecha_vac_anomal = this.ano_vac_anomal.toString().concat(this.mes_vac_anomal.toString(), this.dia_vac_anomal.toString()) || "00000000";
      this.anomalias_congenitas.fecha_hig_oral_anomal =
        this.ano_hig_oral_anomal.toString().concat(this.mes_hig_oral_anomal.toString(), this.dia_hig_oral_anomal.toString()) || "00000000";
      this.$emit("callback", this.anomalias_congenitas);
    },
  },
  template: /*html*/ ` 
  <div class="col-md-12 no-padding">
     <div class="portlet light box-center box-title">
      <div class="portlet-title">
        <div class="caption">
          <span class="caption-subject bold">Anomalías congenitas</span>
        </div>
      </div>
    </div>
  <div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding">
  <div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding">
    <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
      <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
        <div
          class="col-md-12 no-padding form-md-checkboxes"
          style="text-align: left"
        >
        <div class="salto-linea"></div>
        <div class="salto-linea"></div>
          <div
            class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes"
            style="padding-left: 12px"
          >
            <label>Descripción de la anomalía detectada</label>
            <div
              id="datoDescripcion"
              class="col-md-12 col-sm-12 inline-inputs no-padding"
              style="padding-right: 2px"
            >
              <input
                disabled="disabled"
                id="descrip_anomalia"
                type="text"
                data-orden="1"
                maxlength="45"
                class="uppercase form-control col-md-12 col-sm-12 col-xs-12"
                style="text-align: left"
                v-model="anomalias_congenitas.descrip_anomalia"
              />
            </div>
          </div>

          <div class="salto-linea"></div>
          <div class="salto-linea"></div>
          <div class="salto-linea"></div>
          <div
            class="col-md-12"
            style="display: flex; justify-content: space-around"
          >
            <div
              class="col-md-4 col-sm-4 col-xs-4 form-md-checkboxes no-padding"
            >
              <label
                style="position: relative; top: 6px"
                class="col-md-4 col-sm-4 col-sm-4"
              >
                Seguimiento
              </label>
              <div
                id="datoSeguimiento"
                class="col-md-4 col-sm-5 inline-inputs"
                style="float: right; padding-right: 19px; padding-left: 1px"
              >
                <input
                  type="text"
                  data-orden="1"
                  placeholder="N"
                  maxlength="1"
                  v-model="anomalias_congenitas.seguimien_anomal"
                  class="uppercase form-control col-md-12 col-sm-12 col-xs-12"
                  style="text-align: center"
                  disabled="disabled"
                />
              </div>
            </div>
            <div
              class="col-md-4 col-sm-4 col-xs-4 form-md-checkboxes no-padding"
            >
              <label
                class="col-md-4 col-sm-4 col-sm-4"
                style="position: relative; top: 6px"
                >Laboratorios</label
              >
              <div
                id="datoLaboratorio"
                class="col-md-4 col-sm-5 inline-inputs"
                style="float: right; padding-right: 19px; padding-left: 1px"
              >
                <input
                  type="text"
                  data-orden="1"
                  disabled="disabled"
                  placeholder="N"
                  maxlength="1"
                  v-model="anomalias_congenitas.laboratorio_anomal"
                  class="uppercase form-control col-md-12 col-sm-12 col-xs-12"
                  style="text-align: center"
                />
              </div>
            </div>
          </div>
          <div class="salto-linea"></div>
          <div class="salto-linea"></div>
          <div class="salto-linea"></div>
          <div
            class="col-md-12 col-sm-12 col-xs-12"
            style="
              display: grid;
              grid-template-columns: 104%;
              padding-left: 0px;
            "
          >
            <div
              class="col-md-12 col-xs-12 col-sm-12"
              style="padding-left: 0px; padding-right: 0px"
            >
              <div
                class="col-md-12 col-sm-8"
                style="
                  display: grid;
                  grid-template-columns: 47% 15% 15% 12%;
                  column-gap: 19px;
                "
              >
                <div
                  class="col-md-12"
                  style="display: flex; padding-left: 0px; padding-right: 0px"
                ></div>
                <div
                  class="col-md-12"
                  style="padding-left: 0px; padding-right: 0px"
                >
                  <label
                    class="col-md-12 col-sm-12 col-xs-12"
                    style="text-align: center"
                    >Año</label
                  >
                </div>
                <div
                  class="col-md-12"
                  style="padding-left: 0px; padding-right: 0px"
                >
                  <label
                    class="col-md-12 col-sm-12 col-xs-12"
                    style="text-align: center"
                    >Mes</label
                  >
                </div>
                <div
                  class="col-md-12"
                  style="padding-left: 0px; padding-right: 0px"
                >
                  <label
                    class="col-md-12 col-sm-12 col-xs-12"
                    style="text-align: center"
                    >Día</label
                  >
                </div>
              </div>
              <!--Fecha del próximo control-->
              <div
                class="col-md-12 col-sm-12"
                style="
                  display: grid;
                  grid-template-columns: 47% 15% 15% 12%;
                  padding-top: 5px;
                  padding-left: 12px;
                  column-gap: 19px;
                "
              >
                <div
                  class="col-md-12"
                  style="
                    display: flex;
                    position: relative;
                    padding-left: 0px;
                    padding-right: 0px;
                  "
                >
                  <label> Fecha del próximo control</label>
                </div>
                <div
                  id="datoFechaProx_año"
                  class="col-md-12"
                  style="
                        display: flex;
                        position: relative;
                        padding-left: 0px;
                        align-items:center;
                        padding-right: 0px;
                  "
                >
                  <div
                    class="col-md-12"
                    style="padding-right: 0px; padding-left: 0px"
                  >
                    <input
                      type="number"
                      data-orden="1"
                      maxlength="4"
                      disabled="disabled"
                      placeholder="AAAA"
                      class="form-control col-md-12 col-sm-12 col-xs-12"
                      style="text-align: center"
                      v-model="ano_prox_ctl"
                    />
                  </div>
                </div>
                <div
                  id="datoFechaProx_mes"
                  class="col-md-12"
                  style="
                    display: flex;
                    position: relative;
                    padding-left: 0px;
                    padding-right: 0px;
                  "
                >
                  <div
                    class="col-md-12"
                    style="padding-right: 0px; padding-left: 0px"
                  >
                    <input
                      type="number"
                      data-orden="1"
                      maxlength="2"
                      disabled="disabled"
                      placeholder="MM"
                      class="form-control col-md-12 col-sm-12 col-xs-12"
                      style="text-align: center"
                      v-model="mes_prox_ctl"
                    />
                  </div>
                </div>
                <div
                  id="datoFechaProx_dia"
                  class="col-md-12"
                  style="
                    display: flex;
                    position: relative;
                    padding-left: 0px;
                    padding-right: 0px;
                  "
                >
                  <div
                    class="col-md-12"
                    style="padding-right: 0px; padding-left: 0px"
                  >
                    <input
                      type="number"
                      data-orden="1"
                      maxlength="2"
                      disabled="disabled"
                      placeholder="DD"
                      class="form-control col-md-12 col-sm-12 col-xs-12"
                      style="text-align: center"
                      v-model="dia_prox_ctl"
                    />
                  </div>
                </div>
              </div>
              <!--Fecha ultimo control y desarrollo-->
              <div
                class="col-md-12 col-sm-8"
                style="
                  display: grid;
                  grid-template-columns: 47% 15% 15% 12%;
                  padding-top: 5px;
                  padding-left: 12px;
                  column-gap: 19px;
                "
              >
                <div
                  class="col-md-12"
                  style="
                    display: flex;
                    position: relative;
                    padding-left: 0px;
                    padding-right: 0px;
                  "
                >
                  <label> Fecha de último control y desarrollo</label>
                </div>
                <div
                  id="datoFechaUlt_año"
                  class="col-md-12"
                  style="
                        display: flex;
                        position: relative;
                        padding-left: 0px;
                        align-items:center;
                        padding-right: 0px;
                  "
                >
                  <div
                    class="col-md-12"
                    style="padding-right: 0px; padding-left: 0px"
                  >
                    <input
                      type="number"
                      data-orden="1"
                      maxlength="4"
                      disabled="disabled"
                      placeholder="AAAA"
                      class="form-control col-md-12 col-sm-12 col-xs-12"
                      style="text-align: center"
                      v-model="ano_ult_cyd"
                    />
                  </div>
                </div>
                <div
                  id="datoFechaUlt_mes"
                  class="col-md-12"
                  style="
                    display: flex;
                    position: relative;
                    padding-left: 0px;
                    padding-right: 0px;
                  "
                >
                  <div
                    class="col-md-12"
                    style="padding-right: 0px; padding-left: 0px"
                  >
                    <input
                      type="number"
                      data-orden="1"
                      maxlength="2"
                      disabled="disabled"
                      placeholder="MM"
                      class="form-control col-md-12 col-sm-12 col-xs-12"
                      style="text-align: center"
                      v-model="mes_ult_cyd"
                    />
                  </div>
                </div>
                <div
                  id="datoFechaUlt_dia"
                  class="col-md-12"
                  style="
                    display: flex;
                    position: relative;
                    padding-left: 0px;
                    padding-right: 0px;
                  "
                >
                  <div
                    class="col-md-12"
                    style="padding-right: 0px; padding-left: 0px"
                  >
                    <input
                      type="number"
                      data-orden="1"
                      maxlength="2"
                      disabled="disabled"
                      placeholder="DD"
                      class="form-control col-md-12 col-sm-12 col-xs-12"
                      style="text-align: center"
                      v-model="dia_ult_cyd"
                    />
                  </div>
                </div>
              </div>
              <!--Fecha de vacunación-->
              <div
                class="col-md-12 col-sm-8"
                style="
                  display: grid;
                  grid-template-columns: 47% 15% 15% 12%;
                  padding-top: 5px;
                  padding-left: 12px;
                  column-gap: 19px;
                "
              >
                <div
                  id="datoFechaVac"
                  class="col-md-12"
                  style="
                    display: flex;
                    position: relative;
                    padding-left: 0px;
                    padding-right: 0px;
                  "
                >
                  <label> Fecha de vacunación</label>
                </div>
                <div
                  id="datoFechaVac_año"
                  class="col-md-12"
                  style="
                        display: flex;
                        position: relative;
                        padding-left: 0px;
                        align-items:center;
                        padding-right: 0px;
                  "
                >
                  <div
                    class="col-md-12"
                    style="padding-right: 0px; padding-left: 0px"
                  >
                    <input
                      type="number"
                      data-orden="1"
                      maxlength="4"
                      disabled="disabled"
                      placeholder="AAAA"
                      class="form-control col-md-12 col-sm-12 col-xs-12"
                      style="text-align: center"
                      v-model="ano_vac_anomal"
                    />
                  </div>
                </div>
                <div
                  id="datoFechaVac_mes"
                  class="col-md-12"
                  style="
                    display: flex;
                    position: relative;
                    padding-left: 0px;
                    padding-right: 0px;
                  "
                >
                  <div
                    class="col-md-12"
                    style="padding-right: 0px; padding-left: 0px"
                  >
                    <input
                      type="number"
                      data-orden="1"
                      maxlength="2"
                      disabled="disabled"
                      placeholder="MM"
                      class="form-control col-md-12 col-sm-12 col-xs-12"
                      style="text-align: center"
                      v-model="mes_vac_anomal"
                    />
                  </div>
                </div>
                <div
                  id="datoFechaVac_dia"
                  class="col-md-12"
                  style="
                    display: flex;
                    position: relative;
                    padding-left: 0px;
                    padding-right: 0px;
                  "
                >
                  <div
                    class="col-md-12"
                    style="padding-right: 0px; padding-left: 0px"
                  >
                    <input
                      type="number"
                      data-orden="1"
                      maxlength="2"
                      disabled="disabled"
                      placeholder="DD"
                      class="form-control col-md-12 col-sm-12 col-xs-12"
                      style="text-align: center"
                      v-model="dia_vac_anomal"
                    />
                  </div>
                </div>
              </div>
              <!--Fecha de higiene oral-->
              <div
                class="col-md-12 col-sm-8"
                style="
                  display: grid;
                  grid-template-columns: 47% 15% 15% 12%;
                  padding-top: 5px;
                  padding-left: 12px;
                  column-gap: 19px;
                "
              >
                <div
                  class="col-md-12"
                  style="
                    display: flex;
                    position: relative;
                    padding-left: 0px;
                    padding-right: 0px;
                  "
                >
                  <label> Fecha de higiene oral</label>
                </div>
                <div
                  id="datoFechaHigOral_año"
                  class="col-md-12"
                  style="
                        display: flex;
                        position: relative;
                        padding-left: 0px;
                        align-items:center;
                        padding-right: 0px;
                  "
                >
                  <div
                    class="col-md-12"
                    style="padding-right: 0px; padding-left: 0px"
                  >
                    <input
                      type="number"
                      data-orden="1"
                      maxlength="4"
                      disabled="disabled"
                      placeholder="AAAA"
                      class="form-control col-md-12 col-sm-12 col-xs-12"
                      style="text-align: center"
                      v-model="ano_hig_oral_anomal"
                    />
                  </div>
                </div>
                <div
                  id="datoFechaHigOral_mes"
                  class="col-md-12"
                  style="
                    display: flex;
                    position: relative;
                    padding-left: 0px;
                    padding-right: 0px;
                  "
                >
                  <div
                    class="col-md-12"
                    style="padding-right: 0px; padding-left: 0px"
                  >
                    <input
                      type="number"
                      data-orden="1"
                      maxlength="2"
                      disabled="disabled"
                      placeholder="MM"
                      class="form-control col-md-12 col-sm-12 col-xs-12"
                      style="text-align: center"
                      v-model="mes_hig_oral_anomal"
                    />
                  </div>
                </div>
                <div
                  id="datoFechaHigOral_dia"
                  class="col-md-12"
                  style="
                    display: flex;
                    position: relative;
                    padding-left: 0px;
                    padding-right: 0px;
                  "
                >
                  <div
                    class="col-md-12"
                    style="padding-right: 0px; padding-left: 0px"
                  >
                    <input
                      type="number"
                      data-orden="1"
                      maxlength="2"
                      disabled="disabled"
                      placeholder="DD"
                      class="form-control col-md-12 col-sm-12 col-xs-12"
                      style="text-align: center"
                      v-model="dia_hig_oral_anomal"
                    />
                  </div>
                </div>
              </div>
              <div class="salto-linea"></div>
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
