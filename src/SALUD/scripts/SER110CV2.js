const { trim } = require("jquery");
const { threadId } = require("worker_threads");

// 29/03/2021 - DIANA ESCOBAR: CREADO
new Vue({
  el: "#SER110C",
  data: {
    SER110C: [],
    form: {
      novedad_SER110C: "",
      numero_SER110C: "",
      identif_SER110C: "",
      lugar_SER110C: "",
      anonac_SER110C: "",
      mesnac_SER110C: "",
      dianac_SER110C: "",
      edad_SER110C: "",
      gruposang_SER110C: "",
      rh_SER110C: "",
      sexo_SER110C: "",
      civil_SER110C: "",
      estudio_SER110C: "",
      zona_SER110C: "",
      correo2_SER110C: "",
      padre_SER110C: "",
      madre_SER110C: "",
      ciudad_SER110C: "",
      ciudadd_SER110C: "",
      pais_SER110C: "",
      paisd_SER110C: "",
      barrio_SER110C: "",
      descripbarrio_SER110C: "",
      nivel_SER110C: "",
      direccion_SER110C: "",
      ocupacion_SER110C: "",
      ocupaciond_SER110C: "",
      regimen_SER110C: "",
      colegio_SER110C: "",
      colegiod_SER110C: "",
      etnia_SER110C: "",
      comunidades_SER110C: "",
      indigena_SER110C: "",
      resguardos_SER110C: "",
      tipoafil_SER110C: "",
      portabilidad_SER110C: "",
      ciudadportab_SER110C: "",
      eps_SER110C: "",
      epsd_SER110C: "",
      contrato_SER110C: "",
      ficha_SER110C: "",
      carnet_SER110C: "",
      fechademan_SER110C: "",
      demandaindu_SER110C: "",
      codant_SER110C: "",
      cotizante_SER110C: "",
      cotizanted_SER110C: "",
      parentezco_SER110C: "",
      empresalab_SER110C: "",
      fechamatr_SER110C: "",
      matr_SER110C: "",
      fechaecono_SER110C: "",
      econo_SER110C: "",
      patologiacronica_SER110C: "",
      clasif_SER110C: "",
      clasifd_SER110C: "",
      mamografiaano_SER110C: "",
      mamografiames_SER110C: "",
      basedatos_SER110C: "",
      observaciones_SER110C: "",
      discapacidad_SER110C: "",
      entidad_SER110C: "",
      entidadd_SER110C: "",
      fechasistd_SER110C: "",
      medicofam_SER110C: "",
      medicofamd_SER110C: "",
      altoriesgo_SER110C: "",
      opercreado_SER110C: "",
      fechacreado_SER110C: "",
      hrcreado_SER110C: "",
      modificado_SER110C: "",
      fechamodif_SER110C: "",
      hrmodif_SER110C: "",
      prefijo_SER110C: "",
      factura_SER110C: "",
      finalidad_SER110C: "",
      correo_SER110C: "",
      antecedentes_SER110C: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9-7-7-6-7 - Maestro de pacientes");
    $_this = this;
    $_this.SER110C.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER110C.ANO_LNK = 20 + $_this.SER110C.FECHA_LNK.substring(0, 2);
    $_this.SER110C.MES_LNK = $_this.SER110C.FECHA_LNK.substring(2, 4);
    $_this.SER110C.DIA_LNK = $_this.SER110C.FECHA_LNK.substring(4, 6);
    $_this.SER110C.FECHAACTUAL = moment().format("YYYYMMDD");
    $_this.SER110C.ANOACTUALW = $_this.SER110C.FECHAACTUAL.substring(0, 4);
    $_this.SER110C.MESACTUALW = $_this.SER110C.FECHAACTUAL.substring(4, 6);
    $_this.SER110C.DIAACTUAL = $_this.SER110C.FECHAACTUAL.substring(6, 8);
    $_this.SER110C.ACTBARRIOW = "";
    $_this.SER110C.EPAPACIW = "";
    $_this.SER110C.RESULTADOCOVIDPACIW = "";
    $_this.SER110C.NITFACTPACIW = "";
    $_this.SER110C.FECHAMAMOGRAFIA = "";
    $_this.SER110C.FACTURAPAGARE = "";
    $_this.SER110C.VALORPAGARE = "";
    $_this.SER110C.NITENT = "";
    $_this.SER110C.FECHANACCAMB = "";
    obtenerDatosCompletos(
      {
        nombreFd: "CIUDADES",
      },
      function (data) {
        $_this.SER110C.CIUDAD = data.CIUDAD;
        $_this.SER110C.CIUDAD.pop();
        loader("hide");
        $_this._revisarpermidos_SER110C();
        obtenerDatosCompletos(
          {
            nombreFd: "PAISES_RIPS",
          },
          function (data) {
            $_this.SER110C.PAISES = data.PAISESRIPS;
            $_this.SER110C.PAISES.pop();
            obtenerDatosCompletos(
              {
                nombreFd: "OCUPACIONES",
              },
              function (data) {
                $_this.SER110C.OCUPACIONES = data.OCUPACIONES;
                $_this.SER110C.OCUPACIONES.pop();
                obtenerDatosCompletos(
                  {
                    nombreFd: "ENTIDADES",
                    usuario: true,
                  },
                  function (data) {
                    $_this.SER110C.ENTIDADES = data.ENTIDADES;
                    $_this.SER110C.ENTIDADES.pop();
                    obtenerDatosCompletos(
                      {
                        nombreFd: "COLEGIOS",
                      },
                      function (data) {
                        $_this.SER110C.COLEGIOS = data.COLEGIOS;
                        $_this.SER110C.COLEGIOS.pop();
                        obtenerDatosCompletos(
                          {
                            nombreFd: "PATOLOGIAS",
                          },
                          function (data) {
                            $_this.SER110C.PATOLOGIAS = data.PATOLOGIAS;
                            $_this.SER110C.PATOLOGIAS.pop();
                            obtenerDatosCompletos(
                              {
                                nombreFd: "CLASIPACI",
                              },
                              function (data) {
                                $_this.SER110C.CLASIFICACION = data.CLASIFICACION;
                                $_this.SER110C.CLASIFICACION.pop();
                                obtenerDatosCompletos(
                                  {
                                    nombreFd: "BARRIOS",
                                  },
                                  function (data) {
                                    $_this.SER110C.BARRIOS = data.BARRIOS;
                                    $_this.SER110C.BARRIOS.pop();
                                    obtenerDatosCompletos(
                                      {
                                        nombreFd: "PROFESIONALES",
                                      },
                                      function (data) {
                                        console.log(data, "PROFESIONAL");
                                        $_this.SER110C.PROFESIONALES = data.ARCHPROF;
                                      }
                                    );
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  },
  methods: {
    _caracteresespeciales_SER110C(e, input) {
      this.form[input] = this.form[input].replace(/[^a-zA-Z0-9Ññ ]/g, "");
    },
    _revisarpermidos_SER110C() {
      postData(
        { datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|${"IS767"}|` },
        get_url("APP/CONTAB/CON904.DLL")
      )
        .then((data) => {
          CON850(this._evaluarnovedad_SER110C);
        })
        .catch((err) => {
          console.error(err);
          CON851("15", "15", null, "error", "error");
          this._validarSalida_ser110c();
        });
    },
    _evaluarnovedad_SER110C(novedad) {
      this.SER110C.VENTANA = 0;
      this.SER110C.SWCAMBIO = 0;
      this._inicializarvariables_SER110C();
      this.form.novedad_SER110C = novedad.id;
      if (this.form.novedad_SER110C == "F") {
        _toggleNav();
      } else {
        let novedad = { 7: "Nuevo", 8: "Cambio", 9: "Retiro" };
        this.form.novedad_SER110C = this.form.novedad_SER110C + " - " + novedad[this.form.novedad_SER110C];
        switch (this.form.novedad_SER110C.substring(0, 1)) {
          case "7":
          case "8":
          case "9":
            if (this.form.novedad_SER110C.substring(0, 1) == "9") {
              postData(
                { datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|${"IS7679"}|` },
                get_url("APP/CONTAB/CON904.DLL")
              )
                .then((data) => {
                  this._permisonovedad_SER110C();
                })
                .catch((err) => {
                  console.error(err);
                  CON851("01", "01", null, "error", "error");
                  setTimeout(function () {
                    CON850(this._evaluarnovedad_SER110C);
                  }, 300);
                });
            } else {
              this._permisonovedad_SER110C();
            }
            break;
        }
      }
    },
    _permisonovedad_SER110C() {
      $_this = this;
      postData(
        {
          datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|${"IS767"}${$_this.form.novedad_SER110C.substring(
            0,
            1
          )}|`,
        },
        get_url("APP/CONTAB/CON904.DLL")
      )
        .then((data) => {
          $_this._evaluarnumero_SER110C();
        })
        .catch((err) => {
          console.error(err);
          CON851("01", "01", null, "error", "error");
          setTimeout(() => {
            CON850($_this._evaluarnovedad_SER110C);
          }, 300);
        });
    },
    _evaluarnumero_SER110C() {
      validarInputs(
        {
          form: "#NUMERO_SER110C",
          orden: "1",
          event_f4: this._ventanapacientedoc_SER110C,
        },
        () => {
          CON850(this._evaluarnovedad_SER110C);
        },
        () => {
          this.form.numero_SER110C = this.form.numero_SER110C.padStart(15, "0").toUpperCase();
          this._validarpaciente_SER110C();
        }
      );
    },
    _validarpaciente_SER110C() {
      if (this.form.numero_SER110C == "000000000000000") {
        this._evaluarnumero_SER110C();
      } else {
        let URL = get_url("APP/SALUD/SER810-1.DLL");
        postData(
          {
            datosh: datosEnvio() + this.form.numero_SER110C + "|",
          },
          URL
        )
          .then((data) => {
            this.SER110C.PACIENTES = data["REG-PACI"];
            if (this.form.novedad_SER110C.substring(0, 1) == "7") {
              this._error_SER110C();
            } else if (
              this.form.novedad_SER110C.substring(0, 1) == "8" ||
              this.form.novedad_SER110C.substring(0, 1) == "9"
            ) {
              this._llenardatos_SER110C();
              if (this.form.novedad_SER110C.substring(0, 1) == "8") {
                $("#VALIDARBOTOM_SER110C").removeClass("hidden");
                $("#VALIDARBOTOM1_SER110C").removeClass("hidden");
                $("#VALIDARBOTOM2_SER110C").removeClass("hidden");
                $("#VALIDARBOTOM3_SER110C").removeClass("hidden");
                $("#VALIDARBOTOM4_SER110C").removeClass("hidden");
                $("#VALIDARBOTOM5_SER110C").removeClass("hidden");
                setTimeout(this._validacionesinicio4_SER110C, 300);
              } else {
                this._grabarauditoria_SER110C();
              }
            }
          })
          .catch((error) => {
            console.error(error);
            if (error.MENSAJE == "01" && this.form.novedad_SER110C.substring(0, 1) == "7") {
              this._validacionesinicio4_SER110C();
            } else if (error.MENSAJE == "01" && this.form.novedad_SER110C.substring(0, 1) == "8") {
              this._error_SER110C();
            } else if (error.MENSAJE == "01" && this.form.novedad_SER110C.substring(0, 1) == "9") {
              this._error_SER110C();
            }
          });
      }
    },
    _error_SER110C() {
      if (this.form.novedad_SER110C.substring(0, 1) == "7") {
        this.form.novedad_SER110C = "8- Cambio";
        CON851("00", "00", null, "error", "Error");
        this._llenardatos_SER110C();
        setTimeout(this._evaluarnumero_SER110C, 300);
      } else if (this.form.novedad_SER110C.substring(0, 1) == "8" || this.form.novedad_SER110C.substring(0, 1) == "9") {
        if (this.SER110C.VENTANA < 1) {
          this._evaluarnumero_SER110C();
        }
      }
    },
    _validacionesinicio4_SER110C() {
      _mensajespacientes_SALUD(
        this._validacionesdato4_SER110C,
        this._evaluarnumero_SER110C,
        (params = { ID: this.form.numero_SER110C, STOP: "1" })
      );
    },
    _validacionesdato4_SER110C() {
      if (
        this.form.novedad_SER110C.substring(0, 1) == "7" &&
        !$.isNumeric(this.form.numero_SER110C) &&
        this.form.identif_SER110C.trim() == ""
      ) {
        this.form.identif_SER110C = "RC - REGISTRO CIVIL";
      }
      if (
        this.form.novedad_SER110C.substring(0, 1) == "8" &&
        (localStorage.Usuario == "ADMI" || localStorage.Usuario == "GEBC")
      ) {
        $("#BLOQHC_SER110C").removeClass("hidden");
        if (bloqueohcMask_SER110C.value.trim() == "") bloqueohcMask_SER110C.typedValue = "N";
        validarInputs(
          {
            form: "#BLOQHC_SER110C",
            orden: "1",
          },
          this._evaluarnumero_SER110C,
          () => {
            this._evaluartipoid_SER110C();
          }
        );
      } else {
        this._evaluartipoid_SER110C();
      }
    },
    _evaluartipoid_SER110C() {
      this.SER110C.TIPOIDW = this.form.identif_SER110C.substring(0, 3);
      obtenerDatosCompletos({ nombreFd: "TIPOID" }, (data) => {
        var documento = data.IDENTIFICACION;
        POPUP(
          {
            array: documento,
            titulo: "TIPO DOCUMENTO",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            seleccion: this.SER110C.TIPOIDW.padEnd(3, " "),
            callback_f: () => {
              this._evaluarnumero_SER110C();
            },
          },
          (documento) => {
            this.form.identif_SER110C = documento.COD + " - " + documento.DESCRIP;
            this._validacionestipoid_SER110C();
          }
        );
      });
    },
    _validacionestipoid_SER110C() {
      if (
        (this.form.identif_SER110C.substring(0, 3) == "CC " || this.form.identif_SER110C.substring(0, 3) == "TI ") &&
        !$.isNumeric(this.form.numero_SER110C)
      ) {
        CON851("57", "57", null, "error", "error");
        setTimeout(this._evaluartipoid_SER110C(), 300);
      }
      if (
        this.form.identif_SER110C.substring(0, 3) == "CC " &&
        (this.form.numero_SER110C < 1000 ||
          this.form.numero_SER110C > 2999000000 ||
          (this.form.numero_SER110C > 100000000 && this.form.numero_SER110C < 1000000000))
      ) {
        CON851("78", "78", null, "error", "error");
        if (this.form.novedad_SER110C.substring(0, 1) == "7") {
          setTimeout(this._evaluartipoid_SER110C(), 300);
        } else {
          this._evaluarlugarnaci_SER110C();
        }
      } else {
        if (this.form.novedad_SER110C.substring(0, 1) == "8") {
          if (
            this.form.identif_SER110C.substring(0, 3) == "RC " ||
            this.form.identif_SER110C.substring(0, 3) == "MSI" ||
            this.form.identif_SER110C.substring(0, 3) == "CE " ||
            this.form.identif_SER110C.substring(0, 3) == "CN "
          ) {
            this._validacionesTI_SER110C();
          } else {
            if (
              this.form.numero_SER110C > 3000000 &&
              this.form.numero_SER110C < 9000000 &&
              (this.SER110C.UNIDADEDADW != "A" || this.SER110C.VLREDADW < 15)
            ) {
              CON851("74", "74", null, "error", "error");
              return this._evaluarnumero_SER110C();
            } else {
              this._validacionesTI_SER110C();
            }
          }
        } else {
          this._evaluarlugarnaci_SER110C();
        }
      }
    },
    _validacionesTI_SER110C() {
      if (
        this.form.identif_SER110C.substring(0, 3) == "TI " &&
        this.SER110C.UNIDADEDADW == "A" &&
        this.SER110C.VLREDADW < 7
      ) {
        CON851("74", "74", null, "error", "error");
        return this._evaluarnumero_SER110C();
      }
      if (this.form.identif_SER110C.substring(0, 3) == "TI " && this.SER110C.UNIDADEDADW == "M") {
        CON851("74", "74", null, "error", "error");
        return this._evaluarnumero_SER110C();
      }
      if (this.form.identif_SER110C.substring(0, 3) == "TI " && this.SER110C.UNIDADEDADW == "D") {
        CON851("74", "74", null, "error", "error");
        return this._evaluarnumero_SER110C();
      }
      if (
        this.SER110C.UNIDADEDADW == "A" &&
        this.SER110C.VLREDADW > 18 &&
        (this.form.identif_SER110C.substring(0, 3) == "RC " ||
          this.form.identif_SER110C.substring(0, 3) == "TI " ||
          this.form.identif_SER110C.substring(0, 3) == "NUI" ||
          this.form.identif_SER110C.substring(0, 3) == "MSI" ||
          this.form.identif_SER110C.substring(0, 3) == "CN ")
      ) {
        CON851("74", "74", null, "error", "error");
        return this._evaluarnumero_SER110C();
      }
      if (
        this.SER110C.UNIDADEDADW == "A" &&
        this.SER110C.VLREDADW < 18 &&
        (this.form.identif_SER110C.substring(0, 3) == "CC " || this.form.identif_SER110C.substring(0, 3) == "ASI")
      ) {
        CON851("74", "74", null, "error", "error");
        return this._evaluarnumero_SER110C();
      }

      if (
        this.SER110C.UNIDADEDADW != "A" &&
        (this.form.identif_SER110C.substring(0, 3) == "CC " || this.form.identif_SER110C.substring(0, 3) == "ASI")
      ) {
        CON851("74", "74", null, "error", "error");
        return this._evaluarnumero_SER110C();
      }
      if (
        this.SER110C.UNIDADEDADW == "A" &&
        this.SER110C.VLREDADW > 10 &&
        this.form.identif_SER110C.substring(0, 3) == "RC "
      ) {
        CON851("74", "74", null, "error", "error");
        return this._evaluarnumero_SER110C();
      } else {
        this._evaluarlugarnaci_SER110C();
      }
    },
    _evaluarlugarnaci_SER110C() {
      validarInputs(
        {
          form: "#LUGARNAM_SER110C",
          orden: "1",
        },
        () => {
          setTimeout(this._evaluartipoid_SER110C, 300);
        },
        () => {
          if (this.form.lugar_SER110C.trim() == "") {
            this._evaluarapel1_SER110C();
          } else {
            const res = this.SER110C.CIUDAD.find((e) => e.COD == this.form.lugar_SER110C);
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              this._evaluarlugarnaci_SER110C();
            } else {
              this.form.descripcostos_SER110 = res.NOMBRE;
              this._evaluarapel1_SER110C();
            }
          }
        }
      );
    },
    _evaluarapel1_SER110C() {
      let parametros = {
        estado: "on",
        msg: [
          {
            mensaje: "Oprima F7 para cambios base datos",
          },
          {
            mensaje: "Oprimar F9 para grupo familiar",
          },
        ],
      };
      _FloatText(parametros);
      validarInputs(
        {
          form: "#APELLIDO1_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarapel1_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarapel1_SER110C);
          },
        },
        this._evaluarlugarnaci_SER110C,
        () => {
          this.SER110C.PRIAPEL1PACIW = primerapellido_SER110C.value.trim().substring(0, 1);
          this.SER110C.PRIAPEL2PACIW = primerapellido_SER110C.value.trim().substring(1, 14);
          if (this.SER110C.PRIAPEL1PACIW.trim() == "" || $.isNumeric(this.SER110C.PRIAPEL1PACIW)) {
            CON851("58", "58", null, "error", "error");
            this._evaluarapel1_SER110C();
          } else if (this.form.pacitutela_SER110C == "S") {
            CON851("5B", "5B", null, "error", "error");
            this._evaluarapel2_SER110C();
          } else if (primerapellido_SER110C.value.trim() == "") {
            CON851("02", "02", null, "error", "error");
            this._evaluarapel1_SER110C();
          } else {
            this._evaluarapel2_SER110C();
          }
        }
      );
    },
    _evaluarapel2_SER110C() {
      validarInputs(
        {
          form: "#APELLIDO2_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarapel2_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarapel2_SER110C);
          },
        },
        () => {
          this._evaluarapel1_SER110C();
        },
        () => {
          if ($.isNumeric(segundoapellido_SER110C.value)) {
            this._evaluarapel2_SER110C();
          } else {
            this._evaluarnomb1_SER110C();
          }
        }
      );
    },
    _evaluarnomb1_SER110C() {
      validarInputs(
        {
          form: "#NOMBRE1_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarnomb1_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarnomb1_SER110C);
          },
        },
        () => {
          this._evaluarapel2_SER110C();
        },
        () => {
          this.SER110C.PRINOMB1PACIW = primernombre_SER110C.value.trim().substring(0, 1);
          this.SER110C.PRINOMB2PACIW = primernombre_SER110C.value.trim().substring(1, 12);
          if (this.SER110C.PRINOMB1PACIW.trim() == "" || $.isNumeric(this.SER110C.PRINOMB1PACIW)) {
            CON851("58", "58", null, "error", "error");
            this._evaluarnomb1_SER110C();
          } else if (primernombre_SER110C.value.trim() == "") {
            CON851("02", "02", null, "error", "error");
            this._evaluarnomb1_SER110C();
          } else {
            this._evaluarnomb2_SER110C();
          }
        }
      );
    },
    _evaluarnomb2_SER110C() {
      validarInputs(
        {
          form: "#NOMBRE2_SER110C",
          orden: "1",
          event_f7: () => {
            this.evaluarcambiosbasedatos_SER110C(this._evaluarnomb2_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarnomb2_SER110C);
          },
        },
        () => {
          this._evaluarnomb1_SER110C();
        },
        () => {
          if ($.isNumeric(segundonombre_SER110C.value)) {
            this._evaluarnomb2_SER110C();
          } else {
            if (
              $_USUA_GLOBAL[0].NIT == 900475095 ||
              $_USUA_GLOBAL[0].NIT == 822007038 ||
              $_USUA_GLOBAL[0].NIT == 844003225
            ) {
              this._ventanahuellada_SER110C();
            } else {
              this._evaluaranonac_SER110C();
            }
          }
        }
      );
    },
    _evaluaranonac_SER110C() {
      validarInputs(
        {
          form: "#ANONAC_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluaranonac_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluaranonac_SER110C);
          },
        },
        () => {
          this._evaluarnomb2_SER110C();
        },
        () => {
          if (this.form.anonac_SER110C.trim() == "") {
            this._evaluaranonac_SER110C();
          } else if (this.form.anonac_SER110C > this.SER110C.ANOACTUALW || parseInt(this.form.anonac_SER110C) < 1900) {
            CON851("2D", "2D", null, "error", "error");
            this._evaluaranonac_SER110C();
          } else if ($.isNumeric(this.form.anonac_SER110C)) {
            this._evaluarmesnac_SER110C();
          } else {
            this._evaluaranonac_SER110C();
          }
        }
      );
    },
    _evaluarmesnac_SER110C() {
      validarInputs(
        {
          form: "#MESNAC_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarmesnac_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarmesnac_SER110C);
          },
        },
        () => {
          this._evaluaranonac_SER110C();
        },
        () => {
          this.form.mesnac_SER110C = this.form.mesnac_SER110C.padStart(2, "0");
          if (this.form.mesnac_SER110C < 1 || this.form.mesnac_SER110C > 12 || this.form.mesnac_SER110C.trim() == 00) {
            CON851("2D", "2D", null, "error", "error");
            this._evaluarmesnac_SER110C();
          } else if ($.isNumeric(this.form.mesnac_SER110C)) {
            this._evaluardianac_SER110C();
          } else {
            this._evaluarmesnac_SER110C();
          }
        }
      );
    },
    _evaluardianac_SER110C() {
      validarInputs(
        {
          form: "#DIANAC_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluardianac_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluardianac_SER110C);
          },
        },
        () => {
          this._evaluarmesnac_SER110C();
        },
        () => {
          this.form.dianac_SER110C = this.form.dianac_SER110C.padStart(2, "0");
          if (this.form.dianac_SER110C < 1 || this.form.dianac_SER110C > 31) {
            CON851("2D", "2D", null, "error", "error");
            this._evaluardianac_SER110C();
          } else if ($.isNumeric(this.form.dianac_SER110C)) {
            switch (this.form.mesnac_SER110C) {
              case 02:
              case 04:
              case 06:
              case 09:
              case 11:
                if (this.form.dianac_SER110C > 30) {
                  CON851("37", "37", null, "error", "error");
                  this._evaluaranonac_SER110C();
                } else {
                  this._validacionesedadnac_SER110C();
                }
                break;
              default:
                this._validacionesedadnac_SER110C();
                break;
            }
          } else {
            this._evaluardianac_SER110C();
          }
        }
      );
    },
    _validacionesedadnac_SER110C() {
      this.SER110C.FECHANACIPACIW = this.form.anonac_SER110C + this.form.mesnac_SER110C + this.form.dianac_SER110C;
      var edad = calcular_edad(this.SER110C.FECHANACIPACIW);
      this.form.edad_SER110C = edad.unid_edad + edad.vlr_edad.toString().padStart("0");
      this.SER110C.UNIDADEDADW = edad.unid_edad;
      this.SER110C.VLREDADW = edad.vlr_edad.toString().padStart("0");
      if (
        this.SER110C.FECHANACCAMB != this.SER110C.FECHANACIPACIW &&
        this.form.novedad_SER110C.substring(0, 1) == "8"
      ) {
        this.SER110C.FECHANACCAMB = this.SER110C.FECHANACIPACIW;
        CON851("", "Se cambio la fecha de nacimiento! Debes de repasar el Tipo de Doc ", "", "warning", "");
        return setTimeout(this._evaluartipoid_SER110C, 300);
      }
      if (this.SER110C.FECHANACIPACIW > this.SER110C.FECHAACTUAL) {
        CON851("37", "37", null, "error", "error");
        return this._evaluaranonac_SER110C();
      }
      if (
        this.form.identif_SER110C.substring(0, 3) == "RC " ||
        this.form.identif_SER110C.substring(0, 3) == "MSI" ||
        this.form.identif_SER110C.substring(0, 3) == "CE " ||
        this.form.identif_SER110C.substring(0, 3) == "CN "
      ) {
        this._validacionesedadnac2_SER110C();
      } else {
        if (
          this.form.numero_SER110C > 3000000 &&
          this.form.numero_SER110C < 9000000 &&
          (this.SER110C.UNIDADEDADW != "A" || this.SER110C.VLREDADW < 15)
        ) {
          CON851("74", "74", null, "error", "error");
          this._evaluarnumero_SER110C();
        } else {
          this._validacionesedadnac2_SER110C();
        }
      }
    },

    _validacionesedadnac2_SER110C() {
      if (
        this.form.identif_SER110C.substring(0, 3) == "TI " &&
        this.SER110C.UNIDADEDADW == "A" &&
        this.SER110C.VLREDADW < 7
      ) {
        CON851("74", "74", null, "error", "error");
        return this._evaluarnumero_SER110C();
      }
      if (this.form.identif_SER110C.substring(0, 3) == "TI " && this.SER110C.UNIDADEDADW == "M") {
        CON851("74", "74", null, "error", "error");
        return this._evaluarnumero_SER110C();
      }
      if (this.form.identif_SER110C.substring(0, 3) == "TI " && this.SER110C.UNIDADEDADW == "D") {
        CON851("74", "74", null, "error", "error");
        return this._evaluarnumero_SER110C();
      }
      if (
        this.SER110C.UNIDADEDADW == "A" &&
        this.SER110C.VLREDADW > 18 &&
        (this.form.identif_SER110C.substring(0, 3) == "RC " ||
          this.form.identif_SER110C.substring(0, 3) == "TI " ||
          this.form.identif_SER110C.substring(0, 3) == "NUI" ||
          this.form.identif_SER110C.substring(0, 3) == "MSI" ||
          this.form.identif_SER110C.substring(0, 3) == "CN ")
      ) {
        if ($_USUA_GLOBAL[0].NIT == 800251482) {
          return this._buscarduplicado_SER110C();
        } else {
          CON851("74", "74", null, "error", "error");
          return this._evaluarnumero_SER110C();
        }
      }
      if (
        this.SER110C.UNIDADEDADW == "A" &&
        this.SER110C.VLREDADW < 18 &&
        (this.form.identif_SER110C.substring(0, 3) == "CC " || this.form.identif_SER110C.substring(0, 3) == "ASI")
      ) {
        CON851("74", "74", null, "error", "error");
        return this._evaluarnumero_SER110C();
      }
      if (
        this.SER110C.UNIDADEDADW != "A" &&
        (this.form.identif_SER110C.substring(0, 3) == "CC " || this.form.identif_SER110C.substring(0, 3) == "ASI")
      ) {
        CON851("74", "74", null, "error", "error");
        return this._evaluarnumero_SER110C();
      }
      if (
        this.SER110C.UNIDADEDADW == "A" &&
        this.SER110C.VLREDADW > 10 &&
        this.form.identif_SER110C.substring(0, 3) == "RC "
      ) {
        CON851("74", "74", null, "error", "error");
        return this._evaluarnumero_SER110C();
      } else {
        this._buscarduplicado_SER110C();
      }
    },
    _buscarduplicado_SER110C() {
      if (this.form.novedad_SER110C.substring(0, 1) == "7") {
        this.SER110C.APELLIDOSPACIW =
          primerapellido_SER110C.value.padEnd(15, " ") + "|" + segundoapellido_SER110C.value.padEnd(15, " ");
        this.SER110C.NOMBRESPACIW =
          primernombre_SER110C.value.padEnd(12, " ") + "|" + segundonombre_SER110C.value.padEnd(12, " ");
        _buscarduplicadopaciente_SALUD(
          this._consultapacduplicado_SER110C,
          this._evaluardianac_SER110C,
          (params = {
            APELLIDOS: this.SER110C.APELLIDOSPACIW,
            NOMBRES: this.SER110C.NOMBRESPACIW,
            ID: this.form.numero_SER110C,
            FECHANAC: this.SER110C.FECHANACIPACIW,
          })
        );
      } else {
        this._evaluargruposang_SER110C();
      }
    },
    _consultapacduplicado_SER110C(data) {
      this.SER110C.DOCDUPLICADO = data.CEDULA;
      if (this.SER110C.DOCDUPLICADO.trim() == "") {
        setTimeout(this._evaluargruposang_SER110C, 300);
      } else {
        let URL = get_url("APP/SALUD/SER810-1.DLL");
        postData(
          {
            datosh: datosEnvio() + this.SER110C.DOCDUPLICADO + "|",
          },
          URL
        )
          .then((data) => {
            this.SER110C.PACIENTES = data["REG-PACI"];
            this.SER110C.ACTUALIZAPACIX = "1";
            this._llenardatos_SER110C();
            setTimeout(this._evaluargruposang_SER110C, 300);
          })
          .catch((error) => {
            console.error(error);
            this._evaluardianac_SER110C();
          });
      }
    },
    _evaluargruposang_SER110C() {
      if ($_USUA_GLOBAL[0].NIT == 900019291) {
        this._evaluarsexo_SER110C();
      } else {
        validarInputs(
          {
            form: "#GRUPOSANG_SER110C",
            orden: "1",
            event_f7: () => {
              this._evaluarcambiosbasedatos_SER110C(this._evaluargruposang_SER110C);
            },
            event_f9: () => {
              this.datoscompletfamiliar_SER110C(this._evaluargruposang_SER110C);
            },
          },
          this._evaluaranonac_SER110C,
          () => {
            this.form.gruposang_SER110C = this.form.gruposang_SER110C.toUpperCase();
            if (this.form.gruposang_SER110C.trim() == "") {
              this.form.rh_SER110C = "";
              CON851("2C", "2C", null, "error", "error");
              this._evaluarsexo_SER110C();
            } else if (
              this.form.gruposang_SER110C == "A" ||
              this.form.gruposang_SER110C == "B" ||
              this.form.gruposang_SER110C == "AB" ||
              this.form.gruposang_SER110C == "O"
            ) {
              this._evaluarrh_SER110C();
            } else {
              CON851("03", "03", null, "error", "error");
              this._evaluargruposang_SER110C();
            }
          }
        );
      }
    },
    _evaluarrh_SER110C() {
      validarInputs(
        {
          form: "#RH_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarrh_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarrh_SER110C);
          },
        },
        this._evaluargruposang_SER110C,
        () => {
          if (this.form.rh_SER110C == "+" || this.form.rh_SER110C == "-") {
            this._evaluarsexo_SER110C();
          } else if ($.isNumeric(this.form.rh_SER110C)) {
            CON851("2C", "2C", null, "error", "error");
            this._evaluarrh_SER110C();
          } else {
            CON851("03", "03", null, "error", "error");
            this._evaluarrh_SER110C();
          }
        }
      );
    },
    _evaluarsexo_SER110C() {
      validarInputs(
        {
          form: "#SEXO_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarsexo_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarsexo_SER110C);
          },
        },
        this._evaluargruposang_SER110C,
        () => {
          this.form.sexo_SER110C = this.form.sexo_SER110C.toUpperCase();
          if (this.form.sexo_SER110C == "M" || this.form.sexo_SER110C == "F") {
            this._evaluarestcivil_SER110C();
          } else if (this.form.sexo_SER110C.trim() == "") {
            CON851("", "Debe indicar el sexo del paciente", null, "error", "Error");
            this._evaluarsexo_SER110C();
          } else {
            this._evaluarsexo_SER110C();
          }
        }
      );
    },
    _evaluarestcivil_SER110C() {
      if ($_USUA_GLOBAL[0].NIT == 900019291) {
        this.form.civil_SER110C = "S - SOLTERO";
        this.form.zona_SER110C = "U - URBAN0";
        this.form.ciudadportab_SER110C = $_USUA_GLOBAL[0].COD_CIUD;
        this._evaluarocupacion_SER110C();
      } else if (this.SER110C.UNIDADEDADW == "D" || this.SER110C.UNIDADEDADW == "M" || this.SER110C.VLREDADW < 16) {
        this.form.civil_SER110C = "S - SOLTERO";
        setTimeout(this._evaluarestudio_SER110C, 300);
      } else {
        obtenerDatosCompletos({ nombreFd: "ESTADOCIVIL" }, (data) => {
          var civil = data.ESTADOCIVIL;
          POPUP(
            {
              array: civil,
              titulo: "ESTADO CIVIL",
              indices: [
                {
                  id: "COD",
                  label: "DESCRIP",
                },
              ],
              seleccion: this.form.civil_SER110C.substring(0, 1),
              callback_f: () => {
                this._evaluarsexo_SER110C();
              },
              teclaAlterna: true,
            },
            (civil) => {
              this.form.civil_SER110C = civil.COD + " - " + civil.DESCRIP;
              setTimeout(this._evaluarestudio_SER110C, 300);
            }
          );
        });
      }
    },
    _evaluarestudio_SER110C() {
      obtenerDatosCompletos({ nombreFd: "NIVELESTUDIO" }, (data) => {
        var estudio = data.NIVELESTUDIO;
        POPUP(
          {
            array: estudio,
            titulo: "NIVEL DE ESTUDIO",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            seleccion: this.form.estudio_SER110C.substring(0, 1),
            callback_f: () => {
              if (this.SER110C.UNIDADEDADW == "D" || this.SER110C.UNIDADEDADW == "M" || this.SER110C.VLREDADW < 16) {
                setTimeout(this._evaluarsexo_SER110C, 300);
              } else {
                setTimeout(this._evaluarestcivil_SER110C, 300);
              }
            },
            teclaAlterna: true,
          },
          (estudio) => {
            this.form.estudio_SER110C = estudio.COD + " - " + estudio.DESCRIP;
            this._evaluarzona_SER110C();
          }
        );
      });
    },
    _evaluarzona_SER110C() {
      if (this.form.novedad_SER110C.substring(0, 1) == "7" && this.form.zona_SER110C.trim() == "") {
        this.form.zona_SER110C = "U- URBANO";
      }
      validarInputs(
        {
          form: "#ZONA_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarzona_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarzona_SER110C);
          },
        },
        () => {
          setTimeout(this._evaluarestudio_SER110C, 300);
        },
        () => {
          this.form.zona_SER110C = this.form.zona_SER110C.toUpperCase();
          if (this.form.zona_SER110C.substring(0, 1) == "U" || this.form.zona_SER110C.substring(0, 1) == "R") {
            switch (this.form.zona_SER110C.substring(0, 1)) {
              case "U":
                this.form.zona_SER110C = "U- URBANO";
                break;
              default:
                this.form.zona_SER110C = "R- RURAL";
                break;
            }
            this._validacionesmenor_SER110C();
          } else {
            CON851("03", "03", null, "error", "error");
            this._evaluarzona_SER110C();
          }
        }
      );
    },
    _validacionesmenor_SER110C() {
      if ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162) {
        $("#EMAIL2_SER110C").removeClass("hidden");
        this._evaluargmail2_SER110C();
      } else {
        if (
          this.SER110C.UNIDADEDADW == "D" ||
          this.SER110C.UNIDADEDADW == "M" ||
          (this.SER110C.UNIDADEDADW == "A" && this.SER110C.VLREDADW < 18)
        ) {
          $("#PADRE_SER110C").removeClass("hidden");
          $("#MADRE_SER110C").removeClass("hidden");
          this._evaluarpadre_SER110C();
        } else {
          if (
            $_USUA_GLOBAL[0].NIT == 19381427 ||
            $_USUA_GLOBAL[0].NIT == 17306492 ||
            $_USUA_GLOBAL[0].NIT == 800175901
          ) {
            $("#PADRE_SER110C").removeClass("hidden");
            $("#MADRE_SER110C").removeClass("hidden");
            this._evaluarpadre_SER110C();
          } else {
            this._evaluarciudad_SER110C();
          }
        }
      }
    },
    _evaluargmail2_SER110C() {
      validarInputs(
        {
          form: "#EMAIL2_SER110C",
          orden: "1",
        },
        this._evaluarzona_SER110C,
        () => {
          if (this.form.correo2_SER110C.trim() == "") {
            CON851("02", "02", null, "error", "error");
            this._evaluargmail2_SER110C();
          } else {
            var correo2 = this.form.correo2_SER110C.indexOf("@");
            if (correo2 < 1) {
              CON851("2K", "2K", null, "error", "error");
              this._evaluargmail2_SER110C();
            } else {
              this.form.ciudad_SER110C = $_USUA_GLOBAL[0].COD_CIUD;
              this._evaluardireccion_SER110C();
            }
          }
        }
      );
    },
    _evaluarpadre_SER110C() {
      validarInputs(
        {
          form: "#PADRE_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarpadre_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarpadre_SER110C);
          },
        },
        () => {
          this._evaluarzona_SER110C();
        },
        () => {
          this.form.padre_SER110C = this.form.padre_SER110C.toUpperCase();
          if (this.form.padre_SER110C.trim() == "" && $_USUA_GLOBAL[0].COD_CIUD.substring(0, 2) == 85) {
            CON851("02", "02", null, "error", "error");
            if (this.form.novedad_SER110C.substring(0, 1) == "7") {
              this._evaluarpadre_SER110C();
            } else {
              this._evaluarmadre_SER110C();
            }
          } else {
            this._evaluarmadre_SER110C();
          }
        }
      );
    },
    _evaluarmadre_SER110C() {
      validarInputs(
        {
          form: "#MADRE_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarmadre_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarmadre_SER110C);
          },
        },
        () => {
          this._evaluarpadre_SER110C();
        },
        () => {
          this.form.madre_SER110C = this.form.madre_SER110C.toUpperCase();
          if (this.form.madre_SER110C.trim() == "" && $_USUA_GLOBAL[0].COD_CIUD.substring(0, 2) == 85) {
            CON851("02", "02", null, "error", "error");
            if (this.form.novedad_SER110C.substring(0, 1) == "7") {
              this._evaluarmadre_SER110C();
            } else {
              this._evaluarciudad_SER110C();
            }
          } else {
            this._evaluarciudad_SER110C();
          }
        }
      );
    },
    _evaluarciudad_SER110C() {
      if (this.form.novedad_SER110C.substring(0, 1) == "7" && this.form.ciudad_SER110C.trim() == "") {
        this.form.ciudad_SER110C = $_USUA_GLOBAL[0].COD_CIUD;
      }
      validarInputs(
        {
          form: "#CIUDAD_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarciudad_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarciudad_SER110C);
          },
        },
        () => {
          this._evaluarzona_SER110C();
        },
        () => {
          if (this.form.ciudad_SER110C.substring(2, 5) == "000") {
            CON851("", "Verifique codigo de ciudad", null, "error", "Error");
            this._evaluarciudad_SER110C();
          } else {
            const res = this.SER110C.CIUDAD.find((e) => e.COD == this.form.ciudad_SER110C);
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              this._evaluarciudad_SER110C();
            } else {
              this.form.ciudadd_SER110C = res.NOMBRE;
              this.SER110C.ACTBARRIOW = res.NOMBRE.ACTBARRIOS;
              if (
                this.form.identif_SER110C.substring(0, 3) == "CE " ||
                this.form.identif_SER110C.substring(0, 3) == "CD " ||
                this.form.identif_SER110C.substring(0, 3) == "SC " ||
                this.form.identif_SER110C.substring(0, 3) == "PE " ||
                this.form.identif_SER110C.substring(0, 3) == "CN " ||
                this.form.identif_SER110C.substring(0, 3) == "ASI" ||
                this.form.identif_SER110C.substring(0, 3) == "MSI"
              ) {
                this._evaluarpais_SER110C();
              } else {
                this._evaluartelefono1_SER110C();
              }
            }
          }
        }
      );
    },
    _evaluarpais_SER110C() {
      validarInputs(
        {
          form: "#PAIS_SER110C",
          orden: "1",
        },
        this._evaluarciudad_SER110C,
        () => {
          this.form.pais_SER110C = this.form.pais_SER110C.toUpperCase();
          const res = this.SER110C.PAISES.find((e) => e.CODIGO == this.form.pais_SER110C);
          if (res == undefined) {
            CON851("01", "01", null, "error", "error");
            this._evaluarpais_SER110C();
          } else {
            this.form.paisd_SER110C = res.DESCRIP;
            this._evaluartelefono1_SER110C();
          }
        }
      );
    },
    _cambioEvento_SER110C(e) {
      _fin_validar_form();
      let funcion = e.srcElement.getAttribute("data-validar");
      this[funcion]();
    },
    _evaluartelefono1_SER110C() {
      validarInputs(
        {
          form: "#TELEFONO_SER110C",
          orden: "1",
        },
        this._evaluarciudad_SER110C,
        () => {
          if (telefono1Mask_SER110C.value.trim() == "") {
            CON851("02", "02", null, "error", "error");
            this._evaluartelefono1_SER110C();
          } else {
            this._evaluartelefono2_SER110C();
          }
        }
      );
    },
    _evaluartelefono2_SER110C() {
      validarInputs(
        {
          form: "#TELEFONO2_SER110C",
          orden: "1",
        },
        this._evaluartelefono1_SER110C,
        () => {
          // telefono2Mask_SER110C.value
          this._evaluardireccion_SER110C();
        }
      );
    },
    _evaluardireccion_SER110C() {
      validarInputs(
        {
          form: "#DIRECCION_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluardireccion_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluardireccion_SER110C);
          },
        },
        this._evaluartelefono1_SER110C,
        () => {
          this.form.direccion_SER110C = this.form.direccion_SER110C.toUpperCase();
          if (this.form.direccion_SER110C.trim() == "") {
            CON851("84", "84", null, "error", "error");
            this._evaluardireccion_SER110C();
          } else {
            if (this.SER110C.ACTBARRIOW != "S" || this.SER110C.ACTBARRIOW.trim() == "") {
              this._evaluarocupacion_SER110C();
            } else {
              this._evaluarbarrio_SER110C();
            }
          }
        }
      );
    },
    _evaluarbarrio_SER110C() {
      validarInputs(
        {
          form: "#BARRIOS_SER110C",
          orden: "1",
        },
        this._evaluardireccion_SER110C,
        () => {
          this.SER110C.CIUBARRIOW = this.form.barrio_SER110C.substring(0, 4);
          this.SER110C.SECUBARRIOW = this.form.barrio_SER110C.substring(4, 11);
          if (this.SER110C.CIUBARRIOW == "00000" || this.SER110C.CIUBARRIOW.trim() == "") {
            this._evaluarbarrio_SER110C();
          } else {
            const res = this.SER110C.BARRIOS.find((e) => e.LLAVE == this.form.barrio_SER110C);
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              this._evaluarbarrio_SER110C();
            } else {
              this.form.descripbarrio_SER110C = res.NOMBRE;
              this._evaluarocupacion_SER110C();
            }
          }
        }
      );
    },
    _evaluarocupacion_SER110C() {
      if (this.form.ocupacion_SER110C == "0000" || this.form.ocupacion_SER110C.trim() == "") {
        if (this.SER110C.UNIDADEDADW == "D" || this.SER110C.UNIDADEDADW == "M" || this.SER110C.VLREDADW < 18) {
          this.form.ocupacion_SER110C = "9998";
        }
      }
      validarInputs(
        {
          form: "#OCUPACION_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarocupacion_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarocupacion_SER110C);
          },
        },
        this._evaluardireccion_SER110C,
        () => {
          const res = this.SER110C.OCUPACIONES.find((e) => e.CODOCU == this.form.ocupacion_SER110C);
          if (res == undefined) {
            CON851("01", "01", null, "error", "error");
            this._evaluarocupacion_SER110C();
          } else {
            this.form.ocupaciond_SER110C = res.NOMBREOCU;
            this._evaluarestrato_SER110C();
          }
        }
      );
    },
    _evaluarestrato_SER110C() {
      obtenerDatosCompletos({ nombreFd: "ESTRATO" }, (data) => {
        var estrato = data.ESTRATO;
        POPUP(
          {
            array: estrato,
            titulo: "NIVEL",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            seleccion: this.form.nivel_SER110C.substring(0, 1),
            callback_f: () => {
              this._evaluarocupacion_SER110C();
            },
            teclaAlterna: true,
          },
          (estrato) => {
            this.form.nivel_SER110C = estrato.COD + " - " + estrato.DESCRIP;
            this._evaluarcopago_SER110C();
          }
        );
      });
    },
    _evaluarcopago_SER110C() {
      if ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719) {
        if (copagoMask_SER110C.value.trim() == "") {
          copagoMask_SER110C.typedValue = "S";
        }
      } else {
        if (copagoMask_SER110C.value.trim() != "" && this.form.novedad_SER110C.substring(0, 1) == "7") {
          copagoMask_SER110C.typedValue = "S";
        }
      }
      validarInputs(
        {
          form: "#COPAGO_SER110C",
          orden: "1",
        },
        () => {
          setTimeout(this._evaluarestrato_SER110C, 300);
        },
        () => {
          if (copagoMask_SER110C.value.trim() == "") {
            CON851("02", "02", null, "error", "error");
            this._evaluarcopago_SER110C();
          } else {
            this._evaluarregimen_SER110C();
          }
        }
      );
    },
    _evaluarregimen_SER110C() {
      obtenerDatosCompletos({ nombreFd: "TIPOUSUARIO" }, (data) => {
        this.SER110C.TIPO = data();
        var tipousuario = this.SER110C.TIPO.TIPOUSUARIO;
        POPUP(
          {
            array: tipousuario,
            titulo: "TIPO USUARIO",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            seleccion: this.form.regimen_SER110C.substring(0, 1),
            callback_f: () => {
              this._evaluarcopago_SER110C();
            },
            teclaAlterna: true,
          },
          (tipousuario) => {
            this.form.regimen_SER110C = tipousuario.COD + " - " + tipousuario.DESCRIP;
            this._evaluarcolegio_SER110C();
          }
        );
      });
    },
    _evaluarcolegio_SER110C() {
      validarInputs(
        {
          form: "#COLEGIO_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarcolegio_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarcolegio_SER110C);
          },
        },
        () => {
          setTimeout(this._evaluarregimen_SER110C, 300);
        },
        () => {
          if (this.form.colegio_SER110C.trim() == "" || this.form.colegio_SER110C == "            ") {
            this.form.colegiod_SER110C = "COLEGIO NO ASIGNADO";
            this._evaluaretnia_SER110C();
          } else {
            let URL = get_url("APP/SALUD/SER110CV2.DLL");
            postData(
              {
                datosh: datosEnvio() + "1|" + this.form.colegio_SER110C + "|",
              },
              URL
            )
              .then((data) => {
                this.form.colegiod_SER110C = data;
                if (this.form.regimen_SER110C.substring(0, 1) == "P") {
                  this.form.etnia_SER110C = "9 - NO APLICA";
                  this._evaluartipoafiliado_SER110C();
                } else {
                  this._evaluaretnia_SER110C();
                }
              })
              .catch((error) => {
                console.error(error);
                this._evaluarcolegio_SER110C();
              });
          }
        }
      );
    },
    _evaluaretnia_SER110C() {
      obtenerDatosCompletos({ nombreFd: "ETNIA" }, (data) => {
        var etnia = data.ETNIA;
        POPUP(
          {
            array: etnia,
            titulo: "NIVEL",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            seleccion: this.form.etnia_SER110C.substring(0, 1),
            callback_f: () => {
              this._evaluarcolegio_SER110C();
            },
            teclaAlterna: true,
          },
          (etnia) => {
            this.form.etnia_SER110C = etnia.COD + " - " + etnia.DESCRIP;
            this._validacionesetnia_SER110C();
          }
        );
      });
    },
    _validacionesetnia_SER110C() {
      if (this.form.etnia_SER110C.substring(0, 1) == "1") {
        let URL = get_url("APP/SALUD/SER867.DLL");
        postData(
          {
            datosh: datosEnvio() + localStorage["Usuario"] + "|",
          },
          URL
        )
          .then((data) => {
            loader("hide");
            this.SER110C.ETNIAS = data.ETNIAS;
            this.SER110C.ETNIAS.pop();
            $_this = this;
            if ($_this.SER110C.ETNIAS.length == 0) {
              CON851("4J", "4J", null, "error", "error");
              setTimeout(this._evaluaretnia_SER110C, 300);
            } else {
              _ventanaDatos({
                titulo: "VENTANA DE ETNIAS PACIENTES",
                columnas: ["COD", "DESCRIP"],
                data: $_this.SER110C.ETNIAS,
                callback_esc: function () {
                  setTimeout($_this._evaluaretnia_SER110C, 500);
                },
                callback: function (data) {
                  $_this.form.indigena_SER110C = data.COD;
                  setTimeout($_this._validarcomunidad_SER110C, 300);
                },
              });
            }
          })
          .catch((error) => {
            console.error(error);
            setTimeout(this._evaluaretnia_SER110C, 500);
          });
      } else {
        this._validarcomunidad_SER110C();
      }
    },
    _validarcomunidad_SER110C() {
      if (
        (this.form.etnia_SER110C.substring(0, 1) == "1" || this.form.etnia_SER110C.substring(0, 1) == "2") &&
        $_USUA_GLOBAL[0].NIT != 845000038
      ) {
        let URL = get_url("APP/SALUD/SER116A.DLL");
        postData(
          {
            datosh: datosEnvio() + localStorage["Usuario"] + "|",
          },
          URL
        )
          .then((data) => {
            loader("hide");
            this.SER110C.COMUNIDADES = data.COMUNIDADES;
            this.SER110C.COMUNIDADES.pop();
            $_this = this;
            if ($_this.SER110C.COMUNIDADES.length == 0) {
              CON851("4X", "4X", null, "error", "error");
              setTimeout($_this._evaluaretnia_SER110C, 500);
            } else {
              _ventanaDatos({
                titulo: "VENTANA DE COMUNIDADES PACIENTES",
                columnas: ["COD", "DESCRIP"],
                data: $_this.SER110C.COMUNIDADES,
                callback_esc: function () {
                  setTimeout($_this._evaluaretnia_SER110C, 500);
                },
                callback: function (data) {
                  $_this.form.comunidades_SER110C = data.COD;
                  setTimeout($_this._validarresguardos_SALSER110C, 300);
                },
              });
            }
          })
          .catch((error) => {
            console.error(error);
            setTimeout(this._evaluaretnia_SER110C, 500);
          });
      } else {
        setTimeout(this._evaluartipoafiliado_SER110C, 300);
      }
    },
    _validarresguardos_SALSER110C() {
      if (
        (this.form.etnia_SER110C.substring(0, 1) == "1" || this.form.etnia_SER110C.substring(0, 1) == "2") &&
        $_USUA_GLOBAL[0].NIT != 845000038
      ) {
        let URL = get_url("APP/" + "SALUD/SER117A" + ".DLL");
        postData(
          {
            datosh: datosEnvio() + localStorage["Usuario"] + "|",
          },
          URL
        )
          .then((data) => {
            loader("hide");
            this.SER110C.RESGUARDOS = data.RESGUARDOS;
            this.SER110C.RESGUARDOS.pop();
            $_this = this;
            if ($_this.SER110C.RESGUARDOS.length == 0) {
              CON851("4Y", "4Y", null, "error", "error");
              setTimeout($_this._evaluaretnia_SER110C, 300);
            } else {
              _ventanaDatos({
                titulo: "VENTANA DE RESGUARDOS PACIENTES",
                columnas: ["COD", "DESCRIP"],
                data: $_this.SER110C.RESGUARDOS,
                callback_esc: function () {
                  setTimeout($_this._evaluaretnia_SER110C, 300);
                },
                callback: function (data) {
                  $_this.form.resguardos_SER110C = data.COD;
                  setTimeout($_this._evaluartipoafiliado_SER110C, 300);
                },
              });
            }
          })
          .catch((error) => {
            console.error(error);
            setTimeout(this._evaluaretnia_SER110C, 500);
          });
      }
    },
    _evaluartipoafiliado_SER110C() {
      obtenerDatosCompletos({ nombreFd: "TIPOAFILIADO" }, (data) => {
        let afiliado = [];
        if ($_USUA_GLOBAL[0].NIT == 892000264) {
          afiliado = data.TIPOAFILIADO.filter((el) => !["3", "4", "0"].includes(el.COD));
        } else {
          afiliado = data.TIPOAFILIADO;
        }
        console.log("afiliado", data.TIPOAFILIADO);
        POPUP(
          {
            array: afiliado,
            titulo: "TIPO AFILIADO",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            seleccion: this.form.tipoafil_SER110C.substring(0, 1),
            callback_f: () => {
              setTimeout(this._evaluaretnia_SER110C, 500);
            },
            teclaAlterna: true,
          },
          (afiliado) => {
            this.form.tipoafil_SER110C = afiliado.COD + " - " + afiliado.DESCRIP;
            if ($_USUA_GLOBAL[0].NIT == 900405505 && this.form.regimen_SER110C.substring(0, 1) != "O") {
              if (
                this.form.regimen_SER110C.substring(0, 1) != "S" &&
                (this.form.tipoafil_SER110C.substring(0, 1) == "5" || this.form.tipoafil_SER110C.substring(0, 1) == "6")
              ) {
                this._evaluarportabilidad_SER110C();
              } else {
                if (
                  this.form.regimen_SER110C.substring(0, 1) != "C" &&
                  (this.form.tipoafil_SER110C.substring(0, 1) == "1" ||
                    this.form.tipoafil_SER110C.substring(0, 1) == "2" ||
                    this.form.tipoafil_SER110C.substring(0, 1) == "0")
                ) {
                  this._evaluarportabilidad_SER110C();
                } else {
                  setTimeout(this._evaluartipoafiliado_SER110C, 300);
                }
              }
            } else {
              this._evaluarportabilidad_SER110C();
            }
          }
        );
      });
    },
    _evaluarportabilidad_SER110C() {
      validarInputs(
        {
          form: "#PORTABILI_SER110C",
          orden: "1",
        },
        () => {
          setTimeout(this._evaluartipoafiliado_SER110C, 300);
        },
        () => {
          this.form.portabilidad_SER110C = this.form.portabilidad_SER110C.toUpperCase();
          if (this.form.portabilidad_SER110C.trim() == "") {
            this.form.portabilidad_SER110C = "N";
            this.form.ciudadportab_SER110C = this.form.ciudad_SER110C;
            this._evaluardesplazado_SER110C();
          } else if (this.form.portabilidad_SER110C == "S") {
            this._evaluarciudadaseg_SER110C();
          } else if (this.form.portabilidad_SER110C == "N") {
            this.form.ciudadportab_SER110C = this.form.ciudad_SER110C;
            this._evaluardesplazado_SER110C();
          } else {
            CON851("02", "02", null, "error", "error");
            this._evaluarportabilidad_SER110C();
          }
        }
      );
    },
    _evaluarciudadaseg_SER110C() {
      validarInputs(
        {
          form: "#CIUDADPORTA_SER110C",
          orden: "1",
        },
        () => {
          this._evaluarportabilidad_SER110C();
        },
        () => {
          if (this.form.ciudadportab_SER110C.trim() == "") {
            this.form.ciudadportab_SER110C = this.form.ciudad_SER110C;
            this._evaluardesplazado_SER110C();
          } else {
            const res = this.SER110C.CIUDAD.find((e) => e.COD == this.form.ciudadportab_SER110C);
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              this._evaluarciudadaseg_SER110C();
            } else {
              this._evaluardesplazado_SER110C();
            }
          }
        }
      );
    },
    _evaluardesplazado_SER110C() {
      if (
        (this.form.regimen_SER110C.substring(0, 1) == "D" ||
          this.form.regimen_SER110C.substring(0, 1) == "E" ||
          this.form.regimen_SER110C.substring(0, 1) == "F") &&
        this.form.tipoafil_SER110C.substring(0, 1) == "1"
      ) {
        let { ipcRenderer } = require("electron");
        ipcRenderer.send(
          "another",
          (datos = { directorio: "SALUD/paginas/SER110D.html", cedula: this.form.numero_SER110C })
        );
        vector = ["on", "Actualizando maestro de desplazados..."];
        _EventocrearSegventana(vector, this._evaluarentidadafiliada_SER110C);
      } else {
        this._evaluarentidadafiliada_SER110C();
      }
    },
    _evaluarentidadafiliada_SER110C() {
      validarInputs(
        {
          form: "#AFILIADO_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarentidadafiliada_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarentidadafiliada_SER110C);
          },
        },
        this._evaluarportabilidad_SER110C,
        () => {
          this.form.eps_SER110C = this.form.eps_SER110C.toUpperCase();
          if (this.form.eps_SER110C.trim() == "") {
            if (this.form.regimen_SER110C.substring(0, 1) == "P") {
              this.form.eps_SER110C = "SIN001";
              this.form.epsd_SER110C = "SIN DETERMINAR";
              this._validacionesentidadafil_SER110C();
            } else {
              CON851("02", "02", null, "error", "error");
              this._evaluarentidadafiliada_SER110C();
            }
          } else {
            const res = this.SER110C.ENTIDADES.find((e) => e["COD-ENT"] == this.form.eps_SER110C);
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              this._evaluarentidadafiliada_SER110C();
            } else {
              this.SER110C.NITENT = res["NIT-ENT"];
              this.form.epsd_SER110C = res["NOMBRE-ENT"];
              this._validacionesentidadafil_SER110C();
            }
          }
        }
      );
    },
    _validacionesentidadafil_SER110C() {
      if (localStorage.Usuario == "ADMIN" || localStorage.Usuario == "GEBC") {
        this._evaluarcontrato_SER110C();
      } else {
        if (this.form.eps_SER110C != this.SER110C.EPAPACIW) {
          if (this.form.eps_SER110C == "SIN438" || this.SER110C.EPAPACIW == "SIN438") {
            this.form.eps_SER110C = this.SER110C.EPAPACIW;
            this._evaluarentidadafiliada_SER110C();
          } else {
            this._evaluarcontrato_SER110C();
          }
        } else {
          this._evaluarcontrato_SER110C();
        }
      }
    },
    _evaluarcontrato_SER110C() {
      if (this.form.entidad_SER110C != this.SER110C.NITENT) this.form.entidad_SER110C = this.SER110C.NITENT;
      validarInputs(
        {
          form: "#CONTRATO_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarcontrato_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarcontrato_SER110C);
          },
        },
        this._evaluarentidadafiliada_SER110C,
        () => {
          if (
            $_USUA_GLOBAL[0].NIT == 900405505 &&
            (this.form.contrato_SER110C.trim() == "" || this.form.contrato_SER110C == 99)
          ) {
            this._evaluarcontrato_SER110C();
          } else if ($_USUA_GLOBAL[0].NIT == 830092718 && this.form.novedad_SER110C.substring(0, 1) == "7") {
            this._evaluarmamografia_SER110C();
          } else {
            if ($_USUA_GLOBAL[0].NIT == 900229438) {
              this._evaluarcotizante_SER110C();
            } else {
              // if ($_USUA_GLOBAL[0].NIT == 892000264) {
              // this._evaluarvictimaconf_SER110C()
              // } else {
              this._evaluarfechaafiliado_SER110C();
              // }
            }
          }
        }
      );
    },
    _evaluarfechaafiliado_SER110C() {
      validarInputs(
        {
          form: "#FECHAAFIL_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarfechaafiliado_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarfechaafiliado_SER110C);
          },
        },
        this._evaluarcontrato_SER110C,
        () => {
          if (
            (this.form.eps_SER110C == "EPS013" || this.form.eps_SER110C == "RES004") &&
            fechaafilMask_SER110C.value.trim() == ""
          ) {
            CON851("02", "02", null, "error", "error");
            if ($_USUA_GLOBAL[0].NIT == 891855847) {
              this._evaluarfechaafiliado_SER110C();
            } else {
              this._evaluarcarnet_SER110C();
            }
          } else if (fechaafilMask_SER110C.value.trim() == "") {
            this._evaluarcarnet_SER110C();
          } else {
            this._evaluarficha_SER110C();
          }
        }
      );
    },
    _evaluarficha_SER110C() {
      validarInputs(
        {
          form: "#FICHA_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarficha_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarficha_SER110C);
          },
        },
        this._evaluarfechaafiliado_SER110C,
        () => {
          this.form.ficha_SER110C = this.form.ficha_SER110C.toUpperCase();
          this._evaluarcarnet_SER110C();
        }
      );
    },
    _evaluarcarnet_SER110C() {
      validarInputs(
        {
          form: "#CARNET_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarcarnet_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarcarnet_SER110C);
          },
        },
        this._evaluarficha_SER110C,
        () => {
          this.form.carnet_SER110C = this.form.carnet_SER110C.toUpperCase();
          this._evaluarfechavence_SER110C();
        }
      );
    },
    _evaluarfechavence_SER110C() {
      postData(
        { datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|${"IS7677"}|` },
        get_url("APP/CONTAB/CON904.DLL")
      )
        .then((data) => {
          $_this = this;
          validarInputs(
            {
              form: "#FECHAVENCE_SER110C",
              orden: "1",
              event_f7: () => {
                $_this._evaluarcambiosbasedatos_SER110C($_this._evaluarfechavence_SER110C);
              },
              event_f9: () => {
                $_this._datoscompletfamiliar_SER110C($_this._evaluarfechavence_SER110C);
              },
            },
            $_this._evaluarcarnet_SER110C,
            () => {
              if (fechavenceMask_SER110C.value.trim() == "") {
                $_this._evaluarcotizante_SER110C();
              } else {
                if (
                  moment().format("YYYYMMDD") >
                    moment(fechavenceMask_SER110C.value.replace(/-/g, "")).format("YYYYMMDD") ==
                  "Invalid Date"
                ) {
                  $_this.form.basedatos_SER110C = "2 - En base de datos";
                  $_this.form.clasif_SER110C = "R";
                }
                $_this._evaluarcotizante_SER110C();
              }
            }
          );
        })
        .catch((err) => {
          console.error(err);
          if (this.form.novedad_SER110C.substring(0, 1) == "7") {
            fechavenceMask_SER110C.typedValue = moment().format("YYYYMMDD");
            this._evaluarcotizante_SER110C();
          } else {
            this._evaluarfechaafiliado_SER110C();
          }
        });
    },
    _evaluarcotizante_SER110C() {
      let afiliado = this.form.tipoafil_SER110C.substring(0, 1);
      let regimen = this.form.regimen_SER110C.substring(0, 1);

      if (regimen == "V" || regimen == "P" || regimen == "O" || afiliado == "1" || afiliado == "3") {
        this.form.cotizante_SER110C = this.form.numero_SER110C;
        this._mostrarcotizante_SER110C();
      } else {
        validarInputs(
          {
            form: "#COTIZANTE_SER110C",
            orden: "1",
            event_f7: () => {
              this._evaluarcambiosbasedatos_SER110C(this._evaluarcotizante_SER110C);
            },
            event_f9: () => {
              this._datoscompletfamiliar_SER110C(this._evaluarcotizante_SER110C);
            },
          },
          this._evaluarfechavence_SER110C,
          () => {
            this.form.cotizante_SER110C = this.form.cotizante_SER110C.padStart(15, "0");
            this._mostrarcotizante_SER110C();
          }
        );
      }
    },
    _mostrarcotizante_SER110C() {
      if (
        (this.form.tipoafil_SER110C.substring(0, 1) == "2" || this.form.tipoafil_SER110C.substring(0, 1) == "4") &&
        this.form.cotizante_SER110C == this.form.numero_SER110C
      ) {
        CON851("03", "03", null, "error", "error");
        return this._evaluarcotizante_SER110C();
      }
      if (this.form.tipoafil_SER110C.substring(0, 1) == "2" && this.form.cotizante_SER110C.trim() == 0) {
        CON851("02", "02", null, "error", "error");
        if (
          ($_USUA_GLOBAL[0].NIT == 800162035 && (localStorage.Usuario == "ALMB" || localStorage.Usuario == "KAJU")) ||
          $_USUA_GLOBAL[0].NIT == 800037202
        ) {
          return this._evaluarparentezco_SER110C();
        } else if ($_USUA_GLOBAL[0].NIT == 892000264) {
          return this._evaluarempresa_SER110C();
        } else return this._evaluarcotizante_SER110C();
      }
      if (this.form.cotizante_SER110C == 0) {
        this.form.cotizante_SER110C = "000000000000000";
        this.form.cotizanted_SER110C = "";
        this.form.parentezco_SER110C = "00";
        this._evaluarparentezco_SER110C();
      } else {
        if (this.form.cotizante_SER110C == this.form.numero_SER110C) {
          this.form.cotizanted_SER110C =
            primerapellido_SER110C.value.padEnd(15, " ") +
            segundoapellido_SER110C.value.padEnd(15, " ") +
            primernombre_SER110C.value.padEnd(12, " ") +
            segundonombre_SER110C.value.padEnd(12, " ");
          this._evaluarparentezco_SER110C();
        } else {
          let URL = get_url("APP/SALUD/SER810-1.DLL");
          postData(
            {
              datosh: datosEnvio() + this.form.numero_SER110C + "|",
            },
            URL
          )
            .then((data) => {
              this.SER110C.COTIZANTE = data["REG-PACI"][0];
              this.form.parentezco_SER110C = this.SER110C.COTIZANTE["TIPO-AFIL"];
              if (this.form.parentezco_SER110C == "1" || this.form.parentezco_SER110C == "3") {
                this.form.cotizanted_SER110C = this.SER110C.COTIZANTE.DESCRIP;
                this._evaluarparentezco_SER110C();
              } else {
                CON851("03", "03", null, "error", "error");
                return this._evaluarcotizante_SER110C();
              }
            })
            .catch((error) => {
              console.error(error);
              CON851P("08", this._evaluarcotizante_SER110C, this._crearcotizante_SER110C);
            });
        }
      }
    },
    _crearcotizante_SER110C() {
      let { ipcRenderer } = require("electron");
      ipcRenderer.send(
        "another",
        (datos = { directorio: "SALUD/paginas/SER110CA.html", cedula: this.form.cotizante_SER110C })
      );
      vector = ["on", "Actualizando maestro de pacientes..."];
      _EventocrearSegventana(vector, this._evaluarcotizante_SER110C);
    },
    _evaluarparentezco_SER110C() {
      console.log("parentezco");
      if (
        this.form.tipoafil_SER110C.substring(0, 1) == "0" ||
        this.form.tipoafil_SER110C.substring(0, 1) == "1" ||
        this.form.tipoafil_SER110C.substring(0, 1) == "3"
      ) {
        this.form.parentezco_SER110C = "00";
      }
      obtenerDatosCompletos({ nombreFd: "PARENTEZCO" }, (data) => {
        var parentezco = data.PARENTEZCO;
        POPUP(
          {
            array: parentezco,
            titulo: "RELACION CON EL COTIZANTE",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            seleccion: this.form.parentezco_SER110C.substring(0, 2),
            callback_f: () => {
              this._evaluarfechavence_SER110C();
            },
            teclaAlterna: true,
          },
          (parentezco) => {
            this.form.parentezco_SER110C = parentezco.COD + " - " + parentezco.DESCRIP;
            if (this.form.parentezco_SER110C == "00") {
              if (this.form.tipoafil_SER110C.substring(0, 1) == "2") {
                CON851("03", "03", null, "error", "error");
                return setTimeout(this._evaluarparentezco_SER110C, 300);
              } else {
                this._evaluarempresa_SER110C();
              }
            } else {
              this._evaluarempresa_SER110C();
            }
          }
        );
      });
    },
    _evaluarempresa_SER110C() {
      validarInputs(
        {
          form: "#EMPRESALAB_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarempresa_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarempresa_SER110C);
          },
        },
        () => {
          setTimeout(this._evaluarcotizante_SER110C, 300);
        },
        () => {
          this.form.empresalab_SER110C = this.form.empresalab_SER110C.toUpperCase();
          this._evaluarvictimaconf_SER110C();
        }
      );
    },
    _evaluarvictimaconf_SER110C() {
      if (victimaMask_SER110C.value.trim() == "") victimaMask_SER110C.typedValue = "N";
      validarInputs(
        {
          form: "#EVAVICTIMAC_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarvictimaconf_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarvictimaconf_SER110C);
          },
        },
        this._evaluarempresa_SER110C,
        () => {
          this._evaluarprogespecial_SER110C();
        }
      );
    },
    _evaluarprogespecial_SER110C() {
      if (progespecialMask_SER110C.value.trim() == "") progespecialMask_SER110C.typedValue = "N";
      validarInputs(
        {
          form: "#EVAPROESPECIAL_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarprogespecial_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarprogespecial_SER110C);
          },
        },
        this._evaluarvictimaconf_SER110C,
        () => {
          this._evaluaraltocosto_SER110C();
        }
      );
    },
    _evaluaraltocosto_SER110C() {
      if (altocostoMask_SER110C.value.trim() == "") altocostoMask_SER110C.typedValue = "N";
      validarInputs(
        {
          form: "#EVAALTOCOSTO_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluaraltocosto_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluaraltocosto_SER110C);
          },
        },
        this._evaluarprogespecial_SER110C,
        () => {
          setTimeout(() => {
            _resultadocovid_SALUD(
              this._evaluarcronico_SER110C,
              this._evaluaraltocosto_SER110C,
              (params = { COVID: this.SER110C.RESULTADOCOVIDPACIW })
            );
          }, 300);
        }
      );
    },
    _evaluarcronico_SER110C(data) {
      this.SER110C.RESULTADOCOVIDPACIW = data.RESPUESTA;
      if (cronicoMask_SER110C.value.trim() == "") cronicoMask_SER110C.typedValue = "N";
      validarInputs(
        {
          form: "#EVACRONIC_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarcronico_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarcronico_SER110C);
          },
        },
        this._evaluaraltocosto_SER110C,
        () => {
          if (cronicoMask_SER110C.value == "S") {
            this._evaluapatologia_SER110C();
          } else {
            this.form.patologiacronica_SER110C = "";
            this._evaluartutela_SER110C();
          }
        }
      );
    },
    _evaluapatologia_SER110C() {
      validarInputs(
        {
          form: "#PATOLOGIA_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluapatologia_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluapatologia_SER110C);
          },
        },
        () => {
          this._evaluarcronico_SER110C();
        },
        () => {
          this.form.patologiacronica_SER110C = this.form.patologiacronica_SER110C.padStart(3, "0");
          if (this.form.patologiacronica_SER110C == "000") {
            _evaluartutela_7767();
          } else {
            const res = this.SER110C.PATOLOGIAS.find((e) => e.COD == this.form.patologiacronica_SER110C);
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              this._evaluapatologia_SER110C();
            } else {
              this._evaluartutela_SER110C();
            }
          }
        }
      );
    },
    _evaluartutela_SER110C() {
      if (tutelaMask_SER110C.value.trim() == "") tutelaMask_SER110C.typedValue = "N";
      validarInputs(
        {
          form: "#EVAPACITUTELA_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluartutela_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluartutela_SER110C);
          },
        },
        this._evaluarcronico_SER110C,
        () => {
          this._evaluarclasificacion_SER110C();
        }
      );
    },
    _evaluarclasificacion_SER110C() {
      switch ($_USUA_GLOBAL[0].NIT) {
        case 844003225:
        case 891855847:
        case 800162035:
        case 900541158:
        case 900565371:
        case 900566047:
        case 900658867:
        case 900405505:
        case 900405505:
          validarInputs(
            {
              form: "#CLASIF_SER110C",
              orden: "1",
              event_f7: () => {
                this._evaluarcambiosbasedatos_SER110C(this._evaluarclasificacion_SER110C);
              },
              event_f9: () => {
                this._datoscompletfamiliar_SER110C(this._evaluarclasificacion_SER110C);
              },
            },
            this._evaluartutela_SER110C,
            () => {
              if (this.form.clasif_SER110C.trim() == "") {
                this._evaluarmulticonsulta_SER110C();
              } else {
                const res = this.SER110C.CLASIFICACION.find((e) => e.COD == this.form.clasif_SER110C);
                if (res == undefined) {
                  CON851("01", "01", null, "error", "error");
                  this._evaluarclasificacion_SER110C();
                } else {
                  this.form.clasifd_SER110C = res.NOMBRE;
                  this._evaluarmulticonsulta_SER110C();
                }
              }
            }
          );
          break;
        default:
          this.form.clasif_SER110C = "";
          this._evaluaracompa_SER110C();
          break;
      }
    },
    _evaluarmulticonsulta_SER110C() {
      if (policonsultaMask_SER110C.value.trim() == "") policonsultaMask_SER110C.typedValue = "N";
      validarInputs(
        {
          form: "#EVAPOLICONSUL_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarmulticonsulta_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarmulticonsulta_SER110C);
          },
        },
        this._evaluarclasificacion_SER110C,
        () => {
          this._evaluaracompa_SER110C();
        }
      );
    },
    _evaluaracompa_SER110C() {
      setTimeout(() => {
        _acompanantepaciente_SALUD(
          this._validacionesmamografia_SER110C,
          this._evaluartutela_SER110C,
          (params = {
            IDACOMP: this.SER110C.IDACOMPW,
            TIPOACOMP: this.SER110C.TIPOACOMPW,
            NOMB1ACOMP: this.SER110C.NOMB1ACOMPW,
            NOMB2ACOMP: this.SER110C.NOMB2ACOMPW,
            APEL1ACOMP: this.SER110C.APEL1ACOMPW,
            APEL2ACOMP: this.SER110C.APEL2ACOMPW,
            TELACOMP: this.SER110C.TELACOMPW,
          })
        );
      }, 300);
    },
    _validacionesmamografia_SER110C() {
      console.log(data, "VNDSJVBNDSJBVDHJS");
      this.SER110C.IDACOMPW = data.IDACOMP;
      this.SER110C.TIPOACOMPW = data.TIPOACOMPA;
      this.SER110C.NOMB1ACOMPW = data.NOMB1ACOMPA.padEnd(12, " ");
      this.SER110C.NOMB2ACOMPW = data.NOMB2ACOMPA.padEnd(12, " ");
      this.SER110C.APEL1ACOMPW = data.APEL1ACOMPA.padEnd(15, " ");
      this.SER110C.APEL2ACOMPW = data.APEL2ACOMPA.padEnd(15, " ");
      this.SER110C.TELACOMPW = data.TELACOMPA;
      if ($_USUA_GLOBAL[0].NIT == 830092718 && this.form.sexo_SER110C == "F") {
        this._evaluarmamografia_SER110C();
      } else {
        this._evaluarcandidatopyp_SER110C();
      }
    },
    _evaluarmamografia_SER110C() {
      validarInputs(
        {
          form: "#MAMOGRAFIA1_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarmamografia_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarmamografia_SER110C);
          },
        },
        () => {
          this._evaluarmulticonsulta_SER110C();
        },
        () => {
          if (this.form.mamografiaano_SER110C.trim() == "") {
            this._evaluarrestriccion_SER110C();
          } else {
            if (this.form.mamografiaano_SER110C < 2000) {
              CON851("03", "03", null, "error", "error");
              this._evaluarmamografia_SER110C();
            } else {
              this._evaluarmesmamografia_SER110C();
            }
          }
        }
      );
    },
    _evaluarmesmamografia_SER110C() {
      validarInputs(
        {
          form: "#MAMOGRAFIA2_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarmesmamografia_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarmesmamografia_SER110C);
          },
        },
        () => {
          this._evaluarmamografia_SER110C();
        },
        () => {
          this.form.mamografiames_SER110C = this.form.mamografiames_SER110C.padStart(2, "0");
          if (this.form.mamografiames_SER110C < 01 || this.form.mamografiames_SER110C > 12) {
            this._evaluarmesmamografia_SER110C();
          } else {
            this.SER110C.FECHAMAMOGRAFIA = this.form.mamografiaano_SER110C + this.form.mamografiames_SER110C;
            if (this.form.novedad_SER110C.substring(0, 1) == "7") {
              this._evaluarnitfac_SER110C();
            } else {
              this._evaluarcandidatopyp_SER110C();
            }
          }
        }
      );
    },
    _evaluarcandidatopyp_SER110C() {
      if (candpypMask_SER110C.value.trim() == "") candpypMask_SER110C.typedValue = "N";
      validarInputs(
        {
          form: "#EVACANDPYP_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarcandidatopyp_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarcandidatopyp_SER110C);
          },
        },
        this._evaluarmulticonsulta_SER110C,
        () => {
          if (candpypMask_SER110C.value == "N") {
            this._evaluarrestriccion_SER110C();
          } else {
            this._evaluarfinalidad_SER110C();
          }
        }
      );
    },
    _evaluarfinalidad_SER110C() {
      setTimeout(() => {
        SER834A(
          { seleccion: this.form.finalidad_SER110C.substring(0, 2) },
          this._evaluarcandidatopyp_SER110C,
          (data) => {
            this.form.finalidad_SER110C = data.COD + " - " + data.DESCRIP;
            this._evaluarrestriccion_SER110C();
          }
        );
      }, 300);
    },
    _evaluarrestriccion_SER110C() {
      if (
        consultaMask_SER110C.value == "N" ||
        odontologiaMask_SER110C.value == "N" ||
        pypMask_SER110C.value == "N" ||
        laboratorioMask_SER110C.value == "N" ||
        rxMask_SER110C.value == "N" ||
        drogueriaMask_SER110C.value == "N" ||
        fisioterapiaMask_SER110C.value == "N" ||
        otraterapiaMask_SER110C.value == "N" ||
        cirugiaMask_SER110C.value == "N" ||
        estanciaMask_SER110C.value == "N"
      ) {
        restriccionMask_SER110C.typedValue = "S";
      }
      if (restriccionMask_SER110C.value.trim() == "") restriccionMask_SER110C.typedValue = "N";
      validarInputs(
        {
          form: "#EVARESTRIC_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarrestriccion_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarrestriccion_SER110C);
          },
        },
        () => {
          this._evaluarcandidatopyp_SER110C();
        },
        () => {
          this._evaluarrestconsulta_SER110C();
        }
      );
    },
    _evaluarrestconsulta_SER110C() {
      if (consultaMask_SER110C.value.trim() == "") consultaMask_SER110C.typedValue = "S";
      validarInputs(
        {
          form: "#EVACONSULT_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarrestconsulta_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarrestconsulta_SER110C);
          },
        },
        () => {
          this._evaluarcandidatopyp_SER110C();
        },
        () => {
          this._evaluarrestodontologo_SER110C();
        }
      );
    },
    _evaluarrestodontologo_SER110C() {
      if (odontologiaMask_SER110C.value.trim() == "") odontologiaMask_SER110C.typedValue = "S";
      validarInputs(
        {
          form: "#EVAODONT_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarrestodontologo_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarrestodontologo_SER110C);
          },
        },
        () => {
          this._evaluarrestconsulta_SER110C();
        },
        () => {
          this._evaluarrestpyp_SER110C();
        }
      );
    },
    _evaluarrestpyp_SER110C() {
      if (pypMask_SER110C.value.trim() == "") pypMask_SER110C.typedValue = "S";
      validarInputs(
        {
          form: "#EVAPYP_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarrestpyp_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarrestpyp_SER110C);
          },
        },
        () => {
          this._evaluarrestodontologo_SER110C();
        },
        () => {
          this._evaluarrestlaboratorio_SER110C();
        }
      );
    },
    _evaluarrestlaboratorio_SER110C() {
      if (laboratorioMask_SER110C.value.trim() == "") laboratorioMask_SER110C.typedValue = "S";
      validarInputs(
        {
          form: "#EVALAB_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarrestlaboratorio_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarrestlaboratorio_SER110C);
          },
        },
        () => {
          this._evaluarrestpyp_SER110C();
        },
        () => {
          this._evaluarrestrx_SER110C();
        }
      );
    },
    _evaluarrestrx_SER110C() {
      if (rxMask_SER110C.value.trim() == "") rxMask_SER110C.typedValue = "S";
      validarInputs(
        {
          form: "#EVARX_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarrestrx_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarrestrx_SER110C);
          },
        },
        () => {
          this._evaluarrestlaboratorio_SER110C();
        },
        () => {
          this._evaluarrestdrogueria_SER110C();
        }
      );
    },
    _evaluarrestdrogueria_SER110C() {
      if (drogueriaMask_SER110C.value.trim() == "") drogueriaMask_SER110C.typedValue = "S";
      validarInputs(
        {
          form: "#EVADROG_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarrestdrogueria_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarrestdrogueria_SER110C);
          },
        },
        () => {
          this._evaluarrestrx_SER110C();
        },
        () => {
          this._evaluarrestfisioterapia_SER110C();
        }
      );
    },
    _evaluarrestfisioterapia_SER110C() {
      if (fisioterapiaMask_SER110C.value.trim() == "") fisioterapiaMask_SER110C.typedValue = "S";
      validarInputs(
        {
          form: "#EVAFISIOT_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarrestfisioterapia_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarrestfisioterapia_SER110C);
          },
        },
        () => {
          this._evaluarrestdrogueria_SER110C();
        },
        () => {
          this._evaluarrestotraterapia_SER110C();
        }
      );
    },
    _evaluarrestotraterapia_SER110C() {
      if (otraterapiaMask_SER110C.value.trim() == "") otraterapiaMask_SER110C.typedValue = "S";
      validarInputs(
        {
          form: "#EVATERAP_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarrestotraterapia_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarrestotraterapia_SER110C);
          },
        },
        () => {
          this._evaluarrestfisioterapia_SER110C();
        },
        () => {
          this._evaluarrestcirugia_SER110C();
        }
      );
    },
    _evaluarrestcirugia_SER110C() {
      if (cirugiaMask_SER110C.value.trim() == "") cirugiaMask_SER110C.typedValue = "S";
      validarInputs(
        {
          form: "#EVACIRUG_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarrestcirugia_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarrestcirugia_SER110C);
          },
        },
        () => {
          this._evaluarrestotraterapia_SER110C();
        },
        () => {
          this._evaluarrestestancia_SER110C();
        }
      );
    },
    _evaluarrestestancia_SER110C() {
      if (estanciaMask_SER110C.value.trim() == "") estanciaMask_SER110C.typedValue = "S";
      validarInputs(
        {
          form: "#EVAESTANC_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarrestestancia_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarrestestancia_SER110C);
          },
        },
        () => {
          this._evaluarrestcirugia_SER110C();
        },
        () => {
          this._evaluarviolencia_SER110C();
        }
      );
    },
    _evaluarviolencia_SER110C() {
      if (vcmMask_SER110C.value.trim() == "") vcmMask_SER110C.typedValue = "N";
      validarInputs(
        {
          form: "#EVAVCM_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarviolencia_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarviolencia_SER110C);
          },
        },
        () => {
          this._evaluarrestestancia_SER110C();
        },
        () => {
          this._evaluarpagare_SER110C();
        }
      );
    },
    _evaluarpagare_SER110C() {
      if (pagareMask_SER110C.value.trim() == "") pagareMask_SER110C.typedValue = "N";
      validarInputs(
        {
          form: "#TIENEPAGARE_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarpagare_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarpagare_SER110C);
          },
        },
        () => {
          this._evaluarviolencia_SER110C();
        },
        () => {
          if (pagareMask_SER110C.value == "S") {
            this._evaluarprefijo_SER110C();
          } else {
            this.form.prefijo_SER110C = "";
            this.form.factura_SER110C = 00000;
            this.SER110C.FACTURAPAGARE = this.form.prefijo_SER110C + this.form.factura_SER110C;
            valorpagareMask_SER110C.typedValue = 0;
            this.SER110C.VALORPAGARE = 0;
            this._evaluarderecho_SER110C();
          }
        }
      );
    },
    _evaluarprefijo_SER110C() {
      validarInputs(
        {
          form: "#FACTURA_SER110C",
          orden: "1",
        },
        () => {
          this._evaluarpagare_SER110C();
        },
        () => {
          this.form.prefijo_SER110C = this.form.prefijo_SER110C.toUpperCase();
          if (
            this.form.prefijo_SER110C.trim() == "" ||
            this.form.prefijo_SER110C.trim() == "C" ||
            this.form.prefijo_SER110C.trim() == "E" ||
            this.form.prefijo_SER110C.trim() == "U" ||
            this.form.prefijo_SER110C.trim() == "Ñ"
          ) {
            CON851("", "Prefijo incorrecto", null, "error", "Error");
            this._evaluarprefijo_SER110C();
          } else {
            this._evaluarfact_SER110C();
          }
        }
      );
    },
    _evaluarfact_SER110C() {
      validarInputs(
        {
          form: "#FACTURA2_SER110C",
          orden: "1",
        },
        () => {
          this._evaluarpagare_SER110C();
        },
        () => {
          this.SER110C.FACTURAPAGARE = this.form.prefijo_SER110C + this.form.factura_SER110C.padStart(6, "0");
          this._evaluarvalorpagare_SER110C();
        }
      );
    },
    _evaluarvalorpagare_SER110C() {
      validarInputs(
        {
          form: "#VALOR_SER110C",
          orden: "1",
        },
        () => {
          this._evaluarprefijo_SER110C();
        },
        () => {
          this.SER110C.VALORPAGARE = valorpagareMask_SER110C.value;
          this._evaluarderecho_SER110C();
        }
      );
    },
    _evaluarderecho_SER110C() {
      if (this.form.novedad_SER110C.substring(0, 1) == "7") {
        this.form.basedatos_SER110C = "3 - Creado por el  usuario";
        this._evaluarobservacion_SER110C();
      } else {
        obtenerDatosCompletos({ nombreFd: "DERECHO" }, (data) => {
          var derecho = data.DERECHO;
          POPUP(
            {
              array: derecho,
              titulo: "ESTADO BASE DE DATOS",
              indices: [
                {
                  id: "COD",
                  label: "DESCRIP",
                },
              ],
              seleccion: this.form.basedatos_SER110C.substring(0, 1),
              callback_f: () => {
                ///////NIT ACACIAS////////////////
                // if ($_USUA_GLOBAL[0].NIT == 892000264) {
                // this._evaluarmulticonsulta_SER110C()
                // } else {
                this._evaluarpagare_SER110C();
                // }
              },
              teclaAlterna: true,
            },
            (derecho) => {
              this.form.basedatos_SER110C = derecho.COD + " - " + derecho.DESCRIP;
              this._evaluarobservacion_SER110C();
            }
          );
        });
      }
    },
    _evaluarobservacion_SER110C() {
      validarInputs(
        {
          form: "#OBSERVACIONES_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarobservacion_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarobservacion_SER110C);
          },
        },
        () => {
          // if ($_USUA_GLOBAL[0].NIT == 892000264) {
          // this._evaluarmulticonsulta_SER110C()
          // } else {
          this._evaluarvalorpagare_SER110C();
          // }
        },
        () => {
          this.form.observaciones_SER110C = this.form.observaciones_SER110C.toUpperCase();
          this._evaluardiscapacidad_SER110C();
        }
      );
    },
    _evaluardiscapacidad_SER110C() {
      obtenerDatosCompletos({ nombreFd: "DISCAPACIDAD" }, (data) => {
        var discapacidad = data.DISCAPACIDAD;
        POPUP(
          {
            array: discapacidad,
            titulo: "Discapacidad",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            seleccion: this.form.discapacidad_SER110C.substring(0, 1),
            callback_f: () => {
              this._evaluarobservacion_SER110C();
            },
            teclaAlterna: true,
          },
          (discapacidad) => {
            this.form.discapacidad_SER110C = discapacidad.COD + " - " + discapacidad.DESCRIP;
            if ($_USUA_GLOBAL[0].NIT == 830092718) {
              switch ($_USUA_GLOBAL[0].PREFIJ) {
                case "TU":
                  this.form.entidad_SER110C = 800209488;
                  break;
                case "SB":
                  this.form.entidad_SER110C = 800216883;
                  break;
              }
            }
            this._evaluarnitfac_SER110C();
          }
        );
      });
    },
    _evaluarnitfac_SER110C() {
      if (this.form.entidad_SER110C.trim() == "") this.form.entidad_SER110C = this.SER110C.NITENT;
      validarInputs(
        {
          form: "#ENTIDAD_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarnitfac_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarnitfac_SER110C);
          },
        },
        () => {
          this._evaluarobservacion_SER110C();
        },
        () => {
          this.form.entidad_SER110C = this.form.entidad_SER110C.padStart(10, "0");
          if (
            this.form.entidad_SER110C == 0 &&
            $_USUA_GLOBAL[0].NIT != 892000401 &&
            $_USUA_GLOBAL[0].NIT != 830092718
          ) {
            this.form.entidadd_SER110C = "";
            this._validacionesnitfact_SER110C();
          } else {
            let URL = get_url("APP/CONTAB/CON802_01.DLL");
            postData(
              {
                datosh: datosEnvio() + this.form.entidad_SER110C + "|",
              },
              URL
            )
              .then((data) => {
                this.SER110C.TERCERO = data.TERCER[0];
                this.form.entidadd_SER110C = this.SER110C.TERCERO.DESCRIP_TER;
                this._validacionesnitfact_SER110C();
              })
              .catch((error) => {
                console.error(error);
                this._evaluarnitfac_SER110C();
              });
          }
        }
      );
    },
    _validacionesnitfact_SER110C() {
      if (this.form.entidad_SER110C > 0 && this.form.entidad_SER110C != this.SER110C.NITFACTPACIW) {
        this.form.fechasistd_SER110C = moment().format("YYYYMMDD");
      }
      if ($_USUA_GLOBAL[0].NIT == 830092718) {
        this._evaluarantecendentescancer_SER110C();
      } else {
        this._evaluarembarazo_SER110C();
      }
    },
    _evaluarantecendentescancer_SER110C() {
      $("#ANTECEND_SER110C").removeClass("hidden");
      validarInputs(
        {
          form: "#ANTECEND_SER110C",
          orden: "1",
        },
        () => {
          this._evaluarnitfac_SER110C();
        },
        () => {
          this.form.antecedentes_SER110C = this.form.antecedentes_SER110C.toUpperCase();
          if (this.form.antecedentes_SER110C == "N" || this.form.antecedentes_SER110C == "S") {
            this._evaluarembarazo_SER110C();
          } else {
            CON851("03", "03", null, "error", "error");
            this._evaluarantecendentescancer_SER110C();
          }
        }
      );
    },
    _evaluarembarazo_SER110C() {
      if (this.form.sexo_SER110C == "M" || this.SER110C.UNIDADEDADW != "A" || this.SER110C.VLREDADW < 8) {
        this.form.altoriesgo_SER110C = "";
        this._validacionesembarazo_SER110C();
      } else {
        validarInputs(
          {
            form: "#ALGORIESGO_SER110C",
            orden: "1",
          },
          () => {
            this._evaluarnitfac_SER110C();
          },
          () => {
            this.form.altoriesgo_SER110C = this.form.altoriesgo_SER110C.toUpperCase();
            if (
              this.form.altoriesgo_SER110C == "S" ||
              this.form.altoriesgo_SER110C == "N" ||
              this.form.altoriesgo_SER110C.trim() == ""
            ) {
              this._validacionesembarazo_SER110C();
            } else {
              this._evaluarembarazo_SER110C();
            }
          }
        );
      }
    },
    _validacionesembarazo_SER110C() {
      if (
        this.form.altoriesgo_SER110C.trim() == "" ||
        this.form.altoriesgo_SER110C == "S" ||
        this.form.altoriesgo_SER110C == "N"
      ) {
        if (this.form.altoriesgo_SER110C == "S") {
          CON851("", "EH", null, "warning", "Advertencia");
        }
        this._evaluarmedicofami_SER110C();
      } else {
        CON851("03", "03", null, "error", "error");
        this._evaluarembarazo_SER110C();
      }
    },
    _evaluarmedicofami_SER110C() {
      validarInputs(
        {
          form: "#MEDICOFAM_SER110C",
          orden: "1",
          event_f7: () => {
            this._evaluarcambiosbasedatos_SER110C(this._evaluarmedicofami_SER110C);
          },
          event_f9: () => {
            this._datoscompletfamiliar_SER110C(this._evaluarmedicofami_SER110C);
          },
        },
        () => {
          this._evaluarnitfac_SER110C();
        },
        () => {
          this.form.medicofam_SER110C = this.form.medicofam_SER110C.replace(/^0+/, "");
          if (this.form.medicofam_SER110C.trim() == "" || this.form.medicofam_SER110C == 0) {
            this.form.medicofamd_SER110C = "";
            this._evaluaremail_SER110C();
          } else {
            const res = this.SER110C.PROFESIONALES.find((e) => e.IDENTIFICACION == this.form.medicofam_SER110C);
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              this._evaluarmedicofami_SER110C();
            } else {
              this.form.medicofamd_SER110C = res.NOMBRE;
              this._evaluaremail_SER110C();
            }
          }
        }
      );
    },
    _evaluaremail_SER110C() {
      if (this.form.novedad_SER110C.substring(0, 1) == "7") {
        this.form.opercreado_SER110C = localStorage.Usuario;
        this.form.fechacreado_SER110C = moment().format("YYYYMMDD");
        this.form.hrcreado_SER110C = moment().format("HHmm");
        this.form.modificado_SER110C = "";
        this.form.fechamodif_SER110C = "";
        this.form.hrmodif_SER110C = "";
      } else {
        this.form.modificado_SER110C = localStorage.Usuario;
        this.form.fechamodif_SER110C = moment().format("YYYYMMDD");
        this.form.hrmodif_SER110C = moment().format("HHmm");
      }
      if ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162) {
        CON851P("01", this._evaluarmedicofami_SER110C, this._validacionesgrabar_SER110C);
      } else {
        $("#CORREO_SER110C").removeClass("hidden");
        validarInputs(
          {
            form: "#CORREO_SER110C",
            orden: "1",
          },
          () => {
            this._evaluarnitfac_SER110C();
          },
          () => {
            if (this.form.correo_SER110C.trim() == "") {
              CON851P("01", this._evaluarmedicofami_SER110C, this._validacionesgrabar_SER110C);
            } else {
              var correo = this.form.correo_SER110C.indexOf("@");
              if (correo < 1) {
                CON851("2K", "2K", null, "error", "error");
                this._evaluaremail_SER110C();
              } else {
                CON851P("01", this._evaluarmedicofami_SER110C, this._validacionesgrabar_SER110C);
              }
            }
          }
        );
      }
    },
    _validacionesgrabar_SER110C() {
      let datos_envio = [
        "2",
        null,
        this.form.novedad_SER110C.substring(0, 1),
        this.form.numero_SER110C,
        this.form.identif_SER110C.substring(0, 3),
        this.form.lugar_SER110C,
        primerapellido_SER110C.value,
        segundoapellido_SER110C.value,
        primernombre_SER110C.value,
        segundonombre_SER110C.value,
        this.SER110C.FECHANACIPACIW,
        this.form.gruposang_SER110C,
        this.form.rh_SER110C,
        this.form.sexo_SER110C,
        this.form.civil_SER110C.substring(0, 1),
        this.form.estudio_SER110C.substring(0, 1),
        this.form.zona_SER110C.substring(0, 1),
        this.form.correo2_SER110C,
        this.form.padre_SER110C,
        this.form.madre_SER110C,
        this.form.ciudad_SER110C,
        this.form.pais_SER110C,
        telefono1Mask_SER110C.value,
        telefono2Mask_SER110C.value,
        this.form.direccion_SER110C,
        this.form.barrio_SER110C,
        this.form.ocupacion_SER110C,
        this.form.nivel_SER110C.substring(0, 1),
        copagoMask_SER110C.value,
        this.form.regimen_SER110C.substring(0, 1),
        this.form.colegio_SER110C,
        this.form.etnia_SER110C.substring(0, 1),
        this.form.indigena_SER110C,
        this.form.comunidades_SER110C,
        this.form.resguardos_SER110C,
        this.form.tipoafil_SER110C.substring(0, 1),
        this.form.portabilidad_SER110C,
        this.form.ciudadportab_SER110C,
        this.form.eps_SER110C,
        this.form.contrato_SER110C,
        fechaafilMask_SER110C.value,
        this.form.ficha_SER110C,
        this.form.carnet_SER110C,
        fechavenceMask_SER110C.value,
        this.form.cotizante_SER110C,
        this.form.parentezco_SER110C.substring(0, 2),
        this.form.empresalab_SER110C,
        victimaMask_SER110C.value,
        progespecialMask_SER110C.value,
        altocostoMask_SER110C.value,
        this.SER110C.RESULTADOCOVIDPACIW,
        cronicoMask_SER110C.value,
        this.form.patologiacronica_SER110C,
        tutelaMask_SER110C.value,
        this.form.clasif_SER110C,
        policonsultaMask_SER110C.value,
        this.SER110C.IDACOMPW,
        this.SER110C.TIPOACOMPW,
        this.SER110C.NOMB1ACOMPW,
        this.SER110C.NOMB2ACOMPW,
        this.SER110C.APEL1ACOMPW,
        this.SER110C.APEL2ACOMPW,
        this.SER110C.TELACOMPW,
        this.SER110C.FECHAMAMOGRAFIA,
        candpypMask_SER110C.value,
        this.form.finalidad_SER110C.substring(0, 2),
        restriccionMask_SER110C.value,
        consultaMask_SER110C.value,
        odontologiaMask_SER110C.value,
        pypMask_SER110C.value,
        laboratorioMask_SER110C.value,
        rxMask_SER110C.value,
        drogueriaMask_SER110C.value,
        fisioterapiaMask_SER110C.value,
        otraterapiaMask_SER110C.value,
        cirugiaMask_SER110C.value,
        estanciaMask_SER110C.value,
        vcmMask_SER110C.value,
        pagareMask_SER110C.value,
        this.SER110C.FACTURAPAGARE,
        this.SER110C.VALORPAGARE,
        this.form.basedatos_SER110C.substring(0, 1),
        this.form.observaciones_SER110C,
        this.form.discapacidad_SER110C.substring(0, 1),
        this.form.entidad_SER110C,
        this.form.fechasistd_SER110C,
        this.form.antecedentes_SER110C,
        this.form.altoriesgo_SER110C,
        this.form.medicofam_SER110C,
        this.form.correo_SER110C,
        this.form.opercreado_SER110C,
        this.form.fechacreado_SER110C,
        this.form.hrcreado_SER110C,
        this.form.modificado_SER110C,
        this.form.fechamodif_SER110C,
        this.form.hrmodif_SER110C,
      ];
      if (this.form.novedad_SER110C.substring(0, 1) == "7") {
        postData({ datosh: `${datosEnvio()}${datos_envio.join("|")}` }, get_url("APP/SALUD/SER110CV2.DLL"))
          .then((data) => {
            console.log(data, "GRABAR");
            this.SER110C.LLAVEAUDW = this.form.numero_SER110C;
            if (pagareMask_SER110C.value == "S") {
              this._grabarpagare_SER110C();
            } else {
              this._grabarauditoria_SER110C();
            }
          })
          .catch((err) => {
            console.error(err);
            this._evaluarnitfac_SER110C();
          });
      } else {
        this._grabarauditoria_SER110C(datos_envio);
      }
    },
    _grabarpagare_SER110C() {
      postData(
        { datosh: `${datosEnvio()}2|${this.form.numero_SER110C}|${localStorage.Usuario}` },
        get_url("APP/SALUD/SER810A.DLL")
      )
        .then((data) => {
          console.log(data);
          if (this.form.novedad_SER110C.substring(0, 1) == "7") {
            this._grabarauditoria_SER110C();
          } else {
            this._grabarcorresponsalia_SER110C();
          }
        })
        .catch((err) => {
          console.error(err);
          this._evaluarnitfac_SER110C();
        });
    },
    _grabarauditoria_SER110C(datos_envio) {
      grabar_auditoria_SALUD(
        {
          TIPO: "IS767",
          NOVED: this.form.novedad_SER110C.substring(0, 1),
          LLAVE: this.SER110C.LLAVEAUDW,
          ARCH: "PACIENTES      ",
        },
        () => {
          loader("hide");
          $_this = this;
          switch (this.form.novedad_SER110C.substring(0, 1)) {
            case "7":
              toastr.success("Se ha guardado paciente", "EXITOSAMENTE");
              $_this._grabarcorresponsalia_SER110C();
              break;
            case "8":
              console.log("NOVEDAD 8");
              $_this._grabarcambio_SER110C(datos_envio);
              break;
            default:
              CON851P("02", $_this._evaluarnumero_SER110C, $_this._eliminarregistro_SER110C);
              break;
          }
        }
      );
    },
    _grabarcambio_SER110C(datos_envio) {
      console.log("cambio ", datos_envio);
      postData({ datosh: `${datosEnvio()}${datos_envio.join("|")}` }, get_url("APP/SALUD/SER110CV2.DLL"))
        .then((data) => {
          toastr.success("Se ha guardado cambio", "EXITOSAMENTE");
          if (pagareMask_SER110C.value == "S") {
            this._grabarpagare_SER110C();
          } else {
            this._grabarcorresponsalia_SER110C();
          }
        })
        .catch((err) => {
          console.error(err);
          this._evaluarnitfac_SER110C();
        });
    },
    _eliminarregistro_SER110C() {
      postData(
        { datosh: `${datosEnvio()}2||${this.form.novedad_SER110C.substring(0, 1)}|${this.form.numero_SER110C}` },
        get_url("APP/SALUD/SER110CV2.DLL")
      )
        .then((data) => {
          CON851("", "Paciente Eliminado", null, "error", "error");
          this._grabarcorresponsalia_SER110C();
        })
        .catch((err) => {
          console.error(err);
          this._evaluarnitfac_SER110C();
        });
    },
    _grabarcorresponsalia_SER110C() {
      let URL = get_url("APP/CONTAB/CON904.DLL");
      postData({ datosh: `${datosEnvio()}${localStorage.Usuario}|IS767C|` }, URL)
        .then((data) => {
          if (this.form.novedad_SER110C.substring(0, 1) == "7" || this.form.novedad_SER110C.substring(0, 1) == "8") {
            if (this.SER110C.ACTUALIZAPACIX == "1") {
              CON851P("24", this._deseatrasladardoc_SER110C, this._ventanacorresponsalia_SER110C);
            } else {
              CON851P("24", this._saliropcion_SER110C, this._ventanacorresponsalia_SER110C);
            }
          } else {
            CON851P("24", this._saliropcion_SER110C, this._ventanacorresponsalia_SER110C);
          }
        })
        .catch((err) => {
          // CON851(swinvalid, swinvalid, null, 'error', 'error')
          this._validarSalida_ser110c();
        });
    },
    _ventanacorresponsalia_SER110C() {
      let { ipcRenderer } = require("electron");
      ipcRenderer.send(
        "another",
        (datos = { directorio: "SALUD/paginas/SER110CCR.html", cedula: this.form.numero_SER110C.padStart(15, "0") })
      );
      vector = ["on", "Actualizando corresponsalia de pacientes..."];
      _EventocrearSegventana(vector, this._saliropcion_SER110C);
    },
    _deseatrasladardoc_SER110C() {
      postData({ datosh: `${datosEnvio()}${localStorage.Usuario}|IS762|` }, get_url("APP/CONTAB/CON904S.DLL"))
        .then((data) => {
          if (this.SER110C.ACTUALIZAPACIX == "1") {
            CON851P("25", this._saliropcion_SER110C, this._buscartrasladodoc_SER110C);
          } else {
            _validarSalida_ser110c();
          }
        })
        .catch((error) => {
          this._validarSalida_ser110c();
        });
    },
    _buscartrasladodoc_SER110C() {
      let { ipcRenderer } = require("electron");
      ipcRenderer.send("another", (datos = { directorio: "SALUD/paginas/SER7621.html" }));
      vector = ["on", "Unifica movimiento de pacientes..."];
      _EventocrearSegventana(vector, this._saliropcion_SER110C);
    },
    _saliropcion_SER110C() {
      loader("hide");
      _inputControl("reset");
      _inputControl("disabled");
      this._validarSalida_ser110c();
    },
    _validarSalida_ser110c() {
      let modulo = localStorage.Modulo;
      if (modulo == "HIC") _regresar_menuhis();
      else _toggleNav();
    },
    _ventanahuellada_SER110C() {
      console.log("HUELLA DACTILAR");
    },
    ///////////////////////////F7 Y F8 VENTANAS DE CONSULTA/////////////////////////////////////
    _evaluarcambiosbasedatos_SER110C(callback) {
      let FECHASISTEMA = moment().format("YYMMDD");
      var SER810K = [];
      let URL = get_url("APP/SALUD/SER810K.DLL");
      postData(
        {
          datosh:
            datosEnvio() +
            this.form.numero_SER110C +
            "|" +
            FECHASISTEMA.substring(0, 2) +
            "|" +
            FECHASISTEMA.substring(2, 4) +
            "|",
        },
        URL
      )
        .then((data) => {
          SER810K = data.BASEDATOS;
          SER810K.pop();
          _ventanaDatos({
            titulo: "VENTANA DE CAMBIOS",
            columnas: ["FECHA", "HORA", "OPER", "CAMPO", "ANTERIOR", "ACTUAL"],
            data: SER810K,
            callback_esc: () => {
              callback();
            },
            callback: (data) => {
              callback();
            },
          });
        })
        .catch((error) => {
          console.log(error);
          esccallback();
        });
    },
    _datoscompletfamiliar_SER110C(callback) {
      var $_FAMILIAR = [];
      let URL = get_url("APP/SALUD/SER810F.DLL");
      postData(
        {
          datosh: datosEnvio() + this.form.numero_SER110C + "|" + localStorage.Usuario + "|",
        },
        URL
      )
        .then((data) => {
          $_FAMILIAR = data.FAMILIAR;
          $_FAMILIAR.pop();
          _ventanaDatos({
            titulo: "VENTANA COTIZANTE ",
            columnas: ["PACIENTE", "CEDULA", "EPS", "NACIM", "PARENT", "ESTADO"],
            data: $_FAMILIAR,
            ancho: "85%",
            callback_esc: () => {
              callback();
            },
            callback: (data) => {
              callback();
            },
          });
        })
        .catch((error) => {
          console.log(error);
          callback();
        });
    },
    _ventanapacientedoc_SER110C() {
      setTimeout(() => {
        _consultabase09_SALUD(this._validarregbase09_SER110C, this._evaluarnumero_SER110C);
      }, 300);
    },
    _validarregbase09_SER110C(data) {
      console.log("ARRAY PACIENTE");
      this.form.numero_SER110C = data.CODBASE09;
      this.form.novedad_SER110C = "8- Cambio";
      this._validarpaciente_SER110C();
    },

    ///////////LLENADO DE LA OPCION////////////////////////////////////////////////////////////////////
    _llenardatos_SER110C() {
      let estadocivil = { S: "SOLTERO", C: "CASADA", U: "UNION LIBRE", V: "VIUDO", D: "SEPARADO" };
      let nivelestudio = {
        1: "NINGUNO",
        2: "PRE-ESCOL",
        3: "PRIMARIA",
        4: "SECUNDARIA",
        5: "BACH.BASI",
        6: "BACH.TECN",
        7: "NORMALIST",
        8: "TECN.PROFE",
        9: "TECNOLOGI",
        A: "PROFESION",
        B: "ESPECIALI",
        C: "MAESTRIA",
        D: "DOCTORADO",
      };
      let nivel = { 0: "NIVEL 0", 1: "NIVEL 1", 2: "NIVEL 2", 3: "NIVEL 3", 4: "NIVEL 4", 5: "NIVEL 5", 6: "NIVEL 6" };
      let regimen = {
        C: "CONTRIBUTIVO",
        S: "SUBSIDIADO",
        V: "VINCULADO",
        P: "PARTICULAR",
        O: "OTRO TIPO",
        D: "DESPLAZ CONT",
        E: "DESPLAZ SUBS",
        G: "DESPLAZ VINC",
      };
      let afiliado = {
        1: "COTIZANTE",
        2: "BENEFICIARIO",
        3: "COT. PENSIONADO",
        4: "UPC ADICIONAL",
        5: "CABEZA FAMILIA",
        6: "GRUPO FAMILIAR",
        0: "SIN DETERMINAR",
      };
      let derecho = {
        1: "En base de datos, ACTIVO",
        2: "En base de datos, INACTIVO",
        3: "Creado por el  usuario",
        4: "Pendiente por determinar",
        5: "En base de datos, SIN CARNET",
        6: "SUSPENDIDO, requiere autoriz",
        7: "Afiliado Fallecido",
        8: "Retiro X Multiafiliado",
        9: "Ingreso X Traslado",
        A: "Retiro  X Traslado",
        B: "Periodo integral",
      };
      let discapacidad = {
        1: "SIN DISCAPACI",
        2: "DISC.FISICA",
        3: "DISC.AUDITIVA",
        4: "DISC.VISUAL",
        5: "DISC.MENTAL",
        6: "DISC.COGNITIV",
      };
      let parentezco = {
        "01": "CONYUGUE",
        "02": "HIJO",
        "03": "PADRES",
        "04": "2 GRADO",
        "05": "3 GRADO",
        "06": "< 12",
        "07": "SUEGRO",
        "08": "OTR-BE",
        "00": "COTIZANTE",
      };
      let etnia = { 1: "INGENA", 2: "RAIZAL", 3: "GITANO", 4: "AFROCO", 5: "ROM", 6: "MESTIZO", 9: "NO APLICA" };
      let zona = { R: "RURAL", U: "URBANO" };
      if (estadocivil[this.SER110C.PACIENTES[0]["EST-CIV"].trim()] == undefined) {
        this.form.civil_SER110C = "";
      } else {
        this.form.civil_SER110C =
          this.SER110C.PACIENTES[0]["EST-CIV"].trim() +
          " - " +
          estadocivil[this.SER110C.PACIENTES[0]["EST-CIV"].trim()];
      }
      if (nivelestudio[this.SER110C.PACIENTES[0]["NIV-ESTUD"].trim()] == undefined) {
        this.form.estudio_SER110C = "";
      } else {
        this.form.estudio_SER110C =
          this.SER110C.PACIENTES[0]["NIV-ESTUD"].trim() +
          " - " +
          nivelestudio[this.SER110C.PACIENTES[0]["NIV-ESTUD"].trim()];
      }
      if (nivel[this.SER110C.PACIENTES[0].ESTRATO.trim()] == undefined) {
        this.form.nivel_SER110C = "";
      } else {
        this.form.nivel_SER110C =
          this.SER110C.PACIENTES[0].ESTRATO.trim() + " - " + nivel[this.SER110C.PACIENTES[0].ESTRATO.trim()];
      }
      if (regimen[this.SER110C.PACIENTES[0].TIPO.trim()] == undefined) {
        this.form.regimen_SER110C = "";
      } else {
        this.form.regimen_SER110C =
          this.SER110C.PACIENTES[0].TIPO.trim() + " - " + regimen[this.SER110C.PACIENTES[0].TIPO.trim()];
      }
      if (afiliado[this.SER110C.PACIENTES[0]["TIPO-AFIL"].trim()] == undefined) {
        this.form.tipoafil_SER110C = "";
      } else {
        this.form.tipoafil_SER110C =
          this.SER110C.PACIENTES[0]["TIPO-AFIL"].trim() +
          " - " +
          afiliado[this.SER110C.PACIENTES[0]["TIPO-AFIL"].trim()];
      }
      if (derecho[this.SER110C.PACIENTES[0].DERECHO.trim()] == undefined) {
        this.form.basedatos_SER110C = "";
      } else {
        this.form.basedatos_SER110C =
          this.SER110C.PACIENTES[0].DERECHO.trim() + " - " + derecho[this.SER110C.PACIENTES[0].DERECHO];
      }
      if (discapacidad[this.SER110C.PACIENTES[0].DISCAP.trim()] == undefined) {
        this.form.discapacidad_SER110C = "";
      } else {
        this.form.discapacidad_SER110C =
          this.SER110C.PACIENTES[0].DISCAP.trim() + " - " + discapacidad[this.SER110C.PACIENTES[0].DISCAP.trim()];
      }
      if (parentezco[this.SER110C.PACIENTES[0]["PARENT"].trim()] == undefined) {
        this.form.parentezco_SER110C = "";
      } else {
        this.form.parentezco_SER110C =
          this.SER110C.PACIENTES[0]["PARENT"].trim() + " - " + parentezco[this.SER110C.PACIENTES[0]["PARENT"].trim()];
      }
      if (etnia[this.SER110C.PACIENTES[0].ETNIA.trim()] == undefined) {
        this.form.etnia_SER110C = "";
      } else {
        this.form.etnia_SER110C =
          this.SER110C.PACIENTES[0].ETNIA.trim() + " - " + etnia[this.SER110C.PACIENTES[0].ETNIA.trim()];
      }
      if (zona[this.SER110C.PACIENTES[0].ZONA.trim()] == undefined) {
        this.form.zona_SER110C = "";
      } else {
        this.form.zona_SER110C =
          this.SER110C.PACIENTES[0].ZONA.trim() + " - " + zona[this.SER110C.PACIENTES[0].ZONA.trim()];
      }
      bloqueohcMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["BLOQUEO-HC"].trim();
      this.form.identif_SER110C = this.SER110C.PACIENTES[0]["TIPO-ID"];

      this.form.lugar_SER110C = this.SER110C.PACIENTES[0]["LUGAR-ID"].trim();
      primerapellido_SER110C.value = this.SER110C.PACIENTES[0]["APELL-PACI1"].trim();
      segundoapellido_SER110C.value = this.SER110C.PACIENTES[0]["APELL-PACI2"].trim();
      primernombre_SER110C.value = this.SER110C.PACIENTES[0]["NOM-PACI1"].trim();
      segundonombre_SER110C.value = this.SER110C.PACIENTES[0]["NOM-PACI2"].trim();
      this.SER110C.FECHANACCAMB = this.SER110C.PACIENTES[0].NACIM;
      this.form.anonac_SER110C = this.SER110C.PACIENTES[0].NACIM.substring(0, 4);
      this.form.mesnac_SER110C = this.SER110C.PACIENTES[0].NACIM.substring(4, 6);
      this.form.dianac_SER110C = this.SER110C.PACIENTES[0].NACIM.substring(6, 8);
      var edad = calcular_edad(this.SER110C.PACIENTES[0].NACIM);
      this.form.edad_SER110C = edad.unid_edad + edad.vlr_edad.toString().padStart("0");
      this.SER110C.UNIDADEDADW = edad.unid_edad;
      this.SER110C.VLREDADW = edad.vlr_edad.toString().padStart("0");
      if ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162) {
        $("#EMAIL2_SER110C").removeClass("hidden");
      } else {
        if (
          this.SER110C.UNIDADEDADW == "D" ||
          this.SER110C.UNIDADEDADW == "M" ||
          (this.SER110C.UNIDADEDADW == "A" && this.SER110C.VLREDADW < 18)
        ) {
          $("#PADRE_SER110C").removeClass("hidden");
          $("#MADRE_SER110C").removeClass("hidden");
        } else {
          $("#PADRE_SER110C").addClass("hidden");
          $("#MADRE_SER110C").addClass("hidden");
        }
      }
      this.form.gruposang_SER110C = this.SER110C.PACIENTES[0]["GRP-SANG"].trim();
      this.form.rh_SER110C = this.SER110C.PACIENTES[0].RH.trim();
      this.form.sexo_SER110C = this.SER110C.PACIENTES[0].SEXO.trim();
      this.form.correo2_SER110C = this.SER110C.PACIENTES[0]["E-MAIL"].trim();
      this.form.padre_SER110C = this.SER110C.PACIENTES[0].PADRE.trim();
      this.form.madre_SER110C = this.SER110C.PACIENTES[0].MADRE.trim();
      this.form.ciudad_SER110C = this.SER110C.PACIENTES[0].CIUDAD.trim();
      this.form.ciudadd_SER110C = this.SER110C.PACIENTES[0]["DESCRIP-CIUDAD"].trim();
      telefono1Mask_SER110C.typedValue = this.SER110C.PACIENTES[0].TELEFONO.trim();
      telefono2Mask_SER110C.typedValue = this.SER110C.PACIENTES[0].CEL.trim();
      this.form.pais_SER110C = this.SER110C.PACIENTES[0]["PAIS-ORIG"].trim();
      this.form.barrio_SER110C = this.SER110C.PACIENTES[0]["COD-BARRIO"].trim();
      this.form.descripbarrio_SER110C = this.SER110C.PACIENTES[0]["DESCRIP-BARRIO"].trim();
      copagoMask_SER110C.typedValue = this.SER110C.PACIENTES[0].COPAGO.trim();
      this.form.direccion_SER110C = this.SER110C.PACIENTES[0].DIRECC.trim();
      this.form.ocupacion_SER110C = this.SER110C.PACIENTES[0]["OCUP-V8"].trim();
      this.form.ocupaciond_SER110C = this.SER110C.PACIENTES[0]["NOMBRE-OCUP"].trim();
      this.form.colegio_SER110C = this.SER110C.PACIENTES[0].INSTITUTO.trim();
      this.form.colegiod_SER110C = this.SER110C.PACIENTES[0]["DESCRIP-INST"].trim();
      this.form.comunidades_SER110C = this.SER110C.PACIENTES[0]["NOM-COMUNIDAD"].trim();
      this.form.indigena_SER110C = this.SER110C.PACIENTES[0]["ETNIA-IND"].trim();
      this.form.resguardos_SER110C = this.SER110C.PACIENTES[0]["NOM-RESGUARDO"].trim();
      this.form.portabilidad_SER110C = this.SER110C.PACIENTES[0].PORTABILIDAD.trim();
      this.form.ciudadportab_SER110C = this.SER110C.PACIENTES[0]["CIUDAD-ASEG"].trim();
      this.form.eps_SER110C = this.SER110C.PACIENTES[0].EPS.trim();
      this.form.epsd_SER110C = this.SER110C.PACIENTES[0]["NOMBRE-EPS"].trim();
      this.form.contrato_SER110C = this.SER110C.PACIENTES[0].CONTRATO.trim();
      fechaafilMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["FECHA-AFIL"].trim();
      this.form.ficha_SER110C = this.SER110C.PACIENTES[0].FICHA.trim();
      this.form.carnet_SER110C = this.SER110C.PACIENTES[0]["NRO-AFIL"].trim();
      fechavenceMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["FECHA-VENCE"].trim();
      this.form.fechademan_SER110C = this.SER110C.PACIENTES[0]["FECHA-DEMAN-INDU"].trim();
      this.form.demandaindu_SER110C = this.SER110C.PACIENTES[0]["DEMAN-INDU"].trim();
      this.form.cotizante_SER110C = this.SER110C.PACIENTES[0]["ID-COTIZ"].trim();
      this.form.cotizanted_SER110C = this.SER110C.PACIENTES[0]["NOMBRE-COTIZ"].trim();
      this.form.empresalab_SER110C = this.SER110C.PACIENTES[0].EMPRESA.trim();
      this.form.fechamatr_SER110C = this.SER110C.PACIENTES[0]["CERT-ESTUD"].trim();
      this.form.matr_SER110C = this.SER110C.PACIENTES[0]["PERI-ESTUD"].trim();
      this.form.fechaecono_SER110C = this.SER110C.PACIENTES[0]["CERT-ECONO"].trim();
      this.form.econo_SER110C = this.SER110C.PACIENTES[0]["PERI-ECO"].trim();
      this.form.finalidad_SER110C = this.SER110C.PACIENTES[0]["FINALID-PYP"].trim();
      candpypMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["CANDID-PYP"].trim();
      victimaMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["VICTI-CONFLICTO"].trim();
      progespecialMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["PROG-ESP"].trim();
      altocostoMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["ALT-COS"].trim();
      cronicoMask_SER110C.typedValue = this.SER110C.PACIENTES[0].CRONICO.trim();
      this.form.patologiacronica_SER110C = this.SER110C.PACIENTES[0]["PATOL-CRONIC"].trim();
      tutelaMask_SER110C.typedValue = this.SER110C.PACIENTES[0].TUTELA.trim();
      this.form.clasif_SER110C = this.SER110C.PACIENTES[0].CLASIF.trim();
      this.form.mamografia_SER110C = this.SER110C.PACIENTES[0]["ULT-MAMO"].trim();
      policonsultaMask_SER110C.typedValue = this.SER110C.PACIENTES[0].MULTICONSUL.trim();
      restriccionMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["REST-APLI"].trim();
      consultaMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["REST-CONS"].trim();
      odontologiaMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["REST-ODON"].trim();
      pypMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["REST-PYP"].trim();
      laboratorioMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["REST-LABO"].trim();
      rxMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["REST-IMAG"].trim();
      drogueriaMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["REST-DROG"].trim();
      fisioterapiaMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["REST-TERF"].trim();
      otraterapiaMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["REST-TERO"].trim();
      cirugiaMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["REST-CIRU"].trim();
      estanciaMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["REST-ESTA"].trim();
      vcmMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["VICT-ABUSO-SEX"].trim();
      this.form.prefijo_SER110C = this.SER110C.PACIENTES[0]["FACT-PAGARE"].substring(0, 1);
      this.form.factura_SER110C = this.SER110C.PACIENTES[0]["FACT-PAGARE"].substring(1, 7);
      valorpagareMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["VALOR-PAGARE"].trim();
      this.form.observaciones_SER110C = this.SER110C.PACIENTES[0].OBSERV.trim();
      this.form.entidad_SER110C = this.SER110C.PACIENTES[0]["NIT-FACT"].trim();
      this.form.entidadd_SER110C = this.SER110C.PACIENTES[0]["DESCRIP-NIT-FACT"].trim();
      this.form.fechasistd_SER110C = this.SER110C.PACIENTES[0]["FECHA-NIT"].trim();
      this.form.medicofam_SER110C = this.SER110C.PACIENTES[0]["MED-FAMI"].trim();
      this.form.medicofamd_SER110C = this.SER110C.PACIENTES[0]["NOMBRE-MED-FAMI"].trim();
      this.form.altoriesgo_SER110C = this.SER110C.PACIENTES[0]["EMB-ALTO-RIESG"].trim();
      this.form.opercreado_SER110C = this.SER110C.PACIENTES[0]["OPER-CREA"].trim();
      this.form.fechacreado_SER110C = this.SER110C.PACIENTES[0]["FECHA-CREA"].trim();
      this.form.hrcreado_SER110C = this.SER110C.PACIENTES[0]["HORA-CREA"].trim();
      this.form.modificado_SER110C = this.SER110C.PACIENTES[0]["OPER-CORR"].trim();
      this.form.fechamodif_SER110C = this.SER110C.PACIENTES[0]["FECHA-CORR"].trim();
      this.form.hrmodif_SER110C = this.SER110C.PACIENTES[0]["HORA-CORR"].trim();
      this.form.correo2_SER110C = this.SER110C.PACIENTES[0]["E-MAIL"].trim();
      this.form.correo_SER110C = this.SER110C.PACIENTES[0]["E-MAIL"].trim();
      this.SER110C.PRIAPEL1PACIW = this.SER110C.PACIENTES[0]["APELL-PACI1"].trim().substring(0, 1);
      this.SER110C.PRIAPEL2PACIW = this.SER110C.PACIENTES[0]["APELL-PACI1"].trim().substring(1, 14);
      this.SER110C.PRINOMB1PACIW = this.SER110C.PACIENTES[0]["NOM-PACI1"].trim().substring(0, 1);
      this.SER110C.PRINOMB2PACIW = this.SER110C.PACIENTES[0]["NOM-PACI1"].trim().substring(1, 12);
      this.SER110C.FECHANACIPACIW = this.form.anonac_SER110C + this.form.mesnac_SER110C + this.form.dianac_SER110C;
      this.SER110C.NITFACTPACIW = this.SER110C.PACIENTES[0]["NIT-FACT"].trim();
      this.SER110C.ANTCANCERPACIW = this.SER110C.PACIENTES[0]["ANTECED-CANCER"].trim();
      this.SER110C.DESCRIPPACIW = this.SER110C.PACIENTES[0].DESCRIP.trim();
      this.SER110C.EMAIL2W = this.SER110C.PACIENTES[0]["E-MAIL"].trim();
      this.SER110C.TIPOACOMPW = this.SER110C.PACIENTES[0]["TIPO-ID-ACOMP"].trim();
      this.SER110C.IDACOMPW = this.SER110C.PACIENTES[0]["ID-ACOMP"].trim();
      this.SER110C.NOMB1ACOMPW = this.SER110C.PACIENTES[0].NOMB1_ACOMP.trim();
      this.SER110C.NOMB2ACOMPW = this.SER110C.PACIENTES[0].NOMB2_ACOMP.trim();
      this.SER110C.APEL1ACOMPW = this.SER110C.PACIENTES[0].APEL1_ACOMP.trim();
      this.SER110C.APEL2ACOMPW = this.SER110C.PACIENTES[0].APEL2_ACOMP.trim();
      this.SER110C.TELACOMPW = this.SER110C.PACIENTES[0]["TEL-ACOM"].trim();
      pagareMask_SER110C.typedValue = this.SER110C.PACIENTES[0].PAGARE.trim();
      this.SER110C.FACTURAPAGARE = this.SER110C.PACIENTES[0]["FACT-PAGARE"].trim();
      this.SER110C.VALORPAGARE = this.SER110C.PACIENTES[0]["VALOR-PAGARE"].trim();
      this.SER110C.FECHANOTAPACIW = this.SER110C.PACIENTES[0]["FECHA-NOTA"].trim();
      this.SER110C.OBSERVNOTAPACIW = this.SER110C.PACIENTES[0]["OBSERV-NOTA"].trim();
      this.SER110C.OPEROBSERNOTAPACIW = this.SER110C.PACIENTES[0]["OPER-OBSE-NOTA"];
      this.SER110C.FACTNOTAPACIW = this.SER110C.PACIENTES[0]["FACT-NOTA"];
      this.SER110C.RESULTADOCOVIDPACIW = this.SER110C.PACIENTES[0].RESULT_COVID.trim();
      this.SER110C.EPAPACIW = this.SER110C.PACIENTES[0].EPS.trim();
      this.SER110C.FECHAMAMOGRAFIA = this.SER110C.PACIENTES[0]["ULT-MAMO"].trim();
      this.SER110C.LLAVEAUDW = this.form.numero_SER110C;

      // this.form.paisd_SER110C=
      // this.form.codant_SER110C = aun no muestro esa variable
      // this.form.clasifd_SER110C=
      if (
        this.form.madre_SER110C.trim() == "" &&
        (this.SER110C.UNIDADEDADW == "D" || this.SER110C.UNIDADEDADW == "M" || this.SER110C.VLREDADW < 18)
      ) {
        CON851("EK", "EK", null, "error", "error");
      }
    },
    ///////////////////////////////INITILIZARVARIABLES//////////////////////////
    _inicializarvariables_SER110C() {
      bloqueohcMask_SER110C.typedValue = "";
      primerapellido_SER110C.value = "";
      segundoapellido_SER110C.value = "";
      primernombre_SER110C.value = "";
      segundonombre_SER110C.value = "";
      victimaMask_SER110C.typedValue = "";
      progespecialMask_SER110C.typedValue = "";
      altocostoMask_SER110C.typedValue = "";
      cronicoMask_SER110C.typedValue = "";
      tutelaMask_SER110C.typedValue = "";
      policonsultaMask_SER110C.typedValue = "";
      restriccionMask_SER110C.typedValue = "";
      consultaMask_SER110C.typedValue = "";
      odontologiaMask_SER110C.typedValue = "";
      pypMask_SER110C.typedValue = "";
      laboratorioMask_SER110C.typedValue = "";
      rxMask_SER110C.typedValue = "";
      drogueriaMask_SER110C.typedValue = "";
      fisioterapiaMask_SER110C.typedValue = "";
      otraterapiaMask_SER110C.typedValue = "";
      cirugiaMask_SER110C.typedValue = "";
      estanciaMask_SER110C.typedValue = "";
      vcmMask_SER110C.typedValue = "";
      telefono1Mask_SER110C.typedValue = "";
      telefono2Mask_SER110C.typedValue = "";
      copagoMask_SER110C.typedValue = "";
      fechaafilMask_SER110C.typedValue = "";
      fechavenceMask_SER110C.typedValue = "";
      this.form.identif_SER110C = "";
      this.form.lugar_SER110C = "";
      this.form.anonac_SER110C = "";
      this.form.mesnac_SER110C = "";
      this.form.dianac_SER110C = "";
      this.form.edad_SER110C = "";
      this.form.gruposang_SER110C = "";
      this.form.rh_SER110C = "";
      this.form.sexo_SER110C = "";
      this.form.civil_SER110C = "";
      this.form.estudio_SER110C = "";
      this.form.zona_SER110C = "";
      this.form.correo2_SER110C = "";
      this.form.padre_SER110C = "";
      this.form.madre_SER110C = "";
      this.form.ciudad_SER110C = "";
      this.form.ciudadd_SER110C = "";
      this.form.pais_SER110C = "";
      this.form.paisd_SER110C = "";
      this.form.barrio_SER110C = "";
      this.form.descripbarrio_SER110C = "";
      this.form.nivel_SER110C = "";
      this.form.direccion_SER110C = "";
      this.form.ocupacion_SER110C = "";
      this.form.ocupaciond_SER110C = "";
      this.form.regimen_SER110C = "";
      this.form.colegio_SER110C = "";
      this.form.colegiod_SER110C = "";
      this.form.etnia_SER110C = "";
      this.form.comunidades_SER110C = "";
      this.form.indigena_SER110C = "";
      this.form.resguardos_SER110C = "";
      this.form.tipoafil_SER110C = "";
      this.form.portabilidad_SER110C = "";
      this.form.ciudadportab_SER110C = "";
      this.form.eps_SER110C = "";
      this.form.epsd_SER110C = "";
      this.form.contrato_SER110C = "";
      this.form.ficha_SER110C = "";
      this.form.carnet_SER110C = "";
      this.form.fechademan_SER110C = "";
      this.form.demandaindu_SER110C = "";
      this.form.codant_SER110C = "";
      this.form.cotizante_SER110C = "";
      this.form.cotizanted_SER110C = "";
      this.form.parentezco_SER110C = "";
      this.form.empresalab_SER110C = "";
      this.form.fechamatr_SER110C = "";
      this.form.matr_SER110C = "";
      this.form.fechaecono_SER110C = "";
      this.form.econo_SER110C = "";
      this.form.patologiacronica_SER110C = "";
      this.form.clasif_SER110C = "";
      this.form.clasifd_SER110C = "";
      this.form.mamografia_SER110C = "";
      this.form.basedatos_SER110C = "";
      this.form.observaciones_SER110C = "";
      this.form.discapacidad_SER110C = "";
      this.form.entidad_SER110C = "";
      this.form.entidadd_SER110C = "";
      this.form.fechasistd_SER110C = "";
      this.form.medicofam_SER110C = "";
      this.form.medicofamd_SER110C = "";
      this.form.altoriesgo_SER110C = "";
      this.form.opercreado_SER110C = "";
      this.form.fechacreado_SER110C = "";
      this.form.hrcreado_SER110C = "";
      this.form.modificado_SER110C = "";
      this.form.fechamodif_SER110C = "";
      this.form.hrmodif_SER110C = "";
    },
    _f8identificacion_SER110C() {
      $_this = this;
      parametros = {
        dll: "PACIENTES",
        valoresselect: ["Nombre del paciente"],
        f8data: "PACIENTES",
        columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "EPS" }],
        callback: (data) => {
          $_this.form.numero_SER110C = data.COD;
          _enterInput(".identificacion_SER110C");
        },
        cancel: () => {
          _enterInput(".identificacion_SER110C");
        },
      };
      F8LITE(parametros);
    },
    _f8lugar_SER110C() {
      $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE CONSULTA DE CIUDADES",
        columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
        data: $_this.SER110C.CIUDAD,
        callback_esc: function () {
          $(".lugar_SER110C").focus();
        },
        callback: function (data) {
          $_this.form.lugar_SER110C = data.COD.trim();
          _enterInput(".lugar_SER110C");
        },
      });
    },
    _f8ciudad_SER110C() {
      $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE CONSULTA DE CIUDADES",
        columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
        data: $_this.SER110C.CIUDAD,
        callback_esc: function () {
          $(".ciudad_SER110C").focus();
        },
        callback: function (data) {
          $_this.form.ciudad_SER110C = data.COD.trim();
          _enterInput(".ciudad_SER110C");
        },
      });
    },
    _f8pais_SER110C() {
      $_this = this;
      _ventanaDatos({
        titulo: "VENTANA PAIS RIPS",
        columnas: ["CODIGO", "DESCRIP"],
        data: $_this.SER110C.PAISES,
        callback_esc: function () {
          $(".pais_SER110C").focus();
        },
        callback: function (data) {
          $_this.form.pais_SER110C = data.CODIGO;
          _enterInput(".pais_SER110C");
        },
      });
    },
    _f8barrios_SER110C() {
      $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE BARRIOS Y VEREDAS",
        columnas: ["LLAVE", "NOMBRE", "COMUNA", "ZONA"],
        data: $_this.SER110C.BARRIOS,
        callback_esc: function () {
          $(".barrio_SER110C").focus();
        },
        callback: function (data) {
          $_this.form.barrio_SER110C = data.LLAVE.trim();
          _enterInput(".barrio_SER110C");
        },
      });
    },
    _f8ocupacion_SER110C() {
      $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE OCUPACIONES",
        columnas: ["CODOCU", "NOMBREOCU"],
        data: $_this.SER110C.OCUPACIONES,
        ancho: "90%",
        callback_esc: function () {
          $(".ocupacion_SER110C").focus();
        },
        callback: function (data) {
          $_this.form.ocupacion_SER110C = data.CODOCU.trim();
          _enterInput(".ocupacion_SER110C");
        },
      });
    },
    _f8colegio_SER110C() {
      $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE INSTITUCIONES",
        columnas: ["TIPO", "CIUDAD", "SECU", "DESCRIP"],
        data: $_this.SER110C.COLEGIOS,
        callback_esc: function () {
          $(".colegio_SER110C").focus();
        },
        callback: function (data) {
          $_this.form.colegio_SER110C = data.TIPO.trim() + data.CIUDAD.trim() + data.SECU.trim();
          _enterInput(".colegio_SER110C");
        },
      });
    },
    _f8portabilidad_SER110C() {
      $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE CONSULTA DE CIUDADES",
        columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
        data: $_this.SER110C.CIUDAD,
        callback_esc: function () {
          $(".portabilidad_SER110C").focus();
        },
        callback: function (data) {
          $_this.form.ciudadportab_SER110C = data.COD.trim();
          _enterInput(".portabilidad_SER110C");
        },
      });
    },
    _f8eps_SER110C() {
      $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE ENTIDADES",
        columnas: ["COD-ENT", "NOMBRE-ENT", "NIT-ENT"],
        data: $_this.SER110C.ENTIDADES,
        ancho: "90%",
        callback_esc: function () {
          $(".eps_SER110C").focus();
        },
        callback: function (data) {
          $_this.form.eps_SER110C = data["COD-ENT"];
          _enterInput(".eps_SER110C");
        },
      });
    },
    _f8cotizante_SER110C() {
      $_this = this;
      parametros = {
        dll: "PACIENTES",
        valoresselect: ["Nombre del paciente"],
        f8data: "PACIENTES",
        columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "EPS" }],
        callback: (data) => {
          $_this.form.cotizante_SER110C = data.COD;
          _enterInput(".cotizante_SER110C");
        },
        cancel: () => {
          _enterInput(".cotizante_SER110C");
        },
      };
      F8LITE(parametros);
    },
    _f8patologias_SER110C() {
      $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE PATOLOGIAS CRONICAS",
        columnas: ["COD", "DESCRIP"],
        data: $_this.SER110C.PATOLOGIAS,
        callback_esc: function () {
          $(".patologiacronica_SER110C").focus();
        },
        callback: function (data) {
          $_this.form.patologiacronica_SER110C = data.COD.trim();
          _enterInput(".patologiacronica_SER110C");
        },
      });
    },
    _f8clasificacion_SER110C() {
      $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE CLASIFICACION PACI",
        columnas: ["COD", "NOMBRE"],
        data: $_this.SER110C.CLASIFICACION,
        callback_esc: function () {
          $(".clasif_SER110C").focus();
        },
        callback: function (data) {
          $_this.form.clasif_SER110C = data.COD.trim();
          _enterInput(".clasif_SER110C");
        },
      });
    },
    _f8terceros_SER110C() {
      $_this = this;
      parametros = {
        dll: "TERCEROS",
        valoresselect: ["Buscar por nombre tercero"],
        f8data: "TERCEROS",
        columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "DIRREC" }, { title: "TELEF" }, { title: "ACT" }],
        callback: (data) => {
          $_this.form.entidad_SER110C = data.COD.trim();
          _enterInput(".entidad_SER110C");
        },
        cancel: () => {
          _enterInput(".entidad_SER110C");
        },
      };
      F8LITE(parametros);
    },
    _f8profesionales_SER110C() {
      $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE PROFESIONALES",
        data: $_this.SER110C.PROFESIONALES,
        columnas: ["NOMBRE", "IDENTIFICACION", "ATIENDE_PROF", "LU", "MA", "MI", "JU", "VI", "SA"],
        callback_esc: function () {
          $(".medicofam_SER110Cc").focus();
        },
        callback: function (data) {
          $_this.form.medicofam_SER110C = data.IDENTIFICACION.trim();
          _enterInput(".medicofam_SER110C");
        },
      });
    },
  },
});

