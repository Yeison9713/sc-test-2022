var component_hc890d = Vue.component("content_hc890d", {
  props: {
    params: {},
    data: {}
  },
  data() {
    return {
      currentDate: new Date().toLocaleDateString("es-CO").split("/").reverse().join(""),
      sintomatico: {},
      descripcion: {
        sintom_resp: null,
        sintom_piel: null,
        contacto_lepra: null,
        victi_maltrato: null,
        victi_violencia: null,
        enfer_mental: null,
        enfer_its: null,
        trata_its: null,
        cancer_seno: null,
        cancer_cervis: null,
        edu_autoexa_seno: null,
        citologia_previa: null,
        resul_cito_previa: null,
      },
      fecha_cuando: {
        anio: null,
        mes: null,
        dia: null,
      },
      fecha_mamo: {
        anio: null,
        mes: null,
        dia: null,
      },
      respSioNo: [
        { COD: "S", DESCRIP: "Si" },
        { COD: "N", DESCRIP: "No" },
        { COD: "X", DESCRIP: "No valora" },
      ],
      resultados_cito: [
        { COD: "1", DESCRIP: "Normal" },
        { COD: "2", DESCRIP: "Anormal" },
        { COD: "3", DESCRIP: "No aplica" },
        { COD: "4", DESCRIP: "No sabe" },
      ],
    };
  },
  watch: {
    data: {
      deep: true,
      handler: function (param) {
        this.sintomatico = { ...param };
      },
    },
    "params.estado": function (estado) {
      if (estado) this._validarSintomaResp();
    },
    "sintomatico.fecha_cito_previa": function (date) {
      date = parseFloat(date) == 0 ? "" : date;
      this.fecha_cuando.anio = date.substr(0, 4);
      this.fecha_cuando.mes = date.substr(4, 2);
      this.fecha_cuando.dia = date.substr(6, 2);
    },
    "sintomatico.fecha_ult_mamo": function (date) {
      date = parseFloat(date) == 0 ? "" : date;
      this.fecha_mamo.anio = date.substr(0, 4);
      this.fecha_mamo.mes = date.substr(4, 2);
      this.fecha_mamo.dia = date.substr(6, 2);
    },
    "sintomatico.sintom_resp": function (val) {
      val = val || "";
      let consulta = this.respSioNo.find((e) => e.COD == val);
      if (consulta) this.descripcion.sintom_resp = consulta.DESCRIP;
      else this.descripcion.sintom_resp = "";
    },
    "sintomatico.sintom_piel": function (val) {
      val = val || "";
      let consulta = this.respSioNo.find((e) => e.COD == val);
      if (consulta) this.descripcion.sintom_piel = consulta.DESCRIP;
      else this.descripcion.sintom_piel = "";
    },
    "sintomatico.contacto_lepra": function (val) {
      val = val || "";
      let consulta = this.respSioNo.find((e) => e.COD == val);
      if (consulta) this.descripcion.contacto_lepra = consulta.DESCRIP;
      else this.descripcion.contacto_lepra = "";
    },
    "sintomatico.victi_maltrato": function (val) {
      val = val || "";
      let consulta = this.respSioNo.find((e) => e.COD == val);
      if (consulta) this.descripcion.victi_maltrato = consulta.DESCRIP;
      else this.descripcion.victi_maltrato = "";
    },
    "sintomatico.victi_violencia": function (val) {
      val = val || "";
      let consulta = this.respSioNo.find((e) => e.COD == val);
      if (consulta) this.descripcion.victi_violencia = consulta.DESCRIP;
      else this.descripcion.victi_violencia = "";
    },
    "sintomatico.enfer_mental": function (val) {
      val = val || "";
      let consulta = this.respSioNo.find((e) => e.COD == val);
      if (consulta) this.descripcion.enfer_mental = consulta.DESCRIP;
      else this.descripcion.enfer_mental = "";
    },
    "sintomatico.enfer_its": function (val) {
      val = val || "";
      let consulta = this.respSioNo.find((e) => e.COD == val);
      if (consulta) this.descripcion.enfer_its = consulta.DESCRIP;
      else this.descripcion.enfer_its = "";
    },
    "sintomatico.trata_its": function (val) {
      val = val || "";
      let consulta = this.respSioNo.find((e) => e.COD == val);
      if (consulta) this.descripcion.trata_its = consulta.DESCRIP;
      else this.descripcion.trata_its = "";
    },
    "sintomatico.cancer_seno": function (val) {
      val = val || "";
      let consulta = this.respSioNo.find((e) => e.COD == val);
      if (consulta) this.descripcion.cancer_seno = consulta.DESCRIP;
      else this.descripcion.cancer_seno = "";
    },
    "sintomatico.cancer_cervis": function (val) {
      val = val || "";
      let consulta = this.respSioNo.find((e) => e.COD == val);
      if (consulta) this.descripcion.cancer_cervis = consulta.DESCRIP;
      else this.descripcion.cancer_cervis = "";
    },
    "sintomatico.edu_autoexa_seno": function (val) {
      val = val || "";
      let consulta = this.respSioNo.find((e) => e.COD == val);
      if (consulta) this.descripcion.edu_autoexa_seno = consulta.DESCRIP;
      else this.descripcion.edu_autoexa_seno = "";
    },
    "sintomatico.citologia_previa": function (val) {
      val = val || "";
      let consulta = this.respSioNo.find((e) => e.COD == val);
      if (consulta) this.descripcion.citologia_previa = consulta.DESCRIP;
      else this.descripcion.citologia_previa = "";
    },
    "sintomatico.resul_cito_previa": function (val) {
      val = val || "";
      let consulta = this.resultados_cito.find((e) => e.COD == val);
      if (consulta) this.descripcion.resul_cito_previa = consulta.DESCRIP;
      else this.descripcion.resul_cito_previa = "";
    },
  },
  created() {
    $this = this;
    this.sintomatico = this.data;
  },
  methods: {
    _validarSintomaResp() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_sintoma_resp",
          orden: "1",
        },
        _this._escape,
        () => {
          let respiratorio = _this._validarSioNo(_this.sintomatico.sintom_resp);
          _this.sintomatico.sintom_resp = respiratorio;
          _this._validarSintomaPiel();
        }
      );
    },
    _validarSintomaPiel() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_sintoma_piel",
          orden: "1",
        },
        _this._validarSintomaResp,
        () => {
          let piel = _this._validarSioNo(_this.sintomatico.sintom_piel);
          _this.sintomatico.sintom_piel = piel;
          _this._validarContactoLepra();
        }
      );
    },

    _validarContactoLepra() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_contacto_lepra",
          orden: "1",
        },
        _this._validarSintomaPiel,
        () => {
          let lepra = _this._validarSioNo(_this.sintomatico.contacto_lepra);
          _this.sintomatico.contacto_lepra = lepra;
          _this._validarMaltrato();
        }
      );
    },

    _validarMaltrato() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_maltrato",
          orden: "1",
        },
        _this._validarContactoLepra,
        () => {
          let maltrato = _this._validarSioNo(_this.sintomatico.victi_maltrato);
          _this.sintomatico.victi_maltrato = maltrato;
          _this._validarViolencia();
        }
      );
    },

    _validarViolencia() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_violencia",
          orden: "1",
        },
        _this._validarMaltrato,
        () => {
          let violencia = _this._validarSioNo(_this.sintomatico.victi_violencia);
          _this.sintomatico.victi_violencia = violencia;
          _this._validarEnfMental();
        }
      );
    },

    _validarEnfMental() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_enf_mental",
          orden: "1",
        },
        _this._validarViolencia,
        () => {
          let mental = _this._validarSioNo(_this.sintomatico.enfer_mental);
          _this.sintomatico.enfer_mental = mental;
          _this._validarIts();
        }
      );
    },

    _validarIts() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_its",
          orden: "1",
        },
        _this._validarEnfMental,
        () => {
          let its = _this._validarSioNo(_this.sintomatico.enfer_its);
          _this.sintomatico.enfer_its = its;
          if (its == "S") _this._validarCualIts();
          else {
            _this.sintomatico.cual_its = "";
            _this.sintomatico.trata_its = "";
            _this._validarSexoPaci();
          }
        }
      );
    },

    _validarCualIts() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_cual_its",
          orden: "1",
        },
        _this._validarIts,
        () => {
          _this._validarRecibioTrata();
        }
      );
    },

    _validarRecibioTrata() {
      // fase_sintoma_piel
      let _this = this;
      validarInputs(
        {
          form: "#fase_recibio_tratamiento",
          orden: "1",
        },
        _this._validarCualIts,
        () => {
          let trata_its = _this._validarSioNo(_this.sintomatico.trata_its);
          _this.sintomatico.trata_its = trata_its;
          _this._validarSexoPaci();
        }
      );
    },

    _validarSexoPaci() {
      if (this.params.sexo == "F") {
        this._validarCancerSeno();
      } else {
        this.sintomatico.cancer_seno = "";
        this.sintomatico.cancer_cervis = "";
        this.sintomatico.edu_autoexa_seno = "";
        this.sintomatico.citologia_previa = "";
        this.sintomatico.fecha_cito_previa = "";
        this.sintomatico.resul_cito_previa = "";
        this.sintomatico.fecha_ult_mamo = "";
        this._terminar();
      }
    },
    _validarCancerSeno() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_cancer_seno",
          orden: "1",
        },
        () => {
          if (_this.sintomatico.enfer_its == "S") _this._validarRecibioTrata();
          else _this._validarIts();
        },
        () => {
          let seno = _this._validarSioNo(_this.sintomatico.cancer_seno);
          _this.sintomatico.cancer_seno = seno;
          _this._validarCancerCervis();
        }
      );
    },

    _validarCancerCervis() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_cancer_cervis",
          orden: "1",
        },
        _this._validarCancerSeno,
        () => {
          let cervis = _this._validarSioNo(_this.sintomatico.cancer_cervis);
          _this.sintomatico.cancer_cervis = cervis;
          let unserv = _this.params.unserv;
          let finalidad = _this.params.finalidad;
          if (
            (unserv == 02 || unserv == 08) &&
            (finalidad == 03 ||
              finalidad == 05 ||
              finalidad == 06 ||
              finalidad == 07 ||
              finalidad == 10 ||
              finalidad == 11)
          ) {
            _this._validarAutoExamen();
          } else {
            _this.sintomatico.edu_autoexa_seno = "N"
            _this._validarCitologiaPrevia()
          };
        }
      );
    },

    _validarAutoExamen() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_educa_autoexamen",
          orden: "1",
        },
        _this._validarCancerSeno,
        () => {
          let autoexamen = _this._validarSioNo(_this.sintomatico.edu_autoexa_seno);
          _this.sintomatico.edu_autoexa_seno = autoexamen;
          _this._validarCitologiaPrevia();
        }
      );
    },

    _validarCitologiaPrevia() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_realizo_cit",
          orden: "1",
        },
        _this._validarCancerSeno,
        () => {
          let citologia_previa = _this._validarSioNo(
            _this.sintomatico.citologia_previa
          );
          _this.sintomatico.citologia_previa = citologia_previa;
          if (citologia_previa == "N") _this.sintomatico.resul_cito_previa = "3";
          if (citologia_previa == "S") _this._validarFechaCito();
          else _this._validarUltMamo();
        }
      );
    },

    _validarFechaCito() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_fecha_citologia",
          orden: "1",
        },
        _this._validarCitologiaPrevia,
        () => {
          let date = { ..._this.fecha_cuando };
          if ((!date.anio && !date.mes) || !date.dia) _this._validarUltMamo();
          else {
            let fecha = _validarFecha(date.anio, date.mes, date.dia);
            if (!fecha) _this._validarFechaCito();
            else {
              let fecha2 = fecha.split('-').join("");
              if (parseFloat(fecha2) > parseFloat(this.currentDate)) {
                _this._validarFechaCito();
              } else {
                _this.sintomatico.fecha_cito_previa = fecha.split("-").join("");
                _this._validarResultCito();
              }
            }
          }
        }
      );
    },

    _validarResultCito() {
      let _this = this;
      POPUP(
        {
          titulo: "Resultado citologia",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: _this.resultados_cito,
          callback_f: () => _this._validarFechaCito(),
          seleccion: _this.sintomatico.resul_cito_previa,
          teclaAlterna: true,
        },
        (data) => {
          _this.sintomatico.resul_cito_previa = data.COD;
          _this._validarUltMamo();
        }
      );
    },

    _validarUltMamo() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_ult_mamo",
          orden: "1",
        },
        _this._validarCitologiaPrevia,
        () => {
          let date = { ..._this.fecha_mamo };
          if ((!date.anio && !date.mes) || !date.dia) _this._terminar();
          else {
            let fecha = _validarFecha(date.anio, date.mes, date.dia);
            if (!fecha) _this._validarUltMamo();
            else {
              let fecha2 = fecha.split('-').join("");
              if (parseFloat(fecha2) > parseFloat(this.currentDate)) {
                _this._validarUltMamo();
              } else {
                _this.sintomatico.fecha_ult_mamo = fecha.split("-").join("");
                _this._terminar();
              }
            }
          }
        }
      );
    },

    _validarSioNo(val) {
      let retornar = "N";

      val = val || "";
      val = val.toUpperCase();
      switch (val) {
        case "S":
        case "N":
        case "X":
          retornar = val;
          break;
      }
      return retornar;

    },
    _escape() {
      this.$emit('callback_esc');
    },
    _terminar() {
      this.$emit('callback', this.sintomatico);
    },
  },
  template: /*html*/`<div>
                <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                    <div class="form-group box-center" style="text-align: left;">

                        <div class="form-group col-md-12 col-sm-12 col-xs-12">
                            <label class="label-center col-md-7 col-sm-7 col-xs-6">Sintomático respiratorio
                                ?</label>
                            <div class="input-group col-md-5 col-sm-5 col-xs-6 text-descrip"
                                id="fase_sintoma_resp">
                                <input type="text" class="form-control center uppercase" data-orden="1"
                                    v-model="sintomatico.sintom_resp" maxlength="1" placeholder="N" disabled>
                                <label class="descrip_hc890d">{{ descripcion.sintom_resp }}</label>
                            </div>
                        </div>

                        <div class="form-group col-md-12 col-sm-12 col-xs-12">
                            <label class="label-center col-md-7 col-sm-7 col-xs-6">Sintomático piel ?</label>
                            <div class="input-group col-md-5 col-sm-5 col-xs-6 text-descrip"
                                id="fase_sintoma_piel">
                                <input type="text" class="form-control center uppercase" data-orden="1"
                                    v-model="sintomatico.sintom_piel" maxlength="1" placeholder="N" disabled>
                                <label class="descrip_hc890d">{{ descripcion.sintom_piel }}</label>
                            </div>
                        </div>

                        <div class="form-group col-md-12 col-sm-12 col-xs-12">
                            <label class="label-center col-md-7 col-sm-7 col-xs-6">Contacto pacientes con lepra
                                ?</label>
                            <div class="input-group col-md-5 col-sm-5 col-xs-6 text-descrip"
                                id="fase_contacto_lepra">
                                <input type="text" class="form-control center uppercase" data-orden="1"
                                    v-model="sintomatico.contacto_lepra" maxlength="1" placeholder="N" disabled>
                                <label class="descrip_hc890d">{{ descripcion.contacto_lepra }}</label>
                            </div>
                        </div>

                        <div class="form-group col-md-12 col-sm-12 col-xs-12">
                            <label class="label-center col-md-7 col-sm-7 col-xs-6">Victima de maltrato ?</label>
                            <div class="input-group col-md-5 col-sm-5 col-xs-6 text-descrip" id="fase_maltrato">
                                <input type="text" class="form-control center uppercase" data-orden="1"
                                    v-model="sintomatico.victi_maltrato" maxlength="1" placeholder="N" disabled>
                                <label class="descrip_hc890d">{{ descripcion.victi_maltrato }}</label>
                            </div>
                        </div>

                        <div class="form-group col-md-12 col-sm-12 col-xs-12">
                            <label class="label-center col-md-7 col-sm-7 col-xs-6">Victima de violencia
                                ?</label>
                            <div class="input-group col-md-5 col-sm-5 col-xs-6 text-descrip"
                                id="fase_violencia">
                                <input type="text" class="form-control center uppercase" data-orden="1"
                                    v-model="sintomatico.victi_violencia" maxlength="1" placeholder="N" disabled>
                                <label class="descrip_hc890d">{{ descripcion.victi_violencia }}</label>
                            </div>
                        </div>

                        <div class="form-group col-md-12 col-sm-12 col-xs-12">
                            <label class="label-center col-md-7 col-sm-7 col-xs-6">Enfermedad mental ?</label>
                            <div class="input-group col-md-5 col-sm-5 col-xs-6 text-descrip"
                                id="fase_enf_mental">
                                <input type="text" class="form-control center uppercase" data-orden="1"
                                    v-model="sintomatico.enfer_mental" maxlength="1" placeholder="N" disabled>
                                <label class="descrip_hc890d">{{ descripcion.enfer_mental }}</label>
                            </div>
                        </div>

                        <div class="form-group col-md-12 col-sm-12 col-xs-12">
                            <label class="label-center col-md-7 col-sm-7 col-xs-6">Ha tenido tiene ITS ?</label>
                            <div class="input-group col-md-5 col-sm-5 col-xs-6 text-descrip" id="fase_its">
                                <input type="text" class="form-control center uppercase" data-orden="1"
                                    v-model="sintomatico.enfer_its" maxlength="1" placeholder="N" disabled>
                                <label class="descrip_hc890d">{{ descripcion.enfer_its }}</label>
                            </div>
                        </div>

                        <div v-if="sintomatico.enfer_its == 'S'" class="form-group col-md-12 col-sm-12 col-xs-12">
                            <label class="label-center col-md-4 col-sm-7 col-xs-6">Cual ITS ?</label>
                            <div class="input-group col-md-8 col-sm-5 col-xs-6" style="margin-bottom: 5px;"
                                id="fase_cual_its">
                                <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12"
                                    v-model="sintomatico.cual_its" data-orden="1" maxlength="30" disabled>
                            </div>
                        </div>

                        <div v-if="sintomatico.enfer_its == 'S'" class="form-group col-md-12 col-sm-12 col-xs-12">
                            <label class="label-center col-md-7 col-sm-7 col-xs-6">Recibió tratamiento ?</label>
                            <div class="input-group col-md-5 col-sm-5 col-xs-6 text-descrip"
                                id="fase_recibio_tratamiento">
                                <input type="text" class="form-control center uppercase" data-orden="1"
                                    v-model="sintomatico.trata_its" maxlength="1" placeholder="N" disabled>
                                <label class="descrip_hc890d">{{ descripcion.trata_its }}</label>
                            </div>
                        </div>

                        <div v-if="params.sexo == 'F'">
                            <div class="form-group col-md-12 col-sm-12 col-xs-12">
                                <label class="label-center col-md-7 col-sm-7 col-xs-6">Cancer de seno ?</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-6 text-descrip"
                                    id="fase_cancer_seno">
                                    <input type="text" class="form-control center uppercase" data-orden="1"
                                        v-model="sintomatico.cancer_seno" maxlength="1" placeholder="N" disabled>
                                    <label class="descrip_hc890d">{{ descripcion.cancer_seno }}</label>
                                </div>
                            </div>

                            <div class="form-group col-md-12 col-sm-12 col-xs-12">
                                <label class="label-center col-md-7 col-sm-7 col-xs-6">Cancer de cervix
                                    ?</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-6 text-descrip"
                                    id="fase_cancer_cervis">
                                    <input type="text" class="form-control center uppercase" data-orden="1"
                                        v-model="sintomatico.cancer_cervis" maxlength="1" placeholder="N" disabled>
                                    <label class="descrip_hc890d">{{ descripcion.cancer_cervis }}</label>
                                </div>
                            </div>

                            <div class="form-group col-md-12 col-sm-12 col-xs-12">
                                <label class="label-center col-md-7 col-sm-7 col-xs-6">Educa en autoexamen seno
                                    ?</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-6 text-descrip"
                                    id="fase_educa_autoexamen">
                                    <input type="text" class="form-control center uppercase" data-orden="1"
                                        v-model="sintomatico.edu_autoexa_seno" maxlength="1" placeholder="N" disabled>
                                    <label class="descrip_hc890d">{{ descripcion.edu_autoexa_seno }}</label>
                                </div>
                            </div>

                            <div class="form-group col-md-12 col-sm-12 col-xs-12">
                                <label class="label-center col-md-7 col-sm-7 col-xs-6">Se ha realizado citologia
                                    ?</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-6 text-descrip"
                                    id="fase_realizo_cit">
                                    <input type="text" class="form-control center uppercase" data-orden="1"
                                        v-model="sintomatico.citologia_previa" maxlength="1" placeholder="N" disabled>
                                    <label class="descrip_hc890d">{{ descripcion.citologia_previa }}</label>
                                </div>
                            </div>

                            <div class="form-group col-md-12 col-sm-12 col-xs-12">
                                <label class="label-center col-md-7 col-sm-7 col-xs-6">Cuando ?</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-6 input-group-date"
                                    id="fase_fecha_citologia">

                                    <input type="number" class="form-control" data-orden="1"
                                        v-model="fecha_cuando.anio" maxlength="4" disabled placeholder="AAAA">
                                    <input type="number" class="form-control" data-orden="2"
                                        v-model="fecha_cuando.mes" maxlength="2" disabled placeholder="MM">
                                    <input type="number" class="form-control" data-orden="3"
                                        v-model="fecha_cuando.dia" maxlength="2" disabled placeholder="DD" >
                                </div>
                            </div>

                            <div class="form-group col-md-12 col-sm-12 col-xs-12">
                                <label class="label-center col-md-7 col-sm-7 col-xs-6">Resultado citologia
                                    ?</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-6 text-descrip"
                                    id="fase_result_citologia">
                                    <input type="text" class="form-control center uppercase" data-orden="1"
                                        v-model="sintomatico.resul_cito_previa" maxlength="1" disabled>
                                    <label class="descrip_hc890d">{{ descripcion.resul_cito_previa }}</label>
                                </div>
                            </div>

                            <div class="form-group col-md-12 col-sm-12 col-xs-12">
                                <label class="label-center col-md-7 col-sm-7 col-xs-6">Ultima mamografía
                                    ?</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-6 input-group-date"
                                    id="fase_ult_mamo">

                                    <input type="number" class="form-control" data-orden="1"
                                        v-model="fecha_mamo.anio" maxlength="4" disabled placeholder="AAAA">
                                    <input type="number" class="form-control" data-orden="2"
                                        v-model="fecha_mamo.mes" maxlength="2"  disabled placeholder="MM">
                                    <input type="number" class="form-control" data-orden="3"
                                        v-model="fecha_mamo.dia" maxlength="2"disabled placeholder="DD">
                                </div>
                            </div>
                        </div>

                        <div class="salto-linea"></div>

                        <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: center">
                            <label style="color: #476fad">Opciones de respuesta: S: Si, N: No, X: No valorado*</label>
                        </div>
                    </div>
                </div>
            </div>`,
});
