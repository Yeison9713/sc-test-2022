// COMPONENTE AIEPI845B ALTERACIONE FENOTIPICAS - PROBLEMAS DE DESARROLLO

module.exports = Vue.component("AIEPI845B", {
  props: {
    params: {},
    data: {},
  },
  data() {
    return {
      AIEPI845B: this.data,

      arrayLabels: [
        { COD: "S", DESCRIP: "Si" },
        { COD: "N", DESCRIP: "No" },
        { COD: "I", DESCRIP: "Ignora" },
      ],

      stylesAIEPI845B: {
        flexRow: {
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
          textAlign: "left",
        },
        flexGroupInput: {
          display: "flex",
          alignItems: "center",
          textAlign: "left",
        },
      },
    };
  },
  created() {
    _comp = this;
  },
  watch: {
    "params.estado": function (estado) {
      if (estado) this.datoProbEmba();
    },
  },
  methods: {
    datoProbEmba() {
      validarInputs(
        {
          form: "#datoProbEmba",
        },
        () => {
          this.salir();
        },
        () => {
          this.AIEPI845B.des_prob_embar = this.validarRespuesta(this.AIEPI845B.des_prob_embar);
          this.datoProbParto();
        }
      );
    },
    datoProbParto() {
      validarInputs(
        {
          form: "#datoProbParto",
        },
        () => {
          this.datoProbEmba();
        },
        () => {
          this.AIEPI845B.des_prob_parto = this.validarRespuesta(this.AIEPI845B.des_prob_parto);
          this.datoProbSalud();
        }
      );
    },
    datoProbSalud() {
      validarInputs(
        {
          form: "#datoProbSalud",
        },
        () => {
          this.datoProbParto();
        },
        () => {
          this.AIEPI845B.des_prob_salud = this.validarRespuesta(this.AIEPI845B.des_prob_salud);
          this.datoProbParientes();
        }
      );
    },
    datoProbParientes() {
      validarInputs(
        {
          form: "#datoProbParientes",
        },
        () => {
          this.datoProbSalud();
        },
        () => {
          this.AIEPI845B.des_prob_paren = this.validarRespuesta(this.AIEPI845B.des_prob_paren);
         this.datoProbDisc();
        }
      );
    },
    datoProbDisc() {
      validarInputs(
        {
          form: "#datoProbDisc",
        },
        () => {
          this.datoProbParientes();
        },
        () => {
          this.AIEPI845B.des_prob_disca = this.validarRespuesta(this.AIEPI845B.des_prob_disca);
          this.datoProbDesar();
        }
      );
    },
    datoProbDesar() {
      validarInputs(
        {
          form: "#datoProbDesar",
        },
        () => {
          this.datoProbDisc();
        },
        () => {
          this.AIEPI845B.des_prob_desar = this.validarRespuesta(this.AIEPI845B.des_prob_desar);
          this.terminar();
        }
      );
    },
    validarRespuesta(dato) {
      dato = dato.trim().toUpperCase();

      switch (dato) {
        case "S":
        case "N":
        case "I":
          return dato;
        default:
          return "N";
      }
    },
    salir() {
      this.$emit("callback_esc");
    },

    async terminar() {
      this.$emit("callback", this.AIEPI845B);
    },
  },
  template: /*html*/ `
  <div class="form-horizontal">
    <div class="col-md-12 form-horizontal form-group box-center">
      <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
        <div class="col-md-12 col-sm-12 col-xs-12">

          <div
            class="col-md-12 col-sm-12 col-xs-12 form-group no-padding" style="text-align: center; padding: 1rem 0 1rem 0 !important"
          >
            <label class="col-md-12 col-sm-12 col-xs-12">
              Opciones de respuesta: S = Si, N = No, I = Ignora </label
            >
          </div>

          <div
            class="col-md-12 col-sm-12 col-xs-12 form-group no-padding" :style="stylesAIEPI845B.flexRow"
          >
            <label class="col-md-11 col-sm-10 col-xs-10">
              Hubo problemas en el embarazo ?</label
            >

            <div class="col-md-1 col-sm-2 col-xs-2 no-padding" :style="stylesAIEPI845B.flexGroupInput">
              <div
                id="datoProbEmba"
                class="input-group col-md-12 col-sm-12 col-xs-12 no-padding"
              >
                <input
                  v-model="AIEPI845B.des_prob_embar"
                  class="form-control"
                  type="text"
                  placeholder="N"
                  maxlength="1"
                  data-orden="1"
                  disabled
                  style="text-align: center"
                />
              </div>
            </div>
          </div>

          <div
            class="col-md-12 col-sm-12 col-xs-12 form-group no-padding" :style="stylesAIEPI845B.flexRow"
          >
            <label class="col-md-11 col-sm-10 col-xs-10">
              Hubo problemas en el parto ?</label
            >

            <div class="col-md-1 col-sm-2 col-xs-2 no-padding" :style="stylesAIEPI845B.flexGroupInput">
              <div
                id="datoProbParto"
                class="input-group col-md-12 col-sm-12 col-xs-12 no-padding"
              >
                <input
                  v-model="AIEPI845B.des_prob_parto"
                  class="form-control"
                  type="text"
                  placeholder="N"
                  maxlength="1"
                  data-orden="1"
                  disabled
                  style="text-align: center"
                />
              </div>
            </div>
          </div>

          <div
            class="col-md-12 col-sm-12 col-xs-12 form-group no-padding" :style="stylesAIEPI845B.flexRow"
          >
            <label class="col-md-11 col-sm-10 col-xs-10">
              Ha tenido problemas graves de salud ?</label
            >

            <div class="col-md-1 col-sm-2 col-xs-2 no-padding" :style="stylesAIEPI845B.flexGroupInput">
              <div
                id="datoProbSalud"
                class="input-group col-md-12 col-sm-12 col-xs-12 no-padding"
              >
                <input
                  v-model="AIEPI845B.des_prob_salud"
                  class="form-control"
                  type="text"
                  placeholder="N"
                  maxlength="1"
                  data-orden="1"
                  disabled
                  style="text-align: center"
                />
              </div>
            </div>
          </div>

          <div
            class="col-md-12 col-sm-12 col-xs-12 form-group no-padding" :style="stylesAIEPI845B.flexRow"
          >
            <label class="col-md-11 col-sm-10 col-xs-10">
              La madre y el padre son parientes ?</label
            >

            <div class="col-md-1 col-sm-2 col-xs-2 no-padding" :style="stylesAIEPI845B.flexGroupInput">
              <div
                id="datoProbParientes"
                class="input-group col-md-12 col-sm-12 col-xs-12 no-padding"
              >
                <input
                  v-model="AIEPI845B.des_prob_paren"
                  class="form-control"
                  type="text"
                  placeholder="N"
                  maxlength="1"
                  data-orden="1"
                  disabled
                  style="text-align: center"
                />
              </div>
            </div>
          </div>

          <div
            class="col-md-12 col-sm-12 col-xs-12 form-group no-padding" :style="stylesAIEPI845B.flexRow"
          >
            <label class="col-md-11 col-sm-10 col-xs-10">
              Alguien en la familia con problema mental o
              fisico ?</label
            >

            <div class="col-md-1 col-sm-2 col-xs-2 no-padding" :style="stylesAIEPI845B.flexGroupInput">
              <div
                id="datoProbDisc"
                class="input-group col-md-12 col-sm-12 col-xs-12 no-padding"
              >
                <input
                  v-model="AIEPI845B.des_prob_disca"
                  class="form-control"
                  type="text"
                  placeholder="N"
                  maxlength="1"
                  data-orden="1"
                  disabled
                  style="text-align: center"
                />
              </div>
            </div>
          </div>

          <div
            class="col-md-12 col-sm-12 col-xs-12 form-group no-padding" :style="stylesAIEPI845B.flexRow"
          >
            <label class="col-md-11 col-sm-10 col-xs-10">
              Al preguntarle a la madre: donde esta la mayor parte del
              tiempo ?, se consideraria un factor de riesgo ?</label
            >

            <div class="col-md-1 col-sm-2 col-xs-2 no-padding" :style="stylesAIEPI845B.flexGroupInput">
              <div
                id="datoProbDesar"
                class="input-group col-md-12 col-sm-12 col-xs-12 no-padding"
              >
                <input
                  v-model="AIEPI845B.des_prob_desar"
                  class="form-control"
                  type="text"
                  placeholder="N"
                  maxlength="1"
                  data-orden="1"
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
  `,
});
