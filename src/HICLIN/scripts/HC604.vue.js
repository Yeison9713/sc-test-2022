const { getObjRegHC } = require("../../HICLIN/scripts/reg_hc.js");

var component_hc604 = Vue.component("content_hc604", {
  props: {
    params: {
      estado: false,
    },
    data: {},
  },
  data() {
    return {
      datos: this.data,
      reg_hc: getObjRegHC(),
      reg_paci: JSON.parse(JSON.stringify($_REG_PACI)),
      reg_prof: {},

      nitUsu: $_USUA_GLOBAL[0].NIT,

      anioAct: null,
      mesAct: null,
      diaAct: null,

      horaAct: null,
      minutoAct: null,

      paramsCovid: {
        estado: false,
        pregunta: 0,
        ciudades: [],
        paises: [],
      },

      descripUnserv: "",
      motivo_default: "",
      lenghtMotivo: 0,

      arrayEstado: [
        { COD: "1", DESCRIP: "ABIERTA" },
        { COD: "2", DESCRIP: "CERRADA" },
      ],
      modal_victimaConf: false
    };
  },
  components: {
    covid19: component_hc890h,
  },
  created() {
    _inputControl("disabled");
    _inputControl("reset");
    loader("show");
    _component = this;
    // this.init();
  },
  watch: {
    "params.estado": function (estado) {
      console.log("watch estado");
      if (estado) this.init();
    },

    "reg_hc.motiv": function (val) {
      this.reg_hc.motiv = val ? val.replaceEsp() : "";
    },
  },
  computed: {
    fechaAct() {
      return `${this.anioAct + this.mesAct + this.diaAct}`;
    },

    horaActual() {
      return `${this.horaAct + this.minutoAct}`;
    },

    pregCovid() {
      let serv = this.reg_hc.serv;
      if (
        serv == "01" ||
        serv == "02" ||
        serv == "08" ||
        serv == "09" ||
        serv == "63" ||
        (this.nitUsu == 900541158 && this.reg_hc.serv != "09")
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    getCiudades() {
      postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON809.DLL"))
        .then((data) => {
          console.log("getCiudades: ", data);
          this.paramsCovid.ciudades = data.CIUDAD;
        })
        .catch((error) => {
          console.log("Error consultando ciudades: ", error);
          CON851("", "Error consultando ciudades", null, "error", "Error");
          this.salir();
        });
    },

    getPaises() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER888.DLL"))
        .then((data) => {
          console.log("getPaises: ", data);
          this.paramsCovid.paises = data.PAISESRIPS;
        })
        .catch((error) => {
          console.log("Error consultando paises: ", error);
          CON851("", "Error consultando paises", null, "error", "Error");
          this.salir();
        });
    },

    getProfesional() {
      postData({ datosh: datosEnvio() + this.datos.medico }, get_url("APP/SALUD/SAL719-01.DLL"))
        .then((data) => {
          console.log("getProfesional: ", data);

          this.reg_prof = data.PERSATI[0];
        })
        .catch((error) => {
          loader("hide");
          console.log("error getProfesional", error);
          CON851("", "Error consultando datos profesional!", null, "error", "Error");
          this.salir();
        });
    },

    async init() {
      this.getCiudades();
      this.getPaises();

      await this.getProfesional();

      [this.anioAct, this.mesAct, this.diaAct] = moment().format("YYYY-MM-DD").split("-");

      [this.horaAct, this.minutoAct] = moment().format("HH-mm").split("-");

      if (this.datos.admin == "GEBC") {
        loader("hide");
        this.datoFolio();
      } else {
        this.getHistoria();
      }
    },

    datoFolio() {
      validarInputs(
        {
          form: "#datoFolio",
          orden: "1",
        },
        () => {
          this.salir();
        },
        () => {
          loader("show");
          this.getHistoria();
        }
      );
    },

    getHistoria() {
      postData(
        {
          datosh: datosEnvio() + `${this.datos.llave.id + this.datos.llave.folio}` + "|" + this.datos.admin + "|1|",
        },
        get_url("APP/HICLIN/GET_HC.DLL")
      )
        .then(async (data) => {
          this.reg_hc = await { ...this.reg_hc, ...data };

          if (this.reg_hc.novedad == "7") {
            loader("hide");
            this.crearHistoria();
          } else {
            loader("hide");
            CON851("2X", "2X", null, "warning", "Debe seleccionar un folio nuevo!");
            this.salir();
          }
        })
        .catch((err) => {
          CON851("", "Error leyendo historia clínica", null, "error", "error");
          console.log(err, "err");
          loader("hide");
          this.salir();
        });
    },

    crearHistoria() {
      if (this.nitUsu == 900565371) {
        this.reg_hc.esquema = "HC02";
      } else {
        this.reg_hc.esquema = "HC01";
      }

      this.reg_hc.fecha = this.fechaAct;
      this.reg_hc.hora = this.horaActual;
      this.reg_hc.oper_elab = this.datos.admin;
      this.reg_hc.med = this.reg_prof.IDENTIFICACION;
      this.reg_hc.unid_edad = this.datos.edad.unidad;
      this.reg_hc.vlr_edad = this.datos.edad.valor.toString().padStart(3, "0");
      this.reg_hc.cierre.eps = this.reg_paci.EPS;
      this.reg_hc.cierre.nit_fact = $_REG_PACI["NIT-FACT"];
      this.reg_hc.cierre.nit_contabilidad = this.nitUsu;

      if (this.reg_prof.ATIENDE == 6) {
        this.reg_hc.cierre.unserv = this.reg_hc.serv = "08";
      } else {
        this.reg_hc.cierre.unserv = this.reg_hc.serv = "04";
      }

      this.datoAnio();
    },

    datoAnio() {
      if (this.datos.admin == "GEBC" || this.nitUsu == 822005547) {
        validarInputs(
          {
            form: "#datoAnio",
            orden: "1",
          },
          () => {
            this.salir();
          },
          () => {
            this.anioAct = this.anioAct.padStart(4, "0");
            if (parseInt(this.anioAct) < 05) {
              CON851("37", "37", null, "warning", "Advertencia");
              this.datoAnio();
            } else {
              this.datoMes();
            }
          }
        );
      } else {
        this.ventanaUnserv();
      }
    },

    datoMes() {
      validarInputs(
        {
          form: "#datoMes",
          orden: "1",
        },
        () => {
          this.datoAnio();
        },
        () => {
          this.mesAct = this.mesAct.padStart(2, "0");

          if (parseInt(this.mesAct) < 1 || parseInt(this.mesAct) > 12) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoMes();
          } else {
            this.datoDia();
          }
        }
      );
    },

    datoDia() {
      validarInputs(
        {
          form: "#datoDia",
          orden: "1",
        },
        () => {
          this.datoMes();
        },
        () => {
          this.diaAct = this.diaAct.padStart(2, "0");
          this.reg_hc.fecha = this.fechaAct;

          if (!_validarFecha(this.anioAct, this.mesAct, this.diaAct)) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoDia();
          } else {
            this.datoHora();
          }
        }
      );
    },

    datoHora() {
      validarInputs(
        {
          form: "#datoHora",
          orden: "1",
        },
        () => {
          this.datoDia();
        },
        () => {
          this.horaAct = this.horaAct.padStart(2, "0");

          if (parseInt(this.horaAct) < 0 || parseInt(this.horaAct) > 23) {
            CON851("9Q", "9Q", null, "warning", "Advertencia");
            this.datoHora();
          } else {
            this.datoMinuto();
          }
        }
      );
    },

    datoMinuto() {
      validarInputs(
        {
          form: "#datoMinuto",
          orden: "1",
        },
        () => {
          this.datoHora();
        },
        () => {
          if (parseInt(this.minutoAct) < 0 || parseInt(this.minutoAct) > 59) {
            CON851("9Q", "9Q", null, "warning", "Advertencia");
            this.datoMinuto();
          } else {
            this.ventanaUnserv();
          }
        }
      );
    },

    ventanaUnserv() {
      console.log("ventanaUnserv");
      if (!parseInt(this.reg_hc.serv)) serv_w = "04";

      SER873(
        () => {
          CON851P("03", this.ventanaUnserv, this.salir);
        },
        this.datoUnserv,
        this.reg_hc.serv
      );
    },

    datoUnserv(data) {
      this.reg_hc.cierre.unserv = this.reg_hc.serv = data.COD;
      this.descripUnserv = data.DESCRIP.trim();

      serv = this.reg_hc.serv;

      if (
        ["01", "02", "03", "04", "08", "09", "42", "54", "51", "61", "62", "63"].includes(serv) ||
        (this.nitUsu == 844003225 && serv_w != "01")
      ) {
        this.datoPaciVictConflicto();
      } else {
        CON851("B1", "B1", null, "warning", "Advertencia");
        this.salir();
      }
    },

    datoPaciVictConflicto() {
      setTimeout(() => {
        this.reg_hc.victi_conflicto_paci = $_REG_PACI["VICTI-CONFLICTO"].trim();
        this.modal_victimaConf = true;

        validarInputs(
          {
            form: "#datoPaciVictConflicto",
          },
          () => {
            this.modal_victimaConf = false;
            this.ventanaUnserv();
          },
          () => {
            this.modal_victimaConf = false;
            this.reg_hc.victi_conflicto_paci = this.reg_hc.victi_conflicto_paci.toUpperCase().trim();

            if (this.reg_hc.victi_conflicto_paci == "S" || this.reg_hc.victi_conflicto_paci == "N") {
              $_REG_PACI["VICTI-CONFLICTO"] = this.reg_hc.victi_conflicto_paci;
              this.datoTelesalud();
            } else {
              CON851("03", "03", null, "warning", "Advertencia");
              this.datoPaciVictConflicto();
            }
          }
        );
      }, 300);
    },

    datoTelesalud() {
      if (this.reg_hc.serv != "63") {
        this.reg_hc.telesalud = "";
        this.datoProcedencia();
      } else {
        this.ventanaTelesalud();
      }
    },

    ventanaTelesalud() {
      CON851P(
        "El paciente acepta la consulta mediante telesalud:",
        () => {
          this.reg_hc.telesalud = "N";
          this.datoProcedencia();
        },
        () => {
          this.reg_hc.telesalud = "S";
          this.datoProcedencia();
        }
      );
    },

    datoProcedencia() {
      let { proceden } = this.reg_hc.proceden;
      this.reg_hc.proceden = proceden || this.reg_paci["DESCRIP-CIUDAD"];
      validarInputs(
        {
          form: "#datoProcedencia",
          orden: "1",
        },
        () => {
          CON851P("03", this.datoProcedencia, this.salir);
        },
        () => {
          if (!this.reg_hc.proceden) {
            this.datoProcedencia();
          } else {
            this.datoMotivo();
          }
        }
      );
    },

    datoMotivo() {
      if (this.reg_hc.serv == "08") {
        if (!this.reg_hc.motiv.trim()) {
          // Vue.set(this.reg_hc, motiv, "PROMOCION Y PREVENCION ")
          this.reg_hc.motiv = "PROMOCION Y PREVENCION ";
        }

        this.lenghtMotivo = 72;
        validarInputs(
          {
            form: "#datoMotivo",
            orden: "1",
          },
          () => {
            this.datoProcedencia();
          },
          () => {
            this.datoEstado();
          }
        );
      } else if (this.nit_usu == 891855847) {
        this.motivo_default = "";
        this.lenghtMotivo = 190;
        this.validarMotivo();
      } else {
        this.lenghtMotivo = 190;
        switch (this.reg_prof.ATIENDE) {
          case "5":
            this.motivo_default = "TERAPIAS ";
            this.validarMotivo();
            break;
          case "7":
            this.motivo_default = "PSICO-TERAPIAS ";
            this.datoEstado();
            break;
          case "8":
            this.motivo_default = "NUTRICION ";
            this.validarMotivo();
            break;
          case "T":
            this.motivo_default = "TRABAJO SOCIAL ";
            this.datoEstado();
            break;
          default:
            this.motivo_default = " ";
            this.validarMotivo();
            break;
        }
      }
    },

    validarMotivo() {
      validarInputs(
        {
          form: "#datoMotivo",
          orden: "1",
        },
        () => {
          this.datoProcedencia();
        },
        () => {
          let serv = this.reg_hc.serv;
          if (!this.reg_hc.motiv) {
            CON851("02", "02", null, "warning", "Advertencia");
            this.datoMotivo();
          } else {
            this.reg_hc.motiv = this.motivo_default + this.reg_hc.motiv;
            this.datoCovid();
          }
        }
      );
    },

    async datoCovid() {
      if (this.pregCovid) {
        this.paramsCovid.pregunta = 1;
        this.paramsCovid.estado = true;
        this.reg_hc.covid19.recomendacion_covid = "S";
      } else {
        this.reg_hc.covid19 = _tipoJsonHc("covid19");
        this.reg_hc.covid19.recomendacion_covid = "";
        this.datoEstado();
      }
    },

    datoEstado() {
      if (!this.reg_hc.cierre.estado) {
        this.reg_hc.cierre.estado = "1";
      }

      if (this.reg_hc.serv == "08") {
        this.reg_hc.cierre.estado = "2";
        this.confirmarEstado();
      } else {
        setTimeout(() => {
          POPUP(
            {
              titulo: "Estado historia",
              array: this.arrayEstado,
              indices: [{ id: "COD", label: "DESCRIP" }],
              seleccion: this.reg_hc.cierre.estado || "1",
              callback_f: this.datoMotivo,
            },
            (data) => {
              this.reg_hc.cierre.estado = data.COD;
              this.confirmarEstado();
            }
          );
        }, 300);
      }
    },

    confirmarEstado() {
      CON851P("01", this.datoTelesalud, this.grabarHistoria);
    },

    async grabarHistoria() {
      if (this.reg_hc.cierre.estado == "2") {
        this.reg_hc.cierre.fecha_ult_cierre = moment().format("YYYYMMDD");
        this.reg_hc.cierre.hora_ult_cierre = moment().format("HHmm");
        this.reg_hc.cierre.oper_ult_cierre = this.reg_hc.oper_elab;
        this.reg_hc.cierre.cod_ult_cierre = "F";

        await postData(
          {
            datosh: datosEnvio() + this.reg_hc.cierre.hab + "|HC604|" + this.reg_hc.llave.slice(0, 15) + "|" + this.reg_hc.oper_elab + "|",
          },
          get_url("APP/HICLIN/LIBERAR-CAMA-HC.DLL")
        ).then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error, "error liberando cama");
        });
      }

      this.reg_hc.hora = this.horaActual;
      this.reg_hc.fecha = this.fechaAct;

      let datos = {
        datosh: datosEnvio(),
        ..._getObjetoSaveHc(this.reg_hc, filtroArray.tablasHC),
      };

      await postData(datos, get_url("APP/HICLIN/SAVE_HC_2.DLL"))
        .then((data) => {
          console.log(data);
          // VARIABLES VALIDACION LLAMADO VACUNACION COVID
          $_REG_HC.llave_hc = this.reg_hc.llave;
          $_REG_HC.id_paciente = this.reg_hc.llave.slice(0, 15);
          $_REG_HC.suc_folio_hc = this.reg_hc.llave.slice(15, 17);
          $_REG_HC.nro_folio_hc = this.reg_hc.llave.slice(17);
          $_REG_HC.serv_hc = this.reg_hc.serv;
          $_REG_HC.fecha_hc = this.reg_hc.fecha;
          $_REG_HC.novedad_hc = this.reg_hc.novedad;
          this.terminar();
        })
        .catch((error) => {
          console.log(error, "error");
          CON851("", "Error grabando historia", null, "error", "Error");
          this.datoAnio();
        });
    },

    salir() {
      this.$emit("callback_esc");
    },

    terminar() {
      this.$emit("callback");
    },

    validarEsc_covid(esc) {
      this.paramsCovid.pregunta = 0;
      this.paramsCovid.estado = false;

      switch (parseInt(esc)) {
        case 1:
        case 2:
        case 3:
        case 4:
          this.datoMotivo();
          break;
      }
    },

    validarCallback_covid(call, data) {
      this.reg_hc.covid19 = data;
      this.paramsCovid.pregunta = 0;
      this.paramsCovid.estado = false;

      switch (parseInt(call)) {
        case 1:
        case 2:
        case 3:
        case 4:
          this.datoEstado();
          break;
      }
    },
  },

  template: /*html*/ `
    <div class="form-group box-center col-md-12" style="padding: 1.3rem; overflow-y: scroll; height: 90vh;">
      <div class="form-horizontal">
        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="form-group col-md-1 col-sm-3 col-xs-12" id="datoAnio">
                    <label>Año</label>
                    <div class="inline-inputs">
                        <div class="input-group col-md-12 col-sm-12 col-xs-12">
                            <input type="text" v-model="anioAct" maxlength="4" data-orden="1" required="true"
                                class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                        </div>
                    </div>
                </div>

                <div class="col-md-1 col-sm-3 col-xs-12" id="datoMes">
                    <label>Mes</label>
                    <div class="inline-inputs">
                        <div class="input-group col-md-12 col-sm-12 col-xs-12">
                            <input type="text" v-model="mesAct" maxlength="2" data-orden="1" required="true"
                                class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                        </div>
                    </div>
                </div>

                <div class="col-md-1 col-sm-3 col-xs-12" id="datoDia">
                    <label>Dia</label>
                    <div class="inline-inputs">
                        <div class="input-group col-md-12 col-sm-12 col-xs-12">
                            <input type="text" v-model="diaAct" maxlength="2" data-orden="1" required="true"
                                class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                        </div>
                    </div>
                </div>

                <div class="col-md-1 col-sm-1 col-xs-12">
                    <label>Hora</label>
                    <div class="input-group col-md-12 col-sm-12 col-xs-12" id="datoHora">
                        <input type="number" v-model="horaAct" maxlength="2" required="true" data-orden="1"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
                <div class="col-md-1 col-sm-1 col-xs-12">
                    <label>Min</label>
                    <div class="input-group col-md-12 col-sm-12 col-xs-12" id="datoMinuto">
                        <input type="number" v-model="minutoAct" maxlength="2" required="true" data-orden="1"
                            class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: center" disabled="disabled">
                    </div>
                </div>
                <div class="col-md-4 col-sm-4 col-xs-12" style="text-align: left;">
                    <label>Medico</label>
                    <div class="input-group inline-inputs col-md-12 col-sm-12 col-xs-12">
                        <div class="col-md-4 col-sm-4 col-xs-12 no-padding">
                            <input type="number" v-model="reg_prof.IDENTIFICACION" maxlenght="10"
                                class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: left" disabled="disabled">
                        </div>
                        <div class="col-md-8 col-sm-8 col-xs-12 no-padding">
                            <input type="text" v-model.trim="reg_prof.DESCRIP" maxlenght="30"
                                class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: left" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-1 col-xs-12">
                    <label>Folio</label>
                    <div class="input-group col-md-12 col-sm-12 col-xs-12" id="datoFolio">
                        <input type="text" v-model="datos.llave.folio" maxlength="8" required="true"
                            data-orden="1" class="form-control col-md-12 col-sm-12 col-xs-12"
                            style="text-align: center" disabled="disabled">
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-12 col-sm-12 no-padding">
            <div class="portlet light box-center box-title">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold">
                            ACTIVACIÓN DE HISTORIA EN BLANCO PARA PROCEDIMIENTOS AMBULATORIOS Y MEDICINA
                            ESPECIALIZADA
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-12 col-sm-12 col-xs-12 box-center no-padding">
            <div class="col-md-4 col-sm-4 col-xs-12 no-padding">
                <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                    <div class="col-md-12 col-sm-12 col-xs-12 no-padding" style="text-align: left;">
                        <label>Unidad de servicio</label>
                        <div class="inline-inputs">
                            <div class="input-group col-md-2 col-sm-2 col-xs-2">
                                <input v-model="reg_hc.serv"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                            </div>
                            <div class="input-group col-md-10 col-sm-10 col-xs-10">
                                <input v-model="descripUnserv"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-8 col-sm-8 col-xs-12 no-padding">
                <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                    <div class="col-md-12 col-sm-12 col-xs-12 no-padding" style="text-align: left;">
                        <label>Procedencia</label>
                        <div class="inline-inputs">
                            <div class="input-group col-md-12 col-sm-12 col-xs-12" id="datoProcedencia">
                                <input v-model="reg_hc.proceden"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" type="text"
                                    disabled="disabled" data-orden="1" style="text-align: left !important;"
                                    maxlength="50">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <transition v-if="modal_victimaConf">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="col-md-4 col-sm-8 col-xs-10 no-padding">
                  <div class="form-group box-center" style="text-align: left">
                    <div
                      class="col-md-12 no-padding"
                      style="display: flex; justify-content: center; flex-direction: column"
                    >
                      <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: center; padding: 1rem 0 1rem 0">
                        <label style="font-size: 1.5em">Víctima conflicto</label>
                      </div>
                      <div class="col-md-10" style="align-self: center">
                        <div
                          class="col-md-12 col-sm-12 col-xs-12"
                          style="
                            display: flex;
                            align-items: center;
                            justify-content: space-around;
                            padding-bottom: 1rem;
                          "
                        >
                          <label class="col-md-6 col-sm-6 col-xs-6 font-small" style="text-align: left"
                            >Víctima de conflicto:</label
                          >
                          <div class="col-md-4 col-sm-4 col-xs-4" id="datoPaciVictConflicto">
                            <input
                              type="text"
                              class="form-control text-center"
                              disabled="disabled"
                              maxlength="1"
                              v-model="reg_hc.victi_conflicto_paci"
                              data-orden="1"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </transition>

        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 col-sm-12 col-xs-12 no-padding" id="datoMotivo">
                    <div class="col-md-12 col-sm-12 col-xs-12 head-box"
                        style="display: flex; justify-content:space-between; padding-right: 0; padding-left: 0;">
                        <label>Motivo de consulta: {{ motivo_default }} </label>
                    </div>
                    <textarea v-model="reg_hc.motiv" class="form-control" disabled="disabled" rows="2"
                        :maxlength="lenghtMotivo" data-orden="1" required="true"
                        style="resize: none; text-align: justify;"></textarea>
                </div>
            </div>
        </div>
        <div>
            <div class="form-group col-md-12 col-sm-12 no-padding" v-show="pregCovid">
                <div class="portlet light box-center box-title" style="margin: 0 auto;">
                    <div class="portlet-title">
                        <div class="caption">
                            <span class="caption-subject bold">Covid19.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                <covid19 v-if="pregCovid" v-bind:params="paramsCovid" @callback="validarCallback_covid" @callback_esc="validarEsc_covid" v-bind:data="reg_hc.covid19">
                </covid19>
            </div>
        </div>
      </div>
    </div>
  `,
});
