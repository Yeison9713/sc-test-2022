module.exports = Vue.component("content_hc890g", {
  props: {
    params: {},
    data: {},
  },
  data() {
    return {
      examen_visual: {},
      estructuras: [
        { COD: "1", DESCRIP: "Sin alteraciones" },
        { COD: "2", DESCRIP: "Con alteraciones" },
        { COD: "3", DESCRIP: "No aplica" },
      ],
      niveles: [
        { COD: "1", DESCRIP: "20/200" },
        { COD: "2", DESCRIP: "20/100" },
        { COD: "3", DESCRIP: "20/70" },
        { COD: "4", DESCRIP: "20/50" },
        { COD: "5", DESCRIP: "20/40" },
        { COD: "6", DESCRIP: "20/30" },
        { COD: "7", DESCRIP: "20/25" },
        { COD: "8", DESCRIP: "20/20" },
        { COD: "9", DESCRIP: "20/15" },
        { COD: "A", DESCRIP: "20/13" },
        { COD: "B", DESCRIP: "20/10" },
      ],
      textos: {
        estructua_ocul_izq: "",
        estructua_ocul_der: "",
      },
      stylesHC890G: {
        wrapInput: {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: "0.5rem",
          justifyContent: "space-between",
        },
        labelLeft: {
          textAlign: "left",
        },
      },
    };
  },
  watch: {
    data: {
      deep: true,
      handler: function (param) {
        this.examen_visual = { ...param };
      },
    },
    "params.estado": function (estado) {
      if (estado) this.validarEstOculIzq();
    },
    "examen_visual.estructuras_oculares_oi": function (val) {
      this.buscarTextIzq(val);
    },
    "examen_visual.estructuras_oculares_od": function (val) {
      this.buscarTextDer(val);
    },
  },
  created() {
    // this.buscarTextIzq(this.examen_visual.estructuras_oculares_oi);
    // this.buscarTextDer(this.examen_visual.estructuras_oculares_od);
  },
  methods: {
    buscarTextIzq(val) {
      let consulta = this.estructuras.find((x) => x.COD == val);
      if (consulta) this.textos.estructua_ocul_izq = consulta.COD + ". " + consulta.DESCRIP;
    },
    buscarTextDer(val) {
      let consulta = this.estructuras.find((x) => x.COD == val);
      if (consulta) this.textos.estructua_ocul_der = consulta.COD + ". " + consulta.DESCRIP;
    },
    validarEstOculIzq() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Estructuras oculares Izquierdo",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.estructuras,
            callback_f: () => this._escape(),
            seleccion: this.examen_visual.estructuras_oculares_oi,
            teclaAlterna: true,
          },
          (data) => {
            _this.examen_visual.estructuras_oculares_oi = data.COD;

            if (_this.examen_visual.estructuras_oculares_oi == "3") {
              _this.examen_visual.agudeza_visual_oi_1 = "000";
              _this.examen_visual.agudeza_visual_oi_2 = "000";
              _this.validarEstOculDer();
            } else {
              _this.validarNivelIzq();
            }
          }
        );
      }, 300);
    },
    validarNivelIzq() {
      var _this = this;
      let seleccionado = "";

      switch (parseInt(this.examen_visual.agudeza_visual_oi_2)) {
        case 200:
          seleccionado = "1";
          break;
        case 100:
          seleccionado = "2";
          break;
        case 70:
          seleccionado = "3";
          break;
        case 50:
          seleccionado = "4";
          break;
        case 40:
          seleccionado = "5";
          break;
        case 30:
          seleccionado = "6";
          break;
        case 25:
          seleccionado = "7";
          break;
        case 20:
          seleccionado = "8";
          break;
        case 15:
          seleccionado = "9";
          break;
        case 13:
          seleccionado = "A";
          break;
        case 10:
          seleccionado = "B";
          break;
      }

      setTimeout(() => {
        POPUP(
          {
            titulo: "Nivel vision Izquierdo",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: _this.niveles,
            callback_f: () => _this.validarEstOculIzq(),
            seleccion: seleccionado,
            teclaAlterna: true,
          },
          (data) => {
            _this.examen_visual.agudeza_visual_oi_1 = data.DESCRIP.split("/")[0];
            _this.examen_visual.agudeza_visual_oi_2 = data.DESCRIP.split("/")[1];
            _this.validarEstOculDer();
          }
        );
      }, 300);
    },
    validarEstOculDer() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Estructuras oculares derecho",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.estructuras,
            callback_f: () => {
              if (this.examen_visual.estructuras_oculares_oi == "3") this.validarEstOculIzq();
              else this.validarNivelIzq();
            },
            seleccion: this.examen_visual.estructuras_oculares_od,
            teclaAlterna: true,
          },
          (data) => {
            _this.examen_visual.estructuras_oculares_od = data.COD;

            if (_this.examen_visual.estructuras_oculares_od == "3") {
              _this.examen_visual.agudeza_visual_od_1 = "000";
              _this.examen_visual.agudeza_visual_od_2 = "000";
              _this.verificarDistancia();
            } else {
              _this.validarNivelDer();
            }
          }
        );
      }, 300);
    },
    validarNivelDer() {
      var _this = this;
      let seleccionado = "";

      switch (parseInt(this.examen_visual.agudeza_visual_od_2)) {
        case 200:
          seleccionado = "1";
          break;
        case 100:
          seleccionado = "2";
          break;
        case 70:
          seleccionado = "3";
          break;
        case 50:
          seleccionado = "4";
          break;
        case 40:
          seleccionado = "5";
          break;
        case 30:
          seleccionado = "6";
          break;
        case 25:
          seleccionado = "7";
          break;
        case 20:
          seleccionado = "8";
          break;
        case 15:
          seleccionado = "9";
          break;
        case 13:
          seleccionado = "A";
          break;
        case 10:
          seleccionado = "B";
          break;
      }

      setTimeout(() => {
        POPUP(
          {
            titulo: "Nivel vision Derecho",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.niveles,
            callback_f: this.validarEstOculDer,
            seleccion: seleccionado,
            teclaAlterna: true,
          },
          (data) => {
            _this.examen_visual.agudeza_visual_od_1 = data.DESCRIP.split("/")[0];
            _this.examen_visual.agudeza_visual_od_2 = data.DESCRIP.split("/")[1];
            _this.verificarDistancia();
          }
        );
      }, 300);
    },
    verificarDistancia() {
      if (
        parseInt(this.examen_visual.agudeza_visual_oi_1) == 0 &&
        parseInt(this.examen_visual.agudeza_visual_od_1) == 0
      ) {
        this.examen_visual.distancia_agud = "00.00"
        this._terminar();
      } else {
        this.validarDistancia();
      }
    },
    validarDistancia() {
      validarInputs(
        {
          form: "#validarDistancia_HC890G",
          orden: "1",
        },
        () => {
          if (this.examen_visual.estructuras_oculares_od == "3") this.validarEstOculDer();
          else this.validarNivelDer();
        },
        () => {
          var mask = IMask.createMask({
            mask: Number,
            radix: ".",
            padFractionalZeros: true,
            signed: false,
            scale: 2,
            min: 0000,
            max: 99.99,
          });

          if (parseFloat(this.examen_visual.distancia_agud.trim()) == 0) {
            CON851("02", "02", null, "error", "Error");
            this.validarDistancia();
          } else {
            this.examen_visual.distancia_agud = mask.resolve(this.examen_visual.distancia_agud);
            this._terminar();
          }
        }
      );
    },
    _escape() {
      this.$emit("callback_esc");
    },
    _terminar() {
      this.$emit("callback", this.examen_visual);
    },
  },
  template: /*html*/ ` 
  <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
  <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">

    <div
      class="col-md-12 col-sm-12 col-xs-12 head-box"
      style="display: flex; justify-content: center; padding-right: 0; padding-left: 0"
    >
      <label>Agudeza visual</label>
    </div>

    <div class="col-md-12 no-padding">
      <label class="col-md-4"></label>
      <label class="col-md-4">Ojo Izquierdo</label>
      <label class="col-md-4">Ojo Derecho</label>
    </div>

    <div
      class="col-md-8 no-padding"
      style="text-align: left; border-right: 1.5px solid #ececec"
    >
      <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes">
        <label style="position: relative; top: 6px">Estructuras oculares</label>
        <div
          class="col-md-6 inline-inputs"
          style="float: right; padding-right: 0"
        >
          <input
            type="text"
            v-model="textos.estructua_ocul_izq"
            disabled="disabled"
            style="text-align: center"
            class="form-control col-md-12 col-sm-12 col-xs-12"
          />
        </div>
      </div>

      <div class="salto-linea"></div>

      <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes">
        <label style="position: relative; top: 6px"
          >Nivel de visión SNELLEN</label
        >
        <div
          class="col-md-6 inline-inputs"
          style="float: right; padding-right: 0"
        >
          <div
            class="col-md-6 no-padding inline-inputs"
            id="validarNivelVision_izq_1_HC890G"
          >
            <input
              type="number"
              maxlength="3"
              v-model="examen_visual.agudeza_visual_oi_1"
              data-orden="1"
              disabled="disabled"
              style="text-align: center"
              class="form-control col-md-12 col-sm-12 col-xs-12"
            />
          </div>
          <div
            class="col-md-6 no-padding inline-inputs"
            id="validarNivelVision_izq_2_HC890G"
          >
            <input
              type="number"
              maxlength="3"
              v-model="examen_visual.agudeza_visual_oi_2"
              data-orden="1"
              disabled="disabled"
              style="text-align: center"
              class="form-control col-md-12 col-sm-12 col-xs-12"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      class="col-md-4 no-padding"
      style="text-align: left; padding-left: 15px"
    >
      <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes">
        <div class="col-md-12 no-padding inline-inputs">
          <input
            type="text"
            v-model="textos.estructua_ocul_der"
            disabled="disabled"
            style="text-align: center"
            class="form-control col-md-12 col-sm-12 col-xs-12"
          />
        </div>
      </div>

      <div class="salto-linea"></div>

      <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes">
        <div
          class="col-md-6 no-padding inline-inputs"
          id="validarNivelVision_der_1_HC890G"
        >
          <input
            type="number"
            maxlength="3"
            v-model="examen_visual.agudeza_visual_od_1"
            data-orden="1"
            disabled="disabled"
            style="text-align: center"
            class="form-control col-md-12 col-sm-12 col-xs-12"
          />
        </div>
        <div
          class="col-md-6 no-padding inline-inputs"
          id="validarNivelVision_der_2_HC890G"
        >
          <input
            type="number"
            maxlength="3"
            v-model="examen_visual.agudeza_visual_od_2"
            data-orden="1"
            disabled="disabled"
            style="text-align: center"
            class="form-control col-md-12 col-sm-12 col-xs-12"
          />
        </div>
      </div>
    </div>

    <div class="salto-linea"></div>

    <div
      class="col-md-12 no-padding"
      style="display: flex; justify-content: center"
    >
      <div class="col-md-6 col-sm-12 col-xs-12 form-group form-md-checkboxes">
        <label style="position: relative; top: 6px"
          >Distancia de valoración</label
        >
        <div
          class="col-md-4 no-padding inline-inputs"
          style="float: right"
          id="validarDistancia_HC890G"
        >
          <input
            type="text"
            v-model="examen_visual.distancia_agud"
            maxlength="5"
            data-orden="1"
            disabled="disabled"
            class="form-control col-md-12 col-sm-12 col-xs-12"
            style="text-align: center"
          />
        </div>
      </div>
    </div>
  </div>
</div>
`,
});
