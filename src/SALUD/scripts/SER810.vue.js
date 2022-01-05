module.exports = Vue.component("SER810", {
  props: {
    datos: {},
  },
  data() {
    return {
      paci: {
        _1er_apel: "",
        _2do_apel: "",
        nombre: "",
      },
      mostrarTabla: false,
      registroEscogido: {},

      data_table: {
        columns: [
          { label: "1ER APELLIDO", value: "_1er_apel", class: ["text-center"], class_cell: [], style: {} },
          { label: "2DO APELLIDO", value: "_2do_apel", class: ["text-center"], class_cell: [] },
          { label: "1ER NOMBRE", value: "_1er_nom", class: ["text-center"], class_cell: [] },
          { label: "2DO NOMBRE", value: "_2do_nom", class: ["text-center"], class_cell: [] },
          { label: "DOCUMENTO", value: "cod", class: ["text-center"], class_cell: [] },
          { label: "EPS", value: "eps", class: ["text-center"], class_cell: [] },
          { label: "EDAD", value: "edad", class: ["text-center"], class_cell: [] },
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
    // this.mostrarTabla = true;
    this.datoPrimerApelPaci();
  },
  mounted() {
    let _this = this
    this.events_table = {
      enter: (data) => {
        this.focus_table = false;
        // this.mostrarTabla = false
        setTimeout(() => this.$emit("callback", data), 100);
      },
      esc: () => {
        this.focus_table = false;
        this.pag_table = 0;
        this.datoNombrePaci();
      },
      back_pag: () => {
        if (_this.pag_table > 0) {
          this.getDatosPaci(--_this.pag_table);
        }
      },
      next_pag: () => {
        this.getDatosPaci(++_this.pag_table);
      },
      focus: (data) => {
        console.log(data);
        this.focus_table = data;
      },
    };
  },
  methods: {
    datoPrimerApelPaci() {
      validarInputs(
        {
          form: "#datoPrimerApelPaci",
        },
        () => {
          this.mostrarTabla = false;
          this.$emit("callback_esc");
        },
        () => {
          this.paci._1er_apel = this.paci._1er_apel.trim().toUpperCase();
          this.datoSegundoApelPaci();
        }
      );
    },
    datoSegundoApelPaci() {
      validarInputs(
        {
          form: "#datoSegundoApelPaci",
        },
        () => {
          this.datoPrimerApelPaci();
        },
        () => {
          this.paci._2do_apel = this.paci._2do_apel.trim().toUpperCase();
          this.datoNombrePaci();
        }
      );
    },
    datoNombrePaci() {
      validarInputs(
        {
          form: "#datoNombrePaci",
        },
        () => {
          this.datoSegundoApelPaci();
        },
        () => {
          this.paci.nombre = this.paci.nombre.trim().toUpperCase();
          this.getDatosPaci();
        }
      );
    },
    getDatosPaci(pag) {
      this.focus_table = false;
      pag = pag || 0;

      let datos_envio = {
        datosh: datosEnvio(),
        paginacion: pag,
        _1er_apel: this.paci._1er_apel,
        _2do_apel: this.paci._2do_apel,
        nombre: this.paci.nombre,
      };
      loader("show");
      postData(datos_envio, get_url("APP/SALUD/GET_PACI_F8.DLL"))
        .then((data) => {
          loader("hide");
          if (data.REG_PACI.length) {
            this.data_table.rows = data.REG_PACI;
            this.focus_table = true;
          } else if (this.pag_table == 0) {
            CON851("", "No se encontraron coincidencias", null, "warning", "");
            this.datoNombrePaci();
          } else {
            CON851("", "No se encontraron más registros", null, "warning", "");
            --this.pag_table;
            this.focus_table = true;
          }
        })
        .catch((err) => {
          loader("hide");
          console.error("Ha ocurrido un error consultando pacientes: ", err);
          CON851("", "Ha ocurrido un error consultando pacientes", null, "error", "");
          this.datoNombrePaci();
        });
    },
  },
  template: /*html*/ `
  <transition>
    <div class="modal-mask" id="SER810">
      <div class="modal-wrapper">
        <div
          class="modal-container col-lg-8 col-md-10 col-sm-10 col-xs-10"
        >
          <div class="col-12 no-padding">
            <div class="portlet light box-center box-title">
              <div class="portlet-title">
                <div class="caption" style="width: 100%;">
                  <span class="caption-subject bold">
                    VENTANA DE PACIENTES
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
              <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                <div class="form-group box-center col-12 flex-inputs">
                  <label
                    class="label-center col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    Primer apellido
                  </label>
                  <div
                    id="datoPrimerApelPaci"
                    class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    <input
                      v-model="paci._1er_apel"
                      type="text"
                      class="form-control center"
                      data-orden="1"
                      maxlength="15"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                <div class="form-group box-center col-12 flex-inputs">
                  <label
                    class="label-center col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    Segundo apellido
                  </label>
                  <div
                    id="datoSegundoApelPaci"
                    class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    <input
                      v-model="paci._2do_apel"
                      type="text"
                      class="form-control center"
                      data-orden="1"
                      maxlength="15"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                <div class="form-group box-center col-12 flex-inputs">
                  <label
                    class="label-center col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    Nombre
                  </label>
                  <div
                    id="datoNombrePaci"
                    class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    <input
                      v-model="paci.nombre"
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
