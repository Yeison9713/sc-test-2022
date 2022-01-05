/*
  Pregunta  1- PREGUNTAS COVID19
            2- RECOMENDACIONES COVID19
            3- CONSENTIMIENTO ACOMPAÑANTE COVID19
            4- CASOS CONFIRMADOS DE COVID19
*/

var component_hc890h = Vue.component("content_hc890h", {
  props: {
    params: {
      estado: false,
      pregunta: 0,
      ciudades: [],
      paises: [],
    },
    data: {
      acompanante_covid19: {},
      paci_confirmado: {},
    },
  },
  data() {
    return {
      covid: this.data,
      modal_acompañante: false,
      modal_paci_confirmado: false,
      descripcion: {
        ciudad_dentro: "",
        pais_fuera: "",
        consent_infor: "",
        tipo_id_acompa: "",
        lugar_exp: "",
      },
    };
  },
  watch: {
    "params.estado": function (val) {
      if (val) {
        switch (this.params.pregunta) {
          case 1:
            this.verificarDescripciones();
            break;
          case 2:
            this._preguntarRecomendaciones();
            break;
          case 3:
            this.modal_acompañante = true;
            this._validarGenerarConsentimiento();
            break;
          case 4:
            this.modal_paci_confirmado = true;
            this._validarDiabetes();
            break;
        }
      }
    },
    "covid.consent_infor_covid19": function (val) {
      val = val || "";
      let consulta = _tipoJsonHc("si_no_aplica").find((e) => e.COD == val);
      if (consulta) this.descripcion.consent_infor = consulta.DESCRIP;
      else this.descripcion.consent_infor = "";
    },
    "covid.acompanante_covid19.tipo_id_covid19": function (val) {
      val = val || "";
      let consulta = _tipoJsonHc("tipo_identicacion").find((e) => e.COD == val);
      if (consulta) this.descripcion.tipo_id_acompa = consulta.DESCRIP;
      else this.descripcion.tipo_id_acompa = "";
    },
    "covid.acompanante_covid19.lugar_id_covid19": function (val) {
      val = val || "";
      let consulta = this.params.ciudades.find((e) => e.COD == val.trim());
      if (consulta) this.descripcion.lugar_exp = consulta.NOMBRE;
      else this.descripcion.lugar_exp = "";
    },
    "covid.lugar_dentro_covid19": function (val) {
      this.buscarCiudad();
    },
    "covid.lugar_fuera_covid19": function (val) {
      this.buscarPais();
    },
  },
  methods: {
    verificarDescripciones() {
      if (this.covid.viaje_dentro_covid19 == "S" && this.descripcion.ciudad_dentro.trim() == "") this.buscarCiudad();
      if (this.covid.viaje_fuera_covid19 == "S" && this.descripcion.pais_fuera.trim() == "") this.buscarPais();

      this._validarFiebre();
    },
    buscarCiudad() {
      let val = this.covid.lugar_dentro_covid19 || "";
      let consulta = this.params.ciudades.find((e) => e.COD == val);
      if (consulta) this.descripcion.ciudad_dentro = consulta.NOMBRE;
      else this.descripcion.ciudad_dentro = "";
    },
    buscarPais() {
      let val = this.covid.lugar_fuera_covid19 || "";
      let consulta = this.params.paises.find((e) => e.CODIGO == val);
      if (consulta) this.descripcion.pais_fuera = consulta.DESCRIP;
      else this.descripcion.pais_fuera = "";
    },
    _validarFiebre() {
      let _this = this;
      validarInputs(
        {
          form: "#validarFiebre",
          orden: "1",
        },
        this._escape,
        () => {
          let fiebre = _this._validarSioNo(_this.covid.fiebre_covid19);
          _this.covid.fiebre_covid19 = fiebre;
          _this._validarTos();
        }
      );
    },
    _validarTos() {
      let _this = this;
      validarInputs(
        {
          form: "#validarTos",
          orden: "1",
        },
        _this._validarFiebre,
        () => {
          let tos = _this._validarSioNo(_this.covid.tos_covid19);
          _this.covid.tos_covid19 = tos;
          _this._validarDisnea();
        }
      );
    },
    _validarDisnea() {
      let _this = this;
      validarInputs(
        {
          form: "#validarDisnea",
          orden: "1",
        },
        _this._validarTos,
        () => {
          let disnea = _this._validarSioNo(_this.covid.disnea_covid19);
          _this.covid.disnea_covid19 = disnea;
          _this._validarMalestar();
        }
      );
    },
    _validarMalestar() {
      let _this = this;
      validarInputs(
        {
          form: "#validarMalestar",
          orden: "1",
        },
        _this._validarDisnea,
        () => {
          let malestar = _this._validarSioNo(_this.covid.malestar_covid19);
          _this.covid.malestar_covid19 = malestar;
          _this._validarRinorrea();
        }
      );
    },
    _validarRinorrea() {
      let _this = this;
      validarInputs(
        {
          form: "#validarRinorrea",
          orden: "1",
        },
        _this._validarMalestar,
        () => {
          let rinorrea = _this._validarSioNo(_this.covid.rinorrea_covid19);
          _this.covid.rinorrea_covid19 = rinorrea;
          _this._validarOdinofagia();
        }
      );
    },
    _validarOdinofagia() {
      let _this = this;
      validarInputs(
        {
          form: "#validarOdinofagia",
          orden: "1",
        },
        _this._validarRinorrea,
        () => {
          let odinofagia = _this._validarSioNo(_this.covid.odinofagia_covid19);
          _this.covid.odinofagia_covid19 = odinofagia;
          _this._validarViaje();
        }
      );
    },
    _validarViaje() {
      let _this = this;
      validarInputs(
        {
          form: "#validarViaje",
          orden: "1",
        },
        _this._validarOdinofagia,
        () => {
          let viaje = _this._validarSioNo(_this.covid.viaje_covid19);
          _this.covid.viaje_covid19 = viaje;
          _this._validarContacto();
        }
      );
    },
    _validarContacto() {
      let _this = this;
      validarInputs(
        {
          form: "#validarContacto",
          orden: "1",
        },
        _this._validarViaje,
        () => {
          let contacto = _this._validarSioNo(_this.covid.contacto_covid19);
          _this.covid.contacto_covid19 = contacto;
          _this._validarPersonalSalud();
        }
      );
    },
    _validarPersonalSalud() {
      let _this = this;
      validarInputs(
        {
          form: "#validarPersonalSalud",
          orden: "1",
        },
        _this._validarContacto,
        () => {
          let personal_salud = _this._validarSioNo(_this.covid.personal_salud_covid19);
          _this.covid.personal_salud_covid19 = personal_salud;
          _this._validarViajeDentro();
        }
      );
    },
    _validarViajeDentro() {
      let _this = this;
      validarInputs(
        {
          form: "#validarViajeDentro",
          orden: "1",
        },
        _this._validarPersonalSalud,
        () => {
          let viaje = _this._validarSioNo(_this.covid.viaje_dentro_covid19);
          _this.covid.viaje_dentro_covid19 = viaje;

          if (viaje == "S") {
            _this._ventanaCiudadViajeDentro();
          } else {
            _this.covid.lugar_dentro_covid19 = "";
            _this.covid.tiempo_dentro_covid19 = "";
            _this.descripcion.ciudad_dentro = "";
            _this._validarViajeFuera();
          }
        }
      );
    },
    _ventanaCiudadViajeDentro() {
      let _this = this;

      _ventanaDatos({
        titulo: "Ventana ciudades",
        columnas: ["COD", "NOMBRE", "DEPART"],
        data: _this.params.ciudades,
        ancho: "70%",
        callback_esc: _this._validarViajeDentro,
        callback: (data) => {
          if (_this.params.pregunta == 1) {
            _this.covid.lugar_dentro_covid19 = data.COD.trim();
            _this.descripcion.ciudad_dentro = data.NOMBRE.trim();
            _this.covid.tiempo_dentro_covid19 = parseFloat(_this.covid.tiempo_dentro_covid19) || 0;
            _this._validarTiempoViajeDentro();
          } else {
            _this.covid.acompanante_covid19.lugar_id_covid19 = data.COD.trim();
            this.$refs.lugar_exp.focus();
          }
        },
      });
    },
    _validarTiempoViajeDentro() {
      let _this = this;
      validarInputs(
        {
          form: "#validarTiempoViajeDentro",
          orden: "1",
        },
        _this._ventanaCiudadViajeDentro,
        _this._validarViajeFuera
      );
    },
    _validarViajeFuera() {
      let _this = this;
      validarInputs(
        {
          form: "#validarViajeFuera",
          orden: "1",
        },
        _this._validarViajeDentro,
        () => {
          let viaje = _this._validarSioNo(_this.covid.viaje_fuera_covid19);
          _this.covid.viaje_fuera_covid19 = viaje;

          if (viaje == "S") {
            _this._ventanaCiudadViajeFuera();
          } else {
            _this.descripcion.pais_fuera = "";
            _this.covid.lugar_fuera_covid19 = "";
            _this.covid.tiempo_fuera_covid19 = "";
            _this._validarConsentInfor();
          }
        }
      );
    },
    _ventanaCiudadViajeFuera() {
      let _this = this;
      _ventanaDatos({
        titulo: "Ventana paises",
        columnas: ["CODIGO", "DESCRIP"],
        data: _this.params.paises,
        ancho: "70%",
        callback_esc: () => {
          _this._validarViajeFuera();
        },
        callback: (data) => {
          _this.covid.lugar_fuera_covid19 = data.CODIGO.trim();

          _this.covid.tiempo_fuera_covid19 = parseFloat(_this.covid.tiempo_fuera_covid19) || 0;
          _this._validarTiempoViajeFuera();
        },
      });
    },
    _validarTiempoViajeFuera() {
      let _this = this;
      validarInputs(
        {
          form: "#validarTiempoViajeFuera",
          orden: "1",
        },
        _this._ventanaCiudadViajeFuera,
        _this._validarConsentInfor
      );
    },
    _validarConsentInfor() {
      let _this = this;
      POPUP(
        {
          titulo: "Consentimiento",
          array: _tipoJsonHc("si_no_aplica"),
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: _this.covid.consent_infor_covid19,
          callback_f: _this._validarPersonalSalud,
        },
        (data) => {
          _this.covid.consent_infor_covid19 = data.COD;
          _this._terminar();
        }
      );
    },
    //  termina preguntas 1
    _preguntarRecomendaciones() {
      CON851P(
        "Desea imprimir recomendaciones de COVID-19 ?",
        () => {
          this.covid.recomendacion_covid19 = "N";
          this._terminar();
        },
        () => {
          this.covid.recomendacion_covid19 = "S";
          this._terminar();
        }
      );
    },
    // termina preguntas 2
    _validarGenerarConsentimiento() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_generar_consentimiento",
          orden: "1",
        },
        _this._escape,
        () => {
          let consentimiento = _this.covid.consenti_acomp_covid19 || "";
          consentimiento = consentimiento.toUpperCase();

          if (consentimiento == "S") {
            _this.covid.consenti_acomp_covid19 = consentimiento;
            _this._validarIdAcompa();
          } else if (consentimiento == "N") {
            _this.covid.consenti_acomp_covid19 = consentimiento;
            _this._terminar();
          } else {
            _this.covid.consenti_acomp_covid19 = "";
            _this._validarGenerarConsentimiento();
          }
        }
      );
    },
    _validarIdAcompa() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_id_acompa",
          orden: "1",
        },
        _this._validarGenerarConsentimiento,
        () => {
          _this._validarTipoidAcompa();
        }
      );
    },
    _validarTipoidAcompa() {
      let _this = this;
      POPUP(
        {
          array: _tipoJsonHc("tipo_identicacion"),
          titulo: "Tipo identificacion",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: _this.covid.acompanante_covid19.tipo_id_covid19,
          callback_f: () => {
            setTimeout(() => {
              _this._validarIdAcompa();
            }, 300);
          },
        },
        (data) => {
          _this.covid.acompanante_covid19.tipo_id_covid19 = data.COD;
          setTimeout(_this._onValidarTipoIdAcompa, 300);
        }
      );
    },
    _onValidarTipoIdAcompa() {
      let tipo = this.covid.acompanante_covid19.tipo_id_covid19;
      let id = parseFloat(this.covid.acompanante_covid19.ident_acomp_covid19);
      if (tipo == "CC") {
        if (id < 1000 || id > 1999000000 || (id > 100000000 && id < 1000000000)) {
          plantillaError("78", "78", "HC890H", this._validarTipoidAcompa);
        } else {
          this._validarLugarExpAcompa();
        }
      } else {
        this._validarLugarExpAcompa();
      }
    },
    _validarLugarExpAcompa() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_lugar_exp",
          orden: "1",
        },
        _this._validarTipoidAcompa,
        _this._validarPrimerApelAcompa
      );
    },
    _validarPrimerApelAcompa() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_primer_apel",
          orden: "1",
        },
        _this._validarLugarExpAcompa,
        _this._validarSegundoApelAcompa
      );
    },
    _validarSegundoApelAcompa() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_segundo_apel",
          orden: "1",
        },
        _this._validarPrimerApelAcompa,
        _this._validarPrimerNombreAcompa
      );
    },
    _validarPrimerNombreAcompa() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_primer_nombre",
          orden: "1",
        },
        _this._validarSegundoApelAcompa,
        _this._validarSegundoNombreAcompa
      );
    },
    _validarSegundoNombreAcompa() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_sgundo_nombre",
          orden: "1",
        },
        _this._validarPrimerNombreAcompa,
        _this._terminar
      );
    },
    // termina preguntas 3
    _validarDiabetes() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_diabetes",
          orden: "1",
        },
        _this._escape,
        () => {
          let diabetes = _this._validarSioNo(_this.covid.paci_confirmado.diabetes_covid19);

          _this.covid.paci_confirmado.diabetes_covid19 = diabetes;
          _this._validarEnfCardiovascular();
        }
      );
    },

    _validarEnfCardiovascular() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_enf_cardio",
          orden: "1",
        },
        _this._validarDiabetes,
        () => {
          let cardiovascular = _this._validarSioNo(_this.covid.paci_confirmado.enf_cardiovas_covid19);

          _this.covid.paci_confirmado.enf_cardiovas_covid19 = cardiovascular;
          _this._validarFallaRenal();
        }
      );
    },
    _validarFallaRenal() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_falla_renal",
          orden: "1",
        },
        _this._validarEnfCardiovascular,
        () => {
          let falla_renal = _this._validarSioNo(_this.covid.paci_confirmado.falla_renal_covid19);
          _this.covid.paci_confirmado.falla_renal_covid19 = falla_renal;
          _this._validarVih();
        }
      );
    },
    _validarVih() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_vih_inmuno",
          orden: "1",
        },
        _this._validarFallaRenal,
        () => {
          let vih = _this._validarSioNo(_this.covid.paci_confirmado.vih_covid19);
          _this.covid.paci_confirmado.vih_covid19 = vih;
          _this._validarCancer();
        }
      );
    },
    _validarCancer() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_cancer",
          orden: "1",
        },
        _this._validarVih,
        () => {
          let cancer = _this._validarSioNo(_this.covid.paci_confirmado.cancer_covid19);
          _this.covid.paci_confirmado.cancer_covid19 = cancer;
          _this._validarEnfAutoInmunes();
        }
      );
    },
    _validarEnfAutoInmunes() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_enf_autoinmunes",
          orden: "1",
        },
        _this._validarCancer,
        () => {
          let autoinmunes = _this._validarSioNo(_this.covid.paci_confirmado.enf_autoinmun_covid19);
          _this.covid.paci_confirmado.enf_autoinmun_covid19 = autoinmunes;
          _this._validarHipotiroidismo();
        }
      );
    },
    _validarHipotiroidismo() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_hipotiroidismo",
          orden: "1",
        },
        _this._validarEnfAutoInmunes,
        () => {
          let hipotiroidismo = _this._validarSioNo(_this.covid.paci_confirmado.hipotiroid_covid19);
          _this.covid.paci_confirmado.hipotiroid_covid19 = hipotiroidismo;
          _this._validarCortico();
        }
      );
    },
    _validarCortico() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_cortico",
          orden: "1",
        },
        _this._validarHipotiroidismo,
        () => {
          let cortico = _this._validarSioNo(_this.covid.paci_confirmado.cortico_inmuno_covid19);
          _this.covid.paci_confirmado.cortico_inmuno_covid19 = cortico;
          _this._validarEpocAsma();
        }
      );
    },
    _validarEpocAsma() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_epoc_asma",
          orden: "1",
        },
        _this._validarCortico,
        () => {
          let epoc_asma = _this._validarSioNo(_this.covid.paci_confirmado.epoc_asma_covid19);
          _this.covid.paci_confirmado.epoc_asma_covid19 = epoc_asma;
          _this._validarMalNutricion();
        }
      );
    },
    _validarMalNutricion() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_mal_nutricion",
          orden: "1",
        },
        _this._validarEpocAsma,
        () => {
          let nutricion = _this._validarSioNo(_this.covid.paci_confirmado.mal_nutricion_covid19);
          _this.covid.paci_confirmado.mal_nutricion_covid19 = nutricion;
          _this._validarFumadores();
        }
      );
    },
    _validarFumadores() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_fumadores",
          orden: "1",
        },
        _this._validarMalNutricion,
        () => {
          let fumadores = _this._validarSioNo(_this.covid.paci_confirmado.fumadores_covid19);
          _this.covid.paci_confirmado.fumadores_covid19 = fumadores;
          _this._terminar();
        }
      );
    },
    // termina preguntas 4
    _validarSioNo(val) {
      val = (val || "").toUpperCase();
      return val == "S" ? val : "N";
    },
    _ventanaPacientesCovid() {
      parametros = {
        dll: "PACIENTES",
        valoresselect: ["Nombre"],
        f8data: "PACIENTES",
        columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "EPS" }, { title: "EDAD" }],
        callback: (data) => {
          let nombre = data.NOMBRE || "";
          let ciudad = data.CIUDAD.split("-")[0] || "";

          this.covid.acompanante_covid19.ident_acomp_covid19 = parseFloat(data.COD);
          this.covid.acompanante_covid19.lugar_id_covid19 = ciudad.trim();
          this.covid.acompanante_covid19.primer_apel_covid19 = nombre.substr(0, 15).trim();
          this.covid.acompanante_covid19.segundo_apel_covid19 = nombre.substr(15, 15).trim();
          this.covid.acompanante_covid19.primer_nom_covid19 = nombre.substr(30, 12).trim();
          this.covid.acompanante_covid19.segundo_nom_covid19 = nombre.substr(42, 12).trim();

          setTimeout(() => {
            this.$refs.id_acompa.focus();
          }, 250);
        },
        cancel: (f) => {
          this.$refs.id_acompa.focus();
        },
      };
      F8LITE(parametros);
    },
    _escape() {
      this.modal_acompañante = false;
      this.modal_paci_confirmado = false;
      this.$emit("callback_esc", this.params.pregunta);
    },
    _terminar() {
      this.modal_acompañante = false;
      this.modal_paci_confirmado = false;
      this.$emit("callback", this.params.pregunta, this.covid);
    },
  },
  template: `<div>
                <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                  <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">

                      <div class="col-md-3 no-padding" style="text-align: left;border-right:  1.5px solid #ececec">
                          <div class="salto-linea"></div>
                          <div class="salto-linea"></div>
                          <div class="salto-linea"></div>

                          <div class="col-md-12 col-sm-12 col-xs-12 form-group " id="validarFiebre">
                              <label class="label-center">Fiebre ?</label>
                              <div class="col-md-4 inline-inputs float-right">
                                  <input type="text" disabled="disabled"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                      v-model="covid.fiebre_covid19" data-orden="1" maxlength="1" placeholder="N">
                              </div>
                          </div>

                          <div class="salto-linea"></div>

                          <div class="col-md-12 col-sm-12 col-xs-12 form-group " id="validarTos">
                              <label class="label-center">Tos ?</label>
                              <div class="col-md-4 inline-inputs float-right">
                                  <input type="text" disabled="disabled"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                      v-model="covid.tos_covid19" data-orden="1" maxlength="1" placeholder="N">
                              </div>
                          </div>

                          <div class="salto-linea"></div>

                          <div class="col-md-12 col-sm-12 col-xs-12 form-group " id="validarDisnea">
                              <label class="label-center">Disnea ?</label>
                              <div class="col-md-4 inline-inputs float-right">
                                  <input type="text" disabled="disabled"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                      v-model="covid.disnea_covid19" data-orden="1" maxlength="1" placeholder="N">
                              </div>
                          </div>

                          <div class="salto-linea"></div>

                          <div class="col-md-12 col-sm-12 col-xs-12 form-group " id="validarMalestar">
                              <label class="label-center">Malestar general ?</label>
                              <div class="col-md-4 inline-inputs float-right">
                                  <input type="text" disabled="disabled"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                      v-model="covid.malestar_covid19" data-orden="1" maxlength="1" placeholder="N">
                              </div>
                          </div>

                          <div class="salto-linea"></div>

                          <div class="col-md-12 col-sm-12 col-xs-12 form-group " id="validarRinorrea">
                              <label class="label-center">Rinorrea ?</label>
                              <div class="col-md-4 inline-inputs float-right">
                                  <input type="text" disabled="disabled"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                      v-model="covid.rinorrea_covid19" data-orden="1" maxlength="1" placeholder="N">
                              </div>
                          </div>

                          <div class="salto-linea"></div>

                          <div class="col-md-12 col-sm-12 col-xs-12 form-group " id="validarOdinofagia">
                              <label class="label-center">Odinofagia ?</label>
                              <div class="col-md-4 inline-inputs float-right">
                                  <input type="text" disabled="disabled"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                      v-model="covid.odinofagia_covid19" data-orden="1" maxlength="1" placeholder="N">
                              </div>
                          </div>

                          <div class="salto-linea"></div>
                          <div class="salto-linea"></div>
                          <div class="salto-linea"></div>

                      </div>

                      <div class="col-md-9 col-sm-9 col-xs-12" style="text-align: left; padding-left: 15px;">
                          <div class="col-md-12 no-padding">
                              <div class="col-md-12 col-sm-12 col-xs-12 form-group " id="validarViaje">
                                  <label class="label-center">Transitó o viajó en los últimos 14 días
                                      por
                                      un país o región con circulación
                                      viral confirmada de COVID 19 ?</label>
                                  <div class="col-md-1 no-padding inline-inputs float-right">
                                      <input type="text" disabled="disabled"
                                          class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                          v-model="covid.viaje_covid19" data-orden="1" maxlength="1" placeholder="N">
                                  </div>
                              </div>

                              <div class="salto-linea"></div>

                              <div class="col-md-12 col-sm-12 col-xs-12 form-group " id="validarContacto">
                                  <label class="label-center">En los últimos 14 días ha estado en
                                      contacto
                                      con alguna persona que haya sido
                                      diagnosticada con COVID 19 ?</label>
                                  <div class="col-md-1 no-padding inline-inputs float-right">
                                      <input type="text" disabled="disabled"
                                          class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                          v-model="covid.contacto_covid19" data-orden="1" maxlength="1" placeholder="N">
                                  </div>
                              </div>

                              <div class="salto-linea"></div>

                              <div class="col-md-12 col-sm-12 col-xs-12 form-group " id="validarPersonalSalud">
                                  <label class="label-center">Es personal de la salud u otro ambito
                                      hospitalario con contacto estrecho de
                                      caso confirmado o probable para COVID 19 ?</label>
                                  <div class="col-md-1 no-padding inline-inputs float-right">
                                      <input type="text" disabled="disabled"
                                          class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                          v-model="covid.personal_salud_covid19" data-orden="1" maxlength="1" placeholder="N">
                                  </div>
                              </div>

                              <div class="salto-linea"></div>
                              <div class="salto-linea"></div>
                          </div>

                          <div class="col-md-12 no-padding" style="border-top: 1.5px solid rgb(236, 236, 236);">

                              <div class="salto-linea"></div>
                              <div class="salto-linea"></div>

                              <div class="col-md-6 col-sm-12 col-xs-12 form-group " id="validarViajeDentro">
                                  <label class="label-center">Ha viajado dentro del país en los
                                      últimos 14
                                      días ?</label>
                                  <div class="col-md-2 no-padding inline-inputs float-right">
                                      <input type="text" disabled="disabled"
                                          class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                          v-model="covid.viaje_dentro_covid19" data-orden="1" maxlength="1" placeholder="N">
                                  </div>
                              </div>

                              <div class="col-md-4 col-sm-12 col-xs-12 form-group " v-if="covid.viaje_dentro_covid19 == 'S'">
                                  <label class="label-center">A donde ?</label>
                                  <div class="col-md-8 no-padding inline-inputs float-right">
                                      <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled"
                                          v-model="descripcion.ciudad_dentro">
                                  </div>
                              </div>

                              <div class="col-md-2 col-sm-12 col-xs-12 form-group " id="validarTiempoViajeDentro"
                                  v-if="covid.viaje_dentro_covid19 == 'S'">
                                  <label class="label-center">Dias ?</label>
                                  <div class="col-md-5 no-padding inline-inputs float-right">
                                      <input type="number" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled"
                                          v-model="covid.tiempo_dentro_covid19" data-orden="1" maxlength="3"
                                          style="text-align: center; padding-right: 0;" required>
                                  </div>
                              </div>

                              <div class="salto-linea"></div>

                              <div class="col-md-6 col-sm-12 col-xs-12 form-group " id="validarViajeFuera">
                                  <label class="label-center">Ha viajado fuera del país en los últimos
                                      14
                                      días ?</label>
                                  <div class="col-md-2 no-padding inline-inputs float-right">
                                      <input type="text" disabled="disabled"
                                          class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                          v-model="covid.viaje_fuera_covid19" data-orden="1" maxlength="1" placeholder="N">
                                  </div>
                              </div>

                              <div class="col-md-4 col-sm-12 col-xs-12 form-group " v-if="covid.viaje_fuera_covid19 == 'S'">
                                  <label class="label-center">A donde ?</label>
                                  <div class="col-md-8 no-padding inline-inputs float-right">
                                      <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled"
                                          v-model="descripcion.pais_fuera">
                                  </div>
                              </div>

                              <div class="col-md-2 col-sm-12 col-xs-12 form-group " id="validarTiempoViajeFuera"
                                  v-if="covid.viaje_fuera_covid19 == 'S'">
                                  <label class="label-center">Dias ?</label>
                                  <div class="col-md-5 no-padding inline-inputs float-right">
                                      <input type="number" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled"
                                          v-model="covid.tiempo_fuera_covid19" data-orden="1" maxlength="3"
                                          style="text-align: center; padding-right: 0;" required>
                                  </div>
                              </div>

                              <div class="salto-linea"></div>
                              <div class="salto-linea"></div>
                              
                            </div>
                            <div class="col-md-12 no-padding" style="border-top: 1.5px solid rgb(236, 236, 236);">
                              <div class="salto-linea"></div>
                              <div class="salto-linea"></div>

                              <div class="col-md-12 no-padding" style="display: flex;; justify-content: center">
                                  <div class="col-md-7 col-sm-12 col-xs-12 form-group">
                                     <label class="label-center col-md-10 col-sm-8 col-xs-8">Usuario da consentimiento informado para toma
                                         de la muestra ?</label>
                                     <div class="input-group col-md-2 col-sm-4 col-xs-4 float-right">
                                         <input type="text" class="form-control" v-model="descripcion.consent_infor" disabled="disabled">
                                     </div>
                                  </div>
                               </div>
                          </div>
                      </div>
                  </div>
                </div>
                

                <transition name="modal_prosoft" v-if="modal_acompañante">
                    <div class="overlay_prosoft">
                        <div class="modal_prosoft" style="width: 1000px !important;">
                            <div class="container_prosoft">
                                <div class="header_prosoft">
                                    <p style="padding: 15px 25px;margin: 0 auto;">
                                        Datos acompañante de covid-19 (CORONAVIRUS)
                                    </p>
                                </div>
                                <div class="body_prosoft">
                                    <div class="col-md-12">
                                        <div class="portlet light no-padding">
                                            <div class="portlet-body">
                                                <form class="form-horizontal" onsubmit="return false;">
                                                    <div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding">

                                                      <div class="col-md-12" style="display: flex; justify-content: center">
                                                        <div class="col-md-11 col-sm-11 col-xs-12" id="fase_generar_consentimiento">
                                                          <label class="label-center float-left">Desea generar consentimiento informado para
                                                            acompanante de caso probable/confirmado de COVID19</label>
                                                          <div class="inline-inputs col-md-2 col-sm-2 col-xs-2 float-right">
                                                              <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                                              v-model="covid.consenti_acomp_covid19" data-orden="1" maxlength="1" placeholder="N" disabled>
                                                          </div>
                                                        </div>
                                                      </div>

                                                      <div class="salto-linea"></div>
                                                      <div class="salto-linea"></div>

                                                      <div class="col-md-3 col-sm-3 col-xs-3" id="fase_id_acompa">
                                                          <label class="float-left">Id. Acompañante</label>
                                                          <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                                              <input type="number" class="form-control col-md-12 col-sm-12 col-xs-12" 
                                                              v-model="covid.acompanante_covid19.ident_acomp_covid19" data-orden="1" maxlength="15" 
                                                              v-on:keyup.119="_ventanaPacientesCovid" disabled ref="id_acompa">
                                                          </div>
                                                      </div>
                                                      <div class="col-md-4 col-sm-4 col-xs-4">
                                                          <label class="float-left">Tipo documento</label>
                                                          <div class="input-group col-md-12 col-sm-12 col-xs-12 text-descrip">
                                                              <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12" 
                                                                v-model="covid.acompanante_covid19.tipo_id_covid19" maxlength="15" disabled>
                                                              <input type="text" class="form-control" v-model="descripcion.tipo_id_acompa" disabled>
                                                          </div>
                                                      </div>
                                                      <div class="col-md-5 col-sm-5 col-xs-5" id="fase_lugar_exp">
                                                            <label class="float-left">Lugar expedición</label>
                                                            <div class="input-group col-md-12 col-sm-12 col-xs-12 text-descrip">
                                                                <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12" 
                                                                  v-model="covid.acompanante_covid19.lugar_id_covid19" data-orden="1"
                                                                    maxlength="5" disabled v-on:keyup.119="_ventanaCiudadViajeDentro" ref="lugar_exp">
                                                                <input type="text" class="form-control" v-model="descripcion.lugar_exp" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="salto-linea"></div>
                                                        <div class="col-md-3 col-sm-3 col-xs-3" id="fase_primer_apel">
                                                            <label class="float-left">Primer apellido</label>
                                                            <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                                                <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12" 
                                                                  v-model="covid.acompanante_covid19.primer_apel_covid19" data-orden="1"
                                                                    maxlength="15" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3 col-sm-3 col-xs-3" id="fase_segundo_apel">
                                                            <label class="float-left">Segundo apellido</label>
                                                            <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                                                <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12" 
                                                                  v-model="covid.acompanante_covid19.segundo_apel_covid19" data-orden="1"
                                                                    maxlength="15" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3 col-sm-3 col-xs-3" id="fase_primer_nombre">
                                                            <label class="float-left">Primer nombre</label>
                                                            <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                                                <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12" 
                                                                  v-model="covid.acompanante_covid19.primer_nom_covid19" data-orden="1"
                                                                    maxlength="15" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3 col-sm-3 col-xs-3" id="fase_sgundo_nombre">
                                                            <label class="float-left">Segundo nombre</label>
                                                            <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                                                <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12" 
                                                                  v-model="covid.acompanante_covid19.segundo_nom_covid19" data-orden="1"
                                                                    maxlength="15" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="salto-linea"></div>
                                                        <div class="salto-linea"></div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                  <div style="clear: both;"></div>
                              </div>
                            </div>
                        </div>
                    </div>
                </transition>

                <transition name="modal_prosoft" v-if="modal_paci_confirmado">
                    <div class="overlay_prosoft">
                        <div class="modal_prosoft" style="width: 850px !important;">
                            <div class="container_prosoft">
                                <div class="header_prosoft">
                                    <p style="padding: 15px 25px;margin: 0 auto;">
                                        Paciente confirmado covid19 (CORONAVIRUS)
                                    </p>
                                </div>
                                <div class="body_prosoft">
                                    <div class="col-md-12">
                                        <div class="portlet light no-padding">
                                            <div class="portlet-body">
                                                <form class="form-horizontal" onsubmit="return false;">
                                                    <div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding">
                                                      <div class="col-md-5 col-sm-5 col-xs-5" id="fase_diabetes">
                                                        <label class="label-center float-left">Diabetes ?</label>
                                                        <div class="inline-inputs col-md-4 col-sm-4 col-xs-4 float-right">
                                                            <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                                                v-model="covid.paci_confirmado.diabetes_covid19" data-orden="1" maxlength="1" placeholder="N" disabled>
                                                        </div>
                                                      </div>

                                                      <div class="col-md-7 col-sm-7 col-xs-7" id="fase_enf_cardio">
                                                          <label class="label-center float-left">Enfermedad cardiovascular (incluye HTA y
                                                              ACV) ?</label>
                                                          <div class="inline-inputs col-md-3 col-sm-3 col-xs-3 float-right">
                                                              <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                                              v-model="covid.paci_confirmado.enf_cardiovas_covid19"  data-orden="1" maxlength="1" placeholder="N" disabled>
                                                          </div>
                                                      </div>
                                                       <div class="salto-linea"></div>
                                
                                                      <div class="col-md-5 col-sm-5 col-xs-5" id="fase_falla_renal">
                                                          <label class="label-center float-left">Falla renal ?</label>
                                                          <div class="inline-inputs col-md-4 col-sm-4 col-xs-4 float-right">
                                                              <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                                              v-model="covid.paci_confirmado.falla_renal_covid19"  data-orden="1" maxlength="1" placeholder="N" disabled>
                                                          </div>
                                                      </div>
                                                      <div class="col-md-7 col-sm-7 col-xs-7" id="fase_vih_inmuno">
                                                          <label class="label-center float-left">VIH u otra inmunodeficiencia ?</label>
                                                          <div class="inline-inputs col-md-3 col-sm-3 col-xs-3 float-right">
                                                              <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                                              v-model="covid.paci_confirmado.vih_covid19"  data-orden="1" maxlength="1" placeholder="N" disabled>
                                                          </div>
                                                      </div>
                                                      <div class="salto-linea"></div>
                                
                                                      <div class="col-md-5 col-sm-5 col-xs-5" id="fase_cancer">
                                                          <label class="label-center float-left">Cancer ?</label>
                                                          <div class="inline-inputs col-md-4 col-sm-4 col-xs-4 float-right">
                                                              <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                                              v-model="covid.paci_confirmado.cancer_covid19"  data-orden="1" maxlength="1" placeholder="N" disabled>
                                                          </div>
                                                      </div>
                                                      <div class="col-md-7 col-sm-7 col-xs-7" id="fase_enf_autoinmunes">
                                                          <label class="label-center float-left">Enfermedades autoinmunes ?</label>
                                                          <div class="inline-inputs col-md-3 col-sm-3 col-xs-3 float-right">
                                                              <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                                              v-model="covid.paci_confirmado.enf_autoinmun_covid19"  data-orden="1" maxlength="1" placeholder="N" disabled>
                                                          </div>
                                                      </div>
                                                      <div class="salto-linea"></div>
                                
                                                      <div class="col-md-5 col-sm-5 col-xs-5" id="fase_hipotiroidismo">
                                                          <label class="label-center float-left">Hipotiroidismo ?</label>
                                                          <div class="inline-inputs col-md-4 col-sm-4 col-xs-4 float-right">
                                                              <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                                              v-model="covid.paci_confirmado.hipotiroid_covid19"  data-orden="1" maxlength="1" placeholder="N" disabled>
                                                          </div>
                                                      </div>
                                                      <div class="col-md-7 col-sm-7 col-xs-7" id="fase_cortico">
                                                          <label class="label-center float-left">Uso de corticoides o inmunosupresores ?</label>
                                                          <div class="inline-inputs col-md-3 col-sm-3 col-xs-3 float-right">
                                                              <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                                              v-model="covid.paci_confirmado.cortico_inmuno_covid19"  data-orden="1" maxlength="1" placeholder="N" disabled>
                                                          </div>
                                                      </div>
                                                      <div class="salto-linea"></div>
                                
                                                      <div class="col-md-5 col-sm-5 col-xs-5" id="fase_epoc_asma">
                                                          <label class="label-center float-left">EPOC y asma ?</label>
                                                          <div class="inline-inputs col-md-4 col-sm-4 col-xs-4 float-right">
                                                              <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                                              v-model="covid.paci_confirmado.epoc_asma_covid19"  data-orden="1" maxlength="1" placeholder="N" disabled>
                                                          </div>
                                                      </div>
                                                      <div class="col-md-7 col-sm-7 col-xs-7" id="fase_mal_nutricion">
                                                          <label class="label-center float-left">Mal nutricion (obesidad y desnutricion) ?</label>
                                                          <div class="inline-inputs col-md-3 col-sm-3 col-xs-3 float-right">
                                                              <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                                              v-model="covid.paci_confirmado.mal_nutricion_covid19"  data-orden="1" maxlength="1" placeholder="N" disabled>
                                                          </div>
                                                      </div>
                                                      <div class="salto-linea"></div>
                                                      <div class="col-md-5 col-sm-5 col-xs-5" id="fase_fumadores">
                                                          <label class="label-center float-left">Fumadores ?</label>
                                                          <div class="inline-inputs col-md-4 col-sm-4 col-xs-4 float-right">
                                                              <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12 center uppercase"
                                                              v-model="covid.paci_confirmado.fumadores_covid19"  data-orden="1" maxlength="1" placeholder="N" disabled>
                                                          </div>
                                                      </div>
                                                      <div class="salto-linea"></div>
                                                      <div class="salto-linea"></div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="clear: both;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
              </div>`,
});
