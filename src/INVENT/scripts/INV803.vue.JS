const { getDatos } = require("../../frameworks/scripts/getDatos.js");

module.exports = Vue.component("INV803", {
  props: {
    datos: {},
    filtro_tipo: "",
    filtro_grupo: "",
  },
  data() {
    return {
      art: {
        almacen: "",
        inicial: "",
        general: "",
        codigoUso: "**",
      },

      llave: {
        tipo: "",
        grupo: "",
      },
      almacenes: [],
      arrayUsos: [],
      descrip_almacen: "",
      descrip_uso: "",
      titulo: "VENTANA ARTICULOS",
      data_table: {
        columns: [
          {
            label: "GRUPO",
            value: "grupo",
            class: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            class_cell: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
          },
          {
            label: "NRO",
            value: "nro",
            class: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            class_cell: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
          },
          {
            label: "CLASE",
            value: "clase",
            class: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            class_cell: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
          },
          {
            label: "NOMBRE",
            value: "nombre",
            class: ["col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center"],
            class_cell: ["col-lg-4 col-md-4 col-sm-4 col-xs-4 text-left"],
          },
          {
            label: "UNIDAD",
            value: "unidad",
            class: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            class_cell: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
          },
          {
            label: "VALOR",
            value: "valor",
            class: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            class_cell: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
          },
          {
            label: "REFER",
            value: "refer",
            class: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
            class_cell: ["col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center"],
          },
          {
            label: "SALDO",
            value: "saldo",
            class: ["col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center"],
            class_cell: ["col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center"],
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

  created() {
    this.llave.tipo = parseInt(this.filtro_tipo) || 1;
    this.llave.grupo = this.filtro_grupo;
    if (this.llave.grupo != "") this.titulo = "VENTANA ARTICULOS FILTRADOS POR TIPO Y GRUPO";
    console.log(this.llave, "LLAVE");
    this.traerUso();
  },

  mounted() {
    let _this = this;
    this.events_table = {
      enter: (data) => {
        console.log("enter", data);
        this.focus_table = false;
        setTimeout(() => this.$emit("callback", data), 100);
      },
      esc: () => {
        this.focus_table = false;
        this.pag_table = 0;
        this.datoCodigoUSO();
      },
      back_pag: () => {
        if (_this.pag_table > 0) {
          this.getDatosArticulos(--_this.pag_table);
        }
      },
      next_pag: () => {
        this.getDatosArticulos(++_this.pag_table);
      },
      focus: (data) => {
        console.log(data);
        this.focus_table = data;
      },
    };
  },

  methods: {
    async traerUso() {
      loader("show");
      try {
        this.arrayUsos = await getDatos._uso({ datosh: datosEnvio(), tipo: "2" });
        this.traerAlmacenes();
      } catch {
        this.traerAlmacenes();
      }
    },
    async traerAlmacenes() {
      loader("show");
      try {
        this.almacenes = await getDatos._almacenes();
        loader("hide");
        this.datoAlmacen();
      } catch {
        loader("hide");
        console.log("error consultando almacenes");
        CON851("", "Error consultando almacenes", null, "error", "Error");
        this.$emit("callback_esc");
      }
    },
    datoAlmacen() {
      if (this.llave.tipo > 1) {
        this.art.almacen = "*****";
        this.descrip_almacen = "TODOS";
        this.datoInicial();
      } else
        validarInputs(
          {
            form: "#datoAlmacen_inv803",
          },
          () => {
            this.mostrarTabla = false;
            this.$emit("callback_esc");
          },
          () => {
            this.art.almacen = this.art.almacen.trim().toUpperCase();
            if (this.art.almacen == "") {
              this.art.almacen = "*****";
              this.descrip_almacen = "TODOS";
              this.datoInicial();
            } else {
              let busqueda = this.almacenes.find((x) => x.CODIGO == this.art.almacen);

              if (busqueda) {
                this.descrip_almacen = busqueda.DESCRIPCION;
                this.datoInicial();
              } else {
                CON851("", "No existe almacen", null, "error", "Error");
                this.descrip_almacen = "NO ENCONTRADO";
                this.datoAlmacen();
              }
            }
          }
        );
    },
    ventanaAlmacenes() {
      _fin_validar_form();

      _ventanaDatos({
        titulo: "Ventana almacenes",
        columnas: ["CODIGO", "DESCRIPCION"],
        data: this.almacenes,
        ancho: "60%",
        callback_esc: () => this.datoAlmacen(),
        callback: (data) => {
          this.art.almacen = data.CODIGO.trim();
          this.datoAlmacen();
          setTimeout(() => _enterInput("#inputAlmacen_inv803"), 100);
        },
      });
    },
    datoInicial() {
      validarInputs(
        {
          form: "#datoInicial_inv803",
        },
        () => {
          if (this.llave.tipo == 1) this.datoAlmacen();
          else {
            this.mostrarTabla = false;
            this.$emit("callback_esc");
          }
        },
        () => {
          this.art.inicial = this.art.inicial.trim().toUpperCase();
          this.datoGeneral();
        }
      );
    },
    datoGeneral() {
      validarInputs(
        {
          form: "#datoGeneral_inv803",
        },
        () => {
          this.datoInicial();
        },
        () => {
          this.art.general = this.art.general.trim().toUpperCase();
          this.datoCodigoUSO();
        }
      );
    },
    ventanaUso() {
      _fin_validar_form();

      _ventanaDatos({
        titulo: "Ventana de usos",
        columnas: ["COD", "DESCRIP"],
        data: this.arrayUsos,
        ancho: "50%",
        callback_esc: () => this.datoCodigoUSO(),
        callback: (data) => {
          this.art.codigoUso = data.COD;
          this.datoCodigoUSO();
          setTimeout(() => _enterInput("#inputUsos_inv803"), 100);
        },
      });
    },
    datoCodigoUSO() {
      validarInputs(
        {
          form: "#datoCodigouso_inv803",
        },
        () => {
          this.datoGeneral();
        },
        () => {
          this.art.codigoUso = this.art.codigoUso.trim().toUpperCase() || "**";

          if (this.art.codigoUso == "**") this.getDatosArticulos();
          else {
            let busqueda = this.arrayUsos.find((x) => x.COD == this.art.codigoUso);

            if (busqueda) this.getDatosArticulos();
            else {
              CON851("", "No existe codigo uso", null, "error", "Error");
              this.datoCodigoUSO();
            }
          }
        }
      );
    },

    getDatosArticulos(pag) {
      this.focus_table = false;
      pag = pag || 0;

      let datos_envio = {
        datosh: datosEnvio(),
        llave: Object.values(this.llave).join(""),
        paginacion: pag,
        almacen: this.art.almacen,
        inicial: this.art.inicial,
        general: this.art.general,
        codigoUso: this.art.codigoUso,
      };
      loader("show");
      postData(datos_envio, get_url("APP/INVENT/GET_ARTIC_F8.DLL"))
        .then((data) => {
          loader("hide");
          if (data.REG_ART.length) {
            // data.REG_ART.forEach((el) => (el.valor = parseFloat(el.valor) || 0));
            this.data_table.rows = data.REG_ART;
            this.focus_table = true;
          } else if (this.pag_table == 0) {
            CON851("", "No se encontraron coincidencias", null, "warning", "");
            this.datoCodigoUSO();
          } else {
            CON851("", "No se encontraron más registros", null, "warning", "");
            --this.pag_table;
            this.focus_table = true;
          }
        })
        .catch((err) => {
          loader("hide");
          console.error("Ha ocurrido un error consultando articulos: ", err);
          CON851("", "Ha ocurrido un error consultando articulos", null, "error", "");
          this.datoCodigoUSO();
        });
    },
  },
  template: /*html*/ `
  <transition>
  <div class="modal-mask" id="INV803">
    <div class="modal-wrapper">
      <div
        class="modal-container col-lg-11 col-md-11 col-sm-11 col-xs-12"
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
          <div class="col-12 sc-flex-container no-padding">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
              <div class="form-group box-center col-12 flex-inputs">

                <label>Almacén</label>
                <div class="tooltip-proft right-text">
                  <span class="icon-proft icon-info"></span>
                  <span class="tiptext">
                    <div>***** Para buscar en todos</div>
                  </span>
                </div>
                <div class="inline-inputs">
                  <div
                    id="datoAlmacen_inv803"
                    class="input-group col-xs-4 col-sm-4 col-md-4 col-lg-4"
                  >
                    <input
                      id="inputAlmacen_inv803"
                      v-model="art.almacen"
                      type="text"
                      @keydown.119="ventanaAlmacenes"
                      class="form-control center"
                      data-orden="1"
                      maxlength="5"
                      disabled
                    />
                  </div>
                  <button
                    type="button"
                    @click="ventanaAlmacenes"
                    disabled
                    class="btn f8-Btn btn-default"
                  >
                    <i class="icon-magnifier"></i>
                  </button>
                  <div
                    class="input-group col-xs-8 col-sm-8 col-md-8 col-lg-8"
                  >
                    <input
                      v-model="descrip_almacen"
                      type="text"
                      class="form-control text-left"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <div class="form-group box-center col-12 flex-inputs">
                <label
                  class="label-center col-xs-12 col-sm-12 col-md-12 col-lg-12"
                >
                  Inicial
                </label>
                <div
                  class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  id="datoInicial_inv803"
                >
                  <input
                    v-model="art.inicial"
                    type="text"
                    class="form-control center"
                    data-orden="1"
                    maxlength="10"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <div class="form-group box-center col-12 flex-inputs">
                <label>General</label>
                <div class="tooltip-proft right-text">
                  <span class="icon-proft icon-info"></span>
                  <span class="tiptext">
                    <div>Si llena este campo buscará en todos los grupos</div>
                  </span>
                </div>
                <div
                  class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  id="datoGeneral_inv803"
                >
                  <input
                    v-model="art.general"
                    type="text"
                    class="form-control center"
                    data-orden="1"
                    maxlength="26"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-2 col-lg-2">
              <div class="form-group box-center col-12 flex-inputs">
                <label>Código USO</label>
                <div class="tooltip-proft left-text">
                  <span class="icon-proft icon-info"></span>
                  <span class="tiptext">
                    <div>** Para todos</div>
                  </span>
                </div>
                <div class="inline-inputs">
                  <div
                  id="datoCodigouso_inv803"
                  class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    <input
                      v-model="art.codigoUso"
                      type="text"
                      id="inputUsos_inv803"
                      @keydown.119="ventanaUso"
                      class="form-control center"
                      data-orden="1"
                      maxlength="2"
                      disabled
                     />
                   </div>
                   <button
                      type="button"
                      @click="ventanaUso"
                      disabled
                      class="btn f8-Btn btn-default"
                    >
                      <i class="icon-magnifier"></i>
                    </button>
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
