var component_hc110 = Vue.component("content_hc110", {
  props: {
    params: {
      estado: false,
      nit: 0,
      tabla_formu: [],
      orden_medica: [],
    },
  },
  data() {
    return {
      tabla_formu: [],
      orden_medica: [],
      form: {
        crecimiento: "",
        joven_sano: "",
        citologia: "",
        agudeza_visual: "",
        adulto_mayor: "",
        plan_familiar: "",
        ctrl_prenatal: "",
        odontologia: "",
        odonto_materna: "",
        vacunacion: "",
        sintom_resp: "",
        tamizaje_prostata: "",
        tamizaje_colon: "",
        tamizaje_mama: "",
        gestion_riesgo: "",
        programa_cronico: "",
        primera_infancia: "",
        infancia: "",
        adolecencia: "",
        juventud: "",
        adultez: "",
        vejez: "",
        salud_oral: "",
        preconcepcional: "",
      },
      codigos_demanda: {
        crecimiento: "XX3330",
        joven_sano: "XX3331",
        citologia: "XX3332",
        agudeza_visual: "XX3333",
        adulto_mayor: "XX3334",
        plan_familiar: "XX3335",
        ctrl_prenatal: "XX3336",
        odontologia: "XX3337",
        odonto_materna: "XX3338",
        vacunacion: "XX3339",
        sintom_resp: "XX3341",
        tamizaje_prostata: "XX3342",
        tamizaje_colon: "XX3343",
        tamizaje_mama: "XX3344",
        gestion_riesgo: "XX3345",
        programa_cronico: "XX3346",
        primera_infancia: "XX3347",
        infancia: "XX3348",
        adolecencia: "XX3349",
        juventud: "XX3350",
        adultez: "XX3351",
        vejez: "XX3352",
        salud_oral: "XX3353",
        preconcepcional: "XX3354",
      },
    };
  },
  watch: {
    "params.estado": function (val) {
      if (val) this._validateCodigos();
    },
    "params.tabla_formu": function (val) {
      this.tabla_formu = val;
    },
    "params.orden_medica": function (val) {
      this.orden_medica = val;
    },
  },
  methods: {
    _validateCodigos() {
      let _this = this;
      loader("show");
      postData({ datosh: datosEnvio() }, get_url("app/HICLIN/HC110.DLL"))
        .then((result) => {
          let sw_invalid = parseFloat(result) || 0;
          if (sw_invalid) _this._getOrdenesMedicas();
          else _this._precargarTabla();
        })
        .catch((err) => {
          loader("hide");
          _this._terminar();
        });
    },
    _getOrdenesMedicas() {
      let _this = this;
      postData({ datosh: datosEnvio() }, get_url("app/HICLIN/HC804.DLL"))
        .then((data) => {
          loader("hide");
          _this.orden_medica = data.FOROM.filter((e) => {
            let numero = parseFloat(e.NUMERO) == 0 ? "" : e.NUMERO;
            if (numero && e.ESTADO == "") return e;
          });
          _this._precargarTabla();
        })
        .catch((err) => {
          loader("hide");
          _this._terminar();
        });
    },

    _precargarTabla() {
      loader("hide");
      let { tabla_formu, codigos_demanda, form } = this;
      tabla_formu.forEach((item) => {
        Object.keys(codigos_demanda).forEach((a) => {
          if (item.cod_formu == codigos_demanda[a]) form[a] = "S";
        });
      });

      this._validarPrimeraInfancia();
    },

    _validarPrimeraInfancia() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_primer_infancia",
          orden: "1",
        },
        _this._terminar,
        () => {
          _this
            ._validarSorN("primera_infancia")
            .then(_this._validarInfancia)
            .catch(_this._validarPrimeraInfancia);
        }
      );
    },
    _validarInfancia() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_infancia",
          orden: "1",
        },
        _this._validarPrimeraInfancia,
        () => {
          _this
            ._validarSorN("infancia")
            .then(_this._validarAdolecencia)
            .catch(_this._validarInfancia);
        }
      );
    },
    _validarAdolecencia() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_adolecencia",
          orden: "1",
        },
        _this._validarInfancia,
        () => {
          _this
            ._validarSorN("adolecencia")
            .then(_this._validarJuventud)
            .catch(_this._validarAdolecencia);
        }
      );
    },
    _validarJuventud() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_juventud",
          orden: "1",
        },
        _this._validarAdolecencia,
        () => {
          _this
            ._validarSorN("juventud")
            .then(_this._validarCitologia)
            .catch(_this._validarJuventud);
        }
      );
    },
    _validarCitologia() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_cito_cervico_vaginal",
          orden: "1",
        },
        _this._validarJuventud,
        () => {
          _this
            ._validarSorN("citologia")
            .then(_this._validarAgudeza)
            .catch(_this._validarCitologia);
        }
      );
    },
    _validarAgudeza() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_agudeza_visual",
          orden: "1",
        },
        _this._validarCitologia,
        () => {
          _this
            ._validarSorN("agudeza_visual")
            .then(_this._validarAdultez)
            .catch(_this._validarAgudeza);
        }
      );
    },
    _validarAdultez() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_adultez",
          orden: "1",
        },
        _this._validarAgudeza,
        () => {
          _this
            ._validarSorN("adultez")
            .then(_this._validarVejez)
            .catch(_this._validarAdultez);
        }
      );
    },
    _validarVejez() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_vejez",
          orden: "1",
        },
        _this._validarAdultez,
        () => {
          _this
            ._validarSorN("vejez")
            .then(_this._validarPlanFamiliar)
            .catch(_this._validarVejez);
        }
      );
    },
    _validarPlanFamiliar() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_plan_familiar",
          orden: "1",
        },
        _this._validarVejez,
        () => {
          _this
            ._validarSorN("plan_familiar")
            .then(_this._validarCtrlPrenatal)
            .catch(_this._validarPlanFamiliar);
        }
      );
    },
    _validarCtrlPrenatal() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_ctrl_perinatal",
          orden: "1",
        },
        _this._validarPlanFamiliar,
        () => {
          _this
            ._validarSorN("ctrl_prenatal")
            .then(_this._validarOdontologia)
            .catch(_this._validarCtrlPrenatal);
        }
      );
    },
    _validarOdontologia() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_odontologia",
          orden: "1",
        },
        _this._validarCtrlPrenatal,
        () => {
          _this
            ._validarSorN("odontologia")
            .then(_this._validarOdonMaterna)
            .catch(_this._validarOdontologia);
        }
      );
    },
    _validarOdonMaterna() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_odontologia_materna",
          orden: "1",
        },
        _this._validarOdontologia,
        () => {
          _this
            ._validarSorN("odonto_materna")
            .then(_this._validarVacunacion)
            .catch(_this._validarOdonMaterna);
        }
      );
    },
    _validarVacunacion() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_vacunacion",
          orden: "1",
        },
        _this._validarOdonMaterna,
        () => {
          _this
            ._validarSorN("vacunacion")
            .then(_this._validarSintomResp)
            .catch(_this._validarVacunacion);
        }
      );
    },
    _validarSintomResp() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_sintomatico_resp",
          orden: "1",
        },
        _this._validarVacunacion,
        () => {
          _this
            ._validarSorN("sintom_resp")
            .then(_this._validarProstata)
            .catch(_this._validarSintomResp);
        }
      );
    },
    _validarProstata() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_tamizaje_prostata",
          orden: "1",
        },
        _this._validarSintomResp,
        () => {
          _this
            ._validarSorN("tamizaje_prostata")
            .then(() => {
              if (_this.params.nit == 900005594) _this._validarCronico();
              else _this._validarColon();
            })
            .catch(_this._validarProstata);
        }
      );
    },
    _validarColon() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_tamizaje_colon",
          orden: "1",
        },
        _this._validarProstata,
        () => {
          _this
            ._validarSorN("tamizaje_colon")
            .then(_this._validarMama)
            .catch(_this._validarColon);
        }
      );
    },
    _validarMama() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_tamizaje_mama",
          orden: "1",
        },
        _this._validarColon,
        () => {
          _this
            ._validarSorN("tamizaje_mama")
            .then(_this._validarRiesgo)
            .catch(_this._validarMama);
        }
      );
    },
    _validarRiesgo() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_gestion_riesgo",
          orden: "1",
        },
        _this._validarMama,
        () => {
          _this
            ._validarSorN("gestion_riesgo")
            .then(_this._validarCronico)
            .catch(_this._validarRiesgo);
        }
      );
    },
    _validarCronico() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_programa_cronico",
          orden: "1",
        },
        () => {
          if (_this.params.nit == 900005594) _this._validarProstata();
          else _this._validarRiesgo();
        },
        () => {
          _this
            ._validarSorN("programa_cronico")
            .then(_this._validarSaludOral)
            .catch(_this._validarCronico);
        }
      );
    },
    _validarSaludOral() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_salud_oral",
          orden: "1",
        },
        _this._validarCronico,
        () => {
          _this
            ._validarSorN("salud_oral")
            .then(_this._validarPreconcepcional)
            .catch(_this._validarSaludOral);
        }
      );
    },
    _validarPreconcepcional() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_consulta_preconcepcional",
          orden: "1",
        },
        _this._validarSaludOral,
        () => {
          _this
            ._validarSorN("preconcepcional")
            .then(_this._ordenarSelecion)
            .catch(_this._validarPreconcepcional);
        }
      );
    },
    _ordenarSelecion() {
      let { tabla_formu, codigos_demanda, form } = this;

      Object.keys(codigos_demanda).forEach((a) => {
        let index = tabla_formu.findIndex(
          (e) => e.cod_formu == codigos_demanda[a]
        );

        let item = _limpiarFormulacion();

        if (index < 0 && form[a] == "S") {
          item.tipo_formu = 4;
          item.cod_formu = codigos_demanda[a];
          item.cant_formu = 1;
          item.nro_ord_formu = 9;
          tabla_formu.push(item);
        } else if (index >= 0 && form[a] == "N") tabla_formu.splice(index, 1);
      });

      tabla_formu.map((a, b) => (a.item_formu = b + 1));
      this._terminar();
    },
    _validarSorN(val) {
      let data = this.form[val].toUpperCase() || "N";
      return new Promise((resolve, reject) => {
        if (data == "S" || data == "N") (this.form[val] = data), resolve();
        else {
          CON851("03", "03", null, "error", "Advertencia");
          this.form[val] = "";
          reject();
        }
      });
    },
    _terminar() {
      let { tabla_formu, orden_medica } = this;
      this.$emit("callback", { tabla_formu, orden_medica });
    },
  },
  template: /*html*/ `
            <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                <div class="form-group box-center" style="text-align: left;">
                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Primer infancia. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_primer_infancia">
                            <input type="text" class="form-control center uppercase" v-model="form.primera_infancia"
                            data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>
                    
                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Infancia. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_infancia">
                            <input type="text" class="form-control center uppercase" v-model="form.infancia"
                            data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>

                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Adolecencia. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_adolecencia">
                            <input type="text" class="form-control center uppercase" v-model="form.adolecencia"
                             data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>
                </div>

                <div class="form-group box-center" style="text-align: left;">
                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Juventud. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_juventud">
                            <input type="text" class="form-control center uppercase" v-model="form.juventud"
                             data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>
                    
                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Citologia cervico vaginal. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_cito_cervico_vaginal">
                            <input type="text" class="form-control center uppercase" v-model="form.citologia"
                            data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>

                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Agudeza visual. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_agudeza_visual">
                            <input type="text" class="form-control center uppercase" v-model="form.agudeza_visual"
                             data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>
                </div>
                
                <div class="form-group box-center" style="text-align: left;">
                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Adultez. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_adultez">
                            <input type="text" class="form-control center uppercase" v-model="form.adultez"
                             data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>
                    
                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Vejez. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_vejez">
                            <input type="text" class="form-control center uppercase" v-model="form.vejez"
                            data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>

                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Planificacion familiar. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_plan_familiar">
                            <input type="text" class="form-control center uppercase" v-model="form.plan_familiar"
                            data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>
                </div>
                
                <div class="form-group box-center" style="text-align: left;">
                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Control perinatal. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_ctrl_perinatal">
                            <input type="text" class="form-control center uppercase" v-model="form.ctrl_prenatal"
                            data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>
                    
                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Odontologia. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_odontologia">
                            <input type="text" class="form-control center uppercase" v-model="form.odontologia"
                            data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>

                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Odontologia materna. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_odontologia_materna">
                            <input type="text" class="form-control center uppercase" v-model="form.odonto_materna"
                            data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>
                </div>
                
                <div class="form-group box-center" style="text-align: left;">
                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Vacunacion. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_vacunacion">
                            <input type="text" class="form-control center uppercase" v-model="form.vacunacion"
                            data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>
                    
                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Sintomatico respiratorio. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_sintomatico_resp">
                            <input type="text" class="form-control center uppercase" v-model="form.sintom_resp"
                            data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>

                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Tamizaje de prostata. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_tamizaje_prostata">
                            <input type="text" class="form-control center uppercase" v-model="form.tamizaje_prostata"
                            data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>
                </div>
                
                <div class="form-group box-center" style="text-align: left;">
                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Tamizaje de colon. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_tamizaje_colon">
                            <input type="text" class="form-control center uppercase" v-model="form.tamizaje_colon"
                            data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>
                    
                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Tamizaje de mama. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_tamizaje_mama">
                            <input type="text" class="form-control center uppercase" v-model="form.tamizaje_mama"
                            data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>

                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Gestion del riesgo. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_gestion_riesgo">
                            <input type="text" class="form-control center uppercase" v-model="form.gestion_riesgo"
                            data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>
                </div>
                
                <div class="form-group box-center" style="text-align: left;">
                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Programa cronico. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_programa_cronico">
                            <input type="text" class="form-control center uppercase" v-model="form.programa_cronico"
                            data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>
                    
                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Salud oral. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_salud_oral">
                            <input type="text" class="form-control center uppercase" v-model="form.salud_oral"
                            data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>

                    <div class="form-group col-md-4 col-sm-4 col-xs-6 text-descrip">
                        <label class="label-center col-md-5 col-sm-5 col-xs-6">Consulta preconcepcional. </label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-6" id="fase_consulta_preconcepcional">
                            <input type="text" class="form-control center uppercase" v-model="form.preconcepcional"
                            data-orden="1" maxlength="1" placeholder="N" disabled>
                        </div>
                    </div>
                </div>

            </div>
            `,
});