var primerapellido_SER110C = $("#apellido1_SER110C")[0];
var segundoapellido_SER110C = $("#apellido2_SER110C")[0];
var primernombre_SER110C = $("#nombre1_SER110C")[0];
var segundonombre_SER110C = $("#nombre2_SER110C")[0];
// var primerapellido_SER110C = IMask($("#apellido1_SER110C")[0], {
//   mask: "aaaaaaaaaaaaaaa",
//   prepare: function (str) {
//     return str.toUpperCase();
//   },
//   commit: function (value, masked) {
//     masked._value = value.toUpperCase(); // Don't do it
//   },
// });
// var segundoapellido_SER110C = IMask($("#apellido2_SER110C")[0], {
//   mask: "aaaaaaaaaaaaaaa",
//   prepare: function (str) {
//     return str.toUpperCase();
//   },
//   commit: function (value, masked) {
//     masked._value = value.toUpperCase(); // Don't do it
//   },
// });
// var primernombre_SER110C = IMask($("#nombre1_SER110C")[0], {
//   mask: "aaaaaaaaaaaa",
//   prepare: function (str) {
//     return str.toUpperCase();
//   },
//   commit: function (value, masked) {
//     masked._value = value.toUpperCase(); // Don't do it
//   },
// });
// var segundonombre_SER110C = IMask($("#nombre2_SER110C")[0], {
//   mask: "aaaaaaaaaaaa",
//   prepare: function (str) {
//     return str.toUpperCase();
//   },
//   commit: function (value, masked) {
//     masked._value = value.toUpperCase(); // Don't do it
//   },
// });

