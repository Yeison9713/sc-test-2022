const { detallesHc, grabarDetalles } = require("../../HICLIN/scripts/reg_dethc.js");

module.exports = Vue.component("component-minimental", {
  props: {
    params: {},
    data: {},
  },

  data() {
    console.log(this.data)
    return {
      ws9013: detallesHc.WS_9013(),
      edadPaci: this.params.edadPaci,
    };
  },

  async created() {
    _compHC890Q = this;
  },

  watch: {
    "params.estado": function (estado) {
      if (estado) this.getDetalleHistoria();
    },
  },

  computed: {
    puntajeAcuOriFecha() {
      let puntaje = [
        this.ws9013.orientacion.ano_mnse,
        this.ws9013.orientacion.mes_mnse,
        this.ws9013.orientacion.dia_mnse,
        this.ws9013.orientacion.dia_semana_mnse,
        this.ws9013.orientacion.hora_mnse,
      ].reduce((sum, current) => sum + (parseInt(current) || 0), 0);
      return puntaje || 0;
    },

    puntajeAcuOriLugar() {
      let puntaje = [
        this.ws9013.orientacion.pais_mnse,
        this.ws9013.orientacion.ciudad_mnse,
        this.ws9013.orientacion.departamento_mnse,
        this.ws9013.orientacion.lugar_mnse,
        this.ws9013.orientacion.barrio_mnse,
      ].reduce((sum, current) => sum + (parseInt(current) || 0), 0);
      return puntaje || 0;
    },

    acumulado() {
      let acumulado = 0;
      acumulado += Object.values(this.ws9013.orientacion).reduce((sum, current) => sum + (parseInt(current) || 0), 0);
      acumulado += parseInt(this.ws9013.memoria.memoria_mnse || 0);
      acumulado += parseInt(this.ws9013.atencion_calculo.calculo_mnse || 0);
      acumulado += parseInt(this.ws9013.evocacion.evocacion_mnse || 0);
      acumulado += Object.values(this.ws9013.lenguaje).reduce((sum, current) => sum + (parseInt(current) || 0), 0);

      return acumulado;
    },

    puntajeTotalMinimental() {
      let acumulado = this.acumulado || 0;

      if (this.edadPaci.unid == "A" && parseInt(this.edadPaci.vlr) > 75) {
        this.ws9013.edad.mayor_65 = "0";
        this.ws9013.edad.mayor_75 = "1";
      } else if (this.edadPaci.unid == "A" && parseInt(this.edadPaci.vlr) > 65) {
        this.ws9013.edad.mayor_65 = "1";
        this.ws9013.edad.mayor_75 = "0";
      } else {
        this.ws9013.edad.mayor_65 = this.ws9013.edad.mayor_75 = "0";
      }

      return (
        acumulado +
        parseInt(this.ws9013.alteracion_visual.puntua_alt_visual || 0) +
        parseInt(this.ws9013.edad.mayor_65 || 0) +
        parseInt(this.ws9013.edad.mayor_75 || 0)
      );
    },

    descripMayor75() {
      return this.edadPaci.unid == "A" && parseInt(this.edadPaci.vlr) > 75 ? "Si" : "No";
    },

    descripMayor65() {
      return this.edadPaci.unid == "A" && parseInt(this.edadPaci.vlr) > 65 && parseInt(this.edadPaci.vlr) <= 75
        ? "Si"
        : "No";
    },

    descripNivelEdu() {
      let estudio = _tipoJsonHc("nivel_estudio").find((el) => el.COD == $_REG_PACI["NIV-ESTUD"]);
      return estudio ? estudio.DESCRIP : "";
    },

    descripDeterioroCognoscitivo() {
      let nivelEst = $_REG_PACI["NIV-ESTUD"];
      if (["1", "2", "3"].includes(nivelEst) && this.acumulado <= 21)
        return `Persona  con  0 –5  años  de  escolaridad  y  puntuación de   inferior   o   igual  a  21:  Sospecha   de  deterioro cognoscitivo, remitir a psiquiatría o neurología.`;
      if (["4", "5", "6", "7"].includes(nivelEst) && this.acumulado <= 24)
        return `Persona  con  6-12  años  de  escolaridad  y  puntuación inferior o   igual   a   24:   Sospecha   de   deterioro cognoscitivo, remitir a psiquiatría o neurología.`;
      if (["8", "9", "A", "B", "C", "D"].includes(nivelEst) && this.acumulado <= 26)
        return `Persona   con   más   de   12   años   de   escolaridad   y puntuación inferior o igual a 26: Sospecha de deterioro cognoscitivo, remitir a psiquiatría o neurología.`;

      return "";
    },
  },

  methods: {
    getDetalleHistoria() {
      loader("show");
      postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + "|||9013|" }, get_url("APP/HICLIN/HCDETAL_PRC.DLL"))
        .then((data) => {
          loader("hide");
          let WS9013 = data.DETHC.find((el) => el["COD-DETHC"] == "9013");
          this.ws9013 = WS9013 ? WS9013.DETALLE : detallesHc.WS_9013();
          this.datoAnioHC890Q();
        })
        .catch((error) => {
          loader("hide");
          console.error("Error consultado detalle de Historia", error);
          this.salir();
        });
    },

    datoAnioHC890Q() {
      validarInputs(
        {
          form: "#datoAnioHC890Q",
        },
        () =>
          CON851P(
            "03",
            () => this.datoAnioHC890Q(),
            () => this.salir()
          ),
        () => {
          let anio = parseInt(this.ws9013.orientacion.ano_mnse);
          if (anio == 0 || anio == 1) this.datoMesHC890Q();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoAnioHC890Q();
          }
        }
      );
    },

    datoMesHC890Q() {
      validarInputs(
        {
          form: "#datoMesHC890Q",
        },
        () => this.datoAnioHC890Q(),
        () => {
          let mes = parseInt(this.ws9013.orientacion.mes_mnse);
          if (mes == 0 || mes == 1) this.datoDiaHC890Q();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoMesHC890Q();
          }
        }
      );
    },

    datoDiaHC890Q() {
      validarInputs(
        {
          form: "#datoDiaHC890Q",
        },
        () => this.datoMesHC890Q(),
        () => {
          let dia = parseInt(this.ws9013.orientacion.dia_mnse);
          if (dia == 0 || dia == 1) this.datoDiaSemanaHC890Q();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoDiaHC890Q();
          }
        }
      );
    },

    datoDiaSemanaHC890Q() {
      validarInputs(
        {
          form: "#datoDiaSemanaHC890Q",
        },
        () => this.datoDiaHC890Q(),
        () => {
          let diaSemana = parseInt(this.ws9013.orientacion.dia_semana_mnse);
          if (diaSemana == 0 || diaSemana == 1) this.datoHoraHC890Q();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoDiaSemanaHC890Q();
          }
        }
      );
    },

    datoHoraHC890Q() {
      validarInputs(
        {
          form: "#datoHoraHC890Q",
        },
        () => this.datoDiaSemanaHC890Q(),
        () => {
          let hora = parseInt(this.ws9013.orientacion.hora_mnse);
          if (hora == 0 || hora == 1) this.datoPaisHC890Q();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoHoraHC890Q();
          }
        }
      );
    },

    datoPaisHC890Q() {
      validarInputs(
        {
          form: "#datoPaisHC890Q",
        },
        () => this.datoHoraHC890Q(),
        () => {
          let pais = parseInt(this.ws9013.orientacion.pais_mnse);
          if (pais == 0 || pais == 1) this.datoCiudadHC890Q();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoPaisHC890Q();
          }
        }
      );
    },

    datoCiudadHC890Q() {
      validarInputs(
        {
          form: "#datoCiudadHC890Q",
        },
        () => this.datoPaisHC890Q(),
        () => {
          let ciudad = parseInt(this.ws9013.orientacion.ciudad_mnse);
          if (ciudad == 0 || ciudad == 1) this.datoDepartamentoHC890Q();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoCiudadHC890Q();
          }
        }
      );
    },

    datoDepartamentoHC890Q() {
      validarInputs(
        {
          form: "#datoDepartamentoHC890Q",
        },
        () => this.datoCiudadHC890Q(),
        () => {
          let depart = parseInt(this.ws9013.orientacion.departamento_mnse);
          if (depart == 0 || depart == 1) this.datoLugarHC890Q();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoDepartamentoHC890Q();
          }
        }
      );
    },

    datoLugarHC890Q() {
      validarInputs(
        {
          form: "#datoLugarHC890Q",
        },
        () => this.datoDepartamentoHC890Q(),
        () => {
          let lugar = parseInt(this.ws9013.orientacion.lugar_mnse);
          if (lugar == 0 || lugar == 1) this.datoBarrioHC890Q();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoLugarHC890Q();
          }
        }
      );
    },

    datoBarrioHC890Q() {
      validarInputs(
        {
          form: "#datoBarrioHC890Q",
        },
        () => this.datoLugarHC890Q(),
        () => {
          let barrio = parseInt(this.ws9013.orientacion.barrio_mnse);
          if (barrio == 0 || barrio == 1) this.datoIntenMemoriaHC890Q();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoBarrioHC890Q();
          }
        }
      );
    },

    datoIntenMemoriaHC890Q() {
      validarInputs(
        {
          form: "#datoIntenMemoriaHC890Q",
        },
        () => this.datoBarrioHC890Q(),
        () => {
          if (this.ws9013.memoria.inten_memoria_mnse >= 0) this.datoMemoriaHC890Q();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoIntenMemoriaHC890Q();
          }
        }
      );
    },

    datoMemoriaHC890Q() {
      validarInputs(
        {
          form: "#datoMemoriaHC890Q",
        },
        () => this.datoIntenMemoriaHC890Q(),
        () => {
          let memoria = parseInt(this.ws9013.memoria.memoria_mnse);
          if (memoria >= 0 && memoria <= 3) this.datoCalculoHC890Q();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoMemoriaHC890Q();
          }
        }
      );
    },

    datoCalculoHC890Q() {
      validarInputs(
        {
          form: "#datoCalculoHC890Q",
        },
        () => this.datoMemoriaHC890Q(),
        () => {
          let calculo = parseInt(this.ws9013.atencion_calculo.calculo_mnse);
          if (calculo >= 0 && calculo <= 5) this.datoEvocacionHC890Q();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoCalculoHC890Q();
          }
        }
      );
    },

    datoEvocacionHC890Q() {
      validarInputs(
        {
          form: "#datoEvocacionHC890Q",
        },
        () => this.datoCalculoHC890Q(),
        () => {
          let evocacion = parseInt(this.ws9013.evocacion.evocacion_mnse);
          if (evocacion >= 0 && evocacion <= 3) this.datoLenguaje1();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoEvocacionHC890Q();
          }
        }
      );
    },

    datoLenguaje1() {
      validarInputs(
        {
          form: "#datoLenguaje1",
        },
        () => this.datoEvocacionHC890Q(),
        () => {
          let lenguaje = parseInt(this.ws9013.lenguaje.lenguaje1_mnse);
          if (lenguaje >= 0 && lenguaje <= 2) this.datoLenguaje2();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoLenguaje1();
          }
        }
      );
    },

    datoLenguaje2() {
      validarInputs(
        {
          form: "#datoLenguaje2",
        },
        () => this.datoLenguaje1(),
        () => {
          let lenguaje = parseInt(this.ws9013.lenguaje.lenguaje2_mnse);
          if (lenguaje == 0 || lenguaje == 1) this.datoLenguaje3();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoLenguaje2();
          }
        }
      );
    },

    datoLenguaje3() {
      validarInputs(
        {
          form: "#datoLenguaje3",
        },
        () => this.datoLenguaje2(),
        () => {
          let lenguaje = parseInt(this.ws9013.lenguaje.lenguaje3_mnse);
          if (lenguaje >= 0 && lenguaje <= 3) this.datoLenguaje4();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoLenguaje3();
          }
        }
      );
    },

    datoLenguaje4() {
      validarInputs(
        {
          form: "#datoLenguaje4",
        },
        () => this.datoLenguaje3(),
        () => {
          let lenguaje = parseInt(this.ws9013.lenguaje.lenguaje4_mnse);
          if (lenguaje == 0 || lenguaje == 1) this.datoLenguaje5();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoLenguaje4();
          }
        }
      );
    },

    datoLenguaje5() {
      validarInputs(
        {
          form: "#datoLenguaje5",
        },
        () => this.datoLenguaje4(),
        () => {
          let lenguaje = parseInt(this.ws9013.lenguaje.lenguaje5_mnse);
          if (lenguaje == 0 || lenguaje == 1) this.datoLenguaje6();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoLenguaje5();
          }
        }
      );
    },

    datoLenguaje6() {
      validarInputs(
        {
          form: "#datoLenguaje6",
        },
        () => this.datoLenguaje5(),
        () => {
          let lenguaje = parseInt(this.ws9013.lenguaje.lenguaje5_mnse);
          if (lenguaje == 0 || lenguaje == 1) this.datoAlteracionVisualHC890Q();
          else {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoLenguaje6();
          }
        }
      );
    },

    datoAlteracionVisualHC890Q() {
      validarInputs(
        {
          form: "#datoAlteracionVisualHC890Q",
        },
        () => this.datoLenguaje5(),
        () => {
          let alteracion = (this.ws9013.alteracion_visual.tiene_alt_visual = this.ws9013.alteracion_visual.tiene_alt_visual
            .toUpperCase()
            .trim());

          switch (alteracion) {
            case "S":
            case "N":
              this.ws9013.alteracion_visual.puntua_alt_visual = alteracion == "S" ? "2" : "0";
              this.grabarDetalleHC890Q();
              break;

            default:
              CON851("03", "03", null, "warning", "Advertencia");
              this.datoAlteracionVisualHC890Q();
              break;
          }
        }
      );
    },

    async grabarDetalleHC890Q() {
      loader("show");
      let detalle = {
        9013: _getObjetoSaveHc(this.ws9013),
      };

      console.log(detalle);
      grabarDetalles(detalle, $_REG_HC.llave_hc)
        .then(() => {
          loader("hide");
          CON851("", "Instrumento Minimental grabada con exito!", null, "success", "Exito");
          this.terminar();
        })
        .catch((error) => {
          loader("hide");
          CON851("", "grabando Instrumento Minimental", null, "error", "Error");
          this.datoAlteracionVisualHC890Q();
        });
    },

    salir() {
      this.$emit("callback_esc")
    },

    terminar() {
      this.$emit("callback")
    },
  },

  template: /*html*/ `\
    <div id="HC890Q" class="col-md-12 no-padding">
      <div class="portlet light box-center box-title">
        <div class="portlet-title">
          <div class="caption">
            <span class="caption-subject bold">INSTRUMENTO MINIMENTAL</span>
          </div>
        </div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
        <div class="form-horizontal">
          <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
            <div class="form-group box-center col-md-12">
              <div class="table-HC890Q col-md-12 col-sm-12 col-xs-12 no-padding">
                <div class="header-table-HC890Q col-md-12 col-sm-12 col-xs-12 no-padding">
                  <div class="col-md-1 col-sm-1 col-xs-1 col-header-table-HC890Q">
                    <label>No.</label>
                  </div>
                  <div class="col-md-3 col-sm-2 col-xs-3 col-header-table-HC890Q">
                    <label>Puntaje acumulado</label>
                  </div>
                  <div class="col-md-6 col-sm-7 col-xs-6 col-header-table-HC890Q">
                    <label>ORIENTACIÓN</label>
                  </div>
                  <div class="col-md-2 col-sm-2 col-xs-2 col-header-table-HC890Q">
                    <label>Puntuación</label>
                  </div>
                </div>
                <div class="col md-12 col-sm-12 col-xs-12 no-padding body-table-HC890Q">
                  <div class="col-md-12 col-sm-12 col-xs-12 no-padding row-table-HC890Q">
                    <div class="col-md-1 col-sm-1 col-xs-1 no-padding cell-table-HC890Q">
                      <label>1.</label>
                    </div>
                    <div class="col-md-3 col-sm-2 col-xs-3 no-padding cell-table-HC890Q">
                      <label> {{ puntajeAcuOriFecha }}/5 </label>
                    </div>
                    <div class="col-md-6 col-sm-7 col-xs-6 no-padding row-table-HC890Q" style="border: none !important">
                      <div class="col-md-4 col-sm-4 col-xs-4 no-padding cell-table-HC890Q">
                        <label>Diga en qué</label>
                      </div>
                      <div class="col-md-8 col-sm-8 col-xs-8 no-padding felx-wrap-label-inptus-HC890Q">
                        <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: left">
                          <span>1. Año</span>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: left">
                          <span>2. Mes</span>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: left">
                          <span>3. Día</span>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: left">
                          <span>4. Fecha de hoy (día de la semana)</span>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: left">
                          <span>5. Hora</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding flex-wrap-input-HC890Q">
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoAnioHC890Q" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.orientacion.ano_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 1</label>
                          </div>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoMesHC890Q" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.orientacion.mes_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 1</label>
                          </div>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoDiaHC890Q" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.orientacion.dia_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 1</label>
                          </div>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoDiaSemanaHC890Q" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.orientacion.dia_semana_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 1</label>
                          </div>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoHoraHC890Q" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.orientacion.hora_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 1</label>
                          </div> 
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 col-sm-12 col-xs-12 no-padding row-table-HC890Q">
                    <div class="col-md-1 col-sm-1 col-xs-1 no-padding cell-table-HC890Q">
                      <label>2.</label>
                    </div>
                    <div class="col-md-3 col-sm-2 col-xs-3 no-padding cell-table-HC890Q">
                      <label> {{ puntajeAcuOriLugar }}/5 </label>
                    </div>
                    <div class="col-md-6 col-sm-7 col-xs-6 no-padding row-table-HC890Q" style="border: none !important">
                      <div class="col-md-4 col-sm-4 col-xs-4 no-padding cell-table-HC890Q">
                        <label>Diga en qué</label>
                      </div>
                      <div class="col-md-8 col-sm-8 col-xs-8 no-padding felx-wrap-label-inptus-HC890Q">
                        <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: left">
                          <span>1. País</span>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: left">
                          <span>2. Ciudad</span>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: left">
                          <span>3. Departamento</span>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: left">
                          <span>4. Sitio o lugar</span>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: left">
                          <span>5. Piso/barrio/vereda</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding flex-wrap-input-HC890Q">
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoPaisHC890Q" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.orientacion.pais_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 1</label>
                          </div> 
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoCiudadHC890Q" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.orientacion.ciudad_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 1</label>
                          </div> 
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoDepartamentoHC890Q" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.orientacion.departamento_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 1</label>
                          </div> 
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoLugarHC890Q" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.orientacion.lugar_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 1</label>
                          </div> 
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoBarrioHC890Q" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.orientacion.barrio_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 1</label>
                          </div> 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
            <div class="form-group box-center col-md-12">
              <div class="table-HC890Q col-md-12 col-sm-12 col-xs-12 no-padding">
                <div class="header-table-HC890Q col-md-12 col-sm-12 col-xs-12 no-padding">
                  <div class="col-md-1 col-sm-1 col-xs-1 col-header-table-HC890Q">
                    <label>No.</label>
                  </div>
                  <div class="col-md-3 col-sm-2 col-xs-3 col-header-table-HC890Q">
                    <label>Puntaje acumulado</label>
                  </div>
                  <div class="col-md-6 col-sm-7 col-xs-6 col-header-table-HC890Q">
                    <label>MEMORIA</label>
                  </div>
                  <div class="col-md-2 col-sm-2 col-xs-2 col-header-table-HC890Q">
                    <label>Puntuación</label>
                  </div>
                </div>
                <div class="col md-12 col-sm-12 col-xs-12 no-padding body-table-HC890Q">
                  <div class="col-md-12 col-sm-12 col-xs-12 no-padding row-table-HC890Q">
                    <div class="col-md-1 col-sm-1 col-xs-1 no-padding cell-table-HC890Q">
                      <label>3.</label>
                    </div>
                    <div class="col-md-3 col-sm-2 col-xs-3 no-padding cell-table-HC890Q">
                      <label> {{ ws9013.memoria.memoria_mnse || 0 }}/3 </label>
                    </div>
                    <div class="col-md-6 col-sm-7 col-xs-6 no-padding cell-table-HC890Q">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                        <p style="text-align: left; margin: 0; padding: 1rem">
                          Diga las siguientes palabras <strong>CASA, MESA, ÁRBOL</strong>. Un segundo por cada una.
                          Luego pida a la persona que las repita. Asignándole un punto por cada una. Si en un primer
                          intento no logra repetir las palabras, repítalas hasta que la persona las registre. Anote el
                          número de ensayos requeridos.
                        </p>
                        <div
                          class="col-md-6 col-sm-6 col-xs-6 no-padding"
                          style="
                            display: flex;
                            align-items: center;
                            text-align: left;
                            padding: 0 0 1rem 1rem !important;
                          "
                        >
                          <strong style="margin-right: 0.5rem">Total ensayos:</strong>
                          <div id="datoIntenMemoriaHC890Q" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.memoria.inten_memoria_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="2"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding flex-wrap-input-HC890Q">
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoMemoriaHC890Q" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.memoria.memoria_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 3</label>
                          </div> 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
            <div class="form-group box-center col-md-12">
              <div class="table-HC890Q col-md-12 col-sm-12 col-xs-12 no-padding">
                <div class="header-table-HC890Q col-md-12 col-sm-12 col-xs-12 no-padding">
                  <div class="col-md-1 col-sm-1 col-xs-1 col-header-table-HC890Q">
                    <label>No.</label>
                  </div>
                  <div class="col-md-3 col-sm-2 col-xs-3 col-header-table-HC890Q">
                    <label>Puntaje acumulado</label>
                  </div>
                  <div class="col-md-6 col-sm-7 col-xs-6 col-header-table-HC890Q">
                    <label>ATENCIÓN Y CÁLCULO</label>
                  </div>
                  <div class="col-md-2 col-sm-2 col-xs-2 col-header-table-HC890Q">
                    <label>Puntuación</label>
                  </div>
                </div>
                <div class="col md-12 col-sm-12 col-xs-12 no-padding body-table-HC890Q">
                  <div class="col-md-12 col-sm-12 col-xs-12 no-padding row-table-HC890Q">
                    <div class="col-md-1 col-sm-1 col-xs-1 no-padding cell-table-HC890Q">
                      <label>4.</label>
                    </div>
                    <div class="col-md-3 col-sm-2 col-xs-3 no-padding cell-table-HC890Q">
                      <label> {{ ws9013.atencion_calculo.calculo_mnse || 0 }}/5 </label>
                    </div>
                    <div class="col-md-6 col-sm-7 col-xs-6 no-padding cell-table-HC890Q">
                      <p style="text-align: left; margin: 0; padding: 1rem">
                        Reste <strong>100 -7</strong> en forma sucesiva durante 5 veces. Registre un punto por cada
                        respuesta correcta: <strong>93-86-79-72-65</strong>.En el caso que la persona no sepa restar
                        utilizar la siguiente alternativa: Decir los meses del año al revés:
                        <strong>Diciembre, noviembre, octubre, septiembre, agosto</strong>.
                      </p>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding flex-wrap-input-HC890Q">
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoCalculoHC890Q" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.atencion_calculo.calculo_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 5</label>
                          </div> 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
            <div class="form-group box-center col-md-12">
              <div class="table-HC890Q col-md-12 col-sm-12 col-xs-12 no-padding">
                <div class="header-table-HC890Q col-md-12 col-sm-12 col-xs-12 no-padding">
                  <div class="col-md-1 col-sm-1 col-xs-1 col-header-table-HC890Q">
                    <label>No.</label>
                  </div>
                  <div class="col-md-3 col-sm-2 col-xs-3 col-header-table-HC890Q">
                    <label>Puntaje acumulado</label>
                  </div>
                  <div class="col-md-6 col-sm-7 col-xs-6 col-header-table-HC890Q">
                    <label>EVOCACIÓN</label>
                  </div>
                  <div class="col-md-2 col-sm-2 col-xs-2 col-header-table-HC890Q">
                    <label>Puntuación</label>
                  </div>
                </div>
                <div class="col md-12 col-sm-12 col-xs-12 no-padding body-table-HC890Q">
                  <div class="col-md-12 col-sm-12 col-xs-12 no-padding row-table-HC890Q">
                    <div class="col-md-1 col-sm-1 col-xs-1 no-padding cell-table-HC890Q">
                      <label>5.</label>
                    </div>
                    <div class="col-md-3 col-sm-2 col-xs-3 no-padding cell-table-HC890Q">
                      <label> {{ ws9013.evocacion.evocacion_mnse || 0 }}/3 </label>
                    </div>
                    <div class="col-md-6 col-sm-7 col-xs-6 no-padding cell-table flex-justify-content-start-HC890Q">
                      <p style="text-align: left; margin: 0; padding: 1rem">
                        De las palabras anteriormente mencionadas, diga las palabras que recuerde.
                      </p>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding flex-wrap-input-HC890Q">
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoEvocacionHC890Q" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.evocacion.evocacion_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 3</label>
                          </div> 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
            <div class="form-group box-center col-md-12">
              <div class="table-HC890Q col-md-12 col-sm-12 col-xs-12 no-padding">
                <div class="header-table-HC890Q col-md-12 col-sm-12 col-xs-12 no-padding">
                  <div class="col-md-1 col-sm-1 col-xs-1 col-header-table-HC890Q">
                    <label>No.</label>
                  </div>
                  <div class="col-md-3 col-sm-2 col-xs-3 col-header-table-HC890Q">
                    <label>Puntaje acumulado</label>
                  </div>
                  <div class="col-md-6 col-sm-7 col-xs-6 col-header-table-HC890Q">
                    <label>LENGUAJE</label>
                  </div>
                  <div class="col-md-2 col-sm-2 col-xs-2 col-header-table-HC890Q">
                    <label>Puntuación</label>
                  </div>
                </div>
                <div class="col md-12 col-sm-12 col-xs-12 no-padding body-table-HC890Q">
                  <div class="col-md-12 col-sm-12 col-xs-12 no-padding row-table-HC890Q">
                    <div class="col-md-1 col-sm-1 col-xs-1 no-padding cell-table-HC890Q">
                      <label>6.</label>
                    </div>
                    <div class="col-md-3 col-sm-2 col-xs-3 no-padding cell-table-HC890Q">
                      <label> {{ ws9013.lenguaje.lenguaje1_mnse || 0 }}/2 </label>
                    </div>
                    <div class="col-md-6 col-sm-7 col-xs-6 no-padding cell-table flex-justify-content-start-HC890Q">
                      <p style="text-align: left; margin: 0; padding: 1rem">
                        Mostrar un lápiz y un reloj y preguntar el nombre de los objetos (Denominación)
                      </p>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding flex-wrap-input-HC890Q">
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoLenguaje1" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.lenguaje.lenguaje1_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 2</label>
                          </div> 
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 col-sm-12 col-xs-12 no-padding row-table-HC890Q">
                    <div class="col-md-1 col-sm-1 col-xs-1 no-padding cell-table-HC890Q">
                      <label>7.</label>
                    </div>
                    <div class="col-md-3 col-sm-2 col-xs-3 no-padding cell-table-HC890Q">
                      <label> {{ ws9013.lenguaje.lenguaje2_mnse || 0 }}/1 </label>
                    </div>
                    <div class="col-md-6 col-sm-7 col-xs-6 no-padding cell-table flex-justify-content-start-HC890Q">
                      <p style="text-align: left; margin: 0; padding: 1rem">
                        Hay que pedir que repita la siguiente frase: <i>En el trigal había cinco perros</i>.
                      </p>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding flex-wrap-input-HC890Q">
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoLenguaje2" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.lenguaje.lenguaje2_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 1</label>
                          </div> 
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 col-sm-12 col-xs-12 no-padding row-table-HC890Q">
                    <div class="col-md-1 col-sm-1 col-xs-1 no-padding cell-table-HC890Q">
                      <label>8.</label>
                    </div>
                    <div class="col-md-3 col-sm-2 col-xs-3 no-padding cell-table-HC890Q">
                      <label> {{ ws9013.lenguaje.lenguaje3_mnse || 0 }}/3 </label>
                    </div>
                    <div class="col-md-6 col-sm-7 col-xs-6 no-padding cell-table flex-justify-content-start-HC890Q">
                      <p style="text-align: left; margin: 0; padding: 1rem">
                        Comprensión obedecer una orden en <strong>tres etapas</strong>:A continuación,le voy a dar una
                        orden, escúchela toda y realícela:
                        <strong
                          >Tome esta hoja de papel con su mano derecha, dóblela por la mitad y póngala en el
                          piso</strong
                        >. (De un punto por cada una de las ordenes ejecutadas correctamente).
                      </p>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding flex-wrap-input-HC890Q">
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoLenguaje3" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.lenguaje.lenguaje3_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 3</label>
                          </div> 
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 col-sm-12 col-xs-12 no-padding row-table-HC890Q">
                    <div class="col-md-1 col-sm-1 col-xs-1 no-padding cell-table-HC890Q">
                      <label>9.</label>
                    </div>
                    <div class="col-md-3 col-sm-2 col-xs-3 no-padding cell-table-HC890Q">
                      <label> {{ ws9013.lenguaje.lenguaje4_mnse || 0 }}/1 </label>
                    </div>
                    <div class="col-md-6 col-sm-7 col-xs-6 no-padding cell-table-HC890Q">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding flex-justify-content-start-HC890Q">
                        <p style="text-align: left; margin: 0; padding: 1rem">
                          Para las siguientes dos órdenes utilice una tarjeta u hoja de papel que contenga la frase:
                          “cierre sus ojos”. Indique: <br />
                          <strong>•</strong> Hay que pedirque lea y ejecute lo que dice la frase que contiene la
                          tarjeta. (Lectura)
                        </p>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding flex-wrap-input-HC890Q">
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoLenguaje4" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.lenguaje.lenguaje4_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 1</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 col-sm-12 col-xs-12 no-padding row-table-HC890Q">
                    <div class="col-md-1 col-sm-1 col-xs-1 no-padding cell-table-HC890Q">
                      <label>10.</label>
                    </div>
                    <div class="col-md-3 col-sm-2 col-xs-3 no-padding cell-table-HC890Q">
                      <label> {{ ws9013.lenguaje.lenguaje5_mnse || 0 }}/1 </label>
                    </div>
                    <div class="col-md-6 col-sm-7 col-xs-6 no-padding cell-table flex-justify-content-start-HC890Q">
                      <p style="text-align: left; margin: 0; padding: 1rem">
                        <strong>•</strong> Hay que pedirque escriba la frase que contiene la tarjeta. (Escritura)
                      </p>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding flex-wrap-input-HC890Q">
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoLenguaje5" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.lenguaje.lenguaje5_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 1</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 col-sm-12 col-xs-12 no-padding row-table-HC890Q">
                    <div class="col-md-1 col-sm-1 col-xs-1 no-padding cell-table-HC890Q">
                      <label>11.</label>
                    </div>
                    <div class="col-md-3 col-sm-2 col-xs-3 no-padding cell-table-HC890Q">
                      <label> {{ ws9013.lenguaje.lenguaje6_mnse || 0 }}/1 </label>
                    </div>
                    <div class="col-md-6 col-sm-7 col-xs-6 no-padding cell-table flex-justify-content-start-HC890Q">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                        <p style="text-align: left; margin: 0; padding: 1rem">
                          Indique a la persona que copie el siguiente diseño (dos pentágonos cruzados en un ángulo)
                          (Dibujo):
                        </p>
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAAC5CAIAAAA+mMSzAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAx6SURBVHhe7d19TJV1G8DxM23SwNKFpZlsOqnMBUWzF3XaLLIXmq3UctF6IVk4rIy0ZWKlZptFajhpJKsWzVJr2egpo9woX0qXLRpmybBhzRw2K2WTjZrPFdf1nEfwLRDhvu77+/kLr9/hcM6P++s5BzjnxA4DcIh0AZdIF3CJdAGXSBdwiXQBl0gXcIl0AZdIF3CJdEPoPwg8+1adAtINm0WLFsUQbGeffbZ9t04B6YZKVVWVHR0IMNJFK01NTcOHD9eDY+TIkXMRPMnJyaSLtnJycrTbsWPH2ggBc9FFF5EuWiktLdVue/XqVVNTY1MEDOmilerq6p49e2q6ZWVlNkXwkC5aGTVqlHabm5trIwQS6eL/CgoKtNu0tLTm5mabIpBIF2bVqlXardi4caNNEVSki3/U19frLxtEUVGRTRFgpIt/ZGVlabeTJ0+2EYKNdHF4/vz52m1KSsq+fftsimAj3airrKzUbkVFRYVNEXikexqtWLFiyJAhEyZM+Oqrr2wUMH/++efQoUO128LCQpvCA9I9LdauXXvVVVdpEurBBx+sq6uz5cDIzs7Wi5eZmWkjOEG6nWzTpk3xH/kc7cknnzxw4ICdtLsVFxfrpTrrrLNqa2ttCidIt9Ps3Lnz/vvv1xjUyJEjP/zww+eff7537942isWSk5Nfeukl+5zus3XrVrtAsVh5eblN4QfpdoLff/991qxZmoFKTU19/fXXbfnw4d9+++2xxx6ztRbDhg178803bbk7jBgxQi/J9OnTbQRXSPdUvfDCC3379tUMRJ8+fWRia63t2LHjnnvusdO1GDNmzMcff2zLXSg/P18vgARsI3hDuh0nt6sXXnihNqBmzpwpt8C2fBxffPHFjTfeaJ/Q4o477vj6669t+fSTu8f2hWMxudtsU3hDuh0hj2Djz7BR9913nzzWteV/4d13373iiivsk1s89NBD9fX1tnzayIWMP/BetmyZTeEQ6bbPli1bbrvtNj301S233LJp0yZbbqdXXnklJSXFzigW69GjR2Fh4aFDh2z5NMjMzNSvlZ2dbSP4RLr/1q5du6ZOnarHvbryyivXrl1ryx31999/z58//8wzz7QzjcX69+//8ssv23KnmjNnjn6J1NTU4PyOCh1Duid38ODB2bNn60GvBg8evGLFClvuDHv37n344Yft3FtceumlK1eutOXOUFFRYWcdi1VWVtoUbpHuSSxevLhfv356xIukpKSFCxfaWmf77rvvpkyZYl+pxbhx4z799FNbPgUNDQ3xe+YLFiywKTwj3eMqLy+/5JJL9HBXM2bM6IIn1qxfv/7666+3L9nizjvv/Pbbb225QyZNmqRnlZWVZSM4R7rHsG7durFjx+qxrrKzs7///ntb7hLvvPNOenq6ffkW+fn5e/bsseX2KCoq0nNITk7ugh9io2uQbivbtm2bOHGiHuhq/Pjxn3/+uS13uWXLlp1//vl2UVpeXfXZZ59t16tGbdiwwT45Flu9erVN4R/pmt27d+fl5ekhrjIyMtasWWPL3aepqenpp58+44wz7GLFYhdccMHy5ctt+YQk8rS0NP2sgoICmyIUSPfwoUOH5s6dG3/xYTFo0KCSkhJbDoaff/552rRpdvlaXH755Se9FY3/Nmv06NE2QlhEPd3i4uIBAwbo8S0SEhLmzZv3119/2XLAfPPNN/EfOKkbbrihqqrKllsrKyvT08j/StXV1TZFWEQ33bfffjt+Z1JNnz79119/teUA++STT6699lq70C3uvvvu7du323KLmpoaeWCsq6WlpTZFiEQx3c8+++y6667Tw1rddddd7m6X3nrrrfib8alHH320oaFBV8eMGaPDnJwcnSBkopWu9CmV6jGtpGEp2ZYdWrJkybnnnmtXJhZLTEx87rnn4k8elrabmprspAiXqKS7Z88euT+sB7SSe8tyn9mWPWtsbHzqqafsWrXWjb/WwukW/nSbm5vnzZuXkJCgR7MYMGBAcXGxLYfFTz/9lJuba9ewxaBBg95//31bRuiEPN2SkhI5gvVQFj169Jg7d+5pfVZd92rzR2Di5ptv5g2EQim06a5ZsyYjI0MPX5WXl7d7925bDqOFCxfqNT3nnHPavJTsvffe++OPP9rpEAohTLeqqmr8+PF6yKqJEydu27bNlkNq/fr1dm1jMX0W8RtvvKHf3biZM2fu379fTw/vQpXu9u3b468JruQO5Lp162w5vBobG+OVzp4926YtXnzxxSNf9U6+04sWLbI1eBaSdBsaGmbMmKFHpxo2bFh0Xl5Y7g/rtR43bpyNjvDHH3888cQTegI1dOjQ1157zZbhUxjSlcd4SUlJelCK5OTkxYsX21oELF++XK94YmLiDz/8YNOj1NbWPvDAA3pKdc011/D+YH75TvfVV18dPHiwHohK7i4ePHjQliNAHsPbNY/F5MGtTY9v8+bNt956q31CiyC/mxlOwGu6Bw4caPND1KlTp+7atcuWI+Pqq6/Wqz9t2jQb/QsffPDB0e9mZmtwwnG6eswJud3YsmWLLUTJI488ojuQkZFho/YoKyuLv2DV7bffblM44T7d9PR0G0XMypUrdQfEl19+adN2qq+v13MgXXfcp3vMn6mGXl1dXZ8+fXQHli5datP2I12/SNel+LsWTZkyxUYdQrp+ka4/mzdv1usu5PGqTTuEdP0iXZeWLFmiV79v376n8nN10vWLdL2Kv2bATTfdZKP2I12/SNer/fv3x/8c5ZlnnrFpO5GuX6Tr2EcffaSbIDr27vik6xfp+ia3t7oPQ4YM6cAT+kjXL9J171R+UUS6fpGue3V1dfFn5Lb3zzNI1y/SDYMO/1Ek6fpFuiHRsacikK5fpBse8ScA5uXl2ehkSNcv0g2P9j7tXpCuX6QbKiUlJbotiYmJO3bssOnxka5fpBs2J36JuTZI1y/SDZvGxsaLL75YN6fNC7sejXT9It0QOvrl1I+HdP0i3XCKv4nJwIED9+7da9OjkK5fpBtaEyZM0C06QZak6xfphtYvv/xy3nnn6S4d781KSNcv0g2z9957T3dJVFVV2fQIpOsX6YbcrFmzdKOGDx/e1NRk0/8hXb9IN/zi75edk5Njo/8hXb9IN/xqamp69eql21VaWmrTFqTrF+lGQllZmW5Xz549q6urbUq6npFuVOTm5uqOjRo1ykak6xnpRkVzc3NaWppuWkFBgQ5J1y/SjZCNGzfqpolVq1bJhHT9It1oKSoq0n1LTk6WbknXL9KNnMmTJ+vWZWVlka5fpBs5+/bti78j9uOPP64fkK47pBtFFRUVuntxpOsO6UZUYWGhbqAiXXdIN7oyMzN1DwXpukO60VVbW5uUlKTbmJ6eblM4QbqRtnTpUt1GsXXrVpvCA9KNtPgvh8SIESNsCg9IN9KOTFfk5+fbAgKPdCOtTbqivLzc1hBspBtp8XQvu+wy/aB37947d+60ZQQY6UbakX8ImZ2drR9nZmbaMgKMdCPtyHRlS1NTU/Wfc+bMsVMgqEg30o5MV/5ZWVmp/xQVFRV6GgQT6UZam3TFggULdJKSktLQ0KBDBBDpRtrR6YqsrCwdTpo0yUYIHtKNtGOmK8N+/frpvKioyKYIGNKNtGOmK1avXq1zsWHDBpsiSEg30o6XrigoKNAl0QPBo98a0o2oE6QrRo8erasILNKNqBOnW11dnYHAs+/WKSBdf06cLiKCdP0hXQjS9Yd0IUjXH9KFIF1/SBeCdP0hXQjS9Yd0IUjXH9KFIF1/SBeCdP0hXQjS9Yd0IUjXH9KFIF1/SBeCdP0hXQjS9Yd0IUjXH9KFIF1/SBeCdP0hXQjS9Yd0IUjXH9KFIF1/SBeCdP0hXQjS9Yd0IUjXH9KFIF1/SBeCdP0hXQjS9Yd0IUjXH9KFIF1/SBeCdP0hXQjS9Yd0IUjXH9KFIF1/SBeCdP0hXQjS9Yd0IUjXH9KFIF1/SBeCdP0hXQjS9Yd0IUjXH9KFIF1/SBeCdP0hXQjS9Yd0IUjXH9KFIF1/SBeCdP0hXQjS9Yd0IUjXH9KFIF1/SBeCdP0hXQjS9Yd0IUjXH9KFIF1/SBeCdP0hXQjS9Yd0IUjXH9KFIF1/SBeCdP0hXQjS9Yd0IUjXH9KFIF1/SBeCdP0hXQjS9Yd0IUjXH9KFIF1/SBeie9JNSEhIQUcNHDhQt5F0o6x70kWnIN0o6+p0+6PzkG6UdWm6ADoL6QIukS7gEukCLpEu4BLpAi6RLuAS6QIukS7gEukCDh0+/F8EnNCwC+TX0QAAAABJRU5ErkJggg=="
                          alt="dos pentágonos cruzados en un ángulo"
                          width="30%"
                        />
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding flex-wrap-input-HC890Q">
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div id="datoLenguaje6" class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="ws9013.lenguaje.lenguaje6_mnse"
                              type="number"
                              class="form-control"
                              data-orden="1"
                              maxlength="1"
                              disabled
                              style="text-align: center"
                            />
                          </div>
                          <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                            <label>/ 1</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 col-sm-12 col-xs-12 no-padding row-table-HC890Q">
                    <div class="col-md-1 col-sm-1 col-xs-1 no-padding cell-table-HC890Q">
                      <label>&nbsp;</label>
                    </div>
                    <div class="col-md-3 col-sm-2 col-xs-3 no-padding cell-table-HC890Q">
                      <label> {{ acumulado || 0}}/30 </label>
                    </div>
                    <div class="col-md-6 col-sm-7 col-xs-6 no-padding cell-table-HC890Q">
                      <label>SUMATORIA PUNTAJE FINAL</label>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-2 no-padding cell-table-HC890Q">
                      <div class="col-md-12 col-sm-12 col-xs-12 no-padding flex-wrap-input-HC890Q">
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                          <div class="input-group col-md-4 col-sm-6 col-xs-8">
                            <input
                              v-model="puntajeTotalMinimental"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
            <div class="form-group box-center col-md-12">
              <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-6 flex-wrap-HC890Q">
                  <label class="col-lg-8 col-md-8 col-sm-8 col-xs-12" style="text-align: left"
                    >Alteración visual evidente (+2)</label
                  >
                  <div id="datoAlteracionVisualHC890Q" class="input-group col-lg-2 col-md-4 col-sm-4 col-xs-4">
                    <input
                      v-model="ws9013.alteracion_visual.tiene_alt_visual"
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
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-6 flex-wrap-HC890Q">
                  <label class="col-lg-8 col-md-8 col-sm-8 col-xs-12" style="text-align: left"
                    >Mayor de 65 años (+1)</label
                  >
                  <div class="input-group col-lg-2 col-md-4 col-sm-4 col-xs-4">
                    <input
                      v-model="descripMayor65"
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
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-6 flex-wrap-HC890Q">
                  <label class="col-lg-8 col-md-8 col-sm-8 col-xs-12" style="text-align: left"
                    >Mayor de 75 años (+2)</label
                  >
                  <div class="input-group col-lg-2 col-md-4 col-sm-4 col-xs-4">
                    <input
                      v-model="descripMayor75"
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
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-6 flex-wrap-HC890Q">
                  <label class="col-lg-8 col-md-6 col-sm-6 col-xs-12" style="text-align: left"
                    >Nivel de estudios</label
                  >
                  <div class="input-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <input
                      v-model="descripNivelEdu"
                      type="text"
                      class="form-control"
                      disabled
                      style="text-align: center"
                    />
                  </div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 flex-wrap-HC890Q">
                  <p style="text-align: left; margin: 0;">{{ descripDeterioroCognoscitivo }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
});
