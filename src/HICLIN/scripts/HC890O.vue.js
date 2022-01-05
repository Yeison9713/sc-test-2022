module.exports = Vue.component("content_hc890O", {
  props: {
    params: {},
    data: {},
  },
  data() {
    return {
      tacto: this.data,

      textos: {
        descrip_rectal: '',
      },

      respuesta: [
        { COD: "1", DESCRIP: "SI" },
        { COD: "2", DESCRIP: "NO" },
        { COD: "3", DESCRIP: "NO APLICA" },
      ],
    };
  },
  watch: {
    "params.estado": function (estado) {
      if (estado)
        setTimeout(() => {
          this.validarPracticoTacto();
        }, 400);
    },

    'textos.descrip_nota_rectal': function (val) {
      this.textos.descrip_nota_rectal = val ? val.replaceEsp() : ''
    },
  },
  created() {
    // _inputControl("reset");
    // $this = this;
  },
  methods: {
    validarPracticoTacto() {
      POPUP(
        {
          titulo: "Se practico tacto rectal?",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.respuesta,
          seleccion: this.tacto.tacto_rectal,
          callback_f: () => this._escape(),
        },
        (data) => {
          this.tacto.tacto_rectal = data.COD;
          this.textos.descrip_rectal = data.DESCRIP;
          this.datoNotaTactoRectal();
        }
      );
    },
    datoNotaTactoRectal() {
      if (this.tacto.tacto_rectal != '2') {
        this._terminar();
      } else {
        validarInputs(
          {
            form: "#nota_tacto_rectal",
            orden: "1",
          },
          () => {
            this.validarPracticoTacto();
          },
          () => {
            this.tacto.nota_tacto_rectal = this.tacto.nota_tacto_rectal.toUpperCase();
            var temp = this.tacto.nota_tacto_rectal;

            if (temp.trim() != '') {
              // continue
              this._terminar();
            } else {
              CON851('03', '03', null, 'error', 'error')
              this.datoNotaTactoRectal()
            }
          }
        );
      }
    },

    _escape() {
      this.$emit("callback_esc");
    },
    _terminar() {
      this.$emit("callback", this.tacto);
    },

  },
  template: /*html*/ ` 
  <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
    <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">

      <div class="col-md-12 col-sm-12 col-xs-12 head-box"
        style="display: flex; justify-content: center; padding-right: 0; padding-left: 0">
        <label>Tacto Rectal</label>
      </div>

      <div class="inline-inputs col-md-12">
        <label class="col-md-5" style="background: 0; text-align: left;">Se practico tacto rectal:</label>
        <div class="input-group col-md-4" id='descrip_rectal'>
          <input v-model="textos.descrip_rectal" type="text"
          class="form-control col-md-12 text-center uppercase" required="true"
          data-orden="1" maxlength="20" disabled="disabled">
        </div class="input-group col-md-3">
        <div>
        </div>
      </div>

      <div class="salto-linea"></div>

      <div class="inline-inputs col-md-12">
        <label class="col-md-2" style="background: 0; text-align: left;">Nota:</label>
        <div class="input-group col-md-10" id='nota_tacto_rectal'>
          <input v-model="tacto.nota_tacto_rectal" type="text"
          class="form-control col-md-12 text-left uppercase"
          data-orden="1" maxlength="50" disabled="disabled">
        </div>
      </div>
    
    </div>
  </div>
`,
});
