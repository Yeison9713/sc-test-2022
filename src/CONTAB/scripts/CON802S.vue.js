module.exports = Vue.component("CON802S", {
  props: {
    datos: {},
  },
  data() {
    return {
      terce: {
        inicial: "",
        patron: "",
      },
      descripGrupo: "",
      data_table: {
        columns: [
          {
            label: "NOMBRE",
            value: "descrip",
            class: ["col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center"],
            class_cell: ["col-xs-4 col-sm-4 col-md-4 col-lg-4 text-left"],
            style: {},
          },
          {
            label: "IDENTIFICACIÓN",
            value: "cod",
            class: ["col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center"],
            class_cell: ["col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center"],
            style: {},
          },
          {
            label: "TELÉFONO",
            value: "telefono",
            class: ["col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center"],
            class_cell: ["col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center"],
            style: {},
          },
          {
            label: "CIUDAD",
            value: "ciudad",
            class: ["col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center"],
            class_cell: ["col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center"],
            style: {},
          },
          {
            label: "ACTIVIDAD",
            value: "act",
            class: ["col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center"],
            class_cell: ["col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center"],
            style: {},
          },
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
        this.datoInicial();
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
        console.log(data);
        this.focus_table = data;
      },
    };
  },
  methods: {
    datoInicial() {
      validarInputs(
        {
          form: "#inicial",
        },
        () => {
          this.$emit("callback_esc");
        },
        () => {
          this.terce.inicial = this.terce.inicial.trim().toUpperCase();
          this.datoPatron();
        }
      );
    },
    datoPatron() {
      validarInputs(
        {
          form: "#patron",
        },
        () => {
          this.datoInicial();
        },
        () => {
          this.terce.patron = this.terce.patron.trim().toUpperCase();
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
        inicial: this.terce.inicial,
        patron: this.terce.patron,
      };
      loader("show");
      postData(datos_envio, get_url("APP/CONTAB/GET_TERCERO_F8.DLL"))
        .then((data) => {
          loader("hide");
          if (data.REG_TERCERO.length) {
            this.data_table.rows = data.REG_TERCERO;
            this.focus_table = true;
          } else if (this.pag_table == 0) {
            CON851("", "No se encontraron coincidencias", null, "warning", "");
            this.datoInicial();
          } else {
            CON851("", "No se encontraron más registros", null, "warning", "");
            --this.pag_table;
            this.focus_table = true;
          }
        })
        .catch((err) => {
          loader("hide");
          console.error(err);
          CON851("", "Ha ocurrido un error consultando terceros", null, "error", "Error");
          this.datoInicial();
        });
    },
  },
  template: /*html*/ `
  <transition>
    <div class="modal-mask" id="CON802S">
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
            style="height: 100%; overflow: hidden;"
          >
            <div class="col-12 flex-container">
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="form-group box-center col-12 flex-inputs" style="text-align:left">
                  <label>Iniciales del Nombre</label>
                  <div
                    id="inicial"
                    class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    <input
                      v-model="terce.inicial"
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
                <div class="form-group box-center col-12 flex-inputs" style="text-align:left">
                  <label>Buscar en general</label>
                  <div
                    id="patron"
                    class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    <input
                      v-model="terce.patron"
                      type="text"
                      class="form-control center"
                      data-orden="1"
                      maxlength="10"
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
