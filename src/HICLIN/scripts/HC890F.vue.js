const { detallesHc, grabarDetalles } = require("../../HICLIN/scripts/reg_dethc.js");

// componente paquete de atencion clinica de heridas julio 15/2021 - santiago franco

module.exports = Vue.component("content_hc890F", {
  props: {
    params: {},
    data: {},
  },
  data() {
    return {
      heridas: this.data,

      dato_9009: detallesHc.WS_9009(),

      form: {
        descripClasifHerida: '',
        descripDimensionHerida: '',
        descripProfunTejido: '',
        descripComorbilidad: '',
        descripEstadioHeri: '',
        descripInfeccion: '',
        descripTiempoEvolu: '',
        descripRegistroFoto: '',
        datoTipoPaquete: '',
      },

      clasifHerida: [
        { COD: "1", DESCRIP: "HERIDAS AGUDAS" },
        { COD: "2", DESCRIP: "HERIDAS ESPECIALES" },
        { COD: "3", DESCRIP: "HERIDAS CRONICAS" },
      ],

      dimensionHeri: [
        { COD: "1", DESCRIP: "SUPERFICIE < 4 CM2" },
        { COD: "2", DESCRIP: "SUPERFICIE = 4 -< 16 CM2" },
        { COD: "3", DESCRIP: "SUPERFICIE = 16 -< 36 CM2" },
        { COD: "4", DESCRIP: "SUPERFICIE = 36 -< 64 CM2" },
        { COD: "5", DESCRIP: "SUPERFICIE = 64 -< 100 CM2" },
        { COD: "6", DESCRIP: "SUPERFICIE >= 100 CM2" },
      ],

      profunTejid: [
        { COD: "1", DESCRIP: "PIEL INTACTA O CICATRIZADA" },
        { COD: "2", DESCRIP: "AFECTACION DE LA DERMIS-EPIDERMIS" },
        { COD: "3", DESCRIP: "AFECTACION DEL TEJIDO SUBCUTANEO (TEJIDO ADIPOSO SIN LLEGAR A LA FASCIA DEL MUSCULO)." },
        { COD: "4", DESCRIP: "AFECTACION DEL MUSCULO" },
        { COD: "5", DESCRIP: "AFECTACION DEL HUESO Y TEJIDOS ANEXOS. (TENDONES, LIGAMENTOS, CAPSULA ARTICULAR O ESCARA NEGRA QUE NO PERMITE VER LOS TEJIDOS DEBAJO DE ELLA)." },
      ],

      comorbilidad: [
        { COD: "1", DESCRIP: "SIN PATOLOGIAS ASOCIADAS" },
        { COD: "2", DESCRIP: "CON 1 PATOLOGIA COMO COMORBILIDAD ASOCIADA" },
        { COD: "3", DESCRIP: "CON 2 PATOLOGIAS COMO COMORBILIDAD ASOCIADAS" },
      ],

      estadioHeri: [
        { COD: "1", DESCRIP: "ESTADIO I" },
        { COD: "2", DESCRIP: "ESTADIO II" },
        { COD: "3", DESCRIP: "ESTADIO III" },
        { COD: "4", DESCRIP: "ESTADIO IV" },
      ],

      infeccion: [
        { COD: "1", DESCRIP: "NO EVIDENCIA SIGNOS DE INFECCION" },
        { COD: "2", DESCRIP: "SI EVIDENCIA SIGNOS DE INFECCION" },
      ],

      tiempoEvolu: [
        { COD: "1", DESCRIP: "DE 1 A 4 MESES" },
        { COD: "2", DESCRIP: "DE 5 A 8 MESES" },
        { COD: "3", DESCRIP: "DE 9 A 12 MESES" },
        { COD: "4", DESCRIP: "MAS DE 12 MESES" },
      ],

      registroFoto: [
        { COD: "1", DESCRIP: "CON EVIDENTE EVOLUCION" },
        { COD: "2", DESCRIP: "EVOLUCION ESTANCADA" },
        { COD: "3", DESCRIP: "CON RETROCESO EVIDENTE EN LA EVOLUCION" },
      ],

      stylesHC890E: {
        flexRow: {
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        },
        flexIzq: {
          textAlign: "left",
          paddingLeft: "9px",
        },
      },
    };
  },
  watch: {
    "params.estado": function (estado) {
      if (estado)
        setTimeout(() => {
          this.cargarDestalles();
        }, 400);
    },
  },
  created() {
    $this = this;
  },
  methods: {
    async llenarDatos() {

      let busqDetalle_9009 = this.detalles.find(el => el['COD-DETHC'] == '9009' && el['LLAVE-HC'] == $_REG_HC.llave_hc)
      if (busqDetalle_9009) {
        this.dato_9009 = busqDetalle_9009.DETALLE;
      }

      switch (this.dato_9009.clasif_heri) {
        case '1': this.form.descripClasifHerida = 'HERIDAS AGUDAS'; break;
        case '2': this.form.descripClasifHerida = 'HERIDAS ESPECIALES'; break;
        case '3': this.form.descripClasifHerida = 'HERIDAS CRONICAS'; break;
      }

      switch (this.dato_9009.dimension_heri) {
        case '1': this.form.descripDimensionHerida = 'SUPERFICIE < 4 CM2'; break;
        case '2': this.form.descripDimensionHerida = 'SUPERFICIE = 4 -< 16 CM2'; break;
        case '3': this.form.descripDimensionHerida = 'SUPERFICIE = 16 -< 36 CM2'; break;
        case '4': this.form.descripDimensionHerida = 'SUPERFICIE = 36 -< 64 CM2'; break;
        case '5': this.form.descripDimensionHerida = 'SUPERFICIE = 64 -< 100 CM2'; break;
        case '6': this.form.descripDimensionHerida = 'SUPERFICIE >= 100 CM2'; break;
      }

      switch (this.dato_9009.profun_tejid) {
        case '1': this.form.descripProfunTejido = 'PIEL INTACTA O CICATRIZADA'; break;
        case '2': this.form.descripProfunTejido = 'AFECTACION DE LA DERMIS-EPIDERMIS'; break;
        case '3': this.form.descripProfunTejido = 'AFECTACION DEL TEJIDO SUBCUTANEO (TEJIDO ADIPOSO SIN LLEGAR A LA FASCIA DEL MUSCULO).'; break;
        case '4': this.form.descripProfunTejido = 'AFECTACION DEL MUSCULO'; break;
        case '5': this.form.descripProfunTejido = 'AFECTACION DEL HUESO Y TEJIDOS ANEXOS. (TENDONES, LIGAMENTOS, CAPSULA ARTICULAR O ESCARA NEGRA QUE NO PERMITE VER LOS TEJIDOS DEBAJO DE ELLA).'; break;
      }

      switch (this.dato_9009.comorbilidad) {
        case '1': this.form.descripComorbilidad = 'SIN PATOLOGIAS ASOCIADAS'; break;
        case '2': this.form.descripComorbilidad = 'CON 1 PATOLOGIA COMO COMORBILIDAD ASOCIADA'; break;
        case '3': this.form.descripComorbilidad = 'CON 2 PATOLOGIAS COMO COMORBILIDAD ASOCIADAS'; break;
      }

      switch (this.dato_9009.estadio_heri) {
        case '1': this.form.descripEstadioHeri = 'ESTADIO I'; break;
        case '2': this.form.descripEstadioHeri = 'ESTADIO II'; break;
        case '3': this.form.descripEstadioHeri = 'ESTADIO III'; break;
        case '4': this.form.descripEstadioHeri = 'ESTADIO IV'; break;
      }

      switch (this.dato_9009.infeccion) {
        case '1': this.form.descripInfeccion = 'NO EVIDENCIA SIGNOS DE INFECCION'; break;
        case '2': this.form.descripInfeccion = 'SI EVIDENCIA SIGNOS DE INFECCION'; break;
      }

      switch (this.dato_9009.tiempo_evolu) {
        case '1': this.form.descripTiempoEvolu = 'DE 1 A 4 MESES'; break;
        case '2': this.form.descripTiempoEvolu = 'DE 5 A 8 MESES'; break;
        case '3': this.form.descripTiempoEvolu = 'DE 9 A 12 MESES'; break;
        case '4': this.form.descripTiempoEvolu = 'MAS 12 MESES'; break;
      }

      switch (this.dato_9009.registro_foto) {
        case '1': this.form.descripRegistroFoto = 'CON EVIDENTE EVOLUCION'; break;
        case '2': this.form.descripRegistroFoto = 'EVOLUCION ESTANCADA'; break;
        case '3': this.form.descripRegistroFoto = 'CON RETROCESO EVIDENTE EN LA EVOLUCION'; break;
      }

      if (this.dato_9009.calc_heridas >= 0 && this.dato_9009.calc_heridas <= 12) {
        this.form.datoTipoPaquete = 'PAQUETE DE BAJA COMPLEJIDAD';
      } else if (this.dato_9009.calc_heridas >= 13 && this.dato_9009.calc_heridas <= 22) {
        this.form.datoTipoPaquete = 'PAQUETE DE MEDIANA COMPLEJIDAD';
      } else if (this.dato_9009.calc_heridas >= 23 && this.dato_9009.calc_heridas <= 30) {
        this.form.datoTipoPaquete = 'PAQUETE DE ALTA COMPLEJIDAD';
      }

      setTimeout(() => { this.dato_clasifHerida(); }, 200);
    },

    dato_clasifHerida() {
      POPUP(
        {
          titulo: "Clasificacion de la herida",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.clasifHerida,
          seleccion: this.dato_9009.clasif_heri,
          callback_f: () => this._escape(),
        },
        (data) => {
          this.dato_9009.clasif_heri = data.COD;
          this.form.descripClasifHerida = data.DESCRIP;
          setTimeout(() => { this.dato_dimensionHerida(); }, 200);
        }
      );
    },

    dato_dimensionHerida() {
      POPUP(
        {
          titulo: "Dimension de la herida",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.dimensionHeri,
          seleccion: this.dato_9009.dimension_heri,
          callback_f: () => setTimeout(() => { this.dato_clasifHerida(); }, 200),
        },
        (data) => {
          this.dato_9009.dimension_heri = data.COD;
          this.form.descripDimensionHerida = data.DESCRIP;
          setTimeout(() => { this.dato_profunTejid(); }, 200);
        }
      );
    },

    dato_profunTejid() {
      POPUP(
        {
          titulo: "Profundidad/tejidos afectados",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.profunTejid,
          seleccion: this.dato_9009.profun_tejid,
          callback_f: () => setTimeout(() => { this.dato_dimensionHerida(); }, 200),
        },
        (data) => {
          this.dato_9009.profun_tejid = data.COD;
          this.form.descripProfunTejido = data.DESCRIP;
          setTimeout(() => { this.dato_comorbilidad(); }, 200);
        }
      );
    },

    dato_comorbilidad() {
      POPUP(
        {
          titulo: "Comorbilidad",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.comorbilidad,
          seleccion: this.dato_9009.comorbilidad,
          callback_f: () => setTimeout(() => { this.dato_profunTejid(); }, 200),
        },
        (data) => {
          this.dato_9009.comorbilidad = data.COD;
          this.form.descripComorbilidad = data.DESCRIP;
          setTimeout(() => { this.dato_estadioHeri(); }, 200);
        }
      );
    },

    dato_estadioHeri() {
      POPUP(
        {
          titulo: "Estadio de la herida",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.estadioHeri,
          seleccion: this.dato_9009.estadio_heri,
          callback_f: () => setTimeout(() => { this.dato_comorbilidad(); }, 200),
        },
        (data) => {
          this.dato_9009.estadio_heri = data.COD;
          this.form.descripEstadioHeri = data.DESCRIP;
          setTimeout(() => { this.dato_infeccion(); }, 200);
        }
      );
    },

    dato_infeccion() {
      POPUP(
        {
          titulo: "Infeccion",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.infeccion,
          seleccion: this.dato_9009.infeccion,
          callback_f: () => setTimeout(() => { this.dato_estadioHeri(); }, 200),
        },
        (data) => {
          this.dato_9009.infeccion = data.COD;
          this.form.descripInfeccion = data.DESCRIP;
          setTimeout(() => { this.dato_tiempoEvolu(); }, 200);
        }
      );
    },

    dato_tiempoEvolu() {
      POPUP(
        {
          titulo: "Tiempo de evolucion en tratamiento",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.tiempoEvolu,
          seleccion: this.dato_9009.tiempo_evolu,
          callback_f: () => setTimeout(() => { this.dato_infeccion(); }, 200),
        },
        (data) => {
          this.dato_9009.tiempo_evolu = data.COD;
          this.form.descripTiempoEvolu = data.DESCRIP;
          setTimeout(() => { this.dato_registroFoto(); }, 200);
        }
      );
    },

    dato_registroFoto() {
      POPUP(
        {
          titulo: "Registro fotografico",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.registroFoto,
          seleccion: this.dato_9009.registro_foto,
          callback_f: () => setTimeout(() => { this.dato_tiempoEvolu(); }, 200),
        },
        (data) => {
          this.dato_9009.registro_foto = data.COD;
          this.form.descripRegistroFoto = data.DESCRIP;
          setTimeout(() => { this.dato_puntajeTotal(); }, 200);
        }
      );
    },

    async dato_puntajeTotal() {
      this.dato_9009.calc_heridas = 0;

      switch (this.dato_9009.clasif_heri) {
        case '1': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 1; break;
        case '2': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 2; break;
        case '3': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 3; break;
      }

      switch (this.dato_9009.dimension_heri) {
        case '1': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 0; break;
        case '2': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 1; break;
        case '3': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 2; break;
        case '4': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 3; break;
        case '5': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 4; break;
        case '6': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 5; break;
      }

      switch (this.dato_9009.profun_tejid) {
        case '1': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 0; break;
        case '2': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 1; break;
        case '3': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 2; break;
        case '4': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 3; break;
        case '5': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 4; break;
      }

      switch (this.dato_9009.comorbilidad) {
        case '1': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 0; break;
        case '2': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 2; break;
        case '3': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 3; break;
      }

      switch (this.dato_9009.estadio_heri) {
        case '1': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 1; break;
        case '2': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 2; break;
        case '3': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 3; break;
        case '4': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 4; break;
      }

      switch (this.dato_9009.infeccion) {
        case '1': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 0; break;
        case '2': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 3; break;
      }

      switch (this.dato_9009.tiempo_evolu) {
        case '1': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 1; break;
        case '2': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 2; break;
        case '3': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 3; break;
        case '4': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 4; break;
      }

      switch (this.dato_9009.registro_foto) {
        case '1': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 1; break;
        case '2': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 2; break;
        case '3': this.dato_9009.calc_heridas = this.dato_9009.calc_heridas + 4; break;
      }

      if (this.dato_9009.calc_heridas >= 0 && this.dato_9009.calc_heridas <= 12) {
        this.form.datoTipoPaquete = 'PAQUETE DE BAJA COMPLEJIDAD';
      } else if (this.dato_9009.calc_heridas >= 13 && this.dato_9009.calc_heridas <= 22) {
        this.form.datoTipoPaquete = 'PAQUETE DE MEDIANA COMPLEJIDAD';
      } else if (this.dato_9009.calc_heridas >= 23 && this.dato_9009.calc_heridas <= 30) {
        this.form.datoTipoPaquete = 'PAQUETE DE ALTA COMPLEJIDAD';
      }

      this.grabarDetalle();
    },

    async grabarDetalle() {
      loader("show");
      let detalle = {
        9009: _getObjetoSaveHc(this.dato_9009),
      };

      grabarDetalles(detalle, $_REG_HC.llave_hc)
        .then(() => {
          loader("hide");
          CON851("", "Test heridas grabado con exito!", null, "success", "Exito");
          this._terminar();
        })
        .catch((error) => {
          console.log(error)
          loader("hide");
          CON851("", "grabando Test heridas", null, "error", "Error");
          this._terminar();
        });
    },

    async cargarDestalles() {
      await postData({
        datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + '  ' + '|' + '  ' + '|' + '9009' + '|' + $_REG_HC.serv_hc + '|'
      }, get_url("app/HICLIN/HCDETAL_PRC.DLL"))
        .then((data) => {
          this.detalles = data["DETHC"]
          this.detalles.pop()
          this.llenarDatos();
        })
        .catch((error) => {
          CON851('', 'Error consultando datos', null, 'error', 'error')
          console.log(error)
          loader("hide")
          this._terminar();
        });
    },

    _escape() {
      this.$emit("callback_esc");
    },
    _terminar() {
      this.$emit("callback", this.heridas);
    },

  },
  template: /*html*/ ` 
  <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
    <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
      <div class="form-group box-center">

        <div class="col-md-12 col-sm-12 col-xs-12" style="display:flex" :style="stylesHC890E.flexRow">
          <label class="col-md-4 col-sm-4 col-xs-4" :style="stylesHC890E.flexIzq">1. Clasificación de la herida</label>
          <div class="input-group col-md-1 col-sm-1 col-xs-1" id='datoClasifHerida'>
            <input v-model="dato_9009.clasif_heri" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="1" disabled="disabled">
          </div>
          <div class="input-group col-md-7 col-sm-7 col-xs-7" id='descripClasifHerida'>
            <input v-model="form.descripClasifHerida" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
            data-orden="1" maxlength="30" disabled="disabled">
          </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" style="display:flex" :style="stylesHC890E.flexRow">
          <label class="col-md-4 col-sm-4 col-xs-4" :style="stylesHC890E.flexIzq">2. Dimension de la herida</label>
          <div class="input-group col-md-1 col-sm-1 col-xs-1" id='datoDimensionHerida'>
            <input v-model="dato_9009.dimension_heri" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="1" disabled="disabled">
          </div>
          <div class="input-group col-md-7 col-sm-7 col-xs-7" id='descripDimensionHerida'>
            <input v-model="form.descripDimensionHerida" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
            data-orden="1" maxlength="30" disabled="disabled">
          </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" style="display:flex" :style="stylesHC890E.flexRow">
          <label class="col-md-4 col-sm-4 col-xs-4" :style="stylesHC890E.flexIzq">3. Profundidad/Tejidos afectados</label>
          <div class="input-group col-md-1 col-sm-1 col-xs-1" id='datoProfunTejido'>
            <input v-model="dato_9009.profun_tejid" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="1" disabled="disabled">
          </div>
          <div class="input-group col-md-7 col-sm-7 col-xs-7" id='descripProfunTejido'>
            <input v-model="form.descripProfunTejido" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
            data-orden="1" maxlength="30" disabled="disabled">
          </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" style="display:flex" :style="stylesHC890E.flexRow">
          <label class="col-md-4 col-sm-4 col-xs-4" :style="stylesHC890E.flexIzq">4. Comorbilidad</label>
          <div class="input-group col-md-1 col-sm-1 col-xs-1" id='datoComorbilidad'>
            <input v-model="dato_9009.comorbilidad" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="1" disabled="disabled">
          </div>
          <div class="input-group col-md-7 col-sm-7 col-xs-7" id='descripComorbilidad'>
            <input v-model="form.descripComorbilidad" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
            data-orden="1" maxlength="30" disabled="disabled">
          </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" style="display:flex" :style="stylesHC890E.flexRow">
          <label class="col-md-4 col-sm-4 col-xs-4" :style="stylesHC890E.flexIzq">5. Estadio de la herida</label>
          <div class="input-group col-md-1 col-sm-1 col-xs-1" id='datoEstadioHeri'>
            <input v-model="dato_9009.estadio_heri" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="1" disabled="disabled">
          </div>
          <div class="input-group col-md-7 col-sm-7 col-xs-7" id='descripEstadioHeri'>
            <input v-model="form.descripEstadioHeri" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
            data-orden="1" maxlength="30" disabled="disabled">
          </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" style="display:flex" :style="stylesHC890E.flexRow">
          <label class="col-md-4 col-sm-4 col-xs-4" :style="stylesHC890E.flexIzq">6. Infeccion</label>
          <div class="input-group col-md-1 col-sm-1 col-xs-1" id='datoInfeccion'>
            <input v-model="dato_9009.infeccion" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="1" disabled="disabled">
          </div>
          <div class="input-group col-md-7 col-sm-7 col-xs-7" id='descripInfeccion'>
            <input v-model="form.descripInfeccion" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
            data-orden="1" maxlength="30" disabled="disabled">
          </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" style="display:flex" :style="stylesHC890E.flexRow">
          <label class="col-md-4 col-sm-4 col-xs-4" :style="stylesHC890E.flexIzq">7. tiempo de evolucion en tratamiento con clinica de heridas</label>
          <div class="input-group col-md-1 col-sm-1 col-xs-1" id='datoTiempoEvolu'>
            <input v-model="dato_9009.tiempo_evolu" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="1" disabled="disabled">
          </div>
          <div class="input-group col-md-7 col-sm-7 col-xs-7" id='descripTiempoEvolu'>
            <input v-model="form.descripTiempoEvolu" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
            data-orden="1" maxlength="30" disabled="disabled">
          </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12 head-box"  style="display:flex" :style="stylesHC890E.flexRow">
          <label class="col-md-4 col-sm-4 col-xs-4" :style="stylesHC890E.flexIzq">8. Registro fotografico</label>
          <div class="input-group col-md-1 col-sm-1 col-xs-1" id='datoRegistroFoto'>
            <input v-model="dato_9009.registro_foto" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="1" disabled="disabled">
          </div>
          <div class="input-group col-md-7 col-sm-7 col-xs-7" id='descripRegistroFoto'>
            <input v-model="form.descripRegistroFoto" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
            data-orden="1" maxlength="30" disabled="disabled">
          </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" style="display:flex" :style="stylesHC890E.flexRow">
          <label class="col-md-4 col-sm-4 col-xs-4" :style="stylesHC890E.flexIzq">Puntaje acumulado para asignacion de complejidad</label>
          <div class="input-group col-md-1 col-sm-1 col-xs-1" id='datoCalcHeridas'>
            <input v-model="dato_9009.calc_heridas" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="3" disabled="disabled">
          </div>
          <label class="col-md-2 col-sm-2 col-xs-2" :style="stylesHC890E.flexIzq">Tipo de paquete</label>
          <div class="input-group col-md-5 col-sm-5 col-xs-5" id='datoTipoPaquete'>
            <input v-model="form.datoTipoPaquete" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
            data-orden="1" maxlength="40" disabled="disabled">
          </div>
        </div>
    
      </div>
    </div>

  </div>
`,
});
