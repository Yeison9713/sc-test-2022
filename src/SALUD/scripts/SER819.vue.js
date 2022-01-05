module.exports = Vue.component("SER819", {
  props: {
    datos: {},
    filtro_atiende: {
      type: Array,
    },
    filtro_espec: {
      type: Array,
    },
  },
  data() {
    return {
      profe: {
        inicial: "",
        general: "",
      },
      titulo: "VENTANA PROFESIONALES",
      data_table: {
        columns: [
          {
            label: "NOMBRE",
            value: "nombre",
            class: ["col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center"],
            class_cell: ["col-lg-4 col-md-4 col-sm-4 col-xs-4 text-left"],
            style: {},
          },
          {
            label: "DETALLE",
            value: "detalle",
            class: ["col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center"],
            class_cell: ["col-lg-2 col-md-2 col-sm-2 col-xs-2 text-left"],
            style: {},
          },
          {
            label: "LUN",
            value: "lun",
            class: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            class_cell: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            style: {},
          },
          {
            label: "MAR",
            value: "mar",
            class: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            class_cell: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            style: {},
          },
          {
            label: "MIE",
            value: "mie",
            class: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            class_cell: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            style: {},
          },
          {
            label: "JUE",
            value: "jue",
            class: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            class_cell: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            style: {},
          },
          {
            label: "VIE",
            value: "vie",
            class: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            class_cell: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            style: {},
          },
          {
            label: "SAB",
            value: "sab",
            class: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            class_cell: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            style: {},
          }
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
    if (this.filtro_atiende.length > 0 || this.filtro_espec.length > 0) this.titulo = "VENTANA PROFESIONALES FILTRADOS";
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
        if (this.profe.inicial.trim() == "") this.datoGeneral();
        else this.datoInicial();
      },
      back_pag: () => {
        if (this.pag_table > 0) {
          this.getDatosProfe(--this.pag_table);
        }
      },
      next_pag: () => {
        this.getDatosProfe(++this.pag_table);
      },
      focus: (data) => {
        console.log(data);
        this.focus_table = data;
      }
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
          this.profe.inicial = this.profe.inicial.trim().toUpperCase();
          if (this.profe.inicial.trim() == "") this.datoGeneral();
          else this.getDatosProfe();
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
          this.profe.general = this.profe.general.trim().toUpperCase();
          this.getDatosProfe();
        }
      );
    },
    getDatosProfe(pag) {
      this.focus_table = false;
      pag = pag || 0;

      let datos_envio = {
        datosh: datosEnvio(),
        paginacion: pag,
        inicial: this.profe.inicial,
        general: this.profe.general,
      };

      if (this.filtro_atiende.length > 0) {
        datos_envio['filtro_atiende'] = "S"
        this.filtro_atiende.forEach(function (item, i) {
          let indice = i + 1
          datos_envio["atiende_" + indice.toString().padStart(3, "0")] = item;
        });
      }

      if (this.filtro_espec.length > 0) {
        datos_envio['filtro_especialidad'] = "S"
        this.filtro_espec.forEach(function (item, i) {
          let indice = i + 1
          datos_envio["espec_" + indice.toString().padStart(3, "0")] = item;
        });
      }

      loader("show");
      postData(datos_envio, get_url("APP/SALUD/GET_PROF_F8.DLL"))
        .then((data) => {
          loader("hide");
          if (data.REG_PROF.length) {
            this.data_table.rows = data.REG_PROF;
            this.focus_table = true;
          } else if (this.pag_table == 0) {
            CON851("", "No se encontraron coincidencias", null, "warning", "");
            if (this.profe.inicial.trim() == "") this.datoGeneral();
            else this.datoInicial();
          } else {
            CON851("", "No se encontraron más registros", null, "warning", "");
            --this.pag_table;
            this.focus_table = true;
          }
        })
        .catch((err) => {
          loader("hide");
          console.error("Ha ocurrido un error consultando profesionales: ", err);
          CON851("", "Ha ocurrido un error consultando profesionales", null, "error", "Error");
          if (this.profe.inicial.trim() == "") this.datoGeneral();
          else this.datoInicial();
        });
    },
  },
  template: /*html*/ `
  <transition>
    <div class="modal-mask" id="SER819">
      <div class="modal-wrapper">
        <div
          class="modal-container col-lg-8 col-md-10 col-sm-10 col-xs-10"
        >
          <div class="col-12 no-padding">
            <div class="portlet light box-center box-title">
              <div class="portlet-title">
                <div class="caption" style="width: 100%;">
                  <span class="caption-subject bold">
                    {{ titulo }}
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
                      v-model="profe.inicial"
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
                      v-model="profe.general"
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
