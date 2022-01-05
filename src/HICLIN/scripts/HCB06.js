// SOLICITUD - NOTA REFERENCIACION (MEDICOS) - DAVID.M - 19-01-2020

new Vue({
  el: "#HCB06",
  data: {
    _unserv: [],
    _tipoMacro: [],
    _codigos: [],
    global_HCB06: {
      año_HCB06: "",
      mes_HCB06: "",
      dia_HCB06: "",
      hora_HCB06: "",
      min_HCB06: "",
      medico_HCB06: "",
      descripMedico_HCB06: "",
      servIni_HCB06: "",
      prioridad_HCB06: "",
      servSolic_HCB06: "",
      especialidades: [
        { nro: "01", cod: "", descrip: "" },
        { nro: "02", cod: "", descrip: "" },
        { nro: "03", cod: "", descrip: "" },
      ],
      paciente_HCB06: "",
      edad_HCB06: "",
      medicoTratante_HCB06: "",
      descripMedicoTratante_HCB06: "",
      aseguradora_HCB06: "",
      cup_HCB06: "",
      descripCup_HCB06: "",
      resumen_HCB06: "",
      motivo_HCB06: "",
      diagnosticos: [
        { nro: "01", cod: "", descrip: "" },
        { nro: "02", cod: "", descrip: "" },
        { nro: "03", cod: "", descrip: "" },
        { nro: "04", cod: "", descrip: "" },
        { nro: "05", cod: "", descrip: "" },
      ],
    },
    banderaSalir: 0,
    llave_hc: $_REG_HC.llave_hc,
    fecha_act: moment().format("YYYYMMDD"),
    hora_act: moment().format("HHmm"),
    dataArray: new Object(),
    data_evo: new Object(),
    admin_w: localStorage.Usuario,
    reg_epi: {},
    titulo: "",
    array_prioridad: [
      { COD: "1", DESCRIP: "PRIORITARIA" },
      { COD: "2", DESCRIP: "URGENTE" },
      { COD: "3", DESCRIP: "VITAL" },
    ],
    array_serv_solic: [
      { COD: "1", DESCRIP: "DIAGNOSTICO" },
      { COD: "2", DESCRIP: "TRATAMIENTO" },
      { COD: "3", DESCRIP: "VALORACION EXTERNA" },
      { COD: "4", DESCRIP: "MANEJO INTEGRAL" },
    ],
  },
  async created() {
    loader("show");
    _inputControl("disabled");
    _inputControl("reset");
    nombreOpcion("SOLICITUD DE REFERENCIA");
    $this = this;
    this._cargarEnfermedades_HCB06();
    await this._cargarProfesionales_HCB06();
  },
  computed: {
    descripServ() {},
    descripMed() {},
    descripPrioridad() {
      let busqueda = this.array_prioridad.find((e) => e.COD == this.global_HCB06.prioridad_HCB06);
      return busqueda ? busqueda.DESCRIP : "";
    },
    descripServSolic() {
      let busqueda = this.array_serv_solic.find((e) => e.COD == this.global_HCB06.servSolic_HCB06);
      return busqueda ? busqueda.DESCRIP : "";
    },
  },
  methods: {
    validaciones_HCB06() {
      if ($_REG_HC.fecha_ref_w == 0) {
        this.paso_w = 0;
      } else {
        this.paso_w = 1;
      }
      this.leerOperador_HCB06();
    },

    async leerOperador_HCB06() {
      await postData({ datosh: datosEnvio() + this.admin_w + "|" }, get_url("app/CONTAB/CON003.DLL"))
        .then((data) => {
          var res = data.split("|");
          this.nombre_oper_w = res[0];
          this.id_oper_w = res[1];
        })
        .catch((err) => {
          console.log(err, "error");
          this.nombre_oper_w = "";
          this.id_oper_w = "";
        });
      this.leerPaciente_HCB06();
    },

    leerPaciente_HCB06() {
      if ($_REG_PACI.DESCRIP == "NO EXITS PACIENTE!") {
        CON851("01", "01", null, "error", "error");
        this.salir_HCB06();
      } else {
        this.pasoSeguir_HCB06();
      }
    },

    pasoSeguir_HCB06() {
      this.global_HCB06.fecha_ref_w = this.fecha_act;
      this.global_HCB06.hora_ref_w = this.hora_act;
      this.global_HCB06.oper_elab_ref_w = this.admin_w;

      if (this.paso_w == 0) {
        this.mostrarEncabezado_HCB06();
      } else {
        // Trae datos referencia
        postData({ datosh: datosEnvio() + $_REG_HC.llave_ref_w + "|" }, get_url("app/HICLIN/HCB06.DLL"))
          .then(async (data) => {
            this.reg_ref = data.REG_REF[0];
            await this.pasar_datos(this.reg_ref);
            this.mostrarEncabezado_HCB06();
          })
          .catch((err) => {
            console.log(err, "error");
          });
      }
    },

    mostrarEncabezado_HCB06() {
      this.global_HCB06.año_HCB06 = this.global_HCB06.fecha_ref_w.substring(0, 4);
      this.global_HCB06.mes_HCB06 = this.global_HCB06.fecha_ref_w.substring(4, 6);
      this.global_HCB06.dia_HCB06 = this.global_HCB06.fecha_ref_w.substring(6, 8);

      this.global_HCB06.hora_HCB06 = this.global_HCB06.hora_ref_w.substring(0, 2);
      this.global_HCB06.min_HCB06 = this.global_HCB06.hora_ref_w.substring(2, 4);

      this.global_HCB06.medico_HCB06 = $_REG_HC.medico_w;
      this.busqProf = this._profesionales.find((e) => e.IDENTIFICACION == $_REG_HC.medico_w);
      if (this.busqProf) this.global_HCB06.descripMedico_HCB06 = this.busqProf.NOMBRE;

      this.buscarHistoria_HCB06();
    },

    async buscarHistoria_HCB06() {
      this.llave =
        $_REG_HC.llave_hc.substring(0, 15) + $_REG_HC.llave_hc.substring(15, 23) + this.fecha_act + this.hora_act;
      this.admin_w == "GEBC" ? (this.oper_elab_ref_w = "PROS") : (this.oper_elab_ref_w = this.admin_w);
      this.llave = this.llave.concat(this.oper_elab_ref_w);

      await postData({ datosh: datosEnvio() + this.llave + "|" }, get_url("app/HICLIN/HCB06.DLL"))
        .then((data) => {
          this.reg_ref = data.REG_REF[0];
          if (this.reg_ref.NOVEDAD_W == "7") {
            $this.crearReferenciacion_HCB06();
          } else {
            $this.errorYaExiste_HCB06(this.reg_ref.FECHA_REF);
            // CON851("9X", "9X", null, "error", "error");
            this.crearReferenciacion_HCB06();
          }
        })
        .catch((err) => {
          console.log(err, "error");
        });
    },

    crearReferenciacion_HCB06() {
      this.global_HCB06.novedad_w = 7;

      this.global_HCB06.prioridad_HCB06 = "2";
      this.global_HCB06.medico_HCB06 = $_REG_HC.medico_w;
      this.global_HCB06.medicoTratante_HCB06 = $_REG_HC.medico_w;
      var aux_w = "";
      switch ($_REG_HC.edad_hc.unid_edad) {
        case "D":
          aux_w = " Dias";
          break;
        case "M":
          aux_w = " Meses";
          break;
        case "A":
          aux_w = " Años";
          break;
        default:
          aux_w = " " + $_REG_HC.edad_hc.unid_edad;
          break;
      }
      this.global_HCB06.edad_HCB06 = $_REG_HC.edad_hc.vlr_edad + aux_w;

      // if (this.paso_w == 1) {
      //   this.pasar_datos(this.reg_ref);
      // } else {
      this.global_HCB06.especialidades[0].cod = $_REG_HC.especia_remi_ref_w;
      this.global_HCB06.diagnosticos[0].cod = $_REG_HC.diag_prin_ref_w;
      // }

      this.mostrarPag01_HCB06();
    },

    async pasar_datos(reg) {
      this.global_HCB06.descripMedico_HCB06 = $_REG_PROF.NOMBRE;
      this.global_HCB06.codServIni_HCB06 = reg.UNSERV_REF;
      this.global_HCB06.servIni_HCB06 = reg.DESCRIP_UNSERV;
      this.global_HCB06.prioridad_HCB06 = reg.PRIORIDAD_REF;
      this.global_HCB06.servSolic_HCB06 = reg.SERV_SOLICITA_REF;

      this.global_HCB06.cup_HCB06 = reg.CUP_REF;
      this.global_HCB06.descripCup_HCB06 = reg.DESCRIP_CUP_REF;

      this.global_HCB06.resumen_HCB06 = reg.TABLA_REF;
      this.global_HCB06.motivo_HCB06 = reg.MOTIVO_REVISION_REF;

      this.global_HCB06.especialidades[0].cod = reg.ESPECIA_REMI_REF;
      this.global_HCB06.especialidades[0].descrip = reg.DESCRIP_ESPEC;
      this.global_HCB06.especialidades[1].cod = reg.ESPECIA_REMI_REF2;
      this.global_HCB06.especialidades[1].descrip = reg.DESCRIP_ESPEC2;
      this.global_HCB06.especialidades[2].cod = reg.ESPECIA_REMI_REF3;
      this.global_HCB06.especialidades[2].descrip = reg.DESCRIP_ESPEC3;

      this.global_HCB06.diagnosticos[0].cod = reg.DIAG_PRIN_REF;
      this.global_HCB06.diagnosticos[0].descrip = reg.DESCRIP_DIAG_PRIN_REF;

      this.global_HCB06.diagnosticos[1].cod = reg.OTROS_DIAGNOSTICOS_REF[0].COD;
      this.global_HCB06.diagnosticos[1].descrip = reg.OTROS_DIAGNOSTICOS_REF[0].DESCRIP;

      this.global_HCB06.diagnosticos[2].cod = reg.OTROS_DIAGNOSTICOS_REF[1].COD;
      this.global_HCB06.diagnosticos[2].descrip = reg.OTROS_DIAGNOSTICOS_REF[1].DESCRIP;

      this.global_HCB06.diagnosticos[3].cod = reg.OTROS_DIAGNOSTICOS_REF[2].COD;
      this.global_HCB06.diagnosticos[3].descrip = reg.OTROS_DIAGNOSTICOS_REF[2].DESCRIP;

      this.global_HCB06.diagnosticos[4].cod = reg.OTROS_DIAGNOSTICOS_REF[3].COD;
      this.global_HCB06.diagnosticos[4].descrip = reg.OTROS_DIAGNOSTICOS_REF[3].DESCRIP;
    },

    async mostrarPag01_HCB06() {
      if (this.paso_w == 0) {
        this.titulo = "SOLICITANDO REFERENCIACIÓN";
      } else {
        this.titulo = "ACTUALIZANDO SOLICITUD";
      }

      this.global_HCB06.paciente_HCB06 = $_REG_PACI.DESCRIP.replace(/\s+/g, " ");
      var aux_w = "";
      switch ($_REG_HC.edad_hc.unid_edad) {
        case "D":
          aux_w = " Dias";
          break;
        case "M":
          aux_w = " Meses";
          break;
        case "A":
          aux_w = " Años";
          break;
        default:
          aux_w = " " + $_REG_HC.edad_hc.unid_edad;
          break;
      }

      this.global_HCB06.edad_HCB06 = $_REG_HC.edad_hc.vlr_edad + aux_w;

      this.busqProf = this._profesionales.find((e) => e.IDENTIFICACION == this.global_HCB06.medicoTratante_HCB06);
      if (this.busqProf) {
        this.global_HCB06.descripMedicoTratante_HCB06 = this.busqProf.NOMBRE.replace(/\s+/g, " ");
      } else {
        this.global_HCB06.descripMedicoTratante_HCB06 = "";
      }

      await postData({ datosh: datosEnvio() + $_REG_PACI.EPS + "|" }, get_url("APP/SALUD/SER853_1.DLL"))
        .then((data) => {
          this.entidad = data["REG-ENT"][0];
        })
        .catch((err) => {
          this.entidad = {};
          this.entidad["COD-ENT"] = $_REG_PACI.EPS;
          this.entidad["NOMBRE-ENT"] = "";
        });

      this.global_HCB06.aseguradora_HCB06 = this.entidad["COD-ENT"] + " - " + this.entidad["NOMBRE-ENT"];

      this.ventanaUnserv_HCB06();
    },

    ventanaUnserv_HCB06() {
      SER873(
        () => {
          this._confirmarSalir_HCB06("ventanaUnserv_HCB06");
        },
        this.datoUnidad_HCB06,
        this.global_HCB06.codServIni_HCB06
      );
    },

    datoUnidad_HCB06(data) {
      this.global_HCB06.codServIni_HCB06 = data.COD;
      this.global_HCB06.servIni_HCB06 = data.DESCRIP.trim();
      if (data.ESTADO == "N") {
        CON851("13", "13", null, "error", "error");
        this.ventanaUnserv_HCB06();
      } else {
        if (this.global_HCB06.codServIni_HCB06 == 02 && this.admin_w != "GEBC") {
          if ($_REG_HC.serv_hc == 01 || $_REG_HC.serv_hc == 02 || $_REG_HC.serv_hc == 04 || $_REG_HC.unser_hc == 02) {
            this.datoPrioridad_HCB06();
          } else {
            CON851("2A", "2A", null, "error", "error");
            this.ventanaUnserv_HCB06();
          }
        } else {
          this.datoPrioridad_HCB06();
        }
      }
    },

    datoPrioridad_HCB06() {
      console.log("prioridad");
      POPUP(
        {
          array: this.array_prioridad,
          titulo: "PRIORIDAD",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.global_HCB06.prioridad_HCB06.substring(0, 1),
          callback_f: () => {
            this.ventanaUnserv_HCB06();
          },
        },
        (data) => {
          this.global_HCB06.prioridad_HCB06 = data.COD;
          this.datoServSolic_HCB06();
        }
      );
    },

    datoServSolic_HCB06() {
      POPUP(
        {
          array: this.array_serv_solic,
          titulo: "SERVICIO SOLICITADO",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.global_HCB06.servSolic_HCB06.substring(0, 1),
          callback_f: () => {
            this.ventanaUnserv_HCB06();
          },
        },
        (data) => {
          this.global_HCB06.servSolic_HCB06 = data.COD;
          this.datoEspecialidad_HCB06(0);
        }
      );
    },

    async datoEspecialidad_HCB06(pos) {
      if (pos > 2) {
        this.validarCup_HCB06();
      } else {
        validarInputs(
          {
            form: "#validarEspec_" + pos + "_HCB06",
            orden: "1",
            event_f3: () => {
              if (this.global_HCB06.especialidades[0].cod.trim() == "") {
                CON851("02", "02", null, "error", "Error");
                this.datoEspecialidad_HCB06(pos);
              } else {
                this.validarCup_HCB06();
              }
            },
          },
          () => {
            if (pos == 0) {
              this._confirmarSalir_HCB06(`datoEspecialidad_HCB06`, pos);
            } else {
              this.datoEspecialidad_HCB06(pos - 1);
            }
          },
          () => {
            var espec = this.global_HCB06.especialidades[pos].cod;
            if (espec.trim() == "" && pos == 0) {
              CON851("01", "01", null, "error", "error");
              this.datoEspecialidad_HCB06(pos);
            } else {
              if (this.global_HCB06.especialidades[pos].cod.trim() == "") {
                for (var i in this.global_HCB06.especialidades) {
                  if (i >= pos) {
                    this.global_HCB06.especialidades[i].cod = "";
                    this.global_HCB06.especialidades[i].descrip = "";
                  }
                }
                this.validarCup_HCB06();
              } else {
                this.busqEspec = this._especialidades.find(
                  (e) => e.CODIGO == this.global_HCB06.especialidades[pos].cod
                );

                if (this.busqEspec) {
                  this.global_HCB06.especialidades[pos].descrip = this.busqEspec.NOMBRE;
                  this.datoEspecialidad_HCB06(pos + 1);
                } else {
                  CON851("01", "01", null, "error", "error");
                  this.datoEspecialidad_HCB06(pos);
                }
              }
            }
          }
        );
      }
    },

    validarCup_HCB06() {
      validarInputs(
        {
          form: "#validarCup_HCB06",
        },
        () => {
          this.datoEspecialidad_HCB06(0);
        },
        () => {
          if (this.global_HCB06.cup_HCB06.trim() == "") {
            this.global_HCB06.descripCup_HCB06 = "";
            this.datoMedicoTratante_HCB06();
          } else {
            var busqCup = this._cups.find((e) => e.LLAVE.trim() == this.global_HCB06.cup_HCB06.trim());
            if (busqCup) {
              this.global_HCB06.descripCup_HCB06 = busqCup.DESCRIP;
              this.datoMedicoTratante_HCB06();
            } else {
              CON851("03", "03", null, "error", "error");
              this.validarCup_HCB06();
            }
          }
        }
      );
    },

    datoMedicoTratante_HCB06() {
      if (this.global_HCB06.medicoTratante_HCB06 < 1) {
        this.global_HCB06.medicoTratante_HCB06 = $_REG_HC.medico_w;
      }
      validarInputs(
        {
          form: "#validarMedTratante_HCB06",
        },
        () => {
          this.validarCup_HCB06();
        },
        () => {
          var busqProf = this._profesionales.find((e) => e.IDENTIFICACION == this.global_HCB06.medicoTratante_HCB06);
          if (busqProf) {
            this.global_HCB06.descripMedicoTratante_HCB06 = busqProf.NOMBRE.replace(/\s+/g, " ");
            this.datoResumen_HCB06();
          } else {
            CON851("01", "01", null, "error", "error");
            this.datoMedicoTratante_HCB06();
          }
        }
      );
    },

    datoResumen_HCB06() {
      validarInputs(
        {
          form: "#validarResumen_HCB06",
        },
        () => {
          this.validarCup_HCB06();
        },
        () => {
          this.global_HCB06.resumen_HCB06 = this.global_HCB06.resumen_HCB06
            .replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ")
            .toUpperCase()
            .trim();
          this.validarCod_diagnosticos(0);
        }
      );
    },

    async validarCod_diagnosticos(pos) {
      if (pos > 4) {
        this.datoMotivo_HCB06();
      } else {
        validarInputs(
          {
            form: "#validarCod_diag_" + pos + "_HCB06",
            orden: "1",
            event_f3: () => {
              if (this.global_HCB06.diagnosticos[0].cod.trim() == "") {
                CON851("02", "02", null, "error", "Error");
                this.validarCod_diagnosticos(pos);
              } else {
                this.datoMotivo_HCB06();
              }
            },
          },
          () => {
            if (pos == 0) {
              this.datoMedicoTratante_HCB06();
            } else {
              this.validarCod_diagnosticos(pos - 1);
            }
          },
          () => {
            this.global_HCB06.diagnosticos[pos].cod = this.global_HCB06.diagnosticos[pos].cod.toUpperCase();
            var diagn = this.global_HCB06.diagnosticos[pos].cod;
            if (diagn.trim() == "" && pos == 0) {
              this.validarCod_diagnosticos(pos);
            } else {
              if (this.global_HCB06.diagnosticos[pos].cod.trim() == "") {
                for (var i in this.global_HCB06.diagnosticos) {
                  if (i >= pos) {
                    this.global_HCB06.diagnosticos[i].cod = "";
                    this.global_HCB06.diagnosticos[i].descrip = "";
                  }
                }
                this.datoMotivo_HCB06();
              } else {
                this.busqEnf = this._enfermedades.find((e) => e.COD_ENF == this.global_HCB06.diagnosticos[pos].cod);

                if (this.busqEnf) {
                  this.global_HCB06.diagnosticos[pos].descrip = this.busqEnf.NOMBRE_ENF;
                  this.validarCod_diagnosticos(pos + 1);
                } else {
                  CON851("01", "01", null, "error", "error");
                  this.validarCod_diagnosticos(pos);
                }
              }
            }
          }
        );
      }
    },

    datoMotivo_HCB06() {
      validarInputs(
        {
          form: "#validarMotivo_HCB06",
        },
        () => {
          this.validarCod_diagnosticos(4);
        },
        () => {
          this.global_HCB06.motivo_HCB06 = this.global_HCB06.motivo_HCB06
            .replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ")
            .toUpperCase()
            .trim();
          this.confirmar_HCB06(0);
        }
      );
    },

    confirmar_HCB06() {
      CON851P(
        "01",
        () => {
          this.mostrarPag01_HCB06();
        },
        () => {
          this.grabar_HCB06();
        }
      );
    },

    async grabar_HCB06() {
      if (this.admin_w == "GEBC") {
        this.oper_modif_ref = "PROS";
      } else {
        this.oper_modif_ref = this.admin_w;
      }

      var data = {};

      this.global_HCB06.llave_ref = $_REG_HC.llave_hc + this.fecha_act + this.hora_act + this.oper_elab_ref_w;

      data["datosh"] = datosEnvio() + this.global_HCB06.llave_ref + "|";

      data["medico_w"] = this.global_HCB06.medico_HCB06;
      data["medico_solic_w"] = this.global_HCB06.medicoTratante_HCB06;
      data["unserv_w"] = this.global_HCB06.codServIni_HCB06;
      data["edad_w"] = $_REG_HC.edad_hc.unid_edad + cerosIzq($_REG_HC.edad_hc.vlr_edad, 3);
      data["fecha_w"] = this.global_HCB06.fecha_ref_w;
      data["hora_w"] = this.global_HCB06.hora_ref_w;
      data["especia_remt_w"] = this.global_HCB06.especialidades[0].cod;
      data["especia_remt2_w"] = this.global_HCB06.especialidades[1].cod;
      data["especia_remt3_w"] = this.global_HCB06.especialidades[2].cod;
      data["diag_prin_w"] = this.global_HCB06.diagnosticos[0].cod;
      data["serv_solicita_w"] = this.global_HCB06.servSolic_HCB06.substring(0, 1);
      data["prioridad_ref_w"] = this.global_HCB06.prioridad_HCB06.substring(0, 1);
      data["cup_w"] = this.global_HCB06.cup_HCB06;

      data["otros_diag1_w"] = this.global_HCB06.diagnosticos[1].cod;
      data["otros_diag2_w"] = this.global_HCB06.diagnosticos[2].cod;
      data["otros_diag3_w"] = this.global_HCB06.diagnosticos[3].cod;
      data["otros_diag4_w"] = this.global_HCB06.diagnosticos[4].cod;
      data["motivo_revision_w"] = this.global_HCB06.motivo_HCB06.replace(/(\r\n|\n|\r)/gm, "&");

      var tabla_ref_content = JSON.parse(
        JSON.stringify(this.global_HCB06.resumen_HCB06.replace(/(\r\n|\n|\r)/gm, "&"))
      );

      var posicion = 0;
      var contadorLin = 0;
      var contadorTotal = 0;
      var linea = "";
      var maximo = 90;

      tabla_ref_content.split("").forEach((item, i) => {
        contadorTotal = i + 1;
        contadorLin = contadorLin + 1;

        switch (item) {
          case "á":
          case "é":
          case "í":
          case "ó":
          case "ú":
          case "Á":
          case "É":
          case "Í":
          case "Ó":
          case "Ú":
          case "ñ":
          case "Ñ":
          case "!":
          case '"':
          case "#":
          case "$":
          case "%":
          case "/":
          case "(":
          case ")":
          case "=":
          case "?":
          case "*":
          case "+":
          case "-":
          case "@":
          case ">":
          case "<":
            maximo = maximo + 1;
            break;
        }
        linea += item;

        if (contadorLin == maximo || tabla_ref_content.length == contadorTotal) {
          posicion = posicion + 1;

          data["TABLA_REF-" + posicion.toString().padStart(3, "0")] = linea;
          contadorLin = 0;
          linea = "";
          maximo = 90;
        }
      });

      await postData(data, get_url("app/HICLIN/HCB06-1.DLL"))
        .then((data) => {
          toastr.success("Información guardada");
        })
        .catch((err) => {
          toastr.error("Error en guardado");
          $this.salir_HCB06();
          console.log(err, "error");
          loader("hide");
        });

      setTimeout(() => {
        $this.confirmarImprimir_HCB06();
      }, 300);
    },

    confirmarImprimir_HCB06() {
      CON851P(
        "00",
        () => {
          this.salir_HCB06();
        },
        () => {
          this.imprimir_HCB06();
        }
      );
    },

    async imprimir_HCB06() {
      loader("show");

      await _impresion2({
        tipo: "pdf",
        archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")}.pdf`,
        content: await _imprimirReferencia(this.global_HCB06.llave_ref),
      })
        .then((data) => {
          console.log("Impresión terminada");
          loader("hide");
          $this.salir_HCB06();
        })
        .catch((err) => {
          console.error(err);
          CON851("ERROR", "Error en impresion", null, "error", "error");
          loader("hide");
          $this.salir_HCB06();
        });
    },

    async errorYaExiste_HCB06(fecha) {
      jAlert({
        titulo: "ATENCIÓN",
        mensaje: `Ese paciente ya tiene REFERENCIACION abierta, con fecha ${fecha}`,
      });
    },

    _confirmarSalir_HCB06(callback_esc, orden) {
      CON851P(
        "03",
        () => {
          orden != undefined ? $this[callback_esc](orden) : $this[callback_esc]();
        },
        () => {
          $this.salir_HCB06();
        }
      );
    },

    salir_HCB06() {
      $this.banderaSalir = $this.banderaSalir + 1;
      if ($this.banderaSalir < 2) {
        _regresar_menuhis();
      }
    },

    _cargarEnfermedades_HCB06() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER851.DLL"))
        .then((data) => {
          $this._enfermedades = data.ENFERMEDADES;
          $this._enfermedades.pop();

          for (var i in $this._enfermedades) {
            $this._enfermedades[i].NOMBRE_ENF = $this._enfermedades[i].NOMBRE_ENF.replace(/\�/g, "Ñ").trim();
          }
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          $this.salir_HCB06();
        });
    },

    async _cargarProfesionales_HCB06() {
      await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
        .then((data) => {
          this._profesionales = data.ARCHPROF;
          this._profesionales.pop();
          this._cargarCups_HCB06();
        })
        .catch((err) => {
          console.log(err, "err");
          loader("hide");
          $this.salir_HCB06();
        });
    },

    async _cargarCups_HCB06() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER802C.DLL"))
        .then((data) => {
          this._cups = data.CODIGOS;
          this._cups.pop();
          this._cargarEspecialidades_HCB06();
        })
        .catch((err) => {
          console.log(err, "err");
          loader("hide");
          $this.salir_HCB06();
        });
    },

    async _cargarEspecialidades_HCB06() {
      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
        .then((data) => {
          $this._especialidades = data.ESPECIALIDADES;
          $this._especialidades.pop();
          loader("hide");
          this.validaciones_HCB06();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          $this.salir_HCB06();
        });
    },

    _ventanaMedico_HCB06() {
      _ventanaDatos({
        titulo: "PROFESIONALES",
        columnas: ["IDENTIFICACION", "NOMBRE"],
        data: $this._profesionales,
        callback_esc: function () {
          document.querySelector(".medicoTratante_HCB06").focus();
        },
        callback: function (data) {
          $this.global_HCB06.medicoTratante_HCB06 = data["IDENTIFICACION"].trim();
          $this.global_HCB06.descripMedicoTratante_HCB06 = data["NOMBRE"].replace(/\s+/g, " ").trim();
          _enterInput(".medicoTratante_HCB06");
        },
      });
    },

    async _ventanaEspecialidades_HCB06(pos) {
      await _ventanaDatos({
        titulo: "VENTANA DE ESPECIALIDADES",
        columnas: ["CODIGO", "NOMBRE"],
        data: $this._especialidades,
        callback_esc: function () {
          document.querySelector(`.espec_${pos}_HCB06`).focus();
        },
        callback: async function (data) {
          $this.global_HCB06.especialidades[pos].cod = data["CODIGO"].trim();
          $this.global_HCB06.especialidades[pos].descrip = data["NOMBRE"].trim();
          setTimeout(() => {
            _enterInput(`.espec_${pos}_HCB06`);
          }, 200);
        },
      });
    },

    async _ventanaCups_HCB06() {
      _ventanaDatos({
        titulo: "VENTANA DE CUPS",
        columnas: ["LLAVE", "DESCRIP"],
        data: $this._cups,
        callback_esc: function () {
          document.querySelector(".cup_HCB06").focus();
        },
        callback: function (data) {
          $this.global_HCB06.cup_HCB06 = data["LLAVE"].trim();
          $this.global_HCB06.descripCup_HCB06 = data["DESCRIP"].trim();
          _enterInput(".cup_HCB06");
        },
      });
    },

    async _ventanaDiagnosticos_HCB06(pos) {
      await _ventanaDatos({
        titulo: "VENTANA DE ENFERMEDADES",
        columnas: ["COD_ENF", "NOMBRE_ENF"],
        data: $this._enfermedades,
        callback_esc: function () {
          if (pos == "muerte") {
            document.querySelector(`.codDiag_${pos}_HCB06`).focus();
          } else {
            document.querySelector(`.diagMuerte_HCB06`).focus();
          }
        },
        callback: async function (data) {
          if (pos == "muerte") {
            $this.global_HCB06.diagMuerte_HCB06 = data["COD_ENF"].trim();
            $this.global_HCB06.descripDiagMuerte_HCB06 = data["NOMBRE_ENF"].trim();
            setTimeout(() => {
              _enterInput(`.diagMuerte_HCB06`);
            }, 200);
          } else {
            $this.global_HCB06.diagnosticos[pos].cod = data["COD_ENF"].trim();
            $this.global_HCB06.diagnosticos[pos].descrip = data["NOMBRE_ENF"].trim();
            setTimeout(() => {
              _enterInput(`.codDiag_${pos}_HCB06`);
              console.log("sale");
            }, 200);
          }
        },
      });
    },
  },
});
