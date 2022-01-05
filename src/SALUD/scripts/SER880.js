/*CREACION TURNO TRIAGE*/
/*2020/01/14 PO - PABLO OLGUIN -> CREACION TURNO TRIAGE*/
// 2020/10/08 SE CAMBIA OPCION A VUE

new Vue({
  el: "#SER880",
  data: {
    mostrarpacientes: false,
    params_pacientes: {
      estado: false
    },
    datos_pacientes: {},
    fecha_sis: null,
    hora_act: null,
    SER880: [],
    descripcion: {
      fecha: null,
    },
    form: {
      hora: "",
      sexopaci_SER880: "",
      edadpaci_SER880: "",
      estadopaci_SER880: "",
      apell1_SER880: "",
      apell2_SER880: "",
      nomb1_SER880: "",
      nomb2_SER880: "",
      entidafil_SER880: "",
      entidafact_SER880: "",
      embarazo_SER880: "",
      observ_SER880: "",
      fecharepetida_SER880: "",
      horaatendida_SER880: "",
      prioridadrepetida_SER880: "",
    },
  },
  components: {
    ventanapacientes: require("../../SALUD/scripts/maestropacientes.vue.js")
},
  created() {
    loader("hide");
    this.SER880.SWCREAR = 0
    _inputControl("disabled");
    this.descripcion.fecha = moment().format("dddd MM/YY").toUpperCase();
    this.fecha_sis = moment().format("YYYYMMDD");

    this.hora_act = moment().format("HHmm");
    this.form.hora = moment().format("HH:mm");
    this._evaluarpaciente_SER880();
  },
  methods: {
    _evaluarpaciente_SER880() {
      validarInputs(
        {
          form: "#paciSER880",
          orden: "1",
          event_f4: () => {
            _VENTANABASE09(
              this._evaluarpaciente_SER880,
              this._validarpaciente_SER880
            );
          },
        },
        () => {
          let Window = BrowserWindow.getAllWindows();
          if (Window.length > 1) {
            _cerrarSegundaVentana();
          } else {
            _toggleNav();
          }
        },
        () => {
          $("#TURNOSTRIAGE_SER880").addClass("hidden");
          if (
            parseInt(this.form.paci_SER880) == 0 ||
            this.form.paci_SER880.padStart(15, "0").trim() == ""
          ) {
            console.log(
              "aca",
              parseInt(this.form.paci_SER880.padStart(15, "0")),
              this.form.paci_SER880.padStart(15, "0")
            );
            CON851(
              "01",
              "01",
              this._evaluarpaciente_SER880(),
              "error",
              "error"
            );
          } else {
            let cod_paci = this.form.paci_SER880.padStart(15, "0");
            let datosh = `${datosEnvio()}${cod_paci}|`;

            postData({ datosh }, get_url("APP/SALUD/SER810-1.DLL"))
              .then((data) => {
                this._opciondepacientes_SER880("8");
              })
              .catch((error) => {
                console.error(error);
                this._opciondepacientes_SER880("7");
              });
          }
        }
      );
    },
    _validarpaciente_SER880(data) {
      this.form.paci_SER880 = data;
      postData(
        {
          datosh: `${datosEnvio()}${this.form.paci_SER880.padStart(15, "0")}|`,
        },
        get_url("APP/SALUD/SER810-1.DLL")
      )
        .then((data) => {
          this._opciondepacientes_SER880("8");
        })
        .catch((error) => {
          console.error(error);
          this._opciondepacientes_SER880("7");
        });
    },
    
    _opciondepacientes_SER880(novedad) {
      this.mostrarpacientes = true;
      this.datos_pacientes.novedad = novedad;
      this.datos_pacientes.idpaciente = this.form.paci_SER880.padStart(15, "0")
      // this.datos_pacientes.novedad = "8"
      setTimeout(() => {
        this.params_pacientes.estado = true;
      }, 300);
    },
    validarEsc_pacientes() {
      this.mostrarpacientes = false;
      setTimeout(() => {
        this.params_pacientes.estado = false;
      }, 300);
      this._leerpaciente_SER880()
    },
    validarCallback_pacientes() {
      this.mostrarpacientes = false;
      setTimeout(() => {
        this.params_pacientes.estado = false;
      }, 300);
      this._leerpaciente_SER880()
    },
    _leerpaciente_SER880() {
      let datosh = `${datosEnvio()}${this.form.paci_SER880.padStart(15, "0")}|`;
      postData({ datosh }, get_url("APP/SALUD/SER810-1.DLL"))
        .then((data) => {
          data = data["REG-PACI"][0];
          console.log(data);
          this.SER880.EPSW = data.EPS;
          this.form.nomb1_SER880 = data["NOM-PACI1"];
          this.form.nomb2_SER880 = data["NOM-PACI2"];
          this.form.apell1_SER880 = data["APELL-PACI1"];
          this.form.apell2_SER880 = data["APELL-PACI2"];
          let sexo = {
            M: "MASCULINO",
            F: "FEMENINO",
          };
          this.form.sexopaci_SER880 = sexo[data.SEXO];
          this.SER880.EDADPACI = calcular_edad(
            moment(data.NACIM).format("YYYY-MM-DD")
          );
          this.form.edadpaci_SER880 = this.SER880.EDADPACI.vlr_edad;
          let derecho = {
            1: "ACTIVO",
            2: "INACTIVO",
            3: "ACTIVO",
            4: "PENDIENTE",
            5: "SIN CARNET",
            6: "SUSPENDIDO",
            7: "FALLECIDO",
            8: "INACTIVO",
            9: "ACTIVO",
            A: "INACTIVO",
            B: "PERI INT",
          };

          this.form.estadopaci_SER880 = `${data.DERECHO} - ${derecho[data.DERECHO]
            }`;
          this.form.entidafil_SER880 = `${data.EPS} - ${data["NOMBRE-EPS"]}`;
          this.form.entidafact_SER880 = `${data["NIT-FACT"]} - ${data["DESCRIP-NIT-FACT"]}`;
          this._validarLecturaPaciente();
        })
        .catch((error) => {
          console.error(error);
          this._evaluarpaciente_SER880();
        });
    },

    _validarLecturaPaciente() {
      let paciente = this.form.paci_SER880.padStart(15, "0");
      let datosh = `${datosEnvio()}1|${paciente}|${this.fecha_sis}${this.hora_act
        }|`;

      loader("show");

      postData({ datosh }, get_url("APP/SALUD/SER880.DLL"))
        .then((data) => {
          loader("hide");
          let tabla = data.TRIAGE || [];
          tabla.forEach((e) => {
            if (e.HORA_DIF < 24) {
              CON851("7W", "7W", "", "error", "Error");
            }
          });

          this._leertriage_SER880();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          this._evaluarpaciente_SER880();
        });
    },
    _leertriage_SER880() {
      let paciente = this.form.paci_SER880.padStart(15, "0");
      let datosh = `${datosEnvio()}2|${paciente}|${this.fecha_sis}|`;

      postData({ datosh }, get_url("APP/SALUD/SER880.DLL"))
        .then((data) => {
          $("#TURNOSTRIAGE_SER880").removeClass("hidden");
          this.form.fecharepetida_SER880 = `${data.FECHA_ING} - ${data.HORA_ING}`;
          this.form.horaatendida_SER880 = data.HORA_ATEN;
          this.form.prioridadrepetida_SER880 = data.PRIORIDAD;
          this._evaluarembarazo_SER880();
        })
        .catch((error) => {
          console.error(error, error.MENSAJE);
          this._evaluarpaciente_SER880();
        });
    },

    _evaluarembarazo_SER880() {
      if (this.form.sexopaci_SER880 == "MASCULINO") {
        this.form.embarazo_SER880 = "9 - NO APLICA";
        this._evaluartrauma_SER880();
      } else {
        if (
          this.SER880.EDADPACI.unid_edad == "D" ||
          this.SER880.EDADPACI.unid_edad == "M" ||
          (this.SER880.EDADPACI.unid_edad == "A" &&
            this.SER880.EDADPACI.vlr_edad < 10) ||
          (this.SER880.EDADPACI.unid_edad == "A" &&
            this.SER880.EDADPACI.vlr_edad > 50)
        ) {
          this.form.embarazo_SER880 = "4 - NO ESTA EMBARAZADA";
          this._evaluartrauma_SER880();
        } else {
          setTimeout(() => {
            SER826(this._evaluarSER826_SER880, this._evaluarpaciente_SER880);
          }, 300);
        }
      }
    },

    _evaluarSER826_SER880(data) {
      this.form.embarazo_SER880 = `${data.COD} - ${data.DESCRIP}`;
      this._evaluartrauma_SER880();
    },

    _evaluartrauma_SER880() {
      validarInputs(
        {
          form: "#traumSER880",
          orden: "1",
        },
        this._evaluarpaciente_SER880,
        () => {
          if (traumaMask_SER880.value.trim() == "")
            CON851(
              "",
              "Digite S o N",
              this._evaluartrauma_SER880(),
              "error",
              "Error"
            );
          else this._evaluarremitido_SER880();
        }
      );
    },

    _evaluarremitido_SER880() {
      validarInputs(
        {
          form: "#remitidoSER880",
          orden: "1",
        },
        this._evaluartrauma_SER880,
        () => {
          if (remitidoMask_SER880.value.trim() == "")
            CON851(
              "",
              "Digite S o N",
              this._evaluarremitido_SER880(),
              "error",
              "Error"
            );
          else this._evaluarmedlegal_SER880();
        }
      );
    },

    _evaluarmedlegal_SER880() {
      validarInputs(
        {
          form: "#medlegalSER880",
          orden: "1",
        },
        this._evaluarremitido_SER880,
        () => {
          if (medlegalMask_SER880.value.trim() == "")
            CON851(
              "",
              "Digite S o N",
              this._evaluarmedlegal_SER880(),
              "error",
              "Error"
            );
          else this._evaluarera_SER880();
        }
      );
    },

    _evaluarera_SER880() {
      validarInputs(
        {
          form: "#sintomasiraSER880",
          orden: "1",
        },
        this._evaluarmedlegal_SER880,
        () => {
          if (sintomasiraMask_SER880.value.trim() == "")
            CON851(
              "",
              "Digite S o N",
              this._evaluarera_SER880(),
              "error",
              "Error"
            );
          else this._evaluarreingreso_SER880();
        }
      );
    },

    _evaluarreingreso_SER880() {
      validarInputs(
        {
          form: "#reingrSER880",
          orden: "1",
        },
        this._evaluarera_SER880,
        () => {
          if (reingresoMask_SER880.value.trim() == "")
            CON851(
              "",
              "Digite S o N",
              this._evaluarreingreso_SER880(),
              "error",
              "Error"
            );
          else this._evaluarprioridad_SER880();
        }
      );
    },

    _evaluarprioridad_SER880() {
      if ($_USUA_GLOBAL[0].NIT == 86013) {
        validarInputs(
          {
            form: "#prioridadSER880",
            orden: "1",
          },
          this._evaluarreingreso_SER880,
          () => {
            if (
              prioridadMask_SER880.value.trim() == "" ||
              parseInt(prioridadMask_SER880.value) > 5
            )
              CON851(
                "",
                "Digite 1, 2, 3, 4 o 5",
                this._evaluarprioridad_SER880(),
                "error",
                "Error"
              );
            else this._evaluarprioridad_SER880();
          }
        );
      } else {
        this._evaluarturno_SER880();
      }
    },

    _evaluarturno_SER880() {
      if (
        $_USUA_GLOBAL[0].NIT == 892000401 ||
        $_USUA_GLOBAL[0].NIT == 900648993 ||
        $_USUA_GLOBAL[0].NIT == 900755133 ||
        $_USUA_GLOBAL[0].NIT == 900804411 ||
        $_USUA_GLOBAL[0].NIT == 900870633 ||
        $_USUA_GLOBAL[0].NIT == 892000458
      ) {
        validarInputs(
          {
            form: "#turnoSER880",
            orden: "1",
          },
          this._evaluarremitido_SER880,
          this._evaluarobservacioninicial_SER880
        );
      } else {
        this._evaluarobservacioninicial_SER880();
      }
    },

    _evaluarobservacioninicial_SER880() {
      if ($_USUA_GLOBAL[0].NIT == 845000038) {
        validarInputs(
          {
            form: "#observSER880",
            orden: "1",
          },
          this._evaluarturno_SER880,
          this._confirmar_SER880
        );
      } else {
        this._confirmar_SER880();
      }
    },

    _confirmar_SER880() {
      CON851P("01", this._evaluartrauma_SER880, this._grabarcierre_SER880);
    },

    _grabarcierre_SER880() {
      let embar = this.form.embarazo_SER880.split("-")[0].trim();
      postData(
        {
          datosh: `${datosEnvio()}3|${this.form.paci_SER880.padStart(
            15,
            "0"
          )}|${this.fecha_sis}${this.hora_act}|${this.SER880.EPSW}|${this.SER880.EDADPACI.unid_edad
            }|${this.SER880.EDADPACI.vlr_edad.toString().padStart(3, "0")}|${traumaMask_SER880.value
            }|${localStorage.Usuario.trim()}||${remitidoMask_SER880.value}|${medlegalMask_SER880.value
            }|${sintomasiraMask_SER880.value}|${reingresoMask_SER880.value}|${turnoMask_SER880.value
            }|${this.form.observ_SER880.trim()}|${prioridadMask_SER880.value
            }|${localStorage.Nombre.padEnd(30, " ")}|${embar}|`,
        },
        get_url("APP/SALUD/SER880.DLL")
      )
        .then((data) => {
          CON851("", "Guardado", null, "success", "Exito");
          let Window = BrowserWindow.getAllWindows();
          if (Window.length > 1) {
            _cerrarSegundaVentana();
          } else {
            _toggleNav();
          }
        })
        .catch((error) => {
          console.error(error);
          this._evaluarreingreso_SER880();
        });
    },

    FNFPacientes_SER880(e) {
      // FUNCIONES FN-F8
      console.log(e.which);
      var $_this = this;
      if (e.which == 119 || e.type == "click") {
        parametros = {
          dll: "PACIENTES",
          valoresselect: ["Nombre del paciente"],
          f8data: "PACIENTES",
          columnas: [
            { title: "COD" },
            { title: "NOMBRE" },
            { title: "EPS" },
            { title: "EDAD" },
          ],
          callback: (data) => {
            console.debug(data);
            $_this.form.paci_SER880 = data.COD;
            _enterInput(".paci_SER880");
          },
          cancel: () => {
            $(".paci_SER880").focus();
          },
        };
        F8LITE(parametros);
        // FUNCIONESFN-F2
      } else if (e.which == 113 || e.type == "click") {
        set_Event_validar("#paciSER880", "off");
        $("#paci_SER880").attr("disabled", "true");
        _ventanaTriage_HC810(
          this._evaluarpaciente_SER880,
          this._evaluarpaciente_SER880
        );
      }
      // FUNCIONES FN-F4
      else if ((e.type == "keydown" && e.which == 115) || e.type == "click") {
        jAlert(
          {
            titulo: "Advertencia ",
            mensaje: "LLama al SER810W [Fase: Desarrollo]",
          },
          validarPaciente_SER880
        );
      }
    },
  },
});
//--------------------------- MASCARAS ------------------------------//
// var idhistoriafactMask_SER880 = IMask($("#paci_SER880")[0], {mask: Number, thousandsSeparator: ",", padFractionalZeros: false, normalizeZeros: true});
var traumaMask_SER880 = IMask($("#traum_SER880")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
var remitidoMask_SER880 = IMask($("#remitido_SER880")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
var medlegalMask_SER880 = IMask($("#medlegal_SER880")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
var reingresoMask_SER880 = IMask($("#reingr_SER880")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
var sintomasiraMask_SER880 = IMask($("#sintomasira_SER880")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
var prioridadMask_SER880 = IMask($("#prioridad_SER880")[0], { mask: Number });
var turnoMask_SER880 = IMask($("#turno_SER880")[0], { mask: Number });
