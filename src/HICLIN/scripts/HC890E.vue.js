const { detallesHc, grabarDetalles } = require("../../HICLIN/scripts/reg_dethc.js");

// componente test frindisk con complemento riesgo cardiovascular julio 15/2021 - santiago franco

module.exports = Vue.component("content_hc890E", {
  props: {
    params: {},
    data: {},
  },
  data() {
    return {
      findrisk: {
        peso_lnk: "",
        talla_lnk: "",
        imc_lnk: "",
        vlr_edad_lnk: "",
        per_abdo_lnk: "",
        tens1_lnk: ""
      },

      dato_9008: detallesHc.WS_9008(),

      form: {
        datoDescripEdad: "",
        datoDescripImc: "",
        descripPerAbdo: "",
        descripComeVerdu: "",
        descripDiabetes: "",
        descripTotal: "",

        diabetes_paci: "",
        porcenCardio: "",
        nivelRiesgo: "",

        riesgCardio: "",
      },

      comeVerdu: [
        { COD: "1", DESCRIP: "TODOS LOS DIAS" },
        { COD: "2", DESCRIP: "NO TODOS LOS DIAS" },
      ],

      diabetes: [
        { COD: "1", DESCRIP: "NO" },
        { COD: "2", DESCRIP: "SI: ABUELOS, TIA, TIO, PRIMO, HERMANO" },
        { COD: "3", DESCRIP: "SI: PADRES, HERMANOS O HIJOS" },
      ],

      resultadoColesterol: null,
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
          this.llenarDatosIniciales()
          this.validarActivFisica();
        }, 400);
    },
    data: {
      deep: true,
      handler: function (param) {
        this.findrisk = param;
        console.log("cambia data ->", this.findrisk);
        this.llenarDatos()
      },
    },
  },
  created() {
    $this = this;
    this.cargarDestalles();
    this.findrisk = this.data;
  },
  methods: {
    async llenarDatos() {
      let busqDetalle_9008 = this.detalles.find(
        (el) => el["COD-DETHC"] == "9008" && el["LLAVE-HC"] == $_REG_HC.llave_hc
      );
      if (busqDetalle_9008) {
        this.dato_9008 = busqDetalle_9008.DETALLE;

        this.llenarDatosIniciales()

        switch (this.dato_9008.come_verdu) {
          case "1":
            this.form.descripComeVerdu = "TODOS LOS DIAS";
            break;
          case "2":
            this.form.descripComeVerdu = "NO TODOS LOS DIAS";
            break;
        }

        switch (this.dato_9008.diabetes_fam) {
          case "1":
            this.form.descripDiabetes = "NO";
            break;
          case "2":
            this.form.descripDiabetes = "SI: ABUELOS, TIA, TIO, PRIMO, HERMANO";
            break;
          case "3":
            this.form.descripDiabetes = "SI: PADRES, HERMANOS O HIJOS";
            break;
        }

        if (this.dato_9008.calc_findrisk > 14) {
          this.form.descripTotal = "Riesgo de diabetes. consulte su medico.";
        } else {
          this.form.descripTotal = "Sin riesgo de diabetes.";
        }

        this.form.diabetes_paci = $_REG_PACI["DIABETES"];

        if (this.dato_9008.colesterol_hdl_3m == "S") {
          this.resultadoColesterol = true;
        }

        this.form.riesgCardio = this.dato_9008.calc_riesgo_cardio.toString();
        if (this.dato_9008.calc_riesgo_cardio > 0) {
          switch (this.form.riesgCardio) {
            case "1":
              this.form.porcenCardio = "< 10%";
              this.form.nivelRiesgo = "Riesgo bajo";
              break;
            case "2":
              this.form.porcenCardio = "10% A < 20%";
              this.form.nivelRiesgo = "Riesgo moderado";
              break;
            case "3":
              this.form.porcenCardio = "20% A < 30%";
              this.form.nivelRiesgo = "Riesgo alto";
              break;
            case "4":
              this.form.porcenCardio = "30% A < 40%";
              this.form.nivelRiesgo = "Riesgo muy alto";
              break;
            case "5":
              this.form.porcenCardio = ">= 40%";
              this.form.nivelRiesgo = "Riesgo extremadamente alto";
              break;
          }
        }
      }
    },

    llenarDatosIniciales() {
      if (this.findrisk.vlr_edad_lnk < 45) {
        this.dato_9008.edad = "1";
        this.form.datoDescripEdad = "MENOS DE 45 AÑOS";
      } else if (this.datos_findrisk.vlr_edad_lnk > 64) {
        this.dato_9008.edad = "4";
        this.form.datoDescripEdad = "MAS DE 64 AÑOS";
      } else if (this.datos_findrisk.vlr_edad_lnk >= 45 || this.datos_findrisk.vlr_edad_lnk <= 54) {
        this.dato_9008.edad = "2";
        this.form.datoDescripEdad = "45-54 AÑOS";
      } else {
        this.dato_9008.edad = "3";
        this.form.datoDescripEdad = "55-64 AÑOS";
      }

      if (this.findrisk.imc_lnk < 25) {
        this.dato_9008.imc = "1";
        this.form.datoDescripImc = "MENOR DE 25 KG/M²";
      } else if (this.findrisk.imc_lnk > 30) {
        this.dato_9008.imc = "3";
        this.form.datoDescripImc = "MAYOR DE 30 KG/M²";
      } else {
        this.dato_9008.imc = "2";
        this.form.datoDescripImc = "ENTRE 25-30 KG/M²";
      }

      if ($_REG_PACI.SEXO == "M") {
        if (this.findrisk.per_abdo_lnk < 94) {
          this.dato_9008.per_abdo = "1";
          this.form.descripPerAbdo = "MENOS DE 94 CM";
        } else if (this.findrisk.per_abdo_lnk > 102) {
          this.dato_9008.per_abdo = "3";
          this.form.descripPerAbdo = "MAS DE 102 CM";
        } else {
          this.dato_9008.per_abdo = "2";
          this.form.descripPerAbdo = "ENTRE 94-102 CM";
        }
      } else {
        if (this.findrisk.per_abdo_lnk < 80) {
          this.dato_9008.per_abdo = "1";
          this.form.descripPerAbdo = "MENOS DE 80 CM";
        } else if (this.findrisk.per_abdo_lnk > 88) {
          this.dato_9008.per_abdo = "3";
          this.form.descripPerAbdo = "MAS DE 88 CM";
        } else {
          this.dato_9008.per_abdo = "2";
          this.form.descripPerAbdo = "ENTRE 80-88 CM";
        }
      }

    },
    validarActivFisica() {
      this.dato_9008.activ_fisica.trim() == "" ? (this.dato_9008.activ_fisica = "N") : false;
      validarInputs(
        {
          form: "#activFisica",
        },
        () => {
          this._escape();
        },
        () => {
          this.dato_9008.activ_fisica = this.dato_9008.activ_fisica.toUpperCase();
          var temp = this.dato_9008.activ_fisica;
          if (temp == "S" || temp == "N") {
            this.validarComerVerdu();
          } else {
            CON851("03", "03", null, "error", "error");
            this.validarActivFisica();
          }
        }
      );
    },

    validarComerVerdu() {
      POPUP(
        {
          titulo: "Come verduras o frutas?",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.comeVerdu,
          seleccion: this.dato_9008.come_verdu,
          callback_f: () => this.validarActivFisica(),
        },
        (data) => {
          this.dato_9008.come_verdu = data.COD;
          this.form.descripComeVerdu = data.DESCRIP;
          this.validarHiper();
        }
      );
    },

    validarHiper() {
      this.dato_9008.medica_hipert.trim() == "" ? (this.dato_9008.medica_hipert = "N") : false;
      validarInputs(
        {
          form: "#hiper",
        },
        () => {
          this.validarComerVerdu();
        },
        () => {
          this.dato_9008.medica_hipert = this.dato_9008.medica_hipert.toUpperCase();
          var temp = this.dato_9008.medica_hipert;
          if (temp == "S" || temp == "N") {
            this.validarGluco();
          } else {
            CON851("03", "03", null, "error", "error");
            this.validarHiper();
          }
        }
      );
    },

    validarGluco() {
      this.dato_9008.glucosa_alto.trim() == "" ? (this.dato_9008.glucosa_alto = "N") : false;
      validarInputs(
        {
          form: "#glucosa",
        },
        () => {
          this.validarHiper();
        },
        () => {
          this.dato_9008.glucosa_alto = this.dato_9008.glucosa_alto.toUpperCase();
          var temp = this.dato_9008.glucosa_alto;
          if (temp == "S" || temp == "N") {
            this.validarDiabetes();
          } else {
            CON851("03", "03", null, "error", "error");
            this.validarGluco();
          }
        }
      );
    },

    validarDiabetes() {
      POPUP(
        {
          titulo: "Diag diabetes",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: this.diabetes,
          seleccion: this.dato_9008.diabetes_fam,
          callback_f: () => this.validarGluco(),
        },
        (data) => {
          this.dato_9008.diabetes_fam = data.COD;
          this.form.descripDiabetes = data.DESCRIP;
          this.calcularFindrisk();
        }
      );
    },

    async calcularFindrisk() {
      this.findrisk.edad = this.dato_9008.edad;
      this.findrisk.perAbdo = this.dato_9008.per_abdo;
      this.findrisk.imc = this.dato_9008.imc;
      this.findrisk.activFisica = this.dato_9008.activ_fisica;
      this.findrisk.comeVerdu = this.dato_9008.come_verdu;
      this.findrisk.hiper = this.dato_9008.medica_hipert;
      this.findrisk.glucosa = this.dato_9008.glucosa_alto;
      this.findrisk.diabetes = this.dato_9008.diabetes_fam;

      let edad = parseInt(this.findrisk.edad);
      let per_abdo = parseInt(this.findrisk.perAbdo);
      let imc = parseInt(this.findrisk.imc);

      let actFisica = 0;
      if (this.findrisk.activFisica != "S") {
        actFisica = 2;
      }

      let comeVerd = 0;
      if (this.findrisk.comeVerdu != "1") {
        comeVerd = 1;
      }

      let hiper = 0;
      if (this.findrisk.hiper != "N") {
        hiper = 2;
      }

      let gluco = 0;
      if (this.findrisk.glucosa != "N") {
        gluco = 5;
      }

      let diab = 0;
      switch (this.findrisk.diabetes) {
        case "2":
          diab = 3;
          break;
        case "3":
          diab = 5;
          break;
      }

      this.dato_9008.calc_findrisk = edad + per_abdo + imc + actFisica + comeVerd + hiper + gluco + diab;

      if (this.dato_9008.calc_findrisk > 14) {
        this.findrisk.requiere_findrisk = "S";
        this.form.descripTotal = "Riesgo de diabetes. consulte su medico.";
      } else {
        this.findrisk.requiere_findrisk = "N";
        this.form.descripTotal = "Sin riesgo de diabetes.";
      }
      this.validarDiabetes_paci();
    },

    validarDiabetes_paci() {
      this.form.diabetes_paci.trim() == "" ? (this.form.diabetes_paci = "N") : false;
      validarInputs(
        {
          form: "#diabetPaci",
        },
        () => {
          this.validarActivFisica();
        },
        () => {
          this.form.diabetes_paci = this.form.diabetes_paci.toUpperCase();
          var temp = this.form.diabetes_paci;
          if (temp == "S" || temp == "N") {
            this.validarColesterolHdl3M();
          } else {
            CON851("03", "03", null, "error", "error");
            this.validarDiabetes_paci();
          }
        }
      );
    },

    validarColesterolHdl3M() {
      this.dato_9008.colesterol_hdl_3m.trim() == "" ? (this.dato_9008.colesterol_hdl_3m = "N") : false;
      validarInputs(
        {
          form: "#colesterolHdl3M",
        },
        () => {
          this.validarDiabetes_paci();
        },
        () => {
          this.dato_9008.colesterol_hdl_3m = this.dato_9008.colesterol_hdl_3m.toUpperCase();
          var temp = this.dato_9008.colesterol_hdl_3m;
          if (temp == "S" || temp == "N") {
            this.validarDatoValorColesterol();
          } else {
            CON851("03", "03", null, "error", "error");
            this.validarColesterolHdl3M();
          }
        }
      );
    },

    validarDatoValorColesterol() {
      if (this.dato_9008.colesterol_hdl_3m == "N") {
        this.validarConsumeTabac();
        this.dato_9008.valor_colesterol = "";
        this.dato_9008.valor_hdl = "";
        this.resultadoColesterol = false;
      } else {
        this.resultadoColesterol = true;
        validarInputs(
          {
            form: "#resultColesterol",
          },
          () => {
            this.validarColesterolHdl3M();
          },
          () => {
            this.dato_9008.valor_colesterol = cerosIzq(this.dato_9008.valor_colesterol, 3);
            if (this.dato_9008.valor_colesterol == 0) {
              CON851("03", "03", null, "error", "error");
              this.validarDatoValorColesterol();
            } else {
              this.validarDatoValorHdl();
            }
          }
        );
      }
    },

    validarDatoValorHdl() {
      validarInputs(
        {
          form: "#resultHdl",
        },
        () => {
          this.validarDatoValorColesterol();
        },
        () => {
          this.dato_9008.valor_hdl = cerosIzq(this.dato_9008.valor_hdl, 2);
          if (this.dato_9008.valor_hdl == 0) {
            CON851("03", "03", null, "error", "error");
            this.validarDatoValorHdl();
          } else {
            this.validarConsumeTabac();
          }
        }
      );
    },

    validarConsumeTabac() {
      this.dato_9008.consume_tabaco.trim() == "" ? (this.dato_9008.consume_tabaco = "N") : false;
      validarInputs(
        {
          form: "#consumeTabac",
        },
        () => {
          this.validarColesterolHdl3M();
        },
        () => {
          this.dato_9008.consume_tabaco = this.dato_9008.consume_tabaco.toUpperCase();
          var temp = this.dato_9008.consume_tabaco;
          if (temp == "S" || temp == "N") {
            this.validarPorcenRiesgoCardio();
          } else {
            CON851("03", "03", null, "error", "error");
            this.validarConsumeTabac();
          }
        }
      );
    },

    async validarPorcenRiesgoCardio() {
      var vlr_edad = this.findrisk.vlr_edad_lnk;
      var tens1 = parseFloat(this.findrisk.tens1_lnk);
      var edad_c;
      var tens1_c;

      if (vlr_edad >= 70) {
        edad_c = "4";
      } else if (vlr_edad >= 60) {
        edad_c = "3";
      } else if (vlr_edad >= 50) {
        edad_c = "2";
      } else {
        edad_c = "1";
      }

      if (tens1 >= 180) {
        tens1_c = "4";
      } else if (tens1 >= 160) {
        tens1_c = "3";
      } else if (tens1 >= 140) {
        tens1_c = "2";
      } else {
        tens1_c = "1";
      }

      if (this.form.diabetes_paci == "S") {
        await this.evaluarCardioConDiabet(edad_c, tens1_c);
      } else {
        await this.evaluarCardioSinDiabet(edad_c, tens1_c);
      }

      if (parseInt(this.form.riesgCardio) > 0) {
        switch (this.form.riesgCardio) {
          case "1":
            this.form.porcenCardio = "< 10%";
            this.form.nivelRiesgo = "Riesgo bajo";
            break;
          case "2":
            this.form.porcenCardio = "10% A < 20%";
            this.form.nivelRiesgo = "Riesgo moderado";
            break;
          case "3":
            this.form.porcenCardio = "20% A < 30%";
            this.form.nivelRiesgo = "Riesgo alto";
            break;
          case "4":
            this.form.porcenCardio = "30% A < 40%";
            this.form.nivelRiesgo = "Riesgo muy alto";
            break;
          case "5":
            this.form.porcenCardio = ">= 40%";
            this.form.nivelRiesgo = "Riesgo extremadamente alto";
            break;
        }
      }

      this.dato_9008.calc_riesgo_cardio = parseInt(this.form.riesgCardio);

      this.actualizarPaciente();
    },

    async evaluarCardioConDiabet(edad_c, tens1_c) {
      switch (edad_c) {
        case "1":
          switch (tens1_c) {
            case "1":
              this.form.riesgCardio = "1";
              break;
            case "2":
              this.form.riesgCardio = "1";
              break;
            case "3":
              if ($_REG_PACI.SEXO == "M") {
                if (this.dato_9008.consume_tabaco == "S") {
                  this.form.riesgCardio = "3";
                } else {
                  this.form.riesgCardio = "1";
                }
              } else {
                if (this.dato_9008.consume_tabaco == "S") {
                  this.form.riesgCardio = "4";
                } else {
                  this.form.riesgCardio = "2";
                }
              }
              break;
            case "4":
              if ($_REG_PACI.SEXO == "M" && this.dato_9008.consume_tabaco == "N") {
                this.form.riesgCardio = "4";
              } else {
                this.form.riesgCardio = "5";
              }
              break;
          }
          break;
        case "2":
          switch (tens1_c) {
            case "1":
              this.form.riesgCardio = "1";
              break;
            case "2":
              if (this.dato_9008.consume_tabaco == "S") {
                this.form.riesgCardio = "2";
              } else {
                this.form.riesgCardio = "1";
              }
              break;
            case "3":
              if (this.dato_9008.consume_tabaco == "S") {
                this.form.riesgCardio = "4";
              } else {
                this.form.riesgCardio = "2";
              }
              break;
            case "4":
              this.form.riesgCardio = "5";
              break;
          }
          break;
        case "3":
          switch (tens1_c) {
            case "1":
              if ($_REG_PACI.SEXO == "M" && this.dato_9008.consume_tabaco == "S") {
                this.form.riesgCardio = "2";
              } else {
                this.form.riesgCardio = "1";
              }
              break;
            case "2":
              if ($_REG_PACI.SEXO == "M") {
                if (this.dato_9008.consume_tabaco == "S") {
                  this.form.riesgCardio = "3";
                } else {
                  this.form.riesgCardio = "2";
                }
              } else {
                if (this.dato_9008.consume_tabaco == "S") {
                  this.form.riesgCardio = "2";
                } else {
                  this.form.riesgCardio = "1";
                }
              }
              break;
            case "3":
              if ($_REG_PACI.SEXO == "M") {
                if (this.dato_9008.consume_tabaco == "S") {
                  this.form.riesgCardio = "5";
                } else {
                  this.form.riesgCardio = "3";
                }
              } else {
                if (this.dato_9008.consume_tabaco == "S") {
                  this.form.riesgCardio = "4";
                } else {
                  this.form.riesgCardio = "2";
                }
              }
              break;
            case "4":
              this.form.riesgCardio = "5";
              break;
          }
          break;
        case "4":
          switch (tens1_c) {
            case "1":
              if ($_REG_PACI.SEXO == "M" && this.dato_9008.consume_tabaco == "S") {
                this.form.riesgCardio = "3";
              } else {
                this.form.riesgCardio = "2";
              }
              break;
            case "2":
              if (this.dato_9008.consume_tabaco == "S") {
                this.form.riesgCardio = "4";
              } else {
                if ($_REG_PACI.SEXO == "M") {
                  this.form.riesgCardio = "3";
                } else {
                  this.form.riesgCardio = "2";
                }
              }
              break;
            case "3":
              if (this.dato_9008.consume_tabaco == "S") {
                this.form.riesgCardio = "5";
              } else {
                this.form.riesgCardio = "4";
              }
              break;
            case "4":
              this.form.riesgCardio = "5";
              break;
          }
          break;
      }
    },

    async evaluarCardioSinDiabet(edad_c, tens1_c) {
      switch (edad_c) {
        case "1":
          switch (tens1_c) {
            case "1":
              this.form.riesgCardio = "1";
              break;
            case "2":
              this.form.riesgCardio = "1";
              break;
            case "3":
              if (this.dato_9008.consume_tabaco == "S") {
                this.form.riesgCardio = "1";
              } else {
                this.form.riesgCardio = "2";
              }
              break;
            case "4":
              if (this.dato_9008.consume_tabaco == "S") {
                this.form.riesgCardio = "5";
              } else {
                if ($_REG_PACI.SEXO == "M") {
                  this.form.riesgCardio = "3";
                } else {
                  this.form.riesgCardio = "4";
                }
              }
              break;
          }
          break;
        case "2":
          switch (tens1_c) {
            case "1":
              this.form.riesgCardio = "1";
              break;
            case "2":
              this.form.riesgCardio = "1";
              break;
            case "3":
              if ($_REG_PACI.SEXO == "M") {
                if (this.dato_9008.consume_tabaco == "S") {
                  this.form.riesgCardio = "3";
                } else {
                  this.form.riesgCardio = "2";
                }
              } else {
                if (this.dato_9008.consume_tabaco == "S") {
                  this.form.riesgCardio = "2";
                } else {
                  this.form.riesgCardio = "1";
                }
              }
              break;
            case "4":
              if (this.dato_9008.consume_tabaco == "S") {
                this.form.riesgCardio = "5";
              } else {
                this.form.riesgCardio = "4";
              }
              break;
          }
          break;
        case "3":
          switch (tens1_c) {
            case "1":
              this.form.riesgCardio = "1";
              break;
            case "2":
              if ($_REG_PACI.SEXO == "M" && this.dato_9008.consume_tabaco == "S") {
                this.form.riesgCardio = "2";
              } else {
                this.form.riesgCardio = "1";
              }
              break;
            case "3":
              if (
                ($_REG_PACI.SEXO == "M" && this.dato_9008.consume_tabaco == "N") ||
                ($_REG_PACI.SEXO == "F" && this.dato_9008.consume_tabaco == "S")
              ) {
                this.form.riesgCardio = "2";
              } else {
                if ($_REG_PACI.SEXO == "M" && this.dato_9008.consume_tabaco == "S") {
                  this.form.riesgCardio = "4";
                } else {
                  this.form.riesgCardio = "1";
                }
              }
              break;
            case "4":
              if (this.dato_9008.consume_tabaco == "S") {
                this.form.riesgCardio = "5";
              } else {
                this.form.riesgCardio = "4";
              }
              break;
          }
          break;
        case "4":
          switch (tens1_c) {
            case "1":
              if ($_REG_PACI.SEXO == "M" && this.dato_9008.consume_tabaco == "S") {
                this.form.riesgCardio = "2";
              } else {
                this.form.riesgCardio = "1";
              }
              break;
            case "2":
              if ($_REG_PACI.SEXO == "F" && this.dato_9008.consume_tabaco == "N") {
                this.form.riesgCardio = "1";
              } else {
                this.form.riesgCardio = "2";
              }
              break;
            case "3":
              if (this.dato_9008.consume_tabaco == "S") {
                this.form.riesgCardio = "3";
              } else {
                this.form.riesgCardio = "2";
              }
              break;
            case "4":
              if (this.dato_9008.consume_tabaco == "S") {
                this.form.riesgCardio = "5";
              } else {
                this.form.riesgCardio = "4";
              }
              break;
          }
          break;
      }
    },

    async actualizarPaciente() {
      var data = {};

      data["datosh"] = datosEnvio();
      data["id_paci"] = $_REG_PACI["COD"];
      data["tipo_id_paci"] = $_REG_PACI["TIPO-ID"];
      data["apellido1_paci"] = $_REG_PACI["APELL-PACI1"];
      data["apellido2_paci"] = $_REG_PACI["APELL-PACI2"];
      data["nombre1_paci"] = $_REG_PACI["NOM-PACI1"];
      data["nombre2_paci"] = $_REG_PACI["NOM-PACI2"];
      data["telefono_paci"] = $_REG_PACI["TELEFONO"];
      data["ciudad_paci"] = $_REG_PACI["CIUDAD"];
      data["direccion_paci"] = $_REG_PACI["DIRECC"];
      data["grp_sang_paci"] = $_REG_PACI["GRP-SANG"];
      data["rh_paci"] = $_REG_PACI["RH"];
      data["admin_w"] = $_REG_PACI["OPER-CORR"];
      data["victi_conflicto"] = $_REG_PACI["VICTI-CONFLICTO"];
      data["diabetes"] = this.form.diabetes_paci;

      await postData(data, get_url("app/SALUD/SER110C-AC.DLL"))
        .then((data) => {
          console.log(data, "data");
          toastr.success("Actualizado correctamente");
          this.grabarDetalle();
        })
        .catch((err) => {
          toastr.error("Error en guardado");
          console.log(err, "error");
          this._terminar();
        });
    },

    async grabarDetalle() {
      loader("show");
      let detalle = {
        9008: _getObjetoSaveHc(this.dato_9008),
      };

      grabarDetalles(detalle, $_REG_HC.llave_hc)
        .then(() => {
          loader("hide");
          CON851("", "Test findrisk grabado con exito!", null, "success", "Exito");
          this._terminar();
        })
        .catch((error) => {
          console.log(error);
          loader("hide");
          CON851("", "grabando Test findrisk", null, "error", "Error");
          this._terminar();
        });
    },

    async cargarDestalles() {
      await postData(
        {
          datosh:
            datosEnvio() + $_REG_HC.llave_hc + "|" + "  " + "|" + "  " + "|" + "9008" + "|" + $_REG_HC.serv_hc + "|",
        },
        get_url("app/HICLIN/HCDETAL_PRC.DLL")
      )
        .then((data) => {
          this.detalles = data["DETHC"];
          this.detalles.pop();
          this.llenarDatos();
        })
        .catch((error) => {
          CON851("", "Error consultando datos", null, "error", "error");
          console.log(error);
          loader("hide");
          this._terminar();
        });
    },

    _escape() {
      this.$emit("callback_esc");
    },
    _terminar() {
      this.$emit("callback", this.findrisk);
    },
  },
  template: /*html*/ ` 
  <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
    <div class="col-md-6 col-sm-12 col-xs-12 no-padding">
      <div class="form-group box-center">

        <div class="col-md-12 col-sm-12 col-xs-12 head-box" style="display:flex">
          <div class="col-md-7 col-sm-7 col-xs-7" :style="stylesHC890E.flexRow"> 
            <label class="col-md-3 col-sm-3 col-xs-3" :style="stylesHC890E.flexIzq">Peso</label>
            <div class="input-group col-md-3 col-sm-3 col-xs-3">
              <input v-model="findrisk.peso_lnk" type="text"
              class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
              data-orden="1" maxlength="5" disabled="disabled">
            </div>
            <label class="col-md-3 col-sm-3 col-xs-3" :style="stylesHC890E.flexIzq">Talla</label>
            <div class="input-group col-md-3 col-sm-3 col-xs-3" id='datoTalla'>
              <input v-model="findrisk.talla_lnk" type="text"
              class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
              data-orden="1" maxlength="5" disabled="disabled">
            </div>
          </div>

          <div class="input-group col-md-1 col-sm-1 col-xs-1">
            <input v-model="dato_9008.imc" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="1" disabled="disabled">
          </div>
          <div class="input-group col-md-4 col-sm-4 col-xs-4" id='datoDescripImc'>
            <input v-model="form.datoDescripImc" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="20" disabled="disabled">
          </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" :style="stylesHC890E.flexRow">
          <label class="col-md-7 col-sm-7 col-xs-7" :style="stylesHC890E.flexIzq">1. Edad :</label>
          <div class="input-group col-md-1 col-sm-1 col-xs-1" id='datoEdad'>
            <input v-model="dato_9008.edad" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="1" disabled="disabled">
          </div>
          <div class="input-group col-md-4 col-sm-4 col-xs-4" id='datoDescripEdad'>
            <input v-model="form.datoDescripEdad" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="20" disabled="disabled">
          </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" :style="stylesHC890E.flexRow">
          <label class="col-md-9 col-sm-9 col-xs-9" :style="stylesHC890E.flexIzq">2. Indice de masa corporal :</label>
          <div class="input-group col-md-3 col-sm-3 col-xs-3">
            <input v-model="findrisk.imc_lnk" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="5" disabled="disabled">
          </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" :style="stylesHC890E.flexRow">
          <label class="col-md-7 col-sm-7 col-xs-7" :style="stylesHC890E.flexIzq">3. Perímetro de cintura medido por debajo
          de las costillas (normalmente a nivel del ombligo) :</label>
          <div class="input-group col-md-1 col-sm-1 col-xs-1" id='perAbdo'>
            <input v-model="dato_9008.per_abdo" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="1" disabled="disabled">
          </div>
          <div class="input-group col-md-4 col-sm-4 col-xs-4" id='descripPerAbdo'>
            <input v-model="form.descripPerAbdo" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="20" disabled="disabled">
          </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" :style="stylesHC890E.flexRow">
          <label class="col-md-9 col-sm-9 col-xs-9" :style="stylesHC890E.flexIzq">4. Realiza habitualmente al menos 30 minutos
          de actividad física, en el trabajo y/o en el tiempo libre ?</label>
          <div class="input-group col-md-3 col-sm-3 col-xs-3" id='activFisica'>
            <input v-model="dato_9008.activ_fisica" type="text" placeholder="N"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="1" disabled="disabled">
          </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" :style="stylesHC890E.flexRow">
            <label class="col-md-7 col-sm-7 col-xs-7" :style="stylesHC890E.flexIzq">5. Con que frecuencia come verduras o frutas ?</label>
            <div class="input-group col-md-1 col-sm-1 col-xs-1" id='comeVerdu'>
              <input v-model="dato_9008.come_verdu" type="text"
              class="form-control col-md-12 col-sm-12 col-xs-12 text-center uppercase" required="true"
              data-orden="1" maxlength="1" disabled="disabled">
            </div>
            <div class="input-group col-md-4 col-sm-4 col-xs-4" id='descripComeVerdu'>
              <input v-model="form.descripComeVerdu" type="text"
              class="form-control col-md-12 col-sm-12 col-xs-12 text-center uppercase" required="true"
              data-orden="1" maxlength="20" disabled="disabled">
            </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" :style="stylesHC890E.flexRow">
            <label class="col-md-9 col-sm-9 col-xs-9" :style="stylesHC890E.flexIzq">6. Toma medicación para la hipertención regularmente ?</label>
            <div class="input-group col-md-3 col-sm-3 col-xs-3" id='hiper'>
              <input v-model="dato_9008.medica_hipert" type="text" placeholder="N"
              class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
              data-orden="1" maxlength="1" disabled="disabled">
            </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" :style="stylesHC890E.flexRow">
          <label class="col-md-9 col-sm-9 col-xs-9" :style="stylesHC890E.flexIzq">7. Le han encontrado alguna vez valores de glucosa altos 
           (Ej. en un control médico, durante una enfermedad o el embarazo) ?</label>
          <div class="input-group col-md-3 col-sm-3 col-xs-3" id='glucosa'>
            <input v-model="dato_9008.glucosa_alto" type="text" placeholder="N"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="1" disabled="disabled">
          </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12 head-box" :style="stylesHC890E.flexRow">
          <label class="col-md-7 col-sm-7 col-xs-7" :style="stylesHC890E.flexIzq">8. Se le ha diagnosticado diabetes
          (tipo 1 o tipo 2) a alguno de sus familiares allegados u otros parientes ?</label>
          <div class="input-group col-md-1 col-sm-1 col-xs-1" id='diabetes'>
            <input v-model="dato_9008.diabetes_fam" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="1" disabled="disabled">
          </div>
          <div class="input-group col-md-4 col-sm-4 col-xs-4" id='descripDiabetes'>
            <input v-model="form.descripDiabetes" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="25" disabled="disabled">
          </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" :style="stylesHC890E.flexRow">
          <label class="col-md-2 col-sm-2 col-xs-2" :style="stylesHC890E.flexIzq">Puntaje Total</label>
          <div class="input-group col-md-2 col-sm-2 col-xs-2" id='total'>
            <input v-model="dato_9008.calc_findrisk" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="2" disabled="disabled">
          </div>
          <label class="col-md-2 col-sm-2 col-xs-2" style="background: 0; text-align: center;">Tipo de riesgo</label>
          <div class="input-group col-md-6 col-sm-6 col-xs-6" id='descripTotal'>
            <input v-model="form.descripTotal" type="text"
            class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
            data-orden="1" maxlength="1" disabled="disabled">
          </div>
        </div>

      </div>
    </div>

    <div class="col-md-6 col-sm-12 col-xs-12" style="padding-left: 10px; padding-right: 0px">
      <div class="form-group box-center">
        <div class="col-md-12 col-sm-12 col-xs-12" style="
            justify-content: space-between;
            padding-right: 0;
            padding-left: 0;
            text-align: center;
          ">
          <label>Complemento riesgo cardiovascular - OMS</label>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" :style="stylesHC890E.flexRow">
            <label class="col-md-10 col-sm-10 col-xs-10" :style="stylesHC890E.flexIzq">Paciente es diabético ?</label>
            <div class="input-group col-md-2 col-sm-2 col-xs-2" id='diabetPaci'>
              <input v-model="form.diabetes_paci" type="text" placeholder="N"
              class="form-control col-md-12 col-sm-12 col-xs-12 text-center uppercase" required="true"
              data-orden="1" maxlength="1" disabled="disabled">
            </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" :style="stylesHC890E.flexRow">
            <label class="col-md-10 col-sm-10 col-xs-10" :style="stylesHC890E.flexIzq">Tiene resultados de colesterol total, tomado en los ultimos 3 meses ?</label>
            <div class="input-group col-md-2 col-sm-2 col-xs-2" id='colesterolHdl3M'>
              <input v-model="dato_9008.colesterol_hdl_3m" type="text" placeholder="N"
              class="form-control col-md-12 col-sm-12 col-xs-12 text-center uppercase" required="true"
              data-orden="1" maxlength="1" disabled="disabled">
            </div>
        </div>

        
        <div class="col-md-12 col-sm-12 col-xs-12" :style="stylesHC890E.flexRow" v-if="resultadoColesterol">
            <div class="salto-linea"></div>
            <label class="col-md-10 col-sm-10 col-xs-10" :style="stylesHC890E.flexIzq">Resultado colesterol :</label>
            <div class="input-group col-md-2 col-sm-2 col-xs-2" id='resultColesterol'>
              <input v-model="dato_9008.valor_colesterol" type="number"
              class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
              data-orden="1" maxlength="3" disabled="disabled">
            </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" :style="stylesHC890E.flexRow" v-if="resultadoColesterol">
            <label class="col-md-10 col-sm-10 col-xs-10" :style="stylesHC890E.flexIzq">Resultado HDL :</label>
            <div class="input-group col-md-2 col-sm-2 col-xs-2" id='resultHdl'>
              <input v-model="dato_9008.valor_hdl" type="number"
              class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
              data-orden="1" maxlength="2" disabled="disabled">
            </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12 head-box" :style="stylesHC890E.flexRow">
            <label class="col-md-10 col-sm-10 col-xs-10" :style="stylesHC890E.flexIzq">Consume algún producto derivado del
            tabaco (cigarrillo, puro, pipa, tabaco en polvo o tabaco para mascar) ?</label>
            <div class="input-group col-md-2 col-sm-2 col-xs-2" id='consumeTabac'>
              <input v-model="dato_9008.consume_tabaco" type="text" placeholder="N"
              class="form-control col-md-12 col-sm-12 col-xs-12 text-center uppercase" required="true"
              data-orden="1" maxlength="1" disabled="disabled">
            </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12" :style="stylesHC890E.flexRow">
            <label class="col-md-2 col-sm-2 col-xs-2" :style="stylesHC890E.flexIzq">Porcentaje</label>
            <div class="input-group col-md-2 col-sm-2 col-xs-2" id='porcent'>
              <input v-model="form.porcenCardio" type="text"
              class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true"
              data-orden="1" maxlength="15" disabled="disabled">
            </div>
            <label class="col-md-3 col-sm-3 col-xs-3" :style="stylesHC890E.flexIzq">Nivel de riesgo</label>
            <div class="input-group col-md-5 col-sm-5 col-xs-5" id='nivelriesgo'>
              <input v-model="form.nivelRiesgo" type="text"
              class="form-control col-md-12 col-sm-12 col-xs-12 text-center uppercase" required="true"
              data-orden="1" maxlength="25" disabled="disabled">
            </div>
        </div>

      </div>
    </div>

  </div>
`,
});
