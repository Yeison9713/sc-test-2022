module.exports = Vue.component("SER802C", {
  props: {
    datos: {},
  },
  data() {
    return {
      cups: {
        grupo: "",
        codigo: "",
      },
      descripGrupo: "",
      data_table: {
        columns: [
          {
            label: "CUPS",
            value: "llave",
            class: ["col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center"],
            class_cell: ["col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center"],
            style: {},
          },
          {
            label: "DESCRIPCIÓN",
            value: "descrip",
            class: ["col-xs-9 col-sm-9 col-md-9 col-lg-9 text-center"],
            class_cell: ["col-xs-9 col-sm-9 col-md-9 col-lg-9 text-left"],
            style: {},
          },
          {
            label: "TIPO",
            value: "tipo",
            class: ["col-xs-1 col-sm-1 col-md-1 col-lg-1 text-center"],
            class_cell: ["col-xs-1 col-sm-1 col-md-1 col-lg-1 text-center"],
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
    this.datoGrupo();
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
        this.datoNombre();
      },
      back_pag: () => {
        if (this.pag_table > 0) {
          this.getDatosCups(--this.pag_table);
        }
      },
      next_pag: () => {
        this.getDatosCups(++this.pag_table);
      },
      focus: (data) => {
        console.log(data);
        this.focus_table = data;
      },
    };
  },
  methods: {
    traerGrupos() {
      _fin_validar_form();
      loader("show");
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER801.DLL"))
        .then((data) => {
          console.log(data);
          var grupos = data.CODIGOS;
          grupos.pop();
          _this.ventana_grupo_ser(grupos);
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "error consultando grupos", null, "error", "Error");
          _this.datoGrupo();
        });
    },
    ventana_grupo_ser(grupos) {
      loader("hide");

      _ventanaDatos({
        titulo: "Ventana grupo servicios",
        columnas: ["COD", "DESCRIP"],
        label: ["Codigo", "Descripcion"],
        data: grupos,
        ancho: "50%",
        callback_esc: () => {
          this.datoGrupo();
        },
        callback: (data) => {
          this.cups.grupo = data.COD.trim();
          this.datoGrupo();
          setTimeout(() => _enterInput("#grupo_ser802c"), 100);
        },
      });
    },
    datoGrupo() {
      validarInputs(
        {
          form: "#datoGrupo",
        },
        () => {
          this.$emit("callback_esc");
        },
        () => {
          this.cups.grupo = this.cups.grupo.trim().toUpperCase();

          if (this.cups.grupo == "" || this.cups.grupo == "**") {
            this.descripGrupo = "TODOS LOS GRUPOS";
            this.datoNombre();
          } else this.consultarGrupo();
        }
      );
    },
    consultarGrupo() {
      var _this = this;
      loader("show");
      let datos_envio = {
        datosh: datosEnvio(),
        grupo: this.cups.grupo,
      };
      postData(datos_envio, get_url("APP/SALUD/SER801.DLL"))
        .then((data) => {
          loader("hide");
          _this.descripGrupo = data.DESCRIP;
          _this.datoNombre();
        })
        .catch((err) => {
          loader("hide");
          console.error(err);
          _this.descripGrupo = "";
          _this.datoGrupo();
        });
    },
    datoNombre() {
      validarInputs(
        {
          form: "#datoNombre",
        },
        () => {
          this.datoGrupo();
        },
        () => {
          this.cups.codigo = this.cups.codigo.trim().toUpperCase();
          this.getDatosCups();
        }
      );
    },
    getDatosCups(pag) {
      this.focus_table = false;
      pag = pag || 0;

      let datos_envio = {
        datosh: datosEnvio(),
        paginacion: pag,
        grupo: this.cups.grupo,
        patron: this.cups.codigo,
      };
      loader("show");
      postData(datos_envio, get_url("APP/SALUD/GET_CUPS_F8.DLL"))
        .then((data) => {
          loader("hide");
          if (data.REG_CUPS.length) {
            this.data_table.rows = data.REG_CUPS;
            this.focus_table = true;
          } else if (this.pag_table == 0) {
            CON851("", "No se encontraron coincidencias", null, "warning", "");
            this.datoNombre();
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
          this.datoNombre();
        });
    },
  },
  template: /*html*/ `
  <transition>
    <div class="modal-mask" id="SER802C">
      <div class="modal-wrapper">
        <div
          class="modal-container col-lg-8 col-md-10 col-sm-10 col-xs-10"
        >
          <div class="col-12 no-padding">
            <div class="portlet light box-center box-title">
              <div class="portlet-title">
                <div class="caption" style="width: 100%;">
                  <span class="caption-subject bold">
                    VENTANA DE CUPS
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
              <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
                <div class="form-group box-center col-12 flex-inputs" style="text-align:left">
                  <label>Grupo</label>
                  <div class="inline-inputs">
                    <div
                      id="datoGrupo"
                      class="input-group col-xs-8 col-sm-8 col-md-8 col-lg-8"
                    >
                    <input
                       v-model="cups.grupo"
                       type="text"
                       id="grupo_ser802c"
                       class="form-control center"
                       @keydown.119="traerGrupos"
                       data-orden="1"
                       maxlength="2"
                       disabled
                    />
                    </div>
                    <button
                      type="button"
                      @click="traerGrupos"
                      class="btn f8-Btn btn-default col-md-4 col-sm-4 col-xs-4"
                    >
                      <i class="icon-magnifier"></i>
                    </button>
                  </div>
                </div>
              </div>

            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <div class="form-group box-center col-12 flex-inputs" style="text-align:left">
                <label>Descripción grupo</label>
                <div
                  class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12"
                >
                  <input
                    v-model="descripGrupo"
                    type="text"
                    class="form-control center"
                    data-orden="1"
                    disabled
                  />
                </div>
              </div>
            </div>


              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="form-group box-center col-12 flex-inputs" style="text-align:left">
                  <label>Nombre</label>
                  <div
                    id="datoNombre"
                    class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    <input
                      v-model="cups.codigo"
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
