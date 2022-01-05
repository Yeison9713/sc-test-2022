// Nota referenciacion - B1 - David.M - 21/04/2021

new Vue({
  el: "#HCB01",
  data: {
    refer: {
      FECHA_REF: 0,
      HORA_REF: 0,
      UNSERV_REF: "",
      MED_REF: "",
      DIAG_PRIN_REF: "",
      TABLA_REF: "",
      NOVEDAD_W: 0,
      FUNCIONARIO_IPS_REF: "",
      PERS_ADMIN_REF: "",
      IPS_REF: "",
      DESCRIP_IPS_REF: "",
      ESPECIA_REMI_REF: "",
      ESPECIA_REMI_REF2: "",
      ESPECIA_REMI_REF3: "",
    },
    operador: $_REG_PROF.IDENTIFICACION,
    admin_w: localStorage.Usuario,
    nom_oper_w: "",
    id_oper_w: "",
    especialidades: [
      { nro: "01", cod: "", descrip: "" },
      { nro: "02", cod: "", descrip: "" },
      { nro: "03", cod: "", descrip: "" },
    ],
    llave_ref_sol: "",
    paso_w: 0,
    fecha_act: moment().format("YYYYMMDD"),
    hora_act: moment().format("HHmm"),
    array_profesionales: [],
    array_especialidades: [],
    array_enfermedades: [],
    array_ips: [],
    dia_max: 0,
  },
  created() {
    loader("show");
    _inputControl("disabled");
    _inputControl("reset");
    nombreOpcion("B1 - NOTA DE REFERENCIACIÓN");
    this.revisarDato();
  },
  watch: {
    "refer.TABLA_REF": function (val) {
      this.refer.TABLA_REF = val.enterPut().replaceEsp();
    },
    "refer.SOPORTES_REF": function (val) {
      this.refer.SOPORTES_REF = val.enterPut().replaceEsp();
    },
  },
  computed: {
    fecha_ref_w() {
      return getObjectDate(this.refer.FECHA_REF);
    },
    hora_ref_w() {
      return getObjectHour(this.refer.HORA_REF);
    },
    descrip_operador() {
      return $_REG_PROF.NOMBRE;
    },
    descrip_medico_ordena() {
      let busqueda = this.array_profesionales.find(
        (e) => e.IDENTIFICACION.padStart("10", 0) == this.refer.MED_REF.padStart("10", 0)
      );
      return busqueda ? busqueda.NOMBRE : "";
    },
    descrip_diag_prin_ref() {
      let busqueda = this.array_enfermedades.find((e) => e.COD_ENF == this.refer.DIAG_PRIN_REF);
      return busqueda ? busqueda.NOMBRE_ENF : "";
    },
    descrip_ips() {
      let busqueda = this.array_ips.find((e) => e.COD.padStart("12", 0) == this.refer.IPS_REF.padStart("12", 0));
      return busqueda ? busqueda.DESCRIP : "";
    },
  },
  methods: {
    revisarDato() {
      this.llave_ref_sol = $_REG_HC.llave_ref_w;

      if (!$_REG_HC.fecha_ref_w.trim() || $_REG_HC.fecha_ref_w == 0) {
        this.paso_w = 0;
      } else this.paso_w = 1;

      this.buscarApertura();
    },
    buscarApertura() {
      postData(
        {
          datosh: datosEnvio() + $_REG_HC.llave_ref_w.slice(0, 23) + "|" + localStorage.Usuario.trim() + "|1|",
        },
        get_url("app/HICLIN/GET_HC.DLL")
      )
        .then((data) => {
          this.hcprc = data;

          this.historialRef();
          this.leerOperador();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "");
          this.salir();
        });
    },
    leerOperador() {
      postData({ datosh: datosEnvio() + this.admin_w }, get_url("app/CONTAB/CON003.DLL"))
        .then((data) => {
          let res = data.split("|");
          this.nom_oper_w = res[0];
          this.id_oper_w = res[1];
          this.leerPaciente();
        })
        .catch((err) => {
          console.log(err, "error");
        });
    },
    leerPaciente() {
      if ($_REG_PACI.DESCRIP == "NO EXITS PACIENTE!") {
        CON851("", "01", null, "error", "");
        this.salir();
      } else this.pasoSeguir();
    },
    pasoSeguir() {
      if (this.paso_w == 0) {
        this.fecha_ref_w = this.fecha_act;
        this.hora_ref_w = this.hora_act;
        this.oper_elab_ref_w = this.admin_w;

        this.llave = $_REG_HC.llave_ref_w.slice(0, 23) + this.fecha_act + this.hora_act + this.admin_w;

        postData({ datosh: datosEnvio() + this.llave + "|" }, get_url("app/HICLIN/HCB06.DLL"))
          .then(async (data) => {
            this.refer = data.REG_REF[0];

            this.refer.FECHA_REF = this.fecha_act;
            this.refer.HORA_REF = this.hora_act;
            this.refer.FECHA_MODIF_REF = this.fecha_act;
            this.refer.HORA_MODIF_REF = this.hora_act;
            this.refer.OPER_ELAB_REF = this.admin_w;
            this.refer.TIPO_REF = 1;
            this.traerCodIps();
          })
          .catch((err) => {
            console.log(err, "error");
            CON851("", "Error consultando datos", null, "error", "");
            this.salir();
          });
      } else {
        postData({ datosh: datosEnvio() + $_REG_HC.llave_ref_w + "|" }, get_url("app/HICLIN/HCB06.DLL"))
          .then(async (data) => {
            this.refer = data.REG_REF[0];
            this.refer.FECHA_REF = this.fecha_act;
            this.refer.HORA_REF = this.hora_act;
            this.refer.OPER_ELAB_REF = this.admin_w;
            this.refer.NOVEDAD_W = 8;
            this.refer.LLAVE_PACI_REF = $_REG_HC.llave_ref_w.slice(0, 23);
            this.refer.TIPO_REF = 1;

            this.refer.FECHA_MODIF_REF = this.fecha_act;
            this.refer.HORA_MODIF_REF = this.hora_act;

            this.especialidades[0].cod = this.refer.ESPECIA_REMI_REF;
            this.especialidades[0].descrip = this.refer.DESCRIP_ESPEC;
            this.especialidades[1].cod = this.refer.ESPECIA_REMI_REF2;
            this.especialidades[1].descrip = this.refer.DESCRIP_ESPEC2;
            this.especialidades[2].cod = this.refer.ESPECIA_REMI_REF3;
            this.especialidades[2].descrip = this.refer.DESCRIP_ESPEC3;

            this.refer.TABLA_REF = "";
            this.refer.IPS_REF = "";
            this.refer.FUNCIONARIO_IPS_REF = "";
            this.refer.ACEPTADA_REF = "";
            this.refer.MEDICO_ACEPTA_REF = "";
            this.refer.PERS_ADMIN_REF = "";
            this.refer.SOPORTES_REF = "";
            this.traerCodIps();
          })
          .catch((err) => {
            console.log(err, "error");
            CON851("", "Error consultando datos", null, "error", "");
            this.salir();
          });
      }
    },
    traerCodIps() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER813.DLL"))
        .then(async (data) => {
          this.array_ips = data.IPS;
          this.array_ips.pop();
          this.traerProfesionales();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos IPS", null, "error", "");
          this.salir();
        });
    },
    traerProfesionales() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER819.DLL"))
        .then(async (data) => {
          this.array_profesionales = data.ARCHPROF;
          this.array_profesionales.pop();
          this.traerEnfermedades();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos PROFESIONALES", null, "error", "");
          this.salir();
        });
    },
    traerEnfermedades() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER851.DLL"))
        .then(async (data) => {
          this.array_enfermedades = data.ENFERMEDADES;
          this.traerEspecialidades();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos ENFERMEDADES", null, "error", "");
          this.salir();
        });
    },
    traerEspecialidades() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
        .then(async (data) => {
          this.array_especialidades = data.ESPECIALIDADES;
          loader("hide");
          this.datoUnidad();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos ESPECIALIDADES", null, "error", "");
          this.salir();
        });
    },
    datoUnidad() {
      SER873(
        () => {
          this.confirmarSalir("datoUnidad");
        },
        (data) => {
          this.refer.UNSERV_REF = data.COD;
          this.refer.DESCRIP_UNSERV = data.DESCRIP;
          if (data.ESTADO == "N") {
            CON851("", "13", null, "error", "");
            this.datoUnidad();
          } else {
            if (this.refer.UNSERV_REF == 02 && this.admin_w != "GEBC") {
              if ([01, 02, 04].includes(this.hcprc.serv) || this.hcprc.cierre.unserv == 02) {
                this.medicoRefiere();
              } else {
                CON851("", "2A", null, "error", "");
                this.datoUnidad();
              }
            } else {
              this.medicoRefiere();
            }
          }
        },
        this.refer.UNSERV_REF
      );
    },
    datoFecha(orden) {
      validarInputs(
        {
          form: "#fecha_refer",
          orden: orden,
        },
        () => {
          this.datoUnidad();
        },
        () => {
          this.fecha_ref_w.ano_w = cerosIzq(this.fecha_ref_w.ano_w, 4);
          this.fecha_ref_w.mes_w = cerosIzq(this.fecha_ref_w.mes_w, 2);
          this.fecha_ref_w.dia_w = cerosIzq(this.fecha_ref_w.dia_w, 2);
          this.refer.FECHA_REF = `${this.fecha_ref_w.ano_w}${this.fecha_ref_w.mes_w}${this.fecha_ref_w.dia_w}`;

          if (this.fecha_ref_w.ano_w < parseInt(this.fecha_ref_w.ano_w) - 1) {
            CON851("37", "37", null, "error", "error");
            this.datoFecha("1");
          } else if (isNaN(moment(this.refer.FECHA_REF).format("YYYYMMDD"))) {
            this.datoFecha("3");
          } else {
            this.datoHora("1");
          }
        }
      );
    },
    datoHora(orden) {
      validarInputs(
        {
          form: "#hora_refer",
          orden: orden,
        },
        () => {
          this.datoFecha("3");
        },
        () => {
          this.hora_ref_w.hora_w = cerosIzq(this.hora_ref_w.hora_w, 2);
          this.hora_ref_w.min_w = cerosIzq(this.hora_ref_w.min_w, 2);
          this.refer.HORA_REF = `${this.hora_ref_w.hora_w}${this.hora_ref_w.min_w}`;

          if (this.hora_ref_w.hora_w < 0 || this.hora_ref_w.hora_w > 23) {
            CON851("37", "37", null, "error", "error");
            this.datoHora("1");
          } else if (this.hora_ref_w.min_w < 0 || this.hora_ref_w.min_w > 59) {
            this.datoHora("2");
          } else {
            var myString = "03:00:00",
              myStringParts = myString.split(":"),
              hourDelta = +myStringParts[0],
              minuteDelta = +myStringParts[1];

            this.datoFechaCompleta = `${this.refer.FECHA_REF}${this.refer.HORA_REF}${moment().format("ss")}`;

            let fecha_return = moment().subtract({
              hours: hourDelta,
              minutes: minuteDelta,
            });
            fecha_return = fecha_return.format("YYYYMMDDHHmmss");

            let fecha_inicio = moment().format("YYYYMMDDHHmmss");

            if (
              parseInt(this.datoFechaCompleta) < parseInt(fecha_return) ||
              parseInt(this.datoFechaCompleta) < parseInt(fecha_inicio)
            ) {
              CON851("37", "37", null, "error", "error");
              this.datoFecha("1");
            } else this.medicoRefiere();
          }
        }
      );
    },
    medicoRefiere() {
      _this = this;
      validarInputs(
        {
          form: "#MED_REF",
          event_f5() {
            _this.datoFecha("1");
          },
        },
        () => {
          this.datoUnidad();
        },
        () => {
          let busqueda = this.array_profesionales.find(
            (e) => e.IDENTIFICACION.padStart("10", 0) == this.refer.MED_REF.padStart("10", 0)
          );
          if (busqueda) {
            this.datoEnfermedad();
          } else {
            CON851("", "01", null, "error", "");
            this.medicoRefiere();
          }
        }
      );
    },
    datoEnfermedad() {
      validarInputs(
        {
          form: "#DIAG_PRIN_REF",
        },
        () => {
          this.medicoRefiere();
        },
        () => {
          this.refer.DIAG_PRIN_REF = this.refer.DIAG_PRIN_REF.toUpperCase();
          if (!this.refer.DIAG_PRIN_REF.trim()) {
            this.datoEnfermedad();
          } else {
            let busqueda = this.array_enfermedades.find((e) => e.COD_ENF == this.refer.DIAG_PRIN_REF);
            if (busqueda) {
              this.datoIps();
            } else {
              CON851("", "01", null, "error", "");
              this.datoEnfermedad();
            }
          }
        }
      );
    },
    datoIps() {
      validarInputs(
        {
          form: "#IPS_REF",
        },
        () => {
          this.datoEnfermedad();
        },
        () => {
          if (!this.refer.IPS_REF.trim()) {
            CON851("", "02", null, "error", "");
            this.datoIps();
          } else {
            let busqueda = this.array_ips.find((e) => e.COD.padStart("12", 0) == this.refer.IPS_REF.padStart("12", 0));
            if (busqueda) {
              if (!this.refer.FUNCIONARIO_IPS_REF.trim()) this.refer.FUNCIONARIO_IPS_REF = busqueda.FUNCIONARIO;
              this.datoFuncionario();
            } else {
              CON851("", "01", null, "error", "");
              this.datoIps();
            }
          }
        }
      );
    },
    datoFuncionario() {
      validarInputs(
        {
          form: "#FUNCIONARIO_IPS_REF",
        },
        () => {
          this.datoIps();
        },
        () => {
          if (!this.refer.FUNCIONARIO_IPS_REF.trim()) {
            CON851("", "02", null, "error", "");
            this.datoFuncionario();
          } else {
            this.refer.FUNCIONARIO_IPS_REF = this.refer.FUNCIONARIO_IPS_REF.toUpperCase().replaceEsp();
            this.datoEspecialidad(0);
          }
        }
      );
    },
    datoEspecialidad(pos) {
      if (pos > 2) {
        this.datoReferenciacion();
      } else {
        validarInputs(
          {
            form: "#validarEspec_" + pos,
          },
          () => {
            if (pos == 0) this.datoFuncionario();
            else this.datoEspecialidad(pos - 1);
          },
          () => {
            let espec = this.especialidades[pos].cod;
            if (!espec.trim() && pos == 0) {
              CON851("", "01", null, "error", "");
              this.datoEspecialidad(pos);
            } else {
              if (!this.especialidades[pos].cod.trim()) {
                this.especialidades = this.especialidades.filter((e) => e.cod.trim());
                while (this.especialidades.length < 3) {
                  this.especialidades.push({
                    nro: this.especialidades.length + 1,
                    cod: "",
                    descrip: "",
                  });
                }
                this.datoReferenciacion();
              } else {
                let busqueda = this.array_especialidades.find((e) => e.CODIGO == this.especialidades[pos].cod);
                if (busqueda) {
                  this.especialidades[pos].descrip = busqueda.NOMBRE;
                  this.datoEspecialidad(pos + 1);
                } else {
                  CON851("01", "01", null, "error", "error");
                  this.datoEspecialidad(pos);
                }
              }
            }
          }
        );
      }
    },
    datoReferenciacion() {
      validarInputs(
        {
          form: "#TABLA_REF",
        },
        () => {
          this.datoEspecialidad(0);
        },
        () => {
          this.refer.TABLA_REF = this.refer.TABLA_REF.replaceEsp();
          this.datoAceptada();
        }
      );
    },
    datoAceptada() {
      validarInputs(
        {
          form: "#ACEPTADA_REF",
        },
        () => {
          this.datoReferenciacion();
        },
        () => {
          this.refer.ACEPTADA_REF = this.refer.ACEPTADA_REF.toUpperCase();
          if (this.refer.ACEPTADA_REF == "S") {
            this.datoMedicoAcepta();
          } else {
            this.refer.ACEPTADA_REF = "N";
            this.refer.MEDICO_ACEPTA_REF = "";
            this.confirmar();
          }
        }
      );
    },
    datoMedicoAcepta() {
      validarInputs(
        {
          form: "#MEDICO_ACEPTA_REF",
        },
        () => {
          this.datoAceptada();
        },
        () => {
          this.refer.MEDICO_ACEPTA_REF = this.refer.MEDICO_ACEPTA_REF.toUpperCase().replaceEsp();
          if (this.refer.ACEPTADA_REF == "S" && !this.refer.MEDICO_ACEPTA_REF.trim()) {
            CON851("", "01", null, "error", "");
            this.datoMedicoAcepta();
          } else {
            this.datoPersonalAdmin();
          }
        }
      );
    },
    datoPersonalAdmin() {
      validarInputs(
        {
          form: "#PERS_ADMIN_REF",
        },
        () => {
          this.datoMedicoAcepta();
        },
        () => {
          this.refer.PERS_ADMIN_REF = this.refer.PERS_ADMIN_REF.toUpperCase().replaceEsp();
          this.datoSoportes();
        }
      );
    },
    datoSoportes() {
      validarInputs(
        {
          form: "#SOPORTES_REF",
        },
        () => {
          this.datoPersonalAdmin();
        },
        () => {
          this.refer.SOPORTES_REF = this.refer.SOPORTES_REF.replaceEsp();
          this.confirmar();
        }
      );
    },
    confirmar() {
      CON851P(
        "01",
        () => {
          this.datoUnidad();
        },
        async () => {
          loader("show");
          if (this.admin_w == "GEBC") this.refer.OPER_MODIF_REF = "PROS";
          else this.refer.OPER_MODIF_REF = this.admin_w;

          this.refer.ESPECIA_REMI_REF = this.especialidades[0].cod;
          this.refer.ESPECIA_REMI_REF2 = this.especialidades[1].cod;
          this.refer.ESPECIA_REMI_REF3 = this.especialidades[2].cod;

          let llave = `${$_REG_HC.llave_hc}${this.refer.FECHA_REF}${this.refer.HORA_REF}${this.refer.OPER_ELAB_REF}`;

          this.refer.TABLA_REF = this.refer.TABLA_REF.enterReplace();
          let lineas_tabla = this.refer.TABLA_REF.strToTable("RENG_REF");
          let datos = {
            ..._getObjetoSaveHc(this.refer),
            datosh: datosEnvio() + llave + "|",
            ...lineas_tabla,
            LLAVE_REF_SOL: $_REG_HC.llave_ref_w,
          };

          await postData(datos, get_url("APP/HICLIN/HCB01.DLL"))
            .then(() => {
              CON851("", "Guardado correctamente", null, "success", "");
              loader("hide");
              this.imprimir(llave);
            })
            .catch((error) => {
              CON851("", "Error en guardado", null, "error", "");
              console.error(error, "ERROR");
              loader("hide");
              this.datoAceptada();
            });
        }
      );
    },
    imprimir(llave) {
      CON851P(
        "00",
        () => {
          this.salir();
        },
        () => {
          loader("show");
          const { imprimir_HCBI01 } = require("../../frameworks/pdf/hiclin/HCBI01.formato.js");

          imprimir_HCBI01({
            llave_ref_w: llave,
            fecha_ini_w: 0,
            fecha_fin_w: 0,
            operador_w: 0,
            paciente_w: 0,
            paso_w: 1,
            paci: $_REG_PACI,
            callback_error: () => {
              _regresar_menuhis();
            },
            callback: () => {
              loader("hide");
              _regresar_menuhis();
            },
          });
        }
      );
    },
    _ventanaMedico() {
      _ventanaDatos({
        titulo: "VENTANA DE PROFESIONALES",
        columnas: ["IDENTIFICACION", "NOMBRE"],
        data: this.array_profesionales,
        callback_esc: () => {
          document.querySelector(".MED_REF").focus();
        },
        callback: (data) => {
          this.refer.MED_REF = data.IDENTIFICACION;
          setTimeout(() => {
            _enterInput(".MED_REF");
          }, 200);
        },
      });
    },
    _ventanaEspecialidades(pos) {
      _ventanaDatos({
        titulo: "VENTANA DE ESPECIALIDADES",
        columnas: ["CODIGO", "NOMBRE"],
        data: this.array_especialidades,
        callback_esc: () => {
          document.querySelector(`.espec_${pos}`).focus();
        },
        callback: (data) => {
          this.especialidades[pos].cod = data.CODIGO;
          this.especialidades[pos].descrip = data.NOMBRE;
          setTimeout(() => {
            _enterInput(`.espec_${pos}`);
          }, 200);
        },
      });
    },
    _ventanaEnfermedades() {
      _ventanaDatos({
        titulo: "VENTANA DE ENFERMEDADES",
        columnas: ["COD_ENF", "NOMBRE_ENF"],
        data: this.array_enfermedades,
        callback_esc: () => {
          document.querySelector(".DIAG_PRIN_REF").focus();
        },
        callback: (data) => {
          this.refer.DIAG_PRIN_REF = data.COD_ENF;
          setTimeout(() => {
            _enterInput(".DIAG_PRIN_REF");
          }, 200);
        },
      });
    },
    _ventanaIps() {
      _ventanaDatos({
        titulo: "VENTANA DE CONSULTAS DE IPS",
        columnas: ["COD", "DESCRIP"],
        data: this.array_ips,
        callback_esc: () => {
          document.querySelector(".IPS_REF").focus();
        },
        callback: (data) => {
          this.refer.IPS_REF = data.COD;
          setTimeout(() => {
            _enterInput(".IPS_REF");
          }, 200);
        },
      });
    },
    salir() {
      _regresar_menuhis();
    },
    confirmarSalir(callback_esc, orden) {
      CON851P(
        "03",
        () => {
          orden != undefined ? this[callback_esc](orden) : this[callback_esc]();
        },
        () => {
          this.salir();
        }
      );
    },
    historialRef() {
      const { imprimir_HCB01B } = require("../../frameworks/pdf/hiclin/HCB01B.formato");

      imprimir_HCB01B({
        hcprc: this.hcprc,
      });
    },
  },
});
