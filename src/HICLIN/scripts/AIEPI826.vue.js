// COMPONENTE AIEPI826 CUESTIONARIO DE ACTIVIDADES

var component_AIEPI826 = Vue.component("AIEPI826", {
  props: {
    params: {},
  },
  data() {
    return {
      AIEPI826: {
        titulo: "",
        cuestionario: ['','','','','','','',''],
      },
      respuestas: this.params.respuestas,
      resultado: 0,
      stylesAIEPI826: {
        flexRow: {
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
        },
      },
    };
  },
  watch: {
    "params.paso": function (paso) {
      if (paso) this.getCuestionario(paso);
    },
  },
  computed: {
    obtenerTitulo() {
      return this.params.paso == 2 ? this.AIEPI826.titulo + " del rango anterior !" : this.AIEPI826.titulo;
    },
  },
  created() {
    _comp = this;

    this.AIEPI826 = _AIEPI830(1, this.params.edad);
      console.log(this.AIEPI826);
  },
  methods: {
    calcularActividad() {
      this.resultado = 0
      console.log('entra')
      this.respuestas.forEach((el) => {
        if (el == "S") this.resultado += 1;
      });
    },
    async getCuestionario(paso) {
      this.AIEPI826 = await _AIEPI830(paso, this.params.edad);
      console.log(this.AIEPI826);

      this.validarResp(0);
    },
    validarResp(index) {
      validarInputs(
        {
          form: `#resp${index}`,
          orden: "1",
        },
        () => {
          if (index == 0) {
            this.salir();
          } else {
            this.validarResp(--index);
          }
        },
        () => {
          let local = this.respuestas[index].toUpperCase().trim() == "S" ? "S" : "N";
          Vue.set(this.respuestas, index, local);

          this.calcularActividad()

          if (index < this.AIEPI826.cuestionario.length - 1) {
            this.validarResp(++index);
          } else this.terminar();
        }
      );
    },

    salir() {
      console.log("salir componente");
      this.$emit("callback_esc");
    },

    async terminar() {
      console.log("termino componente");
      this.$emit("callback", this.respuestas, this.resultado, this.AIEPI826.cuestionario.length);
    },
  },
  template:
    /*html*/ '\
    <div class="col-md-12 no-padding">\
      <div class="col-md-12 no-padding">\
        <div class="form-horizontal">\
          <div class="col-md-12 form-horizontal form-group box-center">\
            <span class="caption-subject bold">{{ obtenerTitulo }}</span>\
            <div class="col-md-12 col-sm-12 col-xs-12 no-padding">\
              <div\
                v-for="(cuest, index) in AIEPI826.cuestionario"\
                :key="index"\
                class="col-md-12 col-sm-12 col-xs-12"\
              >\
                <div class="col-md-12 col-sm-12 col-xs-12 form-group no-padding" :style="stylesAIEPI826.flexRow">\
                  <div\
                    class="col-md-11 col-sm-11 col-xs-10 no-padding"\
                    style="text-align: left"\
                  >\
                    <label class="col-md-12 col-sm-12 col-xs-12">\
                      {{ cuest }}</label\
                    >\
                  </div>\
                  <div class="col-md-1 col-sm-1 col-xs-2 no-padding">\
                    <div\
                      :id="`resp${index}`"\
                      class="input-group col-md-12 col-sm-12 col-xs-12 no-padding"\
                    >\
                      <input\
                        v-model="respuestas[index]"\
                        class="form-control"\
                        type="text"\
                        placeholder="N"\
                        maxlength="1"\
                        data-orden="1"\
                        disabled\
                        style="text-align: center"\
                      />\
                    </div>\
                  </div>\
                </div>\
              </div>\
            </div>\
            <div class="col-md-12">\
              <span>Actividades para su edad {{ resultado }} / {{ AIEPI826.cuestionario.length }}</span>\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>\
  ',
});