var bloqueohcMask_SER110C = IMask($("#Bloqhc_SER110C")[0], {
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

var copagoMask_SER110C = IMask($("#copago_SER110C")[0], {
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

var victimaMask_SER110C = IMask($("#victimac_SER110C")[0], {
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

var progespecialMask_SER110C = IMask($("#proespecial_SER110C")[0], {
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

var altocostoMask_SER110C = IMask($("#altocosto_SER110C")[0], {
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

var cronicoMask_SER110C = IMask($("#cronica_SER110C")[0], {
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

var tutelaMask_SER110C = IMask($("#pacitutela_SER110C")[0], {
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

var policonsultaMask_SER110C = IMask($("#policonsul_SER110C")[0], {
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

var restriccionMask_SER110C = IMask($("#restric_SER110C")[0], {
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

var consultaMask_SER110C = IMask($("#consult_SER110C")[0], {
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

var odontologiaMask_SER110C = IMask($("#odont_SER110C")[0], {
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

var pypMask_SER110C = IMask($("#pyp_SER110C")[0], {
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

var laboratorioMask_SER110C = IMask($("#lab_SER110C")[0], {
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

var rxMask_SER110C = IMask($("#rx_SER110C")[0], {
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

var drogueriaMask_SER110C = IMask($("#drog_SER110C")[0], {
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

var fisioterapiaMask_SER110C = IMask($("#fisiot_SER110C")[0], {
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

var otraterapiaMask_SER110C = IMask($("#terap_SER110C")[0], {
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

var cirugiaMask_SER110C = IMask($("#cirug_SER110C")[0], {
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

var estanciaMask_SER110C = IMask($("#estanc_SER110C")[0], {
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

var vcmMask_SER110C = IMask($("#vcm_SER110C")[0], {
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
var pagareMask_SER110C = IMask($("#pagare_SER110C")[0], {
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

var candpypMask_SER110C = IMask($("#candpyp_SER110C")[0], {
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

var telefono1Mask_SER110C = IMask($("#tel1_SER110C")[0], { mask: Number, min: 0, max: 999999999999 });
var telefono2Mask_SER110C = IMask($("#tel2_SER110C")[0], { mask: Number, min: 0, max: 999999999999 });
var valorpagareMask_SER110C = IMask($("#valor_SER110C")[0], { mask: Number, min: 0, max: 999999999999 });

var anocontab = parseInt(`20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`);
var fechaafilMask_SER110C = IMask($("#fechaafil_SER110C")[0], {
  mask: Date,
  pattern: "Y-m-d",
  lazy: true,
  blocks: {
    Y: { mask: IMask.MaskedRange, placeholderChar: "Y", from: "1890", to: anocontab, maxLength: 4 },
    m: { mask: IMask.MaskedRange, placeholderChar: "m", from: "01", to: "12", maxLength: 2 },
    d: { mask: IMask.MaskedRange, placeholderChar: "d", from: "01", to: "31", maxLength: 2 },
  },
  format: function (date) {
    return moment(date).format("YYYY-MM-DD");
  },
  parse: function (str) {
    var fecha = moment(str).format("YYYY-MM-DD");
    if (fecha == "Invalid date") return "0000/00/00";
    return str;
  },
});

var fechavenceMask_SER110C = IMask($("#fechavence_SER110C")[0], {
  mask: Date,
  pattern: "Y-m-d",
  lazy: true,
  blocks: {
    Y: { mask: IMask.MaskedRange, placeholderChar: "Y", from: "1890", to: anocontab, maxLength: 4 },
    m: { mask: IMask.MaskedRange, placeholderChar: "m", from: "01", to: "12", maxLength: 2 },
    d: { mask: IMask.MaskedRange, placeholderChar: "d", from: "01", to: "31", maxLength: 2 },
  },
  format: function (date) {
    return moment(date).format("YYYY-MM-DD");
  },
  parse: function (str) {
    var fecha = moment(str).format("YYYY-MM-DD");
    if (fecha == "Invalid date") return "0000/00/00";
    return str;
  },
});
