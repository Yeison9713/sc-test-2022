module.exports = Vue.component("SER868", {
    props: {
      datos: {},
    },
    data() {
      return {
        data_table: {
          columns: [
            {
              label: "CODIGO",
              value: "cod",
              class: ["col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center"],
              class_cell: ["col-xs-4 col-sm-4 col-md-4 col-lg-4 text-left"],
              style: {},
            },
            {
              label: "DESCRIPCIÓN",
              value: "descrip",
              class: ["col-xs-8 col-sm-8 col-md-8 col-lg-8 text-center"],
              class_cell: ["col-xs-8 col-sm-8 col-md-8 col-lg-8 text-center"],
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
      this.getDatosClasp();
    },
    mounted() {
      this.events_table = {
        enter: (data) => {
          this.focus_table = false;
          setTimeout(() => this.$emit("callback", data), 100);
        },
        esc: () => {
          this.focus_table = false;
          this.pag_table = 0;
          this.$emit("callback_esc");
        },
        back_pag: () => {
          if (this.pag_table > 0) {
            this.getDatosClasp(--this.pag_table);
          }
        },
        next_pag: () => {
          this.getDatosClasp(++this.pag_table);
        },
        focus: (data) => {
          this.focus_table = data;
        },
      };
    },
    methods: {
      getDatosClasp(pag) {
        this.focus_table = false;
        pag = pag || 0;
  
        let datos_envio = {
          datosh: datosEnvio(),
          paginacion: pag,
        };
        loader("show");
        postData(datos_envio, get_url("APP/CONTAB/GET_CLASP_F8.DLL"))
          .then((data) => {
            loader("hide");
            if (data.REG_CLASP.length) {
              this.data_table.rows = data.REG_CLASP;
              this.focus_table = true;
            } else if (this.pag_table == 0) {
              CON851("", "No se encontraron coincidencias", null, "warning", "");
              this.$emit("callback_esc");
            } else {
              CON851("", "No se encontraron más registros", null, "warning", "");
              --this.pag_table;
              this.focus_table = true;
            }
          })
          .catch((err) => {
            loader("hide");
            console.error(err);
            CON851("", "Ha ocurrido un error consultando codigos de clasif", null, "error", "Error");
            this.$emit("callback_esc");
          });
      },
    },
    template: /*html*/ `
    <transition>
      <div class="modal-mask" id="SER868">
        <div class="modal-wrapper">
          <div
            class="modal-container col-lg-8 col-md-10 col-sm-10 col-xs-10"
          >
            <div class="col-12 no-padding">
              <div class="portlet light box-center box-title">
                <div class="portlet-title">
                  <div class="caption" style="width: 100%;">
                    <span class="caption-subject bold">
                      {{ $_USUA_GLOBAL[0].NIT == 844003225 ? "CENTRO DE SALUD A QUE PERTENECE" : "CLASIFICACION INTERNA" }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding"
              style="height: 100%; overflow: hidden;"
            >
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
  