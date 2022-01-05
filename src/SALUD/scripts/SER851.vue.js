module.exports = Vue.component("SER851", {
  props: {
    datos: {},
  },
  data() {
    return {
      enfer: {
        inicial: "",
        general: "",
      },
      data_table: {
        columns: [
          { label: "CÓDIGO", value: "cod", class: ["col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center"], class_cell: ["col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center"], style: {} },
          { label: "DESCRIPCIÓN", value: "descrip", class: ["col-xs-10 col-sm-10 col-md-10 col-lg-10 text-center"], class_cell: ["col-xs-10 col-sm-10 col-md-10 col-lg-10 text-left"], style: {} },
        ],
        rows: [],
      },
      pag_table: 0,
      events_table: {},
      focus_table: false,
    };
  },
  components: {
    "sc-data-table": require("../../frameworks/scripts/SC-DATA-TABLE.vue"),
  },
  watch: {},
  computed: {},
  created() {
    this.datoInicial();
  },
  mounted() {
    this.events_table = {
      enter: (data) => {
        console.log("enter", data);
        this.focus_table = false;
        setTimeout(() => this.$emit("callback", data), 100);
      },
      esc: () => {
        this.focus_table = false;
        this.pag_table = 0;
        if (this.enfer.inicial.trim() == "") this.datoGeneral();
        else this.datoInicial();
      },
      back_pag: () => {
        if (this.pag_table > 0) {
          this.getDatosEnfer(--this.pag_table);
        }
      },
      next_pag: () => {
        this.getDatosEnfer(++this.pag_table);
      },
      focus: (data) => {
        console.log(data);
        this.focus_table = data;
      },
    };
  },
  methods: {
    datoInicial() {
      validarInputs(
        {
          form: "#datoInicial",
        },
        () => {
          this.$emit("callback_esc");
        },
        () => {
          this.enfer.inicial = this.enfer.inicial.trim().toUpperCase();
          if (this.enfer.inicial.trim() == "") this.datoGeneral();
          else this.getDatosEnfer();
        }
      );
    },
    datoGeneral() {
      validarInputs(
        {
          form: "#datoGeneral",
        },
        () => {
          this.datoInicial();
        },
        () => {
          this.enfer.general = this.enfer.general.trim().toUpperCase();
          this.getDatosEnfer();
        }
      );
    },
    getDatosEnfer(pag) {
      this.focus_table = false;
      pag = pag || 0;

      let datos_envio = {
        datosh: datosEnvio(),
        paginacion: pag,
        inicial: this.enfer.inicial,
        general: this.enfer.general,
      };
      loader("show");
      postData(datos_envio, get_url("APP/SALUD/GET_ENFER_F8.DLL"))
        .then((data) => {
          loader("hide");
          if (data.REG_ENFER.length) {
            this.data_table.rows = data.REG_ENFER;
            this.focus_table = true;
          } else if (this.pag_table == 0) {
            CON851("", "No se encontraron coincidencias", null, "warning", "");
            if (this.enfer.inicial.trim() == "") this.datoGeneral();
            else this.datoInicial();
          } else {
            CON851("", "No se encontraron más registros", null, "warning", "");
            --this.pag_table;
            this.focus_table = true;
          }
        })
        .catch((err) => {
          loader("hide");
          console.error("Ha ocurrido un error consultando enfermedades: ", err);
          CON851("", "Ha ocurrido un error consultando enfermedades", null, "error", "Error");
          if (this.enfer.inicial.trim() == "") this.datoGeneral();
          else this.datoInicial();
        });
    },
  },
  template: /*html*/ `
  <transition>
    <div class="modal-mask" id="SER851">
      <div class="modal-wrapper">
        <div
          class="modal-container col-lg-8 col-md-10 col-sm-10 col-xs-10"
        >
          <div class="col-12 no-padding">
            <div class="portlet light box-center box-title">
              <div class="portlet-title">
                <div class="caption" style="width: 100%;">
                  <span class="caption-subject bold">
                    VENTANA DE ENFERMEDADES
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding"
            style="height: 100%; overflow: hidden;"
          >
            <div class="col-12 flex-container">
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="form-group box-center col-12 flex-inputs">
                  <label
                    class="label-center col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    Inicial
                  </label>
                  <div
                    id="datoInicial"
                    class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    <input
                      v-model="enfer.inicial"
                      type="text"
                      class="form-control center"
                      data-orden="1"
                      maxlength="15"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="form-group box-center col-12 flex-inputs">
                  <label
                    class="label-center col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    General
                  </label>
                  <div
                    id="datoGeneral"
                    class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    <input
                      v-model="enfer.general"
                      type="text"
                      class="form-control center"
                      data-orden="1"
                      maxlength="12"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 flex-container" style="padding: 0.5rem;">
              <sc-data-table
                :data_table="data_table"
                :focus_table="focus_table"
                :events="events_table"
              ></sc-data-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
    `,
});
