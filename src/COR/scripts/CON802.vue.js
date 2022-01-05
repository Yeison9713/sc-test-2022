module.exports = Vue.component("CON802", {
  props: {
    datos: {},
  },
  data() {
    return {
      terce: {
        nombres: "",
        busqueda_general: ""
      },

      data_table: {
        columns: [
          { label: "NOMBRE", value: "descrip", class: [], class_cell: ["text-left"], style: {} },
          { label: "IDENTIFICACION", value: "cod", class: ["text-center"], class_cell: [] },
          { label: "TELEFONO", value: "telefono", class: ["text-center"], class_cell: [] },
          { label: "DIRECCION", value: "direccion", class: ["text-center"], class_cell: [] },
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
    _COMPCON802 = this
    this.datoNombreTerce();
  },
  mounted() {
    this.events_table = {
      enter: (data) => {
        // console.log("enter", data);
        this.focus_table = false;
        setTimeout(() => this.$emit("callback", data), 100);
      },
      esc: () => {
        this.pag_table = 0;
        this.focus_table = false;
        if (this.terce.nombres.trim() == "") this.datoGeneralTerce();
        else this.datoNombreTerce();
      },
      back_pag: () => {
        if (this.pag_table > 0) {
          this.getDatosTerce(--this.pag_table);
        }
      },
      next_pag: () => {
        this.getDatosTerce(++this.pag_table);
      },
      focus: (data) => {
        // console.log(data);
        this.focus_table = data;
      },
    };
  },
  methods: {
    datoNombreTerce() {
      validarInputs(
        {
          form: "#datoNombresTerceros",
        },
        () => {
          this.$emit("callback_esc");
        },
        () => {
          this.terce.nombres = this.terce.nombres.trim().toUpperCase();
          if (this.terce.nombres.trim() == "") this.datoGeneralTerce();
          else this.getDatosTerce();
        }
      );
    },
    datoGeneralTerce() {
      validarInputs(
        {
          form: "#datoGeneralTerceros",
        },
        () => {
          this.datoNombreTerce();
        },
        () => {
          this.terce.busqueda_general = this.terce.busqueda_general.trim().toUpperCase();
          this.getDatosTerce();
        }
      );
    },
    getDatosTerce(pag) {
      this.focus_table = false;
      pag = pag || 0;

      let datos_envio = {
        datosh: datosEnvio(),
        paginacion: pag,
        nombre: this.terce.nombres,
        busq_general: this.terce.busqueda_general,
      };
      loader("show");
      postData(datos_envio, get_url("APP/COR/GET_TERCERO_F8.DLL"))
        .then((data) => {
          loader("hide");
          if (data.REG_TERCERO.length) {
            this.data_table.rows = data.REG_TERCERO;
            this.focus_table = true;
          } else if (this.pag_table == 0) {
            CON851("", "No se encontraron coincidencias", null, "warning", "");
            this.datoNombreTerce();
          } else {
            CON851("", "No se encontraron más registros", null, "warning", "");
            --this.pag_table;
            this.focus_table = true;
          }
        })
        .catch((err) => {
          loader("hide");
          console.error("Ha ocurrido un error consultando terceros: ", err);
          CON851("", "Ha ocurrido un error consultando terceros", null, "error", "");
          this.datoNombreTerce();
        });
    },
  },
  template: /*html*/ `
    <transition>
    <div class="modal-mask" id="CON802">
      <div class="modal-wrapper">
        <div
          class="modal-container col-lg-8 col-md-10 col-sm-10 col-xs-10"
        >
          <div class="col-12 no-padding">
            <div class="portlet light box-center box-title">
              <div class="portlet-title">
                <div class="caption" style="width: 100%;">
                  <span class="caption-subject bold">
                    VENTANA DE TERCEROS
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding"
            style="height: 100%; overflow: auto;"
          >
            <div class="col-12 flex-container">
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="form-group box-center col-12 flex-inputs">
                  <label
                    class="label-center col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    Nombres
                  </label>
                  <div
                    id="datoNombresTerceros"
                    class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    <input
                      v-model="terce.nombres"
                      type="text"
                      class="form-control center"
                      data-orden="1"
                      maxlength="16"
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
                    Busqueda General
                  </label>
                  <div
                    id="datoGeneralTerceros"
                    class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    <input
                      v-model="terce.busqueda_general"
                      type="text"
                      class="form-control center"
                      data-orden="1"
                      maxlength="16"
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
