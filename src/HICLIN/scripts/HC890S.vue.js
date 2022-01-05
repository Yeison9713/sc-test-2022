const { detallesHc, grabarDetalles } = require("../../HICLIN/scripts/reg_dethc.js");

// componente detalle 9016 - santiago franco

// se tiene que enviar la llave_hc en params y serv_hc

module.exports = Vue.component("content_hc890s", {
  props: {
    params: {},
  },
  data() {
    return {
      dato_9016: detallesHc.WS_9016(),

      stylesHc890s: {
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

      horario: [
        { value: "1", descrip: "AM" },
        { value: "2", descrip: "PM" },
      ],

      joranada_laboral: [
        { value: "1", descrip: "Diurna" },
        { value: "2", descrip: "Nocturna" },
        { value: "3", descrip: "Mixta" },
        { value: "4", descrip: "Por turnos" },
      ],

      tipo_accident: [
        { value: "1", descrip: "Violencia" },
        { value: "2", descrip: "Transito" },
        { value: "3", descrip: "Deportivo" },
        { value: "4", descrip: "Recreativo" },
        { value: "5", descrip: "Propio del trabajo" },
      ],

      fecha_lnk: null,
    };
  },
  watch: {
    // "params.estado": function (estado) {
    //   if (estado) this.cargarDestalle();
    // },
  },
  created() {
    $this = this;
    this.cargarDestalle();
  },
  methods: {
    dato_anoAccident() {
      validarInputs(
        {
          form: "#ano_accid",
          orden: "1"
        },
        () => {
          this._escape();
        },
        () => {
          let ano = parseFloat(this.dato_9016.fecha_accid.ano_accid) || 0;

          if (ano >= 0 && ano < 1950) {
            this.dato_anoAccident();
          } else {
            this.dato_mesAccident();
          }
        }
      );
    },

    dato_mesAccident() {
      validarInputs(
        {
          form: "#mes_accid",
          orden: "1"
        },
        () => {
          this.dato_anoAccident();
        },
        () => {
          this.dato_9016.fecha_accid.mes_accid = cerosIzq(this.dato_9016.fecha_accid.mes_accid, 2)
          let mes = parseFloat(this.dato_9016.fecha_accid.mes_accid) || 0;

          if (mes < 1 && mes > 12) {
            this.dato_mesAccident();
          } else {
            this.dato_diaAccident();
          }
        }
      );
    },

    dato_diaAccident() {
      validarInputs(
        {
          form: "#dia_accid",
          orden: "1"
        },
        () => {
          this.dato_mesAccident();
        },
        () => {
          this.dato_9016.fecha_accid.dia_accid = cerosIzq(this.dato_9016.fecha_accid.dia_accid, 2)
          let dia = parseFloat(this.dato_9016.fecha_accid.dia_accid) || 0;

          if (dia < 1 || dia > 31) {
            this.dato_diaAccident();
          } else {
            let fecha = this.dato_9016.fecha_accid || {};
            fecha = `${fecha.ano_accid}${fecha.mes_accid}${fecha.dia_accid}`;
            let fecha_w = parseFloat(fecha);

            if (fecha_w > this.fecha_lnk) {
              CON851("37", "37", null, "error", "error");
              this.dato_anoAccident();
            } else {
              this.dato_horaAccid();
            }
          }
        }
      );
    },

    dato_horaAccid() {
      validarInputs(
        {
          form: "#hr_accid",
          orden: "1"
        },
        () => {
          this.dato_anoAccident();
        },
        () => {
          this.dato_9016.hora_accid.hr_accid = cerosIzq(this.dato_9016.hora_accid.hr_accid, 2)
          let hora = parseFloat(this.dato_9016.hora_accid.hr_accid) || 0

          if (hora > 12) {
            CON851("37", "37", null, "error", "error");
            this.dato_horaAccid();
          } else {
            this.dato_minutAccid();
          }
        }
      );
    },

    dato_minutAccid() {
      validarInputs(
        {
          form: "#mn_accid",
          orden: "1"
        },
        () => {
          this.dato_horaAccid();
        },
        () => {
          this.dato_9016.hora_accid.mn_accid = cerosIzq(this.dato_9016.hora_accid.mn_accid, 2)
          let minut = parseFloat(this.dato_9016.hora_accid.mn_accid) || 0

          if (minut > 60) {
            CON851("37", "37", null, "error", "error");
            this.dato_minutAccid();
          } else {
            this.validarHorario();
          }
        }
      );
    },

    validarHorario() {
      setTimeout(() => {
        POPUP(
          {
            titulo: "Horario",
            indices: [{ id: "value", label: "descrip" }],
            array: this.horario,
            callback_f: () => this.dato_minutAccid(),
            seleccion: 1,
            teclaAlterna: true,
            id_input: "#am_pm_accid",
          },
          (data) => {
            this.dato_9016.hora_accid.am_pm_accid = data.descrip;
            this.dato_laborHabitual();
          }
        );
      }, 300);
    },

    dato_laborHabitual() {
      validarInputs(
        {
          form: "#labor_habitual",
          orden: "1"
        },
        () => {
          this.dato_horaAccid();
        },
        () => {
          let labor_habitual = this.dato_9016.labor_habitual || "N";
          labor_habitual = labor_habitual.toUpperCase();

          if (['S', 'N'].includes(labor_habitual)) {
            this.dato_9016.labor_habitual = labor_habitual;
            this.dato_jornadaLab();
          } else {
            CON851("03", "03", null, "error", "error");
            this.dato_laborHabitual();
          }
        }
      );
    },

    dato_jornadaLab() {
      setTimeout(() => {
        POPUP(
          {
            titulo: "Jornada laboral",
            indices: [{ id: "value", label: "descrip" }],
            array: this.joranada_laboral,
            callback_f: () => this.dato_laborHabitual(),
            seleccion: this.dato_9016.jornada || 1,
            teclaAlterna: true,
            id_input: "#jornadaLabor",
          },
          (data) => {
            this.dato_9016.jornada = data.value;
            this.$refs.jornadaLabor.value = data.descrip;
            this.dato_tipoAccident();
          }
        );
      }, 300);
    },

    dato_tipoAccident() {
      setTimeout(() => {
        POPUP(
          {
            titulo: "Tipo de accidente",
            indices: [{ id: "value", label: "descrip" }],
            array: this.tipo_accident,
            callback_f: () => this.dato_jornadaLab(),
            seleccion: this.dato_9016.tipo_accid || 1,
            teclaAlterna: true,
            id_input: "#tipoAccident",
          },
          (data) => {
            this.dato_9016.tipo_accid = data.value;
            this.$refs.tipoAccident.value = data.descrip;
            this.dato_sitioAccidente();
          }
        );
      }, 300);
    },

    dato_sitioAccidente() {
      validarInputs(
        {
          form: "#sitioAccident",
          orden: "1"
        },
        () => {
          this.dato_tipoAccident();
        },
        () => {
          let text = this.dato_9016.sitio_accid || "";
          text = text.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
          this.dato_9016.sitio_accid = text.toUpperCase();
          this.dato_parteCuerpoafect();
        }
      );
    },

    dato_parteCuerpoafect() {
      validarInputs(
        {
          form: "#parteCuerpAfect",
          orden: "1"
        },
        () => {
          this.dato_sitioAccidente();
        },
        () => {
          let text = this.dato_9016.part_cuerpo_afect || "";
          text = text.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
          this.dato_9016.part_cuerpo_afect = text.toUpperCase();
          this.grabarDetalle();
        }
      );
    },

    async grabarDetalle() {
      loader('show');

      let detalles = {
        "9016": _getObjetoSaveHc(this.dato_9016, []),
      }

      grabarDetalles(detalles, this.params.llave_hc);
      loader('hide')
      this._terminar();
    },

    cargarDestalle() {
      postData({
        datosh: datosEnvio() + this.params.llave_hc + '|' + '  ' + '|' + '  ' + '|' + '9016' + '|' + this.params.serv_hc + '|'
      }, get_url("app/HICLIN/HCDETAL_PRC.DLL"))
        .then((data) => {
          this.detalle = data["DETHC"];
          this.detalle.pop()

          if (this.detalle.length == 0) {
            this.fecha_lnk = this._currentDate().fecha;
            this.dato_anoAccident();
          } else {
            this.dato_9016 = this.detalle[0].DETALLE;

            switch (this.dato_9016.jornada) {
              case '1' : this.$refs.jornadaLabor.value = 'Diurna'; break;
              case '2' : this.$refs.jornadaLabor.value = 'Nocturna'; break;
              case '3' :  this.$refs.jornadaLabor.value = 'Mixta';break;
              case '4' :  this.$refs.jornadaLabor.value = 'Por turnos';break;
              default: this.$refs.jornadaLabor.value = ''; break;
            }

            switch (this.dato_9016.tipo_accid) {
              case '1' : this.$refs.tipoAccident.value = 'Violencia'; break;
              case '2' : this.$refs.tipoAccident.value = 'Transito'; break;
              case '3' : this.$refs.tipoAccident.value = 'Deportivo'; break;
              case '4' : this.$refs.tipoAccident.value = 'Recreativo'; break;
              case '5' : this.$refs.tipoAccident.value = 'Propio del trabajo'; break;
              default: this.$refs.tipoAccident.value = ''; break;
            }

            this.fecha_lnk = this._currentDate().fecha;
            this.dato_anoAccident();
          }
        })
        .catch((error) => {
          CON851('', 'Error consultando datos', null, 'error', 'error')
          loader("hide")
          this._escape();
        });
    },

    _currentDate() {
      let date = new Date()
      let options = {};

      options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      let fecha = date.toLocaleDateString("es-CO", options).split("/").reverse().join("")

      options = { hour: '2-digit', minute: '2-digit' }
      let hora = date.toLocaleTimeString("es-CO", options).split(" ")[0];

      return { fecha, hora }
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
          <div class="modal_prosoft" style="width: 60%;">
              <div class="container_prosoft">
                  <div class="body_prosoft">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div class="portlet light no-padding">
                              <div class="portlet-body" style=" padding-left: 7px; padding-right: 7px; padding-top: 7px;">

                                <div class="portlet light box-center box-title">
                                  <div class="portlet-title">
                                    <div class="caption" style="width: 100%">
                                      <span class="caption-subject bold">Información del accidente</span>
                                    </div>
                                  </div>
                                </div>

                                <div class="col-md-4 col-sm-4 col-xs-4">
                                  <label>Fecha del accidente</label>
                                  <div class="inline-inputs">
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" style="padding-right: 5px;" id="ano_accid">
                                    <input v-model="dato_9016.fecha_accid.ano_accid" type="number" placeholder="AAAA"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 text-left" maxlength="4" data-orden="1"
                                      required="true" disabled="disabled" />
                                  </div>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" style="padding-right: 5px;" id="mes_accid">
                                    <input v-model="dato_9016.fecha_accid.mes_accid" type="number" placeholder="MM"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 text-left" maxlength="2" data-orden="1"
                                      required="true" disabled="disabled" />
                                  </div>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" style="padding-right: 5px;" id="dia_accid">
                                    <input v-model="dato_9016.fecha_accid.dia_accid" type="number" placeholder="DD"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 text-left" maxlength="2" data-orden="1"
                                      required="true" disabled="disabled" />
                                  </div>
                                  </div>
                                </div>

                                <div class="col-md-4 col-sm-4 col-xs-4">
                                  <label>Hora del accidente</label>
                                  <div class="inline-inputs">
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" style="padding-right: 5px;" id="hr_accid">
                                    <input v-model="dato_9016.hora_accid.hr_accid" type="number" placeholder="HH"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 text-left" maxlength="2" data-orden="1"
                                      required="true" disabled="disabled" />
                                  </div>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" style="padding-right: 5px;" id="mn_accid">
                                    <input v-model="dato_9016.hora_accid.mn_accid" type="number" placeholder="MM"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 text-left" maxlength="2" data-orden="1"
                                      required="true" disabled="disabled" />
                                  </div>
                                  <div class="input-group col-md-4 col-sm-4 col-xs-4" style="padding-right: 5px;" id="am_pm_accid">
                                    <input v-model="dato_9016.hora_accid.am_pm_accid" type="text" placeholder="AM/PM"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 text-left" maxlength="2" data-orden="1"
                                      required="true" disabled="disabled" />
                                  </div>
                                  </div>
                                </div>

                                <div class="col-md-4 col-sm-4 col-xs-4">
                                    <label>Realizaba su labor habitual</label>
                                    <div class="inline-inputs">
                                        <div class="input-group col-md-12 col-sm-12 col-xs-12"
                                            id="labor_habitual">
                                            <input v-model="dato_9016.labor_habitual"
                                                type="text" maxlength="1"
                                                class="form-control col-md-12 col-sm-12 col-xs-12 text-center"
                                                disabled placeholder="N" data-orden="1">
                                        </div>
                                    </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-4 col-sm-4 col-xs-4">
                                    <label>Jornada laboral:</label>
                                    <div class="inline-inputs">
                                        <div class="input-group col-md-12 col-sm-12 col-xs-12"
                                            id="jornadaLabor">
                                            <input type="text" class="form-control" ref="jornadaLabor" disabled>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4 col-sm-4 col-xs-4">
                                    <label>Tipo de accidente:</label>
                                    <div class="inline-inputs">
                                        <div class="input-group col-md-12 col-sm-12 col-xs-12"
                                            id="tipoAccident">
                                            <input type="text" class="form-control" ref="tipoAccident" disabled>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4 col-sm-4 col-xs-4">
                                    <label>Sitio del accidente:</label>
                                    <div class="inline-inputs">
                                        <div class="input-group col-md-12 col-sm-12 col-xs-12"
                                            id="sitioAccident">
                                            <input type="text" class="form-control text-left" disabled
                                              maxlength="30" v-model="dato_9016.sitio_accid"
                                              data-orden="1" />
                                        </div>
                                    </div>
                                </div>

                                <div class="salto-linea"></div>

                                <div class="col-md-12 col-sm-12 col-xs-12">
                                    <label>Parte del cuerpo afectada:</label>
                                    <div class="inline-inputs">
                                        <div class="input-group col-md-12 col-sm-12 col-xs-12"
                                            id="parteCuerpAfect">
                                            <input type="text" class="form-control text-left" disabled
                                              maxlength="40" v-model="dato_9016.part_cuerpo_afect"
                                              data-orden="1" />
                                        </div>
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
