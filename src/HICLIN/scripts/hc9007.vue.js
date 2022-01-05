var component_hc9007 = Vue.component("content_hc9007", {
  props: {
    params: {},
    data: {},
  },
  data() {
    return {
      autismo: this.data,
    };
  },
  watch: {
    "params.estado": function (estado) {
      switch (estado) {
        case 1: this._validar_balan_salto_rodilla(); break;
        case 2: this._validar_mirada_fija_deambula(); break;
        default: break;
      }
    },
  },
  methods: {
    _validar_balan_salto_rodilla() {
      validarInputs(
        {
          form: "#fase_balan_salto_rodilla",
          orden: "1",
        },
        this._escape,
        () => {
          this.autismo.balan_salto_rodilla_9007 = this.autismo.balan_salto_rodilla_9007.toUpperCase().trim() || "N".trim() || "N";

          if (this.autismo.balan_salto_rodilla_9007 == "S" || this.autismo.balan_salto_rodilla_9007 == "N") {
            this._validar_interes_otros();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_balan_salto_rodilla();
          }
        }
      );
    },

    _validar_interes_otros() {
      validarInputs(
        {
          form: "#fase_interes_otros",
          orden: "1",
        },
        this._validar_balan_salto_rodilla,
        () => {
          this.autismo.interes_otros_9007 = this.autismo.interes_otros_9007.toUpperCase().trim() || "N";

          if (this.autismo.interes_otros_9007 == "S" || this.autismo.interes_otros_9007 == "N") {
            this._validar_subir_cosas();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_interes_otros();
          }
        }
      );
    },
    _validar_subir_cosas() {
      validarInputs(
        {
          form: "#fase_subir_cosas",
          orden: "1",
        },
        this._validar_interes_otros,
        () => {
          this.autismo.subir_cosas_9007 = this.autismo.subir_cosas_9007.toUpperCase().trim() || "N"

          if (this.autismo.subir_cosas_9007 == "S" || this.autismo.subir_cosas_9007 == "N") {
            this._validar_jugar_cucu_escondite();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_subir_cosas();
          }
        }
      );
    },
    _validar_jugar_cucu_escondite() {
      validarInputs(
        {
          form: "#fase_jugar_cucu_escondite",
          orden: "1",
        },
        this._validar_subir_cosas,
        () => {
          this.autismo.jugar_cucu_escondite_9007 = this.autismo.jugar_cucu_escondite_9007.toUpperCase().trim() || "N";

          if (this.autismo.jugar_cucu_escondite_9007 == "S" || this.autismo.jugar_cucu_escondite_9007 == "N") {
            this._validar_simula_tel_mune();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_jugar_cucu_escondite();
          }
        }
      );
    },

    _validar_simula_tel_mune() {
      validarInputs(
        {
          form: "#fase_simula_tel_mune",
          orden: "1",
        },
        this._validar_jugar_cucu_escondite,
        () => {
          this.autismo.simula_tel_mune_9007 = this.autismo.simula_tel_mune_9007.toUpperCase().trim() || "N";

          if (this.autismo.simula_tel_mune_9007 == "S" || this.autismo.simula_tel_mune_9007 == "N") {
            this._validar_senala_pedir_algo();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_jugar_cucu_escondite();
          }
        }
      );
    },
    _validar_senala_pedir_algo() {
      validarInputs(
        {
          form: "#fase_senala_pedir_algo",
          orden: "1",
        },
        this._validar_simula_tel_mune,
        () => {
          this.autismo.senala_pedir_algo_9007 = this.autismo.senala_pedir_algo_9007.toUpperCase().trim() || "N";

          if (this.autismo.senala_pedir_algo_9007 == "S" || this.autismo.senala_pedir_algo_9007 == "N") {
            this._validar_senala_interes_algo()
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_senala_pedir_algo();
          }
        }
      );
    },
    _validar_senala_interes_algo() {
      validarInputs(
        {
          form: "#fase_senala_interes_algo",
          orden: "1",
        },
        this._validar_senala_pedir_algo,
        () => {
          this.autismo.senala_interes_algo_9007 = this.autismo.senala_interes_algo_9007.toUpperCase().trim() || "N";

          if (this.autismo.senala_interes_algo_9007 == "S" || this.autismo.senala_interes_algo_9007 == "N") {
            this._validar_juguetes_peque_boca()
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_senala_interes_algo();
          }
        }
      );
    },
    _validar_juguetes_peque_boca() {
      validarInputs(
        {
          form: "#fase_juguetes_peque_boca",
          orden: "1",
        },
        this._validar_senala_interes_algo,
        () => {
          this.autismo.juguetes_peque_boca_9007 = this.autismo.juguetes_peque_boca_9007.toUpperCase().trim() || "N";

          if (this.autismo.juguetes_peque_boca_9007 == "S" || this.autismo.juguetes_peque_boca_9007 == "N") {
            this._validar_acerca_objetos_ensenar()
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_juguetes_peque_boca();
          }
        }
      );
    },
    _validar_acerca_objetos_ensenar() {
      validarInputs(
        {
          form: "#fase_acerca_objetos_ensenar",
          orden: "1",
        },
        this._validar_juguetes_peque_boca,
        () => {
          this.autismo.acerca_objetos_ensenar_9007 = this.autismo.acerca_objetos_ensenar_9007.toUpperCase().trim() || "N";

          if (this.autismo.acerca_objetos_ensenar_9007 == "S" || this.autismo.acerca_objetos_ensenar_9007 == "N") {
            this._validar_mira_ojos_segundos()
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_acerca_objetos_ensenar();
          }
        }
      );
    },
    _validar_mira_ojos_segundos() {
      validarInputs(
        {
          form: "#fase_mira_ojos_segundos",
          orden: "1",
        },
        this._validar_acerca_objetos_ensenar,
        () => {
          this.autismo.mira_ojos_segundos_9007 = this.autismo.mira_ojos_segundos_9007.toUpperCase().trim() || "N";

          if (this.autismo.mira_ojos_segundos_9007 == "S" || this.autismo.mira_ojos_segundos_9007 == "N") {
            this._validar_hipersensible_ruidos()
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_mira_ojos_segundos();
          }
        }
      );
    },
    _validar_hipersensible_ruidos() {
      validarInputs(
        {
          form: "#fase_hipersensible_ruidos",
          orden: "1",
        },
        this._validar_mira_ojos_segundos,
        () => {
          this.autismo.hipersensible_ruidos_9007 = this.autismo.hipersensible_ruidos_9007.toUpperCase().trim() || "N";

          if (this.autismo.hipersensible_ruidos_9007 == "S" || this.autismo.hipersensible_ruidos_9007 == "N") {
            this._validar_responde_sonrisa()
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_hipersensible_ruidos();
          }
        }
      );
    },
    _validar_responde_sonrisa() {
      validarInputs(
        {
          form: "#fase_responde_sonrisa",
          orden: "1",
        },
        this._validar_hipersensible_ruidos,
        () => {
          this.autismo.responde_sonrisa_9007 = this.autismo.responde_sonrisa_9007.toUpperCase().trim() || "N";

          if (this.autismo.responde_sonrisa_9007 == "S" || this.autismo.responde_sonrisa_9007 == "N") {
            this._validar_imita()
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_responde_sonrisa();
          }
        }
      );
    },
    _validar_imita() {
      validarInputs(
        {
          form: "#fase_imita",
          orden: "1",
        },
        this._validar_responde_sonrisa,
        () => {
          this.autismo.imita_9007 = this.autismo.imita_9007.toUpperCase().trim() || "N";

          if (this.autismo.imita_9007 == "S" || this.autismo.imita_9007 == "N") {
            this._validar_responde_nombre()
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_imita();
          }
        }
      );
    },
    _validar_responde_nombre() {
      validarInputs(
        {
          form: "#fase_responde_nombre",
          orden: "1",
        },
        this._validar_imita,
        () => {
          this.autismo.responde_nombre_9007 = this.autismo.responde_nombre_9007.toUpperCase().trim() || "N";

          if (this.autismo.responde_nombre_9007 == "S" || this.autismo.responde_nombre_9007 == "N") {
            this._validar_mira_juguete()
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_responde_nombre();
          }
        }
      );
    },
    _validar_mira_juguete() {
      validarInputs(
        {
          form: "#fase_mira_juguete",
          orden: "1",
        },
        this._validar_responde_nombre,
        () => {
          this.autismo.mira_juguete_9007 = this.autismo.mira_juguete_9007.toUpperCase().trim() || "N";

          if (this.autismo.mira_juguete_9007 == "S" || this.autismo.mira_juguete_9007 == "N") {
            this._validar_anda()
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_mira_juguete();
          }
        }
      );
    },
    _validar_anda() {
      validarInputs(
        {
          form: "#fase_anda",
          orden: "1",
        },
        this._validar_mira_juguete,
        () => {
          this.autismo.anda_9007 = this.autismo.anda_9007.toUpperCase().trim() || "N";

          if (this.autismo.anda_9007 == "S" || this.autismo.anda_9007 == "N") {
            this._validar_mira_cosas()
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_anda();
          }
        }
      );
    },
    _validar_mira_cosas() {
      validarInputs(
        {
          form: "#fase_mira_cosas",
          orden: "1",
        },
        this._validar_anda,
        () => {
          this.autismo.mira_cosas_9007 = this.autismo.mira_cosas_9007.toUpperCase().trim() || "N";

          if (this.autismo.mira_cosas_9007 == "S" || this.autismo.mira_cosas_9007 == "N") {
            this._validar_movim_raros_dedos_cara()
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_mira_cosas();
          }
        }
      );
    },
    _validar_movim_raros_dedos_cara() {
      validarInputs(
        {
          form: "#fase_movim_raros_dedos_cara",
          orden: "1",
        },
        this._validar_mira_cosas,
        () => {
          this.autismo.movim_raros_dedos_cara_9007 = this.autismo.movim_raros_dedos_cara_9007.toUpperCase().trim() || "N";

          if (this.autismo.movim_raros_dedos_cara_9007 == "S" || this.autismo.movim_raros_dedos_cara_9007 == "N") {
            this._validar_atrae_atencion_propia()
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_movim_raros_dedos_cara();
          }
        }
      );
    },
    _validar_atrae_atencion_propia() {
      validarInputs(
        {
          form: "#fase_atrae_atencion_propia",
          orden: "1",
        },
        this._validar_movim_raros_dedos_cara,
        () => {
          this.autismo.atrae_atencion_propia_9007 = this.autismo.atrae_atencion_propia_9007.toUpperCase().trim() || "N";

          if (this.autismo.atrae_atencion_propia_9007 == "S" || this.autismo.atrae_atencion_propia_9007 == "N") {
            this._validar_sospecha_sordo()
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_atrae_atencion_propia();
          }
        }
      );
    },
    _validar_sospecha_sordo() {
      validarInputs(
        {
          form: "#fase_sospecha_sordo",
          orden: "1",
        },
        this._validar_atrae_atencion_propia,
        () => {
          this.autismo.sospecha_sordo_9007 = this.autismo.sospecha_sordo_9007.toUpperCase().trim() || "N";

          if (this.autismo.sospecha_sordo_9007 == "S" || this.autismo.sospecha_sordo_9007 == "N") {
            this._validar_entiende_gente()
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_sospecha_sordo();
          }
        }
      );
    },
    _validar_entiende_gente() {
      validarInputs(
        {
          form: "#fase_entiende_gente",
          orden: "1",
        },
        this._validar_sospecha_sordo,
        () => {
          this.autismo.entiende_gente_9007 = this.autismo.entiende_gente_9007.toUpperCase().trim() || "N";

          if (this.autismo.entiende_gente_9007 == "S" || this.autismo.entiende_gente_9007 == "N") {
            this._validar_mira_cara_reaccion_des()
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_entiende_gente();
          }
        }
      );
    },
    _validar_mira_cara_reaccion_des() {
      validarInputs(
        {
          form: "#fase_mira_cara_reaccion",
          orden: "1",
        },
        this._validar_entiende_gente,
        () => {
          this.autismo.mira_cara_reaccion_des_9007 = this.autismo.mira_cara_reaccion_des_9007.toUpperCase().trim() || "N";

          if (this.autismo.mira_cara_reaccion_des_9007 == "S" || this.autismo.mira_cara_reaccion_des_9007 == "N") {
            this._validar_mirada_fija_deambula()
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_mira_cara_reaccion_des();
          }
        }
      );
    },
    _validar_mirada_fija_deambula() {
      validarInputs(
        {
          form: "#fase_mirada_fija_deambula",
          orden: "1",
        },
        this._validar_mira_cara_reaccion_des,
        () => {
          this.autismo.mirada_fija_deambula_9007 = this.autismo.mirada_fija_deambula_9007.toUpperCase().trim() || "N";

          if (this.autismo.mirada_fija_deambula_9007 == "S" || this.autismo.mirada_fija_deambula_9007 == "N") {
            this._terminar();
          } else {
            CON851("03", "03", null, "warning", "Advertencia");
            this._validar_mirada_fija_deambula();
          }
        }
      );
    },
    _escape() {
      this.$emit("callback_esc");
    },
    _terminar() {
      this.$emit("callback", this.autismo);
    },
  },
  template: `
  <div class="col-md-12 no-padding">
      <div class="col-md-12 no-padding">

      <div class="col-md-6 no-padding">
      <div class="col-md-12 no-padding form-group box-center">

      <div class="salto-linea"></div>

      <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
      <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
      1. Disfruta su hijo cuando se le balancea, se le hace saltar sobre sus rodillas?
      </label>
      <div
          class="input-group  col-md-1 col-sm-1 col-xs-6"
          id="fase_balan_salto_rodilla"
      >
          <input 
              type="text"
              class="form-control center uppercase input_autismo"
              data-orden="1"
              v-model="autismo.balan_salto_rodilla_9007"
              maxlength="1"
              placeholder="N"
              disabled
          >
      </div>
  </div>

  <div class="salto-linea"></div>
  <!-- FIN PREGUNTA -->
  <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
      <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
        2. Muestra su hijo interes por otros niños?
      </label>
      <div 
          class="input-group  col-md-1 col-sm-1 col-xs-6"
          id="fase_interes_otros"
      >
          <input 
              type="text"
              class="form-control center uppercase input_autismo"
              data-orden="1"
              v-model="autismo.interes_otros_9007"
              maxlength="1"
              placeholder="N"
              disabled
          >
      </div>
  </div>
  <div class="salto-linea"></div>
  <!-- FIN PREGUNTA -->
  <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
      <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
        3. Le gusta a su hijo subirse a las cosas, como p.ej. las escaleras?
      </label>
      <div 
          class="input-group  col-md-1 col-sm-1 col-xs-6"
          id="fase_subir_cosas"
      >
          <input 
              type="text"
              class="form-control center uppercase input_autismo"
              data-orden="1"
              v-model="autismo.subir_cosas_9007"
              maxlength="1"
              placeholder="N"
              disabled
          >
      </div>
  </div>
  <div class="salto-linea"></div>
  <!-- FIN PREGUNTA -->
  <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
      <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
        4. Disfruta su hijo jugando a cucu-tras o al escondite?
      </label>
      <div 
          class="input-group  col-md-1 col-sm-1 col-xs-6"
          id="fase_jugar_cucu_escondite"
      >
          <input 
              type="text"
              class="form-control center uppercase input_autismo"
              data-orden="1"
              v-model="autismo.jugar_cucu_escondite_9007"
              maxlength="1"
              placeholder="N"
              disabled
          >
      </div>
  </div>
  <div class="salto-linea"></div>
  <!-- FIN PREGUNTA -->
  <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
      <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
        5. Su hijo simula alguna vez, por ejemplo, hablar por telefono o cuidar a las muñecas?
      </label>
      <div 
          class="input-group  col-md-1 col-sm-1 col-xs-6"
          id="fase_simula_tel_mune"
      >
          <input 
              type="text"
              class="form-control center uppercase input_autismo"
              data-orden="1"
              v-model="autismo.simula_tel_mune_9007"
              maxlength="1"
              placeholder="N"
              disabled
          >
      </div>
  </div>
  <div class="salto-linea"></div>
  <!-- FIN PREGUNTA -->
  <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
      <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
      6. Utiliza su hijo alguna vez su dedo indice para señalar pidiendo algo?
      </label>
      <div 
          class="input-group  col-md-1 col-sm-1 col-xs-6"
          id="fase_senala_pedir_algo"
      >
          <input 
              type="text"
              class="form-control center uppercase input_autismo"
              data-orden="1"
              v-model="autismo.senala_pedir_algo_9007"
              maxlength="1"
              placeholder="N"
              disabled
          >
      </div>
  </div>
  <div class="salto-linea"></div>
  <!-- FIN PREGUNTA -->
  <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
      <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
        7. Utiliza su hijo alguna vez su dedo indice para señalar mostrando su interes en algo?
      </label>
      <div 
          class="input-group  col-md-1 col-sm-1 col-xs-6"
          id="fase_senala_interes_algo"
      >
          <input 
              type="text"
              class="form-control center uppercase input_autismo"
              data-orden="1"
              v-model="autismo.senala_interes_algo_9007"
              maxlength="1"
              placeholder="N"
              disabled
          >
      </div>
  </div>
  <div class="salto-linea"></div>
  <!-- FIN PREGUNTA -->
  <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
      <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
        8. Puede su hijo jugar apropiadamente con juguetes pequeños (ej. coches o bloques); sin meterselos en la boca, torquearlos o tirarlos unicamente?
      </label>
      <div 
          class="input-group  col-md-1 col-sm-1 col-xs-6"
          id="fase_juguetes_peque_boca"
      >
          <input 
              type="text"
              class="form-control center uppercase input_autismo"
              data-orden="1"
              v-model="autismo.juguetes_peque_boca_9007"
              maxlength="1"
              placeholder="N"
              disabled
          >
      </div>
  </div>
  <div class="salto-linea"></div>
  <!-- FIN PREGUNTA -->
  <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
      <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
        9. Le acerca su hijo alguna vez objetos para enseñarselos?
      </label>
      <div 
          class="input-group  col-md-1 col-sm-1 col-xs-6"
          id="fase_acerca_objetos_ensenar"
      >
          <input 
              type="text"
              class="form-control center uppercase input_autismo"
              data-orden="1"
              v-model="autismo.acerca_objetos_ensenar_9007"
              maxlength="1"
              placeholder="N"
              disabled
          >
      </div>
  </div>
  <div class="salto-linea"></div>
  <!-- FIN PREGUNTA -->
  <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
      <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
        10. Le mira su hijo a los ojos durante mas de uno o dos segundos?
      </label>
      <div 
          class="input-group  col-md-1 col-sm-1 col-xs-6"
          id="fase_mira_ojos_segundos"
      >
          <input 
              type="text"
              class="form-control center uppercase input_autismo"
              data-orden="1"
              v-model="autismo.mira_ojos_segundos_9007"
              maxlength="1"
              placeholder="N"
              disabled
          >
      </div>
  </div>
  <div class="salto-linea"></div>
  <!-- FIN PREGUNTA -->
  <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
      <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
        11. Su hijo parece hipersensible a los ruidos?(ej. tapandose los oidos)
      </label>
      <div 
          class="input-group  col-md-1 col-sm-1 col-xs-6"
          id="fase_hipersensible_ruidos"
      >
          <input 
              type="text"
              class="form-control center uppercase input_autismo"
              data-orden="1"
              v-model="autismo.hipersensible_ruidos_9007"
              maxlength="1"
              placeholder="N"
              disabled
          >
      </div>
  </div>
  <div class="salto-linea"></div>
  <!-- FIN PREGUNTA -->
  <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
      <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
        12. Responde su hijo con una sonrisa a su cara o a su sonrisa?
      </label>
      <div 
          class="input-group  col-md-1 col-sm-1 col-xs-6"
          id="fase_responde_sonrisa"
      >
          <input 
              type="text"
              class="form-control center uppercase input_autismo"
              data-orden="1"
              v-model="autismo.responde_sonrisa_9007"
              maxlength="1"
              placeholder="N"
              disabled
          >
      </div>
  </div>
  <div class="salto-linea"></div>
  <!-- FIN PREGUNTA -->
      </div>
      </div>

      <div class="col-md-6" style="padding-right: 0px">
      <div class="col-md-12 no-padding form-group box-center">

      <div class="salto-linea"></div>
 <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
            <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
              13. Le imita su hijo? (ej. poner una cara que su hijo imita?)
            </label>
            <div 
                class="input-group  col-md-1 col-sm-1 col-xs-6"
                id="fase_imita"
            >
                <input 
                    type="text"
                    class="form-control center uppercase input_autismo"
                    data-orden="1"
                    v-model="autismo.imita_9007"
                    maxlength="1"
                    placeholder="N"
                    disabled
                >
            </div>
        </div>
        <div class="salto-linea"></div>
        <!-- FIN PREGUNTA -->
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
            <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
              14. Su hijo responde cuando se le llama por su nombre?
            </label>
            <div 
                class="input-group  col-md-1 col-sm-1 col-xs-6"
                id="fase_responde_nombre"
            >
                <input 
                    type="text"
                    class="form-control center uppercase input_autismo"
                    data-orden="1"
                    v-model="autismo.responde_nombre_9007"
                    maxlength="1"
                    placeholder="N"
                    disabled
                >
            </div>
        </div>
        <div class="salto-linea"></div>
        <!-- FIN PREGUNTA -->
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
            <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
              15. Si usted señala un juguete al otro lado de la habitacion, su hijo lo mira? 
            </label>
            <div 
                class="input-group  col-md-1 col-sm-1 col-xs-6"
                id="fase_mira_juguete"
            >
                <input 
                    type="text"
                    class="form-control center uppercase input_autismo"
                    data-orden="1"
                    v-model="autismo.mira_juguete_9007"
                    maxlength="1"
                    placeholder="N"
                    disabled
                >
            </div>
        </div>
        <div class="salto-linea"></div>
        <!-- FIN PREGUNTA -->
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
            <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
              16. Anda su hijo?
            </label>
            <div 
                class="input-group  col-md-1 col-sm-1 col-xs-6"
                id="fase_anda"
            >
                <input 
                    type="text"
                    class="form-control center uppercase input_autismo"
                    data-orden="1"
                    v-model="autismo.anda_9007"
                    maxlength="1"
                    placeholder="N"
                    disabled
                >
            </div>
        </div>
        <div class="salto-linea"></div>
        <!-- FIN PREGUNTA -->
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
            <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
              17. Mira su hijo las cosas que esta usted mirando?
            </label>
            <div 
                class="input-group  col-md-1 col-sm-1 col-xs-6"
                id="fase_mira_cosas"
            >
                <input 
                    type="text"
                    class="form-control center uppercase input_autismo"
                    data-orden="1"
                    v-model="autismo.mira_cosas_9007"
                    maxlength="1"
                    placeholder="N"
                    disabled
                >
            </div>
        </div>
        <div class="salto-linea"></div>
        <!-- FIN PREGUNTA -->
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
            <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
              18. Hace su hijo movimientos raros con los dedos cerca de su propia cara?
            </label>
            <div 
                class="input-group  col-md-1 col-sm-1 col-xs-6"
                id="fase_movim_raros_dedos_cara"
            >
                <input 
                    type="text"
                    class="form-control center uppercase input_autismo"
                    data-orden="1"
                    v-model="autismo.movim_raros_dedos_cara_9007"
                    maxlength="1"
                    placeholder="N"
                    disabled
                >
            </div>
        </div>
        <div class="salto-linea"></div>
        <!-- FIN PREGUNTA -->
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
            <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
              19. Trata de atraer su hijo atenciòn sobre su propia actividad?
            </label>
            <div 
                class="input-group  col-md-1 col-sm-1 col-xs-6"
                id="fase_atrae_atencion_propia"
            >
                <input 
                    type="text"
                    class="form-control center uppercase input_autismo"
                    data-orden="1"
                    v-model="autismo.atrae_atencion_propia_9007"
                    maxlength="1"
                    placeholder="N"
                    disabled
                >
            </div>
        </div>
        <div class="salto-linea"></div>
        <!-- FIN PREGUNTA -->
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
            <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
              20. Alguna vez ha sospechado que su hijo era sordo?.
            </label>
            <div 
                class="input-group  col-md-1 col-sm-1 col-xs-6"
                id="fase_sospecha_sordo"
            >
                <input 
                    type="text"
                    class="form-control center uppercase input_autismo"
                    data-orden="1"
                    v-model="autismo.sospecha_sordo_9007"
                    maxlength="1"
                    placeholder="N"
                    disabled
                >
            </div>
        </div>
        <div class="salto-linea"></div>
        <!-- FIN PREGUNTA -->
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
            <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
              21. Entiende su hijo lo que dice la gente?.
            </label>
            <div 
                class="input-group  col-md-1 col-sm-1 col-xs-6"
                id="fase_entiende_gente"
            >
                <input 
                    type="text"
                    class="form-control center uppercase input_autismo"
                    data-orden="1"
                    v-model="autismo.entiende_gente_9007"
                    maxlength="1"
                    placeholder="N"
                    disabled
                >
            </div>
        </div>
        <div class="salto-linea"></div>
        <!-- FIN PREGUNTA -->
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
            <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
              22. Mira su hijo a su cara para observar su reaccion cuando se enfrenta con algo desconocido?.
            </label>
            <div 
                class="input-group  col-md-1 col-sm-1 col-xs-6"
                id="fase_mira_cara_reaccion"
            >
                <input 
                    type="text"
                    class="form-control center uppercase input_autismo"
                    data-orden="1"
                    v-model="autismo.mira_cara_reaccion_des_9007"
                    maxlength="1"
                    placeholder="N"
                    disabled
                >
            </div>
        </div>
        <div class="salto-linea"></div>
        <!-- FIN PREGUNTA -->
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="display: flex;align-items: center;">
            <label  class="label_autismo  col-md-11 col-sm-11 col-xs-6">
              23. A veces su hijo se queda mirando fijamente al vacio o deambula sin ningún proposito?
            </label>
            <div 
                class="input-group  col-md-1 col-sm-1 col-xs-6"
                id="fase_mirada_fija_deambula"
            >
                <input 
                    type="text"
                    class="form-control center uppercase input_autismo"
                    data-orden="1"
                    v-model="autismo.mirada_fija_deambula_9007"
                    maxlength="1"
                    placeholder="N"
                    disabled
                >
            </div>
        </div>
        <div class="salto-linea"></div>
        <!-- FIN PREGUNTA -->
      </div>
      
      <div class="salto-linea"></div>
      </div>
      </div>
      </div>
  </div>`,
});
