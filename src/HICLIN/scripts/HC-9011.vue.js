const { trim } = require("jquery");

const { detallesHc, grabarDetalles } = require("../../HICLIN/scripts/reg_dethc.js");

module.exports = Vue.component("formulario-apgar", {
  props: {
    params: {},
  },
  data() {
    return {
      apgar: detallesHc.WS_9011(),
      index: 0,
      arrayResp: [
        { COD: "0", DESCRIP: "Nunca" },
        { COD: "1", DESCRIP: "Casi nunca" },
        { COD: "2", DESCRIP: "Algunas veces" },
        { COD: "3", DESCRIP: "Casi siempre" },
        { COD: "4", DESCRIP: "Siempre" },
      ],
      formats: null,

      stylesHC604: {
        flexWrapInput: {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        },
        labelLeft: {
          textAlign: "left",
        },
        flexRow: {
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        },
      },
    };
  },
  created() {
    _compHC_9011 = this;
    this.formats = this.arrayResp.map(() => ({}));
  },
  watch: {
    "params.estado": function (estado) {
      if (estado) this.abrirArchivos();
    },
  },
  methods: {
    descripResp(val = "") {
      let res = this.arrayResp.find(el => el.COD == val);
      return res ? res.DESCRIP : ""
    },
    abrirArchivos() {
      postData(
        {
          datosh: datosEnvio() + $_REG_HC.llave_hc + "|||9011||",
        },
        get_url("app/HICLIN/HCDETAL_PRC.DLL")
      )
        .then((data) => {
          let detalle9011 = data.DETHC.find((e) => e["COD-DETHC"] == "9011");
          if (detalle9011) this.apgar = detalle9011.DETALLE.tabla_9011;
          this.datoNombreAcomp();
        })
        .catch((error) => {
          CON851("", "Error consultando datos", null, "error", "error");
          console.log(error);
          this.salir();
        });
    },

    setDescripResp(key) {
      let resp = this.arrayResp.find((el) => el.COD == this.apgar[this.index][key]);
      let descrip = resp ? resp.DESCRIP : "";
      Vue.set(this.formats[this.index], key, descrip);
    },

    datoNombreAcomp() {
      validarInputs(
        {
          form: "#datoNombreAcomp",
          orden: "1",
          event_f3: () => {
            if (this.index > 0) {
              this.confirmar();
            } else this.datoNombreAcomp(true);
          },
        },
        () => {
          if (this.index == 0) {
            this.salir();
          } else {
            this.index -= 1;
            this.datoNombreAcomp();
          }
        },
        () => {
          this.apgar[this.index].nombre_acomp = this.apgar[this.index].nombre_acomp.toUpperCase();
          this.apgar[this.index].nombre_acomp.trim() ? this.datoParentesco() : this.datoNombreAcomp();
        }
      );
    },

    datoParentesco() {
      validarInputs(
        {
          form: "#datoParentesco",
          orden: "1",
        },
        this.datoNombreAcomp,
        () => {
          this.apgar[this.index].parentesco = this.apgar[this.index].parentesco.toUpperCase();
          this.apgar[this.index].parentesco.trim() ? this.datoSatiReciAyudaFami() : this.datoParentesco();
        }
      );
    },

    datoSatiReciAyudaFami() {
      setTimeout(() => {
        POPUP(
          {
            titulo: "RESPUESTA",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayResp,
            callback_f: () => this.datoParentesco(),
            seleccion: this.apgar[this.index].sati_reci_ayuda_fami,
            teclaAlterna: true,
            id_input: "#datoSatiReciAyudaFami",
          },
          (data) => {
            this.apgar[this.index].sati_reci_ayuda_fami = data.COD;
            this.datoSatiPartiFamiBrind()
          }
        );
      }, 300);
    },

    datoSatiPartiFamiBrind() {
      setTimeout(() => {
        POPUP(
          {
            titulo: "RESPUESTA",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayResp,
            callback_f: () => this.datoSatiReciAyudaFami(),
            seleccion: this.apgar[this.index].sati_parti_fami_brind,
            teclaAlterna: true,
            id_input: "#datoSatiPartiFamiBrind",
          },
          (data) => {
            this.apgar[this.index].sati_parti_fami_brind = data.COD;
            this.datoSatiFamiAceptEmp()
          }
        );
      }, 300);
    },

    datoSatiFamiAceptEmp() {
      setTimeout(() => {
        POPUP(
          {
            titulo: "RESPUESTA",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayResp,
            callback_f: () => this.datoSatiPartiFamiBrind(),
            seleccion: this.apgar[this.index].sati_fami_acept_emp,
            teclaAlterna: true,
            id_input: "#datoSatiFamiAceptEmp",
          },
          (data) => {
            this.apgar[this.index].sati_fami_acept_emp = data.COD;
            this.datoSatiFamiExpAfect()
          }
        );
      }, 300);
    },

    datoSatiFamiExpAfect() {
      setTimeout(() => {
        POPUP(
          {
            titulo: "RESPUESTA",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayResp,
            callback_f: () => this.datoSatiFamiAceptEmp(),
            seleccion: this.apgar[this.index].sati_fami_exp_afect,
            teclaAlterna: true,
            id_input: "#datoSatiFamiExpAfect",
          },
          (data) => {
            this.apgar[this.index].sati_fami_exp_afect = data.COD;
            this.datoSatiAcomTiempFami()
          }
        );
      }, 300);
    },

    datoSatiAcomTiempFami() {
      setTimeout(() => {
        POPUP(
          {
            titulo: "RESPUESTA",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.arrayResp,
            callback_f: () => this.datoSatiFamiExpAfect(),
            seleccion: this.apgar[this.index].sati_comp_tiemp_fami,
            teclaAlterna: true,
            id_input: "#datoSatiAcomTiempFami",
          },
          (data) => {
            this.apgar[this.index].sati_comp_tiemp_fami = data.COD;
            this.validarPaso()
          }
        );
      }, 300);
    },

    validarPaso() {
      if (this.index < 4) {
        if (this.apgar[this.index + 1].nombre_acomp.trim() == "")
          CON851P("Desea llenar los otros acompañantes ?", this.confirmar, this.siguienteAcompanante);
        else this.siguienteAcompanante();
      } else this.confirmar();
    },
    siguienteAcompanante() {
      this.index += 1;
      this.datoNombreAcomp();
    },

    validarResp(resp) {
      var retorno = ["0", "1", "2", "3", "4"].includes(resp);
      if (!retorno) CON851("03", "03", null, "error", "Error");
      return retorno;
    },

    salir() {
      this.$emit("callback_esc");
    },
    confirmar(a) {
      CON851P(
        "01",
        () => {
          if (a) this.datoNombreAcomp();
          else this.datoSatiAcomTiempFami();
        },
        this.terminar
      );
    },
    async terminar() {
      let detalles = {
        9011: _getObjetoSaveHc({ tabla_9011_: this.apgar }, ["tabla_9011_"]),
      };
      console.log(detalles);
      grabarDetalles(detalles, $_REG_HC.llave_hc)
        .then((data) => {
          console.log(data);
          CON851("", "Guardado correctamente", null, "success", "Correcto");
          _compHC_9011.$emit("callback");
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error en guardado de detalles", null, "error", "Error");
          _compHC_9011.datoSatiFamiExpAfect();
        });
    },
  },
  template: /*html*/ `
    <div class="col-md-12 no-padding">
      <div class="form-horizontal">
        <div class="col-md-12 no-padding">
          <div class="form-group box-center col-md-12">
            <div class="col-md-12 no-padding">
              <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                <div
                  id="datoNombreAcomp"
                  class="col-md-8 col-sm-8 col-xs-12"
                  :style="stylesHC604.flexWrapInput"
                >
                  <label class="col-md-4 col-sm-3 col-xs-3 " :style="stylesHC604.labelLeft"
                    >Nombre acompañante {{ index + 1 }} de 5</label
                  >
                  <div class="input-group col-md-8 col-sm-9 col-xs-9">
                    <input
                      v-model="apgar[index].nombre_acomp"
                      class="form-control"
                      type="text"
                      maxlength="40"
                      data-orden="1"
                      style="text-align: left !important"
                      disabled
                    />
                  </div>
                </div>
                <div
                  id="datoParentesco"
                  class="col-md-4 col-sm-4 col-xs-12"
                  :style="stylesHC604.flexWrapInput"
                >
                  <label class="col-md-4 col-sm-3 col-xs-3 " :style="stylesHC604.labelLeft"
                    >Parentesco</label
                  >
                  <div class="input-group col-md-8 col-sm-9 col-xs-9">
                    <input
                      v-model="apgar[index].parentesco"
                      class="form-control"
                      type="text"
                      maxlength="23"
                      data-orden="1"
                      style="text-align: left !important"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12 no-padding">
          <div class="form-group box-center col-md-12">
            <div class="col-md-12 no-padding">

              <div class="col-md-12">
                <div class="col-md-12 col-sm-12 col-xs-12 no-padding" :style="stylesHC604.flexRow, {margin: '0 0 1rem 0'}">
                  <div class="col-md-8 col-sm-8 col-xs-12 no-padding">
                    <label class="col-md-12 col-sm-12 col-xs-12 " :style="stylesHC604.labelLeft"
                      >¿Le satisface la ayuda que recibe de su familia cuando
                      tiene algún problema o necesidad?</label>
                  </div>
                  
                  <div class="col-md-4 col-sm-4 col-xs-12 no-padding" :style="stylesHC604.flexRow">
                    <div class="col-12 no-padding" id="datoSatiReciAyudaFami">
                      <input
                        :value="descripResp(apgar[index].sati_reci_ayuda_fami)"
                        class="form-control"
                        type="text"
                        disabled
                        data-orden="1"
                        style="text-align: center"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12 no-padding" :style="stylesHC604.flexRow, {margin: '0 0 1rem 0'}">
                  <div class="col-md-8 col-sm-8 col-xs-12 no-padding">
                    <label class="col-md-12 col-sm-12 col-xs-12 " :style="stylesHC604.labelLeft"
                      >¿Le satisface la participación que su familia brinda y
                      permite?</label
                    >
                  </div>
                  <div class="col-md-4 col-sm-4 col-xs-12 no-padding" :style="stylesHC604.flexRow">
                    <div class="col-12 no-padding" id="datoSatiPartiFamiBrind">
                      <input
                        :value="descripResp(apgar[index].sati_parti_fami_brind)"
                        class="form-control"
                        type="text"
                        disabled
                        data-orden="1"
                        style="text-align: center"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12 no-padding" :style="stylesHC604.flexRow, {margin: '0 0 1rem 0'}">
                  <div class="col-md-8 col-sm-8 col-xs-12 no-padding">
                    <label class="col-md-12 col-sm-12 col-xs-12 " :style="stylesHC604.labelLeft"
                      >¿Le satisface como su familia acepta y apoya sus deseos
                      de emprender nuevas actividades?</label
                    >
                  </div>
                  <div class="col-md-4 col-sm-4 col-xs-12 no-padding" :style="stylesHC604.flexRow">
                    <div class="col-12 no-padding" id="datoSatiFamiAceptEmp">
                      <input
                        :value="descripResp(apgar[index].sati_fami_acept_emp)"
                        class="form-control"
                        type="text"
                        disabled
                        data-orden="1"
                        style="text-align: center"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12 no-padding" :style="stylesHC604.flexRow, {margin: '0 0 1rem 0'}">
                  <div class="col-md-8 col-sm-8 col-xs-12 no-padding">
                    <label class="col-md-12 col-sm-12 col-xs-12 " :style="stylesHC604.labelLeft"
                      >¿Le satisface como su familia le expresa afecto y
                      responde a sus emociones como rabia, tristeza y
                      amor?</label
                    >
                  </div>
                  <div class="col-md-4 col-sm-4 col-xs-12 no-padding" :style="stylesHC604.flexRow">
                    <div class="col-12 no-padding" id="datoSatiFamiExpAfect">
                      <input
                        :value="descripResp(apgar[index].sati_fami_exp_afect)"
                        class="form-control"
                        type="text"
                        disabled
                        data-orden="1"
                        style="text-align: center"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12 no-padding" :style="stylesHC604.flexRow, {margin: '0 0 1rem 0'}">
                  <div class="col-md-8 col-sm-8 col-xs-12 no-padding">
                    <label class="col-md-12 col-sm-12 col-xs-12 " :style="stylesHC604.labelLeft"
                      >¿Le satisface como comparte en familia el tiempo libre
                      para estar juntos, Los espacios en la casa, el dinero,
                      etc.?</label
                    >
                  </div>
                  <div class="col-md-4 col-sm-4 col-xs-12 no-padding" :style="stylesHC604.flexRow">
                    <div class="col-12 no-padding" id="datoSatiAcomTiempFami">
                      <input
                        :value="descripResp(apgar[index].sati_comp_tiemp_fami)"  
                        class="form-control"
                        type="text"
                        disabled
                        data-orden="1"
                        style="text-align: center"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-12 no-padding" style="text-align: center">
                <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                  <label style="color: #476fad" class="col-md-12 col-sm-12 col-xs-12">
                    Opciones de respuesta: 0: Nunca, 1: Casi nunca, 2: Algunas veces, 3: Casi siempre, 4: Siempre
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
});
